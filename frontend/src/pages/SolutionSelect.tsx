import { useStore } from '../store/useStore';
import { useEffect, useRef, useCallback } from 'react';
import type { Solution } from '../types/api';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import SolutionCard from '../components/SolutionCard';
import { COMMON_STYLES } from '../constants/styles';
import { useNavigation } from '../hooks/useNavigation';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useRouteGuard } from '../hooks/useRouteGuard';
import { useImageLoader } from '../hooks/useImageLoader';
import { useSolutionGenerator } from '../hooks/useSolutionGenerator';

export default function SolutionSelect() {
  const { selectedJob, selectedProblem, selectedImage, selectedSolution, setSelectedSolution } =
    useStore();
  const { goBack, goTo } = useNavigation();

  // 라우트 가드: job과 problem이 필수
  useRouteGuard(['job', 'problem']);

  // 이미지 로더
  const {
    displayImage,
    displayImages,
    imageHeight,
    setImageHeight,
    load: loadImages,
  } = useImageLoader(selectedProblem, selectedImage);

  // 솔루션 생성기
  const { solutions, loading, isReady, generate: generateSolutions } = useSolutionGenerator(
    selectedJob,
    selectedProblem,
    selectedImage
  );

  const firstImageRef = useRef<HTMLImageElement | null>(null);

  const handleSolutionSelect = useCallback((solution: Solution) => {
    setSelectedSolution(solution);
  }, [setSelectedSolution]);

  // 페이지 로드 시 스크롤 및 데이터 로드
  useEffect(() => {
    loadImages();
    generateSolutions();
  }, [loadImages, generateSolutions]);

  // 페이지 진입 시 상단으로 스크롤
  useScrollToTop([selectedProblem]);

  return (
    <div className={COMMON_STYLES.pageBackground}>
      <PageHeader onBack={goBack} />

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
            {displayImages.length > 0 ? (
              <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {displayImages.map((img, index) => {
                    // 2번 이미지(index 1) 기준으로 모든 이미지 통일
                    return (
                      <div 
                        key={`${selectedProblem}-img-${index}`}
                        className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-800/50"
                        style={imageHeight ? { height: `${imageHeight}px` } : {}}
                      >
                        <img 
                          ref={index === 1 ? firstImageRef : null}
                          src={img}
                          alt={`${selectedProblem} - ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading={index > 1 ? "lazy" : "eager"}
                          decoding="async"
                          onLoad={(e) => {
                            if (index === 1) {
                              const imgElement = e.currentTarget;
                              setImageHeight(imgElement.offsetHeight);
                            }
                          }}
                          onError={() => {
                            // 이미지 로드 실패 시 해당 이미지 제거 (필요시 구현)
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : displayImage ? (
              <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-800/50">
                <img 
                  src={displayImage}
                  alt={selectedProblem}
                  className="w-full h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                  onError={() => {
                    // 이미지 로드 실패 처리 (필요시 구현)
                  }}
                />
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
          <LoadingSpinner
            message="AI가 솔루션을 생성하고 있습니다..."
            subMessage="잠시만 기다려주세요"
          />
        ) : (
          <div className="space-y-6">
            {solutions.map((solution, index) => {
              const isSelected =
                selectedSolution?.title === solution.title &&
                selectedSolution?.description === solution.description;

              const handleClick = () => handleSolutionSelect(solution);

              return (
                <SolutionCard
                  key={`${selectedProblem}-${solution.title}-${index}`}
                  solution={solution}
                  index={index}
                  isSelected={isSelected}
                  onClick={handleClick}
                />
              );
            })}
            
            {selectedSolution && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => goTo('/report')}
                  className={COMMON_STYLES.buttonPrimary}
                >
                  <span className="flex items-center gap-2">
                    <span>선택한 솔루션으로 진행</span>
                    <i className="ri-arrow-right-line" />
                  </span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
