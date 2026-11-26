import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-mat/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-a-facial-massage",
  lesson: "spa-massage-mat",
  category: "spa",
  title: "How to do a facial massage: 12 steps from the first touch to a hold at the temples",
  metaTitle: "How to do a facial massage: 12 steps, the right direction",
  metaDescription:
    "How to do a facial massage step by step: allergy questions, posture, oil, neck and shoulders, jaw and cheeks, forehead, eye area, press-and-hold and notes.",
  keyword: "how to do a facial massage",
  keywords: [
    "facial massage steps",
    "facial massage technique",
    "which direction to massage your face",
    "how long should a facial massage be",
    "how to massage around the eyes",
    "facial massage for beginners",
  ],
  excerpt: "A complete facial massage: from the shoulders and neck up to the jaw, cheeks, forehead and eyes, then press-and-hold and the finish. With repetitions, the amount of oil and four common mistakes.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("dat-tay-len-vai-khach-truoc-khi-massage-mat"),
    alt: "A therapist stands at the head of the bed with both open hands resting lightly on the shoulders of a client lying with her eyes closed, an arched window and a white orchid behind",
  },
  takeaways: [
    "Facial massage is done on clean skin, for about **10–20 minutes** depending on the salon's treatment.",
    "A fixed order: shoulders and neck, jaw and cheeks, around the mouth, forehead, around the eyes, press-and-hold, finish. Bottom up, with the eyes last.",
    "Every stroke on the face goes **upwards and outwards**; repeat each movement about three to six times.",
    "Always keep one hand on the client when you change movements, so she never startles.",
    "Where the skin reddens quickly, lighten the touch or skip it. Burning, itching redness: stop, wipe gently and apply a cool towel.",
  ],
  intro: [
    "How to do a facial massage during a facial is no great mystery: a few movements of stroking, small circles and press-and-hold, done in an order that never changes. The hard part is keeping the pressure light, the rhythm even and your hands on the client for the whole ten to twenty minutes.",
    "This article follows the VaraaAi Academy lesson “Facial massage: step by step” in the Spa & skin care course. By the end you can give a twelve-step facial massage, from the first question to the notes and the tidy bed. The massage time follows your salon's treatment; oils and creams are used as the brand instructs.",
  ],
  sections: [
    {
      id: "massage-order",
      title: "The order of a facial massage: bottom up, the eyes last",
      blocks: [
        { p: "Facial massage is usually done once the skin is clean, as part of a facial. The sequence in the lesson passes through seven stages:" },
        {
          ol: [
            "Shoulders and neck",
            "Jaw and cheeks",
            "Around the mouth",
            "Forehead",
            "Around the eyes",
            "Press-and-hold",
            "Finish",
          ],
        },
        { p: "The order runs from the bottom up, and from the least sensitive areas to the most sensitive one, around the eyes. By the time your hands reach the eyes, the client is used to your pressure and rhythm." },
        { note: "Keep the same order every time. Your hands learn it, the rhythm stays even, and no area is missed.", kind: "tip", title: "From the trade" },
        { p: "This article covers the hands-on part only. Why the strokes go upwards, when to rebook a client and what facial massage can and cannot do are in [Facial massage benefits](lesson:spa-massage-mat-hieu-dung)." },
      ],
    },
    {
      id: "repetitions-oil-pressure",
      title: "Repetitions, amount of oil and pressure",
      blocks: [
        { p: "The numbers and habits below apply to every step of the sequence." },
        {
          table: {
            head: ["Remember", "How", "Why"],
            rows: [
              ["Repetitions", "About three to six times per movement before moving on", "The client has time to feel it and let go"],
              ["Amount of oil", "Start with a little; add a touch if your hands drag the skin", "Too much leaves the face greasy and your hands slippery, hard to control"],
              ["Pressure", "Tell the client in advance, ask again at press-and-hold", "Everyone likes a different pressure"],
              ["Your hands", "Always keep one hand on the client when changing movements", "She does not startle and relaxes more deeply"],
            ],
          },
        },
        { p: "For a client with red, sensitive skin the sequence is shortened: very light press-and-hold or none, and no tapping." },
      ],
    },
    {
      id: "common-mistakes",
      title: "Four common facial massage mistakes",
      blocks: [
        {
          table: {
            head: ["Mistake", "Result", "Fix"],
            rows: [
              ["Lifting both hands and putting them back abruptly", "The client startles", "Always keep one hand on the client"],
              ["Nails touching the skin", "Uncomfortable, and the skin scratches easily", "Short nails, only the pads of the fingertips"],
              ["Constant chatting", "The client cannot relax", "Ask about pressure, then let her rest"],
              ["Not watching the skin", "You miss an area turning red", "Where it reddens quickly, lighten the touch or skip that area"],
            ],
          },
        },
      ],
    },
    {
      id: "avoid-or-stop",
      title: "When to avoid an area and when to stop altogether",
      blocks: [
        {
          ul: [
            "Cold sores, broken skin or sunburn: avoid that area.",
            "Recent injectables, laser or a peel: follow the advice of the practitioner who did it.",
            "Burning or itching redness during the massage: stop, wipe gently and apply a cool towel, as in the lesson [Incidents in the salon](lesson:xu-ly-su-co).",
          ],
        },
        { p: "The cases where you say no from the start are collected in the lesson [When not to treat a client](lesson:khi-nao-khong-lam)." },
        { note: "Rules and job titles for massage differ from country to country. This article is a training aid, not a licence.", kind: "warn", title: "Rules differ by country" },
      ],
    },
    {
      id: "notes-after-massage",
      title: "After the facial massage: notes so anyone can carry on",
      blocks: [
        { p: "Three things are worth noting after every massage: the oil you used, the pressure the client likes and any areas to avoid. In VaraaAi you write them in the client's internal notes in your [client list](lesson:khach-hang). Next time, whether you or a colleague does the treatment, the client does not have to repeat herself." },
        { img: { src: img("ghi-chu-noi-bo-sau-khi-massage-mat"), alt: "A therapist sits at a small stone desk by the window typing notes on a tablet, an empty spa bed behind her", caption: "Write the notes as soon as the client has gone, while you still remember clearly." } },
        { p: "If your salon sells facial massage as a service of its own or as part of a facial package, [add the service](lesson:dich-vu) with the exact length of your salon's treatment so clients can book it online themselves." },
      ],
    },
  ],
  howTo: {
    title: "Facial massage steps, in order",
    id: "facial-massage-steps",
    after: "massage-order",
    lead: "The twelve steps follow the order of the lesson video, on clean skin with no make-up.",
    supplies: [
      "The client's consultation form",
      "Facial massage oil or cream in a pump bottle",
      "Clean towels, blanket, headband and linen for the client",
      "A height-adjustable stool at the head of the bed",
      "Facial sponges and warm water, if a mask follows",
    ],
    steps: [
      {
        name: "Ask the client and prepare your hands",
        text: "Read the consultation form again and ask about allergies to oils, nuts or fragrance, and about recent injectables, laser or peels. If there have been any, follow the practitioner's advice; avoid cold sores, broken skin and sunburn. Ask the client to take out contact lenses. Take off your rings and watch, wash your hands with soap, dry them and rub them warm if they are cold.",
      },
      {
        name: "Set up the client's position and your own",
        text: "The client lies on her back under a towel and blanket, with only the face, neck and shoulders showing; ask whether she is warm and the pillow is right. Sit on the stool at the head of the bed, adjusted so your back is straight, your shoulders relaxed and your wrists straight. Tell her in advance to say if the pressure is too firm or too light.",
      },
      {
        name: "Take the oil",
        text: "Pump a small amount into your palm and rub your hands together to warm it. Start with a little and add a touch if your hands drag the skin. Too much leaves the face greasy and your hands slippery and hard to control.",
      },
      {
        name: "The first touch",
        text: "Rest both hands lightly on the client's shoulders and keep them still for a few breaths, then press the shoulders down gently. This touch tells the client that the massage has begun and she can let go.",
        image: { src: img("cai-cham-dau-tien-hai-tay-dat-len-vai"), alt: "Seen from above, a therapist's two hands lie flat on both shoulders of a client in a white headband whose eyes are closed", caption: "Both hands on the shoulders, still for a few breaths before a gentle press down." },
      },
      {
        name: "Stroke the neck and shoulders",
        text: "Glide your palms lightly down the sides of the neck towards the collarbones, then out over the shoulders. Do not touch the front of the throat and do not press deep into the sides of the neck, where the blood vessels and windpipe are. Repeat a few times, slowly and evenly.",
        image: { src: img("vuot-nhe-hai-ben-co-xuong-xuong-quai-xanh"), alt: "A therapist's palms rest lightly on both sides of the neck of a client lying with her eyes closed, the fingers pointing down towards the collarbones" },
      },
      {
        name: "Stroke the jaw and cheeks",
        text: "Stroke from the middle of the chin along the jawline to just in front of the ears. Then stroke from the sides of the nose, under the cheekbones, up to the temples. Both hands move symmetrically and evenly, always upwards and outwards, never dragging the skin down.",
        image: { src: img("vuot-tu-cam-theo-duong-ham-len-tai"), alt: "A therapist's hands cup the client's chin and jawline, the fingers meeting at the middle of the chin ready to stroke up towards the ears", caption: "From the middle of the chin, along the jaw, to in front of the ears." },
      },
      {
        name: "Small circles on the cheeks, then around the mouth",
        text: "With the tips of the middle and ring fingers, draw small, light circles on the cheeks and along the jawline, moving up a little with each circle from the chin towards the temples. Then place the middle fingertips at the centre of the chin and circle very lightly around the lips up to the sides of the nose, then stroke from the corners of the mouth out towards the ears. Do not pull the corners of the mouth and keep oil off the lips.",
      },
      {
        name: "Stroke the forehead",
        text: "Place your palms on the forehead and stroke from the brows up to the hairline, one hand following the other. Then stroke across from the centre of the forehead out to the temples. Many people hold tension in the forehead when they are tired or worried, so go a little slower here and let the client breathe evenly.",
        image: { src: img("vuot-tran-tu-chan-may-len-chan-toc"), alt: "One of the therapist's hands lies flat on the client's forehead while the other waits to follow, the client resting with her eyes closed on a white towel", caption: "One hand follows the other, from the brows to the hairline." },
      },
      {
        name: "Glide around the eyes with the ring finger",
        text: "Use only the ring finger, with the lightest pressure. Glide along the brows out to the temples, then circle very lightly along the bone under the eye towards the bridge of the nose. Never press on the eyelids, and take care that no oil runs into the eyes.",
        image: { src: img("massage-quanh-mat-bang-ngon-ap-ut"), alt: "A therapist's fingertips rest lightly along both brows of a client whose eyes are closed, pointing out towards the temples" },
      },
      {
        name: "Press and hold, and tap lightly if the skin is not sensitive",
        text: "Press slowly with the fingertips between the brows, then under the cheekbones, then at the temples; hold each point for a few seconds and release slowly. Ask whether the pressure is right. On red, sensitive skin press very lightly or leave it out. If you want to tap, let the fingertips touch the cheeks quickly and lightly like raindrops; no tapping on sensitive skin.",
        image: { src: img("an-giu-duoi-go-ma-khi-massage-mat"), alt: "A therapist's fingertips press gently under both cheekbones of a female client whose eyes are closed", caption: "Press-and-hold under the cheekbones: press slowly, hold a few seconds, release slowly." },
      },
      {
        name: "Finish the massage",
        text: "Make long strokes over the whole face, from the chin to the cheeks, the forehead and out to the temples, a few times, gradually slowing down. End with a light hold at the temples, then lift your hands away very slowly. If a mask comes next, remove excess oil with a warm, damp sponge.",
      },
      {
        name: "Ask the client, take notes and tidy up",
        text: "Ask how the client feels and whether the pressure was right, and tell her to contact the salon straight away if redness, burning or itching lasts. Note the oil you used, the pressure she likes and any areas to avoid. Then put the towels and headband into a lidded laundry hamper, wipe the bed and [wash your hands](lesson:rua-tay-gang-tay).",
      },
    ],
  },
  faq: [
    {
      q: "How long should a facial massage be?",
      a: "During a facial, the massage usually lasts about ten to twenty minutes, depending on the salon's treatment. It is done once the skin has been cleansed and no make-up is left.",
    },
    {
      q: "Which direction should you massage your face?",
      a: "Strokes on the face go upwards and outwards: from the middle of the chin along the jaw to in front of the ears, from the sides of the nose under the cheekbones to the temples, and from the brows to the hairline. Never drag the skin down or rub back and forth. On the neck alone, the hands glide lightly down the sides towards the collarbones.",
    },
    {
      q: "Where do you start a facial massage?",
      a: "Start by resting both hands on the client's shoulders and keeping them still for a few breaths. Then follow the order: shoulders and neck, jaw and cheeks, around the mouth, forehead, around the eyes, press-and-hold and the finish. The sequence goes from the bottom up and from the least sensitive areas to the eyes.",
    },
    {
      q: "How many times do you repeat each facial massage movement?",
      a: "About three to six times per movement before you move on to the next. That is enough for the client to feel it and relax. When you change movements, always keep one hand on the client.",
    },
    {
      q: "How do you massage around the eyes without harming the skin?",
      a: "Use only the ring finger with the lightest pressure. Glide along the brows to the temples, then circle lightly along the bone under the eye towards the bridge of the nose. Never press on the eyelids, keep oil out of the eyes, and ask clients with contact lenses to take them out first.",
    },
    {
      q: "What should you watch for when massaging sensitive, easily red skin?",
      a: "Use few movements and the lightest pressure. Press-and-hold is very light or left out, and there is no tapping. During the massage, lighten the touch or skip any area that reddens quickly; if the skin burns or itches, stop, wipe gently and apply a cool towel.",
    },
  ],
  related: ["spa-massage-mat-hieu-dung", "spa-facial", "spa-massage-body", "spa-soi-da"],
};

export default article;
