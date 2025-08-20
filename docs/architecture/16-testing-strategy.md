# **16. Testing Strategy**

> Resolves CRITICAL #3 — Concrete testing approach.

## **Unit & Component (Jest + RTL)**

````
pnpm add -D jest @types/jest @testing-library/react @testing-library/jest-dom ts-jest
```jest.config.ts` (Next.js 14 via `next/jest` is also fine):
```typescript
import nextJest from 'next/jest.js';
const createJestConfig = nextJest({ dir: './apps/web' });
export default createJestConfig({
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
});
```tests/setup.ts`:
```typescript
import '@testing-library/jest-dom';
````

## **E2E (Playwright)**

````
pnpm add -D @playwright/test
npx playwright install --with-deps
```playwright.config.ts`:
```typescript
import { defineConfig } from '@playwright/test';
export default defineConfig({
  webServer: { command: 'pnpm --filter web dev', url: 'http://localhost:3000' },
  use: { baseURL: 'http://localhost:3000' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } }
  ]
});
````

**Critical Test Scenarios:**
- **Smoke Flow:** activation link -> sign -> confirm -> download PDF
- **Error Handling:** invalid tokens, network failures, PDF generation timeouts
- **Security:** unauthorized access attempts, XSS prevention
- **Mobile Responsiveness:** full flow on mobile devices
- **Performance:** page load times under 2 seconds

**Mock Data Strategy for Tests:**
- **Test Client Records:** Pre-seeded test database with various client states
- **Mock PDF Service:** Returns predictable test PDFs without external dependencies
- **Simulated Network Conditions:** Test under slow/fast network scenarios
- **Authentication Mocks:** Test users with different permission levels

## **CI Integration**

`.github/workflows/test.yml`

```
name: CI
on: [push, pull_request]
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm test -- --ci
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: pnpm install --frozen-lockfile
      - run: pnpm build --filter web
      - run: npx playwright install --with-deps
      - run: pnpm exec playwright test
```

## **When to Write Tests**

- **Unit/Component:** with each feature PR (red-green-refactor)
    
- **E2E:** at the end of each epic; keep smoke test green at all times
    
