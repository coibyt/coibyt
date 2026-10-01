import { Link } from "@/i18n/navigation";

export function StatCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  /** When set, the whole card links there — e.g. "today's bookings" jumping
   * straight to the bookings calendar instead of just displaying a count. */
  href?: string;
}) {
  const content = (
    <>
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 text-primary-500">
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-xl font-bold text-ink-900">{value}</p>
      <p className="text-xs text-ink-400">{label}</p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="card block p-4 transition hover:border-primary-300">
        {content}
      </Link>
    );
  }

  return <div className="card p-4">{content}</div>;
}
