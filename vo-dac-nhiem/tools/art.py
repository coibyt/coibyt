#!/usr/bin/env python3
"""Danh mục hình ảnh của Hổ Tuyết (Kie.ai Nano Banana Pro).

  python3 tools/art.py --list
  python3 tools/art.py coach_portrait kf_stance ...      # tạo theo tên (bỏ qua ảnh đã có, thêm --force để tạo lại)

Ảnh gốc ở .raw/ (không lên git); tools/finish.py nén về assets/img/*.webp.
Nhân vật và bối cảnh đều tự sáng tác: không phù hiệu, cờ, huy hiệu đơn vị thật, không người thật.
"""
import concurrent.futures as cf
import pathlib
import sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from kie import RAW, image  # noqa: E402

PHOTO = ("Photorealistic cinematic photograph, shot on a full-frame camera, natural skin texture and pores, realistic fabric and mud detail, "
         "soft diffused forest light with shafts of warm morning sun through mist, rich moody olive-green and amber colour grade, "
         "subtle film grain, premium war-documentary look, sharp focus on the people.")
CLEAN = ("No text, no letters, no numbers, no logos, no patches, no badges, no rank insignia, no flags, no emblems, no name tapes, "
         "no watermark, no weapons.")
NOT_REAL = "Original fictional people, not resembling any real person."

GEAR = ("a rugged olive-green and brown woodland camouflage combat uniform, a dark olive tactical plate-carrier vest with several pouches, "
        "a loose leafy olive-and-brown ghillie-style camouflage hood and scarf draped back over his head and shoulders so his face is always fully visible (never pulled over his face), "
        "fingerless tactical gloves, knee pads and muddy black combat boots, streaks of mud on his sleeves and trousers. "
        "All gear is generic and plain, completely unmarked")
COACH = ("an original fictional Russian special-forces style combat instructor named Alexei: a very handsome, clean-shaven man of about 42 "
         "(no beard, no moustache, no stubble), chiselled Slavic face, strong square jaw, intense light grey-blue eyes, short dark-brown military haircut, "
         "big, tall, powerful and heavily muscular build with broad shoulders and thick arms; he looks extremely cool, an elite battle-hardened veteran "
         f"who is also a calm, respected teacher. He wears {GEAR}")
IVAN = ("an original fictional young Russian male trainee named Ivan, about 23, tall fit athletic build, short light-brown hair, clean-shaven, "
        "friendly determined Slavic face, wearing a plain olive-drab training t-shirt, woodland camouflage trousers, black combat boots, light mud stains, no vest")
KATYA = ("an original fictional young Russian female trainee named Katya, about 24, fit athletic build, dark-blonde hair tied in a tight braid, "
         "determined friendly Slavic face, wearing a plain dark olive long-sleeve training top, woodland camouflage trousers, black combat boots, "
         "light mud stains, no vest")
GROUND = ("a harsh, realistic outdoor commando training ground deep in a dense misty pine-and-birch forest: wet dark mud, puddles and churned earth, "
          "moss, ferns and fallen logs, a rough log obstacle wall and a cargo-rope net in the far background, a wide worn olive canvas training mat "
          "laid flat on the muddy ground, drifting fog, dramatic shafts of soft morning light through the trees")

KEEP = ("Use the reference image(s): keep exactly the same man (same clean-shaven face, same haircut, same build), the same gear and the same "
        "photographic style and lighting. ")

JOBS = {
    "coach_portrait": ("3:4", f"{PHOTO} Waist-up heroic portrait of {COACH}. He stands facing the camera, chest out, calm confident half-smile, "
                              f"mouth closed, arms relaxed at his sides, centered, head clearly visible with margin above. "
                              f"Background: {GROUND}, softly out of focus. {NOT_REAL} {CLEAN}", []),
    "kf_stance": ("1:1", f"{PHOTO} {KEEP}Full-body wide shot, camera at chest height, of {COACH}. He stands on the canvas mat in the middle of {GROUND}, "
                         f"in a relaxed natural ready position facing the camera: feet shoulder-width apart, knees soft, open hands relaxed in front of his chest, "
                         f"calm focused expression. His whole body from head to boots is visible with margin around him. {NOT_REAL} {CLEAN}", ["coach_portrait"]),
    "ivan_portrait": ("3:4", f"{PHOTO} Waist-up portrait of {IVAN}. He stands facing the camera, friendly confident smile, arms relaxed. "
                             f"Background: {GROUND}, softly out of focus. {NOT_REAL} {CLEAN}", []),
    "katya_portrait": ("3:4", f"{PHOTO} Waist-up portrait of {KATYA}. She stands facing the camera, confident determined smile, arms relaxed. "
                             f"Background: {GROUND}, softly out of focus. {NOT_REAL} {CLEAN}", []),
    # ---- nền, bìa nhánh (không người hoặc dùng thầy làm tham chiếu) ----
    "bg_tall": ("9:16", f"{PHOTO} Empty scene, no people: {GROUND}. Moody, atmospheric, dark lower half with deep shadows, "
                        f"light shafts at the top, lots of calm dark space for interface elements. {CLEAN}", []),
    "bg_wide": ("16:9", f"{PHOTO} Empty scene, no people: {GROUND}. Moody, atmospheric, darker on the left and right edges, "
                        f"light shafts in the centre, calm space for interface elements. {CLEAN}", []),
    "cover_the-luc": ("4:3", f"{PHOTO} {KEEP}{COACH}. Dynamic action shot: he climbs over a tall rough log obstacle wall on a muddy forest assault course, "
                             f"one hand on the top log, mud splashes, determined face clearly visible. {NOT_REAL} {CLEAN}", ["coach_portrait"]),
    "cover_da-ngoai": ("4:3", f"{PHOTO} {KEEP}{COACH}. He kneels low among ferns at the edge of the forest, the leafy ghillie hood pulled up over his head, "
                              f"thin streaks of olive and dark camouflage face paint on his cheeks, blending into the vegetation, observing calmly, "
                              f"a map and a compass in his hand. {NOT_REAL} {CLEAN}", ["coach_portrait"]),
    "cover_ban-sung": ("4:3", f"{PHOTO} A safe sport-shooting training table at an outdoor forest range: a matte black replica training rifle lying on a wooden bench "
                              f"with its action open and an empty chamber flag inserted, clear protective shooting glasses, ear defenders, and a paper bullseye target "
                              f"pinned to a wooden board in the soft-focus background. No people, no ammunition. Calm, orderly, safety-first atmosphere. "
                              f"No text, no logos, no flags, no emblems.", []),
}


def run(name, force=False):
    aspect, prompt, refs = JOBS[name]
    out = RAW / f"{name}.png"
    if out.exists() and not force:
        return out
    urls = [(RAW / f"{r}.url").read_text().strip() for r in refs]
    return image(name, aspect, prompt, urls)


if __name__ == "__main__":
    args = sys.argv[1:]
    if args == ["--list"]:
        print("\n".join(JOBS))
        sys.exit()
    force = "--force" in args
    names = [a for a in args if not a.startswith("--")]
    with cf.ThreadPoolExecutor(4) as ex:
        for n, f in zip(names, ex.map(lambda n: run(n, force), names)):
            print(n, f)
