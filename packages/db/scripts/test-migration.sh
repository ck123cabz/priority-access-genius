#!/bin/bash

set -e

echo "🧪 Testing migration application..."

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../../.." && pwd )"

cd "$PROJECT_ROOT/packages/db"

if [ ! -f ".env" ]; then
    echo "Creating test .env file..."
    echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:54322/postgres\"" > .env
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🔄 Resetting database to clean state..."
pnpm run migrate:reset || true

echo "🚀 Applying migrations..."
pnpm run migrate:deploy

echo "📊 Checking migration status..."
pnpm run migrate:status

echo "🔍 Verifying schema..."
pnpm run generate

echo "✅ Migration test completed successfully!"