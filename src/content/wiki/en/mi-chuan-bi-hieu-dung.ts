import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-chuan-bi-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "lash-extension-patch-test-and-consultation",
  lesson: "mi-chuan-bi-hieu-dung",
  category: "lash",
  title: "Lash extension patch test and consultation: what to ask, when not to treat and what a test cannot promise",
  metaTitle: "Lash extension patch test and consultation: a safe start",
  metaDescription:
    "Lash extension patch test and consultation: questions on allergies and eyes, when not to treat, cyanoacrylate fumes, testing 24–48 hours ahead, and its limits.",
  keyword: "lash extension patch test",
  keywords: ["lash extension consultation questions", "how long before lash extensions to patch test", "lash glue allergy", "lash extension contraindications", "lash extensions while pregnant", "cyanoacrylate lash glue fumes", "lash extensions with contact lenses"],
  excerpt: "The first ten minutes of a lash appointment decide how long the set lasts and how safe it is: what to ask, when to reschedule, and what a patch test really tells you.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-noi-mi-chuan-bi-khay-dung-cu-truoc-buoi-lam"),
    alt: "A lash technician with dark hair in a high bun and a cream top arranges lash trays, a jade stone and tweezers on a marble table before an appointment",
  },
  takeaways: [
    "Every lash appointment starts with a **consultation**, regular clients included. Safety questions come first, the look comes second.",
    "Red or watery eyes, a stye, swollen or crusted lid margins, or recent eye surgery: not today.",
    "Lash glue is cyanoacrylate and gives off fumes while it cures, so the client's eyes stay closed throughout. A glue allergy can **build up over time**, after many trouble-free sets.",
    "Patch test before the first set, usually 24 to 48 hours ahead, exactly as the glue maker describes. **A patch test is no guarantee.**",
    "Redness, itching or swelling after the test means no set, no switching to another glue, and advice to see a doctor.",
  ],
  intro: [
    "A lash extension patch test is the part of the appointment most clients have heard of, but it is only one piece of the first ten minutes: ask, look, test, clean and record. Nobody takes photos of those ten minutes and nobody praises them, yet they decide whether the set lasts and, more importantly, whether the client is safe.",
    "This article follows the VaraaAi Academy lesson “Lash preparation: understand it to be safe from the first minute” in the Lashes course. By the end you will know what to ask in the consultation, recognise the days when an appointment should be moved, understand why lash glue calls for so much care, and be able to explain to a client what a patch test can and cannot tell her.",
  ],
  sections: [
    {
      id: "why-consultation",
      title: "Why every lash appointment starts with a consultation",
      blocks: [
        { p: "Here is something that happens a lot. The salon is busy, the technician is running late, says hello and has the client lie down straight away. No questions, no close look at the eyes. A few days later the client sends a message: her eyelids are swollen, itchy and red. Only when you ask do you learn that she once reacted to lash glue at another salon." },
        { p: "One question at the start would have prevented it. That is why the consultation is not just for new clients. Regular clients are asked again too, because health, medication and even the reaction to glue can change between two appointments." },
        { img: { src: img("tu-van-khach-truoc-khi-noi-mi-bang-may-tinh-bang"), alt: "A lash technician in a cream top sits beside a client on a sofa, both looking at a consultation form on a tablet in an elegant lash studio", caption: "The consultation happens while the client is still sitting up with her eyes open, before she lies down." } },
      ],
    },
    {
      id: "consultation-questions",
      title: "Lash extension consultation questions",
      blocks: [
        { p: "The order matters: safety first, the look second. If the safety answers already show that today is not the day, there is no point discussing styles." },
        {
          table: {
            head: ["Ask about", "The question", "Why you need to know"],
            rows: [
              ["Allergies", "Any earlier reaction to lash glue, lash or brow tint, or cosmetics around the eyes", "A client who has reacted before: stop, and do not go ahead until it is clear"],
              ["Eye conditions", "Dry eyes, red eyes, an inflamed lash line; recent eye surgery or eye treatment", "Eyes with a problem today: not today"],
              ["Contact lenses", "Is she wearing them", "Lenses come out before the appointment"],
              ["Medication", "Is she taking anything", "Some medicines, such as certain allergy or acne medicines, can dry the eyes"],
              ["Pregnancy", "Is she pregnant", "A reason to ask more carefully and follow the glue maker's instructions"],
            ],
          },
        },
        { note: "With a pregnant client, ask more carefully and follow the glue maker's instructions and the advice where you work. Lash technicians are not doctors: never give medical advice yourself. If the client has a health question, advise her to ask a doctor.", kind: "warn", title: "You are not the doctor" },
        { p: "Only then comes the look. Does she want natural lashes or something fuller? What does she do for work? Does she swim or use the sauna often, rub her eyes, sleep face down? Then tell her honestly how much her natural lashes can carry. Choosing a style for the eye shape is covered in [lash mapping](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "contraindications",
      title: "Lash extension contraindications: when not to treat today",
      blocks: [
        { p: "After asking, look. Check the client's eyes in good light while she is still sitting up with her eyes open." },
        { img: { src: img("kiem-tra-mat-khach-duoi-anh-sang-tot"), alt: "A lash technician in black gloves holds a magnifying glass to look at the eyes of a seated client under an evenly lit ring light", caption: "Look at the eyes in good light before the client lies down." } },
        { p: "Any of these means no lashes today:" },
        {
          ul: [
            "Red or watery eyes.",
            "A stye.",
            "Swollen or crusted lid margins.",
            "Recent eye surgery.",
          ],
        },
        { img: { src: img("mat-do-chay-nuoc-chua-nen-noi-mi"), alt: "Close-up of a woman lying on a cream bed with one eye red around the lid and slightly watery", caption: "Illustration: a red, watery eye. In this case, book the client for another day." } },
        { p: "The fuller list, and how to say no kindly, is in the lesson [When not to treat a customer](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "glue-and-allergy",
      title: "Cyanoacrylate lash glue and glue allergies",
      blocks: [
        { p: "The glue is the main reason for all this care. Lash glue is cyanoacrylate, which cures with the moisture in the air. While it cures it gives off fumes. The fumes sting and irritate the eyes, so the client's eyes stay fully closed for the whole appointment." },
        { img: { src: img("giot-keo-noi-mi-cyanoacrylate-tren-da-ngoc"), alt: "A black-gloved hand holds curved tweezers with a single extension above a small drop of black glue on a jade stone", caption: "A small drop of glue on the jade stone. The glue gives off fumes as it cures, so the drop never sits right under the client's nose." } },
        { p: "The most important point to understand: an allergy to the glue can build up gradually. Some clients have ten sets without a problem and react on the eleventh. The same goes for technicians, who breathe the fumes every working day. The lesson [Allergies and chemicals](lesson:di-ung-hoa-chat) goes into this in detail." },
        { img: { src: img("mi-mat-do-sung-do-di-ung-keo-noi-mi"), alt: "Close-up of a woman without make-up whose upper eyelids are slightly swollen and reddened, a sign of a reaction around the eyes", caption: "Illustration of a reaction around the eyes: swollen, red lids. A client with signs like these should see a doctor." } },
      ],
    },
    {
      id: "patch-test",
      title: "Lash extension patch test: how long before, and why it is no guarantee",
      blocks: [
        { p: "Because an allergy can develop like this, many glue makers and salons advise a patch test before the first set, usually 24 to 48 hours before the appointment. Follow the glue maker's own method. Usually you attach a few lashes at the outer corner, or put a tiny dot of glue near the lash line, and send the client home. She watches for redness, itching or swelling and lets the salon know." },
        { img: { src: img("thu-keo-noi-mi-vai-soi-o-duoi-mat"), alt: "Close-up of a client's closed eye with a white pad underneath and a few longer extensions attached at the outer corner as a patch test", caption: "A common way to test: a few lashes at the outer corner." } },
        { h3: "Reading the result correctly" },
        { p: "No reaction to the test does not mean there will never be a reaction later. A patch test only helps you spot the clients who are already sensitive. So every time a client comes back, ask one question: “Were your eyes all right after last time?” If she says no, stop, and do not go ahead until it is clear." },
        { h3: "When the client reports a reaction" },
        {
          ol: [
            "No lashes that day. Tell her gently.",
            "Advise her to ask a doctor.",
            "Record the result, so nobody at the salon does the service by mistake.",
          ],
        },
        { note: "Do not switch to another glue and carry on because you hate to lose the client. You do not know which ingredient she reacts to, and the next reaction may be worse.", kind: "warn", title: "No switching glue to go ahead" },
        { note: "How and when to test is always as the glue maker describes. Rules on beauty services and products differ from country to country, so check the ones that apply where you work. This article is a training aid, not a licence.", kind: "info", title: "Glue maker's instructions and local rules" },
      ],
    },
    {
      id: "room-and-hygiene",
      title: "The room: humidity, temperature and hygiene",
      blocks: [
        { p: "The room is part of the preparation too. Each glue maker gives a humidity and temperature range, and you keep the room within it. The room is well ventilated, and the glue bottle is closed straight after you take a drop." },
        { img: { src: img("phong-noi-mi-giu-do-am-va-nhiet-do"), alt: "An empty corner of a lash studio where a small humidifier releases mist on a stone ledge by the window next to a vase of white flowers" } },
        {
          table: {
            head: ["Item", "How it is handled"],
            rows: [
              ["Bed", "Wiped down for every client"],
              ["Cover and headrest liner", "Changed for every client"],
              ["Lash wands, micro brushes, under-eye pads", "Single use"],
              ["Tweezers", "Cleaned and disinfected after every client"],
            ],
          },
        },
        { img: { src: img("khu-khuan-nhip-va-bo-do-dung-mot-lan"), alt: "A black-gloved hand drops two pairs of tweezers into a container of disinfectant, next to a lidded bin holding used lash wands", caption: "After each client: single-use items are thrown away, tweezers are cleaned and disinfected." } },
        { p: "The client lies close to your face for two hours. A clean workspace is something she sees at first glance, and it puts her at ease. How to handle tweezers is in [Tools after every customer](lesson:ve-sinh-dung-cu)." },
      ],
    },
    {
      id: "client-records",
      title: "Client records: only with consent, and kept confidential",
      blocks: [
        { p: "The last job of the first ten minutes is to write it down: the client's answers, the patch test date and result, the glue used, the lengths and curls. Many salons also have the client read and agree in writing before the first set." },
        { img: { src: img("ghi-ho-so-khach-va-ngay-thu-keo"), alt: "A lash technician in a cream top sits at a stone table by the window typing client notes into a tablet, a cup of tea beside her" } },
        { p: "In VaraaAi you write this in the internal notes on the [client's profile](lesson:khach-hang), which only the salon can see. Next time, whoever does the lashes opens the profile and knows straight away. This is health information and private, so record it only with the client's consent and keep it strictly confidential." },
        { p: "For a first-time client you can put two entries in the [calendar](lesson:lich-hen): the patch test and the set, spaced as the glue maker advises. The hands-on part at the bed, from cleansing the lashes to placing the pads, is in the practice article on [how to prep lashes for extensions](lesson:mi-chuan-bi)." },
      ],
    },
  ],
  faq: [
    {
      q: "Do you need a patch test before lash extensions?",
      a: "Many glue makers and salons advise a patch test before the first set, usually 24 to 48 hours before the appointment, done exactly as the glue maker describes. The client watches for redness, itching or swelling and tells the salon.",
    },
    {
      q: "If the patch test was fine, can I still be allergic to lash glue?",
      a: "Yes. A patch test is no guarantee, because an allergy to the glue can build up after repeated exposure. The test only helps to spot people who are already sensitive, which is why the technician asks at every visit whether the eyes were all right last time.",
    },
    {
      q: "When should you not get lash extensions?",
      a: "Not on a day when the eyes are red or watery, there is a stye, the lid margins are swollen or crusted, or after recent eye surgery. A client who reacted to a patch test should not have the set either, and should ask a doctor.",
    },
    {
      q: "Can you get lash extensions while pregnant?",
      a: "A lash technician does not give medical advice on this. With a pregnant client, the technician asks more carefully and follows the glue maker's instructions and the advice where they work. A client with health concerns should ask her doctor first.",
    },
    {
      q: "Why do you have to keep your eyes closed during lash extensions?",
      a: "Lash glue is cyanoacrylate, which cures with moisture and gives off fumes while curing. The fumes sting and irritate the eyes, so the eyes stay closed for the whole appointment. Open eyes take the fumes straight in.",
    },
    {
      q: "Can a technician use a different glue if the patch test reacted?",
      a: "No. The technician does not know which ingredient caused the reaction, and the next one could be worse. There are no lashes that day, the client is advised to see a doctor, and the result is recorded so the whole salon knows.",
    },
  ],
  related: ["mi-chuan-bi", "mi-classic-hieu-dung", "di-ung-hoa-chat", "khi-nao-khong-lam"],
};

export default article;
