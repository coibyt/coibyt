import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thao-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-remove-gel-polish",
  lesson: "thao-gel",
  category: "nail",
  title: "How to remove gel polish properly: 8 steps that keep the natural nail intact",
  metaTitle: "How to remove gel polish: 8 steps without thinning nails",
  metaDescription:
    "How to remove gel polish step by step: break the top coat, protect the skin, soak in acetone 10–15 minutes, push off with a wooden stick, care, plus hard gel.",
  keyword: "how to remove gel polish",
  keywords: [
    "gel removal steps",
    "how long to soak gel nails in acetone",
    "foil method gel removal",
    "how to remove gel polish at home",
    "how to remove hard gel",
    "remove gel without damaging nails",
  ],
  excerpt: "Eight steps to take gel polish off so all the gel goes and the natural nail stays intact: break the top coat, protect the skin, soak, push gently, clean and care.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-thao-gel-cho-khach-tai-salon"),
    alt: "A brown-haired nail technician in black gloves unwraps the foil from a blonde client's fingertips at a stone table",
  },
  takeaways: [
    "One principle only: **the gel must come off by itself**. No peeling, no prying, no scraping.",
    "File the top coat until all the shine is gone before soaking, or the acetone cannot get in.",
    "The acetone pad is just the size of the nail; wrap the foil tight and soak, usually **10–15 minutes**, as the product says.",
    "If it only comes off with pressure, the gel is not soft yet: stop, re-wrap and soak about 5 minutes more.",
    "Acetone is highly flammable: no candles, no flames, ventilation on and the bottle closed straight after use.",
  ],
  intro: [
    "How to remove gel polish properly comes down to one principle: the gel must come away from the nail by itself. The technician does not peel, pry or scrape. Your hands prepare the nail so the chemical can do its part, and then you wait long enough.",
    "This article walks through the eight steps of the VaraaAi Academy lesson “Safe gel removal: step-by-step practice” in the Nails course, from the first question to the client to the last drop of oil, with how to deal with hard gel and the mistakes that thin the natural nail. If you want to understand why peeling gel does so much damage, read the theory article [Does gel removal damage nails?](lesson:thao-gel-hieu-dung).",
  ],
  sections: [
    {
      id: "before-you-start",
      title: "Before you start: allow enough time and know what you are removing",
      blocks: [
        { p: "Proper removal takes time, usually about half an hour for a set. The moment a technician is most tempted to scrape with the pusher is when she is in a hurry. When you take the booking, allow that time so you never have to cut corners." },
        { p: "The second task is to identify the product on the nails. Ordinary gel polish can be soaked off in acetone. Hard gel does not dissolve, however long you soak it, and has to be filed down as described at the end of this article. Ask the client two questions: is it gel polish or builder gel, and where and how long ago was it done?" },
        { note: "The soak time in this article is the usual one. The right figure for your acetone or gel remover is in the brand's instructions.", kind: "info", title: "Always follow the product's instructions" },
      ],
    },
    {
      id: "soaking-tips",
      title: "How long to soak gel nails in acetone, and how to soften them evenly",
      blocks: [
        { p: "Soaking usually takes 10 to 15 minutes. A few small things during that time decide whether the gel softens evenly." },
        {
          ul: [
            "**Do not keep opening the foil to check.** The foil is wrapped tight so the chemical does not evaporate, and every peek lets some escape.",
            "**Cold hands soften gel more slowly.** You can lay a towel over the client's hands to keep them warm.",
            "**Wrap and unwrap in the same order.** Finish the first hand before wrapping the second, and open them in that order, so each hand soaks long enough.",
            "**Work on each finger as soon as you open it.** Open all five at once and the gel on the fingers that wait has time to harden again.",
          ],
        },
        { img: { src: img("quan-giay-bac-u-thao-gel"), alt: "A nail technician in black gloves folds a piece of foil snugly around a client's index fingertip, the two fingers beside it already wrapped", caption: "Squeeze the foil tight around the fingertip so the acetone does not evaporate." } },
        { img: { src: img("gel-phong-nut-tu-bong-sau-khi-u-acetone"), alt: "Close-up of a nail after soaking in acetone, the red gel puffed up, cracked into several pieces and lifting off the nail", caption: "Gel that has soaked long enough looks like this: puffed, cracked and coming away by itself." } },
        { p: "If you use soaking clips instead of foil, the clip's job is to hold the pad pressed against the nail. Either way, close the bottle as soon as you have poured." },
      ],
    },
    {
      id: "common-mistakes",
      title: "Common gel removal mistakes and how to fix them",
      blocks: [
        {
          table: {
            head: ["What happens", "Usual cause", "Fix"],
            rows: [
              ["The gel is untouched after the full soak", "The top coat was not fully broken, especially by the cuticle and along the sides", "File again until all the shine is gone, then soak again"],
              ["The gel softens unevenly, patchy", "Oil on the nail plate blocked the chemical, or the foil was not sealed", "Oil only on the skin; squeeze the foil tight"],
              ["White, dry skin around the nail", "The pad was too big and acetone soaked into the skin", "Cut pads to the size of the nail; oil or cream on the skin before soaking"],
              ["The gel only comes off with pressure", "The gel is not soft yet", "Stop, replace the pad, re-wrap and soak about 5 minutes more"],
              ["White, rough patches on the nail", "The gel was forced off and took natural nail with it", "No quick fix. Oil and wait for the nail to grow out"],
            ],
          },
        },
        { note: "If you hold the stick upright and press down, you are scraping, not pushing. The wooden stick or pusher always lies very flat, almost along the nail.", kind: "tip", title: "Watch the angle of the stick" },
      ],
    },
    {
      id: "hard-gel",
      title: "How to remove hard gel that does not dissolve in acetone",
      blocks: [
        { p: "Hard gel is not soaked. File it down gradually by hand until only a very thin layer of base is left, then stop. Do not file into the natural nail. That base layer will grow out with the nail." },
        { p: "An e-file does this faster, but only for people who have been trained. Filing and drilling produce a lot of gel dust, so wear gloves and a mask and use dust extraction if you have it. Why gel dust is a concern is explained in [Allergies and chemicals](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "acetone-safety",
      title: "Working safely with acetone",
      blocks: [
        {
          ul: [
            "Acetone is highly flammable. No candles and no flames on the table.",
            "The room must be ventilated.",
            "Close the bottle straight after every pour.",
            "Put on gloves before you start. Change them as soon as they are wet with chemicals.",
            "Brush filing dust away; never blow it.",
          ],
        },
        { note: "If the skin around the nails is swollen, red, has pus or an open wound, stop, do not carry on, and advise the client to see a doctor.", kind: "warn", title: "When not to go ahead" },
      ],
    },
    {
      id: "after-removal",
      title: "After gel removal: nail care, advice for the client and clearing up",
      blocks: [
        { p: "A freshly uncovered nail looks a little white and dry from dehydration, and oil helps. What comes next depends on the state of the natural nail:" },
        {
          table: {
            head: ["Nail condition", "What to do"],
            rows: [
              ["Healthy", "Can be redone straight away; in that case save the cuticle oil for the end"],
              ["Thin, soft or sore when pressed", "Advise a break from gel, oil every day and gloves for washing up and cleaning"],
              ["Lifting from the nail bed, discoloured or showing signs of infection", "No polish, and advise a doctor"],
            ],
          },
        },
        { img: { src: img("nho-dau-duong-len-mong-sau-khi-thao-gel"), alt: "A nail technician in black gloves uses a dropper to place a drop of golden cuticle oil at the base of a client's bare natural nail" } },
        { p: "The most important piece of advice before the client leaves: next time the gel lifts, do not peel it off at home; come back to the salon." },
        { p: "Once the client has gone, used foil, cotton, wooden sticks and files go into a bin with a lid. Soaking clips are cleaned and disinfected. Metal pushers are washed and sterilised following [Tools after every customer](lesson:ve-sinh-dung-cu). Close the chemical bottles tightly and wipe the table." },
      ],
    },
    {
      id: "booking-gel-removal",
      title: "Let clients book gel removal with enough time",
      blocks: [
        { p: "Because proper removal takes about half an hour, the surest way never to rush it is to let the calendar keep that time free. In VaraaAi you [add gel removal as a separate service](lesson:dich-vu) with exactly the time you need, put it on your [price list](lesson:bang-gia) and follow the appointments in the [calendar](lesson:lich-hen). Every gel removal booking then has enough time to soak until the gel lifts by itself. How to make the new set last is covered in [How to apply gel polish](lesson:son-gel)." },
      ],
    },
  ],
  howTo: {
    title: "How to remove gel polish, step by step",
    id: "gel-removal-steps",
    after: "before-you-start",
    lead: "These eight steps are for gel polish that dissolves in acetone, in the order of the lesson video.",
    supplies: [
      "A 180 grit file and a fine buffer, new for every client",
      "Lint-free pads cut to the size of the nail",
      "Pre-cut foil or soaking clips",
      "Acetone or the brand's gel remover",
      "Wooden sticks and a sterilised pusher",
      "Cuticle oil, gloves and a dust brush",
    ],
    steps: [
      {
        name: "Wash hands, look and ask",
        text: "Wash and disinfect your hands and the client's. Ask whether it is gel polish or builder gel, and where and how long ago it was done. Look at the skin around the nails too: if it is swollen, red, has pus or an open wound, stop and advise the client to see a doctor.",
      },
      {
        name: "Set out the tools and prepare the station",
        text: "Put everything on the table before you begin. Switch on the ventilation, check there are no candles or flames on the table, then put on gloves. With everything ready, you never have to leave the table while the client's fingers are wrapped in foil.",
        image: { src: img("dung-cu-thao-gel-can-chuan-bi"), alt: "Gel removal tools: file, buffer, cotton pads, foil, soaking clips, pump bottle, wooden sticks, a pusher in a sterilisation pouch, cuticle oil and gloves" },
      },
      {
        name: "Break the top coat",
        text: "Hold the client's finger firmly with one hand, lay the file flat on the nail and file lightly and evenly all over until the shine is gone. When the dust turns the colour of the polish, you are through the top coat. Remember the area by the cuticle and both sides, but do not file the skin or down to the natural nail. A nail whose gel has already lifted at a corner is not a place to start prying. Brush the dust away when you are done.",
        image: { src: img("dua-pha-lop-top-truoc-khi-thao-gel"), alt: "A nail technician in black gloves lays a grey file flat on a client's red gel nail, half the nail already filed to a matt finish", caption: "The file lies flat on the nail. The filed part has lost its shine; the rest is still glossy." },
      },
      {
        name: "Oil the skin around the nail",
        text: "Apply a little cuticle oil or cream to the skin around the nail to protect it from the acetone. Only on the skin: oil on the nail plate blocks the chemical and makes the gel soften unevenly.",
      },
      {
        name: "Place the pad, wrap and soak",
        text: "Soak a small pad in acetone until it is wet through but not dripping, and lay it exactly on the nail. Wrap foil around the fingertip and squeeze it tight, or use a clip, working through all five fingers of one hand. Close the bottle at once. Soak usually 10–15 minutes, as the product's instructions say.",
        image: { src: img("dat-bong-tham-acetone-len-mat-mong"), alt: "A nail technician in black gloves places a small white pad exactly on a client's red gel nail, a sheet of foil underneath", caption: "The pad is just the size of the nail and does not cover the skin." },
      },
      {
        name: "Unwrap one finger at a time and push very gently",
        text: "When the time is up, open one finger at a time, in the order you wrapped them. The gel is ready when it has puffed up, cracked and is coming away by itself. Hold the wooden stick very flat, almost along the nail, and push gently from the cuticle towards the tip. If you have to press hard, stop at once, replace the pad, re-wrap and soak about 5 minutes more.",
        image: { src: img("day-gel-bang-que-go-tu-chan-mong-ra-dau-mong"), alt: "A wooden stick held at a low angle on the nail pushes softened flakes of red gel towards the tip, the cuticle area already clear", caption: "The stick lies flat along the nail and the softened gel almost slides off by itself." },
      },
      {
        name: "Clean off what is left",
        text: "If a thin film of base gel remains, wipe it with an acetone pad or glide a fine buffer over it very lightly. Glide only to smooth the surface; do not buff the nail thinner. Work through both hands this way, then ask the client to wash her hands with soap to remove the chemical and the dust.",
      },
      {
        name: "Assess the natural nail and care for it",
        text: "Look closely at the client's natural nails in good light. Healthy nails can be redone, and the cuticle oil then waits until the end. A thin, soft nail that is sore when pressed calls for a break from gel and daily oil. A nail lifting from the nail bed, discoloured or showing signs of infection is not painted, and the client is advised to see a doctor.",
        image: { src: img("kiem-tra-mong-that-sau-khi-thao-gel"), alt: "A nail technician in black gloves lifts a client's fingertips on the arm cushion to look closely at the bare natural nails" },
      },
    ],
  },
  faq: [
    {
      q: "How long do you soak gel nails in acetone?",
      a: "Usually 10 to 15 minutes, but brands differ, so follow the product's instructions. If the gel has not puffed up and cracked when the time is up, re-wrap and soak about 5 minutes more rather than using force to scrape it off.",
    },
    {
      q: "Why do you file the top coat before removing gel polish?",
      a: "The top coat seals like a raincoat; it is made to resist chemicals and scratches. Unless it is filed through, the acetone cannot get in and the gel will not soften however long you soak. File only until the shine is gone, and stop when the dust turns the colour of the polish.",
    },
    {
      q: "How big should the acetone pad be?",
      a: "Just the size of the nail. Acetone dries the skin, so the closer the pad fits the nail, the less the skin is exposed. Before soaking you can put oil or cream on the skin around the nail to protect it, but not on the nail itself.",
    },
    {
      q: "Can you put new gel on straight after removal?",
      a: "Yes, if the natural nail is healthy. A freshly uncovered nail looks a little white and dry from temporary dehydration. If the nail is thin, soft or sore when pressed, it should have a break from gel with daily oil. A nail lifting from the bed, discoloured or showing signs of infection is not painted, and the client should see a doctor.",
    },
    {
      q: "How do you remove hard gel that does not dissolve in acetone?",
      a: "Hard gel cannot be soaked off; it is filed down by hand until only a very thin layer of base remains, without filing into the natural nail. An e-file is for trained technicians only. Wear gloves and a mask while filing, and use dust extraction if you have it.",
    },
    {
      q: "What should you watch out for when removing gel polish at home?",
      a: "The steps are the same as in the salon: break the top coat, soak with a nail-sized pad and foil, and push very gently once the gel has lifted by itself. Never peel or pry. Acetone is highly flammable, so work with ventilation, with no candles or flames nearby, and close the bottle straight after use.",
    },
  ],
  related: ["thao-gel-hieu-dung", "son-gel", "gel-hieu-dung", "cham-soc-mong-co-ban"],
};

export default article;
