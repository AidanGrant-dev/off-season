import { useState } from 'react';
import { BASELINES, GYM_PHASES, LOAD_RULES, PRIORITIES, TEST_BLOCK, TEST_GATING } from '../data/content';
import { formatDay, todayISO } from '../lib/dates';
import { useTests } from '../lib/hooks';
import { estimate3RM, formatTime, nextLoad, parseTime } from '../lib/logic';
import { TEST_KINDS, type TestKind } from '../lib/types';
import { Card, Field, PageHeader, Pill, Table, inputCls } from '../components/ui';

export function StrengthPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Strength and power" intro="Phase 2 is the strength block (3×/week) while running is limited. From Phase 3, strength drops to two short, heavy sessions — keeping the load high is what preserves strength, not the volume." />
      <div className="grid gap-4 lg:grid-cols-[1fr_22rem]">
        <Card title="How loads progress">
          <p className="text-sm leading-relaxed text-ink-2">{LOAD_RULES}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-2">{PRIORITIES}</p>
        </Card>
        <RpeCalc />
      </div>

      {GYM_PHASES.map((p) => (
        <Card key={p.title} title={p.title}>
          {p.note && <p className="mb-3 text-sm text-ink-2">{p.note}</p>}
          <dl className="space-y-3 text-sm">
            {p.sessions.map((s) => (
              <div key={s.name}>
                <dt className="font-semibold">{s.name}</dt>
                <dd className="leading-relaxed text-ink-2">{s.body}</dd>
              </div>
            ))}
          </dl>
        </Card>
      ))}

      <Card title="Strength test block (first week of January)">
        <Table head={['Week', 'Front squat (Sun)', 'Trap bar (Sun)', 'Bench (Thu)']} rows={TEST_BLOCK.map((r) => [r.week, r.fs, r.tb, r.bench])} />
        <div className="mt-4 space-y-2 text-sm text-ink-2">
          <p><span className="font-medium text-ink">Sun 3 Jan:</span> 15 min warm-up, 3 flying 20 m at ≥95%, CMJ, broad jump, then front squat and trap bar to 3RM. <span className="font-medium text-ink">Thu 7 Jan:</span> bench 3RM, then max bodyweight chin-ups. Same equipment, depth and time of day as last time.</p>
          <p><span className="font-medium text-ink">Gating.</span> {TEST_GATING}</p>
        </div>
      </Card>

      <TestLog />
    </div>
  );
}

function RpeCalc() {
  const [lift, setLift] = useState<'lower' | 'upper'>('lower');
  const [w, setW] = useState('');
  const [reps, setReps] = useState('5');
  const [rpe, setRpe] = useState('8');
  const weight = Number(w);
  const r = Number(rpe);
  const next = weight && r ? nextLoad(weight, r, lift === 'lower') : null;
  const est = weight && r && Number(reps) ? estimate3RM(weight, Number(reps), r) : null;

  return (
    <Card title="Next-session load">
      <div className="grid grid-cols-2 gap-3">
        <Field label="Lift" className="col-span-2">
          <select className={inputCls} value={lift} onChange={(e) => setLift(e.target.value as 'lower' | 'upper')}>
            <option value="lower">Front squat / trap bar (+5 kg)</option>
            <option value="upper">Bench / chin-up (+2.5 kg)</option>
          </select>
        </Field>
        <Field label="Top set (kg)"><input className={inputCls} inputMode="decimal" value={w} onChange={(e) => setW(e.target.value)} placeholder="100" /></Field>
        <Field label="Reps"><input className={inputCls} inputMode="numeric" value={reps} onChange={(e) => setReps(e.target.value)} /></Field>
        <Field label="RPE" className="col-span-2">
          <select className={inputCls} value={rpe} onChange={(e) => setRpe(e.target.value)}>
            {['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10'].map((x) => <option key={x}>{x}</option>)}
          </select>
        </Field>
      </div>
      {next && (
        <div className="mt-3 space-y-1 text-sm">
          <div>Next top set: <span className="font-semibold">{next.load} kg</span></div>
          <div className="text-xs text-ink-3">{next.advice}</div>
          {est && <div className="text-xs text-ink-3">Estimated 3RM ≈ {est} kg (use for the W6/W10 re-estimate)</div>}
        </div>
      )}
    </Card>
  );
}

function TestLog() {
  const [tests, setTests] = useTests();
  const [kind, setKind] = useState<TestKind>('fs');
  const [date, setDate] = useState(todayISO());
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');

  function add() {
    const v = kind === '5k' ? parseTime(value) : Number(value);
    if (!v) return;
    setTests((prev) => [...prev, { id: crypto.randomUUID(), date, kind, value: v, notes: notes || undefined }]);
    setValue('');
    setNotes('');
  }

  const show = (k: TestKind, v: number) => (k === '5k' ? formatTime(v) : `${v} ${TEST_KINDS[k].unit}`);
  const sorted = [...tests].sort((a, b) => b.date.localeCompare(a.date));
  const best = (k: TestKind) => {
    const list = tests.filter((t) => t.kind === k);
    if (!list.length) return null;
    return list.reduce((a, b) => (k === '5k' ? (b.value < a.value ? b : a) : b.value > a.value ? b : a));
  };

  return (
    <Card title="Test results">
      <p className="mb-3 text-sm text-ink-2">Log the W8 baseline (CMJ, broad jump — Sun 15 Nov), practice max chin-up sets, and the January tests. The 5k time trial feeds the 10k pace calculator on the Running tab.</p>
      <Table
        head={['Lift', 'Last 3RM', 'Recent marker', 'Target', 'Your best']}
        rows={BASELINES.map((b, i) => {
          const k = (['fs', 'tb', 'bench', 'chins'] as TestKind[])[i];
          const bst = best(k);
          return [b.lift, b.previous ? `${b.previous} kg` : '—', b.recent, b.target, bst ? <Pill key="b" tone="accent">{show(k, bst.value)}</Pill> : '—'];
        })}
      />
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_9rem_8rem_1fr_auto] sm:items-end">
        <Field label="Test">
          <select className={inputCls} value={kind} onChange={(e) => setKind(e.target.value as TestKind)}>
            {(Object.keys(TEST_KINDS) as TestKind[]).map((k) => (
              <option key={k} value={k}>{TEST_KINDS[k].label} ({TEST_KINDS[k].hint})</option>
            ))}
          </select>
        </Field>
        <Field label="Date"><input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} /></Field>
        <Field label={kind === '5k' ? 'Time (mm:ss)' : `Result (${TEST_KINDS[kind].unit})`}>
          <input className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} inputMode={kind === '5k' ? 'text' : 'decimal'} />
        </Field>
        <Field label="Notes"><input className={inputCls} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. 5RM, RPE 9" /></Field>
        <button onClick={add} className="rounded-lg bg-accent px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90">Add</button>
      </div>
      {sorted.length > 0 && (
        <ul className="mt-4 divide-y divide-line text-sm">
          {sorted.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-3 py-2">
              <span>
                <span className="text-ink-3">{formatDay(t.date)} · </span>
                <span className="font-medium">{TEST_KINDS[t.kind].label}</span> {show(t.kind, t.value)}
                {t.notes && <span className="text-ink-3"> — {t.notes}</span>}
              </span>
              <button className="text-xs text-ink-3 hover:text-rose-500" onClick={() => setTests((prev) => prev.filter((x) => x.id !== t.id))}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
