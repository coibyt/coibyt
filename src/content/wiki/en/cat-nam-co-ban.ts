import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-co-ban/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-cut-mens-hair",
  lesson: "cat-nam-co-ban",
  category: "hair",
  title: "How to cut men's hair: 12 steps from clipper sides to a clean outline",
  metaTitle: "How to cut men's hair: 12 steps with clippers and scissors",
  metaDescription:
    "How to cut men's hair step by step: neck strip, consultation, guarded clipper on sides and nape, scissor-over-comb, a top guideline, outline, sideburns and nape.",
  keyword: "how to cut men's hair",
  keywords: [
    "men's haircut step by step",
    "how to cut men's hair with clippers",
    "how to cut men's hair with scissors",
    "classic short back and sides",
    "cut men's hair wet or dry",
    "how to line up sideburns and the neckline",
    "cutting men's hair at home",
  ],
  excerpt: "A classic short men's cut in the right order: sides and back with clippers, blended up with scissor-over-comb, the top cut to a guideline, then the outline.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-cat-toc-nam-trong-tiem-barber-sang-trong"),
    alt: "A barber in a purple waistcoat holds a comb behind a male client in a black cape, in a dark wood-panelled barbershop with brass-framed mirrors",
  },
  takeaways: [
    "Agree four things before you cut: how short the sides, how much on top, a square or rounded nape, and where the sideburns stop.",
    "Clip with the agreed guard **or a longer one**, guard flat, moving up against the growth, and flick the wrist out at the parietal ridge.",
    "The first section at the front of the top is the **guideline**: each next section takes a little of the previous one and keeps the same elevation.",
    "Go shorter, or take the guard off, at the very bottom edge only if the client agreed beforehand.",
    "Before the client leaves, note the guard, lengths and nape shape in the record and book the next visit in about 3–5 weeks.",
  ],
  intro: [
    "Learning how to cut men's hair starts with the cut every barber has to know by heart: the classic short style, with short sides and back blending softly into a longer top and a neat outline. It needs no special tools. It needs the right order and a hand that does not rush.",
    "This article follows the routine of the VaraaAi Academy lesson “Men's haircut basics: step-by-step practice” in the Hair course, from wrapping the neck strip to sweeping the floor under the chair. Follow it and you can cut a complete short men's style and check it before the client stands up. The reasons behind each move are in the theory article [men's haircut basics](lesson:cat-nam-co-ban-hieu-dung).",
  ],
  sections: [
    {
      id: "agree-with-the-client",
      title: "The classic short men's cut and four things to agree with the client",
      blocks: [
        { p: "Before the clippers go on, both of you have to picture the same cut. For the classic short style, four questions are enough, as in the article on [how to section hair for cutting](lesson:toc-tu-van-chia-vung)." },
        {
          table: {
            head: ["Ask the client", "Agree it with"],
            rows: [
              ["How short the sides", "A specific guard"],
              ["How much is left on top", "Your fingers: “about this much”"],
              ["Square or rounded nape", "One or the other, said clearly"],
              ["Where the sideburns end", "Point to the spot on the client's face"],
            ],
          },
        },
        { p: "Also ask how the last cut was done and whether there was anything the client did not like. What they did not like often matters more than what they did. While you talk, comb the hair in a few directions to find whorls and look at the scalp." },
        { note: "Guard numbers differ between clipper brands. If a new client quotes a number they are used to from another barber, start with a longer guard and work down.", kind: "tip", title: "From the trade" },
      ],
    },
    {
      id: "wet-or-dry",
      title: "Should you cut men's hair wet or dry",
      blocks: [
        { p: "In the lesson the hair is evenly dampened with a fine mist before cutting. Many barbers instead do the clipper work on clean, dry hair and only dampen it for the scissor work on top. Either way is fine, as long as the hair is clean, combed straight and free of tangles." },
        { p: "What to avoid is hair that drips. Comb as you spray, in the direction the hair falls naturally, and stop once it is evenly damp." },
      ],
    },
    {
      id: "four-checks",
      title: "Four checks during one men's haircut",
      blocks: [
        { p: "Beginners tend to cut straight through and only look at the end, when fixing things is hard. An experienced barber stops to check after each stage, and each check takes only a few seconds." },
        {
          ol: [
            "**After the clipper pass.** Comb the hair down and go over it again in another direction, so hairs that lay flat the first time are not missed.",
            "**After cutting the top.** Cross-check with sections across the head from side to side, and trim any piece that sticks up.",
            "**After blending the top into the sides.** Run your hand up from below and look in profile. Move on to the outline only when no step is left.",
            "**After the outline.** Head straight, eyes on the mirror, two fingers comparing the sideburns. Then hold up the hand mirror so the client can see the nape.",
          ],
        },
        { p: "Halfway through the top, stop once as well, look in the mirror and ask the client whether the length is right. Asked while the hair is still long, it can still be changed." },
      ],
    },
    {
      id: "square-or-rounded-nape",
      title: "A square or rounded neckline, and when the guard may come off at the bottom",
      blocks: [
        { p: "Neither a square nor a rounded nape is more correct than the other. You do exactly what you agreed in the consultation. For the outline, have the client tip the head forward slightly, tidy the edge along the hairline and do not push the neckline up too high." },
        { img: { src: img("vien-gay-toc-nam-bang-tong-do-vien"), alt: "A barber standing behind a male client holds his slightly lowered head with one hand and tidies the neckline with a small black trimmer in the other", caption: "The client tips his head forward a little while the barber's free hand keeps it steady for the neckline." } },
        { p: "The very bottom of the sides and nape is where barbers are often tempted to go shorter for a cleaner look. Use a shorter guard, or none, along that bottom edge only when the client has agreed to it beforehand. Without that agreement, leave it, because hair cut short cannot be made long again." },
      ],
    },
    {
      id: "hygiene-and-safety",
      title: "Tool hygiene and when not to cut",
      blocks: [
        { p: "Clippers, guards, combs and scissors are cleaned and disinfected after every client, following the instructions of the disinfectant you use. Neck strips and razor blades are single-use. The clipper blade is oiled after disinfecting so it runs smoothly for the next client." },
        { note: "A scalp with a wound, inflammation or lice means no cut. Hygiene rules for hair salons differ by country, so check the rules where you work. See also [Tools after every customer](lesson:ve-sinh-dung-cu) and [When not to treat a customer](lesson:khi-nao-khong-lam).", kind: "warn", title: "Safety" },
      ],
    },
    {
      id: "client-record",
      title: "Write it down, so next time the client only says “same as last time”",
      blocks: [
        { p: "A satisfied male client usually comes back for exactly the same cut. That makes three details of today's cut worth recording: which guard on the sides, how long on top, square or rounded nape. In VaraaAi you write them in the client's notes in the [customer records](lesson:khach-hang). Next time, whoever in the salon takes the chair can cut it exactly the same." },
        { p: "A short cut keeps its shape for about 3–5 weeks, so book the next visit while the client is still in the chair. You can put it straight into the salon's [appointment calendar](lesson:lich-hen), or use the [loyalty card](lesson:the-khach-quen) to give the client a reason to come back regularly." },
      ],
    },
  ],
  howTo: {
    title: "How to cut men's hair: the steps in order",
    id: "mens-haircut-steps",
    after: "agree-with-the-client",
    lead: "The twelve steps follow the order of the lesson video: clippers first, scissors next, the outline last.",
    supplies: [
      "Clipper and guards, cleaned and disinfected",
      "Trimmer for the outline",
      "Cutting comb and scissors, cleaned and disinfected",
      "Fine-mist spray bottle",
      "Single-use neck strip and cape",
      "Neck brush and hand mirror",
      "A little styling product",
    ],
    steps: [
      {
        name: "Wash your hands and wrap the neck strip",
        text: "Wash your hands and check that the clipper, guards, combs and scissors have all been cleaned and disinfected since the last client. Wrap a single-use neck strip round the client's neck and only then fasten the cape over it. The strip keeps the cape from touching each client's skin directly.",
        image: { src: img("quan-giay-co-truoc-khi-cat-toc-nam"), alt: "A barber wraps a white paper strip round the neck of a male client sitting side-on, the black cape already over his shoulders" },
      },
      {
        name: "Consult and agree the lengths",
        text: "Ask the four questions: sides, top, nape shape and sideburns. Fix the sides with a guard number and the top with your fingers. Comb the hair in a few directions to find whorls, and look over the scalp before you start.",
      },
      {
        name: "Dampen the hair",
        text: "Mist evenly, combing as you spray in the direction the hair falls naturally. Evenly damp is enough, never dripping. If you prefer to clip clean, dry hair, leave this step until just before the scissor work.",
      },
      {
        name: "Clip the sides with a guard",
        text: "Put on the agreed guard, or a slightly longer one. Place it flat against the head at the hairline and move up against the growth, slowly and steadily, each pass overlapping a little. Around the parietal ridge, ease off and flick the wrist outwards. Near the ear, fold it down gently with a finger to keep it out of the way, and never press the clipper hard into the head.",
        image: { src: img("di-tong-do-co-cu-nguoc-chieu-toc-moc"), alt: "A barber runs a clipper with a black guard up the side of a male client's head, his other hand resting on top to hold the hair", caption: "Guard flat, clipper moving upwards. The free hand keeps the top hair out of the clipper's path." },
      },
      {
        name: "Clip the back from the nape to the occipital bone",
        text: "The back works like the sides: start at the nape hairline, work up to the occipital bone and flick the wrist out. After one pass, comb the hair down and go over it again in another direction so no hairs are missed. Only if you agreed a shorter bottom edge with the client do you now change to a shorter guard or take it off, and only along that bottom edge.",
        image: { src: img("di-tong-do-tu-gay-len-xuong-cham"), alt: "Seen from behind, a barber runs a guarded clipper up the back of a male client's head, his other hand resting lightly on the client's neck" },
      },
      {
        name: "Blend upwards with scissor-over-comb",
        text: "Place the comb close to the head where the clipper stopped, teeth angled slightly out. Cut the hair that comes through the comb with the blade running parallel to it. Move the comb gradually up and angle it further out, so the hair gets longer towards the top. Work all round the sides and then the back, and never stay long in one place, or you will leave a step.",
        image: { src: img("keo-tren-luoc-noi-toc-hai-ben"), alt: "A barber holds a black comb supporting a layer of a male client's hair and cuts with scissors the hair standing above the spine of the comb", caption: "The blade runs parallel to the comb and only cuts what comes through the teeth." },
      },
      {
        name: "Cut the guideline on top",
        text: "Section the top from the two front corners of the forehead back to the crown. Take a thin section at the front, lift it straight up at a right angle to the scalp, hold it between your index and middle fingers and cut it to the agreed length. That is your guideline. Each section behind it takes in a little hair from the previous one to follow, at the same elevation, all the way to the crown. At the whorl, leave it a little longer and use light tension so the hair does not stand up.",
        image: { src: img("cat-duong-chuan-phan-dinh-toc-nam"), alt: "A barber holds a section of a male client's top hair between index and middle fingers, lifted straight up, and cuts above his fingers with scissors", caption: "The section is lifted at a right angle to the scalp and cut above the fingers." },
      },
      {
        name: "Cross-check the top",
        text: "You have just cut from the front towards the back. Now comb the hair up in horizontal sections from one side to the other, hold each between your fingers and see whether the length is even. Trim any piece that sticks up to match.",
        image: { src: img("kiem-tra-cheo-phan-dinh-toc-nam"), alt: "A barber lifts a section of a male client's top hair high with a comb and holds it between his fingers to check the length" },
      },
      {
        name: "Blend the top into the sides",
        text: "At the corner where the sides meet the top there is often still a slight ridge. Use scissor-over-comb, or cut the corner hair out towards the outside, until you can run your hand up from below and feel no step. Look in profile in the mirror to check both sides.",
      },
      {
        name: "Outline the ears, sideburns and nape",
        text: "Fold the ear down gently and use the trimmer to follow a natural curve along the hairline, without cutting too high. Cut both sideburns to the same length: the client sits up straight looking into the mirror, and you place a finger at the bottom of each to compare. Finish with a square or rounded nape as agreed, with the client's head tipped slightly forward.",
        image: { src: img("vien-toc-quanh-tai-bang-tong-do-vien"), alt: "A barber folds a male client's ear down with one finger and tidies the hairline beside it with a small trimmer in his other hand" },
      },
      {
        name: "Brush off, style and show the hand mirror",
        text: "Brush loose hair off the neck and around the ears with a neck brush, remove the cape and throw away the neck strip. Work in a little styling product the way the client will at home, and show them how. Hold the hand mirror behind them so they can see the nape and sides. If they want something adjusted, do it there and then, rather than letting them get home and only then find they are not happy.",
        image: { src: img("cho-khach-xem-gay-bang-guong-tay"), alt: "A barber holds a round brass-framed hand mirror behind a male client's head so he can see the freshly cut nape" },
      },
      {
        name: "Record, rebook and clean up",
        text: "Note in the client record which guard on the sides, how long on top and square or rounded nape, then book the next visit, usually in 3–5 weeks. Once the client has gone, brush the hair out of the clipper blade, disinfect the blade, guards, combs and scissors as the product instructs, oil the blade and sweep up the hair under the chair.",
      },
    ],
  },
  faq: [
    {
      q: "What are the steps of a basic men's haircut?",
      a: "Preparation and neck strip, consultation, dampening, guarded clipper on the sides and back, blending upwards with scissor-over-comb, cutting the top to a guideline, cross-checking, blending the top into the sides, outlining ears, sideburns and nape, then brushing off, styling and showing the client the hand mirror.",
    },
    {
      q: "Do you cut the sides or the top first?",
      a: "In the lesson's routine the sides and back come first, with a guarded clipper, then they are blended upwards with scissor-over-comb. The top is cut afterwards with scissors, following a guideline at the front. Blending the top into the sides and the outline come last.",
    },
    {
      q: "What is the guideline when cutting the top?",
      a: "It is the first thin section at the front of the top, lifted at a right angle to the scalp and cut to the agreed length. Each section behind it takes in a little of the previous one and is cut to match, so the top stays even from the front to the crown.",
    },
    {
      q: "When can you take the clipper guard off at the bottom edge?",
      a: "Only when you agreed it with the client beforehand. Hair cut short cannot be made long again, so any change in length needs the client's agreement. If you have not asked, keep the agreed guard.",
    },
    {
      q: "Should men's hair be cut wet or dry?",
      a: "Both work. The lesson dampens the hair evenly with a fine mist before cutting, while many barbers clip clean, dry hair and dampen it only for the scissor work. Either way the hair must be clean, combed straight, free of tangles and never dripping.",
    },
    {
      q: "Can I follow these steps to cut men's hair at home?",
      a: "The order of the steps stays the same. A beginner should start with a guard longer than the length they want, keep it flat, never press the clipper hard and not take the guard off at the bottom edge. A scalp with a wound, inflammation or lice means no cut.",
    },
  ],
  related: ["cat-nam-co-ban-hieu-dung", "toc-tu-van-chia-vung", "cat-nam-fade", "cat-nam-tao-kieu"],
};

export default article;
