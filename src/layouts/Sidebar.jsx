import { ChevronDown, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { MENU_GROUPS } from '../constants/appConstants';
import AppLogo from '../components/AppLogo';
import { useAppStore } from '../store/useAppStore';
import { isAdminPuskesau } from '../utils/accessControl';

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { currentUser } = useAppStore();

  const menuGroups = isAdminPuskesau(currentUser)
    ? MENU_GROUPS
    : MENU_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter((item) => item.path === '/input-data'),
    })).filter((group) => group.items.length > 0);

  return (
    <>
    {mobileOpen ? <div className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={() => setMobileOpen(false)} /> : null}
    <aside className={`fixed z-40 h-screen bg-brand-900 text-white transition-all lg:static ${collapsed ? 'w-20' : 'w-72'} ${mobileOpen ? 'left-0' : '-left-full lg:left-0'}`}>
      <div className="flex items-center justify-between border-b border-brand-700 px-3 py-4">
        {!collapsed ? <AppLogo /> : <AppLogo compact />}
        <div className="flex items-center gap-1">
          <button onClick={() => setCollapsed(!collapsed)} className="hidden rounded p-1 hover:bg-brand-700 lg:block">
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
          <button onClick={() => setMobileOpen(false)} className="rounded p-1 hover:bg-brand-700 lg:hidden">
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="space-y-4 overflow-y-auto p-3">
        {menuGroups.map((group) => (
          <div key={group.group}>
            {!collapsed ? <p className="mb-2 px-2 text-xs uppercase tracking-wide text-slate-300">{group.group}</p> : null}
            <div className="space-y-1">
              {group.items.map((item) => (
                <div key={item.path}>
                  <NavLink to={item.path} className={({ isActive }) => `flex items-center gap-2 rounded-lg px-2 py-2 text-sm ${isActive ? 'bg-brand-700' : 'hover:bg-brand-700/60'}`}>
                    <item.icon size={16} />
                    {!collapsed ? <span>{item.label}</span> : null}
                    {!collapsed && item.children ? <ChevronDown size={14} className="ml-auto" /> : null}
                  </NavLink>
                  {!collapsed && item.children ? (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((sub) => (
                        <NavLink key={sub.path} to={sub.path} className={({ isActive }) => `block rounded-md px-2 py-1 text-xs ${isActive ? 'bg-brand-700' : 'text-slate-200 hover:bg-brand-700/50'}`}>
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  </>
  );
};

export default Sidebar;
