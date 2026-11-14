#!/usr/bin/env python3
"""Trang giới thiệu có chữ thật cho Google (SEO): /toan-lop-4/ trên babelisa.com.
(Toán lớp 3 đã có mục lục bài học riêng ở /lab/toan3-9yt2a3py/hoc/ nên không tạo trang ở đây: "build": False.)

App Flutter web vẽ mọi thứ lên canvas nên Google gần như không đọc được chữ trong app. Trang này liệt kê
đủ chủ đề, tên từng bài, đề kiểm tra và câu hỏi thường gặp (kèm dữ liệu có cấu trúc schema.org), có nút
"Vào học ngay" dẫn vào app.

  python3 tool/seo_pages.py /home/user/babelisa/public
→ <public>/toan-lop-4/index.html (đọc catalog của toan-lop-4).
"""
import html
import json
import pathlib
import sys

COIBYT = pathlib.Path(__file__).resolve().parents[2]
SITE = "https://babelisa.com"

COURSES = [
    {
        "slug": "toan-lop-4", "dir": "toan-lop-4", "grade": 4, "intro": "/toan-lop-4/", "build": True, "app": "/lab/toan4-ttuclnqj/",
        "image": "/lab/toan4-ttuclnqj/og-banner.jpg", "color": "#6b3fc4", "age": "9–10 tuổi",
        "extra": [
            ("🖼️", "Làm sai, cô giảng lại bằng tranh", "53 tranh minh hoạ cho từng dạng toán: que chỉ chạy tới từng chi tiết, cô giảng lại rồi mời bé làm lại."),
            ("🦜", "Toán + Tiếng Anh cùng vẹt Lulu", "Chế độ song ngữ có giọng đọc tiếng Anh, Đảo Tiếng Anh với 14 hòn đảo từ vựng toán học."),
        ],
    },
    {
        "slug": "toan-lop-3", "dir": "toan-lop-3", "grade": 3, "intro": "/lab/toan3-9yt2a3py/hoc/", "build": False, "app": "/lab/toan3-9yt2a3py/",
        "image": "/lab/toan3-9yt2a3py/og-image.jpg", "color": "#d1531f", "age": "8–9 tuổi",
        "extra": [
            ("🧮", "Bảng nhân, bảng chia thuộc nhanh", "Luyện bảng nhân chia, phép tính trong phạm vi 1000 và 100 000 bằng trò chơi và gợi ý từng bước."),
            ("🦜", "Toán + Tiếng Anh", "Chế độ song ngữ: vừa học Toán vừa học tiếng Anh với giọng đọc tiếng Anh."),
        ],
    },
]


def load(course):
    c = json.loads((COIBYT / course["dir"] / "assets/content/catalog.json").read_text())
    book = c["books"][0]
    chapters = book["chapters"]
    problems = 0
    for ch in chapters:
        for l in ch["lessons"]:
            problems += len(json.loads((COIBYT / course["dir"] / l["src"]).read_text()).get("problems", []))
    return book, chapters, problems


