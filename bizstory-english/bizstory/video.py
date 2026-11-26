"""Video dọc 1080×1920 cho TikTok / YouTube / Học viện VaraaAi: một ảnh tĩnh + âm thanh, cuối video có thẻ giới thiệu
Học viện VaraaAi và dòng "Video được chia sẻ bởi Babelisa".

    python -m bizstory video 1            # 4 video theo phần (≤ 60 phút, hợp TikTok) + 1 video cả ngày
    python -m bizstory video 1 --only full

Ảnh được dựng từ HTML bằng Playwright (Node: `npm i -g playwright` và `npx playwright install chromium`).
"""
from __future__ import annotations

import base64
import html
import json
import subprocess
import tempfile
from pathlib import Path

from . import audio, config, tts

W, H = 1080, 1920
FPS = 25
PART_LABEL = {1: "Phần 1 · Phim kinh doanh", 2: "Phần 2 · Case study có thật", 3: "Phần 3 · Tài chính & Tâm lý",
              4: "Phần 4 · Ôn tập SRS"}
PART_COVER = {0: "hero", 1: "season_01", 2: "part_case", 3: "part_money", 4: "part_review"}

# Lời kết (giọng người dẫn chính). Viết tên riêng theo cách đọc để giọng máy đọc đúng.
OUTRO_LINES = [
    "Cảm ơn bạn đã nghe BizStory English.",
    "Video này nằm trong Học viện Va ra ai, kho bài giảng video miễn phí bằng tiếng Việt. "
    "Học ngay trên điện thoại, không cần đăng ký, tại Va ra ai chấm com.",
    "Video được chia sẻ bởi Ba be li sa, sân chơi học tập miễn phí tại Ba be li sa chấm com.",
    "Theo dõi kênh để nghe tập tiếp theo mỗi ngày nhé.",
]
OUTRO_VOICE = "vn_linh"


def _data_uri(p: Path) -> str:
    mime = {"webp": "image/webp", "png": "image/png", "jpg": "image/jpeg"}[p.suffix[1:]]
    return f"data:{mime};base64," + base64.b64encode(p.read_bytes()).decode()


def _img(name: str) -> str:
    return _data_uri(config.ASSETS_DIR / "img" / f"{name}.webp")


FONTS = ('<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&'
         'family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap" rel="stylesheet">')
BASE_CSS = """
*{box-sizing:border-box;margin:0;padding:0}
body{width:1080px;height:1920px;overflow:hidden;background:#120d1f;color:#f4eefc;font-family:'Be Vietnam Pro',sans-serif}
.serif{font-family:'Playfair Display',serif}
.gold{color:#e8d3a6}
.eyebrow{letter-spacing:.16em;text-transform:uppercase;font-weight:600;font-size:26px;color:#e8d3a6}
"""


