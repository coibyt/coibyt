import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EmbedProviders } from "@/app/embed/providers";
import { EmbedChatWidget } from "@/components/embed-chat-widget";

export default async function EmbedChatPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const { slug } = await params;
  const { locale: rawLocale } = await searchParams;

  const business = await prisma.business.findUnique({
    where: { slug },
    select: { name: true, status: true, defaultLocale: true },
  });
  if (!business || business.status !== "APPROVED") notFound();

  const locale = rawLocale || business.defaultLocale || "vi";

  return (
    <div className="h-[32rem] p-2">
      <EmbedProviders requestedLocale={locale}>
        <EmbedChatWidget businessSlug={slug} businessName={business.name} locale={locale} />
      </EmbedProviders>
    </div>
  );
}
