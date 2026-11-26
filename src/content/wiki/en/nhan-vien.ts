import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/nhan-vien/${name}.webp`;
const shot = (name: string) => `/wiki/nhan-vien/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-staff-management-and-permissions",
  lesson: "nhan-vien",
  category: "salon",
  title: "Salon staff management: add your team, assign services and set what each person can see",
  metaTitle: "Salon staff management: add staff, services, permissions",
  metaDescription:
    "How to add staff to your salon's booking page on VaraaAi: profile, the services each person does, a staff login and the three roles Stylist, Reception, Manager.",
  keyword: "salon staff management",
  keywords: [
    "salon staff permissions",
    "add staff to salon booking software",
    "individual working hours for each stylist",
    "stylist, reception and manager roles",
    "let clients choose their stylist online",
    "staff login for salon booking system",
  ],
  excerpt: "Each staff member has their own calendar, services and access. Clients pick the person they know, and you decide who sees what.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-cat-toc-nam-dang-cat-cho-khach"),
    alt: "A bearded barber in a waistcoat cuts the hair of a smiling young man seated in a leather chair in an elegant barbershop",
  },
  takeaways: [
    "On VaraaAi each staff member has **their own calendar, their own services and their own access**.",
    "Clients can only book a person for the services you tick under **“Services they perform”**.",
    "An email and password are only needed if you want the person to **sign in themselves** and see the schedule.",
    "Three quick roles: **Stylist** sees only their own bookings, **Reception** sees the whole calendar and customers, **Manager** sees everything.",
    "In the list, “Schedule” sets one person's own working hours and “Remove” is for when they leave.",
  ],
  intro: [
    "Salon staff management in a paper diary works while the salon has two people. With a third and a fourth it starts to slip: who can do which service, who is off on which day, who is allowed to see the clients' phone numbers. A good booking system has to answer all three for every person.",
    "This guide follows the VaraaAi Academy lesson “Add staff and set permissions”. You will add a complete staff member, link the right services to them and choose the level of access that fits their job.",
  ],
  sections: [
    {
      id: "why-a-profile-per-person",
      title: "Why each stylist or technician needs their own profile",
      blocks: [
        { p: "In the beauty trade, clients come back for the person more than for the name over the door. A client who likes the way one technician does her nails or one stylist cuts her hair wants that same person next time. When every staff member has a profile, the client can choose the person she knows while booking." },
        { p: "Separate profiles also keep the calendar accurate. Each person has their own calendar, so two clients are not booked into the same person at the same time. Each person is linked only to the services they can do, so a client booking lash extensions is never put with someone who only does nails." },
        { p: "The third reason is access. A salon holds client lists, revenue and other information that not everyone needs to see. Setting access per person lets you hand out work and still keep back what should be kept back." },
      ],
    },
    {
      id: "what-to-prepare",
      title: "What to prepare before adding staff to your booking software",
      blocks: [
        {
          ul: [
            "**A clear photo** of each person's face. Clients recognise their regular stylist from the photo.",
            "**The name** clients use in the salon and a **title**, such as nail technician or lash stylist.",
            "**A few lines of bio** about what the person does best.",
            "**The list of services** the person can do on their own.",
            "**The person's own email address**, if you want them to sign in and see the schedule.",
          ],
        },
        { p: "Set up your service menu first, because “Services they perform” lets you choose from services that already exist. If you have not done that yet, see the guide to [adding services and prices](lesson:dich-vu)." },
      ],
    },
    {
      id: "staff-permissions-roles",
      title: "Salon staff permissions: Stylist, Reception and Manager",
      blocks: [
        { p: "The “Login & access” part offers three “Quick roles”. Each one is a ready-made set of access rights:" },
        {
          table: {
            head: ["Role", "What they see", "Suits"],
            rows: [
              ["Stylist", "Only their own bookings", "Nail technicians, hairdressers, lash stylists, spa therapists"],
              ["Reception", "The whole calendar, customers and contact details", "Whoever answers the phone, books clients and greets them"],
              ["Manager", "Everything, including other pages (view-only)", "The person who runs the salon when you are away"],
            ],
          },
        },
        { p: "If none of the three fits the way your salon works, adjust the switches under “Can view these sections”. Each part of the dashboard has its own switch, for example “Bookings”, “Customers”, “Customer phone & email”, “Services” and “Opening hours”." },
        { img: { src: shot("can-view-these-sections-toggles"), alt: "The Can view these sections list with switches for Bookings, Customers, Customer phone & email, Services, Products, Opening hours, Reviews and Stock", caption: "Each line is one part of the dashboard. Flip the switch to allow or hide it." } },
        { note: "Clients' phone numbers and email addresses should be open to as few people as possible. Start low, for example with Stylist, and open more only when the person's work really needs it.", kind: "warn", title: "Client information" },
      ],
    },
    {
      id: "services-they-perform",
      title: "“Services they perform”: so clients book the right person for the service",
      blocks: [
        { p: "This part decides where a staff member appears on the booking page. The client picks a service, and the page only offers the staff chosen for that service. Anyone left unticked does not appear in the list." },
        { p: "So tick only the services the person can complete on their own. A new technician still learning volume lashes should not take volume bookings alone yet. When they are confident, perhaps after the craft courses in [VaraaAi Academy](/academy), press “Edit” on their card and tick the extra service." },
        { p: "You can link them the other way round too. When you create or edit a service, its “Who performs it” part lets you choose the people who do it." },
      ],
    },
    {
      id: "staff-list",
      title: "The staff list: individual working hours and removing someone",
      blocks: [
        { p: "Once saved, the new staff member appears in the list as a card. The card shows the name, title, bookings and revenue for the last 30 days. For pay per person, the Academy has a separate lesson on [staff income reports](lesson:doanh-thu-nhan-vien)." },
        { img: { src: shot("staff-card-schedule-button"), alt: "A staff member's card in the list with the Edit button, the Schedule button outlined in gold and the Remove button" } },
        {
          ul: [
            "**“Edit”:** change the photo, name, services or access.",
            "**“Schedule”:** set the person's own working hours. Use it for part-timers or anyone whose days off differ from the salon's [general opening hours](lesson:gio-mo-cua).",
            "**“Remove”:** for when the person no longer works at the salon.",
          ],
        },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when adding staff",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["The person does not need to sign in", "Leave the email and password empty. The card then shows “No login yet”"],
              ["Clients cannot see a stylist when booking a service", "Press “Edit” and tick that service under “Services they perform”"],
              ["Someone only works a few days a week", "Press “Schedule” on their card to set their own hours"],
              ["Reception needs to see everyone's calendar", "Choose the “Reception” role instead of “Stylist”"],
              ["Someone has left for good", "Press “Remove” on their card"],
            ],
          },
        },
        { p: "Once the team is in place, you follow the whole salon's day in the [appointment calendar](lesson:lich-hen) of the dashboard." },
      ],
    },
  ],
  howTo: {
    title: "Steps to add staff and set permissions on VaraaAi",
    id: "add-staff-steps",
    after: "what-to-prepare",
    lead: "The seven steps go from the top to the bottom of the staff form, following the lesson video.",
    steps: [
      {
        name: "Open “Staff” and press “Add staff”",
        text: "In the dashboard, tap “Staff” in the menu. This page brings each person's profile, services, schedule, access and performance together in one place. Press the gold “Add staff” button.",
        image: { src: shot("staff-tab-add-staff-button"), alt: "The VaraaAi business dashboard with the Staff tab outlined in gold and the Your salon's staff card with the Add staff button" },
      },
      {
        name: "Fill in the “Profile”",
        text: "Upload an avatar photo, then enter the “Staff name”, the “Title” and a short “Bio”. Use the name clients already know from the salon so they recognise the person.",
        image: { src: shot("staff-profile-photo-name-title"), alt: "The Profile part of the staff form with Upload photo, the Staff name field reading Léa outlined in gold and the Title Massage therapist" },
      },
      {
        name: "Choose the “Services they perform”",
        text: "Tap the services this person can do. Clients can only book them for those services, so leave out anything they cannot yet do alone.",
        image: { src: shot("services-they-perform"), alt: "The Services they perform part with Gel manicure, Gel pedicure, Classic lashes, Lash lift & tint and Relax massage ticked and Select all" },
      },
      {
        name: "Give a login if needed",
        text: "Under “Login & access”, enter an email and a password of at least 8 characters if you want the person to sign in and see their own schedule. When you give someone a login, they get a welcome email right away explaining how to sign in. If they do not need one, leave both fields empty.",
        image: { src: shot("login-and-access-email-password"), alt: "The Login & access part with the welcome email note and the email and password fields outlined in gold" },
      },
      {
        name: "Pick a quick role",
        text: "Choose one of three roles: “Stylist” sees only their own bookings, “Reception” sees the whole calendar, customers and contact details, and “Manager” sees everything. Choose by the person's actual job, not by how long they have worked for you.",
        image: { src: shot("quick-roles-stylist-reception-manager"), alt: "The Quick roles Stylist, Reception and Manager, with Reception outlined in gold and its description Whole calendar, customers and contact details" },
      },
      {
        name: "Fine-tune under “Can view these sections”",
        text: "If you need something different from the preset role, flip each switch to allow or hide that part. For example, you can let a stylist see bookings but switch off “Customer phone & email”.",
      },
      {
        name: "Press “Save”",
        text: "Press “Save”. The new staff member appears in the list with their bookings and revenue for the last 30 days. Repeat the steps for each person in the salon.",
        image: { src: shot("staff-card-bookings-revenue"), alt: "A staff card in the list showing the name, title, today's hours, bookings, revenue, number of services and No login yet" },
      },
    ],
  },
  faq: [
    {
      q: "What is the difference between Stylist, Reception and Manager on VaraaAi?",
      a: "A Stylist sees only their own bookings. Reception sees the whole calendar, customers and contact details. A Manager sees everything, including other pages, in view-only mode. You can still switch individual parts on or off under “Can view these sections”.",
    },
    {
      q: "Does every staff member need a login?",
      a: "No. An email and password are only needed if you want the person to sign in and see their own schedule. If you leave them empty, the person is still in the salon's staff list.",
    },
    {
      q: "Why choose the services each staff member performs?",
      a: "Because the booking page only offers the staff assigned to the service the client wants. That way clients can only book each person for the services that person actually does.",
    },
    {
      q: "Where do I set one staff member's own working hours?",
      a: "In the staff list, press “Schedule” on that person's card. There you set the working hours for that person alone.",
    },
    {
      q: "What do I do in the system when someone leaves the salon?",
      a: "In the staff list, press “Remove” on the person's card. They stop receiving bookings and can no longer sign in.",
    },
    {
      q: "Can staff see clients' phone numbers?",
      a: "That depends on the access you give. A Stylist sees only their own bookings, while Reception sees customers and contact details. “Can view these sections” also has a separate switch for “Customer phone & email”.",
    },
  ],
  related: ["dich-vu", "gio-mo-cua", "lich-hen", "doanh-thu-nhan-vien"],
};

export default article;
