export function formatDate(dateRaw?: string | Date): string {
  if (!dateRaw) return '-';

  return new Intl.DateTimeFormat().format(new Date(dateRaw));
}

export function formatDateTime(dateRaw?: string | Date): string {
  if (!dateRaw) return '-';

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(new Date(dateRaw));
}
