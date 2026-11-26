import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-fade/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-a-fade-haircut",
  lesson: "cat-nam-fade",
  category: "hair",
  title: "How to do a fade haircut: 10 steps to a smooth mid skin fade without lines",
  metaTitle: "How to do a fade haircut: 10 steps to a smooth mid fade",
  metaDescription:
    "How to do a fade step by step: choose the height, set a guideline, work in bands, blend with the lever and half guards, erase lines, shave the skin part, connect.",
  keyword: "how to do a fade haircut",
  keywords: [
    "fade haircut step by step",
    "how to do a mid fade",
    "how to do a skin fade",
    "how to fade hair with clippers",
    "how to get rid of lines in a fade",
    "fade guideline",
    "learn to fade for beginners",
  ],
  excerpt: "A mid fade down to the skin in ten steps: the guideline, the bands, erasing lines, the skin part, checking under the light and connecting to the top.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-xem-duong-fade-bang-guong-tay"),
    alt: "A smiling male client turns his head to look at his freshly faded side while the barber behind him holds a round brass-framed hand mirror at the nape",
  },
  takeaways: [
    "Set the **guideline** all the way round first, at the same height on both sides. Everything below it is built on this line.",
    "At every stopping point, turn the wrist and **flick the clipper out** in a scoop. Pulling straight off leaves a line.",
    "Blend from the bottom up, using an in-between length on each line: the lever opened a little more, or a half guard.",
    "Brush off loose hair between passes and check under the light, because loose hair hides lines.",
    "If one side ends up higher, the only fix is raising the lower side. Take care from the guideline on.",
  ],
  intro: [
    "How to do a fade haircut is not a secret hidden in an expensive clipper. A smooth fade comes from the order of work: set a guideline, divide the area below it into bands, then patiently blend the bands together in very small steps. Beginners skip that order and run the clipper up and down until the lines are gone, and the fade ends up much higher than the client wanted.",
    "This article follows the routine of the VaraaAi Academy lesson “Cutting a fade: step-by-step practice” in the Hair course. The model cut is a mid fade, down to the skin at the bottom, blending softly into a top of about five centimetres combed back and slightly to the side. Follow it and you can cut the whole style and fix lines in the right place. If the fade heights, skin fades and tapers are new to you, read [what is a fade haircut](lesson:cat-nam-fade-hieu-dung) first.",
  ],
  sections: [
    {
      id: "agree-the-height",
      title: "Before cutting: choose the fade height with the client",
      blocks: [
        { p: "The height of a fade is something barber and client agree on; there is no common standard. Ask two questions: does the client want a low, mid or high fade, and do they want to see skin at the bottom? Then point straight at the client's head in the mirror: the fade will start here. How much is left on top is agreed as in the article [how to cut men's hair](lesson:cat-nam-co-ban)." },
        {
          ul: [
            "Feel the head shape for the parietal ridge, the occipital bone and any flat spot at the back.",
            "Look at the scalp for scars, and find the whorls at the crown and nape.",
            "A wound or inflammation on the scalp means no close shave.",
          ],
        },
        { note: "For a client's first fade, suggest starting a little lower. Going higher next time is easy. Once it is high, you have to wait for it to grow.", kind: "tip", title: "From the trade" },
      ],
    },
    {
      id: "the-flick-out",
      title: "The wrist flick: the move that decides whether a fade has lines",
      blocks: [
        { p: "One move repeats in every band of the routine: at the stopping point, turn the wrist and take the clipper off the head in a small curve, like scooping with a spoon. The blade leaves the hair gradually, so the hair at the stopping point gets gradually longer and the edge of the band softens." },
        { img: { src: img("hat-tong-do-ra-o-cho-dung"), alt: "Close-up of the side of a male client's head: a clipper with a black guard at the end of its upward stroke, the barber's other hand holding the top hair", caption: "At the end of each upward stroke the wrist turns out so the clipper leaves the head in a curve." } },
        { p: "Stop and pull the clipper straight off, and all the hair underneath is cut to exactly one line: that line is the line you see. Pressing harder to make it cleaner is worse still, because it leaves both a line and a hole." },
        { note: "The flick comes from the wrist, not the whole arm. A relaxed wrist keeps the stopping point from leaving a line.", kind: "tip", title: "Keep the wrist loose" },
      ],
    },
    {
      id: "fade-guideline",
      title: "The fade guideline: following the head shape and balancing both sides",
      blocks: [
        { p: "The guideline runs round the head at one height, but at the back it follows the shape of the head. If the client's head is flat at the back, lower the guideline a little there to keep it looking round." },
        { img: { src: img("duong-chuan-fade-phia-sau-dau"), alt: "Seen from behind, a barber runs a clipper with a black guard up the back of a male client's head, his other hand resting lightly on the client's neck", caption: "At the back: the clipper moves up from the nape hairline, and the guideline follows the head shape." } },
        { p: "Once round, stop and look: is the guideline straight, are both sides balanced? This check is well worth the time. Later, if one side of the fade sits higher than the other, you can no longer bring it down because the hair is already short. The only fix is to raise the lower side to match, which means the whole fade ends up higher than planned." },
      ],
    },
    {
      id: "fade-mistakes",
      title: "Common fade mistakes and how to get rid of lines",
      blocks: [
        {
          table: {
            head: ["What you see", "Cause", "Fix"],
            rows: [
              ["A faint line between two bands", "Two neighbouring lengths not yet blended", "Use the in-between length, only on the line, then flick out"],
              ["The fade keeps creeping up", "Fear of lines, so the clipper keeps going higher", "Stop, erase the line where it is, do not move it up"],
              ["Smooth in the shop, lines in the sun", "Loose hair hid the line, or the light was dim", "Brush off loose hair between passes and check in good light"],
              ["A patchy spot at the nape", "Hair around a whorl lies in several directions", "Clip from several directions with a light hand"],
              ["The two sides at different heights", "The guideline was off from the start", "Raise the lower side to match"],
              ["A ridge where the fade meets the top", "Not blended; a short top cannot cover it", "Scissor- or clipper-over-comb until no ridge is felt"],
            ],
          },
        },
        { p: "The back of the head is harder to see than the sides. Do not rely on the mirror alone: walk round behind the client and crouch down to look." },
      ],
    },
    {
      id: "shaving-safety",
      title: "Safe close shaving and tool hygiene",
      blocks: [
        { p: "The skin part is where tools touch the client's skin directly, so a few rules must not be skipped." },
        {
          ul: [
            "A razor takes single-use blades only, a fresh one for every client. Used blades go into a sharps container.",
            "Clippers, guards, combs and shavers are cleaned and disinfected after every client as the product instructs. The foil and cutter of a foil shaver are cleaned according to the maker's instructions.",
            "If the skin reddens or the client feels stinging, stop. Do not push for an even closer shave.",
            "A wound or inflammation on the scalp means no close shave.",
          ],
        },
        { note: "Rules on razors and salon hygiene differ by country, so check the rules where you work. See also [Tools after every customer](lesson:ve-sinh-dung-cu) and [When not to treat a customer](lesson:khi-nao-khong-lam).", kind: "warn", title: "Rules differ from place to place" },
      ],
    },
    {
      id: "aftercare-and-records",
      title: "What to tell the client and what to record after a fade",
      blocks: [
        { p: "Before the client stands up, say the one thing many barbers forget: the part close to the skin will soften within a few days, and that is normal. A client who knows this in advance will not think the fade has gone wrong. Many clients come back after about 2–3 weeks to keep their fade." },
        { p: "In VaraaAi, write “mid fade, guards, lever” in the client's notes in the [customer records](lesson:khach-hang), so next time anyone can repeat it exactly. Book the next visit straight into the salon's [appointment calendar](lesson:lich-hen). For clients who come in every two or three weeks, the salon can also use the [loyalty card](lesson:the-khach-quen)." },
      ],
    },
  ],
  howTo: {
    title: "How to do a fade haircut: a mid skin fade step by step",
    id: "fade-steps",
    after: "agree-the-height",
    lead: "Ten steps in the order of the lesson video. Guard numbers and lever direction differ by brand, so no specific guard numbers are given here: try them on your own clipper.",
    supplies: [
      "Clipper with a lever and a set of guards, ideally including half sizes",
      "Trimmer for the outline",
      "Foil shaver, or a razor with a fresh single-use blade",
      "Comb and scissors, cleaned and disinfected",
      "Single-use neck strip and cape",
      "Neck brush or hairdryer, hand mirror",
      "Styling product; fragrance-free soothing cream for sensitive skin",
      "Sharps container",
    ],
    steps: [
      {
        name: "Prepare the tools and a fresh blade",
        text: "Wash your hands. Clipper, guards and combs have been cleaned and disinfected since the last client. If you use a razor, fit a fresh blade. Wrap a single-use neck strip round the client's neck before you fasten the cape.",
      },
      {
        name: "Consult and show the height on the client's head",
        text: "Ask whether the client wants a low, mid or high fade and whether they want to see skin at the bottom. Point in the mirror to the spot on the client's head where the fade will start. Feel the head shape for flat spots, scars and whorls before you pick up the clipper.",
      },
      {
        name: "Set the guideline all the way round",
        text: "Comb the hair down; it should be clean and dry. Fit the guard you chose for the guideline, place it flat at the hairline and move up against the growth. At the agreed height, flick the clipper out. Work one side, the back and the other side at the same height; near the ear, fold it down gently.",
        image: { src: img("ke-duong-chuan-fade-bang-tong-do-co-cu"), alt: "A barber runs a clipper with a black guard up the side of a male client's head, his other hand holding the longer hair on top", caption: "The guideline: one guard, one height, all the way round." },
      },
      {
        name: "Work the area below the guideline",
        text: "Divide the area below the guideline into two or three bands. For the bottom band, close the lever or use a shorter guard, then no guard. Make a shorter stroke than for the guideline and flick out at the stopping point too. Go very gently, little by little, along the hairline around the ears and nape. The part down to the skin is left entirely for step seven; for now the bottom band just needs to be very short and even.",
        image: { src: img("dai-duoi-cung-khong-cu-quanh-tai"), alt: "A barber folds a male client's ear down with a finger while his other hand runs a clipper with no guard gently along the hairline behind the ear" },
      },
      {
        name: "Blend each band from the bottom up",
        text: "There are now lines between the bands. Start with the lowest: open the lever halfway for a length between the two bands, go exactly on the line and scoop out with short, light strokes. For the next line, open the lever further or fit a half guard, and carry on up to the guideline and from the guideline into the top. Between passes, brush off the loose hair or blow it gently away with a dryer, because loose hair lying on the head hides the lines.",
      },
      {
        name: "Erase remaining lines under the light",
        text: "Comb the hair down and look under the light. Wherever a faint line or a darker patch remains, use exactly the in-between length on that spot only. Do not push the whole fade higher. Work a nape whorl from several directions with a light hand.",
      },
      {
        name: "Do the skin part and the outline",
        text: "Stretch the skin lightly and clean up the very bottom with a foil shaver. If you use a razor, only with a fresh blade, with the grain, in one pass. If the skin reddens or stings, stop. Then outline the ears, sideburns and nape with the trimmer, following a natural line without cutting too high.",
        image: { src: img("may-cao-luoi-lam-phan-sat-da-o-gay"), alt: "A barber stretches the skin at a male client's nape with two fingers while holding a small black foil shaver flat against the skin behind the ear", caption: "Two fingers stretch the skin and the foil shaver lies flat on the bottom section." },
      },
      {
        name: "Check both sides and the back in good light",
        text: "Bring the client into good light or switch on the lamp. With the client sitting straight and looking into the mirror, compare both sides: the fade at the same height, the sideburns level. Then look from the left, the right, crouch to eye level and check the back. Ask the client to tilt their head slightly so small lines show more clearly under the light, and fix anything that is not smooth straight away.",
      },
      {
        name: "Connect the fade to the top",
        text: "Cut the top from a guideline at the front, as in the men's haircut basics lesson. Then blend the area where the fade meets the top with scissor-over-comb or clipper-over-comb. Keep the comb moving up steadily without stopping, until you feel no ridge when you brush upwards. The shorter the top, the smoother this connection must be, because there is no long hair falling over it.",
        image: { src: img("tong-do-tren-luoc-noi-fade-voi-phan-dinh"), alt: "A barber holds a black comb lifting a layer of a male client's hair while his other hand runs a clipper with no guard along the spine of the comb", caption: "Clipper-over-comb where the sides meet the top." },
      },
      {
        name: "Finish, record and clean up",
        text: "Brush off all loose hair. If the client has sensitive skin and agrees, apply a little fragrance-free soothing cream to the freshly shaved area. Style the top, show the client how to do it at home and hold up the hand mirror so they can see the sides and nape. Record the height, guards and lever in the client record. After the client has gone, brush the hair out of the clipper blade, disinfect the tools, oil the blade and put the razor blade into the sharps container.",
        image: { src: img("vuot-san-pham-tao-kieu-sau-khi-cat-fade"), alt: "A barber works styling product into the top of a male client's hair with his palms, the sides already cut short and neat" },
      },
    ],
  },
  faq: [
    {
      q: "Where do you start when cutting a fade?",
      a: "With the guideline: one guard, run from the hairline up to the height agreed with the client, all the way round the head at the same height. The area below the guideline is then divided into two or three bands, the bottom one shortest, and only then are the bands blended together.",
    },
    {
      q: "Do you cut a fade on wet or dry hair?",
      a: "In the lesson's routine the hair is clean and dry, combed down before the guideline is set. Between clipper passes, brush off loose hair or blow it gently away with a dryer, because loose hair hides the lines.",
    },
    {
      q: "How do you get rid of a line between two bands of a fade?",
      a: "Use the length between those two bands, with the lever half open or a half guard, and go only along the line, then flick the clipper out. Do not go over the whole area or higher up, because that pushes the whole fade higher than the client wanted.",
    },
    {
      q: "Why flick the clipper out at the stopping point?",
      a: "Scooping out makes the blade leave the hair gradually, so the stopping point fades away. Stopping and pulling the clipper straight off, or pressing hard, turns the stopping point into a line and a hole. The move comes from a relaxed wrist, not from the whole arm.",
    },
    {
      q: "One side of the fade is higher than the other. How do you fix it?",
      a: "The only fix is to raise the lower side to match, because hair that has been cut short cannot be brought back down. That is why you compare both sides right after setting the guideline, while a difference is still easy to correct.",
    },
    {
      q: "Should you use a foil shaver or a razor for the skin part of a skin fade?",
      a: "Both work. A foil shaver is gentler on the skin. A razor takes only a fresh single-use blade, used with the grain in one pass. Stop if the skin reddens or the client feels stinging, and do not shave close on a scalp with a wound or inflammation.",
    },
  ],
  related: ["cat-nam-fade-hieu-dung", "cat-nam-co-ban", "cat-nam-tao-kieu", "ve-sinh-dung-cu"],
};

export default article;
