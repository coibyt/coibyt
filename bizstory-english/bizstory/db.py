"""SQLite: series (mùa phim), episodes (lịch sử tập), phrases (cụm từ + lịch ôn SRS), days."""
from __future__ import annotations

import datetime as dt
import sqlite3
from pathlib import Path

from .config import DATA_DIR, SRS_INTERVALS

SCHEMA = """
CREATE TABLE IF NOT EXISTS series (
    id INTEGER PRIMARY KEY,
    season INTEGER NOT NULL UNIQUE,
    theme TEXT NOT NULL,              -- chủ đề lớn của cả mùa
    title_vi TEXT, title_en TEXT,
    bible TEXT,                       -- nhân vật, bối cảnh, giọng (JSON) để giữ nhất quán giữa các tập
    total_episodes INTEGER NOT NULL DEFAULT 5,
    current_episode INTEGER NOT NULL DEFAULT 0,   -- số tập đã phát hành
    previous_summary TEXT,            -- 3–5 dòng, đưa vào prompt tập sau + đoạn "Previously…"
    cover_path TEXT,
    status TEXT NOT NULL DEFAULT 'active',        -- active | done
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS days (
    day INTEGER PRIMARY KEY,
    date TEXT NOT NULL,
    title TEXT,
    mp3_path TEXT, transcript_path TEXT,
    duration_sec REAL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE TABLE IF NOT EXISTS episodes (
    id INTEGER PRIMARY KEY,
    day INTEGER NOT NULL,
    part INTEGER NOT NULL,            -- 1 phim, 2 case study, 3 tài chính & tâm lý
    kind TEXT NOT NULL,
    series_id INTEGER REFERENCES series(id),
    episode_no INTEGER,
    title_vi TEXT, title_en TEXT,
    topic TEXT NOT NULL,              -- để tránh lặp chủ đề
    subject TEXT,                     -- công ty/nhân vật thật (case study)
    summary TEXT,
    script_path TEXT, mp3_path TEXT, transcript_path TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(day, part)
);
CREATE TABLE IF NOT EXISTS phrases (
    id INTEGER PRIMARY KEY,
    key TEXT UNIQUE,                  -- d<day>p<part>-<id>, dùng chung với web
    en TEXT NOT NULL,
    vi TEXT NOT NULL,
    note_vi TEXT,
    context_vi TEXT,                  -- nhắc lại bối cảnh câu chuyện khi ôn
    example_en TEXT, example_vi TEXT,
    episode_id INTEGER REFERENCES episodes(id),
    learned_date TEXT NOT NULL,
    srs_step INTEGER NOT NULL DEFAULT 0,   -- chỉ số trong SRS_INTERVALS
    next_review_date TEXT NOT NULL,
    reviews INTEGER NOT NULL DEFAULT 0,
    lapses INTEGER NOT NULL DEFAULT 0,
    UNIQUE(en, episode_id)
);
CREATE INDEX IF NOT EXISTS idx_phrases_due ON phrases(next_review_date);
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY,
    phrase_id INTEGER NOT NULL REFERENCES phrases(id),
    day INTEGER, date TEXT NOT NULL,
    source TEXT NOT NULL,             -- audio (nghe Phần 4) | self (tự kiểm tra trên web)
    result TEXT NOT NULL              -- seen | good | again
);
"""


def connect(path: Path | None = None) -> sqlite3.Connection:
    p = path or DATA_DIR / "bizstory.sqlite"
    p.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(p)
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA foreign_keys = ON")
    con.executescript(SCHEMA)
    cols = {r["name"] for r in con.execute("PRAGMA table_info(phrases)")}
    if "kind" not in cols:  # nâng cấp DB cũ: phrase (cụm câu) | word (từ vựng)
        con.execute("ALTER TABLE phrases ADD COLUMN kind TEXT NOT NULL DEFAULT 'phrase'")
    return con


def add_days(date: str, n: int) -> str:
    return (dt.date.fromisoformat(date) + dt.timedelta(days=n)).isoformat()


# ---------- series ----------

def active_series(con: sqlite3.Connection) -> sqlite3.Row | None:
    return con.execute("SELECT * FROM series WHERE status='active' ORDER BY season DESC LIMIT 1").fetchone()


def create_series(con, season: int, theme: str, title_vi: str, title_en: str, bible: str = "",
                  total_episodes: int = 5) -> int:
    cur = con.execute(
        "INSERT INTO series(season, theme, title_vi, title_en, bible, total_episodes) VALUES (?,?,?,?,?,?)",
        (season, theme, title_vi, title_en, bible, total_episodes),
    )
    return cur.lastrowid


