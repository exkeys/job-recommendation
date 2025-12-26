import { useEffect } from 'react';

/**
 * 페이지 상단으로 스크롤하는 커스텀 훅
 * @param dependencies - 의존성 배열. 값이 변경될 때마다 스크롤
 */
export function useScrollToTop(dependencies: any[] = []) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, dependencies);
}

