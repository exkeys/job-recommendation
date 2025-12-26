# 프론트엔드 작업 명세서

> **마크다운 미리보기**: VS Code에서 `Ctrl + Shift + V` (Windows/Linux) 또는 `Cmd + Shift + V` (Mac)를 누르면 이 문서를 보기 좋게 볼 수 있습니다.

> **웹 시작 방법**: 
> - **중요**: `PS C:\jobs_one>` 여기 위치에서 실행해야 합니다
> - **Windows PowerShell(Terminal 창)**: `cd frontend; npm run dev`
> - **Mac/Linux**: `cd frontend && npm run dev`
> - 또는 `cd frontend` 후 `npm run dev` (두 줄로 실행)

> **전체 앱 실행 방법** (백엔드 + 프론트엔드 동시 실행):
> - **터미널 창 2개 필요**: 백엔드와 프론트엔드를 각각 다른 터미널에서 실행
> - **첫 번째 터미널 (백엔드)**: `PS C:\jobs_one>` 위치에서 `cd backend; npm run dev`
> - **두 번째 터미널 (프론트엔드)**: `PS C:\jobs_one>` 위치에서 `cd frontend; npm run dev`
> - 또는 각각 `cd backend` 후 `npm run dev`, 다른 터미널 창에서 `cd frontend` 후 `npm run dev` (두 줄로 실행)

---

## 📋 목차

