#!/usr/bin/env python3
"""Xử lý ảnh Kie.ai → ảnh dùng trong app (nền trong suốt, WebP nhẹ, đúng thư mục).

Cách dùng (chạy trong thư mục toan-lop-3, cần: pip install pillow):

  # Ảnh do tool/make_art.py tạo (đọc .art-raw/meta.json, xử lý tất cả):
  python tool/prepare_teacher_assets.py auto

  # Ảnh tự tạo trên web Kie.ai, đặt tên đúng quy ước trong một thư mục:
  python tool/prepare_teacher_assets.py teacher <thư-mục>   # teacher_idle.png ... (nền xanh)
  python tool/prepare_teacher_assets.py ui <thư-mục>        # coin.png, star.png ... (nền hồng sẫm)

Kết quả: assets/tutor/teacher_*.webp, assets/ui/*.webp, assets/pets/*.webp, assets/bg/*.webp, assets/chapters/*.webp.
Màu nền được LẤY MẪU ở mép ảnh (ảnh AI thường không đúng tuyệt đối #00FF00 / #FF00FF).
Các tư thế cô giáo được cắt bằng CÙNG một khung → đổi khung hình (chớp mắt, nói) không bị nhảy.
"""
import json
import pathlib
import statistics
import sys

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW = ROOT / ".art-raw"
TEACHER_POSES = ["idle", "blink", "talk", "think", "think_talk", "clap", "clap_talk", "point", "point_talk"]
TEACHER_HEIGHT = 900
SIZES = {"ui": 512, "pets": 384}
BG_WIDTH = 1080


def border_color(img: Image.Image) -> tuple:
    """Màu nền = trung vị các điểm ảnh ở viền 6px."""
    rgb = img.convert("RGB")
    w, h = rgb.size
    px = rgb.load()
    pts = [px[x, y] for x in range(0, w, 3) for y in (*range(6), *range(h - 6, h))]
    pts += [px[x, y] for y in range(0, h, 3) for x in (*range(6), *range(w - 6, w))]
    return tuple(int(statistics.median(c[i] for c in pts)) for i in range(3))


def key_out(img: Image.Image, key: str) -> Image.Image:
    """Xoá nền màu chroma (xanh lá hoặc hồng sẫm) đã lấy mẫu; viền mềm; khử ám màu."""
    kr, kg, kb = border_color(img)
    img = img.convert("RGBA")
    px = img.load()
    w, h = img.size

    def dominance(r, g, b):
        return g - max(r, b) if key == "green" else min(r, b) - g

    key_dom = dominance(kr, kg, kb)
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            dist = ((r - kr) ** 2 + (g - kg) ** 2 + (b - kb) ** 2) ** 0.5
            dom = dominance(r, g, b)
            if dist < 70 or (dom > key_dom * 0.75 and dist < 150):
                px[x, y] = (0, 0, 0, 0)
                continue
            alpha = a
            if dom > key_dom * 0.35:  # mép lẫn màu nền → bán trong suốt
                t = (dom - key_dom * 0.35) / (key_dom * 0.4)
                alpha = int(a * max(0.0, min(1.0, 1 - t)))
            # khử ám màu nền ở mép
            if key == "green" and g > max(r, b):
                g = max(r, b)
            if key == "magenta" and dom > key_dom * 0.2:
                # chỉ khử ở điểm ám hồng rõ (mép); giữ nguyên màu đỏ/hồng thật của vật
                excess = (dom - key_dom * 0.2) / 2
                r, b = int(max(g, r - excess)), int(max(g, b - excess))
            px[x, y] = (r, g, b, alpha)
    return img


