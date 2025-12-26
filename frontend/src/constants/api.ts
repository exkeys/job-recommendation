/**
 * API 엔드포인트 상수
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  PDF_GENERATE: `${API_BASE_URL}/api/generate-pdf`,
  ANALYZE_IMAGE: `${API_BASE_URL}/api/analyze-image`,
} as const;

