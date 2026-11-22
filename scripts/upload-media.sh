#!/bin/bash
# Upload videos to the media folder on Hostinger (served at https://varaaai.com/media/…, see src/lib/media.ts).
# Videos are NOT committed to git (the repo got too big for Hostinger to clone, 2026-11-22): keep them under
# public/academy/… or public/social/… locally (ignored by git), then run this. Paths are kept:
# public/academy/en/x.mp4 → public_html/media/academy/en/x.mp4.
#   bash scripts/upload-media.sh                      # every .mp4 under public/academy and public/social
#   bash scripts/upload-media.sh public/academy/x.mp4 # only these files
# Needs the SSH host "varaaai-media" in ~/.ssh/config (Hostinger SSH key login).
set -euo pipefail
cd "$(dirname "$0")/../public"
if [ $# -gt 0 ]; then
  files=$(for f in "$@"; do echo "${f#public/}"; done)
else
  files=$(find academy social -name '*.mp4')
fi
echo "$files" | tar cf - -T - | ssh -o BatchMode=yes varaaai-media 'mkdir -p ~/domains/varaaai.com/public_html/media && tar xf - -C ~/domains/varaaai.com/public_html/media'
for f in $(echo "$files" | head -3); do
  echo "$(curl -s -o /dev/null -w '%{http_code}' -I "https://varaaai.com/media/$f") $f"
done
