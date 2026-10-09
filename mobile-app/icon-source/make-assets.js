const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const svg = fs.readFileSync(path.join(__dirname, "icon.svg"));

async function main() {
  // Main app icon (also used by @capacitor/assets to generate all
  // mipmap densities + the Play Store listing icon).
  await sharp(svg).resize(1024, 1024).png().toFile(path.join(__dirname, "icon.png"));

  // Foreground-only layer (transparent background) for Android adaptive
  // icons — same mark, no background rect, inset so it isn't clipped by
  // the OS's circular/squircle mask.
  const fgSvg = `
    <svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
      <text x="512" y="610" font-family="Arial, 'Helvetica Neue', sans-serif" font-weight="800"
            font-size="420" text-anchor="middle" fill="#624f89">V</text>
      <circle cx="660" cy="330" r="34" fill="#ec6a47"/>
    </svg>`;
  await sharp(Buffer.from(fgSvg)).resize(1024, 1024).png().toFile(path.join(__dirname, "icon-foreground.png"));

  // Plain background layer for the adaptive icon.
  const bgSvg = `
    <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffece4"/>
          <stop offset="100%" stop-color="#ffd9c9"/>
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" fill="url(#bg)"/>
    </svg>`;
  await sharp(Buffer.from(bgSvg)).resize(1024, 1024).png().toFile(path.join(__dirname, "icon-background.png"));

  // Splash screen: same mark, centered, on the brand peach background,
  // at Android's recommended 2732x2732 source size.
  const splashSvg = `
    <svg width="2732" height="2732" xmlns="http://www.w3.org/2000/svg">
      <rect width="2732" height="2732" fill="#ffece4"/>
      <text x="1366" y="1480" font-family="Arial, 'Helvetica Neue', sans-serif" font-weight="800"
            font-size="420" text-anchor="middle" fill="#624f89">VaraaAi</text>
    </svg>`;
  await sharp(Buffer.from(splashSvg)).resize(2732, 2732).png().toFile(path.join(__dirname, "splash.png"));

  console.log("done");
}

main().catch((e) => { console.error(e); process.exit(1); });
