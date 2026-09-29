import { INJURIES } from '../data/content';
import { useStages } from '../lib/hooks';
import { Bullets, Card, PageHeader, Stepper } from '../components/ui';

export function RehabPage() {
  const [stages, setStages] = useStages();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rehab progressions"
        intro="Each injury moves through its own stages on its own criteria. Your physio’s exercises are Stage 1; later stages extend them and should be cleared with your physio as you go. Set the stage you’re on — the Today tab shows it in your daily rehab block."
      />
      {INJURIES.map((inj) => {
        const current = stages[inj.id];
        return (
          <Card key={inj.id} title={inj.name}>
            {inj.intro && <p className="mb-3 text-sm text-ink-2">{inj.intro}</p>}
            <div className="mb-4">
              <div className="mb-1.5 text-xs font-medium text-ink-3">Current stage</div>
              <Stepper
                steps={inj.stages.length}
                value={current}
                onChange={(v) => setStages((prev) => ({ ...prev, [inj.id]: Math.max(1, v) }))}
                labels={inj.stages.map((s, i) => `${i + 1}. ${s.name}`)}
              />
            </div>
            <div className="space-y-4">
              {inj.stages.map((s, i) => (
                <div key={s.name} className={`rounded-lg border p-3 ${i + 1 === current ? 'border-accent/50 bg-accent/[0.05]' : 'border-line'} ${i + 1 < current ? 'opacity-60' : ''}`}>
                  <div className="mb-2 flex flex-wrap items-baseline gap-2">
                    <h4 className="font-semibold">Stage {i + 1} — {s.name}</h4>
                    <span className="text-xs text-ink-3">{s.when}</span>
                    {i + 1 === current && <span className="text-xs font-semibold text-accent">● current</span>}
                  </div>
                  <Bullets items={s.items} />
                </div>
              ))}
            </div>
            {inj.extra && (
              <div className="mt-4 rounded-lg border border-line p-3">
                <h4 className="mb-2 font-semibold">{inj.extra.title}</h4>
                <Bullets items={inj.extra.items} />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}
