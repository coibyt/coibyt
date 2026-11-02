import type { ReactNode } from "react";
import {
  AlertTriangle,
  Banknote,
  BellRing,
  CalendarDays,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Gift,
  GraduationCap,
  Hourglass,
  Image as ImageIcon,
  KeyRound,
  Landmark,
  Lock,
  Mail,
  Megaphone,
  Paperclip,
  Pencil,
  Plus,
  PlusSquare,
  Pointer,
  QrCode,
  Receipt,
  Reply,
  Share,
  Smile,
  Star,
  Ticket,
  Undo2,
  Upload,
  UserRound,
  Users,
} from "lucide-react";
import type { GuideArt } from "@/lib/staff-support";

/** Small drawings of the real screens, one per guide step on the staff
 * support page (Tiện ích → Hỗ trợ): the same labels as the app, with a gold
 * ring and a finger on what to tap. Plain HTML so they stay sharp, light and
 * translated. */

function Screen({ children, title, dark }: { children: ReactNode; title?: string; dark?: boolean }) {
  return (
    <div className={`relative mx-auto w-full max-w-[280px] overflow-hidden rounded-[1.6rem] p-2 shadow-[0_24px_50px_-30px_rgba(31,24,45,0.8)] ring-1 ${dark ? "bg-[#2a2140] ring-[#3b2f55]" : "bg-[#efeaf5] ring-[#e2d9ee]"}`}>
      <div className={`flex min-h-[176px] flex-col overflow-hidden rounded-[1.15rem] ${dark ? "bg-[#1f182d] text-white" : "bg-white text-ink-900"}`}>
        <div className={`flex items-center justify-between px-3 py-1.5 text-[9px] font-bold ${dark ? "text-white/60" : "text-ink-400"}`}>
          <span>
            Varaa<span className="text-[#9c7cd0]">Ai</span>
          </span>
          {title && <span className="truncate pl-2">{title}</span>}
        </div>
        <div className="relative flex flex-1 flex-col gap-1.5 px-3 pb-3">{children}</div>
      </div>
    </div>
  );
}

/** What to tap: a gold ring that breathes, and a finger. */
function Tap({ children, className = "", finger = true }: { children: ReactNode; className?: string; finger?: boolean }) {
  return (
    <span className={`relative inline-flex ${className}`}>
      <span className="pointer-events-none absolute -inset-1 animate-pulse rounded-[inherit] ring-2 ring-[#d9b25c]" />
      {children}
      {finger && (
        <Pointer className="pointer-events-none absolute -bottom-3 -right-2 h-5 w-5 rotate-[-12deg] fill-white text-[#1f182d] drop-shadow" />
      )}
    </span>
  );
}

const Btn = ({ children, tone = "dark", className = "" }: { children: ReactNode; tone?: "dark" | "gold" | "light" | "red" | "blue"; className?: string }) => (
  <span
    className={`inline-flex items-center justify-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold ${
      tone === "dark"
        ? "bg-[#1f182d] text-white"
        : tone === "gold"
          ? "bg-gradient-to-r from-[#d9b25c] to-[#b9852d] text-white"
          : tone === "red"
            ? "bg-berry-50 text-berry-600 ring-1 ring-berry-100"
            : tone === "blue"
              ? "bg-[#229ED9] text-white"
              : "bg-white text-ink-700 ring-1 ring-ink-100"
    } ${className}`}
  >
    {children}
  </span>
);

const Field = ({ label, value, focus }: { label: string; value?: string; focus?: boolean }) => (
  <span className="block">
    <span className="block text-[8px] font-semibold text-ink-400">{label}</span>
    <span className={`mt-0.5 block truncate rounded-lg border px-2 py-1 text-[10px] ${focus ? "border-[#d9b25c] bg-[#fffaf0] text-ink-900" : "border-ink-100 text-ink-700"}`}>
      {value ?? " "}
    </span>
  </span>
);

const BookingBlock = ({ time, name, service, tone = "teal" }: { time: string; name: string; service: string; tone?: "teal" | "plum" }) => (
  <span className={`block rounded-xl border-l-[3px] px-2 py-1 text-[9px] leading-tight ${tone === "teal" ? "border-teal-500 bg-teal-50 text-teal-900" : "border-[#624f89] bg-[#f1ecf8] text-[#40325c]"}`}>
    <span className="block opacity-70">{time}</span>
    <span className="block text-[10px] font-bold">{name}</span>
    <span className="block truncate opacity-80">{service}</span>
  </span>
);

