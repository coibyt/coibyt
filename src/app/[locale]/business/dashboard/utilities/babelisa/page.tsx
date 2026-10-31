import { TeamGame } from "@/components/team/team-game";

export default async function BabelisaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TeamGame locale={locale} />;
}
