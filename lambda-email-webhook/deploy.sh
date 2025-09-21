#!/bin/bash

# Deploy script for AWS Lambda function
# This script creates/updates the Lambda function and sets up necessary IAM permissions

FUNCTION_NAME="stripe-email-webhook"
REGION="us-east-1"  # Change this to your preferred region
ROLE_NAME="stripe-email-webhook-role"

echo "🚀 Deploying Stripe Email Webhook Lambda Function..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create deployment package
echo "📋 Creating deployment package..."
zip -r function.zip . -x "*.git*" "deploy.sh" "README.md"

# Check if function exists
if aws lambda get-function --function-name $FUNCTION_NAME --region $REGION >/dev/null 2>&1; then
    echo "🔄 Updating existing Lambda function..."
    aws lambda update-function-code \
        --function-name $FUNCTION_NAME \
        --zip-file fileb://function.zip \
        --region $REGION

    echo "⚙️ Updating function configuration..."
    aws lambda update-function-configuration \
        --function-name $FUNCTION_NAME \
        --timeout 30 \
        --memory-size 256 \
        --region $REGION
else
    echo "❌ Lambda function doesn't exist. Creating it now..."

    # Check if .env.lambda exists
    if [ -f ".env.lambda" ]; then
        echo "📋 Found .env.lambda with configuration values"

        # Create the function
        aws lambda create-function \
            --function-name $FUNCTION_NAME \
            --runtime nodejs18.x \
            --role arn:aws:iam::$(aws sts get-caller-identity --query Account --output text):role/lambda-execution-role \
            --handler index.handler \
            --zip-file fileb://function.zip \
            --timeout 30 \
            --memory-size 256 \
            --region $REGION

        if [ $? -eq 0 ]; then
            echo "✅ Lambda function created successfully!"
            echo "⚙️ Setting environment variables from .env.lambda..."

            # Read environment variables from .env.lambda and set them
            while IFS='=' read -r key value; do
                # Skip comments and empty lines
                if [[ $key =~ ^[[:space:]]*# ]] || [[ -z "$key" ]]; then
                    continue
                fi
                # Remove quotes from value
                value=$(echo "$value" | sed 's/^"//' | sed 's/"$//')
                echo "Setting $key..."
                aws lambda update-function-configuration \
                    --function-name $FUNCTION_NAME \
                    --environment Variables="{\"$key\":\"$value\"}" \
                    --region $REGION >/dev/null 2>&1
            done < .env.lambda

            echo "✅ Environment variables configured!"
        else
            echo "❌ Failed to create Lambda function. Please check IAM permissions."
        fi
    else
        echo "❌ .env.lambda file not found. Please create it with:"
        echo "RESEND_API_KEY=your_resend_key"
        echo "STRIPE_WEBHOOK_SECRET=your_webhook_secret"
        echo "DOWNLOAD_SECRET=your_download_secret"
        echo "FROM_EMAIL=noreply@updates.localmemory.co"
    fi
    exit 1
fi

# Get the function URL if it exists
FUNCTION_URL=$(aws lambda get-function-url-config --function-name $FUNCTION_NAME --region $REGION 2>/dev/null | jq -r '.FunctionUrl' 2>/dev/null)

if [ "$FUNCTION_URL" != "null" ] && [ -n "$FUNCTION_URL" ]; then
    echo "✅ Lambda function updated successfully!"
    echo "🔗 Function URL: $FUNCTION_URL"
    echo ""
    echo "Next steps:"
    echo "1. Copy the Function URL above"
    echo "2. Go to your Stripe Dashboard > Webhooks"
    echo "3. Add endpoint: $FUNCTION_URL"
    echo "4. Select event: checkout.session.completed"
    echo "5. Test with a payment!"
else
    echo "✅ Lambda function updated successfully!"
    echo "⚠️  No Function URL found. You'll need to:"
    echo "1. Create a Function URL in the AWS Console"
    echo "2. Configure it in your Stripe webhook settings"
fi

# Clean up
rm function.zip

echo "🎉 Deployment complete!"