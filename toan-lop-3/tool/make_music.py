#!/usr/bin/env python3
"""Tạo nhạc gameshow (bản quyền tự tạo) bằng Kie.ai (Suno) → assets/sounds/show_*.mp3.

  python3 tool/make_music.py            # tạo các bản còn thiếu
  python3 tool/make_music.py show_bg    # tạo lại một bản

Khoá: biến môi trường KIE_API_KEY (proxy của phiên làm việc tự gắn khoá). Cần ffmpeg để cắt/nén.
"""
import json
import os
import pathlib
import subprocess
import sys
import tempfile
import time
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "sounds"
API = "https://api.kie.ai/api/v1"
HEAD = {"Authorization": f"Bearer {os.environ.get('KIE_API_KEY', 'proxy-injected')}", "Content-Type": "application/json"}

# tên: (mô tả nhạc, cắt từ giây, độ dài giây, mờ dần cuối giây)
JOBS = {
    "show_bg": ("Original instrumental background music for a children's math quiz game show while thinking: suspenseful "
                "but friendly, steady pulsing synth bass, soft clock-like ticking percussion, shimmering bells and light "
                "strings, loopable, calm tension, 92 BPM, no vocals", 8, 48, 2),
    "show_intro": ("Original short bright fanfare opening for a children's quiz game show: brass and orchestral hits, "
                   "sparkling glockenspiel, exciting and joyful, big finish, no vocals", 0, 9, 1.5),
    "show_lock": ("Original short suspense drum roll with rising strings for a quiz show final answer moment, "
                  "dramatic but kid-friendly, building tension, no vocals", 0, 6, 0.5),
    "exam_bg": ("Original calm instrumental background music for children concentrating on a school math test: gentle "
                "soft piano, warm pads, light pizzicato strings and a soft steady pulse, peaceful, focused, encouraging, "
                "loopable, 80 BPM, no drums, no vocals", 6, 70, 3),
    "exam_start": ("Original short bright school bell chime and soft glockenspiel arpeggio signalling the start of a test, "
                   "friendly and clear, no vocals", 0, 5, 1),
    "exam_end": ("Original short gentle completion chime for a children's test ending: soft bells and harp glissando, "
                 "warm and reassuring, no vocals", 0, 6, 1.5),
    "show_win": ("Original short triumphant victory jingle for a children's quiz show: happy orchestral fanfare, "
                 "cymbal crash, sparkling bells, celebration, no vocals", 0, 8, 1.5),
}


def call(method, url, body=None):
    req = urllib.request.Request(url, method=method, headers=HEAD, data=json.dumps(body).encode() if body else None)
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read())


def generate(name):
    prompt, start, length, fade = JOBS[name]
    print(f"• {name}")
    task = call("POST", f"{API}/generate", {
        "prompt": prompt, "customMode": False, "instrumental": True, "model": "V4_5",
        "callBackUrl": "https://example.com/callback",  # bắt buộc với API; ta hỏi kết quả bằng record-info
    })["data"]["taskId"]
    for _ in range(80):
        time.sleep(10)
        d = call("GET", f"{API}/generate/record-info?taskId={task}")["data"]
        if d.get("status") == "SUCCESS":
            url = d["response"]["sunoData"][0]["audioUrl"]
            break
        if "FAIL" in str(d.get("status")) or "ERROR" in str(d.get("status")):
            sys.exit(f"[{name}] lỗi: {d.get('errorMessage')}")
    else:
        sys.exit(f"[{name}] quá thời gian")
    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as tmp:
        tmp.write(urllib.request.urlopen(url, timeout=120).read())
    OUT.mkdir(parents=True, exist_ok=True)
    dest = OUT / f"{name}.mp3"
    af = f"afade=t=in:st={start}:d=0.3,afade=t=out:st={start + length - fade}:d={fade}"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(start), "-t", str(length), "-i", tmp.name,
                    "-af", af.replace(f"st={start}:", "st=0:").replace(f"st={start + length - fade}", f"st={length - fade}"),
                    "-ac", "2", "-ar", "44100", "-b:a", "96k", str(dest)], check=True)
    os.unlink(tmp.name)
    print(f"  → {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    names = sys.argv[1:] or [n for n in JOBS if not (OUT / f"{n}.mp3").exists()]
    for n in names:
        generate(n)
