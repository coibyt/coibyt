"""Ảnh bìa (mùa, tập, trang web) bằng kie.ai (Nano Banana Pro). Khoá: KIE_API_KEY (trên cloud proxy tự chèn)."""
from __future__ import annotations

import json
import subprocess
import time
from pathlib import Path

import httpx

from . import config

CREATE = "https://api.kie.ai/api/v1/jobs/createTask"
STATUS = "https://api.kie.ai/api/v1/jobs/recordInfo"
MODEL = "nano-banana-pro"

STYLE = ("Premium editorial illustration for a luxury business-storytelling podcast. Cinematic lighting, rich deep "
         "aubergine and midnight-violet palette with warm antique-gold highlights (#b08a3e, #e8d3a6), subtle film "
         "grain, elegant negative space, sophisticated and calm, like a high-end magazine cover. No text, no letters, "
         "no numbers, no logos, no brand marks, no watermark.")

JOBS = {
    "hero": ("16:9", "A lone founder at night in a quiet Saigon coffee roastery, warm desk lamp, steam rising from a "
                     "cup, city lights through tall shutters, laptop glow, contemplative mood, seen from behind. "),
    "season_01": ("1:1", "An old French-colonial house in Saigon converted into a specialty coffee roastery at dusk, "
                         "copper roasting drum glowing, burlap coffee sacks, a runway of warm light on the tiled floor "
                         "leading to an open door, sense of ticking time. "),
    "part_case": ("1:1", "An empty vintage video-rental store aisle with shelves of blank DVD cases fading into "
                         "darkness, a single glowing modern screen at the end of the aisle, documentary mood. "),
    "part_money": ("1:1", "A young Vietnamese woman designer at a seaside café in Da Nang at golden hour, laptop and "
                          "a notebook with a single bold handwritten mark, sea and mountains softly blurred, calm "
                          "confidence, viewed from a respectful distance, face not detailed. "),
    "part_review": ("1:1", "Elegant gold index cards floating in a spiral above a dark violet desk, soft bokeh, "
                           "memory and rhythm, abstract and minimal. "),
    "d02_case": ("1:1", "A warm neighbourhood coffee shop at mid-afternoon with its door closed and a blank handwritten "
                        "paper note taped on the glass, inside baristas in aprons gather around an espresso machine "
                        "learning together, soft golden light, no logos, no brand colours, documentary mood. "),
    "d02_money": ("1:1", "A man in his thirties sitting alone at a kitchen table at two in the morning in a Hanoi apartment "
                         "in early winter, face lit only by a phone screen showing a falling red chart, a cup of tea "
                         "gone cold, misty window with street lights, viewed from the side, face not detailed. "),
    "icon": ("1:1", "A minimal emblem: a golden soundwave that becomes an upward business chart line inside a "
                    "deep violet circle, flat premium vector, centered, crisp edges, plain dark violet background. "),
}


def _head() -> dict:
    return {"Authorization": f"Bearer {config.env('KIE_API_KEY', 'proxy-injected')}", "Content-Type": "application/json"}


def generate(name: str, out_dir: Path | None = None, log=print) -> Path:
    aspect, prompt = JOBS[name]
    out_dir = out_dir or config.ASSETS_DIR / "img"
    out_dir.mkdir(parents=True, exist_ok=True)
    body = {"model": MODEL, "input": {"prompt": prompt + STYLE, "aspect_ratio": aspect, "resolution": "2K",
                                      "output_format": "png"}}
    with httpx.Client(timeout=60) as c:
        j = c.post(CREATE, headers=_head(), json=body).json()
        if j.get("code") != 200:
            raise RuntimeError(f"kie.ai createTask: {j.get('msg')}")
        task = j["data"]["taskId"]
        for _ in range(120):
            time.sleep(5)
            d = (c.get(STATUS, headers=_head(), params={"taskId": task}).json().get("data") or {})
            st = (d.get("state") or "").lower()
            if st == "success":
                res = d["resultJson"]
                res = json.loads(res) if isinstance(res, str) else res
                png = out_dir / f"{name}.png"
                png.write_bytes(c.get(res["resultUrls"][0], timeout=180).content)
                log(f"  {name}: xong (credit {d.get('creditsConsumed')})")
                return to_webp(png)
            if st == "fail":
                raise RuntimeError(f"kie.ai {name}: {d.get('failMsg')}")
    raise RuntimeError(f"kie.ai {name}: hết thời gian chờ")


def to_webp(png: Path, width: int = 1400) -> Path:
    """Nén cho web: webp chất lượng 82, chiều rộng tối đa `width`."""
    out = png.with_suffix(".webp")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(png), "-vf", f"scale='min({width},iw)':-2",
                    "-quality", "82", str(out)], check=True)
    return out
