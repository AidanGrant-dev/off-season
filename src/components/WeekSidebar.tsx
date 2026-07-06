import { WEEKS } from '../data/plan';

interface Props {
  selected: number | 'block3';
  onSelect: (id: number | 'block3') => void;
  currentWeekId: number | null;
}

function phaseColor(phase: string): string {
  if (phase.includes('Regeneration')) return 'bg-slate-400';
  if (phase.includes('General Preparation')) return 'bg-sky-400';
  if (phase.includes('Deload')) return 'bg-amber-400';
  if (phase.includes('Christmas')) return 'bg-fuchsia-400';
  if (phase.includes('Bridge')) return 'bg-indigo-400';
  if (phase.includes('Speed')) return 'bg-rose-400';
  return 'bg-slate-400';
}

export function WeekSidebar({ selected, onSelect, currentWeekId }: Props) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
      {WEEKS.map((w) => (
        <button
          key={w.id}
          onClick={() => onSelect(w.id)}
          className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors lg:shrink lg:w-full ${
            selected === w.id
              ? 'border-indigo-400 bg-indigo-500/10 font-semibold'
              : 'border-black/10 hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.05]'
          }`}
        >
          <span className={`h-2 w-2 shrink-0 rounded-full ${phaseColor(w.phase)}`} />
          <span className="whitespace-nowrap">
            {w.label}
            {currentWeekId === w.id && <span className="ml-1 text-indigo-400">●</span>}
          </span>
          <span className="hidden whitespace-nowrap text-xs text-black/40 dark:text-white/40 lg:inline">{w.dateRange}</span>
          {w.isDeload && <span className="hidden text-xs text-amber-400 lg:inline">deload</span>}
          {w.isTestWeek && <span className="hidden text-xs text-violet-400 lg:inline">test</span>}
        </button>
      ))}
      <button
        onClick={() => onSelect('block3')}
        className={`flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors lg:shrink lg:w-full ${
          selected === 'block3'
            ? 'border-indigo-400 bg-indigo-500/10 font-semibold'
            : 'border-black/10 hover:bg-black/[0.03] dark:border-white/10 dark:hover:bg-white/[0.05]'
        }`}
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
        <span className="whitespace-nowrap">Block 3</span>
        <span className="hidden whitespace-nowrap text-xs text-black/40 dark:text-white/40 lg:inline">from Jan 12</span>
      </button>
    </nav>
  );
}
