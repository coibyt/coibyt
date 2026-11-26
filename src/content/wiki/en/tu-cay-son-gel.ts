import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tu-cay-son-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "peeled-off-gel-nails-what-to-do",
  lesson: "tu-cay-son-gel",
  category: "tips",
  title: "Peeled off your gel nails? What it does to the natural nail, and how to help it recover",
  metaTitle: "Peeled off gel nails? What happens and what to do now",
  metaDescription:
    "Peeled off gel nails strip layers of the natural nail: rough, white, thin and brittle. How the salon removes gel properly, and how to care for nails you peeled.",
  keyword: "peeled off gel nails",
  keywords: [
    "what to do after peeling off gel",
    "why you should not peel off gel polish",
    "weak nails after peeling gel",
    "how to repair nails after peeling gel",
    "how salons remove gel polish",
    "white patches on nails after gel",
  ],
  excerpt: "The gel lifts a little, so you peel it off: those few seconds take a layer of your natural nail. What the nail goes through, how a salon removes gel, and how to care for it afterwards.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tu-cay-son-gel-do-bang-mong-tay"),
    alt: "Close-up of a woman's hands, the thumbnail of one hand prising a patch of red gel polish off a nail on the other hand",
  },
  takeaways: [
    "Gel bonds very firmly to the **top layer** of the natural nail. Peeling the gel off strips that layer with it.",
    "After peeling, the nail is **rough, patchy white, thin and soft**: it breaks and splits easily and can even feel tender to the touch.",
    "The right way is **removal at the salon**: the technician files the colour down, softens the gel with remover, then gently lifts away what has softened.",
    "Already peeled? **Cut your nails short** and **apply cuticle oil every day**.",
    "A thinned nail does not thicken again by itself; it gets stronger gradually as **new nail grows out**.",
  ],
  intro: [
    "Peeled off gel nails are something almost every long-term gel wearer has done: an edge lifts, your hands are idle, and within seconds a whole patch of gel comes away. That satisfying moment has a price. The gel does not come off alone; it takes part of your natural nail with it, and the nail needs months to grow back what was lost.",
    "This article follows the lesson “What peeling off gel polish does to your nails” from the Moja Beauty course at VaraaAi Academy, short customer videos from the Moja Beauty salon in Helsinki. You will understand why peeling gel weakens the nail, how a salon removes gel properly, and how to look after your nails if you have already peeled.",
  ],
  sections: [
    {
      id: "why-peeling-thins-nails",
      title: "Why peeling off gel thins your nails",
      blocks: [
        { p: "Your nail is not one solid hard plate. It is made of many very thin layers of keratin stacked on top of each other. Once cured under the lamp, gel bonds very firmly to the top one." },
        { p: "When you peel, the pull does not separate the gel cleanly from the nail. It tears at the weaker point, and the weaker point is usually between the layers of the nail. The result: the piece of gel in your hand has a thin layer of nail stuck to its underside." },
        { note: "Most nail damage happens when gel is removed, not when it is applied. The culprit is peeling and scraping, not the gel itself.", kind: "info", title: "What many people do not know" },
      ],
    },
    {
      id: "nails-after-peeling",
      title: "What your nails look like after peeling off gel",
      blocks: [
        { p: "You will notice these signs straight after peeling:" },
        {
          ul: [
            "The surface of the nail is **rough** instead of smooth.",
            "There are **white patches** where layers of nail came away.",
            "The nail is **thinner and softer** and bends under light pressure.",
            "It **breaks and splits** easily at the tip.",
            "It can feel **tender** when touched.",
          ],
        },
        { img: { src: img("mong-san-trang-mong-di-sau-khi-cay-gel"), alt: "Close-up of a natural nail after gel was peeled off, the surface rough with white patches and a few specks of red gel left behind", caption: "An example of what not to do: a rough, white, thinned nail surface after the gel was peeled off." } },
        { p: "One thing to tell apart: a nail that looks slightly white and dry right after gel is removed properly at the salon is usually just temporarily dehydrated, and oil helps. Rough white patches after peeling are layers of nail that have really gone." },
        { p: "A thinned nail cannot thicken again on its own. You have to wait for new nail to grow out. According to the article [does gel removal damage nails](lesson:thao-gel-hieu-dung) in the nail technician course, fingernails grow about 3 mm a month, and a completely new nail takes about 4–6 months." },
      ],
    },
    {
      id: "salon-gel-removal",
      title: "How salons remove gel polish",
      blocks: [
        { p: "The right way is to let your technician remove it. Proper gel removal is not rushed, and no step involves hard scraping." },
        { img: { src: img("tho-dua-bot-lop-mau-gel-truoc-khi-u"), alt: "A nail technician in black gloves lightly files the surface of a client's red gel nail with a straight file, the other nails still glossy", caption: "First step: file away the shine and some of the colour, so the remover can get into the gel." } },
        {
          ol: [
            "**File the top layer.** The glossy top coat works like a raincoat and the remover cannot get through it. The technician files until the shine is gone and stops before reaching the natural nail.",
            "**Wrap with remover.** A piece of cotton the size of the nail is soaked in remover, placed on the nail and wrapped in foil or held with a clip. The soaking time follows the product's instructions.",
            "**Wait for the gel to soften.** Given enough time, the gel puffs up, cracks and lifts off the nail by itself. Wherever it still clings, it gets more soaking, not scraping.",
            "**Lift it away gently.** The technician eases the softened gel towards the tip with a wooden stick. The surface of the natural nail stays intact.",
          ],
        },
        { img: { src: img("dat-bong-tham-dung-dich-thao-gel-len-mong"), alt: "A nail technician in black gloves places a cotton pad soaked in remover on a client's red gel nail, with a sheet of foil and a bottle of remover beside her" } },
        { img: { src: img("quan-giay-bac-u-mem-son-gel"), alt: "A nail technician in black gloves wraps foil snugly around a client's fingertip to soften the gel, two fingers already wrapped" } },
        { img: { src: img("gel-phong-len-tu-tach-khoi-mong"), alt: "Close-up of a nail after soaking, the red gel puffed up, cracked into flakes and lifting off the natural nail by itself", caption: "After enough soaking the gel puffs up and cracks by itself. That is the moment to lift it, not before." } },
        { img: { src: img("day-nhe-gel-da-mem-bang-que-go"), alt: "A nail technician in black gloves uses an orange wood stick to ease softened red gel gently towards the tip of a client's nail" } },
        { p: "For every step from the technician's side, see [how to remove gel polish properly](lesson:thao-gel)." },
      ],
    },
    {
      id: "already-peeled",
      title: "Already peeled off your gel? What to do now",
      blocks: [
        { p: "Do not worry too much; the nail will recover. Your job is to protect the weak part until it has grown out." },
        {
          table: {
            head: ["What to do", "Why"],
            rows: [
              ["Cut the nails short", "Thin, long nails break and split easily"],
              ["Apply cuticle oil every day", "Keeps the nail and skin supple, less dry and brittle"],
              ["Do not pick at leftover gel", "Every peel strips another layer"],
              ["Book the salon to remove the rest", "Soaked and lifted, no more nail lost"],
            ],
          },
        },
        { img: { src: img("nho-dau-duong-len-mong-sau-khi-thao"), alt: "A nail technician in black gloves uses a dropper to place a drop of golden cuticle oil on a client's natural nail just after gel removal", caption: "A drop of oil every day, rubbed into the nail and the skin around it." } },
        { p: "If a nail is very painful, unusually discoloured, separating from the nail bed or the skin around it is red and swollen, ask a doctor or pharmacist before you get gel again. The article [do nails need to breathe between gel manicures](lesson:mong-co-can-tho) explains when a break makes sense." },
        { note: "Most peeling starts with an edge that has lifted slightly. Avoid the habits that make gel lift early and you avoid the temptation to peel. See [5 habits that make gel nails lift](lesson:5-thoi-quen-gel-bong).", kind: "tip", title: "Stop it at the source" },
      ],
    },
    {
      id: "book-removal",
      title: "Gel lifting? Book a removal or infill",
      blocks: [
        { p: "When you see the gel lifting, the quickest fix is to book straight away, before it bothers you so much that you peel it. On VaraaAi you [book online](lesson:dat-lich-online) in a few steps: choose a gel removal or an infill, choose the time, done. This lesson comes from Moja Beauty in Helsinki, where you can book an infill or gel removal on [Moja Beauty's booking page](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Is it bad to peel off gel polish?",
      a: "Yes, it harms the nail. Gel bonds very firmly to the top layer of the natural nail, so when you peel it off, it takes that thin layer of nail with it. Afterwards the nail is usually rough, patchy white, thin, soft and easy to break.",
    },
    {
      q: "What should I do after peeling off my gel nails?",
      a: "Cut your nails short so the thin nail breaks less, and apply oil to the nail and the skin around it every day. Do not pick at any gel that is left; book the salon to remove it. The nail gets stronger gradually as new nail grows out.",
    },
    {
      q: "How long do nails take to recover after peeling gel?",
      a: "A thinned nail does not thicken again by itself; you have to wait for new nail to grow out and replace it. Fingernails grow about 3 mm a month, and a completely new nail takes about 4–6 months.",
    },
    {
      q: "How do salons remove gel polish?",
      a: "The technician files away the shine and some of the colour, places cotton soaked in remover on the nail, wraps it in foil or holds it with a clip and soaks it as the product's instructions say. Once the gel has softened, puffed up and cracked, it is lifted away gently with a wooden stick, and the natural nail stays intact.",
    },
    {
      q: "Why are my nails white after gel?",
      a: "After proper removal, slightly white and dry nails are usually just temporarily dehydrated, and cuticle oil helps. Rough white patches after peeling off gel are a sign that layers of nail have been stripped away, and you have to wait for new nail to grow out.",
    },
  ],
  related: ["5-thoi-quen-gel-bong", "mong-co-can-tho", "gel-biab-bot-gelx", "thao-gel-hieu-dung"],
};

export default article;
