import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/doanh-thu-nhan-vien/${name}.webp`;
const shot = (name: string) => `/wiki/doanh-thu-nhan-vien/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "nail-salon-revenue-tracking-by-staff",
  lesson: "doanh-thu-nhan-vien",
  category: "salon",
  title: "Nail salon revenue tracking by staff member: staff report after each client, the owner approves and sees totals and tips",
  metaTitle: "Nail salon revenue tracking by staff member, with tips",
  metaDescription:
    "Staff income reports on VaraaAi for nail, hair and spa salons: staff enter what they took after each client; the owner approves and sees totals per person.",
  keyword: "nail salon revenue tracking",
  keywords: [
    "salon revenue per staff member",
    "staff income report",
    "how to work out nail technician commission",
    "tracking tips for nail technicians",
    "cash and card reconciliation at the end of the day",
    "salon income management software",
    "remind staff to report income",
  ],
  excerpt: "Staff press “Report income” after each client and enter the amount in the right box. The owner opens “Income management”, compares it with the amount due and approves.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("khach-tra-tien-tai-quay-salon-voi-nhan-vien"),
    alt: "A fair-haired man in a jumper and a brown-haired woman holding a phone laugh together at a light wooden counter beside a large salon window",
  },
  takeaways: [
    "Staff report straight after each client: they open that booking on the “Bookings” page and press **“Report income”**.",
    "The amount goes in the right box: cash, bank or card, MobilePay, paid online in advance or gift card. The **“Fill in”** button enters the full amount.",
    "**Tips belong to the staff member**: they are not added to the salon's income and are only counted for the monthly tip total.",
    "The owner opens **“Income management”**, compares each report with the amount due and presses “Approve”, or “Don't approve” so the staff member corrects it.",
    "The **“By staff member”** section shows how much each person took in the chosen period.",
  ],
  intro: [
    "Nail salon revenue tracking gets hardest at one question at the end of the day: how much did each technician take, and was it cash or card? When three or four people take payments, the cash in the drawer, the money in the account and each person's memory rarely agree on their own. The fix is to record every payment when it happens, by the person who just took it.",
    "This guide follows the VaraaAi Academy lesson “Staff income reports”. You will see how staff report a booking, how the owner approves it, where tips are counted, and how to read the income of each person for a period.",
  ],
  sections: [
    {
      id: "why-report-after-each-client",
      title: "Why staff should report income after every client",
      blocks: [
        { p: "The familiar routine in many salons is that everyone sits down at closing time, each person reads out their numbers and the owner adds them up on paper. That relies entirely on memory after a long day. One client who pays half in cash and half by card, or one who uses a gift card, is enough to throw the total out." },
        { p: "When the report is tied to each booking, checking becomes simple. The booking already holds the amount due. The staff member only enters what the client actually paid and how. The owner does not have to ask anyone again; they just look and approve." },
        { p: "It is also fair to the team. Tips are recorded separately for each person, and what each person took in the period is right there on the screen, so nobody has to argue over a notebook." },
      ],
    },
    {
      id: "report-form",
      title: "What the staff income report form contains",
      blocks: [
        { p: "The form opens when a staff member presses “Report income” in the booking details. At the top are the client's name, the service and the line “Due for this booking”. Below are boxes for each way the client may have paid:" },
        {
          table: {
            head: ["Box", "What to enter"],
            rows: [
              ["“Cash payment”", "The cash the client handed over"],
              ["“Bank / card payment”", "What the client paid by bank or card"],
              ["“MobilePay payment”", "What the client paid with MobilePay"],
              ["“Paid online in advance”", "What the client paid online beforehand, with a “Channel” box for where they paid"],
              ["“Gift card 1”, “Gift card 2”", "Amounts paid by gift card. The “Card code (optional)” box can stay empty"],
              ["“Tip”", "Extra money the client gave, which belongs to the staff member"],
              ["“Note”", "Anything that needs explaining, for example a regular client's discount"],
            ],
          },
        },
        { img: { src: shot("cash-bank-card-mobilepay-payment"), alt: "The income report with Due for this booking €70.00 above, and the Cash payment, Bank / card payment and MobilePay payment boxes outlined in gold, each with a Fill in button", caption: "Each box has a “Fill in” button that enters the full amount due." } },
        { p: "If the client paid two ways, the staff member fills in two boxes. The “Total collected” line adds them up itself, and when the total equals the amount due it says “Matches the amount due”. That lets staff catch their own typing mistakes before sending." },
        { img: { src: shot("paid-online-in-advance-and-gift-cards"), alt: "The lower part of the report with the Paid online in advance box and its Channel field, and the Gift card 1 and Gift card 2 boxes with optional card codes and discount choices" } },
      ],
    },
    {
      id: "tips",
      title: "Tracking tips for nail technicians: recorded separately, not added to income",
      blocks: [
        { p: "If the client left a tip, the staff member enters it under “Tip”. The line under the box states the rule: it is “Your own tip”, it is not added to the salon's income, and it is used for the monthly tip total." },
        { img: { src: shot("tip-not-added-to-salon-income"), alt: "The Total collected line showing €70.00 and Matches the amount due, with the Tip box below outlined in gold and its note about tips not being added to the salon's income" } },
        { p: "Keeping tips apart from income helps in two ways. The salon's income is not inflated by money that does not belong to the salon. And each technician has a clear monthly tip figure without keeping their own notebook. On the owner's page, tips also have their own box next to the income totals." },
        { note: "How tips are recorded and declared differs from country to country. The lesson only covers counting them in the app. For the tax side of tips, ask an accountant where the salon operates.", kind: "warn", title: "Tip rules depend on the country" },
      ],
    },
    {
      id: "owner-approves",
      title: "The owner checks and approves reports in “Income management”",
      blocks: [
        { p: "The owner's side is “Income management”. At the top are the boxes for the period you are viewing. Below them is each report your staff have sent." },
        {
          table: {
            head: ["Box", "Meaning"],
            rows: [
              ["Total collected", "The total of all reports, with the number of reports"],
              ["Approved", "The amount you have checked and accepted"],
              ["Waiting", "The amount staff have reported that is waiting for you"],
              ["Not approved, to fix", "The amount in reports you sent back for correction"],
              ["Tips", "The total tips staff recorded, not counted as income"],
            ],
          },
        },
        { img: { src: shot("income-management-totals"), alt: "The top of Income management with the boxes Total collected €115.00, Approved €45.00, Waiting €70.00 and Not approved outlined in gold, and Tips €0.00 below" } },
        { p: "Each report shows the client, the service, the staff member, the amount collected by each method and the “Due” amount. Compare the two, and if they match, press “Approve”. The amount moves from “Waiting” to “Approved”." },
        {
          table: {
            head: ["Button", "When to use it"],
            rows: [
              ["“Approve”", "The reported amount matches the amount due and the money you actually received"],
              ["“Don't approve”", "The amount is wrong. The report goes back to the staff member to update"],
              ["“Approve all … waiting”", "You have looked through everything and all waiting reports are correct"],
            ],
          },
        },
        { img: { src: shot("dont-approve-report"), alt: "A report Waiting for approval with the Don't approve button outlined in gold, next to Update report and the green Approve button", caption: "“Don't approve” sends the report back to the staff member to correct." } },
        { note: "Approving everything at once is handy at closing time, but only after you have counted the cash and checked the account. Approval is the owner's confirmation that the number is right.", kind: "tip", title: "Count first, approve second" },
      ],
    },
    {
      id: "revenue-by-staff",
      title: "Revenue per staff member and working out commission",
      blocks: [
        { p: "The “By staff member” section lists each person with their number of reports and the total they took in the chosen period. This is the number many owners need most, because in many nail salons a technician's pay is linked to the revenue they bring in." },
        { img: { src: shot("income-by-staff-member"), alt: "The By staff member section outlined in gold with Léa at €70.00 and Emma at €45.00, one report each, and the Remind staff to report card below" } },
        { p: "The lesson does not show any automatic pay or commission calculation. What this page gives you is a reliable base figure: the total each person took in the period, once you have checked and approved the reports. You then apply whatever split the salon and the technician agreed. Tips are not part of this figure, because they are recorded separately." },
        { p: "The figure is only right when every booking is reported, so turn on “Remind staff to report”. When it is on and a booking ended more than 24 hours ago without a report, the app reminds the staff member." },
        { p: "To take the numbers into a spreadsheet for pay or for your accountant, you can download the income table as an Excel file from “Income management”, with a total row under each staff member. The lesson on [Excel export](lesson:xuat-excel) shows how." },
      ],
    },
    {
      id: "common-situations",
      title: "Common situations when tracking revenue per technician",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["The client paid part in cash, part by card", "The staff member enters two amounts in two boxes. “Total collected” adds them up"],
              ["The client already paid online", "Enter it under “Paid online in advance”"],
              ["The client left a tip", "Enter it under “Tip”, not in the payment boxes"],
              ["The report does not match the money received", "The owner presses “Don't approve” so the staff member corrects it"],
              ["Staff keep forgetting to report", "Turn on “Remind staff to report”"],
              ["You need proof of a transfer", "The staff member photographs the receipt and attaches it to the report"],
            ],
          },
        },
        { p: "Income reports and checkout at the counter are two different jobs on the same booking. Checkout records the payment and issues the client's invoice; see the guide to [salon checkout software](lesson:thanh-toan-hoa-don). The income report is the technician's confirmation to the owner of the money they handled. For staff to open their bookings and send reports, each person needs a login with the right access, as described in the guide to [salon staff management](lesson:nhan-vien)." },
        { p: "Both start from the calendar, so if the salon is not yet used to working from it every day, read the guide to the [salon appointment calendar](lesson:lich-hen) first. The big picture of the salon over time is on the [Overview](lesson:tong-quan) page." },
      ],
    },
  ],
  howTo: {
    title: "Steps to report and approve revenue per staff member on VaraaAi",
    id: "report-and-approve-steps",
    after: "why-report-after-each-client",
    lead: "The first three steps are the staff member's job after each client. The last three are the owner's, in the order of the lesson video.",
    steps: [
      {
        name: "Staff open the booking and press “Report income”",
        text: "When the client is finished, the staff member opens that booking on the “Bookings” page and presses “Report income”. The report opens with the amount due for the booking at the top. Because the report belongs to that booking, it is easy to check.",
        image: { src: shot("report-income-button-in-booking"), alt: "Booking details with €70.00 to collect and the gold Report income button outlined, next to the line Enter what you collected from this customer" },
      },
      {
        name: "Enter what the client paid in the right box",
        text: "Enter the amount in the matching box: cash, bank or card, or MobilePay. Press “Fill in” to enter the full amount at once. Paid online in advance or by gift card have their own boxes too. Check that “Total collected” says it matches the amount due.",
        image: { src: shot("total-collected-matches-amount-due"), alt: "The Total collected line at €70.00 with Matches the amount due, below the Gift card 2 box and above the Tip box" },
      },
      {
        name: "Add the “Tip”, a note, then press “Send report”",
        text: "If the client left a tip, enter it under “Tip”. A note and a photo of the receipt can be added too. Then press “Send report”. The report now waits for the owner's approval.",
        image: { src: shot("send-income-report"), alt: "The end of the income report with Total collected, the Tip and Note boxes, and the gold Send report button outlined next to Close" },
      },
      {
        name: "The owner opens “Income management”",
        text: "Tap “Income management”. At the top are the total collected, what is approved, what is waiting and the tips. Below is each report your staff have sent.",
      },
      {
        name: "Compare, then press “Approve” or “Don't approve”",
        text: "Compare the amount in each report with the amount due, then press “Approve”. If the amount is wrong, press “Don't approve” so the staff member can fix it. To go faster, press the approve-all button. Once approved, the amount moves to “Approved”.",
        image: { src: shot("compare-report-with-amount-due"), alt: "A report Waiting for approval outlined in gold, showing Sofia Rossi, Relax massage, cash payment €70.00, Due €70.00 and the Approve and Don't approve buttons" },
      },
      {
        name: "Check “By staff member” and turn on “Remind staff to report”",
        text: "Scroll down to “By staff member” to see how much each person took in the period. Just below, turn on “Remind staff to report”: when a booking ended over 24 hours ago with no report, the app reminds the staff member.",
        image: { src: shot("remind-staff-to-report"), alt: "The Remind staff to report card outlined in gold with its switch off and the note about bookings that ended over 24 hours ago without a report" },
      },
    ],
  },
  faq: [
    {
      q: "Where do staff report the money they took?",
      a: "They open the client's booking on the “Bookings” page and press “Report income”. The report is tied to that booking, so the owner can easily compare it with the amount due.",
    },
    {
      q: "Are tips added to the salon's income?",
      a: "No. Tips belong to the staff member and are not added to the salon's income. They are only recorded for the monthly tip total.",
    },
    {
      q: "What does the owner do if the amount in a report is wrong?",
      a: "Press “Don't approve” on that report. A report that is not approved goes back to the staff member to update, and then you check it again and approve.",
    },
    {
      q: "How do I see how much each technician took this month?",
      a: "Open “Income management” and look at “By staff member”. It shows how much each person took in the chosen period, with their number of reports.",
    },
    {
      q: "How do staff report a client who paid half cash, half card?",
      a: "They enter each amount in its own box, the cash part under “Cash payment” and the rest under “Bank / card payment”. “Total collected” adds them up and says when they match the amount due.",
    },
    {
      q: "What if staff forget to report?",
      a: "Turn on “Remind staff to report” in “Income management”. When it is on and a booking ended over 24 hours ago without a report, the app reminds the staff member.",
    },
  ],
  related: ["thanh-toan-hoa-don", "lich-hen", "xuat-excel", "nhan-vien"],
};

export default article;
