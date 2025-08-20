/**
 * Unit tests for agreement fixtures
 * Tests fixture data integrity, utility functions, and data relationships
 */

import {
  ALL_TEST_AGREEMENTS,
  COMPLETED_AGREEMENTS,
  DIFFERENT_VERSIONS_AGREEMENTS,
  EDGE_CASE_AGREEMENTS,
  INVALID_AGREEMENTS,
  AGREEMENTS_BY_CLIENT,
  AGREEMENTS_BY_VERSION,
  SIGNATURE_TEST_DATA,
  getTestAgreementById,
  getTestAgreementsByClientId,
  getLatestTestAgreementForClient,
  getTestAgreementsByVersion,
  getTestAgreementsWithoutPDF,
  getTestAgreementsSignedBetween,
} from '../../fixtures/agreements';

import { ACTIVATED_CLIENTS, PENDING_CLIENTS } from '../../fixtures/clients';

describe('Agreement Fixtures', () => {
  describe('Test Data Integrity', () => {
    test('should have unique agreement IDs', () => {
      const ids = ALL_TEST_AGREEMENTS.map(agreement => agreement.id);
      const uniqueIds = [...new Set(ids)];
      
      expect(uniqueIds.length).toBe(ids.length);
    });

    test('should have valid UUID format for agreement IDs', () => {
      const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      
      ALL_TEST_AGREEMENTS.forEach(agreement => {
        expect(agreement.id).toMatch(uuidPattern);
      });
    });

    test('should reference valid client IDs', () => {
      const validClientIds = [...ACTIVATED_CLIENTS, ...PENDING_CLIENTS].map(client => client.id);
      
      ALL_TEST_AGREEMENTS.forEach(agreement => {
        expect(validClientIds).toContain(agreement.client_id);
      });
    });

    test('should have valid terms versions', () => {
      ALL_TEST_AGREEMENTS.forEach(agreement => {
        expect(agreement.terms_version).toBeTruthy();
        expect(typeof agreement.terms_version).toBe('string');
        expect(agreement.terms_version.length).toBeGreaterThan(0);
        expect(agreement.terms_version).toMatch(/^\d+\.?\d*(-[a-zA-Z]+)?$/); // e.g., "1.0", "2.0-beta"
      });
    });

    test('should have valid signature hashes', () => {
      ALL_TEST_AGREEMENTS.forEach(agreement => {
        expect(agreement.signature_hash).toBeTruthy();
        expect(typeof agreement.signature_hash).toBe('string');
        expect(agreement.signature_hash.length).toBeGreaterThan(0);
        // Hash should be hexadecimal
        expect(agreement.signature_hash).toMatch(/^[a-f0-9]+$/i);
      });
    });

    test('should have valid signer IPs', () => {
      const ipv4Pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      const ipv6Pattern = /^(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$/i;
      
      ALL_TEST_AGREEMENTS.forEach(agreement => {
        expect(agreement.signer_ip).toBeTruthy();
        const isValidIP = ipv4Pattern.test(agreement.signer_ip) || ipv6Pattern.test(agreement.signer_ip);
        expect(isValidIP).toBe(true);
      });
    });

    test('should have valid PDF URLs where present', () => {
      ALL_TEST_AGREEMENTS.forEach(agreement => {
        if (agreement.pdf_url) {
          expect(agreement.pdf_url.startsWith('https://')).toBe(true);
          expect(agreement.pdf_url).toContain('test-storage.supabase.co');
          expect(agreement.pdf_url.endsWith('.pdf')).toBe(true);
        }
      });
    });
  });

  describe('Data Collections', () => {
    test('should have completed agreements with PDFs', () => {
      expect(COMPLETED_AGREEMENTS.length).toBeGreaterThan(0);
      
      COMPLETED_AGREEMENTS.forEach(agreement => {
        expect(agreement.pdf_url).toBeTruthy();
        expect(agreement.pdf_url!.endsWith('.pdf')).toBe(true);
        // Should be for activated clients only
        const activatedClientIds = ACTIVATED_CLIENTS.map(client => client.id);
        expect(activatedClientIds).toContain(agreement.client_id);
      });
    });

    test('should have agreements with different versions', () => {
      expect(DIFFERENT_VERSIONS_AGREEMENTS.length).toBeGreaterThan(0);
      
      const versions = DIFFERENT_VERSIONS_AGREEMENTS.map(agreement => agreement.terms_version);
      const uniqueVersions = [...new Set(versions)];
      expect(uniqueVersions.length).toBeGreaterThan(1);
      
      // Should include various version formats
      expect(versions.some(v => v.includes('beta'))).toBe(true);
      expect(versions.some(v => /^\d+\.\d+$/.test(v))).toBe(true);
    });

    test('should have edge case agreements', () => {
      expect(EDGE_CASE_AGREEMENTS.length).toBeGreaterThan(0);
      
      // Should include agreement without PDF
      const withoutPDF = EDGE_CASE_AGREEMENTS.find(agreement => !agreement.pdf_url);
      expect(withoutPDF).toBeDefined();
      
      // Should include agreement with special characters in signer name
      const withSpecialChars = EDGE_CASE_AGREEMENTS.find(agreement => 
        /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿ]/.test(agreement.signer_name)
      );
      expect(withSpecialChars).toBeDefined();
      
      // Should include agreement with IPv6 address
      const withIPv6 = EDGE_CASE_AGREEMENTS.find(agreement => 
        agreement.signer_ip.includes(':')
      );
      expect(withIPv6).toBeDefined();
    });

    test('should have invalid agreements for error testing', () => {
      expect(INVALID_AGREEMENTS.length).toBeGreaterThan(0);
      
      // Should include agreements for pending clients (invalid business logic)
      const pendingClientIds = PENDING_CLIENTS.map(client => client.id);
      const invalidAgreement = INVALID_AGREEMENTS.find(agreement => 
        pendingClientIds.includes(agreement.client_id)
      );
      expect(invalidAgreement).toBeDefined();
    });

    test('should correctly organize agreements by client', () => {
      Object.entries(AGREEMENTS_BY_CLIENT).forEach(([clientId, agreements]) => {
        agreements.forEach(agreement => {
          expect(agreement.client_id).toBe(clientId);
        });
      });
      
      // Should have at least one client with multiple agreements
      const clientsWithMultipleAgreements = Object.values(AGREEMENTS_BY_CLIENT)
        .filter(agreements => agreements.length > 1);
      expect(clientsWithMultipleAgreements.length).toBeGreaterThan(0);
    });

    test('should correctly organize agreements by version', () => {
      Object.entries(AGREEMENTS_BY_VERSION).forEach(([version, agreements]) => {
        agreements.forEach(agreement => {
          expect(agreement.terms_version).toBe(version);
        });
      });
      
      expect(Object.keys(AGREEMENTS_BY_VERSION).length).toBeGreaterThan(1);
    });

    test('should have complete collection in ALL_TEST_AGREEMENTS', () => {
      const expectedTotal = COMPLETED_AGREEMENTS.length + 
                           DIFFERENT_VERSIONS_AGREEMENTS.length + 
                           EDGE_CASE_AGREEMENTS.length + 
                           INVALID_AGREEMENTS.length;
      expect(ALL_TEST_AGREEMENTS.length).toBe(expectedTotal);
    });
  });

  describe('Utility Functions', () => {
    describe('getTestAgreementById', () => {
      test('should return agreement for valid ID', () => {
        const firstAgreement = ALL_TEST_AGREEMENTS[0];
        const foundAgreement = getTestAgreementById(firstAgreement.id);
        
        expect(foundAgreement).toEqual(firstAgreement);
      });

      test('should return undefined for invalid ID', () => {
        const foundAgreement = getTestAgreementById('invalid-id');
        expect(foundAgreement).toBeUndefined();
      });
    });

    describe('getTestAgreementsByClientId', () => {
      test('should return agreements for valid client ID', () => {
        const clientId = ACTIVATED_CLIENTS[0].id;
        const agreements = getTestAgreementsByClientId(clientId);
        
        expect(agreements.length).toBeGreaterThan(0);
        agreements.forEach(agreement => {
          expect(agreement.client_id).toBe(clientId);
        });
      });

      test('should return empty array for client with no agreements', () => {
        const agreements = getTestAgreementsByClientId('non-existent-client-id');
        expect(agreements).toEqual([]);
      });
    });

    describe('getLatestTestAgreementForClient', () => {
      test('should return latest agreement for client with multiple agreements', () => {
        const clientId = ACTIVATED_CLIENTS[0].id; // This client should have multiple agreements
        const latest = getLatestTestAgreementForClient(clientId);
        const allAgreements = getTestAgreementsByClientId(clientId);
        
        if (allAgreements.length > 0) {
          expect(latest).toBeDefined();
          
          // Should be the one with the latest signed_at date
          const latestDate = Math.max(...allAgreements.map(a => a.signed_at.getTime()));
          expect(latest!.signed_at.getTime()).toBe(latestDate);
        }
      });

      test('should return undefined for client with no agreements', () => {
        const latest = getLatestTestAgreementForClient('non-existent-client-id');
        expect(latest).toBeUndefined();
      });
    });

    describe('getTestAgreementsByVersion', () => {
      test('should return agreements for valid version', () => {
        const version = '1.0';
        const agreements = getTestAgreementsByVersion(version);
        
        expect(agreements.length).toBeGreaterThan(0);
        agreements.forEach(agreement => {
          expect(agreement.terms_version).toBe(version);
        });
      });

      test('should return empty array for non-existent version', () => {
        const agreements = getTestAgreementsByVersion('99.99');
        expect(agreements).toEqual([]);
      });
    });

    describe('getTestAgreementsWithoutPDF', () => {
      test('should return agreements without PDF URLs', () => {
        const agreementsWithoutPDF = getTestAgreementsWithoutPDF();
        
        expect(agreementsWithoutPDF.length).toBeGreaterThan(0);
        agreementsWithoutPDF.forEach(agreement => {
          expect(agreement.pdf_url).toBeNull();
        });
      });
    });

    describe('getTestAgreementsSignedBetween', () => {
      test('should return agreements signed within date range', () => {
        const startDate = new Date('2024-12-01');
        const endDate = new Date('2025-02-01');
        
        const agreementsInRange = getTestAgreementsSignedBetween(startDate, endDate);
        
        agreementsInRange.forEach(agreement => {
          expect(agreement.signed_at.getTime()).toBeGreaterThanOrEqual(startDate.getTime());
          expect(agreement.signed_at.getTime()).toBeLessThanOrEqual(endDate.getTime());
        });
      });

      test('should return empty array for date range with no agreements', () => {
        const startDate = new Date('2020-01-01');
        const endDate = new Date('2020-12-31');
        
        const agreementsInRange = getTestAgreementsSignedBetween(startDate, endDate);
        expect(agreementsInRange).toEqual([]);
      });
    });
  });

  describe('Signature Test Data', () => {
    test('should have valid signature test data', () => {
      expect(SIGNATURE_TEST_DATA.VALID_SIGNATURES.length).toBeGreaterThan(0);
      expect(SIGNATURE_TEST_DATA.INVALID_SIGNATURES.length).toBeGreaterThan(0);
      
      SIGNATURE_TEST_DATA.VALID_SIGNATURES.forEach(sig => {
        expect(sig.agreementId).toBeTruthy();
        expect(sig.signerName).toBeTruthy();
        expect(sig.signedAt).toBeInstanceOf(Date);
        expect(sig.hash).toBeTruthy();
        expect(sig.hash).toMatch(/^[a-f0-9]+$/i);
      });
      
      SIGNATURE_TEST_DATA.INVALID_SIGNATURES.forEach(sig => {
        expect(sig.agreementId).toBeTruthy();
        expect(sig.signerName).toBeTruthy();
        expect(sig.signedAt).toBeInstanceOf(Date);
        expect(sig.hash).toBeTruthy();
      });
    });

    test('should have signatures matching actual agreements', () => {
      SIGNATURE_TEST_DATA.VALID_SIGNATURES.forEach(sig => {
        const agreement = getTestAgreementById(sig.agreementId);
        expect(agreement).toBeDefined();
        expect(agreement!.signer_name).toBe(sig.signerName);
        expect(agreement!.signed_at.getTime()).toBe(sig.signedAt.getTime());
        expect(agreement!.signature_hash).toBe(sig.hash);
      });
    });
  });

  describe('Data Consistency', () => {
    test('should have consistent timestamps', () => {
      ALL_TEST_AGREEMENTS.forEach(agreement => {
        expect(agreement.signed_at).toBeInstanceOf(Date);
        expect(agreement.created_at).toBeInstanceOf(Date);
        expect(agreement.created_at.getTime()).toBeGreaterThanOrEqual(agreement.signed_at.getTime());
      });
    });

    test('should have reasonable field lengths', () => {
      ALL_TEST_AGREEMENTS.forEach(agreement => {
        expect(agreement.signer_name.length).toBeGreaterThan(0);
        expect(agreement.signer_name.length).toBeLessThan(200);
        expect(agreement.terms_version.length).toBeGreaterThan(0);
        expect(agreement.terms_version.length).toBeLessThan(50);
        expect(agreement.signature_hash.length).toBeGreaterThan(0);
        expect(agreement.signature_hash.length).toBeLessThan(200);
        expect(agreement.signer_ip.length).toBeGreaterThan(6); // Minimum IPv4: "1.1.1.1"
        expect(agreement.signer_ip.length).toBeLessThan(50);
        
        if (agreement.pdf_url) {
          expect(agreement.pdf_url.length).toBeLessThan(500);
        }
      });
    });
  });

  describe('Test Scenarios Coverage', () => {
    test('should cover different terms versions', () => {
      const versions = [...new Set(ALL_TEST_AGREEMENTS.map(agreement => agreement.terms_version))];
      expect(versions.length).toBeGreaterThan(1);
      
      // Should include standard versions and beta versions
      expect(versions.some(v => /^\d+\.\d+$/.test(v))).toBe(true);
      expect(versions.some(v => v.includes('beta'))).toBe(true);
    });

    test('should cover agreements with and without PDFs', () => {
      const withPDF = ALL_TEST_AGREEMENTS.filter(agreement => agreement.pdf_url !== null);
      const withoutPDF = ALL_TEST_AGREEMENTS.filter(agreement => agreement.pdf_url === null);
      
      expect(withPDF.length).toBeGreaterThan(0);
      expect(withoutPDF.length).toBeGreaterThan(0);
    });

    test('should cover different IP address formats', () => {
      const ipv4Agreements = ALL_TEST_AGREEMENTS.filter(agreement => 
        /^\d+\.\d+\.\d+\.\d+$/.test(agreement.signer_ip)
      );
      const ipv6Agreements = ALL_TEST_AGREEMENTS.filter(agreement => 
        agreement.signer_ip.includes(':')
      );
      
      expect(ipv4Agreements.length).toBeGreaterThan(0);
      expect(ipv6Agreements.length).toBeGreaterThan(0);
    });

    test('should include agreements spanning different time periods', () => {
      const signedDates = ALL_TEST_AGREEMENTS.map(agreement => agreement.signed_at.getTime());
      const minDate = Math.min(...signedDates);
      const maxDate = Math.max(...signedDates);
      
      // Should span at least several days
      const daySpan = (maxDate - minDate) / (1000 * 60 * 60 * 24);
      expect(daySpan).toBeGreaterThan(1);
    });
  });
});