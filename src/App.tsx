import { useState } from 'react';
import { PlanPage } from './pages/PlanPage';
import { OverviewPage } from './pages/OverviewPage';
import { StrengthPage } from './pages/StrengthPage';
import { AerobicPage } from './pages/AerobicPage';
import { TestingPage } from './pages/TestingPage';
import { MonitoringPage } from './pages/MonitoringPage';

type Tab = 'plan' | 'overview' | 'strength' | 'aerobic' | 'testing' | 'monitoring';

const TABS: { id: Tab; label: string }[] = [
  { id: 'plan', label: 'Week-by-Week' },
  { id: 'overview', label: 'Overview' },
  { id: 'strength', label: 'Strength' },
  { id: 'aerobic', label: 'Aerobic & RSA' },
  { id: 'testing', label: 'Testing' },
  { id: 'monitoring', label: 'Monitoring' },
];

function App() {
  const [tab, setTab] = useState<Tab>('plan');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0b0e14] dark:text-slate-100">
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
          <h1 className="text-lg font-bold tracking-tight">Off-Season Plan</h1>
          <p className="text-xs text-black/45 dark:text-white/45">Speed, Fitness & Power Retention — CHB / FB</p>
          <nav className="mt-4 flex gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? 'bg-indigo-500 text-white'
                    : 'text-black/60 hover:bg-black/[0.05] dark:text-white/60 dark:hover:bg-white/[0.08]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {tab === 'plan' && <PlanPage />}
        {tab === 'overview' && <OverviewPage />}
        {tab === 'strength' && <StrengthPage />}
        {tab === 'aerobic' && <AerobicPage />}
        {tab === 'testing' && <TestingPage />}
        {tab === 'monitoring' && <MonitoringPage />}
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-black/30 dark:text-white/30 sm:px-6">
        13-week off-season plan · Oct 13, 2026 – Jan 11, 2027
      </footer>
    </div>
  );
}

export default App;
