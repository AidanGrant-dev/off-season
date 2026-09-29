import type { GateId, PhaseId } from './plan';

export const TITLE = 'Off-Season Plan 2026–27: Rehab, Speed & Dundalk 10k';

export const OVERVIEW =
  'Nineteen weeks in five phases: rehab and rebuild on the bike first, then graded running and sprinting, peaking for Dundalk on 31 Jan. Each phase opens on criteria, not dates: pass its gate (see Monitoring) with your physio’s agreement.';

export const GOALS = [
  'Clear all three injuries: the grade 2 hamstring with nerve irritation, the abdominal strain, and the scapular weakness behind your shoulder issue.',
  'Reach the first pitch session (week of 1 Feb) faster and fitter, with the hamstring re-exposed to full sprinting.',
  'Run the Dundalk 10k on Sun 31 Jan (B goal).',
  'Cut from 83 kg to 79 kg without slowing rehab.',
  'Hold strength, and gain some while running is limited.',
];

export interface KeyDate {
  date?: string; // ISO; undefined = pending
  label: string;
  event: string;
  plan: string;
}

export const KEY_DATES: KeyDate[] = [
  { label: 'Pending', event: 'Hamstring scan', plan: 'If it shows tendon involvement (2c), push Phases 2–3 back ~2 weeks' },
  { date: '2026-10-11', label: '11 Oct', event: 'HYROX sim', plan: 'Off' },
  { date: '2026-11-11', label: '11 Nov', event: 'HYROX Doubles', plan: 'Left out of this plan; withdraw (W6 check if still keen)' },
  { date: '2026-12-25', label: '25 Dec', event: 'Christmas (W14)', plan: 'Reduced week' },
  { date: '2027-01-03', label: 'Sun 3 Jan', event: 'Strength tests: lower body and jumps', plan: 'Front squat and trap bar 3RM, CMJ, broad jump' },
  { date: '2027-01-05', label: 'Tue 5 Jan', event: '5k time trial', plan: 'Sets 10k pace' },
  { date: '2027-01-07', label: 'Thu 7 Jan', event: 'Strength tests: upper body', plan: 'Bench 3RM, max chin-ups' },
  { date: '2027-01-31', label: '31 Jan', event: 'Dundalk 10k', plan: 'Race' },
  { date: '2027-02-01', label: 'w/c 1 Feb', event: 'First pitch session', plan: 'Return-to-pitch checklist complete' },
];

export interface Phase {
  id: PhaseId;
  name: string;
  weeks: string;
  dates: string;
  aim: string;
  running: string;
  gym: string;
}

export const PHASES: Phase[] = [
  { id: 1, name: 'Protect and restore', weeks: 'W1–2', dates: '21 Sep–4 Oct', aim: 'Settle symptoms, early loading', running: 'Pool walking, deep-water running', gym: '2× upper, supported' },
  { id: 2, name: 'Rebuild', weeks: 'W3–6', dates: '5 Oct–1 Nov', aim: 'Strength block, bike base', running: 'Walk–jog from ~W4', gym: '3×' },
  { id: 3, name: 'Return to speed', weeks: 'W7–10', dates: '2–29 Nov', aim: 'Graded running, sprint ladder to ≥95%', running: '16–22 km/wk', gym: '2×' },
  { id: 4, name: 'Build', weeks: 'W11–16', dates: '30 Nov–10 Jan', aim: 'Speed and 10k fitness', running: '23–35 km/wk', gym: '2× heavy' },
  { id: 5, name: 'Sharpen and race', weeks: 'W17–19', dates: '11–31 Jan', aim: 'Race-specific work, GAA prep, taper', running: '34 km, then taper + race', gym: '1–2×' },
];

export const PHASE_NOTE =
  'The timeline assumes a 2a/2b hamstring (no tendon involvement). If the scan shows 2c, Phase 4 shortens; the race and pitch dates don’t move.';

