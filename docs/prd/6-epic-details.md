# **6. Epic Details**

## **Epic 1: Foundation & Operator Core**

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
        
    - **<font color="blue">AC Addition:</font>** The activation token is generated using `crypto.randomUUID()`, stored in the `clients` table, and includes a 24-hour expiry mechanism.
        
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
        

## **Epic 2: Client Activation & PDF Generation**

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
        

## **Epic 3: Extensibility & Webhooks (Post-MVP)**

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
        
