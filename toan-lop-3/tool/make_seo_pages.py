#!/usr/bin/env python3
"""Tạo các trang web tĩnh chuẩn SEO để Google tìm thấy game (chữ HTML thật, Google đọc được):

  web/hoc/index.html          trang giới thiệu: tính năng, ảnh, hỏi đáp, mục lục toàn bộ bài học
  web/hoc/<bài>.html          mỗi bài: lý thuyết, ví dụ có tranh, bài tập mẫu có đáp án, từ vựng tiếng Anh
  web/hoc/style.css, web/hoc/img/*.webp
  web/sitemap.xml             sơ đồ trang để gửi Google Search Console

Chạy trong thư mục toan-lop-3:  python tool/make_seo_pages.py
"""
import html
import json
import pathlib
import re
import unicodedata
from datetime import date

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
SITE = "https://babelisa.com/lab/toan3-9yt2a3py/"
# Địa chỉ đẹp của trang giới thiệu (babelisa.com/toan-lop-3/ — bản sao của hoc/index.html, là địa chỉ chính cho Google).
LANDING = "https://babelisa.com/toan-lop-3/"
OUT = ROOT / "web" / "hoc"
APP_NAME = "Toán Lớp 3 & Tiếng Anh: Cô Mai"
TODAY = date.today().isoformat()


def esc(s):
    return html.escape(str(s), quote=True)


def slugify(s):
    s = s.replace("đ", "d").replace("Đ", "D")
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")[:80]


catalog = json.loads((ROOT / "assets/content/catalog.json").read_text())
english = json.loads((ROOT / "assets/content/en.json").read_text())
examples = json.loads((ROOT / "assets/content/examples.json").read_text())

# ---- Danh sách bài (theo thứ tự chủ đề) + đường dẫn đẹp, không trùng ----
lessons, used = [], set()
for ch in catalog["books"][0]["chapters"]:
    for kind, refs in (("core", ch["lessons"]), ("adv", ch.get("advancedLessons", []))):
        for ref in refs:
            slug = slugify(ref["title"])
            if slug in used or slug in {"luyen-tap-chung", "on-tap-chung"}:
                slug = f"{slug}-chu-de-{ch['order']}"
            n = 2
            while slug in used:
                slug, n = f"{slug}-{n}", n + 1
            used.add(slug)
            lessons.append(dict(ref=ref, chapter=ch, slug=slug, kind=kind))


def block_html(b):
    k = b["kind"]
    if k == "text":
        cls = {"rule": "rule", "tip": "tip"}.get(b.get("style"), "")
        label = {"rule": "Ghi nhớ", "tip": "Mẹo"}.get(b.get("style"))
        return f'<p class="{cls}">{f"<b>{label}:</b> " if label else ""}{esc(b["text"])}</p>'
    if k == "equation":
        return f'<p class="eq">{esc(b["text"])}</p>'
    if k == "column_arithmetic":
        op = {"add": "+", "subtract": "−", "multiply": "×"}[b["operation"]]
        rows = b["operands"]
        w = max(len(x) for x in rows + [b["result"]]) + 2
        lines = [rows[0].rjust(w)] + [(op + r.rjust(w - 1)) for r in rows[1:]] + ["─" * w, b["result"].rjust(w)]
        steps = "".join(f"<li>{esc(s['text'])}</li>" for s in b.get("digitSteps", []))
        return f'<pre class="col">{esc(chr(10).join(lines))}</pre><ol class="steps">{steps}</ol>'
    if k == "long_division":
        r = f" (dư {b['remainder']})" if b.get("remainder") else ""
        steps = "".join(f"<li>{esc(s['text'])}</li>" for s in b.get("digitSteps", []))
        return (f'<p class="eq">{esc(b["dividend"])} : {esc(b["divisor"])} = {esc(b["quotient"])}{r}</p>'
                f'<ol class="steps">{steps}</ol>')
    if k == "word_problem":
        body = "".join(f"<p>{esc(l['explanation'])}<br><b>{esc(l['equation'])}</b></p>" for l in b["lines"])
        return f'<div class="wp">{body}<p class="ans">Đáp số: {esc(b["answer"])}</p></div>'
    return ""


