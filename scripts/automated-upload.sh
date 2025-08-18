#!/bin/bash

# Automated upload script for local-memory binaries
# Runs every 12 hours to maintain download availability

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
LOG_FILE="$PROJECT_DIR/logs/upload-automation.log"
UPLOAD_SCRIPT="$PROJECT_DIR/upload-secure-downloads.sh"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_DIR/logs"

# Logging function
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" | tee -a "$LOG_FILE"
}

# Error handling
handle_error() {
    log "ERROR: Upload failed with exit code $1"
    log "Check the log file for details: $LOG_FILE"
    exit $1
}

# Main execution
main() {
    log "Starting automated upload process"
    
    # Check if upload script exists
    if [[ ! -f "$UPLOAD_SCRIPT" ]]; then
        log "ERROR: Upload script not found at $UPLOAD_SCRIPT"
        exit 1
    fi
    
    # Make sure upload script is executable
    chmod +x "$UPLOAD_SCRIPT"
    
    # Run the upload script
    log "Executing upload script..."
    if "$UPLOAD_SCRIPT" >> "$LOG_FILE" 2>&1; then
        log "Upload completed successfully"
    else
        handle_error $?
    fi
    
    # Log completion
    log "Automated upload process completed"
    log "----------------------------------------"
}

# Set trap for error handling
trap 'handle_error $?' ERR

# Run main function
main "$@"