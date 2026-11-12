#!/usr/bin/env python3
"""Tạo bộ hình đăng CH Play (Google Play) cho app Toán Lớp 3 — Học cùng Cô Mai.

  python tool/make_store_assets.py banner        # ảnh nổi bật 1024×500 (nền Kie.ai + cô Mai + chữ)
  python tool/make_store_assets.py icon          # biểu tượng 512×512
  python tool/make_store_assets.py shots <thư mục ảnh chụp>   # ảnh màn hình 1080×1920 có tiêu đề

Kết quả ở store/. Nền banner: .art-raw/store_banner_bg.png (tool/make_art.py store_banner_bg).
"""
import pathlib
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "store"
BOLD = str(ROOT / "assets" / "fonts" / "Andika-Bold.ttf")


def font(size):
    return ImageFont.truetype(BOLD, size)


def shadow_text(img, xy, text, f, fill, shadow=(0, 0, 0, 110), offset=3, stroke=0, stroke_fill=None, anchor="la"):
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    d.text((xy[0] + offset, xy[1] + offset), text, font=f, fill=shadow, anchor=anchor,
           stroke_width=stroke, stroke_fill=shadow)
    layer = layer.filter(ImageFilter.GaussianBlur(3))
    img.alpha_composite(layer)
    ImageDraw.Draw(img).text(xy, text, font=f, fill=fill, anchor=anchor, stroke_width=stroke, stroke_fill=stroke_fill)


