/**
 * AI 솔루션 생성 API 클라이언트
 */

import type { Solution, AnalyzeImageRequest, AnalyzeImageResponse } from '../types/api';
import { APIError } from './errorTypes';
import { getErrorMessage } from '../utils/errorHandler';
import { isSolutionArray } from '../utils/typeGuards';
import { sanitizeInput, isValidImageUrl, isValidJobName, isValidProblem } from '../utils/security';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * AI를 통해 문제 상황에 대한 솔루션을 생성합니다.
 * @param job - 직군 (예: "개발 / IT")
 * @param problem - 문제 상황 (예: "404 에러 발생")
 * @param imageUrl - 이미지 URL (base64 또는 http URL, 없으면 빈 문자열)
 * @returns 솔루션 배열
 */
export const generateSolutions = async (
  job: string, 
  problem: string, 
  imageUrl: string
): Promise<Solution[]> => {
  try {
    // 입력 검증
    if (!isValidJobName(job)) {
      throw new APIError(400, 'Invalid job name');
    }

    if (!isValidProblem(problem)) {
      throw new APIError(400, 'Invalid problem description');
    }

    if (imageUrl && !isValidImageUrl(imageUrl)) {
      throw new APIError(400, 'Invalid image URL');
    }

    // 입력 정제
    const sanitizedJob = sanitizeInput(job, 100);
    const sanitizedProblem = sanitizeInput(problem, 500);
    const sanitizedImageUrl = imageUrl ? (isValidImageUrl(imageUrl) ? imageUrl : '') : '';

    const requestBody: AnalyzeImageRequest = {
      job: sanitizedJob,
      problem: sanitizedProblem,
      imageUrl: sanitizedImageUrl
    };

    const response = await fetch(`${BACKEND_URL}/api/analyze-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new APIError(
        response.status as any,
        errorData.error || `API error: ${response.status}`,
        errorData.details,
        errorData.code
      );
    }

    const data: AnalyzeImageResponse = await response.json();

    if (data.solutions && isSolutionArray(data.solutions)) {
      return data.solutions;
    }

    throw new APIError(500, 'Invalid response format');

  } catch (error) {
    console.error('generateSolutions error:', getErrorMessage(error));
    return getDefaultSolutions(problem);
  }
};

/**
 * API 실패 시 반환할 기본 솔루션
 */
const getDefaultSolutions = (problem: string): Solution[] => {
  // XSS 방지를 위해 문제 설명 정제
  const sanitizedProblem = sanitizeInput(problem, 100);
  
  return [
    {
      title: '상황 파악 및 분석',
      description: `${sanitizedProblem} 문제를 정확히 파악하고 관련 로그와 문서를 검토합니다. 팀원들과 협업하여 다양한 해결 방안을 모색합니다.`
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
};