1. [전체 구조 개요](#1-전체-구조-개요)
2. [각 폴더별 역할](#2-각-폴더별-역할)
3. [페이지 동작 흐름](#3-페이지-동작-흐름)
4. [주요 기능 설명](#4-주요-기능-설명)
5. [내용 추가하는 방법](#5-내용-추가하는-방법)

---

## 1. 전체 구조 개요

### 간단 요약
- **main.tsx**: 앱을 시작하는 곳
- **App.tsx**: 앱 전체 구조
- **router/**: 어떤 페이지가 있는지 정의
- **pages/**: 실제 화면들
- **components/**: 여러 곳에서 쓰는 작은 그림들
- **hooks/**: 특별한 기능들
- **store/**: 선택한 것들 기억하기
- **api/**: 백엔드와 대화
- **assets/**: 이미지 파일들
- **utils/**: 도구들
- **types/**: 데이터 모양 정의
- **constants/**: 변하지 않는 값들
- **data/**: 화면에 보여줄 데이터

---

## 2. 각 폴더별 역할

### 🚀 main.tsx - 앱 시작점

**역할**: 앱을 처음 시작하는 곳

**하는 일**:
1. HTML에서 `root`라는 곳 찾기
2. App 컴포넌트를 그곳에 그리기
3. 앱 시작!


```tsx
// HTML의 <div id="root"></div>에 앱을 그림
createRoot(document.getElementById('root')!).render(
  <App />
);
```

---

### 📖 App.tsx - 앱 전체 구조

**역할**: 앱의 전체 틀을 만드는 곳

**하는 일**:
1. 에러 처리 설정 (문제 생기면 잡아줌)
2. 라우터 설정 (페이지 이동 가능하게)
3. 모든 페이지를 감싸기

**비유**: 만화책의 표지와 목차 - 전체 구조를 정함

```tsx
function App() {
  return (
    <ErrorBoundary>        {/* 문제 생기면 잡아줌 */}
      <BrowserRouter>      {/* 페이지 이동 가능하게 */}
        <AppRoutes />      {/* 실제 페이지들 */}
      </BrowserRouter>
    </ErrorBoundary>
  );
}
```

---

### 🗺️ router/ - 페이지 경로 관리

#### router/config.tsx
**역할**: 어떤 페이지가 있는지 정의

**하는 일**:
- `/` → 첫 페이지 (JobSelect)
- `/problem-select` → 문제 선택 페이지
- `/solution-select` → 솔루션 선택 페이지
- `/report` → 리포트 페이지

**비유**: 만화책 목차 - 몇 페이지에 뭐가 있는지

**특별한 기능**:
- 모든 페이지는 즉시 로드 (사용자 경험 우선)
- 빠른 페이지 전환을 위해 모든 페이지를 미리 준비

#### router/index.ts
**역할**: 라우터를 실제로 작동하게 함

**하는 일**: 페이지 이동 기능 제공

---

### 📄 pages/ - 실제 화면들

#### pages/JobSelect.tsx
**역할**: 직군 선택 화면

**하는 일**:
1. 직군 목록 보여주기
2. 직군 선택하면 저장
3. 다음 페이지로 이동

**비유**: 만화책의 첫 번째 이야기

#### pages/ProblemSelect.tsx
**역할**: 문제 선택 화면

**하는 일**:
1. 선택한 직군의 문제들 보여주기
2. 문제 선택하면 저장
3. 다음 페이지로 이동

#### pages/SolutionSelect.tsx
**역할**: 솔루션 선택 화면

**하는 일**:
1. AI가 만든 해결 방법들 보여주기
2. 솔루션 선택하면 저장
3. 리포트 페이지로 이동

#### pages/Report.tsx
**역할**: 리포트 화면

**하는 일**:
1. 선택한 모든 것들 보여주기
2. PDF 다운로드 버튼
3. 리포트 내용 표시

#### pages/NotFound.tsx
**역할**: 없는 페이지 접근 시

**하는 일**: "페이지를 찾을 수 없어요!" 메시지 보여주기

---

### 🧩 components/ - 재사용 컴포넌트

**역할**: 여러 곳에서 쓰는 작은 그림들

#### components/JobCard.tsx
**역할**: 직군 카드 (작은 상자)

**하는 일**: 직군 하나를 예쁘게 보여주기

**비유**: 만화책에서 자주 나오는 그림 - 여러 곳에서 재사용

#### components/LoadingSpinner.tsx
**역할**: 로딩 스피너 (돌아가는 원)

**하는 일**: "기다려주세요" 메시지와 함께 돌아가는 원 보여주기

#### components/PageHeader.tsx
**역할**: 페이지 상단 헤더

**하는 일**: 뒤로가기 버튼, 제목 등 보여주기

#### components/ErrorBoundary.tsx
**역할**: 에러 잡기

**하는 일**: 문제 생기면 "에러가 발생했어요" 화면 보여주기

**비유**: 안전망 - 문제 생기면 잡아줌

---

### 🎣 hooks/ - 특별한 기능들

**역할**: 여러 페이지에서 쓰는 특별한 기능

#### hooks/useNavigation.ts
**역할**: 페이지 이동 기능

**하는 일**:
- `goTo('/problem-select')` → 문제 선택 페이지로 이동
- `goBack()` → 이전 페이지로 이동
- `goHome()` → 첫 페이지로 이동

**비유**: 텔레포트 능력 - 어디든 이동 가능

#### hooks/useScrollToTop.ts
**역할**: 페이지 맨 위로 스크롤

**하는 일**: 페이지 열릴 때 자동으로 맨 위로 이동

**비유**: 자동으로 책 첫 페이지로 넘기는 것

#### hooks/useRouteGuard.ts
**역할**: 페이지 보호

**하는 일**: 필요한 정보가 없으면 다른 페이지로 보냄

**예시**: 리포트 페이지는 직군, 문제, 솔루션이 모두 있어야 들어갈 수 있음

**비유**: 열쇠가 있어야 들어갈 수 있는 방

#### hooks/useImageLoader.ts
**역할**: 이미지 불러오기

**하는 일**: 이미지를 미리 불러와서 빠르게 보여주기

#### hooks/useSolutionGenerator.ts
**역할**: AI 솔루션 생성

**하는 일**: 백엔드에 요청해서 AI가 만든 해결 방법 가져오기

---

### 📦 store/ - 기억 상자

#### store/useStore.ts
**역할**: 선택한 것들을 기억하는 곳

**저장하는 것**:
- `selectedJob`: 선택한 직군
- `selectedProblem`: 선택한 문제
- `selectedImage`: 선택한 이미지
- `selectedSolution`: 선택한 솔루션

**하는 일**:
- 선택하면 저장
- 다른 페이지에서도 사용 가능
- `reset()`으로 모두 지우기

**비유**: 기억 상자 - 선택한 것들을 넣어두고 나중에 꺼내 씀

**예시**:
```tsx
// 직군 선택 페이지에서
setSelectedJob('개발자');

// 리포트 페이지에서
const { selectedJob } = useStore();  // '개발자' 가져오기
```

---

### 🌐 api/ - 백엔드와 대화

**역할**: 백엔드 서버와 통신하는 곳

#### api/openai.ts
**역할**: AI 솔루션 생성 요청

**하는 일**:
1. 직군, 문제, 이미지를 백엔드에 보내기
2. AI가 만든 솔루션 받아오기
3. 데이터 검증하기
4. 결과 반환하기

**비유**: 전화하기 - 백엔드에게 물어보고 답 받기

**예시**:
```tsx
const solutions = await generateSolutions(
  '개발자',           // 직군
  '서버 오류',        // 문제
  '이미지주소'        // 이미지
);
// → [{ title: "...", description: "..." }, ...]
```

#### api/errorTypes.ts
**역할**: 에러 종류 정의

**하는 일**: 어떤 종류의 에러가 있는지 정의

**에러 종류**:
- `APIError`: API 요청 에러
- `ValidationError`: 데이터 검증 에러



---

### 🛠️ utils/ - 도구들

**역할**: 여러 곳에서 쓰는 작은 도구들

#### utils/report/ - PDF 관련 도구들

**utils/report/pdfGenerator.ts**
**역할**: PDF 만들기

**하는 일**: 리포트를 PDF 파일로 변환

**비유**: 문서를 인쇄하는 프린터

**utils/report/pdfHelpers.ts**
**역할**: PDF 만들 때 필요한 작은 도구들

**하는 일**:
- 파일명 만들기
- 날짜 포맷하기
- 파일명 정리하기

**utils/report/pdfTemplates.ts**
**역할**: PDF 모양 만들기

**하는 일**: PDF에 들어갈 내용을 HTML로 만들기

**비유**: 편지지 - 편지 쓸 때 쓰는 종이

#### utils/security.ts
**역할**: 보안 도구

**하는 일**:
- 나쁜 코드 제거 (XSS 방지)
- 입력 데이터 정리
- 안전한 글자로 바꾸기

**비유**: 필터 - 나쁜 것 걸러내기

**예시**:
```tsx
escapeHtml('<script>악성코드</script>')
// → '&lt;script&gt;악성코드&lt;/script&gt;'
// 나쁜 코드가 실행되지 않음
```

#### utils/errorHandler.ts
**역할**: 에러 처리 도구

**하는 일**:
- 에러 메시지 만들기
- 에러 종류 파악하기
- 사용자에게 보기 좋게 보여주기


#### utils/typeGuards.ts
**역할**: 데이터 확인 도구

**하는 일**: 데이터가 올바른 모양인지 확인

**예시**:
```tsx
isSolutionArray(data)  // 데이터가 솔루션 배열인지 확인
```


#### utils/image.ts
**역할**: 이미지 관련 도구

**하는 일**: 이미지 처리, 크기 조정 등

---

### 📊 constants/ - 상수들

**역할**: 변하지 않는 값들

#### constants/routes.ts
**역할**: 페이지 경로들

**예시**:
```tsx
ROUTES.HOME = '/'
ROUTES.REPORT = '/report'
```

#### constants/styles.ts
**역할**: 스타일 상수들

**예시**: 버튼 색깔, 크기 등

#### constants/api.ts
**역할**: API 주소들

**예시**: 백엔드 서버 주소

**하는 일**: 백엔드 서버 주소를 한 곳에서 관리

#### constants/report/pdfStyles.ts
**역할**: PDF 스타일 (CSS)

**하는 일**: PDF 만들 때 사용할 스타일 정의


---

### 📚 data/ - 데이터

**역할**: 화면에 보여줄 데이터들

#### data/problems.ts
**역할**: 직군과 문제 목록

**하는 일**: 어떤 직군에 어떤 문제가 있는지 정의


#### data/jobImages.ts
**역할**: 직군 이미지 주소들

**하는 일**: 각 직군에 맞는 이미지 주소 저장

#### data/problemImages.ts
**역할**: 문제 이미지 주소들

**하는 일**: 각 문제에 맞는 이미지 주소 저장

---

### 🖼️ assets/ - 이미지 파일들

**역할**: 화면에 보여줄 실제 이미지 파일들

#### assets/problem-images/
**역할**: 문제 상황 이미지들

**구조**:
- `dev/` → 개발자 관련 문제 이미지
- `design/` → 디자이너 관련 문제 이미지
- `marketing/` → 마케팅 관련 문제 이미지
- 등등...

**하는 일**: 각 직군별 문제 상황을 보여주는 이미지 저장

**비유**: 사진 앨범 - 실제 사진 파일들이 들어있음

**예시**:
```
assets/problem-images/dev/
  - db-error.png (데이터베이스 오류 이미지)
  - ServerError_1.png (서버 오류 이미지)
  - 4-cut-comic-panel-1.png (만화 이미지)
```

---

### 🌍 i18n/ - 다국어 지원

**역할**: 여러 나라 언어 지원 (국제화)

**하는 일**: 한국어, 영어 등 여러 언어로 보여주기

**비유**: 번역기 - 같은 내용을 여러 언어로 바꿔주기

**현재 상태**: 준비 중 (나중에 추가 예정)

---

### 📝 types/ - 타입 정의

**역할**: 데이터가 어떤 모양인지 정의

**비유**: 레고 설명서 - 어떤 조각이 어떤 모양인지 알려줌

#### types/api.ts
**역할**: API 관련 데이터 모양

**정의하는 것**:
- `Solution`: 솔루션 데이터 모양
- `AnalyzeImageRequest`: API 요청 데이터 모양
- `AnalyzeImageResponse`: API 응답 데이터 모양

**예시**:
```tsx
interface Solution {
  title: string;        // 제목은 글자
  description: string;  // 설명도 글자
}
```

#### types/common.ts
**역할**: 공통으로 쓰는 데이터 모양

**정의하는 것**:
- `LoadingState`: 로딩 상태 (대기 중, 로딩 중, 완료, 에러)
- `Optional`: 선택적 데이터

#### types/navigation.ts
**역할**: 페이지 이동 관련 데이터 모양

**정의하는 것**: 네비게이션 관련 타입들

#### types/images.d.ts
**역할**: 이미지 파일 타입 정의

**하는 일**: 이미지 파일을 import할 때 타입 체크

**비유**: 사진 앨범 목록 - 어떤 사진이 있는지 정리

---

## 3. 페이지 동작 흐름

### 예시: 직군 선택부터 리포트까지

```
1. 사용자가 앱 열기
   ↓
2. main.tsx 실행
   ↓ App.tsx 렌더링
   ↓
3. router/config.tsx
   ↓ 첫 페이지(/) 찾기
   ↓
4. pages/JobSelect.tsx
   ↓ 직군 목록 보여주기
   ↓ 사용자가 "개발자" 선택
   ↓ store/useStore.ts에 저장
   ↓
5. hooks/useNavigation.ts
   ↓ goTo('/problem-select')
   ↓
6. pages/ProblemSelect.tsx
   ↓ "개발자"의 문제들 보여주기
   ↓ 사용자가 문제 선택
   ↓ store에 저장
   ↓
7. pages/SolutionSelect.tsx
   ↓ hooks/useSolutionGenerator.ts
   ↓ api/openai.ts로 백엔드에 요청
   ↓ AI 솔루션 받아오기
   ↓ 사용자가 솔루션 선택
   ↓
8. pages/Report.tsx
   ↓ store에서 모든 선택 가져오기
   ↓ 리포트 보여주기
   ↓ PDF 다운로드 가능
```

---

## 4. 주요 기능 설명

### 🎨 컴포넌트 재사용

**어떻게 작동하나요?**

1. `JobCard` 컴포넌트 만들기
2. 여러 곳에서 사용
3. 같은 모양으로 여러 개 보여주기

**예시**:
```tsx
// JobCard 하나 만들기
<JobCard job="개발자" />

// 여러 개 사용
{jobCategories.map(job => (
  <JobCard key={job.name} job={job.name} />
))}
```

**비유**: 도장 찍기 - 같은 도장으로 여러 번 찍기

---

### 💾 상태 관리 (Store)

**어떻게 작동하나요?**

1. 사용자가 선택
2. Store에 저장
3. 다른 페이지에서 사용

**예시**:
```
페이지 1: "개발자" 선택 → Store에 저장
페이지 2: Store에서 "개발자" 가져오기
페이지 3: Store에서 "개발자" 가져오기
```

**비유**: 공유 상자 - 누구나 넣고 꺼낼 수 있음

---

---

### 🎣 커스텀 훅 (Hooks)

**어떻게 작동하나요?**

여러 페이지에서 쓰는 기능을 하나로 묶기

**예시**:
```tsx
// useNavigation 훅
const { goTo, goBack } = useNavigation();

// 어디서든 사용
goTo('/report');  // 리포트로 이동
goBack();         // 뒤로 가기
```

**비유**: 만능 도구 - 여러 곳에서 쓸 수 있는 특별한 능력

---

### 🔄 페이지 이동 (Router)

**어떻게 작동하나요?**

1. URL이 바뀜 (`/problem-select`)
2. Router가 해당 페이지 찾기
3. 페이지 보여주기

**비유**: 책 넘기기 - 몇 페이지로 가면 그 페이지 보여주기

---

## 📊 데이터 흐름도

```
사용자 클릭
    ↓
페이지 컴포넌트
    ↓
Store에 저장 (또는 Hooks 사용)
    ↓
다른 페이지에서 사용
    ↓
화면에 표시
```

---

## 🎯 핵심 정리

1. **main.tsx**: 앱 시작
2. **App.tsx**: 전체 구조
3. **router/**: 페이지 경로
4. **pages/**: 실제 화면
5. **components/**: 재사용 그림
6. **hooks/**: 특별한 기능
7. **store/**: 기억 상자
8. **api/**: 백엔드와 대화
9. **assets/**: 이미지 파일들
10. **utils/**: 도구들
11. **types/**: 데이터 모양 정의
12. **constants/**: 변하지 않는 값들
13. **data/**: 화면 데이터

**전체 흐름**: 시작 → 구조 설정 → 페이지 보여주기 → 사용자 선택 → 저장 → 다음 페이지

---

## 🎨 화면 구성 요소

### 페이지 구조
```
┌─────────────────────────┐
│   PageHeader (상단)     │  ← 뒤로가기, 제목
├─────────────────────────┤
│                         │
│   페이지 내용           │  ← 실제 내용
│                         │
├─────────────────────────┤
│   버튼들 (하단)         │  ← 다음, 저장 등
└─────────────────────────┘
```

---

## 🔒 보안 기능

### 1. XSS 방지
- 나쁜 코드 제거
- 안전하게 표시

### 2. 입력 검증
- 잘못된 데이터 차단
- 올바른 형식만 받기

### 3. 에러 처리
- 문제 생기면 잡아줌
- 에러 화면 보여주기

---

## 📝 참고사항

- **포트**: 3000번 포트 사용
- **빌드**: `npm run build`로 배포 파일 생성
- **개발**: `npm run dev`로 개발 서버 시작
- **페이지 로딩**: 모든 페이지는 즉시 로드되어 빠른 전환 제공

---

## 5. 내용 추가하는 방법

### 🎯 새로운 직업(직군) 추가하기

**어디에 추가하나요?**
- 파일: `frontend/src/data/problems.ts`

**어떻게 추가하나요?**

1. 파일 열기
   - `frontend/src/data/problems.ts` 파일을 엽니다

2. `jobCategories` 배열 찾기
   - 파일 안에 `jobCategories`라는 배열이 있습니다
   - 이 배열에 새로운 직업을 추가하면 됩니다

3. 새로운 직업 추가하기
   ```tsx
   {
     id: '새직업이름',           // 영어로 (예: 'teacher')
     name: '새 직업 이름',        // 한글로 (예: '교사')
     icon: 'ri-아이콘이름',       // 아이콘 이름 (예: 'ri-book-line')
     problems: [                 // 이 직업의 문제들
       '문제 1',
       '문제 2',
       '문제 3'
     ]
   }
   ```

4. 예시
   ```tsx
   {
     id: 'teacher',
     name: '교사',
     icon: 'ri-book-line',
     problems: [
       '학생 지도 방법',
       '수업 준비',
       '학부모 상담'
     ]
   }
   ```


**주의사항**:
- `id`는 영어로, 소문자로 쓰세요
- `icon`은 RemixIcon에서 골라서 쓰세요 (https://remixicon.com)
- `problems`는 배열이므로 `[ ]` 안에 넣고 쉼표(`,`)로 구분하세요

---

### 📚 경험 페이지에 직업 추가하기


경험 페이지(`JobExperience`)는 자동으로 `problems.ts` 파일의 직업들을 가져옵니다!

**즉, `problems.ts`에 직업을 추가하면:**
- ✅ 첫 페이지(JobSelect)에 자동으로 나타남
- ✅ 경험 페이지(JobExperience)에 자동으로 나타남
- ✅ 별도로 경험 페이지를 수정할 필요 없음!


**확인 방법**:
1. `problems.ts`에 직업 추가
2. 앱 실행 (`npm run dev`)
3. 첫 페이지와 경험 페이지에서 확인

---

### 🎨 만화 4컷 추가하기

**어디에 추가하나요?**
1. 이미지 파일: `frontend/src/assets/problem-images/직업이름/` 폴더
2. 이미지 경로: `frontend/src/data/problemImages.ts` 파일

**어떻게 추가하나요?**

#### 1단계: 이미지 파일 준비하기

1. 만화 4컷 이미지 4개 준비
   - `4-cut-comic-panel-1.png` (첫 번째 그림)
   - `4-cut-comic-panel-2.png` (두 번째 그림)
   - `4-cut-comic-panel-3.png` (세 번째 그림)
   - `4-cut-comic-panel-4.png` (네 번째 그림)

2. 이미지 파일 넣기
   - `frontend/src/assets/problem-images/직업이름/` 폴더에 넣기
   - 예: `frontend/src/assets/problem-images/dev/` (개발자용)

**비유**: 사진을 앨범에 넣는 것!

#### 2단계: 이미지 경로 등록하기

1. `frontend/src/data/problemImages.ts` 파일 열기

2. `problemImageMap` 객체에 추가하기
   - 이 객체는 문제 이름과 이미지 경로를 연결합니다

3. 새로운 문제 이미지 추가하기
   ```tsx
   '문제 이름': {
     path: '/src/assets/problem-images/직업이름/4-cut-comic-panel-1.png',
     paths: [
       '/src/assets/problem-images/직업이름/4-cut-comic-panel-1.png',
       '/src/assets/problem-images/직업이름/4-cut-comic-panel-2.png',
       '/src/assets/problem-images/직업이름/4-cut-comic-panel-3.png',
       '/src/assets/problem-images/직업이름/4-cut-comic-panel-4.png'
     ],
     category: '직업id',  // 예: 'dev', 'design' 등
     alt: '이미지 설명'
   }
   ```

**예시 (전체 코드)**:
```tsx
// problemImages.ts 파일의 problemImageMap에 추가
'404 에러 발생': {
  path: '/src/assets/problem-images/dev/4-cut-comic-panel-1.png',
  paths: [
    '/src/assets/problem-images/dev/4-cut-comic-panel-1.png',
    '/src/assets/problem-images/dev/4-cut-comic-panel-2.png',
    '/src/assets/problem-images/dev/4-cut-comic-panel-3.png',
    '/src/assets/problem-images/dev/4-cut-comic-panel-4.png'
  ],
  category: 'dev',
  alt: '404 에러 발생 만화'
}
```

**비유**: 사진 앨범에 사진을 넣고, 목차에 어디에 있는지 적는 것!

**주의사항**:
- 이미지 파일 이름은 정확히 맞춰야 합니다
- 경로(`/src/assets/...`)도 정확히 써야 합니다
- 이미지가 4개가 아니어도 됩니다 (1개, 2개, 3개도 가능)
- `paths` 배열에 여러 이미지를 넣으면 솔루션 페이지에 여러 개가 보입니다

---

### 📋 전체 과정 요약

#### 직업 추가하기
```
1. problems.ts 파일 열기
   ↓
2. jobCategories 배열에 새 직업 추가
   ↓
3. 저장하고 앱 실행
   ↓
4. 완료! 자동으로 모든 페이지에 나타남
```

#### 만화 4컷 추가하기
```
1. 이미지 파일 4개 준비
   ↓
2. assets/problem-images/직업이름/ 폴더에 넣기
   ↓
3. problemImages.ts 파일 열기
   ↓
4. problemImageMap에 문제 이름과 이미지 경로 추가
   ↓
5. 저장하고 앱 실행
   ↓
6. 완료! 솔루션 페이지에 만화가 나타남
```


**작성일**: 2025년 12월 24일 

