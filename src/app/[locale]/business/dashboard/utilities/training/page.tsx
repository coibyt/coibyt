import { TeamTraining } from "@/components/team/team-training";

export default async function TeamTrainingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ l?: string }>;
}) {
  const { locale } = await params;
  const { l } = await searchParams;
  return <TeamTraining locale={locale} focusId={l} />;
}
