import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-chuan-bi/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "how-to-prep-lashes-for-extensions",
  lesson: "mi-chuan-bi",
  category: "lash",
  title: "How to prep lashes for extensions: 11 steps from consultation form to tool tray",
  metaTitle: "How to prep lashes for extensions: 11 steps for lash techs",
  metaDescription:
    "How to prep lashes for extensions: consultation form, eye check, patch test, bed and lamp, lenses out, oil-free cleanse, drying, under-eye pads, tape and primer.",
  keyword: "how to prep lashes for extensions",
  keywords: ["lash extension prep steps", "how to apply under eye pads for lash extensions", "cleansing lashes before extensions", "how to use lash primer", "taping lower lashes for extensions", "lash extension setup checklist", "oil-free make-up remover before lash extensions"],
  excerpt: "Everything that happens before the first lash: consultation, eye check, patch test, bed, cleansing, under-eye pads and the tray, plus the mistakes that leave clients with scratchy, stinging eyes.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-chuan-bi-giuong-trong-studio"),
    alt: "A lash technician in a cream top spreads a fresh cover over the lash bed in a spacious studio with white stone walls and purple velvet curtains",
  },
  takeaways: [
    "Consult while the client's **eyes are still open**, on a paper form or a tablet, then let her read it back and agree.",
    "First-time clients: patch test as the glue maker describes, often 24 to 48 hours before, **with the glue you will use**, and record the date.",
    "The lashes must be oil-free and completely dry: oil-free make-up removal, cleansing from root to tip, rinsing, then a small fan.",
    "Under-eye pads cover every lower lash, the top edge just under the lower lash line, **never touching the waterline**.",
    "Tape goes only on the pad and the cheek. Pads and tape never touch the eye itself.",
  ],
  intro: [
    "How to prep lashes for extensions covers everything from the moment the client walks in until just before the first lash goes on. None of it is photogenic, but a crooked pad or a lash line still holding oil will follow the technician for the next two hours.",
    "This article follows the VaraaAi Academy lesson “Lash preparation: step by step” in the Lashes course. You go through eleven steps in the order of the lesson video, from the consultation form to the tool tray, and stop exactly where [how to do classic lash extensions](lesson:mi-classic) starts placing lashes.",
  ],
  sections: [
    {
      id: "three-groups",
      title: "What lash extension prep includes: three groups of tasks",
      blocks: [
        { p: "Group the eleven steps together and the preparation falls into three parts. Remember the three parts and you will not miss a task, even if the detailed order slips your mind." },
        {
          table: {
            head: ["Group", "What it includes", "What it is for"],
            rows: [
              ["The client", "Consultation, eye and natural lash check, briefing before she lies down, patch test for first-timers", "You know whether today is the day, and she knows what is about to happen"],
              ["The station", "Bed wiped, fresh cover and headrest liner, lamp, clean hands and new gloves, tool tray", "Everything that touches the client is clean, and you never leave the bed mid-set"],
              ["The lashes", "Lenses out, make-up off, cleansing, drying, pads, tape, brushing, primer", "Lashes free of oil, dry, evenly separated, lower lashes fully covered"],
            ],
          },
        },
        { p: "The reasons behind each consultation question, how to read a patch test and when to move an appointment are explained in the theory article on the [lash extension patch test and consultation](lesson:mi-chuan-bi-hieu-dung)." },
      ],
    },
    {
      id: "oil-free-and-dry",
      title: "Why lashes must be oil-free and fully dry before extensions",
      blocks: [
        { p: "Lash glue bonds to a clean, dry lash. Oil from creams, eyeshadow or leftover mascara weakens the bond, however careful the application is afterwards. That is why there are three layers of cleaning in a row: the client removes her make-up, the technician cleanses the lashes, then primer if the glue maker recommends it." },
        { img: { src: img("tay-trang-mat-khong-dau-truoc-khi-noi-mi"), alt: "A blonde client in a cream knit jumper sits in a chair wiping her eye area with a cotton pad before her lash appointment", caption: "Eyeshadow, mascara and cream come off with an oil-free make-up remover." } },
        { p: "The make-up remover has to be oil-free, or the cleaning step itself leaves oil on the lashes. After cleansing and rinsing, the lashes are dried thoroughly. Damp lashes do not bond well either." },
        { img: { src: img("lam-kho-mi-bang-quat-nho"), alt: "A black-gloved hand holds a small cream hand-held fan, drying the lashes of a client lying with her eyes closed", caption: "The small fan is held away from the face and runs until the lashes are completely dry." } },
        { note: "Contact lenses come out first, because glue fumes and liquids can collect under the lens. Ask about lenses on the consultation form so the client can take them out before lying down.", kind: "warn", title: "Contact lenses" },
      ],
    },
    {
      id: "pad-and-tape-mistakes",
      title: "Under-eye pad and tape mistakes",
      blocks: [
        { p: "Placing the pads is the step most often done carelessly in the whole preparation, and it is the one the client feels most." },
        {
          table: {
            head: ["Mistake", "What happens", "How to avoid it"],
            rows: [
              ["Pad edge touching the waterline", "Scratchiness, stinging, watering, red eyes after the appointment", "Ask the client to look up slightly while you place it; then ask if it feels scratchy and adjust"],
              ["Pad too low or crooked", "Lower lashes poke out at the outer corner and get glued to the upper ones; they pull painfully when she opens her eyes", "Check carefully along the pad edge, especially at the outer corner"],
              ["Tape touching the eye", "Scratchiness and irritation; pads and tape never touch the eye itself", "Tape for lower lashes goes only on the pad and the cheek"],
              ["Lid tape pulled too tight", "The client is uncomfortable for the whole set", "Apply it gently and ask if it feels tight"],
            ],
          },
        },
        { note: "If the client says something feels scratchy, fix it at once. Do not let her put up with it: uncomfortable eyes move more, and the lashing gets harder too.", kind: "tip", title: "One question after placing the pads" },
      ],
    },
    {
      id: "glue-maker-says",
      title: "What always follows the glue maker's instructions",
      blocks: [
        {
          ul: [
            "How to do the patch test and how long to wait afterwards.",
            "Whether to use primer, and how.",
            "The room humidity and temperature range that suits the glue.",
          ],
        },
        { p: "A patch test does not guarantee that the client will not react later. A client tested earlier is still asked every time whether her eyes have been all right since. Red or watery eyes, a stye, swollen or crusted lid margins mean stop, as in the lesson [When not to treat a customer](lesson:khi-nao-khong-lam)." },
        { note: "Rules on beauty services and products differ from country to country, so check the ones that apply where you work. This article is a training aid, not a licence.", kind: "info", title: "Rules differ by country" },
      ],
    },
    {
      id: "record-patch-test",
      title: "Save the patch test date and result in the client's profile",
      blocks: [
        { p: "The test date, the glue and the result are only useful if the next technician can find them. In VaraaAi you save these in the internal notes on the [client's profile](lesson:khach-hang), which only the salon can see, and only with the client's consent. The patch test and the set can be booked as two separate appointments in the [calendar](lesson:lich-hen), so the client does not have to remember the gap between them." },
      ],
    },
  ],
  howTo: {
    title: "How to prep lashes for extensions, step by step",
    id: "lash-prep-steps",
    after: "three-groups",
    lead: "Eleven steps in the order of the lesson video. The first three happen while the client is still sitting up with her eyes open.",
    supplies: [
      "Consultation form on paper or a tablet",
      "Disinfectant wipes, fresh bed cover and headrest liner, neck pillow, light blanket",
      "New gloves",
      "Oil-free make-up remover",
      "Lash cleanser, soft brush, clean water, tissues, small fan",
      "Under-eye pads and medical paper tape",
      "Single-use lash wands and micro brushes, primer if the glue maker recommends it",
      "Lash trays, glue, jade stone and two disinfected pairs of tweezers",
    ],
    steps: [
      {
        name: "Welcome the client and go through the form",
        text: "Wash your hands and seat the client while her eyes are still open. Hand her the consultation form and ask about allergies, earlier reactions to glue or lash tint, eye conditions, recent eye surgery, contact lenses, medication and pregnancy. Ask what look she wants, then let her read it all back and agree.",
        image: { src: img("tu-van-khach-noi-mi-khi-con-mo-mat"), alt: "A lash technician in a cream top sits facing a client on a sofa, writing on a clipboard during the consultation" },
      },
      {
        name: "Check the eyes and natural lashes in good light",
        text: "Even light, the client sitting up and looking upwards. Look for red or watery eyes, a stye, swollen or crusted lid margins. Look at the natural lashes too: dense or sparse, strong or weak, any broken lashes or patches of loss. If anything looks wrong, stop.",
      },
      {
        name: "Brief the client before she lies down",
        text: "Tell her the appointment can last one to two hours, lying still with her eyes closed the whole time. If her eyes sting, feel gritty or she needs a break, she raises a hand instead of opening her eyes. Suggest she uses the bathroom first. A client who knows what to expect lies stiller, and her eyes move less.",
      },
      {
        name: "Patch test a first-time client",
        text: "Follow the glue maker's instructions exactly, usually 24 to 48 hours before the set: a few lashes at the outer corner with the very glue you will use, or a tiny dot of glue near the lash line. Ask her to watch for redness, itching or swelling at home and call the salon if there is any. Record the date, glue and result; for a client tested earlier, open her profile, check the record and ask again.",
      },
      {
        name: "Prepare the bed, the lamp and your hands",
        text: "Wipe the bed with a disinfectant wipe, lay a fresh cover, a new headrest liner, a neck pillow and a light blanket. The lamp lights the eye area evenly without glaring into her face. Phone on silent, soft music, a comfortable room temperature. Then wash your hands and put on new gloves.",
        image: { src: img("lau-giuong-noi-mi-bang-khan-khu-khuan"), alt: "Two black-gloved hands wipe the cream surface of a lash bed with a disinfectant wipe, a folded fresh cover beside it", caption: "The bed is wiped for every client; the cover and headrest liner are always fresh." },
      },
      {
        name: "Lenses out, make-up off with an oil-free remover",
        text: "The client takes out her contact lenses first, because glue fumes and liquids can get trapped under the lens. Eye make-up, mascara and creams come off with an oil-free make-up remover. Any oil left on the lashes stops the glue holding well.",
        image: { src: img("thao-kinh-ap-trong-truoc-khi-noi-mi"), alt: "A client's hand places a contact lens into a small case on a cream towel, next to a bottle of solution on a white stone table" },
      },
      {
        name: "Cleanse, rinse and dry the lashes",
        text: "The client lies down with her eyes closed. Brush lash cleanser gently through the lashes with a soft brush, from root to tip. Rinse with clean water flowing gently from the top down, a tissue held at the outer corner. Dry thoroughly with a small fan held away from the face: only completely dry lashes bond well.",
        image: { src: img("xa-nuoc-sach-sau-khi-rua-mi"), alt: "A technician in black gloves squeezes a small bottle to rinse clean water over the closed lashes of a client, holding a tissue at the outer corner", caption: "Water flows gently from the top down, with a tissue at the outer corner." },
      },
      {
        name: "Place the under-eye pads",
        text: "The pad covers every lower lash, its top edge just under the lower lash line, never touching the waterline or the eye. Ask the client to open slightly and look up while you place it, so the edge tucks under the lower lashes, then let her close. Ask whether it feels scratchy and adjust straight away. Finally, check along the edge, especially at the outer corner, that no lower lash pokes out.",
        image: { src: img("dan-mieng-lot-duoi-mat-che-kin-mi-duoi"), alt: "A black-gloved finger gently presses a white under-eye pad below a client's closed eye, the pad fully covering the lower lashes" },
      },
      {
        name: "Use tape when needed",
        text: "If any lower lashes still poke out, add a small piece of medical paper tape, only on the pad and the cheek. On hooded eyes, many technicians use a small piece of tape to lift the lid skin gently so the lash line is clearly visible. Apply it lightly, ask whether it feels tight, and never put tape on the eye.",
        image: { src: img("dan-bang-dinh-giay-giu-mi-duoi"), alt: "Close-up of a closed eye with a white pad, a black-gloved finger adding a strip of paper tape near the outer corner" },
      },
      {
        name: "Brush, and use primer if the glue maker recommends it",
        text: "Brush the lashes so they separate. Primer removes the remaining oils so the glue bonds better, and it is only used when the glue maker recommends it. Sweep it lightly over the middle and tips of the lashes with a single-use micro brush, well away from the roots and the lid skin. Then brush again so the lashes separate evenly.",
        image: { src: img("quet-primer-len-than-mi-truoc-khi-noi"), alt: "A small single-use micro brush sweeps lightly along the lashes of a client with closed eyes, a white pad underneath", caption: "Primer goes on the middle and tips only, never on the roots or the lid skin." },
      },
      {
        name: "Set the tray and ask one last question",
        text: "On the tray: lash strips in the order of the lash map, a jade stone with a fresh drop of glue, two disinfected pairs of tweezers, a lash wand and single-use micro brushes. Cap the glue bottle straight away and check the room humidity and temperature against the glue maker's range. Ask the client whether she is comfortable and her neck is all right, and only then place the first lash.",
      },
    ],
  },
  faq: [
    {
      q: "What do you need to do before lash extensions?",
      a: "Consult and check the client's eyes, patch test first-time clients, wipe the bed and change the cover, have the client take out contact lenses and remove make-up with an oil-free remover, cleanse and dry the lashes, place pads over the lower lashes, brush and set the tray. Primer is used only if the glue maker recommends it.",
    },
    {
      q: "Do you need to remove make-up before lash extensions?",
      a: "Yes. Eyeshadow, mascara and creams have to come off with an oil-free make-up remover, because oil left on the lashes weakens the bond. The technician then also cleanses the lashes with lash cleanser and dries them completely.",
    },
    {
      q: "Can you wear contact lenses during lash extensions?",
      a: "No, the client takes them out before the appointment. Glue fumes and liquids can collect under the lens, so lenses come out to protect the eyes.",
    },
    {
      q: "How do you apply under-eye pads for lash extensions?",
      a: "The pad covers every lower lash, with its top edge just under the lower lash line but not touching the waterline. Touching the waterline causes scratching, stinging and red eyes; placed too low, lower lashes escape and get glued to the upper ones. Ask the client to look up slightly while you place it, and ask whether it feels scratchy.",
    },
    {
      q: "How do you use lash primer?",
      a: "Only if the glue maker recommends it, and exactly as they describe. Sweep it lightly over the middle and tips of the lashes with a single-use micro brush, away from the roots and the lid skin, then brush the lashes again so they separate evenly.",
    },
    {
      q: "How do you patch test a first-time lash client?",
      a: "As the glue maker describes, often 24 to 48 hours before the set, with the glue you will actually use: a few lashes at the outer corner or a tiny dot of glue near the lash line. The client watches for a reaction and reports back, and the salon records the date, glue and result. A test does not guarantee there will be no reaction later.",
    },
  ],
  related: ["mi-chuan-bi-hieu-dung", "mi-classic", "mi-mapping", "ve-sinh-dung-cu"],
};

export default article;
