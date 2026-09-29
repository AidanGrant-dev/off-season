import { useRef, useState } from 'react';
import { GOALS, KEY_DATES, NUTRITION, NUTRITION_INTRO, OVERVIEW, PHASES, PHASE_NOTE, SOURCES } from '../data/content';
import { weekForDate } from '../data/plan';
import { daysBetween, todayISO } from '../lib/dates';
import { exportAll, importAll, resetAll } from '../lib/store';
import { Bullets, Card, PageHeader, Pill, Table } from '../components/ui';

export function OverviewPage() {
  const today = todayISO();
  const phase = weekForDate(today)?.phase;

  return (
    <div className="space-y-6">
      <PageHeader title="Overview" intro={OVERVIEW} />

      <Card title="Goals, in priority order">
        <Bullets ordered items={GOALS} />
      </Card>

      <Card title="Phase map">
        <Table
          head={['Phase', 'Weeks', 'Dates', 'Aim', 'Running', 'Gym']}
          rows={PHASES.map((p) => [`${p.id}. ${p.name}`, p.weeks, p.dates, p.aim, p.running, p.gym])}
          highlight={phase ? phase - 1 : undefined}
        />
        <p className="mt-3 text-xs text-ink-3">{PHASE_NOTE}</p>
      </Card>

      <Card title="Key dates">
        <Table
          head={['Date', 'Event', 'Plan', '']}
          rows={KEY_DATES.map((k) => {
            const d = k.date ? daysBetween(today, k.date) : null;
            return [
              k.label,
              k.event,
              k.plan,
              d == null ? <Pill key="s" tone="amber">pending</Pill> : d < 0 ? <span key="s" className="text-xs text-ink-3">done</span> : <Pill key="s" tone={d <= 7 ? 'accent' : 'neutral'}>{d === 0 ? 'today' : `in ${d} d`}</Pill>,
            ];
          })}
        />
      </Card>

      <Card title="Nutrition and bodyweight">
        <p className="mb-3 text-sm text-ink-2">{NUTRITION_INTRO}</p>
        <Bullets items={NUTRITION} />
      </Card>

      <Backup />

      <Card title="Sources">
        <Bullets items={SOURCES} />
      </Card>
    </div>
  );
}

function Backup() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState('');

  function download() {
    const blob = new Blob([exportAll()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `off-season-backup-${todayISO()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  async function upload(file: File) {
    try {
      importAll(await file.text());
      setMsg('Backup restored.');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Could not read that file.');
    }
  }

  return (
    <Card title="Your data">
      <p className="mb-3 text-sm text-ink-2">Everything you log is stored in this browser only. Download a backup now and then, and restore it on another device.</p>
      <div className="flex flex-wrap gap-2">
        <button onClick={download} className="rounded-lg bg-accent px-3 py-1.5 text-sm font-semibold text-white hover:opacity-90">Download backup</button>
        <button onClick={() => fileRef.current?.click()} className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium hover:bg-ink/5">Restore backup</button>
        <button
          onClick={() => {
            if (confirm('Delete all logs, ticks and test results from this browser?')) {
              resetAll();
              setMsg('All data cleared.');
            }
          }}
          className="rounded-lg border border-line px-3 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-500/10"
        >
          Clear all data
        </button>
        <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
      </div>
      {msg && <p className="mt-2 text-sm text-ink-3">{msg}</p>}
    </Card>
  );
}
