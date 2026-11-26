"""Audio engine: decode each cached clip, trim its silences, level it, slow it down when asked
(ffmpeg rubberband, pitch kept), then lay the whole day out on one timeline with exact
silences and encode a single MP3. Returns the cue list (start/end of every spoken clip)."""
from __future__ import annotations

import hashlib
import subprocess
from pathlib import Path

import numpy as np

from .tts import ENGINE_DIR, ClipStore

PCM_DIR = ENGINE_DIR / "cache" / "pcm"


def _decode(src: Path, sr: int, speed: float, engine: str) -> np.ndarray:
    af = []
    if abs(speed - 1.0) > 1e-3:
        af.append(f"rubberband=tempo={speed}:transients=smooth:window=standard" if engine == "rubberband"
                  else f"atempo={speed}")
    cmd = ["ffmpeg", "-loglevel", "error", "-i", str(src)]
    if af:
        cmd += ["-af", ",".join(af)]
    cmd += ["-ac", "1", "-ar", str(sr), "-f", "f32le", "-"]
    raw = subprocess.run(cmd, check=True, capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()


def _trim(x: np.ndarray, sr: int, thresh_db: float = -42.0, pad: float = 0.04) -> np.ndarray:
    if x.size == 0:
        return x
    win = max(1, int(sr * 0.01))
    n = x.size // win
    if n == 0:
        return x
    env = np.sqrt((x[: n * win].reshape(n, win) ** 2).mean(axis=1) + 1e-12)
    ref = env.max()
    on = np.where(20 * np.log10(env / ref + 1e-12) > thresh_db)[0]
    if on.size == 0:
        return x
    a = max(0, on[0] * win - int(pad * sr))
    b = min(x.size, (on[-1] + 1) * win + int(pad * sr))
    return x[a:b]


def _level(x: np.ndarray, sr: int, target_rms_db: float, peak_db: float) -> np.ndarray:
    if x.size == 0:
        return x
    win = max(1, int(sr * 0.02))
    n = x.size // win
    if n:
        frames = x[: n * win].reshape(n, win)
        rms = np.sqrt((frames ** 2).mean(axis=1))
        voiced = rms[rms > rms.max() * 0.1]
        level = np.sqrt((voiced ** 2).mean()) if voiced.size else rms.mean()
    else:
        level = np.sqrt((x ** 2).mean())
    gain = 10 ** (target_rms_db / 20) / max(level, 1e-6)
    y = x * gain
    peak = np.abs(y).max()
    lim = 10 ** (peak_db / 20)
    if peak > lim:  # gentle soft-clip above the limit instead of a hard cut
        y = np.where(np.abs(y) > lim * 0.8, np.sign(y) * (lim * 0.8 + (lim * 0.2) * np.tanh((np.abs(y) - lim * 0.8) / (lim * 0.2))), y)
    fade = min(int(sr * 0.012), y.size // 2)
    if fade:
        ramp = np.linspace(0, 1, fade, dtype=np.float32)
        y[:fade] *= ramp
        y[-fade:] *= ramp[::-1]
    return y.astype(np.float32)


class ClipProcessor:
    def __init__(self, store: ClipStore, acfg: dict):
        self.store = store
        self.sr = acfg["sample_rate"]
        self.acfg = acfg
        PCM_DIR.mkdir(parents=True, exist_ok=True)

    def get(self, lang: str, voice: str, text: str, speed: float) -> np.ndarray:
        src = self.store.resolve(lang, voice, text)
        tag = hashlib.sha1(f"{src.name}|{speed}|{self.sr}|{self.acfg['target_rms_db']}|{self.acfg['slow_engine']}|v2"
                           .encode()).hexdigest()[:20]
        cache = PCM_DIR / f"{tag}.f32"
        if cache.exists():
            return np.fromfile(cache, dtype=np.float32)
        x = _decode(src, self.sr, speed, self.acfg["slow_engine"])
        x = _level(_trim(x, self.sr), self.sr, self.acfg["target_rms_db"], self.acfg["peak_db"])
        x.tofile(cache)
        return x


def render(segments: list[dict], store: ClipStore, acfg: dict, out_mp3: Path, meta: dict,
           tempo: dict | None = None, log=print) -> dict:
    """`tempo` maps (lang, voice) to a speed factor for voices that speak fast (applied to every clip)."""
    proc = ClipProcessor(store, acfg)
    tempo = tempo or {}

    def clip(lang: str, voice: str, text: str, speed: float) -> np.ndarray:
        return proc.get(lang, voice, text, round(speed * tempo.get((lang, voice), 1.0), 3))

    sr = proc.sr
    raw_path = out_mp3.with_suffix(".pcm")
    cues, chapters = [], []
    pos = 0  # samples written
    last_len = 0
    part = 0
    with open(raw_path, "wb") as f:
        def write_silence(sec: float):
            nonlocal pos
            n = int(round(sec * sr))
            if n > 0:
                f.write(np.zeros(n, dtype=np.int16).tobytes())
                pos += n

        for i, seg in enumerate(segments):
            t = seg["t"]
            if t == "chapter":
                part = seg["part"]
                chapters.append({"part": part, "start": round(pos / sr, 3), "title_vi": seg["title_vi"],
                                 "title_en": seg["title_en"]})
            elif t == "gap":
                if "sec" in seg:
                    write_silence(seg["sec"])
                elif "shadow" in seg:
                    write_silence(last_len / sr + seg["shadow"])
                else:  # as long as an upcoming clip (role-play: the learner speaks first)
                    write_silence(clip("en", seg["before"], seg["text"], 1.0).size / sr + seg["extra"])
            elif t == "say":
                x = clip(seg["lang"], seg["voice"], seg["text"], seg.get("speed", 1.0))
                start = pos
                f.write((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes())
                pos += x.size
                last_len = x.size
                cue = {"i": len(cues), "part": part, "start": round(start / sr, 3), "end": round(pos / sr, 3),
                       "lang": seg["lang"], "text": seg["text"], "kind": seg.get("kind"), "voice": seg["voice"]}
                for k in ("ref", "en", "vi", "speaker"):
                    if seg.get(k):
                        cue[k] = seg[k]
                if abs(seg.get("speed", 1.0) - 1.0) > 1e-3:
                    cue["speed"] = seg["speed"]
                cues.append(cue)
    duration = pos / sr
    log(f"  Mã hoá MP3 ({duration / 60:.1f} phút)…")
    tags = []
    for k, v in meta.items():
        tags += ["-metadata", f"{k}={v}"]
    subprocess.run(["ffmpeg", "-loglevel", "error", "-y", "-f", "s16le", "-ar", str(sr), "-ac", "1", "-i", str(raw_path),
                    "-codec:a", "libmp3lame", "-b:a", acfg["bitrate"], *tags, "-id3v2_version", "3", str(out_mp3)],
                   check=True)
    raw_path.unlink()
    for c, nxt in zip(chapters, chapters[1:] + [None]):
        c["end"] = nxt["start"] if nxt else round(duration, 3)
    return {"duration": round(duration, 3), "cues": cues, "chapters": chapters}


def probe_duration(path: Path) -> float:
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                         check=True, capture_output=True, text=True).stdout
    return float(out.strip())
