import {
  LayoutDashboard,
  Building2,
  Hospital,
  Clinic,
  Activity,
  Cable,
  ListChecks,
  AlertTriangle,
  FileBarChart2,
  Users,
  Settings,
} from 'lucide-react';

export const APP_NAME = 'Dashboard Monitoring Implementasi SIMRS & SIM Klinik Puskesau TNI AU';

export const STATUS_IMPLEMENTASI = [
  'Belum Mulai', 'Perencanaan', 'Pengadaan', 'Instalasi', 'Konfigurasi',
  'Migrasi Data', 'Training', 'UAT', 'Go Live', 'Stabilisasi', 'Selesai',
];

export const INTEGRATION_STATUS = ['Berhasil', 'On Progress', 'Gagal', 'Belum Mulai'];
export const LEVEL_RISIKO = ['Rendah', 'Sedang', 'Tinggi'];

export const USER_ROLES = [
  'Super Admin Puskesau',
  'Admin Kotama',
  'Operator Faskes',
  'Viewer Pimpinan',
];

export const MENU_GROUPS = [
  {
    group: 'Utama',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      {
        label: 'Master Faskes',
        path: '/master-faskes',
        icon: Building2,
        children: [
          { label: 'Semua Faskes', path: '/master-faskes' },
          { label: 'RSAU / RSPAU', path: '/master-faskes/rsau', icon: Hospital },
          { label: 'FKTP / Klinik', path: '/master-faskes/fktp', icon: Clinic },
        ],
      },
      {
        label: 'Monitoring',
        path: '/monitoring/simrs',
        icon: Activity,
        children: [
          { label: 'SIMRS', path: '/monitoring/simrs' },
          { label: 'SIM Klinik', path: '/monitoring/sim-klinik' },
        ],
      },
      { label: 'Integrasi', path: '/integrasi', icon: Cable },
      { label: 'Timeline', path: '/timeline', icon: ListChecks },
      { label: 'Isu & Risiko', path: '/issues', icon: AlertTriangle },
      { label: 'Laporan', path: '/reports', icon: FileBarChart2 },
    ],
  },
  {
    group: 'Administrasi',
    items: [
      { label: 'Users', path: '/users', icon: Users },
      { label: 'Settings', path: '/settings', icon: Settings },
    ],
  },
];

export const STATUS_COLOR_MAP = {
  'Belum Mulai': 'bg-slate-100 text-slate-700',
  Perencanaan: 'bg-indigo-100 text-indigo-700',
  Pengadaan: 'bg-violet-100 text-violet-700',
  Instalasi: 'bg-blue-100 text-blue-700',
  Konfigurasi: 'bg-sky-100 text-sky-700',
  'Migrasi Data': 'bg-amber-100 text-amber-700',
  Training: 'bg-cyan-100 text-cyan-700',
  UAT: 'bg-orange-100 text-orange-700',
  'Go Live': 'bg-emerald-100 text-emerald-700',
  Stabilisasi: 'bg-lime-100 text-lime-700',
  Selesai: 'bg-green-100 text-green-700',
};

export const RISK_COLOR_MAP = {
  Rendah: 'bg-green-100 text-green-700',
  Sedang: 'bg-yellow-100 text-yellow-700',
  Tinggi: 'bg-red-100 text-red-700',
};
