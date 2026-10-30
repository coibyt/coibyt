"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  BellOff,
  Check,
  CheckCheck,
  ChevronLeft,
  Copy,
  Crown,
  FileText,
  ImageIcon,
  Info,
  Loader2,
  LogOut,
  MessageCircle,
  Paperclip,
  Pencil,
  Plus,
  Reply,
  Search,
  SendHorizontal,
  Shield,
  Smile,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { fill } from "@/lib/shop-strings";
import { teamStrings, type TeamStrings } from "@/lib/team-strings";
import { mediaKindFor } from "@/lib/team-media";
import {
  ACCEPT_FILES,
  ACCEPT_MEDIA,
  ConfirmDialog,
  FileCard,
  GROUP_COLORS,
  GroupAvatar,
  Lightbox,
  MediaThumb,
  PersonAvatar,
  RichText,
  Sheet,
  shortStamp,
  uploadErrorText,
  uploadTeamMedia,
  useToast,
  type Media,
  type Member,
} from "@/components/team/team-ui";

interface LastMessage {
  senderId: string;
  body: string | null;
  mediaKind: string | null;
  system: boolean;
  deleted: boolean;
}

interface ChatSummary {
  id: string;
  kind: "ALL" | "GROUP" | "DIRECT";
  name: string | null;
  color: string | null;
  memberIds: string[];
  adminIds: string[];
  muted: boolean;
  unread: number;
  lastMessageAt: string;
  lastMessage: LastMessage | null;
}

interface ChatDetail {
  id: string;
  kind: "ALL" | "GROUP" | "DIRECT";
  name: string | null;
  color: string | null;
  muted: boolean;
  memberIds: string[];
  adminIds: string[];
}

interface Msg {
  id: string;
  senderId: string;
  body: string | null;
  system: boolean;
  deleted: boolean;
  edited: boolean;
  createdAt: string;
  media: Media | null;
  replyTo: { id: string; senderId: string; body: string | null; mediaKind: string | null; deleted: boolean } | null;
  reactions: { emoji: string; userIds: string[] }[];
  /** Still on its way: upload progress (0–100) or sending. */
  pending?: number | true;
  failed?: boolean;
}

interface ListData {
  me: string;
  isOwner: boolean;
  members: Member[];
  former: Member[];
  chats: ChatSummary[];
}

const QUICK = ["❤️", "😂", "😮", "😢", "👍", "🙏"];

const EMOJI: { key: keyof TeamStrings; list: string[] }[] = [
  { key: "emojiSmileys", list: "😀 😃 😄 😁 😆 😅 🤣 😂 🙂 😉 😊 😇 🥰 😍 🤩 😘 😋 😜 🤪 🤗 🤭 🤫 🤔 😐 😏 😌 😴 🥳 😎 🤓 🧐 😕 😟 😮 😲 🥺 😢 😭 😤 😡 🤯 😳 🥶 😱 🙄 😬 🤒 🤧".split(" ") },
  { key: "emojiHands", list: "👍 👎 👌 ✌️ 🤞 🤟 🤙 👋 🙌 👏 🙏 🤝 💪 ✋ 👊 ✊ 🤲 👉 👈 ☝️ 👇 👐 💁‍♀️ 🙋‍♀️ 🙆‍♀️ 🙅‍♀️ 🤷‍♀️ 🤦‍♀️".split(" ") },
  { key: "emojiHearts", list: "❤️ 🧡 💛 💚 💙 💜 🤍 🖤 🤎 💖 💗 💓 💞 💕 💘 💝 💯 ✨ 🌟 ⭐ 🔥 🎉 🎊 🥂 🍾 🎁 🌹 🌸 🌷 💐".split(" ") },
  { key: "emojiSalon", list: "💅 💇‍♀️ 💆‍♀️ 💄 💋 👄 👁️ 💎 💍 👑 💈 🧴 🧼 🌺 🎀 ✂️ 🌿 🕯️ 🛁 💳 💶 📅 ⏰ 📞 📸 🧾 🛍️ 🏆".split(" ") },
  { key: "emojiMore", list: "☕ 🍵 🧋 🥐 🍰 🍕 🍜 🍣 🍓 🍉 🌞 🌙 ☔ ❄️ 🌈 🚗 ✈️ 🏖️ 🎂 🎈 📌 ✅ ❌ ⚠️ ❗ ❓ 💡 📣 🔔 🆗".split(" ") },
];

const COLOR_KEYS = Object.keys(GROUP_COLORS);

