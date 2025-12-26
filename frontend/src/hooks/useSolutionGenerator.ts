import { useState, useCallback, useRef } from 'react';
import { generateSolutions } from '../api/openai';
import type { Solution } from '../types/api';
import { loadProblemImage, loadProblemImages, hasImage } from '../data/problemImages';
import { imageToBase64 } from '../utils/image';
import { TIMING } from '../constants/timing';

interface UseSolutionGeneratorReturn {
  solutions: Solution[];
  loading: boolean;
  isReady: boolean;
  error: Error | null;
  generate: () => Promise<void>;
  reset: () => void;
}

/**
 * AI 솔루션을 생성하는 커스텀 훅
 */
export function useSolutionGenerator(
  selectedJob: string,
  selectedProblem: string,
  selectedImage: string | null
): UseSolutionGeneratorReturn {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const hasLoadedRef = useRef(false);
  const currentProblemRef = useRef<string>('');

  const generate = useCallback(async () => {
    // 이미 로드된 문제면 스킵
    if (hasLoadedRef.current && currentProblemRef.current === selectedProblem) {
      return;
    }

    hasLoadedRef.current = true;
    currentProblemRef.current = selectedProblem;

    const startTime = Date.now();
    setLoading(true);
    setIsReady(false);
    setError(null);
    setSolutions([]);

    try {
      let imageUrl: string | null = null;

      if (hasImage(selectedProblem)) {
        // 여러 이미지가 있으면 첫 번째 이미지 사용
        const images = await loadProblemImages(selectedProblem);
        const localImage = images.length > 0 ? images[0] : await loadProblemImage(selectedProblem);
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
      if (elapsedTime < TIMING.MIN_LOADING_TIME) {
        await new Promise((resolve) =>
          setTimeout(resolve, TIMING.MIN_LOADING_TIME - elapsedTime)
        );
      }

      setSolutions(generatedSolutions);
      await new Promise((resolve) => setTimeout(resolve, TIMING.SOLUTION_READY_DELAY));
      setIsReady(true);
      setLoading(false);
    } catch (err) {
      const fallbackSolutions: Solution[] = [
        {
          title: '상황 파악 및 분석',
          description:
            '문제 상황을 정확히 파악하고 관련 문서를 검토합니다. 팀원들과 협업하여 다양한 해결 방안을 모색합니다.',
        },
        {
          title: '실행 계획 수립',
          description:
            '단계별 실행 계획을 수립하고 체계적으로 진행합니다. 우선순위를 정하고 효율적으로 업무를 처리합니다.',
        },
        {
          title: '결과 검증 및 개선',
          description:
            '실행 결과를 검증하고 피드백을 수집합니다. 지속적인 개선을 통해 더 나은 방법을 찾아갑니다.',
        },
      ];

      setError(err instanceof Error ? err : new Error('알 수 없는 오류가 발생했습니다.'));
      setSolutions(fallbackSolutions);
      await new Promise((resolve) => setTimeout(resolve, TIMING.SOLUTION_READY_DELAY));
      setIsReady(true);
      setLoading(false);
    }
  }, [selectedJob, selectedProblem, selectedImage]);

  const reset = useCallback(() => {
    hasLoadedRef.current = false;
    currentProblemRef.current = '';
    setSolutions([]);
    setLoading(false);
    setIsReady(false);
    setError(null);
  }, []);

  return {
    solutions,
    loading,
    isReady,
    error,
    generate,
    reset,
  };
}

