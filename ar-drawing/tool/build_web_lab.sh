#!/usr/bin/env bash
# Builds the web test version for Babelisa.
#   tool/build_web_lab.sh /hoc-ve-to-mau/choi/ /path/to/babelisa   (public game)
#   tool/build_web_lab.sh /lab/tracelight-xxxx/ /path/to/babelisa  (private test)
# Writes the page under <babelisa>/public/ and the .wasm files under
# <babelisa>/lab-bin/ (served by Babelisa's server.js as application/wasm).
#
# Why two places: Hostinger's front web server serves files found in public/
# itself and labels .wasm as text/plain, which browsers refuse to run (the app
# then hangs on the loading screen). Files kept outside public/ reach Node, and
# Babelisa's server.js serves lab-bin/ with Content-Type application/wasm.
set -euo pipefail
BASE_HREF="${1:?base href, e.g. /hoc-ve-to-mau/choi/ or /lab/tracelight-xxxx/}"
BABELISA="${2:?path to the babelisa checkout}"
case "$BASE_HREF" in
  /lab/*)
    # private test build: lab-bin/<name> is served under /lab
    NAME="$(basename "$BASE_HREF")"
    PAGE="$BABELISA/public/lab/$NAME"
    WASM="$BABELISA/lab-bin/$NAME" ;;
  *)
    # public build, e.g. /hoc-ve-to-mau/choi/: lab-bin mirrors the URL path
    PAGE="$BABELISA/public${BASE_HREF%/}"
    WASM="$BABELISA/lab-bin${BASE_HREF%/}" ;;
esac
cd "$(dirname "$0")/.."
flutter build web --release --no-web-resources-cdn --no-wasm-dry-run --base-href "$BASE_HREF"
rm -rf "$PAGE" "$WASM" && mkdir -p "$PAGE" "$WASM"
# CanvasKit is self-hosted (no Google CDN); skwasm/wimp/webparagraph are only
# used by --wasm builds, *.symbols only for debugging.
tar -C build/web -cf - \
  --exclude='*.symbols' --exclude='.last_build_id' --exclude='flutter_service_worker.js' \
  --exclude='canvaskit/skwasm*' --exclude='canvaskit/wimp*' --exclude='canvaskit/webparagraph' \
  . | tar -C "$PAGE" -xf -
(cd "$PAGE" && find . -name '*.wasm' -print0 | while IFS= read -r -d '' f; do
  mkdir -p "$WASM/$(dirname "$f")" && mv "$f" "$WASM/$f"
done)
du -sh "$PAGE" "$WASM"
