# **Priority Access Confirmation System Product Requirements Document (PRD)**

## **1. Goals and Background Context**

### **Goals**

- Provide a branded, secure, and low-friction confirmation and e-signature experience.
    
- Automatically generate and store a signed PDF artifact for legal defensibility.
    
- Give operators real-time visibility into the activation status of clients.
    
- Reduce the median Time-to-Activation (TTA) from days to under 30 minutes.
    

### **Background Context**

The current process for client activation relies on manually emailing PDF agreements, which is a slow and high-friction workflow. This delay between a verbal agreement and a formal signature can take several days, leading to lost conversions and significant administrative overhead for operators.

This project will replace that manual system with a streamlined, web-based flow. Operators will generate a unique link that clients can use to review terms and provide a legally sufficient e-signature. This will drastically reduce confirmation time, improve conversion rates, and automate a costly operational bottleneck.

### **Change Log**

|   |   |   |   |
|---|---|---|---|
|**Date**|**Version**|**Description**|**Author**|
|2025-08-20|1.0|Initial PRD draft created.|John (PM)|
|**2025-08-20**|**1.1**|**Updated to address PO Checklist findings.**|**John (PM)**|
|**2025-08-19**|**1.2**|**Updated to address PO Master Checklist critical findings from architect review.**|**John (PM)**|

## **2. Requirements**

### **Functional Requirements**

1. **FR1: Operator Authentication:** Operators must authenticate via Supabase Auth using Google.
    
2. **FR2: Client Creation & Logo Upload:** An admin form must exist to create a client, validate inputs, and upload a company logo to Supabase Storage.
    
3. **FR3: Activation Link Generation:** The system must generate a unique, single-use tokenized URL for each client activation.
    
4. **FR4: Client Activation Page:** The tokenized link must lead to a page that renders the client's information and terms, and provides a form to collect a typed name and consent.
    
5. **FR5: Signature Persistence:** On submission, the system must store the signer's name, timestamp, and IP address, and update the client's status to "activated".
    
6. **FR6: PDF Generation:** A Supabase Edge Function must generate a final PDF and store it in Supabase Storage.
    
7. **FR7: Confirmation & Download:** After signing, the client must see a confirmation page and be able to download the generated PDF via a secure, time-bound signed URL.
    
8. **FR8: Real-time Operator Dashboard:** Operators must have a dashboard that displays a list of clients and their statuses in real-time.
    
9. **FR9: Audit Trail:** The system must record key admin and system actions.
    
10. **FR10: Outbound Webhooks (Optional):** The system must be able to send HMAC-signed webhook notifications for key events.
    

### **Non-Functional Requirements**

1. **NFR1: Performance:** The client-facing pages must have a First Contentful Paint (FCP) of less than 2 seconds. The median PDF generation time must be under 3 seconds.
    
2. **NFR2: Security:** Row Level Security must be enforced on all relevant database tables. All secrets must be managed via environment variables and a secure secret management solution.
    
3. **NFR3: Defensibility:** The system must store the signer's name, IP address, and a precise timestamp.
    
4. **NFR4: Reliability:** PDF generation and webhook delivery must include auto-retry logic and a dead-letter queue.
    
5. **NFR5: Scalability:** The system must be designed to handle up to 1,000 activations per day and 100 concurrent operators.
    
6. **NFR6: Accessibility:** All user-facing forms and controls must meet WCAG 2.1 Level AA standards.
    

## **3. User Interface Design Goals**

### **Overall UX Vision**

The user experience will be efficient for internal **Operators** and exceptionally clear and trustworthy for external **Clients**. The overall tone is authoritative, calm, and protective, reinforcing the brand's "Proof + Guarantees" strategy.

### **Core Screens and Views**

- Operator Login Page
    
- Operator Dashboard (Client List)
    
- Client Activation Page
    
- Processing/Loading Screen
    
- Confirmation Page
    

### **Accessibility: WCAG AA**

The application must meet WCAG 2.1 Level AA standards, including proper form labeling, full keyboard navigability, and sufficient color contrast ratios.

### **Branding**

The visual identity is professional and high-impact, using a primary accent color of `#cc2e00`, a dark base of `#1c1819`, and a bold display font for headlines.

### **Target Device and Platforms: Web Responsive**

The application must provide a seamless experience on both desktop and mobile devices.

## **4. Technical Assumptions**

### **Repository Structure: Monorepo**

The project will be developed within a single monorepo managed with `pnpm` workspaces to allow for easy sharing of code and types.

### **Service Architecture: Serverless**

The system is a serverless Jamstack application deployed on Vercel. Backend logic is encapsulated in Supabase Edge Functions.

### **Testing Requirements: Full Testing Pyramid**

The testing strategy will follow a full testing pyramid model, including unit, integration, and end-to-end (E2E) tests.

### **Additional Technical Assumptions**

The following technology stack is prescribed and must be adhered to:

- **Platform:** Vercel
    
- **Backend:** Supabase
    
- **Frontend Framework:** Next.js 14 (App Router)
    
