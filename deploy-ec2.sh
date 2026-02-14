#!/bin/bash

# E-commerce Website Deployment Script for AWS EC2
# This script deploys the E-commerce website to an AWS EC2 instance

# Configuration
EC2_HOST="54.152.148.118"
KEY_FILE="pair-ec.pem"
REMOTE_DIR="/home/ec2-user/ecommerce"

echo "========================================="
echo "E-commerce EC2 Deployment Script"
echo "========================================="
echo "Target: $EC2_HOST"
echo "Key: $KEY_FILE"
echo ""

# Check if key file exists
if [ ! -f "$KEY_FILE" ]; then
    echo "Error: Key file $KEY_FILE not found!"
    exit 1
fi

# Fix key file permissions (for Linux/Mac/Git Bash)
chmod 400 "$KEY_FILE"

echo "Step 1: Transferring files to EC2..."
scp -i "$KEY_FILE" -r ./* ec2-user@$EC2_HOST:$REMOTE_DIR/

if [ $? -ne 0 ]; then
    echo "Error: Failed to transfer files!"
    exit 1
fi

echo "Step 2: Connecting to EC2 and deploying..."

# Execute deployment commands on EC2
ssh -i "$KEY_FILE" ec2-user@$EC2_HOST << 'EOF'

echo "Installing Docker..."
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user

echo "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Creating directory and deploying..."
mkdir -p ~/ecommerce
cd ~/ecommerce

# Copy files to the directory (if not already done)
cp -r /home/ec2-user/ecommerce/* ~/ecommerce/ 2>/dev/null || true

echo "Building and running Docker container..."
docker-compose up -d

echo "Deployment complete!"
echo "Access the website at: http://54.152.148.118:8080"

EOF

echo ""
echo "========================================="
echo "Deployment Complete!"
echo "Access the website at: http://54.152.148.118:8080"
echo "========================================="
