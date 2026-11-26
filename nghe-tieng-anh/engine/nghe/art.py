"""Cover art with kie.ai (model google/nano-banana, ≈4 kie credits per image).

Auth: the KIE_API_KEY env var if set (Bearer); inside Claude cloud sessions the network proxy
adds the credentials itself. Images are saved next to the day's audio and reused."""
from __future__ import annotations

import json
import os
import subprocess
import time
from pathlib import Path

import requests

from .content import load_day

API = "https://api.kie.ai/api/v1"
STYLE = ("Elegant editorial illustration, full-bleed and edge to edge with no border, no frame and no margin. "
         "Deep midnight indigo and plum palette with warm gold light and gold line accents, soft cinematic lighting, "
         "subtle paper grain, refined, calm and minimal, premium magazine style. "
         "Absolutely no text, no letters, no numbers, no logos.")


def _session() -> requests.Session:
    s = requests.Session()
    key = os.environ.get("KIE_API_KEY")
    if key:
        s.headers["Authorization"] = f"Bearer {key}"
    return s


def _content_box(img: Path, tol: int = 28) -> tuple[int, int, int, int] | None:
    """Bounding box (x, y, w, h) inside a uniform border, keeping the original aspect ratio; None if no border."""
    import numpy as np

    probe = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height",
                            "-of", "csv=p=0", str(img)], capture_output=True, text=True, check=True).stdout
    w, h = map(int, probe.strip().split(","))
    raw = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", str(img), "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
                         capture_output=True, check=True).stdout
    a = np.frombuffer(raw, dtype=np.uint8).reshape(h, w, 3).astype(int)
    corner = np.median(np.concatenate([a[:8, :8].reshape(-1, 3), a[-8:, -8:].reshape(-1, 3)]), axis=0)
    diff = np.abs(a - corner).sum(axis=2) > tol * 3
    rows = np.where(diff.mean(axis=1) > 0.2)[0]
    cols = np.where(diff.mean(axis=0) > 0.2)[0]
    if rows.size == 0 or cols.size == 0:
        return None
    y0, y1, x0, x1 = rows[0], rows[-1] + 1, cols[0], cols[-1] + 1
    if (x1 - x0) > 0.97 * w and (y1 - y0) > 0.97 * h:
        return None
    m = 6  # step inside the drawn frame line
    x0, y0, x1, y1 = x0 + m, y0 + m, x1 - m, y1 - m
    ratio = w / h
    bw, bh = x1 - x0, y1 - y0
    if bw / bh > ratio:
        nw = int(bh * ratio)
        x0 += (bw - nw) // 2
        bw = nw
    else:
        nh = int(bw / ratio)
        y0 += (bh - nh) // 2
        bh = nh
    return int(x0), int(y0), int(bw) // 2 * 2, int(bh) // 2 * 2


def generate(prompt: str, out: Path, size: str = "1:1", model: str = "google/nano-banana") -> Path:
    s = _session()
    r = s.post(f"{API}/jobs/createTask", json={"model": model, "input": {
        "prompt": f"{prompt}. {STYLE}", "output_format": "jpeg", "image_size": size}}, timeout=60)
    r.raise_for_status()
    body = r.json()
    if body.get("code") != 200:
        raise RuntimeError(f"kie.ai: {body}")
    tid = body["data"]["taskId"]
    for _ in range(90):
        time.sleep(4)
        d = s.get(f"{API}/jobs/recordInfo", params={"taskId": tid}, timeout=30).json()["data"]
        if d["state"] == "success":
            url = json.loads(d["resultJson"])["resultUrls"][0]
            raw = out.with_suffix(".src.jpg")
            raw.write_bytes(requests.get(url, timeout=120).content)
            # cut away any plain frame the model painted, then 1024 px wide, compressed
            crop = _content_box(raw)
            vf = (f"crop={crop[2]}:{crop[3]}:{crop[0]}:{crop[1]}," if crop else "") + "scale=1024:-2"
            subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-i", str(raw), "-vf", vf, "-q:v", "4", str(out)],
                           check=True)
            raw.unlink()
            return out
        if d["state"] == "fail":
            raise RuntimeError(f"kie.ai lỗi: {d.get('failMsg')}")
    raise RuntimeError("kie.ai quá thời gian chờ")


def cover_for_day(date: str, out_dir: Path, force: bool = False) -> Path:
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / "cover.jpg"
    if out.exists() and not force:
        print("Đã có", out)
        return out
    c = load_day(date)
    prompt = c["topic"].get("art_prompt") or f"A scene that shows: {c['topic']['en']}"
    generate(prompt, out)
    print("Ảnh bìa:", out)
    return out
