import { create } from 'zustand';
import { facilitiesSeed, globalIssuesSeed, usersSeed } from '../data/seedData';

const STORAGE_KEY = 'monitoring-simrs-store-v1';

const loadInitialState = () => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) return JSON.parse(raw);

  return {
    facilities: facilitiesSeed,
    issues: globalIssuesSeed,
    users: usersSeed,
    currentUser: usersSeed[0],
    filters: {},
    globalSearch: '',
  };
};

export const useAppStore = create((set, get) => ({
  ...loadInitialState(),
  setGlobalSearch: (globalSearch) => {
    set({ globalSearch });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
  },
  setFilters: (filters) => {
    set({ filters });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
  },
  updateFacility: (id, payload) => {
    set((state) => ({
      facilities: state.facilities.map((f) => (f.id === id ? { ...f, ...payload, lastUpdate: new Date().toISOString() } : f)),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
  },
  setCurrentUser: (userId) => {
    const user = get().users.find((u) => u.id === userId);
    if (user) set({ currentUser: user });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(get()));
  },
}));
