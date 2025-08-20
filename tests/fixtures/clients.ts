/**
 * Test fixtures for Client model
 * Provides comprehensive test data for various client states and scenarios
 */

export interface TestClient {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  role_title: string;
  notes: string | null;
  logo_url: string | null;
  status: 'pending' | 'activated';
  created_by: string;
  activation_token: string | null;
  token_expires_at: Date | null;
  created_at: Date;
  updated_at: Date;
}

// Test operator IDs for RLS testing
export const TEST_OPERATOR_IDS = {
  MAIN_OPERATOR: '00000000-0000-4000-8000-000000000001',
  SECONDARY_OPERATOR: '00000000-0000-4000-8000-000000000002',
  INACTIVE_OPERATOR: '00000000-0000-4000-8000-000000000003',
} as const;

// Base timestamp for consistent test data
const BASE_TIMESTAMP = new Date('2025-01-01T10:00:00Z');

/**
 * Test clients in pending state
 */
export const PENDING_CLIENTS: TestClient[] = [
  {
    id: '10000000-0000-4000-8000-000000000001',
    company_name: 'Acme Corporation',
    contact_name: 'John Smith',
    email: 'john.smith@acme.com',
    role_title: 'CEO',
    notes: 'High priority client - Fortune 500 company',
    logo_url: 'https://test-storage.supabase.co/logos/acme-logo.png',
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: 'token_acme_12345',
    token_expires_at: new Date(BASE_TIMESTAMP.getTime() + 24 * 60 * 60 * 1000), // 24 hours from base
    created_at: BASE_TIMESTAMP,
    updated_at: BASE_TIMESTAMP,
  },
  {
    id: '10000000-0000-4000-8000-000000000002',
    company_name: 'TechStart Inc',
    contact_name: 'Sarah Johnson',
    email: 'sarah@techstart.io',
    role_title: 'CTO',
    notes: null,
    logo_url: null,
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: 'token_techstart_67890',
    token_expires_at: new Date(BASE_TIMESTAMP.getTime() + 12 * 60 * 60 * 1000), // 12 hours from base
    created_at: new Date(BASE_TIMESTAMP.getTime() + 60 * 60 * 1000), // 1 hour after base
    updated_at: new Date(BASE_TIMESTAMP.getTime() + 60 * 60 * 1000),
  },
  {
    id: '10000000-0000-4000-8000-000000000003',
    company_name: 'Global Solutions Ltd',
    contact_name: 'Michael Chen',
    email: 'mchen@globalsolutions.com',
    role_title: 'VP of Engineering',
    notes: 'Interested in enterprise features',
    logo_url: 'https://test-storage.supabase.co/logos/global-solutions.jpg',
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.SECONDARY_OPERATOR,
    activation_token: 'token_global_abcde',
    token_expires_at: new Date(BASE_TIMESTAMP.getTime() + 48 * 60 * 60 * 1000), // 48 hours from base
    created_at: new Date(BASE_TIMESTAMP.getTime() + 2 * 60 * 60 * 1000), // 2 hours after base
    updated_at: new Date(BASE_TIMESTAMP.getTime() + 2 * 60 * 60 * 1000),
  },
];

/**
 * Test clients in activated state
 */
