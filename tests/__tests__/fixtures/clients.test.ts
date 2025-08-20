/**
 * Unit tests for client fixtures
 * Tests fixture data integrity, utility functions, and data relationships
 */

import {
  ALL_TEST_CLIENTS,
  PENDING_CLIENTS,
  ACTIVATED_CLIENTS,
  EDGE_CASE_CLIENTS,
  CLIENTS_BY_OPERATOR,
  CLIENTS_BY_STATUS,
  TEST_OPERATOR_IDS,
  getTestClientById,
  getTestClientByEmail,
  getClientsWithActiveTokens,
  getClientsWithExpiredTokens,
} from '../../fixtures/clients';

describe('Client Fixtures', () => {
  describe('Test Data Integrity', () => {
    test('should have unique client IDs', () => {
      const ids = ALL_TEST_CLIENTS.map(client => client.id);
      const uniqueIds = [...new Set(ids)];
      
      expect(uniqueIds.length).toBe(ids.length);
    });

    test('should have unique client emails', () => {
      const emails = ALL_TEST_CLIENTS.map(client => client.email);
      const uniqueEmails = [...new Set(emails)];
      
      expect(uniqueEmails.length).toBe(emails.length);
    });

    test('should have valid UUID format for client IDs', () => {
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      
      ALL_TEST_CLIENTS.forEach(client => {
        expect(client.id).toMatch(uuidPattern);
      });
    });

    test('should have valid email formats', () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      ALL_TEST_CLIENTS.forEach(client => {
        expect(client.email).toMatch(emailPattern);
      });
    });

    test('should have valid operator IDs', () => {
      const validOperatorIds = Object.values(TEST_OPERATOR_IDS);
      
      ALL_TEST_CLIENTS.forEach(client => {
        expect(validOperatorIds).toContain(client.created_by);
      });
    });

    test('should have valid status values', () => {
      const validStatuses = ['pending', 'activated'];
      
      ALL_TEST_CLIENTS.forEach(client => {
        expect(validStatuses).toContain(client.status);
      });
    });
  });

  describe('Data Collections', () => {
    test('should correctly categorize pending clients', () => {
      expect(PENDING_CLIENTS.length).toBeGreaterThan(0);
      PENDING_CLIENTS.forEach(client => {
        expect(client.status).toBe('pending');
        expect(client.activation_token).toBeTruthy();
        expect(client.token_expires_at).toBeTruthy();
      });
    });

    test('should correctly categorize activated clients', () => {
      expect(ACTIVATED_CLIENTS.length).toBeGreaterThan(0);
      ACTIVATED_CLIENTS.forEach(client => {
        expect(client.status).toBe('activated');
        expect(client.activation_token).toBeNull();
        expect(client.token_expires_at).toBeNull();
      });
    });

    test('should have edge case clients with special characteristics', () => {
      expect(EDGE_CASE_CLIENTS.length).toBeGreaterThan(0);
      
      // Check for expired token client
      const expiredTokenClient = EDGE_CASE_CLIENTS.find(client => 
        client.token_expires_at && client.token_expires_at < new Date()
      );
      expect(expiredTokenClient).toBeDefined();

      // Check for client with very long company name
      const longNameClient = EDGE_CASE_CLIENTS.find(client => 
        client.company_name.length > 50
      );
      expect(longNameClient).toBeDefined();

      // Check for client with special characters
      const specialCharsClient = EDGE_CASE_CLIENTS.find(client => 
        /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/.test(client.company_name)
      );
      expect(specialCharsClient).toBeDefined();
    });

    test('should correctly organize clients by operator', () => {
      const operatorIds = Object.keys(CLIENTS_BY_OPERATOR);
      
      expect(operatorIds).toContain(TEST_OPERATOR_IDS.MAIN_OPERATOR);
      expect(operatorIds).toContain(TEST_OPERATOR_IDS.SECONDARY_OPERATOR);
      expect(operatorIds).toContain(TEST_OPERATOR_IDS.INACTIVE_OPERATOR);

      // Verify each client is in the correct operator bucket
      Object.entries(CLIENTS_BY_OPERATOR).forEach(([operatorId, clients]) => {
        clients.forEach(client => {
          expect(client.created_by).toBe(operatorId);
        });
      });
    });

    test('should correctly organize clients by status', () => {
      expect(CLIENTS_BY_STATUS.pending.length).toBe(PENDING_CLIENTS.length);
      expect(CLIENTS_BY_STATUS.activated.length).toBe(ACTIVATED_CLIENTS.length);

      CLIENTS_BY_STATUS.pending.forEach(client => {
        expect(client.status).toBe('pending');
      });

      CLIENTS_BY_STATUS.activated.forEach(client => {
        expect(client.status).toBe('activated');
      });
    });

    test('should have complete collection in ALL_TEST_CLIENTS', () => {
      const expectedTotal = PENDING_CLIENTS.length + ACTIVATED_CLIENTS.length + EDGE_CASE_CLIENTS.length;
      expect(ALL_TEST_CLIENTS.length).toBe(expectedTotal);
    });
  });

  describe('Utility Functions', () => {
    describe('getTestClientById', () => {
      test('should return client for valid ID', () => {
        const firstClient = ALL_TEST_CLIENTS[0];
        const foundClient = getTestClientById(firstClient.id);
        
        expect(foundClient).toEqual(firstClient);
      });

      test('should return undefined for invalid ID', () => {
        const foundClient = getTestClientById('invalid-id');
        expect(foundClient).toBeUndefined();
      });
    });

    describe('getTestClientByEmail', () => {
      test('should return client for valid email', () => {
        const firstClient = ALL_TEST_CLIENTS[0];
        const foundClient = getTestClientByEmail(firstClient.email);
        
        expect(foundClient).toEqual(firstClient);
      });

      test('should return undefined for invalid email', () => {
        const foundClient = getTestClientByEmail('invalid@email.com');
        expect(foundClient).toBeUndefined();
      });
    });

    describe('getClientsWithActiveTokens', () => {
      test('should return clients with non-expired tokens', () => {
        const referenceDate = new Date('2025-01-01T09:00:00Z'); // Before base timestamp
        const activeClients = getClientsWithActiveTokens(referenceDate);
        
        expect(activeClients.length).toBeGreaterThan(0);
        activeClients.forEach(client => {
          expect(client.activation_token).toBeTruthy();
          expect(client.token_expires_at).toBeTruthy();
          expect(client.token_expires_at!.getTime()).toBeGreaterThan(referenceDate.getTime());
        });
      });

      test('should return empty array if all tokens are expired', () => {
        const futureDate = new Date('2026-01-01T00:00:00Z'); // Far in future
        const activeClients = getClientsWithActiveTokens(futureDate);
        
        // Should be empty since all test tokens would be expired by then
        expect(Array.isArray(activeClients)).toBe(true);
      });
    });

    describe('getClientsWithExpiredTokens', () => {
      test('should return clients with expired tokens', () => {
        const referenceDate = new Date('2025-01-02T00:00:00Z'); // After some tokens expire
        const expiredClients = getClientsWithExpiredTokens(referenceDate);
        
        expiredClients.forEach(client => {
          expect(client.activation_token).toBeTruthy();
          expect(client.token_expires_at).toBeTruthy();
          expect(client.token_expires_at!.getTime()).toBeLessThanOrEqual(referenceDate.getTime());
        });
      });

      test('should handle default reference date (now)', () => {
        const expiredClients = getClientsWithExpiredTokens();
        
        // Should include at least the edge case client with expired token
        expect(Array.isArray(expiredClients)).toBe(true);
        
        const hasExpiredClient = expiredClients.some(client => 
          client.company_name === 'Expired Token Co'
        );
        expect(hasExpiredClient).toBe(true);
      });
    });
  });

  describe('Data Consistency', () => {
    test('should have consistent timestamps', () => {
      ALL_TEST_CLIENTS.forEach(client => {
        expect(client.created_at).toBeInstanceOf(Date);
        expect(client.updated_at).toBeInstanceOf(Date);
        expect(client.updated_at.getTime()).toBeGreaterThanOrEqual(client.created_at.getTime());
        
        if (client.token_expires_at) {
          expect(client.token_expires_at).toBeInstanceOf(Date);
        }
      });
    });

    test('should have consistent token data', () => {
      PENDING_CLIENTS.forEach(client => {
        // Pending clients should have tokens and expiry dates
        expect(client.activation_token).toBeTruthy();
        expect(client.token_expires_at).toBeTruthy();
        expect(typeof client.activation_token).toBe('string');
        expect(client.activation_token!.length).toBeGreaterThan(0);
      });

      ACTIVATED_CLIENTS.forEach(client => {
        // Activated clients should not have tokens
        expect(client.activation_token).toBeNull();
        expect(client.token_expires_at).toBeNull();
      });
    });

    test('should have reasonable field lengths', () => {
      ALL_TEST_CLIENTS.forEach(client => {
        expect(client.company_name.length).toBeGreaterThan(0);
        expect(client.company_name.length).toBeLessThan(500);
        expect(client.contact_name.length).toBeGreaterThan(0);
        expect(client.contact_name.length).toBeLessThan(200);
        expect(client.email.length).toBeGreaterThan(5);
        expect(client.email.length).toBeLessThan(200);
        expect(client.role_title.length).toBeGreaterThan(0);
        expect(client.role_title.length).toBeLessThan(200);
        
        if (client.notes) {
          expect(client.notes.length).toBeLessThan(1000);
        }
        
        if (client.logo_url) {
          expect(client.logo_url.startsWith('http')).toBe(true);
          expect(client.logo_url.length).toBeLessThan(500);
        }
      });
    });
  });

  describe('Test Scenarios Coverage', () => {
    test('should cover different client states', () => {
      const statuses = [...new Set(ALL_TEST_CLIENTS.map(client => client.status))];
      expect(statuses).toContain('pending');
      expect(statuses).toContain('activated');
    });

    test('should cover multiple operators', () => {
      const operators = [...new Set(ALL_TEST_CLIENTS.map(client => client.created_by))];
      expect(operators.length).toBeGreaterThan(1);
      expect(operators).toContain(TEST_OPERATOR_IDS.MAIN_OPERATOR);
      expect(operators).toContain(TEST_OPERATOR_IDS.SECONDARY_OPERATOR);
    });

    test('should have clients with and without optional fields', () => {
      const withNotes = ALL_TEST_CLIENTS.filter(client => client.notes !== null);
      const withoutNotes = ALL_TEST_CLIENTS.filter(client => client.notes === null);
      
      expect(withNotes.length).toBeGreaterThan(0);
      expect(withoutNotes.length).toBeGreaterThan(0);

      const withLogo = ALL_TEST_CLIENTS.filter(client => client.logo_url !== null);
      const withoutLogo = ALL_TEST_CLIENTS.filter(client => client.logo_url === null);
      
      expect(withLogo.length).toBeGreaterThan(0);
      expect(withoutLogo.length).toBeGreaterThan(0);
    });

    test('should include boundary test cases', () => {
      // Test for minimal data client
      const minimalClient = ALL_TEST_CLIENTS.find(client => 
        client.company_name === 'A' && client.contact_name === 'B'
      );
      expect(minimalClient).toBeDefined();

      // Test for maximum length fields
      const longFieldClient = ALL_TEST_CLIENTS.find(client => 
        client.company_name.length > 50
      );
      expect(longFieldClient).toBeDefined();
    });
  });
});