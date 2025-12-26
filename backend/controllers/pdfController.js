import { generatePDF } from '../services/pdfService.js';
import { logger } from '../utils/logger.js';

/**
 * PDF 생성 컨트롤러
 */
export async function createPDF(req, res, next) {
  try {
    const { html } = req.body;

    const pdf = await generatePDF(html);

    res.contentType('application/pdf');
    res.send(pdf);
  } catch (error) {
    logger.error('PDF 생성 컨트롤러 에러:', error.message);
    next(error);
  }
}

