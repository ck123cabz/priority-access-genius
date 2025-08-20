# **4. Technical Assumptions**

## **Repository Structure: Monorepo**

The project will be developed within a single monorepo managed with `pnpm` workspaces to allow for easy sharing of code and types.

## **Service Architecture: Serverless**

The system is a serverless Jamstack application deployed on Vercel. Backend logic is encapsulated in Supabase Edge Functions.

## **Testing Requirements: Full Testing Pyramid**

The testing strategy will follow a full testing pyramid model, including unit, integration, and end-to-end (E2E) tests.

## **Additional Technical Assumptions**

The following technology stack is prescribed and must be adhered to:

- **Platform:** Vercel
    
- **Backend:** Supabase
    
- **Frontend Framework:** Next.js 14 (App Router)
    
- **Styling:** Tailwind CSS with ShadCN/UI
    
- **ORM:** Prisma
    
