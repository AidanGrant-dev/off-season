import { Card, Bullets } from '../components/Card';

function LiftTable({ rows }: { rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="text-black/45 dark:text-white/45">
          <tr>
            <th className="pb-2 pr-4 font-medium">Lift</th>
            <th className="pb-2 pr-4 font-medium">In-season now</th>
            <th className="pb-2 font-medium">Block 1 (base)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r[0]} className="border-t border-black/5 dark:border-white/5">
              <td className="py-2 pr-4 font-medium">{r[0]}</td>
              <td className="py-2 pr-4 text-black/60 dark:text-white/60">{r[1]}</td>
              <td className="py-2 font-semibold text-indigo-400">{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StrengthPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Your gym, periodised</h2>
        <p className="mt-2 max-w-3xl text-black/70 dark:text-white/70">
          Keeps your existing exercises and periodises the rep scheme and intent across blocks, layering in the power/contrast work that
          converts strength to speed. Bias stays <strong>strength/power, not mass</strong> — hold your bodyweight.
        </p>
      </div>

      <Card title="Block 0 (Wk 1–2) — deload">
        <p className="text-sm text-black/70 dark:text-white/70">2 × full-body @ ~65–70% of in-season loads. Same lifts, 2–3 sets, lighter (e.g. bench 3×5 @ ~80kg, Bulgarian 3×5 @ 20kg). Hold strength with zero fatigue. Start easing eccentric hamstring work back in (Nordics 2×4).</p>
      </Card>

      <Card title="Block 1 (Wk 3–6) — strength base, 3 sessions (Sun lower · Mon upper · Thu full-body)">
        <p className="mb-3 text-sm text-black/70 dark:text-white/70">Shift main lifts to strength ranges, add load each week; Week 6 backs off ~10%.</p>
        <LiftTable
          rows={[
            ['Barbell bench', '3×5 @ 100kg', '4×6, build ~90 → 100kg'],
            ['Weighted chin/pull-up', '2×5 @ 16kg', '4×5, add load 16 → 20kg'],
            ['DB Bulgarian split squat', '3×5 @ 2×30kg', '4×6 heavier, → 2×32.5–35kg'],
            ['Split-stance DB RDL', '2×8 @ 30kg', '3×6–8 heavier, → 35kg'],
            ['Nordic hamstring curl', '—', 'Add & build: 2×4 → 3×6'],
          ]}
        />
        <p className="mt-3 text-sm text-black/60 dark:text-white/60">Incline row, Pallof press, rollout, calf iso, Copenhagen plank, hip-flexor march stay as accessories. Skull crusher/DB curl kept low priority (2–3×8–10, health only).</p>
        <p className="mt-2 text-sm text-black/60 dark:text-white/60"><strong>Nordics are the priority addition</strong> — banking eccentric hamstring strength before Block 2's sprint ramp is the best injury insurance you can buy.</p>
      </Card>

      <Card title="Block 2 (Wk 7–13) — max strength + power, 2 sessions (Mon lower · Thu upper)">
        <p className="mb-3 text-sm text-black/70 dark:text-white/70">Main lifts drop to 3–5 reps at heavier loads, each paired with a matched power move (contrast — the heavy set potentiates the jump). Build Wk7–9, deload Wk10, Christmas light Wk11, peak Wk12, maintain Wk13.</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-2 text-sm font-semibold">Lower (Mon)</h4>
            <Bullets
              items={[
                'Bulgarian split squat 4×4 heavy → superset box jumps 4×3',
                'Split-stance RDL (or hip thrust) 4×4–5 → superset broad jumps 4×3',
                'Nordics 3×5–6 (maintain) · Copenhagen · calf · hip-flexor march',
              ]}
            />
          </div>
          <div>
            <h4 className="mb-2 text-sm font-semibold">Upper (Thu)</h4>
            <Bullets
              items={[
                'Bench 4–5×3 @ ~105kg+ → superset med-ball chest pass / plyo push-up 4×3',
                'Weighted pull-up 4×3 heavy',
                'Row 3×6; Pallof + rollout keep; curls/skull crushers cut to 1–2 sets or drop',
              ]}
            />
          </div>
        </div>
        <p className="mt-3 text-sm text-black/60 dark:text-white/60">Contrast rest: 4–6s between the heavy set and the jump; full rest between pairs.</p>
      </Card>

      <Card title="Block 3 (from Jan 12) — maintenance, 2 × reduced">
        <p className="text-sm text-black/70 dark:text-white/70">One heavy lower + one heavy upper, 2–3×3–5, heavy but low volume. Keep Nordics + Copenhagen (injury insurance), drop most accessories — team sessions are the priority now.</p>
      </Card>

      <Card title="On splitting your lower session">
        <p className="text-sm leading-relaxed text-black/70 dark:text-white/70">
          Keep the hamstring/adductor work separate from the main lift. Eccentric hamstring work is best placed <strong>after</strong> a
          hard/speed day, not before one — in the weekly template that means after Sunday's max velo (i.e. Monday), keeping a buffer before
          Wednesday's acceleration session. Because eccentric work adapts fast (repeated-bout effect), early mid-week soreness fades within
          a few weeks — another reason to start Nordics in Block 1.
        </p>
      </Card>
    </div>
  );
}
