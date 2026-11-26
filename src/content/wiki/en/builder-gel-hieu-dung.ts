import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/builder-gel-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-builder-gel-biab",
  lesson: "builder-gel-hieu-dung",
  category: "nail",
  title: "What is builder gel (BIAB)? How it differs from gel polish, who it suits and why it needs an apex",
  metaTitle: "What is builder gel (BIAB)? Vs gel polish, apex, infills",
  metaDescription:
    "What builder gel (BIAB) is, how it differs from gel polish, soak-off versus hard gel, who it suits, the apex, why it lifts at the cuticle and when to infill.",
  keyword: "what is builder gel",
  keywords: ["what is BIAB", "builder gel vs gel polish", "does builder gel damage your nails", "builder gel apex", "why is my builder gel lifting", "how often to infill builder gel", "what is rubber base gel"],
  excerpt: "Builder gel (BIAB) is a thick gel that forms a supporting frame over the natural nail. How it differs from gel polish, who it suits, the right structure and why it lifts.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("bo-mong-builder-gel-hong-sua-tu-nhien"),
    alt: "A client's two hands resting on a cream cushion, ten short nails covered in glossy, natural milky pink builder gel",
  },
  takeaways: [
    "Gel polish is the coat, **builder gel is the frame**: a thick gel that levels itself and cures into a layer that supports the natural nail.",
    "Builder gel suits thin, soft nails that break easily. It **does not make nails grow faster** and does not treat them.",
    "The overlay is thin at the cuticle, thin at the tip and thickest at the **apex**, which sits over the stress area.",
    "Lifting at the cuticle usually comes from rushed prep, gel touching the skin, a thick ledge at the edge, or an overlay with no apex.",
    "An **infill every 3–4 weeks** is usual to rebuild the apex. If the old layer is still well bonded, it does not all have to come off.",
  ],
  intro: [
    "What is builder gel, and why does every client with weak nails ask for it? It is a thick gel, often called BIAB, short for builder in a bottle. Applied over the natural nail, it forms a frame that makes the nail strong while it still looks natural. The same service, done without understanding how it works, lifts, breaks, and the client does not come back.",
    "This article follows the VaraaAi Academy lesson “Builder gel: understand it for strong, beautiful nails” in the Nails course. By the end you will be able to tell builder gel from gel polish, know which clients it suits and which should wait, understand why the gel needs a shape, and explain to a client why regular infills matter.",
  ],
  sections: [
    {
      id: "builder-gel-vs-gel-polish",
      title: "Builder gel (BIAB) vs gel polish: what is the difference",
      blocks: [
        { p: "Both go under a lamp and both come in a bottle, so clients often assume they are the same thing. They do different jobs. Gel polish is runny and thin, and it is there mainly for colour. It is flexible and bends with the nail, but it does not make the nail any stiffer. Builder gel is much thicker, like honey. Placed on the nail, it flows out flat on its own, which technicians call self-levelling. Once cured under the lamp, it becomes a frame that supports the natural nail." },
        { img: { src: img("builder-gel-dac-sanh-nhu-mat-ong"), alt: "A gloved hand lifts a brush out of a bottle, the thick, clear pink builder gel running slowly back into the neck in a heavy stream", caption: "Builder gel is thick and slow to flow. That thickness is what lets the technician give the overlay a shape." } },
        {
          table: {
            head: ["Compared", "Gel polish", "Builder gel"],
            rows: [
              ["Texture", "Runny and thin", "Thick like honey, levels itself"],
              ["Main job", "Colour", "A frame that supports the natural nail"],
              ["Once cured", "Flexible, bends with the nail, adds no stiffness", "A rigid layer that stops the nail from bending"],
              ["Thickness and heat", "A thin layer", "A thicker layer; clients often feel heat in the first seconds"],
            ],
          },
        },
        { p: "The shortest way to remember it: polish is the coat, builder gel is the frame. One set can have both, the frame underneath and the colour on top. If you are not yet confident with the colour part, read [what gel polish is and why it lasts](lesson:gel-hieu-dung) first." },
      ],
    },
    {
      id: "soak-off-and-hard-gel",
      title: "Two families of builder gel: soak-off and hard gel",
      blocks: [
        { p: "Before you open a new bottle, find out which family it belongs to, because the two come off in completely different ways." },
        {
          table: {
            head: ["Family", "What it includes", "Removal"],
            rows: [
              ["Soak-off", "Most builder gels in a bottle sold as BIAB, plus thick bases and rubber bases", "Dissolves in acetone"],
              ["Hard gel", "Builder gel that does not dissolve in acetone", "Filed off"],
            ],
          },
        },
        { img: { src: img("tho-nail-doc-huong-dan-tren-chai-gel"), alt: "A nail technician in a cream top stands by a stone shelf of gel bottles, holding a small bottle up to read the label on the back" } },
        { note: "Three things to read in the brand's instructions before you use a product: how it is removed, how long it cures and under which lamp. Never apply one brand's figures to another brand's bottle.", kind: "info", title: "Read the brand's instructions" },
        { p: "How to take off each type without thinning the natural nail is covered in [how to remove gel properly](lesson:thao-gel)." },
      ],
    },
    {
      id: "who-it-suits",
      title: "Who builder gel suits, and who should wait",
      blocks: [
        { p: "The best candidate has thin, soft nails that bend easily, peel in layers at the tip and break as soon as they grow a little long. The frame stops the nail from being bent every day, so the client can keep the length of her own nails." },
        { img: { src: img("mong-mong-tach-lop-o-dau-mong"), alt: "Close-up of a thin natural fingernail whose tip has split into layers and is flaking off in clear scales", caption: "Thin nails that peel at the tip: the kind a builder gel frame protects best." } },
        { note: "Builder gel does not make nails grow faster and does not treat them. It protects them so they do not break while they grow. Do not promise a client that gel will make her nails healthier.", kind: "warn", title: "Be accurate about what it does" },
        { p: "There are three cases where you should not do it, or not yet:" },
        {
          ul: [
            "**Nails that need a doctor.** A nail lifting from the nail bed, discoloured or thickened, or skin around the nail that is swollen, red or has pus. Do not treat, and suggest the client sees a doctor.",
            "**A client who has reacted to gel before.** The signs are itching, redness or blistering around the nails after earlier sets.",
            "**Nails bitten right down.** Gel has to bond to the natural nail. With very little nail there is little to hold on to, and the gel ends up close to the skin. For these clients it is often better to care for the nails for a while until they grow, and do the overlay afterwards.",
          ],
        },
        { img: { src: img("mong-can-sat-chua-nen-lam-builder-gel"), alt: "Two hands resting on a cream towel, the nails bitten very short with ragged edges and dry skin around them" } },
        { p: "How to recognise the signs that mean saying no is covered in the lesson [When not to treat](lesson:khi-nao-khong-lam) in the Hygiene & safety course." },
      ],
    },
    {
      id: "builder-gel-apex",
      title: "What is the apex, and how a builder gel overlay should be built",
      blocks: [
        { p: "A good builder gel set is not evenly thick like a plank. It has a shape: thin right at the cuticle, thin at the tip, and thickest at one point called the **apex**." },
        { p: "The reason is the way a nail takes strain. Every day the client types, opens lids and does up buttons. The nail is pushed upwards, and it tends to break in one place: where it leaves the nail bed and the free edge begins. That is the stress area. The apex sits right over it, just slightly behind. The gel is thickest there and works like a supporting beam, so the nail does not bend. A completely flat overlay does the opposite: the nail keeps flexing up and down every day, and the gel gradually lifts." },
        { img: { src: img("diem-apex-builder-gel-nhin-tu-canh-ben"), alt: "A finger seen from the side, the clear pink builder gel forming a soft curve that is highest around the middle of the nail", caption: "Seen from the side: thin at the cuticle and at the tip, highest at the apex." } },
        { p: "Looking at the nail end-on, from the tip, it has a curve like the letter C. The gel has to follow that C-curve evenly on both sides. Along the side walls the gel stays slim and neat, straight along the edge of the nail, never bulging and never running onto the skin." },
        { img: { src: img("do-cong-chu-c-nhin-tu-dau-mong"), alt: "A fingertip pointing straight at the camera, the gel-covered free edge showing an even C-shaped arch on both sides" } },
        { note: "Get into the habit of checking every nail from three views: from above, from the side and end-on. From above alone, a flat overlay or one that leans to one side is very hard to see.", kind: "tip", title: "Three views" },
      ],
    },
    {
      id: "builder-gel-lifting",
      title: "Why builder gel lifts at the cuticle after a week",
      blocks: [
        { p: "A client coming back after a week with the gel lifting at the cuticle is one of the most common problems with this service. Usually it comes down to one of four reasons." },
        {
          table: {
            head: ["Cause", "What happens", "How to avoid it"],
            rows: [
              ["Rushed prep", "Oil, moisture or shine on the nail, or a thin film of cuticle left on the plate, so the gel cannot bond", "Work dry, remove the film, buff off the shine, cleanse and keep fingers off the nail"],
              ["Gel touching the skin", "Gel runs into the corners or onto the cuticle; the skin grows and pushes it up", "Leave a hair-thin gap between gel and skin"],
              ["Edges too thick", "A ridge forms at the edge and pops off at the slightest catch", "Keep the gel thin at the cuticle and along the side walls"],
              ["No apex", "The nail flexes every day until the gel cannot take it", "Build the high point over the stress area"],
            ],
          },
        },
        { img: { src: img("loi-gel-tran-vao-da-o-chan-mong"), alt: "Close-up of a red gel nail where the gel has spread past the nail onto the skin at the cuticle and in the corners", caption: "This picture shows a mistake: gel flooded onto the skin at the cuticle. A layer like this lifts as the skin grows, and uncured gel on the skin can also lead to an allergy." } },
      ],
    },
    {
      id: "heat-and-allergy",
      title: "Builder gel burning in the lamp, and the risk of gel allergy",
      blocks: [
        { p: "Gel gives off heat as it cures, and the thicker the layer, the more heat. Builder gel is thicker than gel polish, so clients often feel a burning sensation in the first few seconds. Many lamps have a low-heat mode, and some brands recommend a short flash cure of a few seconds to set the gel before the full cure. Follow the instructions of the brand you use." },
        { img: { src: img("den-led-ho-builder-gel"), alt: "A white dome-shaped LED nail lamp on a stone table, the bulbs inside glowing violet-blue" } },
        {
          ul: [
            "If the client feels heat, let her take the hand out for a few seconds, then put it back and still cure for the full time. Never make a client put up with pain: too much heat can damage the nail bed.",
            "Work in two moderate layers instead of one very thick one. A thinner layer gets less hot and cures more evenly.",
            "Do not stop the cure halfway. Under-cured gel lifts easily and is more likely to cause an allergy.",
          ],
        },
        { h3: "Three rules on allergy" },
        {
          ol: [
            "Uncured gel never touches the client's skin, or yours.",
            "The gel must cure fully: the type of lamp the brand recommends, the full time, and no layers that are too thick.",
            "Filing dust is extracted, never blown away, because dust from gel that is not fully cured can cause allergies too.",
          ],
        },
        { note: "In the EU, nail products containing HEMA must be labelled “for professional use only” and “can cause an allergic reaction” ([Regulation (EU) 2020/1682](https://eur-lex.europa.eu/eli/reg/2020/1682/oj/eng)). Nail products containing TPO are banned, so check the stock in your salon. Rules differ from country to country, so check the ones that apply where you work.", kind: "warn", title: "Ingredient rules" },
        { p: "There is more on this in the lesson [Allergies and chemicals](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "builder-gel-infills",
      title: "How often builder gel needs an infill, and what to tell the client",
      blocks: [
        { p: "As the nail grows, the gel slowly moves towards the tip and takes the apex with it. The frame shifts forward, the nail becomes top-heavy, and it breaks and lifts more easily. That is why a client usually comes back every 3–4 weeks for an infill: the technician files the old layer thinner, covers the new growth at the cuticle and rebuilds the apex in the right place." },
        { img: { src: img("builder-gel-moc-ra-can-dam-lai"), alt: "Close-up of a builder gel nail that has grown out, showing a band of bare natural nail without gel near the cuticle", caption: "After a few weeks the regrowth shows at the cuticle and the apex has moved towards the tip." } },
        { p: "If the old layer is still well bonded, you can do many infills without taking it all off. The natural nail is spared from one removal after another." },
        { p: "The rest is honest talk with the client. One sentence covers it: “This layer keeps your nails from breaking so they can grow longer. It won't make them grow faster.” Then add:" },
        {
          ul: [
            "If it lifts, do not peel it or pry it off. Come back to the salon.",
            "Wear gloves for washing up and cleaning.",
            "Apply cuticle oil around the nails every day.",
          ],
        },
        { p: "A client who understands helps you look after her nails. Once the theory is clear, move on to the practice article, [how to apply builder gel on natural nails](lesson:builder-gel), and work through it step by step." },
      ],
    },
    {
      id: "infill-bookings",
      title: "Put builder gel infills on your salon's booking calendar",
      blocks: [
        { p: "Builder gel lives on its infill schedule, so the salon should offer it as a separate service. In VaraaAi you [add a service](lesson:dich-vu) called “Builder gel infill” with the time it really takes in your salon, then book the next infill in the [appointment calendar](lesson:lich-hen) before the client leaves. A client who already has a date rarely lets the gel go overdue and picks at it at home." },
      ],
    },
  ],
  faq: [
    {
      q: "Is builder gel the same as BIAB?",
      a: "BIAB, short for builder in a bottle, is what many salons call builder gel that comes in a bottle. Most bottled builder gels are soak-off, the same family as thick bases and rubber bases. There is also hard gel, which does not dissolve in acetone and has to be filed off.",
    },
    {
      q: "What is the difference between builder gel and gel polish?",
      a: "Gel polish is thin and runny, mainly there for colour, and it does not make the nail any stiffer. Builder gel is much thicker, levels itself and cures into a frame that supports the natural nail. Gel polish can be applied on top of a builder gel overlay.",
    },
    {
      q: "Does builder gel make your nails grow faster or stronger?",
      a: "No. Builder gel does not make nails grow faster and does not treat them. It protects the nail from bending and breaking while it grows, which is how the client keeps the length of her natural nails.",
    },
    {
      q: "Where should the apex of builder gel be?",
      a: "The apex is where the gel is thickest. It sits over the stress area, where the nail leaves the nail bed and the free edge begins, slightly behind that point. The cuticle area and the tip stay thin.",
    },
    {
      q: "Why does builder gel burn in the lamp?",
      a: "Gel gives off heat as it cures, more with thicker layers, and builder gel is thicker than gel polish. If it burns, the client takes the hand out for a few seconds, then puts it back and finishes the full cure. A low-heat mode or a short flash cure, if the brand recommends one, and two moderate layers instead of one thick one also help.",
    },
    {
      q: "How often should builder gel be infilled?",
      a: "Usually every 3–4 weeks. As the nail grows, the apex moves towards the tip, the nail becomes top-heavy and breaks or lifts more easily. At the infill the old layer is filed thinner, the regrowth is covered and the apex is rebuilt. If the old layer is still well bonded, it does not all have to be removed.",
    },
  ],
  related: ["builder-gel", "gel-hieu-dung", "thao-gel-hieu-dung", "fill-mong-hieu-dung"],
};

export default article;
