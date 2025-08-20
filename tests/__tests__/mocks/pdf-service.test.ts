/**
 * Unit tests for mock PDF service
 * Tests predictable responses, configuration options, and error scenarios
 */

import {
  mockPDFService,
  configurePDFServiceForTesting,
  setupPDFServiceMock,
  PDF_TEST_SCENARIOS,
  type PDFGenerationOptions,
} from '../../mocks/pdf-service';

describe('Mock PDF Service', () => {
  setupPDFServiceMock();

  describe('Basic PDF Generation', () => {
    beforeEach(() => {
      configurePDFServiceForTesting('success');
    });

    test('should generate PDF successfully with valid options', async () => {
      const options: PDFGenerationOptions = {
        clientName: 'Test Company',
        agreementId: 'test-agreement-123',
        termsVersion: '1.0',
      };

      const result = await mockPDFService.generatePDF(options);

      expect(result.success).toBe(true);
      expect(result.pdfUrl).toBeTruthy();
      expect(result.pdfUrl).toMatch(/\.pdf$/);
      expect(result.pdfUrl).toContain('test-company');
      expect(result.error).toBeUndefined();
      expect(result.metadata).toBeDefined();
      expect(result.metadata.fileSize).toBeGreaterThan(0);
      expect(result.metadata.generatedAt).toBeInstanceOf(Date);
      expect(result.metadata.processingTime).toBeGreaterThanOrEqual(0);
    });

    test('should generate predictable URLs for same input', async () => {
      const options: PDFGenerationOptions = {
        clientName: 'Consistent Company',
        agreementId: 'consistent-agreement',
        termsVersion: '2.0',
      };

      const result1 = await mockPDFService.generatePDF(options);
      const result2 = await mockPDFService.generatePDF(options);

      expect(result1.success).toBe(true);
      expect(result2.success).toBe(true);
      expect(result1.pdfUrl).toBe(result2.pdfUrl);
    });

    test('should calculate file size based on input content', async () => {
      const shortOptions: PDFGenerationOptions = {
        clientName: 'A',
        agreementId: 'short',
        termsVersion: '1',
      };

      const longOptions: PDFGenerationOptions = {
        clientName: 'Very Long Company Name With Many Characters',
        agreementId: 'very-long-agreement-identifier',
        termsVersion: '2.0-extended',
        metadata: {
          customField: 'A'.repeat(1000),
        },
      };

      const shortResult = await mockPDFService.generatePDF(shortOptions);
      const longResult = await mockPDFService.generatePDF(longOptions);

      expect(shortResult.success).toBe(true);
      expect(longResult.success).toBe(true);
      expect(longResult.metadata.fileSize).toBeGreaterThan(shortResult.metadata.fileSize);
    });

    test('should sanitize client names in URLs', async () => {
      const options: PDFGenerationOptions = {
        clientName: 'Test Company & Partners (Inc.)',
        agreementId: 'special-chars-test',
        termsVersion: '1.0',
      };

      const result = await mockPDFService.generatePDF(options);

      expect(result.success).toBe(true);
      expect(result.pdfUrl).toContain('test-company-partners-inc');
      expect(result.pdfUrl).not.toContain('&');
      expect(result.pdfUrl).not.toContain('(');
      expect(result.pdfUrl).not.toContain(')');
    });
  });

  describe('Error Handling', () => {
    beforeEach(() => {
      configurePDFServiceForTesting('errors');
    });

    test('should handle client name error trigger', async () => {
      const options: PDFGenerationOptions = {
        clientName: 'Error Company', // Contains "error" trigger
        agreementId: 'error-test',
        termsVersion: '1.0',
      };

      const result = await mockPDFService.generatePDF(options);

      expect(result.success).toBe(false);
      expect(result.pdfUrl).toBeUndefined();
      expect(result.error).toContain('Client name contains error trigger');
      expect(result.metadata.fileSize).toBe(0);
    });

    test('should handle invalid terms version', async () => {
      const options: PDFGenerationOptions = {
        clientName: 'Test Company',
        agreementId: 'invalid-version-test',
        termsVersion: 'invalid',
      };

      const result = await mockPDFService.generatePDF(options);

      expect(result.success).toBe(false);
      expect(result.pdfUrl).toBeUndefined();
      expect(result.error).toContain('Invalid terms version');
    });

    test('should handle random errors based on error rate', async () => {
      mockPDFService.configure({
        shouldSimulateErrors: false,
        networkDelay: 0,
        errorRate: 1.0, // 100% error rate
      });

      const options: PDFGenerationOptions = {
        clientName: 'Test Company',
        agreementId: 'random-error-test',
        termsVersion: '1.0',
      };

      const result = await mockPDFService.generatePDF(options);

      expect(result.success).toBe(false);
      expect(result.error).toContain('PDF generation failed due to simulated failure');
    });
  });

  describe('Network Simulation', () => {
    test('should simulate network delay', async () => {
      const delay = 100; // 100ms
      mockPDFService.configure({
        networkDelay: delay,
      });

      const options: PDFGenerationOptions = {
        clientName: 'Test Company',
        agreementId: 'delay-test',
        termsVersion: '1.0',
      };

      const startTime = Date.now();
      const result = await mockPDFService.generatePDF(options);
      const actualTime = Date.now() - startTime;

      expect(result.success).toBe(true);
      expect(actualTime).toBeGreaterThanOrEqual(delay);
      expect(result.metadata.processingTime).toBeGreaterThanOrEqual(delay);
    });

    test('should handle slow network conditions', async () => {
      configurePDFServiceForTesting('slow');

      const options: PDFGenerationOptions = {
        clientName: 'Test Company',
        agreementId: 'slow-test',
        termsVersion: '1.0',
      };

      const startTime = Date.now();
      const result = await mockPDFService.generatePDF(options);
      const actualTime = Date.now() - startTime;

      expect(result.success).toBe(true);
      expect(actualTime).toBeGreaterThanOrEqual(1000); // Should be slow
    });
  });

  describe('PDF Management', () => {
    beforeEach(() => {
      configurePDFServiceForTesting('success');
    });

    test('should delete PDF successfully', async () => {
      const options: PDFGenerationOptions = {
        clientName: 'Test Company',
        agreementId: 'delete-test',
        termsVersion: '1.0',
      };

      const generateResult = await mockPDFService.generatePDF(options);
      expect(generateResult.success).toBe(true);

      const deleteResult = await mockPDFService.deletePDF(generateResult.pdfUrl!);
      expect(deleteResult).toBe(true);

      // Should not be able to get metadata after deletion
      const metadata = await mockPDFService.getPDFMetadata(generateResult.pdfUrl!);
      expect(metadata).toBeNull();
    });

    test('should fail to delete non-existent PDF', async () => {
      const deleteResult = await mockPDFService.deletePDF('https://non-existent.pdf');
      expect(deleteResult).toBe(false);
    });

    test('should get PDF metadata', async () => {
      const options: PDFGenerationOptions = {
        clientName: 'Test Company',
        agreementId: 'metadata-test',
        termsVersion: '1.0',
      };

      const generateResult = await mockPDFService.generatePDF(options);
      expect(generateResult.success).toBe(true);

      const metadata = await mockPDFService.getPDFMetadata(generateResult.pdfUrl!);
      expect(metadata).toBeDefined();
      expect(metadata!.fileSize).toBe(generateResult.metadata.fileSize);
      expect(metadata!.createdAt).toBeInstanceOf(Date);
    });

    test('should return null metadata for non-existent PDF', async () => {
      const metadata = await mockPDFService.getPDFMetadata('https://non-existent.pdf');
      expect(metadata).toBeNull();
    });

    test('should track generated PDFs', async () => {
      const initialCount = mockPDFService.getAllGeneratedPDFs().length;

      const options: PDFGenerationOptions = {
        clientName: 'Test Company',
        agreementId: 'tracking-test',
        termsVersion: '1.0',
      };

      await mockPDFService.generatePDF(options);

      const finalCount = mockPDFService.getAllGeneratedPDFs().length;
      expect(finalCount).toBe(initialCount + 1);
    });
  });

  describe('Test Scenarios', () => {
    beforeEach(() => {
      configurePDFServiceForTesting('success');
    });

    test('should handle successful generation scenario', async () => {
      const result = await mockPDFService.generatePDF(PDF_TEST_SCENARIOS.SUCCESSFUL_GENERATION);

      expect(result.success).toBe(true);
      expect(result.pdfUrl).toBeTruthy();
      expect(result.error).toBeUndefined();
    });

    test('should handle large metadata scenario', async () => {
      const result = await mockPDFService.generatePDF(PDF_TEST_SCENARIOS.LARGE_METADATA);

      expect(result.success).toBe(true);
      expect(result.metadata.fileSize).toBeGreaterThan(50000); // Should be larger due to metadata
    });
  });

  describe('Configuration and State Management', () => {
    test('should reset to clean state', () => {
      const options: PDFGenerationOptions = {
        clientName: 'Test Company',
        agreementId: 'reset-test',
        termsVersion: '1.0',
      };

      // Generate a PDF
      return mockPDFService.generatePDF(options)
        .then(() => {
          expect(mockPDFService.getAllGeneratedPDFs().length).toBeGreaterThan(0);

          // Reset and verify clean state
          mockPDFService.reset();
          expect(mockPDFService.getAllGeneratedPDFs().length).toBe(0);
        });
    });

    test('should maintain configuration after reset', () => {
      mockPDFService.configure({
        shouldSimulateErrors: true,
        networkDelay: 1000,
        errorRate: 0.5,
      });

      mockPDFService.reset();

      // Configuration should be reset too
      const options: PDFGenerationOptions = {
        clientName: 'Test Company',
        agreementId: 'config-reset-test',
        termsVersion: '1.0',
      };

      const startTime = Date.now();
      return mockPDFService.generatePDF(options)
        .then((result) => {
          const actualTime = Date.now() - startTime;
          expect(actualTime).toBeLessThan(500); // Should be fast after reset
          expect(result.success).toBe(true); // Should not error after reset
        });
    });

    test('should handle unreliable configuration', async () => {
      configurePDFServiceForTesting('unreliable');

      const results = [];
      const attempts = 10;

      for (let i = 0; i < attempts; i++) {
        const result = await mockPDFService.generatePDF({
          clientName: `Test Company ${i}`,
          agreementId: `unreliable-test-${i}`,
          termsVersion: '1.0',
        });
        results.push(result);
      }

      const successes = results.filter(r => r.success).length;
      const failures = results.filter(r => !r.success).length;

      // With 30% error rate, we should have some successes and some failures
      expect(successes).toBeGreaterThan(0);
      expect(failures).toBeGreaterThan(0);
      expect(successes + failures).toBe(attempts);
    });
  });

  describe('Edge Cases', () => {
    beforeEach(() => {
      configurePDFServiceForTesting('success');
    });

    test('should handle empty client name', async () => {
      const options: PDFGenerationOptions = {
        clientName: '',
        agreementId: 'empty-name-test',
        termsVersion: '1.0',
      };

      const result = await mockPDFService.generatePDF(options);

      expect(result.success).toBe(true);
      expect(result.pdfUrl).toBeTruthy();
      // URL should still be valid even with empty name
      expect(result.pdfUrl).toMatch(/\.pdf$/);
    });

    test('should handle special characters in input', async () => {
      const options: PDFGenerationOptions = {
        clientName: 'Spëçiàl Çhäråctërs & Symbols Inc. (™)',
        agreementId: 'special-chars-test',
        termsVersion: '1.0',
      };

      const result = await mockPDFService.generatePDF(options);

      expect(result.success).toBe(true);
      expect(result.pdfUrl).toBeTruthy();
      // Should sanitize special characters in URL
      expect(result.pdfUrl).toMatch(/^https:\/\/test-storage\.supabase\.co\/agreements\/[a-z0-9-]+\.pdf$/);
    });

    test('should handle concurrent PDF generation', async () => {
      const promises = Array.from({ length: 5 }, (_, i) =>
        mockPDFService.generatePDF({
          clientName: `Concurrent Company ${i}`,
          agreementId: `concurrent-test-${i}`,
          termsVersion: '1.0',
        })
      );

      const results = await Promise.all(promises);

      expect(results).toHaveLength(5);
      results.forEach((result, index) => {
        expect(result.success).toBe(true);
        expect(result.pdfUrl).toContain(`concurrent-company-${index}`);
      });

      // All URLs should be unique
      const urls = results.map(r => r.pdfUrl!);
      const uniqueUrls = [...new Set(urls)];
      expect(uniqueUrls.length).toBe(urls.length);
    });
  });
});