/**
 * 직군별 문제 상황 데이터
 */

export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  problems: string[];
}

export interface Problem {
  title: string;
  image: string;
}

export const jobCategories: JobCategory[] = [
  { 
    id: 'dev', 
    name: '개발 / IT', 
    icon: 'ri-code-s-slash-line',
    problems: [
      '404 에러 발생', '서버 응답 지연', '배포 실패', 'DB 연결 오류', '메모리 누수',
      'API 인증 실패', 'Git 충돌', 'CORS 문제', '배포 환경 변수 오류', '빌드 실패'
    ]
  },
  { 
    id: 'security', 
    name: '보안 / 정보보호', 
    icon: 'ri-shield-check-line',
    problems: [
      'SQL 인젝션 공격 탐지', '비정상 로그인 시도', '데이터 유출 의심', '랜섬웨어 감염', '방화벽 설정 오류',
      'SSL 인증서 만료', '권한 관리 문제', 'DDoS 공격', '취약점 스캔 결과', '보안 패치 미적용'
    ]
  },
  { 
    id: 'design', 
    name: '디자인', 
    icon: 'ri-palette-line',
    problems: [
      '클라이언트 피드백 반영', '디자인 시스템 구축', '브랜드 아이덴티티 작업', '사용자 경험 개선', '반응형 디자인 작업',
      '프로토타입 제작', '디자인 가이드 작성', 'UI 컴포넌트 설계', '비주얼 콘셉트 기획', '디자인 리뷰 진행'
    ]
  },
  { 
    id: 'marketing', 
    name: '마케팅', 
    icon: 'ri-megaphone-line',
    problems: [
      '캠페인 기획 및 실행', '타겟 고객 분석', 'SNS 콘텐츠 제작', '광고 성과 분석', '브랜드 전략 수립',
      '시장 조사 진행', '경쟁사 분석', '고객 인사이트 도출', '마케팅 예산 관리', '프로모션 기획'
    ]
  },
  { 
    id: 'pm', 
    name: '기획 / PM', 
    icon: 'ri-lightbulb-line',
    problems: [
      '프로젝트 일정 관리', '요구사항 정의', '이해관계자 조율', '리소스 배분', '우선순위 설정',
      '프로젝트 진행 상황 보고', '리스크 관리', '팀 커뮤니케이션', '스프린트 계획', '제품 로드맵 작성'
    ]
  },
  { 
    id: 'management', 
    name: '경영 / 사무', 
    icon: 'ri-briefcase-line',
    problems: [
      '업무 프로세스 개선', '문서 작성 및 관리', '회의 일정 조율', '부서 간 협업 조정', '경영 보고서 작성',
      '인력 관리', '의사결정 지원', '정보 공유 체계 구축', '업무 효율화', '성과 관리'
    ]
  },
  { 
    id: 'sales', 
    name: '영업 / 판매', 
    icon: 'ri-shopping-bag-line',
    problems: [
      '고객 상담 및 응대', '제품 설명 및 제안', '견적서 작성', '계약 체결', '고객 관계 관리',
      '신규 고객 발굴', '영업 목표 달성', '클레임 처리', '재구매 유도', '시장 동향 파악'
    ]
  },
  { 
    id: 'finance', 
    name: '회계 / 금융', 
    icon: 'ri-money-dollar-circle-line',
    problems: [
      '전표 입력 및 처리', '회계 마감 작업', '회계 예산 편성', '세무 신고', '재무제표 작성',
      '비용 관리', '회계 감사 대응', '자금 운용', '투자 분석', '재무 보고서 작성'
    ]
  },
  { 
    id: 'construction', 
    name: '건설 / 토목', 
    icon: 'ri-building-line',
    problems: [
      '공사 일정 관리', '안전 점검', '자재 발주 및 관리', '설계도 검토', '공사 품질 관리',
      '인력 배치', '현장 관리', '공사비 관리', '민원 대응', '장비 운영'
    ]
  },
  { 
    id: 'research', 
    name: '연구 / 엔지니어', 
    icon: 'ri-flask-line',
    problems: [
      '실험 설계 및 수행', '연구 데이터 분석', '장비 운영 및 관리', '연구 계획 수립', '논문 작성',
      '특허 출원', '연구 윤리 준수', '협업 연구 진행', '실험 안전 관리', '연구 결과 발표'
    ]
  },
  { 
    id: 'service', 
    name: '서비스 / 교육', 
    icon: 'ri-customer-service-line',
    problems: [
      '고객 응대 및 상담', '서비스 제공', '교육 프로그램 운영', '고객 피드백 수집', '서비스 품질 관리',
      '직원 교육', '고객 만족도 조사', '서비스 개선', '고객 문의 처리', '교육 자료 준비'
    ]
  },
  { 
    id: 'medical', 
    name: '의료 / 보건', 
    icon: 'ri-heart-pulse-line',
    problems: [
      '환자 진료 및 상담', '의료 기록 작성', '응급 상황 대응', '처방전 발행', '의료 장비 관리',
      '환자 안전 관리', '의료진 협업', '감염 관리', '건강 검진 진행', '의료 윤리 준수'
    ]
  },
  { 
    id: 'legal', 
    name: '법률 / 법무', 
    icon: 'ri-scales-line',
    problems: [
      '법률 자문 제공', '계약서 검토 및 작성', '소송 준비 및 진행', '법률 리서치', '컴플라이언스 검토',
      '분쟁 조정', '법률 문서 작성', '법정 출석 준비', '법률 의견서 작성', '규제 대응'
    ]
  },
  { 
    id: 'hr', 
    name: '인사 / 채용', 
    icon: 'ri-user-search-line',
    problems: [
      '채용 공고 작성', '면접 진행', '인사 평가', '급여 관리', '복리후생 운영',
      '직원 교육 기획', '노무 관리', '조직 문화 개선', '퇴직 관리', '인력 계획 수립'
    ]
  },
  { 
    id: 'manufacturing', 
    name: '제조 / 생산', 
    icon: 'ri-settings-3-line',
    problems: [
      '생산 계획 수립', '품질 검사', '설비 유지보수', '생산 라인 관리', '원자재 재고 관리',
      '작업 표준 수립', '불량률 개선', '생산성 향상', '작업장 안전 관리', '원가 절감'
    ]
  },
  { 
    id: 'logistics', 
    name: '물류 / 유통', 
    icon: 'ri-truck-line',
    problems: [
      '배송 일정 관리', '재고 최적화', '물류 비용 관리', '운송 경로 최적화', '창고 관리',
      '입출고 관리', '배송 추적', '반품 처리', '공급망 관리', '물류 파트너 관리'
    ]
  },
  { 
    id: 'media', 
    name: '미디어 / 콘텐츠', 
    icon: 'ri-movie-line',
    problems: [
      '미디어 콘텐츠 기획', '영상 촬영 및 편집', '기사 작성', '인터뷰 진행', '콘텐츠 배포',
      '저작권 관리', '시청률 분석', '콘텐츠 마케팅', '협찬 관리', '방송 편성'
    ]
  },
  { 
    id: 'food', 
    name: '식음료 / 외식', 
    icon: 'ri-restaurant-line',
    problems: [
      '메뉴 개발', '식자재 발주', '식품 위생 관리', '고객 서비스', '식자재 재고 관리',
      '주방 운영', '매출 분석 및 관리', '직원 서비스 교육', '음식 품질 관리', '원가 관리'
    ]
  },
  { 
    id: 'beauty', 
    name: '뷰티 / 미용', 
    icon: 'ri-scissors-line',
    problems: [
      '고객 피부 상담', '시술 진행', '예약 일정 관리', '제품 추천', '트렌드 연구',
      '살롱 위생 관리', '고객 관리', '뷰티 제품 재고 관리', '매출 분석', '시술 기술 교육'
    ]
  },
  { 
    id: 'sports', 
    name: '스포츠 / 레저', 
    icon: 'ri-basketball-line',
    problems: [
      '훈련 프로그램 기획', '회원 관리', '시설 관리', '시설 안전 관리', '이벤트 기획',
      '강습 진행', '장비 관리', '시설 예약 관리', '회원 상담', '회원권 매출 관리'
    ]
  },
  { 
    id: 'real_estate', 
    name: '부동산 / 건축', 
    icon: 'ri-home-line',
    problems: [
      '매물 관리', '부동산 상담', '계약 진행', '시장 조사', '매물 촬영',
      '가격 산정', '법률 검토', '임대차 관리', '분양 업무', '중개 수수료 관리'
    ]
  },
  { 
    id: 'environment', 
    name: '환경 / 에너지', 
    icon: 'ri-leaf-line',
    problems: [
      '환경 영향 평가', '오염 측정', '폐기물 관리', '에너지 효율 개선', '환경 규제 준수',
      '친환경 기술 연구', '탄소 배출 관리', '재활용 관리', '환경 교육', '지속가능성 보고서 작성'
    ]
  },
  { 
    id: 'public', 
    name: '공공 / 행정', 
    icon: 'ri-government-line',
    problems: [
      '민원 처리', '정책 수립', '정부 예산 편성', '행정 업무 처리', '공문서 작성',
      '회의 진행', '사업 기획', '행정 감사 대응', '통계 관리', '주민 소통'
    ]
  },
  { 
    id: 'ngo', 
    name: '비영리 / 사회복지', 
    icon: 'ri-hand-heart-line',
    problems: [
      '사회복지 프로그램 기획', '후원자 관리', '봉사자 관리', '사례 관리', '기부금 관리',
      '캠페인 진행', '사업 보고서 작성', '파트너십 구축', '수혜자 상담', '사업 평가'
    ]
  },
  { 
    id: 'agriculture', 
    name: '농업 / 축산', 
    icon: 'ri-plant-line',
    problems: [
      '작물 재배 관리', '병해충 관리', '수확 계획', '가축 사육 관리', '사료 관리',
      '농기계 운영', '출하 관리', '농산물 품질 관리', '농산물 판매', '농장 경영'
    ]
  }
];

// 모든 문제 목록 생성
export const problems: Problem[] = jobCategories.flatMap(category =>
  category.problems.map(title => ({ title, image: '' }))
);

// 직군별 문제 목록 (하위 호환성)
export const problemsByJob: Record<string, string[]> = Object.fromEntries(
  jobCategories.map(category => [category.id, category.problems])
);
