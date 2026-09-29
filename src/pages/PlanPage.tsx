import { useState } from 'react';
import { WEEKS, weekForDate } from '../data/plan';
import { PHASES, WEEKLY_INTRO, WEEKLY_RULES } from '../data/content';
import { todayISO } from '../lib/dates';
import { useCompleted } from '../lib/hooks';
import { WeekView } from '../components/WeekView';
import { Bullets, Card } from '../components/ui';

const PHASE_DOT = ['', 'bg-teal-500', 'bg-sky-500', 'bg-emerald-500', 'bg-orange-500', 'bg-fuchsia-500'];

export function PlanPage() {
  const current = weekForDate(todayISO());
  const [selected, setSelected] = useState(current?.n ?? (todayISO() > WEEKS[18].end ? 19 : 1));
  const [completed] = useCompleted();
  const week = WEEKS[selected - 1];

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="lg:w-60 lg:shrink-0">
        <nav className="-mx-4 flex gap-1.5 overflow-x-auto px-4 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0" aria-label="Weeks">
          {WEEKS.map((w) => {
            const done = w.days.filter((d) => completed[d.date]).length;
            return (
              <button
                key={w.n}
                onClick={() => setSelected(w.n)}
                className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors lg:w-full ${
                  selected === w.n ? 'border-accent bg-accent/10 font-semibold' : 'border-line bg-surface hover:bg-ink/5'
                }`}
              >
                <span className={`h-2 w-2 shrink-0 rounded-full ${PHASE_DOT[w.phase]}`} />
                <span className="whitespace-nowrap">
                  W{w.n}
                  {current?.n === w.n && <span className="ml-1 text-accent">●</span>}
                </span>
                <span className="hidden flex-1 whitespace-nowrap text-xs text-ink-3 lg:inline">{w.dates}</span>
                <span className="hidden text-xs text-ink-3 lg:inline">{done ? `${done}/7` : ''}</span>
              </button>
            );
          })}
        </nav>
        <div className="mt-4 hidden space-y-1 text-xs text-ink-3 lg:block">
          {PHASES.map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${PHASE_DOT[p.id]}`} />
              {p.id}. {p.name}
            </div>
          ))}
        </div>
      </aside>
      <div className="min-w-0 flex-1 space-y-6">
        <WeekView week={week} />
        <Card title="Weekly rules">
          <p className="mb-3 text-sm text-ink-2">{WEEKLY_INTRO}</p>
          <Bullets items={WEEKLY_RULES} />
        </Card>
      </div>
    </div>
  );
}
