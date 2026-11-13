#!/usr/bin/env bash
# Build app Android "Toán Lớp 4" cho CH Play.
#   bash tool/build_android.sh          → build/app/outputs/bundle/release/app-release.aab  (tải lên Play Console)
#                                        build/app/outputs/flutter-apk/app-release.apk    (cài thử trên điện thoại)
# Cần: Android SDK (ANDROID_HOME), android/key.properties + android/upload-keystore.jks (chữ ký, KHÔNG đưa lên git).
# Giọng nói: bản Android dùng Opus (.android-voice/, do tool/android_voice.py tạo) để app dưới 200 MB của Google Play.
# Trong lúc build, assets/voice (MP3 của bản web) tạm đổi chỗ với .android-voice rồi trả lại như cũ.
set -euo pipefail
cd "$(dirname "$0")/.."
export ANDROID_HOME="${ANDROID_HOME:-/opt/android-sdk}"
FLUTTER="${FLUTTER:-flutter}"
command -v "$FLUTTER" >/dev/null || FLUTTER=/opt/flutter-sdk/flutter/bin/flutter
[ -f android/key.properties ] || echo "CHÚ Ý: thiếu android/key.properties → app ký bằng khoá debug, KHÔNG tải lên CH Play được."

python3 tool/android_voice.py

restore() {
  if [ -d .voice-mp3 ]; then
    [ -d assets/voice ] && mv assets/voice .android-voice
    mv .voice-mp3 assets/voice
  fi
}
trap restore EXIT
mv assets/voice .voice-mp3
mv .android-voice assets/voice

DEFINES=(--dart-define=ALL_FREE=true)
"$FLUTTER" build appbundle --release "${DEFINES[@]}"
"$FLUTTER" build apk --release "${DEFINES[@]}"
restore
trap - EXIT

ls -lh build/app/outputs/bundle/release/app-release.aab build/app/outputs/flutter-apk/app-release.apk
