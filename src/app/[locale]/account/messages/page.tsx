import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { CustomerMessagesManager } from "@/components/customer-messages-manager";

export default async function AccountMessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect({ href: "/auth/sign-in?callbackUrl=/account/messages", locale });
    return null;
  }

  return (
    <div className="container max-w-3xl py-10">
      <h1 className="mb-6 text-xl font-bold text-ink-900">
        {locale === "vi" ? "Hộp thư" : "Inbox"}
      </h1>
      <CustomerMessagesManager locale={locale} />
    </div>
  );
}
