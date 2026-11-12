#!/usr/bin/env python3
"""Ảnh xem trước khi chia sẻ link (Open Graph, 1200×630) cho Facebook, Zalo, Telegram, WhatsApp…

  python3 tool/make_art.py og_banner_bg      # nền (Kie.ai, không chữ)
  python3 tool/make_og_banner.py             # → web/og-banner.jpg

Chữ và nhân vật ghép bằng Pillow để chữ tiếng Việt luôn sắc nét, đúng dấu.
"""
import pathlib

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
BOLD = str(ROOT / "assets" / "fonts" / "Andika-Bold.ttf")
W, H = 1200, 630


def font(size):
    return ImageFont.truetype(BOLD, size)


def cover(im, w, h):
    s = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    x, y = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def glow(img, pos, sprite, radius=18, color=(255, 210, 120, 150)):
    """Viền sáng mềm quanh nhân vật đã xoá nền."""
    a = sprite.split()[-1]
    halo = Image.new("RGBA", sprite.size, color)
    halo.putalpha(a)
    layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
    layer.alpha_composite(halo, pos)
    img.alpha_composite(layer.filter(ImageFilter.GaussianBlur(radius)))
    img.alpha_composite(sprite, pos)


def text(img, xy, s, f, fill, stroke=0, stroke_fill=None, shadow=True, anchor="la"):
    if shadow:
        layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
        ImageDraw.Draw(layer).text((xy[0] + 3, xy[1] + 5), s, font=f, fill=(20, 0, 40, 170), anchor=anchor,
                                   stroke_width=stroke, stroke_fill=(20, 0, 40, 170))
        img.alpha_composite(layer.filter(ImageFilter.GaussianBlur(4)))
    ImageDraw.Draw(img).text(xy, s, font=f, fill=fill, anchor=anchor, stroke_width=stroke, stroke_fill=stroke_fill)


def gold_title(img, xy, s, f):
    """Chữ vàng chuyển màu, viền nâu đậm, bóng tím."""
    text(img, xy, s, f, (120, 60, 0, 255), stroke=7, stroke_fill=(110, 50, 0, 255))
    mask = Image.new("L", img.size, 0)
    ImageDraw.Draw(mask).text(xy, s, font=f, fill=255)
    l, t, r, b = mask.getbbox()
    grad = Image.new("RGBA", img.size, (0, 0, 0, 0))
    g = ImageDraw.Draw(grad)
    for y in range(t, b + 1):
        k = (y - t) / max(1, b - t)
        c = (255, int(244 - 70 * k), int(170 - 150 * k), 255)
        g.line([(l, y), (r, y)], fill=c)
    img.paste(grad, (0, 0), mask)


def pill(img, xy, s, f, bg, fg=(255, 255, 255, 255)):
    d = ImageDraw.Draw(img)
    l, t, r, b = d.textbbox((0, 0), s, font=f)
    w, h = r - l + 34, b - t + 20
    sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
    ImageDraw.Draw(sh).rounded_rectangle([xy[0] + 2, xy[1] + 5, xy[0] + w + 2, xy[1] + h + 5], radius=h // 2, fill=(20, 0, 40, 140))
    img.alpha_composite(sh.filter(ImageFilter.GaussianBlur(4)))
    d.rounded_rectangle([xy[0], xy[1], xy[0] + w, xy[1] + h], radius=h // 2, fill=bg, outline=(255, 230, 160, 255), width=2)
    d.text((xy[0] + 17, xy[1] + 10 - t), s, font=f, fill=fg)
    return w


def main():
    bg = cover(Image.open(ROOT / ".art-raw" / "og_banner_bg.png").convert("RGBA"), W, H)
    # Lớp tối dịu bên trái cho chữ nổi.
    veil = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vd = ImageDraw.Draw(veil)
    for x in range(W):
        vd.line([(x, 0), (x, H)], fill=(30, 8, 70, int(max(0, 170 - x * 0.25))))
    bg.alpha_composite(veil)

    # Nhân vật bên phải: MC phía sau, cô Mai phía trước.
    host = Image.open(ROOT / "assets" / "host" / "host_present.webp").convert("RGBA")
    host = host.transpose(Image.FLIP_LEFT_RIGHT)
    hh = 470
    host = host.resize((round(host.width * hh / host.height), hh), Image.LANCZOS)
    glow(bg, (W - host.width + 30, H - hh), host, 16, (200, 160, 255, 120))
    t = Image.open(ROOT / "assets" / "tutor" / "teacher_point.webp").convert("RGBA").transpose(Image.FLIP_LEFT_RIGHT)
    th = 560
    t = t.resize((round(t.width * th / t.height), th), Image.LANCZOS)
    glow(bg, (W - t.width - 190, H - th), t, 20, (255, 215, 130, 150))

    logo = Image.open(ROOT / "assets" / "ui" / "logo_emblem.webp").convert("RGBA").resize((128, 128), Image.LANCZOS)
    glow(bg, (44, 30), logo, 14, (255, 210, 90, 170))
    text(bg, (184, 52), "HỌC CÙNG CÔ MAI", font(34), (255, 214, 102, 255))
    text(bg, (186, 98), "Chương trình mới · Kết nối tri thức", font(24), (235, 225, 255, 255))

    gold_title(bg, (40, 176), "Toán Lớp 4", font(108))
    text(bg, (46, 318), "Ong Vàng Toán 4 – bé tự học mỗi ngày", font(32), (255, 255, 255, 255))

    x = 44
    for s, c in [("Cô giảng có giọng nói", (124, 77, 255, 255)), ("Gameshow", (229, 72, 120, 255))]:
        x += pill(bg, (x, 384), s, font(26), c) + 12
    x = 44
    for s, c in [("Phân số", (24, 160, 120, 255)), ("Luyện thi", (240, 128, 0, 255)), ("Nâng cao", (70, 110, 230, 255))]:
        x += pill(bg, (x, 448), s, font(26), c) + 12
    text(bg, (46, 528), "73 bài · 612 bài tập · 57 đề kiểm tra", font(28), (255, 222, 140, 255))
    text(bg, (46, 572), "Bài giảng · Luyện tập · Thi thử · Lời giải", font(24), (225, 215, 255, 255))

    out = ROOT / "web" / "og-banner.jpg"
    bg.convert("RGB").save(out, quality=88, optimize=True, progressive=True)
    print("OK", out.relative_to(ROOT), out.stat().st_size // 1024, "KB")


if __name__ == "__main__":
    main()
