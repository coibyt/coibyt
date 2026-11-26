"""Dựng một ngày: biên dịch kịch bản → (dry-run | short-test | full) → MP3 + transcript + VTT + chương + JSON cho web."""
from __future__ import annotations

import json
import shutil
import time
from pathlib import Path

from . import audio, config, db, script, tts

PART_FILES = ("part1.json", "part2.json", "part3.json")


def day_dir(day: int) -> Path:
    return config.DAYS_DIR / f"day_{day:02d}"


def out_dir(day: int) -> Path:
    return config.OUTPUT_DIR / f"day_{day:02d}"


def phrase_key(day: int, part: int, pid: str) -> str:
    return f"d{day}p{part}-{pid}"


def load_day(day: int) -> tuple[dict, list[dict]]:
    d = day_dir(day)
    meta = script.load_json(d / "day.json")
    parts = [script.load_json(d / f) for f in PART_FILES if (d / f).exists()]
    for p in parts:
        for ph in p["phrases"]:
            ph["key"] = phrase_key(day, p["part"], ph["id"])
        for w in p.get("words", []):
            w["key"] = phrase_key(day, p["part"], w["id"])
            w["kind"] = "word"
    return meta, parts


# ---------------------------------------------------------------- Phần 4: kế hoạch ôn

def _review_item(row_or_dict, db_id=None) -> dict:
    r = dict(row_or_dict)
    return {"key": r["key"], "en": r["en"], "vi": r["vi"], "recall_vi": r.get("context_vi") or r.get("recall_vi"),
            "example_en": r.get("example_en"), "example_vi": r.get("example_vi"),
            "db_id": db_id if db_id is not None else r.get("id"), "from_day": r.get("ep_day"),
            "kind": r.get("kind") or "phrase"}


def plan_review(day: int, date: str, parts: list[dict], con=None) -> dict:
    """Chọn cụm cho Phần 4: cụm đến hạn (SRS 1-3-7-14) trước, rồi cụm mới hôm nay, vừa khoảng 15 phút."""
    con = con or db.connect()
    due = [_review_item(r) for r in db.due_phrases(con, date)]
    fresh = []
    for r in db.phrases_of_day(con, day):
        it = _review_item(r)
        it["fresh"] = True
        fresh.append(it)
    if not fresh:  # chưa nhập DB (dry-run): lấy từ kịch bản
        for p in parts:
            for ph in p["phrases"] + p.get("words", []):
                ex = (ph.get("examples") or [{"en": ph.get("example_en"), "vi": ph.get("example_vi")}])[0]
                fresh.append({"key": ph["key"], "en": ph["en"], "vi": ph["vi"], "recall_vi": ph.get("recall_vi"),
                              "example_en": ex.get("en"), "example_vi": ex.get("vi"), "db_id": None,
                              "from_day": day, "fresh": True, "kind": ph.get("kind", "phrase")})
    budget = config.REVIEW_TARGET_MIN * 60 - 70  # trừ lời mở/kết
    items, t = [], 0.0
    for it in due + fresh:
        cost = _item_cost(it)
        if t + cost > budget:
            break
        items.append(it)
        t += cost
    return {"day": day, "date": date, "items": items, "due_count": len(due), "fresh_count": len(fresh),
            "est_min": round(t / 60 + 70 / 60, 1)}


def _item_cost(it: dict) -> float:
    rates = config.chars_per_sec()
    en = script.seg_seconds(it["en"], "en", 1.0, rates)
    if it.get("kind") == "word":
        vi = script.seg_seconds(it["vi"], "vi", 1.0, rates)
        return en * 3 + vi * 2 + 2.2 + 0.5 + 1.2 + 2.2 + 1.2
    vi = script.seg_seconds(it["vi"] + " " + (it.get("recall_vi") or ""), "vi", 1.0, rates)
    c = en * 2 + vi + 3.0 + 0.7 + 1.6 + script.seg_seconds(it["vi"], "vi", 1.0, rates) + 3.0 + en + 1.2
    if it.get("fresh") and it.get("example_en"):
        c += script.seg_seconds(it["example_en"], "en", 1.0, rates) + 2.0
        c += script.seg_seconds(it.get("example_vi") or "", "vi", 1.0, rates) + 1.5
    return c


