#!/usr/bin/env python3
"""Ảnh khung đầu + clip video cho từng bước bài học (Kie.ai: Nano Banana Pro → Kling 2.6 image-to-video).

  python3 tools/shots.py content/track-tay-khong.json [step_id ...] [--images-only] [--force]

Ảnh: .raw/kf_<step>.png ; video: .raw/vid_<step>.mp4 . Dừng nếu credit < MIN_CREDIT.
"""
import concurrent.futures as cf, json, pathlib, sys, threading
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from kie import RAW, credit, image, video  # noqa: E402
import art  # noqa: E402

MIN_CREDIT = 1200
WHO = {"coach": ("the instructor Alexei", art.COACH, "coach_portrait"),
       "ivan": ("the trainee Ivan", art.IVAN, "ivan_portrait"),
       "katya": ("the trainee Katya", art.KATYA, "katya_portrait")}
lock = threading.Lock()


def keyframe_prompt(shot):
    people = " ".join(f"{WHO[w][0].capitalize()} is {WHO[w][1]}." for w in shot["who"])
    return (f"{art.PHOTO} Use the reference portrait(s) to keep each person's face, hair, build and clothing exactly the same. "
            f"Square cinematic frame, wide enough that every person's whole body from head to feet is visible, camera at chest height. "
            f"Setting: {art.GROUND}. {people} Scene: {shot['frame']}. The instructor's ghillie hood stays draped back on his shoulders so his face is clearly visible. Natural realistic anatomy and hands, believable training moment. "
            f"{art.NOT_REAL} {art.CLEAN}")


def motion_prompt(shot):
    return (f"{shot['motion']}. Realistic natural human motion with correct anatomy, real-time speed, steady locked-off tripod camera, "
            f"no cuts, the people stay fully in frame, cinematic forest light, light mist.")


def do(step, images_only, force):
    sid, shot = step["id"], step["shot"]
    kf = RAW / f"kf_{sid}.png"
    if force or not kf.exists():
        with lock:
            c = credit()
        if c < MIN_CREDIT:
            return f"{sid}: skip (credit {c})"
        refs = [(RAW / f"{WHO[w][2]}.url").read_text().strip() for w in shot["who"]]
        image(f"kf_{sid}", "1:1", keyframe_prompt(shot), refs)
    if images_only:
        return f"{sid}: kf ok"
    vid = RAW / f"vid_{sid}.mp4"
    if force or not vid.exists():
        with lock:
            c = credit()
        if c < MIN_CREDIT:
            return f"{sid}: video skip (credit {c})"
        video(f"vid_{sid}", "kling-2.6/image-to-video", (RAW / f"kf_{sid}.url").read_text().strip(), motion_prompt(shot), "5")
    return f"{sid}: ok"


if __name__ == "__main__":
    args = sys.argv[1:]
    data = json.loads(pathlib.Path(args[0]).read_text())
    only = {a for a in args[1:] if not a.startswith("--")}
    steps = [s for l in data["lessons"] for s in l["steps"] if not only or s["id"] in only]
    with cf.ThreadPoolExecutor(4) as ex:
        futs = {ex.submit(do, s, "--images-only" in args, "--force" in args): s["id"] for s in steps}
        for f in cf.as_completed(futs):
            try:
                print(f.result(), flush=True)
            except Exception as e:  # noqa: BLE001
                print(f"{futs[f]}: ERROR {e}", flush=True)
    print("credit left", credit(), flush=True)
