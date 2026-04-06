/**
 * Merges class names, filtering out falsy values.
 * Lightweight alternative to clsx/classnames.
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

/**
 * Formats a date string (YYYY-MM or YYYY-MM-DD) according to the given locale.
 * Returns a human-readable month/year or full date string.
 */
export function formatDate(
  dateString: string,
  locale: string = 'tr-TR',
  options?: Intl.DateTimeFormatOptions
): string {
  const parts = dateString.split('-');
  const year = parseInt(parts[0], 10);
  const month = parts[1] ? parseInt(parts[1], 10) - 1 : 0;
  const day = parts[2] ? parseInt(parts[2], 10) : 1;

  const date = new Date(year, month, day);

  const defaultOptions: Intl.DateTimeFormatOptions =
    parts.length === 2
      ? { year: 'numeric', month: 'long' }
      : { year: 'numeric', month: 'long', day: 'numeric' };

  return new Intl.DateTimeFormat(locale, options ?? defaultOptions).format(date);
}
