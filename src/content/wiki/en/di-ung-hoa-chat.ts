import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/di-ung-hoa-chat/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "gel-nail-allergy-lash-glue-hair-dye",
  lesson: "di-ung-hoa-chat",
  category: "safety",
  title: "Gel nail allergy, lash glue and hair dye reactions: the signs and 5 rules of prevention",
  metaTitle: "Gel nail allergy, lash glue, hair dye: signs and prevention",
  metaDescription:
    "Gel nail allergy, lash glue and hair dye reactions: irritation vs allergy, why it comes late and lasts, the main culprits, five prevention rules and what to do.",
  keyword: "gel nail allergy",
  keywords: [
    "allergic reaction to lash glue",
    "hair dye allergy",
    "signs of gel polish allergy",
    "irritation vs allergy",
    "HEMA in gel polish",
    "TPO ban in the EU",
    "patch test before hair dye",
  ],
  excerpt: "Allergies in nail, lash and hair work arrive late, without warning, and usually stay for life. Most of them can be prevented with five small daily habits.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-dep-xem-chai-hoa-chat-trong-salon"),
    alt: "A dark-haired beauty therapist with a low bun and black nitrile gloves holds a small glass bottle up at eye level to look at it closely",
  },
  takeaways: [
    "**Irritation** is direct damage to the skin and heals once the contact stops. **Allergy** means the immune system has memorised a substance, and it usually lasts for life.",
    "An allergic reaction often appears 1–3 days later and may show on the eyelids, face or neck, not only where the product touched.",
    "With gel and acrylic, the risk lies in **uncured product** and in filing dust from gel that was not fully cured. Keep them off the skin.",
    "A client who has ever reacted to a dye or to a black henna tattoo is not tinted: no hair colour, no lash or brow tint.",
    "Difficulty breathing, swollen lips or face, or dizziness: call the emergency number at once (112 in the EU).",
  ],
  intro: [
    "A gel nail allergy usually starts quietly: itching on the fingertips and a few small blisters that the technician puts down to washing her hands so often. A few months later her eyelids are red and swollen, although gel has never been near her eyes. By the time she sees a doctor, her body has memorised the substance, and from then on the slightest touch of uncured gel brings it back. Some skilled technicians have had to leave the trade because of it.",
    "This article follows the VaraaAi Academy lesson “Allergies and chemicals: gel, acrylic, lash glue, dye” in the Hygiene & safety course. You will learn to tell irritation from allergy, which substances in nail, lash and hair work cause allergies most often, the five rules of prevention, and what to do when a client or you yourself react. It does not replace medical advice.",
  ],
  sections: [
    {
      id: "irritation-vs-allergy",
      title: "Irritation vs allergy: what is the difference",
      blocks: [
        { p: "The two words are often used as if they meant the same thing. They are quite different, and so is what you do about them." },
        {
          table: {
            head: ["", "Irritation", "Allergy"],
            rows: [
              ["What it is", "Direct damage to the skin from water, soap or acetone", "The immune system has memorised a substance and treats it as an enemy"],
              ["What you see", "Dry, red, cracked skin where the contact was", "Itching, redness, blisters, swelling, from a tiny amount"],
              ["How it goes", "Stop the contact, care for the skin, and it heals", "Usually for life. The only option is to avoid the substance completely"],
            ],
          },
        },
        { p: "The two are linked. Skin already cracked by irritation lets chemicals in more easily, so keeping your hands in good condition is part of preventing allergy. Skin care and the choice of gloves are covered in [Hand hygiene, gloves and protective wear](lesson:rua-tay-gang-tay)." },
      ],
    },
    {
      id: "why-allergy-comes-late",
      title: "Why you can work with gel for years and still become allergic",
      blocks: [
        { p: "An allergy gives no warning. Someone can work with gel for five years without any trouble. But every time uncured product touches the skin, the body records a little more, until one day it crosses the threshold. “I have done this for years and nothing happened” is therefore no proof of safety." },
        { p: "The reaction also tends to come late, one to three days after contact, so many people never connect it with its cause. It can show up far from where the product touched: on the eyelids, the face, the neck. Hands with product on them touch those areas, and dust and vapour drift there." },
        { img: { src: img("di-ung-gel-sung-do-mi-mat"), alt: "Close-up of a woman's face without make-up, both upper eyelids slightly swollen, pink-red and lightly flaking", caption: "Red, swollen eyelids can be a sign of allergy to nail products, even when the product never touched the eyes." } },
        { note: "A technician who has done gel for years and now has itching and blisters on her fingertips should not tell herself it cannot be an allergy after so long. That is exactly what a typical occupational allergy looks like, and the right step is to see a dermatologist early.", kind: "info", title: "The case from the lesson quiz" },
      ],
    },
    {
      id: "common-allergens",
      title: "Which substances cause allergies in nail, lash and hair work",
      blocks: [
        {
          table: {
            head: ["Work", "Common allergen", "Found in"],
            rows: [
              ["Nails", "The acrylate family", "Gel polish, builder gel, acrylic liquid, nail glue"],
              ["Lash extensions", "Cyanoacrylate", "Lash adhesive, including glues sold as sensitive"],
              ["Hair, lash and brow tints", "The dye PPD and related substances", "Tints and dyes; black henna is often mixed with it too"],
              ["Bleaching", "Fine dust from bleach powder", "Bleach powder while scooping and mixing"],
            ],
          },
        },
        { h3: "Nails: the risk is in uncured product" },
        { p: "Acrylates are strong sensitisers while they are liquid and uncured. Once fully cured they are almost harmless. What you guard against is gel on the skin before curing, gel left on bottle necks and brush handles, and filing dust from a layer that was not fully cured." },
        { h3: "Lashes: glue vapour" },
        { p: "Lash adhesive is cyanoacrylate, the same family as super glue. Its vapour stings the eyes, makes the nose run and can cause allergy in the client. The lash artist is at risk too, leaning over the glue drop for hours every day." },
        { img: { src: img("giot-keo-noi-mi-tren-da-ngoc"), alt: "A gloved hand dips a lash extension into a drop of black glue on a jade stone with tweezers, the client lying with eyes closed behind", caption: "The glue drop sits close to the lash artist's face for the whole appointment." } },
        { h3: "Tints, dyes and bleach" },
        { p: "PPD allergy can be very severe, with the whole face swelling. One question is worth asking before any tint: has the client ever had a black henna tattoo, for example on holiday? Black henna is often mixed with this very substance, so someone who has reacted to it is at risk of a severe reaction to hair dye." },
        { p: "Bleach powder rises as fine dust. Breathed in over a long time, it can make the stylist sneeze and wheeze and can even lead to asthma. Fragrances and latex gloves are further causes of allergy in the salon." },
        { img: { src: img("bot-tay-toc-bay-bui-min-khi-pha"), alt: "A gloved hand tips a scoop of pale blue bleach powder into a mixing bowl as a cloud of fine dust rises into the air" } },
      ],
    },
    {
      id: "five-rules",
      title: "Five rules to prevent gel, acrylic and glue allergies",
      blocks: [
        { p: "Occupational allergy is not bad luck. Most of it can be prevented with small habits repeated every day." },
        { h3: "1. Uncured product never touches the skin" },
        { p: "Leave a small gap to the skin when you paint. If some gets on the skin, clean it off before the hand goes into the lamp. Wipe bottle necks, brush handles and the table, because those are the places your hands touch all day. The technique is shown step by step in [How to apply gel polish](lesson:son-gel)." },
        { img: { src: img("gat-gel-dinh-da-bang-que-go-truoc-khi-ho"), alt: "A nail technician in black gloves uses the angled tip of a wooden stick to lift a streak of red gel off the skin beside a freshly painted nail" } },
        { h3: "2. Cure fully" },
        { p: "Use the lamp your gel brand specifies, cure for the full time and paint thin coats. A thick or under-cured layer stays partly liquid inside, and that is the part that sensitises." },
        { h3: "3. Nitrile gloves, changed often" },
        { p: "Gloves protect your hands, but chemicals work through them over time, so a glove with product on it is changed, not wiped and kept on." },
        { h3: "4. Keep the air clean" },
        { p: "Switch on the table extraction when you file or drill. Run the ventilation. Close each bottle right after use and use a bin with a lid. The City of Helsinki's guidance requires sufficiently efficient local exhaust at an acrylic nail station. Ventilation for the whole salon is covered in [Daily salon cleaning and the in-house control plan](lesson:ve-sinh-tiem)." },
        { img: { src: img("day-nap-chai-va-thung-rac-co-nap"), alt: "A gloved hand screws the cap onto a small glass bottle, three closed jars and a lidded bin beside it" } },
        { h3: "5. Know what you are using" },
        { p: "Buy from suppliers within Europe, with labels and ingredient lists. Ask your supplier for the safety data sheet (SDS) of each product: it tells you which gloves to wear and what first aid to give." },
        { img: { src: img("doc-nhan-thanh-phan-chai-gel"), alt: "A young nail technician in a cream top stands at a shelf of gel polishes, holding a small bottle close to read its label" } },
        { note: "In the European Union, nail products containing HEMA must carry the label warnings “For professional use only” and “Can cause an allergic reaction”. TPO has been banned in nail products since 1 September 2025: salons may not keep using it, not even stock bought earlier. Rules on chemicals differ from country to country, so check where you work.", kind: "warn", title: "HEMA and TPO in Europe" },
      ],
    },
    {
      id: "allergy-alert-test",
      title: "Allergy alert test before hair, lash and brow tinting",
      blocks: [
        { p: "For hair, lash and brow tints, many manufacturers require a skin test first, typically 48 hours before the service. Follow the product's instructions exactly and write down the test date." },
        { img: { src: img("thu-phan-ung-thuoc-nhuom-sau-tai"), alt: "A gloved hand uses a cotton bud to dab a small spot of dye on the skin behind the ear of a client with her hair in a high bun" } },
        {
          ul: [
            "A clear test is no guarantee for ever. An allergy can appear at a later appointment.",
            "A client who has ever reacted to a dye or to black henna is not tinted; suggest they ask a doctor. Leaving the dye on for a shorter time does not make it safe.",
            "In the EU, the labels of many hair dyes and lash tints must warn that they can cause severe allergic reactions and are not intended for anyone under 16. Read the label before you use a new product.",
          ],
        },
      ],
    },
    {
      id: "client-reacts",
      title: "What to do when a client reacts during a treatment",
      blocks: [
        { p: "The signs to watch for are itching, burning, redness or swelling where you are working. When a client mentions any of them, do not push on to finish." },
        {
          ol: [
            "Stop at once.",
            "Remove the product from the skin very gently.",
            "Rinse with plenty of water. If product has got into the eyes, rinse them with clean water for several minutes.",
            "Advise the client to see a doctor, and give them the product name and its ingredient list so the doctor knows what was used.",
            "Record the incident: the date, the product, the batch number and what you did.",
          ],
        },
        { img: { src: img("rua-sach-thuoc-nhuom-bang-nhieu-nuoc"), alt: "A colourist in a black apron and gloves rinses a client's hair and scalp thoroughly with the shower head while she leans back at the basin", caption: "When a client feels burning or itching during colouring, rinse the dye out with plenty of water." } },
        { note: "Difficulty breathing, swollen lips or face, or feeling faint are signs of a severe reaction. Stop and call the emergency number straight away; do not give the client water and wait to see. In the European Union the common emergency number is 112.", kind: "warn", title: "When to call an ambulance" },
        { p: "Other accidents in the salon, such as bleeding or chemicals splashing into the eyes, are covered in [Incidents: bleeding, allergic reactions, burns](lesson:xu-ly-su-co)." },
      ],
    },
    {
      id: "if-it-is-you",
      title: "If the person with the allergy is you",
      blocks: [
        { p: "Do not hide it, and do not treat it yourself and carry on working. See a dermatologist early. Patch testing can identify the exact substance you are allergic to. People who find out early and change how they work often manage to stay in the trade." },
        { img: { src: img("tho-nail-di-kham-bac-si-da-lieu"), alt: "A dermatologist in a white coat examines the hands of a young beauty therapist under a magnifying lamp in a bright clinic" } },
        { h3: "Keep records, with the client's consent" },
        { p: "Good records mean you do not have to remember who is allergic to what. For each client, note known allergies, test dates and the products used. In VaraaAi the place for this is the internal notes on the client's profile, which only the salon can see. The [customer book](lesson:khach-hang) has its own lesson." },
        { p: "Product names and brands are also easier to look up when the salon's supplies are entered in [inventory](lesson:kho-hang) as soon as a delivery arrives." },
      ],
    },
  ],
  faq: [
    {
      q: "What are the signs of a gel nail allergy?",
      a: "Usually itching, redness, small blisters or swelling on the fingertips and around the nails, appearing one to three days after contact. The reaction can also show on the eyelids, face or neck. If you notice these signs, stop contact with gel and see a dermatologist.",
    },
    {
      q: "Does a gel nail allergy go away?",
      a: "Once the body is allergic to a substance, it is usually for life, and from then on even a tiny amount causes a reaction. The only option is to avoid that substance completely. A dermatologist can do patch testing to find out exactly which substance it is.",
    },
    {
      q: "Can you become allergic to gel after years without problems?",
      a: "Yes. An allergy gives no warning: every time uncured product touches the skin the body records a little more, until one day the threshold is crossed. That is why keeping uncured gel off the skin matters for experienced technicians as much as for beginners.",
    },
    {
      q: "Can sensitive lash glue cause an allergic reaction?",
      a: "It can. Lash adhesive is cyanoacrylate, and a glue sold as gentle or sensitive is still the same substance. Its vapour stings the eyes, makes the nose run and can cause allergy in the client and in the lash artist who works over the glue for hours a day.",
    },
    {
      q: "How long before hair dye should you do a patch test?",
      a: "Many manufacturers require a skin test typically 48 hours before the service, following the product's own instructions. A clear test is no guarantee for ever. A client who has ever reacted to a dye or to black henna should not be tinted.",
    },
    {
      q: "Is TPO in gel polish banned?",
      a: "In the European Union, TPO has been banned in nail products since 1 September 2025, including stock a salon bought earlier. Rules differ from country to country, so check the ones that apply where you work and read the ingredient lists of the products on your shelf.",
    },
  ],
  related: ["rua-tay-gang-tay", "khi-nao-khong-lam", "xu-ly-su-co", "gel-hieu-dung"],
};

export default article;
