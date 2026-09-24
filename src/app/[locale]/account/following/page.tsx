import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { FollowingList } from "@/components/following-list";

export default async function AccountFollowingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect({ href: "/auth/sign-in?callbackUrl=/account/following", locale });
    return null;
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="mb-6 text-xl font-bold text-ink-900">
        {locale === "vi" ? "Đang theo dõi" : "Following"}
      </h1>
      <FollowingList locale={locale} />
    </div>
  );
}
