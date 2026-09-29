import { useEffect, useRef, useState } from 'react';
import { PLAN_END, PLAN_START } from '../data/plan';
import { START_WEIGHT, TARGET_WEIGHT } from '../data/content';
import { daysBetween, formatDay } from '../lib/dates';
import { rollingAvg } from '../lib/logic';

// Planned path: maintenance W1–2, deficit from W3 (5 Oct) to ~79 kg at W12 (7 Dec), then maintenance.
const PLAN_PATH = [
  { date: PLAN_START, value: START_WEIGHT },
  { date: '2026-10-05', value: START_WEIGHT },
  { date: '2026-12-07', value: TARGET_WEIGHT },
  { date: PLAN_END, value: TARGET_WEIGHT },
];

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(600);
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([e]) => setW(e.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export function WeightChart({ points }: { points: { date: string; value: number }[] }) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const H = 220;
  const m = { t: 12, r: 12, b: 26, l: 36 };
  const iw = Math.max(100, width - m.l - m.r);
  const ih = H - m.t - m.b;
  const span = daysBetween(PLAN_START, PLAN_END);

  const avg = rollingAvg(points);
  const vals = [...points.map((p) => p.value), START_WEIGHT, TARGET_WEIGHT];
  const lo = Math.floor(Math.min(...vals) - 0.5);
  const hi = Math.ceil(Math.max(...vals) + 0.5);
  const x = (d: string) => m.l + (daysBetween(PLAN_START, d) / span) * iw;
  const y = (v: number) => m.t + ((hi - v) / (hi - lo)) * ih;
  const line = (ps: { date: string; value: number }[]) => ps.map((p, i) => `${i ? 'L' : 'M'}${x(p.date).toFixed(1)},${y(p.value).toFixed(1)}`).join('');

  const ticks: number[] = [];
  const stepKg = hi - lo > 6 ? 2 : 1;
  for (let v = lo; v <= hi; v += stepKg) ticks.push(v);
  const months = ['2026-10-01', '2026-11-01', '2026-12-01', '2027-01-01'];

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!points.length) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    let best = 0;
    points.forEach((p, i) => {
      if (Math.abs(x(p.date) - px) < Math.abs(x(points[best].date) - px)) best = i;
    });
    setHover(best);
  }

  const hp = hover != null ? points[hover] : null;

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-4 text-xs text-ink-3">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-ink-3/60" />Daily</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded bg-accent" />7-day average</span>
        <span className="flex items-center gap-1.5"><span className="w-4 border-t-2 border-dashed border-ink-3" />Planned path (83 → 79 kg by W12)</span>
      </div>
      <div ref={ref} className="relative">
        <svg width={width} height={H} onPointerMove={onMove} onPointerLeave={() => setHover(null)} role="img" aria-label="Morning weight over the plan">
          {ticks.map((t) => (
            <g key={t}>
              <line x1={m.l} x2={m.l + iw} y1={y(t)} y2={y(t)} stroke="var(--line)" />
              <text x={m.l - 6} y={y(t)} dy="0.32em" textAnchor="end" fontSize="11" fill="var(--ink-3)">{t}</text>
            </g>
          ))}
          {months.map((d) => (
            <text key={d} x={x(d)} y={H - 6} textAnchor="middle" fontSize="11" fill="var(--ink-3)">{formatDay(d, { month: 'short' })}</text>
          ))}
          <path d={line(PLAN_PATH)} fill="none" stroke="var(--ink-3)" strokeWidth={1.5} strokeDasharray="5 4" />
          {points.map((p) => (
            <circle key={p.date} cx={x(p.date)} cy={y(p.value)} r={3} fill="var(--ink-3)" fillOpacity={0.55} />
          ))}
          {avg.length > 1 && <path d={line(avg)} fill="none" stroke="var(--accent)" strokeWidth={2} strokeLinejoin="round" />}
          {hp && (
            <g>
              <line x1={x(hp.date)} x2={x(hp.date)} y1={m.t} y2={m.t + ih} stroke="var(--ink-3)" strokeOpacity={0.5} />
              <circle cx={x(hp.date)} cy={y(avg[hover!].value)} r={5} fill="var(--accent)" stroke="var(--surface)" strokeWidth={2} />
            </g>
          )}
        </svg>
        {hp && (
          <div
            className="pointer-events-none absolute top-2 rounded-lg border border-line bg-surface px-3 py-2 text-xs shadow-lg"
            style={{ left: Math.min(Math.max(x(hp.date) - 70, 0), width - 150) }}
          >
            <div className="font-semibold">{formatDay(hp.date)}</div>
            <div className="text-ink-2">Weight {hp.value.toFixed(1)} kg</div>
            <div className="text-ink-2">7-day avg {avg[hover!].value.toFixed(1)} kg</div>
          </div>
        )}
      </div>
    </div>
  );
}
