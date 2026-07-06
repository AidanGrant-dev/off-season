import { useState } from 'react';
import { Card, Bullets } from '../components/Card';
import { useTestLog, type TestEntry } from '../lib/storage';
import { todayISO } from '../lib/dates';

const BLANK: Omit<TestEntry, 'id'> = {
  date: todayISO(),
  vmax: '',
  splits10_20_30: '',
  cmj: '',
  rsaDecrement: '',
  timeTrial: '',
  ift: '',
  notes: '',
};

export function TestingPage() {
  const [log, setLog] = useTestLog();
  const [form, setForm] = useState(BLANK);

  function addEntry() {
    const hasData = Object.entries(form).some(([k, v]) => k !== 'date' && String(v).trim() !== '');
    if (!hasData) return;
    setLog((prev) => [{ id: crypto.randomUUID(), ...form }, ...prev]);
    setForm({ ...BLANK, date: todayISO() });
  }

  function removeEntry(id: string) {
    setLog((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Testing / benchmarks</h2>
        <p className="mt-2 max-w-3xl text-black/70 dark:text-white/70">
          Retest every 3–4 weeks, ideally in a deload week — flagged on the Plan tab at Weeks 6, 10 and 13.
        </p>
      </div>

      <Card title="What to test">
        <Bullets
          items={[
            '<strong>Max velocity</strong> — GPS flying sprint. The headline metric: is 9.5 m/s climbing?',
            '<strong>10/20/30m splits</strong> — acceleration progress.',
            '<strong>CMJ height</strong> — cheap power/readiness proxy; flags fatigue when it dips.',
            '<strong>RSA decrement</strong> — 6 × 30m, track % drop-off falling over the block.',
            '<strong>3k or 5k time-trial</strong> to confirm the engine\'s held — not another 10k (avoid the extra fatigue and eccentric hit).',
            '<strong>30-15 IFT or Yo-Yo IR</strong> — the intermittent-fitness test that actually predicts GAA output. This is the metric to watch for the inter-county gap; your team may already run one.',
          ]}
        />
        <p className="mt-3 text-sm text-black/60 dark:text-white/60">On Garmin's VO₂ 60: an estimate off pace/HR — good for trends, not gospel. Chase performance markers, not the number itself.</p>
      </Card>

      <Card title="Log a test session">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block text-black/50 dark:text-white/50">Date</span>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-1.5 dark:border-white/15"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-black/50 dark:text-white/50">Vmax (m/s)</span>
            <input
              value={form.vmax}
              onChange={(e) => setForm((f) => ({ ...f, vmax: e.target.value }))}
              placeholder="e.g. 9.6"
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-1.5 dark:border-white/15"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-black/50 dark:text-white/50">10/20/30m splits (s)</span>
            <input
              value={form.splits10_20_30}
              onChange={(e) => setForm((f) => ({ ...f, splits10_20_30: e.target.value }))}
              placeholder="e.g. 1.75 / 2.95 / 3.95"
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-1.5 dark:border-white/15"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-black/50 dark:text-white/50">CMJ (cm)</span>
            <input
              value={form.cmj}
              onChange={(e) => setForm((f) => ({ ...f, cmj: e.target.value }))}
              placeholder="e.g. 42"
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-1.5 dark:border-white/15"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-black/50 dark:text-white/50">RSA decrement (%)</span>
            <input
              value={form.rsaDecrement}
              onChange={(e) => setForm((f) => ({ ...f, rsaDecrement: e.target.value }))}
              placeholder="e.g. 4.2"
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-1.5 dark:border-white/15"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-black/50 dark:text-white/50">3k/5k time-trial</span>
            <input
              value={form.timeTrial}
              onChange={(e) => setForm((f) => ({ ...f, timeTrial: e.target.value }))}
              placeholder="e.g. 5k 18:40"
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-1.5 dark:border-white/15"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block text-black/50 dark:text-white/50">30-15 IFT / Yo-Yo IR</span>
            <input
              value={form.ift}
              onChange={(e) => setForm((f) => ({ ...f, ift: e.target.value }))}
              placeholder="e.g. 30-15: 19.5 km/h"
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-1.5 dark:border-white/15"
            />
          </label>
          <label className="text-sm sm:col-span-2">
            <span className="mb-1 block text-black/50 dark:text-white/50">Notes</span>
            <input
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              placeholder="Conditions, how it felt, etc."
              className="w-full rounded-lg border border-black/15 bg-transparent px-3 py-1.5 dark:border-white/15"
            />
          </label>
        </div>
        <button
          onClick={addEntry}
          className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400"
        >
          Save entry
        </button>
      </Card>

      {log.length > 0 && (
        <Card title="History">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-black/45 dark:text-white/45">
                <tr>
                  <th className="pb-2 pr-4 font-medium">Date</th>
                  <th className="pb-2 pr-4 font-medium">Vmax</th>
                  <th className="pb-2 pr-4 font-medium">Splits</th>
                  <th className="pb-2 pr-4 font-medium">CMJ</th>
                  <th className="pb-2 pr-4 font-medium">RSA dec.</th>
                  <th className="pb-2 pr-4 font-medium">TT</th>
                  <th className="pb-2 pr-4 font-medium">IFT/Yo-Yo</th>
                  <th className="pb-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {log.map((e) => (
                  <tr key={e.id} className="border-t border-black/5 dark:border-white/5">
                    <td className="py-2 pr-4">{e.date}</td>
                    <td className="py-2 pr-4">{e.vmax || '—'}</td>
                    <td className="py-2 pr-4">{e.splits10_20_30 || '—'}</td>
                    <td className="py-2 pr-4">{e.cmj || '—'}</td>
                    <td className="py-2 pr-4">{e.rsaDecrement || '—'}</td>
                    <td className="py-2 pr-4">{e.timeTrial || '—'}</td>
                    <td className="py-2 pr-4">{e.ift || '—'}</td>
                    <td className="py-2">
                      <button onClick={() => removeEntry(e.id)} className="text-black/30 hover:text-red-400 dark:text-white/30">✕</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
