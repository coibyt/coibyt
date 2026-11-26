import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/gel-biab-bot-gelx/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "biab-vs-gel-polish-acrylic-gel-x",
  lesson: "gel-biab-bot-gelx",
  category: "tips",
  title: "BIAB vs gel polish: how they differ, plus acrylic and Gel-X, and which one suits your nails",
  metaTitle: "BIAB vs gel polish: the difference, plus acrylic and Gel-X",
  metaDescription:
    "BIAB vs gel polish explained, plus acrylic and Gel-X: which is hardest, how long each lasts, how it comes off and which suits weak, strong or long nails.",
  keyword: "BIAB vs gel polish",
  keywords: [
    "is BIAB better than gel polish",
    "gel or acrylic nails",
    "what is Gel-X",
    "BIAB for weak nails",
    "how long does BIAB last",
    "are acrylic nails strong",
  ],
  excerpt: "Four nail treatments look alike on the hand but differ in hardness, wear and removal. Here is how to tell which one to book.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("ban-lam-mong-voi-liquid-bot-acrylic-va-gel"),
    alt: "A marble nail desk in an elegant salon with a dappen dish of liquid, a jar of white acrylic powder, a jar of clear gel and a client's hand waiting",
  },
  takeaways: [
    "**Gel polish** is a thin colour layer on your natural nail, cured under a lamp, and looks good for about three weeks. It suits healthy nails and people who like to change colour.",
    "**BIAB (builder gel)** is thicker and builds a strong base that supports the natural nail. It suits thin nails that break easily, when you want to grow length naturally.",
    "**Acrylic** hardens in the air on its own and is the hardest of the four. It suits people who want long, sturdy nails.",
    "**Gel-X** is a soft gel tip fixed over the natural nail with gel: every nail gets the same shape, the work is quick and removal is a soak-off.",
    "Whichever you choose: if an edge starts to lift, do not pick at it. Go back to the salon for removal or an infill.",
  ],
  intro: [
    "BIAB vs gel polish, and where do acrylic and Gel-X fit in? It is the question clients ask most when they open a nail salon's service list. On the hand, all four look glossy and neat. The difference sits under the shine: the material, how hard it is, how it sets, and how much of the load your natural nail has to carry.",
    "This article follows the lesson “Gel polish, BIAB, acrylic or Gel-X: what is the difference?” from the Moja Beauty course at VaraaAi Academy, a set of short customer videos from the Moja Beauty salon in Helsinki. By the end you will know what each treatment is, which one suits your nails, and what to tell your nail technician when you book.",
  ],
  sections: [
    {
      id: "quick-comparison",
      title: "The four nail treatments at a glance",
      blocks: [
        {
          table: {
            head: ["Treatment", "What it is", "Who it suits"],
            rows: [
              ["Gel polish", "A thin colour layer, cured under a lamp", "Healthy nails, colour changers"],
              ["BIAB (builder gel)", "Thick gel that builds a strong base", "Thin nails that break, growing length"],
              ["Acrylic", "Powder mixed with liquid, sets on its own", "Long, sturdy nails"],
              ["Gel-X", "A soft gel tip fixed on with gel", "Same shape on every nail, quick work"],
            ],
          },
        },
        { p: "The shortest way to remember it, as the lesson puts it: gel polish for changing colour, BIAB for weak nails, acrylic for long and hard nails, Gel-X when you want it quick." },
      ],
    },
    {
      id: "gel-polish",
      title: "Gel polish: a coat of colour on your own nail",
      blocks: [
        { p: "Gel polish is a thin layer of colour painted straight onto your natural nail. Unlike ordinary polish it does not dry in the air; it hardens only under a lamp. The gel grips the surface of the nail rather than soaking into it, which is why cleaning and drying the nail plate before the colour goes on decides how long the manicure lasts." },
        { img: { src: img("son-gel-mau-do-len-mong-cai"), alt: "A nail technician in black gloves paints red gel polish onto a client's thumbnail with a fine brush, both thumbs resting side by side on a towel", caption: "Gel polish is a thin, flexible colour layer. It follows the nail but does not make it any stronger." } },
        { p: "Done properly, gel polish stays glossy for about three weeks. By then the nail has grown out and it is time to take it off and start again. Because the layer is thin and flexible, it cannot support a weak nail: a thin nail under gel polish can still bend and break as before. On the other hand, it is the lightest option if your nails are naturally strong and you like a new colour every month." },
        { img: { src: img("mong-son-gel-do-bong-tren-mong-that"), alt: "A client's hands resting one over the other on a cream towel, ten short nails in glossy red gel polish, with a vase of peonies beside them" } },
        { p: "For why gel grips, why it lifts and whether it harms the nail, read [what is gel polish](lesson:gel-hieu-dung) in the nail technician course." },
      ],
    },
    {
      id: "what-is-biab",
      title: "What is BIAB, and why it suits weak nails",
      blocks: [
        { p: "BIAB is the name many salons use for builder gel that comes in a bottle. It is much thicker than gel polish, with a texture like honey. Once cured under the lamp, it becomes a supporting structure over your natural nail. Technicians often sum it up like this: gel polish is the coat, builder gel is the frame." },
        { img: { src: img("hat-builder-gel-biab-dat-giua-mong"), alt: "Close-up of a nail technician placing a bead of clear milky pink builder gel in the middle of a client's nail with a flat brush", caption: "Builder gel is placed as a bead and spread so that the thickest part sits where the nail tends to break." } },
        { p: "Thin, soft nails that bend easily, split at the tip and snap as soon as they get a little length are the kind that suit BIAB. The frame stops the nail being bent back every day, so you keep the length of your own nail and it still looks natural." },
        { note: "BIAB does not make nails grow faster and does not repair them. It protects the nail so it does not break while it grows out. If a salon promises that gel will make your nails healthier, ask more questions.", kind: "info", title: "Worth knowing before you book" },
        { p: "Most BIAB gels come off with acetone, while some hard gels have to be filed off, so removal follows the manufacturer's instructions. As the nail grows, the gel moves towards the tip, which is why an infill is usually due every 3–4 weeks. If the old layer is still well bonded, the technician only files it thinner and builds up the new growth, with no need to remove everything. The article [what is builder gel](lesson:builder-gel-hieu-dung) explains how the layer is structured." },
      ],
    },
    {
      id: "acrylic-nails",
      title: "Acrylic: the hardest option, good for length",
      blocks: [
        { p: "Acrylic uses two things: a liquid, which technicians call monomer or simply liquid, and a powder. A brush wet with liquid touches the powder and picks up a soft bead, which the technician places on the nail and shapes. The acrylic hardens in the air within a few minutes, with no lamp needed." },
        { img: { src: img("hat-bot-acrylic-tren-dau-co"), alt: "A hand in a black glove dips the tip of an acrylic brush into a jar of pink acrylic powder, a round glossy bead of acrylic on the brush tip" } },
        { p: "Of the four, acrylic is the hardest. It takes length easily, so it suits people who want long, sturdy nails. In return, the liquid has a strong smell, and a salon working with acrylic needs extraction right at the desk. Acrylic also needs regular infills, usually every 2–3 weeks, because as the nail grows the acrylic moves forward and the nail becomes top-heavy." },
        { img: { src: img("bo-mong-dap-bot-mau-hong-tu-nhien"), alt: "A client's hands on a cream hand cushion, ten acrylic nails in a natural pink with an even soft square shape", caption: "Acrylic can look very natural. It does not have to be long or thick." } },
        { p: "Acrylic dissolves in acetone, but much more slowly than gel. The technician files the acrylic down, wraps it to soak, then gently pushes away what has softened. This is a job for the salon, not something to do at home. The technique is covered in [what are acrylic nails](lesson:dap-bot-hieu-dung)." },
      ],
    },
    {
      id: "what-is-gel-x",
      title: "What is Gel-X?",
      blocks: [
        { p: "Gel-X is a ready-shaped tip made of soft gel that covers the whole nail. The technician picks the right size for each nail, places it over the natural nail and fixes it with gel. Because the tips are moulded in advance, all ten nails have the same shape, and the appointment is usually quicker than building each nail up in layers." },
        { p: "Gel-X comes off with a soak. It is a good choice if you want ten perfectly matching nails without spending a long time in the salon chair." },
        { h3: "Gel needs a lamp, acrylic does not" },
        { p: "Gel polish, BIAB and the gel that fixes Gel-X all harden only under a lamp. The lamp has to be the type the product maker specifies, used for the full time. If your fingers feel hot or burning in the lamp, tell your technician: taking your hand out for a few seconds and putting it back is normal, and there is no need to grit your teeth." },
        { img: { src: img("ho-den-led-cho-gel-cung-lai"), alt: "A client's hand lies flat inside a white dome-shaped LED nail lamp glowing violet on a marble desk" } },
      ],
    },
    {
      id: "gel-or-acrylic",
      title: "Gel or acrylic nails? Choose by your own nails",
      blocks: [
        { p: "Do not choose by the prettiest photo online. Choose by your natural nails and how you use your hands every day. The shape is a separate choice; see [5 nail shapes on the same hand](lesson:5-dang-mong)." },
        {
          ul: [
            "**Healthy nails, you like to change colour often:** gel polish.",
            "**Thin nails that break easily, you want natural length:** BIAB.",
            "**You want long, hard nails that cope with knocks:** acrylic.",
            "**You want the same shape on every nail, done quickly:** Gel-X.",
          ],
        },
        { p: "If your nails are thin, sore, discoloured or show anything unusual, hold off on all four and ask a doctor or pharmacist first. The article [do nails need to breathe between gel manicures](lesson:mong-co-can-tho) explains when a break makes sense." },
        { img: { src: img("tho-nail-tu-van-chon-loai-mong-cho-khach"), alt: "A nail technician in a cream top and black gloves holds a client's hand and smiles as she advises her at a marble desk in an elegant salon", caption: "Tell your technician where your nails tend to break and what you do with your hands. That leads to a better match than guessing." } },
        { note: "Gel, BIAB, acrylic or Gel-X: when an edge starts to lift, do not pick at it. The coating bonds tightly to the top layer of the nail, so prising it off strips your natural nail with it. See [what peeling off gel polish does to your nails](lesson:tu-cay-son-gel).", kind: "warn", title: "Lifting? Leave it alone" },
      ],
    },
    {
      id: "book-and-ask",
      title: "Ask first, then book",
      blocks: [
        { p: "Not sure which one suits your nails? Message the salon first with a photo of your nails as they are now. On VaraaAi you can [chat with the salon](lesson:chat-voi-salon) to ask, then [book online](lesson:dat-lich-online): choose the service, choose the time, done. This lesson comes from Moja Beauty in Helsinki, and you can see its services and book on [Moja Beauty's booking page](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "What is the difference between BIAB and gel polish?",
      a: "Gel polish is a thin, flexible colour layer that is mainly there for colour and does not make the nail stronger. BIAB is a much thicker builder gel that cures into a supporting structure over the natural nail. Gel polish suits healthy nails; BIAB suits thin nails that break easily.",
    },
    {
      q: "Is BIAB or gel polish better for weak nails?",
      a: "Thin, soft nails that bend and break easily usually do better with BIAB, because the builder gel stops the nail being bent back every day. BIAB does not make nails grow faster or repair them; it protects them so they can grow without breaking.",
    },
    {
      q: "Which lasts longer, acrylic or gel polish?",
      a: "Acrylic is the hardest of the common nail treatments and takes length easily. Gel polish is thin and flexible and, done properly, looks good for about three weeks. Acrylic needs regular infills, usually every 2–3 weeks, because the nail grows and pushes the acrylic forward.",
    },
    {
      q: "What is Gel-X and how is it different from acrylic?",
      a: "Gel-X is a ready-shaped soft gel tip that is placed over the natural nail and fixed with gel, so all ten nails match and the work is quick. With acrylic, the technician shapes each nail from powder mixed with liquid, and it hardens in the air. Gel-X comes off with a soak.",
    },
    {
      q: "How long does BIAB last before an infill?",
      a: "An infill is usually due every 3–4 weeks, because the nail grows and the gel moves towards the tip, making the nail top-heavy and easier to break. If the old layer is still well bonded, the technician files it thinner and builds up the new growth without removing everything.",
    },
    {
      q: "Can I take off gel, BIAB or acrylic at home?",
      a: "Do not pick or peel it off. These coatings bond tightly to the top layer of the nail, so prising them off takes your natural nail with them. Let the salon remove them by filing down and soaking with remover, following the manufacturer's instructions.",
    },
  ],
  related: ["5-dang-mong", "tu-cay-son-gel", "mong-co-can-tho", "builder-gel-hieu-dung"],
};

export default article;
