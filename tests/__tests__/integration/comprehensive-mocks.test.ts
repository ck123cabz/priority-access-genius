/**
 * Comprehensive integration tests for mock services and fixtures
 * Tests the interaction between all mock services and test data
 */

import {
  setupAllMockServices,
  configureAllServicesForTesting,
  resetAllMockServices,
  MOCK_SERVICES,
  MOCK_TEST_UTILS,
  INTEGRATION_TEST_SCENARIOS,
} from '../../mocks';

import {
  ALL_TEST_CLIENTS,
  ALL_TEST_AGREEMENTS,
  ALL_TEST_USERS,
  getTestClientById,
  getTestAgreementById,
} from '../../fixtures';

import { AUTH_TEST_HELPERS } from '../../mocks/auth-service';

describe('Comprehensive Mock Services Integration', () => {
  setupAllMockServices();

  describe('Service Integration', () => {
    beforeEach(() => {
      configureAllServicesForTesting('success');
    });

    test('should integrate auth, storage, and PDF services for complete workflow', async () => {
      // 1. Authenticate as main operator
      await AUTH_TEST_HELPERS.signInAsUser('main_operator');
      const currentUser = await MOCK_SERVICES.auth.getUser();
      expect(currentUser).toBeDefined();
      expect(currentUser!.role).toBe('operator');

      // 2. Upload a client logo to storage
      const logoData = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]); // PNG header
      const uploadResult = await MOCK_SERVICES.storage.upload({
        bucket: 'logos',
        path: 'test-client-logo.png',
        file: logoData,
        options: { contentType: 'image/png' },
      });

      expect(uploadResult.success).toBe(true);
      expect(uploadResult.data!.path).toBe('test-client-logo.png');

      // 3. Generate PDF for agreement
      const testClient = ALL_TEST_CLIENTS[0];
      const pdfResult = await MOCK_SERVICES.pdf.generatePDF({
        clientName: testClient.company_name,
        agreementId: 'integration-test-agreement',
        termsVersion: '1.0',
      });

      expect(pdfResult.success).toBe(true);
      expect(pdfResult.pdfUrl).toBeTruthy();
      expect(pdfResult.metadata.fileSize).toBeGreaterThan(0);

      // 4. Verify all services maintained state correctly
      const authState = MOCK_SERVICES.auth.getCurrentState();
      expect(authState.session).toBeDefined();

      const storedFiles = MOCK_SERVICES.storage.getAllStoredFiles();
      expect(storedFiles.length).toBe(1);
      expect(storedFiles[0].path).toBe('logos/test-client-logo.png');

      const generatedPDFs = MOCK_SERVICES.pdf.getAllGeneratedPDFs();
      expect(generatedPDFs.length).toBe(1);
      expect(generatedPDFs[0]).toContain('.pdf');
    });

    test('should handle error propagation across services', async () => {
      configureAllServicesForTesting('errors');

      // Authentication might fail
      const authResult = await MOCK_SERVICES.auth.signInWithOAuth('github'); // Configured to fail
      expect(authResult.success).toBe(false);

      // Storage operations might fail
      const uploadResult = await MOCK_SERVICES.storage.upload({
        bucket: 'nonexistent',
        path: 'test.txt',
        file: new Uint8Array([1, 2, 3]),
      });
      expect(uploadResult.success).toBe(false);

      // PDF generation might fail
      const pdfResult = await MOCK_SERVICES.pdf.generatePDF({
        clientName: 'Error Company',
        agreementId: 'error-test',
        termsVersion: '1.0',
      });
      expect(pdfResult.success).toBe(false);
    });

    test('should simulate slow network conditions across all services', async () => {
      configureAllServicesForTesting('slow');

      const startTime = Date.now();

      // All operations should be slow
      const authPromise = MOCK_SERVICES.auth.signInWithOAuth('google');
      const uploadPromise = MOCK_SERVICES.storage.upload({
        bucket: 'test',
        path: 'slow-test.txt',
        file: new Uint8Array([1, 2, 3]),
      });
      const pdfPromise = MOCK_SERVICES.pdf.generatePDF({
        clientName: 'Slow Test Company',
        agreementId: 'slow-test',
        termsVersion: '1.0',
      });

      const [authResult, uploadResult, pdfResult] = await Promise.all([
        authPromise,
        uploadPromise,
        pdfPromise,
      ]);

      const totalTime = Date.now() - startTime;

      expect(authResult.success).toBe(true);
      expect(uploadResult.success).toBe(true);
      expect(pdfResult.success).toBe(true);

      // Should take significant time due to slow configuration
      expect(totalTime).toBeGreaterThan(2000);
    });
  });

  describe('Fixture Integration', () => {
    test('should use client fixtures with PDF service', async () => {
      const testClient = getTestClientById('10000000-0000-4000-8000-000000000001');
      expect(testClient).toBeDefined();

      const pdfResult = await MOCK_SERVICES.pdf.generatePDF({
        clientName: testClient!.company_name,
        agreementId: 'fixture-integration-test',
        termsVersion: '1.0',
        metadata: {
          clientId: testClient!.id,
          operatorId: testClient!.created_by,
        },
      });

      expect(pdfResult.success).toBe(true);
      expect(pdfResult.pdfUrl).toContain(
        testClient!.company_name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      );
    });

    test('should use agreement fixtures with storage service', async () => {
      const testAgreement = getTestAgreementById('40000000-0000-4000-8000-000000000001');
      expect(testAgreement).toBeDefined();

      if (testAgreement!.pdf_url) {
        // Simulate storing the agreement PDF
        const mockPdfContent = new Uint8Array(Buffer.from(`Agreement ${testAgreement!.id} content`));
        
        const uploadResult = await MOCK_SERVICES.storage.upload({
          bucket: 'agreements',
          path: `agreement-${testAgreement!.id}.pdf`,
          file: mockPdfContent,
          options: { contentType: 'application/pdf' },
        });

        expect(uploadResult.success).toBe(true);

        // Verify we can retrieve it
        const downloadResult = await MOCK_SERVICES.storage.download(
          'agreements',
          `agreement-${testAgreement!.id}.pdf`
        );

        expect(downloadResult.success).toBe(true);
        expect(downloadResult.data).toEqual(mockPdfContent);
      }
    });

    test('should use user fixtures with auth service', async () => {
      const testUser = ALL_TEST_USERS.find(user => user.role === 'admin');
      expect(testUser).toBeDefined();

      // Find the corresponding auth session
      const testSession = {
        access_token: 'test_token_for_fixture',
        refresh_token: 'test_refresh_token',
        expires_in: 3600,
        expires_at: new Date(Date.now() + 3600 * 1000),
        user: testUser!,
      };

      MOCK_SERVICES.auth.setCurrentSession(testSession);

      const currentUser = await MOCK_SERVICES.auth.getUser();
      expect(currentUser).toEqual(testUser);
      expect(currentUser!.permissions).toContain('system:configure');
    });
  });

  describe('Network Simulation Integration', () => {
    test('should simulate network conditions affecting all services', async () => {
      MOCK_SERVICES.network.setCondition('slow-3g');

      const operations = [
        () => MOCK_SERVICES.auth.signInWithOAuth('google'),
        () => MOCK_SERVICES.storage.upload({
          bucket: 'test',
          path: 'network-test.txt',
          file: new Uint8Array([1, 2, 3]),
        }),
        () => MOCK_SERVICES.pdf.generatePDF({
          clientName: 'Network Test Company',
          agreementId: 'network-test',
          termsVersion: '1.0',
        }),
      ];

      const results = await Promise.all(operations.map(op => op()));

      results.forEach(result => {
        expect(result.success || result.success === undefined).toBeTruthy();
      });

      const networkStats = MOCK_SERVICES.network.getStats();
      expect(networkStats.isSimulating).toBe(true);
      expect(networkStats.currentCondition).toBe('slow-3g');
    });

    test('should simulate offline conditions', async () => {
      MOCK_SERVICES.network.setCondition('offline');

      const networkResult = await MOCK_SERVICES.network.simulateRequest(1024, 1024);
      expect(networkResult.success).toBe(false);
      expect(networkResult.error).toContain('offline');
    });
  });

  describe('State Management Across Services', () => {
    test('should maintain consistent state across all services', () => {
      const initialStats = MOCK_TEST_UTILS.getAllServiceStats();
      
      expect(initialStats.auth.session).toBeNull();
      expect(initialStats.storage.storedFiles).toBe(0);
      expect(initialStats.pdf.generatedPDFs).toBe(0);

      return Promise.resolve()
        .then(() => MOCK_SERVICES.auth.signInWithOAuth('google'))
        .then(() => MOCK_SERVICES.storage.upload({
          bucket: 'test',
          path: 'state-test.txt',
          file: new Uint8Array([1, 2, 3]),
        }))
        .then(() => MOCK_SERVICES.pdf.generatePDF({
          clientName: 'State Test Company',
          agreementId: 'state-test',
          termsVersion: '1.0',
        }))
        .then(() => {
          const finalStats = MOCK_TEST_UTILS.getAllServiceStats();
          
          expect(finalStats.auth.session).toBeDefined();
          expect(finalStats.storage.storedFiles).toBe(1);
          expect(finalStats.pdf.generatedPDFs).toBe(1);
        });
    });

    test('should reset all services to clean state', async () => {
      // Generate some state
      await MOCK_SERVICES.auth.signInWithOAuth('google');
      await MOCK_SERVICES.storage.upload({
        bucket: 'test',
        path: 'reset-test.txt',
        file: new Uint8Array([1, 2, 3]),
      });
      await MOCK_SERVICES.pdf.generatePDF({
        clientName: 'Reset Test Company',
        agreementId: 'reset-test',
        termsVersion: '1.0',
      });

      // Verify state exists
      expect(MOCK_TEST_UTILS.verifyCleanState()).toBe(false);

      // Reset all services
      resetAllMockServices();

      // Verify clean state
      expect(MOCK_TEST_UTILS.verifyCleanState()).toBe(true);
    });
  });

  describe('Integration Test Scenarios', () => {
    test('should run happy path scenario', async () => {
      const testFn = async () => {
        const authResult = await MOCK_SERVICES.auth.signInWithOAuth('google');
        const uploadResult = await MOCK_SERVICES.storage.upload({
          bucket: 'test',
          path: 'happy-path.txt',
          file: new Uint8Array([1, 2, 3]),
        });
        const pdfResult = await MOCK_SERVICES.pdf.generatePDF({
          clientName: 'Happy Path Company',
          agreementId: 'happy-path-test',
          termsVersion: '1.0',
        });

        return {
          auth: authResult.success,
          storage: uploadResult.success,
          pdf: pdfResult.success,
        };
      };

      const results = await MOCK_TEST_UTILS.runUnderAllScenarios(testFn, ['HAPPY_PATH']);
      
      expect(results.length).toBe(1);
      const result = results[0];
      expect(result.scenario).toBe('HAPPY_PATH');
      expect((result.result as any).auth).toBe(true);
      expect((result.result as any).storage).toBe(true);
      expect((result.result as any).pdf).toBe(true);
    });

    test('should run comprehensive error scenarios', async () => {
      const testFn = async () => {
        const authResult = await MOCK_SERVICES.auth.signInWithOAuth('github'); // Fails in error mode
        const uploadResult = await MOCK_SERVICES.storage.upload({
          bucket: 'nonexistent',
          path: 'error-test.txt',
          file: new Uint8Array([1, 2, 3]),
        });
        const pdfResult = await MOCK_SERVICES.pdf.generatePDF({
          clientName: 'Error Company',
          agreementId: 'error-test',
          termsVersion: '1.0',
        });

        return {
          authSuccess: authResult.success,
          storageSuccess: uploadResult.success,
          pdfSuccess: pdfResult.success,
        };
      };

      const results = await MOCK_TEST_UTILS.runUnderAllScenarios(testFn, ['SERVICE_ERRORS']);
      
      expect(results.length).toBe(1);
      const result = results[0];
      expect(result.scenario).toBe('SERVICE_ERRORS');
      
      // All services should fail in error mode
      const resultData = result.result as any;
      expect(resultData.authSuccess).toBe(false);
      expect(resultData.storageSuccess).toBe(false);
      expect(resultData.pdfSuccess).toBe(false);
    });
  });

  describe('Performance Under Different Conditions', () => {
    test('should measure performance differences between scenarios', async () => {
      const testOperation = async () => {
        await Promise.all([
          MOCK_SERVICES.auth.signInWithOAuth('google'),
          MOCK_SERVICES.storage.upload({
            bucket: 'perf-test',
            path: 'performance-test.txt',
            file: new Uint8Array(1024), // 1KB
          }),
          MOCK_SERVICES.pdf.generatePDF({
            clientName: 'Performance Test Company',
            agreementId: 'perf-test',
            termsVersion: '1.0',
          }),
        ]);
      };

      // Test under different scenarios
      const scenarios: (keyof typeof INTEGRATION_TEST_SCENARIOS)[] = [
        'HAPPY_PATH',
        'NETWORK_ISSUES',
      ];

      const performanceResults = [];

      for (const scenarioName of scenarios) {
        INTEGRATION_TEST_SCENARIOS[scenarioName].setup();
        
        const startTime = Date.now();
        await testOperation();
        const duration = Date.now() - startTime;
        
        performanceResults.push({ scenario: scenarioName, duration });
        
        resetAllMockServices();
      }

      // Network issues should be slower than happy path
      const happyPathDuration = performanceResults.find(r => r.scenario === 'HAPPY_PATH')!.duration;
      const networkIssuesDuration = performanceResults.find(r => r.scenario === 'NETWORK_ISSUES')!.duration;
      
      expect(networkIssuesDuration).toBeGreaterThan(happyPathDuration);
    });
  });

  describe('Real-world Workflow Simulation', () => {
    test('should simulate complete client onboarding workflow', async () => {
      configureAllServicesForTesting('success');

      // 1. Operator signs in
      await AUTH_TEST_HELPERS.signInAsUser('main_operator');
      const operator = await MOCK_SERVICES.auth.getUser();
      expect(operator!.permissions).toContain('clients:create');

      // 2. Client data is prepared from fixtures
      const clientData = getTestClientById('10000000-0000-4000-8000-000000000001');
      expect(clientData).toBeDefined();

      // 3. Logo is uploaded to storage
      if (clientData!.logo_url) {
        const logoData = new Uint8Array([137, 80, 78, 71]); // PNG header
        const uploadResult = await MOCK_SERVICES.storage.upload({
          bucket: 'logos',
          path: 'acme-logo.png',
          file: logoData,
          options: { contentType: 'image/png' },
        });
        expect(uploadResult.success).toBe(true);
      }

      // 4. Agreement PDF is generated
      const pdfResult = await MOCK_SERVICES.pdf.generatePDF({
        clientName: clientData!.company_name,
        agreementId: 'onboarding-agreement',
        termsVersion: '1.0',
        metadata: {
          clientId: clientData!.id,
          operatorId: clientData!.created_by,
          activationToken: clientData!.activation_token,
        },
      });
      expect(pdfResult.success).toBe(true);

      // 5. PDF is stored in agreements bucket
      if (pdfResult.success) {
        const mockPdfContent = new Uint8Array(Buffer.from('Mock PDF content for ' + clientData!.company_name));
        const storeResult = await MOCK_SERVICES.storage.upload({
          bucket: 'agreements',
          path: 'acme-agreement.pdf',
          file: mockPdfContent,
          options: { contentType: 'application/pdf' },
        });
        expect(storeResult.success).toBe(true);
      }

      // 6. Verify final state
      const finalStats = MOCK_TEST_UTILS.getAllServiceStats();
      expect(finalStats.auth.session).toBeDefined();
      expect(finalStats.storage.storedFiles).toBe(2); // Logo + Agreement
      expect(finalStats.pdf.generatedPDFs).toBe(1);
    });
  });
});