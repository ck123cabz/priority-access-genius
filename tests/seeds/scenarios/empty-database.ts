/**
 * Empty database scenario
 * Sets up a completely clean database state for testing
 */

import { PrismaClient } from '@prisma/client';
import { cleanupTestDatabase } from '../cleanup';

/**
 * Set up empty database scenario
 * Ensures the database is completely clean
 */
export async function setupEmptyDatabase(
  prisma: PrismaClient,
  options: { verbose?: boolean } = {}
): Promise<{
  scenario: 'empty_database';
  description: string;
  setup: {
    clientsDeleted: number;
    agreementsDeleted: number;
    auditEventsDeleted: number;
    webhookEndpointsDeleted: number;
  };
  duration: number;
}> {
  const startTime = Date.now();
  
  if (options.verbose) {
    console.log('🗄️ Setting up empty database scenario...');
  }

  // Clean all test data to ensure empty state
  const cleanupResult = await cleanupTestDatabase(prisma, {
    includeClients: true,
    includeAgreements: true,
    includeAuditEvents: true,
    includeWebhookEndpoints: false, // Preserve webhook config
    onlyTestData: true,
    verbose: options.verbose,
  });

  const duration = Date.now() - startTime;

  if (options.verbose) {
    console.log(`✅ Empty database scenario ready in ${duration}ms`);
  }

  return {
    scenario: 'empty_database',
    description: 'Clean database with no test data for testing empty states',
    setup: cleanupResult,
    duration,
  };
}

/**
 * Verify empty database state
 */
export async function verifyEmptyDatabase(
  prisma: PrismaClient
): Promise<{
  isEmpty: boolean;
  counts: {
    clients: number;
    agreements: number;
    auditEvents: number;
    webhookEndpoints: number;
  };
}> {
  const [clientCount, agreementCount, auditEventCount, webhookEndpointCount] = await Promise.all([
    prisma.client.count(),
    prisma.agreement.count(),
    prisma.auditEvent.count(),
    prisma.webhookEndpoint.count(),
  ]);

  const counts = {
    clients: clientCount,
    agreements: agreementCount,
    auditEvents: auditEventCount,
    webhookEndpoints: webhookEndpointCount,
  };

  const isEmpty = clientCount === 0 && agreementCount === 0 && auditEventCount === 0;

  return {
    isEmpty,
    counts,
  };
}

/**
 * Test helpers for empty database scenario
 */
export const EMPTY_DATABASE_TESTS = {
  /**
   * Test function with empty database
   */
  runWithEmptyDatabase: async <T>(
    prisma: PrismaClient,
    testFn: () => Promise<T>,
    options: { verbose?: boolean } = {}
  ): Promise<T> => {
    await setupEmptyDatabase(prisma, options);
    return testFn();
  },

  /**
   * Assert database is empty
   */
  assertDatabaseIsEmpty: async (prisma: PrismaClient): Promise<void> => {
    const verification = await verifyEmptyDatabase(prisma);
    
    if (!verification.isEmpty) {
      throw new Error(
        `Expected empty database but found: ${JSON.stringify(verification.counts, null, 2)}`
      );
    }
  },

  /**
   * Get empty state statistics
   */
  getEmptyStateStats: async (prisma: PrismaClient) => {
    return verifyEmptyDatabase(prisma);
  },
};

/**
 * Command line interface
 */
if (require.main === module) {
  const prisma = new PrismaClient();
  
  async function runEmptyDatabaseSetup() {
    try {
      const verbose = process.argv.includes('--verbose');
      const verify = process.argv.includes('--verify');

      if (verify) {
        const verification = await verifyEmptyDatabase(prisma);
        console.log('📊 Database State:', verification);
        
        if (verification.isEmpty) {
          console.log('✅ Database is empty');
        } else {
          console.log('⚠️ Database contains data');
        }
      } else {
        const result = await setupEmptyDatabase(prisma, { verbose });
        console.log('✅ Empty database scenario setup completed:', result);
      }
    } catch (error) {
      console.error('❌ Empty database setup failed:', error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }

  runEmptyDatabaseSetup();
}