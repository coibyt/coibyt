import { XCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function BookingCancelledPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("payment");

  return (
    <div className="container flex max-w-lg flex-col items-center gap-4 py-20 text-center">
      <XCircle className="h-14 w-14 text-berry-500" />
      <h1 className="text-2xl font-bold text-ink-900">{t("failed")}</h1>
      <Link href="/" className="btn-primary">
        {locale === "vi" ? "Về trang chủ" : "Back to home"}
      </Link>
    </div>
  );
}
