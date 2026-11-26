import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lash-lift-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-a-lash-lift-and-tint",
  lesson: "lash-lift-hieu-dung",
  category: "lash",
  title: "What is a lash lift? How long it lasts, whether it damages lashes and what to know about tinting",
  metaTitle: "What is a lash lift? How long it lasts and is it safe",
  metaDescription:
    "A lash lift curls natural lashes using a silicone shield and two lotions. Who it suits, choosing the shield, why over-processing frizzes lashes, and tinting.",
  keyword: "what is a lash lift",
  keywords: [
    "how long does a lash lift last",
    "does a lash lift damage your lashes",
    "lash lift and tint",
    "lash lift silicone shields",
    "patch test before lash tint",
    "over-processed lash lift",
    "lash lift aftercare",
  ],
  excerpt: "A lash lift adds no lashes at all; it curls the natural ones. How the lotions and shield work, who it suits, why lashes go frizzy, and what tinting involves.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-chon-khuon-silicone-uon-mi-ben-cua-so"),
    alt: "A lash technician with a high bun, cream top and black gloves sits by a studio window holding up a pink silicone shield to look at it, a tray of shields on the table",
  },
  takeaways: [
    "A lash lift **adds no lashes**: the natural lashes are combed onto a silicone shield, the first lotion softens them and the second sets the curl.",
    "There is no processing time that suits everyone. It depends on the lash type and the product, so **always follow the maker's chart**.",
    "For more curl, choose a **slightly smaller shield** next time instead of a longer time. Over-processing leaves lashes frizzy, brittle and broken, and it cannot be fixed straight away.",
    "Tint only with products made for lashes and brows. Many makers require an **allergy alert test**, often 48 hours before the appointment.",
    "Product must never get into the eye. The result usually lasts about **6–8 weeks**.",
  ],
  intro: [
    "What is a lash lift? In one sentence: a service that curls the client's own natural lashes, with no extensions added, usually combined with a tint to make them darker. The result is soft and natural. But the technician is using chemicals right next to the eye that act directly on the natural lash, so every part of the treatment needs to be properly understood.",
    "This article follows the VaraaAi Academy lesson “Lash lift and tint: understand them for a beautiful, safe curl” in the Lashes course. By the end you can answer the questions clients ask most: how long a lash lift lasts, whether it damages lashes, who it suits, and why a tint needs an allergy test first. It gives no processing times, because those belong to the product you use.",
  ],
  sections: [
    {
      id: "how-a-lash-lift-works",
      title: "What a lash lift is and how it works",
      blocks: [
        { p: "Unlike extensions, a lash lift works on the natural lash itself. Put simply, a lift has three parts:" },
        {
          ol: [
            "The lashes are combed straight up onto a small **silicone shield** fixed to the eyelid.",
            "**The first lotion** softens the inner structure of the lash so it takes the new shape of the shield.",
            "**The second lotion** sets that shape.",
          ],
        },
        { p: "Once released from the shield, the lashes keep their curl. Because the lotions act on the structure of the lash, every mistake in timing or shield size shows on the client's natural lashes." },
        { img: { src: img("mi-that-chai-len-khuon-silicone-khi-uon-mi"), alt: "Close-up of a closed eye, the natural lashes combed straight up onto a pink silicone shield on the lid, with a white pad covering the lower lashes", caption: "Natural lashes on the silicone shield: they will take on exactly the curve of the shield." } },
        { img: { src: img("ket-qua-uon-mi-lash-lift-mi-cong-tu-nhien"), alt: "Close-up portrait of a blonde client with both eyes open looking straight ahead, her natural lashes curled up and darker after a lift and tint", caption: "After a lift and tint: natural lashes curled and darker, with no extensions." } },
        { p: "Each step, from fixing the shield to releasing the lashes, is in the practice article [how to do a lash lift](lesson:lash-lift)." },
      ],
    },
    {
      id: "who-it-suits",
      title: "Who a lash lift suits and when not to do one",
      blocks: [
        { p: "A lash lift usually suits clients whose natural lashes are fairly long but grow straight or point down, clients who do not want extensions, and clients who want less upkeep. Very short lashes are hard to shape nicely, and that is worth saying beforehand." },
        { p: "A client who wears extensions has them removed first, as in [refills and removal](lesson:mi-dam-thao-hieu-dung). Never lift lashes that still have extensions on them." },
        { h3: "When not to treat" },
        {
          ul: [
            "The eyes are red, inflamed or watery.",
            "The client has recently had eye surgery.",
            "The skin around the eyes is irritated.",
            "The client has reacted to lift or tint products before.",
          ],
        },
        { p: "The full list is in [When not to treat a client](lesson:khi-nao-khong-lam). If you are unsure, do not go ahead, and advise the client to ask a doctor." },
      ],
    },
    {
      id: "shields-and-timing",
      title: "Choosing lash lift shields and processing time",
      blocks: [
        { p: "The shield is chosen by two things: the length of the lashes and the curl the client wants." },
        {
          table: {
            head: ["Situation", "Shield"],
            rows: [
              ["Short lashes", "Small shield"],
              ["Long lashes", "Larger shield"],
              ["Same lash length, strong curl wanted", "A little smaller"],
              ["Same lash length, soft lift wanted", "A little larger"],
            ],
          },
        },
        { img: { src: img("ba-co-khuon-silicone-uon-mi-nho-vua-lon"), alt: "Three pale pink crescent-shaped silicone lash lift shields side by side on a pink background, from a thin small size to a thick large one", caption: "Silicone shields come in several sizes. Which size suits which lash length is in the maker's chart." } },
        { p: "A shield that is too small for the lashes rolls them into a tight curl. One that is too large barely lifts them, and the difference hardly shows." },
        { h3: "Where the shield sits matters as much as its size" },
        { p: "The shield has to sit right against the lash line. Placed too far from the lash line, the base of the lash is not lifted, the lash bends in the middle and looks very odd." },
        { h3: "How long each lotion stays on" },
        { p: "There is no single figure for everyone. The time depends on the lash type and the product, and each maker has its own timing chart. Look carefully at the client's lashes before you choose." },
        {
          table: {
            head: ["Lash type", "Processing time"],
            rows: [
              ["Fine lashes", "Usually less time"],
              ["Normal lashes", "As in the maker's chart"],
              ["Thick, coarse lashes", "Longer"],
            ],
          },
        },
      ],
    },
    {
      id: "does-it-damage-lashes",
      title: "Does a lash lift damage your lashes? Why lashes go frizzy and break",
      blocks: [
        { p: "This happens a lot: the client wants a strong curl, so the technician leaves the lotion on a few extra minutes “to be sure”, or picks a shield that is too small. The result is over-curled lashes that are frizzy, dry, brittle, with some broken across." },
        { img: { src: img("loi-uon-mi-qua-gio-mi-xoan-xu-va-gay"), alt: "Close-up of a closed eye with frizzy natural lashes, bent at odd angles, pointing in different directions and some kinked, resting on a white pad", caption: "Example of over-processing or too small a shield: frizzy, dry, crooked lashes. This cannot be fixed straight away." } },
        { p: "The lotion acts on the structure of the lash itself, so over-processing damages it. And it cannot be fixed at once: you have to wait for new lashes to grow. Lifting again too soon, before the lashes have recovered, does the same harm. The gap between two lifts follows the maker's instructions." },
        { note: "If the client wants more curl, choose a slightly smaller shield next time. Do not lengthen the processing time.", kind: "tip", title: "More curl: change the shield, not the minutes" },
      ],
    },
    {
      id: "tint-and-patch-test",
      title: "Lash tinting and the allergy test before a tint",
      blocks: [
        { p: "Lash and brow tint is a product of its own. Use only tint made for lashes and brows, mixed exactly as the maker says, just before use. **Never use hair dye on lashes.** Choose the shade by the client's brows and hair so it looks natural." },
        { p: "The lashes are usually tinted while still on the shield, after the second lotion, if the maker's instructions say so too." },
        { img: { src: img("nhuom-mi-chi-tren-soi-mi-dang-nam-tren-khuon"), alt: "A small brush in a black-gloved hand applies dark brown tint to lashes lying on a pink silicone shield, the client's eye closed", caption: "Tint goes on the lashes only, never on the skin." } },
        { h3: "The allergy alert test" },
        { p: "Many tint makers require an allergy alert test before tinting, often **48 hours** before the appointment. Dab a little tint on the skin area the maker names, often behind the ear or inside the elbow, and wait. Redness, itching, swelling or burning means no tint. How exactly to test follows the product." },
        { img: { src: img("thu-phan-ung-thuoc-nhuom-mi-o-khuyu-tay"), alt: "A technician in black gloves dabs a little tint with a cotton swab onto the inner arm of a client sitting in a cream armchair", caption: "Test on the skin area the maker names, then record the date and the result." } },
        { note: "In Europe, eyelash tint labels must carry allergy warnings under [Regulation (EU) 2017/237](https://eur-lex.europa.eu/eli/reg/2017/237/oj/eng). Read the label and instructions again whenever you change product. The signs of an allergy and what to do are in [Allergies and chemicals](lesson:di-ung-hoa-chat).", kind: "warn", title: "Tint can cause allergies" },
      ],
    },
    {
      id: "never-in-the-eye",
      title: "The absolute rule: product never goes into the eye",
      blocks: [
        {
          ul: [
            "The client's eyes stay closed throughout.",
            "Lift lotion goes only on the lower part of the lashes, a little away from the skin.",
            "Not on the eyelid skin, because lotion on the skin irritates easily and can run into the eye.",
            "Not out to the tips, because the tips are fine and easily damaged.",
            "Take very little lotion so it does not run.",
          ],
        },
        { note: "If product gets into the eye, rinse at once with plenty of clean water. If the eye stays painful, red or blurry, seek medical help straight away.", kind: "warn", title: "If product gets into the eye" },
      ],
    },
    {
      id: "how-long-it-lasts",
      title: "How long a lash lift lasts and lash lift aftercare",
      blocks: [
        { p: "The curl usually lasts about **6–8 weeks**, depending on the person. The reason is the natural lash cycle described in [what are classic lash extensions](lesson:mi-classic-hieu-dung): old lashes shed and new ones grow in straight. The result therefore lasts about as long as one growth cycle, and once there are plenty of new lashes, it is time to come back." },
        { p: "After a lift, the client keeps her lashes dry for the time the maker advises, often one day. During that time:" },
        {
          ul: [
            "No mascara.",
            "No steam.",
            "No rubbing.",
            "No sleeping face down in the pillow.",
          ],
        },
        { p: "After that, she brushes her lashes gently every day." },
        { note: "In VaraaAi, write in the notes of the [client's profile](lesson:khach-hang) the allergy test date and result, the shield size, each lotion's time and the tint shade. Next time you can repeat it exactly, or adjust exactly what needs adjusting.", kind: "tip", title: "Record it so you can repeat it" },
        { p: "If the salon takes online bookings, make “Lash lift” and “Lash lift and tint” two separate items in your [services](lesson:dich-vu). For a client having a tint, do the allergy test first and only then book the [appointment](lesson:lich-hen) for the lift." },
        { note: "Processing times, shield sizes and the allergy test always follow the instructions of the product you use. Rules on beauty products and services differ from country to country. This is a training aid, not a licence.", kind: "info", title: "Note" },
      ],
    },
  ],
  faq: [
    {
      q: "How long does a lash lift last?",
      a: "Usually about 6–8 weeks, depending on the person. Natural lashes have a life cycle: the lifted lashes gradually shed and new ones grow in straight, so the result lasts about as long as one growth cycle. Once there are many new lashes it is time for another lift, but not sooner than the maker advises.",
    },
    {
      q: "Does a lash lift damage your natural lashes?",
      a: "The lift lotion acts on the structure of the lash, so lashes are damaged when the lotion is left on too long, the shield is too small or the lift is repeated too soon: they become over-curled, frizzy, dry, brittle and broken. That cannot be fixed straight away; you have to wait for new lashes. Following the maker's timing and choosing the right shield size avoids it.",
    },
    {
      q: "Can you get a lash lift on short lashes?",
      a: "Very short lashes are hard to shape nicely, and the technician should say so beforehand. A lash lift suits fairly long natural lashes that grow straight or point down best. Short lashes get a small shield, following the maker's chart.",
    },
    {
      q: "Can you get a lash lift if you have lash extensions?",
      a: "No. A client with extensions has them removed first, and the lift is then done on the natural lashes. Lashes that still have extensions on them are never lifted.",
    },
    {
      q: "Why do you need a patch test before a lash tint?",
      a: "Tint can cause allergic reactions, and many makers require a test first, often 48 hours before the appointment, on the skin area they name, such as behind the ear or inside the elbow. Redness, itching, swelling or burning means no tint. The test date and result are recorded in the client's file.",
    },
    {
      q: "What should you avoid after a lash lift?",
      a: "Keep the lashes dry for the time the maker advises, often one day. During that time, no mascara, no steam, no rubbing and no sleeping face down in the pillow. After that, brush the lashes gently every day.",
    },
  ],
  related: ["lash-lift", "mi-dam-thao-hieu-dung", "di-ung-hoa-chat", "khi-nao-khong-lam"],
};

export default article;
