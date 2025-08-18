#!/bin/bash

# Monitor upload health and send alerts
# Can be run separately or integrated with the automation

set -e

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
LOG_FILE="$PROJECT_DIR/logs/upload-automation.log"
MONITOR_LOG="$PROJECT_DIR/logs/monitor.log"
HEALTH_CHECK_URL="https://localmemory.co/downloads"

# Notification settings (configure as needed)
ALERT_EMAIL="${ALERT_EMAIL:-}"  # Set via environment variable
SLACK_WEBHOOK="${SLACK_WEBHOOK:-}"  # Set via environment variable

# Create logs directory
mkdir -p "$PROJECT_DIR/logs"

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$MONITOR_LOG"
}

# Check if recent upload was successful
check_recent_upload() {
    local hours_back=${1:-2}
    local cutoff_time=$(date -d "$hours_back hours ago" '+%Y-%m-%d %H:%M:%S' 2>/dev/null || date -v-${hours_back}H '+%Y-%m-%d %H:%M:%S')
    
    if [[ -f "$LOG_FILE" ]]; then
        local recent_success=$(grep -A5 -B5 "$cutoff_time" "$LOG_FILE" | grep -c "Upload completed successfully" || echo "0")
        local recent_errors=$(grep -A5 -B5 "$cutoff_time" "$LOG_FILE" | grep -c "ERROR:" || echo "0")
        
        if [[ "$recent_success" -gt 0 ]]; then
            log "✓ Recent upload found (last $hours_back hours)"
            return 0
        elif [[ "$recent_errors" -gt 0 ]]; then
            log "✗ Recent upload errors found (last $hours_back hours)"
            return 1
        else
            log "⚠ No recent upload activity (last $hours_back hours)"
            return 2
        fi
    else
        log "⚠ No upload log file found"
        return 3
    fi
}

# Check S3 bucket health
check_s3_health() {
    log "Checking S3 bucket health..."
    
    # Get current time window
    local current_window=$(($(date +%s) / 43200))
    
    # Check if current window has uploads
    if aws s3 ls "s3://localmemory-secure-downloads/downloads/$current_window/" > /dev/null 2>&1; then
        log "✓ Current time window ($current_window) has uploads"
        return 0
    else
        log "✗ Current time window ($current_window) missing uploads"
        return 1
    fi
}

# Send alert notification
send_alert() {
    local message="$1"
    local severity="${2:-warning}"
    
    log "ALERT [$severity]: $message"
    
    # Email notification
    if [[ -n "$ALERT_EMAIL" ]] && command -v mail > /dev/null 2>&1; then
        echo "$message" | mail -s "Local Memory Upload Alert [$severity]" "$ALERT_EMAIL"
        log "Alert sent via email to $ALERT_EMAIL"
    fi
    
    # Slack notification
    if [[ -n "$SLACK_WEBHOOK" ]] && command -v curl > /dev/null 2>&1; then
        local emoji="⚠️"
        [[ "$severity" == "critical" ]] && emoji="🚨"
        [[ "$severity" == "warning" ]] && emoji="⚠️"
        [[ "$severity" == "info" ]] && emoji="ℹ️"
        
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"$emoji Local Memory Upload Alert [$severity]: $message\"}" \
            "$SLACK_WEBHOOK" > /dev/null 2>&1
        log "Alert sent via Slack"
    fi
}

# Main monitoring function
monitor_health() {
    log "Starting health check..."
    
    local issues=0
    
    # Check recent uploads
    if ! check_recent_upload 14; then  # Check last 14 hours (slightly more than 12)
        send_alert "No successful uploads in the last 14 hours. Downloads may be unavailable soon." "warning"
        ((issues++))
    fi
    
    # Check S3 health
    if ! check_s3_health; then
        send_alert "Current time window missing from S3. Downloads may be broken." "critical"
        ((issues++))
    fi
    
    # Summary
    if [[ "$issues" -eq 0 ]]; then
        log "✓ All health checks passed"
    else
        log "✗ Found $issues issues"
        send_alert "Upload system health check found $issues issues. Check logs for details." "warning"
    fi
    
    log "Health check completed"
    return $issues
}

# Command line interface
case "${1:-monitor}" in
    "monitor")
        monitor_health
        ;;
    
    "test-alert")
        send_alert "This is a test alert from the monitoring system" "info"
        ;;
    
    "check-log")
        check_recent_upload "${2:-2}"
        ;;
    
    "check-s3")
        check_s3_health
        ;;
    
    *)
        echo "Local Memory Upload Monitor"
        echo ""
        echo "Usage:"
        echo "  $0 monitor        - Run full health check"
        echo "  $0 test-alert     - Send test alert"
        echo "  $0 check-log [hours] - Check recent uploads"
        echo "  $0 check-s3       - Check S3 bucket health"
        echo ""
        echo "Environment Variables:"
        echo "  ALERT_EMAIL       - Email address for alerts"
        echo "  SLACK_WEBHOOK     - Slack webhook URL for alerts"
        ;;
esac