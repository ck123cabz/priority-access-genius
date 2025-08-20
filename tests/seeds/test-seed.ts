/**
 * Test database seeding script
 * Populates test database with fixture data for comprehensive testing
 */

import { PrismaClient } from '@prisma/client';
import { 
  ALL_TEST_CLIENTS, 
  ALL_TEST_AGREEMENTS,
  TestClient,
  TestAgreement 
} from '../fixtures';

/**
 * Seeding options for different test scenarios
 */
export interface SeedOptions {
  includeClients?: boolean;
  includeAgreements?: boolean;
  includeAuditEvents?: boolean;
  clientFilter?: (client: TestClient) => boolean;
  agreementFilter?: (agreement: TestAgreement) => boolean;
  verbose?: boolean;
}

/**
 * Default seeding options
 */
const DEFAULT_SEED_OPTIONS: Required<SeedOptions> = {
  includeClients: true,
  includeAgreements: true,
  includeAuditEvents: true,
  clientFilter: () => true,
  agreementFilter: () => true,
  verbose: false,
};

/**
 * Audit event data for seeded records
 */
const generateAuditEvents = (clientId: string, createdBy: string) => [
  {
    id: `audit_${clientId}_create`,
    client_id: clientId,
    actor: createdBy,
    action: 'client.created',
    payload: {
      event: 'client_created',
      metadata: {
        source: 'test_seed',
        timestamp: new Date().toISOString(),
      },
    },
    created_at: new Date(),
  },
  {
    id: `audit_${clientId}_token`,
    client_id: clientId,
    actor: createdBy,
    action: 'activation_token.generated',
    payload: {
      event: 'activation_token_generated',
      metadata: {
        source: 'test_seed',
        timestamp: new Date().toISOString(),
      },
    },
    created_at: new Date(),
  },
];

/**
 * Main seeding function
 */