function isEmojiOnly(text: string) {
  const t = text.trim();
  if (!t || t.length > 16) return false;
  return /^(\p{Extended_Pictographic}|\p{Emoji_Component}|‍|️|\s)+$/u.test(t) && !/^[\d#*\s]+$/.test(t);
}

function dayLabel(iso: string, locale: string, S: TeamStrings) {
  const d = new Date(iso);
  const now = new Date();
  const yesterday = new Date(now.getTime() - 86400e3);
  if (d.toDateString() === now.toDateString()) return S.today;
  if (d.toDateString() === yesterday.toDateString()) return S.yesterday;
  return d.toLocaleDateString(locale, { weekday: "long", day: "numeric", month: "long", ...(d.getFullYear() !== now.getFullYear() && { year: "numeric" }) });
}

export function TeamChat({ locale, initialChatId, initialTo }: { locale: string; initialChatId?: string; initialTo?: string }) {
  const S = teamStrings(locale);
  const [data, setData] = useState<ListData | null>(null);
  const [activeId, setActiveId] = useState<string | null>(initialChatId ?? null);
  const [search, setSearch] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [toast, setToast] = useToast();

  const loadList = useCallback(async () => {
    const res = await fetch("/api/business/team/chats").catch(() => null);
    if (res?.ok) setData(await res.json());
  }, []);

  useEffect(() => {
    loadList();
    const id = setInterval(() => document.visibilityState === "visible" && loadList(), 10000);
    const onVis = () => document.visibilityState === "visible" && loadList();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [loadList]);

  const people = useMemo(() => {
    const map = new Map<string, Member>();
    for (const m of [...(data?.former ?? []), ...(data?.members ?? [])]) map.set(m.userId, m);
    return map;
  }, [data]);

  const select = useCallback((id: string | null) => {
    setActiveId(id);
    const url = new URL(window.location.href);
    url.searchParams.delete("to");
    if (id) url.searchParams.set("c", id);
    else url.searchParams.delete("c");
    window.history.replaceState(null, "", url.toString());
  }, []);

  const openDirect = useCallback(
    async (userId: string) => {
      const res = await fetch("/api/business/team/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "DIRECT", userId }),
      }).catch(() => null);
      if (!res?.ok) return;
      const { id } = await res.json();
      setShowNew(false);
      select(id);
      loadList();
    },
    [select, loadList]
  );

  // ?to=<userId> from a teammate's profile starts a direct chat.
  const startedTo = useRef(false);
  useEffect(() => {
    if (initialTo && data && !startedTo.current) {
      startedTo.current = true;
      openDirect(initialTo);
    }
  }, [initialTo, data, openDirect]);

  const chatTitle = useCallback(
    (c: { kind: string; name: string | null; memberIds: string[] }) => {
      if (c.kind === "ALL") return S.allChat;
      if (c.kind === "GROUP") return c.name ?? "";
      const other = c.memberIds.find((id) => id !== data?.me);
      return (other && people.get(other)?.name) || S.formerMember;
    },
    [S, data?.me, people]
  );

  const preview = (c: ChatSummary) => {
    const m = c.lastMessage;
    if (!m) return c.kind === "ALL" ? S.allChatSub : S.sayHi;
    const who = m.senderId === data?.me ? S.you : (people.get(m.senderId)?.name.split(" ")[0] ?? "");
    if (m.system) return systemText(m.body, m.senderId);
    if (m.deleted) return S.deleted;
    const text = m.body ?? (m.mediaKind === "IMAGE" ? S.photo : m.mediaKind === "VIDEO" ? S.video : S.file);
    return c.kind === "DIRECT" && m.senderId !== data?.me ? text : `${who}: ${text}`;
  };

  function systemText(body: string | null, senderId: string) {
    let e: { type?: string; name?: string; ids?: string[] } = {};
    try {
      e = JSON.parse(body ?? "{}");
    } catch {}
    const who = senderId === data?.me ? S.you : (people.get(senderId)?.name ?? S.formerMember);
    const names = (e.ids ?? []).map((id) => (id === data?.me ? S.you.toLowerCase() : (people.get(id)?.name ?? S.formerMember))).join(", ");
    const tpl = e.type === "created" ? S.sysCreated : e.type === "added" ? S.sysAdded : e.type === "removed" ? S.sysRemoved : e.type === "renamed" ? S.sysRenamed : S.sysLeft;
    return fill(tpl, { who, name: e.name ?? "", names });
  }

  const filtered = (data?.chats ?? []).filter((c) => !search.trim() || chatTitle(c).toLowerCase().includes(search.trim().toLowerCase()));
  const activeSummary = data?.chats.find((c) => c.id === activeId) ?? null;

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-ink-100 bg-white shadow-[0_20px_60px_-30px_rgba(31,24,45,0.35)]">
      <div className="grid h-[calc(100dvh-230px)] min-h-[560px] grid-cols-1 md:grid-cols-[320px_1fr]">
        {/* Chat list */}
        <aside className={`flex min-h-0 flex-col border-r border-ink-100 bg-[#fbfaf8] ${activeId ? "hidden md:flex" : "flex"}`}>
          <div className="space-y-3 border-b border-ink-100 p-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-lg font-bold text-ink-900">{S.tabChat}</h2>
              <button
                type="button"
                onClick={() => setShowNew(true)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1f182d] px-3.5 py-2 text-xs font-bold text-white shadow-md shadow-[#1f182d]/20 transition hover:bg-[#2f2544]"
              >
                <Plus className="h-3.5 w-3.5" />
                {S.newChat}
              </button>
            </div>
            <label className="flex items-center gap-2 rounded-full bg-white px-3.5 py-2 ring-1 ring-ink-100 focus-within:ring-[#c99a3f]">
              <Search className="h-4 w-4 text-ink-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={S.searchChats}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-ink-300"
              />
            </label>
          </div>
          <ul className="min-h-0 flex-1 space-y-0.5 overflow-y-auto p-2">
            {!data &&
              Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl p-3">
                  <span className="h-11 w-11 animate-pulse rounded-2xl bg-ink-100" />
                  <span className="flex-1 space-y-2">
                    <span className="block h-3 w-1/2 animate-pulse rounded bg-ink-100" />
                    <span className="block h-2.5 w-3/4 animate-pulse rounded bg-ink-100" />
                  </span>
                </li>
              ))}
            {data && filtered.length === 0 && <li className="p-6 text-center text-xs text-ink-400">{search ? S.noResults : S.noChats}</li>}
            {filtered.map((c) => {
              const title = chatTitle(c);
              const other = c.kind === "DIRECT" ? people.get(c.memberIds.find((id) => id !== data?.me) ?? "") : undefined;
              const active = c.id === activeId;
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => select(c.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl p-2.5 text-left transition ${
                      active ? "bg-white shadow-sm ring-1 ring-[#e8d3a6]" : "hover:bg-white/80"
                    }`}
                  >
                    {c.kind === "DIRECT" ? (
                      <PersonAvatar id={other?.userId ?? c.id} name={title} url={other?.avatarUrl} size={44} owner={other?.isOwner} />
                    ) : (
                      <GroupAvatar name={title} color={c.color} all={c.kind === "ALL"} />
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className={`truncate text-sm ${c.unread ? "font-extrabold text-ink-900" : "font-bold text-ink-900"}`}>{title}</span>
                        <span className={`shrink-0 text-[10px] ${c.unread ? "font-bold text-[#a8792b]" : "text-ink-400"}`} suppressHydrationWarning>
                          {c.lastMessage ? shortStamp(c.lastMessageAt, locale) : ""}
                        </span>
                      </span>
                      <span className="mt-0.5 flex items-center gap-2">
                        <span className={`min-w-0 flex-1 truncate text-xs ${c.unread ? "font-semibold text-ink-700" : "text-ink-400"}`}>{preview(c)}</span>
                        {c.muted && <BellOff className="h-3 w-3 shrink-0 text-ink-300" />}
                        {c.unread > 0 && (
                          <span className="min-w-[20px] shrink-0 rounded-full bg-gradient-to-br from-[#d8b46a] to-[#a8792b] px-1.5 py-0.5 text-center text-[10px] font-bold leading-none text-white shadow-sm">
                            {c.unread > 99 ? "99+" : c.unread}
                          </span>
                        )}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          {/* Teammates, one tap from a private chat. */}
          {data && data.members.length > 1 && (
            <div className="border-t border-ink-100 p-3">
              <p className="mb-2 px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink-400">{S.teamTitle}</p>
              <div className="flex gap-3 overflow-x-auto pb-1">
                {data.members
                  .filter((m) => m.userId !== data.me)
                  .map((m) => (
                    <button key={m.userId} type="button" onClick={() => openDirect(m.userId)} className="flex w-14 shrink-0 flex-col items-center gap-1">
                      <PersonAvatar id={m.userId} name={m.name} url={m.avatarUrl} size={40} owner={m.isOwner} />
                      <span className="w-full truncate text-center text-[10px] font-semibold text-ink-700">{m.name.split(" ")[0]}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </aside>

        {/* Conversation */}
        {/* On phones an open chat takes the whole screen, like a messaging app. */}
        <section className={`min-h-0 flex-col ${activeId ? "fixed inset-0 z-[100] flex bg-white md:static md:z-auto" : "hidden md:flex"}`}>
          {activeId && data ? (
            <ChatRoom
              key={activeId}
              chatId={activeId}
              me={data.me}
              isOwner={data.isOwner}
              team={data.members}
              people={people}
              initial={activeSummary}
              title={chatTitle}
              systemText={systemText}
              locale={locale}
              S={S}
              onBack={() => select(null)}
              onChanged={loadList}
              onGone={() => {
                select(null);
                loadList();
              }}
              openDirect={openDirect}
              toast={setToast}
            />
          ) : (
            <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[#f7f4ef] p-8 text-center">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#e8d3a6]/40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-[#b7a4dc]/30 blur-3xl" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-[#2f2544] to-[#120d1b] text-[#e8d3a6] shadow-xl">
                <MessageCircle className="h-9 w-9" />
              </span>
              <p className="relative mt-5 font-serif text-2xl text-ink-900">{S.pickChat}</p>
              <p className="relative mt-1.5 max-w-xs text-sm text-ink-400">{S.pickChatSub}</p>
            </div>
          )}
        </section>
      </div>

      {showNew && data && (
        <NewChatSheet
          S={S}
          me={data.me}
          members={data.members}
          onClose={() => setShowNew(false)}
          onDirect={openDirect}
          onGroup={async (name, color, ids) => {
            const res = await fetch("/api/business/team/chats", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ kind: "GROUP", name, color, memberIds: ids }),
            }).catch(() => null);
            if (!res?.ok) return false;
            const { id } = await res.json();
            setShowNew(false);
            select(id);
            loadList();
            return true;
          }}
        />
      )}
      {toast}
    </div>
  );
}

// ── One conversation ─────────────────────────────────────────────────────

function ChatRoom({
  chatId,
  me,
  isOwner,
  team,
  people,
  initial,
  title,
  systemText,
  locale,
  S,
  onBack,
  onChanged,
  onGone,
  openDirect,
  toast,
}: {
  chatId: string;
  me: string;
  isOwner: boolean;
  team: Member[];
  people: Map<string, Member>;
  initial: ChatSummary | null;
  title: (c: { kind: string; name: string | null; memberIds: string[] }) => string;
  systemText: (body: string | null, senderId: string) => string;
  locale: string;
  S: TeamStrings;
  onBack: () => void;
  onChanged: () => void;
  onGone: () => void;
  openDirect: (userId: string) => void;
  toast: (msg: string) => void;
}) {
  const [chat, setChat] = useState<ChatDetail | null>(
    initial ? { id: initial.id, kind: initial.kind, name: initial.name, color: initial.color, muted: initial.muted, memberIds: initial.memberIds, adminIds: initial.adminIds } : null
  );
  const [messages, setMessages] = useState<Msg[] | null>(null);
  const [reads, setReads] = useState<{ userId: string; at: string }[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<Msg | null>(null);
  const [editing, setEditing] = useState<Msg | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttach, setShowAttach] = useState(false);
  const [actionsFor, setActionsFor] = useState<Msg | null>(null);
  const [showInfo, setShowInfo] = useState(false);
  const [lightbox, setLightbox] = useState<{ items: Media[]; index: number } | null>(null);
  const [confirm, setConfirm] = useState<{ text: string; label: string; run: () => void } | null>(null);
  const [atBottom, setAtBottom] = useState(true);
  const [dragging, setDragging] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const textarea = useRef<HTMLTextAreaElement>(null);
  const mediaInput = useRef<HTMLInputElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const stick = useRef(true);
  const tmp = useRef(0);
  const olderLoaded = useRef(false);
  // The parent's callbacks change on every render; the polling must not.
  const goneRef = useRef(onGone);
  goneRef.current = onGone;
  const changedRef = useRef(onChanged);
  changedRef.current = onChanged;

  const load = useCallback(async () => {
    const res = await fetch(`/api/business/team/chats/${chatId}/messages?read=1`).catch(() => null);
    if (!res) return;
    if (res.status === 404) return goneRef.current();
    if (!res.ok) return;
    const d = await res.json();
    setChat(d.chat);
    setReads(d.reads);
    setMessages((prev) => {
      const fresh: Msg[] = d.messages;
      const firstAt = fresh[0]?.createdAt;
      const older = prev && firstAt ? prev.filter((m) => !m.pending && !m.failed && m.createdAt < firstAt) : [];
      const local = prev ? prev.filter((m) => m.pending !== undefined || m.failed) : [];
      return [...older, ...fresh, ...local];
    });
    // Once older pages are loaded, "more" is theirs to say.
    if (!olderLoaded.current) setHasMore(d.hasMore);
  }, [chatId]);

  useEffect(() => {
    load().then(() => changedRef.current());
    const id = setInterval(() => document.visibilityState === "visible" && load(), 3000);
    return () => clearInterval(id);
  }, [load]);

  // Keep to the newest message unless the user has scrolled up to read.
  useLayoutEffect(() => {
    const el = scroller.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, [messages]);

  function onScroll() {
    const el = scroller.current;
    if (!el) return;
    const near = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    stick.current = near;
    setAtBottom(near);
  }

  function toBottom() {
    const el = scroller.current;
    if (!el) return;
    stick.current = true;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }

  async function loadOlder() {
    if (!messages?.length) return;
    setLoadingOlder(true);
    const el = scroller.current;
    const before = el ? el.scrollHeight : 0;
    const first = messages.find((m) => !m.pending)?.createdAt;
    const res = await fetch(`/api/business/team/chats/${chatId}/messages?before=${encodeURIComponent(first ?? "")}`).catch(() => null);
    setLoadingOlder(false);
    if (!res?.ok) return;
    const d = await res.json();
    stick.current = false;
    olderLoaded.current = true;
    setHasMore(d.hasMore);
    setMessages((prev) => [...d.messages.filter((m: Msg) => !prev?.some((x) => x.id === m.id)), ...(prev ?? [])]);
    requestAnimationFrame(() => {
      if (el) el.scrollTop = el.scrollHeight - before;
    });
  }

  function autosize() {
    const t = textarea.current;
    if (!t) return;
    t.style.height = "auto";
    t.style.height = `${Math.min(t.scrollHeight, 140)}px`;
  }
  useEffect(autosize, [text]);

  async function post(payload: { body?: string; mediaId?: string; replyToId?: string }) {
    const res = await fetch(`/api/business/team/chats/${chatId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);
    return !!res?.ok;
  }

  async function send() {
    const body = text.trim();
    if (!body) return;
    if (editing) {
      const id = editing.id;
      setEditing(null);
      setText("");
      setMessages((prev) => prev?.map((m) => (m.id === id ? { ...m, body, edited: true } : m)) ?? prev);
      await fetch(`/api/business/team/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      }).catch(() => null);
      return load();
    }
    const temp: Msg = {
      id: `tmp-${++tmp.current}`,
      senderId: me,
      body,
      system: false,
      deleted: false,
      edited: false,
      createdAt: new Date().toISOString(),
      media: null,
      replyTo: replyTo ? { id: replyTo.id, senderId: replyTo.senderId, body: replyTo.body, mediaKind: replyTo.media?.kind ?? null, deleted: false } : null,
      reactions: [],
      pending: true,
    };
    const reply = replyTo?.id;
    setText("");
    setReplyTo(null);
    stick.current = true;
    setMessages((prev) => [...(prev ?? []), temp]);
    const ok = await post({ body, replyToId: reply });
    if (!ok) {
      setMessages((prev) => prev?.map((m) => (m.id === temp.id ? { ...m, pending: undefined, failed: true } : m)) ?? prev);
      return;
    }
    await load();
    setMessages((prev) => prev?.filter((m) => m.id !== temp.id) ?? prev);
    onChanged();
  }

  async function sendFiles(files: FileList | File[] | null) {
    if (!files) return;
    setShowAttach(false);
    for (const file of Array.from(files)) {
      const kind = mediaKindFor(file.type, file.name);
      const temp: Msg = {
        id: `tmp-${++tmp.current}`,
        senderId: me,
        body: null,
        system: false,
        deleted: false,
        edited: false,
        createdAt: new Date().toISOString(),
        media: { id: "", kind: kind ?? "FILE", mimeType: file.type, name: file.name, size: file.size },
        replyTo: null,
        reactions: [],
        pending: 0,
      };
      stick.current = true;
      setMessages((prev) => [...(prev ?? []), temp]);
      try {
        const media = await uploadTeamMedia(file, (p) =>
          setMessages((prev) => prev?.map((m) => (m.id === temp.id ? { ...m, pending: p } : m)) ?? prev)
        );
        setMessages((prev) => prev?.map((m) => (m.id === temp.id ? { ...m, pending: true } : m)) ?? prev);
        const reply = replyTo?.id;
        setReplyTo(null);
        if (!(await post({ mediaId: media.id, replyToId: reply }))) throw new Error("UPLOAD");
        await load();
        setMessages((prev) => prev?.filter((m) => m.id !== temp.id) ?? prev);
        onChanged();
      } catch (err) {
        setMessages((prev) => prev?.filter((m) => m.id !== temp.id) ?? prev);
        toast(uploadErrorText(err, S, kind));
      }
    }
  }

  async function react(m: Msg, emoji: string) {
    setActionsFor(null);
    setMessages(
      (prev) =>
        prev?.map((x) => {
          if (x.id !== m.id) return x;
          const has = x.reactions.find((r) => r.emoji === emoji)?.userIds.includes(me);
          const reactions = has
            ? x.reactions.map((r) => (r.emoji === emoji ? { ...r, userIds: r.userIds.filter((u) => u !== me) } : r)).filter((r) => r.userIds.length)
            : x.reactions.some((r) => r.emoji === emoji)
              ? x.reactions.map((r) => (r.emoji === emoji ? { ...r, userIds: [...r.userIds, me] } : r))
              : [...x.reactions, { emoji, userIds: [me] }];
          return { ...x, reactions };
        }) ?? prev
    );
    await fetch(`/api/business/team/messages/${m.id}/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emoji }),
    }).catch(() => null);
  }

  async function unsend(m: Msg) {
    setMessages((prev) => prev?.map((x) => (x.id === m.id ? { ...x, deleted: true, body: null, media: null, reactions: [] } : x)) ?? prev);
    await fetch(`/api/business/team/messages/${m.id}`, { method: "DELETE" }).catch(() => null);
    load();
    onChanged();
  }

  async function patchChat(body: object) {
    const res = await fetch(`/api/business/team/chats/${chatId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => null);
    await load();
    onChanged();
    return !!res?.ok;
  }

  const name = chat ? title(chat) : "";
  const otherId = chat?.kind === "DIRECT" ? chat.memberIds.find((id) => id !== me) : undefined;
  const other = otherId ? people.get(otherId) : undefined;
  const subtitle = !chat
    ? ""
    : chat.kind === "DIRECT"
      ? other?.isOwner
        ? S.owner
        : (other?.title ?? (other?.left ? S.formerMember : ""))
      : fill(S.membersN, { n: chat.memberIds.length });

  // Photos and videos in this chat, for the lightbox's next/previous.
  const gallery = useMemo(() => (messages ?? []).filter((m) => m.media && m.media.id && (m.media.kind === "IMAGE" || m.media.kind === "VIDEO")).map((m) => m.media!), [messages]);

  // My newest message, and who has seen it.
  const lastMine = [...(messages ?? [])].reverse().find((m) => m.senderId === me && !m.system && !m.pending && !m.failed);
  const lastMineIdx = lastMine ? (messages ?? []).indexOf(lastMine) : -1;
  const lastIdx = (messages ?? []).length - 1;
  const seenBy = lastMine ? reads.filter((r) => r.userId !== me && r.at >= lastMine.createdAt).map((r) => r.userId) : [];
  const others = (chat?.memberIds ?? []).filter((id) => id !== me);

  const replyName = (id: string) => (id === me ? S.you : (people.get(id)?.name ?? S.formerMember));
  const snippet = (r: { body: string | null; mediaKind: string | null; deleted: boolean }) =>
    r.deleted ? S.deleted : (r.body ?? (r.mediaKind === "IMAGE" ? S.photo : r.mediaKind === "VIDEO" ? S.video : S.file));

  return (
    <div
      className="relative flex min-h-0 flex-1 flex-col bg-[#f7f4ef]"
      onDragOver={(e) => {
        if (e.dataTransfer.types.includes("Files")) {
          e.preventDefault();
          setDragging(true);
        }
      }}
      onDragLeave={(e) => {
        if (e.currentTarget === e.target) setDragging(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        sendFiles(e.dataTransfer.files);
      }}
    >
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-ink-100 bg-white/90 px-3 py-2.5 backdrop-blur sm:px-4">
        <button type="button" onClick={onBack} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-700 hover:bg-mist-50 md:hidden" aria-label={S.back}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        {chat &&
          (chat.kind === "DIRECT" ? (
            <PersonAvatar id={otherId ?? chat.id} name={name} url={other?.avatarUrl} size={40} owner={other?.isOwner} />
          ) : (
            <GroupAvatar name={name} color={chat.color} all={chat.kind === "ALL"} size={40} />
          ))}
        <button type="button" onClick={() => setShowInfo(true)} className="min-w-0 flex-1 text-left">
          <span className="flex items-center gap-1.5">
            <span className="truncate text-[15px] font-bold text-ink-900">{name}</span>
            {chat?.muted && <BellOff className="h-3.5 w-3.5 shrink-0 text-ink-300" />}
          </span>
          <span className="block truncate text-[11px] text-ink-400">{subtitle}</span>
        </button>
        <button type="button" onClick={() => setShowInfo(true)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink-700 hover:bg-mist-50" aria-label={S.chatInfo}>
          <Info className="h-5 w-5" />
        </button>
      </header>

      {/* Messages */}
      <div ref={scroller} onScroll={onScroll} className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-3 py-4 sm:px-5">
        {messages === null ? (
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-[#c99a3f]" />
          </div>
        ) : (
          <div className="mx-auto max-w-3xl space-y-0.5">
            {hasMore && (
              <div className="flex justify-center pb-3">
                <button type="button" onClick={loadOlder} disabled={loadingOlder} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-bold text-ink-700 shadow-sm ring-1 ring-ink-100 hover:bg-mist-50">
                  {loadingOlder && <Loader2 className="h-3 w-3 animate-spin" />}
                  {S.loadOlder}
                </button>
              </div>
            )}
            {messages.length === 0 && (
              <div className="flex flex-col items-center py-16 text-center">
                {chat && chat.kind === "DIRECT" ? (
                  <PersonAvatar id={otherId ?? ""} name={name} url={other?.avatarUrl} size={72} owner={other?.isOwner} />
                ) : (
                  chat && <GroupAvatar name={name} color={chat.color} all={chat.kind === "ALL"} size={72} />
                )}
                <p className="mt-3 font-serif text-xl text-ink-900">{name}</p>
                <p className="mt-1 text-sm text-ink-400">{S.sayHi}</p>
              </div>
            )}
            {messages.map((m, i) => {
              const prev = messages[i - 1];
              const next = messages[i + 1];
              const newDay = !prev || new Date(prev.createdAt).toDateString() !== new Date(m.createdAt).toDateString();
              const sameAsPrev = !!prev && !prev.system && !newDay && prev.senderId === m.senderId && new Date(m.createdAt).getTime() - new Date(prev.createdAt).getTime() < 5 * 60e3;
              const sameAsNext =
                !!next && !next.system && next.senderId === m.senderId && new Date(next.createdAt).toDateString() === new Date(m.createdAt).toDateString() && new Date(next.createdAt).getTime() - new Date(m.createdAt).getTime() < 5 * 60e3;
              return (
                <div key={m.id}>
                  {newDay && (
                    <div className="sticky top-0 z-10 flex justify-center py-3">
                      <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink-500 shadow-sm ring-1 ring-ink-100 backdrop-blur" suppressHydrationWarning>
                        {dayLabel(m.createdAt, locale, S)}
                      </span>
                    </div>
                  )}
                  {m.system ? (
                    <p className="px-6 py-2 text-center text-[11px] font-medium text-ink-400">{systemText(m.body, m.senderId)}</p>
                  ) : (
                    <Bubble
                      m={m}
                      me={me}
                      groupChat={chat?.kind !== "DIRECT"}
                      sender={people.get(m.senderId)}
                      first={!sameAsPrev}
                      last={!sameAsNext}
                      locale={locale}
                      S={S}
                      replyName={replyName}
                      snippet={snippet}
                      onOpenMedia={(media) => {
                        const index = gallery.findIndex((g) => g.id === media.id);
                        setLightbox({ items: gallery, index: Math.max(0, index) });
                      }}
                      onReact={(emoji) => react(m, emoji)}
                      onReply={() => {
                        setEditing(null);
                        setReplyTo(m);
                        textarea.current?.focus();
                      }}
                      onActions={() => setActionsFor(m)}
                      onRetry={() => {
                        setMessages((prev) => prev?.filter((x) => x.id !== m.id) ?? prev);
                        setText(m.body ?? "");
                      }}
                    />
                  )}
                  {i === lastMineIdx && (
                    <div className="flex justify-end pr-1 pt-1">
                      {seenBy.length === 0 ? (
                        <span className="flex items-center gap-1 text-[10px] font-medium text-ink-400">
                          <Check className="h-3 w-3" />
                          {S.sent}
                        </span>
                      ) : chat?.kind === "DIRECT" || seenBy.length === others.length ? (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-[#a8792b]">
                          <CheckCheck className="h-3.5 w-3.5" />
                          {chat?.kind === "DIRECT" ? S.seen : S.seenAll}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1" title={seenBy.map((id) => people.get(id)?.name).join(", ")}>
                          <span className="text-[10px] font-medium text-ink-400">{S.seen}</span>
                          <span className="flex -space-x-1.5">
                            {seenBy.slice(0, 5).map((id) => (
                              <PersonAvatar key={id} id={id} name={people.get(id)?.name ?? "?"} url={people.get(id)?.avatarUrl} size={16} className="ring-2 ring-[#f7f4ef]" />
                            ))}
                          </span>
                          {seenBy.length > 5 && <span className="text-[10px] text-ink-400">+{seenBy.length - 5}</span>}
                        </span>
                      )}
                    </div>
                  )}
                  {i === lastIdx && <div className="h-1" />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!atBottom && (
        <button
          type="button"
          onClick={toBottom}
          className="absolute bottom-24 right-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#1f182d] shadow-lg ring-1 ring-ink-100 transition hover:-translate-y-0.5"
        >
          <ArrowDown className="h-4 w-4" />
        </button>
      )}

      {dragging && (
        <div className="pointer-events-none absolute inset-3 z-30 flex items-center justify-center rounded-3xl border-2 border-dashed border-[#c99a3f] bg-[#fffaf0]/90 text-sm font-bold text-[#8a6a2c]">
          {S.dropHere}
        </div>
      )}

      {/* Composer */}
      <div className="border-t border-ink-100 bg-white px-2.5 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2 sm:px-4">
        {(replyTo || editing) && (
          <div className="mx-1 mb-2 flex items-center gap-2 rounded-2xl bg-[#f4f1fa] px-3 py-2">
            {editing ? <Pencil className="h-4 w-4 shrink-0 text-[#624f89]" /> : <Reply className="h-4 w-4 shrink-0 text-[#624f89]" />}
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold text-[#40325c]">{editing ? S.editing : fill(S.replyingTo, { name: replyName(replyTo!.senderId) })}</span>
              <span className="block truncate text-xs text-ink-500">{editing ? editing.body : snippet({ body: replyTo!.body, mediaKind: replyTo!.media?.kind ?? null, deleted: false })}</span>
            </span>
            <button
              type="button"
              onClick={() => {
                if (editing) setText("");
                setEditing(null);
                setReplyTo(null);
              }}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-ink-500 hover:bg-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
        <div className="relative flex items-end gap-1.5">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowAttach((v) => !v);
                setShowEmoji(false);
              }}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition ${showAttach ? "bg-[#1f182d] text-white" : "text-[#624f89] hover:bg-[#f4f1fa]"}`}
              aria-label={S.attachMedia}
            >
              <Plus className={`h-5 w-5 transition ${showAttach ? "rotate-45" : ""}`} />
            </button>
            {showAttach && (
              <div className="absolute bottom-12 left-0 z-30 w-52 overflow-hidden rounded-2xl bg-white p-1.5 shadow-2xl ring-1 ring-ink-100 animate-slide-up">
                <button type="button" onClick={() => mediaInput.current?.click()} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink-900 hover:bg-mist-50">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#e47e97] to-[#a31f3f] text-white">
                    <ImageIcon className="h-4 w-4" />
                  </span>
                  {S.attachMedia}
                </button>
                <button type="button" onClick={() => fileInput.current?.click()} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink-900 hover:bg-mist-50">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#8b76b9] to-[#40325c] text-white">
                    <FileText className="h-4 w-4" />
                  </span>
                  {S.attachFile}
                </button>
              </div>
            )}
          </div>
          <div className="flex min-w-0 flex-1 items-end rounded-[1.4rem] bg-mist-50 ring-1 ring-transparent transition focus-within:bg-white focus-within:ring-[#e8d3a6]">
            <textarea
              ref={textarea}
              value={text}
              rows={1}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && window.matchMedia("(pointer: fine)").matches) {
                  e.preventDefault();
                  send();
                }
                if (e.key === "Escape") {
                  setReplyTo(null);
                  if (editing) {
                    setEditing(null);
                    setText("");
                  }
                }
              }}
              onPaste={(e) => {
                const files = Array.from(e.clipboardData.files);
                if (files.length) {
                  e.preventDefault();
                  sendFiles(files);
                }
              }}
              placeholder={S.typeMessage}
              className="max-h-[140px] min-w-0 flex-1 resize-none bg-transparent px-4 py-2.5 text-[15px] leading-snug text-ink-900 outline-none placeholder:text-ink-300"
            />
            <button
              type="button"
              onClick={() => {
                setShowEmoji((v) => !v);
                setShowAttach(false);
              }}
              className={`mb-0.5 mr-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${showEmoji ? "text-[#a8792b]" : "text-ink-400 hover:text-[#a8792b]"}`}
              aria-label={S.emoji}
              data-emoji-toggle
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <button
            type="button"
            onClick={send}
            disabled={!text.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#40325c] to-[#1f182d] text-white shadow-md shadow-[#1f182d]/25 transition enabled:hover:scale-105 disabled:opacity-35"
            aria-label={S.send}
          >
            {editing ? <Check className="h-5 w-5" /> : <SendHorizontal className="h-[18px] w-[18px]" />}
          </button>
          {showEmoji && (
            <EmojiPicker
              S={S}
              onPick={(e) => {
                const t = textarea.current;
                if (t) {
                  const start = t.selectionStart ?? text.length;
                  const end = t.selectionEnd ?? text.length;
                  setText(text.slice(0, start) + e + text.slice(end));
                  requestAnimationFrame(() => {
                    t.focus();
                    t.selectionStart = t.selectionEnd = start + e.length;
                  });
                } else setText(text + e);
              }}
              onClose={() => setShowEmoji(false)}
            />
          )}
        </div>
        <input
          ref={mediaInput}
          type="file"
          multiple
          accept={ACCEPT_MEDIA}
          className="hidden"
          onChange={(e) => {
            sendFiles(e.target.files ? Array.from(e.target.files) : null);
            e.target.value = "";
          }}
        />
        <input
          ref={fileInput}
          type="file"
          multiple
          accept={ACCEPT_FILES}
          className="hidden"
          onChange={(e) => {
            sendFiles(e.target.files ? Array.from(e.target.files) : null);
            e.target.value = "";
          }}
        />
      </div>

      {actionsFor && (
        <MessageActions
          m={actionsFor}
          me={me}
          isOwner={isOwner}
          S={S}
          onClose={() => setActionsFor(null)}
          onReact={(e) => react(actionsFor, e)}
          onReply={() => {
            setReplyTo(actionsFor);
            setEditing(null);
            setActionsFor(null);
            textarea.current?.focus();
          }}
          onCopy={() => {
            navigator.clipboard?.writeText(actionsFor.body ?? "").catch(() => {});
            setActionsFor(null);
            toast(S.copied);
          }}
          onEdit={() => {
            setEditing(actionsFor);
            setReplyTo(null);
            setText(actionsFor.body ?? "");
            setActionsFor(null);
            textarea.current?.focus();
          }}
          onUnsend={() => {
            const m = actionsFor;
            setActionsFor(null);
            setConfirm({ text: S.unsendConfirm, label: S.unsend, run: () => unsend(m) });
          }}
        />
      )}

      {showInfo && chat && (
        <ChatInfo
          chat={chat}
          name={name}
          me={me}
          isOwner={isOwner}
          team={team}
          people={people}
          S={S}
          onClose={() => setShowInfo(false)}
          patch={patchChat}
          openDirect={(id) => {
            setShowInfo(false);
            openDirect(id);
          }}
          leave={() =>
            setConfirm({
              text: S.leaveConfirm,
              label: S.leave,
              run: async () => {
                await fetch(`/api/business/team/chats/${chatId}?mode=leave`, { method: "DELETE" }).catch(() => null);
                onGone();
              },
            })
          }
          remove={() =>
            setConfirm({
              text: S.deleteGroupConfirm,
              label: S.deleteGroup,
              run: async () => {
                await fetch(`/api/business/team/chats/${chatId}?mode=delete`, { method: "DELETE" }).catch(() => null);
                onGone();
              },
            })
          }
        />
      )}

      {lightbox && <Lightbox items={lightbox.items} index={lightbox.index} onClose={() => setLightbox(null)} S={S} />}
      {confirm && <ConfirmDialog text={confirm.text} confirmLabel={confirm.label} cancelLabel={S.cancel} onConfirm={confirm.run} onClose={() => setConfirm(null)} />}
    </div>
  );
}