export const ACTIVATED_CLIENTS: TestClient[] = [
  {
    id: '20000000-0000-4000-8000-000000000001',
    company_name: 'Beta Corp',
    contact_name: 'Lisa Wang',
    email: 'lisa@betacorp.com',
    role_title: 'Product Manager',
    notes: 'Early adopter - provides excellent feedback',
    logo_url: 'https://test-storage.supabase.co/logos/beta-corp.png',
    status: 'activated',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: null, // Token cleared after activation
    token_expires_at: null, // Expiry cleared after activation
    created_at: new Date(BASE_TIMESTAMP.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days before base
    updated_at: new Date(BASE_TIMESTAMP.getTime() - 6 * 24 * 60 * 60 * 1000), // Updated 6 days before base
  },
  {
    id: '20000000-0000-4000-8000-000000000002',
    company_name: 'Innovation Hub',
    contact_name: 'David Rodriguez',
    email: 'david@innovationhub.org',
    role_title: 'Technical Director',
    notes: null,
    logo_url: null,
    status: 'activated',
    created_by: TEST_OPERATOR_IDS.SECONDARY_OPERATOR,
    activation_token: null,
    token_expires_at: null,
    created_at: new Date(BASE_TIMESTAMP.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days before base
    updated_at: new Date(BASE_TIMESTAMP.getTime() - 2 * 24 * 60 * 60 * 1000), // Updated 2 days before base
  },
];

/**
 * Edge case test clients
 */
export const EDGE_CASE_CLIENTS: TestClient[] = [
  // Client with expired token
  {
    id: '30000000-0000-4000-8000-000000000001',
    company_name: 'Expired Token Co',
    contact_name: 'Jane Doe',
    email: 'jane@expiredtoken.com',
    role_title: 'Operations Manager',
    notes: 'Token expired - should not be able to activate',
    logo_url: null,
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: 'token_expired_xyz',
    token_expires_at: new Date(BASE_TIMESTAMP.getTime() - 24 * 60 * 60 * 1000), // 24 hours ago (expired)
    created_at: new Date(BASE_TIMESTAMP.getTime() - 48 * 60 * 60 * 1000), // 48 hours ago
    updated_at: new Date(BASE_TIMESTAMP.getTime() - 48 * 60 * 60 * 1000),
  },
  // Client with very long company name (boundary testing)
  {
    id: '30000000-0000-4000-8000-000000000002',
    company_name: 'Very Long Company Name That Tests Database Field Length Limits And Application Display Handling',
    contact_name: 'Robert Anderson-Smith-Johnson',
    email: 'robert.anderson-smith-johnson@verylongcompanyname.example.com',
    role_title: 'Senior Vice President of Technology and Innovation',
    notes: 'Boundary testing for long field values and display truncation handling',
    logo_url: 'https://test-storage.supabase.co/logos/very-long-filename-that-tests-url-handling.png',
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: 'token_verylongcompany_boundary_test_12345678901234567890',
    token_expires_at: new Date(BASE_TIMESTAMP.getTime() + 24 * 60 * 60 * 1000),
    created_at: BASE_TIMESTAMP,
    updated_at: BASE_TIMESTAMP,
  },
  // Client with special characters in data
  {
    id: '30000000-0000-4000-8000-000000000003',
    company_name: 'Spëçiàl Çhäråctërs & Symbols Inc. (™)',
    contact_name: 'José María Rodríguez-García',
    email: 'jose.maria@specialchars.co.uk',
    role_title: 'Développeur Principal / Lead Developer',
    notes: 'Testing special characters, unicode, and internationalization: 你好世界 🌍',
    logo_url: null,
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.SECONDARY_OPERATOR,
    activation_token: 'token_spëçiàl_tëst',
    token_expires_at: new Date(BASE_TIMESTAMP.getTime() + 24 * 60 * 60 * 1000),
    created_at: BASE_TIMESTAMP,
    updated_at: BASE_TIMESTAMP,
  },
  // Client with minimal valid data
  {
    id: '30000000-0000-4000-8000-000000000004',
    company_name: 'A',
    contact_name: 'B',
    email: 'c@d.co',
    role_title: 'E',
    notes: null,
    logo_url: null,
    status: 'pending',
    created_by: TEST_OPERATOR_IDS.MAIN_OPERATOR,
    activation_token: 'x',
    token_expires_at: new Date(BASE_TIMESTAMP.getTime() + 24 * 60 * 60 * 1000),
    created_at: BASE_TIMESTAMP,
    updated_at: BASE_TIMESTAMP,
  },
];

/**
 * All test clients combined
 */
export const ALL_TEST_CLIENTS: TestClient[] = [
  ...PENDING_CLIENTS,
  ...ACTIVATED_CLIENTS,
  ...EDGE_CASE_CLIENTS,
];

/**
 * Test clients organized by operator for RLS testing
 */
export const CLIENTS_BY_OPERATOR = {
  [TEST_OPERATOR_IDS.MAIN_OPERATOR]: ALL_TEST_CLIENTS.filter(
    client => client.created_by === TEST_OPERATOR_IDS.MAIN_OPERATOR
  ),
  [TEST_OPERATOR_IDS.SECONDARY_OPERATOR]: ALL_TEST_CLIENTS.filter(
    client => client.created_by === TEST_OPERATOR_IDS.SECONDARY_OPERATOR
  ),
  [TEST_OPERATOR_IDS.INACTIVE_OPERATOR]: [], // No clients for this operator
};

/**
 * Test clients organized by status
 */
export const CLIENTS_BY_STATUS = {
  pending: ALL_TEST_CLIENTS.filter(client => client.status === 'pending'),
  activated: ALL_TEST_CLIENTS.filter(client => client.status === 'activated'),
};

/**
 * Utility function to get a client by ID with validation
 */
export function getTestClientById(id: string): TestClient | undefined {
  if (!id?.trim()) {
    console.warn('getTestClientById: ID parameter is empty or undefined');
    return undefined;
  }
  
  // Validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) {
    console.warn(`getTestClientById: Invalid UUID format: ${id}`);
    return undefined;
  }
  
  return ALL_TEST_CLIENTS.find(client => client.id === id);
}

/**
 * Utility function to get clients by email with validation
 */
export function getTestClientByEmail(email: string): TestClient | undefined {
  if (!email?.trim()) {
    console.warn('getTestClientByEmail: Email parameter is empty or undefined');
    return undefined;
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.warn(`getTestClientByEmail: Invalid email format: ${email}`);
    return undefined;
  }
  
  return ALL_TEST_CLIENTS.find(client => client.email.toLowerCase() === email.toLowerCase());
}

/**
 * Utility function to get clients with active tokens
 */
export function getClientsWithActiveTokens(referenceDate: Date = new Date()): TestClient[] {
  return ALL_TEST_CLIENTS.filter(
    client => client.activation_token && 
    client.token_expires_at && 
    client.token_expires_at > referenceDate
  );
}

/**
 * Utility function to get clients with expired tokens
 */
export function getClientsWithExpiredTokens(referenceDate: Date = new Date()): TestClient[] {
  return ALL_TEST_CLIENTS.filter(
    client => client.activation_token && 
    client.token_expires_at && 
    client.token_expires_at <= referenceDate
  );
}

/**
 * Validate test client data integrity
 */
export function validateTestClientData(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const seenIds = new Set<string>();
  const seenEmails = new Set<string>();
  
  for (const client of ALL_TEST_CLIENTS) {
    // Check for duplicate IDs
    if (seenIds.has(client.id)) {
      errors.push(`Duplicate client ID: ${client.id}`);
    }
    seenIds.add(client.id);
    
    // Check for duplicate emails  
    if (seenEmails.has(client.email.toLowerCase())) {
      errors.push(`Duplicate client email: ${client.email}`);
    }
    seenEmails.add(client.email.toLowerCase());
    
    // Validate required fields
    if (!client.id?.trim()) errors.push(`Client missing ID: ${JSON.stringify(client)}`);
    if (!client.company_name?.trim()) errors.push(`Client ${client.id} missing company_name`);
    if (!client.contact_name?.trim()) errors.push(`Client ${client.id} missing contact_name`);
    if (!client.email?.trim()) errors.push(`Client ${client.id} missing email`);
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (client.email && !emailRegex.test(client.email)) {
      errors.push(`Client ${client.id} has invalid email format: ${client.email}`);
    }
    
    // Validate status
    if (!['pending', 'activated'].includes(client.status)) {
      errors.push(`Client ${client.id} has invalid status: ${client.status}`);
    }
    
    // Validate token consistency
    if (client.activation_token && !client.token_expires_at) {
      errors.push(`Client ${client.id} has token but no expiry date`);
    }
    
    if (!client.activation_token && client.token_expires_at) {
      errors.push(`Client ${client.id} has expiry date but no token`);
    }
    
    // Validate UUID format for IDs
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(client.id)) {
      errors.push(`Client ${client.id} has invalid UUID format`);
    }
    
    if (!uuidRegex.test(client.created_by)) {
      errors.push(`Client ${client.id} has invalid created_by UUID: ${client.created_by}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}