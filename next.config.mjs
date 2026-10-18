import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // HarfBuzz (text shaping for the price-list PDFs) loads its own .wasm from
  // its package folder at runtime — keep it out of the server bundle, and
  // make sure that file and the price-list fonts ship with the route.
  serverExternalPackages: ["harfbuzzjs"],
  outputFileTracingIncludes: {
    "/api/tools/price-list/pdf": ["./node_modules/harfbuzzjs/dist/**/*", "./public/fonts/price-list/**/*"],
  },
  images: {
    // Business owners currently paste a direct image URL for their logo/cover
    // (there's no upload pipeline yet — see README "Giới hạn đã biết"), so we
    // can't know the hostname in advance. Once a real upload service (e.g.
    // Cloudinary/S3) is wired up, narrow this back down to that host only.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default withNextIntl(nextConfig);
