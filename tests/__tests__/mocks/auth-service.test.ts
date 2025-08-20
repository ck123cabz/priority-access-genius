/**
 * Unit tests for mock authentication service
 * Tests authentication flows, session management, and error scenarios
 */

import {
  mockAuthService,
  configureAuthServiceForTesting,
  setupAuthServiceMock,
  AUTH_TEST_SCENARIOS,
  AUTH_TEST_HELPERS,
} from '../../mocks/auth-service';

import { TEST_AUTH_SESSIONS, EXPIRED_AUTH_SESSION } from '../../fixtures/users';

describe('Mock Auth Service', () => {
  setupAuthServiceMock();

  describe('OAuth Sign In', () => {
    beforeEach(() => {
      configureAuthServiceForTesting('success');
    });

    test('should sign in with Google successfully', async () => {
      const result = await mockAuthService.signInWithOAuth('google');

      expect(result.success).toBe(true);
      expect(result.session).toBeDefined();
      expect(result.user).toBeDefined();
      expect(result.error).toBeUndefined();
      expect(result.session!.user.email).toContain('test.com');
      expect(result.session!.access_token).toBeTruthy();
      expect(result.session!.expires_at).toBeInstanceOf(Date);
      expect(result.session!.expires_at.getTime()).toBeGreaterThan(Date.now());
    });

    test('should handle redirect URL option', async () => {
      const redirectTo = 'https://example.com/callback';
      const result = await mockAuthService.signInWithOAuth('google', { redirectTo });

      expect(result.success).toBe(true);
      expect(result.session).toBeDefined();
    });

    test('should set current session after successful sign in', async () => {
      const result = await mockAuthService.signInWithOAuth('google');
      expect(result.success).toBe(true);

      const session = await mockAuthService.getSession();
      expect(session).toEqual(result.session);
    });

    test('should trigger auth state change on sign in', async () => {
      const authStateCallback = jest.fn();
      mockAuthService.onAuthStateChange(authStateCallback);

      await mockAuthService.signInWithOAuth('google');

      expect(authStateCallback).toHaveBeenCalledWith('SIGNED_IN', expect.objectContaining({
        access_token: expect.any(String),
        user: expect.objectContaining({
          email: expect.stringContaining('test.com'),
        }),
      }));
    });
  });

  describe('OAuth Error Handling', () => {
    beforeEach(() => {
      configureAuthServiceForTesting('errors');
    });

    test('should handle GitHub provider error', async () => {
      const result = await mockAuthService.signInWithOAuth('github');

      expect(result.success).toBe(false);
      expect(result.session).toBeUndefined();
      expect(result.user).toBeUndefined();
      expect(result.error).toBeDefined();
      expect(result.error!.code).toBe('provider_disabled');
      expect(result.error!.message).toContain('GitHub provider is disabled');
    });

    test('should handle network errors', async () => {
      mockAuthService.configure({
        errorRate: 1.0, // 100% error rate
      });

      const result = await mockAuthService.signInWithOAuth('google');

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error!.code).toBe('network_error');
      expect(result.error!.message).toContain('network error');
    });
  });

  describe('Sign Out', () => {
    beforeEach(() => {
      configureAuthServiceForTesting('success');
    });

    test('should sign out successfully', async () => {
      // First sign in
      await mockAuthService.signInWithOAuth('google');
      const sessionBefore = await mockAuthService.getSession();
      expect(sessionBefore).toBeDefined();

      // Then sign out
      const result = await mockAuthService.signOut();

      expect(result.success).toBe(true);
      expect(result.error).toBeUndefined();

      const sessionAfter = await mockAuthService.getSession();
      expect(sessionAfter).toBeNull();
    });

    test('should trigger auth state change on sign out', async () => {
      // Sign in first
      await mockAuthService.signInWithOAuth('google');

      const authStateCallback = jest.fn();
      mockAuthService.onAuthStateChange(authStateCallback);

      await mockAuthService.signOut();

      expect(authStateCallback).toHaveBeenCalledWith('SIGNED_OUT', null);
    });

    test('should handle sign out when not signed in', async () => {
      // Ensure no one is signed in
      await mockAuthService.signOut();

      const result = await mockAuthService.signOut();

      expect(result.success).toBe(true);
    });

    test('should simulate sign out errors', async () => {
      configureAuthServiceForTesting('errors');

      // Sign in first
      await mockAuthService.signInWithOAuth('google');

      // Try to sign out multiple times to hit the random error
      let errorEncountered = false;
      for (let i = 0; i < 50; i++) {
        const result = await mockAuthService.signOut();
        if (!result.success) {
          errorEncountered = true;
          expect(result.error).toBeDefined();
          expect(result.error!.code).toBe('signout_error');
          break;
        }
      }

      // With error simulation, we should eventually hit an error
      expect(errorEncountered).toBe(true);
    });
  });

  describe('Session Management', () => {
    beforeEach(() => {
      configureAuthServiceForTesting('success');
    });

    test('should return null session when not signed in', async () => {
      const session = await mockAuthService.getSession();
      expect(session).toBeNull();
    });

    test('should return current session when signed in', async () => {
      const signInResult = await mockAuthService.signInWithOAuth('google');
      
      const session = await mockAuthService.getSession();
      expect(session).toEqual(signInResult.session);
    });

    test('should return null for expired sessions', async () => {
      // Set an expired session
      mockAuthService.setCurrentSession(EXPIRED_AUTH_SESSION);

      const session = await mockAuthService.getSession();
      expect(session).toBeNull();
    });

    test('should get current user from session', async () => {
      await mockAuthService.signInWithOAuth('google');

      const user = await mockAuthService.getUser();
      expect(user).toBeDefined();
      expect(user!.email).toContain('test.com');
      expect(user!.permissions).toBeDefined();
      expect(Array.isArray(user!.permissions)).toBe(true);
    });

    test('should return null user when not signed in', async () => {
      const user = await mockAuthService.getUser();
      expect(user).toBeNull();
    });
  });

  describe('Session Refresh', () => {
    beforeEach(() => {
      configureAuthServiceForTesting('success');
    });

    test('should refresh valid session', async () => {
      await mockAuthService.signInWithOAuth('google');
      const originalSession = await mockAuthService.getSession();
      expect(originalSession).toBeDefined();

      const refreshedSession = await mockAuthService.refreshSession();

      expect(refreshedSession).toBeDefined();
      expect(refreshedSession!.expires_at.getTime()).toBeGreaterThan(originalSession!.expires_at.getTime());
      expect(refreshedSession!.user).toEqual(originalSession!.user);
    });

    test('should return null when refreshing without session', async () => {
      const refreshedSession = await mockAuthService.refreshSession();
      expect(refreshedSession).toBeNull();
    });

    test('should handle refresh failures', async () => {
      configureAuthServiceForTesting('errors');

      await mockAuthService.signInWithOAuth('google');
      
      // Try refreshing multiple times to hit the error
      let refreshFailed = false;
      for (let i = 0; i < 20; i++) {
        const refreshedSession = await mockAuthService.refreshSession();
        if (!refreshedSession) {
          refreshFailed = true;
          break;
        }
      }

      expect(refreshFailed).toBe(true);

      // Should be signed out after refresh failure
      const currentSession = await mockAuthService.getSession();
      expect(currentSession).toBeNull();
    });

    test('should trigger auth state change on refresh', async () => {
      await mockAuthService.signInWithOAuth('google');

      const authStateCallback = jest.fn();
      mockAuthService.onAuthStateChange(authStateCallback);

      await mockAuthService.refreshSession();

      expect(authStateCallback).toHaveBeenCalledWith('TOKEN_REFRESHED', expect.objectContaining({
        access_token: expect.any(String),
        expires_at: expect.any(Date),
      }));
    });
  });

  describe('Auth State Change Listeners', () => {
    beforeEach(() => {
      configureAuthServiceForTesting('success');
    });

    test('should register auth state change listener', () => {
      const callback = jest.fn();
      
      const { data: { subscription } } = mockAuthService.onAuthStateChange(callback);
      
      expect(subscription.unsubscribe).toBeInstanceOf(Function);
      expect(mockAuthService.getCurrentState().callbackCount).toBeGreaterThan(0);
    });

    test('should unsubscribe auth state change listener', () => {
      const callback = jest.fn();
      
      const { data: { subscription } } = mockAuthService.onAuthStateChange(callback);
      const initialCallbackCount = mockAuthService.getCurrentState().callbackCount;
      
      subscription.unsubscribe();
      
      const finalCallbackCount = mockAuthService.getCurrentState().callbackCount;
      expect(finalCallbackCount).toBe(initialCallbackCount - 1);
    });

    test('should handle multiple listeners', async () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      
      mockAuthService.onAuthStateChange(callback1);
      mockAuthService.onAuthStateChange(callback2);

      await mockAuthService.signInWithOAuth('google');

      expect(callback1).toHaveBeenCalledWith('SIGNED_IN', expect.any(Object));
      expect(callback2).toHaveBeenCalledWith('SIGNED_IN', expect.any(Object));
    });

    test('should handle callback errors gracefully', async () => {
      const faultyCallback = jest.fn(() => {
        throw new Error('Callback error');
      });
      const goodCallback = jest.fn();
      
      mockAuthService.onAuthStateChange(faultyCallback);
      mockAuthService.onAuthStateChange(goodCallback);

      // Should not throw despite faulty callback
      await expect(mockAuthService.signInWithOAuth('google')).resolves.toMatchObject({
        success: true,
      });

      expect(faultyCallback).toHaveBeenCalled();
      expect(goodCallback).toHaveBeenCalled();
    });
  });

  describe('Direct Session Management (Testing Utilities)', () => {
    test('should set current session directly', async () => {
      const testSession = TEST_AUTH_SESSIONS[0];
      
      mockAuthService.setCurrentSession(testSession);
      
      const currentSession = await mockAuthService.getSession();
      expect(currentSession).toEqual(testSession);
    });

    test('should set current user by ID', async () => {
      const testSession = TEST_AUTH_SESSIONS[1]; // Secondary operator
      
      mockAuthService.setCurrentUser(testSession.user.id);
      
      const currentSession = await mockAuthService.getSession();
      expect(currentSession!.user.id).toBe(testSession.user.id);
    });

    test('should handle setting non-existent user', () => {
      mockAuthService.setCurrentUser('non-existent-user-id');
      
      // Should not set any session for non-existent user
      return mockAuthService.getSession().then(session => {
        expect(session).toBeNull();
      });
    });

    test('should trigger auth state changes when setting session directly', () => {
      const authStateCallback = jest.fn();
      mockAuthService.onAuthStateChange(authStateCallback);

      const testSession = TEST_AUTH_SESSIONS[0];
      mockAuthService.setCurrentSession(testSession);

      expect(authStateCallback).toHaveBeenCalledWith('SIGNED_IN', testSession);

      mockAuthService.setCurrentSession(null);

      expect(authStateCallback).toHaveBeenCalledWith('SIGNED_OUT', null);
    });

    test('should expire current session manually', async () => {
      const testSession = TEST_AUTH_SESSIONS[0];
      mockAuthService.setCurrentSession(testSession);

      // Verify session is active
      let currentSession = await mockAuthService.getSession();
      expect(currentSession).toBeDefined();

      // Expire the session
      mockAuthService.expireCurrentSession();

      // Session should now be null due to expiry
      currentSession = await mockAuthService.getSession();
      expect(currentSession).toBeNull();
    });
  });

  describe('Network Simulation', () => {
    test('should simulate network delays', async () => {
      configureAuthServiceForTesting('slow');

      const startTime = Date.now();
      await mockAuthService.signInWithOAuth('google');
      const duration = Date.now() - startTime;

      expect(duration).toBeGreaterThanOrEqual(1500); // Should take at least 1.5 seconds
    });

    test('should simulate unreliable network', async () => {
      configureAuthServiceForTesting('unreliable');

      const results = [];
      for (let i = 0; i < 10; i++) {
        const result = await mockAuthService.signInWithOAuth('google');
        results.push(result.success);
        // Reset state for next attempt
        await mockAuthService.signOut();
      }

      const successes = results.filter(Boolean).length;
      const failures = results.length - successes;

      // With 20% error rate, we should have some successes and some failures
      expect(successes).toBeGreaterThan(0);
      expect(failures).toBeGreaterThan(0);
    });
  });

  describe('Test Scenarios', () => {
    beforeEach(() => {
      configureAuthServiceForTesting('success');
    });

    test('should handle successful login scenario', async () => {
      const scenario = AUTH_TEST_SCENARIOS.SUCCESSFUL_LOGIN;
      const result = await mockAuthService.signInWithOAuth(scenario.provider);

      expect(result.success).toBe(true);
      expect(result.user!.email).toBe(scenario.expectedUser.email);
    });

    test('should handle expired session scenario', async () => {
      mockAuthService.setCurrentSession(AUTH_TEST_SCENARIOS.EXPIRED_SESSION);

      const session = await mockAuthService.getSession();
      expect(session).toBeNull();
    });

    test('should work with different user scenarios', async () => {
      const scenarios = [
        AUTH_TEST_SCENARIOS.MAIN_OPERATOR,
        AUTH_TEST_SCENARIOS.SECONDARY_OPERATOR,
        AUTH_TEST_SCENARIOS.ADMIN_USER,
        AUTH_TEST_SCENARIOS.VIEWER_USER,
      ];

      for (const scenario of scenarios) {
        mockAuthService.setCurrentSession(scenario);
        
        const user = await mockAuthService.getUser();
        expect(user).toEqual(scenario.user);
        expect(user!.role).toBe(scenario.user.role);
        expect(user!.permissions).toEqual(scenario.user.permissions);

        // Clean up
        await mockAuthService.signOut();
      }
    });
  });

  describe('Auth Test Helpers', () => {
    test('should sign in as specific user type', async () => {
      await AUTH_TEST_HELPERS.signInAsUser('admin');

      const user = await mockAuthService.getUser();
      expect(user!.role).toBe('admin');
      expect(user!.permissions).toContain('system:configure');
    });

    test('should check user permissions', async () => {
      await AUTH_TEST_HELPERS.signInAsUser('main_operator');

      const canCreateClients = AUTH_TEST_HELPERS.hasPermission('clients:create');
      const canConfigureSystem = AUTH_TEST_HELPERS.hasPermission('system:configure');

      expect(canCreateClients).toBe(true);
      expect(canConfigureSystem).toBe(false);
    });

    test('should get current user role', async () => {
      await AUTH_TEST_HELPERS.signInAsUser('viewer');

      const role = AUTH_TEST_HELPERS.getCurrentUserRole();
      expect(role).toBe('viewer');
    });

    test('should return null role when not signed in', () => {
      const role = AUTH_TEST_HELPERS.getCurrentUserRole();
      expect(role).toBeNull();
    });
  });

  describe('State Management', () => {
    test('should get current state', () => {
      const initialState = mockAuthService.getCurrentState();
      expect(initialState.session).toBeNull();
      expect(initialState.callbackCount).toBe(0);

      // Add a callback
      mockAuthService.onAuthStateChange(() => {});

      const stateWithCallback = mockAuthService.getCurrentState();
      expect(stateWithCallback.callbackCount).toBe(1);
    });

    test('should reset to clean state', async () => {
      // Set up some state
      await mockAuthService.signInWithOAuth('google');
      mockAuthService.onAuthStateChange(() => {});
      
      const stateBefore = mockAuthService.getCurrentState();
      expect(stateBefore.session).toBeDefined();
      expect(stateBefore.callbackCount).toBeGreaterThan(0);

      // Reset
      mockAuthService.reset();

      const stateAfter = mockAuthService.getCurrentState();
      expect(stateAfter.session).toBeNull();
      expect(stateAfter.callbackCount).toBe(0);
    });

    test('should maintain clean state between tests', async () => {
      // This test verifies the setupAuthServiceMock() functionality
      const initialState = mockAuthService.getCurrentState();
      expect(initialState.session).toBeNull();
      expect(initialState.callbackCount).toBe(0);
    });
  });
});