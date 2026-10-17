// One design, two renderers: the dashboard's live preview (browser) and the
// PNG emailed to the customer (next/og / satori on the server). So: inline
// styles only, every multi-child box is display:flex (satori requires it),
// no hooks, no Tailwind, no CSS variables.

export const GIFT_CARD_WIDTH = 1200;
export const GIFT_CARD_HEIGHT = 750;

export interface GiftCardDesignProps {
  salonName: string;
  title: string;
  serviceName: string;
  amountText: string;
  discountPercent: number;
  maxUses: number;
  validUntilText: string | null;
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string | null;
  message: string | null;
  code: string;
  qrDataUrl: string | null;
  locale: string;
  fontFamily: string;
}

const LABELS: Record<
  "vi" | "en" | "fi",
  {
    giftCard: string;
    value: string;
    to: string;
    discount: (p: number) => string;
    uses: (n: number) => string;
    validUntil: string;
    code: string;
    scan: string;
  }
> = {
  vi: {
    giftCard: "THẺ QUÀ TẶNG",
    value: "Giá trị",
    to: "Dành tặng",
    discount: (p) => `Giảm ${p}%`,
    uses: (n) => `${n} lần sử dụng`,
    validUntil: "Hiệu lực đến",
    code: "MÃ THẺ",
    scan: "Đưa mã này cho salon khi đến",
  },
  en: {
    giftCard: "GIFT CARD",
    value: "Value",
    to: "Gifted to",
    discount: (p) => `${p}% off`,
    uses: (n) => `${n} ${n === 1 ? "use" : "uses"}`,
    validUntil: "Valid until",
    code: "CARD CODE",
    scan: "Show this code at the salon",
  },
  fi: {
    giftCard: "LAHJAKORTTI",
    value: "Arvo",
    to: "Saaja",
    discount: (p) => `-${p} %`,
    uses: (n) => `${n} käyttökertaa`,
    validUntil: "Voimassa",
    code: "KORTTIKOODI",
    scan: "Näytä koodi salongissa",
  },
};

function Sparkle({ size, top, left, opacity }: { size: number; top: number; left: number; opacity: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={{ position: "absolute", top, left, opacity }}
    >
      <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" fill="#ffd9c9" />
    </svg>
  );
}

