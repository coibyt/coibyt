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
    "teacher_point": dict(group="teacher", aspect="3:4", ref="teacher_idle",
                          prompt=KEEP + "Change only her pose: she raises her right hand to shoulder height and points her index finger to the side (towards the viewer's left) as if pointing at a chalkboard while explaining, friendly confident expression, mouth closed with a soft smile. The raised hand must stay inside the frame."),
    "teacher_point_talk": dict(group="teacher", aspect="3:4", ref="teacher_point",
                               prompt=KEEP.replace("same position", "same pointing pose, same position") + "Only change: her mouth is open in a friendly speaking shape as if explaining."),
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
    "ab_nhanchia": "A cute glossy 3D round pie chart cut into four equal slices with one slice lifted out, made of shiny purple and pink glass, a fraction symbol",
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

# ---- Lớp học của cô: bí quyết, mẹo ----
JOBS["tip_secret"] = dict(group="ui", aspect="1:1", prompt=obj("An ornate golden key with a glowing heart-shaped bow and tiny sparkles, a secret treasure key"))
JOBS["tip_magic"] = dict(group="ui", aspect="1:1", prompt=obj("A cute magic wand with a glowing star tip and a trail of colourful sparkles"))
JOBS["tip_bulb"] = dict(group="ui", aspect="1:1", prompt=obj("A cute glowing light bulb with a happy warm golden glow and small rays, an idea symbol"))
JOBS["bg_class"] = dict(group="bg", aspect="9:16", prompt=(
    "A cozy bright primary-school classroom background for a children's math lesson: a large empty dark-green "
    "chalkboard with a light oak frame on the wall at the top, warm morning sunlight from a window on the side, "
    "a few potted plants and colourful paper garlands, soft pastel cream walls, calm and low contrast in the "
    "lower half for content, no people, no text on the board. " + STYLE + " " + CLEAN))

# ---- Học nâng cao (học sinh giỏi) ----
JOBS["adv_crown"] = dict(group="ui", aspect="1:1", prompt=obj("A majestic small golden crown studded with purple and blue gems, glowing softly, royal and premium"))
JOBS["adv_brain"] = dict(group="ui", aspect="1:1", prompt=obj("A cute glowing purple crystal brain with tiny golden gears and sparkles, a genius symbol"))
JOBS["adv_daily"] = dict(group="ui", aspect="1:1", prompt=obj("A glowing golden challenge medallion with a lightning bolt and a small star, daily challenge emblem"))
JOBS["adv_lock"] = dict(group="ui", aspect="1:1", prompt=obj("An ornate purple and gold padlock with a small keyhole shaped like a star"))
JOBS["bg_advanced"] = dict(group="bg", aspect="9:16", prompt=(
    "A luxurious magical background for an advanced math challenge area for gifted children: a grand twilight "
    "library hall in deep royal purple and midnight blue with golden trims, floating glowing golden stars and "
    "soft constellations, elegant and calm, low contrast with lots of empty space in the middle, no characters, "
    "no text. " + STYLE + " " + CLEAN))

# ---- Trò chơi ôn tập "Bóng bay Toán học" ----
for _name, _colour, _bg in [
    ("balloon_red", "glossy cherry-red", GREEN),
    ("balloon_blue", "glossy sky-blue", GREEN),
    ("balloon_yellow", "glossy sunny-yellow", GREEN),
    ("balloon_green", "glossy mint-green", MAGENTA),
]:
    JOBS[_name] = dict(group="ui", aspect="3:4", key="green" if _bg == GREEN else "magenta", prompt=(
        f"A single cute {_colour} party balloon with a soft highlight reflection, a small knot and a short curly "
        f"white string, round and plump, front view, centered with generous empty margin, premium 3D game asset. "
        f"{STYLE} {_bg} {CLEAN}"))
JOBS["game_trophy"] = dict(group="ui", aspect="1:1", prompt=obj("A shiny golden trophy with confetti and three small stars above it, celebration"))
JOBS["bg_game"] = dict(group="bg", aspect="9:16", prompt=(
    "A bright joyful background for a children's balloon-popping math game: a sunny blue sky with fluffy white "
    "clouds, a gentle rainbow, a cheerful amusement park with colourful tents and a small ferris wheel far at the "
    "bottom, soft and low contrast in the middle for gameplay, no characters, no balloons, no text. " + STYLE + " " + CLEAN))

