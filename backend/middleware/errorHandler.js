import { logger } from '../utils/logger.js';

/**
 * 전역 에러 핸들러 미들웨어
 */
export const errorHandler = (err, req, res, next) => {
  logger.error('Error occurred:', err.message, err.stack);

  // 이미 응답이 전송된 경우
  if (res.headersSent) {
    return next(err);
  }

  // 에러 타입에 따른 상태 코드 결정
  const statusCode = err.statusCode || err.status || 500;

  // 에러 응답 형식 통일
  res.status(statusCode).json({
    error: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    code: err.code,
  });
};

/**
 * 404 핸들러
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
};