def card_html(title: str, subtitle: str, eyebrow: str, cover: str, day: int, items: list[str], items_title: str,
              more: int = 0) -> str:
    lis = "".join(f"<li>{html.escape(x)}</li>" for x in items)
    if more:
        lis += f'<li class="more">và {more} cụm khác</li>'
    return f"""<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>{BASE_CSS}
.cover{{position:absolute;left:0;top:0;width:1080px;height:900px;background:url({_img(cover)}) center/cover}}
.fade{{position:absolute;left:0;top:0;width:1080px;height:1920px;
  background:linear-gradient(180deg,rgba(18,13,31,.55) 0,rgba(18,13,31,0) 220px,rgba(18,13,31,0) 560px,#120d1f 900px),
  radial-gradient(900px 600px at 85% 105%,rgba(176,138,62,.18),transparent 60%)}}
.brand{{position:absolute;top:120px;left:64px;right:64px;display:flex;align-items:center;justify-content:space-between}}
.brand .l{{display:flex;align-items:center;gap:18px;font-size:40px;font-weight:700}}
.brand img{{width:64px;height:64px;border-radius:16px}}
.brand em{{font-style:italic;color:#e8d3a6}}
.day{{font-size:28px;padding:12px 26px;border-radius:999px;background:rgba(18,13,31,.7);border:1px solid rgba(232,211,166,.4);color:#f6ead0;font-weight:600}}
.text{{position:absolute;top:760px;left:72px;right:72px}}
h1{{font-size:84px;line-height:1.08;margin:18px 0 12px;font-weight:700}}
.sub{{font-size:38px;font-style:italic;color:#e8d3a6;font-family:'Playfair Display',serif}}
.box{{margin-top:40px;padding:30px 36px;border-radius:36px;background:rgba(31,23,54,.82);border:1px solid rgba(232,211,166,.22)}}
.box .t{{font-size:24px;letter-spacing:.14em;text-transform:uppercase;color:#a99cc4;font-weight:600;margin-bottom:12px}}
ul{{list-style:none}}
li{{font-family:'Playfair Display',serif;font-size:35px;line-height:1.25;padding:9px 0;color:#f6ead0;border-top:1px solid rgba(232,211,166,.1)}}
li:first-child{{border-top:0}}
li.more{{font-family:'Be Vietnam Pro';font-size:26px;color:#a99cc4}}
.foot{{margin-top:26px;display:flex;justify-content:space-between;font-size:24px;color:#a99cc4}}
</style></head><body><div class="cover"></div><div class="fade"></div>
<div class="brand"><div class="l"><img src="{_data_uri(config.ASSETS_DIR / 'icons' / 'icon-192.png')}">BizStory <em>English</em></div>
<div class="day">Ngày {day}</div></div>
<div class="text"><div class="eyebrow">{html.escape(eyebrow)}</div><h1 class="serif">{html.escape(title)}</h1>
<div class="sub">{html.escape(subtitle)}</div>
<div class="box"><div class="t">{html.escape(items_title)}</div><ul>{lis}</ul></div>
<div class="foot"><span>Học viện VaraaAi · varaaai.com</span><span>Chia sẻ bởi Babelisa</span></div></div>
</body></html>"""


def end_card_html() -> str:
    b = config.ASSETS_DIR / "brand"
    return f"""<!doctype html><html><head><meta charset="utf-8">{FONTS}<style>{BASE_CSS}
.bg{{position:absolute;inset:0;background:url({_img('hero')}) center/cover;filter:blur(6px) brightness(.35);transform:scale(1.05)}}
.v{{position:absolute;inset:0;background:radial-gradient(800px 700px at 50% 30%,rgba(139,108,246,.25),transparent 70%),linear-gradient(180deg,rgba(18,13,31,.3),#120d1f 92%)}}
.wrap{{position:absolute;top:230px;left:80px;right:80px;text-align:center}}
.logo{{width:210px;height:210px;border-radius:52px;box-shadow:0 30px 60px -20px rgba(0,0,0,.7)}}
h1{{font-size:96px;line-height:1.05;margin:46px 0 22px}}
.lead{{font-size:38px;line-height:1.45;color:#e2dcef}}
.pill{{display:inline-block;margin-top:44px;padding:24px 46px;border-radius:999px;font-size:42px;font-weight:700;color:#1b1406;
  background:linear-gradient(135deg,#f6ead0,#e8d3a6 45%,#b08a3e)}}
.feat{{display:flex;justify-content:center;gap:18px;margin-top:40px;flex-wrap:wrap}}
.feat span{{font-size:28px;padding:12px 24px;border-radius:999px;border:1px solid rgba(232,211,166,.35);color:#f6ead0;background:rgba(31,23,54,.6)}}
.share{{margin:90px auto 0;display:flex;align-items:center;gap:30px;justify-content:center;padding:34px 40px;border-radius:40px;
  background:rgba(31,23,54,.75);border:1px solid rgba(232,211,166,.22);width:fit-content}}
.share img{{width:120px;height:120px;border-radius:30px}}
.share .t{{text-align:left}}
.share small{{display:block;font-size:28px;color:#a99cc4}}
.share b{{display:block;font-size:56px;font-family:'Playfair Display',serif;margin:2px 0}}
.share i{{font-style:normal;font-size:30px;color:#e8d3a6}}
</style></head><body><div class="bg"></div><div class="v"></div>
<div class="wrap"><img class="logo" src="{_data_uri(b / 'varaaai.png')}">
<div class="eyebrow" style="margin-top:44px">Bài giảng video miễn phí</div>
<h1 class="serif">Học viện VaraaAi</h1>
<p class="lead">Học bằng tiếng Việt, ngay trên điện thoại,<br>không cần đăng ký.</p>
<div class="pill">varaaai.com/vi/academy</div>
<div class="feat"><span>Tiếng Anh kinh doanh</span><span>Nghề làm đẹp</span><span>Quản lý salon</span></div>
<div class="share"><img src="{_data_uri(b / 'babelisa.png')}"><div class="t"><small>Video được chia sẻ bởi</small><b>Babelisa</b>
<i>babelisa.com · học mà chơi, miễn phí</i></div></div></div>
</body></html>"""


