#!/usr/bin/env python3
"""Vẽ icon app (chú ong vàng + số 3) bằng code → web/icons, web/favicon.png.

Chạy: python tool/make_icons.py   (cần: pip install pillow)
"""
import pathlib

from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
HONEY = (255, 201, 60)
INK = (45, 49, 66)
SKY = (58, 134, 255)
CREAM = (255, 248, 231)
WING = (227, 242, 255)
FONT = ROOT / "assets" / "fonts" / "Andika-Bold.ttf"


def draw_icon(size: int, maskable: bool) -> Image.Image:
    s = size * 4  # vẽ to rồi thu nhỏ cho mịn
    img = Image.new("RGBA", (s, s), CREAM + (255,))
    d = ImageDraw.Draw(img)
    pad = s * (0.18 if maskable else 0.06)
    if not maskable:
        img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
        d = ImageDraw.Draw(img)
        d.rounded_rectangle([0, 0, s - 1, s - 1], radius=s * 0.22, fill=CREAM)
    box = s - 2 * pad

    def P(x, y):
        return (pad + x * box, pad + y * box)

    # cánh
    for cx in (0.38, 0.62):
        d.ellipse([*P(cx - 0.15, 0.08), *P(cx + 0.15, 0.42)], fill=WING, outline=SKY, width=int(s * 0.012))
    # thân
    body = [*P(0.12, 0.3), *P(0.88, 0.86)]
    mask = Image.new("L", (s, s), 0)
    ImageDraw.Draw(mask).ellipse(body, fill=255)
    stripes = Image.new("RGBA", (s, s), HONEY + (255,))
    sd = ImageDraw.Draw(stripes)
    for x in (0.47, 0.64):
        sd.rectangle([*P(x, 0), *P(x + 0.09, 1)], fill=INK)
    img.paste(stripes, (0, 0), mask)
    d.ellipse(body, outline=INK, width=int(s * 0.018))
    # mắt + miệng
    for ex in (0.24, 0.36):
        d.ellipse([*P(ex - 0.035, 0.5), *P(ex + 0.035, 0.57)], fill=INK)
    d.arc([*P(0.22, 0.56), *P(0.38, 0.68)], 20, 160, fill=INK, width=int(s * 0.014))
    # huy hiệu tròn số 3
    d.ellipse([*P(0.66, 0.66), *P(0.98, 0.98)], fill=SKY, outline=(255, 255, 255), width=int(s * 0.014))
    font = ImageFont.truetype(str(FONT), int(box * 0.24))
    d.text(P(0.82, 0.815), "3", font=font, fill=(255, 255, 255), anchor="mm")
    return img.resize((size, size), Image.LANCZOS)


def main():
    out = ROOT / "web" / "icons"
    out.mkdir(parents=True, exist_ok=True)
    for n in (192, 512):
        draw_icon(n, False).save(out / f"Icon-{n}.png")
        draw_icon(n, True).save(out / f"Icon-maskable-{n}.png")
    draw_icon(64, False).save(ROOT / "web" / "favicon.png")


if __name__ == "__main__":
    main()
