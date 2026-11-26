import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-waxing/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-wax-legs-underarms-and-brows",
  lesson: "spa-waxing",
  category: "spa",
  title: "How to wax legs, underarms and brows: 14 steps with soft wax and hard wax",
  metaTitle: "How to wax legs, underarms and brows: 14 steps",
  metaDescription:
    "How to wax step by step for therapists: preparation, consultation, temperature test, soft wax on the lower leg, the right pull, hard wax on underarms and brows.",
  keyword: "how to wax legs",
  keywords: [
    "waxing step by step",
    "how to use strip wax on legs",
    "how to wax underarms with hard wax",
    "how to wax eyebrows",
    "professional waxing procedure",
    "how to pull a wax strip",
  ],
  excerpt: "Three common areas waxed step by step: the lower leg with soft wax, the underarm with hard wax and a tidy brow. With the temperature test, taking wax, the pull and five common mistakes.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuan-bi-wax-long-chan-cho-khach-tai-spa"),
    alt: "A therapist in black gloves stands beside a wax heater and a jar of wooden spatulas, a client lying on the bed under a white towel with both legs uncovered, an arched window behind",
  },
  takeaways: [
    "Test the wax with a **fresh spatula** on the inside of your own wrist, then on a small spot of the client's skin, before you spread it.",
    "Soft wax goes on very thin in the direction of hair growth, in a strip about a hand long. Too thick and it clumps, hurts and leaves hairs behind.",
    "Pull fast, **against the direction of growth**, low and almost parallel to the skin, with the other hand holding the skin taut. Press your palm on straight after.",
    "Hard wax on underarms and brows: a little thicker, with a thick lip to hold, left to set (no longer tacky but still pliable) before you pull.",
    "A spatula that has touched the client never goes back into the pot. Every dip is a fresh spatula.",
  ],
  intro: [
    "How to wax legs can be learnt in an afternoon: spread the wax, pull, clean up. For the client to feel less pain and for the skin to stay free of bruises and grazes, you need a few more habits: testing the temperature before every client, checking the hair growth before you apply, and always having one hand holding the skin taut.",
    "This article follows the VaraaAi Academy lesson “Waxing: step by step” in the Spa & skin care course. The lesson waxes three areas: the lower leg with soft wax, the underarm with hard wax, and a tidy-up of the brows. By the end you can do all three in fourteen steps, from switching on the heater to clearing the couch. Temperature, timing and products always follow the wax manufacturer's instructions and your salon's procedure. Intimate waxing is not covered here.",
  ],
  sections: [
    {
      id: "before-you-wax",
      title: "Before you wax: lay everything out and reread the consultation form",
      blocks: [
        { p: "Once your gloves are on and a warm spatula is in your hand, you cannot go looking for tweezers or open a cupboard for strips. Everything has to be on the trolley before the client lies down, the lidded bin for used spatulas included." },
        { img: { src: img("dung-cu-wax-long-noi-sap-que-go-giay-wax"), alt: "A marble trolley top laid out with a pot of yellow soft wax, a pot of pink hard wax, a jar of wooden spatulas, a stack of wax strips, black gloves, a bottle of oil, a jar of lotion, cotton, tweezers and small scissors", caption: "Two wax pots, clean spatulas, strips, gloves, after-wax oil, soothing lotion, tweezers and small scissors." } },
        { p: "The consultation is never skipped, not even for regulars, because the medicines a client takes may have changed since last time. Who should not be waxed, why you ask about acne medicine and why the direction of the pull matters are covered in [Hard wax vs soft wax and who should not be waxed](lesson:spa-waxing-hieu-dung)." },
      ],
    },
    {
      id: "soft-vs-hard-in-practice",
      title: "Soft wax and hard wax: where the technique differs",
      blocks: [
        { p: "The direction is the same for both: apply with the hair growth, remove against it, low to the skin. The differences are in the table below." },
        {
          table: {
            head: ["Step", "Soft wax (lower leg)", "Hard wax (underarm, brows)"],
            rows: [
              ["Before applying", "Many brands use a very thin layer of powder", "Some brands use a very thin layer of oil"],
              ["Thickness", "Very thin and even", "A little thicker, with a thick lip at the end"],
              ["Removed with", "A wax strip, leaving a tab to hold", "The wax's own lip"],
              ["When to pull", "After rubbing the strip down a few times", "When it has set: no longer tacky but still pliable"],
            ],
          },
        },
        { p: "The powder or the oil has one purpose: making the wax stick to the hair rather than the skin. Whether you use it follows the wax manufacturer's instructions. With hard wax, do not wait too long: left too long it turns brittle, breaks and is hard to remove." },
      ],
    },
    {
      id: "tricky-areas",
      title: "Tricky areas: knees, ankles, forearms and underarms",
      blocks: [
        {
          ul: [
            "**Knees and ankles.** The skin folds and the bones stick out, so use smaller strips and hold the skin taut more carefully.",
            "**Forearms.** Done like the lower leg, but check the hair direction carefully first, because everyone is different.",
            "**Underarms.** The hair grows in several directions, so divide the area into small sections and wax each one following its own growth.",
            "**Brows.** Agree on the shape with the client first, use only a tiny amount of wax, well away from the eye.",
          ],
        },
        { note: "Many therapists ask the client to breathe in, then pull just as she breathes out. It feels easier.", kind: "tip", title: "From the trade" },
      ],
    },
    {
      id: "common-mistakes",
      title: "Five common waxing mistakes",
      blocks: [
        {
          table: {
            head: ["Mistake", "Result", "Do this instead"],
            rows: [
              ["Spreading the wax thick, thinking thick grips better", "It hurts more and leaves hairs behind", "A thin, even layer"],
              ["Pulling slowly, or pulling upwards", "The skin is dragged, bruises and grazes easily", "Pull fast, low and almost parallel to the skin"],
              ["Forgetting to hold the skin taut", "More pain, the skin is pulled along", "The other hand right next to the strip, stretching the skin"],
              ["Going over the same spot again and again", "The skin turns red", "No more than two passes; tweeze the strays"],
              ["Double-dipping a used spatula", "The pot is contaminated for later clients", "A fresh spatula for every dip"],
            ],
          },
        },
      ],
    },
    {
      id: "aftercare-and-notes",
      title: "After waxing: advice for the client and notes for next time",
      blocks: [
        { p: "Before the client leaves, tell her clearly what is normal and what to avoid:" },
        {
          ul: [
            "Some redness and a few little bumps are normal.",
            "For about the first day: avoid the sun, sauna, very hot water and fragranced products, deodorant included.",
            "After a few days: gentle exfoliation and moisturiser to help prevent ingrown hairs.",
          ],
        },
        { p: "If the client's skin turns very red and sore or comes up in a rash in the salon, apply a cool towel and note the product used, as in the lesson [Incidents in the salon](lesson:xu-ly-su-co)." },
        { p: "In VaraaAi you note in the client's internal notes in your [client list](lesson:khach-hang) the wax used, the areas waxed and how the skin reacted. The next visit can be booked straight into the salon's [appointment calendar](lesson:lich-hen) while the client is still at the desk." },
        { note: "A client taking isotretinoin is not waxed. Rules for beauty work differ from country to country; this article is a training aid, not a licence.", kind: "warn", title: "Two reminders" },
      ],
    },
  ],
  howTo: {
    title: "Waxing step by step: lower leg, underarm and brows",
    id: "waxing-steps",
    after: "before-you-wax",
    lead: "The fourteen steps follow the order of the lesson video: the lower leg with soft wax first, then the underarm with hard wax, and the brows last.",
    supplies: [
      "A soft wax pot and a hard wax pot, switched on early so the wax flows evenly",
      "Clean wooden spatulas in a jar, plus small ones for the brows",
      "Single-use wax strips",
      "Gloves, a fresh couch roll and a large towel to cover the client",
      "Pre-wax cleanser; powder or oil if the wax manufacturer recommends it",
      "After-wax oil, soothing lotion, tweezers and small scissors",
      "A lidded bin",
    ],
    steps: [
      {
        name: "Prepare the heater, couch and tools",
        text: "Switch the wax heater on early so the wax flows evenly. Disinfect the couch and lay a fresh roll. Set out clean spatulas in a jar, strips, gloves, pre-wax cleanser, after-wax oil, soothing lotion, tweezers and small scissors, and put a lidded bin within reach for used spatulas.",
      },
      {
        name: "Consult, regulars included",
        text: "Read the consultation form and ask again: is the client taking acne medicine, using retinoid creams, has she had a recent peel, laser or sun, any allergies, how was her last wax. Look at the skin to be waxed: avoid broken skin, sunburn and varicose veins. Tell her in advance that it will sting a little, and to say if it feels uncomfortable.",
      },
      {
        name: "Cover the client, wash your hands, put on gloves",
        text: "The client changes in private, lies on the couch and is covered with a large towel. Uncover only the area to be waxed and tuck the towel neatly. Then wash and dry your hands and put on gloves, as in the lesson [Hand washing and gloves](lesson:rua-tay-gang-tay).",
      },
      {
        name: "Check the hair growth and cleanse the skin",
        text: "On the lower leg, hair usually grows downwards, towards the ankle. Trim very long hair. Cleanse the skin with pre-wax cleanser and wait until it is completely dry. With soft wax, many brands recommend a very thin layer of powder so the wax sticks to the hair, not to the skin.",
      },
      {
        name: "Test the wax temperature",
        text: "Take a little wax on a fresh spatula and test it on the inside of your own wrist: warm and comfortable is right. Then test a small spot on the client's skin and ask her. Do this for every client, even if the pot was just used for the previous one.",
      },
      {
        name: "Take wax with a fresh spatula",
        text: "Dip the spatula, twist it gently, then scrape the underside on the rim of the pot so only a thin coat is left on top and nothing drips. A spatula that has touched the client's skin never goes back into the pot; every dip is a fresh spatula.",
        image: { src: img("gat-que-sap-vao-mep-noi"), alt: "A hand in a black glove lifts a wooden spatula out of a pot of yellow wax and scrapes its underside on the rim, a jar of clean spatulas beside it", caption: "Scrape the underside of the spatula on the rim so the wax does not drip." },
      },
      {
        name: "Apply soft wax to the lower leg",
        text: "Start at the top of the lower leg. Hold the spatula low and spread a very thin layer in the direction of hair growth: one strip as wide as the spatula and about a hand long. A thin, even layer comes off clean. Too thick and the wax clumps, hurts and leaves hairs behind.",
        image: { src: img("thoa-sap-mem-mong-theo-chieu-long-moc"), alt: "A therapist in black gloves spreads a thin strip of yellow wax along a client's lower leg with a wooden spatula, her other hand near the knee", caption: "Spatula held low, one thin strip in the direction of growth." },
      },
      {
        name: "Lay the strip and rub it down",
        text: "Lay a strip over the wax, leaving a tab at the end to hold. Rub it down firmly in the direction of growth a few times so the strip grips the wax.",
        image: { src: img("dat-giay-wax-len-lop-sap-o-cang-chan"), alt: "Two hands in black gloves smooth a white wax strip lying along a client's lower leg, a spare tab left at the ankle end" },
      },
      {
        name: "Hold the skin taut and pull",
        text: "Place the other hand right next to the end of the strip and stretch the skin. Hold the tab and pull very fast, against the growth, low to the skin and almost parallel to the leg; never straight up. Straight away press your palm on the waxed area for a few seconds. Carry on strip by strip, each next to the last, until the lower leg is done. No more than two passes on one spot; tweeze the strays.",
        image: { src: img("giu-cang-da-giat-giay-wax-nguoc-chieu-long"), alt: "One gloved hand presses the skin near the client's knee while the other holds the end of the wax strip, peeling back from the ankle side close to the skin", caption: "One hand holds the skin taut, the other pulls low against the growth." },
      },
      {
        name: "Prepare the underarm for hard wax",
        text: "The client lies on her back with her arm raised beside her head, her chest still covered. The skin must be very dry. Some brands recommend a very thin layer of oil first so the hard wax does not stick to the skin; follow the manufacturer's instructions. Underarm hair grows in several directions, so divide it into small sections.",
        image: { src: img("thoa-sap-cung-wax-nach"), alt: "A client lies on her back with one arm raised beside her head, her chest covered with a white towel, while the therapist spreads pink hard wax onto the underarm with a wooden spatula" },
      },
      {
        name: "Apply hard wax, let it set, then pull",
        text: "Spread the hard wax in the direction of growth for that section, a little thicker than soft wax, with a thick lip at the end to hold. Wait until it has set: no longer tacky but still pliable. Hold the skin taut, take the lip and pull fast against the growth, low to the skin, then press your hand on at once. Then move on to the next section.",
        image: { src: img("giat-sap-cung-o-nach-sat-da"), alt: "One hand in a black glove holds the client's underarm skin taut while the other grips the lip of a set piece of pink hard wax and starts to pull it off close to the skin", caption: "Set hard wax: hold the thick lip, keep the skin taut, pull low to the skin." },
      },
      {
        name: "Tidy the brows",
        text: "Agree on the brow shape with the client before you start. Take only a tiny amount of hard wax on a small spatula and apply it to the stray hairs under the brow, well away from the eye, while the client's eyes are closed. Hold the skin taut, pull fast and press gently. Tweeze the rest.",
        image: { src: img("wax-chan-may-bang-sap-cung-luong-nho"), alt: "Seen from the head of the bed, a gloved hand holds the forehead skin of a client with closed eyes taut while the other places a small line of pink wax under the brow with a tiny spatula", caption: "A tiny amount of wax under the brow, well away from the eye, with the skin held taut." },
      },
      {
        name: "Remove residue, soothe the skin and advise the client",
        text: "Remove any wax residue gently with after-wax oil, without rubbing hard, then apply soothing lotion. Tell the client that some redness and a few little bumps are normal, and that for about the first day she should avoid the sun, sauna, very hot water and fragranced products, deodorant included. After a few days, gentle exfoliation and moisturiser help prevent ingrown hairs.",
      },
      {
        name: "Take notes and tidy up",
        text: "Note the wax used, the areas waxed and how the skin reacted in the client's notes. Spatulas, strips and gloves go into the lidded bin. Wipe the outside of the wax pot, disinfect the couch, change the roll, then wash your hands.",
      },
    ],
  },
  faq: [
    {
      q: "How do you wax legs with soft wax?",
      a: "Cleanse the skin and let it dry, test the wax temperature, then spread a very thin layer in the direction of growth in a strip about a hand long. Lay a wax strip on top and rub it down a few times in the direction of growth. One hand holds the skin taut while the other pulls fast against the growth, low and almost parallel to the skin, then press your palm on at once.",
    },
    {
      q: "Which way do you pull a wax strip so it hurts less?",
      a: "Against the direction of hair growth, very fast, low to the skin and almost parallel to it, while the other hand holds the skin taut. Never pull straight up, because the skin is dragged with it and bruises and grazes easily. Pressing your palm on the waxed area for a few seconds eases the sting.",
    },
    {
      q: "Should you use soft or hard wax on the underarms?",
      a: "The lesson uses hard wax on the underarms. Underarm hair grows in several directions, so the area is divided into small sections; each gets wax in its own direction of growth, a little thicker than soft wax, with a thick lip to hold. Once it has set, no longer tacky but still pliable, hold the skin taut and pull fast against the growth.",
    },
    {
      q: "How long do you leave hard wax before pulling it off?",
      a: "There is no single figure, because every wax brand is different. The sign is that the wax has set: it is no longer tacky to the touch but still pliable. Left too long, it turns brittle, breaks and is hard to remove.",
    },
    {
      q: "How many times can you wax the same spot?",
      a: "With soft wax, no more than two passes on one spot. If a few hairs remain, tweeze them rather than applying wax again, because going over the same spot repeatedly makes the skin red.",
    },
    {
      q: "Why must you never double-dip a wax spatula?",
      a: "A spatula that has touched a client's skin carries bacteria into the wax pot when it goes back in, and that pot is used for the clients who come after. That is why every dip is a fresh spatula, and wax taken out never goes back into the pot.",
    },
  ],
  related: ["spa-waxing-hieu-dung", "khi-nao-khong-lam", "rua-tay-gang-tay", "xu-ly-su-co"],
};

export default article;
