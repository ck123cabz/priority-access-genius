/**
 * Test fixtures for User authentication and authorization
 * Provides test user data for different permission levels and scenarios
 */

export interface TestUser {
  id: string;
  email: string;
  name: string;
  role: 'operator' | 'admin' | 'viewer';
  permissions: string[];
  created_at: Date;
  last_sign_in_at: Date | null;
  is_active: boolean;
}

export interface TestAuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: Date;
  user: TestUser;
}

// Test user IDs matching the operator IDs from clients.ts
import { TEST_OPERATOR_IDS } from './clients';

const BASE_TIMESTAMP = new Date('2025-01-01T10:00:00Z');

/**
 * Test operators with different permission levels
 */
export const TEST_OPERATORS: TestUser[] = [
  {
    id: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    email: 'main.operator@test.com',
    name: 'Main Test Operator',
    role: 'operator',
    permissions: [
      'clients:create',
      'clients:read',
      'clients:update',
      'clients:delete',
      'agreements:read',
      'audit:read',
    ],
    created_at: new Date(BASE_TIMESTAMP.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    last_sign_in_at: new Date(BASE_TIMESTAMP.getTime() - 60 * 60 * 1000), // 1 hour ago
    is_active: true,
  },
  {
    id: TEST_OPERATOR_IDS.SECONDARY_OPERATOR,
    email: 'secondary.operator@test.com',
    name: 'Secondary Test Operator',
    role: 'operator',
    permissions: [
      'clients:create',
      'clients:read',
      'clients:update',
      'agreements:read',
    ],
    created_at: new Date(BASE_TIMESTAMP.getTime() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    last_sign_in_at: new Date(BASE_TIMESTAMP.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    is_active: true,
  },
  {
    id: TEST_OPERATOR_IDS.INACTIVE_OPERATOR,
    email: 'inactive.operator@test.com',
    name: 'Inactive Test Operator',
    role: 'operator',
    permissions: [],
    created_at: new Date(BASE_TIMESTAMP.getTime() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
    last_sign_in_at: new Date(BASE_TIMESTAMP.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    is_active: false,
  },
];

/**
 * Test admin users with elevated permissions
 */
export const TEST_ADMINS: TestUser[] = [
  {
    id: '00000000-0000-4000-8000-000000000010',
    email: 'admin@test.com',
    name: 'Test Administrator',
    role: 'admin',
    permissions: [
      'clients:create',
      'clients:read',
      'clients:update',
      'clients:delete',
      'agreements:read',
      'agreements:delete',
      'audit:read',
      'audit:write',
      'users:manage',
      'system:configure',
    ],
    created_at: new Date(BASE_TIMESTAMP.getTime() - 90 * 24 * 60 * 60 * 1000), // 90 days ago
    last_sign_in_at: new Date(BASE_TIMESTAMP.getTime() - 30 * 60 * 1000), // 30 minutes ago
    is_active: true,
  },
];

/**
 * Test viewer users with limited permissions
 */
export const TEST_VIEWERS: TestUser[] = [
  {
    id: '00000000-0000-4000-8000-000000000020',
    email: 'viewer@test.com',
    name: 'Test Viewer',
    role: 'viewer',
    permissions: [
      'clients:read',
      'agreements:read',
    ],
    created_at: new Date(BASE_TIMESTAMP.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    last_sign_in_at: new Date(BASE_TIMESTAMP.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
    is_active: true,
  },
];

/**
 * All test users combined
 */
export const ALL_TEST_USERS: TestUser[] = [
  ...TEST_OPERATORS,
  ...TEST_ADMINS,
  ...TEST_VIEWERS,
];

/**
 * Test authentication sessions for different users
 */
export const TEST_AUTH_SESSIONS: TestAuthSession[] = [
  {
    access_token: 'test_access_token_main_operator',
    refresh_token: 'test_refresh_token_main_operator',
    expires_in: 3600,
    expires_at: new Date(BASE_TIMESTAMP.getTime() + 60 * 60 * 1000), // 1 hour from now
    user: TEST_OPERATORS[0],
  },
  {
    access_token: 'test_access_token_secondary_operator',
    refresh_token: 'test_refresh_token_secondary_operator',
    expires_in: 3600,
    expires_at: new Date(BASE_TIMESTAMP.getTime() + 60 * 60 * 1000), // 1 hour from now
    user: TEST_OPERATORS[1],
  },
  {
    access_token: 'test_access_token_admin',
    refresh_token: 'test_refresh_token_admin',
    expires_in: 7200,
    expires_at: new Date(BASE_TIMESTAMP.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
    user: TEST_ADMINS[0],
  },
  {
    access_token: 'test_access_token_viewer',
    refresh_token: 'test_refresh_token_viewer',
    expires_in: 1800,
    expires_at: new Date(BASE_TIMESTAMP.getTime() + 30 * 60 * 1000), // 30 minutes from now
    user: TEST_VIEWERS[0],
  },
];

/**
 * Expired session for testing authentication failures
 */
export const EXPIRED_AUTH_SESSION: TestAuthSession = {
  access_token: 'test_expired_access_token',
  refresh_token: 'test_expired_refresh_token',
  expires_in: 0,
  expires_at: new Date(BASE_TIMESTAMP.getTime() - 60 * 60 * 1000), // 1 hour ago (expired)
  user: TEST_OPERATORS[2], // Inactive operator
};

/**
 * Test OAuth provider data
 */
export const TEST_OAUTH_PROVIDERS = {
  google: {
    id: 'google',
    name: 'Google',
    client_id: 'test_google_client_id',
    redirect_uri: 'http://localhost:3000/auth/callback',
  },
};

/**
 * Test user data organized by role
 */
export const USERS_BY_ROLE = {
  operator: TEST_OPERATORS,
  admin: TEST_ADMINS,
  viewer: TEST_VIEWERS,
};

/**
 * Test user data organized by permissions
 */
export const USERS_BY_PERMISSION = ALL_TEST_USERS.reduce((acc, user) => {
  user.permissions.forEach(permission => {
    if (!acc[permission]) {
      acc[permission] = [];
    }
    acc[permission].push(user);
  });
  return acc;
}, {} as Record<string, TestUser[]>);

/**
 * Utility function to get a user by ID
 */
export function getTestUserById(id: string): TestUser | undefined {
  return ALL_TEST_USERS.find(user => user.id === id);
}

/**
 * Utility function to get a user by email
 */
export function getTestUserByEmail(email: string): TestUser | undefined {
  return ALL_TEST_USERS.find(user => user.email === email);
}

/**
 * Utility function to get users with specific permission
 */
export function getTestUsersWithPermission(permission: string): TestUser[] {
  return ALL_TEST_USERS.filter(user => user.permissions.includes(permission));
}

/**
 * Utility function to get active users
 */
export function getActiveTestUsers(): TestUser[] {
  return ALL_TEST_USERS.filter(user => user.is_active);
}

/**
 * Utility function to get inactive users
 */
export function getInactiveTestUsers(): TestUser[] {
  return ALL_TEST_USERS.filter(user => !user.is_active);
}

/**
 * Utility function to get session for user
 */
export function getTestSessionForUser(userId: string): TestAuthSession | undefined {
  return TEST_AUTH_SESSIONS.find(session => session.user.id === userId);
}

/**
 * Utility function to check if session is expired
 */
export function isTestSessionExpired(session: TestAuthSession, referenceDate: Date = new Date()): boolean {
  return session.expires_at <= referenceDate;
}

/**
 * Test permission checking utilities
 */
export const PERMISSION_TESTS = {
  hasPermission: (user: TestUser, permission: string): boolean => {
    return user.permissions.includes(permission);
  },
  hasAnyPermission: (user: TestUser, permissions: string[]): boolean => {
    return permissions.some(permission => user.permissions.includes(permission));
  },
  hasAllPermissions: (user: TestUser, permissions: string[]): boolean => {
    return permissions.every(permission => user.permissions.includes(permission));
  },
};