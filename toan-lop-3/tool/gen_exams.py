#!/usr/bin/env python3
"""Sinh bộ đề Luyện thi cả năm từ các bài học đã có (chạy SAU tool/gen_curriculum.py).

  python3 tool/gen_exams.py

Tạo trong assets/content/exams/:
  * mỗi tuần học một đề "Kiểm tra cuối tuần" (15 phút, 5 câu × 2 điểm) — bài tập của đúng các bài học trong tuần đó;
  * 16 đề "Kiểm tra chủ đề" (35 phút, 10 câu) — một đề cho mỗi chủ đề, đặt vào tuần học xong chủ đề;
  * đề Giữa / Cuối học kì 1 và 2 (40 phút, 10 câu; đề số 2 dành cho VIP).
Rồi ghi mục lục đề vào catalog.json và gắn mỗi đề vào một tuần trong calendar.json (mục "exams").

Mọi câu hỏi được LẤY NGUYÊN từ bài học (đề, đáp án, lời giải đã được bộ kiểm tra toán học xác nhận),
chỉ đổi mã câu. Chọn câu ngẫu nhiên có hạt giống cố định → chạy lại ra đúng kết quả cũ.
Không đụng tới các đề viết tay có sẵn.
"""
import copy
import json
import os
import pathlib
import random

ROOT = pathlib.Path(os.environ.get("TOAN3_ROOT") or pathlib.Path(__file__).resolve().parent.parent)
CONTENT = ROOT / "assets" / "content"
EXAMS = CONTENT / "exams"
PREFIX = "kntt3.gen."  # mã đề do tool này sinh (để chạy lại thì thay thế, không nhân đôi)
SCHEMA = "1.3.0"

CHOICE_TYPES = {"multiple_choice", "matching"}


def load(p):
    return json.loads(pathlib.Path(p).read_text(encoding="utf-8"))


def dump(p, data):
    pathlib.Path(p).write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def lesson_problems(src):
    return load(ROOT / src)["problems"]


def pick(rng, pool, n, *, prefer_levels=None):
    """Chọn n câu khác nhau, ưu tiên trải đều mức độ, trắc nghiệm trước tự luận."""
    pool = [p for p in pool if p.get("access", "free") == "free"]
    rng.shuffle(pool)
    if prefer_levels:
        pool.sort(key=lambda p: prefer_levels.index(p["level"]) if p["level"] in prefer_levels else 9)
    chosen, seen = [], set()
    # lấy xoay vòng theo bài học để đề phủ đủ các bài
    by_lesson = {}
    for p in pool:
        by_lesson.setdefault(p["id"].rsplit(".", 1)[0], []).append(p)
    keys = list(by_lesson)
    rng.shuffle(keys)
    while len(chosen) < n and any(by_lesson.values()):
        for k in keys:
            if by_lesson[k] and len(chosen) < n:
                p = by_lesson[k].pop(0)
                if p["prompt"]["text"] not in seen:
                    seen.add(p["prompt"]["text"])
                    chosen.append(p)
    chosen.sort(key=lambda p: (p["type"] not in CHOICE_TYPES, p["level"]))
    return chosen


def short(desc: str, fallback: str) -> str:
    """Mô tả đề tối đa 160 ký tự (giới hạn của schema)."""
    return desc if len(desc) <= 160 else fallback


def build_exam(exam_id, title, desc, etype, term, minutes, access, chapter_ids, problems, points_each):
    items_mc, items_tl = [], []
    for i, p in enumerate(problems, 1):
        q = copy.deepcopy(p)
        q["id"] = f"{exam_id}.q{i:02d}"
        q["access"] = "free"
        q.setdefault("solution", {})["access"] = "free"
        item = {"points": points_each, "problem": q}
        (items_mc if q["type"] in CHOICE_TYPES else items_tl).append(item)
    sections = []
    if items_mc:
        sections.append({"title": "Phần 1. Trắc nghiệm", "items": items_mc})
    if items_tl:
        sections.append({"title": f"Phần {len(sections) + 1}. Tự luận", "items": items_tl})
    return {
        "schemaVersion": SCHEMA,
        "kind": "exam",
        "id": exam_id,
        "bookId": "kntt3",
        "chapterIds": chapter_ids,
        "title": title,
        "description": desc,
        "examType": etype,
        "term": term,
        "durationMinutes": minutes,
        "access": access,
        "contentRev": 1,
        "sections": sections,
    }


