#!/bin/bash

# GitHub Actions Secrets Setup Script
# This script helps configure the required secrets for cross-repository automation

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 GitHub Actions Secrets Setup${NC}"
echo "=================================="
echo ""

# Step 1: Extract existing DOWNLOAD_SECRET
echo -e "${YELLOW}📋 Step 1: DOWNLOAD_SECRET${NC}"
DOWNLOAD_SECRET=$(grep '^SECRET=' upload-secure-downloads.sh | cut -d'"' -f2)
echo "✅ Found existing download secret: ${DOWNLOAD_SECRET:0:16}...${DOWNLOAD_SECRET: -16}"
echo "📝 This secret will be used for: DOWNLOAD_SECRET"
echo ""

# Step 2: AWS OIDC Setup
echo -e "${YELLOW}🔧 Step 2: AWS OIDC Role Setup${NC}"
echo "Setting up AWS OIDC integration for GitHub Actions..."

AWS_ACCOUNT_ID="155505548742"
ROLE_NAME="GitHubActionsRole"

# Check if OIDC provider exists
echo "🔍 Checking if GitHub OIDC provider exists..."
if aws iam get-open-id-connect-provider --open-id-connect-provider-arn "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com" >/dev/null 2>&1; then
    echo "✅ GitHub OIDC provider already exists"
else
    echo "📝 Creating GitHub OIDC provider..."
    aws iam create-open-id-connect-provider \
        --url https://token.actions.githubusercontent.com \
        --client-id-list sts.amazonaws.com \
        --thumbprint-list 6938fd4d98bab03faadb97b34396831e3780aea1
    echo "✅ GitHub OIDC provider created"
fi

# Create trust policy file
cat > trust-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::${AWS_ACCOUNT_ID}:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRole",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": [
            "repo:danieleugenewilliams/local-memory-golang:ref:refs/heads/main",
            "repo:danieleugenewilliams/local-memory-golang:ref:refs/tags/v*"
          ]
        }
      }
    }
  ]
}
EOF

# Create role policy file
cat > role-policy.json << EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::localmemory-secure-downloads",
        "arn:aws:s3:::localmemory-secure-downloads/downloads/*"
      ]
    }
  ]
}
EOF

# Check if role exists
echo "🔍 Checking if IAM role exists..."
if aws iam get-role --role-name "$ROLE_NAME" >/dev/null 2>&1; then
    echo "✅ IAM role already exists"
    echo "📝 Updating trust policy..."
    aws iam update-assume-role-policy \
        --role-name "$ROLE_NAME" \
        --policy-document file://trust-policy.json
else
    echo "📝 Creating IAM role..."
    aws iam create-role \
        --role-name "$ROLE_NAME" \
        --assume-role-policy-document file://trust-policy.json \
        --description "Role for GitHub Actions to upload to S3"
    echo "✅ IAM role created"
fi

# Attach policy to role
echo "📝 Attaching policy to role..."
aws iam put-role-policy \
    --role-name "$ROLE_NAME" \
    --policy-name "S3UploadPolicy" \
    --policy-document file://role-policy.json

# Get role ARN
ROLE_ARN=$(aws iam get-role --role-name "$ROLE_NAME" --query 'Role.Arn' --output text)
echo "✅ AWS Role ARN: $ROLE_ARN"

# Cleanup temporary files
rm trust-policy.json role-policy.json

echo ""
echo -e "${YELLOW}📝 Step 3: GitHub Personal Access Token${NC}"
echo "You need to create a GitHub Personal Access Token (PAT) for repository dispatch."
echo ""
echo "🌐 Opening GitHub Token Settings..."
open "https://github.com/settings/tokens/new?description=Local%20Memory%20Cross%20Repo%20Automation&scopes=repo"
echo ""
echo "📋 Token Configuration:"
echo "  - Description: Local Memory Cross Repo Automation"
echo "  - Expiration: 90 days (recommended)"
echo "  - Scopes: ✅ repo (Full control of private repositories)"
echo ""
read -p "Press Enter after creating the token, then paste it here: " GITHUB_PAT

echo ""
echo -e "${GREEN}🎯 Summary - Add these secrets to your GitHub repository:${NC}"
echo "=============================================================="
echo ""
echo -e "${BLUE}Repository:${NC} danieleugenewilliams/local-memory-golang"
echo -e "${BLUE}Settings URL:${NC} https://github.com/danieleugenewilliams/local-memory-golang/settings/secrets/actions"
echo ""
echo -e "${YELLOW}Secret 1: DOWNLOAD_SECRET${NC}"
echo "$DOWNLOAD_SECRET"
echo ""
echo -e "${YELLOW}Secret 2: AWS_ROLE_TO_ASSUME${NC}"
echo "$ROLE_ARN"
echo ""
echo -e "${YELLOW}Secret 3: CROSS_REPO_PAT${NC}"
echo "$GITHUB_PAT"
echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Copy the secrets above to your GitHub repository"
echo "2. Go to: https://github.com/danieleugenewilliams/local-memory-golang/settings/secrets/actions"
echo "3. Add each secret using 'New repository secret'"
echo "4. Test the integration by pushing to main branch or creating a tag"
echo ""
echo -e "${YELLOW}⚠️  Important:${NC}"
echo "- Keep the CROSS_REPO_PAT secure and rotate it every 90 days"
echo "- Test the integration in a non-production environment first"
echo "- Monitor the first few runs to ensure everything works correctly"