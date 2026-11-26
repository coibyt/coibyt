import Image from "next/image";
import type { ReactNode } from "react";
import { AlertTriangle, BookOpen, Clock, Info, Lightbulb, PlayCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { findLesson } from "@/lib/academy";
import { fmtDuration } from "@/lib/academy/progress";
import { pick } from "@/lib/academy/types";
import { articleForLesson, readMinutes, wikiCategory, wikiPath } from "@/lib/wiki";
import type { WikiStrings } from "@/lib/wiki/strings";
import type { WikiArticle, WikiBlock, WikiImage } from "@/lib/wiki/types";

/** The serif of the Academy's video title cards, loaded by the wiki layout. */
export const SERIF = "font-serif tracking-[-0.01em]";

export const GOLD = "bg-gradient-to-r from-[#f0d9a0] via-[#e8d3a6] to-[#c9a25a]";

/** Where a `lesson:<slug>` link leads: the wiki article written from that lesson when it exists in the language, else the lesson itself. */
const lessonHref = (slug: string, lang: string) => {
  const a = articleForLesson(slug, lang);
  return a ? wikiPath(a) : `/academy/${slug}`;
};

const LINK = "font-semibold text-primary-600 underline decoration-[#c9a25a] decoration-2 underline-offset-[3px] hover:text-primary-800";

/** Inline marks of article text: **bold** and [label](href). An href is a site path ("/business"), a full URL,
 * or `lesson:<academy-lesson-slug>`. Everything else is plain text. */
export function rich(text: string, lang = "vi"): ReactNode {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      out.push(
        <strong key={m.index} className="font-bold text-ink-900">
          {m[1]}
        </strong>
      );
    } else if (m[3].startsWith("/") || m[3].startsWith("lesson:")) {
      out.push(
        <Link key={m.index} href={m[3].startsWith("lesson:") ? lessonHref(m[3].slice(7), lang) : m[3]} className={LINK}>
          {m[2]}
        </Link>
      );
    } else {
      out.push(
        <a key={m.index} href={m[3]} target="_blank" rel="noopener noreferrer" className={LINK}>
          {m[2]}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** The same text without the marks, for meta tags and structured data. */
export const plain = (text: string) => text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1");

export function Figure({ image, priority, sizes = "(min-width: 1024px) 720px, 100vw" }: { image: WikiImage; priority?: boolean; sizes?: string }) {
  return (
    <figure className="my-7">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.w ?? 1200}
        height={image.h ?? 675}
        sizes={sizes}
        priority={priority}
        className="h-auto w-full rounded-2xl bg-primary-50 shadow-card ring-1 ring-ink-100"
      />
      {image.caption && <figcaption className="mt-2.5 px-1 text-center text-[13px] leading-relaxed text-ink-400">{image.caption}</figcaption>}
    </figure>
  );
}

const NOTE = {
  tip: { Icon: Lightbulb, box: "bg-[#fbf6ea] ring-[#e8d3a6]", icon: "text-[#b08a3e]" },
  warn: { Icon: AlertTriangle, box: "bg-berry-50 ring-berry-100", icon: "text-berry-500" },
  info: { Icon: Info, box: "bg-primary-50 ring-primary-100", icon: "text-primary-500" },
};

export function Block({ block, lang = "vi" }: { block: WikiBlock; lang?: string }) {
  if ("p" in block) return <p className="my-5">{rich(block.p, lang)}</p>;
  if ("h3" in block) return <h3 className="mb-3 mt-9 text-lg font-extrabold leading-snug text-ink-900 sm:text-xl">{block.h3}</h3>;
  if ("ul" in block)
    return (
      <ul className="my-5 space-y-2.5">
        {block.ul.map((item, i) => (
          <li key={i} className="relative pl-6">
            <span className="absolute left-1 top-[0.72em] h-1.5 w-1.5 rounded-full bg-[#b08a3e]" aria-hidden />
            {rich(item, lang)}
          </li>
        ))}
      </ul>
    );
  if ("ol" in block)
    return (
      <ol className="my-5 space-y-3">
        {block.ol.map((item, i) => (
          <li key={i} className="relative pl-10">
            <span className="absolute left-0 top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-primary-50 text-[13px] font-extrabold tabular-nums text-primary-600 ring-1 ring-primary-100" aria-hidden>
              {i + 1}
            </span>
            {rich(item, lang)}
          </li>
        ))}
      </ol>
    );
  if ("img" in block) return <Figure image={block.img} />;
  if ("note" in block) {
    const n = NOTE[block.kind ?? "tip"];
    return (
      <aside className={`my-7 flex gap-3.5 rounded-2xl p-4 ring-1 sm:p-5 ${n.box}`}>
        <n.Icon className={`mt-0.5 h-5 w-5 shrink-0 ${n.icon}`} aria-hidden />
        <div className="min-w-0 text-[15px] leading-relaxed sm:text-base">
          {block.title && <p className="mb-1 font-extrabold text-ink-900">{block.title}</p>}
          <p>{rich(block.note, lang)}</p>
        </div>
      </aside>
    );
  }
  // On phones each row becomes a small card: the first cell is its heading and the other cells carry their column name.
  const head = block.table.head;
  return (
    <div className="my-7 overflow-hidden rounded-2xl ring-1 ring-ink-100">
      <table className="w-full border-collapse text-left text-[15px] max-sm:block">
        <thead className="max-sm:hidden">
          <tr className="bg-primary-900 text-white">
            {head.map((h, i) => (
              <th key={i} scope="col" className="px-4 py-3 font-bold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="max-sm:block max-sm:divide-y max-sm:divide-ink-100">
          {block.table.rows.map((row, r) => (
            <tr key={r} className={`max-sm:block max-sm:px-4 max-sm:py-3.5 ${r % 2 ? "bg-mist-50/70" : "bg-white"}`}>
              {row.map((cell, c) =>
                c === 0 ? (
                  <th key={c} scope="row" className="px-4 py-3 align-top font-extrabold text-ink-900 max-sm:block max-sm:p-0 max-sm:text-base">
                    {rich(cell, lang)}
                  </th>
                ) : (
                  <td
                    key={c}
                    data-label={head[c] ?? ""}
                    className="px-4 py-3 align-top max-sm:block max-sm:p-0 max-sm:pt-2 max-sm:before:block max-sm:before:text-xs max-sm:before:font-bold max-sm:before:text-[#8a6a2a] max-sm:before:content-[attr(data-label)]"
                  >
                    {rich(cell, lang)}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** What a card shows about an article, beyond its own fields. */
export function cardMeta(a: WikiArticle) {
  const lesson = findLesson(a.lesson);
  return {
    category: pick(wikiCategory(a.category).name, a.locale),
    style: lesson?.style ?? null,
    minutes: readMinutes(a),
    video: lesson?.video ? fmtDuration(lesson.video.seconds) : null,
  };
}

export function StyleChip({ style, s }: { style: "theory" | "practice" | null; s: WikiStrings }) {
  if (!style) return null;
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${style === "theory" ? "bg-primary-50 text-primary-600 ring-1 ring-primary-100" : "bg-[#fbf6ea] text-[#8a6a2a] ring-1 ring-[#e8d3a6]"}`}>
      {style === "theory" ? s.theory : s.practice}
    </span>
  );
}

export function MetaLine({ a, s, className = "" }: { a: WikiArticle; s: WikiStrings; className?: string }) {
  const m = cardMeta(a);
  return (
    <span className={`flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs font-semibold text-ink-400 ${className}`}>
      <span className="inline-flex items-center gap-1">
        <BookOpen className="h-3.5 w-3.5" aria-hidden />
        {s.minutes(m.minutes)}
      </span>
      {m.video && (
        <span className="inline-flex items-center gap-1">
          <PlayCircle className="h-3.5 w-3.5" aria-hidden />
          {s.videoMinutes(m.video)}
        </span>
      )}
    </span>
  );
}

/** The standard article card: picture, chapter, title, summary. */
export function ArticleCard({ a, s, sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" }: { a: WikiArticle; s: WikiStrings; sizes?: string }) {
  const m = cardMeta(a);
  return (
    <Link href={wikiPath(a)} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink-100 transition hover:-translate-y-0.5 hover:shadow-popover">
      <span className="relative block aspect-[16/9] overflow-hidden bg-primary-50">
        <Image src={a.hero.src} alt={a.hero.alt} fill sizes={sizes} className="object-cover transition duration-500 group-hover:scale-[1.04]" />
      </span>
      <span className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#8a6a2a]">{m.category}</span>
          <StyleChip style={m.style} s={s} />
        </span>
        <span className="mt-2 line-clamp-3 text-[17px] font-extrabold leading-snug text-ink-900 group-hover:text-primary-600">{a.title}</span>
        <span className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-400">{a.excerpt}</span>
        <MetaLine a={a} s={s} className="mt-auto pt-4" />
      </span>
    </Link>
  );
}

/** A compact row: small picture on the left, title on the right. */
export function ArticleRow({ a, s }: { a: WikiArticle; s: WikiStrings }) {
  const m = cardMeta(a);
  return (
    <Link href={wikiPath(a)} className="group flex gap-3.5 py-3.5">
      <span className="relative block aspect-[4/3] w-[104px] shrink-0 overflow-hidden rounded-xl bg-primary-50 ring-1 ring-ink-100 sm:w-32">
        <Image src={a.hero.src} alt={a.hero.alt} fill sizes="128px" className="object-cover transition duration-500 group-hover:scale-105" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-[#8a6a2a]">{m.category}</span>
          <StyleChip style={m.style} s={s} />
        </span>
        <span className="mt-1 line-clamp-2 text-[15px] font-extrabold leading-snug text-ink-900 group-hover:text-primary-600 sm:text-base">{a.title}</span>
        <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-ink-400">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          {s.minutes(m.minutes)}
        </span>
      </span>
    </Link>
  );
}
