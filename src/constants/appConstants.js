import {
  LayoutDashboard,
  Building2,
  Hospital,
  Stethoscope,
  FilePenLine,
  History,
  Cable,
  ShieldCheck,
  BarChart3,
  Database,
  Wallet,
  ClipboardCheck,
  BadgeCheck,
  AlertTriangle,
  FolderOpen,
  FileBarChart2,
  Users,
  Settings,
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
];

export const ADMIN_PUSKESAU_ROLE = 'Super Admin Puskesau';
export const ADMIN_KOTAMA_ROLE = 'Admin Kotama';
export const OPERATOR_FASKES_ROLE = 'Operator Faskes';
export const VIEWER_PIMPINAN_ROLE = 'Viewer Pimpinan';

export const MENU_GROUPS = [
  {
    group: 'Navigasi Utama',
    items: [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      {
        label: 'Master Faskes',
        path: '/master-faskes',
        icon: Building2,
        children: [
          { label: 'Semua Faskes', path: '/master-faskes' },
          { label: 'RSAU', path: '/master-faskes/rsau', icon: Hospital },
          { label: 'FKTP / Klinik', path: '/master-faskes/fktp', icon: Stethoscope },
        ],
      },
      {
        label: 'Laporan Inti',
        path: '/input-data',
        icon: FilePenLine,
        children: [
          { label: 'Input Laporan Saya', path: '/input-data' },
          { label: 'Histori Laporan', path: '/timeline' },
        ],
      },
      { label: 'Bridging SATUSEHAT', path: '/bridging-satusehat', icon: Cable },
      { label: 'PPRA', path: '/ppra', icon: ShieldCheck },
      { label: 'INM & IKP', path: '/inm-ikp', icon: BarChart3 },
      { label: 'SIRS Kompetensi', path: '/sirs-kompetensi', icon: Database },
      { label: 'Keuangan Bulanan', path: '/keuangan-bulanan', icon: Wallet },
      { label: 'Review Kotama', path: '/reports', icon: ClipboardCheck },
      { label: 'Validasi Puskesau', path: '/integrasi', icon: BadgeCheck },
      { label: 'Isu & Risiko', path: '/issues', icon: AlertTriangle },
      { label: 'Dokumen', path: '/monitoring/simrs', icon: FolderOpen },
      { label: 'Rekap & Laporan', path: '/monitoring/sim-klinik', icon: FileBarChart2 },
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
