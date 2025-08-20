#!/usr/bin/env node
/**
 * Comprehensive test runner for the test infrastructure
 * Provides orchestrated test execution with proper setup and cleanup
 */

import { PrismaClient } from '@prisma/client';
import { validateTestInfrastructure } from './validate-test-config';
import { seedTestDatabase, SeedOptions } from './seeds/test-seed';
import { cleanupTestDatabase } from './seeds/cleanup';
import { setupAllMockServices, resetAllMockServices, configureAllServicesForTesting } from './mocks';

interface TestRunnerOptions {
  scenario?: 'success' | 'errors' | 'slow' | 'unreliable';
  cleanup?: boolean;
  validate?: boolean;
  verbose?: boolean;
  seedOptions?: SeedOptions;
}

class TestRunner {
  private prisma: PrismaClient;
  private verbose: boolean;

  constructor(options: TestRunnerOptions = {}) {
    this.prisma = new PrismaClient();
    this.verbose = options.verbose ?? false;
  }

  /**
   * Run comprehensive test setup
   */
  async runTestSetup(options: TestRunnerOptions = {}): Promise<void> {
    const scenario = options.scenario ?? 'success';
    
    try {
      if (this.verbose) {
        console.log('🚀 Starting test infrastructure setup...\n');
      }

      // Step 1: Validate test infrastructure
      if (options.validate !== false) {
        if (this.verbose) {
          console.log('🔍 Validating test infrastructure...');
        }
        const validation = validateTestInfrastructure();
        
        if (!validation.isValid) {
          console.error('❌ Test infrastructure validation failed:');
          validation.errors.forEach(error => console.error(`   - ${error}`));
          throw new Error('Test infrastructure validation failed');
        }
        
        if (validation.warnings.length > 0 && this.verbose) {
          console.log('⚠️ Validation warnings:');
          validation.warnings.forEach(warning => console.log(`   - ${warning}`));
        }
      }

      // Step 2: Setup mock services
      if (this.verbose) {
        console.log(`🔧 Setting up mock services for '${scenario}' scenario...`);
      }
      setupAllMockServices();
      configureAllServicesForTesting(scenario);

      // Step 3: Clean existing test data (if requested)
      if (options.cleanup !== false) {
        if (this.verbose) {
          console.log('🧹 Cleaning existing test data...');
        }
        await cleanupTestDatabase(this.prisma, { verbose: this.verbose });
      }

      // Step 4: Seed test database
      if (this.verbose) {
        console.log('🌱 Seeding test database...');
      }
      const seedResult = await seedTestDatabase(this.prisma, {
        ...options.seedOptions,
        verbose: this.verbose,
      });

      if (this.verbose) {
        console.log(`✅ Test setup completed successfully!`);
        console.log(`   - Clients seeded: ${seedResult.clientsCreated}`);
        console.log(`   - Agreements seeded: ${seedResult.agreementsCreated}`);
        console.log(`   - Audit events seeded: ${seedResult.auditEventsCreated}`);
        console.log(`   - Setup time: ${seedResult.duration}ms\n`);
      }

    } catch (error) {
      console.error('❌ Test setup failed:', error);
      throw error;
    }
  }

  /**
   * Run comprehensive test cleanup
   */
  async runTestCleanup(options: { verbose?: boolean } = {}): Promise<void> {
    try {
      if (this.verbose || options.verbose) {
        console.log('🧹 Running test cleanup...');
      }

      // Reset mock services
      resetAllMockServices();

      // Clean database
      await cleanupTestDatabase(this.prisma, { 
        verbose: this.verbose || options.verbose 
      });

      if (this.verbose || options.verbose) {
        console.log('✅ Test cleanup completed successfully!\n');
      }

    } catch (error) {
      console.error('❌ Test cleanup failed:', error);
      throw error;
    } finally {
      await this.prisma.$disconnect();
    }
  }

  /**
   * Run tests with full setup and cleanup
   */
  async runTestSuite(options: TestRunnerOptions = {}): Promise<void> {
    try {
      // Setup
      await this.runTestSetup(options);

      if (this.verbose) {
        console.log('🏃 Test suite setup completed. Ready for test execution.');
        console.log('   Use your preferred test runner (Jest, Playwright, etc.) now.');
        console.log('   Call runTestCleanup() when tests are complete.\n');
      }

      // Note: Actual test execution would be handled by Jest/Playwright/etc.
      // This method primarily sets up the environment

    } catch (error) {
      console.error('❌ Test suite setup failed:', error);
      
      // Attempt cleanup even if setup failed
      try {
        await this.runTestCleanup();
      } catch (cleanupError) {
        console.error('❌ Cleanup after setup failure also failed:', cleanupError);
      }
      
      throw error;
    }
  }

  /**
   * Quick test data refresh (faster than full setup)
   */
  async refreshTestData(options: { scenario?: string; verbose?: boolean } = {}): Promise<void> {
    try {
      if (this.verbose || options.verbose) {
        console.log('🔄 Refreshing test data...');
      }

      // Reset mock services
      resetAllMockServices();
      const scenario = (options.scenario as any) ?? 'success';
      configureAllServicesForTesting(scenario);

      // Clean and re-seed database
      await cleanupTestDatabase(this.prisma, { verbose: false });
      const seedResult = await seedTestDatabase(this.prisma, { verbose: false });

      if (this.verbose || options.verbose) {
        console.log(`✅ Test data refreshed (${seedResult.duration}ms)`);
      }

    } catch (error) {
      console.error('❌ Test data refresh failed:', error);
      throw error;
    }
  }
}

/**
 * CLI interface
 */
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0] || 'setup';
  
  const options: TestRunnerOptions = {
    verbose: args.includes('--verbose') || args.includes('-v'),
    cleanup: !args.includes('--no-cleanup'),
    validate: !args.includes('--no-validate'),
    scenario: (args.find(arg => arg.startsWith('--scenario='))?.split('=')[1] as any) || 'success',
  };

  const runner = new TestRunner(options);

  async function runCommand() {
    try {
      switch (command) {
        case 'setup':
          await runner.runTestSetup(options);
          break;
          
        case 'cleanup':
          await runner.runTestCleanup(options);
          break;
          
        case 'refresh':
          await runner.refreshTestData(options);
          break;
          
        case 'suite':
          await runner.runTestSuite(options);
          break;
          
        case 'validate':
          const validation = validateTestInfrastructure();
          if (!validation.isValid) {
            validation.errors.forEach(error => console.error(`❌ ${error}`));
            process.exit(1);
          }
          validation.warnings.forEach(warning => console.warn(`⚠️ ${warning}`));
          console.log('✅ Validation passed');
          break;
          
        default:
          console.log(`
Usage: node run-tests.ts [command] [options]

Commands:
  setup     Setup test environment (default)
  cleanup   Clean test environment
  refresh   Quick refresh of test data
  suite     Full test suite setup
  validate  Validate test infrastructure

Options:
  --verbose, -v           Enable verbose output
  --no-cleanup           Skip cleanup step
  --no-validate          Skip validation step
  --scenario=SCENARIO    Test scenario: success|errors|slow|unreliable

Examples:
  node run-tests.ts setup --verbose
  node run-tests.ts refresh --scenario=errors
  node run-tests.ts cleanup
`);
          break;
      }
    } catch (error) {
      console.error('❌ Command failed:', error);
      process.exit(1);
    }
  }

  runCommand();
}

export { TestRunner };
export default TestRunner;