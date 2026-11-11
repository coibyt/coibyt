#!/usr/bin/env python3
"""Sinh nội dung CẢ NĂM HỌC Toán 3 — bộ "Kết nối tri thức với cuộc sống" (Tập 1 + Tập 2).

    python3 tool/gen_curriculum.py

Ghi ra:
  * assets/content/lessons/kntt3.c<N>.<slug>.json  — mỗi bài học một file (trừ 2 bài viết tay của Chủ đề 4)
  * assets/content/catalog.json                    — Bộ sách → Chủ đề → Bài học (+ số tiết), kỹ năng, đề
  * assets/content/calendar.json                   — lịch học từng ngày năm học 2026–2027
  * lib/logic/tutor_hints.dart                     — các câu gợi ý chung (không có số) để ghi âm một lần

Nguyên tắc:
  * Chỉ dùng thư viện chuẩn Python 3; hạt giống ngẫu nhiên CỐ ĐỊNH → chạy lại ra đúng file cũ.
  * Mọi con số do máy chọn; đáp án, phép đặt tính (từng lượt viết/nhớ theo SGK), phép chia
    (từng lượt hạ/chia/nhân/trừ) và bài giải đều TÍNH bằng code, không gõ tay.
  * Lời văn tự soạn theo phong cách chương trình lớp 3, không chép SGK.
  * Trước khi ghi file, script tự kiểm tra lại toán (giống lib/logic/content_validator.dart).
"""
from __future__ import annotations

import datetime as dt
import json
import pathlib
import random
import re
import sys
import zlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
CONTENT = ROOT / "assets" / "content"
LESSON_DIR = CONTENT / "lessons"
HINTS_DART = ROOT / "lib" / "logic" / "tutor_hints.dart"

SCHEMA_VERSION = "1.3.0"
BASE_SEED = 20262027
BOOK = "kntt3"
HAND_WRITTEN = {"kntt3.c4.nhan-2cs-1cs", "kntt3.c4.chia-2cs-1cs"}

# ---------------------------------------------------------------------------
# Câu gợi ý chung (KHÔNG chứa số → ghi âm một lần, không bao giờ lộ đáp án)
# ---------------------------------------------------------------------------
H = {
    "add": "Con đặt tính thẳng cột rồi cộng từ hàng đơn vị, nhớ cộng số nhớ sang hàng bên trái nhé.",
    "sub": "Con đặt tính thẳng cột rồi trừ từ hàng đơn vị; nếu có nhớ thì cộng số nhớ vào hàng bên trái của số trừ nhé.",
    "mul": "Con nhân lần lượt từ hàng đơn vị sang trái, nhớ cộng thêm số nhớ nhé.",
    "div": "Con chia lần lượt từ trái sang phải, mỗi lượt hạ một chữ số xuống nhé.",
    "table_mul": "Con đọc lại bảng nhân hoặc đếm thêm đều để tìm kết quả nhé.",
    "table_div": "Con nghĩ xem số nào nhân với số chia thì được số bị chia nhé.",
    "drag": "Con tính kết quả từng dòng trước rồi kéo thẻ vào nhé.",
    "match": "Con tính từng phép tính bên trái trước, rồi mới tìm kết quả bên phải nhé.",
    "word": "Con đọc kỹ đề: đề cho biết gì, hỏi gì, rồi chọn phép tính thích hợp nhé.",
    "two_step": "Bài này cần hai bước tính: con tìm số chưa biết ở bước một trước nhé.",
    "more_less": "Nhiều hơn thì làm phép cộng, ít hơn thì làm phép trừ nhé.",
    "find_addend": "Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết.",
    "find_minuend": "Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.",
    "find_subtrahend": "Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu.",
    "find_factor": "Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết.",
    "find_dividend": "Muốn tìm số bị chia, ta lấy thương nhân với số chia.",
    "find_divisor": "Muốn tìm số chia, ta lấy số bị chia chia cho thương.",
    "fraction": "Muốn tìm một phần mấy của một số, ta lấy số đó chia cho số phần bằng nhau.",
    "times_up": "Muốn gấp một số lên nhiều lần, ta lấy số đó nhân với số lần.",
    "times_down": "Muốn giảm một số đi nhiều lần, ta lấy số đó chia cho số lần.",
    "how_many_times": "Muốn biết số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé.",
    "remainder": "Trong phép chia có dư, số dư luôn bé hơn số chia nhé.",
    "expr_order": "Biểu thức có cộng, trừ, nhân, chia thì con làm nhân, chia trước; cộng, trừ sau nhé.",
    "expr_ltr": "Biểu thức chỉ có cộng, trừ hoặc chỉ có nhân, chia thì con tính lần lượt từ trái sang phải.",
    "expr_paren": "Biểu thức có dấu ngoặc thì con tính trong ngoặc trước nhé.",
    "compare": "Con so sánh từ hàng cao nhất; số nào có chữ số ở hàng đó lớn hơn thì lớn hơn.",
    "order": "Con so sánh các số rồi xếp lần lượt từ bé đến lớn nhé.",
    "place_value": "Con xác định từng hàng của số, từ hàng cao nhất đến hàng đơn vị nhé.",
    "read_number": "Con đọc số lần lượt theo từng hàng, từ trái sang phải nhé.",
    "next_number": "Số liền sau thì thêm một, số liền trước thì bớt một nhé.",
    "sequence": "Con tìm xem hai số đứng liền nhau hơn kém nhau bao nhiêu nhé.",
    "rounding": "Con nhìn chữ số ngay bên phải hàng cần làm tròn: bé hơn năm thì làm tròn xuống, từ năm trở lên thì làm tròn lên.",
    "roman": "Nhớ nhé: I là một, V là năm, X là mười; chữ số nhỏ đứng bên phải thì cộng thêm, đứng bên trái thì trừ đi.",
    "midpoint": "Trung điểm nằm ở giữa và chia đoạn thẳng thành hai phần dài bằng nhau.",
    "circle": "Trong một hình tròn, đường kính dài gấp đôi bán kính nhé.",
    "angle": "Con dùng ê ke để kiểm tra góc vuông nhé.",
    "shape": "Con đếm cẩn thận số cạnh, số đỉnh, số góc của hình nhé.",
    "solid": "Con đếm lần lượt các mặt, các cạnh, các đỉnh của khối hình nhé.",
    "perimeter": "Chu vi của một hình là tổng độ dài các cạnh của hình đó.",
    "polyline": "Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng của nó.",
    "perim_rect": "Chu vi hình chữ nhật bằng chiều dài cộng chiều rộng rồi nhân với hai.",
    "perim_square": "Chu vi hình vuông bằng độ dài một cạnh nhân với bốn.",
    "area": "Diện tích hình chữ nhật bằng chiều dài nhân với chiều rộng; hình vuông thì lấy cạnh nhân với cạnh.",
    "area_count": "Con đếm số ô vuông một xăng-ti-mét vuông có trong hình nhé.",
    "length": "Nhớ nhé: một xăng-ti-mét bằng mười mi-li-mét, một mét bằng một trăm xăng-ti-mét.",
    "mass": "Nhớ nhé: một ki-lô-gam bằng một nghìn gam.",
    "volume": "Nhớ nhé: một lít bằng một nghìn mi-li-lít.",
    "same_unit": "Con đổi về cùng một đơn vị đo rồi mới tính hoặc so sánh nhé.",
    "estimate": "Con nghĩ đến đồ vật thật ngoài đời rồi chọn số đo hợp lý nhé.",
    "temperature": "Nhiệt độ càng cao thì càng nóng, nhiệt độ càng thấp thì càng lạnh.",
    "clock": "Kim ngắn chỉ giờ, kim dài chỉ phút; một giờ có sáu mươi phút nhé.",
    "calendar": "Một tuần có bảy ngày, con đếm thêm từng tuần trên lịch nhé.",
    "month_days": "Con đếm tháng trên các khớp nắm tay: tháng ở chỗ gồ lên có ba mươi mốt ngày.",
    "money": "Con cộng giá trị của các tờ tiền lại với nhau nhé.",
    "stat_count": "Con đếm cẩn thận từng loại, đếm xong loại nào thì đánh dấu loại đó nhé.",
    "stat_table": "Con đọc số liệu ở từng dòng rồi so sánh hoặc tính nhé.",
    "probability": "Chắc chắn là luôn xảy ra, không thể là không bao giờ xảy ra, có thể là lúc xảy ra lúc không.",
}

# ---------------------------------------------------------------------------
# Số và chữ
# ---------------------------------------------------------------------------


def fmt(n: int) -> str:
    """Viết số kiểu Việt Nam: từ 1000 trở lên dùng dấu chấm phân nhóm (10.000)."""
    return f"{n:,}".replace(",", ".") if n >= 1000 else str(n)


_DIG = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"]


def _two(n: int, after_hundred: bool) -> str:
    if n < 10:
        return f"linh {_DIG[n]}" if after_hundred else _DIG[n]
    t, u = divmod(n, 10)
    tens = "mười" if t == 1 else f"{_DIG[t]} mươi"
    if u == 0:
        return tens
    unit = {1: "mốt" if t > 1 else "một", 4: "tư" if t > 1 else "bốn", 5: "lăm"}.get(u, _DIG[u])
    return f"{tens} {unit}"


def _three(n: int, full: bool) -> str:
    h, rest = divmod(n, 100)
    if h == 0 and not full:
        return _two(rest, False)
    head = f"{_DIG[h]} trăm"
    return head if rest == 0 else f"{head} {_two(rest, True)}"


def words(n: int) -> str:
    """Đọc số 0–999 999 bằng chữ (giống lib/logic/spoken_vi.dart)."""
    if n == 0:
        return "không"
    hi, lo = divmod(n, 1000)
    parts = []
    if hi:
        parts.append(_three(hi, False) + " nghìn")
    if lo:
        parts.append(_three(lo, hi > 0))
    return " ".join(parts)


def digit(n: int | str, place: int) -> int:
    s = str(n)
    i = len(s) - 1 - place
    return int(s[i]) if i >= 0 else 0


ROMAN = [(10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")]


def roman(n: int) -> str:
    out = ""
    for v, s in ROMAN:
        while n >= v:
            out += s
            n -= v
    return out


WEEKDAYS = ["thứ Hai", "thứ Ba", "thứ Tư", "thứ Năm", "thứ Sáu", "thứ Bảy", "Chủ nhật"]

# ---------------------------------------------------------------------------
# Đặt tính (cách SGK) và phép chia
# ---------------------------------------------------------------------------


def col_add(nums: list[int]) -> dict:
    ops = [str(n) for n in nums]
    cols = max(len(o) for o in ops)
    steps, carry = [], 0
    for p in range(cols):
        ds = [digit(o, p) for o in ops if p < len(o)]
        base = sum(ds)
        s = base + carry
        last = p == cols - 1
        write = s if last else s % 10
        nc = 0 if last else s // 10
        if len(ds) == 1:
            txt = f"{ds[0]} thêm {carry} bằng {s}, " if carry else f"Hạ {ds[0]}, "
        else:
            txt = " cộng ".join(map(str, ds)) + f" bằng {base}, "
            if carry:
                txt += f"thêm {carry} bằng {s}, "
        txt += f"viết {write}" + (f" nhớ {nc}" if nc else "") + "."
        step = {"place": p, "text": txt, "write": str(write)}
        if nc:
            step["carry"] = nc
        steps.append(step)
        carry = nc
    return {"kind": "column_arithmetic", "operation": "add", "operands": ops,
            "result": str(sum(nums)), "digitSteps": steps}


def col_sub(a: int, b: int) -> dict:
    A, B = str(a), str(b)
    steps, carry = [], 0
    for p in range(len(A)):
        top = digit(A, p)
        bd = digit(B, p) if p < len(B) else None
        bottom = (bd or 0) + carry
        borrow = top < bottom
        w = top + (10 if borrow else 0) - bottom
        if bd is None and carry == 0:
            txt = f"Hạ {top}, viết {top}."
        else:
            pre = f"{bd} thêm 1 bằng {bottom}; " if (bd is not None and carry) else ""
            if borrow:
                core = f"{top} không trừ được {bottom}, lấy {top + 10} trừ {bottom} bằng {w}, viết {w} nhớ 1."
            else:
                core = f"{top} trừ {bottom} bằng {w}, viết {w}."
            txt = pre + core
        step = {"place": p, "text": txt, "write": str(w)}
        if borrow:
            step["carry"] = 1
        steps.append(step)
        carry = 1 if borrow else 0
    return {"kind": "column_arithmetic", "operation": "subtract", "operands": [A, B],
            "result": str(a - b), "digitSteps": steps}


def col_mul(a: int, k: int) -> dict:
    A = str(a)
    steps, carry = [], 0
    for p in range(len(A)):
        d = digit(A, p)
        s = d * k + carry
        last = p == len(A) - 1
        write = s if last else s % 10
        nc = 0 if last else s // 10
        txt = f"{k} nhân {d} bằng {d * k}, "
        if carry:
            txt += f"thêm {carry} bằng {s}, "
        txt += f"viết {write}" + (f" nhớ {nc}" if nc else "") + "."
        step = {"place": p, "text": txt, "write": str(write)}
        if nc:
            step["carry"] = nc
        steps.append(step)
        carry = nc
    return {"kind": "column_arithmetic", "operation": "multiply", "operands": [A, str(k)],
            "result": str(a * k), "digitSteps": steps}


def long_div(a: int, d: int) -> dict:
    s = str(a)
    k = 1
    while k < len(s) and int(s[:k]) < d:
        k += 1
    partial = int(s[:k])
    nxt = k
    steps = []
    first = True
    prev_rem = 0
    while True:
        q = partial // d
        prod = q * d
        r = partial - prod
        core = f"{partial} chia {d} được {q}, viết {q}. {q} nhân {d} bằng {prod}; {partial} trừ {prod} bằng {r}."
        if first:
            txt = core
        else:
            ch = s[nxt - 1]
            txt = (f"Hạ {ch}, được {partial}; " if prev_rem else f"Hạ {ch}; ") + core
        steps.append({"text": txt, "partialDividend": partial, "quotientDigit": q, "product": prod, "remainder": r})
        first = False
        prev_rem = r
        if nxt >= len(s):
            break
        partial = r * 10 + int(s[nxt])
        nxt += 1
    return {"kind": "long_division", "dividend": s, "divisor": str(d), "quotient": str(a // d),
            "remainder": a % d, "digitSteps": steps}


def column_block(a: int, op: str, b: int) -> dict:
    return {"+": lambda: col_add([a, b]), "-": lambda: col_sub(a, b),
            "×": lambda: col_mul(a, b), ":": lambda: long_div(a, b)}[op]()


def calc(a: int, op: str, b: int) -> int:
    if op == "+":
        return a + b
    if op == "-":
        return a - b
    if op == "×":
        return a * b
    assert a % b == 0, (a, b)
    return a // b


def eq(a: int, op: str, b: int, unit: str | None = None) -> str:
    s = f"{fmt(a)} {op} {fmt(b)} = {fmt(calc(a, op, b))}"
    return s + (f" ({unit})" if unit else "")


def is_table_fact(a: int, op: str, b: int) -> bool:
    if op == "×":
        return a < 10 and b < 10
    if op == ":":
        return b < 10 and a // b <= 10 and a % b == 0 and a <= 90
    return False


def needs_block(a: int, op: str, b: int) -> bool:
    """Có cần đặt tính không (bảng nhân chia, cộng trừ nhẩm thì không)."""
    if is_table_fact(a, op, b):
        return False
    if op in "+-":
        return max(a, b) >= 10
    return True


def E(text: str) -> dict:
    return {"kind": "equation", "text": text}


def T(text: str, style: str | None = None) -> dict:
    d = {"kind": "text", "text": text}
    if style:
        d["style"] = style
    return d


def WP(lines: list[tuple[str, str]], answer: str) -> dict:
    return {"kind": "word_problem", "lines": [{"explanation": x, "equation": e} for x, e in lines],
            "answer": f"Đáp số: {answer}."}


def calc_steps(a: int, op: str, b: int) -> list[dict]:
    out = []
    if needs_block(a, op, b):
        out.append(column_block(a, op, b))
    out.append(E(eq(a, op, b)))
    return out


OP_HINT = {"+": "add", "-": "sub", "×": "mul", ":": "div"}

# ---------------------------------------------------------------------------
# Khung một Bài Toán
# ---------------------------------------------------------------------------
UNIT_ALIASES = {
    "cm": ["xăng-ti-mét"], "mm": ["mi-li-mét"], "m": ["mét"], "km": ["ki-lô-mét"], "dm": ["đề-xi-mét"],
    "g": ["gam"], "kg": ["ki-lô-gam"], "ml": ["mi-li-lít"], "l": ["lít"], "°C": ["độ C", "độ"],
    "cm²": ["xăng-ti-mét vuông", "cm2"], "đồng": ["đ"],
}


def mk(type_, instr, prompt, level, secs, skills, answer, steps, hint=None, speak=None, **body):
    assert len(instr) <= 40, instr
    p = {"type": type_, "instruction": instr, "prompt": {"text": prompt}, "level": level,
         "estimatedSeconds": secs, "skillIds": list(dict.fromkeys(skills))}
    if speak:
        p["prompt"]["speak"] = speak
    p.update(body)
    sol = {"answerText": answer}
    if hint:
        sol["hint"] = H[hint]
    sol["steps"] = steps
    p["solution"] = sol
    return p


def FB(template: str, answers: list) -> dict:
    """Mẫu điền số: mỗi '□' là một ô; answers = giá trị hoặc (giá trị, đơn vị)."""
    parts = template.split("□")
    assert len(parts) - 1 == len(answers), (template, answers)
    t, blanks = parts[0], []
    for i, a in enumerate(answers, 1):
        v, unit = a if isinstance(a, tuple) else (a, None)
        t += "{{b%d}}" % i + parts[i]
        ans = {"kind": "number", "value": v}
        if unit:
            ans["unit"] = unit
            if UNIT_ALIASES.get(unit):
                ans["unitAliases"] = UNIT_ALIASES[unit]
        blanks.append({"id": f"b{i}", "answer": ans, "maxLength": max(2, len(fmt(v)))})
    return {"template": t, "blanks": blanks}


def MC(rng, correct: str, wrong: list[str]) -> dict:
    texts = [correct] + list(wrong)
    assert len(set(texts)) == len(texts), texts
    assert 2 <= len(texts) <= 6
    rng.shuffle(texts)
    ids = "abcdef"
    return {"choices": [{"id": ids[i], "text": t} for i, t in enumerate(texts)],
            "correctChoiceIds": [ids[texts.index(correct)]]}


def DD(rng, template: str, answers: list[str], extras: list[str] = (), reuse: bool = False) -> dict:
    parts = template.split("□")
    assert len(parts) - 1 == len(answers)
    uniq = list(dict.fromkeys(answers))
    if not reuse:
        assert len(uniq) == len(answers), answers
    for e in extras:
        assert e not in uniq, (e, answers)
    texts = uniq + list(dict.fromkeys(extras))
    rng.shuffle(texts)
    tid = {t: f"t{i + 1}" for i, t in enumerate(texts)}
    t = parts[0]
    for i in range(1, len(parts)):
        t += "{{s%d}}" % i + parts[i]
    body = {"template": t, "tokens": [{"id": tid[x], "text": x} for x in texts],
            "slots": [{"id": f"s{i + 1}", "accept": [tid[a]]} for i, a in enumerate(answers)]}
    if reuse:
        body["reuseTokens"] = True
    return body


def MT(rng, pairs: list[tuple[str, str]], extras: list[str] = ()) -> dict:
    lefts = [l for l, _ in pairs]
    rights = [r for _, r in pairs] + list(extras)
    assert len(set(lefts)) == len(lefts) and len(set(rights)) == len(rights), (pairs, extras)
    order = rights[:]
    rng.shuffle(order)
    rid = {t: f"r{i + 1}" for i, t in enumerate(order)}
    return {"left": [{"id": f"l{i + 1}", "text": l} for i, l in enumerate(lefts)],
            "right": [{"id": rid[t], "text": t} for t in order],
            "pairs": [{"left": f"l{i + 1}", "right": rid[r]} for i, (_, r) in enumerate(pairs)]}


def pick_wrong(rng, correct: int, cands: list[int], n: int = 3, lo: int = 0) -> list[int]:
    out = []
    for c in cands:
        if c >= lo and c != correct and c not in out:
            out.append(c)
    extra = [correct + d for d in (1, -1, 2, -2, 10, -10, 3, -3, 100, -100, 5, -5, 20, -20)]
    rng.shuffle(extra)
    for c in extra:
        if len(out) >= n:
            break
        if c >= lo and c != correct and c not in out:
            out.append(c)
    first = out[:2]
    rest = out[2:]
    rng.shuffle(rest)
    return (first + rest)[:n]


def no_carry_add(a, b):
    n = max(len(str(a)), len(str(b)))
    return int("".join(str((digit(a, p) + digit(b, p)) % 10) for p in reversed(range(n))))


def naive_sub(a, b):
    n = len(str(a))
    return int("".join(str(abs(digit(a, p) - digit(b, p))) for p in reversed(range(n))))


def no_carry_mul(a, k):
    n = len(str(a))
    return int("".join(str(digit(a, p) * k % 10) for p in reversed(range(n))))


def calc_wrong(rng, a, op, b, r):
    if op == "+":
        c = [no_carry_add(a, b), r + 10, r - 10, r + 100]
    elif op == "-":
        c = [naive_sub(a, b), r + 10, r - 10, r - 100]
    elif op == "×":
        c = [no_carry_mul(a, b), r + b, r - b, r + 10]
    else:
        c = [r + 1, r - 1, r * 10 if r < 1000 else r + 10, r + 10]
    return pick_wrong(rng, r, [x for x in c if x != r], lo=1)


# ---------------------------------------------------------------------------
# Tự kiểm tra toán (bản Python của lib/logic/content_validator.dart)
# ---------------------------------------------------------------------------
_NUM = re.compile(r"[0-9.]+")


def evaluate(expr: str) -> int:
    toks = []
    i = 0
    while i < len(expr):
        c = expr[i]
        if c.isspace():
            i += 1
        elif c.isdigit():
            m = _NUM.match(expr, i)
            raw = m.group(0)
            if "." in raw and not re.fullmatch(r"[0-9]{1,3}(\.[0-9]{3})+", raw):
                raise ValueError(f"số viết sai {raw}")
            toks.append(int(raw.replace(".", "")))
            i = m.end()
        elif c in "+-−–":
            toks.append("+" if c == "+" else "-")
            i += 1
        elif c in "×xX*":
            toks.append("×")
            i += 1
        elif c in ":÷":
            toks.append(":")
            i += 1
        elif c in "()":
            toks.append(c)
            i += 1
        else:
            raise ValueError(f"ký tự lạ {c!r} trong {expr!r}")
    pos = 0

    def atom():
        nonlocal pos
        t = toks[pos]
        pos += 1
        if t == "(":
            v = summ()
            assert toks[pos] == ")"
            pos += 1
            return v
        assert isinstance(t, int), expr
        return t

    def prod():
        nonlocal pos
        v = atom()
        while pos < len(toks) and toks[pos] in ("×", ":"):
            op = toks[pos]
            pos += 1
            r = atom()
            if op == "×":
                v *= r
            else:
                if v % r:
                    raise ValueError(f"{v} : {r} không chia hết trong {expr!r}")
                v //= r
        return v

    def summ():
        nonlocal pos
        v = prod()
        while pos < len(toks) and toks[pos] in ("+", "-"):
            op = toks[pos]
            pos += 1
            r = prod()
            v = v + r if op == "+" else v - r
        return v

    v = summ()
    assert pos == len(toks), expr
    return v


def check_equation(text: str):
    s = re.sub(r"\s*\([^()0-9]*\)\s*$", "", text.strip())
    sides = s.split("=")
    if len(sides) < 2:
        raise ValueError(f"không có dấu = : {text!r}")
    vals = [evaluate(x) for x in sides]
    if any(v != vals[0] for v in vals):
        raise ValueError(f"phép tính sai: {text!r} {vals}")


def check_column(b: dict):
    nums = [int(o) for o in b["operands"]]
    op = b["operation"]
    res = int(b["result"])
    if op == "add":
        exp, cols = sum(nums), max(len(o) for o in b["operands"])
    elif op == "subtract":
        exp, cols = nums[0] - nums[1], len(b["operands"][0])
    else:
        assert len(b["operands"][1]) == 1
        exp, cols = nums[0] * nums[1], len(b["operands"][0])
    assert exp == res, b
    steps = b["digitSteps"]
    assert len(steps) == cols, b
    carry = 0
    written = ""
    for p in range(cols):
        st = steps[p]
        last = p == cols - 1
        if op == "add":
            s = sum(digit(o, p) for o in b["operands"]) + carry
            w, c = (s, 0) if last else (s % 10, s // 10)
        elif op == "multiply":
            s = digit(b["operands"][0], p) * nums[1] + carry
            w, c = (s, 0) if last else (s % 10, s // 10)
        else:
            top = digit(b["operands"][0], p)
            bot = digit(b["operands"][1], p) + carry
            c = 1 if top < bot else 0
            w = top + 10 * c - bot
        assert st["place"] == p and int(st["write"]) == w and st.get("carry", 0) == c, (b, p)
        assert last or len(st["write"]) == 1
        carry = c
        written = st["write"] + written
    assert int(written) == res


def check_division(b: dict):
    a, d = int(b["dividend"]), int(b["divisor"])
    assert a // d == int(b["quotient"]) and a % d == b["remainder"], b
    s = b["dividend"]
    k = 1
    while k < len(s) and int(s[:k]) < d:
        k += 1
    exp = int(s[:k])
    nxt = k
    qd = ""
    for i, st in enumerate(b["digitSteps"]):
        assert st["partialDividend"] == exp, b
        assert st["quotientDigit"] * d == st["product"] and st["partialDividend"] - st["product"] == st["remainder"]
        assert 0 <= st["remainder"] < d
        qd += str(st["quotientDigit"])
        if nxt < len(s):
            exp = st["remainder"] * 10 + int(s[nxt])
            nxt += 1
        else:
            assert i == len(b["digitSteps"]) - 1
    assert nxt >= len(s) and int(qd) == int(b["quotient"])


def check_block(b: dict):
    k = b["kind"]
    if k == "equation":
        check_equation(b["text"])
    elif k == "word_problem":
        for ln in b["lines"]:
            check_equation(ln["equation"])
    elif k == "column_arithmetic":
        check_column(b)
    elif k == "long_division":
        check_division(b)


HINT_SET = set(H.values())


def check_problem(p: dict):
    assert len(p["instruction"]) <= 40, p["instruction"]
    for b in p["solution"]["steps"]:
        check_block(b)
    h = p["solution"].get("hint")
    assert h is None or h in HINT_SET, h
    t = p["type"]
    if t == "multiple_choice":
        ids = [c["id"] for c in p["choices"]]
        texts = [c["text"] for c in p["choices"]]
        assert len(set(texts)) == len(texts) and set(p["correctChoiceIds"]) <= set(ids), p
    elif t == "fill_blank":
        ids = re.findall(r"\{\{([a-z0-9_]+)\}\}", p["template"])
        assert ids == [b["id"] for b in p["blanks"]], p
        for b in p["blanks"]:
            assert len(str(b["answer"]["value"])) <= b["maxLength"] <= 7
    elif t == "drag_drop":
        ids = re.findall(r"\{\{([a-z0-9_]+)\}\}", p["template"])
        assert ids == [s["id"] for s in p["slots"]]
        firsts = [s["accept"][0] for s in p["slots"]]
        assert p.get("reuseTokens") or len(set(firsts)) == len(firsts), p
    elif t == "matching":
        rights = [x["right"] for x in p["pairs"]]
        assert len(set(rights)) == len(rights)
        assert len(p["left"]) <= 6 and len(p["right"]) <= 7

# ---------------------------------------------------------------------------
# Chọn số
# ---------------------------------------------------------------------------


def rnd(rng, lo, hi):
    return rng.randint(lo, hi)


def n_digits(rng, d, zeros=False):
    lo, hi = 10 ** (d - 1), 10 ** d - 1
    n = rng.randint(lo, hi)
    if zeros and d >= 3:
        s = list(str(n))
        s[rng.randint(1, d - 2)] = "0"
        n = int("".join(s))
    return n


def has_carry_add(a, b):
    return any(digit(a, p) + digit(b, p) >= 10 for p in range(max(len(str(a)), len(str(b)))))


def has_borrow(a, b):
    return any(digit(a, p) < digit(b, p) for p in range(len(str(a))))


def pick_add(rng, d, carry=True, d2=None):
    """a có d chữ số, b có d2 chữ số; tổng vẫn có d chữ số (trừ khi d = 5: tổng ≤ 100 000)."""
    d2 = d2 or d
    top = 10 ** d - 1 if d < 5 else 100000
    for _ in range(500):
        a = n_digits(rng, d)
        b = n_digits(rng, d2)
        if a + b > top:
            continue
        if carry == has_carry_add(a, b):
            return a, b
    raise RuntimeError("pick_add")


def pick_sub(rng, d, borrow=True, d2=None):
    """a có d chữ số, b có d2 chữ số; hiệu vẫn có d chữ số (không viết số 0 ở hàng cao nhất)."""
    d2 = d2 or d
    for _ in range(2000):
        a = n_digits(rng, d)
        b = n_digits(rng, d2)
        if b >= a or len(str(a - b)) < len(str(a)):
            continue
        if borrow == has_borrow(a, b):
            return a, b
    raise RuntimeError("pick_sub")


def pick_mul(rng, d, maxr, carry=True):
    for _ in range(500):
        k = rng.randint(2, 9)
        a = n_digits(rng, d)
        if a * k > maxr:
            continue
        c = any(digit(a, p) * k >= 10 for p in range(d)) or len(str(a * k)) > d
        if c == carry:
            return a, k
    raise RuntimeError("pick_mul")


def pick_div(rng, d, rem=False, zero_q=False):
    """Số bị chia có d chữ số, số chia 2–9; tuỳ chọn có dư / thương có chữ số 0."""
    for _ in range(2000):
        k = rng.randint(2, 9)
        a = n_digits(rng, d)
        if not rem:
            a -= a % k
            if a < 10 ** (d - 1):
                continue
        elif a % k == 0:
            continue
        q = str(a // k)
        if zero_q != ("0" in q[1:]):
            continue
        return a, k
    raise RuntimeError("pick_div")


# ---------------------------------------------------------------------------
# Bài tính
# ---------------------------------------------------------------------------


def b_calc(rng, a, op, b, skills, level=1, mode="fill", instr=None):
    r = calc(a, op, b)
    expr = f"{fmt(a)} {op} {fmt(b)}"
    block = needs_block(a, op, b)
    hint = OP_HINT[op] if block else {"×": "table_mul", ":": "table_div"}.get(op, OP_HINT[op])
    steps = calc_steps(a, op, b)
    if mode == "fill":
        instr = instr or ("Đặt tính rồi tính." if block else "Tính nhẩm.")
        return mk("fill_blank", instr, f"{expr} = ?", level, 50 if block else 20, skills, fmt(r), steps, hint,
                  **FB(f"{expr} = □", [r]))
    wrong = calc_wrong(rng, a, op, b, r)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Kết quả của phép tính {expr} là:", level,
              50 if block else 25, skills, fmt(r), steps, hint, **MC(rng, fmt(r), [fmt(w) for w in wrong]))


def b_div_rem(rng, a, k, skills, level=2, mode="fill"):
    q, r = divmod(a, k)
    steps = [long_div(a, k), T(f"{fmt(a)} : {k} = {fmt(q)} (dư {r})"), T("Thử lại:"), E(f"{fmt(q)} × {k} + {r} = {fmt(a)}")]
    if mode == "fill":
        return mk("fill_blank", "Đặt tính rồi tính.", f"{fmt(a)} : {k} = ? (dư ?)", level, 60, skills,
                  f"{fmt(q)} (dư {r})", steps, "div", **FB(f"{fmt(a)} : {k} = □ (dư □)", [q, r]))
    right = f"{fmt(q)} (dư {r})"
    wrong = [f"{fmt(q + 1)} (dư {r})", f"{fmt(q)} (dư {r + k})", f"{fmt(q - 1)} (dư {r})" if q > 1 else f"{fmt(q * 10)} (dư {r})"]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Kết quả của phép chia {fmt(a)} : {k} là:", level, 60, skills,
              right, steps, "remainder", **MC(rng, right, wrong))


def distinct_items(rng, gen, n):
    items, seen = [], set()
    for _ in range(500):
        a, op, b = gen(rng)
        r = calc(a, op, b)
        if r in seen:
            continue
        seen.add(r)
        items.append((a, op, b))
        if len(items) == n:
            return items
    raise RuntimeError("distinct_items")


def b_calc_drag(rng, gen, skills, level=2, n=3):
    items = distinct_items(rng, gen, n)
    res = [calc(*it) for it in items]
    tmpl = "\n".join(f"{fmt(a)} {op} {fmt(b)} = □" for a, op, b in items)
    extra = pick_wrong(rng, res[0], calc_wrong(rng, *items[0], res[0]) + [res[1] + 10])
    extra = next(x for x in extra if x not in res)
    steps = [E(eq(*it)) for it in items] + [T(f"Thẻ {fmt(extra)} là thẻ thừa, không dùng đến.", "tip")]
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống.", level, 60, skills,
              "; ".join(fmt(r) for r in res), steps, "drag",
              **DD(rng, tmpl, [fmt(r) for r in res], [fmt(extra)]))


def b_calc_match(rng, gen, skills, level=2, n=4):
    items = distinct_items(rng, gen, n)
    res = [calc(*it) for it in items]
    extra = next(x for x in pick_wrong(rng, res[-1], calc_wrong(rng, *items[-1], res[-1]) + [res[0] + 1]) if x not in res)
    pairs = [(f"{fmt(a)} {op} {fmt(b)}", fmt(r)) for (a, op, b), r in zip(items, res)]
    return mk("matching", "Nối phép tính với kết quả.", "Chạm vào một phép tính, rồi chạm vào kết quả đúng của nó.",
              level, 90, skills, "; ".join(f"{l} = {r}" for l, r in pairs), [E(eq(*it)) for it in items], "match",
              **MT(rng, pairs, [fmt(extra)]))


def b_calc_extreme(rng, gen, skills, level=3, largest=True):
    items = distinct_items(rng, gen, 4)
    res = [calc(*it) for it in items]
    best = max(res) if largest else min(res)
    i = res.index(best)
    exprs = [f"{fmt(a)} {op} {fmt(b)}" for a, op, b in items]
    word = "lớn nhất" if largest else "bé nhất"
    steps = [T("Tính kết quả từng phép tính:")] + [E(eq(*it)) for it in items] + [
        T(f"Số {word} là {fmt(best)}. Vậy phép tính {exprs[i]} có kết quả {word}.")]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Phép tính nào có kết quả {word}?", level, 100, skills,
              f"{exprs[i]} (bằng {fmt(best)})", steps, "match",
              **MC(rng, exprs[i], [e for j, e in enumerate(exprs) if j != i]))


# ---------------------------------------------------------------------------
# Bài toán có lời văn (một phép tính)
# ---------------------------------------------------------------------------
# Mỗi ngữ cảnh: hàm (a, b, r) -> (đề, mẫu điền với □, câu lời giải, đơn vị trong ngoặc, đơn vị ô trống, đáp số)
COUNT_GROUPS = [
    ("hộp", "cái bút chì", "cái"), ("túi", "quả cam", "quả"), ("bó", "bông hoa", "bông"),
    ("thùng", "chai nước", "chai"), ("ngăn", "quyển sách", "quyển"), ("khay", "cái bánh", "cái"),
    ("hàng", "cây", "cây"), ("lọ", "viên kẹo", "viên"), ("hộp", "viên phấn", "viên"),
    ("rổ", "quả trứng", "quả"), ("nhóm", "bạn", "bạn"), ("xe", "thùng hàng", "thùng"),
]
MEASURE_GROUPS = [
    ("bao", "gạo", "kg", "ki-lô-gam"), ("can", "dầu", "l", "lít"), ("cuộn", "vải", "m", "mét"),
    ("thùng", "nước mắm", "l", "lít"), ("túi", "đường", "kg", "ki-lô-gam"),
]


BIG_MUL = [
    lambda a, k, r: (f"Mỗi ngày một nhà máy may được {fmt(a)} chiếc áo. Hỏi trong {k} ngày nhà máy đó may được bao nhiêu chiếc áo?",
                     f"Trong {k} ngày nhà máy may được □ chiếc áo.", f"Số áo nhà máy may được trong {k} ngày là:", "chiếc", "chiếc", f"{fmt(r)} chiếc áo"),
    lambda a, k, r: (f"Mỗi xe tải chở {fmt(a)} kg xi măng. Hỏi {k} xe tải như thế chở được bao nhiêu ki-lô-gam xi măng?",
                     f"{k} xe tải chở được □ kg xi măng.", f"Số xi măng {k} xe tải chở được là:", "kg", "kg", f"{fmt(r)} kg xi măng"),
    lambda a, k, r: (f"Mỗi bể chứa {fmt(a)} l nước. Hỏi {k} bể như thế chứa được bao nhiêu lít nước?",
                     f"{k} bể chứa được □ l nước.", f"Số nước {k} bể chứa được là:", "l", "l", f"{fmt(r)} l nước"),
    lambda a, k, r: (f"Mỗi tháng một cửa hàng bán được {fmt(a)} quyển vở. Hỏi trong {k} tháng cửa hàng đó bán được bao nhiêu quyển vở?",
                     f"Trong {k} tháng cửa hàng bán được □ quyển vở.", f"Số vở cửa hàng bán được trong {k} tháng là:", "quyển", "quyển", f"{fmt(r)} quyển vở"),
]
BIG_DIV = [
    lambda a, k, r: (f"Một nhà máy may được {fmt(a)} chiếc áo trong {k} ngày, số áo may được mỗi ngày như nhau. Hỏi mỗi ngày nhà máy may được bao nhiêu chiếc áo?",
                     "Mỗi ngày nhà máy may được □ chiếc áo.", "Số áo nhà máy may được mỗi ngày là:", "chiếc", "chiếc", f"{fmt(r)} chiếc áo"),
    lambda a, k, r: (f"Có {fmt(a)} kg gạo chia đều vào {k} kho. Hỏi mỗi kho có bao nhiêu ki-lô-gam gạo?",
                     "Mỗi kho có □ kg gạo.", "Số gạo mỗi kho có là:", "kg", "kg", f"{fmt(r)} kg gạo"),
    lambda a, k, r: (f"Người ta chia đều {fmt(a)} quyển sách cho {k} thư viện. Hỏi mỗi thư viện nhận được bao nhiêu quyển sách?",
                     "Mỗi thư viện nhận được □ quyển sách.", "Số sách mỗi thư viện nhận được là:", "quyển", "quyển", f"{fmt(r)} quyển sách"),
    lambda a, k, r: (f"Một con đường dài {fmt(a)} m được chia thành {k} đoạn dài bằng nhau để sửa. Hỏi mỗi đoạn đường dài bao nhiêu mét?",
                     "Mỗi đoạn đường dài □ m.", "Độ dài mỗi đoạn đường là:", "m", "m", f"{fmt(r)} m"),
]


def ctx_mul(rng, a, k, r):
    if a >= 100:
        return rng.choice(BIG_MUL)(a, k, r)
    if rng.random() < 0.6:
        g, item, u = rng.choice(COUNT_GROUPS)
        return (f"Mỗi {g} có {fmt(a)} {item}. Hỏi {k} {g} như thế có tất cả bao nhiêu {item}?",
                f"{k} {g} có □ {item}.", f"Số {item} có trong {k} {g} là:", u, u, f"{fmt(r)} {item}")
    g, item, u, uw = rng.choice(MEASURE_GROUPS)
    return (f"Mỗi {g} có {fmt(a)} {u} {item}. Hỏi {k} {g} như thế có tất cả bao nhiêu {uw} {item}?",
            f"{k} {g} có □ {u} {item}.", f"Số {item} có trong {k} {g} là:", u, u, f"{fmt(r)} {u} {item}")


def ctx_div(rng, a, k, r):
    if a >= 1000:
        return rng.choice(BIG_DIV)(a, k, r)
    kind = rng.random()
    if kind < 0.45:
        g, item, u = rng.choice(COUNT_GROUPS)
        return (f"Có {fmt(a)} {item} chia đều vào {k} {g}. Hỏi mỗi {g} có bao nhiêu {item}?",
                f"Mỗi {g} có □ {item}.", f"Số {item} trong mỗi {g} là:", u, u, f"{fmt(r)} {item}")
    if kind < 0.75:
        g, item, u = rng.choice(COUNT_GROUPS)
        return (f"Có {fmt(a)} {item}, xếp đều vào các {g}, mỗi {g} {k} {item}. Hỏi xếp được bao nhiêu {g}?",
                f"Xếp được □ {g}.", f"Số {g} xếp được là:", g, g, f"{fmt(r)} {g}")
    g, item, u, uw = rng.choice(MEASURE_GROUPS)
    return (f"Có {fmt(a)} {u} {item} chia đều vào {k} {g}. Hỏi mỗi {g} có bao nhiêu {uw} {item}?",
            f"Mỗi {g} có □ {u} {item}.", f"Số {item} trong mỗi {g} là:", u, u, f"{fmt(r)} {u} {item}")


# (giá trị lớn nhất còn hợp lý, ngữ cảnh)
ADD_CTX = [
    (100000, lambda a, b, r: (f"Tháng Một nhà máy sản xuất được {fmt(a)} chiếc bút, tháng Hai sản xuất được {fmt(b)} chiếc bút. Hỏi cả hai tháng nhà máy sản xuất được bao nhiêu chiếc bút?",
                              "Cả hai tháng sản xuất được □ chiếc bút.", "Số bút cả hai tháng nhà máy sản xuất được là:", "chiếc", "chiếc", f"{fmt(r)} chiếc bút")),
    (10000, lambda a, b, r: (f"Buổi sáng cửa hàng bán được {fmt(a)} kg gạo, buổi chiều bán được {fmt(b)} kg gạo. Hỏi cả ngày cửa hàng bán được bao nhiêu ki-lô-gam gạo?",
                             "Cả ngày cửa hàng bán được □ kg gạo.", "Số gạo cả ngày cửa hàng bán được là:", "kg", "kg", f"{fmt(r)} kg gạo")),
    (100000, lambda a, b, r: (f"Thư viện có {fmt(a)} quyển truyện và {fmt(b)} quyển sách khoa học. Hỏi thư viện có tất cả bao nhiêu quyển sách?",
                              "Thư viện có □ quyển sách.", "Số quyển sách thư viện có là:", "quyển", "quyển", f"{fmt(r)} quyển sách")),
    (10000, lambda a, b, r: (f"Đội Một trồng được {fmt(a)} cây, đội Hai trồng được {fmt(b)} cây. Hỏi cả hai đội trồng được bao nhiêu cây?",
                             "Cả hai đội trồng được □ cây.", "Số cây cả hai đội trồng được là:", "cây", "cây", f"{fmt(r)} cây")),
    (10000, lambda a, b, r: (f"Quãng đường từ nhà Minh đến bưu điện dài {fmt(a)} m, từ bưu điện đến trường dài {fmt(b)} m. Hỏi quãng đường từ nhà Minh qua bưu điện đến trường dài bao nhiêu mét?",
                             "Quãng đường đó dài □ m.", "Quãng đường từ nhà Minh qua bưu điện đến trường dài là:", "m", "m", f"{fmt(r)} m")),
    (100000, lambda a, b, r: (f"Một trang trại nuôi {fmt(a)} con gà và {fmt(b)} con vịt. Hỏi trang trại nuôi tất cả bao nhiêu con gà và vịt?",
                              "Trang trại nuôi □ con gà và vịt.", "Số con gà và vịt trang trại nuôi là:", "con", "con", f"{fmt(r)} con")),
]
SUB_CTX = [
    (100000, lambda a, b, r: (f"Một sân vận động có {fmt(a)} chỗ ngồi. Đã có {fmt(b)} khán giả vào ngồi. Hỏi sân vận động còn bao nhiêu chỗ trống?",
                              "Còn □ chỗ trống.", "Số chỗ trống còn lại là:", "chỗ", "chỗ", f"{fmt(r)} chỗ")),
    (10000, lambda a, b, r: (f"Một cửa hàng có {fmt(a)} kg đường, đã bán {fmt(b)} kg đường. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam đường?",
                             "Cửa hàng còn lại □ kg đường.", "Số đường cửa hàng còn lại là:", "kg", "kg", f"{fmt(r)} kg đường")),
    (100000, lambda a, b, r: (f"Một xưởng may cần may {fmt(a)} chiếc áo, đã may được {fmt(b)} chiếc áo. Hỏi xưởng còn phải may bao nhiêu chiếc áo nữa?",
                              "Xưởng còn phải may □ chiếc áo.", "Số áo xưởng còn phải may là:", "chiếc", "chiếc", f"{fmt(r)} chiếc áo")),
    (10000, lambda a, b, r: (f"Quãng đường từ nhà Lan đến chợ dài {fmt(a)} m. Lan đã đi được {fmt(b)} m. Hỏi Lan còn phải đi bao nhiêu mét nữa?",
                             "Lan còn phải đi □ m nữa.", "Quãng đường Lan còn phải đi là:", "m", "m", f"{fmt(r)} m")),
    (3000, lambda a, b, r: (f"Một trường học có {fmt(a)} học sinh, trong đó có {fmt(b)} học sinh nam. Hỏi trường đó có bao nhiêu học sinh nữ?",
                            "Trường đó có □ học sinh nữ.", "Số học sinh nữ của trường là:", "học sinh", "học sinh", f"{fmt(r)} học sinh nữ")),
    (100000, lambda a, b, r: (f"Một bể chứa {fmt(a)} l nước. Người ta đã dùng {fmt(b)} l nước. Hỏi trong bể còn lại bao nhiêu lít nước?",
                              "Trong bể còn lại □ l nước.", "Số nước còn lại trong bể là:", "l", "l", f"{fmt(r)} l nước")),
]
MORE_CTX = [
    (100000, lambda a, b, r: (f"Tháng trước cửa hàng bán được {fmt(a)} quyển vở. Tháng này bán được nhiều hơn tháng trước {fmt(b)} quyển vở. Hỏi tháng này cửa hàng bán được bao nhiêu quyển vở?",
                              "Tháng này bán được □ quyển vở.", "Số vở tháng này cửa hàng bán được là:", "quyển", "quyển", f"{fmt(r)} quyển vở")),
    (1000, lambda a, b, r: (f"Lớp 3A thu được {fmt(a)} kg giấy vụn, lớp 3B thu được nhiều hơn lớp 3A {fmt(b)} kg. Hỏi lớp 3B thu được bao nhiêu ki-lô-gam giấy vụn?",
                            "Lớp 3B thu được □ kg giấy vụn.", "Số giấy vụn lớp 3B thu được là:", "kg", "kg", f"{fmt(r)} kg giấy vụn")),
    (100000, lambda a, b, r: (f"Năm ngoái trang trại thu hoạch được {fmt(a)} kg cam. Năm nay thu hoạch được nhiều hơn năm ngoái {fmt(b)} kg. Hỏi năm nay trang trại thu hoạch được bao nhiêu ki-lô-gam cam?",
                              "Năm nay thu hoạch được □ kg cam.", "Số cam năm nay thu hoạch được là:", "kg", "kg", f"{fmt(r)} kg cam")),
    (10000, lambda a, b, r: (f"Cuộn dây xanh dài {fmt(a)} m, cuộn dây đỏ dài hơn cuộn dây xanh {fmt(b)} m. Hỏi cuộn dây đỏ dài bao nhiêu mét?",
                             "Cuộn dây đỏ dài □ m.", "Độ dài cuộn dây đỏ là:", "m", "m", f"{fmt(r)} m")),
]
LESS_CTX = [
    (100000, lambda a, b, r: (f"Năm nay nhà máy sản xuất được {fmt(a)} chiếc xe đạp. Năm ngoái nhà máy sản xuất được ít hơn năm nay {fmt(b)} chiếc. Hỏi năm ngoái nhà máy sản xuất được bao nhiêu chiếc xe đạp?",
                              "Năm ngoái sản xuất được □ chiếc xe đạp.", "Số xe đạp năm ngoái nhà máy sản xuất được là:", "chiếc", "chiếc", f"{fmt(r)} chiếc xe đạp")),
    (1000, lambda a, b, r: (f"Thùng thứ nhất có {fmt(a)} l dầu, thùng thứ hai có ít hơn thùng thứ nhất {fmt(b)} l. Hỏi thùng thứ hai có bao nhiêu lít dầu?",
                            "Thùng thứ hai có □ l dầu.", "Số dầu ở thùng thứ hai là:", "l", "l", f"{fmt(r)} l dầu")),
    (1000, lambda a, b, r: (f"Khối lớp Ba có {fmt(a)} học sinh, khối lớp Hai có ít hơn khối lớp Ba {fmt(b)} học sinh. Hỏi khối lớp Hai có bao nhiêu học sinh?",
                            "Khối lớp Hai có □ học sinh.", "Số học sinh khối lớp Hai là:", "học sinh", "học sinh", f"{fmt(r)} học sinh")),
    (100000, lambda a, b, r: (f"Con đường thứ nhất dài {fmt(a)} m, con đường thứ hai ngắn hơn con đường thứ nhất {fmt(b)} m. Hỏi con đường thứ hai dài bao nhiêu mét?",
                              "Con đường thứ hai dài □ m.", "Độ dài con đường thứ hai là:", "m", "m", f"{fmt(r)} m")),
]


def pick_ctx(rng, pool, *vals):
    ok = [f for mx, f in pool if max(vals) <= mx]
    return rng.choice(ok)


def b_word(rng, op, a, b, skills, level=2, mode="fill", kind=None):
    r = calc(a, op, b)
    if op == "×":
        prompt, tmpl, expl, eu, bu, ans = ctx_mul(rng, a, b, r)
        hint, wrong_ops = "word", [a + b, r + a]
    elif op == ":":
        prompt, tmpl, expl, eu, bu, ans = ctx_div(rng, a, b, r)
        hint, wrong_ops = "word", [a - b, r + 1]
    elif op == "+":
        pool = MORE_CTX if kind == "more" else ADD_CTX
        prompt, tmpl, expl, eu, bu, ans = pick_ctx(rng, pool, a, b, r)(a, b, r)
        hint, wrong_ops = ("more_less" if kind else "word"), [a - b if a > b else b - a, r + 10]
    else:
        pool = LESS_CTX if kind == "less" else SUB_CTX
        prompt, tmpl, expl, eu, bu, ans = pick_ctx(rng, pool, a, b, r)(a, b, r)
        hint, wrong_ops = ("more_less" if kind else "word"), [a + b, r - 10 if r > 10 else r + 1]
    steps = [WP([(expl, eq(a, op, b, eu))], ans)]
    if needs_block(a, op, b):
        steps.append(column_block(a, op, b))
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 90, skills, ans, steps, hint, **FB(tmpl, [(r, bu)]))
    wrong = pick_wrong(rng, r, wrong_ops, lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 90, skills, ans, steps, hint,
              **MC(rng, f"{fmt(r)} {bu}", [f"{fmt(w)} {bu}" for w in wrong]))


# ---------------------------------------------------------------------------
# Bài toán giải bằng hai bước tính
# ---------------------------------------------------------------------------


def _scale_pick(rng, M):
    """Các số 'đẹp' theo phạm vi M (100, 1000, 10000, 100000)."""
    return lambda lo, hi: rng.randint(max(1, int(M * lo)), max(2, int(M * hi)))


def b_word2(rng, kind, M, skills, level=3, mode="fill"):
    """Bài toán giải bằng hai bước tính; M = phạm vi số (100, 1000, 10 000, 100 000)."""
    S = _scale_pick(rng, M)
    big = M >= 1000
    for _ in range(1000):
        if kind == "mul_add":
            n = rnd(rng, 2, 6)
            k = S(0.04, 0.12) if M > 100 else rnd(rng, 11, 19)
            x = k * n
            m = S(0.05, 0.3)
            r = x + m
            if r >= M:
                continue
            blocks = [(k, "×", n), (x, "+", m)]
            if big:
                prompt = f"Một nhà máy có {n} xưởng, mỗi xưởng làm được {fmt(k)} chiếc bút. Nhà máy còn nhập thêm {fmt(m)} chiếc bút. Hỏi nhà máy có tất cả bao nhiêu chiếc bút?"
                lines = [("Số bút các xưởng làm được là:", eq(k, "×", n, "chiếc")), ("Số bút nhà máy có tất cả là:", eq(x, "+", m, "chiếc"))]
                tmpl, unit, ans = "Nhà máy có tất cả □ chiếc bút.", "chiếc", f"{fmt(r)} chiếc bút"
            else:
                prompt = f"Lớp 3A có {n} tổ, mỗi tổ trồng được {fmt(k)} cây. Lớp 3B trồng được {fmt(m)} cây. Hỏi cả hai lớp trồng được bao nhiêu cây?"
                lines = [("Số cây lớp 3A trồng được là:", eq(k, "×", n, "cây")), ("Số cây cả hai lớp trồng được là:", eq(x, "+", m, "cây"))]
                tmpl, unit, ans = "Cả hai lớp trồng được □ cây.", "cây", f"{fmt(r)} cây"
        elif kind == "mul_sub":
            n = rnd(rng, 2, 5)
            k = S(0.05, 0.15) if M > 100 else rnd(rng, 12, 25)
            x = k * n
            a = S(0.6, 0.98)
            r = a - x
            if r <= 0 or x >= M:
                continue
            blocks = [(k, "×", n), (a, "-", x)]
            if big:
                prompt = f"Một kho có {fmt(a)} kg thóc. Người ta đã chở đi {n} xe, mỗi xe chở {fmt(k)} kg thóc. Hỏi trong kho còn lại bao nhiêu ki-lô-gam thóc?"
                lines = [("Số thóc đã chở đi là:", eq(k, "×", n, "kg")), ("Số thóc còn lại trong kho là:", eq(a, "-", x, "kg"))]
                tmpl, unit, ans = "Trong kho còn lại □ kg thóc.", "kg", f"{fmt(r)} kg thóc"
            else:
                prompt = f"Một cửa hàng có {fmt(a)} kg gạo. Cửa hàng đã bán {n} bao gạo, mỗi bao nặng {fmt(k)} kg. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?"
                lines = [("Số gạo cửa hàng đã bán là:", eq(k, "×", n, "kg")), ("Số gạo cửa hàng còn lại là:", eq(a, "-", x, "kg"))]
                tmpl, unit, ans = "Cửa hàng còn lại □ kg gạo.", "kg", f"{fmt(r)} kg gạo"
        elif kind == "more_total":
            a = S(0.15, 0.4)
            b = S(0.03, 0.15)
            x = a + b
            r = a + x
            if r >= M:
                continue
            blocks = [(a, "+", b), (a, "+", x)]
            if big:
                prompt = f"Kho thứ nhất có {fmt(a)} kg gạo, kho thứ hai có nhiều hơn kho thứ nhất {fmt(b)} kg gạo. Hỏi cả hai kho có bao nhiêu ki-lô-gam gạo?"
                lines = [("Số gạo ở kho thứ hai là:", eq(a, "+", b, "kg")), ("Số gạo ở cả hai kho là:", eq(a, "+", x, "kg"))]
                tmpl, unit, ans = "Cả hai kho có □ kg gạo.", "kg", f"{fmt(r)} kg gạo"
            else:
                prompt = f"Thùng thứ nhất có {fmt(a)} l nước mắm, thùng thứ hai có nhiều hơn thùng thứ nhất {fmt(b)} l. Hỏi cả hai thùng có bao nhiêu lít nước mắm?"
                lines = [("Số nước mắm ở thùng thứ hai là:", eq(a, "+", b, "l")), ("Số nước mắm ở cả hai thùng là:", eq(a, "+", x, "l"))]
                tmpl, unit, ans = "Cả hai thùng có □ l nước mắm.", "l", f"{fmt(r)} l nước mắm"
        elif kind == "less_total":
            a = S(0.25, 0.48)
            b = S(0.03, 0.15)
            x = a - b
            r = a + x
            if x <= 0 or r >= M:
                continue
            blocks = [(a, "-", b), (a, "+", x)]
            if big:
                prompt = f"Tháng Một nhà máy may được {fmt(a)} chiếc áo, tháng Hai may được ít hơn tháng Một {fmt(b)} chiếc áo. Hỏi cả hai tháng nhà máy may được bao nhiêu chiếc áo?"
                lines = [("Số áo may được trong tháng Hai là:", eq(a, "-", b, "chiếc")), ("Số áo may được trong cả hai tháng là:", eq(a, "+", x, "chiếc"))]
                tmpl, unit, ans = "Cả hai tháng may được □ chiếc áo.", "chiếc", f"{fmt(r)} chiếc áo"
            else:
                prompt = f"Buổi sáng cửa hàng bán được {fmt(a)} m vải, buổi chiều bán được ít hơn buổi sáng {fmt(b)} m vải. Hỏi cả ngày cửa hàng bán được bao nhiêu mét vải?"
                lines = [("Số vải bán được buổi chiều là:", eq(a, "-", b, "m")), ("Số vải bán được cả ngày là:", eq(a, "+", x, "m"))]
                tmpl, unit, ans = "Cả ngày bán được □ m vải.", "m", f"{fmt(r)} m vải"
        elif kind == "sub_sub":
            a = S(0.5, 0.95)
            b = S(0.1, 0.3)
            c = S(0.05, 0.2)
            x = a - b
            r = x - c
            if r <= 0:
                continue
            blocks = [(a, "-", b), (x, "-", c)]
            prompt = f"Một kho có {fmt(a)} bao xi măng. Lần thứ nhất người ta chuyển đi {fmt(b)} bao, lần thứ hai chuyển đi {fmt(c)} bao. Hỏi trong kho còn lại bao nhiêu bao xi măng?"
            lines = [("Số bao xi măng còn lại sau lần thứ nhất là:", eq(a, "-", b, "bao")), ("Số bao xi măng còn lại trong kho là:", eq(x, "-", c, "bao"))]
            tmpl, unit, ans = "Trong kho còn lại □ bao xi măng.", "bao", f"{fmt(r)} bao xi măng"
        elif kind == "times_total":
            k = rnd(rng, 2, 5)
            a = S(0.03, 0.15) if M > 100 else rnd(rng, 5, 15)
            x = a * k
            r = a + x
            if r >= M:
                continue
            blocks = [(a, "×", k), (a, "+", x)]
            if big:
                prompt = f"Thư viện có {fmt(a)} quyển truyện, số sách giáo khoa gấp {k} lần số truyện. Hỏi thư viện có tất cả bao nhiêu quyển truyện và sách giáo khoa?"
                lines = [("Số sách giáo khoa của thư viện là:", eq(a, "×", k, "quyển")), ("Số truyện và sách giáo khoa có tất cả là:", eq(a, "+", x, "quyển"))]
                tmpl, unit, ans = "Thư viện có tất cả □ quyển.", "quyển", f"{fmt(r)} quyển"
            else:
                prompt = f"Mai gấp được {fmt(a)} ngôi sao, Hà gấp được số ngôi sao gấp {k} lần số ngôi sao của Mai. Hỏi cả hai bạn gấp được bao nhiêu ngôi sao?"
                lines = [("Số ngôi sao Hà gấp được là:", eq(a, "×", k, "ngôi sao")), ("Số ngôi sao cả hai bạn gấp được là:", eq(a, "+", x, "ngôi sao"))]
                tmpl, unit, ans = "Cả hai bạn gấp được □ ngôi sao.", "ngôi sao", f"{fmt(r)} ngôi sao"
        elif kind == "frac_rest":
            k = rnd(rng, 2, 6)
            x = S(0.05, 0.2) if M > 100 else rnd(rng, 4, 15)
            a = x * k
            r = a - x
            if a >= M:
                continue
            blocks = [(a, ":", k), (a, "-", x)]
            if big:
                prompt = f"Một con đường dài {fmt(a)} m. Đội công nhân đã sửa được 1/{k} con đường. Hỏi còn bao nhiêu mét đường chưa sửa?"
                lines = [("Số mét đường đã sửa là:", eq(a, ":", k, "m")), ("Số mét đường chưa sửa là:", eq(a, "-", x, "m"))]
                tmpl, unit, ans = "Còn □ m đường chưa sửa.", "m", f"{fmt(r)} m"
            else:
                prompt = f"Một sợi dây dài {fmt(a)} m. Người ta cắt đi 1/{k} sợi dây. Hỏi sợi dây còn lại dài bao nhiêu mét?"
                lines = [("Độ dài đoạn dây đã cắt đi là:", eq(a, ":", k, "m")), ("Độ dài sợi dây còn lại là:", eq(a, "-", x, "m"))]
                tmpl, unit, ans = "Sợi dây còn lại dài □ m.", "m", f"{fmt(r)} m"
        elif kind == "div_add":
            k = rnd(rng, 2, 6)
            x = S(0.04, 0.15) if M > 100 else rnd(rng, 4, 12)
            a = x * k
            c = S(0.01, 0.05) if M > 100 else rnd(rng, 2, 9)
            r = x + c
            if a >= M:
                continue
            blocks = [(a, ":", k), (x, "+", c)]
            if big:
                prompt = f"Có {fmt(a)} quyển sách chia đều cho {k} thư viện. Sau đó mỗi thư viện được tặng thêm {fmt(c)} quyển. Hỏi lúc này mỗi thư viện có bao nhiêu quyển sách?"
                lines = [("Số sách mỗi thư viện được chia là:", eq(a, ":", k, "quyển")), ("Số sách mỗi thư viện có lúc này là:", eq(x, "+", c, "quyển"))]
                tmpl, unit, ans = "Mỗi thư viện có □ quyển sách.", "quyển", f"{fmt(r)} quyển sách"
            else:
                prompt = f"Có {fmt(a)} quyển vở chia đều cho {k} tổ. Sau đó, mỗi tổ được thưởng thêm {fmt(c)} quyển vở. Hỏi lúc này mỗi tổ có bao nhiêu quyển vở?"
                lines = [("Số quyển vở mỗi tổ được chia là:", eq(a, ":", k, "quyển")), ("Số quyển vở của mỗi tổ lúc này là:", eq(x, "+", c, "quyển"))]
                tmpl, unit, ans = "Mỗi tổ có □ quyển vở.", "quyển", f"{fmt(r)} quyển vở"
        elif kind == "down_used":
            k = rnd(rng, 2, 5)
            x = S(0.05, 0.2) if M > 100 else rnd(rng, 5, 20)
            a = x * k
            r = a - x
            if a >= M:
                continue
            blocks = [(a, ":", k), (a, "-", x)]
            what, cont = ("nước", "bể") if big else ("dầu", "thùng")
            prompt = f"Một {cont} có {fmt(a)} l {what}. Sau khi dùng, số {what} trong {cont} giảm đi {k} lần. Hỏi đã dùng bao nhiêu lít {what}?"
            lines = [(f"Số {what} còn lại trong {cont} là:", eq(a, ":", k, "l")), (f"Số {what} đã dùng là:", eq(a, "-", x, "l"))]
            tmpl, unit, ans = f"Đã dùng □ l {what}.", "l", f"{fmt(r)} l {what}"
        elif kind == "add_mul":
            k = rnd(rng, 2, 6)
            a = S(0.02, 0.08) if M > 100 else rnd(rng, 3, 9)
            b = S(0.02, 0.08) if M > 100 else rnd(rng, 3, 9)
            x = a + b
            r = x * k
            if r >= M:
                continue
            blocks = [(a, "+", b), (x, "×", k)]
            if big:
                prompt = f"Mỗi kho có {fmt(a)} kg gạo nếp và {fmt(b)} kg gạo tẻ. Hỏi {k} kho như thế có tất cả bao nhiêu ki-lô-gam gạo?"
                lines = [("Số gạo có trong mỗi kho là:", eq(a, "+", b, "kg")), (f"Số gạo có trong {k} kho là:", eq(x, "×", k, "kg"))]
                tmpl, unit, ans = f"{k} kho có □ kg gạo.", "kg", f"{fmt(r)} kg gạo"
            else:
                prompt = f"Mỗi hộp có {fmt(a)} bút xanh và {fmt(b)} bút đỏ. Hỏi {k} hộp như thế có tất cả bao nhiêu cái bút?"
                lines = [("Số bút có trong mỗi hộp là:", eq(a, "+", b, "cái")), (f"Số bút có trong {k} hộp là:", eq(x, "×", k, "cái"))]
                tmpl, unit, ans = f"{k} hộp có □ cái bút.", "cái", f"{fmt(r)} cái bút"
        else:
            raise ValueError(kind)
        break
    else:
        raise RuntimeError(kind)
    steps = [WP(lines, ans)] + [column_block(*bl) for bl in blocks if needs_block(*bl)]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 150, skills, ans, steps, "two_step", **FB(tmpl, [(r, unit)]))
    x1 = calc(*blocks[0])
    wrong = pick_wrong(rng, r, [x1, r + 10, r - 10], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 150, skills, ans, steps, "two_step",
              **MC(rng, f"{fmt(r)} {unit}", [f"{fmt(w)} {unit}" for w in wrong]))


# ---------------------------------------------------------------------------
# Tìm thành phần chưa biết
# ---------------------------------------------------------------------------
FIND_HINT = {"addend1": "find_addend", "addend2": "find_addend", "minuend": "find_minuend",
             "subtrahend": "find_subtrahend", "factor1": "find_factor", "factor2": "find_factor",
             "dividend": "find_dividend", "divisor": "find_divisor"}


def find_case(rng, kind, M):
    """-> (biểu thức có ?, x, (phép tính tìm x), (phép thử lại))"""
    if kind in ("addend1", "addend2", "minuend", "subtrahend"):
        while True:
            x = rnd(rng, max(2, M // 20), M // 2)
            o = rnd(rng, max(2, M // 20), M // 2)
            if x != o:
                break
        if kind == "addend1":
            s = x + o
            return f"? + {fmt(o)} = {fmt(s)}", x, (s, "-", o), (x, "+", o)
        if kind == "addend2":
            s = x + o
            return f"{fmt(o)} + ? = {fmt(s)}", x, (s, "-", o), (o, "+", x)
        if kind == "minuend":
            d = o
            b = rnd(rng, max(2, M // 20), M // 2)
            x = d + b
            return f"? - {fmt(b)} = {fmt(d)}", x, (d, "+", b), (x, "-", b)
        a = x + o
        return f"{fmt(a)} - ? = {fmt(o)}", x, (a, "-", o), (a, "-", x)
    k = rnd(rng, 2, 9)
    x = rnd(rng, 2, 10) if M <= 100 else rnd(rng, 11, max(12, M // 10 // k))
    if kind == "factor1":
        return f"? × {k} = {fmt(x * k)}", x, (x * k, ":", k), (x, "×", k)
    if kind == "factor2":
        return f"{k} × ? = {fmt(x * k)}", x, (x * k, ":", k), (k, "×", x)
    if kind == "dividend":
        q = x
        x = q * k
        return f"? : {k} = {fmt(q)}", x, (q, "×", k), (x, ":", k)
    q = rnd(rng, 2, 9)
    x = k
    a = q * k if M <= 100 else q * k
    return f"{fmt(a)} : ? = {q}", x, (a, ":", q), (a, ":", x)


def find_steps(kind, solve, check):
    return [T(H[FIND_HINT[kind]], "rule")] + calc_steps(*solve)[:-1] + [E(eq(*solve)), T("Thử lại:"), E(eq(*check))]


def b_find(rng, kind, M, skills, level=1, mode="fill"):
    expr, x, solve, check = find_case(rng, kind, M)
    steps = find_steps(kind, solve, check)
    hint = FIND_HINT[kind]
    if mode == "fill":
        return mk("fill_blank", "Tìm số thích hợp.", expr, level, 60, skills, fmt(x), steps, hint,
                  **FB(expr.replace("?", "□"), [x]))
    wrong_main = {"addend1": solve[0] + solve[2], "addend2": solve[0] + solve[2], "minuend": solve[0] - solve[2],
                  "subtrahend": solve[0] + solve[2], "factor1": solve[0] * solve[2], "factor2": solve[0] * solve[2],
                  "dividend": solve[0] + solve[2], "divisor": solve[0] * solve[2]}[kind]
    wrong = pick_wrong(rng, x, [wrong_main, x + 1, x - 1], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Số thích hợp thay cho dấu ? là:\n{expr}", level, 60, skills,
              fmt(x), steps, hint, **MC(rng, fmt(x), [fmt(w) for w in wrong]))


def _find_cases(rng, kinds, M, n):
    out, seen = [], set()
    for _ in range(500):
        c = find_case(rng, rng.choice(kinds), M)
        if c[1] in seen or c[0] in {o[0] for o in out}:
            continue
        seen.add(c[1])
        out.append(c)
        if len(out) == n:
            return out
    raise RuntimeError("find cases")


def b_find_match(rng, kinds, M, skills, level=2):
    cases = _find_cases(rng, kinds, M, 4)
    xs = [c[1] for c in cases]
    extra = next(v for v in pick_wrong(rng, xs[0], [xs[0] + 10, xs[1] + 1]) if v not in xs)
    return mk("matching", "Nối cho đúng.", "Nối mỗi phép tính với số thích hợp thay cho dấu ?.", level, 100, skills,
              "; ".join(f"{c[0]} → {fmt(c[1])}" for c in cases), [E(eq(*c[2])) for c in cases], "match",
              **MT(rng, [(c[0], fmt(c[1])) for c in cases], [fmt(extra)]))


def b_find_drag(rng, kinds, M, skills, level=2):
    cases = _find_cases(rng, kinds, M, 3)
    xs = [c[1] for c in cases]
    extra = next(v for v in pick_wrong(rng, xs[1], [xs[1] + 10, xs[2] + 1]) if v not in xs)
    tmpl = "\n".join(c[0].replace("?", "□") for c in cases)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số thích hợp vào mỗi ô trống.", level, 80, skills,
              "; ".join(fmt(x) for x in xs), [E(eq(*c[2])) for c in cases] + [T(f"Thẻ {fmt(extra)} là thẻ thừa.", "tip")],
              "drag", **DD(rng, tmpl, [fmt(x) for x in xs], [fmt(extra)]))


def b_find_word(rng, kind, M, skills, level=3, mode="fill"):
    if kind == "minuend":
        b = rnd(rng, max(3, M // 20), M // 3)
        d = rnd(rng, max(3, M // 20), M // 3)
        x = b + d
        prompt = f"Lan có một số nhãn vở. Lan cho bạn {fmt(b)} nhãn vở thì còn lại {fmt(d)} nhãn vở. Hỏi lúc đầu Lan có bao nhiêu nhãn vở?"
        lines = [("Số nhãn vở lúc đầu Lan có là:", eq(d, "+", b, "nhãn vở"))]
        tmpl, unit, ans, blk, hint = "Lúc đầu Lan có □ nhãn vở.", "nhãn vở", f"{fmt(x)} nhãn vở", (d, "+", b), "find_minuend"
    elif kind == "addend":
        s = rnd(rng, M // 3, M - 1)
        a = rnd(rng, M // 10, s - M // 20)
        x = s - a
        prompt = f"Hai thùng có tất cả {fmt(s)} l nước. Thùng thứ nhất có {fmt(a)} l nước. Hỏi thùng thứ hai có bao nhiêu lít nước?"
        lines = [("Số nước ở thùng thứ hai là:", eq(s, "-", a, "l"))]
        tmpl, unit, ans, blk, hint = "Thùng thứ hai có □ l nước.", "l", f"{fmt(x)} l nước", (s, "-", a), "find_addend"
    elif kind == "dividend":
        k = rnd(rng, 3, 9)
        q = rnd(rng, 3, 9)
        x = q * k
        prompt = f"Cô giáo chia đều một số quyển vở cho {k} bạn, mỗi bạn được {q} quyển. Hỏi cô giáo đã chia tất cả bao nhiêu quyển vở?"
        lines = [("Số quyển vở cô giáo đã chia là:", eq(q, "×", k, "quyển"))]
        tmpl, unit, ans, blk, hint = "Cô giáo đã chia □ quyển vở.", "quyển", f"{fmt(x)} quyển vở", (q, "×", k), "find_dividend"
    else:  # divisor / factor: số nhóm
        k = rnd(rng, 3, 9)
        q = rnd(rng, 3, 9)
        a = q * k
        x = q
        prompt = f"Mẹ xếp {a} cái bánh vào các hộp, mỗi hộp {k} cái. Hỏi mẹ xếp được bao nhiêu hộp bánh?"
        lines = [("Số hộp bánh mẹ xếp được là:", eq(a, ":", k, "hộp"))]
        tmpl, unit, ans, blk, hint = "Mẹ xếp được □ hộp bánh.", "hộp", f"{fmt(x)} hộp bánh", (a, ":", k), "find_factor"
    steps = [WP(lines, ans)] + ([column_block(*blk)] if needs_block(*blk) else [])
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 100, skills, ans, steps, hint, **FB(tmpl, [(x, unit)]))
    wrong = pick_wrong(rng, x, [abs(blk[0] - blk[2]) if blk[1] == "+" else blk[0] + blk[2]], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 100, skills, ans, steps, hint,
              **MC(rng, f"{fmt(x)} {unit}", [f"{fmt(w)} {unit}" for w in wrong]))


# ---------------------------------------------------------------------------
# Bảng nhân, bảng chia
# ---------------------------------------------------------------------------


def table_gen(ks):
    def gen(rng):
        k = rng.choice(ks)
        a = rnd(rng, 2, 10)
        f = rng.random()
        if f < 0.4:
            return (k, "×", a)
        if f < 0.6:
            return (a, "×", k)
        return (k * a, ":", k)
    return gen


def b_table_fill(rng, ks, skills, level=1):
    k = rng.choice(ks)
    a, b = rng.sample(range(2, 11), 2)
    tmpl = f"{k} × {a} = □\n{fmt(k * b)} : {k} = □"
    return mk("fill_blank", "Tính nhẩm.", f"{k} × {a} = ?\n{k * b} : {k} = ?", level, 30, skills, f"{k * a}; {b}",
              [E(eq(k, "×", a)), E(eq(k * b, ":", k)), T(f"Vì {k} × {b} = {k * b} nên {k * b} : {k} = {b}.", "tip")],
              "table_mul", **FB(tmpl, [k * a, b]))


def b_table_count(rng, k, skills, level=1):
    s = rnd(rng, 1, 4)
    seq = [k * i for i in range(s, s + 6)]
    blanks = sorted(rng.sample(range(1, 6), 2))
    tmpl = "; ".join("□" if i in blanks else str(v) for i, v in enumerate(seq))
    steps = [T(f"Đếm thêm {k}: " + "; ".join(map(str, seq)) + ".")] + [E(f"{seq[i - 1]} + {k} = {seq[i]}") for i in blanks]
    return mk("fill_blank", "Điền số thích hợp.", f"Đếm thêm {k} rồi điền số còn thiếu:", level, 40, skills,
              "; ".join(str(seq[i]) for i in blanks), steps, "sequence", **FB(tmpl, [seq[i] for i in blanks]))


def b_table_missing(rng, ks, skills, level=2):
    k = rng.choice(ks)
    a = rnd(rng, 2, 10)
    p = k * a
    wrong = pick_wrong(rng, a, [a + 1, a - 1, p - k], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Số thích hợp thay cho dấu ? là:\n{k} × ? = {p}", level, 40, skills,
              str(a), [T(H["find_factor"], "rule"), E(eq(p, ":", k)), T("Thử lại:"), E(eq(k, "×", a))], "find_factor",
              **MC(rng, str(a), [str(w) for w in wrong]))


# ---------------------------------------------------------------------------
# Một phần mấy
# ---------------------------------------------------------------------------
FRAC = {2: "hai", 3: "ba", 4: "tư", 5: "năm", 6: "sáu", 7: "bảy", 8: "tám", 9: "chín"}
FRAC_UNITS = ["", " kg", " cm", " l", " m"]


def b_frac_fill(rng, skills, level=1):
    k = rnd(rng, 2, 9)
    x = rnd(rng, 2, 10)
    n = k * x
    u = rng.choice(FRAC_UNITS)
    unit = u.strip() or None
    return mk("fill_blank", "Điền số thích hợp.", f"1/{k} của {n}{u} là bao nhiêu?", level, 40, skills, f"{x}{u}",
              [T(H["fraction"], "rule"), E(eq(n, ":", k)), T(f"Vậy 1/{k} của {n}{u} là {x}{u}.")], "fraction",
              speak=f"Một phần {FRAC[k]} của {n}{u} là bao nhiêu?", **FB(f"1/{k} của {n}{u} là □{u}.", [(x, unit) if unit else x]))


def b_frac_concept(rng, skills, level=1):
    k = rnd(rng, 3, 9)
    thing = rng.choice(["cái bánh", "tờ giấy", "quả dưa hấu", "thanh sô-cô-la"])
    right = f"1/{k}"
    wrong = [f"1/{k + 1}", f"1/{k - 1}", f"{k}"]
    return mk("multiple_choice", "Chọn đáp án đúng.",
              f"Chia đều một {thing} thành {k} phần bằng nhau. Bạn Na lấy 1 phần. Bạn Na đã lấy mấy phần của {thing}?",
              level, 40, skills, right, [T(f"Chia đều thành {k} phần bằng nhau, lấy 1 phần, tức là lấy 1/{k} {thing} (đọc là: một phần {FRAC[k]}).")],
              "fraction", **MC(rng, right, wrong))


def _frac_cases(rng, n):
    out, seen = [], set()
    while len(out) < n:
        k = rnd(rng, 2, 9)
        x = rnd(rng, 2, 10)
        if x in seen or (k, x) in {(c[0], c[1]) for c in out}:
            continue
        seen.add(x)
        out.append((k, x))
    return out


def b_frac_match(rng, skills, level=2):
    cases = _frac_cases(rng, 4)
    xs = [x for _, x in cases]
    extra = next(v for v in range(2, 30) if v not in xs and v not in {k * x for k, x in cases})
    return mk("matching", "Nối cho đúng.", "Nối mỗi ô bên trái với kết quả đúng.", level, 90, skills,
              "; ".join(f"1/{k} của {k * x} là {x}" for k, x in cases), [E(eq(k * x, ":", k)) for k, x in cases], "fraction",
              **MT(rng, [(f"1/{k} của {k * x}", str(x)) for k, x in cases], [str(extra)]))


def b_frac_drag(rng, skills, level=2):
    cases = _frac_cases(rng, 3)
    xs = [x for _, x in cases]
    extra = next(v for v in pick_wrong(rng, xs[0], [xs[0] + 1]) if v not in xs)
    tmpl = "\n".join(f"1/{k} của {k * x} là □" for k, x in cases)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống.", level, 70, skills,
              "; ".join(map(str, xs)), [E(eq(k * x, ":", k)) for k, x in cases], "fraction",
              **DD(rng, tmpl, [str(x) for x in xs], [str(extra)]))


FRAC_WORD = [
    lambda n, k: (f"Mẹ có {n} quả trứng. Mẹ dùng 1/{k} số trứng để làm bánh. Hỏi mẹ đã dùng bao nhiêu quả trứng?",
                  "Mẹ đã dùng □ quả trứng.", "Số trứng mẹ đã dùng là:", "quả", "quả trứng"),
    lambda n, k: (f"Một sợi dây dài {n} m. Bố cắt đi 1/{k} sợi dây. Hỏi bố đã cắt đi bao nhiêu mét dây?",
                  "Bố đã cắt đi □ m dây.", "Số mét dây bố đã cắt đi là:", "m", "m"),
    lambda n, k: (f"Lớp 3C có {n} học sinh, trong đó 1/{k} số học sinh tham gia câu lạc bộ cờ vua. Hỏi có bao nhiêu học sinh tham gia câu lạc bộ cờ vua?",
                  "Có □ học sinh tham gia.", "Số học sinh tham gia câu lạc bộ cờ vua là:", "học sinh", "học sinh"),
    lambda n, k: (f"Một cửa hàng có {n} kg gạo, đã bán được 1/{k} số gạo đó. Hỏi cửa hàng đã bán được bao nhiêu ki-lô-gam gạo?",
                  "Cửa hàng đã bán □ kg gạo.", "Số gạo cửa hàng đã bán là:", "kg", "kg gạo"),
]


def b_frac_word(rng, skills, level=2, mode="fill"):
    k = rnd(rng, 2, 6)
    x = rnd(rng, 3, 9)
    n = k * x
    prompt, tmpl, expl, unit, noun = rng.choice(FRAC_WORD)(n, k)
    ans = f"{x} {noun}"
    steps = [WP([(expl, eq(n, ":", k, unit))], ans)]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 80, skills, ans, steps, "fraction", **FB(tmpl, [(x, unit)]))
    wrong = pick_wrong(rng, x, [n - k, n - x, x + 1], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 80, skills, ans, steps, "fraction",
              **MC(rng, f"{x} {unit}", [f"{w} {unit}" for w in wrong]))


# ---------------------------------------------------------------------------
# Gấp, giảm một số lần; so sánh số lớn gấp mấy lần số bé
# ---------------------------------------------------------------------------


def _times_case(rng, up, big):
    k = rnd(rng, 2, 9)
    a = rnd(rng, 11, 49) if big else rnd(rng, 2, 10)
    if big and a * k > 99:
        a = rnd(rng, 11, 99 // k) if 99 // k >= 11 else rnd(rng, 2, 10)
    if up:
        return f"Gấp {a} lên {k} lần", a * k, (a, "×", k), "times_up"
    return f"Giảm {a * k} đi {k} lần", a, (a * k, ":", k), "times_down"


def b_times_fill(rng, up, skills, level=1, big=False):
    text, r, op, hint = _times_case(rng, up, big)
    return mk("fill_blank", "Điền số thích hợp.", f"{text} được bao nhiêu?", level, 40, skills, fmt(r),
              [T(H[hint], "rule")] + calc_steps(*op), hint, **FB(f"{text} được □.", [r]))


def b_times_mc(rng, up, skills, level=1, big=False):
    text, r, op, hint = _times_case(rng, up, big)
    a, _, k = op
    wrong = pick_wrong(rng, r, [a + k if up else a - k, r + k, r - 1], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"{text} được:", level, 40, skills, fmt(r),
              [T(H[hint], "rule")] + calc_steps(*op), hint, **MC(rng, fmt(r), [fmt(w) for w in wrong]))


def _times_cases(rng, n, mix_plain=False, big=False, dirs=(True, False)):
    out, seen = [], set()
    for _ in range(500):
        f = rng.random()
        if mix_plain and f < 0.4:
            k = rnd(rng, 2, 9)
            a = rnd(rng, 2, 10)
            if rng.random() < 0.5:
                case = (f"Thêm {k} vào {a}", a + k, (a, "+", k), "more_less")
            else:
                case = (f"Bớt {k} từ {a * k}", a * k - k, (a * k, "-", k), "more_less")
        else:
            case = _times_case(rng, rng.choice(dirs), big)
        if case[1] in seen or case[0] in {c[0] for c in out}:
            continue
        seen.add(case[1])
        out.append(case)
        if len(out) == n:
            return out
    raise RuntimeError("times cases")


def b_times_drag(rng, skills, level=2, big=False, dirs=(True, False)):
    cases = _times_cases(rng, 3, big=big, dirs=dirs)
    rs = [c[1] for c in cases]
    extra = next(v for v in pick_wrong(rng, rs[0], [rs[0] + 2]) if v not in rs)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống.", level, 70, skills,
              "; ".join(fmt(r) for r in rs), [E(eq(*c[2])) for c in cases], "drag",
              **DD(rng, "\n".join(f"{c[0]} được □" for c in cases), [fmt(r) for r in rs], [fmt(extra)]))


def b_times_match(rng, skills, level=2, dirs=(True, False)):
    cases = _times_cases(rng, 4, mix_plain=True, dirs=dirs)
    rs = [c[1] for c in cases]
    extra = next(v for v in pick_wrong(rng, rs[0], [rs[0] + 1]) if v not in rs)
    return mk("matching", "Nối cho đúng.", "Nối mỗi ô bên trái với kết quả đúng.", level, 90, skills,
              "; ".join(f"{c[0]} được {fmt(c[1])}" for c in cases),
              [E(eq(*c[2])) for c in cases] + [T("Gấp, giảm một số lần thì làm phép nhân, phép chia; thêm, bớt thì làm phép cộng, phép trừ.", "tip")],
              "match", **MT(rng, [(c[0], fmt(c[1])) for c in cases], [fmt(extra)]))


TIMES_UP_WORD = [
    lambda a, k: (f"Năm nay em {a} tuổi, tuổi bố gấp {k} lần tuổi em. Hỏi năm nay bố bao nhiêu tuổi?",
                  "Năm nay bố □ tuổi.", "Tuổi của bố năm nay là:", "tuổi", "tuổi"),
    lambda a, k: (f"Đoạn dây thứ nhất dài {a} cm, đoạn dây thứ hai dài gấp {k} lần đoạn dây thứ nhất. Hỏi đoạn dây thứ hai dài bao nhiêu xăng-ti-mét?",
                  "Đoạn dây thứ hai dài □ cm.", "Độ dài đoạn dây thứ hai là:", "cm", "cm"),
    lambda a, k: (f"Bao muối nặng {a} kg, bao gạo nặng gấp {k} lần bao muối. Hỏi bao gạo nặng bao nhiêu ki-lô-gam?",
                  "Bao gạo nặng □ kg.", "Bao gạo nặng là:", "kg", "kg"),
]
TIMES_DOWN_WORD = [
    lambda n, k: (f"Mẹ có {n} quả táo. Sau khi mẹ biếu bà, số táo của mẹ giảm đi {k} lần. Hỏi mẹ còn lại bao nhiêu quả táo?",
                  "Mẹ còn lại □ quả táo.", "Số táo mẹ còn lại là:", "quả", "quả táo"),
    lambda n, k: (f"Một cửa hàng có {n} l nước mắm. Sau một ngày bán hàng, số nước mắm giảm đi {k} lần. Hỏi cửa hàng còn lại bao nhiêu lít nước mắm?",
                  "Cửa hàng còn lại □ l nước mắm.", "Số nước mắm còn lại là:", "l", "l nước mắm"),
    lambda n, k: (f"Một tấm vải dài {n} m. Sau khi may áo, tấm vải giảm đi {k} lần. Hỏi tấm vải còn lại dài bao nhiêu mét?",
                  "Tấm vải còn lại dài □ m.", "Độ dài tấm vải còn lại là:", "m", "m"),
]


def b_times_word(rng, up, skills, level=2, mode="fill", big=False):
    k = rnd(rng, 2, 6) if big else rnd(rng, 3, 9)
    a = rnd(rng, 11, 99 // k) if big else rnd(rng, 3, 9)
    if up:
        prompt, tmpl, expl, unit, noun = rng.choice(TIMES_UP_WORD)(a, k)
        r, op, hint = a * k, (a, "×", k), "times_up"
    else:
        prompt, tmpl, expl, unit, noun = rng.choice(TIMES_DOWN_WORD)(a * k, k)
        r, op, hint = a, (a * k, ":", k), "times_down"
    ans = f"{fmt(r)} {noun}"
    steps = [WP([(expl, eq(*op, unit))], ans)] + ([column_block(*op)] if needs_block(*op) else [])
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 80, skills, ans, steps, hint, **FB(tmpl, [(r, unit)]))
    wrong = pick_wrong(rng, r, [op[0] + k if up else op[0] - k, r + k], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 80, skills, ans, steps, hint,
              **MC(rng, f"{fmt(r)} {unit}", [f"{fmt(w)} {unit}" for w in wrong]))


def b_times_chain(rng, skills, level=3):
    while True:
        a, k, m = rnd(rng, 2, 9), rnd(rng, 2, 9), rnd(rng, 2, 9)
        if (a * k) % m == 0 and m != k and a * k // m > 1:
            break
    x = a * k
    r = x // m
    return mk("fill_blank", "Điền số thích hợp.", f"Gấp {a} lên {k} lần rồi giảm đi {m} lần thì được bao nhiêu?", level, 70, skills,
              str(r), [E(eq(a, "×", k)), E(eq(x, ":", m)), E(f"{a} × {k} : {m} = {r}")], "times_down",
              **FB(f"Gấp {a} lên {k} lần rồi giảm đi {m} lần được □.", [r]))


def _ratio_case(rng):
    s = rnd(rng, 2, 9)
    k = rnd(rng, 2, 9)
    return s * k, s, k


def b_ratio_fill(rng, skills, level=1):
    b, s, k = _ratio_case(rng)
    return mk("fill_blank", "Điền số thích hợp.", f"Số lớn là {b}, số bé là {s}. Số lớn gấp mấy lần số bé?", level, 40, skills, f"{k} lần",
              [T(H["how_many_times"], "rule"), E(eq(b, ":", s)), T(f"Vậy {b} gấp {k} lần {s}.")], "how_many_times",
              **FB(f"Số lớn gấp □ lần số bé.", [(k, "lần")]))


def b_ratio_mc(rng, skills, level=1):
    b, s, k = _ratio_case(rng)
    wrong = pick_wrong(rng, k, [b - s, k + 1, k - 1], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Số {b} gấp mấy lần số {s}?", level, 40, skills, f"{k} lần",
              [T(H["how_many_times"], "rule"), E(eq(b, ":", s))], "how_many_times",
              **MC(rng, f"{k} lần", [f"{w} lần" for w in wrong]))


def _ratio_cases(rng, n):
    out = []
    while len(out) < n:
        c = _ratio_case(rng)
        if c[2] in {o[2] for o in out} or c[0] in {o[0] for o in out}:
            continue
        out.append(c)
    return out


def b_ratio_drag(rng, skills, level=2):
    cases = _ratio_cases(rng, 3)
    ks = [c[2] for c in cases]
    extra = next(v for v in range(2, 10) if v not in ks)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống.", level, 70, skills,
              "; ".join(map(str, ks)), [E(eq(b, ":", s)) for b, s, _ in cases], "how_many_times",
              **DD(rng, "\n".join(f"{b} gấp □ lần {s}" for b, s, _ in cases), [str(k) for k in ks], [str(extra)]))


def b_ratio_match(rng, skills, level=2):
    cases = _ratio_cases(rng, 4)
    ks = [c[2] for c in cases]
    extra = next(v for v in range(2, 10) if v not in ks)
    return mk("matching", "Nối cho đúng.", "Nối mỗi câu hỏi với câu trả lời đúng.", level, 90, skills,
              "; ".join(f"{b} gấp {k} lần {s}" for b, s, k in cases), [E(eq(b, ":", s)) for b, s, _ in cases], "how_many_times",
              **MT(rng, [(f"{b} gấp mấy lần {s}?", f"{k} lần") for b, s, k in cases], [f"{extra} lần"]))


RATIO_WORD = [
    lambda b, s: (f"Con gà nặng {s} kg, con ngỗng nặng {b} kg. Hỏi con ngỗng nặng gấp mấy lần con gà?", "Con ngỗng nặng gấp □ lần con gà."),
    lambda b, s: (f"Đoạn thẳng AB dài {b} cm, đoạn thẳng CD dài {s} cm. Hỏi đoạn thẳng AB dài gấp mấy lần đoạn thẳng CD?", "AB dài gấp □ lần CD."),
    lambda b, s: (f"Vườn nhà Hoa có {s} cây bưởi và {b} cây cam. Hỏi số cây cam gấp mấy lần số cây bưởi?", "Số cây cam gấp □ lần số cây bưởi."),
]


def b_ratio_word(rng, skills, level=2, mode="fill"):
    b, s, k = _ratio_case(rng)
    prompt, tmpl = rng.choice(RATIO_WORD)(b, s)
    steps = [WP([("Ta có:", eq(b, ":", s, "lần"))], f"{k} lần")]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 80, skills, f"{k} lần", steps, "how_many_times", **FB(tmpl, [(k, "lần")]))
    wrong = pick_wrong(rng, k, [b - s, k + 1], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 80, skills, f"{k} lần", steps, "how_many_times",
              **MC(rng, f"{k} lần", [f"{w} lần" for w in wrong]))


def b_ratio_two(rng, skills, level=3):
    b, s, k = _ratio_case(rng)
    return mk("fill_blank", "Điền số thích hợp.", f"So sánh số {b} với số {s}.", level, 70, skills, f"{k} lần; {b - s}",
              [E(eq(b, ":", s)), E(eq(b, "-", s)), T(f"Vậy {b} gấp {k} lần {s} và hơn {s} là {b - s} đơn vị.")], "how_many_times",
              **FB(f"Số {b} gấp □ lần số {s}.\nSố {b} hơn số {s} là □ đơn vị.", [(k, "lần"), b - s]))


def b_ratio_word2(rng, skills, level=3):
    s = rnd(rng, 3, 9)
    k = rnd(rng, 2, 6)
    b = s * k
    d = b - s
    prompt = f"Lan có {s} quyển truyện, Hùng có nhiều hơn Lan {d} quyển truyện. Hỏi số truyện của Hùng gấp mấy lần số truyện của Lan?"
    steps = [WP([("Số truyện của Hùng là:", eq(s, "+", d, "quyển")), ("Số truyện của Hùng gấp số truyện của Lan số lần là:", eq(b, ":", s, "lần"))], f"{k} lần")]
    return mk("fill_blank", "Giải bài toán.", prompt, level, 120, skills, f"{k} lần", steps, "two_step",
              **FB("Số truyện của Hùng gấp □ lần số truyện của Lan.", [(k, "lần")]))


# ---------------------------------------------------------------------------
# Phép chia hết, phép chia có dư
# ---------------------------------------------------------------------------


def b_rem_exact_mc(rng, skills, level=1):
    while True:
        k = rnd(rng, 3, 9)
        cases = []
        exact = rnd(rng, 2, 9) * k
        cases.append(exact)
        while len(cases) < 4:
            v = rnd(rng, 10, 9 * k)
            if v % k and v not in cases:
                cases.append(v)
        break
    texts = [f"{v} : {k}" for v in cases]
    steps = [T(f"{v} : {k} = {v // k} (dư {v % k})") for v in cases] + [T(f"Chỉ có phép chia {exact} : {k} có số dư là 0, nên đó là phép chia hết.")]
    return mk("multiple_choice", "Chọn đáp án đúng.", "Phép chia nào dưới đây là phép chia hết?", level, 60, skills, texts[0],
              steps, "remainder", **MC(rng, texts[0], texts[1:]))


def b_rem_max_mc(rng, skills, level=2):
    k = rnd(rng, 3, 9)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Trong phép chia cho {k}, số dư lớn nhất có thể là:", level, 40, skills, str(k - 1),
              [T(H["remainder"], "rule"), T(f"Số dư bé hơn {k} nên số dư lớn nhất là {k - 1}.")], "remainder",
              **MC(rng, str(k - 1), [str(k), str(k + 1), str(k - 2)]))


def b_rem_match(rng, skills, level=2):
    pairs, steps = [], []
    for r in range(4):
        while True:
            k = rnd(rng, 5, 9)
            q = rnd(rng, 2, 9)
            a = q * k + r
            if f"{a} : {k}" not in {p[0] for p in pairs}:
                break
        pairs.append((f"{a} : {k}", f"dư {r}"))
        steps.append(T(f"{a} : {k} = {q} (dư {r})"))
    rng.shuffle(pairs)
    return mk("matching", "Nối phép chia với số dư.", "Nối mỗi phép chia với số dư của nó.", level, 100, skills,
              "; ".join(f"{l} → {r}" for l, r in pairs), steps, "remainder", **MT(rng, pairs, ["dư 4"]))


def b_rem_drag(rng, skills, level=2):
    for _ in range(500):
        cs = []
        for _ in range(2):
            k = rnd(rng, 3, 9)
            q = rnd(rng, 3, 12)
            r = rnd(rng, 1, k - 1)
            cs.append((q * k + r, k, q, r))
        vals = [v for c in cs for v in (c[2], c[3])]
        if len(set(vals)) == 4:
            break
    extra = next(v for v in range(1, 20) if v not in vals)
    tmpl = "\n".join(f"{a} : {k} = □ (dư □)" for a, k, _, _ in cs)
    steps = [T(f"{a} : {k} = {q} (dư {r})") for a, k, q, r in cs] + [E(f"{q} × {k} + {r} = {a}") for a, k, q, r in cs]
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống.", level, 90, skills,
              "; ".join(f"{q} (dư {r})" for _, _, q, r in cs), steps, "remainder",
              **DD(rng, tmpl, [str(v) for v in vals], [str(extra)]))


def b_rem_word(rng, skills, level=3, ceil=False):
    k = rnd(rng, 2, 6)
    q = rnd(rng, 5, 15)
    r = rnd(rng, 1, k - 1)
    a = q * k + r
    if ceil:
        prompt = f"Lớp 3D có {a} học sinh, mỗi bàn ngồi {k} bạn. Hỏi cần ít nhất bao nhiêu cái bàn để tất cả các bạn đều có chỗ ngồi?"
        lines = [(f"Ta có {a} : {k} = {q} (dư {r}). Còn {r} bạn chưa có chỗ nên cần thêm 1 bàn nữa. Số bàn cần có ít nhất là:", f"{q} + 1 = {q + 1} (cái bàn)")]
        steps = [long_div(a, k), WP(lines, f"{q + 1} cái bàn")]
        return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 120, skills, f"{q + 1} cái bàn", steps, "remainder",
                  **MC(rng, f"{q + 1} cái bàn", [f"{q} cái bàn", f"{q + 2} cái bàn", f"{r} cái bàn" if r not in (q, q + 1, q + 2) else f"{q + 3} cái bàn"]))
    prompt = f"Có {a} quả cam, xếp vào các đĩa, mỗi đĩa {k} quả. Hỏi xếp được nhiều nhất bao nhiêu đĩa và còn thừa mấy quả cam?"
    steps = [long_div(a, k), WP([(f"Thực hiện phép chia {a} : {k} = {q} (dư {r}). Thử lại:", f"{q} × {k} + {r} = {a} (quả)")],
                                f"{q} đĩa, thừa {r} quả cam")]
    return mk("fill_blank", "Giải bài toán.", prompt, level, 120, skills, f"{q} đĩa, thừa {r} quả cam", steps, "remainder",
              **FB("Xếp được nhiều nhất □ đĩa, còn thừa □ quả cam.", [(q, "đĩa"), (r, "quả")]))


def b_rem_find_dividend(rng, skills, level=3):
    k = rnd(rng, 3, 9)
    q = rnd(rng, 4, 12)
    r = rnd(rng, 1, k - 1)
    a = q * k + r
    return mk("fill_blank", "Điền số thích hợp.", f"Trong một phép chia có dư, số chia là {k}, thương là {q} và số dư là {r}. Tìm số bị chia.",
              level, 80, skills, str(a), [T("Số bị chia bằng thương nhân với số chia rồi cộng với số dư."), E(f"{q} × {k} + {r} = {a}")],
              "remainder", **FB("Số bị chia là □.", [a]))


# ---------------------------------------------------------------------------
# Biểu thức số
# ---------------------------------------------------------------------------


def expr_case(rng, form):
    """-> (biểu thức, giá trị, dòng tính 'bt = bước = kq', giá trị nếu tính sai thứ tự)"""
    for _ in range(1000):
        if form == "addsub":
            a, b, c = rnd(rng, 100, 600), rnd(rng, 20, 300), rnd(rng, 10, 200)
            if rng.random() < 0.5:
                x = a + b
                r = x - c
                e = f"{a} + {b} - {c}"
            else:
                x = a - b
                r = x + c
                e = f"{a} - {b} + {c}"
            if x <= 0 or r <= 0 or r >= 1000 or x >= 1000:
                continue
            return e, r, f"{e} = {fmt(x)} {e.split()[3]} {c} = {fmt(r)}", None
        if form == "muldiv":
            a, b = rnd(rng, 2, 9), rnd(rng, 2, 9)
            if rng.random() < 0.5:
                c = rnd(rng, 2, 9)
                x = a * b
                if x % c:
                    continue
                r = x // c
                e = f"{a} × {b} : {c}"
            else:
                c = rnd(rng, 2, 9)
                n = a * b
                x = n // a
                r = x * c
                e = f"{n} : {a} × {c}"
            return e, r, f"{e} = {x} {'×' if ':' in e.split()[1] else ':'} {c} = {r}", None
        if form == "mixed":
            f = rnd(rng, 0, 3)
            if f == 0:
                a, b, c = rnd(rng, 20, 400), rnd(rng, 11, 60), rnd(rng, 2, 9)
                x = b * c
                r = a + x
                e, step, wrong = f"{a} + {b} × {c}", f"{a} + {x}", (a + b) * c
            elif f == 1:
                b, c = rnd(rng, 11, 50), rnd(rng, 2, 9)
                x = b * c
                a = rnd(rng, x + 10, x + 400)
                r = a - x
                e, step, wrong = f"{a} - {b} × {c}", f"{a} - {x}", (a - b) * c
            elif f == 2:
                c, q = rnd(rng, 2, 9), rnd(rng, 11, 60)
                b = c * q
                a = rnd(rng, 20, 300)
                r = a + q
                e, step, wrong = f"{a} + {b} : {c}", f"{a} + {q}", (a + b) // c if (a + b) % c == 0 else None
            else:
                b, c = rnd(rng, 11, 90), rnd(rng, 2, 9)
                a = rnd(rng, 10, 200)
                x = b * c
                r = x - a
                if r <= 0:
                    continue
                e, step, wrong = f"{b} × {c} - {a}", f"{x} - {a}", None
            if r >= 1000:
                continue
            return e, r, f"{e} = {step} = {fmt(r)}", wrong
        if form == "paren":
            f = rnd(rng, 0, 3)
            if f == 0:
                a, b, c = rnd(rng, 11, 80), rnd(rng, 11, 80), rnd(rng, 2, 9)
                s = a + b
                r = s * c
                e, step, wrong = f"({a} + {b}) × {c}", f"{s} × {c}", a + b * c
            elif f == 1:
                c, q = rnd(rng, 2, 9), rnd(rng, 5, 40)
                s = c * q
                a = rnd(rng, 10, s - 5)
                b = s - a
                r = q
                e, step, wrong = f"({a} + {b}) : {c}", f"{s} : {c}", a + b // c if b % c == 0 else None
            elif f == 2:
                a = rnd(rng, 100, 900)
                b, c = rnd(rng, 20, 200), rnd(rng, 10, 150)
                s = b + c
                r = a - s
                if r <= 0:
                    continue
                e, step, wrong = f"{a} - ({b} + {c})", f"{a} - {s}", a - b + c
            else:
                c = rnd(rng, 2, 9)
                b = rnd(rng, 20, 100)
                s_ = rnd(rng, 11, 99)
                a = b + s_
                r = s_ * c
                e, step, wrong = f"({a} - {b}) × {c}", f"{s_} × {c}", a - b * c if a - b * c > 0 else None
            if r >= 1000 or r <= 0:
                continue
            return e, r, f"{e} = {step} = {fmt(r)}", wrong
    raise RuntimeError(form)


EXPR_HINT = {"addsub": "expr_ltr", "muldiv": "expr_ltr", "mixed": "expr_order", "paren": "expr_paren"}


def b_expr_fill(rng, form, skills, level=1):
    e, r, chain, _ = expr_case(rng, form)
    return mk("fill_blank", "Tính giá trị của biểu thức.", f"{e} = ?", level, 60, skills, fmt(r), [E(chain)], EXPR_HINT[form],
              **FB(f"{e} = □", [r]))


def b_expr_mc(rng, form, skills, level=2):
    while True:
        e, r, chain, wrong = expr_case(rng, form)
        if wrong and wrong > 0 and wrong != r:
            break
    w = pick_wrong(rng, r, [wrong, r + 10, r - 10], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Giá trị của biểu thức {e} là:", level, 70, skills, fmt(r),
              [E(chain), T(H[EXPR_HINT[form]], "tip")], EXPR_HINT[form], **MC(rng, fmt(r), [fmt(x) for x in w]))


def _expr_cases(rng, forms, n):
    out = []
    for _ in range(500):
        c = expr_case(rng, rng.choice(forms))
        if c[1] in {o[1] for o in out}:
            continue
        out.append(c)
        if len(out) == n:
            return out
    raise RuntimeError("expr cases")


def b_expr_match(rng, forms, skills, level=2):
    cases = _expr_cases(rng, forms, 4)
    rs = [c[1] for c in cases]
    extra = next(v for v in pick_wrong(rng, rs[0], [c[3] for c in cases if c[3]] + [rs[0] + 10]) if v not in rs)
    return mk("matching", "Nối biểu thức với giá trị.", "Nối mỗi biểu thức với giá trị của nó.", level, 120, skills,
              "; ".join(f"{c[0]} = {fmt(c[1])}" for c in cases), [E(c[2]) for c in cases], "match",
              **MT(rng, [(c[0], fmt(c[1])) for c in cases], [fmt(extra)]))


def b_expr_drag(rng, forms, skills, level=2):
    cases = _expr_cases(rng, forms, 3)
    rs = [c[1] for c in cases]
    extra = next(v for v in pick_wrong(rng, rs[1], [c[3] for c in cases if c[3]] + [rs[1] + 10]) if v not in rs)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo giá trị đúng vào sau mỗi biểu thức.", level, 100, skills,
              "; ".join(fmt(r) for r in rs), [E(c[2]) for c in cases], "drag",
              **DD(rng, "\n".join(f"{c[0]} = □" for c in cases), [fmt(r) for r in rs], [fmt(extra)]))


def b_expr_compare(rng, skills, level=3):
    while True:
        a, b, c = rnd(rng, 11, 60), rnd(rng, 11, 40), rnd(rng, 2, 9)
        e1, e2 = f"{a} + {b} × {c}", f"({a} + {b}) × {c}"
        v1, v2 = a + b * c, (a + b) * c
        if v2 < 1000:
            break
    if rng.random() < 0.5:
        e1, e2, v1, v2 = e2, e1, v2, v1
    sign = ">" if v1 > v2 else "<" if v1 < v2 else "="
    steps = [E(f"{e1} = {v1}"), E(f"{e2} = {v2}"), T(f"Vì {v1} {sign} {v2} nên {e1} {sign} {e2}.")]
    return mk("multiple_choice", "Chọn dấu thích hợp.", f"{e1} ... {e2}", level, 90, skills, sign, steps, "expr_paren",
              **MC(rng, sign, [s for s in "<>=" if s != sign]))


def b_expr_extreme(rng, forms, skills, level=3):
    cases = _expr_cases(rng, forms, 4)
    rs = [c[1] for c in cases]
    i = rs.index(max(rs))
    return mk("multiple_choice", "Chọn đáp án đúng.", "Biểu thức nào có giá trị lớn nhất?", level, 120, skills,
              f"{cases[i][0]} (bằng {fmt(rs[i])})", [E(c[2]) for c in cases] + [T(f"Giá trị lớn nhất là {fmt(rs[i])}.")], "expr_order",
              **MC(rng, cases[i][0], [c[0] for j, c in enumerate(cases) if j != i]))


def b_expr_word(rng, skills, level=3, paren=False):
    if paren:
        k = rnd(rng, 2, 6)
        q = rnd(rng, 4, 9)
        s = k * q
        a = rnd(rng, s // 3, s - s // 3)
        b = s - a
        prompt = f"Lớp 3A có {a} bạn nam và {b} bạn nữ. Cô giáo chia đều cả lớp thành {k} nhóm. Hỏi mỗi nhóm có bao nhiêu bạn?"
        line = ("Số bạn trong mỗi nhóm là:", f"({a} + {b}) : {k} = {q} (bạn)")
        tmpl, unit, ans = "Mỗi nhóm có □ bạn.", "bạn", f"{q} bạn"
        r, wrong = q, a + b // k if b % k == 0 else s
    else:
        n, k, m = rnd(rng, 3, 9), rnd(rng, 12, 30), rnd(rng, 10, 60)
        r = k * n + m
        prompt = f"Mẹ mua {n} gói kẹo, mỗi gói có {k} cái kẹo, và mua thêm {m} cái bánh. Hỏi mẹ đã mua tất cả bao nhiêu cái kẹo và bánh?"
        line = ("Số kẹo và bánh mẹ đã mua là:", f"{k} × {n} + {m} = {r} (cái)")
        tmpl, unit, ans = "Mẹ đã mua tất cả □ cái kẹo và bánh.", "cái", f"{r} cái kẹo và bánh"
        wrong = k * (n + m)
    steps = [WP([line], ans), T("Ta có thể viết gộp thành một biểu thức rồi tính giá trị của biểu thức đó.", "tip")]
    return mk("fill_blank", "Giải bài toán.", prompt, level, 120, skills, ans, steps, "expr_paren" if paren else "expr_order",
              **FB(tmpl, [(r, unit)]))

# ---------------------------------------------------------------------------
# Đọc, viết, so sánh số; làm tròn; số La Mã
# ---------------------------------------------------------------------------
PLACE = ["đơn vị", "chục", "trăm", "nghìn", "chục nghìn", "trăm nghìn"]


def expand(n: int) -> str:
    s = str(n)
    parts = [int(ch) * 10 ** (len(s) - 1 - i) for i, ch in enumerate(s) if ch != "0"]
    return " + ".join(fmt(p) for p in parts)


def near_numbers(rng, n, d):
    """Các số dễ nhầm với n (cùng số chữ số)."""
    s = str(n)
    out = []
    for i in range(len(s) - 1):
        t = s[:i] + s[i + 1] + s[i] + s[i + 2:]
        if t[0] != "0" and t != s:
            out.append(int(t))
    if "0" in s[1:]:
        i = s.index("0", 1)
        for j in range(1, len(s)):
            if s[j] != "0":
                t = list(s)
                t[i], t[j] = t[j], t[i]
                out.append(int("".join(t)))
    for delta in (10 ** (d - 2), 10 ** (d - 3) if d >= 3 else 1, -(10 ** (d - 2))):
        out.append(n + delta)
    out = [x for x in dict.fromkeys(out) if x != n and len(str(x)) == d]
    rng.shuffle(out)
    return out


def b_num_read_mc(rng, d, skills, level=1):
    n = n_digits(rng, d, zeros=True)
    wrong = near_numbers(rng, n, d)[:3]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Số “{words(n)}” viết là:", level, 40, skills, fmt(n),
              [T(f"“{words(n)}” viết là {fmt(n)}."), E(f"{fmt(n)} = {expand(n)}")], "read_number",
              **MC(rng, fmt(n), [fmt(w) for w in wrong]))


def b_num_words_mc(rng, d, skills, level=1):
    n = n_digits(rng, d, zeros=True)
    wrong = near_numbers(rng, n, d)[:3]
    return mk("multiple_choice", "Chọn cách đọc đúng.", f"Số {fmt(n)} đọc là:", level, 40, skills, words(n),
              [T(f"{fmt(n)} đọc là: {words(n)}.")], "read_number", **MC(rng, words(n), [words(w) for w in wrong]))


def b_num_place_fill(rng, d, skills, level=1):
    n = n_digits(rng, d, zeros=rng.random() < 0.5)
    names = PLACE[:d][::-1]
    tmpl = f"Số {fmt(n)} gồm " + ", ".join(f"□ {nm}" for nm in names[:-1]) + f" và □ {names[-1]}."
    vals = [int(c) for c in str(n)]
    return mk("fill_blank", "Điền số thích hợp.", f"Số {fmt(n)} gồm mấy {names[0]}, mấy {names[1]}, ...?", level, 50, skills,
              ", ".join(f"{v} {nm}" for v, nm in zip(vals, names)), [E(f"{fmt(n)} = {expand(n)}")], "place_value",
              **FB(tmpl, vals))


def b_num_compose_fill(rng, d, skills, level=1):
    n = n_digits(rng, d, zeros=True)
    names = PLACE[:d][::-1]
    desc = ", ".join(f"{c} {nm}" for c, nm in zip(str(n)[:-1], names[:-1])) + f" và {str(n)[-1]} {names[-1]}"
    return mk("fill_blank", "Viết số thích hợp.", f"Số gồm {desc} viết là:", level, 50, skills, fmt(n),
              [E(f"{expand(n)} = {fmt(n)}")], "place_value", **FB(f"Số gồm {desc} viết là □.", [n]))


def b_num_next_fill(rng, d, skills, level=1):
    pool = [n_digits(rng, d), 10 ** d - 10 ** (d - 1) * rnd(rng, 1, 5), int("9" * (d - 1)) * 10 + rnd(rng, 0, 9) if d > 1 else 9]
    n = rng.choice(pool)
    n = max(n, 10 ** (d - 1) + 1)
    if d == 5 and n + 1 > 100000:
        n = 99998
    return mk("fill_blank", "Điền số thích hợp.", f"Tìm số liền trước và số liền sau của số {fmt(n)}.", level, 40, skills,
              f"{fmt(n - 1)}; {fmt(n + 1)}", [E(f"{fmt(n)} - 1 = {fmt(n - 1)}"), E(f"{fmt(n)} + 1 = {fmt(n + 1)}")], "next_number",
              **FB(f"Số liền trước của {fmt(n)} là □.\nSố liền sau của {fmt(n)} là □.", [n - 1, n + 1]))


def compare_text(a, b):
    sign = ">" if a > b else "<" if a < b else "="
    if len(str(a)) != len(str(b)):
        why = "Số nào có nhiều chữ số hơn thì lớn hơn."
    elif a == b:
        why = "Hai số có các chữ số ở từng hàng đều giống nhau."
    else:
        sa, sb = str(a), str(b)
        i = next(i for i in range(len(sa)) if sa[i] != sb[i])
        place = PLACE[len(sa) - 1 - i]
        why = f"Hai số có cùng {len(sa)} chữ số. So sánh từ hàng cao nhất, đến hàng {place} có {sa[i]} {'>' if sa[i] > sb[i] else '<'} {sb[i]}."
    return sign, f"{why} Vậy {fmt(a)} {sign} {fmt(b)}."


def b_num_compare_mc(rng, d, skills, level=1, d2=None):
    a = n_digits(rng, d)
    if d2 and d2 != d:
        b = n_digits(rng, d2)
    else:
        s = list(str(a))
        i = rnd(rng, 1, d - 1)
        s[i] = str((int(s[i]) + rnd(rng, 1, 8)) % 10)
        b = int("".join(s))
        if rng.random() < 0.12:
            b = a
    if rng.random() < 0.5:
        a, b = b, a
    sign, why = compare_text(a, b)
    return mk("multiple_choice", "Chọn dấu thích hợp.", f"{fmt(a)} ... {fmt(b)}", level, 30, skills, sign, [T(why)], "compare",
              **MC(rng, sign, [s for s in "<>=" if s != sign]))


def _close_set(rng, d, n=4):
    base = n_digits(rng, d)
    out = {base}
    while len(out) < n:
        s = list(str(base))
        for _ in range(rnd(rng, 1, 2)):
            i = rnd(rng, 1, d - 1)
            s[i] = str(rnd(rng, 0, 9))
        v = int("".join(s))
        out.add(v)
    return list(out)


def b_num_extreme_mc(rng, d, skills, level=2, largest=True):
    nums = _close_set(rng, d)
    best = max(nums) if largest else min(nums)
    word = "lớn nhất" if largest else "bé nhất"
    srt = sorted(nums)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Số {word} trong các số {', '.join(fmt(x) for x in nums)} là:", level, 50,
              skills, fmt(best), [T("Xếp các số theo thứ tự từ bé đến lớn: " + " < ".join(fmt(x) for x in srt) + "."),
                                  T(f"Vậy số {word} là {fmt(best)}.")], "compare",
              **MC(rng, fmt(best), [fmt(x) for x in nums if x != best]))


def b_num_order_drag(rng, d, skills, level=2):
    nums = _close_set(rng, d)
    srt = sorted(nums)
    return mk("drag_drop", "Xếp theo thứ tự từ bé đến lớn.", "Kéo các số vào ô trống theo thứ tự từ bé đến lớn: " + ", ".join(fmt(x) for x in nums) + ".",
              level, 70, skills, " < ".join(fmt(x) for x in srt), [T("Ta có: " + " < ".join(fmt(x) for x in srt) + ".")], "order",
              **DD(rng, " < ".join(["□"] * len(srt)), [fmt(x) for x in srt]))


def b_num_match_words(rng, d, skills, level=2):
    nums = []
    while len(nums) < 4:
        v = n_digits(rng, d, zeros=rng.random() < 0.5)
        if v not in nums:
            nums.append(v)
    extra = next(x for x in near_numbers(rng, nums[0], d) if x not in nums)
    return mk("matching", "Nối số với cách đọc.", "Nối mỗi số với cách đọc đúng của số đó.", level, 100, skills,
              "; ".join(f"{fmt(n)}: {words(n)}" for n in nums), [T(f"{fmt(n)}: {words(n)}.") for n in nums], "read_number",
              **MT(rng, [(fmt(n), words(n)) for n in nums], [words(extra)]))


def b_num_seq(rng, d, skills, level=2, mode="fill"):
    step = rng.choice([10 ** (d - 3), 10 ** (d - 2), 10 ** (d - 1)] if d >= 3 else [1, 10])
    start = n_digits(rng, d)
    start -= start % step
    seq = [start + i * step for i in range(6)]
    if seq[-1] >= 10 ** d and not (d == 5 and seq[-1] <= 100000):
        start = 10 ** (d - 1) + step * rnd(rng, 0, 3)
        seq = [start + i * step for i in range(6)]
    blanks = sorted(rng.sample(range(1, 6), 2 if mode == "fill" else 3))
    tmpl = "; ".join("□" if i in blanks else fmt(v) for i, v in enumerate(seq))
    steps = [T(f"Hai số liền nhau hơn kém nhau {fmt(step)} đơn vị: " + "; ".join(fmt(v) for v in seq) + ".")]
    vals = [seq[i] for i in blanks]
    if mode == "fill":
        return mk("fill_blank", "Điền số thích hợp.", "Viết số thích hợp vào chỗ trống:", level, 60, skills,
                  "; ".join(fmt(v) for v in vals), steps, "sequence", **FB(tmpl, vals))
    extra = next(v for v in (vals[0] + step // 10 if step >= 10 else vals[0] + 2, vals[-1] + step) if v not in seq)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số thích hợp vào chỗ trống trong dãy số:", level, 70, skills,
              "; ".join(fmt(v) for v in vals), steps, "sequence", **DD(rng, tmpl, [fmt(v) for v in vals], [fmt(extra)]))


def b_num_digits(rng, d, skills, level=3):
    while True:
        ds = rng.sample(range(10), d)
        if 0 in ds and any(x != 0 for x in ds):
            break
    big = int("".join(map(str, sorted(ds, reverse=True))))
    rest = sorted(ds)
    first = next(x for x in rest if x != 0)
    rest.remove(first)
    small = int(str(first) + "".join(map(str, rest)))
    lst = ", ".join(map(str, ds))
    return mk("fill_blank", "Điền số thích hợp.", f"Dùng cả {d} chữ số {lst}, mỗi chữ số một lần, để viết số có {d} chữ số.", level, 100, skills,
              f"{fmt(big)}; {fmt(small)}",
              [T(f"Số lớn nhất: xếp các chữ số từ lớn đến bé → {fmt(big)}."),
               T(f"Số bé nhất: chữ số 0 không đứng đầu, nên chữ số đầu là {first} → {fmt(small)}.")], "place_value",
              **FB("Số lớn nhất là □.\nSố bé nhất là □.", [big, small]))


def b_num_expand_mc(rng, d, skills, level=2):
    n = n_digits(rng, d, zeros=True)
    wrong = [expand(x) for x in near_numbers(rng, n, d)[:3]]
    right = expand(n)
    wrong = [w for w in dict.fromkeys(wrong) if w != right][:3]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Số {fmt(n)} viết thành tổng là:", level, 50, skills, right,
              [E(f"{fmt(n)} = {right}")], "place_value", **MC(rng, right, wrong))


def b_num_extreme_fill(rng, d, skills, level=2):
    big, small = 10 ** d - 1, 10 ** (d - 1)
    return mk("fill_blank", "Điền số thích hợp.", f"Tìm số lớn nhất và số bé nhất có {d} chữ số.", level, 50, skills,
              f"{fmt(big)}; {fmt(small)}", [T(f"Số lớn nhất có {d} chữ số là {fmt(big)}; số bé nhất có {d} chữ số là {fmt(small)}."),
                                            E(f"{fmt(big)} + 1 = {fmt(big + 1)}")], "place_value",
              **FB(f"Số lớn nhất có {d} chữ số là □.\nSố bé nhất có {d} chữ số là □.", [big, small]))


def b_num_compare_word(rng, d, skills, level=3):
    nums = _close_set(rng, d, 3)
    names = rng.sample(["An", "Bình", "Chi", "Dũng", "Hà", "Minh"], 3)
    ctx = rng.choice([("cầu", "dài", "m", "Cây cầu", "dài nhất"), ("ngọn núi", "cao", "m", "Ngọn núi", "cao nhất")])
    if ctx[0] == "cầu":
        labels = [f"Cầu {n}" for n in ["Sông Hồng", "Sông Mã", "Sông Lam"]]
    else:
        labels = [f"Núi {n}" for n in ["Xanh", "Đá", "Mây"]]
    del names
    best = max(nums)
    i = nums.index(best)
    prompt = "\n".join([f"{ctx[3]} nào {ctx[4]}?"] + [f"{l}: {ctx[1]} {fmt(v)} {ctx[2]}" for l, v in zip(labels, nums)])
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 80, skills, labels[i],
              [T("So sánh: " + " < ".join(fmt(x) for x in sorted(nums)) + "."), T(f"Vậy {labels[i]} {ctx[4]}.")], "compare",
              **MC(rng, labels[i], [l for j, l in enumerate(labels) if j != i]))


def round_to(n, base):
    return (n + base // 2) // base * base


ROUND_NAME = {10: "chục", 100: "trăm", 1000: "nghìn", 10000: "chục nghìn"}


def round_steps(n, base):
    d = digit(n, len(str(base)) - 2)
    r = round_to(n, base)
    lower = PLACE[len(str(base)) - 2]
    how = "bé hơn 5 nên làm tròn xuống" if d < 5 else "lớn hơn hoặc bằng 5 nên làm tròn lên"
    return [T(f"Chữ số hàng {lower} của {fmt(n)} là {d}, {how}."), T(f"Làm tròn {fmt(n)} đến hàng {ROUND_NAME[base]} được {fmt(r)}.")]


def _round_num(rng, d, base):
    while True:
        n = n_digits(rng, d)
        if n % base and round_to(n, base) <= (100000 if d == 5 else 10 ** d):
            return n


def b_round_fill(rng, d, base, skills, level=1):
    n = _round_num(rng, d, base)
    r = round_to(n, base)
    return mk("fill_blank", "Điền số thích hợp.", f"Làm tròn số {fmt(n)} đến hàng {ROUND_NAME[base]}.", level, 40, skills, fmt(r),
              round_steps(n, base), "rounding", **FB(f"Làm tròn số {fmt(n)} đến hàng {ROUND_NAME[base]} ta được số □.", [r]))


def b_round_mc(rng, d, base, skills, level=2):
    n = _round_num(rng, d, base)
    r = round_to(n, base)
    down = n - n % base
    wrong = pick_wrong(rng, r, [down if down != r else down + base, r + base, round_to(n, base // 10) if base >= 100 else r - base], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Làm tròn số {fmt(n)} đến hàng {ROUND_NAME[base]} ta được số:", level, 50, skills,
              fmt(r), round_steps(n, base), "rounding", **MC(rng, fmt(r), [fmt(w) for w in wrong]))


def _round_cases(rng, d, bases, n):
    out = []
    for _ in range(500):
        base = rng.choice(bases)
        x = _round_num(rng, d, base)
        r = round_to(x, base)
        if r in {o[2] for o in out}:
            continue
        out.append((x, base, r))
        if len(out) == n:
            return out
    raise RuntimeError("round")


def _round_extra(cs):
    x, b, r = cs[0]
    for v in (x - x % b, r + b, r - b, r + 2 * b, r - 2 * b, r + 3 * b, r + 4 * b):
        if v > 0 and v not in {c[2] for c in cs}:
            return v
    raise RuntimeError("round extra")


def b_round_match(rng, d, bases, skills, level=2):
    cs = _round_cases(rng, d, bases, 4)
    extra = _round_extra(cs)
    pairs = [(f"{fmt(x)} (làm tròn đến hàng {ROUND_NAME[b]})", fmt(r)) for x, b, r in cs]
    return mk("matching", "Nối cho đúng.", "Nối mỗi số với số làm tròn của nó.", level, 100, skills,
              "; ".join(f"{l} → {r}" for l, r in pairs), [st for x, b, _ in cs for st in round_steps(x, b)[1:]], "rounding",
              **MT(rng, pairs, [fmt(extra)]))


def b_round_drag(rng, d, bases, skills, level=2):
    cs = _round_cases(rng, d, bases, 3)
    rs = [c[2] for c in cs]
    extra = _round_extra(cs)
    tmpl = "\n".join(f"Làm tròn {fmt(x)} đến hàng {ROUND_NAME[b]}: □" for x, b, _ in cs)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo số làm tròn đúng vào mỗi ô trống.", level, 90, skills,
              "; ".join(fmt(r) for r in rs), [st for x, b, _ in cs for st in round_steps(x, b)[1:]], "rounding",
              **DD(rng, tmpl, [fmt(r) for r in rs], [fmt(extra)]))


ROUND_WORD = [
    lambda n, b: (f"Quãng đường từ nhà bác Ba đến thị trấn dài {fmt(n)} m. Làm tròn số đo đó đến hàng {ROUND_NAME[b]} thì quãng đường dài khoảng bao nhiêu mét?",
                  "Quãng đường dài khoảng □ m.", "m"),
    lambda n, b: (f"Một trang trại nuôi {fmt(n)} con gà. Làm tròn số đó đến hàng {ROUND_NAME[b]} thì trang trại nuôi khoảng bao nhiêu con gà?",
                  "Trang trại nuôi khoảng □ con gà.", "con"),
    lambda n, b: (f"Sân vận động có {fmt(n)} khán giả đến xem bóng đá. Làm tròn số đó đến hàng {ROUND_NAME[b]} thì có khoảng bao nhiêu khán giả?",
                  "Có khoảng □ khán giả.", "khán giả"),
]


def b_round_word(rng, d, base, skills, level=3, mode="fill"):
    n = _round_num(rng, d, base)
    r = round_to(n, base)
    prompt, tmpl, unit = rng.choice(ROUND_WORD)(n, base)
    if mode == "fill":
        return mk("fill_blank", "Điền số thích hợp.", prompt, level, 70, skills, f"{fmt(r)} {unit}", round_steps(n, base), "rounding",
                  **FB(tmpl, [(r, unit)]))
    down = n - n % base
    wrong = pick_wrong(rng, r, [down if down != r else down + base, r + base, n], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 70, skills, f"{fmt(r)} {unit}", round_steps(n, base), "rounding",
              **MC(rng, f"{fmt(r)} {unit}", [f"{fmt(w)} {unit}" for w in wrong]))


def roman_wrong(v):
    out = []
    r = roman(v)
    if "IV" in r:
        out.append(r.replace("IV", "VI"))
    if "IX" in r:
        out.append(r.replace("IX", "XI"))
    for w in (v + 1, v - 1, v + 2, v + 5, v - 5, v + 10):
        if 1 <= w <= 20:
            out.append(roman(w))
    return [x for x in dict.fromkeys(out) if x != r]


def b_roman_value_mc(rng, skills, level=1):
    v = rng.choice([4, 6, 9, 11, 12, 14, 15, 16, 19, 20])
    r = roman(v)
    cands = [w for w in (v + 2 if "IV" in r or "IX" in r else v + 1, v - 1, v + 5, v - 5, v + 10) if 1 <= w <= 30 and w != v]
    if "IV" in r:
        cands.insert(0, v + 2)
    if "IX" in r:
        cands.insert(0, v + 2)
    wrong = list(dict.fromkeys(cands))[:3]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Số La Mã {r} có giá trị là:", level, 40, skills, str(v),
              [T(f"{r} = {v}.")], "roman", **MC(rng, str(v), [str(w) for w in wrong]))


def b_roman_write_mc(rng, skills, level=1):
    v = rng.choice([3, 4, 7, 8, 9, 11, 13, 14, 17, 18, 19])
    r = roman(v)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Số {v} viết bằng chữ số La Mã là:", level, 40, skills, r,
              [T(f"{v} viết bằng chữ số La Mã là {r}.")], "roman", **MC(rng, r, roman_wrong(v)[:3]))


def b_roman_fill(rng, skills, level=1):
    vs = rng.sample(range(1, 21), 3)
    tmpl = "\n".join(f"{roman(v)} = □" for v in vs)
    return mk("fill_blank", "Viết số thích hợp.", "Viết các số La Mã sau bằng chữ số thường:", level, 60, skills,
              "; ".join(map(str, vs)), [T(f"{roman(v)} = {v}.") for v in vs], "roman", **FB(tmpl, vs))


def b_roman_match(rng, skills, level=2):
    vs = rng.sample(range(1, 21), 4)
    extra = next(w for w in (vs[0] + 2, vs[0] - 2, vs[1] + 1, 25) if 1 <= w and w not in vs)
    return mk("matching", "Nối cho đúng.", "Nối mỗi số La Mã với số có giá trị bằng nó.", level, 90, skills,
              "; ".join(f"{roman(v)} = {v}" for v in vs), [T(f"{roman(v)} = {v}.") for v in vs], "roman",
              **MT(rng, [(roman(v), str(v)) for v in vs], [str(extra)]))


def b_roman_order(rng, skills, level=2):
    vs = rng.sample(range(1, 21), 4)
    srt = sorted(vs)
    return mk("drag_drop", "Xếp theo thứ tự từ bé đến lớn.", "Kéo các số La Mã " + ", ".join(roman(v) for v in vs) + " vào ô trống theo thứ tự từ bé đến lớn.",
              level, 70, skills, " < ".join(roman(v) for v in srt), [T(" < ".join(f"{roman(v)} ({v})" for v in srt) + ".")], "roman",
              **DD(rng, " < ".join(["□"] * 4), [roman(v) for v in srt]))


def b_roman_clock(rng, skills, level=2):
    h = rnd(rng, 1, 11)
    right = f"{h} giờ"
    wrong = [f"{w} giờ" for w in dict.fromkeys([12, (h % 12) + 1, h - 1 if h > 1 else 11]) if w != h][:3]
    return mk("multiple_choice", "Chọn đáp án đúng.",
              f"Mặt đồng hồ ghi số La Mã. Kim phút chỉ vào số XII, kim giờ chỉ vào số {roman(h)}. Đồng hồ chỉ mấy giờ?", level, 50, skills,
              right, [T(f"{roman(h)} = {h}. Kim phút chỉ số XII, kim giờ chỉ số {roman(h)} nên đồng hồ chỉ {h} giờ.")], "roman",
              **MC(rng, right, wrong))


def b_roman_calc(rng, skills, level=3):
    a, b = rng.sample(range(2, 15), 2)
    if a + b > 20:
        a, b = 11, 4
    return mk("fill_blank", "Tính rồi viết bằng số thường.", f"{roman(a)} + {roman(b)} = ?", level, 60, skills, str(a + b),
              [T(f"{roman(a)} = {a}; {roman(b)} = {b}."), E(f"{a} + {b} = {a + b}"), T(f"Kết quả {a + b} viết bằng số La Mã là {roman(a + b)}.")],
              "roman", **FB(f"{roman(a)} + {roman(b)} = □", [a + b]))


def b_roman_max(rng, skills, level=2):
    vs = rng.sample(range(1, 21), 4)
    best = max(vs)
    return mk("multiple_choice", "Chọn đáp án đúng.", "Số La Mã nào có giá trị lớn nhất?", level, 50, skills, roman(best),
              [T(", ".join(f"{roman(v)} = {v}" for v in vs) + "."), T(f"Số lớn nhất là {best}, tức là {roman(best)}.")], "roman",
              **MC(rng, roman(best), [roman(v) for v in vs if v != best]))

# ---------------------------------------------------------------------------
# Hình học
# ---------------------------------------------------------------------------
LETTERS = list("ABCDEGHIKMNOPQ")


def letters(rng, n):
    return rng.sample(LETTERS, n)


def polygon_sides(rng, n, lo, hi):
    """Độ dài các cạnh hợp lệ (cạnh dài nhất bé hơn tổng các cạnh còn lại)."""
    while True:
        s = [rnd(rng, lo, hi) for _ in range(n)]
        if 2 * max(s) < sum(s):
            return s


def b_mid_between(rng, skills, level=1):
    a, b, c = letters(rng, 3)
    right = f"Điểm {b}"
    return mk("multiple_choice", "Chọn đáp án đúng.",
              f"Ba điểm {a}, {b}, {c} cùng nằm trên một đường thẳng theo thứ tự từ trái sang phải. Điểm nào là điểm ở giữa hai điểm còn lại?",
              level, 30, skills, right, [T(f"Điểm {b} nằm giữa hai điểm {a} và {c}.")], "midpoint",
              **MC(rng, right, [f"Điểm {a}", f"Điểm {c}"]))


def b_mid_half(rng, skills, level=1, double=False):
    p, q, m = letters(rng, 3)
    x = rnd(rng, 2, 15)
    if double:
        return mk("fill_blank", "Điền số thích hợp.", f"{m} là trung điểm của đoạn thẳng {p}{q}. Đoạn thẳng {p}{m} dài {x} cm. Hỏi đoạn thẳng {p}{q} dài bao nhiêu xăng-ti-mét?",
                  level, 50, skills, f"{2 * x} cm", [T(f"{m} là trung điểm nên {p}{m} = {m}{q} = {x} cm."), E(f"{x} × 2 = {2 * x}")], "midpoint",
                  **FB(f"Đoạn thẳng {p}{q} dài □ cm.", [(2 * x, "cm")]))
    return mk("fill_blank", "Điền số thích hợp.", f"{m} là trung điểm của đoạn thẳng {p}{q}. Đoạn thẳng {p}{q} dài {2 * x} cm. Hỏi đoạn thẳng {p}{m} dài bao nhiêu xăng-ti-mét?",
              level, 50, skills, f"{x} cm", [T(f"{m} là trung điểm nên {p}{m} = {m}{q}."), E(f"{2 * x} : 2 = {x}")], "midpoint",
              **FB(f"Đoạn thẳng {p}{m} dài □ cm.", [(x, "cm")]))


def b_mid_check(rng, skills, level=2):
    p, q, m = letters(rng, 3)
    L = 2 * rnd(rng, 3, 10)
    a = L // 2 if rng.random() < 0.5 else rnd(rng, 1, L - 1)
    yes = a * 2 == L
    right = f"{m} là trung điểm của {p}{q}" if yes else f"{m} không phải trung điểm của {p}{q}"
    wrong = f"{m} không phải trung điểm của {p}{q}" if yes else f"{m} là trung điểm của {p}{q}"
    return mk("multiple_choice", "Chọn đáp án đúng.",
              f"Đoạn thẳng {p}{q} dài {L} cm. Điểm {m} nằm giữa {p} và {q}, đoạn thẳng {p}{m} dài {a} cm. Câu nào đúng?", level, 60, skills, right,
              [E(f"{L} - {a} = {L - a}"), T(f"{m}{q} dài {L - a} cm. " + (f"{p}{m} = {m}{q} nên {m} là trung điểm của {p}{q}." if yes else f"{p}{m} khác {m}{q} nên {m} không phải trung điểm của {p}{q}."))],
              "midpoint", **MC(rng, right, [wrong]))


def b_mid_match(rng, skills, level=2):
    xs = rng.sample(range(2, 16), 4)
    names = [letters(rng, 2) for _ in xs]
    pairs = [(f"Đoạn thẳng {a}{b} dài {2 * x} cm", f"{x} cm") for (a, b), x in zip(names, xs)]
    extra = next(f"{v} cm" for v in range(2, 30) if v not in xs and v not in [2 * x for x in xs])
    return mk("matching", "Nối cho đúng.", "Nối mỗi đoạn thẳng với khoảng cách từ một đầu đoạn thẳng đến trung điểm của nó.", level, 90, skills,
              "; ".join(f"{l} → {r}" for l, r in pairs), [E(f"{2 * x} : 2 = {x}") for x in xs], "midpoint", **MT(rng, pairs, [extra]))


def b_mid_drag(rng, skills, level=2):
    xs = rng.sample(range(2, 16), 3)
    lines = []
    for x in xs:
        p, q, m = letters(rng, 3)
        lines.append(f"{m} là trung điểm của {p}{q}, {p}{q} = {2 * x} cm thì {p}{m} = □ cm")
    extra = next(v for v in range(2, 40) if v not in xs)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống.", level, 80, skills, "; ".join(map(str, xs)),
              [E(f"{2 * x} : 2 = {x}") for x in xs], "midpoint", **DD(rng, "\n".join(lines), [str(x) for x in xs], [str(extra)]))


def b_mid_unit(rng, skills, level=3):
    big, cm = rng.choice([("1 dm", 10), ("2 dm", 20), ("4 dm", 40), ("6 dm", 60), ("1 m", 100), ("2 m", 200)])
    p, q, m = letters(rng, 3)
    return mk("fill_blank", "Điền số thích hợp.", f"Đoạn thẳng {p}{q} dài {big}. {m} là trung điểm của đoạn thẳng {p}{q}. Đoạn thẳng {p}{m} dài bao nhiêu xăng-ti-mét?",
              level, 70, skills, f"{cm // 2} cm", [T(f"Đổi {big} = {cm} cm."), E(f"{cm} : 2 = {cm // 2}")], "same_unit",
              **FB(f"Đoạn thẳng {p}{m} dài □ cm.", [(cm // 2, "cm")]))


def b_mid_word(rng, skills, level=3):
    L = 2 * rnd(rng, 6, 49)
    x = L // 2
    prompt = f"Một sợi dây dài {L} m được căng thẳng giữa hai cái cọc. Bạn Nam buộc một chiếc nơ đỏ ở trung điểm của sợi dây. Hỏi chiếc nơ cách mỗi cái cọc bao nhiêu mét?"
    steps = [WP([("Chiếc nơ cách mỗi cái cọc số mét là:", f"{L} : 2 = {x} (m)")], f"{x} m")] + ([long_div(L, 2)] if L >= 20 else [])
    return mk("fill_blank", "Giải bài toán.", prompt, level, 90, skills, f"{x} m", steps, "midpoint", **FB("Chiếc nơ cách mỗi cái cọc □ m.", [(x, "m")]))


def b_circle_fill(rng, skills, level=1, to_d=True):
    o, a, b = letters(rng, 3)
    r = rnd(rng, 2, 15)
    if to_d:
        return mk("fill_blank", "Điền số thích hợp.", f"Hình tròn tâm {o} có bán kính {r} cm. Đường kính của hình tròn đó dài bao nhiêu xăng-ti-mét?",
                  level, 40, skills, f"{2 * r} cm", [T(H["circle"], "rule"), E(f"{r} × 2 = {2 * r}")], "circle",
                  **FB("Đường kính dài □ cm.", [(2 * r, "cm")]))
    return mk("fill_blank", "Điền số thích hợp.", f"Hình tròn tâm {o} có đường kính {a}{b} dài {2 * r} cm. Bán kính của hình tròn đó dài bao nhiêu xăng-ti-mét?",
              level, 40, skills, f"{r} cm", [T(H["circle"], "rule"), E(f"{2 * r} : 2 = {r}")], "circle",
              **FB("Bán kính dài □ cm.", [(r, "cm")]))


def b_circle_concept(rng, skills, level=1, which=None):
    o, a, b = letters(rng, 3)
    pool = [
        ("Trong một hình tròn, đường kính dài gấp mấy lần bán kính?", "2 lần", ["3 lần", "4 lần", "bằng nhau"]),
        (f"Hình tròn tâm {o}, điểm {a} nằm trên đường tròn. Đoạn thẳng {o}{a} là gì của hình tròn?", "bán kính", ["đường kính", "tâm", "trung điểm"]),
        (f"Hình tròn tâm {o}. Đoạn thẳng {a}{b} đi qua tâm {o}, hai điểm {a} và {b} nằm trên đường tròn. Đoạn thẳng {a}{b} là gì của hình tròn?", "đường kính", ["bán kính", "tâm", "góc vuông"]),
        ("Trong một hình tròn, các bán kính có độ dài như thế nào?", "bằng nhau", ["khác nhau", "dài gấp đôi nhau", "bán kính sau dài hơn bán kính trước"]),
        (f"Hình tròn tâm {o} có đường kính {a}{b}. Điểm {o} là gì của đoạn thẳng {a}{b}?", f"trung điểm của {a}{b}", [f"điểm đầu của {a}{b}", f"điểm cuối của {a}{b}", f"điểm nằm ngoài {a}{b}"]),
    ]
    q, right, wrong = pool[which] if which is not None else rng.choice(pool)
    return mk("multiple_choice", "Chọn đáp án đúng.", q, level, 40, skills, right,
              [T("Tâm là điểm ở giữa hình tròn; bán kính nối tâm với một điểm trên đường tròn; đường kính đi qua tâm, nối hai điểm trên đường tròn và dài gấp đôi bán kính.")],
              "circle", **MC(rng, right, wrong))


def b_circle_match(rng, skills, level=2):
    rs = rng.sample(range(2, 16), 4)
    pairs = [(f"Bán kính {r} cm", f"Đường kính {2 * r} cm") for r in rs]
    extra = next(f"Đường kính {v} cm" for v in range(3, 40, 2) if v not in rs)
    return mk("matching", "Nối cho đúng.", "Nối bán kính với đường kính của cùng một hình tròn.", level, 90, skills,
              "; ".join(f"{l} → {r}" for l, r in pairs), [E(f"{r} × 2 = {2 * r}") for r in rs], "circle", **MT(rng, pairs, [extra]))


def b_circle_drag(rng, skills, level=2):
    rs = rng.sample(range(2, 16), 3)
    to_d = [rng.random() < 0.5 for _ in rs]
    lines = [f"Bán kính {r} cm thì đường kính □ cm" if t else f"Đường kính {2 * r} cm thì bán kính □ cm" for r, t in zip(rs, to_d)]
    ans = [2 * r if t else r for r, t in zip(rs, to_d)]
    if len(set(ans)) < 3:
        to_d = [True] * 3
        lines = [f"Bán kính {r} cm thì đường kính □ cm" for r in rs]
        ans = [2 * r for r in rs]
    extra = next(v for v in range(3, 40) if v not in ans)
    steps = [E(f"{r} × 2 = {2 * r}") if t else E(f"{2 * r} : 2 = {r}") for r, t in zip(rs, to_d)]
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống.", level, 80, skills, "; ".join(map(str, ans)), steps, "circle",
              **DD(rng, "\n".join(lines), [str(x) for x in ans], [str(extra)]))


def b_circle_word(rng, skills, level=3, mode="fill"):
    if rng.random() < 0.5:
        d = 2 * rnd(rng, 15, 35)
        prompt = f"Bánh xe đạp của bạn Minh có dạng hình tròn với đường kính {d} cm. Hỏi bán kính bánh xe dài bao nhiêu xăng-ti-mét?"
        r, line, tmpl = d // 2, ("Bán kính bánh xe dài là:", f"{d} : 2 = {d // 2} (cm)"), "Bán kính bánh xe dài □ cm."
        blk = long_div(d, 2)
    else:
        rr = rnd(rng, 11, 45)
        prompt = f"Một chiếc mâm hình tròn có bán kính {rr} cm. Hỏi đường kính chiếc mâm dài bao nhiêu xăng-ti-mét?"
        r, line, tmpl = rr * 2, ("Đường kính chiếc mâm dài là:", f"{rr} × 2 = {rr * 2} (cm)"), "Đường kính chiếc mâm dài □ cm."
        blk = col_mul(rr, 2)
    steps = [WP([line], f"{r} cm"), blk]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 80, skills, f"{r} cm", steps, "circle", **FB(tmpl, [(r, "cm")]))
    wrong = pick_wrong(rng, r, [r * 4 if r < 50 else r // 2, r + 2], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 80, skills, f"{r} cm", steps, "circle",
              **MC(rng, f"{r} cm", [f"{w} cm" for w in wrong]))


def b_circle_compare(rng, skills, level=3):
    r1 = rnd(rng, 3, 9)
    d2 = rng.choice([2 * r1 - 2, 2 * r1 + 2, 2 * r1])
    if d2 > 2 * r1:
        right = "Hình tròn B"
    elif d2 < 2 * r1:
        right = "Hình tròn A"
    else:
        right = "Hai hình tròn bằng nhau"
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Hình tròn A có bán kính {r1} cm. Hình tròn B có đường kính {d2} cm. Hình tròn nào lớn hơn?",
              level, 70, skills, right, [E(f"{r1} × 2 = {2 * r1}"), T(f"Đường kính hình tròn A là {2 * r1} cm, đường kính hình tròn B là {d2} cm.")],
              "circle", **MC(rng, right, [x for x in ["Hình tròn A", "Hình tròn B", "Hai hình tròn bằng nhau"] if x != right]))


def b_angle_count(rng, skills, level=1):
    return mk("fill_blank", "Điền số thích hợp.", "Đếm số góc vuông của mỗi hình.", level, 30, skills, "4; 4",
              [T("Hình vuông có 4 góc vuông. Hình chữ nhật cũng có 4 góc vuông.")], "angle",
              **FB("Hình vuông có □ góc vuông.\nHình chữ nhật có □ góc vuông.", [4, 4]))


def b_angle_clock(rng, skills, level=2):
    h = rng.choice([3, 9])
    wrong = rng.sample([1, 2, 4, 5, 6, 7, 8, 10, 11, 12], 3)
    return mk("multiple_choice", "Chọn đáp án đúng.", "Lúc mấy giờ đúng thì kim giờ và kim phút tạo thành một góc vuông?", level, 50, skills,
              f"{h} giờ", [T(f"Lúc {h} giờ, kim phút chỉ số 12, kim giờ chỉ số {h}; hai kim tạo thành góc vuông.")], "angle",
              **MC(rng, f"{h} giờ", [f"{w} giờ" for w in wrong]))


def b_angle_tool(rng, skills, level=1):
    return mk("multiple_choice", "Chọn đáp án đúng.", "Để kiểm tra một góc có phải là góc vuông hay không, ta dùng dụng cụ nào?", level, 30, skills,
              "ê ke", [T("Ta đặt góc vuông của ê ke trùng với đỉnh và một cạnh của góc để kiểm tra.")], "angle",
              **MC(rng, "ê ke", ["com-pa", "thước dây", "cân đĩa"]))


def b_angle_vertex(rng, skills, level=1):
    o, a, b = letters(rng, 3)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Một góc có hai cạnh là {o}{a} và {o}{b}. Đỉnh của góc là điểm nào?", level, 30, skills,
              f"Điểm {o}", [T(f"Hai cạnh {o}{a} và {o}{b} chung điểm {o}, nên {o} là đỉnh của góc.")], "shape",
              **MC(rng, f"Điểm {o}", [f"Điểm {a}", f"Điểm {b}"]))


def b_angle_match(rng, skills, level=2):
    pairs = [("Hình vuông", "4 góc vuông"), ("Hình tam giác có một góc vuông", "1 góc vuông"),
             ("Hình tam giác có ba cạnh bằng nhau", "Không có góc vuông")]
    rng.shuffle(pairs)
    return mk("matching", "Nối cho đúng.", "Nối mỗi hình với số góc vuông của hình đó.", level, 70, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), [T(f"{l}: {r}.") for l, r in pairs], "angle", **MT(rng, pairs, ["2 góc vuông"]))


def b_angle_drag(rng, skills, level=2):
    lines = [("Hình tam giác có □ góc.", "3"), ("Hình tứ giác có □ góc.", "4"), ("Hình vuông có □ góc vuông.", "4"), ("Hình chữ nhật có □ góc vuông.", "4")]
    pick = rng.sample(lines[1:], 2)
    chosen = [lines[0]] + pick
    rng.shuffle(chosen)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống. Một thẻ có thể dùng nhiều lần.", level, 60, skills,
              "; ".join(v for _, v in chosen), [T(l.replace("□", v)) for l, v in chosen], "shape",
              **DD(rng, "\n".join(l for l, _ in chosen), [v for _, v in chosen], ["2", "5"], reuse=True))


def b_angle_quad(rng, skills, level=2):
    vs = letters(rng, 4)
    k = rnd(rng, 1, 2)
    right = vs[:k]
    return mk("fill_blank", "Điền số thích hợp.",
              f"Hình tứ giác {''.join(vs)} có góc đỉnh {' và góc đỉnh '.join(right)} là góc vuông, các góc còn lại không phải góc vuông.",
              level, 50, skills, f"{k}; {4 - k}", [T("Hình tứ giác có 4 góc."), E(f"4 - {k} = {4 - k}")], "shape",
              **FB("Hình tứ giác đó có □ góc vuông và □ góc không vuông.", [k, 4 - k]))


def b_angle_word(rng, skills, level=3):
    a, b = rnd(rng, 2, 5), rnd(rng, 2, 5)
    s = a + b
    prompt = f"Bạn Hoa cắt được {a} tấm bìa hình vuông và {b} tấm bìa hình chữ nhật. Hỏi tất cả các tấm bìa đó có bao nhiêu góc vuông?"
    steps = [WP([("Số tấm bìa bạn Hoa cắt được là:", f"{a} + {b} = {s} (tấm)"), ("Số góc vuông có tất cả là:", f"4 × {s} = {4 * s} (góc)")], f"{4 * s} góc vuông")]
    return mk("fill_blank", "Giải bài toán.", prompt, level, 100, skills, f"{4 * s} góc vuông", steps, "two_step",
              **FB("Có tất cả □ góc vuông.", [(4 * s, "góc")]))


def b_shape_count(rng, skills, level=1):
    name, n = rng.choice([("Hình tam giác", 3), ("Hình tứ giác", 4)])
    return mk("fill_blank", "Điền số thích hợp.", f"{name} có mấy cạnh, mấy đỉnh?", level, 30, skills, f"{n} cạnh, {n} đỉnh",
              [T(f"{name} có {n} cạnh và {n} đỉnh.")], "shape", **FB(f"{name} có □ cạnh và □ đỉnh.", [n, n]))


SHAPE_Q = [
    ("Hình nào có 4 cạnh bằng nhau và 4 góc vuông?", "Hình vuông", ["Hình tam giác", "Hình tròn", "Hình tứ giác có một góc vuông"]),
    ("Hình nào dưới đây có 3 cạnh?", "Hình tam giác", ["Hình chữ nhật", "Hình vuông", "Hình tròn"]),
    ("Hình chữ nhật có đặc điểm nào dưới đây?", "4 góc vuông, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau",
     ["3 góc vuông, 3 cạnh bằng nhau", "Không có góc vuông nào", "Chỉ có 2 góc vuông"]),
    ("Hình nào dưới đây không có đỉnh?", "Hình tròn", ["Hình tam giác", "Hình vuông", "Hình chữ nhật"]),
]


def b_shape_prop(rng, skills, level=1):
    q, right, wrong = rng.choice(SHAPE_Q)
    return mk("multiple_choice", "Chọn đáp án đúng.", q, level, 40, skills, right, [T(f"Đáp án đúng: {right}.")], "shape",
              **MC(rng, right, wrong))


def b_shape_rect_side(rng, skills, level=2, mode="fill"):
    a, b, c, d = letters(rng, 4)
    x, y = rnd(rng, 6, 20), rnd(rng, 2, 5)
    if mode == "fill":
        return mk("fill_blank", "Điền số thích hợp.", f"Hình chữ nhật {a}{b}{c}{d} có {a}{b} = {x} cm, {b}{c} = {y} cm. Tìm độ dài cạnh {c}{d} và cạnh {d}{a}.",
                  level, 50, skills, f"{x} cm; {y} cm", [T(f"Hình chữ nhật có hai cạnh dài bằng nhau và hai cạnh ngắn bằng nhau: {c}{d} = {a}{b}, {d}{a} = {b}{c}.")],
                  "shape", **FB(f"{c}{d} = □ cm; {d}{a} = □ cm.", [(x, "cm"), (y, "cm")]))
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Hình vuông {a}{b}{c}{d} có cạnh {a}{b} dài {x} cm. Cạnh {c}{d} dài bao nhiêu?",
              level, 40, skills, f"{x} cm", [T("Hình vuông có bốn cạnh dài bằng nhau.")], "shape",
              **MC(rng, f"{x} cm", [f"{x * 2} cm", f"{x * 4} cm", f"{x + 1} cm"]))


SHAPE_OBJ = {
    "hình vuông": ["Mặt bàn cờ vua", "Viên gạch lát nền hình vuông", "Chiếc khăn mùi xoa"],
    "hình chữ nhật": ["Mặt quyển sách", "Cánh cửa ra vào", "Mặt bảng lớp học"],
    "hình tam giác": ["Biển báo giao thông hình tam giác", "Miếng bánh sandwich cắt chéo", "Chiếc thước ê ke"],
    "hình tròn": ["Mặt đồng hồ treo tường", "Chiếc đĩa ăn", "Mặt đồng xu"],
}


def b_shape_match(rng, skills, level=2):
    pairs = [(rng.choice(objs), shape) for shape, objs in SHAPE_OBJ.items()]
    rng.shuffle(pairs)
    return mk("matching", "Nối đồ vật với hình.", "Nối mỗi đồ vật với hình dạng của nó.", level, 80, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), [T(f"{l} có dạng {r}.") for l, r in pairs], "shape", **MT(rng, pairs))


def b_shape_drag(rng, skills, level=2):
    lines = [("Hình tam giác có □ cạnh.", "3"), ("Hình tứ giác có □ đỉnh.", "4"), ("Hình chữ nhật có □ góc vuông.", "4"), ("Hình tam giác có □ đỉnh.", "3")]
    chosen = rng.sample(lines, 3)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống. Một thẻ có thể dùng nhiều lần.", level, 60, skills,
              "; ".join(v for _, v in chosen), [T(l.replace("□", v)) for l, v in chosen], "shape",
              **DD(rng, "\n".join(l for l, _ in chosen), [v for _, v in chosen], ["2", "5"], reuse=True))


def b_shape_sum(rng, skills, level=3):
    a, b, c = polygon_sides(rng, 3, 3, 15)
    x, y, z = letters(rng, 3)
    return mk("fill_blank", "Điền số thích hợp.", f"Hình tam giác {x}{y}{z} có các cạnh dài {a} cm, {b} cm và {c} cm. Tổng độ dài ba cạnh của hình tam giác là bao nhiêu?",
              level, 60, skills, f"{a + b + c} cm", [E(f"{a} + {b} + {c} = {a + b + c}")], "perimeter",
              **FB("Tổng độ dài ba cạnh là □ cm.", [(a + b + c, "cm")]))


def b_shape_word(rng, skills, level=3):
    a, b = rnd(rng, 2, 6), rnd(rng, 2, 6)
    prompt = f"Bạn Nam dùng que tính xếp được {a} hình tam giác và {b} hình tứ giác rời nhau, mỗi cạnh là một que tính. Hỏi Nam đã dùng bao nhiêu que tính?"
    steps = [WP([("Số que tính xếp các hình tam giác là:", f"3 × {a} = {3 * a} (que)"),
                 ("Số que tính xếp các hình tứ giác là:", f"4 × {b} = {4 * b} (que)"),
                 ("Số que tính Nam đã dùng là:", f"{3 * a} + {4 * b} = {3 * a + 4 * b} (que)")], f"{3 * a + 4 * b} que tính")]
    return mk("fill_blank", "Giải bài toán.", prompt, level, 120, skills, f"{3 * a + 4 * b} que tính", steps, "two_step",
              **FB("Nam đã dùng □ que tính.", [(3 * a + 4 * b, "que")]))


DRAW_Q = [
    ("Để vẽ đường tròn, ta dùng dụng cụ nào?", "com-pa", ["ê ke", "cân đĩa", "đồng hồ"]),
    ("Để vẽ góc vuông, ta dùng dụng cụ nào?", "ê ke", ["com-pa", "cân đĩa", "nhiệt kế"]),
    ("Để vẽ đoạn thẳng dài 6 cm, ta dùng dụng cụ nào?", "thước có vạch chia xăng-ti-mét", ["com-pa", "nhiệt kế", "cân đĩa"]),
]


def b_draw_tool(rng, skills, level=1):
    q, right, wrong = rng.choice(DRAW_Q)
    return mk("multiple_choice", "Chọn đáp án đúng.", q, level, 30, skills, right, [T(f"Ta dùng {right}.")], "angle", **MC(rng, right, wrong))


def b_draw_compass(rng, skills, level=1, from_d=False):
    r = rnd(rng, 2, 9)
    if from_d:
        return mk("fill_blank", "Điền số thích hợp.", f"Muốn vẽ hình tròn có đường kính {2 * r} cm, ta mở com-pa rộng bao nhiêu xăng-ti-mét?",
                  level, 50, skills, f"{r} cm", [T("Độ mở của com-pa bằng bán kính."), E(f"{2 * r} : 2 = {r}")], "circle",
                  **FB("Ta mở com-pa rộng □ cm.", [(r, "cm")]))
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Muốn vẽ hình tròn có bán kính {r} cm, ta mở com-pa rộng bao nhiêu?", level, 40, skills,
              f"{r} cm", [T("Độ mở của com-pa (khoảng cách giữa hai đầu com-pa) bằng bán kính hình tròn.")], "circle",
              **MC(rng, f"{r} cm", [f"{2 * r} cm", f"{r + 1} cm", f"{r * 4} cm"]))


def b_draw_grid(rng, skills, level=1):
    a, b = rnd(rng, 3, 8), rnd(rng, 2, 6)
    if a == b:
        a += 1
    return mk("fill_blank", "Điền số thích hợp.", f"Trên giấy kẻ ô vuông, mỗi ô vuông có cạnh 1 cm. Bạn Lan vẽ hình chữ nhật có chiều dài {a} cm, chiều rộng {b} cm.",
              level, 40, skills, f"{a} ô; {b} ô", [T(f"Mỗi ô dài 1 cm nên {a} cm ứng với {a} ô, {b} cm ứng với {b} ô.")], "shape",
              **FB("Chiều dài vẽ qua □ ô, chiều rộng vẽ qua □ ô.", [(a, "ô"), (b, "ô")]))


def b_draw_steps(rng, skills, level=2):
    a, b = rnd(rng, 4, 8), rnd(rng, 2, 3)
    steps = [f"Vẽ đoạn thẳng AB dài {a} cm.", "Dùng ê ke vẽ góc vuông đỉnh A và góc vuông đỉnh B.",
             f"Trên hai cạnh góc vuông, lấy AD = {b} cm và BC = {b} cm.", "Nối D với C, được hình chữ nhật ABCD."]
    return mk("drag_drop", "Sắp xếp các bước vẽ.", f"Kéo các bước vào đúng thứ tự để vẽ hình chữ nhật ABCD có chiều dài {a} cm, chiều rộng {b} cm.",
              level, 120, skills, " → ".join(steps), [T(f"Bước {i + 1}: {s}") for i, s in enumerate(steps)], "angle",
              **DD(rng, "Bước 1: □\nBước 2: □\nBước 3: □\nBước 4: □", steps))


def b_draw_tool_match(rng, skills, level=2):
    pairs = [("Ê ke", "Vẽ và kiểm tra góc vuông"), ("Com-pa", "Vẽ đường tròn"), ("Thước thẳng", "Vẽ đoạn thẳng")]
    rng.shuffle(pairs)
    return mk("matching", "Nối dụng cụ với việc làm.", "Nối mỗi dụng cụ với việc ta dùng nó để làm.", level, 60, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), [T(f"{l}: {r.lower()}.") for l, r in pairs], "angle", **MT(rng, pairs, ["Đo nhiệt độ"]))


def b_draw_square(rng, skills, level=3):
    a = rnd(rng, 3, 12)
    return mk("fill_blank", "Điền số thích hợp.", f"Bạn Lan vẽ một hình vuông có cạnh {a} cm. Tổng độ dài bốn cạnh của hình vuông đó là bao nhiêu?",
              level, 60, skills, f"{a * 4} cm", [T("Hình vuông có bốn cạnh dài bằng nhau."), E(f"{a} × 4 = {a * 4}")], "perim_square",
              **FB("Tổng độ dài bốn cạnh là □ cm.", [(a * 4, "cm")]))


def b_draw_rect_word(rng, skills, level=2):
    a = rnd(rng, 6, 15)
    d = rnd(rng, 2, a - 2)
    prompt = f"Bạn Minh vẽ một hình chữ nhật có chiều dài {a} cm, chiều rộng ngắn hơn chiều dài {d} cm. Hỏi chiều rộng hình chữ nhật dài bao nhiêu xăng-ti-mét?"
    return mk("fill_blank", "Giải bài toán.", prompt, level, 70, skills, f"{a - d} cm",
              [WP([("Chiều rộng hình chữ nhật dài là:", f"{a} - {d} = {a - d} (cm)")], f"{a - d} cm")], "more_less",
              **FB("Chiều rộng dài □ cm.", [(a - d, "cm")]))


def b_draw_radius(rng, skills, level=1):
    o, a = letters(rng, 2)
    r = rnd(rng, 2, 9)
    return mk("fill_blank", "Điền số thích hợp.", f"Bạn Hà vẽ đường tròn tâm {o}, bán kính {r} cm, rồi lấy điểm {a} nằm trên đường tròn. Đoạn thẳng {o}{a} dài bao nhiêu?",
              level, 40, skills, f"{r} cm", [T(f"{o}{a} là một bán kính nên {o}{a} = {r} cm.")], "circle", **FB(f"{o}{a} = □ cm.", [(r, "cm")]))


SOLID_OBJ = [("con xúc xắc", "khối lập phương"), ("khối ru-bích", "khối lập phương"), ("hộp sữa tươi", "khối hộp chữ nhật"),
             ("viên gạch", "khối hộp chữ nhật"), ("bao diêm", "khối hộp chữ nhật"), ("hộp bút", "khối hộp chữ nhật")]


def b_solid_count(rng, skills, level=1):
    name = rng.choice(["Khối lập phương", "Khối hộp chữ nhật"])
    return mk("fill_blank", "Điền số thích hợp.", f"{name} có mấy mặt, mấy cạnh, mấy đỉnh?", level, 50, skills, "6 mặt, 12 cạnh, 8 đỉnh",
              [T(f"{name} có 6 mặt, 12 cạnh và 8 đỉnh.")], "solid", **FB(f"{name} có □ mặt, □ cạnh và □ đỉnh.", [6, 12, 8]))


def b_solid_obj(rng, skills, level=1):
    obj, kind = rng.choice(SOLID_OBJ)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"{obj[0].upper() + obj[1:]} có dạng khối gì?",
              level, 30, skills, kind, [T(f"{obj[0].upper() + obj[1:]} có dạng {kind}.")], "solid",
              **MC(rng, kind, [k for k in ["khối lập phương", "khối hộp chữ nhật"] if k != kind] + ["hình vuông", "hình tròn"]))


def b_solid_face(rng, skills, level=1):
    return mk("multiple_choice", "Chọn đáp án đúng.", "Các mặt của khối lập phương đều là hình gì?", level, 30, skills, "hình vuông",
              [T("Khối lập phương có 6 mặt, các mặt đều là hình vuông bằng nhau.")], "solid",
              **MC(rng, "hình vuông", ["hình tam giác", "hình tròn", "hình tứ giác không có góc vuông"]))


def b_solid_match(rng, skills, level=2):
    name = rng.choice(["khối lập phương", "khối hộp chữ nhật"])
    pairs = [(f"Số mặt của {name}", "6"), (f"Số cạnh của {name}", "12"), (f"Số đỉnh của {name}", "8")]
    rng.shuffle(pairs)
    return mk("matching", "Nối cho đúng.", "Nối mỗi ô bên trái với số đúng.", level, 60, skills, "; ".join(f"{l}: {r}" for l, r in pairs),
              [T(f"{name[0].upper() + name[1:]} có 6 mặt, 12 cạnh, 8 đỉnh.")], "solid", **MT(rng, pairs, ["4"]))


def b_solid_drag(rng, skills, level=2):
    cubes = [o for o, k in SOLID_OBJ if k == "khối lập phương"]
    boxes = [o for o, k in SOLID_OBJ if k == "khối hộp chữ nhật"]
    chosen = [(rng.choice(cubes), "khối lập phương")] + [(o, "khối hộp chữ nhật") for o in rng.sample(boxes, 2)]
    rng.shuffle(chosen)
    tmpl = "\n".join(f"{o[0].upper() + o[1:]}: □" for o, _ in chosen)
    return mk("drag_drop", "Kéo thẻ vào ô trống.", "Mỗi đồ vật có dạng khối gì? Kéo thẻ vào ô trống (một thẻ có thể dùng nhiều lần).", level, 60, skills,
              "; ".join(k for _, k in chosen), [T(f"{o[0].upper() + o[1:]}: {k}.") for o, k in chosen], "solid",
              **DD(rng, tmpl, [k for _, k in chosen], ["hình vuông"], reuse=True))


def b_solid_word(rng, skills, level=2, mode="fill"):
    k = rnd(rng, 2, 9)
    what, n = rng.choice([("mặt", 6), ("đỉnh", 8), ("cạnh", 12)])
    name = rng.choice(["khối lập phương", "khối hộp chữ nhật"])
    prompt = f"Bạn Hoa có {k} {name}. Hỏi tất cả các khối đó có bao nhiêu {what}?"
    if what == "mặt" and rng.random() < 0.5:
        prompt = f"Bạn Hoa dán giấy màu lên tất cả các mặt của {k} {name}, mỗi mặt dán một tờ. Hỏi Hoa cần bao nhiêu tờ giấy màu?"
    unit = "tờ" if "giấy" in prompt else what
    r = n * k
    steps = [WP([(f"Mỗi {name} có {n} {what}. Số {unit} cần tìm là:", f"{n} × {k} = {r} ({unit})")], f"{r} {unit}")]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 80, skills, f"{r} {unit}", steps, "solid", **FB(f"Có □ {unit}.", [(r, unit)]))
    wrong = pick_wrong(rng, r, [n + k, r + n], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 80, skills, f"{r} {unit}", steps, "solid",
              **MC(rng, f"{r} {unit}", [f"{w} {unit}" for w in wrong]))


# ---------------------------------------------------------------------------
# Chu vi, diện tích
# ---------------------------------------------------------------------------


def b_perim(rng, kind, skills, level=1, mode="fill"):
    names = letters(rng, 4)
    if kind == "tri":
        s = polygon_sides(rng, 3, 3, 25)
        nm = "".join(names[:3])
        prompt = f"Hình tam giác {nm} có độ dài các cạnh là {s[0]} cm, {s[1]} cm và {s[2]} cm. Tính chu vi hình tam giác đó."
        r = sum(s)
        steps = [T(H["perimeter"], "rule"), E(f"{s[0]} + {s[1]} + {s[2]} = {r}")]
        if r >= 10:
            steps.insert(1, col_add(s))
        hint = "perimeter"
    elif kind == "quad":
        s = polygon_sides(rng, 4, 3, 25)
        nm = "".join(names)
        prompt = f"Hình tứ giác {nm} có độ dài các cạnh là {s[0]} cm, {s[1]} cm, {s[2]} cm và {s[3]} cm. Tính chu vi hình tứ giác đó."
        r = sum(s)
        steps = [T(H["perimeter"], "rule"), E(f"{s[0]} + {s[1]} + {s[2]} + {s[3]} = {r}")]
        hint = "perimeter"
    elif kind == "rect":
        a = rnd(rng, 6, 40)
        b = rnd(rng, 2, a - 1)
        prompt = f"Hình chữ nhật {''.join(names)} có chiều dài {a} cm, chiều rộng {b} cm. Tính chu vi hình chữ nhật đó."
        r = (a + b) * 2
        steps = [T(H["perim_rect"], "rule"), E(f"({a} + {b}) × 2 = {a + b} × 2 = {r}")]
        hint = "perim_rect"
    else:
        a = rnd(rng, 3, 24)
        prompt = f"Hình vuông {''.join(names)} có cạnh dài {a} cm. Tính chu vi hình vuông đó."
        r = a * 4
        steps = [T(H["perim_square"], "rule"), E(f"{a} × 4 = {r}")]
        hint = "perim_square"
    if mode == "fill":
        return mk("fill_blank", "Tính chu vi.", prompt, level, 60, skills, f"{r} cm", steps, hint, **FB("Chu vi là □ cm.", [(r, "cm")]))
    if kind == "rect":
        wrong = [a + b, a * b, r + 2]
    elif kind == "square":
        wrong = [a * 2, a * a if a * a != r else r + 4, r + 4]
    else:
        wrong = [r + 10, r - 1, r + 1]
    wrong = pick_wrong(rng, r, wrong, lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt.replace("Tính chu vi", "Chu vi của") .replace(" đó.", " đó là:"), level, 60, skills,
              f"{r} cm", steps, hint, **MC(rng, f"{r} cm", [f"{w} cm" for w in wrong]))


def _perim_case(rng):
    k = rng.random()
    if k < 0.5:
        a = rnd(rng, 4, 20)
        b = rnd(rng, 2, a - 1)
        return f"Hình chữ nhật dài {a} cm, rộng {b} cm", (a + b) * 2, f"({a} + {b}) × 2 = {(a + b) * 2}"
    a = rnd(rng, 2, 20)
    return f"Hình vuông cạnh {a} cm", a * 4, f"{a} × 4 = {a * 4}"


def _perim_cases(rng, n):
    out = []
    while len(out) < n:
        c = _perim_case(rng)
        if c[1] in {o[1] for o in out} or c[0] in {o[0] for o in out}:
            continue
        out.append(c)
    return out


def b_perim_match(rng, skills, level=2):
    cs = _perim_cases(rng, 4)
    extra = next(f"{v} cm" for v in range(10, 200, 2) if v not in [c[1] for c in cs])
    return mk("matching", "Nối hình với chu vi.", "Nối mỗi hình với chu vi của hình đó.", level, 120, skills,
              "; ".join(f"{c[0]}: {c[1]} cm" for c in cs), [E(c[2]) for c in cs], "perimeter",
              **MT(rng, [(c[0], f"{c[1]} cm") for c in cs], [extra]))


def b_perim_drag(rng, skills, level=2):
    cs = _perim_cases(rng, 3)
    rs = [c[1] for c in cs]
    extra = next(v for v in range(10, 200, 2) if v not in rs)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo chu vi đúng vào mỗi ô trống.", level, 100, skills, "; ".join(f"{r} cm" for r in rs),
              [E(c[2]) for c in cs], "perimeter", **DD(rng, "\n".join(f"{c[0]}: chu vi □ cm" for c in cs), [str(r) for r in rs], [str(extra)]))


def b_perim_word(rng, skills, level=3, kind="rect", mode="fill"):
    if kind == "rect":
        a = rnd(rng, 15, 60)
        b = rnd(rng, 5, a - 3)
        r = (a + b) * 2
        prompt = f"Một mảnh vườn hình chữ nhật có chiều dài {a} m, chiều rộng {b} m. Người ta rào xung quanh mảnh vườn. Hỏi hàng rào dài bao nhiêu mét?"
        lines = [("Chu vi mảnh vườn là:", f"({a} + {b}) × 2 = {r} (m)")]
        tmpl, ans, hint, unit = "Hàng rào dài □ m.", f"{r} m", "perim_rect", "m"
        steps = [WP(lines, ans), T("Độ dài hàng rào chính là chu vi mảnh vườn.", "tip")]
    elif kind == "square_side":
        a = rnd(rng, 3, 24)
        r = a
        prompt = f"Một hình vuông có chu vi {a * 4} cm. Hỏi cạnh của hình vuông đó dài bao nhiêu xăng-ti-mét?"
        lines = [("Cạnh của hình vuông dài là:", f"{a * 4} : 4 = {a} (cm)")]
        tmpl, ans, hint, unit = "Cạnh hình vuông dài □ cm.", f"{a} cm", "perim_square", "cm"
        steps = [WP(lines, ans)] + ([long_div(a * 4, 4)] if a * 4 >= 10 else [])
    else:
        a = rnd(rng, 8, 30)
        r = a * 4
        prompt = f"Một khung ảnh hình vuông có cạnh {a} cm. Bạn Mai dán ruy băng xung quanh khung ảnh. Hỏi Mai cần đoạn ruy băng dài bao nhiêu xăng-ti-mét?"
        lines = [("Chu vi khung ảnh là:", f"{a} × 4 = {r} (cm)")]
        tmpl, ans, hint, unit = "Mai cần □ cm ruy băng.", f"{r} cm", "perim_square", "cm"
        steps = [WP(lines, ans), col_mul(a, 4)]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 100, skills, ans, steps, hint, **FB(tmpl, [(r, unit)]))
    wrong = pick_wrong(rng, r, [r * 2, r + 4, r - 2], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 100, skills, ans, steps, hint,
              **MC(rng, f"{r} {unit}", [f"{w} {unit}" for w in wrong]))


def b_area_count(rng, skills, level=1):
    rows, cols = rnd(rng, 2, 5), rnd(rng, 2, 6)
    n = rows * cols
    return mk("fill_blank", "Điền số thích hợp.", f"Hình A được ghép từ {rows} hàng, mỗi hàng có {cols} ô vuông cạnh 1 cm. Diện tích hình A là bao nhiêu?",
              level, 50, skills, f"{n} cm²", [T("Mỗi ô vuông cạnh 1 cm có diện tích 1 cm²."), E(f"{cols} × {rows} = {n}")], "area_count",
              **FB("Diện tích hình A là □ cm².", [(n, "cm²")]))


def b_area_compare(rng, skills, level=1):
    a, b = rng.sample(range(6, 30), 2)
    right = "Hình A" if a > b else "Hình B"
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Hình A gồm {a} ô vuông 1 cm², hình B gồm {b} ô vuông 1 cm². Hình nào có diện tích lớn hơn?",
              level, 40, skills, right, [T(f"Diện tích hình A là {a} cm², diện tích hình B là {b} cm².")], "area_count",
              **MC(rng, right, [x for x in ["Hình A", "Hình B", "Hai hình có diện tích bằng nhau"] if x != right]))


def b_area_calc(rng, skills, level=1):
    op = rng.choice(["+", "-", "×", ":"])
    if op == "+":
        a, b = rnd(rng, 10, 60), rnd(rng, 10, 39)
    elif op == "-":
        a, b = rnd(rng, 40, 99), rnd(rng, 10, 39)
    elif op == "×":
        a, b = rnd(rng, 6, 25), rnd(rng, 2, 4)
    else:
        b = rnd(rng, 2, 5)
        a = b * rnd(rng, 4, 19)
    r = calc(a, op, b)
    ua = f"{a} cm²"
    ub = f"{b} cm²" if op in "+-" else str(b)
    return mk("fill_blank", "Tính.", f"{ua} {op} {ub} = ?", level, 40, skills, f"{r} cm²", [E(eq(a, op, b)), T("Viết thêm đơn vị cm² vào kết quả.", "tip")],
              "area_count", **FB(f"{ua} {op} {ub} = □ cm²", [(r, "cm²")]))


def b_area_read(rng, skills, level=1):
    n = rnd(rng, 11, 99)
    return mk("multiple_choice", "Chọn cách đọc đúng.", f"{n} cm² đọc là:", level, 30, skills, f"{words(n)} xăng-ti-mét vuông",
              [T(f"{n} cm² đọc là {words(n)} xăng-ti-mét vuông.")], "area_count",
              **MC(rng, f"{words(n)} xăng-ti-mét vuông", [f"{words(n)} xăng-ti-mét", f"{words(n)} mét vuông", f"{words(n)} cm"]))


def _area_case(rng, square_ok=True):
    if square_ok and rng.random() < 0.4:
        a = rnd(rng, 2, 10)
        return f"Hình vuông cạnh {a} cm", a * a, f"{a} × {a} = {a * a}"
    a = rnd(rng, 3, 12)
    b = rnd(rng, 2, a - 1)
    return f"Hình chữ nhật dài {a} cm, rộng {b} cm", a * b, f"{a} × {b} = {a * b}"


def _area_cases(rng, n):
    out = []
    while len(out) < n:
        c = _area_case(rng)
        if c[1] in {o[1] for o in out} or c[0] in {o[0] for o in out}:
            continue
        out.append(c)
    return out


def b_area(rng, kind, skills, level=1, mode="fill"):
    names = "".join(letters(rng, 4))
    if kind == "rect":
        a = rnd(rng, 4, 15)
        b = rnd(rng, 2, a - 1)
        prompt = f"Hình chữ nhật {names} có chiều dài {a} cm, chiều rộng {b} cm. Tính diện tích hình chữ nhật đó."
        r, e, wrong = a * b, f"{a} × {b} = {a * b}", [(a + b) * 2, a + b, a * b + a]
    else:
        a = rnd(rng, 3, 10)
        prompt = f"Hình vuông {names} có cạnh dài {a} cm. Tính diện tích hình vuông đó."
        r, e, wrong = a * a, f"{a} × {a} = {a * a}", [a * 4, a * 2, a * a + a]
    steps = [T(H["area"], "rule"), E(e)]
    if mode == "fill":
        return mk("fill_blank", "Tính diện tích.", prompt, level, 50, skills, f"{r} cm²", steps, "area", **FB("Diện tích là □ cm².", [(r, "cm²")]))
    wrong = pick_wrong(rng, r, wrong, lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt.replace("Tính diện tích", "Diện tích của").replace(" đó.", " đó là:"), level, 50, skills,
              f"{r} cm²", steps, "area", **MC(rng, f"{r} cm²", [f"{w} cm²" for w in wrong]))


def b_area_match(rng, skills, level=2):
    cs = _area_cases(rng, 4)
    extra = next(f"{v} cm²" for v in range(6, 150) if v not in [c[1] for c in cs])
    return mk("matching", "Nối hình với diện tích.", "Nối mỗi hình với diện tích của hình đó.", level, 110, skills,
              "; ".join(f"{c[0]}: {c[1]} cm²" for c in cs), [E(c[2]) for c in cs], "area",
              **MT(rng, [(c[0], f"{c[1]} cm²") for c in cs], [extra]))


def b_area_drag(rng, skills, level=2):
    cs = _area_cases(rng, 3)
    rs = [c[1] for c in cs]
    extra = next(v for v in range(6, 150) if v not in rs and v != rs[0] + 1) + 1
    while extra in rs:
        extra += 1
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo diện tích đúng vào mỗi ô trống.", level, 90, skills, "; ".join(f"{r} cm²" for r in rs),
              [E(c[2]) for c in cs], "area", **DD(rng, "\n".join(f"{c[0]}: diện tích □ cm²" for c in cs), [str(r) for r in rs], [str(extra)]))


def b_area_order(rng, skills, level=2):
    vals = rng.sample(range(10, 99), 4)
    srt = sorted(vals)
    return mk("drag_drop", "Xếp theo thứ tự từ bé đến lớn.", "Kéo các số đo diện tích vào ô trống theo thứ tự từ bé đến lớn: " + ", ".join(f"{v} cm²" for v in vals) + ".",
              level, 60, skills, " < ".join(f"{v} cm²" for v in srt), [T(" < ".join(f"{v} cm²" for v in srt) + ".")], "order",
              **DD(rng, " < ".join(["□"] * 4), [f"{v} cm²" for v in srt]))


def b_area_word(rng, skills, level=3, kind="rect", mode="fill"):
    if kind == "rect":
        a = rnd(rng, 6, 25)
        b = rnd(rng, 3, min(a - 1, 9))
        r = a * b
        prompt = f"Một tấm bìa hình chữ nhật có chiều dài {a} cm, chiều rộng {b} cm. Tính diện tích tấm bìa đó."
        lines = [("Diện tích tấm bìa là:", f"{a} × {b} = {r} (cm²)")]
        steps = [WP(lines, f"{r} cm²")] + ([col_mul(a, b)] if a >= 10 else [])
        wrong = [(a + b) * 2, r + b]
    elif kind == "square":
        a = rnd(rng, 4, 9)
        r = a * a
        prompt = f"Một tờ giấy màu hình vuông có cạnh {a} cm. Tính diện tích tờ giấy màu đó."
        lines = [("Diện tích tờ giấy màu là:", f"{a} × {a} = {r} (cm²)")]
        steps = [WP(lines, f"{r} cm²")]
        wrong = [a * 4, r + a]
    elif kind == "more":
        a = rnd(rng, 15, 60)
        d = rnd(rng, 5, 30)
        r = a + d
        prompt = f"Tờ giấy màu đỏ có diện tích {a} cm², tờ giấy màu xanh có diện tích lớn hơn tờ giấy màu đỏ {d} cm². Hỏi tờ giấy màu xanh có diện tích bao nhiêu xăng-ti-mét vuông?"
        lines = [("Diện tích tờ giấy màu xanh là:", f"{a} + {d} = {r} (cm²)")]
        steps = [WP(lines, f"{r} cm²")]
        wrong = [a - d, r + 10]
    else:  # two-step: rect minus square
        a = rnd(rng, 6, 12)
        b = rnd(rng, 4, a - 1)
        c = rnd(rng, 2, b - 1)
        s1, s2 = a * b, c * c
        r = s1 - s2
        prompt = f"Từ một tấm bìa hình chữ nhật dài {a} cm, rộng {b} cm, bạn An cắt đi một hình vuông cạnh {c} cm. Hỏi phần bìa còn lại có diện tích bao nhiêu xăng-ti-mét vuông?"
        lines = [("Diện tích tấm bìa hình chữ nhật là:", f"{a} × {b} = {s1} (cm²)"), ("Diện tích hình vuông cắt đi là:", f"{c} × {c} = {s2} (cm²)"),
                 ("Diện tích phần bìa còn lại là:", f"{s1} - {s2} = {r} (cm²)")]
        steps = [WP(lines, f"{r} cm²")]
        wrong = [s1, s1 + s2]
    hint = "two_step" if kind == "cut" else "area" if kind != "more" else "more_less"
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 120, skills, f"{r} cm²", steps, hint, **FB("Diện tích là □ cm².", [(r, "cm²")]))
    wrong = pick_wrong(rng, r, wrong, lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 120, skills, f"{r} cm²", steps, hint,
              **MC(rng, f"{r} cm²", [f"{w} cm²" for w in wrong]))


def b_rect_both(rng, skills, level=3):
    a = rnd(rng, 5, 15)
    b = rnd(rng, 2, a - 1)
    return mk("fill_blank", "Điền số thích hợp.", f"Hình chữ nhật có chiều dài {a} cm, chiều rộng {b} cm. Tính chu vi và diện tích của hình chữ nhật đó.",
              level, 90, skills, f"{(a + b) * 2} cm; {a * b} cm²",
              [E(f"({a} + {b}) × 2 = {(a + b) * 2}"), E(f"{a} × {b} = {a * b}"), T("Chu vi đo bằng cm, diện tích đo bằng cm².", "tip")], "area",
              **FB("Chu vi là □ cm.\nDiện tích là □ cm².", [((a + b) * 2, "cm"), (a * b, "cm²")]))

# ---------------------------------------------------------------------------
# Đo lường: độ dài, khối lượng, dung tích, nhiệt độ
# ---------------------------------------------------------------------------
CONV = {  # (đơn vị lớn, đơn vị bé): số lần
    ("cm", "mm"): 10, ("dm", "cm"): 10, ("m", "cm"): 100, ("m", "dm"): 10, ("dm", "mm"): 100, ("m", "mm"): 1000,
    ("km", "m"): 1000, ("kg", "g"): 1000, ("l", "ml"): 1000,
}
UNIT_WORD = {"mm": "mi-li-mét", "cm": "xăng-ti-mét", "dm": "đề-xi-mét", "m": "mét", "km": "ki-lô-mét",
             "g": "gam", "kg": "ki-lô-gam", "ml": "mi-li-lít", "l": "lít", "°C": "độ C"}
HINT_OF_UNIT = {"mm": "length", "cm": "length", "dm": "length", "m": "length", "km": "length", "g": "mass", "kg": "mass",
                "ml": "volume", "l": "volume"}


def conv_fact(big, small):
    return f"1 {big} = {fmt(CONV[(big, small)])} {small}"


def b_conv_fill(rng, pairs, skills, level=1):
    (b1, s1), (b2, s2) = rng.sample(pairs, 2) if len(pairs) > 1 else (pairs[0], pairs[0])
    f1, f2 = CONV[(b1, s1)], CONV[(b2, s2)]
    x = rnd(rng, 2, 9)
    y = rnd(rng, 2, 9)
    if (b1, s1) == (b2, s2) and x == y:
        y = x % 9 + 2 if x % 9 + 2 != x else 3
    tmpl = f"{x} {b1} = □ {s1}\n{fmt(y * f2)} {s2} = □ {b2}"
    steps = [T(conv_fact(b1, s1) + ("" if (b1, s1) == (b2, s2) else "; " + conv_fact(b2, s2)) + ".", "rule"),
             E(f"{x} × {fmt(f1)} = {fmt(x * f1)}"), E(f"{fmt(y * f2)} : {fmt(f2)} = {y}")]
    hint = HINT_OF_UNIT[s1] if "mm" not in (s1, s2) and s1 not in ("cm", "dm", "m") else ("length" if "mm" in (s1, s2) else "same_unit")
    return mk("fill_blank", "Điền số thích hợp.", "Viết số thích hợp vào chỗ trống:", level, 50, skills,
              f"{fmt(x * f1)} {s1}; {y} {b2}", steps, hint, **FB(tmpl, [(x * f1, s1), (y, b2)]))


def b_conv_match(rng, pairs, skills, level=2):
    out = []
    for _ in range(200):
        b, s = rng.choice(pairs)
        x = rnd(rng, 1, 9)
        v = x * CONV[(b, s)]
        cand = (f"{x} {b}", f"{fmt(v)} {s}")
        if cand[0] in {o[0] for o in out} or cand[1] in {o[1] for o in out}:
            continue
        out.append(cand)
        if len(out) == 4:
            break
    b, s = rng.choice(pairs)
    extra = next(f"{fmt(x * CONV[(b, s)] // 10 or 5)} {s}" for x in range(2, 10) if f"{fmt(x * CONV[(b, s)] // 10 or 5)} {s}" not in {o[1] for o in out})
    return mk("matching", "Nối hai số đo bằng nhau.", "Nối mỗi số đo bên trái với số đo bằng nó ở bên phải.", level, 90, skills,
              "; ".join(f"{l} = {r}" for l, r in out), [T(f"{l} = {r}") for l, r in out], "same_unit", **MT(rng, out, [extra]))


def _qty(rng, big, small, f):
    """Một số đo, viết bằng đơn vị lớn hoặc bé; trả về (chữ, giá trị theo đơn vị bé)."""
    if rng.random() < 0.4:
        x = rnd(rng, 1, 5)
        return f"{x} {big}", x * f
    v = rnd(rng, f // 2 if f > 10 else 5, f * 5)
    if f >= 1000:
        v = v // 10 * 10
    return f"{fmt(v)} {small}", v


def b_unit_compare(rng, big, small, skills, level=2):
    f = CONV[(big, small)]
    x = rnd(rng, 1, 6)
    a_txt, a = f"{x} {big}", x * f
    d = rng.choice([-1, 1, 0]) * (f // 10 if f >= 100 else rnd(rng, 1, 5))
    b = a + d
    b_txt = f"{fmt(b)} {small}"
    if rng.random() < 0.5:
        (a_txt, a), (b_txt, b) = (b_txt, b), (a_txt, a)
    sign = ">" if a > b else "<" if a < b else "="
    return mk("multiple_choice", "Chọn dấu thích hợp.", f"{a_txt} ... {b_txt}", level, 50, skills, sign,
              [T(f"Đổi {x} {big} = {fmt(x * f)} {small}."), T(f"Ta có {fmt(a)} {small} {sign} {fmt(b)} {small}.")], "same_unit",
              **MC(rng, sign, [s for s in "<>=" if s != sign]))


def b_unit_order(rng, big, small, skills, level=2):
    f = CONV[(big, small)]
    items = []
    while len(items) < 4:
        t, v = _qty(rng, big, small, f)
        if v in {i[1] for i in items}:
            continue
        items.append((t, v))
    srt = sorted(items, key=lambda i: i[1])
    return mk("drag_drop", "Xếp theo thứ tự từ bé đến lớn.", "Kéo các số đo vào ô trống theo thứ tự từ bé đến lớn: " + ", ".join(t for t, _ in items) + ".",
              level, 80, skills, " < ".join(t for t, _ in srt),
              [T(f"Đổi về {UNIT_WORD[small]}: " + ", ".join(f"{t} = {fmt(v)} {small}" for t, v in items) + "."), T(" < ".join(t for t, _ in srt) + ".")],
              "same_unit", **DD(rng, " < ".join(["□"] * 4), [t for t, _ in srt]))


def b_unit_calc(rng, unit, skills, level=1, op=None, big=False):
    op = op or rng.choice(["+", "-"])
    if op == "+":
        a, b = (pick_add(rng, 3, True) if big else pick_add(rng, 2, True))
    elif op == "-":
        a, b = (pick_sub(rng, 3, True, rng.choice([2, 3])) if big else pick_sub(rng, 2, True))
    elif op == "×":
        a, b = pick_mul(rng, 2, 999 if big else 99)
    else:
        a, b = pick_div(rng, 2 if not big else 3)
    r = calc(a, op, b)
    ua = f"{fmt(a)} {unit}"
    ub = f"{fmt(b)} {unit}" if op in "+-" else str(b)
    return mk("fill_blank", "Tính.", f"{ua} {op} {ub} = ?", level, 50, skills, f"{fmt(r)} {unit}",
              calc_steps(a, op, b) + [T(f"Viết thêm đơn vị {unit} vào kết quả.", "tip")], OP_HINT[op],
              **FB(f"{ua} {op} {ub} = □ {unit}", [(r, unit)]))


ESTIMATE = {
    "length": [("Chiếc bút chì dài khoảng:", "15 cm", ["15 mm", "15 m", "15 km"]),
               ("Cuốn sách Toán dày khoảng:", "8 mm", ["8 cm", "8 m", "8 km"]),
               ("Cửa ra vào lớp học cao khoảng:", "2 m", ["2 cm", "2 mm", "2 km"]),
               ("Con kiến dài khoảng:", "5 mm", ["5 cm", "5 m", "5 dm"]),
               ("Quãng đường từ nhà em đến trường dài khoảng:", "2 km", ["2 mm", "2 cm", "2 dm"])],
    "mass": [("Một quả trứng gà nặng khoảng:", "50 g", ["50 kg", "5 kg", "500 kg"]),
             ("Một bao gạo to nặng khoảng:", "25 kg", ["25 g", "250 g", "2 g"]),
             ("Một chiếc bút chì nặng khoảng:", "10 g", ["10 kg", "100 kg", "1 kg"]),
             ("Một quả dưa hấu nặng khoảng:", "3 kg", ["3 g", "30 g", "300 kg"])],
    "volume": [("Một thìa canh chứa khoảng:", "15 ml", ["15 l", "150 l", "1 l"]),
               ("Một can nước lớn chứa khoảng:", "20 l", ["20 ml", "2 ml", "200 ml"]),
               ("Một hộp sữa nhỏ chứa khoảng:", "180 ml", ["180 l", "18 l", "1 ml"]),
               ("Một xô nước đầy chứa khoảng:", "10 l", ["10 ml", "100 ml", "1 ml"])],
    "temp": [("Nhiệt độ của nước đá đang tan khoảng:", "0 °C", ["37 °C", "100 °C", "25 °C"]),
             ("Nhiệt độ của nước đang sôi là:", "100 °C", ["0 °C", "37 °C", "10 °C"]),
             ("Thân nhiệt của người khỏe mạnh khoảng:", "37 °C", ["0 °C", "100 °C", "17 °C"]),
             ("Một ngày hè nóng bức, nhiệt độ ngoài trời có thể là:", "36 °C", ["6 °C", "0 °C", "100 °C"]),
             ("Một ngày mùa đông giá rét ở miền Bắc, nhiệt độ ngoài trời có thể là:", "9 °C", ["39 °C", "100 °C", "60 °C"])],
}


def b_estimate(rng, kind, skills, level=1):
    q, right, wrong = rng.choice(ESTIMATE[kind])
    return mk("multiple_choice", "Chọn số đo phù hợp.", q, level, 30, skills, right, [T(f"Số đo phù hợp là {right}.")],
              "temperature" if kind == "temp" else "estimate", **MC(rng, right, wrong))


def b_scale(rng, skills, level=2):
    ws = rng.sample([500, 200, 100, 50, 20, 10], rnd(rng, 2, 3))
    total = sum(ws)
    thing = rng.choice(["gói kẹo", "túi đường", "hộp bánh", "quả xoài"])
    eq_ = " + ".join(map(str, ws)) + f" = {total}"
    return mk("fill_blank", "Điền số thích hợp.",
              f"Cân đĩa thăng bằng. Một đĩa cân đặt {thing}, đĩa cân kia đặt các quả cân: " + ", ".join(f"{w} g" for w in ws) + f". Hỏi {thing} nặng bao nhiêu gam?",
              level, 60, skills, f"{total} g", [T(f"Cân thăng bằng nên {thing} nặng bằng tổng các quả cân."), E(eq_)], "mass",
              **FB(f"{thing[0].upper() + thing[1:]} nặng □ g.", [(total, "g")]))


def b_measure_word(rng, kind, skills, level=3, mode="fill"):
    if kind == "len_less":
        a = rnd(rng, 30, 80)
        d = rnd(rng, 5, a - 10)
        r = a - d
        prompt = f"Con sâu xanh dài {a} mm, con sâu nâu ngắn hơn con sâu xanh {d} mm. Hỏi con sâu nâu dài bao nhiêu mi-li-mét?"
        lines, unit, ans, tmpl, pre = [("Con sâu nâu dài là:", f"{a} - {d} = {r} (mm)")], "mm", f"{r} mm", "Con sâu nâu dài □ mm.", []
        blk, hint = (a, "-", d), "more_less"
    elif kind == "len_convert":
        c = rnd(rng, 12, 19)
        m = rnd(rng, 11, 35)
        r = c * 10 - m
        prompt = f"Chiếc bút chì dài {c} cm. Sau khi gọt, bút chì ngắn đi {m} mm. Hỏi bút chì còn lại dài bao nhiêu mi-li-mét?"
        pre = [T(f"Đổi {c} cm = {c * 10} mm.")]
        lines, unit, ans, tmpl = [("Bút chì còn lại dài là:", f"{c * 10} - {m} = {r} (mm)")], "mm", f"{r} mm", "Bút chì còn lại dài □ mm."
        blk, hint = (c * 10, "-", m), "same_unit"
    elif kind == "mass_left":
        k = rnd(rng, 1, 3)
        g = rnd(rng, 11, 95) * 10
        if g >= k * 1000:
            g = 350
        r = k * 1000 - g
        prompt = f"Mẹ mua {k} kg đường. Mẹ đã dùng {g} g đường để làm bánh. Hỏi mẹ còn lại bao nhiêu gam đường?"
        pre = [T(f"Đổi {k} kg = {fmt(k * 1000)} g.")]
        lines, unit, ans, tmpl = [("Số đường mẹ còn lại là:", f"{fmt(k * 1000)} - {g} = {fmt(r)} (g)")], "g", f"{fmt(r)} g", "Mẹ còn lại □ g đường."
        blk, hint = (k * 1000, "-", g), "same_unit"
    elif kind == "mass_mul":
        a = rnd(rng, 12, 95)
        k = rnd(rng, 2, 9)
        r = a * k
        prompt = f"Mỗi gói kẹo nặng {a} g. Hỏi {k} gói kẹo như thế nặng bao nhiêu gam?"
        pre = []
        lines, unit, ans, tmpl = [(f"{k} gói kẹo nặng là:", f"{a} × {k} = {r} (g)")], "g", f"{r} g", f"{k} gói kẹo nặng □ g."
        blk, hint = (a, "×", k), "word"
    elif kind == "vol_add":
        a = rnd(rng, 15, 60) * 10
        b = rnd(rng, 10, 35) * 10
        r = a + b
        prompt = f"Trong can có {a} ml dầu ăn. Mẹ đổ thêm vào can {b} ml dầu ăn nữa. Hỏi trong can có tất cả bao nhiêu mi-li-lít dầu ăn?"
        pre = []
        lines, unit, ans, tmpl = [("Số dầu ăn có trong can là:", f"{a} + {b} = {fmt(r)} (ml)")], "ml", f"{fmt(r)} ml", "Trong can có □ ml dầu ăn."
        blk, hint = (a, "+", b), "word"
    elif kind == "vol_two":
        n = rnd(rng, 2, 4)
        v = rng.choice([150, 200, 250, 300])
        x = n * v
        k = 1 if x < 1000 else 2
        r = k * 1000 - x
        prompt = f"Một bình có {k} l nước. Mẹ rót ra {n} cốc, mỗi cốc {v} ml. Hỏi trong bình còn lại bao nhiêu mi-li-lít nước?"
        pre = [T(f"Đổi {k} l = {fmt(k * 1000)} ml.")]
        lines = [("Số nước mẹ đã rót ra là:", f"{v} × {n} = {fmt(x)} (ml)"), ("Số nước còn lại trong bình là:", f"{fmt(k * 1000)} - {fmt(x)} = {fmt(r)} (ml)")]
        unit, ans, tmpl = "ml", f"{fmt(r)} ml", "Trong bình còn lại □ ml nước."
        blk, hint = (v, "×", n), "two_step"
    elif kind == "temp_more":
        a = rnd(rng, 15, 26)
        d = rnd(rng, 3, 9)
        r = a + d
        prompt = f"Buổi sáng nhiệt độ ngoài trời là {a} °C. Buổi trưa nóng hơn buổi sáng {d} °C. Hỏi nhiệt độ buổi trưa là bao nhiêu độ C?"
        pre = []
        lines, unit, ans, tmpl = [("Nhiệt độ buổi trưa là:", f"{a} + {d} = {r} (°C)")], "°C", f"{r} °C", "Nhiệt độ buổi trưa là □ °C."
        blk, hint = (a, "+", d), "temperature"
    else:  # temp_fever
        t = rnd(rng, 38, 40)
        r = t - 37
        prompt = f"Bạn Bin bị sốt, nhiệt kế chỉ {t} °C. Thân nhiệt bình thường của Bin là 37 °C. Hỏi nhiệt độ cơ thể Bin cao hơn bình thường bao nhiêu độ C?"
        pre = []
        lines, unit, ans, tmpl = [("Nhiệt độ cơ thể Bin cao hơn bình thường là:", f"{t} - 37 = {r} (°C)")], "°C", f"{r} °C", "Cao hơn bình thường □ °C."
        blk, hint = (t, "-", 37), "temperature"
    steps = pre + [WP(lines, ans)] + ([column_block(*blk)] if needs_block(*blk) and blk[0] >= 100 else [])
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 100, skills, ans, steps, hint, **FB(tmpl, [(r, unit)]))
    wrong = pick_wrong(rng, r, [r + 10, r - 10 if r > 10 else r + 2, r + 1], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 100, skills, ans, steps, hint,
              **MC(rng, f"{fmt(r)} {unit}", [f"{fmt(w)} {unit}" for w in wrong]))


CITIES = ["Hà Nội", "Đà Lạt", "Huế", "Đà Nẵng", "Sa Pa", "Cần Thơ", "Hải Phòng", "Nha Trang"]


def _temps(rng, n=4):
    cities = rng.sample(CITIES, n)
    ts = rng.sample(range(8, 36), n)
    return list(zip(cities, ts))


def b_temp_extreme(rng, skills, level=2, coldest=True):
    data = _temps(rng)
    best = min(data, key=lambda x: x[1]) if coldest else max(data, key=lambda x: x[1])
    word = "lạnh nhất" if coldest else "nóng nhất"
    prompt = f"Nhiệt độ lúc 9 giờ sáng của một số thành phố:\n" + "\n".join(f"{c}: {t} °C" for c, t in data) + f"\nThành phố nào {word}?"
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 60, skills, best[0],
              [T("So sánh: " + " < ".join(f"{t} °C" for _, t in sorted(data, key=lambda x: x[1])) + "."), T(f"{best[0]} có nhiệt độ {'thấp' if coldest else 'cao'} nhất nên {word}.")],
              "temperature", **MC(rng, best[0], [c for c, _ in data if c != best[0]]))


def b_temp_order(rng, skills, level=2):
    data = _temps(rng)
    srt = sorted(data, key=lambda x: x[1])
    prompt = "Nhiệt độ lúc 9 giờ sáng của một số thành phố:\n" + "\n".join(f"{c}: {t} °C" for c, t in data) + "\nXếp tên các thành phố theo thứ tự từ lạnh nhất đến nóng nhất."
    return mk("drag_drop", "Kéo tên thành phố vào ô trống.", prompt, level, 90, skills, " → ".join(c for c, _ in srt),
              [T(" < ".join(f"{t} °C ({c})" for c, t in srt) + ".")], "temperature", **DD(rng, " → ".join(["□"] * 4), [c for c, _ in srt]))


def b_temp_diff(rng, skills, level=2):
    a = rnd(rng, 14, 25)
    b = a + rnd(rng, 3, 10)
    return mk("fill_blank", "Điền số thích hợp.", f"Lúc 7 giờ sáng nhiệt kế chỉ {a} °C, lúc 1 giờ chiều nhiệt kế chỉ {b} °C. Nhiệt độ đã tăng thêm bao nhiêu độ C?",
              level, 50, skills, f"{b - a} °C", [E(f"{b} - {a} = {b - a}")], "temperature", **FB("Nhiệt độ đã tăng thêm □ °C.", [(b - a, "°C")]))


def b_temp_match(rng, skills, level=2):
    pairs = [("Nước đá đang tan", "0 °C"), ("Nước đang sôi", "100 °C"), ("Thân nhiệt người khỏe mạnh", "37 °C")]
    rng.shuffle(pairs)
    return mk("matching", "Nối cho đúng.", "Nối mỗi trường hợp với nhiệt độ phù hợp.", level, 60, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), [T(f"{l}: khoảng {r}.") for l, r in pairs], "temperature", **MT(rng, pairs, ["60 °C"]))


def b_temp_read(rng, skills, level=1):
    t = rnd(rng, 12, 38)
    return mk("multiple_choice", "Chọn cách đọc đúng.", f"Nhiệt kế chỉ {t} °C. Cách đọc nào đúng?", level, 30, skills, f"{words(t)} độ C",
              [T(f"{t} °C đọc là {words(t)} độ C.")], "temperature",
              **MC(rng, f"{words(t)} độ C", [f"{words(t)} độ", f"{words(t + 1)} độ C", f"{words(t)} xăng-ti-mét"]))


# ---------------------------------------------------------------------------
# Thời gian: đồng hồ, tháng, năm
# ---------------------------------------------------------------------------


def tfmt(h, m):
    return f"{h} giờ" if m == 0 else f"{h} giờ {m} phút"


def b_clock_read(rng, skills, level=1):
    h = rnd(rng, 1, 11)
    n = rnd(rng, 1, 11)
    m = 5 * n
    right = tfmt(h, m)
    cands = [tfmt(h + 1, m), tfmt(h, n) if n != m else tfmt(h, m + 5), tfmt(n, 5 * h) if 5 * h < 60 and n != h else tfmt(h, (m + 30) % 60 or 30)]
    wrong = [c for c in dict.fromkeys(cands) if c != right][:3]
    hand = f"chỉ quá số {h} một chút" if m < 30 else f"chỉ giữa số {h} và số {h + 1}"
    return mk("multiple_choice", "Đồng hồ chỉ mấy giờ?", f"Kim giờ {hand}, kim phút chỉ vào số {n}. Đồng hồ chỉ mấy giờ?", level, 50, skills, right,
              [T(f"Kim phút chỉ số {n} nghĩa là {m} phút (mỗi số cách nhau 5 phút)."), E(f"5 × {n} = {m}"), T(f"Đồng hồ chỉ {right}.")], "clock",
              **MC(rng, right, wrong))


def b_clock_kem(rng, skills, level=1, mode="fill"):
    h = rnd(rng, 1, 11)
    m = rng.choice([35, 40, 45, 50, 55])
    k = 60 - m
    if mode == "fill":
        return mk("fill_blank", "Điền số thích hợp.", f"{tfmt(h, m)} còn gọi là mấy giờ kém mấy phút?", level, 40, skills, f"{h + 1} giờ kém {k} phút",
                  [T("Còn bao nhiêu phút nữa thì đủ 60 phút?"), E(f"60 - {m} = {k}")], "clock",
                  **FB(f"{tfmt(h, m)} hay {h + 1} giờ kém □ phút.", [(k, "phút")]))
    right = tfmt(h, m)
    wrong = [tfmt(h + 1, m), tfmt(h, k), tfmt(h + 1, k)]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"{h + 1} giờ kém {k} phút còn gọi là:", level, 50, skills, right,
              [E(f"60 - {k} = {m}"), T(f"{h + 1} giờ kém {k} phút là {right}.")], "clock", **MC(rng, right, wrong))


def b_clock_add(rng, skills, level=2, ctx=False):
    h = rnd(rng, 6, 10)
    m = rng.choice(range(0, 60, 5))
    d = rng.choice([15, 20, 25, 30, 35, 40, 45])
    if (m + d) % 60 == 0:
        d += 5
    tot = m + d
    h2, m2 = (h + 1, tot - 60) if tot >= 60 else (h, tot)
    if ctx:
        prompt = f"Buổi học bơi bắt đầu lúc {tfmt(h, m)} và kéo dài {d} phút. Hỏi buổi học bơi kết thúc lúc mấy giờ mấy phút?"
        tmpl = "Buổi học bơi kết thúc lúc □ giờ □ phút."
    else:
        prompt = f"Đồng hồ chỉ {tfmt(h, m)}. Thêm {d} phút nữa là mấy giờ mấy phút?"
        tmpl = "Thêm □ giờ □ phút."
        tmpl = "Lúc đó là □ giờ □ phút."
    steps = [E(f"{m} + {d} = {tot}")]
    if tot >= 60:
        steps += [E(f"{tot} - 60 = {m2}"), T(f"{tot} phút = 1 giờ {m2} phút, nên ta được {h2} giờ {m2} phút.")]
    else:
        steps += [T(f"Ta được {h2} giờ {m2} phút.")]
    return mk("fill_blank", "Điền số thích hợp.", prompt, level, 70, skills, f"{h2} giờ {m2} phút", steps, "clock",
              **FB(tmpl, [(h2, "giờ"), (m2, "phút")]))


def b_clock_duration(rng, skills, level=2):
    h = rnd(rng, 7, 15)
    m = rng.choice(range(0, 60, 5))
    d = rng.choice([10, 15, 20, 25, 30, 35, 40, 45, 50])
    tot = m + d
    h2, m2 = (h + 1, tot - 60) if tot >= 60 else (h, tot)
    act = rng.choice(["Bạn Lan làm bài tập", "Bạn Minh đọc truyện", "Đội bóng tập luyện", "Bạn Hà tập đàn"])
    if tot >= 60:
        steps = [T(f"Từ {tfmt(h, m)} đến {h + 1} giờ là {60 - m} phút; từ {h + 1} giờ đến {tfmt(h2, m2)} là {m2} phút."), E(f"{60 - m} + {m2} = {d}")]
    else:
        steps = [E(f"{m2} - {m} = {d}")]
    return mk("fill_blank", "Điền số thích hợp.", f"{act} từ {tfmt(h, m)} đến {tfmt(h2, m2)}. Hỏi thời gian đó là bao nhiêu phút?", level, 70, skills,
              f"{d} phút", steps, "clock", **FB("Thời gian đó là □ phút.", [(d, "phút")]))


def b_clock_pm_match(rng, skills, level=2):
    hs = rng.sample(range(13, 22), 4)
    def label(H):
        return f"{H - 12} giờ {'chiều' if H < 18 else 'tối'}"
    extra = next(f"{x} giờ sáng" for x in range(1, 10) if x not in [h - 12 for h in hs])
    return mk("matching", "Nối hai cách nói cùng giờ.", "Nối mỗi giờ bên trái với cách nói khác của giờ đó.", level, 80, skills,
              "; ".join(f"{H} giờ = {label(H)}" for H in hs), [E(f"{H} - 12 = {H - 12}") for H in hs], "clock",
              **MT(rng, [(f"{H} giờ", label(H)) for H in hs], [extra]))


def b_clock_order(rng, skills, level=2):
    ts = set()
    while len(ts) < 4:
        ts.add((rnd(rng, 6, 11), rng.choice(range(0, 60, 5))))
    ts = list(ts)
    srt = sorted(ts)
    return mk("drag_drop", "Xếp theo thứ tự từ sớm đến muộn.", "Các thời điểm trong cùng một buổi sáng. Kéo vào ô trống theo thứ tự từ sớm đến muộn.",
              level, 70, skills, " → ".join(tfmt(*t) for t in srt), [T(" → ".join(tfmt(*t) for t in srt) + ".")], "clock",
              **DD(rng, " → ".join(["□"] * 4), [tfmt(*t) for t in srt]))


MONTH_DAYS_2027 = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}


def b_month_days(rng, skills, level=1):
    a, b = rng.sample([1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 2)
    return mk("fill_blank", "Điền số thích hợp.", f"Tháng {a} và tháng {b} có bao nhiêu ngày?", level, 40, skills,
              f"{MONTH_DAYS_2027[a]} ngày; {MONTH_DAYS_2027[b]} ngày", [T(f"Tháng {a} có {MONTH_DAYS_2027[a]} ngày, tháng {b} có {MONTH_DAYS_2027[b]} ngày.")],
              "month_days", **FB(f"Tháng {a} có □ ngày.\nTháng {b} có □ ngày.", [(MONTH_DAYS_2027[a], "ngày"), (MONTH_DAYS_2027[b], "ngày")]))


def b_month_mc(rng, skills, level=2):
    days = rng.choice([30, 31])
    right_m = rng.choice([m for m, d in MONTH_DAYS_2027.items() if d == days])
    wrong_m = rng.sample([m for m, d in MONTH_DAYS_2027.items() if d != days], 3)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Tháng nào dưới đây có {days} ngày?", level, 40, skills, f"Tháng {right_m}",
              [T("Các tháng có 30 ngày: tháng 4, 6, 9, 11. Tháng 2 năm 2027 có 28 ngày. Các tháng còn lại có 31 ngày.")], "month_days",
              **MC(rng, f"Tháng {right_m}", [f"Tháng {m}" for m in wrong_m]))


def b_month_match(rng, skills, level=2):
    m30 = rng.choice([4, 6, 9, 11])
    m31 = rng.choice([1, 3, 5, 7, 8, 10, 12])
    pairs = [(f"Tháng {m30}", "30 ngày"), (f"Tháng {m31}", "31 ngày"), ("Tháng 2 năm 2027", "28 ngày")]
    rng.shuffle(pairs)
    return mk("matching", "Nối tháng với số ngày.", "Nối mỗi tháng với số ngày của tháng đó.", level, 60, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), [T(f"{l} có {r}.") for l, r in pairs], "month_days", **MT(rng, pairs, ["29 ngày"]))


TIME_UNITS = [("Một năm có □ tháng.", 12), ("Một tuần lễ có □ ngày.", 7), ("Một ngày có □ giờ.", 24), ("Một giờ có □ phút.", 60),
              ("Tháng 2 năm 2027 có □ ngày.", 28)]


def b_time_units(rng, skills, level=2):
    chosen = rng.sample(TIME_UNITS, 3)
    vals = [v for _, v in chosen]
    extra = next(v for v in (30, 31, 10, 100) if v not in vals)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống.", level, 50, skills, "; ".join(map(str, vals)),
              [T(l.replace("□", str(v))) for l, v in chosen], "calendar", **DD(rng, "\n".join(l for l, _ in chosen), [str(v) for v in vals], [str(extra)]))


def _cap(s):
    return s[0].upper() + s[1:]


def b_weekday(rng, skills, level=3):
    while True:
        y, m = rng.choice([(2026, 9), (2026, 10), (2026, 11), (2026, 12), (2027, 1), (2027, 3), (2027, 4), (2027, 5)])
        d = rnd(rng, 1, 10)
        add = rnd(rng, 1, 3) * 7 + rnd(rng, 0, 3)
        d2 = d + add
        if d2 <= MONTH_DAYS_2027[m]:
            break
    w1 = WEEKDAYS[dt.date(y, m, d).weekday()]
    w2 = WEEKDAYS[dt.date(y, m, d2).weekday()]
    weeks, extra = divmod(add, 7)
    wrong = [w for w in WEEKDAYS if w != w2]
    rng.shuffle(wrong)
    steps = [E(f"{d2} - {d} = {add}"), T(f"{add} ngày là {weeks} tuần" + (f" và {extra} ngày" if extra else "") + f". Ngày {d2} tháng {m} là {w2}.")]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Ngày {d} tháng {m} năm {y} là {w1}. Hỏi ngày {d2} tháng {m} năm {y} là thứ mấy?", level, 90, skills,
              _cap(w2), steps, "calendar", **MC(rng, _cap(w2), [_cap(w) for w in wrong[:3]]))


def b_calendar_seq(rng, skills, level=2):
    y, m = rng.choice([(2026, 10), (2026, 11), (2026, 12), (2027, 3), (2027, 4), (2027, 5)])
    wd = rnd(rng, 0, 6)
    first = next(d for d in range(1, 8) if dt.date(y, m, d).weekday() == wd)
    vals = [first + 7, first + 14, first + 21]
    return mk("fill_blank", "Điền số thích hợp.", f"Trong tháng {m} năm {y}, {WEEKDAYS[wd]} đầu tiên là ngày {first}. Các {WEEKDAYS[wd]} tiếp theo là những ngày nào?",
              level, 60, skills, "; ".join(map(str, vals)), [E(f"{first} + 7 = {first + 7}"), E(f"{first + 7} + 7 = {first + 14}"), E(f"{first + 14} + 7 = {first + 21}")],
              "calendar", **FB(f"Ngày {first}; ngày □; ngày □; ngày □.", vals))


def b_date_word(rng, skills, level=3):
    m = rng.choice([3, 4, 5, 10, 11])
    d = rnd(rng, 1, 12)
    w = rnd(rng, 1, 2)
    d2 = d + 7 * w
    return mk("fill_blank", "Giải bài toán.", f"Hôm nay là ngày {d} tháng {m}. Còn đúng {w} tuần nữa là đến sinh nhật của Lan. Hỏi sinh nhật Lan là ngày nào?",
              level, 80, skills, f"Ngày {d2} tháng {m}", [WP([(f"{w} tuần có số ngày là:", f"7 × {w} = {7 * w} (ngày)"), ("Sinh nhật Lan là ngày:", f"{d} + {7 * w} = {d2}")], f"ngày {d2} tháng {m}")],
              "calendar", **FB(f"Sinh nhật Lan là ngày □ tháng {m}.", [d2]))


# ---------------------------------------------------------------------------
# Tiền Việt Nam
# ---------------------------------------------------------------------------
NOTES = [1000, 2000, 5000, 10000, 20000, 50000, 100000]


def note(v):
    return f"tờ {fmt(v)} đồng"


def b_money_sum(rng, skills, level=1):
    while True:
        n1, n2 = sorted(rng.sample(NOTES[:6], 2), reverse=True)
        c1, c2 = rnd(rng, 1, 3), rnd(rng, 1, 3)
        total = n1 * c1 + n2 * c2
        if total <= 100000:
            break
    parts = " + ".join(([f"{fmt(n1)} × {c1}"] if c1 > 1 else [fmt(n1)]) + ([f"{fmt(n2)} × {c2}"] if c2 > 1 else [fmt(n2)]))
    who = rng.choice(["Mẹ", "Bà", "Bố", "Chị Mai"])
    return mk("fill_blank", "Điền số thích hợp.", f"{who} có {c1} {note(n1)} và {c2} {note(n2)}. Hỏi {who.lower() if who != 'Chị Mai' else 'chị Mai'} có tất cả bao nhiêu tiền?",
              level, 60, skills, f"{fmt(total)} đồng", [E(f"{parts} = {fmt(total)}")], "money", **FB(f"{who} có tất cả □ đồng.", [(total, "đồng")]))


def b_money_extreme(rng, skills, level=1):
    ns = rng.sample(NOTES, 4)
    best = max(ns) if rng.random() < 0.5 else min(ns)
    word = "lớn nhất" if best == max(ns) else "bé nhất"
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Trong các tờ tiền sau, tờ nào có giá trị {word}?", level, 30, skills, _cap(note(best)),
              [T(" < ".join(fmt(n) for n in sorted(ns)) + ".")], "money", **MC(rng, _cap(note(best)), [_cap(note(n)) for n in ns if n != best]))


EXCHANGE = [(10000, 5000), (10000, 2000), (10000, 1000), (20000, 10000), (20000, 5000), (20000, 2000), (50000, 10000),
            (50000, 5000), (100000, 20000), (100000, 50000), (100000, 10000), (5000, 1000)]


def b_money_exchange(rng, skills, level=1):
    big, small = rng.choice(EXCHANGE)
    n = big // small
    return mk("fill_blank", "Điền số thích hợp.", f"Đổi 1 {note(big)} lấy các {note(small)} thì được bao nhiêu tờ?", level, 40, skills, f"{n} tờ",
              [E(f"{fmt(big)} : {fmt(small)} = {n}")], "money", **FB(f"Đổi được □ {note(small)}.", [(n, "tờ")]))


def b_money_exchange_drag(rng, skills, level=2):
    for _ in range(200):
        cs = rng.sample(EXCHANGE, 3)
        ns = [b // s for b, s in cs]
        if len(set(ns)) == 3:
            break
    extra = next(v for v in (3, 4, 6, 8) if v not in ns)
    tmpl = "\n".join(f"1 {note(b)} = □ {note(s)}" for b, s in cs)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số đúng vào mỗi ô trống.", level, 70, skills, "; ".join(map(str, ns)),
              [E(f"{fmt(b)} : {fmt(s)} = {b // s}") for b, s in cs], "money", **DD(rng, tmpl, [str(n) for n in ns], [str(extra)]))


def b_money_match(rng, skills, level=2):
    out = []
    while len(out) < 4:
        n = rng.choice(NOTES[:5])
        c = rnd(rng, 2, 5)
        t = n * c
        if t in {o[1] for o in out}:
            continue
        out.append((f"{c} {note(n)}", t, f"{fmt(n)} × {c} = {fmt(t)}"))
    extra = next(v for v in (15000, 25000, 7000, 35000, 45000) if v not in {o[1] for o in out})
    return mk("matching", "Nối cho đúng.", "Nối mỗi nhóm tờ tiền với số tiền tương ứng.", level, 90, skills,
              "; ".join(f"{l} = {fmt(t)} đồng" for l, t, _ in out), [E(e) for _, _, e in out], "money",
              **MT(rng, [(l, f"{fmt(t)} đồng") for l, t, _ in out], [f"{fmt(extra)} đồng"]))


ITEMS = [("quyển truyện", 15000, 40000), ("hộp bút màu", 20000, 45000), ("quả bóng", 25000, 60000), ("cái cặp sách", 55000, 95000),
         ("chiếc mũ", 30000, 70000), ("con gấu bông", 35000, 85000)]


def b_money_change(rng, skills, level=2, mode="fill"):
    name, lo, hi = rng.choice(ITEMS)
    price = rnd(rng, lo // 1000, hi // 1000) * 1000
    pay = next(n for n in (50000, 100000) if n > price)
    r = pay - price
    prompt = f"Mẹ mua một {name} giá {fmt(price)} đồng. Mẹ đưa cô bán hàng 1 {note(pay)}. Hỏi cô bán hàng phải trả lại mẹ bao nhiêu tiền?"
    steps = [WP([("Số tiền cô bán hàng phải trả lại mẹ là:", f"{fmt(pay)} - {fmt(price)} = {fmt(r)} (đồng)")], f"{fmt(r)} đồng"), col_sub(pay, price) if len(str(pay - price)) == len(str(pay)) else E(f"{fmt(pay)} - {fmt(price)} = {fmt(r)}")]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 90, skills, f"{fmt(r)} đồng", steps, "money", **FB("Cô bán hàng trả lại mẹ □ đồng.", [(r, "đồng")]))
    wrong = pick_wrong(rng, r, [r + 10000, r - 1000 if r > 1000 else r + 2000, pay + price if pay + price <= 999999 else r + 5000], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 90, skills, f"{fmt(r)} đồng", steps, "money",
              **MC(rng, f"{fmt(r)} đồng", [f"{fmt(w)} đồng" for w in wrong]))


def b_money_mul(rng, skills, level=3, mode="fill"):
    p = rng.choice([4000, 5000, 6000, 7000, 8000, 9000, 12000, 15000, 18000])
    k = rnd(rng, 2, 5)
    r = p * k
    item = rng.choice(["quyển vở", "cái bút bi", "hộp sữa", "gói bánh"])
    prompt = f"Mỗi {item} giá {fmt(p)} đồng. Hỏi mua {k} {item} như thế hết bao nhiêu tiền?"
    steps = [WP([(f"Số tiền mua {k} {item} là:", f"{fmt(p)} × {k} = {fmt(r)} (đồng)")], f"{fmt(r)} đồng"), col_mul(p, k)]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 90, skills, f"{fmt(r)} đồng", steps, "word", **FB(f"Mua {k} {item} hết □ đồng.", [(r, "đồng")]))
    wrong = pick_wrong(rng, r, [p + k * 1000, r + p, r - 1000], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 90, skills, f"{fmt(r)} đồng", steps, "word",
              **MC(rng, f"{fmt(r)} đồng", [f"{fmt(w)} đồng" for w in wrong]))


def b_money_two(rng, skills, level=3):
    p = rng.choice([6000, 7000, 8000, 9000, 12000])
    k = rnd(rng, 2, 4)
    x = p * k
    pay = next(n for n in (50000, 100000) if n > x)
    r = pay - x
    prompt = f"Mẹ có {fmt(pay)} đồng. Mẹ mua {k} hộp sữa chua, mỗi hộp giá {fmt(p)} đồng. Hỏi mẹ còn lại bao nhiêu tiền?"
    steps = [WP([("Số tiền mẹ mua sữa chua là:", f"{fmt(p)} × {k} = {fmt(x)} (đồng)"), ("Số tiền mẹ còn lại là:", f"{fmt(pay)} - {fmt(x)} = {fmt(r)} (đồng)")],
                f"{fmt(r)} đồng"), col_mul(p, k)]
    return mk("fill_blank", "Giải bài toán.", prompt, level, 120, skills, f"{fmt(r)} đồng", steps, "two_step", **FB("Mẹ còn lại □ đồng.", [(r, "đồng")]))


# ---------------------------------------------------------------------------
# Thống kê, xác suất
# ---------------------------------------------------------------------------
TALLY = [
    ("Bạn Mai hỏi mỗi bạn trong nhóm thích loại quả nào nhất và ghi lại:", ["cam", "xoài", "táo", "nho"], "bạn"),
    ("Bạn Nam ghi lại màu áo của các bạn trong đội văn nghệ:", ["xanh", "đỏ", "vàng", "trắng"], "bạn"),
    ("Bạn Hà ghi lại các xe đi qua cổng trường trong 5 phút:", ["xe máy", "ô tô", "xe đạp"], "chiếc"),
    ("Tổ Một ghi lại con vật mỗi bạn yêu thích:", ["mèo", "chó", "thỏ", "cá vàng"], "bạn"),
]


def _tally(rng, k=3):
    title, cats, unit = rng.choice(TALLY)
    cats = rng.sample(cats, k)
    counts = rng.sample(range(2, 9), k)
    seq = [c for c, n in zip(cats, counts) for _ in range(n)]
    rng.shuffle(seq)
    return title, cats, counts, unit, seq


def _tally_prompt(title, seq):
    return f"{title}\n" + ", ".join(seq) + "."


def b_tally_fill(rng, skills, level=1):
    title, cats, counts, unit, seq = _tally(rng)
    tmpl = "\n".join(f"{_cap(c)}: □ {unit}" for c in cats)
    return mk("fill_blank", "Đếm rồi điền số.", _tally_prompt(title, seq), level, 90, skills, "; ".join(f"{c}: {n}" for c, n in zip(cats, counts)),
              [T("Kết quả kiểm đếm: " + "; ".join(f"{c}: {n} {unit}" for c, n in zip(cats, counts)) + ".")], "stat_count",
              **FB(tmpl, [(n, unit) for n in counts]))


def b_tally_mc(rng, skills, level=2, most=True):
    title, cats, counts, unit, seq = _tally(rng)
    best = cats[counts.index(max(counts) if most else min(counts))]
    word = "nhiều nhất" if most else "ít nhất"
    return mk("multiple_choice", "Chọn đáp án đúng.", _tally_prompt(title, seq) + f"\nLoại nào được ghi lại {word}?", level, 80, skills, best,
              [T("Kết quả kiểm đếm: " + "; ".join(f"{c}: {n}" for c, n in zip(cats, counts)) + "."), T(f"Vậy {best} được ghi lại {word}.")],
              "stat_count", **MC(rng, best, [c for c in cats if c != best]))


def b_tally_total(rng, skills, level=2):
    title, cats, counts, unit, seq = _tally(rng)
    s = sum(counts)
    return mk("fill_blank", "Điền số thích hợp.", _tally_prompt(title, seq) + f"\nCó tất cả bao nhiêu {unit} được ghi lại?", level, 80, skills, f"{s} {unit}",
              [T("Kết quả kiểm đếm: " + "; ".join(f"{c}: {n}" for c, n in zip(cats, counts)) + "."), E(" + ".join(map(str, counts)) + f" = {s}")],
              "stat_count", **FB(f"Có tất cả □ {unit}.", [(s, unit)]))


def b_tally_drag(rng, skills, level=2):
    title, cats, counts, unit, seq = _tally(rng)
    extra = next(v for v in range(2, 12) if v not in counts)
    tmpl = "\n".join(f"{_cap(c)}: □" for c in cats)
    return mk("drag_drop", "Đếm rồi kéo số vào ô.", _tally_prompt(title, seq), level, 90, skills, "; ".join(f"{c}: {n}" for c, n in zip(cats, counts)),
              [T("Kết quả kiểm đếm: " + "; ".join(f"{c}: {n}" for c, n in zip(cats, counts)) + ".")], "stat_count",
              **DD(rng, tmpl, [str(n) for n in counts], [str(extra)]))


TABLES = [
    ("Số cây các lớp khối Ba trồng được", ["Lớp 3A", "Lớp 3B", "Lớp 3C", "Lớp 3D"], "cây", (15, 48), "Lớp nào trồng được {} cây?"),
    ("Số quyển sách các bạn tổ Hai đọc trong tháng", ["An", "Bình", "Chi", "Dũng"], "quyển", (3, 15), "Bạn nào đọc được {} sách?"),
    ("Số học sinh tham gia các câu lạc bộ", ["Bóng đá", "Cờ vua", "Vẽ", "Bơi"], "bạn", (8, 30), "Câu lạc bộ nào có {} bạn tham gia?"),
    ("Số ki-lô-gam giấy vụn các lớp thu được", ["Lớp 3A", "Lớp 3B", "Lớp 3C", "Lớp 3D"], "kg", (20, 60), "Lớp nào thu được {} giấy vụn?"),
]


def _table(rng, grid=False):
    title, names, unit, (lo, hi), _q = rng.choice(TABLES)
    vals = rng.sample(range(lo, hi + 1), len(names))
    if grid:
        head = names[0].split(" ")[0] if names[0].startswith("Lớp") else "Tên"
        text = f"{title}:\n" + " | ".join([head] + [n.replace("Lớp ", "") if head == "Lớp" else n for n in names]) + "\n" + \
               " | ".join([f"Số {unit}"] + [str(v) for v in vals])
    else:
        text = f"{title}:\n" + "\n".join(f"{n}: {v} {unit}" for n, v in zip(names, vals))
    return text, names, vals, unit


def _table_q(names, most):
    for t in TABLES:
        if t[1] == names:
            return t[4].format("nhiều nhất" if most else "ít nhất") if "{}" in t[4] else t[4]
    raise KeyError(names)


def b_table_extreme(rng, skills, level=2, most=True, grid=False):
    text, names, vals, unit = _table(rng, grid)
    i = vals.index(max(vals) if most else min(vals))
    word = "nhiều nhất" if most else "ít nhất"
    q = _table_q(names, most)
    if "nhiều nhất" in q and not most:
        q = q.replace("nhiều nhất", "ít nhất")
    q = q.replace("được nhiều nhất cây", "được nhiều cây nhất").replace("được ít nhất cây", "được ít cây nhất")
    q = q.replace("được nhiều nhất sách", "được nhiều sách nhất").replace("được ít nhất sách", "được ít sách nhất")
    q = q.replace("có nhiều nhất bạn", "có nhiều bạn").replace("có ít nhất bạn", "có ít bạn")
    q = q.replace("được nhiều nhất giấy vụn", "được nhiều giấy vụn nhất").replace("được ít nhất giấy vụn", "được ít giấy vụn nhất")
    if q.startswith("Câu lạc bộ"):
        q = q.replace("tham gia?", "tham gia nhất?")
    return mk("multiple_choice", "Chọn đáp án đúng.", f"{text}\n{q}",
              level, 60, skills, names[i], [T(" < ".join(f"{v} ({n})" for v, n in sorted(zip(vals, names))) + ".")], "stat_table",
              **MC(rng, names[i], [n for n in names if n != names[i]]))


def b_table_read(rng, skills, level=1, grid=False):
    text, names, vals, unit = _table(rng, grid)
    i, j = rng.sample(range(4), 2)
    return mk("fill_blank", "Đọc bảng rồi điền số.", text, level, 50, skills, f"{vals[i]}; {vals[j]}",
              [T(f"Đọc trong bảng: {names[i]}: {vals[i]} {unit}; {names[j]}: {vals[j]} {unit}.")], "stat_table",
              **FB(f"{names[i]}: □ {unit}\n{names[j]}: □ {unit}", [(vals[i], unit), (vals[j], unit)]))


def b_table_total(rng, skills, level=2, grid=False):
    text, names, vals, unit = _table(rng, grid)
    s = sum(vals)
    return mk("fill_blank", "Điền số thích hợp.", f"{text}\nTính tổng số liệu của cả bảng.", level, 80, skills, f"{s} {unit}",
              [E(" + ".join(map(str, vals)) + f" = {s}")], "stat_table", **FB(f"Tổng cộng: □ {unit}.", [(s, unit)]))


def b_table_diff(rng, skills, level=2, grid=False, mode="fill"):
    text, names, vals, unit = _table(rng, grid)
    hi_i, lo_i = vals.index(max(vals)), vals.index(min(vals))
    d = vals[hi_i] - vals[lo_i]
    q = f"{names[hi_i]} nhiều hơn {names[lo_i]} bao nhiêu {unit}?"
    steps = [WP([(f"{names[hi_i]} nhiều hơn {names[lo_i]} số {unit} là:", f"{vals[hi_i]} - {vals[lo_i]} = {d} ({unit})")], f"{d} {unit}")]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", f"{text}\n{q}", level, 80, skills, f"{d} {unit}", steps, "stat_table",
                  **FB(f"{names[hi_i]} nhiều hơn {names[lo_i]} □ {unit}.", [(d, unit)]))
    wrong = pick_wrong(rng, d, [vals[hi_i] + vals[lo_i], d + 1, d - 1], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"{text}\n{q}", level, 80, skills, f"{d} {unit}", steps, "stat_table",
              **MC(rng, f"{d} {unit}", [f"{w} {unit}" for w in wrong]))


def b_table_order(rng, skills, level=2, grid=False):
    text, names, vals, unit = _table(rng, grid)
    srt = [n for _, n in sorted(zip(vals, names))]
    return mk("drag_drop", "Xếp theo số liệu từ bé đến lớn.", f"{text}\nKéo các tên vào ô trống theo thứ tự số liệu từ bé đến lớn.", level, 90, skills,
              " → ".join(srt), [T(" < ".join(f"{v} ({n})" for v, n in sorted(zip(vals, names))) + ".")], "stat_table",
              **DD(rng, " → ".join(["□"] * 4), srt))


def b_table_match(rng, skills, level=2, grid=False):
    text, names, vals, unit = _table(rng, grid)
    extra = next(v for v in range(min(vals), max(vals) + 10) if v not in vals)
    return mk("matching", "Nối theo bảng số liệu.", f"{text}\nNối mỗi tên với số liệu đúng.", level, 80, skills,
              "; ".join(f"{n}: {v}" for n, v in zip(names, vals)), [T("; ".join(f"{n}: {v} {unit}" for n, v in zip(names, vals)) + ".")], "stat_table",
              **MT(rng, [(n, f"{v} {unit}") for n, v in zip(names, vals)], [f"{extra} {unit}"]))


def b_table_word(rng, skills, level=3, grid=False):
    text, names, vals, unit = _table(rng, grid)
    i, j = rng.sample(range(4), 2)
    if vals[i] > vals[j]:
        i, j = j, i
    d = vals[j] - vals[i]
    q = f"{names[i]} cần thêm bao nhiêu {unit} nữa thì bằng {names[j]}?"
    return mk("fill_blank", "Giải bài toán.", f"{text}\n{q}", level, 100, skills, f"{d} {unit}",
              [WP([(f"Số {unit} {names[i]} cần thêm là:", f"{vals[j]} - {vals[i]} = {d} ({unit})")], f"{d} {unit}")], "stat_table",
              **FB(f"{names[i]} cần thêm □ {unit}.", [(d, unit)]))


PROB_WORDS = ["chắc chắn", "có thể", "không thể"]


def _box(rng):
    colors = ["đỏ", "xanh", "vàng", "trắng", "tím"]
    k = rnd(rng, 1, 3)
    cs = rng.sample(colors, k)
    counts = [rnd(rng, 1, 6) for _ in cs]
    absent = rng.choice([c for c in colors if c not in cs])
    desc = "Trong hộp có " + ", ".join(f"{n} quả bóng {c}" for c, n in zip(cs, counts)) + ". Không nhìn vào hộp, lấy ra 1 quả bóng."
    events = [(f"Lấy được quả bóng {c}", "chắc chắn" if k == 1 else "có thể") for c in cs] + [(f"Lấy được quả bóng {absent}", "không thể")]
    return desc, events


def _dice(rng):
    n = rnd(rng, 1, 6)
    desc = "Gieo một con xúc xắc (các mặt có từ 1 đến 6 chấm)."
    events = [(f"Mặt xuất hiện có {n} chấm", "có thể"), ("Mặt xuất hiện có 7 chấm", "không thể"),
              ("Mặt xuất hiện có số chấm bé hơn 7", "chắc chắn")]
    return desc, events


def _cards(rng):
    nums = sorted(rng.sample(range(1, 10), 4))
    absent = rng.choice([x for x in range(1, 10) if x not in nums])
    desc = "Trong túi có 4 tấm thẻ ghi các số " + ", ".join(map(str, nums)) + ". Không nhìn vào túi, rút ra 1 tấm thẻ."
    events = [(f"Rút được thẻ ghi số {rng.choice(nums)}", "có thể"), (f"Rút được thẻ ghi số {absent}", "không thể"),
              ("Rút được thẻ ghi số bé hơn 10", "chắc chắn")]
    return desc, events


def _scenario(rng, full=False):
    while True:
        desc, events = rng.choice([_box, _dice, _cards])(rng)
        if not full or {a for _, a in events} == set(PROB_WORDS):
            return desc, events


def b_prob_mc(rng, skills, level=1):
    desc, events = _scenario(rng)
    ev, ans = rng.choice(events)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"{desc}\nKhả năng “{ev[0].lower() + ev[1:]}” là:", level, 50, skills, ans,
              [T(H["probability"], "rule"), T(f"{ev}: {ans} xảy ra.")], "probability", **MC(rng, ans, [w for w in PROB_WORDS if w != ans]))


def b_prob_match(rng, skills, level=2):
    desc, events = _scenario(rng, full=True)
    chosen = []
    for w in PROB_WORDS:
        chosen.append(next(e for e in events if e[1] == w))
    rng.shuffle(chosen)
    return mk("matching", "Nối sự kiện với khả năng.", f"{desc}\nNối mỗi sự kiện với khả năng xảy ra của nó.", level, 90, skills,
              "; ".join(f"{e}: {a}" for e, a in chosen), [T(f"{e}: {a}.") for e, a in chosen], "probability", **MT(rng, chosen))


def b_prob_drag(rng, skills, level=2):
    desc, events = _scenario(rng, full=True)
    ev = events[:]
    rng.shuffle(ev)
    ev = ev[:3]
    tmpl = "\n".join(f"{e}: □" for e, _ in ev)
    return mk("drag_drop", "Kéo thẻ vào ô trống.", f"{desc}\nKéo “chắc chắn”, “có thể” hoặc “không thể” vào mỗi ô (một thẻ có thể dùng nhiều lần).",
              level, 90, skills, "; ".join(a for _, a in ev), [T(f"{e}: {a}.") for e, a in ev], "probability",
              **DD(rng, tmpl, [a for _, a in ev], [w for w in PROB_WORDS if w not in {a for _, a in ev}], reuse=True))


def b_prob_fill(rng, skills, level=3):
    if rng.random() < 0.5:
        r, b = rnd(rng, 2, 7), rnd(rng, 1, 5)
        prompt = f"Trong hộp có {r} quả bóng đỏ và {b} quả bóng xanh. Không nhìn vào hộp, phải lấy ra ít nhất bao nhiêu quả bóng để chắc chắn có một quả bóng xanh?"
        steps = [T(f"Nếu không may, {r} quả lấy ra đầu tiên đều là bóng đỏ. Lấy thêm 1 quả nữa thì chắc chắn có bóng xanh."), E(f"{r} + 1 = {r + 1}")]
        v = r + 1
        tmpl = "Phải lấy ra ít nhất □ quả bóng."
    else:
        k = rnd(rng, 2, 4)
        cols = ["đỏ", "xanh", "vàng", "tím"][:k]
        prompt = f"Trong túi có rất nhiều viên bi gồm {k} màu: {', '.join(cols)}. Không nhìn vào túi, phải lấy ra ít nhất bao nhiêu viên bi để chắc chắn có 2 viên bi cùng màu?"
        steps = [T(f"Nếu không may, {k} viên đầu tiên có {k} màu khác nhau. Lấy thêm 1 viên nữa thì chắc chắn có 2 viên cùng màu."), E(f"{k} + 1 = {k + 1}")]
        v = k + 1
        tmpl = "Phải lấy ra ít nhất □ viên bi."
    return mk("fill_blank", "Điền số thích hợp.", prompt, level, 100, skills, str(v), steps, "probability", **FB(tmpl, [v]))


def b_prob_count(rng, skills, level=2):
    cs = rng.sample(["đỏ", "xanh", "vàng", "trắng", "tím"], rnd(rng, 2, 4))
    counts = [rnd(rng, 1, 5) for _ in cs]
    desc = "Trong hộp có " + ", ".join(f"{n} quả bóng {c}" for c, n in zip(cs, counts)) + ". Lấy ra 1 quả bóng."
    return mk("fill_blank", "Điền số thích hợp.", f"{desc}\nCó thể lấy được quả bóng của mấy màu khác nhau?", level, 50, skills, str(len(cs)),
              [T("Có thể lấy được bóng " + ", ".join(cs) + f": tất cả {len(cs)} màu.")], "probability",
              **FB("Có thể lấy được bóng của □ màu khác nhau.", [len(cs)]))

# ---------------------------------------------------------------------------
# Một số dạng bổ sung
# ---------------------------------------------------------------------------


def b_polyline(rng, skills, level=2):
    n = rnd(rng, 3, 4)
    pts = letters(rng, n + 1)
    segs = [rnd(rng, 5, 30) for _ in range(n)]
    name = "".join(pts)
    s = sum(segs)
    desc = ", ".join(f"{pts[i]}{pts[i + 1]} = {v} cm" for i, v in enumerate(segs))
    return mk("fill_blank", "Điền số thích hợp.", f"Đường gấp khúc {name} có {desc}. Tính độ dài đường gấp khúc {name}.", level, 60, skills,
              f"{s} cm", [T(H["polyline"], "rule"), E(" + ".join(map(str, segs)) + f" = {s}")], "polyline",
              **FB(f"Đường gấp khúc {name} dài □ cm.", [(s, "cm")]))


def b_polyline_word(rng, skills, level=3):
    n = rnd(rng, 3, 5)
    a = rnd(rng, 3, 9)
    return mk("fill_blank", "Giải bài toán.", f"Một đường gấp khúc gồm {n} đoạn thẳng, mỗi đoạn dài {a} cm. Hỏi đường gấp khúc đó dài bao nhiêu xăng-ti-mét?",
              level, 80, skills, f"{a * n} cm", [WP([("Độ dài đường gấp khúc là:", f"{a} × {n} = {a * n} (cm)")], f"{a * n} cm"),
                                                  T("Các đoạn thẳng dài bằng nhau nên ta dùng phép nhân thay cho phép cộng.", "tip")], "word",
              **FB("Đường gấp khúc dài □ cm.", [(a * n, "cm")]))


def b_frac_mc(rng, skills, level=2):
    k = rnd(rng, 2, 9)
    x = rnd(rng, 2, 10)
    n = k * x
    u = rng.choice(FRAC_UNITS)
    wrong = pick_wrong(rng, x, [n - k, n - x, k if k != x else x + 2], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"1/{k} của {n}{u} là:", level, 40, skills, f"{x}{u}",
              [T(H["fraction"], "rule"), E(eq(n, ":", k))], "fraction", speak=f"Một phần {FRAC[k]} của {n}{u} là bao nhiêu?",
              **MC(rng, f"{x}{u}", [f"{w}{u}" for w in wrong]))


def b_table_word2(rng, ks, skills, level=3):
    k = rng.choice(ks)
    n = rnd(rng, 3, 9)
    x = k * n
    m = rnd(rng, 2, x - 2)
    r = x - m
    prompt = f"Mỗi hộp có {k} cái bánh. Mẹ mua {n} hộp bánh, cả nhà đã ăn {m} cái bánh. Hỏi còn lại bao nhiêu cái bánh?"
    steps = [WP([("Số bánh mẹ mua là:", f"{k} × {n} = {x} (cái)"), ("Số bánh còn lại là:", f"{x} - {m} = {r} (cái)")], f"{r} cái bánh")]
    if x >= 10 and m >= 10 and has_borrow(x, m) and len(str(r)) == len(str(x)):
        steps.append(col_sub(x, m))
    return mk("fill_blank", "Giải bài toán.", prompt, level, 120, skills, f"{r} cái bánh", steps, "two_step", **FB("Còn lại □ cái bánh.", [(r, "cái")]))


def b_two_drag(rng, skills, level=2):
    a = rnd(rng, 20, 50)
    b = rnd(rng, 5, 20)
    x = a + b
    r = a + x
    prompt = f"Thùng thứ nhất có {a} l nước, thùng thứ hai có nhiều hơn thùng thứ nhất {b} l nước. Kéo số thích hợp vào ô trống để hoàn thành bài giải."
    tmpl = f"Số nước ở thùng thứ hai là: {a} + {b} = □ (l)\nSố nước ở cả hai thùng là: {a} + □ = □ (l)"
    extra = next(v for v in (a - b, r + 10, x + 1) if v not in (x, r) and v > 0)
    return mk("drag_drop", "Kéo số vào ô trống.", prompt, level, 100, skills, f"{x}; {x}; {r}",
              [WP([("Số nước ở thùng thứ hai là:", f"{a} + {b} = {x} (l)"), ("Số nước ở cả hai thùng là:", f"{a} + {x} = {r} (l)")], f"{r} l nước")],
              "two_step", **DD(rng, tmpl, [str(x), str(x), str(r)], [str(extra)], reuse=True))


def b_chain_match(rng, skills, level=2):
    out = []
    while len(out) < 4:
        a, k, c = rnd(rng, 2, 9), rnd(rng, 2, 5), rnd(rng, 2, 9)
        f = rnd(rng, 0, 2)
        if f == 0:
            text, r, steps = f"Gấp {a} lên {k} lần rồi thêm {c}", a * k + c, [E(f"{a} × {k} = {a * k}"), E(f"{a * k} + {c} = {a * k + c}")]
        elif f == 1:
            x = a * k
            text, r, steps = f"Lấy {x} giảm đi {k} lần rồi thêm {c}", a + c, [E(f"{x} : {k} = {a}"), E(f"{a} + {c} = {a + c}")]
        else:
            text, r, steps = f"Lấy {a} thêm {c} rồi gấp lên {k} lần", (a + c) * k, [E(f"{a} + {c} = {a + c}"), E(f"{a + c} × {k} = {(a + c) * k}")]
        if r in {o[1] for o in out}:
            continue
        out.append((text, r, steps))
    extra = next(v for v in range(10, 99) if v not in {o[1] for o in out})
    return mk("matching", "Nối cho đúng.", "Tính theo hai bước rồi nối với kết quả đúng.", level, 120, skills,
              "; ".join(f"{t}: {r}" for t, r, _ in out), [st for _, _, sts in out for st in sts], "two_step",
              **MT(rng, [(t, str(r)) for t, r, _ in out], [str(extra)]))


def b_solid_compare(rng, skills, level=2):
    what = rng.choice(["số đỉnh", "số mặt", "số cạnh"])
    right = "Bằng nhau"
    return mk("multiple_choice", "Chọn đáp án đúng.", f"So sánh {what} của khối lập phương và khối hộp chữ nhật.", level, 40, skills, right,
              [T("Cả hai khối đều có 6 mặt, 12 cạnh và 8 đỉnh.")], "solid",
              **MC(rng, right, ["Khối lập phương nhiều hơn", "Khối hộp chữ nhật nhiều hơn"]))


def b_temp_range(rng, skills, level=3):
    days = ["thứ Hai", "thứ Ba", "thứ Tư"]
    ts = rng.sample(range(18, 36), 3)
    hi, lo = max(ts), min(ts)
    prompt = "Nhiệt độ cao nhất trong ngày đo được ở một thành phố:\n" + "\n".join(f"{_cap(d)}: {t} °C" for d, t in zip(days, ts)) + \
             "\nNgày nóng nhất có nhiệt độ cao hơn ngày mát nhất bao nhiêu độ C?"
    return mk("fill_blank", "Giải bài toán.", prompt, level, 80, skills, f"{hi - lo} °C",
              [WP([("Nhiệt độ ngày nóng nhất cao hơn ngày mát nhất là:", f"{hi} - {lo} = {hi - lo} (°C)")], f"{hi - lo} °C")], "temperature",
              **FB("Cao hơn □ °C.", [(hi - lo, "°C")]))


def b_cmp_match(rng, d, skills, level=2):
    pairs = []
    for sign in "<>=":
        a = n_digits(rng, d)
        if sign == "=":
            b = a
        else:
            s_ = list(str(a))
            i = rnd(rng, 1, d - 1)
            s_[i] = str((int(s_[i]) + rnd(rng, 1, 8)) % 10)
            b = int("".join(s_))
            if (sign == "<") != (a < b):
                a, b = b, a
        pairs.append((f"{fmt(a)} ... {fmt(b)}", sign, a, b))
    rng.shuffle(pairs)
    return mk("matching", "Nối với dấu thích hợp.", "Nối mỗi cặp số với dấu >, < hoặc = thích hợp.", level, 80, skills,
              "; ".join(f"{fmt(a)} {s_} {fmt(b)}" for _, s_, a, b in pairs), [T(compare_text(a, b)[1]) for _, _, a, b in pairs], "compare",
              **MT(rng, [(l, r) for l, r, _, _ in pairs]))


def b_area_read_match(rng, skills, level=2):
    ns = rng.sample(range(11, 99), 4)
    extra = next(v for v in range(11, 99) if v not in ns)
    return mk("matching", "Nối số đo với cách đọc.", "Nối mỗi số đo diện tích với cách đọc đúng.", level, 80, skills,
              "; ".join(f"{n} cm²: {words(n)} xăng-ti-mét vuông" for n in ns), [T(f"{n} cm² đọc là {words(n)} xăng-ti-mét vuông.") for n in ns], "area_count",
              **MT(rng, [(f"{n} cm²", f"{words(n)} xăng-ti-mét vuông") for n in ns], [f"{words(extra)} xăng-ti-mét vuông"]))


def b_area_count_drag(rng, skills, level=2):
    cs = []
    while len(cs) < 3:
        r_, c_ = rnd(rng, 2, 5), rnd(rng, 2, 6)
        if r_ * c_ in {x * y for x, y in cs}:
            continue
        cs.append((r_, c_))
    vals = [x * y for x, y in cs]
    extra = next(v for v in range(4, 40) if v not in vals and v != vals[0] + 1) 
    tmpl = "\n".join(f"Hình gồm {x} hàng, mỗi hàng {y} ô vuông 1 cm²: □ cm²" for x, y in cs)
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo diện tích đúng của mỗi hình vào ô trống.", level, 80, skills, "; ".join(f"{v} cm²" for v in vals),
              [E(f"{y} × {x} = {x * y}") for x, y in cs], "area_count", **DD(rng, tmpl, [str(v) for v in vals], [str(extra)]))


def b_area_count_diff(rng, skills, level=3):
    while True:
        a1, b1, a2, b2 = rnd(rng, 2, 5), rnd(rng, 3, 7), rnd(rng, 2, 5), rnd(rng, 3, 7)
        s1, s2 = a1 * b1, a2 * b2
        if s1 != s2:
            break
    big, small = ("A", "B") if s1 > s2 else ("B", "A")
    d = abs(s1 - s2)
    prompt = (f"Hình A gồm {a1} hàng, mỗi hàng {b1} ô vuông 1 cm². Hình B gồm {a2} hàng, mỗi hàng {b2} ô vuông 1 cm². "
              f"Hình nào có diện tích lớn hơn và lớn hơn bao nhiêu xăng-ti-mét vuông?")
    lines = [("Diện tích hình A là:", f"{b1} × {a1} = {s1} (cm²)"), ("Diện tích hình B là:", f"{b2} × {a2} = {s2} (cm²)"),
             (f"Hình {big} có diện tích lớn hơn hình {small} là:", f"{max(s1, s2)} - {min(s1, s2)} = {d} (cm²)")]
    return mk("fill_blank", "Giải bài toán.", prompt, level, 120, skills, f"Hình {big}, lớn hơn {d} cm²", [WP(lines, f"hình {big} lớn hơn {d} cm²")],
              "two_step", **FB(f"Hình {big} có diện tích lớn hơn hình {small} là □ cm².", [(d, "cm²")]))

# ===========================================================================
# CÁC BÀI HỌC
# ===========================================================================
GT1, GT2 = "giai_toan.mot_phep_tinh", "giai_toan.hai_phep_tinh"
MAXR = {2: 99, 3: 999, 4: 9999, 5: 100000}
OP_SKILL = {
    ("+", 2): "cong_tru.pham_vi_100", ("-", 2): "cong_tru.pham_vi_100",
    ("+", 3): "cong_tru.pham_vi_1000", ("-", 3): "cong_tru.pham_vi_1000",
    ("+", 4): "cong_tru.pham_vi_10000", ("-", 4): "cong_tru.pham_vi_10000",
    ("+", 5): "cong_tru.pham_vi_100000", ("-", 5): "cong_tru.pham_vi_100000",
    ("×", 2): "nhan.2cs_1cs.co_nho", ("×", 3): "nhan.3cs_1cs", ("×", 4): "nhan.4cs_1cs", ("×", 5): "nhan.5cs_1cs",
    (":", 2): "chia.2cs_1cs", (":", 3): "chia.3cs_1cs", (":", 4): "chia.4cs_1cs", (":", 5): "chia.5cs_1cs",
}


def pick_for(rng, op, d, carry=True, d2=None, zero=False):
    if op == "+":
        return pick_add(rng, d, carry, d2)
    if op == "-":
        return pick_sub(rng, d, carry, d2)
    if op == "×":
        return pick_mul(rng, d, MAXR[d], carry)
    return pick_div(rng, d, False, zero)


def gen_for(ops, d):
    def g(rng):
        op = rng.choice(ops)
        a, b = pick_for(rng, op, d, rng.random() < 0.75, rng.choice([d, d - 1]) if op in "+-" and d > 2 else None)
        return a, op, b
    return g


def calc_p(rng, op, d, level, mode="fill", carry=True, d2=None, zero=False, skills=None):
    a, b = pick_for(rng, op, d, carry, d2, zero)
    sk = skills or [OP_SKILL[(op, d)]]
    if op == "×" and d == 2:
        sk = ["nhan.2cs_1cs.co_nho" if any(digit(a, p) * b >= 10 for p in range(2)) else "nhan.2cs_1cs.khong_nho"]
    return b_calc(rng, a, op, b, sk, level, mode)


def word_p(rng, op, d, level, mode="fill", kind=None, extra=()):
    a, b = pick_for(rng, op, d, rng.random() < 0.7, None)
    return b_word(rng, op, a, b, [OP_SKILL[(op, d)], GT1, *extra], level, mode, kind)


def theory(rule, example, tip=None):
    blocks = [T(rule, "rule")] + example
    if tip:
        blocks.append(T(tip, "tip"))
    return blocks


def ex_calc(rng, op, d, carry=True, zero=False):
    a, b = pick_for(rng, op, d, carry, None, zero)
    return [T(f"Ví dụ: {fmt(a)} {op} {fmt(b)} = ?")] + calc_steps(a, op, b)


CALC_RULE = {
    "+": ("Đặt tính sao cho các chữ số cùng hàng thẳng cột với nhau. Cộng lần lượt từ phải sang trái, bắt đầu từ hàng đơn vị.",
          "Hàng nào cộng được từ 10 trở lên thì viết chữ số hàng đơn vị và nhớ 1 sang hàng bên trái."),
    "-": ("Đặt tính thẳng cột rồi trừ lần lượt từ phải sang trái. Nếu chữ số trên bé hơn thì lấy thêm 10 để trừ và nhớ 1 sang hàng bên trái của số trừ.",
          "Thử lại: lấy hiệu cộng với số trừ phải được số bị trừ."),
    "×": ("Đặt tính rồi nhân thừa số có một chữ số lần lượt với từng chữ số của thừa số kia, từ phải sang trái.",
          "Nhân xong mỗi hàng, đừng quên cộng thêm số nhớ của lượt trước."),
    ":": ("Chia lần lượt từ trái sang phải: mỗi lượt chia, nhân rồi trừ, sau đó hạ chữ số tiếp theo xuống.",
          "Lượt nào số đem chia bé hơn số chia thì viết 0 ở thương rồi hạ tiếp. Thử lại bằng phép nhân."),
}
WORD2_KINDS = {"+": ["more_total", "less_total"], "-": ["sub_sub", "mul_sub"], "×": ["mul_add", "add_mul", "times_total"],
               ":": ["div_add", "frac_rest", "down_used"]}


def calc_lesson(op, d):
    """Bài học phép tính với số có d chữ số (dùng cho cộng, trừ, nhân, chia)."""
    def build(rng):
        sk = [OP_SKILL[(op, d)]]
        M = MAXR[d] + 1 if d < 5 else 100000
        rule, tip = CALC_RULE[op]
        th = theory(rule, ex_calc(rng, op, d), tip)
        g = gen_for([op], d)
        if op == ":":
            ps = [calc_p(rng, op, d, 1), calc_p(rng, op, d, 1, zero=True), calc_p(rng, op, d, 2, "mc"),
                  b_calc_drag(rng, g, sk, 2), b_calc_match(rng, g, sk, 2)]
            a, k = pick_div(rng, d, rem=True)
            ps.append(b_div_rem(rng, a, k, sk + ["chia.co_du"], 2))
        else:
            ps = [calc_p(rng, op, d, 1, carry=False), calc_p(rng, op, d, 1), calc_p(rng, op, d, 2, "mc", d2=d - 1 if op in "+-" else None),
                  b_calc_drag(rng, g, sk, 2), b_calc_match(rng, g, sk, 2)]
            if op == "+":
                ps.append(b_find(rng, "addend1", M, sk + ["tim_thanh_phan.so_hang"], 2))
            elif op == "-":
                ps.append(b_find(rng, rng.choice(["minuend", "subtrahend"]), M, sk + ["tim_thanh_phan.so_bi_tru"], 2))
            else:
                ps.append(b_calc_extreme(rng, g, sk + ["so_sanh.ket_qua"], 3))
        kind = {"+": "more", "-": "less"}.get(op)
        ps += [word_p(rng, op, d, 2), word_p(rng, op, d, 3, "mc", kind),
               b_word2(rng, rng.choice(WORD2_KINDS[op]), M, sk + [GT2], 3)]
        return th, ps
    return build


def table_lesson(ks):
    def build(rng):
        k = ks[-1]
        sk = ["bang_nhan_chia"]
        a = rnd(rng, 2, 10)
        names = ", ".join(map(str, ks))
        rows = [T(f"Bảng nhân {kk}: " + "; ".join(f"{kk} × {i} = {kk * i}" for i in range(1, 11)) + ".") for kk in ks]
        th = theory(f"Trong bảng nhân {names}, mỗi lần thêm một lần thừa số thì tích tăng thêm đúng số đó. Bảng chia là phép tính ngược của bảng nhân.",
                    rows + [E(eq(k, "×", a))] + ([E(eq(k * a, ":", k))] if len(ks) == 1 else []),
                    f"Đếm thêm {k} để nhớ bảng: " + ", ".join(str(k * i) for i in range(1, 6)) + ", …")
        kd = rng.choice(ks)
        ps = [b_table_fill(rng, ks, sk, 1), b_table_count(rng, k, sk, 1),
              b_calc(rng, k * rnd(rng, 2, 10), ":", k, sk, 1, "mc"),
              b_table_missing(rng, ks, sk + ["tim_thanh_phan.thua_so"], 2), b_calc_drag(rng, table_gen(ks), sk, 2),
              b_calc_match(rng, table_gen(ks), sk, 2),
              b_word(rng, "×", rng.choice(ks), rnd(rng, 2, 10), sk + [GT1], 2),
              b_word(rng, ":", kd * rnd(rng, 2, 10), kd, sk + [GT1], 3, "mc"),
              b_table_word2(rng, ks, sk + [GT2], 3)]
        return th, ps
    return build


def numbers_lesson(d, skill):
    def build(rng):
        sk = [skill]
        n = n_digits(rng, d, zeros=True)
        names = ", ".join(PLACE[:d][::-1])
        th = theory(f"Số có {d} chữ số gồm các hàng: {names}. Đọc và viết số từ hàng cao nhất đến hàng đơn vị.",
                    [T(f"Ví dụ: {fmt(n)} đọc là “{words(n)}”."), E(f"{fmt(n)} = {expand(n)}")],
                    "Chữ số 0 ở hàng trăm đọc là “không trăm”, ở hàng chục (khi hàng đơn vị khác 0) đọc là “linh”.")
        ps = [b_num_read_mc(rng, d, sk, 1), b_num_words_mc(rng, d, sk, 1), b_num_place_fill(rng, d, sk, 1),
              b_num_compose_fill(rng, d, sk, 1), b_num_next_fill(rng, d, sk, 2), b_num_match_words(rng, d, sk, 2),
              b_num_seq(rng, d, sk, 2, "drag"), b_num_expand_mc(rng, d, sk, 2), b_num_extreme_fill(rng, d, sk, 2),
              b_num_digits(rng, d, sk, 3)]
        return th, ps
    return build


def compare_lesson(d):
    def build(rng):
        sk = ["so.so_sanh"]
        a = n_digits(rng, d)
        b = a + 10 ** rnd(rng, 0, d - 2) * rnd(rng, 1, 3)
        if len(str(b)) != d:
            b = a - 10
        th = theory("Số nào có nhiều chữ số hơn thì lớn hơn. Nếu hai số có cùng số chữ số thì so sánh từng cặp chữ số cùng hàng, bắt đầu từ hàng cao nhất.",
                    [T("Ví dụ: " + compare_text(a, b)[1])], "Muốn xếp các số từ bé đến lớn, hãy tìm số bé nhất trước.")
        ps = [b_num_compare_mc(rng, d, sk, 1), b_num_compare_mc(rng, d, sk, 1, d2=d - 1), b_num_extreme_mc(rng, d, sk, 2, True),
              b_num_extreme_mc(rng, d, sk, 2, False), b_num_order_drag(rng, d, sk, 2), b_cmp_match(rng, d, sk, 2),
              b_num_extreme_fill(rng, d, sk, 2), b_num_compare_word(rng, d, sk, 3), b_num_digits(rng, d, sk, 3)]
        return th, ps
    return build


def rounding_lesson(d, bases):
    def build(rng):
        sk = ["so.lam_tron"]
        n = _round_num(rng, d, bases[0])
        th = theory("Khi làm tròn số đến một hàng, ta nhìn chữ số ở hàng ngay bên phải: nếu bé hơn 5 thì làm tròn xuống, nếu lớn hơn hoặc bằng 5 thì làm tròn lên.",
                    [T(f"Ví dụ: làm tròn {fmt(n)} đến hàng {ROUND_NAME[bases[0]]}.")] + round_steps(n, bases[0]),
                    "Làm tròn số giúp ta nói gần đúng một số đo, ví dụ “khoảng 2.000 người”.")
        b1, b2 = bases
        ps = [b_round_fill(rng, d - 1 if b1 <= 10 ** (d - 2) and d > 3 else d, b1, sk, 1), b_round_fill(rng, d, b1, sk, 1),
              b_round_fill(rng, d, b2, sk, 1), b_round_mc(rng, d, b2, sk, 2), b_round_match(rng, d, bases, sk, 2),
              b_round_drag(rng, d, bases, sk, 2), b_round_mc(rng, d, b1, sk, 2), b_round_word(rng, d, b2, sk, 3),
              b_round_word(rng, d, b1, sk, 3, "mc")]
        return th, ps
    return build


# ---------------------------- Chủ đề 1 ------------------------------------
def L_c1_so(rng):
    sk = ["so.pham_vi_1000"]
    n = n_digits(rng, 3, zeros=True)
    th = theory("Số có ba chữ số gồm hàng trăm, hàng chục và hàng đơn vị. So sánh hai số có ba chữ số: so sánh từ hàng trăm.",
                [T(f"Ví dụ: {n} gồm {digit(n, 2)} trăm, {digit(n, 1)} chục và {digit(n, 0)} đơn vị; đọc là “{words(n)}”."), E(f"{n} = {expand(n)}")],
                "Chữ số 0 ở hàng chục đọc là “linh”, ví dụ 105 đọc là “một trăm linh năm”.")
    ps = [b_num_read_mc(rng, 3, sk, 1), b_num_words_mc(rng, 3, sk, 1), b_num_place_fill(rng, 3, sk, 1), b_num_next_fill(rng, 3, sk, 1),
          b_num_compare_mc(rng, 3, sk, 2), b_num_match_words(rng, 3, sk, 2), b_num_order_drag(rng, 3, sk, 2),
          b_num_extreme_mc(rng, 3, sk, 2), b_num_digits(rng, 3, sk, 3)]
    return th, ps


def L_c1_congtru(rng):
    sk = ["cong_tru.pham_vi_1000"]
    th = theory(CALC_RULE["+"][0], ex_calc(rng, "+", 3), "Phép trừ cũng đặt tính thẳng cột và trừ từ hàng đơn vị; thử lại bằng phép cộng.")
    g = gen_for(["+", "-"], 3)
    ps = [calc_p(rng, "+", 2, 1), calc_p(rng, "-", 2, 1), calc_p(rng, "+", 3, 2), calc_p(rng, "-", 3, 2, "mc"),
          b_calc_drag(rng, g, sk, 2), b_calc_match(rng, g, sk, 2), word_p(rng, "+", 3, 2),
          word_p(rng, "-", 3, 3, "mc", "less"), word_p(rng, "+", 3, 3, "fill", "more")]
    return th, ps


def L_c1_timthanhphan(rng):
    s1, s2 = ["tim_thanh_phan.so_hang"], ["tim_thanh_phan.so_bi_tru"]
    expr, x, solve, check = find_case(rng, "addend1", 1000)
    th = theory("Muốn tìm số hạng chưa biết, ta lấy tổng trừ đi số hạng đã biết. Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ; muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu.",
                [T(f"Ví dụ: {expr}"), E(eq(*solve)), T(f"Vậy số cần tìm là {fmt(x)}.")], "Tìm xong, con thay số vào phép tính để thử lại nhé.")
    ps = [b_find(rng, "addend1", 100, s1, 1), b_find(rng, "addend2", 1000, s1, 1), b_find(rng, "minuend", 1000, s2, 2),
          b_find(rng, "subtrahend", 1000, s2, 2), b_find(rng, rng.choice(["addend1", "minuend"]), 1000, s1 + s2, 2, "mc"),
          b_find_match(rng, ["addend1", "addend2", "minuend", "subtrahend"], 100, s1 + s2, 2),
          b_find_drag(rng, ["addend1", "minuend", "subtrahend"], 1000, s1 + s2, 2),
          b_find_word(rng, "minuend", 100, s2 + [GT1], 3), b_find_word(rng, "addend", 1000, s1 + [GT1], 3, "mc")]
    return th, ps


def L_c1_hinhdo(rng):
    sh, dd, kl, dt_ = ["hinh_hoc.da_giac"], ["do_luong.do_dai"], ["do_luong.khoi_luong"], ["do_luong.dung_tich"]
    th = theory("Nhớ các đơn vị đo đã học: 1 m = 10 dm, 1 dm = 10 cm, 1 m = 100 cm, 1 km = 1.000 m. Đo khối lượng dùng ki-lô-gam (kg), đo dung tích dùng lít (l).",
                [T("Ví dụ: 3 m = 300 cm vì 1 m = 100 cm."), E("3 × 100 = 300")], "Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng của nó.")
    a, b = pick_add(rng, 2, True)
    c, d = pick_sub(rng, 2, True)
    ps = [b_shape_count(rng, sh, 1), b_conv_fill(rng, [("m", "dm"), ("dm", "cm"), ("m", "cm")], dd, 1),
          b_unit_calc(rng, "kg", kl, 1, "+"), b_unit_calc(rng, "l", dt_, 1, "-"), b_polyline(rng, dd + ["hinh_hoc.hinh_phang"], 2),
          b_conv_match(rng, [("m", "cm"), ("dm", "cm"), ("km", "m"), ("m", "dm")], dd, 2), b_unit_order(rng, "m", "cm", dd, 2),
          b_word(rng, "-", c, d, ["cong_tru.pham_vi_100", GT1], 2, "mc", "less"), b_polyline_word(rng, dd + [GT1], 3)]
    del a, b
    return th, ps


def L_c1_ltc(rng):
    th = theory("Ôn lại: đọc, so sánh số có ba chữ số; cộng, trừ có nhớ; bảng nhân, bảng chia 2, 3, 4, 5.",
                ex_calc(rng, "+", 3), "Làm xong, con thử lại kết quả bằng phép tính ngược nhé.")
    ps = [b_num_compare_mc(rng, 3, ["so.pham_vi_1000"], 1), calc_p(rng, "+", 3, 1), b_find(rng, "addend1", 1000, ["tim_thanh_phan.so_hang"], 2),
          b_table_missing(rng, [3, 4], ["bang_nhan_chia"], 2), b_calc_drag(rng, table_gen([2, 3, 4, 5]), ["bang_nhan_chia"], 2),
          b_calc_match(rng, gen_for(["+", "-"], 3), ["cong_tru.pham_vi_1000"], 2), calc_p(rng, "-", 3, 2, "mc"),
          b_word(rng, "×", rng.choice([3, 4]), rnd(rng, 3, 10), ["bang_nhan_chia", GT1], 3),
          b_table_word2(rng, [3, 4, 5], ["bang_nhan_chia", GT2], 3)]
    return th, ps


# ---------------------------- Chủ đề 2 ------------------------------------
def L_c2_timthanhphan(rng):
    sf, sd, sc = ["tim_thanh_phan.thua_so"], ["tim_thanh_phan.so_bi_chia"], ["tim_thanh_phan.so_chia"]
    expr, x, solve, check = find_case(rng, "factor1", 100)
    th = theory("Muốn tìm thừa số chưa biết, ta lấy tích chia cho thừa số đã biết. Muốn tìm số bị chia, ta lấy thương nhân với số chia; muốn tìm số chia, ta lấy số bị chia chia cho thương.",
                [T(f"Ví dụ: {expr}"), E(eq(*solve)), T("Thử lại:"), E(eq(*check))])
    kinds = ["factor1", "factor2", "dividend", "divisor"]
    ps = [b_find(rng, "factor1", 100, sf, 1), b_find(rng, "factor2", 100, sf, 1), b_find(rng, "dividend", 100, sd, 2),
          b_find(rng, "divisor", 100, sc, 2), b_find(rng, rng.choice(kinds), 100, sf + sd + sc, 2, "mc"),
          b_find_match(rng, kinds, 100, sf + sd + sc, 2), b_find_drag(rng, kinds, 100, sf + sd + sc, 2),
          b_find_word(rng, "dividend", 100, sd + [GT1], 3), b_find_word(rng, "divisor", 100, sf + [GT1], 3, "mc")]
    return th, ps


def L_c2_motphanmay(rng):
    sk = ["phan_so.mot_phan"]
    k, x = rnd(rng, 2, 6), rnd(rng, 2, 9)
    th = theory("Chia một hình hay một số thành các phần bằng nhau, mỗi phần là “một phần mấy”. Muốn tìm 1/k của một số, ta lấy số đó chia cho k.",
                [T(f"Ví dụ: 1/{k} của {k * x} là:"), E(eq(k * x, ":", k))], "1/2 đọc là “một phần hai”, 1/4 đọc là “một phần tư”.")
    ps = [b_frac_concept(rng, sk, 1), b_frac_fill(rng, sk, 1), b_frac_mc(rng, sk, 1), b_frac_match(rng, sk, 2), b_frac_drag(rng, sk, 2),
          b_frac_word(rng, sk + [GT1], 2), b_frac_word(rng, sk + [GT1], 3, "mc"), b_word2(rng, "frac_rest", 100, sk + [GT2], 3)]
    return th, ps


def L_c2_ltc(rng):
    th = theory("Ôn lại bảng nhân, bảng chia 6, 7, 8, 9; tìm thành phần chưa biết; tìm một phần mấy của một số.",
                [E(eq(7, "×", 8)), E(eq(56, ":", 7)), E(eq(56, ":", 8))], "Từ một phép nhân, ta viết được hai phép chia.")
    ks = [6, 7, 8, 9]
    sk = ["bang_nhan_chia"]
    kd = rng.choice(ks)
    ps = [b_table_fill(rng, ks, sk, 1), b_table_missing(rng, ks, sk + ["tim_thanh_phan.thua_so"], 1),
          b_find(rng, "factor1", 100, ["tim_thanh_phan.thua_so"], 2), b_frac_fill(rng, ["phan_so.mot_phan"], 2),
          b_calc_drag(rng, table_gen(ks), sk, 2), b_calc_match(rng, table_gen(ks), sk, 2),
          b_word(rng, ":", kd * rnd(rng, 2, 10), kd, sk + [GT1], 2, "mc"), b_frac_word(rng, ["phan_so.mot_phan", GT1], 3),
          b_table_word2(rng, ks, sk + [GT2], 3)]
    return th, ps


# ---------------------------- Chủ đề 3 ------------------------------------
def L_c3_trungdiem(rng):
    sk = ["hinh_hoc.hinh_phang"]
    x = rnd(rng, 3, 9)
    th = theory("M là trung điểm của đoạn thẳng AB khi M nằm giữa A và B, và AM = MB.",
                [T(f"Ví dụ: AB = {2 * x} cm, M là trung điểm của AB thì AM = MB ="), E(f"{2 * x} : 2 = {x}"), T(f"Vậy AM = MB = {x} cm.")],
                "Muốn tìm trung điểm, con đo độ dài đoạn thẳng rồi chia đôi.")
    ps = [b_mid_between(rng, sk, 1), b_mid_half(rng, sk, 1), b_mid_half(rng, sk, 2, double=True), b_mid_check(rng, sk, 2),
          b_mid_match(rng, sk, 2), b_mid_drag(rng, sk, 2), b_mid_unit(rng, sk + ["do_luong.do_dai"], 3), b_mid_word(rng, sk + [GT1], 3)]
    return th, ps


def L_c3_hinhtron(rng):
    sk = ["hinh_hoc.hinh_phang"]
    r = rnd(rng, 2, 9)
    th = theory("Hình tròn có tâm O. Đoạn thẳng nối tâm với một điểm trên đường tròn là bán kính; đoạn thẳng đi qua tâm, nối hai điểm trên đường tròn là đường kính.",
                [T(f"Ví dụ: bán kính {r} cm thì đường kính dài:"), E(f"{r} × 2 = {2 * r}")], "Đường kính dài gấp 2 lần bán kính; tâm là trung điểm của đường kính.")
    ps = [b_circle_concept(rng, sk, 1, which=1), b_circle_fill(rng, sk, 1, True), b_circle_fill(rng, sk, 1, False),
          b_circle_concept(rng, sk, 2, which=rng.choice([0, 2, 3, 4])), b_circle_match(rng, sk, 2), b_circle_drag(rng, sk, 2),
          b_circle_compare(rng, sk, 3), b_circle_word(rng, sk + [GT1], 3), b_circle_word(rng, sk + [GT1], 3, "mc")]
    return th, ps


def L_c3_goc(rng):
    sk = ["hinh_hoc.goc"]
    o, a, b = letters(rng, 3)
    th = theory("Góc được tạo bởi hai cạnh chung một đỉnh. Dùng ê ke để kiểm tra góc vuông và góc không vuông.",
                [T(f"Ví dụ: góc đỉnh {o}, cạnh {o}{a}, {o}{b}."), T("Lúc 3 giờ, kim giờ và kim phút tạo thành một góc vuông.")],
                "Hình vuông và hình chữ nhật đều có 4 góc vuông.")
    ps = [b_angle_tool(rng, sk, 1), b_angle_vertex(rng, sk, 1), b_angle_count(rng, sk, 1), b_angle_clock(rng, sk, 2),
          b_angle_quad(rng, sk, 2), b_angle_match(rng, sk, 2), b_angle_drag(rng, sk, 2), b_angle_word(rng, sk + [GT2], 3)]
    return th, ps


def L_c3_dagiac(rng):
    sk = ["hinh_hoc.da_giac"]
    a, b = rnd(rng, 5, 9), rnd(rng, 2, 4)
    th = theory("Hình tam giác có 3 cạnh, 3 đỉnh; hình tứ giác có 4 cạnh, 4 đỉnh. Hình chữ nhật có 4 góc vuông, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau; hình vuông có 4 góc vuông và 4 cạnh bằng nhau.",
                [T(f"Ví dụ: hình chữ nhật ABCD có AB = {a} cm, BC = {b} cm thì CD = {a} cm, DA = {b} cm.")])
    ps = [b_shape_count(rng, sk, 1), b_shape_prop(rng, sk, 1), b_shape_rect_side(rng, sk, 2), b_shape_rect_side(rng, sk, 2, "mc"),
          b_shape_match(rng, sk, 2), b_shape_drag(rng, sk, 2), b_shape_sum(rng, sk, 3), b_shape_word(rng, sk + [GT2], 3)]
    return th, ps


def L_c3_thuchanhve(rng):
    sk = ["hinh_hoc.goc", "hinh_hoc.hinh_phang", "hinh_hoc.da_giac"]
    r = rnd(rng, 2, 5)
    th = theory("Dùng ê ke để vẽ góc vuông, dùng com-pa để vẽ đường tròn, dùng thước để vẽ đoạn thẳng có độ dài cho trước.",
                [T(f"Ví dụ: muốn vẽ đường tròn bán kính {r} cm, ta mở com-pa rộng {r} cm, đặt đầu nhọn vào tâm rồi quay một vòng.")],
                "Vẽ hình chữ nhật: vẽ cạnh dài trước, dùng ê ke vẽ hai góc vuông, lấy hai cạnh ngắn bằng nhau rồi nối lại.")
    ps = [b_draw_tool(rng, sk, 1), b_draw_compass(rng, sk, 1), b_draw_radius(rng, sk, 1), b_draw_grid(rng, sk, 1),
          b_draw_compass(rng, sk, 2, from_d=True), b_draw_tool_match(rng, sk, 2), b_draw_steps(rng, sk, 2),
          b_draw_rect_word(rng, sk + [GT1], 2), b_draw_square(rng, sk, 3)]
    return th, ps


def L_c3_khoi(rng):
    sk = ["hinh_hoc.khoi"]
    th = theory("Khối lập phương và khối hộp chữ nhật đều có 6 mặt, 12 cạnh và 8 đỉnh. Các mặt của khối lập phương là hình vuông.",
                [T("Ví dụ: con xúc xắc có dạng khối lập phương; hộp sữa tươi có dạng khối hộp chữ nhật.")])
    ps = [b_solid_count(rng, sk, 1), b_solid_obj(rng, sk, 1), b_solid_face(rng, sk, 1), b_solid_match(rng, sk, 2),
          b_solid_drag(rng, sk, 2), b_solid_compare(rng, sk, 2), b_solid_word(rng, sk + [GT1], 2), b_solid_word(rng, sk + [GT1], 3, "mc")]
    return th, ps


def L_c3_ltc(rng):
    hp, g, dg, kh = ["hinh_hoc.hinh_phang"], ["hinh_hoc.goc"], ["hinh_hoc.da_giac"], ["hinh_hoc.khoi"]
    th = theory("Ôn lại: trung điểm, hình tròn, góc vuông, các hình phẳng và khối hình đã học.",
                [T("Trung điểm chia đôi đoạn thẳng. Đường kính gấp đôi bán kính. Hình vuông có 4 góc vuông.")])
    ps = [b_mid_half(rng, hp, 1), b_circle_fill(rng, hp, 1), b_shape_prop(rng, dg, 1), b_solid_count(rng, kh, 1),
          b_angle_clock(rng, g, 2), b_circle_match(rng, hp, 2), b_shape_drag(rng, dg, 2), b_circle_word(rng, hp + [GT1], 3),
          b_angle_word(rng, g + [GT2], 3)]
    return th, ps


# ---------------------------- Chủ đề 4 ------------------------------------
def L_c4_gap(rng):
    sk = ["gap_giam.so_lan"]
    a, k = rnd(rng, 3, 9), rnd(rng, 2, 5)
    th = theory(H["times_up"], [T(f"Ví dụ: gấp {a} lên {k} lần được:"), E(eq(a, "×", k))],
                f"Đừng nhầm: gấp {a} lên {k} lần là {a} × {k}, còn thêm {k} vào {a} là {a} + {k}.")
    ps = [b_times_fill(rng, True, sk, 1), b_times_mc(rng, True, sk, 1), b_times_fill(rng, True, sk + ["nhan.2cs_1cs.co_nho"], 2, big=True),
          b_times_mc(rng, True, sk + ["nhan.2cs_1cs.co_nho"], 2, big=True), b_times_drag(rng, sk, 2, dirs=(True,)),
          b_times_match(rng, sk, 2, dirs=(True,)), b_times_word(rng, True, sk + [GT1], 2),
          b_times_word(rng, True, sk + [GT1, "nhan.2cs_1cs.co_nho"], 3, "mc", big=True), b_word2(rng, "times_total", 100, sk + [GT2], 3)]
    return th, ps


def L_c4_chiadu(rng):
    sk = ["chia.co_du"]
    k = rnd(rng, 3, 9)
    q, r = rnd(rng, 2, 9), rnd(rng, 1, k - 1)
    a = q * k + r
    th = theory("Phép chia có số dư bằng 0 là phép chia hết; số dư khác 0 là phép chia có dư. Số dư luôn bé hơn số chia.",
                [T(f"Ví dụ: {a} : {k} = {q} (dư {r})"), long_div(a, k), T("Thử lại:"), E(f"{q} × {k} + {r} = {a}")])
    a1, k1 = pick_div(rng, 2, rem=True)
    ps = [b_rem_exact_mc(rng, sk, 1), b_div_rem(rng, rnd(rng, 2, 9) * k + rnd(rng, 1, k - 1), k, sk, 1), b_div_rem(rng, a1, k1, sk + ["chia.2cs_1cs"], 2),
          b_rem_max_mc(rng, sk, 2), b_rem_match(rng, sk, 2), b_rem_drag(rng, sk, 2), b_rem_word(rng, sk + [GT1], 3),
          b_rem_word(rng, sk + [GT1], 3, ceil=True), b_rem_find_dividend(rng, sk, 3)]
    return th, ps


def L_c4_giam(rng):
    sk = ["gap_giam.so_lan"]
    a, k = rnd(rng, 3, 9), rnd(rng, 2, 5)
    th = theory(H["times_down"], [T(f"Ví dụ: giảm {a * k} đi {k} lần được:"), E(eq(a * k, ":", k))],
                f"Đừng nhầm: giảm {a * k} đi {k} lần là {a * k} : {k}, còn bớt {k} từ {a * k} là {a * k} - {k}.")
    ps = [b_times_fill(rng, False, sk, 1), b_times_mc(rng, False, sk, 1), b_times_fill(rng, False, sk + ["chia.2cs_1cs"], 2, big=True),
          b_times_drag(rng, sk, 2, dirs=(False,)), b_times_match(rng, sk, 2), b_times_word(rng, False, sk + [GT1], 2),
          b_times_word(rng, False, sk + [GT1, "chia.2cs_1cs"], 3, "mc", big=True), b_word2(rng, "down_used", 100, sk + [GT2], 3),
          b_times_chain(rng, sk, 3)]
    return th, ps


def L_c4_haibuoc(rng):
    sk = [GT2]
    a = rnd(rng, 20, 40)
    b = rnd(rng, 5, 15)
    th = theory("Bài toán giải bằng hai bước tính: bước 1 tìm số chưa biết mà đề chưa cho; bước 2 dùng số đó để trả lời câu hỏi.",
                [T(f"Ví dụ: Thùng thứ nhất có {a} l nước, thùng thứ hai nhiều hơn {b} l. Cả hai thùng có bao nhiêu lít?"),
                 WP([("Số nước ở thùng thứ hai là:", f"{a} + {b} = {a + b} (l)"), ("Số nước ở cả hai thùng là:", f"{a} + {a + b} = {2 * a + b} (l)")], f"{2 * a + b} l")],
                "Con tóm tắt bài toán trước khi giải nhé.")
    c, d = pick_add(rng, 2, True)
    e, f = pick_sub(rng, 2, True)
    ps = [b_word(rng, "+", c, d, ["cong_tru.pham_vi_100", GT1], 1), b_word(rng, "-", e, f, ["cong_tru.pham_vi_100", GT1], 1, "mc", "less"),
          b_word2(rng, "more_total", 100, sk + ["cong_tru.pham_vi_100"], 2), b_word2(rng, "less_total", 100, sk + ["cong_tru.pham_vi_100"], 2, "mc"),
          b_two_drag(rng, sk, 2), b_chain_match(rng, sk + ["gap_giam.so_lan"], 2),
          b_word2(rng, "mul_sub", 100, sk + ["nhan.2cs_1cs.co_nho"], 3), b_word2(rng, "sub_sub", 100, sk, 3, "mc"),
          b_word2(rng, "times_total", 100, sk + ["gap_giam.so_lan"], 3)]
    return th, ps


def L_c4_ltc(rng):
    th = theory("Ôn lại: nhân, chia số có hai chữ số với số có một chữ số; phép chia có dư; gấp, giảm một số lần; bài toán hai bước tính.",
                ex_calc(rng, "×", 2), "Phép chia thì chia từ trái sang phải; số dư luôn bé hơn số chia.")
    g = gen_for(["×", ":"], 2)
    ps = [calc_p(rng, "×", 2, 1), calc_p(rng, ":", 2, 1, "mc"), b_div_rem(rng, *pick_div(rng, 2, rem=True), ["chia.co_du", "chia.2cs_1cs"], 2),
          b_times_fill(rng, True, ["gap_giam.so_lan"], 2), b_times_mc(rng, False, ["gap_giam.so_lan"], 2),
          b_calc_drag(rng, g, ["nhan.2cs_1cs.co_nho", "chia.2cs_1cs"], 2), b_calc_match(rng, g, ["nhan.2cs_1cs.co_nho", "chia.2cs_1cs"], 2),
          word_p(rng, "×", 2, 3), b_word2(rng, "mul_add", 100, [GT2, "nhan.2cs_1cs.co_nho"], 3)]
    return th, ps


# ---------------------------- Chủ đề 5 ------------------------------------
def L_c5_mm(rng):
    sk = ["do_luong.do_dai"]
    x = rnd(rng, 2, 9)
    th = theory("Mi-li-mét (mm) là đơn vị đo độ dài rất nhỏ. 1 cm = 10 mm; 1 m = 1.000 mm.",
                [T(f"Ví dụ: {x} cm = {x * 10} mm vì"), E(f"{x} × 10 = {x * 10}")], "Trên thước kẻ, khoảng cách giữa hai vạch nhỏ liền nhau là 1 mm.")
    ps = [b_conv_fill(rng, [("cm", "mm"), ("dm", "mm"), ("m", "mm")], sk, 1), b_estimate(rng, "length", sk, 1), b_unit_calc(rng, "mm", sk, 1, "+"),
          b_unit_compare(rng, "cm", "mm", sk, 2), b_conv_match(rng, [("cm", "mm"), ("dm", "mm"), ("m", "mm")], sk, 2),
          b_unit_order(rng, "cm", "mm", sk, 2), b_unit_calc(rng, "mm", sk, 2, "-"), b_measure_word(rng, "len_less", sk + [GT1], 3),
          b_measure_word(rng, "len_convert", sk + [GT1], 3)]
    return th, ps


def L_c5_gam(rng):
    sk = ["do_luong.khoi_luong"]
    x = rnd(rng, 2, 5)
    th = theory("Gam (g) là đơn vị đo khối lượng. 1 kg = 1.000 g.",
                [T(f"Ví dụ: {x} kg = {fmt(x * 1000)} g vì"), E(f"{x} × 1.000 = {fmt(x * 1000)}")], "Muốn so sánh kg với g, con đổi về cùng đơn vị gam.")
    ps = [b_conv_fill(rng, [("kg", "g")], sk, 1), b_estimate(rng, "mass", sk, 1), b_unit_calc(rng, "g", sk, 1, "+", big=True),
          b_unit_compare(rng, "kg", "g", sk, 2), b_conv_match(rng, [("kg", "g")], sk, 2), b_unit_order(rng, "kg", "g", sk, 2),
          b_scale(rng, sk, 2), b_measure_word(rng, "mass_left", sk + [GT1], 3), b_measure_word(rng, "mass_mul", sk + [GT1], 3, "mc")]
    return th, ps


def L_c5_ml(rng):
    sk = ["do_luong.dung_tich"]
    x = rnd(rng, 2, 5)
    th = theory("Mi-li-lít (ml) là đơn vị đo dung tích. 1 l = 1.000 ml.",
                [T(f"Ví dụ: {x} l = {fmt(x * 1000)} ml vì"), E(f"{x} × 1.000 = {fmt(x * 1000)}")], "Một thìa canh nước khoảng 15 ml.")
    ps = [b_conv_fill(rng, [("l", "ml")], sk, 1), b_estimate(rng, "volume", sk, 1), b_unit_calc(rng, "ml", sk, 1, "+", big=True),
          b_unit_compare(rng, "l", "ml", sk, 2), b_conv_match(rng, [("l", "ml")], sk, 2), b_unit_order(rng, "l", "ml", sk, 2),
          b_unit_calc(rng, "ml", sk, 2, "×"), b_measure_word(rng, "vol_add", sk + [GT1], 2, "mc"), b_measure_word(rng, "vol_two", sk + [GT2], 3)]
    return th, ps


def L_c5_nhietdo(rng):
    sk = ["do_luong.nhiet_do"]
    t = rnd(rng, 20, 35)
    th = theory("Nhiệt độ cho biết nóng hay lạnh, đo bằng nhiệt kế. Đơn vị đo nhiệt độ là độ C, viết là °C.",
                [T(f"Ví dụ: nhiệt kế chỉ {t} °C, đọc là “{words(t)} độ C”.")], "Nước đá đang tan khoảng 0 °C, nước sôi 100 °C.")
    ps = [b_temp_read(rng, sk, 1), b_estimate(rng, "temp", sk, 1), b_measure_word(rng, "temp_more", sk + [GT1], 2), b_temp_diff(rng, sk, 2),
          b_temp_match(rng, sk, 2), b_temp_order(rng, sk, 2), b_temp_extreme(rng, sk, 2), b_measure_word(rng, "temp_fever", sk + [GT1], 3, "mc"),
          b_temp_range(rng, sk + [GT1], 3)]
    return th, ps


def L_c5_ltc(rng):
    dd, kl, dt_, nd = ["do_luong.do_dai"], ["do_luong.khoi_luong"], ["do_luong.dung_tich"], ["do_luong.nhiet_do"]
    th = theory("Ôn lại: 1 cm = 10 mm; 1 kg = 1.000 g; 1 l = 1.000 ml; nhiệt độ đo bằng độ C.",
                [T("Muốn so sánh hoặc tính hai số đo khác đơn vị, ta đổi về cùng một đơn vị.")])
    ps = [b_conv_fill(rng, [("cm", "mm"), ("m", "mm")], dd, 1), b_estimate(rng, rng.choice(["length", "mass", "volume"]), dd + kl + dt_, 1),
          b_unit_compare(rng, "kg", "g", kl, 2), b_conv_match(rng, [("kg", "g"), ("l", "ml"), ("cm", "mm"), ("m", "mm")], dd + kl + dt_, 2),
          b_unit_order(rng, "l", "ml", dt_, 2), b_temp_extreme(rng, nd, 2), b_measure_word(rng, "vol_two", dt_ + [GT2], 3),
          b_measure_word(rng, "mass_left", kl + [GT1], 3), b_measure_word(rng, "len_convert", dd + [GT1], 3, "mc")]
    return th, ps


# ---------------------------- Chủ đề 6 ------------------------------------
def L_c6_bieuthuc(rng):
    sk = ["bieu_thuc"]
    e1 = expr_case(rng, "addsub")
    e2 = expr_case(rng, "mixed")
    th = theory("Biểu thức chỉ có cộng, trừ (hoặc chỉ có nhân, chia) thì tính từ trái sang phải. Biểu thức có cả cộng, trừ, nhân, chia thì nhân, chia trước; cộng, trừ sau.",
                [T("Ví dụ:"), E(e1[2]), E(e2[2])])
    ps = [b_expr_fill(rng, "addsub", sk, 1), b_expr_fill(rng, "muldiv", sk, 1), b_expr_fill(rng, "mixed", sk, 2), b_expr_mc(rng, "mixed", sk, 2),
          b_expr_match(rng, ["addsub", "muldiv", "mixed"], sk, 2), b_expr_drag(rng, ["addsub", "muldiv", "mixed"], sk, 2),
          b_expr_extreme(rng, ["mixed", "addsub"], sk, 3), b_expr_word(rng, sk + [GT2], 3), b_word2(rng, "add_mul", 1000, sk + [GT2], 3)]
    return th, ps


def L_c6_bieuthuc2(rng):
    sk = ["bieu_thuc"]
    e1 = expr_case(rng, "paren")
    th = theory("Biểu thức có dấu ngoặc ( ) thì tính trong ngoặc trước.", [T("Ví dụ:"), E(e1[2])],
                "So sánh: 10 + 2 × 3 = 16, còn (10 + 2) × 3 = 36. Dấu ngoặc làm thay đổi thứ tự tính.")
    ps = [b_expr_fill(rng, "paren", sk, 1), b_expr_fill(rng, "paren", sk, 1), b_expr_mc(rng, "paren", sk, 2), b_expr_fill(rng, "mixed", sk, 2),
          b_expr_match(rng, ["paren", "mixed"], sk, 2), b_expr_drag(rng, ["paren"], sk, 2), b_expr_compare(rng, sk, 3),
          b_expr_word(rng, sk + [GT2], 3, paren=True), b_expr_word(rng, sk + [GT2], 3)]
    return th, ps


def L_c6_gapmaylan(rng):
    sk = ["so_sanh.gap_may_lan"]
    b, s, k = _ratio_case(rng)
    th = theory(H["how_many_times"], [T(f"Ví dụ: {b} gấp mấy lần {s}?"), E(eq(b, ":", s)), T(f"Vậy {b} gấp {k} lần {s}.")],
                "“Gấp mấy lần” thì làm phép chia; “hơn bao nhiêu” thì làm phép trừ.")
    ps = [b_ratio_fill(rng, sk, 1), b_ratio_mc(rng, sk, 1), b_ratio_drag(rng, sk, 2), b_ratio_match(rng, sk, 2), b_ratio_word(rng, sk + [GT1], 2),
          b_ratio_word(rng, sk + [GT1], 3, "mc"), b_ratio_two(rng, sk, 3), b_ratio_word2(rng, sk + [GT2], 3)]
    return th, ps


def L_c6_ltc(rng):
    th = theory("Ôn lại: nhân, chia số có ba chữ số với số có một chữ số; tính giá trị biểu thức; so sánh số lớn gấp mấy lần số bé.",
                ex_calc(rng, "×", 3))
    g = gen_for(["×", ":"], 3)
    ps = [calc_p(rng, "×", 3, 1), calc_p(rng, ":", 3, 1, "mc"), b_expr_fill(rng, "mixed", ["bieu_thuc"], 2), b_expr_mc(rng, "paren", ["bieu_thuc"], 2),
          b_ratio_fill(rng, ["so_sanh.gap_may_lan"], 2), b_calc_match(rng, g, ["nhan.3cs_1cs", "chia.3cs_1cs"], 2),
          b_expr_drag(rng, ["mixed", "paren"], ["bieu_thuc"], 2), word_p(rng, "×", 3, 3), b_word2(rng, "add_mul", 1000, [GT2, "nhan.3cs_1cs"], 3)]
    return th, ps


# ---------------------------- Chủ đề 7 ------------------------------------
def L_c7_nhanchia(rng):
    th = theory("Ôn lại cách đặt tính nhân, chia với số có một chữ số trong phạm vi 100 và 1.000.", ex_calc(rng, ":", 3, zero=True),
                "Thử lại phép chia bằng phép nhân: thương nhân với số chia (cộng số dư nếu có) bằng số bị chia.")
    g = gen_for(["×", ":"], 3)
    ps = [b_table_fill(rng, [6, 7, 8, 9], ["bang_nhan_chia"], 1), calc_p(rng, "×", 2, 1), calc_p(rng, ":", 2, 1, "mc"), calc_p(rng, "×", 3, 2),
          b_div_rem(rng, *pick_div(rng, 3, rem=True), ["chia.3cs_1cs", "chia.co_du"], 2), b_calc_drag(rng, g, ["nhan.3cs_1cs", "chia.3cs_1cs"], 2),
          b_calc_match(rng, g, ["nhan.3cs_1cs", "chia.3cs_1cs"], 2), word_p(rng, ":", 3, 3), b_word2(rng, "mul_sub", 1000, [GT2, "nhan.3cs_1cs"], 3)]
    return th, ps


def L_c7_bieuthuc(rng):
    sk = ["bieu_thuc"]
    th = theory("Thứ tự tính giá trị biểu thức: trong ngoặc trước; nhân, chia trước; cộng, trừ sau; cùng loại thì từ trái sang phải.",
                [E(expr_case(rng, "mixed")[2]), E(expr_case(rng, "paren")[2])])
    ps = [b_expr_fill(rng, "addsub", sk, 1), b_expr_fill(rng, "muldiv", sk, 1), b_expr_fill(rng, "mixed", sk, 2), b_expr_fill(rng, "paren", sk, 2),
          b_expr_match(rng, ["addsub", "muldiv", "mixed", "paren"], sk, 2), b_expr_drag(rng, ["mixed", "paren"], sk, 2),
          b_expr_compare(rng, sk, 3), b_expr_word(rng, sk + [GT2], 3), b_expr_word(rng, sk + [GT2], 3, paren=True)]
    return th, ps


def L_c7_hinhdo(rng):
    th = theory("Ôn lại: trung điểm, hình tròn, góc vuông, khối hình; các đơn vị mm, g, ml, °C.",
                [T("1 cm = 10 mm; 1 kg = 1.000 g; 1 l = 1.000 ml; đường kính = bán kính × 2.")])
    hp = ["hinh_hoc.hinh_phang"]
    ps = [b_mid_half(rng, hp, 1), b_circle_fill(rng, hp, 1), b_conv_fill(rng, [("kg", "g"), ("l", "ml")], ["do_luong.khoi_luong", "do_luong.dung_tich"], 1),
          b_angle_clock(rng, ["hinh_hoc.goc"], 2), b_unit_compare(rng, "cm", "mm", ["do_luong.do_dai"], 2), b_solid_match(rng, ["hinh_hoc.khoi"], 2),
          b_temp_order(rng, ["do_luong.nhiet_do"], 2), b_measure_word(rng, "vol_two", ["do_luong.dung_tich", GT2], 3), b_circle_word(rng, hp + [GT1], 3)]
    return th, ps


def L_c7_ontapchung(rng):
    th = theory("Ôn tập học kì 1: số đến 1.000, bốn phép tính, biểu thức, gấp – giảm số lần, một phần mấy, hình học và đo lường.",
                ex_calc(rng, "-", 3))
    ps = [b_num_compare_mc(rng, 3, ["so.pham_vi_1000"], 1), calc_p(rng, "+", 3, 1), b_table_missing(rng, [6, 7, 8, 9], ["bang_nhan_chia"], 1),
          b_frac_fill(rng, ["phan_so.mot_phan"], 2), b_expr_mc(rng, "mixed", ["bieu_thuc"], 2), b_times_drag(rng, ["gap_giam.so_lan"], 2),
          b_ratio_match(rng, ["so_sanh.gap_may_lan"], 2), b_word2(rng, "mul_add", 1000, [GT2, "nhan.3cs_1cs"], 3),
          b_rem_word(rng, ["chia.co_du", GT1], 3)]
    return th, ps


# ---------------------------- Chủ đề 8 ------------------------------------
def L_c8_lama(rng):
    sk = ["so.la_ma"]
    v = rnd(rng, 11, 19)
    th = theory("Chữ số La Mã: I là 1, V là 5, X là 10. Chữ số nhỏ đứng bên phải chữ số lớn thì cộng thêm; đứng bên trái thì trừ đi.",
                [T(f"Ví dụ: VI = 6, IV = 4, IX = 9, {roman(v)} = {v}.")], "Mặt đồng hồ thường ghi số La Mã từ I đến XII.")
    ps = [b_roman_value_mc(rng, sk, 1), b_roman_write_mc(rng, sk, 1), b_roman_fill(rng, sk, 1), b_roman_match(rng, sk, 2),
          b_roman_order(rng, sk, 2), b_roman_clock(rng, sk + ["thoi_gian.dong_ho"], 2), b_roman_max(rng, sk, 2), b_roman_calc(rng, sk, 3)]
    return th, ps


def L_c8_ltc(rng):
    th = theory("Ôn lại: đọc, viết, so sánh số có bốn chữ số; chữ số La Mã; làm tròn số đến hàng chục, hàng trăm.",
                [E(f"{fmt(n)} = {expand(n)}") for n in [n_digits(rng, 4, zeros=True)]])
    ps = [b_num_read_mc(rng, 4, ["so.pham_vi_10000"], 1), b_num_compare_mc(rng, 4, ["so.so_sanh"], 1), b_roman_value_mc(rng, ["so.la_ma"], 1),
          b_num_place_fill(rng, 4, ["so.pham_vi_10000"], 1), b_round_fill(rng, 4, 100, ["so.lam_tron"], 2), b_num_order_drag(rng, 4, ["so.so_sanh"], 2),
          b_roman_match(rng, ["so.la_ma"], 2), b_round_word(rng, 4, 100, ["so.lam_tron"], 3), b_num_compare_word(rng, 4, ["so.so_sanh"], 3)]
    return th, ps


# ---------------------------- Chủ đề 9 ------------------------------------
def L_c9_chuvi(rng):
    sk = ["hinh_hoc.chu_vi"]
    a = rnd(rng, 5, 12)
    b = rnd(rng, 2, a - 1)
    th = theory("Chu vi một hình là tổng độ dài các cạnh của hình đó. Chu vi hình chữ nhật = (dài + rộng) × 2; chu vi hình vuông = cạnh × 4.",
                [T(f"Ví dụ: hình chữ nhật dài {a} cm, rộng {b} cm có chu vi:"), E(f"({a} + {b}) × 2 = {(a + b) * 2}")],
                "Chiều dài và chiều rộng phải cùng đơn vị đo.")
    ps = [b_perim(rng, "tri", sk, 1), b_perim(rng, "quad", sk, 1), b_perim(rng, "rect", sk, 2), b_perim(rng, "square", sk, 2, "mc"),
          b_perim_match(rng, sk, 2), b_perim_drag(rng, sk, 2), b_perim_word(rng, sk + [GT1], 3, "rect"),
          b_perim_word(rng, sk + [GT1], 3, "square_side", "mc"), b_perim_word(rng, sk + [GT1], 3, "square")]
    return th, ps


def L_c9_cm2(rng):
    sk = ["hinh_hoc.dien_tich"]
    r_, c_ = rnd(rng, 2, 4), rnd(rng, 3, 6)
    th = theory("Diện tích là độ lớn phần mặt phẳng hình chiếm. Xăng-ti-mét vuông (cm²) là diện tích hình vuông cạnh 1 cm.",
                [T(f"Ví dụ: hình gồm {r_} hàng, mỗi hàng {c_} ô vuông 1 cm² có diện tích:"), E(f"{c_} × {r_} = {r_ * c_}"), T(f"Vậy diện tích là {r_ * c_} cm².")],
                "Viết cm², đọc là “xăng-ti-mét vuông”.")
    ps = [b_area_count(rng, sk, 1), b_area_compare(rng, sk, 1), b_area_read(rng, sk, 1), b_area_calc(rng, sk, 1), b_area_order(rng, sk, 2),
          b_area_read_match(rng, sk, 2), b_area_count_drag(rng, sk, 2), b_area_word(rng, sk + [GT1], 3, "more"), b_area_count_diff(rng, sk + [GT2], 3)]
    return th, ps


def L_c9_dientich(rng):
    sk = ["hinh_hoc.dien_tich"]
    a = rnd(rng, 4, 9)
    b = rnd(rng, 2, a - 1)
    th = theory("Diện tích hình chữ nhật = chiều dài × chiều rộng (cùng đơn vị đo). Diện tích hình vuông = cạnh × cạnh.",
                [T(f"Ví dụ: hình chữ nhật dài {a} cm, rộng {b} cm có diện tích:"), E(f"{a} × {b} = {a * b}"), T(f"Vậy diện tích là {a * b} cm².")],
                "Chu vi đo bằng cm, diện tích đo bằng cm² – đừng nhầm nhé!")
    ps = [b_area(rng, "rect", sk, 1), b_area(rng, "square", sk, 1), b_area(rng, "rect", sk, 2, "mc"), b_area(rng, "square", sk, 2, "mc"),
          b_area_match(rng, sk, 2), b_area_drag(rng, sk, 2), b_area_word(rng, sk + [GT1], 2, "rect"), b_area_word(rng, sk + [GT1], 3, "square", "mc"),
          b_area_word(rng, sk + [GT2], 3, "cut"), b_rect_both(rng, sk + ["hinh_hoc.chu_vi"], 3)]
    return th, ps


def L_c9_ltc(rng):
    cv, dt_ = ["hinh_hoc.chu_vi"], ["hinh_hoc.dien_tich"]
    th = theory("Ôn lại: chu vi hình tam giác, tứ giác, chữ nhật, vuông; diện tích hình chữ nhật, hình vuông.",
                [T("Chu vi hình vuông = cạnh × 4; diện tích hình vuông = cạnh × cạnh.")])
    ps = [b_perim(rng, "rect", cv, 1), b_area(rng, "square", dt_, 1), b_area_calc(rng, dt_, 1), b_perim_match(rng, cv, 2), b_area_drag(rng, dt_, 2),
          b_rect_both(rng, cv + dt_, 2), b_perim_word(rng, cv + [GT1], 3, "square_side"), b_area_word(rng, dt_ + [GT2], 3, "cut"),
          b_area_word(rng, dt_ + [GT1], 3, "rect", "mc")]
    return th, ps


# ---------------------------- Chủ đề 10, 12, 14: luyện tập chung phép tính --
def calc_review(ops, d, extra_find=False):
    def build(rng):
        sks = [OP_SKILL[(op, d)] for op in ops]
        M = MAXR[d] + 1 if d < 5 else 100000
        th = theory("Ôn lại cách đặt tính rồi tính và giải toán có lời văn với các số đã học.", ex_calc(rng, ops[-1], d),
                    "Làm xong, con ước lượng xem kết quả có hợp lý không nhé.")
        g = gen_for(ops, d)
        ps = [calc_p(rng, ops[0], d, 1), calc_p(rng, ops[1 % len(ops)], d, 1, "mc"), calc_p(rng, ops[2 % len(ops)], d, 2),
              calc_p(rng, ops[-1], d, 2, "mc"), b_calc_drag(rng, g, sks, 2), b_calc_match(rng, g, sks, 2)]
        if extra_find:
            ps.append(b_find(rng, "addend1", M, ["tim_thanh_phan.so_hang"], 2))
        ps += [word_p(rng, ops[-1], d, 3), b_word2(rng, rng.choice(WORD2_KINDS[ops[0]] + WORD2_KINDS[ops[-1]]), M, sks + [GT2], 3)]
        return th, ps
    return build


def L_c11_ltc(rng):
    th = theory("Ôn lại: đọc, viết, so sánh số có năm chữ số; làm tròn số đến hàng nghìn, hàng chục nghìn.",
                [E(f"{fmt(n)} = {expand(n)}") for n in [n_digits(rng, 5, zeros=True)]])
    ps = [b_num_words_mc(rng, 5, ["so.pham_vi_100000"], 1), b_num_compare_mc(rng, 5, ["so.so_sanh"], 1), b_num_compose_fill(rng, 5, ["so.pham_vi_100000"], 1),
          b_round_fill(rng, 5, 1000, ["so.lam_tron"], 2), b_cmp_match(rng, 5, ["so.so_sanh"], 2), b_num_order_drag(rng, 5, ["so.so_sanh"], 2),
          b_num_seq(rng, 5, ["so.pham_vi_100000"], 2), b_round_word(rng, 5, 10000, ["so.lam_tron"], 3), b_num_compare_word(rng, 5, ["so.so_sanh"], 3)]
    return th, ps


# ---------------------------- Chủ đề 13 -----------------------------------
def L_c13_dongho(rng):
    dh, lc = ["thoi_gian.dong_ho"], ["thoi_gian.lich"]
    h, m = rnd(rng, 6, 10), rng.choice([15, 20, 40, 45])
    th = theory("Kim ngắn chỉ giờ, kim dài chỉ phút; mỗi số trên mặt đồng hồ ứng với 5 phút. Một năm có 12 tháng; tháng 4, 6, 9, 11 có 30 ngày; tháng 2 có 28 hoặc 29 ngày; các tháng còn lại có 31 ngày.",
                [T(f"Ví dụ: {tfmt(h, m)}" + (f" còn gọi là {h + 1} giờ kém {60 - m} phút." if m > 30 else ".")), E(f"60 - {m} = {60 - m}")],
                "13 giờ là 1 giờ chiều, 20 giờ là 8 giờ tối.")
    ps = [b_clock_read(rng, dh, 1), b_clock_kem(rng, dh, 1), b_month_days(rng, lc, 1), b_month_mc(rng, lc, 2), b_clock_pm_match(rng, dh, 2),
          b_time_units(rng, lc + dh, 2), b_clock_add(rng, dh, 2), b_weekday(rng, lc, 3), b_clock_add(rng, dh + [GT1], 3, ctx=True)]
    return th, ps


def L_c13_thuchanh(rng):
    dh, lc = ["thoi_gian.dong_ho"], ["thoi_gian.lich"]
    th = theory("Xem lịch: các ngày cùng thứ trong một tháng cách nhau 7 ngày. Xem đồng hồ: đếm thêm 5 phút cho mỗi số kim phút đi qua.",
                [T("Ví dụ: nếu ngày 3 là thứ Hai thì các ngày 10, 17, 24 cũng là thứ Hai."), E("3 + 7 = 10")])
    ps = [b_clock_kem(rng, dh, 1, "mc"), b_clock_read(rng, dh, 1), b_calendar_seq(rng, lc, 2), b_clock_duration(rng, dh, 2), b_month_match(rng, lc, 2),
          b_clock_order(rng, dh, 2), b_weekday(rng, lc, 3), b_date_word(rng, lc + [GT2], 3)]
    return th, ps


def L_c13_tien(rng):
    sk = ["tien.viet_nam"]
    th = theory("Tiền Việt Nam có các tờ 1.000, 2.000, 5.000, 10.000, 20.000, 50.000, 100.000 đồng. Muốn biết có bao nhiêu tiền, ta cộng giá trị các tờ tiền.",
                [T("Ví dụ: 2 tờ 10.000 đồng và 1 tờ 5.000 đồng là:"), E("10.000 × 2 + 5.000 = 25.000"), T("Vậy có 25.000 đồng.")],
                "Mua hàng: tiền trả lại = tiền đưa – giá tiền món hàng.")
    ps = [b_money_extreme(rng, sk, 1), b_money_sum(rng, sk, 1), b_money_exchange(rng, sk, 1), b_money_match(rng, sk, 2),
          b_money_exchange_drag(rng, sk, 2), b_money_change(rng, sk + [GT1], 2), b_money_change(rng, sk + [GT1], 3, "mc"),
          b_money_mul(rng, sk + [GT1], 3), b_money_two(rng, sk + [GT2], 3)]
    return th, ps


def L_c13_ltc(rng):
    dh, lc, tn = ["thoi_gian.dong_ho"], ["thoi_gian.lich"], ["tien.viet_nam"]
    th = theory("Ôn lại: xem đồng hồ, xem lịch, tháng – năm và tiền Việt Nam.", [T("1 giờ = 60 phút; 1 tuần = 7 ngày; 1 năm = 12 tháng.")])
    ps = [b_clock_read(rng, dh, 1), b_money_sum(rng, tn, 1), b_month_mc(rng, lc, 1), b_clock_pm_match(rng, dh, 2), b_money_exchange_drag(rng, tn, 2),
          b_clock_duration(rng, dh, 2), b_money_change(rng, tn + [GT1], 3, "mc"), b_weekday(rng, lc, 3), b_money_two(rng, tn + [GT2], 3)]
    return th, ps


# ---------------------------- Chủ đề 15 -----------------------------------
def L_c15_thuthap(rng):
    sk = ["thong_ke.so_lieu"]
    th = theory("Thu thập số liệu: hỏi, đếm, đo rồi ghi lại. Phân loại theo từng nhóm và đếm số lượng mỗi nhóm.",
                [T("Ví dụ: ghi lại màu áo: xanh, đỏ, xanh, vàng, xanh → xanh: 3, đỏ: 1, vàng: 1.")],
                "Đếm xong nhóm nào thì gạch nhóm đó để không đếm sót, đếm trùng.")
    ps = [b_tally_fill(rng, sk, 1), b_tally_mc(rng, sk, 1), b_table_read(rng, sk, 1), b_tally_total(rng, sk, 2), b_tally_drag(rng, sk, 2),
          b_tally_mc(rng, sk, 2, most=False), b_table_match(rng, sk, 2), b_table_diff(rng, sk + [GT1], 3, mode="mc"), b_table_word(rng, sk + [GT1], 3)]
    return th, ps


def L_c15_bang(rng):
    sk = ["thong_ke.so_lieu"]
    th = theory("Bảng số liệu gồm các hàng và cột. Đọc tên ở hàng trên, số liệu tương ứng ở ngay bên dưới.",
                [T("Ví dụ:\nLớp | 3A | 3B\nSố cây | 25 | 30\nLớp 3B trồng được 30 cây, nhiều hơn lớp 3A."), E("30 - 25 = 5")])
    ps = [b_table_read(rng, sk, 1, grid=True), b_table_extreme(rng, sk, 1, True, grid=True), b_table_extreme(rng, sk, 2, False, grid=True),
          b_table_total(rng, sk, 2, grid=True), b_table_order(rng, sk, 2, grid=True), b_table_match(rng, sk, 2, grid=True),
          b_table_diff(rng, sk + [GT1], 2, grid=True), b_table_word(rng, sk + [GT1], 3, grid=True), b_table_diff(rng, sk + [GT1], 3, grid=True, mode="mc")]
    return th, ps


def L_c15_khanang(rng):
    sk = ["xac_suat.kha_nang"]
    th = theory("Một sự kiện có thể chắc chắn xảy ra, có thể xảy ra hoặc không thể xảy ra.",
                [T("Ví dụ: hộp chỉ có bóng đỏ. Lấy 1 quả: chắc chắn được bóng đỏ, không thể được bóng xanh."),
                 T("Hộp có bóng đỏ và bóng xanh. Lấy 1 quả: có thể được bóng đỏ, có thể được bóng xanh.")])
    ps = [b_prob_mc(rng, sk, 1), b_prob_mc(rng, sk, 1), b_prob_count(rng, sk, 1), b_prob_match(rng, sk, 2), b_prob_drag(rng, sk, 2),
          b_prob_mc(rng, sk, 2), b_prob_fill(rng, sk, 3), b_prob_fill(rng, sk, 3)]
    return th, ps


def L_c15_ltc(rng):
    tk, xs = ["thong_ke.so_lieu"], ["xac_suat.kha_nang"]
    th = theory("Ôn lại: thu thập, phân loại số liệu; đọc bảng số liệu; khả năng xảy ra của một sự kiện.",
                [T("Chắc chắn – có thể – không thể.")])
    ps = [b_tally_fill(rng, tk, 1), b_prob_mc(rng, xs, 1), b_table_read(rng, tk, 1, grid=True), b_table_extreme(rng, tk, 2), b_prob_match(rng, xs, 2),
          b_tally_drag(rng, tk, 2), b_table_total(rng, tk, 2, grid=True), b_prob_fill(rng, xs, 3), b_table_word(rng, tk + [GT1], 3)]
    return th, ps


# ---------------------------- Chủ đề 16 -----------------------------------
def L_c16_so(rng):
    th = theory("Ôn lại các số trong phạm vi 100.000: đọc, viết, cấu tạo, so sánh, làm tròn; chữ số La Mã.",
                [E(f"{fmt(n)} = {expand(n)}") for n in [n_digits(rng, 5, zeros=True)]])
    ps = [b_num_read_mc(rng, 5, ["so.pham_vi_100000"], 1), b_num_words_mc(rng, 5, ["so.pham_vi_100000"], 1), b_num_compare_mc(rng, 5, ["so.so_sanh"], 1),
          b_round_fill(rng, 5, 1000, ["so.lam_tron"], 2), b_num_order_drag(rng, 5, ["so.so_sanh"], 2), b_roman_match(rng, ["so.la_ma"], 2),
          b_num_place_fill(rng, 5, ["so.pham_vi_100000"], 2), b_num_digits(rng, 5, ["so.pham_vi_100000"], 3), b_round_word(rng, 5, 10000, ["so.lam_tron"], 3)]
    return th, ps


def L_c16_pheptinh(rng):
    th = theory("Ôn lại bốn phép tính trong phạm vi 100.000 và thứ tự tính giá trị biểu thức.", ex_calc(rng, "-", 5))
    g = gen_for(["+", "-", "×", ":"], 4)
    ps = [calc_p(rng, "+", 5, 1), calc_p(rng, "-", 5, 1, "mc"), calc_p(rng, "×", 4, 2), calc_p(rng, ":", 5, 2),
          b_calc_drag(rng, g, ["cong_tru.pham_vi_10000", "nhan.4cs_1cs", "chia.4cs_1cs"], 2),
          b_calc_match(rng, g, ["cong_tru.pham_vi_10000", "nhan.4cs_1cs", "chia.4cs_1cs"], 2), b_expr_fill(rng, "paren", ["bieu_thuc"], 2),
          word_p(rng, ":", 5, 3), b_word2(rng, "mul_sub", 100000, [GT2, "nhan.5cs_1cs"], 3)]
    return th, ps


def L_c16_hinhdo(rng):
    cv, dt_ = ["hinh_hoc.chu_vi"], ["hinh_hoc.dien_tich"]
    th = theory("Ôn lại: chu vi, diện tích; đơn vị đo độ dài, khối lượng, dung tích; xem đồng hồ; tiền Việt Nam.",
                [T("Chu vi hình chữ nhật = (dài + rộng) × 2; diện tích hình chữ nhật = dài × rộng.")])
    ps = [b_perim(rng, "rect", cv, 1), b_area(rng, "square", dt_, 1, "mc"), b_money_sum(rng, ["tien.viet_nam"], 1),
          b_conv_fill(rng, [("kg", "g"), ("l", "ml"), ("m", "cm")], ["do_luong.do_dai", "do_luong.khoi_luong", "do_luong.dung_tich"], 1),
          b_clock_add(rng, ["thoi_gian.dong_ho"], 2), b_area_match(rng, dt_, 2), b_unit_order(rng, "kg", "g", ["do_luong.khoi_luong"], 2),
          b_perim_word(rng, cv + [GT1], 3, "square_side"), b_area_word(rng, dt_ + [GT2], 3, "cut"), b_money_two(rng, ["tien.viet_nam", GT2], 3)]
    return th, ps


def L_c16_chung(rng):
    th = theory("Ôn tập cuối năm: số và phép tính, hình học và đo lường, thống kê và khả năng xảy ra.", [T("Cố lên! Con đã học xong chương trình Toán lớp 3.")])
    ps = [b_tally_fill(rng, ["thong_ke.so_lieu"], 1), b_prob_mc(rng, ["xac_suat.kha_nang"], 1), b_num_compare_mc(rng, 5, ["so.so_sanh"], 1),
          calc_p(rng, "×", 5, 2), b_table_order(rng, ["thong_ke.so_lieu"], 2, grid=True), b_prob_match(rng, ["xac_suat.kha_nang"], 2),
          b_round_mc(rng, 5, 1000, ["so.lam_tron"], 2), b_word2(rng, "frac_rest", 100000, [GT2, "chia.5cs_1cs"], 3), b_money_mul(rng, ["tien.viet_nam", GT1], 3)]
    return th, ps


# ===========================================================================
# MỤC LỤC CẢ NĂM (thứ tự chủ đề/bài theo SGK; số tiết tổng = 175)
# ===========================================================================
EXISTING = "existing"
CURRICULUM = [
    (1, "Ôn tập và bổ sung", 1, [
        ("on-tap-cac-so-den-1000", "Ôn tập các số đến 1000", 2, L_c1_so),
        ("on-tap-phep-cong-phep-tru-pham-vi-1000", "Ôn tập phép cộng, phép trừ trong phạm vi 1000", 2, L_c1_congtru),
        ("tim-thanh-phan-phep-cong-phep-tru", "Tìm thành phần trong phép cộng, phép trừ", 2, L_c1_timthanhphan),
        ("on-tap-bang-nhan-2-5-bang-chia-2-5", "Ôn tập bảng nhân 2, 5, bảng chia 2, 5", 2, table_lesson([2, 5])),
        ("bang-nhan-3-bang-chia-3", "Bảng nhân 3, bảng chia 3", 2, table_lesson([3])),
        ("bang-nhan-4-bang-chia-4", "Bảng nhân 4, bảng chia 4", 2, table_lesson([4])),
        ("on-tap-hinh-hoc-va-do-luong", "Ôn tập hình học và đo lường", 2, L_c1_hinhdo),
        ("luyen-tap-chung", "Luyện tập chung", 2, L_c1_ltc),
    ]),
    (2, "Bảng nhân, bảng chia", 1, [
        ("bang-nhan-6-bang-chia-6", "Bảng nhân 6, bảng chia 6", 2, table_lesson([6])),
        ("bang-nhan-7-bang-chia-7", "Bảng nhân 7, bảng chia 7", 2, table_lesson([7])),
        ("bang-nhan-8-bang-chia-8", "Bảng nhân 8, bảng chia 8", 2, table_lesson([8])),
        ("bang-nhan-9-bang-chia-9", "Bảng nhân 9, bảng chia 9", 2, table_lesson([9])),
        ("tim-thanh-phan-phep-nhan-phep-chia", "Tìm thành phần trong phép nhân, phép chia", 2, L_c2_timthanhphan),
        ("mot-phan-may", "Một phần mấy", 2, L_c2_motphanmay),
        ("luyen-tap-chung", "Luyện tập chung", 2, L_c2_ltc),
    ]),
    (3, "Làm quen với hình phẳng, hình khối", 1, [
        ("diem-o-giua-trung-diem", "Điểm ở giữa. Trung điểm của đoạn thẳng", 2, L_c3_trungdiem),
        ("hinh-tron-tam-ban-kinh-duong-kinh", "Hình tròn. Tâm, bán kính, đường kính của hình tròn", 2, L_c3_hinhtron),
        ("goc-goc-vuong-goc-khong-vuong", "Góc, góc vuông, góc không vuông", 2, L_c3_goc),
        ("hinh-tam-giac-tu-giac-chu-nhat-vuong", "Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông", 2, L_c3_dagiac),
        ("thuc-hanh-ve-goc-vuong-duong-tron", "Thực hành vẽ góc vuông, đường tròn, hình vuông, hình chữ nhật", 2, L_c3_thuchanhve),
        ("khoi-lap-phuong-khoi-hop-chu-nhat", "Khối lập phương, khối hộp chữ nhật", 2, L_c3_khoi),
        ("luyen-tap-chung", "Luyện tập chung", 2, L_c3_ltc),
    ]),
    (4, "Phép nhân, phép chia trong phạm vi 100", 1, [
        ("nhan-2cs-1cs", "Nhân số có hai chữ số với số có một chữ số", 3, EXISTING),
        ("gap-mot-so-len-mot-so-lan", "Gấp một số lên một số lần", 2, L_c4_gap),
        ("phep-chia-het-phep-chia-co-du", "Phép chia hết, phép chia có dư", 2, L_c4_chiadu),
        ("chia-2cs-1cs", "Chia số có hai chữ số cho số có một chữ số", 3, EXISTING),
        ("giam-mot-so-di-mot-so-lan", "Giảm một số đi một số lần", 2, L_c4_giam),
        ("bai-toan-giai-bang-hai-buoc-tinh", "Bài toán giải bằng hai bước tính", 3, L_c4_haibuoc),
        ("luyen-tap-chung", "Luyện tập chung", 2, L_c4_ltc),
    ]),
    (5, "Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ", 1, [
        ("mi-li-met", "Mi-li-mét", 2, L_c5_mm),
        ("gam", "Gam", 2, L_c5_gam),
        ("mi-li-lit", "Mi-li-lít", 2, L_c5_ml),
        ("nhiet-do-don-vi-do-nhiet-do", "Nhiệt độ. Đơn vị đo nhiệt độ", 2, L_c5_nhietdo),
        ("luyen-tap-chung", "Luyện tập chung", 2, L_c5_ltc),
    ]),
    (6, "Phép nhân, phép chia trong phạm vi 1000", 1, [
        ("nhan-3cs-1cs", "Nhân số có ba chữ số với số có một chữ số", 3, calc_lesson("×", 3)),
        ("chia-3cs-1cs", "Chia số có ba chữ số cho số có một chữ số", 3, calc_lesson(":", 3)),
        ("bieu-thuc-so", "Biểu thức số. Tính giá trị của biểu thức số", 2, L_c6_bieuthuc),
        ("tinh-gia-tri-bieu-thuc-so-tiep-theo", "Tính giá trị của biểu thức số (tiếp theo)", 3, L_c6_bieuthuc2),
        ("so-sanh-so-lon-gap-may-lan-so-be", "So sánh số lớn gấp mấy lần số bé", 2, L_c6_gapmaylan),
        ("luyen-tap-chung", "Luyện tập chung", 2, L_c6_ltc),
    ]),
    (7, "Ôn tập học kì 1", 1, [
        ("on-tap-phep-nhan-phep-chia", "Ôn tập phép nhân, phép chia trong phạm vi 100, 1000", 2, L_c7_nhanchia),
        ("on-tap-bieu-thuc-so", "Ôn tập biểu thức số", 2, L_c7_bieuthuc),
        ("on-tap-hinh-hoc-va-do-luong", "Ôn tập hình học và đo lường", 2, L_c7_hinhdo),
        ("on-tap-chung", "Ôn tập chung", 2, L_c7_ontapchung),
    ]),
    (8, "Các số đến 10 000", 2, [
        ("cac-so-co-bon-chu-so-so-10000", "Các số có bốn chữ số. Số 10 000", 3, numbers_lesson(4, "so.pham_vi_10000")),
        ("so-sanh-cac-so-pham-vi-10000", "So sánh các số trong phạm vi 10 000", 2, compare_lesson(4)),
        ("lam-quen-voi-chu-so-la-ma", "Làm quen với chữ số La Mã", 2, L_c8_lama),
        ("lam-tron-so-den-hang-chuc-hang-tram", "Làm tròn số đến hàng chục, hàng trăm", 2, rounding_lesson(4, [10, 100])),
        ("luyen-tap-chung", "Luyện tập chung", 2, L_c8_ltc),
    ]),
    (9, "Chu vi, diện tích một số hình phẳng", 2, [
        ("chu-vi-tam-giac-tu-giac-chu-nhat-vuong", "Chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông", 3, L_c9_chuvi),
        ("dien-tich-cua-mot-hinh-xang-ti-met-vuong", "Diện tích của một hình. Xăng-ti-mét vuông", 2, L_c9_cm2),
        ("dien-tich-hinh-chu-nhat-hinh-vuong", "Diện tích hình chữ nhật, diện tích hình vuông", 3, L_c9_dientich),
        ("luyen-tap-chung", "Luyện tập chung", 2, L_c9_ltc),
    ]),
    (10, "Cộng, trừ, nhân, chia trong phạm vi 10 000", 2, [
        ("phep-cong-pham-vi-10000", "Phép cộng trong phạm vi 10 000", 2, calc_lesson("+", 4)),
        ("phep-tru-pham-vi-10000", "Phép trừ trong phạm vi 10 000", 2, calc_lesson("-", 4)),
        ("nhan-4cs-1cs", "Nhân số có bốn chữ số với số có một chữ số", 3, calc_lesson("×", 4)),
        ("chia-4cs-1cs", "Chia số có bốn chữ số cho số có một chữ số", 3, calc_lesson(":", 4)),
        ("luyen-tap-chung", "Luyện tập chung", 2, calc_review(["+", "-", "×", ":"], 4, extra_find=True)),
    ]),
    (11, "Các số đến 100 000", 2, [
        ("cac-so-co-nam-chu-so-so-100000", "Các số có năm chữ số. Số 100 000", 3, numbers_lesson(5, "so.pham_vi_100000")),
        ("so-sanh-cac-so-pham-vi-100000", "So sánh các số trong phạm vi 100 000", 2, compare_lesson(5)),
        ("lam-tron-so-den-hang-nghin-hang-chuc-nghin", "Làm tròn số đến hàng nghìn, hàng chục nghìn", 2, rounding_lesson(5, [1000, 10000])),
        ("luyen-tap-chung", "Luyện tập chung", 2, L_c11_ltc),
    ]),
    (12, "Cộng, trừ trong phạm vi 100 000", 2, [
        ("phep-cong-pham-vi-100000", "Phép cộng trong phạm vi 100 000", 2, calc_lesson("+", 5)),
        ("phep-tru-pham-vi-100000", "Phép trừ trong phạm vi 100 000", 2, calc_lesson("-", 5)),
        ("luyen-tap-chung", "Luyện tập chung", 2, calc_review(["+", "-"], 5, extra_find=True)),
    ]),
    (13, "Xem đồng hồ. Tháng – năm. Tiền Việt Nam", 2, [
        ("xem-dong-ho-thang-nam", "Xem đồng hồ. Tháng – năm", 3, L_c13_dongho),
        ("thuc-hanh-xem-dong-ho-xem-lich", "Thực hành xem đồng hồ, xem lịch", 2, L_c13_thuchanh),
        ("tien-viet-nam", "Tiền Việt Nam", 2, L_c13_tien),
        ("luyen-tap-chung", "Luyện tập chung", 1, L_c13_ltc),
    ]),
    (14, "Nhân, chia trong phạm vi 100 000", 2, [
        ("nhan-5cs-1cs", "Nhân số có năm chữ số với số có một chữ số", 2, calc_lesson("×", 5)),
        ("chia-5cs-1cs", "Chia số có năm chữ số cho số có một chữ số", 3, calc_lesson(":", 5)),
        ("luyen-tap-chung", "Luyện tập chung", 2, calc_review(["×", ":"], 5)),
    ]),
    (15, "Làm quen với yếu tố thống kê, xác suất", 2, [
        ("thu-thap-phan-loai-ghi-chep-so-lieu", "Thu thập, phân loại, ghi chép số liệu thống kê", 2, L_c15_thuthap),
        ("bang-so-lieu-thong-ke", "Bảng số liệu thống kê", 2, L_c15_bang),
        ("kha-nang-xay-ra-cua-mot-su-kien", "Khả năng xảy ra của một sự kiện", 2, L_c15_khanang),
        ("luyen-tap-chung", "Luyện tập chung", 1, L_c15_ltc),
    ]),
    (16, "Ôn tập cuối năm", 2, [
        ("on-tap-cac-so-pham-vi-100000", "Ôn tập các số trong phạm vi 100 000", 3, L_c16_so),
        ("on-tap-bon-phep-tinh", "Ôn tập phép cộng, phép trừ, phép nhân, phép chia", 3, L_c16_pheptinh),
        ("on-tap-hinh-hoc-va-do-luong", "Ôn tập hình học và đo lường", 3, L_c16_hinhdo),
        ("on-tap-chung", "Ôn tập chung", 2, L_c16_chung),
    ]),
]

NEW_SKILLS = [
    ("tim_thanh_phan.so_bi_tru", "Tìm số bị trừ, số trừ chưa biết", "so_va_phep_tinh", "tìm thành phần chưa biết"),
    ("tim_thanh_phan.so_chia", "Tìm số chia chưa biết", "so_va_phep_tinh", "tìm thành phần chưa biết"),
    ("phan_so.mot_phan", "Tìm một phần mấy của một số", "so_va_phep_tinh", "một phần mấy"),
    ("gap_giam.so_lan", "Gấp một số lên, giảm một số đi một số lần", "so_va_phep_tinh", "gấp, giảm một số lần"),
    ("so_sanh.gap_may_lan", "So sánh số lớn gấp mấy lần số bé", "so_va_phep_tinh", "gấp, giảm một số lần"),
    ("chia.co_du", "Phép chia hết, phép chia có dư", "so_va_phep_tinh", "phép chia"),
    ("bieu_thuc", "Biểu thức số, tính giá trị của biểu thức", "so_va_phep_tinh", "biểu thức"),
    ("so.pham_vi_10000", "Đọc, viết, cấu tạo các số trong phạm vi 10 000", "so_va_phep_tinh", "đọc, viết số"),
    ("so.pham_vi_100000", "Đọc, viết, cấu tạo các số trong phạm vi 100 000", "so_va_phep_tinh", "đọc, viết số"),
    ("so.so_sanh", "So sánh, sắp xếp các số trong phạm vi 100 000", "so_va_phep_tinh", "so sánh số"),
    ("so.lam_tron", "Làm tròn số đến hàng chục, trăm, nghìn, chục nghìn", "so_va_phep_tinh", "làm tròn số"),
    ("so.la_ma", "Đọc, viết chữ số La Mã (I đến XX)", "so_va_phep_tinh", "số La Mã"),
    ("cong_tru.pham_vi_10000", "Cộng, trừ trong phạm vi 10 000", "so_va_phep_tinh", "phép cộng, phép trừ"),
    ("cong_tru.pham_vi_100000", "Cộng, trừ trong phạm vi 100 000", "so_va_phep_tinh", "phép cộng, phép trừ"),
    ("nhan.4cs_1cs", "Nhân số có bốn chữ số với số có một chữ số", "so_va_phep_tinh", "phép nhân"),
    ("nhan.5cs_1cs", "Nhân số có năm chữ số với số có một chữ số", "so_va_phep_tinh", "phép nhân"),
    ("chia.4cs_1cs", "Chia số có bốn chữ số cho số có một chữ số", "so_va_phep_tinh", "phép chia"),
    ("chia.5cs_1cs", "Chia số có năm chữ số cho số có một chữ số", "so_va_phep_tinh", "phép chia"),
    ("hinh_hoc.goc", "Góc vuông, góc không vuông; vẽ hình bằng ê ke, com-pa", "hinh_hoc_va_do_luong", "hình học"),
    ("hinh_hoc.da_giac", "Hình tam giác, hình tứ giác, hình chữ nhật, hình vuông", "hinh_hoc_va_do_luong", "hình học"),
    ("hinh_hoc.khoi", "Khối lập phương, khối hộp chữ nhật", "hinh_hoc_va_do_luong", "hình học"),
    ("hinh_hoc.chu_vi", "Chu vi hình tam giác, tứ giác, chữ nhật, vuông", "hinh_hoc_va_do_luong", "chu vi, diện tích"),
    ("hinh_hoc.dien_tich", "Diện tích; xăng-ti-mét vuông; diện tích hình chữ nhật, hình vuông", "hinh_hoc_va_do_luong", "chu vi, diện tích"),
    ("do_luong.do_dai", "Đơn vị đo độ dài: mi-li-mét, xăng-ti-mét, mét, ki-lô-mét", "hinh_hoc_va_do_luong", "đo lường"),
    ("do_luong.khoi_luong", "Đơn vị đo khối lượng: gam, ki-lô-gam", "hinh_hoc_va_do_luong", "đo lường"),
    ("do_luong.dung_tich", "Đơn vị đo dung tích: mi-li-lít, lít", "hinh_hoc_va_do_luong", "đo lường"),
    ("do_luong.nhiet_do", "Nhiệt độ, đơn vị độ C", "hinh_hoc_va_do_luong", "đo lường"),
    ("thoi_gian.dong_ho", "Xem đồng hồ, tính khoảng thời gian", "hinh_hoc_va_do_luong", "xem đồng hồ"),
    ("thoi_gian.lich", "Tháng – năm, xem lịch", "hinh_hoc_va_do_luong", "xem lịch"),
    ("tien.viet_nam", "Tiền Việt Nam", "hinh_hoc_va_do_luong", "tiền Việt Nam"),
    ("thong_ke.so_lieu", "Thu thập, phân loại, đọc bảng số liệu thống kê", "thong_ke_xac_suat", "thống kê"),
    ("xac_suat.kha_nang", "Khả năng xảy ra của một sự kiện (chắc chắn, có thể, không thể)", "thong_ke_xac_suat", "khả năng xảy ra"),
]

PROBLEM_KEY_ORDER = ["id", "rev", "type", "instruction", "prompt", "level", "estimatedSeconds", "skillIds", "access",
                     "choices", "correctChoiceIds", "multiSelect", "template", "blanks", "tokens", "slots", "reuseTokens",
                     "left", "right", "pairs", "solution"]
TYPES = {"multiple_choice", "fill_blank", "drag_drop", "matching"}


def finish_problems(lesson_id, ps):
    ps = sorted(ps, key=lambda p: p["level"])  # sort ổn định: mức 1 → 3
    out = []
    for i, p in enumerate(ps, 1):
        p = dict(p)
        p["id"] = f"{lesson_id}.p{i:02d}"
        p["rev"] = 1
        p["access"] = "free"
        sol = p["solution"]
        p["solution"] = {"access": "vip" if i == len(ps) else "free", **sol}
        out.append({k: p[k] for k in PROBLEM_KEY_ORDER if k in p})
    return out


def word_problem_count(ps):
    return sum(1 for p in ps if any(b["kind"] == "word_problem" for b in p["solution"]["steps"]))


def build_lesson(lesson_id, chapter_id, order, title, fn):
    seed = BASE_SEED ^ zlib.crc32(lesson_id.encode("utf-8"))
    last_err = None
    for attempt in range(60):
        rng = random.Random(seed + attempt)
        try:
            blocks, ps = fn(rng)
            for b in blocks:
                check_block(b)
            for p in ps:
                check_problem(p)
            assert 8 <= len(ps) <= 10, f"{lesson_id}: {len(ps)} bài"
            assert {p["type"] for p in ps} == TYPES, f"{lesson_id}: thiếu dạng bài"
            keys = [(p["prompt"]["text"], p.get("template", ""), json.dumps(p.get("choices", p.get("left", [])), ensure_ascii=False)) for p in ps]
            assert len(set(keys)) == len(keys), f"{lesson_id}: bài trùng"
            break
        except (AssertionError, RuntimeError, ValueError, StopIteration) as e:
            last_err = e
    else:
        raise RuntimeError(f"Không sinh được {lesson_id}: {last_err!r}")
    problems = finish_problems(lesson_id, ps)
    return {
        "schemaVersion": SCHEMA_VERSION, "kind": "lesson", "id": lesson_id, "bookId": BOOK, "chapterId": chapter_id,
        "order": order, "title": title, "contentRev": 1,
        "theory": {"title": "Nhớ nhanh", "blocks": blocks},
        "problems": problems,
    }


# ---------------------------------------------------------------------------
# Lịch năm học 2026–2027
# ---------------------------------------------------------------------------
TERMS = [(1, dt.date(2026, 9, 7), dt.date(2027, 1, 15)), (2, dt.date(2027, 1, 18), dt.date(2027, 5, 21))]
HOLIDAYS = [
    (dt.date(2027, 1, 1), dt.date(2027, 1, 1), "Tết Dương lịch"),
    (dt.date(2027, 2, 4), dt.date(2027, 2, 14), "Nghỉ Tết Nguyên Đán Đinh Mùi (mùng 1 Tết: 6/2/2027)"),
    (dt.date(2027, 4, 16), dt.date(2027, 4, 16), "Giỗ Tổ Hùng Vương (10/3 âm lịch)"),
    (dt.date(2027, 4, 30), dt.date(2027, 4, 30), "Ngày Giải phóng miền Nam, thống nhất đất nước"),
    (dt.date(2027, 5, 1), dt.date(2027, 5, 1), "Ngày Quốc tế Lao động"),
]


def school_days():
    out = []
    for term, start, end in TERMS:
        d = start
        while d <= end:
            if d.weekday() < 5 and not any(a <= d <= b for a, b, _ in HOLIDAYS):
                out.append((d, term))
            d += dt.timedelta(days=1)
    return out


def build_calendar(lesson_rows):
    """lesson_rows: [(lessonId, periods)] theo thứ tự catalog."""
    days = school_days()
    slots = [(lid, part, n) for lid, n in lesson_rows for part in range(1, n + 1)]
    assert len(days) == len(slots) == 175, (len(days), len(slots))
    entries, week, last_monday = [], 0, None
    for (d, term), (lid, part, n) in zip(days, slots):
        monday = d - dt.timedelta(days=d.weekday())
        if monday != last_monday:
            week += 1
            last_monday = monday
        entries.append({"date": d.isoformat(), "week": week, "term": term, "lessonId": lid, "part": part, "parts": n})

    def week_after(lesson_id, last=True):
        rows = [e for e in entries if e["lessonId"] == lesson_id]
        return (rows[-1] if last else rows[0])["week"]

    term1_last_week = max(e["week"] for e in entries if e["term"] == 1)
    exams = [
        # Giữa HK1 ≈ tuần 9, sau khi đã học hết phạm vi của đề (đến bài Hình tròn, Chủ đề 3).
        {"week": max(9, week_after("kntt3.c3.hinh-tron-tam-ban-kinh-duong-kinh")), "examId": "kntt3.giua-hk1.de-1"},
        {"week": week_after("kntt3.c4.gap-mot-so-len-mot-so-lan", last=False), "examId": "kntt3.c4.kt15-nhan"},
        {"week": week_after("kntt3.c4.luyen-tap-chung"), "examId": "kntt3.c4.de-1"},
        {"week": week_after("kntt3.c4.luyen-tap-chung") + 1, "examId": "kntt3.c4.nang-cao-1"},
        {"week": term1_last_week, "examId": "kntt3.cuoi-hk1.de-1"},
    ]
    exams.sort(key=lambda e: e["week"])
    return {
        "schemaVersion": SCHEMA_VERSION, "kind": "calendar", "bookId": BOOK, "schoolYear": "2026-2027",
        "terms": [{"term": t, "start": a.isoformat(), "end": b.isoformat()} for t, a, b in TERMS],
        "holidays": [{"start": a.isoformat(), "end": b.isoformat(), "name": n} for a, b, n in HOLIDAYS],
        "days": entries,
        "exams": exams,
    }


# ---------------------------------------------------------------------------
# Ghi file
# ---------------------------------------------------------------------------


def dump(path: pathlib.Path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_hints_dart(used: set[str]):
    hints = list(H.values())
    assert used <= set(hints)
    assert len(hints) <= 60 and not any(ch.isdigit() for h in hints for ch in h)
    def dart_str(h):
        return "'" + h.replace("\\", "\\\\").replace("'", "\\'").replace("$", "\\$") + "'"

    body = "\n".join(f"  {dart_str(h)}," for h in hints)
    HINTS_DART.write_text(
        "// FILE SINH TỰ ĐỘNG bởi tool/gen_curriculum.py — đừng sửa tay, sửa trong script rồi chạy lại.\n"
        "//\n"
        "// Các câu gợi ý CHUNG dùng trong bài học sinh tự động (solution.hint). Câu không chứa số nên\n"
        "// không bao giờ lộ đáp án và chỉ cần ghi âm một lần (tool/make_voice.dart).\n"
        "library;\n\n"
        "/// Mọi câu gợi ý mà bài học sinh tự động được phép dùng (đúng từng chữ).\n"
        "const List<String> kGeneratedHints = [\n" + body + "\n];\n",
        encoding="utf-8")


def main() -> int:
    catalog_path = CONTENT / "catalog.json"
    old = json.loads(catalog_path.read_text(encoding="utf-8"))
    old_book = next(b for b in old["books"] if b["id"] == BOOK)
    old_lessons = {l["id"]: l for c in old_book.get("chapters", []) for l in c["lessons"]}
    for lid in HAND_WRITTEN:
        assert (LESSON_DIR / f"{lid}.json").exists(), lid

    chapters, rows, used_hints, n_problems, generated = [], [], set(), 0, 0
    for n, ctitle, volume, lessons in CURRICULUM:
        cid = f"{BOOK}.c{n}"
        refs = []
        for order, (slug, title, periods, fn) in enumerate(lessons, 1):
            lid = f"{cid}.{slug}"
            src = f"assets/content/lessons/{lid}.json"
            if fn == EXISTING:
                assert lid in HAND_WRITTEN, lid
                lesson = json.loads((LESSON_DIR / f"{lid}.json").read_text(encoding="utf-8"))
                skill_ids = old_lessons[lid]["skillIds"]
            else:
                lesson = build_lesson(lid, cid, order, title, fn)
                dump(LESSON_DIR / f"{lid}.json", lesson)
                generated += 1
                skill_ids = list(dict.fromkeys(s for p in lesson["problems"] for s in p["skillIds"]))
                used_hints |= {p["solution"]["hint"] for p in lesson["problems"] if "hint" in p["solution"]}
                wp = word_problem_count(lesson["problems"])
                if wp < 2:
                    print(f"  (ít bài có lời văn: {lid} có {wp})")
            n_problems += len(lesson["problems"])
            refs.append({"id": lid, "order": order, "title": title, "src": src, "access": "free", "skillIds": skill_ids, "periods": periods})
            rows.append((lid, periods))
        chapters.append({"id": cid, "order": n, "volume": volume, "title": ctitle, "lessons": refs})

    skills = list(old["skills"])
    known = {s["id"] for s in skills}
    for sid, name, strand, kid in NEW_SKILLS:
        if sid not in known:
            skills.append({"id": sid, "name": name, "strand": strand, "kidName": kid})
            known.add(sid)
    for c in chapters:
        for l in c["lessons"]:
            for s in l["skillIds"]:
                assert s in known, f"kỹ năng chưa khai báo: {s}"

    new_book = dict(old_book)
    new_book["chapters"] = chapters
    books = [new_book if b["id"] == BOOK else b for b in old["books"]]
    catalog = {"schemaVersion": SCHEMA_VERSION, "kind": "catalog", "contentRev": old["contentRev"], "skills": skills, "books": books}
    dump(catalog_path, catalog)

    total_periods = sum(p for _, p in rows)
    assert total_periods == 175, total_periods
    calendar = build_calendar(rows)
    dump(CONTENT / "calendar.json", calendar)
    write_hints_dart(used_hints)

    weeks = max(d["week"] for d in calendar["days"])
    print(f"Chủ đề: {len(chapters)} · bài học: {len(rows)} (sinh mới {generated}) · bài toán: {n_problems} · "
          f"tổng số tiết: {total_periods} · ngày học: {len(calendar['days'])} · tuần: {weeks} · kỹ năng: {len(skills)} · "
          f"câu gợi ý: {len(H)} (đang dùng {len(used_hints)})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
