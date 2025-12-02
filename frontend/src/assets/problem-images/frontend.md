# 문제 상황 이미지 관리 가이드

이 폴더는 100개 이상의 문제 상황 이미지를 체계적으로 관리하기 위한 대기업 수준의 구조입니다.

## 📁 폴더 구조

```
problem-images/
├── dev/              # 개발 / IT
├── security/         # 보안 / 정보보호
├── design/           # 디자인
├── marketing/        # 마케팅
├── pm/               # 기획 / PM
├── management/       # 경영 / 사무
├── sales/            # 영업 / 판매
├── finance/          # 회계 / 금융
├── construction/     # 건설 / 토목
├── research/         # 연구 / 엔지니어
├── service/          # 서비스 / 교육
├── medical/          # 의료 / 보건
├── legal/            # 법률 / 법무
├── hr/               # 인사 / 채용
├── manufacturing/    # 제조 / 생산
├── logistics/        # 물류 / 유통
├── media/            # 미디어 / 콘텐츠
├── food/             # 식음료 / 외식
├── beauty/           # 뷰티 / 미용
├── sports/           # 스포츠 / 레저
├── real_estate/      # 부동산 / 건축
├── environment/      # 환경 / 에너지
├── public/           # 공공 / 행정
├── ngo/              # 비영리 / 사회복지
└── agriculture/      # 농업 / 축산
```

## 🖼️ 이미지 추가 방법

### 1단계: 이미지 파일 추가
해당 카테고리 폴더에 이미지를 넣습니다.

```bash
# 예시: DB 연결 오류 이미지 추가
frontend/src/assets/problem-images/dev/db-error.png
```

### 2단계: 매핑 파일 업데이트
`frontend/src/data/problemImages.ts` 파일에 이미지 정보를 추가합니다.

```typescript
export const problemImageMap: Record<string, ProblemImage> = {
  // 기존 이미지...
  
  // 새 이미지 추가
  '404 에러 발생': {
    path: '/src/assets/problem-images/dev/404-error.png',
    category: 'dev',
    alt: '404 에러 화면'
  },
};
```

## 📝 파일명 규칙

1. **소문자 사용**: 모든 파일명은 소문자로 작성
2. **하이픈 구분**: 단어는 하이픈(-)으로 구분
3. **의미 있는 이름**: 문제 상황을 명확히 나타내는 이름 사용
4. **확장자**: `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg` 지원

### 좋은 예시
- `db-error.png`
- `404-error.png`
- `server-delay.png`
- `api-auth-fail.png`

### 나쁜 예시
- `image1.png` ❌ (의미 없는 이름)
- `DB Error.png` ❌ (대문자, 공백 사용)
- `dbError.png` ❌ (camelCase)

## 🎨 이미지 사양

### 권장 사양
- **크기**: 800x600px ~ 1920x1080px
- **비율**: 4:3 또는 16:9
- **포맷**: PNG (투명 배경) 또는 JPG (일반 사진)
- **용량**: 500KB 이하 (최적화 권장)

### 최적화 도구
- [TinyPNG](https://tinypng.com/) - PNG/JPG 압축
- [Squoosh](https://squoosh.app/) - 다양한 포맷 지원
- [ImageOptim](https://imageoptim.com/) - 무손실 압축

## 🚀 자동화 스크립트

### 이미지 일괄 추가 (예정)
```bash
npm run add-images
```

### 이미지 최적화 (예정)
```bash
npm run optimize-images
```

## 📊 현재 상태

- **총 카테고리**: 25개
- **등록된 이미지**: 1개 (DB 연결 오류)
- **남은 작업**: 99개 이미지 추가 예정

## 💡 팁

1. **일관성 유지**: 같은 카테고리 내에서 비슷한 스타일 유지
2. **접근성**: alt 텍스트를 명확하게 작성
3. **성능**: 이미지는 lazy loading으로 로드됨
4. **버전 관리**: Git LFS 사용 고려 (큰 이미지 파일용)

## 🔍 문제 해결

### 이미지가 표시되지 않을 때
1. 파일 경로가 올바른지 확인
2. `problemImages.ts`에 매핑이 추가되었는지 확인
3. 브라우저 캐시 삭제 후 새로고침
4. 개발자 도구 콘솔에서 에러 확인

### 이미지 로딩이 느릴 때
1. 이미지 파일 크기 확인 (500KB 이하 권장)
2. WebP 포맷 사용 고려
3. CDN 사용 고려

## 📞 문의

이미지 관리 관련 문의사항은 개발팀에 문의하세요.

