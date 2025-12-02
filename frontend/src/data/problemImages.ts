/**
 * 문제 상황별 이미지 매핑 시스템
 */

export interface ProblemImage {
  path: string;
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
    const imagePath = imageInfo.path;
    
    if (modules[imagePath]) {
      const module = await modules[imagePath]();
      return module.default;
    }
    
    return null;
  } catch {
    return null;
  }
};

export const preloadAllImages = async (): Promise<void> => {
  const imagePromises = Object.keys(problemImageMap).map(loadProblemImage);
  await Promise.allSettled(imagePromises);
};
