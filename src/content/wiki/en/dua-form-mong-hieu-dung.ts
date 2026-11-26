import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dua-form-mong-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "nail-shapes-and-how-to-choose",
  lesson: "dua-form-mong-hieu-dung",
  category: "nail",
  title: "Nail shapes: the 7 common shapes, which last longest and how to choose for each hand",
  metaTitle: "Nail shapes: 7 common shapes and how to choose the right one",
  metaDescription:
    "The seven common nail shapes: square, squoval, round, oval, almond, coffin and stiletto. Which are strong, which break easily, and how to choose for each hand.",
  keyword: "nail shapes",
  keywords: ["nail shapes for short fingers", "strongest nail shape", "what is a squoval nail", "coffin vs ballerina nails", "almond nail shape", "best nail shape for weak nails", "how to choose a nail shape"],
  excerpt: "Seven common nail shapes, which ones hold up on natural nails, which belong on enhancements, and four things to look at before you choose a shape for a client.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("bay-dang-mong-tay-pho-bien"),
    alt: "Seven sample nail tips in nude pink laid in a row on white marble, from square, round and oval through to pointed shapes",
  },
  takeaways: [
    "There are seven common shapes: square, squoval, round, oval, almond, coffin (ballerina) and the pointed stiletto.",
    "Everyday knocks land on the tip. **Round, oval and squoval** are the most practical and strongest shapes for natural nails.",
    "Shapes that taper to a point, such as long almond or stiletto, usually suit strong natural nails or **enhancements**; coffin needs length, so it is usually done on enhancements too.",
    "Choose by four things: the hand, the curve at the base of the nail, the client's work and how strong the natural nail is.",
    "Never file deep into the side walls of a natural nail: it weakens the nail, and the edge can grow into the skin.",
  ],
  intro: [
    "Nail shapes on social media seem endless, but at the nail desk a technician meets the same seven again and again: square, squoval, round, oval, almond, coffin and stiletto. Anyone can hold a file. The skill lies in knowing which shape suits which hand, which one survives the client's daily life, and which one should only be done once the nail has been extended.",
    "This article follows the VaraaAi Academy lesson “Nail shapes: understand them to choose the right shape for each client” in the Nails course. By the end you will be able to name each shape correctly, explain why some shapes last and others break, and advise a client who brings a photo that does not suit her natural nails.",
  ],
  sections: [
    {
      id: "seven-nail-shapes",
      title: "The seven common nail shapes and how to recognise them",
      blocks: [
        { p: "Two things define every shape: whether the side walls run straight or taper in, and whether the tip ends in a straight line, a curve or a point. Look at a nail with those two questions in mind and you will not confuse one shape with another." },
        {
          table: {
            head: ["Shape", "What it looks like", "Usually suits"],
            rows: [
              ["Square", "Tip filed straight across, straight sides, two sharp corners", "Short to medium nails; a wide, strong tip, but the corners snag and chip"],
              ["Squoval", "Straight across like square, with both corners gently rounded", "Natural nails; one of the most practical and strongest shapes"],
              ["Round", "A short nail whose tip follows the curve of the fingertip", "Short natural nails, people who work a lot with their hands"],
              ["Oval", "A little longer, both sides curving evenly to a rounded, egg-like tip", "Natural nails; makes fingers look longer and slimmer"],
              ["Almond", "Both sides taper towards the middle into a soft, rounded point", "Strong natural nails, or gel and acrylic enhancements"],
              ["Coffin (ballerina)", "Tapered sides like almond, tip filed straight across like the toe of a ballet shoe", "Needs length, so usually done on enhancements"],
              ["Stiletto", "Both sides taper steeply to a sharp point right in the middle", "Enhancements, or very strong natural nails"],
            ],
          },
        },
        { img: { src: img("dang-mong-vuong-bo-goc-squoval"), alt: "Two hands resting on a cream cushion, ten milky pink nails all filed to the same squoval shape and the same length", caption: "Squoval: a straight tip with gently rounded corners, the shape a great many clients choose for natural nails." } },
        { p: "Squoval is simply the trade name for a square with softened corners, and coffin and ballerina are two names for the same shape. When a client uses a name you do not recognise, the quickest answer is to show her pictures of the shapes and let her point." },
      ],
    },
    {
      id: "strongest-nail-shape",
      title: "Which nail shape is strongest, and which breaks easily",
      blocks: [
        { p: "Think about where the force goes. Typing, opening a car door, digging in a handbag: every knock of the day lands on the tip of the nail. The more material there is at the tip, the better it takes the force." },
        { p: "Shapes that narrow to a point, almond and stiletto, leave very little material at the tip. That is why they usually suit strong natural nails, or nails that carry gel or acrylic. Square is the opposite: its tip is wide and strong. Its weak spot is the two sharp corners, which catch on jumpers and hair and then chip. A client who loves her square nails and comes back a few days later with a corner missing is something every technician has seen." },
        { img: { src: img("mong-vuong-bi-me-goc"), alt: "Close-up of a square natural nail on a client's finger, one corner of the tip chipped away into a small notch", caption: "The weak point of a square shape: a sharp corner snags on something and a piece chips off." } },
        { p: "Round, oval and squoval have no sharp corners to catch and do not taper so far that the tip loses material. That is why these three count as the most practical and strongest shapes for natural nails. Coffin needs length before it looks right, so it is usually done on enhancements." },
        { img: { src: img("dang-mong-nhon-stiletto-tren-mong-dap"), alt: "Two long-fingered hands resting on a white towel, ten long stiletto nails in milky pink, all the same length", caption: "Stiletto tapers steeply to a point. Little material is left at the tip, so it belongs on enhancements or very strong natural nails." } },
        { note: "How strong each shape is describes a general tendency. Every client's nails are different, thick or thin, hard or soft. Look closely at the nails in front of you before you decide which shape they will hold.", kind: "info", title: "A tendency, not a rule" },
      ],
    },
    {
      id: "choosing-a-nail-shape",
      title: "How to choose a nail shape for the hand and the client's life",
      blocks: [
        { p: "Before picking up the file, a good technician looks and asks about four things. Each one rules out a few shapes, and what is left is usually the right choice." },
        { h3: "1. The hand" },
        { p: "Long, slender fingers look good with almost any shape, even square. Short fingers with wide nails usually look longer and slimmer with oval or almond. Square on wide nails tends to make the fingers look shorter." },
        { img: { src: img("ban-tay-ngon-ngan-mong-rong"), alt: "Two women's hands with short fingers and broad palms lying flat on a cream towel, the natural nails short and wide", caption: "Short fingers, wide nails: oval or almond usually makes the hand look slimmer than square does." } },
        { h3: "2. The curve at the base of the nail" },
        { p: "Many technicians use a simple trick: the tip looks most harmonious when it repeats the curve at the base of the nail. A round base suits round or oval. A squarer base goes well with squoval. Treat it as a good starting point for a suggestion, not a law." },
        { h3: "3. Work and daily life" },
        { p: "People who type a lot, work with their hands, cook or look after small children are usually most comfortable with short nails in a round or squoval shape. Many workplaces, hospitals and kitchens among them, also have their own rules on nails. When a client mentions her job, ask one more question before you suggest a length." },
        { img: { src: img("mong-ngan-vuong-bo-goc-khi-go-phim"), alt: "A woman's hand typing on a laptop keyboard on a stone desk, her short nails filed squoval and painted milky pink" } },
        { h3: "4. How strong the natural nail is" },
        { p: "If the nails are thin, soft or split into layers at the tip, do not file them to a point and do not leave them long. A round shape or a short oval will last longer. If the client still wants long almonds or stilettos, do them on enhancements, as in the lesson on [gel extensions with forms](lesson:noi-mong-form)." },
        { img: { src: img("mong-that-mong-tach-lop-o-dau"), alt: "Close-up of a thin natural nail on a client's finger, the tip split into several fine layers and slightly chipped", caption: "A thin nail peeling at the tip: keep it short and file it round or oval." } },
      ],
    },
    {
      id: "symmetry-and-side-walls",
      title: "Ten matching nails and straight side walls: where skill shows",
      blocks: [
        { p: "Choosing the right shape is half the job. The other half is making all ten nails the same length and the same shape. The client looks at her hands all day, so a single nail that is off gets noticed straight away." },
        {
          ul: [
            "**From above:** the tip sits right in the middle and both sides are symmetrical.",
            "**Turn the finger and look from the tip:** both side walls are balanced and the curve is even.",
          ],
        },
        { p: "On each side of the nail there is a point where the nail starts to leave the skin bed. In the trade it is called the **stress point**. From there the side walls must run straight forward before you shape the tip. In other words, the shape is made at the tip only, never by cutting into the sides." },
        { img: { src: img("loi-dua-sau-vao-khoe-mong"), alt: "Close-up of a natural nail filed deep into both sides into a narrow point, the skin at the side corners slightly red", caption: "An example of the mistake: filing deep into the side walls of a natural nail. It looks slimmer but has lost its side support." } },
        { note: "Never file deep into the side corners of a natural nail. The nail loses its support on both sides, so it is weak and breaks easily. As it grows out, its edge can also dig into the skin at the corner and cause painful swelling.", kind: "warn", title: "A very common mistake" },
      ],
    },
    {
      id: "nail-file-grit",
      title: "Choosing a nail file: the higher the grit, the finer the file",
      blocks: [
        { p: "The number printed on a file is its grit. The higher the number, the finer the file." },
        {
          table: {
            head: ["Nail", "File to use", "How to file"],
            rows: [
              ["Natural nail", "A fine file, usually 180 grit or higher", "In one direction, with a light hand"],
              ["Hard gel or acrylic", "A coarser file, depending on the job", "Gently near the natural nail"],
            ],
          },
        },
        { img: { src: img("cac-loai-dua-mong-theo-do-min"), alt: "Four nail files from a fine cream file to a coarse black one, laid beside a white buffer and a dust brush on a towel", caption: "Fine files are for natural nails, coarser files for enhancements." } },
        { p: "On a natural nail, sawing back and forth heats the nail and makes the tip split into layers. Filing in one direction is also the first habit of the [gel polish](lesson:son-gel) routine. The filing path for each shape, from square to stiletto, is in the practice article [how to file nails into shape](lesson:dua-form-mong)." },
      ],
    },
    {
      id: "honest-advice",
      title: "When the shape a client wants does not suit her nails",
      blocks: [
        { p: "A familiar situation: the client brings a photo of very long, pointed nails, but her natural nails are thin. Nodding along is easy, but a few days later she comes back with a broken nail and trusts you a little less." },
        { img: { src: img("tho-nail-tu-van-dang-mong-cho-khach"), alt: "A nail technician in a cream top and black gloves holds a client's hand and explains with a friendly expression at a marble table in an elegant salon" } },
        { p: "Explain gently that on her natural nails this shape will break very easily, then offer her a choice:" },
        {
          ol: [
            "A shorter almond on the natural nails.",
            "An enhancement, so she can have the pointed shape she likes.",
          ],
        },
        { p: "A client who understands the reason chooses for herself, and usually trusts you more afterwards. Whatever the shape, look at the nails and the skin around them first: nails with signs of disease or red, swollen skin mean no service, as the lesson [When not to treat](lesson:khi-nao-khong-lam) explains. Rules for nail work also differ by country, so check the ones that apply where you work." },
      ],
    },
    {
      id: "client-notes",
      title: "Record the shape and length the client chose",
      blocks: [
        { p: "A regular wants her own set of nails every time, even when another technician does them. In VaraaAi you write the shape and length in the [client's notes](lesson:khach-hang), so whoever does the next appointment does it the same way. If your salon offers shaping as its own service or as part of a manicure, [add the service](lesson:dich-vu) with its real duration so clients can book it themselves. The software is free for salon owners: [see VaraaAi for salons](/business)." },
      ],
    },
  ],
  faq: [
    {
      q: "What are the most common nail shapes?",
      a: "The seven you see most often are square, squoval, round, oval, almond, coffin (also called ballerina) and stiletto. They differ in whether the side walls run straight or taper in, and in whether the tip is straight, curved or pointed.",
    },
    {
      q: "What is the strongest nail shape for natural nails?",
      a: "Round, oval and squoval are the most practical and strongest shapes for natural nails, because the tip keeps plenty of material and there are no sharp corners to catch. This is a general tendency, and it always depends on the client's own nails.",
    },
    {
      q: "Which nail shape suits short fingers?",
      a: "Oval or almond usually makes short fingers with wide nails look longer and slimmer. A square shape on wide nails tends to make the fingers look shorter.",
    },
    {
      q: "Are coffin and ballerina nails the same?",
      a: "Yes, they are two names for one shape. The sides taper in like an almond, then the tip is filed straight across like the toe of a ballet shoe. The shape needs length, so it is usually done on enhancements.",
    },
    {
      q: "Can thin, weak nails be filed into a stiletto shape?",
      a: "It is not a good idea. Pointed and long shapes concentrate the force on the tip, so weak nails break very easily. Thin, soft or peeling nails last longer short and round or oval. For long almonds or stilettos, use an enhancement.",
    },
    {
      q: "Why shouldn't you file into the sides of the nail?",
      a: "The side walls support the nail. Filing deep into the corners weakens the nail so it breaks easily, and as it grows out the edge can dig into the skin and cause painful swelling. The sides should run straight from the stress points, with the shape made only at the tip.",
    },
  ],
  related: ["dua-form-mong", "noi-mong-form-hieu-dung", "cham-soc-mong-co-ban-hieu-dung", "gel-hieu-dung"],
};

export default article;
