import {
  MapPin,
  Image as ImageIcon,
  Scissors,
  Users,
  Clock,
  Landmark,
  Share2,
  Code2,
  CalendarDays,
  ArrowRight,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

interface Step {
  icon: React.ComponentType<{ className?: string }>;
  titleVi: string;
  titleEn: string;
  descVi: string;
  descEn: string;
  href: string;
}

const STEPS: Step[] = [
  {
    icon: MapPin,
    titleVi: "Cập nhật thông tin salon",
    titleEn: "Update your salon info",
    descVi:
      "Sửa tên, địa chỉ (kéo ghim trên bản đồ để chỉnh vị trí chính xác) và chọn các danh mục dịch vụ phù hợp — khách hàng dùng danh mục này để tìm thấy bạn.",
    descEn:
      "Edit your name, address (drag the map pin to fine-tune the exact location), and pick the service categories that fit — customers search by these to find you.",
    href: "/business/dashboard/settings",
  },
  {
    icon: ImageIcon,
    titleVi: "Tải ảnh đại diện & ảnh bìa",
    titleEn: "Upload a logo & cover photo",
    descVi: "Một salon có hình ảnh rõ ràng, chuyên nghiệp sẽ thu hút khách hàng nhấp vào hơn.",
    descEn: "A salon with clear, professional photos gets a lot more clicks from customers.",
    href: "/business/dashboard/settings",
  },
  {
    icon: Scissors,
    titleVi: "Thêm dịch vụ",
    titleEn: "Add your services",
    descVi:
      "Đặt tên, giá, thời lượng và mô tả cho từng dịch vụ. Bạn cũng có thể thêm dịch vụ phụ (add-on) để khách chọn thêm khi đặt lịch.",
    descEn:
      "Set a name, price, duration and description for each service. You can also add optional add-ons customers can pick when booking.",
    href: "/business/dashboard/services",
  },
  {
    icon: Users,
    titleVi: "Thêm nhân viên",
    titleEn: "Add your staff",
    descVi:
      "Thêm từng nhân viên và gán họ vào các dịch vụ họ thực hiện được. Bạn cũng có thể đặt giờ làm việc riêng cho mỗi người.",
    descEn:
      "Add each staff member and assign them to the services they perform. You can also set individual working hours per person.",
    href: "/business/dashboard/staff",
  },
  {
    icon: Clock,
    titleVi: "Cài đặt giờ mở cửa",
    titleEn: "Set your opening hours",
    descVi: "Khách hàng chỉ có thể đặt lịch trong khung giờ salon mở cửa.",
    descEn: "Customers can only book within the hours your salon is open.",
    href: "/business/dashboard/hours",
  },
  {
    icon: Landmark,
    titleVi: "Thiết lập nhận thanh toán",
    titleEn: "Set up how you get paid",
    descVi:
      "Nhập thông tin tài khoản ngân hàng để khách có thể chuyển khoản trực tiếp cho bạn, ngoài lựa chọn thanh toán tại salon.",
    descEn:
      "Enter your bank account details so customers can pay by transfer directly, alongside paying at the salon.",
    href: "/business/dashboard/settings",
  },
  {
    icon: Share2,
    titleVi: "Thêm liên hệ & mạng xã hội",
    titleEn: "Add contact & social links",
    descVi:
      "Số điện thoại, Facebook, Instagram, TikTok, WhatsApp — hiển thị trên trang công khai để khách liên hệ trực tiếp.",
    descEn:
      "Phone, Facebook, Instagram, TikTok, WhatsApp — shown on your public page so customers can reach you directly.",
    href: "/business/dashboard/settings",
  },
  {
    icon: Code2,
    titleVi: "Nhúng trang đặt lịch lên website riêng",
    titleEn: "Embed booking on your own website",
    descVi: "Lấy đoạn mã nhúng để khách có thể đặt lịch ngay trên website của salon bạn.",
    descEn: "Grab an embed code so customers can book right from your salon's own website.",
    href: "/business/dashboard/settings",
  },
  {
    icon: CalendarDays,
    titleVi: "Quản lý lịch hẹn",
    titleEn: "Manage your calendar",
    descVi:
      "Xem lịch theo ngày/tuần/tháng, kéo-thả để đổi giờ hẹn, hoặc nhấp vào khung giờ trống để đặt lịch giúp khách qua điện thoại.",
    descEn:
      "View day/week/month, drag-and-drop to reschedule, or click an empty slot to book for a customer over the phone.",
    href: "/business/dashboard/bookings",
  },
];

export default async function GettingStartedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === "vi";

  return (
    <div className="container max-w-3xl py-14">
      <h1 className="mb-2 text-2xl font-bold text-ink-900">
        {isVi ? "Bắt đầu với VaraaAi.Com" : "Getting started on VaraaAi.Com"}
      </h1>
      <p className="mb-8 text-sm text-ink-400">
        {isVi
          ? "Làm theo các bước dưới đây để salon của bạn sẵn sàng nhận khách."
          : "Follow these steps to get your salon ready for customers."}
      </p>

      <div className="space-y-3">
        {STEPS.map((step, i) => (
          <Link
            key={step.href + i}
            href={step.href}
            className="card group flex items-start gap-4 p-4 transition-colors hover:border-primary-500"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-500">
              {i + 1}
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <step.icon className="h-4 w-4 text-ink-400" />
                <p className="font-semibold text-ink-900">{isVi ? step.titleVi : step.titleEn}</p>
              </div>
              <p className="text-sm text-ink-700">{isVi ? step.descVi : step.descEn}</p>
            </div>
            <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-ink-400 transition-transform group-hover:translate-x-0.5" />
          </Link>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href="/business/dashboard" className="btn-primary">
          {isVi ? "Vào trang quản trị" : "Go to your dashboard"}
        </Link>
      </div>
    </div>
  );
}
