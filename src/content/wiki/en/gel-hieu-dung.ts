import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/gel-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-gel-polish",
  lesson: "gel-hieu-dung",
  category: "nail",
  title: "What is gel polish? Why it lasts 2–3 weeks, why it lifts and whether it damages your nails",
  metaTitle: "What is gel polish? How long it lasts and why it lifts",
  metaDescription:
    "What is gel polish, how it grips the nail, why it needs a lamp and thin coats, how long it lasts, the three kinds of lifting and their causes, allergy and TPO.",
  keyword: "what is gel polish",
  keywords: [
    "how long does gel polish last",
    "is gel polish bad for your nails",
    "why does gel polish lift",
    "gel polish burning under the lamp",
    "sticky layer after curing gel",
    "how does gel polish cure",
    "TPO in gel polish",
  ],
  excerpt: "Gel does not soak into the nail, it only grips the surface. Understand that and you understand why gel lasts, why it lifts and how to keep it from harming nails.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("thay-day-nail-giang-ve-son-gel-cho-tho-tre"),
    alt: "A grey-haired nail educator in a linen apron sits at a stone table, explaining something to two young technicians in cream tops",
  },
  takeaways: [
    "Gel **does not soak into the nail**; it only grips the surface of the nail plate. That surface must be free of dead skin, free of oil and dry.",
    "Gel only cures under the lamp its brand specifies, for the full time, and when the coat is thin enough for the light to get through.",
    "Done properly, gel polish looks good for **2–3 weeks**. Left longer, the nail grows out and breaks and lifts more easily.",
    "Where gel lifts tells you why: at the cuticle, skin left on the plate; at the tip, an uncapped free edge; in whole sheets, oil, moisture or under-cured gel.",
    "What harms nails and people is hard buffing, peeling gel off, and uncured gel touching the skin.",
  ],
  intro: [
    "What is gel polish, that one technician can make the same bottle last three weeks while another sees it lift in three days? The short answer: gel polish is a nail polish that does not air-dry. It only hardens under the right lamp, and it grips the surface of the nail rather than soaking in. Whether it lasts or lifts, and whether it stays safe or causes an allergy, all follows from those two facts.",
    "This article follows the VaraaAi Academy lesson “Gel polish: understand it to make it last” in the Nails course, the theory half of the gel polish topic. It does not teach brushwork. It explains why each step is done the way it is, so you can work out for yourself what went wrong when a client's set has a problem. The hands-on routine is in [How to apply gel polish](lesson:son-gel).",
  ],
  sections: [
    {
      id: "what-gel-grips",
      title: "Nail anatomy: what gel polish actually sticks to",
      blocks: [
        { p: "The hard part we paint on is the **nail plate**. It is made of keratin in many thin layers. The nail grows from the **matrix**, hidden under the skin at the base of the nail. Filing or pressing too hard over this area can make the nail grow out ridged, sometimes for good." },
        { img: { src: img("cau-tao-mong-tay-mat-cat-dau-ngon"), alt: "An illustration of a fingertip in lengthwise cross-section: the nail plate on top, the nail root hidden under a fold of skin, the bone in the middle", caption: "The nail plate is the part you see. The matrix, where the nail is made, sits hidden under the fold of skin at the base." } },
        { p: "At the base of the nail there are two kinds of skin that beginners often confuse:" },
        {
          table: {
            head: ["Skin", "Its job", "What the technician does"],
            rows: [
              ["The living fold above the base of the nail", "Seals the matrix so bacteria cannot get in", "Never cut"],
              ["The thin, clear film stuck to the nail plate", "Dead skin, no longer protects anything", "Remove before painting"],
            ],
          },
        },
        { h3: "Three conditions for gel to grip" },
        { p: "Because gel only grips the surface, the nail plate has to meet three conditions:" },
        {
          ul: [
            "**Free of dead skin.** If the thin film is left, the gel sticks to the skin instead of the nail, and lifts within a few days.",
            "**Free of oil.** Oil from the skin of the hands makes gel slide off.",
            "**Dry.** The nail plate absorbs water like a sponge: it swells, then shrinks back as it dries. Gel cannot shrink with it.",
          ],
        },
        { img: { src: img("ngam-tay-trong-nuoc-truoc-khi-son-gel"), alt: "A client's fingertips soaking in a white porcelain bowl of warm water with rose petals, a cream towel beside it on a stone table", caption: "Soaking makes the nail take up water and swell. Many good technicians leave it out before gel polish." } },
        { p: "That is why many good technicians work dry, with no soaking, before gel polish. And because gel only needs a surface to grip, buffing is only there to take off the shine. Buffing hard does not make gel hold better. It just thins the nail, and next time the client feels burning under the lamp." },
      ],
    },
    {
      id: "how-gel-cures",
      title: "Why gel polish needs a lamp and thin coats",
      blocks: [
        { p: "Gel contains a substance called a photoinitiator. When it meets the right kind of light, it starts a reaction that turns the gel from liquid to solid. In the trade we say the gel has cured." },
        { p: "Each brand formulates its gel for a particular lamp and a particular time. With another brand's lamp, or an old lamp that has grown weak, the surface may feel hard while the gel underneath is still not fully cured. Under-cured gel lifts easily, and it is one of the main causes of allergy." },
        { img: { src: img("den-led-ho-gel-va-den-cu"), alt: "A white dome-shaped LED gel lamp glowing violet-blue on a stone table, with an old, yellowed lamp behind it", caption: "An old, weakened lamp still lights up, but it may no longer cure the gel all the way through." } },
        { h3: "Thick coats wrinkle" },
        { p: "Light cannot get all the way through a thick layer of gel, especially a dark colour. The top cures first, shrinks and wrinkles the still-liquid layer underneath. Two thin coats are always better than one thick one." },
        { img: { src: img("son-gel-bi-nhan-do-son-qua-day"), alt: "Close-up of a dark red gel nail with a wrinkled, rippled surface, supported from below by a hand in a black glove", caption: "A coat that was too thick: the surface has wrinkled and the gel underneath is not cured." } },
        { h3: "When the client feels burning in the lamp" },
        { p: "Gel gives off heat as it cures. If a client says it burns in the lamp, do not tell her to put up with it. Let her take the hand out for a few seconds and then put it back in, and paint thinner next time." },
        { h3: "The sticky layer after curing is not faulty gel" },
        { p: "After curing there is often a sticky layer on the surface. It is a very thin film of gel that cannot cure because it is in contact with the air. It is still uncured gel, so it is wiped off with cleanser and kept off the client's skin and your own." },
      ],
    },
    {
      id: "how-long-it-lasts",
      title: "How long does gel polish last, and why does it lift",
      blocks: [
        { p: "Done properly, gel polish looks good for two to three weeks, and that is the figure to give clients honestly from the start. Leave it longer and the nail grows out, the stress point shifts, and the set breaks and lifts more easily." },
        { p: "If gel lifts early, after a few days, do not rush to change brands or blame the client. Look at where it lifted. Each kind of lifting points to a cause." },
        {
          table: {
            head: ["Where it lifts", "Usual cause"],
            rows: [
              ["At the cuticle", "The thin film of skin was left on the nail plate"],
              ["At the tip", "The free edge was not capped, or the nails were used as tools to pry or open things"],
              ["In whole sheets", "Oil or moisture on the nail plate, or under-cured gel"],
            ],
          },
        },
        { img: { src: img("son-gel-bong-o-chan-mong"), alt: "Close-up of a red gel nail whose edge near the cuticle has come loose and is lifting off the nail plate", caption: "Lifting at the cuticle: usually skin left on the nail plate." } },
        { img: { src: img("son-gel-bong-o-dau-mong"), alt: "Close-up of a dark red gel nail with a piece chipped off at the corner of the tip, the natural nail showing underneath", caption: "Lifting at the tip: an uncapped free edge, or a nail used to pry." } },
        { note: "Each kind of lifting is a reminder to fix the right step. A technician with beautiful brushwork can still have clients coming back again and again with lifting at the cuticle, change gel brands and lamps without success, and only solve it once she looks again at how she removes the thin film of skin.", kind: "tip", title: "Read the set before you change products" },
        { img: { src: img("khach-quay-lai-vi-son-gel-bi-bong"), alt: "A client in a dark green shirt points to one red gel nail on her hand to show it to a young nail technician" } },
      ],
    },
    {
      id: "is-gel-bad-for-nails",
      title: "Is gel polish bad for your nails? Thinning, allergy and TPO",
      blocks: [
        { p: "Fully cured gel simply sits on the nail. The risks come from how it is applied and how it is removed, and there are three worth knowing about." },
        { h3: "Nails thinned by hard buffing and by peeling" },
        { p: "Hard buffing at every appointment takes layers off the nail plate. Peeling gel off at home is worse still: it pulls layers of the natural nail away with it. The nail gets thinner, the next set holds less well, and the client concludes the technician is not very good. Gel needs to be removed properly; see [Gel removal: understand it so the nail survives](lesson:thao-gel-hieu-dung)." },
        { img: { src: img("khach-tu-cay-son-gel-bang-tay"), alt: "Close-up of a woman's two hands, the nail of one prising red gel polish off a nail on the other", caption: "What not to do: peeling gel off takes layers of the natural nail with it." } },
        { h3: "Gel allergy comes slowly" },
        { p: "A gel allergy does not appear straight away. It comes after many months, sometimes years, of contact. At first there is itching around the nails, red skin, small blisters, and sometimes the nail lifting off the nail bed. Once you are allergic it is usually for life, and some technicians have had to leave the trade because they can no longer touch gel. Dermatologists also warn that this allergy can cause problems later with dental work or joint replacement, because those materials belong to the same family as gel." },
        { p: "The prevention rule is short: **uncured gel never touches the skin**." },
        {
          ul: [
            "Wear nitrile gloves, and change them when they get gel on them.",
            "Wipe brush handles and bottle necks clean.",
            "Never wipe off excess gel with a finger.",
            "If gel gets on the client's skin, clean it off before curing.",
            "Always cure for the full time.",
          ],
        },
        { img: { src: img("gel-tran-ra-da-quanh-mong"), alt: "Close-up of a freshly painted, still-wet red gel nail with gel flooding onto the skin at the base and along both sides", caption: "A mistake to avoid: gel on the skin. Clean it off before the hand goes into the lamp." } },
        { note: "If you or a client get itching, redness or blisters around the nails, stop contact with gel and see a dermatologist. [Allergies and chemicals](lesson:di-ung-hoa-chat) covers the signs and prevention in more detail.", kind: "warn", title: "If there are signs of allergy" },
        { h3: "TPO and where your gel comes from" },
        { p: "In the European Union, the photoinitiator called TPO has been banned in nail products since 1 September 2025. Salons may not keep using it, not even stock bought earlier, so check the ingredients on every bottle of gel you have. Buy gel from suppliers within Europe, with a clear label and ingredient list. With cheap products of unknown origin, the risk lands on you and your clients." },
      ],
    },
    {
      id: "with-clients",
      title: "Four habits with gel polish clients",
      blocks: [
        {
          ol: [
            "**Look and ask before you start.** Discoloured, thickened or crumbling nails, or red and swollen skin: no service, and a suggestion to see a doctor. Turning one client away today protects the reputation of the whole salon. See [When not to treat a customer](lesson:khi-nao-khong-lam).",
            "**Be honest about how long it lasts.** Gel looks good for two to three weeks, then it needs removing and redoing.",
            "**Tell clients not to peel it off.** Explain that peeling takes layers of the natural nail with it, and the next set will hold less well.",
            "**When a client comes back with lifting, do not blame her straight away.** Look at where it lifted and fix that step.",
          ],
        },
        { p: "This advice is easier to follow when the salon has a routine. In VaraaAi you [add the gel polish service](lesson:dich-vu) with enough time for proper nail prep, and note in the [customer book](lesson:khach-hang) what to remember about each client's nails, so the next appointment does not start from scratch." },
      ],
    },
  ],
  faq: [
    {
      q: "What is gel polish and how is it different from regular nail polish?",
      a: "Gel polish is a nail polish that contains a photoinitiator. It does not air-dry; it only hardens when cured under the lamp its brand specifies, for the full time. It grips the surface of the nail plate rather than soaking in, and done properly it looks good for two to three weeks.",
    },
    {
      q: "How many weeks does gel polish last?",
      a: "Applied properly, gel polish looks good for 2–3 weeks. After that the nail has grown out and the stress point has shifted, so it breaks and lifts more easily, and it is time to remove and redo it. If gel lifts after only a few days, the cause usually lies in the nail prep or in under-cured gel.",
    },
    {
      q: "Why does gel polish lift at the cuticle, at the tip or in whole sheets?",
      a: "Lifting at the cuticle usually means a thin film of skin was left on the nail plate. Lifting at the tip usually means the free edge was not capped, or the nails were used to pry or open things. Lifting in whole sheets usually comes from oil or moisture on the nail, or from under-cured gel.",
    },
    {
      q: "Is gel polish bad for your nails?",
      a: "The risks come mainly from how it is applied and removed. Hard buffing thins the nail, peeling gel off takes layers of the natural nail with it, and repeated contact between uncured gel and skin can lead to allergy. If you get itching, redness or blisters around the nails, stop contact with gel and see a dermatologist.",
    },
    {
      q: "Why does gel polish burn under the lamp?",
      a: "Gel gives off heat as it cures. The thicker the coat, the hotter it gets, and a nail that has been buffed thin feels it more. When it burns, take the hand out for a few seconds, put it back in, and paint thinner coats next time.",
    },
    {
      q: "Is the sticky layer after curing gel uncured?",
      a: "It is not faulty gel. The sticky layer is a very thin film of gel that cannot cure because it is in contact with the air. It is still uncured gel, so it is wiped off with cleanser and should not touch the skin.",
    },
  ],
  related: ["son-gel", "thao-gel-hieu-dung", "thao-gel", "builder-gel-hieu-dung"],
};

export default article;
