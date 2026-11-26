import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-classic/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-classic-lash-extensions",
  lesson: "mi-classic",
  category: "lash",
  title: "How to do classic lash extensions: 12 steps from consultation to aftercare",
  metaTitle: "How to do classic lash extensions: 12 steps for beginners",
  metaDescription:
    "Classic lash extensions step by step: consultation, cleansing, gel pads, isolating one lash, dipping the glue, placing 0.5–1 mm from the lid, stickies, aftercare.",
  keyword: "how to do classic lash extensions",
  keywords: ["classic lash extension steps", "1:1 lash extension technique", "how far from the lid to place lash extensions", "how much glue for lash extensions", "lash extensions for beginners", "how long does a classic lash set take", "lash extension aftercare"],
  excerpt: "One extension on each natural lash. This article goes through the twelve steps of a classic set, with the placement distance, the amount of glue and the aftercare every client needs to hear.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-classic-cho-khach-tai-studio"),
    alt: "A lash technician in a cream top and black gloves applies extensions to a client lying on the bed in an elegant lash studio",
  },
  takeaways: [
    "Classic lash extensions are **1:1**: one extension attached to one isolated natural lash.",
    "Three things hold for the whole set: the client's eyes stay closed, you isolate exactly one lash, and **glue never touches the skin**.",
    "The base of the extension sits about **0.5–1 mm** from the eyelid; dip only 1–2 mm of the base into the glue.",
    "Alternate zones so the glue can set, and run the tweezers through after each zone to check for stickies.",
    "A full classic set usually takes about 1.5–2 hours; the client comes back for a refill after 2–3 weeks.",
  ],
  intro: [
    "How to do classic lash extensions is the first thing every lash technician has to learn properly, because every later technique, volume and hybrid included, builds on the same moves: isolate, dip, place, check. Classic means 1:1, each natural lash carrying one extension.",
    "This article follows the VaraaAi Academy lesson “Classic lashes: step-by-step practice” in the Lashes course. Watch the lesson video below once first to see how the tweezers are held, then read through the steps and practise on a mannequin head before working on clients.",
  ],
  sections: [
    {
      id: "what-is-classic",
      title: "What classic lash extensions are",
      blocks: [
        { p: "Classic lash extensions means attaching **one extension to one natural lash**, which is why the technique is also called 1:1. The result is a longer, more defined lash line that still looks natural, with every lash separate, like a very well applied coat of mascara." },
        { p: "Because each natural lash carries just one extension, how full the set looks depends on how many natural lashes the client has. When you brush the lashes, you look at which are strong and long and which are young, short and fine, then choose the length and thickness for each zone. A baby lash cannot carry a long, heavy extension." },
        { img: { src: img("bo-mi-classic-hoan-thien-tu-nhien"), alt: "Close-up of a blonde client's face with a finished classic set, the lashes separate and naturally long", caption: "A finished classic set: soft, separated and natural." } },
      ],
    },
    {
      id: "before-you-start",
      title: "Before you start: consultation and when not to work",
      blocks: [
        { p: "The consultation happens while the client's eyes are still open, after you have washed your hands. Questions to ask:" },
        {
          ul: [
            "Does she have allergies, and has she ever reacted to lash glue?",
            "Are her eyes red or itchy right now, does she have an eye condition, or has she had recent eye surgery?",
            "Does she wear contact lenses? If so, ask her to take them out first.",
            "Does she want a natural look or something fuller?",
          ],
        },
        { p: "If the eyes are not healthy, do not work. This is not about losing a client but about not making an inflamed eye worse. The lesson [When not to treat a customer](lesson:khi-nao-khong-lam) goes through these cases in detail." },
        { img: { src: img("tu-van-khach-truoc-khi-noi-mi"), alt: "A lash technician sits facing a client on a cream sofa, taking notes on a clipboard during the consultation", caption: "Consult while the client's eyes are open: allergies, eye health, the look she wants." } },
      ],
    },
    {
      id: "glue-and-distance",
      title: "Glue amount and placement: two figures to know by heart",
      blocks: [
        {
          table: {
            head: ["Move", "Figure", "Why"],
            rows: [
              ["Dipping the extension base in glue", "About 1–2 mm", "Just enough glue, thin and even; more forms a blob at the base and causes stickies"],
              ["Extension base from the eyelid", "About 0.5–1 mm", "Glue must not touch the skin; an extension on the skin feels scratchy and irritates"],
            ],
          },
        },
        { p: "The extension lies along the natural lash in the same direction and is pressed gently so it sits snugly. Hold it still a moment so the glue grabs, release the placing tweezers first, and the isolation tweezers last." },
        { note: "Do not attach lashes that sit right next to each other one after another. Place one at the outer corner, one in the middle, one at the inner corner, then go back. The glue on the previous lash has time to cure, and neighbouring lashes do not stick together. Many technicians also alternate between the eyes so each side gets a rest.", kind: "tip", title: "From the trade" },
      ],
    },
    {
      id: "stickies",
      title: "Stickies: the mistake to catch at the bed",
      blocks: [
        { p: "A sticky is when glue joins two natural lashes, or an extension catches the lash next to it. Each natural lash grows at its own pace, so two lashes glued together pull on each other as they grow. The client feels something scratchy, and the natural lash is pulled." },
        { p: "How to check: after each zone, glide the straight tweezers lightly through the lashes from root to tip. Every lash must stand on its own. If two are stuck together, separate them at once, very gently, before the glue has fully hardened." },
        { p: "The usual cause is incomplete isolation or too much glue. One extra lash caught in the isolation is enough for the glue to join the two." },
      ],
    },
    {
      id: "lengths",
      title: "Choosing length zone by zone",
      blocks: [
        { p: "The basic rule: shortest at the inner corner, then gradually longer towards the middle and the outer corner, for a soft, natural eye shape. At the inner corner the natural lashes are short and fine, so choose short, light extensions." },
        { p: "Choosing a style for each eye shape is a separate topic, covered in [lash mapping](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "aftercare",
      title: "Lash extension aftercare: what to tell the client",
      blocks: [
        {
          ul: [
            "No water, no steam and no swimming for as long as the glue maker advises, usually 24 to 48 hours.",
            "No oil-based products at the lash base, because oil weakens the glue.",
            "Brush the lashes gently every day with a clean wand.",
            "No rubbing, no pulling and no lash curler.",
            "Come back for a refill after 2–3 weeks.",
          ],
        },
        { img: { src: img("chai-mi-noi-moi-ngay-tai-nha"), alt: "A client in a cream silk robe brushes her lash extensions with a clean lash wand in front of a mirror", caption: "Brushing every day with a clean wand keeps the lashes lying evenly." } },
        { p: "Book the refill before the client leaves. If your salon uses VaraaAi, you can [book the appointment](lesson:lich-hen) for her right at the desk and let the system send the reminder; the aftercare advice can go to her again in a [message](lesson:tin-nhan-ai)." },
        { p: "Once the client has gone: used lash wands, swabs and pads go into a lidded bin. Tweezers are cleaned and disinfected after every client, as in [Tools after every customer](lesson:ve-sinh-dung-cu). The bed and work table are wiped down." },
      ],
    },
  ],
  howTo: {
    title: "How to do classic lash extensions, step by step",
    id: "classic-lash-steps",
    after: "before-you-start",
    lead: "Twelve steps in the order of the lesson video. The first five are preparation, and careful preparation is what makes the lashing quick.",
    supplies: [
      "Classic lash trays, sorted by length",
      "Lash glue and a jade stone or glue ring",
      "Straight tweezers to isolate, curved tweezers to place",
      "Lash cleanser and a soft brush",
      "Gel under-eye pads and medical paper tape",
      "Single-use lash wands and small cotton swabs",
    ],
    steps: [
      {
        name: "Consult",
        text: "Wash your hands, then talk with the client while her eyes are open: allergies, any past reaction to glue, eye health, contact lenses, the look she wants. If there is a problem with her eyes, do not work.",
      },
      {
        name: "Make the client really comfortable",
        text: "A neck pillow, a light blanket, perhaps a small pillow under the knees. A full classic set usually takes one and a half to two hours, and the client lies still with her eyes closed the whole time. The more relaxed she is, the less her eyes move.",
      },
      {
        name: "Cleanse the natural lashes",
        text: "Oil, cream or eyeshadow left on the lashes weakens the bond. With the client's eyes closed, brush lash cleanser gently through the lashes with a soft brush, from root to tip. Rinse with clean water and dry thoroughly with a small fan, or let them air-dry.",
        image: { src: img("lam-sach-mi-that-bang-bot-rua-mi"), alt: "A soft brush covered in lash cleanser foam glides gently over the lashes of a client with closed eyes" },
      },
      {
        name: "Apply the gel under-eye pads",
        text: "The pad covers every lower lash so none gets glued to the upper lashes. Its top edge sits just under the lower lash line without touching the waterline or the eye; if it does, the client feels scratching and stinging and her eyes are red afterwards. Use a small piece of medical paper tape for any lower lash that still pokes out.",
        image: { src: img("dan-mieng-lot-gel-duoi-mat"), alt: "A white crescent-shaped gel pad placed under a client's closed eye, fully covering the lower lashes" },
      },
      {
        name: "Brush and study the lashes",
        text: "Brush with a single-use wand so the lashes separate and lie evenly. Look at which lashes are strong and long and which are young, short and fine, to choose the length and thickness for each zone.",
      },
      {
        name: "Set up your station",
        text: "Lash trays sorted by length, a jade stone or glue ring with a fresh drop, straight and curved tweezers, single-use wands and swabs. Cap the glue bottle straight after taking the glue, and keep the drop away from the client's face.",
        image: { src: img("dung-cu-noi-mi-classic"), alt: "A white stone tray with gold edging holding a bottle of lash glue, lash strips sorted by length, a jade stone with a glue drop, two tweezers and a lash wand" },
      },
      {
        name: "Isolate exactly one natural lash",
        text: "Hold the straight tweezers in your non-dominant hand, slide them into the lashes, open the tips slightly and push the neighbouring lashes aside, so that a single natural lash stands alone.",
        image: { src: img("tach-mot-soi-mi-that-bang-nhip"), alt: "Two tweezers in a technician's black-gloved hands, the straight pair isolating a single natural lash on the client's lash line" },
      },
      {
        name: "Pick up the extension and dip it",
        text: "With the curved tweezers in your dominant hand, pick up an extension near its base, where it is thick and straight. Dip only the base into the glue drop, about 1–2 mm, and draw it out gently. The glue should be thin and even, with no blob.",
        image: { src: img("nhung-chan-soi-mi-vao-giot-keo"), alt: "Curved tweezers hold an extension whose base touches a black drop of glue on a jade stone" },
      },
      {
        name: "Place it just off the lid",
        text: "Lay the extension along the isolated natural lash, in the same direction. Its base sits about 0.5–1 mm from the eyelid skin and never touches it. Press gently so it lies snugly, hold still a moment for the glue to grab, release the curved tweezers first and the isolation tweezers last.",
        image: { src: img("gan-soi-mi-noi-doc-theo-mi-that"), alt: "A technician uses curved tweezers to lay an extension along a natural lash held apart by the straight tweezers" },
      },
      {
        name: "Check for stickies",
        text: "After each zone, glide the straight tweezers from root to tip. Every lash must stand alone; separate any sticky at once. Keep the length rule: shortest at the inner corner, gradually longer towards the outer corner.",
      },
      {
        name: "Finish",
        text: "Brush the lashes again and compare both eyes: length, fullness and curl must be balanced. Remove the pads very gently while the client's eyes are still closed, then ask her to open them slowly. If her eyes sting or water, let her close them again and rest a moment.",
      },
      {
        name: "Give aftercare and clean up",
        text: "Tell the client to keep the lashes dry as the glue maker advises, avoid oil-based products at the lash base, brush daily, and book her refill for 2–3 weeks later. Then bin the single-use items, clean and disinfect the tweezers, and wipe down the bed and table.",
      },
    ],
  },
  faq: [
    {
      q: "How long does a classic lash set take?",
      a: "A full classic set usually takes about one and a half to two hours. The client lies still with her eyes closed the whole time, so the technician makes her really comfortable from the start.",
    },
    {
      q: "What is the difference between classic and volume lash extensions?",
      a: "Classic is 1:1, one extension per natural lash, for a natural, separated look. Volume attaches a fan of several very fine extensions to one natural lash for a fuller lash line. The isolating, dipping and placing of classic are the foundation for learning volume.",
    },
    {
      q: "How far from the eyelid should lash extensions be placed?",
      a: "About 0.5–1 mm, and never touching the skin. Glue or an extension on the eyelid feels scratchy and can cause irritation.",
    },
    {
      q: "When can you wash your face after lash extensions?",
      a: "Follow the time the glue maker advises, usually 24–48 hours with no water on the lashes, no steam and no swimming. After that, oil-based products at the lash base are still best avoided.",
    },
    {
      q: "What should you do if the client's eyes sting during lash extensions?",
      a: "Stop, let her rest with her eyes closed, and check whether a pad is touching the waterline. If any glue gets into the eye, rinse at once with plenty of clean water and send the client to a doctor.",
    },
    {
      q: "How often do lash extensions need a refill?",
      a: "After about 2–3 weeks. Book the refill before the client leaves so she does not have to remember it.",
    },
  ],
  related: ["mi-classic-hieu-dung", "mi-chuan-bi", "mi-volume", "mi-dam-thao"],
};

export default article;
