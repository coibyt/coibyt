"""Kịch bản: định dạng soạn (LLM hoặc người viết) → kiểm tra → biên dịch thành mảng segment chuẩn.

Định dạng soạn của một phần (part1/2/3.json) — xem README:
  phrases: 6–8 cụm {id, en, vi, note_vi, forms, context_vi, examples[{en,vi}×2], recall_vi}
  opening, layer1 (có {"phrase": id} tại điểm cài cụm), layer2 {intro, outro}, layer3 (100% tiếng Anh), closing

Segment chuẩn (sau biên dịch), đúng như đặc tả:
  {"speaker": "vn_host"|"en_male"|"en_female"|<nhân vật>, "speed": 0.85|1.0, "pause_ms": 2000, "text": "..."}
  + các trường phụ: voice, lang, part, layer, kind (speech|phrase|sfx), phrase_id, chapter.
"""
from __future__ import annotations

import json
import re
import unicodedata
from dataclasses import dataclass, field
from pathlib import Path

from . import config

VI_CHARS = re.compile(r"[ăâđêôơưĂÂĐÊÔƠƯàáảãạằắẳẵặầấẩẫậèéẻẽẹềếểễệìíỉĩịòóỏõọồốổỗộờớởỡợùúủũụừứửữựỳýỷỹỵ]", re.I)
PART_KINDS = {1: "series", 2: "case_study", 3: "finance_psych"}
PART_TITLES_VI = {0: "Mở đầu", 1: "Phần 1 · Phim kinh doanh", 2: "Phần 2 · Case study có thật",
                  3: "Phần 3 · Tài chính & Tâm lý", 4: "Phần 4 · Ôn tập SRS"}
LAYER_TITLES_VI = {1: "Lớp 1 · Kể chuyện song ngữ", 2: "Lớp 2 · Luyện nhanh", 3: "Lớp 3 · 100% English"}

PAUSE = {
    "vi": 450, "en": 380, "after_slow": 2000, "drill_slow": 2500, "review_think": 3000,
    "chime": 900,
}


