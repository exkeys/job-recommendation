import express from 'express';
import { analyzeImage } from '../controllers/analyzeController.js';
import { validateAnalyzeImageRequest } from '../middleware/validation.js';

const router = express.Router();

router.post('/analyze-image', validateAnalyzeImageRequest, analyzeImage);

export default router;

