import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/gio-mo-cua/${name}.webp`;
const shot = (name: string) => `/wiki/gio-mo-cua/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "set-salon-opening-hours-and-holidays",
  lesson: "gio-mo-cua",
  category: "salon",
  title: "Set salon opening hours: weekly schedule, lunch breaks and holidays on your booking page",
  metaTitle: "Set salon opening hours: weekly schedule, lunch, holidays",
  metaDescription:
    "How to set salon opening hours on VaraaAi: fill the week with a quick preset, adjust single days, add a shift for a lunch break and block holidays from booking.",
  keyword: "set salon opening hours",
  keywords: [
    "nail salon opening hours on a booking page",
    "add a lunch break to salon hours",
    "add holidays to a salon calendar",
    "block days from online booking",
    "salon weekly schedule",
    "clients booking outside opening hours",
  ],
  excerpt: "Clients can only book inside your opening hours. A quick preset fills the week, “Add shift” handles the lunch break and a holiday is blocked with one tap.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-thu-gian-trong-spa-sang-trong"),
    alt: "A woman in a white robe relaxes beside a candlelit spa pool while a staff member in black walks past carrying a tray",
  },
  takeaways: [
    "Clients **can only book inside your opening hours**, so set them before you take bookings online.",
    "Press a **quick preset** to fill the whole week, then adjust single days.",
    "If the salon closes for lunch, press **“Add shift”** for a second shift that day. The gap between the two shifts is the break.",
    "Days added under **“Holidays & closed days”** cannot be booked, even when they are normal working days.",
    "After changing the hours, remember to press “Save opening hours”.",
  ],
  intro: [
    "When you set salon opening hours on a booking page, you do the shortest job in putting the salon online, about a minute, yet it decides which times clients can choose. The booking page only lets clients book while you are open. Get one day wrong and someone books when nobody is there, or the salon is open and nobody can book.",
    "This guide follows the VaraaAi Academy lesson “Opening hours and days off”. You will fill in the weekly schedule, split the day around a lunch break and block the days the salon is closed in advance.",
  ],
  sections: [
    {
      id: "why-hours-must-be-right",
      title: "Why opening hours must be right before you take online bookings",
      blocks: [
        { p: "When a client phones, whoever answers knows whether the salon is open that day. A booking page has nobody in between. It relies entirely on the hours you entered to decide which times to show." },
        { p: "The line at the top of “Opening hours” states the rule: “Customers can only book while you're open.” It adds that online booking updates instantly when you add lunch breaks and holidays. You change the hours in one place, and clients see the change wherever they book." },
        { p: "An appointment on a day the salon is closed annoys everyone. The client finds a locked door, and you have to call, apologise and rebook. A minute spent entering the hours correctly costs far less than one of those days." },
      ],
    },
    {
      id: "what-to-prepare",
      title: "Before you start: write down the salon's real working week",
      blocks: [
        { p: "Before you open the dashboard, answer four questions about your salon:" },
        {
          ul: [
            "Which days of the week is the salon open, and which is it closed?",
            "From what time to what time is it open each day? Are weekends different from weekdays?",
            "Does the salon close for lunch, and from when to when?",
            "Are there public holidays or other days coming up when the salon will be closed?",
          ],
        },
        { note: "Under the heading “Weekly schedule” there is a line showing the salon's time zone, for example “Time zone: Europe/Paris”. Glance at it. The time zone follows the country you chose when you [registered the salon](lesson:dang-ky-salon), and every opening time you enter is read in it.", kind: "info", title: "Check the time zone" },
      ],
    },
    {
      id: "presets-and-single-days",
      title: "Quick presets and adjusting each day",
      blocks: [
        { p: "Quick presets are common schedules ready to use. Press one and every day of the week is filled in at once. The lesson video shows three:" },
        {
          table: {
            head: ["Quick preset", "Means"],
            rows: [
              ["Mon–Fri · 9:00–18:00", "Open Monday to Friday, 9 am to 6 pm"],
              ["Mon–Sat · 9:00–19:00", "Open Monday to Saturday, 9 am to 7 pm"],
              ["Every day · 10:00–20:00", "Open all seven days, 10 am to 8 pm"],
            ],
          },
        },
        { p: "Few salons match a preset exactly. Pick the closest one and change the days that differ. Each day has a switch to turn it on or off and two time fields for opening and closing. A day that is switched on shows “Open” under its name." },
        { note: "If the salon closes earlier on Saturdays, press the preset and then change only Saturday's closing time. There is no need to enter the whole week again.", kind: "tip", title: "Small tip" },
      ],
    },
    {
      id: "lunch-break",
      title: "Adding a lunch break to salon hours with “Add shift”",
      blocks: [
        { p: "Each day can have two shifts. The time between the first and the second shift is a break, and clients cannot book into it. That is how you block a lunch break without switching off the whole day." },
        { p: "Say the salon works in the morning until 12, takes an hour off and then works until the evening. Set the first shift to end at 12:00, press “Add shift” and start the second shift at 13:00. Clients then cannot book anything between 12 and 1." },
        { p: "A one-person salon needs this most. With nobody to cover, an unblocked lunch hour can let the calendar fill from morning to night without a moment to eat." },
      ],
    },
    {
      id: "holidays",
      title: "Adding holidays and blocking days from online booking",
      blocks: [
        { p: "The weekly schedule repeats every week. Exceptions go under “Holidays & closed days”, below the weekly schedule. On those days clients cannot book, even if the day is normally a working day." },
        { img: { src: shot("closed-days-reason-and-add-button"), alt: "The Holidays & closed days part with From and To (optional) date fields, the reason field outlined in gold and the Add closed days button", caption: "“To (optional)” can stay empty. For a single day off, choosing “From” is enough." } },
        { p: "There are two ways to add them. The first is to pick “From”, and “To (optional)” if you are closed for several days, write the reason and press “Add closed days”. The reason field suggests examples such as a Christmas break or renovation. The second is to tap a suggestion under “Upcoming holidays” just below; one tap adds the day." },
        { note: "Add closed days as early as you can, as soon as you know them. Clients often book many days ahead, and blocking a day before anyone books it saves you rescheduling calls.", kind: "tip", title: "Do it early" },
      ],
    },
    {
      id: "staff-hours",
      title: "Salon opening hours and each staff member's hours",
      blocks: [
        { p: "Opening hours are the frame for the whole salon. Inside that frame each staff member can have their own schedule, such as mornings, afternoons or different days off. You set that on the Staff page with the “Schedule” button on each person's card. The guide to [adding staff and permissions](lesson:nhan-vien) covers it." },
        { p: "Once the opening hours are right, your booking page has the three things clients need: [services and prices](lesson:dich-vu), people to do them and free times. What is left before inviting clients is to [set your cancellation policy](lesson:thanh-toan-chinh-sach) and then [share your booking link](lesson:chia-se-link)." },
      ],
    },
  ],
  howTo: {
    title: "Steps to set salon opening hours on VaraaAi",
    id: "opening-hours-steps",
    after: "what-to-prepare",
    lead: "The first six steps are the weekly schedule and the last three are days off. Everything is in “Opening hours” in the dashboard.",
    steps: [
      {
        name: "Open “Opening hours”",
        text: "In the dashboard, tap “Opening hours” in the menu. The card at the top says whether the salon is open now and shows the open hours per week, the working days and the upcoming closed days.",
        image: { src: shot("your-salons-opening-hours-card"), alt: "The Your salon's opening hours card showing Closed now, 60 h open hours a week, 6/7 working days and 0 upcoming closed days" },
      },
      {
        name: "Press a quick preset",
        text: "Under “Weekly schedule”, press one of the “Quick presets”, for example Mon–Sat · 9:00–19:00. Every day is filled in at once. It is the fastest way to get hours for the whole week.",
        image: { src: shot("quick-presets-fill-whole-week"), alt: "The Weekly schedule with three quick presets and the time zone line, the Mon–Sat 9:00–19:00 preset outlined in gold" },
      },
      {
        name: "Switch each day on or off",
        text: "Each day has a switch on the left. Switch off the days the salon is closed and switch on the days it is open. Check the salon's regular day off before moving on.",
        image: { src: shot("switch-day-on-or-off"), alt: "The on and off switch for Monday outlined in gold, with Open below the day name and the opening and closing times" },
      },
      {
        name: "Edit the opening and closing times",
        text: "Tap the time fields of a day to change when it opens and closes. Work through the days whose hours differ from the preset, such as the weekend.",
        image: { src: shot("edit-opening-and-closing-times"), alt: "Monday's opening time 09:00 and closing time 18:00 outlined in gold in the salon's weekly schedule" },
      },
      {
        name: "Press “Add shift” if the salon closes for lunch",
        text: "If the salon closes at lunchtime, press “Add shift” on that day to get a second shift. End the first shift when the break starts and start the second when you reopen. The gap in between is the break.",
        image: { src: shot("add-shift-for-lunch-break"), alt: "The Add shift button on the right of Monday outlined in gold, used to add a second shift that day" },
      },
      {
        name: "Press “Save opening hours”",
        text: "When you change something, a bar at the bottom of the screen says “You have unsaved changes”. Press “Save opening hours”. Until you save, the booking page keeps using the old hours.",
        image: { src: shot("save-opening-hours-button"), alt: "The bar You have unsaved changes at the bottom of the screen with an Undo button and the Save opening hours button outlined in gold" },
      },
      {
        name: "Add closed days with “From” and “To”",
        text: "Scroll down to “Holidays & closed days”. Pick “From”, and “To (optional)” if you are closed for several days, write the reason and press “Add closed days”. Clients cannot book on these days.",
        image: { src: shot("holidays-closed-days-from-to"), alt: "The Holidays & closed days part with the From and To (optional) date fields outlined in gold and the reason field below" },
      },
      {
        name: "Or tap a suggested holiday",
        text: "Below “Add closed days” is a list of “Upcoming holidays”. Tap a suggestion and the day is added at once, without picking the date by hand.",
        image: { src: shot("upcoming-holidays-suggestions"), alt: "Upcoming holidays suggestions such as Finnish Independence Day Dec 6, Christmas Eve, Christmas Day, Boxing Day and New Year's Eve outlined in gold" },
      },
    ],
  },
  faq: [
    {
      q: "Can clients book outside the salon's opening hours?",
      a: "No. Clients can only book times inside the opening hours you set, and never on a closed day. That is why the opening hours must be right before you take bookings online.",
    },
    {
      q: "How do I set a lunch break in the salon's hours?",
      a: "Press “Add shift” on that day to get a second shift. Each day can have two shifts, and the time between them is a break that clients cannot book.",
    },
    {
      q: "What is the fastest way to fill in opening hours for the whole week?",
      a: "Press one of the “Quick presets” under “Weekly schedule”, for example Mon–Sat · 9:00–19:00. The preset fills every day, and you can still adjust single days afterwards.",
    },
    {
      q: "Where do I add holidays for the salon?",
      a: "In “Opening hours”, scroll down to “Holidays & closed days”. Choose “From” and, if needed, “To (optional)”, write the reason and press “Add closed days”, or tap one of the suggested holidays.",
    },
    {
      q: "Can clients book a holiday that falls on a normal working day?",
      a: "No. Days added under “Holidays & closed days” cannot be booked, even when they are working days in the weekly schedule.",
    },
    {
      q: "Where do I set different hours for each staff member?",
      a: "Opening hours are the salon's shared hours. Each person's own working hours are set on the Staff page, with the “Schedule” button on that person's card.",
    },
  ],
  related: ["nhan-vien", "dich-vu", "thanh-toan-chinh-sach", "chia-se-link"],
};

export default article;
