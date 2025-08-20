/**
 * Mock authentication service
 * Provides predictable authentication behavior with test users and permissions
 */

import { 
  ALL_TEST_USERS, 
  TEST_AUTH_SESSIONS, 
  EXPIRED_AUTH_SESSION, 
  TestUser, 
  TestAuthSession 
} from '../fixtures/users';

export interface AuthError {
  code: string;
  message: string;
  details?: any;
}

export interface SignInOptions {
  email: string;
  password?: string;
  provider?: 'google' | 'github';
  redirectTo?: string;
}

export interface SignInResult {
  success: boolean;
  session?: TestAuthSession;
  user?: TestUser;
  error?: AuthError;
}

export interface AuthStateChangeCallback {
  (event: 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | 'USER_UPDATED', session: TestAuthSession | null): void;
}

export interface AuthService {
  signInWithOAuth(provider: 'google' | 'github', options?: { redirectTo?: string }): Promise<SignInResult>;
  signOut(): Promise<{ success: boolean; error?: AuthError }>;
  getSession(): Promise<TestAuthSession | null>;
  getUser(): Promise<TestUser | null>;
  refreshSession(): Promise<TestAuthSession | null>;
  onAuthStateChange(callback: AuthStateChangeCallback): { data: { subscription: { unsubscribe: () => void } } };
}

/**
 * Mock authentication service implementation
 */
class MockAuthService implements AuthService {
  private currentSession: TestAuthSession | null = null;
  private authStateCallbacks: AuthStateChangeCallback[] = [];
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
   * Mock OAuth sign-in with predictable behavior
   */
  async signInWithOAuth(provider: 'google' | 'github', options?: { redirectTo?: string }): Promise<SignInResult> {
    // Simulate network delay
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    // Simulate random errors based on error rate
    if (this.errorRate > 0 && Math.random() < this.errorRate) {
      return {
        success: false,
        error: {
          code: 'network_error',
          message: 'Mock error: Authentication failed due to simulated network error',
        },
      };
    }

    // Simulate specific error conditions
    if (this.shouldSimulateErrors) {
      if (provider === 'github') {
        return {
          success: false,
          error: {
            code: 'provider_disabled',
            message: 'Mock error: GitHub provider is disabled',
          },
        };
      }
    }

    // Successful OAuth sign-in - use main operator by default
    const session = TEST_AUTH_SESSIONS[0]; // Main operator session
    this.currentSession = session;

    // Notify auth state change listeners
    this.notifyAuthStateChange('SIGNED_IN', session);

    return {
      success: true,
      session,
      user: session.user,
    };
  }

  /**
   * Mock sign out
   */
  async signOut(): Promise<{ success: boolean; error?: AuthError }> {
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    if (this.shouldSimulateErrors && Math.random() < 0.05) {
      return {
        success: false,
        error: {
          code: 'signout_error',
          message: 'Mock error: Sign out failed',
        },
      };
    }

    const wasSignedIn = this.currentSession !== null;
    this.currentSession = null;

    if (wasSignedIn) {
      this.notifyAuthStateChange('SIGNED_OUT', null);
    }

    return { success: true };
  }

  /**
   * Get current session
   */
  async getSession(): Promise<TestAuthSession | null> {
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    // Check if current session is expired
    if (this.currentSession && this.isSessionExpired(this.currentSession)) {
      this.currentSession = null;
      this.notifyAuthStateChange('SIGNED_OUT', null);
    }

    return this.currentSession;
  }

  /**
   * Get current user
   */
  async getUser(): Promise<TestUser | null> {
    const session = await this.getSession();
    return session?.user ?? null;
  }

  /**
   * Mock session refresh
   */
  async refreshSession(): Promise<TestAuthSession | null> {
    if (this.networkDelay > 0) {
      await this.sleep(this.networkDelay);
    }

    if (!this.currentSession) {
      return null;
    }

    if (this.shouldSimulateErrors && Math.random() < 0.1) {
      // Simulate refresh failure - sign out user
      this.currentSession = null;
      this.notifyAuthStateChange('SIGNED_OUT', null);
      return null;
    }

    // Create new session with extended expiry
    const refreshedSession: TestAuthSession = {
      ...this.currentSession,
      expires_at: new Date(Date.now() + this.currentSession.expires_in * 1000),
    };

    this.currentSession = refreshedSession;
    this.notifyAuthStateChange('TOKEN_REFRESHED', refreshedSession);

    return refreshedSession;
  }

  /**
   * Set up auth state change listener
   */
  onAuthStateChange(callback: AuthStateChangeCallback): { data: { subscription: { unsubscribe: () => void } } } {
    this.authStateCallbacks.push(callback);

    const unsubscribe = () => {
      const index = this.authStateCallbacks.indexOf(callback);
      if (index > -1) {
        this.authStateCallbacks.splice(index, 1);
      }
    };

    return {
      data: {
        subscription: { unsubscribe },
      },
    };
  }