def review_texts(plan: dict, meta: dict) -> tuple[list[dict], list[dict]]:
    n = len(plan["items"])
    due = sum(1 for i in plan["items"] if not i.get("fresh"))
    intro = meta.get("review_intro") or [{"speaker": "vn_host", "text": (
        f"Phần bốn, ôn tập. Hôm nay mình ôn {n} cụm"
        + (f", trong đó {due} cụm từ những ngày trước đã đến hạn nhắc lại." if due else ", toàn bộ là cụm vừa học hôm nay.")
        + " Mỗi câu tiếng Anh vang lên, bạn có ba giây để tự nhớ nghĩa, rồi mình mới nhắc.")}]
    outro = meta.get("outro") or []
    return intro, outro


# ---------------------------------------------------------------- biên dịch cả ngày

def previous_recap(part1: dict, con=None) -> str | None:
    s = part1.get("series") or {}
    if s.get("recap_vi"):
        return s["recap_vi"]
    if (s.get("episode_no") or 1) <= 1:
        return None
    con = con or db.connect()
    r = con.execute(
        """SELECT e.summary FROM episodes e JOIN series s ON s.id=e.series_id
           WHERE s.season=? AND e.episode_no=?""", (s["season"], s["episode_no"] - 1)).fetchone()
    return r["summary"] if r else None


def compile_day(day: int, con=None) -> tuple[dict, list[dict], list[dict], dict]:
    meta, parts = load_day(day)
    segs: list[dict] = []
    intro = script.compile_simple(meta.get("intro", []), 0, "Mở đầu", config.part_host(0))
    segs += [{"speaker": "sfx", "voice": None, "lang": None, "speed": 1.0, "pause_ms": 500, "text": "logo",
              "part": 0, "layer": 0, "kind": "sfx", "chapter": "Mở đầu"}]
    if intro:
        intro[0].pop("chapter", None)
    segs += intro
    for p in parts:
        recap = previous_recap(p, con) if p["part"] == 1 else None
        segs += script.compile_part(p, recap)
    rp = day_dir(day) / "review.json"
    plan = script.load_json(rp) if rp.exists() else plan_review(day, meta["date"], parts, con)
    ri, ro = review_texts(plan, meta)
    segs += script.compile_review(plan["items"], ri, ro)
    for i, s in enumerate(segs):
        s["i"] = i
    return meta, parts, segs, plan


def short_subset(segs: list[dict]) -> list[dict]:
    """Bản nháp ~3 phút: mở đầu, đầu Lớp 1 (có cụm đầu tiên), 1 bài luyện Lớp 2, đầu Lớp 3, 2 câu ôn."""
    def take(pred, budget, need_phrase=False):
        sel, t, got, after = [], 0.0, False, 0
        for s in (x for x in segs if pred(x)):
            sel.append(s)
            t += script.est_seconds([s])
            if s["kind"] == "phrase":
                got = True
            elif got:
                after += 1
            if t >= budget and (not need_phrase or (got and after >= 1)):
                break
            if t >= budget * 2.2:
                break
        return sel
    out = take(lambda s: s["part"] == 0, 12)
    out += take(lambda s: s["part"] == 1 and s["layer"] == 1, 45, need_phrase=True)
    out += take(lambda s: s["part"] == 1 and s["layer"] == 2, 30, need_phrase=True)
    out += take(lambda s: s["part"] == 1 and s["layer"] == 3, 30)
    out += take(lambda s: s["part"] == 4, 20, need_phrase=True)
    return out


def jobs_for(segs: list[dict]) -> list[tts.Job]:
    jobs = []
    for s in segs:
        if s["kind"] == "sfx":
            continue
        sp = s["speed"] if tts.needs_own_clip(s["speed"]) else 1.0
        jobs.append(tts.Job(s["voice"], s["text"], sp))
    return jobs


