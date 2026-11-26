"""SQLite store: lessons by day, phrases (with Vietnamese meaning) and the spaced-repetition schedule.

The database can always be rebuilt from content/days/*.json plus the learner's taps
(`python -m nghe init-db`), so it is not committed to git.
"""
from __future__ import annotations

import datetime as dt
import re
import sqlite3
from pathlib import Path

SCHEMA = """
CREATE TABLE IF NOT EXISTS lessons (
  date        TEXT PRIMARY KEY,          -- YYYY-MM-DD
  day_number  INTEGER NOT NULL,
  topic_id    TEXT NOT NULL,
  topic_en    TEXT NOT NULL,
  topic_vi    TEXT NOT NULL,
  level       TEXT NOT NULL,
  built_at    TEXT,
  duration_s  REAL,
  credits     INTEGER,
  review_ids  TEXT                       -- JSON list of phrase ids played in part 4 (stable on rebuilds)
);
CREATE TABLE IF NOT EXISTS phrases (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  key         TEXT NOT NULL UNIQUE,      -- normalised English, avoids duplicates across days
  en          TEXT NOT NULL,
  vi          TEXT NOT NULL,
  note_vi     TEXT,
  lesson_date TEXT NOT NULL REFERENCES lessons(date),
  local_id    TEXT NOT NULL,             -- p01..p15 inside the lesson
  en_voice    TEXT,                      -- voice used the first time: reviews reuse the cached clip
  vi_voice    TEXT
);
CREATE TABLE IF NOT EXISTS srs (
  phrase_id   INTEGER PRIMARY KEY REFERENCES phrases(id),
  stage       INTEGER NOT NULL DEFAULT 0, -- index into intervals_days
  due_date    TEXT NOT NULL,
  last_seen   TEXT,
  lapses      INTEGER NOT NULL DEFAULT 0,
  mastered    INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS review_log (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  phrase_id   INTEGER NOT NULL REFERENCES phrases(id),
  date        TEXT NOT NULL,
  source      TEXT NOT NULL,             -- 'audio' (heard in part 4) | 'tap' (self-check on the website)
  result      TEXT NOT NULL              -- 'seen' | 'knew' | 'forgot'
);
CREATE INDEX IF NOT EXISTS srs_due ON srs(due_date);
"""


def norm_key(text: str) -> str:
    return re.sub(r"[^a-z0-9' ]+", "", text.lower().replace("’", "'")).strip()


def connect(path: Path) -> sqlite3.Connection:
    path.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(path)
    con.row_factory = sqlite3.Row
    con.executescript(SCHEMA)
    return con


def add_days(date: str, days: int) -> str:
    return (dt.date.fromisoformat(date) + dt.timedelta(days=days)).isoformat()


