import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/fill-mong/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-a-nail-infill",
  lesson: "fill-mong",
  category: "nail",
  title: "How to do a nail infill on gel and acrylic: 10 steps from filing the lifting to rebuilding the apex",
  metaTitle: "How to do a nail infill on gel and acrylic: 10 steps",
  metaDescription:
    "How to do a builder gel or acrylic infill step by step: finding lifting, thinning the old product, blending the line, bonder on the regrowth and a new apex.",
  keyword: "how to do a nail infill",
  keywords: ["how to infill gel nails", "how to infill acrylic nails", "builder gel infill step by step", "nail infill steps", "how to file lifting before an infill", "acrylic infill", "nail infill for beginners"],
  excerpt: "How to infill a builder gel or acrylic set that has been on for a few weeks: ten steps in order, where gel and acrylic differ, how to find hidden lifting and the mistakes to avoid.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-dam-mong-cho-khach-tai-salon"),
    alt: "A nail technician with dark hair in a low bun and black gloves works on a blonde client's nails at a white stone table under a crystal chandelier",
  },
  takeaways: [
    "Three things hold for the whole infill: **never infill over lifting**, never file the natural nail or the skin, and rebuild the apex in the right place.",
    "Check each nail under good light, tilting it back and forth. Small lifting is often just **a faint line at the edge**.",
    "Thin the old product before building, especially the old apex that has moved forward.",
    "The bonding layer (base, bonder or primer) goes **only on the regrowth**, with a fine gap from the skin.",
    "Book the next infill before the client leaves: about 3–4 weeks for gel, about 2–3 weeks for acrylic.",
  ],
  intro: [
    "Knowing how to do a nail infill properly starts with the file, not with the gel or the acrylic. The set the client brings in has grown out for a few weeks: there is new nail at the cuticle, the apex has moved forward, and somewhere there may be a lifted edge that is very hard to see. Those three things are dealt with first, and only then does new product go on.",
    "This article follows the VaraaAi Academy lesson “Builder gel and acrylic infills: step-by-step practice” in the Nails course. The method is the same for builder gel and acrylic, and the places where they differ are pointed out. By the end you will be able to do a full infill, from the first check to booking the next appointment.",
  ],
  sections: [
    {
      id: "three-rules",
      title: "Three rules, and the sets that should not be infilled",
      blocks: [
        {
          ol: [
            "**Never infill over lifting.** Anything lifted is filed away first.",
            "**Never file the natural nail or the skin.** The regrowth at the cuticle is still thin and soft.",
            "**Rebuild the apex in the right place.** The highest point goes back over the stress area, as on the day the set was first done.",
          ],
        },
        { p: "Not every set that comes in for its appointment can be infilled. Large lifted patches, air pockets, discolouration, or a nail that hurts or is red and swollen mean no infill: remove everything, or suggest the client sees a doctor." },
        { img: { src: img("mong-ho-mang-lon-co-tui-khi-khong-dam"), alt: "Close-up of a grown-out gel nail with a large silvery-white air pocket under the gel covering almost half the nail", caption: "A large lifted patch with an air pocket underneath: this set needs to come off completely and be redone, not infilled." } },
        { p: "The reasons behind each rule, and how to tell which sets can be infilled and which have to come off, are in the theory article [what is a nail infill](lesson:fill-mong-hieu-dung). When everything has to come off, follow [how to remove gel properly](lesson:thao-gel)." },
      ],
    },
    {
      id: "gel-vs-acrylic-infill",
      title: "How a builder gel infill differs from an acrylic infill",
      blocks: [
        { p: "The first six steps are exactly the same. The two systems only part ways at the bonding layer and the build." },
        {
          table: {
            head: ["Stage", "Builder gel", "Acrylic"],
            rows: [
              ["Bonding layer on the regrowth", "The brand's base or bonder; cured or not as instructed", "Primer, dabbed on very thinly, on the natural nail only"],
              ["Building", "A very thin layer over the whole nail, then a bead in the centre, floated to the cuticle, the sides and the tip", "A small, slightly wetter bead near the cuticle; then a bead on the stress area"],
              ["Forming the apex", "Turn the finger over for a few seconds so the gel gathers", "Press and stroke the second bead to blend into the old product"],
              ["Hardening", "Cure for the full time the brand recommends", "Wait the brand's time; tap the brush handle and listen for a dry click"],
              ["Next infill", "About 3–4 weeks", "About 2–3 weeks"],
            ],
          },
        },
        { p: "The bead technique for each system is covered in its own practice article: [how to apply builder gel](lesson:builder-gel) and [how to do acrylic nails](lesson:dap-bot-acrylic). At an infill you use exactly the same movements over a smaller area." },
      ],
    },
    {
      id: "finding-lifting",
      title: "How to find hidden lifting, and a word on e-files",
      blocks: [
        { p: "Small lifting is easy to miss, because it is often just a faint line at the edge of the product. Look at the cuticle and along both side walls, in good light, tilting the finger back and forth so the light glides across the nail." },
        { note: "After filing away the lifting, tilt the nail under the light once more. A faint white line at the edge means it is still lifted: keep filing, do not cover it.", kind: "tip", title: "Check again under the light" },
        { p: "If you keep filing and it is still lifted, or a whole area has come loose, stop. That set needs to be removed completely and redone. Do not pick at it or pull the lifted part off, because it takes layers of the natural nail with it." },
        { note: "Use an e-file only once you have been properly trained: a moderate speed, the bit always on the product, never near the cuticle or the skin. Until you are trained, use a hand file.", kind: "warn", title: "E-files" },
      ],
    },
    {
      id: "common-mistakes",
      title: "Common infill mistakes and how to avoid them",
      blocks: [
        {
          table: {
            head: ["Mistake", "Result", "What to do instead"],
            rows: [
              ["Building over lifting", "Moisture and dirt are sealed in, and the new layer lifts very quickly", "File the lifting away until the edge is bonded and flush with the nail"],
              ["Not thinning the old product", "No room to rebuild the apex; the set gets thicker and heavier with every infill", "Reduce the bulk, especially the old apex that moved forward"],
              ["Leaving the step between old product and regrowth", "A ridge shows through the new layer", "File the step lightly until it is thin and flat, with no ridge you can feel"],
              ["Bonder on the skin or over the whole nail", "Product touches the skin, lifts more easily and can cause allergy", "Only on the regrowth; on the old product only if the brand says so"],
              ["A big, thick acrylic bead at the cuticle", "A thick edge that pops up easily", "A small bead, pressed very thin towards the skin without touching it"],
            ],
          },
        },
      ],
    },
    {
      id: "after-the-infill",
      title: "After the infill: aftercare, clean-up and booking",
      blocks: [
        { p: "Before the client leaves, book the next infill: about 3–4 weeks for gel, about 2–3 weeks for acrylic. Tell her that if something lifts, she should not pick at it or peel it off, but come back to the salon early." },
        {
          ul: [
            "Used files, buffers and wipes go into a bin with a lid.",
            "Metal tools are cleaned and sterilised.",
            "Gel bottles and the acrylic dish are closed tightly.",
          ],
        },
        { p: "In VaraaAi you [create separate services](lesson:dich-vu), “Gel infill” and “Acrylic infill”, with your salon's real durations, so the calendar does not overlap when clients book infills themselves. The next infill is booked at the desk in the [appointment calendar](lesson:lich-hen). Nails that tend to lift or break are noted in the [client record](lesson:khach-hang), so next time you know how to adjust." },
      ],
    },
  ],
  howTo: {
    title: "How to do a nail infill on gel and acrylic, step by step",
    id: "nail-infill-steps",
    after: "three-rules",
    lead: "The ten steps follow the order of the lesson video. The first six use only files, buffers and wipes, and they decide whether the set will last.",
    supplies: [
      "A sterilised cuticle pusher",
      "Files, a fine buffer, a dust brush",
      "Lint-free wipes and nail cleanser",
      "The right bonding layer: the gel brand's base or bonder, or the acrylic brand's primer",
      "Builder gel and a lamp, or acrylic liquid, powder and an acrylic brush",
      "Extraction at the table, a mask, gloves",
      "Colour gel if wanted, top coat, cuticle oil",
    ],
    steps: [
      {
        name: "Consult and check",
        text: "Wash and disinfect your hands and the client's. Ask whether any nail has broken, lifted or hurt in the past few weeks, then look closely at each nail in good light, tilting the finger back and forth. Large lifted patches, air pockets, discolouration, pain or red, swollen skin mean no infill. Note any nails that tend to lift or break so you can adjust next time.",
        image: { src: img("kiem-tra-mong-da-moc-duoi-anh-den"), alt: "A nail technician in black gloves lifts a client's hand under a brass desk lamp, tilting the grown-out gel nails to inspect them", caption: "Tilt each nail under the lamp: small lifting only shows as a faint line at the edge." },
      },
      {
        name: "Prep the regrowth",
        text: "Treat the regrowth like a fresh nail and prep it as for [gel polish](lesson:son-gel): work dry with no soaking, push back gently and remove the thin layer of skin stuck to the new nail. Glide a buffer very lightly over the regrowth only, just to take off the shine. Do not thin the nail.",
        image: { src: img("day-da-tren-phan-mong-moi-moc"), alt: "A steel cuticle pusher held at an angle on the strip of new natural nail at the cuticle, with the old gel layer in front of it" },
      },
      {
        name: "File away the lifting",
        text: "Find the edge of the product at the cuticle and along both side walls. Wherever it has lifted, file gently until the lifting is gone and the remaining edge is firmly bonded and flush with the nail. Then look again carefully under the lamp. Do not pick at it or pull the lifted part off.",
      },
      {
        name: "Thin the old product",
        text: "Lay the file flat on the nail and reduce the bulk, especially the old apex that has moved forward. If the nails have grown too long, cut and file them shorter, keeping the shape the client chose. The aim is an old layer that is evenly thin and neat, leaving room for the new layer to rebuild the apex. Do not file through the old layer down to the natural nail.",
      },
      {
        name: "Blend the line",
        text: "Where the old product meets the regrowth there is usually a small step. File it gently until it thins out, flat and flush with the new nail, so you can no longer feel a ridge. File flat, with a light hand, and keep the file away from the skin at the cuticle.",
        image: { src: img("duong-noi-lop-cu-va-mong-moi-da-dua-lien"), alt: "Close-up of a nail whose old gel has been filed thin and matte, its edge blending smoothly into the strip of new natural nail with no step", caption: "After step 5: the old product is thin and evenly matte, with no step where it meets the regrowth." },
      },
      {
        name: "Cleanse",
        text: "With the extraction still running, brush off all the dust instead of blowing it, then wipe the whole nail with a lint-free wipe and nail cleanser. From now on, keep your fingers off the nail plate.",
        image: { src: img("lau-sach-mong-bang-bong-khong-xo"), alt: "A nail technician in black gloves wraps a small folded lint-free wipe around a client's index fingertip to cleanse the nail" },
      },
      {
        name: "Apply the bonding layer to the regrowth",
        text: "The bonding layer goes only on the new natural nail, with a fine gap from the skin. Do not brush it over the old product unless the brand says so. For gel, that is the brand's base or bonder, cured or not as instructed. For acrylic, it is primer, dabbed on very thinly, on the natural nail only.",
        image: { src: img("lop-bam-chi-tren-phan-mong-moi-moc"), alt: "The tip of a small brush lays a glossy, wet strip of bonder on the new natural nail at the cuticle, while the old gel stays matte", caption: "Only the strip of regrowth turns glossy. A fine gap stays between the bonder and the skin." },
      },
      {
        name: "Build and rebuild the apex",
        text: "Builder gel: a very thin layer over the whole nail so the new gel joins the old, then a bead in the centre, floated gently to the cuticle and stopped a hair's width from the skin, then out to the sides and the tip. Turn the finger over for a few seconds so the gel gathers into the apex, turn it back to check and cure for the full time; if the client feels heat, she takes the hand out for a few seconds and the cure continues. Acrylic: a small, slightly wetter first bead on the regrowth near the cuticle, pressed very thin towards the skin without touching it. A second bead goes on the stress area and is blended into the old product to rebuild the apex; then let it set.",
        image: { src: img("hat-builder-gel-o-giua-mong-khi-dam"), alt: "A flat brush has just placed a round bead of builder gel in the centre of a buffed nail, the regrowth at the cuticle glossy with base" },
      },
      {
        name: "Finish filing",
        text: "File the surface smooth while keeping the apex you have just built. Neaten the side walls and even out the tip. At the cuticle, where the new layer thins out, blend it into the natural nail without filing the natural nail or touching the skin. Brush off the dust, cleanse, and check from above, from the side and end-on: thin at the cuticle, moderately high over the stress area, thin at the tip.",
      },
      {
        name: "Colour, top coat and oil",
        text: "Apply colour and top coat as for gel polish: thin coats, capping the free edge, cured for the full time. Put a drop of oil on the skin around each nail, massage gently, and book the next infill.",
      },
    ],
  },
  faq: [
    {
      q: "What are the steps of a nail infill?",
      a: "Ten steps: consult and check, prep the regrowth, file away the lifting, thin the old product, blend the line, cleanse, apply the bonding layer to the regrowth, build and rebuild the apex, finish filing, then colour, top coat and oil. The next infill is booked before the client leaves.",
    },
    {
      q: "Where does the base or primer go during an infill?",
      a: "Only on the new natural nail that has grown out, with a fine gap from the skin. It is not brushed over the old product unless the brand says so. The bonding layer must never touch the skin.",
    },
    {
      q: "Do you need to file down the old gel or acrylic before an infill?",
      a: "Yes. The old product is thinned, especially the old apex that has moved forward, so the new layer has room to rebuild the apex over the stress area. But you never file through the old layer down to the natural nail.",
    },
    {
      q: "How does an acrylic infill differ from a gel infill?",
      a: "At the bonding layer and the build. Acrylic uses primer dabbed very thinly on the natural nail, then a small bead near the cuticle and a bead on the stress area, and it sets in the air. Gel uses the brand's base or bonder, a bead in the centre, a turned-over finger to form the apex, and a cure in the lamp.",
    },
    {
      q: "What if the lifting is still there after filing?",
      a: "Stop. A large lifted area cannot be infilled, and the set needs to come off completely and be redone. Do not add product to seal it and do not prise the lifted part off, because that damages the natural nail.",
    },
    {
      q: "Can you use an e-file for an infill?",
      a: "Only if the technician has been properly trained. Use a moderate speed, keep the bit on the product at all times and never take it near the cuticle or the skin. Until you are trained, use a hand file.",
    },
  ],
  related: ["fill-mong-hieu-dung", "builder-gel", "dap-bot-acrylic", "thao-gel"],
};

export default article;