SHOOT_JS = r"""
const { chromium } = require('playwright');
(async () => {
  const jobs = JSON.parse(process.argv[2]);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  for (const [htmlPath, out] of jobs) {
    await p.goto('file://' + htmlPath, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: out, type: 'jpeg', quality: 92 });
  }
  await b.close();
})();
"""


def shoot(pages: list[tuple[str, Path]]) -> None:
    """HTML → JPEG 1080×1920 bằng Playwright (Node)."""
    with tempfile.TemporaryDirectory() as td:
        jobs = []
        for i, (doc, out) in enumerate(pages):
            hp = Path(td) / f"p{i}.html"
            hp.write_text(doc, encoding="utf-8")
            out.parent.mkdir(parents=True, exist_ok=True)
            jobs.append([str(hp), str(out)])
        js = Path(td) / "shoot.js"
        js.write_text(SHOOT_JS)
        root = subprocess.run(["npm", "root", "-g"], capture_output=True, text=True).stdout.strip()
        subprocess.run(["node", str(js), json.dumps(jobs)], check=True, env={**__import__("os").environ, "NODE_PATH": root})


def outro_wav(log=print) -> Path:
    """Âm thanh lời kết: nhạc hiệu + giọng người dẫn (thu 11max một lần, cache)."""
    out = config.CACHE_DIR / "video" / "outro.wav"
    jobs = [tts.Job(OUTRO_VOICE, t) for t in OUTRO_LINES]
    tts.synthesize(jobs, log=log)
    out.parent.mkdir(parents=True, exist_ok=True)
    a = audio.silence(600) + audio.load_clip(audio.sfx_path("logo")) + audio.silence(300)
    for j in jobs:
        m = tts.clip_meta(j.key)
        gain = max(-12.0, min(12.0, audio.CLIP_TARGET_LUFS - (m.get("lufs_mono") or audio.CLIP_TARGET_LUFS)))
        a += audio.load_clip(tts.processed_wav(j.key), gain) + audio.silence(500)
    a += audio.silence(1500)
    a.export(out, format="wav")
    return out


def part_ranges(player: dict) -> dict[int, tuple[float, float]]:
    starts: dict[int, float] = {}
    for c in player["chapters"]:
        starts.setdefault(c["part"], c["t"])
    parts = sorted(p for p in starts if p > 0)
    rng = {}
    for i, p in enumerate(parts):
        end = starts[parts[i + 1]] if i + 1 < len(parts) else player["duration"]
        rng[p] = (starts[p], end)
    return rng


def _run(*args: str) -> None:
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


VENC = ["-c:v", "libx264", "-preset", "medium", "-tune", "stillimage", "-crf", "24", "-r", str(FPS),
        "-g", str(FPS * 30), "-keyint_min", str(FPS * 30), "-sc_threshold", "0", "-bf", "0", "-pix_fmt", "yuv420p",
        "-profile:v", "high", "-level", "4.1"]
AENC = ["-c:a", "aac", "-b:a", "80k", "-ar", "44100", "-ac", "1"]  # nguồn là giọng nói mono


def still_clip(img: Path, out: Path, seconds: int = 30) -> Path:
    """Mã hoá ảnh tĩnh thành đoạn 30 giây (một keyframe) để lặp bằng stream copy — nhanh hơn hàng chục lần."""
    _run("-loop", "1", "-framerate", str(FPS), "-t", str(seconds), "-i", str(img),
         "-vf", f"scale={W}:{H},format=yuv420p", *VENC, "-an", str(out))
    return out


