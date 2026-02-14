#!/bin/bash

# E-commerce Website Deployment Script for AWS EC2
# This script helps deploy the E-commerce website on an EC2 instance

echo "========================================="
echo "E-commerce Website Deployment Script"
echo "========================================="

# Check if running on local machine or remote
if [ "$1" == "remote" ]; then
    EC2_HOST="$2"
    KEY_FILE="$3"
    
    if [ -z "$EC2_HOST" ] || [ -z "$KEY_FILE" ]; then
        echo "Usage: ./deploy.sh remote <EC2_IP> <KEY_FILE>"
        echo "Example: ./deploy.sh remote 54.152.148.118 ~/path/to/key.pem"
        exit 1
    fi
    
    echo "Deploying to EC2 instance at $EC2_HOST..."
    
    # Transfer files to EC2
    echo "Transferring files to EC2..."
    scp -i "$KEY_FILE" -r ./* ec2-user@$EC2_HOST:/home/ec2-user/ecommerce/
    
    # Execute deployment commands on EC2
    echo "Installing Docker on EC2..."
    ssh -i "$KEY_FILE" ec2-user@$EC2_HOST << 'EOF'
        sudo yum update -y
        sudo yum install -y docker
        sudo service docker start
        sudo usermod -a -G docker ec2-user
        
        # Install Docker Compose
        sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        sudo chmod +x /usr/local/bin/docker-compose
        
        # Create directory and transfer files (if not already done)
        mkdir -p ~/ecommerce
        cd ~/ecommerce
        
        # Run the application
        docker-compose up -d
        
        echo "Deployment complete!"
        echo "Access the website at http://$EC2_HOST:8080"
EOF
    
else
    echo "Local Deployment Options:"
    echo "========================="
    echo ""
    echo "Option 1: Using Docker Compose (Recommended)"
    echo "--------------------------------------------"
    echo "1. Build and run the container:"
    echo "   docker-compose up -d"
    echo ""
    echo "2. Access the website at: http://localhost:8080"
    echo ""
    echo "Option 2: Using Docker only"
    echo "----------------------------"
    echo "1. Build the image:"
    echo "   docker build -t ecommerce-app -f docker/Dockerfile ."
    echo ""
    echo "2. Run the container:"
    echo "   docker run -p 8080:80 ecommerce-app"
    echo ""
    echo "3. Access the website at: http://localhost:8080"
    echo ""
    echo "Option 3: Open directly in browser"
    echo "-----------------------------------"
    echo "Simply open index.html file in your web browser"
    echo ""
    echo "========================================="
    echo "For EC2 deployment, run:"
    echo "./deploy.sh remote <EC2_IP> <KEY_FILE>"
    echo "Example: ./deploy.sh remote 54.152.148.118 ~/key.pem"
    echo "========================================="
fi
