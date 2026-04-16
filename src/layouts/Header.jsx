import { Bell, Menu } from 'lucide-react';
import { APP_NAME } from '../constants/appConstants';
import logoMark from '../assets/logo-simrs.svg';
import SearchInput from '../components/SearchInput';
import { useAppStore } from '../store/useAppStore';

const Header = ({ setMobileOpen }) => {
  const { currentUser, users, setCurrentUser, globalSearch, setGlobalSearch } = useAppStore();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <button className="rounded-md border border-slate-200 p-2 lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu size={16} />
          </button>
          <img src={logoMark} alt="Logo SIMRS" className="h-8 w-8 rounded-md" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-sm font-bold text-brand-900 md:text-base">{APP_NAME}</h1>
          </div>
          <button className="relative rounded-md border border-slate-300 p-2 md:hidden">
            <Bell size={16} />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] sm:items-center lg:ml-auto lg:w-auto">
          <SearchInput value={globalSearch} onChange={setGlobalSearch} placeholder="Pencarian global..." />
          <select className="rounded-md border border-slate-300 px-2 py-2 text-xs">
            <option>Filter Nasional</option>
            <option>Kodau I</option><option>Kodau II</option><option>Kodau III</option>
          </select>
          <button className="relative hidden rounded-md border border-slate-300 p-2 md:block">
            <Bell size={16} />
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>
          <select value={currentUser.id} onChange={(e) => setCurrentUser(e.target.value)} className="w-full rounded-md border border-slate-300 bg-slate-100 px-3 py-2 text-xs font-medium sm:w-auto">
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
