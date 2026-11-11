#!/usr/bin/env bash
# Builds the web test version and writes a slim copy (only the files the
# browser needs) to OUT_DIR, ready to copy into babelisa/public<BASE_HREF>.
#   tool/build_web_lab.sh /lab/tracelight-xxxx/ /path/to/out
set -euo pipefail
BASE_HREF="${1:?base href, e.g. /lab/tracelight-xxxx/}"
OUT_DIR="${2:?output folder}"
cd "$(dirname "$0")/.."
flutter build web --release --no-web-resources-cdn --no-wasm-dry-run --base-href "$BASE_HREF"
rm -rf "$OUT_DIR" && mkdir -p "$OUT_DIR"
# CanvasKit is self-hosted (no Google CDN); skwasm/wimp/webparagraph are
# only used by --wasm builds, *.symbols only for debugging.
tar -C build/web -cf - \
  --exclude='*.symbols' --exclude='.last_build_id' --exclude='flutter_service_worker.js' \
  --exclude='canvaskit/skwasm*' --exclude='canvaskit/wimp*' --exclude='canvaskit/webparagraph' \
  . | tar -C "$OUT_DIR" -xf -
du -sh "$OUT_DIR"
