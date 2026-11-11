#!/usr/bin/env python3
"""Tạo hình cho app bằng Kie.ai (Nano Banana Pro) — cô giáo, vật phẩm, thú cưng, hình nền.

Chạy trong thư mục toan-lop-3:
  python tool/make_art.py --list                 # xem danh sách hình
  python tool/make_art.py teacher_idle           # tạo 1 hình (theo tên)
  python tool/make_art.py --group pets           # tạo cả nhóm
  python tool/make_art.py --all --skip-existing  # tạo mọi hình còn thiếu

Ảnh gốc lưu ở .art-raw/ (không đưa lên git), kèm url kết quả (.url) để làm ảnh tham chiếu.
Sau đó chạy tool/prepare_teacher_assets.py để xoá nền và đưa vào assets/.
Khoá API: biến môi trường KIE_API_KEY (không ghi vào code / git).
"""
import argparse
import concurrent.futures as cf
import json
import os
import pathlib
import sys
import time

import requests

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW = ROOT / ".art-raw"
CREATE = "https://api.kie.ai/api/v1/jobs/createTask"
STATUS = "https://api.kie.ai/api/v1/jobs/recordInfo"
MODEL = "nano-banana-pro"
HEAD = {"Authorization": f"Bearer {os.environ.get('KIE_API_KEY', 'proxy-injected')}", "Content-Type": "application/json"}

GREEN = "Solid flat pure green (#00FF00) chroma-key background filling the whole frame, no gradient, no shadow on the background, no floor."
MAGENTA = "Solid flat pure magenta (#FF00FF) chroma-key background filling the whole frame, no gradient, no shadow on the background, no floor."
CLEAN = "No text, no letters, no numbers, no watermark, no logo, no border."
STYLE = (
    "Premium stylized 3D animated-film look like a high-end mobile game: soft global illumination, "
    "gentle rim light, rich saturated but harmonious colours, smooth materials, crisp details."
)

TEACHER = (
    "An original 3D character for a children's math learning app: a beautiful, warm and friendly young Vietnamese "
    "female primary-school teacher in her late twenties, kind sparkling dark-brown eyes, soft natural makeup, "
    "rosy cheeks, gentle closed-lip smile, glossy long black hair in an elegant low bun with a small coral flower "
    "hair clip, wearing an elegant light sky-blue silk ao dai (Vietnamese long dress) with delicate white lotus "
    "embroidery on the chest and a high mandarin collar. Waist-up portrait facing the viewer, relaxed confident "
    "posture, both arms resting naturally at her sides, head and face large and clearly visible, centered, the "
    "character fills about 85% of the frame height with empty margin around her. Modest and age-appropriate. "
    "Not resembling any real person or existing character. " + STYLE + " " + GREEN + " " + CLEAN
)
KEEP = (
    "Use the reference image. Keep EVERYTHING identical: the same woman, same face, same hairstyle, same ao dai "
    "and embroidery, same art style and lighting, same framing, same position and size in the frame, same solid "
    "pure green (#00FF00) background. "
)


def obj(desc, bg=MAGENTA):
    return f"{desc}, single object, isolated, centered with generous empty margin, cute glossy premium 3D game icon. {STYLE} {bg} {CLEAN}"


def pet(desc, bg=MAGENTA):
    return (
        f"An adorable original chibi 3D pet character: {desc}, big sparkling eyes, tiny happy smile, soft fluffy "
        f"materials, sitting pose facing the viewer, full body, centered with generous empty margin, collectible "
        f"premium game style. {STYLE} {bg} {CLEAN}"
    )


