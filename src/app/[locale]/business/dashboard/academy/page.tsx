import { GraduationCap } from "lucide-react";
import { redirect } from "@/i18n/navigation";
import { getBusinessAccess } from "@/lib/current-business";
import { AcademyHub } from "@/components/academy/academy-hub";
import { AcademyShareLinks } from "@/components/academy/academy-share-links";
import { localizedUrl } from "@/lib/seo";
import { bridgeCards, courseCards } from "@/lib/academy";
import { academyStrings } from "@/lib/academy/strings";

/** The Academy inside the business dashboard, for the owner and every staff
 * member (owner, 2026-11-17: "right inside the dashboard, after Doanh thu").
 * Everyone gets all three tracks (owner, 2026-11-17: so staff and owners see
 * how the whole site works, can give feedback, and staff who later open
 * their own salon already know it); the owner starts on the salon-owner
 * track, staff on the craft track. Lessons open on the public /academy pages. */
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
      <AcademyShareLinks locale={locale} baseUrl={localizedUrl(locale, "/academy")} />
      <AcademyHub
        courses={courseCards(locale)}
        bridge={bridgeCards(locale)}
        locale={locale}
        defaultAudience={access.isOwner ? "owner" : "pro"}
        embedded
      />
    </div>
  );
}