def main():
    catalog = load(CONTENT / "catalog.json")
    cal_path = CONTENT / "calendar.json"
    calendar = load(cal_path)
    book = next(b for b in catalog["books"] if b["id"] == "kntt3")
    chapters = sorted(book["chapters"], key=lambda c: c["order"])
    lesson_src = {l["id"]: l["src"] for c in chapters for l in c["lessons"]}
    lesson_chapter = {l["id"]: c for c in chapters for l in c["lessons"]}
    lesson_title = {l["id"]: l["title"] for c in chapters for l in c["lessons"]}
    problems_of = {lid: lesson_problems(src) for lid, src in lesson_src.items()}

    # Tuần của từng bài học (theo lịch)
    weeks = {}
    for d in calendar["days"]:
        weeks.setdefault(d["week"], {"term": d["term"], "lessons": [], "dates": []})
        w = weeks[d["week"]]
        w["dates"].append(d["date"])
        if d["lessonId"] not in w["lessons"]:
            w["lessons"].append(d["lessonId"])
    last_week_of_chapter = {}
    for wk, w in sorted(weeks.items()):
        for lid in w["lessons"]:
            last_week_of_chapter[lesson_chapter[lid]["id"]] = wk

    for f in EXAMS.glob(f"{PREFIX}*.json"):
        f.unlink()
    exams, placed = [], []

    def add(exam, week):
        dump(EXAMS / f"{exam['id']}.json", exam)
        exams.append(exam)
        placed.append({"week": week, "examId": exam["id"]})

    # 1) Kiểm tra cuối tuần
    for wk, w in sorted(weeks.items()):
        pool = [p for lid in w["lessons"] for p in problems_of[lid]]
        rng = random.Random(f"tuan-{wk}")
        chosen = pick(rng, pool, 5, prefer_levels=[1, 2, 3])
        if len(chosen) < 5:
            continue
        titles = [lesson_title[l] for l in w["lessons"]]
        chap_ids = sorted({lesson_chapter[l]["id"] for l in w["lessons"]}, key=lambda c: int(c.rsplit("c", 1)[1]))
        add(
            build_exam(
                f"{PREFIX}tuan-{wk:02d}",
                f"Kiểm tra cuối tuần {wk}",
                short("Ôn lại bài của tuần: " + "; ".join(titles) + ".", f"Ôn lại {len(titles)} bài học của tuần {wk}."),
                "kt_15p", w["term"], 15, "free", chap_ids, chosen, 2,
            ),
            wk,
        )

    # 2) Kiểm tra chủ đề (sau khi học xong chủ đề)
    for c in chapters:
        pool = [p for l in c["lessons"] for p in problems_of[l["id"]]]
        rng = random.Random(f"chu-de-{c['order']}")
        chosen = pick(rng, pool, 10, prefer_levels=[2, 1, 3])
        if len(chosen) < 10:
            continue
        term = 1 if c.get("volume", 1) == 1 else 2
        add(
            build_exam(
                f"{PREFIX}chu-de-{c['order']:02d}",
                f"Kiểm tra chủ đề {c['order']}",
                short(c["title"] + ".", f"Chủ đề {c['order']}."),
                "kt_1_tiet", term, 35, "free", [c["id"]], chosen, 1,
            ),
            last_week_of_chapter.get(c["id"], 35),
        )

    # 3) Giữa kì, cuối kì: phủ các chủ đề đã học đến tuần đó
    # Tuần thi: giữa kì = tuần giữa học kì (hoặc tuần của đề viết tay cùng loại nếu lịch đã có), cuối kì = tuần cuối.
    term_weeks = {t: sorted(w for w, x in weeks.items() if x["term"] == t) for t in (1, 2)}
    handmade = {e["examType"]: e["id"] for e in book["exams"] if not e["id"].startswith(PREFIX)}
    cal_week = {e["examId"]: e["week"] for e in calendar.get("exams", [])}

    def week_for(etype, term, mid):
        if etype in handmade and handmade[etype] in cal_week:
            return cal_week[handmade[etype]]
        ws = term_weeks[term]
        return ws[(len(ws) - 1) // 2] if mid else ws[-1]

    big = [
        ("giua-hk1", "giua_hk1", "Đề giữa học kì 1", 1, week_for("giua_hk1", 1, True)),
        ("cuoi-hk1", "cuoi_hk1", "Đề cuối học kì 1", 1, week_for("cuoi_hk1", 1, False)),
        ("giua-hk2", "giua_hk2", "Đề giữa học kì 2", 2, week_for("giua_hk2", 2, True)),
        ("cuoi-hk2", "cuoi_hk2", "Đề cuối học kì 2", 2, week_for("cuoi_hk2", 2, False)),
    ]
    for slug, etype, title, term, wk in big:
        lessons = [
            l for w2, w in sorted(weeks.items()) if w["term"] == term and w2 <= wk for l in w["lessons"]
        ]
        lessons = list(dict.fromkeys(lessons))
        pool = [p for lid in lessons for p in problems_of[lid]]
        chap_ids = list(dict.fromkeys(lesson_chapter[l]["id"] for l in lessons))
        for n in (1, 2):
            rng = random.Random(f"{slug}-{n}")
            chosen = pick(rng, pool, 10, prefer_levels=[2, 3, 1] if n == 2 else [1, 2, 3])
            if len(chosen) < 10:
                continue
            # Học kì 1 đã có "Đề số 1" viết tay → đề sinh tự động đánh số tiếp theo.
            number = n + 1 if term == 1 else n
            add(
                build_exam(
                    f"{PREFIX}{slug}-de-{n}",
                    f"{title} — Đề số {number}",
                    short(
                        "Ôn tập các chủ đề: " + "; ".join(dict.fromkeys(lesson_chapter[l]["title"] for l in lessons)) + ".",
                        "Ôn tập chủ đề " + ", ".join(str(int(c.rsplit("c", 1)[1])) for c in chap_ids) + ".",
                    ),
                    etype, term, 40, "free" if n == 1 else "vip", chap_ids, chosen, 1,
                ),
                wk,
            )

    # Mục lục đề trong catalog (giữ đề viết tay)
    book["exams"] = [e for e in book["exams"] if not e["id"].startswith(PREFIX)] + [
        {
            "id": e["id"],
            "title": e["title"],
            "src": f"assets/content/exams/{e['id']}.json",
            "access": e["access"],
            "examType": e["examType"],
            "durationMinutes": e["durationMinutes"],
            "term": e["term"],
        }
        for e in exams
    ]
    dump(CONTENT / "catalog.json", catalog)

    # Gắn đề vào tuần trong lịch (giữ các mục đề viết tay đã có)
    known = {e["examId"] for e in calendar.get("exams", []) if not e["examId"].startswith(PREFIX)}
    calendar["exams"] = sorted(
        [e for e in calendar.get("exams", []) if e["examId"] in known] + placed,
        key=lambda e: (e["week"], e["examId"]),
    )
    dump(cal_path, calendar)
    print(f"Đã sinh {len(exams)} đề; tổng số đề trong catalog: {len(book['exams'])}.")


if __name__ == "__main__":
    main()
