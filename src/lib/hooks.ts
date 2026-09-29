import { usePersisted } from './store';
import type { DailyLog, GatesState, HrWeek, Stages, TestEntry } from './types';

export const useCompleted = () => usePersisted<Record<string, boolean>>('completed', {});
export const useLogs = () => usePersisted<Record<string, DailyLog>>('logs', {});
export const useHrWeeks = () => usePersisted<Record<number, HrWeek>>('hr', {});
export const useGates = () => usePersisted<GatesState>('gates', {});
export const usePitch = () => usePersisted<Record<number, boolean>>('pitch', {});
export const useTests = () => usePersisted<TestEntry[]>('tests', []);
export const useStages = () =>
  usePersisted<Stages>('stages', { hamstring: 1, ab: 1, scapula: 1, runStep: 0, sprintStep: 0 });
