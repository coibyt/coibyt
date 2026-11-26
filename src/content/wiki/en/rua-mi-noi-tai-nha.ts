import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/rua-mi-noi-tai-nha/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-wash-lash-extensions",
  lesson: "rua-mi-noi-tai-nha",
  category: "tips",
  title: "How to wash lash extensions at home: 3 steps to clean lashes without losing them",
  metaTitle: "How to wash lash extensions at home: 3 gentle steps",
  metaDescription:
    "How to wash lash extensions: skip oil-based removers, lather an oil-free lash shampoo, brush gently for about 15 seconds per eye, rinse cool, dry cool and brush.",
  keyword: "how to wash lash extensions",
  keywords: ["how to clean lash extensions at home", "do you need to wash lash extensions", "lash shampoo for extensions", "oil-based make-up remover with lash extensions", "how to dry lash extensions", "how often to wash lash extensions"],
  excerpt: "Lash extensions need washing every day, but washing them the wrong way makes them fall out fast. Three steps for washing them at home, and why to avoid oily removers.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chai-lai-mi-noi-sau-khi-rua-trong-phong-tam"),
    alt: "A blonde woman in a cream silk robe stands in a marble bathroom, brushing her lash extensions with a small spoolie in front of the mirror",
  },
  takeaways: [
    "Lash extensions need **washing every day**: dust, skin oil and make-up build up at the base, making the lashes dirty and slowly weakening the glue.",
    "**Avoid oil-based make-up removers and creams** around the eyes: oil softens the glue and the extensions come off much sooner.",
    "Use an **oil-free lash shampoo** and a soft brush, brushing in the direction the lashes grow, for about **15 seconds per eye**.",
    "No scrubbing, no pulling. Rinse with cool water, pat dry with a tissue, and use a hairdryer on cool, held well away from your face.",
    "Brush the lashes back into place once they are dry.",
  ],
  intro: [
    "How to wash lash extensions is not difficult, but it is quite different from washing your face. Extensions need washing every day so the base of the lashes stays clean; wash them the wrong way, scrub hard or use an oily remover, and they fall out fast. The whole routine is three steps and takes only a few minutes.",
    "This article follows the lesson “How to wash lash extensions at home” from the Moja Beauty course at VaraaAi Academy, short videos for customers from the Moja Beauty salon in Helsinki. By the end you will be able to wash your extensions at home without losing them, and know why oil-based removers have to go.",
  ],
  sections: [
    {
      id: "why-wash",
      title: "Do you need to wash lash extensions?",
      blocks: [
        { p: "Yes, and every day. The base of the lashes is where dust, skin oil and make-up collect, right where the glue bond sits. Left there, that build-up makes the lash line uncomfortable and slowly weakens the glue. Clean lashes also stand up fluffy and even, while dirty ones clump." },
        { p: "Many people worry that water will make the extensions fall out, so they avoid washing them. In fact clean water is not the problem, except in the first 24 hours after the appointment, while the glue is still settling. What makes extensions fall out is oil, and rubbing." },
      ],
    },
    {
      id: "avoid-oily-removers",
      title: "Why to avoid oil-based make-up removers with lash extensions",
      blocks: [
        { p: "Oil softens lash glue. When you use cleansing oil, an oil-based cleansing milk or a rich eye cream around the eyes, the glue at the base of the lashes weakens a little each time, and the extensions come off much sooner than they should. That is also why, at the salon, the technician removes extensions with a professional remover rather than using oil near the eyes." },
        {
          table: {
            head: ["Product near the eyes", "While wearing extensions"],
            rows: [
              ["Cleansing oil, cleansing balm", "Avoid"],
              ["Eye cream, oil-based skincare", "Avoid"],
              ["Oil-free lash shampoo", "Use every day"],
              ["Clean, cool water", "Use for rinsing"],
            ],
          },
        },
        { note: "Read the label before using a product near your eyes. If you are not sure whether something contains oil, bring it to your next refill and ask your technician.", kind: "tip", title: "When in doubt" },
      ],
    },
    {
      id: "after-washing",
      title: "After washing: drying and brushing",
      blocks: [
        { p: "Drying is the step people rush most. Do not rub a towel over your eyes: rubbing twists the extensions and pulls on them. Patting the area around the eyes with a tissue is enough; let a stream of cool air do the rest." },
        { img: { src: img("lam-kho-mi-bang-luong-gio-mat-de-xa-mat"), alt: "A black-gloved hand holds a small cream-coloured fan that gently blows air onto the lashes of a client lying with closed eyes, the fan kept well away from her face", caption: "At the salon, the technician dries the lashes with a small fan. At home, a hairdryer on cool, held away from the face, does the same." } },
        { p: "Once the lashes are dry, brush them with a clean spoolie from base to tip. The extensions separate, point the right way, and the lash line looks as if you had just left the salon." },
        { img: { src: img("hang-mi-noi-sach-va-deu-sau-khi-chai"), alt: "Close-up of a client's closed eye with a clean, fluffy and even line of black extensions resting on a white pad", caption: "Clean, dry, well-brushed lashes stay fluffy, not clumped." } },
      ],
    },
    {
      id: "common-mistakes",
      title: "Common mistakes when washing lash extensions",
      blocks: [
        {
          table: {
            head: ["Mistake", "What happens", "Do this instead"],
            rows: [
              ["Using cleansing oil", "Glue softens, lashes fall early", "Oil-free lash shampoo"],
              ["Scrubbing with fingers", "Lashes twist and pull out", "Soft brush, in the growth direction"],
              ["Rubbing with a towel", "Lashes twist and get pulled", "Pat with a tissue"],
              ["Hot air, dryer close to the face", "Heat right by the eyes", "Cool setting, held well away"],
              ["Not brushing afterwards", "Lashes dry clumped and crooked", "Brush from base to tip"],
              ["Not washing for fear of losing lashes", "Dirty lash line, weaker glue", "Wash gently every day"],
            ],
          },
        },
        { p: "Washing correctly does not stop all lash loss: natural lashes still shed a few a day as part of their cycle, and the extensions go with them. The lesson [why losing 2–5 lashes a day is normal](lesson:chu-ky-rung-mi) explains why." },
      ],
    },
    {
      id: "tools-and-refills",
      title: "What you need and when to refill",
      blocks: [
        { p: "You only need three things: a bottle of oil-free lash shampoo, a soft lash cleansing brush and a clean spoolie." },
        { img: { src: img("chai-mi-bang-choi-sach-tu-chan-ra-ngon"), alt: "A black-gloved hand brushes the lashes of a client lying with closed eyes using a black spoolie, a white pad under the eye" } },
        { p: "Washing your lashes properly keeps the set looking good until your refill, usually after two to three weeks. What to remember on the first day is covered in [lash aftercare after extensions or a lift](lesson:cham-soc-sau-lam-mi); to understand why oil and pulling harm your natural lashes, read [do lash extensions damage natural lashes](lesson:noi-mi-co-hai-mi-that)." },
        { p: "Need a lash shampoo or a cleansing brush? Ask Moja Beauty at your next visit. Refills are booked on VaraaAi on [Moja Beauty's page](/b/moja-beauty)." },
      ],
    },
  ],
  howTo: {
    title: "How to wash lash extensions at home: 3 steps",
    id: "steps-to-wash-lash-extensions",
    after: "avoid-oily-removers",
    lead: "Wash every day, starting from the second day after your appointment. Brushing takes only about fifteen seconds per eye.",
    supplies: [
      "Oil-free lash shampoo",
      "Soft lash cleansing brush",
      "Cool water",
      "Tissues",
      "Hairdryer with a cool setting",
      "Clean spoolie",
    ],
    steps: [
      {
        name: "Wet the lashes and add foam",
        text: "Wet your lashes lightly with water, then take a little oil-free lash shampoo. The soft foam gets into the base of the lashes and lifts dust, skin oil and make-up without any scrubbing.",
        image: { src: img("co-mem-phu-bot-rua-mi-chai-nhe-chan-mi"), alt: "A soft brush covered in white foam is gently brushed along the lash line of a client's closed eye, held by a black-gloved hand" },
      },
      {
        name: "Brush gently with a soft brush",
        text: "Brush gently with the soft brush in the direction the lashes grow, from base to tip. No scrubbing and no pulling; about fifteen seconds per eye is enough. Keep your eyes closed the whole time so the foam stays out of them.",
      },
      {
        name: "Rinse, pat dry, dry on cool",
        text: "Rinse the foam off with cool water, then pat the area around your eyes dry with a tissue, without rubbing. Dry with a hairdryer on cool, held well away from your face, until the lashes are completely dry. Then brush them back into place.",
        image: { src: img("xa-mi-bang-nuoc-sach-va-tham-bang-khan-giay"), alt: "A small white squeeze bottle rinses a fine stream of water over the lashes of a client with closed eyes, the other hand holding a tissue under the eye" },
      },
    ],
  },
  faq: [
    {
      q: "Do lash extensions need to be washed every day?",
      a: "Yes. Dust, skin oil and make-up collect at the base of the lashes every day, right where the glue bond is. Washing gently with an oil-free foam keeps the lash line clean and helps the extensions last longer.",
    },
    {
      q: "Can I use cleansing oil with lash extensions?",
      a: "It is best not to. Oil softens the lash glue, so the extensions come off much sooner. Use oil-free products around the eyes.",
    },
    {
      q: "How long does it take to wash lash extensions?",
      a: "The brushing itself takes only about fifteen seconds per eye. Including wetting, rinsing and drying on cool, the whole routine takes just a few minutes.",
    },
    {
      q: "When can I wash my lash extensions after the appointment?",
      a: "Keep your lashes dry for the first 24 hours so the glue can settle. From the next day on, wash them every day in three steps.",
    },
    {
      q: "Can I use a hairdryer to dry lash extensions?",
      a: "Yes, on the cool setting and held well away from your face. Before that, pat the area around your eyes dry with a tissue rather than rubbing a towel over them.",
    },
    {
      q: "Where can I buy lash shampoo?",
      a: "The simplest way is to ask the salon where you had your extensions done. At Moja Beauty you can ask about lash shampoo and a cleansing brush at your visit.",
    },
  ],
  related: ["cham-soc-sau-lam-mi", "noi-mi-co-hai-mi-that", "chu-ky-rung-mi", "mi-classic"],
};

export default article;
