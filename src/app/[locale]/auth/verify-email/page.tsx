import { CheckCircle2, XCircle } from "lucide-react";
import { AuthCard } from "@/components/auth-card";
import { Link } from "@/i18n/navigation";

export default async function VerifyEmailPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string; reason?: string }>;
}) {
  const { locale } = await params;
  const { status, reason } = await searchParams;
  const isVi = locale === "vi";
  const isFi = locale === "fi";
  const success = status === "success";
  const isEmailChange = reason === "email_change";

  return (
    <AuthCard
      title={
        success
          ? isVi
            ? "Email đã được xác minh!"
            : isFi ? "Sähköposti vahvistettu!" : "Email verified!"
          : isVi
            ? "Liên kết không hợp lệ"
            : isFi ? "Virheellinen linkki" : "Invalid link"
      }
    >
      <div className="flex flex-col items-center gap-4 text-center">
        {success ? (
          <CheckCircle2 className="h-12 w-12 text-sage-500" />
        ) : (
          <XCircle className="h-12 w-12 text-berry-500" />
        )}
        <p className="text-sm text-ink-700">
          {success
            ? isEmailChange
              ? isVi
                ? "Email đăng nhập của bạn đã được cập nhật."
                : isFi ? "Kirjautumissähköpostisi on päivitetty." : "Your login email has been updated."
              : isVi
                ? "Salon của bạn đã được kích hoạt. Bạn có thể bắt đầu đăng dịch vụ ngay bây giờ."
                : isFi ? "Salonkisi on nyt aktivoitu. Voit aloittaa palveluiden lisäämisen heti." : "Your salon is now activated. You can start adding services right away."
            : isVi
              ? "Liên kết xác minh này đã hết hạn hoặc không còn hợp lệ. Vui lòng yêu cầu gửi lại email xác minh từ trang quản trị."
              : isFi ? "Tämä vahvistuslinkki on vanhentunut tai ei ole enää voimassa. Pyydä uusi linkki hallintapaneelista." : "This verification link has expired or is no longer valid. Please request a new one from your dashboard."}
        </p>
        <Link href="/business/dashboard" className="btn-primary">
          {isVi ? "Vào trang quản trị" : isFi ? "Siirry hallintapaneeliin" : "Go to dashboard"}
        </Link>
      </div>
    </AuthCard>
  );
}
