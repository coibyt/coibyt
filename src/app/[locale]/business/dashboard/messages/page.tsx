import { getBusinessAccess } from "@/lib/current-business";
import { redirect } from "@/i18n/navigation";
import { Settings2 } from "lucide-react";
import { BusinessMessagesManager } from "@/components/business-messages-manager";
import { ChatEmbedCard } from "@/components/chat-embed-card";
import { ChatSettingsCard } from "@/components/chat-settings-card";
import { messagesStrings } from "@/lib/messages-strings";
import { siteSerif } from "@/lib/site-fonts";

export default async function BusinessMessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  if (!access) return null;
  if (!access.isOwner && !access.permissions.customers) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const S = messagesStrings(locale);

  return (
    <div className={`${siteSerif.variable} space-y-8`}>
      <BusinessMessagesManager locale={locale} isOwner={access.isOwner} />
      {access.isOwner && (
        <section>
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
              <Settings2 className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-bold text-ink-900">{S.settingsTitle}</h2>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-2 [&_.card]:h-full [&_.card]:rounded-3xl [&_.card]:p-6 [&_.card]:shadow-[0_18px_40px_-34px_rgba(31,24,45,0.6)]">
            <ChatSettingsCard locale={locale} aiChatEnabled={access.business.aiChatEnabled} />
            <ChatEmbedCard slug={access.business.slug} defaultLocale={access.business.defaultLocale} />
          </div>
        </section>
      )}
    </div>
  );
}
