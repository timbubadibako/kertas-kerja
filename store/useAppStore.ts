import { create } from 'zustand';

interface AppState {
  view: 'dashboard' | 'editor' | 'print';
  setView: (view: 'dashboard' | 'editor' | 'print') => void;
}

export const useAppStore = create<AppState>((set) => ({
  view: 'dashboard',
  setView: (view) => set({ view }),
}));
