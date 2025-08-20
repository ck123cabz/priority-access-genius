#!/bin/bash

set -e

echo "🚀 Starting remote database migration..."

if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is not set"
    echo "Please set DATABASE_URL to your remote Supabase connection string"
    exit 1
fi

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../../.." && pwd )"

cd "$PROJECT_ROOT/packages/db"

echo "📦 Installing dependencies..."
pnpm install

echo "🔄 Running Prisma migrations..."
pnpm run migrate:deploy

echo "🔍 Checking migration status..."
pnpm run migrate:status

echo "✅ Remote migration completed successfully!"