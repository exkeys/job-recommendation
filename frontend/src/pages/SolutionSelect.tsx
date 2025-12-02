import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useEffect, useState, useRef, useCallback } from 'react';
import { generateSolutions } from '../api/openai';
import type { Solution } from '../api/openai';
import PageHeader from '../components/PageHeader';
import { loadProblemImage, hasImage } from '../data/problemImages';

// 최소 로딩 시간 (ms)
const MIN_LOADING_TIME = 2000;

export default function SolutionSelect() {
  const navigate = useNavigate();
  const { selectedJob, selectedProblem, selectedImage } = useStore();
  
  const [loading, setLoading] = useState(true);
  const [displayImage, setDisplayImage] = useState<string | null>(null);
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [isReady, setIsReady] = useState(false);
  
  const hasLoadedRef = useRef(false);
  const currentProblemRef = useRef<string>('');

  const imageToBase64 = useCallback(async (imageUrl: string): Promise<string> => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }, []);

  const loadDisplayImage = useCallback(async () => {
    try {
      if (hasImage(selectedProblem)) {
        const image = await loadProblemImage(selectedProblem);
        if (image) {
          setDisplayImage(image);
          return;
        }
      }
      
      if (selectedImage) {
        setDisplayImage(selectedImage);
        return;
      }

      setDisplayImage(null);
    } catch {
      setDisplayImage(null);
    }
  }, [selectedProblem, selectedImage]);

  const loadSolutions = useCallback(async () => {
    const startTime = Date.now();
    
    try {
      let imageUrl: string | null = null;
      
      if (hasImage(selectedProblem)) {
        const localImage = await loadProblemImage(selectedProblem);
        if (localImage) {
          const localImageUrl = window.location.origin + localImage;
          imageUrl = await imageToBase64(localImageUrl);
        }
      } else if (selectedImage) {
        if (selectedImage.startsWith('data:image')) {
          imageUrl = selectedImage;
        } else if (selectedImage.startsWith('http')) {
          imageUrl = await imageToBase64(selectedImage);
        }
      }

      const generatedSolutions = await generateSolutions(
        selectedJob, 
        selectedProblem, 
        imageUrl || ''
      );
      
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_LOADING_TIME) {
        await new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME - elapsedTime));
      }
      
      setSolutions(generatedSolutions);
      await new Promise(resolve => setTimeout(resolve, 100));
      setIsReady(true);
      setLoading(false);
      
    } catch {
      const fallbackSolutions: Solution[] = [
        {
          title: '상황 파악 및 분석',
          description: '문제 상황을 정확히 파악하고 관련 문서를 검토합니다. 팀원들과 협업하여 다양한 해결 방안을 모색합니다.'
        },
        {
          title: '실행 계획 수립',
          description: '단계별 실행 계획을 수립하고 체계적으로 진행합니다. 우선순위를 정하고 효율적으로 업무를 처리합니다.'
        },
        {
          title: '결과 검증 및 개선',
          description: '실행 결과를 검증하고 피드백을 수집합니다. 지속적인 개선을 통해 더 나은 방법을 찾아갑니다.'
        }
      ];
      
      setSolutions(fallbackSolutions);
      await new Promise(resolve => setTimeout(resolve, 100));
      setIsReady(true);
      setLoading(false);
    }
  }, [selectedJob, selectedProblem, selectedImage, imageToBase64]);

  useEffect(() => {
    if (!selectedJob || !selectedProblem) {
      navigate('/');
      return;
    }

    if (hasLoadedRef.current && currentProblemRef.current === selectedProblem) {
      return;
    }

    hasLoadedRef.current = true;
    currentProblemRef.current = selectedProblem;
    
    setLoading(true);
    setIsReady(false);
    setSolutions([]);
    
    window.scrollTo(0, 0);
    loadDisplayImage();
    loadSolutions();

    return () => {
      hasLoadedRef.current = false;
      currentProblemRef.current = '';
    };
  }, [selectedJob, selectedProblem, navigate, loadDisplayImage, loadSolutions]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <PageHeader onBack={() => navigate(-1)} />

      {/* Hero Section */}
      <div className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-slate-700/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full mb-8">
            <i className="ri-sparkling-2-fill text-slate-400" />
            <span className="text-sm text-slate-300">AI 맞춤 솔루션</span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            AI가 맞춤 솔루션을 제시합니다
          </h1>
          <p className="text-xl text-slate-400 mb-12">
            선택하신 업무 상황에 대한 해결 방법을 확인해보세요
          </p>

          <div className="flex justify-center">
            {displayImage ? (
              <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border border-slate-800/50">
                <img 
                  src={displayImage}
                  alt={selectedProblem}
                  className="w-full h-auto object-contain"
                  onError={() => setDisplayImage(null)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                  <span className="font-semibold text-white">{selectedProblem}</span>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-4xl rounded-3xl bg-slate-800/60 border border-slate-700/50 p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-700/80 rounded-full mb-6">
                  <i className="ri-file-list-3-line text-4xl text-slate-400" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {selectedProblem}
                </h3>
                <p className="text-lg text-slate-400">
                  {selectedJob} 분야에서 발생할 수 있는 업무 상황입니다.
                  <br />
                  AI가 이 상황에 맞는 해결 방안을 제시합니다.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Solutions */}
      <div className="max-w-5xl mx-auto px-6 pb-32">
        {loading || !isReady ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-slate-800 border-t-slate-600 rounded-full animate-spin mb-6" />
            <p className="text-lg text-slate-400">AI가 솔루션을 생성하고 있습니다...</p>
            <p className="text-sm text-slate-500 mt-2">잠시만 기다려주세요</p>
          </div>
        ) : (
          <div className="space-y-6">
            {solutions.map((solution, index) => (
              <div
                key={`${selectedProblem}-${solution.title}-${index}`}
                className="solution-card bg-slate-800/60 border border-slate-700/50 rounded-2xl p-8 hover:border-slate-600/50 hover:bg-slate-800/70 transition-all duration-300"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-slate-700/80 border border-slate-600/50 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-semibold text-white">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-white mb-3 leading-tight">
                      {solution.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-base">
                      {solution.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes fadeInSlide {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .solution-card {
          opacity: 0;
          animation: fadeInSlide 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
