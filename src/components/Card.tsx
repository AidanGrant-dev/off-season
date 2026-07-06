import type { ReactNode } from 'react';

export function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-white/[0.03]">
      {title && <h3 className="mb-3 text-base font-semibold text-indigo-400">{title}</h3>}
      {children}
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 text-sm leading-relaxed text-black/70 dark:text-white/70">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-black/30 dark:text-white/30">•</span>
          <span dangerouslySetInnerHTML={{ __html: it }} />
        </li>
      ))}
    </ul>
  );
}
