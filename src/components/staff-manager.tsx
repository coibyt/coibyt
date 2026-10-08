"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Plus, Trash2, Loader2, Clock, Pencil, KeyRound } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { StaffHoursModal } from "@/components/staff-hours-modal";
import { StaffAvatarUpload } from "@/components/staff-avatar-upload";
import {
  StaffHoursFields,
  DEFAULT_STAFF_HOURS,
  staffHoursPayload,
  type StaffHoursValue,
} from "@/components/staff-hours-fields";

interface StaffRow {
  id: string;
  name: string;
  title: string | null;
  bio: string | null;
  avatarUrl: string | null;
  active: boolean;
  serviceIds: string[];
  email: string | null;
  canViewServices: boolean;
  canViewBookings: boolean;
  canViewCustomers: boolean;
  canViewHours: boolean;
  canViewReviews: boolean;
  canViewCustomerContactInfo: boolean;
  canViewAllBookings: boolean;
  canViewAllPagesReadOnly: boolean;
  leadTimeMinutes: number;
  staffMessage: string | null;
  videoUrls: string[];
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
  canViewCustomerContactInfo: false,
  canViewAllBookings: true,
  canViewAllPagesReadOnly: false,
  leadTimeMinutes: 0,
  staffMessage: "",
  videoUrls: ["", "", "", "", ""] as string[],
};

const PERMISSION_FIELDS = [
  { key: "canViewServices" as const, vi: "Dịch vụ", en: "Services" },
  { key: "canViewBookings" as const, vi: "Lịch hẹn", en: "Bookings" },
  { key: "canViewCustomers" as const, vi: "Khách hàng", en: "Customers" },
  { key: "canViewHours" as const, vi: "Giờ mở cửa", en: "Opening hours" },
  { key: "canViewReviews" as const, vi: "Đánh giá", en: "Reviews" },
  {
    key: "canViewCustomerContactInfo" as const,
    vi: "Số điện thoại & email của khách",
    en: "Customer phone & email",
  },
];

