"""Xuất trang web tĩnh (site/) để đưa lên Hostinger: HTML/JS/CSS + data/*.json + media/ + img/."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

from . import config

PART_COVERS = {1: "img/season_01.webp", 2: "img/part_case.webp", 3: "img/part_money.webp", 4: "img/part_review.webp"}


def available_days(include_short: bool = True) -> list[dict]:
    """Ngày đã dựng xong (ưu tiên bản đầy đủ; nếu chỉ có bản thử thì dùng bản thử)."""
    out = []
    for d in sorted(config.OUTPUT_DIR.glob("day_*")):
        n = int(d.name.split("_")[1])
        full, short = d / f"day_{n:02d}.json", d / f"day_{n:02d}_short.json"
        src = full if full.exists() else (short if include_short and short.exists() else None)
        if src:
            out.append({"day": n, "json": src, "dir": d})
    return out


def day_entry(p: dict, data: dict) -> dict:
    return {"day": data["day"], "date": data["date"], "title_vi": data["title_vi"], "title_en": data.get("title_en"),
            "duration": data["duration"], "mode": data["mode"], "data": f"data/day_{data['day']:02d}.json",
            "base": f"media/day_{data['day']:02d}/",
            "parts": [{"part": x["part"], "title_vi": x["title_vi"], "title_en": x["title_en"]} for x in data["parts"]],
            "phrases": len([q for q in data["phrases"] if not q.get("review_only")]),
            "cover": PART_COVERS[1]}


def decorate(data: dict) -> dict:
    data = dict(data)
    for p in data["parts"]:
        p.setdefault("cover", PART_COVERS.get(p["part"]))
    data["covers"] = {str(k): v for k, v in PART_COVERS.items()}
    data["covers"]["0"] = "img/hero.webp"
    return data


def build_index() -> list[dict]:
    idx = []
    for p in available_days():
        data = json.loads(p["json"].read_text(encoding="utf-8"))
        idx.append(day_entry(p, data))
    return sorted(idx, key=lambda x: x["day"], reverse=True)


def export_site(dest: Path | None = None, copy_media: bool = True, log=print) -> Path:
    dest = dest or config.SITE_DIR
    if dest.exists():
        for sub in ("data", "img"):
            shutil.rmtree(dest / sub, ignore_errors=True)
    dest.mkdir(parents=True, exist_ok=True)
    for f in config.STATIC_DIR.iterdir():
        if f.is_file():
            shutil.copy2(f, dest / f.name)
    (dest / "data").mkdir(exist_ok=True)
    img_src = config.ASSETS_DIR / "img"
    (dest / "img").mkdir(exist_ok=True)
    for f in img_src.glob("*.webp"):
        shutil.copy2(f, dest / "img" / f.name)
    for f in (config.ASSETS_DIR / "icons").glob("*"):
        shutil.copy2(f, dest / f.name)
    idx = []
    for p in available_days():
        data = decorate(json.loads(p["json"].read_text(encoding="utf-8")))
        (dest / "data" / f"day_{data['day']:02d}.json").write_text(json.dumps(data, ensure_ascii=False),
                                                                    encoding="utf-8")
        idx.append(day_entry(p, data))
        if copy_media:
            md = dest / "media" / f"day_{data['day']:02d}"
            (md / "phrases").mkdir(parents=True, exist_ok=True)
            mp3 = p["dir"] / data["audio"]
            if not (md / mp3.name).exists() or (md / mp3.name).stat().st_size != mp3.stat().st_size:
                shutil.copy2(mp3, md / mp3.name)
            for f in (p["dir"] / "phrases").glob("*.mp3"):
                if not (md / "phrases" / f.name).exists():
                    shutil.copy2(f, md / "phrases" / f.name)
            for ext in (".vtt", "_transcript.md"):
                f = p["dir"] / (mp3.stem + ext)
                if f.exists():
                    shutil.copy2(f, md / f.name)
    idx.sort(key=lambda x: x["day"], reverse=True)
    (dest / "data" / "days.json").write_text(json.dumps(idx, ensure_ascii=False), encoding="utf-8")
    log(f"Đã xuất {len(idx)} ngày → {dest}")
    return dest
