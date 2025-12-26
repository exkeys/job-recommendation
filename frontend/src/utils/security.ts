/**
 * 보안 관련 유틸리티 함수
 */

/**
 * XSS 방지를 위한 HTML 이스케이프
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * 입력 문자열 검증 및 정제
 */
export function sanitizeInput(input: string, maxLength: number = 1000): string {
  if (typeof input !== 'string') {
    return '';
  }
  
  // 길이 제한
  const trimmed = input.trim().slice(0, maxLength);
  
  // 위험한 문자 패턴 제거
  return trimmed
    .replace(/[<>]/g, '') // HTML 태그 방지
    .replace(/javascript:/gi, '') // JavaScript 프로토콜 방지
    .replace(/on\w+=/gi, '') // 이벤트 핸들러 방지
    .trim();
}

/**
 * 이미지 URL 검증
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  // 빈 문자열 허용
  if (url.trim() === '') {
    return true;
  }

  // Base64 이미지 형식 검증
  if (url.startsWith('data:image/')) {
    const base64Pattern = /^data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+$/;
    return base64Pattern.test(url) && url.length < 10 * 1024 * 1024; // 10MB 제한
  }

  // HTTP/HTTPS URL 검증
  if (url.startsWith('http://') || url.startsWith('https://')) {
    try {
      const urlObj = new URL(url);
      // 허용된 프로토콜만
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return false;
      }
      // 허용된 이미지 확장자
      const allowedExtensions = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i;
      return allowedExtensions.test(urlObj.pathname) || urlObj.pathname === '';
    } catch {
      return false;
    }
  }

  return false;
}

/**
 * 직군 이름 검증
 */
export function isValidJobName(job: string): boolean {
  if (!job || typeof job !== 'string') {
    return false;
  }
  
  const sanitized = sanitizeInput(job, 100);
  return sanitized.length > 0 && sanitized.length <= 100;
}

/**
 * 문제 설명 검증
 */
export function isValidProblem(problem: string): boolean {
  if (!problem || typeof problem !== 'string') {
    return false;
  }
  
  const sanitized = sanitizeInput(problem, 500);
  return sanitized.length > 0 && sanitized.length <= 500;
}

/**
 * Rate limiting을 위한 간단한 디바운스
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

