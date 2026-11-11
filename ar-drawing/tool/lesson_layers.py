"""Split a cel-shaded illustration into the four layers of a colouring lesson.

    python3 tool/lesson_layers.py <source_dir> <out_dir> apple fox cupcake

For each <name>.png in source_dir (a cel-shaded picture on a white
background: dark outlines, flat base colours, one darker shadow shape,
white highlights) writes <out_dir>/<name>/1_outline.png, 2_base.png,
3_shadow.png and 4_final.png with transparent backgrounds, and prints the
pencil colours found (base / shadow) to help write the lesson's palette in
assets/lessons/lessons.json. Then downscale/compress the PNGs as needed.
Needs numpy, pillow and scipy."""
import json, sys, os
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

PENCILS = {  # id: hex (typical 24-colour pencil box)
 "white": "#FFFFFF", "lemon": "#F5E642", "yellow": "#FFC93C", "orange": "#F7941D", "red": "#E53935",
 "crimson": "#A31621", "pink": "#F48FB1", "magenta": "#D81B60", "purple": "#8E44AD", "blue": "#1E88E5",
 "sky": "#64B5F6", "turquoise": "#26C6DA", "green": "#43A047", "darkgreen": "#1B5E20", "lime": "#9CCC65",
 "brown": "#8D5524", "tan": "#D7A86E", "darkbrown": "#4E342E", "cream": "#F3E5C0", "grey": "#9E9E9E",
 "black": "#212121", "skin": "#F2C6A0", "rust": "#C1622E", "lightpink": "#F8C8DC",
}

def srgb_to_lab(rgb):
    c = np.asarray(rgb, np.float64) / 255.0
    c = np.where(c > 0.04045, ((c + 0.055) / 1.055) ** 2.4, c / 12.92)
    m = np.array([[0.4124, 0.3576, 0.1805], [0.2126, 0.7152, 0.0722], [0.0193, 0.1192, 0.9505]])
    xyz = c @ m.T / np.array([0.95047, 1.0, 1.08883])
    f = np.where(xyz > 0.008856, np.cbrt(xyz), 7.787 * xyz + 16 / 116)
    return np.stack([116 * f[..., 1] - 16, 500 * (f[..., 0] - f[..., 1]), 200 * (f[..., 1] - f[..., 2])], -1)

PENCIL_LAB = {k: srgb_to_lab([int(v[i:i + 2], 16) for i in (1, 3, 5)]) for k, v in PENCILS.items()}
def nearest_pencil(rgb):
    lab = srgb_to_lab(rgb)
    return min(PENCIL_LAB, key=lambda k: float(((PENCIL_LAB[k] - lab) ** 2).sum()))

def hexof(rgb): return '#%02X%02X%02X' % tuple(int(x) for x in rgb)

def split(src, out_dir, max_side=1000):
    im = Image.open(src).convert('RGB')
    im.thumbnail((max_side, max_side), Image.LANCZOS)
    a = np.asarray(im).astype(np.int16)
    h, w, _ = a.shape
    lum = (0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2])
    # background: near-white connected to the border
    near_white = np.sqrt(((255 - a) ** 2).sum(-1)) < 30
    lab, _ = ndimage.label(near_white)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = ndimage.binary_dilation(np.isin(lab, list(border)), iterations=1)
    # outline: dark AND nearly colourless (dark-brown ink), so deep reds or
    # dark shadow colours are not mistaken for lines
    L_all = srgb_to_lab(a)
    chroma = np.sqrt(L_all[..., 1] ** 2 + L_all[..., 2] ** 2)
    strong = (L_all[..., 0] < 33) & (chroma < 32) & ~bg
    weak = (L_all[..., 0] < 50) & (chroma < 42) & ~bg
    # hysteresis: weak (antialiased / thinner) ink counts when it touches strong ink
    wl, _ = ndimage.label(weak | strong, structure=np.ones((3, 3)))
    keep = np.unique(wl[strong]); keep = keep[keep > 0]
    outline = np.isin(wl, keep)
    # regions bounded by outline
    inside = ~bg & ~outline
    reg, n = ndimage.label(inside)
    alpha = np.where(bg, 0, 255).astype(np.uint8)
    alpha = np.asarray(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.7)))
    base = a.copy(); shadowed = a.copy()
    rgb_lab = L_all
    palette_base, palette_shadow = {}, {}
    sizes = ndimage.sum(np.ones((h, w)), reg, range(1, n + 1))
    for r in range(1, n + 1):
        m = reg == r
        if sizes[r - 1] < 25:
            continue
        px = a[m]
        q = (px // 12).astype(np.int32)
        keys = q[:, 0] * 10000 + q[:, 1] * 100 + q[:, 2]
        vals, counts = np.unique(keys, return_counts=True)
        mode_key = vals[counts.argmax()]
        mode_px = px[keys == mode_key].mean(0)
        L0 = srgb_to_lab(mode_px)[0]
        Lpx = rgb_lab[m][:, 0]
        is_shadow = Lpx < L0 - 7
        is_high = Lpx > L0 + 7
        base[m] = mode_px
        sh = shadowed[m]
        sh[~is_shadow] = mode_px
        shadowed[m] = sh
        area = int(m.sum())
        bk = nearest_pencil(mode_px)
        palette_base[bk] = palette_base.get(bk, 0) + area
        if is_shadow.sum() > 0.04 * area and is_shadow.sum() > 60:
            sk = nearest_pencil(px[is_shadow].mean(0))
            palette_shadow[sk] = palette_shadow.get(sk, 0) + int(is_shadow.sum())
    # small regions (anti-aliasing fringes): keep original colour everywhere
    os.makedirs(out_dir, exist_ok=True)
    ink = np.zeros((h, w, 4), np.uint8)
    ink[..., :3] = (58, 40, 32)
    soft = ndimage.gaussian_filter(outline.astype(np.float64), 0.6)
    ink[..., 3] = (np.clip(np.maximum(outline, soft * 1.8), 0, 1) * 255).astype(np.uint8)
    def save(rgb, name, alpha_=alpha):
        Image.fromarray(np.dstack([rgb.clip(0, 255).astype(np.uint8), alpha_]), 'RGBA').save(f'{out_dir}/{name}.png', optimize=True)
    Image.fromarray(ink, 'RGBA').save(f'{out_dir}/1_outline.png', optimize=True)
    base[outline] = a[outline]; shadowed[outline] = a[outline]
    save(base, '2_base'); save(shadowed, '3_shadow'); save(a, '4_final')
    top = lambda d, k: [x for x, _ in sorted(d.items(), key=lambda kv: -kv[1])][:k]
    return {"base": top(palette_base, 5), "shadow": top(palette_shadow, 4)}

if __name__ == '__main__':
    res = {}
    for name in sys.argv[3:]:
        res[name] = split(f'{sys.argv[1]}/{name}.png', f'{sys.argv[2]}/{name}')
    print(json.dumps(res))
