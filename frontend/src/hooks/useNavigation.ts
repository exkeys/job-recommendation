import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * 네비게이션 헬퍼 함수를 제공하는 커스텀 훅
 */
export function useNavigation() {
  const navigate = useNavigate();

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const goTo = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const goHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return {
    goBack,
    goTo,
    goHome,
    navigate,
  };
}

