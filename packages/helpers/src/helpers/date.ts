export function formatDate(dateRaw?: string | Date, lang?: 'ru' | 'en'): string {
  if (!dateRaw) return '-';

  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateRaw));
}

export function formatDateTime(dateRaw?: string | Date, lang?: 'ru' | 'en'): string {
  if (!dateRaw) return '-';

  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(dateRaw));
}

export function addZero(value: number) {
  return value.toString().length > 1 ? `${value}` : `0${value}`;
}

export function formatDuration(duration?: number) {
  if (!duration) return '-';

  const minutes = Math.floor(duration / 60);
  const seconds = duration - minutes * 60;

  return `${minutes ? `${minutes} мин. ` : ``}${addZero(seconds)} сек.`;
}

export function subtractDates(
  dateRaw1?: string | Date,
  dateRaw2?: string | Date,
  isRawResult?: boolean
): string | number {
  if (!dateRaw1 || !dateRaw2) return '-';

  const date1 = new Date(dateRaw1);
  const date2 = new Date(dateRaw2);

  const duration = Math.floor(((date1 as unknown as number) - (date2 as unknown as number)) / 1000);

  return isRawResult ? duration : formatDuration(duration);
}
