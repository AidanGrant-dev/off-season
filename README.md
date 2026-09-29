# Off-Season 2026–27

An app for the 19-week off-season plan *Rehab, Speed & Dundalk 10k* (21 Sep 2026 – 31 Jan 2027):
rehab for the hamstring, abdominal strain and scapula, then graded running and sprinting,
peaking for the Dundalk 10k on 31 Jan and the first pitch session in the week of 1 Feb.

- **Today**: this week's phase, today's and tomorrow's sessions, countdowns, the daily rehab
  block at your current stages, and alerts (deload trigger, two red recoveries, amber/red days).
- **Week by week**: all 19 weeks, day by day, with tick-off progress.
- **Log**: daily pain scores (hamstring, abdomen, shoulder), nerve symptoms, weight, sleep,
  RHR and Whoop recovery. Each day gets an automatic traffic light (green/amber/red). Also
  includes a bodyweight chart against the 83 → 79 kg path and weekly HR-zone minutes checked
  against the phase targets and caps.
- **Gates**: Gates A–D and Pitch, with criteria checklists, sign-off dates and the
  return-to-pitch checklist.
- **Rehab**: stage-by-stage progressions for each injury, plus a tracker for your current stage.
- **Running**: return-to-run and sprint ladders, a 10k pace and speed-profile calculator,
  fitness sessions, bike/elliptical prescriptions and race week.
- **Strength**: the gym plan by phase, an RPE next-load calculator, the January test block and
  a test-results log.
- **Overview**: goals, phase map, key dates, nutrition, sources, and data backup/restore.

Your data is stored only in the browser (`localStorage`). Use **Overview → Download backup**
to move it between devices.

## Development

```bash
npm install
npm run dev     # local dev server
npm run lint
npm run build
```

Pushes to `main` or the plan branch deploy to GitHub Pages (`.github/workflows/deploy.yml`).