def cost_report(segs: list[dict]) -> dict:
    jobs = jobs_for(segs)
    uniq = {j.key: j for j in jobs}
    new = [j for j in uniq.values() if not tts.cached(j)]
    by_part: dict = {}
    for s in segs:
        k = f"P{s['part']}" + (f"L{s['layer']}" if s["part"] in (1, 2, 3) else "")
        by_part[k] = by_part.get(k, 0.0) + script.est_seconds([s])
    total_chars = sum(len(j.text) for j in jobs)
    uniq_chars = sum(len(j.text) for j in uniq.values())
    new_chars = sum(len(j.text) for j in new)
    return {
        "segments": len(segs), "clips_total": len(jobs), "clips_unique": len(uniq), "clips_new": len(new),
        "chars_spoken": total_chars, "chars_unique": uniq_chars, "chars_new": new_chars,
        "credits_new_est": round(tts.credits_for(new_chars)),
        "est_minutes": round(script.est_seconds(segs) / 60, 1),
        "est_by_section_min": {k: round(v / 60, 1) for k, v in by_part.items()},
    }


# ---------------------------------------------------------------- dựng âm thanh

def fmt_ts(sec: float, vtt: bool = False) -> str:
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    if vtt:
        return f"{int(h):02d}:{int(m):02d}:{s:06.3f}"
    return f"{int(h)}:{int(m):02d}:{int(s):02d}" if h else f"{int(m):02d}:{int(s):02d}"


def render(day: int, mode: str = "full", log=print, max_credits: float | None = None) -> dict:
    t0 = time.time()
    con = db.connect()
    meta, parts, segs, plan = compile_day(day, con)
    if mode == "short":
        segs = short_subset(segs)
    rep = cost_report(segs)
    log(json.dumps(rep, ensure_ascii=False, indent=2))
    if mode == "dry":
        return rep
    if max_credits is not None and rep["credits_new_est"] > max_credits:
        raise SystemExit(f"Ước tính {rep['credits_new_est']} credit > giới hạn --max-credits {max_credits}. Dừng.")

    stats = tts.synthesize(jobs_for(segs), log=log)
    log(f"11max xong: {stats}")

    od = out_dir(day)
    od.mkdir(parents=True, exist_ok=True)
    stem = f"day_{day:02d}" + ("_short" if mode == "short" else "")
    work = config.CACHE_DIR / "work" / stem
    shutil.rmtree(work, ignore_errors=True)
    bw = audio.BlockWriter(work)
    sfx_cache: dict = {}
    prev_block = None
    for s in segs:
        blk = (s["part"], s["layer"])
        if prev_block is not None and blk != prev_block:
            bw.flush()
        prev_block = blk
        if s["kind"] == "sfx":
            a = sfx_cache.setdefault(s["text"], audio.load_clip(audio.sfx_path(s["text"])))
        else:
            sp = s["speed"] if tts.needs_own_clip(s["speed"]) else 1.0
            key = tts.clip_key(s["voice"], s["text"], sp)
            m = tts.clip_meta(key)
            gain = 0.0 if m.get("lufs_mono") is None else max(-12.0, min(12.0, audio.CLIP_TARGET_LUFS - m["lufs_mono"]))
            wav = tts.processed_wav(key, 1.0 if tts.needs_own_clip(s["speed"]) else s["speed"])
            a = audio.load_clip(wav, gain)
            s["clip"] = key
            s["gain"] = round(gain, 2)
        start, dur = bw.add(a)
        s["t"], s["d"] = round(start / 1000, 3), round(dur / 1000, 3)
        if s["pause_ms"]:
            bw.add(audio.silence(s["pause_ms"]))
    bw.flush()

    chapters = [{"t": s["t"], "title": s["chapter"], "part": s["part"], "layer": s["layer"]}
                for s in segs if s.get("chapter")]
    total = bw.total_ms / 1000
    mp3 = od / f"{stem}.mp3"
    title = f"BizStory English · Ngày {day}: {meta.get('title_vi', '')}"
    log(f"Ghép {len(bw.blocks)} khối, {total / 60:.1f} phút → {mp3.name}")
    audio.encode_mp3(bw.blocks, mp3, chapters, title=title, total=total, log=log)
    measured = tts.probe_duration(mp3)
    shutil.rmtree(work, ignore_errors=True)

    phrases = export_phrase_clips(day, parts, segs, od, plan)
    write_transcript(od / f"{stem}_transcript.md", meta, parts, segs, chapters, measured, plan)
    write_vtt(od / f"{stem}.vtt", segs)
    (od / f"{stem}.chapters.json").write_text(json.dumps(chapters, ensure_ascii=False, indent=1), encoding="utf-8")
    player = player_json(day, meta, parts, segs, chapters, measured, phrases, f"{stem}.mp3", mode)
    (od / f"{stem}.json").write_text(json.dumps(player, ensure_ascii=False), encoding="utf-8")

    if mode == "full":
        if not (day_dir(day) / "review.json").exists():
            (day_dir(day) / "review.json").write_text(json.dumps(plan, ensure_ascii=False, indent=1), encoding="utf-8")
        commit_srs(con, day, meta["date"], plan)
        con.execute("INSERT OR REPLACE INTO days(day, date, title, mp3_path, transcript_path, duration_sec) "
                    "VALUES (?,?,?,?,?,?)", (day, meta["date"], meta.get("title_vi"), str(mp3),
                                             str(od / f"{stem}_transcript.md"), measured))
        con.execute("UPDATE episodes SET mp3_path=?, transcript_path=? WHERE day=?",
                    (str(mp3), str(od / f"{stem}_transcript.md"), day))
        con.commit()
    res = {**rep, "credits_spent": round(stats["credits"]), "duration_min": round(measured / 60, 2),
           "mp3": str(mp3), "mp3_mb": round(mp3.stat().st_size / 1e6, 1), "render_sec": round(time.time() - t0)}
    log(json.dumps({k: res[k] for k in ("duration_min", "mp3", "mp3_mb", "credits_spent", "render_sec")},
                   ensure_ascii=False))
    return res


