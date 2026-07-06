export type SessionTag =
  | 'aerobic'
  | 'easy'
  | 'strength'
  | 'speed'
  | 'accel'
  | 'plyo'
  | 'vo2'
  | 'threshold'
  | 'rsa'
  | 'rest'
  | 'test'
  | 'team';

export interface DaySession {
  date: string; // ISO date
  weekday: string; // Sun, Mon, Tue, Wed, Thu, Fri, Sat
  dayType: 'free' | 'work';
  title: string;
  detail: string;
  tags: SessionTag[];
}

export interface WeekPlan {
  id: number;
  label: string;
  dateRange: string;
  phase: string;
  runKm: string;
  emphasis: string;
  isDeload?: boolean;
  isTestWeek?: boolean;
  isFlexWeek?: boolean;
  progressionNotes: string[];
  days: DaySession[];
}

// ---- helpers -------------------------------------------------------------

function d(date: string, weekday: string, dayType: 'free' | 'work', title: string, detail: string, tags: SessionTag[]): DaySession {
  return { date, weekday, dayType, title, detail, tags };
}

// ---- Block 0: Regeneration ------------------------------------------------

const week1: WeekPlan = {
  id: 1,
  label: 'Week 1',
  dateRange: 'Oct 13 – 19',
  phase: 'Block 0 — Regeneration',
  runKm: '~12',
  emphasis: 'Recover — easy running + mobility only; no sprinting, no lifting to failure',
  progressionNotes: [
    'No sprinting, no plyos, no lifting to failure this week.',
    'Get physio eyes on any lingering niggle from the season.',
  ],
  days: [
    d('2026-10-13', 'Tue', 'free', 'Easy Z2 + mobility', 'Easy 30–40 min run/bike/swim, Zone 2 (WHOOP). Full mobility circuit.', ['aerobic', 'easy']),
    d('2026-10-14', 'Wed', 'work', 'Off / mobility', 'Rest, or a gentle 20–30 min walk/jog if you want to move. Mobility.', ['rest']),
    d('2026-10-15', 'Thu', 'work', 'Light full-body lift', '~65–70% of in-season loads, 2–3 sets, technical focus. Zero fatigue by design.', ['strength']),
    d('2026-10-16', 'Fri', 'work', 'Easy Z2', '30–40 min easy park run, Zone 2.', ['aerobic', 'easy']),
    d('2026-10-17', 'Sat', 'work', 'Rest', 'Full rest or gentle stretching.', ['rest']),
    d('2026-10-18', 'Sun', 'free', 'Easy Z2 + mobility', '30–40 min easy run/bike/swim + mobility. Good day to get any niggle looked at.', ['aerobic', 'easy']),
    d('2026-10-19', 'Mon', 'free', 'Light full-body lift', '~65–70% of in-season loads, 2–3 sets.', ['strength']),
  ],
};

const week2: WeekPlan = {
  id: 2,
  label: 'Week 2',
  dateRange: 'Oct 20 – 26',
  phase: 'Block 0 — Regeneration',
  runKm: '~15',
  emphasis: 'Easy running; add strides late-week to wake the legs',
  progressionNotes: [
    'Introduce 4–6 × 60–80m strides (relaxed, building) Thu/Fri to prime the legs — still no maximal sprinting.',
    'Slightly more volume than Week 1, still all Zone 2.',
  ],
  days: [
    d('2026-10-20', 'Tue', 'free', 'Easy Z2 + mobility', '35–45 min easy run/bike/swim + mobility.', ['aerobic', 'easy']),
    d('2026-10-21', 'Wed', 'work', 'Off / easy jog', 'Rest, or 25–35 min easy jog + mobility.', ['rest', 'easy']),
    d('2026-10-22', 'Thu', 'work', 'Light full-body lift + strides', '~65–70% loads, 2–3 sets, then 4–6 × 60–80m relaxed strides.', ['strength', 'speed']),
    d('2026-10-23', 'Fri', 'work', 'Easy Z2 + strides', '35–45 min easy park run, then 4–6 × 60–80m relaxed strides.', ['aerobic', 'easy', 'speed']),
    d('2026-10-24', 'Sat', 'work', 'Rest', 'Full rest or gentle mobility.', ['rest']),
    d('2026-10-25', 'Sun', 'free', 'Easy Z2 + mobility', '35–45 min easy run/bike/swim + mobility.', ['aerobic', 'easy']),
    d('2026-10-26', 'Mon', 'free', 'Light full-body lift', '~65–70% loads, 2–3 sets.', ['strength']),
  ],
};

