#!/usr/bin/env bash
# Chép bản web đã build (build/web) vào repo Babelisa theo bố cục /lab/ của Babelisa:
#   public/lab/<SLUG>/          — mọi file (trừ .wasm)
#   lab-bin/<SLUG>/canvaskit/   — các file .wasm (máy chủ Hostinger phục vụ .wasm sai kiểu nếu để trong public/)
# Dùng:  tool/deploy_lab.sh <SLUG> <đường-dẫn-repo-babelisa>
# Build trước:  flutter build web --release --no-web-resources-cdn --base-href /lab/<SLUG>/ --dart-define=ALLOW_DEV_VIP=true
set -euo pipefail
SLUG="$1"; BAB="$2"
SRC="$(cd "$(dirname "$0")/.." && pwd)/build/web"
grep -q "<base href=\"/lab/$SLUG/\">" "$SRC/index.html" || { echo "build/web chưa build với --base-href /lab/$SLUG/"; exit 1; }
PUB="$BAB/public/lab/$SLUG"; BIN="$BAB/lab-bin/$SLUG"
rm -rf "$PUB" "$BIN"; mkdir -p "$PUB" "$BIN/canvaskit/chromium"
# Bản JS chỉ dùng canvaskit (đầy đủ) và canvaskit/chromium; bỏ skwasm/wimp/webparagraph (bản wasm), .symbols, service worker.
(cd "$SRC" && find . -type f \
  ! -name '*.wasm' ! -name '*.symbols' ! -name 'flutter_service_worker.js' \
  ! -path './canvaskit/skwasm*' ! -path './canvaskit/wimp*' ! -path './canvaskit/webparagraph/*' \
  -exec install -D -m 644 {} "$PUB/{}" \;)
install -m 644 "$SRC/canvaskit/canvaskit.wasm" "$BIN/canvaskit/canvaskit.wasm"
install -m 644 "$SRC/canvaskit/chromium/canvaskit.wasm" "$BIN/canvaskit/chromium/canvaskit.wasm"
# Cho Google lập chỉ mục (trang game, trang giới thiệu /hoc/ và sitemap.xml) — không thêm noindex nữa.
du -sh "$PUB" "$BIN"
# Trang giới thiệu Toán lớp 3 ở địa chỉ đẹp babelisa.com/toan-lop-3/ (địa chỉ chính cho Google; app vẫn ở /lab/<SLUG>/).
if [ "$SLUG" = "toan3-9yt2a3py" ] && [ -f "$SRC/hoc/index.html" ]; then
  install -D -m 644 "$SRC/hoc/index.html" "$BAB/public/toan-lop-3/index.html"
  echo "trang giới thiệu → public/toan-lop-3/index.html"
fi
