# CloudFront Distribution for Secure Downloads

## Option 1: Separate CloudFront Distribution (Recommended)

Create a dedicated CloudFront distribution for downloads that you'll route to from your main domain.

### Create Distribution
```bash
# First, create the distribution configuration JSON
cat > cloudfront-config.json << 'EOF'
{
  "CallerReference": "localmemory-downloads-$(date +%s)",
  "Comment": "Local Memory Secure Downloads",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-localmemory-secure-downloads",
    "ViewerProtocolPolicy": "redirect-to-https",
    "MinTTL": 0,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "Compress": true
  },
  "Origins": [
    {
      "Id": "S3-localmemory-secure-downloads", 
      "DomainName": "localmemory-secure-downloads.s3.amazonaws.com",
      "OriginPath": "/downloads",
      "S3OriginConfig": {
        "OriginAccessIdentity": "origin-access-identity/cloudfront/YOUR_OAI_ID"
      }
    }
  ],
  "Enabled": true,
  "PriceClass": "PriceClass_100"
}
EOF

# Create the distribution
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## Option 2: Add Behavior to Existing Distribution (If you have one)

If you already have a CloudFront distribution for `localmemory.co`, add a cache behavior:

```json
{
  "PathPattern": "/downloads/*",
  "TargetOriginId": "S3-downloads",
  "ViewerProtocolPolicy": "redirect-to-https",
  "MinTTL": 86400,
  "DefaultTTL": 86400,
  "MaxTTL": 31536000,
  "Compress": true,
  "ForwardedValues": {
    "QueryString": false,
    "Cookies": {
      "Forward": "none"
    }
  }
}
```

## Route 53 Configuration

If using a separate CloudFront distribution, create a CNAME record:

```bash
# Get your hosted zone ID for localmemory.co
HOSTED_ZONE_ID=$(aws route53 list-hosted-zones-by-name --dns-name localmemory.co --query 'HostedZones[0].Id' --output text)

# Create CNAME record for downloads subdomain (if you want downloads.localmemory.co)
# OR add the behavior to your existing distribution

# For main domain path approach (localmemory.co/downloads/*)
# You'll need to update your existing CloudFront distribution to include the downloads behavior
```

## CloudFront Security Headers

Add security headers to your CloudFront distribution:

```json
{
  "ResponseHeadersPolicy": {
    "Name": "SecureDownloads",
    "SecurityHeadersConfig": {
      "StrictTransportSecurity": {
        "AccessControlMaxAgeSec": 31536000,
        "IncludeSubdomains": true
      },
      "ContentTypeOptions": {
        "Override": true
      },
      "FrameOptions": {
        "FrameOption": "DENY",
        "Override": true
      },
      "ReferrerPolicy": {
        "ReferrerPolicy": "strict-origin-when-cross-origin",
        "Override": true
      }
    }
  }
}
```

## Cache Configuration

For binary downloads, use these cache settings:

```json
{
  "CacheBehavior": {
    "PathPattern": "/downloads/*",
    "MinTTL": 86400,
    "DefaultTTL": 86400, 
    "MaxTTL": 31536000,
    "Compress": true,
    "ViewerProtocolPolicy": "redirect-to-https"
  }
}
```

## Next Steps

1. Run the AWS CLI commands above to create the CloudFront distribution
2. Note the CloudFront distribution domain name (e.g., `d1234567890.cloudfront.net`)
3. Update your main domain's CloudFront distribution to route `/downloads/*` to this distribution
4. Test the setup with a sample file upload