export const WEEKLY_INTRO =
  'Your days off (Sun–Tue) carry sprinting, the long run and the key 10k session, when you’re fresh and it’s light. Work evenings (Wed–Sat) carry gym, bike and easy running; the 15–20 min rehab block happens every day.';

export const WEEKLY_RULES = [
  'Keep 48 h between hard leg sessions (sprints, VO2 work, heavy lower).',
  'Keep Saturday light so Sunday’s sprints are fresh. If Sunday’s weather is bad, sprint on Monday and move Tuesday’s quality run to Wednesday evening.',
  'Wednesday, your first workday, is the default rest day. Rest on Saturday too whenever fatigue, sleep or symptoms are off.',
  'Running totals are ceilings, not quotas: step up only after passing the relevant gate, and repeat a week if symptoms say so.',
];

// ---- Rehab ---------------------------------------------------------------

export interface Stage {
  name: string;
  when: string;
  items: string[];
}

export interface Injury {
  id: 'hamstring' | 'ab' | 'scapula';
  name: string;
  intro?: string;
  stages: Stage[];
  extra?: { title: string; items: string[] };
}

export const INJURIES: Injury[] = [
  {
    id: 'hamstring',
    name: 'Hamstring (grade 2, nerve irritation)',
    stages: [
      {
        name: 'Early',
        when: 'now to ~W2',
        items: [
          'Isometrics in inner, middle and outer range: 3 × 6 × 5 s in each position, aiming for 2–3/10 pain.',
          'Neural slider on your back, hands clasped behind the knee: 3 × 8. Keep it gentle; tingling should fade within a minute. Sliders only, no tensioners, until your physio says.',
          'Single-leg glute bridge: 3 × 10 with 5 s holds.',
          'Daily walking and pool walking.',
          'Avoid: static hamstring stretching (especially slumped or long-sitting reaches), deep massage on the injury, running, and cycling until Gate A.',
          'Your physio sets the progression each week; typical next steps are longer holds, more effort in the outer range, then longer-lever bridges.',
        ],
      },
      {
        name: 'Isotonic strength',
        when: '~W3–6',
        items: [
          'Single-leg bridge, heel on bench: 3 × 8–12.',
          '45° hip extension, bodyweight then loaded: 3 × 8–10.',
          'RDL, dowel to dumbbells to bar: 3 × 6–10, within a pain-free range.',
          'Slow leg curl (machine or sliders, 3 s lowering): 3 × 6–8.',
          'Askling lengthening set (extender, diver, glider): 1 set each, 3×/week, building to 2–3 sets.',
        ],
      },
      {
        name: 'Eccentric and speed',
        when: '~W5–10',
        items: [
          'Nordics: band-assisted or partial range, progressing to full; 2–3 × 3–5, 1–2×/week.',
          'RDL 3 × 5, heavier; single-leg RDL 3 × 6 per side.',
          'Heavy long-length isometric: single-leg long-lever bridge hold, 3 × 20–30 s.',
          'High-speed drills before runs, 2×/week: A-skips, B-skips, straight-leg bounds, low volume.',
          'Sprint ladder (see Running).',
        ],
      },
      {
        name: 'Maintain',
        when: 'W11 on, all season',
        items: ['Nordics 2 × 4–6, 1–2×/week; RDL or hip extension 1×/week; one ≥95% sprint session every week.'],
      },
    ],
    extra: {
      title: 'Nerve irritation',
      items: [
        'Nerve symptoms (tingling, burning, pain below the knee, symptoms when sitting) are a separate signal from muscle pain. If a session raises them and they haven’t settled within 24 h, go back a step and tell your physio.',
        'Numbness, foot or ankle weakness, or symptoms spreading: see your physio or GP promptly rather than waiting for the next session.',
        'Commute (~100 min driving a day): set the seat so your knee stays bent at the pedals, use lumbar support, and walk for a few minutes on arrival.',
        'No static hamstring stretching in slumped or long-sit positions until cleared; those positions tension the nerve as well as the muscle.',
      ],
    },
  },
  {
    id: 'ab',
    name: 'Abdominal strain',
    stages: [
      {
        name: 'Protect',
        when: 'now to pain-free daily life, ~W1–2',
        items: [
          'Dead bugs, 5 sets: short lever, progressing to long lever.',
          'Half-kneeling holds, 2 sets.',
          'If pain-free, add bird dogs 2 × 8 per side and a short (knees-down) side plank 3 × 20 s.',
          'Avoid: sit-ups, crunches, hanging, heavy bracing (heavy squats and deadlifts), heavy overhead pressing, sprinting, kicking.',
        ],
      },
      {
        name: 'Anti-extension and anti-rotation',
        when: '~W3–5',
        items: [
          'Pallof press, half-kneeling to split stance to standing: 3 × 10 per side.',
          'Full side plank and front plank variations: 3 × 30–45 s.',
          'Suitcase and farmer’s carries: 3 × 30–40 m.',
          'Bring heavy lifts back over 2–3 weeks, only while bracing stays pain-free.',
        ],
      },
      {
        name: 'Rotation and power',
        when: '~W5–10',
        items: [
          'Cable chops and lifts: 3 × 8 per side.',
          'Med ball rotational throws, light to moderate: 3 × 6 per side.',
          'Ab wheel rollouts, partial to full range: 3 × 6–8. Hanging knee raises: 3 × 8.',
          'Copenhagen planks, short to long lever: 2–3 × 20–30 s per side.',
        ],
      },
      {
        name: 'Sport',
        when: 'W11 on',
        items: [
          'Full sprinting, overhead med ball throws, fielding.',
          'Kicking ladder (also a hamstring test), 20–30 kicks 2×/week: 10–15 m kick-passes off both feet, then 20–30 m, then 40 m+, then frees and sidelines. Step up only if pain-free the next morning.',
        ],
      },
    ],
  },
  {
    id: 'scapula',
    name: 'Scapula and shoulder',
    intro: 'The shoulder is symptom-free, so this is prevention: scapular strength 3×/week and mobility daily, building to overhead and contact loading before February.',
    stages: [
      {
        name: 'Control and endurance',
        when: 'W1–4, 3×/week',
        items: [
          'IYWT, 3 sets: 8–10 reps per letter at 0–2 kg, 2 s hold at the top.',
          'Serratus wall slide with foam roller and lift-off: 3 × 10.',
          'Side-lying external rotation: 3 × 12–15.',
          'Push-up plus, wall to bench: 3 × 10.',
        ],
      },
      {
        name: 'Strength',
        when: 'W5–10',
        items: [
          'Face pulls 3 × 12; incline dumbbell Y raise 3 × 10.',
          'Half-kneeling landmine press: 3 × 8 per side (trains the trunk too).',
          'Floor push-up plus 3 × 10; cable external rotation at 90° 3 × 10.',
          'Bottoms-up kettlebell carry: 3 × 20 m per side.',
        ],
      },
      {
        name: 'Power and contact prep',
        when: 'W11 on',
        items: [
          'Overhead carries 3 × 20 m; Turkish get-up 2 × 3 per side.',
          'Med ball chest pass and overhead throw 3 × 6; drop push-ups 3 × 5.',
          'Fielding (jump and catch overhead), then shoulder contact drills once your physio clears them.',
          'Keep 2×/week through the season.',
        ],
      },
    ],
    extra: {
      title: 'Daily mobility (5–10 min)',
      items: [
        'Pec stretch, 2 × 30–45 s.',
        'Overhead dowel stretch, 2 sets.',
        'Thoracic extension over a foam roller, 1–2 min; open books, 2 × 8 per side.',
        'Bench press and weighted chin-ups carry on in the gym plan. End any set where the shoulder feels unstable or pinches.',
      ],
    },
  },
];