function Stars({ n, tapAt }: { n: number; tapAt?: number }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const star = <Star className={`h-4 w-4 ${i < n ? "fill-coral-500 text-coral-500" : "text-ink-200"}`} />;
        return <span key={i}>{tapAt === i ? <Tap className="rounded-full">{star}</Tap> : star}</span>;
      })}
    </span>
  );
}

type Art = (p: { vi: boolean }) => ReactNode;
const l = (vi: boolean, a: string, b: string) => (vi ? a : b);

const ART: Record<GuideArt, Art> = {
  signin: ({ vi }) => (
    <Screen title={l(vi, "Đăng nhập", "Sign in")}>
      <p className="mt-1 text-center text-xs font-bold">{l(vi, "Chào mừng trở lại", "Welcome back")}</p>
      <Field label="Email" value="lisa@salon.fi" />
      <Field label={l(vi, "Mật khẩu", "Password")} value="••••••••" focus />
      <Tap className="mt-1 self-stretch rounded-full">
        <Btn className="w-full py-1.5">
          <KeyRound className="h-3 w-3" /> {l(vi, "Đăng nhập", "Sign in")}
        </Btn>
      </Tap>
    </Screen>
  ),
  "install-android": ({ vi }) => (
    <Screen title="varaaai.com/app">
      <span className="mx-auto mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#624f89] to-[#1f182d] text-lg font-black text-white">V</span>
      <p className="text-center text-[11px] font-bold">{l(vi, "Cài ứng dụng VaraaAi", "Install the VaraaAi app")}</p>
      <Tap className="self-center rounded-full">
        <Btn tone="gold" className="px-4 py-1.5">
          {l(vi, "Cài đặt ứng dụng", "Install app")}
        </Btn>
      </Tap>
      <span className="mt-2 rounded-xl bg-ink-900/90 p-2 text-[9px] text-white">
        {l(vi, "Cài đặt ứng dụng?", "Install app?")}
        <span className="mt-1 flex justify-end gap-2 font-bold">
          <span className="opacity-60">{l(vi, "Huỷ", "Cancel")}</span>
          <span className="text-[#9cc8ff]">{l(vi, "Cài đặt", "Install")}</span>
        </span>
      </span>
    </Screen>
  ),
  "install-ios": ({ vi }) => (
    <Screen title="Safari">
      <span className="rounded-xl bg-mist-50 p-2 text-[9px] text-ink-700">
        <span className="flex items-center justify-between border-b border-ink-100 pb-1">
          {l(vi, "Sao chép", "Copy")} <span>⧉</span>
        </span>
        <span className="flex items-center justify-between py-1">
          <Tap className="rounded-md" finger={false}>
            <span className="font-bold text-ink-900">{l(vi, "Thêm vào Màn hình chính", "Add to Home Screen")}</span>
          </Tap>
          <PlusSquare className="h-3.5 w-3.5" />
        </span>
      </span>
      <span className="mt-auto flex items-center justify-around border-t border-ink-100 pt-1.5 text-ink-400">
        <ChevronLeft className="h-4 w-4" />
        <ChevronRight className="h-4 w-4" />
        <Tap className="rounded-md">
          <Share className="h-4 w-4 text-[#2f7cf6]" />
        </Tap>
        <span className="text-[9px]">▢</span>
      </span>
    </Screen>
  ),
  alarm: ({ vi }) => (
    <Screen dark>
      <span className="mx-auto mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#c99a3f]/25 text-[#e8d3a6]">
        <BellRing className="h-5 w-5" />
      </span>
      <p className="text-center text-[11px] font-bold">{l(vi, "Bật chuông báo lịch hẹn mới", "Turn on the new-booking alarm")}</p>
      <p className="text-center text-[9px] text-white/60">{l(vi, "Điện thoại đổ chuông và rung khi có khách đặt lịch.", "Your phone rings and vibrates when a customer books.")}</p>
      <span className="mt-1 flex justify-center gap-2">
        <Btn tone="light">{l(vi, "Để sau", "Later")}</Btn>
        <Tap className="rounded-full">
          <Btn tone="gold">{l(vi, "Bật chuông", "Turn on")}</Btn>
        </Tap>
      </span>
    </Screen>
  ),
  "calendar-own": ({ vi }) => (
    <Screen title={l(vi, "Lịch hẹn", "Bookings")}>
      <Tap className="rounded-lg" finger={false}>
        <span className="block w-full rounded-lg border border-teal-200 bg-teal-50 px-2 py-1 text-[9px] font-semibold text-teal-700">
          {l(vi, "Giờ làm việc của bạn hôm nay: 10:30 – 18:00", "Your working hours today: 10:30 – 18:00")}
        </span>
      </Tap>
      <span className="grid grid-cols-[28px_1fr] gap-1 text-[8px] text-ink-400">
        <span className="space-y-5 pt-1">
          <span className="block">10:00</span>
          <span className="block">11:00</span>
          <span className="block">12:00</span>
        </span>
        <span className="relative space-y-1">
          <span className="block h-5 rounded-md bg-[repeating-linear-gradient(135deg,#ece8f3_0_5px,transparent_5px_10px)]" />
          <BookingBlock time="11:30–13:00" name="Sara P." service={l(vi, "Nối mi volume", "Volume lashes")} />
        </span>
      </span>
    </Screen>
  ),
  "bottom-bar": ({ vi }) => (
    <Screen title={l(vi, "Lịch hẹn", "Bookings")}>
      <span className="mt-auto flex items-center gap-1 rounded-full bg-white p-1 text-[9px] font-semibold shadow-md ring-1 ring-ink-100">
        <Tap className="rounded-full" finger={false}>
          <ChevronLeft className="h-3.5 w-3.5" />
        </Tap>
        <Tap className="rounded-md">
          <span className="flex items-center gap-0.5">
            <CalendarDays className="h-3 w-3" /> {l(vi, "T2, 2/11", "Mon 11/2")}
          </span>
        </Tap>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="h-3.5 w-3.5 rounded-full border-2 border-ink-300" />
        <span className="ml-auto rounded-full bg-[#40325c] px-1.5 py-0.5 text-white">{l(vi, "Ngày", "Day")}</span>
        <span>{l(vi, "Tuần", "Week")}</span>
        <span>{l(vi, "Tháng", "Month")}</span>
      </span>
    </Screen>
  ),
  "show-all": ({ vi }) => (
    <Screen title={l(vi, "Lịch hẹn", "Bookings")}>
      <span className="flex flex-wrap gap-1 text-[9px] font-semibold">
        <Tap className="rounded-full">
          <span className="rounded-full bg-white px-2 py-0.5 ring-1 ring-ink-100">{l(vi, "Hiện tất cả", "Show all")}</span>
        </Tap>
        <span className="flex items-center gap-1 rounded-full bg-[#f1ecf8] px-2 py-0.5 ring-1 ring-[#cdbfe0]">
          <span className="h-1.5 w-1.5 rounded-full bg-coral-500" /> Tesa
        </span>
        <span className="flex items-center gap-1 rounded-full px-2 py-0.5 ring-1 ring-ink-100">
          <span className="h-1.5 w-1.5 rounded-full bg-ink-200" /> Lisa
        </span>
      </span>
      <span className="mt-2 grid grid-cols-3 gap-1">
        {["Tesa", "Lisa", "Rose"].map((n, i) => (
          <span key={n} className="text-center text-[9px] font-semibold">
            <span className={`mx-auto mb-0.5 flex h-6 w-6 items-center justify-center rounded-full text-[10px] text-white ${["bg-coral-500", "bg-teal-600", "bg-[#624f89]"][i]}`}>{n[0]}</span>
            {n}
          </span>
        ))}
      </span>
    </Screen>
  ),
  "booking-detail": ({ vi }) => (
    <Screen title={l(vi, "Chi tiết lịch hẹn", "Booking details")}>
      <p className="text-[11px] font-bold">Sara Pentti</p>
      <span className="space-y-0.5 text-[9px] text-ink-700">
        <span className="block">✦ {l(vi, "Nối mi volume", "Volume lashes")} · 65,00 €</span>
        <span className="block">⏱ 11:30 – 13:00 · Tesa</span>
        <span className="block rounded-lg bg-mist-50 px-1.5 py-1 italic">“{l(vi, "Mắt hơi nhạy cảm", "Slightly sensitive eyes")}”</span>
      </span>
      <span className="mt-auto flex flex-wrap gap-1">
        <Btn>{l(vi, "Hoàn thành", "Complete")}</Btn>
        <Btn tone="light">{l(vi, "Không đến", "No-show")}</Btn>
        <Btn tone="gold">
          <Receipt className="h-3 w-3" /> {l(vi, "Báo cáo thu nhập", "Report income")}
        </Btn>
      </span>
    </Screen>
  ),
  "overdue-banner": ({ vi }) => (
    <Screen title={l(vi, "Lịch hẹn", "Bookings")}>
      <span className="block rounded-xl bg-gradient-to-br from-[#d6264f] to-[#a3123a] p-2 text-white">
        <span className="flex items-center gap-1.5 text-[9px] font-extrabold leading-tight">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          {l(vi, "Bạn có 3 lịch hẹn chưa báo cáo thu nhập quá 24 giờ", "3 bookings over 24 hours old need an income report")}
        </span>
        <span className="mt-1.5 flex gap-1">
          <Tap className="rounded-full">
            <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-[#a3123a]">{l(vi, "T7, 31/10 · 2 lịch", "Sat 10/31 · 2")}</span>
          </Tap>
          <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-[#a3123a]">{l(vi, "CN, 1/11 · 1 lịch", "Sun 11/1 · 1")}</span>
        </span>
      </span>
    </Screen>
  ),
  "status-complete": ({ vi }) => (
    <Screen title={l(vi, "Chi tiết lịch hẹn", "Booking details")}>
      <BookingBlock time="11:30–13:00" name="Sara Pentti" service={l(vi, "Nối mi volume", "Volume lashes")} />
      <span className="mt-auto flex flex-wrap gap-1">
        <Tap className="rounded-full">
          <Btn>
            <CheckCircle2 className="h-3 w-3" /> {l(vi, "Hoàn thành", "Complete")}
          </Btn>
        </Tap>
        <Btn tone="light">{l(vi, "Không đến", "No-show")}</Btn>
        <Btn tone="light">{l(vi, "Huỷ", "Cancel")}</Btn>
      </span>
    </Screen>
  ),
  "status-noshow": ({ vi }) => (
    <Screen title={l(vi, "Chi tiết lịch hẹn", "Booking details")}>
      <BookingBlock time="14:00–15:00" name="Anna K." service={l(vi, "Sơn gel", "Gel polish")} />
      <span className="mt-auto flex flex-wrap gap-1">
        <Btn tone="light">{l(vi, "Hoàn thành", "Complete")}</Btn>
        <Tap className="rounded-full">
          <Btn tone="red">{l(vi, "Không đến", "No-show")}</Btn>
        </Tap>
        <Btn tone="light">{l(vi, "Huỷ", "Cancel")}</Btn>
      </span>
    </Screen>
  ),
  "view-only": ({ vi }) => (
    <Screen title={l(vi, "Lịch của Lisa", "Lisa's booking")}>
      <BookingBlock time="12:00–13:00" name="Mia L." service={l(vi, "Cắt tóc", "Haircut")} tone="plum" />
      <span className="mt-auto flex items-center gap-1.5 rounded-xl bg-mist-50 px-2 py-1.5 text-[9px] text-ink-500">
        <Lock className="h-3.5 w-3.5 shrink-0" />
        {l(vi, "Lịch của đồng nghiệp — chỉ xem", "A colleague's booking — view only")}
      </span>
    </Screen>
  ),
  "long-press": ({ vi }) => (
    <Screen title={l(vi, "Lịch hẹn", "Bookings")}>
      <p className="text-[9px] text-ink-400">{l(vi, "Nhấn giữ khoảng 1 giây vào ô trống để tạo lịch hẹn mới.", "Press and hold an empty slot to add a booking.")}</p>
      <span className="grid grid-cols-[28px_1fr] gap-1 text-[8px] text-ink-400">
        <span className="space-y-4 pt-1">
          <span className="block">14:00</span>
          <span className="block">15:00</span>
        </span>
        <span className="relative space-y-1">
          <span className="block h-6 rounded-md border border-dashed border-ink-100" />
          <Tap className="w-full rounded-md">
            <span className="block h-6 w-full rounded-md bg-[#fffaf0] text-center text-[9px] font-bold leading-6 text-[#8a6a2c]">15:00</span>
          </Tap>
        </span>
      </span>
    </Screen>
  ),
  "new-booking": ({ vi }) => (
    <Screen title={l(vi, "Lịch hẹn mới", "New booking")}>
      <Field label={l(vi, "Dịch vụ", "Service")} value={l(vi, "Sơn gel · 60 phút", "Gel polish · 60 min")} />
      <span className="grid grid-cols-2 gap-1">
        <Field label={l(vi, "Tên khách", "Customer")} value="Anna K." focus />
        <Field label={l(vi, "Điện thoại", "Phone")} value="040 123 4567" focus />
      </span>
      <Tap className="mt-1 self-start rounded-full">
        <Btn>{l(vi, "Đặt lịch", "Book")}</Btn>
      </Tap>
    </Screen>
  ),
  "block-time": ({ vi }) => (
    <Screen title={l(vi, "Lịch hẹn mới", "New booking")}>
      <span className="rounded-lg border border-ink-100 text-[9px]">
        <span className="block border-b border-ink-100 px-2 py-0.5 text-[8px] font-bold uppercase text-ink-400">{l(vi, "Thời gian cá nhân", "Personal time")}</span>
        <span className="block bg-[#fffaf0] px-2 py-0.5 font-semibold text-[#8a6a2c]">☕ {l(vi, "Nghỉ trưa", "Lunch")}</span>
        <span className="block px-2 py-0.5">{l(vi, "Việc riêng", "Personal")}</span>
      </span>
      <Tap className="mt-1 self-start rounded-full">
        <Btn>
          <Lock className="h-3 w-3" /> {l(vi, "Khoá giờ", "Block time")}
        </Btn>
      </Tap>
    </Screen>
  ),
  rating: ({ vi }) => (
    <Screen title={l(vi, "Chi tiết lịch hẹn", "Booking details")}>
      <BookingBlock time="11:30–13:00" name="Sara Pentti" service={l(vi, "Nối mi volume", "Volume lashes")} />
      <span className="mt-1 border-t border-ink-100 pt-1.5">
        <span className="block text-[10px] font-semibold">{l(vi, "Đánh giá khách hàng này", "Rate this customer")}</span>
        <span className="mt-1 block">
          <Stars n={0} tapAt={4} />
        </span>
        <span className="mt-1 block text-[8px] text-ink-400">{l(vi, "Chỉ dùng nội bộ — chủ salon duyệt xong, khách mới nhận email.", "Internal — the customer is emailed once the owner approves.")}</span>
      </span>
    </Screen>
  ),
  "rating-wait": ({ vi }) => (
    <Screen title={l(vi, "Chi tiết lịch hẹn", "Booking details")}>
      <span className="block text-[10px] font-semibold">{l(vi, "Đánh giá khách hàng này", "Rate this customer")}</span>
      <Stars n={5} />
      <span className="flex items-center gap-1 self-start rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700">
        <Hourglass className="h-3 w-3" /> {l(vi, "Chờ chủ salon duyệt", "Waiting for the owner's approval")}
      </span>
      <span className="mt-auto flex items-center gap-1.5 rounded-xl bg-mist-50 p-1.5 text-[9px] text-ink-500">
        <Mail className="h-3.5 w-3.5 shrink-0 text-[#624f89]" />
        {l(vi, "Duyệt xong → khách nhận email số sao", "Approved → the customer gets the stars by email")}
      </span>
    </Screen>
  ),
  "income-button": ({ vi }) => (
    <Screen title={l(vi, "Chi tiết lịch hẹn", "Booking details")}>
      <BookingBlock time="11:30–13:00" name="Sara Pentti" service={l(vi, "Nối mi volume · 65,00 €", "Volume lashes · €65.00")} />
      <Tap className="mt-auto self-start rounded-full">
        <Btn tone="gold" className="px-3 py-1.5">
          <Receipt className="h-3 w-3" /> {l(vi, "Báo cáo thu nhập", "Report income")}
        </Btn>
      </Tap>
    </Screen>
  ),
  "income-form": ({ vi }) => (
    <Screen title={l(vi, "Báo cáo thu nhập", "Report income")}>
      <span className="flex items-center justify-between text-[9px]">
        <span className="text-ink-400">{l(vi, "Cần thu", "Due")}</span>
        <span className="font-bold">65,00 €</span>
      </span>
      {[
        [Banknote, l(vi, "Tiền mặt", "Cash"), "0,00"],
        [Landmark, l(vi, "Ngân hàng / thẻ", "Bank / card"), "65,00"],
        [Gift, l(vi, "Thẻ quà tặng", "Gift card"), "0,00"],
      ].map(([Icon, label, v], i) => {
        const I = Icon as typeof Banknote;
        return (
          <span key={i} className={`flex items-center justify-between rounded-lg border px-2 py-1 text-[9px] ${i === 1 ? "border-[#d9b25c] bg-[#fffaf0]" : "border-ink-100"}`}>
            <span className="flex items-center gap-1">
              <I className="h-3 w-3 text-ink-400" /> {label as string}
            </span>
            <span className="font-semibold tabular-nums">{v as string} €</span>
          </span>
        );
      })}
      <Tap className="self-start rounded-full">
        <Btn tone="light">{l(vi, "Điền đủ", "Fill in")}</Btn>
      </Tap>
    </Screen>
  ),
  "income-tip": ({ vi }) => (
    <Screen title={l(vi, "Báo cáo thu nhập", "Report income")}>
      <Field label={l(vi, "Tiền tip của bạn", "Your tip")} value="5,00 €" focus />
      <Tap className="self-stretch rounded-xl" finger={false}>
        <span className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#d9b25c] bg-[#fffaf0] py-2 text-[9px] font-semibold text-[#8a6a2c]">
          <Upload className="h-3.5 w-3.5" /> {l(vi, "Ảnh biên lai máy quẹt thẻ", "Card-terminal receipt photo")}
        </span>
      </Tap>
      <span className="mt-auto flex justify-end">
        <Btn>{l(vi, "Gửi báo cáo", "Send report")}</Btn>
      </span>
    </Screen>
  ),
  "income-status": ({ vi }) => (
    <Screen title={l(vi, "Doanh thu của tôi", "My income")}>
      {[
        ["Sara P.", "65,00 €", true],
        ["Anna K.", "42,00 €", false],
      ].map(([n, v, ok]) => (
        <span key={n as string} className="flex items-center justify-between rounded-xl bg-mist-50 px-2 py-1.5 text-[9px]">
          <span className="font-semibold">{n as string}</span>
          <span className="flex items-center gap-1">
            <span className="tabular-nums">{v as string}</span>
            {ok ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            ) : (
              <span className="rounded-full bg-amber-50 px-1.5 text-[8px] font-bold text-amber-700">{l(vi, "Chờ duyệt", "Pending")}</span>
            )}
          </span>
        </span>
      ))}
      <span className="mt-auto text-[8px] text-ink-400">✓ {l(vi, "Dấu tích xanh = chủ salon đã duyệt", "Green tick = approved by the owner")}</span>
    </Screen>
  ),
  "income-rejected": ({ vi }) => (
    <Screen title={l(vi, "Doanh thu của tôi", "My income")}>
      <span className="rounded-xl bg-berry-50 p-2 text-[9px] text-berry-700">
        <span className="font-bold">{l(vi, "Chưa duyệt", "Not approved")}</span>
        <span className="mt-0.5 block italic">“{l(vi, "Khách trả tiền mặt 40 €, không phải 45 €", "Customer paid €40 cash, not €45")}”</span>
      </span>
      <Tap className="mt-auto self-start rounded-full">
        <Btn>
          <Pencil className="h-3 w-3" /> {l(vi, "Sửa và gửi lại", "Fix and send again")}
        </Btn>
      </Tap>
    </Screen>
  ),
  "qr-card": ({ vi }) => (
    <Screen dark title={l(vi, "Thẻ thành viên VIP", "VIP member card")}>
      <span className="mx-auto mt-1 rounded-xl bg-white p-1.5">
        <QrCode className="h-14 w-14 text-[#1f182d]" />
      </span>
      <span className="text-center font-mono text-[9px] tracking-widest text-[#e8d3a6]">K7Q2-M9XP</span>
      <span className="flex justify-center gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Ticket key={i} className={`h-3 w-3 ${i < 6 ? "text-[#e8d3a6]" : "text-white/20"}`} />
        ))}
      </span>
    </Screen>
  ),
  "scan-add": ({ vi }) => (
    <Screen title={l(vi, "Thẻ của khách", "Customer's card")}>
      <span className="flex items-center gap-1.5 text-[9px] text-ink-500">
        <Camera className="h-3.5 w-3.5" /> {l(vi, "Đã quét mã QR", "QR scanned")}
      </span>
      <p className="text-[11px] font-bold">Sara Pentti</p>
      <span className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Ticket key={i} className={`h-3 w-3 ${i < 6 ? "text-[#b9852d]" : "text-ink-100"}`} />
        ))}
      </span>
      <Tap className="mt-auto self-start rounded-full">
        <Btn tone="gold" className="px-3 py-1.5">
          <Plus className="h-3 w-3" /> {l(vi, "Cộng 1 vé", "Add 1 ticket")}
        </Btn>
      </Tap>
    </Screen>
  ),
  "code-input": ({ vi }) => (
    <Screen title={l(vi, "Thẻ tích điểm", "Loyalty cards")}>
      <p className="text-[10px] font-bold">{l(vi, "Quét thẻ khi khách đến", "Scan a card when a customer visits")}</p>
      <span className="flex gap-1">
        <span className="flex-1">
          <Field label={l(vi, "Mã thẻ", "Card code")} value="K7Q2-M9XP" focus />
        </span>
        <Tap className="self-end rounded-full">
          <Btn>{l(vi, "Cộng 1 vé", "Add 1 ticket")}</Btn>
        </Tap>
      </span>
    </Screen>
  ),
  reward: ({ vi }) => (
    <Screen title={l(vi, "Thẻ tích điểm", "Loyalty cards")}>
      <span className="flex items-center gap-1.5 rounded-xl bg-emerald-50 px-2 py-1.5 text-[9px] font-bold text-emerald-700">
        <Gift className="h-3.5 w-3.5" /> {l(vi, "Đủ vé — 10/10", "Reward ready — 10/10")}
      </span>
      <span className="flex gap-0.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Ticket key={i} className="h-3 w-3 text-[#b9852d]" />
        ))}
      </span>
      <Tap className="mt-auto self-stretch rounded-full">
        <span className="w-full rounded-full bg-gradient-to-r from-coral-500 to-berry-500 py-1.5 text-center text-[10px] font-bold text-white">
          {l(vi, "Áp dụng giảm 15%", "Apply 15% off")}
        </span>
      </Tap>
    </Screen>
  ),
  "activate-form": ({ vi }) => (
    <Screen title={l(vi, "Thẻ tích điểm", "Loyalty cards")}>
      <p className="text-[10px] font-bold">{l(vi, "Kích hoạt thẻ cho khách", "Activate a card for a customer")}</p>
      <Field label={l(vi, "Họ tên", "Name")} value="Anna Korhonen" />
      <Field label="Email" value="anna@email.fi" focus />
      <Tap className="mt-1 self-stretch rounded-full">
        <Btn className="w-full py-1.5">
          <Mail className="h-3 w-3" /> {l(vi, "Kích hoạt và gửi QR qua email", "Activate and email the QR")}
        </Btn>
      </Tap>
    </Screen>
  ),
  "card-email": ({ vi }) => (
    <Screen title={l(vi, "Hộp thư của khách", "Customer's inbox")}>
      <span className="flex items-start gap-1.5 rounded-xl bg-mist-50 p-2 text-[9px]">
        <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#624f89]" />
        <span>
          <span className="block font-bold">{l(vi, "Thẻ thành viên VIP của bạn", "Your VIP member card")}</span>
          <span className="block text-ink-500">Moja Beauty</span>
        </span>
      </span>
      <span className="mx-auto rounded-lg bg-white p-1 ring-1 ring-ink-100">
        <QrCode className="h-10 w-10" />
      </span>
      <span className="flex justify-center">
        <Btn tone="gold">{l(vi, "Xem thẻ của tôi", "View my card")}</Btn>
      </span>
    </Screen>
  ),
  "chat-list": ({ vi }) => (
    <Screen title={l(vi, "Nhóm chat", "Team chat")}>
      <Tap className="w-full rounded-xl" finger={false}>
        <span className="flex w-full items-center gap-2 rounded-xl bg-[#f1ecf8] p-1.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1f182d] text-[#e8d3a6]">
            <Users className="h-3.5 w-3.5" />
          </span>
          <span className="min-w-0 text-[9px]">
            <span className="block font-bold">{l(vi, "Cả salon", "Whole salon")}</span>
            <span className="block truncate text-ink-500">Rose: {l(vi, "Chiều nay ai rảnh?", "Who's free this afternoon?")}</span>
          </span>
        </span>
      </Tap>
      <span className="flex items-center gap-2 p-1.5 text-[9px]">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-white">L</span>
        <span className="font-semibold">Lisa</span>
      </span>
    </Screen>
  ),
  "new-chat": ({ vi }) => (
    <Screen title={l(vi, "Nhóm chat", "Team chat")}>
      <span className="self-start">
        <Btn tone="light">
          <Plus className="h-3 w-3" /> {l(vi, "Trò chuyện mới", "New chat")}
        </Btn>
      </span>
      <span className="flex gap-1">
        <Tap className="rounded-full" finger={false}>
          <Btn>
            <UserRound className="h-3 w-3" /> {l(vi, "Nhắn riêng", "Direct")}
          </Btn>
        </Tap>
        <Tap className="rounded-full">
          <Btn tone="light">
            <Users className="h-3 w-3" /> {l(vi, "Tạo nhóm", "New group")}
          </Btn>
        </Tap>
      </span>
    </Screen>
  ),
  composer: ({ vi }) => (
    <Screen title={l(vi, "Cả salon", "Whole salon")}>
      <span className="self-start rounded-2xl rounded-bl-md bg-mist-50 px-2 py-1 text-[9px]">{l(vi, "Mẫu móng hôm nay nè 💅", "Today's nail design 💅")}</span>
      <span className="flex h-12 w-16 items-center justify-center self-end rounded-xl bg-gradient-to-br from-[#f3d6e4] to-[#d8c7ef]">
        <ImageIcon className="h-5 w-5 text-white" />
      </span>
      <span className="mt-auto flex items-center gap-1.5 rounded-full bg-mist-50 p-1 text-ink-400">
        <Tap className="rounded-full">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1f182d] text-white">
            <Plus className="h-3 w-3" />
          </span>
        </Tap>
        <span className="flex-1 text-[9px]">{l(vi, "Nhắn tin…", "Message…")}</span>
        <Smile className="h-4 w-4 text-[#b08a3e]" />
        <Paperclip className="h-3.5 w-3.5" />
      </span>
    </Screen>
  ),
  "message-menu": ({ vi }) => (
    <Screen title={l(vi, "Cả salon", "Whole salon")}>
      <Tap className="self-end rounded-2xl" finger={false}>
        <span className="rounded-2xl rounded-br-md bg-[#1f182d] px-2 py-1 text-[9px] text-white">{l(vi, "Mình đổi ca thứ 7 nhé", "I'll swap my Saturday shift")}</span>
      </Tap>
      <span className="flex justify-end gap-1 text-sm">
        <span>❤️</span>
        <span>👍</span>
        <span>😂</span>
      </span>
      <span className="ml-auto w-28 rounded-xl bg-white text-[9px] shadow-lg ring-1 ring-ink-100">
        <span className="flex items-center gap-1.5 px-2 py-1">
          <Reply className="h-3 w-3" /> {l(vi, "Trả lời", "Reply")}
        </span>
        <span className="flex items-center gap-1.5 px-2 py-1">
          <Pencil className="h-3 w-3" /> {l(vi, "Sửa", "Edit")}
        </span>
        <span className="flex items-center gap-1.5 px-2 py-1 text-berry-600">
          <Undo2 className="h-3 w-3" /> {l(vi, "Thu hồi", "Unsend")}
        </span>
      </span>
    </Screen>
  ),
  notice: ({ vi }) => (
    <Screen title={l(vi, "Thông báo", "Notices")}>
      <span className="rounded-xl bg-[#fffaf0] p-2 ring-1 ring-[#ecd9ad]">
        <span className="flex items-center gap-1 text-[10px] font-bold">
          <Megaphone className="h-3.5 w-3.5 text-[#b08a3e]" /> {l(vi, "Lịch làm tháng 12", "December rota")}
        </span>
        <span className="mt-0.5 block text-[9px] text-ink-500">{l(vi, "Salon mở thêm Chủ nhật từ 1/12…", "We open on Sundays from 1 Dec…")}</span>
      </span>
      <Tap className="mt-auto self-start rounded-full">
        <Btn>
          <CheckCircle2 className="h-3 w-3" /> {l(vi, "Tôi đã đọc và nắm rõ", "I've read and understood")}
        </Btn>
      </Tap>
    </Screen>
  ),
  training: ({ vi }) => (
    <Screen title={l(vi, "Đào tạo", "Training")}>
      {[
        [l(vi, "Quy trình vệ sinh dụng cụ", "Tool hygiene routine"), true],
        [l(vi, "Chào khách chuẩn salon", "Greeting customers"), false],
      ].map(([title, req]) => (
        <span key={title as string} className="flex items-center gap-2 rounded-xl bg-mist-50 p-1.5 text-[9px]">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#624f89] to-[#1f182d] text-[#e8d3a6]">
            <GraduationCap className="h-3.5 w-3.5" />
          </span>
          <span className="min-w-0 flex-1 truncate font-semibold">{title as string}</span>
          {req && (
            <Tap className="rounded-full" finger={false}>
              <span className="rounded-full bg-berry-50 px-1.5 text-[8px] font-bold text-berry-600">{l(vi, "Bắt buộc", "Required")}</span>
            </Tap>
          )}
        </span>
      ))}
    </Screen>
  ),
  "lesson-done": ({ vi }) => (
    <Screen title={l(vi, "Bài học", "Lesson")}>
      <span className="flex h-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#2a2140] to-[#40325c] text-[#e8d3a6]">▶</span>
      <span className="text-[10px] font-bold">{l(vi, "Quy trình vệ sinh dụng cụ", "Tool hygiene routine")}</span>
      <Tap className="mt-auto self-start rounded-full">
        <Btn tone="gold">
          <CheckCircle2 className="h-3 w-3" /> {l(vi, "Đánh dấu đã hoàn thành", "Mark as completed")}
        </Btn>
      </Tap>
    </Screen>
  ),
};

export function GuideArtView({ art, locale }: { art: GuideArt; locale: string }) {
  const A = ART[art];
  return <A vi={locale === "vi"} />;
}