def problem_html(i, p):
    q = esc(p["prompt"]["text"]).replace("\n", "<br>")
    extra = ""
    if p.get("choices"):
        extra = "<ol class='abc'>" + "".join(f"<li>{esc(c['text'])}</li>" for c in p["choices"]) + "</ol>"
    elif p.get("template") and p["type"] == "fill_blank":
        tpl = esc(re.sub(r"\{\{\w+\}\}", "…", p["template"])).replace("\n", "<br>")
        extra = f"<p class='tpl'>{tpl}</p>"
    sol = p.get("solution", {})
    steps = "".join(block_html(b) for b in sol.get("steps", []))
    return (f'<div class="pb"><p class="q"><span class="n">Bài {i}.</span> <i>{esc(p.get("instruction", ""))}</i> {q}</p>{extra}'
            f'<details><summary>Xem đáp án và lời giải</summary><p class="ans">Đáp án: {esc(sol.get("answerText", ""))}</p>'
            f'{steps}</details></div>')


HEAD = """<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta property="og:type" content="website">
<meta property="og:locale" content="vi_VN">
<meta property="og:site_name" content="{app}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{site}og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/png" href="{site}favicon.png">
<link rel="stylesheet" href="{site}hoc/style.css">
<script type="application/ld+json">{ld}</script>
</head>
<body>
<header class="top"><a class="brand" href="{landing}"><img src="{site}hoc/img/logo.webp" alt="" width="40" height="40">Toán Lớp 3</a>
<a class="cta small" href="{site}">▶ Học miễn phí</a></header>
<main>
"""
FOOT = """</main>
<footer><p><a href="{landing}">Toán lớp 3 – mục lục bài học</a> · <a href="{site}">Mở ứng dụng học cùng Cô Mai</a> · <a href="{site}privacy.html">Chính sách quyền riêng tư</a></p>
<p>Nội dung bám sát chương trình Toán 3 sách giáo khoa mới. Miễn phí, không quảng cáo.</p></footer>
</body>
</html>
"""


def page(path, title, desc, body, ld, canonical=None):
    url = canonical or SITE + path
    out = OUT.parent / path
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(HEAD.format(title=esc(title), desc=esc(desc), url=url, app=esc(APP_NAME), site=SITE,
                               ld=json.dumps(ld, ensure_ascii=False), landing=LANDING) + body + FOOT.format(site=SITE, landing=LANDING))
    return url


def lesson_page(i, L):
    ref, ch = L["ref"], L["chapter"]
    data = json.loads((ROOT / ref["src"]).read_text())
    title = ref["title"]
    en = english.get(ref["id"], {})
    rules = [b["text"] for b in data["theory"]["blocks"] if b["kind"] == "text" and b.get("style") == "rule"]
    desc = (f"{title} – Toán lớp 3: " + (rules[0] if rules else "lý thuyết, ví dụ, bài tập có đáp án") +
            " Bài tập có lời giải, từ vựng tiếng Anh, học cùng cô giáo biết nói.")[:300]
    level = "Nâng cao – " if L["kind"] == "adv" else ""
    body = [f'<nav class="crumb"><a href="{LANDING}">Toán lớp 3</a> › Chủ đề {ch["order"]}: {esc(ch["title"])}</nav>',
            f"<h1>{esc(level + title)}</h1>"]
    if en.get("title"):
        body.append(f'<p class="en">🇬🇧 {esc(en["title"])}</p>')
    body.append(f'<p><a class="cta" href="{SITE}">▶ Học bài này cùng Cô Mai – có giọng nói, miễn phí</a></p>')
    body.append("<h2>Lý thuyết cần nhớ</h2>" + "".join(block_html(b) for b in data["theory"]["blocks"]))
    exs = examples.get(ref["id"], [])
    if exs:
        body.append("<h2>Ví dụ trong cuộc sống</h2><div class='exs'>")
        for n, e in enumerate(exs):
            img = f"{SITE}assets/assets/examples/{ref['id']}-{n + 1}.webp"
            lines = " ".join(esc(l["say"]) for l in e["lines"])
            body.append(f'<figure><img src="{img}" alt="{esc(e["title"])}" loading="lazy" width="720" height="540">'
                        f"<figcaption><b>{esc(e['title'])}</b><br>{lines}</figcaption></figure>")
        body.append("</div>")
    free = [p for p in data["problems"] if p.get("access") == "free"][:8]
    if free:
        body.append(f"<h2>Bài tập mẫu có đáp án ({len(free)} bài)</h2>")
        body += [problem_html(k + 1, p) for k, p in enumerate(free)]
        body.append(f'<p class="more">Còn nhiều bài tập nữa trong ứng dụng – cô Mai đọc đề, gợi ý và chấm điểm ngay. '
                    f'<a href="{SITE}">Luyện tập ngay ›</a></p>')
    if en.get("vocab"):
        body.append("<h2>Từ vựng Toán bằng tiếng Anh</h2><table class='voc'><tr><th></th><th>Tiếng Anh</th><th>Tiếng Việt</th></tr>")
        body += [f"<tr><td>{esc(v.get('emoji', ''))}</td><td><b>{esc(v['en'])}</b></td><td>{esc(v['vi'])}</td></tr>"
                 for v in en["vocab"]]
        body.append("</table>")
    nav = []
    if i > 0:
        p = lessons[i - 1]
        nav.append(f'<a href="{SITE}hoc/{p["slug"]}.html">‹ {esc(p["ref"]["title"])}</a>')
    if i + 1 < len(lessons):
        n = lessons[i + 1]
        nav.append(f'<a href="{SITE}hoc/{n["slug"]}.html">{esc(n["ref"]["title"])} ›</a>')
    body.append(f'<nav class="pn">{"".join(nav)}</nav>')
    url = SITE + f"hoc/{L['slug']}.html"
    ld = [{
        "@context": "https://schema.org", "@type": "LearningResource", "name": title, "description": desc,
        "inLanguage": "vi", "educationalLevel": "Lớp 3", "learningResourceType": "Bài học",
        "teaches": rules[:3] or [title], "isAccessibleForFree": True, "url": url,
        "isPartOf": {"@type": "Course", "name": "Toán lớp 3", "url": LANDING},
    }, {
        "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Toán lớp 3", "item": LANDING},
            {"@type": "ListItem", "position": 2, "name": title, "item": url}],
    }]
    return page(f"hoc/{L['slug']}.html", f"{level}{title} – Toán lớp 3 (có đáp án) | Học cùng Cô Mai", desc,
                "\n".join(body), ld)


