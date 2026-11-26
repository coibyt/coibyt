"""Write a new day's content with the Claude API (structured JSON output), then validate it with the
same checks as hand-written days. Needs ANTHROPIC_API_KEY (or another credential the SDK finds).

Cost (Claude Opus 5.5, $4 / $20 per million tokens): about 20k input + 20–25k output tokens per day,
roughly US$0.5 per day. Set NGHE_WRITER_MODEL=claude-sonnet-5-5 to halve that.
"""
from __future__ import annotations

import datetime as dt
import json
import os

from .content import CONTENT_DIR, DAYS_DIR, ContentError, validate

MODEL = os.environ.get("NGHE_WRITER_MODEL", "claude-opus-5-5")

_s = {"type": "string"}


def _obj(props: dict, required: list[str] | None = None) -> dict:
    return {"type": "object", "properties": props, "required": required or list(props), "additionalProperties": False}


_speakers = {"type": "array", "items": _obj({"key": _s, "name": _s, "gender": {"type": "string", "enum": ["m", "f"]}})}
SCHEMA = _obj({
    "intro_vi": _s,
    "art_prompt": _s,
    "phrases": {"type": "array", "items": _obj({
        "en": _s, "vi": _s, "note_vi": _s,
        "examples": {"type": "array", "items": _obj({"en": _s, "vi": _s})},
    })},
    "dialogues": {"type": "array", "items": _obj({
        "title_en": _s, "title_vi": _s, "setting_vi": _s, "speakers": _speakers,
        "lines": {"type": "array", "items": _obj({"s": _s, "en": _s, "vi": _s})},
    })},
    "listening": {"type": "array", "items": _obj({
        "kind": {"type": "string", "enum": ["story", "podcast", "monologue"]},
        "title_en": _s, "title_vi": _s, "summary_vi": _s, "speakers": _speakers,
        "paragraphs": {"type": "array", "items": _obj({"s": _s, "en": _s, "vi": _s})},
    })},
})


def pick_topic(prefs: dict) -> dict:
    bank = json.loads((CONTENT_DIR / "topics.json").read_text(encoding="utf-8"))["topics"]
    used = []
    for f in sorted(DAYS_DIR.glob("*.json")):
        used.append(json.loads(f.read_text(encoding="utf-8"))["topic"]["id"])
    allowed = [t for t in bank if t["cat"] in prefs.get("topics", [])] or bank
    fresh = [t for t in allowed if t["id"] not in used]
    if fresh:
        # rotate categories: prefer a category different from yesterday's
        last_cat = next((t["cat"] for t in bank if used and t["id"] == used[-1]), None)
        other = [t for t in fresh if t["cat"] != last_cat]
        return (other or fresh)[0]
    # all used: start a second round (new phrases on a familiar topic)
    return allowed[len(used) % len(allowed)]


def _to_content(raw: dict, date: str, day_number: int, topic: dict, level: str) -> dict:
    def spk(arr):
        return {s["key"]: {"name": s["name"], "gender": s["gender"]} for s in arr}

    return {
        "date": date,
        "day_number": day_number,
        "level": level,
        "topic": {"id": topic["id"], "en": topic["en"], "vi": topic["vi"], "art_prompt": raw["art_prompt"]},
        "intro_vi": raw["intro_vi"],
        "phrases": [{"id": f"p{i + 1:02d}", **p} for i, p in enumerate(raw["phrases"])],
        "dialogues": [{"id": f"d{i + 1}", **{k: v for k, v in d.items() if k != "speakers"}, "speakers": spk(d["speakers"])}
                      for i, d in enumerate(raw["dialogues"])],
        "listening": [{"id": f"l{i + 1}", **{k: v for k, v in l.items() if k != "speakers"}, "speakers": spk(l["speakers"])}
                      for i, l in enumerate(raw["listening"])],
    }


def write_day(date: str, prefs: dict, log=print) -> dict:
    import anthropic  # optional dependency, only needed for writing

    out = DAYS_DIR / f"{date}.json"
    if out.exists():
        raise ContentError(f"Đã có nội dung {out.name}")
    previous = sorted(DAYS_DIR.glob("*.json"))
    day_number = len([p for p in previous if p.stem < date]) + 1
    topic = pick_topic(prefs)
    level = prefs.get("level", "A2-B1")
    taught = []
    for f in previous:
        taught += [p["en"] for p in json.loads(f.read_text(encoding="utf-8"))["phrases"]]
    example = (previous[0].read_text(encoding="utf-8") if previous else "")

    system = (CONTENT_DIR / "writer_prompt.md").read_text(encoding="utf-8").replace("{level}", level)
    user = (
        f"Day {day_number} ({date}). Topic: {topic['en']} / {topic['vi']}. Scene idea: {topic['scene']}.\n"
        f"Level: {level}.\n\n"
        f"Phrases already taught (do not choose these as today's 15):\n"
        + ("\n".join(f"- {t}" for t in taught) or "- none yet")
        + ("\n\nHere is an earlier day as a reference for the format, length and quality (do not copy its content):\n"
           f"<example_day>\n{example}\n</example_day>" if example else "")
    )
    client = anthropic.Anthropic()
    messages = [{"role": "user", "content": user}]
    for attempt in range(3):
        log(f"  Claude ({MODEL}) đang viết ngày {date}: {topic['vi']} (lần {attempt + 1})…")
        with client.beta.messages.stream(
            model=MODEL,
            max_tokens=64000,
            betas=["server-side-fallback-2026-07-01"],
            fallbacks="default",  # on a policy refusal the API retries on a suitable fallback model
            system=system,
            messages=messages,
            output_config={"effort": "high", "format": {"type": "json_schema", "schema": SCHEMA}},
        ) as stream:
            msg = stream.get_final_message()
        u = msg.usage
        cost = (u.input_tokens * 4 + u.output_tokens * 20) / 1e6
        log(f"    tokens: vào {u.input_tokens:,} · ra {u.output_tokens:,} · ≈ US${cost:.2f}")
        if msg.stop_reason == "refusal":
            raise ContentError(f"Claude từ chối viết: {msg.stop_details}")
        if msg.stop_reason == "max_tokens":
            raise ContentError("Claude bị cắt ngang (max_tokens)")
        text = next(b.text for b in msg.content if b.type == "text")
        try:
            content = _to_content(json.loads(text), date, day_number, topic, level)
            warns = validate(content)
            for w in warns:
                log("    ⚠", w)
            out.write_text(json.dumps(content, ensure_ascii=False, indent=2), encoding="utf-8")
            log(f"  Đã lưu {out}")
            return content
        except (ContentError, KeyError, ValueError) as e:
            log(f"    Nội dung chưa đạt: {e}")
            messages += [{"role": "assistant", "content": msg.content},
                         {"role": "user", "content": f"The day failed these checks: {e}. Return the full corrected JSON."}]
    raise ContentError("Không viết được nội dung hợp lệ sau 3 lần")


def next_date() -> str:
    days = sorted(DAYS_DIR.glob("*.json"))
    if not days:
        return dt.date.today().isoformat()
    return (dt.date.fromisoformat(days[-1].stem) + dt.timedelta(days=1)).isoformat()
