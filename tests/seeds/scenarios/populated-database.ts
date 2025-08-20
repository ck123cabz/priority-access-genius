/**
 * Populated database scenario
 * Sets up a full database with comprehensive test data
 */

import { PrismaClient } from '@prisma/client';
import { seedFullDataset } from '../test-seed';
import { cleanupTestDatabase } from '../cleanup';

/**
 * Set up populated database scenario
 * Cleans and then populates the database with all test fixtures
 */
export async function setupPopulatedDatabase(
  prisma: PrismaClient,
  options: { 
    verbose?: boolean;
    includeEdgeCases?: boolean;
    includeInvalidData?: boolean;
  } = {}
): Promise<{
  scenario: 'populated_database';
  description: string;
  setup: {
    cleanup: {
      clientsDeleted: number;
      agreementsDeleted: number;
      auditEventsDeleted: number;
    };
    seeding: {
      clientsCreated: number;
      agreementsCreated: number;
      auditEventsCreated: number;
    };
  };
  duration: number;
}> {
  const startTime = Date.now();
  
  if (options.verbose) {
    console.log('📚 Setting up populated database scenario...');
  }

  // First clean any existing test data
  const cleanupResult = await cleanupTestDatabase(prisma, {
    includeClients: true,
    includeAgreements: true,
    includeAuditEvents: true,
    onlyTestData: true,
    verbose: options.verbose,
  });

  // Then populate with full test dataset
  const seedingResult = await seedFullDataset(prisma, {
    verbose: options.verbose,
    includeClients: true,
    includeAgreements: true,
    includeAuditEvents: true,
  });

  const duration = Date.now() - startTime;

  if (options.verbose) {
    console.log(`✅ Populated database scenario ready in ${duration}ms`);
    console.log(`   Data created: ${seedingResult.clientsCreated} clients, ${seedingResult.agreementsCreated} agreements`);
  }

  return {
    scenario: 'populated_database',
    description: 'Full database with comprehensive test data including all client states and agreements',
    setup: {
      cleanup: {
        clientsDeleted: cleanupResult.clientsDeleted,
        agreementsDeleted: cleanupResult.agreementsDeleted,
        auditEventsDeleted: cleanupResult.auditEventsDeleted,
      },
      seeding: {
        clientsCreated: seedingResult.clientsCreated,
        agreementsCreated: seedingResult.agreementsCreated,
        auditEventsCreated: seedingResult.auditEventsCreated,
      },
    },
    duration,
  };
}

/**
 * Verify populated database state
 */
