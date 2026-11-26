import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-volume-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-are-volume-lash-extensions",
  lesson: "mi-volume-hieu-dung",
  category: "lash",
  title: "What are volume lash extensions? 2D–6D fans, extension thickness and what natural lashes can carry",
  metaTitle: "What are volume lash extensions? 2D–6D fans explained",
  metaDescription:
    "Volume lash extensions are a fan of very fine lashes on exactly one natural lash. Choosing 2D–6D by lash strength, a good fan, glue amount, stickies and refills.",
  keyword: "what are volume lash extensions",
  keywords: [
    "2D 3D volume lashes meaning",
    "do volume lashes damage natural lashes",
    "how long do volume lashes last",
    "volume lash fans",
    "promade vs handmade fans",
    "what D volume lashes should I get",
    "volume vs classic lashes",
  ],
  excerpt: "Volume gets its fullness from fans of very fine lashes, yet each fan still sits on one natural lash. This article explains 2D–6D, what a good fan looks like, glue amount and how long a set lasts.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-voi-bo-mi-volume-day-mem-va-toi"),
    alt: "Close-up portrait of a blonde client with a fresh set of volume lashes, the lash line full, dark, soft and gradually longer towards the outer corner",
  },
  takeaways: [
    "Volume lash extensions mean **a fan of a few very fine lashes on exactly one natural lash**. Fans are named by the number of lashes: 2D, 3D up to 6D.",
    "More lashes, less thickness: what a natural lash can carry does not change, so volume extensions are much finer than classic ones.",
    "Choose the number of D by the **strength of the natural lashes** first, the client's photo second. Fine, short, sparse lashes need no more than 2D–3D.",
    "A good fan has a small, closed base, evenly spread lashes and balanced sides. Glue touches only the base of the fan.",
    "Lashes still shed with their growth cycle, so clients come back for a refill after about **2–3 weeks**.",
  ],
  intro: [
    "What are volume lash extensions, and how do they differ from classic? The answer is the fan. Instead of one extension, the technician attaches to each natural lash a small fan of a few very fine lashes opening out from one shared base. The lash line becomes much fuller, softer and fluffier. The difficulty of volume is not adding lashes; it lies in one word: light.",
    "This article follows the VaraaAi Academy lesson “Volume lashes: understand them so they are full yet light” in the Lashes course. You will understand what 2D to 6D means, choose the number of lashes for each client's natural lashes, tell a good fan from one to throw away, and have an explanation ready when a client wants more fullness than her lashes can carry.",
  ],
  sections: [
    {
      id: "what-is-volume",
      title: "What volume lash extensions are",
      blocks: [
        { p: "In [classic lash extensions](lesson:mi-classic-hieu-dung), each natural lash carries one extension. Volume keeps the same attachment point and only changes what is attached: a **fan**, several very fine lashes gathered at one shared base and opening out like a small fan." },
        { p: "In the trade, fans are named by the number of lashes. Two lashes is 2D, three is 3D, and so on up to 6D. Fans with even more lashes are usually called mega volume and have their own lesson: [Mega volume and wispy](lesson:mi-mega-wispy-hieu-dung)." },
        { img: { src: img("bo-mi-volume-hoan-thien-nhin-gan"), alt: "Close-up of a closed eye with a fresh volume set, the lash line full and soft, short at the inner corner and longer towards the outer corner, resting on a pad", caption: "A finished volume set: full and fluffy, yet each fan still stands on its own natural lash." } },
        { note: "However many lashes a fan has, its base wraps exactly one natural lash. A fan around two or three natural lashes is a sticky: lashes on different growth schedules pull on each other, the client feels it and lashes shed early.", kind: "warn", title: "What never changes" },
      ],
    },
    {
      id: "why-finer",
      title: "Why one natural lash can carry a whole fan",
      blocks: [
        { p: "Because volume extensions are much finer than classic ones. Think of the natural lash as a small twig: what it can carry stays the same. As the number of lashes goes up, each one has to get finer and lighter. A fan of a few very fine lashes can weigh about as much as one thick classic extension." },
        { img: { src: img("so-sanh-soi-mi-classic-va-fan-volume"), alt: "On a pale pink tile, a thick black classic extension lies on the left and a volume fan of five very fine lashes sharing one base on the right", caption: "Left, one classic extension; right, a five-lash fan. The lashes in the fan are much finer." } },
        { p: "An easy rule to remember: **more lashes, less thickness**. There is no single figure for the thickness of each fan type; check the chart from the lash brand you use." },
      ],
    },
    {
      id: "how-many-d",
      title: "What D volume lashes to choose: look at the natural lashes first",
      blocks: [
        { p: "The number of D is not just the client's wish. The technician looks at the natural lashes in each zone of the eye before deciding." },
        {
          table: {
            head: ["The client's natural lashes", "Fan to choose"],
            rows: [
              ["Strong, long and thick", "Can carry fans with more lashes"],
              ["Fine, short, sparse, or many baby lashes", "Fewer, finer and shorter lashes: 2D or 3D is enough"],
              ["The inner corner of the eye", "Lighter fans, because the natural lashes there are usually shorter and weaker"],
            ],
          },
        },
        { p: "A very common situation: the client shows a photo of very full, dramatic lashes and wants exactly that, while her own lashes are fine and sparse. Do as she asks and the heavy fans drag the natural lashes down, the roots take the strain, and lashes can fall out early in patches. A few months later her natural lash line is visibly thinner. Then the client does not blame the heavy lashes. She blames the salon." },
        { img: { src: img("loi-fan-volume-qua-nang-so-voi-mi-that"), alt: "Close-up of a closed eye with fans that are too thick and too long, drooping onto the pad, crossing each other and leaving a few gaps", caption: "Illustration of a mistake: fans too heavy for fine, sparse natural lashes. The lashes droop, tangle and already show gaps." } },
        { note: "A client brings a photo of very full lashes but has fine natural lashes: show her her own lashes in the mirror and explain why you are going lighter today. A client who understands trusts you, and comes back.", kind: "tip", title: "Use the mirror" },
      ],
    },
    {
      id: "good-fan",
      title: "What a good volume fan looks like",
      blocks: [
        { p: "Before a fan touches the glue, the technician checks three things:" },
        {
          ol: [
            "**A small, closed base**, almost as narrow as one lash. Only a narrow base wraps around the natural lash, holds firmly and stays clear of the lash next to it.",
            "**Evenly spread lashes**, with the same gap between them and none stuck together.",
            "**A balanced fan**, the same on both sides and opened just the right amount.",
          ],
        },
        { img: { src: img("fan-volume-dep-chan-nho-xoe-deu"), alt: "Angled volume tweezers hold a five-lash fan with a small closed base and evenly spread lashes above a jade stone with a drop of glue", caption: "A good fan: the base closes almost to a single lash, the lashes spread evenly on both sides." } },
        { p: "A fan with a wide base, a lopsided spread or lashes stuck together is heavy, easily catches the next natural lash and makes the lash line look messy." },
        { img: { src: img("loi-fan-volume-chan-be-xoe-lech"), alt: "Volume tweezers hold a failed fan: a wide base, lashes spread unevenly to one side and two lashes stuck together", caption: "Illustration of a fan to discard: wide base, lopsided spread, lashes stuck in pairs." } },
        { h3: "Promade fans and handmade fans" },
        { p: "Promade fans come with the base already joined by the maker. There is nothing wrong with using them, especially while you are learning or when a client is short of time. Choose ones with a small, neat base, and still look closely at each fan before you attach it." },
        { img: { src: img("fan-volume-lam-san-promade-tren-vi"), alt: "A pale pink tile holding rows of identical pre-made volume fans with their bases facing one way, a pair of tweezers beside them", caption: "Promade fans lined up on a tile." } },
        { p: "Making fans by hand is the real skill, because you choose the number of lashes, the spread and the length to suit each natural lash. Picking lashes off the strip, sliding the tweezers to open the fan and closing the base are taught in the practice article on [how to do volume lashes](lesson:mi-volume)." },
        { img: { src: img("tho-mi-soi-fan-volume-truoc-khi-gan"), alt: "A lash technician with her hair in a high bun and black gloves sits by a studio window, holding tweezers at eye level to inspect them in daylight", caption: "Promade or handmade, every fan is checked in good light before it is attached." } },
      ],
    },
    {
      id: "glue-and-stickies",
      title: "Glue amount, stickies and speed",
      blocks: [
        { p: "Volume needs even less glue. Touch only the base of the fan to the glue drop, a very small amount. Some people think more glue holds better. It is the other way round: lashes last because the base of the fan wraps snugly around the natural lash, not because of a lump of glue." },
        {
          table: {
            head: ["Mistake", "What happens"],
            rows: [
              ["Too much glue on the fan base", "A heavy, stiff, lumpy base; glue creeps up between the lashes, clumps the fan and easily catches the next lash"],
              ["One lash of the fan touches the neighbouring natural lash", "A sticky: both lashes are pulled, the client feels it, natural lashes shed early"],
              ["Rushing to stay on time", "Too much glue, stickies, then more time spent fixing them"],
            ],
          },
        },
        { img: { src: img("loi-lay-qua-nhieu-keo-o-chan-fan"), alt: "Volume tweezers hold a fan with a big round lump of black glue at the base, the glue creeping up and sticking the lashes together", caption: "Illustration of too much glue: the base of the fan becomes a heavy, stiff lump." } },
        { p: "Stickies happen more easily in volume than in classic, because a fan is wide and has many lashes. Prevention is the same two habits: isolate cleanly, and check again after each zone." },
        { p: "New technicians often get impatient because a volume set takes a long time. Speed comes from technique: holding the tweezers correctly, making even fans, taking the right amount of glue and placing each fan once without taking it off to redo it. Work slowly but correctly, and after many sets your hands speed up on their own." },
      ],
    },
    {
      id: "how-long-volume-lasts",
      title: "How long volume lashes last",
      blocks: [
        { p: "How long a volume set lasts depends on three things:" },
        {
          ul: [
            "The natural lashes are cleansed thoroughly before the set.",
            "The room's humidity and temperature are within the range the glue maker recommends.",
            "The client looks after her lashes properly at home.",
          ],
        },
        { p: "Even when all three are right, the natural lashes still shed with their life cycle, and the fans go with them. That is why clients come back for refills, usually after 2–3 weeks." },
        { p: "Two safety points come with every set: tweezers are cleaned and disinfected after every client, as in [Tools after every customer](lesson:ve-sinh-dung-cu), and the glue, even its fumes, can cause allergies; the signs and what to do are in [Allergies and chemicals](lesson:di-ung-hoa-chat). Glue must never touch the skin." },
      ],
    },
    {
      id: "honest-talk",
      title: "Honest talk with clients, and booking volume treatments",
      blocks: [
        { p: "Volume looks its best when it suits the natural lashes. If a client's lashes are weak, explain gently that today you will go a little lighter so her natural lashes stay healthy, and next time it can be fuller. Clients who understand the reason trust the technician, and clients who trust come back." },
        { p: "In VaraaAi, create two separate [services](lesson:dich-vu), for example “Volume lashes” and “Volume refill”, with your salon's real durations, then book the client's refill in the [calendar](lesson:lich-hen) before she leaves. Volume clients return regularly, so a [loyalty card](lesson:the-khach-quen) stamped at every visit suits them well." },
        { note: "Thickness, length and lashes per fan in this article are general trade guidance, not exact figures: always check the lash maker's chart and the glue maker's instructions. Rules on beauty services and products differ from country to country. This article is a training aid, not a licence.", kind: "info", title: "Note" },
      ],
    },
  ],
  faq: [
    {
      q: "What do 2D, 3D and 6D mean in volume lashes?",
      a: "The number is the number of lashes in one fan: 2D is a fan of two lashes, 3D of three, and so on up to 6D. Whatever the number, each fan goes on exactly one natural lash.",
    },
    {
      q: "What is the difference between volume and classic lashes?",
      a: "Classic attaches one extension to one natural lash. Volume attaches a fan of a few very fine lashes to one natural lash, so the lash line looks fuller, softer and fluffier. Volume extensions are much finer than classic ones so the fan is not too heavy.",
    },
    {
      q: "Do volume lashes damage natural lashes?",
      a: "Natural lashes are harmed when a fan is too heavy for them, when one fan wraps two natural lashes, or when glue touches the skin. Heavy fans drag the lashes down and make them fall out early in patches. Choosing the number of lashes by the strength of the natural lash and keeping each fan on one lash avoids this.",
    },
    {
      q: "Can you get volume lashes with thin, sparse natural lashes?",
      a: "Yes, with fans of fewer, finer and shorter lashes, usually 2D–3D. Going lighter today keeps the natural lashes healthy, and the next set can be fuller. Big fans of thick lashes on weak lashes leave the natural lash line thinner after a few months.",
    },
    {
      q: "How long do volume lashes last before a refill?",
      a: "Clients usually come back for a refill after about 2–3 weeks, because natural lashes shed in their cycle and the fans go with them. Retention also depends on how well the lashes were cleansed, room humidity and temperature within the glue maker's range, and aftercare at home.",
    },
    {
      q: "Are promade volume fans OK to use?",
      a: "Yes, especially while learning or when the client is short of time. Choose fans with a small, neat base and still check each one before attaching it. Handmade fans let you choose the number of lashes, the spread and the length for each natural lash.",
    },
  ],
  related: ["mi-volume", "mi-classic-hieu-dung", "mi-hybrid-hieu-dung", "mi-mega-wispy-hieu-dung"],
};

export default article;
