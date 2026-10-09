# VaraaAi — Android app (Google Play)

This is a Capacitor-based Android wrapper around the live VaraaAi.Com website.
It is **not** a separate copy of the site — the app's WebView always loads
`https://varaaai.com` directly. That's what makes the two-way sync the user
asked for automatic:

- Anything you change on the website (a new feature, a translated page, a
  bug fix) shows up in the app the next time it's opened — no app update,
  no app-store review needed.
- Anything a customer or salon owner does *in the app* (booking, editing a
  salon, sending a chat message) hits the exact same backend/database as
  the website, because it's the same website.

The only things that live in this folder are the native Android shell
(icon, splash screen, permissions, a couple of WebView tweaks) — never the
site's own code or content.

## What's already done here

- `capacitor.config.ts` — points the app at `https://varaaai.com`.
- `android/` — the generated native Android project.
- `android/.../MainActivity.java` — one small fix so "Continue with Google"
  works inside the app (see comment in that file for why).
- App icon + splash screen, generated from `icon-source/icon.svg` in the
  brand's purple/peach colors.
- Camera permission (for the QR-code scanner used by loyalty cards and
  invoices).

## What you still need to do

This machine has Java 8 and no Android SDK, so the actual installable file
(`.aab`) can't be built here — Android builds need a JDK 17+ and the
Android SDK, which only come bundled with **Android Studio**. Everything
below happens on your own computer.

### 1. Install Android Studio

Download and install Android Studio from
[developer.android.com/studio](https://developer.android.com/studio). It
bundles a compatible JDK and the Android SDK automatically — you don't need
to install Java or the SDK separately.

### 2. Open this project

Open Android Studio → "Open" → select this `mobile-app/android` folder
(not `mobile-app` itself — `android` is the actual native project). Let it
finish indexing and downloading dependencies on first open (a few minutes).

### 3. Try it on your phone or an emulator

- Plug in an Android phone with USB debugging enabled, or start an emulator
  from Android Studio's Device Manager.
- Click the green ▶ Run button. The app should open and load varaaai.com.
- Test "Continue with Google" — it should now work (that's the fix in
  `MainActivity.java`). Test the QR scanner if your salon uses loyalty
  cards.

### 4. Create a signing key (one time)

Google Play requires every release to be signed with the same key forever,
so losing it is a real problem — **back this file up somewhere safe**
(e.g. a password manager or encrypted drive), not just on this one laptop.

In Android Studio: Build → Generate Signed Bundle / APK → Android App
Bundle → Create new... → fill in the key details and a strong password →
save the `.jks` keystore file outside this project folder.

### 5. Build the release bundle

Build → Generate Signed Bundle / APK → Android App Bundle → select your
keystore → build "release". This produces an `.aab` file — that's what you
upload to Google Play (not an `.apk`).

### 6. Create your Google Play Developer account

1. Go to [play.google.com/console/signup](https://play.google.com/console/signup).
2. Sign in with the Google account you want to publish under.
3. Pay the one-time **$25 USD** registration fee.
4. Verify your identity (Google may ask for an ID document — this can take
   a day or two).

### 7. Create the app listing in Play Console

- "Create app" → name it "VaraaAi" → choose your default language.
- **App content** section (required before you can publish):
  - **Privacy policy URL**: `https://varaaai.com/privacy` — I added this
    page to the website specifically for this (vi/en for now; review the
    text in `src/lib/privacy-content.ts` on the website and adjust if
    needed, it's a starting draft, not reviewed by a lawyer).
  - **Data safety form**: declare what the app collects — account info
    (name/email/phone), location (optional, for "near me" search), camera
    (optional, for QR scanning), and that Google/Meta analytics tags run
    on pages the WebView loads.
  - **Content rating questionnaire**, **target audience**, **ads**
    (declare "yes" — the site uses Google Ads tag + Meta Pixel for its own
    marketing).
- **Store listing**: short description, full description, a 512×512 icon
  (`icon-source/icon.png` in this folder, already at the right size), a
  feature graphic (1024×500 — not generated yet, ask me if you want one),
  and a few phone screenshots (take these from the Run step above).
- Upload the `.aab` from step 5 under **Production** (or **Internal
  testing** first, to try it with a small group before going public).

### 8. Submit for review

Google's review usually takes a few hours to a few days for a first
submission. After that, since the app just loads the live website, you'll
rarely need to resubmit — only if you change the native shell itself
(icon, permissions, the Google sign-in fix), not for ordinary website
changes.

## Day-to-day after this

- Website changes: deploy as normal — nothing to do here, the app picks it
  up automatically.
- Native shell changes (new icon, new permission, etc.): make the change in
  this folder, run `npx cap sync android`, rebuild a signed `.aab` in
  Android Studio, and upload a new version in Play Console.

## Useful commands (run from this `mobile-app/` folder)

```bash
npm install          # install Capacitor deps (already done once)
npx cap sync android  # re-copy config/plugins into the native project
                       # after editing capacitor.config.ts or adding a plugin
```
