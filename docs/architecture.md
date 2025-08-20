# **Priority Access Confirmation System Fullstack Architecture Document**

## **1. Introduction**

This document outlines the complete fullstack architecture for the Priority Access Confirmation System, including backend systems, frontend implementation, and their integration. It serves as the single source of truth for AI-driven development, ensuring consistency across the entire technology stack.

This unified approach combines what would traditionally be separate backend and frontend architecture documents, streamlining the development process for modern fullstack applications where these concerns are increasingly intertwined.

### **Starter Template or Existing Project**

Based on the PRD, the project specifies a very modern and precise technology stack: **Next.js 14 (App Router), Supabase, and Vercel deployment**. While a specific named starter kit (like “T3 Stack”) isn’t mentioned, this combination is perfectly suited for Vercel’s official Next.js starter template.

Our approach is to use the **Vercel/Next.js starter** and add explicit user stories in the first epic for:

1. Auditing the default configurations.
    
2. Manually integrating the Supabase client and Prisma ORM.
    
3. Creating an Architectural Decision Record (ADR) in the docs folder to log this choice and its rationale.
    

### **Change Log**

|   |   |   |   |
|---|---|---|---|
|**Date**|**Version**|**Description**|**Author**|
|2025-08-20|1.0|Initial draft created|Winston (Architect)|
|**2025-08-19**|**1.1**|**Updated to address PO Master Checklist critical findings**|**Winston (Architect)**|

## **2. High Level Architecture**

This section defines the overall structure, platform, and core patterns for the Priority Access system. The proposed architecture is a direct implementation of the PRD’s specified technology stack, leveraging a modern Jamstack approach for optimal performance and developer experience.

### **Technical Summary**

The architecture is a **serverless Jamstack application** deployed on Vercel. The frontend is a **Next.js 14 application** utilizing the App Router, which communicates directly with a **Supabase** backend for all data, authentication, file storage, and real-time updates. Critical backend logic, such as PDF generation, is encapsulated in **Supabase Edge Functions**. This model is designed to be highly scalable, secure, and cost-efficient, directly supporting the PRD’s goals of speed, reliability, and reduced operational overhead.

### **Platform and Infrastructure Choice**

The platform and infrastructure choices are explicitly defined by the PRD.

- **Platform:** **Vercel** is the designated deployment and hosting platform.
    
- **Key Services:** **Supabase** will provide the core backend-as-a-service functionality, including:
    
    - Supabase Auth (Google Provider)
        
    - Supabase Postgres (Database)
        
    - Supabase Storage (Logo uploads, generated PDFs)
        
    - Supabase Realtime (Live dashboard updates)
        
    - Supabase Edge Functions (PDF generation)
        
- **Deployment Regions:** To be determined, but will default to Vercel’s standard global edge network.
    

### **Repository Structure**

A **Monorepo** structure managed with **pnpm workspaces** is recommended.

- **Structure:** A single Git repository will contain the entire application.
    
- **Package Organization:** This structure will allow for easy sharing of code and types (e.g., Prisma client, validation schemas) between the Next.js web application and any supporting serverless functions.
    

### **High Level Architecture Diagram**

```
graph TD
    subgraph "Client's Browser"
        A[Client/Operator]
    end

    subgraph "Vercel Edge Network"
        B[Next.js 14 App]
    end

    subgraph "Supabase"
        C[Auth]
        D[Postgres Database]
        E[Storage]
        F[Realtime]
        G[Edge Functions e.g., Generate PDF]
    end

    subgraph "External Systems"
        H[Outbound Webhooks]
    end

    A -- HTTPS --> B
    B -- Supabase Client SDK --> C
    B -- Supabase Client SDK --> D
    B -- Supabase Client SDK --> E
    B -- Supabase Client SDK --> F
    B -- Invokes --> G
    G -- CRUD --> D
    G -- CRUD --> E
    G -- Emits Event --> K{...}
    K --> F
    D -- DB Changes --> F
    F -- Pushes Update --> B
    G -- Triggers --> H
```

### **Architectural Patterns**

