#!/usr/bin/env python3
"""Kiểm tra một bản dịch content/i18n/<mã>/ so với bản gốc tiếng Việt content/i18n/vi/.

  python3 tools/i18n_check.py ru        → in lỗi; mã thoát 0 khi đạt
  python3 tools/i18n_check.py --all

Kiểm tra: đủ 5 file, đúng khoá, đúng số phần tử của mọi danh sách, giữ nguyên {0}/{1}, thẻ <b>, ký hiệu ①②③④,
không còn để nguyên câu tiếng Việt, không có chuỗi rỗng.
"""
import json, pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
BASE = ROOT / "content/i18n"
FILES = ["ui.json", "lines.json", "tracks.json", "lessons.json", "force.json"]
VI_CHARS = set("ạảãàáâậầấẩẫăắằặẳẵđêếềểễệôốồổỗộơớờởỡợưứừửữựỉĩịủũụỳỷỹỵẻẽẹỏõọ")
MARKS = ["{0}", "{1}", "<b>", "</b>", "①", "②", "③", "④"]


def walk(a, b, path, errs, lang):
    if isinstance(a, dict):
        if not isinstance(b, dict):
            errs.append(f"{path}: phải là object"); return
        for k in a:
            if k not in b:
                errs.append(f"{path}.{k}: thiếu")
            else:
                walk(a[k], b[k], f"{path}.{k}", errs, lang)
        for k in b:
            if k not in a:
                errs.append(f"{path}.{k}: khoá thừa")
    elif isinstance(a, list):
        if not isinstance(b, list) or len(a) != len(b):
            errs.append(f"{path}: phải là danh sách {len(a)} phần tử"); return
        for i, (x, y) in enumerate(zip(a, b)):
            walk(x, y, f"{path}[{i}]", errs, lang)
    elif isinstance(a, str):
        if not isinstance(b, str):
            errs.append(f"{path}: phải là chuỗi"); return
        if a.strip() and not b.strip():
            errs.append(f"{path}: rỗng")
        for m in MARKS:
            if a.count(m) != b.count(m):
                errs.append(f"{path}: phải giữ đúng {a.count(m)} lần '{m}'")
        if lang != "vi" and len(a) > 12 and a == b and not re.fullmatch(r"[\W\dA-Z×·]+", a):
            errs.append(f"{path}: chưa dịch")
        if lang not in ("vi",) and sum(c in VI_CHARS for c in b.lower()) >= 2:
            errs.append(f"{path}: còn chữ tiếng Việt: {b[:60]}")
    else:
        if a != b:
            errs.append(f"{path}: giá trị phải giữ nguyên {a!r}")


def check(lang):
    errs = []
    for f in FILES:
        src = json.loads((BASE / "vi" / f).read_text())
        p = BASE / lang / f
        if not p.exists():
            errs.append(f"{f}: thiếu file"); continue
        try:
            dst = json.loads(p.read_text())
        except Exception as e:  # noqa: BLE001
            errs.append(f"{f}: JSON lỗi: {e}"); continue
        walk(src, dst, f, errs, lang)
    return errs


if __name__ == "__main__":
    langs = sorted(p.name for p in BASE.iterdir() if p.is_dir() and p.name != "vi") if sys.argv[1:] == ["--all"] else sys.argv[1:]
    bad = 0
    for lang in langs:
        errs = check(lang)
        print(f"{lang}: {'ĐẠT' if not errs else f'{len(errs)} lỗi'}")
        for e in errs[:40]:
            print("   ", e)
        bad += bool(errs)
    sys.exit(1 if bad else 0)
