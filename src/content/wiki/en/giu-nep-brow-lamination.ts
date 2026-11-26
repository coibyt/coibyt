import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/giu-nep-brow-lamination/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "brow-lamination-aftercare",
  lesson: "giu-nep-brow-lamination",
  category: "tips",
  title: "Brow lamination aftercare: 5 steps to keep your brows in shape for 6 weeks",
  metaTitle: "Brow lamination aftercare: keep the shape for 6 weeks",
  metaDescription:
    "Brow lamination aftercare: keep brows dry for 24 hours, brush them every morning, condition every evening, skip sauna, swimming, scrubs and retinol in week one.",
  keyword: "brow lamination aftercare",
  keywords: [
    "can I wash my face after brow lamination",
    "how often can you get brow lamination",
    "how to keep brow lamination in place",
    "brow oil after lamination",
    "sauna after brow lamination",
    "brow lamination dropped",
  ],
  excerpt: "How long laminated brows hold their shape depends a lot on the first 24 hours and the first week. Five things to remember, from keeping them dry to brushing and conditioning.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-thu-gian-mat-nham-long-may-gon"),
    alt: "A client wearing a white headband relaxes on a treatment chair with her eyes closed and tidy brows, an arched window and orchids behind her",
  },
  takeaways: [
    "**Keep your brows completely dry for the first 24 hours**: no washing, no sweating, no brow make-up.",
    "**Every morning**, brush the hairs up into shape with a clean brow brush. It takes a few seconds.",
    "**Every evening**, apply a little brow oil or brow serum, because the lamination solution dries the hairs.",
    "**In the first week**, avoid the sauna, swimming, exfoliating scrubs and retinol creams around the brows.",
    "**Repeat after 6–8 weeks**, not sooner, so the brow hairs get a rest.",
  ],
  intro: [
    "Brow lamination aftercare decides whether your brows hold their shape for the full six weeks or drop after a few days. When you leave the salon, the hairs have been reshaped and fixed, but during the first hours the shape is still setting. Water, sweat and a few skincare habits that seem harmless can make it drop early or leave the hairs dry and frizzy.",
    "This article follows the lesson “Keep a brow lamination looking good for 6 weeks” from the Moja Beauty course at VaraaAi Academy, short customer videos from the Moja Beauty salon in Helsinki. You get a short list to follow: what to do in the first 24 hours, what to do every morning and evening, what to avoid in the first week and when to book again.",
  ],
  sections: [
    {
      id: "why-aftercare-matters",
      title: "Why brow lamination needs aftercare",
      blocks: [
        { p: "Brow lamination reshapes the brow hairs and then brushes them into a neat direction. As with a lash lift, the first solution softens the inner structure of the hair so it takes a new shape, and the second fixes that shape. Those two facts explain almost all of the advice below." },
        {
          ul: [
            "**The shape needs time to set.** In the first 24 hours, getting the brows wet too soon makes the shape drop easily.",
            "**The solution dries the brow hairs.** Dry hairs look frizzy and dull, so they need conditioning every day.",
          ],
        },
        { p: "If you have not had the treatment yet and are still choosing between lamination, a brow tint or permanent make-up, read [what is brow lamination](lesson:brow-lami-tint-phun) first." },
      ],
    },
    {
      id: "what-to-avoid",
      title: "What to avoid in the first week",
      blocks: [
        {
          table: {
            head: ["Avoid", "For how long", "Why"],
            rows: [
              ["Washing or wetting the brows", "First 24 hours", "The shape is setting and drops if wet too soon"],
              ["Heavy sweating", "First 24 hours", "Moisture makes the shape drop"],
              ["Brow make-up", "First 24 hours", "No touching or rubbing the hairs"],
              ["Sauna, swimming", "First week", "Heat and water weaken the shape"],
              ["Scrubs, retinol cream on the brows", "First week", "The skin has just been in contact with the solution"],
            ],
          },
        },
        { img: { src: img("khach-hoi-ve-kem-retinol-dang-dung"), alt: "A client in a bathrobe sitting on a spa bed holds out a tube of cream to show the therapist, in a room with white orchids", caption: "Using a retinol cream or exfoliating product? Keep it off the brow area for the first week." } },
        { note: "Sweaty workouts, the sauna or swimming: if they are already in your diary, book the lamination so the first 24 hours are clear and the first week has no sauna or pool.", kind: "tip", title: "Plan the booking" },
      ],
    },
    {
      id: "dropped-or-dry",
      title: "Brow lamination dropped or brows feel dry: what to do",
      blocks: [
        { p: "If your brows got wet on the first day, the shape may not be as neat as when you left. Do not rush straight back for another treatment. Keep brushing the hairs into shape every morning and conditioning them every evening, and ask your therapist if the shape will not hold." },
        { p: "Do not repeat the lamination sooner than six to eight weeks. The solution has already dried the hairs, and a second treatment too soon can leave them dry, brittle and breaking, and then the only option is to wait for new hairs to grow." },
        { note: "If the brow area stays red, itchy, swollen or burning after the treatment, tell the salon and ask a doctor. Do not put extra unfamiliar products on that skin. See also [gel nail allergy, lash glue and hair dye reactions](lesson:di-ung-hoa-chat).", kind: "warn", title: "If your skin reacts" },
        { img: { src: img("chuyen-vien-dan-do-khach-sau-lieu-trinh"), alt: "A spa therapist in a cream top holds a clipboard and smiles as she gives aftercare advice to a client in a headband and bathrobe sitting in an armchair", caption: "Listen carefully to the aftercare advice before you leave, especially which oil to use." } },
      ],
    },
    {
      id: "when-to-repeat",
      title: "How often can you get brow lamination?",
      blocks: [
        { p: "The shape usually lasts about six to eight weeks. After that, new brow hairs that have not been laminated grow in, and the brows gradually return to how they were. That is the time to repeat, not before, so the brow hairs have time to rest between two treatments with the solution." },
        { img: { src: img("ghi-ngay-lam-de-hen-lan-sau"), alt: "A spa therapist sits at a marble table beside an arched window typing notes on a tablet, a treatment bed and essential oil bottles behind her", caption: "Noting the treatment date helps you and the salon know when the next one is due." } },
        { p: "The easiest way is to book the next appointment as soon as this one is done. On VaraaAi, your bookings are under [my appointments](lesson:lich-hen-cua-toi), where you can check or change them when you need to." },
      ],
    },
    {
      id: "try-brow-lamination",
      title: "Want to try brow lamination?",
      blocks: [
        { p: "You can [message the salon](lesson:chat-voi-salon) to ask whether your brows suit lamination, then [book online](lesson:dat-lich-online): choose the service, choose the time, done. This lesson comes from Moja Beauty in Helsinki, where you can book on [Moja Beauty's booking page](/b/moja-beauty). Cold weather dries out lashes and brows too, and [keep lashes and nails from drying out in winter](lesson:mi-mong-mua-dong) has a few more helpful habits." },
      ],
    },
  ],
  howTo: {
    title: "Brow lamination aftercare step by step",
    id: "aftercare-steps",
    after: "why-aftercare-matters",
    lead: "Five things in the order they come, from leaving the salon to your next appointment.",
    steps: [
      {
        name: "Keep your brows dry for the first 24 hours",
        text: "Do not wash your brows, let sweat run onto them or wear brow make-up. This is when the shape is setting, and getting them wet too soon makes it drop. When you wash your face, avoid the brows and gently pat the skin around them dry.",
      },
      {
        name: "Every morning, brush the hairs up into shape",
        text: "Use a clean brow brush to brush the hairs up in the direction your therapist set. In a few seconds your brows are tidy, with no gel or pencil. Brush lightly and do not tug, or the hairs change direction.",
        image: { src: img("chai-soi-len-theo-mot-nep-sau-khi-uon"), alt: "A technician in black gloves uses a metal tool to comb each lash up onto a silicone shield, the client's full, tidy brows visible above" },
      },
      {
        name: "Every evening, condition your brows",
        text: "Apply a little brow oil or brow serum. The lamination solution dries the hairs, and regular conditioning helps them become soft and glossy again. A small amount is enough; wipe off any excess so it does not run into your eyes.",
      },
      {
        name: "In the first week, avoid heat and strong products",
        text: "No sauna, no swimming, no scrubs and no retinol cream on the brow area in the first week. Heat, water and these products can weaken the shape or irritate the skin around the brows.",
      },
      {
        name: "Repeat after 6–8 weeks",
        text: "Book the next treatment in six to eight weeks, once new brow hairs have grown in. Do not go sooner, so the hairs get a rest between two laminations.",
      },
    ],
  },
  faq: [
    {
      q: "Can I wash my face after brow lamination?",
      a: "For the first 24 hours, keep the brow area completely dry: no washing the brows, no sweating, no brow make-up. You can clean the rest of your face but keep water away from your brows, because getting them wet too soon makes the shape drop.",
    },
    {
      q: "How long does brow lamination last?",
      a: "The shape usually lasts about six to eight weeks. Keeping the brows dry for the first 24 hours, brushing them every morning and conditioning them every evening helps them look good for that whole time.",
    },
    {
      q: "How often can you get brow lamination?",
      a: "Every six to eight weeks. Do not go sooner, so the brow hairs get a rest, because the solution dries them and repeating too soon can leave them dry and brittle.",
    },
    {
      q: "Can you go in the sauna after brow lamination?",
      a: "Avoid the sauna and swimming in the first week after the treatment. Heat and water can weaken the shape before it has had time to settle.",
    },
    {
      q: "What should I put on my brows after lamination?",
      a: "Every evening, apply a little brow oil or brow serum. The lamination solution dries the hairs, and regular conditioning keeps them soft and glossy. Ask your therapist which product suits your brows.",
    },
    {
      q: "Can I use retinol after brow lamination?",
      a: "In the first week, keep retinol creams and exfoliating scrubs off the brow area. On the rest of your face you can follow your usual skincare routine, but keep those products away from your brows.",
    },
  ],
  related: ["brow-lami-tint-phun", "mi-mong-mua-dong", "cham-soc-sau-lam-mi", "lash-lift-hieu-dung"],
};

export default article;