// ---- Block 1: General Preparation -----------------------------------------

const week3: WeekPlan = {
  id: 3,
  label: 'Week 3',
  dateRange: 'Oct 27 – Nov 2',
  phase: 'Block 1 — General Preparation',
  runKm: '~20',
  emphasis: 'Aerobic build + strength base begin; hills + VO₂ in',
  progressionNotes: [
    'Hill sprints: 4–6 × 20m uphill.',
    'Extensive plyos: ~60 quality contacts (pogos, ankling, low box jumps, snap-downs, skips).',
    'Strength base begins: main lifts move to 4–6 rep ranges, load starts low and will build weekly.',
    'Nordics introduced: 2 × 4 — banking eccentric hamstring strength before Block 2 sprint volume.',
  ],
  days: [
    d('2026-10-27', 'Tue', 'free', 'Easy longer run', 'Your volume day — comfortable Zone 2, plus mobility.', ['aerobic', 'easy']),
    d('2026-10-28', 'Wed', 'work', 'VO₂ intervals (track)', '12–20 × 30/30 (30s @ vVO₂max / 30s easy) — Zone 4–5. Rotate with 4–5 × 4min @ 90–95% HRmax / 3min easy on alternate weeks.', ['vo2']),
    d('2026-10-29', 'Thu', 'work', 'Full-body strength + Nordics (gym)', 'Bench 4×6 (build), weighted pull-up 4×5 (build), Bulgarian split squat 4×6 (build), split-stance RDL 3×6–8 (build), Nordics 2×4, Copenhagen/calf/hip-flexor march.', ['strength']),
    d('2026-10-30', 'Fri', 'work', 'Threshold run', '3–4 × 8 min @ comfortably-hard effort (top of Z3 / low Z4), 2 min easy. Swap for easy Z2 40–60 min if legs are cooked.', ['threshold']),
    d('2026-10-31', 'Sat', 'work', 'Rest / shakeout', 'Rest or gentle shakeout — keeps you fresh for Sunday.', ['rest']),
    d('2026-11-01', 'Sun', 'free', 'Sprint mechanics + hills + plyos → Lower strength', 'Wickets/A-skips/B-skips/build-ups, then hill sprints 4–6×20m (walk-down recovery), then ~60 contacts extensive plyos. Follow with lower strength (foundation): Bulgarian split squat, split-stance RDL, Nordics, Copenhagen, calf, hip-flexor march.', ['speed', 'plyo', 'strength']),
    d('2026-11-02', 'Mon', 'free', 'Upper strength + easy Z2', 'Bench 4×6, weighted pull-up 4×5, incline row, Pallof press, rollout. Then easy 30–40 min Z2 (park).', ['strength', 'aerobic']),
  ],
};

const week4: WeekPlan = {
  id: 4,
  label: 'Week 4',
  dateRange: 'Nov 3 – 9',
  phase: 'Block 1 — General Preparation',
  runKm: '~23',
  emphasis: 'Build volume; load creeps on the lifts',
  progressionNotes: [
    'Hill sprints: 6 × 25m.',
    'Extensive plyos: ~85 contacts (building toward Week 5 peak).',
    'Lift loads creep up across all main lifts (bench, pull-up, Bulgarian, RDL). Nordics: 2 × 5.',
  ],
  days: [
    d('2026-11-03', 'Tue', 'free', 'Easy longer run', 'Zone 2 volume + mobility.', ['aerobic', 'easy']),
    d('2026-11-04', 'Wed', 'work', 'VO₂ intervals (track)', 'Rotate format — 4–5 × 4min @ 90–95% HRmax / 3min easy, or 12–20 × 30/30.', ['vo2']),
    d('2026-11-05', 'Thu', 'work', 'Full-body strength + Nordics (gym)', 'Main lifts up in load from last week, same rep ranges (4×6 / 4×5 / 3×6–8). Nordics 2×5.', ['strength']),
    d('2026-11-06', 'Fri', 'work', 'Threshold run', '3–4 × 8 min @ comfortably-hard, 2 min easy. Swap for easy Z2 if cooked.', ['threshold']),
    d('2026-11-07', 'Sat', 'work', 'Rest / shakeout', 'Rest or gentle shakeout.', ['rest']),
    d('2026-11-08', 'Sun', 'free', 'Sprint mechanics + hills + plyos → Lower strength', 'Mechanics drills, hill sprints 6×25m, extensive plyos ~85 contacts, then lower strength (load up from Wk3).', ['speed', 'plyo', 'strength']),
    d('2026-11-09', 'Mon', 'free', 'Upper strength + easy Z2', 'Upper lifts up in load. Then easy 30–40 min Z2.', ['strength', 'aerobic']),
  ],
};

