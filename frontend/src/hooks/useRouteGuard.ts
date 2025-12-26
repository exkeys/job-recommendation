import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

/**
 * 라우트 접근 권한을 검증하는 커스텀 훅
 */
export function useRouteGuard(
  requiredFields: ('job' | 'problem' | 'solution')[],
  redirectTo: string = '/'
) {
  const navigate = useNavigate();
  const { selectedJob, selectedProblem, selectedSolution } = useStore();

  useEffect(() => {
    const checks = {
      job: selectedJob,
      problem: selectedProblem,
      solution: selectedSolution,
    };

    const hasAllRequired = requiredFields.every((field) => {
      const value = checks[field];
      return value !== null && value !== undefined && value !== '';
    });

    if (!hasAllRequired) {
      navigate(redirectTo);
    }
  }, [requiredFields, selectedJob, selectedProblem, selectedSolution, navigate, redirectTo]);
}

