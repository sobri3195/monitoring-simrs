import { create } from 'zustand';
import {
  facilitiesSeed,
  globalIssuesSeed,
  usersSeed,
  masterFaskesSeed,
  laporanPeriodikIntiSeed,
  laporanBridgingSatusehatSeed,
  laporanPpraSeed,
  laporanInmIkpSeed,
  laporanSirsKompetensiSeed,
  laporanKeuanganBulananSeed,
} from '../data/seedData';

const STORAGE_KEY = 'monitoring-simrs-store-v2';

const initialState = {
  facilities: facilitiesSeed,
  masterFaskes: masterFaskesSeed,
  laporanPeriodikInti: laporanPeriodikIntiSeed,
  laporanBridgingSatusehat: laporanBridgingSatusehatSeed,
  laporanPPRA: laporanPpraSeed,
  laporanINMIKP: laporanInmIkpSeed,
  laporanSIRSKompetensi: laporanSirsKompetensiSeed,
  laporanKeuanganBulanan: laporanKeuanganBulananSeed,
  issues: globalIssuesSeed,
  users: usersSeed,
  currentUser: usersSeed[0],
  filters: {},
  globalSearch: '',
};

const loadInitialState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw);
    return { ...initialState, ...parsed };
  } catch {
    return initialState;
  }
};

const persist = (get) => localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));

export const useAppStore = create((set, get) => ({
  ...loadInitialState(),
  setGlobalSearch: (globalSearch) => {
    set({ globalSearch });
    persist(get);
  },
  setFilters: (filters) => {
    set({ filters });
    persist(get);
  },
  updateFacility: (id, payload) => {
    set((state) => ({
      facilities: state.facilities.map((f) => (f.id === id ? { ...f, ...payload, lastUpdate: new Date().toISOString() } : f)),
      masterFaskes: state.masterFaskes.map((f) => (f.id === id ? { ...f, ...payload, lastUpdate: new Date().toISOString() } : f)),
    }));
    persist(get);
  },
  updateSubmoduleReport: (moduleKey, reportId, payload) => {
    const moduleStatusFieldMap = {
      laporanBridgingSatusehat: 'statusPelaporan',
      laporanPPRA: 'ppraStatusPelaporan',
      laporanINMIKP: 'inmIkpStatusPelaporan',
      laporanSIRSKompetensi: 'statusPelaporan',
      laporanKeuanganBulanan: 'financeStatusPelaporan',
    };
    set((state) => ({
      [moduleKey]: state[moduleKey].map((item) => {
        if (item.id !== reportId) return item;
        const statusField = moduleStatusFieldMap[moduleKey];
        const normalizedPayload = statusField && payload.statusPelaporan
          ? { ...payload, [statusField]: payload.statusPelaporan }
          : payload;
        return { ...item, ...normalizedPayload, lastUpdate: new Date().toISOString() };
      }),
    }));
    persist(get);
  },
  setCurrentUser: (userId) => {
    const user = get().users.find((u) => u.id === userId);
    if (user) set({ currentUser: user });
    persist(get);
  },
  resetAppData: () => {
    set({ ...initialState });
    persist(get);
  },
  exportAppData: () => JSON.stringify(get(), null, 2),
  importAppData: (payload) => {
    try {
      const parsed = typeof payload === 'string' ? JSON.parse(payload) : payload;
      set({ ...initialState, ...parsed });
      persist(get);
      return { ok: true };
    } catch {
      return { ok: false, message: 'Format JSON tidak valid.' };
    }
  },
}));
