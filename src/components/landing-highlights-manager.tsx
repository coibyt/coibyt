"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronUp, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { LandingImageUpload } from "@/components/landing-image-upload";

export interface HighlightRow {
  id: string;
  title: string;
  description: string | null;
  buttonLabel: string | null;
  buttonTarget: "BOOKING" | "URL";
  buttonUrl: string | null;
  imageUrl: string | null;
}

interface HighlightForm {
  title: string;
  description: string;
  buttonLabel: string;
  buttonTarget: "BOOKING" | "URL";
  buttonUrl: string;
}

const emptyForm: HighlightForm = { title: "", description: "", buttonLabel: "", buttonTarget: "BOOKING", buttonUrl: "" };

export function LandingHighlightsManager({
  landingPageId,
  sectionTitle,
  sectionEnabled,
  highlights,
}: {
  landingPageId: string;
  sectionTitle: string;
  sectionEnabled: boolean;
  highlights: HighlightRow[];
}) {
  const tDash = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const router = useRouter();

  const [enabled, setEnabled] = useState(sectionEnabled);
  const [title, setTitle] = useState(sectionTitle);
  const [savingSection, setSavingSection] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  async function saveSection() {
    setSavingSection(true);
    await fetch("/api/business/landing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ highlightsEnabled: enabled, highlightsTitle: title }),
    });
    setSavingSection(false);
    router.refresh();
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function startEdit(h: HighlightRow) {
    setEditingId(h.id);
    setForm({
      title: h.title,
      description: h.description ?? "",
      buttonLabel: h.buttonLabel ?? "",
      buttonTarget: h.buttonTarget,
      buttonUrl: h.buttonUrl ?? "",
    });
    setShowForm(true);
  }

  async function saveHighlight(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch(
      editingId ? `/api/business/landing/highlights/${editingId}` : "/api/business/landing/highlights",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    setSaving(false);
    setShowForm(false);
    setEditingId(null);
    router.refresh();
  }

  async function move(id: string, direction: "up" | "down") {
    await fetch(`/api/business/landing/highlights/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ move: direction }),
    });
    router.refresh();
  }

  async function remove(h: HighlightRow) {
    if (!window.confirm(tDash("landing.deleteHighlightConfirm", { title: h.title }))) return;
    await fetch(`/api/business/landing/highlights/${h.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="card space-y-4 p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-semibold text-ink-900">{tDash("landing.highlightsTitle")}</h2>
        <label className="flex items-center gap-2 text-xs text-ink-700">
          {tDash("landing.showSection")}
          <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} />
        </label>
      </div>

      <div>
        <label className="label">{tDash("landing.highlightsSectionTitle")}</label>
        <input
          className="input"
          value={title}
          maxLength={150}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button onClick={saveSection} disabled={savingSection} className="btn-outline !px-4 !py-2 text-xs">
        {savingSection && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
        {tCommon("save")}
      </button>

      <div className="space-y-2 border-t border-ink-100 pt-4">
        {highlights.map((h, index) => (
          <div key={h.id} className="rounded-2xl border border-ink-100 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-medium text-ink-900">{h.title}</p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => move(h.id, "up")}
                  disabled={index === 0}
                  className="btn-ghost !p-1.5 disabled:opacity-30"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => move(h.id, "down")}
                  disabled={index === highlights.length - 1}
                  className="btn-ghost !p-1.5 disabled:opacity-30"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button onClick={() => startEdit(h)} className="btn-ghost !p-1.5">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => remove(h)} className="btn-ghost !p-1.5 text-berry-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {showForm && editingId === h.id && (
              <div className="mt-3 border-t border-ink-100 pt-3">
                <HighlightForm
                  form={form}
                  setForm={setForm}
                  onSubmit={saveHighlight}
                  onCancel={() => setShowForm(false)}
                  saving={saving}
                  imageSlot={h.id}
                  imageUrl={h.imageUrl}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {!showForm && (
        <button onClick={startCreate} className="btn-outline">
          <Plus className="h-4 w-4" /> {tDash("landing.addHighlight")}
        </button>
      )}
      {showForm && !editingId && (
        <div className="rounded-2xl border border-ink-100 p-4">
          <HighlightForm
            form={form}
            setForm={setForm}
            onSubmit={saveHighlight}
            onCancel={() => setShowForm(false)}
            saving={saving}
            imageSlot={null}
            imageUrl={null}
          />
          <p className="mt-2 text-xs text-ink-400">{tDash("landing.saveBeforeImage")}</p>
        </div>
      )}
    </div>
  );
}

function HighlightForm({
  form,
  setForm,
  onSubmit,
  onCancel,
  saving,
  imageSlot,
  imageUrl,
}: {
  form: typeof emptyForm;
  setForm: (f: typeof emptyForm) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  saving: boolean;
  imageSlot: string | null;
  imageUrl: string | null;
}) {
  const tDash = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="label">{tDash("landing.highlightTitleLabel")}</label>
        <input
          required
          className="input"
          value={form.title}
          maxLength={150}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
      </div>
      <div>
        <label className="label">{tDash("landing.highlightDescLabel")}</label>
        <textarea
          rows={2}
          className="input"
          value={form.description}
          maxLength={2000}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      {imageSlot && (
        <div>
          <p className="label">{tDash("landing.image")}</p>
          <LandingImageUpload
            slot={imageSlot}
            initialUrl={imageUrl}
            onUploaded={() => {}}
            uploadLabel={tDash("landing.uploadImage")}
            tooLargeError={tDash("landing.imageTooLarge")}
            unsupportedError={tDash("landing.imageUnsupported")}
          />
        </div>
      )}
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">{tDash("landing.buttonLabel")}</label>
          <input
            className="input"
            value={form.buttonLabel}
            maxLength={60}
            onChange={(e) => setForm({ ...form, buttonLabel: e.target.value })}
          />
        </div>
        <div>
          <label className="label">{tDash("landing.buttonTarget")}</label>
          <select
            className="input"
            value={form.buttonTarget}
            onChange={(e) => setForm({ ...form, buttonTarget: e.target.value as "BOOKING" | "URL" })}
          >
            <option value="BOOKING">{tDash("landing.buttonTargetBooking")}</option>
            <option value="URL">{tDash("landing.buttonTargetUrl")}</option>
          </select>
        </div>
      </div>
      {form.buttonTarget === "URL" && (
        <div>
          <label className="label">{tDash("landing.buttonUrl")}</label>
          <input
            type="url"
            placeholder="https://..."
            className="input"
            value={form.buttonUrl}
            onChange={(e) => setForm({ ...form, buttonUrl: e.target.value })}
          />
        </div>
      )}
      <div className="flex gap-2">
        <button type="submit" disabled={saving} className="btn-primary !px-4 !py-2 text-xs">
          {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          {tCommon("save")}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost !px-4 !py-2 text-xs">
          {tCommon("cancel")}
        </button>
      </div>
    </form>
  );
}