// ── A message ────────────────────────────────────────────────────────────

function Bubble({
  m,
  me,
  groupChat,
  sender,
  first,
  last,
  locale,
  S,
  replyName,
  snippet,
  onOpenMedia,
  onReact,
  onReply,
  onActions,
  onRetry,
}: {
  m: Msg;
  me: string;
  groupChat: boolean;
  sender: Member | undefined;
  first: boolean;
  last: boolean;
  locale: string;
  S: TeamStrings;
  replyName: (id: string) => string;
  snippet: (r: { body: string | null; mediaKind: string | null; deleted: boolean }) => string;
  onOpenMedia: (m: Media) => void;
  onReact: (emoji: string) => void;
  onReply: () => void;
  onActions: () => void;
  onRetry: () => void;
}) {
  const mine = m.senderId === me;
  const press = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [hover, setHover] = useState(false);
  const bigEmoji = !!m.body && !m.media && !m.replyTo && isEmojiOnly(m.body);
  const visual = m.media && (m.media.kind === "IMAGE" || m.media.kind === "VIDEO");
  const time = new Date(m.createdAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
  const corner = mine ? (last ? "rounded-br-md" : "") + (first ? "" : " rounded-tr-md") : (last ? "rounded-bl-md" : "") + (first ? "" : " rounded-tl-md");

  const startPress = () => {
    if (m.deleted || m.pending !== undefined) return;
    press.current = setTimeout(() => {
      navigator.vibrate?.(12);
      onActions();
    }, 450);
  };
  const endPress = () => {
    if (press.current) clearTimeout(press.current);
    press.current = null;
  };

  return (
    <div
      className={`group flex items-end gap-2 ${mine ? "justify-end" : "justify-start"} ${first ? "mt-2.5" : "mt-0.5"}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {!mine && groupChat && (
        <span className="w-8 shrink-0">{last && <PersonAvatar id={m.senderId} name={sender?.name ?? "?"} url={sender?.avatarUrl} size={32} owner={sender?.isOwner} />}</span>
      )}
      <div className={`flex min-w-0 max-w-[80%] flex-col sm:max-w-[68%] ${mine ? "items-end" : "items-start"}`}>
        {!mine && groupChat && first && (
          <span className="mb-1 ml-3 flex items-center gap-1 text-[11px] font-bold text-ink-500">
            {sender?.name ?? S.formerMember}
            {sender?.isOwner && <Crown className="h-3 w-3 text-[#c99a3f]" />}
          </span>
        )}
        <div className={`relative flex items-center gap-1.5 ${mine ? "flex-row-reverse" : ""}`}>
          <div
            onTouchStart={startPress}
            onTouchEnd={endPress}
            onTouchMove={endPress}
            onContextMenu={(e) => {
              if (m.deleted || m.pending !== undefined) return;
              e.preventDefault();
              onActions();
            }}
            className={`relative min-w-0 select-text ${m.pending !== undefined ? "opacity-70" : ""}`}
          >
            {m.deleted ? (
              <div className={`rounded-[20px] ${corner} border border-dashed border-ink-200 px-3.5 py-2 text-[13px] italic text-ink-400`}>{S.deleted}</div>
            ) : bigEmoji ? (
              <div className="px-1 text-[40px] leading-tight">{m.body}</div>
            ) : (
              <div
                className={`overflow-hidden rounded-[20px] ${corner} ${
                  visual && !m.body && !m.replyTo
                    ? ""
                    : mine
                      ? "bg-gradient-to-br from-[#40325c] to-[#1f182d] text-white shadow-[0_6px_18px_-10px_rgba(31,24,45,0.8)]"
                      : "bg-white text-ink-900 shadow-[0_4px_14px_-10px_rgba(31,24,45,0.35)] ring-1 ring-ink-100/80"
                }`}
              >
                {m.replyTo && (
                  <div className={`mx-1.5 mt-1.5 rounded-2xl border-l-[3px] px-3 py-1.5 ${mine ? "border-[#e8d3a6] bg-white/10" : "border-[#c99a3f] bg-[#fbf6ea]"}`}>
                    <p className={`text-[11px] font-bold ${mine ? "text-[#e8d3a6]" : "text-[#8a6a2c]"}`}>{replyName(m.replyTo.senderId)}</p>
                    <p className={`line-clamp-2 text-xs ${mine ? "text-white/75" : "text-ink-500"}`}>{snippet(m.replyTo)}</p>
                  </div>
                )}
                {m.media &&
                  (m.pending !== undefined && !m.media.id ? (
                    <div className={`flex w-60 items-center gap-3 p-3 ${mine ? "" : ""}`}>
                      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15">
                        <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90">
                          <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
                          <circle
                            cx="18"
                            cy="18"
                            r="16"
                            fill="none"
                            stroke="#e8d3a6"
                            strokeWidth="3"
                            strokeDasharray={`${(typeof m.pending === "number" ? m.pending : 100) * 1.005} 100.5`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <Paperclip className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-xs font-semibold">{m.media.name}</span>
                        <span className="block text-[11px] opacity-70">{fill(S.uploading, { p: typeof m.pending === "number" ? m.pending : 100 })}</span>
                      </span>
                    </div>
                  ) : visual ? (
                    <div className={m.body || m.replyTo ? "p-1.5 pb-0" : ""}>
                      <div className="w-[260px] max-w-full sm:w-[300px]">
                        <MediaThumb media={m.media} onOpen={() => onOpenMedia(m.media!)} className={m.body || m.replyTo ? "!rounded-2xl" : ""} />
                      </div>
                    </div>
                  ) : (
                    <div className="w-[260px] max-w-full p-1.5">
                      <FileCard media={m.media} dark={mine} S={S} />
                    </div>
                  ))}
                {m.body && (
                  <p className="px-3.5 py-2 text-[15px] leading-snug">
                    <RichText text={m.body} />
                    {m.edited && <span className={`ml-1.5 text-[10px] ${mine ? "text-white/50" : "text-ink-300"}`}>({S.edited})</span>}
                  </p>
                )}
              </div>
            )}
            {m.reactions.length > 0 && (
              <div className={`-mt-1.5 flex flex-wrap gap-1 ${mine ? "justify-end pr-2" : "pl-2"}`}>
                {m.reactions.map((r) => (
                  <button
                    key={r.emoji}
                    type="button"
                    onClick={() => onReact(r.emoji)}
                    className={`relative z-[1] flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs shadow-sm ring-1 transition hover:scale-105 ${
                      r.userIds.includes(me) ? "bg-[#fbf1dc] ring-[#e8d3a6]" : "bg-white ring-ink-100"
                    }`}
                  >
                    <span>{r.emoji}</span>
                    {r.userIds.length > 1 && <span className="text-[10px] font-bold text-ink-500">{r.userIds.length}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          {/* Desktop: quick actions on hover. */}
          {!m.deleted && m.pending === undefined && !m.failed && (
            <div className={`hidden shrink-0 items-center gap-0.5 transition [@media(pointer:fine)]:flex ${hover ? "opacity-100" : "opacity-0"}`}>
              <button type="button" onClick={onActions} className="flex h-7 w-7 items-center justify-center rounded-full text-ink-400 hover:bg-white hover:text-[#a8792b]" aria-label={S.react}>
                <Smile className="h-4 w-4" />
              </button>
              <button type="button" onClick={onReply} className="flex h-7 w-7 items-center justify-center rounded-full text-ink-400 hover:bg-white hover:text-[#624f89]" aria-label={S.reply}>
                <Reply className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
        {(last || m.failed) && (
          <span className={`mt-1 flex items-center gap-1 px-2 text-[10px] ${m.failed ? "font-semibold text-berry-500" : "text-ink-300"}`} suppressHydrationWarning>
            {m.failed ? (
              <button type="button" onClick={onRetry} className="underline">
                {S.uploadFailed}
              </button>
            ) : m.pending !== undefined ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              time
            )}
          </span>
        )}
      </div>
    </div>
  );
}

function MessageActions({
  m,
  me,
  isOwner,
  S,
  onClose,
  onReact,
  onReply,
  onCopy,
  onEdit,
  onUnsend,
}: {
  m: Msg;
  me: string;
  isOwner: boolean;
  S: TeamStrings;
  onClose: () => void;
  onReact: (emoji: string) => void;
  onReply: () => void;
  onCopy: () => void;
  onEdit: () => void;
  onUnsend: () => void;
}) {
  const mine = m.senderId === me;
  const items = [
    { icon: Reply, label: S.reply, run: onReply },
    ...(m.body ? [{ icon: Copy, label: S.copy, run: onCopy }] : []),
    ...(mine && m.body ? [{ icon: Pencil, label: S.edit, run: onEdit }] : []),
    ...(mine || isOwner ? [{ icon: Trash2, label: S.unsend, run: onUnsend, danger: true }] : []),
  ];
  return (
    <div className="fixed inset-0 z-[115] flex items-end justify-center bg-[#120d1b]/40 p-3 backdrop-blur-[2px] sm:items-center" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm space-y-2 animate-slide-up">
        <div className="flex items-center justify-between rounded-full bg-white px-3 py-2 shadow-2xl">
          {QUICK.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => onReact(e)}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-2xl transition hover:scale-125 ${
                m.reactions.find((r) => r.emoji === e)?.userIds.includes(me) ? "bg-[#fbf1dc]" : ""
              }`}
            >
              {e}
            </button>
          ))}
        </div>
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
          {m.body && <p className="line-clamp-3 border-b border-ink-100 px-5 py-3 text-xs text-ink-500">{m.body}</p>}
          {items.map((it) => (
            <button
              key={it.label}
              type="button"
              onClick={it.run}
              className={`flex w-full items-center gap-3 px-5 py-3.5 text-left text-sm font-semibold hover:bg-mist-50 ${"danger" in it ? "text-berry-600" : "text-ink-900"}`}
            >
              <it.icon className="h-[18px] w-[18px]" />
              {it.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmojiPicker({ S, onPick, onClose }: { S: TeamStrings; onPick: (e: string) => void; onClose: () => void }) {
  const [tab, setTab] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      // The toggle button closes it itself.
      if (ref.current && !ref.current.contains(e.target as Node) && !(e.target as HTMLElement).closest("[data-emoji-toggle]")) onClose();
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [onClose]);
  return (
    <div ref={ref} className="absolute bottom-14 right-0 z-30 w-[min(340px,calc(100vw-1.5rem))] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-ink-100 animate-slide-up">
      <div className="flex gap-1 overflow-x-auto border-b border-ink-100 bg-[#fbfaf8] p-1.5">
        {EMOJI.map((c, i) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setTab(i)}
            className={`shrink-0 rounded-full px-3 py-1.5 text-[11px] font-bold transition ${tab === i ? "bg-[#1f182d] text-white" : "text-ink-500 hover:bg-white"}`}
          >
            {c.list[0]} {S[c.key]}
          </button>
        ))}
      </div>
      <div className="grid max-h-56 grid-cols-8 gap-0.5 overflow-y-auto p-2">
        {EMOJI[tab].list.map((e) => (
          <button key={e} type="button" onClick={() => onPick(e)} className="flex h-9 w-full items-center justify-center rounded-xl text-[22px] transition hover:scale-110 hover:bg-mist-50">
            {e}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── New chat & chat info ─────────────────────────────────────────────────

function MemberPicker({
  members,
  selected,
  toggle,
  S,
}: {
  members: Member[];
  selected: Set<string>;
  toggle: (id: string) => void;
  S: TeamStrings;
}) {
  const [q, setQ] = useState("");
  const shown = members.filter((m) => !q.trim() || m.name.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 ring-1 ring-ink-100 focus-within:ring-[#c99a3f]">
        <Search className="h-4 w-4 text-ink-400" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.searchChats} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
      </label>
      <ul className="space-y-1">
        {shown.map((m) => {
          const on = selected.has(m.userId);
          return (
            <li key={m.userId}>
              <button type="button" onClick={() => toggle(m.userId)} className={`flex w-full items-center gap-3 rounded-2xl p-2 text-left transition ${on ? "bg-[#f4f1fa]" : "hover:bg-white"}`}>
                <PersonAvatar id={m.userId} name={m.name} url={m.avatarUrl} size={38} owner={m.isOwner} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink-900">{m.name}</span>
                  <span className="block truncate text-[11px] text-ink-400">{m.isOwner ? S.owner : (m.title ?? "")}</span>
                </span>
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition ${on ? "bg-[#1f182d] text-white" : "ring-1 ring-ink-200"}`}>
                  {on && <Check className="h-3.5 w-3.5" />}
                </span>
              </button>
            </li>
          );
        })}
        {shown.length === 0 && <li className="py-6 text-center text-xs text-ink-400">{S.noResults}</li>}
      </ul>
    </div>
  );
}

function NewChatSheet({
  S,
  me,
  members,
  onClose,
  onDirect,
  onGroup,
}: {
  S: TeamStrings;
  me: string;
  members: Member[];
  onClose: () => void;
  onDirect: (userId: string) => void;
  onGroup: (name: string, color: string, ids: string[]) => Promise<boolean>;
}) {
  const [tab, setTab] = useState<"direct" | "group">("direct");
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLOR_KEYS[0]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const others = members.filter((m) => m.userId !== me);

  return (
    <Sheet title={S.newChat} onClose={onClose}>
      <div className="p-4">
        <div className="mb-4 grid grid-cols-2 gap-1 rounded-full bg-mist-50 p-1">
          {(
            [
              ["direct", S.direct, MessageCircle],
              ["group", S.newGroup, Users],
            ] as const
          ).map(([k, label, Icon]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-bold transition ${tab === k ? "bg-[#1f182d] text-white shadow" : "text-ink-700"}`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>

        {tab === "direct" ? (
          <ul className="space-y-1">
            {others.map((m) => (
              <li key={m.userId}>
                <button type="button" onClick={() => onDirect(m.userId)} className="flex w-full items-center gap-3 rounded-2xl p-2 text-left transition hover:bg-white">
                  <PersonAvatar id={m.userId} name={m.name} url={m.avatarUrl} size={42} owner={m.isOwner} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink-900">{m.name}</span>
                    <span className="block truncate text-[11px] text-ink-400">{m.isOwner ? S.owner : (m.title ?? "")}</span>
                  </span>
                  <MessageCircle className="h-4 w-4 text-[#c99a3f]" />
                </button>
              </li>
            ))}
            {others.length === 0 && <li className="py-8 text-center text-xs text-ink-400">{S.noResults}</li>}
          </ul>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <GroupAvatar name={name || "?"} color={color} size={56} />
              <label className="min-w-0 flex-1">
                <span className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.groupName}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={80}
                  placeholder={S.groupNamePh}
                  className="h-11 w-full rounded-xl border border-ink-100 bg-white px-3 text-sm font-semibold outline-none focus:border-[#c99a3f]"
                />
              </label>
            </div>
            <div>
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.pickColor}</span>
              <div className="flex gap-2">
                {COLOR_KEYS.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setColor(k)}
                    className={`h-8 w-8 rounded-full bg-gradient-to-br ${GROUP_COLORS[k]} transition ${color === k ? "ring-2 ring-[#1f182d] ring-offset-2" : "hover:scale-110"}`}
                  />
                ))}
              </div>
            </div>
            <div>
              <span className="mb-1.5 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-ink-400">
                {S.pickMembers}
                <span className="normal-case tracking-normal text-[#a8792b]">{fill(S.selectedN, { n: selected.size })}</span>
              </span>
              <MemberPicker
                members={others}
                selected={selected}
                S={S}
                toggle={(id) =>
                  setSelected((s) => {
                    const n = new Set(s);
                    if (n.has(id)) n.delete(id);
                    else n.add(id);
                    return n;
                  })
                }
              />
            </div>
            <button
              type="button"
              disabled={!name.trim() || selected.size === 0 || busy}
              onClick={async () => {
                setBusy(true);
                await onGroup(name.trim(), color, [...selected]);
                setBusy(false);
              }}
              className="sticky bottom-0 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#40325c] to-[#1f182d] py-3 text-sm font-bold text-white shadow-lg disabled:opacity-40"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Users className="h-4 w-4" />}
              {S.createGroup}
            </button>
          </div>
        )}
      </div>
    </Sheet>
  );
}

function ChatInfo({
  chat,
  name,
  me,
  isOwner,
  team,
  people,
  S,
  onClose,
  patch,
  openDirect,
  leave,
  remove,
}: {
  chat: ChatDetail;
  name: string;
  me: string;
  isOwner: boolean;
  team: Member[];
  people: Map<string, Member>;
  S: TeamStrings;
  onClose: () => void;
  patch: (body: object) => Promise<boolean>;
  openDirect: (userId: string) => void;
  leave: () => void;
  remove: () => void;
}) {
  const manage = chat.kind === "GROUP" && (isOwner || chat.adminIds.includes(me));
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState(chat.name ?? "");
  const [adding, setAdding] = useState(false);
  const [toAdd, setToAdd] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const addable = team.filter((m) => !chat.memberIds.includes(m.userId));
  const memberList = chat.memberIds
    .map((id) => people.get(id) ?? { userId: id, name: S.formerMember, avatarUrl: null, title: null, isOwner: false, left: true })
    .sort((a, b) => Number(b.isOwner) - Number(a.isOwner) || Number(chat.adminIds.includes(b.userId)) - Number(chat.adminIds.includes(a.userId)) || a.name.localeCompare(b.name));

  return (
    <Sheet title={S.chatInfo} onClose={onClose}>
      <div className="relative overflow-hidden bg-gradient-to-br from-[#2f2544] to-[#120d1b] px-5 pb-6 pt-7 text-center text-white">
        <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-[#c99a3f]/25 blur-3xl" />
        <div className="relative flex flex-col items-center">
          {chat.kind === "DIRECT" ? (
            (() => {
              const o = people.get(chat.memberIds.find((id) => id !== me) ?? "");
              return <PersonAvatar id={o?.userId ?? chat.id} name={name} url={o?.avatarUrl} size={76} owner={o?.isOwner} />;
            })()
          ) : (
            <GroupAvatar name={name} color={chat.color} all={chat.kind === "ALL"} size={76} />
          )}
          {renaming ? (
            <div className="mt-3 flex w-full max-w-xs gap-2">
              <input value={newName} onChange={(e) => setNewName(e.target.value)} maxLength={80} className="h-10 min-w-0 flex-1 rounded-xl bg-white/10 px-3 text-sm font-semibold text-white outline-none ring-1 ring-white/20 focus:ring-[#e8d3a6]" />
              <button
                type="button"
                disabled={!newName.trim()}
                onClick={async () => {
                  await patch({ name: newName.trim() });
                  setRenaming(false);
                }}
                className="rounded-xl bg-[#e8d3a6] px-3 text-xs font-bold text-[#1f182d]"
              >
                {S.save}
              </button>
            </div>
          ) : (
            <p className="mt-3 flex items-center gap-2 font-serif text-2xl">
              {name}
              {manage && (
                <button type="button" onClick={() => setRenaming(true)} className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20" aria-label={S.rename}>
                  <Pencil className="h-3.5 w-3.5" />
                </button>
              )}
            </p>
          )}
          <p className="mt-1 text-xs text-white/60">{chat.kind === "ALL" ? S.allChatSub : fill(S.membersN, { n: chat.memberIds.length })}</p>
          {manage && (
            <div className="mt-4 flex gap-2">
              {COLOR_KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => patch({ color: k })}
                  className={`h-6 w-6 rounded-full bg-gradient-to-br ${GROUP_COLORS[k]} transition ${chat.color === k || (!chat.color && k === "plum") ? "ring-2 ring-[#e8d3a6] ring-offset-2 ring-offset-[#1f182d]" : "hover:scale-110"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 p-4">
        <button
          type="button"
          onClick={() => patch({ muted: !chat.muted })}
          className="flex w-full items-center gap-3 rounded-2xl bg-white p-3 text-left ring-1 ring-ink-100 hover:bg-mist-50"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4f1fa] text-[#624f89]">
            <BellOff className="h-4 w-4" />
          </span>
          <span className="flex-1 text-sm font-semibold text-ink-900">{chat.muted ? S.unmute : S.mute}</span>
          <span className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition ${chat.muted ? "bg-[#1f182d]" : "bg-ink-100"}`}>
            <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${chat.muted ? "left-[22px]" : "left-0.5"}`} />
          </span>
        </button>

        {chat.kind !== "DIRECT" && (
          <div>
            <div className="mb-2 flex items-center justify-between px-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink-400">{fill(S.membersN, { n: chat.memberIds.length })}</p>
              {manage && addable.length > 0 && (
                <button type="button" onClick={() => setAdding((v) => !v)} className="inline-flex items-center gap-1 rounded-full bg-[#fbf1dc] px-3 py-1 text-[11px] font-bold text-[#8a6a2c]">
                  <UserPlus className="h-3.5 w-3.5" />
                  {S.addMembers}
                </button>
              )}
            </div>
            {adding && (
              <div className="mb-3 rounded-2xl bg-[#fbfaf8] p-3 ring-1 ring-[#e8d3a6]">
                <MemberPicker
                  members={addable}
                  selected={toAdd}
                  S={S}
                  toggle={(id) =>
                    setToAdd((s) => {
                      const n = new Set(s);
                      if (n.has(id)) n.delete(id);
                      else n.add(id);
                      return n;
                    })
                  }
                />
                <button
                  type="button"
                  disabled={toAdd.size === 0 || busy}
                  onClick={async () => {
                    setBusy(true);
                    await patch({ addIds: [...toAdd] });
                    setBusy(false);
                    setToAdd(new Set());
                    setAdding(false);
                  }}
                  className="mt-3 w-full rounded-full bg-[#1f182d] py-2.5 text-xs font-bold text-white disabled:opacity-40"
                >
                  {S.addMembers} ({toAdd.size})
                </button>
              </div>
            )}
            <ul className="space-y-1">
              {memberList.map((m) => {
                const admin = chat.adminIds.includes(m.userId);
                return (
                  <li key={m.userId} className="flex items-center gap-3 rounded-2xl p-2 hover:bg-white">
                    <PersonAvatar id={m.userId} name={m.name} url={m.avatarUrl} size={38} owner={m.isOwner} />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5 truncate text-sm font-semibold text-ink-900">
                        {m.userId === me ? `${m.name} (${S.you})` : m.name}
                      </span>
                      <span className="flex items-center gap-1.5 text-[11px] text-ink-400">
                        {m.isOwner && (
                          <span className="inline-flex items-center gap-0.5 font-bold text-[#a8792b]">
                            <Crown className="h-3 w-3" />
                            {S.owner}
                          </span>
                        )}
                        {chat.kind === "GROUP" && admin && !m.isOwner && (
                          <span className="inline-flex items-center gap-0.5 font-bold text-[#624f89]">
                            <Shield className="h-3 w-3" />
                            {S.admin}
                          </span>
                        )}
                        {!m.isOwner && !admin && (m.title ?? "")}
                      </span>
                    </span>
                    {m.userId !== me && !m.left && (
                      <button type="button" onClick={() => openDirect(m.userId)} className="flex h-8 w-8 items-center justify-center rounded-full text-[#a8792b] hover:bg-[#fbf1dc]" aria-label={S.messageThem}>
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    )}
                    {manage && m.userId !== me && (
                      <>
                        <button
                          type="button"
                          onClick={() => patch({ admin: { userId: m.userId, on: !admin } })}
                          className={`flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f4f1fa] ${admin ? "text-[#624f89]" : "text-ink-300"}`}
                          aria-label={admin ? S.unmakeAdmin : S.makeAdmin}
                          title={admin ? S.unmakeAdmin : S.makeAdmin}
                        >
                          <Shield className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => patch({ removeIds: [m.userId] })}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-ink-300 hover:bg-berry-50 hover:text-berry-600"
                          aria-label={S.removeMember}
                          title={S.removeMember}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {chat.kind === "GROUP" && (
          <div className="space-y-2 border-t border-ink-100 pt-4">
            <button type="button" onClick={leave} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold text-ink-700 hover:bg-mist-50">
              <LogOut className="h-4 w-4" />
              {S.leave}
            </button>
            {manage && (
              <button type="button" onClick={remove} className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-semibold text-berry-600 hover:bg-berry-50">
                <Trash2 className="h-4 w-4" />
                {S.deleteGroup}
              </button>
            )}
          </div>
        )}
      </div>
    </Sheet>
  );
}