export function GiftCardDesign(p: GiftCardDesignProps) {
  const t = LABELS[(p.locale as "vi" | "en" | "fi")] ?? LABELS.en;
  const contact = [p.recipientEmail, p.recipientPhone].filter(Boolean).join("  ·  ");
  const details = [p.serviceName, t.discount(p.discountPercent), t.uses(p.maxUses)].join("  ·  ");

  return (
    <div
      style={{
        width: GIFT_CARD_WIDTH,
        height: GIFT_CARD_HEIGHT,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        borderRadius: 48,
        background: "linear-gradient(135deg, #1f182d 0%, #40325c 45%, #624f89 100%)",
        color: "#ffffff",
        fontFamily: p.fontFamily,
      }}
    >
      {/* Glows */}
      <div
        style={{
          position: "absolute",
          top: -220,
          left: 360,
          width: 620,
          height: 620,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(240,133,95,0.45) 0%, rgba(240,133,95,0) 70%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -260,
          left: -160,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background: "radial-gradient(circle, rgba(183,164,220,0.35) 0%, rgba(183,164,220,0) 70%)",
          display: "flex",
        }}
      />
      {/* Fine border inset */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          width: GIFT_CARD_WIDTH - 40,
          height: GIFT_CARD_HEIGHT - 40,
          borderRadius: 34,
          border: "2px solid rgba(255,217,201,0.28)",
          display: "flex",
        }}
      />

      {/* Ribbon + bow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 770,
          width: 36,
          height: GIFT_CARD_HEIGHT,
          background: "linear-gradient(180deg, #ffd9c9 0%, #f0855f 55%, #ec6a47 100%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 694,
          width: 96,
          height: 56,
          borderRadius: 9999,
          border: "12px solid #ffbfa3",
          transform: "rotate(-24deg)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 786,
          width: 96,
          height: 56,
          borderRadius: 9999,
          border: "12px solid #ffbfa3",
          transform: "rotate(24deg)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 768,
          width: 40,
          height: 40,
          borderRadius: 14,
          background: "#f0855f",
          display: "flex",
        }}
      />

      <Sparkle size={30} top={92} left={640} opacity={0.9} />
      <Sparkle size={16} top={150} left={700} opacity={0.6} />
      <Sparkle size={20} top={640} left={690} opacity={0.5} />
      <Sparkle size={14} top={84} left={1120} opacity={0.6} />

      {/* Left: who and what */}
      <div
        style={{
          position: "absolute",
          top: 64,
          left: 72,
          width: 640,
          height: GIFT_CARD_HEIGHT - 128,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                padding: "8px 18px",
                borderRadius: 9999,
                background: "rgba(255,217,201,0.16)",
                color: "#ffd9c9",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 5,
              }}
            >
              {t.giftCard}
            </div>
            <div style={{ display: "flex", marginLeft: 18, fontSize: 22, letterSpacing: 3, color: "rgba(255,255,255,0.75)" }}>
              {p.salonName.toUpperCase()}
            </div>
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 52, fontWeight: 700, lineHeight: 1.1 }}>{p.title}</div>
          <div style={{ display: "flex", marginTop: 14, fontSize: 24, color: "rgba(255,255,255,0.72)" }}>{details}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 3, color: "rgba(255,255,255,0.6)" }}>
            {t.value.toUpperCase()}
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, color: "#ffd9c9", lineHeight: 1 }}>{p.amountText}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 18, letterSpacing: 3, color: "rgba(255,255,255,0.6)" }}>
            {t.to.toUpperCase()}
          </div>
          <div style={{ display: "flex", marginTop: 4, fontSize: 40, fontWeight: 700 }}>{p.recipientName || "—"}</div>
          {contact ? (
            <div style={{ display: "flex", marginTop: 6, fontSize: 21, color: "rgba(255,255,255,0.75)" }}>{contact}</div>
          ) : null}
          {p.message ? (
            <div
              style={{
                display: "flex",
                marginTop: 14,
                padding: "12px 18px",
                borderRadius: 16,
                background: "rgba(255,255,255,0.09)",
                borderLeft: "4px solid #f0855f",
                fontSize: 21,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.9)",
                maxWidth: 620,
              }}
            >
              {`“${p.message}”`}
            </div>
          ) : null}
        </div>
      </div>

      {/* Right: QR + code */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 850,
          width: 296,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 296,
            padding: 22,
            borderRadius: 30,
            background: "#ffffff",
            boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          }}
        >
          {p.qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.qrDataUrl} width={252} height={252} alt="" style={{ display: "flex" }} />
          ) : (
            <div
              style={{
                display: "flex",
                width: 252,
                height: 252,
                borderRadius: 16,
                alignItems: "center",
                justifyContent: "center",
                background: "repeating-linear-gradient(45deg, #f2f5f5, #f2f5f5 12px, #e6ebeb 12px, #e6ebeb 24px)",
                color: "#5b6b6c",
                fontSize: 40,
                fontWeight: 700,
              }}
            >
              QR
            </div>
          )}
          <div style={{ display: "flex", marginTop: 14, fontSize: 15, letterSpacing: 3, color: "#5b6b6c" }}>{t.code}</div>
          <div style={{ display: "flex", marginTop: 4, fontSize: 30, fontWeight: 700, letterSpacing: 4, color: "#1f182d" }}>
            {p.code}
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 22, fontSize: 18, color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
          {t.scan}
        </div>
        {p.validUntilText ? (
          <div
            style={{
              display: "flex",
              marginTop: 14,
              padding: "8px 18px",
              borderRadius: 9999,
              background: "rgba(255,255,255,0.12)",
              fontSize: 19,
              color: "#ffffff",
            }}
          >
            {`${t.validUntil} ${p.validUntilText}`}
          </div>
        ) : null}
      </div>
    </div>
  );
}