- **Styling:** Tailwind CSS with ShadCN/UI
    
- **ORM:** Prisma
    

## **5. Epic List**

1. **Epic 1: Foundation & Operator Core**
    
    - **Goal:** Establish the core project infrastructure, authentication, and provide operators with the essential tools to create and manage client records.
        
2. **Epic 2: Client Activation & PDF Generation**
    
    - **Goal:** Deliver the complete, end-to-end client confirmation flow, from the moment a client opens their unique link to when they download the final, signed PDF.
        
3. **Epic 3: Extensibility & Webhooks (Post-MVP)**
    
    - **Goal:** Provide an "integration seam" for downstream systems by implementing optional, HMAC-signed outbound webhooks for key system events.
        

## **6. Epic Details**

### **Epic 1: Foundation & Operator Core**

**Epic Goal:** This epic establishes the complete technical foundation of the project. It delivers the core functionality for an operator to log in, view a dashboard, and create a new client record, which in turn generates a shareable activation link.

- **Story 1.1: Project Initialization & Core Dependencies**
    
    - As a developer, I want to initialize the Next.js monorepo with pnpm workspaces and connect it to a local Supabase instance, so that a clean, reproducible development environment is established.
        
    - **AC:** The monorepo structure is created with `app` and `packages/db` workspaces. All core dependencies are installed. The local Supabase environment can be started and connected to.
        
- **Story 1.2: Database Schema & Security Policies**
    
    - As a system, I want the complete Prisma schema defined, with Row Level Security (RLS) enabled, so that data integrity and authorization are enforced at the database level.
        
    - **AC:** The `schema.prisma` file contains all required models. RLS is enabled on the `clients` table ensuring operators can only access their own records.
        
