import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-soi-da-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "facial-skin-types-and-skin-conditions",
  lesson: "spa-soi-da-hieu-dung",
  category: "spa",
  title: "Facial skin types and skin conditions: oily, dry, combination and sensitive skin explained",
  metaTitle: "Facial skin types: oily, dry, combination, sensitive",
  metaDescription:
    "Facial skin types and how they differ from skin conditions: why oily skin can be dehydrated, what a skin analysis looks for and when to refer to a doctor.",
  keyword: "facial skin types",
  keywords: [
    "skin type vs skin condition",
    "dry vs dehydrated skin",
    "can oily skin be dehydrated",
    "what is combination skin",
    "what is sensitive skin",
    "skin consultation form",
    "waxing while on isotretinoin",
  ],
  excerpt: "The five skin types, the five most common skin conditions and why the two must never be confused, plus the questions a skin therapist asks before any treatment.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-spa-chuan-bi-soi-da-cho-khach"),
    alt: "A skin therapist in a cream tunic stands beside a client lying on a treatment bed, next to a round magnifier lamp, in a travertine room with arched windows",
  },
  takeaways: [
    "A **skin type** is fairly stable: normal, dry, oily, combination, sensitive. A **skin condition** changes with the season, products, age and sleep.",
    "Lack of oil is dry skin. Lack of water is a condition that any skin type can have, **oily skin included**.",
    "Read the skin with your eyes, your hands and your questions: clean skin, good light, a magnifier lamp and a consultation form that asks about allergies, medicines and products in use.",
    "A client taking isotretinoin, or who stopped within about six months: no waxing. Skin on retinoids or acids: avoid strong exfoliation.",
    "A skin therapist **does not diagnose**. If something worries you, leave that area alone, describe what you see and suggest a doctor.",
  ],
  intro: [
    "Facial skin types are usually given as five: normal, dry, oily, combination and sensitive. Knowing those five names is only half the picture. The other half is the skin's condition, which shifts with the season and with every new jar of cream, and which explains why oily skin can still feel tight and sore from dehydration. Mixing the two up is the most common mistake when choosing products and treatments.",
    "This article follows the VaraaAi Academy lesson “Skin analysis and consultation: understand it to choose the right treatment”, the opening lesson of the Spa & skin care course. By the end you will be able to tell a skin type from a skin condition, know what to look at and what to ask before you touch a client's skin, and know when to stop. The step-by-step analysis on a client is in the practice article [How to do a skin analysis](lesson:spa-soi-da).",
  ],
  sections: [
    {
      id: "why-read-the-skin",
      title: "Why every treatment starts with reading the skin",
      blocks: [
        { p: "Read the skin correctly and you choose the right products and the right method. Read it wrong and, however expensive the products are, the client can still leave red, stinging or breaking out, and she does not come back." },
        { p: "A situation that happens all the time: a client walks in and says her skin is really oily. The therapist reaches for a strong cleanser, a thorough exfoliation and an oil-absorbing clay mask. The next day the client messages: her skin is tight, stinging and flaking, and it still shines. That skin was oily and dehydrated at the same time. Strip away all the oil and it only gets drier and tighter." },
        { note: "The mistake was listening without looking, touching or asking more. What a client says about her own skin is useful information, not the conclusion.", kind: "tip", title: "Listen, then check for yourself" },
      ],
    },
    {
      id: "five-skin-types",
      title: "The five facial skin types: normal, dry, oily, combination, sensitive",
      blocks: [
        { p: "A skin type is the skin's basic nature. It is fairly stable and mostly down to genetics. Each type has a few signs you can see and feel." },
        {
          table: {
            head: ["Skin type", "How to recognise it"],
            rows: [
              ["Normal", "Smooth, small pores, not too shiny, not tight"],
              ["Dry", "Little oil, feels slightly rough, tight after cleansing, sometimes light flaking"],
              ["Oily", "Shiny all over, larger pores, prone to blackheads"],
              ["Combination", "Shiny in the T-zone (forehead, nose, chin), cheeks normal or dry"],
              ["Sensitive", "Reddens, stings or itches easily when products or the weather change"],
            ],
          },
        },
        { img: { src: img("da-hon-hop-bong-dau-vung-chu-t"), alt: "Close-up of a woman in a white headband with her eyes closed, her forehead, nose and chin slightly shiny while her cheeks look matte", caption: "Combination skin: shine in the T-zone, cheeks without shine." } },
        { img: { src: img("da-kho-li-khong-bong-dau"), alt: "Close-up of a woman in a white headband with her eyes closed, her cheeks matte and slightly dull with no shiny areas at all", caption: "Dry skin: a matte surface with no shine, easily tight after cleansing." } },
      ],
    },
    {
      id: "skin-conditions",
      title: "Skin conditions: dehydration, redness, congestion, pigmentation, ageing",
      blocks: [
        { p: "A skin condition is what is happening on the skin right now. It changes with the season, the weather, the products the client uses, her age and how well she sleeps. Skin that is dehydrated today may be fine next month." },
        {
          table: {
            head: ["Condition", "What you see"],
            rows: [
              ["Dehydration", "Tight, dull skin with very fine lines, which can still be oily"],
              ["Redness", "Red skin, small blood vessels clearly visible"],
              ["Congestion", "Blackheads, tiny bumps under the skin"],
              ["Pigmentation", "Brown spots, freckles, dark marks"],
              ["Signs of ageing", "Wrinkles, skin that is less firm"],
            ],
          },
        },
        { note: "Lack of oil means dry skin, which is a skin type. Lack of water is a condition, and any skin type can have it, oily skin too. Shiny skin is not proof that the skin has enough water.", kind: "info", title: "Dry vs dehydrated skin" },
        { img: { src: img("da-nhay-cam-do-o-hai-ma"), alt: "Close-up of a woman in a white headband with her eyes closed, a soft flush of redness spreading across both cheeks and the sides of her nose", caption: "Redness on the cheeks: the skin is sensitive right now, so every movement must be gentle." } },
        { img: { src: img("da-bit-tac-mun-dau-den-o-mui"), alt: "Close-up of a woman in a white headband with her eyes closed, small dark blackheads dotted over her nose and either side of it", caption: "Blackheads on the nose and chin: congested skin." } },
      ],
    },
    {
      id: "how-to-read-skin",
      title: "What a skin analysis is: eyes, hands and questions",
      blocks: [
        { p: "A skin analysis means looking at clean, make-up-free skin in good light and through a magnifier lamp. The client's eyes are covered with cotton pads because the lamp is very bright. You look at whether the surface is smooth or rough, where the pores are larger and which areas shine. Then you touch very lightly: is the skin soft, tight or rough? Any spot that flushes as soon as you touch it is sensitive at that moment." },
        { note: "Always work in the same order: forehead, T-zone, cheeks, jaw and chin, neck. Nothing gets missed, and next time the notes are easy to compare.", kind: "tip", title: "One fixed order" },
        { h3: "What a skin consultation form asks" },
        { p: "Looking is not enough. The consultation form is what protects you from the biggest risks, and regular clients need to be asked again, because things may have changed since the last visit." },
        { img: { src: img("phieu-tu-van-da-truoc-lieu-trinh"), alt: "A client in a white robe sits in an armchair talking with a skin therapist who holds a clipboard with a consultation form and a pen" } },
        {
          ul: [
            "Any allergies, any earlier reactions to cosmetics.",
            "Which medicines she is taking.",
            "What she uses on her skin at home, especially retinoids or exfoliating acids.",
            "Whether she is taking the acne medicine isotretinoin.",
            "Any recent treatments: a chemical peel, laser, waxing.",
            "How much time she spends in the sun.",
          ],
        },
        { h3: "Why the questions matter" },
        {
          table: {
            head: ["The client says", "What it means", "What the therapist does"],
            rows: [
              ["Uses retinoids or acids", "Skin is thinner and more reactive than usual", "Avoids strong exfoliation, which easily grazes and stings"],
              ["Takes isotretinoin, or stopped within about six months", "Skin is very easily damaged", "No waxing; explains why and notes it"],
              ["Is pregnant", "More care is needed with products", "Asks more and chooses products by the brand's guidance"],
            ],
          },
        },
        { p: "On isotretinoin, the [NHS](https://www.nhs.uk/medicines/isotretinoin-capsules/common-questions-about-isotretinoin-capsules/) medicine pages also advise against waxing during treatment. With medicines, active products and pregnancy, the general rule is to follow the product brand's guidance and the prescriber's advice. No guessing, and no drawing your own conclusions." },
      ],
    },
    {
      id: "do-not-diagnose",
      title: "Don't diagnose: when not to treat and what to say",
      blocks: [
        { p: "This is the most important principle for anyone who works with skin. You care for the skin; you do not examine it like a doctor. If you see any of the following, do not treat that area:" },
        {
          ul: [
            "Sunburn or broken skin.",
            "A cold sore on the lip.",
            "An area that is swollen, red, painful or has pus.",
            "An unusual mole that is changing colour or shape.",
          ],
        },
        { img: { src: img("mun-rop-o-moi-khong-lam-tren-vung-do"), alt: "Close-up of the lower half of a woman's face with a small cluster of blisters at the corner of her upper lip on slightly pink skin", caption: "A cluster of blisters on the lip: leave that area alone and suggest the client asks a doctor." } },
        { p: "Do not name a disease. Describe what you see and suggest a doctor. The right words sound like this: “I can see this area is swollen and red, so I won't treat it here. Please ask a doctor about it.” Saying “You have an infection” is a diagnosis, and that is not the therapist's job." },
        { note: "The lesson [When not to treat a client](lesson:khi-nao-khong-lam) covers the warning signs and how to say no in detail. The scope of a skin therapist's work is regulated differently from country to country, so check the rules where you work. The lesson is a training aid, not a licence.", kind: "warn", title: "When to refer to a doctor" },
      ],
    },
    {
      id: "results-and-home-care",
      title: "Honest results and a simple home-care plan",
      blocks: [
        { p: "Only after reading the skin and listening to the client do you choose the treatment. Then be honest about what it can do. A facial leaves the skin clean, soft and fresher. Brown spots, wrinkles or long-standing acne do not disappear in a single session. Promise too much and the client is disappointed; be honest and she trusts you. Write down her goal so you can compare next time." },
        { p: "Results from the salon only last if the client looks after her skin properly at home. The plan you give her should have few steps, done consistently:" },
        {
          ol: [
            "A gentle cleanser.",
            "A moisturiser that suits her skin type.",
            "Sunscreen every morning.",
          ],
        },
        { img: { src: img("ke-hoach-cham-soc-da-tai-nha-ba-san-pham"), alt: "A skin therapist shows a client in a white robe three unlabelled skin care products standing on a small stone tray", caption: "Three steps are enough to start with. Don't sell the client ten products." } },
        { p: "Then book the next visit so you can see together how the skin has changed. What happens during the treatment itself is in the article on [basic facial treatments](lesson:spa-facial-hieu-dung)." },
      ],
    },
    {
      id: "client-records",
      title: "Keep the client's record confidential",
      blocks: [
        { p: "What a client tells you about allergies, medicines and her health is private. Write it down only with her consent and keep it strictly confidential. In VaraaAi you can save the skin type, its condition and the consultation answers in the internal notes on the client record in your [client list](lesson:khach-hang). Only the salon can see those notes. Next time, whoever treats the client knows straight away what the skin is like, what has been used and how it reacted, before she even arrives for her [appointment](lesson:lich-hen)." },
      ],
    },
  ],
  faq: [
    {
      q: "How many facial skin types are there?",
      a: "Usually five: normal, dry, oily, combination and sensitive. A skin type is the skin's basic nature, fairly stable and mostly down to genetics. Alongside it there are skin conditions, such as dehydration or congestion, which change over time.",
    },
    {
      q: "What is the difference between skin type and skin condition?",
      a: "A skin type, such as oily or dry, is fairly stable. A skin condition changes with the season, the weather, the products in use, age and sleep: dehydration, redness, congestion, pigmentation and signs of ageing. One skin has one type but can show several conditions at once.",
    },
    {
      q: "Can oily skin be dehydrated?",
      a: "Yes. Lack of oil is dry skin, while lack of water is a condition any skin type can have. Oily, dehydrated skin often feels tight, looks dull and has very fine lines while still shining. Cleansing it hard to remove all the oil only makes it drier and tighter.",
    },
    {
      q: "What is combination skin?",
      a: "Combination skin is shiny in the T-zone, meaning the forehead, nose and chin, while the cheeks are normal or dry. In a skin analysis it is the type where each area of the face needs to be looked at on its own.",
    },
    {
      q: "Can you get waxed while taking isotretinoin?",
      a: "No. Isotretinoin makes the skin very fragile, so there is no waxing while taking it and for about six months after stopping. Tell your therapist which medicines you are taking, and ask the doctor who prescribed it if you are unsure.",
    },
    {
      q: "Can a beauty or skin therapist diagnose skin problems?",
      a: "No. A skin therapist does not diagnose. When she sees sunburn, broken skin, a cold sore, a swollen, red, painful or pus-filled area, or an unusual mole that changes colour or shape, she leaves that area alone, describes what she sees and suggests a doctor.",
    },
  ],
  related: ["spa-soi-da", "spa-facial-hieu-dung", "khi-nao-khong-lam", "di-ung-hoa-chat"],
};

export default article;
