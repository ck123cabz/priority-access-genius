# **2. High Level Architecture**

This section defines the overall structure, platform, and core patterns for the Priority Access system. The proposed architecture is a direct implementation of the PRD’s specified technology stack, leveraging a modern Jamstack approach for optimal performance and developer experience.

## **Technical Summary**

The architecture is a **serverless Jamstack application** deployed on Vercel. The frontend is a **Next.js 14 application** utilizing the App Router, which communicates directly with a **Supabase** backend for all data, authentication, file storage, and real-time updates. Critical backend logic, such as PDF generation, is encapsulated in **Supabase Edge Functions**. This model is designed to be highly scalable, secure, and cost-efficient, directly supporting the PRD’s goals of speed, reliability, and reduced operational overhead.

## **Platform and Infrastructure Choice**

The platform and infrastructure choices are explicitly defined by the PRD.

- **Platform:** **Vercel** is the designated deployment and hosting platform.
    
- **Key Services:** **Supabase** will provide the core backend-as-a-service functionality, including:
    
    - Supabase Auth (Google Provider)
        
    - Supabase Postgres (Database)
        
    - Supabase Storage (Logo uploads, generated PDFs)
        
    - Supabase Realtime (Live dashboard updates)
        
    - Supabase Edge Functions (PDF generation)
        
- **Deployment Regions:** To be determined, but will default to Vercel’s standard global edge network.
    

## **Repository Structure**

A **Monorepo** structure managed with **pnpm workspaces** is recommended.

- **Structure:** A single Git repository will contain the entire application.
    
- **Package Organization:** This structure will allow for easy sharing of code and types (e.g., Prisma client, validation schemas) between the Next.js web application and any supporting serverless functions.
    

## **High Level Architecture Diagram**

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

## **Architectural Patterns**

- **Jamstack Architecture:** The frontend will be served from Vercel’s global edge network for maximum performance, while all dynamic functionality is handled via API calls to Supabase.
    
    - _Rationale:_ This pattern provides excellent performance, high security, and lower operational complexity, aligning with the PRD’s goals.
        
- **Backend as a Service (BaaS):** We will leverage Supabase for core backend features instead of building a traditional monolithic server.
    
    - _Rationale:_ Drastically accelerates development time for features like auth, database management, and storage, allowing focus on the core business logic.
        
- **Serverless Functions:** Asynchronous or heavy tasks like PDF generation will be handled by isolated, scalable serverless functions.
    
    - _Rationale:_ Cost-effective (pay-per-use), automatically scalable, and isolates complex dependencies from the main application.
        
- **Component-Based UI:** The Next.js application will be built using a library of reusable React components (leveraging ShadCN).
    
    - _Rationale:_ Ensures a consistent, maintainable, and scalable frontend codebase.
        
