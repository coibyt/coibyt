import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/french-ombre/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-french-tips-and-ombre-nails",
  lesson: "french-ombre",
  category: "nail",
  title: "How to do French tips and ombré nails: 12 steps to an even smile line",
  metaTitle: "How to do French tips and ombré nails: 12 steps",
  metaDescription:
    "How to do French tips with a liner brush and ombré nails: pink base, the smile line, painting corner to centre, cleaning the line, blending.",
  keyword: "how to do French tips",
  keywords: ["how to do ombré nails", "how to paint a French smile line", "French tips with a liner brush", "how to do baby boomer nails", "ombré nails with a sponge", "gel French manicure steps", "ombré nails white line"],
  excerpt: "A classic French with a liner brush, then a baby boomer ombré, step by step: choosing the smile line, painting two matching halves, cleaning the line before curing and blending without a band.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-ve-mong-french-cho-khach-tai-salon"),
    alt: "An auburn-haired nail technician in a cream top and black gloves paints a blonde client's nails at a marble table in a Parisian-style salon",
  },
  takeaways: [
    "Shape the nails before you paint, because the smile line has to suit the shape.",
    "Look at all ten nails before choosing the smile line, and picture **three points**: two corners of equal depth and the shallowest point in the centre.",
    "Paint the white from one corner to the centre, then from the other corner to the centre at the same depth. The white always stays thin.",
    "**Clean the smile line before curing** with a small flat brush only barely damp with cleanser. Fix an uneven nail before curing too.",
    "Ombré: white only on about the front third of the nail, blend one nail at a time and cure straight away, usually two to three thin layers.",
  ],
  intro: [
    "Knowing how to do French tips with a liner brush does not take an artist's hand. It takes an order of work: choose the smile line for the whole set first, paint each half from the corner to the centre, then sharpen the line while the gel is still soft. Ombré is the opposite: there is no line to paint, only a thin layer of white blended up a little at a time.",
    "This article is based on the VaraaAi Academy lesson “French and ombré: step by step” in the Nails course. The first eight steps make a classic French, the last four a baby boomer ombré. Watch the lesson video below to see how the brush is placed, then come back to each step while you practise on nail tips.",
  ],
  sections: [
    {
      id: "before-you-paint",
      title: "Before you paint: the prep is the same as gel polish",
      blocks: [
        { p: "French and ombré are gel polish with an extra design stage. Nail prep, base coat and curing are exactly as in [how to apply gel polish](lesson:son-gel), so this article only recaps them briefly and spends its time on the smile line and the blend." },
        { p: "One thing differs in the order of work: the nail shape must be completely finished before you paint. A smile line on a square nail is flatter, on an almond nail it curves deeper. Reshape the nail after painting and the smile line no longer matches the tip." },
        { note: "Before the brush touches the nail, picture three points: one at each corner of the tip, at the same depth, and one in the middle, where the smile line is shallowest. Get the three points right and the smile line almost evens itself.", kind: "tip", title: "The three-point trick" },
        { p: "The theory of a good smile line, how deep the white should be for each nail length and the French styles are in [what is a French manicure](lesson:french-ombre-hieu-dung)." },
      ],
    },
    {
      id: "brush-or-sponge",
      title: "Blending ombré nails: brush or sponge",
      blocks: [
        { p: "Both methods give a beautiful result. Choose the one your hand is more used to." },
        {
          table: {
            head: ["Method", "How", "Note"],
            rows: [
              ["Clean flat brush, almost dry", "Place it where the white meets the pink and pull very short, very light strokes towards the cuticle", "Wipe the brush often"],
              ["Small sponge", "Dab lightly over the colour change many times so the white fades gradually upwards", "One sponge per client, thrown away after use"],
            ],
          },
        },
        { img: { src: img("tan-mau-ombre-bang-mieng-mut"), alt: "A nail technician dabs a small white sponge lightly on the middle of a client's nail, where the white gel meets the pink base", caption: "Blending with a sponge: light dabs, many times, over the colour change." } },
        { p: "For the white, many technicians choose a slightly sheer milky white rather than solid white, because it is softer and easier to blend. The pink or nude base is the colour at the cuticle of the finished ombré, so choose a shade that suits the client's skin." },
        { img: { src: img("bo-mong-ombre-baby-boomer-hoan-thien"), alt: "A client's two hands resting one over the other on a cream cushion, ten glossy ombré nails fading evenly from pink into milky white", caption: "A finished ombré set: the colour fade looks the same on all ten nails." } },
      ],
    },
    {
      id: "mistakes-and-fixes",
      title: "French tip and ombré mistakes, and how to fix them",
      blocks: [
        { p: "Almost every French mistake can be fixed in seconds if the gel has not gone under the lamp. After curing, the same mistake has to be buffed off, which wastes time and thins the base." },
        {
          table: {
            head: ["What you see", "Usual cause", "Fix"],
            rows: [
              ["Lopsided smile line", "The two corners were not placed at the same depth", "Before curing, wipe that nail's white off with cleanser on a brush and paint it again"],
              ["Blurred edge", "Line not cleaned up, or a brush so wet it made the white bleed", "Blot the brush on a towel until almost dry, then glide along the inner edge"],
              ["Gel set before you could clean it", "The client's hand was near the lamp while you painted, and stray light started curing it", "Keep the hand away from the lamp; paint a few nails, then cure"],
              ["White not white enough", "The first layer is thin, exactly as it should be", "Add another thin layer along the same line, clean up, then cure"],
              ["Band or streaks in the ombré", "White too thick, or not blended enough", "Thin layers, light blending in several rounds, cure each nail once blended"],
              ["Ombré white too close to the cuticle", "White placed too high, and it travelled up during blending", "Place the white only on about the front third of the nail"],
            ],
          },
        },
        { img: { src: img("loi-ombre-bi-vach-trang-ngang-mong"), alt: "Close-up of a faulty ombré nail, the white stopping in a ragged band across the middle of the nail instead of fading", caption: "An example of the mistake: thick white blended in a hurry leaves a band across the nail." } },
      ],
    },
    {
      id: "safety-and-clean-up",
      title: "Working safely with gel, and clearing the table afterwards",
      blocks: [
        {
          ul: [
            "Uncured gel never touches the skin. If some does, clean it off before the hand goes into the lamp.",
            "Curing times and product use always follow the manufacturer's instructions.",
            "Used sponges, cotton and files go in a bin with a lid.",
            "Metal tools go to be cleaned and sterilised, as in [Tools after every customer](lesson:ve-sinh-dung-cu).",
            "Wipe the brushes and close the gel bottles tightly.",
          ],
        },
        { note: "Rules on nail products differ by country, so check the ones that apply where you work. This article is a training aid, not a licence.", kind: "warn", title: "Rules differ from place to place" },
      ],
    },
    {
      id: "client-record",
      title: "Record the client's French so you can repeat it exactly",
      blocks: [
        { p: "Clients who wear French usually come back with one request: the same as last time. In VaraaAi, write the French style, depth and base shade in the [client record](lesson:khach-hang), so there is no guessing next time. If your salon has not yet set up French and ombré as separate services, [add them](lesson:dich-vu) with their own duration so the calendar leaves time to do them properly, then put the prices on your [price list](lesson:bang-gia)." },
      ],
    },
  ],
  howTo: {
    title: "How to do French tips and ombré nails, step by step",
    id: "french-ombre-steps",
    after: "before-you-paint",
    lead: "Steps 1 to 8 make a classic French with a liner brush. Steps 9 to 12 are the ombré, which starts again from the base after the same prep and base coat.",
    supplies: [
      "Cuticle pusher, file, fine buffer, lint-free wipes and nail cleanser",
      "Base gel, top gel and the lamp type your gel brand requires",
      "Sheer or slightly opaque pink, or nude, base gel",
      "White gel for the tips; milky white for ombré",
      "A long, thin liner brush and a small clean flat brush",
      "A small sponge, one per client",
      "Cuticle oil",
    ],
    steps: [
      {
        name: "Prep the nails dry and shape them first",
        text: "Wash and sanitise hands and look closely at the client's nails and skin. Prep dry, without soaking: push back the cuticle, remove the thin film of skin on the nail plate, buff lightly to take off the shine and wipe away the oil. Finish the nail shape now, because the smile line will follow it.",
      },
      {
        name: "Apply base coat and a thin pink base",
        text: "A thin base coat with the free edge capped, cured for the time the brand gives. Then one or two thin coats of sheer pink, each cured separately. If the client's natural free edge is crooked, choose a slightly more opaque base to hide it.",
      },
      {
        name: "Choose the smile line for the whole set",
        text: "Look at all ten nails before you paint. Set the depth by the shortest nail, or the one with the most crooked natural free edge, so the whole set can match. Picture three points on each nail: two corners of equal depth and the shallowest point in the centre.",
        image: { src: img("nhin-ca-ban-tay-truoc-khi-chon-duong-cuoi"), alt: "A client's hand lying flat on a cream cushion, the French nails seen from above with white tips of the same depth", caption: "Have the client lay her hand flat and look from above: the depth must match across the nails." },
      },
      {
        name: "Paint the first half from one corner to the centre",
        text: "Take a little white gel on the liner brush, just enough. Place the brush at one corner of the tip, exactly on the point you chose, and pull it along the curve to the centre of the nail. Keep your hand steady and turn the client's finger gently with the stroke rather than turning your own wrist.",
        image: { src: img("ve-mong-french-tu-mot-goc-vao-giua"), alt: "A fine liner brush held in a black-gloved hand rests at one corner of the nail tip, the first half of the white smile line freshly painted" },
      },
      {
        name: "Mirror it from the other corner and fill in",
        text: "Place the brush at the opposite corner, exactly as deep as the first, and pull it to the centre so the halves meet in one continuous curve. Fill the white out to the edge and sweep lightly over the free edge. Keep the white thin; if it is not white enough, that is for the next layer. On the little finger the white shrinks with the nail, but to the eye its depth must match the others.",
        image: { src: img("ve-nua-con-lai-cua-duong-cuoi-french"), alt: "A fine liner brush completes the second half of the white tip, the two halves meeting in the centre in a balanced smile line over the pink", caption: "Two halves painted from two corners, meeting in the middle like mirror images." },
      },
      {
        name: "Clean the smile line before curing",
        text: "Dip a small flat brush in cleanser, then blot it on a towel until it is almost dry, only slightly damp. Glide it along the inner edge of the white to cut the smile line crisp and even, wiping the brush after every stroke. If the brush is too wet, the cleanser makes the white bleed.",
        image: { src: img("lam-sach-duong-cuoi-bang-co-det"), alt: "A small angled flat brush glides along the inner edge of the white tip on a French nail to sharpen the smile line" },
      },
      {
        name: "Fix any uneven nail, then cure",
        text: "If a nail came out lopsided, fix it now: wipe its white off with cleanser on a brush and paint it again. Never cure a crooked nail intending to fix it later. Paint a few nails and cure, rather than the whole hand at once, and keep the client's hand away from the lamp while you paint. Cure for the full time; if it needs to be whiter, add one more thin layer along the same line, clean up and cure again.",
      },
      {
        name: "Apply top coat and check all ten nails",
        text: "Cover the whole nail with top coat, sweep over the free edge and cure for the full time. Wipe off the sticky layer if your top coat leaves one. Then ask the client to lay her hands flat and look from above: is the depth the same, are both corners balanced? Fix any nail that is off before she leaves.",
      },
      {
        name: "Ombré: apply the base and place the white on the tip",
        text: "Prep and base coat exactly as for French. Apply a very thin layer of pink or nude and cure it. Place the white only on about the front third of the nail, in a thin layer; it does not need to look good yet. Do not bring the white up near the cuticle, because blending carries it further up.",
        image: { src: img("dat-gel-trang-o-dau-mong-lam-ombre"), alt: "Close-up of a pink-based nail with a band of white gel freshly placed on the front third, its inner edge still a straight, unblended line", caption: "Before blending, the white sits only on about the front third of the nail." },
      },
      {
        name: "Blend one nail at a time",
        text: "With a clean, almost dry flat brush, start where the white meets the pink and pull very short, very light strokes towards the cuticle. Or dab lightly over the colour change many times with a small sponge. Either way, work one nail at a time and cure as soon as it is blended, so the colour has no time to run back into a band.",
        image: { src: img("tan-mau-ombre-bang-co-det"), alt: "A small flat brush in a black-gloved hand pulls short strokes from the white tip up towards the cuticle over a pink base" },
      },
      {
        name: "Cure, check and add a thin layer if needed",
        text: "After curing, check whether the colour change is soft and the tip white enough. If not, add another thin layer, placing the white a little lower than the last, blend and cure. Two to three thin layers usually look beautiful. A band or streaks mean a layer was too thick or not blended enough.",
      },
      {
        name: "Top coat, cuticle oil and clean-up",
        text: "Apply top coat, cure for the full time and finish with cuticle oil around the nails. Check all ten nails again: the colour fade must look the same on each. Once the client has gone, put used sponges, cotton and files in a bin with a lid, send metal tools for cleaning and sterilisation, wipe the brushes and close the gel bottles tightly.",
      },
    ],
  },
  faq: [
    {
      q: "Where do you start painting French tips?",
      a: "Start at one corner of the tip and pull the brush along the curve to the centre. Then place the brush at the opposite corner, at the same depth, and pull it to the centre so the halves meet. Working from both corners to the centre makes the two halves of the smile line mirror each other.",
    },
    {
      q: "How do you get a crisp French smile line?",
      a: "Clean up the smile line before curing, while the gel is still soft. Dip a small flat brush in cleanser, blot it on a towel until almost dry, glide it along the inner edge of the white and wipe it after every stroke. A brush that is too wet makes the white bleed.",
    },
    {
      q: "How do you fix a crooked French tip?",
      a: "Fix it before curing: wipe the white off that nail with cleanser on a brush and paint it again. Cured gel has to be buffed off, which wastes time and thins the base, so never cure a crooked nail intending to fix it later.",
    },
    {
      q: "How many layers of white does ombré need?",
      a: "Usually two to three thin layers. Each time, place the white on the tip, blend it upwards and cure; each new layer sits a little lower than the last. Curing times follow the gel brand's instructions.",
    },
    {
      q: "Why does my ombré have a white line across the nail?",
      a: "The white is too thick or was not blended gradually enough. A good ombré comes from thin white and several light rounds of blending. Work one nail at a time and cure straight after blending, so the colour cannot run back into a band.",
    },
    {
      q: "Is it better to blend ombré nails with a brush or a sponge?",
      a: "Both work. A clean, almost dry flat brush pulls short, light strokes towards the cuticle and needs wiping often. A sponge is dabbed lightly over the colour change many times, and each client gets a new one that is thrown away afterwards.",
    },
  ],
  related: ["french-ombre-hieu-dung", "son-gel", "dua-form-mong", "builder-gel"],
};

export default article;
