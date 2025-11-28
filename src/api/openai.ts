import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY || 'dummy-key',
  dangerouslyAllowBrowser: true
});

export const generateImage = async (prompt: string): Promise<string> => {
  // OpenAI API 대신 임시 이미지 사용
  return `https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28prompt%29%7D&width=800&height=600&seq=${Date.now()}&orientation=landscape`;
};

export const generateSolutions = async (job: string, problem: string): Promise<string[]> => {
  // OpenAI API 대신 임시 해결책 반환
  await new Promise(resolve => setTimeout(resolve, 1500)); // 로딩 효과
  
  return [
    `${job} 분야의 전문가에게 즉시 상담을 요청하여 ${problem} 문제를 해결하세요`,
    `관련 문서와 매뉴얼을 검토하고 유사한 사례를 찾아 해결 방법을 적용하세요`,
    `팀원들과 협업하여 브레인스토밍을 진행하고 단계별 해결 계획을 수립하세요`
  ];
};
