# Environment Variables Management

This document provides comprehensive guidance on managing environment variables across all deployment environments for the Genius Priority Access application.

## Overview

Environment variables are securely managed across different environments:
- **Development**: Local `.env.local` files (not committed)
- **Preview**: Vercel environment variables for pull request deployments
- **Staging**: Vercel environment variables for main branch deployments
- **Production**: Vercel environment variables for tagged releases

## Required Environment Variables

### Core Application Variables

| Variable | Description | Required | Environment | Example |
|----------|-------------|----------|-------------|---------|
| `NODE_ENV` | Application environment | Yes | All | `development`, `staging`, `production` |
| `NODE_VERSION` | Node.js runtime version | Yes | All | `20` |
| `NEXT_TELEMETRY_DISABLED` | Disable Next.js telemetry | No | All | `1` |

### Supabase Configuration

| Variable | Description | Required | Environment | Security Level |
|----------|-------------|----------|-------------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes | All | Public |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes | All | Public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes | All | **SECRET** |

### Database Configuration

| Variable | Description | Required | Environment | Security Level |
|----------|-------------|----------|-------------|----------------|
| `DATABASE_URL` | Primary database connection | Yes | All | **SECRET** |
| `DIRECT_URL` | Direct database connection for migrations | No | All | **SECRET** |

### Authentication Configuration

| Variable | Description | Required | Environment | Security Level |
|----------|-------------|----------|-------------|----------------|
| `NEXTAUTH_SECRET` | NextAuth session encryption key | Yes | All | **SECRET** |
| `NEXTAUTH_URL` | Application base URL | Yes | All | Public |

### Domain Configuration

| Variable | Description | Required | Environment | Example |
|----------|-------------|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Application URL | Yes | All | `https://geniuspriorityaccess.com` |
| `NEXT_PUBLIC_ENVIRONMENT` | Environment name | Yes | All | `production`, `staging`, `development` |

### Feature Flags

| Variable | Description | Required | Environment | Default |
|----------|-------------|----------|-------------|---------|
| `ENABLE_ANALYTICS` | Enable analytics tracking | No | All | `false` |
| `ENABLE_DEBUG_LOGGING` | Enable debug logging | No | All | `false` |

## Environment-Specific Configuration

### Development Environment

**Location**: `.env.local` (local development)

```bash
# Development configuration
NODE_ENV=development
NODE_VERSION=20

# Supabase Local Stack
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

# Local Database
DATABASE_URL=postgresql://postgres:postgres@localhost:54322/postgres
DIRECT_URL=postgresql://postgres:postgres@localhost:54322/postgres

# Authentication
NEXTAUTH_SECRET=your-secure-development-secret-here
NEXTAUTH_URL=http://localhost:3000

# Feature Flags
ENABLE_ANALYTICS=false
ENABLE_DEBUG_LOGGING=true
```

### Staging Environment

**Location**: Vercel Project Settings > Environment Variables

```bash
# Staging configuration
NODE_ENV=staging
NODE_VERSION=20
VERCEL_ENV=preview

# Supabase Staging Project
NEXT_PUBLIC_SUPABASE_URL=https://staging-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[staging-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[staging-service-role-key]

# Staging Database
DATABASE_URL=postgresql://postgres:[password]@db.staging-project-ref.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[password]@db.staging-project-ref.supabase.co:5432/postgres

# Authentication
NEXTAUTH_SECRET=[staging-nextauth-secret]
NEXTAUTH_URL=https://staging.yourdomain.com

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_DEBUG_LOGGING=true
```

### Production Environment

**Location**: Vercel Project Settings > Environment Variables

```bash
# Production configuration
NODE_ENV=production
NODE_VERSION=20
VERCEL_ENV=production

# Supabase Production Project
NEXT_PUBLIC_SUPABASE_URL=https://prod-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[prod-anon-key]
SUPABASE_SERVICE_ROLE_KEY=[prod-service-role-key]

# Production Database
DATABASE_URL=postgresql://postgres:[password]@db.prod-project-ref.supabase.co:5432/postgres
DIRECT_URL=postgresql://postgres:[password]@db.prod-project-ref.supabase.co:5432/postgres

# Authentication
NEXTAUTH_SECRET=[prod-nextauth-secret]
NEXTAUTH_URL=https://yourdomain.com

# Feature Flags
ENABLE_ANALYTICS=true
ENABLE_DEBUG_LOGGING=false
```

## Security Best Practices

### Secret Management

