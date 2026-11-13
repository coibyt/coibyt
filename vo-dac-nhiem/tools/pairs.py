#!/usr/bin/env python3
"""Clip bước chân CHÍNH XÁC: tạo ảnh đầu/cuối cho từng nửa động tác (Nano Banana Pro), rồi để Kling nội suy
giữa hai ảnh (ảnh đầu + ảnh cuối) → AI không thể đổi thứ tự chân. Phần quay về = phát ngược clip đi.

  python3 tools/pairs.py tk2-3 tk2-4 tk2-5
Kết quả: .raw/vid_<step>.mp4 (thay clip cũ; clip cũ chuyển vào .raw/old5/)."""
import concurrent.futures as cf, pathlib, shutil, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from kie import RAW, create, fetch, image, wait  # noqa: E402

KEEP = ("Edit the reference photo. Keep EVERYTHING identical: the same man, same face, same clothes and gear, same camera position, "
        "same framing, same lens, same background, same light, same mat. ")
MODEL = "kling/v2-5-turbo-image-to-video-pro"
SPEC = {
    "tk2-3": {
        "imgs": {"B": KEEP + "Only change: his FRONT foot (the boot on the RIGHT side of the image, nearer the direction he faces) has stepped one short step further to the right, about 30 centimetres. His REAR foot (the boot on the LEFT side of the image) stays exactly where it was. So his stance is now a bit wider. Same bent knees, same guard.",
                 "C": KEEP + "Only change: the man stands in exactly the same fighting stance, but his whole body and BOTH feet are shifted one short step (about 30 centimetres) to the right side of the image."},
        "clips": [("A", "B", "Slow tutorial movement: ONLY his front foot (right side of the image) slides one short step forward to the right and lands. His rear foot does not move at all. Guard stays up, knees bent."),
                  ("B", "C", "Slow tutorial movement: ONLY his rear foot (left side of the image) slides forward the same short distance to restore his normal stance. His front foot does not move at all. Guard stays up, knees bent.")],
    },
    "tk2-4": {
        "imgs": {"B": KEEP + "Only change: the foot on the RIGHT side of the image (his left foot) has stepped one short step further to the right side of the image, about 30 centimetres. The foot on the LEFT side of the image stays exactly where it was. So his stance is now a bit wider. Same guard.",
                 "C": KEEP + "Only change: the man stands in exactly the same stance, but his whole body and BOTH feet are shifted one short step (about 30 centimetres) toward the right side of the image."},
        "clips": [("A", "B", "Slow tutorial side-step: ONLY the foot on the right side of the image slides one short step sideways to the right and lands. The other foot does not move. Guard stays up."),
                  ("B", "C", "Slow tutorial side-step: ONLY the foot on the left side of the image slides sideways to the right to restore his normal stance width. The other foot does not move. Guard stays up.")],
    },
    "tk2-5": {
        "imgs": {"M": KEEP + "Only change: he has pivoted one eighth of a turn (45 degrees) to his left on the ball of his FRONT foot: the front foot stays on exactly the same spot on the mat, his rear foot has moved a little in an arc, and his chest and guard now face 45 degrees to the left of the original direction. Same fighting stance, same guard. His face is still visible.",
                 "B": KEEP + "Only change: he has pivoted a quarter turn (90 degrees) to his left on the ball of his FRONT foot: the front foot stays on exactly the same spot on the mat, his rear foot has swung around in an arc, and his whole body, chest and guard now face 90 degrees to the left of the original direction, so we see him in profile. Same fighting stance, same guard. He does not turn his back to the camera."},
        "clips": [("A", "M", "Slow tutorial pivot, a small turn of only 45 degrees to his left: the ball of his front foot stays planted on the same spot, his rear foot moves a little in an arc. Guard stays up. He never turns his back to the camera."),
                  ("M", "B", "Slow tutorial pivot, another small turn of only 45 degrees to his left: the ball of his front foot stays planted on the same spot, his rear foot moves a little in an arc. Guard stays up. He never turns his back to the camera.")],
    },
}


def run(step):
    spec = SPEC[step]
    a_url = (RAW / f"kf_{step}.url").read_text().strip()
    urls = {"A": a_url}
    for k, prompt in spec["imgs"].items():
        name = f"pair_{step}_{k}"
        if not (RAW / f"{name}.url").exists():
            image(name, "1:1", prompt, [a_url])
        urls[k] = (RAW / f"{name}.url").read_text().strip()
    parts = []
    for i, (a, b, motion) in enumerate(spec["clips"]):
        name = f"pair_{step}_clip{i}"
        if not (RAW / f"{name}.mp4").exists():
            task = create(MODEL, {"prompt": motion + " Steady locked-off tripod camera, realistic natural motion, feet clearly visible.",
                                  "image_url": urls[a], "tail_image_url": urls[b], "duration": "5"})
            fetch(name, wait(task, timeout=2400), "mp4")
        parts.append(RAW / f"{name}.mp4")
    # ghép: đi (các clip theo thứ tự) + về (phát ngược theo thứ tự ngược) → đúng quy tắc lùi: chân sau trước
    n = len(parts)
    ins, fc = [], []
    for i, p in enumerate(parts):
        ins += ["-i", str(p)]
        fc.append(f"[{i}:v]scale=720:720,setsar=1,fps=24,split[f{i}][r{i}];[r{i}]reverse[b{i}]")
    seq = "".join(f"[f{i}]" for i in range(n)) + "".join(f"[b{i}]" for i in reversed(range(n)))
    fc.append(f"{seq}concat=n={2 * n}:v=1[v]")
    out = RAW / f"vid_{step}.mp4"
    old = RAW / "old5"; old.mkdir(exist_ok=True)
    if out.exists():
        shutil.move(str(out), str(old / out.name))
    subprocess.run(["ffmpeg", "-v", "error", "-y", *ins, "-filter_complex", ";".join(fc), "-map", "[v]", "-an",
                    "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", str(out)], check=True)
    return step, out


if __name__ == "__main__":
    with cf.ThreadPoolExecutor(3) as ex:
        for f in cf.as_completed([ex.submit(run, s) for s in sys.argv[1:]]):
            try:
                print(*f.result(), flush=True)
            except Exception as e:  # noqa: BLE001
                print("ERR", e, flush=True)
