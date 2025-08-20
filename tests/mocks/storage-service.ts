/**
 * Mock Supabase storage service
 * Provides predictable file upload/download operations without external dependencies
 */

export interface FileUploadOptions {
  bucket: string;
  path: string;
  file: File | Buffer | Uint8Array;
  options?: {
    cacheControl?: string;
    contentType?: string;
    upsert?: boolean;
  };
}

export interface FileUploadResult {
  success: boolean;
  data?: {
    path: string;
    id: string;
    fullPath: string;
  };
  error?: string;
}

export interface FileDownloadResult {
  success: boolean;
  data?: Uint8Array;
  error?: string;
}

export interface FileMetadata {
  name: string;
  bucket: string;
  owner: string;
  id: string;
  updated_at: Date;
  created_at: Date;
  last_accessed_at: Date;
  metadata: Record<string, any>;
  size: number;
  mimetype: string;
  etag: string;
}

export interface StorageService {
  upload(options: FileUploadOptions): Promise<FileUploadResult>;
  download(bucket: string, path: string): Promise<FileDownloadResult>;
  delete(bucket: string, path: string): Promise<boolean>;
  list(bucket: string, path?: string): Promise<FileMetadata[]>;
  getPublicUrl(bucket: string, path: string): string;
  createSignedUrl(bucket: string, path: string, expiresIn: number): Promise<string>;
  getMetadata(bucket: string, path: string): Promise<FileMetadata | null>;
}

/**
 * Mock storage service implementation
 */
class MockStorageService implements StorageService {
  private readonly baseUrl = 'https://test-storage.supabase.co/storage/v1/object/public/';
  private readonly files = new Map<string, {
    data: Uint8Array;
    metadata: FileMetadata;
  }>();
  private shouldSimulateErrors = false;
  private networkDelay = 0;
  private errorRate = 0;
  private uploadSizeLimit = 10 * 1024 * 1024; // 10MB default

  /**
   * Configure mock behavior for testing different scenarios
   */
  configure(options: {
    shouldSimulateErrors?: boolean;
    networkDelay?: number;
    errorRate?: number;
    uploadSizeLimit?: number;
  }): void {
    this.shouldSimulateErrors = options.shouldSimulateErrors ?? false;
    this.networkDelay = options.networkDelay ?? 0;
    this.errorRate = options.errorRate ?? 0;
    this.uploadSizeLimit = options.uploadSizeLimit ?? this.uploadSizeLimit;
  }

  /**
   * Mock file upload with predictable behavior
   */
  async upload(options: FileUploadOptions): Promise<FileUploadResult> {
    // Simulate network delay
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    // Simulate random errors based on error rate
    if (this.errorRate > 0 && Math.random() < this.errorRate) {
      return {
        success: false,
        error: 'Mock error: Upload failed due to simulated network error',
      };
    }

    const fullPath = `${options.bucket}/${options.path}`;
    const fileData = this.normalizeFileData(options.file);
    const fileSize = fileData.length;

    // Check file size limits
    if (fileSize > this.uploadSizeLimit) {
      return {
        success: false,
        error: `Mock error: File size ${fileSize} exceeds limit ${this.uploadSizeLimit}`,
      };
    }

    // Simulate specific error conditions
    if (this.shouldSimulateErrors) {
      if (options.path.includes('invalid')) {
        return {
          success: false,
          error: 'Mock error: Invalid file path',
        };
      }

      if (options.bucket === 'nonexistent') {
        return {
          success: false,
          error: 'Mock error: Bucket does not exist',
        };
      }
    }

    // Check if file already exists and upsert is false
    if (this.files.has(fullPath) && !options.options?.upsert) {
      return {
        success: false,
        error: 'Mock error: File already exists and upsert is false',
      };
    }

    // Generate file metadata
    const now = new Date();
    const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const etag = this.generateEtag(fileData);
    
    const metadata: FileMetadata = {
      name: options.path.split('/').pop() || options.path,
      bucket: options.bucket,
      owner: 'test-user-id',
      id: fileId,
      updated_at: now,
      created_at: now,
      last_accessed_at: now,
      metadata: {},
      size: fileSize,
      mimetype: options.options?.contentType || this.guessMimeType(options.path),
      etag,
    };

    // Store file and metadata
    this.files.set(fullPath, {
      data: fileData,
      metadata,
    });

    return {
      success: true,
      data: {
        path: options.path,
        id: fileId,
        fullPath,
      },
    };
  }

  /**
   * Mock file download
   */
  async download(bucket: string, path: string): Promise<FileDownloadResult> {
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    // Simulate random errors
    if (this.errorRate > 0 && Math.random() < this.errorRate) {
      return {
        success: false,
        error: 'Mock error: Download failed due to simulated network error',
      };
    }

    const fullPath = `${bucket}/${path}`;
    const file = this.files.get(fullPath);

    if (!file) {
      return {
        success: false,
        error: 'Mock error: File not found',
      };
    }

    // Update last accessed time
    file.metadata.last_accessed_at = new Date();

    return {
      success: true,
      data: file.data,
    };
  }

  /**
   * Mock file deletion
   */
  async delete(bucket: string, path: string): Promise<boolean> {
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    if (this.shouldSimulateErrors && Math.random() < 0.1) {
      return false; // 10% chance of deletion failure when errors enabled
    }

    const fullPath = `${bucket}/${path}`;
    return this.files.delete(fullPath);
  }

