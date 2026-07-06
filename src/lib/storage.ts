import { useEffect, useState } from 'react';

function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore quota/serialization errors
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export function useCompletedSessions() {
  return useLocalStorage<Record<string, boolean>>('offseason.completed', {});
}

export interface TestEntry {
  id: string;
  date: string;
  vmax?: string;
  splits10_20_30?: string;
  cmj?: string;
  rsaDecrement?: string;
  timeTrial?: string;
  ift?: string;
  notes?: string;
}

export function useTestLog() {
  return useLocalStorage<TestEntry[]>('offseason.testlog', []);
}
