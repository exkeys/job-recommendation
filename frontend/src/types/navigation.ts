import { ROUTES } from '../constants/routes';

/**
 * 라우팅 관련 타입 정의
 */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export interface NavigationState {
  canGoBack: boolean;
  history: string[];
}

