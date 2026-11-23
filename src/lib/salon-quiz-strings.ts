/** Copy for the salon quiz (/salon-quiz) in Vietnamese, English and Finnish;
 * other languages fall back to English. The flow itself (order, kinds of
 * question, scoring) lives in src/lib/salon-quiz.ts. `{n}` and `{name}` are
 * filled in by the page. */
const vi = {
  meta: {
    title: "Trắc nghiệm salon 2 phút — Salon của bạn đang để lọt bao nhiêu khách?",
    description:
      "12 câu hỏi nhanh cho chủ salon nail, tóc, mi, spa. Nhận ngay kế hoạch riêng: việc nào nên làm trước để kín lịch hơn, bớt khách quên hẹn và bớt nhắn tin. Miễn phí, không cần email.",
  },
  ui: {
    start: "Bắt đầu",
    startNote: "2 phút",
    trust: ["Miễn phí", "Không cần email", "Có kết quả ngay"],
    next: "Tiếp tục",
    skip: "Bỏ qua câu này",
    back: "Quay lại",
    pickAll: "Chọn tất cả ý đúng với bạn",
    sections: ["Salon của bạn", "Điều làm bạn mệt", "Mục tiêu"],
    part: "Phần {n}/3",
    listen: "Nghe giới thiệu",
    listenStop: "Dừng",
    scaleSub: "Câu này đúng với bạn tới mức nào?",
    scaleLow: "Không đúng",
    scaleHigh: "Rất đúng",
    optional: "không bắt buộc",
    before: "Trước",
    beforeBody: "Sổ giấy, tin nhắn lúc 23 giờ",
    after: "Sau",
    afterBody: "Khách tự đặt, lịch tự nhắc",
    mockTitle: "Lịch hẹn mới",
    mockBody: "Anna · Sơn gel · 14:00",
    plus: "{n}+",
  },
  intro: {
    eyebrow: "Dành cho chủ salon",
    title: "Salon của bạn đang để lọt",
    accent: "bao nhiêu khách?",
    sub: "Trả lời 12 câu hỏi nhanh. Bạn nhận một kế hoạch riêng cho salon: việc nào nên làm trước để kín lịch hơn và nhẹ đầu hơn.",
  },
  q: {
    type: {
      title: "Salon của bạn làm gì là chính?",
      options: { nail: "Nail", hair: "Tóc", lash: "Mi & mày", spa: "Spa & massage", barber: "Barber", skin: "Da & thẩm mỹ" },
    },
    team: {
      title: "Tiệm có bao nhiêu người làm?",
      options: { solo: "Chỉ mình tôi", small: "2–3 người", mid: "4–7 người", big: "8 người trở lên" },
    },
    channels: {
      title: "Hiện giờ khách đặt lịch bằng cách nào?",
      options: {
        phone: "Gọi điện",
        chat: "Nhắn Facebook, Instagram, WhatsApp",
        walkin: "Ghé tiệm hỏi trực tiếp",
        online: "Tự đặt trên trang đặt lịch",
        other: "Qua một ứng dụng khác",
      },
    },
    afterhours: {
      title: "10 giờ tối, một khách muốn đặt lịch. Chuyện gì xảy ra?",
      options: {
        wait: "Khách nhắn tin, sáng mai tôi trả lời",
        lost: "Khách không đặt được",
        online: "Khách tự đặt online, tôi không cần làm gì",
      },
      hints: {
        wait: "Trong lúc chờ bạn trả lời, khách có thể đã đặt tiệm khác. Trang đặt lịch 24/7 nhận khách thay bạn.",
        lost: "Buổi tối là lúc nhiều người rảnh tay để đặt lịch nhất. Trang đặt lịch 24/7 giữ lại những khách này.",
        online: "Tốt quá. Phần còn lại của kế hoạch sẽ tập trung vào nhắc lịch và giữ khách quen.",
      },
    },
    s_messages: { quote: "Tôi phải trả lời tin nhắn đặt lịch cả lúc đang làm khách lẫn buổi tối." },
    noshow: {
      title: "Mỗi tuần có bao nhiêu khách quên hẹn hoặc huỷ sát giờ?",
      sub: "Ước chừng thôi cũng được.",
      unit: "khách mỗi tuần",
    },
    s_noshow: { quote: "Mỗi lần khách không đến, tôi mất tiền mà không làm gì được." },
    returning: {
      title: "Bạn làm gì để khách quay lại?",
      options: {
        none: "Chưa làm gì, khách thích thì quay lại",
        manual: "Tôi tự nhắn từng khách",
        paper: "Có thẻ giấy tích điểm",
        program: "Có chương trình khách quen rõ ràng",
      },
    },
    s_ads: { quote: "Tôi muốn thêm khách mới nhưng không muốn đổ tiền vào quảng cáo." },
    goals: {
      title: "3 tháng tới, bạn muốn đạt điều gì nhất?",
      options: {
        full: "Kín lịch hơn",
        noshow: "Bớt khách quên hẹn",
        time: "Bớt thời gian nhắn tin, nghe máy",
        loyal: "Khách quen quay lại đều",
        website: "Có website riêng cho tiệm",
        manage: "Quản lý thợ và doanh thu gọn hơn",
      },
    },
    hours: {
      title: "Mỗi tuần bạn mất bao nhiêu giờ để nhận lịch, dời lịch, nhắc khách?",
      sub: "Tính cả tin nhắn và điện thoại.",
      unit: "giờ mỗi tuần",
    },
    tech: {
      title: "Bạn dùng phần mềm trên điện thoại có quen không?",
      options: { easy: "Quen, tôi tự làm được", ok: "Tạm được, cần chỉ một chút", hard: "Không rành lắm" },
      hints: {
        easy: "Vậy bạn sẽ xong phần cài đặt trong khoảng 5 phút.",
        ok: "Có hướng dẫn từng bước ngay trong lúc cài đặt, và trợ lý trả lời 24/7.",
        hard: "Không sao. Có video hướng dẫn tiếng Việt cho từng việc, và đội ngũ VaraaAi hỗ trợ khi bạn cần.",
      },
    },
    name: {
      title: "Tiệm của bạn tên gì?",
      sub: "Để ghi lên bản kế hoạch. Tên chỉ nằm trên máy của bạn.",
      placeholder: "VD: Lumi Nails & Beauty",
    },
  },
  info: {
    free: {
      eyebrow: "Bạn nên biết",
      title: "Một mình hay mười thợ, VaraaAi vẫn là 0 €",
      body: "Không giới hạn nhân viên, không giới hạn lượt đặt, không cần thẻ tín dụng. Mỗi thợ có ca làm và tài khoản riêng để tự xem lịch.",
    },
    night: {
      eyebrow: "Đặt lịch 24/7",
      title: "Tiệm đóng cửa, lịch vẫn tự đầy",
      body: "Khách tự chọn dịch vụ, thợ và giờ trống trên trang đặt lịch của bạn, rồi nhận xác nhận ngay. Gắn một link lên Facebook, Instagram và Google là xong.",
    },
    remind: {
      eyebrow: "Nhắc lịch tự động",
      title: "Khách được nhắc trước 24 giờ, 2 giờ và 15 phút",
      body: "Lời nhắc trước 24 giờ có sẵn nút Xác nhận và Huỷ. Ai chưa xác nhận hiện rõ trên lịch, để bạn kịp gọi hoặc nhận khách khác vào giờ đó.",
    },
    loyal: {
      eyebrow: "Giữ khách quen",
      title: "Khách cũ quay lại, và dẫn theo bạn bè",
      body: "Thẻ tích điểm bằng mã QR thay thẻ giấy. Sau buổi hẹn, hệ thống tự mời khách đánh giá. Khách giới thiệu bạn bè thì cả hai cùng có thưởng.",
    },
    easy: {
      eyebrow: "Dễ bắt đầu",
      title: "Sẵn sàng nhận khách sau 3 bước",
      body: "Đăng ký miễn phí, thêm dịch vụ và nhân viên, rồi dán link đặt lịch lên trang của tiệm. Có hướng dẫn từng bước và video cho từng việc.",
    },
  },
  loading: {
    title: "Đang ghép câu trả lời thành kế hoạch cho bạn",
    steps: ["Xem cách khách đang đặt lịch", "Tính số giờ và số ghế trống", "Xếp việc nên làm trước", "Hoàn tất bản kế hoạch"],
  },
  result: {
    eyebrow: "Kế hoạch riêng cho",
    fallbackName: "salon của bạn",
    scoreLabel: "Mức tự động hoá hiện tại",
    scoreNote: "Tính từ câu trả lời của bạn: cách nhận lịch, nhắc lịch và giữ khách.",
    bands: {
      low: { label: "Còn làm tay rất nhiều", body: "Phần lớn việc đặt lịch và nhắc khách đang dựa vào bạn. Đây cũng là lúc thay đổi cho kết quả rõ nhất." },
      mid: { label: "Đã có nền, còn lỗ hổng", body: "Một phần đã chạy tự động. Bịt những chỗ còn lại là lịch đều hơn hẳn." },
      high: { label: "Đang làm rất tốt", body: "Bạn đã tự động hoá phần lớn. Gom mọi thứ về một nơi để nhẹ việc hơn nữa." },
    },
    factsNote: "Theo con số bạn nhập",
    hours: "{n} giờ mỗi tháng",
    hoursBody: "đang dành cho việc nhận lịch, dời lịch và nhắc khách.",
    hoursZero: "Gần như không mất giờ nào",
    hoursZeroBody: "cho việc nhận lịch. Rất ít tiệm làm được vậy.",
    slots: "{n} ghế trống mỗi tháng",
    slotsBody: "vì khách quên hẹn hoặc huỷ sát giờ.",
    slotsZero: "Không ghế trống vì quên hẹn",
    slotsZeroBody: "Nhắc lịch tự động giúp giữ được như vậy khi tiệm đông hơn.",
    planTitle: "3 việc nên làm trước",
    planSub: "Xếp theo mức ảnh hưởng tới tiệm của bạn.",
    areas: {
      booking: {
        title: "Mở trang đặt lịch 24/7",
        why: {
          wait: "Bạn nói sau giờ đóng cửa khách phải chờ đến hôm sau mới có câu trả lời.",
          lost: "Bạn nói khi tiệm đóng cửa, khách không có cách nào đặt lịch.",
          online: "Bạn đã có đặt lịch online. Việc tiếp theo là gom mọi kênh về một lịch duy nhất để không sót, không trùng.",
        },
        how: ["Khách tự chọn dịch vụ, thợ, giờ trống và nhận xác nhận ngay", "Một link gắn lên Facebook, Instagram, Google", "Trợ lý AI trả lời giá và giờ trống khi bạn đang bận tay"],
      },
      noshow: {
        title: "Bật nhắc lịch và xác nhận hẹn",
        why: {
          some: "Bạn cho biết mỗi tuần khoảng {n} khách không đến.",
          none: "Khách của bạn ít quên hẹn. Nhắc lịch tự động giữ được điều đó mà bạn không phải nhắn tay.",
        },
        how: ["Tự nhắc trước 24 giờ, 2 giờ và 15 phút", "Khách bấm Xác nhận hoặc Huỷ ngay trong lời nhắc", "Ngày kín lịch có danh sách chờ để lấp giờ vừa trống"],
      },
      loyal: {
        title: "Biến khách mới thành khách quen",
        why: {
          none: "Bạn nói hiện chưa làm gì để khách quay lại.",
          manual: "Bạn đang tự nhắn từng khách. Việc này làm tự động được.",
          paper: "Thẻ giấy dễ mất và không nhắc được khách. Thẻ QR nằm sẵn trong điện thoại của họ.",
          program: "Bạn đã có chương trình khách quen. Đưa nó lên QR để khách tự theo dõi điểm.",
        },
        how: ["Thẻ tích điểm QR, đủ điểm là có ưu đãi", "Tự mời khách đánh giá sau buổi hẹn", "Khách giới thiệu bạn bè, cả hai cùng có thưởng"],
      },
      manage: {
        title: "Gom cả tiệm vào một màn hình",
        why: {
          solo: "Làm một mình thì mỗi phút lo giấy tờ là một phút không làm khách.",
          team: "Tiệm nhiều người thì lịch của từng thợ, ca làm và doanh thu cần nằm một chỗ.",
        },
        how: ["Lịch kéo thả cho từng thợ, xem theo ngày hoặc tuần", "Website riêng cho tiệm, có sẵn khi đăng ký", "Tính tiền, hoá đơn và doanh thu nhìn là hiểu"],
      },
    },
    scratchTitle: "Quà cho salon của bạn",
    scratchHint: "Cào lớp vàng để mở",
    scratchOpen: "Mở quà",
    giftBig: "0 €",
    giftSub: "mỗi tháng, trọn đời",
    giftPoints: ["Mọi tính năng trong kế hoạch này", "Không giới hạn nhân viên và lượt đặt", "Không cần thẻ tín dụng"],
    cta: "Đăng ký salon miễn phí",
    ctaNote: "5 phút · Không cần thẻ",
    ask: "Hỏi trước khi đăng ký",
    redo: "Làm lại trắc nghiệm",
    toolsTitle: "Chưa muốn đăng ký? Thử công cụ miễn phí",
    tools: { price: "Tạo bảng giá đa ngôn ngữ", poster: "Tạo poster QR đặt lịch", check: "Kiểm tra salon trên mạng" },
    chips: { hours: "{n} giờ/tuần", noshow: "{n} khách quên hẹn/tuần" },
  },
};

