/**
 * Unit tests for mock storage service
 * Tests file operations, predictable responses, and error scenarios
 */

import {
  mockStorageService,
  configureStorageServiceForTesting,
  setupStorageServiceMock,
  STORAGE_TEST_SCENARIOS,
  type FileUploadOptions,
} from '../../mocks/storage-service';

describe('Mock Storage Service', () => {
  setupStorageServiceMock();

  describe('File Upload', () => {
    beforeEach(() => {
      configureStorageServiceForTesting('success');
    });

    test('should upload file successfully', async () => {
      const uploadOptions: FileUploadOptions = {
        bucket: 'test-bucket',
        path: 'test-file.txt',
        file: new Uint8Array([72, 101, 108, 108, 111]), // "Hello"
        options: {
          contentType: 'text/plain',
        },
      };

      const result = await mockStorageService.upload(uploadOptions);

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.data!.path).toBe('test-file.txt');
      expect(result.data!.id).toBeTruthy();
      expect(result.data!.fullPath).toBe('test-bucket/test-file.txt');
      expect(result.error).toBeUndefined();
    });

    test('should handle file upsert', async () => {
      const uploadOptions: FileUploadOptions = {
        bucket: 'test-bucket',
        path: 'upsert-test.txt',
        file: new Uint8Array([65, 66, 67]), // "ABC"
        options: {
          upsert: true,
        },
      };

      // Upload first time
      const result1 = await mockStorageService.upload(uploadOptions);
      expect(result1.success).toBe(true);

      // Upload again with upsert
      const result2 = await mockStorageService.upload(uploadOptions);
      expect(result2.success).toBe(true);
    });

    test('should fail upload without upsert for existing file', async () => {
      const uploadOptions: FileUploadOptions = {
        bucket: 'test-bucket',
        path: 'no-upsert-test.txt',
        file: new Uint8Array([68, 69, 70]), // "DEF"
        options: {
          upsert: false,
        },
      };

      // Upload first time
      const result1 = await mockStorageService.upload(uploadOptions);
      expect(result1.success).toBe(true);

      // Try to upload again without upsert
      const result2 = await mockStorageService.upload(uploadOptions);
      expect(result2.success).toBe(false);
      expect(result2.error).toContain('File already exists');
    });

    test('should reject files exceeding size limit', async () => {
      configureStorageServiceForTesting('quota_limited');

      const largeFile = new Uint8Array(2 * 1024 * 1024); // 2MB file, limit is 1MB
      const uploadOptions: FileUploadOptions = {
        bucket: 'test-bucket',
        path: 'large-file.bin',
        file: largeFile,
      };

      const result = await mockStorageService.upload(uploadOptions);

      expect(result.success).toBe(false);
      expect(result.error).toContain('exceeds limit');
    });

    test('should guess mime types correctly', async () => {
      const testCases = [
        { path: 'test.pdf', expectedType: 'application/pdf' },
        { path: 'image.png', expectedType: 'image/png' },
        { path: 'image.jpg', expectedType: 'image/jpeg' },
        { path: 'style.css', expectedType: 'text/css' },
        { path: 'unknown.xyz', expectedType: 'application/octet-stream' },
      ];

      for (const testCase of testCases) {
        const uploadOptions: FileUploadOptions = {
          bucket: 'test-bucket',
          path: testCase.path,
          file: new Uint8Array([1, 2, 3]),
        };

        const result = await mockStorageService.upload(uploadOptions);
        expect(result.success).toBe(true);

        const metadata = await mockStorageService.getMetadata('test-bucket', testCase.path);
        expect(metadata!.mimetype).toBe(testCase.expectedType);
      }
    });
  });

  describe('File Download', () => {
    beforeEach(() => {
      configureStorageServiceForTesting('success');
    });

    test('should download existing file', async () => {
      const fileData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
      const uploadOptions: FileUploadOptions = {
        bucket: 'test-bucket',
        path: 'download-test.txt',
        file: fileData,
      };

      // Upload file first
      const uploadResult = await mockStorageService.upload(uploadOptions);
      expect(uploadResult.success).toBe(true);

      // Download file
      const downloadResult = await mockStorageService.download('test-bucket', 'download-test.txt');
      
      expect(downloadResult.success).toBe(true);
      expect(downloadResult.data).toEqual(fileData);
      expect(downloadResult.error).toBeUndefined();
    });

    test('should fail to download non-existent file', async () => {
      const downloadResult = await mockStorageService.download('test-bucket', 'non-existent.txt');
      
      expect(downloadResult.success).toBe(false);
      expect(downloadResult.data).toBeUndefined();
      expect(downloadResult.error).toContain('File not found');
    });

    test('should update last accessed time on download', async () => {
      const uploadOptions: FileUploadOptions = {
        bucket: 'test-bucket',
        path: 'access-time-test.txt',
        file: new Uint8Array([1, 2, 3]),
      };

      // Upload file
      await mockStorageService.upload(uploadOptions);
      
      const metadataBefore = await mockStorageService.getMetadata('test-bucket', 'access-time-test.txt');
      const accessTimeBefore = metadataBefore!.last_accessed_at.getTime();

      // Wait a bit to ensure time difference
      await new Promise(resolve => setTimeout(resolve, 10));

      // Download file
      await mockStorageService.download('test-bucket', 'access-time-test.txt');
      
      const metadataAfter = await mockStorageService.getMetadata('test-bucket', 'access-time-test.txt');
      const accessTimeAfter = metadataAfter!.last_accessed_at.getTime();

      expect(accessTimeAfter).toBeGreaterThan(accessTimeBefore);
    });
  });

  describe('File Deletion', () => {
    beforeEach(() => {
      configureStorageServiceForTesting('success');
    });

    test('should delete existing file', async () => {
      const uploadOptions: FileUploadOptions = {
        bucket: 'test-bucket',
        path: 'delete-test.txt',
        file: new Uint8Array([1, 2, 3]),
      };

      // Upload file first
      const uploadResult = await mockStorageService.upload(uploadOptions);
      expect(uploadResult.success).toBe(true);

      // Delete file
      const deleteResult = await mockStorageService.delete('test-bucket', 'delete-test.txt');
      expect(deleteResult).toBe(true);

      // Verify file is gone
      const downloadResult = await mockStorageService.download('test-bucket', 'delete-test.txt');
      expect(downloadResult.success).toBe(false);
    });

    test('should fail to delete non-existent file', async () => {
      const deleteResult = await mockStorageService.delete('test-bucket', 'non-existent.txt');
      expect(deleteResult).toBe(false);
    });
  });

  describe('File Listing', () => {
    beforeEach(() => {
      configureStorageServiceForTesting('success');
    });

    test('should list files in bucket', async () => {
      const files = [
        { path: 'file1.txt', content: new Uint8Array([1]) },
        { path: 'file2.txt', content: new Uint8Array([2]) },
        { path: 'subdir/file3.txt', content: new Uint8Array([3]) },
      ];

      // Upload test files
      for (const file of files) {
        await mockStorageService.upload({
          bucket: 'list-test-bucket',
          path: file.path,
          file: file.content,
        });
      }

      // List all files in bucket
      const allFiles = await mockStorageService.list('list-test-bucket');
      expect(allFiles.length).toBe(3);
      
      const filenames = allFiles.map(f => f.name);
      expect(filenames).toContain('file1.txt');
      expect(filenames).toContain('file2.txt');
      expect(filenames).toContain('file3.txt');
    });

    test('should list files with path prefix', async () => {
      const files = [
        { path: 'docs/readme.txt', content: new Uint8Array([1]) },
        { path: 'docs/guide.txt', content: new Uint8Array([2]) },
        { path: 'images/logo.png', content: new Uint8Array([3]) },
      ];

      // Upload test files
      for (const file of files) {
        await mockStorageService.upload({
          bucket: 'prefix-test-bucket',
          path: file.path,
          file: file.content,
        });
      }

      // List only docs files
      const docsFiles = await mockStorageService.list('prefix-test-bucket', 'docs');
      expect(docsFiles.length).toBe(2);
      
      const filenames = docsFiles.map(f => f.name);
      expect(filenames).toContain('readme.txt');
      expect(filenames).toContain('guide.txt');
    });

    test('should return empty list for non-existent bucket', async () => {
      const files = await mockStorageService.list('non-existent-bucket');
      expect(files).toEqual([]);
    });

    test('should sort files by name', async () => {
      const files = ['c.txt', 'a.txt', 'b.txt'];

      for (const filename of files) {
        await mockStorageService.upload({
          bucket: 'sort-test-bucket',
          path: filename,
          file: new Uint8Array([1]),
        });
      }

      const listedFiles = await mockStorageService.list('sort-test-bucket');
      const names = listedFiles.map(f => f.name);
      
      expect(names).toEqual(['a.txt', 'b.txt', 'c.txt']);
    });
  });

  describe('URL Generation', () => {
    test('should generate public URLs', () => {
      const publicUrl = mockStorageService.getPublicUrl('public-bucket', 'public-file.txt');
      
      expect(publicUrl).toBe('https://test-storage.supabase.co/storage/v1/object/public/public-bucket/public-file.txt');
    });

    test('should create signed URLs', async () => {
      const expiresIn = 3600; // 1 hour
      const signedUrl = await mockStorageService.createSignedUrl('private-bucket', 'private-file.txt', expiresIn);
      
      expect(signedUrl).toContain('https://test-storage.supabase.co/storage/v1/object/public/private-bucket/private-file.txt');
      expect(signedUrl).toContain('token=');
      expect(signedUrl).toContain('expires=');
      
      // Extract expires timestamp and verify it's in the future
      const expiresMatch = signedUrl.match(/expires=(\d+)/);
      expect(expiresMatch).toBeTruthy();
      
      const expiresTimestamp = parseInt(expiresMatch![1]);
      const expectedExpiry = Date.now() + (expiresIn * 1000);
      
      expect(expiresTimestamp).toBeGreaterThan(Date.now());
      expect(expiresTimestamp).toBeLessThanOrEqual(expectedExpiry + 1000); // Allow 1s tolerance
    });
  });

  describe('Metadata Management', () => {
    beforeEach(() => {
      configureStorageServiceForTesting('success');
    });

    test('should get file metadata', async () => {
      const uploadOptions: FileUploadOptions = {
        bucket: 'metadata-bucket',
        path: 'metadata-test.pdf',
        file: new Uint8Array(1000), // 1KB file
        options: {
          contentType: 'application/pdf',
        },
      };

      await mockStorageService.upload(uploadOptions);
      
      const metadata = await mockStorageService.getMetadata('metadata-bucket', 'metadata-test.pdf');
      
      expect(metadata).toBeDefined();
      expect(metadata!.name).toBe('metadata-test.pdf');
      expect(metadata!.bucket).toBe('metadata-bucket');
      expect(metadata!.owner).toBe('test-user-id');
      expect(metadata!.size).toBe(1000);
      expect(metadata!.mimetype).toBe('application/pdf');
      expect(metadata!.created_at).toBeInstanceOf(Date);
      expect(metadata!.updated_at).toBeInstanceOf(Date);
      expect(metadata!.last_accessed_at).toBeInstanceOf(Date);
      expect(metadata!.etag).toBeTruthy();
      expect(metadata!.id).toBeTruthy();
    });

    test('should return null metadata for non-existent file', async () => {
      const metadata = await mockStorageService.getMetadata('test-bucket', 'non-existent.txt');
      expect(metadata).toBeNull();
    });
  });

  describe('Error Simulation', () => {
    test('should simulate upload errors', async () => {
      configureStorageServiceForTesting('errors');

      const uploadOptions: FileUploadOptions = {
        bucket: 'nonexistent',
        path: 'test.txt',
        file: new Uint8Array([1, 2, 3]),
      };

      const result = await mockStorageService.upload(uploadOptions);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Bucket does not exist');
    });

    test('should simulate invalid path errors', async () => {
      configureStorageServiceForTesting('errors');

      const uploadOptions: FileUploadOptions = {
        bucket: 'test-bucket',
        path: 'invalid/path/file.txt',
        file: new Uint8Array([1, 2, 3]),
      };

      const result = await mockStorageService.upload(uploadOptions);
      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid file path');
    });

    test('should simulate network errors', async () => {
      mockStorageService.configure({
        errorRate: 1.0, // 100% error rate
      });

      const uploadOptions: FileUploadOptions = {
        bucket: 'test-bucket',
        path: 'network-error-test.txt',
        file: new Uint8Array([1, 2, 3]),
      };

      const result = await mockStorageService.upload(uploadOptions);
      expect(result.success).toBe(false);
      expect(result.error).toContain('simulated network error');
    });

    test('should simulate deletion failures', async () => {
      configureStorageServiceForTesting('errors');
      
      // Even with errors, most deletes should work, but some might fail
      const results = [];
      for (let i = 0; i < 20; i++) {
        const result = await mockStorageService.delete('test-bucket', `test-file-${i}.txt`);
        results.push(result);
      }

      // Should have some failures when errors are enabled
      expect(results.some(r => r === false)).toBe(true);
    });
  });

  describe('Network Simulation', () => {
    test('should simulate slow uploads', async () => {
      configureStorageServiceForTesting('slow');

      const uploadOptions: FileUploadOptions = {
        bucket: 'test-bucket',
        path: 'slow-upload-test.txt',
        file: new Uint8Array([1, 2, 3]),
      };

      const startTime = Date.now();
      const result = await mockStorageService.upload(uploadOptions);
      const duration = Date.now() - startTime;

      expect(result.success).toBe(true);
      expect(duration).toBeGreaterThanOrEqual(2000); // Should take at least 2 seconds
    });

    test('should simulate slow downloads', async () => {
      configureStorageServiceForTesting('success');

      // First upload a file
      await mockStorageService.upload({
        bucket: 'test-bucket',
        path: 'slow-download-test.txt',
        file: new Uint8Array([1, 2, 3]),
      });

      // Then configure for slow operations and download
      configureStorageServiceForTesting('slow');

      const startTime = Date.now();
      const result = await mockStorageService.download('test-bucket', 'slow-download-test.txt');
      const duration = Date.now() - startTime;

      expect(result.success).toBe(true);
      expect(duration).toBeGreaterThanOrEqual(2000);
    });
  });

  describe('Test Scenarios', () => {
    beforeEach(() => {
      configureStorageServiceForTesting('success');
    });

    test('should handle logo upload scenario', async () => {
      const result = await mockStorageService.upload(STORAGE_TEST_SCENARIOS.LOGO_UPLOAD);

      expect(result.success).toBe(true);
      expect(result.data!.path).toBe('test-company-logo.png');

      const metadata = await mockStorageService.getMetadata('logos', 'test-company-logo.png');
      expect(metadata!.mimetype).toBe('image/png');
    });

    test('should handle PDF upload scenario', async () => {
      const result = await mockStorageService.upload(STORAGE_TEST_SCENARIOS.PDF_UPLOAD);

      expect(result.success).toBe(true);
      expect(result.data!.path).toBe('test-agreement.pdf');

      const metadata = await mockStorageService.getMetadata('agreements', 'test-agreement.pdf');
      expect(metadata!.mimetype).toBe('application/pdf');
    });

    test('should handle large file scenario', async () => {
      const result = await mockStorageService.upload(STORAGE_TEST_SCENARIOS.LARGE_FILE);

      expect(result.success).toBe(true);
      
      const metadata = await mockStorageService.getMetadata('uploads', 'large-file.bin');
      expect(metadata!.size).toBe(5 * 1024 * 1024); // 5MB
    });
  });

  describe('State Management', () => {
    test('should track stored files', () => {
      const initialFiles = mockStorageService.getAllStoredFiles();
      const initialCount = initialFiles.length;

      return mockStorageService.upload({
        bucket: 'test-bucket',
        path: 'tracking-test.txt',
        file: new Uint8Array([1, 2, 3]),
      }).then(() => {
        const finalFiles = mockStorageService.getAllStoredFiles();
        expect(finalFiles.length).toBe(initialCount + 1);
        
        const addedFile = finalFiles.find(f => f.path === 'test-bucket/tracking-test.txt');
        expect(addedFile).toBeDefined();
      });
    });

    test('should calculate total storage used', async () => {
      const initialStorage = mockStorageService.getTotalStorageUsed();

      await mockStorageService.upload({
        bucket: 'test-bucket',
        path: 'storage-calc-test.txt',
        file: new Uint8Array(1000), // 1KB
      });

      const finalStorage = mockStorageService.getTotalStorageUsed();
      expect(finalStorage).toBe(initialStorage + 1000);
    });

    test('should reset to clean state', async () => {
      // Upload some files
      await mockStorageService.upload({
        bucket: 'test-bucket',
        path: 'reset-test1.txt',
        file: new Uint8Array([1, 2, 3]),
      });

      await mockStorageService.upload({
        bucket: 'test-bucket',
        path: 'reset-test2.txt',
        file: new Uint8Array([4, 5, 6]),
      });

      expect(mockStorageService.getAllStoredFiles().length).toBeGreaterThan(0);

      // Reset and verify clean state
      mockStorageService.reset();
      
      expect(mockStorageService.getAllStoredFiles().length).toBe(0);
      expect(mockStorageService.getTotalStorageUsed()).toBe(0);
    });
  });
});