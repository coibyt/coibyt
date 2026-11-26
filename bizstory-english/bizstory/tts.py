"""11max (API tương thích ElevenLabs): mỗi câu chỉ thu MỘT lần cho mỗi giọng, cache theo hash.

- Bản 0.85x mặc định làm bằng ffmpeg `atempo` từ clip 1.0 (không tốn credit).
  SLOW_MODE=tts → 11max đọc chậm thật (tự nhiên hơn, tốn thêm credit cho các cụm ngắn).
- Clip được cắt khoảng lặng đầu/cuối (khoảng dừng do `pause_ms` quyết định chính xác),
  đo độ to (EBU R128) để cân bằng giọng Việt/Anh trước khi ghép.
"""
from __future__ import annotations

import concurrent.futures as cf
import hashlib
import json
import subprocess
import threading
import time
from dataclasses import dataclass
from pathlib import Path

import httpx

from . import config

API = "https://api.11max.id.vn"
SETTINGS_VERSION = 1
_lock = threading.Lock()


def model() -> str:
    return config.env("TTS_MODEL", "eleven_flash_v2_5")


def slow_mode() -> str:
    return config.env("SLOW_MODE", "atempo")


def clip_key(voice: str, text: str, speed: float = 1.0) -> str:
    v = config.voices()[voice]
    base = config.tts_speed(v.lang)
    tts_sp = round(base * (speed if slow_mode() == "tts" else 1.0), 3)
    raw = json.dumps([v.id, model(), v.lang, tts_sp, text, SETTINGS_VERSION], ensure_ascii=False)
    return hashlib.sha1(raw.encode()).hexdigest()[:20]


def needs_own_clip(speed: float) -> bool:
    """Bản chậm có cần gọi 11max riêng không (chỉ khi SLOW_MODE=tts)."""
    return speed != 1.0 and slow_mode() == "tts"


@dataclass
class Job:
    voice: str
    text: str
    speed: float = 1.0  # tốc độ yêu cầu 11max đọc (1.0, hoặc 0.85 nếu SLOW_MODE=tts)

    @property
    def key(self) -> str:
        return clip_key(self.voice, self.text, self.speed)


def cache_dir() -> Path:
    d = config.CACHE_DIR / "tts"
    d.mkdir(parents=True, exist_ok=True)
    return d


def raw_path(key: str) -> Path:
    return cache_dir() / f"{key}.mp3"


def meta_path(key: str) -> Path:
    return cache_dir() / f"{key}.json"


def cached(job: Job) -> bool:
    return raw_path(job.key).exists() and meta_path(job.key).exists()


def credits_for(chars: int) -> float:
    return chars * config.CREDITS_PER_CHAR


def api_key() -> str:
    # Trên cloud của dự án, proxy tự chèn khoá cho api.11max.id.vn; trên máy riêng cần MAX11_API_KEY.
    return config.env("MAX11_API_KEY", "proxy-injected")


def _request(client: httpx.Client, job: Job) -> tuple[bytes, dict]:
    v = config.voices()[job.voice]
    speed = round(config.tts_speed(v.lang) * job.speed, 3)
    body = {
        "text": job.text,
        "model_id": model(),
        "language_code": v.lang,
        "output_format": "mp3_44100_128",
        "voice_settings": {"stability": 0.5, "similarity_boost": 0.75, "style": 0.0,
                           "use_speaker_boost": True, "speed": speed},
    }
    headers = {"xi-api-key": api_key(), "Content-Type": "application/json"}
    last = None
    for attempt in range(6):
        try:
            r = client.post(f"{API}/v1/text-to-speech/{v.id}", headers=headers, json=body, timeout=120)
            if r.status_code == 429:
                time.sleep(10 + attempt * 10)
                continue
            if r.status_code >= 300:
                raise RuntimeError(f"11max {r.status_code}: {r.text[:200]}")
            if "audio" in r.headers.get("content-type", ""):
                return r.content, {"credits": None}
            task = r.json()["id"]
            for _ in range(240):
                time.sleep(1.5)
                d = client.get(f"{API}/v1/history/{task}", headers=headers, timeout=60).json()
                if d.get("status") == "completed":
                    audio = client.get(d["result"]["audio_url"], timeout=180).content
                    return audio, {"credits": d.get("credits_deducted"), "chars": d.get("characters_used"),
                                   "task": task, "voice_name": (d.get("metadata") or {}).get("voice_name")}
                if d.get("status") == "failed":
                    raise RuntimeError(f"11max failed: {d.get('error')} {d.get('detail_error')}")
            raise RuntimeError("11max timeout")
        except (httpx.HTTPError, RuntimeError, ValueError, KeyError) as e:
            last = e
            time.sleep(3 + attempt * 4)
    raise RuntimeError(f"Không thu được giọng sau 6 lần thử: {last}")


