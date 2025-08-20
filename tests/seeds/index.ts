/**
 * Test database seeding index
 * Centralized exports for all seeding and cleanup functionality
 */

// Core seeding and cleanup
export * from './test-seed';
export * from './cleanup';

// Scenario-specific setups
export * from './scenarios/empty-database';
export * from './scenarios/populated-database';
export * from './scenarios/error-conditions';

// Re-export main functions for convenience
export {
  seedTestDatabase,
  seedClientsByStatus,
  seedClientsByOperator,
  seedMinimalDataset,
  seedFullDataset,
} from './test-seed';

export {
  cleanupTestDatabase,
  cleanupTableData,
  resetDatabase,
  safeCleanup,
  getCleanupStatistics,
} from './cleanup';

export {
  setupEmptyDatabase,
  verifyEmptyDatabase,
  EMPTY_DATABASE_TESTS,
} from './scenarios/empty-database';

export {
  setupPopulatedDatabase,
  verifyPopulatedDatabase,
  setupClientStatesScenario,
  POPULATED_DATABASE_TESTS,
  POPULATED_SCENARIOS,
} from './scenarios/populated-database';

export {
  setupErrorConditions,
  verifyErrorConditions,
  ERROR_CONDITIONS_TESTS,
  ERROR_SCENARIOS,
  type ErrorCondition,
} from './scenarios/error-conditions';

/**
 * Database scenario types
 */
export type DatabaseScenario = 
  | 'empty'
  | 'minimal'
  | 'populated'
  | 'pending_only'
  | 'activated_only'
  | 'mixed_states'
  | 'error_conditions'
  | 'custom';

/**
 * Unified scenario setup function
 */
export async function setupDatabaseScenario(
  prisma: any, // PrismaClient type
  scenario: DatabaseScenario,
  options: {
    verbose?: boolean;
    errorConditions?: ErrorCondition[];
    clientStates?: ('pending' | 'activated')[];
    customSeed?: () => Promise<void>;
  } = {}
): Promise<{
  scenario: DatabaseScenario;
  description: string;
  setupResult: any;
  duration: number;
}> {
  const startTime = Date.now();
  let setupResult: any;
  let description: string;

  switch (scenario) {
    case 'empty':
      setupResult = await setupEmptyDatabase(prisma, options);
      description = 'Clean database with no data';
      break;

    case 'minimal':
      setupResult = await seedMinimalDataset(prisma, options);
      description = 'Minimal dataset for basic testing';
      break;

    case 'populated':
      setupResult = await setupPopulatedDatabase(prisma, options);
      description = 'Full dataset with comprehensive test data';
      break;

    case 'pending_only':
      setupResult = await setupClientStatesScenario(prisma, ['pending'], options);
      description = 'Only pending clients';
      break;

    case 'activated_only':
      setupResult = await setupClientStatesScenario(prisma, ['activated'], options);
      description = 'Only activated clients with agreements';
      break;

    case 'mixed_states':
      setupResult = await setupClientStatesScenario(
        prisma, 
        options.clientStates || ['pending', 'activated'], 
        options
      );
      description = 'Mixed client states';
      break;

    case 'error_conditions':
      setupResult = await setupErrorConditions(
        prisma,
        options.errorConditions || ['expired_tokens', 'missing_pdfs'],
        options
      );
      description = 'Database with error conditions';
      break;

    case 'custom':
      if (options.customSeed) {
        await options.customSeed();
        setupResult = { custom: true };
        description = 'Custom seeded database';
      } else {
        throw new Error('Custom scenario requires customSeed function');
      }
      break;

    default:
      throw new Error(`Unknown database scenario: ${scenario}`);
  }

  const duration = Date.now() - startTime;

  return {
    scenario,
    description,
    setupResult,
    duration,
  };
}

/**
 * Test environment setup utilities
 */
