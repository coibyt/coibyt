import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

/** AI assistants and AI search crawlers. They are welcome on every public
 * page — being read by them is how VaraaAi and its salons get recommended in
 * ChatGPT, Claude, Perplexity, Gemini and Copilot answers. */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Amazonbot",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  // Private areas, both unprefixed (vi) and under a locale prefix (/en/...).
  const privatePaths = ["/business/dashboard", "/admin", "/account", "/auth", "/booking"];
  const disallow = ["/api/", "/embed/", ...privatePaths, ...privatePaths.map((p) => `/*${p}`)];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // A named group replaces "*" for that crawler, so the private areas are repeated.
      { userAgent: AI_CRAWLERS, allow: "/", disallow },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