def commit_srs(con, day: int, date: str, plan: dict) -> None:
    """Cụm đã phát ở Phần 4 (nghe thụ động) → lên bậc SRS. Không tính hai lần nếu dựng lại."""
    for it in plan["items"]:
        if it.get("fresh"):
            continue
        row = con.execute("SELECT id FROM phrases WHERE key=?", (it["key"],)).fetchone()
        if row is None:
            continue
        seen = con.execute("SELECT 1 FROM reviews WHERE phrase_id=? AND day=? AND source='audio'",
                           (row["id"], day)).fetchone()
        if not seen:
            db.record_review(con, row["id"], date, day, "audio", "seen")


def export_phrase_clips(day, parts, segs, od: Path, plan) -> dict:
    """Clip ngắn từng cụm (1.0 và 0.85) để bấm nghe trên transcript và sổ tay."""
    pd = od / "phrases"
    out = {}
    first_t = {}
    for s in segs:
        if s["kind"] == "phrase" and s.get("role") == "phrase" and s.get("t") is not None:
            first_t.setdefault(s["phrase_id"], s["t"])
    allp = [(p["part"], ph) for p in parts for ph in p["phrases"] + p.get("words", [])]
    for it in plan["items"]:
        if not it.get("fresh"):
            allp.append((0, {"key": it["key"], "en": it["en"], "vi": it["vi"], "id": it["key"], "kind": it.get("kind", "phrase"),
                             "recall_vi": it.get("recall_vi"), "review_only": True}))
    voices = config.phrase_voices()
    for idx, (part, ph) in enumerate(allp):
        seg = next((s for s in segs if s.get("phrase_id") == ph["key"] and s["text"] == ph["en"] and s.get("clip")),
                   None)
        rec = {"key": ph["key"], "en": ph["en"], "vi": ph["vi"], "note_vi": ph.get("note_vi"),
               "examples": ph.get("examples") or ([{"en": ph["example_en"], "vi": ph.get("example_vi", "")}]
                                                  if ph.get("example_en") else []),
               "forms": script.forms_of(ph) if "en" in ph else [], "recall_vi": ph.get("recall_vi"), "part": part,
               "kind": ph.get("kind", "phrase"),
               "t": first_t.get(ph["key"]), "review_only": ph.get("review_only", False)}
        if seg:
            m = tts.clip_meta(seg["clip"])
            gain = seg.get("gain", 0.0)
            for sp, suffix in ((1.0, ""), (0.85, "_slow")):
                dst = pd / f"{ph['key']}{suffix}.mp3"
                if not dst.exists():
                    audio.export_small_mp3(tts.processed_wav(seg["clip"], sp), dst, gain)
            rec["clip"] = f"phrases/{ph['key']}.mp3"
            rec["clip_slow"] = f"phrases/{ph['key']}_slow.mp3"
            rec["voice"] = m.get("voice", voices[idx % 2])
        out[ph["key"]] = rec
    return out


