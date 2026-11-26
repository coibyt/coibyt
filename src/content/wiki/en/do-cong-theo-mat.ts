import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/do-cong-theo-mat/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "lash-extension-curls-c-cc-d-l",
  lesson: "do-cong-theo-mat",
  category: "tips",
  title: "Lash extension curls C, CC, D and L: which curl suits your eye shape",
  metaTitle: "Lash extension curls C, CC, D, L: choose by eye shape",
  metaDescription:
    "How lash extension curls C, CC, D and L differ, why round eyes suit C, small eyes CC, hooded eyes D and monolids L, and when a technician chooses otherwise.",
  keyword: "lash extension curls",
  keywords: ["C vs D curl lashes", "what is a CC curl", "best lash curl for hooded eyes", "lash extensions for monolids", "L curl lashes", "lash extensions with glasses"],
  excerpt: "C, CC, D or L: each lash extension curl suits an eye shape. Here is what each curl does, why it is chosen and why your technician also looks at your natural lashes.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-soi-dang-mat-khach-truoc-khi-chon-do-cong"),
    alt: "A lash technician with her hair in a high bun studies a blonde client's eyes through a magnifier while the client sits under a ring light in a marble studio",
  },
  takeaways: [
    "**C** is a light curl, like freshly curled natural lashes, and is enough for big round eyes.",
    "**CC** curls a little more than C and makes small eyes look bigger and brighter; it is the most popular curl.",
    "**D** is a strong curl that lifts the tips above the fold of the lid, which suits hooded eyes.",
    "**L** is straight at the base and turns up near the tip, for monolids or natural lashes that grow straight or point down.",
    "These are guidelines by eye shape; the technician also checks which way your natural lashes grow before choosing the final letter.",
  ],
  intro: [
    "Lash extension curls decide how the lashes sit on your eyes, often more visibly than the length does. With the same set, switching from C to D makes the eyes look clearly more open; the wrong choice leaves the lashes hidden under the fold of the lid, or sticking out as if bent. Big round eyes, small eyes, hooded eyes and monolids each have a curl that suits them.",
    "This article follows the lesson “Lash curls C, CC, D and L: which suits your eye shape?” from the Moja Beauty course at VaraaAi Academy, short videos for customers from the Moja Beauty salon in Helsinki. By the end you will recognise your eye shape, understand why the technician suggests one letter rather than another, and know what to mention at the consultation.",
  ],
  sections: [
    {
      id: "what-curls-are",
      title: "What lash extension curls are and why they have letters",
      blocks: [
        { p: "Each extension comes pre-shaped into a curve, and the curve is named with a letter. The idea is simple: the letters run from almost straight to very curled. J and B are nearly straight and look very natural. C is the common curl. CC and then D curl more, for defined lashes and more open eyes. L is different: straight at the base, then bent upwards." },
        { img: { src: img("sau-soi-mi-noi-tu-gan-thang-den-cong-l"), alt: "Six black extensions of the same length laid out on a pink stone tray, curling more and more from almost straight to strong, with a straight-based L at the bottom", caption: "From almost straight to strongly curled; the bottom one with a straight base is an L." } },
        { note: "Each lash brand shapes its extensions a little differently, so a C from two brands may not be identical. That is why the technician looks at the actual extensions on the strip, not just the letter.", kind: "info", title: "Same letter, different brand" },
      ],
    },
    {
      id: "your-eye-shape",
      title: "Recognising your eye shape",
      blocks: [
        { p: "Eye shape is judged while you sit with your eyes open, looking straight ahead. Once you lie down with your eyes closed, all eyes look much the same, so a careful technician looks at your eyes before asking you onto the bed. The lesson mentions four shapes:" },
        {
          ul: [
            "**Big round eyes:** wide open, with a lot of the iris visible.",
            "**Small eyes:** a narrower opening, with less of the iris visible when open.",
            "**Hooded eyes:** a fold of skin from the brow bone drapes down over the lid and sometimes over the base of the lashes.",
            "**Monolids:** a smooth lid with no crease, and natural lashes that often grow straight.",
          ],
        },
        { img: { src: img("bon-dang-mat-hanh-nhan-tron-sup-mi-mot-mi"), alt: "Four close-ups of the eyes of four European women: almond, round, hooded and monolid eyes, all open and looking straight ahead", caption: "Top left to right, bottom left to right: almond, round, hooded, monolid." } },
      ],
    },
    {
      id: "curl-by-eye-shape",
      title: "Choosing the lash curl for your eye shape",
      blocks: [
        {
          table: {
            head: ["Eye shape", "Curl", "Why"],
            rows: [
              ["Big round eyes", "C", "A light curl is enough and does not over-round the eye"],
              ["Small eyes", "CC", "A little extra curl makes the eyes look bigger and brighter"],
              ["Hooded eyes", "D", "The tips clear the fold and are not hidden"],
              ["Monolids, downward lashes", "L", "The straight base follows the lash, the tip turns up"],
            ],
          },
        },
        { h3: "C: a light curl, like freshly curled lashes" },
        { p: "A C curl looks like natural lashes that have just been curled. For eyes that are already big and round, C is enough. A stronger curl on round eyes can make them look too round and lose their softness." },
        { img: { src: img("mi-noi-do-cong-c-nhe-tren-mat-mo-to"), alt: "A blonde woman looking straight ahead with a natural, lightly curled C set, short at the inner corner and longer towards the outer corner", caption: "A soft C curl, like natural lashes after a lash curler." } },
        { h3: "CC: the most popular curl" },
        { p: "CC curls a little more than C. That bit of extra curl is enough to lift the lashes away from the eye line, so small eyes look bigger and brighter. The lesson calls it the most popular curl, because it looks natural and still clearly visible on most eyes." },
        { img: { src: img("mi-noi-cong-nhieu-giup-mat-to-va-sang"), alt: "A blonde woman looking straight ahead with clearly lifted extensions, longest in the middle of the eye, making her eyes look bigger and brighter" } },
        { h3: "D: for hooded eyes" },
        { p: "D is a strong curl: the tips rise above the fold of the lid. On hooded eyes, a gentle curl hides under the fold, and all the work goes unseen. A D curl brings the tips out, so the lashes show and the eyes look more open." },
        { img: { src: img("mat-sup-mi-voi-mi-noi-cong-manh-vuot-nep-da"), alt: "A woman of about forty with clearly hooded eyes wearing strongly curled extensions that rise above the fold and show when her eyes are open", caption: "Hooded eyes: a strong curl so the tips clear the fold." } },
        { h3: "L: straight base, curled tip" },
        { p: "An L curl has a straight base and only bends upwards near the tip. It suits monolids well, and also anyone whose natural lashes grow straight or point downwards, whatever the eye shape." },
      ],
    },
    {
      id: "natural-lashes-decide",
      title: "Why your natural lashes decide the final letter",
      blocks: [
        { p: "The table above is a general trend from trade experience, not a strict rule. The reason lies in the attachment: the base of the extension has to lie along the natural lash for the glue to hold well." },
        {
          ul: [
            "Straight or downward-growing lashes with an extension that is too curled: only a small point touches, the bond is weak, the lash falls out early and looks bent. That is why some technicians choose an L, so the straight base hugs the lash before curling up.",
            "Naturally curly lashes with an extension that is too straight: the extension sticks out and does not follow the lash line.",
            "Deep-set eyes: an extension that is too long and too curled can touch the upper lid or the brow bone when you open your eyes.",
            "Glasses: lashes that are too long and too curled will touch the lenses. Tell your technician if you wear glasses every day.",
          ],
        },
        { img: { src: img("mi-that-moc-thang-truoc-khi-noi"), alt: "Close-up of a client's closed eye with fine natural lashes that grow fairly straight, no extensions yet, resting on a white pad", caption: "The technician looks at how your natural lashes grow before choosing the curl." } },
        { p: "Your two eyes are rarely identical either. The lashes on one side may be longer or sparser than on the other, so the technician sometimes adjusts one side slightly to make the result look balanced. The technical side of planning length and curl zone by zone is covered in [what lash mapping is](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "at-the-consultation",
      title: "At the consultation: what to tell your technician",
      blocks: [
        { p: "You do not need to know all the letters. A few details give the technician enough to go on:" },
        {
          ol: [
            "Whether you want a natural or a bold look, and for what occasion.",
            "Whether you wear glasses or contact lenses.",
            "If you have had extensions before, whether the lashes were hidden, stuck out or fell out early.",
          ],
        },
        { p: "The curl goes together with the style. If you are still deciding between Classic, Hybrid, Volume and Mega, read [types of lash extensions](lesson:4-kieu-noi-mi) first. A curl that suits your eyes also helps the set bond better, and a good bond pulls less on your natural lashes; more on that in [do lash extensions damage natural lashes](lesson:noi-mi-co-hai-mi-that)." },
        { note: "If your natural lashes grow straight and you want more curl but not more length, a lash lift is another option. The lesson [lash extensions or a lash lift](lesson:noi-mi-vs-uon-mi) compares the two.", kind: "tip" },
        { p: "Not sure about your eye shape? At Moja Beauty the technician looks at your eyes and chooses the curl for you; you can ask in advance or [book with Moja Beauty](/b/moja-beauty) on VaraaAi." },
      ],
    },
  ],
  faq: [
    {
      q: "What is the difference between C and D curl lashes?",
      a: "C is a light curl, like natural lashes that have just been curled, and suits big round eyes. D curls much more strongly so the tips rise above the fold of the lid, which is why it is often chosen for hooded eyes.",
    },
    {
      q: "What is a CC curl?",
      a: "CC sits between C and D and curls a little more than C. It makes small eyes look bigger and brighter while staying natural, and it is the most popular curl.",
    },
    {
      q: "Which lash curl is best for hooded eyes?",
      a: "Hooded eyes usually suit a D curl. The fold of skin easily hides the lashes, so the extension needs a strong curl for the tips to rise above it and show when the eyes are open.",
    },
    {
      q: "What lash extensions suit monolids?",
      a: "Monolids often suit an L curl: the extension is straight at the base and only turns up near the tip. The straight base follows natural lashes that grow straight, and the curled tip makes the lashes visible.",
    },
    {
      q: "Which curl is best for lashes that point downwards?",
      a: "Technicians often choose a straight-based curl such as L. A strongly curled extension on a downward lash only touches at one small point, so the bond is weak and the lash falls out early.",
    },
    {
      q: "Can I have curled lash extensions if I wear glasses?",
      a: "Yes, but tell your technician first. Lashes that are too long or too curled can touch the lenses, so the technician balances the length and the curl.",
    },
  ],
  related: ["4-kieu-noi-mi", "noi-mi-vs-uon-mi", "noi-mi-co-hai-mi-that", "mi-mapping-hieu-dung"],
};

export default article;
