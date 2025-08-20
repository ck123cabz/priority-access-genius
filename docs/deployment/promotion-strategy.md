# Deployment Environments and Promotion Strategy

This document outlines the deployment environments, promotion strategy, and operational procedures for the Genius Priority Access application.

## Environment Overview

The application uses a four-tier deployment strategy:

```
Development → Preview → Staging → Production
```

Each environment serves a specific purpose in the software delivery lifecycle.

## Environment Definitions

### 1. Development Environment

**Purpose**: Local development and testing
**Infrastructure**: Developer machines with local Supabase stack
**Access**: Individual developers

**Configuration**:
- **Platform**: Local (localhost:3000)
- **Database**: Local Supabase (localhost:54322)
- **Supabase**: Local stack (localhost:54321)
- **Data**: Seed data for development
- **Authentication**: Local test accounts

**Usage**:
- Feature development
- Unit testing
- Integration testing
- Debugging

### 2. Preview Environment

**Purpose**: Feature branch testing and pull request reviews
**Infrastructure**: Vercel preview deployments
**Access**: Development team and stakeholders

**Configuration**:
- **Platform**: Vercel preview URLs (dynamic)
- **Database**: Shared staging database
- **Supabase**: Staging project
- **Data**: Anonymized production-like data
- **Authentication**: Test accounts

**Trigger**: 
- Automatic on pull request creation
- Updated on each push to PR branch

**Usage**:
- Feature demonstrations
- Stakeholder reviews
- QA testing
- Integration validation

### 3. Staging Environment

**Purpose**: Pre-production testing and validation
**Infrastructure**: Vercel production-like environment
**Access**: QA team, product managers, and senior developers

**Configuration**:
- **Platform**: staging.yourdomain.com
- **Database**: Dedicated staging database
- **Supabase**: Staging project (isolated)
- **Data**: Production-like test data
- **Authentication**: Production-like user accounts

**Trigger**:
- Automatic on merge to main branch
- Manual promotion from approved PRs

**Usage**:
- End-to-end testing
- Performance testing
- Security testing
- User acceptance testing

### 4. Production Environment

**Purpose**: Live application serving real users
**Infrastructure**: Vercel production with high availability
**Access**: Production support team only

**Configuration**:
- **Platform**: yourdomain.com
- **Database**: Production database with backups
- **Supabase**: Production project (isolated)
- **Data**: Live user data
- **Authentication**: Real user accounts

**Trigger**:
- Manual promotion via tagged releases
- Requires approval workflow

**Usage**:
- Live user traffic
- Real business operations
- Production monitoring
- Customer support

## Promotion Strategy

### 1. Development to Preview

**Process**: Automatic
**Trigger**: Pull request creation
**Validation**: 
- Automated tests pass
- Code review initiated
- Environment validation successful

**Steps**:
1. Developer creates pull request
2. GitHub Actions triggers preview deployment
3. Vercel builds and deploys to preview URL
4. Automated tests run against preview environment
5. Preview URL shared with reviewers

### 2. Preview to Staging

**Process**: Semi-automatic
**Trigger**: Merge to main branch
**Validation**:
- Pull request approved by required reviewers
- All automated tests pass
- Security scans pass
- Performance requirements met

**Steps**:
1. Pull request approved and merged
2. GitHub Actions triggers staging deployment
3. Vercel deploys to staging environment
4. Supabase migrations applied to staging database
5. Automated smoke tests run
6. QA team notified for testing

### 3. Staging to Production

**Process**: Manual with approvals
**Trigger**: Tagged release with approval workflow
**Validation**:
- All staging tests pass
- Security review completed
- Performance benchmarks met
- Business stakeholder approval

**Steps**:
1. QA team validates staging deployment
2. Product manager approves release
3. DevOps creates release tag
4. Approval workflow initiated
5. Production deployment executed
6. Post-deployment validation
7. Monitoring and alerting activated

## Deployment Workflows

### Automated Deployment Pipeline

```yaml
# .github/workflows/deployment-pipeline.yml
name: Deployment Pipeline

on:
  pull_request:
    branches: [ main ]
  push:
    branches: [ main ]
  release:
    types: [ published ]

jobs:
  # ... test jobs ...
  
  deploy-preview:
    if: github.event_name == 'pull_request'
    needs: [test-suite]
    # Deploy to preview environment
    
  deploy-staging:
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    needs: [test-suite]
    # Deploy to staging environment
    
  deploy-production:
    if: github.event_name == 'release'
    needs: [test-suite]
    environment: production
    # Deploy to production environment
```

### Environment Protection Rules

```yaml
# GitHub Environment Protection Rules
environments:
  staging:
    protection_rules:
      - required_reviewers: 1
      - restrict_pushes: true
      - allowed_branches: [ main ]
      
  production:
    protection_rules:
      - required_reviewers: 2
      - restrict_pushes: true
      - deployment_branch_policy: tagged_releases
      - wait_timer: 300 # 5 minute delay
```

## Rollback Procedures

