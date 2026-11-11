"""Builds Lumi's demonstration paths for every colouring lesson.

    python3 tool/lesson_demo.py            # all lessons in assets/lessons/lessons.json
    python3 tool/lesson_demo.py apple fox  # some lessons

For each lesson writes assets/lessons/<id>/demo.json: for every step (except
"done") a list of brush strokes, in the order a teacher would draw them.
In the app Lumi's brush follows these strokes and reveals the step's overlay
picture underneath, so the demonstration shows exactly the lesson's colours.

- outline steps: the skeleton of the line art, traced into smooth polylines,
  top to bottom, each next line starting near where the previous one ended.
- colour steps (base / shadow / highlight): the pixels that change from the
  previous layer, covered by back-and-forth strokes like real colouring,
  one patch at a time, with a brush size that suits the patch.

Coordinates are fractions of the picture's width (x) and height (y); the
stroke width "w" is a fraction of the picture's width.
Needs numpy, pillow, scipy and scikit-image."""
import json, math, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage
from skimage.morphology import skeletonize

ROOT = os.path.join(os.path.dirname(__file__), '..', 'assets', 'lessons')


def rgba(path):
    return np.asarray(Image.open(path).convert('RGBA')).astype(np.int32)


def rdp(pts, eps):
    if len(pts) < 3:
        return pts
    a, b = np.array(pts[0], float), np.array(pts[-1], float)
    ab = b - a
    n = np.hypot(*ab) or 1.0
    d = [abs(ab[0] * (a[1] - p[1]) - ab[1] * (a[0] - p[0])) / n for p in pts]
    i = int(np.argmax(d))
    if d[i] > eps:
        return rdp(pts[: i + 1], eps)[:-1] + rdp(pts[i:], eps)
    return [pts[0], pts[-1]]


def trace_skeleton(sk):
    """Walks a 1-px skeleton into polylines (lists of (x, y))."""
    sk = sk.copy()
    H, W = sk.shape
    nb = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]

    def neighbours(y, x):
        return [(y + dy, x + dx) for dy, dx in nb if 0 <= y + dy < H and 0 <= x + dx < W and sk[y + dy, x + dx]]

    paths = []
    while True:
        ys, xs = np.nonzero(sk)
        if len(ys) == 0:
            break
        # prefer an end point (one neighbour), top-most first
        start = None
        for y, x in sorted(zip(ys, xs)):
            if len(neighbours(y, x)) == 1:
                start = (y, x)
                break
        if start is None:
            start = (ys[0], xs[0])
        path = [start]
        sk[start] = False
        cur = start
        while True:
            nbs = neighbours(*cur)
            if not nbs:
                break
            # keep going straight when possible
            if len(path) >= 2:
                vy, vx = cur[0] - path[-2][0], cur[1] - path[-2][1]
                nbs.sort(key=lambda p: -((p[0] - cur[0]) * vy + (p[1] - cur[1]) * vx))
            cur = nbs[0]
            sk[cur] = False
            path.append(cur)
        paths.append([(float(x), float(y)) for y, x in path])
    return paths


def order(strokes):
    """Top-to-bottom, then always the stroke whose start (or end) is closest."""
    if not strokes:
        return strokes
    rest = sorted(strokes, key=lambda s: min(p[1] for p in s['p']))
    out = [rest.pop(0)]
    while rest:
        end = out[-1]['p'][-1]
        best, bi, rev = 1e18, 0, False
        for i, s in enumerate(rest):
            for r, q in ((False, s['p'][0]), (True, s['p'][-1])):
                d = (q[0] - end[0]) ** 2 + (q[1] - end[1]) ** 2
                if d < best:
                    best, bi, rev = d, i, r
        s = rest.pop(bi)
        if rev:
            s['p'] = s['p'][::-1]
        out.append(s)
    return out


def outline_strokes(img):
    H, W = img.shape[:2]
    ink = img[..., 3] > 100
    ink = ndimage.binary_closing(ink, iterations=1)
    thick = ndimage.distance_transform_edt(ink).max()
    sk = skeletonize(ink)
    out = []
    for path in trace_skeleton(sk):
        if len(path) < 6:
            continue
        pts = rdp(path, 1.2)
        out.append({'w': (2 * thick + 6) / W, 'p': pts})
    return order(out), W, H


def colour_strokes(prev, cur):
    H, W = cur.shape[:2]
    diff = np.abs(cur - prev).sum(axis=2) > 60
    diff = ndimage.binary_closing(diff, iterations=3)
    diff = ndimage.binary_dilation(diff, iterations=1)
    lab, n = ndimage.label(diff)
    out = []
    for i, sl in enumerate(ndimage.find_objects(lab), start=1):
        comp = lab[sl] == i
        area = comp.sum()
        if area < 8:
            continue
        h, w = comp.shape
        # brush size: a fraction of the patch, within sensible pencil sizes
        bw = float(np.clip(min(h, w) / 3.0, 0.012 * W, 0.05 * W))
        step = bw * 0.75
        rows = []
        y = bw / 2
        while y < h + step / 2:
            yy = min(int(y), h - 1)
            band = comp[max(0, yy - int(step / 2)): min(h, yy + int(step / 2) + 1)].any(axis=0)
            xs = np.nonzero(band)[0]
            if len(xs):
                rows.append((yy, xs.min(), xs.max()))
            y += step
        if not rows:
            continue
        pts = []
        for k, (yy, x0, x1) in enumerate(rows):
            a, b = (x0, x1) if k % 2 == 0 else (x1, x0)
            pts += [(sl[1].start + a, sl[0].start + yy), (sl[1].start + b, sl[0].start + yy)]
        if len(rows) == 1 and rows[0][1] == rows[0][2]:
            pts.append((pts[0][0] + 0.5, pts[0][1]))
        out.append({'w': bw / W, 'p': [(float(x), float(y)) for x, y in pts], 'area': int(area)})
    # big patches first (like a real artist), then the small details
    big = order([s for s in out if s['area'] >= 0.01 * W * H])
    small = order([s for s in out if s['area'] < 0.01 * W * H])
    for s in big + small:
        s.pop('area', None)
    return big + small


def build(lesson_id, steps):
    folder = os.path.join(ROOT, lesson_id)
    prev = None
    demo = []
    W = H = 0
    for st in steps:
        if st['kind'] == 'done':
            continue
        cur = rgba(os.path.join(folder, st['overlay'] + '.png'))
        H, W = cur.shape[:2]
        if st['kind'] == 'outline':
            strokes, W, H = outline_strokes(cur)
        else:
            strokes = colour_strokes(prev, cur)
        prev = cur
        demo.append({
            'overlay': st['overlay'],
            'strokes': [{'w': round(s['w'], 4), 'p': [round(v, 4) for x, y in s['p'] for v in (x / W, y / H)]}
                        for s in strokes],
        })
    data = {'aspect': round(W / H, 4), 'steps': demo}
    with open(os.path.join(folder, 'demo.json'), 'w') as f:
        json.dump(data, f, separators=(',', ':'))
    return data


def main():
    lessons = json.load(open(os.path.join(ROOT, 'lessons.json')))
    lessons = lessons['lessons'] if isinstance(lessons, dict) else lessons
    only = set(sys.argv[1:])
    for l in lessons:
        if only and l['id'] not in only:
            continue
        d = build(l['id'], l['steps'])
        size = os.path.getsize(os.path.join(ROOT, l['id'], 'demo.json'))
        print(l['id'], [len(s['strokes']) for s in d['steps']], f'{size // 1024} KB')


if __name__ == '__main__':
    main()
