import { Card, Bullets } from '../components/Card';

export function AerobicPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Aerobic development, RSA & off-feet conditioning</h2>
        <p className="mt-2 max-w-3xl text-black/70 dark:text-white/70">
          You want to be fitter, and you can be — the key is a low-volume, well-placed VO₂ session rather than more junk mileage, plus
          back-loaded repeat-effort work that converts your engine into game-specific output.
        </p>
      </div>

      <Card title="Where the inter-county gap actually sits">
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
          Your VO₂ ~60 already lands in the inter-county range (elite Gaelic footballers cluster high-50s to mid-60s). The gap to the top
          lads usually isn't raw VO₂max — it's intermittent fitness (repeat-effort capacity), HSR volume and how well it's repeated, running
          economy, body composition, and training-volume-backed-by-pro-recovery that a club player can't fully match. Most of that list is
          exactly what the speed, special-endurance, strength and lean-body-comp work in this plan already targets.
        </p>
      </Card>

      <Card title="What your WHOOP data shows">
        <Bullets
          items={[
            '<strong>Top-end is low and static</strong> — ~25 min/week in Z4 and just 4 min in Z5, near-identical across both 6-month blocks. Off-feel "hard" sessions tend to drift into Z3 rather than Z4–5 — the clearest place to gain. One genuine VO₂ session (~16 min of Z4–5 in a 4×4) roughly doubles weekly top-end.',
            '<strong>Easy aerobic is modest and inconsistent</strong> — Z2 ~1hr/week, Strava running ~14km/week swinging 0–39km. Room to add easy volume, and just as important, make it consistent.',
          ]}
        />
        <div className="mt-3 rounded-lg bg-black/[0.03] p-3 text-sm dark:bg-white/[0.03]">
          <strong>Set targets in WHOOP zones:</strong> Easy = Z2 (in Z3? slow down). VO₂ reps = Z4–5 (a rep topping out in Z3 wasn't a VO₂ rep). Threshold = top of Z3 / low Z4.
        </div>
      </Card>

      <Card title="Periodising the VO₂ session">
        <Bullets
          items={[
            '<strong>Block 1 — push it.</strong> Two quality aerobic sessions (a VO₂ + a threshold, or two VO₂) — speed isn\'t the priority yet and recovery capacity is there. This is the phase that actually moves the number.',
            '<strong>Block 2 — hold it.</strong> One VO₂ session/week (Friday slot), low-volume — maintains and slightly builds while speed leads. Morphs into the team\'s intermittent format in the final 1–2 weeks.',
            '<strong>Block 3 — the team\'s track sessions are VO₂/intermittent work</strong>, so your own drops out.',
          ]}
        />
      </Card>

      <Card title="Session menu">
        <Bullets
          items={[
            '<strong>Intermittent (best fit — matches the game):</strong> 12–20 × 30/30 (30s @ vVO₂max / 30s easy), 6–8 × 40/20, or short blocks like the team\'s.',
            '<strong>Longer reps (pure VO₂max):</strong> 4–5 × 4 min @ ~90–95% HRmax / 3 min easy, or 5–6 × 3 min.',
            'Rotate formats week to week. Always well away from speed days.',
          ]}
        />
      </Card>

      <Card title="RSA & special endurance — where it lives in the timeline">
        <Bullets
          items={[
            '<strong>Blocks 0–1 (Oct–Nov):</strong> none. Too early, competes with the aerobic build.',
            '<strong>Block 2 main (Wk 7–11):</strong> none of your own — Friday is VO₂, max velocity is being protected.',
            '<strong>Bridge (Wk 12–13):</strong> Wk12 special endurance (5–6×150m @ ~90%, 3–4min recovery, ≈900m of quality HSR); Wk13 team-format intermittent session (rehearses the exact squad format).',
            '<strong>Block 3 (from Jan 12):</strong> the team\'s track sessions are RSA/speed-endurance. Keep at most one of your own per week, only if the team\'s isn\'t hitting it, then drop once at two team sessions + pitch.',
          ]}
        />
      </Card>

      <Card title="Off-feet conditioning — worth using, and how">
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
          Off-feet work (assault/air bike, ski erg) transfers well to the <strong>central</strong> side of aerobic fitness (stroke volume,
          cardiac output) — largely mode-transferable. It doesn't build running economy, hamstring/eccentric tolerance, or the neuromuscular
          running pattern — those need running. So it supplements, it doesn't replace.
        </p>
        <div className="mt-3">
          <Bullets
            items={[
              '<strong>Keep the primary VO₂/intermittent session on feet</strong> — better running-specific adaptation and game transfer. Move to the bike only when hamstrings are loaded or niggling.',
              '<strong>Use off-feet to add volume, not replace quality.</strong> Route ~40–50% of easy aerobic volume onto bike/ski-erg — adds engine work without impact/eccentric load, and protects lifting (running interferes with lower-body power more than cycling does).',
              'Go easy on <strong>rower</strong> volume specifically (low-back/posterior load competes with lifting) — assault bike and ski erg are the tools.',
              'A bike VO₂ number runs ~5–15% below a running one — don\'t compare a bike test to your Garmin ~60.',
            ]}
          />
        </div>
        <p className="mt-3 text-sm text-black/60 dark:text-white/60">
          <strong>Arbiter:</strong> keep your running tests (30-15/Yo-Yo, 1–2km TT) as the judge — if they hold or improve, the off-feet share is fine; if they stall, shift back on-feet.
        </p>
      </Card>

      <Card title="Measuring it honestly">
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
          Garmin's VO₂ 60 is an estimate off pace/HR — fine for trends, useless as gospel. Chase performance markers instead: faster reps at
          the same HR, a better RSA decrement, and ideally a <strong>30-15 IFT or Yo-Yo IR</strong> score — the intermittent test that
          actually predicts GAA output. Those moving is what "fitter" really means.
        </p>
      </Card>
    </div>
  );
}
