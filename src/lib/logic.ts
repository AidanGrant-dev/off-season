import { addDays } from '../data/plan';
import type { DailyLog, Light } from './types';

const AREAS = ['hamstring', 'ab', 'shoulder'] as const;

export function lightFor(log: DailyLog): Light {
  const scores = AREAS.flatMap((a) => [log[a].during, log[a].morning]).filter((n): n is number => n != null);
  const peak = scores.length ? Math.max(...scores) : 0;
  if (peak >= 5 || log.sharp || log.nerveWorse) return 'red';
  if (peak >= 4 || log.aboveBaseline) return 'amber';
  return 'green';
}

export function emptyLog(date: string): DailyLog {
  return {
    date,
    hamstring: { during: null, morning: null },
    ab: { during: null, morning: null },
    shoulder: { during: null, morning: null },
    sharp: false,
    nerve: false,
    nerveWorse: false,
    nerveWhere: '',
    aboveBaseline: false,
    weight: null,
    sleep: null,
    rhr: null,
    recovery: '',
    notes: '',
  };
}

export function formatTime(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.round(sec % 60);
  const mm = h ? String(m).padStart(2, '0') : String(m);
  return `${h ? h + ':' : ''}${mm}:${String(s).padStart(2, '0')}`;
}

export function parseTime(str: string): number | null {
  const parts = str.trim().split(':').map(Number);
  if (!parts.length || parts.some((p) => Number.isNaN(p))) return null;
  return parts.reduce((acc, p) => acc * 60 + p, 0);
}

/** 10k prediction from a 5k: time × 2.08. */
export function tenKFrom5k(sec5k: number) {
  const total = sec5k * 2.08;
  return { total, perKm: total / 10 };
}

/** Next-session load from a top set's RPE, per the plan's rules. */
export function nextLoad(weight: number, rpe: number, lowerBody: boolean): { load: number; advice: string } {
  const jump = lowerBody ? 5 : 2.5;
  if (rpe <= 7) return { load: weight + jump, advice: `RPE ≤ 7: add ${jump} kg` };
  if (rpe < 9) return { load: weight + 2.5, advice: 'RPE 8: repeat, or add 2.5 kg' };
  return { load: Math.round((weight * 0.95) / 2.5) * 2.5, advice: 'RPE 9+: hold, or drop ~5%' };
}

/** Epley-ish estimate of 3RM from a set, adjusted for reps in reserve. */
export function estimate3RM(weight: number, reps: number, rpe: number): number {
  const rir = Math.max(0, 10 - rpe);
  const oneRM = weight * (1 + (reps + rir) / 30);
  return Math.round(oneRM / (1 + 3 / 30) / 2.5) * 2.5;
}

/** Calendar 7-day trailing average (a day's value averages all entries in the previous 7 days). */
export function rollingAvg(points: { date: string; value: number }[], days = 7) {
  return points.map((p) => {
    const from = addDays(p.date, -(days - 1));
    const slice = points.filter((q) => q.date >= from && q.date <= p.date);
    return { date: p.date, value: slice.reduce((a, b) => a + b.value, 0) / slice.length };
  });
}
