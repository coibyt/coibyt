#!/usr/bin/env python3
"""Ghi lại vào manifest các file giọng đã thu nhưng chưa kịp ghi (khi bị dừng giữa chừng) — tránh tốn credit thu lại.
   python3 tools/voice_recover.py en ru ...   (không đối số: mọi ngôn ngữ)"""
import hashlib, json, pathlib, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
import voice  # noqa: E402
ROOT = voice.ROOT
langs = sys.argv[1:] or sorted(p.name for p in (ROOT / "assets/voice").iterdir() if p.is_dir())
for lang in langs:
    out = ROOT / "assets/voice" / lang
    mf = out / "manifest.json"
    if not out.exists():
        continue
    v = voice.VOICES.get(lang, {}).get("id") or voice.VOICE
    man = json.loads(mf.read_text()) if mf.exists() else {}
    lines = voice.all_lines(lang)
    added = 0
    for k, t in lines.items():
        h = hashlib.sha1(f"{v}|{voice.MODEL}|{t}".encode()).hexdigest()[:8]
        name = f"{k}-{h}.mp3"
        if man.get(k, {}).get("f") == name or not (out / name).exists():
            continue
        d = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(out / name)], capture_output=True, text=True).stdout.strip()
        if not d:
            continue
        man[k] = {"f": name, "d": int(float(d) * 1000)}
        added += 1
    mf.write_text(json.dumps(man, ensure_ascii=False, indent=0, sort_keys=True))
    print(f"{lang}: +{added} → {len(man)}/{len(lines)}")
