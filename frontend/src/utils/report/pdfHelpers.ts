/**
 * PDF 생성 관련 헬퍼 함수들
 */

/**
 * 파일명에서 특수문자를 제거하고 안전한 파일명으로 변환
 * @param str 원본 문자열
 * @returns 정리된 파일명
 */
export function cleanFileName(str: string): string {
  return str
    .replace(/\s+/g, '_')
    .replace(/[^\w가-힣]/g, '')
    .substring(0, 30);
}

/**
 * 날짜를 YYYY-MM-DD 형식으로 변환
 * @param date 날짜 객체
 * @returns 날짜 문자열
 */
export function formatDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

/**
 * 시간을 HHMM 형식으로 변환
 * @param date 날짜 객체
 * @returns 시간 문자열
 */
export function formatTime(date: Date): string {
  return `${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}`;
}

/**
 * PDF 파일명 생성
 * @param jobName 직군 이름
 * @returns 생성된 파일명
 */
export function generatePDFFileName(jobName: string): string {
  const now = new Date();
  const dateStr = formatDate(now);
  const timeStr = formatTime(now);
  const cleanJobName = cleanFileName(jobName);
  
  return `${cleanJobName}_솔루션리포트_${dateStr}_${timeStr}.pdf`;
}

/**
 * 한국어 날짜 포맷 (예: 2025년 1월 15일)
 * @param date 날짜 객체
 * @returns 포맷된 날짜 문자열
 */
export function formatKoreanDate(date: Date): string {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

