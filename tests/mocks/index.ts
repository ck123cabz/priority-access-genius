/**
 * Mock services index
 * Centralized exports for all mock service implementations
 */

// Individual service exports
export * from './pdf-service';
export * from './storage-service';
export * from './auth-service';
export * from './network-simulator';

// Service instances for direct access
export {
  mockPDFService,
  configurePDFServiceForTesting,
  setupPDFServiceMock,
  PDF_TEST_SCENARIOS,
} from './pdf-service';

export {
  mockStorageService,
  configureStorageServiceForTesting,
  setupStorageServiceMock,
  STORAGE_TEST_SCENARIOS,
} from './storage-service';

export {
  mockAuthService,
  configureAuthServiceForTesting,
  setupAuthServiceMock,
  AUTH_TEST_SCENARIOS,
  AUTH_TEST_HELPERS,
} from './auth-service';

export {
  networkSimulator,
  configureNetworkForTesting,
  setupNetworkSimulation,
  NETWORK_TEST_SCENARIOS,
  NETWORK_PROFILES,
  NETWORK_TEST_HELPERS,
  createSimulatedFetch,
} from './network-simulator';

/**
 * Utility to set up all mock services for testing
 */
export function setupAllMockServices(): void {
  setupPDFServiceMock();
  setupStorageServiceMock();
  setupAuthServiceMock();
  setupNetworkSimulation();
}

/**
 * Configure all services for different test scenarios
 */
export function configureAllServicesForTesting(scenario: 'success' | 'errors' | 'slow' | 'unreliable'): void {
  configurePDFServiceForTesting(scenario);
  configureStorageServiceForTesting(scenario);
  configureAuthServiceForTesting(scenario);
  
  // Map scenario to network condition
  const networkCondition = {
    success: 'wifi',
    errors: 'unstable',
    slow: 'slow-3g',
    unreliable: 'unstable',
  }[scenario] as keyof typeof NETWORK_TEST_SCENARIOS;
  
  configureNetworkForTesting(networkCondition);
}

/**
 * Reset all mock services to clean state
 */
export function resetAllMockServices(): void {
  mockPDFService.reset();
  mockStorageService.reset();
  mockAuthService.reset();
  networkSimulator.disable();
  networkSimulator.resetStats();
}

/**
 * Mock service collection for batch operations
 */
export const MOCK_SERVICES = {
  pdf: mockPDFService,
  storage: mockStorageService,
  auth: mockAuthService,
  network: networkSimulator,
} as const;

/**
 * Comprehensive test scenarios combining all services
 */
export const INTEGRATION_TEST_SCENARIOS = {
  HAPPY_PATH: {
    description: 'All services working optimally',
    setup: () => configureAllServicesForTesting('success'),
  },
  NETWORK_ISSUES: {
    description: 'Poor network conditions affecting all services',
    setup: () => configureAllServicesForTesting('slow'),
  },
  SERVICE_ERRORS: {
    description: 'Services experiencing random errors',
    setup: () => configureAllServicesForTesting('errors'),
  },
  UNRELIABLE_CONDITIONS: {
    description: 'Highly unreliable service conditions',
    setup: () => configureAllServicesForTesting('unreliable'),
  },
} as const;

/**
 * Test utilities for common mock scenarios
 */
export const MOCK_TEST_UTILS = {
  /**
   * Run a test under all integration scenarios
   */
  runUnderAllScenarios: async <T>(
    testFn: () => Promise<T>,
    scenarios: (keyof typeof INTEGRATION_TEST_SCENARIOS)[] = ['HAPPY_PATH', 'NETWORK_ISSUES', 'SERVICE_ERRORS']
  ): Promise<Array<{ scenario: string; result: T | Error; duration: number }>> => {
    const results: Array<{ scenario: string; result: T | Error; duration: number }> = [];

    for (const scenarioName of scenarios) {
      const scenario = INTEGRATION_TEST_SCENARIOS[scenarioName];
      
      resetAllMockServices();
      scenario.setup();

      const startTime = Date.now();
      try {
        const result = await testFn();
        const duration = Date.now() - startTime;
        results.push({ scenario: scenarioName, result, duration });
      } catch (error) {
        const duration = Date.now() - startTime;
        results.push({ scenario: scenarioName, result: error as Error, duration });
      }
    }

    resetAllMockServices();
    return results;
  },

  /**
   * Get combined stats from all services
   */
  getAllServiceStats: () => {
    return {
      pdf: {
        generatedPDFs: mockPDFService.getAllGeneratedPDFs().length,
      },
      storage: {
        storedFiles: mockStorageService.getAllStoredFiles().length,
        totalStorageUsed: mockStorageService.getTotalStorageUsed(),
      },
      auth: mockAuthService.getCurrentState(),
      network: networkSimulator.getStats(),
    };
  },

  /**
   * Verify all services are in clean state
   */
  verifyCleanState: (): boolean => {
    const pdfClean = mockPDFService.getAllGeneratedPDFs().length === 0;
    const storageClean = mockStorageService.getAllStoredFiles().length === 0;
    const authClean = mockAuthService.getCurrentState().session === null;
    const networkClean = !networkSimulator.getStats().isSimulating;

    return pdfClean && storageClean && authClean && networkClean;
  },
};