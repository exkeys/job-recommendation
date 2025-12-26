/**
 * PDF HTML 템플릿 생성 함수들
 */

import { escapeHtml } from '../security';
import { PDF_STYLES } from '../../constants/report/pdfStyles';
import type { Solution } from '../../types/api';

export interface PDFSection {
  title: string;
  content: string;
}

export interface PDFTemplateData {
  job: string;
  problem: string;
  solution: Solution | null;
  sections: PDFSection[];
  date: string;
}

/**
 * 리포트 섹션 HTML 생성
 * @param sections 섹션 배열
 * @returns 섹션 HTML 문자열
 */
export function generateSectionsHTML(sections: PDFSection[]): string {
  return sections.map((section, index) => {
    const escapedTitle = escapeHtml(section.title);
    const escapedContent = escapeHtml(
      section.content || 
      'AI가 분석한 내용이 이 영역에 표시됩니다. 실제 분석 결과가 여기에 상세하게 표시되며, 데이터 기반의 인사이트와 구체적인 실행 방안이 제시됩니다.'
    );
    
    return `
      <div class="report-section">
        <div class="section-header">
          <div class="section-number">${String(index + 1).padStart(2, '0')}</div>
          <h2 class="section-title">${escapedTitle}</h2>
        </div>
        <div class="section-content">
          <p>${escapedContent}</p>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * 표지 페이지 HTML 생성
 * @param data PDF 템플릿 데이터
 * @returns 표지 페이지 HTML
 */
function generateCoverPage(data: PDFTemplateData): string {
  const { job, problem, solution, date } = data;
  
  return `
    <!-- 표지 페이지 -->
    <div class="cover-page">
      <!-- 프리미엄 로고 -->
      <div class="cover-logo">
        <div class="logo-diamond"></div>
        <div class="logo-inner"></div>
      </div>
      
      <h1 class="cover-title">
        <span class="cover-title-bold">Solution</span> Report
      </h1>
      <p class="cover-subtitle">BUSINESS INTELLIGENCE & ANALYTICS</p>
      
      <div class="cover-info">
        <div class="cover-info-row">
          <div class="cover-info-label">CATEGORY</div>
          <div class="cover-info-value">${escapeHtml(job)}</div>
        </div>
        <div class="cover-info-row">
          <div class="cover-info-label">ISSUE</div>
          <div class="cover-info-value">${escapeHtml(problem)}</div>
        </div>
        <div class="cover-info-row">
          <div class="cover-info-label">SOLUTION</div>
          <div class="cover-info-value">${escapeHtml(solution?.title || '')}</div>
        </div>
      </div>
      
      <div class="cover-date">${date}</div>
      <div class="cover-footer">CONFIDENTIAL</div>
    </div>
  `;
}

/**
 * 본문 페이지 HTML 생성
 * @param data PDF 템플릿 데이터
 * @param sectionsHTML 섹션 HTML
 * @returns 본문 페이지 HTML
 */
function generateContentPage(data: PDFTemplateData, sectionsHTML: string): string {
  const { solution } = data;
  
  return `
    <!-- 본문 페이지 -->
    <div class="content-page">
      <!-- Executive Summary -->
      <div class="executive-summary">
        <div class="executive-summary-header">
          <div class="executive-summary-icon">⚡</div>
          <h3 class="executive-summary-title">Executive Summary</h3>
        </div>
        <p class="executive-summary-content">
          ${solution?.description 
            ? `<strong>해결 방안:</strong> ${escapeHtml(solution.description)}`
            : '선택한 솔루션에 대한 설명이 없습니다.'
          }
        </p>
      </div>
      
      <!-- 리포트 섹션들 -->
      ${sectionsHTML}
    </div>
  `;
}

/**
 * 푸터 HTML 생성
 * @returns 푸터 HTML
 */
function generateFooter(): string {
  const currentYear = new Date().getFullYear();
  
  return `
    <!-- 푸터 -->
    <div class="pdf-footer">
      <div class="pdf-footer-brand">SOLUTION REPORT SYSTEM</div>
      <div class="pdf-footer-text">
        본 문서는 AI 기반 비즈니스 인텔리전스 시스템에 의해 생성되었습니다.<br>
        © ${currentYear} All Rights Reserved. Confidential and Proprietary.
      </div>
    </div>
  `;
}

/**
 * 전체 PDF HTML 생성
 * @param data PDF 템플릿 데이터
 * @returns 완성된 HTML 문자열
 */
export function generatePDFHTML(data: PDFTemplateData): string {
  const sectionsHTML = generateSectionsHTML(data.sections);
  const coverPage = generateCoverPage(data);
  const contentPage = generateContentPage(data, sectionsHTML);
  const footer = generateFooter();
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        ${PDF_STYLES}
      </style>
    </head>
    <body>
      ${coverPage}
      ${contentPage}
      ${footer}
    </body>
    </html>
  `;
}