def page(course):
    book, chapters, problems = load(course)
    g = course["grade"]
    n_lessons = sum(len(ch["lessons"]) for ch in chapters)
    n_adv = sum(len(ch.get("advancedLessons") or []) for ch in chapters)
    exams = book["exams"]
    url = f"{SITE}/{course['slug']}/"
    e = html.escape
    title = f"Toán lớp {g} online: video bài giảng, bài tập, đề thi – Học cùng Cô Mai"
    desc = (f"Học Toán lớp {g} cùng cô Mai: {n_lessons} video bài giảng có cô giáo nói, {problems} bài tập có lời giải "
            f"từng bước, {len(exams)} đề kiểm tra giữa kì, cuối kì và gameshow Toán học. Theo SGK Kết nối tri thức. Học thử miễn phí.")
    features = [
        ("📺", "Video bài giảng có cô giáo nói", f"{n_lessons} bài giảng: cô Mai viết bảng, vẽ hình, đọc to và hỏi bé ngay trong bài."),
        ("✏️", f"{problems} bài tập có lời giải", "Trắc nghiệm, điền số, đúng/sai; gợi ý từng bước, lời giải chi tiết và mẹo Nhớ nhanh."),
        ("📝", f"{len(exams)} đề kiểm tra", "Kiểm tra cuối tuần, kiểm tra chủ đề, đề giữa học kì và cuối học kì có tính giờ như thi thật."),
        ("🎤", "Gameshow Ngôi sao Toán học", "MC dẫn chương trình, 15 câu hỏi leo thang, quyền trợ giúp 50:50 và hỏi cô Mai."),
        *course["extra"],
        ("🏆", f"{n_adv} bài nâng cao", "Mỗi tuần một bài nâng cao cho học sinh giỏi, nhân đôi phần thưởng."),
        ("👨‍👩‍👧", "An toàn cho bé", "Không quảng cáo, không cần đăng ký tài khoản, tiến độ lưu ngay trên máy."),
    ]
    faq = [
        (f"Toán lớp {g} – Học cùng Cô Mai có miễn phí không?",
         f"Có thể học thử miễn phí: toàn bộ {n_lessons} bài giảng đều mở ngay trên trình duyệt, không cần đăng ký tài khoản."),
        ("Nội dung theo sách giáo khoa nào?",
         f"Theo chương trình Toán lớp {g} hiện hành, bám sát bộ sách Kết nối tri thức với cuộc sống: {len(chapters)} chủ đề, {n_lessons} bài, chia theo Tập một và Tập hai."),
        ("Có cần cài ứng dụng không?",
         "Không cần. Bấm \"Vào học ngay\" là học được trên điện thoại, máy tính bảng hoặc máy tính. Có thể thêm vào màn hình chính để mở nhanh như một ứng dụng."),
        ("Bé làm sai thì sao?",
         "Cô Mai gợi ý từng bước, giải thích lời giải và cho bé làm lại. Ở Toán lớp 4, cô còn mở tranh minh hoạ để giảng lại dạng toán bé chưa hiểu."),
        (f"Ứng dụng phù hợp với bé mấy tuổi?",
         f"Dành cho học sinh lớp {g} ({course['age']}) tự học ở nhà, ôn tập hè hoặc ôn thi giữa kì, cuối kì cùng bố mẹ."),
        ("Có quảng cáo không?", "Không. Ứng dụng không có quảng cáo và không thu thập dữ liệu cá nhân của bé."),
    ]
    terms = {}
    for ch in chapters:
        terms.setdefault(ch.get("volume") or 1, []).append(ch)
    prog = []
    for vol, chs in terms.items():
        prog.append(f'<h3 class="term">Học kì {vol} · Tập {"một" if vol == 1 else "hai"}</h3>')
        for ch in chs:
            items = "".join(f"<li>{e(l['title'])}</li>" for l in ch["lessons"])
            prog.append(f'<details{" open" if ch["order"] == 1 else ""}><summary><b>Chủ đề {ch["order"]}.</b> {e(ch["title"])} '
                        f'<small>{len(ch["lessons"])} bài</small></summary><ol>{items}</ol></details>')
    exam_groups = {}
    for x in exams:
        t = x["title"]
        key = ("Kiểm tra cuối tuần" if "cuối tuần" in t else "Kiểm tra chủ đề" if "chủ đề" in t
               else "Đề giữa học kì" if "giữa" in t else "Đề cuối học kì" if "cuối học kì" in t else "Đề khác")
        exam_groups.setdefault(key, []).append(t)
    exam_html = "".join(f"<li><b>{e(k)}</b>: {len(v)} đề" + (f" ({e(', '.join(v))})" if len(v) <= 4 else "") + "</li>"
                        for k, v in exam_groups.items())
    ld = [
        {
            "@context": "https://schema.org", "@type": "Course",
            "name": f"Toán lớp {g} – Học cùng Cô Mai", "description": desc, "url": url,
            "inLanguage": "vi", "educationalLevel": f"Lớp {g} – Tiểu học",
            "provider": {"@type": "Organization", "name": "Babelisa", "sameAs": SITE},
            "image": SITE + course["image"],
            "offers": [{"@type": "Offer", "category": "Partially Free"}],
            "hasCourseInstance": [{"@type": "CourseInstance", "courseMode": "Online", "courseWorkload": "PT10M"}],
            "syllabusSections": [{"@type": "Syllabus", "name": f"Chủ đề {ch['order']}: {ch['title']}"} for ch in chapters],
        },
        {
            "@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faq],
        },
        {
            "@context": "https://schema.org", "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Babelisa", "item": SITE + "/"},
                {"@type": "ListItem", "position": 2, "name": "Khóa học", "item": SITE + "/khoa-hoc/"},
                {"@type": "ListItem", "position": 3, "name": f"Toán lớp {g}", "item": url},
            ],
        },
    ]
    other = [c for c in COURSES if c is not course][0]
    feat_html = "".join(f'<div class="feat"><span>{i}</span><div><h3>{e(t)}</h3><p>{e(d)}</p></div></div>' for i, t, d in features)
    faq_html = "".join(f"<details><summary>{e(q)}</summary><p>{e(a)}</p></details>" for q, a in faq)
    return f"""<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{e(title)}</title>
  <meta name="description" content="{e(desc)}">
  <link rel="canonical" href="{url}">
  <meta name="theme-color" content="{course['color']}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Babelisa">
  <meta property="og:locale" content="vi_VN">
  <meta property="og:url" content="{url}">
  <meta property="og:title" content="Toán lớp {g} – Học cùng Cô Mai 🐝 Video bài giảng có cô giáo nói">
  <meta property="og:description" content="{e(desc)}">
  <meta property="og:image" content="{SITE}{course['image']}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="{SITE}{course['image']}">
  <link rel="icon" type="image/png" href="{course['app']}favicon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Nunito:wght@600;700;800;900&display=swap" rel="stylesheet">
  <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
  <style>
    :root {{ --c: {course['color']}; --ink: #2b2016; --muted: #6b5a48; --bg: #fdf6e6; --gold: #f5b733; --gold-l: #ffe48f; }}
    * {{ box-sizing: border-box; }}
    body {{ margin: 0; font: 600 16.5px/1.6 'Nunito', system-ui, sans-serif; color: var(--ink); background: var(--bg); }}
    a {{ color: var(--c); }}
    .wrap {{ max-width: 920px; margin: 0 auto; padding: 0 16px; }}
    header.top {{ display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 12px 0; font-weight: 800; font-size: 14.5px; }}
    header.top a {{ text-decoration: none; color: var(--ink); background: #fff; padding: 7px 13px; border-radius: 999px; box-shadow: 0 2px 0 #e2cfa9; }}
    nav.crumb {{ font-size: 13.5px; color: var(--muted); }}
    nav.crumb a {{ color: var(--muted); }}
    .hero {{ display: grid; gap: 18px; align-items: center; margin: 8px 0 26px; }}
    @media (min-width: 760px) {{ .hero {{ grid-template-columns: 1fr 1.05fr; }} }}
    h1 {{ margin: 0; font: 800 clamp(30px, 6vw, 44px)/1.1 'Baloo 2', sans-serif; color: var(--c); }}
    .lead {{ margin: 10px 0 16px; font-size: 18px; color: var(--muted); }}
    .hero img {{ width: 100%; height: auto; border-radius: 20px; box-shadow: 0 12px 30px rgba(60, 30, 10, .2); display: block; }}
    .cta {{ display: inline-flex; align-items: center; gap: 10px; padding: 14px 24px; border-radius: 16px; text-decoration: none; font: 800 21px 'Baloo 2', sans-serif; color: #3a2408; background: linear-gradient(180deg, var(--gold-l), var(--gold)); box-shadow: 0 5px 0 #a86a0e; }}
    .cta:active {{ transform: translateY(3px); box-shadow: 0 2px 0 #a86a0e; }}
    .stats {{ display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }}
    .stats span {{ padding: 5px 12px; border-radius: 999px; background: #fff; font-weight: 900; font-size: 14px; color: var(--c); box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--c) 30%, white); }}
    h2 {{ margin: 34px 0 12px; font: 800 28px/1.2 'Baloo 2', sans-serif; color: var(--ink); }}
    .feats {{ display: grid; gap: 12px; }}
    @media (min-width: 700px) {{ .feats {{ grid-template-columns: 1fr 1fr; }} }}
    .feat {{ display: flex; gap: 12px; padding: 14px; border-radius: 16px; background: #fff; box-shadow: 0 3px 0 #ecdcbc; }}
    .feat > span {{ font-size: 30px; line-height: 1.2; }}
    .feat h3 {{ margin: 0 0 2px; font-size: 17.5px; font-weight: 900; }}
    .feat p {{ margin: 0; color: var(--muted); font-size: 15px; }}
    details {{ background: #fff; border-radius: 14px; margin: 8px 0; padding: 4px 14px; box-shadow: 0 2px 0 #ecdcbc; }}
    summary {{ cursor: pointer; padding: 9px 0; font-weight: 800; }}
    summary small {{ color: var(--muted); font-weight: 700; margin-left: 6px; }}
    details ol {{ margin: 0 0 12px; padding-left: 26px; color: var(--muted); }}
    details p {{ margin: 0 0 12px; color: var(--muted); }}
    .term {{ margin: 18px 0 6px; font-size: 18px; color: var(--c); }}
    ul.exams {{ padding-left: 20px; color: var(--muted); }}
    .end {{ margin: 36px 0 20px; padding: 22px 18px; border-radius: 20px; text-align: center; background: var(--c); color: #fff; }}
    .end p {{ margin: 0 0 14px; font-size: 19px; font-weight: 800; }}
    footer {{ padding: 10px 0 40px; text-align: center; font-size: 14px; color: var(--muted); }}
  </style>
</head>
<body>
  <div class="wrap">
    <header class="top"><a href="/khoa-hoc/">‹ Các khoá học</a><a href="/">🏝️ Babelisa</a></header>
    <nav class="crumb" aria-label="breadcrumb"><a href="/">Babelisa</a> › <a href="/khoa-hoc/">Khóa học</a> › Toán lớp {g}</nav>
    <section class="hero">
      <div>
        <h1>Toán lớp {g} – Học cùng Cô Mai</h1>
        <p class="lead">Video bài giảng có cô giáo nói, bài tập có lời giải từng bước, đề kiểm tra giữa kì, cuối kì và gameshow Toán học. Theo chương trình SGK Kết nối tri thức với cuộc sống.</p>
        <a class="cta" href="{course['app']}">▶ Vào học ngay</a>
        <div class="stats"><span>{len(chapters)} chủ đề</span><span>{n_lessons} bài giảng</span><span>{problems} bài tập</span><span>{len(exams)} đề kiểm tra</span></div>
      </div>
      <a href="{course['app']}"><img src="{course['image']}" alt="Toán lớp {g} – Học cùng Cô Mai: cô giáo giảng bài Toán lớp {g}" width="1200" height="630"></a>
    </section>

    <h2>Bé học được gì?</h2>
    <div class="feats">{feat_html}</div>

    <h2>Chương trình Toán lớp {g} ({n_lessons} bài)</h2>
    <p>Đủ {len(chapters)} chủ đề của cả năm học, mỗi bài có video bài giảng, phần Nhớ nhanh và bài luyện tập.</p>
    {''.join(prog)}

    <h2>Đề kiểm tra Toán lớp {g}</h2>
    <ul class="exams">{exam_html}</ul>

    <h2>Câu hỏi thường gặp</h2>
    {faq_html}

    <div class="end"><p>Để cô Mai cùng bé chinh phục điểm 10 môn Toán lớp {g}!</p><a class="cta" href="{course['app']}">▶ Vào học ngay</a></div>
    <footer>Xem thêm: <a href="{other['intro']}">Toán lớp {other['grade']}</a> · <a href="/khoa-hoc/">Tất cả khoá học</a> · <a href="{course['app']}privacy.html">Chính sách quyền riêng tư</a><br>© Babelisa</footer>
  </div>
</body>
</html>
"""


def main():
    out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "/home/user/babelisa/public")
    for c in [c for c in COURSES if c["build"]]:
        d = out / c["slug"]
        d.mkdir(parents=True, exist_ok=True)
        (d / "index.html").write_text(page(c))
        print("OK", d / "index.html")


if __name__ == "__main__":
    main()
