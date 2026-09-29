import { useCallback, useRef, useSyncExternalStore } from 'react';

// Tiny localStorage-backed store. Every hook using the same key stays in sync.

const PREFIX = 'os27.';
const cache = new Map<string, unknown>();
const listeners = new Map<string, Set<() => void>>();

function read<T>(key: string, initial: T): T {
  if (cache.has(key)) return cache.get(key) as T;
  let value = initial;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw) value = JSON.parse(raw) as T;
  } catch {
    // storage unavailable or corrupt: fall back to the default
  }
  cache.set(key, value);
  return value;
}

function write(key: string, value: unknown) {
  cache.set(key, value);
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // ignore quota/private-mode errors; the in-memory value still works
  }
  listeners.get(key)?.forEach((l) => l());
}

export function usePersisted<T>(key: string, initial: T) {
  const subscribe = useCallback(
    (cb: () => void) => {
      if (!listeners.has(key)) listeners.set(key, new Set());
      listeners.get(key)!.add(cb);
      return () => listeners.get(key)!.delete(cb);
    },
    [key],
  );
  const initialRef = useRef(initial);
  const value = useSyncExternalStore(subscribe, () => read(key, initialRef.current));
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const prev = read(key, initialRef.current);
      write(key, typeof next === 'function' ? (next as (p: T) => T)(prev) : next);
    },
    [key],
  );
  return [value, set] as const;
}

export function exportAll(): string {
  const out: Record<string, unknown> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)!;
    if (k.startsWith(PREFIX)) out[k.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(k)!);
  }
  return JSON.stringify({ app: 'off-season-2026-27', exported: new Date().toISOString(), data: out }, null, 2);
}

export function importAll(json: string) {
  const parsed = JSON.parse(json);
  const data = parsed?.data;
  if (!data || typeof data !== 'object') throw new Error('Not an Off-Season backup file');
  for (const [k, v] of Object.entries(data)) write(k, v);
}

export function resetAll() {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i)!;
    if (k.startsWith(PREFIX)) keys.push(k);
  }
  keys.forEach((k) => localStorage.removeItem(k));
  cache.clear();
  listeners.forEach((set) => set.forEach((l) => l()));
}
