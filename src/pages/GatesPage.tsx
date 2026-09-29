import { GATES, HYROX_NOTE, PITCH_CHECKLIST } from '../data/content';
import { formatDay, todayISO } from '../lib/dates';
import { useGates, usePitch } from '../lib/hooks';
import type { GateId } from '../data/plan';
import { Card, Check, PageHeader, Pill, inputSmCls } from '../components/ui';

export function GatesPage() {
  const [gates, setGates] = useGates();
  const [pitch, setPitch] = usePitch();
  const pitchDone = PITCH_CHECKLIST.filter((_, i) => pitch[i]).length;

  const setCriterion = (id: GateId, i: number, v: boolean) =>
    setGates((prev) => ({ ...prev, [id]: { ...prev[id], criteria: { ...prev[id]?.criteria, [i]: v } } }));
  const setPassed = (id: GateId, date: string | undefined) =>
    setGates((prev) => ({ ...prev, [id]: { criteria: prev[id]?.criteria ?? {}, passed: date } }));

  return (
    <div className="space-y-6">
      <PageHeader title="Decision gates" intro="Each phase opens on criteria, not dates. Tick criteria as you meet them, then record the date your physio signs the gate off." />

      <div className="grid gap-4 md:grid-cols-2">
        {GATES.map((g) => {
          const st = gates[g.id];
          const met = g.criteria.filter((_, i) => st?.criteria?.[i]).length;
          const isPitch = g.id === 'Pitch';
          const allMet = isPitch ? pitchDone === PITCH_CHECKLIST.length : met === g.criteria.length;
          return (
            <Card
              key={g.id}
              title={<span>Gate {g.id}</span>}
              aside={st?.passed ? <Pill tone="green">✓ Passed {formatDay(st.passed, { day: 'numeric', month: 'short' })}</Pill> : <Pill>{g.week}</Pill>}
            >
              <p className="mb-2 text-sm text-ink-2"><span className="font-medium text-ink">Unlocks:</span> {g.unlocks}</p>
              {isPitch ? (
                <p className="text-sm text-ink-3">{pitchDone}/{PITCH_CHECKLIST.length} checklist items done (below).</p>
              ) : (
                g.criteria.map((c, i) => <Check key={i} checked={!!st?.criteria?.[i]} onChange={(v) => setCriterion(g.id, i, v)} label={c} />)
              )}
              <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-line pt-3">
                {st?.passed ? (
                  <>
                    <input type="date" className={inputSmCls} value={st.passed} onChange={(e) => setPassed(g.id, e.target.value || undefined)} />
                    <button className="text-xs text-ink-3 hover:text-rose-500" onClick={() => setPassed(g.id, undefined)}>Undo</button>
                  </>
                ) : (
                  <button
                    onClick={() => setPassed(g.id, todayISO())}
                    className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${allMet ? 'bg-accent text-white hover:opacity-90' : 'border border-line text-ink-2 hover:bg-ink/5'}`}
                  >
                    Mark passed (physio sign-off)
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <Card title="Return-to-pitch checklist (by W19)" aside={<Pill tone={pitchDone === PITCH_CHECKLIST.length ? 'green' : 'neutral'}>{pitchDone}/{PITCH_CHECKLIST.length}</Pill>}>
        {PITCH_CHECKLIST.map((c, i) => (
          <Check key={i} checked={!!pitch[i]} onChange={(v) => setPitch((prev) => ({ ...prev, [i]: v }))} label={c} />
        ))}
        <p className="mt-3 text-sm text-ink-2">Re-injuries cluster early: about a quarter happen in the first week after return. Keep Nordics and weekly sprinting going into pre-season.</p>
      </Card>

      <Card title="HYROX">
        <p className="text-sm text-ink-2">{HYROX_NOTE}</p>
      </Card>
    </div>
  );
}
