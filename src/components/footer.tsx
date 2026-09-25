import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-100 bg-mist-50">
      <div className="container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="text-lg font-extrabold text-primary-500">
            Varaa<span className="text-ink-900">Ai</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-ink-400">{t("tagline")}</p>
        </div>
        <FooterColumn
          title={t("forCustomers")}
          links={[
            { href: "/", label: t("forCustomers") },
            { href: "/account/bookings", label: "" },
          ].filter((l) => l.label)}
        />
        <FooterColumn
          title={t("forBusiness")}
          links={[{ href: "/business", label: t("forBusiness") }]}
        />
        <FooterColumn
          title={t("company")}
          links={[
            { href: "/", label: "VaraaAi.Com" },
            { href: "/terms", label: t("terms") },
          ]}
        />
      </div>
      <div className="border-t border-ink-100 py-4 text-center text-xs text-ink-400">
        © {year} VaraaAi.Com — {t("rights")}
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-ink-900">{title}</h4>
      <ul className="space-y-2 text-sm text-ink-400">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-ink-900">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
