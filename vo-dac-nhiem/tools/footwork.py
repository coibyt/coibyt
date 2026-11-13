#!/usr/bin/env python3
"""Clip bước chân cận cảnh (Kling 2.6): mỗi động tác tạo nhiều phương án để người duyệt chọn phương án đúng thứ tự chân.

  python3 tools/footwork.py gen tk2-3 [số phương án]      → .raw/fw_<step>_<i>.mp4 (+ ảnh soi chân .raw/fw_<step>_<i>.jpg)
  python3 tools/footwork.py pick tk2-3 <i> [--no-reverse]  → .raw/vid_<step>.mp4 = phương án i + phát ngược (phần quay về)
"""
import concurrent.futures as cf, pathlib, shutil, subprocess, sys
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from kie import RAW, image, video  # noqa: E402
import art  # noqa: E402

LEGS = ("the instructor's lower legs and black combat boots, woodland camouflage trousers tucked into the boots, on a worn olive canvas training mat "
        "laid on muddy forest ground, ferns and misty forest softly blurred behind")
SPEC = {
    "tk2-3": dict(
        frame=f"Low close-up side view at ankle height (strict profile) of {LEGS}. He stands in a fighting stance facing the RIGHT edge of the frame: "
              "his front boot is on the right side of the frame, his rear boot on the left side with its heel slightly raised, about shoulder-width-and-a-half apart, knees bent. Only the legs from the knees down are visible.",
        motion="Tutorial footwork, slow and very clear: the FRONT boot (on the right side of the frame) slides forward a short step toward the right edge FIRST and lands; "
               "only AFTER it lands, the REAR boot (on the left side of the frame) slides forward the same short distance. The boots never cross and never touch. Steady locked-off camera at ankle height."),
    "tk2-4": dict(
        frame=f"Low close-up front view at ankle height of {LEGS}. He faces the camera in a fighting stance, boots a bit wider than shoulder width, knees bent. Only the legs from the knees down are visible.",
        motion="Tutorial footwork, slow and very clear: the boot on the RIGHT side of the frame steps sideways a short step toward the right edge FIRST and lands; "
               "only AFTER it lands, the boot on the LEFT side of the frame slides sideways toward the right the same distance, so the stance width stays the same. The boots never cross. Steady locked-off camera."),
    "tk2-5": dict(
        frame=f"High-angle close-up looking down at {LEGS}. He stands in a fighting stance, front boot at the top of the frame, rear boot at the bottom right. Only the legs from the knees down are visible.",
        motion="Tutorial footwork, slow and very clear: the FRONT boot stays planted on the same spot and only twists on its ball, while the REAR boot swings around in a short quarter-circle arc, "
               "so the stance turns exactly ninety degrees and stops. The rear boot never steps over the front boot. Steady locked-off camera."),
}


def gen(step, n):
    kf = RAW / f"fwkf_{step}.png"
    if not kf.exists():
        image(f"fwkf_{step}", "1:1", f"{art.PHOTO} {SPEC[step]['frame']} No people's faces. {art.CLEAN}", [(RAW / "coach_portrait.url").read_text().strip()])
    url = (RAW / f"fwkf_{step}.url").read_text().strip()

    def one(i):
        out = RAW / f"fw_{step}_{i}.mp4"
        if not out.exists():
            video(f"fw_{step}_{i}", "kling-2.6/image-to-video", url, SPEC[step]["motion"], "5")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(out), "-vf", "fps=3,scale=200:-1,tile=15x1", "-frames:v", "1", str(RAW / f"fw_{step}_{i}.jpg")], check=True)
        return i
    with cf.ThreadPoolExecutor(n) as ex:
        list(ex.map(one, range(n)))


def pick(step, i, reverse=True):
    src = RAW / f"fw_{step}_{i}.mp4"
    out = RAW / f"vid_{step}.mp4"
    old = RAW / "old5"; old.mkdir(exist_ok=True)
    if out.exists():
        shutil.move(str(out), str(old / f"{out.stem}.prev.mp4"))
    fc = "[0:v]scale=720:720,setsar=1,fps=24,split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[v]" if reverse else "[0:v]scale=720:720,setsar=1,fps=24[v]"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(src), "-filter_complex", fc, "-map", "[v]", "-an", "-c:v", "libx264", "-crf", "18", "-pix_fmt", "yuv420p", str(out)], check=True)
    shutil.copy(RAW / f"fwkf_{step}.png", RAW / f"kf_{step}.png")
    print("picked", step, i, "→", out)


if __name__ == "__main__":
    cmd, step = sys.argv[1], sys.argv[2]
    if cmd == "gen":
        gen(step, int(sys.argv[3]) if len(sys.argv) > 3 else 3)
    else:
        pick(step, int(sys.argv[3]), "--no-reverse" not in sys.argv)
