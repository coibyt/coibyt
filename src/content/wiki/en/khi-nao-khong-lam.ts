import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/khi-nao-khong-lam/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "beauty-treatment-contraindications",
  lesson: "khi-nao-khong-lam",
  category: "safety",
  title: "Contraindications for beauty treatments: when not to do nails, lashes, hair or waxing, and how to say no",
  metaTitle: "Contraindications for beauty treatments: when to say no",
  metaDescription:
    "Contraindications for beauty treatments: signs on nails, eyes, scalp and skin that mean stop, what to ask before a service, and how to decline kindly.",
  keyword: "contraindications for beauty treatments",
  keywords: [
    "can you get gel nails with nail fungus",
    "lash extensions with pink eye",
    "waxing while on isotretinoin",
    "pedicure for diabetics",
    "how to refuse a client politely",
    "lash extension contraindications",
    "head lice at the hairdresser",
  ],
  excerpt: "Knowing when not to work is part of the skill. The signs on nails, eyes, scalp and skin that mean a medical check comes first, and how to say no kindly.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-lam-dep-xem-tay-khach-truoc-khi-lam"),
    alt: "A beauty therapist in a cream top sits at the consultation table, lifting both of the client's hands to look at them closely before starting",
  },
  takeaways: [
    "Before every service, do two things: **look** in good light while skin and nails are clean, and **ask** a few short questions about allergies, medicines, diabetes, recent surgery or infection.",
    "**Beauty professionals do not diagnose.** Describe what you see, suggest a doctor or pharmacist, and stop there.",
    "Discoloured, thickened, crumbling or lifting nails; swollen red skin or pus; red, sticky eyes; scalp sores or lice; sunburnt or broken skin: do not work on that area.",
    "A client taking isotretinoin, or who stopped within about the last six months, is not waxed.",
    "When in doubt whether to go ahead, the answer is **don't**.",
  ],
  intro: [
    "Contraindications for beauty treatments are rarely taught in depth, because they go against every instinct of a service professional. The client has come all the way in, the salon needs the booking, and “I'm sorry, I can't do this for you today” is a hard sentence to say. But dark polish over a greenish nail cures nothing. It only hides the problem until it gets worse, and then the client comes back and blames the salon.",
    "This article follows the VaraaAi Academy lesson “When not to treat a customer” in the Hygiene & safety course. You will learn what to look at and ask before every service, which signs on nails, eyes, scalp and skin mean you must stop, how to decline while keeping the client's dignity, and when it is the professional who should not be working. It does not replace medical advice.",
  ],
  sections: [
    {
      id: "look-and-ask",
      title: "What to look at and ask before every service",
      blocks: [
        { p: "The check happens before you pick up a tool. Look in good light, while the skin and nails are still clean, with no polish and nothing applied. Old polish or a layer of foundation hides exactly what you need to see." },
        { p: "Then ask a few short questions and write the answers on the consultation card:" },
        {
          ul: [
            "Do you have any allergies?",
            "Are you taking any medicines, or having any treatment for your skin or eyes?",
            "Do you have diabetes?",
            "Have you recently had surgery or any infection?",
          ],
        },
        { img: { src: img("hoi-khach-va-ghi-phieu-tu-van"), alt: "A beauty therapist writes on a small card on a stone table while talking to a blonde client sitting opposite her", caption: "A few short questions before the service, noted on the consultation card." } },
        { note: "Ask regular clients again too. Health changes over time: someone who took no medicines last year may be in treatment this year.", kind: "tip", title: "Do not skip your regulars" },
      ],
    },
    {
      id: "do-not-diagnose",
      title: "Beauty professionals do not diagnose: describe what you see",
      blocks: [
        { p: "A beauty professional is not a doctor and does not name diseases. Never say “you have a fungal infection”. Say what you see: “I can see this nail has changed colour and thickened. I think a doctor or a pharmacist should look at it first.”" },
        { p: "The reason is practical: nobody can be sure by eye. A thick, yellowish nail may be a fungus, may be psoriasis, or may simply come from years of tight shoes. Some of these are contagious and some are not. Telling them apart is the job of a health professional. Ours is to notice that something is not normal and to stop at the right moment." },
        { p: "Naming the wrong disease can also hurt or frighten a client for no reason. Describing what you see is always accurate, and it is much harder to take offence at." },
      ],
    },
    {
      id: "nail-signs",
      title: "Nail contraindications: when not to apply gel or do a manicure",
      blocks: [
        { p: "If you see any of these signs, do not work on that nail or that area of skin:" },
        {
          ul: [
            "Green, yellow or brown discolouration.",
            "A thickened, brittle, crumbling nail.",
            "A nail plate lifting away from the nail bed.",
            "Swollen, red, painful skin around the nail, or pus.",
            "Warts.",
            "Open wounds.",
          ],
        },
        { img: { src: img("mong-tay-nga-xanh-khong-nen-son-gel"), alt: "Close-up of a fingertip supported by a hand in a black glove, the natural nail showing a greenish-yellow discoloured area", caption: "A nail discoloured like this is not covered with polish; suggest the client lets a doctor or pharmacist look at it." } },
        { img: { src: img("da-quanh-mong-sung-do"), alt: "Close-up of a fingertip resting on a cream towel, the skin at the side and base of the nail slightly swollen, pink-red and shinier than the next finger" } },
        { p: "The other nails, if they are healthy, can still be done. The tools used that day must be processed very carefully, because if they are not, they carry germs to the next client. The routine is in [Tools after every customer](lesson:ve-sinh-dung-cu)." },
        { h3: "The feet of a client with diabetes" },
        { p: "This is a case for extra care. The feet of someone with diabetes may have reduced feeling, so the client may not notice water that is too hot or a small cut, and cuts heal very slowly." },
        {
          ul: [
            "Lukewarm water only, no long soaking.",
            "No blades, no cutting of skin.",
            "If the foot has an ulcer or a wound, do not treat it. Suggest a doctor or a podiatrist.",
          ],
        },
        { img: { src: img("kiem-tra-ban-chan-truoc-khi-lam-mong-chan"), alt: "A pedicurist in black gloves sits on a low stool, lifting the client's bare foot to look at the sole before starting", caption: "Check the sole and between the toes before the foot goes into the bath." } },
      ],
    },
    {
      id: "eyes-scalp-skin",
      title: "Eyes, scalp and skin: when to stop lashes, hair or waxing",
      blocks: [
        { h3: "Lashes and brows" },
        {
          ul: [
            "Eyes that are red, itchy, watery or sticky.",
            "A stye, or lid margins that are swollen, red or crusty.",
            "Tiny specks clinging to the lash roots, with badly itching lashes.",
            "After eye surgery or an eye infection: wait until the doctor agrees.",
            "A client who has reacted to lash glue or tint: not that product again.",
          ],
        },
        { img: { src: img("mat-do-co-leo-khong-noi-mi"), alt: "Close-up of a woman's face, one eye red and slightly watery, the upper lid swollen and pink with a small bump on the lash line" } },
        { p: "Reactions to glue and tint are explained in detail in [Allergies and chemicals](lesson:di-ung-hoa-chat)." },
        { h3: "Hair and scalp" },
        {
          ul: [
            "Head lice, and nits stuck to the hair shafts.",
            "Sores or open wounds on the scalp.",
            "Round, red, scaly patches.",
            "Heavy or patchy hair loss with no clear reason.",
          ],
        },
        { p: "If you find lice, do not panic and do not say it out loud. Stop, tell the client in private and suggest a visit to the pharmacy. Then wash the towels and reprocess the combs, scissors and cape thoroughly." },
        { img: { src: img("kiem-tra-da-dau-truoc-khi-lam-toc"), alt: "A hairdresser in a black apron and gloves parts the hair of a client sitting with her back turned, using the tail of a comb to look at the scalp", caption: "Part the hair and look at the scalp while it is still dry, before washing or mixing colour." } },
        { h3: "Skin, spa and waxing" },
        {
          ul: [
            "Sunburnt skin.",
            "Broken or infected skin.",
            "Cold sores on the lips.",
            "Rashes that may be contagious.",
          ],
        },
        { p: "Before waxing there is one question you always ask: is the client using any acne medicine or a retinoid cream? The acne tablet isotretinoin makes the skin thin and fragile, and wax can lift off a layer of skin. If the client is taking it, or stopped within about the last six months, do not wax; if it suits, you can suggest a gentler method such as tweezing. For creams, follow the instructions of the wax brand and the advice of the prescribing doctor." },
        { img: { src: img("hoi-ve-kem-retinoid-truoc-khi-wax"), alt: "A client in a cream robe sits on the edge of a spa bed, handing a white tube of cream to the therapist to look at before waxing" } },
      ],
    },
    {
      id: "how-to-decline",
      title: "How to refuse a client politely and keep their dignity",
      blocks: [
        { p: "The words are the hardest part of this lesson. The client will remember your attitude in that half minute for a long time." },
        {
          table: {
            head: ["Do", "Avoid"],
            rows: [
              ["Speak privately and quietly, out of other clients' hearing", "Explaining loudly for the whole salon to hear"],
              ["Talk about the client's safety", "Talking about your own fear"],
              ["Offer another way: the other nails, a different service, or rebooking once the doctor says it is fine", "Saying no and letting the client leave with nothing"],
              ["Keep your normal expression and distance", "Looking disgusted, stepping back, putting on extra gloves"],
            ],
          },
        },
        { img: { src: img("tu-choi-khach-noi-rieng-noi-nho"), alt: "A beauty therapist sits close beside a client in a quiet corner of the salon, leaning in to speak softly, one hand resting lightly on the client's arm", caption: "A private corner, a quiet voice and an offer to rebook." } },
        { note: "One sentence that works every time: “I want you to look good and stay safe, so I'd rather not do this part today.”", kind: "tip", title: "A sentence to use" },
        { p: "Some clients will insist: “It's fine, just do it, it's my responsibility.” You still don't. That promise will not make a red eye clear or a wound heal. Say again, gently: “I'm saying no because I care about you.”" },
        { p: "Declining at the right moment does not lose you clients. People who are told the truth and allowed to keep their dignity usually come back, and trust you more than before. Losing one appointment today is better than losing the reputation of the whole salon." },
      ],
    },
    {
      id: "record-and-rebook",
      title: "Record it and rebook the client",
      blocks: [
        { p: "After declining, note three things on the client's record: the date, what you saw and what you advised. Write only what you saw, never the name of a disease. This is health information, so record it only with the client's consent and keep it strictly confidential." },
        { p: "In VaraaAi the place for it is the internal notes on the client's profile, which only the salon can see; see the [customer book](lesson:khach-hang) lesson. Rebook the client straight away in the [calendar](lesson:lich-hen) too, so they can see they have not been turned away for good, only moved to a safer day." },
      ],
    },
    {
      id: "when-you-should-not-work",
      title: "When the professional should not be working",
      blocks: [
        { p: "The stop rule works both ways. The professional can be the source of an infection too." },
        {
          table: {
            head: ["Your condition", "What to do"],
            rows: [
              ["A small, clean cut on the hand", "Waterproof plaster, then gloves"],
              ["A hand wound that is swollen, red or has pus", "Do not touch clients, and see a doctor"],
              ["Fever, diarrhoea, vomiting, pink eye or another contagious illness", "Stay at home"],
            ],
          },
        },
        { img: { src: img("tho-dan-bang-kin-nuoc-len-vet-xuoc-o-tay"), alt: "A beauty therapist in a cream top puts a plaster on her own fingertip, a box of black nitrile gloves beside her" } },
        { p: "Salon owners should tell staff plainly that calling in sick is not a fault. One professional who works while ill can pass it on to many clients in a single day. How to wear and change gloves properly is in [Hand hygiene, gloves and protective wear](lesson:rua-tay-gang-tay)." },
        { note: "Rules on when a service must be refused differ from country to country. This article does not replace a doctor's advice.", kind: "warn", title: "Please note" },
      ],
    },
  ],
  faq: [
    {
      q: "Can you get gel nails if you have nail fungus?",
      a: "A nail technician cannot tell whether a nail has a fungus, because nobody can be sure by eye. But a nail that is green, yellow or brown, thickened, crumbling or lifting from the nail bed should not have gel applied to it. Polish cures nothing and only hides the problem until it gets worse. Let a doctor or pharmacist look at it first.",
    },
    {
      q: "Can you get lash extensions with pink eye or a stye?",
      a: "No. Red, itchy, watery or sticky eyes, a stye, or swollen, red, crusty lid margins are all signs to stop. After an eye infection or eye surgery, wait until the doctor agrees before having lash extensions.",
    },
    {
      q: "Can you get waxed while taking isotretinoin?",
      a: "No. Isotretinoin makes the skin thin and fragile, and wax can lift off a layer of skin. No waxing during treatment or for about six months after stopping. For retinoid creams, follow the wax brand's instructions and the prescribing doctor's advice.",
    },
    {
      q: "Can someone with diabetes have a pedicure in a salon?",
      a: "Yes, if there is no ulcer or wound on the foot, but it needs extra care: lukewarm water only, no long soaking, no blades and no cutting of skin. Feet affected by diabetes may have reduced feeling, and small cuts heal slowly. With an ulcer or a wound, do not treat; the client should see a doctor or a podiatrist.",
    },
    {
      q: "What should a hairdresser do on finding head lice?",
      a: "Stop, without panicking and without saying it out loud. Tell the client in private and suggest a visit to the pharmacy. Then wash the towels and reprocess the combs, scissors and cape thoroughly before using them on anyone else.",
    },
    {
      q: "Should you go ahead if the client says “just do it, it's my responsibility”?",
      a: "No. That promise will not make a red eye clear or a wound heal. Repeat gently that you are saying no for the client's safety, and offer another way: work on the healthy areas, change the service or rebook.",
    },
  ],
  related: ["di-ung-hoa-chat", "xu-ly-su-co", "ve-sinh-dung-cu", "rua-tay-gang-tay"],
};

export default article;