// ---- Running -------------------------------------------------------------

export const RUN_LADDER = [
  '10 × (1 min jog / 1 min walk)',
  '6 × (3 min jog / 1 min walk)',
  '20 min continuous, easy',
  '30 min continuous, easy',
];

export const SPRINT_LADDER = [
  { step: 'S1', reps: '4–6 × 60 m strides', intensity: '60–70%', week: 'W5' },
  { step: 'S2', reps: '4–6 × 60 m', intensity: '~80%', week: 'W6–7' },
  { step: 'S3', reps: '4–6 × 40–60 m build-ups', intensity: '~90%', week: 'W8' },
  { step: 'S4', reps: '3–5 × 20–30 m flying', intensity: '≥95%', week: 'W9–10' },
];

export const SUNDAY_SPRINT = [
  'Warm-up, 15 min: jog, dynamic mobility, A- and B-skips, 3 build-ups.',
  'Acceleration: 6 × 10–20 m, walk-back recovery.',
  'Max velocity: 4–6 × 20–30 m flying (20 m run-in), 3–4 min recovery.',
  'From W10, change of direction and deceleration: 45° and 90° cuts, and stopping in 3 steps, 4–6 per side. Sit the hips back when you brake.',
];

export const STATSPORTS_NOTE =
  'Your tracker logs HSR above 5.5 m/s (~19.8 km/h) — faster than 10k pace, so weekly HSR will come almost entirely from the Sunday flying reps. In-season (18 Apr–29 Aug) you averaged ~1,180 m HSR/week, ~19.5 km distance and ~1,800 AU sRPE. Treat ~1,180 m as a return-to-pitch benchmark, not an off-season target. Load check: aim for a 4-week average of ~1,800–2,000 AU by W16–18.';