export async function verifyPopulatedDatabase(
  prisma: PrismaClient
): Promise<{
  isPopulated: boolean;
  counts: {
    clients: number;
    pendingClients: number;
    activatedClients: number;
    agreements: number;
    auditEvents: number;
  };
  distribution: {
    clientsByOperator: Record<string, number>;
    agreementsByVersion: Record<string, number>;
  };
}> {
  const [clients, agreements, auditEvents] = await Promise.all([
    prisma.client.findMany({ select: { id: true, status: true, created_by: true } }),
    prisma.agreement.findMany({ select: { id: true, terms_version: true } }),
    prisma.auditEvent.count(),
  ]);

  const pendingClients = clients.filter(c => c.status === 'pending').length;
  const activatedClients = clients.filter(c => c.status === 'activated').length;

  // Distribution analysis
  const clientsByOperator = clients.reduce((acc, client) => {
    acc[client.created_by] = (acc[client.created_by] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const agreementsByVersion = agreements.reduce((acc, agreement) => {
    acc[agreement.terms_version] = (acc[agreement.terms_version] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const counts = {
    clients: clients.length,
    pendingClients,
    activatedClients,
    agreements: agreements.length,
    auditEvents,
  };

  const isPopulated = clients.length > 0 && agreements.length > 0;

  return {
    isPopulated,
    counts,
    distribution: {
      clientsByOperator,
      agreementsByVersion,
    },
  };
}

/**
 * Set up specific client states for testing
 */
export async function setupClientStatesScenario(
  prisma: PrismaClient,
  states: ('pending' | 'activated')[],
  options: { verbose?: boolean } = {}
): Promise<{
  scenario: 'client_states';
  description: string;
  clientsCreated: Record<string, number>;
  duration: number;
}> {
  const startTime = Date.now();
  
  if (options.verbose) {
    console.log(`🎭 Setting up client states scenario: ${states.join(', ')}`);
  }

  // Clean existing test data
  await cleanupTestDatabase(prisma, {
    includeClients: true,
    includeAgreements: true,
    includeAuditEvents: true,
    onlyTestData: true,
    verbose: options.verbose,
  });

  const clientsCreated: Record<string, number> = {};

  // Seed clients for each requested state
  for (const state of states) {
    const result = await seedFullDataset(prisma, {
      verbose: options.verbose,
      clientFilter: (client) => client.status === state,
      agreementFilter: (agreement) => {
        // Only include agreements for activated clients
        return state === 'activated';
      },
    });
    
    clientsCreated[state] = result.clientsCreated;
  }

  const duration = Date.now() - startTime;

  if (options.verbose) {
    console.log(`✅ Client states scenario ready in ${duration}ms`);
    Object.entries(clientsCreated).forEach(([state, count]) => {
      console.log(`   ${state}: ${count} clients`);
    });
  }

  return {
    scenario: 'client_states',
    description: `Database with clients in specific states: ${states.join(', ')}`,
    clientsCreated,
    duration,
  };
}

/**
 * Test helpers for populated database scenario
 */
export const POPULATED_DATABASE_TESTS = {
  /**
   * Test function with populated database
   */
  runWithPopulatedDatabase: async <T>(
    prisma: PrismaClient,
    testFn: () => Promise<T>,
    options: { verbose?: boolean } = {}
  ): Promise<T> => {
    await setupPopulatedDatabase(prisma, options);
    return testFn();
  },

  /**
   * Assert database is populated
   */
  assertDatabaseIsPopulated: async (prisma: PrismaClient, minClients = 1, minAgreements = 1): Promise<void> => {
    const verification = await verifyPopulatedDatabase(prisma);
    
    if (!verification.isPopulated) {
      throw new Error('Expected populated database but found empty database');
    }

    if (verification.counts.clients < minClients) {
      throw new Error(`Expected at least ${minClients} clients but found ${verification.counts.clients}`);
    }

    if (verification.counts.agreements < minAgreements) {
      throw new Error(`Expected at least ${minAgreements} agreements but found ${verification.counts.agreements}`);
    }
  },

  /**
   * Get populated state statistics
   */
  getPopulatedStateStats: async (prisma: PrismaClient) => {
    return verifyPopulatedDatabase(prisma);
  },

  /**
   * Test with specific client states
   */
  runWithClientStates: async <T>(
    prisma: PrismaClient,
    states: ('pending' | 'activated')[],
    testFn: () => Promise<T>,
    options: { verbose?: boolean } = {}
  ): Promise<T> => {
    await setupClientStatesScenario(prisma, states, options);
    return testFn();
  },
};

/**
 * Predefined populated scenarios
 */
export const POPULATED_SCENARIOS = {
  FULL_DATASET: {
    name: 'full_dataset',
    setup: (prisma: PrismaClient, verbose = false) => 
      setupPopulatedDatabase(prisma, { verbose }),
    description: 'Complete dataset with all test fixtures',
  },
  PENDING_ONLY: {
    name: 'pending_only',
    setup: (prisma: PrismaClient, verbose = false) => 
      setupClientStatesScenario(prisma, ['pending'], { verbose }),
    description: 'Only pending clients for activation flow testing',
  },
  ACTIVATED_ONLY: {
    name: 'activated_only',
    setup: (prisma: PrismaClient, verbose = false) => 
      setupClientStatesScenario(prisma, ['activated'], { verbose }),
    description: 'Only activated clients with agreements for post-activation testing',
  },
  MIXED_STATES: {
    name: 'mixed_states',
    setup: (prisma: PrismaClient, verbose = false) => 
      setupClientStatesScenario(prisma, ['pending', 'activated'], { verbose }),
    description: 'Mix of pending and activated clients for comprehensive testing',
  },
} as const;

/**
 * Command line interface
 */
if (require.main === module) {
  const prisma = new PrismaClient();
  
  async function runPopulatedDatabaseSetup() {
    try {
      const scenario = process.argv[2] || 'full_dataset';
      const verbose = process.argv.includes('--verbose');
      const verify = process.argv.includes('--verify');

      if (verify) {
        const verification = await verifyPopulatedDatabase(prisma);
        console.log('📊 Database State:', JSON.stringify(verification, null, 2));
        
        if (verification.isPopulated) {
          console.log('✅ Database is populated');
        } else {
          console.log('⚠️ Database is empty');
        }
      } else {
        console.log(`🚀 Running ${scenario} scenario setup...`);

        let result;
        switch (scenario) {
          case 'full_dataset':
            result = await POPULATED_SCENARIOS.FULL_DATASET.setup(prisma, verbose);
            break;
          case 'pending_only':
            result = await POPULATED_SCENARIOS.PENDING_ONLY.setup(prisma, verbose);
            break;
          case 'activated_only':
            result = await POPULATED_SCENARIOS.ACTIVATED_ONLY.setup(prisma, verbose);
            break;
          case 'mixed_states':
            result = await POPULATED_SCENARIOS.MIXED_STATES.setup(prisma, verbose);
            break;
          default:
            result = await setupPopulatedDatabase(prisma, { verbose });
            break;
        }

        console.log('✅ Populated database scenario setup completed:', result);
      }
    } catch (error) {
      console.error('❌ Populated database setup failed:', error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }

  runPopulatedDatabaseSetup();
}