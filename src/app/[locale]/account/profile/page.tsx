import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { AccountAvatarCard } from "@/components/account-avatar-card";
import { AccountSettingsCard } from "@/components/account-settings-card";

export default async function AccountProfilePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect({ href: "/auth/sign-in?callbackUrl=/account/profile", locale });
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, pendingEmail: true, password: true, image: true },
  });
  if (!user) return null;

  return (
    <div className="container max-w-2xl space-y-6 py-10">
      <h1 className="text-xl font-bold text-ink-900">
        {locale === "vi" ? "Hồ sơ của tôi" : "My profile"}
      </h1>
      <AccountAvatarCard initialUrl={user.image} />
      <AccountSettingsCard
        currentEmail={user.email}
        pendingEmail={user.pendingEmail}
        hasPassword={!!user.password}
      />
    </div>
  );
}
