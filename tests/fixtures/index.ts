/**
 * Test fixtures index
 * Centralized exports for all test data fixtures
 */

// Client fixtures
export * from './clients';
export * from './agreements';
export * from './users';

// Re-export organized collections for convenience
export {
  ALL_TEST_CLIENTS,
  PENDING_CLIENTS,
  ACTIVATED_CLIENTS,
  EDGE_CASE_CLIENTS,
  CLIENTS_BY_OPERATOR,
  CLIENTS_BY_STATUS,
  TEST_OPERATOR_IDS,
} from './clients';

export {
  ALL_TEST_AGREEMENTS,
  COMPLETED_AGREEMENTS,
  DIFFERENT_VERSIONS_AGREEMENTS,
  EDGE_CASE_AGREEMENTS,
  INVALID_AGREEMENTS,
  AGREEMENTS_BY_CLIENT,
  AGREEMENTS_BY_VERSION,
  SIGNATURE_TEST_DATA,
} from './agreements';

export {
  ALL_TEST_USERS,
  TEST_OPERATORS,
  TEST_ADMINS,
  TEST_VIEWERS,
  TEST_AUTH_SESSIONS,
  EXPIRED_AUTH_SESSION,
  TEST_OAUTH_PROVIDERS,
  USERS_BY_ROLE,
  USERS_BY_PERMISSION,
  PERMISSION_TESTS,
} from './users';

/**
 * Utility type for test database records
 */
export type TestRecord = {
  id: string;
  created_at: Date;
  updated_at?: Date;
};

/**
 * Common test utilities
 */
export const TEST_UTILS = {
  /**
   * Generate a test timestamp relative to base time
   */
  getTestTimestamp: (offsetHours = 0): Date => {
    const baseTime = new Date('2025-01-01T10:00:00Z');
    return new Date(baseTime.getTime() + offsetHours * 60 * 60 * 1000);
  },

  /**
   * Generate a test UUID for consistent testing
   */
  generateTestUUID: (prefix: string, index: number): string => {
    const paddedIndex = index.toString().padStart(8, '0');
    return `${prefix}-0000-4000-8000-${paddedIndex}`;
  },

  /**
   * Generate test email for consistent testing
   */
  generateTestEmail: (username: string, domain = 'test.com'): string => {
    return `${username}@${domain}`;
  },

  /**
   * Check if a test record is expired based on timestamp
   */
  isExpired: (expiresAt: Date | null, referenceDate: Date = new Date()): boolean => {
    return expiresAt ? expiresAt <= referenceDate : false;
  },

  /**
   * Sleep utility for timing-dependent tests
   */
  sleep: (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
  },
};