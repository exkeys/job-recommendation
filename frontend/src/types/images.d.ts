/**
 * 이미지 모듈 타입 정의
 * Vite가 이미지 파일을 모듈로 처리할 수 있도록 타입을 선언합니다.
 */

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

/**
 * Vite의 import.meta.glob 타입 확장
 */
declare global {
  interface ImportMeta {
    glob: <T = unknown>(
      pattern: string,
      options?: {
        eager?: boolean;
        as?: 'raw' | 'url';
      }
    ) => Record<string, () => Promise<{ default: T }>>;
  }
}

export {};