# ---- Đấu trường Ngôi sao Toán học (gameshow kiểm tra năng lực) ----
HOST = (
    "An original 3D character for a children's math quiz show: a charming, energetic young Vietnamese female TV "
    "show host in her mid twenties, bright friendly smile, sparkling dark eyes, shoulder-length glossy black hair "
    "with soft waves, wearing an elegant modest royal-blue sequined long-sleeve gown with a small golden star "
    "brooch, holding a small golden question card in her left hand. Waist-up portrait facing the viewer, centered, "
    "the character fills about 85% of the frame height with empty margin around her. Modest and age-appropriate. "
    "Not resembling any real person or existing character. " + STYLE + " " + GREEN + " " + CLEAN
)
HOST_KEEP = KEEP.replace("the same woman, same face, same hairstyle, same ao dai and embroidery", "the same woman, same face, same hairstyle, same royal-blue gown and brooch")
JOBS["host_idle"] = dict(group="host", aspect="3:4", prompt=HOST)
JOBS["host_talk"] = dict(group="host", aspect="3:4", ref="host_idle", prompt=HOST_KEEP + "Only change: her mouth is open in a lively speaking shape, eyes bright.")
JOBS["host_present"] = dict(group="host", aspect="3:4", ref="host_idle", prompt=HOST_KEEP + "Change only her pose: she extends her right arm with an open palm to the side as if presenting the next question, excited smile, mouth slightly open. The hand must stay inside the frame.")
JOBS["host_blink"] = dict(group="host", aspect="3:4", ref="host_idle", prompt=HOST_KEEP + "Only change: her eyes are gently closed in a natural blink, same soft smile, mouth closed.")
JOBS["host_present_talk"] = dict(group="host", aspect="3:4", ref="host_present", prompt=HOST_KEEP.replace("same position", "same presenting pose, same position") + "Only change: her mouth is open in a lively speaking shape.")
JOBS["host_point"] = dict(group="host", aspect="3:4", ref="host_idle", prompt=HOST_KEEP + "Change only her pose: she points her right index finger down and forward towards the bottom of the frame as if pointing at the answer options below her, curious encouraging expression, mouth closed with a smile. The hand must stay inside the frame.")
JOBS["host_point_talk"] = dict(group="host", aspect="3:4", ref="host_point", prompt=HOST_KEEP.replace("same position", "same pointing pose, same position") + "Only change: her mouth is open in a lively speaking shape.")
JOBS["host_think"] = dict(group="host", aspect="3:4", ref="host_idle", prompt=HOST_KEEP + "Change only her pose and expression: she touches her chin with her right index finger, eyebrows slightly raised in playful suspense, looking at the viewer as if waiting for an answer, mouth closed with a small smile.")
JOBS["host_cheer"] = dict(group="host", aspect="3:4", ref="host_idle", prompt=HOST_KEEP + "Change only her pose and expression: she claps her hands together joyfully in front of her chest, very happy wide smile, eyes squinting with joy, a few small golden sparkles around her hands, mouth closed in a big smile.")
JOBS["host_cheer_talk"] = dict(group="host", aspect="3:4", ref="host_cheer", prompt=HOST_KEEP.replace("same position", "same clapping pose, same position") + "Only change: her mouth is open wide in a cheerful 'Yay!' shape.")
JOBS["bg_show"] = dict(group="bg", aspect="9:16", prompt=(
    "An original glamorous TV quiz show studio stage for children, seen from the audience: deep royal blue and "
    "violet lighting, a circular glowing stage floor in the centre, sweeping spotlights, sparkling light bokeh, "
    "shiny reflective floor, elegant and dramatic yet friendly, no people, no text, no logos, no screens with "
    "writing, plenty of dark calm space in the middle. " + STYLE + " " + CLEAN))