def pill(img, xy, text, f, bg, fg):
    d = ImageDraw.Draw(img)
    l, t, r, b = d.textbbox((0, 0), text, font=f)
    w, h = r - l + 30, b - t + 18
    d.rounded_rectangle([xy[0], xy[1], xy[0] + w, xy[1] + h], radius=h // 2, fill=bg)
    d.text((xy[0] + 15, xy[1] + 9 - t), text, font=f, fill=fg)
    return w


def cover(im, w, h):
    s = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x, y = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def banner():
    W, H = 1024, 500
    bg = cover(Image.open(ROOT / ".art-raw" / "store_banner_bg.png").convert("RGBA"), W, H)
    # Lớp sáng bên trái cho chữ dễ đọc.
    veil = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vd = ImageDraw.Draw(veil)
    for x in range(W):
        a = int(max(0, 175 - x * 0.36))
        vd.line([(x, 0), (x, H)], fill=(255, 250, 235, a))
    bg.alpha_composite(veil)
    # Cô Mai đứng bên phải, chỉ tay về phía chữ.
    t = Image.open(ROOT / "assets" / "tutor" / "teacher_point.webp").convert("RGBA")
    t = t.transpose(Image.FLIP_LEFT_RIGHT)
    th = 470
    t = t.resize((round(t.width * th / t.height), th), Image.LANCZOS)
    bg.alpha_composite(t, (W - t.width - 10, H - th))
    logo = Image.open(ROOT / "assets" / "ui" / "logo_emblem.webp").convert("RGBA").resize((96, 96), Image.LANCZOS)
    bg.alpha_composite(logo, (40, 30))
    shadow_text(bg, (146, 44), "HỌC CÙNG CÔ MAI", font(30), (229, 72, 77, 255), offset=2)
    shadow_text(bg, (146, 80), "Chương trình mới · SGK", font(22), (90, 58, 0, 255), offset=1, shadow=(0, 0, 0, 40))
    shadow_text(bg, (38, 140), "Toán Lớp 3", font(104), (255, 196, 0, 255), offset=4,
                stroke=6, stroke_fill=(120, 60, 0, 255))
    shadow_text(bg, (44, 278), "Video bài giảng có cô giáo nói", font(34), (30, 77, 56, 255), offset=1,
                shadow=(255, 255, 255, 160))
    x = 40
    for text, c in [("Luyện thi", (91, 63, 214, 255)), ("Gameshow", (229, 72, 77, 255)), ("Lời giải", (46, 184, 114, 255))]:
        x += pill(bg, (x, 350), text, font(26), c, (255, 255, 255, 255)) + 12
    shadow_text(bg, (44, 425), "1000+ bài tập · 65 đề kiểm tra", font(26), (60, 40, 10, 255), offset=1,
                shadow=(255, 255, 255, 140))
    OUT.mkdir(exist_ok=True)
    bg.convert("RGB").save(OUT / "banner-1024x500.png", optimize=True)
    print("OK store/banner-1024x500.png")


def icon():
    src = ROOT / ".art-raw" / "icon_app.png"
    im = Image.open(src).convert("RGBA") if src.exists() else Image.open(ROOT / "assets" / "ui" / "logo_emblem.webp").convert("RGBA")
    im = cover(im, min(im.size), min(im.size)).resize((512, 512), Image.LANCZOS)
    OUT.mkdir(exist_ok=True)
    im.convert("RGB").save(OUT / "icon-512.png", optimize=True)
    print("OK store/icon-512.png")


SHOTS = [
    ("home", "Học Toán lớp 3 cùng Cô Mai", "Cô giáo biết nói, bé tự học mỗi ngày"),
    ("board", "Video bài giảng trên bảng", "Bút viết, vẽ hình, cô giảng từng bước"),
    ("example", "Ví dụ thật trong cuộc sống", "Cô chỉ vào tranh để bé hiểu bài"),
    ("practice", "1000+ bài luyện tập", "Cô đọc đề, gợi ý khi bé làm sai"),
    ("solution", "Lời giải từng bước", "Video lời giải cho mọi bài tập"),
    ("exam", "Phòng thi như thật", "65 đề kiểm tra, cô coi thi đọc đề"),
    ("show", "Gameshow Toán học", "Kiểm tra năng lực vui như truyền hình"),
]
COLORS = [(91, 63, 214), (30, 77, 56), (224, 122, 0), (46, 140, 230), (229, 72, 77), (30, 77, 56), (120, 40, 180)]


def shots(folder):
    folder = pathlib.Path(folder)
    W, H = 1080, 1920
    for i, (name, title, sub) in enumerate(SHOTS):
        src = folder / f"{name}.png"
        if not src.exists():
            print("thiếu", src)
            continue
        c = COLORS[i % len(COLORS)]
        img = Image.new("RGBA", (W, H), c + (255,))
        g = ImageDraw.Draw(img)
        for y in range(H):  # nền chuyển màu nhẹ
            k = y / H
            g.line([(0, y), (W, y)], fill=tuple(int(v * (1 - 0.35 * k) + 255 * 0.08 * k) for v in c) + (255,))
        shadow_text(img, (W // 2, 120), title, font(66), (255, 255, 255, 255), anchor="mm", offset=3)
        shadow_text(img, (W // 2, 205), sub, font(40), (255, 236, 160, 255), anchor="mm", offset=2)
        shot = Image.open(src).convert("RGBA")
        sw = 860
        shot = shot.resize((sw, round(shot.height * sw / shot.width)), Image.LANCZOS)
        sh = min(shot.height, H - 300)
        shot = shot.crop((0, 0, sw, sh))
        mask = Image.new("L", shot.size, 0)
        ImageDraw.Draw(mask).rounded_rectangle([0, 0, sw - 1, sh - 1], radius=44, fill=255)
        frame = Image.new("RGBA", (sw + 28, sh + 28), (0, 0, 0, 0))
        ImageDraw.Draw(frame).rounded_rectangle([0, 0, sw + 27, sh + 27], radius=56, fill=(20, 20, 30, 255))
        fx, fy = (W - frame.width) // 2, 270
        sd = Image.new("RGBA", img.size, (0, 0, 0, 0))
        ImageDraw.Draw(sd).rounded_rectangle([fx + 10, fy + 18, fx + frame.width + 10, fy + frame.height + 18],
                                             radius=56, fill=(0, 0, 0, 90))
        img.alpha_composite(sd.filter(ImageFilter.GaussianBlur(16)))
        img.alpha_composite(frame, (fx, fy))
        img.paste(shot, (fx + 14, fy + 14), mask)
        out = OUT / f"screenshot-{i + 1}-{name}.png"
        img.convert("RGB").save(out, optimize=True)
        print("OK", out.relative_to(ROOT))


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else ""
    if cmd == "banner":
        banner()
    elif cmd == "icon":
        icon()
    elif cmd == "shots":
        shots(sys.argv[2])
    else:
        sys.exit(__doc__)
