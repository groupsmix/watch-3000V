# Disaster Recovery Runbook

> **Last updated:** March 2026

---

## 1. Overview

This document describes how to recover the WristNerd site from common failure scenarios. All content is stored as Markdown files in the `content/` directory and tracked in Git, making recovery straightforward.

---

## 2. Recovery Scenarios

### 2.1 Application Down (Next.js crash / hosting outage)

**Symptoms:** Site returns 5xx errors or is unreachable.

**Steps:**
1. Check the health endpoint: `GET /api/health`
2. Review application logs for errors
3. Verify environment variables are set (especially `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`)
4. Restart the application process
5. If hosting provider is down, deploy to a secondary provider using the latest build artifact from GitHub Actions

### 2.2 Content Corruption or Accidental Deletion

**Symptoms:** Pages show wrong content, 404 on previously working pages.

**Steps:**
1. Content is version-controlled in Git — check `git log -- content/` for recent changes
2. Revert the problematic commit: `git revert <commit-sha>`
3. Alternatively, restore from backup:
   ```bash
   # List available backups
   ls -lt backups/wristnerd-content-*.tar.gz

   # Extract a specific backup (review before overwriting)
   mkdir /tmp/content-restore
   tar -xzf backups/wristnerd-content-20260318-020000.tar.gz -C /tmp/content-restore
   diff -r /tmp/content-restore/content content/

   # Apply the restore
   cp -r /tmp/content-restore/content/* content/
   ```
4. Rebuild and redeploy

### 2.3 Secret Compromise (JWT_SECRET, admin credentials leaked)

**Steps:**
1. **Immediately** rotate the `JWT_SECRET` in your hosting environment variables
2. Change `ADMIN_PASSWORD`, `EDITOR_PASSWORD`, `VIEWER_PASSWORD`
3. Redeploy the application (this invalidates all existing tokens)
4. Review access logs for unauthorized activity
5. If API keys (e.g. GA) were compromised, rotate them in their respective dashboards

### 2.4 Domain / DNS Issues

**Steps:**
1. Verify DNS records point to the correct hosting provider
2. Check SSL certificate status — auto-renewal should handle this, but verify:
   ```bash
   openssl s_client -connect wristnerd.xyz:443 -servername wristnerd.xyz < /dev/null 2>/dev/null | openssl x509 -noout -dates
   ```
3. If using Cloudflare/CDN, check the dashboard for any WAF blocks or DNS propagation issues
4. Ensure HSTS preload is still active if applicable

### 2.5 Full Environment Rebuild

If you need to rebuild the entire environment from scratch:

1. Clone the repository:
   ```bash
   git clone https://github.com/groupsmix/watch-3000V.git
   cd watch-3000V/frontend
   ```
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   # Fill in all required values
   ```
4. Build and start:
   ```bash
   npm run build
   npm start
   ```
5. Verify the health endpoint: `GET /api/health`

---

## 3. Backup Strategy

| What | Method | Frequency | Retention |
|------|--------|-----------|-----------|
| Content (Markdown) | `scripts/backup-content.sh` | Daily (cron) | 30 days |
| Source code | Git (GitHub) | Every push | Forever |
| Environment variables | Hosting provider secrets | On change | N/A |
| Build artifacts | GitHub Actions artifacts | Every CI run | 7 days |

### Setting up automated backups

```bash
# Add to crontab (runs daily at 2 AM)
crontab -e
0 2 * * * /path/to/watch-3000V/scripts/backup-content.sh >> /var/log/wristnerd-backup.log 2>&1
```

### Off-site backup (recommended)

For additional safety, sync backups to cloud storage:
```bash
# AWS S3 example
aws s3 sync backups/ s3://your-bucket/wristnerd-backups/ --storage-class STANDARD_IA

# Google Cloud Storage example
gsutil -m rsync -r backups/ gs://your-bucket/wristnerd-backups/
```

---

## 4. Monitoring & Alerts

### Health Check

The `/api/health` endpoint returns:
- `200` — Application healthy
- `503` — Degraded (missing required env vars)

Configure your monitoring tool (UptimeRobot, Pingdom, Datadog, etc.) to poll this endpoint every 60 seconds.

### Recommended Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Response time | > 2s | > 5s |
| Error rate | > 1% | > 5% |
| Uptime | < 99.9% | < 99% |
| SSL cert expiry | < 30 days | < 7 days |

---

## 5. Contact & Escalation

| Role | Responsibility |
|------|----------------|
| Site Admin | First responder — restart, redeploy, basic troubleshooting |
| DevOps | Infrastructure issues, DNS, hosting provider escalation |
| Developer | Code-level bugs, build failures, dependency issues |