const week5: WeekPlan = {
  id: 5,
  label: 'Week 5',
  dateRange: 'Nov 10 – 16',
  phase: 'Block 1 — General Preparation',
  runKm: '~26',
  emphasis: 'Peak Block-1 volume; heaviest strength-base week',
  progressionNotes: [
    'Hill sprints: 6–8 × 30m + 2–3 flat accelerations @ 90%.',
    'Extensive plyos: ~110 contacts — the peak for this block.',
    'Heaviest strength-base week: bench toward ~100kg, Bulgarian toward 2×32.5–35kg, RDL toward 35kg, pull-up toward 20kg. Nordics: 3×5.',
  ],
  days: [
    d('2026-11-10', 'Tue', 'free', 'Easy longer run', 'Zone 2 volume + mobility — this is the peak-volume week, so keep it genuinely easy.', ['aerobic', 'easy']),
    d('2026-11-11', 'Wed', 'work', 'VO₂ intervals (track)', 'Rotate format — 12–20 × 30/30 or 4–5 × 4min.', ['vo2']),
    d('2026-11-12', 'Thu', 'work', 'Full-body strength + Nordics (gym)', 'Heaviest week of Block 1: bench ~100kg, pull-up ~20kg, Bulgarian ~2×35kg, RDL ~35kg. Nordics 3×5.', ['strength']),
    d('2026-11-13', 'Fri', 'work', 'Threshold run', '3–4 × 8 min @ comfortably-hard, 2 min easy.', ['threshold']),
    d('2026-11-14', 'Sat', 'work', 'Rest / shakeout', 'Rest or gentle shakeout.', ['rest']),
    d('2026-11-15', 'Sun', 'free', 'Sprint mechanics + hills + plyos → Lower strength', 'Mechanics drills, hill sprints 6–8×30m + 2–3 flat accels @90%, extensive plyos ~110 contacts (peak), then heaviest lower strength session.', ['speed', 'plyo', 'strength']),
    d('2026-11-16', 'Mon', 'free', 'Upper strength + easy Z2', 'Heaviest upper strength week. Then easy 30–40 min Z2.', ['strength', 'aerobic']),
  ],
};

const week6: WeekPlan = {
  id: 6,
  label: 'Week 6',
  dateRange: 'Nov 17 – 23',
  phase: 'Block 1 — General Preparation (back-off)',
  runKm: '~20',
  emphasis: 'Consolidate + test (Vmax, CMJ, 30-15/Yo-Yo)',
  isTestWeek: true,
  progressionNotes: [
    'Testing week — see the Testing page. Do the Vmax flying-sprint test, CMJ and a 30-15 IFT / Yo-Yo IR test, fresh, on a free day.',
    'Volume and load back off ~10% across the board to consolidate Block 1 before Block 2 begins.',
    'Hills sharpen (4–5 reps @30m — quality over volume). Extensive plyos drop to ~70 contacts.',
    'Nordics keep building despite the back-off: 3×6.',
  ],
  days: [
    d('2026-11-17', 'Tue', 'free', 'Easy longer run', 'Zone 2, reduced from last week\'s peak.', ['aerobic', 'easy']),
    d('2026-11-18', 'Wed', 'work', 'VO₂ intervals (reduced)', 'Lighter volume than Wk5 — e.g. 10–12 × 30/30.', ['vo2']),
    d('2026-11-19', 'Thu', 'work', 'Full-body strength (back-off)', 'Loads back ~10% off Week 5\'s peak. Nordics 3×6 (keep building).', ['strength']),
    d('2026-11-20', 'Fri', 'work', 'Easy Z2', 'Easy 40–50 min — no threshold this week, consolidating.', ['aerobic', 'easy']),
    d('2026-11-21', 'Sat', 'work', 'Rest / shakeout', 'Rest — stay fresh for testing.', ['rest']),
    d('2026-11-22', 'Sun', 'free', 'TEST DAY: Vmax, CMJ, 30-15/Yo-Yo', 'Full warm-up, then GPS flying-sprint Vmax test, countermovement jump, and a 30-15 IFT or Yo-Yo IR test. Fresh, fully rested, no other loading today.', ['test']),
    d('2026-11-23', 'Mon', 'free', 'Upper strength (back-off) + easy Z2', 'Loads back ~10%. Then easy 30 min Z2.', ['strength', 'aerobic']),
  ],
};