export const FITNESS_SESSIONS = [
  { type: 'Threshold', progression: '3×8 min → 3×10 min → 2×15 min → 20 min continuous; 2 min jog between reps', intensity: 'Comfortably hard, HR ~170–180' },
  { type: 'VO2', progression: '5×800 m → 5–6×1 km; 2–2.5 min jog', intensity: '5k pace, reaching 180+ bpm in each rep' },
  { type: 'Race pace', progression: '3×3 km (W17), 5×1 km (W18), 4×1 km (W19)', intensity: '10k pace' },
  { type: 'Long and easy runs', progression: 'Long run 50 → 80 min; last 10–15 min steady from W13', intensity: 'Under ~150 bpm (steady finish up to ~160)' },
  { type: 'GAA conditioning (W17–18)', progression: 'W17: repeated sprints 2 × 6 × 30 m, every 25 s. W18: 15/15 runs, 3 × 6 min (~70–80 m per 15 s), 3 min between sets', intensity: 'Hold 160+ bpm for 15–20 min' },
];

export const OFF_FEET = [
  { session: 'Bike Z2 (Mon)', rx: '200–225 W. First rides 45–60 min, then build to 70, 80 and 90 min (W4–6). Expect ~135–149 bpm. Same watts at lower HR over the weeks = aerobic base improving.' },
  { session: 'Bike Z2 top-up (Mon, W7 on)', rx: 'After the long run, ride easy until ~90 min of aerobic work in total.' },
  { session: 'Elliptical Z2', rx: 'P2: Fri, 45–60 min. P3–P4: Wed, 30–40 min. 135–149 bpm; fixed handles while the ab is in Stages 1–2.' },
  { session: 'Incline walk', rx: 'P2: Sun after Gym A, 30 min brisk at 5–10% incline. Also a swap for any easy session.' },
  { session: 'Bike tempo', rx: '3 × 10 min at ~280–300 W (~90% of 310–340 W FTP estimate). First exposure W3 (Tue, after Gate A): 2 × 10 min, seated.' },
  { session: 'Bike VO2', rx: '4 × 4 min at ~380–400 W, 180–190 bpm, 3 min easy. Tuesdays in P2, then alternate Fridays W7–16, building to 5 × 4.' },
  { session: 'Bike 15/15s', rx: '2 × 6–8 min of 15 s at ~450–470 W / 15 s easy, 5 min easy between sets. The other Fridays W8–16.' },
];

