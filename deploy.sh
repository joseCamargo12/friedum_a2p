#!/bin/bash
# deploy.sh — Run this on your VPS to deploy/update friedum_a2p
# Usage: bash deploy.sh

set -e

REPO="https://github.com/joseCamargo12/friedum_a2p.git"
DEPLOY_DIR="/var/www/friedum_a2p"
NGINX_CONF="/etc/nginx/sites-available/friedum"
NGINX_ENABLED="/etc/nginx/sites-enabled/friedum"

echo "==> Pulling latest from GitHub..."
if [ -d "$DEPLOY_DIR/.git" ]; then
  cd "$DEPLOY_DIR" && git pull origin main
else
  git clone "$REPO" "$DEPLOY_DIR"
fi

echo "==> Setting permissions..."
chown -R www-data:www-data "$DEPLOY_DIR"
chmod -R 755 "$DEPLOY_DIR"

echo "==> Linking nginx config..."
if [ ! -f "$NGINX_CONF" ]; then
  cp "$DEPLOY_DIR/nginx.conf" "$NGINX_CONF"
  ln -sf "$NGINX_CONF" "$NGINX_ENABLED"
fi

echo "==> Testing nginx config..."
nginx -t

echo "==> Reloading nginx..."
systemctl reload nginx

echo "==> Done. Site live at https://friedum.com"
