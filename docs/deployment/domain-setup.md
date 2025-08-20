# Domain Setup Guide

## Production Domain Configuration

This guide documents the process for setting up the production domain and DNS configuration for the Priority Access system.

## Domain Requirements

- **Production Domain:** `geniuspriorityaccess.com` (or your chosen domain)
- **Staging Subdomain:** `staging.geniuspriorityaccess.com`
- **DNS Provider:** Cloudflare (recommended) or domain registrar DNS
- **SSL/TLS:** Automatically managed by Vercel

## Step 1: Domain Registration

### Required Actions:
1. Register domain through preferred registrar (e.g., Namecheap, GoDaddy, Cloudflare)
2. Choose a domain that reflects the Priority Access brand
3. Enable domain privacy protection (recommended)
4. Configure auto-renewal to prevent expiration

### Recommended Domain:
- Primary: `geniuspriorityaccess.com`
- Alternative: `priorityaccess.com` or similar professional domain

## Step 2: DNS Configuration

### Option A: Using Vercel Nameservers (Recommended)

1. Log into your domain registrar's control panel
2. Navigate to DNS/Nameserver settings
3. Replace existing nameservers with Vercel's:
   - `ns1.vercel-dns.com`
   - `ns2.vercel-dns.com`

### Option B: Using CNAME/A Records

If you prefer to keep your existing nameservers:

1. Add the following DNS records:

   **For Production (apex domain):**
   - Type: A
   - Name: @ (or blank)
   - Value: `76.76.21.21` (Vercel's IP)

   **For www subdomain:**
   - Type: CNAME
   - Name: www
   - Value: `cname.vercel-dns.com`

   **For Staging subdomain:**
   - Type: CNAME
   - Name: staging
   - Value: `cname.vercel-dns.com`

2. Set TTL to 3600 (1 hour) for all records

## Step 3: Vercel Integration

### Add Domain to Vercel Project:

1. Navigate to your Vercel project dashboard
2. Go to Settings → Domains
3. Add the following domains:
   - `geniuspriorityaccess.com` (production)
   - `www.geniuspriorityaccess.com` (redirect to apex)
   - `staging.geniuspriorityaccess.com` (staging environment)

### Configure Environment Routing:

1. In Vercel project settings:
   - Production domain → Production environment
   - Staging subdomain → Preview/Staging environment

2. Enable "Redirect www to Apex Domain" for consistent URLs

## Step 4: SSL Certificate Configuration

Vercel automatically provisions and renews SSL certificates via Let's Encrypt:

1. Certificates are issued within minutes of domain verification
2. Auto-renewal happens 30 days before expiration
3. Both production and staging domains receive certificates

## Step 5: DNS Propagation Verification

### Check DNS propagation status:

```bash
# Check A record
dig geniuspriorityaccess.com

# Check CNAME record
dig staging.geniuspriorityaccess.com

# Use online tool
# Visit: https://www.whatsmydns.net/
```

### Expected propagation time:
- Usually 1-4 hours
- Maximum 24-48 hours globally

## Step 6: Testing Domain Access

### Verify SSL/TLS:

```bash
# Test SSL certificate
curl -I https://geniuspriorityaccess.com

# Check certificate details
openssl s_client -connect geniuspriorityaccess.com:443 -servername geniuspriorityaccess.com
```

### Test environment routing:
- Production: `https://geniuspriorityaccess.com`
- Staging: `https://staging.geniuspriorityaccess.com`
- Preview: `https://priority-access-git-[branch]-[team].vercel.app`

## Environment-Specific Configuration

### Production Environment:
- Domain: `geniuspriorityaccess.com`
- Environment: `production`
- Branch: Tagged releases only
- Protection: Enabled

### Staging Environment:
- Domain: `staging.geniuspriorityaccess.com`
- Environment: `staging`
- Branch: `main`
- Protection: Optional

### Preview Environments:
- Domain: Auto-generated Vercel URLs
- Environment: `preview`
- Branch: Pull requests
- Protection: Configurable per PR

## Troubleshooting

### Common Issues:

1. **Domain not resolving:**
   - Verify nameserver changes have propagated
   - Check DNS records are correctly configured
   - Ensure domain is active and not expired

2. **SSL certificate errors:**
   - Wait for automatic provisioning (up to 10 minutes)
   - Verify domain ownership in Vercel
   - Check for CAA records that might block Let's Encrypt

3. **Wrong environment routing:**
   - Check Vercel domain settings
   - Verify Git branch protection rules
   - Review environment variable configuration

### Support Resources:
- Vercel Documentation: https://vercel.com/docs/concepts/projects/domains
- DNS Propagation Checker: https://www.whatsmydns.net/
- SSL Labs Test: https://www.ssllabs.com/ssltest/

## Security Considerations

1. **Domain Privacy:** Enable WHOIS privacy protection
2. **DNSSEC:** Consider enabling if supported by registrar
3. **CAA Records:** Add CAA records to restrict certificate authorities
4. **Preview Protection:** Enable Vercel's preview deployment protection

## Maintenance

### Regular Tasks:
- Monitor domain expiration dates
- Review SSL certificate status
- Check DNS resolution performance
- Update documentation for changes

### Annual Review:
- Verify domain auto-renewal
- Review DNS provider performance
- Audit subdomain usage
- Update security settings

## Next Steps

After completing domain setup:

1. Update environment variables with production URLs
2. Configure monitoring and alerting
3. Set up domain-specific analytics
4. Document domain in team knowledge base
5. Configure email authentication (SPF, DKIM, DMARC) if needed