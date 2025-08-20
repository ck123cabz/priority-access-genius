/**
 * Test fixtures for Agreement model
 * Provides comprehensive test data for agreement signatures and PDF generation
 */

export interface TestAgreement {
  id: string;
  client_id: string;
  terms_version: string;
  pdf_url: string | null;
  signed_at: Date;
  signer_name: string;
  signer_ip: string;
  signature_hash: string;
  created_at: Date;
}

import { ACTIVATED_CLIENTS, PENDING_CLIENTS } from './clients';

// Base timestamp for consistent test data
const BASE_TIMESTAMP = new Date('2025-01-01T10:00:00Z');

/**
 * Generate a test signature hash for consistent testing
 */
function generateTestSignatureHash(signerName: string, timestamp: Date): string {
  const data = `${signerName}_${timestamp.toISOString()}`;
  // Simple deterministic hash for testing - NOT for production
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(16).padStart(8, '0');
}

/**
 * Test agreements for activated clients
 */
export const COMPLETED_AGREEMENTS: TestAgreement[] = [
  {
    id: '40000000-0000-4000-8000-000000000001',
    client_id: ACTIVATED_CLIENTS[0].id, // Beta Corp
    terms_version: '1.0',
    pdf_url: 'https://test-storage.supabase.co/agreements/beta-corp-agreement-v1.pdf',
    signed_at: new Date(BASE_TIMESTAMP.getTime() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    signer_name: 'Lisa Wang',
    signer_ip: '192.168.1.100',
    signature_hash: generateTestSignatureHash('Lisa Wang', new Date(BASE_TIMESTAMP.getTime() - 6 * 24 * 60 * 60 * 1000)),
    created_at: new Date(BASE_TIMESTAMP.getTime() - 6 * 24 * 60 * 60 * 1000),
  },
  {
    id: '40000000-0000-4000-8000-000000000002',
    client_id: ACTIVATED_CLIENTS[1].id, // Innovation Hub
    terms_version: '1.1',
    pdf_url: 'https://test-storage.supabase.co/agreements/innovation-hub-agreement-v1-1.pdf',
    signed_at: new Date(BASE_TIMESTAMP.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    signer_name: 'David Rodriguez',
    signer_ip: '10.0.0.50',
    signature_hash: generateTestSignatureHash('David Rodriguez', new Date(BASE_TIMESTAMP.getTime() - 2 * 24 * 60 * 60 * 1000)),
    created_at: new Date(BASE_TIMESTAMP.getTime() - 2 * 24 * 60 * 60 * 1000),
  },
];

/**
 * Test agreements with different terms versions for compatibility testing
 */
export const DIFFERENT_VERSIONS_AGREEMENTS: TestAgreement[] = [
  {
    id: '40000000-0000-4000-8000-000000000003',
    client_id: ACTIVATED_CLIENTS[0].id, // Beta Corp - older agreement
    terms_version: '0.9',
    pdf_url: 'https://test-storage.supabase.co/agreements/beta-corp-agreement-v0-9.pdf',
    signed_at: new Date(BASE_TIMESTAMP.getTime() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    signer_name: 'Lisa Wang',
    signer_ip: '192.168.1.100',
    signature_hash: generateTestSignatureHash('Lisa Wang', new Date(BASE_TIMESTAMP.getTime() - 30 * 24 * 60 * 60 * 1000)),
    created_at: new Date(BASE_TIMESTAMP.getTime() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: '40000000-0000-4000-8000-000000000004',
    client_id: ACTIVATED_CLIENTS[1].id, // Innovation Hub - beta version
    terms_version: '2.0-beta',
    pdf_url: 'https://test-storage.supabase.co/agreements/innovation-hub-agreement-v2-beta.pdf',
    signed_at: new Date(BASE_TIMESTAMP.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    signer_name: 'David Rodriguez',
    signer_ip: '10.0.0.50',
    signature_hash: generateTestSignatureHash('David Rodriguez', new Date(BASE_TIMESTAMP.getTime() - 1 * 24 * 60 * 60 * 1000)),
    created_at: new Date(BASE_TIMESTAMP.getTime() - 1 * 24 * 60 * 60 * 1000),
  },
];

/**
 * Edge case test agreements
 */
export const EDGE_CASE_AGREEMENTS: TestAgreement[] = [
  // Agreement with no PDF URL (generation failed scenario)
  {
    id: '50000000-0000-4000-8000-000000000001',
    client_id: ACTIVATED_CLIENTS[0].id, // Beta Corp
    terms_version: '1.0',
    pdf_url: null,
    signed_at: new Date(BASE_TIMESTAMP.getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
    signer_name: 'Lisa Wang',
    signer_ip: '192.168.1.100',
    signature_hash: generateTestSignatureHash('Lisa Wang', new Date(BASE_TIMESTAMP.getTime() - 1 * 60 * 60 * 1000)),
    created_at: new Date(BASE_TIMESTAMP.getTime() - 1 * 60 * 60 * 1000),
  },
  // Agreement with special characters in signer name
  {
    id: '50000000-0000-4000-8000-000000000002',
    client_id: ACTIVATED_CLIENTS[1].id, // Innovation Hub
    terms_version: '1.0',
    pdf_url: 'https://test-storage.supabase.co/agreements/special-chars-agreement.pdf',
    signed_at: BASE_TIMESTAMP,
    signer_name: 'José María Rodríguez-García',
    signer_ip: '203.0.113.42',
    signature_hash: generateTestSignatureHash('José María Rodríguez-García', BASE_TIMESTAMP),
    created_at: BASE_TIMESTAMP,
  },
  // Agreement with IPv6 address
  {
    id: '50000000-0000-4000-8000-000000000003',
    client_id: ACTIVATED_CLIENTS[0].id, // Beta Corp
    terms_version: '1.1',
    pdf_url: 'https://test-storage.supabase.co/agreements/ipv6-agreement.pdf',
    signed_at: new Date(BASE_TIMESTAMP.getTime() - 30 * 60 * 1000), // 30 minutes ago
    signer_name: 'Lisa Wang',
    signer_ip: '2001:db8::1',
    signature_hash: generateTestSignatureHash('Lisa Wang', new Date(BASE_TIMESTAMP.getTime() - 30 * 60 * 1000)),
    created_at: new Date(BASE_TIMESTAMP.getTime() - 30 * 60 * 1000),
  },
  // Agreement with very long signature hash (boundary testing)
  {
    id: '50000000-0000-4000-8000-000000000004',
    client_id: ACTIVATED_CLIENTS[1].id, // Innovation Hub
    terms_version: '1.0',
    pdf_url: 'https://test-storage.supabase.co/agreements/long-hash-agreement.pdf',
    signed_at: new Date(BASE_TIMESTAMP.getTime() - 15 * 60 * 1000), // 15 minutes ago
    signer_name: 'David Rodriguez',
    signer_ip: '172.16.0.1',
    signature_hash: 'abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890', // Long hash
    created_at: new Date(BASE_TIMESTAMP.getTime() - 15 * 60 * 1000),
  },
];

/**
 * Test agreements for pending clients (shouldn't exist in normal flow but useful for testing)
 */
export const INVALID_AGREEMENTS: TestAgreement[] = [
  // Agreement for pending client (invalid state for testing error handling)
  {
    id: '60000000-0000-4000-8000-000000000001',
    client_id: PENDING_CLIENTS[0].id, // Acme Corporation (still pending)
    terms_version: '1.0',
    pdf_url: 'https://test-storage.supabase.co/agreements/invalid-pending-agreement.pdf',
    signed_at: BASE_TIMESTAMP,
    signer_name: 'John Smith',
    signer_ip: '198.51.100.1',
    signature_hash: generateTestSignatureHash('John Smith', BASE_TIMESTAMP),
    created_at: BASE_TIMESTAMP,
  },
];

/**
 * All test agreements combined
 */
export const ALL_TEST_AGREEMENTS: TestAgreement[] = [
  ...COMPLETED_AGREEMENTS,
  ...DIFFERENT_VERSIONS_AGREEMENTS,
  ...EDGE_CASE_AGREEMENTS,
  ...INVALID_AGREEMENTS,
];

/**
 * Test agreements organized by client
 */
export const AGREEMENTS_BY_CLIENT = ALL_TEST_AGREEMENTS.reduce((acc, agreement) => {
  if (!acc[agreement.client_id]) {
    acc[agreement.client_id] = [];
  }
  acc[agreement.client_id].push(agreement);
  return acc;
}, {} as Record<string, TestAgreement[]>);

/**
 * Test agreements organized by terms version
 */
export const AGREEMENTS_BY_VERSION = ALL_TEST_AGREEMENTS.reduce((acc, agreement) => {
  if (!acc[agreement.terms_version]) {
    acc[agreement.terms_version] = [];
  }
  acc[agreement.terms_version].push(agreement);
  return acc;
}, {} as Record<string, TestAgreement[]>);

/**
 * Utility function to get an agreement by ID
 */
export function getTestAgreementById(id: string): TestAgreement | undefined {
  return ALL_TEST_AGREEMENTS.find(agreement => agreement.id === id);
}

/**
 * Utility function to get agreements by client ID
 */
export function getTestAgreementsByClientId(clientId: string): TestAgreement[] {
  return ALL_TEST_AGREEMENTS.filter(agreement => agreement.client_id === clientId);
}

/**
 * Utility function to get the latest agreement for a client
 */
export function getLatestTestAgreementForClient(clientId: string): TestAgreement | undefined {
  const clientAgreements = getTestAgreementsByClientId(clientId);
  return clientAgreements.sort((a, b) => b.signed_at.getTime() - a.signed_at.getTime())[0];
}

/**
 * Utility function to get agreements by terms version
 */
export function getTestAgreementsByVersion(version: string): TestAgreement[] {
  return ALL_TEST_AGREEMENTS.filter(agreement => agreement.terms_version === version);
}

/**
 * Utility function to get agreements with missing PDFs
 */
export function getTestAgreementsWithoutPDF(): TestAgreement[] {
  return ALL_TEST_AGREEMENTS.filter(agreement => !agreement.pdf_url);
}

/**
 * Utility function to get agreements signed within a date range
 */
export function getTestAgreementsSignedBetween(startDate: Date, endDate: Date): TestAgreement[] {
  return ALL_TEST_AGREEMENTS.filter(
    agreement => agreement.signed_at >= startDate && agreement.signed_at <= endDate
  );
}

/**
 * Test data for signature validation
 */
export const SIGNATURE_TEST_DATA = {
  VALID_SIGNATURES: COMPLETED_AGREEMENTS.map(agreement => ({
    agreementId: agreement.id,
    signerName: agreement.signer_name,
    signedAt: agreement.signed_at,
    hash: agreement.signature_hash,
  })),
  INVALID_SIGNATURES: [
    {
      agreementId: 'invalid-agreement-id',
      signerName: 'Invalid Signer',
      signedAt: new Date(),
      hash: 'invalid-hash',
    },
  ],
};