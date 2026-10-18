import { auth } from "@/auth";
import { getBusinessAccess } from "@/lib/current-business";
import { Link } from "@/i18n/navigation";
import { formatInTimeZone } from "date-fns-tz";
import { loadDashboardOverview } from "@/lib/dashboard-overview";
import { INTL_LOCALES } from "@/lib/money";
import { CopyLinkButton } from "@/components/copy-link-button";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  Gift,
  Inbox,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Star,
  Stamp,
  UserPlus,
  Users,
  Wallet,
  CreditCard,
  Scissors,
  type LucideIcon,
} from "lucide-react";

const TEXT = {
  vi: {
    greet: ["Chào buổi sáng", "Chào buổi trưa", "Chào buổi chiều", "Chào buổi tối"],
    todaySummary: (n: number) => (n ? `Hôm nay có ${n} lịch hẹn` : "Hôm nay chưa có lịch hẹn nào"),
    expected: "Doanh thu dự kiến hôm nay",
    next: "Lịch tiếp theo",
    noNext: "Không còn lịch nào trong hôm nay",
    calendar: "Mở lịch hẹn",
    publicPage: "Xem trang salon",
    copyLink: "Sao chép link đặt lịch",
    copied: "Đã sao chép",
    messages: "Tin nhắn",
    revenueMonth: "Doanh thu tháng này",
    revenueSub: (done: string) => `Đã thực hiện ${done}`,
    bookingsMonth: "Lịch hẹn tháng này",
    newCustomers: "Khách hàng mới",
    rating: "Đánh giá trung bình",
    ratingSub: (n: number) => `${n} đánh giá`,
    noRating: "Chưa có đánh giá",
    views: "Lượt xem trang (30 ngày)",
    vsLast: "so với cùng kỳ tháng trước",
    vsPrev30: "so với 30 ngày trước",
    todaySchedule: "Lịch hẹn hôm nay",
    viewAll: "Xem tất cả",
    emptyToday: "Hôm nay chưa có lịch hẹn",
    emptyTodayHint: "Chia sẻ link đặt lịch lên Facebook, Instagram hoặc Google để khách tự đặt 24/7.",
    done: "Đã xong",
    ongoing: "Đang diễn ra",
    anyStaff: "Chưa phân công",
    attention: "Cần xử lý",
    allGood: "Mọi thứ đều ổn — không có việc gì đang chờ bạn.",
    unread: "Tin nhắn chưa đọc",
    pendingReviews: "Đánh giá chờ duyệt",
    pendingPayment: "Lịch chờ thanh toán",
    ordersToHandle: "Đơn hàng cần xử lý",
    giftPending: "Thẻ quà tặng chờ kích hoạt",
    revenue6: "Doanh thu 6 tháng",
    bookingsCount: (n: number) => `${n} lịch`,
    week: "7 ngày tới",
    weekSub: (n: number) => `${n} lịch hẹn đã đặt`,
    statusMix: "Kết quả lịch hẹn (90 ngày)",
    completed: "Hoàn thành",
    cancelled: "Đã huỷ",
    noShow: "Không đến",
    noData: "Chưa có dữ liệu",
    topServices: "Dịch vụ bán chạy tháng này",
    staff: "Hiệu suất nhân viên tháng này",
    todayN: (n: number) => `${n} lịch hôm nay`,
    recent: "Lịch mới được đặt",
    online: "Online",
    manual: "Thủ công",
    reviews: "Đánh giá gần đây",
    pending: "Chờ duyệt",
    more: "Hoạt động khác tháng này",
    orders: "Đơn hàng sản phẩm",
    giftCards: "Thẻ quà tặng đã bán",
    loyalty: "Thẻ thành viên",
    loyaltySub: (n: number) => `${n} lượt tích điểm tháng này`,
    status: {
      PENDING_PAYMENT: "Chờ thanh toán",
      CONFIRMED: "Đã xác nhận",
      COMPLETED: "Hoàn thành",
      CANCELLED: "Đã huỷ",
      NO_SHOW: "Không đến",
    },
  },
  en: {
    greet: ["Good morning", "Good afternoon", "Good afternoon", "Good evening"],
    todaySummary: (n: number) => (n ? `${n} appointment${n > 1 ? "s" : ""} today` : "No appointments today yet"),
    expected: "Expected revenue today",
    next: "Next up",
    noNext: "Nothing else on today",
    calendar: "Open calendar",
    publicPage: "View salon page",
    copyLink: "Copy booking link",
    copied: "Copied",
    messages: "Messages",
    revenueMonth: "Revenue this month",
    revenueSub: (done: string) => `${done} done so far`,
    bookingsMonth: "Bookings this month",
    newCustomers: "New customers",
    rating: "Average rating",
    ratingSub: (n: number) => `${n} reviews`,
    noRating: "No reviews yet",
    views: "Page views (30 days)",
    vsLast: "vs. same period last month",
    vsPrev30: "vs. previous 30 days",
    todaySchedule: "Today's appointments",
    viewAll: "View all",
    emptyToday: "No appointments today",
    emptyTodayHint: "Share your booking link on Facebook, Instagram or Google so customers can book 24/7.",
    done: "Done",
    ongoing: "In progress",
    anyStaff: "Unassigned",
    attention: "Needs attention",
    allGood: "All clear — nothing is waiting for you.",
    unread: "Unread messages",
    pendingReviews: "Reviews to approve",
    pendingPayment: "Awaiting payment",
    ordersToHandle: "Orders to handle",
    giftPending: "Gift cards awaiting activation",
    revenue6: "Revenue, last 6 months",
    bookingsCount: (n: number) => `${n} bookings`,
    week: "Next 7 days",
    weekSub: (n: number) => `${n} appointments booked`,
    statusMix: "Appointment outcomes (90 days)",
    completed: "Completed",
    cancelled: "Cancelled",
    noShow: "No-show",
    noData: "No data yet",
    topServices: "Top services this month",
    staff: "Staff performance this month",
    todayN: (n: number) => `${n} today`,
    recent: "Recently booked",
    online: "Online",
    manual: "Manual",
    reviews: "Latest reviews",
    pending: "Pending",
    more: "More this month",
    orders: "Product orders",
    giftCards: "Gift cards sold",
    loyalty: "Loyalty members",
    loyaltySub: (n: number) => `${n} stamps this month`,
    status: {
      PENDING_PAYMENT: "Awaiting payment",
      CONFIRMED: "Confirmed",
      COMPLETED: "Completed",
      CANCELLED: "Cancelled",
      NO_SHOW: "No-show",
    },
  },
  fi: {
    greet: ["Hyvää huomenta", "Hyvää päivää", "Hyvää iltapäivää", "Hyvää iltaa"],
    todaySummary: (n: number) => (n ? `Tänään ${n} varausta` : "Tänään ei vielä varauksia"),
    expected: "Odotettu myynti tänään",
    next: "Seuraava",
    noNext: "Ei enää varauksia tänään",
    calendar: "Avaa kalenteri",
    publicPage: "Näytä salonkisivu",
    copyLink: "Kopioi varauslinkki",
    copied: "Kopioitu",
    messages: "Viestit",
    revenueMonth: "Myynti tässä kuussa",
    revenueSub: (done: string) => `Toteutunut ${done}`,
    bookingsMonth: "Varaukset tässä kuussa",
    newCustomers: "Uudet asiakkaat",
    rating: "Keskiarvo",
    ratingSub: (n: number) => `${n} arvostelua`,
    noRating: "Ei vielä arvosteluja",
    views: "Sivun katselut (30 pv)",
    vsLast: "vs. sama jakso viime kuussa",
    vsPrev30: "vs. edelliset 30 pv",
    todaySchedule: "Tämän päivän varaukset",
    viewAll: "Näytä kaikki",
    emptyToday: "Ei varauksia tänään",
    emptyTodayHint: "Jaa varauslinkkisi Facebookissa, Instagramissa tai Googlessa, niin asiakkaat voivat varata 24/7.",
    done: "Valmis",
    ongoing: "Käynnissä",
    anyStaff: "Ei määritetty",
    attention: "Vaatii huomiota",
    allGood: "Kaikki kunnossa — mikään ei odota sinua.",
    unread: "Lukemattomat viestit",
    pendingReviews: "Hyväksyttävät arvostelut",
    pendingPayment: "Odottaa maksua",
    ordersToHandle: "Käsiteltävät tilaukset",
    giftPending: "Aktivoimattomat lahjakortit",
    revenue6: "Myynti, 6 kk",
    bookingsCount: (n: number) => `${n} varausta`,
    week: "Seuraavat 7 päivää",
    weekSub: (n: number) => `${n} varausta`,
    statusMix: "Varausten toteutuminen (90 pv)",
    completed: "Toteutunut",
    cancelled: "Peruttu",
    noShow: "Ei saapunut",
    noData: "Ei vielä tietoja",
    topServices: "Suosituimmat palvelut",
    staff: "Työntekijät tässä kuussa",
    todayN: (n: number) => `${n} tänään`,
    recent: "Viimeksi varatut",
    online: "Verkko",
    manual: "Käsin",
    reviews: "Uusimmat arvostelut",
    pending: "Odottaa",
    more: "Muuta tässä kuussa",
    orders: "Tuotetilaukset",
    giftCards: "Myydyt lahjakortit",
    loyalty: "Kanta-asiakkaat",
    loyaltySub: (n: number) => `${n} leimaa tässä kuussa`,
    status: {
      PENDING_PAYMENT: "Odottaa maksua",
      CONFIRMED: "Vahvistettu",
      COMPLETED: "Toteutunut",
      CANCELLED: "Peruttu",
      NO_SHOW: "Ei saapunut",
    },
  },
};

