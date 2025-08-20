# Database Package

This package contains the Prisma schema, migrations, and database client for the Genius Priority Access application.

## Setup

### Prerequisites
- Node.js 20+
- pnpm 9+
- Docker Desktop (for local Supabase)
- Supabase CLI

### Local Development

1. Start local Supabase:
```bash
supabase start
```

2. Run migrations:
```bash
pnpm run migrate:dev
```

3. Seed the database (optional):
```bash
pnpm run seed
```

Or run setup (migrations + seed):
```bash
pnpm run db:setup
```

## Migration Commands

### Development
- `pnpm run migrate:dev` - Create and apply migrations in development
- `pnpm run migrate:create` - Create a migration without applying it
- `pnpm run migrate:status` - Check migration status
- `pnpm run migrate:reset` - Reset database and reapply all migrations

### Production
- `pnpm run migrate:deploy` - Apply pending migrations to production

### Scripts
- `./scripts/migrate-local.sh` - Apply migrations to local Supabase
- `./scripts/migrate-remote.sh` - Deploy migrations to remote Supabase (requires DATABASE_URL)

## Database Management

### Prisma Studio
View and edit data through Prisma Studio:
```bash
pnpm run studio
```

### Generate Prisma Client
After schema changes:
```bash
pnpm run generate
```

### Push Schema Changes (Development Only)
Push schema changes without creating migrations:
```bash
pnpm run push
```

## Environment Variables

Create a `.env` file in this directory:

```env
# Local Supabase
DATABASE_URL="postgresql://postgres:postgres@localhost:54322/postgres"

# For remote/production, use your Supabase connection string:
# DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT].supabase.co:5432/postgres"
```

## Testing

Run tests:
```bash
pnpm test
```

## Migration Process

### Creating New Migrations

1. Modify the schema in `prisma/schema.prisma`
2. Create a migration:
   ```bash
   pnpm run migrate:dev --name your_migration_name
   ```
3. The migration will be created in `prisma/migrations/`
4. For Supabase compatibility, copy SQL to `../../supabase/migrations/`

### Deploying to Production

1. Set the production DATABASE_URL
2. Run deployment:
   ```bash
   pnpm run migrate:deploy
   ```

### RLS Policies

Row Level Security policies are managed separately in `supabase/migrations/`. These are applied after Prisma migrations to ensure proper security.

## Project Structure

```
packages/db/
├── prisma/
│   ├── schema.prisma      # Database schema
│   ├── migrations/        # Prisma migrations
│   └── seed.ts           # Seed data
├── scripts/
│   ├── migrate-local.sh  # Local migration script
│   └── migrate-remote.sh # Remote migration script
├── generated/            # Generated Prisma client
├── __tests__/           # Migration tests
└── package.json         # Package configuration
```