def _ffmpeg(*args: str) -> subprocess.CompletedProcess:
    return subprocess.run(["ffmpeg", "-v", "error", "-y", *args], capture_output=True, text=True, check=True)


def probe_duration(path: Path) -> float:
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                       capture_output=True, text=True)
    try:
        return float(r.stdout.strip())
    except ValueError:
        return 0.0


def measure_lufs(path: Path) -> float | None:
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(path), "-af",
                        "loudnorm=print_format=json", "-f", "null", "-"], capture_output=True, text=True)
    txt = r.stderr
    try:
        j = json.loads(txt[txt.rindex("{"): txt.rindex("}") + 1])
        v = float(j["input_i"])
        return v if v > -70 else None
    except (ValueError, KeyError):
        return None


TRIM = ("silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.03,areverse,"
        "silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.06,areverse")


def processed_wav(key: str, speed: float = 1.0) -> Path:
    """Clip đã cắt lặng, mono 44.1 kHz; bản chậm tạo bằng atempo nếu cần."""
    d = config.CACHE_DIR / "clips"
    d.mkdir(parents=True, exist_ok=True)
    base = d / f"{key}.wav"
    if not base.exists():
        _ffmpeg("-i", str(raw_path(key)), "-af", TRIM, "-ac", "1", "-ar", "44100", str(base))
    if speed == 1.0:
        return base
    slow = d / f"{key}_x{int(speed * 100)}.wav"
    if not slow.exists():
        _ffmpeg("-i", str(base), "-af", f"atempo={speed}", "-ac", "1", "-ar", "44100", str(slow))
    return slow


def synthesize(jobs: list[Job], workers: int | None = None, log=print) -> dict:
    """Thu các clip còn thiếu. Trả về thống kê credit thật."""
    todo, seen = [], set()
    for j in jobs:
        if j.key not in seen and not cached(j):
            seen.add(j.key)
            todo.append(j)
    stats = {"requested": len(todo), "chars": sum(len(j.text) for j in todo), "credits": 0.0}
    if not todo:
        return stats
    workers = workers or int(config.env("TTS_WORKERS", "4"))
    log(f"11max: thu {len(todo)} clip, {stats['chars']} ký tự (≈ {credits_for(stats['chars']):.0f} credit)…")
    done = 0
    ledger = config.DATA_DIR / "credits.jsonl"
    ledger.parent.mkdir(parents=True, exist_ok=True)

    def work(job: Job):
        with httpx.Client() as client:
            audio, info = _request(client, job)
        raw_path(job.key).write_bytes(audio)
        lufs = measure_lufs(raw_path(job.key))
        meta = {"voice": job.voice, "text": job.text, "speed": job.speed, "chars": len(job.text),
                "duration": probe_duration(raw_path(job.key)), "lufs": lufs, **info}
        meta_path(job.key).write_text(json.dumps(meta, ensure_ascii=False))
        processed_wav(job.key)
        return meta

    with cf.ThreadPoolExecutor(workers) as ex:
        futs = {ex.submit(work, j): j for j in todo}
        for f in cf.as_completed(futs):
            m = f.result()
            with _lock:
                done += 1
                stats["credits"] += m.get("credits") or credits_for(m["chars"])
                with ledger.open("a") as fh:
                    fh.write(json.dumps({"t": time.strftime("%Y-%m-%dT%H:%M:%S"), "voice": m["voice"],
                                         "chars": m["chars"], "credits": m.get("credits")}) + "\n")
                if done % 25 == 0 or done == len(todo):
                    log(f"  {done}/{len(todo)} clip · {stats['credits']:.0f} credit")
    return stats


def clip_meta(key: str) -> dict:
    return json.loads(meta_path(key).read_text())


def calibrate() -> dict:
    """Đo tốc độ đọc thật (ký tự/giây ở tốc độ 1.0) từ các clip đã cache → data/calibration.json."""
    tot = {"vi": [0, 0.0], "en": [0, 0.0]}
    for m in cache_dir().glob("*.json"):
        d = json.loads(m.read_text())
        v = config.voices().get(d["voice"])
        if not v or d.get("speed", 1.0) != 1.0 or d["chars"] < 60:
            continue
        wav = processed_wav(m.stem)
        dur = probe_duration(wav)
        if dur <= 0:
            continue
        # quy về tốc độ 1.0 của voice_settings
        tot[v.lang][0] += d["chars"]
        tot[v.lang][1] += dur * config.tts_speed(v.lang)
    rates = {k: round(c / s, 2) for k, (c, s) in tot.items() if s > 30}
    if rates:
        p = config.calibration_path()
        p.parent.mkdir(parents=True, exist_ok=True)
        old = json.loads(p.read_text()) if p.exists() else {}
        old.update(rates)
        p.write_text(json.dumps(old, indent=2))
    return rates
