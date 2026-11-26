import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/builder-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-apply-builder-gel",
  lesson: "builder-gel",
  category: "nail",
  title: "How to apply builder gel on natural nails: 10 steps from slip layer to apex",
  metaTitle: "How to apply builder gel on natural nails: 10 steps",
  metaDescription:
    "How to apply builder gel (BIAB) on natural nails: dry prep, a thin slip layer, placing the bead, floating the gel, forming the apex, curing, filing and aftercare.",
  keyword: "how to apply builder gel",
  keywords: ["BIAB application step by step", "builder gel overlay on natural nails", "how to build an apex with builder gel", "how to float builder gel", "how to file builder gel", "builder gel for beginners", "one or two layers of builder gel"],
  excerpt: "A builder gel overlay on the natural nail, with no extension: ten steps in order, how much gel to pick up, how to turn the finger to form the apex, and the mistakes to avoid.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-dap-builder-gel-cho-khach-tai-salon"),
    alt: "A nail technician in black gloves works on a client's nails at a white stone table in a Parisian-style salon with crystal chandeliers",
  },
  takeaways: [
    "Three things hold for the whole service: **thorough dry prep**, no gel on the skin, and the apex in the right place.",
    "Place the bead in the **centre of the nail**, then float it gently to the cuticle, the side walls and the tip. Start with little gel: adding is easy, taking away is hard.",
    "**Turn the client's finger nail-down for a few seconds** so the gel gathers in the middle to form the apex, then check it from the side and end-on.",
    "Two moderate layers beat one very thick one: easier to shape, and less heat in the lamp.",
    "When finish filing, stay off the natural nail at the cuticle and keep the apex. Book the infill for 3–4 weeks before the client leaves.",
  ],
  intro: [
    "Learning how to apply builder gel on natural nails takes less hand skill than people expect, but it does take the right order. The gel is thick and self-levelling, so most of the work is putting it in the right place and letting it find its shape. The technician guides it and knows when to stop.",
    "This article follows the VaraaAi Academy lesson “Builder gel on natural nails: step-by-step practice” in the Nails course. It covers one builder gel (BIAB) overlay on the client's own nails, with no extension. By the end you will be able to do a full set: consultation, slip layer, bead, apex, finish filing and booking the infill.",
  ],
  sections: [
    {
      id: "three-rules",
      title: "Three rules that run through every builder gel set",
      blocks: [
        { p: "The ten steps below contain a lot of detail, but all of it serves three things. Keep these in mind and, when you forget a detail, you can still work out the right way to do it." },
        {
          ol: [
            "**Thorough dry prep.** Gel only bonds to a nail plate that is clean, dry and no longer shiny. This part is exactly the same as in [how to apply gel polish](lesson:son-gel).",
            "**No gel on the skin.** Gel that runs onto the skin is pushed up as the skin grows, so it lifts, and uncured gel on the skin is a cause of allergy.",
            "**The apex in the right place.** Thin at the cuticle, thin at the tip, highest over the stress area, where the nail leaves the nail bed.",
          ],
        },
        { p: "If you are not sure why the overlay needs a high point, or which clients should not have this service, read the theory article [what is builder gel](lesson:builder-gel-hieu-dung) before you pick up the brush." },
      ],
    },
    {
      id: "one-or-two-layers",
      title: "One layer or two, and what to do when the client feels heat",
      blocks: [
        { p: "If one layer is already thick enough and looks good, you do not need more. If the nail is weak, or the side view shows the apex is not high enough, add a second thin layer in exactly the same way: place the bead, float the gel, turn the finger and cure." },
        { img: { src: img("dan-builder-gel-ra-dau-mong"), alt: "A flat brush guides clear pink builder gel right to the tip of a nail on a finger held by the technician's black-gloved hand", caption: "The second layer is also guided out to the free edge and caps it, just like the first." } },
        { p: "Why not put everything into one layer: gel gives off heat as it cures, and the thicker the layer, the hotter it gets. A thick layer is also harder to shape, because there is more gel to run towards the edges." },
        {
          ul: [
            "If the lamp has a low-heat mode, or the brand recommends a short flash cure of a few seconds, do that first and then cure for the full time.",
            "If the client feels burning, let her take the hand out for a few seconds, then put it back. The total cure time still has to be complete.",
            "Put the hand well inside the lamp so the whole nail is under the light. A nail sitting partly outside will have spots that are not cured.",
          ],
        },
        { note: "Cure times, lamp mode and how the slip layer is handled (cured or not) always follow the instructions of the product you are using. Under-cured gel lifts easily and is more likely to cause an allergy.", kind: "warn", title: "Follow the brand's instructions" },
      ],
    },
    {
      id: "common-mistakes",
      title: "Common builder gel mistakes and how to fix them",
      blocks: [
        { p: "Each of these mistakes can be fixed at the table if you spot it while the gel is still wet. Once it is cured, the only fix is the file." },
        {
          table: {
            head: ["Mistake", "Why it happens", "What to do instead"],
            rows: [
              ["Gel flooding the cuticle", "Bead placed too close to the cuticle, or pressing the brush down while floating", "Place the bead mid-nail, glide with almost no pressure, stop a hair's width from the skin"],
              ["Gel running into the side walls", "Too much gel, or correcting for too long before curing", "Pick up little gel, correct quickly while wet, then cure straight away"],
              ["A flat overlay with no apex", "Skipping the finger turn, or filing the high point away", "Turn the finger nail-down for a few seconds; when filing, only smooth the surface"],
              ["Client in pain, thin nail at the cuticle", "Finish filing went into the natural nail", "Keep the file flat on the gel, never into the natural nail at the cuticle"],
              ["Gel dust in the air", "Blowing the dust away instead of extracting it; dust from gel that is not fully cured can cause allergy", "Run dust extraction, brush the dust off, then wipe the nail"],
            ],
          },
        },
        { img: { src: img("phui-bui-dua-bang-choi-mem"), alt: "A nail technician brushes white filing dust off a matte, freshly filed builder gel nail with a soft brush, her black gloves dusted white", caption: "Filing dust is brushed off and extracted, never blown." } },
      ],
    },
    {
      id: "aftercare-and-infill",
      title: "Aftercare advice and booking the builder gel infill",
      blocks: [
        { img: { src: img("mong-builder-gel-hoan-thien-nhin-tu-tren"), alt: "Close-up from above of a nail covered in glossy milky pink builder gel, the line at the cuticle clean and clear of the skin", caption: "The finished nail: an even, glossy surface and a fine gap between gel and skin." } },
        { p: "While you massage in the oil, tell the client four things:" },
        {
          ul: [
            "If the gel lifts, do not peel or pick at it. Come back to the salon.",
            "Wear gloves for washing up and cleaning.",
            "Do not use your nails as tools to prise or open things.",
            "Come back for an infill in about 3–4 weeks, because as the nail grows, the frame moves away from the place it needs to support.",
          ],
        },
        { note: "Book the infill at the desk, before the client leaves. A client who already has an appointment rarely lets her nails go overdue and picks at them at home.", kind: "tip", title: "From the trade" },
      ],
    },
    {
      id: "clean-up",
      title: "Clearing the table after a builder gel set",
      blocks: [
        { p: "Once the client has gone, the workstation goes back to clean before the next person sits down." },
        {
          ul: [
            "Used files, buffers, wipes and wooden sticks: into a bin with a lid.",
            "Metal tools: cleaned and sterilised, following the routine in [tools after every client](lesson:ve-sinh-dung-cu).",
            "Gel bottles: closed tightly and kept out of sunlight.",
            "The table: wiped clean.",
          ],
        },
      ],
    },
    {
      id: "booking-builder-gel",
      title: "Put builder gel on your salon's online booking",
      blocks: [
        { p: "A new builder gel set and an infill take different amounts of time, so keep them apart. In VaraaAi you [create the services](lesson:dich-vu) “Builder gel” and “Builder gel infill” with your salon's real durations, then book the infill in the [appointment calendar](lesson:lich-hen) right at the desk. Notes about each client's nails, for example that she feels heat in the lamp, belong in the [client record](lesson:khach-hang), so you do not have to ask again next time." },
      ],
    },
  ],
  howTo: {
    title: "How to apply builder gel on natural nails, step by step",
    id: "builder-gel-steps",
    after: "three-rules",
    lead: "The ten steps follow the order of the lesson video. Steps 4 to 6 are what makes builder gel different, so slow down there.",
    supplies: [
      "A sterilised cuticle pusher",
      "A 180 grit file and a fine buffer",
      "Lint-free wipes and nail cleanser",
      "Builder gel and a gel brush; dehydrator or primer if the brand has one",
      "The type of lamp the gel brand requires",
      "Dust extraction, a dust brush and a mask",
      "Colour gel if the client wants it, top coat, cuticle oil, gloves",
    ],
    steps: [
      {
        name: "Consult and check the nails",
        text: "Wash and disinfect your hands and the client's, then look closely at the nails and the skin around them. A nail lifting from the bed, discolouration, swollen red skin, pus or an open wound mean no service and a suggestion to see a doctor. Ask whether gel has ever caused itching, redness or blistering, whether she wants a natural look or colour, and mention up front that she should come back for an infill in about 3–4 weeks.",
        image: { src: img("kiem-tra-mong-va-da-truoc-khi-dap-builder-gel"), alt: "A nail technician in black gloves lifts a client's hand in both of hers and looks closely at the natural nails and the skin around them" },
      },
      {
        name: "Prep the nails dry",
        text: "No soaking. Push the cuticle back gently and remove only the thin dead tissue still stuck to the nail plate, shape the nails, then glide a fine buffer over them to take off the shine without thinning the nail. Brush off the dust, wipe with a lint-free pad and cleanser, and from now on keep your fingers off the nail plate. If the brand has a dehydrator or primer, use it exactly as instructed.",
        image: { src: img("mong-that-da-cha-nham-san-sang-dap-gel"), alt: "Close-up of a short natural nail buffed to an even, clean matte finish, the finger held by a black-gloved hand", caption: "Ready for gel: an evenly matte nail plate with no dust and no oil." },
      },
      {
        name: "Apply a very thin slip layer",
        text: "Take a little gel and press and rub it lightly into the nail plate, as if massaging it in, then wipe off the excess. The layer is so thin it is almost invisible, but it helps the next layer bond firmly and glide easily. Cap the free edge and leave a tiny gap from the skin. Cure it, or build on it while it is still wet, exactly as your product says.",
      },
      {
        name: "Place a bead in the centre of the nail",
        text: "Pick up one round bead of gel, just enough, and set it in the middle of the nail. Do not place it right at the cuticle, or the gel will run onto the skin before you can guide it. The size of the bead depends on the nail; at first, too little is better than too much.",
        image: { src: img("dat-hat-builder-gel-o-giua-mong"), alt: "The tip of a brush sets a round, clear bead of builder gel in the centre of a buffed nail, well away from the skin at the cuticle" },
      },
      {
        name: "Float the gel to the cuticle, side walls and tip",
        text: "With the tip of the brush, guide the gel towards the cuticle. The brush barely presses; it glides over the surface of the gel and lets it flow, stopping a hair's width from the skin. Then take the gel out to both side walls and to the tip, and cap the free edge. The overlay is now thin at the cuticle, thin at the sides and fuller in the middle.",
        image: { src: img("dan-builder-gel-ve-phia-chan-mong"), alt: "A flat brush glides lightly over clear pink builder gel, easing it towards the cuticle and stopping short of the skin", caption: "The brush glides over the gel without pressing on the nail. There is always a fine gap between gel and skin." },
      },
      {
        name: "Turn the finger to form the apex",
        text: "Turn the client's finger nail-down and hold it still for a few seconds. The gel is thick and self-levelling, so gravity draws it into the middle as a soft curve. Turn the finger back and look from the side: the highest point sits over the stress area, slightly behind it. Look end-on: the C-curve is even on both sides. Correct anything while the gel is wet, but do not wait too long or it will run into the edges.",
        image: { src: img("up-ngon-tay-tao-diem-apex"), alt: "A nail technician in black gloves holds the client's hand turned over on a cushion, the freshly gelled nails facing down towards the table" },
      },
      {
        name: "Cure for the full time",
        text: "Put the hand well inside the lamp so the whole nail is under the light, and cure for the time the brand recommends. If the client feels heat, let her take the hand out for a few seconds, then put it back. Add a second thin layer the same way if needed. After curing, wipe off any sticky layer the product leaves, as the brand instructs.",
      },
      {
        name: "Finish filing",
        text: "Switch on dust extraction and wear a mask if you have one. Lay the 180 file flat on the nail and file lightly until the surface is smooth and even. Stay off the natural nail at the cuticle and do not file away the apex you have just built. Straighten the side walls, even up the shape at the tip, buff, brush off the dust and wipe the nails. Then check the whole hand from above, from the side and end-on: all the nails should match.",
        image: { src: img("dua-gon-canh-ben-lop-builder-gel"), alt: "A grey file held along the side wall of a matte, filed builder gel nail, the technician's black gloves dusted with filing dust" },
      },
      {
        name: "Add colour if wanted, then top coat",
        text: "For a natural look, one glossy top coat is enough. If the client wants colour, apply colour gel on top in thin, even coats, just as for a gel polish manicure. Cap the free edge with the top coat and cure for the full time. If the brand's top coat leaves a sticky layer, wipe it off.",
      },
      {
        name: "Finish with oil and aftercare advice",
        text: "Put a drop of oil on the skin around each nail and massage it in gently. This is the moment to explain how to look after the nails and to book the infill in about 3–4 weeks. Once the client has left, throw away the single-use items, send the metal tools for sterilising and close the gel bottles tightly.",
      },
    ],
  },
  faq: [
    {
      q: "Do you need an extension to apply builder gel on natural nails?",
      a: "No. The routine in this lesson is a single builder gel overlay on the client's own nails, with no extension. The gel forms a frame that keeps the nail strong and natural-looking, and the client keeps the length of her own nails.",
    },
    {
      q: "Where do you place the first bead of builder gel?",
      a: "In the centre of the nail, not at the cuticle. From the centre you float the gel gently to the cuticle, the side walls and the tip. That way the edges stay thin and the gel stays off the skin.",
    },
    {
      q: "Why do you turn the finger upside down after applying builder gel?",
      a: "Builder gel is thick and self-levelling. With the finger turned nail-down for a few seconds, gravity draws the gel into the middle as a soft curve, which becomes the apex. Then turn the finger back, check it from the side and end-on, and cure.",
    },
    {
      q: "Does the builder gel slip layer need to be cured?",
      a: "It depends on the product. Some brands require the slip layer to be cured for a set time, others let you build the next layer on it while it is still wet. Follow the instructions of the gel brand you use.",
    },
    {
      q: "What file do you use on builder gel, and what should you avoid?",
      a: "A 180 grit file, laid flat on the surface and used lightly until the gel is smooth, followed by a fine buffer. Avoid two things: filing into the natural nail at the cuticle, which thins it and hurts, and filing away the apex.",
    },
    {
      q: "Should builder gel be one thick layer or two thin ones?",
      a: "If one layer is thick enough and looks good, you do not need more. If the nail is weak or the apex is not high enough, add a second thin layer rather than building one very thick one. Two moderate layers are easier to shape and give off less heat in the lamp.",
    },
  ],
  related: ["builder-gel-hieu-dung", "son-gel", "fill-mong", "thao-gel"],
};

export default article;
