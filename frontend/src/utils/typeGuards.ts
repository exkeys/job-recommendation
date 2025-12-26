import type { Solution } from '../types/api';

/**
 * 타입 가드 함수들
 */

export function isSolution(obj: unknown): obj is Solution {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'title' in obj &&
    'description' in obj &&
    typeof (obj as Solution).title === 'string' &&
    typeof (obj as Solution).description === 'string'
  );
}

export function isSolutionArray(arr: unknown): arr is Solution[] {
  return Array.isArray(arr) && arr.every(isSolution);
}

export function isValidString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

