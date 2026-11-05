import { C, SITE_URL, button, emailLayout, esc, headingFont, notice, panel, para, sectionTitle, steps } from "@/lib/email/ui";
import { LITE_MAX_CARDS, liteCardUrl, liteLocale, liteOpenUrl, type LiteLocale } from "@/lib/loyalty-lite";

/** Emails of Loyalty Lite (src/lib/loyalty-lite.ts): the salon's welcome /
 * sign-in link, and their customers' card and stamp emails, in the salon's
 * language (Vietnamese, English or Finnish). */

const GOLD_LIGHT = "#e8d3a6";
const MONO = "'SFMono-Regular',Menlo,Consolas,'Courier New',monospace";

type Salon = { salonName: string; ownerName: string | null; email: string | null; locale: string; accessToken: string; stampsRequired: number; rewardText: string };
type Card = { token: string; customerName: string; stamps: number };

const T = {
  vi: {
    welcomeSubject: (s: string) => `Thẻ tích điểm của ${s} đã sẵn sàng`,
    welcomePre: "Mở trang quản lý, cấp thẻ cho khách đầu tiên và đóng dấu chỉ trong vài giây.",
    welcomeEyebrow: "Thẻ tích điểm miễn phí",
    welcomeTitle: (s: string) => `Chào mừng ${s} đến với VaraaAi`,
    welcomeIntro: "Chương trình khách hàng thân thiết của bạn đã được tạo. Bấm nút bên dưới để vào trang quản lý — không cần mật khẩu.",
    hi: "Xin chào",
    open: "Mở trang thẻ tích điểm",
    fallback: "Nút không bấm được? Mở đường link này:",
    howTitle: "Bắt đầu trong 3 bước",
    how: (n: number, reward: string) => [
      { title: "Đặt phần thưởng", body: `Hiện tại: đủ <strong>${n} dấu</strong> → <strong>${esc(reward)}</strong>. Bạn đổi được bất cứ lúc nào trong mục Chương trình.` },
      { title: "Cấp thẻ cho khách", body: "Nhập tên và email của khách — khách nhận ngay thẻ VIP có mã QR qua email." },
      { title: "Đóng dấu mỗi lần khách đến", body: "Mở camera điện thoại quét mã QR trên thẻ của khách, rồi bấm “Đóng 1 dấu”. Đủ dấu thì bấm “Đổi ưu đãi”." },
    ],
    keyTitle: "Giữ email này",
    keyBody: "Đường link trên là chìa khoá vào trang quản lý của bạn. Mở nó trên điện thoại và máy ở quầy để đóng dấu ở đâu cũng được. Đừng chuyển tiếp email này cho người ngoài.",
    upgradeTitle: "Muốn nhiều hơn?",
    upgradeBody: (n: number) =>
      `Bản miễn phí dùng cho tối đa ${n.toLocaleString("vi-VN")} khách. Đăng ký VaraaAi đầy đủ bằng cùng email này để có thẻ không giới hạn, đặt lịch online, nhắc lịch tự động, marketing qua email, quản lý nhân viên — thẻ và dấu của khách được chuyển sang tự động.`,
    upgradeCta: "Tìm hiểu VaraaAi cho salon",
    signinSubject: (s: string) => `Link đăng nhập trang thẻ tích điểm của ${s}`,
    signinPre: "Bấm để mở lại trang thẻ tích điểm của salon.",
    signinTitle: "Mở lại trang thẻ tích điểm",
    signinIntro: "Bạn (hoặc ai đó) vừa yêu cầu link đăng nhập bằng email này. Bấm nút bên dưới để vào trang quản lý.",
    signinIgnore: "Nếu bạn không yêu cầu, cứ bỏ qua email này — không có gì thay đổi.",
    cardSubject: (s: string) => `Thẻ thành viên của bạn tại ${s}`,
    cardPre: (n: number, reward: string) => `Đủ ${n} dấu: ${reward}. Đưa mã QR mỗi lần đến salon.`,
    cardEyebrow: "Thẻ thành viên",
    cardTitle: (first: string) => `${first}, thẻ của bạn đã sẵn sàng`,
    cardIntro: (s: string) => `Cảm ơn bạn đã chọn ${s}. Mỗi lần đến salon, bạn được đóng 1 dấu vào thẻ.`,
    member: "Thành viên",
    code: "Mã thẻ",
    reward: "Ưu đãi",
    progress: (have: number, n: number) => `${have}/${n} dấu`,
    viewCard: "Xem thẻ của tôi",
    cardHowTitle: "Cách dùng thẻ",
    cardHow: (n: number, reward: string) => [
      { title: "Đưa mã QR khi đến", body: "Mở email này hoặc chụp màn hình mã QR. Salon quét mã và đóng dấu cho bạn." },
      { title: `Đủ ${n} dấu`, body: `Bạn nhận <strong>${esc(reward)}</strong>.` },
      { title: "Xem thẻ bất cứ lúc nào", body: "Bấm “Xem thẻ của tôi” để xem số dấu hiện có." },
    ],
    stampSubject: (s: string, have: number, n: number) => `Đóng dấu thành công tại ${s} — bạn có ${have}/${n} dấu`,
    stampPre: (left: number) => `Còn ${left} dấu nữa là bạn được giảm giá.`,
    stampTitle: (first: string) => `Cảm ơn ${first}, bạn vừa được +1 dấu`,
    stampLeft: (have: number, n: number, left: number, reward: string) =>
      `Thẻ của bạn vừa được đóng dấu thành công. Bạn đang có <strong>${have}/${n} dấu</strong> — còn <strong>${left} dấu</strong> nữa là bạn nhận <strong>${esc(reward)}</strong>.`,
    readySubject: (s: string) => `Bạn đã đủ dấu tại ${s} 🎉`,
    readyPre: "Ưu đãi đang chờ bạn ở lần đến tiếp theo.",
    readyTitle: (first: string) => `Chúc mừng ${first}!`,
    readyBody: (reward: string) => `Thẻ của bạn đã đủ dấu. Ở lần đến tiếp theo, bạn nhận <strong>${esc(reward)}</strong> — chỉ cần đưa mã QR cho salon.`,
    closing: (s: string) => `Hẹn gặp bạn tại ${esc(s)}.`,
    powered: "Thẻ tích điểm miễn phí bởi VaraaAi — tạo thẻ cho salon của bạn tại varaaai.com/loyalty-lite",
  },
  en: {
    welcomeSubject: (s: string) => `${s}'s loyalty card is ready`,
    welcomePre: "Open your dashboard, give your first customer a card and stamp it in seconds.",
    welcomeEyebrow: "Free loyalty card",
    welcomeTitle: (s: string) => `Welcome to VaraaAi, ${s}`,
    welcomeIntro: "Your loyalty program is set up. Tap the button below to open your dashboard — no password needed.",
    hi: "Hi",
    open: "Open my loyalty cards",
    fallback: "Button not working? Open this link:",
    howTitle: "Get going in 3 steps",
    how: (n: number, reward: string) => [
      { title: "Set your reward", body: `Right now: <strong>${n} stamps</strong> → <strong>${esc(reward)}</strong>. Change it any time under Program.` },
      { title: "Give customers a card", body: "Enter the customer's name and email — they get a VIP card with a QR code by email right away." },
      { title: "Stamp every visit", body: "Point your phone camera at the customer's QR code and tap “Add 1 stamp”. When the card is full, tap “Redeem reward”." },
    ],
    keyTitle: "Keep this email",
    keyBody: "The link above is the key to your dashboard. Open it on your phone and the front-desk computer to stamp anywhere. Don't forward this email to anyone outside the salon.",
    upgradeTitle: "Want more?",
    upgradeBody: (n: number) =>
      `The free version covers up to ${n.toLocaleString("en-US")} customers. Sign up for full VaraaAi with this same email for unlimited cards, online booking, automatic reminders, email marketing and staff tools — your customers' cards and stamps move over automatically.`,
    upgradeCta: "See VaraaAi for salons",
    signinSubject: (s: string) => `Your sign-in link for ${s}'s loyalty cards`,
    signinPre: "Tap to open your salon's loyalty dashboard again.",
    signinTitle: "Open your loyalty cards",
    signinIntro: "You (or someone) asked for a sign-in link with this email. Tap the button below to open your dashboard.",
    signinIgnore: "Didn't ask for it? Just ignore this email — nothing changes.",
    cardSubject: (s: string) => `Your member card at ${s}`,
    cardPre: (n: number, reward: string) => `${n} stamps: ${reward}. Show the QR code at every visit.`,
    cardEyebrow: "Member card",
    cardTitle: (first: string) => `${first}, your card is ready`,
    cardIntro: (s: string) => `Thank you for choosing ${s}. Every visit earns you a stamp.`,
    member: "Member",
    code: "Card code",
    reward: "Reward",
    progress: (have: number, n: number) => `${have}/${n} stamps`,
    viewCard: "View my card",
    cardHowTitle: "How it works",
    cardHow: (n: number, reward: string) => [
      { title: "Show the QR code", body: "Open this email or screenshot the QR code. The salon scans it and stamps your card." },
      { title: `Collect ${n} stamps`, body: `You get <strong>${esc(reward)}</strong>.` },
      { title: "Check your card any time", body: "Tap “View my card” to see your stamps." },
    ],
    stampSubject: (s: string, have: number, n: number) => `Stamped at ${s} — you have ${have}/${n}`,
    stampPre: (left: number) => `${left} more stamps to your reward.`,
    stampTitle: (first: string) => `Thanks ${first}, that's +1 stamp`,
    stampLeft: (have: number, n: number, left: number, reward: string) =>
      `Your card was just stamped. You now have <strong>${have}/${n} stamps</strong> — <strong>${left} more</strong> and you get <strong>${esc(reward)}</strong>.`,
    readySubject: (s: string) => `Your card at ${s} is full 🎉`,
    readyPre: "Your reward is waiting at your next visit.",
    readyTitle: (first: string) => `Congratulations, ${first}!`,
    readyBody: (reward: string) => `Your card is full. At your next visit you get <strong>${esc(reward)}</strong> — just show your QR code.`,
    closing: (s: string) => `See you soon at ${esc(s)}.`,
    powered: "Free loyalty card by VaraaAi — create one for your salon at varaaai.com/loyalty-lite",
  },
  fi: {
    welcomeSubject: (s: string) => `${s}: kanta-asiakaskortti on valmis`,
    welcomePre: "Avaa hallinta, anna ensimmäiselle asiakkaalle kortti ja leimaa se sekunneissa.",
    welcomeEyebrow: "Ilmainen kanta-asiakaskortti",
    welcomeTitle: (s: string) => `Tervetuloa VaraaAi:hin, ${s}`,
    welcomeIntro: "Kanta-asiakasohjelmasi on luotu. Avaa hallinta alla olevasta painikkeesta — salasanaa ei tarvita.",
    hi: "Hei",
    open: "Avaa kanta-asiakaskortit",
    fallback: "Eikö painike toimi? Avaa tämä linkki:",
    howTitle: "Alkuun 3 vaiheessa",
    how: (n: number, reward: string) => [
      { title: "Valitse palkinto", body: `Nyt: <strong>${n} leimaa</strong> → <strong>${esc(reward)}</strong>. Voit muuttaa sen milloin tahansa kohdassa Ohjelma.` },
      { title: "Anna asiakkaille kortti", body: "Kirjoita asiakkaan nimi ja sähköposti — hän saa heti VIP-kortin QR-koodilla sähköpostiin." },
      { title: "Leimaa jokainen käynti", body: "Osoita puhelimen kameralla asiakkaan QR-koodia ja napauta ”Lisää 1 leima”. Kun kortti on täynnä, napauta ”Käytä palkinto”." },
    ],
    keyTitle: "Säilytä tämä viesti",
    keyBody: "Yllä oleva linkki on avain hallintaasi. Avaa se puhelimessa ja vastaanoton koneella, niin voit leimata missä vain. Älä välitä viestiä salongin ulkopuolelle.",
    upgradeTitle: "Haluatko enemmän?",
    upgradeBody: (n: number) =>
      `Ilmaisversio riittää ${n.toLocaleString("fi-FI")} asiakkaalle. Rekisteröidy täyteen VaraaAi:hin samalla sähköpostilla: rajattomasti kortteja, verkkoajanvaraus, automaattiset muistutukset, sähköpostimarkkinointi ja henkilökunnan työkalut — asiakkaiden kortit ja leimat siirtyvät automaattisesti.`,
    upgradeCta: "Tutustu VaraaAi:hin",
    signinSubject: (s: string) => `${s}: kirjautumislinkki kanta-asiakaskortteihin`,
    signinPre: "Avaa salongin kanta-asiakashallinta uudelleen.",
    signinTitle: "Avaa kanta-asiakaskortit",
    signinIntro: "Sinä (tai joku muu) pyysi kirjautumislinkkiä tällä sähköpostilla. Avaa hallinta alla olevasta painikkeesta.",
    signinIgnore: "Etkö pyytänyt sitä? Ohita viesti — mikään ei muutu.",
    cardSubject: (s: string) => `Kanta-asiakaskorttisi: ${s}`,
    cardPre: (n: number, reward: string) => `${n} leimaa: ${reward}. Näytä QR-koodi jokaisella käynnillä.`,
    cardEyebrow: "Kanta-asiakaskortti",
    cardTitle: (first: string) => `${first}, korttisi on valmis`,
    cardIntro: (s: string) => `Kiitos, että valitsit ${s}. Jokaisesta käynnistä saat leiman.`,
    member: "Jäsen",
    code: "Kortin koodi",
    reward: "Palkinto",
    progress: (have: number, n: number) => `${have}/${n} leimaa`,
    viewCard: "Näytä korttini",
    cardHowTitle: "Näin kortti toimii",
    cardHow: (n: number, reward: string) => [
      { title: "Näytä QR-koodi", body: "Avaa tämä viesti tai ota QR-koodista kuvakaappaus. Salonki skannaa sen ja leimaa korttisi." },
      { title: `Kerää ${n} leimaa`, body: `Saat <strong>${esc(reward)}</strong>.` },
      { title: "Katso korttia milloin vain", body: "Napauta ”Näytä korttini” nähdäksesi leimasi." },
    ],
    stampSubject: (s: string, have: number, n: number) => `Leima lisätty: ${s} — sinulla on ${have}/${n}`,
    stampPre: (left: number) => `Vielä ${left} leimaa palkintoon.`,
    stampTitle: (first: string) => `Kiitos ${first}, sait +1 leiman`,
    stampLeft: (have: number, n: number, left: number, reward: string) =>
      `Korttisi leimattiin juuri. Sinulla on nyt <strong>${have}/${n} leimaa</strong> — vielä <strong>${left}</strong>, niin saat <strong>${esc(reward)}</strong>.`,
    readySubject: (s: string) => `Korttisi on täynnä: ${s} 🎉`,
    readyPre: "Palkintosi odottaa seuraavalla käynnillä.",
    readyTitle: (first: string) => `Onnittelut, ${first}!`,
    readyBody: (reward: string) => `Korttisi on täynnä. Seuraavalla käynnillä saat <strong>${esc(reward)}</strong> — näytä vain QR-koodisi.`,
    closing: (s: string) => `Nähdään pian, ${esc(s)}.`,
    powered: "Ilmainen kanta-asiakaskortti: VaraaAi — tee omalle salongillesi osoitteessa varaaai.com/loyalty-lite",
  },
} satisfies Record<LiteLocale, unknown>;

