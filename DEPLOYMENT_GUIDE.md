# Secure Downloads Deployment & Testing Guide

## Quick Start Deployment

### 1. Set Up AWS Infrastructure

```bash
# Create S3 bucket
aws s3 mb s3://localmemory-secure-downloads --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket localmemory-secure-downloads \
  --versioning-configuration Status=Enabled

# Block public access
aws s3api put-public-access-block \
  --bucket localmemory-secure-downloads \
  --public-access-block-configuration \
  BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true

# Create CloudFront Origin Access Identity
aws cloudfront create-cloud-front-origin-access-identity \
  --cloud-front-origin-access-identity-config \
  CallerReference="localmemory-downloads-$(date +%s)",Comment="Local Memory Downloads OAI"
```

### 2. Update S3 Bucket Policy

Replace `YOUR_OAI_ID` with the actual OAI ID from step 1:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudFrontAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity YOUR_OAI_ID"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::localmemory-secure-downloads/downloads/*"
    }
  ]
}
```

### 3. Prepare Binaries

Create a `binaries/` directory with your compiled executables:

```bash
mkdir binaries/
# Place your binaries here:
# - local-memory-macos
# - local-memory-windows.exe  
# - local-memory-linux
```

### 4. Upload Binaries

```bash
# Upload for current time window
./upload-secure-downloads.sh upload

# Verify uploads
./upload-secure-downloads.sh verify
```

### 5. Set Up CloudFront Distribution

Use the configuration from `cloudfront-setup.md` to create a distribution that routes `/downloads/*` to your S3 bucket.

## Testing the Complete Flow

### Test 1: Frontend URL Generation

1. Navigate to `http://localhost:5173/payment`
2. Click "Get Instant Access"
3. Go to `http://localhost:5173/success?session_id=cs_test_123456`
4. Click download buttons
5. Verify URLs match format: `https://localmemory.co/downloads/{window}/{hash}/{platform}/local-memory-{platform}`

### Test 2: Hash Consistency

Test that the upload script generates the same hashes as the frontend:

```bash
# Get current time window
WINDOW=$(./upload-secure-downloads.sh window | grep "Current" | cut -d: -f2 | xargs)

# Test hash generation for each platform
./upload-secure-downloads.sh test-hash macos $WINDOW production
./upload-secure-downloads.sh test-hash windows $WINDOW production
./upload-secure-downloads.sh test-hash linux $WINDOW production
```

Compare these hashes with what your frontend generates in the browser console.

### Test 3: S3 Structure Verification

```bash
# List S3 structure to verify uploads
aws s3 ls s3://localmemory-secure-downloads/downloads/ --recursive

# Should show structure like:
# downloads/20318/6d7868d469ada501/macos/local-memory-macos
# downloads/20318/1f45e67dca5bddb2/windows/local-memory-windows.exe
# downloads/20318/345879c43fc1e2a3/linux/local-memory-linux
```

### Test 4: CloudFront Distribution Test

Once CloudFront is set up:

```bash
# Test if CloudFront serves the files (replace with your CloudFront domain)
curl -I "https://d1234567890.cloudfront.net/downloads/20318/6d7868d469ada501/macos/local-memory-macos"

# Should return 200 OK for valid URLs
# Should return 403/404 for invalid URLs
```

### Test 5: End-to-End Production Test

1. Set up the complete infrastructure (S3 + CloudFront)
2. Upload binaries using the script
3. Update your frontend to use production environment
4. Test the complete payment → download flow
5. Verify downloads work and URLs expire correctly

## Monitoring & Maintenance

### Automated Upload on Release

Add this to your CI/CD pipeline:

```yaml
# GitHub Actions example
- name: Upload Secure Downloads
  run: |
    # Compile binaries for all platforms
    make build-all
    
    # Upload to S3 with time-windowed structure
    ./upload-secure-downloads.sh upload "release-$(date +%Y%m%d)"
    
    # Verify uploads
    ./upload-secure-downloads.sh verify
```

### Cleanup Old Windows

Set up a daily cron job or scheduled Lambda:

```bash
# Clean up downloads older than 48 hours
./upload-secure-downloads.sh cleanup
```

### CloudWatch Monitoring

Monitor download metrics:
- CloudFront request count
- S3 GET requests
- Error rates (403/404)
- Download completion rates

## Security Verification

### Verify URLs Are Secure

1. **Time-based expiration**: URLs should become invalid after 48 hours
2. **Unique per session**: Different payment sessions should generate different URLs
3. **Platform-specific**: Each platform should have a unique hash
4. **Unpredictable**: URLs should not be guessable without the secret

### Test Security

```bash
# Test with invalid time window
curl -I "https://localmemory.co/downloads/99999/invalid/macos/local-memory-macos"
# Should return 404

# Test with invalid hash
curl -I "https://localmemory.co/downloads/20318/invalidhash/macos/local-memory-macos"  
# Should return 404

# Test with valid current URLs
curl -I "https://localmemory.co/downloads/20318/6d7868d469ada501/macos/local-memory-macos"
# Should return 200
```

## Troubleshooting

### Common Issues

1. **Hash Mismatch**: Ensure `VITE_DOWNLOAD_SECRET` in frontend matches `SECRET` in upload script
2. **Time Window Sync**: Upload script and frontend must use same time calculation
3. **CloudFront Caching**: Allow time for CloudFront to propagate changes
4. **S3 Permissions**: Verify OAI has proper access to the bucket

### Debug Commands

```bash
# Check current time window
./upload-secure-downloads.sh window

# Test hash generation
./upload-secure-downloads.sh test-hash macos $(date +%s | awk '{print int($1/43200)}')

# Verify S3 uploads
aws s3 ls s3://localmemory-secure-downloads/downloads/ --recursive

# Check CloudFront distribution status
aws cloudfront list-distributions --query 'DistributionList.Items[*].[Id,DomainName,Status]'
```

## Cost Optimization

### S3 Lifecycle Policy

```json
{
  "Rules": [
    {
      "ID": "DeleteOldDownloads",
      "Status": "Enabled",
      "Filter": {
        "Prefix": "downloads/"
      },
      "Expiration": {
        "Days": 7
      }
    }
  ]
}
```

### CloudFront Settings

- Enable compression for faster downloads
- Use appropriate price class based on global reach needs
- Set appropriate TTL for binary files (long cache for immutable binaries)

## Production Deployment Checklist

- [ ] S3 bucket created and configured
- [ ] CloudFront distribution set up with OAI
- [ ] Route 53 configured to route `/downloads/*` to CloudFront
- [ ] Upload script tested and working
- [ ] Hash generation verified between frontend and backend
- [ ] Security testing completed
- [ ] Monitoring and alerting set up
- [ ] Backup and disaster recovery plan in place
- [ ] Cost optimization configured
- [ ] Documentation updated for team