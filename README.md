# Friedum — Static Landing Page

Marketing and waitlist landing page for **friedum.com**.  
Built for Twilio A2P 10DLC compliance and deployed as a static site on a VPS.

---

## Structure

```
friedum_a2p/
├── index.html          # Main landing page + waitlist form
├── privacy.html        # Privacy Policy (A2P compliant)
├── terms.html          # Terms of Service (TCPA/CTIA compliant)
├── favicon.svg
├── assets/
│   ├── css/
│   │   └── styles.css  # Full brand stylesheet
│   ├── js/
│   │   └── script.js   # Form validation + UI behavior
│   └── img/
│       └── logo.png
└── infra/
    ├── nginx.conf      # Production nginx config (SSL, gzip, cache)
    └── deploy.sh       # One-command VPS deploy script
```

---

## Local Development

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

---

## Deploy to VPS

### First deploy

```bash
# SSH into your VPS
ssh root@YOUR_VPS_IP

# Run the deploy script
bash <(curl -s https://raw.githubusercontent.com/joseCamargo12/friedum_a2p/main/infra/deploy.sh)

# Add SSL with certbot
apt install -y certbot python3-certbot-nginx
certbot --nginx -d friedum.com -d www.friedum.com
```

### Update after changes

```bash
ssh root@YOUR_VPS_IP
cd /var/www/friedum_a2p && git pull origin main
systemctl reload nginx
```

---

## A2P 10DLC Compliance

The opt-in form at `/#signup` includes all required Twilio/CTIA disclosures:

- SMS consent is **optional** and unchecked by default
- Message frequency, rates, STOP/HELP instructions visible inline
- Links to Privacy Policy and Terms of Service
- Privacy Policy explicitly states SMS opt-in data is never shared with third parties

---

## Brand

| Token | Value |
|---|---|
| Primary teal | `#00D1CA` |
| Charcoal | `#565F64` |
| Font | SF Pro / system-ui |

---

**Friedum Inc** · 1000 Brickell Plaza, Miami FL 33131 · admin@friedum.com
