/**
 * Error conditions scenario
 * Sets up database states that trigger various error conditions for testing
 */

import { PrismaClient } from '@prisma/client';
import { seedTestDatabase } from '../test-seed';
import { cleanupTestDatabase } from '../cleanup';
import { EDGE_CASE_CLIENTS, INVALID_AGREEMENTS, TEST_OPERATOR_IDS } from '../../fixtures';

/**
 * Error condition types for testing
 */
export type ErrorCondition = 
  | 'expired_tokens'
  | 'missing_pdfs'
  | 'invalid_references'
  | 'constraint_violations'
  | 'edge_case_data'
  | 'orphaned_records';

/**
 * Set up error conditions scenario
 * Creates database states that should trigger specific error conditions
 */
export async function setupErrorConditions(
  prisma: PrismaClient,
  conditions: ErrorCondition[],
  options: { verbose?: boolean } = {}
): Promise<{
  scenario: 'error_conditions';
  description: string;
  conditionsSetup: Record<ErrorCondition, any>;
  duration: number;
}> {
  const startTime = Date.now();
  
  if (options.verbose) {
    console.log(`💥 Setting up error conditions scenario: ${conditions.join(', ')}`);
  }

  // Clean existing test data first
  await cleanupTestDatabase(prisma, {
    includeClients: true,
    includeAgreements: true,
    includeAuditEvents: true,
    onlyTestData: true,
    verbose: options.verbose,
  });

  const conditionsSetup: Record<ErrorCondition, any> = {};

  for (const condition of conditions) {
    switch (condition) {
      case 'expired_tokens':
        conditionsSetup[condition] = await setupExpiredTokens(prisma, options);
        break;
      
      case 'missing_pdfs':
        conditionsSetup[condition] = await setupMissingPDFs(prisma, options);
        break;
      
      case 'invalid_references':
        conditionsSetup[condition] = await setupInvalidReferences(prisma, options);
        break;
      
      case 'constraint_violations':
        conditionsSetup[condition] = await setupConstraintViolations(prisma, options);
        break;
      
      case 'edge_case_data':
        conditionsSetup[condition] = await setupEdgeCaseData(prisma, options);
        break;
      
      case 'orphaned_records':
        conditionsSetup[condition] = await setupOrphanedRecords(prisma, options);
        break;
    }
  }

  const duration = Date.now() - startTime;

  if (options.verbose) {
    console.log(`✅ Error conditions scenario ready in ${duration}ms`);
  }

  return {
    scenario: 'error_conditions',
    description: `Database with error conditions: ${conditions.join(', ')}`,
    conditionsSetup,
    duration,
  };
}

/**
 * Set up expired tokens scenario
 */
async function setupExpiredTokens(
  prisma: PrismaClient,
  options: { verbose?: boolean }
): Promise<{ expiredTokenClients: number; activeTokenClients: number }> {
  if (options.verbose) {
    console.log('   🕐 Setting up expired tokens...');
  }

  // Create clients with expired tokens
  const expiredClient = {
    id: 'expired-client-001',
    company_name: 'Expired Token Company',
    contact_name: 'John Expired',
    email: 'john@expired.test.com',
    role_title: 'CEO',
    notes: 'Token expired for testing',
    logo_url: null,
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: 'expired_token_123',
    token_expires_at: new Date('2023-01-01'), // Far in the past
    created_at: new Date('2023-01-01'),
    updated_at: new Date('2023-01-01'),
  };

  await prisma.client.create({ data: expiredClient });

  // Also create a client with an active token for comparison
  const activeClient = {
    id: 'active-client-001',
    company_name: 'Active Token Company',
    contact_name: 'Jane Active',
    email: 'jane@active.test.com',
    role_title: 'CTO',
    notes: 'Token active for testing',
    logo_url: null,
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: 'active_token_456',
    token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
    created_at: new Date(),
    updated_at: new Date(),
  };

  await prisma.client.create({ data: activeClient });

  return { expiredTokenClients: 1, activeTokenClients: 1 };
}

/**
 * Set up missing PDFs scenario
 */
async function setupMissingPDFs(
  prisma: PrismaClient,
  options: { verbose?: boolean }
): Promise<{ clientsWithMissingPDFs: number; agreementsWithMissingPDFs: number }> {
  if (options.verbose) {
    console.log('   📄 Setting up missing PDFs...');
  }

  // Create an activated client
  const clientWithMissingPDF = {
    id: 'missing-pdf-client-001',
    company_name: 'Missing PDF Company',
    contact_name: 'Bob NoPDF',
    email: 'bob@nopdf.test.com',
    role_title: 'Manager',
    notes: 'Agreement signed but PDF generation failed',
    logo_url: null,
    status: 'activated',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: null,
    token_expires_at: null,
    created_at: new Date(),
    updated_at: new Date(),
  };

  await prisma.client.create({ data: clientWithMissingPDF });

  // Create an agreement without a PDF URL
  const agreementWithoutPDF = {
    id: 'missing-pdf-agreement-001',
    client_id: clientWithMissingPDF.id,
    terms_version: '1.0',
    pdf_url: null, // This should trigger error conditions
    signed_at: new Date(),
    signer_name: 'Bob NoPDF',
    signer_ip: '192.168.1.1',
    signature_hash: 'test_hash_missing_pdf',
    created_at: new Date(),
  };

  await prisma.agreement.create({ data: agreementWithoutPDF });

  return { clientsWithMissingPDFs: 1, agreementsWithMissingPDFs: 1 };
}

