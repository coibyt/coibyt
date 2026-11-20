import { BellOff } from "lucide-react";
import { leaveWaitlist } from "@/lib/waitlist";
import { waitlistStrings } from "@/lib/waitlist-strings";
import { Link } from "@/i18n/navigation";

/** Where the "leave the wait list" link in the spot-available email lands. */
export default async function LeaveWaitlistPage({ params }: { params: Promise<{ locale: string; token: string }> }) {
  const { locale, token } = await params;
  const S = waitlistStrings(locale);
  const business = await leaveWaitlist(token);

  return (
    <div className="min-h-screen bg-mist-50">
      <div className="container max-w-lg px-4 pb-16 pt-8 sm:pt-14">
        <div className="rounded-3xl bg-white p-6 text-center shadow-[0_18px_40px_-30px_rgba(31,24,45,0.5)] ring-1 ring-ink-100">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-mist-50 text-ink-400 ring-1 ring-ink-100">
            <BellOff className="h-7 w-7" />
          </span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900">{business ? S.leftTitle : ""}</h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{business ? S.leftText(business.name) : S.leftGone}</p>
          {business && (
            <Link href={`/b/${business.slug}`} className="btn-primary mt-6 inline-flex !px-5 !py-2.5 text-sm">
              {S.bookAgain}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