1. **Never commit secrets to version control**
   - Use `.env.local` for local development
   - Add `.env.local` to `.gitignore`
   - Use platform-specific secret management (Vercel environment variables)

2. **Secret Rotation**
   - Rotate secrets regularly (quarterly minimum)
   - Update all environments simultaneously
   - Document rotation dates

3. **Access Control**
   - Limit access to production secrets
   - Use different keys for different environments
   - Monitor access logs

### Environment Validation

The application includes automatic environment validation:

```typescript
// Validation runs on application startup
import { env, validateStartup } from '@/lib/env-validation'

// Environment variables are validated on import
console.log(env.NODE_ENV) // Guaranteed to be valid

// Runtime validation
await validateStartup()
```

### Security Headers

Environment-specific security configurations:

```javascript
// Production security headers (vercel.json)
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

## Platform Configuration

### Vercel Environment Variables

1. **Access Vercel Dashboard**
   - Go to project settings
   - Navigate to "Environment Variables" section

2. **Environment Scopes**
   - **Development**: Local development values
   - **Preview**: Branch and PR deployments
   - **Production**: Main branch and tagged releases

3. **Variable Types**
   - **Plain Text**: For public variables
   - **Encrypted**: For sensitive values (recommended for all secrets)

### GitHub Secrets

Required for CI/CD workflows:

```bash
# GitHub Repository Settings > Secrets and Variables > Actions
VERCEL_TOKEN=[vercel-deploy-token]
VERCEL_ORG_ID=[vercel-organization-id]
VERCEL_PROJECT_ID=[vercel-project-id]

# Supabase Deployment
SUPABASE_ACCESS_TOKEN=[supabase-access-token]
SUPABASE_PROJECT_REF=[supabase-project-reference]
SUPABASE_SERVICE_ROLE_KEY=[supabase-service-role-key]

# Production deployment (separate project)
SUPABASE_PROD_ACCESS_TOKEN=[prod-supabase-access-token]
SUPABASE_PROD_PROJECT_REF=[prod-supabase-project-reference]
SUPABASE_PROD_SERVICE_ROLE_KEY=[prod-supabase-service-role-key]
```

## Troubleshooting

### Common Issues

1. **Environment validation errors**
   ```bash
   Error: NEXT_PUBLIC_SUPABASE_URL is required but not set
   ```
   **Solution**: Ensure all required variables are set in the target environment

2. **Invalid URL format**
   ```bash
   Error: NEXT_PUBLIC_SUPABASE_URL must be a valid URL
   ```
   **Solution**: Check URL format includes protocol (https://)

3. **JWT key validation failures**
   ```bash
   Error: Supabase anon key appears to be invalid
   ```
   **Solution**: Verify key starts with 'eyJ' and is properly copied

### Validation Commands

```bash
# Local validation
npm run dev # Validates environment on startup

# Manual validation
node -e "require('./src/lib/env-validation').validateStartup()"

# Environment-specific testing
NODE_ENV=production node -e "require('./src/lib/env-validation').validateStartup()"
```

### Debugging Environment Issues

1. **Enable debug logging**
   ```bash
   ENABLE_DEBUG_LOGGING=true
   DEBUG=true
   ```

2. **Check runtime environment**
   ```javascript
   import { env, getConfig } from '@/lib/env-validation'
   console.log('Environment:', env.NODE_ENV)
   console.log('Config:', getConfig())
   ```

3. **Validate Supabase connection**
   ```javascript
   import { validateSupabaseConnection } from '@/lib/env-validation'
   const isConnected = await validateSupabaseConnection()
   ```

## Monitoring and Alerting

### Environment Health Checks

1. **Startup Validation**: Automatic validation on application start
2. **Runtime Checks**: Periodic validation during application lifecycle
3. **Deployment Validation**: Verification during CI/CD pipeline

### Alerting

1. **Failed Validations**: Alert on environment validation failures
2. **Security Issues**: Alert on potential security misconfigurations
3. **Connection Failures**: Alert on database/Supabase connection issues

## Compliance and Auditing

### Audit Trail

1. **Environment Changes**: Log all environment variable changes
2. **Access Logs**: Monitor who accesses sensitive configurations
3. **Deployment History**: Track environment changes across deployments

### Compliance Requirements

1. **Data Protection**: Ensure sensitive data is properly encrypted
2. **Access Control**: Implement least-privilege access
3. **Documentation**: Maintain up-to-date documentation
4. **Regular Reviews**: Quarterly security reviews of environment configurations