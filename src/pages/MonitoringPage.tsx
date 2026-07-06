import { Card, Bullets } from '../components/Card';

export function MonitoringPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Load monitoring & injury prevention</h2>
        <p className="mt-2 max-w-3xl text-black/70 dark:text-white/70">
          Ramping HSR is the number-one soft-tissue injury driver in field sport, and this plan ramps it hard through Block 2. Use your
          existing ACWR/HRV/sRPE dashboard to autoregulate.
        </p>
      </div>

      <Card title="Guardrails">
        <Bullets
          items={[
            '<strong>HSR/sprint ACWR:</strong> keep acute:chronic in the 0.8–1.3 window. Progress chronic load ~10%/week, don\'t let acute spike.',
            '<strong>HRV / SWC:</strong> if HRV drops below your individual smallest-worthwhile-change, pull back CNS-heavy work (max velocity, heavy strength, intensive plyos) — swap for tempo, mobility, or rest.',
            '<strong>sRPE + monotony/strain:</strong> watch monotony creep during the speed block — the deload weeks exist specifically to break it.',
            '<strong>Log special endurance/RSA as their own high-intensity load</strong> so the dashboard sees true sprint stress, not just distance.',
          ]}
        />
      </Card>

      <Card title="Decision rules — what to change when a marker moves">
        <div className="space-y-3">
          {[
            ['Running tests (30-15/Yo-Yo, 1–2km TT) stall or drop', 'Shift aerobic volume back on-feet — you\'ve substituted too much off-feet.'],
            ['Hamstring tightness or soreness', 'More off-feet, cut sprint volume (keep the intensity), reinforce Nordics.'],
            ['Vmax or 10/20m splits stall', 'Protect two quality max-velo sessions a week, full recovery, cut the aerobic session the day before them.'],
            ['CMJ drops', 'Reduce endurance volume/frequency and re-check session spacing — you\'re under-recovered.'],
          ].map(([trigger, action]) => (
            <div key={trigger} className="rounded-lg border border-black/10 p-3 text-sm dark:border-white/10">
              <div className="font-semibold">{trigger}</div>
              <div className="mt-1 text-black/65 dark:text-white/65">→ {action}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Injury prevention — the part people skip">
        <Bullets
          items={[
            '<strong>Progressive HSR exposure</strong> — don\'t spike sprint/HSR volume week to week.',
            '<strong>Eccentric hamstring strength via Nordics.</strong> Meta-analyses put hamstring-injury reduction around ~50% (strongest for recurrence). Build 2×4–5 → 3×6–8 over the plan, slow controlled eccentric, hands ready to catch. Start in Block 1 so the strength is banked before max-velocity volume peaks in Block 2.',
            '<strong>The sprinting itself is protective.</strong> Max-velocity exposure lengthens hamstring fascicles and builds tissue resilience — done progressively, the flying-sprint sessions are part of your hamstring insurance, not just a hazard to manage.',
            'Calf/Achilles and adductor work (Copenhagen plank) earn their place too — both are common GAA injury sites.',
          ]}
        />
      </Card>

      <Card title="The sports science, in one screen">
        <Bullets
          items={[
            '<strong>Specificity</strong> — engine already inter-county range; lead with speed/power/RSA, build aerobic via low-volume VO₂ (front-loaded Block 1), not junk mileage.',
            '<strong>Interference effect</strong> — sequence and separate strength/power from endurance; keep endurance high-intensity/low-volume in the power block; speed always fresh.',
            '<strong>HSR = primary injury driver</strong> — progressive, ACWR-guided exposure + eccentric hamstring strength (Nordics).',
            '<strong>Force–velocity</strong> — raise top speed by increasing force (strength/power) and actually sprinting at max regularly.',
            '<strong>PAP / contrast training</strong> — heavy + explosive pairing converts strength into speed.',
            '<strong>Periodisation</strong> — general → specific, accumulate → intensify, deload to adapt.',
            '<strong>Position-specific</strong> — train the CHB demand; full-back is then covered.',
          ]}
        />
      </Card>
    </div>
  );
}
