import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Hostinger's build box caps how many threads one account may start. By
  // default Next runs one page-data worker per CPU, and each loads Prisma's
  // engine with its own thread pool, which trips that cap ("OS can't spawn
  // worker thread"). One worker keeps the build well under it.
  experimental: { cpus: 1, workerThreads: false },
  // HarfBuzz (text shaping for the price-list PDFs) loads its own .wasm from
  // its package folder at runtime — keep it out of the server bundle, and
  // make sure that file and the price-list fonts ship with the route.
  serverExternalPackages: ["harfbuzzjs"],
  outputFileTracingIncludes: {
    "/api/tools/price-list/pdf": ["./node_modules/harfbuzzjs/dist/**/*", "./public/fonts/price-list/**/*"],
    "/api/tools/render-pdf": ["./node_modules/harfbuzzjs/dist/**/*", "./public/fonts/price-list/**/*"],
  },
  // The Academy and social videos are not in git any more: with them the repository passed 3 GB and Hostinger's
  // 5-minute clone failed (Nov 2026). They live in the static folder public_html/media on the same Hostinger
  // site (https://varaaai.com/media/…, also media.varaaai.com); the pages link there through src/lib/media.ts.
  // Old links (/academy/….mp4, /social/….mp4: shared posts, social queues) are sent on to the same file.
  async redirects() {
    return ["academy", "social"].map((dir) => ({
      source: `/${dir}/:file(.*\\.mp4)`,
      destination: `/media/${dir}/:file`,
      permanent: false,
    }));
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
