// The 19-week plan: 21 Sep 2026 – 31 Jan 2027. Weeks run Mon–Sun.
// Days off are Sun–Tue; work evenings are Wed–Sat.

export type Tag =
  | 'rehab'
  | 'gym'
  | 'bike'
  | 'pool'
  | 'elliptical'
  | 'walk'
  | 'run'
  | 'sprint'
  | 'quality'
  | 'kicking'
  | 'test'
  | 'race'
  | 'rest';

export type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
export const WEEKDAYS: Weekday[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const OFF_DAYS: Weekday[] = ['Sun', 'Mon', 'Tue'];

export interface Session {
  title: string;
  detail?: string;
  tags: Tag[];
}

export interface Day extends Session {
  date: string; // ISO yyyy-mm-dd
  weekday: Weekday;
  off: boolean;
}

export type PhaseId = 1 | 2 | 3 | 4 | 5;

export interface Week {
  n: number;
  phase: PhaseId;
  start: string;
  end: string;
  dates: string;
  runKm: string;
  keySessions: string;
  offFeet: string;
  gym: string;
  notes: string;
  deload?: boolean;
  test?: boolean;
  race?: boolean;
  gate?: GateId;
  days: Day[];
}

export type GateId = 'A' | 'B' | 'C' | 'D' | 'Pitch';

// ---- date helpers ----------------------------------------------------------

export const PLAN_START = '2026-09-21';

export function addDays(iso: string, n: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + n));
  return dt.toISOString().slice(0, 10);
}

// ---- weekly templates by phase ----------------------------------------------

type Template = (w: number) => Record<Weekday, Session>;

const REST: Session = { title: 'Rest + rehab block', detail: 'Wednesday is the default rest day (first workday). Do the 15–20 min rehab block.', tags: ['rest', 'rehab'] };

const pick = <T,>(w: number, map: Record<number, T>, fallback: T): T => map[w] ?? fallback;

const phase1: Template = (w) => ({
  Mon: {
    title: 'Gym: upper (supported) + scapular; walk',
    detail: 'Phase 1 upper session at RPE ≤7, no breath-holding: chest-supported row, neutral-grip pulldown, machine/DB bench, face pulls + scapular Stage 1. Good-side single-leg work if the trunk tolerates it. Calf isometrics. Then walk.',
    tags: ['gym', 'walk', 'rehab'],
  },
  Tue: w === 1
    ? { title: 'Pool walking 20–30 min', detail: 'Easy pool walking. Rehab block.', tags: ['pool', 'rehab'] }
    : {
        title: 'Bike Z2 20–30 min (seated) + deep-water run',
        detail: 'First bike ride (Tue 29 Sep): 20–30 min Z2, seated, bars high, knee softly bent. Deep-water running 20–30 min easy. Any tingling, burning or pulling that doesn’t settle within 24 h: back off and tell your physio.',
        tags: ['bike', 'pool', 'rehab'],
      },
  Wed: REST,
  Thu: {
    title: 'Gym: upper (supported) + scapular',
    detail: 'Phase 1 upper session at RPE ≤7 + scapular Stage 1. Calf overcoming isometrics (3 × 5 s max at stretched, mid, near-top).',
    tags: ['gym', 'rehab'],
  },
  Fri: w === 1
    ? { title: 'Pool walking 40 min, or walk', tags: ['pool', 'walk', 'rehab'] }
    : { title: 'Deep-water run 20–30 min + bike Z2 20–30 min', detail: 'Both easy. Bike seated.', tags: ['pool', 'bike', 'rehab'] },
  Sat: w === 1
    ? { title: 'Walk 30–45 min', tags: ['walk', 'rehab'] }
    : {
        title: 'Deep-water intervals 8–10 × 1 min hard / 1 min easy',
        detail: 'By effort — only if easy sessions are pain-free and your physio agrees. Moved from Tuesday so you’re not adding two new stimuli on one day.',
        tags: ['pool', 'quality', 'rehab'],
      },
  Sun: w === 1
    ? { title: 'Pool walking 20–30 min, or rest', tags: ['pool', 'rehab'] }
    : { title: 'Bike Z2 20–30 min (seated); pool or rest', tags: ['bike', 'rehab'] },
});

