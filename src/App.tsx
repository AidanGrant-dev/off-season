import { useEffect, useState } from 'react';
import { TITLE } from './data/content';
import { TodayPage } from './pages/TodayPage';
import { PlanPage } from './pages/PlanPage';
import { LogPage } from './pages/LogPage';
import { GatesPage } from './pages/GatesPage';
import { RehabPage } from './pages/RehabPage';
import { RunningPage } from './pages/RunningPage';
import { StrengthPage } from './pages/StrengthPage';
import { OverviewPage } from './pages/OverviewPage';

export type Page = 'today' | 'plan' | 'log' | 'gates' | 'rehab' | 'running' | 'strength' | 'overview';

const PAGES: { id: Page; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'plan', label: 'Week by week' },
  { id: 'log', label: 'Log' },
  { id: 'gates', label: 'Gates' },
  { id: 'rehab', label: 'Rehab' },
  { id: 'running', label: 'Running' },
  { id: 'strength', label: 'Strength' },
  { id: 'overview', label: 'Overview' },
];

function fromHash(): Page {
  const h = window.location.hash.slice(1) as Page;
  return PAGES.some((p) => p.id === h) ? h : 'today';
}

function App() {
  const [page, setPage] = useState<Page>(fromHash);

  useEffect(() => {
    const onHash = () => setPage(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const go = (p: Page) => {
    window.location.hash = p;
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 pt-3 sm:px-6">
          <h1 className="text-base font-bold tracking-tight">Off-Season 2026–27</h1>
          <p className="text-xs text-ink-3">Rehab, speed &amp; the Dundalk 10k</p>
          <nav className="-mx-4 mt-2 flex gap-1 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0" aria-label="Sections">
            {PAGES.map((p) => (
              <a
                key={p.id}
                href={`#${p.id}`}
                aria-current={page === p.id ? 'page' : undefined}
                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  page === p.id ? 'bg-accent text-white' : 'text-ink-2 hover:bg-ink/5'
                }`}
              >
                {p.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
        {page === 'today' && <TodayPage go={go} />}
        {page === 'plan' && <PlanPage />}
        {page === 'log' && <LogPage />}
        {page === 'gates' && <GatesPage />}
        {page === 'rehab' && <RehabPage />}
        {page === 'running' && <RunningPage />}
        {page === 'strength' && <StrengthPage />}
        {page === 'overview' && <OverviewPage />}
      </main>

      <footer className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-ink-3 sm:px-6">
        {TITLE} · 21 Sep 2026 – 31 Jan 2027 · Gates need your physio’s sign-off.
      </footer>
    </div>
  );
}

export default App;
