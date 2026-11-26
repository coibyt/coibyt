"""Kiểm tra lõi: validator, biên dịch kịch bản, SRS, chuông. Không gọi API."""
import copy
import json
from pathlib import Path

import pytest

from bizstory import db, script

ROOT = Path(__file__).resolve().parent.parent


def mini_part(n_phr=6, part=1):
    ph = [{"id": f"p{i}", "en": f"Let me sleep on it number {i}.", "vi": "Để tôi nghĩ thêm.",
           "forms": [f"sleep on it number {i}"], "context_vi": "Ngữ cảnh.",
           "examples": [{"en": f"I'd like to sleep on it number {i}.", "vi": "x"},
                        {"en": f"Can I sleep on it number {i}?", "vi": "y"}], "recall_vi": "nhắc"} for i in range(n_phr)]
    return {"part": part, "kind": script.PART_KINDS[part], "title_vi": "T", "title_en": "T", "topic": "t",
            "series": {"season": 1, "episode_no": 1}, "cast": {"Narrator": "en_male", "Khang": "en_male2"},
            "phrases": ph, "opening": [{"speaker": "vn_host", "text": "Xin chào."}],
            "layer1": [{"speaker": "vn_host", "text": "Kể chuyện."}] + [{"phrase": p["id"]} for p in ph],
            "layer3": [{"speaker": "Khang", "text": " ".join(p["en"] for p in ph)}],
            "summary_vi": "a\nb\nc", "fact_check": {"sources": ["s"], "dramatized_note": "d"}}


def test_valid_mini_part_lenient():
    errs, _ = script.validate_part(mini_part(), lenient_time=True)
    assert errs == []


def test_duration_check_fails_for_short_script():
    errs, stats = script.validate_part(mini_part())
    assert any("Lớp 1" in e for e in errs) and stats["layer1_min"] < 5


def test_phrase_count_and_reuse_rules():
    p = mini_part(5)
    errs, _ = script.validate_part(p, lenient_time=True)
    assert any("6–8 cụm" in e for e in errs)
    p = mini_part()
    p["layer3"] = [{"speaker": "Khang", "text": "Nothing here."}]
    errs, _ = script.validate_part(p, lenient_time=True)
    assert sum("Lớp 3: chưa dùng lại" in e for e in errs) == 6
    p = mini_part()
    p["layer1"].append({"phrase": "p0"})
    errs, _ = script.validate_part(p, lenient_time=True)
    assert any("p0 xuất hiện 2 lần" in e for e in errs)


def test_layer3_must_be_english():
    p = mini_part()
    p["layer3"].append({"speaker": "Khang", "text": "Xin chào các bạn."})
    errs, _ = script.validate_part(p, lenient_time=True)
    assert any("tiếng Việt" in e for e in errs)


def test_compile_phrase_block_and_drill():
    segs = script.compile_part(mini_part(), recap_vi="Dòng 1\nDòng 2\nDòng 3")
    l1 = [s for s in segs if s["layer"] == 1 and s["kind"] == "phrase"]
    assert [(s["speed"], s["pause_ms"]) for s in l1[:2]] == [(0.85, 2000), (1.0, 700)]
    l2 = [s for s in segs if s["layer"] == 2]
    assert l2[0]["kind"] == "sfx"
    ctx = next(i for i, s in enumerate(l2) if s.get("role") == "drill_context")
    assert [l2[ctx + 1]["speed"], l2[ctx + 1]["pause_ms"], l2[ctx + 2]["speed"]] == [0.85, 2500, 1.0]
    assert any(s.get("role") == "recap" for s in segs)
    chapters = [s["chapter"] for s in segs if s.get("chapter")]
    assert len(chapters) == 4


def test_standard_segment_fields():
    for s in script.compile_part(mini_part()):
        assert {"speaker", "speed", "pause_ms", "text"} <= s.keys()


def test_srs_intervals(tmp_path):
    con = db.connect(tmp_path / "t.sqlite")
    eid = db.upsert_episode(con, day=1, part=1, kind="series", title_vi="a", title_en="a", topic="t")
    pid = db.add_phrase(con, eid, "2026-01-01", {"key": "d1p1-p1", "en": "a", "vi": "b"})
    nxt = lambda: con.execute("SELECT next_review_date, srs_step FROM phrases WHERE id=?", (pid,)).fetchone()
    assert nxt()["next_review_date"] == "2026-01-02"
    assert [r["key"] for r in db.due_phrases(con, "2026-01-02")] == ["d1p1-p1"]
    db.record_review(con, pid, "2026-01-02", 2, "audio", "seen")
    assert nxt()["next_review_date"] == "2026-01-05"
    db.record_review(con, pid, "2026-01-05", 5, "audio", "seen")
    assert nxt()["next_review_date"] == "2026-01-12"
    db.record_review(con, pid, "2026-01-12", 12, "self", "again")
    assert tuple(nxt()) == ("2026-01-13", 0)


def test_chime_is_generated():
    from bizstory import audio
    y = audio.make_sfx("chime")
    assert 1.5 < len(y) / audio.SR < 3 and abs(y).max() <= 0.5


@pytest.mark.parametrize("f", sorted((ROOT / "content" / "days").glob("day_*/part*.json")))
def test_sample_scripts_are_valid(f):
    errs, _ = script.validate_part(json.loads(f.read_text(encoding="utf-8")))
    assert errs == []
