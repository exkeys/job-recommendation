# 백엔드 작업 명세서

> **마크다운 미리보기**: VS Code에서 `Ctrl + Shift + V` (Windows/Linux) 또는 `Cmd + Shift + V` (Mac)를 누르면 이 문서를 보기 좋게 볼 수 있습니다.

> **서버 시작 방법**: 
> - **중요**: `PS C:\jobs_one>` 여기 위치에서 실행해야 합니다
> - **Windows PowerShell(Terminal 창)**: `cd backend; npm run dev`
> - **Mac/Linux**: `cd backend && npm run dev`
> - 또는 `cd backend` 후 `npm run dev` (두 줄로 실행)

> **전체 앱 실행 방법** (백엔드 + 프론트엔드 동시 실행):
> - **터미널 창 2개 필요**: 백엔드와 프론트엔드를 각각 다른 터미널에서 실행
> - **첫 번째 터미널 (백엔드)**: `PS C:\jobs_one>` 위치에서 `cd backend; npm run dev`
> - **두 번째 터미널 (프론트엔드)**: `PS C:\jobs_one>` 위치에서 `cd frontend; npm run dev`
> - 또는 각각 `cd backend` 후 `npm run dev`, 다른 터미널 창에서 `cd frontend` 후 `npm run dev` (두 줄로 실행)

---

## 📋 목차