const strings = (locale: string) => T[liteLocale(locale)];
const first = (name: string) => name.trim().split(/\s+/)[0] || name;

/** Stamp slots, the last one a gold star. */
function slots(have: number, n: number) {
  const cells = Array.from({ length: n }, (_, i) => {
    const on = i < have;
    const last = i === n - 1;
    const bg = on ? (last ? C.gold : C.primary) : "#ffffff";
    const fg = on ? "#ffffff" : last ? C.gold : "#b8abcc";
    return `<td style="padding:3px"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="26" height="26" align="center" valign="middle" bgcolor="${bg}" style="width:26px;height:26px;border-radius:50%;background:${bg};border:1.5px ${on ? "solid" : "dashed"} ${on ? bg : last ? C.gold : "#cdbfe0"};color:${fg};font-size:${last ? 12 : 10}px;font-weight:700;line-height:26px">${last ? "★" : on ? "✓" : i + 1}</td></tr></table></td>`;
  });
  // Rows of five, so ten slots fit a phone.
  const rowsHtml: string[] = [];
  for (let i = 0; i < cells.length; i += 5) rowsHtml.push(`<tr>${cells.slice(i, i + 5).join("")}</tr>`);
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:14px auto 0">${rowsHtml.join("")}</table>`;
}

/** The plum, gold-edged member card with the QR on white. */
function memberCard(s: Salon, c: Card, font: string) {
  const t = strings(s.locale);
  const label = (text: string) => `<div style="font-size:10px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:rgba(255,255,255,.55)">${text}</div>`;
  const qr = `${SITE_URL}/api/email-qr/lite/${c.token}.png`;
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 6px;border-collapse:separate">
    <tr><td bgcolor="#2a1d3d" style="background:#2a1d3d;background-image:linear-gradient(140deg,#1f182d 0%,#40325c 55%,#6d2a6f 100%);border:1px solid ${C.gold};border-radius:22px;padding:24px">
      <div style="font-family:${font};font-size:20px;font-style:italic;font-weight:600;color:${GOLD_LIGHT}">${esc(s.salonName)}</div>
      <div style="height:16px;line-height:16px;font-size:1px">&nbsp;</div>
      ${label(esc(t.member))}
      <div style="font-family:${font};font-size:24px;font-weight:600;color:#ffffff;margin-top:4px">${esc(c.customerName)}</div>
      <div style="height:18px;line-height:18px;font-size:1px">&nbsp;</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td bgcolor="#ffffff" style="background:#ffffff;border-radius:18px;padding:12px">
        <img src="${esc(qr)}" width="184" height="184" alt="QR ${esc(c.token)}" style="display:block;border:0;width:184px;height:184px" />
      </td></tr></table>
      <div style="height:16px;line-height:16px;font-size:1px">&nbsp;</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td style="padding:11px 0;border-top:1px solid rgba(201,169,110,.35)">${label(esc(t.code))}</td>
          <td align="right" style="padding:11px 0;border-top:1px solid rgba(201,169,110,.35);font-family:${MONO};font-size:15px;font-weight:700;letter-spacing:2px;color:${GOLD_LIGHT}">${esc(c.token)}</td>
        </tr>
        <tr>
          <td style="padding:11px 0 0;border-top:1px solid rgba(201,169,110,.35)">${label(esc(t.reward))}</td>
          <td align="right" style="padding:11px 0 0;border-top:1px solid rgba(201,169,110,.35);font-size:14px;font-weight:700;color:#ffffff">${esc(s.rewardText)}</td>
        </tr>
      </table>
    </td></tr>
  </table>`;
}

function progressBlock(s: Salon, c: Card) {
  const t = strings(s.locale);
  return panel(
    `<div style="text-align:center;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.muted}">${esc(t.progress(Math.min(c.stamps, s.stampsRequired), s.stampsRequired))}</div>${slots(Math.min(c.stamps, s.stampsRequired), s.stampsRequired)}`,
    { mt: 18 },
  );
}

const footer = (s: Salon) => `<span style="color:${C.muted}">${esc(strings(s.locale).powered)}</span>`;

/** To the salon: first sign-up (welcome) or a later sign-in link. */
export function liteOwnerEmail(s: Salon, kind: "welcome" | "signin") {
  const t = strings(s.locale);
  const link = liteOpenUrl(s.accessToken);
  const hiLine = s.ownerName ? `<p style="margin:0 0 14px;font-size:16px;color:${C.ink}">${esc(t.hi)} <strong>${esc(s.ownerName)}</strong>,</p>` : "";
  if (kind === "signin") {
    return {
      subject: t.signinSubject(s.salonName),
      html: emailLayout({
        locale: s.locale,
        preheader: t.signinPre,
        brand: null,
        hero: { eyebrow: esc(t.welcomeEyebrow), title: esc(t.signinTitle), intro: esc(t.signinIntro), tone: "gold" },
        body: hiLine + button(link, esc(t.open), { variant: "dark", fallback: t.fallback }) + notice(null, esc(t.signinIgnore), "info", 24),
      }),
    };
  }
  const upgradeUrl = `${SITE_URL}${s.locale === "vi" ? "" : `/${s.locale}`}/business`;
  return {
    subject: t.welcomeSubject(s.salonName),
    html: emailLayout({
      locale: s.locale,
      preheader: t.welcomePre,
      brand: null,
      hero: { eyebrow: esc(t.welcomeEyebrow), title: esc(t.welcomeTitle(s.salonName)), intro: esc(t.welcomeIntro), tone: "gold", badge: "✦" },
      body:
        hiLine +
        button(link, esc(t.open), { variant: "dark", fallback: t.fallback }) +
        sectionTitle(esc(t.howTitle)) +
        steps(t.how(s.stampsRequired, s.rewardText)) +
        notice(esc(t.keyTitle), esc(t.keyBody), "gold", 22) +
        panel(
          `<div style="font-family:${headingFont(s.locale)};font-size:19px;font-weight:700;color:${C.night}">${esc(t.upgradeTitle)}</div>` +
            para(esc(t.upgradeBody(LITE_MAX_CARDS)), { small: true, mt: 6 }) +
            button(upgradeUrl, esc(t.upgradeCta), { variant: "gold", align: "left" }),
          { mt: 24, bg: "#fbf6ec", border: "#ecd9ad" },
        ),
    }),
  };
}

/** To a customer when the salon gives them a card. */
export function liteCardEmail(s: Salon, c: Card) {
  const t = strings(s.locale);
  const font = headingFont(s.locale);
  return {
    subject: t.cardSubject(s.salonName),
    html: emailLayout({
      locale: s.locale,
      preheader: t.cardPre(s.stampsRequired, s.rewardText),
      brand: { name: s.salonName },
      hero: { eyebrow: esc(t.cardEyebrow), title: esc(t.cardTitle(first(c.customerName))), intro: esc(t.cardIntro(s.salonName)), tone: "gold", badge: "★" },
      body:
        memberCard(s, c, font) +
        progressBlock(s, c) +
        button(liteCardUrl(c.token, s.locale), esc(t.viewCard), { variant: "dark" }) +
        sectionTitle(esc(t.cardHowTitle)) +
        steps(t.cardHow(s.stampsRequired, s.rewardText)) +
        para(t.closing(s.salonName), { muted: true, mt: 22 }),
      footerExtra: footer(s),
    }),
  };
}

/** To a customer after a stamp: progress, or "your card is full". */
export function liteStampEmail(s: Salon, c: Card) {
  const t = strings(s.locale);
  const ready = c.stamps >= s.stampsRequired;
  const left = Math.max(0, s.stampsRequired - c.stamps);
  return {
    subject: ready ? t.readySubject(s.salonName) : t.stampSubject(s.salonName, c.stamps, s.stampsRequired),
    html: emailLayout({
      locale: s.locale,
      preheader: ready ? t.readyPre : t.stampPre(left),
      brand: { name: s.salonName },
      hero: {
        eyebrow: esc(t.cardEyebrow),
        title: esc(ready ? t.readyTitle(first(c.customerName)) : t.stampTitle(first(c.customerName))),
        tone: ready ? "gold" : "brand",
        badge: ready ? "★" : "+1",
      },
      body:
        para(ready ? t.readyBody(s.rewardText) : t.stampLeft(c.stamps, s.stampsRequired, left, s.rewardText), { center: true }) +
        progressBlock(s, c) +
        button(liteCardUrl(c.token, s.locale), esc(t.viewCard), { variant: ready ? "gold" : "dark" }) +
        para(t.closing(s.salonName), { muted: true, center: true, mt: 18 }),
      footerExtra: footer(s),
    }),
  };
}

const ACCOUNT = {
  vi: {
    staffSubject: (s: string) => `Bạn có tài khoản quẹt thẻ tích điểm tại ${s}`,
    staffPre: "Đăng nhập để quét thẻ và đóng dấu cho khách.",
    staffEyebrow: "Tài khoản nhân viên",
    staffTitle: (name: string) => `Chào ${name}, bạn đã có tài khoản`,
    staffIntro: (s: string) => `${s} vừa tạo cho bạn tài khoản để quét thẻ tích điểm và đóng dấu cho khách.`,
    staffLogin: "Đăng nhập",
    staffHow: [
      { title: "Mở trang đăng nhập", body: "Bấm nút trên, chọn “Đăng nhập bằng mật khẩu”." },
      { title: "Nhập email và mật khẩu", body: "Email là địa chỉ bạn đang đọc thư này. Mật khẩu do chủ salon đưa cho bạn." },
      { title: "Quét thẻ cho khách", body: "Mở camera điện thoại quét mã QR trên thẻ của khách rồi bấm “Đóng 1 dấu”." },
    ],
    staffNote: "Quên mật khẩu? Nhờ chủ salon đặt lại trong mục Hồ sơ.",
    changedSubject: (s: string) => `Email đăng nhập thẻ tích điểm của ${s} đã đổi`,
    changedPre: "Email đăng nhập vừa được đổi.",
    changedTitle: "Email đăng nhập đã đổi",
    changedBody: (from: string, to: string) => `Email đăng nhập trang thẻ tích điểm vừa được đổi từ <strong>${esc(from)}</strong> sang <strong>${esc(to)}</strong>. Nếu không phải bạn đổi, hãy trả lời VaraaAi qua trang hỗ trợ ngay.`,
  },
  en: {
    staffSubject: (s: string) => `You have a loyalty card login at ${s}`,
    staffPre: "Sign in to scan cards and stamp visits.",
    staffEyebrow: "Staff login",
    staffTitle: (name: string) => `Hi ${name}, your login is ready`,
    staffIntro: (s: string) => `${s} created a login for you to scan loyalty cards and stamp customers' visits.`,
    staffLogin: "Sign in",
    staffHow: [
      { title: "Open the sign-in page", body: "Tap the button above and choose “Sign in with password”." },
      { title: "Enter your email and password", body: "The email is the one you're reading this at. The owner gives you the password." },
      { title: "Scan customers' cards", body: "Point your phone camera at the QR on the customer's card and tap “Add 1 stamp”." },
    ],
    staffNote: "Forgot the password? Ask the owner to reset it under Profile.",
    changedSubject: (s: string) => `${s}: your loyalty card sign-in email changed`,
    changedPre: "The sign-in email was just changed.",
    changedTitle: "Sign-in email changed",
    changedBody: (from: string, to: string) => `The sign-in email of your loyalty cards changed from <strong>${esc(from)}</strong> to <strong>${esc(to)}</strong>. If this wasn't you, contact VaraaAi through the support page right away.`,
  },
  fi: {
    staffSubject: (s: string) => `Sinulla on kirjautuminen kanta-asiakaskortteihin: ${s}`,
    staffPre: "Kirjaudu skannaamaan kortteja ja leimaamaan käyntejä.",
    staffEyebrow: "Henkilökunnan tunnus",
    staffTitle: (name: string) => `Hei ${name}, tunnuksesi on valmis`,
    staffIntro: (s: string) => `${s} loi sinulle tunnuksen kanta-asiakaskorttien skannaamiseen ja leimaamiseen.`,
    staffLogin: "Kirjaudu",
    staffHow: [
      { title: "Avaa kirjautuminen", body: "Napauta yllä olevaa painiketta ja valitse ”Kirjaudu salasanalla”." },
      { title: "Syötä sähköposti ja salasana", body: "Sähköposti on tämä osoite. Salasanan saat omistajalta." },
      { title: "Skannaa asiakkaiden kortit", body: "Osoita puhelimen kameralla asiakkaan QR-koodia ja napauta ”Lisää 1 leima”." },
    ],
    staffNote: "Unohtuiko salasana? Pyydä omistajaa vaihtamaan se kohdassa Profiili.",
    changedSubject: (s: string) => `${s}: kirjautumissähköposti vaihtui`,
    changedPre: "Kirjautumissähköposti vaihdettiin juuri.",
    changedTitle: "Kirjautumissähköposti vaihtui",
    changedBody: (from: string, to: string) => `Kanta-asiakaskorttien kirjautumissähköposti vaihtui osoitteesta <strong>${esc(from)}</strong> osoitteeseen <strong>${esc(to)}</strong>. Jos et tehnyt tätä, ota heti yhteyttä VaraaAi:hin tukisivun kautta.`,
  },
} satisfies Record<LiteLocale, unknown>;

