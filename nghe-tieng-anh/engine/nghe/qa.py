"""Automatic listening check: every new clip is transcribed with 11max speech-to-text (Scribe)
and compared with the text it should say. Catches skipped words, wrong language or the odd
"hallucinated" take that TTS models sometimes produce. Results are cached per clip."""
from __future__ import annotations

import difflib
import json
import re
import time
import unicodedata
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import requests

from .tts import CACHE_DIR, ClipStore

STT_DIR = CACHE_DIR.parent / "stt"


def _words(s: str) -> list[str]:
    s = unicodedata.normalize("NFC", s.lower().replace("’", "'"))
    s = re.sub(r"[^\w' ]+", " ", s)
    return s.split()


def similarity(a: str, b: str) -> float:
    return difflib.SequenceMatcher(None, _words(a), _words(b)).ratio()


class Checker:
    def __init__(self, base_url: str, session: requests.Session | None = None):
        self.base = base_url.rstrip("/")
        self.s = session or requests.Session()
        STT_DIR.mkdir(parents=True, exist_ok=True)

    def transcribe(self, mp3: Path, lang: str) -> str:
        cache = STT_DIR / f"{mp3.stem}.json"
        if cache.exists():
            return json.loads(cache.read_text(encoding="utf-8"))["text"]
        for attempt in range(5):
            try:
                with open(mp3, "rb") as fh:
                    r = self.s.post(f"{self.base}/v1/speech-to-text", files={"file": (mp3.name, fh, "audio/mpeg")},
                                    data={"model_id": "scribe_v1", "language_code": lang}, timeout=90)
                r.raise_for_status()
                tid = r.json()["task_id"]
                for _ in range(120):
                    time.sleep(1.0)
                    h = self.s.get(f"{self.base}/v1/speech-to-text/{tid}", timeout=30).json()
                    if h.get("status") == "completed":
                        text = h["result"]["text"]
                        cache.write_text(json.dumps({"text": text, "lang": lang}, ensure_ascii=False), encoding="utf-8")
                        return text
                    if h.get("status") in ("failed", "error"):
                        raise RuntimeError(h.get("error"))
            except Exception:  # noqa: BLE001
                if attempt == 4:
                    raise
                time.sleep(4 * (attempt + 1))
        raise RuntimeError("STT timeout")


def check_clips(items: set[tuple[str, str, str]], store: ClipStore, base_url: str, threshold: float = 0.85,
                log=print) -> list[dict]:
    """Return clips whose transcript differs from the intended text."""
    ck = Checker(base_url)
    todo = sorted(items)

    def work(it):
        lang, voice, text = it
        path = store.resolve(lang, voice, text)
        heard = ck.transcribe(path, lang)
        score = similarity(text, heard)
        if re.search(r"[\u3040-\u30ff\u4e00-\u9fff]", heard):  # drifted into Chinese/Japanese: always redo
            score = 0.0
        return {"lang": lang, "voice": voice, "text": text, "heard": heard, "score": round(score, 3),
                "file": path.name}

    with ThreadPoolExecutor(6) as ex:
        res = list(ex.map(work, todo))
    bad = [r for r in res if r["score"] < threshold]
    log(f"  Kiểm tra nghe: {len(res)} clip, {len(bad)} cần xem lại (ngưỡng {threshold})")
    return sorted(bad, key=lambda r: r["score"])
