import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-volume/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-volume-lashes",
  lesson: "mi-volume",
  category: "lash",
  title: "How to do volume lashes: 10 steps to make fans by hand and place them on the natural lash",
  metaTitle: "How to do volume lashes: 10 steps to make and place fans",
  metaDescription:
    "Volume lashes with handmade fans: picking lashes off the strip, opening the fan, checking it, gluing only the base and placing it 0.5–1 mm from the lid.",
  keyword: "how to do volume lashes",
  keywords: [
    "how to make volume lash fans",
    "handmade volume fans",
    "volume lash extension steps",
    "volume lashes for beginners",
    "how much glue for volume fans",
    "volume tweezers",
    "learning volume lashes",
  ],
  excerpt: "The ten steps of a volume set with handmade fans: picking, opening, checking, gluing, placing and checking for stickies, plus the fans that belong in the bin.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-volume-cho-khach-trong-studio"),
    alt: "A lash technician in a cream top leans over a client lying under a blanket on the lash bed, a small gold-edged side table holding the tool tray beside them",
  },
  takeaways: [
    "Three things hold for the whole set: the client's eyes stay closed, **each fan goes on exactly one natural lash**, and glue never touches the skin.",
    "Making a fan: grip a few lashes lightly near the tips, slide the tweezers towards the base so they spread, then **close the tweezers at the base** for a small, neat base.",
    "Check every fan before the glue. A lopsided fan, a wide base, lashes stuck in pairs or a big blob of glue: throw it away and make a new one.",
    "Touch only the **base of the fan to the edge of the glue drop**; the base wraps the natural lash about 0.5–1 mm from the lid.",
    "Alternate zones, and after each zone run the tweezers through and look at the lashes from several angles for stickies.",
  ],
  intro: [
    "How to do volume lashes differs from classic in exactly one stage: before attaching anything, the technician makes the fan. A few very fine lashes are taken off the strip, opened with one slide of the tweezers and closed at the base, and only then come the glue and the natural lash. The rest, from isolation to checking for stickies, are moves you already know from classic.",
    "This article follows the VaraaAi Academy lesson “Volume lashes: making fans step by step” in the Lashes course. Watch the lesson video below to see how the tweezers move, then read each step and practise making fans on a lash tile until your hands are consistent, before working on clients.",
  ],
  sections: [
    {
      id: "before-you-start",
      title: "Before a volume set: three things that hold throughout",
      blocks: [
        { p: "Every volume set rests on three things that never change:" },
        {
          ul: [
            "The client's eyes stay closed from start to finish.",
            "Each fan goes on exactly one natural lash.",
            "Glue never touches the skin.",
          ],
        },
        { p: "The preparation is identical to the practice article on [how to do classic lash extensions](lesson:mi-classic): consultation and allergy questions, a comfortable position, cleansing, under-eye pads and brushing. If those moves are not yet second nature, go back to classic before practising volume." },
        { p: "Why volume lashes have to be so fine, and which client gets 2D or 5D, is explained in the theory article [What are volume lash extensions](lesson:mi-volume-hieu-dung). This article is only about the hands." },
      ],
    },
    {
      id: "fans-to-keep",
      title: "Handmade volume fans: which to keep, which to bin",
      blocks: [
        { p: "How wide a fan opens changes the feel of the whole set. A narrow fan gives a sharper look, a wide fan a fuller, softer one. The limit is the lash next door: a fan opened too wide will touch it." },
        {
          table: {
            head: ["What you see", "Why it is a problem", "What to do"],
            rows: [
              ["Lopsided fan, wide base, lashes stuck in pairs", "The fan is heavy and easily catches the next natural lash", "Bin it and make a new one before taking glue"],
              ["A big blob of glue on the base", "Glue creeps up between the lashes and clumps the fan", "Bin that fan, without regret"],
              ["Fan placed but crooked, flipped or twisted", "It does not wrap the natural lash", "Remove it at once before the glue grabs and make a new fan; never try to fix it once the glue is dry"],
              ["The glue drop on the stone has thickened", "Old glue bonds poorly", "Change the drop often, as the glue maker advises"],
            ],
          },
        },
        { note: "Remaking a fan takes a few seconds. Putting a bad fan on a client's eye costs far more. Practise making fans on a tile every day until they are even, and only then think about speed.", kind: "tip", title: "Practise on the tile first" },
      ],
    },
    {
      id: "distance-and-length",
      title: "Distance from the lid and length zone by zone",
      blocks: [
        { p: "The base of the fan sits about **0.5–1 mm** from the eyelid skin and never touches it. Glue on the skin causes scratchiness, itching, sometimes irritation, and pulls the lash as it grows. Placed too far out, the fan is loose and falls early." },
        { p: "For length, the inner corner is shortest and the lashes get gradually longer towards the outer corner. The number of lashes in a fan changes by zone too:" },
        {
          table: {
            head: ["Zone", "Natural lashes there", "Suitable fan"],
            rows: [
              ["Inner corner", "Short and weak", "Fewer lashes, short and light"],
              ["Middle and outer corner", "Usually stronger", "Can take more lashes, always within what each lash can carry"],
            ],
          },
        },
        { p: "Choosing a style for each eye shape is the subject of [lash mapping](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "checking-stickies",
      title: "Checking for stickies in a volume set",
      blocks: [
        { p: "A fan is wider than a classic extension, so a single neighbouring natural lash left close by is enough for the glue to catch it. Prevention starts at isolation: isolate cleanly so the natural lash stands completely apart." },
        { p: "After each zone, glide the straight tweezers lightly through the lashes from root to tip. Each fan must stand on its own natural lash. If you find a sticky, separate it at once, very gently. Look at the lashes from above and from the side as well, because some stickies only show at an angle." },
      ],
    },
    {
      id: "aftercare-cleanup",
      title: "Aftercare and clean-up after a volume set",
      blocks: [
        { p: "The aftercare for a volume client is the same as for classic:" },
        {
          ul: [
            "Keep the lashes dry for as long as the glue maker advises.",
            "No oil-based products at the lash base.",
            "Brush the lashes every day.",
            "No rubbing.",
            "Come back for a refill after 2–3 weeks.",
          ],
        },
        { p: "Once the client has gone, used wands, swabs and pads go into a lidded bin. Tweezers are cleaned and disinfected after every client, following the routine in [Tools after every customer](lesson:ve-sinh-dung-cu)." },
        { img: { src: img("lam-sach-nhip-noi-mi-sau-moi-khach"), alt: "A black-gloved hand drops two pairs of tweezers into a glass container of solution on a stone surface, next to a lidded bin holding used lash wands", caption: "After each client: single-use items into a lidded bin, tweezers off to be cleaned and disinfected." } },
      ],
    },
    {
      id: "booking-volume",
      title: "Your first volume sets take time: book them realistically",
      blocks: [
        { p: "At first, a volume set takes a very long time, much longer than classic. That is normal. With every set your hands become more even and faster." },
        { p: "The salon calendar should reflect that real pace. In VaraaAi, set the duration of the volume [service](lesson:dich-vu) to each technician's actual speed so the calendar does not overrun, and book the refill in the [calendar](lesson:lich-hen) while the client is still in the salon. The number of lashes and the lengths used in each zone can go in the [client's profile](lesson:khach-hang) so the next set matches." },
        { note: "Distances, thickness and lashes per fan here are general trade guidance; always follow the lash maker's chart and the glue maker's instructions on humidity, temperature and keep-dry time. Rules on beauty services and products differ from country to country. This article is a training aid, not a licence.", kind: "info", title: "Note" },
      ],
    },
  ],
  howTo: {
    title: "How to do volume lashes with handmade fans, step by step",
    id: "volume-lash-steps",
    after: "before-you-start",
    lead: "Ten steps in the order of the lesson video. Steps three to six are what makes volume different: making the fan and taking the glue.",
    supplies: [
      "Volume lash trays with very fine lashes, sorted by length",
      "Lash glue and a jade stone for the drop",
      "Straight tweezers for isolating",
      "Long, angled volume tweezers for making and placing fans",
      "Under-eye pads and lash cleansing supplies as in the classic lesson",
      "Single-use lash wands and small cotton swabs",
    ],
    steps: [
      {
        name: "Prepare as for classic",
        text: "Consultation and allergy questions, a comfortable position, cleansing, under-eye pads and brushing. While brushing, look closely at the natural lashes in each zone to decide how many lashes go in each fan: strong lashes take more, weak lashes fewer and lighter.",
        image: { src: img("chai-mi-va-quan-sat-mi-that-tung-vung"), alt: "A black-gloved hand brushes a client's natural lashes with a single-use lash wand, the client's eyes closed and a white pad under the eye" },
      },
      {
        name: "Set up your station",
        text: "Lay out the volume lash trays sorted by length, a jade stone with a fresh drop of glue, straight tweezers, volume tweezers, and single-use wands and swabs. Cap the glue bottle straight after taking the glue.",
        image: { src: img("dung-cu-noi-mi-volume-tren-khay"), alt: "A white stone tray with gold edging holding volume lash strips sorted by length, a jade stone with a glue drop, two tweezers, a black glue bottle and a cup of lash wands" },
      },
      {
        name: "Pick a few lashes off the strip",
        text: "Lay the tips of the volume tweezers across a few lashes on the strip, near the lash tips. Take as many lashes as you want in the fan; while you are learning, count them. Grip as lightly as if holding a thread, and work in from the edge of the strip so the remaining lashes stay neat.",
        image: { src: img("lay-vai-soi-mi-volume-tren-dai-bang-nhip"), alt: "A black-gloved hand lowers volume tweezers onto a strip of fine lashes on a pink tile, gripping a few lashes near their tips" },
      },
      {
        name: "Slide the tweezers to open the fan",
        text: "Keeping that light grip, slide the tweezers slowly towards the base of the lashes and they spread out by themselves. Some technicians roll or tilt the tweezers instead; either way is fine. Finish by closing the tweezers at the base so it is very small and neat, then lift the fan off the strip. Do not open it too wide.",
        image: { src: img("truot-nhip-mo-fan-mi-volume"), alt: "Volume tweezers lift a few fine lashes off a strip on a pink tile, the lashes spreading into a fan shape from the point gripped at the base" },
      },
      {
        name: "Check the fan before the glue",
        text: "Look at three things: is the base small and closed, are the lashes spread evenly and symmetrically, is the number of lashes right? A lopsided fan, a wide base or two lashes stuck together goes in the bin, and you make another.",
      },
      {
        name: "Touch the base to the edge of the glue drop",
        text: "Only the base of the fan touches the edge of the glue drop, very lightly, then comes out. Do not dip deep, and do not let the glue creep up between the lashes. A thin coat, just enough. A fan that picks up a big blob of glue is binned and remade.",
        image: { src: img("cham-chan-fan-vao-giot-keo-noi-mi"), alt: "Volume tweezers hold an evenly spread fan whose base lightly touches a black glue drop on a jade stone held in a gloved hand" },
      },
      {
        name: "Isolate exactly one natural lash",
        text: "Hold the straight tweezers in your non-dominant hand and isolate a single natural lash, as in classic. Isolate cleanly: the fan is wide, so one neighbouring lash left close by will be caught by the glue.",
      },
      {
        name: "Place the fan so it wraps the lash",
        text: "Set the base of the fan on the isolated natural lash so it wraps around it, in the direction of growth, about 0.5–1 mm from the eyelid skin. Press gently along the lash, hold still a moment for the glue to grab, then release. The fan must sit evenly, not flipped or twisted; if it is crooked, remove it at once before the glue sets.",
        image: { src: img("gan-fan-volume-len-mot-soi-mi-that"), alt: "Two black-gloved hands with two tweezers: the straight pair isolating the client's lashes, the volume pair lowering a fan onto the isolated natural lash" },
      },
      {
        name: "Alternate zones and check for stickies",
        text: "Do not place fans on lashes that sit right next to each other one after another. Place one at the outer corner, then the middle, then the inner corner, then go back, so the glue of the previous fan has time to cure. After each zone, glide the straight tweezers from root to tip and separate any sticky at once.",
      },
      {
        name: "Finish, give aftercare and clean up",
        text: "Brush the lashes again and compare both eyes so they match. Remove the pads very gently while the client's eyes are still closed, then let her open them slowly; if her eyes sting or water, let her close them and rest a moment. Give aftercare, book a refill in 2–3 weeks, then bin the single-use items and disinfect the tweezers.",
        image: { src: img("go-mieng-lot-sau-khi-noi-mi"), alt: "A black-gloved fingertip gently lifts the outer edge of the white pad under a client's eye, the eye still closed with the finished lash set" },
      },
    ],
  },
  faq: [
    {
      q: "How do you make volume lash fans by hand?",
      a: "Lay the tips of the volume tweezers across a few lashes on the strip, near the tips, and grip very lightly. Slide the tweezers slowly towards the base so the lashes spread, then close the tweezers at the base for a small, neat base and lift the fan off. Some technicians roll or tilt the tweezers to open the fan; any method works as long as the base closes.",
    },
    {
      q: "How much glue do you use on a volume fan?",
      a: "Only the base of the fan touches the edge of the glue drop, then comes out gently, with no deep dipping. Glue that creeps up between the lashes makes the fan heavy, clumps it and causes stickies. A fan with a big blob of glue is thrown away and remade.",
    },
    {
      q: "How far from the eyelid should a volume fan be placed?",
      a: "About 0.5–1 mm, and never touching the skin. Glue on the skin causes scratchiness, itching, sometimes irritation, and pulls the lash as it grows. Placed too far out, the fan is loose and falls early.",
    },
    {
      q: "What do you do if a volume fan sits crooked?",
      a: "Remove it at once, before the glue grabs, and make a new fan. Never try to straighten it once the glue is dry. A fan that sits crooked or wraps two natural lashes pulls on them and makes them shed early.",
    },
    {
      q: "How long does a volume lash set take?",
      a: "Your first volume sets take a very long time, much longer than classic, because every fan is made and checked before it is placed. Speed builds up set by set as your fans become even. A salon should set the service duration to each technician's real pace.",
    },
    {
      q: "Where should a beginner start with volume lashes?",
      a: "With classic first, because the preparation, isolation and sticky checks in volume are exactly the same. Then practise making fans on a lash tile every day until they are consistent, and only then think about speed and working on clients.",
    },
  ],
  related: ["mi-volume-hieu-dung", "mi-classic", "mi-hybrid", "mi-mega-wispy"],
};

export default article;
