#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/var/www/landing_page"
APP_NAME="landing_prod"

export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  . "$NVM_DIR/nvm.sh"
fi

echo ">>> Deploy START ($(date))"

cd "$APP_DIR"

echo ">>> Install deps"
npm install --legacy-peer-deps

echo ">>> Use .env.prod"
cp .env.prod .env

echo ">>> Build Next.js"
npm run build

echo ">>> Restart PM2"
if pm2 list | grep -q "$APP_NAME"; then
  pm2 restart "$APP_NAME" --update-env
else
  pm2 start npm --name "$APP_NAME" -- start
fi

pm2 save

echo ">>> Deploy DONE ($(date))"
