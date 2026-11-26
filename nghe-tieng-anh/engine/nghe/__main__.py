"""Command line.

  python -m nghe estimate 2026-11-27            length + 11max credits needed (nothing is paid)
  python -m nghe build 2026-11-27               build MP3 + subtitles + day.json into web/public/days/
  python -m nghe build 2026-11-27 --tts edge    free voices (Microsoft Edge) instead of 11max
  python -m nghe build 2026-11-27 --tts dummy   timing test without any network
  python -m nghe art 2026-11-27                 cover image with kie.ai
  python -m nghe import-taps taps.json          learner's "knew / didn't" taps exported by the website
  python -m nghe init-db                        rebuild the SQLite file from content/days/*.json
  python -m nghe index                          rewrite web/public/days/index.json
  python -m nghe write [DATE]                   write a new day's content with the Claude API
  python -m nghe daily [DATE]                   nightly job: write → build → QA → cover
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import sys
import time
from pathlib import Path

from . import audio, content as content_mod, db, script as script_mod, subs, tts

ENGINE = Path(__file__).resolve().parents[1]
ROOT = ENGINE.parent
DB_PATH = ENGINE / "data" / "nghe.db"
WEB_DAYS = ROOT / "web" / "public" / "days"
BUILD = ROOT / "build"


def _merge(a: dict, b: dict) -> dict:
    for k, v in b.items():
        a[k] = _merge(a.get(k, {}), v) if isinstance(v, dict) else v
    return a


def load_prefs() -> dict:
    p = ROOT / "content" / "prefs.json"
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else {}


def load_cfg() -> dict:
    """config.json, with the timing preset for the chosen daily length (content/prefs.json) applied."""
    cfg = json.loads((ENGINE / "config.json").read_text(encoding="utf-8"))
    length = load_prefs().get("dailyLength", "2h")
    preset = cfg.get("length_presets", {}).get(length)
    if preset:
        _merge(cfg["timing"], preset)
    return cfg


def open_srs(cfg: dict) -> db.SRS:
    con = db.connect(DB_PATH)
    return db.SRS(con, cfg["srs"]["intervals_days"], cfg["srs"]["mastered_interval_days"])


def make_script(date: str, cfg: dict, srs: db.SRS):
    content = content_mod.load_day(date)
    srs.upsert_lesson(content)
    row = srs.con.execute("SELECT review_ids FROM lessons WHERE date=?", (date,)).fetchone()
    if row and row["review_ids"] is not None:
        due = srs.by_ids(json.loads(row["review_ids"]))
    else:
        due = srs.due(date, cfg["timing"]["part4"]["max_due_phrases"])
    sc = script_mod.build_script(content, cfg, due)
    return content, sc


def unique_clips(segments: list[dict]) -> set[tuple[str, str, str]]:
    return {(s["lang"], s["voice"], s["text"]) for s in segments if s["t"] == "say"}


def estimate_seconds(segments: list[dict]) -> float:
    total, last = 0.0, 0.0
    for s in segments:
        if s["t"] == "say":
            last = len(s["text"]) / (14.5 if s["lang"] == "en" else 13.0) / s.get("speed", 1.0) + 0.15
            total += last
        elif s["t"] == "gap":
            if "sec" in s:
                total += s["sec"]
            elif "shadow" in s:
                total += last + s["shadow"]
            else:
                total += len(s["text"]) / 16 + s["extra"]
    return total


def cmd_estimate(a, cfg):
    srs = open_srs(cfg)
    content, sc = make_script(a.date, cfg, srs)
    srs.con.rollback()
    store = tts.ClipStore(tts.make_provider(a.tts, cfg))
    items = unique_clips(sc.segments)
    miss = store.missing(items)
    chars_all = sum(len(t) for _, _, t in items)
    chars_new = sum(len(t) for _, _, t in miss)
    says = sum(1 for s in sc.segments if s["t"] == "say")
    print(f"Ngày {a.date} · {content['topic']['vi']}")
    print(f"  Đoạn đọc: {says} (chỉ {len(items)} câu khác nhau, còn lại là lặp lại/0.85x, không tốn thêm)")
    print(f"  Độ dài ước tính: {estimate_seconds(sc.segments) / 60:.0f} phút")
    print(f"  Ký tự cần tổng hợp: {chars_all:,} · chưa có trong cache: {chars_new:,}")
    print(f"  ≈ {chars_new:,} credit 11max (1 ký tự = 1 credit)")


def cmd_build(a, cfg):
    t0 = time.time()
    srs = open_srs(cfg)
    content, sc = make_script(a.date, cfg, srs)
    warns = content_mod.validate(content)
    for w in warns:
        print("  ⚠", w)
    bdir = BUILD / a.date
    bdir.mkdir(parents=True, exist_ok=True)
    (bdir / "script.json").write_text(json.dumps({"date": a.date, "segments": sc.segments}, ensure_ascii=False, indent=1),
                                      encoding="utf-8")
    print(f"Ngày {a.date}: {sum(1 for s in sc.segments if s['t'] == 'say')} đoạn đọc, "
          f"ước tính {estimate_seconds(sc.segments) / 60:.0f} phút")

    provider = tts.make_provider(a.tts, cfg)
    fb_name = cfg["tts"].get("fallback")
    fallback = tts.make_provider(fb_name, cfg) if fb_name and fb_name != a.tts and not a.no_fallback else None
    store = tts.ClipStore(provider, fallback, cfg["tts"]["max11"]["concurrency"])
    store.ensure(unique_clips(sc.segments))

    out = WEB_DAYS / a.date
    out.mkdir(parents=True, exist_ok=True)
    meta = {"title": f"Ngày {content['day_number']} · {content['topic']['vi']}", "artist": cfg["programme"]["name_vi"],
            "album": cfg["programme"]["name_vi"], "date": a.date, "language": "eng"}
    tempo = {(lang, name): v["tempo"] for lang in ("en", "vi") for name, v in cfg["voices"][lang].items() if "tempo" in v}
    res = audio.render(sc.segments, store, cfg["audio"], out / "audio.mp3", meta, tempo)
    real = audio.probe_duration(out / "audio.mp3")
    subs.write_vtt(out / "subs.vtt", res["cues"], res["chapters"])
    subs.write_srt(out / "subs.srt", res["cues"])
    review = [{"id": r["id"], "en": r["en"], "vi": r["vi"], "from": r["lesson_date"]} for r in
              srs.by_ids(sc.reviewed_phrase_ids)]
    cover = next((p.name for p in sorted(out.glob("cover.*"))), None)
    extra = {"audio": {"src": "audio.mp3", "bytes": (out / "audio.mp3").stat().st_size},
             "cover": cover, "review": review, "usage": content_mod.phrase_usage(content),
             "built_at": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"), "tts": provider.name}
    subs.write_day_json(out / "day.json", content, res, extra)

    # SRS: today's phrases join the schedule; part-4 phrases move one stage forward.
    srs.register_phrases(content, sc.phrase_voices)
    srs.con.execute("UPDATE lessons SET built_at=?, duration_s=?, credits=COALESCE(credits,0)+?, review_ids=? WHERE date=?",
                    (extra["built_at"], real, store.credits, json.dumps(sc.reviewed_phrase_ids), a.date))
    srs.mark_heard(sc.reviewed_phrase_ids, a.date)
    srs.con.commit()
    write_index(cfg)

    parts = {c["part"]: c["end"] - c["start"] for c in res["chapters"]}
    print(f"Xong trong {time.time() - t0:.0f} s → {out / 'audio.mp3'}")
    print(f"  Tổng thời lượng: {real / 60:.1f} phút ({real / 3600:.2f} giờ), "
          f"{(out / 'audio.mp3').stat().st_size / 1e6:.1f} MB")
    for p, sec in parts.items():
        print(f"    phần {p}: {sec / 60:.1f} phút")
    print(f"  Credit 11max đã dùng lần này: {store.credits:,}")


def write_index(cfg: dict) -> None:
    days = []
    for d in sorted(WEB_DAYS.glob("*/day.json"), reverse=True):
        j = json.loads(d.read_text(encoding="utf-8"))
        days.append({"date": j["date"], "day_number": j["day_number"], "topic": j["topic"], "level": j["level"],
                     "duration": j["duration"], "cover": j.get("cover"),
                     "phrases": [{"id": p["id"], "en": p["en"], "vi": p["vi"]} for p in j["phrases"]]})
    idx = {"programme": cfg["programme"], "updated": dt.datetime.now(dt.timezone.utc).isoformat(timespec="seconds"),
           "days": days}
    WEB_DAYS.mkdir(parents=True, exist_ok=True)
    (WEB_DAYS / "index.json").write_text(json.dumps(idx, ensure_ascii=False, indent=1), encoding="utf-8")


def cmd_index(a, cfg):
    write_index(cfg)
    print("index.json updated")


def cmd_import_taps(a, cfg):
    srs = open_srs(cfg)
    data = json.loads(Path(a.file).read_text(encoding="utf-8"))
    n = 0
    for t in data.get("taps", []):
        n += srs.apply_tap(t["en"], t["date"], bool(t["knew"]))
    srs.con.commit()
    print(f"Đã nhập {n} lượt tự kiểm tra")


def cmd_init_db(a, cfg):
    if DB_PATH.exists() and not a.force:
        sys.exit(f"{DB_PATH} đã có. Dùng --force để tạo lại từ content/days/.")
    DB_PATH.unlink(missing_ok=True)
    srs = open_srs(cfg)
    for f in sorted(content_mod.DAYS_DIR.glob("*.json")):
        c = content_mod.load_day(f.stem)
        srs.upsert_lesson(c)
        _, sc = make_script(f.stem, cfg, srs)
        srs.register_phrases(c, sc.phrase_voices)
    srs.con.commit()
    print("DB:", srs.stats())


def cmd_qa(a, cfg):
    from . import qa
    srs = open_srs(cfg)
    _, sc = make_script(a.date, cfg, srs)
    srs.con.rollback()
    store = tts.ClipStore(tts.make_provider(cfg["tts"]["provider"], cfg), tts.make_provider(cfg["tts"]["fallback"], cfg))
    bad = qa.check_clips(unique_clips(sc.segments), store, cfg["tts"]["max11"]["base_url"], a.threshold)
    for b in bad:
        print(f"  {b['score']:.2f} [{b['voice']}] {b['text']}\n        nghe được: {b['heard']}")
    report = BUILD / a.date / "qa.json"
    report.parent.mkdir(parents=True, exist_ok=True)
    report.write_text(json.dumps(bad, ensure_ascii=False, indent=1), encoding="utf-8")
    if a.fix and bad:
        for b in bad:
            p = store.path(b["lang"], b["voice"], b["text"])
            p.unlink(missing_ok=True)
            (qa.STT_DIR / f"{p.stem}.json").unlink(missing_ok=True)
        print(f"  Đã xoá {len(bad)} clip lỗi; chạy lại build để tổng hợp lại, rồi qa lần nữa.")


def cmd_write(a, cfg):
    from . import writer
    writer.write_day(a.date or writer.next_date(), load_prefs())


def cmd_daily(a, cfg):
    """The nightly job: write tomorrow's content if missing, build audio, check it, cover art, index."""
    from . import art, writer
    date = a.date or writer.next_date()
    if not (content_mod.DAYS_DIR / f"{date}.json").exists():
        writer.write_day(date, load_prefs())
    a.date, a.no_fallback, a.threshold, a.fix = date, False, 0.8, True
    cmd_build(a, cfg)
    cmd_qa(a, cfg)
    if json.loads((BUILD / date / "qa.json").read_text(encoding="utf-8")):
        cmd_build(a, cfg)  # re-synthesise the clips QA rejected (once)
    try:
        art.cover_for_day(date, WEB_DAYS / date)
        if not json.loads((WEB_DAYS / date / "day.json").read_text(encoding="utf-8")).get("cover"):
            cmd_build(a, cfg)  # quick (all clips cached): puts the cover into day.json
    except Exception as e:  # noqa: BLE001 - a missing cover must not stop the day
        print("  Ảnh bìa lỗi:", e)
    print("Xong ngày", date)


