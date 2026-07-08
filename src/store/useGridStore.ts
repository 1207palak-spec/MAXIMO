import { create } from 'zustand';

export type GridState = 
  | 'intro'         // Scene 1: Who Are We
  | 'generation'    // Scene 2: How Do We Generate Power
  | 'transmission'  // Scene 3: Transmission
  | 'substation'    // Scene 4: Transformer / Substations
  | 'application'   // Scene 5: Where is Power Used
  | 'products'      // Scene 6: Products
  | 'projects'      // Scene 7: Projects
  | 'innovation'    // Scene 8: Modern Technology
  | 'about'         // Scene 9: Why Trust Us
  | 'contact';      // Scene 10: Terminal

interface GridStore {
  phase: GridState;
  setPhase: (phase: GridState) => void;
  scrollOffset: number;
  setScrollOffset: (offset: number) => void;
}

export const useGridStore = create<GridStore>((set) => ({
  phase: 'intro',
  setPhase: (phase) => set({ phase }),
  scrollOffset: 0,
  setScrollOffset: (offset) => set({ scrollOffset: offset }),
}));
