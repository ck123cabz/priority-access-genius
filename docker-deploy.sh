#!/bin/bash

# Docker deployment script for Priority Access Genius
# This script builds and runs the application with live Supabase

set -e

echo "🚀 Starting Docker deployment..."

# Check if .env.docker exists
if [ ! -f ".env.docker" ]; then
    echo "❌ Error: .env.docker file not found!"
    echo "Please copy .env.docker template and fill in your Supabase values"
    exit 1
fi

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t priority-access-genius .

# Stop existing container if running
echo "🛑 Stopping existing containers..."
docker-compose down

# Start the application
echo "🚀 Starting application..."
docker-compose up -d

# Show logs
echo "📋 Application logs:"
docker-compose logs -f web

echo "✅ Deployment complete!"
echo "🌐 Application available at: http://localhost:3000"