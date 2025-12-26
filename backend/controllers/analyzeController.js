import { generateSolutions } from '../services/openaiService.js';
import { logger } from '../utils/logger.js';

/**
 * 이미지 분석 컨트롤러
 */
export async function analyzeImage(req, res, next) {
  try {
    const { job, problem, imageUrl } = req.body;

    const solutions = await generateSolutions(job, problem, imageUrl || '');

    res.json({ solutions });
  } catch (error) {
    logger.error('Analyze image error:', error.message);

    // Fallback 솔루션 반환
    const fallbackSolutions = [
      {
        title: '상황 파악 및 분석',
        description: `${problem || '해당'} 문제를 정확히 파악하고 관련 로그와 문서를 검토합니다.`,
      },
      {
        title: '실행 계획 수립',
        description: '단계별 실행 계획을 수립하고 체계적으로 진행합니다.',
      },
      {
        title: '결과 검증 및 개선',
        description: '실행 결과를 검증하고 피드백을 수집합니다.',
      },
    ];

    res.json({ solutions: fallbackSolutions });
  }
}

