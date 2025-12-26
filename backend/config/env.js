import dotenv from 'dotenv';

dotenv.config();

/**
 * 환경 변수 검증 및 설정
 */
const requiredEnvVars = ['OPENAI_API_KEY'];

function validateEnv() {
  const missing = requiredEnvVars.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
}

validateEnv();

export const config = {
  port: process.env.PORT || 5000,
  openaiApiKey: process.env.OPENAI_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:5000',
};

