# Test Infrastructure Documentation

This directory contains comprehensive test data and mock services for the priority access system. The infrastructure provides predictable, reliable testing without external dependencies.

## 🏗️ Architecture Overview

```
tests/
├── fixtures/           # Test data fixtures
├── mocks/             # Mock service implementations
├── seeds/             # Database seeding scripts
├── __tests__/         # Unit tests for fixtures and mocks
└── README.md          # This documentation
```

## 📊 Test Fixtures

### Client Fixtures (`fixtures/clients.ts`)

Provides comprehensive test client data covering all scenarios:

- **Pending Clients** (3): Clients awaiting activation with valid tokens
- **Activated Clients** (2): Clients who have completed activation
- **Edge Case Clients** (4): Special cases for boundary testing

```typescript
import { ALL_TEST_CLIENTS, getTestClientById } from 'tests/fixtures';

// Get all test clients
const clients = ALL_TEST_CLIENTS;

// Find specific client
const client = getTestClientById('10000000-0000-4000-8000-000000000001');

// Get clients with active tokens
const activeTokenClients = getClientsWithActiveTokens();
```

### Agreement Fixtures (`fixtures/agreements.ts`)

Test agreement data with various states and scenarios:

- **Completed Agreements**: Successfully signed with PDFs
- **Version Testing**: Different terms versions (1.0, 1.1, 2.0-beta)
- **Edge Cases**: Missing PDFs, special characters, IPv6 addresses

```typescript
import { ALL_TEST_AGREEMENTS, getTestAgreementsByClientId } from 'tests/fixtures';

// Get agreements for a client
const agreements = getTestAgreementsByClientId('20000000-0000-4000-8000-000000000001');

// Find agreements without PDFs
const missingPDFs = getTestAgreementsWithoutPDF();
```

### User Fixtures (`fixtures/users.ts`)

Test user data with different roles and permissions:

- **Operators**: Standard operators with client management permissions
- **Admins**: Super users with system configuration access
- **Viewers**: Read-only users for auditing

```typescript
import { ALL_TEST_USERS, TEST_AUTH_SESSIONS } from 'tests/fixtures';

// Get users by role
const admins = ALL_TEST_USERS.filter(user => user.role === 'admin');

// Get test auth sessions
const adminSession = TEST_AUTH_SESSIONS[2]; // Admin session
```

## 🔧 Mock Services

### PDF Generation Service (`mocks/pdf-service.ts`)

Simulates PDF generation with predictable outcomes:

```typescript
import { mockPDFService, configurePDFServiceForTesting } from 'tests/mocks';

// Configure for different scenarios
configurePDFServiceForTesting('success'); // All PDFs generate successfully
configurePDFServiceForTesting('errors');  // Simulate generation failures
configurePDFServiceForTesting('slow');    // Simulate slow generation

// Generate PDF
const result = await mockPDFService.generatePDF({
  clientName: 'Test Company',
  agreementId: 'test-agreement-123',
  termsVersion: '1.0',
});
```

### Storage Service (`mocks/storage-service.ts`)

Simulates Supabase storage operations:

```typescript
import { mockStorageService, configureStorageServiceForTesting } from 'tests/mocks';

// Configure for testing
configureStorageServiceForTesting('success');

// Upload file
const uploadResult = await mockStorageService.upload({
  bucket: 'logos',
  path: 'company-logo.png',
  file: logoData,
  options: { contentType: 'image/png' },
});

// Download file
const downloadResult = await mockStorageService.download('logos', 'company-logo.png');
```

### Authentication Service (`mocks/auth-service.ts`)

Simulates authentication flows and session management:

```typescript
import { mockAuthService, AUTH_TEST_HELPERS } from 'tests/mocks';

// Sign in as specific user type
await AUTH_TEST_HELPERS.signInAsUser('main_operator');

// Check permissions
const canCreateClients = AUTH_TEST_HELPERS.hasPermission('clients:create');

// OAuth sign in
const result = await mockAuthService.signInWithOAuth('google');
```

### Network Simulator (`mocks/network-simulator.ts`)

Simulates various network conditions:

```typescript
import { networkSimulator, configureNetworkForTesting } from 'tests/mocks';

// Configure network conditions
configureNetworkForTesting('SLOW_CONNECTION');
configureNetworkForTesting('OFFLINE_MODE');

// Simulate request with current conditions
const result = await networkSimulator.simulateRequest(1024, 2048);
```

## 🌱 Database Seeding

### Core Seeding (`seeds/test-seed.ts`)

Populate test database with fixture data:

```typescript
import { seedTestDatabase, seedFullDataset } from 'tests/seeds';

// Seed with all test data
const result = await seedFullDataset(prisma, { verbose: true });

// Seed specific data types
const result = await seedTestDatabase(prisma, {
  includeClients: true,
  includeAgreements: true,
  clientFilter: (client) => client.status === 'pending',
});
```

### Cleanup Scripts (`seeds/cleanup.ts`)

Reset database to clean state:

```typescript
import { cleanupTestDatabase, safeCleanup } from 'tests/seeds';

// Safe cleanup - only removes test data
await safeCleanup(prisma);

// Full cleanup with statistics
const stats = await getCleanupStatistics(prisma);
console.log('Will clean:', stats);
```

### Scenario Setup (`seeds/scenarios/`)

Pre-configured database scenarios:

```typescript
import { 
  setupEmptyDatabase, 
  setupPopulatedDatabase, 
  setupErrorConditions 
} from 'tests/seeds';

// Set up different scenarios
await setupEmptyDatabase(prisma);           // No data
await setupPopulatedDatabase(prisma);       // Full dataset
await setupErrorConditions(prisma, ['expired_tokens']); // Error conditions
```

## 🧪 Usage Patterns

### Jest Test Setup

```typescript
import { setupAllMockServices } from 'tests/mocks';
import { ALL_TEST_CLIENTS } from 'tests/fixtures';

describe('My Component', () => {
  setupAllMockServices();

  test('should work with test data', async () => {
    const testClient = ALL_TEST_CLIENTS[0];
    // Use test client in component testing
  });
});
```

### Integration Testing

```typescript
import { 
  setupDatabaseScenario, 
  MOCK_TEST_UTILS,
  configureAllServicesForTesting 
} from 'tests/mocks';

describe('Integration Tests', () => {
  beforeEach(async () => {
    await setupDatabaseScenario(prisma, 'populated');
    configureAllServicesForTesting('success');
  });

  test('complete workflow', async () => {
    // Test uses populated database and successful mock services
    const results = await MOCK_TEST_UTILS.runUnderAllScenarios(testFn);
  });
});
```

### Performance Testing

```typescript
import { NETWORK_TEST_HELPERS } from 'tests/mocks';

test('performance under different conditions', async () => {
  const results = await NETWORK_TEST_HELPERS.testUnderConditions(
    () => performOperation(),
    ['wifi', 'slow-3g', 'unstable']
  );
  
  // Analyze performance across conditions
});
```

## 📋 Test Scenarios

### Happy Path Testing

```typescript
import { INTEGRATION_TEST_SCENARIOS } from 'tests/mocks';

// Configure all services for success
INTEGRATION_TEST_SCENARIOS.HAPPY_PATH.setup();

// Run tests - all operations should succeed
```

### Error Condition Testing

```typescript
// Test with service errors
INTEGRATION_TEST_SCENARIOS.SERVICE_ERRORS.setup();

// Test with network issues
INTEGRATION_TEST_SCENARIOS.NETWORK_ISSUES.setup();
```

### Boundary Testing

```typescript
import { EDGE_CASE_CLIENTS, EDGE_CASE_AGREEMENTS } from 'tests/fixtures';

// Test with edge case data
const longNameClient = EDGE_CASE_CLIENTS.find(c => c.company_name.length > 50);
const expiredTokenClient = EDGE_CASE_CLIENTS.find(c => c.token_expires_at < new Date());
```

## 🔍 Validation and Debugging

### Service State Inspection

```typescript
import { MOCK_TEST_UTILS } from 'tests/mocks';

// Get current state of all services
const stats = MOCK_TEST_UTILS.getAllServiceStats();
console.log('Current state:', stats);

// Verify clean state
const isClean = MOCK_TEST_UTILS.verifyCleanState();
```

### Database Validation

```typescript
import { TEST_DATABASE_UTILS } from 'tests/seeds';

// Get comprehensive database statistics
const stats = await TEST_DATABASE_UTILS.getDatabaseStatistics(prisma);

// Validate database integrity
const validation = await TEST_DATABASE_UTILS.validateDatabaseIntegrity(prisma);
```

## 🚀 Command Line Tools

### Seeding Commands

```bash
# Run different seeding scenarios
node tests/seeds/test-seed.ts full --verbose
node tests/seeds/test-seed.ts minimal
node tests/seeds/test-seed.ts pending

# Clean database
node tests/seeds/cleanup.ts safe --verbose
node tests/seeds/cleanup.ts clients
```

### Scenario Setup

```bash
# Set up specific database scenarios
node tests/seeds/scenarios/empty-database.ts --verify
node tests/seeds/scenarios/populated-database.ts full_dataset --verbose
node tests/seeds/scenarios/error-conditions.ts COMPREHENSIVE_ERRORS
```

## 📈 Coverage and Quality

The test infrastructure provides:

- **Comprehensive Data**: 9 clients, 7 agreements, 4 users covering all scenarios
- **Predictable Mocks**: Deterministic responses with configurable behaviors
- **Error Simulation**: Controlled error conditions for robust testing
- **Network Conditions**: Realistic network simulation (offline, slow, fast)
- **Database Scenarios**: Pre-configured states (empty, populated, error conditions)
- **Performance Testing**: Tools for measuring under different conditions

## 🔒 Security Considerations

- All test data is clearly marked as test data (*.test.com domains)
- No production credentials or sensitive data
- Mock services never expose real API keys
- Test IDs follow predictable patterns for easy identification

## 🎯 Best Practices

1. **Always use setupAllMockServices()** in test files
2. **Reset state** between tests with appropriate cleanup
3. **Use specific scenarios** rather than random data
4. **Test error conditions** alongside happy paths
5. **Verify clean state** after test completion
6. **Use fixtures** instead of generating test data in tests
7. **Configure mock services** for specific test needs

## 📚 Examples

See `tests/__tests__/` for comprehensive examples of:

- Fixture validation and utility testing
- Mock service configuration and behavior
- Integration testing across services
- Performance testing under different conditions
- Error handling and edge case testing

This test infrastructure enables reliable, fast, and comprehensive testing of the priority access system without external dependencies.