const phase2: Template = (w) => ({
  Mon: {
    title: pick(w, {
      3: 'Bike Z2 45–60 min',
      4: 'Bike Z2 70 min + walk–jog Step 1',
      5: 'Bike Z2 80 min + easy run 20 min',
      6: 'Bike Z2 90 min + easy run 25–30 min',
    }, 'Bike Z2'),
    detail: pick(w, {
      3: '200–225 W, expect ~135–149 bpm. Starts after Gate A. Seated, bars high.',
      4: '200–225 W. Walk–jog 10 × (1 min jog / 1 min walk) on flat ground at RPE 3–4, only after Gate B.',
      5: '200–225 W. 20 min continuous easy run (return-to-run Step 3).',
      6: '200–225 W. Run 25–30 min easy (Step 4). Add 10 min to a ride only if HR drift < ~5% and the nerve stayed quiet.',
    }, ''),
    tags: w === 3 ? ['bike', 'rehab'] : ['bike', 'run', 'rehab'],
  },
  Tue: {
    title: pick(w, {
      3: 'Bike tempo 2 × 10 min + Gym B (upper)',
      4: 'Bike tempo 3 × 10 min + Gym B (upper)',
      5: 'Bike VO2 4 × 4 min + Gym B (upper)',
      6: 'Bike VO2 4 × 4 min + Gym B (upper)',
    }, 'Bike intervals + Gym B'),
    detail: pick(w, {
      3: 'Tempo at ~280–300 W, seated — first exposure, after Gate A only. Gym B: bench top set of 5 @ RPE 8 (~97.5 kg) then 3 × 5 ~5% lighter; weighted chin-up 4 × 5 from +5 kg; chest-supported row 3 × 8; landmine press 3 × 8/side; scapular + ab stage work.',
      4: 'Tempo ~280–300 W, seated. Gym B: bench, weighted chin-ups, row, landmine press, scapular + ab work.',
    }, '4 × 4 min at ~380–400 W (180–190 bpm), 3 min easy, seated. Gym B: bench, weighted chin-ups, row, landmine press, scapular + ab work.'),
    tags: ['bike', 'quality', 'gym', 'rehab'],
  },
  Wed: REST,
  Thu: {
    title: 'Gym C: full body',
    detail: w >= 5
      ? 'Trap bar deadlift 3 × 5 (start ~120 kg, +5–10 kg a session while RPE ≤7 and hamstring quiet next morning); step-ups 3 × 8; single-arm row 3 × 8; push-up plus 3 × 10; carries.'
      : 'Step-ups 3 × 8; single-arm row 3 × 8; push-up plus 3 × 10; carries. Trap bar starts W5 once bracing is pain-free.',
    tags: ['gym', 'rehab'],
  },
  Fri: {
    title: w <= 4 ? 'Elliptical Z2 45 min' : 'Elliptical Z2 45–60 min',
    detail: '135–149 bpm, fixed handles while the ab is in Stages 1–2. Pool is a fine swap.',
    tags: ['elliptical', 'rehab'],
  },
  Sat: pick<Session>(w, {
    3: { title: 'Deep-water run, or rest', detail: 'HYROX sim on Sun 11 Oct is off.', tags: ['pool', 'rehab'] },
    4: { title: 'Walk–jog Step 2: 6 × (3 min jog / 1 min walk)', detail: 'Only if Step 1 was symptom-free the next morning. RPE 3–4, flat surface.', tags: ['run', 'rehab'] },
    5: { title: 'Easy run 20 min continuous', detail: 'RPE 3–4. Keep Saturday light for Sunday.', tags: ['run', 'rehab'] },
    6: { title: 'Easy run 25–30 min', detail: 'RPE 3–4. Keep Saturday light for Sunday.', tags: ['run', 'rehab'] },
  }, REST),
  Sun: {
    title: pick(w, {
      5: 'Strides S1 + Gym A (lower + hamstring)',
      6: 'Easy run 25 min + strides S2 + Gym A',
    }, 'Gym A (lower + hamstring) + incline walk 30 min'),
    detail: pick(w, {
      5: 'Sprint ladder S1: 4–6 × 60 m strides at 60–70%. Gym A: front squat 4 × 5 on RPE (≤8), Bulgarian split squat 3 × 6–8, hip thrust 3 × 8, hamstring Stage 2–3 (assisted Nordics), calf isometrics + raises.',
      6: 'Strides at ~80% (S2). Gym A as before. Gate C check this week; decide on HYROX.',
    }, 'Gym A: front squat 4 × 5 (start ~70 kg, +2.5–5 kg while RPE ≤7 and bracing pain-free), Bulgarian split squat 3 × 6–8 (2 × 20 kg DBs), hip thrust 3 × 8, hamstring Stage 2, calf isometrics + raise 3 × 12. Then incline walk 30 min at 5–10%.'),
    tags: w >= 5 ? ['sprint', 'run', 'gym', 'rehab'] : ['gym', 'walk', 'rehab'],
  },
});

