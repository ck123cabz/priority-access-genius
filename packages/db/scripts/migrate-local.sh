#!/bin/bash

set -e

echo "🚀 Starting local database migration..."

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/../../.." && pwd )"

cd "$PROJECT_ROOT/packages/db"

if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found in packages/db/"
    echo "Creating .env file for local Supabase..."
    echo "DATABASE_URL=\"postgresql://postgres:postgres@localhost:54322/postgres\"" > .env
fi

echo "📦 Installing dependencies..."
pnpm install

echo "🔄 Running Prisma migrations..."
pnpm run migrate:dev

echo "✅ Local migration completed successfully!"