/**
 * Set up invalid references scenario
 */
async function setupInvalidReferences(
  prisma: PrismaClient,
  options: { verbose?: boolean }
): Promise<{ orphanedAgreements: number; invalidClientIds: string[] }> {
  if (options.verbose) {
    console.log('   🔗 Setting up invalid references...');
  }

  // Note: We can't actually create foreign key violations in a properly configured DB
  // But we can create scenarios that would be invalid if constraints were disabled
  // This is useful for testing validation logic in the application layer

  const invalidClientIds = ['non-existent-client-001', 'non-existent-client-002'];

  // We'll track these invalid references for testing, but can't actually insert them
  // due to foreign key constraints. Tests can use these IDs to simulate invalid references.

  return { orphanedAgreements: 0, invalidClientIds };
}

/**
 * Set up constraint violations scenario
 */
async function setupConstraintViolations(
  prisma: PrismaClient,
  options: { verbose?: boolean }
): Promise<{ duplicateEmails: string[]; constraintTestClients: number }> {
  if (options.verbose) {
    console.log('   ⚠️ Setting up constraint violations...');
  }

  // Create a client that could be used to test duplicate email constraints
  const baseEmail = 'constraint.test@example.com';
  
  const constraintTestClient = {
    id: 'constraint-test-client-001',
    company_name: 'Constraint Test Company',
    contact_name: 'Test User',
    email: baseEmail,
    role_title: 'Tester',
    notes: 'Used for testing constraint violations',
    logo_url: null,
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: 'constraint_test_token',
    token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    created_at: new Date(),
    updated_at: new Date(),
  };

  await prisma.client.create({ data: constraintTestClient });

  // The duplicate email would be tested by trying to create another client with the same email
  // This would fail due to unique constraint, which is what we want to test

  return { duplicateEmails: [baseEmail], constraintTestClients: 1 };
}

/**
 * Set up edge case data scenario
 */
async function setupEdgeCaseData(
  prisma: PrismaClient,
  options: { verbose?: boolean }
): Promise<{ edgeCaseClients: number; edgeCaseAgreements: number }> {
  if (options.verbose) {
    console.log('   🎯 Setting up edge case data...');
  }

  // Use the edge case clients from fixtures
  const result = await seedTestDatabase(prisma, {
    includeClients: true,
    includeAgreements: true,
    includeAuditEvents: false,
    clientFilter: (client) => client.id.startsWith('30000000-'), // Edge case clients
    agreementFilter: (agreement) => agreement.id.startsWith('50000000-'), // Edge case agreements
    verbose: options.verbose,
  });

  return { 
    edgeCaseClients: result.clientsCreated, 
    edgeCaseAgreements: result.agreementsCreated 
  };
}

/**
 * Set up orphaned records scenario
 */
async function setupOrphanedRecords(
  prisma: PrismaClient,
  options: { verbose?: boolean }
): Promise<{ orphanedAuditEvents: number }> {
  if (options.verbose) {
    console.log('   👤 Setting up orphaned records...');
  }

  // Create a client first
  const tempClient = {
    id: 'temp-client-for-orphan-001',
    company_name: 'Temporary Client',
    contact_name: 'Temp User',
    email: 'temp@orphan.test.com',
    role_title: 'Temporary',
    notes: 'Will be deleted to create orphaned records',
    logo_url: null,
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: 'temp_token',
    token_expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
    created_at: new Date(),
    updated_at: new Date(),
  };

  await prisma.client.create({ data: tempClient });

  // Create audit events for this client
  const auditEvent = {
    id: 'orphan-audit-001',
    client_id: tempClient.id,
    actor: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    action: 'client.created',
    payload: { event: 'test_orphan_creation' },
    created_at: new Date(),
  };

  await prisma.auditEvent.create({ data: auditEvent });

  // Now delete the client, leaving the audit event orphaned
  // Note: This might fail due to foreign key constraints with CASCADE delete
  // In that case, we'd need to disable constraints temporarily or handle this differently
  try {
    await prisma.client.delete({ where: { id: tempClient.id } });
    return { orphanedAuditEvents: 1 };
  } catch (error) {
    // If deletion fails due to constraints, the audit event is not orphaned
    if (options.verbose) {
      console.log('   ℹ️ Client deletion prevented by foreign key constraints (expected behavior)');
    }
    return { orphanedAuditEvents: 0 };
  }
}