const phase3: Template = (w) => ({
  Mon: {
    title: `Long easy run ${pick(w, { 7: '35', 8: '40–45', 9: '45–50', 10: '50' }, '40–60')} min + bike Z2 top-up`,
    detail: 'Under ~150 bpm. Then ride easy until ~90 min of aerobic work in total.',
    tags: ['run', 'bike', 'rehab'],
  },
  Tue: {
    title: pick(w, {
      7: 'Easy run 30–35 min + strides; short upper (D)',
      8: 'Run with 2 × 8 min steady; short upper (D)',
      9: 'Threshold 3 × 8 min; short upper (D)',
      10: 'Easy run + strides; short upper (D)',
    }, 'Easy run + strides; short upper (D)'),
    detail: pick(w, {
      7: 'Strides at 80–85%. Gym D (~30 min): bench 3 × 5 @ RPE 7 (~85% of Thursday’s top set), chin-ups 3 sets of ~60–70% max reps, face pulls 2 × 12.',
      8: 'Steady at 150–160 bpm, 2 min jog between. Gym D short upper.',
      9: 'Comfortably hard, HR ~170–180, 2 min jog between reps. Gym D short upper.',
    }, 'Deload week. Gym D short upper.'),
    tags: w === 7 || w === 10 ? ['run', 'gym', 'rehab'] : ['run', 'quality', 'gym', 'rehab'],
  },
  Wed: { title: 'Elliptical Z2 30–40 min, or rest', detail: 'Make it the default whenever recovery is green.', tags: ['elliptical', 'rehab'] },
  Thu: {
    title: w === 10 ? 'Gym B (lighter)' : 'Gym B: upper + trunk + power',
    detail: 'Bench 4 × 3–5; weighted chin-up 4 × 4–5 (+ bodyweight max-rep set every second week — log it); row 3 × 6; landmine press; med ball throws 3 × 5; scapular Stage 2; ab Stage 3.',
    tags: ['gym', 'rehab'],
  },
  Fri: {
    title: pick(w, { 7: 'Bike 4 × 4 min', 8: 'Bike 15/15s 2 × 6 min', 9: 'Bike 4 × 4 min', 10: 'Bike 15/15s 2 × 8 min' }, 'Bike intervals'),
    detail: w % 2 === 1
      ? '4 × 4 min at ~380–400 W (180–190 bpm), 3 min easy. Standing efforts allowed after Gate C.'
      : '15 s at ~450–470 W / 15 s easy, 5 min easy between sets.',
    tags: ['bike', 'quality', 'rehab'],
  },
  Sat: w === 10
    ? { title: 'Rest (deload)', detail: 'Drop Saturday’s easy run this week.', tags: ['rest', 'rehab'] }
    : { title: 'Easy run 30 min, or rest', detail: 'Keep it light so Sunday’s sprints are fresh.', tags: ['run', 'rehab'] },
  Sun: {
    title: pick(w, {
      7: 'Strides S2 (80–85%) + easy 20 + Gym A',
      8: 'Build-ups S3 (~90%) + CMJ/broad-jump baseline + Gym A',
      9: 'Flying sprints S4 (≥95%) + easy 20 + Gym A',
      10: 'Max velocity + COD intro + Gym A (lighter)',
    }, 'Sprint ladder + Gym A'),
    detail: pick(w, {
      7: '4–6 × 60 m at 80–85%. Broad jumps 3 × 3 (full recovery). Gym A: front squat 4 × 3–5 @ RPE 7–8; RDL 3 × 5; single-leg RDL 3 × 6; full Nordics 2–3 × 3–5; CMJ 3 × 5; pogos 2 × 15.',
      8: '4–6 × 40–60 m build-ups to ~90%. Record CMJ + broad-jump baseline (Sun 15 Nov). Gym A: front squat; trap bar 3 × 5 (~150 kg); SL RDL; Nordics; pogos.',
      9: 'First ≥95%: 3 × 20 m flying. Bounds and skips. Gym A: front squat (~85–90 kg if it moves well); trap bar +5 kg; Nordics; CMJ; pogos.',
      10: '1 max-velocity set (3–5 × 20–30 m flying) + 45°/90° cuts and 3-step stops, 4–6/side. Re-estimate lifts from a top set. Gate D check.',
    }, ''),
    tags: ['sprint', 'gym', 'rehab'],
  },
});