JOBS = {
    # ---- cô giáo (3:4, nền xanh) ----
    "teacher_idle": dict(group="teacher", aspect="3:4", prompt=TEACHER),
    "teacher_blink": dict(group="teacher", aspect="3:4", ref="teacher_idle",
                          prompt=KEEP + "Only change: her eyes are gently closed in a natural blink, mouth closed with the same soft smile."),
    "teacher_talk": dict(group="teacher", aspect="3:4", ref="teacher_idle",
                         prompt=KEEP + "Only change: her mouth is open in a friendly speaking shape as if saying 'ah', showing a little of the upper teeth, eyes open and warm."),
    "teacher_think": dict(group="teacher", aspect="3:4", ref="teacher_idle",
                          prompt=KEEP + "Change only her pose and expression: she rests her chin on her right hand with the index finger touching her chin, eyes looking up thoughtfully, gentle encouraging expression, mouth closed."),
    "teacher_think_talk": dict(group="teacher", aspect="3:4", ref="teacher_think",
                               prompt=KEEP.replace("same position", "same pose, same position") + "Only change: her mouth is open in a friendly speaking shape, gently encouraging."),
    "teacher_clap": dict(group="teacher", aspect="3:4", ref="teacher_idle",
                         prompt=KEEP + "Change only her pose and expression: she claps her hands together in front of her chest, very happy wide smile with eyes squinting joyfully, a few small golden sparkles around her hands."),
    "teacher_clap_talk": dict(group="teacher", aspect="3:4", ref="teacher_clap",
                              prompt=KEEP.replace("same position", "same clapping pose, same position") + "Only change: her mouth is open wide in a cheerful 'Yay!' shape."),
    # ---- vật phẩm (1:1, nền hồng sẫm) ----
    "coin": dict(group="ui", aspect="1:1", prompt=obj("A shiny thick gold coin with an embossed star in the centre and a beaded rim, slightly tilted")),
    "star": dict(group="ui", aspect="1:1", prompt=obj("A plump shiny golden-yellow star with soft rounded points and a sparkle highlight")),
    "heart": dict(group="ui", aspect="1:1", prompt=obj("A plump glossy ruby-red heart with a soft pink highlight")),
    "flame": dict(group="ui", aspect="1:1", prompt=obj("A cheerful game streak fire icon: a bold blazing campfire-style flame with three flickering tongues of fire curling upward, bright red-orange outer flame, golden-yellow inner core, small sparks around it, glossy 3D game icon, clearly recognizable as fire")),
    "chalkboard": dict(group="ui", aspect="4:3", prompt=obj("A classroom deep-green chalkboard with an elegant light oak wooden frame and a small chalk tray holding two pieces of white chalk, completely empty with nothing written on it, front view")),
    "chest_closed": dict(group="ui", aspect="1:1", prompt=obj("A closed small treasure chest made of warm wood with shiny gold trim and a heart-shaped gold lock")),
    "chest_open": dict(group="ui", aspect="1:1", prompt=obj("An open small treasure chest made of warm wood with shiny gold trim, overflowing with gold coins and little stars, magical golden glow")),
    "tile_lesson": dict(group="ui", aspect="1:1", prompt=obj("A magical open book with glowing golden plus, minus, times and divide symbols floating up from the pages, sparkles")),
    "tile_exam": dict(group="ui", aspect="1:1", prompt=obj("A neat exam paper sheet with a gold star sticker, a yellow pencil and a small red alarm clock beside it")),
    "tile_rank": dict(group="ui", aspect="1:1", prompt=obj("A shining golden trophy cup standing on a small three-step podium with confetti")),
    "tile_shop": dict(group="ui", aspect="1:1", prompt=obj("A cute little shop stall with a striped pink and yellow awning, a gift box and gold coins on the counter")),
    "tile_badge": dict(group="ui", aspect="1:1", prompt=obj("A shiny gold medal with a star in the centre hanging on a blue and red ribbon")),
    "tile_mission": dict(group="ui", aspect="1:1", prompt=obj("A rolled parchment quest scroll with a red wax seal and a small gold compass beside it")),
    # ---- hình nền (9:16, không xoá nền) ----
    "bg_home": dict(group="bg", aspect="9:16", prompt=(
        "A dreamy bright background illustration for a children's math app home screen: a sunny magical garden "
        "classroom in the sky, soft pastel clouds, a gentle rainbow, tiny floating golden stars and soft bokeh, "
        "warm cream and sky-blue palette, very soft and low-contrast with plenty of calm empty space in the middle "
        "for buttons, no characters, no people. " + STYLE + " " + CLEAN)),
    "bg_lesson": dict(group="bg", aspect="9:16", prompt=(
        "A soft calm background illustration for a children's math practice screen: a cozy bright classroom wall "
        "in warm cream and pale honey tones with a hint of a window light, very faint pastel doodles of stars and "
        "clouds in the corners, extremely low contrast, mostly empty smooth space, no characters, no furniture in "
        "the centre. " + STYLE + " " + CLEAN)),
}

