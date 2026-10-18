import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, the chrome-less embed/site pages, the
  // /q/ short links printed in QR posters, and files with an extension.
  matcher: ["/((?!api|trpc|_next|_vercel|embed|site|q/|.*\\..*).*)"],
};
