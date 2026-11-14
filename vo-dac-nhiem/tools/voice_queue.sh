#!/usr/bin/env bash
# Thu giọng lần lượt cho các ngôn ngữ đã dịch xong (đã ĐẠT kiểm tra). Dùng: tools/voice_queue.sh ru zh de
cd "$(dirname "$0")/.."
for l in "$@"; do
  if python3 tools/i18n_check.py "$l" >/dev/null; then
    echo "== $l bắt đầu $(date +%H:%M)"; python3 tools/voice.py "$l" > ".raw/voice_$l.log" 2>&1; echo "== $l xong $(date +%H:%M) $(tail -n1 .raw/voice_$l.log)"
  else
    echo "== $l bỏ qua (bản dịch chưa đạt)"
  fi
done
