import * as Icons from "lucide-react";
import { Link } from "@/i18n/navigation";

export function CategoryCard({
  slug,
  name,
  icon,
}: {
  slug: string;
  name: string;
  icon?: string | null;
}) {
  const Icon =
    (icon && (Icons as unknown as Record<string, Icons.LucideIcon>)[icon]) ||
    Icons.Sparkles;

  return (
    <Link
      href={`/search?category=${slug}`}
      className="group flex flex-col items-center gap-3 rounded-3xl border border-ink-100 bg-white px-3 py-6 text-center transition-colors hover:border-primary-200 hover:bg-primary-50"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-peach-100 text-primary-600 transition-colors group-hover:bg-white">
        <Icon className="h-6 w-6" />
      </span>
      <span className="text-sm font-semibold text-ink-900">{name}</span>
    </Link>
  );
}