const phase4: Template = (w) => ({
  Mon: w === 16
    ? { title: 'Easy run 45 min + strides', detail: 'Day after the lower-body tests. Keep it easy.', tags: ['run', 'rehab'] }
    : {
        title: `Long run ${pick(w, { 11: '60', 12: '65', 13: '70', 14: '60', 15: '60' }, '60–80')} min`,
        detail: w >= 13 ? 'Under ~150 bpm; last 10–15 min steady (up to ~160). Optional bike top-up to ~90 min.' : 'Under ~150 bpm. Optional bike top-up to ~90 min.',
        tags: ['run', 'rehab'],
      },
  Tue: pick<Session>(w, {
    11: { title: 'VO2 5 × 800 m; short upper (D)', detail: '5k pace, 180+ bpm each rep, 2–2.5 min jog. Then Gym D (~30 min).', tags: ['run', 'quality', 'gym', 'rehab'] },
    12: { title: 'Threshold 3 × 10 min; short upper (D)', detail: 'HR ~170–180, 2 min jog. Then Gym D.', tags: ['run', 'quality', 'gym', 'rehab'] },
    13: { title: 'VO2 5 × 1 km; short upper (D)', detail: '5k pace, 180+ bpm, 2–2.5 min jog. Then Gym D.', tags: ['run', 'quality', 'gym', 'rehab'] },
    14: { title: 'Quality run (Tue 22 Dec)', detail: 'Christmas deload: one of two key sessions this week. Threshold or VO2. No Gym D this week.', tags: ['run', 'quality', 'rehab'] },
    15: { title: 'Threshold 2 × 10 min; short upper (D)', detail: 'Pre-test week — keep it controlled.', tags: ['run', 'quality', 'gym', 'rehab'] },
    16: { title: '5k time trial (Tue 5 Jan)', detail: 'Sets 10k pace (time × 2.08 ÷ 10 per km). Log it on the Tests tab. If legs are sore from Sunday’s tests, swap: upper tests today, 5k on Thu 7 Jan.', tags: ['run', 'test', 'rehab'] },
  }, { title: '10k quality', tags: ['run', 'quality'] }),
  Wed: { title: 'Rest, or elliptical Z2 30–40 min', detail: 'Default to elliptical when recovery is green.', tags: ['rest', 'elliptical', 'rehab'] },
  Thu: pick<Session>(w, {
    14: { title: 'Gym B (optional, Christmas Eve)', detail: 'Optional 2 × 3 bench at ~100 kg. Add Nordics 1 × 4 so they never lapse for two weeks.', tags: ['gym', 'rehab'] },
    15: { title: 'Light Gym B — no heavy bench (Thu 31 Dec)', detail: 'Bench 2 × 3 at ~100 kg. Nordics 1 × 4.', tags: ['gym', 'rehab'] },
    16: { title: 'Upper-body tests: bench 3RM + max chin-ups', detail: 'Thu 7 Jan. Same equipment and time of day as last time. Log results on the Tests tab.', tags: ['gym', 'test', 'rehab'] },
  }, {
    title: 'Gym B: upper + power + trunk',
    detail: 'Bench 3 × 3–5 (+2.5 kg a week while RPE ≤8); weighted chin-up 3 × 3–5 (+ bodyweight max set every second week); Bulgarian split squat 2 × 6 @ RPE 7; med ball throws; Copenhagens; scapular Stage 3; ab Stage 4.',
    tags: ['gym', 'rehab'],
  }),
  Fri: pick<Session>(w, {
    11: { title: 'Bike 5 × 4 min', detail: '~380–400 W, 180–190 bpm, 3 min easy.', tags: ['bike', 'quality', 'rehab'] },
    12: { title: 'Bike 15/15s 2 × 8 min', detail: '15 s at ~450–470 W / 15 s easy, 5 min between sets.', tags: ['bike', 'quality', 'rehab'] },
    13: { title: 'Bike 5 × 4 min', detail: '~380–400 W, 180–190 bpm, 3 min easy.', tags: ['bike', 'quality', 'rehab'] },
    14: { title: 'Christmas Day — rest', detail: 'Optional bike 15/15s 2 × 8 min another day this week.', tags: ['rest', 'rehab'] },
    15: { title: 'Bike Z2 30–40 min, no intervals', detail: 'No hard conditioning in the 48 h before Sunday’s tests.', tags: ['bike', 'rehab'] },
    16: { title: 'Bike 15/15s 2 × 6 min', detail: '15 s at ~450–470 W / 15 s easy.', tags: ['bike', 'quality', 'rehab'] },
  }, { title: 'Bike intervals', tags: ['bike'] }),
  Sat: w === 15
    ? { title: 'Rest (pre-test)', tags: ['rest', 'rehab'] }
    : { title: 'Easy run 30 min, or rest', detail: 'Keep it light so Sunday is fresh.', tags: ['run', 'rehab'] },
  Sun: pick<Session>(w, {
    11: { title: 'Sprints + Gym A (heavy lower) + short kicking', detail: 'Warm-up 15 min; acceleration 6 × 10–20 m; max velocity 4–6 × 20–30 m flying; COD 4–6/side. Gym A: front squat 3 × 3 @ ~85% of W10 estimate; trap bar 3 × 3 @ ~165 kg; broad jumps 3 × 3; Nordics 2 × 4–6; bounds 3 × 5. Kicking ladder starts: 10–15 m kick-passes, both feet.', tags: ['sprint', 'gym', 'kicking', 'rehab'] },
    12: { title: 'Sprints + COD + Gym A (heavy lower)', detail: 'Front squat 3 × 3 @ ~90%; trap bar 3 × 3 @ ~170 kg. Depth jumps 3 × 4, lateral bounds, SL lateral hops once past Gate D. Kicking 20–30 m if pain-free.', tags: ['sprint', 'gym', 'kicking', 'rehab'] },
    13: { title: 'Sprints + COD + Gym A (peak triples)', detail: 'Front squat top triple @ RPE 8–8.5 (~97.5–102.5 kg) + 2 × 3 @ ~90 kg; trap bar top triple ~177–182 kg + 2 × 3 @ ~165 kg. Longer kicks.', tags: ['sprint', 'gym', 'kicking', 'rehab'] },
    14: { title: 'Sprints (Sun 27 Dec) + optional Gym A', detail: 'Trim, don’t skip the sprints. Optional front squat 2 × 3 @ ~90 kg, trap bar 2 × 3 @ ~150 kg.', tags: ['sprint', 'gym', 'rehab'] },
    15: { title: 'Lower-body + jump tests (Sun 3 Jan)', detail: '15 min warm-up, 3 flying 20 m at ≥95% (the week’s sprints), CMJ, broad jump, then front squat and trap bar to 3RM — only if gating criteria are met (see Strength). Log on the Tests tab.', tags: ['test', 'sprint', 'gym', 'rehab'] },
    16: { title: 'Sprints + COD + Gym A', detail: 'Acceleration, max velocity, COD. Gym A moderate after last week’s tests.', tags: ['sprint', 'gym', 'kicking', 'rehab'] },
  }, { title: 'Sprints + Gym A', tags: ['sprint', 'gym'] }),
});

