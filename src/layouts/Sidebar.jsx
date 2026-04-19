import { ChevronDown, PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { MENU_GROUPS, NAVIGATION_FOOTER, SIDEBAR_FOOTER_TEXT } from '../constants/appConstants';
import AppLogo from '../components/AppLogo';
import { useAppStore } from '../store/useAppStore';
import { isAdminKotama, isAdminPuskesau, isOperatorFaskes, isViewerPimpinan } from '../utils/accessControl';

const Sidebar = ({ collapsed, setCollapsed, mobileOpen, setMobileOpen }) => {
  const { currentUser, laporanPeriodikInti } = useAppStore();

  const buildRoleMenu = () => {
    if (isAdminPuskesau(currentUser)) return MENU_GROUPS;
    if (isAdminKotama(currentUser)) {
      const allowed = ['/dashboard', '/reports', '/bridging-satusehat', '/ppra', '/inm-ikp', '/sirs-kompetensi', '/keuangan-bulanan', '/monitoring-kepatuhan', '/input-data', '/timeline', '/issues'];
      return MENU_GROUPS.map((group) => ({ ...group, items: group.items.filter((item) => allowed.includes(item.path)) })).filter((group) => group.items.length);
    }
    if (isViewerPimpinan(currentUser)) {
      const allowed = ['/dashboard', '/reports', '/monitoring-kepatuhan', '/bridging-satusehat', '/ppra', '/inm-ikp', '/sirs-kompetensi', '/keuangan-bulanan', '/issues'];
      return MENU_GROUPS.map((group) => ({ ...group, items: group.items.filter((item) => allowed.includes(item.path)) })).filter((group) => group.items.length);
    }
    if (isOperatorFaskes(currentUser)) {
      return MENU_GROUPS.map((group) => ({ ...group, items: group.items.filter((item) => ['/input-data', '/timeline'].includes(item.path)) })).filter((group) => group.items.length);
    }
    return [];
  };

  const menuGroups = buildRoleMenu();
  const reportQueue = laporanPeriodikInti.filter((item) => item.laporanIntiUtama?.statusPelaporan === 'Dikirim').length;
  const FooterIcon = NAVIGATION_FOOTER.icon;

  return (
    <>
      {mobileOpen ? <div className="fixed inset-0 z-30 bg-slate-950/50 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} /> : null}
      <aside className={`fixed z-40 flex h-screen flex-col bg-gradient-to-b from-[#081a33] via-brand-900 to-[#0e2b4f] text-white transition-all duration-300 lg:static ${collapsed ? 'w-24' : 'w-80'} ${mobileOpen ? 'left-0' : '-left-full lg:left-0'}`}>
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          {!collapsed ? <AppLogo /> : <AppLogo compact />}
          <div className="flex items-center gap-1">
            <button onClick={() => setCollapsed(!collapsed)} className="hidden rounded-lg p-1.5 text-slate-200 transition hover:bg-white/10 lg:block">
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
            <button onClick={() => setMobileOpen(false)} className="rounded-lg p-1.5 text-slate-200 transition hover:bg-white/10 lg:hidden">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {menuGroups.map((group) => (
            <section key={group.group} className="space-y-2">
              {!collapsed ? <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky-200/80">{group.group}</p> : null}
              <div className="space-y-1">
                {group.items.map((item) => (
                  <div key={item.path}>
                    <NavLink
                      to={item.path}
                      title={collapsed ? item.label : undefined}
                      className={({ isActive }) => `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${isActive ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-100 hover:bg-white/10 hover:text-white'}`}
                    >
                      <item.icon size={17} className="shrink-0" />
                      {!collapsed ? <span className="truncate font-medium">{item.label}</span> : null}
                      {!collapsed && item.path === '/reports' && reportQueue > 0 ? <span className="ml-auto rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold text-white">{reportQueue}</span> : null}
                      {!collapsed && item.children ? <ChevronDown size={14} className="ml-auto" /> : null}
                    </NavLink>
                    {!collapsed && item.children ? (
                      <div className="ml-8 mt-1 space-y-1 border-l border-white/15 pl-3">
                        {item.children.map((sub) => (
                          <NavLink key={sub.path} to={sub.path} className={({ isActive }) => `block rounded-lg px-2 py-1.5 text-xs transition ${isActive ? 'bg-white/20 text-white' : 'text-slate-200 hover:bg-white/10'}`}>
                            {sub.label}
                          </NavLink>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="border-t border-white/10 p-3">
          <div className="rounded-xl bg-white/10 p-3 ring-1 ring-white/10">
            {!collapsed ? (
              <>
                <p className="text-xs font-semibold text-white">{SIDEBAR_FOOTER_TEXT.title}</p>
                <p className="mt-0.5 text-[11px] text-slate-200">{SIDEBAR_FOOTER_TEXT.subtitle}</p>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-900/40 px-2 py-2">
                  <FooterIcon className="h-4 w-4 text-sky-300" />
                  <div>
                    <p className="text-[11px] font-medium text-slate-100">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-300">{currentUser.role}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex justify-center"><FooterIcon className="h-5 w-5 text-sky-300" /></div>
            )}
          </div>
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;
