import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/ve-sinh-tiem/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-cleaning-checklist",
  lesson: "ve-sinh-tiem",
  category: "safety",
  title: "Salon cleaning checklist: a daily cleaning schedule, opening and closing lists and the in-house control plan",
  metaTitle: "Salon cleaning checklist: daily schedule and control plan",
  metaDescription:
    "A salon cleaning checklist based on Helsinki's guidance: the in-house control plan, clean before you disinfect, towels, ventilation, waste and opening lists.",
  keyword: "salon cleaning checklist",
  keywords: [
    "nail salon cleaning schedule",
    "daily spa cleaning checklist",
    "in-house control plan for salons",
    "what temperature to wash salon towels",
    "nail salon ventilation requirements",
    "opening a beauty salon in Finland",
    "clean before disinfecting",
  ],
  excerpt: "A clean salon comes from small tasks done every day and written into a plan: what is cleaned, when, with what and by whom. Examples from Helsinki's guidance.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-tiem-lam-dep-trong-salon-sach-buoi-sang"),
    alt: "A blonde salon owner in a cream top holds a folder, standing in a bright salon with a row of white stone manicure tables",
  },
  takeaways: [
    "Write a **cleaning plan**: what is cleaned, how often, with which equipment and products, and by whom.",
    "**Clean first, then disinfect**, because dirt makes disinfectant ineffective. Anything with blood on it is always disinfected.",
    "Cleaning cloths are washed after every use at a minimum of 60 °C, preferably 90 °C. Clean and dirty towels are stored apart.",
    "In Helsinki, most beauty premises must notify the city at least 30 days before opening and must have an in-house control plan.",
    "Turn the plan into two short lists, one for opening and one for closing; whoever does the work ticks and signs, and the owner reviews them every week.",
  ],
  intro: [
    "A salon cleaning checklist is the part of hygiene that clients sense before they even sit down. Yet real cleanliness is not a nice scent or flattering lighting. It lies in small tasks done regularly every day, written down as a plan so that everyone in the salon knows their part.",
    "This article follows the VaraaAi Academy lesson “Daily salon cleaning and the in-house control plan” in the Hygiene & safety course. It uses the guidance of the City of Helsinki (Finland, version 5/2025) as its example, listed as the source at the end. Other countries and cities have different rules, but the way of thinking is much the same. By the end you will be able to draw up a cleaning schedule and two checklists for your own salon.",
  ],
  sections: [
    {
      id: "notification-and-control-plan",
      title: "Opening a salon in Helsinki: notify 30 days ahead and write an in-house control plan",
      blocks: [
        { p: "In Helsinki, most beauty premises must notify the city at least 30 days before they start operating. Barbers and hair salons only have to notify if they also offer skin treatments. The rule applies to home-based and freelance work too. Substantial changes, a change of operator or closing down must also be reported. After that the city inspects regularly and charges a fee." },
        { p: "More important than the notification itself is the **in-house control plan** (omavalvontasuunnitelma in Finnish). In-house control means the operator identifies the health risks in their own salon and can show what has been done to prevent them. Premises must have this plan and follow it; the city recommends writing it down. Hair salons must carry out in-house control even when they do not have to notify." },
        { img: { src: img("viet-ke-hoach-tu-kiem-soat-cua-tiem"), alt: "A salon owner in a cream blazer sits at a desk writing in an open folder, a laptop beside her" } },
        { h3: "What goes into the in-house control plan" },
        {
          table: {
            head: ["Part", "Content"],
            rows: [
              ["Description of the premises", "Services, opening hours, number of people, water points, toilets, equipment"],
              ["Tools", "How tools are cleaned, disinfected and sterilised"],
              ["Risks", "Sensitive clients, insects and rodents, repairs needed, epidemics"],
              ["Prevention", "Staff orientation, the cleaning plan, ventilation maintenance, sterilisation indicators"],
            ],
          },
        },
        { p: "The plan is updated when the salon changes. Tools, hands and incidents do not need to be written out at length: it is enough to say which routine the salon follows and who is responsible. Those three routines have their own lessons: [Tools after every customer](lesson:ve-sinh-dung-cu), [Hand hygiene, gloves and protective wear](lesson:rua-tay-gang-tay) and [Incidents: bleeding, allergic reactions, burns](lesson:xu-ly-su-co). This article is about the room itself: surfaces, floors, towels, water, air and waste." },
      ],
    },
    {
      id: "clean-then-disinfect",
      title: "Clean first, then disinfect: a nail salon cleaning schedule",
      blocks: [
        { p: "The first principle of cleaning is the order. Clean first and disinfect afterwards, because dirt makes disinfectant ineffective. Spraying disinfectant straight onto a table still covered in nail dust and smears of cream only wastes the product." },
        {
          table: {
            head: ["Surface", "What it needs"],
            rows: [
              ["Does not touch the treated skin", "Cleaning is enough"],
              ["Touches the client's skin", "Clean, then disinfect"],
              ["Has blood on it, whether it touched the client or not", "Always disinfected"],
            ],
          },
        },
        { img: { src: img("lau-sach-mat-ban-lam-mong-bang-khan-am"), alt: "A therapist in a cream top and black gloves wipes a white stone table with a folded damp cloth, her other hand dropping a cloth into a steel bucket", caption: "Step one: clean off the visible dirt." } },
        { img: { src: img("khu-khuan-goi-ke-tay-sau-khi-lau-sach"), alt: "A gloved hand sprays disinfectant from a white spray bottle onto a freshly wiped cream leather arm cushion", caption: "Step two: disinfect the surfaces that touch the client's skin, such as the arm cushion." } },
        { h3: "A schedule often seen in well-run salons" },
        {
          table: {
            head: ["When", "What is cleaned"],
            rows: [
              ["After every client", "The table, arm cushion, chair, lamp and anything your hands have touched"],
              ["At the end of every day", "Mop the floor, empty the bins, wipe door handles, taps and the reception desk, wash the tool basin"],
              ["Every week", "Cupboards, shelves, table legs, drawers, glass doors"],
            ],
          },
        },
        { note: "This schedule is common good practice, not a rule. How often you clean is your decision; write it into the cleaning plan together with the equipment, the products and the name of whoever does it. The cleaning plan belongs inside the in-house control plan.", kind: "info", title: "You decide the frequency" },
        { h3: "Cleaning equipment must be clean too" },
        {
          ul: [
            "Cleaning cloths are washed after every use at a minimum of 60 °C, preferably 90 °C. Or use disposable cloths.",
            "Mops and brooms are not left on the floor and are never stored in the toilet. Give them their own cupboard with a door.",
            "The toilet has its own cleaning equipment that is easy to tell apart, for example by colour.",
          ],
        },
        { img: { src: img("tu-rieng-cat-dung-cu-lau-don-khan-theo-mau"), alt: "A cream cupboard with both doors open, a mop and broom hanging on hooks inside and cloths in several colours stacked on a shelf beside spray bottles" } },
      ],
    },
    {
      id: "towels-and-textiles",
      title: "Towels and textiles: clean and dirty never sit side by side",
      blocks: [
        { p: "Towels and textiles used at work are washed and dried by machine. The washing machine must not stand in the toilet. Clean and dirty items are stored apart: clean towels in a closed cupboard, used ones in a container with a lid." },
        { img: { src: img("khan-sach-trong-tu-khan-ban-trong-thung-co-nap"), alt: "A cream cupboard with one door open showing neat stacks of white towels, and a lidded laundry bin for used towels some distance away" } },
        { note: "A stack of clean towels on an open shelf right next to the basket of dirty ones. Clean towels left in the open like that can no longer be counted on as clean by the time they reach a client.", kind: "warn", title: "A common mistake" },
      ],
    },
    {
      id: "water-air-waste",
      title: "Water points, ventilation, plants and waste",
      blocks: [
        { h3: "A water point by the workstation" },
        { p: "Each workstation needs its own water point right next to it or very close by, for washing hands and tools, easy to reach without passing through a closed door. If the salon has only one, it should have two basins. After washing tools, wash and disinfect the basin before using it for clients again. The toilet has its own hand basin with liquid soap and paper towels." },
        { img: { src: img("bon-rua-tay-ngay-canh-ban-lam-mong"), alt: "A white stone manicure table with an arm cushion, and right beside it a hand basin with a brass tap, soap and paper towels" } },
        { h3: "Nail salon ventilation" },
        { p: "Under Helsinki's guidance, ventilation must provide at least 6 litres of air per second for each person. A salon with more than two clients at once, or one using strong-smelling chemicals, should have mechanical supply and exhaust ventilation. An acrylic nail station needs local exhaust. In the plan, note the filter change schedule, the cleaning of the air vents and the building manager's phone number. Why clean air matters so much for the people working there is explained in [Allergies and chemicals](lesson:di-ung-hoa-chat)." },
        { img: { src: img("mieng-gio-thong-gio-tren-tran-tiem-nail"), alt: "A cream salon ceiling with a round white air vent, a row of stone manicure tables below and a chandelier at the far end of the room" } },
        { h3: "Indoor plants" },
        { p: "This surprises many salon owners: the guidance advises against keeping potted plants in the salon. Soil holds a lot of microorganisms, and the air flow can carry them around the room." },
        { img: { src: img("chau-cay-trong-tiem-lam-dep-khong-nen-de"), alt: "A large potted plant right beside a manicure chair, dry leaves and soil scattered on the stone floor while a technician works on a client's nails", caption: "An example of what not to do: a plant in soil right next to where clients are treated." } },
        { h3: "Waste and sharps" },
        {
          ul: [
            "Bins are intact, have lids and are emptied often enough that the lid always closes. That way there is no smell and no insects or rodents are attracted.",
            "Needles, blades and other sharps go into a factory-made sharps container and then to an approved collection point. In Helsinki those are the Sortti stations.",
            "If you see signs of insects or rodents, deal with them at once; do not wait.",
          ],
        },
      ],
    },
    {
      id: "opening-closing-checklist",
      title: "The salon cleaning checklist for opening and closing",
      blocks: [
        { p: "A plan sitting in a drawer helps nobody. The easiest way to keep it alive is to boil it down into two very short lists. The two below are common good practice; adjust them to your own salon." },
        {
          table: {
            head: ["Morning opening", "Evening closing"],
            rows: [
              ["Switch on the ventilation", "Wipe the tables"],
              ["Test the hot and cold water", "Mop the floor"],
              ["Enough soap and paper towels", "Wash the towels"],
              ["Sterile pouches in date", "Empty the bins"],
              ["Bins emptied", "Wash the tool basin"],
              ["", "Note anything unusual"],
            ],
          },
        },
        { img: { src: img("danh-sach-kiem-tra-ve-sinh-luc-mo-cua"), alt: "A therapist in a cream top stands at the reception desk holding a clipboard, ticking items off a checklist with a pen" } },
        { p: "Whoever does the work ticks the box and signs. At the end of the week the owner reviews the lists to see which tasks tend to be missed." },
        { note: "In VaraaAi, use the notices in the [team hub](lesson:tien-ich-nhom) to remind the whole team of the opening and closing lists, and its training section so new staff read the in-house control plan on their first day.", kind: "tip", title: "Remind the team with VaraaAi" },
      ],
    },
    {
      id: "when-the-inspector-comes",
      title: "When the inspector comes, and the rules where you work",
      blocks: [
        { p: "An inspector looks at more than a clean table. They may ask which risks the salon has identified and what it has done about them. A clearly written plan, and a salon that works exactly as the plan says, is the best answer." },
        { p: "Salon hygiene is therefore not one big spring clean. It is small tasks every day, with everyone knowing their part." },
        { note: "Rules differ by country and city. The requirements in this article are examples from the City of Helsinki's guidance. Ask the health authority where you work for the exact requirements for your salon.", kind: "warn", title: "Ask your local health authority" },
      ],
    },
  ],
  faq: [
    {
      q: "Do you need to disinfect a nail table after cleaning it?",
      a: "It depends on the surface. A surface that does not touch the treated skin only needs cleaning. Surfaces that touch the client's skin, such as the table top and the arm cushion, are cleaned and then disinfected. Anything with blood on it is always disinfected. Cleaning always comes first, because dirt makes disinfectant ineffective.",
    },
    {
      q: "What temperature should salon towels and cleaning cloths be washed at?",
      a: "Under the City of Helsinki's guidance, cleaning cloths are washed after every use at a minimum of 60 °C, preferably 90 °C, or disposable cloths are used. Work towels and textiles are washed and dried by machine, clean ones are kept in a closed cupboard and used ones in a lidded container.",
    },
    {
      q: "What is an in-house control plan for a salon?",
      a: "It is a plan in which the operator writes down the health risks in their salon and how they are prevented, and then follows it every day. In Helsinki, beauty premises must have one, and the city recommends writing it down. It covers a description of the premises, how tools are processed, the risks and their prevention.",
    },
    {
      q: "Do you need to notify the city before opening a nail salon in Finland?",
      a: "Under Helsinki's guidance, most beauty premises must notify the city at least 30 days before starting, including home-based and freelance work. Hair salons only have to notify if they offer skin treatments. Other municipalities may have different requirements, so ask the health authority where you open.",
    },
    {
      q: "Can you keep plants in a nail salon or spa?",
      a: "The City of Helsinki's guidance advises against keeping potted plants in the salon, because soil holds a lot of microorganisms and the air flow can carry them around the room.",
    },
    {
      q: "What goes on a daily salon cleaning checklist?",
      a: "At opening: switch on the ventilation, test the hot and cold water, check soap and paper towels, check that sterile pouches are in date and that the bins have been emptied. At closing: wipe the tables, mop, wash the towels, empty the bins, wash the tool basin and note anything unusual. Whoever does it ticks and signs, and the owner reviews it weekly.",
    },
  ],
  related: ["ve-sinh-dung-cu", "rua-tay-gang-tay", "xu-ly-su-co", "di-ung-hoa-chat"],
};

export default article;
