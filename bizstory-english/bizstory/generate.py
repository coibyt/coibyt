"""Tạo kịch bản một ngày bằng LLM (kiểm tra + chạy lại nếu sai) và nhập vào SQLite."""
from __future__ import annotations

import datetime as dt
import json
from pathlib import Path

from . import config, db, llm, script
from .render import PART_FILES, day_dir, phrase_key

PROMPTS = Path(__file__).resolve().parent / "prompts"
MAX_TRIES = 3


def style_guide() -> str:
    return (PROMPTS / "style_guide.md").read_text(encoding="utf-8")


SYSTEM = ("Bạn là biên kịch trưởng của BizStory English, một podcast kể chuyện kinh doanh song ngữ đẳng cấp "
          "cho người Việt. Bạn viết hấp dẫn như podcast kể chuyện hay nhất, chính xác như nhà báo kinh tế, "
          "và dạy tiếng Anh thực dụng. Chỉ trả về MỘT khối JSON hợp lệ, không thêm lời giải thích.\n\n")


def _history(con) -> str:
    rows = db.past_topics(con)
    if not rows:
        return "(chưa có tập nào)"
    return "\n".join(f"- ngày {r['day']} phần {r['part']}: {r['title_en']} | {r['topic']}"
                     + (f" | {r['subject']}" if r["subject"] else "") for r in rows)


def _used_phrases(con, limit=400) -> str:
    rows = con.execute("SELECT en FROM phrases ORDER BY id DESC LIMIT ?", (limit,)).fetchall()
    return "; ".join(r["en"] for r in rows) or "(chưa có)"


def plan_season(con, season: int) -> dict:
    prev = con.execute("SELECT season, theme, title_en FROM series ORDER BY season").fetchall()
    user = (f"Lên kế hoạch MÙA {season} cho Phần 1 (phim kinh doanh hư cấu, 5 tập).\n"
            f"Các mùa trước: {[dict(r) for r in prev] or 'chưa có'}.\n"
            "Chọn bối cảnh khác hẳn mùa trước (ngành, thành phố, kiểu nhân vật). Mỗi tập gỡ trọn một nút thắt "
            "kinh doanh thật (ví dụ gọi vốn, thuê mặt bằng, khủng hoảng dòng tiền, đàm phán, tái cấu trúc, "
            "tuyển dụng, khủng hoảng truyền thông, cạnh tranh giá, M&A…). Trả về JSON: "
            '{"season": n, "theme": "...", "title_vi": "...", "title_en": "...", '
            '"bible": {"characters": [{"name": "...", "age": 0, "role": "...", "traits": "...", "voice": "en_male2"}], '
            '"setting": "...", "arc": [{"episode_no": 1, "knot": "...", "cliffhanger": "..."}]}}')
    return llm.extract_json(llm.complete(SYSTEM + style_guide(), user, max_tokens=16000))


def part_prompt(con, part: int, day: int, date: str, series: dict | None) -> str:
    base = [f"Viết PHẦN {part} cho ngày {day} ({date}). Kết quả là JSON đúng định dạng mục 5 của hướng dẫn.",
            f"Lịch sử các tập (KHÔNG lặp chủ đề/công ty):\n{_history(con)}",
            f"Cụm tiếng Anh đã dạy (KHÔNG dạy lại): {_used_phrases(con)}"]
    if part == 1:
        ep = series["current_episode"] + 1
        bible = json.loads(series["bible"] or "{}")
        base.append(f"Mùa {series['season']}: {series['title_vi']} / {series['title_en']} — {series['theme']}.\n"
                    f"Bible: {json.dumps(bible, ensure_ascii=False)}\nĐây là TẬP {ep}/{series['total_episodes']}. "
                    f"series.episode_no = {ep}, series.season = {series['season']}.")
        if series["previous_summary"]:
            base.append(f"Tóm tắt tập trước (đã phát ở đoạn Previously):\n{series['previous_summary']}")
        if ep == series["total_episodes"]:
            base.append("Đây là tập CUỐI mùa: kết thúc trọn vẹn cả mùa, không để móc câu.")
    elif part == 2:
        base.append("Case study CÓ THẬT về thất bại hoặc bước ngoặt của một thương hiệu/doanh nhân nổi tiếng "
                    "(đa dạng quốc gia và ngành, có thể là Việt Nam). Chỉ dùng sự kiện được ghi nhận rộng rãi.")
    else:
        base.append("Truyện tài chính & tâm lý (quản lý tiền, rủi ro, tâm lý khách hàng, đàm phán, thiên kiến). "
                    "Có thể dựa trên nghiên cứu thật, nêu đúng tác giả/năm/kết quả.")
    return "\n\n".join(base)


