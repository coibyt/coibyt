import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-tay-chan/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-do-a-spa-pedicure-and-manicure",
  lesson: "spa-tay-chan",
  category: "spa",
  title: "How to do a spa pedicure and manicure: 14 steps with soak, scrub, massage and paraffin",
  metaTitle: "How to do a spa pedicure: 14 steps with paraffin hands",
  metaDescription:
    "How to do a spa pedicure and manicure step by step: lined basin, soak, scrub, cuticles, heels, foot massage, mask, hand massage, paraffin wax and basin clean-up.",
  keyword: "how to do a spa pedicure",
  keywords: [
    "spa pedicure steps",
    "paraffin hand treatment steps",
    "how to give a foot massage",
    "hand massage technique",
    "how to smooth heels with a foot file",
    "how long to soak feet",
  ],
  excerpt: "A spa foot treatment followed by a hand treatment with paraffin, step by step and with no polish. With the numbers to remember and six common mistakes.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-cham-soc-tay-cho-khach-ben-cua-so"),
    alt: "A therapist sits at a small table by an arched window holding the hand of a client in a white robe seated in an armchair, her bare feet on the stone floor",
  },
  takeaways: [
    "The whole session usually takes **45 minutes to an hour**, depending on the treatment, and there is no polish.",
    "A new liner in the foot basin; metal pedicure tools still sealed in their sterilisation pouch, opened in front of the client; a new single-use file and buffer for each client.",
    "Soak the feet for about five to ten minutes in warm water tested on your own wrist. Dry them well, between the toes too.",
    "Heels: **file a little, feel a lot**. Smooth is enough, no blades, and if the client feels it sting you have gone too far.",
    "Paraffin goes into a separate bowl, is brushed on and left for about ten minutes as the manufacturer says. If it feels too hot to the client, stop and peel it off straight away.",
  ],
  intro: [
    "How to do a spa pedicure, as taught here, has two halves: a foot treatment, then a hand treatment with paraffin. There is no polish at any stage. The whole session usually takes about forty-five minutes to an hour, depending on your salon's treatment, and the two halves overlap: while the client's feet rest under a mask, you move on to her hands.",
    "This article follows the VaraaAi Academy lesson “Spa hand and foot treatments: step by step” in the Spa & skin care course. By the end you can carry out the whole session in fourteen steps, from fitting the basin liner to scrubbing the basin after the client leaves. Timing and products follow your salon's treatment and the manufacturer's instructions.",
  ],
  sections: [
    {
      id: "before-the-feet-go-in",
      title: "Before the client's feet go into the basin",
      blocks: [
        { p: "Three things are done before you run the water: a new liner is in the basin, the tools are ready, and you have asked the client about her health. The question about diabetes and circulation shapes the whole session, because for those clients the water must be only lukewarm, the soak shorter and there is no hot paraffin." },
        { p: "Two small extra questions make the session more pleasant: which scent she likes, and whether she would like to chat or to rest." },
        { note: "Open the metal pedicure tools from their sterilisation pouch right in front of the client. Seeing it reassures her, and you do not need to explain anything.", kind: "tip", title: "From the trade" },
        { p: "Why a lined basin still has to be scrubbed, which signs on the feet mean no treatment, and how to care for clients with diabetes are explained in [What is a spa pedicure](lesson:spa-tay-chan-hieu-dung)." },
      ],
    },
    {
      id: "numbers-to-remember",
      title: "The numbers to remember: how long to soak, how long the paraffin stays on",
      blocks: [
        {
          table: {
            head: ["Step", "Time", "Note"],
            rows: [
              ["Whole session", "About 45 minutes to an hour", "Depends on your salon's treatment"],
              ["Foot soak", "About 5–10 minutes", "As the treatment says; warm, not hot"],
              ["Foot mask", "About 10 minutes", "As the manufacturer says"],
              ["Fingertip soak", "A few minutes", "A bowl of warm water"],
              ["Paraffin on the hands", "About 10 minutes", "As the manufacturer says; stop at once if it feels too hot"],
            ],
          },
        },
        { p: "These are the usual figures in the lesson. The right figures for your salon are in your salon's treatment and on the product labels." },
      ],
    },
    {
      id: "common-mistakes",
      title: "Six common mistakes in a spa pedicure and manicure",
      blocks: [
        {
          table: {
            head: ["Mistake", "Do this instead"],
            rows: [
              ["Soaking water too hot", "Warm water, tested on your own wrist first"],
              ["Soaking too long", "About five to ten minutes, as the treatment says"],
              ["Filing the heels until the client feels it sting", "A few light strokes, feel, stop when smooth"],
              ["Cutting into the living skin around the nail", "Only push back gently after softener"],
              ["Reusing the previous client's file", "Files and buffers are single-use: a new set for every client"],
              ["Forgetting to dry between the toes", "Dry between every toe, because damp skin there is exactly what fungus likes"],
            ],
          },
        },
        { p: "Avoid these six and the client will feel the treatment is clean and safe." },
      ],
    },
    {
      id: "basin-and-tools",
      title: "Cleaning the basin and tools after every client, and at the end of the day",
      blocks: [
        { p: "The order for the basin never changes: remove the liner, clean with soap and a brush, rinse, then disinfect for the full contact time on the label. Metal tools are cleaned and then sterilised, following the routine in the lesson [Tools after every client](lesson:ve-sinh-dung-cu). At the end of the day, clean more thoroughly, especially a whirlpool basin, as the manufacturer instructs." },
        { note: "The hygiene rules here use the [City of Helsinki guidance](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf) as an example, under which pedicure tools are always sterilised and stored separately. Rules differ from country to country. No blades unless you are trained and allowed to use them. This article is a training aid, not a licence.", kind: "warn", title: "Rules differ by place" },
      ],
    },
    {
      id: "advice-and-notes",
      title: "Advice for the client and notes for next time",
      blocks: [
        {
          ul: [
            "Moisturise hands and feet every day.",
            "Deep or painful cracks in the heels, or an ingrown toenail: see a podiatrist.",
          ],
        },
        { p: "In VaraaAi you note in the client's internal notes in your [client list](lesson:khach-hang) how the skin looked, the pressure she likes and the products used. When you [add the service](lesson:dich-vu) to your booking page, set a length that leaves time for scrubbing the basin after the client leaves." },
      ],
    },
  ],
  howTo: {
    title: "Spa pedicure and manicure steps, in order",
    id: "spa-pedicure-steps",
    after: "before-the-feet-go-in",
    lead: "The fourteen steps follow the order of the lesson video: the feet first, the hands while the feet rest under the mask, then both are finished.",
    supplies: [
      "A foot basin and single-use liners; a small bowl for soaking the fingertips",
      "Metal pedicure tools, sterilised and still in their sealed pouch",
      "Single-use files and buffers, and a foot file",
      "A fine scrub, cuticle softener, massage cream, moisturiser",
      "A foot mask, thin wrap and warm towels, if the treatment includes them",
      "Paraffin, a separate bowl, a brush, thin plastic bags and terry mitts",
      "Gloves, clean towels, a cushion",
    ],
    steps: [
      {
        name: "Prepare the chair, basin and tools",
        text: "Disinfect the chair, table and cushion, then fit a new liner in the foot basin. Metal pedicure tools must already be sterilised, still in their sealed pouch, and opened in front of the client. Files and buffers are single-use: a new set for every client.",
      },
      {
        name: "Ask the client and run the water",
        text: "Ask whether she has diabetes, poor circulation, allergies or any wounds; ask too which scent she likes and whether she would like to chat or to rest. Fill the lined basin with warm water and test it on your own wrist: warm, comfortable, not hot. With a client who has diabetes, take even more care.",
      },
      {
        name: "Check the feet, then soak",
        text: "Wash your hands and put on gloves. Look closely at the feet, the soles and between the toes. Peeling or cracked skin between the toes, thick discoloured nails or a wound mean you leave that area alone and suggest a doctor. If all is well, invite the client to put her feet in the basin and soak for about five to ten minutes, as the treatment says.",
        image: { src: img("ngam-chan-trong-bon-lot-tui-nuoc-am"), alt: "A client's two feet soak in a white porcelain basin fitted with a clear liner, a few white petals floating in the warm water, the basin standing on a white towel", caption: "A lined basin, warm water, about five to ten minutes." },
      },
      {
        name: "Exfoliate the feet",
        text: "Lift one foot out onto a towel. Rub the scrub in gentle circles from the toes over the top of the foot to the ankle, with more attention on the heel. Use only a fine scrub such as sugar or fine salt, because large, sharp grains scratch the skin easily; avoid any broken skin. Rinse in the basin, dry, then do the other foot.",
        image: { src: img("tay-da-chet-ban-chan-xoa-vong-nhe"), alt: "A therapist in black gloves supports a client's foot on a white towel and rubs scrub over the top of the foot, the jar of product beside her" },
      },
      {
        name: "Care for the toenail cuticles",
        text: "Dry the feet, between the toes too. Apply cuticle softener, wait as the manufacturer says, then push back gently with a sterilised pusher. Never cut the living skin. If the nails are long, cut them straight across and soften the corners lightly with a file, as in the article [How to do a manicure and pedicure](lesson:cham-soc-mong-co-ban).",
      },
      {
        name: "Smooth the heels",
        text: "Use a foot file lightly and evenly, as its maker instructs. Make a few strokes, feel the skin, and only carry on if needed: file a little, feel a lot. Smooth is enough; there is no need to remove all the callus, and no blades. If the client feels it sting, you have gone too far.",
        image: { src: img("cha-got-chan-bang-ban-cha-nhe-tay"), alt: "A hand in a black glove holds a foot file against the client's heel while the other hand supports the foot on a cream towel", caption: "File lightly and evenly, stopping to feel after a few strokes." },
      },
      {
        name: "Massage the feet",
        text: "Apply massage cream. Make long strokes from the toes up to the ankle and the calf, towards the heart. Use your thumbs to make small circles along the sole, then stroke each toe gently. Ask whether the pressure is right, and never press on varicose veins. Finish each foot with a few long strokes, slowing down, then wrap it in a warm towel so the client does not get cold.",
        image: { src: img("massage-ban-chan-vuot-ve-phia-tim"), alt: "Two hands in black gloves hold a client's foot resting on a cream towel, one on the top of the foot and one supporting the heel, in the middle of a stroke" },
      },
      {
        name: "Apply a foot mask, if the treatment includes one",
        text: "Apply a layer of mask, cover the feet in thin wrap, then wrap them in warm towels, for about ten minutes as the manufacturer says. While the client relaxes, move on to her hands.",
        image: { src: img("u-mat-na-chan-boc-mang-va-khan-am"), alt: "The client's two feet are covered in thin clear wrap while the therapist wraps a warm white towel around each foot resting on a cushion", caption: "Thin wrap and warm towels; the feet rest while you work on the hands." },
      },
      {
        name: "Soak and exfoliate the hands",
        text: "Soak the fingertips in a bowl of warm water for a few minutes, then dry them. Exfoliate more lightly than the feet, because the skin of the hands is thinner. Then push back the cuticles gently, as with the feet.",
        image: { src: img("ngam-dau-ngon-tay-trong-bat-nuoc-am"), alt: "A client's fingertips soak in a small white porcelain bowl of warm water on a stone table, her other hand on a cream towel, the therapist sitting opposite" },
      },
      {
        name: "Massage the hands",
        text: "Take off your gloves and wash your hands. Stroke the back of the hand with both thumbs, from the knuckles towards the wrist. Make gentle circles in the palm, then stroke along each finger from the base to the tip. Moderate pressure, slow and even. Finish with a few long strokes from the back of the hand up the forearm, slowing down.",
        image: { src: img("massage-mu-ban-tay-bang-hai-ngon-cai"), alt: "A therapist holds a client's hand on a cream towel with both hands, her two thumbs stroking the back of the hand, the client relaxing behind" },
      },
      {
        name: "Brush on paraffin and let the hands rest",
        text: "Check the temperature as the manufacturer says, then test it on your own wrist; use it only on intact skin. Take paraffin out into a separate bowl and never dip the client's hand into the shared heater. Brush a few layers over the back and palm of the hand, cover with a thin bag, put on a terry mitt and leave for about ten minutes, as the manufacturer says. If it feels too hot to the client, stop and peel it off straight away.",
        image: { src: img("u-paraffin-tay-boc-tui-va-bao-tay-bong"), alt: "A client's two hands rest on a cream towel, one in a thin clear bag and the other already in a cream terry mitt, which the therapist is adjusting", caption: "After the paraffin comes a thin bag, then a terry mitt to keep the warmth in." },
      },
      {
        name: "Peel off the paraffin and apply moisturiser",
        text: "Remove the mitt and peel the paraffin off in one piece. Used paraffin is thrown away. Apply hand cream with gentle strokes. Then unwrap the feet, wipe off the mask and apply foot cream. Take one last look at the skin of the hands and feet for any redness or soreness.",
        image: { src: img("boc-lop-paraffin-khoi-ban-tay"), alt: "A therapist peels a milky white layer of paraffin off the back of a client's hand in one piece, the hand resting on a stone table" },
      },
      {
        name: "Give advice and take notes",
        text: "Advise the client to moisturise her hands and feet every day. Deep or painful cracks in the heels, or an ingrown toenail, should be seen by a podiatrist. Note in the client's notes how the skin looked, the pressure she likes and the products used.",
      },
      {
        name: "Tidy up",
        text: "Remove the liner, clean the basin with soap and a brush, rinse, then disinfect for the full contact time on the label. Metal tools are cleaned and then sterilised. Towels go into a lidded laundry basket. Wipe the chair and [wash your hands](lesson:rua-tay-gang-tay).",
      },
    ],
  },
  faq: [
    {
      q: "What are the steps of a spa pedicure and manicure?",
      a: "For the feet: prepare a lined basin, ask the client about her health, check the feet, soak, exfoliate, care for the cuticles, smooth the heels, massage and apply a foot mask if included. For the hands: soak the fingertips, exfoliate lightly, massage and apply paraffin. The session ends with moisturiser, advice and the clean-up, and there is no polish.",
    },
    {
      q: "How long does a spa pedicure and manicure take?",
      a: "Usually about forty-five minutes to an hour, depending on the salon's treatment. Within that, the feet soak for about five to ten minutes, and the foot mask and the paraffin on the hands each take about ten minutes as the manufacturer says.",
    },
    {
      q: "How do you do a paraffin hand treatment in a salon?",
      a: "Check the temperature as the manufacturer says and test it on the therapist's own wrist, on intact skin only. Take paraffin into a separate bowl, brush a few layers over the back and palm of the hand, cover with a thin bag and a terry mitt and leave for about ten minutes. Then peel it off in one piece, throw the used paraffin away and apply moisturiser.",
    },
    {
      q: "How do you file heels without making them sore?",
      a: "Use a foot file lightly and evenly, a few strokes at a time, then stop and feel the skin. Smooth heels are enough; there is no need to remove all the callus, and no blades are used. If the client feels it sting, the filing has gone too far.",
    },
    {
      q: "Which direction do you stroke in a foot massage?",
      a: "Long strokes go from the toes up to the ankle and the calf, towards the heart. The thumbs make small circles along the sole, then each toe is stroked gently. Never press on varicose veins, and ask the client whether the pressure is right.",
    },
    {
      q: "Why must you dry between the toes after soaking?",
      a: "Damp skin between the toes is exactly what fungus likes. After the soak and after rinsing off the scrub, the feet need to be dried thoroughly, between every toe, before the next steps.",
    },
  ],
  related: ["spa-tay-chan-hieu-dung", "cham-soc-mong-co-ban", "spa-massage-body", "ve-sinh-dung-cu"],
};

export default article;
