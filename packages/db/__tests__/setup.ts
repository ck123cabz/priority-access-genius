import { PrismaClient } from '@prisma/client';
import { execSync } from 'child_process';
import * as path from 'path';

export async function setupTestDatabase(): Promise<PrismaClient> {
  const databaseUrl = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:54322/postgres_test';
  
  process.env.DATABASE_URL = databaseUrl;

  try {
    execSync('pnpm run migrate:deploy', {
      cwd: path.join(__dirname, '..'),
      env: { ...process.env, DATABASE_URL: databaseUrl },
      stdio: 'pipe',
    });
  } catch (error: any) {
    console.error('Migration failed:', error.message);
    throw error;
  }

  return new PrismaClient({
    datasources: {
      db: { url: databaseUrl },
    },
  });
}

export async function teardownTestDatabase(prisma: PrismaClient): Promise<void> {
  await prisma.$disconnect();
}

export async function cleanDatabase(prisma: PrismaClient): Promise<void> {
  await prisma.$transaction([
    prisma.webhookEndpoint.deleteMany(),
    prisma.auditEvent.deleteMany(),
    prisma.agreement.deleteMany(),
    prisma.client.deleteMany(),
  ]);
}