import { GraduationCap } from "lucide-react";
import { redirect } from "@/i18n/navigation";
import { getBusinessAccess } from "@/lib/current-business";
import { AcademyHub } from "@/components/academy/academy-hub";
import { bridgeCards, courseCards } from "@/lib/academy";
import { academyStrings } from "@/lib/academy/strings";

/** The Academy inside the business dashboard, for the owner and every staff
 * member (owner, 2026-11-17: "right inside the dashboard, after Doanh thu").
 * The owner gets the salon-owner and craft tracks (starting on the owner
 * one), staff only the craft track; the customer track stays on the public
 * page. The lessons themselves open on the public /academy pages. */
export default async function DashboardAcademyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  if (!access) {
    redirect({ href: "/business/apply", locale });
    return null;
  }
  const s = academyStrings(locale);
  return (
    <div>
      <h1 className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
        <GraduationCap className="h-7 w-7 shrink-0 text-[#b08a3e]" />
        {s.eyebrow}
      </h1>
      <p className="mb-6 mt-1 text-sm text-ink-400 sm:text-base">
        {s.heroTitle} {s.heroAccent}
      </p>
      <AcademyHub
        courses={courseCards(locale)}
        bridge={bridgeCards(locale)}
        locale={locale}
        defaultAudience={access.isOwner ? "owner" : "pro"}
        tabs={access.isOwner ? ["owner", "pro"] : ["pro"]}
        embedded
      />
    </div>
  );
}
