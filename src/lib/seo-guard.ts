const FORBIDDEN = [
  /\(\d+\s*chars?\)/i, /\[?TODO\]?/i, /lorem ipsum/i, /placeholder/i,
  /as an AI language model/i, /^\s*$/, /\{\{.*\}\}/, /undefined|null/,
];

export const cleanTitle = (raw: string) => {
  return raw
    .replace(/(?:\s*[|—–-]\s*)?AdsVerse(?:\s+Blog)?(?:\s*[|—–-]\s*)?/gi, (match, offset, string) => {
      // If it's at the end, just remove it
      if (offset + match.length === string.length) return '';
      // If it's at the beginning, just remove it
      if (offset === 0) return '';
      // If it's in the middle, return a single separator
      return ' — ';
    })
    .replace(/\s*[|—–-]\s*$/i, '')
    .trim();
};

export function validateMeta(url: string, title: string, desc: string) {
  for (const p of FORBIDDEN) {
    if (p.test(title)) throw new Error(`[SEO] Forbidden pattern in title of ${url}: ${title}`);
    if (p.test(desc)) throw new Error(`[SEO] Forbidden pattern in description of ${url}: ${desc}`);
  }
  if (title.length > 60) console.warn(`[SEO] Title ${title.length} chars (>60): ${url}`);
  if (desc.length > 160) console.warn(`[SEO] Description ${desc.length} chars (>160): ${url}`);
  if (desc.length < 120) console.warn(`[SEO] Description ${desc.length} chars (<120): ${url}`);
  if ((title.match(/AdsVerse/gi) || []).length > 1) throw new Error(`[SEO] Duplicate brand in title: ${url}`);
}
