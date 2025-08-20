# Deployment Rollback Procedures

This document provides step-by-step rollback procedures for all deployment environments, incident response protocols, and monitoring guidance.

## Quick Reference

### Emergency Production Rollback

**⚠️ For immediate production issues:**

```bash
# Option 1: Vercel Dashboard Rollback (Recommended)
# 1. Go to https://vercel.com/dashboard/deployments
# 2. Find the last working deployment
# 3. Click "..." → "Promote to Production"

# Option 2: Vercel CLI Rollback
vercel rollback https://app-hash.vercel.app --prod --token=$VERCEL_TOKEN

# Option 3: GitHub Revert and Redeploy
git revert HEAD
git push origin main
# Wait for automatic deployment
```

**Estimated Time**: 2-5 minutes

## Rollback Scenarios and Procedures

### 1. Application-Level Issues

**Symptoms**:
- HTTP 5xx errors
- Application crashes
- Performance degradation
- Functional regressions

**Rollback Strategy**: Application rollback only

#### Vercel Application Rollback

**Using Vercel Dashboard** (Recommended):

1. **Access Vercel Dashboard**
   - Navigate to: https://vercel.com/dashboard
   - Select the project: `genius-priority-access`

2. **Find Last Working Deployment**
   - Go to "Deployments" tab
   - Identify last stable deployment (before issue started)
   - Look for deployments with ✅ status

3. **Promote Previous Deployment**
   - Click the "..." menu on the stable deployment
   - Select "Promote to Production"
   - Confirm the promotion

4. **Verify Rollback**
   - Check production URL responds correctly
   - Run health check: `curl https://yourdomain.com/api/health`
   - Monitor error rates return to normal

**Using Vercel CLI**:

```bash
# 1. List recent deployments
vercel list --scope=team-name

# 2. Identify stable deployment URL
STABLE_DEPLOYMENT_URL="https://app-abc123.vercel.app"

# 3. Promote to production
vercel promote $STABLE_DEPLOYMENT_URL --prod --token=$VERCEL_TOKEN

# 4. Verify deployment
curl -f https://yourdomain.com/api/health
```

**Using Git Revert** (if recent deployment):

```bash
# 1. Identify problematic commit
git log --oneline -10

# 2. Revert the commit
git revert [commit-hash] --no-edit

# 3. Push to trigger redeployment
git push origin main

# 4. Monitor deployment progress
# Vercel will automatically deploy the reverted code
```

### 2. Database-Related Issues

**Symptoms**:
- Database connection errors
- Migration failures
- Data corruption or loss
- Performance issues with queries

**Rollback Strategy**: Database rollback + Application rollback

#### Database Rollback Procedure

**⚠️ Critical**: Database rollbacks can result in data loss. Always consult with data team first.

**For Supabase Migrations**:

```bash
# 1. Connect to Supabase project
supabase link --project-ref $SUPABASE_PROJECT_REF

# 2. Check migration history
supabase migration list

# 3. Identify target migration (before the problematic one)
TARGET_MIGRATION="20240101000000_stable_migration.sql"

# 4. Reset database to target state
supabase db reset --db-url $DATABASE_URL

# 5. Apply migrations up to target
supabase db push --db-url $DATABASE_URL --up-to $TARGET_MIGRATION

# 6. Verify database state
supabase db status
```

**For Emergency Database Restore**:

```bash
# 1. Stop application traffic (if possible)
# - Scale down application instances
# - Enable maintenance mode

# 2. Restore from backup
supabase db restore --project-ref $PROJECT_REF --backup-id $BACKUP_ID

# 3. Verify data integrity
# - Run data consistency checks
# - Verify critical data is intact

# 4. Restart application
# - Deploy stable application version
# - Monitor for errors
```

### 3. Environment Configuration Issues

**Symptoms**:
- Environment variable errors
- Configuration mismatches
- Authentication failures
- External service integration issues

**Rollback Strategy**: Environment configuration rollback

#### Environment Variable Rollback

**Vercel Environment Variables**:

1. **Access Vercel Project Settings**
   - Go to project settings → Environment Variables
   - Check "Deployments" tab for historical values

2. **Identify Changes**
   - Compare current values with last working deployment
   - Look for recently modified variables

3. **Revert Changes**
   - Update problematic variables to previous values
   - Redeploy application to apply changes

```bash
# Trigger redeployment after env var changes
vercel --prod --force
```

**GitHub Secrets Rollback**:

1. **Access Repository Settings**
   - Go to repository → Settings → Secrets and Variables

2. **Update Secrets**
   - Replace problematic secrets with previous values
   - Update all affected environments

3. **Trigger Redeployment**
   - Create empty commit or manual deployment
   ```bash
   git commit --allow-empty -m "Trigger redeployment after secret update"
   git push origin main
   ```

### 4. Third-Party Service Issues

**Symptoms**:
- External API failures
- Authentication service downtime
- CDN or storage issues

**Rollback Strategy**: Feature flags or graceful degradation

#### Feature Flag Rollback

```bash
# Update environment variables to disable problematic features
# Vercel Dashboard or CLI:
vercel env add ENABLE_FEATURE_X false --scope production
vercel --prod --force  # Force redeployment
```

#### Graceful Degradation

Implement fallback mechanisms in application code:

```typescript
// Example: Fallback for external service
try {
  const result = await externalService.call()
  return result
} catch (error) {
  // Log error and use fallback
  console.error('External service failed:', error)
  return fallbackResponse
}
```

## Monitoring and Detection

### Automated Monitoring

**Health Check Endpoints**:
- **Production**: https://yourdomain.com/api/health
- **Staging**: https://staging.yourdomain.com/api/health