SPEAKER_LABEL = {"vn_host": "Người dẫn"}


def _label(s: dict) -> str:
    if s["kind"] == "phrase":
        return "EN" + (" 0.85×" if s["speed"] != 1.0 else "")
    if s["speaker"] == "vn_host" or s["speaker"].startswith("vn_"):
        return "Người dẫn"
    if s["speaker"].startswith("en_"):
        return "Narrator"
    return s["speaker"]


def write_transcript(path: Path, meta, parts, segs, chapters, duration, plan) -> None:
    L = [f"# BizStory English · Ngày {meta['day']}: {meta.get('title_vi', '')}", "",
         f"*{meta['date']} · {fmt_ts(duration)} · {len(segs)} đoạn*", ""]
    for p in parts:
        L.append(f"- **{script.PART_TITLES_VI[p['part']]}:** {p['title_vi']} / *{p['title_en']}*")
    L.append(f"- **{script.PART_TITLES_VI[4]}:** {len(plan['items'])} cụm")
    L.append("")
    for p in parts:
        L += [f"## Cụm từ · {script.PART_TITLES_VI[p['part']]}", "", "| English | Tiếng Việt |", "|---|---|"]
        L += [f"| **{ph['en']}** | {ph['vi']} |" for ph in p["phrases"]]
        if p.get("words"):
            L += ["", "| Từ vựng | Nghĩa |", "|---|---|"] + [f"| {w['en']} | {w['vi']} |" for w in p["words"]]
        L.append("")
        fc = p.get("fact_check")
        if fc:
            L += [f"> **Kiểm chứng:** {fc.get('dramatized_note', '')}", ">"]
            L += [f"> - {s}" for s in fc.get("sources", [])]
            L.append("")
    for s in segs:
        if s.get("chapter"):
            L += ["", f"## [{fmt_ts(s['t'])}] {s['chapter']}", ""]
        if s["kind"] == "sfx":
            continue
        txt = f"**{s['text']}**" if s["kind"] == "phrase" else s["text"]
        L.append(f"`{fmt_ts(s['t'])}` **{_label(s)}:** {txt}  ")
    path.write_text("\n".join(L) + "\n", encoding="utf-8")


def write_vtt(path: Path, segs) -> None:
    L = ["WEBVTT", ""]
    for s in segs:
        if s["kind"] == "sfx":
            continue
        L += [f"{fmt_ts(s['t'], True)} --> {fmt_ts(s['t'] + s['d'], True)}", f"<v {_label(s)}>{s['text']}", ""]
    path.write_text("\n".join(L), encoding="utf-8")


def player_json(day, meta, parts, segs, chapters, duration, phrases, mp3_name, mode) -> dict:
    keep = ("i", "t", "d", "speaker", "lang", "text", "kind", "part", "layer", "phrase_id", "phrase_hits",
            "phrase_ref", "role", "speed")
    return {
        "day": day, "date": meta["date"], "title_vi": meta.get("title_vi"), "title_en": meta.get("title_en"),
        "mode": mode, "duration": round(duration, 2), "audio": mp3_name, "chapters": chapters,
        "cover": meta.get("cover"),
        "parts": [{"part": p["part"], "kind": p["kind"], "title_vi": p["title_vi"], "title_en": p["title_en"],
                   "series": p.get("series"), "fact_check": p.get("fact_check"),
                   "cover": p.get("cover") or (meta.get("covers") or {}).get(str(p["part"])),
                   "cast": p.get("cast")} for p in parts],
        "segments": [{k: s[k] for k in keep if k in s and s[k] is not None} for s in segs],
        "phrases": list(phrases.values()),
    }
