import { AuthCard } from "@/components/auth-card";
import { SignUpForm } from "@/components/sign-up-form";
import { getTranslations } from "next-intl/server";

export default async function SignUpPage() {
  const t = await getTranslations("auth");
  return (
    <AuthCard title={t("signUpTitle")}>
      <SignUpForm />
    </AuthCard>
  );
}
