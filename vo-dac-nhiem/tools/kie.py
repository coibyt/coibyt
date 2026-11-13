#!/usr/bin/env python3
"""Gọi Kie.ai (ảnh + video) cho Hổ Tuyết. Khoá: biến môi trường KIE_API_KEY (proxy của phiên cloud tự gắn).

  python3 tools/kie.py image <name> <aspect> "<prompt>" [ref_url ...]
  python3 tools/kie.py video <name> <model> <image_url> "<prompt>" [duration]
  python3 tools/kie.py credit

Kết quả gốc lưu ở .raw/<name>.<ext>, url kết quả ở .raw/<name>.url (để làm ảnh tham chiếu / đầu vào video).
"""
import json, os, pathlib, sys, time
import requests

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW = ROOT / ".raw"
RAW.mkdir(exist_ok=True)
API = "https://api.kie.ai/api/v1"
HEAD = {"Authorization": f"Bearer {os.environ.get('KIE_API_KEY', 'proxy-injected')}", "Content-Type": "application/json"}


def credit():
    return requests.get(f"{API}/chat/credit", headers=HEAD, timeout=30).json().get("data")


def create(model, inp, cb=None):
    body = {"model": model, "input": inp}
    for attempt in range(8):
        r = requests.post(f"{API}/jobs/createTask", headers=HEAD, json=body, timeout=60).json()
        if r.get("code") == 200:
            return r["data"]["taskId"]
        if r.get("code") == 429:
            time.sleep(8 + attempt * 6)
            continue
        raise RuntimeError(f"createTask {model}: {r}")
    raise RuntimeError("rate limited")


def wait(task, timeout=1500):
    t0 = time.time()
    while time.time() - t0 < timeout:
        time.sleep(6)
        try:
            d = requests.get(f"{API}/jobs/recordInfo", headers=HEAD, params={"taskId": task}, timeout=30).json()["data"]
        except Exception:
            continue
        st = d.get("state")
        if st == "success":
            res = d.get("resultJson")
            res = json.loads(res) if isinstance(res, str) else res
            return res["resultUrls"][0]
        if st == "fail":
            raise RuntimeError(f"task failed: {d.get('failMsg') or d}")
    raise TimeoutError(task)


def fetch(name, url, ext):
    data = requests.get(url, timeout=300).content
    (RAW / f"{name}.{ext}").write_bytes(data)
    (RAW / f"{name}.url").write_text(url)
    return RAW / f"{name}.{ext}"


def image(name, aspect, prompt, refs=(), model="nano-banana-pro"):
    inp = {"prompt": prompt, "aspect_ratio": aspect, "resolution": "1K", "output_format": "png"}
    if refs:
        inp["image_input"] = list(refs)
    url = wait(create(model, inp))
    return fetch(name, url, "png")


def video(name, model, image_url, prompt, duration="5", extra=None):
    if model.startswith("kling-2.6"):
        inp = {"prompt": prompt, "image_urls": [image_url], "duration": duration, "sound": False}
    elif model.startswith("bytedance/seedance"):
        inp = {"prompt": prompt, "image_urls": [image_url], "duration": duration, "resolution": "720p", "aspect_ratio": "1:1"}
    elif model.startswith("hailuo"):
        inp = {"prompt": prompt, "image_url": image_url, "duration": duration, "resolution": "768P"}
    elif model.startswith("wan"):
        inp = {"prompt": prompt, "image_urls": [image_url], "duration": duration, "resolution": "720p"}
    else:
        inp = {"prompt": prompt, "image_url": image_url, "duration": duration}
    if extra:
        inp.update(extra)
    url = wait(create(model, inp), timeout=2400)
    return fetch(name, url, "mp4")


if __name__ == "__main__":
    cmd = sys.argv[1]
    if cmd == "credit":
        print(credit())
    elif cmd == "image":
        print(image(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5:]))
    elif cmd == "video":
        print(video(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5], *(sys.argv[6:7] or ["5"])))
