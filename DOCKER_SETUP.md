# Docker Deployment Setup

This setup allows you to run your Priority Access Genius application in Docker using your **live Supabase** instance instead of Vercel.

## 🚀 Quick Start

### 1. Prerequisites
- Docker and Docker Compose installed
- Access to your live Supabase project

### 2. Configuration
1. **Copy environment template:**
   ```bash
   cp .env.docker .env.docker.local
   ```

2. **Fill in your Supabase values in `.env.docker.local`:**
   - Get values from: https://app.supabase.com/project/[your-project-id]/settings/api
   - Replace `your-project-ref` with your actual project reference
   - Replace `your-password` with your database password
   - Generate NEXTAUTH_SECRET: `openssl rand -base64 32`

### 3. Deploy

**Production deployment:**
```bash
./docker-deploy.sh
```

**Development deployment:**
```bash
docker-compose -f docker-dev.yml up --build
```

## 📁 Files Created

- `Dockerfile` - Multi-stage Next.js build
- `docker-compose.yml` - Production configuration
- `docker-dev.yml` - Development configuration
- `.env.docker` - Environment template
- `.dockerignore` - Build optimization
- `docker-deploy.sh` - Deployment script

## 🔧 Configuration Details

### Environment Variables (.env.docker)
```bash
# Your live Supabase project
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Database connection
DATABASE_URL=postgresql://postgres:password@db.your-project-ref.supabase.co:5432/postgres
```

### Next.js Configuration
- Updated `apps/web/next.config.mjs` with `output: 'standalone'` for Docker optimization

## 🌐 Access

Once deployed:
- **Application:** http://localhost:3000
- **Health check:** http://localhost:3000/api/health

## 🛠 Commands

```bash
# Build only
docker build -t priority-access-genius .

# Start production
docker-compose up -d

# Start development with hot reload
docker-compose -f docker-dev.yml up -d

# View logs
docker-compose logs -f web

# Stop containers
docker-compose down

# Rebuild and restart
docker-compose up --build -d
```

## 🔍 Differences from Vercel

✅ **Advantages:**
- Full control over deployment environment
- Can run on any server/cloud provider
- Better for custom server configurations
- Cost-effective for sustained traffic

⚠️ **Considerations:**
- No automatic deployments (set up CI/CD separately)
- Need to handle SSL certificates manually for HTTPS
- No built-in CDN (consider adding CloudFlare)
- Manual server management

## 🚨 Security Notes

1. **Never commit `.env.docker.local`** - contains production secrets
2. **Use HTTPS in production** - add reverse proxy (nginx/traefik)
3. **Update NEXTAUTH_URL** to your actual domain in production
4. **Set strong NEXTAUTH_SECRET** - generate new one for production

## 📦 Production Deployment

For production servers:

1. **Copy files to server:**
   ```bash
   scp docker-compose.yml .env.docker your-server:~/app/
   ```

2. **SSH to server and run:**
   ```bash
   cd ~/app
   # Edit .env.docker with production values
   docker-compose up -d
   ```

3. **Add reverse proxy (nginx example):**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

## ✅ Setup Complete!

Your application is now running in Docker with your live Supabase backend! 🎉