const phase5: Template = (w) => {
  if (w === 19) {
    return {
      Mon: { title: 'Light gym (half volume) + easy 30 min', tags: ['gym', 'run', 'rehab'] },
      Tue: { title: '4 × 1 km at 10k pace', detail: '2 min jog between reps.', tags: ['run', 'quality', 'rehab'] },
      Wed: { title: 'Rest', detail: 'First workday.', tags: ['rest', 'rehab'] },
      Thu: { title: 'Easy 25 min + 4 strides', tags: ['run', 'rehab'] },
      Fri: { title: 'Rest', tags: ['rest', 'rehab'] },
      Sat: { title: 'Shakeout 15–20 min + 4 strides', detail: 'Normal high-carb dinner tonight.', tags: ['run', 'rehab'] },
      Sun: { title: 'RACE: Dundalk 10k', detail: 'Breakfast ~3 h before the start. Keep Mon–Tue after it easy before pitch training starts w/c 1 Feb.', tags: ['race'] },
    };
  }
  return {
    Mon: { title: w === 17 ? 'Long run 70 min' : 'Long run 45–50 min easy', detail: w === 17 ? 'Last 10–15 min steady.' : 'Partial taper begins.', tags: ['run', 'rehab'] },
    Tue: {
      title: w === 17 ? '3 × 3 km at 10k pace' : '5 × 1 km at 10k pace',
      detail: '10k pace from your 5k time trial (× 2.08 ÷ 10 per km).',
      tags: ['run', 'quality', 'rehab'],
    },
    Wed: REST,
    Thu: { title: 'Gym: full body (reduced) + power', detail: '2 × 3 on the main lifts, plus Nordics, depth jumps, lateral bounds and throws.', tags: ['gym', 'rehab'] },
    Fri: { title: 'Easy run 30–40 min', tags: ['run', 'rehab'] },
    Sat: { title: 'Easy run, or rest', tags: ['run', 'rehab'] },
    Sun: w === 17
      ? { title: 'Sprints + repeated sprints + long kicks', detail: 'Sprint session, then repeated sprints 2 × 6 × 30 m starting every 25 s (hold 160+ bpm). Long kicks, frees, fielding.', tags: ['sprint', 'quality', 'kicking', 'rehab'] }
      : { title: 'Sprints + 15/15 runs 3 × 6 min + return-to-pitch checks', detail: '15/15 runs: ~70–80 m per 15 s, 3 min between sets. Work through the return-to-pitch checklist.', tags: ['sprint', 'quality', 'kicking', 'rehab'] },
  };
};

