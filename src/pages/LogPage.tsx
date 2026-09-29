import { useState } from 'react';
import { WEEKS, addDays, weekForDate } from '../data/plan';
import { DELOAD_RULE, HR_NOTES, HR_TARGETS, TRAFFIC_LIGHTS } from '../data/content';
import { formatDay, todayISO } from '../lib/dates';
import { useHrWeeks, useLogs } from '../lib/hooks';
import { emptyLog, lightFor, rollingAvg } from '../lib/logic';
import type { DailyLog, HrWeek, Light } from '../lib/types';
import { WeightChart } from '../components/WeightChart';
import { Bullets, Card, Check, Field, LightBadge, NumInput, PageHeader, Pill, Table, inputCls, inputSmCls } from '../components/ui';

const AREAS = [
  { key: 'hamstring', label: 'Hamstring' },
  { key: 'ab', label: 'Abdomen' },
  { key: 'shoulder', label: 'Shoulder' },
] as const;

export function LogPage() {
  const [date, setDate] = useState(todayISO());
  const [logs, setLogs] = useLogs();
  const log = logs[date] ?? emptyLog(date);
  const exists = !!logs[date];

  const update = (patch: Partial<DailyLog>) => setLogs((prev) => ({ ...prev, [date]: { ...(prev[date] ?? emptyLog(date)), ...patch } }));
  const remove = () =>
    setLogs((prev) => {
      const next = { ...prev };
      delete next[date];
      return next;
    });

  const sorted = Object.values(logs).sort((a, b) => a.date.localeCompare(b.date));
  const weights = sorted.filter((l) => l.weight != null).map((l) => ({ date: l.date, value: l.weight! }));
  const latestAvg = weights.length ? rollingAvg(weights).at(-1)!.value : null;
  const recent = sorted.slice(-14).reverse();

  return (
    <div className="space-y-6">
      <PageHeader title="Daily log" intro="Log three pain scores and any nerve symptoms every day. The traffic light decides whether you progress, repeat or step back — each gate still needs your physio’s sign-off." />

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <Card
          title={
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-line px-2 py-0.5 text-sm hover:bg-ink/5" onClick={() => setDate(addDays(date, -1))} aria-label="Previous day">‹</button>
              <input type="date" className={inputSmCls} value={date} onChange={(e) => e.target.value && setDate(e.target.value)} />
              <button className="rounded-md border border-line px-2 py-0.5 text-sm hover:bg-ink/5" onClick={() => setDate(addDays(date, 1))} aria-label="Next day">›</button>
            </div>
          }
          aside={exists ? <LightBadge light={lightFor(log)} /> : <span className="text-xs text-ink-3">Not logged</span>}
        >
          <p className="mb-3 text-xs text-ink-3">Pain 0–10. “During” = worst during rehab/training; “Morning” = next morning. Changes save automatically.</p>
          <div className="grid grid-cols-[1fr_5rem_5rem] items-center gap-x-3 gap-y-2 text-sm">
            <span />
            <span className="text-xs font-medium text-ink-3">During</span>
            <span className="text-xs font-medium text-ink-3">Morning</span>
            {AREAS.map((a) => (
              <Row key={a.key} label={a.label} during={log[a.key].during} morning={log[a.key].morning} onChange={(v) => update({ [a.key]: { ...log[a.key], ...v } })} />
            ))}
          </div>

          <div className="mt-4 grid gap-1 sm:grid-cols-2">
            <Check checked={log.sharp} onChange={(v) => update({ sharp: v })} label="Sharp pain" />
            <Check checked={log.aboveBaseline} onChange={(v) => update({ aboveBaseline: v })} label="Still above baseline this morning" />
            <Check checked={log.nerve} onChange={(v) => update({ nerve: v })} label="Nerve symptoms (tingling, burning, below knee, sitting)" />
            <Check checked={log.nerveWorse} onChange={(v) => update({ nerveWorse: v, nerve: v || log.nerve })} label="Nerve symptoms new or worse" />
          </div>
          {log.nerve && (
            <Field label="Where?" className="mt-2">
              <input className={inputCls} value={log.nerveWhere} onChange={(e) => update({ nerveWhere: e.target.value })} placeholder="e.g. back of thigh when sitting" />
            </Field>
          )}

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Field label="Morning weight (kg)"><NumInput value={log.weight} step={0.1} onChange={(v) => update({ weight: v })} /></Field>
            <Field label="Sleep (h)"><NumInput value={log.sleep} step={0.25} onChange={(v) => update({ sleep: v })} /></Field>
            <Field label="Resting HR"><NumInput value={log.rhr} onChange={(v) => update({ rhr: v })} /></Field>
            <Field label="Whoop recovery">
              <select className={inputCls} value={log.recovery} onChange={(e) => update({ recovery: e.target.value as DailyLog['recovery'] })}>
                <option value="">—</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
              </select>
            </Field>
          </div>
          <Field label="Notes" className="mt-3">
            <textarea className={inputCls} rows={2} value={log.notes} onChange={(e) => update({ notes: e.target.value })} />
          </Field>
          {exists && (
            <button onClick={remove} className="mt-3 text-xs text-ink-3 hover:text-rose-500">Delete this day’s log</button>
          )}
        </Card>

        <div className="space-y-4">
          <Card title="Traffic lights">
            <ul className="space-y-3 text-sm">
              {TRAFFIC_LIGHTS.map((t) => (
                <li key={t.signal}>
                  <LightBadge light={t.signal.toLowerCase() as Light} />
                  <div className="mt-0.5 text-ink-2">{t.meaning}</div>
                  <div className="text-xs font-medium text-ink-3">→ {t.action}</div>
                </li>
              ))}
            </ul>
            <p className="mt-3 border-t border-line pt-3 text-xs text-ink-2">{DELOAD_RULE}</p>
          </Card>
          <Card title="Last 14 entries">
            {recent.length === 0 ? (
              <p className="text-sm text-ink-3">Nothing logged yet.</p>
            ) : (
              <ul className="divide-y divide-line text-sm">
                {recent.map((l) => (
                  <li key={l.date}>
                    <button className="flex w-full items-center justify-between py-1.5 text-left hover:text-accent" onClick={() => setDate(l.date)}>
                      <span>{formatDay(l.date)}</span>
                      <span className="flex items-center gap-3 text-xs text-ink-3">
                        {l.weight != null && `${l.weight} kg`}
                        {l.nerve && <span title="Nerve symptoms">⚡</span>}
                        <LightBadge light={lightFor(l)} compact />
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      </div>

      <Card title="Bodyweight" aside={latestAvg != null && <Pill tone="accent">7-day avg {latestAvg.toFixed(1)} kg</Pill>}>
        <p className="mb-3 text-sm text-ink-2">Target 79 kg around W11–12 at ≤0.45 kg/week. Eat more if the 7-day average drops faster than 0.5 kg/week.</p>
        <WeightChart points={weights} />
      </Card>

      <HrCard />
    </div>
  );
}

function Row({ label, during, morning, onChange }: { label: string; during: number | null; morning: number | null; onChange: (v: { during?: number | null; morning?: number | null }) => void }) {
  return (
    <>
      <span className="font-medium">{label}</span>
      <NumInput value={during} min={0} max={10} onChange={(v) => onChange({ during: v })} placeholder="0" />
      <NumInput value={morning} min={0} max={10} onChange={(v) => onChange({ morning: v })} placeholder="0" />
    </>
  );
}

const BANDS: { key: keyof HrWeek; label: string }[] = [
  { key: 'easy', label: 'Easy (<150)' },
  { key: 'steady', label: 'Steady (150–160)' },
  { key: 'hard', label: 'Hard (160–180)' },
  { key: 'max', label: 'Max (180+)' },
];

function fmtMin(m: number) {
  return m >= 60 ? `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}` : `${m} min`;
}

function HrCard() {
  const current = weekForDate(todayISO());
  const [n, setN] = useState(current?.n ?? 1);
  const [hr, setHr] = useHrWeeks();
  const week = WEEKS[n - 1];
  const t = HR_TARGETS[week.phase];
  const entry: HrWeek = hr[n] ?? { easy: null, steady: null, hard: null, max: null };
  const set = (k: keyof HrWeek, v: number | null) => setHr((prev) => ({ ...prev, [n]: { ...entry, [k]: v } }));

  const v = (k: keyof HrWeek) => entry[k] ?? 0;
  const over160 = v('hard') + v('max');
  const under160 = v('easy') + v('steady');
  const cap180 = n >= 12 ? '30 (35 if three clean weeks)' : '30';

  return (
    <Card
      title="Weekly heart-rate zones"
      aside={
        <select className={`${inputSmCls} max-w-[11rem]`} value={n} onChange={(e) => setN(Number(e.target.value))}>
          {WEEKS.map((w) => (
            <option key={w.n} value={w.n}>W{w.n} · {w.dates}</option>
          ))}
        </select>
      }
    >
      <p className="mb-3 text-sm text-ink-2">Enter minutes per band from Whoop/LoadPulse. Targets are for Phase {week.phase}{n === 19 ? ' (W19: Hard and Max ~10 min each)' : ''}.</p>
      <Table
        head={['Band', 'Minutes', 'Target', 'Status']}
        rows={BANDS.map((b) => {
          const [lo, hi] = n === 19 && (b.key === 'hard' || b.key === 'max') ? [5, 15] : t[b.key];
          const val = entry[b.key];
          const status = val == null ? '' : val < lo ? 'under' : val > hi ? 'over' : 'on target';
          return [
            b.label,
            <div key="in" className="w-24"><NumInput value={val} min={0} onChange={(x) => set(b.key, x)} /></div>,
            hi === 0 ? '—' : b.key === 'steady' ? `≤ ${hi} min` : hi < 60 ? `${lo}–${hi} min` : `${fmtMin(lo)}–${fmtMin(hi)}`,
            status && <Pill key="st" tone={status === 'on target' ? 'green' : status === 'over' ? 'red' : 'amber'}>{status}</Pill>,
          ];
        })}
      />
      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <Pill tone={over160 > 65 ? 'red' : 'neutral'}>160+: {over160} / 65 min cap</Pill>
        <Pill tone={v('max') > (n >= 12 ? 35 : 30) ? 'red' : 'neutral'}>180+: {v('max')} / {cap180} min cap</Pill>
        <Pill tone={under160 > (n >= 12 ? 300 : 270) ? 'red' : 'neutral'}>Under 160: {fmtMin(under160)} / {n >= 12 ? '4:30 (5:00)' : '4:30'} cap</Pill>
      </div>
      <div className="mt-4">
        <Bullets items={HR_NOTES} />
      </div>
    </Card>
  );
}
