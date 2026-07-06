import type { SessionTag } from '../data/plan';

const TAG_STYLES: Record<SessionTag, string> = {
  aerobic: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  easy: 'bg-sky-500/10 text-sky-400 ring-sky-500/20',
  strength: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  speed: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
  accel: 'bg-orange-500/15 text-orange-300 ring-orange-500/30',
  plyo: 'bg-fuchsia-500/15 text-fuchsia-300 ring-fuchsia-500/30',
  vo2: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  threshold: 'bg-teal-500/15 text-teal-300 ring-teal-500/30',
  rsa: 'bg-red-500/15 text-red-300 ring-red-500/30',
  rest: 'bg-slate-500/15 text-slate-300 ring-slate-500/30',
  test: 'bg-violet-500/15 text-violet-300 ring-violet-500/30',
  team: 'bg-indigo-500/15 text-indigo-300 ring-indigo-500/30',
};

const TAG_LABELS: Record<SessionTag, string> = {
  aerobic: 'Aerobic',
  easy: 'Easy',
  strength: 'Strength',
  speed: 'Max Velocity',
  accel: 'Acceleration',
  plyo: 'Plyometrics',
  vo2: 'VO₂',
  threshold: 'Threshold',
  rsa: 'RSA / Special Endurance',
  rest: 'Rest',
  test: 'Testing',
  team: 'Team Format',
};

export function TagBadge({ tag }: { tag: SessionTag }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${TAG_STYLES[tag]}`}>
      {TAG_LABELS[tag]}
    </span>
  );
}
