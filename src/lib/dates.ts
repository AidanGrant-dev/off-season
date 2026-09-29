export function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

function parse(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDay(iso: string, opts: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' }): string {
  return parse(iso).toLocaleDateString('en-IE', opts);
}

export function daysBetween(fromISO: string, toISO: string): number {
  return Math.round((parse(toISO).getTime() - parse(fromISO).getTime()) / 86400000);
}
