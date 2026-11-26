import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/son-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-apply-gel-polish",
  lesson: "son-gel",
  category: "nail",
  title: "How to apply gel polish: 10 steps from nail prep to top coat",
  metaTitle: "How to apply gel polish: 10 steps for a 2–3 week manicure",
  metaDescription:
    "How to apply gel polish step by step: nail check, dry cuticle prep, buffing, base, two colour coats, top coat, LED and UV curing times, and why gel lifts.",
  keyword: "how to apply gel polish",
  keywords: ["gel polish steps", "gel manicure step by step", "gel polish lifting at the cuticle", "how long to cure gel polish", "why is my gel polish wrinkling", "gel nails at home"],
  excerpt: "The full gel polish routine for nail technicians and home users: ten steps, curing times, and the small prep mistakes that make a set lift within days.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-son-gel-cho-khach-tai-salon"),
    alt: "A nail technician in black gloves paints red gel polish on a client's nails at a marble table in an elegant salon",
  },
  takeaways: [
    "Most lifting comes from the **nail prep**, above all the thin film of skin left at the cuticle, not from the bottle.",
    "Work dry, with no soaking: a nail that absorbs water swells, then shrinks back after polishing and pulls the gel loose.",
    "Every gel layer is **thin**, stays off the skin and is capped along the free edge before curing.",
    "Cure for the time your gel brand gives, with the lamp it specifies: LED is usually 30–60 seconds, UV about 2 minutes.",
    "Done properly, a gel polish manicure stays glossy for 2 to 3 weeks.",
  ],
  intro: [
    "How to apply gel polish looks simple on paper: base, colour, top, cure. Yet with the very same bottle, one technician sends a client home with nails that last three weeks, and another sees the gel lifting at the cuticle after four days. The difference lies in what happens before the bottle is opened.",
    "This article walks through the whole routine from the VaraaAi Academy lesson “Gel polish: step-by-step practice from A to Z” in the Nails course: from the moment the client sits down to the last drop of cuticle oil, with curing times and fixes for the mistakes beginners make most often. You can watch the lesson video below and then go through the steps one by one.",
  ],
  sections: [
    {
      id: "nail-prep",
      title: "Why nail prep decides how long gel polish lasts",
      blocks: [
        { p: "Gel bonds to a nail plate that is clean, dry and slightly roughened. It does not bond to skin, it does not bond to oil, and it bonds poorly to a nail that has just been soaked. Those three facts explain almost every case of lifting a new technician runs into." },
        {
          ul: [
            "**The thin film of skin on the nail plate.** At the base of the nail there is always a thin, transparent layer of skin stuck to the plate, hard to see with the naked eye. Paint over it and the gel lifts at exactly that spot a few days later.",
            "**A nail full of water.** A soaked nail swells. Once polished, it dries and shrinks back, and the gel layer does not shrink with it. That is why gel polish calls for dry cuticle work, with no soaking.",
            "**Oil from the skin.** Once the nail has been cleansed, a single touch of a fingertip is enough to leave oil behind. The technician does not touch the nail plate, and reminds the client not to either.",
          ],
        },
        { note: "If a client keeps coming back with gel lifting at the cuticle, do not rush to change brands. Look again at how you remove the thin film of skin and how closely you buff along the cuticle area first.", kind: "tip", title: "From the trade" },
      ],
    },
    {
      id: "curing-times",
      title: "Gel polish curing times: LED and UV",
      blocks: [
        { p: "Gel does not air-dry like ordinary polish. It only hardens when it has been under the lamp long enough, and under the type of lamp the gel brand requires. The figures below are the usual ones; the right figure for your gel is the one on the product." },
        {
          table: {
            head: ["Lamp", "Usual time per layer", "Note"],
            rows: [
              ["LED", "30–60 seconds", "The top coat usually needs the full 60 seconds"],
              ["UV", "About 2 minutes", "Slower than LED, still needs the full time"],
            ],
          },
        },
        { p: "Under-cured gel is not hardened all the way through. The surface may feel firm, but the layer lifts easily, and the uncured gel underneath is what makes an allergy more likely. Curing for longer does not make up for using the wrong lamp." },
        { img: { src: img("ho-den-led-son-gel"), alt: "A client's hand lies flat inside an LED gel lamp, four fingers side by side under violet light", caption: "Paint and cure four fingers first. The thumbs are done separately so they lie flat in the lamp." } },
      ],
    },
    {
      id: "common-mistakes",
      title: "Why gel polish lifts, wrinkles or runs",
      blocks: [
        { p: "Nearly every problem on a gel manicure can be traced back to one rushed step. The table collects the ones beginners meet most and the step to look at again." },
        {
          table: {
            head: ["What you see", "Usual cause", "Fix"],
            rows: [
              ["Lifting at the cuticle", "Skin film left on the nail plate, or gel touching the skin", "Remove the film during cuticle work; leave a hair-thin gap around the cuticle"],
              ["Lifting at the tip", "Free edge not capped", "Run the brush across the free edge in the base, colour and top coats"],
              ["Wrinkled gel, soft underneath", "Coat too thick for the lamp to cure through", "Paint thin; add another thin coat if the colour is patchy"],
              ["Gel running to one side", "Thumb tilted in the lamp", "Do four fingers first, then each thumb on its own, lying flat"],
              ["Gel not sticking, peeling in patches", "Shine left on the nail, dust, or oil from a touch", "Buff lightly until matte, cleanse, then keep fingers off the nail plate"],
            ],
          },
        },
      ],
    },
    {
      id: "safety-allergy",
      title: "Gel polish safety: allergies and TPO",
      blocks: [
        { p: "The first rule of gel work is that **uncured gel never touches the skin**. Gel on the skin makes the polish lift, and repeated contact can lead to an allergy later on, for the client and for the technician. If some gets on the skin, clean it off with a wooden stick before the hand goes into the lamp; never cure it and pick it off afterwards." },
        {
          ul: [
            "Before you start, ask whether gel has ever caused the client itching, redness or nails coming loose. If so, it may be a sign of an allergy, and you should not go ahead.",
            "If the client feels itching, redness or swelling around the nails during the service, stop.",
            "Wear gloves to protect your own skin, because you handle gel every working day.",
            "Green or yellow, thickened or crumbling nails, red swollen skin, pus or an open wound: do not treat, and suggest the client sees a doctor.",
          ],
        },
        { note: "Since 1 September 2025 the European Union has banned TPO in nail products. If you work in Europe, read the ingredient list of the gels on your shelf. Rules differ from country to country, so check the ones that apply where you work.", kind: "warn", title: "Check your gel's ingredients" },
        { p: "For more on chemical allergies in the salon, see the lesson [Allergies and chemicals](lesson:di-ung-hoa-chat) in the Hygiene & safety course." },
      ],
    },
    {
      id: "aftercare",
      title: "Gel polish aftercare: what to tell the client",
      blocks: [
        { p: "A beautiful set as the client leaves the chair is only half the job. The other half is three short pieces of advice, given while you massage in the oil:" },
        { img: { src: img("nho-dau-duong-quanh-mong-sau-khi-son-gel"), alt: "A nail technician places a drop of golden cuticle oil on the skin at the base of a nail painted in red gel" } },
        {
          ol: [
            "Wear gloves for washing up and cleaning.",
            "Use cuticle oil around the nails every day.",
            "Never pick the gel off. Come back to the salon in 2–3 weeks to have it removed and redone.",
          ],
        },
        { img: { src: img("bo-mong-son-gel-do-hoan-thien"), alt: "Both of a client's hands showing ten glossy red gel nails with neat, even lines at the cuticle", caption: "A finished gel manicure: a smooth, glassy surface, an even cuticle line and no gel on the skin." } },
        { p: "Once the client has gone, the table still needs you. Metal tools are washed, disinfected and sterilised; single-use items go in the bin; the table and the lamp are wiped down before the next client sits down. The routine is covered in the lesson [Tools after every customer](lesson:ve-sinh-dung-cu)." },
      ],
    },
    {
      id: "online-booking",
      title: "Put your gel manicure on your salon's booking page",
      blocks: [
        { p: "Once the routine feels natural, let clients book a gel manicure online instead of messaging back and forth. In VaraaAi you [add the service](lesson:dich-vu) with the exact time one set takes you, table clean-up included, and then [make a price list](lesson:bang-gia) to display in the salon. The software is free for salon owners: [see VaraaAi for salons](/business)." },
      ],
    },
  ],
  howTo: {
    title: "How to apply gel polish, step by step",
    id: "gel-polish-steps",
    after: "nail-prep",
    lead: "The ten steps follow the order of the lesson video. The first six are preparation, and that is where it pays to slow down.",
    supplies: [
      "Cuticle pusher and nippers, sterilised and still sealed in their pouch",
      "A 180 grit file and a fine buffer, new for every client",
      "Lint-free wipes and nail cleanser",
      "Base gel, colour gel and top gel",
      "An LED or UV lamp of the type your gel brand requires",
      "Wooden sticks, cuticle oil, gloves",
    ],
    steps: [
      {
        name: "Wash, disinfect and check the nails",
        text: "Wash and disinfect your own hands and the client's, then look closely at the nails and the skin around them. Green or yellow, thickened or crumbling nails, red swollen skin, pus or an open wound mean no service, and a suggestion to see a doctor. Ask too whether gel has ever caused itching, redness or lifting nails.",
      },
      {
        name: "Set out your tools",
        text: "Have everything on the table before you begin, so you never have to get up mid-service in gloves covered in gel. Metal tools stay in their sterilisation pouch until now; the file and buffer are new for each client.",
        image: { src: img("dung-cu-son-gel-can-chuan-bi"), alt: "Gel polish tools laid out on a marble table: a sterilisation pouch with nippers and pusher, file, buffer, base, colour and top gel, LED lamp, oil and gloves" },
      },
      {
        name: "Shape the nails",
        text: "Hold the file at a slight angle under the free edge and file in one direction, from the side towards the centre. Do not saw back and forth: the nail heats up and can start to split into layers. Shape all ten nails evenly in the shape the client has chosen.",
      },
      {
        name: "Do the cuticles dry, without soaking",
        text: "Hold the pusher at about 45 degrees and gently push the skin at the base of the nail back, then scrape off the thin, clear film still stuck to the nail plate. With the nippers, remove only loose dead skin, the white and dry part. Never cut living skin: a deep cut bleeds and opens the way to infection.",
        image: { src: img("day-da-chan-mong-truoc-khi-son-gel"), alt: "A nail technician holds a cuticle pusher at a 45 degree angle and gently pushes back the cuticle on a client's natural nail", caption: "The pusher stays angled and moves gently towards the knuckle, without pressing down on the nail plate." },
      },
      {
        name: "Buff very lightly",
        text: "Glide a fine buffer over the whole nail plate just until the shine is gone. Pay attention to the cuticle area and both side walls, which are easy to miss. Do not buff hard: a thinner nail is weaker and it hurts.",
        image: { src: img("cha-nham-mat-mong-bang-phao-min"), alt: "A nail technician presses the flat side of a white buffer against a natural nail to take off the shine" },
      },
      {
        name: "Cleanse the nail plate",
        text: "Brush off all the dust, then wipe each nail thoroughly with a lint-free wipe and nail cleanser, including the sides and the free edge. From here on nobody touches the nail plate. If your gel system includes a bonder or primer, apply it now, exactly as the brand instructs.",
      },
      {
        name: "Paint a very thin base coat",
        text: "Take very little gel on the brush. Place it mid-nail, nudge it up close to the skin while leaving a gap as thin as a hair, then pull straight down to the tip. Do the sides, then run the brush across the free edge to cap it. Any gel on the skin is cleaned off with a wooden stick before curing.",
        image: { src: img("son-lop-base-gel-mong"), alt: "A brush of clear base gel rests mid-nail near the cuticle; the painted part looks wet and glossy, the rest still matte" },
      },
      {
        name: "Cure for the right time",
        text: "Into the lamp: LED usually 30–60 seconds, UV about 2 minutes, and always the time stated on the product. Paint and cure four fingers first, then the thumbs on their own so they lie flat in the lamp. A tilted thumb lets the gel run to one side.",
      },
      {
        name: "Apply two thin colour coats",
        text: "Three strokes per coat: centre, left, right. Cap the free edge and cure. A patchy first coat is normal, so do not try to cover it with a thick one: thick gel wrinkles and does not cure through. The second coat is done the same way. Very dark or very light shades may need a thin third coat.",
        image: { src: img("son-lop-mau-gel-ba-duong-co"), alt: "A nail technician draws a stripe of red gel down the centre of the nail, the sides still bare and a thin gap left at the cuticle", caption: "The first stroke goes down the centre; the next two cover the sides." },
      },
      {
        name: "Seal with top coat and finish with oil",
        text: "Cover all the colour with top coat, free edge included, to seal it in. The top coat can be a little thicker than the colour coats for a smooth, glassy finish. Cure for the full time, usually 60 seconds under LED. If your top coat leaves a sticky layer, wipe it off with cleanser; a no-wipe top coat needs nothing. Finish with a drop of cuticle oil around each nail and a gentle massage.",
        image: { src: img("phu-lop-top-gel-bong"), alt: "A nail technician brushes clear top coat over a red gel nail, the freshly coated nail shining like a mirror" },
      },
    ],
  },
  faq: [
    {
      q: "How long does gel polish last?",
      a: "Applied with the full routine, a gel polish manicure stays glossy and intact for 2 to 3 weeks. By then the nail has grown and the base shows, so the client comes back to the salon to have it removed and redone rather than picking it off at home.",
    },
    {
      q: "Why does my gel polish lift at the cuticle after a few days?",
      a: "The most common cause is a thin, transparent film of skin left on the nail plate, or gel touching the skin during application. Gel cannot bond to skin. Scrape the film off during cuticle work and leave a hair-thin gap around the cuticle when you paint.",
    },
    {
      q: "How long do you cure gel polish under an LED lamp?",
      a: "Usually 30–60 seconds per layer under LED, and about 2 minutes under UV. Brands differ, so the right time is the one printed on the product, with the type of lamp the brand requires. Under-cured gel lifts easily and is more likely to cause an allergy.",
    },
    {
      q: "Why is my gel polish wrinkling?",
      a: "The coat is too thick. The lamp's light cannot reach the gel underneath, so the top shrinks and wrinkles while the inside stays soft. Paint thin coats, and if the colour is still patchy, add another thin coat instead of one thick one.",
    },
    {
      q: "Should you soak your nails before a gel manicure?",
      a: "No. A nail that soaks up water swells, then shrinks back after polishing, and the gel lifts easily. For gel polish the cuticles are worked dry with a pusher and nippers.",
    },
    {
      q: "Is doing gel nails at home different from a salon manicure?",
      a: "The steps are exactly the same. When you do it yourself, the things to watch most are keeping uncured gel off the skin, using the lamp your gel brand specifies and curing for the full time. If you notice itching, redness or swelling around the nails, stop using the product.",
    },
  ],
  related: ["gel-hieu-dung", "thao-gel", "builder-gel", "ve-sinh-dung-cu"],
};

export default article;