def generate_part(con, part: int, day: int, date: str, series=None, log=print) -> dict:
    user = part_prompt(con, part, day, date, series)
    feedback = ""
    for attempt in range(1, MAX_TRIES + 1):
        log(f"  Phần {part}: gọi {llm.provider()}/{llm.model_name()} (lần {attempt})…")
        data = llm.extract_json(llm.complete(SYSTEM + style_guide(), user + feedback))
        data["part"] = part
        data["kind"] = script.PART_KINDS[part]
        errs, stats = script.validate_part(data)
        if not errs:
            log(f"  Phần {part}: hợp lệ {stats}")
            return data
        log(f"  Phần {part}: {len(errs)} lỗi → chạy lại: {errs[:5]}")
        feedback = ("\n\nBản trước KHÔNG hợp lệ. Sửa các lỗi sau rồi trả về TOÀN BỘ JSON đã sửa:\n- "
                    + "\n- ".join(errs) + f"\n\nBản trước:\n{json.dumps(data, ensure_ascii=False)}")
    raise llm.LLMError(f"Phần {part}: vẫn không hợp lệ sau {MAX_TRIES} lần: {errs}")


def summarize_episode(part: dict) -> str:
    """Tóm tắt tập phim thành 3 dòng cho series.previous_summary (dùng LLM nếu có khoá)."""
    if llm.check_keys() is None:
        text = " ".join(it["text"] for it in part["layer1"] if "text" in it)
        out = llm.complete("Bạn tóm tắt truyện cho podcast. Chỉ trả về đúng 3 dòng tiếng Việt, mỗi dòng 1 câu, "
                           "không đánh số, viết số bằng chữ.", text, max_tokens=2000, effort="low")
        lines = [x.strip(" -•") for x in out.splitlines() if x.strip()]
        if 3 <= len(lines) <= 5:
            return "\n".join(lines)
    return part.get("summary_vi", "")


def generate_day(day: int | None = None, date: str | None = None, log=print) -> int:
    con = db.connect()
    day = day or db.next_day(con)
    date = date or dt.date.today().isoformat()
    series = db.active_series(con)
    if series is None:
        season = (con.execute("SELECT MAX(season) AS s FROM series").fetchone()["s"] or 0) + 1
        log(f"Lên kế hoạch mùa {season}…")
        plan = plan_season(con, season)
        sid = db.create_series(con, season, plan["theme"], plan["title_vi"], plan["title_en"],
                               json.dumps(plan.get("bible", {}), ensure_ascii=False))
        con.commit()
        series = con.execute("SELECT * FROM series WHERE id=?", (sid,)).fetchone()
    d = day_dir(day)
    d.mkdir(parents=True, exist_ok=True)
    titles = []
    for part in (1, 2, 3):
        f = d / PART_FILES[part - 1]
        if f.exists():
            log(f"  Phần {part}: đã có {f.name}, giữ nguyên")
            data = script.load_json(f)
        else:
            data = generate_part(con, part, day, date, series if part == 1 else None, log)
            if part == 1:
                data["series"].update({"season": series["season"], "title_vi": series["title_vi"],
                                       "title_en": series["title_en"], "theme": series["theme"]})
            f.write_text(json.dumps(data, ensure_ascii=False, indent=1), encoding="utf-8")
        titles.append(data["title_vi"])
    meta_f = d / "day.json"
    if not meta_f.exists():
        meta_f.write_text(json.dumps(default_day_meta(day, date, titles), ensure_ascii=False, indent=1),
                          encoding="utf-8")
    import_day(day, log=log)
    return day


