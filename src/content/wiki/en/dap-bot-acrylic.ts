import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dap-bot-acrylic/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-acrylic-nails-step-by-step",
  lesson: "dap-bot-acrylic",
  category: "nail",
  title: "How to do acrylic nails on forms: 12 steps with the three-bead method",
  metaTitle: "How to do acrylic nails: 12 steps, the three-bead method",
  metaDescription:
    "How to do acrylic nails on forms step by step: primer, fitting the form, picking up a bead, the three-bead method, removing the form, filing and brush care.",
  keyword: "how to do acrylic nails",
  keywords: ["acrylic nails step by step", "three bead acrylic method", "how to pick up an acrylic bead", "acrylic extensions on forms", "how to clean an acrylic brush", "acrylic nails for beginners", "how long does acrylic take to set"],
  excerpt: "The routine for acrylic extensions on forms: twelve steps in order, how to pick up a bead, where the three beads go, when to take the form off, and how to keep your brush in shape.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-dap-bot-noi-mong-tai-ban-co-may-hut"),
    alt: "A nail technician in black gloves works on a client's nails at a white stone table with a round extraction vent, a pot of pink powder and a liquid dish beside her",
  },
  takeaways: [
    "Three things hold for the whole appointment: **a bead with the right moisture**, no acrylic on the skin, and the apex in the right place.",
    "Switch on the table extraction **before you open the liquid**. Pour a little liquid into a small covered dish, away from flames.",
    "Bead one goes at the tip on the form, bead two on the stress area to build the apex, bead three small and thin near the cuticle.",
    "Let the acrylic set before removing the form: tap the brush handle on it and listen for a **dry click**.",
    "Clean the brush in the brand's own liquid, never acetone. Book the infill for 2–3 weeks later.",
  ],
  intro: [
    "Learning how to do acrylic nails is different from any gel technique in one way: the product starts to set the moment the brush touches the powder, and you only have a few minutes for each bead. That is why acrylic technicians do not keep correcting. They place each bead right the first time, in a fixed order of three.",
    "This article follows the VaraaAi Academy lesson “Acrylic extensions: step-by-step practice” in the Nails course, covering acrylic extensions built on forms. By the end you will know how to set up the table, pick up a good bead, build with three beads, remove the form at the right moment, finish filing and look after your brush afterwards.",
  ],
  sections: [
    {
      id: "three-rules-and-table",
      title: "Three rules, and what goes on the table",
      blocks: [
        {
          ol: [
            "**A bead with the right moisture.** Moist, glossy, round, not dripping and not dry and crumbly. The amount of liquid in the brush decides this.",
            "**No acrylic on the skin.** The same goes for primer. If acrylic touches the skin, lift it off at once while it is still soft.",
            "**The apex in the right place.** The second bead goes on the stress area, where the nail leaves the nail bed.",
          ],
        },
        { img: { src: img("dung-cu-dap-bot-acrylic-can-chuan-bi"), alt: "Acrylic tools laid out on a cream towel: a covered glass dish, a bottle of liquid, a pot of pink powder, a brush, primer, forms, files, a buffer, a dust brush and gloves", caption: "The acrylic table: a small covered dish for the liquid, powder, brush, primer, forms, files, buffer and dust brush." } },
        { note: "Switch on the local extraction at the table before opening the liquid, and keep the liquid away from flames. The ratio, the primer's drying time and the acrylic's setting time always follow the brand's instructions. Rules on extraction and chemicals differ from country to country and city to city.", kind: "warn", title: "Before you open the liquid" },
        { p: "Why a bead that is too wet leads to allergy, why one that is too dry makes acrylic lift, and how to choose a liquid are covered in the theory article [what are acrylic nails](lesson:dap-bot-hieu-dung)." },
      ],
    },
    {
      id: "three-bead-method",
      title: "The three-bead acrylic method: each bead has one job",
      blocks: [
        { p: "Divide the nail into three zones and give each zone its own bead. That way you never have to drag acrylic a long way, which is very hard once it starts to set." },
        {
          table: {
            head: ["Bead", "Where it goes", "Its job"],
            rows: [
              ["Bead one", "On the form, just in front of the natural free edge", "Sets the length, the tip shape and straight side walls"],
              ["Bead two", "Mid-nail, on the stress area", "Builds the apex and blends into the tip"],
              ["Bead three", "Near the cuticle, a smaller bead", "Pressed very thin towards the skin, leaving a hair-thin gap"],
            ],
          },
        },
        {
          ul: [
            "Press and stroke with the **belly of the brush**, held almost flat.",
            "Between beads, wipe the brush on a paper towel and dip it in the liquid again.",
            "After bead three, stroke lightly over the whole surface from the cuticle to the tip so it is seamless and smooth.",
          ],
        },
        { note: "While you are learning, small beads are easier to control than big ones. Practise picking up beads on training nails until the beads come out looking the same every time.", kind: "tip", title: "For beginners" },
      ],
    },
    {
      id: "common-mistakes",
      title: "Common acrylic mistakes and how to fix them",
      blocks: [
        {
          table: {
            head: ["What you see", "Cause", "What to do"],
            rows: [
              ["Acrylic running under the free edge", "A gap between the form and the free edge", "Fix the form so it is snug before the first bead"],
              ["Bead drips and runs into the side walls", "Too much liquid in the brush", "Wipe the brush on the rim of the dish more thoroughly before touching the powder"],
              ["Bead dry and crumbly, grainy surface", "Too little liquid in the brush", "Let the brush soak evenly and do not wipe it out too hard"],
              ["The tip warps after the form comes off", "The form was removed while the acrylic was still soft", "Wait the brand's time, tap and listen for a dry click, then remove"],
              ["Client feels burning when filing", "Pressing hard makes the nail heat up", "File with a light hand, and never into the natural nail at the cuticle"],
            ],
          },
        },
      ],
    },
    {
      id: "aftercare-advice",
      title: "What to tell the client after acrylic nails",
      blocks: [
        { img: { src: img("bo-mong-dap-bot-acrylic-hoan-thien"), alt: "A client's hands resting one over the other on a cream cushion, ten natural pink acrylic nails, glossy and even" } },
        {
          ul: [
            "Do not pick at the nails or use them as tools.",
            "Wear gloves for washing up and cleaning.",
            "Apply cuticle oil around the nails every day.",
            "If something lifts, come back to the salon. Do not glue it or peel it off yourself.",
            "Book the infill for about 2–3 weeks later.",
          ],
        },
      ],
    },
    {
      id: "acrylic-brush-care",
      title: "How to clean an acrylic brush and clear the table",
      blocks: [
        { p: "An acrylic brush wears out very quickly if it is cleaned the wrong way. Clean it in the brand's own liquid. Do not use acetone, which dries out and damages the bristles. Afterwards, wipe the brush, shape it back to a point and store it lying flat, or as the brand recommends." },
        { img: { src: img("co-dap-bot-da-rua-sach-dat-nam-ngang"), alt: "A cleaned acrylic brush with cream bristles lying flat on a paper towel, beside a covered glass dish and a pot of powder" } },
        {
          ul: [
            "Close the dish and the liquid bottle tightly.",
            "Leftover liquid never goes down the sink. Dispose of it as the product's safety data sheet says.",
            "Single-use items go in a bin with a lid.",
            "Metal tools go to be sterilised, following [tools after every client](lesson:ve-sinh-dung-cu).",
          ],
        },
      ],
    },
    {
      id: "acrylic-bookings",
      title: "Put acrylic nails on your salon's calendar and price list",
      blocks: [
        { p: "Acrylic infills come round quickly, so the next appointment should be booked in advance. In VaraaAi you [add services](lesson:dich-vu) for a new acrylic set and an acrylic infill with their real durations, book the infill 2–3 weeks ahead in the [appointment calendar](lesson:lich-hen) as soon as the client pays, and show both prices on your salon's [price list](lesson:bang-gia)." },
      ],
    },
  ],
  howTo: {
    title: "How to do acrylic nails on forms, step by step",
    id: "acrylic-nail-steps",
    after: "three-rules-and-table",
    lead: "The twelve steps follow the order of the lesson video. From step 6 onwards the acrylic sets minute by minute, so everything has to be ready before then.",
    supplies: [
      "Acrylic liquid and powder from the same brand, a small dappen dish with a lid",
      "An acrylic brush, paper towels, wooden sticks",
      "Dehydrator and primer as the acrylic brand specifies",
      "Nail forms (or tips)",
      "A sterilised cuticle pusher, files, a fine buffer, a dust brush",
      "Local extraction at the table, a mask, gloves",
      "Glossy top coat or colour, cuticle oil",
    ],
    steps: [
      {
        name: "Consult, check and switch on the extraction",
        text: "Wash and disinfect your hands and the client's, then look closely at the nails and the skin around them. A nail separating from the bed, discolouration, swollen red skin, pus or an open wound mean no service and a suggestion to see a doctor. Ask whether a nail service has ever caused itching, redness or blistering, how long and what shape she wants, and mention up front the infill every 2–3 weeks. Switch on the table extraction before you start.",
      },
      {
        name: "Prep the nails dry",
        text: "Work as for [gel polish](lesson:son-gel): no soaking, push the cuticle back gently and remove the thin layer of skin still stuck to the nail plate. File the free edge short and neat, buff lightly to take off the shine, brush off the dust and cleanse the nails. From now on, keep your fingers off the nail plate.",
      },
      {
        name: "Apply dehydrator and primer",
        text: "Use the right type, applied the way the brand instructs. Just one very thin layer, on the nail plate only, well away from the skin and the side walls, because primer can burn the skin. Let it dry for the time the brand gives.",
      },
      {
        name: "Fit the form",
        text: "The form sits right under the free edge, snug, with no gap. From above it lines up with the finger; from the side it continues the line of the nail, neither dipping nor lifting. With a gap, acrylic runs underneath and the nail is both ugly and weak. If you use tips, glue on a tip that matches the width of the nail exactly, cut it short and file the seam thin before applying acrylic. Trimming and checking forms is covered in [how to do gel extensions with forms](lesson:noi-mong-form).",
      },
      {
        name: "Pour the liquid and wet the brush",
        text: "Pour a little liquid into a small covered dish, just enough for one client, and open the powder. Dip the brush into the liquid so it soaks in evenly, then wipe it lightly on the rim of the dish to remove the excess. How much liquid stays in the brush is exactly what decides whether the bead is wet or dry.",
        image: { src: img("gat-co-vao-thanh-chen-liquid"), alt: "A black-gloved hand wipes the tip of an acrylic brush on the rim of a small glass dish of clear liquid, the dish's lid lying beside it" },
      },
      {
        name: "Pick up a bead",
        text: "Touch the tip of the brush to the surface of the powder and hold it still for a moment, so the liquid soaks into the powder and forms a round bead, then lift the brush. Look at the bead before placing it: moist, glossy, round, not dripping and not crumbly. If it is not right, wipe the brush and pick up another rather than putting it on the client's nail.",
      },
      {
        name: "Bead one: the tip",
        text: "Place the first bead on the form, just in front of the edge of the natural nail. Wait a moment for it to spread, then press lightly with the belly of the brush and stroke it into the extended tip. Keep the side walls straight, continuing the sides of the natural nail. The length and tip shape are created with this bead.",
        image: { src: img("hat-bot-thu-nhat-tren-form-o-dau-mong"), alt: "A round bead of pink acrylic just placed on a metal form right in front of the edge of the natural nail, the brush above it", caption: "Bead one sits on the form, right against the natural free edge." },
      },
      {
        name: "Bead two: the stress area",
        text: "Place the second bead in the middle of the nail, on the stress area, where the nail leaves the nail bed. This is the bead that builds the apex. Press lightly, stroke it so it joins smoothly with the tip, and spread it evenly to both sides.",
        image: { src: img("hat-bot-thu-hai-o-vung-chiu-luc"), alt: "A pink acrylic tip already pressed flat on the form, a second bead sitting mid-nail and the brush touching the tip section", caption: "Bead two goes mid-nail to build the apex." },
      },
      {
        name: "Bead three: near the cuticle",
        text: "The third bead is smaller and goes near the cuticle. Stroke it very thin, thinner and thinner towards the skin, and leave a gap as thin as a hair. Acrylic must never touch the skin; if it does, lift it off at once with the tip of the brush or a wooden stick while it is still soft. Finally, stroke lightly over the whole surface from the cuticle to the tip.",
        image: { src: img("hat-bot-thu-ba-mong-gan-chan-mong"), alt: "The tip of a small brush stroking a very thin layer of pink acrylic near the cuticle, a fine gap still left between acrylic and skin" },
      },
      {
        name: "Let it set, remove the form and check",
        text: "Setting time depends on the brand, usually just a few minutes. Tap the brush handle lightly on the nail: a dry, clear click means the acrylic has set. Remove the form gently, pulling it downwards rather than bending it back up. Before filing, look from the side (thin at the cuticle, highest over the stress area, thinner towards the tip), end-on (an even C-curve) and from above (straight side walls, a balanced tip).",
        image: { src: img("mong-bot-da-cung-sau-khi-thao-form"), alt: "A natural pink acrylic extension with a squoval tip, the surface still matte and unfiled, the side walls straight and parallel", caption: "After the form comes off: a matte surface, straight side walls and no acrylic on the skin." },
      },
      {
        name: "Finish filing",
        text: "With the extraction running and a mask on, file with a light hand. Shape the tip, straighten the side walls, then smooth the surface evenly while keeping the apex. At the cuticle, file it really thin so it blends into the natural nail, but do not file into the natural nail. Glide a fine buffer over it, brush off the dust instead of blowing it, and cleanse.",
        image: { src: img("dua-canh-ben-mong-bot-cho-thang"), alt: "A grey file held along the side wall of a square pink acrylic nail, the technician's black gloves dusted with filing dust" },
      },
      {
        name: "Top coat or colour, then oil",
        text: "For a natural look, one glossy top coat is enough. For colour, paint it on top, thin and even, just as for gel polish. Then put a drop of oil around each nail, massage it in gently, give the aftercare advice and book the infill.",
      },
    ],
  },
  faq: [
    {
      q: "Where do the three beads go in acrylic nails?",
      a: "Bead one goes on the form just in front of the natural free edge, to create the length and tip shape. Bead two goes in the middle of the nail on the stress area, to build the apex. Bead three is smaller, goes near the cuticle and is pressed very thin, without touching the skin.",
    },
    {
      q: "How do you pick up an acrylic bead correctly?",
      a: "Dip the brush in the liquid so it soaks evenly, wipe it lightly on the rim of the dish, then touch the tip to the powder and hold it still for a moment until a round bead forms. A good bead is moist, glossy and round, neither dripping nor crumbly. Beginners should pick up small beads, which are easier to control.",
    },
    {
      q: "How do you know acrylic has set enough to remove the form?",
      a: "Wait the time the brand gives, usually a few minutes, then tap the brush handle lightly on the nail. A dry, clear click means the acrylic has set. Removing the form while the acrylic is still soft makes the tip warp.",
    },
    {
      q: "What do you clean an acrylic brush with?",
      a: "With the brand's own liquid. Do not use acetone, because it dries out and damages the bristles. Afterwards, wipe the brush, shape it back to a point and store it lying flat, or as the brand recommends.",
    },
    {
      q: "Can acrylic be applied on tips instead of forms?",
      a: "The lesson works on forms: the form sits snugly under the free edge and the acrylic is built on top. With tips, glue on a tip that matches the width of the nail exactly, cut it short and file the seam thin before applying acrylic. The steps after that are the same.",
    },
    {
      q: "What should you do if acrylic gets on the skin?",
      a: "Lift it off straight away with the tip of the brush or a wooden stick while it is still soft. Liquid and unset acrylic must not stay on the skin, because that is a cause of allergy and also the spot where the acrylic will lift first.",
    },
  ],
  related: ["dap-bot-hieu-dung", "noi-mong-form", "fill-mong", "builder-gel"],
};

export default article;
