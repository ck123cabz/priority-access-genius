# **3. Tech Stack**

This section serves as the definitive, single source of truth for every technology, library, and tool to be used in the project. All development must adhere to these specific technologies and versions to ensure consistency.

## **Technology Stack Table**

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
