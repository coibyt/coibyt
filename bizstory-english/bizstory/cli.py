"""CLI: python -m bizstory <lệnh>   (chạy trong thư mục bizstory-english)."""
from __future__ import annotations

import argparse
import datetime as dt
import json
import sys
from pathlib import Path

from . import config, script


def cmd_validate(a):
    ok = True
    for f in a.files:
        part = script.load_json(Path(f))
        errs, stats = script.validate_part(part, lenient_time=a.lenient)
        print(f"== {f}: {stats}")
        for e in errs:
            print("  ✗", e)
        ok &= not errs
        if not errs:
            print("  ✓ hợp lệ")
    sys.exit(0 if ok else 1)


def cmd_import(a):
    from .generate import import_day
    import_day(a.day, lenient_time=a.lenient)


def cmd_generate(a):
    from . import llm
    from .generate import generate_day
    msg = llm.check_keys()
    if msg:
        sys.exit(msg)
    day = generate_day(a.day, a.date)
    print(f"Xong kịch bản ngày {day}. Tiếp theo: python -m bizstory render {day} --dry-run")


def cmd_render(a):
    from .render import render
    mode = "dry" if a.dry_run else "short" if a.short_test else "full"
    render(a.day, mode, max_credits=a.max_credits)


def cmd_daily(a):
    """Một lệnh cho cả ngày: tạo kịch bản (LLM) → dựng MP3 → xuất web."""
    from . import llm
    from .export import export_site
    from .generate import generate_day
    from .render import render
    msg = llm.check_keys()
    if msg:
        sys.exit(msg)
    day = generate_day(None, a.date)
    render(day, "full", max_credits=a.max_credits)
    export_site()


def cmd_calibrate(a):
    from .tts import calibrate
    print("Tốc độ đọc đo được (ký tự/giây):", calibrate() or "chưa đủ dữ liệu")


def cmd_rebuild(a):
    from .generate import rebuild_db
    rebuild_db()


def cmd_export(a):
    from .export import export_site
    export_site(Path(a.dest) if a.dest else None, copy_media=not a.no_media)


def cmd_serve(a):
    import uvicorn
    uvicorn.run("bizstory.web.app:app", host=a.host, port=a.port, reload=False)


def cmd_images(a):
    from . import images
    for n in a.names or list(images.JOBS):
        print(images.generate(n))


def cmd_due(a):
    from . import db
    con = db.connect()
    date = a.date or dt.date.today().isoformat()
    rows = db.due_phrases(con, date)
    print(f"{len(rows)} cụm đến hạn ngày {date}:")
    for r in rows:
        print(f"  [{r['key']}] bậc {r['srs_step']} · {r['en']} — {r['vi']}")


def cmd_status(a):
    from . import db
    con = db.connect()
    s = db.active_series(con)
    out = {
        "days": [dict(r) for r in con.execute("SELECT day, date, title, duration_sec FROM days ORDER BY day")],
        "active_series": dict(s) if s else None,
        "phrases": con.execute("SELECT COUNT(*) c FROM phrases").fetchone()["c"],
        "llm": {"provider": config.env("LLM_PROVIDER", "anthropic"), "key_ok": bool(
            config.env("ANTHROPIC_API_KEY") or config.env("OPENAI_API_KEY"))},
    }
    print(json.dumps(out, ensure_ascii=False, indent=2, default=str))


def main(argv=None):
    ap = argparse.ArgumentParser(prog="bizstory", description="BizStory English: truyện kinh doanh song ngữ → podcast")
    sub = ap.add_subparsers(dest="cmd", required=True)

    p = sub.add_parser("validate", help="kiểm tra file kịch bản part*.json")
    p.add_argument("files", nargs="+")
    p.add_argument("--lenient", action="store_true", help="bỏ qua kiểm tra thời lượng")
    p.set_defaults(fn=cmd_validate)

    p = sub.add_parser("import-day", help="nhập content/days/day_XX vào SQLite (series/episodes/phrases)")
    p.add_argument("day", type=int)
    p.add_argument("--lenient", action="store_true")
    p.set_defaults(fn=cmd_import)

    p = sub.add_parser("generate-day", help="viết kịch bản ngày mới bằng LLM (Claude/OpenAI theo .env) rồi nhập DB")
    p.add_argument("--day", type=int)
    p.add_argument("--date")
    p.set_defaults(fn=cmd_generate)

    p = sub.add_parser("render", help="dựng audio một ngày")
    p.add_argument("day", type=int)
    g = p.add_mutually_exclusive_group()
    g.add_argument("--dry-run", action="store_true", help="chỉ ước tính thời lượng và credit 11max, không gọi API")
    g.add_argument("--short-test", action="store_true", help="bản nháp ~3 phút để thử giọng và mạch truyện")
    p.add_argument("--max-credits", type=float, help="dừng nếu ước tính credit 11max vượt mức này")
    p.set_defaults(fn=cmd_render)

    p = sub.add_parser("daily", help="tất cả trong một: generate-day → render → export-site")
    p.add_argument("--date")
    p.add_argument("--max-credits", type=float, default=60000)
    p.set_defaults(fn=cmd_daily)

    sub.add_parser("calibrate", help="đo lại tốc độ đọc từ clip đã thu").set_defaults(fn=cmd_calibrate)
    sub.add_parser("rebuild-db", help="dựng lại SQLite từ content/days").set_defaults(fn=cmd_rebuild)
    sub.add_parser("status", help="xem tình trạng DB").set_defaults(fn=cmd_status)

    p = sub.add_parser("due", help="liệt kê cụm đến hạn ôn")
    p.add_argument("--date")
    p.set_defaults(fn=cmd_due)

    p = sub.add_parser("export-site", help="xuất web tĩnh vào site/ để đưa lên Hostinger")
    p.add_argument("--dest")
    p.add_argument("--no-media", action="store_true", help="không chép MP3 (khi MP3 đặt ở nơi khác)")
    p.set_defaults(fn=cmd_export)

    p = sub.add_parser("serve", help="chạy web (FastAPI) tại máy")
    p.add_argument("--host", default="127.0.0.1")
    p.add_argument("--port", type=int, default=8000)
    p.set_defaults(fn=cmd_serve)

    p = sub.add_parser("images", help="tạo ảnh bìa bằng kie.ai")
    p.add_argument("names", nargs="*")
    p.set_defaults(fn=cmd_images)

    a = ap.parse_args(argv)
    a.fn(a)
