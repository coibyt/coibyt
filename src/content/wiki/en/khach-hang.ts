import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/khach-hang/${name}.webp`;
const shot = (name: string) => `/wiki/khach-hang/en/${name}.webp`;

const article: WikiArticle = {
  locale: "en",
  slug: "salon-client-management-customer-book",
  lesson: "khach-hang",
  category: "salon",
  title: "Salon client management with a customer book: groups, private notes and each client's history",
  metaTitle: "Salon client management: customer book, VIPs and notes",
  metaDescription:
    "How to use the VaraaAi customer book in a nail, hair, lash or spa salon: read the key numbers, filter VIPs, regulars and lapsed clients, and keep private notes.",
  keyword: "salon client management",
  keywords: [
    "salon customer database",
    "salon client records",
    "client notes for allergies and preferences",
    "find clients who haven't been back",
    "salon client retention rate",
    "client booking history",
    "nail salon client list",
  ],
  excerpt: "The customer book builds itself from your bookings. Filter by six groups, export or email the right group, and open each client's profile for history and notes.",
  published: "2026-11-27",
  updated: "2026-11-27",
  hero: {
    src: img("hai-nguoi-phu-nu-om-chao-nhau-trong-salon"),
    alt: "Two smiling women hug in greeting in a bright salon, while two clients sit on chairs behind them holding cups of coffee",
  },
  takeaways: [
    "The customer book **builds itself from your salon's bookings**. There is nothing to type in by hand.",
    "The key numbers at the top: customers, new in 30 days, the **return rate** and average spend per customer.",
    "Six groups to filter by: “All”, “VIP”, “Regulars”, “New”, “Booked ahead” and “Haven't been back”.",
    "The **“Private note”** is for the salon only. The customer never sees it.",
    "The “Haven't been back” group plus the “Email this group” button is the quickest way to invite lapsed clients back.",
  ],
  intro: [
    "Salon client management starts with three everyday questions: who your regulars are, who has not been back for a while, and who spends the most. In a small salon the answers usually live in the owner's head, and a memory cannot be handed over to a new stylist. The VaraaAi customer book records those answers from the salon's own bookings.",
    "This guide follows the VaraaAi Academy lesson “Customer book”. You will learn to read the numbers at the top of the page, filter the group of clients you need, open one client's profile and decide what belongs in the private note.",
  ],
  sections: [
    {
      id: "builds-itself",
      title: "A salon customer database you do not have to type in",
      blocks: [
        { p: "A paper book at the front desk has two weaknesses. It is only complete if someone takes the time to write in it, and it cannot count how many times a client has visited. A home-made spreadsheet is better, but someone still has to update it after every working day." },
        { p: "The customer book in the VaraaAi business dashboard is built from bookings. Every client who has booked at the salon appears in it, along with what those bookings recorded about them. Your job is to keep the calendar true to what happened, as described in the guide to the [appointment calendar](lesson:lich-hen): when a client comes, the booking is completed, and when a client cancels, the booking is cancelled." },
        { p: "The line under the page title states what the book is for: knowing who your customers are, how often they come back, what they love, and who has not been in for a while." },
      ],
    },
    {
      id: "key-numbers",
      title: "The key numbers: customers, new clients, return rate and average spend",
      blocks: [
        { p: "The top of the “Customers” page is a set of number tiles. They give you a quick picture of how the salon is doing before you look at any individual client." },
        { img: { src: shot("customer-book-key-numbers"), alt: "The number tiles of the customer book outlined in gold: Customers, New, 30 days, Return rate, Avg. spend per customer and Haven't been back", caption: "The key numbers sit just below the title “Your salon's customer book”." } },
        {
          table: {
            head: ["Number", "What it tells you"],
            rows: [
              ["“Customers”", "How many people are in the salon's book"],
              ["“New, 30 days”", "How many new clients the salon gained in the last 30 days"],
              ["“Return rate”", "Whether clients who came have come back"],
              ["Average spend per customer", "How much one client spends at the salon on average"],
              ["“Haven't been back”", "How many clients are currently in that group"],
            ],
          },
        },
        { p: "Read the numbers side by side. Plenty of new clients with a low return rate means the salon attracts people but does not yet keep them, so the work lies in the experience in the chair or in inviting clients back. A good return rate with few new clients means time spent on promotion will pay off." },
      ],
    },
    {
      id: "six-groups",
      title: "Six client groups: VIP, regulars, new and clients who haven't been back",
      blocks: [
        { p: "Below the numbers is a row of group buttons. Tap a group and the list below shows only the clients in it. Each group answers a different question an owner asks:" },
        {
          table: {
            head: ["Group", "Use it when you want to"],
            rows: [
              ["“All”", "See the whole book, or download the full list"],
              ["“VIP”", "Know your most important clients so you can look after them personally"],
              ["“Regulars”", "Spot the people who come steadily, the group worth thanking and keeping"],
              ["“New”", "Follow first-time clients and see whether they book a second time"],
              ["“Booked ahead”", "See in advance who is coming in soon"],
              ["“Haven't been back”", "Find clients who have stayed away and invite them back"],
            ],
          },
        },
        { p: "The lesson does not say how many visits or how much spend puts a client in “VIP” or “Regulars”. You do not sort anyone yourself: the book is built from bookings, and the small number next to each group name shows how many clients it holds right now." },
        { p: "When you need one particular person, the search box is faster than filtering. Type the client's name, email or phone number." },
        { img: { src: shot("search-customers-by-name-email-or-phone"), alt: "The search box Search by name, email or phone outlined in gold below the group buttons All, VIP and Regulars, with the Export and Email buttons underneath", caption: "When a client phones, type their name or number here to find their profile." } },
      ],
    },
    {
      id: "private-note",
      title: "Client notes: what to write in the “Private note”",
      blocks: [
        { p: "Each client's profile has a pale yellow box called “Private note”. The line just under the title makes the rule plain: only your salon sees it, never the customer. This box is what turns a list of names into a record that is useful to the person doing the treatment." },
        { p: "The lesson suggests three kinds of information: allergies, preferences and booking habits. The example text in the empty box reads like a real note: allergic to acetone, loves nude shades, usually books Saturday afternoons." },
        {
          ul: [
            "**Allergies and things to avoid.** This is the most important kind of note, because it protects the client at the next appointment, even when a different technician does it. The guide to [allergies to gel polish, lash glue and hair dye](lesson:di-ung-hoa-chat) explains why it has to be written down.",
            "**Preferences.** The colour they usually choose, their usual nail shape, the lash curl they like, the drink they prefer. Clients notice when they are remembered without having to repeat themselves.",
            "**Booking habits.** For example, a client who is only free at weekends. Knowing this, you can hold that slot for them or send an invitation at the right moment.",
          ],
        },
        { note: "Write short, factual notes, as if a new colleague will read them in ten seconds before the client sits down. Avoid personal opinions about the client: the note exists to serve them better.", kind: "tip", title: "Write for the next colleague" },
      ],
    },
    {
      id: "win-back",
      title: "Find clients who haven't been back and invite them again",
      blocks: [
        { p: "Keeping an existing client is usually easier than finding a new one, because they already know the way to your door and have been happy before. The “Haven't been back” group gathers those people for you." },
        { p: "Just below the search box are two buttons, and both work on **the group you are viewing**:" },
        {
          ul: [
            "**“Export to Excel (CSV)”** downloads the list of the group you are viewing. The file is covered in the guide to [exporting revenue and client lists to Excel](lesson:xuat-excel).",
            "**“Email this group”** sends an offer to exactly that group. Writing the message is covered in the guide to [promotional emails](lesson:email-marketing).",
          ],
        },
        { img: { src: shot("email-this-group-button"), alt: "The gold Email this group button outlined in gold, below the Export to Excel (CSV) button and above the client list", caption: "Choose the group first, then press “Email this group”." } },
        { p: "A come-back offer only suits people who have stayed away. Send it to the whole book and a client who came last week receives it too, and may wonder why they paid full price. So choose the group before you press. To give clients a steady reason to return, see the guide to the [loyalty card](lesson:the-tich-diem)." },
      ],
    },
    {
      id: "everyday-situations",
      title: "Everyday situations with the customer book",
      blocks: [
        {
          table: {
            head: ["Situation", "What to do"],
            rows: [
              ["A client phones and you cannot remember what they had last time", "Type their name or number in the search box, open the profile and check “Favourite service” and “Booking history”"],
              ["A new stylist is about to see a regular client", "Open the client's profile and read the “Private note” and “Usual staff” before the client arrives"],
              ["You want to send an offer but worry about reaching the wrong people", "Tap the right group first, check the list below, then press “Email this group”"],
              ["The book still has few clients", "It fills up with bookings. Put the salon's appointments into the system and the book grows by itself"],
            ],
          },
        },
        { p: "The customer book does not replace recognising faces and asking clients how they are. It lets the whole salon remember the same things, and keeps that knowledge in place when a stylist leaves or when the salon gets so busy that the owner no longer stands at the desk." },
      ],
    },
  ],
  howTo: {
    title: "Steps to use the customer book for salon client management",
    id: "customer-book-steps",
    after: "key-numbers",
    lead: "The seven steps go from the top to the bottom of the “Customers” page, then into one client's profile.",
    steps: [
      {
        name: "Open “Customers”",
        text: "In the business dashboard, tap “Customers” in the menu. The page “Your salon's customer book” opens with the key numbers at the top: customers, new in 30 days, the return rate and average spend per customer.",
        image: { src: shot("open-customers-your-salons-customer-book"), alt: "The business dashboard menu with the Customers tab outlined in gold, and below it the heading Your salon's customer book with the first number tiles" },
      },
      {
        name: "Filter by group or search for one client",
        text: "Tap one of the groups “All”, “VIP”, “Regulars”, “New”, “Booked ahead” or “Haven't been back” to filter the list. To find one person, type their name, email or phone number in the search box.",
        image: { src: shot("filter-customers-by-group-all-vip-regulars"), alt: "The group buttons All, VIP and Regulars outlined in gold, with All selected and showing the number 4, above the search box and the client list" },
      },
      {
        name: "Export or email the group you are viewing",
        text: "Press “Export to Excel (CSV)” to download the list of the group on screen. Press “Email this group” when you want to send an offer to that group. Both buttons follow the selected group, so filter first.",
      },
      {
        name: "Tap a client to open their profile",
        text: "In the list, tap a client's row. Each row already shows the name, phone number or email, number of visits and amount spent. The full profile opens when you tap it.",
        image: { src: shot("tap-a-customer-to-open-profile"), alt: "The client list with Anna Müller's row outlined in gold, each client showing a phone number, number of visits and amount spent" },
      },
      {
        name: "Read the numbers in the profile",
        text: "The profile starts with the client's name and phone number, then number tiles including “Completed visits” and “Total spent”. Below are “Favourite service” and “Usual staff”. Read this before the client arrives to know what they usually have and with whom.",
        image: { src: shot("customer-profile-completed-visits-total-spent"), alt: "Anna Müller's profile with the tiles Completed visits, Total spent, Average per visit and Cancelled or no-show outlined in gold, and her favourite service and usual staff below" },
      },
      {
        name: "Write a “Private note”",
        text: "Scroll down to the “Private note” and write what the whole salon should remember about this client, such as an allergy or a favourite colour. Only the salon sees this note. The client never does.",
        image: { src: shot("private-note-only-your-salon-sees"), alt: "The pale yellow Private note box outlined in gold in a client's profile, with example text about an acetone allergy and nude shades, and the booking history below" },
      },
      {
        name: "Check the “Booking history”",
        text: "At the bottom of the profile is the client's “Booking history”. Each booking shows the service, date, staff member and amount. When a client asks for exactly what they had last time, the answer is here.",
        image: { src: shot("customer-booking-history"), alt: "The Booking history section outlined in gold in a client's profile, with a completed Classic lashes booking for €80.00 with Sofia" },
      },
    ],
  },
  faq: [
    {
      q: "Do I have to type my client list into the customer book?",
      a: "No. The VaraaAi customer book builds itself from the salon's bookings. Every client who has a booking at the salon appears in it without any manual entry.",
    },
    {
      q: "Can clients see the notes the salon writes about them?",
      a: "No. The “Private note” is seen only by the salon, never by the customer. Use it for allergies, preferences and booking habits.",
    },
    {
      q: "How do I find clients who have not been back for a long time?",
      a: "On the “Customers” page, tap the group “Haven't been back”. The list then shows only clients who have stayed away. Press “Email this group” to send them an offer inviting them back.",
    },
    {
      q: "Which client groups does the customer book have?",
      a: "There are six: “All”, “VIP”, “Regulars”, “New”, “Booked ahead” and “Haven't been back”. Tap a group to filter the client list.",
    },
    {
      q: "What does a client's profile show?",
      a: "It shows completed visits, total spent, favourite service and usual staff member. Below are the salon's “Private note” and the client's “Booking history”.",
    },
    {
      q: "How do I download my salon's client list?",
      a: "Choose the group you want and press “Export to Excel (CSV)”. The file contains the group you are viewing, so choose “All” if you want the full list.",
    },
  ],
  related: ["xuat-excel", "lich-hen", "email-marketing", "the-tich-diem"],
};

export default article;
