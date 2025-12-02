# Backend Server - GPT-4 Vision API

Node.js/Express 백엔드 서버로 GPT-4 Vision을 사용하여 이미지를 분석하고 솔루션을 생성합니다.

## 🚀 실행 방법

### 1. 의존성 설치 (이미 완료됨)
```bash
npm install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 OpenAI API 키를 설정하세요:
```
OPENAI_API_KEY=your_api_key_here
```

**⚠️ 중요:** `.env` 파일은 절대 Git에 커밋하지 마세요. `.gitignore`에 포함되어 있습니다.

### 3. 서버 실행
```bash
npm start
```

서버가 `http://localhost:5000`에서 실행됩니다.

## 📡 API 엔드포인트

### POST /api/analyze-image
이미지를 분석하여 해결 방안 3개를 생성합니다.

**요청:**
```json
{
  "job": "개발 / IT",
  "problem": "DB 연결 오류",
  "imageUrl": "http://example.com/image.png"
}
```

**응답:**
```json
{
  "solutions": [
    {
      "title": "해결방안 제목",
      "description": "구체적인 해결 방법 설명"
    },
    {
      "title": "두 번째 해결방안",
      "description": "두 번째 설명"
    },
    {
      "title": "세 번째 해결방안",
      "description": "세 번째 설명"
    }
  ]
}
```

### GET /api/health
서버 상태 확인

**응답:**
```json
{
  "status": "ok",
  "message": "Backend server is running"
}
```

## 🔧 기술 스택
- Node.js
- Express
- OpenAI GPT-4o Vision API
- CORS
- dotenv

