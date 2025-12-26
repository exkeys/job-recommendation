import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { logger } from './utils/logger.js';

const app = express();

// 미들웨어
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// 라우트
app.use(routes);

// 404 핸들러
app.use(notFoundHandler);

// 에러 핸들러 (마지막에 위치)
app.use(errorHandler);

app.listen(config.port, () => {
  logger.info(`Server running on http://localhost:${config.port}`);
});
