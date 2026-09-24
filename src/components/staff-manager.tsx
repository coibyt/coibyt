"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Plus, Trash2, Loader2, Clock, Pencil, KeyRound } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { StaffHoursModal } from "@/components/staff-hours-modal";

interface StaffRow {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  active: boolean;
  serviceIds: string[];
  email: string | null;
  canViewServices: boolean;
  canViewBookings: boolean;
  canViewCustomers: boolean;
  canViewHours: boolean;
  canViewReviews: boolean;
}

const emptyForm = {
  name: "",
  title: "",
  bio: "",
  serviceIds: [] as string[],
  email: "",
  password: "",
  canViewServices: false,
  canViewBookings: true,
  canViewCustomers: false,
  canViewHours: false,
  canViewReviews: false,
};

const PERMISSION_FIELDS = [
  { key: "canViewServices" as const, vi: "Dịch vụ", en: "Services" },
  { key: "canViewBookings" as const, vi: "Lịch hẹn", en: "Bookings" },
  { key: "canViewCustomers" as const, vi: "Khách hàng", en: "Customers" },
  { key: "canViewHours" as const, vi: "Giờ mở cửa", en: "Opening hours" },
  { key: "canViewReviews" as const, vi: "Đánh giá", en: "Reviews" },
];

export function StaffManager({
  initialStaff,
  serviceOptions,
}: {
  initialStaff: StaffRow[];
  serviceOptions: { id: string; name: string }[];
}) {
  const t = useTranslations("business");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoursFor, setHoursFor] = useState<StaffRow | null>(null);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setShowForm(true);
  }

  function startEdit(s: StaffRow) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      title: s.title ?? "",
      bio: s.bio ?? "",
      serviceIds: s.serviceIds,
      email: s.email ?? "",
      password: "",
      canViewServices: s.canViewServices,
      canViewBookings: s.canViewBookings,
      canViewCustomers: s.canViewCustomers,
      canViewHours: s.canViewHours,
      canViewReviews: s.canViewReviews,
    });
    setError(null);
    setShowForm(true);
  }

  async function saveStaff(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await fetch(
      editingId ? `/api/business/staff/${editingId}` : "/api/business/staff",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(
        data?.error === "EMAIL_IN_USE"
          ? locale === "vi"
            ? "Email này đã được sử dụng."
            : "That email is already in use."
          : data?.error === "PASSWORD_REQUIRED"
            ? locale === "vi"
              ? "Cần đặt mật khẩu khi thêm email đăng nhập."
              : "A password is required when adding a login email."
            : locale === "vi"
              ? "Có lỗi xảy ra, vui lòng thử lại."
              : "Something went wrong, please try again."
      );
      return;
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    router.refresh();
  }

  async function removeStaff(id: string) {
    await fetch(`/api/business/staff/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function toggleService(id: string) {
    setForm((f) => ({
      ...f,
      serviceIds: f.serviceIds.includes(id)
        ? f.serviceIds.filter((x) => x !== id)
        : [...f.serviceIds, id],
    }));
  }

  return (
    <div className="space-y-4">
      {initialStaff
        .filter((s) => s.active)
        .map((s) => (
          <div key={s.id} className="card flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-500">
                {s.name.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-ink-900">{s.name}</p>
                {s.title && <p className="text-xs text-ink-400">{s.title}</p>}
                <p className="flex items-center gap-1 text-xs text-ink-400">
                  {s.email ? (
                    <>
                      <KeyRound className="h-3 w-3" /> {s.email}
                    </>
                  ) : locale === "vi" ? (
                    "Chưa có tài khoản đăng nhập"
                  ) : (
                    "No login yet"
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => startEdit(s)}
                className="btn-ghost !p-2 text-ink-700"
                title={locale === "vi" ? "Sửa" : "Edit"}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => setHoursFor(s)}
                className="btn-ghost !p-2 text-ink-700"
                title={locale === "vi" ? "Giờ làm việc" : "Working hours"}
              >
                <Clock className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeStaff(s.id)}
                className="btn-ghost !p-2 text-berry-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {hoursFor && (
          <StaffHoursModal
            staffId={hoursFor.id}
            staffName={hoursFor.name}
            locale={locale}
            onClose={() => setHoursFor(null)}
          />
        )}

      {!showForm ? (
        <button onClick={startCreate} className="btn-outline">
          <Plus className="h-4 w-4" /> {t("addStaff")}
        </button>
      ) : (
        <form onSubmit={saveStaff} className="card space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Tên nhân viên</label>
              <input
                required
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Chức danh</label>
              <input
                className="input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label">Giới thiệu</label>
            <textarea
              rows={2}
              className="input"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
          {serviceOptions.length > 0 && (
            <div>
              <label className="label">Dịch vụ có thể thực hiện</label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      form.serviceIds.includes(s.id)
                        ? "border-ink-900 bg-ink-900 text-white"
                        : "border-ink-100 text-ink-700"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="border-t border-ink-100 pt-4">
            <p className="label">
              {locale === "vi" ? "Tài khoản đăng nhập (không bắt buộc)" : "Login account (optional)"}
            </p>
            <p className="mb-2 text-xs text-ink-400">
              {locale === "vi"
                ? "Cấp email và mật khẩu để nhân viên tự đăng nhập xem lịch hẹn của tiệm."
                : "Give them an email and password so they can log in themselves to view the salon's schedule."}
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="email"
                placeholder="email@example.com"
                className="input"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="password"
                placeholder={
                  editingId
                    ? locale === "vi"
                      ? "Mật khẩu mới (bỏ trống nếu giữ nguyên)"
                      : "New password (leave blank to keep)"
                    : locale === "vi"
                      ? "Mật khẩu (tối thiểu 8 ký tự)"
                      : "Password (min. 8 characters)"
                }
                className="input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          <div className="border-t border-ink-100 pt-4">
            <p className="label">
              {locale === "vi" ? "Được xem những mục nào" : "Can view these sections"}
            </p>
            <div className="flex flex-wrap gap-3">
              {PERMISSION_FIELDS.map((p) => (
                <label key={p.key} className="flex items-center gap-1.5 text-sm text-ink-700">
                  <input
                    type="checkbox"
                    checked={form[p.key]}
                    onChange={(e) => setForm({ ...form, [p.key]: e.target.checked })}
                  />
                  {locale === "vi" ? p.vi : p.en}
                </label>
              ))}
            </div>
          </div>

          {error && <p className="text-sm text-berry-500">{error}</p>}

          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {tCommon("save")}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="btn-ghost"
            >
              {tCommon("cancel")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