def norm(s: str) -> str:
    s = unicodedata.normalize("NFC", s).lower().replace("’", "'").replace("‘", "'")
    s = re.sub(r"[^\w' ]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def clean_text(s: str) -> str:
    return re.sub(r"\s+", " ", unicodedata.normalize("NFC", s)).strip()


# ---------------------------------------------------------------- speakers

def resolve_speaker(speaker: str, part: dict) -> str:
    """speaker → khoá giọng trong voices.json."""
    vs = config.voices()
    if speaker in vs:
        return speaker
    if speaker == "vn_host":
        return part.get("host") or config.part_host(part.get("part", 0))
    if speaker == "vn_cohost":
        return part.get("cohost") or config.part_cohost(part.get("part", 0))
    cast = part.get("cast", {})
    if speaker in cast:
        return cast[speaker]
    raise KeyError(speaker)


def phrase_voice(part: dict, idx: int) -> str:
    pv = part.get("phrase_voices") or config.phrase_voices()
    return pv[idx % len(pv)]


# ---------------------------------------------------------------- estimation

def seg_seconds(text: str, lang: str, speed: float = 1.0, rates: dict | None = None) -> float:
    rates = rates or config.chars_per_sec()
    base = config.tts_speed(lang)
    return len(text) / (rates[lang] * base) / speed


def est_seconds(segs: list[dict], rates: dict | None = None) -> float:
    rates = rates or config.chars_per_sec()
    t = 0.0
    for s in segs:
        if s["kind"] == "sfx":
            t += 1.8
        else:
            t += seg_seconds(s["text"], s["lang"], s.get("speed", 1.0), rates)
        t += s.get("pause_ms", 0) / 1000
    return t


# ---------------------------------------------------------------- compile

@dataclass
class Builder:
    part: dict
    segs: list = field(default_factory=list)
    layer: int = 0
    pnum: int = 0

    def say(self, speaker: str, text: str, speed: float = 1.0, pause_ms: int | None = None, **extra):
        voice = resolve_speaker(speaker, self.part)
        lang = config.voices()[voice].lang
        if pause_ms is None:
            pause_ms = PAUSE[lang]
        self.segs.append({
            "speaker": speaker, "voice": voice, "lang": lang, "speed": speed, "pause_ms": int(pause_ms),
            "text": clean_text(text), "part": self.pnum, "layer": self.layer, "kind": extra.pop("kind", "speech"),
            **extra,
        })

    def sfx(self, name: str = "chime", pause_ms: int = PAUSE["chime"], chapter: str | None = None):
        s = {"speaker": "sfx", "voice": None, "lang": None, "speed": 1.0, "pause_ms": pause_ms, "text": name,
             "part": self.pnum, "layer": self.layer, "kind": "sfx"}
        if chapter:
            s["chapter"] = chapter
        self.segs.append(s)

    def raw(self, items: list[dict], default_speaker: str = "vn_host"):
        for it in items:
            self.say(it.get("speaker", default_speaker), it["text"], it.get("speed", 1.0), it.get("pause_ms"))

    def phrase(self, p: dict, idx: int, speed: float, pause_ms: int, text: str | None = None, role="phrase"):
        self.say(phrase_voice(self.part, idx), text or p["en"], speed, pause_ms, kind="phrase",
                 phrase_id=p.get("key", p["id"]), role=role)


def _mark(segs: list[dict], start: int, title: str):
    if start < len(segs):
        segs[start]["chapter"] = title


def compile_part(part: dict, recap_vi: str | None = None) -> list[dict]:
    b = Builder(part=part, pnum=part["part"])
    ph = {p["id"]: (i, p) for i, p in enumerate(part["phrases"])}
    wd = {w["id"]: (i, w) for i, w in enumerate(part.get("words", []))}
    ptitle = f"{PART_TITLES_VI[part['part']]}: {part['title_vi']}"

    # Lớp 1 — mở đầu (+ "Previously…" của phim nhiều tập) và kể chuyện song ngữ.
    b.layer = 1
    start = len(b.segs)
    b.sfx("intro", pause_ms=700)
    if recap_vi:
        b.say("vn_host", "Previously, ở tập trước…", pause_ms=500, role="recap")
        for line in [x.strip(" -•") for x in recap_vi.splitlines() if x.strip()]:
            b.say("vn_host", line, pause_ms=350, role="recap")
        b.segs[-1]["pause_ms"] = 900
    b.raw(part.get("opening", []))
    _mark(b.segs, start, ptitle)
    l1 = len(b.segs)
    for it in part["layer1"]:
        if "phrase" in it:
            i, p = ph[it["phrase"]]
            b.phrase(p, i, 0.85, PAUSE["after_slow"])
            b.phrase(p, i, 1.0, 700)
        elif "word" in it:
            # từ vựng cài nhẹ: giọng bản ngữ đọc từ → người dẫn phụ nói nghĩa ngắn → kể tiếp
            i, w = wd[it["word"]]
            b.phrase(w, i + 1, 1.0, 450, role="word")
            b.say("vn_cohost", w["vi"], pause_ms=550, role="word_vi", phrase_ref=w.get("key", w["id"]))
        else:
            b.say(it.get("speaker", "vn_host"), it["text"], it.get("speed", 1.0), it.get("pause_ms"))
    _mark(b.segs, l1, f"P{part['part']} · {LAYER_TITLES_VI[1]}")

    # Lớp 2 — luyện nhanh: [ngữ cảnh/nghĩa tiếng Việt → EN 0.85 → 2.5 s → EN 1.0] + 2 câu ví dụ.
    b.layer = 2
    l2 = len(b.segs)
    b.sfx("chime")
    l2c = part.get("layer2", {})
    b.raw(l2c.get("intro", []))
    for i, p in enumerate(part["phrases"]):
        b.say("vn_host", p["context_vi"], pause_ms=600, role="drill_context", phrase_ref=p.get("key", p["id"]))
        b.phrase(p, i, 0.85, PAUSE["drill_slow"])
        b.phrase(p, i, 1.0, 900)
        for j, ex in enumerate(p.get("examples", [])[:2]):
            b.phrase(p, i + j + 1, 0.85, PAUSE["drill_slow"], text=ex["en"], role="example")
            b.phrase(p, i + j + 1, 1.0, 600, text=ex["en"], role="example")
            b.say("vn_host", ex["vi"], pause_ms=1100, role="example_vi", phrase_ref=p.get("key", p["id"]))
    words = part.get("words", [])
    if words:
        b.say("vn_cohost", l2c.get("words_intro") or (
            f"Tiếp theo là {len(words)} từ vựng trong truyện. Nghe từ, thử đoán nghĩa, rồi nghe lại câu trong truyện."),
            pause_ms=900, role="words_intro")
        for i, w in enumerate(words):
            k = w.get("key", w["id"])
            b.phrase(w, i + 1, 0.85, 1500, role="word")
            b.say("vn_cohost", w["vi"], pause_ms=500, role="word_vi", phrase_ref=k)
            b.phrase(w, i, 1.0, 1100, text=w["example_en"], role="word_example")
            b.say("vn_cohost", w["example_vi"], pause_ms=900, role="word_example_vi", phrase_ref=k)
    sents = part.get("key_sentences", [])
    if sents:
        b.say("vn_cohost", l2c.get("sentences_intro") or (
            f"Và đây là {len(sents)} câu then chốt của Lớp ba. Nghe hiểu được những câu này, "
            "bạn sẽ theo kịp cả câu chuyện bằng tiếng Anh."), pause_ms=900, role="sentences_intro")
        for i, st in enumerate(sents):
            b.say(phrase_voice(part, i), st["en"], 0.85, 2000, kind="sentence", role="sentence")
            b.say("vn_cohost", st["vi"], pause_ms=600, role="sentence_vi")
            b.say(phrase_voice(part, i), st["en"], 1.0, 1200, kind="sentence", role="sentence")
    b.raw(l2c.get("outro", []))
    _mark(b.segs, l2, f"P{part['part']} · {LAYER_TITLES_VI[2]}")

    # Lớp 3 — 100% tiếng Anh.
    b.layer = 3
    l3 = len(b.segs)
    b.sfx("chime")
    for it in part["layer3"]:
        b.say(it["speaker"], it["text"], it.get("speed", 1.0), it.get("pause_ms"))
    _mark(b.segs, l3, f"P{part['part']} · {LAYER_TITLES_VI[3]}")
    if part.get("closing"):
        b.layer = 3
        b.raw(part["closing"])
    # gắn phrase_id cho câu Lớp 3 có chứa cụm (để bấm nghe trên transcript)
    for s in b.segs[l3:]:
        if s["kind"] == "speech" and s["lang"] == "en":
            hits = [p.get("key", p["id"]) for p in part["phrases"] + part.get("words", [])
                    if any(norm(f) in norm(s["text"]) for f in forms_of(p))]
            if hits:
                s["phrase_hits"] = hits
    return b.segs


def compile_simple(items: list[dict], pnum: int, chapter: str, host: str | None = None) -> list[dict]:
    b = Builder(part={"part": pnum, "host": host or config.part_host(pnum), "cast": {}}, pnum=pnum)
    b.raw(items)
    _mark(b.segs, 0, chapter)
    return b.segs


def compile_review(items: list[dict], intro: list[dict], outro: list[dict]) -> list[dict]:
    """Phần 4: vòng 1 [EN → 3 s → nghĩa + nhắc bối cảnh → EN]; vòng 2 đảo chiều [nghĩa → 3 s → EN]."""
    part = {"part": 4, "host": config.part_host(4), "cohost": config.part_cohost(4), "cast": {}}
    b = Builder(part=part, pnum=4)
    b.layer = 0
    b.sfx("chime")
    b.raw(intro)
    _mark(b.segs, 0, PART_TITLES_VI[4])
    for i, p in enumerate(items):
        v = config.phrase_voices()[i % 2]
        if p.get("kind") == "word":
            b.say(v, p["en"], 1.0, 2200, kind="phrase", phrase_id=p["key"], role="review")
            b.say("vn_cohost", p["vi"], pause_ms=500, role="review_vi", phrase_ref=p["key"])
            b.say(v, p["en"], 1.0, 1200, kind="phrase", phrase_id=p["key"], role="review")
            continue
        b.say(v, p["en"], 1.0, PAUSE["review_think"], kind="phrase", phrase_id=p["key"], role="review")
        meaning = p["vi"].rstrip(".!? ") + "."
        if p.get("recall_vi"):
            meaning += " " + p["recall_vi"]
        b.say("vn_host", meaning, pause_ms=700, role="review_vi", phrase_ref=p["key"])
        with_ex = bool(p.get("fresh") and p.get("example_en"))
        b.say(v, p["en"], 1.0, 1300 if with_ex else 1600, kind="phrase", phrase_id=p["key"], role="review")
        if with_ex:
            b.say(v, p["example_en"], 1.0, 2000, kind="phrase", phrase_id=p["key"], role="example")
            b.say("vn_host", p["example_vi"], pause_ms=1500, role="example_vi", phrase_ref=p["key"])
    if items:
        r2 = len(b.segs)
        b.say("vn_host", "Vòng hai, đảo chiều. Mình nói nghĩa tiếng Việt, bạn thử nói câu tiếng Anh trong đầu, "
                         "rồi nghe lại để so.", pause_ms=900)
        _mark(b.segs, r2, "P4 · Vòng 2: đảo chiều")
        for i, p in enumerate(items):
            v = config.phrase_voices()[(i + 1) % 2]
            b.say("vn_host" if p.get("kind") != "word" else "vn_cohost", p["vi"],
                  pause_ms=PAUSE["review_think"] if p.get("kind") != "word" else 2200, role="review_vi",
                  phrase_ref=p["key"])
            b.say(v, p["en"], 1.0, 1200, kind="phrase", phrase_id=p["key"], role="review")
    b.raw(outro)
    return b.segs


def forms_of(p: dict) -> list[str]:
    return p.get("forms") or [p["en"].rstrip(".!?")]


# ---------------------------------------------------------------- validation

def validate_part(part: dict, lenient_time: bool = False) -> tuple[list[str], dict]:
    """Trả về (lỗi, thống kê). Lỗi rỗng = hợp lệ."""
    err: list[str] = []
    n = part.get("part")
    if n not in PART_KINDS:
        return [f"part phải là 1, 2 hoặc 3 (đang là {n!r})"], {}
    for k in ("title_vi", "title_en", "topic", "phrases", "layer1", "layer3"):
        if not part.get(k):
            err.append(f"thiếu trường '{k}'")
    if err:
        return err, {}
    phrases = part["phrases"]
    if not 6 <= len(phrases) <= 8:
        err.append(f"cần 6–8 cụm từ, đang có {len(phrases)}")
    ids = [p.get("id") for p in phrases]
    if len(set(ids)) != len(ids):
        err.append("id cụm từ bị trùng")
    for p in phrases:
        for k in ("en", "vi", "context_vi", "recall_vi"):
            if not p.get(k):
                err.append(f"cụm {p.get('id')}: thiếu '{k}'")
        if len(p.get("examples", [])) < 2:
            err.append(f"cụm {p.get('id')}: cần 2 câu ví dụ (examples)")
        if VI_CHARS.search(p.get("en", "")):
            err.append(f"cụm {p.get('id')}: phần tiếng Anh có chữ tiếng Việt")
        for ex in p.get("examples", []):
            if not ex.get("en") or not ex.get("vi"):
                err.append(f"cụm {p.get('id')}: ví dụ thiếu en/vi")
            elif not any(norm(f) in norm(ex["en"]) for f in forms_of(p)):
                err.append(f"cụm {p.get('id')}: câu ví dụ không chứa cụm: {ex['en']!r}")

    # Lớp 1: mỗi cụm cài đúng một lần
    marks = [it["phrase"] for it in part["layer1"] if "phrase" in it]
    for pid in ids:
        c = marks.count(pid)
        if c != 1:
            err.append(f"Lớp 1: cụm {pid} xuất hiện {c} lần (cần đúng 1)")
    for m in marks:
        if m not in ids:
            err.append(f"Lớp 1: tham chiếu cụm không tồn tại {m!r}")

    # Speaker hợp lệ
    for where, items in (("opening", part.get("opening", [])), ("layer1", part["layer1"]),
                         ("layer3", part["layer3"]), ("closing", part.get("closing", [])),
                         ("layer2.intro", part.get("layer2", {}).get("intro", [])),
                         ("layer2.outro", part.get("layer2", {}).get("outro", []))):
        for it in items:
            if "phrase" in it or "word" in it:
                continue
            if not it.get("text"):
                err.append(f"{where}: segment rỗng")
                continue
            try:
                v = resolve_speaker(it.get("speaker", "vn_host"), part)
            except KeyError as e:
                err.append(f"{where}: speaker không có trong cast/voices: {e}")
                continue
            lang = config.voices()[v].lang
            if where == "layer3" and lang != "en":
                err.append(f"layer3: speaker {it['speaker']} không phải giọng tiếng Anh")
            if lang == "en" and VI_CHARS.search(it["text"]):
                err.append(f"{where}: câu tiếng Anh có chữ tiếng Việt (bỏ dấu tên riêng): {it['text'][:60]!r}")
            if len(it["text"]) > 2400:
                err.append(f"{where}: segment quá dài ({len(it['text'])} ký tự) — tách nhỏ")

    # Lớp 3: dùng lại mọi cụm
    l3 = norm(" ".join(it.get("text", "") for it in part["layer3"]))
    for p in phrases:
        if not any(norm(f) in l3 for f in forms_of(p)):
            err.append(f"Lớp 3: chưa dùng lại cụm {p['id']} ({p['en']!r}); forms={forms_of(p)}")

    # Kịch bản v2: từ vựng + câu nghe hiểu
    v2 = part.get("version", 1) >= 2
    if v2:
        words = part.get("words", [])
        if not 8 <= len(words) <= 12:
            err.append(f"v2 cần 8–12 từ vựng (words), đang có {len(words)}")
        wids = [w.get("id") for w in words]
        if len(set(wids)) != len(wids) or set(wids) & set(ids):
            err.append("id từ vựng bị trùng (dùng w1, w2…)")
        phr_norm = " | ".join(norm(p["en"]) for p in phrases)
        wmarks = [it["word"] for it in part["layer1"] if "word" in it]
        for w in words:
            for k in ("en", "vi", "example_en", "example_vi"):
                if not w.get(k):
                    err.append(f"từ {w.get('id')}: thiếu '{k}'")
            if VI_CHARS.search(w.get("en", "") + w.get("example_en", "")):
                err.append(f"từ {w.get('id')}: phần tiếng Anh có chữ tiếng Việt")
            if w.get("en") and norm(w["en"]) in phr_norm:
                err.append(f"từ {w.get('id')} ({w['en']!r}) trùng với một cụm câu — chọn từ khác")
            if w.get("example_en") and not any(norm(f) in norm(w["example_en"]) for f in forms_of(w)):
                err.append(f"từ {w.get('id')}: câu ví dụ không chứa từ: {w['example_en']!r}")
            if not any(norm(f) in l3 for f in forms_of(w)):
                err.append(f"Lớp 3: chưa dùng từ {w.get('id')} ({w.get('en')!r}); forms={forms_of(w)}")
            c = wmarks.count(w.get("id"))
            if c != 1:
                err.append(f"Lớp 1: từ {w.get('id')} xuất hiện {c} lần (cần đúng 1)")
        sents = part.get("key_sentences", [])
        if not 4 <= len(sents) <= 6:
            err.append(f"v2 cần 4–6 câu nghe hiểu (key_sentences), đang có {len(sents)}")
        for st in sents:
            if not st.get("en") or not st.get("vi"):
                err.append("key_sentences: thiếu en/vi")
            elif norm(st["en"]) not in l3:
                err.append(f"key_sentences: câu phải chép nguyên văn từ Lớp 3: {st['en'][:70]!r}")

    # Ràng buộc riêng
    if n == 1:
        s = part.get("series") or {}
        if not s.get("episode_no"):
            err.append("phần 1 cần series.episode_no")
        lines = [x for x in (part.get("summary_vi") or "").splitlines() if x.strip()]
        if not 3 <= len(lines) <= 5:
            err.append(f"phần 1 cần summary_vi 3–5 dòng (đang {len(lines)})")
    if n == 2:
        fc = part.get("fact_check") or {}
        if not fc.get("sources"):
            err.append("case study cần fact_check.sources (nguồn kiểm chứng)")
        if not fc.get("dramatized_note"):
            err.append("case study cần fact_check.dramatized_note (ghi rõ cảnh dựng lại)")

    stats = {}
    if not err:
        segs = compile_part(part, recap_vi="x\nx\nx" if n == 1 and part["series"]["episode_no"] > 1 else None)
        for layer in (1, 2, 3):
            stats[f"layer{layer}_min"] = round(est_seconds([s for s in segs if s["layer"] == layer]) / 60, 1)
        stats["total_min"] = round(est_seconds(segs) / 60, 1)
        if not lenient_time:
            targets = config.LAYER_TARGET_MIN_V2 if v2 else config.LAYER_TARGET_MIN
            tols = config.LAYER_TOLERANCE_MIN_V2 if v2 else config.LAYER_TOLERANCE_MIN
            for layer in (1, 2, 3):
                got, want = stats[f"layer{layer}_min"], targets[layer]
                tol = tols[layer]
                if abs(got - want) > tol:
                    err.append(f"Lớp {layer}: ước tính {got} phút, cần {want}±{tol} — "
                               + ("viết dài thêm" if got < want else "rút gọn"))
    return err, stats


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))