/** To a new staff login: where to sign in (the password comes from the owner). */
export function liteStaffEmail(s: Salon, staff: { name: string }) {
  const a = ACCOUNT[liteLocale(s.locale)];
  const loginUrl = `${SITE_URL}${s.locale === "vi" ? "" : `/${s.locale}`}/loyalty-lite?login=1`;
  return {
    subject: a.staffSubject(s.salonName),
    html: emailLayout({
      locale: s.locale,
      preheader: a.staffPre,
      brand: { name: s.salonName },
      hero: { eyebrow: esc(a.staffEyebrow), title: esc(a.staffTitle(first(staff.name))), intro: esc(a.staffIntro(s.salonName)), tone: "gold", badge: "✦" },
      body: button(loginUrl, esc(a.staffLogin), { variant: "dark" }) + steps(a.staffHow) + notice(null, esc(a.staffNote), "info", 20),
    }),
  };
}

/** To the old address when the owner changes the sign-in email. */
export function liteEmailChangedEmail(s: Salon, from: string, to: string) {
  const a = ACCOUNT[liteLocale(s.locale)];
  return {
    subject: a.changedSubject(s.salonName),
    html: emailLayout({
      locale: s.locale,
      preheader: a.changedPre,
      brand: null,
      hero: { title: esc(a.changedTitle), tone: "alert" },
      body: para(a.changedBody(from, to)),
    }),
  };
}
