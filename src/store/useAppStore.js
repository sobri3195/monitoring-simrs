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
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);
  return initialState;
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
    set((state) => ({
      [moduleKey]: state[moduleKey].map((item) => (item.id === reportId ? { ...item, ...payload, lastUpdate: new Date().toISOString() } : item)),
    }));
    persist(get);
  },
  setCurrentUser: (userId) => {
    const user = get().users.find((u) => u.id === userId);
    if (user) set({ currentUser: user });
    persist(get);
  },
}));