const STATUS_STYLE: Record<string, string> = {
  PENDING_PAYMENT: "bg-peach-100 text-coral-600",
  CONFIRMED: "bg-primary-50 text-primary-700",
  COMPLETED: "bg-teal-50 text-teal-700",
  CANCELLED: "bg-mist-100 text-ink-400",
  NO_SHOW: "bg-berry-50 text-berry-600",
};

function Card({
  title,
  icon: Icon,
  action,
  children,
  className = "",
}: {
  title: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`min-w-0 rounded-[24px] border border-ink-100 bg-white p-5 shadow-sm shadow-primary-900/[0.03] sm:p-6 ${className}`}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-ink-900">
          {Icon && (
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
              <Icon className="h-4 w-4" />
            </span>
          )}
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Delta({ value, hint }: { value: number | null; hint: string }) {
  if (value === null) return <p className="mt-2 text-[11px] text-ink-400">{hint}</p>;
  const up = value >= 0;
  return (
    <p className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] text-ink-400">
      <span
        className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-bold ${
          value === 0 ? "bg-mist-100 text-ink-700" : up ? "bg-teal-50 text-teal-700" : "bg-berry-50 text-berry-600"
        }`}
      >
        {value !== 0 && (up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />)}
        {up && value > 0 ? "+" : ""}
        {value}%
      </span>
      {hint}
    </p>
  );
}

function Kpi({
  icon: Icon,
  tone,
  label,
  value,
  sub,
  delta,
  href,
}: {
  icon: LucideIcon;
  tone: string;
  label: string;
  value: string;
  sub?: string;
  delta?: React.ReactNode;
  href?: string;
}) {
  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-semibold text-ink-400">{label}</p>
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone}`}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
      </div>
      <p className="mt-1 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-[1.7rem]">{value}</p>
      {sub && <p className="mt-0.5 text-xs text-ink-700">{sub}</p>}
      {delta}
    </>
  );
  const cls =
    "block min-w-0 rounded-[24px] border border-ink-100 bg-white p-4 shadow-sm shadow-primary-900/[0.03] transition-all sm:p-5";
  return href ? (
    <Link href={href} className={`${cls} hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-md`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function Avatar({ name, url, size = "h-9 w-9" }: { name: string; url: string | null; size?: string }) {
  return (
    <span className={`flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary-100 text-xs font-bold text-primary-700`}>
      {url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" className="h-full w-full object-cover" />
      ) : (
        name.trim().charAt(0).toUpperCase() || "?"
      )}
    </span>
  );
}

export default async function DashboardOverviewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  if (!access) return null;
  const { business } = access;
  // Staff logins without "view everything" see their day, not the money.
  const full = access.isOwner || access.viewOnlyEverywhere;
  const ownOnly = !access.isOwner && !access.canViewAllBookings ? access.staffId : undefined;

  const [session, d] = await Promise.all([
    auth(),
    loadDashboardOverview({
      businessId: business.id,
      timezone: business.timezone,
      currency: business.defaultCurrency,
      staffId: ownOnly,
    }),
  ]);

  const L = TEXT[locale as keyof typeof TEXT] ?? TEXT.en;
  const intl = INTL_LOCALES[locale] ?? "en-US";
  const tz = business.timezone;
  const zeroDecimal = d.currency === "VND";
  const money = (cents: number) =>
    new Intl.NumberFormat(intl, {
      style: "currency",
      currency: d.currency,
      maximumFractionDigits: 0,
    }).format(zeroDecimal ? cents : cents / 100);
  const time = (date: Date) => formatInTimeZone(date, tz, "HH:mm");
  const now = new Date();

  const hour = d.nowZ.getHours();
  const greet = L.greet[hour < 11 ? 0 : hour < 13 ? 1 : hour < 18 ? 2 : 3];
  // Vietnamese names put the given name last ("Nguyễn Văn Hiệp" → "Hiệp").
  const nameParts = session?.user?.name?.trim().split(/\s+/) ?? [];
  const firstName = (locale === "vi" ? nameParts[nameParts.length - 1] : nameParts[0]) ?? "";
  const dateLabel = new Intl.DateTimeFormat(intl, { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: tz }).format(now);
  const publicPath = `${locale === "vi" ? "" : `/${locale}`}/b/${business.slug}`;

  const maxMonth = Math.max(1, ...d.months.map((m) => m.revenueCents));
  const maxWeek = Math.max(1, ...d.week.map((w) => w.count));
  const weekTotal = d.week.reduce((s, w) => s + w.count, 0);
  const maxSvc = Math.max(1, ...d.topServices.map((s) => s.revenueCents));
  const maxStaff = Math.max(1, ...d.staffStats.map((s) => s.revenueCents));

  const attention = [
    { n: d.attention.unreadMessages, label: L.unread, href: "/business/dashboard/messages", icon: MessageCircle, tone: "bg-primary-50 text-primary-600" },
    ...(full
      ? [
          { n: d.attention.pendingReviews, label: L.pendingReviews, href: "/business/dashboard/reviews", icon: Star, tone: "bg-peach-100 text-coral-600" },
          { n: d.attention.ordersToHandle, label: L.ordersToHandle, href: "/business/dashboard/orders", icon: ShoppingBag, tone: "bg-teal-50 text-teal-700" },
          { n: d.attention.giftCardsPending, label: L.giftPending, href: "/business/dashboard/gift-cards", icon: Gift, tone: "bg-berry-50 text-berry-600" },
        ]
      : []),
    { n: d.attention.pendingPayment, label: L.pendingPayment, href: "/business/dashboard/bookings", icon: CreditCard, tone: "bg-mist-100 text-ink-700" },
  ].filter((a) => a.n > 0);

  const statusRows = [
    { key: "completed", label: L.completed, n: d.statusMix.completed, bar: "bg-teal-500", dot: "bg-teal-500" },
    { key: "cancelled", label: L.cancelled, n: d.statusMix.cancelled, bar: "bg-ink-400/50", dot: "bg-ink-400/50" },
    { key: "noShow", label: L.noShow, n: d.statusMix.noShow, bar: "bg-berry-400", dot: "bg-berry-400" },
  ];
  const pct = (n: number) => (d.statusTotal ? Math.round((n / d.statusTotal) * 100) : 0);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[28px] bg-primary-800 p-6 text-white shadow-xl shadow-primary-900/15 sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-coral-400/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-primary-400/30 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-200">{dateLabel}</p>
            <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              {greet}
              {firstName ? `, ${firstName}` : ""}
            </h1>
            <p className="mt-1 text-sm text-primary-100">
              {business.name} · {L.todaySummary(d.today.length)}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 [&>*]:justify-center sm:flex sm:flex-wrap lg:grid lg:w-[26rem] lg:shrink-0">
            <Link
              href="/business/dashboard/bookings"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-primary-800 shadow transition-colors hover:bg-peach-100"
            >
              <CalendarDays className="h-4 w-4" /> {L.calendar}
            </Link>
            <Link
              href="/business/dashboard/messages"
              className="relative inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              <MessageCircle className="h-4 w-4" /> {L.messages}
              {d.attention.unreadMessages > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-coral-500 px-1.5 text-[11px] font-bold">
                  {d.attention.unreadMessages}
                </span>
              )}
            </Link>
            <a
              href={publicPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              <ExternalLink className="h-4 w-4" /> {L.publicPage}
            </a>
            <CopyLinkButton
              path={publicPath}
              label={L.copyLink}
              copiedLabel={L.copied}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/20 transition-colors hover:bg-white/20"
            />
          </div>
        </div>

        <div className="relative mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {full && (
            <div className="min-w-0 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-200">{L.expected}</p>
              <p className="mt-0.5 text-xl font-extrabold">{money(d.todayRevenue)}</p>
            </div>
          )}
          <div className={`min-w-0 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur ${full ? "" : "sm:col-span-2"}`}>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-200">{L.next}</p>
            {d.nextUp ? (
              <p className="mt-0.5 truncate text-base font-bold">
                <span className="text-coral-400">{time(d.nextUp.startsAt)}</span> · {d.nextUp.customer.name ?? "—"}
                <span className="font-medium text-primary-100"> · {d.nextUp.service.name}</span>
              </p>
            ) : (
              <p className="mt-0.5 text-base font-semibold text-primary-100">{L.noNext}</p>
            )}
          </div>
        </div>
      </section>

      {/* KPIs */}
      {full && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          <Kpi
            icon={Wallet}
            tone="bg-primary-50 text-primary-600"
            label={L.revenueMonth}
            value={money(d.kpi.revenueMonth)}
            sub={L.revenueSub(money(d.kpi.revenueDone))}
            delta={<Delta value={d.kpi.revenueChange} hint={L.vsLast} />}
          />
          <Kpi
            icon={CalendarCheck}
            tone="bg-teal-50 text-teal-700"
            label={L.bookingsMonth}
            value={String(d.kpi.bookingsMonth)}
            delta={<Delta value={d.kpi.bookingsChange} hint={L.vsLast} />}
            href="/business/dashboard/bookings"
          />
          <Kpi
            icon={UserPlus}
            tone="bg-peach-100 text-coral-600"
            label={L.newCustomers}
            value={String(d.kpi.newCustomers)}
            delta={<Delta value={d.kpi.newCustomersChange} hint={L.vsLast} />}
            href="/business/dashboard/customers"
          />
          <Kpi
            icon={Star}
            tone="bg-berry-50 text-berry-500"
            label={L.rating}
            value={d.kpi.rating ? d.kpi.rating.toFixed(1) : "—"}
            sub={d.kpi.ratingCount ? L.ratingSub(d.kpi.ratingCount) : L.noRating}
            delta={
              <p className="mt-2 flex items-center gap-1 text-[11px] text-ink-400">
                <Eye className="h-3.5 w-3.5" /> {d.kpi.views30} · {L.views}
              </p>
            }
            href="/business/dashboard/reviews"
          />
        </div>
      )}

      {/* Today + attention */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <Card
          title={L.todaySchedule}
          icon={Clock}
          action={
            <Link href="/business/dashboard/bookings" className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold text-primary-700 hover:underline">
              {L.viewAll} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          }
        >
          {d.today.length === 0 ? (
            <div className="flex flex-col items-center rounded-2xl border border-dashed border-ink-100 px-6 py-10 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-peach-100 text-primary-600">
                <Sparkles className="h-6 w-6" />
              </span>
              <p className="mt-3 font-bold text-ink-900">{L.emptyToday}</p>
              <p className="mt-1 max-w-sm text-sm leading-relaxed text-ink-400">{L.emptyTodayHint}</p>
              <CopyLinkButton
                path={publicPath}
                label={L.copyLink}
                copiedLabel={L.copied}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
              />
            </div>
          ) : (
            <ol className="relative space-y-2">
              {d.today.slice(0, 8).map((b) => {
                const isDone = b.endsAt <= now;
                const isNow = b.startsAt <= now && b.endsAt > now;
                return (
                  <li
                    key={b.id}
                    className={`flex items-center gap-3 rounded-2xl border px-3 py-3 sm:px-4 ${
                      isNow ? "border-primary-200 bg-primary-50/60" : "border-ink-100 bg-white"
                    } ${isDone ? "opacity-60" : ""}`}
                  >
                    <div className="w-12 shrink-0 text-center">
                      <p className="text-sm font-extrabold tabular-nums text-ink-900">{time(b.startsAt)}</p>
                      <p className="text-[11px] tabular-nums text-ink-400">{time(b.endsAt)}</p>
                    </div>
                    <span className={`h-10 w-1 shrink-0 rounded-full ${isNow ? "bg-coral-500" : isDone ? "bg-ink-100" : "bg-primary-400"}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-ink-900">{b.customer.name ?? "—"}</p>
                      <p className="truncate text-xs text-ink-400">
                        {b.service.name} · {b.staff?.name ?? L.anyStaff}
                      </p>
                    </div>
                    <div className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
                      {full && <span className="text-sm font-bold text-ink-900">{money(b.priceCents)}</span>}
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLE[b.status]}`}>
                        {L.status[b.status as keyof typeof L.status]}
                      </span>
                    </div>
                    {isNow ? (
                      <span className="flex shrink-0 items-center gap-1.5 text-[11px] font-bold text-coral-600">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-coral-500" />
                        </span>
                        <span className="hidden sm:inline">{L.ongoing}</span>
                      </span>
                    ) : isDone ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-600" aria-label={L.done} />
                    ) : null}
                  </li>
                );
              })}
            </ol>
          )}
        </Card>

        <div className="min-w-0 space-y-6">
          <Card title={L.attention} icon={Inbox}>
            {attention.length === 0 ? (
              <p className="flex items-center gap-2 rounded-2xl bg-teal-50 px-4 py-3 text-sm font-medium text-teal-700">
                <CheckCircle2 className="h-4 w-4 shrink-0" /> {L.allGood}
              </p>
            ) : (
              <ul className="space-y-2">
                {attention.map((a) => (
                  <li key={a.label}>
                    <Link
                      href={a.href}
                      className="flex items-center gap-3 rounded-2xl border border-ink-100 px-3 py-2.5 transition-colors hover:border-primary-200 hover:bg-primary-50/40"
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${a.tone}`}>
                        <a.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink-700">{a.label}</span>
                      <span className="rounded-full bg-ink-900 px-2.5 py-0.5 text-xs font-bold text-white">{a.n}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title={L.week} icon={CalendarDays}>
            <p className="-mt-2 mb-4 text-xs text-ink-400">{L.weekSub(weekTotal)}</p>
            <div className="flex h-32 items-end gap-2">
              {d.week.map((w, i) => (
                <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                  <span className="text-[11px] font-bold text-ink-700">{w.count || ""}</span>
                  <div
                    className={`w-full rounded-lg ${i === 0 ? "bg-gradient-to-t from-primary-600 to-primary-400" : "bg-primary-100"}`}
                    style={{ height: `${Math.max(6, (w.count / maxWeek) * 100)}%` }}
                    title={`${w.count}`}
                  />
                  <span className={`text-[10px] font-semibold uppercase ${i === 0 ? "text-primary-700" : "text-ink-400"}`}>
                    {new Intl.DateTimeFormat(intl, { weekday: "short" }).format(w.day).replace(".", "")}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {full && (
        <>
          {/* Revenue + outcomes */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <Card title={L.revenue6} icon={Wallet}>
              <div className="flex h-56 items-end gap-3 sm:gap-5">
                {d.months.map((m, i) => {
                  const current = i === d.months.length - 1;
                  return (
                    <div key={i} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <span className={`whitespace-nowrap font-bold ${current ? "text-[11px] text-primary-700" : "text-[10px] text-ink-400"}`}>
                        {money(m.revenueCents)}
                      </span>
                      <div
                        className={`w-full max-w-[56px] rounded-t-xl rounded-b-md transition-colors ${
                          current ? "bg-gradient-to-t from-primary-700 to-primary-400" : "bg-primary-100 group-hover:bg-primary-200"
                        }`}
                        style={{ height: `${Math.max(3, (m.revenueCents / maxMonth) * 100)}%` }}
                        title={`${money(m.revenueCents)} · ${L.bookingsCount(m.bookings)}`}
                      />
                      <span className={`text-[11px] font-semibold capitalize ${current ? "text-ink-900" : "text-ink-400"}`}>
                        {new Intl.DateTimeFormat(intl, { month: "short" }).format(m.month).replace(".", "")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card title={L.statusMix} icon={CheckCircle2}>
              {d.statusTotal === 0 ? (
                <p className="text-sm text-ink-400">{L.noData}</p>
              ) : (
                <>
                  <p className="text-4xl font-extrabold tracking-tight text-ink-900">
                    {pct(d.statusMix.completed)}%
                    <span className="ml-2 text-sm font-semibold text-teal-700">{L.completed}</span>
                  </p>
                  <div className="mt-4 flex h-3 overflow-hidden rounded-full bg-mist-100">
                    {statusRows.map((r) => (
                      <div key={r.key} className={r.bar} style={{ width: `${pct(r.n)}%` }} />
                    ))}
                  </div>
                  <ul className="mt-4 space-y-2.5 text-sm">
                    {statusRows.map((r) => (
                      <li key={r.key} className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-ink-700">
                          <span className={`h-2.5 w-2.5 rounded-full ${r.dot}`} /> {r.label}
                        </span>
                        <span className="font-semibold tabular-nums text-ink-900">
                          {r.n} <span className="font-normal text-ink-400">· {pct(r.n)}%</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </Card>
          </div>

          {/* Services + staff */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card
              title={L.topServices}
              icon={Scissors}
              action={
                <Link href="/business/dashboard/services" className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold text-primary-700 hover:underline">
                  {L.viewAll} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              }
            >
              {d.topServices.length === 0 ? (
                <p className="text-sm text-ink-400">{L.noData}</p>
              ) : (
                <ul className="space-y-3.5">
                  {d.topServices.map((s, i) => (
                    <li key={s.id}>
                      <div className="flex items-center justify-between gap-3 text-sm">
                        <span className="flex min-w-0 items-center gap-2.5">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-mist-100 text-[11px] font-bold text-ink-700">
                            {i + 1}
                          </span>
                          <span className="line-clamp-2 font-medium leading-snug text-ink-900">{s.name}</span>
                        </span>
                        <span className="shrink-0 text-right">
                          <span className="font-bold text-ink-900">{money(s.revenueCents)}</span>
                          <span className="ml-1.5 text-xs text-ink-400">{L.bookingsCount(s.count)}</span>
                        </span>
                      </div>
                      <div className="ml-8 mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist-100">
                        <div className="h-full rounded-full bg-gradient-to-r from-primary-400 to-coral-400" style={{ width: `${(s.revenueCents / maxSvc) * 100}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>

            <Card
              title={L.staff}
              icon={Users}
              action={
                access.isOwner ? (
                  <Link href="/business/dashboard/staff" className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold text-primary-700 hover:underline">
                    {L.viewAll} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : null
              }
            >
              {d.staffStats.length === 0 ? (
                <p className="text-sm text-ink-400">{L.noData}</p>
              ) : (
                <ul className="space-y-3">
                  {d.staffStats.slice(0, 6).map((s) => (
                    <li key={s.id} className="flex items-center gap-3">
                      <Avatar name={s.name} url={s.avatarUrl} />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2 text-sm">
                          <span className="truncate font-semibold text-ink-900">{s.name}</span>
                          <span className="shrink-0 font-bold text-ink-900">{money(s.revenueCents)}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist-100">
                            <div className="h-full rounded-full bg-teal-500" style={{ width: `${(s.revenueCents / maxStaff) * 100}%` }} />
                          </div>
                          <span className="shrink-0 text-[11px] text-ink-400">
                            {L.bookingsCount(s.bookings)} · {L.todayN(s.today)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          </div>
        </>
      )}

      {/* Recent bookings + reviews */}
      <div className={`grid grid-cols-1 gap-6 ${full ? "lg:grid-cols-2" : ""}`}>
        <Card title={L.recent} icon={CalendarCheck}>
          {d.recentlyBooked.length === 0 ? (
            <p className="text-sm text-ink-400">{L.noData}</p>
          ) : (
            <ul className="divide-y divide-ink-100">
              {d.recentlyBooked.map((b) => (
                <li key={b.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                  <Avatar name={b.customer.name ?? "?"} url={null} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink-900">
                      {b.customer.name ?? "—"}
                      <span
                        className={`ml-2 rounded-full px-1.5 py-0.5 align-middle text-[10px] font-bold ${
                          b.source === "WEBSITE" ? "bg-teal-50 text-teal-700" : "bg-mist-100 text-ink-700"
                        }`}
                      >
                        {b.source === "WEBSITE" ? L.online : L.manual}
                      </span>
                    </p>
                    <p className="truncate text-xs text-ink-400">
                      {b.service.name} ·{" "}
                      {new Intl.DateTimeFormat(intl, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: tz }).format(b.startsAt)}
                    </p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${STATUS_STYLE[b.status]}`}>
                    {L.status[b.status as keyof typeof L.status]}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>

        {full && (
          <Card
            title={L.reviews}
            icon={Star}
            action={
              <Link href="/business/dashboard/reviews" className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-semibold text-primary-700 hover:underline">
                {L.viewAll} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            }
          >
            {d.latestReviews.length === 0 ? (
              <p className="text-sm text-ink-400">{L.noRating}</p>
            ) : (
              <ul className="space-y-3">
                {d.latestReviews.map((r) => (
                  <li key={r.id} className="rounded-2xl bg-mist-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star key={n} className={`h-3.5 w-3.5 ${n <= r.rating ? "fill-coral-500 text-coral-500" : "text-ink-100"}`} />
                        ))}
                      </span>
                      {r.status === "PENDING" && (
                        <span className="rounded-full bg-peach-100 px-2 py-0.5 text-[10px] font-bold text-coral-600">{L.pending}</span>
                      )}
                    </div>
                    {r.comment && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-700">“{r.comment}”</p>}
                    <p className="mt-2 text-xs text-ink-400">
                      <span className="font-semibold text-ink-700">{r.customer.name ?? "—"}</span> · {r.booking.service.name}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        )}
      </div>

      {full && (
        <Card title={L.more} icon={Sparkles}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { icon: ShoppingBag, tone: "bg-teal-50 text-teal-700", label: L.orders, value: String(d.extras.ordersMonth), sub: money(d.extras.ordersRevenue), href: "/business/dashboard/orders" },
              { icon: Gift, tone: "bg-berry-50 text-berry-500", label: L.giftCards, value: String(d.extras.giftCardsMonth), sub: money(d.extras.giftCardsRevenue), href: "/business/dashboard/gift-cards" },
              { icon: Stamp, tone: "bg-peach-100 text-coral-600", label: L.loyalty, value: String(d.extras.loyaltyCards), sub: L.loyaltySub(d.extras.loyaltyScansMonth), href: "/business/dashboard/loyalty" },
              {
                icon: Eye,
                tone: "bg-primary-50 text-primary-600",
                label: L.views,
                value: String(d.kpi.views30),
                sub: d.kpi.viewsChange === null ? "" : `${d.kpi.viewsChange >= 0 ? "+" : ""}${d.kpi.viewsChange}% ${L.vsPrev30}`,
                href: "/business/dashboard/landing",
              },
            ].map((x) => (
              <Link
                key={x.label}
                href={x.href}
                className="flex items-center gap-3 rounded-2xl border border-ink-100 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/40"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${x.tone}`}>
                  <x.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold leading-snug text-ink-400">{x.label}</span>
                  <span className="block text-xl font-extrabold text-ink-900">{x.value}</span>
                  {x.sub && <span className="block text-[11px] leading-snug text-ink-700">{x.sub}</span>}
                </span>
              </Link>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
