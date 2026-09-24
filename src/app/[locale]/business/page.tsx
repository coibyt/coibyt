import {
  CalendarDays,
  BellRing,
  Share2,
  Star,
  Gift,
  Megaphone,
  Globe,
  Users,
  Infinity as InfinityIcon,
  Check,
  Facebook,
  Instagram,
  MapPin,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

const BENEFITS_VI = [
  {
    icon: CalendarDays,
    color: "bg-primary-500",
    title: "Quản lý lịch hẹn miễn phí",
    body: "Tạo trang salon, nhận đặt lịch online và quản lý toàn bộ cuộc hẹn — hoàn toàn miễn phí, không mất bất kỳ khoản phí nào.",
  },
  {
    icon: BellRing,
    color: "bg-teal-500",
    title: "Tự động nhắc lịch hẹn",
    body: "Khách hàng và nhân viên đều được nhắc lịch hẹn tự động, không còn lo sót lịch hay khách quên đến.",
  },
  {
    icon: Share2,
    color: "bg-coral-500",
    title: "Nhúng lịch hẹn ở bất cứ đâu",
    body: "Gắn lịch đặt hẹn ngay trên website của bạn, hoặc cho khách đặt lịch trực tiếp trên Facebook, Instagram và Google Maps.",
  },
  {
    icon: Star,
    color: "bg-berry-500",
    title: "Tự động xin đánh giá",
    body: "Sau mỗi lịch hẹn, hệ thống tự động gửi lời mời đánh giá đến khách hàng, giúp bạn xây dựng uy tín nhanh hơn.",
  },
  {
    icon: Gift,
    color: "bg-sage-500",
    title: "Thẻ quà tặng giữ chân khách",
    body: "Tạo thẻ quà tặng để khuyến khích khách hàng quay lại salon của bạn nhiều hơn.",
  },
  {
    icon: Megaphone,
    color: "bg-primary-500",
    title: "Quảng bá đến nhiều khách hơn",
    body: "Salon của bạn xuất hiện trên trang tìm kiếm VaraaAi.Com, tiếp cận thêm khách hàng mới trong khu vực.",
  },
  {
    icon: Globe,
    color: "bg-teal-500",
    title: "Đa ngôn ngữ",
    body: "Giao diện hỗ trợ 7 ngôn ngữ: Tiếng Việt, Anh, Phần Lan, Ba Lan, Đức, Khmer và Thái.",
  },
  {
    icon: Users,
    color: "bg-coral-500",
    title: "Không giới hạn nhân viên & lượt đặt",
    body: "Thêm bao nhiêu nhân viên tùy thích, nhận không giới hạn số lượt đặt lịch mỗi tháng.",
  },
];

const BENEFITS_EN = [
  {
    icon: CalendarDays,
    color: "bg-primary-500",
    title: "Free appointment management",
    body: "Create your salon page, take bookings online and manage every appointment — completely free, no fees ever.",
  },
  {
    icon: BellRing,
    color: "bg-teal-500",
    title: "Automatic appointment reminders",
    body: "Customers and staff both get automatic reminders, so no one ever misses an appointment again.",
  },
  {
    icon: Share2,
    color: "bg-coral-500",
    title: "Book from anywhere",
    body: "Embed your booking calendar on your own website, or let customers book directly from Facebook, Instagram and Google Maps.",
  },
  {
    icon: Star,
    color: "bg-berry-500",
    title: "Automatic review requests",
    body: "After every appointment, the system automatically asks the customer for a review — building your reputation on autopilot.",
  },
  {
    icon: Gift,
    color: "bg-sage-500",
    title: "Gift cards that bring customers back",
    body: "Create gift cards to keep customers coming back to your salon again and again.",
  },
  {
    icon: Megaphone,
    color: "bg-primary-500",
    title: "Reach more customers",
    body: "Your salon shows up in VaraaAi.Com search, reaching new customers in your area.",
  },
  {
    icon: Globe,
    color: "bg-teal-500",
    title: "Multi-language",
    body: "The interface supports 7 languages: Vietnamese, English, Finnish, Polish, German, Khmer and Thai.",
  },
  {
    icon: Users,
    color: "bg-coral-500",
    title: "Unlimited staff & bookings",
    body: "Add as many staff members as you like and take unlimited bookings every month.",
  },
];

const STEPS_VI = [
  { title: "Đăng ký miễn phí", body: "Điền thông tin salon, xác minh email — xong ngay trong vài phút." },
  { title: "Thêm dịch vụ & nhân viên", body: "Thêm danh sách dịch vụ, giá, thời lượng và đội ngũ nhân viên của bạn." },
  { title: "Nhận đặt lịch ngay", body: "Chia sẻ trang salon của bạn và bắt đầu nhận đặt lịch từ khách hàng." },
];

const STEPS_EN = [
  { title: "Sign up for free", body: "Fill in your salon's details and verify your email — done in minutes." },
  { title: "Add your services & staff", body: "List your services, prices, durations and your team." },
  { title: "Start taking bookings", body: "Share your salon page and start receiving bookings from customers." },
];

export default async function BusinessLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const vi = locale === "vi";
  const benefits = vi ? BENEFITS_VI : BENEFITS_EN;
  const steps = vi ? STEPS_VI : STEPS_EN;

  return (
    <div>
      {/* Hero */}
      <section className="bg-peach-100">
        <div className="container flex flex-col items-center gap-6 py-16 text-center sm:py-24">
          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary-600 shadow-card">
            {vi ? "Miễn phí trọn đời — không phí ẩn" : "Free forever — no hidden fees"}
          </span>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-6xl">
            {vi ? "Quản lý salon của bạn,\nhoàn toàn miễn phí" : "Run your salon,\ncompletely free"}
          </h1>
          <p className="max-w-xl whitespace-pre-line text-base text-ink-700 sm:text-lg">
            {vi
              ? "VaraaAi.Com là nền tảng đặt lịch hẹn dành cho salon tóc, nail, spa — giúp khách hàng đặt lịch online, còn bạn quản lý lịch hẹn, nhân viên và khách hàng mọi lúc mọi nơi."
              : "VaraaAi.Com is the booking platform for hair salons, nail bars and spas — customers book online while you manage appointments, staff and customers from anywhere."}
          </p>
          <div className="flex flex-col items-center gap-3">
            <Link href="/business/apply" className="btn-accent !px-8 !py-3.5 text-base">
              {vi ? "Đăng ký làm chủ salon — miễn phí" : "Register as a salon owner — free"}
            </Link>
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink-400">
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-sage-500" />
                {vi ? "Không cần thẻ tín dụng" : "No credit card needed"}
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-sage-500" />
                {vi ? "Sẵn sàng trong 5 phút" : "Ready in 5 minutes"}
              </span>
              <span className="flex items-center gap-1">
                <Check className="h-3.5 w-3.5 text-sage-500" />
                {vi ? "Không giới hạn lượt đặt" : "Unlimited bookings"}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-ink-100 bg-white">
        <div className="container grid grid-cols-2 gap-6 py-10 text-center sm:grid-cols-4">
          {[
            { value: vi ? "0đ" : "$0", label: vi ? "Phí sử dụng" : "Platform fee" },
            { value: "∞", label: vi ? "Lượt đặt lịch" : "Bookings" },
            { value: "∞", label: vi ? "Nhân viên" : "Staff members" },
            { value: "7", label: vi ? "Ngôn ngữ" : "Languages" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-ink-900 sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs text-ink-400 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits grid */}
      <section className="container py-16">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">
            {vi ? "Mọi thứ salon của bạn cần" : "Everything your salon needs"}
          </h2>
          <p className="mt-2 text-sm text-ink-400">
            {vi
              ? "Tất cả tính năng dưới đây đều hoàn toàn miễn phí, không giới hạn."
              : "Every feature below is completely free, with no limits."}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="card p-5">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${b.color}`}>
                <b.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-1.5 font-semibold text-ink-900">{b.title}</h3>
              <p className="text-sm text-ink-400">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Illustrative showcase */}
      <section className="bg-mist-50 py-16">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* Mock calendar + reminder toast */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="card p-4">
              <div className="mb-3 flex items-center gap-2">
                {[
                  { label: "L", color: "bg-primary-500" },
                  { label: "H", color: "bg-teal-500" },
                  { label: "R", color: "bg-coral-500" },
                ].map((s) => (
                  <span
                    key={s.label}
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${s.color}`}
                  >
                    {s.label}
                  </span>
                ))}
                <span className="ml-auto text-xs text-ink-400">
                  {vi ? "Hôm nay" : "Today"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <div className="h-10 rounded-lg border-l-4 border-primary-500 bg-primary-50" />
                  <div className="h-14 rounded-lg border-l-4 border-primary-500 bg-primary-50" />
                </div>
                <div className="space-y-2 pt-6">
                  <div className="h-14 rounded-lg border-l-4 border-teal-400 bg-teal-50" />
                  <div className="h-8 rounded-lg border-l-4 border-teal-400 bg-teal-50" />
                </div>
                <div className="space-y-2 pt-3">
                  <div className="h-8 rounded-lg border-l-4 border-coral-400 bg-coral-100" />
                  <div className="h-16 rounded-lg border-l-4 border-coral-400 bg-coral-100" />
                </div>
              </div>
            </div>
            <div className="animate-slide-up absolute -right-4 -top-6 flex max-w-[13rem] items-start gap-2 rounded-2xl bg-white p-3 text-left shadow-popover sm:-right-8">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-berry-50 text-berry-500">
                <BellRing className="h-4 w-4" />
              </span>
              <p className="text-xs text-ink-700">
                <span className="font-semibold text-ink-900">
                  {vi ? "Nhắc lịch hẹn" : "Reminder"}
                </span>
                <br />
                {vi ? "Lịch hẹn lúc 14:00 với chị Lan" : "Appointment at 2:00 PM with Lisa"}
              </p>
            </div>
          </div>

          {/* Mock review + gift card */}
          <div className="space-y-4">
            <div className="card flex items-start gap-3 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-50 text-lg font-bold text-coral-500">
                M
              </span>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-coral-500 text-coral-500" />
                  ))}
                </div>
                <p className="mt-1 text-sm text-ink-700">
                  {vi
                    ? "“Đặt lịch cực kỳ dễ, salon nhắn tin nhắc trước cả ngày!”"
                    : "“Booking was so easy, and they reminded me the day before!”"}
                </p>
                <p className="mt-1 text-xs text-ink-400">
                  {vi ? "Được gửi tự động sau lịch hẹn" : "Sent automatically after the visit"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-berry-500 to-primary-600 p-4 text-white shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Gift className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">{vi ? "Thẻ quà tặng" : "Gift card"}</p>
                <p className="text-sm text-white/80">
                  {vi ? "Tặng bạn 200.000₫ tại salon" : "€20 to spend at the salon"}
                </p>
              </div>
            </div>

            <div className="card p-4">
              <p className="mb-3 text-xs font-medium text-ink-400">
                {vi ? "Nhận đặt lịch từ mọi nơi" : "Take bookings from everywhere"}
              </p>
              <div className="flex items-center justify-between">
                {[Facebook, Instagram, MapPin, Globe].map((Icon, i) => (
                  <span
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-mist-100 text-ink-700"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
                <span className="text-ink-100">···</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-white">
                  <CalendarDays className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-16">
        <h2 className="mb-10 text-center text-2xl font-bold text-ink-900 sm:text-3xl">
          {vi ? "Bắt đầu chỉ với 3 bước" : "Get started in 3 steps"}
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="text-center">
              <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mb-1.5 font-semibold text-ink-900">{s.title}</h3>
              <p className="text-sm text-ink-400">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink-900">
        <div className="container flex flex-col items-center gap-4 py-16 text-center">
          <InfinityIcon className="h-8 w-8 text-primary-300" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {vi ? "Sẵn sàng đưa salon của bạn lên VaraaAi.Com?" : "Ready to bring your salon to VaraaAi.Com?"}
          </h2>
          <p className="max-w-md text-sm text-ink-100">
            {vi
              ? "Hoàn toàn miễn phí, đa ngôn ngữ, không giới hạn lượt đặt hay số lượng nhân viên."
              : "Completely free, multi-language, with no limits on bookings or staff."}
          </p>
          <Link href="/business/apply" className="btn-accent mt-2 !px-8 !py-3.5 text-base">
            {vi ? "Đăng ký ngay hôm nay" : "Register today"}
          </Link>
        </div>
      </section>
    </div>
  );
}