PETS = {
    "cun": ("a fluffy cream puppy with floppy ears and a red collar", MAGENTA),
    "meo": ("a striped orange tabby kitten with a little bell", MAGENTA),
    "tho": ("a snow-white bunny with long ears and a pink nose", MAGENTA),
    "ga": ("a round fluffy yellow baby chick", MAGENTA),
    "hamster": ("a chubby golden hamster holding a sunflower seed", MAGENTA),
    "cao": ("a bright orange fox cub with a fluffy white-tipped tail", MAGENTA),
    "gautruc": ("a round baby panda holding a small bamboo leaf", MAGENTA),
    "gautui": ("a grey baby koala hugging a small eucalyptus branch", MAGENTA),
    "canhcut": ("a little baby penguin with a tiny blue scarf", MAGENTA),
    "cu": ("a wise little brown owl wearing tiny round glasses", MAGENTA),
    "caheo": ("a happy baby blue dolphin jumping out of a small splash of water", MAGENTA),
    "kylan": ("a magical white baby unicorn with a pastel rainbow mane and a golden horn", GREEN),
    "rong": ("a friendly baby green dragon with tiny wings and a little golden belly", MAGENTA),
}
# ---- khu Luyện thi ----
EXAM_ICONS = {
    "exam_tuan": "A shiny round weekly challenge badge: a small golden calendar page with a big check mark, ribbon below",
    "exam_kt15": "A cute glossy red-and-gold stopwatch with a lightning bolt sparkle beside it",
    "exam_1tiet": "A wooden clipboard holding a neat exam paper with a pencil and a small green check mark",
    "exam_giuaki": "A small mountain peak with a bright orange flag planted at the halfway ledge, sparkles",
    "exam_cuoiki": "A grand golden trophy cup with a laurel wreath and a red ribbon, sparkling",
    "exam_ontap": "A stack of three colourful books with a glowing purple bookmark and a small star",
}
for n, desc in EXAM_ICONS.items():
    JOBS[n] = dict(group="ui", aspect="1:1", prompt=obj(desc))  # exam_1tiet → đổi tên file thành exam1tiet.webp
JOBS["bg_exam"] = dict(group="bg", aspect="9:16", prompt=(
    "A soft calm background illustration for a children's exam practice screen: a bright airy school hall with tall "
    "windows and warm morning light, very faint pastel pennant garlands near the top, light lavender and cream "
    "palette, extremely low contrast, mostly empty smooth space in the middle, no characters, no desks in the "
    "centre. " + STYLE + " " + CLEAN))

# ---- Kiểm tra năng lực ----
ABILITY = {
    "ab_so": "A glowing crystal block with the shape of building blocks stacked into a tower, magical blue sparkles",
    "ab_congtru": "Two cute glossy 3D symbols, a plus sign and a minus sign, made of shiny candy-like green and orange glass",
    "ab_nhanchia": "Two cute glossy 3D symbols, a multiplication cross and a division sign, made of shiny purple and pink glass",
    "ab_hinh": "A cute set of 3D geometry shapes: a cube, a sphere, a pyramid and a ruler with a small compass",
    "ab_doluong": "A cute kitchen scale, a small clock and a measuring cup grouped together, warm glossy colours",
    "ab_rocket": "A cheerful cartoon rocket launching upward with a golden flame trail and stars",
    "ab_rank_1": "A small bronze shield emblem with a sprouting green leaf",
    "ab_rank_2": "A silver shield emblem with a shining blue star",
    "ab_rank_3": "A gold shield emblem with a glowing star and small wings",
    "ab_rank_4": "A radiant diamond crystal shield emblem with a crown and golden wings, magical glow",
}
for n, desc in ABILITY.items():
    JOBS[n] = dict(group="ui", aspect="1:1", prompt=obj(desc))
JOBS["bg_ability"] = dict(group="bg", aspect="9:16", prompt=(
    "A magical background for a children's math skill test: a soft starry twilight sky in deep indigo fading to "
    "lavender and peach near the bottom, gentle glowing constellations made of tiny dots, floating soft clouds, "
    "calm and low contrast with lots of empty space in the middle, no characters, no text. " + STYLE + " " + CLEAN))

# ---- ảnh bìa 16 chủ đề (4:3, tranh đầy đủ, không xoá nền) ----
CHAPTERS = {
    1: "a cheerful review adventure: a winding path of stepping stones through a sunny meadow, each stone a different pastel colour, a small backpack and pencils resting beside the path",
    2: "a magical tower of colourful building blocks arranged in neat groups and rows, glowing softly, floating sparkles, a cozy playroom",
    3: "a playful world of flat shapes and solids: a big circle, triangles, squares, rectangles, a cube and a box floating in a pastel sky garden, a compass and ruler",
    4: "a bustling fruit market stall where apples and oranges are arranged in equal groups in baskets, a happy sunny morning",
    5: "a little science lab table with a measuring tape, a ruler, a kitchen scale with fruits, a measuring jug of water and a thermometer, warm light",
    6: "a grand cozy library of floating glowing number cards and golden gears, a big magic book, rich warm colours",
    7: "a festive end-of-term celebration in a decorated classroom with garlands, a golden trophy and confetti, cheerful",
    8: "a starry night sky where thousands of tiny golden stars form neat glowing clusters over a calm lake, magical",
    9: "a beautiful garden seen from above with neat rectangular and square flower beds bordered by little fences, sunny",
    10: "a busy toy factory with conveyor belts carrying colourful boxes in rows, cheerful robots, warm light",
    11: "a vast sunny landscape of rolling hills with a long winding road to a castle far away, adventure mood",
    12: "a lively harbour with colourful sailing boats loading and unloading cargo crates, bright blue sea, sunny",
    13: "a cozy room with a big friendly wall clock, a wall calendar, a piggy bank and colourful paper money and coins on a desk",
    14: "a busy bakery with trays of identical cupcakes arranged in perfect rows and boxes, warm golden light",
    15: "a cheerful school fair with a big colourful bar chart board, a spinner wheel and a glass jar of coloured marbles",
    16: "a triumphant mountain summit at sunrise with a small flag, golden light, sparkling clouds below, sense of achievement",
}
for n, desc in CHAPTERS.items():
    JOBS[f"chapter_{n}"] = dict(group="chapters", aspect="4:3", prompt=(
        f"A rich, beautiful illustration for a children's math lesson chapter card: {desc}. One single seamless "
        f"full-bleed scene filling the entire frame edge to edge, no borders, no black bars, no letterbox, no split "
        f"panels, no frames. No people. {STYLE} {CLEAN}"))

