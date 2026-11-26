import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lash-lift/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-a-lash-lift-and-tint",
  lesson: "lash-lift",
  category: "lash",
  title: "How to do a lash lift and tint: 12 steps from choosing the shield to aftercare",
  metaTitle: "How to do a lash lift and tint: 12 steps in the salon",
  metaDescription:
    "Lash lift step by step: allergy test, oil-free cleansing, shield at the lash line, lashes onto the shield, two lotions, tint, releasing the lashes, aftercare.",
  keyword: "how to do a lash lift",
  keywords: [
    "lash lift steps",
    "lash lift procedure",
    "how to place a lash lift shield",
    "how to apply lash lift lotion",
    "how to tint lashes after a lift",
    "lash lift for beginners",
    "lash lift aftercare advice",
  ],
  excerpt: "The twelve steps of a lash lift and tint: the shield at the lash line, every lash straight on the shield, lotion on the lower part of the lash only, timing from the maker's chart.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-uon-mi-lash-lift-cho-khach-tai-studio"),
    alt: "A lash technician with a high bun, cream top and black gloves leans over a client lying on the bed, a tray of pink silicone shields beside the bed",
  },
  takeaways: [
    "Three things hold throughout: the client's eyes stay closed, **product never touches the skin or gets into the eye**, and timing always follows the maker.",
    "Lashes must be free of oil and **completely dry** before they go on the shield: oil makes the lotion work unevenly, and wet lashes will not stick.",
    "The shield sits **right at the lash line**, following the curve of the eye. A shield placed away from the lash line crimps the lashes.",
    "Placing the lashes on the shield deserves the most time: a lash lying crooked on the shield stays crooked after the lift.",
    "Tint only after a clear **allergy test**. If the client feels stinging or burning, wipe the product off at once, rinse with clean water and stop.",
  ],
  intro: [
    "How to do a lash lift involves no move as fiddly as isolating lashes or making fans, but every mistake is printed straight onto the client's natural lashes and cannot be fixed at once. A good lift comes from getting four things right: the shield, the position of each lash on it, where the lotion goes, and the timing.",
    "This article follows the VaraaAi Academy lesson “Lash lift and tint: step by step” in the Lashes course: twelve steps from the consultation to the notes for next time. It gives no processing times or mixing ratios, because those are in the instructions of the product you use. Watch the video below first, then read each step again.",
  ],
  sections: [
    {
      id: "before-a-lash-lift",
      title: "Before a lash lift: three things that hold throughout",
      blocks: [
        {
          ul: [
            "The client's eyes stay closed.",
            "Product never touches the skin or gets into the eye.",
            "Timing always follows the maker's instructions.",
          ],
        },
        { p: "What the lift lotion does to the lash, who the service suits and why over-processing leaves lashes frizzy are explained in [what is a lash lift](lesson:lash-lift-hieu-dung). If you have not read it yet, read it before you pick up a cotton swab." },
        { img: { src: img("bo-dung-cu-uon-mi-lash-lift-khuon-va-thuoc"), alt: "A gold-edged marble tray holding a row of pink silicone shields from small to large, lotion sachets, two small bottles, a lash wand, a lifting tool and cotton", caption: "A lash lift kit: shields in several sizes, lotions, lifting tool, wand and cotton." } },
        { note: "If product gets into the eye, rinse at once with plenty of clean water; if the eye stays painful, red or blurry, seek medical help. Processing times, mixing ratios, shield sizes and the allergy test always follow the product's instructions. Rules differ by country, and this is a training aid, not a licence.", kind: "warn", title: "Safety" },
      ],
    },
    {
      id: "choosing-the-shield",
      title: "How to choose a lash lift shield and test the fit",
      blocks: [
        { p: "Look at the natural lashes first: long or short, fine or thick. The length decides the shield size, while thickness and coarseness decide the time in the maker's chart." },
        {
          table: {
            head: ["You want", "Shield"],
            rows: [
              ["A lift for short lashes", "Small shield"],
              ["A lift for long lashes", "Larger shield"],
              ["More curl", "A little smaller"],
              ["A softer curl", "A little larger"],
            ],
          },
        },
        { p: "Before sticking it on, test the fit: comb the lashes lightly onto the shield and see where the tips reach. Many makers say the tips should sit somewhere between the middle and near the top edge of the shield, depending on the curl wanted. Follow the chart of the brand you use." },
      ],
    },
    {
      id: "where-the-lotion-goes",
      title: "Where lash lift lotion and tint go",
      blocks: [
        {
          table: {
            head: ["Product", "Where it goes", "How it is removed"],
            rows: [
              ["First lotion (softening)", "A thin layer on the lower part of the lashes, from near the root to about halfway", "Dry cotton swab, root to tip"],
              ["Second lotion (setting)", "Exactly the same area as the first", "Dry cotton swab, as before"],
              ["Tint", "Only on the lashes lying on the shield, never on the skin", "Damp cotton until no colour comes off"],
            ],
          },
        },
        { p: "Lift lotion goes neither on the eyelid skin nor out to the tips. The tips are fine and easily damaged, and a thin layer on the lower part of the lash is enough for it to take the shape of the shield." },
      ],
    },
    {
      id: "common-mistakes",
      title: "Common lash lift mistakes and how to avoid them",
      blocks: [
        {
          table: {
            head: ["Mistake", "What happens", "How to avoid it"],
            rows: [
              ["Lashes still damp when placed on the shield", "The adhesive does not hold and lashes slip off", "Wait until they are completely dry"],
              ["Mascara or oil left on the lashes", "The lotion works unevenly", "Cleanse with an oil-free product"],
              ["Shield placed away from the lash line", "The lashes are crimped", "Place it as close to the lash line as possible"],
              ["Lashes crossed or crooked on the shield", "They stay crooked after the lift", "Comb small groups so each lash is straight and separate"],
              ["Lotion left on longer than the chart", "Frizzy, brittle lashes", "Use a timer, never add minutes yourself"],
              ["Tint not fully removed", "It can stain the skin and irritate", "Wipe with damp cotton until no colour comes off"],
            ],
          },
        },
      ],
    },
    {
      id: "stinging-during-the-lift",
      title: "If the client feels stinging while the lotion works",
      blocks: [
        { p: "While the lotion is working, ask the client whether anything stings, burns or feels uncomfortable. Stinging or burning means the product has touched the skin, is close to the eye, or the client is reacting. Never tell her to put up with it until the time is up: wipe the product off at once, rinse with clean water and stop." },
        { p: "The same applies when she opens her eyes at the end. If her eyes sting or water, let her close them, rinse with clean water and keep an eye on her. What to do when a chemical gets into the eye is in [Incidents](lesson:xu-ly-su-co), and the cases to turn down at the consultation are in [When not to treat a client](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "after-the-lift",
      title: "After a lash lift: aftercare, notes and clean-up",
      blocks: [
        { p: "Tell the client to keep her lashes dry for the time the maker advises, often one day. Meanwhile, no mascara, no steam and no rubbing. The result usually lasts about 6–8 weeks. Do not lift again sooner than the maker advises, and book the next lift once plenty of new lashes have grown." },
        { note: "Write in the notes of the [client's profile](lesson:khach-hang) in VaraaAi: the shield size, each lotion's time, the tint shade and the allergy test date. If the result was lovely, repeat it exactly next time; if not, you know exactly what to adjust.", kind: "tip", title: "A habit worth keeping" },
        { p: "Once the client has gone, swabs, pads, film and any mixed product left over are thrown away, never kept. Shields and reusable tools are cleaned and disinfected as in [Tools after every customer](lesson:ve-sinh-dung-cu)." },
        { p: "If the salon takes bookings through VaraaAi, set a realistic duration for the lash lift in your [services](lesson:dich-vu), including the tint. For a client having a tint, the allergy test comes first, so the lift [appointment](lesson:lich-hen) is booked after the test date." },
      ],
    },
  ],
  howTo: {
    title: "How to do a lash lift and tint, step by step",
    id: "lash-lift-steps",
    after: "before-a-lash-lift",
    lead: "Twelve steps in the order of the lesson video. The time for each lotion is not given here: take it from the maker's chart.",
    supplies: [
      "Silicone lash lift shields in several sizes and lash lift adhesive",
      "First lotion (softening) and second lotion (setting)",
      "Lash and brow tint, if tinting",
      "An oil-free lash cleanser",
      "Under-eye pads and cling film",
      "Lifting tool, cotton swabs, damp cotton pads",
      "Lash serum, if the system includes one",
    ],
    steps: [
      {
        name: "Consult and do the allergy test",
        text: "Ask about the eyes, allergies and the last lift. A client with extensions has them removed first, as in [lash refills and removal](lesson:mi-dam-thao). If tinting, do the allergy alert test as the maker instructs, often 48 hours before the appointment, and record the date and result in the client's file.",
      },
      {
        name: "Cleanse the lashes and let them dry completely",
        text: "Use an oil-free cleanser. Any mascara or oil left behind makes the lotion work unevenly. Dry the lashes carefully and wait until they are completely dry, because damp lashes will not stick and will slip off the shield.",
      },
      {
        name: "Apply the under-eye pads",
        text: "Make the client comfortable with her eyes closed, then apply pads that cover all the lower lashes. The pads keep the lower lashes off the shield and protect the skin under the eye from the lotion. Lay them flat, without touching the eye.",
      },
      {
        name: "Choose the shield and place it at the lash line",
        text: "Choose the shield size by lash length and the curl wanted, and test the fit as the maker's chart says. Stick the shield on the upper lid as close to the lash line as possible, following the curve of the eye from the inner to the outer corner. The shield sits only on the lid skin, never touching the eye.",
        image: { src: img("dan-khuon-uon-mi-sat-chan-mi"), alt: "A black-gloved fingertip presses a pink silicone shield onto the client's upper lid, the edge of the shield right at the lash line, a white pad under the eye" },
      },
      {
        name: "Place the lashes on the shield",
        text: "Apply a very thin layer of lash lift adhesive to the shield. With the lifting tool, comb small groups of lashes up onto the shield, from the inner to the outer corner. Each lash lies straight and separate, not crossing, with the root standing right at the edge of the shield and no lower lashes caught. This is the step to take slowly.",
        image: { src: img("chai-mi-len-khuon-bang-que-tach-mi"), alt: "A metal lifting tool in a black-gloved hand combs the natural lashes straight up onto a pink silicone shield, each lash lying separately" },
      },
      {
        name: "Apply the first lotion",
        text: "With a small cotton swab, apply a very thin layer of softening lotion to the lower part of the lashes, from near the root to about halfway. Not on the eyelid skin. Not out to the tips, because the tips are fine and easily damaged.",
        image: { src: img("boi-thuoc-uon-mi-o-phan-duoi-soi-mi"), alt: "A small cotton swab in a black-gloved hand spreads a thin white layer of lift lotion on the lower part of the lashes lying on the silicone shield" },
      },
      {
        name: "Cover, time it and check on the client",
        text: "Lay a thin piece of cling film over the shield to keep in warmth and moisture, then set a timer according to the maker's chart and the client's lash type. Do not leave it longer “to be sure”: over-processing leaves lashes frizzy and brittle. While you wait, ask whether anything stings or burns; if it does, wipe the lotion off at once, rinse with clean water and stop.",
        image: { src: img("phu-mang-boc-len-khuon-khi-cho-thuoc-uon-mi"), alt: "A piece of clear cling film covers the lashes and silicone shield on a client's closed eye, its edge resting on the white pad" },
      },
      {
        name: "Remove the first lotion",
        text: "With a dry cotton swab, wipe gently from root to tip until no lotion is left. The lashes must stay in place on the shield, so wipe very lightly and always in the same direction.",
        image: { src: img("lau-thuoc-uon-mi-bang-que-bong-kho"), alt: "A dry cotton swab in a black-gloved hand wipes gently from root to tip over the lashes lying on a pink silicone shield" },
      },
      {
        name: "Apply the second lotion",
        text: "The setting lotion goes on exactly the same area as the first. Cover with film, time it as the maker says, then remove it with a dry cotton swab as before.",
      },
      {
        name: "Tint the lashes",
        text: "Tint only after a clear allergy test. Choose the shade by the client's brows and hair, and mix the tint exactly as the maker says just before use. Apply it to the lashes on the shield, on the lashes only and never on the skin, and time it as the maker says. Then wipe thoroughly with damp cotton until no colour comes off.",
        image: { src: img("lau-sach-thuoc-nhuom-mi-bang-bong-am"), alt: "A damp cotton pad in a black-gloved hand wipes the freshly tinted black lashes on the shield, the cotton showing a dark streak of tint" },
      },
      {
        name: "Release the lashes from the shield",
        text: "Put a little water, or the maker's release solution, on a cotton swab and gently lift the lashes off the shield. No pulling, no tugging. Then remove the shield and clean the eyelid.",
        image: { src: img("go-mi-khoi-khuon-uon-mi-nhe-nhang"), alt: "A small damp cotton swab in a black-gloved hand gently lifts the curled lashes away from the silicone shield on the client's eyelid" },
      },
      {
        name: "Condition, compare both eyes and give aftercare",
        text: "If the system includes a lash serum, comb a thin layer through the lashes. Compare both eyes for an even curl and colour. Remove the pads, let the client open her eyes slowly, tell her to keep her lashes dry for the time the maker advises, and record the appointment in her profile.",
        image: { src: img("chai-serum-duong-mi-sau-khi-uon"), alt: "Seen from the head of the bed, a lash wand in a black-gloved hand combs through the client's curled lashes, white pads still under both eyes" },
      },
    ],
  },
  faq: [
    {
      q: "What are the steps of a lash lift?",
      a: "Consultation and an allergy test if tinting, oil-free cleansing and drying, under-eye pads, the shield at the lash line, combing the lashes onto the shield, the first lotion and its removal, the second lotion and its removal, tint, releasing the lashes, serum and aftercare. Each lotion's time follows the maker's chart.",
    },
    {
      q: "How long do you leave lash lift lotion on?",
      a: "There is no single figure. The time depends on the client's lash type and the product you use, so time it by the maker's chart. Leaving it on longer “to be sure” leaves lashes frizzy and brittle.",
    },
    {
      q: "Why are lashes crimped or crooked after a lash lift?",
      a: "Lashes are crimped when the shield is placed away from the lash line. They are crooked when they were already lying crooked or crossed on the shield when you combed them up. Place the shield right at the lash line and comb small groups so each lash lies straight and separate.",
    },
    {
      q: "Do you tint lashes before or after the lift?",
      a: "In the lesson, the lashes are tinted after the second lotion while they are still on the shield, and only after a clear allergy test. The tint goes on the lashes only, never on the skin, and is wiped off with damp cotton until no colour comes off.",
    },
    {
      q: "What do you do if the client's eyes sting during a lash lift?",
      a: "Wipe the product off at once, rinse with clean water and stop. Stinging or burning means the product has touched the skin, is close to the eye, or the client is reacting. If product gets into the eye, rinse with plenty of clean water and seek medical help if the eye stays painful, red or blurry.",
    },
    {
      q: "When can you wear mascara after a lash lift?",
      a: "Keep the lashes dry for the time the maker advises, often one day. During that time, no mascara, no steam and no rubbing.",
    },
  ],
  related: ["lash-lift-hieu-dung", "mi-dam-thao", "mi-chuan-bi", "di-ung-hoa-chat"],
};

export default article;
