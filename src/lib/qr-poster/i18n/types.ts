import type { PriceListSeo } from "@/lib/price-list/i18n/types";

/** Poster-only editor strings. Labels the two tools share (salon name, logo,
 * languages, formats, downloads…) come from the price-list strings. */
export interface PosterUi {
  sLink: string;
  sContent: string;
  headline: string;
  headlineHint: string;
  extraLines: string;
  offer: string;
  offerPh: string;
  hours: string;
  hoursPh: string;
  wifi: string;
  wifiPh: string;
  reviewToggle: string;
  reviewPh: string;
  reviewHint: string;
  qrLogo: string;
  qrLogoHint: string;
  varaaaiLinkHint: string;
  needLink: string;
  tPastel: string;
  tSeasonal: string;
  season: string;
  sChristmas: string;
  sBlackFriday: string;
  sTet: string;
  fA6: string;
  fTent: string;
  fSticker: string;
  fStory: string;
  stickerSheet: string;
  tentHint: string;
  ctaTitle: string;
  ctaBody: string;
}

export interface PosterStrings {
  ui: PosterUi;
  seo: PriceListSeo;
}
