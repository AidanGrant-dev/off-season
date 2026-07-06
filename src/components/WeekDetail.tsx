import type { WeekPlan } from '../data/plan';
import { DayCard } from './DayCard';
import { useCompletedSessions } from '../lib/storage';

export function WeekDetail({ week }: { week: WeekPlan }) {
  const [completed, setCompleted] = useCompletedSessions();
  const doneCount = week.days.filter((day) => completed[day.date]).length;

  return (
    <div>
      <div className="mb-5">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-2xl font-bold">{week.label}</h2>
          <span className="text-black/50 dark:text-white/50">{week.dateRange}</span>
          {week.isDeload && <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-400 ring-1 ring-inset ring-amber-500/30">Deload</span>}
          {week.isFlexWeek && <span className="rounded-full bg-fuchsia-500/15 px-2 py-0.5 text-xs font-semibold text-fuchsia-400 ring-1 ring-inset ring-fuchsia-500/30">Flex week</span>}
          {week.isTestWeek && <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-xs font-semibold text-violet-400 ring-1 ring-inset ring-violet-500/30">Test week</span>}
        </div>
        <p className="mt-1 text-sm font-medium text-indigo-400">{week.phase}</p>
        <p className="mt-2 max-w-2xl text-black/70 dark:text-white/70">{week.emphasis}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
          <div>
            <span className="text-black/45 dark:text-white/45">Run volume: </span>
            <span className="font-semibold">{week.runKm} km</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(doneCount / week.days.length) * 100}%` }} />
            </div>
            <span className="text-black/45 dark:text-white/45">{doneCount}/{week.days.length} logged</span>
          </div>
        </div>
      </div>

      {week.progressionNotes.length > 0 && (
        <div className="mb-6 rounded-xl border border-indigo-400/20 bg-indigo-500/5 p-4">
          <h3 className="mb-2 text-sm font-semibold text-indigo-400">This week's progression</h3>
          <ul className="space-y-1.5 text-sm text-black/70 dark:text-white/70">
            {week.progressionNotes.map((n, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-indigo-400">•</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-3">
        {week.days.map((day) => (
          <DayCard
            key={day.date}
            session={day}
            done={!!completed[day.date]}
            onToggle={() => setCompleted((prev) => ({ ...prev, [day.date]: !prev[day.date] }))}
          />
        ))}
      </div>
    </div>
  );
}
