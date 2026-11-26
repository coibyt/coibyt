"""Turn a day's content into the listening script: an ordered list of segments in 4 parts.

Segment types (the JSON written to build/<date>/script.json):
  {"t": "chapter", "part": 1, "title_vi": ..., "title_en": ...}
  {"t": "say", "lang": "en"|"vi", "voice": "ashley", "text": ..., "speed": 0.85,
   "kind": "phrase"|"example"|"line"|"para"|"host"|"review", "ref": "p01", "vi": ..., "en": ..., "speaker": ...}
  {"t": "gap", "sec": 2.0}                 fixed silence
  {"t": "gap", "shadow": 0.8}               silence as long as the previous clip + 0.8 s (time to repeat aloud)
"""
from __future__ import annotations

from dataclasses import dataclass, field

from .content import load_narration


@dataclass
class Voices:
    en: dict
    vi: dict
    host_vi: str
    host_en: str
    narrator_en: str

    def by_gender(self, lang: str, gender: str) -> list[str]:
        pool = self.en if lang == "en" else self.vi
        names = [k for k, v in pool.items() if v["gender"] == gender]
        return names or list(pool)

    def rotate(self, lang: str, i: int) -> str:
        pool = list(self.en if lang == "en" else self.vi)
        return pool[i % len(pool)]


@dataclass
class Script:
    date: str
    segments: list[dict] = field(default_factory=list)
    phrase_voices: dict[str, tuple[str, str]] = field(default_factory=dict)
    reviewed_phrase_ids: list[int] = field(default_factory=list)

    def chapter(self, part: int, title_vi: str, title_en: str) -> None:
        self.segments.append({"t": "chapter", "part": part, "title_vi": title_vi, "title_en": title_en})

    def say(self, lang: str, voice: str, text: str, **kw) -> None:
        seg = {"t": "say", "lang": lang, "voice": voice, "text": text, "speed": kw.pop("speed", 1.0)}
        seg.update({k: v for k, v in kw.items() if v is not None})
        self.segments.append(seg)

    def gap(self, sec: float) -> None:
        self.segments.append({"t": "gap", "sec": round(sec, 3)})

    def shadow(self, extra: float) -> None:
        self.segments.append({"t": "gap", "shadow": extra})


def _fmt(tpl: str, **kw) -> str:
    return tpl.format(**kw).replace("  ", " ").strip()


def _num_vi(n: int) -> str:
    words = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"]
    return words[n] if n <= 10 else str(n)


