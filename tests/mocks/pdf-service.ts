/**
 * Mock PDF generation service
 * Provides predictable test PDFs without external dependencies
 */

export interface PDFGenerationOptions {
  clientName: string;
  agreementId: string;
  termsVersion: string;
  template?: string;
  metadata?: Record<string, any>;
}

export interface PDFGenerationResult {
  success: boolean;
  pdfUrl?: string;
  error?: string;
  metadata: {
    fileSize: number;
    generatedAt: Date;
    processingTime: number;
  };
}

export interface PDFService {
  generatePDF(options: PDFGenerationOptions): Promise<PDFGenerationResult>;
  deletePDF(pdfUrl: string): Promise<boolean>;
  getPDFMetadata(pdfUrl: string): Promise<{ fileSize: number; createdAt: Date } | null>;
}

/**
 * Mock PDF service implementation
 */
class MockPDFService implements PDFService {
  private readonly baseUrl = 'https://test-storage.supabase.co/agreements/';
  private readonly generatedPDFs = new Map<string, { fileSize: number; createdAt: Date }>();
  private shouldSimulateErrors = false;
  private networkDelay = 0;
  private errorRate = 0;

  /**
   * Configure mock behavior for testing different scenarios
   */
  configure(options: {
    shouldSimulateErrors?: boolean;
    networkDelay?: number;
    errorRate?: number;
  }): void {
    this.shouldSimulateErrors = options.shouldSimulateErrors ?? false;
    this.networkDelay = options.networkDelay ?? 0;
    this.errorRate = options.errorRate ?? 0;
  }

  /**
   * Generate a mock PDF with predictable behavior
   */
  async generatePDF(options: PDFGenerationOptions): Promise<PDFGenerationResult> {
    const startTime = Date.now();

    // Input validation
    if (!options.clientName?.trim()) {
      return {
        success: false,
        error: 'Client name is required and cannot be empty',
        metadata: {
          fileSize: 0,
          generatedAt: new Date(),
          processingTime: Date.now() - startTime,
        },
      };
    }

    if (!options.agreementId?.trim()) {
      return {
        success: false,
        error: 'Agreement ID is required and cannot be empty',
        metadata: {
          fileSize: 0,
          generatedAt: new Date(),
          processingTime: Date.now() - startTime,
        },
      };
    }

    if (!options.termsVersion?.trim()) {
      return {
        success: false,
        error: 'Terms version is required and cannot be empty',
        metadata: {
          fileSize: 0,
          generatedAt: new Date(),
          processingTime: Date.now() - startTime,
        },
      };
    }

    // Validate terms version format
    if (!/^[\d\w\.-]+$/.test(options.termsVersion)) {
      return {
        success: false,
        error: 'Terms version contains invalid characters',
        metadata: {
          fileSize: 0,
          generatedAt: new Date(),
          processingTime: Date.now() - startTime,
        },
      };
    }

    // Simulate network delay
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    // Simulate random errors based on error rate
    if (this.errorRate > 0 && Math.random() < this.errorRate) {
      return {
        success: false,
        error: 'Mock error: PDF generation failed due to simulated failure',
        metadata: {
          fileSize: 0,
          generatedAt: new Date(),
          processingTime: Date.now() - startTime,
        },
      };
    }

    // Simulate specific error conditions
    if (this.shouldSimulateErrors) {
      if (options.clientName.toLowerCase().includes('error')) {
        return {
          success: false,
          error: 'Mock error: Client name contains error trigger',
          metadata: {
            fileSize: 0,
            generatedAt: new Date(),
            processingTime: Date.now() - startTime,
          },
        };
      }

      if (options.termsVersion === 'invalid') {
        return {
          success: false,
          error: 'Mock error: Invalid terms version',
          metadata: {
            fileSize: 0,
            generatedAt: new Date(),
            processingTime: Date.now() - startTime,
          },
        };
      }
    }

    // Generate predictable PDF URL
    const sanitizedClientName = options.clientName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const filename = `${sanitizedClientName}-agreement-${options.termsVersion.replace('.', '-')}.pdf`;
    const pdfUrl = this.baseUrl + filename;

    // Calculate predictable file size based on content
    const baseSize = 50000; // 50KB base
    const nameLength = options.clientName.length;
    const versionLength = options.termsVersion.length;
    const metadataSize = options.metadata ? JSON.stringify(options.metadata).length : 0;
    const fileSize = baseSize + (nameLength * 100) + (versionLength * 50) + metadataSize;

    // Store metadata for later retrieval
    this.generatedPDFs.set(pdfUrl, {
      fileSize,
      createdAt: new Date(),
    });

    return {
      success: true,
      pdfUrl,
      metadata: {
        fileSize,
        generatedAt: new Date(),
        processingTime: Date.now() - startTime,
      },
    };
  }