FAQ = [
    ("Ứng dụng có miễn phí không?", "Có. Toàn bộ bài giảng, hơn 1000 bài tập, 65 đề kiểm tra và chế độ Toán + Tiếng Anh đều miễn phí, không quảng cáo."),
    ("Nội dung có theo chương trình sách giáo khoa không?", "Có. Các bài học bám sát chương trình Toán lớp 3 sách giáo khoa mới: bảng nhân chia, các số đến 100 000, hình học, đo lường, thống kê."),
    ("Chế độ Toán + Tiếng Anh là gì?", "Khi bật, mỗi câu hỏi có thêm bản tiếng Anh, cô đọc tiếng Việt rồi tiếng Anh bằng giọng bản ngữ, bé học gần 840 từ vựng Toán tiếng Anh và chơi trò ôn từ."),
    ("Bé có thể tự học không?", "Có. Cô Mai tự giảng bằng giọng nói, đọc đề, gợi ý khi bé làm sai và chấm điểm ngay, nên bé 8–9 tuổi có thể tự học mỗi ngày."),
    ("Ứng dụng có thu thập thông tin của bé không?", "Không. Ứng dụng không cần đăng ký, không thu thập dữ liệu cá nhân; tiến độ học chỉ lưu trên máy."),
    ("Học trên thiết bị nào?", "Học ngay trên trình duyệt điện thoại, máy tính bảng hoặc máy tính; bản Android sắp có trên CH Play."),
]


