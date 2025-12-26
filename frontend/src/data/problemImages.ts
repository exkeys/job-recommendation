/**
 * 문제 상황별 이미지 매핑 시스템
 */

export interface ProblemImage {
  path: string;
  paths?: string[]; // 여러 이미지를 지원하는 경우
  category: string;
  alt: string;
}

export type CategoryId = 
  | 'dev' | 'security' | 'design' | 'marketing' | 'pm' 
  | 'management' | 'sales' | 'finance' | 'construction' | 'research' 
  | 'service' | 'medical' | 'legal' | 'hr' | 'manufacturing' 
  | 'logistics' | 'media' | 'food' | 'beauty' | 'sports' 
  | 'real_estate' | 'environment' | 'public' | 'ngo' | 'agriculture';

/**
 * 문제명과 이미지 매핑
 */
export const problemImageMap: Record<string, ProblemImage> = {
  'DB 연결 오류': {
    path: '/src/assets/problem-images/dev/db-error.png',
    category: 'dev',
    alt: 'DB 연결 오류 화면'
  },
  '배포 실패': {
    path: '/src/assets/problem-images/dev/4-cut-comic-panel-1.png',
    paths: [
      '/src/assets/problem-images/dev/4-cut-comic-panel-1.png',
      '/src/assets/problem-images/dev/4-cut-comic-panel-2.png',
      '/src/assets/problem-images/dev/4-cut-comic-panel-3.png',
      '/src/assets/problem-images/dev/4-cut-comic-panel-4.png'
    ],
    category: 'dev',
    alt: '배포 실패 화면'
  },
  '서버 응답 지연': {
    path: '/src/assets/problem-images/dev/ServerError_1.png',
    paths: [
      '/src/assets/problem-images/dev/ServerError_1.png',
      '/src/assets/problem-images/dev/ServerError_2.png',
      '/src/assets/problem-images/dev/ServerError_3.png',
      '/src/assets/problem-images/dev/ServerError_4.png'
    ],
    category: 'dev',
    alt: '서버 응답 지연 화면'
  },
  '고객 피부 상담': {
    path: '/src/assets/problem-images/beauty/Gemini_Generated_Image_deh411deh411deh4.png',
    category: 'beauty',
    alt: '고객 피부 상담 화면'
  }
};

export const getProblemImage = (problemName: string): ProblemImage | null => {
  return problemImageMap[problemName] || null;
};

export const getProblemImagePath = (problemName: string): string | null => {
  const imageInfo = problemImageMap[problemName];
  return imageInfo ? imageInfo.path : null;
};

export const getImagesByCategory = (category: CategoryId): ProblemImage[] => {
  return Object.values(problemImageMap).filter(img => img.category === category);
};

export const hasImage = (problemName: string): boolean => {
  return problemName in problemImageMap;
};

export const loadProblemImage = async (problemName: string): Promise<string | null> => {
  const imageInfo = getProblemImage(problemName);
  if (!imageInfo) return null;

  try {
    const modules = import.meta.glob<{ default: string }>(
      '/src/assets/problem-images/**/*.{png,jpg,jpeg,webp,svg}', 
      { eager: false }
    );
    
    // 여러 이미지가 있는 경우 첫 번째 이미지 사용
    const imagePaths = imageInfo.paths && imageInfo.paths.length > 0 
      ? imageInfo.paths 
      : [imageInfo.path];
    
    const selectedPath = imagePaths[0];
    
    if (modules[selectedPath]) {
      const module = await modules[selectedPath]();
      return module.default;
    }
    
    return null;
  } catch {
    return null;
  }
};

// 여러 이미지를 모두 로드하는 함수
export const loadProblemImages = async (problemName: string): Promise<string[]> => {
  const imageInfo = getProblemImage(problemName);
  if (!imageInfo) return [];

  try {
    const modules = import.meta.glob<{ default: string }>(
      '/src/assets/problem-images/**/*.{png,jpg,jpeg,webp,svg}', 
      { eager: false }
    );
    
    // 여러 이미지가 있는 경우 모두 로드
    const imagePaths = imageInfo.paths && imageInfo.paths.length > 0 
      ? imageInfo.paths 
      : [imageInfo.path];
    
    const loadedImages: string[] = [];
    
    for (const path of imagePaths) {
      if (modules[path]) {
        try {
          const module = await modules[path]();
          loadedImages.push(module.default);
        } catch {
          // 개별 이미지 로드 실패 시 스킵
        }
      }
    }
    
    return loadedImages;
  } catch {
    return [];
  }
};

export const preloadAllImages = async (): Promise<void> => {
  const imagePromises = Object.keys(problemImageMap).map(loadProblemImage);
  await Promise.allSettled(imagePromises);
};
