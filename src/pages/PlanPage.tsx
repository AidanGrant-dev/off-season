import { useState } from 'react';
import { WEEKS } from '../data/plan';
import { WeekSidebar } from '../components/WeekSidebar';
import { WeekDetail } from '../components/WeekDetail';
import { Block3Detail } from '../components/Block3Detail';
import { findCurrentWeek, daysUntil } from '../lib/dates';

export function PlanPage() {
  const currentWeek = findCurrentWeek(WEEKS);
  const [selected, setSelected] = useState<number | 'block3'>(currentWeek?.id ?? 1);

  const untilStart = daysUntil(WEEKS[0].days[0].date);

  return (
    <div>
      {!currentWeek && untilStart > 0 && (
        <div className="mb-5 rounded-xl border border-indigo-400/20 bg-indigo-500/5 px-4 py-3 text-sm">
          <span className="font-semibold text-indigo-400">{untilStart} days</span> until Block 0 begins ({WEEKS[0].dateRange}).
        </div>
      )}
      {!currentWeek && untilStart < 0 && (
        <div className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-500/5 px-4 py-3 text-sm">
          The 13-week plan has finished — the squad's own conditioning takes over from here. See <span className="font-semibold text-emerald-400">Block 3</span>.
        </div>
      )}
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="lg:w-64 lg:shrink-0">
          <WeekSidebar selected={selected} onSelect={setSelected} currentWeekId={currentWeek?.id ?? null} />
        </div>
        <div className="min-w-0 flex-1">
          {selected === 'block3' ? <Block3Detail /> : <WeekDetail week={WEEKS.find((w) => w.id === selected)!} />}
        </div>
      </div>
    </div>
  );
}
