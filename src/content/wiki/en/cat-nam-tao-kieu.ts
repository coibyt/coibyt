import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-tao-kieu/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-cut-a-side-part-and-french-crop",
  lesson: "cat-nam-tao-kieu",
  category: "hair",
  title: "How to cut a side part and a French crop: 12 steps from the natural parting to matte paste",
  metaTitle: "How to cut a side part and a French crop: 12 steps",
  metaDescription:
    "How to cut a side part and a French crop: find the natural parting, cut the top longer to the front, point cut, a hard part, blow-dry, cut the fringe and style.",
  keyword: "how to cut a side part",
  keywords: [
    "side part haircut step by step",
    "how to cut a French crop",
    "how to style a side part",
    "how to style men's hair with matte paste",
    "how to blow-dry men's hair",
    "how to find your natural parting",
    "how to shave a hard part",
  ],
  excerpt: "Two much-requested men's styles, step by step: a side part with a natural parting and a longer front, then a French crop with a short textured top and a fringe.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-chai-kieu-toc-side-part-cho-khach-nam"),
    alt: "A barber in a purple waistcoat combs a side part with a black comb for a smiling male client in a leather chair in a barbershop",
  },
  takeaways: [
    "Place the parting at the **natural parting**: wet the hair, comb it back, push the top forward, and draw the parting where the hair splits.",
    "To make the hair grow longer towards the front, pull each section **back** towards the guideline at the crown before cutting.",
    "Leave the front a little longer than planned and refine it once the hair is blow-dried.",
    "A hard part only when the client wants it and understands it cannot be moved. The razor always takes a fresh single-use blade.",
    "Cutting a crop fringe: the client closes their eyes, and the blade stays below your fingers, never touching the skin.",
  ],
  intro: [
    "Learning how to cut a side part differs from an ordinary short cut in two ways: the parting has to sit exactly where the hair splits by itself, and the top has to grow longer towards the front so it falls nicely over the parting. A French crop is the opposite: a short top pushed forward, finished with a fringe line on the forehead. The two styles share many techniques, so it makes sense to learn them together.",
    "This article follows the routine of the VaraaAi Academy lesson “Men's styles: step-by-step practice” in the Hair course. The first eight steps cut a side part, the last four a crop on a different client. Follow them and you can cut and style both, and tell the client how to style the hair at home. Which style suits which face and hair is covered in the article [men's haircut for face shape](lesson:cat-nam-tao-kieu-hieu-dung).",
  ],
  sections: [
    {
      id: "agree-the-style",
      title: "Preparing and agreeing the style before cutting",
      blocks: [
        { p: "The preparation is the same as for any men's cut: wash your hands, use disinfected tools, and wrap a single-use neck strip before you fasten the cape, as in the article [how to cut men's hair](lesson:cat-nam-co-ban). What is special about these two styles happens in the consultation." },
        {
          ul: [
            "Consult while the hair is dry, and ask to see a reference photo.",
            "Look at the face, the density at the front, and look for a cowlick at the front hairline.",
            "Ask how many minutes the client has for his hair each morning, and whether he blow-dries.",
            "Agree both parts together: the sides, taper or fade and how high; the top, how much is left and how long at the front.",
          ],
        },
      ],
    },
    {
      id: "over-direct-back",
      title: "Why pulling sections back makes the front longer",
      blocks: [
        { p: "In a side part the guideline sits at the crown, not at the forehead. As you work towards the forehead, you do not cut each section where it falls. You pull it back towards the guideline and then cut. The further a section grows from the guideline, the further it has to travel to reach it, so the longer it is when released. The result is hair that grows gradually longer towards the front, with the front the longest of all." },
        { p: "The front needs that length so that when it is combed to the side, it falls nicely over the parting. Once you have cut, comb the hair over along the parting to test it, see whether it falls well, and check in the mirror that both sides of the forehead look balanced." },
        { note: "Long can always be cut shorter; once it is short, it cannot be undone. Leave the front a little longer than planned and refine it once the hair is blow-dried.", kind: "tip", title: "From the trade" },
      ],
    },
    {
      id: "how-to-style",
      title: "How to style men's hair after the cut: side part versus crop",
      blocks: [
        { p: "The two styles are finished in almost opposite ways. The table below is also what you should tell the client before he leaves the chair." },
        {
          table: {
            head: ["Task", "Side part", "Crop"],
            rows: [
              ["Blow-dry", "Roots first, from the parting over to the other side, fingers lifting the front roots", "Use your fingers to push the hair forward"],
              ["Product", "Pomade for a shiny, neat look; matte paste for a more natural finish", "Matte paste. Fine hair: a little sea-salt spray before drying"],
              ["Finish", "Work it through from back to front, then comb along the parting", "Scrunch and lightly twist each piece, push it forward. No comb"],
            ],
          },
        },
        { p: "With both styles, take only a little product and rub it evenly between your palms before it goes on the hair. In a side part the roots must be dry for the shape to hold, and a final blast of cool air helps set it. A crop looks best when it looks a little natural, with separated pieces." },
      ],
    },
    {
      id: "common-mistakes",
      title: "Common mistakes when cutting a side part and a French crop",
      blocks: [
        {
          table: {
            head: ["What you see", "Cause", "How to avoid it"],
            rows: [
              ["The hair will not lie along the parting", "The parting was placed against the natural one", "Find the natural parting first; if the client wants the other side, warn him it needs more blow-drying each morning"],
              ["The parting has nowhere to sit", "The sides on the parting side were cut too high", "Keep the sides lower on the parting side"],
              ["The front is too short to fall over the parting", "Cut to the planned length straight away", "Leave it a little longer and refine after blow-drying"],
              ["Short hairs standing up along the parting", "Thinned close to the roots at the parting", "Point cut only at the ends"],
              ["The crop fringe will not lie down", "A strong front cowlick and a fringe cut too short", "Leave the fringe a little longer so it is heavy enough"],
              ["A ridge showing where the crop's fade meets the top", "A crop has no long hair falling over to hide it", "Blend the fade into the top really smoothly"],
            ],
          },
        },
      ],
    },
    {
      id: "safety",
      title: "Safety: hard parts, cutting the fringe and the hairdryer",
      blocks: [
        {
          ul: [
            "**Hard part.** Only when the client wants it and understands that it cannot be moved to the other side and will look fuzzy for a while as it grows back. The razor takes single-use blades only, a fresh one for every client; used blades go into the sharps container.",
            "**Cutting the fringe.** Ask the client to close his eyes so cut hair does not fall into them. The blade always stays below your fingers: your fingers sit between the blade and the skin of the forehead.",
            "**Hairdryer.** Keep the dryer some distance from the head and do not let the heat blow on one spot for long.",
          ],
        },
        { note: "Tools are cleaned and disinfected after every client as the product instructs, as in the lesson [Tools after every customer](lesson:ve-sinh-dung-cu). Rules on razors and salon hygiene differ by country, so check the rules where you work.", kind: "warn", title: "Rules differ from place to place" },
      ],
    },
    {
      id: "client-record",
      title: "Recording, rebooking and recommending products",
      blocks: [
        { p: "Before the client leaves, note five things: which style, which side the parting is on, how the sides were done, how long the top is, and which product. The next visit is usually in about 3–5 weeks." },
        { p: "In VaraaAi these notes live in the [customer records](lesson:khach-hang). When the client comes back, suggest the same product he used last time; if the salon sells paste or pomade, you manage them under [products and orders](lesson:san-pham-don-hang). If the salon offers cut and styling as a separate service, give it its own duration in the [service menu](lesson:dich-vu), long enough for the blow-dry and for showing the client what to do." },
      ],
    },
  ],
  howTo: {
    title: "How to cut a side part and a French crop: the steps",
    id: "side-part-and-crop-steps",
    after: "agree-the-style",
    lead: "Step 1 applies to both styles. Steps 2 to 8 cut the side part, steps 9 to 12 the crop.",
    supplies: [
      "Clipper, guards and trimmer, cleaned and disinfected",
      "Scissors and a tail comb for the parting",
      "Fine-mist spray bottle",
      "Hairdryer",
      "Pomade, matte paste, sea-salt spray",
      "Razor with a fresh single-use blade and a sharps container, if the client wants a hard part",
      "Single-use neck strip, cape, hand mirror",
    ],
    steps: [
      {
        name: "Consult on dry hair to choose the style",
        text: "Look at the client's reference photo, his face, the density at the front and any cowlick at the front hairline. Ask about his mornings to find out whether he blow-dries. Settle both the sides and the top before you wet the hair.",
      },
      {
        name: "Find the natural parting",
        text: "Wet the hair evenly and comb it all back. Push the top gently forward with your palm: where the hair separates is the natural parting. Redraw it cleanly with the tail of the comb. If the client wants the parting on the other side, tell him beforehand that the hair may not lie flat and will need more careful blow-drying every morning.",
        image: { src: img("tim-duong-ngoi-tu-nhien-bang-long-ban-tay"), alt: "A barber places his palm on top of a male client's wet, combed-back hair and gently pushes the top forward", caption: "Wet hair, combed back, then pushed gently forward so it splits by itself." },
      },
      {
        name: "Cut the sides: taper or fade",
        text: "Do the sides as agreed, as in the men's haircut basics and fade lessons. A taper is subtle and suits the office; a fade looks younger and sharper. On the parting side, do not take the sides too high, so the parting still has somewhere to sit.",
      },
      {
        name: "Cut the top longer towards the front",
        text: "Take the first section at the crown, lift it and cut the agreed length: that is the guideline. Working gradually towards the forehead, pull each section back towards the guideline before you cut. The hair grows longer towards the front, with the front the longest. Comb it over along the parting to test it and check that both sides of the forehead look balanced.",
        image: { src: img("cat-duong-chuan-phan-dinh-kieu-re-ngoi"), alt: "A barber lifts a section of a male client's top hair, holds it between index and middle fingers and cuts above his fingers with scissors", caption: "Each section is lifted, held between two fingers and cut above them." },
      },
      {
        name: "Point cut and blend the top into the sides",
        text: "Take each section, point the scissor tips straight into the ends and cut small notches so the ends soften without a hard line. Go lightly on fine hair; thick hair can take deeper point cutting. Do not thin close to the roots along the parting, because the short hairs will stand up. Then cross-check and blend the top into the sides with scissor-over-comb.",
      },
      {
        name: "Shave a hard part, only on request",
        text: "Tell the client beforehand that a hard part cannot be moved to the other side and looks fuzzy for a while as it grows back. Fit a fresh single-use blade. Stretch the skin, hold the blade almost flat against it and shave one thin, slow line along the parting. Do not go too far into the top.",
        image: { src: img("cao-duong-ngoi-cung-bang-dao-cao"), alt: "A barber stretches the skin at a male client's temple with two fingers and places a razor on the parting of his side part with the other hand", caption: "One hand stretches the skin, the other draws a thin line along the parting." },
      },
      {
        name: "Blow-dry in the direction of the parting",
        text: "Dry the roots first, in the direction of the style: from the parting over to the other side. Lift the front roots gently with your fingers for volume. Once the roots are dry the shape holds, and a final blast of cool air sets it. Keep the dryer some distance from the head and never on one spot for long.",
        image: { src: img("say-toc-nam-theo-huong-duong-ngoi"), alt: "A barber holds a black hairdryer over the top of a male client's hair while his other hand lifts the roots at the front", caption: "The hand lifts the roots and the airflow follows the direction the hair will lie." },
      },
      {
        name: "Apply product and comb along the parting",
        text: "Choose pomade for a shiny, neat look or matte paste for a more natural one. Take a little, rub it evenly between your palms, work it through from back to front and comb along the parting. Show the client how to redo it at home and hold up the hand mirror for him.",
      },
      {
        name: "Crop: fade the sides",
        text: "The sides of a crop are usually a low or mid fade, done as in the fade lesson. Blend the fade into the top really smoothly, because a crop has no long hair falling over it to hide the join.",
      },
      {
        name: "Crop: cut a short, textured top",
        text: "Lift each section and cut the agreed length, evenly from the crown to the front. Then point cut more, and deeper than for the side part, so the top has texture with separated pieces.",
      },
      {
        name: "Crop: cut the fringe line",
        text: "Comb the fringe straight forward and ask the client to close his eyes. Hold it between two fingers and cut a short line at the agreed height, usually around the middle of the forehead; the blade stays below your fingers and never touches the skin. Look straight into the mirror to check the line is even from left to right, then point cut lightly to soften it, unless the client wants a really straight line. With a strong front cowlick, leave the fringe a little longer.",
        image: { src: img("cat-duong-mai-french-crop-khach-nham-mat"), alt: "A blond male client sits with his eyes closed while the barber behind him holds the fringe in his fingers and cuts across below them", caption: "Eyes closed, and the blade stays below the fingers." },
      },
      {
        name: "Crop: style with matte paste",
        text: "You can blow-dry first, using your fingers to push the hair forward; for fine hair, a little sea-salt spray before drying makes it look thicker. Once the hair is dry, take a little matte paste, rub it evenly between your hands, scrunch the top, twist each piece lightly and push it forward. Do not comb it. Hand the client the paste to try once, then hold up the hand mirror.",
        image: { src: img("vo-sap-li-len-toc-french-crop"), alt: "A barber stands behind a blond male client and scrunches and twists the short pieces on top with the fingertips of both hands", caption: "Matte paste is worked in with the fingertips, each piece pushed forward." },
      },
    ],
  },
  faq: [
    {
      q: "Which side should a side part go on?",
      a: "On each person's natural parting. Wet the hair, comb it all back, then push the top gently forward with your palm: wherever the hair splits by itself is where the parting goes. The other side is possible, but the hair may not lie flat and will need more careful blow-drying every morning.",
    },
    {
      q: "How do you cut a side part so the front is longer than the back?",
      a: "Set the guideline at the crown, then as you work towards the forehead, pull each section back towards the guideline before cutting. Over-directing like this makes the hair grow gradually longer towards the front. Leave the front a little longer than planned and refine it after blow-drying.",
    },
    {
      q: "How do you style a side part at home?",
      a: "Dry the roots first, from the parting over to the other side, lifting the front roots gently with your fingers, then use a little cool air to set the shape. Rub a little pomade or matte paste evenly between your palms, work it through from back to front and comb along the parting. Left to dry naturally, the front usually goes flat.",
    },
    {
      q: "Should you get a hard part?",
      a: "Only if you really want one. A hard part looks sharp, but it cannot be moved to the other side and looks fuzzy for a while as it grows back. The barber shaves it with a razor fitted with a fresh single-use blade, in one thin line along the parting.",
    },
    {
      q: "How high should a French crop fringe be cut?",
      a: "The height of the fringe is agreed with the client, usually around the middle of the forehead. Someone with a strong cowlick at the front hairline should keep the fringe a little longer so it is heavy enough to lie down. While it is cut, the client closes his eyes and the blade stays below the barber's fingers.",
    },
    {
      q: "What product do you use to style a French crop?",
      a: "A crop suits matte paste: take a little, rub it evenly between your hands, scrunch the top, twist each piece lightly and push it forward, without a comb. Fine hair can take a little sea-salt spray before blow-drying to look thicker.",
    },
  ],
  related: ["cat-nam-tao-kieu-hieu-dung", "cat-nam-fade", "cat-nam-co-ban", "say-tao-kieu"],
};

export default article;
