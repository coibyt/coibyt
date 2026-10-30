import { TeamChat } from "@/components/team/team-chat";

export default async function TeamChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ c?: string; to?: string }>;
}) {
  const { locale } = await params;
  const { c, to } = await searchParams;
  return <TeamChat locale={locale} initialChatId={c} initialTo={to} />;
}