export async function seedTestDatabase(
  prisma: PrismaClient,
  options: SeedOptions = {}
): Promise<{
  clientsCreated: number;
  agreementsCreated: number;
  auditEventsCreated: number;
  duration: number;
}> {
  const startTime = Date.now();
  const opts = { ...DEFAULT_SEED_OPTIONS, ...options };
  
  let clientsCreated = 0;
  let agreementsCreated = 0;
  let auditEventsCreated = 0;

  if (opts.verbose) {
    console.log('🌱 Starting test database seeding...');
  }

  try {
    // Seed clients
    if (opts.includeClients) {
      const clientsToSeed = ALL_TEST_CLIENTS.filter(opts.clientFilter);
      
      if (opts.verbose) {
        console.log(`📝 Seeding ${clientsToSeed.length} clients...`);
      }

      for (const client of clientsToSeed) {
        try {
          // Validate client data before seeding
          if (!client.id || !client.company_name || !client.contact_name || !client.email) {
            if (opts.verbose) {
              console.warn(`⚠️ Skipping client ${client.id || 'unknown'} - missing required fields`);
            }
            continue;
          }

          await prisma.client.upsert({
            where: { id: client.id },
            update: {
              company_name: client.company_name,
              contact_name: client.contact_name,
              email: client.email,
              role_title: client.role_title,
              notes: client.notes,
              logo_url: client.logo_url,
              status: client.status,
              created_by: client.created_by,
              activation_token: client.activation_token,
              token_expires_at: client.token_expires_at,
              created_at: client.created_at,
              updated_at: client.updated_at,
            },
            create: {
              id: client.id,
              company_name: client.company_name,
              contact_name: client.contact_name,
              email: client.email,
              role_title: client.role_title,
              notes: client.notes,
              logo_url: client.logo_url,
              status: client.status,
              created_by: client.created_by,
              activation_token: client.activation_token,
              token_expires_at: client.token_expires_at,
              created_at: client.created_at,
              updated_at: client.updated_at,
            },
          });
          clientsCreated++;
        } catch (clientError) {
          if (opts.verbose) {
            console.error(`❌ Failed to seed client ${client.id}:`, clientError);
          }
          // Continue with other clients rather than failing entirely
          continue;
        }

        // Seed audit events for each client
        if (opts.includeAuditEvents) {
          const auditEvents = generateAuditEvents(client.id, client.created_by);
          for (const auditEvent of auditEvents) {
            await prisma.auditEvent.upsert({
              where: { id: auditEvent.id },
              update: auditEvent,
              create: auditEvent,
            });
            auditEventsCreated++;
          }
        }
      }
    }

    // Seed agreements
    if (opts.includeAgreements) {
      const agreementsToSeed = ALL_TEST_AGREEMENTS.filter(opts.agreementFilter);
      
      if (opts.verbose) {
        console.log(`📄 Seeding ${agreementsToSeed.length} agreements...`);
      }

      for (const agreement of agreementsToSeed) {
        // Check if the referenced client exists
        const clientExists = await prisma.client.findUnique({
          where: { id: agreement.client_id },
        });

        if (clientExists) {
          await prisma.agreement.upsert({
            where: { id: agreement.id },
            update: {
              client_id: agreement.client_id,
              terms_version: agreement.terms_version,
              pdf_url: agreement.pdf_url,
              signed_at: agreement.signed_at,
              signer_name: agreement.signer_name,
              signer_ip: agreement.signer_ip,
              signature_hash: agreement.signature_hash,
              created_at: agreement.created_at,
            },
            create: {
              id: agreement.id,
              client_id: agreement.client_id,
              terms_version: agreement.terms_version,
              pdf_url: agreement.pdf_url,
              signed_at: agreement.signed_at,
              signer_name: agreement.signer_name,
              signer_ip: agreement.signer_ip,
              signature_hash: agreement.signature_hash,
              created_at: agreement.created_at,
            },
          });
          agreementsCreated++;

          // Add audit event for agreement creation
          if (opts.includeAuditEvents) {
            const agreementAuditEvent = {
              id: `audit_${agreement.id}_signed`,
              client_id: agreement.client_id,
              actor: 'system',
              action: 'agreement.signed',
              payload: {
                event: 'agreement_signed',
                agreement_id: agreement.id,
                terms_version: agreement.terms_version,
                metadata: {
                  source: 'test_seed',
                  timestamp: agreement.signed_at.toISOString(),
                },
              },
              created_at: agreement.created_at,
            };

            await prisma.auditEvent.upsert({
              where: { id: agreementAuditEvent.id },
              update: agreementAuditEvent,
              create: agreementAuditEvent,
            });
            auditEventsCreated++;
          }
        } else if (opts.verbose) {
          console.warn(`⚠️ Skipping agreement ${agreement.id} - client ${agreement.client_id} not found`);
        }
      }
    }

    const duration = Date.now() - startTime;

    if (opts.verbose) {
      console.log(`✅ Seeding completed in ${duration}ms`);
      console.log(`   - Clients: ${clientsCreated}`);
      console.log(`   - Agreements: ${agreementsCreated}`);
      console.log(`   - Audit Events: ${auditEventsCreated}`);
    }

    return {
      clientsCreated,
      agreementsCreated,
      auditEventsCreated,
      duration,
    };

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
}

/**
 * Seed only specific client types
 */
export async function seedClientsByStatus(
  prisma: PrismaClient, 
  status: 'pending' | 'activated',
  options: Omit<SeedOptions, 'clientFilter'> = {}
): Promise<ReturnType<typeof seedTestDatabase>> {
  return seedTestDatabase(prisma, {
    ...options,
    clientFilter: (client) => client.status === status,
  });
}

/**
 * Seed only clients created by specific operator
 */
export async function seedClientsByOperator(
  prisma: PrismaClient, 
  operatorId: string,
  options: Omit<SeedOptions, 'clientFilter'> = {}
): Promise<ReturnType<typeof seedTestDatabase>> {
  return seedTestDatabase(prisma, {
    ...options,
    clientFilter: (client) => client.created_by === operatorId,
  });
}

/**
 * Seed minimal dataset for basic testing
 */
export async function seedMinimalDataset(
  prisma: PrismaClient,
  options: SeedOptions = {}
): Promise<ReturnType<typeof seedTestDatabase>> {
  return seedTestDatabase(prisma, {
    ...options,
    clientFilter: (client) => ['10000000-0000-4000-8000-000000000001', '20000000-0000-4000-8000-000000000001'].includes(client.id),
    agreementFilter: (agreement) => agreement.client_id === '20000000-0000-4000-8000-000000000001',
  });
}

/**
 * Seed full dataset for comprehensive testing
 */
export async function seedFullDataset(
  prisma: PrismaClient,
  options: SeedOptions = {}
): Promise<ReturnType<typeof seedTestDatabase>> {
  return seedTestDatabase(prisma, {
    ...options,
    includeClients: true,
    includeAgreements: true,
    includeAuditEvents: true,
  });
}

/**
 * Command line interface for seeding
 */
if (require.main === module) {
  const prisma = new PrismaClient();
  
  async function runSeeding() {
    try {
      const seedType = process.argv[2] || 'full';
      const verbose = process.argv.includes('--verbose');

      console.log(`🌱 Running ${seedType} seeding...`);

      let result;
      switch (seedType) {
        case 'minimal':
          result = await seedMinimalDataset(prisma, { verbose });
          break;
        case 'pending':
          result = await seedClientsByStatus(prisma, 'pending', { verbose });
          break;
        case 'activated':
          result = await seedClientsByStatus(prisma, 'activated', { verbose });
          break;
        case 'full':
        default:
          result = await seedFullDataset(prisma, { verbose });
          break;
      }

      console.log('✅ Seeding completed successfully:', result);
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }

  runSeeding();
}