export const TEST_DATABASE_UTILS = {
  /**
   * Set up test environment with specific scenario
   */
  setupTestEnvironment: async (
    prisma: any,
    scenario: DatabaseScenario = 'minimal',
    options: { verbose?: boolean } = {}
  ) => {
    if (options.verbose) {
      console.log(`🧪 Setting up test environment with ${scenario} scenario...`);
    }

    const result = await setupDatabaseScenario(prisma, scenario, options);

    if (options.verbose) {
      console.log(`✅ Test environment ready: ${result.description}`);
    }

    return result;
  },

  /**
   * Tear down test environment
   */
  tearDownTestEnvironment: async (
    prisma: any,
    options: { verbose?: boolean } = {}
  ) => {
    if (options.verbose) {
      console.log('🧹 Tearing down test environment...');
    }

    const result = await safeCleanup(prisma, options);

    if (options.verbose) {
      console.log('✅ Test environment cleaned');
    }

    return result;
  },

  /**
   * Get comprehensive database statistics
   */
  getDatabaseStatistics: async (prisma: any) => {
    const [clients, agreements, auditEvents, webhookEndpoints] = await Promise.all([
      prisma.client.findMany({
        select: { 
          id: true, 
          status: true, 
          created_by: true,
          activation_token: true,
          token_expires_at: true,
        },
      }),
      prisma.agreement.findMany({
        select: { 
          id: true, 
          terms_version: true,
          pdf_url: true,
          client_id: true,
        },
      }),
      prisma.auditEvent.count(),
      prisma.webhookEndpoint.count(),
    ]);

    const now = new Date();
    const expiredTokens = clients.filter(c => 
      c.activation_token && c.token_expires_at && c.token_expires_at <= now
    ).length;

    const missingPDFs = agreements.filter(a => !a.pdf_url).length;

    const clientsByStatus = clients.reduce((acc, client) => {
      acc[client.status] = (acc[client.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const agreementsByVersion = agreements.reduce((acc, agreement) => {
      acc[agreement.terms_version] = (acc[agreement.terms_version] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totals: {
        clients: clients.length,
        agreements: agreements.length,
        auditEvents,
        webhookEndpoints,
      },
      distributions: {
        clientsByStatus,
        agreementsByVersion,
      },
      issues: {
        expiredTokens,
        missingPDFs,
      },
      timestamp: new Date().toISOString(),
    };
  },

  /**
   * Validate database integrity
   */
  validateDatabaseIntegrity: async (prisma: any) => {
    const stats = await TEST_DATABASE_UTILS.getDatabaseStatistics(prisma);
    
    // Check for referential integrity
    const agreementsWithInvalidClients = await prisma.agreement.count({
      where: {
        client: null, // This would indicate a broken foreign key
      },
    });

    // Check for consistency issues
    const activatedClientsWithTokens = await prisma.client.count({
      where: {
        status: 'activated',
        activation_token: { not: null },
      },
    });

    const pendingClientsWithoutTokens = await prisma.client.count({
      where: {
        status: 'pending',
        activation_token: null,
      },
    });

    return {
      isValid: agreementsWithInvalidClients === 0,
      issues: {
        brokenForeignKeys: agreementsWithInvalidClients,
        activatedClientsWithTokens,
        pendingClientsWithoutTokens,
      },
      stats,
    };
  },
};

/**
 * Jest setup helpers for database testing
 */
export const JEST_DATABASE_HELPERS = {
  /**
   * Set up database for Jest test suite
   */
  setupForJest: (scenario: DatabaseScenario = 'minimal') => {
    let prisma: any;

    beforeAll(async () => {
      // Initialize Prisma client
      const { PrismaClient } = await import('@prisma/client');
      prisma = new PrismaClient();
      
      // Setup initial scenario
      await setupDatabaseScenario(prisma, scenario);
    });

    beforeEach(async () => {
      // Optional: Reset to scenario state before each test
      // This can be expensive, so consider if you really need it
      if (process.env.RESET_DB_BEFORE_EACH_TEST === 'true') {
        await setupDatabaseScenario(prisma, scenario);
      }
    });

    afterAll(async () => {
      // Clean up and disconnect
      await safeCleanup(prisma);
      await prisma.$disconnect();
    });

    // Return getter function to access prisma in tests
    return () => prisma;
  },

  /**
   * Quick setup for individual tests
   */
  withTestDatabase: <T>(
    scenario: DatabaseScenario,
    testFn: (prisma: any) => Promise<T>
  ): (() => Promise<T>) => {
    return async () => {
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      
      try {
        await setupDatabaseScenario(prisma, scenario);
        return await testFn(prisma);
      } finally {
        await safeCleanup(prisma);
        await prisma.$disconnect();
      }
    };
  },
};