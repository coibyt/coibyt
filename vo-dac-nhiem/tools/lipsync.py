#!/usr/bin/env python3
"""Video thầy nói KHỚP KHẨU HÌNH (Kie.ai Kling AI Avatar) cho từng câu thoại → assets/video/sync/<lang>/<key>.mp4 + index.json

  python3 tools/lipsync.py vi <khoá|@screen|@quiz> ... [--max-sec 15]

Giọng lấy từ bản đã đăng trên babelisa.com (máy chủ kie.ai tải được), ảnh nguồn là ảnh thầy cận cảnh (.raw/coach_presenter.url).
Câu dài hơn --max-sec bị bỏ qua (Kling Avatar không nhận câu quá dài).
"""
import concurrent.futures as cf, json, pathlib, re, subprocess, sys, threading, time
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from kie import RAW, create, credit, fetch, wait  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = "https://babelisa.com/soi-taiga/assets/voice/{lang}/{f}"
PROMPT = ("A charismatic, confident, handsome military instructor talking directly to the camera like a great teacher: expressive face and eyebrows, "
          "natural lip movement matching the speech, natural head movement and blinking, calm open-hand gestures at chest height that match what he says")
lock = threading.Lock()


def keys_for(sel, m):
    if sel == "@screen":
        return [k for k in m if not re.match(r"^tk\d+-(\d+|q\d+|w\d+)$", k) and not re.match(r"^(n\d+|call_|drill_)", k)]
    if sel == "@quiz":
        return [k for k in m if re.match(r"^tk\d+-(q|w)\d+$", k)]
    return [sel]


def main():
    lang = sys.argv[1]
    args = sys.argv[2:]
    max_sec = float(args[args.index("--max-sec") + 1]) if "--max-sec" in args else 15.0
    sels = [a for a in args if not a.startswith("--") and not re.match(r"^\d+(\.\d+)?$", a)]
    m = json.loads((ROOT / f"assets/voice/{lang}/manifest.json").read_text())
    out = ROOT / f"assets/video/sync/{lang}"
    out.mkdir(parents=True, exist_ok=True)
    idx_f = out / "index.json"
    done = set(json.loads(idx_f.read_text())) if idx_f.exists() else set()
    rawdir = RAW / f"sync_{lang}"
    rawdir.mkdir(exist_ok=True)
    img = (RAW / "coach_presenter.url").read_text().strip()
    keys = [k for s in sels for k in keys_for(s, m)]
    # khoá đã có video khớp với đúng file giọng hiện tại thì bỏ qua
    todo = [k for k in keys if k in m and m[k]["d"] <= max_sec * 1000
            and not ((rawdir / f"{k}.src").exists() and (rawdir / f"{k}.src").read_text() == m[k]["f"] and (out / f"{k}.mp4").exists())]
    print(len(todo), "câu,", round(sum(m[k]["d"] for k in todo) / 1000), "giây", flush=True)

    def job(k):
        url = PUBLIC.format(lang=lang, f=m[k]["f"])
        for attempt in range(4):
            with lock:
                c0 = credit()
                task = create("kling/ai-avatar-standard", {"image_url": img, "audio_url": url, "prompt": PROMPT})
                c1 = credit()
            try:
                raw = fetch(f"sync_{lang}/{k}", wait(task, timeout=3000), "mp4")
                break
            except Exception as e:  # noqa: BLE001 — "internal error" của nhà cung cấp: chờ rồi thử lại
                if attempt == 3:
                    raise
                print("  thử lại", k, e, flush=True)
                time.sleep(90 + attempt * 60)
        # nén: 540px, bỏ tiếng (giọng phát riêng bằng mp3 để không bao giờ chồng tiếng)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(raw), "-an", "-vf", "scale=540:-2:flags=lanczos,fps=25", "-c:v", "libx264",
                        "-preset", "slow", "-crf", "26", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(out / f"{k}.mp4")], check=True)
        (rawdir / f"{k}.src").write_text(m[k]["f"])
        return k, round(c0 - c1, 1)

    with cf.ThreadPoolExecutor(2) as ex:
        futs = {ex.submit(job, k): k for k in todo}
        for f in cf.as_completed(futs):
            try:
                k, cost = f.result()
                done.add(k)
                idx_f.write_text(json.dumps(sorted(done)))
                print("ok", k, "cost", cost, flush=True)
            except Exception as e:  # noqa: BLE001
                print("ERR", futs[f], e, flush=True)
    idx_f.write_text(json.dumps(sorted(done)))
    print("credit left", credit(), flush=True)


if __name__ == "__main__":
    main()