type Strings = typeof vi;

const en: Strings = {
  meta: {
    title: "2-minute salon quiz — how many clients is your salon letting slip?",
    description:
      "12 quick questions for owners of nail, hair, lash and spa salons. Get a plan of your own right away: what to do first for a fuller calendar, fewer no-shows and less messaging. Free, no email needed.",
  },
  ui: {
    start: "Start",
    startNote: "2 minutes",
    trust: ["Free", "No email needed", "Results right away"],
    next: "Continue",
    skip: "Skip this one",
    back: "Back",
    pickAll: "Pick everything that fits",
    sections: ["Your salon", "What wears you out", "Your goals"],
    part: "Part {n}/3",
    listen: "Listen to the intro",
    listenStop: "Stop",
    scaleSub: "How true is this for you?",
    scaleLow: "Not true",
    scaleHigh: "Very true",
    optional: "optional",
    before: "Before",
    beforeBody: "Paper diary, messages at 11 pm",
    after: "After",
    afterBody: "Clients book, reminders go out",
    mockTitle: "New booking",
    mockBody: "Anna · Gel polish · 14:00",
    plus: "{n}+",
  },
  intro: {
    eyebrow: "For salon owners",
    title: "How many clients is your salon",
    accent: "letting slip?",
    sub: "Answer 12 quick questions. You get a plan made for your salon: what to do first for a fuller calendar and a calmer day.",
  },
  q: {
    type: {
      title: "What does your salon mainly do?",
      options: { nail: "Nails", hair: "Hair", lash: "Lashes & brows", spa: "Spa & massage", barber: "Barber", skin: "Skin & aesthetics" },
    },
    team: {
      title: "How many people work in the salon?",
      options: { solo: "Just me", small: "2–3 people", mid: "4–7 people", big: "8 or more" },
    },
    channels: {
      title: "How do clients book with you today?",
      options: {
        phone: "By phone",
        chat: "Facebook, Instagram or WhatsApp messages",
        walkin: "They drop in and ask",
        online: "They book on a booking page",
        other: "Through another app",
      },
    },
    afterhours: {
      title: "It's 10 pm and a client wants to book. What happens?",
      options: {
        wait: "They message me, I answer in the morning",
        lost: "They can't book",
        online: "They book online, I do nothing",
      },
      hints: {
        wait: "While they wait for your answer, they may book somewhere else. A 24/7 booking page takes the booking for you.",
        lost: "Evenings are when many people finally have time to book. A 24/7 booking page keeps those clients.",
        online: "Great. The rest of your plan will focus on reminders and returning clients.",
      },
    },
    s_messages: { quote: "I answer booking messages while I'm with a client, and again in the evening." },
    noshow: {
      title: "How many clients a week forget their appointment or cancel at the last minute?",
      sub: "A rough guess is fine.",
      unit: "clients a week",
    },
    s_noshow: { quote: "Every time a client doesn't show up, I lose money and can't do anything about it." },
    returning: {
      title: "What do you do to bring clients back?",
      options: {
        none: "Nothing yet, they come back if they like",
        manual: "I message clients one by one",
        paper: "A paper stamp card",
        program: "A clear loyalty programme",
      },
    },
    s_ads: { quote: "I want more new clients, but I don't want to pour money into ads." },
    goals: {
      title: "In the next 3 months, what do you want most?",
      options: {
        full: "A fuller calendar",
        noshow: "Fewer no-shows",
        time: "Less time on messages and calls",
        loyal: "Regulars who keep coming back",
        website: "A website for the salon",
        manage: "Staff and revenue in order",
      },
    },
    hours: {
      title: "How many hours a week go into taking bookings, moving them and reminding clients?",
      sub: "Count messages and calls too.",
      unit: "hours a week",
    },
    tech: {
      title: "How comfortable are you with apps on your phone?",
      options: { easy: "Comfortable, I'll manage", ok: "Okay, with a little help", hard: "Not very" },
      hints: {
        easy: "Then setting up will take you about 5 minutes.",
        ok: "Setup walks you through each step, and the assistant answers 24/7.",
        hard: "No problem. There is a short video for every task, and the VaraaAi team helps when you need a person.",
      },
    },
    name: {
      title: "What is your salon called?",
      sub: "It goes on your plan. The name stays on your device.",
      placeholder: "E.g. Lumi Nails & Beauty",
    },
  },
  info: {
    free: {
      eyebrow: "Good to know",
      title: "One chair or ten, VaraaAi is still €0",
      body: "Unlimited staff, unlimited bookings, no credit card. Each staff member gets their own shifts and their own login to see their calendar.",
    },
    night: {
      eyebrow: "24/7 booking",
      title: "The salon is closed, the calendar keeps filling",
      body: "Clients pick the service, the staff member and a free time on your booking page, and get a confirmation at once. Put one link on Facebook, Instagram and Google and you're done.",
    },
    remind: {
      eyebrow: "Automatic reminders",
      title: "Clients are reminded 24 hours, 2 hours and 15 minutes before",
      body: "The 24-hour reminder has Confirm and Cancel buttons. Anyone who hasn't confirmed stands out on the calendar, so you can call them or give the time to someone else.",
    },
    loyal: {
      eyebrow: "Returning clients",
      title: "Clients come back, and bring a friend",
      body: "A QR loyalty card replaces the paper one. After the visit, the system asks for a review. When a client refers a friend, both get a reward.",
    },
    easy: {
      eyebrow: "Easy to start",
      title: "Ready for clients in 3 steps",
      body: "Sign up for free, add your services and staff, then put the booking link on your pages. There are step-by-step guides and a video for every task.",
    },
  },
  loading: {
    title: "Turning your answers into a plan",
    steps: ["Looking at how clients book today", "Adding up hours and empty chairs", "Putting first things first", "Finishing your plan"],
  },
  result: {
    eyebrow: "A plan made for",
    fallbackName: "your salon",
    scoreLabel: "How automated you are today",
    scoreNote: "Worked out from your answers: how you take bookings, remind clients and bring them back.",
    bands: {
      low: { label: "Still mostly by hand", body: "Most of the booking and reminding depends on you. That is also where a change shows the fastest." },
      mid: { label: "A good base, with gaps", body: "Part of it already runs by itself. Close the gaps and the calendar gets much steadier." },
      high: { label: "Doing very well", body: "You have automated most of it. Bring it all into one place and the day gets lighter still." },
    },
    factsNote: "From the numbers you gave",
    hours: "{n} hours a month",
    hoursBody: "go into taking bookings, moving them and reminding clients.",
    hoursZero: "Almost no hours lost",
    hoursZeroBody: "to taking bookings. Few salons manage that.",
    slots: "{n} empty chairs a month",
    slotsBody: "because clients forget or cancel at the last minute.",
    slotsZero: "No empty chairs from no-shows",
    slotsZeroBody: "Automatic reminders keep it that way as the salon gets busier.",
    planTitle: "3 things to do first",
    planSub: "In order of how much they matter for your salon.",
    areas: {
      booking: {
        title: "Open a 24/7 booking page",
        why: {
          wait: "You said that after closing, clients wait until the next day for an answer.",
          lost: "You said that when the salon is closed, clients have no way to book.",
          online: "You already take bookings online. Next, bring every channel into one calendar so nothing is missed or double-booked.",
        },
        how: ["Clients pick the service, staff and time, and get a confirmation at once", "One link for Facebook, Instagram and Google", "An AI assistant answers prices and free times while your hands are busy"],
      },
      noshow: {
        title: "Turn on reminders and confirmations",
        why: {
          some: "You said about {n} clients a week don't show up.",
          none: "Your clients rarely forget. Automatic reminders keep it that way without you sending a single message.",
        },
        how: ["Reminders 24 hours, 2 hours and 15 minutes before", "Clients tap Confirm or Cancel right in the reminder", "On full days, a wait list fills a time that has just opened up"],
      },
      loyal: {
        title: "Turn new clients into regulars",
        why: {
          none: "You said you don't yet do anything to bring clients back.",
          manual: "You message clients one by one. That can run by itself.",
          paper: "Paper cards get lost and can't remind anyone. A QR card is already in the client's phone.",
          program: "You already have a loyalty programme. Put it on QR so clients can follow their own points.",
        },
        how: ["A QR loyalty card with a reward when it's full", "Review invitations sent after each visit", "Clients refer friends, and both get a reward"],
      },
      manage: {
        title: "Run the whole salon from one screen",
        why: {
          solo: "When you work alone, every minute of admin is a minute away from a client.",
          team: "With a team, each person's calendar, shifts and the revenue need to live in one place.",
        },
        how: ["A drag-and-drop calendar per staff member, by day or week", "A website for the salon, ready when you sign up", "Checkout, invoices and revenue you can read at a glance"],
      },
    },
    scratchTitle: "A gift for your salon",
    scratchHint: "Scratch the gold to open",
    scratchOpen: "Open the gift",
    giftBig: "€0",
    giftSub: "a month, for good",
    giftPoints: ["Every feature in this plan", "Unlimited staff and bookings", "No credit card"],
    cta: "Sign up your salon for free",
    ctaNote: "5 minutes · No card",
    ask: "Ask before signing up",
    redo: "Take the quiz again",
    toolsTitle: "Not ready to sign up? Try a free tool",
    tools: { price: "Make a multilingual price list", poster: "Make a QR booking poster", check: "Check your salon online" },
    chips: { hours: "{n} h/week", noshow: "{n} no-shows/week" },
  },
};

