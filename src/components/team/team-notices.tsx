"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AlertTriangle, BadgeCheck, Bell, CheckCircle2, ChevronDown, Eye, Loader2, Megaphone, Pencil, Pin, Plus, Star, Trash2 } from "lucide-react";
import { fill } from "@/lib/shop-strings";
import { teamStrings, type TeamStrings } from "@/lib/team-strings";
import {
  AttachmentGallery,
  AttachmentPicker,
  ConfirmDialog,
  PersonAvatar,
  RichText,
  Sheet,
  Toggle,
  relativeTime,
  useToast,
  type Member,
  type MediaRef,
} from "@/components/team/team-ui";

type Priority = "NORMAL" | "IMPORTANT" | "URGENT";

interface Notice {
  id: string;
  authorId: string;
  title: string;
  body: string;
  priority: Priority;
  pinned: boolean;
  requireAck: boolean;
  attachments: MediaRef[];
  createdAt: string;
  updatedAt: string;
  myRead: { readAt: string; ackAt: string | null } | null;
  reads?: { userId: string; readAt: string; ackAt: string | null }[];
}

interface Data {
  me: string;
  isOwner: boolean;
  members: Member[];
  announcements: Notice[];
}

type Filter = "all" | "unread" | "pinned" | "ack";

const PRIORITY_STYLE: Record<Priority, { bar: string; chip: string; icon: typeof Bell }> = {
  NORMAL: { bar: "", chip: "bg-mist-50 text-ink-500", icon: Bell },
  IMPORTANT: { bar: "bg-gradient-to-r from-[#e2c27d] via-[#c99a3f] to-[#a8792b]", chip: "bg-[#fbf1dc] text-[#8a6a2c]", icon: Star },
  URGENT: { bar: "bg-gradient-to-r from-[#e47e97] via-[#c6274d] to-[#a31f3f]", chip: "bg-berry-50 text-berry-600", icon: AlertTriangle },
};

