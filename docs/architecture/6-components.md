# **6. Components**

## **Backend Components**

- Supabase Core Services (DB/Auth/Storage/Realtime)
    
- PDF Generation Service (Edge Function)
    
- Webhook Dispatch Service (Edge Function/DB Trigger)
    

## **Frontend Components**

- Operator Dashboard UI (Supabase SDK + Realtime)
    
- Client Activation UI (invokes PDF service)
    
- Authentication UI (Google OAuth)
    

## **Shared Component**

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
