import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/say-tao-kieu/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-blow-dry-hair-with-a-round-brush",
  lesson: "say-tao-kieu",
  category: "hair",
  title: "How to blow-dry hair with a round brush: 10 steps to a smooth blow-dry with volume for long hair",
  metaTitle: "How to blow-dry hair with a round brush: 10 steps",
  metaDescription:
    "How to blow-dry long hair with a round brush for root volume, shine and soft ends: towel-dry, heat protection, rough-dry, sections from the nape, the cool shot.",
  keyword: "how to blow-dry hair with a round brush",
  keywords: [
    "how to blow-dry hair for volume",
    "salon blow-dry step by step",
    "root volume blow-dry",
    "blow-dry ends under",
    "how to blow-dry long hair at home",
    "hair tangled in a round brush",
    "why does my blow-dry drop",
  ],
  excerpt: "Ten steps to blow-dry long layered hair smooth and shiny, with soft root lift and gently bent ends, plus the mistakes that make a style drop within an hour.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-toc-say-tao-kieu-ghe-khach-vua-tam"),
    alt: "A stylist standing with a straight back blow-dries a client's long blonde hair with a round brush and dryer, the client seated in a purple velvet chair in a Parisian-style salon",
  },
  takeaways: [
    "Rough-dry by hand to about **seventy or eighty percent dry** before you pick up the round brush.",
    "Section the hair and start with the layer at the **nape**, each section no wider than the brush.",
    "The concentrator sits parallel to the brush, **pointing down**, a few centimetres away, following the brush from root to tip.",
    "Keep each finished section on the brush and press the **cool shot** for a few seconds before releasing it.",
    "For volume on top, lift the section high and dry the roots first. The roots and the nape must be completely dry for the style to hold.",
  ],
  intro: [
    "Knowing how to blow-dry hair with a round brush, so it has volume and still stays smooth, is not about an expensive brush or a powerful dryer. It is about order: take most of the water out by hand first, divide the hair into thin layers, keep the air flowing down the hair shaft, and let each section cool on the brush before releasing it. Skip any one of those four and the hair either frizzes or drops within an hour.",
    "The article follows the VaraaAi Academy lesson “Blow-drying and styling: step-by-step practice” in the Hair course. The blow-dry here is for long layered hair: smooth and shiny, with soft lift at the roots and softly bent ends. Follow the ten steps and you can dry the whole head and show the client how to do it herself at home. The reason behind each move is explained in the theory article [how to blow-dry hair without damage](lesson:say-tao-kieu-hieu-dung).",
  ],
  sections: [
    {
      id: "four-principles",
      title: "Four principles to keep for the whole blow-dry",
      blocks: [
        { p: "The ten steps below change from one area of the head to the next, but these four things stay the same from switching the dryer on to switching it off." },
        {
          table: {
            head: ["Principle", "Why"],
            rows: [
              ["Nozzle pointing down the hair shaft", "Air flowing down makes hair shine; air blowing up from the ends frizzes it at once"],
              ["The dryer is always moving", "Held in one place too long, it scorches the hair and burns the scalp"],
              ["Thin sections, no wider than the brush", "Too thick and the outside dries while the inside stays damp"],
              ["Completely dry, then cooled", "Hair released while still damp or hot drops"],
            ],
          },
        },
        { note: "Use heat protectors and serums as the product instructs, and the dryer as the manufacturer instructs. The lesson is a training aid, not a licence.", kind: "info", title: "Before you start" },
      ],
    },
    {
      id: "common-mistakes",
      title: "Frizz, a blow-dry that drops, hair caught in the brush: mistakes and fixes",
      blocks: [
        {
          table: {
            head: ["What happens", "Cause", "Fix"],
            rows: [
              ["The hair frizzes as you dry", "Nozzle pointing up, from the ends towards the roots", "Turn the dryer so the air flows from root to tip"],
              ["Scorched hair, the client says her scalp burns", "The dryer held in one place too long", "Keep it moving; hold it further from the skin near the ears and nape"],
              ["The style drops within an hour", "Sections too thick, still damp inside", "Take thinner sections; feel the roots and nape with your hand"],
              ["The section relaxes as soon as the brush comes out", "Brush released while the hair was still hot", "Cool shot for a few seconds, release once cool"],
            ],
          },
        },
        { note: "If hair gets tangled in the round brush, do not yank it: yanking breaks the hair and hurts the client. Switch off the dryer, turn the brush back slowly and untangle it bit by bit. Adding heat to hair that is already under strain only does more harm.", kind: "warn", title: "When hair tangles in a round brush" },
      ],
    },
    {
      id: "adjusting-for-the-client",
      title: "Adjusting for the client: poker-straight, more volume, a fringe",
      blocks: [
        {
          ul: [
            "**She wants it poker-straight with little volume.** Swap the round brush for a paddle brush. Brush from root to tip with the dryer following above the brush, nozzle still pointing down.",
            "**She wants more volume on top.** After the cool shot, roll the section up, clip it lightly against the head, wait until it is completely cool, then remove the clip and smooth it gently with your hand.",
            "**Thick hair.** Take sections thinner than the width of the brush, so the air gets through all of it.",
            "**Coloured, bleached or fine hair.** It needs heat protection even more, and an even lower heat setting.",
          ],
        },
        { h3: "A fringe is dried first" },
        { p: "A fringe dries very fast, so if the client has one, dry it first of all, right after towel-drying. Nozzle pointing down, comb it left and then right, as in [how to cut a curtain fringe](lesson:cat-mai)." },
        { img: { src: img("say-toc-mai-truoc-tien"), alt: "A stylist dries a blonde client's fringe with a small round brush, the black dryer pointing down from above, the client's eyes closed", caption: "The fringe is dried before it can dry by itself in a direction you do not want." } },
      ],
    },
    {
      id: "blow-dry-at-home",
      title: "How to blow-dry long hair at home: what to show the client",
      blocks: [
        { p: "The client does not have the salon's full kit at home, so show her how to dry her hair with the dryer and brush she actually owns. These points work with any dryer:" },
        {
          ol: [
            "Towel-dry by pressing, not rubbing.",
            "Dry by hand first until the hair is only slightly damp, and only then use a brush.",
            "Keep the nozzle pointing down and keep the dryer moving.",
            "Dry the roots first, because they dry slowest.",
            "Dry it completely. Any dampness at the roots or nape and the style will drop.",
          ],
        },
        { img: { src: img("toc-dai-co-tang-sau-khi-say-tao-kieu"), alt: "A woman with long layered honey-blonde hair after a blow-dry, the hair smooth and shiny with soft root lift and the pieces round her face turned outwards", caption: "The aim: smooth, shiny, soft lift at the roots, the hair round the face opening it up." } },
        { p: "The hair in this lesson is long and layered, and layers make long hair lighter and easier to style when blow-drying. If a client complains that her long hair always lies flat against her head, see [what is a layered haircut](lesson:cat-nu-tang-hieu-dung)." },
      ],
    },
    {
      id: "safety-and-hygiene",
      title: "Hairdryer safety and brush hygiene",
      blocks: [
        {
          ul: [
            "Check the dryer before use: the nozzle firmly on, a clean filter, a cord that is not kinked or cracked.",
            "Never press the nozzle against the scalp. Near the ears and nape, be gentle and hold the dryer a little further from the skin.",
            "Shield the client's ear with your hand when drying right next to it, and ask whether it is too hot.",
            "Spray heat protector away from the client's face.",
            "When the client leaves, remove the hair from the brushes, wash and disinfect them as the product instructs, as in [how to disinfect tools](lesson:ve-sinh-dung-cu). Unplug the dryer and let it cool before putting it away.",
          ],
        },
        { note: "Hygiene rules and the rules for practising the trade differ by country. Check the rules where you work.", kind: "warn", title: "Rules vary" },
      ],
    },
    {
      id: "client-record",
      title: "Write it down so anyone can blow-dry it the way the client likes",
      blocks: [
        { p: "Regular clients usually want the same blow-dry as last time, even on a day their usual stylist is off. In VaraaAi, write three things in the client's notes in the [customer records](lesson:khach-hang): which brush, which products, and whether she likes volume or sleek. If the salon also takes clients who only come for a blow-dry, [create a service](lesson:dich-vu) “Blow-dry only” with its own duration next to “Cut + blow-dry”, so the [appointment calendar](lesson:lich-hen) reflects the real time each client needs." },
      ],
    },
  ],
  howTo: {
    title: "How to blow-dry hair with a round brush for volume: the steps",
    id: "round-brush-blow-dry-steps",
    after: "four-principles",
    lead: "Ten steps in the order of the lesson video, on freshly washed long layered hair.",
    supplies: [
      "Round brush, paddle brush and clips, cleaned since the previous client",
      "Wide-tooth comb for detangling",
      "Hairdryer with a concentrator nozzle and a cool shot button",
      "A clean towel",
      "Heat protector, and a little hair oil or serum for the ends",
    ],
    steps: [
      {
        name: "Prepare the brushes, dryer and chair",
        text: "The round brush, paddle brush and clips have been cleaned since the previous client. Check the dryer: the nozzle firmly on, the filter clean, the cord not kinked or cracked. Raise the client's chair so your elbows stay below your shoulders, because you will hold that position for the whole blow-dry.",
      },
      {
        name: "Towel-dry and detangle",
        text: "Wrap the hair in a towel and press gently from roots to ends, without rubbing. Detangle with a wide-tooth comb starting at the ends, with your other hand holding the hair above so you do not pull on the client's scalp.",
        image: { src: img("go-roi-toc-uot-tu-ngon-len"), alt: "A stylist holds the middle of a client's long wet hair in one hand and combs out the ends below with the other", caption: "The upper hand holds the hair; the comb only works the ends below it." },
      },
      {
        name: "Apply heat protection",
        text: "Spray evenly over the lengths and ends from a little distance, in the amount the product instructs. The ends are the weakest part, so do not miss them. Spray away from the client's face, then comb through once more so the product is evenly spread.",
        image: { src: img("xit-bao-ve-nhiet-len-than-va-ngon-toc"), alt: "A stylist mists a product over the lengths and ends of a client's long damp hair, the other hand holding a comb under the section" },
      },
      {
        name: "Rough-dry by hand",
        text: "No brush yet. Hold the dryer in one hand, nozzle pointing down, about a hand's width from the hair. Work the other hand into the roots, lifting and shaking the hair loosely. Dry the roots first and keep the dryer moving until the hair is about seventy or eighty percent dry. To check, slide your hand into the roots at the nape and behind the ears: if they still feel cool and wet, keep going; slightly damp, with the hair feeling light and loose, is enough.",
        image: { src: img("say-so-toc-bang-tay-dau-may-chia-xuong"), alt: "A stylist rough-dries a client's long damp hair without a brush, one hand in the roots on top of the head and the other holding the dryer pointing down", caption: "Rough-drying: just a hand and the dryer, no brush yet." },
      },
      {
        name: "Section, leaving the layer at the nape",
        text: "Clip all the upper hair up on top of the head, leaving only a thin layer at the nape about as wide as the brush. Neat sections dry faster and no section gets missed.",
        image: { src: img("chia-vung-de-lai-lop-toc-o-gay"), alt: "A client's long blonde hair seen from behind, the upper hair clipped neatly on top while the stylist holds a brush by the thin layer left at the nape" },
      },
      {
        name: "Dry the lower layer with the round brush",
        text: "Place the round brush under a section, close to the roots. The concentrator sits parallel to the brush, pointing down, a few centimetres away. Draw the brush slowly to the ends with even tension, the dryer following it. Repeat a few times until the section is completely dry and shiny. At the ends, turn the brush in a little so they bend softly.",
        image: { src: img("luoc-tron-sat-chan-toc-dau-thu-gio-chia-xuong"), alt: "From behind, a stylist places a round brush under the layer of hair at the client's nape, a black dryer with a concentrator pointing down just above the brush", caption: "Brush close to the roots, the concentrator parallel to it and pointing down." },
      },
      {
        name: "Use the cool shot before releasing the brush",
        text: "With the finished section still wound on the brush, hold it still. Press the cool shot for a few seconds, and only once the hair is cool, slide the brush out gently. Let down the next layer and do the same, working up towards the crown.",
      },
      {
        name: "Dry the sides and the face framing",
        text: "Dry section by section, directing the hair back and away from the face, the ends turning outwards. For the face-framing pieces, place the round brush on the inside of the section, close to the face but not touching the skin, and turn the brush outwards and back as you dry. Near the ear, be gentle and shield the client's ear with your hand. When both sides are done, compare them in the mirror: the volume and the bend at the ends must match.",
      },
      {
        name: "Build volume at the crown",
        text: "Take a section on top and lift it high, almost straight up, the round brush close to the roots. Dry the roots first, nozzle still pointing down the hair, then draw the brush out to the ends. Use the cool shot before releasing. At the parting, dry it to the left and then to the right a few times so the roots do not lie flat.",
      },
      {
        name: "Finish",
        text: "Feel with your hand that the hair is completely dry, at the roots and at the nape too. Apply a very small amount of hair oil or serum to the ends, as the product instructs. Let the client see the result from the front and both sides, ask whether she would like anything changed, then show her how to dry it herself at home. Note the brush, products and the look she likes in her client record.",
      },
    ],
  },
  faq: [
    {
      q: "How do you blow-dry for root volume that lasts?",
      a: "Lift the section on top high, place the round brush close to the roots and dry the roots first, nozzle still pointing down. Then use the cool shot so the hair cools on the brush before you release it. For more volume, roll the section up, clip it lightly against the head and remove the clip only once it is completely cool.",
    },
    {
      q: "How dry should hair be before using a round brush?",
      a: "About seventy or eighty percent dry. Rough-drying by hand first is faster and the hair takes less heat, while hair that is still slightly damp can still be shaped by the brush. To test, slide your hand into the roots at the nape and behind the ears: slightly damp, with the hair feeling light and loose, is right.",
    },
    {
      q: "Why does my blow-dry drop so quickly?",
      a: "Usually because the hair was not completely dry inside, as the sections were too thick, or because the brush was released while the hair was still hot. Take thinner sections, check the roots and nape for dampness, and give each section a few seconds of cool shot on the brush.",
    },
    {
      q: "How do you blow-dry the ends under with a round brush?",
      a: "Draw the round brush from the roots to the ends with the dryer following above it and the concentrator pointing down. At the ends, turn the brush in a little so they bend softly, hold it still and press the cool shot before sliding the brush out.",
    },
    {
      q: "How do you get hair out of a tangled round brush?",
      a: "Switch off the dryer, turn the brush back slowly and untangle it bit by bit. Do not yank it, because that breaks the hair and hurts. Do not add more heat either, because heat on hair that is under strain only does more damage.",
    },
    {
      q: "What should I keep in mind when blow-drying my own hair at home?",
      a: "Towel-dry by pressing, dry by hand until the hair is only slightly damp before using a brush, and keep the nozzle pointing down the hair. Do not hold the dryer in one place too long or press it to the scalp, and dry the roots completely so the style holds.",
    },
  ],
  related: ["say-tao-kieu-hieu-dung", "cat-nu-tang", "cat-mai", "cat-nu-bang"],
};

export default article;
