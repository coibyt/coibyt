#!/usr/bin/env python3
"""Chọn giọng nam bản xứ cho thầy Alexei ở từng ngôn ngữ (thư viện giọng của 11max) → content/i18n/voices.json
   python3 tools/pick_voices.py [mã ...]   (không ghi đè giọng đã chọn tay: "locked": true)"""
import json, pathlib, sys, requests
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "content/i18n/voices.json"
HEAD = {"xi-api-key": "proxy-injected"}
LANGS = "ru zh kk ar id fa mn tr my fr so uk mg th es tk sv uz ja de fi it en pl ko pt el nl da".split()
cur = json.loads(OUT.read_text()) if OUT.exists() else {}
cur.setdefault("vi", {"id": "CE5BJM57m1rtrAFVXfCq", "name": "VânCa", "locked": True})
NAMES = {"ru": "russian", "zh": "chinese mandarin", "kk": "kazakh", "ar": "arabic", "id": "indonesian", "fa": "persian", "mn": "mongolian", "tr": "turkish",
         "my": "burmese", "fr": "french", "so": "somali", "uk": "ukrainian", "mg": "malagasy", "th": "thai", "es": "spanish", "tk": "turkmen", "sv": "swedish",
         "uz": "uzbek", "ja": "japanese", "de": "german", "fi": "finnish", "it": "italian", "en": "british", "pl": "polish", "ko": "korean", "pt": "portuguese",
         "el": "greek", "nl": "dutch", "da": "danish"}
# giọng vùng theo quốc gia chủ dự án nêu
PREFER = {"en": ["british", "standard", "english"], "pt": ["european", "portugal", "lisbon", "standard"], "es": ["peninsular", "spain", "castilian", "madrid", "standard"],
          "ar": ["saudi", "gulf", "khaleeji", "standard", "modern standard"], "fr": ["parisian", "standard", "france"], "zh": ["standard", "beijing", "mandarin"],
          "de": ["standard", "german"], "ru": ["standard", "moscow"]}
for lang in sys.argv[1:] or LANGS:
    if cur.get(lang, {}).get("locked"):
        continue
    best = None
    for q in [f"language={lang}&gender=male&age=middle_aged", f"language={lang}&gender=male", f"search={NAMES[lang]}&gender=male", f"search={NAMES[lang].split()[0]}"]:
        r = requests.get(f"https://api.11max.id.vn/v1/shared-voices?{q}&page_size=100", headers=HEAD, timeout=60).json()
        vs = [v for v in r.get("voices", []) if v.get("language") == lang and (v.get("gender") or "male") == "male"]
        def score(v):
            uc = v.get("use_case") or ""
            s = (v.get("cloned_by_count") or 0)
            if uc in ("informative_educational", "narrative_story"): s *= 3
            if v.get("age") == "middle_aged": s *= 2
            acc = (v.get("accent") or "").lower()
            pref = PREFER.get(lang)
            if pref:
                s *= 50 if any(x in acc for x in pref[:-1]) else 8 if pref[-1] in acc else 1
            return s
        vs.sort(key=score, reverse=True)
        if vs:
            best = vs[0]; break
    cur[lang] = {"id": best["voice_id"], "name": best["name"], "accent": best.get("accent"), "age": best.get("age"),
                 "use": best.get("use_case"), "clones": best.get("cloned_by_count")} if best else {"id": None}
    print(lang, cur[lang].get("name"), cur[lang].get("accent"), cur[lang].get("age"), cur[lang].get("clones"), flush=True)
OUT.write_text(json.dumps(cur, ensure_ascii=False, indent=1) + "\n")
