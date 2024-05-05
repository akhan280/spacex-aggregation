import create from 'zustand';

export const usePadStore = create((set) => ({
  pads: [],
  loading: true,
  selectedPad: null,
  setPads: (pads) => set({ pads }),
  setLoading: (loading) => set({ loading }),
  setSelectedPad: (pad) => set({ selectedPad: pad }),
}));