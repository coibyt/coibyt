import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-mat-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "facial-massage-benefits-and-when-to-avoid-it",
  lesson: "spa-massage-mat-hieu-dung",
  category: "spa",
  title: "Facial massage benefits: what it really does, when to avoid it and where to go gently",
  metaTitle: "Facial massage benefits: what it does, when to avoid it",
  metaDescription:
    "Facial massage benefits and limits: when not to massage, choosing the oil, the four basic movements, stroke direction, the eye area, the neck and pressure points.",
  keyword: "facial massage benefits",
  keywords: [
    "what does facial massage do",
    "does facial massage slim the face",
    "when not to have a facial massage",
    "facial massage after fillers",
    "basic facial massage movements",
    "facial pressure points",
    "facial massage oil",
  ],
  excerpt: "Facial massage in a spa is there to relax the client and make the skin look fresher, not to treat anything. This article covers pressure, direction, rhythm and when not to massage.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-ngoi-dau-giuong-massage-mat-cho-khach"),
    alt: "A therapist in a cream tunic sits at the head of the bed with both hands resting lightly on the face of a client lying with her eyes closed, in a room with arched windows",
  },
  takeaways: [
    "Facial massage in a spa helps the client **relax** and makes the skin look fresher. Don't promise a slimmer face, fewer wrinkles or a cure for headaches.",
    "Ask before you touch: a fever, a cold, cold sores, inflamed spots with pus, broken skin, sunburn or a recent cosmetic procedure are all reasons to rebook or avoid that area.",
    "Strokes on the face go **upwards and outwards**. Never drag the skin down or rub back and forth.",
    "Around the eyes use only the ring finger and never press on the eyelids. On the neck, only light strokes down the sides, never pressure on the front of the throat.",
    "Ask about pressure before you start, after the first few movements and when you change area. A silent client is not necessarily a comfortable one.",
  ],
  intro: [
    "Facial massage benefits are something many clients ask about before booking a facial. The honest answer is short: facial massage helps the client relax and makes the skin look fresher. It does not slim the face, erase wrinkles or treat any illness. For the client to really let go, the therapist has to master pressure, direction and rhythm, and above all know when not to massage.",
    "This article follows the VaraaAi Academy lesson “Facial massage: understand it so clients relax safely” in the Spa & skin care course, the theory half of the topic. By the end you will know when to rebook, how to choose the oil, what each movement is for and which areas need the lightest touch. A complete massage sequence, step by step, is in the article [How to do a facial massage](lesson:spa-massage-mat).",
  ],
  sections: [
    {
      id: "what-it-does",
      title: "What does facial massage do, and what can it not do",
      blocks: [
        { p: "Facial massage is often the part of a facial the client remembers most. Its measure is simple: a good massage is one where the client lets go. If she is still tensing up, the pressure is wrong." },
        { p: "Something that happens a lot with new therapists: wanting to show how thorough they are, they press very hard, drag the skin back and forth and even press around the eyes. The client feels pain but is too polite to say so. The next day her skin is red and slightly sore, and she does not rebook." },
        {
          table: {
            head: ["Clients often ask", "The honest answer"],
            rows: [
              ["What does facial massage do?", "It helps you relax and makes the skin look fresher"],
              ["Will it slim my face?", "This should not be promised"],
              ["Will it remove wrinkles?", "This should not be promised"],
              ["Do pressure points cure headaches?", "In a spa, press-and-hold is for relaxation, not treatment"],
            ],
          },
        },
        { note: "Rules and job titles for massage differ from country to country. Facial massage in a spa is for relaxation, not treatment. This article is a training aid, not a licence.", kind: "warn", title: "The limits of spa massage" },
      ],
    },
    {
      id: "when-not-to-massage",
      title: "When not to have a facial massage",
      blocks: [
        { p: "Before you touch the client's face, ask. Most problems after a massage come from things a few questions at the start would have revealed." },
        {
          table: {
            head: ["The client has", "What to do"],
            rows: [
              ["A fever, a cold, or feels unwell", "Rebook for another day"],
              ["Cold sores, an infection, inflamed spots with pus, broken skin, sunburn", "Do not massage that area"],
              ["A recent peel, laser, injectables or facial surgery", "Ask the practitioner who did it how long to wait, and follow that advice"],
              ["An unknown lump or unexplained swelling", "Do not massage; suggest she sees a doctor. A therapist does not diagnose"],
              ["An uncontrolled condition: high blood pressure, heart disease, treatment for a serious illness", "Advise her to ask her doctor first"],
              ["Red, sensitive skin with visible small blood vessels", "Very light, few movements, or skip the massage"],
            ],
          },
        },
        { img: { src: img("mun-rop-o-moi-khong-massage-mat-vung-do"), alt: "Close-up of the lower half of a woman's face with a small cluster of blisters at the corner of her upper lip on slightly pink skin", caption: "A cold sore on the lip: no massage on that area." } },
        { p: "The signs that mean saying no or rebooking for any service are covered in detail in the lesson [When not to treat a client](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "facial-massage-oil",
      title: "Facial massage oil: enough slip, ask about allergies, use a pump",
      blocks: [
        { p: "Massage oil or cream has one main job: letting your hands glide without dragging the skin. Too little and your hands pull the skin along. Too much and everything slides, so the pressure is hard to control." },
        {
          ul: [
            "**Ask about allergies.** Many oils are made from nuts, such as almond oil. Ask about fragrance and essential oils too.",
            "**Essential oils.** Use only those the brand has already blended for the face; never mix your own.",
            "**Sensitive clients.** Test on a small area of skin first. How and why is in the lesson [Allergies and chemicals](lesson:di-ung-hoa-chat).",
            "**Dispensing.** Use a pump; never dip your fingers into the bottle.",
          ],
        },
        { img: { src: img("lay-dau-massage-mat-bang-voi-bom"), alt: "A therapist presses the pump of an amber glass bottle and a little golden oil drops into her palm, a client lying on the bed behind her", caption: "Pump the oil into your palm; your fingers never go into the bottle." } },
      ],
    },
    {
      id: "massage-by-skin",
      title: "Adapting facial massage to each skin",
      blocks: [
        { p: "One massage routine does not suit every client. The amount of oil, the number of movements and the length of the massage change with the skin." },
        {
          table: {
            head: ["Skin", "How to massage"],
            rows: [
              ["Dry or dehydrated", "Enough oil or cream, slow and long strokes"],
              ["Oily or acne-prone", "Little oil, a product the brand marks as suitable for oily skin, skip inflamed spots"],
              ["Sensitive, easily red", "Few movements, the lightest touch, no tapping, a shorter massage"],
              ["Thin skin, older clients", "Never drag the skin"],
            ],
          },
        },
        { img: { src: img("massage-mat-cho-khach-lon-tuoi-da-mong"), alt: "Two hands rest gently on the forehead and cheek of an older female client in a white headband, lying with her face turned slightly and her eyes closed", caption: "The thin skin of an older client: the hands rest and glide, never drag." } },
      ],
    },
    {
      id: "movements-and-direction",
      title: "Basic facial massage movements and stroke direction",
      blocks: [
        { p: "Facial massage uses only a few basic movements. A full sequence is the four movements below linked together, varied by pressure, direction and rhythm." },
        {
          table: {
            head: ["Movement", "How", "When"],
            rows: [
              ["Effleurage (stroking)", "The whole palm glides long and light", "To open, close and link the other movements"],
              ["Small circles", "Middle and ring fingertips draw small circles", "On the cheeks and along the jawline"],
              ["Press-and-hold", "Press slowly, hold a few seconds, release slowly", "Temples, under the cheekbones, between the brows"],
              ["Light tapping", "Fingertips touch quickly and lightly, like raindrops", "Skip it on sensitive skin"],
            ],
          },
        },
        { h3: "Direction: upwards and outwards" },
        { p: "On the face, strokes usually go upwards and outwards: from the chin to the ears, from the sides of the nose to the temples, from the brows to the hairline. Never drag the skin down and never rub back and forth. Facial skin is thin, and dragging it hard again and again leaves it red and uncomfortable." },
      ],
    },
    {
      id: "eyes-neck-pressure-points",
      title: "The eye area, the neck and facial pressure points",
      blocks: [
        { p: "Two areas need more care than anywhere else on the face." },
        {
          ul: [
            "**The eye area.** Use only the ring finger: it is the weakest finger, so its pressure is naturally the lightest. Glide along the bone around the eye socket and never press on the eyelids.",
            "**The neck.** Only light strokes down the sides of the neck towards the collarbones. Never press on the front of the throat or deep into the sides of the neck, because the front and sides of the neck hold blood vessels and the windpipe.",
          ],
        },
        { h3: "Press-and-hold is for relaxation" },
        { p: "Press-and-hold is usually done at the temples, under the cheekbones and between the brows. Many people call these pressure points. In a spa it is a movement for relaxation, not treatment, so do not promise the client that it will cure headaches or anything else. The method is always the same: press slowly, hold for a few seconds, release slowly. Pressing and letting go suddenly makes the client jump." },
        { img: { src: img("an-giu-thai-duong-khi-massage-mat"), alt: "Seen from above, a therapist's fingertips rest lightly on both temples of a client in a white headband whose eyes are closed", caption: "Press-and-hold at the temples: press slowly, hold a few seconds, release slowly." } },
      ],
    },
    {
      id: "pressure-rhythm-posture",
      title: "Pressure, rhythm and the therapist's posture",
      blocks: [
        { h3: "Ask about pressure three times" },
        { p: "The right pressure is different for everyone. Ask the client before you start, after the first few movements and when you move to a new area. Keep the question short, such as “Would you like it a little lighter or a little firmer?” At the same time watch her: a frown, a held breath or raised shoulders mean the pressure is too much." },
        { img: { src: img("hoi-khach-ve-luc-tay-khi-massage-mat"), alt: "A therapist leans slightly towards a client who lies smiling with her eyes open, both hands resting on the client's shoulders as if asking about the pressure" } },
        { note: "A silent client is not necessarily a comfortable one. A short question after the first few movements helps her speak up about the pressure. And if she wants to lie quietly without talking, respect that.", kind: "tip", title: "From the trade" },
        { h3: "A slow rhythm, and always one hand on the client" },
        { p: "Keep the rhythm slow, even and continuous. Once you have touched the client, always keep one hand on her as you change movements. Lift both hands off and put them back suddenly, and the feeling of relaxation is gone." },
        { h3: "A posture you can keep up" },
        { p: "Sit on a stool at the head of the bed, adjusted to the right height, with a straight back, relaxed shoulders and straight wrists. With many clients a day, poor posture leads to sore shoulders and wrists." },
        { img: { src: img("tu-the-ngoi-cua-nguoi-tho-massage-mat"), alt: "A therapist sits upright on a low stool at the head of a spa bed, shoulders relaxed, both hands resting lightly on the cheeks of the client lying there", caption: "Straight back, relaxed shoulders, straight wrists, the stool set to the height of the bed." } },
        { h3: "Hygiene, and when the skin turns red" },
        { p: "Hygiene is the same as for any other service: short nails, rings and watch off, hands washed before and after every client, fresh towels, headband and linen for each one. The details are in the lesson [Hand washing and gloves](lesson:rua-tay-gang-tay). If the client's skin turns red and sore during the massage, stop, wipe gently, apply a cool towel and note the product, as in the lesson [Incidents in the salon](lesson:xu-ly-su-co)." },
        { p: "In VaraaAi you note in the client's internal notes in your [client list](lesson:khach-hang) the oil you used, the pressure she likes and any areas to avoid. At the next visit, nobody has to ask all over again." },
      ],
    },
  ],
  faq: [
    {
      q: "What are the benefits of facial massage?",
      a: "Facial massage in a spa helps the client relax and makes the skin look fresher. It is part of a facial, not a treatment for any condition. A therapist should not promise results such as a slimmer face, fewer wrinkles or a cure for headaches.",
    },
    {
      q: "Does facial massage slim the face or get rid of wrinkles?",
      a: "That should not be promised. Massage helps the client relax and makes the skin look fresher, and that is all. Dragging the skin hard again and again in the hope of a slimmer face only leaves the thin skin of the face red and uncomfortable.",
    },
    {
      q: "When should you not have a facial massage?",
      a: "With a fever, a cold or feeling unwell, rebook. No massage on areas with cold sores, an infection, inflamed spots with pus, broken skin or sunburn. An unknown lump or unexplained swelling means no massage and a visit to the doctor. Clients with an uncontrolled condition such as high blood pressure or heart disease should ask their doctor first.",
    },
    {
      q: "How long after fillers, laser or a peel can you have a facial massage?",
      a: "The therapist does not decide this herself. Ask the practitioner who did the procedure how long to wait before massage, avoid that area and follow their advice.",
    },
    {
      q: "Do facial pressure points cure headaches?",
      a: "In a spa, press-and-hold at the temples, under the cheekbones or between the brows is a movement for relaxation, not treatment. The therapist does not promise to cure headaches or anything else. The right method is to press slowly, hold for a few seconds and release slowly.",
    },
    {
      q: "How do you massage around the eyes and the neck safely?",
      a: "Around the eyes use only the ring finger, glide lightly along the bone around the eye socket and never press on the eyelids. On the neck use only light strokes down the sides towards the collarbones, never pressing on the front of the throat or deep into the sides of the neck.",
    },
  ],
  related: ["spa-massage-mat", "spa-facial-hieu-dung", "spa-massage-body-hieu-dung", "khi-nao-khong-lam"],
};

export default article;