// ---- Block 2: Speed & Power -------------------------------------------------

const week7: WeekPlan = {
  id: 7,
  label: 'Week 7',
  dateRange: 'Nov 24 – 30',
  phase: 'Block 2 — Speed & Power',
  runKm: '~26',
  emphasis: 'Max-velo introduced @95%; strength → 3–5 reps + contrast',
  progressionNotes: [
    'Max velocity: 3–4 × fly20m @ 95% Vmax, full recovery 4–6 min between reps.',
    'Acceleration: 6 × 15m sled/resisted, full recovery.',
    'Intensive plyos: ~40 quality contacts (depth jumps, bounds, single-leg hops, hurdle hops).',
    'Lifts shift to max strength + contrast (heavy set → matched power move), 3–5 reps.',
    'Two speed sessions sit ~72h apart (Sun / Wed) with a full easy day between — the hamstring-safety buffer.',
  ],
  days: [
    d('2026-11-24', 'Tue', 'free', 'Easy longer run', 'Zone 2 — the deliberate down day between your two speed sessions.', ['aerobic', 'easy']),
    d('2026-11-25', 'Wed', 'work', 'Acceleration (track)', '6 × 15m sled/resisted, full recovery. ~72h after Sunday\'s max velo.', ['accel']),
    d('2026-11-26', 'Thu', 'work', 'Upper strength (gym)', 'Bench 4×4 heavy → med-ball chest pass / plyo push-up 4×3 (contrast). Weighted pull-up 4×3–4 heavy. Row 3×6.', ['strength']),
    d('2026-11-27', 'Fri', 'work', 'VO₂ intervals (track, on-feet)', '12–20 × 30/30 or 4–5 × 4min @ 90–95% HRmax — rotate. Keep on-feet for run-specific transfer.', ['vo2']),
    d('2026-11-28', 'Sat', 'work', 'Rest / shakeout', 'Rest or gentle shakeout — primes Sunday.', ['rest']),
    d('2026-11-29', 'Sun', 'free', 'Intensive plyos → Max velocity', '~40 contacts intensive plyos, then 3–4 × fly20m @ 95% Vmax, 4–6 min recovery. Stop a rep once it drops >3% off your best. Optional PM easy Z2 jog.', ['plyo', 'speed']),
    d('2026-11-30', 'Mon', 'free', 'Lower strength (max + contrast) → Nordics', 'Bulgarian split squat 4×4 heavy → box jumps 4×3. RDL/hip thrust 4×4–5 → broad jumps 4×3. Nordics 3×5–6. Copenhagen/calf/hip-flexor march.', ['strength']),
  ],
};

const week8: WeekPlan = {
  id: 8,
  label: 'Week 8',
  dateRange: 'Dec 1 – 7',
  phase: 'Block 2 — Speed & Power',
  runKm: '~30',
  emphasis: 'Build sprint quality + load',
  progressionNotes: [
    'Max velocity: 4 × fly20–25m, quality building.',
    'Acceleration: 6–8 × 15–20m sled/free.',
    'Intensive plyos: ~50–55 contacts.',
    'Strength loads continue building on the same 3–4 rep contrast scheme.',
  ],
  days: [
    d('2026-12-01', 'Tue', 'free', 'Easy longer run', 'Zone 2 down day between speed sessions.', ['aerobic', 'easy']),
    d('2026-12-02', 'Wed', 'work', 'Acceleration (track)', '6–8 × 15–20m sled/free, full recovery.', ['accel']),
    d('2026-12-03', 'Thu', 'work', 'Upper strength (gym)', 'Loads up from Wk7 — bench contrast, weighted pull-up, row.', ['strength']),
    d('2026-12-04', 'Fri', 'work', 'VO₂ intervals (track, on-feet)', 'Rotate format — try 40/20s or 4×4min this week.', ['vo2']),
    d('2026-12-05', 'Sat', 'work', 'Rest / shakeout', 'Rest or gentle shakeout.', ['rest']),
    d('2026-12-06', 'Sun', 'free', 'Intensive plyos → Max velocity', '~50–55 contacts, then 4 × fly20–25m, full recovery. Optional PM easy jog.', ['plyo', 'speed']),
    d('2026-12-07', 'Mon', 'free', 'Lower strength (max + contrast) → Nordics', 'Bulgarian → box jumps, RDL/hip thrust → broad jumps, loads up from Wk7. Nordics 3×5–6.', ['strength']),
  ],
};

