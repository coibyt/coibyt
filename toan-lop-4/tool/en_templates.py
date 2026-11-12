#!/usr/bin/env python3
"""Tách đề bài thành MẪU + giá trị (giống lib/logic/english_prompts.dart) để dịch đề sang tiếng Anh theo mẫu.

    python3 tool/en_templates.py --missing     # liệt kê mẫu chưa có bản dịch (tool/en_translations.py)
    python3 tool/en_templates.py --dart        # ghi lib/logic/english_prompt_table.dart
"""
import glob
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
NAMES = ["An", "Bình", "Chi", "Dũng", "Hà", "Khôi", "Lan", "Mai", "Minh", "Nam", "Ngân", "Phúc", "Quân", "Thảo", "Vy",
         "Hùng", "Linh", "Hoa", "Khang", "Ngọc"]
NUMW = {"không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười", "mươi", "mốt", "tư", "lăm",
        "linh", "lẻ", "trăm", "nghìn", "triệu", "tỉ"}
SCALE = {"mươi", "mười", "trăm", "nghìn", "triệu", "tỉ"}
W = "[a-zà-ỹđ]+"


def templ(t: str) -> str:
    # Phân số viết bằng chữ trong ngoặc kép: “ba phần tư”
    def q(m):
        ws = m.group(1).split()
        return "{W}" if ws and all(w in NUMW or w == "phần" for w in ws) else m.group(0)
    t = re.sub(r"“([a-zà-ỹđ ]+)”", q, t)

    # Số viết bằng chữ (≥ 2 từ, có chữ số và từ chỉ hàng): "bốn triệu không trăm …" ("hàng trăm nghìn" thì không)
    digits = NUMW - SCALE - {"linh", "lẻ"} | {"mười"}

    def run(m):
        text = m.group(0)
        ws = text.split()
        if len(ws) >= 2 and any(w in SCALE for w in ws) and any(w in digits for w in ws):
            return "{W}" + text[len(text.rstrip()):]
        return text
    t = re.sub(r"(?<![\wà-ỹđ])(?:(?:" + "|".join(sorted(NUMW, key=len, reverse=True)) + r")(?![\wà-ỹđ])\s?)+", run, t)
    t = re.sub(r"(\d+)\s*/\s*(\d+)", "{F}", t)
    t = re.sub(r"\d{1,3}(?:\.\d{3})+|\d+", "{N}", t)
    for n in sorted(NAMES, key=len, reverse=True):
        t = re.sub(r"(?<![\wÀ-ỹ])" + n + r"(?![\wÀ-ỹ])", "{P}", t)
    return t


def prompts():
    for f in sorted(glob.glob(str(ROOT / "assets/content/lessons/*.json"))):
        for p in json.load(open(f, encoding="utf-8"))["problems"]:
            yield p["prompt"]["text"]


if __name__ == "__main__":
    keys = sorted({templ(t) for t in prompts()})
    if "--list" in sys.argv:
        for k in keys:
            print(repr(k))


PH = re.compile(r"\{([NFPW]|\d+)\}")


def emit_dart():
    sys.path.insert(0, str(ROOT / "tool"))
    from en_translations import EN  # noqa: E402
    keys = sorted({templ(t) for t in prompts()})
    assert len(keys) == len(EN), f"{len(keys)} mẫu nhưng {len(EN)} bản dịch"
    out = []
    for vi, en in zip(keys, EN):
        vt = PH.findall(vi)
        et = PH.findall(en)
        if all(not x.isdigit() for x in et):
            assert vt == et, f"lệch chỗ trống:\n  {vi}\n  {en}"
        else:
            assert sorted(int(x) for x in et) == list(range(len(vt))), (vi, en)
        out.append((vi, en))

    def lit(s):
        return "'" + s.replace("\\", "\\\\").replace("'", "\\'").replace("$", "\\$").replace("\n", "\\n") + "'"
    body = "\n".join(f"  {lit(vi)}:\n      {lit(en)}," for vi, en in out)
    (ROOT / "lib" / "logic" / "english_prompt_table.dart").write_text(
        "// FILE SINH TỰ ĐỘNG bởi tool/en_templates.py --dart (bản dịch ở tool/en_translations.py) — đừng sửa tay.\n"
        "//\n// Mẫu đề tiếng Việt → mẫu đề tiếng Anh. Chỗ trống: {N} số, {F} phân số, {P} tên, {W} số viết bằng chữ.\n"
        "library;\n\nconst Map<String, String> kEnglishPromptTemplates = {\n" + body + "\n};\n", encoding="utf-8")
    print(f"OK {len(out)} mẫu")


if "--dart" in sys.argv:
    emit_dart()
if "--missing" in sys.argv:
    sys.path.insert(0, str(ROOT / "tool"))
    print(len(sorted({templ(t) for t in prompts()})))
