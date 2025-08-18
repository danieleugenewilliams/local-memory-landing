# Automated Download Upload System

This system automatically uploads local-memory binaries to S3 every 12 hours to ensure continuous download availability for customers.

## Quick Setup

1. **Install the cron job:**
   ```bash
   # Add to your crontab
   crontab -e
   
   # Option 1: Once daily at 5:59 EST
   59 5 * * * cd /Users/danielwilliams/Projects/local-memory-landing && env TZ=America/New_York ./scripts/automated-upload.sh
   
   # Option 2: Twice daily (recommended for better coverage)
   59 5,17 * * * cd /Users/danielwilliams/Projects/local-memory-landing && env TZ=America/New_York ./scripts/automated-upload.sh
   ```

2. **Test the automation:**
   ```bash
   # Test the automation script
   ./scripts/automated-upload.sh
   
   # Check logs
   tail -f logs/upload-automation.log
   ```

3. **Set up monitoring (optional):**
   ```bash
   # Test monitoring
   ./scripts/monitor-uploads.sh
   
   # Add monitoring to cron (runs every 6 hours)
   0 */6 * * * cd /Users/danielwilliams/Projects/local-memory-landing && ./scripts/monitor-uploads.sh
   ```

## System Overview

### Time Windows
- **Window Duration**: 12 hours (43,200 seconds)
- **Upload Coverage**: Current + next window (24 hours total)
- **Download Expiration**: 48 hours from payment
- **Upload Frequency**: Every 12 hours

### File Structure
```
S3: s3://localmemory-secure-downloads/downloads/
├── 40637/                    # Time window
│   ├── abc123def456/         # Hash for macos-intel
│   │   └── macos-intel/
│   │       └── local-memory-macos-intel
│   ├── def456abc123/         # Hash for macos-arm
│   │   └── macos-arm/
│   │       └── local-memory-macos-arm
│   └── ...
└── 40638/                    # Next time window
    └── ...
```

## Scripts

### 1. Automated Upload (`scripts/automated-upload.sh`)

**Purpose**: Wrapper script that runs the upload with logging and error handling.

**Features**:
- Comprehensive logging to `logs/upload-automation.log`
- Error handling and exit codes
- Timestamps for all operations
- Automatic log directory creation

**Usage**:
```bash
./scripts/automated-upload.sh
```

### 2. Upload Script (`upload-secure-downloads.sh`)

**Purpose**: Core upload logic with time windows and hash generation.

**Enhanced Features**:
- Better error handling for failed uploads
- Detailed logging for each platform
- Verification commands
- Cleanup of old windows

**Usage**:
```bash
# Upload for current + next window
./upload-secure-downloads.sh upload

# Verify uploads exist
./upload-secure-downloads.sh verify

# Clean up old windows
./upload-secure-downloads.sh cleanup

# Check current time window
./upload-secure-downloads.sh window
```

### 3. Monitor Script (`scripts/monitor-uploads.sh`)

**Purpose**: Health checking and alerting for the upload system.

**Features**:
- Checks for recent successful uploads
- Verifies S3 bucket health
- Email and Slack notifications
- Detailed logging

**Usage**:
```bash
# Run health check
./scripts/monitor-uploads.sh monitor

# Test alerting
./scripts/monitor-uploads.sh test-alert

# Check recent uploads
./scripts/monitor-uploads.sh check-log 14

# Check S3 health
./scripts/monitor-uploads.sh check-s3
```

## Cron Job Configuration

### Primary Upload Job
```bash
# Daily at 5:59 EST (recommended: twice daily for better coverage)
59 5,17 * * * cd /Users/danielwilliams/Projects/local-memory-landing && env TZ=America/New_York ./scripts/automated-upload.sh

# Alternative: Once daily only
59 5 * * * cd /Users/danielwilliams/Projects/local-memory-landing && env TZ=America/New_York ./scripts/automated-upload.sh
```

### Monitoring Job (Optional)
```bash
# Every 6 hours for health checks
0 */6 * * * cd /Users/danielwilliams/Projects/local-memory-landing && ./scripts/monitor-uploads.sh
```

