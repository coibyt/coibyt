#!/usr/bin/env python3
"""Giọng nói cho bản Android (CH Play): chuyển assets/voice/*.mp3 → .android-voice/*.webm (Opus).

Lý do: Google Play giới hạn phần chính của app (base module) ở 200 MB nén; giọng MP3 (~190 MB) cộng mã
app vượt mức này. Opus 20 kbps cho giọng nói rõ như MP3 32 kbps mà nhẹ hơn khoảng 40%.
Android 5.0+ phát được Opus trong WebM. Bản web vẫn dùng MP3 (Safari cũ không phát Opus).

Chỉ chuyển file mới/đổi (so thời gian sửa), nên chạy lại rất nhanh. tool/build_android.sh gọi script này.
"""
import json
import os
import pathlib
import subprocess
from concurrent.futures import ThreadPoolExecutor

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "voice"
DST = ROOT / ".android-voice"
BITRATE = "20k"


def convert(mp3: pathlib.Path) -> bool:
    out = DST / (mp3.stem + ".webm")
    if out.exists() and out.stat().st_mtime >= mp3.stat().st_mtime:
        return False
    tmp = out.with_suffix(".tmp.webm")
    subprocess.run(
        ["ffmpeg", "-v", "error", "-y", "-i", str(mp3), "-ac", "1", "-c:a", "libopus", "-b:a", BITRATE,
         "-application", "voip", "-f", "webm", str(tmp)],
        check=True,
    )
    tmp.replace(out)
    return True


def main() -> None:
    DST.mkdir(exist_ok=True)
    mp3s = sorted(SRC.glob("*.mp3"))
    with ThreadPoolExecutor(os.cpu_count() or 4) as ex:
        changed = sum(ex.map(convert, mp3s))
    keep = {m.stem + ".webm" for m in mp3s} | {"manifest.json"}
    removed = 0
    for f in DST.iterdir():
        if f.name not in keep:
            f.unlink()
            removed += 1
    m = json.loads((SRC / "manifest.json").read_text())
    for line in m["lines"].values():
        if line["file"].endswith(".mp3"):
            line["file"] = line["file"][:-4] + ".webm"
    (DST / "manifest.json").write_text(json.dumps(m, ensure_ascii=False, indent=1))
    size = sum(f.stat().st_size for f in DST.iterdir()) / 1e6
    print(f"Giọng Android: {len(mp3s)} câu, chuyển mới {changed}, xoá {removed}, tổng {size:.0f} MB → {DST.name}/")


if __name__ == "__main__":
    main()
