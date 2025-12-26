import { create } from 'zustand';
import type { Solution } from '../types/api';

interface StoreState {
  selectedJob: string;
  selectedProblem: string;
  selectedImage: string;
  selectedSolution: Solution | null;
  setSelectedJob: (job: string) => void;
  setSelectedProblem: (problem: string, image: string) => void;
  setSelectedSolution: (solution: Solution | null) => void;
  reset: () => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedJob: '',
  selectedProblem: '',
  selectedImage: '',
  selectedSolution: null,
  setSelectedJob: (job) => set({ selectedJob: job }),
  setSelectedProblem: (problem, image) => 
    set({ selectedProblem: problem, selectedImage: image }),
  setSelectedSolution: (solution) => set({ selectedSolution: solution }),
  reset: () => set({ 
    selectedJob: '', 
    selectedProblem: '', 
    selectedImage: '',
    selectedSolution: null
  }),
}));