### Alternative Schedules
```bash
# Every 12 hours starting at midnight
0 0,12 * * * cd /Users/danielwilliams/Projects/local-memory-landing && ./scripts/automated-upload.sh

# Every 12 hours with offset (avoid peak times)
15 6,18 * * * cd /Users/danielwilliams/Projects/local-memory-landing && ./scripts/automated-upload.sh
```

## Monitoring and Alerts

### Log Files
- **Upload Logs**: `logs/upload-automation.log`
- **Monitor Logs**: `logs/monitor.log`

### Alert Configuration
Set environment variables for notifications:

```bash
# Email alerts (requires mail command)
export ALERT_EMAIL="admin@localmemory.co"

# Slack alerts (requires webhook URL)
export SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK"
```

### Health Checks
The monitor script checks:
1. **Recent Upload Success**: Successful uploads in last 14 hours
2. **S3 Bucket Health**: Current time window has files
3. **Error Detection**: Recent upload failures

## Troubleshooting

### Common Issues

**1. Cron Job Not Running**
```bash
# Check cron service
sudo systemctl status cron  # Linux
sudo launchctl list | grep cron  # macOS

# Check cron logs
tail -f /var/log/cron  # Linux
tail -f /var/log/system.log | grep cron  # macOS
```

**2. AWS CLI Issues**
```bash
# Test AWS credentials
aws sts get-caller-identity

# Test S3 access
aws s3 ls s3://localmemory-secure-downloads/
```

**3. Permission Issues**
```bash
# Make scripts executable
chmod +x scripts/*.sh
chmod +x upload-secure-downloads.sh

# Check file ownership
ls -la scripts/
```

**4. Path Issues in Cron**
```bash
# Add PATH to crontab
PATH=/usr/local/bin:/usr/bin:/bin
0 6,18 * * * cd /Users/danielwilliams/Projects/local-memory-landing && ./scripts/automated-upload.sh
```

### Log Analysis
```bash
# Check recent uploads
tail -100 logs/upload-automation.log

# Search for errors
grep -i error logs/upload-automation.log

# Check upload frequency
grep "Upload completed successfully" logs/upload-automation.log | tail -10
```

### Manual Recovery
```bash
# Force upload now
./scripts/automated-upload.sh

# Verify current window
./upload-secure-downloads.sh verify

# Check next window
./upload-secure-downloads.sh verify $(($(date +%s) / 43200 + 1))
```

## Security Considerations

1. **Log Rotation**: Implement log rotation to prevent disk space issues
2. **AWS Credentials**: Use IAM roles or secure credential storage
3. **Secret Management**: Keep VITE_DOWNLOAD_SECRET secure and in sync
4. **Monitoring**: Regular health checks to detect issues early

## Maintenance

### Weekly Tasks
- Review upload logs for any patterns of failure
- Check disk space usage for logs
- Verify S3 bucket size and costs

### Monthly Tasks
- Review and update alert configurations
- Analyze upload patterns and optimize timing
- Update AWS credentials if needed

### Emergency Procedures
1. **Immediate Upload**: Run `./scripts/automated-upload.sh` manually
2. **Check Status**: Use `./scripts/monitor-uploads.sh monitor`
3. **Force Next Window**: Uploads automatically include next window
4. **Customer Impact**: Downloads remain available for 48 hours from payment

## System Status Dashboard

Create a simple status check:
```bash
#!/bin/bash
echo "=== Local Memory Upload System Status ==="
echo "Current Time Window: $(date +%s | awk '{print int($1/43200)}')"
echo "Last Upload: $(grep "Upload completed successfully" logs/upload-automation.log | tail -1 | cut -d' ' -f1-2)"
echo "System Health: $(./scripts/monitor-uploads.sh monitor > /dev/null 2>&1 && echo "✓ Healthy" || echo "✗ Issues Detected")"
echo "Next Scheduled: $(crontab -l | grep automated-upload.sh)"
```

This automated system ensures your customers always have access to downloads without manual intervention.