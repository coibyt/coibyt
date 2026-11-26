"""Đường dẫn, biến môi trường và cấu hình giọng đọc."""
from __future__ import annotations

import json
import os
from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG_DIR = ROOT / "config"
CONTENT_DIR = ROOT / "content"
DAYS_DIR = CONTENT_DIR / "days"
OUTPUT_DIR = ROOT / "output"
CACHE_DIR = ROOT / "cache"
DATA_DIR = ROOT / "data"
SITE_DIR = ROOT / "site"
ASSETS_DIR = ROOT / "assets"
STATIC_DIR = Path(__file__).resolve().parent / "web" / "static"

# Kế hoạch thời lượng (phút) — Phần 1–3 mỗi phần 3 lớp, Phần 4 ôn tập.
LAYER_TARGET_MIN = {1: 15.0, 2: 8.0, 3: 12.0}
LAYER_TOLERANCE_MIN = {1: 3.0, 2: 2.0, 3: 3.0}
# Kịch bản v2 (từ ngày 2): thêm 8–12 từ vựng + 4–6 câu nghe hiểu mỗi phần → Lớp 1, 2 dài hơn.
LAYER_TARGET_MIN_V2 = {1: 16.0, 2: 12.5, 3: 12.0}
LAYER_TOLERANCE_MIN_V2 = {1: 3.0, 2: 3.0, 3: 3.0}
REVIEW_TARGET_MIN = 18.0
SRS_INTERVALS = [1, 3, 7, 14]

# Tốc độ đọc đo thật trên 11max (eleven_flash_v2_5), ký tự/giây ở tốc độ 1.0, đã gồm ngắt câu.
# `bizstory calibrate` cập nhật từ các clip đã thu.
DEFAULT_CHARS_PER_SEC = {"vi": 15.8, "en": 16.4}
CREDITS_PER_CHAR = 0.5  # flash v2.5 trên 11max: 29 ký tự → 15 credit


def load_dotenv(path: Path | None = None) -> None:
    """Đọc .env đơn giản (KEY=VALUE), không ghi đè biến đã có."""
    p = path or ROOT / ".env"
    if not p.exists():
        return
    for line in p.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        v = v.split(" #", 1)[0].strip().strip('"').strip("'")
        if v:
            os.environ.setdefault(k.strip(), v)


load_dotenv()


def env(name: str, default: str = "") -> str:
    return os.environ.get(name, default).strip()


@dataclass(frozen=True)
class Voice:
    key: str
    id: str
    lang: str
    name: str
    gender: str


@lru_cache
def voice_config() -> dict:
    return json.loads((CONFIG_DIR / "voices.json").read_text(encoding="utf-8"))


def voices() -> dict[str, Voice]:
    return {k: Voice(key=k, **v) for k, v in voice_config()["voices"].items()}


def part_host(part: int) -> str:
    return voice_config()["part_hosts"].get(str(part), "vn_linh")


def part_cohost(part: int) -> str:
    """Giọng Việt thứ hai: giải nghĩa từ vựng, hỏi xen, đọc nghĩa câu nghe hiểu."""
    return voice_config().get("part_cohosts", {}).get(str(part), "vn_lily")


def phrase_voices() -> list[str]:
    return voice_config()["phrase_voices"]


def tts_speed(lang: str) -> float:
    return float(voice_config().get("tts_speed", {}).get(lang, 1.0))


def calibration_path() -> Path:
    return DATA_DIR / "calibration.json"


def chars_per_sec() -> dict[str, float]:
    p = calibration_path()
    rates = dict(DEFAULT_CHARS_PER_SEC)
    if p.exists():
        try:
            rates.update(json.loads(p.read_text()))
        except (ValueError, OSError):
            pass
    return rates
