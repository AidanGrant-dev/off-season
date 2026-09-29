import { useState } from 'react';
import { FITNESS_SESSIONS, OFF_FEET, OFF_FEET_RULES, RUN_LADDER, SPRINT_LADDER, STATSPORTS_NOTE, SUNDAY_SPRINT } from '../data/content';
import { useStages, useTests } from '../lib/hooks';
import { formatTime, parseTime, tenKFrom5k } from '../lib/logic';
import { Bullets, Card, Field, PageHeader, Pill, Stepper, Table, inputCls } from '../components/ui';

const RACE_WEEK = [
  'Mon: light gym, half volume.',
  'Tue: 4 × 1 km at 10k pace, 2 min jog.',
  'Wed: rest (first workday).',
  'Thu: easy 25 min + 4 strides.',
  'Fri: rest.',
  'Sat: 15–20 min + 4 strides.',
  'Sun 31 Jan: Dundalk 10k. Keep Mon–Tue after it easy before pitch training starts.',
];

export function RunningPage() {
  const [stages, setStages] = useStages();
  const [tests] = useTests();
  const logged5k = tests.filter((t) => t.kind === '5k').sort((a, b) => b.date.localeCompare(a.date))[0];
  const loggedVmax = tests.filter((t) => t.kind === 'vmax').sort((a, b) => b.value - a.value)[0];
  const [input, setInput] = useState(logged5k ? formatTime(logged5k.value) : '18:10');
  const sec = parseTime(input);
  const pred = sec ? tenKFrom5k(sec) : null;
  const [vmax, setVmax] = useState(loggedVmax ? String(loggedVmax.value) : '');
  // Plan: maximal aerobic speed ≈ time-trial speed ÷ 0.95
  const ttSpeed = sec ? 5 / (sec / 3600) : null;
  const masKmh = ttSpeed ? ttSpeed / 0.95 : null;
  const ratio = masKmh && Number(vmax) ? Number(vmax) / masKmh : null;

  return (
    <div className="space-y-6">
      <PageHeader title="Running and speed" intro="Running comes back in three ladders (volume, then speed, then intensity). Each moves up one step per session, and only when the last step was symptom-free the next morning." />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Return to run (from Gate B, ~W4)">
          <p className="mb-3 text-sm text-ink-2">2–3 sessions a week, not on consecutive days at first, flat surface or treadmill at RPE 3–4.</p>
          <Stepper steps={4} value={stages.runStep} onChange={(v) => setStages((p) => ({ ...p, runStep: v }))} labels={['Step 1', 'Step 2', 'Step 3', 'Step 4']} />
          <ol className="mt-3 space-y-1.5 text-sm">
            {RUN_LADDER.map((s, i) => (
              <li key={s} className={`flex gap-2 ${i + 1 === stages.runStep ? 'font-semibold text-accent' : i + 1 < stages.runStep ? 'text-ink-3 line-through' : 'text-ink-2'}`}>
                <span className="w-4">{i + 1}.</span>
                {s}
              </li>
            ))}
          </ol>
          <p className="mt-2 text-xs text-ink-3">Tap the step you’ve completed symptom-free.</p>
        </Card>

        <Card title="Sprint ladder (from Step 4, ~W5)">
          <p className="mb-3 text-sm text-ink-2">Check speeds on StatSports against your in-season max; ≥48 h between sessions. Hamstring tightness or nerve symptoms = repeat the step.</p>
          <Stepper steps={4} value={stages.sprintStep} onChange={(v) => setStages((p) => ({ ...p, sprintStep: v }))} labels={SPRINT_LADDER.map((s) => s.step)} />
          <div className="mt-3">
            <Table head={['Step', 'Reps', '% max', 'Est.']} rows={SPRINT_LADDER.map((s) => [s.step, s.reps, s.intensity, s.week])} highlight={stages.sprintStep ? stages.sprintStep - 1 : undefined} />
          </div>
          <p className="mt-2 text-xs text-ink-3">Once you reach S4, keep one ≥95% session every week through to February.</p>
        </Card>
      </div>

      <Card title="10k pace calculator">
        <div className="grid gap-4 sm:grid-cols-[12rem_12rem_1fr]">
          <Field label="5k time (mm:ss)">
            <input className={inputCls} value={input} onChange={(e) => setInput(e.target.value)} placeholder="18:10" />
          </Field>
          <Field label="StatSports top speed (km/h)">
            <input className={inputCls} value={vmax} inputMode="decimal" onChange={(e) => setVmax(e.target.value)} placeholder="e.g. 32.5" />
          </Field>
          <div className="text-sm">
            {pred ? (
              <div className="space-y-1">
                <div>Predicted 10k: <span className="font-semibold">{formatTime(pred.total)}</span></div>
                <div>10k pace: <span className="font-semibold">{formatTime(pred.perKm)}/km</span> ({(36000 / pred.total).toFixed(1)} km/h)</div>
                <div className="text-ink-3">5k pace (VO2 reps): {formatTime(sec! / 5)}/km</div>
                {ratio && (
                  <div>
                    Speed profile: <span className="font-semibold">{ratio.toFixed(2)}</span>{' '}
                    {ratio > 1.8 ? <Pill tone="accent">Speed profile — favour quality over extra zone time</Pill> : ratio < 1.7 ? <Pill tone="green">Extra zone time pays off most</Pill> : <Pill>Balanced</Pill>}
                  </div>
                )}
              </div>
            ) : (
              <span className="text-ink-3">Enter a time like 18:10.</span>
            )}
          </div>
        </div>
        <p className="mt-3 text-xs text-ink-3">
          10k = 5k × 2.08. Until the 5k time trial on Tue 5 Jan, run on effort and heart rate. {logged5k ? `Pre-filled from your logged time trial (${logged5k.date}).` : 'Pre-filled with your 18:10 5k.'} Profile = top speed ÷ maximal aerobic speed (time-trial speed ÷ 0.95).
        </p>
      </Card>

      <Card title="10k and fitness sessions">
        <Table head={['Type', 'Progression', 'Intensity']} rows={FITNESS_SESSIONS.map((s) => [s.type, s.progression, s.intensity])} />
        <p className="mt-3 text-xs text-ink-3">Heart rates assume a max of ~200 bpm.</p>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Sunday sprint session (Phase 4 on)">
          <Bullets items={SUNDAY_SPRINT} />
        </Card>
        <Card title="StatSports check (from W11)">
          <p className="text-sm leading-relaxed text-ink-2">{STATSPORTS_NOTE}</p>
        </Card>
      </div>

      <Card title="Bike, elliptical and incline walking">
        <p className="mb-3 text-sm text-ink-2">One Z2 session a week on the bike (Monday) and one on the elliptical (Friday in P2, Wednesday from W7). All start after Gate A.</p>
        <Table head={['Session', 'Prescription']} rows={OFF_FEET.map((o) => [o.session, o.rx])} />
        <div className="mt-4">
          <Bullets items={OFF_FEET_RULES} />
        </div>
      </Card>

      <Card title="Race week (W19)">
        <Bullets items={RACE_WEEK} />
      </Card>
    </div>
  );
}