export const OFF_FEET_RULES = [
  'Stay seated on the bike until W7, with no standing sprints before Gate C.',
  'Add 10 min to a Z2 ride only if the last one drifted < ~5% in heart rate at steady watts and the nerve stayed quiet. Fill gaps with bike or elliptical Z2, not extra running.',
  'Long sitting tensions the sciatic nerve. Keep the bars high and the saddle low enough that your knee stays softly bent. If the nerve objects to long rides, shift Z2 time to the elliptical.',
];

// ---- Strength -------------------------------------------------------------

export const LOAD_RULES =
  'The main lifts (front squat, trap bar, bench, weighted chin-up) run on RPE; kg figures are starting guides. Work up to a top set at the target RPE, then back-off sets ~5–10% lighter. Re-estimate each lift from a top set in W6 and W10 and base Phase 4 loads on that. Rest 3–5 min between heavy sets.';

export const PRIORITIES =
  'Priorities: the 10k, front squat and trap bar, jumps, then bench and chin-ups. If Sunday’s lifting leaves your legs heavy for Monday’s long run, drop the top set and do back-offs only.';

export interface GymPhase {
  title: string;
  note?: string;
  sessions: { name: string; body: string }[];
}

export const GYM_PHASES: GymPhase[] = [
  {
    title: 'Phase 1 (W1–2): 2×/week, RPE ≤7, no breath-holding',
    sessions: [
      { name: 'Upper', body: 'Chest-supported row 3 × 8–10; neutral-grip lat pulldown 3 × 8–10; machine or dumbbell bench 3 × 8; face pulls 3 × 12, plus scapular Stage 1.' },
      { name: 'Good side', body: 'Single-leg work if the trunk tolerates it (leg press 3 × 8, step-ups 3 × 8). Training the good leg helps the injured side keep some strength.' },
      { name: 'Calf', body: 'Overcoming isometrics 2×/week (3 × 5 s max effort at stretched, mid-range and near-top) plus isotonic raises 1×/week, 3 × 12 with 3 s lowering (single-leg with 20 kg DB).' },
    ],
  },
  {
    title: 'Phase 2 (W3–6): 3×/week, loads building',
    note: 'Heavy squats and deadlifts wait until bracing is pain-free (ab Stage 2).',
    sessions: [
      { name: 'A (Sun), lower', body: 'Front squat 4 × 5 on RPE (start ~70 kg, +2.5–5 kg a session while RPE ≤7 and bracing pain-free; ≤ RPE 8 in Phase 2); Bulgarian split squat 3 × 6–8 per side from 2 × 20 kg; hip thrust 3 × 8; hamstring Stage 2; calf isometrics + raise 3 × 12.' },
      { name: 'B (Tue), upper', body: 'Bench: top set of 5 at RPE 8 (~97.5 kg), then 3 × 5 ~5% lighter; weighted chin-up 4 × 5 from +5 kg; chest-supported row 3 × 8; landmine press 3 × 8 per side; scapular and ab stage work.' },
      { name: 'C (Thu), full body', body: 'Trap bar deadlift 3 × 5 from W5, from ~120 kg adding 5–10 kg a session while RPE ≤7 and the hamstring is quiet next morning, towards ~150 kg; step-ups 3 × 8; single-arm row 3 × 8; push-up plus 3 × 10; carries.' },
    ],
  },
  {
    title: 'Phase 3 (W7–10): 2×/week + short upper on Tuesday',
    sessions: [
      { name: 'A (Sun, after sprints)', body: 'Front squat 4 × 3–5 at RPE 7–8 (~85–90 kg by W9); RDL 3 × 5 in W7, then trap bar 3 × 5 from W8 (~150 kg, +5 kg a week while RPE ≤8) with single-leg RDL 3 × 6; Nordics 2–3 × 3–5; CMJ 3 × 5; pogos 2 × 15 → 3 × 20; calf isometrics; broad jumps 3 × 3 from W7; CMJ + broad-jump baseline Sun 15 Nov.' },
      { name: 'B (Thu)', body: 'Bench 4 × 3–5; weighted chin-up 4 × 4–5, plus a bodyweight max-rep set every second week (log it); row 3 × 6; landmine press; med ball throws 3 × 5; scapular Stage 2; ab Stage 3.' },
      { name: 'D (Tue, after the run, W7–15)', body: 'Short upper, ~30 min: bench 3 × 5 at RPE 7 (~85% of Thursday’s top set); chin-ups 3 sets of ~60–70% max reps; face pulls 2 × 12. Skip W14 and W16.' },
    ],
  },
  {
    title: 'Phase 4 (W11–16): 2×/week + short upper on Tuesday',
    sessions: [
      { name: 'A (Sun, after sprints)', body: 'Peaking block (see test block table). Broad jumps 3 × 3; Nordics 2 × 4–6; bounds 3 × 5; from ~W12, past Gate D: depth jumps 3 × 4 (≤0.2 s contact), lateral bounds 3 × 4/side, SL lateral hops 2 × 6/side. Calf isometrics 1×/week.' },
      { name: 'B (Thu)', body: 'Bench 3 × 3–5, +2.5 kg a week while RPE ≤8 (top triple ~107.5 kg in W13); weighted chin-up 3 × 3–5 + bodyweight max every second week; Bulgarian split squat 2 × 6 @ RPE 7; med ball throws; Copenhagens; scapular Stage 3; ab Stage 4; in W14–15 add Nordics 1 × 4.' },
    ],
  },
  {
    title: 'Phase 5 (W17–19)',
    sessions: [
      { name: 'Thu (W17–18)', body: 'Full body, 2 × 3 on the main lifts, plus Nordics, depth jumps, lateral bounds and throws.' },
      { name: 'W19', body: 'Monday 25 Jan only, at half volume.' },
    ],
  },
];

