import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-body/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-give-a-relaxing-body-massage",
  lesson: "spa-massage-body",
  category: "spa",
  title: "How to give a relaxing body massage: 13 steps for the back, shoulders, legs and arms",
  metaTitle: "How to give a body massage: 13 steps, back to legs",
  metaDescription:
    "How to give a relaxing body massage in a spa: consultation, draping, back strokes, shoulder kneading, shoulder blades, legs, turning over, arms and clean-up.",
  keyword: "how to give a body massage",
  keywords: [
    "body massage steps",
    "how to give a back massage",
    "massage draping technique",
    "massage legs towards the heart",
    "relaxing massage sequence",
    "body massage for beginners",
  ],
  excerpt: "A basic relaxing massage for the back, shoulders, legs and arms, step by step: how to drape each area, the stroke direction, the places never to press and six mistakes clients remember.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("massage-body-thu-gian-vuot-lung-cho-khach"),
    alt: "A therapist leans forward, both hands gliding over the back of a female client lying face down under a white towel, beside an arched window looking out on cypress trees",
  },
  takeaways: [
    "Three things hold for the whole session: **ask before you work**, uncover only the area being worked, and keep the pressure comfortable, never painful.",
    "Pump the oil into your palms and warm it; never pour it straight onto the client's back. From the first touch, always keep one hand on the client.",
    "Stroke the back from the lower back upwards **either side of the spine**, about three to five times, building the pressure. Never press on the spine itself.",
    "Legs and arms: stroke towards the heart, uncovering one leg or one arm at a time. Avoid the back of the knee, visible veins and the armpit.",
    "On a tight muscle, slow down and stay a little longer; never press harder than the client finds comfortable.",
  ],
  intro: [
    "How to give a body massage in a spa comes down to a handful of steps: back strokes, shoulder kneading, circles around the shoulder blades, the legs and the arms. What makes a client remember a massage lies in the details around those movements: whether your hands were warm, whether the towel was tucked in firmly, and whether you asked about the pressure.",
    "This article follows the VaraaAi Academy lesson “Body massage basics: step by step” in the Spa & skin care course, a relaxing massage focused on the back, shoulders and legs. By the end you can give the whole session in thirteen steps, drape each area and know the places that must never be pressed. The exact time and sequence follow your salon's treatment.",
  ],
  sections: [
    {
      id: "three-rules",
      title: "Three rules for every body massage",
      blocks: [
        {
          ol: [
            "**Ask before you work.** Health, medicines, allergies, areas the client does not want massaged, then the pressure while you work.",
            "**Uncover only the area being worked.** The rest of the body always stays under the towel.",
            "**Comfortable pressure, never pain.**",
          ],
        },
        { p: "The room is part of the massage too. It needs to be warm and quiet, because cold muscles find it hard to let go. The bed, face cradle and towels are ready before the client comes in." },
        { img: { src: img("phong-massage-chuan-bi-giuong-khan-va-dau"), alt: "A massage room with cream stone walls and a bed made up in white with a face cradle, beside it a small table with stacked white towels and a glass pump bottle of oil", caption: "Clean sheets, a fresh face-cradle cover, a large towel, a bolster and oil in a pump bottle." } },
        { p: "This article is the hands-on part. The reasons behind each rule, the cases where you say no and the warning signs of a blood clot in the leg are explained in [What is Swedish massage and when not to massage](lesson:spa-massage-body-hieu-dung). Read it before your first client." },
      ],
    },
    {
      id: "draping-by-area",
      title: "Massage draping technique for each area",
      blocks: [
        { p: "The drape changes with the area you are working on, while the principle stays the same: uncover just enough, tuck in firmly, cover again when you finish before uncovering anything else." },
        {
          table: {
            head: ["Area", "How to uncover"],
            rows: [
              ["Back", "Fold the towel down to the waist, uncover only the back, tuck in firmly on both sides"],
              ["Backs of the legs", "One leg only, from the ankle to just above the knee. The other leg stays covered"],
              ["Turning over", "Lift the towel just enough, hold one side against the bed, the client turns beneath it"],
              ["Fronts of the legs", "As for the backs: one leg at a time"],
              ["Arms", "Uncover one arm and rest it on top of the towel. Cover it again before the other"],
            ],
          },
        },
        { img: { src: img("chi-mo-khan-mot-chan-khi-massage"), alt: "A client lies face down fully covered by a white towel except one leg, uncovered from the ankle to just above the knee, the therapist's hands resting on that calf", caption: "Only one leg is uncovered; the other leg and the body stay under the towel." } },
      ],
    },
    {
      id: "where-not-to-press",
      title: "Where never to press, and where to go gently",
      blocks: [
        {
          table: {
            head: ["Area", "How to work"],
            rows: [
              ["The spine", "Never press on it. Work only either side of it"],
              ["Lower back over the kidneys", "Light strokes only, no pounding or hard tapping"],
              ["Back of the neck", "Always lighter than on the back. No pressure on the front of the neck, no twisting, no cracking"],
              ["Back of the knee", "Avoid"],
              ["Visible veins on the legs", "Do not press on them"],
              ["The shinbone", "Do not press on it"],
              ["Inner thigh, armpit", "Avoid"],
            ],
          },
        },
        { note: "If one calf is swollen, red and warm, do not massage and advise the client to see a doctor straight away. Twisting or cracking the client's neck has no place in relaxation massage. Rules and job titles for massage differ from country to country; this article is a training aid, not a licence.", kind: "warn", title: "The limits of relaxation massage" },
      ],
    },
    {
      id: "common-mistakes",
      title: "Six mistakes clients remember for a long time",
      blocks: [
        {
          table: {
            head: ["Mistake", "Do this instead"],
            rows: [
              ["Pouring cold oil straight onto the back", "Pump the oil into your palms and warm it before you touch"],
              ["Lifting both hands and putting them back abruptly", "Always keep one hand on the client when changing movements"],
              ["Uncovering more than the area being worked", "Uncover just enough and tuck the edges in firmly"],
              ["Pressing on the spine", "Work only either side of it"],
              ["Chatting non-stop when the client wants to rest", "Ask what you need to ask, then let her be"],
              ["Forgetting to ask about pressure", "Ask after the first back strokes and again during shoulder kneading"],
            ],
          },
        },
        { p: "Avoid these six and the client already sees you as a real professional." },
      ],
    },
    {
      id: "after-the-massage",
      title: "After the massage: advice and notes for next time",
      blocks: [
        { p: "Aftercare advice is short and honest: there may be mild soreness the next day, especially after firm pressure. Real pain or bruising is something the client should report back to the salon." },
        { p: "Before you tidy the room, note three things: the pressure the client likes, areas to avoid and the oil you used. In VaraaAi they go in the client's internal notes in your [client list](lesson:khach-hang). The next visit can be booked while the client is still at the desk, straight into the salon's [appointment calendar](lesson:lich-hen)." },
      ],
    },
  ],
  howTo: {
    title: "Body massage steps, in order",
    id: "body-massage-steps",
    after: "three-rules",
    lead: "The thirteen steps follow the order of the lesson video: the client lies face down first for the back, shoulders and legs, then turns over for the arms and shoulders.",
    supplies: [
      "A height-adjustable massage bed with a face cradle",
      "Clean sheets, a fresh face-cradle cover, a large towel and a bolster",
      "Massage oil in a pump bottle",
      "The consultation form",
      "Drinking water for the client afterwards",
      "A lidded laundry hamper and surface disinfectant",
    ],
    steps: [
      {
        name: "Prepare the room",
        text: "Make the room warm and quiet. Wipe and disinfect the bed and face cradle, lay clean sheets and a fresh face-cradle cover, and have a large towel and a bolster ready. Set the bed height to suit you so you can work without bending over.",
        image: { src: img("lau-khu-khuan-giuong-massage"), alt: "A therapist in black gloves wipes the massage bed with paper towel and a spray bottle while a colleague behind her pulls out a fresh roll of couch paper" },
      },
      {
        name: "Consult before you start",
        text: "Ask about health, medicines, oil and nut allergies, recent injuries or surgery, and areas the client does not want massaged. Varicose veins are never pressed; if one calf is swollen, red and warm, do not massage and advise her to see a doctor straight away. Then explain how she will be covered, what the pressure will be like, and that she can ask you to stop at any time.",
      },
      {
        name: "Let the client undress alone",
        text: "Step out of the room. Ask the client to lie face down with her face in the cradle and a large towel up to her shoulders; she may keep her underwear on. Knock and wait for an answer before you come back in. Wash your hands with soap, dry them and rub them warm.",
      },
      {
        name: "Drape, uncovering only the back",
        text: "Fold the towel down to the waist and tuck it in firmly on both sides. If she likes, place a small bolster under her ankles for comfort. Ask whether she is warm enough, because muscles struggle to relax when the body is cold.",
      },
      {
        name: "Take the oil and make the first touch",
        text: "Pump a little oil into your palms and warm it; never pour it straight onto the client's back. Rest both hands very lightly on her back and hold still for a moment. From now on, whenever you change movements, keep one hand on her.",
        image: { src: img("dat-hai-tay-len-lung-khach-truoc-khi-vuot"), alt: "A therapist rests both hands lightly on the middle of the back of a female client lying face down in the face cradle, a white towel covering her from the waist", caption: "The first touch: both hands rest lightly and stay still for a moment." },
      },
      {
        name: "Stroke the back",
        text: "Both palms travel from the lower back upwards either side of the spine to the shoulders, round to the sides and lightly back down. Work slowly, about three to five times, building the pressure so the muscles warm up before you go deeper. Stand with one foot forward and one back, use your body weight and keep your back straight. Then ask whether the pressure is right.",
      },
      {
        name: "Knead the shoulders and stroke the back of the neck",
        text: "The muscle on top of the shoulders, between the neck and shoulder, is usually the tightest. Lift it gently between your thumb and fingers and knead slowly and evenly, without squeezing hard or pinching, and ask about the pressure again. On the back of the neck, stroke lightly with the fingertips from the hairline down to the shoulders, either side of the neck's spine, lighter than on the back. No pressure on the front of the neck, and never twist or crack the client's neck.",
        image: { src: img("nhao-co-vai-khi-massage-body"), alt: "A therapist's hands gently grasp the muscle between the neck and shoulder of a female client lying face down, her back bare and a towel covering her from the waist", caption: "Kneading the top of the shoulders: lift gently and slowly, no squeezing or pinching." },
      },
      {
        name: "Thumb circles around the shoulder blades and beside the spine",
        text: "Make small thumb circles around the shoulder blades and along both sides of the spine, never on the spine itself. Over the kidney area of the lower back, use only light strokes. On a tight spot, slow down and stay a little longer, without pressing harder than the client finds comfortable. Finish with light tapping if she likes it and a few long strokes, then cover the back again.",
        image: { src: img("xoa-vong-quanh-xuong-ba-vai"), alt: "Seen from above, a therapist's two hands rest around the shoulder blades on the back of a client lying face down, either side of the spine" },
      },
      {
        name: "Massage the backs of the legs",
        text: "Uncover one leg only, from the ankle to just above the knee, with the towel tucked in firmly. Stroke from the ankle up towards the knee, which means towards the heart, then knead the calf gently, both hands taking turns to lift the muscle and let it go. Avoid the back of the knee and do not press on visible veins. Cover the leg again before you uncover the other.",
        image: { src: img("vuot-bap-chan-tu-co-chan-len-goi"), alt: "Close-up of a therapist's two hands around the calf of a client lying face down, stroking from the ankle towards the knee, a white towel wrapped firmly above the knee", caption: "Stroke from the ankle to the knee, towards the heart." },
      },
      {
        name: "Help the client turn over",
        text: "Lift the towel just enough, holding one side firmly against the bed, and keep your eyes towards the client's face. Ask her to turn onto her back beneath the towel so she stays covered the whole time. Place a bolster under her knees if she likes. If the treatment includes the fronts of the legs, work as on the backs: one leg at a time, ankle to knee, no pressure on the shinbone, and avoid the inner thigh.",
      },
      {
        name: "Massage the arms and shoulders",
        text: "Uncover one of the client's arms and rest it on top of the towel. One of your hands holds her wrist lightly while the other strokes from the wrist up to the elbow, towards the heart, avoiding the armpit. Cover it again and do the other arm. Then move to the head of the bed, place both hands on her shoulders and press gently down for a few breaths.",
        image: { src: img("vuot-canh-tay-tu-co-tay-len-khuyu"), alt: "A client lies on her back covered by a white towel up to the collarbones, one arm out on top, the therapist supporting her wrist and stroking along her forearm" },
      },
      {
        name: "Finish the massage",
        text: "Leave your hands still on her shoulders for a moment, then tell her gently that you have finished. Step out so she can sit up slowly and dress. Offer a glass of water, ask how she feels, and mention that mild soreness the next day is possible, while real pain or bruising should be reported to the salon. Note the pressure she likes, areas to avoid and the oil you used.",
      },
      {
        name: "Tidy up",
        text: "Put the sheets, towels and face-cradle cover into a lidded laundry hamper. Wipe and disinfect the bed and face cradle, wipe the oil bottle, then [wash your hands](lesson:rua-tay-gang-tay).",
      },
    ],
  },
  faq: [
    {
      q: "What are the steps of a relaxing body massage?",
      a: "Prepare the room and bed, consult the client, let her undress and lie face down, drape so only the back is uncovered, take the oil, stroke the back, knead the shoulders and stroke the neck, make thumb circles around the shoulder blades, massage the backs of the legs, help her turn over, massage the arms and shoulders, then finish and tidy up. Exact time and sequence follow each salon's treatment.",
    },
    {
      q: "Which direction do you stroke in a back massage?",
      a: "Both palms move from the lower back upwards either side of the spine to the shoulders, round to the sides and lightly back down. Work slowly about three to five times, building the pressure so the muscles warm up. Never press on the spine itself, and use only light strokes over the kidney area of the lower back.",
    },
    {
      q: "Do you massage the legs and arms upwards or downwards?",
      a: "Towards the heart: on the legs from the ankle to the knee, on the arms from the wrist to the elbow. On the legs, avoid the back of the knee and do not press on visible veins or the shinbone. On the arms, avoid the armpit.",
    },
    {
      q: "Should you press harder on a tight, knotted muscle?",
      a: "No. On a tight spot the therapist slows down and stays a little longer, but does not press harder than the client finds comfortable. In relaxation massage the pressure is comfortable, never painful.",
    },
    {
      q: "How do you drape a client properly during a body massage?",
      a: "The client lies under a large towel and only the area being worked is uncovered. For the back, the towel is folded to the waist and tucked in firmly on both sides; for the legs, one leg at a time is uncovered from the ankle to just above the knee. When she turns over, the towel is lifted just enough for her to turn beneath it while staying covered.",
    },
    {
      q: "Is it normal to feel sore after a body massage?",
      a: "Mild soreness the next day can happen, especially after firm pressure. Real pain or bruising should be reported to the salon that did the massage.",
    },
  ],
  related: ["spa-massage-body-hieu-dung", "spa-massage-mat", "spa-tay-chan", "rua-tay-gang-tay"],
};

export default article;