- **Jamstack Architecture:** The frontend will be served from Vercel’s global edge network for maximum performance, while all dynamic functionality is handled via API calls to Supabase.
    
    - _Rationale:_ This pattern provides excellent performance, high security, and lower operational complexity, aligning with the PRD’s goals.
        
- **Backend as a Service (BaaS):** We will leverage Supabase for core backend features instead of building a traditional monolithic server.
    
    - _Rationale:_ Drastically accelerates development time for features like auth, database management, and storage, allowing focus on the core business logic.
        
- **Serverless Functions:** Asynchronous or heavy tasks like PDF generation will be handled by isolated, scalable serverless functions.
    
    - _Rationale:_ Cost-effective (pay-per-use), automatically scalable, and isolates complex dependencies from the main application.
        
- **Component-Based UI:** The Next.js application will be built using a library of reusable React components (leveraging ShadCN).
    
    - _Rationale:_ Ensures a consistent, maintainable, and scalable frontend codebase.
        

## **3. Tech Stack**

This section serves as the definitive, single source of truth for every technology, library, and tool to be used in the project. All development must adhere to these specific technologies and versions to ensure consistency.

### **Technology Stack Table**

|   |   |   |   |   |
|---|---|---|---|---|
|**Category**|**Technology**|**Version**|**Purpose**|**Rationale**|
|**Frontend Language**|TypeScript|~5.4|Language|Enforces type safety for a more robust and maintainable codebase.|
|**Frontend Framework**|Next.js|~14.2|App Framework|Core of the application, provides App Router, SSR, and Vercel integration.|
|**UI Component Library**|ShadCN/UI|Latest|UI Components|Provides accessible, unstyled components for building a custom design system.|
|**Styling**|Tailwind CSS|~3.4|CSS Framework|A utility-first CSS framework for rapid, consistent styling.|
|**State Management**|React Context/Hooks|N/A|Local/Global State|Sufficient for MVP scope, avoids extra dependencies, built into React.|
|**Backend Language**|TypeScript|Deno|Edge Functions|Language for Supabase Edge Functions, ensuring type safety on the backend.|
|**Backend Platform**|Supabase|~1.180|BaaS|Provides database, auth, storage, and serverless functions.|
|**Database**|PostgreSQL|15.1|Database|Robust, open-source SQL database provided by Supabase.|
|**ORM**|Prisma|~5.15|Data Access|Modern ORM for type-safe database access from Next.js and Edge Functions.|
|**Authentication**|Supabase Auth|N/A|User Auth|Handles secure authentication, integrating directly with the database via RLS.|
|**File Storage**|Supabase Storage|N/A|File Storage|Manages uploads and securely serves files like logos and generated PDFs.|
|**Testing**|Jest / RTL|~29.7|Component/Unit|Standard testing stack for Next.js applications.|
|**E2E Testing**|Playwright|~1.44|End-to-End Tests|Powerful E2E testing, recommended and well-integrated with Vercel.|
|**Deployment**|Vercel|N/A|Hosting Platform|Provides seamless CI/CD, global edge network, and serverless infrastructure.|
|**Observability**|Vercel/Supabase|N/A|Logs & Analytics|Built-in logging and analytics provided by the core platforms.|

## **4. Data Models**

This section defines the core data entities as specified in the PRD. We will create a TypeScript interface for each model, which can be shared between the frontend, backend, and Prisma ORM for end-to-end type safety.

### **Model: Client**

**Purpose:** Represents a client company record created by an Operator. This is the central entity to which agreements, audits, and logos are associated.

**Key Attributes:**

- **id:** string (UUID) - Unique identifier for the client.
    
- **company_name:** string - The name of the client’s company.
    
- **contact_name:** string - The primary contact person’s name.
    
- **email:** string - The primary contact’s email address.
    
- **role_title:** string - The contact’s job title or role.
    
- **notes:** string | null - Optional internal notes for the operator.
    
- **logo_url:** string | null - URL for the company logo stored in Supabase Storage.
    
- **status:** 'pending' | 'activated' - The current status of the agreement.
    
- **created_by:** string (UUID) - The ID of the operator who created the record.
    
- **created_at:** Date - Timestamp of when the record was created.
    
