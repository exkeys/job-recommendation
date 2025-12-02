# 🖼️ 이미지 추가 가이드 (빠른 시작)

100개의 문제 상황 이미지를 추가하는 방법을 안내합니다.

## 🚀 빠른 시작 (2단계)

### 1단계: 이미지 파일 추가
카테고리에 맞는 폴더에 이미지를 넣으세요.

```
frontend/src/assets/problem-images/
├── dev/          ← 개발/IT 이미지
├── security/     ← 보안 이미지
├── design/       ← 디자인 이미지
└── ... (총 25개 카테고리)
```

**예시:**
```
frontend/src/assets/problem-images/dev/404-error.png
frontend/src/assets/problem-images/dev/server-delay.png
frontend/src/assets/problem-images/security/sql-injection.png
```

### 2단계: 매핑 추가
`frontend/src/data/problemImages.ts` 파일을 열고 이미지 정보를 추가하세요.

```typescript
export const problemImageMap: Record<string, ProblemImage> = {
  // 개발 / IT
  'DB 연결 오류': {
    path: '/src/assets/problem-images/dev/db-error.png',
    category: 'dev',
    alt: 'DB 연결 오류 화면'
  },
  '404 에러 발생': {
    path: '/src/assets/problem-images/dev/404-error.png',
    category: 'dev',
    alt: '404 에러 화면'
  },
  '서버 응답 지연': {
    path: '/src/assets/problem-images/dev/server-delay.png',
    category: 'dev',
    alt: '서버 응답 지연 화면'
  },
  
  // 보안 / 정보보호
  'SQL 인젝션 공격 탐지': {
    path: '/src/assets/problem-images/security/sql-injection.png',
    category: 'security',
    alt: 'SQL 인젝션 공격 화면'
  },
  
  // ... 나머지 이미지들
};
```

## 📋 전체 문제 목록

매핑이 필요한 문제들입니다. `frontend/src/data/problems.ts` 참고.

### 개발 / IT (dev 폴더)
- [ ] 404 에러 발생
- [ ] 서버 응답 지연
- [ ] 배포 실패
- [x] DB 연결 오류 ✅
- [ ] 메모리 누수
- [ ] API 인증 실패
- [ ] Git 충돌
- [ ] CORS 문제
- [ ] 배포 환경 변수 오류
- [ ] 빌드 실패

### 보안 / 정보보호 (security 폴더)
- [ ] SQL 인젝션 공격 탐지
- [ ] 비정상 로그인 시도
- [ ] 데이터 유출 의심
- [ ] 랜섬웨어 감염
- [ ] 방화벽 설정 오류
- [ ] SSL 인증서 만료
- [ ] 권한 관리 문제
- [ ] DDoS 공격
- [ ] 취약점 스캔 결과
- [ ] 보안 패치 미적용

... (나머지 23개 카테고리)

## 💡 팁

### 파일명 규칙
```
문제명: "DB 연결 오류"
→ 파일명: db-error.png

문제명: "404 에러 발생"
→ 파일명: 404-error.png

문제명: "SQL 인젝션 공격 탐지"
→ 파일명: sql-injection.png
```

### 이미지 사양
- **크기**: 800x600px 권장
- **포맷**: PNG 또는 JPG
- **용량**: 500KB 이하

### 체크리스트
- [ ] 이미지 파일이 올바른 카테고리 폴더에 있나요?
- [ ] `problemImages.ts`에 매핑을 추가했나요?
- [ ] 문제명이 정확히 일치하나요? (대소문자, 공백 포함)
- [ ] 브라우저에서 테스트해봤나요?

## 🔍 테스트 방법

1. 프론트엔드 실행:
```bash
cd frontend
npm run dev
```

2. 브라우저에서 `http://localhost:3000` 접속
3. 해당 직군 → 문제 선택
4. 이미지가 정상적으로 표시되는지 확인

## ❓ 문제 해결

**이미지가 안 보여요**
1. 파일 경로 확인: `/src/assets/problem-images/카테고리/파일명.png`
2. 문제명 확인: `problemImages.ts`의 키와 `problems.ts`의 문제명이 정확히 일치해야 함
3. 브라우저 새로고침 (Ctrl + Shift + R)

**이미지는 보이는데 GPT가 분석을 못해요**
- 백엔드 서버가 실행 중인지 확인
- 이미지가 너무 크면 압축 권장

## 📞 도움이 필요하면

개발팀에 문의하거나 이슈를 등록하세요.

