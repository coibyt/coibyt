#!/usr/bin/env python3
"""Sinh mạch NÂNG CAO (dành cho học sinh khá, giỏi): mỗi TUẦN học một bài "Nâng cao tuần N".

    python3 tool/gen_curriculum.py && python3 tool/gen_advanced.py && python3 tool/gen_exams.py

Chạy SAU tool/gen_curriculum.py (đọc lịch học calendar.json để biết tuần nào học bài nào) và TRƯỚC
tool/gen_exams.py. Ghi ra:
  * assets/content/lessons/kntt4.nc.tuan-NN.json — 36 bài, mỗi tuần một bài (8 bài toán mức 2 → 3);
  * catalog.json — mỗi chủ đề có thêm mảng `advancedLessons` (bài nâng cao của tuần nằm trong chủ đề của
    bài học ĐẦU TIÊN của tuần đó), thêm kỹ năng mới nếu cần; KHÔNG đụng vào `lessons`;
  * calendar.json — mảng `advanced`: [{ "week": N, "lessonId": "kntt4.nc.tuan-NN" }];
  * lib/logic/advanced_hints.dart — các câu gợi ý chung (không có chữ số) dùng thêm cho bài nâng cao.

Nguyên tắc giống gen_curriculum.py (dùng lại các hàm của nó): chỉ thư viện chuẩn, hạt giống cố định → chạy lại
ra đúng file cũ; mọi con số, đáp án, phép đặt tính, phép chia và bài giải đều TÍNH bằng code rồi tự kiểm tra lại
toán trước khi ghi. Nội dung mở rộng đúng chủ đề của tuần nhưng ở mức cao hơn, vẫn trong phạm vi kiến thức lớp 4
(lớp 4: số đến lớp triệu, phân số, không số âm).
"""
from __future__ import annotations

import functools
import itertools
import json
import pathlib
import random
import re
import sys
import zlib

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))
import gen_curriculum as G  # noqa: E402
from gen_curriculum import (DD, E, FB, MC, MT, T, WP, col_add, column_block, digit, eq, fmt, long_div,  # noqa: E402
                            needs_block, pick_wrong, rnd, roman, round_to, tfmt)

ROOT = G.ROOT
CONTENT = G.CONTENT
LESSON_DIR = G.LESSON_DIR
HINTS_DART = ROOT / "lib" / "logic" / "advanced_hints.dart"
BOOK = G.BOOK
ADV_SEED = 27182818
PREFIX = f"{BOOK}.nc.tuan-"
GT1, GT2 = G.GT1, G.GT2
GTN = "giai_toan.nhieu_buoc"
TD = "tu_duy.quy_luat"
NEW_SKILLS = [
    (GTN, "Giải toán có lời văn hai, ba bước tính (nâng cao)", "so_va_phep_tinh", "giải toán nhiều bước"),
    (TD, "Tư duy toán: tìm quy luật, điền chữ số, suy luận (nâng cao)", "so_va_phep_tinh", "toán tư duy"),
]

# ---------------------------------------------------------------------------
# Câu gợi ý chung cho bài nâng cao (KHÔNG chứa chữ số → không lộ đáp án, ghi âm một lần)
# ---------------------------------------------------------------------------
AH = {
    "back": "Con tính ngược từ kết quả về số ban đầu: cộng thì đổi thành trừ, trừ thì đổi thành cộng, nhân thì đổi thành chia, chia thì đổi thành nhân.",
    "two_part": "Con coi cả phần có chứa dấu hỏi là một số chưa biết, tìm phần đó trước rồi mới tìm dấu hỏi nhé.",
    "chain": "Con tính lần lượt từng dòng; kết quả của dòng trên là số bắt đầu của dòng dưới.",
    "multi": "Bài này có nhiều bước: con tóm tắt đề, tìm lần lượt từng số chưa biết rồi mới trả lời câu hỏi nhé.",
    "digit_col": "Con xét từng hàng từ hàng đơn vị sang trái, nhớ để ý hàng bên phải có nhớ hay không nhé.",
    "pattern": "Con xem mỗi số hơn, kém hay gấp số đứng trước bao nhiêu, rồi tìm ra quy luật của dãy nhé.",
    "cmp_expr": "Con tính giá trị của từng biểu thức trước, rồi mới so sánh các kết quả nhé.",
    "equalize": "Muốn hai phần bằng nhau, con chỉ chuyển một nửa số chênh lệch từ phần nhiều sang phần ít thôi.",
    "age": "Mỗi năm ai cũng thêm một tuổi, nên hai người luôn hơn kém nhau một số tuổi không đổi.",
    "parts": "Con vẽ sơ đồ đoạn thẳng: coi số bé là một phần, số lớn là mấy phần như thế, rồi tìm giá trị một phần.",
    "frac_rest": "Con vẽ sơ đồ, chia thành các phần bằng nhau rồi xem phần còn lại ứng với mấy phần nhé.",
    "frac_back": "Biết giá trị của một phần, con lấy giá trị đó nhân với số phần bằng nhau nhé.",
    "ceil": "Phép chia còn dư thì phần dư vẫn cần thêm một chỗ nữa, con đừng quên nhé.",
    "rem_max": "Số dư lớn nhất luôn kém số chia đúng một đơn vị.",
    "composite": "Con chia hình thành các hình chữ nhật nhỏ, tính từng hình rồi cộng hoặc trừ cho hợp lý nhé.",
    "half_perim": "Chiều dài cộng chiều rộng thì bằng nửa chu vi hình chữ nhật.",
    "two_units": "Con đổi số đo có hai tên đơn vị về đơn vị bé hơn, rồi mới so sánh hoặc tính nhé.",
    "clock_dur": "Con đếm số phút đến giờ đúng tiếp theo trước, rồi đếm tiếp phần thời gian còn lại nhé.",
    "change": "Tiền trả lại bằng số tiền đưa cho người bán trừ đi số tiền phải trả.",
    "count": "Con liệt kê theo thứ tự từ bé đến lớn để không bỏ sót và không đếm trùng nhé.",
    "digits": "Số lớn nhất có chữ số lớn đứng ở hàng cao; chữ số không thì không được đứng đầu.",
    "worst": "Con nghĩ đến lúc không may nhất: lấy ra hết các viên khác màu rồi mới đến màu cần lấy.",
    "round_range": "Con tìm tất cả các số làm tròn được số đã cho, rồi chọn số lớn nhất hoặc bé nhất trong đó.",
    "weekday": "Cứ sau bảy ngày lại đến đúng thứ đó, con chia số ngày cho bảy rồi xem số dư nhé.",
    "table_shift": "Thêm một lần thừa số thì tích tăng thêm đúng bằng thừa số kia, bớt một lần thì tích giảm đi bằng ấy.",
    "cube": "Khối lập phương có sáu mặt, mười hai cạnh và tám đỉnh nhé.",
    "unit_rate": "Con tìm giá trị của một phần trước, rồi mới tìm giá trị của nhiều phần nhé.",
}
assert len(AH) <= 30 and not any(ch.isdigit() for h in AH.values() for ch in h)
assert not set(AH.values()) & set(G.H.values())
ALL_HINTS = set(AH.values()) | set(G.H.values())
G.HINT_SET = ALL_HINTS  # để G.check_problem chấp nhận cả gợi ý nâng cao (chỉ trong tiến trình này)

NAMES = ["An", "Bình", "Chi", "Dũng", "Hà", "Lan", "Mai", "Minh", "Nam", "Hùng", "Linh", "Hoa", "Khang", "Ngọc"]


# ---------------------------------------------------------------------------
# Tiện ích
# ---------------------------------------------------------------------------
class Retry(Exception):
    pass


def need(cond):
    if not cond:
        raise Retry


def retrying(fn):
    def wrap(*a, **k):
        for _ in range(6000):
            try:
                return fn(*a, **k)
            except (Retry, AssertionError, ZeroDivisionError):
                continue
        raise RuntimeError(f"không sinh được {fn.__name__}")
    wrap.__name__ = fn.__name__
    return wrap


def mk(type_, instr, prompt, level, secs, skills, answer, steps, hint, **body):
    p = G.mk(type_, instr, prompt, level, secs, skills, answer, steps, None, **body)
    p["solution"] = {"answerText": answer, "hint": AH[hint] if hint in AH else G.H[hint], "steps": steps}
    return p


def ev(expr: str) -> int:
    return G.evaluate(expr)


def EQ(expr: str, unit: str | None = None) -> str:
    """'a + b × c' → 'a + b × c = kết quả (đơn vị)' (giá trị tính bằng bộ tính biểu thức)."""
    v = ev(expr)
    need(v >= 0)
    return f"{expr} = {fmt(v)}" + (f" ({unit})" if unit else "")


def blk(a, op, b):
    if op == "×" and b >= 10:
        a, b = b, a
    if not needs_block(a, op, b):
        return None
    if op == "-" and len(str(a - b)) != len(str(a)):
        return None  # tránh hiện chữ số 0 thừa ở đầu kết quả đặt tính
    return column_block(a, op, b)


def col_add_n(nums):
    """Đặt tính cộng nhiều số: schema cho tối đa 3 số mỗi phép đặt tính → cộng dồn từng nhóm."""
    nums = list(nums)
    if len(nums) <= 3:
        return [col_add(nums)]
    first = col_add(nums[:3])
    return [first] + col_add_n([sum(nums[:3])] + nums[3:])


def blocks(*cs):
    out, seen = [], set()
    for c in cs:
        if c is None:
            continue
        b = c if isinstance(c, dict) else blk(*c)
        if b is None:
            continue
        key = json.dumps(b, ensure_ascii=False, sort_keys=True)
        if key not in seen:
            seen.add(key)
            out.append(b)
    return out


def calc(a, op, b):
    if op == ":":
        need(b and a % b == 0)
    v = G.calc(a, op, b)
    need(v >= 0)
    return v


def word(rng, prompt, lines, r, unit, tmpl, ans, calcs, skills, hint="multi", level=3, mode="fill", wrong=(), secs=180):
    """Bài toán có lời văn giải bằng ≥ 2 bước (khối "Bài giải" + đặt tính các phép tính khó)."""
    assert len(lines) >= 2
    steps = [WP(lines, ans)] + blocks(*calcs)
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, secs, skills, ans, steps, hint,
                  **FB(tmpl, [(r, unit) if unit else r]))
    lab = (lambda v: f"{fmt(v)} {unit}") if unit else fmt
    ws = pick_wrong(rng, r, [w for w in wrong if w != r and w > 0], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, secs, skills, ans, steps, hint,
              **MC(rng, lab(r), [lab(w) for w in ws]))


def Ln(expl, a, op, b, unit=None):
    return (expl, eq(a, op, b, unit))


def group_digits(chars: list[str]) -> str:
    """Viết một dãy chữ số (có thể có '□') theo kiểu Việt Nam: từ 4 chữ số trở lên có dấu chấm."""
    s = "".join(chars)
    if len(chars) < 4:
        return s
    out = []
    for i, ch in enumerate(chars):
        if i and (len(chars) - i) % 3 == 0:
            out.append(".")
        out.append(ch)
    return "".join(out)


def cap(s):
    return s[0].upper() + s[1:]


# ---------------------------------------------------------------------------
# Phạm vi số theo từng giai đoạn
# ---------------------------------------------------------------------------
def PT(ks):  # bảng nhân, bảng chia
    return dict(M=100, x=(3, 10), ks=list(ks), b=(2, 30), ax=(15, 60), ab=(5, 40))


P100 = dict(M=99, x=(11, 30), ks=[2, 3, 4, 5, 6], b=(5, 40), ax=(20, 70), ab=(5, 40))
P1000 = dict(M=999, x=(21, 150), ks=list(range(2, 10)), b=(15, 300), ax=(150, 600), ab=(50, 400))
P10K = dict(M=9999, x=(120, 1500), ks=list(range(2, 10)), b=(150, 3000), ax=(1500, 6000), ab=(300, 3500))
P100K = dict(M=100000, x=(1200, 15000), ks=list(range(2, 10)), b=(1500, 30000), ax=(15000, 60000), ab=(3000, 35000))


# ---------------------------------------------------------------------------
# Tìm số chưa biết trong phép tính có hai dấu phép tính; bài "nghĩ một số"
# ---------------------------------------------------------------------------
def find2_case(rng, form, P, gap=False):
    M = P["M"]
    k = rng.choice(P["ks"])
    f = fmt
    if form.startswith("as"):
        x, a, b = rnd(rng, *P["ax"]), rnd(rng, *P["ab"]), rnd(rng, *P["ab"])
        need(len({x, a, b}) == 3)
        if form == "as1":
            s = x + a
            c = s - b
            need(s <= M and c > 0)
            return dict(expr=f"? + {f(a)} - {f(b)} = {f(c)}", x=x, check=f"{f(x)} + {f(a)} - {f(b)} = {f(c)}",
                        say=f"Lấy số đó cộng với {f(a)} rồi trừ đi {f(b)} thì được {f(c)}.",
                        st=[(f"Tìm ? + {f(a)}:", f"Số trước khi trừ đi {f(b)} là:", (c, "+", b)), ("Tìm ?:", "", (s, "-", a))])
        if form == "as2":
            need(x > a)
            t = x - a
            c = t + b
            need(c <= M and t != b)
            return dict(expr=f"? - {f(a)} + {f(b)} = {f(c)}", x=x, check=f"{f(x)} - {f(a)} + {f(b)} = {f(c)}",
                        say=f"Lấy số đó trừ đi {f(a)} rồi cộng với {f(b)} thì được {f(c)}.",
                        st=[(f"Tìm ? - {f(a)}:", f"Số trước khi cộng với {f(b)} là:", (c, "-", b)), ("Tìm ?:", "", (t, "+", a))])
        if form == "as3":
            c = rnd(rng, *P["ab"])
            s = b + c
            need(s > a and s <= M)
            x = s - a
            return dict(expr=f"? + {f(a)} = {f(b)} + {f(c)}", x=x, check=f"{f(x)} + {f(a)} = {f(b)} + {f(c)}", say=None,
                        st=[("Tính tổng ở vế phải:", "", (b, "+", c)), ("Tìm ?:", "", (s, "-", a))])
        # as4: a - ? = b - c
        c = rnd(rng, *P["ab"])
        need(b > c)
        t = b - c
        A = x + t
        need(A <= M and x != t)
        return dict(expr=f"{f(A)} - ? = {f(b)} - {f(c)}", x=x, check=f"{f(A)} - {f(x)} = {f(b)} - {f(c)}", say=None,
                    st=[("Tính hiệu ở vế phải:", "", (b, "-", c)), ("Tìm số trừ ?:", "", (A, "-", t))])
    b = rnd(rng, *P["b"])
    if form in ("m1", "m2", "m5"):
        x = rnd(rng, *P["x"])
        y = x * k
        need(y <= M and x != k)
        if form == "m1":
            c = y + b
            need(c <= M)
            say = (f"Gấp số đó lên {k} lần rồi thêm {f(b)} thì được {f(c)}." if gap
                   else f"Lấy số đó nhân với {k} rồi cộng thêm {f(b)} thì được {f(c)}.")
            return dict(expr=f"? × {k} + {f(b)} = {f(c)}", x=x, check=f"{f(x)} × {k} + {f(b)} = {f(c)}", say=say,
                        st=[(f"Tìm ? × {k}:", f"Số trước khi {'thêm' if gap else 'cộng thêm'} {f(b)} là:", (c, "-", b)),
                            ("Tìm ?:", "", (y, ":", k))])
        if form == "m2":
            c = y - b
            need(c > 0)
            say = (f"Gấp số đó lên {k} lần rồi bớt đi {f(b)} thì được {f(c)}." if gap
                   else f"Lấy số đó nhân với {k} rồi trừ đi {f(b)} thì được {f(c)}.")
            return dict(expr=f"? × {k} - {f(b)} = {f(c)}", x=x, check=f"{f(x)} × {k} - {f(b)} = {f(c)}", say=say,
                        st=[(f"Tìm ? × {k}:", f"Số trước khi {'bớt' if gap else 'trừ'} đi {f(b)} là:", (c, "+", b)),
                            ("Tìm ?:", "", (y, ":", k))])
        c = y + b
        need(c <= M)
        return dict(expr=f"{f(c)} - ? × {k} = {f(b)}", x=x, check=f"{f(c)} - {f(x)} × {k} = {f(b)}", say=None,
                    st=[(f"Tìm ? × {k}:", "", (c, "-", b)), ("Tìm ?:", "", (y, ":", k))])
    if form in ("m3", "m4"):
        q = rnd(rng, *P["x"])
        x = q * k
        need(x <= M and q != k)
        if form == "m3":
            c = q + b
            need(c <= M)
            say = (f"Giảm số đó đi {k} lần rồi thêm {f(b)} thì được {f(c)}." if gap
                   else f"Lấy số đó chia cho {k} rồi cộng thêm {f(b)} thì được {f(c)}.")
            return dict(expr=f"? : {k} + {f(b)} = {f(c)}", x=x, check=f"{f(x)} : {k} + {f(b)} = {f(c)}", say=say,
                        st=[(f"Tìm ? : {k}:", f"Số trước khi {'thêm' if gap else 'cộng thêm'} {f(b)} là:", (c, "-", b)),
                            ("Tìm ?:", "", (q, "×", k))])
        c = q - b
        need(c > 0)
        say = (f"Giảm số đó đi {k} lần rồi bớt đi {f(b)} thì được {f(c)}." if gap
               else f"Lấy số đó chia cho {k} rồi trừ đi {f(b)} thì được {f(c)}.")
        return dict(expr=f"? : {k} - {f(b)} = {f(c)}", x=x, check=f"{f(x)} : {k} - {f(b)} = {f(c)}", say=say,
                    st=[(f"Tìm ? : {k}:", f"Số trước khi {'bớt' if gap else 'trừ'} đi {f(b)} là:", (c, "+", b)),
                        ("Tìm ?:", "", (q, "×", k))])
    a = b
    if form == "p1":
        x = rnd(rng, *P["x"])
        s = x + a
        c = s * k
        need(c <= M and x != a)
        return dict(expr=f"(? + {f(a)}) × {k} = {f(c)}", x=x, check=f"({f(x)} + {f(a)}) × {k} = {f(c)}",
                    say=f"Lấy số đó cộng với {f(a)} rồi nhân kết quả với {k} thì được {f(c)}.",
                    st=[(f"Tìm ? + {f(a)}:", f"Số trước khi nhân với {k} là:", (c, ":", k)), ("Tìm ?:", "", (s, "-", a))])
    q = rnd(rng, *P["x"])
    t = q * k
    if form == "p2":
        x = t + a
        need(x <= M and t <= M)
        return dict(expr=f"(? - {f(a)}) : {k} = {f(q)}", x=x, check=f"({f(x)} - {f(a)}) : {k} = {f(q)}",
                    say=f"Lấy số đó trừ đi {f(a)} rồi chia kết quả cho {k} thì được {f(q)}.",
                    st=[(f"Tìm ? - {f(a)}:", f"Số trước khi chia cho {k} là:", (q, "×", k)), ("Tìm ?:", "", (t, "+", a))])
    # p3
    need(t > a and t <= M)
    x = t - a
    return dict(expr=f"(? + {f(a)}) : {k} = {f(q)}", x=x, check=f"({f(x)} + {f(a)}) : {k} = {f(q)}",
                say=f"Lấy số đó cộng với {f(a)} rồi chia kết quả cho {k} thì được {f(q)}.",
                st=[(f"Tìm ? + {f(a)}:", f"Số trước khi chia cho {k} là:", (q, "×", k)), ("Tìm ?:", "", (t, "-", a))])


def find2_steps(c):
    out = []
    for lead, _, cl in c["st"]:
        out += [T(lead)] + blocks(cl) + [E(eq(*cl))]
    return out + [T("Thử lại:"), E(c["check"])]


@retrying
def b_find2(rng, forms, P, skills, level=3, mode="fill"):
    c = find2_case(rng, rng.choice(forms), P)
    x = c["x"]
    steps = find2_steps(c)
    if mode == "fill":
        return mk("fill_blank", "Tìm số thích hợp.", c["expr"], level, 90, skills, fmt(x), steps, "two_part",
                  **FB(c["expr"].replace("?", "□"), [x]))
    first = G.calc(*c["st"][0][2])
    wrong = pick_wrong(rng, x, [first, x + 10, x - 1, x + 1], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Số thích hợp thay cho dấu ? là:\n{c['expr']}", level, 90, skills,
              fmt(x), steps, "two_part", **MC(rng, fmt(x), [fmt(w) for w in wrong]))


def _find2_cases(rng, forms, P, n):
    out = []
    fs = list(forms)
    rng.shuffle(fs)
    for i in range(n):
        for _ in range(500):
            c = find2_case_safe(rng, fs[i % len(fs)], P)
            if c and c["x"] not in [o["x"] for o in out] and c["expr"] not in [o["expr"] for o in out]:
                out.append(c)
                break
        else:
            raise Retry
    return out


def find2_case_safe(rng, form, P):
    try:
        return find2_case(rng, form, P)
    except Retry:
        return None


@retrying
def b_find2_match(rng, forms, P, skills, level=2):
    cs = _find2_cases(rng, forms, P, 4)
    xs = [c["x"] for c in cs]
    extra = next(v for v in pick_wrong(rng, xs[0], [xs[0] + 10, xs[1] + 1, xs[2] - 1]) if v not in xs and v > 0)
    steps = [E(eq(*cl)) for c in cs for _, _, cl in c["st"]]
    return mk("matching", "Nối cho đúng.", "Nối mỗi phép tính với số thích hợp thay cho dấu ?.", level, 150, skills,
              "; ".join(f"{c['expr']} → {fmt(c['x'])}" for c in cs), steps, "two_part",
              **MT(rng, [(c["expr"], fmt(c["x"])) for c in cs], [fmt(extra)]))


@retrying
def b_find2_drag(rng, forms, P, skills, level=2):
    cs = _find2_cases(rng, forms, P, 3)
    xs = [c["x"] for c in cs]
    extra = next(v for v in pick_wrong(rng, xs[1], [xs[1] + 10, xs[2] + 1]) if v not in xs and v > 0)
    steps = [E(eq(*cl)) for c in cs for _, _, cl in c["st"]] + [T(f"Thẻ {fmt(extra)} là thẻ thừa.", "tip")]
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số thích hợp thay cho mỗi dấu ? (vào ô trống).", level, 120, skills,
              "; ".join(fmt(x) for x in xs), steps, "two_part",
              **DD(rng, "\n".join(c["expr"].replace("?", "□") for c in cs), [fmt(x) for x in xs], [fmt(extra)]))


@retrying
def b_think(rng, forms, P, skills, level=3, mode="fill", gap=False):
    c = find2_case(rng, rng.choice(forms), P, gap=gap)
    need(c["say"])
    name = rng.choice(NAMES)
    x = c["x"]
    lines = []
    for i, (_, wlead, cl) in enumerate(c["st"]):
        lead = wlead if i < len(c["st"]) - 1 else f"Số bạn {name} đã nghĩ là:"
        lines.append((lead, eq(*cl)))
    prompt = f"Bạn {name} nghĩ ra một số. {c['say']} Hỏi bạn {name} đã nghĩ ra số nào?"
    first = G.calc(*c["st"][0][2])
    return word(rng, prompt, lines, x, None, f"Bạn {name} đã nghĩ ra số □.", fmt(x), [cl for _, _, cl in c["st"]],
                skills, "back", level, mode, wrong=[first, x + 1, x + 10], secs=150)


# ---------------------------------------------------------------------------
# Điền chữ số còn thiếu trong phép tính
# ---------------------------------------------------------------------------
@retrying
def b_missing(rng, op, d, skills, level=3):
    if op == "+":
        a, b = G.n_digits(rng, d), G.n_digits(rng, d)
        c = a + b
        need(c <= 100000 and len(str(c)) == d and G.has_carry_add(a, b))
        nums, k = [str(a), str(b), str(c)], None
        rel = lambda v: v[0] + v[1] == v[2]  # noqa: E731
    elif op == "-":
        a, b = G.n_digits(rng, d), G.n_digits(rng, d - 1 if d > 2 and rng.random() < 0.4 else d)
        need(a > b and len(str(a - b)) == d and G.has_borrow(a, b))
        c = a - b
        nums, k = [str(a), str(b), str(c)], None
        rel = lambda v: v[0] - v[1] == v[2]  # noqa: E731
    else:
        k = rnd(rng, 3, 9)
        a = G.n_digits(rng, d)
        c = a * k
        need(c <= 100000 and any(digit(a, p) * k >= 10 for p in range(d)))
        b = k
        nums = [str(a), str(c)]
        rel = lambda v: v[0] * k == v[1]  # noqa: E731
    # mỗi số giấu một chữ số (phép nhân: giấu hai chữ số ở tích), không cùng hàng
    hide = []
    used_places = set()
    targets = list(range(len(nums))) + ([1] if op == "×" else [])
    for i in targets:
        s = nums[i]
        cands = [j for j in range(len(s)) if (len(s) - 1 - j) not in used_places and (i, j) not in hide]
        need(cands)
        j = rng.choice(cands)
        hide.append((i, j))
        used_places.add(len(nums[i]) - 1 - j)
    sols = []
    for ds in itertools.product(range(10), repeat=len(hide)):
        v = [list(s) for s in nums]
        ok = True
        for (i, j), dg in zip(hide, ds):
            if j == 0 and dg == 0:
                ok = False
            v[i][j] = str(dg)
        if ok and rel([int("".join(x)) for x in v]):
            sols.append(ds)
            if len(sols) > 1:
                break
    need(len(sols) == 1)
    shown = [list(s) for s in nums]
    for i, j in hide:
        shown[i][j] = "□"
    texts = [group_digits(s) for s in shown]
    answers = [int(nums[i][j]) for i, j in hide]
    # thứ tự ô = thứ tự xuất hiện trong mẫu (trái → phải)
    order = sorted(range(len(hide)), key=lambda t: (hide[t][0], hide[t][1]))
    answers = [answers[t] for t in order]
    tmpl = f"{texts[0]} {op} {texts[1]} = {texts[2]}" if op != "×" else f"{texts[0]} × {k} = {texts[1]}"
    full = eq(a, op, b)
    steps = [T("Xét lần lượt từng hàng từ hàng đơn vị (nhớ cộng cả số nhớ), ta tìm được phép tính đúng:"),
             column_block(a, op, b), E(full)]
    return mk("fill_blank", "Điền chữ số thích hợp.", "Tìm chữ số thích hợp thay cho mỗi ô trống trong phép tính sau:", level, 150,
              skills, full, steps, "digit_col", **FB(tmpl, answers))