export const TEST_BLOCK = [
  { week: 'W11 (30 Nov–6 Dec)', fs: '3 × 3 at ~85% of W10 re-estimate', tb: '3 × 3 at ~165 kg', bench: '3 × 3–5, +2.5 kg a week while RPE ≤ 8' },
  { week: 'W12 (7–13 Dec)', fs: '3 × 3 at ~90% of W10 re-estimate', tb: '3 × 3 at ~170 kg', bench: 'Same rule' },
  { week: 'W13 (14–20 Dec)', fs: 'Top triple RPE 8–8.5 (~97.5–102.5 kg), then 2 × 3 at ~90 kg', tb: 'Top triple ~177–182 kg, then 2 × 3 at ~165 kg', bench: 'Top triple ~107.5 kg (RPE ≤ 8.5 = on track for 115)' },
  { week: 'W14 (21–27 Dec)', fs: 'Optional 2 × 3 at ~90 kg', tb: 'Optional 2 × 3 at ~150 kg', bench: 'Optional 2 × 3 at ~100 kg' },
  { week: 'W15 (28 Dec–3 Jan)', fs: 'Test Sun 3 Jan', tb: 'Test Sun 3 Jan', bench: 'Light 2 × 3 at ~100 kg (Thu 31 Dec); test Thu 7 Jan' },
];

