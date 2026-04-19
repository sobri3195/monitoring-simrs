import {
  Activity,
  BadgeCheck,
  BarChart3,
  Building2,
  Cable,
  ClipboardCheck,
  Database,
  FileBarChart2,
  FilePenLine,
  FileSearch,
  FolderOpen,
  History,
  LayoutDashboard,
  ShieldAlert,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
} from 'lucide-react';

export const APP_NAME = 'Sistem Laporan Inti Faskes Puskesau TNI AU';

export const STATUS_IMPLEMENTASI = [
  'Belum Mulai', 'Perencanaan', 'Pengadaan', 'Instalasi', 'Konfigurasi',
  'Migrasi Data', 'Training', 'UAT', 'Go Live', 'Stabilisasi', 'Selesai',
];

export const MODULE_STATUS = ['Belum Lapor', 'Draft', 'Lengkap', 'Perlu Revisi'];
export const REPORT_WORKFLOW_STATUS = ['Draft', 'Dikirim', 'Direview', 'Perlu Revisi', 'Disetujui Kotama', 'Tervalidasi Puskesau'];

export const USER_ROLES = [
  'Super Admin Puskesau',
  'Admin Kotama',
  'Operator Faskes',
  'Viewer Pimpinan',
  'Staf Yankes / Viewer Monitoring',
];

export const ADMIN_PUSKESAU_ROLE = 'Super Admin Puskesau';
export const ADMIN_KOTAMA_ROLE = 'Admin Kotama';
export const OPERATOR_FASKES_ROLE = 'Operator Faskes';
export const VIEWER_PIMPINAN_ROLE = 'Viewer Pimpinan';
export const VIEWER_MONITORING_ROLE = 'Staf Yankes / Viewer Monitoring';

export const MENU_GROUPS = [
  {
    group: 'Monitoring Utama',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { label: 'Monitoring Kepatuhan RSAU', path: '/monitoring-kepatuhan', icon: ClipboardCheck },
      {
        label: 'Laporan Saya',
        path: '/input-data',
        icon: FilePenLine,
        children: [
          { label: 'Input Laporan', path: '/input-data' },
          { label: 'Histori Laporan', path: '/timeline' },
        ],
      },
    ],
  },
  {
    group: 'Modul Pelaporan',
    items: [
      { label: 'Bridging SATUSEHAT', path: '/bridging-satusehat', icon: Cable },
      { label: 'PPRA', path: '/ppra', icon: ShieldCheck },
      { label: 'INM & IKP', path: '/inm-ikp', icon: BarChart3 },
      { label: 'SIRS Kompetensi', path: '/sirs-kompetensi', icon: Database },
      { label: 'Keuangan Bulanan', path: '/keuangan-bulanan', icon: Wallet },
    ],
  },
  {
    group: 'Review & Tata Kelola',
    items: [
      { label: 'Review Kotama', path: '/reports', icon: FileSearch },
      { label: 'Validasi Puskesau', path: '/integrasi', icon: BadgeCheck },
      { label: 'Isu & Risiko', path: '/issues', icon: ShieldAlert },
      { label: 'Dokumen', path: '/monitoring/simrs', icon: FolderOpen },
      { label: 'Rekap & Laporan', path: '/monitoring/sim-klinik', icon: FileBarChart2 },
      { label: 'Master RSAU / Master Faskes', path: '/master-faskes/rsau', icon: Building2 },
      { label: 'Manajemen User', path: '/users', icon: Users },
      { label: 'Pengaturan', path: '/settings', icon: Settings },
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

export const WORKFLOW_STATUS_COLOR_MAP = {
  Draft: 'bg-slate-100 text-slate-700',
  Dikirim: 'bg-amber-100 text-amber-700',
  Direview: 'bg-yellow-100 text-yellow-800',
  'Perlu Revisi': 'bg-red-100 text-red-700',
  'Disetujui Kotama': 'bg-emerald-100 text-emerald-700',
  'Tervalidasi Puskesau': 'bg-green-100 text-green-800',
  Lengkap: 'bg-green-100 text-green-800',
  'Belum Lapor': 'bg-rose-100 text-rose-700',
};

export const WORKFLOW_TRANSITION_RULES = {
  Draft: ['Dikirim'],
  Dikirim: ['Direview', 'Perlu Revisi'],
  Direview: ['Perlu Revisi', 'Disetujui Kotama'],
  'Perlu Revisi': ['Dikirim'],
  'Disetujui Kotama': ['Tervalidasi Puskesau', 'Perlu Revisi'],
  'Tervalidasi Puskesau': [],
};

export const RISK_COLOR_MAP = {
  Rendah: 'bg-green-100 text-green-700',
  Sedang: 'bg-yellow-100 text-yellow-700',
  Tinggi: 'bg-red-100 text-red-700',
};

export const INTEGRATION_ITEM_STATUS = ['Belum Mulai', 'Proses', 'Berhasil', 'Sebagian', 'Terkendala', 'Tidak Relevan'];

export const DASHBOARD_TABS = ['Ringkasan Utama', 'Bridging SATUSEHAT', 'PPRA', 'INM & IKP', 'SIRS Kompetensi', 'Keuangan Bulanan'];

export const DASHBOARD_PERIOD_OPTIONS = ['2026-01', '2026-02', '2026-03'];

export const DASHBOARD_STATUS_COLORS = {
  'Belum Lapor': '#ef4444',
  Draft: '#f59e0b',
  Lengkap: '#22c55e',
  'Perlu Revisi': '#a855f7',
};

export const DASHBOARD_IMPLEMENTATION_COLORS = ['#0ea5e9', '#f59e0b', '#22c55e', '#ef4444'];
export const CHART_SERIES = ['Belum Lapor', 'Draft', 'Lengkap', 'Perlu Revisi'];

export const SIDEBAR_FOOTER_TEXT = {
  title: 'Portal Monitoring Nasional',
  subtitle: 'Puskesau TNI AU',
};

export const NAVIGATION_FOOTER = {
  title: 'Unit Kerja Aktif',
  subtitle: 'Direktorat Yankesau',
  icon: Activity,
  shortcut: History,
};
