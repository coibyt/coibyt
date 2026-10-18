import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

export default function robots(): MetadataRoute.Robots {
  // Private areas, both unprefixed (vi) and under a locale prefix (/en/...).
  const privatePaths = ["/business/dashboard", "/admin", "/account", "/auth", "/booking"];
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/embed/", ...privatePaths, ...privatePaths.map((p) => `/*${p}`)],
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
