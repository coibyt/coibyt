import { getSiteThemeSetting } from "@/lib/platform-season";
import { SiteThemeAdmin } from "@/components/site-theme-admin";

export default async function AdminSiteThemePage() {
  return <SiteThemeAdmin initial={await getSiteThemeSetting()} />;
}
