# VaraaAi (varaaai.com)

Booking and salon-management site: Next.js 15 App Router, `[locale]` routes via next-intl (vi, en, fi), Prisma 5 on MySQL hosted on Hostinger.

## Working with the owner
- Reply in Vietnamese, in plain language. The owner reads on a phone.
- Just do the work, without long questions. Ask only when a choice really is the owner's.
- The design must look professional and premium ("đẳng cấp"). Match the existing look: purple `primary`/`ink` palette, rounded-2xl/3xl cards, gold accents (#b08a3e, #e8d3a6).
- User-facing text needs all three languages. Feature strings live in `src/lib/*-strings.ts` (vi/en/fi objects); some components use inline `locale === "vi" ? … : locale === "fi" ? … : …`.

## Deploy
- Pushing to `main` on GitHub (coibyt/coibyt) deploys to Hostinger automatically in about 10–25 minutes.
- Check a deploy: the build id is `"b":"…"` in the HTML of https://varaaai.com/fi. The `last-modified` header of `/_next/static/<id>/_ssgManifest.js` shows when it was built.
- Before committing, run `npx tsc --noEmit -p .` and `npx eslint <changed files>`.
- Commit only the files of the current task. Never commit unrelated work-in-progress files.
- Videos (`.mp4` under `public/academy` and `public/social`) are NOT in git (with them the repo passed 3 GB and Hostinger's 5-minute clone failed, Nov 2026). Keep them in `public/…` locally as before (git ignores them), upload with `bash scripts/upload-media.sh <files>` (to `public_html/media` on Hostinger, served at https://varaaai.com/media/…), check the URL answers 200/206, then push the code. Pages link to videos through `videoUrl()` in `src/lib/media.ts`. Posters (.jpg) and subtitles (.vtt) stay in git.

## Database (production — be careful)
- `.env` `DATABASE_URL` points at the production database. Never use it as a shadow DB, and never run `prisma migrate dev`, `prisma migrate reset` or `prisma db push`.
- Do not run `prisma format`.
- Only the owner's home computer (its IP whitelisted in hPanel → Remote MySQL) can reach the database. Cloud sessions cannot.
- A change that needs new columns or tables: write the SQL in `prisma/migrations/<timestamp>_<name>/migration.sql` and update `schema.prisma`. Additive changes only, never destructive.
  - From a machine that has access, apply it: `npx prisma db execute --file <sql> --schema prisma/schema.prisma`, then `npx prisma migrate resolve --applied <name>`, then `npx prisma generate`.
  - From the cloud, don't push code that reads the new columns before they exist, or the live site breaks. Give the owner the SQL to run in hPanel → phpMyAdmin first, and wait until they confirm.