const fi: Strings = {
  meta: {
    title: "2 minuutin salonkitesti — kuinka monta asiakasta salonkisi päästää ohi?",
    description:
      "12 nopeaa kysymystä kynsi-, hius-, ripsi- ja hoitolayrittäjille. Saat heti oman suunnitelman: mitä kannattaa tehdä ensin, jotta kalenteri täyttyy, peruutukset vähenevät ja viestittely kevenee. Maksuton, ei sähköpostia.",
  },
  ui: {
    start: "Aloita",
    startNote: "2 minuuttia",
    trust: ["Maksuton", "Ei sähköpostia", "Tulos heti"],
    next: "Jatka",
    skip: "Ohita tämä",
    back: "Takaisin",
    pickAll: "Valitse kaikki sopivat",
    sections: ["Salonkisi", "Mikä kuormittaa", "Tavoitteesi"],
    part: "Osa {n}/3",
    listen: "Kuuntele esittely",
    listenStop: "Pysäytä",
    scaleSub: "Kuinka hyvin tämä pitää paikkansa?",
    scaleLow: "Ei pidä",
    scaleHigh: "Pitää täysin",
    optional: "vapaaehtoinen",
    before: "Ennen",
    beforeBody: "Paperikalenteri, viestit klo 23",
    after: "Jälkeen",
    afterBody: "Asiakas varaa itse, muistutus lähtee",
    mockTitle: "Uusi varaus",
    mockBody: "Anna · Geelilakkaus · 14:00",
    plus: "{n}+",
  },
  intro: {
    eyebrow: "Salonkiyrittäjälle",
    title: "Kuinka monta asiakasta salonkisi",
    accent: "päästää ohi?",
    sub: "Vastaa 12 nopeaan kysymykseen. Saat salongillesi oman suunnitelman: mitä kannattaa tehdä ensin, jotta kalenteri täyttyy ja arki kevenee.",
  },
  q: {
    type: {
      title: "Mitä salonkisi pääasiassa tekee?",
      options: { nail: "Kynnet", hair: "Hiukset", lash: "Ripset ja kulmat", spa: "Spa ja hieronta", barber: "Parturi", skin: "Ihonhoito" },
    },
    team: {
      title: "Kuinka monta ihmistä salongissa työskentelee?",
      options: { solo: "Vain minä", small: "2–3 henkilöä", mid: "4–7 henkilöä", big: "8 tai enemmän" },
    },
    channels: {
      title: "Miten asiakkaat varaavat aikansa nyt?",
      options: {
        phone: "Soittamalla",
        chat: "Viestillä Facebookissa, Instagramissa tai WhatsAppissa",
        walkin: "Käymällä paikan päällä",
        online: "Itse varaussivulta",
        other: "Toisen sovelluksen kautta",
      },
    },
    afterhours: {
      title: "Kello on 22 ja asiakas haluaa varata ajan. Mitä tapahtuu?",
      options: {
        wait: "Hän lähettää viestin, vastaan aamulla",
        lost: "Hän ei pysty varaamaan",
        online: "Hän varaa netissä, minun ei tarvitse tehdä mitään",
      },
      hints: {
        wait: "Vastausta odottaessaan asiakas voi varata ajan muualta. Ympäri vuorokauden auki oleva varaussivu ottaa varauksen puolestasi.",
        lost: "Iltaisin monella on vihdoin aikaa varata. Ympäri vuorokauden auki oleva varaussivu pitää nämä asiakkaat.",
        online: "Hienoa. Loput suunnitelmasta keskittyy muistutuksiin ja kanta-asiakkaisiin.",
      },
    },
    s_messages: { quote: "Vastaan varausviesteihin sekä asiakasta tehdessäni että iltaisin." },
    noshow: {
      title: "Kuinka moni asiakas viikossa unohtaa aikansa tai peruu viime hetkellä?",
      sub: "Arvio riittää.",
      unit: "asiakasta viikossa",
    },
    s_noshow: { quote: "Aina kun asiakas jättää tulematta, menetän rahaa enkä voi asialle mitään." },
    returning: {
      title: "Mitä teet, jotta asiakkaat palaavat?",
      options: {
        none: "En vielä mitään, he palaavat jos haluavat",
        manual: "Viestin asiakkaille yksitellen",
        paper: "Paperinen leimakortti",
        program: "Selkeä kanta-asiakasohjelma",
      },
    },
    s_ads: { quote: "Haluan lisää uusia asiakkaita, mutta en halua kaataa rahaa mainoksiin." },
    goals: {
      title: "Mitä haluat eniten seuraavan 3 kuukauden aikana?",
      options: {
        full: "Täydemmän kalenterin",
        noshow: "Vähemmän unohtuneita aikoja",
        time: "Vähemmän viestejä ja puheluita",
        loyal: "Kanta-asiakkaita, jotka palaavat",
        website: "Omat verkkosivut salongille",
        manage: "Työntekijät ja myynti järjestykseen",
      },
    },
    hours: {
      title: "Kuinka monta tuntia viikossa menee varausten vastaanottoon, siirtoihin ja muistutuksiin?",
      sub: "Laske mukaan viestit ja puhelut.",
      unit: "tuntia viikossa",
    },
    tech: {
      title: "Kuinka tuttuja puhelimen sovellukset ovat sinulle?",
      options: { easy: "Tuttuja, pärjään itse", ok: "Ihan ok, pienellä avulla", hard: "Ei kovin tuttuja" },
      hints: {
        easy: "Silloin käyttöönotto vie sinulta noin 5 minuuttia.",
        ok: "Käyttöönotto neuvoo vaihe vaiheelta, ja avustaja vastaa ympäri vuorokauden.",
        hard: "Ei hätää. Jokaiseen asiaan on lyhyt video, ja VaraaAin tiimi auttaa, kun tarvitset ihmistä.",
      },
    },
    name: {
      title: "Mikä on salonkisi nimi?",
      sub: "Se tulee suunnitelmaasi. Nimi pysyy omalla laitteellasi.",
      placeholder: "Esim. Lumi Nails & Beauty",
    },
  },
  info: {
    free: {
      eyebrow: "Hyvä tietää",
      title: "Yksi tekijä tai kymmenen, VaraaAi on silti 0 €",
      body: "Rajaton määrä työntekijöitä ja varauksia, ei luottokorttia. Jokainen työntekijä saa omat vuoronsa ja oman tunnuksen kalenterinsa katsomiseen.",
    },
    night: {
      eyebrow: "Varaus ympäri vuorokauden",
      title: "Salonki on kiinni, kalenteri täyttyy silti",
      body: "Asiakas valitsee palvelun, tekijän ja vapaan ajan varaussivultasi ja saa vahvistuksen heti. Lisää yksi linkki Facebookiin, Instagramiin ja Googleen, niin se on siinä.",
    },
    remind: {
      eyebrow: "Automaattiset muistutukset",
      title: "Asiakas saa muistutuksen 24 tuntia, 2 tuntia ja 15 minuuttia ennen",
      body: "24 tunnin muistutuksessa on Vahvista- ja Peru-painikkeet. Vahvistamattomat varaukset erottuvat kalenterista, joten ehdit soittaa tai antaa ajan toiselle.",
    },
    loyal: {
      eyebrow: "Kanta-asiakkaat",
      title: "Asiakkaat palaavat ja tuovat ystävän mukanaan",
      body: "QR-kanta-asiakaskortti korvaa paperikortin. Käynnin jälkeen järjestelmä pyytää arvostelun. Kun asiakas suosittelee ystävälle, molemmat saavat edun.",
    },
    easy: {
      eyebrow: "Helppo aloittaa",
      title: "Valmis ottamaan asiakkaita 3 askeleella",
      body: "Rekisteröidy maksutta, lisää palvelut ja työntekijät ja laita varauslinkki sivuillesi. Tarjolla on ohjeet vaihe vaiheelta ja video jokaiseen asiaan.",
    },
  },
  loading: {
    title: "Kokoamme vastauksistasi suunnitelman",
    steps: ["Katsotaan, miten asiakkaat varaavat nyt", "Lasketaan tunnit ja tyhjät tuolit", "Laitetaan tärkein ensin", "Viimeistellään suunnitelma"],
  },
  result: {
    eyebrow: "Oma suunnitelma:",
    fallbackName: "salonkisi",
    scoreLabel: "Automaation taso nyt",
    scoreNote: "Laskettu vastauksistasi: miten otat varaukset, muistutat ja saat asiakkaat palaamaan.",
    bands: {
      low: { label: "Vielä paljon käsityötä", body: "Suurin osa varauksista ja muistutuksista on sinun varassasi. Juuri siksi muutos näkyy nopeimmin." },
      mid: { label: "Hyvä pohja, aukkoja jäljellä", body: "Osa pyörii jo itsestään. Kun aukot paikataan, kalenteri tasaantuu selvästi." },
      high: { label: "Menee erittäin hyvin", body: "Olet automatisoinut suurimman osan. Tuo kaikki yhteen paikkaan, niin arki kevenee entisestään." },
    },
    factsNote: "Antamiesi lukujen mukaan",
    hours: "{n} tuntia kuukaudessa",
    hoursBody: "menee varausten vastaanottoon, siirtoihin ja muistutuksiin.",
    hoursZero: "Tunteja ei juuri kulu",
    hoursZeroBody: "varausten vastaanottoon. Harva salonki pystyy samaan.",
    slots: "{n} tyhjää tuolia kuukaudessa",
    slotsBody: "koska asiakas unohtaa ajan tai peruu viime hetkellä.",
    slotsZero: "Ei tyhjiä tuoleja unohdusten takia",
    slotsZeroBody: "Automaattiset muistutukset pitävät tilanteen samana, kun salonki kasvaa.",
    planTitle: "3 asiaa, jotka kannattaa tehdä ensin",
    planSub: "Järjestyksessä sen mukaan, mikä vaikuttaa salonkiisi eniten.",
    areas: {
      booking: {
        title: "Avaa varaussivu, joka on auki aina",
        why: {
          wait: "Kerroit, että sulkemisen jälkeen asiakas odottaa vastausta seuraavaan päivään.",
          lost: "Kerroit, että kun salonki on kiinni, asiakas ei pysty varaamaan.",
          online: "Otat jo varauksia netissä. Seuraavaksi kaikki kanavat yhteen kalenteriin, ettei mitään jää väliin tai mene päällekkäin.",
        },
        how: ["Asiakas valitsee palvelun, tekijän ja ajan ja saa vahvistuksen heti", "Yksi linkki Facebookiin, Instagramiin ja Googleen", "Tekoälyavustaja kertoo hinnat ja vapaat ajat, kun kätesi ovat kiinni työssä"],
      },
      noshow: {
        title: "Ota muistutukset ja vahvistukset käyttöön",
        why: {
          some: "Kerroit, että noin {n} asiakasta viikossa jättää tulematta.",
          none: "Asiakkaasi unohtavat harvoin. Automaattiset muistutukset pitävät sen ennallaan ilman yhtään käsin lähetettyä viestiä.",
        },
        how: ["Muistutus 24 tuntia, 2 tuntia ja 15 minuuttia ennen", "Asiakas vahvistaa tai peruu suoraan muistutuksesta", "Täysinä päivinä jonotuslista täyttää juuri vapautuneen ajan"],
      },
      loyal: {
        title: "Tee uusista asiakkaista kanta-asiakkaita",
        why: {
          none: "Kerroit, ettet vielä tee mitään saadaksesi asiakkaat palaamaan.",
          manual: "Viestit asiakkaille yksitellen. Sen voi hoitaa automaattisesti.",
          paper: "Paperikortti katoaa eikä muistuta ketään. QR-kortti on valmiiksi asiakkaan puhelimessa.",
          program: "Sinulla on jo kanta-asiakasohjelma. Vie se QR-koodiin, niin asiakas seuraa pisteitään itse.",
        },
        how: ["QR-kanta-asiakaskortti, täydestä kortista etu", "Arvostelupyyntö lähtee jokaisen käynnin jälkeen", "Asiakas suosittelee ystävälle, molemmat saavat edun"],
      },
      manage: {
        title: "Koko salonki yhdelle näytölle",
        why: {
          solo: "Kun teet yksin, jokainen paperitöihin kulunut minuutti on pois asiakkaalta.",
          team: "Kun tekijöitä on monta, jokaisen kalenteri, vuorot ja myynti kannattaa pitää yhdessä paikassa.",
        },
        how: ["Vedä ja pudota -kalenteri jokaiselle tekijälle, päivä tai viikko", "Salongin omat verkkosivut valmiina heti rekisteröityessä", "Kassa, laskut ja myynti yhdellä silmäyksellä"],
      },
    },
    scratchTitle: "Lahja salongillesi",
    scratchHint: "Raaputa kulta pois",
    scratchOpen: "Avaa lahja",
    giftBig: "0 €",
    giftSub: "kuukaudessa, pysyvästi",
    giftPoints: ["Kaikki tämän suunnitelman toiminnot", "Rajaton määrä työntekijöitä ja varauksia", "Ei luottokorttia"],
    cta: "Rekisteröi salonki maksutta",
    ctaNote: "5 minuuttia · Ei korttia",
    ask: "Kysy ennen rekisteröitymistä",
    redo: "Tee testi uudelleen",
    toolsTitle: "Et halua vielä rekisteröityä? Kokeile ilmaista työkalua",
    tools: { price: "Tee monikielinen hinnasto", poster: "Tee QR-varausjuliste", check: "Tarkista salonkisi netissä" },
    chips: { hours: "{n} h/vko", noshow: "{n} unohdusta/vko" },
  },
};

export type SalonQuizStrings = Strings;

export function salonQuizStrings(locale: string): SalonQuizStrings {
  return locale === "vi" ? vi : locale === "fi" ? fi : en;
}
