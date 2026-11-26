import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dap-bot-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-are-acrylic-nails",
  lesson: "dap-bot-hieu-dung",
  category: "nail",
  title: "What are acrylic nails? How acrylic sets, the liquid-to-powder ratio and working safely",
  metaTitle: "What are acrylic nails? Ratio, primer, MMA and safety",
  metaDescription:
    "What acrylic nails are, how acrylic sets without a lamp, beads too wet and too dry, primer, why acrylic lifts, vapour and dust, MMA, infills and removal.",
  keyword: "what are acrylic nails",
  keywords: ["acrylic liquid to powder ratio", "acrylic bead too wet", "why is my acrylic lifting", "what is MMA in acrylic nails", "do acrylic nails need a UV lamp", "how often to infill acrylic nails", "how to remove acrylic nails safely"],
  excerpt: "Acrylic nails are built from liquid and powder that set in the air with no lamp. The ratio, the structure, primer, MMA and how to keep vapour and dust out of the salon.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-dap-bot-acrylic-cho-khach-tai-salon"),
    alt: "A nail technician with dark hair in a low bun and black gloves applies acrylic for a blonde client at a stone table with a built-in dust extractor",
  },
  takeaways: [
    "Acrylic is **liquid plus powder**. When the two meet, the reaction starts at once in the open air, with no lamp, and the bead sets within minutes.",
    "The **liquid-to-powder ratio** matters most: a good bead is moist, glossy and round, holds its shape and only settles a little.",
    "Primer goes on very thinly, on the nail plate only. Liquid, primer and unset acrylic **never touch the skin**.",
    "The liquid has a strong vapour and is flammable: local exhaust at the table, lids on, no flames, and no leftover liquid down the sink.",
    "If acrylic has lifted, **file the lifted part away before the infill**; never build over it. Infills are usually every 2–3 weeks.",
  ],
  intro: [
    "What are acrylic nails? They are extensions built from acrylic, a technique that has been around for a very long time, is very strong and is still chosen by many clients today. But acrylic does not forgive careless work. The wrong ratio, the wrong structure or product touching the skin, and the nails lift, break, and sometimes the client develops an allergy.",
    "This article follows the VaraaAi Academy lesson “Acrylic: understand it for lasting, safe nails” in the Nails course. By the end you will understand how acrylic sets, be able to tell from a bead whether it is too wet or too dry, know why acrylic lifts, and know how to set up your table so vapour and dust do not stay in the salon.",
  ],
  sections: [
    {
      id: "how-acrylic-sets",
      title: "How acrylic sets without a lamp",
      blocks: [
        { p: "The system has two parts: the liquid, which in the trade is simply called the liquid, and the powder. When a brush wet with liquid touches the powder, the two mix and the reaction starts straight away, in the open air. Within a few minutes the soft bead hardens into a solid mass." },
        { p: "That is the biggest difference from gel. Gel only hardens under a lamp; acrylic waits for no one. The time you have to place and press the bead is very short, so the hand has to be steady and decisive. It is also why anyone learning acrylic should practise on training nails before working on clients." },
      ],
    },
    {
      id: "liquid-to-powder-ratio",
      title: "The liquid-to-powder ratio: the right bead, too wet, too dry",
      blocks: [
        { p: "A correct bead is moist, glossy and round. Placed on the nail, it holds its shape, then slowly settles a little without running. Every brand has its own ratio, so read the brand's instructions and train your hand until it is second nature." },
        { img: { src: img("hat-bot-acrylic-tron-bong-tren-dau-co"), alt: "The tip of an acrylic brush touching a pot of pink powder, a round, smooth, moist-looking bead sitting on the brush", caption: "The right bead: round and moist-glossy, neither dripping nor dry and crumbly." } },
        {
          table: {
            head: ["Bead", "Signs", "Result"],
            rows: [
              ["Right ratio", "Moist, glossy, round; holds its shape and settles only a little", "A smooth, moist-glossy surface with no pits after pressing"],
              ["Too wet (much liquid, little powder)", "Runs, floods the side walls and the cuticle area", "Sets slowly and is weak once set. Unreacted liquid can collect on the skin, one route to allergy"],
              ["Too dry (little liquid, much powder)", "Grainy surface with tiny pinholes, crumbly at the free edge", "Bonds poorly and lifts easily. The porous surface picks up dirt and stains"],
            ],
          },
        },
        { img: { src: img("loi-hat-bot-qua-uot-chay-tran-len-da"), alt: "Close-up of a nail with a pink acrylic layer that is far too wet, the product running onto the skin at the cuticle and down the side of the finger", caption: "This picture shows a mistake: a bead that was too wet has run onto the skin around the nail." } },
        { img: { src: img("loi-hat-bot-qua-kho-mat-bot-san-co-lo"), alt: "Close-up of a pink acrylic nail with a rough surface full of tiny pinholes and a crumbly edge", caption: "This picture shows a mistake: a bead that was too dry gives a grainy, pitted surface and a crumbly edge." } },
        { note: "To check your own ratio, look at the surface you have just pressed: smooth, moist-glossy and free of pits means it is right.", kind: "tip", title: "How to check yourself" },
      ],
    },
    {
      id: "structure-and-primer",
      title: "The structure of an acrylic nail and what primer does",
      blocks: [
        { p: "In structure, acrylic is just like [builder gel](lesson:builder-gel-hieu-dung): thin right at the cuticle, thin at the tip, and thickest at the apex over the stress area, where the nail leaves the nail bed, slightly towards the back. Seen end-on, the C-curve is even on both sides, with straight, neat side walls. With extensions this matters even more, because the longer the extension, the greater the force bending the nail every day." },
        { img: { src: img("cau-truc-mong-bot-diem-apex-nhin-tu-canh-ben"), alt: "A pink acrylic extension seen from the side, thin at the cuticle, highest in the middle and tapering finely towards the tip" } },
        { p: "Whether acrylic bonds well is decided in the prep: work dry with no soaking, push back the cuticle and remove the thin layer of skin still stuck to the nail plate, buff lightly to take off the shine, then clean off dust and oil. Only then comes primer." },
        { img: { src: img("thoa-primer-mong-chi-tren-mat-mong"), alt: "A nail technician in black gloves dabs a thin layer of primer onto a natural nail with the small brush from the bottle cap, well away from the skin", caption: "Primer stays on the nail plate only, well away from the skin at the cuticle and in the corners." } },
        { note: "There are acid primers and acid-free primers. Either way, apply a very thin layer on the nail plate only, and never let it touch the skin, because it can burn. Which one to use, how to apply it and how long to let it dry all follow the instructions of the acrylic brand you are using.", kind: "warn", title: "Keep primer off the skin" },
      ],
    },
    {
      id: "acrylic-lifting",
      title: "Why acrylic lifts at the cuticle",
      blocks: [
        { p: "The client comes back after a week and the acrylic has lifted at the cuticle. The reason is usually one of these six:" },
        {
          ul: [
            "The nail was not prepped thoroughly.",
            "Too little primer, or too much.",
            "Acrylic touching the skin or flooding the corners.",
            "An edge at the cuticle that is too thick.",
            "A bead that was too dry.",
            "No apex, so the nail is bent every day.",
          ],
        },
        { img: { src: img("mong-bot-bi-ho-o-chan-mong"), alt: "Close-up of a pink acrylic nail lifting at the cuticle, the edge of the acrylic raised with a pale crescent-shaped gap underneath", caption: "Acrylic lifting at the cuticle: the edge has come up, leaving a gap underneath." } },
        { note: "When you see lifting, do not build over it. Water and dirt can be trapped under the lifted part, and more acrylic seals them in. File the lifted part away first, then do the infill.", kind: "warn", title: "Never cover a lifted area" },
      ],
    },
    {
      id: "vapour-dust-liquid",
      title: "Acrylic vapour, filing dust and a safe workstation",
      blocks: [
        { p: "The liquid has a very strong smell, evaporates fast and is flammable. The [City of Helsinki's hygiene guidance](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf) states it plainly: where acrylic nails are done, the workstation must have sufficiently efficient local exhaust ventilation, and filing dust must also be extracted at the source so it does not spread through the salon. Rules differ from country to country and from city to city, but the principle is the same: extract vapour and dust right where they are produced, and wear a mask when filing." },
        { img: { src: img("dua-mong-bot-tren-mieng-hut-bui-tai-ban"), alt: "A nail technician in a mask and black gloves files a client's nails directly above a round dust extraction vent set into the stone table", caption: "Filing right over the extractor: the dust is drawn down instead of rising towards the technician and the client." } },
        { p: "A few small habits with the liquid are worth keeping every day:" },
        {
          ul: [
            "Pour only a little, enough for one client, into a small dappen dish with a lid. Cover it whenever you are not using it.",
            "Close the large bottle straight after pouring.",
            "Keep it away from flames and heat sources.",
            "Leftover liquid never goes down the sink. Dispose of it as the product's safety data sheet and the waste rules where you work say.",
            "Paper towels soaked with liquid go in a bin with a lid.",
          ],
        },
        { img: { src: img("day-nap-chai-liquid-va-chen-nho-co-nap"), alt: "A black-gloved hand screws the cap onto a small glass bottle, beside a covered glass dish and a yellow lidded bin" } },
        { p: "On allergy, one sentence is enough here: liquid and acrylic that has not yet set must never touch the client's skin, or your own. The rest is in the lesson [Allergies and chemicals](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "mma-liquid",
      title: "What is MMA in acrylic liquid, and why avoid it",
      blocks: [
        { p: "Some liquids are made with MMA. In the United States, back in the 1970s, the Food and Drug Administration had liquids made entirely of this substance taken off the market after many cases of damaged nails and skin ([FDA information](https://www.fda.gov/cosmetics/cosmetic-products/nail-care-products)). In Germany, the Federal Institute for Risk Assessment (BfR) advises manufacturers not to use MMA in powder and liquid systems ([BfR opinion 014/2012](https://www.bfr.bund.de/cm/349/liquid-agents-for-nail-modelling-with-high-methyl-methacrylate-contents-present-a-health-risk.pdf)). Liquids for professionals usually use other monomers, such as EMA." },
        { note: "Only buy clearly labelled products with a safety data sheet, from a supplier you trust. Unusually cheap, no clear label, no safety data sheet: do not buy it.", kind: "warn", title: "Choosing a liquid" },
      ],
    },
    {
      id: "infills-and-removal",
      title: "How often acrylic nails need an infill, and how to remove them",
      blocks: [
        { p: "As the nail grows out, the acrylic slowly moves towards the tip, taking the apex with it. The nail becomes top-heavy and breaks and lifts more easily. Usually the client should come back every 2–3 weeks for an infill. Be honest with her: acrylic is very strong, but the natural nail underneath still needs gentle care. No picking, and no using the nails as tools to prise or open things." },
        { p: "Acrylic dissolves in acetone, but it takes quite a bit longer than gel. File the bulk of the acrylic down first, soak it in acetone, and gently push off only the parts that have softened. Never prise and never snap it off. The steps are the same as in [how to remove gel properly](lesson:thao-gel); it just takes more patience." },
        { img: { src: img("u-acetone-bang-giay-bac-de-thao-bot"), alt: "A client's hand on a cushion with five fingertips wrapped in foil, a small hourglass standing beside it", caption: "Soaking in acetone takes time, and longer for acrylic than for gel." } },
        { p: "Once this is clear, move on to the practice article, [how to do acrylic nails step by step](lesson:dap-bot-acrylic), to practise picking up a bead and building with three beads on a form." },
      ],
    },
    {
      id: "acrylic-stock",
      title: "Keep track of acrylic liquid and powder in stock",
      blocks: [
        { p: "Liquid and powder have to come from the right source, and running out halfway through and buying something unlabelled in a hurry is best avoided. In VaraaAi you can add these products to your [inventory](lesson:kho-hang) so you know when to reorder. Each client's history of allergies belongs in her [client record](lesson:khach-hang), so whoever takes her next time knows before opening the liquid." },
      ],
    },
  ],
  faq: [
    {
      q: "Do acrylic nails need a UV or LED lamp?",
      a: "No. When a brush wet with liquid touches the powder, the reaction starts at once in the open air and the bead sets within a few minutes without any lamp. Because acrylic does not wait, the technician has to place and press each bead decisively.",
    },
    {
      q: "What is the right liquid-to-powder ratio for acrylic?",
      a: "A correct bead is moist, glossy and round. Placed on the nail, it holds its shape, then settles a little without running, and once pressed the surface is smooth, moist-glossy and free of pits. Every brand has its own ratio, so read the instructions and practise on training nails first.",
    },
    {
      q: "Why is my acrylic lifting at the cuticle?",
      a: "Usually because of rushed prep, too little or too much primer, acrylic on the skin, an edge at the cuticle that is too thick, a bead that was too dry, or an overlay with no apex. Never build over a lifted area: file the lifted part away first, then infill.",
    },
    {
      q: "What is MMA in acrylic nails?",
      a: "MMA is a substance that has been used to make acrylic liquid. The US FDA had liquids made entirely of MMA taken off the market after many cases of damaged nails and skin, and Germany's BfR advises manufacturers not to use MMA in powder and liquid systems. Professional liquids usually use other monomers such as EMA.",
    },
    {
      q: "How often do acrylic nails need an infill?",
      a: "Usually every 2–3 weeks. As the nail grows, the acrylic and the apex move towards the tip, so the nail becomes top-heavy and breaks and lifts more easily. An infill on time brings the structure back to where it should be.",
    },
    {
      q: "Can you remove acrylic nails with acetone?",
      a: "Yes. Acrylic dissolves in acetone, but it takes quite a bit longer than gel. The technician files the bulk down, soaks the nails in acetone and gently pushes off only the softened product. Acrylic should never be prised or snapped off the nail.",
    },
  ],
  related: ["dap-bot-acrylic", "fill-mong-hieu-dung", "noi-mong-form-hieu-dung", "di-ung-hoa-chat"],
};

export default article;
