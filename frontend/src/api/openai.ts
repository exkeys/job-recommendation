/**
 * AI 솔루션 생성 API 클라이언트
 */

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export interface Solution {
  title: string;
  description: string;
}

interface AnalyzeImageRequest {
  job: string;
  problem: string;
  imageUrl: string;
}

interface AnalyzeImageResponse {
  solutions: Solution[];
  error?: string;
}

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
    const requestBody: AnalyzeImageRequest = {
      job,
      problem,
      imageUrl: imageUrl || ''
    };

    const response = await fetch(`${BACKEND_URL}/api/analyze-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data: AnalyzeImageResponse = await response.json();

    if (data.solutions && Array.isArray(data.solutions)) {
      return data.solutions;
    }

    throw new Error('Invalid response format');

  } catch {
    return getDefaultSolutions(problem);
  }
};

/**
 * API 실패 시 반환할 기본 솔루션
 */
const getDefaultSolutions = (problem: string): Solution[] => [
  {
    title: '상황 파악 및 분석',
    description: `${problem} 문제를 정확히 파악하고 관련 로그와 문서를 검토합니다. 팀원들과 협업하여 다양한 해결 방안을 모색합니다.`
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
