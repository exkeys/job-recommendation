import OpenAI from 'openai';
import { config } from '../config/env.js';
import { logger } from '../utils/logger.js';

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
});

/**
 * OpenAI 서비스를 통한 솔루션 생성
 */
export async function generateSolutions(job, problem, imageUrl) {
  try {
    const hasImage = imageUrl && imageUrl.trim() !== '';
    const userContent = [];

    if (hasImage) {
      userContent.push({
        type: 'text',
        text: `직군: ${job}\n문제 상황: ${problem}\n\n위 이미지를 자세히 분석하여:\n1. 이미지에서 실제로 보이는 문제 상황을 정확히 파악하세요\n2. 파악한 실제 상황에 맞는 구체적이고 실용적인 해결 방안 3개를 제시하세요.\n\n응답은 반드시 다음 JSON 형식으로만 작성하세요:\n[\n  {\n    "title": "해결방안 제목 (간결하게)",\n    "description": "구체적인 해결 방법 설명 (2-3문장, 실행 가능한 단계 포함)"\n  },\n  {\n    "title": "두 번째 해결방안 제목",\n    "description": "두 번째 해결 방법 설명"\n  },\n  {\n    "title": "세 번째 해결방안 제목",\n    "description": "세 번째 해결 방법 설명"\n  }\n]`,
      });
      userContent.push({
        type: 'image_url',
        image_url: { url: imageUrl, detail: 'high' },
      });
    } else {
      userContent.push({
        type: 'text',
        text: `직군: ${job}\n문제 상황: ${problem}\n\n위 문제 상황에 대한 구체적이고 실용적인 해결 방안 3개를 제시하세요.\n\n응답은 반드시 다음 JSON 형식으로만 작성하세요:\n[\n  {\n    "title": "해결방안 제목 (간결하게)",\n    "description": "구체적인 해결 방법 설명 (2-3문장, 실행 가능한 단계 포함)"\n  },\n  {\n    "title": "두 번째 해결방안 제목",\n    "description": "두 번째 해결 방법 설명"\n  },\n  {\n    "title": "세 번째 해결방안 제목",\n    "description": "세 번째 해결 방법 설명"\n  }\n]`,
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `당신은 ${job} 분야의 전문가입니다. ${hasImage ? '주어진 이미지를 분석하여 실제로 어떤 문제 상황인지 파악하고,' : '주어진 문제 상황을 분석하여'} 구체적이고 실용적인 해결 방안 3개를 제시해야 합니다.`,
        },
        { role: 'user', content: userContent },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error('No response from GPT');
    }

    const jsonMatch = content.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      const solutions = JSON.parse(jsonMatch[0]);
      logger.info('Solutions generated successfully');
      return solutions;
    }

    throw new Error('Invalid response format from GPT');
  } catch (error) {
    logger.error('OpenAI service error:', error.message);
    throw error;
  }
}