  /**
   * Mock PDF deletion
   */
  async deletePDF(pdfUrl: string): Promise<boolean> {
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    if (this.shouldSimulateErrors && Math.random() < 0.1) {
      return false; // 10% chance of deletion failure when errors enabled
    }

    const deleted = this.generatedPDFs.delete(pdfUrl);
    return deleted;
  }

  /**
   * Get PDF metadata
   */
  async getPDFMetadata(pdfUrl: string): Promise<{ fileSize: number; createdAt: Date } | null> {
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    return this.generatedPDFs.get(pdfUrl) ?? null;
  }

  /**
   * Reset mock state for clean tests
   */
  reset(): void {
    this.generatedPDFs.clear();
    this.shouldSimulateErrors = false;
    this.networkDelay = 0;
    this.errorRate = 0;
  }

  /**
   * Get all generated PDFs (for testing)
   */
  getAllGeneratedPDFs(): string[] {
    return Array.from(this.generatedPDFs.keys());
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const mockPDFService = new MockPDFService();

/**
 * Predefined test scenarios
 */
export const PDF_TEST_SCENARIOS = {
  SUCCESSFUL_GENERATION: {
    clientName: 'Test Company',
    agreementId: 'test-agreement-123',
    termsVersion: '1.0',
  },
  NETWORK_ERROR: {
    clientName: 'Network Error Company',
    agreementId: 'error-agreement-456',
    termsVersion: '1.0',
  },
  INVALID_VERSION: {
    clientName: 'Test Company',
    agreementId: 'test-agreement-789',
    termsVersion: 'invalid',
  },
  LARGE_METADATA: {
    clientName: 'Big Corporation',
    agreementId: 'big-agreement-123',
    termsVersion: '2.0',
    metadata: {
      customField1: 'A'.repeat(1000),
      customField2: 'B'.repeat(500),
      nestedData: {
        level1: { level2: { level3: 'Deep nested data for testing' } },
      },
    },
  },
};

/**
 * Helper function to configure mock for different test scenarios
 */
export function configurePDFServiceForTesting(scenario: 'success' | 'errors' | 'slow' | 'unreliable'): void {
  switch (scenario) {
    case 'success':
      mockPDFService.configure({
        shouldSimulateErrors: false,
        networkDelay: 0,
        errorRate: 0,
      });
      break;
    case 'errors':
      mockPDFService.configure({
        shouldSimulateErrors: true,
        networkDelay: 0,
        errorRate: 0,
      });
      break;
    case 'slow':
      mockPDFService.configure({
        shouldSimulateErrors: false,
        networkDelay: 2000, // 2 second delay
        errorRate: 0,
      });
      break;
    case 'unreliable':
      mockPDFService.configure({
        shouldSimulateErrors: false,
        networkDelay: 1000,
        errorRate: 0.3, // 30% error rate
      });
      break;
  }
}

/**
 * Jest setup helper for PDF service mocking
 */
export function setupPDFServiceMock(): void {
  // Reset before each test
  beforeEach(() => {
    mockPDFService.reset();
  });

  // Clean up after tests
  afterAll(() => {
    mockPDFService.reset();
  });
}