import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/brow-lami-tint-phun/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-brow-lamination",
  lesson: "brow-lami-tint-phun",
  category: "tips",
  title: "What is brow lamination? How it compares with a brow tint and permanent make-up, how long each lasts and who it suits",
  metaTitle: "What is brow lamination? vs brow tint and permanent make-up",
  metaDescription:
    "What is brow lamination, how is it different from a brow tint or permanent make-up, how long does each last, and which suits unruly or fair brows?",
  keyword: "what is brow lamination",
  keywords: [
    "how long does brow lamination last",
    "how long does a brow tint last",
    "brow lamination vs tint",
    "how long does permanent brow make-up last",
    "brow lamination or permanent make-up",
    "what to do with unruly eyebrows",
  ],
  excerpt: "Three ways to wake up with good brows and no pencil: reshaping the hairs, tinting them or permanent make-up. What each one does, how long it lasts and who it suits.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-voi-long-may-gon-gang-tu-nhien"),
    alt: "Close-up portrait of a woman with blonde hair in a neat bun and tidy, natural eyebrows, looking straight ahead in a bright treatment room",
  },
  takeaways: [
    "**Brow lamination** reshapes the brow hairs and sets them in one neat direction, so brows look fuller and natural, for about **6–8 weeks**.",
    "**A brow tint** colours each hair, works best on fair brows, and the colour lasts about **3–4 weeks**.",
    "**Permanent make-up** puts pigment into the upper layer of the skin and gives a fixed brow shape that lasts about **1–3 years**.",
    "The quick choice: unruly brows, lamination; fair brows, a tint; long-lasting results, permanent make-up.",
    "For permanent make-up, choose a trained artist and **do an allergy test first**.",
  ],
  intro: [
    "What is brow lamination, and how is it different from a brow tint or permanent make-up? All three aim at the same thing: good brows in the mirror every morning without a pencil or gel. But each works on something different. Lamination changes the direction of the hairs, a tint changes their colour, and permanent make-up leaves the hairs alone and draws the brow shape into the skin.",
    "This article follows the lesson “Brow lamination, brow tint or permanent make-up?” from the Moja Beauty course at VaraaAi Academy, short customer videos from the Moja Beauty salon in Helsinki. By the end you will know what each treatment does, how long it lasts, and which one suits your brows.",
  ],
  sections: [
    {
      id: "three-options-compared",
      title: "Brow lamination, brow tint and permanent make-up compared",
      blocks: [
        {
          table: {
            head: ["Treatment", "What it does", "How long it lasts"],
            rows: [
              ["Brow lamination", "Reshapes the hairs into one direction", "About 6–8 weeks"],
              ["Brow tint", "Colours each brow hair", "About 3–4 weeks"],
              ["Permanent make-up", "Puts pigment into the upper skin layer", "About 1–3 years"],
            ],
          },
        },
        { p: "The first two work on your own brow hairs, so the result is soft and natural and fades as the hairs grow and shed. Permanent make-up sits in the skin, so it lasts far longer, and it is also far harder to change your mind about." },
      ],
    },
    {
      id: "brow-lamination",
      title: "What brow lamination does: it sets the hairs in one direction",
      blocks: [
        { p: "Brow lamination reshapes the brow hairs and then brushes them into a neat, uniform direction. Brow hairs naturally grow every which way: some point down, some curl sideways. After lamination they are lifted and lie in the same direction, so the brows look fuller and tidier while still being your own hairs." },
        { p: "It works like a lash lift: one solution softens the inner structure of the hair so it takes a new shape, and a second solution fixes that shape. Because the hairs have been reshaped, the effect lasts about six to eight weeks, until new brow hairs grow in to replace them." },
        { img: { src: img("khuon-silicone-dinh-hinh-soi-theo-mot-nep"), alt: "Close-up of a client's closed eye as a technician in black gloves presses a pink silicone shield against the lash line, full, tidy brows above", caption: "A lash lift: the hairs are set in one direction and fixed with a solution. Brow lamination works the same way on brow hairs." } },
        { p: "Lamination suits unruly brows with hairs growing in many directions, or fairly thick brows that will not stay in place. It does not add hairs: any area of the brow that is genuinely bare will still be bare afterwards." },
        { note: "The lamination solution dries the brow hairs, so it should not be repeated sooner than six to eight weeks. How to look after your brows and what to avoid afterwards is covered in [keep a brow lamination looking good for 6 weeks](lesson:giu-nep-brow-lamination).", kind: "tip", title: "After the treatment" },
      ],
    },
    {
      id: "brow-tint",
      title: "A brow tint: definition for fair brows",
      blocks: [
        { p: "A brow tint colours every brow hair. Blonde brows, or brows with many fine, light hairs, often look sparse and faint on the face even when there are plenty of hairs. After tinting, those hairs show up, and the brows look darker and more defined." },
        { img: { src: img("to-thuoc-nhuom-len-tung-soi"), alt: "A technician in black gloves uses a small brush to apply dark brown tint to lashes lifted on a shield, the client's brows clearly visible above", caption: "Tint is applied to the hairs, not the skin. The photo shows a lash tint; a brow tint follows the same principle." } },
        { p: "The colour lasts about three to four weeks and then fades. The tint must be one made specifically for lashes and brows, in a shade chosen to match your brows and hair. Hair dye must never be used around the eyes." },
        { p: "Many tint manufacturers require a patch test beforehand, usually about 48 hours before the appointment, on a small patch of skin such as behind the ear or in the crook of the elbow. If the test area goes red, itches, swells or burns, the tint is not done." },
        { img: { src: img("thu-phan-ung-thuoc-nhuom-o-khuyu-tay"), alt: "A technician in black gloves dabs a little test product onto the inside of the elbow of a client sitting in a cream armchair", caption: "A patch test in the crook of the elbow before the tint, following the manufacturer's instructions." } },
      ],
    },
    {
      id: "permanent-brow-make-up",
      title: "Permanent brow make-up: long-lasting, so choose carefully",
      blocks: [
        { p: "Permanent make-up puts pigment into the upper layer of the skin and creates a fixed brow shape there. It does not depend on how many brow hairs you have, so it suits people who want brows that look good for a long time without monthly upkeep. The result lasts about one to three years." },
        { note: "Because the pigment sits in the skin, choose a trained artist and do an allergy test before the treatment. The lesson stresses this. Rules on permanent make-up differ from country to country, so ask the salon about training and permits before you book.", kind: "warn", title: "Before permanent make-up" },
        { p: "Permanent make-up is a long-term choice. If you are not yet sure which shape and depth of colour you like, you can try lamination or a tint first, because both fade after a few weeks." },
      ],
    },
    {
      id: "which-to-choose",
      title: "Brow lamination, a tint or permanent make-up: which to choose",
      blocks: [
        {
          table: {
            head: ["Your brows", "Try"],
            rows: [
              ["Unruly hairs that will not stay in place", "Brow lamination"],
              ["Blonde brows, light-coloured hairs", "Brow tint"],
              ["You want long-lasting, low-maintenance brows", "Permanent make-up"],
            ],
          },
        },
        { img: { src: img("long-may-tu-nhien-cua-phu-nu-trung-nien"), alt: "Close-up portrait of a middle-aged woman with brown hair, natural eyebrows and blue eyes looking straight ahead in soft light" } },
        { p: "Sometimes none of them is right for now: when your eyes are red, inflamed or watering, the skin around them is irritated, or you have reacted to a lamination solution or tint before. Tell the salon clearly, and ask a doctor if you are unsure. The article [gel nail allergy, lash glue and hair dye reactions](lesson:di-ung-hoa-chat) explains the signs of an allergic reaction." },
        { img: { src: img("tu-van-chon-cach-lam-may-voi-khach"), alt: "A beauty therapist with dark hair in a high bun fills in a consultation form while talking with a blonde client in a cream knit sitting in an armchair", caption: "Tell your therapist how you want your brows to look each morning and whether you have ever had an allergic reaction." } },
      ],
    },
    {
      id: "ask-and-book",
      title: "Ask for advice and book your brows",
      blocks: [
        { p: "Not sure which option suits your brows? Take a photo of them without make-up and [message the salon](lesson:chat-voi-salon) to ask. On VaraaAi you [book online](lesson:dat-lich-online) by choosing the service and the time, and that is it. This lesson comes from Moja Beauty in Helsinki, and you can see its brow treatments on [Moja Beauty's booking page](/b/moja-beauty)." },
        { p: "If you are also weighing up your lashes, [lash extensions or a lash lift](lesson:noi-mi-vs-uon-mi) compares the two in the same way as this article. To understand how lifting and tinting solutions work, see [what is a lash lift](lesson:lash-lift-hieu-dung) in the lash technician course." },
      ],
    },
  ],
  faq: [
    {
      q: "What is brow lamination?",
      a: "Brow lamination reshapes the brow hairs and then brushes them into a neat, uniform direction. The hairs are lifted and lie the same way, so the brows look fuller and more natural without gel or pencil.",
    },
    {
      q: "How long does brow lamination last?",
      a: "The effect lasts about six to eight weeks. After that, new brow hairs grow in and the shape fades. Do not repeat it sooner, so the brow hairs get a rest.",
    },
    {
      q: "How long does a brow tint last?",
      a: "A brow tint lasts about three to four weeks and then fades. It works best on blonde brows or light-coloured hairs, making the brows more defined and darker.",
    },
    {
      q: "How long does permanent brow make-up last?",
      a: "Permanent make-up lasts about one to three years, because the pigment is placed in the upper layer of the skin. Choose a trained artist and do an allergy test before the treatment.",
    },
    {
      q: "Should I get brow lamination or permanent make-up?",
      a: "If your brow hairs are unruly and will not stay in place, choose lamination: the result is natural and fades after six to eight weeks. If you want brows that look good for a long time with little upkeep, permanent make-up lasts one to three years, but it is a long-term choice and the artist needs to be chosen carefully.",
    },
    {
      q: "Do you need a patch test before a brow tint?",
      a: "Many tint manufacturers require a patch test, usually about 48 hours before the appointment, on a small patch of skin such as behind the ear or in the crook of the elbow. If the test area goes red, itches, swells or burns, the tint should not be done.",
    },
  ],
  related: ["giu-nep-brow-lamination", "noi-mi-vs-uon-mi", "mi-mong-mua-dong", "lash-lift-hieu-dung"],
};

export default article;
