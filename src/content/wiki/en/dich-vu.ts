import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dich-vu/${name}.webp`;
const shot = (name: string) => `/wiki/dich-vu/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-service-menu-durations-and-prices",
  lesson: "dich-vu",
  category: "salon",
  title: "Salon service menu: how to add services, durations and prices to your online booking page",
  metaTitle: "Salon service menu: services, durations, prices, deposits",
  metaDescription:
    "How to build the service menu of a nail, hair, lash or spa salon on VaraaAi: service name, duration, cleanup time, price, deposit and the staff who perform it.",
  keyword: "salon service menu",
  keywords: [
    "how to add salon services and prices",
    "how to name nail salon services",
    "salon service duration",
    "cleanup time between clients",
    "deposit for salon bookings",
    "duplicate a service on VaraaAi",
    "change the order of services on a booking page",
  ],
  excerpt: "Each service needs a clear name, a real duration, a price and the people who do it. Clients see exactly what you enter, so set it up carefully once.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("tho-nail-lam-mong-cho-khach-tai-ban"),
    alt: "A blonde nail technician paints the nails of a client with auburn hair at a wooden table beside a large salon window",
  },
  takeaways: [
    "Services and prices are the first thing clients look at when they book, and they see **exactly what you enter**.",
    "**Duration** should be the real working time. **Cleanup time after** is the gap the calendar keeps free between two clients.",
    "The gold line **“Customers see: …”** previews the duration and price before you save.",
    "Clients can only book the staff you tick under “Who performs it” for that service.",
    "Use “Duplicate” to make a similar service quickly, and drag the ⋮⋮ handle to set the order clients see.",
  ],
  intro: [
    "A salon service menu on a booking page differs from the price list on your wall in one way: every line of it also runs your calendar. The service name tells the client what they are booking, the duration tells the calendar how many minutes to hold, and the staff section decides who the client can choose.",
    "This guide follows the VaraaAi Academy lesson “Add services and prices”. You will be able to add a complete service yourself, understand each field under “Time & price”, and arrange the whole menu so clients find what they want quickly.",
  ],
  sections: [
    {
      id: "why-a-clear-menu",
      title: "Why a clear service menu brings the salon more bookings",
      blocks: [
        { p: "When clients open a salon page, they look at the list of services before anything else. They want three answers: does the salon do what I need, how long does it take and what does it cost. A service line with a name, a duration and a price answers all three without anyone having to send a message." },
        { p: "On VaraaAi, “Services” in the dashboard is the salon's whole service menu, with prices and durations. The card at the top says it plainly: customers see exactly this when they book online. You can see how it looks from the client's side in the guide to [booking a salon appointment online](lesson:dat-lich-online)." },
        { p: "A wrong duration causes more trouble than a wrong price. Enter less time than the work takes and the next client arrives on time while the technician is still busy. Enter more and the day fills with gaps nobody can book." },
      ],
    },
    {
      id: "what-to-prepare",
      title: "What to prepare before adding services and prices",
      blocks: [
        { p: "Write the list of services on paper before you open the dashboard. For each service you need to know five things:" },
        {
          ul: [
            "**The name** clients use, not the salon's internal shorthand.",
            "**The real working time**, from the moment the client sits down until the work is finished.",
            "**The time to clear the desk and change tools** before the next client.",
            "**The price** and the currency the salon charges in.",
            "**Who in the salon can do** the service.",
          ],
        },
        { note: "“Who performs it” lets you pick from the people already listed under staff. You can also link them the other way round: when you [add a staff member](lesson:nhan-vien), you choose the services that person does. Either direction works.", kind: "info", title: "Services first or staff first" },
      ],
    },
    {
      id: "naming-and-description",
      title: "How to name services and write descriptions clients understand",
      blocks: [
        { p: "A service name should be the phrase a client would say on the phone: gel manicure, men's haircut, classic lash extensions. Avoid codes or package names that only your team understands, and write the names in the language your clients read." },
        { p: "The “Description” is “Shown under the service name when a customer picks it.” One line is enough as long as it says what the service includes. In the lesson video, the sample service “French manicure” has the description “Classic French tips with a glossy gel finish.”" },
        { p: "“Service group” is optional and is there for when you want to sort the menu into groups. A salon that does hands, feet and lashes should use groups, so clients do not have to read one long mixed list." },
        { note: "When a service comes in two versions, such as hands and feet, make two separate services with their own duration and price. Press “Duplicate” on the first one and change only the name and price.", kind: "tip", title: "Small tip" },
      ],
    },
    {
      id: "duration-cleanup-deposit",
      title: "Service duration, cleanup time and deposits",
      blocks: [
        { p: "The “Time & price” part has five fields. Each one affects the calendar or what clients see in its own way:" },
        {
          table: {
            head: ["Field", "What it does", "What to enter"],
            rows: [
              ["“Duration (minutes)”", "How long the service takes. Tap a preset or type any number of minutes", "The time of a normal appointment, not your fastest one"],
              ["“Cleanup time after (minutes)”", "The break between two clients. The calendar keeps it free after each appointment", "Enough to wipe the desk, lay out clean tools and wash your hands"],
              ["“Currency”", "The currency shown with the price", "The currency the salon charges in"],
              ["Price", "The amount clients see when they book", "The price you really charge"],
              ["Deposit", "An advance payment, marked optional", "Only fill it in if you want clients to pay a deposit"],
            ],
          },
        },
        { img: { src: shot("cleanup-time-after-each-client"), alt: "The Time & price part with the Cleanup time after (minutes) field outlined in gold below the duration presets", caption: "“Cleanup time after (minutes)” sits right below the duration. Leave it at 0 and two appointments can follow each other with no gap." } },
        { p: "Cleanup time is the field many owners skip and then spend the day racing the clock. Between two clients the desk has to be wiped and the tools changed, as described in the guide to [cleaning and disinfecting tools](lesson:ve-sinh-dung-cu). When you enter the gap, the calendar holds that time for you." },
      ],
    },
    {
      id: "edit-duplicate-reorder",
      title: "Edit, duplicate, hide and reorder services",
      blocks: [
        { p: "Once saved, the new service appears in the list straight away. Each service has four buttons and a handle:" },
        {
          table: {
            head: ["Button", "When to use it"],
            rows: [
              ["“Edit”", "Change the name, duration, price or who performs it"],
              ["“Duplicate”", "Make a similar service quickly and change only the name and price"],
              ["“Add-ons”", "Attach extras to this service"],
              ["“Hide”", "Pause a service for a while"],
              ["The ⋮⋮ handle on the left", "Drag up or down to change the order. Clients see the services in this order when they book"],
            ],
          },
        },
        { img: { src: shot("edit-duplicate-add-ons-hide-buttons"), alt: "The salon's service list with Gel manicure and Gel pedicure, each with duration, price and the Edit, Duplicate, Add-ons and Hide buttons", caption: "The “Duplicate” button is outlined in gold. The line at the top reminds you that clients see the order you set." } },
        { p: "The order deserves a minute of thought. Put your most booked services first, because on a phone clients only see the first few lines before they have to scroll." },
        { img: { src: shot("drag-handle-reorder-services"), alt: "The six-dot handle to the left of the Gel manicure service outlined in gold, used to drag services into order" } },
      ],
    },
    {
      id: "after-the-menu",
      title: "Once your service menu is ready",
      blocks: [
        { p: "With the menu done, the booking page has something for clients to choose. The two jobs left before they can pick a time are to [add staff and set their access](lesson:nhan-vien) and to [set your opening hours](lesson:gio-mo-cua), because clients can only book while the salon is open." },
        { p: "If you set a deposit on any service, write a clear cancellation policy so clients know the rules in advance. That is covered in the guide to [cancellation policy and payments](lesson:thanh-toan-chinh-sach). If you need a price list to print or post on social media, see the lesson on the [price list](lesson:bang-gia)." },
      ],
    },
  ],
  howTo: {
    title: "Steps to add a service to your salon service menu on VaraaAi",
    id: "add-service-steps",
    after: "what-to-prepare",
    lead: "The eight steps go from the top to the bottom of the “New service” form, in the same order as the lesson video.",
    steps: [
      {
        name: "Open “Services” and press “Add service”",
        text: "In the dashboard, tap “Services” in the menu. This page holds the salon's whole service menu. Press the gold “Add service” button to open the form for a new service.",
        image: { src: shot("services-menu-add-service-button"), alt: "The business dashboard with the Services tab outlined in gold and the card Your salon's service menu with the Add service button" },
      },
      {
        name: "Enter the “Service name” and choose a “Service group”",
        text: "Under “Basics”, type the “Service name”, for example French manicure. Choose a “Service group” if you sort your menu into groups, or leave “No group”. Name it the way clients say it so they recognise it at once.",
        image: { src: shot("service-name-under-basics"), alt: "The New service form with the Basics part and the Service name field reading French manicure outlined in gold" },
      },
      {
        name: "Write a one-line “Description”",
        text: "Say briefly what the service includes. This line appears right under the service name when a client picks it, so write it for someone who has never been to your salon.",
        image: { src: shot("short-service-description"), alt: "The Description field reading Classic French tips with a glossy gel finish outlined in gold, with the Time & price part below" },
      },
      {
        name: "Choose the duration",
        text: "Move on to “Time & price”. Tap one of the preset durations, for example 45 minutes, or type any number of minutes in the field below. Enter the time the work really takes in your salon.",
        image: { src: shot("choose-service-duration-minutes"), alt: "The Duration (minutes) presets 15, 30, 45, 60, 90 and 120 outlined in gold, with 45 selected" },
      },
      {
        name: "Fill in “Cleanup time after”",
        text: "Enter the minutes you need between two clients. The calendar then keeps this gap free after each appointment, so the next client is not booked straight on top of the last one.",
      },
      {
        name: "Choose the currency, then enter the price and deposit",
        text: "Pick the “Currency” and enter the price. If you want clients to pay in advance, fill in the deposit as well; it is marked optional. Check the gold line “Customers see: …” below to confirm the duration and price exactly as clients will see them.",
        image: { src: shot("customers-see-duration-and-price"), alt: "The Price and optional Deposit fields with the gold line Customers see: 45 min · €50.00 outlined below them" },
      },
      {
        name: "Choose who performs it",
        text: "Under “Who performs it”, tap the staff members who can do this service, or press “Select all”. Clients can only book the people chosen for the service, so do not tick anyone who cannot do it yet.",
        image: { src: shot("who-performs-it-staff"), alt: "The Who performs it part with three staff members, Emma, Sofia and Léa, outlined in gold and Select all on the right" },
      },
      {
        name: "Press “Save”",
        text: "Scroll to the bottom and press “Save”. The new service appears in the list at once with its duration and price. Repeat for the rest of your services, or use “Duplicate” for those that are almost the same.",
      },
    ],
  },
  faq: [
    {
      q: "What is “Cleanup time after” in a service?",
      a: "It is the break between two clients. After each appointment for the service, the calendar keeps free the number of minutes you enter, so you have time to clear the desk and get ready for the next client.",
    },
    {
      q: "How many minutes should a service take in the booking system?",
      a: "Enter the time the work really takes in your salon. You can tap a preset such as 45 minutes or type any number of minutes. Use the time of a normal appointment so the day does not run late.",
    },
    {
      q: "Do I have to take a deposit when clients book?",
      a: "No. The deposit field is optional. Fill it in only when you want clients to pay something in advance for that service, and leave it empty otherwise.",
    },
    {
      q: "How do I create several similar services quickly?",
      a: "Press “Duplicate” on a service you already have. The service is copied, and you only change the name and price instead of entering everything again.",
    },
    {
      q: "Why can't clients choose a particular staff member for a service?",
      a: "Because that person is not ticked under “Who performs it” for the service. Clients can only book staff assigned to the service. Press “Edit” on the service and tick that person.",
    },
    {
      q: "How do I change the order of services on the booking page?",
      a: "In “Services”, drag the ⋮⋮ handle on the left of each service up or down. Clients see the services in exactly this order when they book.",
    },
  ],
  related: ["nhan-vien", "gio-mo-cua", "thanh-toan-chinh-sach", "bang-gia"],
};

export default article;