### Immediate Rollback (Production)

**Scenario**: Critical issue detected in production
**Timeline**: < 5 minutes
**Trigger**: Automated alerts or manual detection

**Process**:
1. **Immediate Response**
   - Stop incoming deployments
   - Assess impact and severity
   - Initiate rollback procedure

2. **Vercel Rollback**
   ```bash
   # Using Vercel CLI
   vercel rollback [deployment-url] --prod
   
   # Or via Vercel Dashboard
   # Navigate to Deployments > Select Previous Stable > Promote
   ```

3. **Database Rollback** (if needed)
   ```bash
   # Supabase migration rollback
   supabase db reset --db-url $PRODUCTION_DATABASE_URL
   supabase db push --db-url $PRODUCTION_DATABASE_URL --local
   ```

4. **Verification**
   - Run smoke tests
   - Check key metrics
   - Validate user functionality
   - Monitor error rates

### Gradual Rollback (Staging)

**Scenario**: Issues found during staging validation
**Timeline**: < 15 minutes
**Trigger**: Failed tests or QA issues

**Process**:
1. Identify problematic changes
2. Create hotfix branch if needed
3. Deploy fixed version to staging
4. Re-run validation tests
5. Document issues and resolution

## Health Checks and Monitoring

### Deployment Health Checks

```typescript
// Deployment health check endpoint
// /api/health
export async function GET() {
  const checks = await Promise.allSettled([
    // Database connectivity
    checkDatabase(),
    
    // Supabase connectivity
    checkSupabase(),
    
    // Essential services
    checkCriticalPaths(),
    
    // Environment configuration
    validateEnvironment(),
  ])
  
  const isHealthy = checks.every(check => check.status === 'fulfilled')
  
  return Response.json({
    status: isHealthy ? 'healthy' : 'unhealthy',
    checks: checks.map(check => ({
      status: check.status,
      result: check.status === 'fulfilled' ? check.value : check.reason
    })),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  })
}
```

### Monitoring Configuration

```yaml
# Deployment monitoring alerts
monitoring:
  health_checks:
    - endpoint: /api/health
      interval: 60s
      timeout: 10s
      
  metrics:
    - response_time: < 2000ms
    - error_rate: < 1%
    - availability: > 99.9%
    
  alerts:
    - type: deployment_failure
      channels: [slack, email]
      escalation: immediate
      
    - type: performance_degradation
      channels: [slack]
      escalation: 15m
```

## Environment Synchronization

### Data Synchronization

**Staging Data Refresh**:
- **Frequency**: Weekly or on-demand
- **Source**: Anonymized production data
- **Process**: Automated data pipeline
- **Validation**: Data integrity checks

**Preview Data**:
- **Source**: Staging environment
- **Consistency**: Shared across all preview deployments
- **Reset**: Daily or per deployment

### Configuration Synchronization

**Environment Variables**:
- Managed via infrastructure as code
- Validated during deployment
- Automatically synchronized across environments

**Database Schema**:
- Migrations applied in order: Preview → Staging → Production
- Rollback procedures documented and tested
- Schema validation at each stage

## Security Considerations

### Environment Isolation

1. **Network Separation**: Each environment uses isolated networks
2. **Data Isolation**: Separate databases and storage buckets
3. **Access Control**: Environment-specific access policies
4. **Secret Management**: Environment-specific secrets and keys

### Deployment Security

1. **Code Signing**: All releases signed and verified
2. **Vulnerability Scanning**: Automated security scans
3. **Dependency Checks**: Regular dependency updates
4. **Access Logs**: All deployment activities logged

## Performance Considerations

### Deployment Speed

- **Preview**: < 2 minutes
- **Staging**: < 5 minutes  
- **Production**: < 10 minutes

### Resource Allocation

```yaml
environments:
  preview:
    compute: basic
    database: shared
    
  staging:
    compute: standard
    database: dedicated
    
  production:
    compute: premium
    database: high-availability
```

## Troubleshooting Guide

### Common Issues

1. **Deployment Timeouts**
   - Check build logs
   - Verify resource allocation
   - Review dependency installation

2. **Database Migration Failures**
   - Validate migration scripts
   - Check database connectivity
   - Review schema compatibility

3. **Environment Variable Issues**
   - Verify all required variables set
   - Check variable format and values
   - Validate environment-specific settings

### Support Procedures

1. **Development Issues**: Developer self-service
2. **Preview Issues**: Development team support
3. **Staging Issues**: DevOps team involvement
4. **Production Issues**: Immediate escalation to on-call team

## Metrics and KPIs

### Deployment Metrics

- **Deployment Frequency**: Daily average deployments
- **Lead Time**: Time from commit to production
- **Mean Time to Recovery**: Time to resolve production issues
- **Change Failure Rate**: Percentage of deployments causing issues

### Success Criteria

- **Deployment Success Rate**: > 95%
- **Rollback Rate**: < 5%
- **Mean Time to Deploy**: < 10 minutes
- **Environment Uptime**: > 99.9%