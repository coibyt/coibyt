"use client";

import { useEffect, useState } from "react";
import { BusinessCard } from "@/components/business-card";
import { getCachedCountry, detectCountry } from "@/lib/detect-country-client";

interface FeaturedBusiness {
  id: string;
  slug: string;
  name: string;
  coverUrl: string | null;
  city: string | null;
  reviews: { rating: number }[];
  categories: { category: { nameVi: string; nameEn: string } }[];
}

/**
 * Shows only businesses in the visitor's own country — a visitor in Finland
 * shouldn't see Vietnamese salons under "popular near you". If their
 * country has no listings yet, the section hides itself rather than
 * showing something irrelevant; if their country can't be determined at
 * all (no location permission), it falls back to the unfiltered list so
 * the homepage isn't empty for the common case of a declined prompt.
 */
export function FeaturedNearby({ locale, title }: { locale: string; title: string }) {
  const [businesses, setBusinesses] = useState<FeaturedBusiness[] | null>(null);

  useEffect(() => {
    function load(country: string | null) {
      const qs = country ? `?country=${country}` : "";
      fetch(`/api/businesses/featured${qs}`)
        .then((r) => r.json())
        .then((data) => setBusinesses(data.businesses ?? []))
        .catch(() => setBusinesses([]));
    }

    const cached = getCachedCountry();
    if (cached) load(cached);
    else detectCountry().then(load);
  }, []);

  if (!businesses || businesses.length === 0) return null;

  return (
    <section className="container py-14">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-ink-900">{title}</h2>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {businesses.map((b) => (
          <BusinessCard key={b.id} business={b} locale={locale} />
        ))}
      </div>
    </section>
  );
}