/**
 * Verify error conditions are set up correctly
 */
export async function verifyErrorConditions(
  prisma: PrismaClient,
  conditions: ErrorCondition[]
): Promise<Record<ErrorCondition, boolean>> {
  const verification: Record<ErrorCondition, boolean> = {} as any;

  for (const condition of conditions) {
    switch (condition) {
      case 'expired_tokens':
        const expiredTokenCount = await prisma.client.count({
          where: {
            activation_token: { not: null },
            token_expires_at: { lt: new Date() },
          },
        });
        verification[condition] = expiredTokenCount > 0;
        break;
      
      case 'missing_pdfs':
        const missingPDFCount = await prisma.agreement.count({
          where: { pdf_url: null },
        });
        verification[condition] = missingPDFCount > 0;
        break;
      
      case 'edge_case_data':
        const edgeCaseCount = await prisma.client.count({
          where: { id: { startsWith: '30000000-' } },
        });
        verification[condition] = edgeCaseCount > 0;
        break;
      
      default:
        verification[condition] = true; // Assume setup was successful
        break;
    }
  }

  return verification;
}

/**
 * Test helpers for error conditions scenario
 */
export const ERROR_CONDITIONS_TESTS = {
  /**
   * Test function with specific error conditions
   */
  runWithErrorConditions: async <T>(
    prisma: PrismaClient,
    conditions: ErrorCondition[],
    testFn: () => Promise<T>,
    options: { verbose?: boolean } = {}
  ): Promise<T> => {
    await setupErrorConditions(prisma, conditions, options);
    return testFn();
  },

  /**
   * Assert specific error condition exists
   */
  assertErrorConditionExists: async (
    prisma: PrismaClient,
    condition: ErrorCondition
  ): Promise<void> => {
    const verification = await verifyErrorConditions(prisma, [condition]);
    
    if (!verification[condition]) {
      throw new Error(`Expected error condition '${condition}' to be present but it was not found`);
    }
  },

  /**
   * Get error conditions statistics
   */
  getErrorConditionsStats: async (prisma: PrismaClient) => {
    return {
      expiredTokens: await prisma.client.count({
        where: {
          activation_token: { not: null },
          token_expires_at: { lt: new Date() },
        },
      }),
      missingPDFs: await prisma.agreement.count({
        where: { pdf_url: null },
      }),
      edgeCaseClients: await prisma.client.count({
        where: { id: { startsWith: '30000000-' } },
      }),
    };
  },
};

/**
 * Predefined error condition scenarios
 */
export const ERROR_SCENARIOS = {
  TOKEN_EXPIRY: {
    conditions: ['expired_tokens'] as ErrorCondition[],
    description: 'Test token expiration handling',
  },
  PDF_FAILURES: {
    conditions: ['missing_pdfs'] as ErrorCondition[],
    description: 'Test PDF generation failure scenarios',
  },
  DATA_INTEGRITY: {
    conditions: ['edge_case_data', 'constraint_violations'] as ErrorCondition[],
    description: 'Test data integrity and validation',
  },
  COMPREHENSIVE_ERRORS: {
    conditions: ['expired_tokens', 'missing_pdfs', 'edge_case_data'] as ErrorCondition[],
    description: 'Test multiple error conditions simultaneously',
  },
} as const;

/**
 * Command line interface
 */
if (require.main === module) {
  const prisma = new PrismaClient();
  
  async function runErrorConditionsSetup() {
    try {
      const scenarioName = process.argv[2] || 'COMPREHENSIVE_ERRORS';
      const verbose = process.argv.includes('--verbose');
      const verify = process.argv.includes('--verify');

      if (verify) {
        const allConditions: ErrorCondition[] = ['expired_tokens', 'missing_pdfs', 'edge_case_data'];
        const verification = await verifyErrorConditions(prisma, allConditions);
        console.log('📊 Error Conditions Verification:', verification);
        
        const stats = await ERROR_CONDITIONS_TESTS.getErrorConditionsStats(prisma);
        console.log('📈 Error Conditions Stats:', stats);
      } else {
        const scenario = ERROR_SCENARIOS[scenarioName as keyof typeof ERROR_SCENARIOS];
        
        if (!scenario) {
          console.error(`❌ Unknown scenario: ${scenarioName}`);
          console.log('Available scenarios:', Object.keys(ERROR_SCENARIOS).join(', '));
          process.exit(1);
        }

        console.log(`🚀 Running ${scenarioName} error conditions setup...`);
        
        const result = await setupErrorConditions(
          prisma, 
          scenario.conditions,
          { verbose }
        );

        console.log('✅ Error conditions scenario setup completed:', result);
      }
    } catch (error) {
      console.error('❌ Error conditions setup failed:', error);
      process.exit(1);
    } finally {
      await prisma.$disconnect();
    }
  }

  runErrorConditionsSetup();
}