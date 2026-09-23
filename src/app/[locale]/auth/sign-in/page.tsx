import { AuthCard } from "@/components/auth-card";
import { SignInForm } from "@/components/sign-in-form";
import { getTranslations } from "next-intl/server";

export default async function SignInPage() {
  const t = await getTranslations("auth");
  return (
    <AuthCard title={t("signInTitle")}>
      <SignInForm />
    </AuthCard>
  );
}
