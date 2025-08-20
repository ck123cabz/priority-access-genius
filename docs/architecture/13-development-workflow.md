# **13. Development Workflow**

> Resolves CRITICAL #1 — Concrete end-to-end setup.

## **Prerequisites**

- **Node.js 20+**, **pnpm 9+**
    
- **Docker Desktop** (for local Supabase)
    
- **Supabase CLI** (`brew install supabase/tap/supabase` or see docs)
    

## **1) Clone & Install**

```
git clone <repo>
cd <repo>
pnpm install
```

## **2) Supabase Local**

```
supabase init            # if not already present
supabase start           # launches local Postgres, Studio, Storage, Realtime
```

## **3) Environment Variables**

Create `.env` at repo root (consumed by Next.js) and `.env.local` if desired:

```