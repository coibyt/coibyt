import { TeamNotices } from "@/components/team/team-notices";

export default async function TeamNoticesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ a?: string }>;
}) {
  const { locale } = await params;
  const { a } = await searchParams;
  return <TeamNotices locale={locale} focusId={a} />;
}
