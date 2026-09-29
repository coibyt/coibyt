"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Loader2 } from "lucide-react";
import { LandingImageUpload } from "@/components/landing-image-upload";

export interface LandingSectionValue {
  layout: "IMAGE_RIGHT" | "IMAGE_LEFT" | "TEXT_ONLY";
  title: string;
  text: string;
  buttonLabel: string;
  buttonTarget: "BOOKING" | "URL";
  buttonUrl: string;
}

const LAYOUTS: LandingSectionValue["layout"][] = ["IMAGE_RIGHT", "IMAGE_LEFT", "TEXT_ONLY"];

/** One editable landing-page section — used for both the hero and the
 * intro/about block, which share the same shape (layout + title + text +
 * button + image). `enabled`/`onToggleEnabled` are only passed for the
 * intro, which can be hidden entirely; the hero always shows. */
export function LandingSectionCard({
  heading,
  imageSlot,
  initialImageUrl,
  value,
  onChange,
  onSave,
  saving,
  enabled,
  onToggleEnabled,
  imageArea,
}: {
  heading: string;
  imageSlot: string;
  initialImageUrl: string | null;
  value: LandingSectionValue;
  onChange: (patch: Partial<LandingSectionValue>) => void;
  onSave: () => void;
  saving: boolean;
  enabled?: boolean;
  onToggleEnabled?: (v: boolean) => void;
  /** Replaces the default single-image upload — used for the hero, which
   * manages up to 5 slider images instead of one photo. */
  imageArea?: React.ReactNode;
}) {
  const tDash = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const [saved, setSaved] = useState(false);

  function save() {
    onSave();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="card space-y-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-ink-900">{heading}</h2>
        {onToggleEnabled && (
          <label className="flex items-center gap-2 text-xs text-ink-700">
            {tDash("landing.showSection")}
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => onToggleEnabled(e.target.checked)}
            />
          </label>
        )}
      </div>

      {enabled !== false && (
        <>
          <div>
            <p className="label">{tDash("landing.layout")}</p>
            <div className="flex flex-wrap gap-2">
              {LAYOUTS.map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => onChange({ layout: l })}
                  className={`rounded-full border px-3 py-1.5 text-xs ${
                    value.layout === l
                      ? "border-ink-900 bg-ink-900 text-white"
                      : "border-ink-100 text-ink-700"
                  }`}
                >
                  {tDash(`landing.layout${l === "IMAGE_RIGHT" ? "ImageRight" : l === "IMAGE_LEFT" ? "ImageLeft" : "TextOnly"}`)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">{tDash("landing.fieldTitle")}</label>
            <input
              className="input"
              value={value.title}
              maxLength={150}
              onChange={(e) => onChange({ title: e.target.value })}
            />
          </div>

          <div>
            <label className="label">{tDash("landing.fieldText")}</label>
            <textarea
              rows={3}
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
        </>
      )}

      <button onClick={save} disabled={saving} className="btn-primary !px-4 !py-2 text-xs">
        {saving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : saved ? <Check className="h-3.5 w-3.5" /> : null}
        {tCommon("save")}
      </button>
    </div>
  );
}
