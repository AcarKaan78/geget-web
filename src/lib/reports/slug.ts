const TR_MAP: Record<string, string> = {
  ç: 'c', Ç: 'c',
  ğ: 'g', Ğ: 'g',
  ı: 'i', İ: 'i',
  ö: 'o', Ö: 'o',
  ş: 's', Ş: 's',
  ü: 'u', Ü: 'u',
};

export function slugify(input: string): string {
  const base = input
    .split('')
    .map((c) => TR_MAP[c] ?? c)
    .join('')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base || 'rapor';
}

export function uniqueSlug(base: string, taken: Set<string>): string {
  if (!taken.has(base)) return base;
  let i = 2;
  while (taken.has(`${base}-${i}`)) i++;
  return `${base}-${i}`;
}