def cmd_art(a, cfg):
    from . import art
    art.cover_for_day(a.date, WEB_DAYS / a.date, force=a.force)


def main(argv=None):
    ap = argparse.ArgumentParser(prog="nghe")
    sp = ap.add_subparsers(dest="cmd", required=True)
    for name in ("estimate", "build"):
        p = sp.add_parser(name)
        p.add_argument("date")
        p.add_argument("--tts", default=None)
        if name == "build":
            p.add_argument("--no-fallback", action="store_true")
    sp.add_parser("index")
    p = sp.add_parser("import-taps")
    p.add_argument("file")
    p = sp.add_parser("init-db")
    p.add_argument("--force", action="store_true")
    p = sp.add_parser("write")
    p.add_argument("date", nargs="?")
    p = sp.add_parser("daily")
    p.add_argument("date", nargs="?")
    p.add_argument("--tts", default=None)
    p = sp.add_parser("qa")
    p.add_argument("date")
    p.add_argument("--threshold", type=float, default=0.85)
    p.add_argument("--fix", action="store_true")
    p = sp.add_parser("art")
    p.add_argument("date")
    p.add_argument("--force", action="store_true")
    a = ap.parse_args(argv)
    cfg = load_cfg()
    if getattr(a, "tts", None) is None and hasattr(a, "tts"):
        a.tts = cfg["tts"]["provider"]
    {"estimate": cmd_estimate, "build": cmd_build, "index": cmd_index, "import-taps": cmd_import_taps,
     "init-db": cmd_init_db, "art": cmd_art, "qa": cmd_qa,
     "write": cmd_write, "daily": cmd_daily}[a.cmd](a, cfg)


if __name__ == "__main__":
    main()
