import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lich-hen/${name}.webp`;
const shot = (name: string) => `/wiki/lich-hen/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-appointment-calendar-add-and-move-bookings",
  lesson: "lich-hen",
  category: "salon",
  title: "Salon appointment calendar: view bookings by stylist, add phone bookings and move appointments",
  metaTitle: "Salon appointment calendar: view, add and move bookings",
  metaDescription:
    "How to use the VaraaAi Bookings page in a nail, hair or spa salon: one column per stylist, day, week and month views, phone bookings and moving appointments.",
  keyword: "salon appointment calendar",
  keywords: [
    "salon scheduling software",
    "nail salon appointment book online",
    "add a booking for a phone customer",
    "view appointments by staff member",
    "reschedule a client's appointment",
    "mark a client as no-show",
    "salon calendar on your phone",
  ],
  excerpt: "One column per staff member, one block per booking. Hold an empty slot to add a booking, tap a booking to update it and drag it to move it.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("salon-toc-co-dien-tho-dang-lam-toc-cho-khach"),
    alt: "In a classic salon with gilded mirrors and a chandelier, a stylist combs the hair of a blonde client seated in a purple velvet chair",
  },
  takeaways: [
    "The **“Bookings”** page gives each staff member a column and each booking a block, so one look shows you the whole day.",
    "A block with a **globe icon** was booked online by the customer. The others were added by the salon.",
    "To add a booking for a phone or walk-in client, **press and hold an empty slot for about a second**, at the right time and in the right staff column.",
    "Tap a booking to update it: “Pay at the counter”, “Complete”, “No-show” or “Cancel”.",
    "Move a booking by **dragging its block** to a new time. The system asks you to confirm before it moves.",
  ],
  intro: [
    "A salon appointment calendar is only useful if it answers three questions the moment the phone rings: who is doing whom today, which times are free, and where the caller should go. A paper diary manages that with one stylist. Add a second and a third, plus clients booking online at midnight, and the diary fills with crossings-out and double bookings.",
    "This guide follows the VaraaAi Academy lesson “Bookings: view, add and update”. You will learn to read the Bookings page, add a booking for a phone client on your phone, update the status after each client and move an appointment to another time.",
  ],
  sections: [
    {
      id: "reading-the-calendar",
      title: "Viewing appointments by staff member: what the Bookings page shows",
      blocks: [
        { p: "The “Bookings” page is where the owner and the team work every day. The columns are staff members, the rows are hours, and each booking is a block where the two meet. The block shows the start and end time, the client's name and the service." },
        { img: { src: shot("bookings-calendar-one-column-per-staff"), alt: "The Bookings page on a phone with columns for Emma, Sofia and Léa, booking blocks with times, names and services, and the counters 4 appts, 4 done and €250.00 outlined in gold", caption: "The three counters at the top: today's appointments, how many are done and the expected revenue." } },
        {
          table: {
            head: ["Element", "Meaning"],
            rows: [
              ["Three counters at the top", "Today's appointments, how many are done and the expected revenue"],
              ["Block with a globe icon", "Booked online by the customer"],
              ["Block without a globe", "Added by the salon"],
              ["Staff names at the top", "Tap one to hide or show that person's column; “Hide all” hides every column"],
              ["Bar at the bottom", "Arrows to change the day, the date to pick any day, and the three views “Day”, “Week” and “Month”"],
            ],
          },
        },
        { img: { src: shot("tap-staff-name-to-hide-column"), alt: "The row of buttons above the calendar, Hide all, Emma, Sofia and Léa, outlined in gold above the counters and the three columns of the day", caption: "Tap a staff member's name to hide or show their column." } },
        { p: "Above the calendar a small line says “Calendar shown in the salon's time”, with the time zone and your own local time now. The time zone follows the country you chose when you [registered the salon](lesson:dang-ky-salon), so an owner who is travelling still sees the calendar in the salon's time." },
        { p: "The two kinds of booking also have two different colours, so you can see at a glance which ones clients booked themselves. You can choose the colour for each kind; see the guide to [booking colours](lesson:mau-lich-hen)." },
      ],
    },
    {
      id: "day-week-month",
      title: "Day, week or month view: which to use when",
      blocks: [
        { p: "The three views in the bottom bar answer three different questions. Here is how they fit an ordinary working week:" },
        {
          table: {
            head: ["View", "What you see", "Good for"],
            rows: [
              ["“Day”", "One column per staff member, each booking by the hour", "Running the day and fitting phone clients into free slots"],
              ["“Week”", "One column per day with the whole week's bookings", "Seeing which days are busy and which are quiet when planning staff"],
              ["“Month”", "The whole month, with the number of bookings on each day", "Looking ahead and finding a free day for a client who books far in advance"],
            ],
          },
        },
        { img: { src: shot("bookings-week-view"), alt: "The Bookings page in week view with columns for Monday, Tuesday and Wednesday, purple booking blocks and a green block with the globe icon of an online booking" } },
        { img: { src: shot("bookings-month-view"), alt: "The Bookings page in month view with the days of November, the 16th selected and small marks under the days that have bookings", caption: "In “Month” view, each day shows how many bookings it has." } },
        { note: "With a larger team, “Day” view gets crowded on a phone. Tap the names of the people who are not working today to hide their columns, and the screen shows only the people who have clients.", kind: "tip", title: "Hide columns to see more" },
      ],
    },
    {
      id: "adding-phone-bookings",
      title: "How to add a booking for phone and walk-in clients",
      blocks: [
        { p: "Online bookings appear on the page by themselves. But every salon still has clients who phone and clients who walk in off the street. For them you add the booking yourself, so nobody else can book the same slot." },
        { p: "Press and hold an empty slot on the calendar for about a second. The form “Book for a customer” opens at the time and in the staff column you pressed, so you do not have to choose the date and time again. The form has these fields:" },
        {
          table: {
            head: ["Field", "Notes"],
            rows: [
              ["“Service”", "Chosen from the salon's service menu. The service price appears just below"],
              ["“Customer name”", "The name the stylist calls when the client arrives"],
              ["“Phone number”", "So the salon can reach the client if something changes"],
              ["Email", "Optional. Needed if you want to send a confirmation email"],
              ["Note", "Optional"],
            ],
          },
        },
        { img: { src: shot("book-for-a-customer-form"), alt: "The Book for a customer form with the Service and Service price fields, the Customer name field outlined in gold and Phone number, Email (optional) and Note (optional) below" } },
        { p: "If you want the client to receive a confirmation and a reminder, enter their email and tick “Send the customer a confirmation and reminder emails”. A client who booked by phone has nothing to look back at, and a confirmation email fills that gap." },
        { img: { src: shot("send-confirmation-and-reminder-emails"), alt: "The bottom of the Book for a customer form with the box Send the customer a confirmation and reminder emails outlined in gold, and the Book and Cancel buttons below" } },
      ],
    },
    {
      id: "updating-status",
      title: "Updating the status: complete, no-show, cancel",
      blocks: [
        { p: "Tap a booking to open its details: the service, the time, the staff member and the total to collect. A small line tells you when the booking was made, either “Booked online at …” or “Added by the salon at …”." },
        { img: { src: shot("added-by-the-salon-at"), alt: "The details of a Relax massage booking for €70.00 with the line Added by the salon at 09:53, 16/11/2026 outlined in gold, and the total to collect and status buttons below", caption: "The line “Added by the salon at …” tells you the salon entered this booking, and when." } },
        { p: "Below are four buttons. Press the right one after each client, and the “done” counter at the top of the page is correct at the end of the day:" },
        {
          table: {
            head: ["Button", "When to press it"],
            rows: [
              ["“Pay at the counter”", "The client has been served and comes to the counter to pay"],
              ["“Complete”", "The client came and was served, and you mark the booking as done"],
              ["“No-show”", "The client did not turn up. It is recorded, so you can see who tends to miss appointments"],
              ["“Cancel”", "The appointment is no longer going ahead"],
            ],
          },
        },
        { p: "Do not delete or ignore a no-show booking. Press “No-show” so it is on record. After a few of them you have something concrete to discuss with that client, and a reason to review the [salon's cancellation policy](lesson:thanh-toan-chinh-sach)." },
        { p: "“Pay at the counter” opens checkout and invoicing, covered in the guide to [taking payment and invoices at the counter](lesson:thanh-toan-hoa-don). The details also have a “Report income” button where staff enter what they collected; see the guide to [staff income reports](lesson:doanh-thu-nhan-vien)." },
      ],
    },
    {
      id: "moving-and-situations",
      title: "Rescheduling a client's appointment and other everyday situations",
      blocks: [
        { p: "Clients asking to change their time happens every day. You do not need to cancel and create the booking again. Drag the booking block to the new time, the system asks “Move this booking?”, and you confirm. That question protects you from a finger that drags a block by accident on a phone screen." },
        { img: { src: shot("drag-booking-to-new-time"), alt: "The day calendar with Anna Müller's Classic lashes block at 13:15–14:45 in the middle column outlined in gold, ready to be dragged to another time" } },
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["A client phones to book while your hands are busy", "Hold the empty slot at the right time and stylist for about a second, fill in the name and phone number and press “Book”"],
              ["A client asks to come an hour later", "Drag the booking block to the new time and confirm when asked"],
              ["The time has passed and the client has not arrived", "Open the booking and press “No-show”"],
              ["You want to know whether the client or the salon made the booking", "Look for the globe icon on the block, or open the details and read “Booked online at …” or “Added by the salon at …”"],
              ["You need to see another day", "Use the arrows in the bottom bar, or tap the date to pick any day"],
            ],
          },
        },
        { p: "The Bookings page only fills up when clients have a way to book. If most of your bookings are still added by the salon, put your [online booking link](lesson:chia-se-link) in more places so clients book themselves and you answer the phone less." },
      ],
    },
  ],
  howTo: {
    title: "Steps to use the Bookings page as your salon appointment calendar",
    id: "bookings-page-steps",
    after: "reading-the-calendar",
    lead: "The six steps follow the lesson video, from viewing the calendar to adding, updating and moving bookings. All of them work on a phone.",
    steps: [
      {
        name: "Open “Bookings”",
        text: "In the dashboard, tap “Bookings”. Each staff member has a column and each booking is a block. At the top you see today's appointments, how many are done and the expected revenue.",
      },
      {
        name: "Tell online bookings from salon bookings",
        text: "A block with a globe icon was booked online by the customer; the others were added by the salon. Tap a staff member's name at the top to hide or show their column when you want a tidier view.",
        image: { src: shot("booked-online-globe-icon"), alt: "The day calendar with a green block at 15:00–16:15 carrying the globe icon outlined in gold, while the purple blocks were added by the salon" },
      },
      {
        name: "Change the day and the view in the bottom bar",
        text: "In the bottom bar, tap the arrows to move to another day, or tap the date to pick any day. On the right are the three views: “Day”, “Week” and “Month”.",
        image: { src: shot("bottom-bar-day-week-month"), alt: "The bottom bar of the Bookings page with the day arrows, the date Mon, 11/16 and the Day, Week and Month buttons outlined in gold" },
      },
      {
        name: "Hold an empty slot to add a booking",
        text: "Press and hold an empty slot for about a second, at the right time and in the right staff column. In “Book for a customer”, choose the “Service” and enter the “Customer name” and “Phone number”. To send a confirmation, add the email and tick the box below, then press “Book”.",
        image: { src: shot("hold-empty-slot-to-add-booking"), alt: "The day calendar with an empty slot around 16:00 in the second staff column outlined in gold, the place to press and hold to create a booking" },
      },
      {
        name: "Tap a booking to update its status",
        text: "Tap a booking to see the service, the time and the total to collect. When the client has been served, press “Pay at the counter” or “Complete”. If they do not turn up, press “No-show”, and to cancel, press “Cancel”.",
        image: { src: shot("pay-at-the-counter-complete-no-show-cancel"), alt: "Booking details with the Pay at the counter button outlined in gold next to Complete, No-show and Cancel, and the Report income bar below" },
      },
      {
        name: "Drag a booking to move it",
        text: "To reschedule, drag the booking block to the new time and let go. The system asks you to confirm before it moves. Tell the client the new time straight away, so you both remember the same one.",
      },
    ],
  },
  faq: [
    {
      q: "How do I add a booking for a client who phones, on my phone?",
      a: "On the “Bookings” page, press and hold an empty slot for about a second. “Book for a customer” opens at the time and staff column you pressed. Choose the service, enter the customer name and phone number and press “Book”.",
    },
    {
      q: "What does the globe icon on a booking mean?",
      a: "It means the customer booked online. Bookings added by the salon have a different icon and colour, so you can tell the two apart on the calendar.",
    },
    {
      q: "Which button do I press when a client does not turn up?",
      a: "Open the client's booking and press “No-show”. It is recorded, so you can see which clients tend to miss appointments.",
    },
    {
      q: "How do I move a client's appointment to another time?",
      a: "Drag the booking block on the calendar to the new time. The system asks you to confirm before it moves, and once you confirm, the booking is moved.",
    },
    {
      q: "Does a client get a confirmation email if I add the booking myself?",
      a: "Yes, if you enter the client's email and tick “Send the customer a confirmation and reminder emails” in “Book for a customer”. The email is optional, and the booking is created even if you leave it empty.",
    },
    {
      q: "How can I see when a booking was made?",
      a: "Tap the booking to open its details. A small line says “Booked online at …” for bookings clients made themselves, or “Added by the salon at …” for bookings the salon entered.",
    },
  ],
  related: ["mau-lich-hen", "thanh-toan-hoa-don", "doanh-thu-nhan-vien", "khach-hang"],
};

export default article;
