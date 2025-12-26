/**
 * API 에러 타입 정의
 */

export interface APIErrorResponse {
  error: string;
  details?: string;
  code?: string;
}

export type APIErrorStatus = 400 | 401 | 403 | 404 | 500 | 503;

export class APIError extends Error {
  public status: APIErrorStatus;
  public details?: string;
  public code?: string;

  constructor(
    status: APIErrorStatus,
    message: string,
    details?: string,
    code?: string
  ) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.details = details;
    this.code = code;
  }
}

export class ValidationError extends Error {
  public field?: string;

  constructor(message: string, field?: string) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

