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


# ---- nhận diện ngôn ngữ (không cần mạng): chữ viết + tần suất từ thông dụng
STOP = {
 "en": "the and you your to of is in it with on not this that for be are".split(),
 "fr": "le la les et vous tu de des un une est pas que en du pour avec ton ta".split(),
 "es": "el la los las y de que en un una es no con por tu para se del".split(),
 "de": "der die das und du nicht ist ein eine zu mit den auf dich dein im".split(),
 "it": "il la le e di che non un una è per con ti tuo del in".split(),
 "pt": "o a os as e de que não um uma é com para do da em teu".split(),
 "nl": "de het een en je niet is van op met dat te zijn jouw".split(),
 "sv": "och att det är du en som inte på med för till din dig".split(),
 "da": "og at det er du en som ikke på med for til din dig".split(),
 "fi": "ja on se et ei että kun sinun tai myös ole niin".split(),
 "pl": "i nie się w na to z że jest do jak twoja ci".split(),
 "tr": "ve bir bu da de ile için değil sen çok gibi ama".split(),
 "tk": "we bir bu bilen üçin däl sen hem ýaly ýa-da".split(),
 "uz": "va bir bu bilan uchun emas siz ham kabi yoki".split(),
 "id": "dan yang di ini itu dengan tidak kamu untuk ke dari".split(),
 "so": "iyo waa ku in ka oo u la aan ay ee".split(),
 "mg": "ny ary dia amin'ny ianao tsy ho an'ny ka fa".split(),
}
def guess(text):
    t = text.lower()
    scripts = [("zh", r"[\u4e00-\u9fff]"), ("ja", r"[\u3040-\u30ff]"), ("ko", r"[\uac00-\ud7af]"), ("th", r"[\u0e00-\u0e7f]"),
               ("my", r"[\u1000-\u109f]"), ("el", r"[\u0370-\u03ff]"), ("ar", r"[\u0600-\u06ff]"), ("cyr", r"[\u0400-\u04ff]")]
    counts = {k: len(re.findall(rx, t)) for k, rx in scripts}
    latin = len(re.findall(r"[a-z]", t))
    top = max(counts, key=counts.get)
    if counts[top] > latin:
        if top == "ja" or (top == "zh" and counts["ja"] > counts["zh"] * 0.05): return "ja" if counts["ja"] else "zh"
        if top == "ar": return "fa" if re.search(r"[پچژگکی]", t) else "ar"
        if top == "cyr":
            if re.search(r"[әғқңұһ]", t): return "kk"
            if re.search(r"[іїєґ]", t): return "uk"
            if re.search(r"[өү]", t): return "mn"
            return "ru"
        return top
    words = re.findall(r"[a-zà-ÿăâđêôơưçğışñäöüåæøœʻ'’-]+", t)
    best, bs = None, 0
    for lg, sw in STOP.items():
        sc = sum(1 for w in words if w in sw)
        if sc > bs: best, bs = lg, sc
    return best


def collect(o, out):
    if isinstance(o, str): out.append(o)
    elif isinstance(o, list): [collect(x, out) for x in o]
    elif isinstance(o, dict): [collect(v, out) for v in o.values()]
    return out


def lang_errs(lang):
    errs = []
    if lang == "vi": return errs
    d = BASE / lang
    chunks = []
    try:
        les = json.loads((d / "lessons.json").read_text())
        chunks += [(f"lessons.json.{k}", " ".join(collect(v, []))) for k, v in les.items()]
        chunks += [(f"{f}", " ".join(collect(json.loads((d / f).read_text()), []))) for f in ["ui.json", "lines.json", "tracks.json"]]
    except Exception:  # noqa: BLE001
        return errs
    for name, txt in chunks:
        g = guess(txt)
        if g and g != lang and not (lang in ("da", "sv") and g in ("da", "sv")) and not (lang in ("tr", "tk", "uz") and g in ("tr", "tk", "uz") and lang != "tr" and g == lang):
            errs.append(f"{name}: có vẻ là tiếng '{g}' chứ không phải '{lang}'")
    return errs


def check(lang):
    errs = lang_errs(lang)
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
