#!/bin/bash

# Secure Download Upload Script
# Uploads local-memory binaries to S3 with time-windowed structure matching the frontend URLs

set -e

# Configuration
BUCKET_NAME="localmemory-secure-downloads"
BINARIES_DIR="./binaries"  # Directory containing your compiled binaries
SECRET="9a8b7c6d5e4f3a2b1c9d8e7f6a5b4c3d2e1f9a8b7c6d5e4f3a2b1c9d8e7f6a5b4c3d"  # Same as VITE_DOWNLOAD_SECRET

# Universal ZIP file containing all platforms
UNIVERSAL_ZIP="local-memory-universal.zip"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to calculate time window (matches frontend logic)
get_time_window() {
    local timestamp=${1:-$(date +%s)}
    echo $((timestamp / 43200))  # 12-hour windows
}

# Function to generate hash for universal ZIP (matches golang license key algorithm)
generate_hash() {
    local time_window=$1
    
    local data="${SECRET}:download-access:${time_window}:universal"
    
    # Generate SHA256 hash and convert to uppercase
    local raw_hash=$(echo -n "$data" | openssl dgst -sha256 | cut -d' ' -f2 | tr '[:lower:]' '[:upper:]')
    
    # Apply character filtering and replacement (matches golang app algorithm)
    # Replace [01OI578] with [ABCDEFG] respectively
    local clean_hash=$(echo "$raw_hash" | sed 's/0/A/g; s/1/B/g; s/O/C/g; s/I/D/g; s/5/E/g; s/7/F/g; s/8/G/g')
    
    # Take first 16 characters
    echo "${clean_hash:0:16}"
}

# Function to upload universal ZIP for a specific time window
upload_for_time_window() {
    local time_window=$1
    
    echo -e "${YELLOW}Uploading universal ZIP for time window: $time_window${NC}"
    
    local binary_path="$BINARIES_DIR/$UNIVERSAL_ZIP"
    
    if [[ ! -f "$binary_path" ]]; then
        echo -e "${RED}Error: Universal ZIP not found: $binary_path${NC}"
        return 1
    fi
    
    # Generate hash for this time window
    local hash=$(generate_hash "$time_window")
    
    # S3 key matching frontend URL structure
    local s3_key="downloads/$time_window/$hash/universal/$UNIVERSAL_ZIP"
    
    echo -e "${GREEN}Uploading universal ZIP...${NC}"
    echo "  Local: $binary_path"
    echo "  S3: s3://$BUCKET_NAME/$s3_key"
    echo "  URL: https://localmemory.co/$s3_key"
    
    # Upload to S3 with error handling
    if aws s3 cp "$binary_path" "s3://$BUCKET_NAME/$s3_key" \
        --content-type "application/zip" \
        --metadata "platform=universal,time-window=$time_window"; then
        echo -e "${GREEN}✓ Uploaded universal ZIP${NC}\n"
    else
        echo -e "${RED}✗ Failed to upload universal ZIP${NC}\n"
        return 1
    fi
}

# Function to upload for multiple time windows (current + future)
upload_multiple_windows() {
    local current_time=$(date +%s)
    local current_window=$(get_time_window $current_time)
    
    echo -e "${YELLOW}Starting upload for secure universal ZIP downloads...${NC}"
    echo "Current timestamp: $current_time"
    echo "Current time window: $current_window"
    echo ""
    
    # Upload for current window
    upload_for_time_window "$current_window"
    
    # Upload for next window (in case we're near the boundary)
    local next_window=$((current_window + 1))
    echo -e "${YELLOW}Also uploading for next time window: $next_window${NC}"
    upload_for_time_window "$next_window"
    
    echo -e "${GREEN}✓ Universal ZIP upload complete for both time windows${NC}"
}

# Function to cleanup old time windows
cleanup_old_windows() {
    local current_window=$(get_time_window)
    local cutoff_window=$((current_window - 4))  # Keep last 4 windows (~48 hours)
    
    echo -e "${YELLOW}Cleaning up time windows older than $cutoff_window...${NC}"
    
    # List and delete old prefixes
    aws s3 ls "s3://$BUCKET_NAME/downloads/" | while read -r line; do
        local prefix=$(echo "$line" | awk '{print $2}' | tr -d '/')
        if [[ "$prefix" =~ ^[0-9]+$ ]] && [[ "$prefix" -lt "$cutoff_window" ]]; then
            echo "Deleting old time window: $prefix"
            aws s3 rm "s3://$BUCKET_NAME/downloads/$prefix/" --recursive
        fi
    done
    
    echo -e "${GREEN}✓ Cleanup complete${NC}"
}

# Function to verify uploads
verify_uploads() {
    local time_window=${1:-$(get_time_window)}
    
    echo -e "${YELLOW}Verifying universal ZIP upload for time window: $time_window${NC}"
    
    local hash=$(generate_hash "$time_window")
    local s3_key="downloads/$time_window/$hash/universal/$UNIVERSAL_ZIP"
    
    if aws s3 ls "s3://$BUCKET_NAME/$s3_key" > /dev/null 2>&1; then
        echo -e "${GREEN}✓ Universal ZIP verified${NC}"
    else
        echo -e "${RED}✗ Universal ZIP missing${NC}"
    fi
}

# Main script logic
case "${1:-help}" in
    "upload")
        if [[ ! -d "$BINARIES_DIR" ]]; then
            echo -e "${RED}Error: Binaries directory not found: $BINARIES_DIR${NC}"
            exit 1
        fi
        
        upload_multiple_windows
        ;;
    
    "verify")
        verify_uploads "$2"
        ;;
    
    "cleanup")
        cleanup_old_windows
        ;;
    
    "window")
        echo "Current time window: $(get_time_window)"
        echo "Next time window: $(($(get_time_window) + 1))"
        ;;
    
    "test-hash")
        if [[ -z "$2" ]]; then
            echo "Usage: $0 test-hash <time_window>"
            exit 1
        fi
        hash=$(generate_hash "$2")
        echo "Hash for universal ZIP in window '$2': $hash"
        ;;
    
    *)
        echo "Local Memory Secure Download Upload Script"
        echo ""
        echo "Usage:"
        echo "  $0 upload                    - Upload binaries for current + next time window"
        echo "  $0 verify [window]           - Verify uploads exist"
        echo "  $0 cleanup                   - Remove old time windows"
        echo "  $0 window                    - Show current time window"
        echo "  $0 test-hash <window>           - Test hash generation"
        echo ""
        echo "Setup:"
        echo "  1. Place universal ZIP archive in: $BINARIES_DIR/"
        echo "     - local-memory-universal.zip (contains all platform binaries)"
        echo "  2. Configure AWS CLI with appropriate credentials"
        echo "  3. Run: $0 upload"
        echo ""
        echo "Examples:"
        echo "  $0 upload                    # Upload for all users"
        echo "  $0 verify                   # Verify current window uploads"
        echo "  $0 cleanup                  # Clean up old windows"
        ;;
esac