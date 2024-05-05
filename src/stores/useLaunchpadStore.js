import create from 'zustand';

export const useLaunchpadStore = create((set) => ({
  launchpads: [],
  loading: true,
  selectedLaunch: null,
  setLaunchpads: (launchpads) => set({ launchpads }),
  setLoading: (loading) => set({ loading }),
  setSelectedLaunch: (launch) => set({ selectedLaunch: launch }),
}));