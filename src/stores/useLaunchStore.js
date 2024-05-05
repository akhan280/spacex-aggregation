import create from 'zustand';

export const useLaunchStore = create((set, get) => ({
  launches: [],
  loading: true,
  selectedLaunch: null,
  setLaunches: (launches) => set({ launches }),
  setLoading: (loading) => set({ loading }),
  setSelectedLaunch: (launch) => set({ selectedLaunch: launch }),
}));
