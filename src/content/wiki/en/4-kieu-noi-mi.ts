import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/4-kieu-noi-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "types-of-lash-extensions",
  lesson: "4-kieu-noi-mi",
  category: "tips",
  title: "Types of lash extensions: how Classic, Hybrid, Volume and Mega differ, and which one to choose",
  metaTitle: "Types of lash extensions: Classic, Hybrid, Volume or Mega?",
  metaDescription:
    "Four types of lash extensions on one face: how full Classic, Hybrid, Volume and Mega look, how many lashes per fan, who each suits and why lashes decide.",
  keyword: "types of lash extensions",
  keywords: ["classic vs volume lashes", "which lash extensions should I get", "lash extensions for the first time", "most natural looking lash extensions", "hybrid lashes who are they for", "mega volume lashes for a wedding"],
  excerpt: "Classic, Hybrid, Volume or Mega: four types of lash extensions side by side on the same face, so you can see how full each one is and which suits you.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tu-van-chon-kieu-noi-mi-voi-anh-mau"),
    alt: "A smiling blonde client in a cream chair points at a photo of a pair of eyes on a tablet held by the lash technician during a consultation",
  },
  takeaways: [
    "**Classic** puts one extension on one natural lash: natural, like a coat of mascara, good for work and for a first set.",
    "**Hybrid** mixes classic singles with small volume fans: medium fullness with depth, and people have to look closely to notice.",
    "**Volume** gives each natural lash a fan of 3–6 ultra-fine lashes; **Mega** uses fans of 8–16 for a deep black lash line.",
    "Every style only looks good and lasts when it suits your natural lashes. Fine or sparse lashes should start light.",
    "Not sure? Let the technician look at your natural lashes before you decide, rather than choosing from a photo online.",
  ],
  intro: [
    "The types of lash extensions you see on a salon menu usually go by four names: Classic, Hybrid, Volume and Mega Volume. On the same face they give four very different looks, from lashes that seem to wear a neat coat of mascara to a dense black line for a party. The main difference is whether each natural lash carries a single extension or a fan of several ultra-fine ones.",
    "This article follows the lesson “4 lash styles: Classic, Hybrid, Volume and Mega on the same face” from the Moja Beauty course at VaraaAi Academy, short videos for customers from the Moja Beauty salon in Helsinki. By the end you will know how full each style is, which occasion it suits, and how to tell your technician what you want before you lie down on the bed.",
  ],
  sections: [
    {
      id: "four-types",
      title: "The four types of lash extensions side by side",
      blocks: [
        { p: "The easiest way to see the difference is one person wearing four sets. The face, the light and the make-up stay the same; only the lashes change. The table sums up what you need to remember." },
        {
          table: {
            head: ["Style", "Each natural lash carries", "How it looks"],
            rows: [
              ["Classic", "One extension", "Natural, every lash separate"],
              ["Hybrid", "A single or a small fan, mixed", "Medium fullness, with depth"],
              ["Volume", "A fan of 3–6 ultra-fine lashes", "Full, dark and soft"],
              ["Mega Volume", "A fan of 8–16 ultra-fine lashes", "Deep black, very striking"],
            ],
          },
        },
        { p: "However many lashes a fan holds, it is still attached to **exactly one natural lash**. No style wraps one fan around two or three natural lashes at once. If that happens, the lashes are glued together and pull on each other as they grow." },
      ],
    },
    {
      id: "classic",
      title: "Classic: natural, like a coat of mascara",
      blocks: [
        { p: "Classic lash extensions attach exactly one extension to one natural lash. Your lashes become longer and darker, each one separate, much like a carefully applied coat of mascara. It is the style for everyday work and the safe choice for your first set." },
        { img: { src: img("kieu-noi-mi-classic-tu-nhien-nhu-chuot-mascara"), alt: "Close-up of a blonde woman looking slightly down, wearing a fine classic set with separate lashes that looks like fresh mascara", caption: "Classic: one extension on one natural lash, like mascara." } },
        { p: "Because each natural lash carries only one extension, the fullness of a classic set depends on how many natural lashes you have. Sparse natural lashes give a sparse classic set, and that is when many people move on to Hybrid. For the technician's side of the style, read [what classic lash extensions are](lesson:mi-classic-hieu-dung)." },
      ],
    },
    {
      id: "hybrid",
      title: "Hybrid: medium fullness that only looks like extensions up close",
      blocks: [
        { p: "Hybrid combines classic singles with small volume fans placed in between. The singles give definition and the small fans fill the gaps, so the lash line is fuller than classic while staying soft and deep. Someone opposite you has to look closely to see that they are extensions." },
        { img: { src: img("kieu-noi-mi-hybrid-day-vua-co-chieu-sau"), alt: "The same blonde woman with pearl earrings, turned slightly to the side, wearing a medium-full, slightly textured hybrid set", caption: "Hybrid: fuller than classic, still natural." } },
        { p: "This style often suits people whose natural lashes are sparse or grow unevenly, and people used to classic who want a little more without going to volume. The technician chooses a single or a small fan for each natural lash according to its strength: strong lashes take a fan, fine lashes take a single." },
        { img: { src: img("mi-hybrid-nhin-nghieng-soi-don-va-chum-nho"), alt: "A client's closed eye seen from the side, the hybrid lash line showing crisp single lashes between fine small fans", caption: "From the side you can see singles and small fans mixed together." } },
      ],
    },
    {
      id: "volume-and-mega",
      title: "Volume and Mega Volume: full, dark and striking",
      blocks: [
        { h3: "Volume" },
        { p: "With Volume, each natural lash carries a fan of three to six ultra-fine lashes. The result is full, dark and soft, and the eyes look so defined that many people stop wearing eyeliner. Volume lashes are much finer than classic ones, so a fan of a few can weigh about as much as one thick classic extension." },
        { img: { src: img("kieu-noi-mi-volume-day-mem"), alt: "A blonde woman with a full, dark and soft volume set, eyes looking slightly down, in a studio with purple curtains", caption: "Volume: full and soft, defined eyes without liner." } },
        { img: { src: img("lop-mi-volume-day-deu-nhin-gan"), alt: "Close-up of a client's closed eye on a white pad, the volume lash line evenly full and dark from the inner to the outer corner" } },
        { h3: "Mega Volume" },
        { p: "Mega Volume goes one step further: each fan holds eight to sixteen ultra-fine lashes. The lash line is deep black and very striking, suited to parties and photo shoots. The more lashes in a fan, the finer they must be and the narrower the base, so this style calls for a highly skilled technician and strong natural lashes." },
        { img: { src: img("kieu-noi-mi-mega-volume-dam-noi-bat"), alt: "A blonde woman looking straight ahead with a deep black mega volume set that gives a very bold lash line", caption: "Mega Volume: a deep black line for parties and photos." } },
        { img: { src: img("bo-mi-mega-volume-nhin-gan-tren-mat-nham"), alt: "Close-up of a dense black mega volume lash line on a client's closed eye, a white pad covering the lower lashes" } },
      ],
    },
    {
      id: "which-to-choose",
      title: "Which lash extensions should you get? Choose by occasion and by your natural lashes",
      blocks: [
        { p: "The lesson sums it up in one line: classic for natural, hybrid for light fullness, volume for drama and mega for parties. That is choosing by occasion. There is a second thing your technician always looks at: how much your natural lashes can carry." },
        {
          table: {
            head: ["You want", "Usual style"],
            rows: [
              ["For work, as if you had none", "Classic"],
              ["Your first set", "Classic, or Hybrid if lashes are sparse"],
              ["A little fuller, still soft", "Hybrid"],
              ["Defined eyes, no eyeliner", "Volume"],
              ["Party, wedding, photo shoot", "Mega Volume"],
            ],
          },
        },
        { p: "What a natural lash can carry does not change. Long, strong lashes can take fans with more lashes. Fine, short or sparse lashes, or lashes with many young ones among them, need fans with fewer, finer and shorter lashes. A set that is too heavy weighs the natural lash down, the root takes the strain and the lash can fall out early. The article [do lash extensions damage natural lashes](lesson:noi-mi-co-hai-mi-that) explains this in detail." },
        { note: "Bringing a reference photo to the salon is a good idea, but let the technician tell you honestly whether it suits your eyes and your natural lashes. A careful technician will suggest something lighter for your first set if your lashes are weak, and build up over later visits once your lashes are used to it.", kind: "tip", title: "When you bring a reference photo" },
        { p: "The style is only half the story. The curl (C, CC, D or L) decides how the lashes sit on your eye shape; the lesson on [lash curls for your eye shape](lesson:do-cong-theo-mat) picks up from there." },
      ],
    },
    {
      id: "keeping-the-set",
      title: "Every style needs the same refills and care",
      blocks: [
        { p: "Extensions sit on natural lashes, so when a natural lash sheds at the end of its cycle, the extension goes with it. For all four styles, a refill is usually due after two to three weeks. With Mega, technicians tend to make it clear at the consultation that the set needs regular refills: as the natural lashes grow out, heavy fans twist easily, and the grown-out ones are removed at the refill." },
        { p: "At home, the care is the same for every style: do not rub your eyes, do not pick at your lashes, avoid oily products around the eyes and brush your lashes gently every day. The details are in [lash aftercare after extensions or a lift](lesson:cham-soc-sau-lam-mi)." },
        { p: "If you are in Helsinki and would like someone to look at your lashes in person, ask Moja Beauty; appointments are booked on VaraaAi through [Moja Beauty's booking page](/b/moja-beauty). Choose the service, choose the time and you are done." },
      ],
    },
  ],
  faq: [
    {
      q: "What is the difference between classic and volume lashes?",
      a: "Classic attaches one extension to one natural lash, giving a natural look like a coat of mascara. Volume attaches a fan of three to six ultra-fine lashes to each natural lash, so the result is much fuller, darker and softer.",
    },
    {
      q: "Which lash extensions should I get for my first set?",
      a: "Classic is the safe choice for a first set because it looks natural and is light. If your natural lashes are sparse or uneven, the technician may suggest Hybrid so the lash line looks fuller while staying soft.",
    },
    {
      q: "What are hybrid lash extensions?",
      a: "Hybrid mixes classic singles with small volume fans on the same eye. Each natural lash still carries just one thing, either a single extension or one small fan, and the lash line has medium fullness with depth.",
    },
    {
      q: "Are mega volume lashes heavy and bad for your lashes?",
      a: "Mega uses fans of eight to sixteen very fine lashes, so it only suits long, strong natural lashes. On fine or sparse lashes a fan that is too heavy can drag the natural lash down and make it fall out early, so technicians often do a lighter version.",
    },
    {
      q: "Which type of lash extensions looks the most natural?",
      a: "Classic looks the most natural because each natural lash carries only one extension and the lashes stay separate. Hybrid comes next: a little fuller, but people have to look closely to see that they are extensions.",
    },
    {
      q: "How often do lash extensions need a refill?",
      a: "Usually every two to three weeks, whichever of the four styles you wear. By then some of the extensions have shed with your natural lashes and gaps start to show.",
    },
  ],
  related: ["do-cong-theo-mat", "noi-mi-vs-uon-mi", "noi-mi-co-hai-mi-that", "mi-volume-hieu-dung"],
};

export default article;