const week9: WeekPlan = {
  id: 9,
  label: 'Week 9',
  dateRange: 'Dec 8 – 14',
  phase: 'Block 2 — Speed & Power',
  runKm: '~33',
  emphasis: 'Highest sprint quality (speed peak); peak volume',
  progressionNotes: [
    'Max velocity: 4–5 × fly20–30m — the speed peak of the whole plan. Maximal quality.',
    'Acceleration: 6–8 × 20m free sprints (drop the sled, go free this week).',
    'Intensive plyos: ~65 contacts.',
    'Strength peaks: heaviest contrast loads of the build (bench 4–5×3, Bulgarian/RDL 4×4).',
    'This is also peak weekly run volume (~33km) — all the more reason easy days stay genuinely easy.',
  ],
  days: [
    d('2026-12-08', 'Tue', 'free', 'Easy longer run', 'Zone 2 — protect this day, it buys the recovery for the speed peak.', ['aerobic', 'easy']),
    d('2026-12-09', 'Wed', 'work', 'Acceleration (track)', '6–8 × 20m free sprints, full recovery.', ['accel']),
    d('2026-12-10', 'Thu', 'work', 'Upper strength (gym)', 'Peak loads: bench 4–5×3 heavy → med-ball chest pass 4×3. Weighted pull-up 4×3 heavy.', ['strength']),
    d('2026-12-11', 'Fri', 'work', 'VO₂ intervals (track, on-feet)', 'Rotate format — 30/30s or 40/20s.', ['vo2']),
    d('2026-12-12', 'Sat', 'work', 'Rest / shakeout', 'Rest or gentle shakeout — critical before the speed peak.', ['rest']),
    d('2026-12-13', 'Sun', 'free', 'Intensive plyos → MAX VELOCITY (peak)', '~65 contacts, then 4–5 × fly20–30m — the speed peak of the block. Full 4–6min recovery, stop if quality drops >3%.', ['plyo', 'speed']),
    d('2026-12-14', 'Mon', 'free', 'Lower strength (peak) → Nordics', 'Peak loads: Bulgarian 4×4 heaviest → box jumps. RDL/hip thrust 4×4 heaviest → broad jumps. Nordics 3×5–6.', ['strength']),
  ],
};

const week10: WeekPlan = {
  id: 10,
  label: 'Week 10',
  dateRange: 'Dec 15 – 21',
  phase: 'Block 2 — Deload',
  runKm: '~20',
  emphasis: 'Drop volume ~40%, hold sprint quality',
  isDeload: true,
  isTestWeek: true,
  progressionNotes: [
    'Deload: total volume drops ~40–50% across running, lifting and plyos — this is where the last 3 weeks of adaptation actually lands.',
    'Max velocity: 2–3 × fly20m — fewer reps, same intent (crisp, not maximal volume).',
    'Acceleration: 4–5 reps, reduced.',
    'Intensive plyos: ~30 contacts.',
    'Lifts: lighter loads, fewer sets.',
    'Good week to retest a marker or two (CMJ, splits) if you want a mid-block check — full retest isn\'t essential here, Wk13 covers it before the return.',
  ],
  days: [
    d('2026-12-15', 'Tue', 'free', 'Easy shorter run', 'Zone 2, reduced volume.', ['aerobic', 'easy']),
    d('2026-12-16', 'Wed', 'work', 'Acceleration (reduced)', '4–5 reps, full recovery.', ['accel']),
    d('2026-12-17', 'Thu', 'work', 'Upper strength (deload)', 'Lighter loads, fewer sets — deliberately easy.', ['strength']),
    d('2026-12-18', 'Fri', 'work', 'VO₂ intervals (reduced)', 'Shorter session — e.g. 8–10 × 30/30.', ['vo2']),
    d('2026-12-19', 'Sat', 'work', 'Rest', 'Full rest.', ['rest']),
    d('2026-12-20', 'Sun', 'free', 'Light plyos → Max velocity (reduced)', '~30 contacts, then 2–3 × fly20m, full recovery. Quality stays high, volume drops.', ['plyo', 'speed']),
    d('2026-12-21', 'Mon', 'free', 'Lower strength (deload) → Nordics', 'Lighter loads, fewer sets. Nordics maintained 3×5.', ['strength']),
  ],
};