def advance_series(con, series_id: int, episode_no: int, summary: str) -> None:
    row = con.execute("SELECT total_episodes FROM series WHERE id=?", (series_id,)).fetchone()
    status = "done" if episode_no >= row["total_episodes"] else "active"
    con.execute(
        "UPDATE series SET current_episode=?, previous_summary=?, status=? WHERE id=?",
        (episode_no, summary, status, series_id),
    )


# ---------- episodes / phrases ----------

def next_day(con) -> int:
    r = con.execute("SELECT MAX(day) AS d FROM days").fetchone()
    return (r["d"] or 0) + 1


def past_topics(con, limit: int = 200) -> list[sqlite3.Row]:
    return con.execute(
        "SELECT day, part, kind, topic, subject, title_en FROM episodes ORDER BY day DESC, part LIMIT ?", (limit,)
    ).fetchall()


def upsert_episode(con, **f) -> int:
    con.execute("DELETE FROM phrases WHERE episode_id IN (SELECT id FROM episodes WHERE day=? AND part=?)",
                (f["day"], f["part"]))
    con.execute("DELETE FROM episodes WHERE day=? AND part=?", (f["day"], f["part"]))
    cols = ",".join(f)
    cur = con.execute(f"INSERT INTO episodes({cols}) VALUES ({','.join('?' * len(f))})", tuple(f.values()))
    return cur.lastrowid


def add_phrase(con, episode_id: int, date: str, p: dict) -> int:
    cur = con.execute(
        """INSERT OR REPLACE INTO phrases(key, en, vi, note_vi, context_vi, example_en, example_vi, episode_id,
               learned_date, srs_step, next_review_date, kind) VALUES (?,?,?,?,?,?,?,?,?,0,?,?)""",
        (p["key"], p["en"], p["vi"], p.get("note_vi"), p.get("recall_vi") or p.get("context_vi"),
         p.get("example_en") or (p.get("examples") or [{}])[0].get("en"),
         p.get("example_vi") or (p.get("examples") or [{}])[0].get("vi"), episode_id, date,
         add_days(date, SRS_INTERVALS[0]), p.get("kind", "phrase")),
    )
    return cur.lastrowid


def due_phrases(con, date: str, limit: int = 60) -> list[sqlite3.Row]:
    """Cụm từ đến hạn ôn (từ những ngày trước), ưu tiên quá hạn lâu nhất."""
    return con.execute(
        """SELECT p.*, e.title_vi AS ep_title, e.day AS ep_day FROM phrases p JOIN episodes e ON e.id=p.episode_id
           WHERE p.next_review_date <= ? AND p.learned_date < ? AND p.srs_step < ?
           ORDER BY p.next_review_date, p.id LIMIT ?""",
        (date, date, len(SRS_INTERVALS), limit),
    ).fetchall()


def phrases_of_day(con, day: int) -> list[sqlite3.Row]:
    return con.execute(
        """SELECT p.*, e.title_vi AS ep_title, e.day AS ep_day, e.part AS part FROM phrases p
           JOIN episodes e ON e.id=p.episode_id WHERE e.day=? ORDER BY e.part, p.id""",
        (day,),
    ).fetchall()


def record_review(con, phrase_id: int, date: str, day: int | None, source: str, result: str) -> None:
    """SRS 1–3–7–14 ngày. 'seen'/'good' → lên bậc; 'again' → về bậc 0 (ôn lại sau 1 ngày)."""
    p = con.execute("SELECT srs_step FROM phrases WHERE id=?", (phrase_id,)).fetchone()
    if p is None:
        return
    if result == "again":
        step, lapse = 0, 1
        nxt = add_days(date, SRS_INTERVALS[0])
    else:
        step, lapse = p["srs_step"] + 1, 0
        nxt = add_days(date, SRS_INTERVALS[step]) if step < len(SRS_INTERVALS) else add_days(date, 60)
    con.execute(
        "UPDATE phrases SET srs_step=?, next_review_date=?, reviews=reviews+1, lapses=lapses+? WHERE id=?",
        (step, nxt, lapse, phrase_id),
    )
    con.execute("INSERT INTO reviews(phrase_id, day, date, source, result) VALUES (?,?,?,?,?)",
                (phrase_id, day, date, source, result))