for pid, (desc, bg) in PETS.items():
    JOBS[f"pet_{pid}"] = dict(group="pets", aspect="1:1", prompt=pet(desc, bg), key="green" if bg == GREEN else "magenta")


def create(prompt, aspect, refs):
    inp = {"prompt": prompt, "aspect_ratio": aspect, "resolution": "1K", "output_format": "png"}
    if refs:
        inp["image_input"] = refs
    for i in range(4):
        try:
            j = requests.post(CREATE, headers=HEAD, json={"model": MODEL, "input": inp}, timeout=60).json()
            if j.get("code") != 200:
                raise RuntimeError(f"createTask: {j}")
            return j["data"]["taskId"]
        except requests.RequestException as e:
            print(f"  createTask lỗi mạng, thử lại: {e}")
            time.sleep(4 * (i + 1))
    raise RuntimeError("createTask: mất kết nối")


def wait(task, label):
    for i in range(150):
        time.sleep(5)
        try:
            d = requests.get(STATUS, headers=HEAD, params={"taskId": task}, timeout=60).json().get("data") or {}
        except requests.RequestException:
            continue
        state = (d.get("state") or "").lower()
        if state == "success":
            res = d.get("resultJson")
            res = json.loads(res) if isinstance(res, str) else res
            print(f"  [{label}] xong, credits={d.get('creditsConsumed')}")
            return res["resultUrls"][0]
        if state == "fail":
            raise RuntimeError(f"[{label}] fail: {d.get('failMsg')}")
    raise RuntimeError(f"[{label}] timeout")


def run(name):
    job = JOBS[name]
    refs = []
    if job.get("ref"):
        url_file = RAW / f"{job['ref']}.url"
        if not url_file.exists():
            raise RuntimeError(f"[{name}] cần tạo {job['ref']} trước (ảnh tham chiếu)")
        refs = [url_file.read_text().strip()]
    print(f"• {name}")
    url = wait(create(job["prompt"], job["aspect"], refs), name)
    RAW.mkdir(exist_ok=True)
    (RAW / f"{name}.png").write_bytes(requests.get(url, timeout=180).content)
    (RAW / f"{name}.url").write_text(url)
    meta = RAW / "meta.json"
    m = json.loads(meta.read_text()) if meta.exists() else {}
    m[name] = {"group": job["group"], "key": job.get("key", "green" if job["group"] == "teacher" else "magenta")}
    meta.write_text(json.dumps(m, indent=1))
    return name


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("names", nargs="*")
    ap.add_argument("--list", action="store_true")
    ap.add_argument("--group")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--skip-existing", action="store_true")
    ap.add_argument("--workers", type=int, default=4)
    a = ap.parse_args()
    if a.list:
        for n, j in JOBS.items():
            print(f"{j['group']:8} {n}{'  (tham chiếu: ' + j['ref'] + ')' if j.get('ref') else ''}")
        return
    names = a.names or [n for n, j in JOBS.items() if a.all or j["group"] == a.group]
    if a.skip_existing:
        names = [n for n in names if not (RAW / f"{n}.png").exists()]
    # Ảnh không cần tham chiếu chạy song song trước, ảnh cần tham chiếu chạy sau.
    first = [n for n in names if not JOBS[n].get("ref")]
    later = [n for n in names if JOBS[n].get("ref")]
    for batch in (first, [n for n in later if JOBS[JOBS[n]["ref"]].get("ref") is None], [n for n in later if JOBS[JOBS[n]["ref"]].get("ref")]):
        with cf.ThreadPoolExecutor(max_workers=a.workers) as ex:
            for f in cf.as_completed([ex.submit(run, n) for n in batch]):
                try:
                    f.result()
                except Exception as e:  # noqa: BLE001
                    print(f"LỖI: {e}")


if __name__ == "__main__":
    sys.exit(main())