const week11: WeekPlan = {
  id: 11,
  label: 'Week 11',
  dateRange: 'Dec 22 – 28',
  phase: 'Block 2 — Christmas (flex)',
  runKm: '~18',
  emphasis: 'Keep it light and moveable; maintain, don\'t stress the plan',
  isFlexWeek: true,
  progressionNotes: [
    'Move sessions around family commitments and Christmas Day freely — nothing here needs to land on a fixed day.',
    'Max velocity: 3 × fly20m (light). Acceleration: light. Intensive plyos: ~35–40 contacts.',
    'Lifts: light/maintenance loads.',
    'The goal this week is simply not losing ground — nothing to chase, nothing to prove.',
  ],
  days: [
    d('2026-12-22', 'Tue', 'free', 'Easy run', 'Zone 2, whenever it fits.', ['aerobic', 'easy']),
    d('2026-12-23', 'Wed', 'work', 'Acceleration (light)', 'A handful of easy reps — move it if the week is busy.', ['accel']),
    d('2026-12-24', 'Thu', 'work', 'Light lift or off', 'Upper strength light, or skip if travelling/family commitments.', ['strength']),
    d('2026-12-25', 'Fri', 'work', 'Christmas Day — off', 'Full rest. Move any missed session to another day this week.', ['rest']),
    d('2026-12-26', 'Sat', 'work', 'Easy movement', 'Easy walk/jog if you feel like moving; otherwise rest.', ['aerobic', 'easy']),
    d('2026-12-27', 'Sun', 'free', 'Light plyos → Max velocity (light)', '~35–40 contacts, then 3 × fly20m, easy quality, full recovery.', ['plyo', 'speed']),
    d('2026-12-28', 'Mon', 'free', 'Lower strength (light) → Nordics', 'Maintenance loads. Nordics 3×5.', ['strength']),
  ],
};

const week12: WeekPlan = {
  id: 12,
  label: 'Week 12',
  dateRange: 'Dec 29 – Jan 4',
  phase: 'Block 2 — Speed → Convert',
  runKm: '~33',
  emphasis: 'Speed held + heavy contrast; Fri → special endurance (5–6×150m)',
  progressionNotes: [
    'Max velocity: 4 × fly20–30m — hold the quality from the Week 9 peak.',
    'Acceleration: 6 × 20m — hold.',
    'Intensive plyos: ~50 contacts.',
    'Lifts: second peak — heavy contrast loads, mirroring Week 9.',
    'Friday shifts from VO₂ to special endurance: 5–6 × 150m @ ~90%, 3–4 min recovery (~900m of quality high-speed running — right on your CHB game HSR load).',
  ],
  days: [
    d('2026-12-29', 'Tue', 'free', 'Easy longer run', 'Zone 2 volume day.', ['aerobic', 'easy']),
    d('2026-12-30', 'Wed', 'work', 'Acceleration (track)', '6 × 20m, full recovery — holding Week 9 quality.', ['accel']),
    d('2026-12-31', 'Thu', 'work', 'Upper strength (2nd peak)', 'Heavy contrast loads, matching the Week 9 peak.', ['strength']),
    d('2027-01-01', 'Fri', 'work', 'Special endurance (track)', '5–6 × 150m @ ~90%, 3–4 min recovery. ~900m of quality HSR.', ['rsa']),
    d('2027-01-02', 'Sat', 'work', 'Rest / shakeout', 'Rest or gentle shakeout.', ['rest']),
    d('2027-01-03', 'Sun', 'free', 'Intensive plyos → Max velocity (hold)', '~50 contacts, then 4 × fly20–30m, holding peak quality.', ['plyo', 'speed']),
    d('2027-01-04', 'Mon', 'free', 'Lower strength (2nd peak) → Nordics', 'Heavy contrast loads, matching Week 9. Nordics 3×5–6.', ['strength']),
  ],
};