def index_page():
    body = [f"""<section class="hero">
<img src="{SITE}hoc/img/banner.webp" alt="Toán Lớp 3 và Tiếng Anh – học cùng Cô Mai, cô giáo biết nói" width="1024" height="500">
<h1>Toán Lớp 3 &amp; Tiếng Anh – học cùng Cô Mai</h1>
<p class="lead">Ứng dụng học <b>Toán lớp 3</b> có cô giáo biết nói: video bài giảng cho mọi bài, hơn 1000 bài tập có lời giải từng bước,
65 đề kiểm tra, gameshow Toán học – và chế độ <b>Toán + Tiếng Anh</b> song ngữ. Miễn phí, không quảng cáo.</p>
<p><a class="cta" href="{SITE}">▶ Học thử miễn phí ngay</a></p>
</section>
<h2>Bé học được gì?</h2>
<ul class="feat">
<li><b>🎬 Video bài giảng</b> – cô viết bài lên bảng phấn, vẽ hình, giảng bằng giọng nói, hỏi giữa giờ, hết phần lau bảng giảng tiếp.</li>
<li><b>🇬🇧 Toán + Tiếng Anh</b> – mỗi câu hỏi có bản tiếng Anh, giọng bản ngữ, gần 840 từ vựng Toán và trò chơi ôn từ.</li>
<li><b>📸 Ví dụ trong cuộc sống</b> – tranh thật (bánh xe, rổ cam, hộp bánh…), cô cầm que chỉ vào tranh để bé hiểu bài.</li>
<li><b>✏️ 1000+ bài luyện tập</b> – cô đọc đề, gợi ý khi sai, video lời giải từng bước cho mọi bài.</li>
<li><b>📝 65 đề kiểm tra</b> – 15 phút, 1 tiết, giữa kì, cuối kì; phòng thi như thật, cô coi thi đọc đề, bảng điểm chi tiết.</li>
<li><b>🏆 Gameshow Toán học</b> – kiểm tra năng lực 15 câu với MC, trò chơi ôn tập, nhiệm vụ mỗi ngày.</li>
</ul>
<div class="shots">"""]
    for name, alt in SHOT_ALTS:
        body.append(f'<img src="{SITE}hoc/img/{name}.webp" alt="{esc(alt)}" loading="lazy" width="540" height="960">')
    body.append("</div><h2>Mục lục Toán lớp 3 – lý thuyết và bài tập có đáp án</h2>")
    cur = None
    for L in lessons:
        ch = L["chapter"]
        if cur != ch["id"]:
            if cur:
                body.append("</ul>")
            body.append(f"<h3>Chủ đề {ch['order']}: {esc(ch['title'])}</h3><ul class='toc'>")
            cur = ch["id"]
        tag = " <span class='adv'>nâng cao</span>" if L["kind"] == "adv" else ""
        body.append(f'<li><a href="{SITE}hoc/{L["slug"]}.html">{esc(L["ref"]["title"])}</a>{tag}</li>')
    body.append("</ul><h2>Câu hỏi thường gặp</h2>")
    body += [f"<details class='faq'><summary>{esc(q)}</summary><p>{esc(a)}</p></details>" for q, a in FAQ]
    body.append(f'<p class="center"><a class="cta" href="{SITE}">▶ Bắt đầu học cùng Cô Mai</a></p>')
    desc = ("Học Toán lớp 3 kèm Tiếng Anh cùng cô giáo biết nói: video bài giảng mọi bài, 1000+ bài tập có lời giải, "
            "65 đề kiểm tra, từ vựng tiếng Anh. Theo chương trình SGK mới. Miễn phí, không quảng cáo.")
    ld = [{
        "@context": "https://schema.org", "@type": "SoftwareApplication", "name": APP_NAME,
        "applicationCategory": "EducationalApplication", "operatingSystem": "Web, Android",
        "inLanguage": ["vi", "en"], "url": SITE, "image": SITE + "og-image.jpg", "description": desc,
        "offers": {"@type": "Offer", "price": "0", "priceCurrency": "VND"},
        "audience": {"@type": "EducationalAudience", "educationalRole": "student", "audienceType": "Học sinh lớp 3"},
    }, {
        "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in FAQ],
    }]
    return page("hoc/index.html", "Toán lớp 3 – Học cùng Cô Mai: video bài giảng, bài tập có đáp án, kèm Tiếng Anh",
                desc, "\n".join(body), ld, canonical=LANDING)


SHOT_ALTS = [
    ("s1", "Trang chủ ứng dụng Toán lớp 3 với cô Mai"),
    ("s2", "Chế độ Toán + Tiếng Anh: câu hỏi song ngữ"),
    ("s3", "Trò chơi ôn từ vựng Toán tiếng Anh"),
    ("s4", "Video bài giảng Toán lớp 3 trên bảng phấn"),
    ("s5", "Ví dụ trong cuộc sống: cô chỉ vào tranh"),
    ("s6", "Lời giải từng bước bài tập Toán lớp 3"),
    ("s7", "Phòng thi: đề kiểm tra Toán lớp 3"),
    ("s8", "Gameshow kiểm tra năng lực Toán lớp 3"),
]

