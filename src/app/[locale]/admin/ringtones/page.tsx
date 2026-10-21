import { RingtoneAdmin } from "@/components/ringtone-admin";
import { getRingtoneSetting } from "@/lib/ringtone-settings";

export default async function AdminRingtonesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const [owner, staff] = await Promise.all([getRingtoneSetting("owner"), getRingtoneSetting("staff")]);
  return <RingtoneAdmin locale={locale} initial={{ owner, staff }} />;
}
