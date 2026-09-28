"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

export function AccountSettingsCard({
  currentEmail,
  pendingEmail,
  hasPassword,
}: {
  currentEmail: string;
  pendingEmail: string | null;
  hasPassword: boolean;
}) {
  const t = useTranslations("settingsCards");
  const [newEmail, setNewEmail] = useState(currentEmail);
  const [emailPassword, setEmailPassword] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailMsg, setEmailMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function saveEmail() {
    setEmailSaving(true);
    setEmailMsg(null);
    const res = await fetch("/api/auth/change-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newEmail, currentPassword: emailPassword || undefined }),
    });
    setEmailSaving(false);
    if (res.ok) {
      setEmailMsg({ type: "success", text: t("emailSent") });
      setEmailPassword("");
    } else {
      const data = await res.json().catch(() => ({}));
      setEmailMsg({
        type: "error",
        text:
          data.error === "EMAIL_IN_USE"
            ? t("emailInUse")
            : data.error === "INVALID_CURRENT_PASSWORD"
              ? t("wrongPassword")
              : t("genericErrorShort"),
      });
    }
  }

  async function savePassword() {
    setPwSaving(true);
    setPwMsg(null);
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: currentPassword || undefined, newPassword }),
    });
    setPwSaving(false);
    if (res.ok) {
      setPwMsg({ type: "success", text: t("passwordChanged") });
      setCurrentPassword("");
      setNewPassword("");
    } else {
      const data = await res.json().catch(() => ({}));
      setPwMsg({
        type: "error",
        text: data.error === "INVALID_CURRENT_PASSWORD" ? t("wrongPassword") : t("genericErrorShort"),
      });
    }
  }

  return (
    <div className="card p-5">
      <h2 className="mb-1 font-semibold text-ink-900">{t("accountTitle")}</h2>
      <p className="mb-3 text-xs text-ink-400">{t("accountSubtitle")}</p>

      <div className="mb-4 space-y-2 border-b border-ink-100 pb-4">
        <p className="text-sm font-medium text-ink-900">{t("changeEmail")}</p>
        {pendingEmail && (
          <p className="text-xs text-coral-600">{t("awaitingEmail", { email: pendingEmail })}</p>
        )}
        <input
          className="input"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        {hasPassword && (
          <input
            className="input"
            type="password"
            placeholder={t("currentPassword")}
            value={emailPassword}
            onChange={(e) => setEmailPassword(e.target.value)}
          />
        )}
        {emailMsg && (
          <p className={`text-xs ${emailMsg.type === "success" ? "text-sage-600" : "text-berry-500"}`}>
            {emailMsg.text}
          </p>
        )}
        <button
          onClick={saveEmail}
          disabled={emailSaving || !newEmail}
          className="btn-outline !px-3 !py-1.5 text-xs"
        >
          {emailSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {t("updateEmail")}
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-ink-900">
          {hasPassword ? t("changePassword") : t("setPassword")}
        </p>
        {hasPassword && (
          <input
            className="input"
            type="password"
            placeholder={t("currentPassword")}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        )}
        <input
          className="input"
          type="password"
          placeholder={t("newPasswordPlaceholder")}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {pwMsg && (
          <p className={`text-xs ${pwMsg.type === "success" ? "text-sage-600" : "text-berry-500"}`}>
            {pwMsg.text}
          </p>
        )}
        <button
          onClick={savePassword}
          disabled={pwSaving || newPassword.length < 8}
          className="btn-outline !px-3 !py-1.5 text-xs"
        >
          {pwSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {hasPassword ? t("changePassword") : t("setPassword")}
        </button>
      </div>
    </div>
  );
}
