import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mong-form-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "nail-forms-for-gel-extensions",
  lesson: "noi-mong-form-hieu-dung",
  category: "nail",
  title: "Nail forms for gel extensions: paper or metal, how they should fit, and why extensions break or ski-jump",
  metaTitle: "Nail forms for gel extensions: paper vs metal, fit, faults",
  metaDescription:
    "Nail forms for gel extensions explained: paper vs metal forms, why the form must fit snugly and sit straight, choosing a length, structure, breaks and infills.",
  keyword: "nail forms for gel extensions",
  keywords: ["paper vs metal nail forms", "why do my gel extensions break", "ski jump nails", "hooked nail extensions", "how long should nail extensions be", "how often to infill gel extensions", "are gel extensions strong"],
  excerpt: "Gel extensions on forms build the long part of the nail in builder gel on a temporary mould. How the form decides the shape of the nail, and the faults that make extensions break.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("bo-mong-noi-form-dang-hanh-nhan-hoan-thien"),
    alt: "A client's hands resting one over the other on a cushion, ten almond-shaped extensions in glossy milky pink",
  },
  takeaways: [
    "A form is only a **temporary mould** under the free edge. The gel follows the form, so as the form sits, so the nail turns out.",
    "The form must **fit snugly under the free edge** and continue the line of the natural nail. A gap lets gel run underneath, and the extension ends up weak and lifts.",
    "A form tilted down, tilted up or turned to one side puts the fault into the whole structure. Filing afterwards can hardly fix it.",
    "The longer the extension, the more force on the stress area. For a first set, choose a **moderate length**.",
    "Extensions that break straight across after a few days usually have **no apex**. Infills are usually every 3–4 weeks.",
  ],
  intro: [
    "How you choose and fit nail forms for gel extensions decides whether a set made from one pot of gel lasts until the infill or breaks within a few days. An extension on a form uses builder gel to make the nail longer than the natural nail, built on a form placed under the free edge. A good set looks elegant. A wrong one breaks, lifts, or turns up like a ski jump, and many of those faults begin with the form itself.",
    "This article follows the VaraaAi Academy lesson “Extensions on forms: understand them so long nails don't break” in the Nails course. By the end you will know how to choose a form, how to check it before the gel goes on, how to advise a client on length, and how to look at an extension and tell why it broke.",
  ],
  sections: [
    {
      id: "paper-and-metal-forms",
      title: "What nail forms are: paper forms and metal forms",
      blocks: [
        { p: "A form is a temporary mould. The technician builds gel on it, cures it, then takes the form off, and the long nail stands on its own. The two common kinds are paper forms and metal forms." },
        { img: { src: img("form-giay-va-form-kim-loai-noi-mong"), alt: "Extension tools laid out on a cream towel: a stack of yellow paper forms, three metal forms, scissors, a file, a brush, a pot of pink gel and a lamp", caption: "Yellow paper forms and metal forms side by side, with the kit needed for an extension appointment." } },
        {
          table: {
            head: ["Compared", "Paper forms", "Metal forms"],
            rows: [
              ["How often used", "Adhesive backed, used once and thrown away", "Reused after cleaning and disinfecting like any other tool"],
              ["Strength", "Soft, easy to trim to each nail, always new for every client", "Rigid, keeps a straight line very well"],
              ["What to watch", "Trim the curve again if it does not meet the free edge", "Choose the right size and process them after every client"],
            ],
          },
        },
        { p: "Neither is clearly better. What matters is that the form fits snugly under the free edge of the client in front of you. The gel built on the form is builder gel, so if you are new to it, read [what is builder gel](lesson:builder-gel-hieu-dung) first." },
      ],
    },
    {
      id: "snug-and-straight",
      title: "Why the form must fit snugly and sit straight",
      blocks: [
        { p: "The form's job is to continue the line of the natural nail. Seen from the side, it runs straight out from the free edge, as if the natural nail had simply grown longer. Seen from above and end-on, it lines up with the finger, leaning neither left nor right. The gel only follows the form." },
        { img: { src: img("form-noi-mong-khit-duoi-dau-mong"), alt: "A finger seen from the side with a thin metal form slipped tight under the free edge and running straight forward", caption: "A form placed correctly: snug under the free edge, continuing the line of the natural nail." } },
        { h3: "A gap between the free edge and the form" },
        { p: "This happens a lot with new technicians: the form goes on in a hurry and a small gap is left between the free edge and the form. Gel runs into that gap and collects under the free edge. When the form comes off, there is a ridge of gel under the nail that the client can feel, and it traps dirt. The extension is not joined to the natural nail, so it is weak and lifts easily. Push the form in until it fits tightly, and trim its curve to each client's nail when needed." },
        { h3: "A tilted or crooked form" },
        {
          table: {
            head: ["Form placed", "What the extension looks like"],
            rows: [
              ["Tilted down", "The nail hooks down like a claw"],
              ["Tilted up", "The nail turns up like a ski jump"],
              ["Turned to one side", "The nail is crooked, the side walls not parallel"],
            ],
          },
        },
        { img: { src: img("loi-form-chuc-xuong-ho-duoi-dau-mong"), alt: "A finger seen from the side, a metal form angled downwards from the nail line with a gap under the free edge", caption: "This picture shows a mistake: a form tilted down and not snug. Gel built on it will hook down." } },
        { img: { src: img("loi-mong-noi-cup-xuong-nhu-cai-moc"), alt: "A milky pink extension seen from the side, the tip curving sharply downwards like a hook", caption: "This picture shows a mistake: a hooked nail, because the form was tilted down while the gel was built." } },
        { img: { src: img("loi-mong-noi-bi-xien-lech-mot-ben"), alt: "A client's hand with one milky pink extension curving off to one side, out of line with the finger", caption: "This picture shows a mistake: a crooked nail, because the form was turned to one side." } },
        { note: "Filing afterwards can hardly rescue these faults, because the mistake is built into the whole structure of the nail. Before the gel goes on, look at the finger from three directions: from the side, from above and end-on. It takes a few seconds.", kind: "tip", title: "Check the form from three directions" },
      ],
    },
    {
      id: "extension-length",
      title: "How long should nail extensions be, and which nails should not be extended",
      blocks: [
        { p: "Think of an extension as a lever. The longer it is, the more force goes to the stress area every time the tip knocks against something. The stress area is where the natural nail leaves the nail bed." },
        {
          ul: [
            "The length has to suit the natural nail. If the natural nail is short and thin, do not make the extension too long.",
            "Ask the client what she does for work and in daily life. For someone who types all day or works with her hands, a moderate length lasts much longer.",
            "For a first set, choose a moderate length.",
          ],
        },
        { p: "Be honest with the client about length, and she will trust you more." },
        { p: "Not every nail should be extended. A nail bitten right down, with almost no free edge, gives the form little to rest on, and the extension has to carry nearly everything. A nail with problems, such as separating from the bed, discolouration or red, swollen skin around it, is not treated, and you advise the client to see a doctor. These signs are covered in the lesson [When not to treat](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "extension-structure",
      title: "The structure of a strong gel extension",
      blocks: [
        { p: "The structure is the same as for a builder gel overlay on the natural nail: thin at the cuticle, thin at the tip, thickest at the apex over the stress area. Seen end-on, the C-curve is even on both sides. Seen from above, the side walls are straight and parallel. On an extension the apex matters even more, because it has to carry the whole long part in front of it." },
        { img: { src: img("cau-truc-mong-noi-co-diem-apex"), alt: "A milky pink extension seen from the side, its surface curving softly with the highest point around the middle and a fine tip", caption: "Seen from the side: the high point sits over the stress area, and the tip tapers thin." } },
        {
          ul: [
            "**The tip** should be thin and refined, but not paper-thin. In the trade it is often compared to the thickness of a bank card. Too thick and the nail looks clumsy and heavy; too thin and the tip chips easily.",
            "**Where the extension meets the natural nail** the join must be seamless, with no step you can feel.",
          ],
        },
        { h3: "Extensions breaking straight across after a few days" },
        { p: "The most common break runs straight across the stress area. Seen from the side, the nail is flat and evenly thin like a sheet of glass, with no apex. There was enough gel, but not in the right place: it was thin exactly where it needed to be thickest. The fix is not to build the whole nail thick, but to put the gel where it belongs." },
        { img: { src: img("loi-mong-noi-phang-gay-o-vung-chiu-luc"), alt: "A long, flat, evenly thin extension seen from the side, with a crack running across where the nail leaves the fingertip", caption: "This picture shows a mistake: a flat nail with no apex, cracked across the stress area." } },
      ],
    },
    {
      id: "gel-on-skin-safety",
      title: "Gel on the skin, and other safety points",
      blocks: [
        { p: "With extensions, gel has one more way to reach the skin: besides the cuticle and the side corners, it can run over the edge of the form onto the fingertip. Uncured gel on the skin is the road to allergy, and wherever gel touches the skin, it lifts very quickly." },
        { img: { src: img("loi-gel-tran-len-da-quanh-mong"), alt: "Close-up of a nail coated in clear pink gel that has overflowed onto the skin at the cuticle and is dripping down the side of the finger", caption: "This picture shows a mistake: gel flooded onto the skin around the nail. It has to be wiped off before curing." } },
        {
          ul: [
            "Always leave a hair-thin gap between gel and skin. If some gets on the skin, wipe it off before curing.",
            "Switch on dust extraction when filing.",
            "Cure for the full time the brand gives. Under-cured gel is both weak and more likely to cause allergy.",
          ],
        },
        { note: "Uncured gel never touches the skin, the client's or your own. Cure times and product use always follow the brand's instructions. Rules on nail products differ from country to country.", kind: "warn", title: "Safety rules" },
        { p: "For the signs of allergy and how to prevent it, see the lesson [Allergies and chemicals](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "extension-infills",
      title: "How often gel extensions need an infill",
      blocks: [
        { p: "As the nail grows out, the apex slowly moves towards the tip, the nail becomes top-heavy and breaks easily. Usually the client should come back every 3–4 weeks for an infill. With infills on time, extensions last a long time and stay safe. Leave it too long and the nail breaks easily, sometimes taking part of the natural nail underneath with it." },
        { p: "That is where the theory ends. To see how the form is trimmed, fitted and the extension built by hand, go on to the practice article [how to do gel extensions with forms](lesson:noi-mong-form)." },
      ],
    },
    {
      id: "extension-services",
      title: "Keep new extension sets and infills as separate services",
      blocks: [
        { p: "A new set and an infill take different amounts of time. In VaraaAi you [set up two services](lesson:dich-vu), a new extension set and an extension infill, each with its own duration, so the calendar does not get squeezed. Both prices belong on your salon's [price list](lesson:bang-gia), and clients who come back regularly for infills are a natural fit for a [loyalty card](lesson:the-khach-quen)." },
      ],
    },
  ],
  faq: [
    {
      q: "What are nail forms used for?",
      a: "Nail forms are temporary moulds placed under the free edge to make the nail longer than the natural nail. Builder gel is built on the form and cured, then the form comes off and the long nail stands on its own.",
    },
    {
      q: "Are paper or metal nail forms better?",
      a: "Neither is clearly better. Paper forms are soft, easy to trim to each nail and thrown away after one use. Metal forms are rigid, keep a straight line well and are reused after cleaning and disinfecting. What matters is that the form fits snugly under the client's free edge.",
    },
    {
      q: "Why do my nail extensions ski-jump or hook down?",
      a: "Because the form was tilted while the gel was built. A form tilted up gives a ski-jump nail, a form tilted down gives a hooked nail. The gel follows the form, so the fault is in the whole structure and filing afterwards can hardly fix it.",
    },
    {
      q: "Why do my gel extensions keep breaking across the middle?",
      a: "Usually because the nail has no apex: the gel is flat and evenly thin, so it is thin exactly at the stress area, where it should be thickest. A length that is too much for the natural nail also puts more force on that area. The fix is to place the gel correctly, not to make the whole nail thick.",
    },
    {
      q: "Can you put extensions on bitten nails?",
      a: "It is difficult. When the natural nail has almost no free edge, the form has little to rest on and the extension has to carry nearly everything. If the nail is separating from the bed, discoloured or the skin around it is red and swollen, it is not treated and the client should see a doctor.",
    },
    {
      q: "How often do gel extensions need an infill?",
      a: "Usually every 3–4 weeks. As the nail grows, the apex moves towards the tip, the nail becomes top-heavy and breaks easily. Left too long, a broken extension can take part of the natural nail underneath with it.",
    },
  ],
  related: ["noi-mong-form", "builder-gel-hieu-dung", "dap-bot-hieu-dung", "fill-mong-hieu-dung"],
};

export default article;
