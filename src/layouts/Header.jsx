import { Bell, CalendarClock, ChevronRight, Menu, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { APP_NAME, DASHBOARD_PERIOD_OPTIONS, MENU_GROUPS } from '../constants/appConstants';
import logoMark from '../assets/logo-simrs.svg';
import { useAppStore } from '../store/useAppStore';

const routeLabelMap = MENU_GROUPS.flatMap((group) => group.items.map((item) => [item.path, item.label])).reduce((acc, [path, label]) => ({ ...acc, [path]: label }), {});

const Header = ({ setMobileOpen }) => {
  const { currentUser, users, setCurrentUser, globalSearch, setGlobalSearch } = useAppStore();
  const location = useLocation();
  const pageTitle = routeLabelMap[location.pathname] || 'Dashboard';

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 px-3 py-3 backdrop-blur sm:px-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="min-w-0 flex items-center gap-3">
          <button className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:bg-slate-50 lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu size={16} />
          </button>
          <img src={logoMark} alt="Logo SIMRS" className="h-9 w-9 rounded-lg ring-1 ring-slate-200" />
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-wide text-slate-500">Sistem Monitoring</p>
            <h1 className="truncate text-sm font-semibold text-brand-900 md:text-base">{APP_NAME}</h1>
            <div className="mt-0.5 inline-flex max-w-full items-center gap-1 truncate text-xs text-slate-500">
              <span>Beranda</span>
              <ChevronRight className="h-3 w-3" />
              <span className="truncate font-medium text-slate-700">{pageTitle}</span>
            </div>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-1 gap-2 md:grid-cols-[minmax(220px,1fr)_170px_auto_minmax(220px,1fr)] md:items-center xl:ml-6">
          <label className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Cari faskes, kotama, atau isu..."
              className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none ring-brand-200 transition focus:border-brand-300 focus:bg-white focus:ring"
            />
          </label>

          <label className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600">
            <CalendarClock className="h-4 w-4 text-slate-400" />
            <select className="w-full bg-transparent text-sm outline-none">
              {DASHBOARD_PERIOD_OPTIONS.map((period) => <option key={period}>{period}</option>)}
            </select>
          </label>

          <button className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50">
            <Bell size={16} />
            <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">3</span>
          </button>

          <select
            value={currentUser.id}
            onChange={(e) => setCurrentUser(e.target.value)}
            className="h-10 w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-700 outline-none transition focus:border-brand-300 focus:bg-white"
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name} ({user.role})</option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
