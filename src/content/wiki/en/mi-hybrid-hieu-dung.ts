import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-hybrid-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-are-hybrid-lash-extensions",
  lesson: "mi-hybrid-hieu-dung",
  category: "lash",
  title: "What are hybrid lash extensions? How they differ from classic and volume, who they suit and how many fans to mix",
  metaTitle: "What are hybrid lash extensions? Classic vs volume vs hybrid",
  metaDescription:
    "Hybrid lash extensions mix classic singles and volume fans on one eye. The spiky look, who it suits, a 30–50 % fan share as a starting point, patchiness, refills.",
  keyword: "what are hybrid lash extensions",
  keywords: [
    "hybrid vs classic vs volume lashes",
    "who are hybrid lashes for",
    "hybrid lash ratio",
    "spiky hybrid lashes",
    "lash extensions for sparse lashes",
    "how long do hybrid lashes last",
    "hybrid lashes meaning",
  ],
  excerpt: "Hybrid mixes singles and fans on the same eye for a fluffy, textured lash line. This article explains who it suits, how to mix by the natural lashes and the mistakes to avoid.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-mi-chuan-bi-hai-vi-mi-classic-va-volume-cho-bo-hybrid"),
    alt: "A lash technician with her hair in a high bun and black gloves sits at a white stone table holding tweezers, two pale pink lash tiles side by side in front of her",
  },
  takeaways: [
    "Hybrid lash extensions mix **classic singles and volume fans on the same eye**; each natural lash still carries only one of them.",
    "The look is textured and slightly fluffy, often called spiky: fuller than classic, softer and more natural than a full volume set.",
    "Choose a single or a fan by the **strength of each natural lash**: strong lashes carry a light fan, fine ones a single, baby lashes that are too weak stay bare.",
    "Half and half, or fans at around **30–50 %**, is a starting point, not a rule.",
    "Spread fans and singles evenly along the lash line; fans bunched in one place look patchy.",
  ],
  intro: [
    "What are hybrid lash extensions? They are a mixed technique: on the same eye, some natural lashes carry a single extension as in classic, and others carry a fan as in volume. The finished lash line is fuller than classic but not as dense as volume, with defined lashes standing out among soft fans. Many clients choose hybrid as the step in between when classic starts to feel a little thin.",
    "This article follows the VaraaAi Academy lesson “Hybrid lashes: understand them for natural texture” in the Lashes course. You will learn which clients hybrid suits, how to decide which natural lash gets a fan and which a single, and why a perfectly regular mixing rhythm can still leave a client's lashes thinner.",
  ],
  sections: [
    {
      id: "what-is-hybrid",
      title: "What hybrid lash extensions are",
      blocks: [
        { p: "Hybrid means a mix. The technician uses both things already learned: the single extension of [classic](lesson:mi-classic-hieu-dung) and the small fan of a few very fine lashes from [volume](lesson:mi-volume-hieu-dung). A single here, a fan there." },
        { img: { src: img("soi-don-classic-va-fan-volume-trong-noi-mi-hybrid"), alt: "On a pale pink tile, a thick black single extension lies on the left and a fan of five very fine lashes sharing one base on the right", caption: "The two things mixed in hybrid: a classic single and a volume fan." } },
        { note: "Each natural lash carries exactly one thing: either a single or a fan. Never both, and never one fan wrapped around two neighbouring natural lashes.", kind: "warn", title: "What never changes" },
        { img: { src: img("bo-mi-hybrid-hoan-thien-soi-don-xen-fan"), alt: "Close-up of a closed eye with a finished hybrid set, defined black singles rising like spikes between soft fans", caption: "A finished hybrid set: defined singles among soft fans." } },
      ],
    },
    {
      id: "hybrid-vs-classic-volume",
      title: "Hybrid vs classic vs volume lashes",
      blocks: [
        { p: "In a hybrid set the singles are thicker and glossy black, standing out as individual lashes like little spikes. The fine fans fill the spaces between them and give the lash line fullness and softness. In the trade this look is often called spiky." },
        {
          table: {
            head: ["Technique", "Each natural lash carries", "The look"],
            rows: [
              ["Classic", "One extension", "Natural and separated, like mascara"],
              ["Hybrid", "One single or one fan, depending on the lash's strength", "Textured, slightly fluffy; fuller than classic, softer and more natural than full volume"],
              ["Volume", "One fan of a few very fine lashes", "Full, soft, a dense dark lash line"],
            ],
          },
        },
        { img: { src: img("khach-voi-bo-mi-hybrid-toi-tu-nhien"), alt: "Close-up portrait of a blonde client with her eyes open and a hybrid set, the lash line fuller than mascara, a few defined lashes standing out among softer ones", caption: "Hybrid with the eyes open: full but still light, not solid." } },
      ],
    },
    {
      id: "who-hybrid-suits",
      title: "Who hybrid lashes are for",
      blocks: [
        { p: "Two groups of clients are often advised to try hybrid." },
        { p: "The first is clients with sparse natural lashes, gaps, or uneven lashes that are thick in some places and thin in others. Fine fans placed on the strong lashes around a gap make the lash line look full, without making weak lashes carry the weight." },
        { img: { src: img("mi-that-thua-khong-deu-co-khoang-trong"), alt: "Close-up of a closed eye before extensions, the natural lash line uneven, with a few long strong lashes, many short baby lashes and some gaps", caption: "Uneven natural lashes with gaps: a case hybrid handles well." } },
        { p: "The second is clients used to classic who want a little more fullness but are not ready for volume. Many clients go from classic to hybrid, and only later to volume." },
      ],
    },
    {
      id: "single-or-fan",
      title: "Single or fan: the strength of the natural lash decides",
      blocks: [
        { p: "This is the most important point of hybrid. Singles and fans are not chosen by a fixed pattern but lash by lash." },
        {
          table: {
            head: ["Natural lash", "What goes on it"],
            rows: [
              ["Strong, long and thick", "Can carry a light fan"],
              ["Fine, short, or a new baby lash", "A very fine, very short single"],
              ["A baby lash that is too weak", "Left bare until the next refill"],
            ],
          },
        },
        { h3: "The hybrid lash ratio: a starting point, not a rule" },
        { p: "People often say about half singles and half fans. Some say fans make up around 30–50 %. Treat that as a starting point. A client with many strong lashes can take more fans. A client with weak lashes needs more light singles. The best figure is the one her natural lashes can carry." },
        { h3: "The beginner's mistake: a rigid rhythm" },
        { p: "Single, fan, single, fan, perfectly regular. It looks neat, but the rhythm does not look at the natural lashes. A weak baby lash ends up carrying a fan while the strong lash next to it carries only a single. A few weeks later those weak lashes fall out early, and the lash line thins exactly where the client was already sparse." },
        { note: "An even rhythm is good, but it must follow the natural lashes. A gap is covered with fans on the strong lashes around it, not with a fan on the baby lash in the gap itself.", kind: "tip", title: "The right way to think" },
      ],
    },
    {
      id: "texture-and-spread",
      title: "Hybrid texture and even distribution",
      blocks: [
        { p: "Part of the texture comes from how the lengths of singles and fans are mixed. There are two ways, and both are correct:" },
        {
          table: {
            head: ["Length mix", "How the lash line looks"],
            rows: [
              ["Singles slightly longer than the fans", "Singles stick out above the fans as clear spikes; sharper and bolder"],
              ["Singles the same length as the fans or shorter", "The fans sit on top, the lash line is softer and fluffier; the singles underneath add depth"],
            ],
          },
        },
        { img: { src: img("mi-hybrid-nhin-nghieng-soi-don-dai-hon-fan"), alt: "A client's closed eye seen from the side by the temple, the tips of the singles rising above the soft fans for a slightly pointed outline", caption: "Side view: singles slightly longer than the fans give a sharper edge." } },
        { p: "Which one you choose depends on the look agreed with the client. Keep the difference small. Too big a difference and the lash line looks messy and careless." },
        { p: "Fans and singles must be spread evenly along the whole lash line. If all the fans are bunched in one place and elsewhere there are only a few singles, the lash line looks patchy: dark and heavy in one spot, sparse in another. To avoid it, work zone by zone, step back after each zone to look at the whole, and compare both eyes." },
        { img: { src: img("loi-fan-don-vao-giua-mat-hang-mi-loang-lo"), alt: "Close-up of a closed eye with a dense dark patch of fans bunched in the middle of the lash line, both corners showing only short, sparse natural lashes", caption: "Illustration of a mistake: fans bunched in the middle of the eye, sparse corners. The lash line looks patchy." } },
      ],
    },
    {
      id: "safety-and-refills",
      title: "Safety and hybrid refills",
      blocks: [
        { p: "The safety rules are exactly the same as for classic and volume:" },
        {
          ul: [
            "Each single or fan goes on exactly one cleanly isolated natural lash.",
            "No stickies.",
            "About 0.5–1 mm from the eyelid skin, never touching it.",
            "A very small drop of glue.",
          ],
        },
        { p: "With hybrid your hands keep switching between singles and fans, so it is easy to rush. Keep your hands slow and steady." },
        { p: "Natural lashes shed with their life cycle, so clients come back for refills, usually after 2–3 weeks. At a refill, do not simply repeat what you did last time: read the natural lashes again. A baby lash you left bare, or gave a fine single, may now be strong enough for a fan. Remind the client to look after her lashes at home, as after a classic set. Refills have their own lesson: [refills and removal](lesson:mi-dam-thao-hieu-dung)." },
      ],
    },
    {
      id: "hybrid-consultation",
      title: "Hybrid consultation: show photos and be honest",
      blocks: [
        { p: "Show the client hybrid photos before you start and make it clear that this is a fluffy, textured look, not a solid dark lash line like volume. If her lashes are sparse, say gently that this time you will use more singles to keep her natural lashes healthy. A client who understands beforehand is not surprised when she opens her eyes." },
        { p: "In VaraaAi, note the chosen look in the [client's profile](lesson:khach-hang): singles longer or shorter than the fans, and roughly how many fans. At the next refill the set keeps the same style, even with another technician. A hybrid set and a hybrid refill also work best as two separate [services](lesson:dich-vu), so clients book exactly what they need." },
        { p: "The hands-on work, from reading the natural lashes zone by zone to comparing both eyes, is in the practice article on [how to do hybrid lashes](lesson:mi-hybrid)." },
        { note: "The mix, lengths and lashes per fan in this article are general trade guidance, not exact figures: always decide by the client's natural lashes and check the lash maker's chart and the glue maker's instructions. Rules on beauty services and products differ from country to country. This article is a training aid, not a licence.", kind: "info", title: "Note" },
      ],
    },
  ],
  faq: [
    {
      q: "What is the difference between hybrid, classic and volume lashes?",
      a: "Classic puts one extension on each natural lash, volume a fan of a few very fine lashes. Hybrid mixes both on the same eye, so the lash line is fuller than classic but softer and more natural than a full volume set. Each natural lash still carries only one thing.",
    },
    {
      q: "Who are hybrid lashes for?",
      a: "They suit clients with sparse, gappy or uneven natural lashes, because fans on the strong lashes around a gap make the lash line look fuller. They also suit clients used to classic who want a little more fullness but are not ready for volume.",
    },
    {
      q: "What is the ratio of singles to fans in hybrid lashes?",
      a: "The figure usually quoted is about half and half, or fans making up around 30–50 %. That is only a starting point. Lashes with many strong hairs can take more fans; weak lashes need more fine singles.",
    },
    {
      q: "Can one natural lash have both a single and a fan?",
      a: "No. Each natural lash carries one thing only, either a single or a fan, and is isolated before attaching. Hybrid only mixes the two styles across the same eye.",
    },
    {
      q: "What are spiky hybrid lashes?",
      a: "It is the textured look of hybrid: defined black singles standing like small spikes among soft fans. When the singles are chosen slightly longer than the fans, the spikes show more clearly and the lash line looks sharper.",
    },
    {
      q: "How long do hybrid lashes last before a refill?",
      a: "Clients usually come back after 2–3 weeks, because natural lashes shed with their cycle and the extensions go with them. At the refill the technician reads the natural lashes again: a baby lash left bare last time may now be strong enough for a single or a fan.",
    },
  ],
  related: ["mi-hybrid", "mi-volume-hieu-dung", "mi-classic-hieu-dung", "mi-mapping-hieu-dung"],
};

export default article;
