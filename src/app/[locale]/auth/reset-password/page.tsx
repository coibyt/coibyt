import { AuthCard } from "@/components/auth-card";
import { ResetPasswordForm } from "@/components/reset-password-form";
import { getTranslations } from "next-intl/server";

export default async function ResetPasswordPage() {
  const t = await getTranslations("auth");
  return (
    <AuthCard title={t("resetPasswordTitle")}>
      <ResetPasswordForm />
    </AuthCard>
  );
}
