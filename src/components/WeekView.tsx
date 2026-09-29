import type { Week } from '../data/plan';
import { PHASES } from '../data/content';
import { useCompleted, useLogs } from '../lib/hooks';
import { lightFor } from '../lib/logic';
import { DayCard } from './DayCard';
import { Pill } from './ui';

export function WeekFlags({ week }: { week: Week }) {
  return (
    <>
      {week.deload && <Pill tone="amber">Deload</Pill>}
      {week.test && <Pill tone="violet">Test week</Pill>}
      {week.race && <Pill tone="fuchsia">Race week</Pill>}
      {week.gate && <Pill tone="accent">Gate {week.gate}</Pill>}
    </>
  );
}

export function WeekView({ week }: { week: Week }) {
  const [completed] = useCompleted();
  const [logs] = useLogs();
  const phase = PHASES[week.phase - 1];
  const doneCount = week.days.filter((d) => completed[d.date]).length;
  const ambers = week.days.filter((d) => logs[d.date] && lightFor(logs[d.date]) !== 'green').length;

  return (
    <div>
      <div className="mb-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h2 className="text-2xl font-bold">Week {week.n}</h2>
          <span className="text-ink-3">{week.dates}</span>
          <WeekFlags week={week} />
        </div>
        <p className="mt-1 text-sm font-medium text-accent">
          Phase {phase.id} · {phase.name} — {phase.aim}
        </p>
      </div>

      <dl className="mb-4 grid gap-3 rounded-xl border border-line bg-surface p-4 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium text-ink-3">Run km (ceiling)</dt>
          <dd className="font-semibold">{week.runKm}</dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-ink-3">Gym</dt>
          <dd className="font-semibold">{week.gym}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium text-ink-3">Key sessions</dt>
          <dd className="text-ink-2">{week.keySessions}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium text-ink-3">Off-feet</dt>
          <dd className="text-ink-2">{week.offFeet}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs font-medium text-ink-3">Notes</dt>
          <dd className="text-ink-2">{week.notes}</dd>
        </div>
        <div className="flex flex-wrap items-center gap-3 sm:col-span-2">
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-ink/10">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${(doneCount / 7) * 100}%` }} />
          </div>
          <span className="text-xs text-ink-3">{doneCount}/7 done</span>
          {ambers >= 2 && <Pill tone="amber">{ambers} amber/red days → next week is a deload</Pill>}
        </div>
      </dl>

      <div className="space-y-3">
        {week.days.map((d) => (
          <DayCard key={d.date} day={d} />
        ))}
      </div>
    </div>
  );
}
