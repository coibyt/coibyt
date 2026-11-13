#!/usr/bin/env bash
# Dựng file cài đặt CH Play (.aab) — mở miễn phí toàn bộ, có chế độ Toán + Tiếng Anh.
#
# CH Play giới hạn phần tải về chính 200 MB; giọng nói (~200 MB, mp3 32 kbps) được nén lại
# 24 kbps / 22 kHz CHỈ cho bản Android (bản web giữ nguyên), rồi trả lại thư mục gốc sau khi build.
#
# Dùng:  bash tool/build_android.sh
# Cần:   ffmpeg, Android SDK (ANDROID_HOME), khoá ký android/key.properties + android/upload-keystore.jks
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$PWD"
TMP="$(mktemp -d)"
ORIG="$ROOT/assets/voice.orig"
restore() {
  if [ -d "$ORIG" ]; then rm -rf "$ROOT/assets/voice"; mv "$ORIG" "$ROOT/assets/voice"; fi
  rm -rf "$TMP"
}
trap restore EXIT

echo "• Nén giọng nói cho Android (24 kbps)…"
mkdir -p "$TMP/voice"
cp "$ROOT/assets/voice/manifest.json" "$TMP/voice/"
find "$ROOT/assets/voice" -name '*.mp3' -print0 |
  xargs -0 -P "$(nproc)" -I{} sh -c 'ffmpeg -v error -y -f mp3 -i "$1" -vn -map 0:a:0 -ac 1 -ar 22050 -b:a 24k "$2/voice/$(basename "$1")"' _ {} "$TMP"
[ "$(find "$TMP/voice" -name '*.mp3' | wc -l)" -eq "$(find "$ROOT/assets/voice" -name '*.mp3' | wc -l)" ] || { echo "Thiếu file sau khi nén"; exit 1; }
mv "$ROOT/assets/voice" "$ORIG"
mv "$TMP/voice" "$ROOT/assets/voice"
du -sh "$ROOT/assets/voice"

echo "• Dựng app bundle…"
flutter build appbundle --release --dart-define=ALL_FREE=true
ls -lh build/app/outputs/bundle/release/app-release.aab