- **updated_at:** Date - Timestamp of the last update.
    

**TypeScript Interface:**

```
interface Client {
  id: string;
  company_name: string;
  contact_name: string;
  email: string;
  role_title: string;
  notes: string | null;
  logo_url: string | null;
  status: 'pending' | 'activated';
  created_by: string;
  created_at: Date;
  updated_at: Date;
}
```

**Relationships:**

- **One-to-Many:** A Client can have many Agreements.
    
- **One-to-Many:** A Client can have many Audit Events.
    

### **Model: Agreement**

**Purpose:** Stores the record of a client’s legally binding confirmation. This includes the e-signature details, the terms version they agreed to, and a link to the final, generated PDF artifact for defensibility.

**Key Attributes:**

- **id:** string (UUID) - Unique identifier for the agreement record.
    
- **client_id:** string (UUID) - Foreign key linking to the Client.
    
- **terms_version:** string - The version of the legal terms the client agreed to.
    
- **pdf_url:** string | null - URL to the signed PDF in Supabase Storage (nullable until generated).
    
- **signed_at:** Date - The exact timestamp when the client confirmed their agreement.
    
- **signer_name:** string - The full name the client typed as their e-signature.
    
- **signer_ip:** string - The IP address of the client at the time of signing.
    
- **signature_hash:** string - A hash of key signature details to ensure data integrity.
    
- **created_at:** Date - Timestamp of when the record was created.
    

**TypeScript Interface:**

```
interface Agreement {
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
```

**Relationships:**

- **Many-to-One:** Many Agreements belong to one Client.
    

### **Model: Audit Event**

**Purpose:** Tracks significant actions taken by operators or the system for a given client. This creates an immutable log for security, debugging, and compliance purposes.

**Key Attributes:**

- **id:** string (UUID)
    
- **client_id:** string (UUID)
    
- **actor:** 'operator' | 'system'
    
- **action:** string
    
- **payload:** Record<string, any>
    
- **created_at:** Date
    

**TypeScript Interface:**

```
interface AuditEvent {
  id: string;
  client_id: string;
  actor: 'operator' | 'system';
  action: string;
  payload: Record<string, any>;
  created_at: Date;
}
```

**Relationships:**

- **Many-to-One:** Many Audit Events can be associated with one Client.
    

### **Model: Webhook Endpoint**

**Purpose:** Stores operator-configured endpoints for receiving notifications about system events (e.g., agreement.signed).

**Key Attributes:**

- **id:** string (UUID)
    
- **url:** string
    
- **secret:** string
    
- **enabled:** boolean
    
- **created_at:** Date
    
- **updated_at:** Date
    

**TypeScript Interface:**

```
interface WebhookEndpoint {
  id: string;
  url: string;
  secret: string;
  enabled: boolean;
  created_at: Date;
  updated_at: Date;
}
```

**Relationships:**

- None.
    

## **5. API Specification**

### **1. Primary Data Access: Supabase Client SDK**

- CRUD via the Supabase JavaScript Client; types generated from Prisma ensure end-to-end type safety.
    

### **2. Serverless Function API: PDF Generation**

- **Endpoint:** `POST /functions/v1/generate-pdf`
    
- **Auth:** Supabase user JWT required
    
- **Body:** `{ "agreementId": "uuid" }`
    
- **Success:** `{ "pdfUrl": "https://.../pdfs/..." }`
    
- **Error:** `{ "error": "PDF generation failed", "details": "..." }`
    

### **3. Outbound Webhooks API**

- `POST` with headers `Content-Type: application/json` and `X-Signature-Hmac-Sha256`.
    
- **Events:** `client.created`, `client.updated`, `agreement.signed`, `pdf.generated`.
    
- **Sample payload:**
    
    ```
    {
      "event": "agreement.signed",
      "timestamp": "2025-08-20T10:00:00Z",
      "payload": {
        "clientId": "uuid-...",
        "agreementId": "uuid-...",
        "signedAt": "2025-08-20T09:59:58Z",
        "signerName": "John Doe",
        "signerIp": "192.0.2.1"
      }
    }
    ```
    

## **6. Components**

### **Backend Components**

