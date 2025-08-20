# **14. Deployment Architecture**

> Resolves CRITICAL #2 — CI/CD & environments.

## **Environments**

- **Preview**: every PR — Vercel Preview, isolated Supabase schema (optional)
    
- **Staging**: `main` branch — Vercel env = `staging`, Supabase project `staging`
    
- **Production**: tagged release — Vercel env = `production`, Supabase `prod`
    

## **Vercel CI/CD**

1. Import GitHub repo into Vercel
    
2. Set environment variables per env (same names as `.env`)
    
3. Enable **Protect Preview Deployments** if needed
    
4. Configure build output: Next.js defaults
    

## **Supabase Deploy (GitHub Actions)**

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

## **Domain & DNS Configuration**

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

## **Promotion Strategy**

- PR -> Preview -> merge to `main` -> auto deploy to **Staging**
    
- Tag `vX.Y.Z` -> deploy to **Production** (protected)
    

## **Migrations & Rollback**

- Prisma migrations versioned, applied via `supabase db push`
    
- Rollback by re-applying prior migration or hotfix migration
    
