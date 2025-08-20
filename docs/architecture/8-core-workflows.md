# **8. Core Workflows**

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
