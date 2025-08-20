/**
 * Test database cleanup script
 * Resets test database to clean state by removing all test data
 */

import { PrismaClient } from '@prisma/client';

/**
 * Cleanup options for different scenarios
 */
export interface CleanupOptions {
  includeClients?: boolean;
  includeAgreements?: boolean;
  includeAuditEvents?: boolean;
  includeWebhookEndpoints?: boolean;
  onlyTestData?: boolean; // Only remove records with test IDs
  verbose?: boolean;
  dryRun?: boolean; // Show what would be deleted without actually deleting
}

/**
 * Default cleanup options
 */
const DEFAULT_CLEANUP_OPTIONS: Required<CleanupOptions> = {
  includeClients: true,
  includeAgreements: true,
  includeAuditEvents: true,
  includeWebhookEndpoints: false, // Usually preserve webhook config
  onlyTestData: true, // Safe default - only remove test data
  verbose: false,
  dryRun: false,
};

/**
 * Test ID patterns to identify test records
 */
const TEST_ID_PATTERNS = [
  /^10000000-/, // Pending clients
  /^20000000-/, // Activated clients
  /^30000000-/, // Edge case clients
  /^40000000-/, // Agreements
  /^50000000-/, // Edge case agreements
  /^60000000-/, // Invalid agreements
  /^audit_.*/, // Audit events
  /^file_.*_test/, // Test files
];

/**
 * Check if an ID matches test patterns
 */
function isTestId(id: string): boolean {
  return TEST_ID_PATTERNS.some(pattern => pattern.test(id));
}

/**
 * Main cleanup function
 */