- Supabase Core Services (DB/Auth/Storage/Realtime)
    
- PDF Generation Service (Edge Function)
    
- Webhook Dispatch Service (Edge Function/DB Trigger)
    

### **Frontend Components**

- Operator Dashboard UI (Supabase SDK + Realtime)
    
- Client Activation UI (invokes PDF service)
    
- Authentication UI (Google OAuth)
    

### **Shared Component**

- Shared Types Package (Prisma-generated types)
    

**Component Interaction Diagram**

```
graph TD
  subgraph Frontend (Next.js App)
    AuthUI
    DashboardUI
    ActivationUI
  end
  subgraph Backend (Supabase)
    CoreBaaS["Core Services (DB, Auth, etc.)"]
    PDFService["PDF Generation Service"]
    WebhookService["Webhook Dispatch Service"]
  end
  subgraph Shared
    SharedTypes
  end
  AuthUI --> CoreBaaS
  DashboardUI --> CoreBaaS
  ActivationUI --> CoreBaaS
  ActivationUI --> PDFService
  PDFService --> CoreBaaS
  WebhookService --> CoreBaaS
  DashboardUI --> SharedTypes
  ActivationUI --> SharedTypes
  PDFService --> SharedTypes
  WebhookService --> SharedTypes
```

## **7. External APIs**

No 3rd‑party integrations in MVP; outbound webhooks only.

## **8. Core Workflows**

**Workflow 1: Operator Creates a Client**

```
sequenceDiagram
  actor Operator
  participant App as Next.js App (Vercel)
  participant Auth as Supabase Auth
  participant Storage as Supabase Storage
  participant DB as Supabase DB
  Operator->>App: Accesses Dashboard
  App->>Auth: Verify user session
  Auth-->>App: Session valid
  Operator->>App: Create Client + upload logo
  App->>Storage: Upload logo
  Storage-->>App: Return logo_url
  App->>DB: Insert into clients
  DB-->>App: Return client record
  App->>Operator: Show success + activation link
```

**Workflow 2: Client Activates Agreement**

```
sequenceDiagram
  actor Client
  participant App as Next.js App
  participant DB as Supabase DB
  participant PDF as PDF Gen Service
  participant Storage as Supabase Storage
  participant Realtime as Supabase Realtime
  participant Webhook as Webhook Service
  actor Operator
  Client->>App: Opens activation link
  App->>DB: Fetch client by token
  DB-->>App: Return client data
  Client->>App: Submit name + consent
  App->>DB: Create agreement + update status
  par
    App->>PDF: Invoke generate-pdf
    PDF->>Storage: Save PDF
    Storage-->>PDF: Return pdf_url
    PDF->>DB: Update agreement with pdf_url
    PDF-->>App: Success
    App->>Client: Show confirmation + download
  and
    DB->>Realtime: Change event
    Realtime-->>Operator: Live dashboard update
  and
    DB->>Webhook: Trigger signed payload
  end
```

## **9. Database Schema (Prisma)**

```
model Client {
  id           String       @id @default(uuid())
  company_name String
  contact_name String
  email        String
  role_title   String
  notes        String?
  logo_url     String?
  status       String       @default("pending")
  created_by   String
  created_at   DateTime     @default(now())
  updated_at   DateTime     @updatedAt
  agreements   Agreement[]
  audit_events AuditEvent[]
}

model Agreement {
  id             String   @id @default(uuid())
  client_id      String
  terms_version  String
  pdf_url        String?
  signed_at      DateTime
  signer_name    String
  signer_ip      String
  signature_hash String
  created_at     DateTime @default(now())
  client         Client   @relation(fields: [client_id], references: [id], onDelete: Cascade)
}

model AuditEvent {
  id         String   @id @default(uuid())
  client_id  String
  actor      String
  action     String
  payload    Json
  created_at DateTime @default(now())
  client     Client   @relation(fields: [client_id], references: [id], onDelete: Cascade)
}

model WebhookEndpoint {
  id         String   @id @default(uuid())
  url        String
  secret     String
  enabled    Boolean  @default(true)
  created_at DateTime @default(now())
  updated_at DateTime @updatedAt
}
```

