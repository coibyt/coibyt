import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tong-quan/${name}.webp`;
const shot = (name: string) => `/wiki/tong-quan/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-revenue-report-daily-overview",
  lesson: "tong-quan",
  category: "salon",
  title: "Your daily salon revenue report: how to read the Overview page and see the whole salon at a glance",
  metaTitle: "Salon revenue report every morning on the Overview page",
  metaDescription:
    "How to read the VaraaAi Overview page: expected revenue today, four monthly numbers against last month, what needs attention, the next 7 days and top services.",
  keyword: "salon revenue report",
  keywords: [
    "track nail salon revenue daily",
    "salon dashboard overview",
    "salon revenue by month",
    "best-selling salon services",
    "compare revenue with last month",
    "what a salon owner should check every morning",
    "salon revenue chart for 6 months",
  ],
  excerpt: "Revenue, bookings, things that need attention and top services on one page. One scroll each morning tells you how the whole salon is doing.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-salon-xem-trang-tong-quan-tren-may-tinh-bang"),
    alt: "A woman with curly hair in a purple silk blouse leans on a marble counter holding a tablet and smiling, with a chandelier-lit salon behind her",
  },
  takeaways: [
    "The Overview is the first page of the dashboard: at the top are today's appointments, **“Expected revenue today”** and **“Next up”**.",
    "The month's four numbers are revenue, bookings, new customers and average rating, each **compared with the same period last month**.",
    "**“Needs attention”** reminds you of things that are waiting, such as unread messages or orders to handle.",
    "Scroll down for **“Next 7 days”**, **“Revenue, last 6 months”** and **“Top services this month”**.",
    "The page also counts scans of the QR codes printed on your price list and posters over 30 days.",
  ],
  intro: [
    "A salon revenue report is most useful when you can read it over your first coffee of the day, before the first client walks in. An owner does not need piles of charts. They need to know how many clients are coming today, how the money is going and what is waiting for them.",
    "This guide follows the VaraaAi Academy lesson “The overview page”. You will read each part of the page from top to bottom, understand which question every number answers, and know what to do when a number goes down.",
  ],
  sections: [
    {
      id: "check-every-morning",
      title: "What a salon owner should check every morning",
      blocks: [
        { p: "A busy salon is not always a healthy one. Some weeks every chair is full and revenue is still lower than last month, because clients have moved to cheaper services. Some months revenue looks fine but there are almost no new clients. You cannot see these things from the front desk. They only show up when the numbers sit side by side." },
        { p: "The VaraaAi Overview page does exactly that. When you open the dashboard each morning, you know three things straight away: how many clients you have today, how revenue is going and what is waiting for you. You do not enter or set up anything for this page. It gathers everything from the salon's bookings, reviews and messages." },
        { p: "The page is laid out in the order an owner needs it. Today is at the top, then this month, then the things to deal with, and finally the longer trends. You can stop at any level depending on how many minutes you have." },
      ],
    },
    {
      id: "four-monthly-numbers",
      title: "The month's four numbers and how to compare revenue with last month",
      blocks: [
        { p: "Just below today's section are the month's four cards. Each one carries the line “vs. same period last month”. This month's number always comes with something to measure it against, so you know whether the salon is going up or down without opening last month's books." },
        {
          table: {
            head: ["Card", "Question it answers", "If it is lower than last month"],
            rows: [
              ["“Revenue this month”", "How much the salon has made this month", "Check “Top services this month” to see which service has dropped"],
              ["“Bookings this month”", "How many bookings clients have made", "Check “Next 7 days” for empty days to fill"],
              ["“New customers”", "Whether new people are discovering the salon", "Review the channels that bring your booking link to new people"],
              ["“Average rating”", "How many stars clients give you", "Read recent reviews and reply to clients"],
            ],
          },
        },
        { img: { src: shot("new-customers-and-average-rating"), alt: "The New customers card showing 4 and the Average rating card showing 5.0 from 1 review outlined in gold, each with the line vs. same period last month", caption: "Under the rating card you also see the page views for the last 30 days." } },
        { p: "The third column of the table is this guide's suggestion, not an automatic prompt from the software. The main point is not to read one number alone. Revenue down while bookings hold steady is about prices and the mix of services. Both down is about the number of clients." },
        { p: "To split revenue by team member, read the guide to [revenue tracking by staff member](lesson:doanh-thu-nhan-vien). To get the figures into a spreadsheet for your accountant, see [Excel exports](lesson:xuat-excel). For the rating card, approving and replying to reviews is covered in [reviews and Google](lesson:danh-gia-google)." },
      ],
    },
    {
      id: "today-and-needs-attention",
      title: "“Today's appointments” and “Needs attention”: the two parts for the working day",
      blocks: [
        { p: "“Today's appointments” lists each client by time. Each row has the start and end time, the client's name, the service and the staff member. Read it at the start of the day and you know which hours are tight, which are free, and who needs to prepare what. For more detail, press “View all”, or open the calendar to [see bookings by staff member and add phone bookings](lesson:lich-hen)." },
        { img: { src: shot("needs-attention-unread-messages-orders"), alt: "The Needs attention section outlined in gold, with 2 unread messages, 1 order to handle and 1 gift card awaiting activation, and the Next 7 days section below", caption: "“Needs attention” lists what is waiting, each with a count." } },
        { p: "“Needs attention” is your to-do tray. It reminds you of things that are waiting, such as unread messages or orders to handle; in the video it also shows gift cards awaiting activation. When nothing is waiting, it tells you all is clear. A price question left overnight is often a client who has booked somewhere else by morning, so deal with this part before anything else. If messages pile up, the guide to [the inbox and the AI assistant](lesson:tin-nhan-ai) shows how to let the AI reply while your hands are busy." },
      ],
    },
    {
      id: "trends",
      title: "Next 7 days, 6-month revenue chart and the salon's best-selling services",
      blocks: [
        { p: "The lower part of the page answers questions that reach beyond one day. Each chart is tied to a concrete decision." },
        { h3: "“Next 7 days”" },
        { p: "The bar chart shows how many bookings each day of the coming week already has. A tall bar is a day that needs enough staff. A short bar is a day with room, and you still have time to fill it with a post or an [offer email](lesson:email-marketing) to your regulars." },
        { h3: "“Revenue, last 6 months”" },
        { img: { src: shot("revenue-last-6-months-chart"), alt: "The Revenue, last 6 months bar chart from June to November with only November showing €295, and Appointment outcomes (90 days) below", caption: "Six bars for the last six months. In the video, the sample salon only has figures for the latest month." } },
        { p: "Beauty work is seasonal: some months clients flock in around the holidays, others are quiet. Looking at six months side by side, you can tell a month that is low because of the season from a decline that keeps going, two situations that call for different responses." },
        { h3: "“Top services this month”" },
        { img: { src: shot("top-services-this-month"), alt: "The Top services this month ranking with Gel manicure €90 and 2 bookings, Classic lashes €80, Relax massage €70 and Gel pedicure €55, each with a coloured bar", caption: "Each service shows the revenue it brought in and its number of bookings this month." } },
        { p: "The ranking shows how much each service brought in and how many bookings it had this month. The service at the top belongs at the top of your [service menu](lesson:dich-vu), because it is what clients look for most. A service that sits at the bottom month after month deserves a fresh look at its name, price or duration." },
      ],
    },
    {
      id: "qr-scans",
      title: "Counting scans of the QR codes on your price list and posters",
      blocks: [
        { p: "The Overview page also counts scans of the QR codes printed on your price list and posters over 30 days. The number tells you whether the paper on your door is actually working." },
        { p: "If you have just put up a [“Scan to book” QR poster](lesson:poster-qr) or printed a [price list with a QR code](lesson:bang-gia), note the date and check the scans a few weeks later. If scans are low, try moving the poster before concluding that clients do not use the code." },
      ],
    },
    {
      id: "daily-weekly-monthly",
      title: "Tracking salon revenue daily, weekly and monthly",
      blocks: [
        { p: "A page full of numbers is only useful if you know when to look at which part. The rhythm below is this guide's suggestion; adjust it to your own salon:" },
        {
          table: {
            head: ["When", "Which part", "What for"],
            rows: [
              ["Every morning", "Today's section, “Today's appointments”, “Needs attention”", "Getting ready for the day and answering what is waiting"],
              ["Start of the week", "“Next 7 days”", "Planning staff and filling quiet days"],
              ["End of the month", "The month's four numbers, “Revenue, last 6 months”, “Top services this month”", "Reviewing the month and adjusting the menu, prices and offers"],
            ],
          },
        },
        { note: "Do not react to one day's numbers. A quiet day can be down to the weather or a public holiday. Wait until the comparison with last month and the six-month chart tell the same story before changing prices or the menu.", kind: "tip", title: "Watch the trend, not the day" },
      ],
    },
  ],
  howTo: {
    title: "How to read your salon revenue report on the Overview page",
    id: "reading-the-overview",
    after: "check-every-morning",
    lead: "The five steps go from the top of the page to the bottom, in the order of the lesson video.",
    steps: [
      {
        name: "Open the dashboard and read the top section",
        text: "Open the dashboard and the “Overview” tab comes first. At the top are your greeting, today's number of appointments, “Expected revenue today” and “Next up” with the time, client and service. The word “expected” reminds you this is the day's estimate, not money already taken.",
        image: { src: shot("expected-revenue-today-and-next-up"), alt: "The top of the Overview page with the Expected revenue today card showing €250 and the Next up card outlined in gold" },
      },
      {
        name: "Use “Open calendar”, “View salon page” and “Copy booking link”",
        text: "These buttons are shortcuts to the most common jobs. “Open calendar” takes you to the bookings. “View salon page” opens the page clients see. “Copy booking link” copies the link for you to paste into Facebook, Instagram or a message so clients can book themselves. There is also a “Messages” button next to them.",
        image: { src: shot("open-calendar-view-salon-page-copy-booking-link"), alt: "The evening greeting on the Overview page with the Open calendar, Messages, View salon page and Copy booking link buttons outlined in gold" },
      },
      {
        name: "Check the month's four numbers",
        text: "Scroll down a little to see the four cards: revenue, bookings, new customers and average rating. Read the “vs. same period last month” line under each one too, because a number only means something when it is compared with something.",
        image: { src: shot("revenue-and-bookings-this-month"), alt: "The Revenue this month card showing €295 and the Bookings this month card showing 5 outlined in gold, each with the line vs. same period last month" },
      },
      {
        name: "Read “Today's appointments” and “Needs attention”",
        text: "“Today's appointments” lists each client by time. “Needs attention” reminds you of what is waiting, such as unread messages or orders to handle. Clear this part before the working day starts, so no client is left waiting for an answer.",
        image: { src: shot("todays-appointments-by-time"), alt: "The Today's appointments section outlined in gold, listing four bookings by time with the client's name, service and staff member" },
      },
      {
        name: "Scroll to “Next 7 days”, “Revenue, last 6 months” and “Top services this month”",
        text: "The last three parts show the trend: how full next week already is, whether revenue has gone up or down over six months, and which services bring in the most. You do not need them every day. Once a week is enough to adjust in time.",
        image: { src: shot("next-7-days-bookings-chart"), alt: "The Next 7 days bar chart outlined in gold with 5 appointments booked and Monday the tallest bar, and the Revenue, last 6 months heading below" },
      },
    ],
  },
  faq: [
    {
      q: "What does the VaraaAi Overview page show?",
      a: "Today's number of appointments, expected revenue today, the next appointment, the month's four numbers, today's appointments and what needs attention. Further down are the next 7 days, a revenue chart for the last 6 months and the top services this month.",
    },
    {
      q: "What are the month's four numbers compared with?",
      a: "With the same period last month. The revenue, bookings, new customers and average rating cards each have the line “vs. same period last month”, so you know whether the salon is going up or down.",
    },
    {
      q: "What does “Needs attention” remind me about?",
      a: "Things that are waiting for you, such as unread messages or orders to handle. When nothing is waiting, it tells you that all is clear.",
    },
    {
      q: "Which button gives me the booking link to send to clients quickly?",
      a: "Press “Copy booking link” at the top of the Overview page. Then paste the link into Facebook, Instagram or a message so clients can book themselves.",
    },
    {
      q: "Where can I see which of my salon's services sell best?",
      a: "Scroll to the bottom of the Overview page to “Top services this month”. Services are ranked by what they brought in this month, with their number of bookings.",
    },
    {
      q: "How do I know how many people scanned the QR code on my poster and price list?",
      a: "The Overview page counts scans of the QR codes printed on your price list and posters over 30 days. Use that number to see whether your printed materials are being used.",
    },
  ],
  related: ["chi-nhanh", "doanh-thu-nhan-vien", "xuat-excel", "lich-hen"],
};

export default article;
