import { getTranslations } from "next-intl/server";
import { auth } from "@/auth";
import { Link } from "@/i18n/navigation";
import { NavUserMenu } from "@/components/nav-user-menu";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { SearchBarCompact } from "@/components/search-bar";

export async function Navbar() {
  const [t, session] = await Promise.all([getTranslations("nav"), auth()]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight text-primary-500">
            Varaa<span className="text-ink-900">Ai</span>
          </span>
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <SearchBarCompact />
        </div>

        <nav className="flex items-center gap-2">
          <LocaleSwitcher />
          {!session?.user && (
            <Link href="/business/apply" className="btn-ghost hidden sm:inline-flex">
              {t("forBusiness")}
            </Link>
          )}
          {session?.user ? (
            <NavUserMenu
              name={session.user.name ?? ""}
              image={session.user.image}
              role={session.user.role}
            />
          ) : (
            <>
              <Link href="/auth/sign-in" className="btn-ghost">
                {t("signIn")}
              </Link>
              <Link href="/auth/sign-up" className="btn-primary">
                {t("signUp")}
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
