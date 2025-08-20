# Test Runner Instructions

## Prerequisites
- Deno runtime installed
- Environment variables configured

## Running Tests
```bash
cd supabase/functions/generate-pdf
deno task test
```

## Test Coverage
- **PDF Generation Logic**: Validates PDF creation with various data inputs
- **Agreement Service**: Tests database operations with mocked Prisma client
- **Integration Tests**: End-to-end workflow validation
- **Error Handling**: Timeout, retry, and failure scenarios
- **Request Validation**: CORS, authentication, and input validation

## Expected Test Results
All tests should pass, validating:
✅ PDF generation with valid agreement data
✅ Error handling for missing agreements
✅ Authentication validation
✅ Storage upload simulation
✅ Database transaction logic
✅ Timeout and retry mechanisms