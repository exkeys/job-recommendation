import express from 'express';
import analyzeRoutes from './analyze.js';
import pdfRoutes from './pdf.js';

const router = express.Router();

router.use('/api', analyzeRoutes);
router.use('/api', pdfRoutes);

// 헬스 체크
router.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

export default router;

