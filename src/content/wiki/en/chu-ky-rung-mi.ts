import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chu-ky-rung-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "is-it-normal-to-lose-eyelashes-every-day",
  lesson: "chu-ky-rung-mi",
  category: "tips",
  title: "Is it normal to lose eyelashes every day? The three stages of a lash and why extensions fall out with them",
  metaTitle: "Is it normal to lose eyelashes every day? Lash growth cycle",
  metaDescription:
    "Losing 2–5 lashes a day is normal. The three stages of a lash (growth, transition, rest and shedding), why extensions fall with them and why not to pull lashes.",
  keyword: "is it normal to lose eyelashes every day",
  keywords: ["eyelash growth cycle", "how many eyelashes do you lose a day", "why do my lash extensions fall out", "do eyelashes grow back if pulled out", "how long do eyelashes take to grow", "losing lots of eyelashes"],
  excerpt: "Finding a few lashes every morning is normal. Each lash goes through three stages, and extensions fall out with your natural lashes, not because something is wrong.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("co-gai-nhin-len-voi-hang-mi-noi-day"),
    alt: "A blonde woman turned three-quarters, eyes open and looking up into the distance, her full black lash extensions clearly visible in soft light",
  },
  takeaways: [
    "Losing **2–5 lashes a day** is normal, because each lash is at a different stage.",
    "Every lash goes through three stages: **growth** (about 4–6 weeks), **transition** (2–3 weeks) and **rest** (a few months), then it sheds.",
    "Extensions sit on natural lashes, so when a natural lash sheds the extension goes with it; that does not mean something is wrong.",
    "Do not pull or pluck your lashes: the new lash grows back more slowly.",
    "A refill after 2–3 weeks fills the gaps left by natural shedding.",
  ],
  intro: [
    "Is it normal to lose eyelashes every day? Yes. Finding a few lashes on your pillow or cheek in the morning happens to everyone, with or without extensions. Each lash has its own life cycle in three stages, and when a lash reaches the end of it, it falls out so a new one can grow in its place.",
    "This article follows the lesson “Why losing 2–5 lashes a day is normal” from the Moja Beauty course at VaraaAi Academy, short videos for customers from the Moja Beauty salon in Helsinki. By the end you will understand the three stages of a lash, why extensions fall out little by little, and why a refill every two to three weeks makes sense.",
  ],
  sections: [
    {
      id: "three-stages",
      title: "The eyelash growth cycle: three stages for every lash",
      blocks: [
        { p: "A lash does not grow for ever. Each one goes through three stages: growth, transition, then rest and shedding. The figures below are the usual ranges given in the lesson; everyone differs a little." },
        {
          table: {
            head: ["Stage", "Lasts", "The lash at this point"],
            rows: [
              ["Growth", "About 4–6 weeks", "Gets longer every day; still short and fine"],
              ["Transition", "2–3 weeks", "Stops getting longer"],
              ["Rest", "A few months", "Stays put, then sheds for a new lash"],
            ],
          },
        },
        { h3: "Growth stage" },
        { p: "For about four to six weeks, the lash gets longer every day. A growing lash is still short and fine. That is why a lash technician chooses light extensions for these lashes: a young lash cannot yet carry a long, heavy extension." },
        { img: { src: img("mi-that-co-soi-dai-khoe-va-soi-ngan-non"), alt: "Close-up of a client's closed eye with natural lashes that mix long, strong lashes with short, fine ones that are still growing", caption: "Every lid always has long, strong lashes and short, young ones." } },
        { h3: "Transition stage" },
        { p: "This stage lasts only two to three weeks, and the lash stops growing. Do not pull or pluck your lashes now: a lash pulled out before its time makes the new one grow back more slowly." },
        { h3: "Rest stage" },
        { p: "The rest stage lasts a few months. The lash grows no longer, and at the end of the stage it falls out by itself so a new lash can replace it." },
      ],
    },
    {
      id: "why-2-5-lashes",
      title: "How many eyelashes do you lose a day, and why 2–5 is normal",
      blocks: [
        { p: "The lashes on one lid are not in step. At any moment some are growing, some are in transition, some are resting and some are about to shed. That is why the lash line never falls out all at once but renews itself lash by lash. A few lashes reach the end of their cycle every day, and losing two to five a day is normal." },
        { p: "A lash that has shed naturally often has a small, pale bulb at its root. If the lash you find has that little bulb, it was simply its time to go." },
        { note: "If lashes fall out in patches, far more than usual, or with redness, itching or swelling along the lid margin, that is no longer the normal cycle. See a doctor.", kind: "warn", title: "When it is not normal" },
      ],
    },
    {
      id: "extensions-fall-with-lashes",
      title: "Why lash extensions fall out: they go with your natural lashes",
      blocks: [
        { p: "Each extension is attached to one natural lash. When that natural lash reaches the end of its cycle and sheds, the extension goes with it. You will find an extension with a smaller natural lash running along it, a pale bulb at its root." },
        { img: { src: img("soi-mi-that-rung-tu-nhien-con-mang-soi-noi"), alt: "On the tip of a black-gloved finger lies a natural lash that has shed, with a small pale bulb at its root, still carrying a black extension", caption: "A natural lash that shed on its own, still carrying its extension." } },
        { p: "That does not mean the extensions or the glue are bad. It is the life cycle of your natural lashes. After two to three weeks, enough lashes have shed for the lash line to look sparse and uneven, and the remaining ones have grown out, carrying the bond further from the lid. That is the time for a refill." },
        { img: { src: img("tho-kiem-tra-tung-soi-mi-noi-khi-dam"), alt: "Tweezers in a technician's black-gloved hand check each extension on a client's closed eye during a refill" } },
        { p: "If you lose more than this, the cause usually lies elsewhere: oil around the eyes, rubbing, sleeping face down, or extensions that are too heavy for your natural lashes. The article [do lash extensions damage natural lashes](lesson:noi-mi-co-hai-mi-that) goes into this." },
      ],
    },
    {
      id: "longer-lasting-extensions",
      title: "Using the growth cycle to make extensions last",
      blocks: [
        { p: "A good technician works with the life cycle of your natural lashes. While brushing through, the technician looks at which lashes are long and strong and which are still short and young, then chooses a length and thickness for each one. A young lash that is too weak may be left bare until the next refill." },
        { img: { src: img("tho-do-do-dai-mi-that-bang-mot-soi-noi"), alt: "Tweezers in a technician's black-gloved hand hold an extension next to a natural lash at the outer corner of a client's eye to compare length", caption: "The technician compares the length of the natural lash before choosing the extension." } },
        {
          ul: [
            "**Do not pull or pluck your lashes**, not even an extension that catches. Pulling it takes the natural lash too, and the new one grows back more slowly.",
            "**Avoid oil around the eyes**, so the glue does not weaken before the natural lash is due to shed.",
            "**Wash and brush your lashes gently** every day, as in [how to wash lash extensions at home](lesson:rua-mi-noi-tai-nha).",
            "**Have a refill after 2–3 weeks** to fill the gaps where lashes have shed and to remove grown-out extensions.",
          ],
        },
        { img: { src: img("bo-mi-noi-hoan-thien-tren-mat-nham"), alt: "A client's closed eye with a full, even set of black extensions, a white pad under the eye" } },
      ],
    },
    {
      id: "choosing-a-lasting-style",
      title: "Choosing a style that lasts",
      blocks: [
        { p: "Because every lid has both strong and young lashes, the longest-lasting style is one your own lashes can carry. Strong, dense lashes can take volume fans; fine lashes with many young ones usually suit Classic or a light Hybrid better. The four styles are compared in [types of lash extensions](lesson:4-kieu-noi-mi), and refill timing is explained in [why refill lashes and nails on time](lesson:dam-mi-mong-dung-hen)." },
        { img: { src: img("tho-mi-ghi-ho-so-khach-tren-may-tinh-bang"), alt: "A lash technician with her hair in a bun sits at a marble table by a window, taking notes on a tablet next to a cup of tea and a vase of white flowers" } },
        { p: "A salon that uses VaraaAi can record the style, length and curl used in the internal notes on your client profile, so whoever does your next refill follows the same map. To find out which style will last best on your lashes, ask Moja Beauty or [book with Moja Beauty](/b/moja-beauty) on VaraaAi." },
      ],
    },
  ],
  faq: [
    {
      q: "How many eyelashes is it normal to lose a day?",
      a: "Losing about two to five lashes a day is normal. Each lash is at a different stage of its life cycle, so there are always a few that are due to fall out.",
    },
    {
      q: "What are the stages of the eyelash growth cycle?",
      a: "There are three: growth (about four to six weeks, the lash gets longer every day), transition (two to three weeks, the lash stops growing) and rest (a few months), after which the lash falls out and a new one replaces it.",
    },
    {
      q: "Why do my lash extensions keep falling out?",
      a: "Extensions are attached to natural lashes, so when a natural lash reaches the end of its cycle and sheds, the extension goes with it. Nothing is wrong; you just need a refill after two to three weeks.",
    },
    {
      q: "Do eyelashes grow back if you pull them out?",
      a: "A lash pulled out before its time usually grows back, but more slowly. That is why you should not pull or pluck your lashes, even when an extension catches.",
    },
    {
      q: "What should I do if I am losing a lot of eyelashes?",
      a: "If lashes fall out in patches, much more than usual, or with redness, itching or swelling along the lid margin, see a doctor. That is no longer the normal life cycle of a lash.",
    },
    {
      q: "Why does the technician not put long extensions on every lash?",
      a: "Growing lashes are still short and fine and cannot carry a long, heavy extension yet. The technician chooses light extensions for them so the natural lashes are not dragged down.",
    },
  ],
  related: ["noi-mi-co-hai-mi-that", "dam-mi-mong-dung-hen", "rua-mi-noi-tai-nha", "mi-classic-hieu-dung"],
};

export default article;
