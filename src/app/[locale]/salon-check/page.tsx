import { SalonCheckTool } from "@/components/salon-check-tool";

export default async function SalonCheckPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="container py-12 sm:py-16">
      <SalonCheckTool locale={locale} />
    </div>
  );
}
