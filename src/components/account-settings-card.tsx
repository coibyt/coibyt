"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Loader2 } from "lucide-react";

export function AccountSettingsCard({
  currentEmail,
  hasPassword,
}: {
  currentEmail: string;
  hasPassword: boolean;
}) {
  const locale = useLocale();
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
      setEmailMsg({
        type: "success",
        text:
          locale === "vi"
            ? "Đã gửi email xác minh đến địa chỉ mới."
            : "Verification email sent to the new address.",
      });
      setEmailPassword("");
    } else {
      const data = await res.json().catch(() => ({}));
      setEmailMsg({
        type: "error",
        text:
          data.error === "EMAIL_IN_USE"
            ? locale === "vi"
              ? "Email này đã được sử dụng."
              : "That email is already in use."
            : data.error === "INVALID_CURRENT_PASSWORD"
              ? locale === "vi"
                ? "Mật khẩu hiện tại không đúng."
                : "Current password is incorrect."
              : locale === "vi"
                ? "Có lỗi xảy ra."
                : "Something went wrong.",
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
      setPwMsg({
        type: "success",
        text: locale === "vi" ? "Đã đổi mật khẩu." : "Password changed.",
      });
      setCurrentPassword("");
      setNewPassword("");
    } else {
      const data = await res.json().catch(() => ({}));
      setPwMsg({
        type: "error",
        text:
          data.error === "INVALID_CURRENT_PASSWORD"
            ? locale === "vi"
              ? "Mật khẩu hiện tại không đúng."
              : "Current password is incorrect."
            : locale === "vi"
              ? "Có lỗi xảy ra."
              : "Something went wrong.",
      });
    }
  }

  return (
    <div className="card p-5">
      <h2 className="mb-1 font-semibold text-ink-900">
        {locale === "vi" ? "Tài khoản" : "Account"}
      </h2>
      <p className="mb-3 text-xs text-ink-400">
        {locale === "vi"
          ? "Đổi email đăng nhập hoặc mật khẩu của bạn."
          : "Change your login email or password."}
      </p>

      <div className="mb-4 space-y-2 border-b border-ink-100 pb-4">
        <p className="text-sm font-medium text-ink-900">
          {locale === "vi" ? "Đổi email" : "Change email"}
        </p>
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
            placeholder={locale === "vi" ? "Mật khẩu hiện tại" : "Current password"}
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
          {locale === "vi" ? "Cập nhật email" : "Update email"}
        </button>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-ink-900">
          {hasPassword
            ? locale === "vi"
              ? "Đổi mật khẩu"
              : "Change password"
            : locale === "vi"
              ? "Đặt mật khẩu"
              : "Set a password"}
        </p>
        {hasPassword && (
          <input
            className="input"
            type="password"
            placeholder={locale === "vi" ? "Mật khẩu hiện tại" : "Current password"}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        )}
        <input
          className="input"
          type="password"
          placeholder={locale === "vi" ? "Mật khẩu mới (tối thiểu 8 ký tự)" : "New password (min. 8 characters)"}
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
          {hasPassword
            ? locale === "vi"
              ? "Đổi mật khẩu"
              : "Change password"
            : locale === "vi"
              ? "Đặt mật khẩu"
              : "Set password"}
        </button>
      </div>
    </div>
  );
}
