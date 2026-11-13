#!/usr/bin/env python3
"""Nén ảnh/video gốc (.raw/) thành tài nguyên nhẹ cho web (assets/).  python3 tools/finish.py"""
import json, pathlib, subprocess
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW, IMG, VID = ROOT / ".raw", ROOT / "assets/img", ROOT / "assets/video"
(IMG / "kf").mkdir(parents=True, exist_ok=True)
VID.mkdir(parents=True, exist_ok=True)


def webp(src, dst, size, q=78):
    if dst.exists() and dst.stat().st_mtime > src.stat().st_mtime:
        return
    im = Image.open(src).convert("RGB")
    im.thumbnail(size, Image.LANCZOS)
    im.save(dst, "WEBP", quality=q, method=6)


def mp4(src, dst, w, boomerang=False, crf=26):
    if dst.exists() and dst.stat().st_mtime > src.stat().st_mtime:
        return
    vf = f"scale={w}:-2:flags=lanczos,fps=24"
    if boomerang:
        fc = f"[0:v]{vf},split[a][b];[b]reverse,trim=start_frame=1[r];[a][r]concat=n=2:v=1[v]"
        args = ["-filter_complex", fc, "-map", "[v]"]
    else:
        args = ["-vf", vf]
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), *args, "-an", "-c:v", "libx264", "-preset", "slow",
                    "-crf", str(crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(dst)], check=True)


for name, out, size in [("coach_presenter", "coach.webp", (720, 960)), ("ivan_portrait", "ivan.webp", (600, 800)),
                        ("katya_portrait", "katya.webp", (600, 800)), ("bg_tall", "bg-tall.webp", (720, 1280)),
                        ("bg_wide", "bg-wide.webp", (1600, 900)), ("cover_the-luc", "cover-the-luc.webp", (800, 600)),
                        ("cover_da-ngoai", "cover-da-ngoai.webp", (800, 600)), ("cover_ban-sung", "cover-ban-sung.webp", (800, 600))]:
    if (RAW / f"{name}.png").exists():
        webp(RAW / f"{name}.png", IMG / out, size)
for name, out in [("presenter_idle", "coach-idle.mp4"), ("presenter_talk", "coach-talk.mp4")]:
    if (RAW / f"{name}.mp4").exists():
        mp4(RAW / f"{name}.mp4", VID / out, 540, boomerang=True, crf=27)
if (RAW / "presenter_idle.mp4").exists():
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(VID / "coach-idle.mp4"), "-frames:v", "1", "-q:v", "80", str(IMG / "coach-idle.webp")], check=True)
n = 0
for kf in sorted(RAW.glob("kf_tk*.png")):
    sid = kf.stem[3:]
    webp(kf, IMG / "kf" / f"{sid}.webp", (720, 720), 74)
    v = RAW / f"vid_{sid}.mp4"
    if v.exists():
        mp4(v, VID / f"{sid}.mp4", 720)
        n += 1
print("videos", n)

# Clip cắt ngắn (chỉ giữ phần đúng của clip AI): tên mới → (clip gốc, đến giây thứ mấy)
TRIMS = {"tk12-4-a": ("tk12-4", 2.4)}
for name, (src, to) in TRIMS.items():
    v = RAW / f"vid_{src}.mp4"
    if v.exists():
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(v), "-t", str(to), "-vf", "scale=720:-2:flags=lanczos,fps=24", "-an",
                        "-c:v", "libx264", "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(VID / f"{name}.mp4")], check=True)
        webp(RAW / f"kf_{src}.png", IMG / "kf" / f"{name}.webp", (720, 720), 74)
