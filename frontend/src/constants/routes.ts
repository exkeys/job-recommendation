/**
 * 라우트 경로 상수
 */
export const ROUTES = {
  HOME: '/',
  JOB_EXPERIENCE: '/job-experience',
  PROBLEM_SELECT: '/problem-select',
  SOLUTION_SELECT: '/solution-select',
  REPORT: '/report',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