export async function cleanupTestDatabase(
  prisma: PrismaClient,
  options: CleanupOptions = {}
): Promise<{
  clientsDeleted: number;
  agreementsDeleted: number;
  auditEventsDeleted: number;
  webhookEndpointsDeleted: number;
  duration: number;
}> {
  const startTime = Date.now();
  const opts = { ...DEFAULT_CLEANUP_OPTIONS, ...options };
  
  let clientsDeleted = 0;
  let agreementsDeleted = 0;
  let auditEventsDeleted = 0;
  let webhookEndpointsDeleted = 0;

  if (opts.verbose) {
    console.log(opts.dryRun ? '🧪 Running cleanup dry run...' : '🧹 Starting test database cleanup...');
  }

  try {
    // Clean audit events first (they reference clients)
    if (opts.includeAuditEvents) {
      const auditEventsToDelete = await prisma.auditEvent.findMany({
        where: opts.onlyTestData ? {
          id: { in: [] }, // Will be populated with matching IDs
        } : {},
        select: { id: true },
      });

      // Filter by test ID patterns if onlyTestData is true
      const auditEventIds = opts.onlyTestData 
        ? auditEventsToDelete.filter(event => isTestId(event.id)).map(e => e.id)
        : auditEventsToDelete.map(e => e.id);

      if (auditEventIds.length > 0) {
        if (opts.verbose) {
          console.log(`🗑️ ${opts.dryRun ? 'Would delete' : 'Deleting'} ${auditEventIds.length} audit events...`);
        }

        if (!opts.dryRun) {
          const result = await prisma.auditEvent.deleteMany({
            where: {
              id: { in: auditEventIds },
            },
          });
          auditEventsDeleted = result.count;
        } else {
          auditEventsDeleted = auditEventIds.length;
        }
      }
    }

    // Clean agreements (they reference clients)
    if (opts.includeAgreements) {
      const agreementsToDelete = await prisma.agreement.findMany({
        select: { id: true, client_id: true },
      });

      // Filter by test ID patterns if onlyTestData is true
      const agreementIds = opts.onlyTestData 
        ? agreementsToDelete.filter(agreement => isTestId(agreement.id) || isTestId(agreement.client_id)).map(a => a.id)
        : agreementsToDelete.map(a => a.id);

      if (agreementIds.length > 0) {
        if (opts.verbose) {
          console.log(`🗑️ ${opts.dryRun ? 'Would delete' : 'Deleting'} ${agreementIds.length} agreements...`);
        }

        if (!opts.dryRun) {
          const result = await prisma.agreement.deleteMany({
            where: {
              id: { in: agreementIds },
            },
          });
          agreementsDeleted = result.count;
        } else {
          agreementsDeleted = agreementIds.length;
        }
      }
    }

    // Clean clients
    if (opts.includeClients) {
      const clientsToDelete = await prisma.client.findMany({
        select: { id: true, email: true },
      });

      // Filter by test ID patterns if onlyTestData is true
      const clientIds = opts.onlyTestData 
        ? clientsToDelete.filter(client => isTestId(client.id) || client.email.includes('test.com')).map(c => c.id)
        : clientsToDelete.map(c => c.id);

      if (clientIds.length > 0) {
        if (opts.verbose) {
          console.log(`🗑️ ${opts.dryRun ? 'Would delete' : 'Deleting'} ${clientIds.length} clients...`);
        }

        if (!opts.dryRun) {
          const result = await prisma.client.deleteMany({
            where: {
              id: { in: clientIds },
            },
          });
          clientsDeleted = result.count;
        } else {
          clientsDeleted = clientIds.length;
        }
      }
    }

    // Clean webhook endpoints (optional)
    if (opts.includeWebhookEndpoints) {
      const webhookEndpointsToDelete = await prisma.webhookEndpoint.findMany({
        select: { id: true, url: true },
      });

      // Filter by test patterns if onlyTestData is true
      const webhookIds = opts.onlyTestData 
        ? webhookEndpointsToDelete.filter(webhook => webhook.url.includes('test') || isTestId(webhook.id)).map(w => w.id)
        : webhookEndpointsToDelete.map(w => w.id);

      if (webhookIds.length > 0) {
        if (opts.verbose) {
          console.log(`🗑️ ${opts.dryRun ? 'Would delete' : 'Deleting'} ${webhookIds.length} webhook endpoints...`);
        }

        if (!opts.dryRun) {
          const result = await prisma.webhookEndpoint.deleteMany({
            where: {
              id: { in: webhookIds },
            },
          });
          webhookEndpointsDeleted = result.count;
        } else {
          webhookEndpointsDeleted = webhookIds.length;
        }
      }
    }

    const duration = Date.now() - startTime;

    if (opts.verbose) {
      console.log(`✅ Cleanup ${opts.dryRun ? 'dry run' : ''} completed in ${duration}ms`);
      console.log(`   - Clients: ${clientsDeleted}`);
      console.log(`   - Agreements: ${agreementsDeleted}`);
      console.log(`   - Audit Events: ${auditEventsDeleted}`);
      console.log(`   - Webhook Endpoints: ${webhookEndpointsDeleted}`);
    }

    return {
      clientsDeleted,
      agreementsDeleted,
      auditEventsDeleted,
      webhookEndpointsDeleted,
      duration,
    };

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
    throw error;
  }
}

/**
 * Clean up only specific table
 */
export async function cleanupTableData(
  prisma: PrismaClient,
  table: 'clients' | 'agreements' | 'audit_events' | 'webhook_endpoints',
  options: Omit<CleanupOptions, 'includeClients' | 'includeAgreements' | 'includeAuditEvents' | 'includeWebhookEndpoints'> = {}
): Promise<ReturnType<typeof cleanupTestDatabase>> {
  const cleanupOptions: CleanupOptions = {
    ...options,
    includeClients: table === 'clients',
    includeAgreements: table === 'agreements',
    includeAuditEvents: table === 'audit_events',
    includeWebhookEndpoints: table === 'webhook_endpoints',
  };

  return cleanupTestDatabase(prisma, cleanupOptions);
}

/**
 * Complete database reset (careful - removes ALL data)
 */
export async function resetDatabase(
  prisma: PrismaClient,
  options: Pick<CleanupOptions, 'verbose' | 'dryRun'> = {}
): Promise<ReturnType<typeof cleanupTestDatabase>> {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Database reset is not allowed in production environment');
  }

  return cleanupTestDatabase(prisma, {
    ...options,
    includeClients: true,
    includeAgreements: true,
    includeAuditEvents: true,
    includeWebhookEndpoints: true,
    onlyTestData: false, // Remove ALL data
  });
}

