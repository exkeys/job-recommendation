/**
 * PDF 생성용 CSS 스타일 상수
 * 리포트 PDF 출력 시 사용되는 모든 스타일 정의
 */

export const PDF_STYLES = `
  /* 인쇄 설정 */
  @page {
    size: A4;
    margin: 25mm 20mm 25mm 20mm;
  }
  
  * {
    user-select: text !important;
    -webkit-user-select: text !important;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Malgun Gothic', 'Apple SD Gothic Neo', -apple-system, sans-serif;
    background: #ffffff;
    color: #1a1a1a;
    margin: 0;
    padding: 0;
    line-height: 1.75;
    font-size: 10.5pt;
  }
  
  /* ===== 표지 페이지 ===== */
  .cover-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 80px 50px;
    page-break-after: always;
    background: linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%);
  }
  
  /* 프리미엄 로고 - 다이아몬드 모양 */
  .cover-logo {
    position: relative;
    width: 100px;
    height: 100px;
    margin-bottom: 50px;
  }
  
  .logo-diamond {
    position: absolute;
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #0066CC 0%, #004C99 100%);
    transform: rotate(45deg);
    top: 15px;
    left: 15px;
    box-shadow: 0 8px 24px rgba(0, 102, 204, 0.25);
  }
  
  .logo-inner {
    position: absolute;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #ffffff 0%, #e8f0ff 100%);
    transform: rotate(45deg);
    top: 25px;
    left: 25px;
  }
  
  .cover-title {
    font-size: 36pt;
    font-weight: 300;
    color: #1a1a1a;
    margin: 0 0 20px 0;
    letter-spacing: -1px;
  }
  
  .cover-title-bold {
    font-weight: 700;
    color: #0066CC;
  }
  
  .cover-subtitle {
    font-size: 12pt;
    font-weight: 400;
    color: #6b7280;
    margin: 0 0 80px 0;
    letter-spacing: 2px;
  }
  
  /* 정보 테이블 */
  .cover-info {
    background: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0;
    padding: 0;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }
  
  .cover-info-row {
    display: flex;
    padding: 20px 32px;
    border-bottom: 1px solid #f3f4f6;
    transition: background 0.2s;
  }
  
  .cover-info-row:last-child {
    border-bottom: none;
  }
  
  .cover-info-label {
    width: 110px;
    font-size: 9pt;
    font-weight: 700;
    color: #0066CC;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
  
  .cover-info-value {
    flex: 1;
    font-size: 11pt;
    font-weight: 400;
    color: #1a1a1a;
    line-height: 1.6;
  }
  
  .cover-date {
    position: absolute;
    bottom: 50px;
    font-size: 10pt;
    color: #9ca3af;
    font-weight: 300;
  }
  
  .cover-footer {
    position: absolute;
    bottom: 30px;
    font-size: 8pt;
    color: #d1d5db;
    letter-spacing: 1px;
  }
  
  /* ===== 본문 페이지 ===== */
  .content-page {
    padding: 30px 0 0 0;
  }
  
  /* Executive Summary Box */
  .executive-summary {
    background: linear-gradient(135deg, #f0f7ff 0%, #e8f0ff 100%);
    border-left: 4px solid #0066CC;
    border-radius: 0 8px 8px 0;
    padding: 32px 36px;
    margin-bottom: 40px;
    page-break-inside: avoid;
    break-inside: avoid;
    box-shadow: 0 2px 8px rgba(0, 102, 204, 0.08);
  }
  
  .executive-summary-header {
    display: flex;
    align-items: center;
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(0, 102, 204, 0.15);
  }
  
  .executive-summary-icon {
    width: 32px;
    height: 32px;
    background: #0066CC;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    font-size: 16px;
  }
  
  .executive-summary-title {
    font-size: 10pt;
    font-weight: 700;
    color: #0066CC;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin: 0;
  }
  
  .executive-summary-content {
    font-size: 10.5pt;
    color: #374151;
    line-height: 2;
    margin: 0;
    font-weight: 400;
    text-align: justify;
    word-break: keep-all;
  }
  
  .executive-summary-content strong {
    color: #1a1a1a;
    font-weight: 600;
  }
  
  .executive-summary-highlight {
    display: inline-block;
    background: rgba(0, 102, 204, 0.1);
    padding: 2px 6px;
    border-radius: 3px;
    color: #0066CC;
    font-weight: 500;
  }
  
  /* 섹션 스타일 - 페이지 분할 제어 */
  .report-section {
    margin-bottom: 36px;
    padding: 0;
    background: transparent;
    border: none;
    
    /* 핵심: 섹션이 중간에 잘리지 않도록 */
    page-break-inside: avoid;
    break-inside: avoid;
    
    orphans: 4;
    widows: 4;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .section-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: #0066CC;
    color: white;
    font-size: 11pt;
    font-weight: 600;
    margin-right: 16px;
    flex-shrink: 0;
  }
  
  .section-title {
    font-size: 13pt;
    font-weight: 600;
    color: #1a1a1a;
    margin: 0;
    letter-spacing: -0.3px;
    
    /* 제목 뒤에서 페이지 분할 방지 */
    page-break-after: avoid;
    break-after: avoid;
  }
  
  .section-content {
    font-size: 10.5pt;
    color: #4b5563;
    line-height: 1.85;
    padding-left: 52px;
    
    /* 내용 앞에서 페이지 분할 방지 (제목과 분리 방지) */
    page-break-before: avoid;
    break-before: avoid;
  }
  
  .section-content p {
    margin: 0 0 12px 0;
  }
  
  /* 하이라이트 박스 */
  .highlight-box {
    background: #f9fafb;
    border: 1px solid #e5e7eb;
    padding: 16px 20px;
    margin: 16px 0;
    border-left: 3px solid #0066CC;
  }
  
  /* ===== 푸터 ===== */
  .pdf-footer {
    margin-top: 60px;
    padding-top: 24px;
    border-top: 1px solid #e5e7eb;
    text-align: center;
    font-size: 8pt;
    color: #9ca3af;
    
    page-break-inside: avoid;
  }
  
  .pdf-footer-brand {
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 6px;
    letter-spacing: 1px;
  }
  
  .pdf-footer-text {
    color: #9ca3af;
    line-height: 1.6;
  }
  
  /* 페이지 번호 (인쇄 시) */
  @media print {
    .report-section {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
    }
    
    .section-title {
      page-break-after: avoid !important;
      break-after: avoid !important;
    }
  }
`;

