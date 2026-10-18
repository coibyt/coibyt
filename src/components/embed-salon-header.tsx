import Image from "next/image";
import { MapPin, Star } from "lucide-react";

/** The salon's own banner at the top of the embed booking steps: cover photo
 * (or the plum brand gradient) under a dark wash, with logo, name, address
 * and rating — so the iframe feels like the salon's booking page, not a
 * generic form. */
export function EmbedSalonHeader({
  name,
  logoUrl,
  coverUrl,
  address,
  rating,
  children,
}: {
  name: string;
  logoUrl: string | null;
  coverUrl: string | null;
  address: string | null;
  rating?: { avg: number; count: number } | null;
  children?: React.ReactNode;
}) {
  return (
    <div className="relative mb-6 overflow-hidden rounded-[28px] bg-primary-800 text-white shadow-lg shadow-primary-900/15">
      {coverUrl ? (
        <>
          <Image src={coverUrl} alt="" fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/95 via-primary-900/70 to-primary-900/30" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-coral-400/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-56 w-56 rounded-full bg-primary-400/40 blur-3xl" />
        </>
      )}
      <div className={`relative flex items-center gap-4 px-5 pb-5 ${coverUrl ? "pt-20" : "pt-5"}`}>
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-2xl font-extrabold text-primary-600 shadow-md ring-4 ring-white/20">
          {logoUrl ? (
            <Image src={logoUrl} alt="" width={64} height={64} className="h-full w-full object-contain p-1" />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </div>
        <div className="min-w-0">
          <h1 className="text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">{name}</h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-primary-100 sm:text-sm">
            {rating && rating.count > 0 && (
              <span className="inline-flex items-center gap-1 font-semibold text-white">
                <Star className="h-3.5 w-3.5 fill-coral-400 text-coral-400" />
                {rating.avg.toFixed(1)}
                <span className="font-normal text-primary-100">({rating.count})</span>
              </span>
            )}
            {address && (
              <span className="inline-flex min-w-0 items-center gap-1">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{address}</span>
              </span>
            )}
          </div>
        </div>
      </div>
      {children && <div className="relative px-5 pb-5">{children}</div>}
    </div>
  );
}