/**
 * Safe cleanup - only removes confirmed test data
 */
export async function safeCleanup(
  prisma: PrismaClient,
  options: CleanupOptions = {}
): Promise<ReturnType<typeof cleanupTestDatabase>> {
  return cleanupTestDatabase(prisma, {
    ...options,
    onlyTestData: true, // Force safe mode
  });
}

/**
 * Get statistics about what would be cleaned
 */
export async function getCleanupStatistics(
  prisma: PrismaClient,
  options: CleanupOptions = {}
): Promise<{
  testClients: number;
  testAgreements: number;
  testAuditEvents: number;
  testWebhookEndpoints: number;
  totalClients: number;
  totalAgreements: number;
  totalAuditEvents: number;
  totalWebhookEndpoints: number;
}> {
  const [clients, agreements, auditEvents, webhookEndpoints] = await Promise.all([
    prisma.client.findMany({ select: { id: true, email: true } }),
    prisma.agreement.findMany({ select: { id: true, client_id: true } }),
    prisma.auditEvent.findMany({ select: { id: true } }),
    prisma.webhookEndpoint.findMany({ select: { id: true, url: true } }),
  ]);

  const testClients = clients.filter(c => isTestId(c.id) || c.email.includes('test.com')).length;
  const testAgreements = agreements.filter(a => isTestId(a.id) || isTestId(a.client_id)).length;
  const testAuditEvents = auditEvents.filter(e => isTestId(e.id)).length;
  const testWebhookEndpoints = webhookEndpoints.filter(w => w.url.includes('test') || isTestId(w.id)).length;

  return {
    testClients,
    testAgreements,
    testAuditEvents,
    testWebhookEndpoints,
    totalClients: clients.length,
    totalAgreements: agreements.length,
    totalAuditEvents: auditEvents.length,
    totalWebhookEndpoints: webhookEndpoints.length,
  };
}

/**
 * Command line interface for cleanup
 */
if (require.main === module) {
  const prisma = new PrismaClient();
  
  async function runCleanup() {
    try {
      const cleanupType = process.argv[2] || 'safe';
      const verbose = process.argv.includes('--verbose');
      const dryRun = process.argv.includes('--dry-run');

      console.log(`🧹 Running ${cleanupType} cleanup${dryRun ? ' (dry run)' : ''}...`);

      // Show statistics first
      if (verbose || dryRun) {
        const stats = await getCleanupStatistics(prisma);
        console.log('📊 Cleanup Statistics:');
        console.log(`   Test Data - Clients: ${stats.testClients}, Agreements: ${stats.testAgreements}, Audit Events: ${stats.testAuditEvents}`);
        console.log(`   Total Data - Clients: ${stats.totalClients}, Agreements: ${stats.totalAgreements}, Audit Events: ${stats.totalAuditEvents}`);
        console.log('');
      }

      let result;
      switch (cleanupType) {
        case 'safe':
          result = await safeCleanup(prisma, { verbose, dryRun });
          break;
        case 'clients':
          result = await cleanupTableData(prisma, 'clients', { verbose, dryRun });
          break;
        case 'agreements':
          result = await cleanupTableData(prisma, 'agreements', { verbose, dryRun });
          break;
        case 'audit':
          result = await cleanupTableData(prisma, 'audit_events', { verbose, dryRun });
          break;
        case 'reset':
          if (process.env.NODE_ENV === 'production') {
            console.error('❌ Database reset is not allowed in production');
            process.exit(1);
          }
          console.log('⚠️ WARNING: This will delete ALL data from the database!');
          console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...');
          await new Promise(resolve => setTimeout(resolve, 5000));
          result = await resetDatabase(prisma, { verbose, dryRun });
          break;
        default:
          result = await cleanupTestDatabase(prisma, { verbose, dryRun });
          break;
      }

      console.log(dryRun ? '✅ Dry run completed:' : '✅ Cleanup completed successfully:', result);
    } catch (error) {
      console.error('❌ Cleanup failed:', error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }

  runCleanup();
}