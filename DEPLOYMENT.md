# Deployment Guide

This guide covers deploying the FactWise Dashboard to various hosting platforms.

## Prerequisites

Build the production bundle:

```bash
npm run build
```

This creates an optimized build in the `dist/` directory.

## Vercel (Recommended)

### Method 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link/create a project

4. For production:
   ```bash
   vercel --prod
   ```

### Method 2: Vercel Dashboard

1. Push code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel auto-detects Vite settings
6. Click "Deploy"

**Configuration**: No configuration needed! Vercel auto-detects Vite.

## Netlify

### Method 1: Drag & Drop

1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder to Netlify
4. Your site is live!

### Method 2: Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

3. Select `dist` as the publish directory

### Method 3: Git Integration

1. Push code to GitHub
2. Go to Netlify dashboard
3. Click "New site from Git"
4. Connect repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Deploy!

## GitHub Pages

1. Install gh-pages:
   ```bash
   npm install -g gh-pages
   ```

2. Add to `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/factwise-dashboard",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

4. Enable GitHub Pages in repository settings

## AWS S3 + CloudFront

### S3 Setup

1. Create S3 bucket
2. Enable static website hosting
3. Upload `dist/` contents:
   ```bash
   aws s3 sync dist/ s3://your-bucket-name --delete
   ```

4. Set bucket policy for public access:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

### CloudFront (Optional, for CDN)

1. Create CloudFront distribution
2. Set origin to S3 bucket
3. Configure default root object: `index.html`
4. Deploy and wait for distribution

## Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript application/json;
}
```

Build and run:

```bash
docker build -t factwise-dashboard .
docker run -p 8080:80 factwise-dashboard
```

## Azure Static Web Apps

1. Push code to GitHub
2. Go to Azure Portal
3. Create new Static Web App
4. Connect GitHub repository
5. Build settings:
   - App location: `/`
   - API location: (leave empty)
   - Output location: `dist`
6. Deploy

## Railway

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Select your repository
6. Railway auto-detects and deploys

## Custom Server (Node.js)

Create `server.js`:

```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

Deploy:

```bash
npm run build
node server.js
```

## Environment Variables

For different environments, create `.env` files:

**.env.development**:
```
VITE_API_URL=http://localhost:3000/api
```

**.env.production**:
```
VITE_API_URL=https://api.production.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Optimization

After deployment:

1. **Enable Compression**: Ensure gzip/brotli is enabled
2. **Set Cache Headers**: Cache static assets
3. **Use CDN**: Distribute globally
4. **Monitor**: Set up analytics and error tracking

## Monitoring

Recommended services:
- **Sentry**: Error tracking
- **Google Analytics**: Usage analytics
- **Lighthouse**: Performance monitoring
- **Uptime Robot**: Availability monitoring

## SSL/HTTPS

All recommended platforms (Vercel, Netlify, etc.) provide free SSL certificates automatically.

For custom servers, use [Let's Encrypt](https://letsencrypt.org/).

## Troubleshooting

**404 on page refresh?**
Configure your server to redirect all routes to `index.html`

**Assets not loading?**
Check the base path in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/your-subdirectory/', // if deployed to subdirectory
});
```

**Slow load times?**
- Enable compression
- Use CDN
- Optimize images
- Check bundle size

## CI/CD

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run deploy
```

---

Choose the platform that best fits your needs. For quickest deployment with zero configuration, use **Vercel** or **Netlify**.