# ---- Tranh minh hoạ từng bài (bài ôn tập / luyện tập chung dùng ảnh bìa chủ đề) ----
LESSON_SCENES = [
    (["số chẵn"], "pairs of colourful socks hung neatly two by two on a washing line, and one odd sock alone at the end, sunny garden"),
    (["biểu thức chứa chữ"], "magical glowing wooden letter tiles and number tiles swapping places above an open notebook on a desk"),
    (["ba bước"], "a treasure map with a dotted path of three stepping stones leading to a small treasure chest, compass and magnifying glass"),
    (["đo góc"], "a transparent semicircular protractor measuring the opening between the two hands of a big friendly clock, on a desk"),
    (["góc nhọn"], "an opening folding fan, a pair of open scissors and a slice of watermelon showing sharp and wide corners, playful arrangement"),
    (["sáu chữ số", "lớp triệu", "hàng và lớp"], "a grand stadium full of tiny colourful seats seen from above, thousands of seats in neat sections, sunny day"),
    (["làm tròn"], "a ball rolling down a gentle grassy hill towards the nearest of two little flags"),
    (["so sánh các số"], "a cute balance scale on a meadow with two different piles of colourful blocks, one side lower"),
    (["dãy số tự nhiên"], "a long path of stepping stones stretching far into the distance towards the horizon, a little backpack at the start"),
    (["yến, tạ"], "a big farm truck loaded with sacks of rice and a giant weighing scale at a Vietnamese rice warehouse"),
    (["mét vuông"], "a sunny room floor being covered with large square tiles, a measuring tape and a small square tile beside a big one"),
    (["giây, thế kỉ"], "an hourglass, a stopwatch and an old stone temple gate under a tree, contrasting short and very long time"),
    (["thực hành và trải nghiệm sử dụng"], "a lively market with a big platform scale weighing a watermelon pile, a floor plan on a clipboard and a stopwatch"),
    (["kết hợp của phép cộng"], "colourful marbles being grouped into round bowls of nice round amounts, playful and tidy"),
    (["tổng và hiệu"], "two ribbons of different lengths laid side by side on a craft table with scissors, a measuring tape and a notebook"),
    (["vuông góc"], "a city crossroads seen from above where two straight streets cross at a perfect corner, tiny cars and trees"),
    (["song song"], "two straight railway tracks running side by side through green rice fields to the horizon, sunny"),
    (["bình hành"], "a colourful kite in a rhombus shape and a slanted parallelogram-shaped garden bench in a park"),
    (["nhân với số có một", "nhân với số có hai"], "rows of identical boxes of crayons stacked neatly on a classroom shelf"),
    (["chia cho số có"], "a pile of colourful marbles being shared equally into identical cups"),
    (["kết hợp của phép nhân", "phân phối"], "neat stacks of egg trays arranged in a big grid in a farm shop, warm light"),
    (["nhân, chia với 10"], "bundles of ten pencils, packs of a hundred sticky notes and boxes of a thousand paper clips on a shelf"),
    (["ước lượng"], "a child's shopping basket at a market stall with a price-free calculator and fruit, estimating"),
    (["trung bình cộng"], "three glasses of juice with different levels being poured to the same level, on a kitchen counter"),
    (["rút về đơn vị"], "identical packs of cookies on a bakery shelf, one pack opened to show its cookies"),
    (["dãy số liệu"], "children's height chart on a classroom wall with colourful marks and a measuring tape, no readable text"),
    (["biểu đồ cột"], "a colourful bar chart made of stacked toy blocks of different heights on a table"),
    (["số lần xuất hiện"], "a coin being tossed in the air above a table with a dice and a spinner, playful"),
    (["khái niệm phân số", "phân số và phép chia"], "a round pizza cut into eight equal slices with a few slices taken, on a wooden table"),
    (["tính chất cơ bản", "rút gọn", "quy đồng"], "two equal chocolate bars, one broken into halves and one into quarters, side by side"),
    (["so sánh phân số"], "two identical cakes cut into different equal slices on a balance scale, cozy kitchen"),
    (["cộng phân số", "trừ phân số"], "colourful juice being poured from two partly filled measuring cups into one jug"),
    (["nhân phân số", "chia phân số"], "a long ribbon being cut into equal pieces and a cake shared into equal portions, craft table"),
    (["phân số của một số"], "a basket of oranges with some oranges set apart into a smaller bowl, market stall"),
]
def _lesson_scene(title):
    t = title.lower()
    for keys, scene in LESSON_SCENES:
        if any(k in t for k in keys):
            return scene
    return None