export const BASELINES = [
  { lift: 'Front squat', previous: 110, target: '~105 (110 stretch)', recent: '80 × 5 × 2, 90 × 4 (Feb) → 3RM ~96–102' },
  { lift: 'Trap bar deadlift', previous: 187, target: '~187', recent: '182 × 3 × 2 (8 Mar)' },
  { lift: 'Bench press', previous: 115, target: '~115', recent: '100 × 5 × 2 @ RPE 9 (late Sep) ≈ 110 3RM' },
  { lift: 'Chin-ups (BW)', previous: null, target: '—', recent: '10, 8, 8 at ~83 kg' },
];

export const TEST_GATING =
  'Test front squat and trap bar to 3RM only if bracing has been pain-free through W11–13, Gate D is passed, hamstring strength is within ~10% of the other side, and your physio agrees. Otherwise test a 5RM (or skip the trap bar) and don’t compare it directly with the old 3RM.';

// ---- Monitoring -------------------------------------------------------------

export const TRAFFIC_LIGHTS = [
  { signal: 'Green', meaning: 'Rehab exercises up to 3/10; training ≤2/10; back to baseline by next morning', action: 'Progress as planned' },
  { signal: 'Amber', meaning: '4/10 during, or still above baseline next morning', action: 'Repeat the step; don’t progress' },
  { signal: 'Red', meaning: '≥5/10, sharp pain, or new or worse nerve symptoms', action: 'Stop that activity, drop back a stage, contact your physio' },
];

export const DELOAD_RULE =
  'A week with two or more amber days makes the next week a deload: cut run km by ~25%, keep strides and one quality session, and trim (don’t skip) the sprint session.';

export interface HrTarget {
  easy: [number, number]; // minutes
  steady: [number, number];
  hard: [number, number];
  max: [number, number];
}

export const HR_TARGETS: Record<PhaseId, HrTarget> = {
  1: { easy: [120, 180], steady: [0, 10], hard: [0, 10], max: [0, 0] },
  2: { easy: [165, 210], steady: [0, 15], hard: [10, 20], max: [5, 10] },
  3: { easy: [195, 255], steady: [0, 20], hard: [20, 30], max: [10, 15] },
  4: { easy: [210, 255], steady: [0, 20], hard: [20, 35], max: [20, 25] },
  5: { easy: [195, 225], steady: [0, 20], hard: [25, 30], max: [20, 30] },
};

export const HR_NOTES = [
  'Bands: Easy < 150 (Whoop Z0–2), Steady 150–160, Hard 160–180, Max 180+ (Whoop Z5). Whoop’s Z3 runs to 164, so read the 160–164 slice in LoadPulse.',
  'W19 race week: Hard ~10 min, Max ~10 min.',
  'Keep at least 75–80% of your running under ~150 bpm.',
  'Caps until February: ≤ ~65 min/week at 160+, ~30 min at 180+ and ~4:30 under 160. From W12, after three clean weeks, the 180+ cap can rise to ~35 min and the under-160 cap to ~5:00 (extra bike/elliptical Z2 only).',
  'Hamstring or nerve symptoms, or ab pain when breathing hard: that week’s interval or tempo session goes back to Z2.',
  'Two red Whoop recoveries in a row: swap the next interval session for Z2.',
];

export interface Gate {
  id: GateId;
  week: string;
  weekN: number;
  unlocks: string;
  criteria: string[];
}

export const GATES: Gate[] = [
  { id: 'A', week: 'End W2', weekN: 2, unlocks: 'Bike, hamstring Stage 2, ab Stage 2', criteria: ['Pain-free walking and stairs', 'Outer-range isos within 2–3/10, settled by next morning', 'Nerve symptoms settling, none at night', 'Coughing and sneezing pain-free'] },
  { id: 'B', week: '~W4', weekN: 4, unlocks: 'Walk–jog', criteria: ['~20 pain-free single-leg bridges (heel on bench)', 'Next-morning soreness ≤2/10 after loading'] },
  { id: 'C', week: '~W6–7', weekN: 6, unlocks: '≥90% sprints, full Nordics, standing bike efforts', criteria: ['Strides at 80–85% symptom-free next day', 'Askling H-test pain-free (physio)', 'Rotational throws pain-free'] },
  { id: 'D', week: '~W9–10', weekN: 10, unlocks: '≥95% sprints, COD, kicking', criteria: ['Repeated 90% sprints symptom-free', 'Hamstring strength within ~10% of the other side'] },
  { id: 'Pitch', week: 'W18–19', weekN: 19, unlocks: 'Pitch training from w/c 1 Feb', criteria: ['Return-to-pitch checklist complete'] },
];