def fit_canvas(img: Image.Image, height: int, ratio: float) -> Image.Image:
    scale = height / img.height
    img = img.resize((max(1, round(img.width * scale)), height), Image.LANCZOS)
    cw = max(img.width, round(height * ratio))
    canvas = Image.new("RGBA", (cw, height), (0, 0, 0, 0))
    canvas.paste(img, ((cw - img.width) // 2, 0), img)
    return canvas


def save_webp(img: Image.Image, dest: pathlib.Path, quality=86):
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "WEBP", quality=quality, method=6)
    print(f"OK  {dest.relative_to(ROOT)}  ({dest.stat().st_size // 1024} KB)")


def teacher(files: dict, prefix: str = "teacher", folder: str = "tutor", key: str = "green") -> None:
    if "idle" not in files:
        sys.exit(f"Thiếu {prefix}_idle (bắt buộc).")
    keyed = {p: key_out(Image.open(f), key) for p, f in files.items()}
    base = keyed["idle"].size
    keyed = {p: (im if im.size == base else im.resize(base, Image.LANCZOS)) for p, im in keyed.items()}
    boxes = [im.getbbox() for im in keyed.values() if im.getbbox()]
    box = (min(b[0] for b in boxes), min(b[1] for b in boxes), max(b[2] for b in boxes), max(b[3] for b in boxes))
    for p, im in keyed.items():
        save_webp(fit_canvas(im.crop(box), TEACHER_HEIGHT, 0.75), ROOT / "assets" / folder / f"{prefix}_{p}.webp")


def item(src: pathlib.Path, key: str, dest: pathlib.Path, size: int) -> None:
    im = key_out(Image.open(src), key)
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    im.thumbnail((size, size), Image.LANCZOS)
    save_webp(im, dest)


def trim_bars(im: Image.Image) -> Image.Image:
    """Cắt viền đen (letterbox) mà ảnh AI đôi khi tự thêm."""
    g = im.convert("L")
    w, h = g.size
    px = g.load()

    def dark_row(y):
        return sum(px[x, y] for x in range(0, w, 4)) / len(range(0, w, 4)) < 14

    def dark_col(x):
        return sum(px[x, y] for y in range(0, h, 4)) / len(range(0, h, 4)) < 14

    top = next((y for y in range(h) if not dark_row(y)), 0)
    bottom = next((y for y in range(h - 1, -1, -1) if not dark_row(y)), h - 1) + 1
    left = next((x for x in range(w) if not dark_col(x)), 0)
    right = next((x for x in range(w - 1, -1, -1) if not dark_col(x)), w - 1) + 1
    return im.crop((left, top, right, bottom)) if (right - left) > w // 2 and (bottom - top) > h // 2 else im


def background(src: pathlib.Path, dest: pathlib.Path, width: int = BG_WIDTH) -> None:
    im = trim_bars(Image.open(src).convert("RGB"))
    im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    save_webp(im, dest, quality=78)


def auto() -> None:
    meta = json.loads((RAW / "meta.json").read_text())
    poses = {n.removeprefix("teacher_"): RAW / f"{n}.png" for n, m in meta.items() if m["group"] == "teacher"}
    if poses:
        teacher(poses)
    host = {n.removeprefix("host_"): RAW / f"{n}.png" for n, m in meta.items() if m["group"] == "host"}
    if host:
        teacher(host, prefix="host", folder="host")
    mascot = {n.removeprefix("mascot_"): RAW / f"{n}.png" for n, m in meta.items() if m["group"] == "mascot"}
    if mascot:
        teacher(mascot, prefix="mascot", folder="mascot", key="magenta")
    for name, m in meta.items():
        src = RAW / f"{name}.png"
        if m["group"] == "ui":
            stem = {"exam_1tiet": "exam1tiet"}.get(name, name)  # khớp tên UiAsset.exam1tiet
            item(src, m["key"], ROOT / "assets" / "ui" / f"{stem}.webp", SIZES["ui"])
        elif m["group"] == "pets":
            item(src, m["key"], ROOT / "assets" / "pets" / f"{name.removeprefix('pet_')}.webp", SIZES["pets"])
        elif m["group"] == "bg":
            background(src, ROOT / "assets" / "bg" / f"{name.removeprefix('bg_')}.webp")
        elif m["group"] == "illus":
            background(src, ROOT / "assets" / "illus" / f"{name.removeprefix('illus_')}.webp", width=640)
        elif m["group"] == "remedies":
            background(src, ROOT / "assets" / "remedies" / f"{name.removeprefix('remedy_')}.webp", width=720)
        elif m["group"] == "examples":
            background(src, ROOT / "assets" / "examples" / f"{name.removeprefix('example_')}.webp", width=720)
        elif m["group"] == "chapters":
            background(src, ROOT / "assets" / "chapters" / f"{name.removeprefix('chapter_')}.webp", width=640)


if __name__ == "__main__":
    if len(sys.argv) >= 2 and sys.argv[1] == "auto":
        auto()
    elif len(sys.argv) == 3 and sys.argv[1] == "teacher":
        d = pathlib.Path(sys.argv[2])
        teacher({p: d / f"teacher_{p}.png" for p in TEACHER_POSES if (d / f"teacher_{p}.png").exists()})
    elif len(sys.argv) == 3 and sys.argv[1] == "ui":
        d = pathlib.Path(sys.argv[2])
        for f in d.glob("*.png"):
            item(f, "magenta", ROOT / "assets" / "ui" / f"{f.stem}.webp", SIZES["ui"])
    else:
        sys.exit(__doc__)
