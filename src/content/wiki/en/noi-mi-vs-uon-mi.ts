import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mi-vs-uon-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "lash-lift-vs-lash-extensions",
  lesson: "noi-mi-vs-uon-mi",
  category: "tips",
  title: "Lash lift vs lash extensions: cost, how long they last and how they feel",
  metaTitle: "Lash lift vs lash extensions: cost, wear time and feel",
  metaDescription:
    "Lash lift vs lash extensions: treatment time, Moja Beauty's prices, how long each lasts, how it feels on the eye and the aftercare, plus how to choose for you.",
  keyword: "lash lift vs lash extensions",
  keywords: ["lash lift or extensions which is better", "how long does a lash lift last", "how long do lash extensions last", "lash lift vs extensions cost", "lash lift on short lashes", "lash lift after extensions"],
  excerpt: "A lash lift curls your own natural lashes; extensions add new lashes for fullness and length. Here the two sit side by side: time, cost, wear, feel and aftercare.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-lam-mi-cho-khach-nam-tren-giuong-studio"),
    alt: "A technician in black gloves holds two pairs of tweezers while working on the lashes of a client lying with closed eyes on a cream bed in a marble studio",
  },
  takeaways: [
    "A **lash lift** curls your own natural lashes and adds nothing; **lash extensions** attach new lashes to your natural ones for fullness and length.",
    "At Moja Beauty: a lash lift is 30 € and takes about 60 minutes; classic extensions are 39 €, take about 90 minutes and need regular refills.",
    "A lash lift holds for about 6–8 weeks; extensions shed gradually with your natural lashes, so a refill is due after 2–3 weeks.",
    "For a natural, low-maintenance look choose a lift; for clearly fuller, longer lashes choose extensions.",
    "A lash lift needs natural lashes of some length; very short lashes are hard to lift into a nice shape.",
  ],
  intro: [
    "Lash lift vs lash extensions is the question many people ask before their first lash appointment. Both make your lashes look better, but they differ more than you might think: one curls your own natural lashes, the other adds new ones. That leads to differences in cost, how long the result lasts, how it feels on the eye and how much care it needs.",
    "This article follows the lesson “Lash extensions or a lash lift: cost, how long they last and how they feel” from the Moja Beauty course at VaraaAi Academy, short videos for customers from the Moja Beauty salon in Helsinki. The prices are Moja Beauty's own, VAT included. By the end you will know which option suits your natural lashes and your routine.",
  ],
  sections: [
    {
      id: "basic-difference",
      title: "How a lash lift and lash extensions differ",
      blocks: [
        { p: "A **lash lift** adds no lashes at all. The technician combs your natural lashes up onto a silicone shield stuck to the lid, applies a softening solution so the lashes take on a new curve, then a second solution that sets that shape. The result is your own lashes, curled up and looking longer because the tips no longer point down." },
        { img: { src: img("dan-khuon-silicone-sat-chan-mi-khi-uon-mi"), alt: "A black-gloved finger places a pale pink silicone shield close to the lash line of a client's closed eye, a white pad under the eye", caption: "Lash lift: the natural lashes are combed onto a silicone shield at the lash line." } },
        { p: "**Lash extensions** attach new lashes to each natural lash with a professional adhesive, a small distance from the lid. With classic extensions, each natural lash carries one extension. The lash line becomes clearly fuller and longer than your natural lashes." },
        { img: { src: img("khay-dung-cu-noi-mi-vi-mi-keo-va-nhip"), alt: "A gold-rimmed marble tray with strips of extensions sorted by length, a glue bottle, a jade stone, two pairs of tweezers and a lash brush", caption: "Extensions: one extension is attached to each natural lash." } },
      ],
    },
    {
      id: "cost-and-wear",
      title: "Lash lift vs extensions: cost, time and how long they last",
      blocks: [
        {
          table: {
            head: ["", "Lash lift", "Classic extensions"],
            rows: [
              ["Price at Moja Beauty", "30 €", "39 €"],
              ["Treatment time", "About 60 minutes", "About 90 minutes"],
              ["Lasts", "About 6–8 weeks", "Refill after 2–3 weeks"],
              ["Next visit", "A new lift once new lashes have grown", "Regular refills"],
            ],
          },
        },
        { p: "On the price of a single visit, the two are not far apart. The difference is how often you go back. A lash lift holds for about six to eight weeks, close to the life cycle of a lash: once new lashes have grown in straight, you have a new lift. Extensions shed gradually with your natural lashes, so after two to three weeks you need a refill to keep the lash line from looking sparse and uneven." },
        { note: "The prices in the table are Moja Beauty's in Helsinki, VAT included. Every salon has its own price list; check the price of a refill on the booking page of the salon you choose.", kind: "info", title: "About prices" },
      ],
    },
    {
      id: "how-it-feels",
      title: "How it feels on the eye, and the care it needs",
      blocks: [
        { p: "After a lift, the lashes are still your own. The lesson describes the feeling as if nothing had been done. There are no extra lashes and no glue, so you hardly have to think about your lashes in everyday life." },
        { img: { src: img("khach-voi-mi-that-sau-khi-uon-cong-tu-nhien"), alt: "A blonde woman looking straight into the camera with her natural lashes curled up naturally after a lift, no eye make-up", caption: "After a lift: natural lashes curled up, as light as if nothing had been done." } },
        { p: "Extensions make the lashes clearly fuller and longer, but in return they need more care: no rubbing your eyes, no oily products around the eyes, and washing and brushing the lashes the right way. None of it is hard; it just needs to become a habit. The lesson [how to wash lash extensions at home](lesson:rua-mi-noi-tai-nha) goes through it step by step." },
        { img: { src: img("khach-voi-bo-mi-noi-classic-day-va-dai-hon"), alt: "A blonde woman looking slightly down with a black classic extension set, longer and fuller than natural lashes, each lash separate", caption: "Classic extensions: clearly fuller and longer than natural lashes." } },
        {
          table: {
            head: ["First day and after", "Lash lift", "Extensions"],
            rows: [
              ["Keep lashes dry", "First 24 hours, so the solution settles", "First 24 hours, so the glue settles"],
              ["Steam, sauna", "Avoid for the first 24 hours", "Avoid for the first 24 hours"],
              ["Rubbing, pulling, picking", "No", "No"],
              ["Oily make-up remover near the eyes", "Ask your technician", "Avoid for good, oil softens the glue"],
            ],
          },
        },
      ],
    },
    {
      id: "which-to-choose",
      title: "Lash lift or extensions: which is better for you",
      blocks: [
        { p: "The lesson's short answer: for a natural, easy look choose a lash lift; for clearly fuller and longer lashes choose extensions. A few more points help you decide faster:" },
        {
          ul: [
            "Natural lashes of a decent length that grow straight or point down: a lift usually looks great, because lifting the tips is enough to open up the eyes.",
            "Very short natural lashes: hard to lift into a nice shape. Extensions can do more.",
            "Sparse natural lashes and you want a full lash line: a lift cannot add lashes, so extensions suit you better.",
            "You do not want a refill every two to three weeks: a lift is easier on your schedule.",
            "You are wearing extensions and want to switch to a lift: the extensions have to be removed at the salon first.",
          ],
        },
        { img: { src: img("mi-that-da-uon-cong-duoc-go-khoi-khuon"), alt: "A technician in black gloves uses a small stick to lift the curled natural lashes away from the silicone shield on a client's closed eye" } },
        { p: "If you choose extensions, the next step is the style: Classic, Hybrid, Volume or Mega. [Types of lash extensions](lesson:4-kieu-noi-mi) compares the four on the same face. The technician's side of a lash lift, such as shields and processing times, is covered in [what a lash lift is](lesson:lash-lift-hieu-dung)." },
      ],
    },
    {
      id: "safety",
      title: "Safety: what to know for both",
      blocks: [
        { p: "A lash lift and lash extensions both use chemicals near the eyes: the lifting solutions, the tint if you have one with the lift, and the lash adhesive. So:" },
        {
          ul: [
            "Tell your technician if your eyes are red, itchy or watering, if you have recently had eye surgery, or if you have ever reacted to lash glue, lifting solution or tint. The technician will then not do the treatment, and that is the right decision.",
            "If you have a tint with your lift, many brands require a skin test first, usually 48 hours before the appointment.",
            "Your eyes stay closed throughout. If anything stings or burns, say so straight away so the technician can stop.",
          ],
        },
        { img: { src: img("bo-dung-cu-uon-mi-khuon-silicone-va-thuoc"), alt: "A white stone tray with a gold rim holding pink silicone lash lift shields in several sizes, sachets of solution, small bottles, lash combs and cotton pads" } },
        { note: "Any eye health problem, such as redness that does not settle, swelling or blurred vision after a treatment, needs to be checked by a doctor. The article on [gel nail allergy, lash glue and hair dye reactions](lesson:di-ung-hoa-chat) lists the signs to watch for.", kind: "warn", title: "When to see a doctor" },
        { p: "Still unsure? Ask Moja Beauty to help you choose, and [book with Moja Beauty](/b/moja-beauty) on VaraaAi: choose the service, choose the time and you are done." },
      ],
    },
  ],
  faq: [
    {
      q: "How long does a lash lift last?",
      a: "A lash lift usually holds for about six to eight weeks. Once new lashes have grown in straight, you have a new lift; do not have one sooner than the product maker advises.",
    },
    {
      q: "How long do lash extensions last?",
      a: "Extensions shed gradually with your natural lashes, so after two to three weeks the lash line starts to look sparse. That is when you have a refill to fill the gaps instead of starting again from scratch.",
    },
    {
      q: "Is a lash lift cheaper than lash extensions?",
      a: "At Moja Beauty, a lash lift costs 30 € and classic extensions 39 €, VAT included. Beyond the price of one visit, think about how often you return: extensions need a refill after two to three weeks, a lift is redone after six to eight weeks.",
    },
    {
      q: "Does a lash lift feel heavy?",
      a: "No. After a lift the lashes are still your own, with no extra lashes and no glue, so it feels as if nothing had been done.",
    },
    {
      q: "Can you get a lash lift on short lashes?",
      a: "Very short lashes are hard to lift into a nice shape. A lift suits natural lashes of a decent length that grow straight or point downwards best; for short or sparse lashes, extensions can usually do more.",
    },
    {
      q: "Can I get a lash lift while wearing extensions?",
      a: "The extensions need to be removed at the salon before a lift. Do not pull them off yourself, because that easily takes natural lashes with them.",
    },
  ],
  related: ["4-kieu-noi-mi", "cham-soc-sau-lam-mi", "do-cong-theo-mat", "lash-lift-hieu-dung"],
};

export default article;
