import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-body-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "what-is-swedish-massage",
  lesson: "spa-massage-body-hieu-dung",
  category: "spa",
  title: "What is Swedish massage? Classic body massage, when not to massage and the areas to avoid",
  metaTitle: "What is Swedish massage? When not to massage, areas to avoid",
  metaDescription:
    "What is Swedish massage and which strokes it uses, when not to massage, the warning signs of a blood clot in the leg, draping, pressure and the areas to avoid.",
  keyword: "what is Swedish massage",
  keywords: [
    "classic body massage",
    "when not to get a massage",
    "does a massage have to hurt",
    "does massage release toxins",
    "massage with varicose veins",
    "do you undress for a massage",
    "massage contraindications",
  ],
  excerpt: "Classic body massage is long strokes, kneading, circles and light tapping to help the client relax. A good therapist keeps the client safe, keeps her covered and chooses the right pressure.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chuyen-vien-massage-lung-cho-khach-tai-spa"),
    alt: "A therapist in a cream tunic rests both hands on the back of a female client lying face down, a white towel covering her from the waist, in a room with arched windows",
  },
  takeaways: [
    "Classic (Swedish) body massage uses long strokes, kneading, small circles and light tapping. Its purpose is **relaxation**, not treating injuries.",
    "One calf or thigh swollen, painful, warm and red: **never massage it**, and advise the client to see a doctor the same day.",
    "The drape uncovers only the area being worked and covers it again as soon as you finish. The breasts, genitals and buttocks are never exposed or touched.",
    "On the arms and legs, long strokes go towards the heart. Never press on the spine; avoid the back of the knee, the armpit, the front of the neck and the groin.",
    "Pressure should feel comfortable, maybe a little tension, never pain. “No pain, no gain” does not apply.",
  ],
  intro: [
    "What is Swedish massage? In a spa, body massage usually means classic massage, often called Swedish massage: long strokes, kneading, circles and light tapping over the back, shoulders, legs and arms to help the client relax. Skilled hands are only half of it. The other half is keeping the client safe, protecting her privacy and choosing exactly the right pressure.",
    "This article follows the VaraaAi Academy lesson “Body massage basics: understand it so clients feel safe” in the Spa & skin care course, the theory half of the topic. By the end you will know when to say no, how to drape, where each stroke is used and which areas must never be pressed. A full massage, step by step, is in the article [How to give a relaxing body massage](lesson:spa-massage-body).",
  ],
  sections: [
    {
      id: "classic-swedish-massage",
      title: "What classic (Swedish) body massage is",
      blocks: [
        { p: "Classic massage uses four groups of strokes: long strokes, kneading, small circles and light tapping. Depending on the treatment, a session lasts from half an hour to an hour and a half. This article is about relaxation massage in a spa. It does not teach the treatment of injuries, and a spa therapist does not diagnose." },
        { note: "Rules and job titles for massage differ from country to country. In some places the masseur's title is protected by law and only qualified people may use it or offer therapeutic massage. Find out the rules where you work. This article is a training aid, not a licence.", kind: "warn", title: "Rules differ by country" },
        { p: "Since the purpose is relaxation, the measure of a massage is whether the client can let go. That depends on three things the rest of this article goes through: is she safe, does she feel covered and respected, and is the pressure right." },
      ],
    },
    {
      id: "possible-blood-clot",
      title: "One calf swollen, painful and warm: never massage it",
      blocks: [
        { p: "There is one situation every massage therapist must recognise. The client complains of a painful calf and asks you to squeeze it hard to ease it. Looking closely, only one calf is swollen and red, and it feels warm. That can be a sign of a blood clot in a vein." },
        {
          ul: [
            "One calf or thigh swollen, painful, warm, red or darkened: no massage, not even light massage.",
            "Advise the client to see a doctor the same day.",
            "Shortness of breath or chest pain: call 112, or the emergency number where you are, straight away.",
          ],
        },
        { p: "You do not need to, and must not, decide what the client has. Your job is to describe what you see and advise her to see a doctor. The signs of a blood clot in the leg are described on the [NHS page on deep vein thrombosis](https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/), the source the lesson refers to." },
      ],
    },
    {
      id: "when-not-to-massage",
      title: "When not to massage: contraindications for body massage",
      blocks: [
        { p: "Beyond that situation, the consultation form and a few questions at the start help you place the client in one of these groups." },
        {
          table: {
            head: ["The client has", "What to do"],
            rows: [
              ["A fever, a cold, feels unwell, or has been drinking", "Rebook"],
              ["A contagious skin condition, an infection, an open wound, sunburn", "Do not work on that area"],
              ["A fresh injury: a sprain, a bruise, swelling", "Avoid the area completely"],
              ["Recent surgery", "Wait for the doctor's OK"],
              ["Varicose veins on the legs", "Never press on them"],
              ["An uncontrolled condition: high blood pressure, heart disease, diabetes with numbness, cancer treatment", "Advise her to ask her doctor first"],
              ["Blood thinners", "Bruises very easily: very light pressure, and ask the doctor"],
              ["Pregnancy", "Needs a specially trained therapist and a special position. Not at the basic level"],
            ],
          },
        },
        { img: { src: img("tinh-mach-gian-o-bap-chan-khong-an-len"), alt: "Close-up of the back of a woman's calf as she lies face down on a spa bed, with blue-purple varicose veins clearly visible under the skin", caption: "Varicose veins on the legs: never press on them." } },
        { img: { src: img("lung-chay-nang-khong-massage-body"), alt: "A female client lies face down on a spa bed, her back and shoulders pink with sunburn and marked by strap lines, the therapist standing beside her without touching", caption: "Sunburnt skin: no massage on that area." } },
        { p: "The consultation form also asks about the oil. Many massage oils come from nuts, such as almond, so ask whether the client has a nut allergy, and ask about fragrance and essential oils too. How to recognise the cases where any service must be refused is in the lesson [When not to treat a client](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "draping-and-privacy",
      title: "Do you undress for a massage? Draping and the client's privacy",
      blocks: [
        { p: "Many people hesitate to book a body massage because they do not know how much they will have to undress or how they will be covered. Proper draping answers that worry, and the lesson calls it the most important part." },
        {
          ul: [
            "The client undresses alone. You leave the room and knock before coming back in.",
            "The client may keep her underwear on.",
            "She lies under a large towel or sheet. Only the area being worked is uncovered, and it is covered again as soon as you finish.",
            "The edges are folded neatly and tucked in firmly so she feels secure.",
            "The breasts, genitals and buttocks are never exposed or touched.",
            "When she turns over, the sheet keeps her covered.",
          ],
        },
        { img: { src: img("gap-khan-phu-ngang-eo-khi-massage-lung"), alt: "A therapist folds the edge of a large white towel down to the waist of a client lying face down, leaving only her back uncovered, her face resting in the face cradle", caption: "Working on the back means only the back is uncovered: the towel is folded at the waist and tucked in at the sides." } },
        { p: "The consultation form also asks whether there are areas the client does not want massaged. She may refuse any area and stop the massage at any time." },
        { note: "Before you move to a new area, say a short sentence such as “I'll do your legs now”. The client is never surprised and always feels respected.", kind: "tip", title: "From the trade" },
        { img: { src: img("giu-khan-che-khi-khach-tro-minh"), alt: "A therapist stands beside the bed lifting one edge of a large white towel so the client can turn over underneath while staying fully covered", caption: "Turning over: the towel is lifted just enough and the client turns beneath it." } },
      ],
    },
    {
      id: "strokes-direction-areas",
      title: "The main strokes, their direction and the areas to avoid",
      blocks: [
        {
          table: {
            head: ["Stroke", "How", "Where and when"],
            rows: [
              ["Long strokes (effleurage)", "The whole palm glides long", "To open, warm the muscles and link movements"],
              ["Kneading", "Lift the muscle gently between thumb and fingers, like kneading dough", "Thick muscles such as the shoulders and calves"],
              ["Small circles", "Small circles with the thumb", "Tight spots"],
              ["Light tapping", "Quick, with the side of the hand or a cupped palm", "To finish an area"],
            ],
          },
        },
        { img: { src: img("vuot-dai-doc-lung-bang-long-ban-tay"), alt: "A therapist reaches forward, both palms gliding along the back of a client lying face down, a white towel covering her from the waist down", caption: "Long strokes with the whole palm open the massage and warm the muscles." } },
        { h3: "Direction, and where not to press" },
        {
          ul: [
            "**Arms and legs:** long strokes go towards the heart, from the ankle to the knee and from the wrist to the elbow.",
            "**The spine:** never press on it, work only beside it.",
            "**The lower back over the kidneys:** go lightly.",
            "**The back of the knee, the armpit, the front of the neck, the groin:** avoid them, because blood vessels and nerves lie close to the surface there.",
          ],
        },
      ],
    },
    {
      id: "pressure-and-posture",
      title: "Does a massage have to hurt? Pressure and the therapist's posture",
      blocks: [
        { p: "Massage should feel good. The client may feel a little tension, but not pain, and there is no such thing as having to hurt to work. Ask her at the start, after a few minutes and when you change area. Watch at the same time: tensing, a held breath or pulled-up legs mean the pressure is too much." },
        { p: "Faced with a tight muscle, a new therapist's reflex is to press harder. The right way is the opposite: the tighter the muscle, the slower you go." },
        { h3: "Your posture decides how long you can do this work" },
        {
          ul: [
            "Set the bed height so you do not have to bend over.",
            "Stand with one foot forward and one back, knees soft, back straight.",
            "Pressure comes from your body weight, driven from the legs, not from tensing your shoulders and wrists.",
            "To reach further, step closer rather than stretching.",
          ],
        },
        { img: { src: img("tu-the-dung-mot-chan-truoc-khi-massage-body"), alt: "A therapist stands with one foot forward and one back, her back straight and both hands on the back of a client lying face down on the massage bed", caption: "One foot forward, one back, back straight: the pressure comes up from the legs." } },
      ],
    },
    {
      id: "sequence-and-aftercare",
      title: "The sequence of a session, hygiene and aftercare advice",
      blocks: [
        { p: "A common sequence: the client lies face down for the back, shoulders, neck and the backs of the legs. She turns over for the fronts of the legs, the arms, then the shoulders and neck. Every salon has its own sequence according to its treatment." },
        { p: "Hygiene means washing your hands before and after every client, fresh linen, towels and face cradle cover for each client, and wiping and disinfecting the bed. See also the lesson [Hand washing and gloves](lesson:rua-tay-gang-tay)." },
        { h3: "Be honest with the client after the massage" },
        { p: "When the session ends, help the client sit up slowly, because standing up quickly after lying down for a long time can make her dizzy. Offer her a glass of water. Do not tell her that massage releases toxins. Tell her the truth: massage relaxes and feels good, and after firm pressure she may feel slightly sore the next day." },
        { img: { src: img("moi-khach-ly-nuoc-sau-khi-massage-body"), alt: "A female client in a white robe sits on the edge of a spa bed and takes a glass of water from a smiling therapist" } },
        { p: "In VaraaAi you note in the client's internal notes in your [client list](lesson:khach-hang) the pressure she likes, areas to avoid and the oil you used. When you [add massage as a service](lesson:dich-vu) to your booking page, set the length to match your salon's treatment." },
      ],
    },
  ],
  faq: [
    {
      q: "What is Swedish massage?",
      a: "In a spa, body massage usually means classic massage, also called Swedish massage: long strokes, kneading, small circles and light tapping over the back, shoulders, legs and arms to help the client relax. A session lasts from half an hour to an hour and a half depending on the treatment. It is relaxation massage, not the treatment of injuries.",
    },
    {
      q: "Does a massage have to hurt to work?",
      a: "No. A massage should feel good, perhaps with a little tension, but never pain. If the client tenses up, holds her breath or pulls up her legs, the pressure is too much. On a tight muscle, the therapist slows down rather than pressing harder.",
    },
    {
      q: "When should you not get a massage?",
      a: "Rebook if you have a fever, a cold, feel unwell or have been drinking. Areas with a contagious skin condition, an infection, an open wound, sunburn or a fresh injury are not massaged, and varicose veins are never pressed. After recent surgery wait for the doctor's OK; with an uncontrolled condition or blood thinners, ask the doctor first.",
    },
    {
      q: "Should you massage a calf that is swollen, painful and warm on one side?",
      a: "Never. One calf or thigh that is swollen, painful, warm, red or darkened can be a sign of a blood clot in a vein. The person should see a doctor the same day. With shortness of breath or chest pain, call 112 or the emergency number where you are.",
    },
    {
      q: "Do you have to undress completely for a body massage?",
      a: "The client undresses alone and may keep her underwear on. Throughout the session she lies under a large towel or sheet; the therapist uncovers only the area being massaged and covers it again straight away. The breasts, genitals and buttocks are never exposed or touched, and the client may refuse any area.",
    },
    {
      q: "Does massage release toxins? Is it normal to feel sore the next day?",
      a: "A spa therapist should not claim that massage releases toxins. Massage relaxes and feels good. After firm pressure there may be mild soreness the next day. Strong pain or bruising is something to report back to the salon.",
    },
  ],
  related: ["spa-massage-body", "spa-massage-mat-hieu-dung", "khi-nao-khong-lam", "xu-ly-su-co"],
};

export default article;