CSS = """:root{--ink:#1f2433;--soft:#5b6072;--bg:#fff9ec;--card:#fff;--green:#1e4d38;--honey:#ffc93c;--blue:#1d4ed8;--line:#f0e2bd}
@media (prefers-color-scheme:dark){:root{--ink:#f3efe3;--soft:#c9c4b5;--bg:#17150f;--card:#221f17;--green:#8fd3ad;--blue:#93b4ff;--line:#3a3424}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:17px/1.65 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
a{color:var(--blue)}main{max-width:860px;margin:0 auto;padding:16px}
.top{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 16px;background:var(--green);color:#fff}
.brand{display:flex;align-items:center;gap:8px;color:#fff;font-weight:800;text-decoration:none}.brand img{border-radius:10px}
.cta{display:inline-block;background:#22a565;color:#fff;font-weight:800;padding:12px 22px;border-radius:999px;text-decoration:none;box-shadow:0 4px 12px rgba(0,0,0,.18)}
.cta.small{padding:7px 14px;font-size:15px;background:var(--honey);color:#3b2a00}
h1{font-size:clamp(26px,6vw,38px);line-height:1.25;color:var(--green);margin:14px 0 6px}h2{color:var(--green);margin-top:30px;border-bottom:3px solid var(--line);padding-bottom:4px}
h3{margin:18px 0 6px}.lead{font-size:19px}.en{color:var(--blue);font-style:italic;font-weight:700;margin:0}
.hero img{width:100%;height:auto;border-radius:18px}.crumb{font-size:14px;color:var(--soft)}
.rule{background:#fff4d6;border-left:6px solid var(--honey);padding:10px 14px;border-radius:10px;color:#3b2a00}
.tip{background:#f1ebff;border-left:6px solid #8e5cf7;padding:10px 14px;border-radius:10px;color:#2a1a55}
.eq{font-size:26px;font-weight:800;text-align:center;background:var(--green);color:#f8f6ea;border-radius:12px;padding:8px}
pre.col{font:700 26px/1.3 ui-monospace,Menlo,Consolas,monospace;background:var(--green);color:#f8f6ea;padding:12px 18px;border-radius:12px;display:inline-block}
.steps li{margin:2px 0}.wp{background:var(--card);border-radius:12px;padding:6px 14px;border:1px solid var(--line)}.ans{font-weight:800;color:#c2410c}
.exs{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}figure{margin:0;background:var(--card);border-radius:14px;overflow:hidden;border:1px solid var(--line)}
figure img{width:100%;height:auto;display:block}figcaption{padding:10px 12px;font-size:15px}
.pb{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:10px 14px;margin:10px 0}.q .n{font-weight:900;color:var(--green)}
.abc{list-style:upper-alpha}details summary{cursor:pointer;color:var(--blue);font-weight:700}.tpl{font-weight:700}
.voc{border-collapse:collapse;width:100%}.voc td,.voc th{border-bottom:1px solid var(--line);padding:6px 8px;text-align:left}
.pn{display:flex;justify-content:space-between;gap:10px;margin:26px 0;flex-wrap:wrap}.more{font-weight:700}
.feat li{margin:6px 0}.shots{display:flex;gap:10px;overflow-x:auto;padding:6px 0}.shots img{height:360px;width:auto;border-radius:14px}
.toc li{margin:3px 0}.adv{font-size:12px;background:#5b2db8;color:#fff;border-radius:8px;padding:1px 6px}
.faq{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:10px 14px;margin:8px 0}.center{text-align:center;margin:26px 0}
footer{max-width:860px;margin:30px auto;padding:16px;font-size:14px;color:var(--soft);text-align:center}
"""


def assets():
    img = OUT / "img"
    img.mkdir(parents=True, exist_ok=True)
    Image.open(ROOT / "store/banner-1024x500.png").convert("RGB").save(img / "banner.webp", quality=80)
    Image.open(ROOT / "assets/ui/logo_emblem.webp").convert("RGBA").resize((80, 80), Image.LANCZOS).save(img / "logo.webp")
    shots = sorted((ROOT / "store").glob("screenshot-*.png"))
    for n, f in enumerate(shots[:8]):
        im = Image.open(f).convert("RGB")
        im.thumbnail((540, 960))
        im.save(img / f"s{n + 1}.webp", quality=72)
    (OUT / "style.css").write_text(CSS)


def main():
    assets()
    urls = [SITE, index_page()]
    urls += [lesson_page(i, L) for i, L in enumerate(lessons)]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for u in urls:
        pr = "1.0" if u in (SITE, LANDING) else "0.8"
        sm.append(f"  <url><loc>{u}</loc><lastmod>{TODAY}</lastmod><priority>{pr}</priority></url>")
    sm.append("</urlset>")
    (ROOT / "web" / "sitemap.xml").write_text("\n".join(sm) + "\n")
    print(f"OK {len(lessons)} trang bài học + trang giới thiệu, sitemap {len(urls)} địa chỉ")


if __name__ == "__main__":
    main()
