#!/usr/bin/env python3
"""Tạo các âm thanh phản hồi đơn giản (tự tổng hợp, không cần giấy phép).

Chạy: python tool/make_sounds.py  → ghi assets/sounds/*.wav
"""
import math
import pathlib
import struct
import wave

RATE = 22050
OUT = pathlib.Path(__file__).resolve().parent.parent / "assets" / "sounds"


def tone(freq, dur, vol=0.5, decay=6.0, harmonics=((1, 1.0), (2, 0.25), (3, 0.08))):
    n = int(RATE * dur)
    out = []
    for i in range(n):
        t = i / RATE
        env = math.exp(-decay * t) * min(1.0, t / 0.005)  # tấn công nhanh, tắt dần
        s = sum(a * math.sin(2 * math.pi * freq * h * t) for h, a in harmonics)
        out.append(vol * env * s)
    return out


def mix_at(base, add, offset_s):
    off = int(offset_s * RATE)
    if len(base) < off + len(add):
        base.extend([0.0] * (off + len(add) - len(base)))
    for i, v in enumerate(add):
        base[off + i] += v
    return base


def write(name, samples):
    peak = max(1e-9, max(abs(s) for s in samples))
    scale = min(1.0, 0.9 / peak)
    OUT.mkdir(parents=True, exist_ok=True)
    with wave.open(str(OUT / name), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(RATE)
        w.writeframes(b"".join(struct.pack("<h", int(s * scale * 32767)) for s in samples))


def main():
    # Đúng: hai nốt đi lên C6 → E6 + lấp lánh G6
    s = []
    mix_at(s, tone(1046.5, 0.25, 0.5, 9), 0.0)
    mix_at(s, tone(1318.5, 0.35, 0.5, 8), 0.09)
    mix_at(s, tone(1568.0, 0.30, 0.25, 10), 0.18)
    write("correct.wav", s)

    # Chưa đúng: hai nốt trầm đi xuống, nhẹ nhàng, nhỏ tiếng (không gắt)
    s = []
    soft = ((1, 1.0), (3, 0.05))
    mix_at(s, tone(392.0, 0.22, 0.35, 7, soft), 0.0)
    mix_at(s, tone(329.6, 0.30, 0.35, 7, soft), 0.13)
    write("wrong.wav", s)

    # Chạm: tiếng "tách" rất ngắn
    write("tap.wav", tone(1400.0, 0.05, 0.4, 60, ((1, 1.0),)))

    # Hoàn thành: hợp âm rải C5 E5 G5 C6
    s = []
    for k, f in enumerate([523.3, 659.3, 784.0, 1046.5]):
        mix_at(s, tone(f, 0.6 - 0.08 * k, 0.4, 5), 0.11 * k)
    write("finish.wav", s)


if __name__ == "__main__":
    main()
