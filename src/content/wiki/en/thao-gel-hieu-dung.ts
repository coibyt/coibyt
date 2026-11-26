import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thao-gel-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "does-gel-removal-damage-nails",
  lesson: "thao-gel-hieu-dung",
  category: "nail",
  title: "Does gel removal damage nails? Why nails go thin and weak after gel, and when they need a break",
  metaTitle: "Does gel removal damage nails? Why nails go thin and weak",
  metaDescription:
    "Does gel removal damage nails? Why nails are harmed at removal, not application, soak-off vs hard gel, what acetone does to skin and nails, when to take a break.",
  keyword: "does gel removal damage nails",
  keywords: [
    "thin weak nails after gel",
    "is peeling off gel bad for your nails",
    "how long do nails take to grow back",
    "soak-off gel vs hard gel",
    "does acetone damage your skin",
    "should you give your nails a break from gel",
    "removing gel with an e-file",
  ],
  excerpt: "Most nail damage happens at removal, not when the gel goes on. Peeling and scraping are to blame. Why, and how to take gel off so nails stay thick and healthy.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("u-acetone-thao-gel-quan-giay-bac-nam-ngon"),
    alt: "A client's hand rests on an arm cushion, all five fingertips wrapped tightly in foil to soak off gel, a small hourglass beside it",
  },
  takeaways: [
    "Most nail damage happens **at removal**, not at application. Peeling and scraping are to blame, not the gel itself.",
    "A thinned nail does not thicken again. Fingernails grow about 3 mm a month, so a completely new nail takes roughly 4–6 months.",
    "Identify the product before you start: **soak-off gel** softens in acetone, **hard gel** does not dissolve and has to be filed.",
    "Gel must puff up, crack and lift by itself. Where it still holds, re-wrap and soak longer; never scrape.",
    "Acetone is highly flammable, vapour included: work with ventilation, away from flames and heat, and close the bottle straight after use.",
  ],
  intro: [
    "Does gel removal damage nails? The question usually comes after a set that left the nails thin, rough and sore. The client sits down, holds out her hands and says her nails have been so weak lately, it must be the gel. Ask a little more and it turns out that last time she saw a corner lifting and peeled the whole lot off at home, or a technician in a hurry scraped it off with a pusher. In most cases it is the wrong way of removing gel that ruins the nail, not the gel itself.",
    "This article follows the VaraaAi Academy lesson “Gel removal: understand it so the nail survives” in the Nails course, the theory half of the gel removal topic. You will understand what happens to the nail plate when gel is peeled, why the top coat has to be broken, what acetone does to skin and nail, and when to advise a client to give her nails a break. The hands-on steps are in [How to remove gel polish](lesson:thao-gel).",
  ],
  sections: [
    {
      id: "why-nails-get-damaged",
      title: "Why nails go thin and weak after gel removal",
      blocks: [
        { p: "The nail plate is made of keratin in very many thin layers, stacked like the pages of a book. Cured gel bonds very firmly to the top layer, often more firmly than the layers of the nail hold on to each other." },
        { p: "So when gel is peeled, it does not come away cleanly. It pulls several layers of natural nail with it, leaving white, rough patches on a nail that is now thin and weak. Hard scraping with a metal pusher does the same damage by another route." },
        { img: { src: img("mong-mong-san-trang-sau-khi-cao-gel"), alt: "Close-up of a nail after the gel was scraped off, the surface blotched with rough white patches and a few flakes of red gel left behind", caption: "The result of forcing it off: a white, rough surface where the top layers of the nail have gone." } },
        { img: { src: img("tu-lot-son-gel-o-nha"), alt: "Close-up of a woman's two hands, one fingernail prising up and peeling red gel polish off a nail on the other hand", caption: "What not to do: spotting a lifted corner and peeling the rest off." } },
        { note: "A corner that has already lifted is not an invitation to prise the rest up. The remaining gel is still bonded firmly to the natural nail.", kind: "warn", title: "Lifted gel has not let go" },
      ],
    },
    {
      id: "how-long-to-grow-back",
      title: "Can thin nails thicken again, and how long do they take to grow back",
      blocks: [
        { p: "The part of the nail that has been thinned cannot thicken again. The nail plate is dead tissue; it does not heal the way skin does. The only way back is to wait for new nail to grow out and replace it." },
        { p: "Fingernails grow slowly, only about 3 mm a month. That means it takes four to six months to have a completely new nail. One minute of quick peeling, and the client pays for it for half a year." },
        { p: "That figure is also the honest answer when a client asks when her nails will be strong again. Oil keeps nail and skin from drying out, but it cannot replace nail that has been lost." },
      ],
    },
    {
      id: "soak-off-vs-hard-gel",
      title: "Soak-off gel vs hard gel: why the difference matters at removal",
      blocks: [
        { p: "To remove gel properly, you first need to know what is on the nail. There are two groups, and they come off in completely different ways." },
        {
          table: {
            head: ["Group", "What it includes", "How it comes off"],
            rows: [
              ["Soak-off gel", "Most gel polishes and some soft builder gels", "Soak in acetone until it softens, then push gently"],
              ["Hard gel", "Products acetone cannot break down, however long you soak", "File down thin, leaving a thin layer of base"],
            ],
          },
        },
        { p: "If a client comes from another salon and you do not know what she is wearing, ask her, test on one nail first and always read the brand's removal instructions." },
        { h3: "The top coat is the set's raincoat" },
        { p: "Top coat is made to resist chemicals and scratches. With the top coat intact, acetone cannot get in; after half an hour of soaking the gel is still untouched, the technician gets impatient and reaches for the pusher. So before soaking, file lightly with a 180 grit file until all the shine is gone. File only the top coat: stop as soon as the dust turns the colour of the polish, and never file into the natural nail." },
        { img: { src: img("lop-top-gel-da-dua-mat-do-bong"), alt: "Close-up of a red gel nail that has been lightly filed, the surface evenly matt with no shine left, the fingertip supported by a black glove", caption: "The top coat has been broken: an even matt surface that acetone can get into." } },
        { h3: "Let the chemical do the work, not your hands" },
        { p: "A pad soaked in acetone is placed exactly on the nail, then wrapped tightly in foil or held with a clip. Soaking usually takes 10–15 minutes, but every brand is different, so follow the product's instructions. When you open it, the gel should puff up and crack by itself, and a gentle push with a wooden stick moves it off. Where it still holds, do not scrape. Re-wrap and soak a few minutes more. Five more minutes of patience saves the client's nail." },
        { h3: "Removing gel with an e-file" },
        { p: "An e-file is for properly trained hands only. In unsteady hands it can cut into the natural nail within seconds: the client feels burning, and the nail is left with grooves and rings. People who do it right follow one rule: do not take it all off, always leave a very thin layer of base. That layer protects the natural nail and grows out with it. If you have not been trained on an e-file, file by hand. It is slower, but it is safe." },
        { img: { src: img("thao-gel-bang-may-mai"), alt: "A gloved hand holds an e-file, its cylindrical bit touching the surface of a client's red gel nail", caption: "An e-file takes gel down very fast, which is why it is for trained technicians only." } },
      ],
    },
    {
      id: "acetone",
      title: "What acetone does to skin and nails, and why to keep it away from flames",
      blocks: [
        { p: "Acetone removes gel very well, but it also strips oil and water from skin and nails. That is why nails look white and dry after removal. It is temporary dehydration, not damage, and oil helps." },
        { img: { src: img("mong-that-kho-trang-sau-khi-thao-gel"), alt: "Close-up of a bare natural nail with a matt, slightly pale surface, the fingertip supported by a hand in a black glove", caption: "A nail fresh out of gel removal often looks a little white and dry from temporary dehydration." } },
        { p: "Two ways to reduce what acetone does to the skin:" },
        {
          ul: [
            "Apply oil or cream to the skin around the nail before soaking, keeping it off the nail plate.",
            "Use only a small pad, exactly the size of the nail. Do not let the chemical flood the whole finger.",
          ],
        },
        { h3: "Two things about acetone to know by heart" },
        {
          ol: [
            "**Acetone is highly flammable, and its vapour catches fire too.** At the removal table: no candles, no flames, no smoking. Never warm acetone over a flame or in a microwave.",
            "**In a closed room, acetone vapour causes headaches and dizziness.** Run the ventilation, close the bottle right after use and put used cotton in a bin with a lid.",
          ],
        },
        { img: { src: img("chai-acetone-va-nen-dang-chay-tren-ban"), alt: "A glass pump bottle of clear liquid on a stone table with cotton pads and foil, a lit candle standing close by", caption: "A scene that has no place at a removal table: a burning candle next to a bottle of acetone." } },
      ],
    },
    {
      id: "dust-and-gloves",
      title: "Gel filing dust and gloves: the part that protects you",
      blocks: [
        { p: "Filing or drilling gel sends dust into the air. If that gel was not fully cured, the dust still contains uncured material, which causes allergies. This kind of allergy comes slowly, but once you have it, it is usually for life." },
        {
          ul: [
            "Wear gloves for gel removal.",
            "Use dust extraction if you have it.",
            "Do not brush dust away with bare hands, and do not blow it.",
            "Nitrile gloves break down quickly in acetone, so change them as soon as they are wet.",
          ],
        },
        { img: { src: img("dua-gel-tren-mieng-hut-bui-tai-ban"), alt: "A nail technician in a mask and black gloves files a client's nail right above a round dust extraction vent set into the table" } },
        { p: "How gel allergy develops is explained in [Allergies and chemicals](lesson:di-ung-hoa-chat), and choosing and changing gloves in [Hand hygiene, gloves and protective wear](lesson:rua-tay-gang-tay)." },
      ],
    },
    {
      id: "when-nails-need-a-break",
      title: "When to give your nails a break from gel",
      blocks: [
        { p: "Removal is not the end of the job. It is the only moment you see the client's natural nail, so look closely." },
        {
          table: {
            head: ["What you see", "What to do"],
            rows: [
              ["A slightly white, dry nail, not sore", "Temporary dehydration. Apply oil; a healthy nail can be redone"],
              ["A thin, soft nail that is sore when pressed", "Advise a break from gel for a while, with oil every day"],
              ["Plate lifting from the nail bed, green or yellow discolouration, thickening, crumbling; skin around the nail swollen, red, painful or with pus", "Stop, do not paint over it to hide it, and advise a doctor"],
            ],
          },
        },
        { p: "Many people say nails need a break to “breathe”. In fact nails do not breathe; they are fed by blood from underneath. A nail needs a break so that the damaged part has time to grow out completely." },
        { img: { src: img("mong-doi-mau-tach-nen-sau-khi-thao-gel"), alt: "Close-up of a natural nail with a yellowed area that is slightly lifting at the side, the fingertip supported by a black glove", caption: "A discoloured nail lifting from the nail bed: do not cover it with polish; advise a doctor." } },
        { p: "Technicians are not doctors: we do not diagnose and we do not treat. Tell the client gently what you see and suggest a check-up. How to say it without offending her is covered in [When not to treat a customer](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "hygiene-and-notes",
      title: "Hygiene after removal and notes for the next appointment",
      blocks: [
        { p: "Foil, cotton, wooden sticks and files: a new set for every client, thrown away after use. Metal pushers are washed, disinfected and sterilised like every other metal tool. Reusable soaking clips are cleaned and disinfected after every client. Rules on chemicals, ventilation and waste differ by country and city, so ask the health authority where you work." },
        { p: "The type of gel on a client's nails and the state of the nails after removal are worth writing down. In VaraaAi, note them in the [customer book](lesson:khach-hang) so you do not have to test again next time, and [add gel removal as a service](lesson:dich-vu) with its own time so nobody has to rush it." },
        { note: "A good technician is one whose clients, after many years of gel, still have nails as thick and healthy as on the first day. Gel removal does not need strong hands. It needs understanding and patience.", kind: "tip", title: "The measure of skill" },
      ],
    },
  ],
  faq: [
    {
      q: "Does gel removal damage your nails?",
      a: "Done properly, it does not thin the natural nail. Most damage happens when gel is peeled or scraped off, because cured gel pulls the top layers of the nail plate away with it. Proper removal means breaking the top coat, soaking in acetone for long enough and letting the gel lift by itself.",
    },
    {
      q: "Is it bad to peel off gel polish at home?",
      a: "Yes. Cured gel grips the top keratin layers very firmly, so peeling gel off peels real nail with it. The nail is left with white, rough patches and becomes thin and weak. When a corner lifts, the best option is to go back to the salon and have it removed properly.",
    },
    {
      q: "How long do nails take to recover after gel removal?",
      a: "Nail that has been thinned does not thicken again; it has to grow out and be replaced by new nail. Fingernails grow about 3 mm a month, so a completely new nail takes roughly 4–6 months. Use oil every day in the meantime.",
    },
    {
      q: "Why won't my gel come off after soaking in acetone?",
      a: "There are two common reasons. Either the top coat was not filed through, so the acetone could not get in, or the product is a hard gel, which does not dissolve in acetone and has to be filed down. In neither case should you use force to scrape it off.",
    },
    {
      q: "Are white, dry nails after gel removal damaged?",
      a: "Usually not. Acetone strips oil and water from skin and nails, so a freshly uncovered nail looks white and dry from temporary dehydration. Oil helps. A nail that is thin, soft and sore when pressed is the sign that it needs a break.",
    },
    {
      q: "Do nails need a break from gel to breathe?",
      a: "Nails do not breathe; they are fed by blood from underneath. A healthy nail can be redone straight after removal. A thin or sore nail should have a break from gel for a while, so the damaged part has time to grow out.",
    },
  ],
  related: ["thao-gel", "gel-hieu-dung", "son-gel", "builder-gel-hieu-dung"],
};

export default article;