_catalog = json.loads((ROOT / "assets" / "content" / "catalog.json").read_text())
for _c in _catalog["books"][0]["chapters"]:
    for _l in _c["lessons"]:
        if "ôn tập" in _l["title"].lower() or "luyện tập chung" in _l["title"].lower():
            continue
        _scene = _lesson_scene(_l["title"])
        if _scene:
            JOBS["illus_" + _l["id"]] = dict(group="illus", aspect="4:3", prompt=(
                f"A bright, charming picture-book illustration for a children's math lesson: {_scene}. "
                f"One seamless full-bleed scene filling the entire frame, no borders, no people's faces close-up, "
                f"no text, no letters, no numbers. {STYLE} {CLEAN}"))

# ---- Que chỉ của cô + tranh ví dụ trong cuộc sống (assets/content/examples.json) ----
JOBS["pointer"] = dict(group="ui", aspect="1:1", prompt=obj(
    "A teacher's elegant golden pointer stick lying diagonally, its tip with a small glowing yellow star at the "
    "TOP-LEFT corner and its rounded wooden handle with a coral ribbon at the BOTTOM-RIGHT corner, slim and long"))
JOBS["bg_exam_room"] = dict(group="bg", aspect="9:16", prompt=(
    "A bright, beautiful, calm Vietnamese primary school exam classroom seen from the front: neat rows of light wooden "
    "desks each with a blank exam sheet, a pencil and an eraser, a big blank green chalkboard on the wall, a round "
    "wall clock, tall windows with soft morning sunlight and green trees outside, a vase of yellow flowers on the "
    "teacher's desk, potted plants, warm cream walls, peaceful focused atmosphere, no people. " + STYLE + " " + CLEAN))
JOBS["og_banner_bg"] = dict(group="store", aspect="16:9", prompt=(
    "A luxurious, magical banner background for a children's Grade 4 math learning app: a deep royal purple and violet "
    "night-sky classroom with a soft glowing golden honeycomb pattern, floating glossy 3D math objects made of candy-like "
    "glass: a pie chart cut into slices, a golden protractor, colourful number blocks, a star-shaped badge, sparkling gold "
    "particles and soft bokeh lights, a warm radial glow on the RIGHT side where characters will stand, the LEFT half "
    "calmer and darker with plenty of empty space for a big title, elegant, premium, festive. No people, no characters. "
    + STYLE + " No text, no letters, no numbers, no watermark."))
JOBS["chalk_pen"] = dict(group="ui", aspect="1:1", prompt=obj(
    "A teacher's elegant chalk pen: a slim golden metal chalk holder with a small coral ribbon, holding a white chalk "
    "stick, lying diagonally with the white chalk TIP at the BOTTOM-LEFT corner and the golden end at the TOP-RIGHT corner"))
JOBS["eraser"] = dict(group="ui", aspect="3:2", prompt=obj(
    "A classic blackboard eraser seen from the side: a warm polished wooden handle block on top and a thick soft grey "
    "felt pad underneath dusted with white chalk powder, a few chalk dust puffs"))
_ex_file = ROOT / "assets" / "content" / "examples.json"
if _ex_file.exists():
    for _id, _list in json.loads(_ex_file.read_text()).items():
        for _n, _x in enumerate(_list):
            JOBS[f"example_{_id}-{_n + 1}"] = dict(group="examples", aspect="4:3", prompt=(
                "A bright, warm, realistic and detailed illustration of an everyday scene in Vietnam, used as a "
                f"real-life example in a children's math lesson: {_x['prompt']} "
                "Clear composition with the important objects large, well lit and clearly separated, easy to count, "
                "full-bleed scene filling the whole frame, no close-up faces. "
                f"{STYLE} {CLEAN}"))