  /**
   * Mock file listing
   */
  async list(bucket: string, path = ''): Promise<FileMetadata[]> {
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    const prefix = `${bucket}/${path}`;
    const matchingFiles: FileMetadata[] = [];

    for (const [fullPath, file] of this.files.entries()) {
      if (fullPath.startsWith(prefix)) {
        matchingFiles.push(file.metadata);
      }
    }

    return matchingFiles.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Get public URL for file
   */
  getPublicUrl(bucket: string, path: string): string {
    return `${this.baseUrl}${bucket}/${path}`;
  }

  /**
   * Create signed URL for private file access
   */
  async createSignedUrl(bucket: string, path: string, expiresIn: number): Promise<string> {
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    const expiresAt = Date.now() + (expiresIn * 1000);
    const signature = this.generateSignature(bucket, path, expiresAt);
    
    return `${this.baseUrl}${bucket}/${path}?token=${signature}&expires=${expiresAt}`;
  }

  /**
   * Get file metadata
   */
  async getMetadata(bucket: string, path: string): Promise<FileMetadata | null> {
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    const fullPath = `${bucket}/${path}`;
    const file = this.files.get(fullPath);
    
    return file ? file.metadata : null;
  }

  /**
   * Reset mock state for clean tests
   */
  reset(): void {
    this.files.clear();
    this.shouldSimulateErrors = false;
    this.networkDelay = 0;
    this.errorRate = 0;
    this.uploadSizeLimit = 10 * 1024 * 1024;
  }

  /**
   * Get all stored files (for testing)
   */
  getAllStoredFiles(): Array<{ path: string; metadata: FileMetadata }> {
    return Array.from(this.files.entries()).map(([path, file]) => ({
      path,
      metadata: file.metadata,
    }));
  }

  /**
   * Simulate storage quota limits
   */
  getTotalStorageUsed(): number {
    let total = 0;
    for (const [, file] of this.files.entries()) {
      total += file.metadata.size;
    }
    return total;
  }

  private normalizeFileData(file: File | Buffer | Uint8Array): Uint8Array {
    if (file instanceof File) {
      // For File objects in tests, we'll create a simple buffer representation
      const buffer = Buffer.from(file.name, 'utf-8');
      return new Uint8Array(buffer);
    } else if (Buffer.isBuffer(file)) {
      return new Uint8Array(file);
    } else {
      return file;
    }
  }

  private guessMimeType(path: string): string {
    const extension = path.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      pdf: 'application/pdf',
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      svg: 'image/svg+xml',
      txt: 'text/plain',
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      json: 'application/json',
    };
    return mimeTypes[extension || ''] || 'application/octet-stream';
  }

  private generateEtag(data: Uint8Array): string {
    // Simple hash for testing - NOT for production
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash + data[i]) & 0xffffffff;
    }
    return Math.abs(hash).toString(16);
  }

  private generateSignature(bucket: string, path: string, expiresAt: number): string {
    // Simple signature for testing - NOT for production
    const data = `${bucket}:${path}:${expiresAt}`;
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      hash = ((hash << 5) - hash + data.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash).toString(16);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const mockStorageService = new MockStorageService();

/**
 * Predefined test scenarios
 */
export const STORAGE_TEST_SCENARIOS = {
  LOGO_UPLOAD: {
    bucket: 'logos',
    path: 'test-company-logo.png',
    file: new Uint8Array([0x89, 0x50, 0x4E, 0x47]), // PNG header
    options: { contentType: 'image/png' },
  },
  PDF_UPLOAD: {
    bucket: 'agreements',
    path: 'test-agreement.pdf',
    file: new Uint8Array([0x25, 0x50, 0x44, 0x46]), // PDF header
    options: { contentType: 'application/pdf' },
  },
  LARGE_FILE: {
    bucket: 'uploads',
    path: 'large-file.bin',
    file: new Uint8Array(5 * 1024 * 1024), // 5MB file
    options: { contentType: 'application/octet-stream' },
  },
  INVALID_PATH: {
    bucket: 'test',
    path: 'invalid/path/file.txt',
    file: new Uint8Array([0x48, 0x65, 0x6C, 0x6C, 0x6F]), // "Hello"
  },
};

/**
 * Helper function to configure storage service for different test scenarios
 */
export function configureStorageServiceForTesting(scenario: 'success' | 'errors' | 'slow' | 'quota_limited'): void {
  switch (scenario) {
    case 'success':
      mockStorageService.configure({
        shouldSimulateErrors: false,
        networkDelay: 0,
        errorRate: 0,
      });
      break;
    case 'errors':
      mockStorageService.configure({
        shouldSimulateErrors: true,
        networkDelay: 0,
        errorRate: 0,
      });
      break;
    case 'slow':
      mockStorageService.configure({
        shouldSimulateErrors: false,
        networkDelay: 3000, // 3 second delay
        errorRate: 0,
      });
      break;
    case 'quota_limited':
      mockStorageService.configure({
        shouldSimulateErrors: false,
        networkDelay: 0,
        errorRate: 0,
        uploadSizeLimit: 1024 * 1024, // 1MB limit
      });
      break;
  }
}

/**
 * Jest setup helper for storage service mocking
 */
export function setupStorageServiceMock(): void {
  // Reset before each test
  beforeEach(() => {
    mockStorageService.reset();
  });

  // Clean up after tests
  afterAll(() => {
    mockStorageService.reset();
  });
}