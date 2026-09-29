import { WEEKS, addDays, dayForDate, weekForDate, PLAN_START } from '../data/plan';
import { GATES, INJURIES, KEY_DATES, PHASES } from '../data/content';
import { daysBetween, formatDay, todayISO } from '../lib/dates';
import { useGates, useLogs, useStages } from '../lib/hooks';
import { lightFor } from '../lib/logic';
import { DayCard } from '../components/DayCard';
import { WeekFlags } from '../components/WeekView';
import { Card, LightBadge } from '../components/ui';
import type { Page } from '../App';

const STAGE_KEY = { hamstring: 'hamstring', ab: 'ab', scapula: 'scapula' } as const;

export function TodayPage({ go }: { go: (p: Page) => void }) {
  const today = todayISO();
  const week = weekForDate(today);
  const day = dayForDate(today);
  const tomorrow = dayForDate(addDays(today, 1));
  const [logs] = useLogs();
  const [stages] = useStages();
  const [gates] = useGates();

  const todayLog = logs[today];
  const race = daysBetween(today, '2027-01-31');
  const nextDate = KEY_DATES.find((k) => k.date && k.date >= today);
  const nextGate = GATES.find((g) => !gates[g.id]?.passed);

  // Alerts
  const alerts: string[] = [];
  if (week && week.n > 1) {
    const prev = WEEKS[week.n - 2];
    const ambers = prev.days.filter((d) => logs[d.date] && lightFor(logs[d.date]) !== 'green').length;
    if (ambers >= 2) alerts.push(`Last week had ${ambers} amber/red days — make this week a deload: cut run km ~25%, keep strides and one quality session, trim (don’t skip) sprints.`);
  }
  const y1 = logs[addDays(today, -1)];
  const y2 = logs[addDays(today, -2)];
  if ((todayLog?.recovery === 'red' && y1?.recovery === 'red') || (y1?.recovery === 'red' && y2?.recovery === 'red')) {
    alerts.push('Two red Whoop recoveries in a row — swap the next interval session for Z2.');
  }
  if (todayLog && lightFor(todayLog) === 'red') alerts.push('Red today: stop that activity, drop back a stage, contact your physio.');
  if (todayLog && lightFor(todayLog) === 'amber') alerts.push('Amber today: repeat the step, don’t progress.');
  if (todayLog?.nerveWorse) alerts.push('New or worse nerve symptoms. Numbness, foot/ankle weakness or spreading symptoms: see your physio or GP promptly.');

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-ink-3">{formatDay(today, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        {week ? (
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-bold">
              Week {week.n} · Phase {week.phase}: {PHASES[week.phase - 1].name}
            </h2>
            <WeekFlags week={week} />
          </div>
        ) : today < PLAN_START ? (
          <h2 className="mt-1 text-2xl font-bold">Plan starts in {daysBetween(today, PLAN_START)} days</h2>
        ) : (
          <h2 className="mt-1 text-2xl font-bold">The plan is complete — pitch training from w/c 1 Feb</h2>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        <Stat label="Dundalk 10k" value={race > 0 ? `${race} days` : race === 0 ? 'Race day!' : 'Done'} sub="Sun 31 Jan" />
        <Stat label="Next key date" value={nextDate?.event ?? '—'} sub={nextDate ? `${nextDate.label} · in ${daysBetween(today, nextDate.date!)} days` : ''} />
        <Stat label="Next gate" value={nextGate ? `Gate ${nextGate.id}` : 'All passed'} sub={nextGate ? `${nextGate.week} · unlocks ${nextGate.unlocks}` : ''} />
      </div>

      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((a) => (
            <div key={a} role="alert" className="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
              ⚠ {a}
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-3">Today</h3>
          {day ? <DayCard day={day} /> : <p className="text-sm text-ink-3">No session scheduled.</p>}
          {tomorrow && (
            <>
              <h3 className="pt-3 text-sm font-semibold uppercase tracking-wide text-ink-3">Tomorrow</h3>
              <DayCard day={tomorrow} expanded={false} />
            </>
          )}
        </div>

        <div className="space-y-4">
          <Card title="Daily log" aside={todayLog && <LightBadge light={lightFor(todayLog)} />}>
            <p className="text-sm text-ink-2">
              {todayLog ? 'Logged for today. Update it after training or tomorrow morning.' : 'Log pain (hamstring, ab, shoulder), nerve symptoms, weight, sleep and RHR.'}
            </p>
            <button onClick={() => go('log')} className="mt-3 w-full rounded-lg bg-accent px-3 py-2 text-sm font-semibold text-white hover:opacity-90">
              {todayLog ? 'Edit today’s log' : 'Log today'}
            </button>
          </Card>

          <Card title="Rehab block (15–20 min, every day)">
            <ul className="space-y-3 text-sm">
              {INJURIES.map((inj) => {
                const s = stages[STAGE_KEY[inj.id]];
                const stage = inj.stages[Math.min(s, inj.stages.length) - 1];
                return (
                  <li key={inj.id}>
                    <div className="font-medium">{inj.name.split(' (')[0]}</div>
                    <div className="text-xs text-ink-3">
                      Stage {s} — {stage.name} ({stage.when})
                    </div>
                    <div className="mt-1 text-ink-2">{stage.items[0]}</div>
                  </li>
                );
              })}
            </ul>
            <button onClick={() => go('rehab')} className="mt-3 text-sm font-medium text-accent hover:underline">
              Full rehab exercises →
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-line bg-surface p-3 sm:p-4">
      <div className="text-xs font-medium text-ink-3">{label}</div>
      <div className="mt-1 text-sm font-bold leading-tight sm:text-lg">{value}</div>
      {sub && <div className="mt-1 hidden text-xs text-ink-3 sm:block">{sub}</div>}
    </div>
  );
}
