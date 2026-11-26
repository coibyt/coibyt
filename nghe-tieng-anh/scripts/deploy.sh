#!/bin/bash
# Upload the website and the lesson folders to Hostinger over SSH (rsync).
#   bash scripts/deploy.sh            # site + all days (only changed files are sent)
#   bash scripts/deploy.sh days       # only web/public/days (after the nightly build)
# Needs: SSH host alias "nghe-hostinger" in ~/.ssh/config (Hostinger SSH key login) and
# NGHE_REMOTE_DIR, e.g. domains/varaaai.com/public_html/nghe  (default below).
set -euo pipefail
cd "$(dirname "$0")/.."
HOST="${NGHE_SSH_HOST:-nghe-hostinger}"
DIR="${NGHE_REMOTE_DIR:-domains/varaaai.com/public_html/nghe}"
ssh -o BatchMode=yes "$HOST" "mkdir -p $DIR/days"
if [ "${1:-}" != "days" ]; then
  (cd web && npm ci --no-audit --no-fund && npm run build)
  # site shell (dist minus days/, which is synced separately so old MP3s are never re-sent)
  rsync -az --delete --exclude 'days/' web/dist/ "$HOST:$DIR/"
fi
rsync -az web/public/days/ "$HOST:$DIR/days/"
latest=$(python3 -c "import json;print(json.load(open('web/public/days/index.json'))['days'][0]['date'])")
url="${NGHE_PUBLIC_URL:-https://varaaai.com/nghe}"
echo "$(curl -s -o /dev/null -w '%{http_code}' "$url/days/index.json") index.json"
echo "$(curl -s -o /dev/null -w '%{http_code}' -r 0-99 "$url/days/$latest/audio.mp3") audio $latest"