## **10. Frontend Architecture (selected highlights)**

- Component organization (`components/ui`, `components/composed`, `app/**/components`)
    
- Template example: `PageHeader` with `cn()` utility
    
- State management via React hooks + TanStack Query
    
- App Router with `(auth)`, `(dashboard)`, and `activate/[token]` groups
    
- Protected routes via `middleware.ts`
    

## **11. Backend Architecture (selected highlights)**

- Supabase Edge Functions: `generate-pdf/`, `webhook-dispatcher/`, shared `cors.ts`
    
- Function template with CORS handling and JSON responses
    
- Repository pattern for Prisma access
    

## **12. Unified Project Structure**

**Monorepo Layout (pnpm workspaces):**

```
/ (repo root)
  apps/
    web/                # Next.js 14 App Router
  packages/
    db/                 # Prisma schema + client
    types/              # Shared TS types (generated & custom)
  supabase/
    functions/          # Edge Functions (generate-pdf, webhook-dispatcher)
    migrations/         # SQL migrations (if any)
    seed/               # Seed scripts
  docs/
    architecture/       # Architecture docs by section
  .github/workflows/    # CI pipelines (Vercel, Supabase)
```

**Storage Buckets:**

- `logos` (public-read, write via RLS)
    
- `agreements` (private, signed URLs only)
    

**RLS Policies (outline):**

- Operators can `select/insert/update` clients where `created_by = auth.uid()`
    
- Anonymous clients may `select` activation record by token (via RPC with token verification)
    

## **13. Development Workflow**

> Resolves CRITICAL #1 — Concrete end-to-end setup.

### **Prerequisites**

- **Node.js 20+**, **pnpm 9+**
    
- **Docker Desktop** (for local Supabase)
    
- **Supabase CLI** (`brew install supabase/tap/supabase` or see docs)
    

### **1) Clone & Install**

```
git clone <repo>
cd <repo>
pnpm install
```

### **2) Supabase Local**

```
supabase init            # if not already present
supabase start           # launches local Postgres, Studio, Storage, Realtime
```

### **3) Environment Variables**

Create `.env` at repo root (consumed by Next.js) and `.env.local` if desired:

```
# Next.js
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-local-anon-key

# Server-only
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres

# App-specific
PDF_BUCKET_NAME=agreements
LOGO_BUCKET_NAME=logos
TERMS_VERSION=v1
```

Keys are available from `supabase start` output or Studio.

### **4) Prisma**

```
pnpm dlx prisma generate
pnpm dlx prisma migrate dev --name init
```

### **5) Seed & Test Data Setup**

**Production Seed Data:**
```
pnpm tsx supabase/seed/seed.ts
```

**Test Data & Mock Services Setup:**
```
# Create test fixtures and mock data
pnpm tsx tests/fixtures/create-test-data.ts

# Setup test database with mock clients and agreements
pnpm tsx tests/setup/seed-test-db.ts
```

**Mock Services Configuration:**
- **PDF Generation Mock:** Test environment uses a lightweight PDF mock that generates placeholder PDFs instantly
- **Supabase Storage Mock:** Uses in-memory storage for file upload testing  
- **Authentication Mock:** Provides test user sessions without requiring Google OAuth
- **Webhook Mock:** Captures webhook calls for verification in tests

### **6) Dev Servers**

```
pnpm --filter web dev    # Next.js app on http://localhost:3000
# In another shell, if testing functions locally:
supabase functions serve generate-pdf --env-file .env --no-verify-jwt
supabase functions serve webhook-dispatcher --env-file .env --no-verify-jwt
```

### **7) Storage Buckets**

Create buckets via Studio or SQL:

```
select storage.create_bucket('logos', public := true);
select storage.create_bucket('agreements', public := false);
```

### **8) Minimal RLS (illustrative)**

```
alter table public.clients enable row level security;
create policy "own-clients" on public.clients
  for all using (created_by = auth.uid());
```

## **14. Deployment Architecture**

> Resolves CRITICAL #2 — CI/CD & environments.

### **Environments**

- **Preview**: every PR — Vercel Preview, isolated Supabase schema (optional)
    
