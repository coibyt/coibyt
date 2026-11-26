import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/5-thoi-quen-gel-bong/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "why-are-my-gel-nails-lifting",
  lesson: "5-thoi-quen-gel-bong",
  category: "tips",
  title: "Why are my gel nails lifting? 5 everyday habits that make gel lift, and how to fix each one",
  metaTitle: "Why are my gel nails lifting? 5 habits to break",
  metaDescription:
    "Gel nails lifting after a few days? Usually it is a habit: picking, using nails as tools, washing up without gloves, sauna on day one, late infills. Fixes inside.",
  keyword: "why are my gel nails lifting",
  keywords: [
    "how to make gel nails last longer",
    "gel nails lifting at the edges",
    "can you go in the sauna after gel nails",
    "does washing up ruin gel nails",
    "how often should you get gel nails redone",
    "gel nails lifting after a few days",
  ],
  excerpt: "Gel that lifts after a few days is often not down to the bottle but to everyday habits. The five most common ones, and how to fix each.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-cho-tho-xem-mong-gel-bi-bong"),
    alt: "A client in a dark blue shirt shows her hand with red gel nails to a blonde nail technician at a marble desk in an elegant salon",
  },
  takeaways: [
    "When the edge of your gel starts to lift, **do not pick at it**: the more you pick, the wider the gap, and the surface of your natural nail comes off with it.",
    "**Do not use your nails as tools** to open cans, peel off labels or prise off lids. All the leverage lands on the nail edge.",
    "**Wear gloves** for long sessions of washing up or laundry. Water and detergents loosen the edges bit by bit.",
    "On the first day after your appointment, **skip the sauna and hot baths**.",
    "**Book your infill on time** and do not go past four weeks: as the nail grows, the gel moves towards the tip and breaks and lifts more easily.",
  ],
  intro: [
    "Why are my gel nails lifting after just a few days? Plenty of people ask this and blame the polish or the technician. In fact, many cases start with small daily habits: picking at an edge once, opening a can with a nail, one round of washing up without gloves. Each habit adds a kind of force or moisture that a layer of gel cannot take for long.",
    "This article follows the lesson “5 habits that make gel nails lift” from the Moja Beauty course at VaraaAi Academy, short customer videos from the Moja Beauty salon in Helsinki. By the end you will know which habits are making your gel lift, how to fix each one, and when to go back to the salon so your technician can take a look.",
  ],
  sections: [
    {
      id: "why-gel-lifts",
      title: "Why gel lifts: it only sits on the surface of the nail",
      blocks: [
        { p: "Gel does not soak into the nail. It bonds firmly to the top layer of your natural nail, like a thin film. The weakest point of that film is its edge: at the cuticle area, along both sides and at the free edge. When the edge is levered up, water gets underneath, or the nail below swells and shrinks, the gel starts to separate from the nail." },
        { img: { src: img("mong-son-gel-do-moi-lam-mong-va-deu"), alt: "Close-up of one finger on a technician's black-gloved hand, a short nail freshly done in glossy red gel with neat, even edges", caption: "A fresh gel manicure: neat, sealed edges. From here, how long it lasts depends a lot on how you use your hands." } },
        { p: "That is what the five habits below have in common: they all attack the edge of the gel. Fix them, and a properly applied gel manicure usually stays good until your next infill appointment." },
      ],
    },
    {
      id: "five-habits",
      title: "5 habits that make gel nails lift",
      blocks: [
        { h3: "1. Picking at the edge as soon as it lifts a little" },
        { p: "When an edge lifts slightly, your fingers want to pick at it. But the more you pick, the wider the gap gets, and the gel does not come off on its own: it takes a thin layer of your natural nail with it. Next time, gel grips less well on a nail surface that has been stripped." },
        { img: { src: img("son-gel-ho-mep-o-chan-mong"), alt: "Close-up of a red gel nail held by a technician in black gloves, the gel at the cuticle area lifted and raised off the nail surface", caption: "Gel lifting at the cuticle area. Do not pick at it; let your technician deal with it." } },
        { h3: "2. Using your nails to open cans, peel labels or prise off lids" },
        { p: "Nails are not tools. When you use the tip of a nail to lever a lid, all the force goes into the edge. The gel cracks, the edge lifts, and sometimes a whole piece chips off the tip. Use a spoon, a small knife or an opener instead, or the pad of your finger rather than the nail tip." },
        { img: { src: img("son-gel-me-o-dau-mong-do-cay-mo-do"), alt: "Close-up of a red gel nail with a chip missing at the corner of the tip, the natural nail showing through, resting on a gloved hand", caption: "A chip at the tip usually comes from using the nail to prise things open." } },
        { h3: "3. Long sessions of washing up or laundry without gloves" },
        { p: "Water and detergents make the gel swell, and the edges gradually lift. The natural nail also soaks up water like a sponge, swelling and then shrinking as it dries, while the gel cannot move with it. Soaking your hands for a long time several times a week is enough to loosen the edges." },
        { img: { src: img("deo-gang-tay-truoc-khi-lam-viec-voi-nuoc"), alt: "A person at a marble sink pulls on black gloves, with a bottle of hand soap and a box of gloves beside them", caption: "Put on gloves before washing up, doing laundry or cleaning." } },
        { h3: "4. A sauna or hot bath on the very first day" },
        { p: "Heat and moisture make the natural nail swell, so the gel separates from it more easily. If you are a regular sauna-goer, this is the one thing to remember after every appointment. On the first day after your nails are done, leave them alone: no sauna, no hot tub, no long soaks." },
        { img: { src: img("ngam-tay-trong-nuoc-am-lam-mong-no-ra"), alt: "A client dips her fingertips into a white porcelain bowl of warm water with rose petals on a marble desk in the salon", caption: "Warm water makes the nail absorb water and swell. The gel cannot swell with it." } },
        { h3: "5. Leaving it more than four weeks before an infill" },
        { p: "As the nail grows, the gel gradually moves towards the tip. The nail becomes top-heavy and breaks and lifts more easily. At the cuticle end, a band of new growth appears with no gel over it." },
        { img: { src: img("mong-moc-ra-lo-khoang-o-chan-mong"), alt: "Close-up of a nail coated in clear gel that has grown out, showing a band of uncovered natural nail right at the cuticle", caption: "New growth showing at the base: time for an infill." } },
      ],
    },
    {
      id: "make-gel-last-longer",
      title: "How to make gel nails last longer: fix each habit",
      blocks: [
        {
          table: {
            head: ["Habit", "Why the gel lifts", "The fix"],
            rows: [
              ["Picking the edge", "The gap widens, nail layers come off", "Leave it, book the salon"],
              ["Nails as tools", "Leverage lands on the edge", "Use an opener or your fingertip"],
              ["Washing up without gloves", "Water and detergent swell the gel", "Wear gloves for wet work"],
              ["Sauna on day one", "Heat and moisture swell the nail", "Wait until the first day is over"],
              ["Late infill", "The gel moves towards the tip", "Book on time, within 4 weeks"],
            ],
          },
        },
        { p: "One more good habit: rub cuticle oil into the skin around your nails every day. Soft skin around the nail means fewer hangnails, and fewer excuses to fiddle with the edge of the gel." },
        { note: "If an edge has already lifted, do not drip glue into the gap or paint over it. Water and dirt can collect under the lifted part. Book an appointment so your technician can file away the lifted area and infill it, or remove the gel properly. The article [what peeling off gel polish does to your nails](lesson:tu-cay-son-gel) explains why.", kind: "warn", title: "When the gel has already lifted" },
      ],
    },
    {
      id: "when-its-the-salon",
      title: "Gel nails lifting after a few days: when it is not your fault",
      blocks: [
        { p: "Not every lift comes down to habits. If you have avoided all five and the gel still lifts within days, look at where it is lifting and tell your technician. The spot usually points to the cause." },
        {
          table: {
            head: ["Where it lifts", "Common cause"],
            rows: [
              ["At the cuticle area", "Thin skin left on the nail plate before the gel"],
              ["At the tip", "The free edge was not capped, or the nail was used to prise"],
              ["A whole piece comes off", "Oil or moisture on the nail, or the gel was under-cured"],
            ],
          },
        },
        { p: "A careful salon looks at where the gel lifted and fixes the right step, rather than blaming the client for everything. The technical side is explained in [what is gel polish](lesson:gel-hieu-dung) in the nail technician course." },
      ],
    },
    {
      id: "infill-on-time",
      title: "How often should you get gel nails redone?",
      blocks: [
        { p: "According to the lesson, do not go past four weeks. After 3–4 weeks the natural nail has visibly grown. An infill at this point rebalances the shape and covers the new growth, so the nails stay strong and even without starting from scratch." },
        { img: { src: img("mong-dai-ra-lop-gel-troi-ra-dau-mong"), alt: "Close-up of a nail coated in clear gel that has grown well past the fingertip, resting on a technician's black-gloved hand in a bright salon", caption: "Left too long, the nail is long and top-heavy. This is when gel is most likely to break and lift." } },
        { p: "The easiest way is to book your next infill as soon as one appointment is done. The lesson [why refill lashes and nails on time](lesson:dam-mi-mong-dung-hen) says more about this, and [what is a nail infill](lesson:fill-mong-hieu-dung) explains what the technician does at an infill appointment." },
      ],
    },
    {
      id: "let-the-salon-look",
      title: "Gel keeps lifting early? Let your technician look",
      blocks: [
        { p: "If your gel nails lift early every time, take a photo of where they lift and [message the salon](lesson:chat-voi-salon) before you go in. On VaraaAi you [book online](lesson:dat-lich-online) by choosing the service and the time, and you can check or move the booking under [my appointments](lesson:lich-hen-cua-toi). This lesson comes from Moja Beauty in Helsinki, and you can book an infill on [Moja Beauty's booking page](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Why are my gel nails lifting after a few days?",
      a: "Usually because of a habit: picking at the edge, using the nails to open things, washing up without gloves or going in the sauna on the first day. If you have avoided all of these and the gel still lifts early, the cause may be in the nail prep, so go back to the salon and let the technician look at where it lifts.",
    },
    {
      q: "Can you go in the sauna after getting gel nails?",
      a: "Avoid the sauna and hot baths on the first day after your appointment. Heat and moisture make the natural nail swell, which makes it easier for the gel to separate from it.",
    },
    {
      q: "Does washing up ruin gel nails?",
      a: "Long sessions of washing up or laundry without gloves can make gel lift over time. Water and detergents make the gel swell and the edges separate from the nail. Wearing gloves for wet work is the simplest way to make gel last longer.",
    },
    {
      q: "What should I do if my gel nails are lifting at the edges?",
      a: "Do not pick or peel, because the gap only gets wider and the surface of your natural nail comes off with the gel. Book an appointment so the technician can file away the lifted part and infill it, or remove the gel properly in the salon.",
    },
    {
      q: "How often should you get gel nails redone?",
      a: "Do not go past four weeks. After 3–4 weeks the nail has grown, the gel has moved towards the tip, and the nail is top-heavy and more likely to break or lift. An infill on time keeps the nails strong and even without starting from scratch.",
    },
  ],
  related: ["tu-cay-son-gel", "mong-co-can-tho", "dam-mi-mong-dung-hen", "gel-hieu-dung"],
};

export default article;
