import puppeteer from 'puppeteer';
import { logger } from '../utils/logger.js';

/**
 * PDF 생성 서비스
 */
export async function generatePDF(html) {
  let browser;

  try {
    logger.info('PDF 생성 시작...');

    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // HTML 컨텐츠 설정
    await page.setContent(html, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // PDF 생성
    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm',
      },
      printBackground: true,
      preferCSSPageSize: false,
    });

    logger.info('PDF 생성 완료');
    return pdf;
  } catch (error) {
    logger.error('PDF 생성 실패:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