class SRS:
    """Review after 1, 3, 7, 14, 30, 60 days (configurable), adapted by the learner's taps."""

    def __init__(self, con: sqlite3.Connection, intervals: list[int], mastered_interval: int):
        self.con = con
        self.intervals = intervals
        self.mastered_interval = mastered_interval

    # -- lessons & phrases ---------------------------------------------------
    def upsert_lesson(self, content: dict) -> None:
        t = content["topic"]
        self.con.execute(
            "INSERT INTO lessons(date, day_number, topic_id, topic_en, topic_vi, level) VALUES (?,?,?,?,?,?) "
            "ON CONFLICT(date) DO UPDATE SET day_number=excluded.day_number, topic_id=excluded.topic_id, "
            "topic_en=excluded.topic_en, topic_vi=excluded.topic_vi, level=excluded.level",
            (content["date"], content["day_number"], t["id"], t["en"], t["vi"], content["level"]),
        )

    def register_phrases(self, content: dict, voices: dict[str, tuple[str, str]]) -> None:
        """Insert the lesson's phrases; the first review is due the next day."""
        date = content["date"]
        for p in content["phrases"]:
            key = norm_key(p["en"])
            en_v, vi_v = voices.get(p["id"], (None, None))
            row = self.con.execute("SELECT id, lesson_date FROM phrases WHERE key=?", (key,)).fetchone()
            if row and row["lesson_date"] != date:
                continue  # already learnt on an earlier day: keep its schedule
            if row:
                self.con.execute(
                    "UPDATE phrases SET en=?, vi=?, note_vi=?, local_id=?, en_voice=?, vi_voice=? WHERE id=?",
                    (p["en"], p["vi"], p.get("note_vi"), p["id"], en_v, vi_v, row["id"]),
                )
                continue
            cur = self.con.execute(
                "INSERT INTO phrases(key, en, vi, note_vi, lesson_date, local_id, en_voice, vi_voice) VALUES (?,?,?,?,?,?,?,?)",
                (key, p["en"], p["vi"], p.get("note_vi"), date, p["id"], en_v, vi_v),
            )
            self.con.execute(
                "INSERT INTO srs(phrase_id, stage, due_date) VALUES (?,?,?)",
                (cur.lastrowid, 0, add_days(date, self.intervals[0])),
            )

    # -- scheduling ----------------------------------------------------------
    def due(self, date: str, limit: int) -> list[sqlite3.Row]:
        """Phrases from earlier days that are due on `date`, most overdue first."""
        return self.con.execute(
            "SELECT p.*, s.stage, s.due_date, s.lapses FROM srs s JOIN phrases p ON p.id = s.phrase_id "
            "WHERE s.due_date <= ? AND p.lesson_date < ? ORDER BY s.due_date, s.lapses DESC, p.id LIMIT ?",
            (date, date, limit),
        ).fetchall()

    def by_ids(self, ids: list[int]) -> list[sqlite3.Row]:
        if not ids:
            return []
        q = ",".join("?" * len(ids))
        rows = self.con.execute(
            f"SELECT p.*, s.stage, s.due_date, s.lapses FROM phrases p JOIN srs s ON s.phrase_id=p.id WHERE p.id IN ({q})", ids
        ).fetchall()
        order = {pid: i for i, pid in enumerate(ids)}
        return sorted(rows, key=lambda r: order[r["id"]])

    def mark_heard(self, phrase_ids: list[int], date: str) -> None:
        """Part 4 of `date` played these phrases: move each one stage forward (once per day)."""
        for pid in phrase_ids:
            if self.con.execute("SELECT 1 FROM review_log WHERE phrase_id=? AND date=? AND source='audio'",
                                (pid, date)).fetchone():
                continue
            self._advance(pid, date, steps=1)
            self.con.execute(
                "INSERT INTO review_log(phrase_id, date, source, result) VALUES (?,?,?,?)", (pid, date, "audio", "seen")
            )

    def apply_tap(self, phrase_key: str, date: str, knew: bool) -> bool:
        """Learner's self-check from the website. 'Knew it' jumps ahead one extra stage; 'didn't' resets."""
        row = self.con.execute("SELECT id FROM phrases WHERE key=?", (norm_key(phrase_key),)).fetchone()
        if not row:
            return False
        pid = row["id"]
        if knew:
            self._advance(pid, date, steps=1)
        else:
            self.con.execute(
                "UPDATE srs SET stage=0, due_date=?, last_seen=?, lapses=lapses+1, mastered=0 WHERE phrase_id=?",
                (add_days(date, 1), date, pid),
            )
        self.con.execute(
            "INSERT INTO review_log(phrase_id, date, source, result) VALUES (?,?,?,?)",
            (pid, date, "tap", "knew" if knew else "forgot"),
        )
        return True

    def _advance(self, pid: int, date: str, steps: int) -> None:
        s = self.con.execute("SELECT stage FROM srs WHERE phrase_id=?", (pid,)).fetchone()
        stage = (s["stage"] if s else 0) + steps
        if stage >= len(self.intervals):
            self.con.execute(
                "UPDATE srs SET stage=?, due_date=?, last_seen=?, mastered=1 WHERE phrase_id=?",
                (len(self.intervals), add_days(date, self.mastered_interval), date, pid),
            )
        else:
            self.con.execute(
                "UPDATE srs SET stage=?, due_date=?, last_seen=? WHERE phrase_id=?",
                (stage, add_days(date, self.intervals[stage]), date, pid),
            )

    def stats(self) -> dict:
        r = self.con.execute(
            "SELECT COUNT(*) n, SUM(mastered) m, SUM(CASE WHEN lapses>0 THEN 1 ELSE 0 END) hard FROM srs"
        ).fetchone()
        return {"phrases": r["n"] or 0, "mastered": r["m"] or 0, "hard": r["hard"] or 0}
