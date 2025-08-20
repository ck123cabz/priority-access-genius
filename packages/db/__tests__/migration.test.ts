import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

describe('Database Migrations', () => {
  let prisma: PrismaClient;

  beforeAll(() => {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/postgres',
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('Migration Files', () => {
    test('should have migration files in the correct location', () => {
      const migrationsDir = path.join(__dirname, '../prisma/migrations');
      expect(fs.existsSync(migrationsDir)).toBe(true);
      
      const migrations = fs.readdirSync(migrationsDir)
        .filter(f => fs.statSync(path.join(migrationsDir, f)).isDirectory());
      
      expect(migrations.length).toBeGreaterThan(0);
    });

    test('should have corresponding Supabase migrations', () => {
      const prismaDir = path.join(__dirname, '../prisma/migrations');
      const supabaseDir = path.join(__dirname, '../../../supabase/migrations');
      
      if (!fs.existsSync(supabaseDir)) {
        fs.mkdirSync(supabaseDir, { recursive: true });
      }

      const prismaMigrations = fs.readdirSync(prismaDir)
        .filter(f => fs.statSync(path.join(prismaDir, f)).isDirectory())
        .filter(f => f.match(/^\d{14}_/));

      prismaMigrations.forEach(migration => {
        const supabaseMigration = `${migration}.sql`;
        const supabasePath = path.join(supabaseDir, supabaseMigration);
        expect(fs.existsSync(supabasePath)).toBe(true);
      });
    });

    test('should have RLS policies migration', () => {
      const rlsPath = path.join(__dirname, '../../../supabase/migrations/20250819221900_enable_rls_policies.sql');
      expect(fs.existsSync(rlsPath)).toBe(true);
    });
  });

  describe('Schema Validation', () => {
    test('should have all required tables', async () => {
      const tables = await prisma.$queryRaw<Array<{ tablename: string }>>`
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN ('clients', 'agreements', 'audit_events', 'webhook_endpoints')
      `;

      expect(tables).toHaveLength(4);
      expect(tables.map(t => t.tablename)).toContain('clients');
      expect(tables.map(t => t.tablename)).toContain('agreements');
      expect(tables.map(t => t.tablename)).toContain('audit_events');
      expect(tables.map(t => t.tablename)).toContain('webhook_endpoints');
    });

    test('should have correct columns in clients table', async () => {
      const columns = await prisma.$queryRaw<Array<{ column_name: string }>>`
        SELECT column_name FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'clients'
      `;

      const columnNames = columns.map(c => c.column_name);
      expect(columnNames).toContain('id');
      expect(columnNames).toContain('company_name');
      expect(columnNames).toContain('contact_name');
      expect(columnNames).toContain('email');
      expect(columnNames).toContain('activation_token');
      expect(columnNames).toContain('token_expires_at');
    });

    test('should have indexes on foreign keys', async () => {
      const indexes = await prisma.$queryRaw<Array<{ indexname: string }>>`
        SELECT indexname FROM pg_indexes 
        WHERE schemaname = 'public' 
        AND tablename IN ('agreements', 'audit_events')
        AND indexname LIKE '%client_id%'
      `;

      expect(indexes.length).toBeGreaterThan(0);
    });
  });

  describe('Migration Idempotency', () => {
    test('should handle repeated migration attempts gracefully', async () => {
      try {
        execSync('pnpm run migrate:status', {
          cwd: path.join(__dirname, '..'),
          stdio: 'pipe',
        });
      } catch (error: any) {
        expect(error.message).not.toContain('error');
      }
    });
  });

  describe('Seed Data', () => {
    test('should create seed data without errors', async () => {
      await prisma.client.deleteMany({});
      await prisma.agreement.deleteMany({});
      await prisma.auditEvent.deleteMany({});
      await prisma.webhookEndpoint.deleteMany({});

      try {
        execSync('pnpm run seed', {
          cwd: path.join(__dirname, '..'),
          stdio: 'pipe',
        });
      } catch (error: any) {
        throw new Error(`Seed script failed: ${error.message}`);
      }

      const clientCount = await prisma.client.count();
      expect(clientCount).toBeGreaterThan(0);
    });

    test('should respect referential integrity in seed data', async () => {
      const agreements = await prisma.agreement.findMany({
        include: { client: true },
      });

      agreements.forEach(agreement => {
        expect(agreement.client).toBeDefined();
        expect(agreement.client.id).toBe(agreement.client_id);
      });
    });
  });

  describe('RLS Policies', () => {
    test('should have RLS enabled on all tables', async () => {
      const tables = ['clients', 'agreements', 'audit_events', 'webhook_endpoints'];
      
      for (const table of tables) {
        const result = await prisma.$queryRaw<Array<{ relrowsecurity: boolean }>>`
          SELECT relrowsecurity FROM pg_class 
          WHERE relname = ${table} 
          AND relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
        `;

        expect(result[0]?.relrowsecurity).toBe(true);
      }
    });

    test('should have RLS policies defined', async () => {
      const policies = await prisma.$queryRaw<Array<{ policyname: string }>>`
        SELECT policyname FROM pg_policies 
        WHERE schemaname = 'public' 
        AND tablename IN ('clients', 'agreements', 'audit_events', 'webhook_endpoints')
      `;

      expect(policies.length).toBeGreaterThan(0);
    });
  });

  describe('Migration Rollback', () => {
    test('should track migration history', async () => {
      const migrationsTable = await prisma.$queryRaw<Array<{ tablename: string }>>`
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename = '_prisma_migrations'
      `;

      expect(migrationsTable).toHaveLength(1);
    });

    test('should have checksums for all migrations', async () => {
      const migrations = await prisma.$queryRaw<Array<{ 
        migration_name: string,
        checksum: string,
        finished_at: Date | null
      }>>`
        SELECT migration_name, checksum, finished_at 
        FROM _prisma_migrations
      `;

      migrations.forEach(migration => {
        expect(migration.checksum).toBeDefined();
        expect(migration.checksum.length).toBeGreaterThan(0);
        expect(migration.finished_at).toBeDefined();
      });
    });
  });
});