import { redirect } from "@/i18n/navigation";
import { siteSerif } from "@/lib/site-fonts";
import { teamAccess, teamCounts } from "@/lib/team";
import { TeamTabs } from "@/components/team/team-tabs";

/** Tiện ích — the team hub: chat, notices and training for the owner and
 * every staff member with a login. */
export default async function UtilitiesLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await teamAccess();
  if (!t) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const counts = await teamCounts(t.userId, t.businessId, t.isOwner);
  return (
    <div className={`${siteSerif.variable} space-y-5`}>
      <TeamTabs locale={locale} counts={counts} />
      {children}
    </div>
  );
}
