#!/usr/bin/env python3
"""Thu giọng thầy Alexei bằng 11max (eleven_v3, giọng VânCa) → assets/voice/<lang>/*.mp3 + manifest.json.

  python3 tools/voice.py vi --count     # đếm câu còn thiếu
  python3 tools/voice.py vi             # thu mọi câu còn thiếu (câu đổi chữ thì thu lại)

Khoá: MAX11_API_KEY (proxy của phiên cloud tự gắn). Cần ffmpeg/ffprobe.
"""
import concurrent.futures as cf, hashlib, json, os, pathlib, subprocess, sys, tempfile, time
import requests

ROOT = pathlib.Path(__file__).resolve().parent.parent
API = "https://api.11max.id.vn"
VOICE = "CE5BJM57m1rtrAFVXfCq"  # VânCa — chủ dự án chọn
MODEL = "eleven_v3"
HEAD = {"xi-api-key": os.environ.get("MAX11_API_KEY", "proxy-injected"), "Content-Type": "application/json"}


def all_lines(lang):
    lines = dict(json.loads((ROOT / f"content/lines-{lang}.json").read_text()))
    for f in sorted((ROOT / "content").glob("track-*.json")):
        data = json.loads(f.read_text())
        for l in data["lessons"]:
            lines[f"{l['id']}-intro"] = l["intro"]
            lines[f"{l['id']}-outro"] = l["outro"]
            for s in l["steps"]:
                lines[s["id"]] = s["say"]
            for i, q in enumerate(l["quiz"]):
                lines[f"{l['id']}-q{i}"] = q["q"]
                lines[f"{l['id']}-w{i}"] = q["why"]
    return lines


def tts(text):
    body = {"text": text, "model_id": MODEL, "language_code": "vi", "output_format": "mp3_44100_128",
            "voice_settings": {"stability": 0.5, "similarity_boost": 0.8}}
    for attempt in range(6):
        try:
            r = requests.post(f"{API}/v1/text-to-speech/{VOICE}", headers=HEAD, json=body, timeout=90)
            if r.status_code == 429:
                time.sleep(10 + attempt * 10); continue
            r.raise_for_status()
            if "audio" in r.headers.get("content-type", ""):
                return r.content
            task = r.json()["id"]
            for _ in range(120):
                time.sleep(2)
                d = requests.get(f"{API}/v1/history/{task}", headers=HEAD, timeout=30).json()
                if d["status"] == "completed":
                    return requests.get(d["result"]["audio_url"], timeout=120).content
                if d["status"] == "failed":
                    raise RuntimeError(d.get("error"))
            raise TimeoutError(task)
        except Exception as e:  # noqa: BLE001
            if attempt == 5:
                raise
            print("  thử lại", e, flush=True)
            time.sleep(4 + attempt * 4)


def shrink(audio, dest):
    with tempfile.NamedTemporaryFile(suffix=".mp3", delete=False) as t:
        t.write(audio)
    af = ("silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
          "silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5,apad=pad_dur=0.12")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", t.name, "-af", af, "-ac", "1", "-ar", "44100", "-b:a", "56k", str(dest)], check=True)
    os.unlink(t.name)
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(dest)],
                         capture_output=True, text=True, check=True).stdout
    return int(float(out) * 1000)


def main():
    lang = sys.argv[1]
    out = ROOT / "assets/voice" / lang
    out.mkdir(parents=True, exist_ok=True)
    mf = out / "manifest.json"
    manifest = json.loads(mf.read_text()) if mf.exists() else {}
    lines = all_lines(lang)
    todo = {}
    for k, t in lines.items():
        h = hashlib.sha1(f"{VOICE}|{MODEL}|{t}".encode()).hexdigest()[:8]
        name = f"{k}-{h}.mp3"
        if manifest.get(k, {}).get("f") != name or not (out / name).exists():
            todo[k] = (t, name)
    print(len(todo), "câu cần thu,", sum(len(t) for t, _ in todo.values()), "ký tự", flush=True)
    if "--count" in sys.argv:
        return

    def job(item):
        k, (t, name) = item
        ms = shrink(tts(t), out / name)
        return k, name, ms

    with cf.ThreadPoolExecutor(4) as ex:
        for i, fut in enumerate(cf.as_completed([ex.submit(job, it) for it in todo.items()])):
            try:
                k, name, ms = fut.result()
            except Exception as e:  # noqa: BLE001
                print("LỖI", e, flush=True); continue
            old = manifest.get(k, {}).get("f")
            if old and old != name and (out / old).exists():
                (out / old).unlink()
            manifest[k] = {"f": name, "d": ms}
            if i % 10 == 0:
                mf.write_text(json.dumps(manifest, ensure_ascii=False, indent=0, sort_keys=True))
            print(i + 1, k, ms, flush=True)
    for k in list(manifest):
        if k not in lines:
            f = out / manifest.pop(k)["f"]
            if f.exists():
                f.unlink()
    mf.write_text(json.dumps(manifest, ensure_ascii=False, indent=0, sort_keys=True))


if __name__ == "__main__":
    main()
