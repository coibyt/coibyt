const COMBINING_MARK_START = 0x0300;
const COMBINING_MARK_END = 0x036f;

function stripCombiningMarks(input: string): string {
  return Array.from(input)
    .filter((ch) => {
      const code = ch.codePointAt(0) ?? 0;
      return code < COMBINING_MARK_START || code > COMBINING_MARK_END;
    })
    .join("");
}

export function slugify(input: string): string {
  return stripCombiningMarks(input.normalize("NFD"))
    .replace(/đ/gi, "d")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
