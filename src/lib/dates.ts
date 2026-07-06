import type { WeekPlan } from '../data/plan';

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function formatLong(dateISO: string): string {
  const dt = new Date(dateISO + 'T00:00:00');
  return dt.toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
}

export function daysUntil(dateISO: string): number {
  const today = new Date(todayISO() + 'T00:00:00');
  const target = new Date(dateISO + 'T00:00:00');
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

/** Returns the week whose date range contains today, or null if outside the plan. */
export function findCurrentWeek(weeks: WeekPlan[]): WeekPlan | null {
  const today = todayISO();
  for (const w of weeks) {
    const first = w.days[0].date;
    const last = w.days[w.days.length - 1].date;
    if (today >= first && today <= last) return w;
  }
  return null;
}