const LEAD_TIME_OPTIONS = [
  { minutes: 0, vi: "Không yêu cầu", en: "No minimum" },
  { minutes: 15, vi: "15 phút", en: "15 minutes" },
  { minutes: 30, vi: "30 phút", en: "30 minutes" },
  { minutes: 60, vi: "1 tiếng", en: "1 hour" },
  { minutes: 120, vi: "2 tiếng", en: "2 hours" },
  { minutes: 180, vi: "3 tiếng", en: "3 hours" },
  { minutes: 360, vi: "6 tiếng", en: "6 hours" },
  { minutes: 720, vi: "12 tiếng", en: "12 hours" },
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
  const tDash = useTranslations("dashboard");
  const locale = useLocale();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hoursFor, setHoursFor] = useState<StaffRow | null>(null);
  const [newHours, setNewHours] = useState<StaffHoursValue>(DEFAULT_STAFF_HOURS);
  const [editingAvatarUrl, setEditingAvatarUrl] = useState<string | null>(null);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setNewHours(DEFAULT_STAFF_HOURS);
    setError(null);
    setShowForm(true);
  }

  function startEdit(s: StaffRow) {
    setEditingId(s.id);
    setEditingAvatarUrl(s.avatarUrl);
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
      canViewCustomerContactInfo: s.canViewCustomerContactInfo,
      canViewAllBookings: s.canViewAllBookings,
      canViewAllPagesReadOnly: s.canViewAllPagesReadOnly,
      leadTimeMinutes: s.leadTimeMinutes,
      staffMessage: s.staffMessage ?? "",
      videoUrls: [0, 1, 2, 3, 4].map((i) => s.videoUrls[i] ?? ""),
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
        body: JSON.stringify(editingId ? form : { ...form, hours: staffHoursPayload(newHours) }),
      }
    );
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      const passwordTooShort = !!data?.error?.fieldErrors?.password;
      setError(
        data?.error === "EMAIL_IN_USE"
          ? locale === "vi"
            ? "Email này đã được sử dụng."
            : "That email is already in use."
          : data?.error === "PASSWORD_REQUIRED"
            ? locale === "vi"
              ? "Cần đặt mật khẩu khi thêm email đăng nhập."
              : "A password is required when adding a login email."
            : passwordTooShort
              ? locale === "vi"
                ? "Mật khẩu phải có ít nhất 8 ký tự."
                : "Password must be at least 8 characters."
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

  function setVideoUrl(index: number, value: string) {
    setForm((f) => {
      const next = [...f.videoUrls];
      next[index] = value;
      return { ...f, videoUrls: next };
    });
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
              {s.avatarUrl ? (
                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-mist-100">
                  <Image src={s.avatarUrl} alt="" fill className="object-cover" />
                </div>
              ) : (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-500">
                  {s.name.charAt(0)}
                </span>
              )}
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
          {editingId ? (
            <div>
              <label className="label">{tDash("staffForm.avatar")}</label>
              <StaffAvatarUpload
                staffId={editingId}
                initialUrl={editingAvatarUrl}
                uploadLabel={tDash("staffForm.uploadAvatar")}
                removeLabel={tDash("staffForm.removeAvatar")}
                errorLabel={tDash("staffForm.avatarError")}
              />
            </div>
          ) : (
            <p className="text-xs text-ink-400">{tDash("staffForm.saveBeforeAvatar")}</p>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">{tDash("staffForm.staffName")}</label>
              <input
                required
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">{tDash("staffForm.title")}</label>
              <input
                className="input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label">{tDash("staffForm.bio")}</label>
            <textarea
              rows={2}
              className="input"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
          {serviceOptions.length > 0 && (
            <div>
              <label className="label">{tDash("staffForm.servicesCanDo")}</label>
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
                      ? "Mật khẩu mới, tối thiểu 8 ký tự (bỏ trống nếu giữ nguyên)"
                      : "New password, min. 8 characters (leave blank to keep)"
                    : locale === "vi"
                      ? "Mật khẩu (tối thiểu 8 ký tự)"
                      : "Password (min. 8 characters)"
                }
                className="input"
                value={form.password}
                minLength={8}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          {!editingId && (
            <div className="border-t border-ink-100 pt-4">
              <p className="label">{tDash("staffForm.workingHours")}</p>
              <p className="mb-2 text-xs text-ink-400">{tDash("staffForm.hoursHint")}</p>
              <StaffHoursFields value={newHours} onChange={setNewHours} />
            </div>
          )}

          <div className="border-t border-ink-100 pt-4">
            <label className="label">
              {locale === "vi" ? "Thời gian đặt trước tối thiểu" : "Minimum booking notice"}
            </label>
            <p className="mb-1 text-xs text-ink-400">
              {locale === "vi"
                ? "Khách phải đặt trước nhân viên này ít nhất khoảng thời gian này."
                : "Customers must book this staff member at least this far in advance."}
            </p>
            <select
              className="input"
              value={form.leadTimeMinutes}
              onChange={(e) => setForm({ ...form, leadTimeMinutes: Number(e.target.value) })}
            >
              {LEAD_TIME_OPTIONS.map((o) => (
                <option key={o.minutes} value={o.minutes}>
                  {locale === "vi" ? o.vi : o.en}
                </option>
              ))}
            </select>
          </div>

          <div className="border-t border-ink-100 pt-4">
            <label className="label">
              {locale === "vi" ? "Lời nhắn của nhân viên" : "Staff message"} (
              {locale === "vi" ? "không bắt buộc" : "optional"})
            </label>
            <p className="mb-1 text-xs text-ink-400">
              {locale === "vi"
                ? "Hiện ra cho khách khi đặt lịch với nhân viên này, và gửi kèm trong email xác nhận."
                : "Shown to customers when booking this staff member, and included in their confirmation email."}
            </p>
            <textarea
              rows={2}
              className="input"
              value={form.staffMessage}
              onChange={(e) => setForm({ ...form, staffMessage: e.target.value })}
            />
          </div>

          <div className="border-t border-ink-100 pt-4">
            <label className="label">
              {locale === "vi" ? "Video giới thiệu (YouTube)" : "Portfolio videos (YouTube)"}
            </label>
            <p className="mb-1 text-xs text-ink-400">
              {locale === "vi"
                ? "Khách có thể xem trước khi quyết định đặt lịch với nhân viên này."
                : "Customers can watch these before deciding to book this staff member."}
            </p>
            <div className="space-y-2">
              {form.videoUrls.map((url, i) => (
                <input
                  key={i}
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="input"
                  value={url}
                  onChange={(e) => setVideoUrl(i, e.target.value)}
                />
              ))}
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
            {form.canViewBookings && (
              <div className="mt-3 space-y-1.5 rounded-xl bg-mist-50 p-3">
                <label className="flex items-center gap-2 text-sm text-ink-700">
                  <input
                    type="radio"
                    name="bookingScope"
                    checked={form.canViewAllBookings}
                    onChange={() => setForm({ ...form, canViewAllBookings: true })}
                  />
                  {locale === "vi"
                    ? "Xem lịch hẹn của tất cả nhân viên"
                    : "View everyone's bookings"}
                </label>
                <label className="flex items-center gap-2 text-sm text-ink-700">
                  <input
                    type="radio"
                    name="bookingScope"
                    checked={!form.canViewAllBookings}
                    onChange={() => setForm({ ...form, canViewAllBookings: false })}
                  />
                  {locale === "vi"
                    ? "Chỉ xem lịch hẹn của nhân viên này"
                    : "Only view this staff member's bookings"}
                </label>
              </div>
            )}
            <label className="mt-3 flex items-start gap-2 rounded-xl bg-mist-50 p-3 text-sm text-ink-700">
              <input
                type="checkbox"
                className="mt-0.5"
                checked={form.canViewAllPagesReadOnly}
                onChange={(e) => setForm({ ...form, canViewAllPagesReadOnly: e.target.checked })}
              />
              <span>
                {locale === "vi"
                  ? "Cho xem tất cả các trang trong trang quản lý doanh nghiệp (chỉ xem, không được sửa đổi)"
                  : "Let them view every page in the business dashboard (view-only, can't make changes)"}
                <span className="mt-0.5 block text-xs text-ink-400">
                  {locale === "vi"
                    ? "Áp dụng cho mọi trang trừ Nhân viên và Cài đặt — ví dụ Fanpage, Trang landing, Marketing, Thẻ quà tặng, Thẻ tích điểm."
                    : "Covers every page except Staff and Settings — e.g. Fanpage, Landing page, Marketing, Gift cards, Loyalty cards."}
                </span>
              </span>
            </label>
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