# ---------------------------------------------------------------------------
# Dãy số theo quy luật
# ---------------------------------------------------------------------------
def seq_case(rng, kind, lo, hi):
    """-> (các số, câu nêu quy luật, hàm giải thích số thứ i)"""
    if kind == "arith":
        step = rng.choice([s for s in (3, 4, 6, 7, 8, 9, 11, 12, 15, 25, 50, 125, 250, 500, 1500, 2500) if s * 8 <= hi])
        start = rnd(rng, lo, hi - 6 * step)
        down = rng.random() < 0.4
        t = [start + i * step for i in range(7)]
        if down:
            t = t[::-1]
        rule = f"Mỗi số {'kém' if down else 'hơn'} số đứng trước nó {fmt(step)} đơn vị."
        return t, rule, lambda i: E(eq(t[i - 1], "-" if down else "+", step))
    if kind == "grow":
        d0 = rnd(rng, 1, 5) * (1 if hi <= 1000 else 10 if hi <= 10000 else 100)
        e = rnd(rng, 1, 3) * (1 if hi <= 1000 else 10 if hi <= 10000 else 100)
        start = rnd(rng, lo, hi // 3)
        t = [start]
        for i in range(6):
            t.append(t[-1] + d0 + i * e)
        need(t[-1] <= hi)
        rule = f"Khoảng cách giữa hai số liền nhau tăng dần, mỗi lần thêm {fmt(e)} đơn vị: " + ", ".join(fmt(t[i + 1] - t[i]) for i in range(6)) + "."
        return t, rule, lambda i: E(eq(t[i - 1], "+", t[i] - t[i - 1]))
    if kind == "mult":
        r = rng.choice([2, 3])
        start = rnd(rng, max(1, lo), max(2, hi // (r ** 5)))
        t = [start * r ** i for i in range(6)]
        need(t[-1] <= hi)
        rule = f"Mỗi số gấp {r} lần số đứng trước nó."
        return t, rule, lambda i: E(eq(t[i - 1], "×", r))
    if kind == "div":
        r = rng.choice([2, 3])
        end = rnd(rng, 1, 9)
        t = [end * r ** i for i in range(6)][::-1]
        need(t[0] <= hi and t[0] >= lo)
        rule = f"Mỗi số bằng số đứng trước nó giảm đi {r} lần."
        return t, rule, lambda i: E(eq(t[i - 1], ":", r))
    if kind == "alt":
        a, b = rnd(rng, 3, 15), rnd(rng, 1, 9)
        if hi > 1000:
            a, b = a * 100, b * 100
        need(a > b)
        start = rnd(rng, lo, hi - 4 * a)
        t = [start]
        for i in range(6):
            t.append(t[-1] + a if i % 2 == 0 else t[-1] - b)
        need(max(t) <= hi)
        rule = f"Các số lần lượt thêm {fmt(a)} rồi bớt {fmt(b)}, cứ thế lặp lại."
        return t, rule, lambda i: E(eq(t[i - 1], "+" if (i - 1) % 2 == 0 else "-", a if (i - 1) % 2 == 0 else b))
    # fib: mỗi số bằng tổng hai số đứng trước
    a, b = rnd(rng, 1, 9), rnd(rng, 2, 12)
    t = [a, b]
    while len(t) < 7:
        t.append(t[-1] + t[-2])
    need(t[-1] <= hi)
    rule = "Kể từ số thứ ba, mỗi số bằng tổng của hai số đứng liền trước nó."
    return t, rule, lambda i: E(f"{fmt(t[i - 2])} + {fmt(t[i - 1])} = {fmt(t[i])}")


@retrying
def b_seq(rng, kind, lo, hi, skills, level=3, mode="fill"):
    t, rule, explain = seq_case(rng, kind, lo, hi)
    n = len(t)
    first_blank = 4 if kind in ("grow", "alt") and n >= 7 else 3
    if mode == "mc":
        shown = t[:-1]
        r = t[-1]
        prev = t[-2]
        wrong = pick_wrong(rng, r, [prev + (t[-2] - t[-3]), r + 1, r - 1, prev * 2], lo=1)
        steps = [T(rule, "rule"), explain(n - 1)]
        return mk("multiple_choice", "Chọn đáp án đúng.", "Số tiếp theo của dãy số sau là số nào?\n" + "; ".join(fmt(v) for v in shown) + "; …",
                  level, 90, skills, fmt(r), steps, "pattern", **MC(rng, fmt(r), [fmt(w) for w in wrong]))
    blanks = sorted(rng.sample(range(first_blank, n), 2))
    tmpl = "; ".join("□" if i in blanks else fmt(v) for i, v in enumerate(t))
    vals = [t[i] for i in blanks]
    steps = [T(rule, "rule")] + [explain(i) for i in blanks]
    if mode == "fill":
        return mk("fill_blank", "Điền số thích hợp.", "Tìm quy luật rồi viết số thích hợp vào ô trống:", level, 100, skills,
                  "; ".join(fmt(v) for v in vals), steps, "pattern", **FB(tmpl, vals))
    extra = next(v for v in (vals[0] + 1, vals[1] - 1, vals[0] + 2, vals[1] + 3) if v not in t and v > 0)
    return mk("drag_drop", "Kéo số vào ô trống.", "Tìm quy luật rồi kéo thẻ số thích hợp vào ô trống:", level, 100, skills,
              "; ".join(fmt(v) for v in vals), steps + [T(f"Thẻ {fmt(extra)} là thẻ thừa.", "tip")], "pattern",
              **DD(rng, tmpl, [fmt(v) for v in vals], [fmt(extra)]))


# ---------------------------------------------------------------------------
# Chuỗi phép tính (kéo thả)
# ---------------------------------------------------------------------------
CHAIN_PATTERNS = [["×", "+", ":"], ["×", "-", ":"], ["+", "×", "-"], ["-", "×", "+"], [":", "×", "+"], ["×", ":", "-"]]


@retrying
def b_chain(rng, P, skills, level=2, words=False):
    M = P["M"]
    pat = rng.choice(CHAIN_PATTERNS)
    v = rnd(rng, *P["x"]) if pat[0] != ":" else rnd(rng, *P["x"]) * rng.choice(P["ks"])
    need(v <= M)
    start = v
    vals, labels, calcs = [], [], []
    for op in pat:
        if op in "×:":
            k = rng.choice(P["ks"]) if op == "×" else rnd(rng, 2, 9)
            if op == ":":
                need(v % k == 0 and v // k > 1)
            nv = G.calc(v, op, k)
            need(nv <= M and (op == ":" or v < 10 or k < 10))
            lab = (f"Gấp lên {k} lần" if op == "×" else f"Giảm đi {k} lần") if words else (f"Nhân với {k}" if op == "×" else f"Chia cho {k}")
            calcs.append((v, op, k))
        else:
            b = rnd(rng, *P["b"])
            nv = v + b if op == "+" else v - b
            need(0 < nv <= M)
            lab = (f"Thêm {fmt(b)}" if op == "+" else f"Bớt đi {fmt(b)}") if words else (f"Cộng với {fmt(b)}" if op == "+" else f"Trừ đi {fmt(b)}")
            calcs.append((v, op, b))
        labels.append(lab)
        vals.append(nv)
        v = nv
    need(len(set(vals)) == 3 and start not in vals)
    extra = next(x for x in (vals[-1] + 1, vals[-1] + 10, vals[0] + 2) if x not in vals and x != start)
    tmpl = "\n".join(f"{lab}: □" for lab in labels)
    steps = [E(eq(*c)) for c in calcs] + blocks(*calcs)
    return mk("drag_drop", "Kéo số vào ô trống.", f"Bắt đầu từ số {fmt(start)}, làm lần lượt theo từng dòng (dòng sau dùng kết quả của dòng trên). Kéo thẻ số đúng vào mỗi ô.",
              level, 120, skills, "; ".join(fmt(x) for x in vals), steps, "chain",
              **DD(rng, tmpl, [fmt(x) for x in vals], [fmt(extra)]))


# ---------------------------------------------------------------------------
# Biểu thức số
# ---------------------------------------------------------------------------
def EX(M, a, ks, c, forms):
    return dict(M=M, a=a, ks=ks, c=c, forms=forms)


EX_BASIC = ["mul_add", "mul_sub", "div_add", "div_sub"]
EX_PRIO = ["prio_add", "prio_sub", "prio_div", "paren_mul", "paren_div", "sub_paren"]
EX_ADDSUB = ["add_sub", "sub_sub", "sub_paren"]


def ex_case(rng, cfg):
    """-> (biểu thức, giá trị, dòng tính 'bt = bước = kq', các phép tính thành phần)"""
    f = fmt
    M = cfg["M"]
    form = rng.choice(cfg["forms"])
    k = rng.choice(cfg["ks"])
    a = rnd(rng, *cfg["a"])
    c = rnd(rng, *cfg["c"])
    b = rnd(rng, *cfg["c"])
    if form in ("mul_add", "mul_sub", "prio_add", "prio_sub"):
        p = a * k
        need(p <= M)
        if form == "mul_add":
            e, mid, v, cs = f"{f(a)} × {k} + {f(c)}", f"{f(p)} + {f(c)}", p + c, [(a, "×", k), (p, "+", c)]
        elif form == "mul_sub":
            e, mid, v, cs = f"{f(a)} × {k} - {f(c)}", f"{f(p)} - {f(c)}", p - c, [(a, "×", k), (p, "-", c)]
        elif form == "prio_add":
            e, mid, v, cs = f"{f(c)} + {f(a)} × {k}", f"{f(c)} + {f(p)}", c + p, [(a, "×", k), (c, "+", p)]
        else:
            e, mid, v, cs = f"{f(c)} - {f(a)} × {k}", f"{f(c)} - {f(p)}", c - p, [(a, "×", k), (c, "-", p)]
    elif form in ("div_add", "div_sub", "prio_div"):
        n = a * k
        need(n <= M)
        if form == "div_add":
            e, mid, v, cs = f"{f(n)} : {k} + {f(c)}", f"{f(a)} + {f(c)}", a + c, [(n, ":", k), (a, "+", c)]
        elif form == "div_sub":
            e, mid, v, cs = f"{f(n)} : {k} - {f(c)}", f"{f(a)} - {f(c)}", a - c, [(n, ":", k), (a, "-", c)]
        else:
            e, mid, v, cs = f"{f(c)} + {f(n)} : {k}", f"{f(c)} + {f(a)}", c + a, [(n, ":", k), (c, "+", a)]
    elif form == "paren_mul":
        if rng.random() < 0.5:
            s = c + b
            e, mid, cs = f"({f(c)} + {f(b)}) × {k}", f"{f(s)} × {k}", [(c, "+", b), (s, "×", k)]
        else:
            s = c - b
            e, mid, cs = f"({f(c)} - {f(b)}) × {k}", f"{f(s)} × {k}", [(c, "-", b), (s, "×", k)]
        need(s > 1)
        v = s * k
    elif form == "paren_div":
        s = c + b
        need(s % k == 0)
        e, mid, v, cs = f"({f(c)} + {f(b)}) : {k}", f"{f(s)} : {k}", s // k, [(c, "+", b), (s, ":", k)]
    elif form == "sub_paren":
        s = b + a
        top = c + s if rng.random() < 0.7 else c
        e, mid, v, cs = f"{f(top)} - ({f(b)} + {f(a)})", f"{f(top)} - {f(s)}", top - s, [(b, "+", a), (top, "-", s)]
        need(top <= M)
    elif form == "add_sub":
        s = c + b
        e, mid, v, cs = f"{f(c)} + {f(b)} - {f(a)}", f"{f(s)} - {f(a)}", s - a, [(c, "+", b), (s, "-", a)]
        need(s <= M)
    else:  # sub_sub
        top = c + b + a
        need(top <= M)
        s = top - c
        e, mid, v, cs = f"{f(top)} - {f(c)} - {f(b)}", f"{f(s)} - {f(b)}", s - b, [(top, "-", c), (s, "-", b)]
    need(0 < v <= M)
    line = f"{e} = {mid} = {f(v)}"
    G.check_equation(line)
    return e, v, line, cs


def _ex_cases(rng, cfg, n):
    out = []
    for _ in range(400):
        try:
            e = ex_case(rng, cfg)
        except Retry:
            continue
        if e[1] in [o[1] for o in out] or e[0] in [o[0] for o in out]:
            continue
        out.append(e)
        if len(out) == n:
            return out
    raise Retry


@retrying
def b_expr_extreme(rng, cfg, skills, level=3, largest=True):
    cs = _ex_cases(rng, cfg, 4)
    vals = [c[1] for c in cs]
    best = max(vals) if largest else min(vals)
    i = vals.index(best)
    word_ = "lớn nhất" if largest else "bé nhất"
    steps = [E(c[2]) for c in cs] + [T(f"Giá trị {word_} là {fmt(best)}, của biểu thức {cs[i][0]}.")]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Biểu thức nào có giá trị {word_}?", level, 150, skills,
              f"{cs[i][0]} (bằng {fmt(best)})", steps, "cmp_expr", **MC(rng, cs[i][0], [c[0] for j, c in enumerate(cs) if j != i]))


@retrying
def b_expr_match(rng, cfg, skills, level=2):
    cs = _ex_cases(rng, cfg, 4)
    vals = [c[1] for c in cs]
    extra = next(v for v in pick_wrong(rng, vals[0], [vals[1] + 10, vals[2] - 1]) if v not in vals and v > 0)
    return mk("matching", "Nối biểu thức với giá trị.", "Nối mỗi biểu thức với giá trị của nó.", level, 150, skills,
              "; ".join(f"{c[0]} = {fmt(c[1])}" for c in cs), [E(c[2]) for c in cs], "expr_order",
              **MT(rng, [(c[0], fmt(c[1])) for c in cs], [fmt(extra)]))


def rel_sign(a, b):
    return ">" if a > b else "<" if a < b else "="


@retrying
def b_cmp_drag(rng, cfg, skills, level=2):
    cs = _ex_cases(rng, cfg, 3)
    pairs = []
    for i, (e, v, line, _) in enumerate(cs):
        if i == 0:  # một cặp bằng nhau
            q = rnd(rng, 2, max(3, v // 3))
            need(v - q > 0)
            e2 = f"{fmt(v - q)} + {fmt(q)}" if rng.random() < 0.5 else f"{fmt(v + q)} - {fmt(q)}"
            need(v + q <= cfg["M"])
        else:
            d = rng.choice([-1, 1]) * rnd(rng, 1, max(2, v // 20))
            w = v + d
            need(0 < w <= cfg["M"])
            e2 = fmt(w)
        pairs.append((e, v, line, e2))
    rng.shuffle(pairs)
    signs = [rel_sign(v, ev(e2)) for e, v, _, e2 in pairs]
    tmpl = "\n".join(f"{e} □ {e2}" for e, _, _, e2 in pairs)
    extras = [s for s in (">", "<", "=") if s not in signs]
    steps = []
    for (e, v, line, e2), s in zip(pairs, signs):
        steps.append(E(line))
        if not re.fullmatch(r"[0-9.]+", e2):
            steps.append(E(EQ(e2)))
        steps.append(T(f"{fmt(v)} {s} {fmt(ev(e2))} nên {e} {s} {e2}."))
    return mk("drag_drop", "Kéo dấu >, <, = vào ô trống.", "Kéo dấu thích hợp (>, <, =) vào mỗi ô trống. Một dấu có thể dùng nhiều lần.",
              level, 150, skills, "; ".join(signs), steps, "cmp_expr", **DD(rng, tmpl, signs, extras, reuse=True))


@retrying
def b_expr_fill3(rng, cfg, skills, level=3):
    """Biểu thức có ba phép tính (có ngoặc)."""
    f = fmt
    k = rng.choice(cfg["ks"])
    a, b, c = rnd(rng, *cfg["c"]), rnd(rng, *cfg["c"]), rnd(rng, *cfg["c"])
    form = rnd(rng, 0, 2)
    if form == 0:
        s = a + b
        p = s * k
        need(p > c and p <= cfg["M"])
        e = f"({f(a)} + {f(b)}) × {k} - {f(c)}"
        line = f"{e} = {f(s)} × {k} - {f(c)} = {f(p)} - {f(c)} = {f(p - c)}"
        cs = [(a, "+", b), (s, "×", k), (p, "-", c)]
    elif form == 1:
        need(a > b)
        s = a - b
        q = rnd(rng, 2, 9)
        need(s % q == 0 and s // q > 1)
        t = s // q
        need(c + t <= cfg["M"])
        e = f"{f(c)} + ({f(a)} - {f(b)}) : {q}"
        line = f"{e} = {f(c)} + {f(s)} : {q} = {f(c)} + {f(t)} = {f(c + t)}"
        cs = [(a, "-", b), (s, ":", q), (c, "+", t)]
    else:
        x = rnd(rng, *cfg["a"])
        p = x * k
        need(p <= cfg["M"] and a + b > p)
        s = a + b
        e = f"{f(a)} + {f(b)} - {f(x)} × {k}"
        line = f"{e} = {f(a)} + {f(b)} - {f(p)} = {f(s)} - {f(p)} = {f(s - p)}"
        cs = [(x, "×", k), (a, "+", b), (s, "-", p)]
    v = ev(e)
    need(0 < v <= cfg["M"])
    G.check_equation(line)
    steps = [E(line)] + blocks(*cs)
    return mk("fill_blank", "Tính giá trị biểu thức.", f"Tính giá trị của biểu thức: {e}", level, 150, skills, fmt(v), steps,
              "expr_paren", **FB(f"{e} = □", [v]))


@retrying
def b_paren_place(rng, cfg, skills, level=3):
    """Đặt dấu ngoặc để biểu thức có giá trị cho trước."""
    f = fmt
    a, b = rnd(rng, 11, 60), rnd(rng, 11, 60)
    k = rnd(rng, 4, 9)
    d = rnd(rng, 1, k - 2)
    n = [a, b, k, d]
    ops = ["+", "×", "-"]
    s = [f(x) for x in n]
    cand = [
        f"({s[0]} {ops[0]} {s[1]}) {ops[1]} {s[2]} {ops[2]} {s[3]}",
        f"{s[0]} {ops[0]} {s[1]} {ops[1]} ({s[2]} {ops[2]} {s[3]})",
        f"({s[0]} {ops[0]} {s[1]}) {ops[1]} ({s[2]} {ops[2]} {s[3]})",
        f"{s[0]} {ops[0]} ({s[1]} {ops[1]} {s[2]} {ops[2]} {s[3]})",
    ]
    vals = []
    for e in cand:
        for grp in re.findall(r"\(([^()]*)\)", e):
            need(ev(grp) > 0)
        v = ev(e)
        need(0 < v <= cfg["M"])
        vals.append(v)
    plain = ev(f"{s[0]} + {s[1]} × {s[2]} - {s[3]}")
    need(plain > 0)
    # chỉ giữ các cách đặt ngoặc cho giá trị khác nhau và khác biểu thức không có ngoặc
    keep = [(e, v) for e, v in zip(cand, vals) if v != plain]
    need(len({v for _, v in keep}) == len(keep) and len(keep) >= 3)
    right, target = keep[0] if rng.random() < 0.5 else keep[1]
    others = [e for e, v in keep if e != right]
    steps = [T("Tính giá trị từng cách đặt dấu ngoặc:")] + [E(f"{e} = {f(v)}") for e, v in keep] + [
        T(f"Chỉ có {right} bằng {f(target)}.")]
    return mk("multiple_choice", "Chọn đáp án đúng.",
              f"Đặt dấu ngoặc vào biểu thức {s[0]} + {s[1]} × {s[2]} - {s[3]} để được giá trị bằng {f(target)}. Cách đặt nào đúng?",
              level, 180, skills, right, steps, "expr_paren", **MC(rng, right, others[:3]))


# ---------------------------------------------------------------------------
# Lập số từ các chữ số; đếm; điều kiện về chữ số
# ---------------------------------------------------------------------------
def biggest_smallest(ds, d):
    big = int("".join(map(str, sorted(ds, reverse=True)[:d])))
    rest = sorted(ds)
    first = next(x for x in rest if x != 0)
    rest.remove(first)
    small = int(str(first) + "".join(map(str, rest[:d - 1])))
    return big, small


@retrying
def b_digits(rng, d, pool, skills, level=3):
    ds = rng.sample(range(10), pool)
    need(0 in ds)
    big, small = biggest_smallest(ds, d)
    lst = ", ".join(map(str, ds))
    steps = [T(f"Số lớn nhất: chọn {d} chữ số lớn nhất, xếp từ lớn đến bé → {fmt(big)}."),
             T(f"Số bé nhất: chữ số đầu là chữ số bé nhất khác 0, các hàng sau xếp các chữ số bé nhất còn lại từ bé đến lớn → {fmt(small)}.")]
    return mk("fill_blank", "Điền số thích hợp.", f"Từ các chữ số {lst}, hãy lập số lớn nhất và số bé nhất có {d} chữ số khác nhau.",
              level, 120, skills, f"{fmt(big)}; {fmt(small)}", steps, "digits", **FB("Số lớn nhất là □.\nSố bé nhất là □.", [big, small]))


@retrying
def b_digits_diff(rng, d, skills, level=3):
    ds = rng.sample(range(10), d)
    need(0 in ds)
    big, small = biggest_smallest(ds, d)
    r = big - small
    need(len(str(r)) == len(str(big)))
    lst = ", ".join(map(str, ds))
    steps = [T(f"Số lớn nhất là {fmt(big)}; số bé nhất là {fmt(small)} (chữ số 0 không đứng đầu)."), G.col_sub(big, small), E(eq(big, "-", small))]
    return mk("fill_blank", "Điền số thích hợp.", f"Dùng cả {d} chữ số {lst} (mỗi chữ số dùng một lần) để viết các số có {d} chữ số. Tìm hiệu của số lớn nhất và số bé nhất viết được.",
              level, 180, skills, f"{fmt(big)} - {fmt(small)} = {fmt(r)}", steps, "digits",
              **FB("Số lớn nhất: □\nSố bé nhất: □\nHiệu: □", [big, small, r]))


@functools.lru_cache(maxsize=None)
def digit_sum_numbers(d, s, distinct=False):
    out = []
    for n in range(10 ** (d - 1), 10 ** d):
        ds = str(n)
        if sum(map(int, ds)) == s and (not distinct or len(set(ds)) == d):
            out.append(n)
    return tuple(out)


@retrying
def b_digits_cond(rng, d, skills, level=3):
    s = rnd(rng, 10, 30) if d == 5 else rnd(rng, 6, 24)
    ns = digit_sum_numbers(d, s, distinct=True)
    need(len(ns) >= 2)
    big, small = max(ns), min(ns)
    steps = [T("Số lớn nhất: chọn chữ số lớn nhất có thể cho từng hàng từ trái sang phải, sao cho các hàng còn lại vẫn đủ tổng."),
             E(" + ".join(str(big)) + f" = {s}"),
             T("Số bé nhất: chọn chữ số bé nhất có thể cho từng hàng từ trái sang phải (hàng đầu khác 0)."),
             E(" + ".join(str(small)) + f" = {s}")]
    return mk("fill_blank", "Điền số thích hợp.", f"Tìm số lớn nhất và số bé nhất có {d} chữ số khác nhau mà tổng các chữ số bằng {s}.",
              level, 180, skills, f"{fmt(big)}; {fmt(small)}", steps, "digits", **FB("Số lớn nhất là □.\nSố bé nhất là □.", [big, small]))


@retrying
def b_digits_drag(rng, d, skills, level=2):
    ds = rng.sample(range(10), d)
    need(0 in ds)
    big, small = biggest_smallest(ds, d)
    target = small
    slots = list(str(target))
    tmpl = group_digits(["□"] * d)
    steps = [T(f"Chữ số 0 không được đứng đầu, nên hàng cao nhất là chữ số bé nhất khác 0; các hàng sau xếp từ bé đến lớn → {fmt(target)}.")]
    return mk("drag_drop", "Kéo thẻ chữ số vào ô trống.", f"Kéo các thẻ chữ số để được số BÉ NHẤT có {d} chữ số khác nhau (dùng hết các thẻ).",
              level, 90, skills, fmt(target), steps, "digits", **DD(rng, tmpl, slots))


def count_case(rng, kind):
    """-> (đề, đáp số, các khối lời giải)"""
    if kind in ("digit_sum3", "digit_sum4", "digit_sum5"):
        d = int(kind[-1])
        s = {3: rnd(rng, 3, 5), 4: rnd(rng, 2, 3), 5: 2}[d]
        ns = digit_sum_numbers(d, s)
        prompt = f"Có bao nhiêu số có {d} chữ số mà tổng các chữ số của số đó bằng {s}?"
        steps = [T("Liệt kê từ bé đến lớn: " + "; ".join(fmt(n) for n in ns) + "."), T(f"Có tất cả {len(ns)} số.")]
        return prompt, len(ns), steps
    if kind == "tens_more":
        k = rnd(rng, 2, 6)
        ns = [n for n in range(10, 100) if n // 10 - n % 10 == k]
        prompt = f"Có bao nhiêu số có hai chữ số mà chữ số hàng chục hơn chữ số hàng đơn vị {k} đơn vị?"
        steps = [T("Liệt kê từ bé đến lớn: " + "; ".join(map(str, ns)) + "."), T(f"Có tất cả {len(ns)} số.")]
        return prompt, len(ns), steps
    if kind == "multiples":
        k = rnd(rng, 3, 9)
        n = rnd(rng, 40, 99)
        need(n % k)
        q = n // k
        prompt = f"Từ 1 đến {n} có bao nhiêu số chia hết cho {k}?"
        steps = [long_div(n, k), T(f"{n} : {k} = {q} (dư {n % k}). Các số chia hết cho {k} là {k} × 1, {k} × 2, …, {k} × {q}."),
                 E(f"{k} × {q} = {k * q}"), T(f"Có tất cả {q} số.")]
        return prompt, q, steps
    if kind == "digits_used":
        n = rnd(rng, 21, 99)
        m = n - 9
        tot = 9 + 2 * m
        prompt = f"Để viết các số từ 1 đến {n}, ta cần viết tất cả bao nhiêu chữ số?"
        steps = [T("Từ 1 đến 9 có 9 số, mỗi số có 1 chữ số."), E(eq(n, "-", 9)), T(f"Từ 10 đến {n} có {m} số, mỗi số có 2 chữ số."),
                 E(eq(m, "×", 2))] + blocks((m, "×", 2)) + [E(f"9 + {2 * m} = {tot}")]
        return prompt, tot, steps
    if kind == "segments":
        n = rnd(rng, 2, 4)
        p = n + 2
        tot = p * (p - 1) // 2
        prompt = f"Trên đoạn thẳng AB, lấy thêm {n} điểm nữa (nằm giữa A và B). Hỏi trên hình có tất cả bao nhiêu đoạn thẳng?"
        terms = " + ".join(str(i) for i in range(p - 1, 0, -1))
        steps = [T(f"Có tất cả {p} điểm. Điểm thứ nhất nối với {p - 1} điểm còn lại, điểm thứ hai nối thêm với {p - 2} điểm mới, …"),
                 E(f"{terms} = {tot}")]
        return prompt, tot, steps
    if kind == "tri_fan":
        n = rnd(rng, 2, 4)
        m = n + 1
        tot = m * (m + 1) // 2
        prompt = f"Từ đỉnh A của hình tam giác ABC, kẻ {n} đoạn thẳng xuống cạnh BC (chia hình thành {m} hình tam giác nhỏ). Hỏi trên hình có tất cả bao nhiêu hình tam giác?"
        terms = " + ".join(str(i) for i in range(m, 0, -1))
        steps = [T(f"Tam giác gồm 1 phần: {m}; gồm 2 phần liền nhau: {m - 1}; …; gồm cả {m} phần: 1."), E(f"{terms} = {tot}")]
        return prompt, tot, steps
    if kind == "grid_squares":
        n = rnd(rng, 3, 4)
        parts = [(n - i) * (n - i) for i in range(n)]
        tot = sum(parts)
        prompt = f"Một hình vuông được kẻ thành {n * n} ô vuông nhỏ bằng nhau ({n} hàng, mỗi hàng {n} ô). Hỏi trên hình có tất cả bao nhiêu hình vuông?"
        steps = [T("; ".join(f"Hình vuông gồm {(i + 1) * (i + 1)} ô: {parts[i]}" for i in range(n)) + "."),
                 E(" + ".join(map(str, parts)) + f" = {tot}")]
        return prompt, tot, steps
    if kind == "roman_len":
        L = rnd(rng, 2, 3)
        ns = [n for n in range(1, 21) if len(roman(n)) == L]
        word_ = {2: "hai", 3: "ba"}[L]
        prompt = f"Trong các số từ 1 đến 20, có bao nhiêu số khi viết bằng chữ số La Mã cần dùng đúng {word_} chữ số (kí tự)?"
        steps = [T("Đó là các số: " + "; ".join(f"{roman(n)} = {n}" for n in ns) + "."), T(f"Có tất cả {len(ns)} số.")]
        return prompt, len(ns), steps
    if kind in ("round_between4", "round_between5"):
        base = 100 if kind.endswith("4") else 1000
        d = 4 if base == 100 else 5
        a = G.n_digits(rng, d)
        b = a + rnd(rng, 4, 12) * base + rnd(rng, 1, base - 1)
        need(b < 10 ** d and a % base)
        ns = [n for n in range(a + 1, b) if n % base == 0]
        name = "trăm" if base == 100 else "nghìn"
        prompt = f"Có bao nhiêu số tròn {name} lớn hơn {fmt(a)} và bé hơn {fmt(b)}?"
        steps = [T("Đó là các số: " + "; ".join(fmt(n) for n in ns) + "."), T(f"Có tất cả {len(ns)} số.")]
        return prompt, len(ns), steps
    if kind == "bin01":
        d = rnd(rng, 4, 5)
        tot = 2 ** (d - 1)
        prompt = f"Có bao nhiêu số có {d} chữ số mà mỗi chữ số của nó chỉ là 0 hoặc 1?"
        steps = [T("Chữ số hàng cao nhất phải là 1 (chữ số 0 không đứng đầu); mỗi hàng còn lại có 2 cách chọn: 0 hoặc 1."),
                 E(" × ".join(["2"] * (d - 1)) + f" = {tot}")]
        return prompt, tot, steps
    raise ValueError(kind)


@retrying
def b_count(rng, kind, skills, level=3, mode="mc"):
    prompt, r, steps = count_case(rng, kind)
    if mode == "fill":
        noun = {"segments": "đoạn thẳng", "tri_fan": "hình tam giác", "grid_squares": "hình vuông"}.get(kind, "số")
        tmpl = "Ta cần viết tất cả □ chữ số." if kind == "digits_used" else f"Có tất cả □ {noun}."
        return mk("fill_blank", "Điền số thích hợp.", prompt, level, 150, skills, str(r), steps, "count", **FB(tmpl, [r]))
    wrong = pick_wrong(rng, r, [r - 1, r + 1, r + 2, r - 2], lo=1)
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 150, skills, str(r), steps, "count",
              **MC(rng, str(r), [str(w) for w in wrong]))


@retrying
def b_table_shift(rng, ks, skills, level=3):
    k1, k2 = rng.choice(ks), rng.choice(ks)
    n1, n2 = rnd(rng, 4, 9), rnd(rng, 3, 8)
    m1, m2 = n1 - rnd(rng, 1, 3), n2 + rnd(rng, 1, 2)
    need(m1 >= 2 and m2 <= 10 and (k1, n1) != (k2, n2))
    a1, a2 = k1 * (n1 - m1), k2 * (m2 - n2)
    tmpl = f"{k1} × {n1} = {k1} × {m1} + □\n{k2} × {n2} = {k2} × {m2} - □"
    steps = [T(f"{k1} × {n1} nhiều hơn {k1} × {m1} là {n1 - m1} lần {k1}:"), E(eq(k1, "×", n1 - m1)),
             E(f"{k1} × {n1} = {k1} × {m1} + {a1}"),
             T(f"{k2} × {n2} ít hơn {k2} × {m2} là {m2 - n2} lần {k2}:"), E(eq(k2, "×", m2 - n2)),
             E(f"{k2} × {n2} = {k2} × {m2} - {a2}")]
    return mk("fill_blank", "Điền số thích hợp.", "Không tính tích, hãy điền số thích hợp vào ô trống:", level, 120, skills,
              f"{a1}; {a2}", steps, "table_shift", **FB(tmpl, [a1, a2]))


# ---------------------------------------------------------------------------
# Phép chia có dư: suy luận
# ---------------------------------------------------------------------------
@retrying
def b_rem_reason(rng, kind, qr, skills, level=3, mode="fill"):
    k = rnd(rng, 3, 9)
    if kind == "max_dividend":
        q = rnd(rng, *qr)
        a = q * k + k - 1
        need(a <= 100000)
        steps = [T(AH["rem_max"], "rule"), T(f"Số dư lớn nhất là {k} - 1 = {k - 1}."), E(f"{fmt(q)} × {k} + {k - 1} = {fmt(a)}"),
                 long_div(a, k)]
        prompt = f"Trong một phép chia cho {k}, thương là {fmt(q)}. Số bị chia lớn nhất có thể là bao nhiêu?"
        if mode == "fill":
            return mk("fill_blank", "Điền số thích hợp.", prompt, level, 120, skills, fmt(a), steps, "rem_max", **FB("Số bị chia lớn nhất là □.", [a]))
        wrong = [q * k + k, q * k, q * k + 1]
        return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 120, skills, fmt(a), steps, "rem_max",
                  **MC(rng, fmt(a), [fmt(w) for w in wrong]))
    # add_to_divisible
    n = rnd(rng, *qr) * k + rnd(rng, 1, k - 1)
    need(n <= 100000)
    q, r = divmod(n, k)
    add = k - r
    prompt = f"Cần thêm vào số {fmt(n)} ít nhất bao nhiêu đơn vị để được một số chia hết cho {k}?"
    steps = [long_div(n, k), T(f"{fmt(n)} : {k} = {fmt(q)} (dư {r}). Thêm vào cho đủ một lần {k} nữa thì chia hết:"),
             E(f"{k} - {r} = {add}"), E(f"{fmt(n)} + {add} = {fmt(n + add)}"), E(f"{fmt(n + add)} : {k} = {fmt(q + 1)}")]
    wrong = [r, k, add + 1] if r != add else [k, add + 1, add + 2]
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 120, skills, str(add), steps, "remainder",
              **MC(rng, str(add), [str(w) for w in wrong]))


@retrying
def b_rem_match(rng, qr, skills, level=2):
    pairs, steps = [], []
    for _ in range(4):
        k = rnd(rng, 3, 9)
        q = rnd(rng, *qr)
        r = rnd(rng, 1, k - 1)
        a = q * k + r
        left = f"? : {k} = {fmt(q)} (dư {r})"
        need(fmt(a) not in [p[1] for p in pairs] and left not in [p[0] for p in pairs])
        pairs.append((left, fmt(a)))
        steps.append(E(f"{fmt(q)} × {k} + {r} = {fmt(a)}"))
    extra = fmt(ev(pairs[0][1]) + 1)
    need(extra not in [p[1] for p in pairs])
    return mk("matching", "Nối cho đúng.", "Nối mỗi phép chia với số bị chia thích hợp thay cho dấu ?.", level, 150, skills,
              "; ".join(f"{l} → {r}" for l, r in pairs), [T(G.H["remainder"])] + steps, "remainder", **MT(rng, pairs, [extra]))


# ---------------------------------------------------------------------------
# Một phần mấy
# ---------------------------------------------------------------------------
def frac_val(rng, ks=(2, 3, 4, 5, 6, 7, 8, 9)):
    k = rng.choice(ks)
    v = rnd(rng, 2, 10)
    return k, k * v, v


@retrying
def b_frac_cmp_mc(rng, skills, level=3):
    k1, n1, v1 = frac_val(rng)
    k2, n2, v2 = frac_val(rng)
    need(k1 != k2 and n1 != n2 and abs(v1 - v2) <= 2)
    s = rel_sign(v1, v2)
    steps = [E(eq(n1, ":", k1)), E(eq(n2, ":", k2)), T(f"{v1} {s} {v2} nên 1/{k1} của {n1} {s} 1/{k2} của {n2}.")]
    return mk("multiple_choice", "Chọn dấu thích hợp.", f"Chọn dấu thích hợp để điền vào chỗ chấm:\n1/{k1} của {n1} … 1/{k2} của {n2}",
              level, 90, skills, s, steps, "fraction", **MC(rng, s, [x for x in (">", "<", "=") if x != s]))


@retrying
def b_frac_cmp_drag(rng, skills, level=2):
    rows, signs, steps = [], [], []
    for i in range(3):
        k1, n1, v1 = frac_val(rng)
        k2, n2, v2 = frac_val(rng)
        if i == 0:
            v2 = v1
            n2 = k2 * v2
        need(k1 != k2)
        s = rel_sign(v1, v2)
        rows.append(f"1/{k1} của {n1} □ 1/{k2} của {n2}")
        signs.append(s)
        steps += [E(eq(n1, ":", k1)), E(eq(n2, ":", k2))]
    need(len(set(rows)) == 3)
    order = list(range(3))
    rng.shuffle(order)
    rows, signs = [rows[i] for i in order], [signs[i] for i in order]
    extras = [s for s in (">", "<", "=") if s not in signs]
    return mk("drag_drop", "Kéo dấu >, <, = vào ô trống.", "Kéo dấu thích hợp (>, <, =) vào mỗi ô trống. Một dấu có thể dùng nhiều lần.",
              level, 120, skills, "; ".join(signs), steps, "fraction", **DD(rng, "\n".join(rows), signs, extras, reuse=True))


@retrying
def b_frac_reverse_match(rng, skills, level=2):
    pairs, steps = [], []
    for _ in range(4):
        k, n, v = frac_val(rng)
        left = f"1/{k} của số ? là {v}"
        need(str(n) not in [p[1] for p in pairs] and left not in [p[0] for p in pairs])
        pairs.append((left, str(n)))
        steps.append(E(eq(v, "×", k)))
    extra = str(int(pairs[0][1]) + 2)
    need(extra not in [p[1] for p in pairs])
    return mk("matching", "Nối cho đúng.", "Nối mỗi câu với số thích hợp thay cho dấu ?.", level, 120, skills,
              "; ".join(f"{l} → {r}" for l, r in pairs), [T(AH["frac_back"])] + steps, "frac_back", **MT(rng, pairs, [extra]))


# ---------------------------------------------------------------------------
# Bài toán có lời văn nhiều bước
# ---------------------------------------------------------------------------
THREE_CTX = {  # theo phạm vi số (cho đề hợp với đời thật)
    100: [("thùng", "l", "dầu", "Thùng"), ("bao", "kg", "gạo", "Bao")],
    1000: [("thùng", "l", "nước", "Thùng"), ("kho", "kg", "thóc", "Kho")],
    10000: [("kho", "kg", "thóc", "Kho"), ("bể", "l", "nước", "Bể")],
    100000: [("kho", "kg", "thóc", "Kho"), ("bể", "l", "nước", "Bể")],
}


def nice(rng, lo, hi, step):
    lo2, hi2 = -(-lo // step), hi // step
    need(lo2 <= hi2)
    return step * rnd(rng, lo2, hi2)


@retrying
def w_three(rng, M, skills, level=3, mode="fill", step=1):
    cont, unit, what, Cap = rng.choice(THREE_CTX[M])
    a = nice(rng, M // 10, M // 4, step)
    d1 = nice(rng, max(step, M // 50), M // 8, step)
    d2 = nice(rng, max(step, M // 50), M // 6, step)
    b = a + d1
    c = b - d2
    need(c > 0 and c != a)
    tot = a + b + c
    need(tot <= M)
    prompt = (f"{Cap} thứ nhất có {fmt(a)} {unit} {what}. {Cap} thứ hai có nhiều hơn {cont} thứ nhất {fmt(d1)} {unit}. "
              f"{Cap} thứ ba có ít hơn {cont} thứ hai {fmt(d2)} {unit}. Hỏi cả ba {cont} có bao nhiêu {G.UNIT_WORD[unit]} {what}?")
    lines = [Ln(f"Số {what} ở {cont} thứ hai là:", a, "+", d1, unit), Ln(f"Số {what} ở {cont} thứ ba là:", b, "-", d2, unit),
             (f"Số {what} ở cả ba {cont} là:", EQ(f"{fmt(a)} + {fmt(b)} + {fmt(c)}", unit))]
    return word(rng, prompt, lines, tot, unit, f"Cả ba {cont} có □ {unit} {what}.", f"{fmt(tot)} {unit} {what}",
                [(a, "+", d1), (b, "-", d2), col_add([a, b, c])], skills, "multi", level, mode, wrong=[a + b + d1, a + b, tot + d2, tot + step * 10, tot - step * 10])


EQ_CTX = [("giá sách", "quyển sách", "quyển"), ("rổ", "quả cam", "quả"), ("túi", "viên bi", "viên"), ("thùng", "chai nước", "chai")]
EQ_CTX_BIG = [("kho", "bao xi măng", "bao"), ("thư viện", "quyển sách", "quyển"), ("vườn ươm", "cây giống", "cây")]


@retrying
def w_equalize(rng, M, skills, level=3, mode="fill", step=1, maxdiff=None):
    cont, what, u = rng.choice(EQ_CTX if M <= 1000 else EQ_CTX_BIG)
    q = nice(rng, M // 10, M // 2, step)
    diff = nice(rng, 2 * step, maxdiff or M // 4, 2 * step)
    p = q + diff
    need(p <= M)
    h = diff // 2
    prompt = (f"{cap(cont)} thứ nhất có {fmt(p)} {what}, {cont} thứ hai có {fmt(q)} {what}. Phải chuyển bao nhiêu {what} "
              f"từ {cont} thứ nhất sang {cont} thứ hai để số {what} ở hai {cont} bằng nhau?")
    lines = [Ln(f"{cap(cont)} thứ nhất nhiều hơn {cont} thứ hai số {what} là:", p, "-", q, u),
             Ln(f"Số {what} cần chuyển là:", diff, ":", 2, u)]
    return word(rng, prompt, lines, h, u, f"Phải chuyển □ {what}.", f"{fmt(h)} {what}", [(p, "-", q), (diff, ":", 2)],
                skills, "equalize", level, mode, wrong=[diff, h + step, (p + q) // 2 if (p + q) % 2 == 0 else h + 2 * step, h + 2 * step, h + 3 * step])


@retrying
def w_groups_two(rng, P, skills, level=3, mode="fill"):
    k1, k2 = rng.choice(P["ks"]), rng.choice(P["ks"])
    n1, n2 = rnd(rng, *P["x"]), rnd(rng, *P["x"])
    need(k1 != k2 and n1 != n2)
    a, b = n1 * k1, n2 * k2
    tot = a + b
    need(tot <= P["M"] and (n1 < 10 or k1 < 10) and (n2 < 10 or k2 < 10))
    prompt = (f"Cô giáo mua {n1} hộp bút chì xanh, mỗi hộp có {k1} chiếc và {n2} hộp bút chì đỏ, mỗi hộp có {k2} chiếc. "
              f"Hỏi cô giáo mua tất cả bao nhiêu chiếc bút chì?")
    lines = [Ln("Số bút chì xanh là:", k1, "×", n1, "chiếc"), Ln("Số bút chì đỏ là:", k2, "×", n2, "chiếc"),
             Ln("Số bút chì cô giáo mua tất cả là:", a, "+", b, "chiếc")]
    return word(rng, prompt, lines, tot, "chiếc", "Cô giáo mua tất cả □ chiếc bút chì.", f"{fmt(tot)} chiếc bút chì",
                [(k1, "×", n1), (k2, "×", n2), (a, "+", b)], skills, "multi", level, mode, wrong=[a, b, tot + k1])


GROUP3_CTX = [
    ("Mỗi hộp có {k} cái bánh. Mẹ mua {n} hộp bánh, mẹ biếu bà {c} cái, số bánh còn lại mẹ chia đều cho {m} bạn nhỏ. Hỏi mỗi bạn được mấy cái bánh?",
     "Số bánh mẹ mua là:", "Số bánh còn lại là:", "Số bánh mỗi bạn được là:", "cái", "Mỗi bạn được □ cái bánh.", "cái bánh"),
    ("Một cửa hàng nhập {n} túi táo, mỗi túi có {k} quả. Cửa hàng đã bán {c} quả, số táo còn lại xếp đều vào {m} rổ. Hỏi mỗi rổ có bao nhiêu quả táo?",
     "Số táo cửa hàng nhập là:", "Số táo còn lại là:", "Số táo mỗi rổ có là:", "quả", "Mỗi rổ có □ quả táo.", "quả táo"),
    ("Trường mua {n} bó hoa, mỗi bó có {k} bông. Các bạn dùng {c} bông để cắm lọ trên bàn cô giáo, số hoa còn lại cắm đều vào {m} lọ. Hỏi mỗi lọ có bao nhiêu bông hoa?",
     "Số hoa trường mua là:", "Số hoa còn lại là:", "Số hoa mỗi lọ có là:", "bông", "Mỗi lọ có □ bông hoa.", "bông hoa"),
]


@retrying
def w_groups3(rng, P, skills, level=3, mode="fill", table_q=False):
    tpl = rng.choice(GROUP3_CTX)
    k = rng.choice(P["ks"])
    n = rnd(rng, *P["x"]) if not table_q else rnd(rng, 3, 9)
    tot = n * k
    m = rnd(rng, 2, 9)
    need(tot <= P["M"] and (n < 10 or k < 10))
    q = rnd(rng, 2, 10) if table_q else rnd(rng, max(2, tot // m // 3), max(3, tot // m - 1))
    c = tot - q * m
    need(c > 0 and q > 1 and c != q)
    prompt = tpl[0].format(k=k, n=n, c=fmt(c), m=m)
    rest = q * m
    u = tpl[4]
    lines = [Ln(tpl[1], k, "×", n, u), Ln(tpl[2], tot, "-", c, u), Ln(tpl[3], rest, ":", m, u)]
    return word(rng, prompt, lines, q, u, tpl[5], f"{fmt(q)} {tpl[6]}", [(k, "×", n), (tot, "-", c), (rest, ":", m)],
                skills, "multi", level, mode, wrong=[rest, (tot // m) if tot % m == 0 else q + 1, q + 2])


@retrying
def w_compare_groups(rng, P, skills, level=3, mode="fill"):
    k1, k2 = rng.choice(P["ks"]), rng.choice(P["ks"])
    n1, n2 = rnd(rng, *P["x"]), rnd(rng, *P["x"])
    a, b = n1 * k1, n2 * k2
    need(a > b and a <= P["M"] and k1 != k2 and (n1 < 10 or k1 < 10) and (n2 < 10 or k2 < 10) and b >= 10 and n1 != n2)
    big = P["M"] >= 1000
    if big:
        prompt = (f"Kho A có {n1} xe hàng, mỗi xe chở {fmt(k1)} kg. Kho B có {n2} xe hàng, mỗi xe chở {fmt(k2)} kg. "
                  f"Hỏi kho A nhiều hơn kho B bao nhiêu ki-lô-gam hàng?") if k1 > 9 else None
        need(prompt)
        u, w1, w2, w3, tmpl, ans = "kg", "Số hàng ở kho A là:", "Số hàng ở kho B là:", "Kho A nhiều hơn kho B là:", "Kho A nhiều hơn kho B □ kg hàng.", "kg hàng"
        lines = [Ln(w1, k1, "×", n1, u), Ln(w2, k2, "×", n2, u), Ln(w3, a, "-", b, u)]
        calcs = [(k1, "×", n1), (k2, "×", n2), (a, "-", b)]
    else:
        prompt = (f"Lớp 3A xếp thành {n1} hàng, mỗi hàng {k1} bạn. Lớp 3B xếp thành {n2} hàng, mỗi hàng {k2} bạn. "
                  f"Hỏi lớp 3A nhiều hơn lớp 3B bao nhiêu bạn?")
        u, tmpl, ans = "bạn", "Lớp 3A nhiều hơn lớp 3B □ bạn.", "bạn"
        lines = [Ln("Số học sinh lớp 3A là:", k1, "×", n1, u), Ln("Số học sinh lớp 3B là:", k2, "×", n2, u),
                 Ln("Lớp 3A nhiều hơn lớp 3B số bạn là:", a, "-", b, u)]
        calcs = [(k1, "×", n1), (k2, "×", n2), (a, "-", b)]
    r = a - b
    return word(rng, prompt, lines, r, u, tmpl, f"{fmt(r)} {ans}", calcs, skills, "multi", level, mode,
                wrong=[a + b, r + k1, r + (1000 if big else 10)])


@retrying
def w_sum_ratio(rng, M, skills, level=3, mode="fill", step=1):
    k = rnd(rng, 2, 8)
    small = nice(rng, max(2, M // 60), M // (k + 1) // 2, step)
    big = small * k
    S = small + big
    need(S <= M and (small < 10 or k < 10))
    ctx = rng.choice([
        ("Hai bạn {a} và {b} có tất cả {S} viên bi. Số bi của {b} gấp {k} lần số bi của {a}. Hỏi {b} có bao nhiêu viên bi?", "viên", "{b} có □ viên bi.", "viên bi", "số bi của {a}", "số bi của {b}"),
        ("Hai thùng có tất cả {S} l nước. Thùng to có số nước gấp {k} lần thùng nhỏ. Hỏi thùng to có bao nhiêu lít nước?", "l", "Thùng to có □ l nước.", "l nước", "số nước ở thùng nhỏ", "số nước ở thùng to"),
        ("Hai kho có tất cả {S} kg gạo. Số gạo ở kho thứ hai gấp {k} lần số gạo ở kho thứ nhất. Hỏi kho thứ hai có bao nhiêu ki-lô-gam gạo?", "kg", "Kho thứ hai có □ kg gạo.", "kg gạo", "số gạo ở kho thứ nhất", "số gạo ở kho thứ hai"),
    ])
    a, b = rng.sample(NAMES, 2)
    sub = dict(a=a, b=b, S=fmt(S), k=k)
    prompt = ctx[0].format(**sub)
    u = ctx[1]
    lines = [(f"Coi {ctx[4].format(**sub)} là 1 phần thì {ctx[5].format(**sub)} là {k} phần như thế. Tổng số phần bằng nhau là:", f"1 + {k} = {k + 1} (phần)"),
             Ln(f"Giá trị của một phần ({ctx[4].format(**sub)}) là:", S, ":", k + 1, u),
             Ln(f"{cap(ctx[5].format(**sub))} là:", small, "×", k, u)]
    return word(rng, prompt, lines, big, u, ctx[2].format(**sub), f"{fmt(big)} {ctx[3]}", [(S, ":", k + 1), (small, "×", k)],
                skills, "parts", level, mode, wrong=[small, S // k if S % k == 0 else big + small, big + k])


@retrying
def w_diff_ratio(rng, M, skills, level=3, mode="fill", step=1):
    k = rnd(rng, 2, 9)
    small = nice(rng, max(2, M // 60), M // k // 2, step)
    big = small * k
    D = big - small
    need(big <= M and (small < 10 or k < 10))
    a, b = rng.sample(NAMES, 2)
    prompt = (f"Bạn {b} có nhiều hơn bạn {a} {fmt(D)} nhãn vở. Số nhãn vở của {b} gấp {k} lần số nhãn vở của {a}. "
              f"Hỏi bạn {a} có bao nhiêu nhãn vở?")
    lines = [(f"Coi số nhãn vở của {a} là 1 phần thì số nhãn vở của {b} là {k} phần như thế. Hiệu số phần bằng nhau là:", f"{k} - 1 = {k - 1} (phần)"),
             Ln(f"Số nhãn vở của {a} là:", D, ":", k - 1, "nhãn vở")]
    return word(rng, prompt, lines, small, "nhãn vở", f"Bạn {a} có □ nhãn vở.", f"{fmt(small)} nhãn vở", [(D, ":", k - 1)],
                skills, "parts", level, mode, wrong=[D // k if D % k == 0 else small + 1, big, D])


@retrying
def w_times_chain3(rng, P, skills, level=3, mode="fill"):
    a = rnd(rng, *P["x"])
    k = rng.choice(P["ks"])
    b = a * k
    m = rnd(rng, 2, 9)
    need(b % m == 0 and m != k and b <= P["M"] and (a < 10 or k < 10))
    c = b // m
    tot = a + b + c
    need(tot <= P["M"] and c != a)
    prompt = (f"Bao thứ nhất có {fmt(a)} kg ngô. Số ngô ở bao thứ hai gấp {k} lần bao thứ nhất. Số ngô ở bao thứ ba bằng số ngô ở bao "
              f"thứ hai giảm đi {m} lần. Hỏi cả ba bao có bao nhiêu ki-lô-gam ngô?")
    lines = [Ln("Số ngô ở bao thứ hai là:", a, "×", k, "kg"), Ln("Số ngô ở bao thứ ba là:", b, ":", m, "kg"),
             ("Số ngô ở cả ba bao là:", EQ(f"{fmt(a)} + {fmt(b)} + {fmt(c)}", "kg"))]
    return word(rng, prompt, lines, tot, "kg", "Cả ba bao có □ kg ngô.", f"{fmt(tot)} kg ngô", [(a, "×", k), (b, ":", m), col_add([a, b, c])],
                skills, "multi", level, mode, wrong=[a + b, b + c, tot + a])


@retrying
def w_ceil(rng, P, skills, level=3, mode="fill"):
    k = rnd(rng, 4, 9)
    n1 = rnd(rng, P["M"] // 6, P["M"] // 3)
    n2 = rnd(rng, 2, max(3, P["M"] // 30))
    n = n1 + n2
    need(n % k and n <= P["M"])
    q, r = divmod(n, k)
    ctx = rng.choice([
        ("Một trường có {n1} học sinh và {n2} thầy cô đi tham quan bằng thuyền. Mỗi thuyền chở được nhiều nhất {k} người. Hỏi cần ít nhất bao nhiêu chiếc thuyền?",
         "Số người đi tham quan là:", "người", "thuyền", "Cần ít nhất □ chiếc thuyền.", "chiếc thuyền"),
        ("Thư viện có {n1} quyển truyện và {n2} quyển từ điển cần xếp vào các ngăn tủ, mỗi ngăn xếp được nhiều nhất {k} quyển. Hỏi cần ít nhất bao nhiêu ngăn tủ?",
         "Số sách cần xếp là:", "quyển", "ngăn", "Cần ít nhất □ ngăn tủ.", "ngăn tủ"),
    ])
    prompt = ctx[0].format(n1=fmt(n1), n2=fmt(n2), k=k)
    lines = [Ln(ctx[1], n1, "+", n2, ctx[2]),
             (f"Ta có {fmt(n)} : {k} = {fmt(q)} (dư {r}). Còn {r} {ctx[2]} nữa nên cần thêm 1 {ctx[3]}. Số {ctx[3]} cần có ít nhất là:",
              f"{fmt(q)} + 1 = {fmt(q + 1)} ({ctx[3]})")]
    return word(rng, prompt, lines, q + 1, ctx[5], ctx[4], f"{fmt(q + 1)} {ctx[5]}", [(n1, "+", n2), long_div(n, k)],
                skills, "ceil", level, mode, wrong=[q, q + 2, n1 // k + 1 if n1 // k + 1 != q + 1 else q + 3])


@retrying
def w_age(rng, kind, skills, level=3, mode="fill"):
    if kind == "times":
        c = rnd(rng, 5, 10)
        k = rnd(rng, 3, 5)
        m = c * k
        n = rnd(rng, 2, 6)
        need(25 <= m <= 45)
        s = m + c
        r = s + n + n
        prompt = f"Năm nay con {c} tuổi, tuổi mẹ gấp {k} lần tuổi con. Hỏi {n} năm nữa, tổng số tuổi của hai mẹ con là bao nhiêu?"
        lines = [Ln("Năm nay mẹ có số tuổi là:", c, "×", k, "tuổi"), Ln("Năm nay tổng số tuổi của hai mẹ con là:", m, "+", c, "tuổi"),
                 (f"Sau {n} năm, mỗi người thêm {n} tuổi. Tổng số tuổi của hai mẹ con khi đó là:", EQ(f"{s} + {n} + {n}", "tuổi"))]
        return word(rng, prompt, lines, r, "tuổi", "Tổng số tuổi khi đó là □ tuổi.", f"{r} tuổi", [(m, "+", c), col_add([s, n, n])],
                    skills, "age", level, mode, wrong=[s + n, s, r + n])
    if kind == "diff":
        c = rnd(rng, 5, 9)
        m = rnd(rng, 28, 40)
        c2 = c + rnd(rng, 4, 12)
        d = m - c
        r = c2 + d
        prompt = f"Năm nay mẹ {m} tuổi, con {c} tuổi. Hỏi khi con {c2} tuổi thì mẹ bao nhiêu tuổi?"
        lines = [Ln("Mẹ hơn con số tuổi là:", m, "-", c, "tuổi"), Ln(f"Khi con {c2} tuổi thì tuổi của mẹ là:", c2, "+", d, "tuổi")]
        return word(rng, prompt, lines, r, "tuổi", "Khi đó mẹ □ tuổi.", f"{r} tuổi", [(m, "-", c), (c2, "+", d)],
                    skills, "age", level, mode, wrong=[m + c2, m + c2 - c - 1, d])
    # sum_diff: cách đây n năm tổng tuổi hai anh em là S, anh hơn em d tuổi → tuổi anh hiện nay
    e = rnd(rng, 6, 10)
    d = rnd(rng, 2, 6)
    a = e + d
    n = rnd(rng, 2, 4)
    need(e - n >= 2)
    S = (a - n) + (e - n)
    now = S + n + n
    prompt = f"Cách đây {n} năm, tổng số tuổi của hai anh em là {S} tuổi. Năm nay anh hơn em {d} tuổi. Hỏi năm nay anh bao nhiêu tuổi?"
    lines = [(f"Mỗi người thêm {n} tuổi nên năm nay tổng số tuổi của hai anh em là:", EQ(f"{S} + {n} + {n}", "tuổi")),
             ("Hai lần tuổi em năm nay là:", eq(now, "-", d, "tuổi")), Ln("Tuổi em năm nay là:", now - d, ":", 2, "tuổi"),
             Ln("Tuổi anh năm nay là:", e, "+", d, "tuổi")]
    return word(rng, prompt, lines, a, "tuổi", "Năm nay anh □ tuổi.", f"{a} tuổi", [(now, "-", d), (now - d, ":", 2)],
                skills, "age", level, mode, wrong=[e, (S + d) // 2 if (S + d) % 2 == 0 else a + 1, a + n])


@retrying
def w_share_rest(rng, skills, level=3, mode="fill"):
    k = rnd(rng, 2, 9)
    x = rnd(rng, 3, 10)
    a = k * x
    c = rnd(rng, 2, a - x - 2)
    r = a - x - c
    need(r > 0 and a <= 90)
    name = rng.choice(NAMES)
    prompt = f"{name} có {a} nhãn vở. {name} cho em 1/{k} số nhãn vở, rồi cho bạn {c} nhãn vở. Hỏi {name} còn lại bao nhiêu nhãn vở?"
    lines = [Ln(f"Số nhãn vở {name} cho em là:", a, ":", k, "nhãn vở"), Ln(f"Số nhãn vở {name} đã cho đi là:", x, "+", c, "nhãn vở"),
             Ln(f"Số nhãn vở {name} còn lại là:", a, "-", x + c, "nhãn vở")]
    return word(rng, prompt, lines, r, "nhãn vở", f"{name} còn lại □ nhãn vở.", f"{r} nhãn vở", [(x, "+", c), (a, "-", x + c)],
                skills, "multi", level, mode, wrong=[a - x, a - c, x + c])


@retrying
def w_after_frac(rng, skills, level=3, mode="fill", big=False):
    k = rnd(rng, 2, 6)
    part = rnd(rng, 3, 9) if not big else rnd(rng, 12, 150)
    rest = part * (k - 1)
    tot = part * k
    need(tot <= (90 if not big else 999))
    prompt = f"Một cửa hàng có một số ki-lô-gam đường. Cửa hàng đã bán 1/{k} số đường thì còn lại {rest} kg. Hỏi lúc đầu cửa hàng có bao nhiêu ki-lô-gam đường?"
    lines = [(f"Coi số đường lúc đầu gồm {k} phần bằng nhau thì đã bán 1 phần, còn lại số phần là:", f"{k} - 1 = {k - 1} (phần)"),
             Ln("Giá trị của một phần là:", rest, ":", k - 1, "kg"), Ln("Số đường lúc đầu là:", part, "×", k, "kg")]
    return word(rng, prompt, lines, tot, "kg", "Lúc đầu cửa hàng có □ kg đường.", f"{tot} kg đường", [(rest, ":", k - 1), (part, "×", k)],
                skills, "frac_rest", level, mode, wrong=[rest * k, rest + part * 2, rest + k])


@retrying
def w_frac_two(rng, skills, level=3, mode="fill"):
    k = rnd(rng, 2, 6)
    m = rnd(rng, 2, 9)
    q = rnd(rng, 2, 9)
    rest = q * m
    need(rest % (k - 1) == 0)
    part = rest // (k - 1)
    a = part * k
    need(a <= 90 and part <= 10)
    prompt = f"Mẹ có {a} quả cam. Mẹ biếu bà 1/{k} số cam, số cam còn lại mẹ xếp đều vào {m} đĩa. Hỏi mỗi đĩa có bao nhiêu quả cam?"
    lines = [Ln("Số cam mẹ biếu bà là:", a, ":", k, "quả"), Ln("Số cam còn lại là:", a, "-", part, "quả"), Ln("Số cam mỗi đĩa có là:", rest, ":", m, "quả")]
    return word(rng, prompt, lines, q, "quả", "Mỗi đĩa có □ quả cam.", f"{q} quả cam", [(a, "-", part)],
                skills, "multi", level, mode, wrong=[part, a // m if a % m == 0 else q + 1, q + 2])


# --- Hình học ------------------------------------------------------------------
@retrying
def w_midpoint_chain(rng, skills, level=3, mode="fill", big=False):
    q = rnd(rng, 2, 5) if not big else rnd(rng, 6, 24)
    AB = 4 * q
    half = 2 * q
    r = half + q
    prompt = f"Đoạn thẳng AB dài {AB} cm. M là trung điểm của đoạn thẳng AB, N là trung điểm của đoạn thẳng MB. Tính độ dài đoạn thẳng AN."
    lines = [Ln("Độ dài đoạn thẳng AM (bằng MB) là:", AB, ":", 2, "cm"), Ln("Độ dài đoạn thẳng MN là:", half, ":", 2, "cm"),
             Ln("Độ dài đoạn thẳng AN là:", half, "+", q, "cm")]
    return word(rng, prompt, lines, r, "cm", "AN = □ cm.", f"{r} cm", [(AB, ":", 2), (half, ":", 2), (half, "+", q)],
                skills, "midpoint", level, mode, wrong=[half, q, AB - q + 1])


@retrying
def w_midpoint_rev(rng, skills, level=3, mode="fill"):
    am = rnd(rng, 4, 9)
    AB = 2 * am
    nb = rnd(rng, 2, AB - 3)
    need(nb != am)
    r = AB - nb
    prompt = f"M là trung điểm của đoạn thẳng AB và AM = {am} cm. Điểm N nằm trên đoạn thẳng AB sao cho NB = {nb} cm. Tính độ dài đoạn thẳng AN."
    lines = [Ln("Độ dài đoạn thẳng AB là:", am, "×", 2, "cm"), Ln("Độ dài đoạn thẳng AN là:", AB, "-", nb, "cm")]
    return word(rng, prompt, lines, r, "cm", "AN = □ cm.", f"{r} cm", [(AB, "-", nb)], skills, "midpoint", level, mode,
                wrong=[am - nb if am > nb else am + nb, AB, r + 1])


@retrying
def w_circles_row(rng, skills, level=3, mode="fill", big=False):
    r = rnd(rng, 2, 5) if not big else rnd(rng, 6, 15)
    n = rnd(rng, 3, 5)
    d = 2 * r
    tot = d * n
    prompt = f"Bạn Nam vẽ {n} hình tròn bằng nhau, mỗi hình có bán kính {r} cm, xếp thành một hàng sát nhau (hình nọ chạm hình kia). Hỏi hàng hình tròn đó dài bao nhiêu xăng-ti-mét?"
    lines = [Ln("Đường kính của mỗi hình tròn là:", r, "×", 2, "cm"), Ln("Hàng hình tròn dài là:", d, "×", n, "cm")]
    return word(rng, prompt, lines, tot, "cm", "Hàng hình tròn dài □ cm.", f"{tot} cm", [(r, "×", 2), (d, "×", n)],
                skills, "circle", level, mode, wrong=[r * n, d + n, tot + r])


@retrying
def w_square_circle(rng, skills, level=3, mode="fill"):
    r = rnd(rng, 2, 5)
    d = 2 * r
    tot = d * 4
    prompt = f"Một hình tròn có bán kính {r} cm. Một hình vuông có cạnh dài bằng đường kính của hình tròn đó. Tính tổng độ dài bốn cạnh của hình vuông."
    lines = [Ln("Cạnh hình vuông (bằng đường kính) dài là:", r, "×", 2, "cm"), Ln("Tổng độ dài bốn cạnh của hình vuông là:", d, "×", 4, "cm")]
    return word(rng, prompt, lines, tot, "cm", "Tổng độ dài bốn cạnh là □ cm.", f"{tot} cm", [(d, "×", 4)],
                skills, "circle", level, mode, wrong=[r * 4, d + 4, tot + d])


@retrying
def b_geo_match(rng, skills, level=2):
    used = set()
    pairs, steps = [], []
    kinds = ["mid", "dia", "rad", "center"]
    rng.shuffle(kinds)
    for kd in kinds:
        x = rnd(rng, 3, 9)
        if kd == "mid":
            left, v, st = f"M là trung điểm của AB, AM = {x} cm. Độ dài AB", 2 * x, E(eq(x, "×", 2))
        elif kd == "dia":
            left, v, st = f"Hình tròn có đường kính {2 * x} cm. Bán kính", x, E(eq(2 * x, ":", 2))
        elif kd == "rad":
            left, v, st = f"Hình tròn có bán kính {x} cm. Đường kính", 2 * x, E(eq(x, "×", 2))
        else:
            left, v, st = f"O là trung điểm của đoạn CD dài {2 * x} cm. Độ dài OC", x, E(eq(2 * x, ":", 2))
        need(v not in used)
        used.add(v)
        pairs.append((left, f"{v} cm"))
        steps.append(st)
    extra = next(f"{v} cm" for v in range(3, 30) if v not in used)
    return mk("matching", "Nối cho đúng.", "Nối mỗi câu với độ dài đúng.", level, 120, skills, "; ".join(f"{l}: {r}" for l, r in pairs),
              steps, "circle", **MT(rng, pairs, [extra]))


@retrying
def b_geo_drag(rng, skills, level=2):
    r1, x, r2 = rnd(rng, 3, 9), rnd(rng, 3, 9), rnd(rng, 2, 4)
    n = 3
    vals = [r1, x, r2 * 2 * n]
    need(len(set(vals)) == 3)
    tmpl = (f"Hình tròn có đường kính {2 * r1} cm thì bán kính dài □ cm.\n"
            f"M là trung điểm của đoạn thẳng AB dài {2 * x} cm thì AM dài □ cm.\n"
            f"{n} hình tròn bán kính {r2} cm xếp thành hàng sát nhau thì hàng đó dài □ cm.")
    extra = next(v for v in (r2 * n, r1 * 2, x + 1) if v not in vals)
    steps = [E(eq(2 * r1, ":", 2)), E(eq(2 * x, ":", 2)), E(eq(r2, "×", 2)), E(eq(r2 * 2, "×", n))]
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số thích hợp vào mỗi ô trống.", level, 120, skills, "; ".join(map(str, vals)),
              steps, "circle", **DD(rng, tmpl, [str(v) for v in vals], [str(extra)]))


@retrying
def b_clock_right(rng, skills, level=3):
    h1 = rnd(rng, 1, 8)
    h2 = rnd(rng, h1 + 3, 12)
    hs = [h for h in range(h1, h2 + 1) if (h * 30) % 360 in (90, 270)]
    r = len(hs)
    prompt = (f"Chỉ tính các lúc đồng hồ chỉ giờ đúng, từ {h1} giờ đến {h2} giờ (tính cả {h1} giờ và {h2} giờ) có mấy lúc "
              "kim giờ và kim phút tạo thành một góc vuông?")
    steps = [T("Lúc giờ đúng, kim phút chỉ số 12. Kim giờ và kim phút tạo thành góc vuông khi kim giờ chỉ số 3 hoặc số 9."),
             T(("Trong khoảng đã cho có: " + ", ".join(f"{h} giờ" for h in hs) + ".") if hs else "Trong khoảng đã cho không có lúc nào như vậy."),
             T(f"Vậy có {r} lúc.")]
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 120, skills, str(r), steps, "angle",
              **MC(rng, str(r), [str(w) for w in range(0, 4) if w != r][:3]))


@retrying
def w_polygon_sides(rng, skills, level=3, mode="fill"):
    a, b = rnd(rng, 2, 9), rnd(rng, 2, 9)
    need(a != b)
    x, y = a * 3, b * 4
    tot = x + y
    prompt = f"Bạn Mai dùng que tính để xếp {a} hình tam giác và {b} hình tứ giác rời nhau (mỗi cạnh là một que tính). Hỏi Mai dùng tất cả bao nhiêu que tính?"
    lines = [Ln(f"Số que tính xếp {a} hình tam giác là:", 3, "×", a, "que"), Ln(f"Số que tính xếp {b} hình tứ giác là:", 4, "×", b, "que"),
             Ln("Số que tính Mai dùng tất cả là:", x, "+", y, "que")]
    return word(rng, prompt, lines, tot, "que", "Mai dùng tất cả □ que tính.", f"{tot} que tính", [(x, "+", y)],
                skills, "shape", level, mode, wrong=[a + b, a * 4 + b * 3, tot + 1])


@retrying
def w_rect_sides(rng, skills, level=3, mode="fill"):
    a = rnd(rng, 6, 15)
    d = rnd(rng, 2, a - 2)
    b = a - d
    tot = a + b + a + b
    prompt = f"Hình chữ nhật ABCD có chiều dài {a} cm, chiều rộng ngắn hơn chiều dài {d} cm. Tính tổng độ dài bốn cạnh của hình chữ nhật đó."
    lines = [Ln("Chiều rộng của hình chữ nhật là:", a, "-", d, "cm"), ("Tổng độ dài bốn cạnh của hình chữ nhật là:", EQ(f"{a} + {b} + {a} + {b}", "cm"))]
    return word(rng, prompt, lines, tot, "cm", "Tổng độ dài bốn cạnh là □ cm.", f"{tot} cm", [(a, "-", d), *col_add_n([a, b, a, b])],
                skills, "shape", level, mode, wrong=[a + b, a + d + a + d, tot - 2])


@retrying
def w_two_squares(rng, skills, level=3, mode="fill"):
    s = rnd(rng, 2, 9)
    n = rnd(rng, 2, 4)
    L = s * n
    tot = L + s + L + s
    prompt = f"Ghép {n} hình vuông cạnh {s} cm thành một hàng (cạnh nọ sát cạnh kia) để được một hình chữ nhật. Tính tổng độ dài bốn cạnh của hình chữ nhật đó."
    lines = [Ln("Chiều dài của hình chữ nhật là:", s, "×", n, "cm"), ("Tổng độ dài bốn cạnh của hình chữ nhật là:", EQ(f"{L} + {s} + {L} + {s}", "cm"))]
    return word(rng, prompt, lines, tot, "cm", "Tổng độ dài bốn cạnh là □ cm.", f"{tot} cm", [*col_add_n([L, s, L, s])],
                skills, "shape", level, mode, wrong=[s * 4 * n, L + s, tot + s])


@retrying
def w_wire_square(rng, skills, level=3, mode="fill"):
    s = rnd(rng, 3, 9)
    left = rnd(rng, 2, 9)
    W = 4 * s + left
    prompt = f"Bạn Hùng có một đoạn dây thép dài {W} cm. Hùng uốn đoạn dây thành một hình vuông thì còn thừa {left} cm. Hỏi cạnh hình vuông dài bao nhiêu xăng-ti-mét?"
    lines = [Ln("Độ dài dây thép dùng để uốn hình vuông là:", W, "-", left, "cm"), Ln("Cạnh của hình vuông dài là:", 4 * s, ":", 4, "cm")]
    return word(rng, prompt, lines, s, "cm", "Cạnh hình vuông dài □ cm.", f"{s} cm", [(W, "-", left)],
                skills, "perim_square", level, mode, wrong=[W // 4 if W // 4 != s else s + 2, s + 1, 4 * s])


@retrying
def b_shape_drag(rng, skills, level=2):
    a, b, c = rnd(rng, 2, 9), rnd(rng, 2, 9), rnd(rng, 2, 9)
    vals = [a * 3, b * 4, c * 4]
    need(len(set(vals)) == 3)
    tmpl = (f"{a} hình tam giác có tất cả □ cạnh.\n{b} hình tứ giác có tất cả □ đỉnh.\n{c} hình vuông có tất cả □ góc vuông.")
    extra = next(v for v in (a * 4, b * 3, c * 3, vals[0] + 1) if v not in vals)
    steps = [E(eq(3, "×", a)), E(eq(4, "×", b)), E(eq(4, "×", c))]
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số thích hợp vào mỗi ô trống.", level, 120, skills, "; ".join(map(str, vals)),
              steps, "shape", **DD(rng, tmpl, [str(v) for v in vals], [str(extra)]))


@retrying
def b_shape_match(rng, skills, level=2):
    pairs, steps, used = [], [], set()
    s = rnd(rng, 3, 9)
    t = rnd(rng, 3, 9)
    a, b = rnd(rng, 5, 12), rnd(rng, 2, 4)
    q = rnd(rng, 2, 9)
    items = [(f"Hình vuông cạnh {s} cm", 4 * s, E(eq(s, "×", 4))),
             (f"Hình tam giác có ba cạnh đều dài {t} cm", 3 * t, E(eq(t, "×", 3))),
             (f"Hình chữ nhật dài {a} cm, rộng {b} cm", 2 * (a + b), E(f"{a} + {b} + {a} + {b} = {2 * (a + b)}")),
             (f"Hình tứ giác có bốn cạnh đều dài {q} cm", 4 * q, E(eq(q, "×", 4)))]
    for left, v, st in items:
        need(v not in used)
        used.add(v)
        pairs.append((left, f"{v} cm"))
        steps.append(st)
    extra = next(f"{v} cm" for v in (4 * s + 1, 3 * t + 2, a + b) if v not in used)
    return mk("matching", "Nối cho đúng.", "Nối mỗi hình với tổng độ dài các cạnh của hình đó.", level, 120, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), steps, "perimeter", **MT(rng, pairs, [extra]))


@retrying
def w_cube_frame(rng, skills, level=3, mode="fill"):
    e = rnd(rng, 3, 8)
    left = rnd(rng, 3, 15)
    tot = 12 * e + left
    need(tot <= 100)
    prompt = f"Bạn Khang dùng các đoạn dây thép để làm khung một khối lập phương có cạnh dài {e} cm. Làm xong, Khang còn thừa {left} cm dây thép. Hỏi lúc đầu Khang có bao nhiêu xăng-ti-mét dây thép?"
    lines = [Ln("Khối lập phương có 12 cạnh. Số dây thép làm khung là:", 12, "×", e, "cm"), Ln("Số dây thép lúc đầu Khang có là:", 12 * e, "+", left, "cm")]
    return word(rng, prompt, lines, tot, "cm", "Lúc đầu Khang có □ cm dây thép.", f"{tot} cm", [(12, "×", e), (12 * e, "+", left)],
                skills, "cube", level, mode, wrong=[6 * e + left, 8 * e + left, 12 * e])


@retrying
def w_cube_faces(rng, skills, level=3, mode="fill"):
    n = rnd(rng, 3, 9)
    need_ = 6 * n
    have = need_ + rnd(rng, 3, 20)
    r = have - need_
    need(have <= 99)
    prompt = f"Bạn Linh dán kín tất cả các mặt của {n} khối lập phương, mỗi mặt dán một tờ giấy màu. Linh có {have} tờ giấy màu. Hỏi Linh còn thừa bao nhiêu tờ giấy màu?"
    lines = [Ln(f"Mỗi khối lập phương có 6 mặt. Số tờ giấy cần dán {n} khối là:", 6, "×", n, "tờ"), Ln("Số tờ giấy màu còn thừa là:", have, "-", need_, "tờ")]
    return word(rng, prompt, lines, r, "tờ", "Linh còn thừa □ tờ giấy màu.", f"{r} tờ giấy màu", [(have, "-", need_)],
                skills, "cube", level, mode, wrong=[have - 4 * n, have - 8 * n if have > 8 * n else r + 6, r + 1])


# --- Đo lường ------------------------------------------------------------------
CONV2 = {("m", "cm"): 100, ("m", "dm"): 10, ("dm", "cm"): 10, ("cm", "mm"): 10, ("m", "mm"): 1000, ("km", "m"): 1000,
         ("kg", "g"): 1000, ("l", "ml"): 1000, ("giờ", "phút"): 60, ("ngày", "giờ"): 24, ("tuần", "ngày"): 7}


def qty2(rng, big, small):
    f = CONV2[(big, small)]
    a = rnd(rng, 1, 9) if f >= 100 else rnd(rng, 1, 5)
    if f == 1000:
        b = rng.choice([rnd(rng, 1, 99) * 5, rnd(rng, 1, 9) * 100, rnd(rng, 1, 99)])
    elif f == 100:
        b = rnd(rng, 1, 99)
    else:
        b = rnd(rng, 1, f - 1)
    return a, b, a * f + b


def q2text(a, big, b, small):
    return f"{a} {big} {fmt(b)} {small}"


def conv_steps(a, big, b, small):
    f = CONV2[(big, small)]
    tot = a * f + b
    return [T(f"1 {big} = {fmt(f)} {small} nên {a} {big} = {fmt(a * f)} {small}."), E(f"{fmt(a * f)} + {fmt(b)} = {fmt(tot)}")]


@retrying
def b_conv2_fill(rng, pairs, skills, level=3):
    (b1, s1), (b2, s2) = rng.sample(pairs, 2) if len(pairs) > 1 else (pairs[0], pairs[0])
    a1, c1, t1 = qty2(rng, b1, s1)
    a2, c2, t2 = qty2(rng, b2, s2)
    need(t1 != t2)
    tmpl = f"{q2text(a1, b1, c1, s1)} = □ {s1}\n{fmt(t2)} {s2} = □ {b2} □ {s2}"
    steps = conv_steps(a1, b1, c1, s1) + [T(f"{fmt(t2)} {s2} = {fmt(a2 * CONV2[(b2, s2)])} {s2} + {fmt(c2)} {s2} = {a2} {b2} {fmt(c2)} {s2}."),
                                           E(f"{fmt(a2 * CONV2[(b2, s2)])} + {fmt(c2)} = {fmt(t2)}")]
    return mk("fill_blank", "Điền số thích hợp.", "Viết số thích hợp vào ô trống:", level, 120, skills,
              f"{fmt(t1)} {s1}; {a2} {b2} {fmt(c2)} {s2}", steps, "two_units", **FB(tmpl, [t1, a2, c2]))


@retrying
def b_conv2_mc(rng, pairs, skills, level=3):
    big, small = rng.choice(pairs)
    f = CONV2[(big, small)]
    a, b, t = qty2(rng, big, small)
    texts, vals = [q2text(a, big, b, small)], [t]
    # các số đo gần bằng, viết theo nhiều cách
    alts = [(f"{fmt(t + rng.choice([-1, 1]) * rnd(rng, 1, 9) * (10 if f >= 100 else 1))} {small}"),
            (f"{a} {big} {fmt(b // 10 if b >= 10 else b + 1)} {small}"),
            (f"{fmt(a * f + (b * 10 if b * 10 < f else b - 1))} {small}"),
            (f"{a + (1 if f < 1000 else 0)} {big}")]
    for x in alts:
        m = re.fullmatch(r"([0-9.]+) (\S+)(?: ([0-9.]+) (\S+))?", x)
        v = int(m.group(1).replace(".", "")) * (f if m.group(2) == big else 1) + (int(m.group(3).replace(".", "")) if m.group(3) else 0)
        if v > 0 and v not in vals and x not in texts:
            texts.append(x)
            vals.append(v)
    need(len(texts) >= 4)
    texts, vals = texts[:4], vals[:4]
    i = vals.index(max(vals))
    steps = [T(f"Đổi tất cả về {small}:")] + [T(f"{x} = {fmt(v)} {small}") for x, v in zip(texts, vals)] + [
        T(f"Số đo lớn nhất là {texts[i]}.")]
    return mk("multiple_choice", "Chọn đáp án đúng.", "Số đo nào lớn nhất?", level, 120, skills, texts[i], steps, "two_units",
              **MC(rng, texts[i], [x for j, x in enumerate(texts) if j != i]))


@retrying
def b_conv2_drag(rng, pairs, skills, level=2):
    ps = [rng.choice(pairs) for _ in range(3)]
    qs = [qty2(rng, b, s) for b, s in ps]
    vals = [q[2] for q in qs]
    need(len(set(vals)) == 3)
    tmpl = "\n".join(f"{q2text(a, b, c, s)} = □ {s}" for (a, c, _), (b, s) in zip(qs, ps))
    extra = next(v for v in (vals[0] + 9 * CONV2[ps[0]] // 10, vals[1] + 1, vals[2] + 10) if v not in vals)
    steps = [st for (a, c, _), (b, s) in zip(qs, ps) for st in conv_steps(a, b, c, s)]
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số thích hợp vào mỗi ô trống.", level, 120, skills,
              "; ".join(fmt(v) for v in vals), steps, "two_units", **DD(rng, tmpl, [fmt(v) for v in vals], [fmt(extra)]))


@retrying
def b_conv2_match(rng, pairs, skills, level=2):
    out, steps = [], []
    for _ in range(4):
        b, s = rng.choice(pairs)
        a, c, t = qty2(rng, b, s)
        right = f"{fmt(t)} {s}"
        need(right not in [o[1] for o in out])
        out.append((q2text(a, b, c, s), right))
        steps += conv_steps(a, b, c, s)
    b, s = rng.choice(pairs)
    a, c, t = qty2(rng, b, s)
    extra = f"{fmt(a * 10 + c if CONV2[(b, s)] >= 100 else t + 1)} {s}"
    need(extra not in [o[1] for o in out])
    return mk("matching", "Nối hai số đo bằng nhau.", "Nối mỗi số đo ở cột trái với số đo bằng nó ở cột phải.", level, 150, skills,
              "; ".join(f"{l} = {r}" for l, r in out), steps, "two_units", **MT(rng, out, [extra]))


@retrying
def w_len_cut(rng, skills, level=3, mode="fill"):
    n, p = rnd(rng, 3, 5), rnd(rng, 6, 9)
    used = n * p
    r = 100 - used
    prompt = f"Một sợi dây dài 1 m. Bạn An cắt ra {n} đoạn, mỗi đoạn dài {p} cm. Hỏi sợi dây còn lại dài bao nhiêu xăng-ti-mét?"
    lines = [(f"Đổi: 1 m = 100 cm. Độ dài {n} đoạn dây đã cắt là:", eq(p, "×", n, "cm")), Ln("Sợi dây còn lại dài là:", 100, "-", used, "cm")]
    return word(rng, prompt, lines, r, "cm", "Sợi dây còn lại dài □ cm.", f"{r} cm", [(100, "-", used)],
                skills, "two_units", level, mode, wrong=[100 - p, 10 - n if 10 > n else r + 1, r + 10])


@retrying
def w_polyline(rng, skills, level=3, mode="fill"):
    n, p, more = rnd(rng, 3, 5), rnd(rng, 4, 9), rnd(rng, 11, 25)
    x = n * p
    r = x + more
    prompt = f"Con kiến bò theo một đường gấp khúc gồm {n} đoạn thẳng, mỗi đoạn dài {p} cm, rồi bò tiếp thẳng thêm {more} cm nữa. Hỏi con kiến đã bò được tất cả bao nhiêu xăng-ti-mét?"
    lines = [Ln("Độ dài đường gấp khúc là:", p, "×", n, "cm"), Ln("Con kiến đã bò được tất cả là:", x, "+", more, "cm")]
    return word(rng, prompt, lines, r, "cm", "Con kiến bò được □ cm.", f"{r} cm", [(x, "+", more)], skills, "polyline", level, mode,
                wrong=[p + n + more, x, r + p])


@retrying
def w_bag(rng, skills, level=3, mode="fill"):
    tot = rng.choice([50, 60, 70, 80, 90])
    n, p, c = rnd(rng, 2, 5), rnd(rng, 3, 9), rnd(rng, 5, 20)
    sold1 = n * p
    s = sold1 + c
    r = tot - s
    need(r > 0)
    prompt = f"Một bao gạo nặng {tot} kg. Buổi sáng cửa hàng bán {n} lần, mỗi lần {p} kg gạo; buổi chiều bán thêm {c} kg gạo. Hỏi bao gạo còn lại bao nhiêu ki-lô-gam?"
    lines = [Ln("Buổi sáng cửa hàng bán được số gạo là:", p, "×", n, "kg"), Ln("Cả ngày cửa hàng bán được số gạo là:", sold1, "+", c, "kg"),
             Ln("Bao gạo còn lại số ki-lô-gam là:", tot, "-", s, "kg")]
    return word(rng, prompt, lines, r, "kg", "Bao gạo còn lại □ kg.", f"{r} kg gạo", [(sold1, "+", c), (tot, "-", s)],
                skills, "multi", level, mode, wrong=[tot - sold1, tot - c, r + p])


@retrying
def w_len_mm(rng, skills, level=3, mode="fill"):
    a, b = rnd(rng, 2, 6), rnd(rng, 1, 9)
    c = rnd(rng, 12, 45)
    x = a * 10 + b
    r = x + c
    prompt = f"Một chú sâu bò được {a} cm {b} mm, sau đó bò tiếp {c} mm nữa. Hỏi chú sâu đã bò được tất cả bao nhiêu mi-li-mét?"
    lines = [(f"Đổi: {a} cm {b} mm =", f"{a} × 10 + {b} = {x} (mm)"), Ln("Chú sâu đã bò được tất cả là:", x, "+", c, "mm")]
    return word(rng, prompt, lines, r, "mm", "Chú sâu bò được □ mm.", f"{r} mm", [(x, "+", c)], skills, "two_units", level, mode,
                wrong=[a + b + c, a * 10 + c, r + 10])


@retrying
def w_mass_balance(rng, skills, level=3, mode="fill"):
    a = rng.choice([100, 200, 300, 400, 500])
    b = rng.choice([100, 200, 500])
    right = 1000 + b
    r = right - a
    need(a != b)
    prompt = f"Cân thăng bằng: đĩa cân bên trái có một quả bưởi và một quả cân {a} g; đĩa cân bên phải có một quả cân 1 kg và một quả cân {b} g. Hỏi quả bưởi nặng bao nhiêu gam?"
    lines = [("Đổi 1 kg = 1.000 g. Đĩa cân bên phải nặng:", eq(1000, "+", b, "g")), Ln("Quả bưởi nặng là:", right, "-", a, "g")]
    return word(rng, prompt, lines, r, "g", "Quả bưởi nặng □ g.", f"{fmt(r)} g", [(1000, "+", b), (right, "-", a)],
                skills, "two_units", level, mode, wrong=[1000 - a, right, r + 100])


@retrying
def w_mass_jar(rng, skills, level=3, mode="fill", big=False):
    kg = rnd(rng, 1, 3) if not big else rnd(rng, 2, 5)
    m = rnd(rng, 2, 5)
    q = rnd(rng, 1, 4) * 100 if not big else rnd(rng, 11, 60) * 5
    rest = q * m
    used = kg * 1000 - rest
    need(used > 0 and used % 1000 and (used % 100 == 0 or big))
    prompt = f"Một túi đường nặng {kg} kg. Mẹ đã dùng {fmt(used)} g đường để làm bánh, số đường còn lại mẹ chia đều vào {m} lọ. Hỏi mỗi lọ có bao nhiêu gam đường?"
    lines = [(f"Đổi {kg} kg = {fmt(kg * 1000)} g. Số đường còn lại là:", eq(kg * 1000, "-", used, "g")), Ln("Số đường mỗi lọ có là:", rest, ":", m, "g")]
    return word(rng, prompt, lines, q, "g", "Mỗi lọ có □ g đường.", f"{fmt(q)} g đường", [(kg * 1000, "-", used), (rest, ":", m)],
                skills, "two_units", level, mode, wrong=[rest, q + 100, (kg * 1000) // m if (kg * 1000) % m == 0 else q + 50])


@retrying
def w_vol_cups(rng, skills, level=3, mode="fill"):
    L = rnd(rng, 2, 4)
    p = rng.choice([100, 200, 250, 300])
    n = rnd(rng, 2, 6)
    used = p * n
    r = L * 1000 - used
    need(r > 0)
    prompt = f"Một can có {L} l nước cam. Mẹ rót ra {n} cốc, mỗi cốc {p} ml. Hỏi trong can còn lại bao nhiêu mi-li-lít nước cam?"
    lines = [Ln(f"Số nước cam đã rót ra {n} cốc là:", p, "×", n, "ml"), (f"Đổi {L} l = {fmt(L * 1000)} ml. Số nước cam còn lại là:", eq(L * 1000, "-", used, "ml"))]
    return word(rng, prompt, lines, r, "ml", "Trong can còn lại □ ml nước cam.", f"{fmt(r)} ml", [(p, "×", n), (L * 1000, "-", used)],
                skills, "two_units", level, mode, wrong=[L * 1000 - p, used, r + p])


@retrying
def w_vol_two(rng, skills, level=3, mode="fill"):
    a, b = 1, rng.choice([100, 200, 250, 300, 400, 500, 600, 750])
    x = a * 1000 + b
    d = rnd(rng, 11, 60) * 5
    y = x - d
    tot = x + y
    prompt = f"Bình thứ nhất có {a} l {b} ml nước. Bình thứ hai có ít hơn bình thứ nhất {d} ml nước. Hỏi cả hai bình có bao nhiêu mi-li-lít nước?"
    lines = [(f"Đổi {a} l {b} ml =", f"{fmt(1000)} + {b} = {fmt(x)} (ml)"), Ln("Số nước ở bình thứ hai là:", x, "-", d, "ml"),
             Ln("Số nước ở cả hai bình là:", x, "+", y, "ml")]
    return word(rng, prompt, lines, tot, "ml", "Cả hai bình có □ ml nước.", f"{fmt(tot)} ml", [(x, "-", d), (x, "+", y)],
                skills, "two_units", level, mode, wrong=[x + d, y, tot + d])


@retrying
def w_temp(rng, skills, level=3, mode="fill"):
    s = rnd(rng, 14, 24)
    up = rnd(rng, 5, 12)
    down = rnd(rng, 2, up - 1)
    noon = s + up
    ev_ = noon - down
    r = ev_ - s
    prompt = (f"Lúc 6 giờ sáng, nhiệt độ ở Sa Pa là {s} °C. Đến trưa, nhiệt độ tăng thêm {up} °C. Đến tối, nhiệt độ giảm đi {down} °C so với buổi trưa. "
              "Hỏi nhiệt độ buổi tối cao hơn nhiệt độ lúc 6 giờ sáng bao nhiêu độ C?")
    lines = [Ln("Nhiệt độ buổi trưa là:", s, "+", up, "°C"), Ln("Nhiệt độ buổi tối là:", noon, "-", down, "°C"),
             Ln("Buổi tối cao hơn lúc 6 giờ sáng là:", ev_, "-", s, "°C")]
    return word(rng, prompt, lines, r, "°C", "Buổi tối cao hơn buổi sáng □ °C.", f"{r} °C", [(s, "+", up), (noon, "-", down), (ev_, "-", s)],
                skills, "temperature", level, mode, wrong=[ev_, up, up + down])


@retrying
def w_len_share(rng, skills, level=3, mode="fill", big=False):
    a, b = rnd(rng, 2, 4), rnd(rng, 10, 90)
    x = a * 100 + b
    m = rnd(rng, 3, 9)
    q = rnd(rng, 15, x // m - 5)
    rest = q * m
    cut = x - rest
    need(cut > 0 and cut < 100)
    prompt = f"Một cuộn ruy băng dài {a} m {b} cm. Chị Hoa cắt đi {cut} cm để buộc hộp quà, phần còn lại cắt thành {m} đoạn dài bằng nhau. Hỏi mỗi đoạn dài bao nhiêu xăng-ti-mét?"
    lines = [(f"Đổi {a} m {b} cm =", f"{a * 100} + {b} = {x} (cm)"), Ln("Phần ruy băng còn lại dài là:", x, "-", cut, "cm"),
             Ln("Mỗi đoạn dài là:", rest, ":", m, "cm")]
    return word(rng, prompt, lines, q, "cm", "Mỗi đoạn dài □ cm.", f"{q} cm", [(x, "-", cut), (rest, ":", m)],
                skills, "two_units", level, mode, wrong=[q + 1, rest, (a * 100 + b - cut + 1) // m + 2])


# --- Gấp mấy lần ---------------------------------------------------------------
@retrying
def b_ratio_unit_match(rng, skills, level=2):
    opts = [("dm", "cm", 10), ("m", "dm", 10), ("cm", "mm", 10), ("m", "cm", 100)]
    pairs, steps, used = [], [], set()
    for _ in range(4):
        big, small, f = rng.choice(opts)
        a = rnd(rng, 1, 6)
        s = rng.choice([x for x in range(2, 10) if (a * f) % x == 0])
        r = a * f // s
        left = f"{a} {big} so với {s} {small}"
        need(r not in used and r > 1 and left not in [p[0] for p in pairs])
        used.add(r)
        pairs.append((left, f"gấp {r} lần"))
        steps += [T(f"{a} {big} = {a * f} {small}"), E(eq(a * f, ":", s))]
    extra = next(f"gấp {v} lần" for v in range(2, 60) if v not in used)
    return mk("matching", "Nối cho đúng.", "Nối mỗi cặp số đo với câu trả lời đúng: số đo thứ nhất gấp mấy lần số đo thứ hai?", level, 150, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), steps, "how_many_times", **MT(rng, pairs, [extra]))


@retrying
def w_how_many(rng, skills, level=3, mode="fill"):
    a = rnd(rng, 4, 9)
    k = rnd(rng, 3, 9)
    b = a * k
    more = b - a
    na, nb = rng.sample(NAMES, 2)
    prompt = f"{na} có {a} bông hoa. {nb} có nhiều hơn {na} {more} bông hoa. Hỏi số hoa của {nb} gấp mấy lần số hoa của {na}?"
    lines = [Ln(f"Số hoa của {nb} là:", a, "+", more, "bông"), (f"Số hoa của {nb} gấp số hoa của {na} số lần là:", eq(b, ":", a) + " (lần)")]
    return word(rng, prompt, lines, k, "lần", f"Gấp □ lần.", f"{k} lần", [(a, "+", more)], skills, "how_many_times", level, mode,
                wrong=[more // a if more % a == 0 and more // a != k else k + 1, k - 1, k + 2])


@retrying
def w_fill_to_ratio(rng, skills, level=3, mode="fill"):
    k = rnd(rng, 2, 5)
    target = rnd(rng, 12, 45)
    A = target * k
    B = rnd(rng, 5, target - 3)
    add = target - B
    need(A <= 999)
    prompt = f"Bể A có {A} l nước, bể B có {B} l nước. Phải đổ thêm vào bể B bao nhiêu lít nước để số nước ở bể A gấp {k} lần số nước ở bể B?"
    lines = [Ln(f"Khi số nước ở bể A gấp {k} lần thì bể B có:", A, ":", k, "l"), Ln("Số nước cần đổ thêm vào bể B là:", target, "-", B, "l")]
    return word(rng, prompt, lines, add, "l", "Phải đổ thêm □ l nước.", f"{add} l nước", [(A, ":", k), (target, "-", B)],
                skills, "how_many_times", level, mode, wrong=[target, A - B, add + k])


@retrying
def w_ratio_age(rng, skills, level=3, mode="fill"):
    c = rnd(rng, 5, 10)
    k = rnd(rng, 3, 6)
    m = c * k
    d = m - c
    need(24 <= m <= 45)
    prompt = f"Năm nay con {c} tuổi, mẹ hơn con {d} tuổi. Hỏi năm nay tuổi mẹ gấp mấy lần tuổi con?"
    lines = [Ln("Năm nay mẹ có số tuổi là:", c, "+", d, "tuổi"), ("Tuổi mẹ gấp tuổi con số lần là:", eq(m, ":", c) + " (lần)")]
    return word(rng, prompt, lines, k, "lần", "Tuổi mẹ gấp □ lần tuổi con.", f"{k} lần", [(c, "+", d)], skills, "how_many_times", level, mode,
                wrong=[k - 1, k + 1, d // c if d % c == 0 and d // c != k else k + 2])


# --- Số có bốn, năm chữ số; làm tròn; La Mã ---------------------------------------
@retrying
def b_num_cond_match(rng, d, skills, level=2):
    s1, s2 = rnd(rng, 5, 15), rnd(rng, 3, 9)
    c1 = digit_sum_numbers(d, s1, distinct=True)
    c2 = digit_sum_numbers(d, s2)
    need(c1 and c2)
    items = [(f"Số bé nhất có {d} chữ số khác nhau", int("10" + "".join(str(i) for i in range(2, d)))),
             (f"Số lớn nhất có {d} chữ số khác nhau", int("".join(str(9 - i) for i in range(d)))),
             (f"Số lớn nhất có {d} chữ số khác nhau mà tổng các chữ số bằng {s1}", max(c1)),
             (f"Số bé nhất có {d} chữ số mà tổng các chữ số bằng {s2}", min(c2))]
    vals = [v for _, v in items]
    need(len(set(vals)) == 4)
    extra = vals[3] + 9
    need(extra not in vals)
    steps = [T(f"{l}: {fmt(v)}.") for l, v in items]
    return mk("matching", "Nối cho đúng.", "Nối mỗi câu với số đúng.", level, 180, skills, "; ".join(f"{l}: {fmt(v)}" for l, v in items),
              steps, "digits", **MT(rng, [(l, fmt(v)) for l, v in items], [fmt(extra)]))


@retrying
def b_round_range(rng, d, base, skills, level=3, mode="fill"):
    N = rnd(rng, 10 ** (d - 1) // base + 1, (10 ** d - 1) // base - 1) * base
    big, small = N + base // 2 - 1, N - base // 2
    assert round_to(big, base) == N == round_to(small, base) and round_to(big + 1, base) != N != round_to(small - 1, base)
    assert len(str(small)) == d
    name = G.ROUND_NAME[base]
    steps = [T(f"Các số làm tròn đến hàng {name} được {fmt(N)} là các số từ {fmt(small)} đến {fmt(big)}."),
             E(f"{fmt(N)} - {fmt(base // 2)} = {fmt(small)}"), E(f"{fmt(N)} + {fmt(base // 2)} - 1 = {fmt(big)}")]
    if mode == "fill":
        return mk("fill_blank", "Điền số thích hợp.", f"Khi làm tròn đến hàng {name}, một số được làm tròn thành {fmt(N)}. Tìm số lớn nhất và số bé nhất có thể có.",
                  level, 150, skills, f"{fmt(big)}; {fmt(small)}", steps, "round_range", **FB("Số lớn nhất là □.\nSố bé nhất là □.", [big, small]))
    wrong = [big + 1, N + base - 1, small - 1]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Số lớn nhất mà khi làm tròn đến hàng {name} được {fmt(N)} là:", level, 120, skills,
              fmt(big), steps, "round_range", **MC(rng, fmt(big), [fmt(w) for w in wrong]))


@retrying
def w_round_estimate(rng, d, base, skills, level=3):
    p, q = G.n_digits(rng, d), G.n_digits(rng, d)
    P_, Q = round_to(p, base), round_to(q, base)
    need(p % base and q % base and p + q <= 100000 and P_ + Q <= 100000)
    est, exact = P_ + Q, p + q
    need(est != exact)
    diff = abs(exact - est)
    name = G.ROUND_NAME[base]
    hi_, lo_ = max(est, exact), min(est, exact)
    lines = [(f"Làm tròn {fmt(p)} đến hàng {name} được {fmt(P_)}; làm tròn {fmt(q)} được {fmt(Q)}. Tổng ước lượng là:", eq(P_, "+", Q)),
             ("Tổng đúng là:", eq(p, "+", q)), ("Tổng đúng và tổng ước lượng chênh lệch nhau:", eq(hi_, "-", lo_))]
    prompt = (f"Buổi sáng cửa hàng bán được {fmt(p)} kg gạo, buổi chiều bán được {fmt(q)} kg gạo. Bạn Nam làm tròn mỗi số đến hàng {name} "
              "rồi cộng lại để ước lượng. Tính tổng ước lượng của Nam và cho biết tổng đó chênh lệch với tổng đúng bao nhiêu ki-lô-gam.")
    steps = [WP(lines, f"tổng ước lượng {fmt(est)} kg; chênh lệch {fmt(diff)} kg")] + blocks((P_, "+", Q), (p, "+", q), (hi_, "-", lo_))
    return mk("fill_blank", "Giải bài toán.", prompt, level, 200, skills, f"{fmt(est)} kg; chênh lệch {fmt(diff)} kg", steps, "rounding",
              **FB("Tổng ước lượng là □ kg.\nChênh lệch với tổng đúng □ kg.", [(est, "kg"), (diff, "kg")]))


@retrying
def b_roman_calc(rng, skills, level=3):
    a, b = rnd(rng, 2, 19), rnd(rng, 2, 19)
    op = rng.choice(["+", "-"])
    r = a + b if op == "+" else a - b
    need(1 <= r <= 20 and a != b)
    right = roman(r)
    wrong = [roman(x) for x in {r + 1, r - 1, r + 5, r - 5, r + 10} if 1 <= x <= 20 and x != r]
    need(len(wrong) >= 3)
    rng.shuffle(wrong)
    steps = [T(f"{roman(a)} = {a}; {roman(b)} = {b}."), E(eq(a, op, b)), T(f"{r} viết bằng chữ số La Mã là {right}.")]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"Kết quả của {roman(a)} {op} {roman(b)}, viết bằng chữ số La Mã, là:", level, 90, skills,
              right, steps, "roman", **MC(rng, right, wrong[:3]))


@retrying
def b_roman_match(rng, skills, level=2):
    pairs, steps = [], []
    for _ in range(4):
        a, b = rnd(rng, 2, 15), rnd(rng, 2, 15)
        op = rng.choice(["+", "-"])
        r = a + b if op == "+" else a - b
        need(1 <= r <= 20)
        left = f"{roman(a)} {op} {roman(b)}"
        need(str(r) not in [p[1] for p in pairs] and left not in [p[0] for p in pairs])
        pairs.append((left, str(r)))
        steps.append(E(eq(a, op, b)))
    extra = next(str(v) for v in range(1, 21) if str(v) not in [p[1] for p in pairs])
    return mk("matching", "Nối phép tính với kết quả.", "Nối mỗi phép tính viết bằng chữ số La Mã với kết quả của nó.", level, 150, skills,
              "; ".join(f"{l} = {r}" for l, r in pairs), steps, "roman", **MT(rng, pairs, [extra]))


@retrying
def b_roman_order(rng, skills, level=2):
    vs = rng.sample(range(4, 21), 4)
    need(max(vs) - min(vs) <= 12)
    srt = sorted(vs)
    tmpl = " < ".join(["□"] * 4)
    steps = [T("; ".join(f"{roman(v)} = {v}" for v in vs) + "."), T("Xếp từ bé đến lớn: " + " < ".join(roman(v) for v in srt) + ".")]
    return mk("drag_drop", "Kéo thẻ vào ô trống.", "Kéo các số La Mã vào ô trống để được thứ tự từ bé đến lớn.", level, 90, skills,
              " < ".join(roman(v) for v in srt), steps, "roman", **DD(rng, tmpl, [roman(v) for v in srt]))


@retrying
def w_roman_book(rng, skills, level=3, mode="fill"):
    N = rnd(rng, 12, 20)
    r = rnd(rng, 4, N - 3)
    p = rnd(rng, 3, 9)
    left = N - r
    pages = left * p
    prompt = f"Một cuốn truyện có {roman(N)} chương, mỗi chương có {p} trang. Bạn Ngọc đã đọc hết chương {roman(r)}. Hỏi Ngọc còn phải đọc bao nhiêu trang nữa thì hết cuốn truyện?"
    lines = [(f"{roman(N)} = {N}; {roman(r)} = {r}. Số chương Ngọc còn phải đọc là:", eq(N, "-", r, "chương")),
             Ln("Số trang Ngọc còn phải đọc là:", p, "×", left, "trang")]
    return word(rng, prompt, lines, pages, "trang", "Ngọc còn phải đọc □ trang.", f"{pages} trang", [(N, "-", r), (left, "×", p)],
                skills, "roman", level, mode, wrong=[left, N * p, pages + p])


# --- Chu vi, diện tích -----------------------------------------------------------
@retrying
def w_rect_square_join(rng, skills, level=3, mode="fill"):
    b = rnd(rng, 3, 9)
    a = rnd(rng, b + 2, 25)
    L = a + b
    P = (L + b) * 2
    prompt = f"Một hình chữ nhật có chiều dài {a} cm, chiều rộng {b} cm. Ghép thêm một hình vuông cạnh {b} cm vào chiều rộng của hình chữ nhật để được một hình chữ nhật mới. Tính chu vi hình chữ nhật mới."
    lines = [Ln("Chiều dài hình chữ nhật mới là:", a, "+", b, "cm"), ("Chu vi hình chữ nhật mới là:", EQ(f"({L} + {b}) × 2", "cm"))]
    return word(rng, prompt, lines, P, "cm", "Chu vi hình chữ nhật mới là □ cm.", f"{P} cm", [(a, "+", b), (L, "+", b), (L + b, "×", 2)],
                skills, "perim_rect", level, mode, wrong=[(a + b) * 2 + b * 4, (a + b) * 2, P + b])


@retrying
def w_square_eq_rect(rng, skills, level=3, mode="fill"):
    a = rnd(rng, 8, 30)
    b = rnd(rng, 2, a - 2)
    need((a + b) % 2 == 0)
    P = (a + b) * 2
    s = P // 4
    prompt = f"Một hình vuông có chu vi bằng chu vi của hình chữ nhật có chiều dài {a} cm và chiều rộng {b} cm. Tính độ dài cạnh hình vuông."
    lines = [("Chu vi hình chữ nhật là:", EQ(f"({a} + {b}) × 2", "cm")), Ln("Cạnh của hình vuông dài là:", P, ":", 4, "cm")]
    return word(rng, prompt, lines, s, "cm", "Cạnh hình vuông dài □ cm.", f"{s} cm", [(a, "+", b), (a + b, "×", 2), (P, ":", 4)],
                skills, "perim_square", level, mode, wrong=[(a + b) // 2 + 1, P, s + 2])


@retrying
def w_rect_from_perim(rng, skills, level=3, mode="fill", ask="area"):
    w = rnd(rng, 3, 9)
    d = rnd(rng, 2, 20)
    l = w + d
    half = l + w
    P = half * 2
    prompt = f"Một hình chữ nhật có chu vi {P} cm, chiều dài hơn chiều rộng {d} cm. " + (
        "Tính diện tích hình chữ nhật đó." if ask == "area" else "Tính chiều dài hình chữ nhật đó.")
    lines = [Ln("Nửa chu vi (chiều dài cộng chiều rộng) là:", P, ":", 2, "cm"), Ln("Hai lần chiều rộng là:", half, "-", d, "cm"),
             Ln("Chiều rộng hình chữ nhật là:", 2 * w, ":", 2, "cm"), Ln("Chiều dài hình chữ nhật là:", w, "+", d, "cm")]
    calcs = [(P, ":", 2), (half, "-", d), (2 * w, ":", 2), (w, "+", d)]
    if ask == "area":
        lines.append(Ln("Diện tích hình chữ nhật là:", l, "×", w, "cm²"))
        calcs.append((l, "×", w))
        r, u, tmpl, ans, wrong = l * w, "cm²", "Diện tích là □ cm².", f"{l * w} cm²", [P, half * 2, l * (w + 1)]
    else:
        r, u, tmpl, ans, wrong = l, "cm", "Chiều dài là □ cm.", f"{l} cm", [half, half - d, l + d]
    return word(rng, prompt, lines, r, u, tmpl, ans, calcs, skills, "half_perim", level, mode, wrong=wrong, secs=240)


@retrying
def w_rect_double(rng, skills, level=3, mode="fill"):
    k = rnd(rng, 2, 4)
    w = rnd(rng, 2, 9)
    l = w * k
    half = l + w
    P = half * 2
    S = l * w
    prompt = f"Một hình chữ nhật có chu vi {P} cm, chiều dài gấp {k} lần chiều rộng. Tính diện tích hình chữ nhật đó."
    lines = [Ln("Nửa chu vi hình chữ nhật là:", P, ":", 2, "cm"),
             (f"Coi chiều rộng là 1 phần thì chiều dài là {k} phần như thế. Tổng số phần bằng nhau là:", f"1 + {k} = {k + 1} (phần)"),
             Ln("Chiều rộng hình chữ nhật là:", half, ":", k + 1, "cm"), Ln("Chiều dài hình chữ nhật là:", w, "×", k, "cm"),
             Ln("Diện tích hình chữ nhật là:", l, "×", w, "cm²")]
    return word(rng, prompt, lines, S, "cm²", "Diện tích là □ cm².", f"{S} cm²", [(P, ":", 2), (half, ":", k + 1), (l, "×", w)],
                skills, "parts", level, mode, wrong=[P, half * w, S + w], secs=240)


@retrying
def w_fence(rng, skills, level=3, mode="fill"):
    a, b = rnd(rng, 15, 45), rnd(rng, 8, 20)
    need(a > b)
    g = rnd(rng, 2, 4)
    P = (a + b) * 2
    r = P - g
    prompt = f"Một mảnh vườn hình chữ nhật có chiều dài {a} m, chiều rộng {b} m. Người ta rào xung quanh mảnh vườn, chừa lại một lối vào rộng {g} m. Hỏi hàng rào dài bao nhiêu mét?"
    lines = [("Chu vi mảnh vườn là:", EQ(f"({a} + {b}) × 2", "m")), Ln("Hàng rào dài là:", P, "-", g, "m")]
    return word(rng, prompt, lines, r, "m", "Hàng rào dài □ m.", f"{r} m", [(a, "+", b), (a + b, "×", 2), (P, "-", g)],
                skills, "perim_rect", level, mode, wrong=[P, a + b - g, P + g])


@retrying
def w_composite_area(rng, skills, level=3, mode="fill"):
    a, b = rnd(rng, 10, 25), rnd(rng, 3, 9)
    c = rnd(rng, 3, 9)
    need(c != b)
    s1, s2 = a * b, c * c
    tot = s1 + s2
    prompt = f"Một miếng bìa gồm một hình chữ nhật dài {a} cm, rộng {b} cm và một hình vuông cạnh {c} cm ghép sát nhau (không chồng lên nhau). Tính diện tích miếng bìa."
    lines = [Ln("Diện tích hình chữ nhật là:", a, "×", b, "cm²"), Ln("Diện tích hình vuông là:", c, "×", c, "cm²"),
             Ln("Diện tích miếng bìa là:", s1, "+", s2, "cm²")]
    return word(rng, prompt, lines, tot, "cm²", "Diện tích miếng bìa là □ cm².", f"{tot} cm²", [(a, "×", b), (s1, "+", s2)],
                skills, "composite", level, mode, wrong=[s1 + c * 4, (a + b) * 2 + c * 4, tot + c])


@retrying
def w_cut_square(rng, skills, level=3, mode="fill"):
    b = rnd(rng, 3, 9)
    a = rnd(rng, b + 3, 25)
    S = a * b
    s2 = b * b
    r = S - s2
    prompt = f"Từ một tờ giấy hình chữ nhật dài {a} cm, rộng {b} cm, bạn Chi cắt đi một hình vuông có cạnh bằng chiều rộng tờ giấy. Tính diện tích phần giấy còn lại."
    lines = [Ln("Diện tích tờ giấy hình chữ nhật là:", a, "×", b, "cm²"), Ln("Diện tích hình vuông cắt đi là:", b, "×", b, "cm²"),
             Ln("Diện tích phần giấy còn lại là:", S, "-", s2, "cm²")]
    return word(rng, prompt, lines, r, "cm²", "Phần còn lại có diện tích □ cm².", f"{r} cm²", [(a, "×", b), (S, "-", s2)],
                skills, "composite", level, mode, wrong=[S, (a - b) * 2 + b * 2, r + b])


@retrying
def w_area_square_perim(rng, skills, level=3, mode="fill"):
    s = rnd(rng, 3, 9)
    P = 4 * s
    S = s * s
    prompt = f"Một hình vuông có chu vi {P} cm. Tính diện tích hình vuông đó."
    lines = [Ln("Cạnh hình vuông dài là:", P, ":", 4, "cm"), Ln("Diện tích hình vuông là:", s, "×", s, "cm²")]
    return word(rng, prompt, lines, S, "cm²", "Diện tích hình vuông là □ cm².", f"{S} cm²", [(P, ":", 4)],
                skills, "area", level, mode, wrong=[P, s * 4 + s, S + s])


@retrying
def b_perim_match(rng, skills, level=2):
    pairs, steps, used = [], [], set()
    kinds = ["rect_m", "sq_dm", "rect", "sq"]
    for kd in kinds:
        if kd == "rect_m":
            a, b = rnd(rng, 1, 2), rng.choice([20, 25, 30, 40, 50])
            v = (a * 100 + b) * 2
            left = f"Hình chữ nhật dài {a} m, rộng {b} cm"
            st = [T(f"{a} m = {a * 100} cm"), E(EQ(f"({a * 100} + {b}) × 2"))]
        elif kd == "sq_dm":
            a, b = rnd(rng, 1, 3), rnd(rng, 1, 9)
            s = a * 10 + b
            v = s * 4
            left = f"Hình vuông cạnh {a} dm {b} cm"
            st = [T(f"{a} dm {b} cm = {s} cm"), E(eq(s, "×", 4))]
        elif kd == "rect":
            a, b = rnd(rng, 10, 40), rnd(rng, 3, 9)
            v = (a + b) * 2
            left = f"Hình chữ nhật dài {a} cm, rộng {b} cm"
            st = [E(EQ(f"({a} + {b}) × 2"))]
        else:
            s = rnd(rng, 11, 25)
            v = s * 4
            left = f"Hình vuông cạnh {s} cm"
            st = [E(eq(s, "×", 4))]
        need(v not in used)
        used.add(v)
        pairs.append((left, f"{v} cm"))
        steps += st
    extra = next(f"{v} cm" for v in (min(used) + 2, max(used) + 10) if v not in used)
    return mk("matching", "Nối hình với chu vi.", "Nối mỗi hình với chu vi của nó (đổi về xăng-ti-mét).", level, 180, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), steps, "perimeter", **MT(rng, pairs, [extra]))


@retrying
def b_perim_drag(rng, skills, level=2):
    s, t = rnd(rng, 4, 9), rnd(rng, 4, 9)
    w = rnd(rng, 3, 9)
    l = w + rnd(rng, 2, 10)
    P2 = (l + w) * 2
    vals = [s, w, t]
    need(len(set(vals)) == 3)
    tmpl = (f"Hình vuông có chu vi {4 * s} cm thì cạnh dài □ cm.\n"
            f"Hình chữ nhật có chu vi {P2} cm, chiều dài {l} cm thì chiều rộng là □ cm.\n"
            f"Hình tam giác có ba cạnh bằng nhau và chu vi {3 * t} cm thì mỗi cạnh dài □ cm.")
    extra = next(v for v in (l, s + 1, t + 2, w + 3) if v not in vals)
    steps = [E(eq(4 * s, ":", 4)), E(eq(P2, ":", 2)), E(eq(l + w, "-", l)), E(eq(3 * t, ":", 3))]
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số thích hợp vào mỗi ô trống.", level, 150, skills, "; ".join(map(str, vals)),
              steps, "half_perim", **DD(rng, tmpl, [str(v) for v in vals], [str(extra)]))


@retrying
def b_perim_cmp(rng, skills, level=3):
    shapes = []
    a, b = rnd(rng, 10, 20), rnd(rng, 3, 9)
    shapes.append((f"Hình chữ nhật dài {a} cm, rộng {b} cm", (a + b) * 2, EQ(f"({a} + {b}) × 2")))
    s = rnd(rng, 7, 15)
    shapes.append((f"Hình vuông cạnh {s} cm", s * 4, eq(s, "×", 4)))
    t = rnd(rng, 9, 20)
    shapes.append((f"Hình tam giác có ba cạnh đều dài {t} cm", t * 3, eq(t, "×", 3)))
    c, d = rnd(rng, 1, 2), rnd(rng, 1, 9)
    q = c * 10 + d
    shapes.append((f"Hình vuông cạnh {c} dm {d} cm", q * 4, eq(q, "×", 4)))
    vals = [v for _, v, _ in shapes]
    need(len(set(vals)) == 4)
    i = vals.index(max(vals))
    steps = [E(e) for _, _, e in shapes] + [T(f"Chu vi lớn nhất là {vals[i]} cm.")]
    return mk("multiple_choice", "Chọn đáp án đúng.", "Hình nào có chu vi lớn nhất?", level, 180, skills, shapes[i][0], steps, "perimeter",
              **MC(rng, shapes[i][0], [x for j, (x, _, _) in enumerate(shapes) if j != i]))


@retrying
def b_area_match(rng, skills, level=2):
    pairs, steps, used = [], [], set()
    for kd in ("perim_rect", "perim_sq", "plain", "plain2"):
        if kd == "perim_rect":
            w = rnd(rng, 2, 6)
            l = w + rnd(rng, 1, 6)
            P = (l + w) * 2
            v, left = l * w, f"Hình chữ nhật có chu vi {P} cm, chiều rộng {w} cm"
            st = [E(eq(P, ":", 2)), E(eq(l + w, "-", w)), E(eq(l, "×", w))]
        elif kd == "perim_sq":
            s = rnd(rng, 3, 9)
            v, left = s * s, f"Hình vuông có chu vi {4 * s} cm"
            st = [E(eq(4 * s, ":", 4)), E(eq(s, "×", s))]
        else:
            l, w = rnd(rng, 10, 20), rnd(rng, 3, 9)
            v, left = l * w, f"Hình chữ nhật dài {l} cm, rộng {w} cm"
            st = [E(eq(l, "×", w))]
        need(v not in used)
        used.add(v)
        pairs.append((left, f"{v} cm²"))
        steps += st
    extra = next(f"{v} cm²" for v in (min(used) + 4, max(used) + 6) if v not in used)
    return mk("matching", "Nối hình với diện tích.", "Nối mỗi hình với diện tích của nó.", level, 180, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), steps, "area", **MT(rng, pairs, [extra]))


@retrying
def b_area_drag(rng, skills, level=2):
    w1, l1 = rnd(rng, 3, 9), rnd(rng, 6, 15)
    s = rnd(rng, 3, 9)
    w3 = rnd(rng, 2, 9)
    l3 = rnd(rng, 10, 20)
    vals = [l1, s, l3]
    need(len(set(vals)) == 3)
    tmpl = (f"Hình chữ nhật có diện tích {l1 * w1} cm², chiều rộng {w1} cm thì chiều dài là □ cm.\n"
            f"Hình vuông có diện tích {s * s} cm² thì cạnh dài □ cm.\n"
            f"Hình chữ nhật có diện tích {l3 * w3} cm², chiều rộng {w3} cm thì chiều dài là □ cm.")
    extra = next(v for v in (l1 + 1, s + 2, l3 - 1) if v not in vals)
    steps = [E(eq(l1 * w1, ":", w1)), T(f"{s} × {s} = {s * s} nên cạnh hình vuông là {s} cm."), E(eq(l3 * w3, ":", w3))] + blocks((l1 * w1, ":", w1), (l3 * w3, ":", w3))
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số thích hợp vào mỗi ô trống.", level, 150, skills, "; ".join(map(str, vals)),
              steps, "area", **DD(rng, tmpl, [str(v) for v in vals], [str(extra)]))


@retrying
def b_area_cmp(rng, skills, level=3):
    shapes = []
    a, b = rnd(rng, 10, 20), rnd(rng, 3, 9)
    shapes.append((f"Hình chữ nhật dài {a} cm, rộng {b} cm", a * b, [E(eq(a, "×", b))]))
    s = rnd(rng, 6, 9)
    shapes.append((f"Hình vuông cạnh {s} cm", s * s, [E(eq(s, "×", s))]))
    t = rnd(rng, 5, 9)
    shapes.append((f"Hình vuông có chu vi {4 * t} cm", t * t, [E(eq(4 * t, ":", 4)), E(eq(t, "×", t))]))
    w = rnd(rng, 3, 7)
    l = w + rnd(rng, 3, 9)
    P = (l + w) * 2
    shapes.append((f"Hình chữ nhật có chu vi {P} cm, chiều rộng {w} cm", l * w, [E(eq(P, ":", 2)), E(eq(l + w, "-", w)), E(eq(l, "×", w))]))
    vals = [v for _, v, _ in shapes]
    need(len(set(vals)) == 4)
    i = vals.index(max(vals))
    steps = [st for _, _, sts in shapes for st in sts] + [T(f"Diện tích lớn nhất là {vals[i]} cm².")]
    return mk("multiple_choice", "Chọn đáp án đúng.", "Hình nào có diện tích lớn nhất?", level, 200, skills, shapes[i][0], steps, "area",
              **MC(rng, shapes[i][0], [x for j, (x, _, _) in enumerate(shapes) if j != i]))


# --- Số lớn: nhiều bước --------------------------------------------------------
@retrying
def w_factory(rng, P, skills, level=3, mode="fill"):
    a = rnd(rng, *P["x"])
    k = rnd(rng, 3, 7)
    tot = a * k
    b = rnd(rng, tot // 4, tot * 2 // 3)
    m = rnd(rng, 2, 6)
    rest = tot - b
    need(tot <= P["M"] and rest % m == 0)
    q = rest // m
    prompt = (f"Mỗi ngày một xưởng may được {fmt(a)} chiếc áo. Sau {k} ngày, xưởng đã giao cho cửa hàng {fmt(b)} chiếc áo, "
              f"số áo còn lại xưởng chia đều cho {m} cửa hàng khác. Hỏi mỗi cửa hàng đó nhận được bao nhiêu chiếc áo?")
    lines = [Ln(f"Số áo xưởng may được trong {k} ngày là:", a, "×", k, "chiếc"), Ln("Số áo còn lại là:", tot, "-", b, "chiếc"),
             Ln("Số áo mỗi cửa hàng nhận được là:", rest, ":", m, "chiếc")]
    return word(rng, prompt, lines, q, "chiếc", "Mỗi cửa hàng nhận được □ chiếc áo.", f"{fmt(q)} chiếc áo", [(a, "×", k), (tot, "-", b), (rest, ":", m)],
                skills, "multi", level, mode, wrong=[rest, tot // m if tot % m == 0 else q + 1, q + 10])


@retrying
def w_road(rng, M, skills, level=3, mode="fill"):
    k = rnd(rng, 3, 6)
    x = rnd(rng, M // 40, M // 12)
    L = x * k
    d = rnd(rng, x // 10 + 1, x // 3)
    y = x + d
    done = x + y
    r = L - done
    need(L <= M and r > 0)
    prompt = (f"Một đội công nhân phải sửa một quãng đường dài {fmt(L)} m. Tuần thứ nhất đội sửa được 1/{k} quãng đường, tuần thứ hai sửa "
              f"được nhiều hơn tuần thứ nhất {fmt(d)} m. Hỏi đội còn phải sửa bao nhiêu mét đường nữa?")
    lines = [Ln("Tuần thứ nhất đội sửa được là:", L, ":", k, "m"), Ln("Tuần thứ hai đội sửa được là:", x, "+", d, "m"),
             Ln("Hai tuần đội sửa được là:", x, "+", y, "m"), Ln("Số mét đường còn phải sửa là:", L, "-", done, "m")]
    return word(rng, prompt, lines, r, "m", "Đội còn phải sửa □ m đường.", f"{fmt(r)} m", [(L, ":", k), (x, "+", d), (x, "+", y), (L, "-", done)],
                skills, "multi", level, mode, wrong=[L - x, L - y, r + d], secs=240)


@retrying
def w_unit_rate(rng, M, skills, level=3, mode="fill", money=False):
    k1, k2 = rnd(rng, 2, 9), rnd(rng, 2, 9)
    need(k1 != k2)
    if money:
        p = rnd(rng, 2, 25) * 1000
        what, u, pre = "quyển vở", "đồng", "Mua"
        prompt = f"Mua {k1} quyển vở như nhau hết {fmt(p * k1)} đồng. Hỏi mua {k2} quyển vở như thế hết bao nhiêu tiền?"
        lines = [Ln("Giá tiền một quyển vở là:", p * k1, ":", k1, "đồng"), Ln(f"Mua {k2} quyển vở hết số tiền là:", p, "×", k2, "đồng")]
        tmpl, ans = f"Mua {k2} quyển vở hết □ đồng.", f"{fmt(p * k2)} đồng"
    else:
        p = rnd(rng, M // 100, M // 12)
        u = "kg"
        prompt = f"Có {k1} xe chở hàng như nhau chở được tất cả {fmt(p * k1)} kg hàng. Hỏi {k2} xe như thế chở được bao nhiêu ki-lô-gam hàng?"
        lines = [Ln("Mỗi xe chở được số hàng là:", p * k1, ":", k1, "kg"), Ln(f"{k2} xe chở được số hàng là:", p, "×", k2, "kg")]
        tmpl, ans = f"{k2} xe chở được □ kg hàng.", f"{fmt(p * k2)} kg hàng"
    r = p * k2
    need(p * k1 <= M and r <= M)
    return word(rng, prompt, lines, r, u, tmpl, ans, [(p * k1, ":", k1), (p, "×", k2)], skills, "unit_rate", level, mode,
                wrong=[p * k1 + (p if k2 > k1 else -p), p * k1 * k2 if p * k1 * k2 <= 100000 else r + p, r + 1000 if money else r + 10])


# --- Thời gian ------------------------------------------------------------------
@retrying
def w_clock_end(rng, skills, level=3):
    h = rnd(rng, 7, 15)
    m = rng.choice(range(5, 60, 5))
    d1, d2 = rng.choice([25, 30, 35, 40, 45]), rng.choice([15, 20, 25, 35, 40])
    d = d1 + d2
    tot = m + d
    need(60 <= tot < 120)
    h2, m2 = h + 1, tot - 60
    name = rng.choice(NAMES)
    prompt = f"Bạn {name} bắt đầu làm bài tập lúc {tfmt(h, m)}. {name} làm bài Toán hết {d1} phút, sau đó làm bài Tiếng Việt hết {d2} phút. Hỏi {name} làm xong lúc mấy giờ mấy phút?"
    lines = [Ln("Thời gian làm cả hai bài là:", d1, "+", d2, "phút"), (f"Tính từ {h} giờ, số phút đã trôi qua là:", eq(m, "+", d, "phút")),
             (f"{tot} phút = 1 giờ {m2} phút nên giờ làm xong là {h2} giờ {m2} phút. Kiểm tra:", eq(tot, "-", 60, "phút"))]
    steps = [WP(lines, f"{h2} giờ {m2} phút")]
    return mk("fill_blank", "Giải bài toán.", prompt, level, 180, skills, f"{h2} giờ {m2} phút", steps, "clock",
              **FB(f"{name} làm xong lúc □ giờ □ phút.", [(h2, "giờ"), (m2, "phút")]))


@retrying
def w_clock_dur(rng, skills, level=3, mode="mc"):
    h1 = rnd(rng, 7, 14)
    m1 = rng.choice(range(5, 60, 5))
    h2 = h1 + rnd(rng, 1, 2)
    m2 = rng.choice(range(5, 60, 5))
    need(m2 != m1)
    a = 60 - m1
    mid = (h2 - h1 - 1) * 60
    r = a + mid + m2
    act = rng.choice(["Một bộ phim hoạt hình chiếu", "Buổi biểu diễn văn nghệ diễn ra", "Chuyến đi thăm bảo tàng kéo dài"])
    prompt = f"{act} từ {tfmt(h1, m1)} đến {tfmt(h2, m2)}. Hỏi thời gian đó dài bao nhiêu phút?"
    lines = [(f"Từ {tfmt(h1, m1)} đến {h1 + 1} giờ là:", eq(60, "-", m1, "phút"))]
    if h2 - h1 == 2:
        lines.append((f"Từ {h1 + 1} giờ đến {h2} giờ là 60 phút. Từ {h1 + 1} giờ đến {tfmt(h2, m2)} là:", eq(60, "+", m2, "phút")))
        lines.append(("Thời gian đó dài là:", eq(a, "+", 60 + m2, "phút")))
    else:
        lines.append(("Từ " + f"{h2} giờ đến {tfmt(h2, m2)} là {m2} phút. Thời gian đó dài là:", eq(a, "+", m2, "phút")))
    return word(rng, prompt, lines, r, "phút", "Thời gian đó dài □ phút.", f"{r} phút", [], skills, "clock_dur", level, mode,
                wrong=[(h2 - h1) * 60 + m2 - m1 + 10 if (h2 - h1) * 60 + m2 - m1 + 10 != r else r + 5, abs(m2 - m1) + (h2 - h1) * 100, r + 60])


@retrying
def w_trip(rng, skills, level=3):
    h = rnd(rng, 6, 9)
    m = rng.choice(range(5, 60, 5))
    a_h, a_m = 1, rng.choice([10, 15, 20, 25, 30, 40])
    stop = rng.choice([10, 15, 20])
    b_m = rng.choice([25, 35, 45, 50])
    mins = m + a_m + stop + b_m
    hh = h + a_h + mins // 60
    mm = mins % 60
    need(mm != 0 and hh <= 12)
    prompt = (f"Một chuyến tàu khởi hành lúc {tfmt(h, m)}. Tàu chạy {a_h} giờ {a_m} phút thì đến ga A, dừng ở ga A {stop} phút rồi chạy tiếp {b_m} phút "
              "nữa thì đến ga cuối. Hỏi tàu đến ga cuối lúc mấy giờ mấy phút?")
    lines = [(f"Đổi {a_h} giờ {a_m} phút = {60 + a_m} phút. Tổng thời gian từ lúc khởi hành đến ga cuối là:", EQ(f"{60 + a_m} + {stop} + {b_m}", "phút")),
             (f"Tính từ {h} giờ, số phút đã trôi qua là:", EQ(f"{m} + {60 + a_m + stop + b_m}", "phút")),
             (f"{mins + 60} phút = {(mins + 60) // 60} giờ {mm} phút nên tàu đến lúc {hh} giờ {mm} phút. Kiểm tra:", EQ(f"{(mins + 60) // 60} × 60 + {mm}", "phút"))]
    steps = [WP(lines, f"{hh} giờ {mm} phút")]
    return mk("fill_blank", "Giải bài toán.", prompt, level, 240, skills, f"{hh} giờ {mm} phút", steps, "clock",
              **FB("Tàu đến ga cuối lúc □ giờ □ phút.", [(hh, "giờ"), (mm, "phút")]))


@retrying
def b_clock_match(rng, skills, level=2):
    pairs, steps = [], []
    for _ in range(4):
        h = rnd(rng, 6, 16)
        m = rng.choice(range(10, 60, 5))
        d = rng.choice([20, 25, 35, 40, 45, 50, 55])
        tot = m + d
        need(tot >= 60 and tot != 60)
        h2, m2 = h + 1, tot - 60
        left = f"{tfmt(h, m)} thêm {d} phút"
        right = tfmt(h2, m2)
        need(right not in [p[1] for p in pairs])
        pairs.append((left, right))
        steps.append(E(f"{m} + {d} = {tot}"))
    h, m = rnd(rng, 6, 16), rng.choice(range(5, 60, 5))
    extra = tfmt(h, m)
    need(extra not in [p[1] for p in pairs])
    return mk("matching", "Nối cho đúng.", "Nối mỗi thời điểm (đã cộng thêm số phút) với giờ đúng của nó.", level, 150, skills,
              "; ".join(f"{l} → {r}" for l, r in pairs), [T("60 phút = 1 giờ.")] + steps, "clock", **MT(rng, pairs, [extra]))


@retrying
def b_time_seq(rng, skills, level=3):
    h = rnd(rng, 6, 15)
    m = rng.choice(range(0, 60, 5))
    d = rng.choice([25, 35, 40, 45, 50])
    ts = []
    t = h * 60 + m
    for _ in range(5):
        ts.append(t)
        t += d
    need(t // 60 <= 20)
    nxt = t
    fmt_t = lambda x: tfmt(x // 60, x % 60)  # noqa: E731
    right = fmt_t(nxt)
    wrong = [fmt_t(nxt + 5), fmt_t(nxt - 10), fmt_t(nxt + 60)]
    need(len({right, *wrong}) == 4)
    steps = [T(f"Hai thời điểm liền nhau cách nhau {d} phút."), E(f"{ts[-1] % 60} + {d} = {ts[-1] % 60 + d}"), T(f"Thời điểm tiếp theo là {right}.")]
    return mk("multiple_choice", "Chọn đáp án đúng.", "Xe buýt rời bến theo quy luật: " + "; ".join(fmt_t(x) for x in ts) + "; … Chuyến tiếp theo rời bến lúc:",
              level, 120, skills, right, steps, "pattern", **MC(rng, right, wrong))


@retrying
def w_weekday(rng, skills, level=3):
    wd = rnd(rng, 0, 6)
    d1 = rnd(rng, 1, 9)
    add = rnd(rng, 2, 3) * 7 + rnd(rng, 1, 6)
    d2 = d1 + add
    need(d2 <= 30)
    q, r = divmod(add, 7)
    w2 = (wd + r) % 7
    prompt = f"Ngày {d1} của một tháng là {G.WEEKDAYS[wd]}. Hỏi ngày {d2} của tháng đó là thứ mấy?"
    lines = [Ln(f"Từ ngày {d1} đến ngày {d2} cách nhau số ngày là:", d2, "-", d1, "ngày"),
             (f"{add} ngày gồm {q} tuần và {r} ngày. Sau {q} tuần lại là {G.WEEKDAYS[wd]}; đếm thêm {r} ngày nữa. Kiểm tra:", f"7 × {q} + {r} = {add} (ngày)")]
    right = cap(G.WEEKDAYS[w2])
    wrong = [cap(G.WEEKDAYS[(w2 + s) % 7]) for s in (1, 6, 2)]
    steps = [WP(lines, f"{G.WEEKDAYS[w2]}")]
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 150, skills, right, steps, "weekday", **MC(rng, right, wrong))


@retrying
def w_month_days(rng, skills, level=3, mode="fill"):
    m = rng.choice([1, 3, 4, 5, 6, 7, 8, 9, 10, 11])
    days = G.MONTH_DAYS_2027[m]
    d1 = rnd(rng, days - 9, days - 2)
    d2 = rnd(rng, 3, 15)
    a = days - d1 + 1
    r = a + d2
    prompt = f"Một hội chợ sách mở cửa từ ngày {d1} tháng {m} đến hết ngày {d2} tháng {m + 1} (năm 2027). Hỏi hội chợ mở cửa tất cả bao nhiêu ngày?"
    lines = [(f"Tháng {m} có {days} ngày. Số ngày hội chợ mở cửa trong tháng {m} (tính cả ngày {d1}) là:", EQ(f"{days} - {d1} + 1", "ngày")),
             Ln("Số ngày hội chợ mở cửa tất cả là:", a, "+", d2, "ngày")]
    return word(rng, prompt, lines, r, "ngày", "Hội chợ mở cửa □ ngày.", f"{r} ngày", [(a, "+", d2)], skills, "month_days", level, mode,
                wrong=[r - 1, r + 1, days - d1 + d2])


# --- Tiền -----------------------------------------------------------------------
@retrying
def w_money_change(rng, skills, level=3, mode="fill"):
    n1 = rnd(rng, 2, 4)
    p1 = rnd(rng, 8, 30) * 1000
    p2 = rnd(rng, 5, 25) * 1000
    x = p1 * n1
    s = x + p2
    pay = next(v for v in (50000, 100000) if v > s)
    r = pay - s
    need(pay <= 100000)
    prompt = (f"Mẹ mua {n1} kg cam, mỗi ki-lô-gam giá {fmt(p1)} đồng và một hộp bánh giá {fmt(p2)} đồng. Mẹ đưa cô bán hàng tờ {fmt(pay)} đồng. "
              "Hỏi cô bán hàng phải trả lại mẹ bao nhiêu tiền?")
    lines = [Ln(f"Mua {n1} kg cam hết số tiền là:", p1, "×", n1, "đồng"), Ln("Mẹ phải trả tất cả là:", x, "+", p2, "đồng"),
             Ln("Cô bán hàng trả lại mẹ là:", pay, "-", s, "đồng")]
    return word(rng, prompt, lines, r, "đồng", "Cô bán hàng trả lại □ đồng.", f"{fmt(r)} đồng", [(p1, "×", n1), (x, "+", p2), (pay, "-", s)],
                skills, "change", level, mode, wrong=[pay - x, pay - p1 - p2, r + 1000])


@retrying
def w_money_compare(rng, skills, level=3, mode="fill"):
    notes = [1000, 2000, 5000, 10000, 20000, 50000]
    a1, a2 = rng.sample(notes[2:], 2)
    b1, b2 = rng.sample(notes, 2)
    na1, na2, nb1, nb2 = rnd(rng, 1, 3), rnd(rng, 1, 4), rnd(rng, 1, 3), rnd(rng, 1, 4)
    A = a1 * na1 + a2 * na2
    B = b1 * nb1 + b2 * nb2
    need(A > B and A <= 100000 and {a1, a2} != {b1, b2})
    r = A - B
    x, y = rng.sample(NAMES, 2)
    prompt = (f"{x} có {na1} tờ {fmt(a1)} đồng và {na2} tờ {fmt(a2)} đồng. {y} có {nb1} tờ {fmt(b1)} đồng và {nb2} tờ {fmt(b2)} đồng. "
              f"Hỏi {x} có nhiều hơn {y} bao nhiêu tiền?")
    lines = [(f"Số tiền của {x} là:", EQ(f"{fmt(a1)} × {na1} + {fmt(a2)} × {na2}", "đồng")),
             (f"Số tiền của {y} là:", EQ(f"{fmt(b1)} × {nb1} + {fmt(b2)} × {nb2}", "đồng")),
             (f"{x} có nhiều hơn {y} là:", eq(A, "-", B, "đồng"))]
    return word(rng, prompt, lines, r, "đồng", f"{x} nhiều hơn {y} □ đồng.", f"{fmt(r)} đồng", [(A, "-", B)], skills, "money", level, mode,
                wrong=[A, B, r + 1000])


@retrying
def b_money_drag(rng, skills, level=2):
    pairs = [(50000, 5000), (50000, 10000), (20000, 2000), (100000, 20000), (100000, 10000), (20000, 5000), (10000, 2000), (50000, 2000)]
    ps = rng.sample(pairs, 3)
    vals = [a // b for a, b in ps]
    need(len(set(vals)) == 3)
    tmpl = "\n".join(f"Tờ {fmt(a)} đồng đổi được □ tờ {fmt(b)} đồng." for a, b in ps)
    extra = next(v for v in (vals[0] + 1, vals[1] * 2, vals[2] + 3) if v not in vals)
    steps = [E(f"{fmt(a)} : {fmt(b)} = {a // b}") for a, b in ps]
    return mk("drag_drop", "Kéo số vào ô trống.", "Kéo thẻ số thích hợp vào mỗi ô trống.", level, 120, skills, "; ".join(map(str, vals)),
              steps, "money", **DD(rng, tmpl, [str(v) for v in vals], [str(extra)]))


@retrying
def b_money_match(rng, skills, level=2):
    notes = [1000, 2000, 5000, 10000, 20000, 50000]
    pairs, steps = [], []
    for _ in range(4):
        a, b = rng.sample(notes, 2)
        na, nb = rnd(rng, 1, 3), rnd(rng, 1, 3)
        v = a * na + b * nb
        right = f"{fmt(v)} đồng"
        need(right not in [p[1] for p in pairs] and v <= 100000)
        pairs.append((f"{na} tờ {fmt(a)} đồng và {nb} tờ {fmt(b)} đồng", right))
        steps.append(E(EQ(f"{fmt(a)} × {na} + {fmt(b)} × {nb}")))
    extra = f"{fmt(ev(pairs[0][1].split()[0]) + 1000)} đồng"
    need(extra not in [p[1] for p in pairs])
    return mk("matching", "Nối cho đúng.", "Nối mỗi nhóm tờ tiền với tổng số tiền của nhóm đó.", level, 150, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), steps, "money", **MT(rng, pairs, [extra]))


# --- Thống kê, khả năng ------------------------------------------------------------
STAT_CTX = [
    ("Số cây các tổ lớp 3A trồng được", ["Tổ Một", "Tổ Hai", "Tổ Ba", "Tổ Bốn"], "cây", (15, 45)),
    ("Số quyển sách các lớp khối Ba quyên góp", ["Lớp 3A", "Lớp 3B", "Lớp 3C", "Lớp 3D"], "quyển", (25, 80)),
    ("Số ki-lô-gam giấy vụn các lớp thu gom được", ["Lớp 3A", "Lớp 3B", "Lớp 3C", "Lớp 3D"], "kg", (18, 60)),
]


def stat_table(rng):
    title, names, u, (lo, hi) = rng.choice(STAT_CTX)
    vals = rng.sample(range(lo, hi + 1), 4)
    text = f"{title}:\n" + "\n".join(f"{n}: {v} {u}" for n, v in zip(names, vals))
    return title, names, u, vals, text


@retrying
def w_stat(rng, kind, skills, level=3, mode="fill"):
    title, names, u, v, text = stat_table(rng)
    if kind == "pairs":
        s1, s2 = v[0] + v[1], v[2] + v[3]
        need(s1 > s2)
        r = s1 - s2
        prompt = f"{text}\nHỏi {names[0]} và {names[1]} được nhiều hơn {names[2]} và {names[3]} bao nhiêu {G.UNIT_WORD.get(u, u)}?"
        lines = [Ln(f"{names[0]} và {names[1]} được:", v[0], "+", v[1], u), Ln(f"{names[2]} và {names[3]} được:", v[2], "+", v[3], u),
                 Ln("Số chênh lệch là:", s1, "-", s2, u)]
        return word(rng, prompt, lines, r, u, f"Nhiều hơn □ {u}.", f"{r} {u}", [(v[0], "+", v[1]), (v[2], "+", v[3]), (s1, "-", s2)],
                    skills, "stat_table", level, mode, wrong=[s1, s2, abs(v[0] - v[2])])
    if kind == "maxmin_total":
        hi_, lo_ = max(v), min(v)
        tot = sum(v)
        r = tot + 0
        prompt = f"{text}\nHỏi cả bốn {'tổ' if names[0].startswith('Tổ') else 'lớp'} được tất cả bao nhiêu {G.UNIT_WORD.get(u, u)}, và nhiều nhất hơn ít nhất bao nhiêu?"
        lines = [("Cả bốn được tất cả là:", EQ(" + ".join(map(str, v)), u)), Ln("Nhiều nhất hơn ít nhất là:", hi_, "-", lo_, u)]
        steps = [WP(lines, f"{tot} {u}; {hi_ - lo_} {u}"), *col_add_n(v)] + blocks((hi_, "-", lo_))
        return mk("fill_blank", "Giải bài toán.", prompt, level, 200, skills, f"{tot} {u}; {hi_ - lo_} {u}", steps, "stat_table",
                  **FB(f"Tất cả: □ {u}.\nNhiều nhất hơn ít nhất: □ {u}.", [(tot, u), (hi_ - lo_, u)]))
    # double: nếu mỗi đơn vị ... (nhân rồi cộng)
    k = rnd(rng, 2, 5)
    i, j = rng.sample(range(4), 2)
    s = v[i] + v[j]
    r = s * k
    need(u != "kg")
    prompt = (f"{text}\nMỗi {'cây' if u == 'cây' else 'quyển sách'} được thưởng {k} bông hoa điểm tốt. Hỏi {names[i]} và {names[j]} được thưởng "
              "tất cả bao nhiêu bông hoa điểm tốt?")
    lines = [Ln(f"{names[i]} và {names[j]} được:", v[i], "+", v[j], u), Ln("Số bông hoa điểm tốt được thưởng là:", s, "×", k, "bông")]
    return word(rng, prompt, lines, r, "bông", "Được thưởng □ bông hoa.", f"{r} bông hoa", [(v[i], "+", v[j]), (s, "×", k)],
                skills, "stat_table", level, mode, wrong=[s, v[i] * k + v[j], r + k])


@retrying
def b_stat_match(rng, skills, level=2):
    title, names, u, v, text = stat_table(rng)
    combos = [(0, 1), (0, 2), (1, 3), (2, 3), (0, 3), (1, 2)]
    rng.shuffle(combos)
    pairs, steps = [], []
    for i, j in combos:
        s = v[i] + v[j]
        if f"{s} {u}" in [p[1] for p in pairs]:
            continue
        pairs.append((f"{names[i]} và {names[j]}", f"{s} {u}"))
        steps.append(E(eq(v[i], "+", v[j], u)))
        if len(pairs) == 4:
            break
    need(len(pairs) == 4)
    extra = f"{sum(v)} {u}"
    need(extra not in [p[1] for p in pairs])
    return mk("matching", "Nối cho đúng.", f"{text}\nNối mỗi cặp với tổng số của cặp đó.", level, 150, skills,
              "; ".join(f"{l}: {r}" for l, r in pairs), steps, "stat_table", **MT(rng, pairs, [extra]))


@retrying
def b_stat_pair_mc(rng, skills, level=3):
    title, names, u, v, text = stat_table(rng)
    combos = list(itertools.combinations(range(4), 2))
    sums = [v[i] + v[j] for i, j in combos]
    target_idx = rnd(rng, 0, 5)
    target = sums[target_idx]
    need(sums.count(target) == 1)
    i, j = combos[target_idx]
    right = f"{names[i]} và {names[j]}"
    others = [f"{names[a]} và {names[b]}" for k_, (a, b) in enumerate(combos) if k_ != target_idx]
    rng.shuffle(others)
    steps = [E(eq(v[a], "+", v[b])) for a, b in combos] + [T(f"Chỉ có {right} có tổng bằng {target}.")]
    return mk("multiple_choice", "Chọn đáp án đúng.", f"{text}\nHai {'tổ' if names[0].startswith('Tổ') else 'lớp'} nào có tổng số đúng bằng {target} {u}?",
              level, 150, skills, right, steps, "stat_table", **MC(rng, right, others[:3]))


@retrying
def b_stat_drag(rng, skills, level=2):
    a = rnd(rng, 20, 40)
    d1, d2, d3 = rnd(rng, 3, 12), rnd(rng, 2, 9), rnd(rng, 2, 6)
    b = a + d1
    c = b - d2
    e = c * 2 if c * 2 <= 99 else c + d3
    vals = [b, c, e]
    need(len(set(vals)) == 3 and a not in vals)
    third = "gấp đôi Tổ Ba" if e == c * 2 else f"nhiều hơn Tổ Ba {d3} cây"
    tmpl = f"Tổ Một: {a} cây\nTổ Hai: □ cây\nTổ Ba: □ cây\nTổ Bốn: □ cây"
    prompt = f"Tổ Một trồng được {a} cây. Tổ Hai trồng nhiều hơn Tổ Một {d1} cây. Tổ Ba trồng ít hơn Tổ Hai {d2} cây. Tổ Bốn trồng được số cây {third}. Kéo số thích hợp để hoàn thành bảng."
    extra = next(x for x in (a + d2, c + 1, b + d1) if x not in vals and x != a)
    steps = [E(eq(a, "+", d1)), E(eq(b, "-", d2)), E(eq(c, "×", 2) if e == c * 2 else eq(c, "+", d3))]
    return mk("drag_drop", "Kéo số vào bảng.", prompt, level, 150, skills, "; ".join(map(str, vals)), steps, "stat_table",
              **DD(rng, tmpl, [str(x) for x in vals], [str(extra)]))


@retrying
def w_worst(rng, skills, level=3, mode="fill", two=False):
    a, b, c = rnd(rng, 3, 9), rnd(rng, 3, 9), rnd(rng, 3, 9)
    need(len({a, b, c}) == 3)
    s = a + b
    k = 2 if two else 1
    r = s + k
    prompt = (f"Trong một hộp kín có {a} viên bi xanh, {b} viên bi vàng và {c} viên bi đỏ. Không nhìn vào hộp, phải lấy ra ít nhất bao nhiêu viên bi "
              f"để chắc chắn có {'ít nhất 2' if two else 'ít nhất 1'} viên bi đỏ?")
    lines = [Ln("Lúc không may nhất, ta lấy ra hết số bi không phải màu đỏ:", a, "+", b, "viên"),
             Ln(f"Lấy thêm {k} viên nữa thì chắc chắn có {k} viên bi đỏ. Số bi ít nhất phải lấy là:", s, "+", k, "viên")]
    return word(rng, prompt, lines, r, "viên", "Phải lấy ít nhất □ viên bi.", f"{r} viên bi", [(a, "+", b), (s, "+", k)],
                skills, "worst", level, mode, wrong=[k, c + k, a + b + c])


@retrying
def b_prob_match(rng, skills, level=2):
    a, b = rnd(rng, 2, 5), rnd(rng, 3, 8)
    n_cert = a + 1  # lấy a+1 viên thì chắc chắn có bi đỏ
    n_imp = b + 1   # lấy bi đỏ quá số bi đỏ là không thể
    n_may = rnd(rng, 1, a)
    need(n_may < n_cert and n_cert != n_imp and n_imp <= a + b)
    pairs = [(f"Lấy ra {n_cert} viên, có ít nhất 1 viên bi đỏ", "chắc chắn"),
             (f"Lấy ra {n_imp} viên, cả {n_imp} viên đều là bi đỏ", "không thể"),
             (f"Lấy ra {n_may} viên, có ít nhất 1 viên bi đỏ", "có thể")]
    steps = [T(f"Hộp chỉ có {a} viên bi xanh nên lấy {n_cert} viên thì chắc chắn có bi đỏ."),
             T(f"Hộp chỉ có {b} viên bi đỏ nên không thể lấy được {n_imp} viên đều là bi đỏ."),
             T(f"Lấy {n_may} viên thì có thể có bi đỏ, cũng có thể toàn bi xanh.")]
    return mk("matching", "Nối cho đúng.", f"Trong hộp có {a} viên bi xanh và {b} viên bi đỏ. Không nhìn vào hộp, lấy ra một số viên bi. Nối mỗi sự kiện với khả năng xảy ra của nó.",
              level, 150, skills, "; ".join(f"{l}: {r}" for l, r in pairs), steps, "probability", **MT(rng, pairs))


# ---------------------------------------------------------------------------
# "Bí kíp nâng cao" (lý thuyết): một câu quy tắc / chiến lược + một ví dụ giải mẫu
# ---------------------------------------------------------------------------
def th_from(rule, prob):
    """Lấy đề và khối "Bài giải" của một bài toán mẫu làm ví dụ."""
    wp = next(b for b in prob["solution"]["steps"] if b["kind"] == "word_problem")
    return [T(rule, "rule"), T("Ví dụ: " + prob["prompt"]["text"]), wp]


def th_find2(rng, rule, forms, P):
    c = find2_case_retry(rng, forms, P)
    lines = [(lead, eq(*cl)) for lead, _, cl in c["st"]]
    return [T(rule, "rule"), T(f"Ví dụ: tìm số thích hợp thay cho dấu ?: {c['expr']}"), WP(lines, fmt(c["x"]))]


@retrying
def find2_case_retry(rng, forms, P):
    return find2_case(rng, rng.choice(forms), P)


@retrying
def th_conv(rng, rule, pairs):
    big, small = rng.choice(pairs)
    a, b, t = qty2(rng, big, small)
    f = CONV2[(big, small)]
    return [T(rule, "rule"), T(f"Ví dụ: {q2text(a, big, b, small)} = {fmt(a * f)} {small} + {fmt(b)} {small} = {fmt(t)} {small}."),
            E(f"{fmt(a * f)} + {fmt(b)} = {fmt(t)}")]


@retrying
def th_digits(rng, rule, d):
    ds = rng.sample(range(10), d)
    need(0 in ds)
    big, small = biggest_smallest(ds, d)
    return [T(rule, "rule"), T(f"Ví dụ: với các chữ số {', '.join(map(str, ds))}, số lớn nhất có {d} chữ số khác nhau là {fmt(big)}, "
                               f"số bé nhất là {fmt(small)} (chữ số 0 không đứng đầu)."), E(f"{fmt(big)} - {fmt(small)} = {fmt(big - small)}")]


@retrying
def th_round(rng, rule, d, base):
    N = rnd(rng, 10 ** (d - 1) // base + 1, (10 ** d - 1) // base - 1) * base
    name = G.ROUND_NAME[base]
    return [T(rule, "rule"), T(f"Ví dụ: các số làm tròn đến hàng {name} được {fmt(N)} là các số từ {fmt(N - base // 2)} đến {fmt(N + base // 2 - 1)}."),
            E(f"{fmt(N)} - {fmt(base // 2)} = {fmt(N - base // 2)}")]


@retrying
def th_expr(rng, rule, cfg):
    a, b = rnd(rng, *cfg["c"]), rnd(rng, *cfg["c"])
    k = rnd(rng, 2, 9)
    need(a + b * k <= cfg["M"] and (a + b) * k <= cfg["M"])
    return [T(rule, "rule"), E(f"{fmt(a)} + {fmt(b)} × {k} = {fmt(a)} + {fmt(b * k)} = {fmt(a + b * k)}"),
            E(f"({fmt(a)} + {fmt(b)}) × {k} = {fmt(a + b)} × {k} = {fmt((a + b) * k)}")]


# ---------------------------------------------------------------------------
# LỚP 4: bài nâng cao theo tuần — mỗi tuần lấy dạng nâng cao của các chủ đề đang học
# ---------------------------------------------------------------------------
AH.update({
    "avg_missing": "Con lấy số trung bình cộng nhân với số các số để được tổng, rồi trừ đi các số đã biết nhé.",
    "sd_hidden": "Con tìm tổng và hiệu trước (có khi đề giấu chúng trong câu chữ), rồi mới tìm hai số.",
    "frac_rest4": "Phân số của số còn lại thì con phải tìm số còn lại trước, rồi mới lấy phân số của nó.",
    "frac_whole": "Biết giá trị của mấy phần, con tìm giá trị của một phần bằng phép chia, rồi nhân với mẫu số.",
    "angle_sum": "Các góc ghép lại thành góc bẹt thì tổng số đo bằng một trăm tám mươi độ; thành góc vuông thì bằng chín mươi độ.",
})
ALL_HINTS = set(AH.values()) | set(G.H.values())
G.HINT_SET = ALL_HINTS
Fr = G.Fr

S = G  # các mã kỹ năng lớp 4 nằm trong gen_curriculum


def a_avg_missing(rng, skills, level=3, mode="fill"):
    n = rnd(rng, 3, 4)
    m = rnd(rng, 25, 160)
    known = [rnd(rng, m - 20, m + 20) for _ in range(n - 1)]
    x = m * n - sum(known)
    need(x > 0 and x not in known)
    prompt = f"Trung bình cộng của {n} số là {m}. Biết {n - 1} số trong đó là " + ", ".join(map(str, known)) + ". Tìm số còn lại."
    lines = [("Tổng của các số là:", eq(m, "×", n)), ("Số còn lại là:", EQ(f"{fmt(m * n)} - " + " - ".join(map(str, known))))]
    return word(rng, prompt, lines, x, None, "Số còn lại là □.", fmt(x), [], skills, "avg_missing", level, mode, [x + 10, m, sum(known) // (n - 1)])


def a_avg_more(rng, skills, level=3, mode="fill"):
    a, b, c = rnd(rng, 20, 60), rnd(rng, 20, 60), rnd(rng, 20, 60)
    need((a + b + c) % 3 == 0)
    m = (a + b + c) // 3
    d = m + 3 * rnd(rng, 1, 5)
    m2 = (a + b + c + d) // 4
    need((a + b + c + d) % 4 == 0)
    names = rng.sample(NAMES, 4)
    prompt = (f"Ba bạn {names[0]}, {names[1]}, {names[2]} có trung bình mỗi bạn {m} cái tem. {names[3]} có {d} cái tem. "
              f"Hỏi trung bình mỗi bạn trong bốn bạn có bao nhiêu cái tem?")
    lines = [("Ba bạn có số tem là:", eq(m, "×", 3, "cái")), ("Bốn bạn có số tem là:", eq(m * 3, "+", d, "cái")),
             ("Trung bình mỗi bạn có số tem là:", eq(m * 3 + d, ":", 4, "cái"))]
    return word(rng, prompt, lines, m2, "cái", "Trung bình mỗi bạn có □ cái tem.", f"{m2} cái tem", [], skills, "average", level, mode, [m, d, m2 + 3])


def a_sd_hidden(rng, skills, level=3, mode="fill"):
    kind = rng.randint(0, 2)
    if kind == 0:
        s, sd, d, dd = 999, "số lớn nhất có ba chữ số", rng.choice([99, 11, 101, 199]), None
        dd = {99: "số lớn nhất có hai chữ số", 11: "số bé nhất có hai chữ số có hai chữ số giống nhau", 101: "số bé nhất có ba chữ số có hàng đơn vị là 1", 199: "số lớn nhất có ba chữ số mà chữ số hàng trăm là 1"}[d]
        need((s + d) % 2 == 0)
        big = (s + d) // 2
        prompt = f"Tổng của hai số là {sd}, hiệu của chúng là {dd}. Tìm số lớn."
        lines = [("Tổng hai số là 999, hiệu hai số là:", f"{d} = {d}"), ("Số lớn là:", f"(999 + {d}) : 2 = {big}")]
        return word(rng, prompt, lines, big, None, "Số lớn là □.", str(big), [], skills, "sd_hidden", level, mode, [big + 1, 999 - big, big - d])
    if kind == 1:
        w = rnd(rng, 6, 30)
        l_ = w + rnd(rng, 4, 20)
        p = (l_ + w) * 2
        prompt = f"Một mảnh vườn hình chữ nhật có chu vi {p} m, chiều dài hơn chiều rộng {l_ - w} m. Tính diện tích mảnh vườn."
        lines = [("Nửa chu vi là:", eq(p, ":", 2, "m")), ("Chiều dài là:", f"({l_ + w} + {l_ - w}) : 2 = {l_} (m)"),
                 ("Chiều rộng là:", eq(l_ + w, "-", l_, "m")), ("Diện tích mảnh vườn là:", eq(l_, "×", w, "m²"))]
        return word(rng, prompt, lines, l_ * w, "m²", "Diện tích mảnh vườn là □ m².", f"{fmt(l_ * w)} m²", [], skills, "sd_hidden", level, mode,
                    [p, l_ * w + l_, (l_ + w) * 2])
    son = rnd(rng, 6, 12)
    gap = rnd(rng, 24, 32)
    after = rnd(rng, 3, 8)
    tot = son * 2 + gap
    prompt = f"Hiện nay tổng số tuổi của mẹ và con là {tot} tuổi, mẹ hơn con {gap} tuổi. Hỏi {after} năm nữa con bao nhiêu tuổi?"
    lines = [("Tuổi con hiện nay là:", f"({tot} - {gap}) : 2 = {son} (tuổi)"), (f"{after} năm nữa tuổi con là:", eq(son, "+", after, "tuổi"))]
    return word(rng, prompt, lines, son + after, "tuổi", f"{after} năm nữa con □ tuổi.", f"{son + after} tuổi", [], skills, "sd_hidden", level, mode,
                [son, son + gap + after, son + after + 1])


def a_frac_rest(rng, skills, level=3, mode="fill"):
    d1, d2 = rng.choice([(3, 4), (4, 3), (5, 2), (2, 3), (3, 5), (4, 5)])
    total = d1 * d2 * rnd(rng, 2, 8) * rng.choice([1, 10])
    s1 = total // d1
    rest1 = total - s1
    need(rest1 % d2 == 0)
    s2 = rest1 // d2
    r = rest1 - s2
    prompt = (f"Một cửa hàng có {fmt(total)} kg gạo. Ngày thứ nhất bán 1/{d1} số gạo. Ngày thứ hai bán 1/{d2} số gạo còn lại. "
              f"Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam gạo?")
    lines = [("Ngày thứ nhất bán:", eq(total, ":", d1, "kg")), ("Sau ngày thứ nhất còn lại:", eq(total, "-", s1, "kg")),
             ("Ngày thứ hai bán:", eq(rest1, ":", d2, "kg")), ("Cửa hàng còn lại:", eq(rest1, "-", s2, "kg"))]
    return word(rng, prompt, lines, r, "kg", "Cửa hàng còn lại □ kg gạo.", f"{fmt(r)} kg", [], skills, "frac_rest4", level, mode,
                [rest1, total - total // d1 - total // d2, r + s2])


def a_frac_whole(rng, skills, level=3, mode="fill"):
    n, d = rng.choice([(2, 3), (3, 4), (2, 5), (3, 5), (4, 7), (5, 6), (3, 8)])
    one = rnd(rng, 3, 15)
    part = one * n
    total = one * d
    prompt = f"{n}/{d} số bi trong hộp là {part} viên. Hỏi trong hộp có tất cả bao nhiêu viên bi?"
    lines = [("Giá trị của một phần là:", eq(part, ":", n, "viên")), ("Số bi trong hộp là:", eq(one, "×", d, "viên"))]
    return word(rng, prompt, lines, total, "viên", "Trong hộp có □ viên bi.", f"{total} viên", [], skills, "frac_whole", level, mode,
                [part * d, part + d, total + one])


def a_angle3(rng, skills, level=3, mode="fill"):
    a = rnd(rng, 5, 12) * 5
    k = rnd(rng, 2, 3)
    b = a * k
    c = 180 - a - b
    need(c > 0)
    prompt = (f"Một góc bẹt được chia thành ba góc. Góc thứ nhất bằng {a}°, góc thứ hai gấp {k} lần góc thứ nhất. "
              f"Hỏi góc thứ ba bằng bao nhiêu độ và là góc gì?")
    kind = G.angle_kind(c)
    lines = [("Góc thứ hai bằng:", eq(a, "×", k, "°")), ("Góc thứ ba bằng:", f"180 - {a} - {b} = {c} (°)")]
    steps = [WP(lines, f"{c}°, là {kind}")]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 150, skills, f"{c}° ({kind})", steps, "angle_sum",
                  **FB("Góc thứ ba bằng □°.", [(c, "°")]))
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 150, skills, f"{c}°, {kind}", steps, "angle_sum",
              **MC(rng, f"{c}°, {kind}", [f"{c + 10}°, {G.angle_kind(c + 10) if c + 10 < 180 else 'góc tù'}", f"{180 - a}°, góc tù", f"{a + b}°, {G.angle_kind(a + b) if a + b < 180 else 'góc bẹt'}"]))


def a_big_digits(rng, skills, level=3):
    d = rnd(rng, 6, 7)
    return b_digits(rng, d, d, skills, level)


def a_class_value(rng, skills, level=3, mode="fill"):
    n = G.n_digits(rng, 9)
    s = str(n)
    i, j = rng.sample(range(9), 2)
    k = rng.choice("123456789")
    pos = [p for p in range(9) if s[p] == k]
    need(len(pos) >= 2)
    v1, v2 = int(k) * 10 ** (8 - pos[0]), int(k) * 10 ** (8 - pos[1])
    r = v1 // v2
    prompt = f"Trong số {fmt(n)}, giá trị của chữ số {k} đầu tiên (từ trái) gấp bao nhiêu lần giá trị của chữ số {k} thứ hai?"
    lines = [(f"Giá trị của chữ số {k} đầu tiên là {fmt(v1)}, của chữ số {k} thứ hai là {fmt(v2)}. Ta có:", f"{fmt(v1)} : {fmt(v2)} = {fmt(r)}")]
    steps = [WP(lines, f"{fmt(r)} lần")]
    if mode == "fill":
        return mk("fill_blank", "Điền số thích hợp.", prompt, level, 120, skills, f"{fmt(r)} lần", steps, "place_value", **FB("Gấp □ lần.", [(r, "lần")]))
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 120, skills, f"{fmt(r)} lần", steps, "place_value",
              **MC(rng, f"{fmt(r)} lần", [f"{fmt(r * 10)} lần", f"{fmt(max(1, r // 10))} lần" if r >= 100 else f"{fmt(r + 1)} lần", f"{pos[1] - pos[0]} lần"]))


def a_mul2_three(rng, skills, level=3, mode="fill"):
    a, b = rnd(rng, 12, 45), rnd(rng, 12, 35)
    p1, p2 = rnd(rng, 15, 45) * 1000, rnd(rng, 8, 25) * 1000
    need(p1 != p2)
    t1, t2 = a * p1, b * p2
    prompt = f"Nhà trường mua {a} bộ bàn ghế, mỗi bộ giá {fmt(p1)} đồng và {b} bảng tên, mỗi chiếc giá {fmt(p2)} đồng. Hỏi nhà trường phải trả tất cả bao nhiêu tiền?"
    lines = [("Tiền mua bàn ghế là:", eq(p1, "×", a, "đồng")), ("Tiền mua bảng tên là:", eq(p2, "×", b, "đồng")),
             ("Nhà trường phải trả tất cả là:", eq(t1, "+", t2, "đồng"))]
    return word(rng, prompt, lines, t1 + t2, "đồng", "Phải trả tất cả □ đồng.", f"{fmt(t1 + t2)} đồng", [], skills, "multi", level, mode,
                [t1, t1 + t2 + 1000, (p1 + p2) * a])


def a_div2_ceil(rng, skills, level=3, mode="fill"):
    seats = rnd(rng, 16, 45)
    people = seats * rnd(rng, 3, 9) + rnd(rng, 1, seats - 1)
    q = people // seats + 1
    prompt = f"Có {people} học sinh đi tham quan. Mỗi xe chở được {seats} học sinh. Hỏi cần ít nhất bao nhiêu xe để chở hết số học sinh?"
    q0 = people // seats
    lines = [(f"{q0} xe chở đầy được:", eq(seats, "×", q0, "học sinh")), ("Số học sinh còn lại là:", eq(people, "-", seats * q0, "học sinh")),
             ("Cần thêm một xe cho số học sinh còn lại. Số xe cần ít nhất là:", eq(q0, "+", 1, "xe"))]
    steps = [T(f"{people} : {seats} = {q0} (dư {people % seats})."), WP(lines, f"{q} xe")]
    if mode == "fill":
        return mk("fill_blank", "Giải bài toán.", prompt, level, 150, skills, f"{q} xe", steps, "ceil", **FB("Cần ít nhất □ xe.", [(q, "xe")]))
    return mk("multiple_choice", "Chọn đáp án đúng.", prompt, level, 150, skills, f"{q} xe", steps, "ceil",
              **MC(rng, f"{q} xe", [f"{q - 1} xe", f"{q + 1} xe", f"{people % seats} xe" if people % seats not in (q, q - 1, q + 1) else f"{q + 2} xe"]))


def a_frac_cmp_drag(rng, skills, level=2):
    fs_ = set()
    while len(fs_) < 4:
        n, d = rnd(rng, 1, 8), rnd(rng, 2, 9)
        f = Fr(n, d)
        if f.denominator == d and f not in fs_:
            fs_.add(f)
    order = sorted(fs_)
    shown = list(fs_)
    rng.shuffle(shown)
    return mk("drag_drop", "Xếp theo thứ tự từ bé đến lớn.", "Xếp các phân số theo thứ tự từ bé đến lớn: " + ", ".join(G.fs(f) for f in shown) + ".",
              level, 120, skills, " < ".join(G.fs(f) for f in order),
              [T("Quy đồng mẫu số (hoặc so sánh với 1, với 1/2) rồi so sánh."), T(" < ".join(G.fs(f) for f in order) + ".")], "compare_frac",
              **DD(rng, " < ".join(["□"] * 4), [G.fs(f) for f in order]))


def a_frac_match(rng, skills, level=2):
    pairs = []
    while len(pairs) < 4:
        n, d = rnd(rng, 1, 6), rnd(rng, 2, 7)
        f = Fr(n, d)
        if f.denominator != d or f >= 1:
            continue
        k = rnd(rng, 2, 5)
        e = f"{n * k}/{d * k} + {n}/{d}"
        v = G.fs(f * 2)
        if v in [p[1] for p in pairs]:
            continue
        pairs.append((e, v))
    f0 = Fr(pairs[0][1])
    extra = G.fs(f0 + Fr(1, f0.denominator * 2))
    return mk("matching", "Nối phép tính với kết quả.", "Rút gọn rồi tính, nối mỗi phép tính với kết quả tối giản.", level, 150, skills,
              "; ".join(f"{a} = {b}" for a, b in pairs), [E(f"{a} = {b}") for a, b in pairs], "simplify", **MT(rng, pairs, [extra]))


def a_think_avg_match(rng, skills, level=2):
    pairs = []
    while len(pairs) < 4:
        m, n = rnd(rng, 10, 60), rnd(rng, 2, 5)
        if m * n in [int(p[1].replace(".", "")) for p in pairs]:
            continue
        pairs.append((f"{n} số có trung bình cộng {m}", fmt(m * n)))
    extra = fmt(int(pairs[0][1].replace(".", "")) + 7)
    return mk("matching", "Nối cho đúng.", "Nối mỗi câu với tổng của các số đó.", level, 120, skills, "; ".join(f"{a}: tổng {b}" for a, b in pairs),
              [T(f"{a}: tổng là {b}.") for a, b in pairs], "avg_missing", **MT(rng, pairs, [extra]))


TH_RULE = {
    1: "Bài toán nhiều bước: tóm tắt đề, tìm lần lượt từng số trung gian; con có thể dùng sơ đồ đoạn thẳng để thấy rõ quan hệ giữa các số.",
    2: "Các góc ghép lại thành góc bẹt có tổng số đo 180°, thành góc vuông có tổng 90°.",
    3: "Giá trị của một chữ số phụ thuộc vào hàng của nó: cùng là chữ số 5 nhưng ở hàng triệu thì có giá trị 5.000.000.",
    4: "Muốn so sánh hay tính các số đo, con đổi về cùng một đơn vị trước nhé.",
    5: "Tìm hai số biết tổng và hiệu: số lớn = (tổng + hiệu) : 2, số bé = (tổng - hiệu) : 2. Có khi đề giấu tổng hoặc hiệu trong câu chữ.",
    6: "Hình chữ nhật: nửa chu vi = chiều dài + chiều rộng. Hình bình hành, hình thoi có các cặp cạnh đối diện bằng nhau.",
    7: "Ôn tập học kì 1: số lớn, cộng trừ, tổng – hiệu, hình học và đo lường.",
    8: "Số trung bình cộng × số các số = tổng các số. Bài rút về đơn vị: tìm giá trị một phần trước.",
    9: "Đọc kỹ dãy số liệu, biểu đồ cột; tính tổng, hiệu, trung bình cộng từ số liệu.",
    10: "Biết giá trị của n/d một số: lấy giá trị đó chia cho n để được một phần, rồi nhân với d.",
    11: "Cộng, trừ phân số khác mẫu số: quy đồng mẫu số trước; nhớ rút gọn kết quả.",
    12: "Tìm phân số của số còn lại: tìm số còn lại trước, rồi mới lấy phân số của nó.",
    13: "Ôn tập cuối năm: số tự nhiên, phân số, hình học, đo lường, thống kê.",
}


def pool_for(ch):
    """Các dạng nâng cao theo chủ đề (mỗi phần tử: hàm rng → bài toán)."""
    GTN_ = [GTN]
    P = {
        1: [lambda r: G.b_word3(r, [G.GT3, GTN], 3), lambda r: G.b_word3(r, [G.GT3, GTN], 3, "mc"), lambda r: w_three(r, 100000, [G.S_ADD5, GTN], 3, "fill", 100),
            lambda r: b_seq(r, "arith", 1000, 99999, [TD], 2, "drag"), lambda r: G.b_parity_count(r, [G.S_PAR, GTN], 3), lambda r: G.b_letter_match(r, [G.S_LET], 2),
            lambda r: b_digits(r, 5, 5, [G.S_NUM5, TD], 3), lambda r: w_equalize(r, 1000, [GTN], 3, "fill", 1, 18), lambda r: G.b_letter_word(r, [G.S_LET, G.S_PERI], 3, "mc")],
        2: [lambda r: a_angle3(r, [G.S_ANG, GTN], 3), lambda r: a_angle3(r, [G.S_ANG, GTN], 3, "mc"), lambda r: G.b_angle_rest(r, [G.S_ANG], 3),
            lambda r: G.b_angle_match(r, [G.S_ANG], 2), lambda r: G.b_angle_drag(r, [G.S_ANG], 2), lambda r: G.b_angle_clock(r, [G.S_ANG], 3)],
        3: [lambda r: a_class_value(r, [G.S_CLASS, TD], 3), lambda r: a_class_value(r, [G.S_CLASS, TD], 3, "mc"), lambda r: a_big_digits(r, [G.S_BIG, TD], 3),
            lambda r: G.b_round_match(r, 7, [100000, 10000], [G.S_ROUND], 2), lambda r: G.b_num_order_drag(r, 8, [G.S_CMP], 2),
            lambda r: G.b_natural_between(r, [G.S_SEQ, TD], 3, "mc"), lambda r: G.b_parity_count(r, [G.S_PAR, GTN], 3)],
        4: [lambda r: G.b_mass_word(r, [G.S_MASS, GTN], 3), lambda r: G.b_area_word4(r, [G.S_AREA_U, GTN], 3), lambda r: G.b_area_word4(r, [G.S_AREA_U, GTN], 3, "mc"),
            lambda r: G.b_conv_match_any(r, G.MASS_PAIRS, [G.S_MASS], 2), lambda r: G.b_unit_order(r, "tấn", "kg", [G.S_MASS], 2),
            lambda r: G.b_time_word(r, [G.S_TIME], 3, "mc"), lambda r: G.b_mass_word(r, [G.S_MASS, GTN], 3, "mc")],
        5: [lambda r: a_sd_hidden(r, [G.S_SD, GTN], 3), lambda r: a_sd_hidden(r, [G.S_SD, GTN], 3, "mc"), lambda r: G.b_sumdiff_word(r, [G.S_SD, GTN], 3),
            lambda r: G.b_sumdiff_match(r, [G.S_SD], 2), lambda r: G.b_assoc_drag(r, [G.S_PROP_ADD], 2), lambda r: G.b_assoc_match(r, [G.S_PROP_ADD], 2),
            lambda r: b_missing(r, "+", 4, [G.S_ADD, TD], 3)],
        6: [lambda r: a_sd_hidden(r, [G.S_SD, G.S_AREA, GTN], 3), lambda r: G.b_quad_word(r, [G.S_QUAD, GTN], 3), lambda r: w_rect_from_perim(r, [G.S_PERI, G.S_AREA, GTN], 3),
            lambda r: G.b_quad_match(r, [G.S_QUAD], 2), lambda r: G.b_quad_drag(r, [G.S_QUAD, G.S_PERI], 2), lambda r: G.b_rect_lines_match(r, [G.S_LINE], 2),
            lambda r: w_composite_area(r, [G.S_AREA, GTN], 3, "mc")],
        8: [lambda r: a_avg_missing(r, [G.S_AVG, GTN], 3), lambda r: a_avg_missing(r, [G.S_AVG, GTN], 3, "mc"), lambda r: a_avg_more(r, [G.S_AVG, GTN], 3),
            lambda r: a_mul2_three(r, [G.S_MUL2, GTN], 3), lambda r: a_div2_ceil(r, [G.S_DIV2, GTN], 3, "mc"), lambda r: a_think_avg_match(r, [G.S_AVG], 2),
            lambda r: G.b_unitrate(r, [G.S_RATE, GTN], 3), lambda r: G.b_calc_drag(r, G.gen_mul2(2), [G.S_MUL2], 2), lambda r: G.b_mulassoc_mc(r, [G.S_PROP_MUL], 3)],
        9: [lambda r: G.b_series_mc(r, [G.S_SER], 2), lambda r: G.b_occ_drag(r, [G.S_OCC], 2), lambda r: G.b_series_diff(r, [G.S_SER], 3, "mc"),
            lambda r: G.b_avg_word(r, [G.S_AVG, GTN], 3), lambda r: G.b_occ_word(r, [G.S_OCC], 3), lambda r: G.b_occ_match(r, [G.S_OCC], 2),
            lambda r: a_avg_missing(r, [G.S_AVG, GTN], 3)],
        10: [lambda r: a_frac_whole(r, [G.S_F, GTN], 3), lambda r: a_frac_whole(r, [G.S_F, GTN], 3, "mc"), lambda r: a_frac_cmp_drag(r, [G.S_FCMP], 2),
             lambda r: G.b_simplify_match(r, [G.S_FSIMP], 2), lambda r: G.b_fcmp_word(r, [G.S_FCMP], 3), lambda r: G.b_commonden_general(r, [G.S_FCOM], 3),
             lambda r: G.b_fdiv_word(r, [G.S_FDIV], 3)],
        11: [lambda r: a_frac_match(r, [G.S_FADD], 2), lambda r: G.b_fop_find(r, "+", [G.S_FADD], 3), lambda r: G.b_fop_word(r, "-", [G.S_FSUB], 3),
             lambda r: G.b_fop_drag(r, ["+", "-"], [G.S_FADD, G.S_FSUB], 2), lambda r: a_frac_whole(r, [G.S_F, GTN], 3), lambda r: a_frac_rest(r, [G.S_FOF, GTN], 3, "mc"),
             lambda r: G.b_fop_word(r, "+", [G.S_FADD], 3, "mc")],
        12: [lambda r: a_frac_rest(r, [G.S_FOF, GTN], 3), lambda r: a_frac_rest(r, [G.S_FOF, GTN], 3, "mc"), lambda r: G.b_frac_of_word(r, [G.S_FOF, GTN], 3),
             lambda r: G.b_fop_match(r, ["×", ":"], [G.S_FMUL, G.S_FDIVF], 2), lambda r: G.b_frac_of_drag(r, [G.S_FOF], 2), lambda r: a_frac_whole(r, [G.S_F, GTN], 3),
             lambda r: G.b_fop_find(r, "×", [G.S_FMUL], 3)],
    }
    extra = [lambda r: w_three(r, 100000, [GTN], 3, "fill", 100), lambda r: w_three(r, 100000, [GTN], 3, "mc", 100),
             lambda r: w_sum_ratio(r, 10000, [GTN], 3, "fill", 10), lambda r: w_diff_ratio(r, 10000, [GTN], 3, "mc", 10)]
    for k in (2, 3, 4, 9, 10):
        P[k] = P[k] + extra
    P[7] = P[1][:3] + P[3][:2] + P[5][:6] + P[6][:2]
    P[13] = P[8][:3] + P[10][:3] + P[12][:3] + P[5][:2] + [P[2][0], P[8][5], P[12][3]]
    return P[ch]


def week_problems(rng, chs):
    pool = [f for c in chs for f in pool_for(c)]
    for _ in range(400):
        fs_ = rng.sample(pool, min(8, len(pool))) if len(pool) >= 8 else [rng.choice(pool) for _ in range(8)]
        try:
            ps = [f(rng) for f in fs_]
        except (Retry, AssertionError, RuntimeError, ValueError, StopIteration, ZeroDivisionError, IndexError):
            continue
        for p in ps:
            if p["level"] < 2:
                p["level"] = 2
        if {p["type"] for p in ps} != G.TYPES or sum(multi_step(p) for p in ps) < 3 or sum(p["level"] == 3 for p in ps) < 5:
            continue
        if len({p["prompt"]["text"][:28] for p in ps}) < len(ps):
            continue
        return ps
    raise RuntimeError(f"tuần chủ đề {chs}")


def week_theory(rng, chs):
    ch = chs[-1]
    for _ in range(200):
        try:
            p = rng.choice(pool_for(ch))(rng)
        except (Retry, AssertionError, RuntimeError, ValueError, StopIteration, ZeroDivisionError, IndexError):
            continue
        if any(b["kind"] == "word_problem" for b in p["solution"]["steps"]):
            return th_from(TH_RULE[ch], p)
    return [T(TH_RULE[ch], "rule"), T("Đọc kỹ đề, tóm tắt rồi giải từng bước.")]


def make_week_fn(chs):
    def fn(rng):
        return week_theory(rng, chs), week_problems(rng, chs)
    return fn


# ---------------------------------------------------------------------------
# Dựng và kiểm tra một bài nâng cao
# ---------------------------------------------------------------------------
_NUM_TXT = re.compile(r"\d{1,3}(?:\.\d{3})+|\d+")


def texts_of(p):
    out = [p["prompt"]["text"], p.get("template", "")]
    for key in ("choices", "tokens", "left", "right"):
        out += [x["text"] for x in p.get(key, [])]
    return out


def multi_step(p):
    return any(b["kind"] == "word_problem" and len(b["lines"]) >= 2 for b in p["solution"]["steps"])


def check_lesson(blocks_, ps):
    assert 2 <= len(blocks_) <= 3, len(blocks_)
    for b in blocks_:
        G.check_block(b)
    def cols(bs):
        return [b for b in bs if b["kind"] == "column_arithmetic"]
    for b in cols(blocks_) + [b for p in ps for b in cols(p["solution"]["steps"])]:
        assert 2 <= len(b["operands"]) <= 3, b["operands"]
    for p in ps:
        G.check_problem(p)
        assert p["solution"]["hint"] in ALL_HINTS
        for t in texts_of(p):
            for m in _NUM_TXT.findall(t):
                assert int(m.replace(".", "")) <= 10 ** 10, (m, t)
    assert len(ps) == 8, len(ps)
    assert {p["type"] for p in ps} == G.TYPES, "thiếu dạng bài"
    assert all(p["level"] >= 2 for p in ps) and sum(p["level"] == 3 for p in ps) >= 5
    assert sum(multi_step(p) for p in ps) >= 3, "cần ít nhất 3 bài toán có lời văn nhiều bước"
    keys = [(p["prompt"]["text"], p.get("template", ""), json.dumps(p.get("choices", p.get("left", [])), ensure_ascii=False)) for p in ps]
    assert len(set(keys)) == len(keys), "bài trùng"


CH_SHORT = {1: "Ôn tập, biểu thức chứa chữ, bài toán ba bước", 2: "Góc và đo góc", 3: "Số có nhiều chữ số",
            4: "Yến, tạ, tấn; m², dm², mm²; giây, thế kỉ", 5: "Cộng, trừ và tổng – hiệu", 6: "Vuông góc, song song, hình bình hành",
            7: "Ôn tập học kì 1", 8: "Nhân, chia, trung bình cộng", 9: "Thống kê và xác suất", 10: "Phân số",
            11: "Cộng, trừ phân số", 12: "Nhân, chia phân số", 13: "Ôn tập cuối năm"}
WEEKS: dict[int, tuple[str, object]] = {}


def build_week(week, chapter_id, order):
    topic, fn = WEEKS[week]
    lesson_id = f"{PREFIX}{week:02d}"
    title = f"Nâng cao tuần {week}: {topic}"
    assert len(title) <= 80, title
    seed = ADV_SEED ^ zlib.crc32(lesson_id.encode("utf-8"))
    last = None
    for attempt in range(60):
        rng = random.Random(seed + attempt)
        try:
            blocks_, ps = fn(rng)
            check_lesson(blocks_, ps)
            break
        except (AssertionError, RuntimeError, ValueError, StopIteration, Retry) as e:
            last = e
    else:
        raise RuntimeError(f"Không sinh được {lesson_id}: {last!r}")
    problems = G.finish_problems(lesson_id, ps)
    lesson = {
        "schemaVersion": G.SCHEMA_VERSION, "kind": "lesson", "id": lesson_id, "bookId": BOOK, "chapterId": chapter_id,
        "order": order, "title": title, "contentRev": 1,
        "theory": {"title": "Bí kíp nâng cao", "blocks": blocks_},
        "problems": problems,
    }
    return lesson


# ---------------------------------------------------------------------------
# Ghi file
# ---------------------------------------------------------------------------
def write_hints_dart():
    hints = list(AH.values())

    def dart_str(h):
        return "'" + h.replace("\\", "\\\\").replace("'", "\\'").replace("$", "\\$") + "'"

    body = "\n".join(f"  {dart_str(h)}," for h in hints)
    HINTS_DART.write_text(
        "// FILE SINH TỰ ĐỘNG bởi tool/gen_advanced.py — đừng sửa tay, sửa trong script rồi chạy lại.\n"
        "//\n"
        "// Các câu gợi ý CHUNG dùng thêm cho bài NÂNG CAO (kntt4.nc.tuan-NN). Bài nâng cao chỉ dùng gợi ý trong\n"
        "// kAdvancedHints hoặc kGeneratedHints (tutor_hints.dart). Câu không chứa chữ số nên không bao giờ lộ đáp án\n"
        "// và chỉ cần ghi âm một lần.\n"
        "library;\n\n"
        "/// Câu gợi ý bổ sung cho bài nâng cao (đúng từng chữ).\n"
        "const List<String> kAdvancedHints = [\n" + body + "\n];\n",
        encoding="utf-8")


def main() -> int:
    catalog_path = CONTENT / "catalog.json"
    cal_path = CONTENT / "calendar.json"
    catalog = json.loads(catalog_path.read_text(encoding="utf-8"))
    calendar = json.loads(cal_path.read_text(encoding="utf-8"))
    book = next(b for b in catalog["books"] if b["id"] == BOOK)
    chapter_of = {l["id"]: c["id"] for c in book["chapters"] for l in c["lessons"]}

    weeks: dict[int, list[str]] = {}
    for d in calendar["days"]:
        ls = weeks.setdefault(d["week"], [])
        if d["lessonId"] not in ls:
            ls.append(d["lessonId"])
    assert sorted(weeks) == list(range(1, len(weeks) + 1)), sorted(weeks)
    for w, ls in weeks.items():
        chs = list(dict.fromkeys(int(chapter_of[l].rsplit("c", 1)[1]) for l in ls))
        topic = " · ".join(CH_SHORT[c] for c in chs)
        if len(f"Nâng cao tuần {w}: {topic}") > 80:
            topic = CH_SHORT[chs[-1]]
        WEEKS[w] = (topic, make_week_fn(chs))

    for f in LESSON_DIR.glob(f"{PREFIX}*.json"):
        f.unlink()
    adv_refs: dict[str, list[dict]] = {}
    placed, n_problems, used_hints, skill_ids_all = [], 0, set(), set()
    for w in sorted(weeks):
        cid = chapter_of[weeks[w][0]]
        refs = adv_refs.setdefault(cid, [])
        order = len(refs) + 1
        lesson = build_week(w, cid, order)
        lid = lesson["id"]
        G.dump(LESSON_DIR / f"{lid}.json", lesson)
        skills = list(dict.fromkeys(s for p in lesson["problems"] for s in p["skillIds"]))
        skill_ids_all |= set(skills)
        used_hints |= {p["solution"]["hint"] for p in lesson["problems"]}
        n_problems += len(lesson["problems"])
        refs.append({"id": lid, "order": order, "title": lesson["title"], "src": f"assets/content/lessons/{lid}.json",
                     "access": "free", "skillIds": skills, "periods": 1})
        placed.append({"week": w, "lessonId": lid})

    known = {s["id"] for s in catalog["skills"]}
    for sid, name, strand, kid in NEW_SKILLS:
        if sid not in known:
            catalog["skills"].append({"id": sid, "name": name, "strand": strand, "kidName": kid})
            known.add(sid)
    missing = skill_ids_all - known
    assert not missing, f"kỹ năng chưa khai báo: {missing}"

    new_chapters = []
    for c in book["chapters"]:
        c2 = {k: v for k, v in c.items() if k != "advancedLessons"}
        c2["advancedLessons"] = adv_refs.get(c["id"], [])
        new_chapters.append(c2)
    book["chapters"] = new_chapters
    G.dump(catalog_path, catalog)

    calendar["advanced"] = placed
    G.dump(cal_path, calendar)
    write_hints_dart()

    print(f"Bài nâng cao: {len(placed)} (một bài mỗi tuần) · bài toán: {n_problems} · "
          f"câu gợi ý nâng cao: {len(AH)} · gợi ý đang dùng: {len(used_hints)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
