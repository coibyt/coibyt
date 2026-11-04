import { getMarketingSmtp } from "@/lib/marketing-mailer";
import { MarketingEmailAdmin } from "@/components/marketing-email-admin";

export default async function AdminMarketingEmailPage() {
  const smtp = await getMarketingSmtp();
  return (
    <MarketingEmailAdmin
      initial={smtp ? { host: smtp.host, port: smtp.port, boxes: smtp.boxes.map((b) => ({ user: b.user, enabled: b.enabled })) } : null}
    />
  );
}
