import type { ReactNode } from 'react';
import type { Tag } from '../data/plan';
import type { Light } from '../lib/types';

export function PageHeader({ title, intro, children }: { title: string; intro?: string; children?: ReactNode }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {intro && <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-2">{intro}</p>}
      {children}
    </div>
  );
}

export function Card({ title, aside, children, className = '' }: { title?: ReactNode; aside?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-line bg-surface p-4 sm:p-5 ${className}`}>
      {(title || aside) && (
        <div className="mb-3 flex items-start justify-between gap-3">
          {title && <h3 className="text-base font-semibold">{title}</h3>}
          {aside}
        </div>
      )}
      {children}
    </section>
  );
}

export function Bullets({ items, ordered }: { items: ReactNode[]; ordered?: boolean }) {
  const Tag = ordered ? 'ol' : 'ul';
  return (
    <Tag className="space-y-2 text-sm leading-relaxed text-ink-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span className="w-4 shrink-0 text-ink-3">{ordered ? `${i + 1}.` : '•'}</span>
          <span>{it}</span>
        </li>
      ))}
    </Tag>
  );
}

export function Table({ head, rows, highlight }: { head: string[]; rows: ReactNode[][]; highlight?: number }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-3">
            {head.map((h) => (
              <th key={h} className="py-2 pr-4 font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-line/60 align-top ${highlight === i ? 'bg-accent/10' : ''}`}>
              {r.map((c, j) => (
                <td key={j} className={`py-2 pr-4 ${j === 0 ? 'font-medium' : 'text-ink-2'}`}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const TAG_STYLE: Record<Tag, [string, string]> = {
  rehab: ['Rehab', 'bg-teal-500/12 text-teal-700 dark:text-teal-300'],
  gym: ['Gym', 'bg-amber-500/15 text-amber-800 dark:text-amber-300'],
  bike: ['Bike', 'bg-sky-500/15 text-sky-800 dark:text-sky-300'],
  pool: ['Pool', 'bg-cyan-500/15 text-cyan-800 dark:text-cyan-300'],
  elliptical: ['Elliptical', 'bg-sky-500/10 text-sky-700 dark:text-sky-300'],
  walk: ['Walk', 'bg-slate-500/15 text-slate-700 dark:text-slate-300'],
  run: ['Run', 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'],
  sprint: ['Sprint', 'bg-rose-500/15 text-rose-800 dark:text-rose-300'],
  quality: ['Quality', 'bg-orange-500/15 text-orange-800 dark:text-orange-300'],
  kicking: ['Kicking', 'bg-lime-500/15 text-lime-800 dark:text-lime-300'],
  test: ['Test', 'bg-violet-500/15 text-violet-800 dark:text-violet-300'],
  race: ['Race', 'bg-fuchsia-500/20 text-fuchsia-800 dark:text-fuchsia-300'],
  rest: ['Rest', 'bg-slate-500/10 text-slate-600 dark:text-slate-400'],
};

export function TagBadge({ tag }: { tag: Tag }) {
  const [label, cls] = TAG_STYLE[tag];
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${cls}`}>{label}</span>;
}

export function Pill({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'accent' | 'amber' | 'violet' | 'fuchsia' | 'green' | 'red' }) {
  const cls = {
    neutral: 'bg-ink/5 text-ink-2',
    accent: 'bg-accent/15 text-accent',
    amber: 'bg-amber-500/15 text-amber-800 dark:text-amber-300',
    violet: 'bg-violet-500/15 text-violet-800 dark:text-violet-300',
    fuchsia: 'bg-fuchsia-500/15 text-fuchsia-800 dark:text-fuchsia-300',
    green: 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300',
    red: 'bg-rose-500/15 text-rose-800 dark:text-rose-300',
  }[tone];
  return <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${cls}`}>{children}</span>;
}

const LIGHT: Record<Light, { label: string; dot: string; text: string; icon: string }> = {
  green: { label: 'Green', dot: 'bg-emerald-500', text: 'text-emerald-700 dark:text-emerald-300', icon: '✓' },
  amber: { label: 'Amber', dot: 'bg-amber-500', text: 'text-amber-700 dark:text-amber-300', icon: '!' },
  red: { label: 'Red', dot: 'bg-rose-500', text: 'text-rose-700 dark:text-rose-300', icon: '✕' },
};

export function LightBadge({ light, compact }: { light: Light; compact?: boolean }) {
  const l = LIGHT[light];
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${l.text}`} title={l.label}>
      <span className={`flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white ${l.dot}`}>{l.icon}</span>
      {!compact && l.label}
    </span>
  );
}

export function Check({ checked, onChange, label, sub }: { checked: boolean; onChange: (v: boolean) => void; label: ReactNode; sub?: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-lg px-1 py-1.5 text-sm hover:bg-ink/[0.03]">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]" />
      <span className={checked ? 'text-ink-3 line-through' : 'text-ink-2'}>
        {label}
        {sub && <span className="block text-xs text-ink-3 no-underline">{sub}</span>}
      </span>
    </label>
  );
}

export function Field({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1 block text-xs font-medium text-ink-3">{label}</span>
      {children}
    </label>
  );
}

export const inputSmCls =
  'rounded-lg border border-line bg-bg px-2.5 py-1.5 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/25';

export const inputCls =
  'w-full rounded-lg border border-line bg-bg px-2.5 py-1.5 text-sm text-ink outline-none focus:border-accent focus:ring-2 focus:ring-accent/25';

export function NumInput({ value, onChange, step = 1, min, max, placeholder }: { value: number | null; onChange: (v: number | null) => void; step?: number; min?: number; max?: number; placeholder?: string }) {
  return (
    <input
      type="number"
      inputMode="decimal"
      className={inputCls}
      value={value ?? ''}
      step={step}
      min={min}
      max={max}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
    />
  );
}

export function Stepper({ steps, value, onChange, labels }: { steps: number; value: number; onChange: (v: number) => void; labels?: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: steps }, (_, i) => i + 1).map((s) => (
        <button
          key={s}
          onClick={() => onChange(s === value ? s - 1 : s)}
          className={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
            s < value ? 'border-accent/40 bg-accent/10 text-accent' : s === value ? 'border-accent bg-accent text-white' : 'border-line text-ink-3 hover:bg-ink/5'
          }`}
        >
          {labels?.[s - 1] ?? s}
        </button>
      ))}
    </div>
  );
}
