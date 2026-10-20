import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { SalonCheckTool } from "@/components/salon-check-tool";
import { SupportLauncher } from "@/components/support-launcher";
import { supportCenterStrings } from "@/lib/support-ai/strings";
import { businessLandingStrings } from "@/lib/business-landing/strings";

type Params = Promise<{ locale: string }>;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
const pageUrl = (locale: string) => `${SITE}${locale === routing.defaultLocale ? "" : `/${locale}`}/salon-check`;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const vi = locale === "vi";
  const title = vi ? "Kiểm tra salon miễn phí — Salon của bạn trông thế nào trên mạng?" : "Free salon check — how does your salon look online?";
  const description = vi
    ? "Chấm điểm website, Google, Facebook và Instagram của salon trong 60 giây, kèm kế hoạch hành động và gợi ý marketing. Miễn phí, không cần đăng ký."
    : "Score your salon's website, Google, Facebook and Instagram in 60 seconds, with an action plan and marketing ideas. Free, no sign-up.";
  return {
    title,
    description,
    alternates: { canonical: pageUrl(locale) },
    openGraph: { title, description, url: pageUrl(locale), siteName: "VaraaAi", type: "website" },
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