  /**
   * Set current user session (for testing)
   */
  setCurrentSession(session: TestAuthSession | null): void {
    const previousSession = this.currentSession;
    this.currentSession = session;

    if (session && !previousSession) {
      this.notifyAuthStateChange('SIGNED_IN', session);
    } else if (!session && previousSession) {
      this.notifyAuthStateChange('SIGNED_OUT', null);
    } else if (session && previousSession) {
      this.notifyAuthStateChange('USER_UPDATED', session);
    }
  }

  /**
   * Set current user by ID (for testing)
   */
  setCurrentUser(userId: string): void {
    const session = TEST_AUTH_SESSIONS.find(s => s.user.id === userId);
    if (session) {
      this.setCurrentSession(session);
    }
  }

  /**
   * Simulate session expiry (for testing)
   */
  expireCurrentSession(): void {
    if (this.currentSession) {
      this.currentSession.expires_at = new Date(Date.now() - 1000); // 1 second ago
    }
  }

  /**
   * Reset mock state for clean tests
   */
  reset(): void {
    this.currentSession = null;
    this.authStateCallbacks = [];
    this.shouldSimulateErrors = false;
    this.networkDelay = 0;
    this.errorRate = 0;
  }

  /**
   * Get current auth state (for testing)
   */
  getCurrentState(): {
    session: TestAuthSession | null;
    callbackCount: number;
  } {
    return {
      session: this.currentSession,
      callbackCount: this.authStateCallbacks.length,
    };
  }

  private notifyAuthStateChange(event: 'SIGNED_IN' | 'SIGNED_OUT' | 'TOKEN_REFRESHED' | 'USER_UPDATED', session: TestAuthSession | null): void {
    this.authStateCallbacks.forEach(callback => {
      try {
        callback(event, session);
      } catch (error) {
        console.warn('Auth state change callback failed:', error);
      }
    });
  }

  private isSessionExpired(session: TestAuthSession): boolean {
    return session.expires_at <= new Date();
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Export singleton instance
export const mockAuthService = new MockAuthService();

/**
 * Predefined test scenarios
 */
export const AUTH_TEST_SCENARIOS = {
  SUCCESSFUL_LOGIN: {
    provider: 'google' as const,
    expectedUser: TEST_AUTH_SESSIONS[0].user,
  },
  PROVIDER_ERROR: {
    provider: 'github' as const,
    expectedError: 'provider_disabled',
  },
  EXPIRED_SESSION: EXPIRED_AUTH_SESSION,
  MAIN_OPERATOR: TEST_AUTH_SESSIONS[0],
  SECONDARY_OPERATOR: TEST_AUTH_SESSIONS[1],
  ADMIN_USER: TEST_AUTH_SESSIONS[2],
  VIEWER_USER: TEST_AUTH_SESSIONS[3],
};

/**
 * Helper function to configure auth service for different test scenarios
 */
export function configureAuthServiceForTesting(scenario: 'success' | 'errors' | 'slow' | 'unreliable'): void {
  switch (scenario) {
    case 'success':
      mockAuthService.configure({
        shouldSimulateErrors: false,
        networkDelay: 0,
        errorRate: 0,
      });
      break;
    case 'errors':
      mockAuthService.configure({
        shouldSimulateErrors: true,
        networkDelay: 0,
        errorRate: 0,
      });
      break;
    case 'slow':
      mockAuthService.configure({
        shouldSimulateErrors: false,
        networkDelay: 2000, // 2 second delay
        errorRate: 0,
      });
      break;
    case 'unreliable':
      mockAuthService.configure({
        shouldSimulateErrors: false,
        networkDelay: 500,
        errorRate: 0.2, // 20% error rate
      });
      break;
  }
}

/**
 * Jest setup helper for auth service mocking
 */
export function setupAuthServiceMock(): void {
  // Reset before each test
  beforeEach(() => {
    mockAuthService.reset();
  });

  // Clean up after tests
  afterAll(() => {
    mockAuthService.reset();
  });
}

/**
 * Helper functions for common test patterns
 */
export const AUTH_TEST_HELPERS = {
  /**
   * Sign in as a specific test user
   */
  signInAsUser: async (userType: 'main_operator' | 'secondary_operator' | 'admin' | 'viewer'): Promise<void> => {
    const sessionIndex = {
      main_operator: 0,
      secondary_operator: 1,
      admin: 2,
      viewer: 3,
    }[userType];

    mockAuthService.setCurrentSession(TEST_AUTH_SESSIONS[sessionIndex]);
  },

  /**
   * Sign out current user
   */
  signOut: async (): Promise<void> => {
    await mockAuthService.signOut();
  },

  /**
   * Check if user has permission
   */
  hasPermission: (permission: string): boolean => {
    const session = mockAuthService.getCurrentState().session;
    return session?.user.permissions.includes(permission) ?? false;
  },

  /**
   * Get current user role
   */
  getCurrentUserRole: (): string | null => {
    const session = mockAuthService.getCurrentState().session;
    return session?.user.role ?? null;
  },
};