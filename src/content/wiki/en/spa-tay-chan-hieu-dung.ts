import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-tay-chan-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-a-spa-pedicure-and-spa-manicure",
  lesson: "spa-tay-chan-hieu-dung",
  category: "spa",
  title: "What is a spa pedicure and spa manicure? Soaking, scrubs, heels, paraffin and foot bath hygiene",
  metaTitle: "What is a spa pedicure? Soak, heels, paraffin and hygiene",
  metaDescription:
    "What a spa pedicure and manicure include: soak, scrub, heels, massage and paraffin, plus foot bath hygiene, when not to treat and clients with diabetes.",
  keyword: "spa pedicure",
  keywords: [
    "what is a spa manicure",
    "paraffin wax treatment for hands and feet",
    "how long to soak feet for a pedicure",
    "should you remove hard skin on heels",
    "pedicure with diabetes",
    "pedicure foot bath hygiene",
    "hand and foot scrub",
  ],
  excerpt: "A spa hand and foot treatment is soaking, exfoliation, cuticle care, smoother heels, massage and paraffin, with no polish. The client comes to rest; the therapist's job is to keep her feet safe.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-ngam-chan-trong-buoi-cham-soc-tay-chan-tai-spa"),
    alt: "A client in a white robe sits in an armchair soaking both feet in a lined porcelain basin while a therapist in black gloves sits on a low stool beside her, chatting",
  },
  takeaways: [
    "A spa hand and foot treatment means soaking, exfoliation, cuticle care, smoothing the heels, massage and a mask or paraffin. **No nail art, no gel polish.**",
    "A basin liner does not replace cleaning: after every client remove the liner, scrub the basin with soap and a brush, rinse, then disinfect for the full contact time.",
    "Look closely at the feet, hands and between the toes before soaking. If something looks abnormal, leave that area alone and suggest a doctor.",
    "Clients with **diabetes** or poor circulation: lukewarm water only, a short soak, no blades, no cutting, no hot paraffin.",
    "Hard skin on the heels only needs to be smooth, not gone. Paraffin goes into a separate bowl; a client's hands or feet never go into a shared heater.",
  ],
  intro: [
    "A spa pedicure is not a nail service. There is no nail art and no gel polish. A session means soaking, exfoliation, cuticle care, smoothing the heels and massage, then a mask or paraffin; a spa manicure does the same for the hands. The client comes to rest. Yet the feet are also where fungus and infection spread most easily if hygiene slips, so the part the client never sees is the part that matters most.",
    "This article follows the VaraaAi Academy lesson “Spa hand and foot treatments: understand them to stay clean and safe” in the Spa & skin care course, the theory half of the topic. By the end you will understand why the foot basin must be scrubbed after every client, when not to treat, how far to go with the heels and how to use paraffin hygienically. The hands-on routine is in the article [How to do a spa pedicure and manicure](lesson:spa-tay-chan).",
  ],
  sections: [
    {
      id: "spa-treatment-vs-nail-service",
      title: "What a spa hand and foot treatment is, and how it differs from a nail service",
      blocks: [
        { p: "A nail service ends with a beautiful set of painted nails. A spa hand and foot treatment ends with clean, soft hands and feet and a client who has had a rest. The pace is therefore quite different: slow, warm and quiet. Warm towels, warm water, soft music, and little conversation if the client wants to rest." },
        {
          table: {
            head: ["Part", "What it is for"],
            rows: [
              ["Soaking", "Cleans and softens the skin"],
              ["Exfoliation", "Removes dry skin with a fine scrub"],
              ["Cuticle care", "Clean, neat and nourished, no polish"],
              ["Smoothing the heels", "Smoother heels that keep their protective callus"],
              ["Massage", "Helps the client relax"],
              ["Mask or paraffin", "An extra depending on the treatment; warm paraffin softens the skin and holds in moisture"],
            ],
          },
        },
        { p: "Working slowly never means skipping a hygiene step. If the client wants cuticles cut, nails trimmed and polish, that is a different service: see [How to do a manicure and pedicure](lesson:cham-soc-mong-co-ban)." },
      ],
    },
    {
      id: "foot-bath-hygiene",
      title: "Pedicure foot bath hygiene: a liner does not replace cleaning",
      blocks: [
        { p: "Something that happens all the time: the salon is busy, the foot basin is just drained, rinsed and filled for the next client. It looks clean. But skin and soap residue cling to the sides of the basin and inside the pipes of a whirlpool bath, where bacteria and fungi thrive. All it takes is a small scratch on the next client's foot." },
        { p: "The lesson takes its example from the [City of Helsinki hygiene guidance](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf) in Finland: foot basins must use basin liners, and pedicure tools are always sterilised, for example in an autoclave, and stored separately from other tools." },
        { img: { src: img("lot-tui-moi-vao-bon-ngam-chan"), alt: "A therapist in black gloves kneels to fit a new clear liner into a white porcelain foot basin standing on a towel", caption: "A new liner for every client." } },
        { p: "The liner is only the first layer. After every client, the basin is still dealt with in this order:" },
        {
          ol: [
            "Remove the liner.",
            "Clean the basin with soap and a brush.",
            "Rinse.",
            "Disinfect, leaving it for the full contact time on the label.",
          ],
        },
        { img: { src: img("co-rua-bon-ngam-chan-sau-moi-khach"), alt: "A therapist in black gloves kneels beside a foot basin with the liner removed, scrubbing the inside with a brush, a white spray bottle beside her", caption: "Scrub with soap and a brush first, disinfect after." } },
        { p: "Cleaning has to come first, because dirt weakens disinfectants. A whirlpool basin with pipes needs the manufacturer's extra steps, and more thorough cleaning at the end of the day. How to sterilise metal tools is in the lesson [Tools after every client](lesson:ve-sinh-dung-cu)." },
        { note: "The hygiene rules here use the City of Helsinki guidance as an example. Rules differ from country to country, so find out the ones that apply where you work. This article is a training aid, not a licence.", kind: "warn", title: "Rules differ by place" },
      ],
    },
    {
      id: "look-before-soaking",
      title: "Look closely at the feet and hands before soaking",
      blocks: [
        { p: "Before the client's feet touch the water, look closely at the feet and hands, between the toes too. These signs are a reason to leave that area alone, sometimes to rebook, and to suggest the client sees a doctor:" },
        {
          ul: [
            "White, peeling, cracked or itchy skin between the toes.",
            "Thick, discoloured or crumbling nails.",
            "Warts.",
            "Open wounds; red, hot, painful swelling.",
          ],
        },
        { img: { src: img("kiem-tra-ke-ngon-chan-truoc-khi-ngam"), alt: "A hand in a black glove gently parts two toes of a client whose foot rests on a white towel, to look at the skin between them", caption: "The skin between the toes is easy to miss in a check." } },
        { p: "A therapist does not diagnose; she only says what she sees. There is one more reason not to treat: the tools and basin used on that skin could pass the problem on to another client. How to tell the client is in the lesson [When not to treat a client](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "clients-with-diabetes",
      title: "Pedicure with diabetes or poor circulation: take far more care",
      blocks: [
        { p: "For clients with diabetes or poor circulation in the feet, the feet may have less feeling. They may not notice water that is too hot or a graze to the skin. And a small cut can take a very long time to heal. So the method changes:" },
        {
          ul: [
            "The water is only lukewarm, and you test it yourself first.",
            "A short soak.",
            "No blades, no cutting.",
            "No hot paraffin.",
            "A very gentle massage.",
          ],
        },
        { note: "A foot with an ulcer or a wound: do not treat it, and advise the client to see a doctor or a podiatrist. On foot care for people with diabetes, the lesson refers to the [Diabetes UK guidance](https://www.diabetes.org.uk/about-diabetes/complications/feet/taking-care-of-your-feet).", kind: "warn", title: "When not to treat" },
      ],
    },
    {
      id: "soak-scrub-cuticles",
      title: "How long to soak, how to exfoliate and how far to go with cuticles",
      blocks: [
        {
          table: {
            head: ["Step", "How", "Limit"],
            rows: [
              ["Soaking", "Warm, not hot, tested on your own wrist first. Usually about five to ten minutes, as the treatment says", "Soak too long and the skin goes soggy and is easily over-filed"],
              ["Salts, oils", "Products made for feet", "At the manufacturer's dose"],
              ["Exfoliation", "A fine scrub such as sugar or fine salt, in gentle circles. More attention on the heels, much lighter on the hands, whose skin is thinner", "Never over scratches, cracks or irritated skin"],
              ["Cuticles", "Softener, then push back gently", "The living skin around the nail is a protective barrier: never cut it"],
            ],
          },
        },
        { img: { src: img("thu-nuoc-ngam-chan-bang-co-tay"), alt: "A therapist kneels by a lined foot basin and dips the inside of her wrist to test the warmth of the water, the client's feet waiting on a towel beside it", caption: "Test the water with your own wrist before the client puts her feet in." } },
        { p: "Loose, dry bits of skin around the nail are trimmed only if you are trained, with sterilised nippers. In a spa hand and foot treatment the nails are only cleaned, tidied and nourished, not polished." },
        { img: { src: img("tay-da-chet-mu-ban-tay-nhe-nhang"), alt: "A therapist gently rubs a scrub over the back of the hand of a client lying down, the hand resting on a neatly folded cream towel", caption: "The skin of the hands is much thinner than the feet, so the touch is far lighter." } },
      ],
    },
    {
      id: "hard-skin-on-heels",
      title: "Should you remove hard skin on the heels? Smooth it, don't take it all off",
      blocks: [
        { p: "With hard skin on the heels, the aim of the treatment is smooth, not gone. Callus protects the foot, and taking it all off takes that protection away." },
        {
          ul: [
            "Use a foot file, lightly and evenly.",
            "Callus blades and scalpels: do not use them unless the rules where you work and your training allow it. In many places that is a job for a podiatrist.",
            "Deep, bleeding or painful cracks: suggest the client sees a doctor.",
          ],
        },
      ],
    },
    {
      id: "massage-mask-paraffin",
      title: "Hand and foot massage and paraffin wax treatment: relaxing, but still clean",
      blocks: [
        { p: "The massage is the part of the treatment the client remembers most. Use moderate pressure and ask her. Long strokes run from the toes and fingers towards the wrist and ankle and up the calf, towards the heart. Never press on varicose veins. Pressing the sole of the foot to relax the client is fine, but do not promise that it heals anything." },
        { h3: "How to use paraffin hygienically" },
        { p: "Masks and paraffin are extras that depend on the treatment. Warm paraffin softens the skin and holds in moisture. The temperature follows the manufacturer, you always test it on your own wrist first, and it is used only on intact skin." },
        {
          ul: [
            "Never dip a client's hands or feet straight into a shared heater.",
            "Take paraffin out into a separate bowl and apply it with a brush, or use single-client packs.",
            "Used paraffin is thrown away, never poured back into the heater.",
          ],
        },
        { img: { src: img("quet-paraffin-len-tay-bang-co-tu-bat-rieng"), alt: "A therapist brushes paraffin onto a client's hand on a stone table, a small porcelain bowl of separately poured paraffin beside it and the heater behind", caption: "Paraffin poured into a separate bowl and brushed on; the client's hand never goes into the heater." } },
        { p: "The reason is simple: warm paraffin is not hot enough to kill bacteria. One heater shared by every hand passes bacteria from one client to the next." },
        { h3: "Advice and notes" },
        { p: "Finish with moisturiser and advise the client to moisturise her hands and feet every day. Heels with a lot of cracks, or ingrown toenails, are better seen by a podiatrist. In VaraaAi you note in the client's internal notes in your [client list](lesson:khach-hang) how the skin looked, what you did and the pressure she likes. Next time she comes back, a look at the notes tells you whether her heels have improved." },
      ],
    },
  ],
  faq: [
    {
      q: "What is included in a spa pedicure or spa manicure?",
      a: "A session includes soaking, exfoliation, cuticle care, smoothing the heels and massage, and may add a mask or paraffin depending on the treatment. Unlike a nail service, there is no nail art and no gel polish; the nails are only cleaned, tidied and nourished.",
    },
    {
      q: "How long should feet soak during a pedicure?",
      a: "Usually about five to ten minutes, as the salon's treatment says, in warm rather than hot water. Soaking too long makes the skin soggy and very easy to over-file in the next step.",
    },
    {
      q: "Should hard skin on the heels be removed with a blade?",
      a: "The aim with the heels is smooth, not gone, because callus protects the foot. In a spa treatment the heels are filed lightly with a foot file. Callus blades are only for people trained and allowed to use them where they work. Deep, bleeding or painful cracks should be seen by a doctor.",
    },
    {
      q: "Can people with diabetes have a spa pedicure?",
      a: "Only with great care, because the feet may have less feeling and small cuts heal slowly. The water is lukewarm and tested first, the soak is short, there are no blades, no cutting and no hot paraffin, and the massage is very gentle. With an ulcer or a wound on the foot, there is no treatment, and the client should see a doctor or a podiatrist.",
    },
    {
      q: "What does a paraffin wax treatment do for hands and feet?",
      a: "Warm paraffin softens the skin and holds in moisture. It is used only on intact skin, at the temperature the manufacturer gives, after testing it on the therapist's own wrist. The paraffin is poured into a separate bowl and brushed on, or single-client packs are used, and it is thrown away afterwards.",
    },
    {
      q: "If the foot basin has a liner, does it still need cleaning after every client?",
      a: "Yes. A liner does not replace cleaning. After every client the therapist removes the liner, scrubs the basin with soap and a brush, rinses it and disinfects it for the full contact time on the label. Cleaning comes first because dirt weakens disinfectants.",
    },
  ],
  related: ["spa-tay-chan", "cham-soc-mong-co-ban-hieu-dung", "ve-sinh-dung-cu", "khi-nao-khong-lam"],
};

export default article;
