"""Ghép âm thanh: pydub cho từng khối (chính xác đến mẫu), ffmpeg nối khối + loudnorm EBU R128 + MP3."""
from __future__ import annotations

import subprocess
import wave
from pathlib import Path

import numpy as np
from pydub import AudioSegment

from . import config

SR = 44100
CLIP_TARGET_LUFS = -19.0   # cân bằng từng clip trước khi ghép
FINAL_LUFS = -16.0         # chuẩn podcast (Apple/Spotify khoảng -16 / -14)
FINAL_TP = -1.5


# ---------------------------------------------------------------- tiếng chuông (tự tổng hợp, bản quyền gốc)

def _bell(freq: float, dur: float, amp: float = 1.0) -> np.ndarray:
    t = np.arange(int(SR * dur)) / SR
    partials = [(1.0, 1.0, 2.2), (2.0, 0.42, 3.4), (2.76, 0.22, 4.6), (5.4, 0.07, 7.0), (0.5, 0.12, 1.6)]
    y = sum(a * np.sin(2 * np.pi * freq * r * t) * np.exp(-d * t) for r, a, d in partials)
    attack = np.minimum(1.0, t / 0.006)
    return amp * y * attack


def _pad(freqs: list[float], dur: float, amp: float) -> np.ndarray:
    t = np.arange(int(SR * dur)) / SR
    env = np.sin(np.pi * np.minimum(t / dur, 1.0)) ** 2
    y = sum(np.sin(2 * np.pi * f * t) + 0.3 * np.sin(2 * np.pi * f * 2.0 * t + 0.4) for f in freqs)
    return amp * env * y / len(freqs)


def _mix(total: float, events: list[tuple[float, np.ndarray]]) -> np.ndarray:
    out = np.zeros(int(SR * total))
    for start, sig in events:
        i = int(start * SR)
        n = min(len(sig), len(out) - i)
        out[i:i + n] += sig[:n]
    # vang nhẹ: vài tiếng dội trễ
    wet = np.zeros_like(out)
    for delay, g in ((0.071, 0.32), (0.113, 0.22), (0.187, 0.15), (0.263, 0.1)):
        k = int(delay * SR)
        wet[k:] += g * out[:-k]
    out = out + wet
    fade = int(0.25 * SR)
    out[-fade:] *= np.linspace(1, 0, fade)
    return out / (np.abs(out).max() + 1e-9)


def make_sfx(name: str) -> np.ndarray:
    if name == "chime":  # chuyển lớp: hai nốt nhẹ (Mi5 → Si5)
        return _mix(2.2, [(0.0, _bell(659.25, 2.0, 0.8)), (0.16, _bell(987.77, 1.9, 0.55))]) * 0.32
    if name == "intro":  # mở phần: hợp âm rải Rê trưởng + nền ấm
        notes = [(0.0, 587.33), (0.14, 739.99), (0.28, 880.0), (0.46, 1174.66)]
        ev = [(s, _bell(f, 2.2, 0.7)) for s, f in notes] + [(0.0, _pad([146.83, 220.0, 293.66], 2.8, 0.5))]
        return _mix(3.0, ev) * 0.36
    if name == "logo":  # nhạc hiệu đầu ngày
        notes = [(0.0, 440.0), (0.18, 554.37), (0.36, 659.25), (0.6, 880.0), (0.84, 1108.73)]
        ev = [(s, _bell(f, 2.6, 0.7)) for s, f in notes] + [(0.0, _pad([110.0, 164.81, 220.0, 277.18], 3.6, 0.6))]
        return _mix(3.8, ev) * 0.4
    raise KeyError(name)


def sfx_path(name: str) -> Path:
    d = config.CACHE_DIR / "sfx"
    d.mkdir(parents=True, exist_ok=True)
    p = d / f"{name}.wav"
    if not p.exists():
        y = (make_sfx(name) * 32767).astype(np.int16)
        with wave.open(str(p), "wb") as w:
            w.setnchannels(1)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes(y.tobytes())
    return p


# ---------------------------------------------------------------- khối âm thanh

