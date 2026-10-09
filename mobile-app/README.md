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

## Build status on this machine

JDK 21 (Eclipse Temurin) and the Android SDK (platform 36, build-tools
36.0.0) are now installed on this machine specifically for this project, so
a debug build can be produced directly here any time:

```bash
cd mobile-app/android
./gradlew.bat assembleDebug
# → app/build/outputs/apk/debug/app-debug.apk
```

That debug `.apk` installs and runs on a real phone (enable "install from
unknown sources" / sideload it) — it's not signed for Play Store, but it's
the real app, good for trying everything before going further.

## What you still need to do

Two things only I can't do from here: creating the release signing key (a
secret only you should hold) and the Google Play Developer account itself
(needs your identity and payment).

### 1. Create a signing key (one time, and only once ever)

Google Play requires every release to be signed with the *same* key
forever — if it's lost, there is no recovery and the app can never be
updated again under the same listing. Say the word and I can generate it
here with `keytool` (bundled with the JDK already installed) — I'd hand
you the resulting `.jks` file and its password, and you'd need to back
both up immediately somewhere safe (password manager, encrypted drive),
not just leave them on this one machine. Or, if you'd rather hold the
password from the very start, you can generate it yourself later in
Android Studio: Build → Generate Signed Bundle / APK → Android App Bundle
→ Create new...

### 2. Build the release bundle

Once a keystore exists, I can build the signed `.aab` here too — that's
the file you actually upload to Google Play (not the `.apk` from above).

### 3. (Optional) Install Android Studio

Not required for building anymore — only useful if you want to visually
run the app on an emulator yourself, or poke around the native project in
an IDE. Get it from
[developer.android.com/studio](https://developer.android.com/studio) if
you want it; "Open" → this `mobile-app/android` folder.

### 4. Create your Google Play Developer account

1. Go to [play.google.com/console/signup](https://play.google.com/console/signup).
2. Sign in with the Google account you want to publish under.
3. Pay the one-time **$25 USD** registration fee.
4. Verify your identity (Google may ask for an ID document — this can take
   a day or two).

### 5. Create the app listing in Play Console

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
- Upload the `.aab` from step 2 under **Production** (or **Internal
  testing** first, to try it with a small group before going public).

### 6. Submit for review

Google's review usually takes a few hours to a few days for a first
submission. After that, since the app just loads the live website, you'll
rarely need to resubmit — only if you change the native shell itself
(icon, permissions, the Google sign-in fix), not for ordinary website
changes.

## Day-to-day after this

- Website changes: deploy as normal — nothing to do here, the app picks it
  up automatically.
- Native shell changes (new icon, new permission, etc.): make the change in
  this folder, run `npx cap sync android`, rebuild a signed `.aab` (I can do
  this directly once the signing key exists), and upload a new version in
  Play Console.

## Useful commands (run from this `mobile-app/` folder)

```bash
npm install            # install Capacitor deps (already done once)
npx cap sync android    # re-copy config/plugins into the native project
                         # after editing capacitor.config.ts or adding a plugin

cd android
./gradlew.bat assembleDebug   # unsigned debug .apk, installable right away
./gradlew.bat bundleRelease   # signed .aab for Play Store (needs a keystore
                                # configured in android/app/build.gradle first)
```

JDK 21 and the Android SDK are installed at:
- `JAVA_HOME = C:\Program Files\Eclipse Adoptium\jdk-21.0.12.101-hotspot`
- `ANDROID_HOME = C:\Android`
