import type { GateId } from '../data/plan';

export interface PainScores {
  during: number | null;
  morning: number | null;
}

export interface DailyLog {
  date: string;
  hamstring: PainScores;
  ab: PainScores;
  shoulder: PainScores;
  sharp: boolean;
  nerve: boolean; // any nerve symptoms
  nerveWorse: boolean; // new or worse
  nerveWhere: string;
  aboveBaseline: boolean; // still above baseline next morning
  weight: number | null;
  sleep: number | null;
  rhr: number | null;
  recovery: '' | 'green' | 'yellow' | 'red';
  notes: string;
}

export type Light = 'green' | 'amber' | 'red';

export interface HrWeek {
  easy: number | null;
  steady: number | null;
  hard: number | null;
  max: number | null;
}

export interface GateState {
  criteria: Record<number, boolean>;
  passed?: string; // ISO date of physio sign-off
}

export type GatesState = Partial<Record<GateId, GateState>>;

export interface TestEntry {
  id: string;
  date: string;
  kind: TestKind;
  value: number;
  reps?: number;
  notes?: string;
}

export type TestKind = 'fs' | 'tb' | 'bench' | 'chins' | 'cmj' | 'broad' | '5k' | 'vmax';

export const TEST_KINDS: Record<TestKind, { label: string; unit: string; hint: string }> = {
  fs: { label: 'Front squat', unit: 'kg', hint: '3RM (or 5RM)' },
  tb: { label: 'Trap bar deadlift', unit: 'kg', hint: '3RM (or 5RM)' },
  bench: { label: 'Bench press', unit: 'kg', hint: '3RM' },
  chins: { label: 'Chin-ups (BW)', unit: 'reps', hint: 'max reps' },
  cmj: { label: 'CMJ', unit: 'cm', hint: 'best of 3' },
  broad: { label: 'Broad jump', unit: 'cm', hint: 'best of 3' },
  '5k': { label: '5k time trial', unit: 'sec', hint: 'mm:ss' },
  vmax: { label: 'Top speed (StatSports)', unit: 'km/h', hint: 'max velocity' },
};

export interface Stages {
  hamstring: number;
  ab: number;
  scapula: number;
  runStep: number; // 0 = not started, 1..4
  sprintStep: number; // 0 = not started, 1..4
}
