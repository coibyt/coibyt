import { requireOwnerOrReadOnlyViewer } from "@/lib/current-business";
import { redirect } from "@/i18n/navigation";
import { FanpageManager } from "@/components/fanpage-manager";
import { ReadOnlyBanner } from "@/components/read-only-banner";

export default async function FanpagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const owned = await requireOwnerOrReadOnlyViewer();
  if (!owned) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }

  return (
    <div>
      {!owned.isOwner && <ReadOnlyBanner locale={locale} />}
      <h1 className="mb-1 text-xl font-bold text-ink-900">Fanpage</h1>
      <p className="mb-4 text-sm text-ink-400">
        {locale === "vi"
          ? "Đăng nội dung, hình ảnh và video — khách hàng đang theo dõi salon của bạn sẽ thấy bài đăng ở đây."
          : "Post updates, photos and videos — customers following your salon will see them here."}
      </p>
      <FanpageManager locale={locale} />
    </div>
  );
}
