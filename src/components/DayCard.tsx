import type { DaySession } from '../data/plan';
import { TagBadge } from './TagBadge';
import { formatLong, todayISO } from '../lib/dates';

interface Props {
  session: DaySession;
  done: boolean;
  onToggle: () => void;
}

export function DayCard({ session, done, onToggle }: Props) {
  const isToday = session.date === todayISO();

  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        isToday
          ? 'border-indigo-400/60 bg-indigo-500/5 dark:border-indigo-400/40'
          : 'border-black/10 bg-white dark:border-white/10 dark:bg-white/[0.03]'
      } ${done ? 'opacity-60' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-black/50 dark:text-white/50">
            <span className="font-semibold text-black/70 dark:text-white/70">{session.weekday}</span>
            <span>{formatLong(session.date)}</span>
            <span className={`rounded px-1.5 py-0.5 ${session.dayType === 'free' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
              {session.dayType === 'free' ? 'Free day' : 'Work day'}
            </span>
            {isToday && <span className="rounded bg-indigo-500 px-1.5 py-0.5 font-semibold text-white">Today</span>}
          </div>
          <h3 className={`mt-1 text-base font-semibold ${done ? 'line-through' : ''}`}>{session.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-black/65 dark:text-white/65">{session.detail}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {session.tags.map((t) => (
              <TagBadge key={t} tag={t} />
            ))}
          </div>
        </div>
        <button
          onClick={onToggle}
          aria-label={done ? 'Mark not done' : 'Mark done'}
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-sm transition-colors ${
            done
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-black/20 text-transparent hover:border-black/40 dark:border-white/25 dark:hover:border-white/50'
          }`}
        >
          ✓
        </button>
      </div>
    </div>
  );
}