- **Staging**: `main` branch — Vercel env = `staging`, Supabase project `staging`
    
- **Production**: tagged release — Vercel env = `production`, Supabase `prod`
    

### **Vercel CI/CD**

1. Import GitHub repo into Vercel
    
2. Set environment variables per env (same names as `.env`)
    
3. Enable **Protect Preview Deployments** if needed
    
4. Configure build output: Next.js defaults
    

### **Supabase Deploy (GitHub Actions)**

`.github/workflows/supabase-deploy.yml`

```
name: Supabase Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
      - run: supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
      - run: supabase db push
      - run: supabase functions deploy generate-pdf --no-verify-jwt
      - run: supabase functions deploy webhook-dispatcher --no-verify-jwt
      - run: supabase secrets set SUPABASE_SERVICE_ROLE_KEY=${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
```

### **Domain & DNS Configuration**

**Production Domain Setup:**
- **Primary Domain:** `priorityaccess.yourdomain.com` (to be configured)
- **Staging Domain:** `staging.priorityaccess.yourdomain.com`
- **DNS Provider:** Cloudflare (recommended) or domain registrar DNS
- **SSL/TLS:** Managed by Vercel (automatic)

**Domain Configuration Steps:**
1. Register domain through preferred registrar
2. Configure DNS to point to Vercel nameservers
3. Add domain to Vercel project settings
4. Configure environment-specific subdomains
5. Set up custom domain for Supabase project (optional)

**Environment URL Structure:**
- **Production:** `https://priorityaccess.yourdomain.com`
- **Staging:** `https://staging.priorityaccess.yourdomain.com`  
- **Preview:** `https://priority-access-git-[branch]-[team].vercel.app`

### **Promotion Strategy**

- PR -> Preview -> merge to `main` -> auto deploy to **Staging**
    
- Tag `vX.Y.Z` -> deploy to **Production** (protected)
    

### **Migrations & Rollback**

- Prisma migrations versioned, applied via `supabase db push`
    
- Rollback by re-applying prior migration or hotfix migration
    

## **15. Security & Performance**

- RLS everywhere; JWT claims checked in policies
    
- Signed URLs for PDFs, public logos only
    
- Core Web Vitals budget; lazy-load heavy components
    
- Edge function timeouts & retries
    

## **16. Testing Strategy**

> Resolves CRITICAL #3 — Concrete testing approach.

### **Unit & Component (Jest + RTL)**

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

### **E2E (Playwright)**

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

### **CI Integration**

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

### **When to Write Tests**

- **Unit/Component:** with each feature PR (red-green-refactor)
    
- **E2E:** at the end of each epic; keep smoke test green at all times
    

## **17. Coding Standards**

- Hooks prefix `use*`, server components in `app/**/page.tsx`
    
- Service layer for Supabase calls; no direct calls in components
    
- Lint: ESLint + Prettier enforced in CI
    

## **18. Error Handling Strategy**

- Standard error shape `{ code, message, details? }`
    
- UI toasts + error boundaries around routes
    
- Correlation IDs in edge functions; log to Supabase
    

## **19. Monitoring & Observability**

- Vercel Analytics; Supabase logs/metrics
    
- KPIs: Core Web Vitals, function error rate, PDF generation time, TTA
    

## **20. User Documentation Strategy**

> Addresses PO Checklist CRITICAL #3 — User documentation planning.

### **End-User Documentation**

**Client-Facing Documentation:**
- **Activation Guide:** Step-by-step instructions for completing the activation process
- **FAQ Page:** Common questions about the confirmation process and PDF access
- **Troubleshooting:** Solutions for common issues (expired links, PDF download problems)
- **Mobile Instructions:** Specific guidance for mobile users

**Operator Documentation:**
- **Dashboard User Guide:** How to create clients, manage records, and track status
- **Link Sharing Best Practices:** Guidelines for sending activation links to clients
- **Real-time Updates:** Understanding dashboard notifications and status changes
- **Troubleshooting Guide:** Resolving common operator issues

**Documentation Implementation:**
- **Location:** `/docs/user-guides/` in the repository
- **Format:** Markdown files that can be converted to web pages if needed
- **Maintenance:** Updated with each major feature release
- **Screenshots:** Include current UI screenshots for visual guidance