export function TeamNotices({ locale, focusId }: { locale: string; focusId?: string }) {
  const S = teamStrings(locale);
  const [data, setData] = useState<Data | null>(null);
  const [filter, setFilter] = useState<Filter>("all");
  const [editing, setEditing] = useState<Notice | "new" | null>(null);
  const [confirm, setConfirm] = useState<Notice | null>(null);
  const [toast, setToast] = useToast();

  const load = useCallback(async () => {
    const res = await fetch("/api/business/team/announcements").catch(() => null);
    if (res?.ok) setData(await res.json());
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const people = new Map((data?.members ?? []).map((m) => [m.userId, m]));
  const staff = (data?.members ?? []).filter((m) => !m.isOwner);

  const markRead = useCallback(async (id: string, ack = false) => {
    const res = await fetch(`/api/business/team/announcements/${id}/read`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ack }),
    }).catch(() => null);
    if (!res?.ok) return;
    const read = await res.json();
    setData((d) => (d ? { ...d, announcements: d.announcements.map((a) => (a.id === id ? { ...a, myRead: read } : a)) } : d));
  }, []);

  // Staff: a notice counts as seen once it has been on screen for a moment.
  const observer = useRef<IntersectionObserver | null>(null);
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());
  useEffect(() => {
    if (!data || data.isOwner) return;
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).dataset.notice!;
          if (e.isIntersecting) {
            if (!timers.current.has(id)) timers.current.set(id, setTimeout(() => markRead(id), 900));
          } else {
            clearTimeout(timers.current.get(id));
            timers.current.delete(id);
          }
        }
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll<HTMLElement>("[data-notice][data-unread='1']").forEach((el) => observer.current!.observe(el));
    return () => observer.current?.disconnect();
  }, [data, markRead]);

  // ?a=<id> from a push notification.
  useEffect(() => {
    if (!focusId || !data) return;
    const el = document.getElementById(`notice-${focusId}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [focusId, data]);

  const list = (data?.announcements ?? []).filter((a) =>
    filter === "unread" ? !data?.isOwner && !a.myRead : filter === "pinned" ? a.pinned : filter === "ack" ? a.requireAck && (data?.isOwner || !a.myRead?.ackAt) : true
  );
  const unreadCount = data && !data.isOwner ? data.announcements.filter((a) => !a.myRead).length : 0;
  const ackCount = data ? data.announcements.filter((a) => a.requireAck && (data.isOwner || !a.myRead?.ackAt)).length : 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-ink-900 sm:text-3xl">{S.noticesTitle}</h2>
          <p className="mt-1 text-sm text-ink-400">{S.noticesSub}</p>
        </div>
        {data?.isOwner && (
          <button
            type="button"
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#40325c] to-[#1f182d] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#1f182d]/25 transition hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            {S.newNotice}
          </button>
        )}
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {(
          [
            ["all", S.fAll, 0],
            ...(data?.isOwner ? [] : [["unread", S.fUnread, unreadCount] as const]),
            ["pinned", S.fPinned, 0],
            ["ack", S.fAck, data?.isOwner ? 0 : ackCount],
          ] as [Filter, string, number][]
        ).map(([k, label, n]) => (
          <button
            key={k}
            type="button"
            onClick={() => setFilter(k)}
            className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${
              filter === k ? "bg-[#1f182d] text-white shadow" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50"
            }`}
          >
            {label}
            {n > 0 && <span className={`rounded-full px-1.5 text-[10px] ${filter === k ? "bg-[#e8d3a6] text-[#1f182d]" : "bg-berry-500 text-white"}`}>{n}</span>}
          </button>
        ))}
      </div>

      {!data ? (
        <div className="space-y-4">
          {[0, 1].map((i) => (
            <div key={i} className="h-44 animate-pulse rounded-[1.75rem] bg-white ring-1 ring-ink-100" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <div className="flex flex-col items-center rounded-[1.75rem] border border-dashed border-[#d8c49a] bg-[#fffaf0] px-6 py-14 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#2f2544] to-[#120d1b] text-[#e8d3a6] shadow-lg">
            <Megaphone className="h-7 w-7" />
          </span>
          <p className="mt-4 max-w-sm text-sm font-semibold text-[#6b5221]">
            {data.announcements.length > 0 ? S.noNoticesFilter : data.isOwner ? S.noNoticesOwner : S.noNoticesStaff}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((a) => (
            <NoticeCard
              key={a.id}
              a={a}
              S={S}
              locale={locale}
              isOwner={data.isOwner}
              author={people.get(a.authorId)}
              staff={staff}
              focused={a.id === focusId}
              onAck={() => markRead(a.id, true)}
              onEdit={() => setEditing(a)}
              onDelete={() => setConfirm(a)}
            />
          ))}
        </div>
      )}

      {editing && (
        <NoticeEditor
          S={S}
          initial={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onError={setToast}
          onSaved={(created) => {
            setEditing(null);
            setToast(created ? S.publishedToast : S.savedToast);
            load();
          }}
        />
      )}
      {confirm && (
        <ConfirmDialog
          text={S.deleteNoticeConfirm}
          confirmLabel={S.deleteNotice}
          cancelLabel={S.cancel}
          onClose={() => setConfirm(null)}
          onConfirm={async () => {
            await fetch(`/api/business/team/announcements/${confirm.id}`, { method: "DELETE" }).catch(() => null);
            setToast(S.deletedToast);
            load();
          }}
        />
      )}
      {toast}
    </div>
  );
}

function NoticeCard({
  a,
  S,
  locale,
  isOwner,
  author,
  staff,
  focused,
  onAck,
  onEdit,
  onDelete,
}: {
  a: Notice;
  S: TeamStrings;
  locale: string;
  isOwner: boolean;
  author: Member | undefined;
  staff: Member[];
  focused: boolean;
  onAck: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [showReads, setShowReads] = useState(false);
  const [acking, setAcking] = useState(false);
  const long = a.body.length > 420 || a.body.split("\n").length > 7;
  const style = PRIORITY_STYLE[a.priority];
  const unread = !isOwner && !a.myRead;
  const reads = new Map((a.reads ?? []).map((r) => [r.userId, r]));
  const readCount = staff.filter((m) => reads.has(m.userId)).length;
  const ackCount = staff.filter((m) => reads.get(m.userId)?.ackAt).length;
  const stamp = (iso: string) => new Date(iso).toLocaleString(locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <article
      id={`notice-${a.id}`}
      data-notice={a.id}
      data-unread={unread ? "1" : "0"}
      className={`relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_18px_50px_-32px_rgba(31,24,45,0.45)] ring-1 transition ${
        focused ? "ring-2 ring-[#c99a3f]" : unread ? "ring-[#e8d3a6]" : "ring-ink-100"
      }`}
    >
      {style.bar && <div className={`h-1.5 ${style.bar}`} />}
      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <PersonAvatar id={author?.userId ?? a.authorId} name={author?.name ?? S.owner} url={author?.avatarUrl} size={42} owner />
          <div className="min-w-0 flex-1">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
              <span className="font-bold text-ink-900">{author?.name ?? S.owner}</span>
              <span className="text-[11px] text-ink-400" suppressHydrationWarning>
                {relativeTime(a.createdAt, locale)}
              </span>
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              {a.priority !== "NORMAL" && (
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${style.chip}`}>
                  <style.icon className="h-3 w-3" />
                  {S[`p${a.priority}`]}
                </span>
              )}
              {a.pinned && (
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1f182d] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#e8d3a6]">
                  <Pin className="h-3 w-3" />
                  {S.pinned}
                </span>
              )}
              {unread && <span className="inline-flex items-center gap-1 rounded-full bg-berry-500 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">{S.isNew}</span>}
            </div>
          </div>
          {isOwner && (
            <div className="flex shrink-0 gap-1">
              <button type="button" onClick={onEdit} className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 hover:bg-mist-50 hover:text-ink-900" aria-label={S.editNotice}>
                <Pencil className="h-4 w-4" />
              </button>
              <button type="button" onClick={onDelete} className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 hover:bg-berry-50 hover:text-berry-600" aria-label={S.deleteNotice}>
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <h3 className="mt-4 font-serif text-xl leading-snug text-ink-900 sm:text-2xl">{a.title}</h3>
        <div className={`relative mt-2 text-[15px] leading-relaxed text-ink-700 ${long && !expanded ? "max-h-40 overflow-hidden" : ""}`}>
          <RichText text={a.body} />
          {long && !expanded && <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />}
        </div>
        {long && (
          <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-1 text-xs font-bold text-[#a8792b] hover:underline">
            {expanded ? S.showLess : S.readMore}
          </button>
        )}

        {a.attachments.length > 0 && (
          <div className="mt-4">
            <AttachmentGallery attachments={a.attachments} S={S} />
          </div>
        )}

        {!isOwner && a.requireAck && (
          <div className="mt-5">
            {a.myRead?.ackAt ? (
              <p className="flex items-center gap-2 rounded-2xl bg-emerald-50 px-4 py-3 text-xs font-bold text-emerald-700" suppressHydrationWarning>
                <BadgeCheck className="h-4 w-4" />
                {fill(S.acked, { time: stamp(a.myRead.ackAt) })}
              </p>
            ) : (
              <button
                type="button"
                disabled={acking}
                onClick={async () => {
                  setAcking(true);
                  await onAck();
                  setAcking(false);
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c99a3f] to-[#a8792b] py-3 text-sm font-bold text-white shadow-lg shadow-[#a8792b]/25 transition hover:brightness-105"
              >
                {acking ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                {S.ack}
              </button>
            )}
          </div>
        )}

        {isOwner && staff.length > 0 && (
          <div className="mt-5 rounded-2xl bg-[#fbfaf8] p-3.5 ring-1 ring-ink-100">
            <button type="button" onClick={() => setShowReads((v) => !v)} className="flex w-full items-center gap-3 text-left">
              <div className="min-w-0 flex-1 space-y-2">
                <Meter icon={Eye} label={fill(S.readN, { n: readCount, total: staff.length })} value={readCount / staff.length} tone="plum" />
                {a.requireAck && <Meter icon={BadgeCheck} label={fill(S.ackN, { n: ackCount, total: staff.length })} value={ackCount / staff.length} tone="gold" />}
              </div>
              <ChevronDown className={`h-4 w-4 shrink-0 text-ink-400 transition ${showReads ? "rotate-180" : ""}`} />
            </button>
            {showReads && (
              <ul className="mt-3 space-y-1 border-t border-ink-100 pt-3">
                {staff.map((m) => {
                  const r = reads.get(m.userId);
                  return (
                    <li key={m.userId} className="flex items-center gap-3 rounded-xl px-1 py-1.5">
                      <PersonAvatar id={m.userId} name={m.name} url={m.avatarUrl} size={30} />
                      <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink-900">{m.name}</span>
                      <span
                        suppressHydrationWarning
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                          r?.ackAt ? "bg-emerald-50 text-emerald-700" : r ? "bg-[#f4f1fa] text-[#40325c]" : "bg-mist-50 text-ink-400"
                        }`}
                      >
                        {r?.ackAt ? fill(S.ackAt, { time: stamp(r.ackAt) }) : r ? fill(S.readAt, { time: stamp(r.readAt) }) : S.notRead}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

function Meter({ icon: Icon, label, value, tone }: { icon: typeof Eye; label: string; value: number; tone: "plum" | "gold" }) {
  return (
    <div>
      <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-ink-700">
        <Icon className={`h-3.5 w-3.5 ${tone === "gold" ? "text-[#a8792b]" : "text-[#624f89]"}`} />
        {label}
      </p>
      <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
        <div
          className={`h-full rounded-full transition-all ${tone === "gold" ? "bg-gradient-to-r from-[#e2c27d] to-[#a8792b]" : "bg-gradient-to-r from-[#8b76b9] to-[#40325c]"}`}
          style={{ width: `${Math.round(value * 100)}%` }}
        />
      </div>
    </div>
  );
}

function NoticeEditor({
  S,
  initial,
  onClose,
  onSaved,
  onError,
}: {
  S: TeamStrings;
  initial: Notice | null;
  onClose: () => void;
  onSaved: (created: boolean) => void;
  onError: (msg: string) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? "NORMAL");
  const [pinned, setPinned] = useState(initial?.pinned ?? false);
  const [requireAck, setRequireAck] = useState(initial?.requireAck ?? false);
  const [attachments, setAttachments] = useState<MediaRef[]>(initial?.attachments ?? []);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save() {
    if (!title.trim()) return setError(S.errTitle);
    if (!body.trim()) return setError(S.errBody);
    setBusy(true);
    setError(null);
    const res = await fetch(initial ? `/api/business/team/announcements/${initial.id}` : "/api/business/team/announcements", {
      method: initial ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body, priority, pinned, requireAck, attachmentIds: attachments.map((a) => a.mediaId) }),
    }).catch(() => null);
    setBusy(false);
    if (!res?.ok) return setError(S.errSave);
    onSaved(!initial);
  }

  return (
    <Sheet title={initial ? S.editNotice : S.newNotice} onClose={onClose} wide>
      <div className="space-y-5 p-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={160}
          placeholder={S.noticeTitlePh}
          className="w-full border-0 border-b border-ink-100 bg-transparent pb-3 font-serif text-2xl text-ink-900 outline-none placeholder:text-ink-300 focus:border-[#c99a3f]"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={7}
          placeholder={S.noticeBodyPh}
          className="w-full resize-y rounded-2xl border border-ink-100 bg-white p-4 text-[15px] leading-relaxed text-ink-900 outline-none placeholder:text-ink-300 focus:border-[#c99a3f]"
        />

        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.priority}</p>
          <div className="grid grid-cols-3 gap-2">
            {(["NORMAL", "IMPORTANT", "URGENT"] as Priority[]).map((p) => {
              const st = PRIORITY_STYLE[p];
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-3 text-xs font-bold ring-1 transition ${
                    priority === p ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-700 ring-ink-100 hover:bg-mist-50"
                  }`}
                >
                  <st.icon className={`h-4 w-4 ${priority === p ? "text-[#e8d3a6]" : p === "URGENT" ? "text-berry-500" : p === "IMPORTANT" ? "text-[#c99a3f]" : "text-ink-400"}`} />
                  {S[`p${p}`]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl bg-white p-4 ring-1 ring-ink-100">
          <Toggle on={pinned} onChange={setPinned} label={S.pin} />
          <div className="border-t border-ink-100" />
          <Toggle on={requireAck} onChange={setRequireAck} label={S.requireAck} hint={S.requireAckHint} />
        </div>

        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.attachments}</p>
          <AttachmentPicker value={attachments} onChange={setAttachments} S={S} onError={onError} label={S.addAttachment} />
        </div>

        {error && <p className="rounded-xl bg-berry-50 px-3 py-2 text-xs font-semibold text-berry-600">{error}</p>}
        <button
          type="button"
          disabled={busy}
          onClick={save}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#40325c] to-[#1f182d] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1f182d]/25 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Megaphone className="h-4 w-4" />}
          {initial ? S.update : S.publish}
        </button>
      </div>
    </Sheet>
  );
}
