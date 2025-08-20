# Vercel Deployment Setup

This document provides step-by-step instructions for configuring Vercel deployment integration for the Genius Priority Access application.

## Prerequisites

1. Vercel account with appropriate permissions
2. GitHub repository access
3. Supabase project configured and running

## Vercel Project Configuration

### 1. Import GitHub Repository into Vercel

1. Log into [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import the GitHub repository: `genius-priority-access-final`
4. Configure the following settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web`
   - **Build Command**: `cd apps/web && pnpm build`
   - **Output Directory**: `apps/web/.next`
   - **Install Command**: `pnpm install --frozen-lockfile`

### 2. Configure Environment Variables

Set the following environment variables in Vercel project settings:

#### Production Environment

```env
NEXT_PUBLIC_SUPABASE_URL=https://[project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[anon-key]
SUPABASE_SERVICE_ROLE_KEY=[service-role-key]
DATABASE_URL=postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres
NODE_VERSION=20
NEXT_TELEMETRY_DISABLED=1
```

#### Preview Environment

```env
NEXT_PUBLIC_SUPABASE_URL=https://[staging-project-ref].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[staging-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[staging-service-role-key]
DATABASE_URL=postgresql://postgres:[password]@db.[staging-project-ref].supabase.co:5432/postgres
NODE_VERSION=20
NEXT_TELEMETRY_DISABLED=1
```

#### Development Environment

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
NODE_VERSION=20
```

### 3. Configure GitHub Secrets

Add the following secrets to your GitHub repository settings:

```env
VERCEL_TOKEN=[vercel-token]
VERCEL_ORG_ID=[org-id]
VERCEL_PROJECT_ID=[project-id]
```

To get these values:

1. **VERCEL_TOKEN**: Generate in Vercel Settings > Tokens
2. **VERCEL_ORG_ID**: Found in Vercel project settings, or run `vercel org ls`
3. **VERCEL_PROJECT_ID**: Found in Vercel project settings, or in `.vercel/project.json`

### 4. Configure Build Settings

In the Vercel project settings:

1. **Build & Development Settings**:
   - Framework Preset: Next.js
   - Build Command: `cd apps/web && pnpm build`
   - Output Directory: `apps/web/.next`
   - Install Command: `pnpm install --frozen-lockfile`
   - Development Command: `cd apps/web && pnpm dev`

2. **Functions**:
   - Node.js Version: 20.x
   - Regions: All regions (or specify based on user base)

3. **Security Headers**: Already configured in `vercel.json`

### 5. Configure Domains

1. **Production Domain**: Configure custom domain if needed
2. **Preview Domains**: Automatic Vercel preview URLs for pull requests

## Deployment Workflows

### Automatic Deployments

- **Production**: Triggered on push to `main` branch
- **Preview**: Triggered on pull request creation/updates
- **Branch**: Triggered on push to any branch (if enabled)

### Manual Deployments

Using Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### GitHub Actions Integration

The repository includes `.github/workflows/vercel-deploy.yml` which:

1. Runs on push to main and pull requests
2. Builds the application with proper environment setup
3. Deploys to Vercel using CLI
4. Comments on PRs with preview URLs
5. Provides deployment status updates

## Environment Promotion Strategy

1. **Development**: Local development with local Supabase
2. **Preview**: Pull request deployments with staging Supabase
3. **Staging**: Main branch deployments with staging Supabase
4. **Production**: Tagged releases with production Supabase

## Monitoring and Troubleshooting

### Vercel Dashboard Monitoring

1. **Functions**: Monitor serverless function performance
2. **Analytics**: Track page views and performance metrics
3. **Speed Insights**: Monitor Core Web Vitals
4. **Logs**: Review build and runtime logs

### Common Issues

1. **Build Failures**:
   - Check environment variables are set
   - Verify pnpm lockfile is up to date
   - Check Node.js version compatibility

2. **Runtime Errors**:
   - Review function logs in Vercel dashboard
   - Check Supabase connection configuration
   - Verify database migrations are applied

3. **Performance Issues**:
   - Review bundle size and optimize imports
   - Check for memory leaks in serverless functions
   - Monitor database query performance

### Rollback Procedures

1. **Immediate Rollback**: Use Vercel dashboard to promote previous deployment
2. **Git Rollback**: Revert commit and push to trigger new deployment
3. **Hotfix**: Create hotfix branch, deploy to preview, then merge to main

## Security Considerations

1. **Environment Variables**: Never commit secrets to repository
2. **Access Control**: Limit Vercel project access to necessary team members
3. **Domain Security**: Configure proper HTTPS and security headers
4. **Dependency Security**: Regular updates and vulnerability scanning

## Compliance and Auditing

1. **Deployment Logs**: All deployments logged in Vercel and GitHub
2. **Access Logs**: Track who deploys what and when
3. **Change Management**: All changes via pull requests with review
4. **Rollback Capability**: Quick rollback procedures documented and tested