**Monitoring Alerts**:
- Response time > 5 seconds
- Error rate > 5%
- Health check failures
- Database connectivity issues

### Manual Monitoring

**Key Metrics to Monitor**:
1. **Application Performance**
   - Response times
   - Error rates
   - Throughput

2. **Infrastructure Health**
   - Database connections
   - Memory usage
   - CPU utilization

3. **User Experience**
   - Core functionality working
   - Authentication flows
   - Critical user paths

**Monitoring Commands**:

```bash
# Health check
curl -f https://yourdomain.com/api/health | jq .

# Application logs (Vercel)
vercel logs --prod --limit=100

# Database status (Supabase)
supabase db status --project-ref $PROJECT_REF
```

## Incident Response Process

### 1. Detection and Assessment (0-5 minutes)

**Immediate Actions**:
1. **Verify the Issue**
   - Check monitoring dashboards
   - Confirm user reports
   - Test critical functionality

2. **Assess Impact**
   - Determine affected users
   - Identify business impact
   - Classify severity level

3. **Alert Team**
   - Notify on-call engineer
   - Create incident channel
   - Begin status page updates

**Severity Levels**:
- **P0 (Critical)**: Complete service outage
- **P1 (High)**: Major functionality impaired
- **P2 (Medium)**: Minor functionality issues
- **P3 (Low)**: Cosmetic or edge case issues

### 2. Immediate Response (5-15 minutes)

**For P0/P1 Incidents**:
1. **Execute Emergency Rollback**
   - Use Vercel dashboard for fastest rollback
   - Don't wait for root cause analysis

2. **Verify Resolution**
   - Test critical functionality
   - Monitor error rates
   - Check user reports

3. **Communicate Status**
   - Update status page
   - Notify stakeholders
   - Provide ETA for full resolution

### 3. Investigation and Fix (15+ minutes)

**After Service Restored**:
1. **Root Cause Analysis**
   - Analyze logs and metrics
   - Review recent changes
   - Identify failure points

2. **Implement Permanent Fix**
   - Create hotfix branch
   - Test thoroughly in staging
   - Deploy with extra monitoring

3. **Post-Incident Review**
   - Document incident timeline
   - Identify improvement opportunities
   - Update procedures if needed

## Rollback Validation

### Post-Rollback Checks

**Automated Validation**:
```bash
# Health check
curl -f https://yourdomain.com/api/health

# Critical path validation
curl -f https://yourdomain.com/api/auth/session
curl -f https://yourdomain.com/api/clients

# Performance check
time curl -s https://yourdomain.com > /dev/null
```

**Manual Validation**:
1. **Authentication Flow**
   - Login/logout functionality
   - User session handling
   - Permission checks

2. **Core Features**
   - Client management
   - Document generation
   - Real-time updates

3. **Data Integrity**
   - Recent data visible
   - No data corruption
   - Database connections stable

### Rollback Success Criteria

**Service Restoration**:
- ✅ Health checks passing
- ✅ Error rate < 1%
- ✅ Response times < 2s
- ✅ Core functionality working

**User Experience**:
- ✅ Users can access application
- ✅ Critical workflows functional
- ✅ No data loss reported
- ✅ Performance acceptable

## Communication Templates

### Incident Start Notification

```
🚨 INCIDENT: [P0/P1/P2] - [Brief Description]

STATUS: Investigating
START TIME: [timestamp]
IMPACT: [description of user impact]

ACTIONS:
- Investigating root cause
- Preparing rollback if needed
- Will update in 15 minutes

TEAM: @oncall-engineer @incident-lead
```

### Rollback Notification

```
🔄 ROLLBACK INITIATED: [Brief Description]

STATUS: Rolling back to stable version
ROLLBACK TIME: [timestamp]
ETA: 5-10 minutes

ACTIONS:
- Promoting stable deployment: [deployment-url]
- Monitoring service restoration
- Will confirm resolution shortly

TEAM: @oncall-engineer @incident-lead
```

### Resolution Notification

```
✅ RESOLVED: [Brief Description]

STATUS: Service restored
RESOLUTION TIME: [timestamp]
DURATION: [total incident duration]

ACTIONS TAKEN:
- Rolled back to stable deployment
- Verified service functionality
- Monitoring for stability

FOLLOW UP:
- Post-incident review scheduled
- Root cause analysis in progress
- Permanent fix planned for next sprint

TEAM: @oncall-engineer @incident-lead
```

## Best Practices

### Rollback Preparedness

1. **Regular Testing**
   - Test rollback procedures monthly
   - Validate backup restoration
   - Practice incident response

2. **Documentation**
   - Keep procedures up to date
   - Document environment specifics
   - Maintain contact information

3. **Monitoring**
   - Set up comprehensive alerts
   - Monitor key business metrics
   - Track deployment success rates

### Risk Mitigation

1. **Deployment Safety**
   - Use blue-green deployments
   - Implement canary releases
   - Maintain deployment logs

2. **Data Protection**
   - Regular database backups
   - Point-in-time recovery capability
   - Test restoration procedures

3. **Team Readiness**
   - On-call rotation coverage
   - Cross-training team members
   - Emergency contact procedures

## Tools and Resources

### Essential Tools

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **GitHub Repository**: https://github.com/org/genius-priority-access
- **Monitoring Dashboard**: [Your monitoring solution]

### Emergency Contacts

- **On-call Engineer**: [Contact information]
- **DevOps Lead**: [Contact information]
- **Product Manager**: [Contact information]
- **Business Stakeholder**: [Contact information]

### Reference Links

- **Status Page**: https://status.yourdomain.com
- **Incident Response Playbook**: [Internal wiki link]
- **Architecture Documentation**: docs/architecture/
- **Environment Configuration**: docs/deployment/environment-variables.md