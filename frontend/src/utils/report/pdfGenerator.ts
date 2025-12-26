/**
 * PDF 생성 유틸리티
 * 리포트 PDF 생성 및 다운로드 기능
 */

import { generatePDFHTML, type PDFSection } from './pdfTemplates';
import { generatePDFFileName, formatKoreanDate } from './pdfHelpers';
import { API_ENDPOINTS } from '../../constants/api';
import type { Solution } from '../../types/api';

export interface PDFGenerationOptions {
  job: string;
  problem: string;
  solution: Solution | null;
  elementId?: string;
  apiEndpoint?: string;
}

export interface PDFGenerationResult {
  success: boolean;
  error?: string;
}

/**
 * DOM 요소에서 리포트 섹션 추출
 * @param element DOM 요소
 * @returns 추출된 섹션 배열
 */
function extractSectionsFromElement(element: HTMLElement): PDFSection[] {
  const sections: PDFSection[] = [];
  
  // 아이콘 제거
  element.querySelectorAll('i').forEach(icon => icon.remove());
  
  // 각 섹션을 보고서 형식으로 변환
  element.querySelectorAll('.bg-slate-800\\/60').forEach((section) => {
    const titleEl = section.querySelector('h2');
    const title = titleEl?.textContent?.trim() || '';
    const contentEl = section.querySelector('.text-center');
    const content = contentEl?.textContent?.trim() || '';
    
    if (title) {
      sections.push({ title, content });
    }
  });
  
  return sections;
}

/**
 * 서버에 PDF 생성 요청
 * @param html HTML 문자열
 * @param apiEndpoint API 엔드포인트
 * @returns PDF Blob
 */
async function requestPDFGeneration(html: string, apiEndpoint: string): Promise<Blob> {
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ html })
  });

  if (!response.ok) {
    throw new Error('PDF 생성 실패');
  }

  return await response.blob();
}

/**
 * PDF 다운로드
 * @param blob PDF Blob
 * @param fileName 파일명
 */
function downloadPDF(blob: Blob, fileName: string): void {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

/**
 * PDF 생성 및 다운로드
 * @param options PDF 생성 옵션
 * @returns 생성 결과
 */
export async function generatePDF(options: PDFGenerationOptions): Promise<PDFGenerationResult> {
  const {
    job,
    problem,
    solution,
    elementId = 'report-pdf-content',
    apiEndpoint = API_ENDPOINTS.PDF_GENERATE
  } = options;

  try {
    // 리포트 본문 요소 찾기
    const element = document.getElementById(elementId);
    if (!element) {
      return {
        success: false,
        error: '리포트 내용을 찾을 수 없습니다.'
      };
    }

    // HTML 복사본 생성 및 섹션 추출
    const clonedElement = element.cloneNode(true) as HTMLElement;
    const sections = extractSectionsFromElement(clonedElement);

    // PDF HTML 생성
    const html = generatePDFHTML({
      job,
      problem,
      solution,
      sections,
      date: formatKoreanDate(new Date())
    });

    // 서버에 PDF 생성 요청
    const blob = await requestPDFGeneration(html, apiEndpoint);

    // PDF 다운로드
    const fileName = generatePDFFileName(job);
    downloadPDF(blob, fileName);

    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'PDF 생성 중 오류가 발생했습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
    
    return {
      success: false,
      error: errorMessage
    };
  }
}

