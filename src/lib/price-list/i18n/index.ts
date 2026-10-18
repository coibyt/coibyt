import type { PriceListStrings } from "./types";
import ar from "./locales/ar";
import be from "./locales/be";
import bg from "./locales/bg";
import cs from "./locales/cs";
import da from "./locales/da";
import de from "./locales/de";
import en from "./locales/en";
import es from "./locales/es";
import et from "./locales/et";
import fi from "./locales/fi";
import fil from "./locales/fil";
import fr from "./locales/fr";
import he from "./locales/he";
import hi from "./locales/hi";
import hu from "./locales/hu";
import id from "./locales/id";
import it from "./locales/it";
import ja from "./locales/ja";
import km from "./locales/km";
import ko from "./locales/ko";
import lv from "./locales/lv";
import ms from "./locales/ms";
import nl from "./locales/nl";
import no from "./locales/no";
import pl from "./locales/pl";
import pt from "./locales/pt";
import ro from "./locales/ro";
import ru from "./locales/ru";
import sk from "./locales/sk";
import sv from "./locales/sv";
import th from "./locales/th";
import tr from "./locales/tr";
import uk from "./locales/uk";
import vi from "./locales/vi";
import zh from "./locales/zh";

/** Price-list tool strings for every site locale (server-side: the page
 * passes just the visitor's own locale down to the editor). */
export const PRICE_LIST_STRINGS: Record<string, PriceListStrings> = { ar, be, bg, cs, da, de, en, es, et, fi, fil, fr, he, hi, hu, id, it, ja, km, ko, lv, ms, nl, no, pl, pt, ro, ru, sk, sv, th, tr, uk, vi, zh, };

export function priceListStrings(locale: string): PriceListStrings {
  return PRICE_LIST_STRINGS[locale] ?? PRICE_LIST_STRINGS.en;
}