### **Support Infrastructure**

**Error Messages & User Feedback:**
- **Clear Error States:** User-friendly error messages with suggested actions
- **Help Links:** Contextual links to relevant documentation sections
- **Contact Information:** Clear escalation path for technical issues
- **Status Page:** Simple status indicator for system health

**Knowledge Base Structure:**
```
docs/user-guides/
├── clients/
│   ├── activation-process.md
│   ├── pdf-download-guide.md
│   ├── troubleshooting.md
│   └── mobile-setup.md
├── operators/
│   ├── dashboard-guide.md
│   ├── client-management.md
│   ├── link-sharing.md
│   └── troubleshooting.md
└── common/
    ├── faq.md
    ├── system-requirements.md
    └── contact-support.md
```

## **21. Risk Mitigation & Fallback Strategies**

> Addresses PO Checklist recommendations for service resilience.

### **Service Outage Fallback Plans**

**Supabase Service Interruptions:**
- **Database Connectivity:** Implement exponential backoff retry logic
- **Authentication Fallback:** Graceful degradation with clear user messaging
- **Storage Unavailable:** Queue file operations for retry when service returns
- **Edge Functions Down:** Client-side notification with retry mechanism

**PDF Generation Failures:**
- **Primary Strategy:** 3-attempt retry with exponential backoff (already implemented)
- **Fallback Option:** Generate simplified PDF with essential information only
- **Ultimate Fallback:** Email-based confirmation as temporary measure
- **User Communication:** Clear status updates during generation process

**Monitoring & Alerting:**
- **Service Health Checks:** Automated monitoring of critical service endpoints
- **Error Rate Thresholds:** Alerts when error rates exceed acceptable limits
- **Performance Degradation:** Monitoring for PDF generation timeouts
- **User Impact Tracking:** Correlation between service issues and user experience

### **Vendor Lock-in Mitigation**

**Supabase Independence Measures:**
- **Prisma ORM:** Database schema and queries are vendor-agnostic
- **Standard PostgreSQL:** Can migrate to any PostgreSQL hosting service
- **Type-safe Interfaces:** Business logic isolated from Supabase-specific APIs
- **Backup Strategy:** Regular database exports and schema versioning

**Exit Strategy Planning:**
- **Database Migration:** Documented process for PostgreSQL migration
- **Authentication Migration:** Plan for transitioning to alternative OAuth providers
- **File Storage Migration:** Process for moving files to alternative object storage
- **Function Migration:** Edge functions can be ported to Vercel Functions or AWS Lambda

## **22. Technical Debt Management**

### **Architecture Extension Points**

**Post-MVP Enhancement Readiness:**
- **Webhook System:** Designed for easy addition of new event types
- **Multi-tenant Support:** Database schema ready for operator isolation
- **Additional Auth Providers:** Auth layer abstracted for easy provider addition
- **Advanced PDF Templates:** PDF generation service designed for template expansion

**Code Quality Safeguards:**
- **TypeScript Strict Mode:** Enforced across entire codebase
- **ESLint + Prettier:** Automated code formatting and linting
- **Dependency Audits:** Regular security and version updates
- **Performance Budgets:** Automated checks for bundle size and Core Web Vitals

**Documentation Maintenance:**
- **ADR Process:** Architectural Decision Records for major changes
- **Code Comments:** Focus on "why" rather than "what"
- **API Documentation:** Auto-generated from TypeScript interfaces
- **Runbook Documentation:** Operational procedures for deployment and maintenance

## **23. Checklist Results Report**

**Status:** Updated — All PO Master Checklist critical issues addressed.

**Critical Issues Resolved:**
- ✅ **Mock Services/Data Setup:** Comprehensive test data and mocking strategy defined
- ✅ **Domain/DNS Planning:** Complete domain configuration and DNS setup process documented
- ✅ **User Documentation:** Full user documentation strategy and structure planned

**Readiness:** High — Validated and ready for development with enhanced resilience planning.

**Risk Level:** Low — Comprehensive mitigation strategies in place for identified risks.