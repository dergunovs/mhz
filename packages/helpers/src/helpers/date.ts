export function formatDate(dateRaw?: string | Date): string {
  if (!dateRaw) return '-';

  return new Intl.DateTimeFormat().format(new Date(dateRaw));
}
