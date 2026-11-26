import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/xuat-excel/${name}.webp`;
const shot = (name: string) => `/wiki/xuat-excel/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "export-salon-sales-to-excel",
  lesson: "xuat-excel",
  category: "salon",
  title: "Export salon sales to Excel: download your income sheet, client list and orders",
  metaTitle: "Export salon sales to Excel, plus client list and orders",
  metaDescription:
    "How to download your salon's income sheet, client list and product orders from VaraaAi as Excel files for your accountant, and how to keep client details private.",
  keyword: "export salon sales to Excel",
  keywords: [
    "salon income report in Excel",
    "export client list to Excel",
    "export orders to CSV",
    "send salon figures to the accountant",
    "sales by staff member in Excel",
    "what is in a salon income spreadsheet",
  ],
  excerpt: "Three download buttons live in three places: Income management, Customers and Orders. Pick the right period and group first, because the file contains exactly what you are viewing.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("chu-salon-va-khach-ben-quay-da-cam-thach"),
    alt: "A man in a jacket and a woman in a white blouse laugh together at a marble counter with a large vase of flowers, her phone in her hand",
  },
  takeaways: [
    "Income is downloaded in “Income management”: choose the period, press **“Spreadsheet”**, then press **“Download (Excel)”**.",
    "The income file has **one row per booking**, with cash, bank, MobilePay, gift card and tips in separate columns, and a totals row under each staff member.",
    "The client file contains **exactly the group you have selected**. To download everyone, choose “All” before pressing “Export to Excel (CSV)”.",
    "The “Orders” page also has an “Export to Excel (CSV)” button once the salon has product orders.",
    "These files contain clients' names and phone numbers. **Send them only to people who really need them**, such as your accountant.",
  ],
  intro: [
    "At the end of the month, salon owners usually need to export salon sales to Excel for one of two reasons: the accountant is asking for figures, or you want to do your own calculations your own way. In VaraaAi, income, the client list and orders can all be downloaded, and the files open straight away in Excel.",
    "This guide follows the VaraaAi Academy lesson “Excel exports: income, customers, orders”. By the end you will know where the three download buttons are, what each file contains and what to choose before you press, so the file holds exactly what you need.",
  ],
  sections: [
    {
      id: "why-export",
      title: "When you need your salon's figures on your own computer",
      blocks: [
        { p: "The business dashboard already shows income and clients on screen. But there are jobs the screen cannot do for you." },
        {
          ul: [
            "**Sending figures to your accountant at month end.** The accountant does not need a login to your salon. They need a file with every payment, split by how the client paid.",
            "**Doing your own calculations.** In Excel you can add columns, filter and total things your way, which a fixed report page does not allow.",
            "**Keeping a copy of each period.** Download the income sheet once a month and store it in a folder, so it is there when you need to check something later.",
          ],
        },
        { p: "The file is only as accurate as the figures in the system. Income comes from the reports staff submit for each booking, as described in the guide to [staff income reports](lesson:doanh-thu-nhan-vien). So review that period's reports before you download and send the sheet." },
      ],
    },
    {
      id: "three-files",
      title: "Three files you can download: income, client list and orders",
      blocks: [
        { p: "Each kind of data lives on its own page of the dashboard and has its own download button:" },
        {
          table: {
            head: ["Data", "Where to go, what to press", "What the file contains"],
            rows: [
              ["Income", "“Income management”, choose the period, press “Spreadsheet”, then “Download (Excel)”", "One row per booking, a totals row under each staff member"],
              ["Clients", "“Customers”, choose the group, then “Export to Excel (CSV)”", "Name, phone number, number of visits and amount spent for the selected group"],
              ["Orders", "“Orders”, then “Export to Excel (CSV)”", "The salon's product orders"],
            ],
          },
        },
        { note: "The buttons on the “Customers” and “Orders” pages say “Export to Excel (CSV)”. CSV is a simple table format that Excel and other spreadsheet programs open without trouble.", kind: "info", title: "What CSV means" },
      ],
    },
    {
      id: "income-file-contents",
      title: "What is in a salon income spreadsheet",
      blocks: [
        { p: "You see the table on screen before you download it. The “Spreadsheet” view groups bookings by staff member: the name at the top, then one row per booking with the date and time, client and service, and finally a “Total” row. A small line above the table reminds you that you can tap a row to see that day's bookings." },
        { img: { src: shot("income-spreadsheet-by-staff-member"), alt: "The income spreadsheet for the staff member Emma with the columns Date, Customer and Service, one Gel manicure booking and the Total row outlined in gold", caption: "The “Spreadsheet” view: one block per staff member, one row per booking, a “Total” row at the end of each block." } },
        { p: "The downloaded Excel file keeps that structure and adds what the accountant needs most: the amounts split by how the client paid." },
        {
          table: {
            head: ["In the file", "What it is for"],
            rows: [
              ["One row per booking", "Matching every payment against your books or bank statement"],
              ["Cash, bank, MobilePay and gift card in separate columns", "Knowing what is in the till and what has reached the account"],
              ["Tips in a separate column", "Adding up each person's tips at the end of the month"],
              ["A totals row under each staff member", "Seeing how much each person took in the period"],
            ],
          },
        },
        { p: "The payment method in the file is the one chosen when the client paid. If the wrong method is picked at the counter, the file is wrong too, so the payment step in the guide to [taking payment and invoices at the counter](lesson:thanh-toan-hoa-don) deserves care." },
      ],
    },
    {
      id: "export-client-list",
      title: "Export your client list to Excel: choose the group first",
      blocks: [
        { p: "This is the easiest place to go wrong. The “Export to Excel (CSV)” button on the “Customers” page does not download every client by default. It downloads **exactly the group you have selected** in the row of buttons above, such as “All”, “New” or “Haven't been back”." },
        { p: "That is handy when you only need one group. Select “Haven't been back” and export, and you have a list of the clients worth inviting back. Each row in the file has the name, phone number, number of visits and amount spent." },
        { p: "The client groups are explained in more detail in the guide to the [customer book](lesson:khach-hang). If your goal is to send a group an offer, you do not need the file at all: next to the export button is “Email this group”, and the guide to [promotional emails](lesson:email-marketing) covers writing the message." },
        { note: "Before you press export, look at the group buttons once more. The highlighted group is the one that ends up in the file. For every client, tap “All” first.", kind: "tip", title: "Check the selected group" },
      ],
    },
    {
      id: "keep-files-private",
      title: "Keep files with client details private",
      blocks: [
        { p: "Inside the dashboard, the data sits behind the salon's login. Once downloaded, the file loses that protection: anyone who has the file can read the clients' names and phone numbers." },
        { note: "These files contain client details. Send them only to people who really need them, such as your accountant. Do not post them on social media or send them to clients.", kind: "warn", title: "The lesson's reminder" },
        { p: "A few habits follow from that reminder:" },
        {
          ul: [
            "If the accountant only needs the income sheet, send only the income sheet, not the client list as well.",
            "Send the file to one named recipient, not into the salon's group chat.",
            "If you download on a shared salon computer, delete the file from the downloads folder when you are done.",
          ],
        },
      ],
    },
    {
      id: "everyday-situations",
      title: "Common situations when exporting to Excel",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["You cannot find “Download (Excel)”", "It is in “Income management”, in the same row as “Spreadsheet” and “List”, below the period buttons"],
              ["The income file is missing the first days of the month", "Check the selected period, for example “This month”, and download again"],
              ["The client file has fewer people than you expected", "A small group is selected. Tap “All” and export again"],
              ["There is nothing to export on the “Orders” page", "The orders file only has content once the salon has product orders"],
            ],
          },
        },
        { img: { src: shot("orders-export-to-excel-csv"), alt: "The Product orders page with the Export to Excel (CSV) button outlined in gold below the search box and above a confirmed order of €18.00", caption: "On the “Orders” page, “Export to Excel (CSV)” sits just below the search box, above the list of orders." } },
        { p: "If the salon does not sell products yet, you do not need the third file. When you want to open a small shop on your salon page, the guide to [selling products and managing orders](lesson:san-pham-don-hang) shows how to add products and handle each order." },
      ],
    },
  ],
  howTo: {
    title: "Steps to export salon sales to Excel, with the client list and orders",
    id: "excel-export-steps",
    after: "three-files",
    lead: "The six steps go through three pages of the dashboard in turn, in the order of the lesson video.",
    steps: [
      {
        name: "Open “Income management” and choose the period",
        text: "In the business dashboard, tap “Income management”. In the top row of buttons, choose the period you need, for example “This month”. The file will contain only bookings in that period, so choose it before the next step.",
        image: { src: shot("choose-period-this-month"), alt: "The Income management page with the This month button outlined in gold in the row Today, 7 days, This month and Last month" },
      },
      {
        name: "Press “Spreadsheet”",
        text: "Press “Spreadsheet”. The screen switches to a table with each booking listed under its staff member and a totals row. Take a quick look to make sure the period's figures are complete.",
        image: { src: shot("press-spreadsheet"), alt: "The buttons Download (Excel), Spreadsheet and List in Income management, with Spreadsheet outlined in gold" },
      },
      {
        name: "Press “Download (Excel)”",
        text: "Press “Download (Excel)”, just to the left of “Spreadsheet”. The file downloads straight away and opens in Excel. Each booking is one row, and each staff member has a totals row underneath.",
        image: { src: shot("download-excel-button"), alt: "The Download (Excel) button outlined in gold above the income table of the staff member Emma with one Gel manicure booking" },
      },
      {
        name: "Open “Customers” and choose the group",
        text: "Tap “Customers”. In the row of group buttons, tap the group you want to download, such as “All”, “New” or “Haven't been back”. The file will contain exactly this group, so do not skip this step.",
        image: { src: shot("choose-customer-group-before-export"), alt: "The Customers page with the group buttons All, VIP and Regulars outlined in gold, and the search box and Export to Excel (CSV) button below" },
      },
      {
        name: "Press “Export to Excel (CSV)”",
        text: "Press “Export to Excel (CSV)” below the search box. The downloaded list has the name, phone number, number of visits and amount spent for every client in the selected group.",
        image: { src: shot("customers-export-to-excel-csv"), alt: "The Export to Excel (CSV) button outlined in gold on the Customers page, just above the gold Email this group button" },
      },
      {
        name: "Open “Orders” and press “Export to Excel (CSV)”",
        text: "Once the salon has product orders, tap “Orders” to open “Product orders”. Scroll down to the search box and press “Export to Excel (CSV)” just below it to download the list of orders.",
        image: { src: shot("product-orders-page"), alt: "The Product orders page with the Orders tab selected in the menu between Products and Stock, and the 30 days period and To handle tile below" },
      },
    ],
  },
  faq: [
    {
      q: "Where is the button to download income to Excel in VaraaAi?",
      a: "The “Download (Excel)” button is in “Income management”. Choose the period, press “Spreadsheet” to see each booking per staff member, then press “Download (Excel)” to download the file.",
    },
    {
      q: "What does the salon income Excel file contain?",
      a: "Each booking is one row. Amounts are split into cash, bank, MobilePay, gift card and tips. Each staff member has a totals row underneath.",
    },
    {
      q: "Which clients are in the exported client list?",
      a: "Exactly the group you have selected on the “Customers” page when you press “Export to Excel (CSV)”. To download every client, choose the group “All” first.",
    },
    {
      q: "Which columns does the client list file have?",
      a: "It has each client's name, phone number, number of visits and amount spent. Because it holds contact details, the file needs to be kept private.",
    },
    {
      q: "Can I export my product orders?",
      a: "Yes. Once the salon has product orders, open “Orders” and press “Export to Excel (CSV)” to download the list of orders.",
    },
    {
      q: "Who should I send the salon's Excel files to?",
      a: "Only to people who really need them, such as your accountant. The files contain clients' names and phone numbers, so do not post them on social media or share them widely.",
    },
  ],
  related: ["doanh-thu-nhan-vien", "khach-hang", "thanh-toan-hoa-don", "san-pham-don-hang"],
};

export default article;
