import { BLOCK3 } from '../data/plan';

export function Block3Detail() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="text-2xl font-bold">{BLOCK3.title}</h2>
        <p className="mt-1 text-black/50 dark:text-white/50">{BLOCK3.dateRange}</p>
        <p className="mt-3 max-w-2xl text-black/70 dark:text-white/70">{BLOCK3.summary}</p>
      </div>
      <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/5 p-4">
        <h3 className="mb-2 text-sm font-semibold text-emerald-400">How to run this phase</h3>
        <ul className="space-y-2 text-sm text-black/70 dark:text-white/70">
          {BLOCK3.points.map((p, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-emerald-400">•</span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
