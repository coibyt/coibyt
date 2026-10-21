"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Columns2, Image as ImageIcon, Loader2, PanelLeft, PanelRight, Type } from "lucide-react";
import { LandingImageUpload } from "@/components/landing-image-upload";

export type LandingLayout = "FULL" | "IMAGE_RIGHT" | "IMAGE_LEFT" | "TEXT_ONLY";

export interface LandingSectionValue {
  layout: LandingLayout;
  eyebrow?: string;
  title: string;
  text: string;
  buttonLabel: string;
  buttonTarget: "BOOKING" | "URL";
  buttonUrl: string;
}

const LAYOUT_ICON = { FULL: ImageIcon, IMAGE_RIGHT: PanelRight, IMAGE_LEFT: PanelLeft, TEXT_ONLY: Type } as const;

/** The fields of one landing-page section — the hero or the intro, which
 * share a shape (layout + title + text + button + image). The surrounding
 * panel (title, show/hide switch) belongs to the editor. */
export function LandingSectionCard({
  imageSlot,
  initialImageUrl,
  value,
  onChange,
  onSave,
  saving,
  imageArea,
  layouts,
  layoutLabels,
  eyebrowLabel,
  eyebrowPlaceholder,
}: {
  imageSlot: string;
  initialImageUrl: string | null;
  value: LandingSectionValue;
  onChange: (patch: Partial<LandingSectionValue>) => void;
  onSave: () => Promise<void> | void;
  saving: boolean;
  /** Replaces the default single-image upload — used for the hero, which
   * manages up to 5 slider images instead of one photo. */
  imageArea?: React.ReactNode;
  layouts: LandingLayout[];
  /** Labels the message catalogue doesn't have (the full-screen layout). */
  layoutLabels?: Partial<Record<LandingLayout, string>>;
  /** Shows the small line above the title (hero only). */
  eyebrowLabel?: string;
  eyebrowPlaceholder?: string;
}) {
  const tDash = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const [saved, setSaved] = useState(false);

  async function save() {
    await onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="label">{tDash("landing.layout")}</p>
        <div className={`grid gap-2 ${layouts.length === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
          {layouts.map((l) => {
            const Icon = LAYOUT_ICON[l] ?? Columns2;
            const on = value.layout === l;
            return (
              <button
                key={l}
                type="button"
                onClick={() => onChange({ layout: l })}
                className={`flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3 text-xs font-medium transition-all ${
                  on ? "border-primary-500 bg-primary-50 text-primary-700 ring-2 ring-primary-100" : "border-ink-100 text-ink-700 hover:border-ink-400"
                }`}
              >
                <Icon className="h-5 w-5" />
                {layoutLabels?.[l] ||
                  tDash(`landing.layout${l === "IMAGE_RIGHT" ? "ImageRight" : l === "IMAGE_LEFT" ? "ImageLeft" : "TextOnly"}`)}
              </button>
            );
          })}
        </div>
      </div>

      {eyebrowLabel && (
        <div>
          <label className="label">{eyebrowLabel}</label>
          <input
            className="input"
            value={value.eyebrow ?? ""}
            maxLength={120}
            placeholder={eyebrowPlaceholder}
            onChange={(e) => onChange({ eyebrow: e.target.value })}
          />
        </div>
      )}

      <div>
        <label className="label">{tDash("landing.fieldTitle")}</label>
        <input className="input" value={value.title} maxLength={150} onChange={(e) => onChange({ title: e.target.value })} />
      </div>

      <div>
        <label className="label">{tDash("landing.fieldText")}</label>
        <textarea
          rows={4}
          className="input"
          value={value.text}
          maxLength={2000}
          onChange={(e) => onChange({ text: e.target.value })}
        />
      </div>

      {value.layout !== "TEXT_ONLY" &&
        (imageArea ?? (
          <div>
            <p className="label">{tDash("landing.image")}</p>
            <LandingImageUpload
              slot={imageSlot}
              initialUrl={initialImageUrl}
              onUploaded={() => {}}
              uploadLabel={tDash("landing.uploadImage")}
              tooLargeError={tDash("landing.imageTooLarge")}
              unsupportedError={tDash("landing.imageUnsupported")}
            />
          </div>
        ))}

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">{tDash("landing.buttonLabel")}</label>
          <input
            className="input"
            value={value.buttonLabel}
            maxLength={60}
            onChange={(e) => onChange({ buttonLabel: e.target.value })}
          />
        </div>
        <div>
          <label className="label">{tDash("landing.buttonTarget")}</label>
          <select
            className="input"
            value={value.buttonTarget}
            onChange={(e) => onChange({ buttonTarget: e.target.value as "BOOKING" | "URL" })}
          >
            <option value="BOOKING">{tDash("landing.buttonTargetBooking")}</option>
            <option value="URL">{tDash("landing.buttonTargetUrl")}</option>
          </select>
        </div>
      </div>
      {value.buttonTarget === "URL" && (
        <div>
          <label className="label">{tDash("landing.buttonUrl")}</label>
          <input
            type="url"
            placeholder="https://..."
            className="input"
            value={value.buttonUrl}
            onChange={(e) => onChange({ buttonUrl: e.target.value })}
          />
        </div>
      )}

      <button onClick={save} disabled={saving} className="btn-primary !px-5 !py-2.5 text-sm">
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : null}
        {tCommon("save")}
      </button>
    </div>
  );
}
