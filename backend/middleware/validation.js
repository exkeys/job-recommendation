/**
 * 요청 검증 미들웨어
 */

// XSS 방지를 위한 HTML 태그 제거
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+=/gi, '')
    .trim();
}

export const validateAnalyzeImageRequest = (req, res, next) => {
  const { job, problem, imageUrl } = req.body;

  // job 검증
  if (!job || typeof job !== 'string' || job.trim().length === 0) {
    return res.status(400).json({
      error: 'Missing or invalid field: job',
      details: 'job must be a non-empty string',
    });
  }

  if (job.length > 100) {
    return res.status(400).json({
      error: 'Invalid field: job',
      details: 'job must be less than 100 characters',
    });
  }

  // problem 검증
  if (!problem || typeof problem !== 'string' || problem.trim().length === 0) {
    return res.status(400).json({
      error: 'Missing or invalid field: problem',
      details: 'problem must be a non-empty string',
    });
  }

  if (problem.length > 500) {
    return res.status(400).json({
      error: 'Invalid field: problem',
      details: 'problem must be less than 500 characters',
    });
  }

  // imageUrl 검증 (선택적)
  if (imageUrl && typeof imageUrl === 'string') {
    if (imageUrl.length > 10 * 1024 * 1024) { // 10MB 제한
      return res.status(400).json({
        error: 'Invalid field: imageUrl',
        details: 'imageUrl is too large (max 10MB)',
      });
    }

    // Base64 이미지 형식 검증
    if (imageUrl.startsWith('data:image/')) {
      const base64Pattern = /^data:image\/(png|jpeg|jpg|gif|webp);base64,[A-Za-z0-9+/=]+$/;
      if (!base64Pattern.test(imageUrl)) {
        return res.status(400).json({
          error: 'Invalid field: imageUrl',
          details: 'Invalid base64 image format',
        });
      }
    }
  }

  // 입력 정제
  req.body.job = sanitizeString(job);
  req.body.problem = sanitizeString(problem);

  next();
};

export const validatePDFRequest = (req, res, next) => {
  const { html } = req.body;

  if (!html || typeof html !== 'string' || html.trim().length === 0) {
    return res.status(400).json({
      error: 'Missing or invalid field: html',
      details: 'html must be a non-empty string',
    });
  }

  // HTML 크기 제한 (5MB)
  if (html.length > 5 * 1024 * 1024) {
    return res.status(400).json({
      error: 'Invalid field: html',
      details: 'html is too large (max 5MB)',
    });
  }

  // 위험한 스크립트 태그 제거 (PDF 생성용이므로 기본적인 검증만)
  if (/<script[^>]*>/i.test(html)) {
    return res.status(400).json({
      error: 'Invalid field: html',
      details: 'Script tags are not allowed',
    });
  }

  next();
};

