import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-soi-da/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-a-skin-analysis",
  lesson: "spa-soi-da",
  category: "spa",
  title: "How to do a skin analysis: 10 steps for a facial consultation in the treatment room",
  metaTitle: "How to do a skin analysis: 10 steps in the salon",
  metaDescription:
    "How to do a skin analysis step by step: consultation form, cleansing, zone-by-zone check under a magnifier lamp, blotting paper test, notes and the treatment.",
  keyword: "how to do a skin analysis",
  keywords: [
    "skin analysis steps",
    "facial skin consultation",
    "skin analysis with a magnifying lamp",
    "blotting paper skin type test",
    "how to determine skin type",
    "skin analysis before a facial",
  ],
  excerpt: "A skin analysis and consultation for a new client: ask first, cleanse, check five zones in a fixed order, test with blotting paper and write down what you saw.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("soi-da-bang-den-lup-cho-khach-tai-spa"),
    alt: "A skin therapist leans over a lit round magnifier lamp to study a client's face as she lies on a bed with cotton pads over her eyes, beside an arched window",
  },
  takeaways: [
    "Three rules run through the whole session: **ask before you work**, analyse **clean skin** in good light, and **don't diagnose**.",
    "Cover the client's eyes with cotton pads before you bring the magnifier lamp close, because the lamp is very bright.",
    "Work in one fixed order: forehead, T-zone, cheeks, jaw and chin, neck.",
    "Press blotting paper on the forehead, nose and cheeks: where the paper turns translucent, there is more oil.",
    "Record what you see, never the name of a disease, and only with the client's consent.",
  ],
  intro: [
    "How to do a skin analysis properly does not start with the magnifier lamp; it starts with questions. Before you look at the skin, you need to know what the client is allergic to, which medicines she takes and what she uses at home. Then the skin is cleansed, checked zone by zone in an order that never changes, tested with blotting paper and fingertips, and everything is written down. That routine decides whether the treatment that follows suits the skin.",
    "This article follows the VaraaAi Academy lesson “Skin analysis and consultation: step by step” in the Spa & skin care course, carried out on a new client. With the ten steps below you can analyse the skin, determine the client's skin type and skin condition, and explain to her what is right for today. If the difference between a skin type and a skin condition is still unclear, read the theory article [Facial skin types and skin conditions](lesson:spa-soi-da-hieu-dung) first.",
  ],
  sections: [
    {
      id: "three-rules",
      title: "Three rules for every skin analysis",
      blocks: [
        {
          table: {
            head: ["Rule", "Why"],
            rows: [
              ["Ask before you work", "Medicines, products in use and recent treatments change what the skin can take, and you cannot see them"],
              ["Analyse clean skin in good light", "Skin with make-up or cream on it is misread from the very start"],
              ["Don't diagnose", "The therapist describes what she sees. Naming a disease is a doctor's job"],
            ],
          },
        },
        { note: "The lesson is a training aid, not a licence. The scope of a skin therapist's work and the hygiene rules differ from country to country.", kind: "info", title: "Before you start" },
      ],
    },
    {
      id: "zone-by-zone",
      title: "Skin analysis with a magnifying lamp: what to look for in each zone",
      blocks: [
        { p: "A fixed order does two things: no area is missed, and next time the skin is easy to compare with your earlier notes. Each zone has its own things to look for." },
        {
          table: {
            head: ["Zone", "What to look at"],
            rows: [
              ["Forehead", "Oil, pores, horizontal lines"],
              ["T-zone (centre of forehead, nose, chin)", "Usually the oiliest area, with the most blackheads"],
              ["Cheeks", "Redness, small blood vessels, brown spots, dryness"],
              ["Jawline and chin", "Small spots, bumps under the skin"],
              ["Neck", "The skin is thin there and needs the same care as the face"],
            ],
          },
        },
        { note: "Look at the skin from several angles. Tilt the lamp so the light skims across the skin and you clearly see texture, pores and fine lines. Look straight on and you see colour: redness, brown spots, dark marks.", kind: "tip", title: "Tilt for texture, look straight for colour" },
        { p: "Three places are easy to forget: around the ears, along the hairline and under the chin. Small spots often appear there and few people notice them." },
      ],
    },
    {
      id: "reading-the-results",
      title: "How to determine skin type from what you have seen",
      blocks: [
        { p: "What you saw under the lamp and felt under your fingertips adds up to an assessment. These are the situations you will meet most often." },
        {
          table: {
            head: ["You see", "Assessment", "Keep in mind"],
            rows: [
              ["Oil in the T-zone, dry cheeks", "Combination skin", "Each area may need different care"],
              ["Blackheads on the nose and chin", "Congested skin", "Extractions only if you are trained and the salon allows it"],
              ["Redness on the cheeks, small visible vessels", "Skin is sensitive right now", "Work very gently, choose mild products"],
              ["Brown spots on the cheekbones", "Pigmentation", "Closely linked to the sun"],
              ["Blotting paper turns translucent", "That area is oily", "Test once the skin has rested after cleansing"],
              ["Flushes at a light touch", "Sensitive skin", "Note it and choose gentle products"],
            ],
          },
        },
        { img: { src: img("luot-dau-ngon-tay-tren-ma-de-cam-nhan-da"), alt: "A client lies with her eyes closed in a white headband while a skin therapist rests the fingertips of both hands lightly on her cheeks", caption: "Glide your fingertips lightly over the cheeks to feel whether the skin is smooth, rough or tight." } },
        { p: "This assessment is about skin type and skin condition, not about disease. One skin can be combination, slightly dehydrated and congested on the nose all at once, and all three are written down." },
      ],
    },
    {
      id: "when-not-to-treat",
      title: "When not to treat, and how to tell the client",
      blocks: [
        { p: "Some things show up during the consultation or as soon as the skin is clean, and they change the plan for the whole session:" },
        {
          ul: [
            "Sunburn.",
            "Scratches or broken skin.",
            "Cold sores.",
            "An area that is swollen, red and painful.",
          ],
        },
        { p: "When you see any of these, you do not treat that area. Speak gently, describe what you see and suggest the client asks a doctor. If that means the treatment she wanted cannot be done today, tell her clearly, then offer a gentler treatment or another appointment." },
        { note: "A skin therapist does not diagnose and does not promise to cure any skin problem. The lesson [When not to treat a client](lesson:khi-nao-khong-lam) covers the warning signs and how to say no tactfully.", kind: "warn", title: "If something worries you, refer to a doctor" },
      ],
    },
    {
      id: "hygiene-and-gloves",
      title: "Hand washing, gloves and clearing the room after each client",
      blocks: [
        { p: "Before you touch the client, wash your hands with soap and dry them, as in the lesson [Hand washing and gloves](lesson:rua-tay-gang-tay). When you test the skin by hand, use clean hands or gloves. Whether to wear gloves when touching the skin follows your salon's rules and the rules where you work." },
        { p: "Once the client has left, change the towels and the bed linen, wipe down the bed and the magnifier lamp, then wash your hands again. The lamp is often forgotten because it never touches the client, yet your hands touch it all through the session." },
      ],
    },
    {
      id: "record-and-rebook",
      title: "Save the skin analysis in the client record and book the next visit",
      blocks: [
        { p: "A skin analysis is only worth something over time if it is written down. In VaraaAi you save the results in the internal notes on the client record in your [client list](lesson:khach-hang). Only the salon can see those notes, and they are written only with the client's consent. If you want to photograph the skin to compare next time, ask the client first too." },
        { p: "While the client is still at the desk, book the next [appointment](lesson:lich-hen) so you can see together how the skin changes. If you want clients to book a skin analysis and consultation online themselves, [add it as a service](lesson:dich-vu) with enough time for the questions and the notes. The steps of the facial that follows the analysis are in the article [How to do a basic facial](lesson:spa-facial)." },
      ],
    },
  ],
  howTo: {
    title: "Skin analysis steps: from consultation to clean room",
    id: "skin-analysis-steps",
    after: "three-rules",
    lead: "Ten steps in the order of the lesson, from the moment the client walks in to the moment the room is ready for the next one.",
    supplies: [
      "A robe, a soft fabric headband, towels and a blanket for the client",
      "A consultation form and a pen",
      "Make-up remover, cleanser and cotton pads",
      "A magnifier lamp with light, and cotton pads for the eyes",
      "Blotting paper",
      "Gloves, if your salon's rules require them",
    ],
    steps: [
      {
        name: "Welcome the client and wash your hands",
        text: "Greet the client, invite her to sit down, offer a glass of water, then show her a private place to change into a robe. If she wears contact lenses, ask her to take them out first: the magnifier lamp is very bright and you may need to cleanse around the eyes. Put on a soft fabric headband to keep the hair off the face. Wash your hands with soap and dry them before you touch her.",
        image: { src: img("deo-bang-do-cho-khach-truoc-khi-soi-da"), alt: "A skin therapist fits a white fabric headband on a client in a white robe who sits on the edge of a treatment bed" },
      },
      {
        name: "Go through the consultation form",
        text: "Sit at the client's eye level and ask calmly: allergies and earlier reactions to cosmetics, current medicines, products she uses at home (especially retinoids or acids), whether she takes isotretinoin, recent treatments and sun exposure. If she is pregnant, ask more and choose products by the brand's guidance. Ask what she hopes for and where her skin feels uncomfortable. Explain why you ask: to choose the right products and avoid risks. Ask regular clients again too.",
        image: { src: img("khach-dua-san-pham-dang-dung-khi-tu-van-da"), alt: "A client in a cream robe sits on the bed and holds out an unlabelled white tube of cream in her palm for the skin therapist to see", caption: "Ask exactly what the client uses at home, especially retinoids or acids." },
      },
      {
        name: "Stop if something worries you",
        text: "Sunburn, a scratch, a cold sore, an area that is swollen, red and painful: do not treat that area. Speak gently, describe what you see and suggest the client asks a doctor. Do not name a disease.",
      },
      {
        name: "Cleanse to see the real skin",
        text: "The client lies on the bed under a towel and a blanket, with only the face, neck and shoulders showing. Remove eye and lip make-up very gently, then cleanse the face. Make-up and cream hide the real skin, so analysing before cleansing means reading it wrong from the start.",
        image: { src: img("lam-sach-da-mat-truoc-khi-soi-da"), alt: "A client lies with her eyes closed in a white headband while a skin therapist's hands spread white cleanser over both her cheeks" },
      },
      {
        name: "Cover the eyes and analyse under the magnifier lamp",
        text: "Place cotton pads over the client's eyes first, then bring the lamp close. Go through the face area by area in the same order every time: forehead, T-zone, cheeks, jawline and chin, and the neck last. Tilt the lamp to see texture, look straight on to see colour, and do not forget around the ears, the hairline and under the chin.",
        image: { src: img("che-mat-khach-va-soi-da-duoi-den-lup"), alt: "A client lies with two white cotton pads over her eyes while a skin therapist leans in to study her cheek through a lit round magnifier lamp", caption: "Cotton pads go on first, then the lamp comes close." },
      },
      {
        name: "Test with blotting paper and your fingertips",
        text: "The test is only accurate once the skin has rested for a while after cleansing. Press a piece of blotting paper gently on the forehead, nose and cheeks: where it turns translucent, there is more oil. Then glide your fingertips lightly over the cheeks to feel whether the skin is smooth, rough or tight. Any spot that flushes as soon as you touch it is noted as sensitive.",
        image: { src: img("thu-da-bang-giay-tham-dau-tren-tran"), alt: "A skin therapist's hands press a white sheet of blotting paper gently onto the forehead of a client lying with her eyes closed" },
      },
      {
        name: "Write down what you saw",
        text: "Record the skin type, the condition of each zone, what the client told you, and anything you decided not to do and why. Write what you observed, never the name of a disease. This is private information, recorded only with the client's consent.",
        image: { src: img("ghi-ket-qua-soi-da-vao-ho-so-khach"), alt: "A skin therapist sits at a small stone desk by an arched window typing notes on a tablet, an empty treatment bed behind her" },
      },
      {
        name: "Choose the treatment and explain it",
        text: "Base the choice on your notes. For combination skin, slightly dehydrated, with a few blackheads on the nose: a gentle cleanse, a light exfoliation, a suitable mask, and extractions only if you have been trained and the salon allows it. Tell the client what you will do, how it will feel and what the real result will be.",
      },
      {
        name: "Give a home-care plan and book the next visit",
        text: "A short plan: gentle cleansing morning and evening, a moisturiser for her skin type, sunscreen every morning. Write it down for her to take home. Tell her that if her skin feels uncomfortable with a new product, she should stop using it and let the salon know. Then book the next appointment right at the desk.",
        image: { src: img("dat-lich-hen-lan-sau-tai-quay-spa"), alt: "At a stone reception desk in a spa, a staff member shows a tablet to a client in a cream jumper, both of them smiling" },
      },
      {
        name: "Clear the room after the client leaves",
        text: "Change the towels and linen, wipe down the bed and the magnifier lamp, then wash your hands. The room is ready for the next client only when all of this is done.",
      },
    ],
  },
  faq: [
    {
      q: "What are the steps of a skin analysis?",
      a: "Go through the consultation form, cleanse the skin, cover the client's eyes and check each zone under a magnifier lamp, test with blotting paper and your fingertips, then write it all down. Only after that do you choose the treatment, explain it and give a home-care plan.",
    },
    {
      q: "Why cleanse the skin before a skin analysis?",
      a: "Because make-up and cream hide the real skin. Analysing skin that is not clean means reading it wrong from the start, which leads to the wrong products and the wrong treatment.",
    },
    {
      q: "How do you test skin type with blotting paper?",
      a: "After cleansing, let the skin rest for a while, then press a piece of blotting paper gently on the forehead, nose and cheeks. Where the paper turns translucent, there is more oil. Oil in the T-zone while the cheeks stay dry is a sign of combination skin.",
    },
    {
      q: "In what order do you analyse the skin under a magnifying lamp?",
      a: "Forehead, T-zone, cheeks, jawline and chin, then the neck. Keep the same order every time so no area is missed and the results are easy to compare with the last visit. Cover the client's eyes with cotton pads before the lamp comes close, because it is very bright.",
    },
    {
      q: "What should you do if you find a cold sore or a swollen red area during a skin analysis?",
      a: "Do not treat that area. Speak gently, describe what you see without naming a disease, and suggest the client asks a doctor. You can offer a gentler treatment elsewhere on the skin, or another appointment.",
    },
    {
      q: "What goes in the client record after a skin analysis?",
      a: "The skin type, the condition of each zone, what the client told you, and anything you decided not to do and why. Write what you saw, not the name of a disease. It is private information, so record it only with the client's consent, and ask before taking photos of the skin.",
    },
  ],
  related: ["spa-soi-da-hieu-dung", "spa-facial", "khi-nao-khong-lam", "rua-tay-gang-tay"],
};

export default article;
