/**
 * Test configuration validation
 * Ensures all test data and configurations are valid and consistent
 */

import { validateTestClientData } from './fixtures/clients';
import { ALL_TEST_AGREEMENTS } from './fixtures/agreements';
import { ALL_TEST_USERS } from './fixtures/users';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Comprehensive validation of all test infrastructure
 */
export function validateTestInfrastructure(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    // Validate client fixtures
    console.log('🔍 Validating client fixtures...');
    const clientValidation = validateTestClientData();
    if (!clientValidation.isValid) {
      errors.push(...clientValidation.errors.map(err => `Client validation: ${err}`));
    }

    // Validate agreements
    console.log('🔍 Validating agreement fixtures...');
    for (const agreement of ALL_TEST_AGREEMENTS) {
      if (!agreement.id?.trim()) {
        errors.push(`Agreement missing ID: ${JSON.stringify(agreement)}`);
      }
      if (!agreement.client_id?.trim()) {
        errors.push(`Agreement ${agreement.id} missing client_id`);
      }
      if (!agreement.terms_version?.trim()) {
        errors.push(`Agreement ${agreement.id} missing terms_version`);
      }
      
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (agreement.id && !uuidRegex.test(agreement.id)) {
        errors.push(`Agreement ${agreement.id} has invalid UUID format`);
      }
      if (agreement.client_id && !uuidRegex.test(agreement.client_id)) {
        errors.push(`Agreement ${agreement.id} has invalid client_id UUID: ${agreement.client_id}`);
      }
      
      // Validate terms version format
      if (agreement.terms_version && !/^[\d\w\.-]+$/.test(agreement.terms_version)) {
        errors.push(`Agreement ${agreement.id} has invalid terms_version format: ${agreement.terms_version}`);
      }
    }

    // Validate users
    console.log('🔍 Validating user fixtures...');
    const seenUserIds = new Set<string>();
    const seenUserEmails = new Set<string>();
    
    for (const user of ALL_TEST_USERS) {
      if (seenUserIds.has(user.id)) {
        errors.push(`Duplicate user ID: ${user.id}`);
      }
      seenUserIds.add(user.id);
      
      if (seenUserEmails.has(user.email.toLowerCase())) {
        errors.push(`Duplicate user email: ${user.email}`);
      }
      seenUserEmails.add(user.email.toLowerCase());
      
      // Validate required fields
      if (!user.id?.trim()) errors.push(`User missing ID: ${JSON.stringify(user)}`);
      if (!user.email?.trim()) errors.push(`User ${user.id} missing email`);
      if (!user.role?.trim()) errors.push(`User ${user.id} missing role`);
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (user.email && !emailRegex.test(user.email)) {
        errors.push(`User ${user.id} has invalid email format: ${user.email}`);
      }
      
      // Validate role
      if (!['operator', 'admin', 'viewer'].includes(user.role)) {
        errors.push(`User ${user.id} has invalid role: ${user.role}`);
      }
      
      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(user.id)) {
        errors.push(`User ${user.id} has invalid UUID format`);
      }
    }

    // Check cross-references
    console.log('🔍 Validating cross-references...');
    for (const agreement of ALL_TEST_AGREEMENTS) {
      const clientExists = clientValidation.isValid && 
        (await import('./fixtures/clients')).ALL_TEST_CLIENTS.some(c => c.id === agreement.client_id);
      
      if (!clientExists) {
        warnings.push(`Agreement ${agreement.id} references non-existent client ${agreement.client_id}`);
      }
    }

    // Validate test environment configuration
    console.log('🔍 Validating test environment...');
    const requiredEnvVars = [
      'NODE_ENV',
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'DATABASE_URL'
    ];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        warnings.push(`Missing environment variable: ${envVar}`);
      }
    }

    if (process.env.NODE_ENV !== 'test') {
      warnings.push(`NODE_ENV is '${process.env.NODE_ENV}', expected 'test'`);
    }

    console.log('✅ Test infrastructure validation completed');
    console.log(`   - Errors: ${errors.length}`);
    console.log(`   - Warnings: ${warnings.length}`);

  } catch (validationError) {
    errors.push(`Validation process failed: ${validationError}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Run validation and exit with appropriate code
 */
export function runValidationCheck(): void {
  console.log('🚀 Running test infrastructure validation...\n');
  
  const result = validateTestInfrastructure();
  
  if (result.warnings.length > 0) {
    console.log('\n⚠️ Warnings:');
    result.warnings.forEach(warning => console.log(`   - ${warning}`));
  }
  
  if (result.errors.length > 0) {
    console.log('\n❌ Errors:');
    result.errors.forEach(error => console.log(`   - ${error}`));
    console.log('\n💡 Please fix these errors before running tests.');
    process.exit(1);
  }
  
  console.log('\n✅ All test infrastructure validation passed!');
  process.exit(0);
}

// Run validation if called directly
if (require.main === module) {
  runValidationCheck();
}