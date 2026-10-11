import { AuthCard } from "@/components/auth-card";
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { getTranslations } from "next-intl/server";

export default async function ForgotPasswordPage() {
  const t = await getTranslations("auth");
  return (
    <AuthCard title={t("forgotPasswordTitle")}>
      <ForgotPasswordForm />
    </AuthCard>
  );
}