def encode(card: Path, src: Path, start: float, end: float, end_card: Path, outro: Path, out: Path, log=print) -> None:
    d1 = end - start
    out.parent.mkdir(parents=True, exist_ok=True)
    log(f"  dựng {out.name} ({d1 / 60:.1f} phút + lời kết)…")
    with tempfile.TemporaryDirectory() as td:
        t = Path(td)
        clip = still_clip(card, t / "still.mp4")
        n = int(d1 // 30) + 2
        (t / "loop.txt").write_text("".join(f"file '{clip}'\n" for _ in range(n)))
        # phần chính: video lặp (chép luồng) + âm thanh cắt từ MP3 của ngày
        _run("-f", "concat", "-safe", "0", "-i", str(t / "loop.txt"),
             "-ss", f"{start:.3f}", "-t", f"{d1:.3f}", "-i", str(src),
             "-map", "0:v", "-map", "1:a", "-c:v", "copy",
             "-af", f"afade=t=out:st={max(0, d1 - 1.2):.3f}:d=1.2", *AENC, "-t", f"{d1:.3f}", str(t / "main.mp4"))
        # lời kết: thẻ Học viện VaraaAi + Babelisa
        d2 = audio.frames_ms(audio.load_clip(outro)) / 1000
        _run("-loop", "1", "-framerate", str(FPS), "-t", f"{d2:.3f}", "-i", str(end_card), "-i", str(outro),
             "-vf", f"scale={W}:{H},format=yuv420p", *VENC, "-af", "loudnorm=I=-16:TP=-1.5", *AENC,
             "-shortest", str(t / "outro.mp4"))
        (t / "all.txt").write_text(f"file '{t / 'main.mp4'}'\nfile '{t / 'outro.mp4'}'\n")
        _run("-f", "concat", "-safe", "0", "-i", str(t / "all.txt"), "-c", "copy", "-movflags", "+faststart", str(out))


def make_videos(day: int, only: str | None = None, log=print) -> list[Path]:
    od = config.OUTPUT_DIR / f"day_{day:02d}"
    player = json.loads((od / f"day_{day:02d}.json").read_text(encoding="utf-8"))
    src = od / player["audio"]
    vd = od / "video"
    phrases = [p for p in player["phrases"] if not p.get("review_only")]
    review_keys = {s["phrase_id"] for s in player["segments"] if s["part"] == 4 and s.get("phrase_id")}
    review = [p for p in player["phrases"] if p["key"] in review_keys]
    rng = part_ranges(player)

    jobs = []  # (name, html, start, end)
    for part, (a, b) in rng.items():
        if only and only not in (str(part), "parts"):
            continue
        if part == 4:
            items = [p["en"] for p in review]
            meta = {"title": "Ôn tập cuối ngày", "sub": f"{len(items)} cụm tiếng Anh · SRS 1–3–7–14 ngày"}
            ttl = "Ôn lại các cụm"
        else:
            pp = next(x for x in player["parts"] if x["part"] == part)
            items = [p["en"] for p in phrases if p["part"] == part]
            meta = {"title": pp["title_vi"], "sub": pp["title_en"]}
            ttl = f"{len(items)} cụm tiếng Anh trong tập"
        more = max(0, len(items) - 7)
        doc = card_html(meta["title"], meta["sub"], PART_LABEL[part], PART_COVER[part], day, items[:7], ttl, more)
        jobs.append((f"day_{day:02d}_phan_{part}", doc, a, b))
    if not only or only == "full":
        items = [f"{PART_LABEL[x['part']].split(' · ')[0]}: {x['title_vi']}" for x in player["parts"]]
        items.append(f"Phần 4: Ôn tập {len(review)} cụm")
        doc = card_html(player["title_vi"], "Trọn bộ 2 giờ · nghe liền mạch", "Podcast học tiếng Anh mỗi ngày",
                        PART_COVER[1], day, items, f"{len(phrases)} cụm tiếng Anh mới hôm nay")
        jobs.append((f"day_{day:02d}_tron_bo", doc, 0.0, player["duration"]))

    end_card = vd / "end_card.jpg"
    shoot([(end_card_html(), end_card)] + [(doc, vd / f"{n}.jpg") for n, doc, _, _ in jobs])
    outro = outro_wav(log)
    outs = []
    for name, _, a, b in jobs:
        out = vd / f"{name}.mp4"
        encode(vd / f"{name}.jpg", src, a, b, end_card, outro, out, log)
        outs.append(out)
        log(f"  ✓ {out.name}: {tts.probe_duration(out) / 60:.1f} phút, {out.stat().st_size / 1e6:.0f} MB")
    return outs