- **<font color="green">NEW STORY (Resolves Blocker #3)</font>**
    
    - **Story 1.2b: Database Migration Execution**
        
    - As a developer, I want a clear process for applying Prisma migrations and seeding data, so that the database schema is consistent across all environments.
        
    - **AC:** A script exists to apply Prisma migrations (`prisma migrate dev`). The migration is successfully applied to local and remote Supabase environments. RLS policies are included in the migration.
        
- **Story 1.3: Operator Authentication**
    
    - As an Operator, I want to log in to the application using my Google account, so that I can securely access the operator dashboard.
        
    - **AC:** A `/login` page initiates the Supabase Auth OAuth flow with Google. Upon success, the user is redirected to `/dashboard`. Dashboard routes are protected.
        
- **Story 1.4: Client Dashboard UI & Data Connection**
    
    - As an Operator, I want to see a dashboard that displays a list of clients I have created, so that I can track their status.
        
    - **AC:** The dashboard fetches and displays a list of clients created by the logged-in operator. An "empty state" is shown if there are no clients.
        
- **Story 1.5: Client Creation Form & Logo Upload**
    
    - As an Operator, I want to fill out a form to create a new client and upload their logo, so that I can onboard a new company for activation.
        
    - **AC:** A form is available to create a client. A logo can be uploaded to Supabase Storage. A new record is created in the `clients` table with a `status` of "pending".
        
- **Story 1.6: Generate & Display Activation Link <font color="blue">(UPDATED - Resolves Blocker #2)</font>**
    
    - As an Operator, I want to receive a unique, tokenized activation link after creating a client, so that I can share it with the client.
        
    - **AC:** After successful client creation, a unique token is generated. The full activation URL is displayed to the operator with a "copy-to-clipboard" button.
        
    - **<font color="blue">AC Addition:</font>** The activation token is generated using `crypto.randomUUID()`, stored in the `clients` table, and includes a configurable expiry mechanism (defaulting to 24 hours).
        
- **Story 1.7: Real-time Dashboard Updates**
    
    - As an Operator, I want the client list on my dashboard to update automatically when changes occur, so that I always have the most current information.
        
    - **AC:** The dashboard subscribes to Supabase Realtime. When a new client is created or a client's status changes, the list updates within 2 seconds without a page reload.
        
- **<font color="green">NEW STORY (Addresses Should-Fix #5)</font>**
    
    - **Story 1.8: Global Error Handling**
        
    - As a user, I want to see a clear and helpful error page when something goes wrong, so that I am not left with a broken screen.
        
    - **AC:** A global error boundary is implemented in the Next.js App Router. A standardized error page is displayed for unhandled exceptions. UI toasts are used for non-critical errors.
        
- **<font color="green">NEW STORY (Resolves Blocker #1 & Addresses Should-Fix #4)</font>**
    
    - **Story 1.9: CI/CD Pipeline & Secrets Management**
        
    - As a developer, I want a CI/CD pipeline that automatically tests and deploys the application, so that changes can be delivered confidently.
        
    - **AC:** A GitHub Actions workflow is created to run tests (unit, E2E) on every push. The workflow deploys to Vercel on merge to `main`. Environment variables are securely managed using Vercel and Supabase project settings.
        
- **<font color="green">NEW STORY (Resolves PO Checklist CRITICAL #1)</font>**
    
    - **Story 1.10: Test Data & Mock Services Setup**
        
    - As a developer, I want comprehensive test data and mock services, so that testing can be performed reliably without external dependencies.
        
    - **AC:** Test fixtures created for clients and agreements. Mock services implemented for PDF generation, file storage, and authentication. Test database seeding scripts available. All mocks provide predictable, testable responses.
        
- **<font color="green">NEW STORY (Resolves PO Checklist CRITICAL #2)</font>**
    
    - **Story 1.11: Production Domain & DNS Configuration**
        
    - As an operator, I want the system accessible via a professional domain name, so that clients trust the activation process.
        
    - **AC:** Production domain registered and configured. DNS properly routed to Vercel. SSL certificates automatically provisioned. Staging and preview environments have appropriate subdomains. Domain configuration documented for deployment.
        

### **Epic 2: Client Activation & PDF Generation**

**Epic Goal:** This epic delivers the core value proposition. It builds the complete, end-to-end client confirmation flow, from opening the unique link to downloading the final, signed PDF artifact.

- **Story 2.1: Client Activation Page UI**
    
    - As a Client, I want to see a professional and personalized page when I open my activation link, so that I feel confident in the process.
        
    - **AC:** A valid `/activate/<token>` URL renders a page displaying the correct client's company name and terms. An invalid token shows a generic error page.
        
- **Story 2.2: E-Signature & Consent Logic**
    
    - As a Client, I want the activation button to be enabled only after I provide my name and consent, so that I cannot submit the agreement accidentally.
        
    - **AC:** The activation button is disabled by default. The button becomes enabled only when the consent checkbox is checked and the "Full Name" field is filled.
        
- **Story 2.3: Signature Persistence**
    
    - As a System, I want to securely record the client's signature details and update their status, so that a permanent, defensible record is created.
        
    - **AC:** A new record is created in the `agreements` table containing the signer's name, IP, and timestamp. The `clients` table `status` is updated to "activated".
        
- **Story 2.4: PDF Generation Service (Edge Function)**
    
    - As a System, I want a serverless function that generates a PDF from an agreement, so that the logic is scalable and decoupled.
        
    - **AC:** A Supabase Edge Function accepts an `agreementId`. It fetches data, composes a PDF, and saves it to Supabase Storage.
        
- **Story 2.5: Asynchronous PDF Generation Trigger <font color="blue">(UPDATED - Addresses Should-Fix #6)</font>**
    
    - As a System, I want to trigger PDF generation asynchronously and reliably, so that the client-facing UI is not blocked and failures are handled.
        
    - **AC:** The PDF generation function is invoked immediately after signature persistence. The UI transitions to a loading state.
        
    - **<font color="blue">AC Addition:</font>** The function includes a timeout of 10 seconds and an auto-retry policy (3 attempts with exponential backoff) for transient errors.
        
- **Story 2.6: Confirmation Page UI & Secure Download**
    
    - As a Client, I want to see a clear confirmation and be able to download my agreement, so that I have a tangible record.
        
    - **AC:** After generation, the user sees a confirmation page. A "Download Agreement (PDF)" button provides a secure, time-limited signed URL.
        
- **<font color="green">NEW STORY (Resolves PO Checklist CRITICAL #3)</font>**
    
    - **Story 2.7: User Documentation & Help System**
        
    - As a user (both client and operator), I want clear documentation and help when I encounter issues, so that I can successfully complete my tasks without external support.
        
    - **AC:** User guides created for both clients and operators. FAQ section addresses common issues. Contextual help links embedded in the UI. Error messages include suggested actions and help links. Troubleshooting guides available for both user types.
        

### **Epic 3: Extensibility & Webhooks (Post-MVP)**

**Epic Goal:** This epic provides an "integration seam" for downstream systems by implementing optional, HMAC-signed outbound webhooks for key system events.

- **Story 3.1: Webhook Endpoint Management UI**
    
    - As an Operator, I want a settings page where I can manage webhook endpoints, so that I can control where event notifications are sent.
        
    - **AC:** A UI is available for operators to add, view, and enable/disable webhook endpoints (URL and secret).
        
- **Story 3.2: Webhook Event Trigger & Delivery**
    
    - As a System, I want to automatically send a signed payload to enabled endpoints when key events occur, so that integrations can be notified.
        
    - **AC:** A backend process is triggered on events like `agreement.signed`. It sends a POST request with a JSON payload and an `X-Signature-Hmac-Sha256` header to all enabled endpoints.
        
- **Story 3.3: Webhook Retry Logic**
    
    - As a System, I want to handle webhook delivery failures gracefully, so that transient network issues do not cause lost events.
        
    - **AC:** If an endpoint returns a 5xx error, the delivery is retried 3 times with exponential backoff. After the final retry fails, the event is stored in a dead-letter queue.
        

## **7. Checklist Results Report**

This document has been updated to resolve the gaps identified by the `PO Master Checklist Validation Report`. It now contains a more complete and actionable Epic and User Story structure.