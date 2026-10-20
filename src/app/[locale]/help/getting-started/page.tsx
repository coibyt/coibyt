import type { Metadata } from "next";
import { ArrowRight, BookOpen, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { GROUPS, GUIDES, tr, type Block, type T } from "@/lib/help/guides";
import { HelpCenter, type HelpGuide } from "@/components/help/help-center";
import type { MockBlock } from "@/components/help/screen-mock";
import { OpenSupportButton, SupportLauncher } from "@/components/support-launcher";
import { supportCenterStrings } from "@/lib/support-ai/strings";
import { supportWidgetStrings } from "@/lib/support-ai/widget-strings";
import { businessLandingStrings } from "@/lib/business-landing/strings";

type Params = Promise<{ locale: string }>;

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
const pageUrl = (locale: string) => `${SITE}${locale === routing.defaultLocale ? "" : `/${locale}`}/help/getting-started`;

const COPY = {
  vi: {
    metaTitle: "Trung tâm hướng dẫn cho chủ salon — VaraaAi",
    metaDescription: "Hướng dẫn từng bước, có hình minh họa, cho mọi chức năng của VaraaAi: dịch vụ, nhân viên, lịch hẹn, thẻ tích điểm, thẻ quà tặng, website, trợ lý AI…",
    eyebrow: "Trung tâm hướng dẫn",
    title: "Làm chủ VaraaAi trong vài phút",
    subtitle: "Hướng dẫn từng bước, có hình minh họa chỉ đúng nút cần bấm — từ thiết lập salon đến giữ chân khách. Không cần tự mày mò.",
    dashboard: "Vào trang quản trị",
    chat: "Hỏi trợ lý AI",
    stats: ["23 hướng dẫn", "Hình minh họa từng bước", "Hỗ trợ 24/7"],
    labels: {
      search: "Tìm hướng dẫn: thẻ tích điểm, giờ mở cửa, nhúng website…",
      noResults: "Chưa có hướng dẫn khớp. Hãy hỏi trợ lý AI — trả lời ngay kèm đường dẫn.",
      quickStart: "Bắt đầu nhanh trong 6 bước",
      quickStartBody: "Làm theo thứ tự này là salon sẵn sàng nhận khách.",
      open: "Mở trang này",
      tips: "Mẹo hay",
      contents: "Mục lục",
      stepsLabel: "Các bước",
      askAi: "Hỏi trợ lý AI",
    },
    helpTitle: "Vẫn chưa tìm thấy điều bạn cần?",
    helpBody: "Trợ lý AI trả lời ngay mọi câu hỏi về cách dùng VaraaAi, kèm đường dẫn đến đúng chỗ. Cần người thật? Đội ngũ VaraaAi luôn sẵn sàng.",
  },
  en: {
    metaTitle: "Help centre for salon owners — VaraaAi",
    metaDescription: "Step-by-step, illustrated guides to every VaraaAi feature: services, staff, bookings, loyalty cards, gift cards, your website, the AI assistant…",
    eyebrow: "Help centre",
    title: "Master VaraaAi in minutes",
    subtitle: "Step-by-step guides with pictures that point to the exact button — from setting up your salon to keeping customers. No guesswork.",
    dashboard: "Go to dashboard",
    chat: "Ask the AI assistant",
    stats: ["23 guides", "Illustrated steps", "24/7 support"],
    labels: {
      search: "Search guides: loyalty cards, opening hours, embedding…",
      noResults: "No guide matches yet. Ask the AI assistant — it answers instantly with a link.",
      quickStart: "Get started in 6 steps",
      quickStartBody: "Follow this order and your salon is ready for customers.",
      open: "Open this page",
      tips: "Tips",
      contents: "Contents",
      stepsLabel: "Steps",
      askAi: "Ask the AI assistant",
    },
    helpTitle: "Still can't find what you need?",
    helpBody: "The AI assistant instantly answers anything about using VaraaAi, with a link to the right place. Need a person? The VaraaAi team is always there.",
  },
};

const copy = (locale: string) => (locale === "vi" ? COPY.vi : COPY.en);

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale } = await params;
  const c = copy(locale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: pageUrl(locale) },
    openGraph: { title: c.metaTitle, description: c.metaDescription, url: pageUrl(locale), siteName: "VaraaAi", type: "website" },
  };
}