# ---- Logo & màn mở đầu ----
JOBS["logo_emblem"] = dict(group="ui", aspect="1:1", prompt=obj(
    "A premium 3D game logo emblem for a children's math app: a cute chubby golden honey bee mascot with big "
    "sparkling eyes and a happy smile, wearing a small navy graduation cap with a golden tassel and holding a "
    "golden pencil, flying in front of a glossy golden honeycomb hexagon shield with a rich gold rim, tiny stars "
    "and sparkles around, luxurious, iconic, symmetrical composition"))
JOBS["icon_app"] = dict(group="bg", aspect="1:1", prompt=(
    "A premium mobile app icon: a cute chubby golden honey bee mascot wearing a small navy graduation cap with a "
    "golden tassel, holding a golden pencil, centered on a glossy warm honey-gold to orange gradient background "
    "with a subtle honeycomb pattern and soft glow, rounded friendly look, no text. " + STYLE + " " + CLEAN))
JOBS["bg_splash"] = dict(group="bg", aspect="9:16", prompt=(
    "A magical luxurious opening background for a children's math game: a glowing golden honeycomb sky at sunrise, "
    "floating soft golden light particles, gentle bokeh, warm honey, peach and royal purple tones, a soft radial "
    "glow in the centre for a logo, very elegant and dreamy, no characters, no text. " + STYLE + " " + CLEAN))

# ---- Đồ vật minh hoạ (đếm, nhân, chia) ----
for _n, _d in {
    "obj_apple": "A single shiny red apple with a small green leaf, front view",
    "obj_orange": "A single juicy round orange fruit with a small green leaf",
    "obj_candy": "A single colourful wrapped candy sweet with twisted wrapper ends, pink and yellow stripes",
    "obj_pencil": "A single yellow wooden pencil with a pink eraser, standing upright, slightly tilted",
    "obj_cupcake": "A single cute cupcake with pink frosting and a cherry on top",
    "obj_flower": "A single cute pink daisy flower with a short green stem and one leaf",
    "ctr_plate": "An empty round white ceramic plate with a thin blue rim, seen from a low three-quarter angle, wide and flat",
    "ctr_basket": "An empty woven wicker basket with a handle, seen from the front",
    "ctr_box": "An empty open cardboard gift box in pastel blue, seen from the front, low and wide",
    "ctr_vase": "An empty small glass jar vase with a ribbon, seen from the front",
}.items():
    JOBS[_n] = dict(group="ui", aspect="1:1", prompt=obj(_d))

# ---- ảnh bìa 13 chủ đề (4:3, tranh đầy đủ, không xoá nền) ----
CHAPTERS = {
    1: "a cheerful review adventure: a winding path of stepping stones through a sunny meadow, a backpack, pencils and magical floating letter tiles",
    2: "a magical workshop of angles: a giant transparent protractor, an open folding fan, a set square and clock hands glowing softly",
    3: "a grand night city seen from above with thousands of tiny lights arranged in neat districts, a huge starry sky",
    4: "a busy harbour scale and warehouse with sacks of rice on a giant weighing scale, tiled floors and a big stopwatch",
    5: "a lively fruit market where two huge baskets of apples are poured together, colourful and sunny",
    6: "a bird's-eye view of a town with straight parallel railway tracks and streets crossing at right angles, kites in the sky",
    7: "a festive end-of-term celebration in a decorated classroom with garlands, a golden trophy and confetti, cheerful",
    8: "a busy toy factory with conveyor belts carrying colourful boxes in perfect rows and grids, cheerful robots, warm light",
    9: "a cheerful school fair with a big colourful bar chart board made of blocks, a spinner wheel and a jar of coloured marbles",
    10: "a cozy bakery table with a round pizza and a cake cut into equal slices, chocolate bars broken into equal pieces",
    11: "a sunny kitchen with colourful juice being poured from measuring cups into a big jug, fruit around",
    12: "a craft room where a long ribbon is cut into equal pieces and paper strips are folded into equal parts",
    13: "a triumphant mountain summit at sunrise with a small flag, golden light, sparkling clouds below, sense of achievement",
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
