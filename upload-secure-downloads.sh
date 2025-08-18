#!/bin/bash

# Secure Download Upload Script
# Uploads local-memory binaries to S3 with time-windowed structure matching the frontend URLs

set -e

# Configuration
BUCKET_NAME="localmemory-secure-downloads"
BINARIES_DIR="./binaries"  # Directory containing your compiled binaries
SECRET="d9e7e7a9f2b40547a5a0d6a99fc0ae8bf6847a700f7928f7f82a7f4b3223bf84"  # Same as VITE_DOWNLOAD_SECRET

# Platforms and their binary names (using arrays for macOS compatibility)
PLATFORMS=("macos-intel" "macos-arm" "windows" "linux")
get_binary_name() {
    case $1 in
        "macos-intel") echo "local-memory-macos-intel" ;;
        "macos-arm") echo "local-memory-macos-arm" ;;
        "windows") echo "local-memory-windows.exe" ;;
        "linux") echo "local-memory-linux" ;;
    esac
}

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

# Function to generate hash (matches frontend logic)
generate_hash() {
    local platform=$1
    local time_window=$2
    
    local data="${SECRET}:download-access:${time_window}:${platform}"
    echo -n "$data" | openssl dgst -sha256 | cut -d' ' -f2 | cut -c1-16
}

# Function to upload binary for a specific time window
upload_for_time_window() {
    local time_window=$1
    
    echo -e "${YELLOW}Uploading binaries for time window: $time_window${NC}"
    
    for platform in "${PLATFORMS[@]}"; do
        local binary_name=$(get_binary_name "$platform")
        local binary_path="$BINARIES_DIR/$binary_name"
        
        if [[ ! -f "$binary_path" ]]; then
            echo -e "${RED}Warning: Binary not found: $binary_path${NC}"
            continue
        fi
        
        # Generate hash for this platform/window combination
        local hash=$(generate_hash "$platform" "$time_window")
        
        # S3 key matching frontend URL structure
        local s3_key="downloads/$time_window/$hash/$platform/$binary_name"
        
        echo -e "${GREEN}Uploading $platform binary...${NC}"
        echo "  Local: $binary_path"
        echo "  S3: s3://$BUCKET_NAME/$s3_key"
        echo "  URL: https://localmemory.co/$s3_key"
        
        # Upload to S3
        aws s3 cp "$binary_path" "s3://$BUCKET_NAME/$s3_key" \
            --content-type "application/octet-stream" \
            --metadata "platform=$platform,time-window=$time_window"
        
        echo -e "${GREEN}✓ Uploaded $platform binary${NC}\n"
    done
}

# Function to upload for multiple time windows (current + future)
upload_multiple_windows() {
    local current_time=$(date +%s)
    local current_window=$(get_time_window $current_time)
    
    echo -e "${YELLOW}Starting upload for secure downloads...${NC}"
    echo "Current timestamp: $current_time"
    echo "Current time window: $current_window"
    echo ""
    
    # Upload for current window
    upload_for_time_window "$current_window"
    
    # Upload for next window (in case we're near the boundary)
    local next_window=$((current_window + 1))
    echo -e "${YELLOW}Also uploading for next time window: $next_window${NC}"
    upload_for_time_window "$next_window"
    
    echo -e "${GREEN}✓ Upload complete for both time windows${NC}"
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
    
    echo -e "${YELLOW}Verifying uploads for time window: $time_window${NC}"
    
    for platform in "${PLATFORMS[@]}"; do
        local hash=$(generate_hash "$platform" "$time_window")
        local s3_key="downloads/$time_window/$hash/$platform/$(get_binary_name "$platform")"
        
        if aws s3 ls "s3://$BUCKET_NAME/$s3_key" > /dev/null 2>&1; then
            echo -e "${GREEN}✓ $platform binary verified${NC}"
        else
            echo -e "${RED}✗ $platform binary missing${NC}"
        fi
    done
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
        if [[ -z "$2" || -z "$3" ]]; then
            echo "Usage: $0 test-hash <platform> <time_window>"
            exit 1
        fi
        hash=$(generate_hash "$2" "$3")
        echo "Hash for platform '$2' in window '$3': $hash"
        ;;
    
    *)
        echo "Local Memory Secure Download Upload Script"
        echo ""
        echo "Usage:"
        echo "  $0 upload                    - Upload binaries for current + next time window"
        echo "  $0 verify [window]           - Verify uploads exist"
        echo "  $0 cleanup                   - Remove old time windows"
        echo "  $0 window                    - Show current time window"
        echo "  $0 test-hash <platform> <window> - Test hash generation"
        echo ""
        echo "Setup:"
        echo "  1. Place binaries in: $BINARIES_DIR/"
        echo "     - local-memory-macos-intel"
        echo "     - local-memory-macos-arm"
        echo "     - local-memory-windows.exe"
        echo "     - local-memory-linux"
        echo "  2. Configure AWS CLI with appropriate credentials"
        echo "  3. Run: $0 upload"
        echo ""
        echo "Examples:"
        echo "  $0 upload                    # Upload for all users"
        echo "  $0 verify                   # Verify current window uploads"
        echo "  $0 cleanup                  # Clean up old windows"
        ;;
esac