def build_script(content: dict, cfg: dict, due_rows: list | None = None) -> Script:
    """Compose the 4 parts. `due_rows` are SRS rows (from earlier days) for part 4."""
    vc = cfg["voices"]
    voices = Voices(vc["en"], vc["vi"], vc["host_vi"], vc["host_en"], vc["narrator_en"])
    tm = cfg["timing"]
    nar = load_narration()
    sc = Script(content["date"])
    host = voices.host_vi

    def host_say(key: str, **kw) -> None:
        sc.say("vi", host, _fmt(nar[key], **kw), kind="host")

    # ------------------------------------------------------------------ intro
    sc.chapter(0, "Mở đầu", "Welcome")
    host_say("intro", day_number=content["day_number"], intro_vi=content.get("intro_vi", ""))
    sc.gap(0.8)
    host_say("intro_tip")
    sc.gap(tm["part_gap"])

    # ------------------------------------------------- part 1: 15 new phrases
    p1 = tm["part1"]
    sc.chapter(1, "Phần 1 · 15 cụm từ mới", "Part 1 · 15 new phrases")
    host_say("part1")
    sc.gap(tm["section_gap"])
    phrases = content["phrases"]
    def phrase_item(i: int, p: dict) -> None:
        en_v = voices.rotate("en", i)
        vi_v = voices.rotate("vi", i)
        sc.phrase_voices[p["id"]] = (en_v, vi_v)
        common = {"ref": p["id"], "en": p["en"], "vi": p["vi"]}
        sc.say("vi", vi_v, p["vi"], kind="phrase", **common)
        sc.gap(p1["after_vi"])
        sc.say("en", en_v, p["en"], speed=p1["slow_speed"], kind="phrase", **common)
        sc.gap(p1["after_slow"])
        sc.say("en", en_v, p["en"], kind="phrase", **common)
        sc.shadow(p1["shadow_extra"])
        for j, ex in enumerate(p.get("examples", [])[:2]):
            ex_v = voices.rotate("en", i + j + 1)
            exc = {"ref": f"{p['id']}.x{j}", "en": ex["en"], "vi": ex["vi"]}
            sc.say("en", ex_v, ex["en"], speed=p1["slow_speed"], kind="example", **exc)
            sc.shadow(p1["shadow_extra"])
            sc.say("vi", vi_v, ex["vi"], kind="example", **exc)
            sc.gap(p1["after_vi"])
            sc.say("en", ex_v, ex["en"], kind="example", **exc)
            sc.gap(p1["after_normal"])
        sc.say("en", en_v, p["en"], kind="phrase", **common)
        sc.gap(p1["between_items"])

    for i, p in enumerate(phrases):
        phrase_item(i, p)

    sc.gap(tm["section_gap"])
    host_say("part1_pass2")
    sc.gap(tm["section_gap"])
    for i, p in enumerate(phrases):
        if p1.get("pass2") == "full":
            phrase_item(i, p)
            continue
        en_v, vi_v = sc.phrase_voices[p["id"]]
        common = {"ref": p["id"], "en": p["en"], "vi": p["vi"]}
        sc.say("vi", vi_v, p["vi"], kind="phrase", **common)
        sc.gap(p1["after_vi"])
        sc.say("en", en_v, p["en"], speed=p1["slow_speed"], kind="phrase", **common)
        sc.gap(p1["after_slow"])
        sc.say("en", en_v, p["en"], kind="phrase", **common)
        sc.shadow(p1["shadow_extra"])
        for j, ex in enumerate(p.get("examples", [])[:2]):
            ex_v = voices.rotate("en", i + j + 1)
            sc.say("en", ex_v, ex["en"], kind="example", ref=f"{p['id']}.x{j}", en=ex["en"], vi=ex["vi"])
            sc.shadow(p1["shadow_extra"])
        sc.gap(p1["between_items"])
    sc.gap(tm["part_gap"])

    # ------------------------------------------------------ part 2: dialogues
    p2 = tm["part2"]
    sc.chapter(2, "Phần 2 · Hội thoại", "Part 2 · Dialogues")
    host_say("part2")
    sc.gap(tm["section_gap"])
    for n, dl in enumerate(content["dialogues"], start=1):
        # male speakers alternate between the male English voices from one dialogue to the next
        cast_en, cast_vi = {}, {}
        for s, sp in dl["speakers"].items():
            en_pool = voices.by_gender("en", sp["gender"])
            vi_pool = [v for v in voices.by_gender("vi", sp["gender"]) if v != host] or voices.by_gender("vi", sp["gender"])
            cast_en[s] = en_pool[(n - 1) % len(en_pool)]
            cast_vi[s] = vi_pool[(n - 1) % len(vi_pool)]
        host_say("dialogue", n=_num_vi(n), title_vi=dl["title_vi"], setting_vi=dl.get("setting_vi", ""))
        sc.gap(1.2)
        sc.say("en", voices.host_en, dl["title_en"] + ".", kind="host", en=dl["title_en"], vi=dl["title_vi"])
        sc.gap(tm["section_gap"])

        def line_kw(i: int, ln: dict) -> dict:
            return {"kind": "line", "ref": f"{dl['id']}.{i}", "en": ln["en"], "vi": ln["vi"],
                    "speaker": dl["speakers"][ln["s"]]["name"]}

        host_say("round1")
        sc.gap(1.5)
        for i, ln in enumerate(dl["lines"]):
            kw = line_kw(i, ln)
            sc.say("en", cast_en[ln["s"]], ln["en"], speed=p2["slow_speed"], **kw)
            sc.gap(p2["round1_gap"])
            sc.say("vi", cast_vi[ln["s"]], ln["vi"], **kw)
            sc.gap(p2["round1_gap"])
            sc.say("en", cast_en[ln["s"]], ln["en"], **kw)
            if p2.get("round1_shadow"):
                sc.shadow(p2["round2_shadow_extra"])
            else:
                sc.gap(p2["round1_after_line"])
        sc.gap(tm["section_gap"])

        host_say("round2")
        sc.gap(1.5)
        for i, ln in enumerate(dl["lines"]):
            sc.say("en", cast_en[ln["s"]], ln["en"], speed=p2["slow_speed"], **line_kw(i, ln))
            sc.shadow(p2["round2_shadow_extra"])
        sc.gap(tm["section_gap"])

        def natural_pass(key: str) -> None:
            host_say(key)
            sc.gap(1.5)
            for i, ln in enumerate(dl["lines"]):
                sc.say("en", cast_en[ln["s"]], ln["en"], **line_kw(i, ln))
                sc.gap(p2["round3_line_gap"])
            sc.gap(tm["section_gap"])

        for r in range(p2["round3_repeats"]):
            natural_pass("round3" if r == 0 else "round3_again")
        if p2.get("roleplay"):
            me = dl.get("learner") or list(dl["speakers"])[-1]
            host_say("round4", name=dl["speakers"][me]["name"])
            sc.gap(1.5)
            for i, ln in enumerate(dl["lines"]):
                if ln["s"] == me:
                    # silence first (learner speaks), then the model line
                    sc.segments.append({"t": "gap", "before": cast_en[ln["s"]], "text": ln["en"], "extra": 1.0})
                sc.say("en", cast_en[ln["s"]], ln["en"], **line_kw(i, ln))
                sc.gap(0.9 if ln["s"] == me else p2["round3_line_gap"] + 0.3)
            sc.gap(tm["section_gap"])
            natural_pass("round_final")
    sc.gap(tm["part_gap"] - tm["section_gap"])

    # ------------------------------------------- part 3: extended listening
    p3 = tm["part3"]
    sc.chapter(3, "Phần 3 · Nghe mở rộng", "Part 3 · Extended listening")
    host_say("part3")
    sc.gap(tm["section_gap"])
    play_keys = ["listening_play1", "listening_play2", "listening_play3"]
    for n, ls in enumerate(content["listening"], start=1):
        cast = {}
        for s, sp in ls["speakers"].items():
            if len(ls["speakers"]) == 1:
                pool = voices.by_gender("en", sp["gender"])
                cast[s] = voices.narrator_en if voices.narrator_en in pool else pool[0]
            else:
                pool = voices.by_gender("en", sp["gender"])
                cast[s] = pool[(n + 1) % len(pool)]
        host_say("listening", n=_num_vi(n), title_vi=ls["title_vi"])
        sc.gap(1.0)
        for k, speed in enumerate(p3["plays"]):
            host_say(play_keys[min(k, len(play_keys) - 1)])
            sc.gap(1.5)
            sc.say("en", cast[next(iter(cast))] if len(cast) == 1 else voices.host_en, ls["title_en"] + ".",
                   kind="host", en=ls["title_en"], vi=ls["title_vi"], speed=speed)
            sc.gap(1.2)
            prev = None
            for i, para in enumerate(ls["paragraphs"]):
                if prev is not None:
                    sc.gap(p3["turn_gap"] if para["s"] != prev and len(cast) > 1 else p3["paragraph_gap"])
                sc.say("en", cast[para["s"]], para["en"], speed=speed, kind="para", ref=f"{ls['id']}.{i}",
                       en=para["en"], vi=para.get("vi"), speaker=ls["speakers"][para["s"]]["name"])
                prev = para["s"]
            sc.gap(tm["section_gap"] + 1)
    sc.gap(tm["part_gap"] - tm["section_gap"])

    # ------------------------------------------------------- part 4: review
    p4 = tm["part4"]
    sc.chapter(4, "Phần 4 · Ôn tập", "Part 4 · Review")
    host_say("part4")
    sc.gap(tm["section_gap"])
    budget = p4["target_minutes"] * 60.0
    used = 0.0

    def est(text: str, lang: str) -> float:
        return len(text) / (16.0 if lang == "en" else 15.0) + 0.2

    def review(en_v: str, en: str, vi_v: str, vi: str, ref: str, kind: str = "review") -> float:
        sc.say("en", en_v, en, kind=kind, ref=ref, en=en, vi=vi)
        sc.gap(p4["think_pause"])
        sc.say("vi", vi_v, vi, kind=kind, ref=ref, en=en, vi=vi)
        sc.gap(p4["after_vi"])
        return est(en, "en") + est(vi, "vi") + p4["think_pause"] + p4["after_vi"]

    if due_rows:
        host_say("part4_due")
        sc.gap(1.5)
        for r in due_rows:
            used += review(r["en_voice"] or voices.rotate("en", r["id"]), r["en"],
                           r["vi_voice"] or voices.rotate("vi", r["id"]), r["vi"], f"srs.{r['id']}")
            sc.reviewed_phrase_ids.append(r["id"])
            if used > budget * 0.8:
                break
        sc.gap(tm["section_gap"])

    if used < budget:
        host_say("part4_today")
        sc.gap(1.5)
        for p in phrases:
            en_v, vi_v = sc.phrase_voices[p["id"]]
            used += review(en_v, p["en"], vi_v, p["vi"], p["id"])
        sc.gap(tm["section_gap"])
    if used < budget:
        host_say("part4_examples")
        sc.gap(1.5)
        for i, p in enumerate(phrases):
            _, vi_v = sc.phrase_voices[p["id"]]
            for j, ex in enumerate(p.get("examples", [])[:2]):
                if used >= budget:
                    break
                used += review(voices.rotate("en", i + j + 1), ex["en"], vi_v, ex["vi"], f"{p['id']}.x{j}")
        sc.gap(tm["section_gap"])
    if used < budget:
        host_say("part4_dialogue")
        sc.gap(1.5)
        for n, dl in enumerate(content["dialogues"], start=1):
            for i, ln in enumerate(dl["lines"]):
                if used >= budget:
                    break
                sp = dl["speakers"][ln["s"]]
                en_pool = voices.by_gender("en", sp["gender"])
                vi_pool = [v for v in voices.by_gender("vi", sp["gender"]) if v != host] or voices.by_gender("vi", sp["gender"])
                used += review(en_pool[(n - 1) % len(en_pool)], ln["en"], vi_pool[(n - 1) % len(vi_pool)], ln["vi"],
                               f"{dl['id']}.{i}")
        sc.gap(tm["section_gap"])

    if used < budget:  # first days: little is due yet, so go over today's phrases once more
        host_say("part4_last")
        sc.gap(1.5)
        for p in phrases:
            if used >= budget:
                break
            en_v, vi_v = sc.phrase_voices[p["id"]]
            used += review(en_v, p["en"], vi_v, p["vi"], p["id"])
        sc.gap(tm["section_gap"])

    sc.chapter(5, "Kết thúc", "The end")
    host_say("outro")
    sc.gap(2.0)
    return sc
