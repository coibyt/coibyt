"use client";

import { useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLocale } from "next-intl";

const LABELS: Record<string, [show: string, hide: string]> = {
  vi: ["Hiện mật khẩu", "Ẩn mật khẩu"],
  en: ["Show password", "Hide password"],
  fi: ["Näytä salasana", "Piilota salasana"],
};

/** A password field with an eye button to show or hide what was typed. Takes
 * the same props as `<input>` (minus `type`); `wrapperClassName` carries any
 * layout classes (margins, flex-1) the bare input used to have. */
export function PasswordInput({
  className = "",
  wrapperClassName = "",
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { wrapperClassName?: string }) {
  const [shown, setShown] = useState(false);
  const labels = LABELS[useLocale()] ?? LABELS.en;
  const label = labels[shown ? 1 : 0];
  return (
    <span className={`relative block ${wrapperClassName}`}>
      <input {...props} type={shown ? "text" : "password"} className={`${className} !pr-12`} />
      <button
        type="button"
        onClick={() => setShown((v) => !v)}
        aria-label={label}
        title={label}
        aria-pressed={shown}
        className="absolute inset-y-0 right-1 flex w-11 items-center justify-center rounded-full text-ink-400 hover:text-primary-600"
      >
        {shown ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </span>
  );
}
