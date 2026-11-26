import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-classic-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-are-classic-lash-extensions",
  lesson: "mi-classic-hieu-dung",
  category: "lash",
  title: "What are classic lash extensions? How long they last, whether they harm natural lashes and how to choose the extension",
  metaTitle: "What are classic lash extensions? Lifespan and lash health",
  metaDescription:
    "Classic lash extensions are 1:1, one extension per natural lash. The lash growth cycle, why refills come every 2–3 weeks, stickies, length, thickness and curl.",
  keyword: "what are classic lash extensions",
  keywords: [
    "how long do classic lash extensions last",
    "do classic lash extensions damage natural lashes",
    "1:1 lash extensions",
    "natural lash growth cycle",
    "lash extension stickies",
    "choosing lash extension length and curl",
    "lash glue and humidity",
  ],
  excerpt: "Classic means 1:1, as natural as a coat of mascara. This article explains the natural lash cycle, why extensions shed gradually and the three rules that keep natural lashes healthy.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-classic-xem-nhip-ben-cua-so-studio"),
    alt: "A lash technician with her hair in a high bun, a cream top and black gloves sits by a studio window holding up a pair of tweezers to inspect them",
  },
  takeaways: [
    "Classic lash extensions are **1:1**: each natural lash carries exactly one extension, for a natural, mascara-like look.",
    "Natural lashes shed in their own cycle and the extension sheds with them, so clients usually come back for a refill after **2–3 weeks**.",
    "Three things keep natural lashes healthy: isolate every lash, choose an extension the **natural lash can carry**, and place it about **0.5–1 mm** from the lid.",
    "Lash glue cures with moisture in the air, so keep the room's humidity and temperature in the range the glue maker gives.",
    "Sparse natural lashes stay sparse with classic, only longer and darker. Fuller, darker lashes mean volume or hybrid.",
  ],
  intro: [
    "What are classic lash extensions, how long do they last and do they damage natural lashes? Clients ask these questions before they lie down, and anyone learning the trade needs to be able to answer them. Classic is 1:1: each natural lash carries exactly one extension. Whether the client's own lashes are still healthy after years of extensions depends on how well the technician understands the natural lash.",
    "This article follows the VaraaAi Academy lesson “Classic lashes: understand them for beautiful lashes and healthy natural lashes” in the Lashes course. By the end you can explain to a client why extensions shed gradually, choose an extension the natural lash can carry, and understand why a room that is too dry or too humid shortens the life of a set.",
  ],
  sections: [
    {
      id: "what-are-classic-lashes",
      title: "What classic lash extensions are and how they look",
      blocks: [
        { p: "Classic lash extensions, also called 1:1, means attaching **one extension to one isolated natural lash**. No clusters, no fans. Afterwards the lash line is longer and darker, and the lashes still stand apart, like eyes with a very well applied coat of mascara." },
        { p: "Because each natural lash carries only one extension, classic adds no extra lashes. Thick natural lashes give a thick result. Sparse natural lashes stay sparse, only longer and darker. Say this in the consultation, before the client expects the dense lash line in her reference photo." },
        { img: { src: img("bo-mi-classic-moi-soi-mi-that-mot-soi-noi"), alt: "Close-up of a closed eye with a finished classic set, every lash separate, short at the inner corner and gradually longer towards the outer corner", caption: "A finished classic set: one extension on each natural lash, none stuck to its neighbour." } },
        { p: "A client who wants really full, dark lashes needs a different technique: [volume lashes](lesson:mi-volume-hieu-dung) or hybrid. If you are looking for the hands-on work, from placing the pads to taking them off, read the practice article on [how to do classic lash extensions](lesson:mi-classic)." },
      ],
    },
    {
      id: "lash-growth-cycle",
      title: "The natural lash growth cycle: why extensions shed gradually",
      blocks: [
        { p: "Natural lashes, like hair, have their own life cycle in three phases. The figures vary from person to person; the table just shows the order." },
        {
          table: {
            head: ["Phase", "Lasts", "The lash"],
            rows: [
              ["Growth", "Usually about a month to six weeks", "Gets longer every day"],
              ["Transition", "A few weeks", "Stops growing"],
              ["Rest", "Several months", "Stays put, then sheds and a new lash grows in its place"],
            ],
          },
        },
        { p: "More important than the figures: on any eyelid, at any time, some lashes are growing, some are resting and some are about to fall out. No two lashes run on the same schedule. So losing a few lashes a day is normal, and an extension sheds with whichever natural lash it is attached to." },
        { img: { src: img("mi-that-soi-dai-soi-non-truoc-khi-noi-mi"), alt: "Close-up of a closed eye before extensions, long natural lashes mixed with short baby lashes, and one shed lash lying on a white pad", caption: "Natural lashes before a set: long lashes, baby lashes and one just-shed lash on the same lid." } },
        { h3: "Recognising a natural shed" },
        { p: "Look closely at a shed lash and you will see a small, pale bulb at the root. That lash had reached the end of its cycle; the glue did not damage it. When a client worries about lashes on her pillow, you can show her this pale bulb." },
        { img: { src: img("soi-mi-rung-tu-nhien-mang-theo-soi-noi"), alt: "A shed lash rests on a black-gloved fingertip, a small pale bulb at its root and the black extension still attached along it", caption: "A naturally shed lash has a small pale bulb at the root, and its extension comes away with it." } },
        { h3: "Baby lashes: leave them, or go very light" },
        { p: "New technicians often attach an extension to every lash they can see, including very short, fine lashes that have only just started to grow. A baby lash is not strong enough to carry a long, thick extension. Attach one and it is easily pulled out early, or grows in crooked. Either leave it for the next refill, when it is longer and stronger, or give it a very short, very light extension." },
      ],
    },
    {
      id: "how-long-they-last",
      title: "How long classic lash extensions last",
      blocks: [
        { p: "There is no single figure for every client, because a set thins out at the speed each person sheds. The usual schedule in the trade is a **refill after 2–3 weeks**: the technician adds new extensions where the lash line has thinned." },
        { p: "The client's habits decide whether the lashes last or thin out quickly. Swimming, the sauna, rubbing the eyes and sleeping face down all make lashes fall sooner. Ask about these in the consultation, and explain aftercare before you begin:" },
        {
          ul: [
            "Keep the lashes dry for as long as the glue maker advises.",
            "No oil-based products at the lash base.",
            "Brush the lashes every day.",
            "No rubbing, and no pulling extensions out.",
          ],
        },
      ],
    },
    {
      id: "damage-natural-lashes",
      title: "Do classic lash extensions damage natural lashes?",
      blocks: [
        { p: "Natural lashes are damaged when a set is applied wrongly. The lesson names three mistakes, each matching one rule of classic. Keep all three rules and the client's lashes stay healthy through years of extensions." },
        {
          table: {
            head: ["Mistake", "What happens to the natural lash", "The right way"],
            rows: [
              ["A sticky: glue joins two natural lashes", "They grow and shed on different schedules and pull on each other; the client feels it and lashes come out early", "Isolate every lash, one extension per natural lash"],
              ["Extension too long or too thick", "The natural lash bends and in time breaks or sheds early", "Choose an extension the natural lash can carry"],
              ["Placed on the lid, glue on the skin", "Scratchiness, itching, sometimes irritation; the hard glue on the skin pulls the lash as it grows", "Extension base about 0.5–1 mm from the eyelid skin"],
            ],
          },
        },
        { h3: "How a sticky harms the lashes" },
        { p: "In the trade, two natural lashes glued together are called a sticky. When one grows longer or reaches the time to shed, the other holds it back and pulls it tight. The client feels something scratchy and caught. Over time the follicle is damaged and the natural lash line thins out. That is why the first rule of classic is to isolate every lash before you attach." },
        { img: { src: img("loi-dinh-chum-khi-noi-mi-classic"), alt: "Close-up of a closed eye where two lashes in the middle of the lash line are stuck crosswise, with a black lump of glue at the base", caption: "Illustration of a sticky: two lashes glued together and a lump of glue touching the lid. This must never happen." } },
        { h3: "Placement: just off the lid" },
        { p: "The extension lies along the natural lash, its base about half a millimetre to one millimetre from the eyelid skin, never touching it. Too far out is a mistake as well: the extension is loose, sticks out and falls off early." },
        { img: { src: img("chan-soi-mi-noi-cach-da-mi"), alt: "A classic lash line seen very close from the side, the base of each extension starting a short distance from the eyelid, with no glue on the skin", caption: "Done right: a clean line of skin between the lid and the base of each extension." } },
      ],
    },
    {
      id: "length-thickness-curl",
      title: "Choosing length, thickness and curl the natural lash can carry",
      blocks: [
        { p: "Picture the natural lash as a small twig. Hang something too long and heavy on it and the twig bends. An extension works the same way, so choosing it starts from the natural lash, not from the photo the client brings." },
        {
          ul: [
            "**Length:** not much longer than the natural lash.",
            "**Thickness:** not thicker or heavier than the natural lash can bear. Fine, short lashes get finer, shorter extensions.",
            "**Curl:** chosen by the eye shape and the direction the natural lash grows, so the extension follows the lash without flipping up or drooping.",
          ],
        },
        { img: { src: img("loi-soi-mi-noi-qua-dai-qua-nang"), alt: "Close-up of a closed eye with extensions that are too long and too thick, drooping onto the pad, crossing each other and leaving gaps", caption: "Illustration of extensions that are too long and heavy: the lashes droop, tangle and already show gaps." } },
        { note: "Do not attach very thick, very long extensions to fine, weak lashes just to please the client. Her natural lashes pay the price. Explain honestly, choose extensions they can carry, or suggest another technique.", kind: "warn", title: "When the client wants more than her lashes can carry" },
        { p: "Choosing lengths for each zone of the eye and for each eye shape is a topic of its own, covered in [lash mapping](lesson:mi-mapping-hieu-dung)." },
        { note: "Write down the lengths, thickness, curl and glue you used for each client. The next refill is quicker and the set more consistent. In VaraaAi, these notes live in the [client's profile](lesson:khach-hang).", kind: "tip", title: "A lash technician's notebook" },
      ],
    },
    {
      id: "glue-and-humidity",
      title: "Lash glue, room humidity and fumes",
      blocks: [
        { p: "Lash glue is cyanoacrylate, from the same family as superglue, and it cures with the moisture in the air. The room's humidity and temperature therefore decide whether it cures fast or slowly. Each glue maker gives a suitable range; your job is to keep the room within it." },
        {
          table: {
            head: ["Room", "How the glue behaves"],
            rows: [
              ["Too dry", "Cures slowly and gives off more fumes"],
              ["Too humid", "Cures too fast, the bond is brittle and holds poorly"],
            ],
          },
        },
        { img: { src: img("may-tao-am-va-keo-noi-mi-trong-phong-lam-mi"), alt: "A corner of a lash studio with a white stone window ledge holding a small humidifier releasing mist and a black bottle of lash glue", caption: "A humidifier helps keep the room in the range the glue maker gives." } },
        { p: "How you take the glue affects how long the set lasts too:" },
        {
          ul: [
            "Shake the bottle as the maker instructs, put one small drop on a jade stone or glue ring, and close the bottle straight away.",
            "Change to a fresh drop often, because a drop left out thickens and bonds poorly.",
            "Dip only the base of the extension, with just enough glue and never a blob.",
          ],
        },
        { note: "The fumes sting the eyes, so the client's eyes stay fully closed throughout and the glue drop never sits right under her nose. The fumes can also cause allergies, for clients and technicians alike. Signs and what to do are in [Allergies and chemicals](lesson:di-ung-hoa-chat).", kind: "warn", title: "Glue fumes" },
      ],
    },
    {
      id: "consultation-and-honesty",
      title: "Consultation, and when not to do a set",
      blocks: [
        { p: "Before you start, always look and ask. Red, itchy or watery eyes, a stye, swollen or crusted lid margins, recent eye surgery or an earlier reaction to lash glue: not today. The full list, and how to say no kindly, is in [When not to treat a customer](lesson:khi-nao-khong-lam)." },
        { p: "Never treat the consultation as a formality. Ask whether she wants a very natural look or something a little fuller, whether she wears contact lenses, swims, uses the sauna, rubs her eyes or sleeps face down. Then be honest about classic: it gives a natural look, and the fullness follows her own lashes." },
        { img: { src: img("khach-soi-guong-sau-khi-noi-mi-classic"), alt: "A blonde client in a cream jumper sits in a chair admiring her new lashes in a hand mirror, the lash technician smiling behind her", caption: "A client who was told what classic looks like is happy with exactly that result." } },
        { p: "A full classic set often takes 1.5–2 hours, and rushing leads to poorly isolated lashes. If your salon takes bookings through VaraaAi, set the real duration for this treatment under [services](lesson:dich-vu), and book the refill in the [calendar](lesson:lich-hen) before the client leaves." },
        { note: "Keep-dry times, room humidity and temperature always follow the glue maker's instructions. This article is a training aid, not a qualification, and rules on beauty services differ from country to country.", kind: "info", title: "Note" },
      ],
    },
  ],
  faq: [
    {
      q: "How long do classic lash extensions last?",
      a: "A set thins out in step with the natural lash cycle, because each extension sheds with the natural lash it is attached to. Clients usually come back for a refill after 2–3 weeks, depending on how fast they shed and how they care for the lashes at home.",
    },
    {
      q: "Do classic lash extensions make your natural lashes fall out?",
      a: "Natural lashes are pulled out early when a set is applied wrongly: two lashes glued into a sticky, extensions that are too long or heavy, or glue on the eyelid. When each natural lash carries one extension it can bear, placed about 0.5–1 mm from the lid, the lash keeps growing and shedding in its normal cycle.",
    },
    {
      q: "Why do I lose a few lashes every day after getting extensions?",
      a: "Every day a few natural lashes reach the end of their cycle, and the extensions on them come away too. A naturally shed lash has a small pale bulb at its root. It is not a sign that the glue has damaged the lashes.",
    },
    {
      q: "Are classic lash extensions good for sparse lashes?",
      a: "They can be done, but the client should know the result in advance: classic puts one extension on one natural lash, so sparse lashes stay sparse, only longer and darker. A client who wants full, dark lashes should be advised on volume or hybrid, with extensions her lashes can carry.",
    },
    {
      q: "What is the difference between classic and volume lashes?",
      a: "Classic attaches one extension to one natural lash and looks natural, like mascara. Volume attaches a fan of several very fine extensions to one natural lash for a fuller lash line. Both keep the same rule: attach to exactly one natural lash.",
    },
    {
      q: "What should you avoid after classic lash extensions?",
      a: "Keep the lashes dry for as long as the glue maker advises, avoid oil-based products at the lash base, brush them daily, do not rub your eyes and do not pull extensions out. Swimming, the sauna and sleeping face down make the lashes thin out faster.",
    },
  ],
  related: ["mi-classic", "mi-chuan-bi-hieu-dung", "mi-volume-hieu-dung", "mi-dam-thao-hieu-dung"],
};

export default article;