const week13: WeekPlan = {
  id: 13,
  label: 'Week 13',
  dateRange: 'Jan 5 – 11',
  phase: 'Block 2 — Bridge',
  runKm: '~26',
  emphasis: 'Fri → team-format RSA session; speed sharp; pull back — fresh for Jan 12',
  isTestWeek: true,
  progressionNotes: [
    'Max velocity: 3–4 × fly (sharp) — sharpening, not chasing more volume.',
    'Acceleration: 4–5 reps (sharp).',
    'Intensive plyos: ~40 contacts.',
    'Lifts: maintenance — reduce volume, stay heavy.',
    'Friday becomes the team-format intermittent session (see below) — rehearses the exact squad session so your first night back is comfortable, not a shock.',
    'Pull back through the week overall. Good week to retest key markers (Vmax, CMJ, splits) before the team return.',
    'Team returns ~2nd week of January — this is the last week of your own programming before Block 3.',
  ],
  days: [
    d('2027-01-05', 'Tue', 'free', 'Easy longer run', 'Zone 2, pulling back overall this week.', ['aerobic', 'easy']),
    d('2027-01-06', 'Wed', 'work', 'Acceleration (sharp)', '4–5 reps, full recovery, sharp not exhausting.', ['accel']),
    d('2027-01-07', 'Thu', 'work', 'Upper strength (maintenance)', 'Reduced volume, stay heavy.', ['strength']),
    d('2027-01-08', 'Fri', 'work', 'Team-format session (track)', '8 min on / 3 min off → 6 × (40s on/20s off) / 2 min → 8 × (20s on/20s off) / 2 min → 8 × (15s on/15s off). Rehearses the exact squad format.', ['rsa', 'team']),
    d('2027-01-09', 'Sat', 'work', 'Rest / shakeout', 'Rest — staying fresh for the team return.', ['rest']),
    d('2027-01-10', 'Sun', 'free', 'Light plyos → Max velocity (sharp)', '~40 contacts, then 3–4 × fly, sharpening quality one last time.', ['plyo', 'speed']),
    d('2027-01-11', 'Mon', 'free', 'Lower strength (maintenance) → Nordics', 'Reduced volume, stay heavy. Nordics maintained. Last individual session before the squad takes over Tuesday.', ['strength']),
  ],
};

export const WEEKS: WeekPlan[] = [week1, week2, week3, week4, week5, week6, week7, week8, week9, week10, week11, week12, week13];

export const BLOCK3 = {
  title: 'Block 3 — Conversion / Pre-season',
  dateRange: 'From ~Jan 12 onward',
  summary: 'Team returns the 2nd week of January: one track session, ramping to two by late Jan/early Feb, then pitch work by mid-February. Their mixed intermittent sessions become your main conditioning — your own remaining sessions protect speed and strength, because the team won\'t develop those.',
  points: [
    'Keep 1–2 short speed touches/week (a max-velo or acceleration session on a fresh free day) — this is the quality that erodes fastest once collective running takes over.',
    'Keep 2 lifts/week at reduced volume: one heavy lower + one heavy upper, 2–3 × 3–5 reps.',
    'Keep Nordics + Copenhagen (injury insurance); drop most accessories — team sessions are the priority now.',
    'Keep at most ONE repeat-effort session of your own (RSA 2×6×30m @25–30s recovery, or special endurance 5–6×150m) — and only if the team\'s isn\'t hitting it. Drop entirely once you\'re at two team sessions + pitch.',
    'Easy running fills the remaining days for volume.',
    'Watch the load when a hard team session lands on a work day: treat it as that day\'s hard slot, don\'t stack anything on it, and keep max velocity on a fresh free day.',
  ],
};

export const ATHLETE_PROFILE = {
  age: 24,
  weight: '82kg',
  height: '183cm',
  positions: 'CHB / FB',
  vmax: '9.5 m/s (34.2 km/h)',
  tenK: '39:30',
  vo2: '60 (Garmin estimate)',
  chbHsr: '~1.2km HSR / 10km TD',
  fbHsr: '~0.7km HSR / 7km TD',
  window: 'Season ends ~2nd week October → ~12 weeks of true off-season before pre-season resumes.',
};