function resolveBlock(b: Block, locale: string): MockBlock {
  const s = (x: T) => tr(x, locale);
  switch (b.k) {
    case "button":
      return { ...b, label: s(b.label) };
    case "field":
      return { ...b, label: s(b.label), value: s(b.value) };
    case "row":
      return { ...b, items: b.items.map((it) => ({ label: s(it.label), value: s(it.value) })) };
    case "chips":
      return { ...b, label: s(b.label), items: b.items.map(s) };
    case "toggle":
      return { ...b, label: s(b.label) };
    case "list":
      return { ...b, rows: b.rows.map((r) => ({ title: s(r.title), sub: r.sub && s(r.sub), right: r.right && s(r.right) })) };
    case "note":
      return { ...b, text: s(b.text) };
    case "calendar":
      return b;
    case "qr":
      return { ...b, label: s(b.label) };
    case "tabs":
      return { ...b, items: b.items.map(s) };
    case "link":
      return { ...b, label: s(b.label) };
  }
}

/** The salon-owner help centre: every feature as an illustrated,
 * step-by-step guide, searchable, with the AI support chat one tap away. */
export default async function GettingStartedPage({ params }: { params: Params }) {
  const { locale } = await params;
  const c = copy(locale);
  const guides: HelpGuide[] = GUIDES.map((g) => ({
    id: g.id,
    group: g.group,
    icon: g.icon,
    title: tr(g.title, locale),
    why: tr(g.why, locale),
    href: g.href,
    steps: g.steps.map((s) => tr(s, locale)),
    tips: (g.tips ?? []).map((s) => tr(s, locale)),
    screen: { page: tr(g.screen.page, locale), blocks: g.screen.blocks.map((b) => resolveBlock(b, locale)) },
  }));
  const groups = GROUPS.map((g) => ({ id: g.id, title: tr(g.title, locale), body: tr(g.body, locale) }));
  const chat = businessLandingStrings(locale).chat;
  const widget = supportWidgetStrings(locale);

  return (
    <div className="overflow-x-clip bg-mist-50/50">
      <section className="relative isolate overflow-hidden bg-[#1a1326] text-white">
        <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-coral-500/25 blur-3xl" />
        <div className="container flex flex-col items-center pb-20 pt-14 text-center sm:pb-24 sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-peach-200 ring-1 ring-white/15">
            <BookOpen className="h-3.5 w-3.5" />
            {c.eyebrow}
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl">{c.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">{c.subtitle}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/business/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 px-7 py-3.5 font-bold text-white shadow-[0_12px_32px_-8px_rgba(236,106,71,0.8)] transition-transform hover:scale-[1.02]"
            >
              {c.dashboard}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <OpenSupportButton className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 px-6 py-3.5 font-semibold text-white ring-1 ring-white/25 transition-colors hover:bg-white/15">
              <Sparkles className="h-5 w-5" />
              {c.chat}
            </OpenSupportButton>
          </div>
          <ul className="mt-7 flex flex-wrap justify-center gap-2">
            {c.stats.map((s) => (
              <li key={s} className="rounded-full bg-white/[0.08] px-3.5 py-1.5 text-xs font-semibold text-white/85 ring-1 ring-white/10">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HelpCenter guides={guides} groups={groups} labels={c.labels} />

      <section className="container pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-800 via-primary-700 to-primary-500 p-8 text-center text-white sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-peach-200/20 blur-3xl" />
          <MessageCircle className="relative mx-auto h-10 w-10 text-peach-200" />
          <h2 className="relative mt-4 text-2xl font-extrabold sm:text-3xl">{c.helpTitle}</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/80">{c.helpBody}</p>
          <OpenSupportButton className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-primary-700 shadow-lg transition-transform hover:scale-[1.02]">
            <Sparkles className="h-5 w-5" />
            {c.chat}
          </OpenSupportButton>
        </div>
      </section>

      <SupportLauncher
        locale={locale}
        center={supportCenterStrings(locale)}
        suggestions={widget.topics.slice(0, 4)}
        labels={{
          launcher: widget.askTitle,
          teaser: widget.howHelp,
          headerTitle: chat.headerTitle,
          aiOnline: chat.aiOnline,
          teamReplies: chat.teamReplies,
        }}
      />
    </div>
  );
}
