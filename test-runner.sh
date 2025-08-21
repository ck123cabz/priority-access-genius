#!/bin/bash

echo "🚀 Priority Access Genius - Comprehensive E2E Testing Suite"
echo "============================================================"

# Check if Docker container is running
echo "📋 Checking Docker container status..."
if docker-compose -f docker-dev.yml ps | grep -q "Up"; then
    echo "✅ Docker container is running"
else
    echo "❌ Docker container is not running. Starting container..."
    docker-compose -f docker-dev.yml up -d
    echo "⏳ Waiting for container to be ready..."
    sleep 10
fi

# Check if application is responding
echo "🔍 Testing application connectivity..."
for i in {1..30}; do
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 | grep -q "200\|404"; then
        echo "✅ Application is responding"
        break
    fi
    echo "⏳ Waiting for application... ($i/30)"
    sleep 2
done

# Set environment variable to use Docker
export USE_DOCKER=true

echo ""
echo "🎭 Running Playwright E2E Tests..."
echo "=================================="

# Install Playwright browsers if needed
echo "📦 Ensuring Playwright browsers are installed..."
npx playwright install --with-deps

# Run comprehensive test suites
echo ""
echo "🌐 1. Testing Route Accessibility..."
npx playwright test tests/e2e/comprehensive-routes.spec.ts --reporter=line

echo ""
echo "👩‍💼 2. Testing Operator Happy Path..."
npx playwright test tests/e2e/happy-path-operator.spec.ts --reporter=line

echo ""
echo "👤 3. Testing Client Activation Happy Path..."
npx playwright test tests/e2e/happy-path-client.spec.ts --reporter=line

echo ""
echo "🔌 4. Testing API Endpoints..."
npx playwright test tests/e2e/api-endpoints.spec.ts --reporter=line

echo ""
echo "📄 5. Testing PDF Generation Workflow..."
npx playwright test tests/e2e/pdf-generation-workflow.spec.ts --reporter=line

echo ""
echo "📊 Generating Test Report..."
npx playwright show-report --host 0.0.0.0 --port 9323 &
REPORT_PID=$!

echo ""
echo "🎉 Test Suite Complete!"
echo "======================"
echo "📊 HTML Report available at: http://localhost:9323"
echo "🐳 Docker container logs: docker-compose -f docker-dev.yml logs web"
echo "🛑 Stop containers: docker-compose -f docker-dev.yml down"
echo ""
echo "Press Ctrl+C to stop the report server and exit"

# Wait for Ctrl+C
trap "kill $REPORT_PID 2>/dev/null; exit 0" SIGINT
wait $REPORT_PID