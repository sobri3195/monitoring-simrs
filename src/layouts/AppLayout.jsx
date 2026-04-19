import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1">
        <Header setMobileOpen={setMobileOpen} />
        <main className="space-y-6 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
};

export default AppLayout;