const TEMPLATES: Record<PhaseId, Template> = { 1: phase1, 2: phase2, 3: phase3, 4: phase4, 5: phase5 };

// ---- week table (straight from the plan) ------------------------------------

type WeekMeta = Omit<Week, 'n' | 'start' | 'end' | 'days'>;

const META: WeekMeta[] = [
  { phase: 1, dates: '21–27 Sep', runKm: '0', keySessions: 'Pool walking 20–30 min, 3×', offFeet: '—', gym: '2× upper', notes: 'Scan; eat at maintenance' },
  { phase: 1, dates: '28 Sep–4 Oct', runKm: '0', keySessions: 'Deep-water running 20–30 min easy, 3×; plus 8–10 × 1 min hard / 1 min easy on Sat 3 Oct, if pain-free and your physio agrees', offFeet: 'Bike Z2 20–30 min (seated): Tue 29 Sep, Fri 2 Oct, Sun 4 Oct', gym: '2× upper', notes: 'Bike started early (29 Sep). Hamstring/ab Stage 2 stay on the Gate A timeline pending physio sign-off and a nerve-symptom check', gate: 'A' },
  { phase: 2, dates: '5–11 Oct', runKm: '0', keySessions: 'Deep-water running 1×', offFeet: 'Bike Z2 Mon 45–60 min; Tue bike tempo 2×10 min (after Gate A); elliptical Fri 45 min; incline walk Sun', gym: '3×', notes: 'Sim on 11 Oct off; start ≤500 kcal/day deficit' },
  { phase: 2, dates: '12–18 Oct', runKm: '~5', keySessions: 'Walk–jog steps 1–2 (after Gate B)', offFeet: 'Bike Mon 70 min + Tue tempo 3×10 min; elliptical Fri 45 min', gym: '3×', notes: 'Lengthening exercises in', gate: 'B' },
  { phase: 2, dates: '19–25 Oct', runKm: '~9', keySessions: '20 min continuous ×2; strides at 60–70%', offFeet: 'Bike Mon 80 min + Tue 4×4 min; elliptical Fri 45–60 min', gym: '3×', notes: 'Assisted Nordics; ab Stage 3' },
  { phase: 2, dates: '26 Oct–1 Nov', runKm: '~12', keySessions: '25–30 min runs ×3 (Mon, Sat, Sun); strides at 80%', offFeet: 'Bike Mon 90 min + Tue intervals; elliptical Fri 45–60 min', gym: '3×', notes: 'Gate C check; HYROX call', gate: 'C' },
  { phase: 3, dates: '2–8 Nov', runKm: '~16', keySessions: '30–35 min runs; strides at 80–85% ×2', offFeet: 'Bike Fri 4×4 min + Mon top-up; elliptical Wed 30–40 min', gym: '2×', notes: 'Full Nordics; plyos start' },
  { phase: 3, dates: '9–15 Nov', runKm: '~20', keySessions: 'Build-ups to 90%; 2×8 min steady', offFeet: 'Bike Fri 15/15s 2×6 min + Mon top-up; elliptical Wed', gym: '2×', notes: 'HYROX 11 Nov (skip); CMJ + broad-jump baseline Sun 15 Nov' },
  { phase: 3, dates: '16–22 Nov', runKm: '~22', keySessions: 'First ≥95% flying 20 m ×3; threshold 3×8 min', offFeet: 'Bike Fri 4×4 min + Mon top-up; elliptical Wed', gym: '2×', notes: 'Bounds and skips' },
  { phase: 3, dates: '23–29 Nov', runKm: '~17', keySessions: 'Max velocity 1×; COD intro; long run 50 min', offFeet: 'Bike Fri 15/15s 2×8 min + Mon top-up; elliptical Wed', gym: '2× lighter', notes: 'Deload: drop Saturday’s easy run, keep the long run at 50 min; Gate D', deload: true, gate: 'D' },
  { phase: 4, dates: '30 Nov–6 Dec', runKm: '~23', keySessions: 'VO2 5×800 m; sprints; long run 60 min', offFeet: 'Bike Fri 5×4 min; elliptical Wed optional', gym: '2×', notes: 'Short kicking starts; lift peaking block begins' },
  { phase: 4, dates: '7–13 Dec', runKm: '~28', keySessions: 'Threshold 3×10 min; sprints + COD; long run 65 min', offFeet: 'Bike Fri 15/15s 2×8 min; elliptical Wed optional', gym: '2×', notes: '~79 kg; move to maintenance' },
  { phase: 4, dates: '14–20 Dec', runKm: '~32', keySessions: 'VO2 5×1 km; sprints + COD; long run 70 min', offFeet: 'Bike Fri 5×4 min; elliptical Wed optional', gym: '2×', notes: 'Longer kicks; peak lift week (top triples)' },
  { phase: 4, dates: '21–27 Dec', runKm: '~25', keySessions: 'Quality run Tue 22 Dec; sprints Sun 27 Dec', offFeet: 'Bike 15/15s 2×8 min, optional', gym: '1–2×', notes: 'Deload for Christmas: two key sessions only', deload: true },
  { phase: 4, dates: '28 Dec–3 Jan', runKm: '~32', keySessions: 'Threshold 2×10 min; long run 60 min; lower-body and jump tests Sun 3 Jan', offFeet: 'Bike Fri 30–40 min easy Z2, no intervals; elliptical Wed optional', gym: '2×', notes: 'Pre-test week: no hard conditioning in the 48 h before Sunday’s tests', test: true },
  { phase: 4, dates: '4–10 Jan', runKm: '~35', keySessions: 'Easy 45 min + strides Mon; 5k time trial Tue 5 Jan; upper-body tests Thu 7 Jan; sprints + COD Sun', offFeet: 'Bike Fri 15/15s 2×6 min', gym: '2×', notes: 'Time trial sets 10k pace; profile check', test: true },
  { phase: 5, dates: '11–17 Jan', runKm: '~34', keySessions: '3×3 km at 10k pace; sprints + repeated sprints; long run 70 min', offFeet: '—', gym: '1×', notes: 'Long kicks, frees, fielding' },
  { phase: 5, dates: '18–24 Jan', runKm: '~24', keySessions: '5×1 km at 10k pace; sprints + 15/15 runs 3×6 min; long run 45–50 min easy', offFeet: '—', gym: '1×', notes: 'Return-to-pitch checks; partial taper begins', gate: 'Pitch' },
  { phase: 5, dates: '25–31 Jan', runKm: '~15 + race', keySessions: '4×1 km at 10k pace Tue 26; easy + strides Thu and Sat', offFeet: '—', gym: 'Mon, light', notes: 'Race Sun 31 Jan', race: true },
];

export const WEEKS: Week[] = META.map((meta, i) => {
  const n = i + 1;
  const start = addDays(PLAN_START, i * 7);
  const tpl = TEMPLATES[meta.phase](n);
  const days: Day[] = WEEKDAYS.map((wd, j) => ({
    date: addDays(start, j),
    weekday: wd,
    off: OFF_DAYS.includes(wd),
    ...tpl[wd],
  }));
  return { ...meta, n, start, end: addDays(start, 6), days };
});

export const PLAN_END = WEEKS[WEEKS.length - 1].end;

export function weekForDate(iso: string): Week | null {
  return WEEKS.find((w) => iso >= w.start && iso <= w.end) ?? null;
}

export function dayForDate(iso: string): Day | null {
  return weekForDate(iso)?.days.find((d) => d.date === iso) ?? null;
}
