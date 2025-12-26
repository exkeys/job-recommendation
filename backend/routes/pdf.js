import express from 'express';
import { createPDF } from '../controllers/pdfController.js';
import { validatePDFRequest } from '../middleware/validation.js';

const router = express.Router();

router.post('/generate-pdf', validatePDFRequest, createPDF);

export default router;

