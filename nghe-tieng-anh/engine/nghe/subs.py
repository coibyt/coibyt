"""Subtitles (WebVTT, SRT) and the day.json the website reads."""
from __future__ import annotations

import json
from pathlib import Path


def _ts(sec: float, sep: str = ".") -> str:
    ms = int(round(sec * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02d}:{m:02d}:{s:02d}{sep}{ms:03d}"


def _cue_lines(c: dict) -> list[str]:
    if c["lang"] == "en":
        lines = [c["text"]]
        if c.get("vi") and c.get("kind") != "host":
            lines.append(c["vi"])
    else:
        lines = [c["text"]]
        if c.get("en") and c.get("kind") != "host" and c["en"] != c["text"]:
            lines.insert(0, c["en"])
    if c.get("speaker"):
        lines[0] = f"{c['speaker']}: {lines[0]}"
    return lines


def write_vtt(path: Path, cues: list[dict], chapters: list[dict]) -> None:
    out = ["WEBVTT", ""]
    for c in cues:
        out += [f"{_ts(c['start'])} --> {_ts(c['end'])}", *_cue_lines(c), ""]
    path.write_text("\n".join(out), encoding="utf-8")
    ch = ["WEBVTT", ""]
    for c in chapters:
        ch += [f"{_ts(c['start'])} --> {_ts(c['end'])}", c["title_vi"], ""]
    path.with_name("chapters.vtt").write_text("\n".join(ch), encoding="utf-8")


def write_srt(path: Path, cues: list[dict]) -> None:
    out = []
    for n, c in enumerate(cues, start=1):
        out += [str(n), f"{_ts(c['start'], ',')} --> {_ts(c['end'], ',')}", *_cue_lines(c), ""]
    path.write_text("\n".join(out), encoding="utf-8")


def compact_cues(cues: list[dict]) -> list[dict]:
    """Small cue objects for the web player: s/e (seconds), p part, l lang, k kind, r ref, t text when needed."""
    out = []
    for c in cues:
        o = {"s": c["start"], "e": c["end"], "p": c["part"], "l": c["lang"], "k": c.get("kind") or ""}
        if c.get("ref"):
            o["r"] = c["ref"]
        if not c.get("ref") or c.get("kind") == "host" or c["ref"].startswith("srs."):
            o["t"] = c["text"]
            if c.get("vi") and c["lang"] == "en":
                o["v"] = c["vi"]
            elif c.get("en") and c["lang"] == "vi" and c.get("kind") != "host":
                o["v"] = c["en"]
        if c.get("speed"):
            o["x"] = c["speed"]
        out.append(o)
    return out


def clip_index(cues: list[dict]) -> dict:
    """ref -> {"en": [s, e], "slow": [s, e], "vi": [s, e]} first occurrence, for tap-to-hear."""
    idx: dict[str, dict] = {}
    for c in cues:
        r = c.get("ref")
        if not r or c.get("kind") == "host":
            continue
        slot = "vi" if c["lang"] == "vi" else ("slow" if c.get("speed", 1.0) < 1.0 else "en")
        idx.setdefault(r, {}).setdefault(slot, [c["start"], c["end"]])
    return idx


def write_day_json(path: Path, content: dict, result: dict, extra: dict) -> dict:
    day = {
        "v": 1,
        "date": content["date"],
        "day_number": content["day_number"],
        "level": content["level"],
        "topic": {k: content["topic"][k] for k in ("id", "en", "vi")},
        "intro_vi": content.get("intro_vi", ""),
        "duration": result["duration"],
        "chapters": result["chapters"],
        "phrases": content["phrases"],
        "dialogues": content["dialogues"],
        "listening": content["listening"],
        "cues": compact_cues(result["cues"]),
        "clips": clip_index(result["cues"]),
        **extra,
    }
    path.write_text(json.dumps(day, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return day
