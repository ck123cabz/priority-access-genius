# **12. Unified Project Structure**

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
    
