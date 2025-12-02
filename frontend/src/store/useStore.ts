import { create } from 'zustand';

interface StoreState {
  selectedJob: string;
  selectedProblem: string;
  selectedImage: string;
  setSelectedJob: (job: string) => void;
  setSelectedProblem: (problem: string, image: string) => void;
  reset: () => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedJob: '',
  selectedProblem: '',
  selectedImage: '',
  setSelectedJob: (job) => set({ selectedJob: job }),
  setSelectedProblem: (problem, image) => 
    set({ selectedProblem: problem, selectedImage: image }),
  reset: () => set({ 
    selectedJob: '', 
    selectedProblem: '', 
    selectedImage: ''
  }),
}));