1. [전체 구조 개요](#1-전체-구조-개요)
2. [각 파일별 역할](#2-각-파일별-역할)
3. [API 동작 흐름](#3-api-동작-흐름)
4. [주요 기능 설명](#4-주요-기능-설명)
5. [AI 설정 변경하기](#5-ai-설정-변경하기)

---

## 1. 전체 구조 개요

### 간단 요약
- **server.js**: 서버를 시작하는 곳
- **routes/**: 어떤 API가 있는지 정의
- **controllers/**: 요청을 받아서 처리(유저와 소통와 내 코드와 소통)
- **services/**: 실제 작업 수행 (AI 호출, PDF 생성)
- **middleware/**: 요청 검증 및 에러 처리

---

## 2. 각 파일별 역할

### 🚪 server.js - 서버 시작점

**역할**: 서버를 켜고 기본 설정을 하는 곳

**하는 일**:
1. Express 서버 생성
2. CORS 설정 (다른 도메인에서 접근 허용)
3. JSON 데이터 받기 설정
4. 라우트 연결
5. 에러 처리 설정
6. 서버 시작 (포트 5000)



```javascript
// 서버를 5000번 포트에서 시작
app.listen(5000, () => {
  console.log('서버가 시작되었습니다!');
});
```

---

### 📍 routes/ - API 경로 정의

#### routes/index.js
**역할**: 모든 API 경로를 모아서 관리

**하는 일**:
- `/api/analyze-image` → 이미지 분석 API 연결
- `/api/generate-pdf` → PDF 생성 API 연결
- `/api/health` → 서버 상태 확인


#### routes/analyze.js
**역할**: 이미지 분석 관련 API 경로

**경로**: `POST /api/analyze-image`

**하는 일**: 이미지 분석 요청을 컨트롤러로 전달

#### routes/pdf.js
**역할**: PDF 생성 관련 API 경로

**경로**: `POST /api/generate-pdf`

**하는 일**: PDF 생성 요청을 컨트롤러로 전달

---

### 🎯 controllers/ - 요청 처리

#### controllers/analyzeController.js
**역할**: 이미지 분석 요청을 처리

**받는 데이터**:
```json
{
  "job": "개발자",
  "problem": "서버 오류 발생",
  "imageUrl": "이미지 주소"
}
```

**하는 일**:
1. 요청 데이터 받기
2. OpenAI 서비스 호출하여 솔루션 생성
3. 결과 반환
4. 에러 발생 시 기본 솔루션 반환

**비유**: 주문을 받아서 주방에 전달하고, 완성된 요리를 손님에게 가져다 주는 웨이터

#### controllers/pdfController.js
**역할**: PDF 생성 요청을 처리

**받는 데이터**:
```json
{
  "html": "<html>...</html>"
}
```

**하는 일**:
1. HTML 데이터 받기
2. PDF 서비스 호출
3. PDF 파일 반환

---

### 🔧 services/ - 실제 작업 수행

#### services/openaiService.js
**역할**: OpenAI API를 사용해서 AI 솔루션 생성

**하는 일**:
1. 직군, 문제, 이미지를 AI에게 전달
2. AI가 3개의 해결 방안 생성
3. JSON 형식으로 반환

**예시**:
```
입력: "개발자", "서버 오류", [이미지]
출력: [
  { title: "로그 확인", description: "..." },
  { title: "에러 재현", description: "..." },
  { title: "코드 수정", description: "..." }
]
```

**비유**: 실제 요리를 만드는 요리사

#### services/pdfService.js
**역할**: HTML을 PDF 파일로 변환

**사용 도구**: Puppeteer (브라우저 자동화 도구)

**하는 일**:
1. 가상 브라우저 실행
2. HTML 내용을 브라우저에 로드
3. PDF로 변환
4. PDF 파일 반환

**비유**: 문서를 인쇄하는 프린터

---

### 🛡️ middleware/ - 검증 및 에러 처리

#### middleware/validation.js
**역할**: 요청 데이터가 올바른지 검증

**검증 항목**:
- `job`: 필수, 문자열, 100자 이하
- `problem`: 필수, 문자열, 500자 이하
- `imageUrl`: 선택, 10MB 이하
- `html`: 필수, 문자열, 5MB 이하, 스크립트 태그 금지

**보안 기능**:
- XSS 공격 방지 (악성 코드 제거)
- 입력 데이터 정제

**비유**: 주문이 올바른지 확인하는 검수원

#### middleware/errorHandler.js
**역할**: 에러 발생 시 처리

**하는 일**:
1. 에러 로그 기록
2. 에러 메시지 반환
3. 404 에러 처리 (존재하지 않는 경로)

**비유**: 문제 발생 시 처리하는 매니저

---

### ⚙️ config/ - 설정 관리

#### config/env.js
**역할**: 환경 변수 관리 및 검증

**하는 일**:
1. `.env` 파일에서 환경 변수 읽기
2. 필수 환경 변수 확인 (OPENAI_API_KEY 등)
3. 설정값을 객체로 정리해서 제공
4. 누락된 환경 변수가 있으면 에러 발생

**관리 항목**:
- `PORT`: 서버 포트 번호 (기본값: 5000)
- `OPENAI_API_KEY`: OpenAI API 키 (필수)
- `NODE_ENV`: 실행 환경 (development/production)
- `BACKEND_URL`: 백엔드 서버 주소

**예시**:
```javascript
// .env 파일에 저장
OPENAI_API_KEY=sk-xxxxx
PORT=5000

// config/env.js에서 사용
const config = {
  port: 5000,
  openaiApiKey: 'sk-xxxxx',
  nodeEnv: 'development'
};
```

**왜 필요한가요?**
- API 키 같은 민감한 정보를 코드에 직접 쓰지 않음
- 환경별로 다른 설정 사용 가능 (개발/운영)
- 설정값을 한 곳에서 관리


---

### 🛠️ utils/ - 유틸리티

#### utils/logger.js
**역할**: 로그 기록 (서버에서 일어나는 일을 기록)

**하는 일**:
1. 정보 로그 기록 (`logger.info`)
2. 에러 로그 기록 (`logger.error`)
3. 경고 로그 기록 (`logger.warn`)
4. 시간 정보 자동 추가

**로그 형식**:
```
[INFO] 2025-01-15T10:30:45.123Z - 서버가 시작되었습니다
[ERROR] 2025-01-15T10:31:20.456Z - PDF 생성 실패: timeout
```

**예시 사용**:
```javascript
logger.info('PDF 생성 시작...');
logger.error('에러 발생:', error.message);
logger.warn('메모리 사용량이 높습니다');
```

**왜 필요한가요?**
- 서버에서 무슨 일이 일어났는지 추적
- 에러 발생 시 원인 파악
- 성능 모니터링


---

## 3. API 동작 흐름

### 예시 1: 이미지 분석 요청

```
1. 사용자 (프론트엔드)
   ↓ POST /api/analyze-image
   { job: "개발자", problem: "서버 오류", imageUrl: "..." }

2. routes/analyze.js
   ↓ 요청 받음

3. middleware/validation.js
   ↓ 데이터 검증 (올바른지 확인)

4. controllers/analyzeController.js
   ↓ 요청 처리 시작

5. services/openaiService.js
   ↓ OpenAI API 호출
   ↓ AI가 솔루션 생성

6. controllers/analyzeController.js
   ↓ 결과 받음

7. 사용자에게 응답
   ↓ { solutions: [...] }
```

### 예시 2: PDF 생성 요청

```
1. 사용자 (프론트엔드)
   ↓ POST /api/generate-pdf
   { html: "<html>...</html>" }

2. routes/pdf.js
   ↓ 요청 받음

3. middleware/validation.js
   ↓ HTML 검증 (스크립트 태그 확인)

4. controllers/pdfController.js
   ↓ 요청 처리 시작

5. services/pdfService.js
   ↓ Puppeteer로 브라우저 실행
   ↓ HTML을 PDF로 변환

6. controllers/pdfController.js
   ↓ PDF 파일 받음

7. 사용자에게 PDF 파일 전송
   ↓ (PDF 바이너리 데이터)
```

---

## 4. 주요 기능 설명

### 🤖 AI 솔루션 생성

**어떻게 작동하나요?**

1. 사용자가 직군, 문제, 이미지를 입력
2. OpenAI API에 전달
3. AI가 전문가처럼 분석
4. 3개의 해결 방안 생성
5. JSON 형식으로 반환

**예시**:
```
입력: 
- 직군: "개발자"
- 문제: "데이터베이스 연결 오류"
- 이미지: [에러 화면 스크린샷]

출력:
[
  {
    "title": "연결 문자열 확인",
    "description": "데이터베이스 연결 문자열이 올바른지 확인하세요..."
  },
  {
    "title": "방화벽 설정 확인",
    "description": "서버 방화벽에서 데이터베이스 포트가 열려있는지 확인..."
  },
  {
    "title": "서비스 상태 확인",
    "description": "데이터베이스 서비스가 실행 중인지 확인..."
  }
]
```

### 📄 PDF 생성

**어떻게 작동하나요?**

1. 사용자가 리포트 화면에서 "PDF 다운로드" 클릭
2. 프론트엔드가 HTML을 생성
3. 백엔드에 HTML 전송
4. Puppeteer가 가상 브라우저 실행
5. HTML을 브라우저에 로드
6. PDF로 변환
7. PDF 파일 반환

**왜 Puppeteer를 사용하나요?**
- HTML을 실제 브라우저처럼 렌더링
- CSS 스타일이 제대로 적용됨
- 인쇄 품질이 좋음

---

## 🔒 보안 기능

### 1. 입력 검증
- 잘못된 데이터 차단
- 크기 제한 (너무 큰 파일 방지)
- 형식 검증

### 2. XSS 방지
- 악성 스크립트 제거
- HTML 태그 정제

### 3. 에러 처리
- 에러 발생 시 안전하게 처리
- 민감한 정보 노출 방지

---

## 📊 데이터 흐름도

```
프론트엔드
    ↓
[HTTP 요청]
    ↓
server.js (서버 시작)
    ↓
routes/ (경로 확인)
    ↓
middleware/validation.js (검증)
    ↓
controllers/ (요청 처리)
    ↓
services/ (실제 작업)
    ↓
[결과 반환]
    ↓
프론트엔드
```

---

## 🎯 핵심 정리

1. **server.js**: 서버를 시작하는 곳
2. **routes/**: 어떤 API가 있는지 정의
3. **controllers/**: 요청을 받아서 처리
4. **services/**: 실제 작업 (AI 호출, PDF 생성)
5. **middleware/**: 검증 및 에러 처리

**전체 흐름**: 요청 → 검증 → 처리 → 작업 → 응답

---

## 📝 참고사항

- **포트**: 5000번 포트 사용
- **환경 변수**: `.env` 파일에 API 키 등 저장
- **에러 처리**: 모든 에러는 안전하게 처리됨
- **로깅**: 모든 작업은 로그로 기록됨

---

## 5. AI 설정 변경하기

### 📝 AI 프롬프트 수정하기

**어디서 수정하나요?**
- 파일: `backend/services/openaiService.js`

**어떻게 수정하나요?**

#### 1단계: 파일 열기
1. `backend/services/openaiService.js` 파일을 엽니다

#### 2단계: 프롬프트 찾기
파일 안에서 이런 부분을 찾으세요:
```javascript
text: `직군: ${job}\n문제 상황: ${problem}\n\n위 문제 상황에 대한...`
```

#### 3단계: 프롬프트 수정하기

**이미지가 있을 때 (17-25줄)**:
```javascript
text: `직군: ${job}\n문제 상황: ${problem}\n\n위 이미지를 자세히 분석하여:
1. 이미지에서 실제로 보이는 문제 상황을 정확히 파악하세요
2. 파악한 실제 상황에 맞는 구체적이고 실용적인 해결 방안 3개를 제시하세요.

응답은 반드시 다음 JSON 형식으로만 작성하세요:
[
  {
    "title": "해결방안 제목 (간결하게)",
    "description": "구체적인 해결 방법 설명 (2-3문장, 실행 가능한 단계 포함)"
  },
  ...
]`
```

**이미지가 없을 때 (27-30줄)**:
```javascript
text: `직군: ${job}\n문제 상황: ${problem}\n\n위 문제 상황에 대한 구체적이고 실용적인 해결 방안 3개를 제시하세요.

응답은 반드시 다음 JSON 형식으로만 작성하세요:
[
  {
    "title": "해결방안 제목 (간결하게)",
    "description": "구체적인 해결 방법 설명 (2-3문장, 실행 가능한 단계 포함)"
  },
  ...
]`
```

**예시: 더 친절하게 바꾸기**
```javascript
text: `안녕! 너는 ${job} 분야의 최고 전문가야.
${problem}라는 문제가 생겼어.

이 문제를 해결하는 방법 3가지를 알려줘.
각 방법은:
- 제목: 간단하게 (예: "로그 확인하기")
- 설명: 2-3문장으로 자세히 (예: "먼저 에러 로그를 확인하고...")

이렇게 JSON 형식으로 답해줘:
[
  {"title": "...", "description": "..."},
  {"title": "...", "description": "..."},
  {"title": "...", "description": "..."}
]`
```

**비유**: 로봇 친구에게 말하는 방법을 바꾸는 것!

**주의사항**:
- 백틱(`) 안에 있는 글자를 수정하면 됩니다
- JSON 형식은 꼭 지켜야 합니다 (AI가 이해할 수 있게)
- `\n`은 줄바꿈입니다 (엔터키)

---

### 🎯 AI 모델 변경하기

**어디서 변경하나요?**
- 파일: `backend/services/openaiService.js`
- 위치: 34줄

**어떻게 변경하나요?**

#### 1단계: 파일 열기
1. `backend/services/openaiService.js` 파일을 엽니다

#### 2단계: 모델 찾기
34줄 근처에서 이런 부분을 찾으세요:
```javascript
model: 'gpt-4o',
```

#### 3단계: 모델 변경하기

**현재 설정**:
```javascript
model: 'gpt-4o',
```

**다른 모델로 바꾸기**:
```javascript
model: 'gpt-3.5-turbo',  // 더 빠르지만 덜 똑똑함
```

또는
```javascript
model: 'gpt-4-turbo',  // gpt-4o와 비슷하지만 조금 다름
```


**주의사항**:
- 작은따옴표(`'`) 안에 모델 이름을 써야 합니다
- 모델 이름은 정확히 써야 합니다
- 사용 가능한 모델: `gpt-4o`, `gpt-4-turbo`, `gpt-3.5-turbo` 등

---

### 🌡️ AI 온도(Temperature) 조절하기

**온도란?**
- **비유**: AI의 창의력 조절기
- 0에 가까울수록: 똑같은 답 (창의적이지 않음)
- 1에 가까울수록: 다양한 답 (매우 창의적)

**어디서 변경하나요?**
- 파일: `backend/services/openaiService.js`
- 위치: 43줄

**어떻게 변경하나요?**

#### 현재 설정
```javascript
temperature: 0.7,
```

#### 다른 값으로 바꾸기
```javascript
temperature: 0.3,  // 더 정확하고 똑같은 답
```

또는
```javascript
temperature: 0.9,  // 더 창의적이고 다양한 답
```

**비유**: 창의력 다이얼을 돌리는 것!

**추천 값**:
- `0.3` - 정확한 답이 필요할 때
- `0.7` - 적당히 창의적 (현재 설정)
- `0.9` - 매우 창의적인 답이 필요할 때

---

### 📏 최대 토큰(Max Tokens) 조절하기

**토큰이란?**
- **비유**: 글자 수 제한
- 토큰이 많을수록: 더 긴 답
- 토큰이 적을수록: 짧은 답

**어디서 변경하나요?**
- 파일: `backend/services/openaiService.js`
- 위치: 42줄

**어떻게 변경하나요?**

#### 현재 설정
```javascript
max_tokens: 2000,
```

#### 다른 값으로 바꾸기
```javascript
max_tokens: 1000,  // 더 짧은 답
```

또는
```javascript
max_tokens: 4000,  // 더 긴 답
```

**비유**: 답변 길이 조절기!

**주의사항**:
- 너무 작으면 답이 잘릴 수 있습니다
- 너무 크면 비용이 많이 듭니다
- 보통 1000-3000이 적당합니다

---

### 🎭 시스템 프롬프트 수정하기


**어디서 변경하나요?**
- 파일: `backend/services/openaiService.js`
- 위치: 36-39줄

**어떻게 변경하나요?**

#### 현재 설정
```javascript
{
  role: 'system',
  content: `당신은 ${job} 분야의 전문가입니다. ${hasImage ? '주어진 이미지를 분석하여 실제로 어떤 문제 상황인지 파악하고,' : '주어진 문제 상황을 분석하여'} 구체적이고 실용적인 해결 방안 3개를 제시해야 합니다.`,
}
```

#### 예시: 더 친절하게 바꾸기
```javascript
{
  role: 'system',
  content: `안녕! 너는 ${job} 분야의 최고 전문가야. 
사용자가 문제를 해결하는데 도와줘야 해.
친절하고 자세하게 설명해줘.`,
}
```

**비유**: 로봇 친구에게 역할을 알려주는 것!

---

### 📋 전체 설정 요약

**파일 위치**: `backend/services/openaiService.js`

**주요 설정 위치**:
- **프롬프트**: 17-30줄 (이미지 있을 때/없을 때)
- **모델**: 34줄 (`model: 'gpt-4o'`)
- **시스템 프롬프트**: 36-39줄 (`role: 'system'`)
- **최대 토큰**: 42줄 (`max_tokens: 2000`)
- **온도**: 43줄 (`temperature: 0.7`)

**변경 후 확인**:
1. 파일 저장
2. 서버 재시작 (`npm run dev`)
3. 테스트해보기

---

**작성일**: 2025년 12월 24일


