import { APIError, ValidationError } from '../api/errorTypes';

/**
 * 공통 에러 처리 유틸리티
 */

export function handleAPIError(error: unknown): APIError {
  if (error instanceof APIError) {
    return error;
  }

  if (error instanceof Error) {
    return new APIError(500, error.message);
  }

  return new APIError(500, '알 수 없는 오류가 발생했습니다.');
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof APIError) {
    return error.details || error.message;
  }

  if (error instanceof ValidationError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
}

export function isAPIError(error: unknown): error is APIError {
  return error instanceof APIError;
}

export function isValidationError(error: unknown): error is ValidationError {
  return error instanceof ValidationError;
}