def load_clip(path: Path, gain_db: float = 0.0) -> AudioSegment:
    a = AudioSegment.from_file(path).set_channels(1).set_frame_rate(SR).set_sample_width(2)
    return a.apply_gain(gain_db) if gain_db else a


def silence(ms: int) -> AudioSegment:
    return AudioSegment.silent(duration=ms, frame_rate=SR).set_channels(1).set_sample_width(2)


def frames_ms(a: AudioSegment) -> float:
    return a.frame_count() / SR * 1000


class BlockWriter:
    """Ghi từng khối WAV, ghi lại thời điểm chính xác (ms) của mỗi segment."""

    def __init__(self, workdir: Path):
        self.dir = workdir
        self.dir.mkdir(parents=True, exist_ok=True)
        self.blocks: list[Path] = []
        self.offset_ms = 0.0
        self.cur: list[AudioSegment] = []
        self.cur_ms = 0.0

    def add(self, a: AudioSegment) -> tuple[float, float]:
        start = self.offset_ms + self.cur_ms
        self.cur.append(a)
        d = frames_ms(a)
        self.cur_ms += d
        return start, d

    def flush(self):
        if not self.cur:
            return
        p = self.dir / f"block_{len(self.blocks):03d}.wav"
        sum(self.cur[1:], self.cur[0]).export(p, format="wav")
        self.blocks.append(p)
        self.offset_ms += self.cur_ms
        self.cur, self.cur_ms = [], 0.0

    @property
    def total_ms(self) -> float:
        return self.offset_ms + self.cur_ms


def encode_mp3(blocks: list[Path], out: Path, chapters: list[dict] | None = None, title: str = "",
               bitrate: str = "64k", total: float = 0.0, log=print) -> None:
    """Nối khối → loudnorm 2 lượt (EBU R128) → MP3 mono, kèm chương ID3 (CHAP) cho app podcast."""
    lst = out.with_suffix(".concat.txt")
    lst.write_text("".join(f"file '{p.resolve()}'\n" for p in blocks))
    joined = out.with_suffix(".joined.wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", str(lst), "-c", "copy",
                    str(joined)], check=True)
    log("  đo độ to toàn bài (lượt 1 loudnorm)…")
    r = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(joined), "-af",
                        f"loudnorm=I={FINAL_LUFS}:TP={FINAL_TP}:LRA=11:print_format=json", "-f", "null", "-"],
                       capture_output=True, text=True)
    import json as _json
    t = r.stderr
    m = _json.loads(t[t.rindex("{"): t.rindex("}") + 1])
    af = (f"loudnorm=I={FINAL_LUFS}:TP={FINAL_TP}:LRA=11:measured_I={m['input_i']}:measured_TP={m['input_tp']}:"
          f"measured_LRA={m['input_lra']}:measured_thresh={m['input_thresh']}:offset={m['target_offset']}:"
          f"linear=true,aresample={SR}")
    meta = out.with_suffix(".ffmeta.txt")
    lines = [";FFMETADATA1", f"title={title}", "artist=BizStory English", "album=BizStory English", "genre=Podcast"]
    for i, c in enumerate(chapters or []):
        end = chapters[i + 1]["t"] if i + 1 < len(chapters) else max(total, c["t"] + 1)
        lines += ["[CHAPTER]", "TIMEBASE=1/1000", f"START={int(c['t'] * 1000)}", f"END={int(end * 1000)}",
                  f"title={c['title']}"]
    meta.write_text("\n".join(lines) + "\n", encoding="utf-8")
    log("  mã hoá MP3 (lượt 2 loudnorm)…")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(joined), "-i", str(meta), "-map_metadata", "1",
                    "-map_chapters", "1", "-af", af, "-ac", "1", "-ar", str(SR), "-c:a", "libmp3lame", "-b:a",
                    bitrate, "-id3v2_version", "3", str(out)], check=True)
    for p in (lst, joined, meta):
        p.unlink(missing_ok=True)


def export_small_mp3(src: Path, out: Path, gain_db: float = 0.0) -> None:
    out.parent.mkdir(parents=True, exist_ok=True)
    af = f"volume={gain_db}dB" if gain_db else "anull"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-af", af, "-ac", "1", "-c:a", "libmp3lame",
                    "-b:a", "64k", str(out)], check=True)
