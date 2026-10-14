"""One-off generator for the PWA app icons — run manually, not part of the
build. Draws a simple "V" monogram on the brand's primary-500 purple
(#624f89), matching the navbar wordmark, since there was no existing app
icon asset to start from.
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_PATH = r"C:\Windows\Fonts\segoeuib.ttf"
PURPLE = (98, 79, 137, 255)  # primary-500 #624f89
WHITE = (255, 255, 255, 255)


def draw_icon(size: int, letter_ratio: float) -> Image.Image:
    img = Image.new("RGBA", (size, size), PURPLE)
    draw = ImageDraw.Draw(img)
    font_size = int(size * letter_ratio)
    font = ImageFont.truetype(FONT_PATH, font_size)
    text = "V"
    bbox = draw.textbbox((0, 0), text, font=font)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    x = (size - w) / 2 - bbox[0]
    y = (size - h) / 2 - bbox[1]
    draw.text((x, y), text, font=font, fill=WHITE)
    return img


def save(img: Image.Image, *paths: str):
    for p in paths:
        full = os.path.join(ROOT, p)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        img.save(full, "PNG")
        print("wrote", p)


# "any" purpose — browsers show it mostly as-is, so the letter can be large.
icon_512 = draw_icon(512, 0.58)
save(icon_512, "public/icons/icon-512.png", "src/app/icon.png")

icon_192 = draw_icon(192, 0.58)
save(icon_192, "public/icons/icon-192.png")

# apple touch icon — iOS applies its own corner rounding, wants a full-bleed
# square with no transparency.
apple_icon = draw_icon(180, 0.58)
save(apple_icon, "src/app/apple-icon.png")

# "maskable" — OS may crop all the way to a circle/squircle, so content must
# stay inside the centered 80%-diameter safe zone.
icon_maskable = draw_icon(512, 0.58 * 0.8)
save(icon_maskable, "public/icons/icon-512-maskable.png")

print("done")
