import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-facial/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-a-facial-step-by-step",
  lesson: "spa-facial",
  category: "spa",
  title: "How to do a facial step by step: 14 steps of a basic facial from make-up removal to sunscreen",
  metaTitle: "How to do a facial step by step: 14 steps of a basic facial",
  metaDescription:
    "How to do a facial step by step: bed and trolley, eye make-up removal, second cleanse, skin check, exfoliation, warm towel, mask, moisturiser, advice, clean-up.",
  keyword: "how to do a facial",
  keywords: [
    "facial steps at a spa",
    "basic facial routine",
    "professional facial procedure",
    "how to remove eye make-up for a facial",
    "how to apply a face mask professionally",
    "what not to do after a facial",
  ],
  excerpt: "A basic facial from start to finish: fourteen steps, from wiping down the bed to writing the client record, with the moments to go gently, skip a step or stop.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-dap-mat-na-cham-soc-da-mat-tai-spa"),
    alt: "A skin therapist in a cream tunic holds a bowl and brush and applies a mask to a client lying with cotton pads over her eyes in a spa room with arched windows",
  },
  takeaways: [
    "Lay everything out on the trolley **before the client lies down**, in the order you will use it, so you never leave her lying there while you look for something.",
    "Eye make-up: rest a pad on the closed eye for a few seconds, then wipe gently downwards. No rubbing, no pulling the skin, no product in the eye.",
    "Check the skin quickly after the second cleanse and compare it with the consultation form. If something worries you, stop.",
    "Every product stays on for the brand's time. If the client feels stinging or the skin reddens quickly, remove it at once.",
    "Extractions **only if you are trained** and the salon allows them. If not, skip the step and note it in the record.",
  ],
  intro: [
    "How to do a facial looks much the same in every salon: make-up removal, cleansing, exfoliation, mask, moisturiser. The difference lies in how each step is done: how light the touch is, how long a product stays on, and when a step is left out. A smooth treatment where the client never lies waiting also starts with a trolley that was laid out before she walked in.",
    "This article follows the VaraaAi Academy lesson “A basic facial: step by step” in the Spa & skin care course. The lesson demonstrates on a client with combination skin that is slightly dehydrated. By the end you can carry out a whole basic facial in fourteen steps, know where to work gently, and clean up and write the record after the client leaves.",
  ],
  sections: [
    {
      id: "before-the-client-lies-down",
      title: "Before the client lies down: bed, trolley and room",
      blocks: [
        { p: "During a facial your hands hardly leave the client's face. Every time you turn away to open a cupboard or a drawer, the client lies waiting, and your hands touch things that may not be clean. That is why all the preparation is finished before the client comes in." },
        { img: { src: img("giuong-spa-va-xe-day-chuan-bi-truoc-khi-facial"), alt: "A spa bed made up with clean white linen and towels in a cream stone room, beside it a stone-topped trolley laid out with bowls, brushes, wooden spatulas and product bottles", caption: "Fresh linen and towels on the bed; cotton pads, bowls, brushes, spatulas and products laid out on the trolley." } },
        { note: "Lay out the trolley in the order you will use it: make-up remover first, sunscreen last. The client never waits, and your hands do not touch cupboards or drawers mid-treatment.", kind: "tip", title: "From the trade" },
        { p: "The products on the trolley are the ones you chose after the skin analysis and consultation, not a fixed set for every client. If you want to understand why the steps come in this order before you start, read [What is a facial, and why each step matters](lesson:spa-facial-hieu-dung)." },
      ],
    },
    {
      id: "go-gently-skip-or-stop",
      title: "When to go gently, skip a step or stop altogether",
      blocks: [
        { p: "The fourteen steps are a framework. Each client's skin decides whether you go through all of it or leave parts out. The table collects the situations the lesson mentions." },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["The skin check shows redness, soreness, broken skin or anything worrying", "Stop, and check against the lesson [When not to treat a client](lesson:khi-nao-khong-lam)"],
              ["During exfoliation the client feels stinging or the skin reddens quickly", "Remove the product at once, without waiting for the time to run out"],
              ["Sensitive or red skin", "Skip the warm towel and the steam"],
              ["You are not trained in extractions", "Skip the step and note it in the record for someone qualified"],
              ["An area is very red after the mask comes off", "Note it and choose a very gentle moisturiser"],
              ["The skin reacts during the treatment", "Follow the lesson [Incidents in the salon](lesson:xu-ly-su-co)"],
            ],
          },
        },
        { note: "Do extractions only if you are trained and the rules where you work allow it; extractors must be sterilised. Rules differ from country to country. This article is a training aid, not a licence.", kind: "warn", title: "About extractions" },
      ],
    },
    {
      id: "common-mistakes",
      title: "Small mistakes that are common in a facial",
      blocks: [
        { p: "Most mistakes in a facial have nothing to do with the products. They come from a few habits formed to save time." },
        {
          table: {
            head: ["Mistake", "Why not", "Do this instead"],
            rows: [
              ["Rubbing the cotton pad back and forth over the eye", "The skin around the eye is very thin", "Rest the pad for a few seconds to soften the mascara, then wipe gently downwards"],
              ["Laying on a warm towel without testing it", "It may be hot rather than warm", "Test it on your own wrist first"],
              ["Dipping a finger in the cream jar", "The whole jar is contaminated for later clients", "Use a clean spatula and place the cream on the back of your hand"],
              ["Squeezing with fingernails until it comes out", "It damages the skin and leaves marks", "Wrap tissue around the fingertips, press very gently, leave what won't come"],
              ["Removing the mask in a hurry", "Mask is left at the hairline, under the chin, beside the nose", "Remove zone by zone with warm sponges, then check those three places"],
              ["Leaving the client alone for long while the mask works", "Nobody is watching the skin or the client", "Stay in the room; you can gently massage her hands or shoulders"],
            ],
          },
        },
      ],
    },
    {
      id: "aftercare-and-rebooking",
      title: "What not to do after a facial, and booking the next visit",
      blocks: [
        { p: "Help the client sit up slowly, then give four short pieces of advice before she leaves the room:" },
        {
          ol: [
            "No exfoliating at home for the next few days.",
            "Avoid the sun.",
            "Apply sunscreen every morning.",
            "If redness, burning or itching lasts, contact the salon straight away.",
          ],
        },
        { p: "Book the next visit at the desk while the client is still there. In VaraaAi you open the [appointment calendar](lesson:lich-hen) and hold a slot for her in a few taps, so she does not have to remember to message you later." },
        { img: { src: img("dat-lich-cham-soc-da-lan-sau-tai-quay"), alt: "A skin therapist holding a tablet stands at a cream stone reception desk, smiling as she talks with a blonde client in a cream jumper", caption: "Book the next visit while the client is still at the desk." } },
      ],
    },
    {
      id: "client-record",
      title: "Write the client record: products used and how the skin reacted",
      blocks: [
        { p: "The last job of the treatment is a few lines of notes: which products you used today, how the skin reacted, what advice you gave. At the next visit, you or a colleague can open them and know what to repeat and what to avoid." },
        { p: "In VaraaAi those lines go in the internal notes for each client in your [client list](lesson:khach-hang)." },
      ],
    },
  ],
  howTo: {
    title: "How to do a facial: the 14 steps in order",
    id: "facial-steps",
    after: "before-the-client-lies-down",
    lead: "The fourteen steps follow the order of the lesson video. How long each product stays on the skin always follows the brand's instructions.",
    supplies: [
      "Clean linen, towels and a headband for the new client",
      "Cotton pads, facial sponges, bowls, brushes and cream spatulas",
      "Make-up remover, cleanser, exfoliant, mask, toner, moisturiser and sunscreen chosen after the skin analysis",
      "Warm towels, or a steamer filled with water",
      "A magnifier lamp",
      "Gloves and soft tissue; extractors still in their sterilisation pouch, if you are allowed to do this step",
    ],
    steps: [
      {
        name: "Prepare the bed and trolley",
        text: "Wipe and disinfect the bed, then lay fresh linen, towels and a headband for the new client. Set out cotton pads, towels, bowls, brushes, spatulas and the chosen products on the trolley. Check that the steamer has water, the warm towels are ready and the room is warm enough.",
      },
      {
        name: "Settle the client and wash your hands",
        text: "The client lies on her back under a towel and blanket, with only the face, neck and shoulders showing, and a headband to keep the hair back. Ask whether she is warm enough and the pillow is right. If she wears contact lenses, ask her to take them out before you work around the eyes. Then wash your hands with soap and dry them, as in the lesson [Hand washing and gloves](lesson:rua-tay-gang-tay).",
      },
      {
        name: "Remove eye and lip make-up, then the face",
        text: "Start with the eyes: rest a pad soaked in make-up remover on the closed eye for a few seconds so the mascara softens, then wipe gently downwards. Do not rub, do not pull the skin and do not let product run into the eye. Wipe the lips very gently next, and only then remove make-up from the whole face.",
      },
      {
        name: "Cleanse a second time",
        text: "Take cleanser into your palms, warm it, then apply it to the face and neck in small circles, moving from the chin to the cheeks and up to the forehead. Keep the pressure light and even, both hands mirroring each other, away from the eyes. Remove it with warm, damp sponges until no cleanser is left on the skin.",
        image: { src: img("rua-mat-lan-hai-bang-vong-tron-nho"), alt: "Seen from above, a therapist's two hands work cleanser over both cheeks of a client wearing a white headband", caption: "Both hands mirror each other in small circles with light, even pressure." },
      },
      {
        name: "Check the skin quickly under the magnifier lamp",
        text: "On the freshly cleansed skin, take a quick look under the magnifier lamp and compare with the consultation form: has anything changed, is there any redness, soreness or broken skin today? How to check each zone is covered in [How to do a skin analysis](lesson:spa-soi-da). If something worries you, stop here.",
        image: { src: img("soi-da-nhanh-duoi-den-lup"), alt: "A therapist leans in to look at a client's cheek through a round magnifier lamp with white light, the client lying on a spa bed with cotton pads over her eyes" },
      },
      {
        name: "Exfoliate",
        text: "Choose the type from the skin check; for the slightly dehydrated skin in the lesson, that means a gentle one. Put pads over the eyes and brush on a thin layer, avoiding the eyes and lips. Leave it for exactly the brand's time and watch the skin throughout. If the client feels stinging or the skin reddens quickly, remove it at once. Then rinse with warm sponges.",
      },
      {
        name: "Warm the skin with a towel or steam",
        text: "Test the towel's warmth on your own wrist, then lay it over the client's face, leaving the nose and mouth free so she can breathe easily, and hold it for a short while. If you use steam, place the steamer far enough from the face and steam only briefly. Sensitive or red skin: skip this step.",
        image: { src: img("dap-khan-am-len-mat-chua-mui-mieng"), alt: "A client lies on a spa bed with a warm white towel wrapped around her forehead and the sides of her face, the therapist's hands holding it lightly at the cheeks", caption: "The towel is warm, not hot, and it never covers the nose or mouth." },
      },
      {
        name: "Do extractions, only if you are allowed",
        text: "Put on gloves, wrap soft tissue around two fingertips and press very gently on both sides of the blackhead. If it comes, fine; if not, leave it. No fingernails, no hard squeezing, and keep it brief. Afterwards wipe the area with a soothing product as the brand instructs. Any extractor must be sterilised and taken from a sealed pouch. If you have not been trained, skip this step and note it in the record.",
        image: { src: img("lay-nhan-mun-bang-khan-giay-va-gang-tay"), alt: "Two hands in black gloves, fingertips wrapped in white tissue, press gently either side of a spot on the chin of a client whose eyes are closed" },
      },
      {
        name: "Apply a mask that suits the skin",
        text: "Brush it on evenly from the neck up to the chin, cheeks, nose and forehead, leaving the eyes, nostrils and lips clear. Leave it on for the brand's time. Meanwhile you can massage the client's hands or shoulders gently, and do not leave her alone for too long.",
      },
      {
        name: "Remove the mask with warm sponges",
        text: "Remove it gently, zone by zone, with warm, damp sponges, without rubbing hard. Check the hairline, under the chin and beside the nose, where mask is often left behind. Then look at the skin again: note any area that has turned very red and choose a very gentle moisturiser.",
        image: { src: img("go-mat-na-bang-mut-am"), alt: "A therapist wipes green clay mask off a client's face with a round sponge, one half of the face already clean and the other still covered" },
      },
      {
        name: "Apply toner",
        text: "Soak a cotton pad in toner and wipe it gently over the whole face. It is a short step with no need to press or rub.",
      },
      {
        name: "Moisturise and apply sunscreen",
        text: "Take the cream out of the jar with a clean spatula and place it on the back of your hand; your fingers never go into the jar. Apply with light strokes, upwards and outwards. In the daytime, sunscreen is the last step.",
        image: { src: img("thoa-kem-duong-am-vuot-len-va-ra-ngoai"), alt: "A therapist's hands smooth moisturiser over both of a client's cheeks in upward and outward strokes while the client rests with her eyes closed", caption: "Light strokes, upwards and outwards." },
      },
      {
        name: "Give aftercare advice and book the next visit",
        text: "Help the client sit up slowly. Advise her not to exfoliate at home for a few days, to avoid the sun, to apply sunscreen every morning and to contact the salon straight away if redness, burning or itching lasts. Then book the next visit at the desk.",
      },
      {
        name: "Clean up, write the record and wash your hands",
        text: "Put on gloves. Towels, headband and linen go into a lidded laundry hamper; cotton pads, tissues and single-use spatulas into a lidded bin. Brushes and bowls are washed and disinfected; extractors go to be cleaned and sterilised, as in the lesson [Tools after every client](lesson:ve-sinh-dung-cu). Finally, note the products used, how the skin reacted and the advice you gave in the client record, then wash your hands.",
        image: { src: img("don-dep-sau-buoi-cham-soc-da-mat"), alt: "A therapist in black gloves drops used towels into a lidded wicker hamper and cotton pads into a pedal bin, a tray of used brushes kept apart on the trolley" },
      },
    ],
  },
  faq: [
    {
      q: "What are the steps of a facial at a spa?",
      a: "A basic facial covers preparing the bed and tools, settling the client, removing eye, lip and face make-up, a second cleanse, a quick skin check, exfoliation, a warm towel or steam, extractions if the therapist is trained, applying and removing a mask, toner, moisturiser and sunscreen in the daytime. Then come aftercare advice, rebooking and the clean-up.",
    },
    {
      q: "How do you remove eye make-up properly during a facial?",
      a: "Rest a pad soaked in make-up remover on the closed eye for a few seconds so the mascara softens, then wipe gently downwards. Do not rub, do not pull the skin and do not let product run into the eye, because the skin around the eye is very thin. Ask clients with contact lenses to take them out first.",
    },
    {
      q: "How long do you leave a face mask and exfoliant on?",
      a: "For exactly the time the brand gives on the product, no longer. The therapist watches the skin the whole time. With an exfoliant, if the client feels stinging or the skin reddens quickly, it comes off at once without waiting for the time to run out.",
    },
    {
      q: "Should you do extractions if you have not been trained?",
      a: "No. Extractions done wrongly damage the skin and leave marks, so only someone who has been trained does them, where the rules allow it. If you have not been trained, skip the step and note it in the record so a qualified person can do it.",
    },
    {
      q: "What should you avoid after a facial?",
      a: "For a few days, avoid exfoliating at home, stay out of the sun and apply sunscreen every morning. If redness, burning or itching lasts, contact the salon that did the treatment straight away.",
    },
    {
      q: "Why use a spatula instead of fingers to take cream from the jar?",
      a: "A finger in the jar contaminates the whole jar for every client after. The right way is to take the cream out with a clean spatula, place it on the back of your hand and apply it to the client's face from there.",
    },
  ],
  related: ["spa-facial-hieu-dung", "spa-soi-da", "spa-massage-mat", "ve-sinh-dung-cu"],
};

export default article;
