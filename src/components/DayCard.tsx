import type { Day } from '../data/plan';
import { formatDay, todayISO } from '../lib/dates';
import { useCompleted, useLogs } from '../lib/hooks';
import { lightFor } from '../lib/logic';
import { LightBadge, TagBadge } from './ui';

export function DayCard({ day, expanded = true }: { day: Day; expanded?: boolean }) {
  const [completed, setCompleted] = useCompleted();
  const [logs] = useLogs();
  const done = !!completed[day.date];
  const isToday = day.date === todayISO();
  const log = logs[day.date];

  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        isToday ? 'border-accent/60 bg-accent/[0.06]' : 'border-line bg-surface'
      } ${done ? 'opacity-70' : ''}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-ink-3">
            <span className="font-semibold text-ink-2">{formatDay(day.date)}</span>
            <span>{day.off ? 'Day off' : 'Work evening'}</span>
            {isToday && <span className="rounded bg-accent px-1.5 py-0.5 font-semibold text-white">Today</span>}
            {log && <LightBadge light={lightFor(log)} />}
          </div>
          <h4 className={`mt-1 font-semibold leading-snug ${done ? 'line-through decoration-ink-3' : ''}`}>{day.title}</h4>
          {expanded && day.detail && <p className="mt-1 text-sm leading-relaxed text-ink-2">{day.detail}</p>}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {day.tags.map((t) => (
              <TagBadge key={t} tag={t} />
            ))}
          </div>
        </div>
        <button
          onClick={() => setCompleted((prev) => ({ ...prev, [day.date]: !prev[day.date] }))}
          aria-label={done ? 'Mark not done' : 'Mark done'}
          aria-pressed={done}
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-base transition-colors ${
            done ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-line text-transparent hover:border-ink-3 hover:text-ink-3'
          }`}
        >
          ✓
        </button>
      </div>
    </div>
  );
}
