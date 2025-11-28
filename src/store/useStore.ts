import { create } from 'zustand';

interface StoreState {
  selectedJob: string;
  selectedProblem: string;
  selectedImage: string;
  aiSolutions: string[];
  setSelectedJob: (job: string) => void;
  setSelectedProblem: (problem: string, image: string) => void;
  setAiSolutions: (solutions: string[]) => void;
  reset: () => void;
}

export const useStore = create<StoreState>((set) => ({
  selectedJob: '',
  selectedProblem: '',
  selectedImage: '',
  aiSolutions: [],
  setSelectedJob: (job) => set({ selectedJob: job }),
  setSelectedProblem: (problem, image) => 
    set({ selectedProblem: problem, selectedImage: image }),
  setAiSolutions: (solutions) => set({ aiSolutions: solutions }),
  reset: () => set({ 
    selectedJob: '', 
    selectedProblem: '', 
    selectedImage: '', 
    aiSolutions: [] 
  }),
}));
