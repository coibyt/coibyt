"""Load and check a day's content (content/days/YYYY-MM-DD.json)."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
CONTENT_DIR = ROOT / "content"
DAYS_DIR = CONTENT_DIR / "days"


class ContentError(ValueError):
    pass


def _norm(s: str) -> str:
    s = s.lower().replace("’", "'")
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9' ]+", " ", s)).strip()


def phrase_core(en: str) -> str:
    """The part of a phrase that must appear verbatim in a dialogue ("Have a good one!" -> "have a good one")."""
    return _norm(en)


def load_day(date: str) -> dict:
    path = DAYS_DIR / f"{date}.json"
    if not path.exists():
        raise ContentError(f"Không có nội dung cho ngày {date}: {path}")
    data = json.loads(path.read_text(encoding="utf-8"))
    validate(data)
    return data


def load_narration() -> dict:
    return json.loads((CONTENT_DIR / "narration.json").read_text(encoding="utf-8"))


def validate(d: dict) -> list[str]:
    """Raise ContentError on hard problems; return soft warnings."""
    errs: list[str] = []
    warns: list[str] = []
    for k in ("date", "day_number", "level", "topic", "phrases", "dialogues", "listening"):
        if k not in d:
            errs.append(f"thiếu trường '{k}'")
    if errs:
        raise ContentError("; ".join(errs))

    phrases = d["phrases"]
    if len(phrases) != 15:
        errs.append(f"cần đúng 15 cụm từ, đang có {len(phrases)}")
    ids = [p["id"] for p in phrases]
    if len(set(ids)) != len(ids):
        errs.append("id cụm từ bị trùng")
    for p in phrases:
        for k in ("en", "vi"):
            if not p.get(k, "").strip():
                errs.append(f"{p.get('id')}: thiếu '{k}'")
        if len(p.get("examples", [])) < 2:
            warns.append(f"{p['id']}: nên có 2 câu ví dụ")
        for ex in p.get("examples", []):
            if not ex.get("en") or not ex.get("vi"):
                errs.append(f"{p['id']}: câu ví dụ thiếu en/vi")

    if len(d["dialogues"]) != 2:
        errs.append("cần đúng 2 đoạn hội thoại")
    dialogue_text = ""
    for dl in d["dialogues"]:
        spk = dl.get("speakers", {})
        genders = {v.get("gender") for v in spk.values()}
        if genders != {"m", "f"}:
            warns.append(f"{dl['id']}: nên có một giọng nam và một giọng nữ")
        for i, ln in enumerate(dl["lines"]):
            if ln["s"] not in spk:
                errs.append(f"{dl['id']} dòng {i + 1}: người nói '{ln['s']}' không có trong speakers")
            if not ln.get("en") or not ln.get("vi"):
                errs.append(f"{dl['id']} dòng {i + 1}: thiếu en/vi")
            dialogue_text += " " + _norm(ln.get("en", ""))
    dialogue_text = f" {dialogue_text} "
    missing = [p["id"] for p in phrases if f" {phrase_core(p['en'])} " not in dialogue_text]
    if missing:
        errs.append("các cụm từ chưa xuất hiện trong hội thoại: " + ", ".join(missing))

    for ls in d["listening"]:
        spk = ls.get("speakers", {})
        for i, para in enumerate(ls["paragraphs"]):
            if para["s"] not in spk:
                errs.append(f"{ls['id']} đoạn {i + 1}: người nói '{para['s']}' không có trong speakers")
            if len(para["en"]) > 2500:
                errs.append(f"{ls['id']} đoạn {i + 1}: quá dài cho một lần đọc (>2500 ký tự)")
    if errs:
        raise ContentError("; ".join(errs))
    return warns


def phrase_usage(d: dict) -> dict[str, list[str]]:
    """Which dialogue lines use each phrase (for the transcript highlights)."""
    out: dict[str, list[str]] = {}
    for p in d["phrases"]:
        core = f" {phrase_core(p['en'])} "
        for dl in d["dialogues"]:
            for i, ln in enumerate(dl["lines"]):
                if core in f" {_norm(ln['en'])} ":
                    out.setdefault(p["id"], []).append(f"{dl['id']}.{i}")
    return out
