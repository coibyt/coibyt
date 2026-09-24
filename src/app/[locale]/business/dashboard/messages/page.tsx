import { getBusinessAccess } from "@/lib/current-business";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { BusinessMessagesManager } from "@/components/business-messages-manager";

export default async function BusinessMessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  const t = await getTranslations("business");
  if (!access) return null;
  if (!access.isOwner && !access.permissions.customers) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("messages")}</h1>
      <BusinessMessagesManager locale={locale} />
    </div>
  );
}
