"""Records Lumi's Vietnamese voice-over with the 11max text-to-speech API.

    ELEVEN_MAX_API_KEY=... python3 tool/voiceover.py            # missing lines only
    ELEVEN_MAX_API_KEY=... python3 tool/voiceover.py --all      # re-record everything
    ELEVEN_MAX_API_KEY=... python3 tool/voiceover.py lesson_apple_base

Reads the texts from assets/i18n/vi.json (teacher.lines.*), writes
assets/audio/teacher/vi/<id>.mp3 (mono 64 kbps, silence trimmed) and updates
assets/audio/teacher/manifest.json with each line's length in ms, which the
app uses to type the text in sync with the voice.

Needs curl, ffmpeg and ffprobe. Never commit the API key.
"""
import json, os, subprocess, sys, time

VOICE = "5yEPTrA0uAhZsBEhHjfi"  # ElevenLabs shared voice "Chi" (warm young female, Vietnamese)
MODEL = "eleven_v3"
API = "https://api.11max.id.vn"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "assets/audio/teacher/vi")
MANIFEST = os.path.join(ROOT, "assets/audio/teacher/manifest.json")
KEY = os.environ.get("ELEVEN_MAX_API_KEY", "")


def curl(*args):
    headers = ["-H", f"xi-api-key: {KEY}"] if KEY else []
    return subprocess.run(["curl", "-sS", *headers, *args],
                          capture_output=True, text=True, check=True).stdout


def main():
    lines = json.load(open(os.path.join(ROOT, "assets/i18n/vi.json")))["teacher"]["lines"]
    os.makedirs(OUT, exist_ok=True)
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    todo = args or [i for i in lines if "--all" in sys.argv or not os.path.exists(f"{OUT}/{i}.mp3")]
    tasks = {}
    for lid in todo:
        body = json.dumps({"text": lines[lid], "model_id": MODEL, "language_code": "vi",
                           "voice_settings": {"stability": 0.5, "speed": 1.0}})
        # Many lines at once can hit the rate limit: retry gently.
        for attempt in range(6):
            raw = curl("-X", "POST", f"{API}/v1/text-to-speech/{VOICE}",
                       "-H", "Content-Type: application/json", "-d", body)
            try:
                reply, _ = json.JSONDecoder().raw_decode(raw.strip())
            except ValueError:
                reply = {}
            if "id" in reply:
                tasks[lid] = reply["id"]
                break
            print("retry", lid, raw[:120], flush=True)
            time.sleep(5 * (attempt + 1))
        time.sleep(0.5)
    while tasks:
        time.sleep(4)
        for lid, tid in list(tasks.items()):
            try:
                d, _ = json.JSONDecoder().raw_decode(curl(f"{API}/v1/history/{tid}").strip())
            except ValueError:
                continue
            if d["status"] == "completed":
                raw = f"{OUT}/{lid}.raw.mp3"
                curl("-o", raw, d["result"]["audio_url"])
                subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", raw, "-af",
                                "silenceremove=start_periods=1:start_threshold=-45dB,areverse,"
                                "silenceremove=start_periods=1:start_threshold=-45dB,areverse",
                                "-ac", "1", "-b:a", "64k", f"{OUT}/{lid}.mp3"], check=True)
                os.remove(raw)
                del tasks[lid]
                print("ok", lid)
            elif d["status"] == "failed":
                del tasks[lid]
                print("FAILED", lid, d.get("error"))
    manifest = {"vi": {}}
    for lid in lines:
        f = f"{OUT}/{lid}.mp3"
        if os.path.exists(f):
            dur = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                  "-of", "csv=p=0", f], capture_output=True, text=True).stdout
            manifest["vi"][lid] = round(float(dur) * 1000)
    json.dump(manifest, open(MANIFEST, "w"), indent=2, sort_keys=True)
    print("manifest:", len(manifest["vi"]), "lines")


if __name__ == "__main__":
    main()
