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
      className="card flex flex-col items-center gap-2 px-3 py-5 text-center transition-transform hover:-translate-y-0.5 hover:shadow-popover"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-primary-500">
        <Icon className="h-5 w-5" />
      </span>
      <span className="text-sm font-medium text-ink-900">{name}</span>
    </Link>
  );
}
