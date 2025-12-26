/**
 * API 관련 타입 정의
 */

export interface Solution {
  title: string;
  description: string;
}

export interface AnalyzeImageRequest {
  job: string;
  problem: string;
  imageUrl: string;
}

export interface AnalyzeImageResponse {
  solutions: Solution[];
  error?: string;
}

export interface APIErrorResponse {
  error: string;
  details?: string;
  code?: string;
}

export type APIErrorStatus = 400 | 401 | 403 | 404 | 500 | 503;

