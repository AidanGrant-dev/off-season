import { Card, Bullets } from '../components/Card';
import { ATHLETE_PROFILE } from '../data/plan';

export function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Off-Season Plan — Speed, Fitness & Power Retention</h2>
        <p className="mt-2 max-w-3xl text-black/70 dark:text-white/70">
          A 13-week off-season built around your fixed Craigavon work schedule (Wed–Sat, 8am–6pm + commute) and free Sun/Mon/Tue days,
          using the gym, park and track beside work.
        </p>
      </div>

      <Card title="Athlete profile">
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
          <div><span className="text-black/45 dark:text-white/45">Age</span><div className="font-semibold">{ATHLETE_PROFILE.age}</div></div>
          <div><span className="text-black/45 dark:text-white/45">Weight</span><div className="font-semibold">{ATHLETE_PROFILE.weight}</div></div>
          <div><span className="text-black/45 dark:text-white/45">Height</span><div className="font-semibold">{ATHLETE_PROFILE.height}</div></div>
          <div><span className="text-black/45 dark:text-white/45">Positions</span><div className="font-semibold">{ATHLETE_PROFILE.positions}</div></div>
          <div><span className="text-black/45 dark:text-white/45">Vmax</span><div className="font-semibold">{ATHLETE_PROFILE.vmax}</div></div>
          <div><span className="text-black/45 dark:text-white/45">10k</span><div className="font-semibold">{ATHLETE_PROFILE.tenK}</div></div>
          <div><span className="text-black/45 dark:text-white/45">VO₂ (Garmin est.)</span><div className="font-semibold">{ATHLETE_PROFILE.vo2}</div></div>
          <div><span className="text-black/45 dark:text-white/45">CHB HSR/TD</span><div className="font-semibold">{ATHLETE_PROFILE.chbHsr}</div></div>
          <div><span className="text-black/45 dark:text-white/45">FB HSR/TD</span><div className="font-semibold">{ATHLETE_PROFILE.fbHsr}</div></div>
        </div>
      </Card>

      <Card title="The one reframe that shapes everything">
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
          Your engine is already strong for this sport — VO₂ ~60 at 82kg and a 39:30 10k sit solidly in the inter-county range. The biggest
          gains still on the table are in the <strong>gearbox and tyres — speed and power</strong> — not the engine. High-volume aerobic
          work actually interferes with the qualities that most decide GAA performance: max velocity, acceleration, and repeating high-speed
          efforts late in a game (RSA). So "improve fitness" here doesn't mean more mileage — it means:
        </p>
        <div className="mt-3">
          <Bullets
            items={[
              'Raise <strong>top speed</strong> (9.5 → 9.8–10.0 m/s is realistic in a block).',
              'Improve <strong>acceleration</strong> (0–20m force production).',
              'Build <strong>RSA / speed-endurance</strong> so HSR output holds through 70 minutes.',
              '<strong>Maintain</strong> the aerobic engine with minimal, high-intensity touches.',
              '<strong>Maintain / slightly build strength</strong> as a means to the above, not a goal in itself.',
            ]}
          />
        </div>
        <p className="mt-3 text-sm text-black/60 dark:text-white/60">
          You train for the <strong>CHB</strong> demand (the harder running role at 1.2km HSR). If you're conditioned for that, full-back is covered.
        </p>
      </Card>

      <Card title="Decision point: the January half-marathon">
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
          A January half pulls in the <strong>opposite direction</strong> to a speed/power block. This plan assumes option (A) below —
          change it if your priority differs.
        </p>
        <div className="mt-3 space-y-3 text-sm">
          <div className="rounded-lg border border-emerald-400/20 bg-emerald-500/5 p-3">
            <span className="font-semibold text-emerald-400">(A) GAA speed/power is the priority — recommended, and what this plan follows.</span>
            <p className="mt-1 text-black/65 dark:text-white/65">Run the half off accumulated fitness, no specific build. Expect ~1:28–1:32 on your existing base + one or two longer weekend runs.</p>
          </div>
          <div className="rounded-lg border border-black/10 p-3 dark:border-white/10">
            <span className="font-semibold">(B) The half genuinely matters.</span>
            <p className="mt-1 text-black/65 dark:text-white/65">Flip the periodisation — aerobic build Nov–Dec, speed/power as maintenance, real speed block Feb–March after the race.</p>
          </div>
          <div className="rounded-lg border border-black/10 p-3 dark:border-white/10">
            <span className="font-semibold">(C) Split the difference.</span>
            <p className="mt-1 text-black/65 dark:text-white/65">2–3 quality runs/week alongside reduced speed emphasis. Workable, but slower progress at both.</p>
          </div>
        </div>
      </Card>

      <Card title="Timeline at a glance">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-black/45 dark:text-white/45">
              <tr>
                <th className="pb-2 pr-4 font-medium">Block</th>
                <th className="pb-2 pr-4 font-medium">Weeks</th>
                <th className="pb-2 pr-4 font-medium">Dates</th>
                <th className="pb-2 font-medium">Primary focus</th>
              </tr>
            </thead>
            <tbody className="align-top">
              {[
                ['0 — Regeneration', '2', 'mid–late Oct', 'Recover, dissipate season fatigue, clear niggles'],
                ['1 — General Prep', '4', 'late Oct – late Nov', 'Work capacity, strength base, sprint mechanics, extensive plyos'],
                ['2 — Speed & Power', '~7 (incl. deload)', 'late Nov – ~10 Jan', 'Max velocity, acceleration, RSA, max strength + power; bridge into team format'],
                ['3 — Team return / Pre-season', 'ongoing', 'from ~2nd wk Jan', "Team sessions become conditioning; protect speed + strength"],
              ].map((row) => (
                <tr key={row[0]} className="border-t border-black/5 dark:border-white/5">
                  {row.map((cell, i) => (
                    <td key={i} className="py-2 pr-4 text-black/70 dark:text-white/70">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-black/60 dark:text-white/60">Deload every 3–4 weeks — drop total volume ~40–50% for 4–5 days. Non-negotiable for a full-time worker managing fatigue.</p>
      </Card>

      <Card title="Weekly sequencing rule (concurrent training)">
        <Bullets
          items={[
            '<strong>Speed is done fresh</strong>, and the two speed sessions live ≥48–72h apart. Never after a hard lift or conditioning, never back-to-back.',
            '<strong>Within a session, highest quality first:</strong> speed → power/plyos → max strength → conditioning → steady aerobic.',
            'Separate hard endurance from strength by a day where possible, or run them AM/PM (≥3–6h apart).',
            '<strong>Keep endurance high-intensity, low-volume</strong> in Block 2 — short intervals interfere far less with power than long steady-state.',
          ]}
        />
      </Card>

      <Card title="Running as much as you want — without blunting the speed work">
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
          Volume comes from <strong>easy running</strong> — genuinely easy, Zone 2, piled onto work days and doubled up on free days if recovery's good.
          Intensity is rationed to the three quality sessions/week — don't stack extra hard running on top.
        </p>
        <div className="mt-3">
          <Bullets
            items={[
              'Target: consistent <strong>~25–35 km/week</strong> of aerobic volume (quality sessions included), built ~10%/week — no more spike-and-crash.',
              'Route <strong>~40–50% of the easy portion off-feet</strong> (bike/ski-erg) — keeps actual running near current level while adding engine work and sparing legs/lifting.',
              'Never run hard the day before a speed or heavy-lower session.',
              'Keep easy runs actually easy — the classic trap is drifting into Zone 3 "grey zone", which steals from the hard days without adding benefit.',
              'Once team training returns in January, football adds 10–20km + HSR on top of Strava — that\'s your cue to taper your own running.',
            ]}
          />
        </div>
      </Card>

      <Card title="Bodyweight / fuelling">
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
          At 82kg/183cm you're likely already lean and muscular — <strong>do not bulk</strong>. Added mass only helps speed if it's usable
          force; otherwise it's dead weight hurting power-to-weight. Aim maintenance or slight recomp. Protein ~1.6–2.2 g/kg, carbs around
          speed/conditioning sessions to hit them at full quality. Sleep is the biggest lever for both speed adaptation and injury resistance.
        </p>
      </Card>
    </div>
  );
}