export const HYROX_NOTE =
  'If you’re still weighing up HYROX, decide at the end of W6. It needs 30 min of pain-free running at race pace, full Nordics without symptoms, and ab Stage 3 cleared. With three injuries in rehab, the plan says withdraw.';

export const PITCH_CHECKLIST = [
  'Hamstring: no pain on palpation or resisted testing; strength and range within 10% of the other side',
  'Four or more weeks of weekly ≥95% sprints, pain-free',
  'COD and deceleration drills at full intensity',
  'Long kicks (40 m+) and frees, pain-free the next morning',
  'Abdomen: full sprinting, kicking and rotational throws pain-free',
  'Shoulder: full overhead range pain-free; fielding and contact prep done',
  'Nerve symptoms fully resolved',
  'Physio sign-off',
];

// ---- Nutrition -------------------------------------------------------------

export const NUTRITION_INTRO =
  'Eat at maintenance until you’re loading the hamstring daily (~W3). Then cut by up to 500 kcal/day to reach 79 kg around W11–12, and eat at maintenance from mid-December.';

export const NUTRITION = [
  'W1–2: maintenance, or at most ~250 kcal/day under. A deficit combined with unloading cost extra lean mass in bed-rest research.',
  'W3 to ~W12: a deficit of up to 500 kcal/day (~0.45 kg/week). Eat more if the 7-day average drops faster than 0.5 kg/week. Each kJ on the BikeErg ≈ 1 kcal, so a 90-min Z2 ride at ~210 W costs ~1,100 kcal.',
  'Protein: at least 2 g/kg (~165 g a day) over 4–5 meals, with ~30 g after each rehab or gym session.',
  'Carbs: periodise them. More around bike intervals, sprint sessions and long runs; less on rehab-only days.',
  'Supplements: keep the creatine. Collagen with vitamin C ~1 h before rehab loading matters most if the scan shows tendon involvement.',
  'From ~W12: maintenance to fuel the build and race block. Race weekend: normal high-carb dinner Saturday, breakfast ~3 h before the start.',
];

export const TARGET_WEIGHT = 79;
export const START_WEIGHT = 83;

export const SOURCES = [
  'Vermeulen et al. 2022: early vs delayed lengthening exercises after hamstring injury',
  'Pollock et al. 2016: tendon (‘c’) hamstring injuries, return to training and recurrence',
  'Malone & Buchheit 2025: heart-rate zone dose–response in Gaelic football',
  'Helgerud et al. 2001: twice-weekly 4×4 intervals in elite junior soccer players',
  'Muñoz et al. 2014: polarised vs threshold training for 10k runners',
  'Haugen et al. 2022: training characteristics of world-class distance runners',
  'Joubert et al. 2011: elliptical cross-training and VO2max in runners',
  'Areta et al. 2014: energy deficit and muscle protein synthesis',
  'Biolo et al. 2007: calorie restriction during bed rest',
  'Foo et al. 2026: energy expenditure during hamstring rehab',
  'Spiering et al. 2021: minimum dose to maintain strength and endurance',
  'Malone et al. 2017: >95% max-velocity exposure and chronic load in elite Gaelic football',
  'Murphy & Koehler 2022: energy deficits impair lean-mass gains but not strength gains',
  'Autoregulated resistance training network meta-analysis (2025)',
  'Presland et al. 2018 and Cuthbert et al. 2020: Nordic volume',
];
