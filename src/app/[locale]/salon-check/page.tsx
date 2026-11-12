import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { SalonCheckTool } from "@/components/salon-check-tool";
import { SupportLauncher } from "@/components/support-launcher";
import { supportCenterStrings } from "@/lib/support-ai/strings";
import { businessLandingStrings } from "@/lib/business-landing/strings";
import { ogImage } from "@/lib/og-image";
import { alternatesFor } from "@/lib/seo";

type Params = Promise<{ locale: string }>;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
const pageUrl = (locale: string) => `${SITE}${locale === routing.defaultLocale ? "" : `/${locale}`}/salon-check`;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const title =
    locale === "vi"
      ? "Kiểm tra salon miễn phí — Salon của bạn trông thế nào trên mạng?"
      : locale === "fi"
        ? "Ilmainen salonkitesti — miltä salonkisi näyttää netissä?"
        : "Free salon check — how does your salon look online?";
  const description =
    locale === "vi"
      ? "Chấm điểm website, Google, Facebook và Instagram của salon trong 60 giây, kèm kế hoạch hành động và gợi ý marketing. Miễn phí, không cần đăng ký."
      : locale === "fi"
        ? "Pisteytä salonkisi verkkosivut, Google, Facebook ja Instagram 60 sekunnissa. Saat toimintasuunnitelman ja markkinointi-ideoita. Ilmainen, ei rekisteröitymistä."
        : "Score your salon's website, Google, Facebook and Instagram in 60 seconds, with an action plan and marketing ideas. Free, no sign-up.";
  return {
    title,
    description,
    alternates: alternatesFor("/salon-check", locale),
    openGraph: { title, description, url: pageUrl(locale), siteName: "VaraaAi", type: "website", images: [ogImage(locale)] },
  };
}

export default async function SalonCheckPage({ params }: { params: Params }) {
  const { locale } = await params;
  const chat = businessLandingStrings(locale).chat;

  return (
    <>
      <SalonCheckTool locale={locale} />
      <SupportLauncher
        locale={locale}
        center={supportCenterStrings(locale)}
        suggestions={chat.suggestions}
        labels={{
          launcher: chat.launcher,
          teaser: chat.teaser,
          headerTitle: chat.headerTitle,
          aiOnline: chat.aiOnline,
          teamReplies: chat.teamReplies,
        }}
      />
    </>
  );
}
