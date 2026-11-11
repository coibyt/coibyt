#!/usr/bin/env python3
"""Xử lý ảnh tạo bằng Kie.ai → ảnh nền trong suốt, đúng tên, đúng kích thước cho app.

Cách dùng (chạy trong thư mục toan-lop-3, cần: pip install pillow):

  # 1) Cô giáo: các ảnh đặt tên theo tư thế, nền xanh lá #00FF00
  #    teacher_idle.png, teacher_blink.png, teacher_talk.png, teacher_think.png,
  #    teacher_think_talk.png, teacher_clap.png, teacher_clap_talk.png (3 ảnh cuối tuỳ chọn)
  python tool/prepare_teacher_assets.py teacher <thư-mục-ảnh-gốc>

  # 2) Đồ vật: coin.png, star.png, chalkboard.png, ruler.png, button.png — nền hồng sẫm #FF00FF
  python tool/prepare_teacher_assets.py ui <thư-mục-ảnh-gốc>

Kết quả ghi vào assets/tutor/ và assets/ui/. Mở lại app là thấy (không cần sửa code).

Các tư thế cô giáo được cắt bằng CÙNG một khung (hợp của mọi ảnh) nên khi đổi khung hình
(chớp mắt, nói) nhân vật không bị nhảy vị trí.
"""
import pathlib
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
TEACHER_POSES = ["idle", "blink", "talk", "think", "think_talk", "clap", "clap_talk"]
UI_NAMES = ["coin", "star", "chalkboard", "ruler", "button"]
KEYS = {"green": (0, 255, 0), "magenta": (255, 0, 255)}
TEACHER_HEIGHT = 900  # px; app hiển thị ~120–140 px nên ảnh vẫn nét trên màn hình độ phân giải cao
UI_MAX = 512


def key_out(img: Image.Image, key: str, tol: int = 90, soft: int = 60) -> Image.Image:
    """Xoá nền màu [key]: gần màu nền → trong suốt; viền mềm; khử ám màu nền ở mép."""
    kr, kg, kb = KEYS[key]
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            d = ((r - kr) ** 2 + (g - kg) ** 2 + (b - kb) ** 2) ** 0.5
            if d < tol:
                px[x, y] = (r, g, b, 0)
                continue
            if d < tol + soft:
                a = int(a * (d - tol) / soft)
            # khử ám: kéo kênh màu nền về mức trung bình hai kênh còn lại
            if key == "green" and g > max(r, b):
                g = (r + b) // 2 + (g - (r + b) // 2) // 4
            if key == "magenta" and r > g and b > g and min(r, b) - g > 60:
                r = b = (min(r, b) + g) // 2
            px[x, y] = (r, g, b, a)
    return img


def fit_canvas(img: Image.Image, height: int, ratio: float) -> Image.Image:
    """Thu về chiều cao [height], đặt giữa đáy khung tỉ lệ rộng/cao = [ratio]."""
    scale = height / img.height
    img = img.resize((max(1, round(img.width * scale)), height), Image.LANCZOS)
    cw = max(img.width, round(height * ratio))
    canvas = Image.new("RGBA", (cw, height), (0, 0, 0, 0))
    canvas.paste(img, ((cw - img.width) // 2, 0), img)
    return canvas


def teacher(src: pathlib.Path) -> None:
    found = {p: src / f"teacher_{p}.png" for p in TEACHER_POSES if (src / f"teacher_{p}.png").exists()}
    if "idle" not in found:
        sys.exit("Thiếu teacher_idle.png (bắt buộc).")
    keyed = {p: key_out(Image.open(f), "green") for p, f in found.items()}
    sizes = {im.size for im in keyed.values()}
    if len(sizes) > 1:
        print(f"Cảnh báo: các ảnh khác kích thước {sizes} — nên tạo cùng tỉ lệ khung để khớp vị trí.")
        base = keyed["idle"].size
        keyed = {p: im.resize(base, Image.LANCZOS) for p, im in keyed.items()}
    # Khung chung = hợp các vùng có nhân vật → mọi tư thế cùng vị trí.
    boxes = [im.getbbox() for im in keyed.values() if im.getbbox()]
    box = (min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes))
    out = ROOT / "assets" / "tutor"
    out.mkdir(parents=True, exist_ok=True)
    for p, im in keyed.items():
        fit_canvas(im.crop(box), TEACHER_HEIGHT, 0.75).save(out / f"teacher_{p}.png", optimize=True)
        print(f"OK  assets/tutor/teacher_{p}.png")
    missing = [p for p in TEACHER_POSES if p not in found]
    if missing:
        print(f"Chưa có (app tự dùng ảnh gần nhất): {', '.join(missing)}")


def ui(src: pathlib.Path) -> None:
    out = ROOT / "assets" / "ui"
    out.mkdir(parents=True, exist_ok=True)
    for name in UI_NAMES:
        f = src / f"{name}.png"
        if not f.exists():
            continue
        im = key_out(Image.open(f), "magenta")
        bbox = im.getbbox()
        if bbox:
            im = im.crop(bbox)
        im.thumbnail((UI_MAX, UI_MAX), Image.LANCZOS)
        im.save(out / f"{name}.png", optimize=True)
        print(f"OK  assets/ui/{name}.png")


if __name__ == "__main__":
    if len(sys.argv) != 3 or sys.argv[1] not in ("teacher", "ui"):
        sys.exit(__doc__)
    {"teacher": teacher, "ui": ui}[sys.argv[1]](pathlib.Path(sys.argv[2]))