def default_day_meta(day: int, date: str, titles: list[str]) -> dict:
    return {
        "day": day, "date": date, "title_vi": titles[0], "title_en": "",
        "intro": [{"speaker": "vn_host", "text": (
            f"Chào bạn, đây là BizStory English, ngày thứ {day}. Hai tiếng tới, bạn nghe ba câu chuyện kinh doanh "
            "và học tiếng Anh chỉ bằng cách lắng nghe.")},
            {"speaker": "vn_host", "text": f"Phần một: {titles[0]}. Phần hai: {titles[1]}. Phần ba: {titles[2]}. "
                                           "Và cuối cùng là mười lăm phút ôn tập. Bắt đầu nhé."}],
        "outro": [{"speaker": "vn_host", "text": "Hết chương trình hôm nay rồi. Ngày mai mình gặp lại với tập tiếp "
                                                 "theo và những cụm từ mới. Chúc bạn một ngày làm việc thật tốt."}],
    }


def import_day(day: int, log=print, lenient_time: bool = False) -> None:
    """Kiểm tra mọi phần và ghi vào SQLite (series, episodes, phrases); tạo kế hoạch ôn Phần 4."""
    from .render import load_day, plan_review

    con = db.connect()
    meta, parts = load_day(day)
    for p in parts:
        errs, stats = script.validate_part(p, lenient_time=lenient_time)
        if errs:
            raise SystemExit(f"Phần {p['part']} không hợp lệ:\n- " + "\n- ".join(errs))
        log(f"  Phần {p['part']}: ✓ {stats}")
    con.execute("INSERT OR REPLACE INTO days(day, date, title) VALUES (?,?,?)", (day, meta["date"], meta.get("title_vi")))
    for p in parts:
        sid = epno = None
        if p["part"] == 1:
            s = p["series"]
            row = con.execute("SELECT * FROM series WHERE season=?", (s["season"],)).fetchone()
            if row is None:
                sid = db.create_series(con, s["season"], s.get("theme", ""), s.get("title_vi"), s.get("title_en"),
                                       json.dumps(s.get("bible", {}), ensure_ascii=False))
            else:
                sid = row["id"]
            epno = s["episode_no"]
        summary = summarize_episode(p) if p["part"] == 1 else p.get("summary_vi")
        eid = db.upsert_episode(
            con, day=day, part=p["part"], kind=p["kind"], series_id=sid, episode_no=epno,
            title_vi=p["title_vi"], title_en=p["title_en"], topic=p["topic"], subject=p.get("subject"),
            summary=summary, script_path=str(day_dir(day) / PART_FILES[p["part"] - 1]))
        for ph in p["phrases"]:
            db.add_phrase(con, eid, meta["date"], {**ph, "key": phrase_key(day, p["part"], ph["id"])})
        for w in p.get("words", []):
            db.add_phrase(con, eid, meta["date"], {**w, "kind": "word", "key": phrase_key(day, p["part"], w["id"]),
                                                   "recall_vi": w.get("recall_vi") or w.get("example_vi")})
        if p["part"] == 1:
            db.advance_series(con, sid, epno, summary)
    con.commit()
    rp = day_dir(day) / "review.json"
    if not rp.exists():
        plan = plan_review(day, meta["date"], parts, con)
        rp.write_text(json.dumps(plan, ensure_ascii=False, indent=1), encoding="utf-8")
        log(f"  Phần 4: {len(plan['items'])} cụm ({plan['due_count']} đến hạn, {plan['fresh_count']} mới), "
            f"≈ {plan['est_min']} phút")
    log(f"Đã nhập ngày {day} vào {config.DATA_DIR / 'bizstory.sqlite'}")


def rebuild_db(log=print) -> None:
    """Dựng lại SQLite từ content/days (khi đổi máy hoặc mất file DB): nhập từng ngày, phát lại lịch ôn."""
    from .render import commit_srs

    days = sorted(int(p.name.split("_")[1]) for p in config.DAYS_DIR.glob("day_*") if (p / "day.json").exists())
    for d in days:
        import_day(d, log=log, lenient_time=True)
        rp = day_dir(d) / "review.json"
        if rp.exists():
            con = db.connect()
            plan = script.load_json(rp)
            commit_srs(con, d, plan["date"], plan)
            con.commit()
