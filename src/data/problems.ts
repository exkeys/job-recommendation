export interface JobCategory {
  id: string;
  name: string;
  icon: string;
  problems: string[];
}

export const jobCategories: JobCategory[] = [
  { 
    id: 'dev', 
    name: '개발 / IT', 
    icon: 'ri-code-s-slash-line',
    problems: [
      '404 에러 발생',
      '서버 응답 지연',
      '배포 실패',
      'DB 연결 오류',
      '메모리 누수',
      'API 인증 실패',
      'Git 충돌',
      'CORS 문제',
      '배포 환경 변수 오류',
      '빌드 실패'
    ]
  },
  { 
    id: 'security', 
    name: '보안 / 정보보호', 
    icon: 'ri-shield-check-line',
    problems: [
      'SQL 인젝션 공격 탐지',
      '비정상 로그인 시도',
      '데이터 유출 의심',
      '랜섬웨어 감염',
      '방화벽 설정 오류',
      'SSL 인증서 만료',
      '권한 관리 문제',
      'DDoS 공격',
      '취약점 스캔 결과',
      '보안 패치 미적용'
    ]
  },
  { 
    id: 'design', 
    name: '디자인', 
    icon: 'ri-palette-line',
    problems: [
      '클라이언트 피드백 반영',
      '디자인 시스템 구축',
      '브랜드 아이덴티티 작업',
      '사용자 경험 개선',
      '반응형 디자인 작업',
      '프로토타입 제작',
      '디자인 가이드 작성',
      'UI 컴포넌트 설계',
      '비주얼 콘셉트 기획',
      '디자인 리뷰 진행'
    ]
  },
  { 
    id: 'marketing', 
    name: '마케팅', 
    icon: 'ri-megaphone-line',
    problems: [
      '캠페인 기획 및 실행',
      '타겟 고객 분석',
      'SNS 콘텐츠 제작',
      '광고 성과 분석',
      '브랜드 전략 수립',
      '시장 조사 진행',
      '경쟁사 분석',
      '고객 인사이트 도출',
      '마케팅 예산 관리',
      '프로모션 기획'
    ]
  },
  { 
    id: 'pm', 
    name: '기획 / PM', 
    icon: 'ri-lightbulb-line',
    problems: [
      '프로젝트 일정 관리',
      '요구사항 정의',
      '이해관계자 조율',
      '리소스 배분',
      '우선순위 설정',
      '프로젝트 진행 상황 보고',
      '리스크 관리',
      '팀 커뮤니케이션',
      '스프린트 계획',
      '제품 로드맵 작성'
    ]
  },
  { 
    id: 'management', 
    name: '경영 / 사무', 
    icon: 'ri-briefcase-line',
    problems: [
      '업무 프로세스 개선',
      '문서 작성 및 관리',
      '회의 일정 조율',
      '부서 간 협업 조정',
      '경영 보고서 작성',
      '인력 관리',
      '의사결정 지원',
      '정보 공유 체계 구축',
      '업무 효율화',
      '성과 관리'
    ]
  },
  { 
    id: 'sales', 
    name: '영업 / 판매', 
    icon: 'ri-shopping-bag-line',
    problems: [
      '고객 상담 및 응대',
      '제품 설명 및 제안',
      '견적서 작성',
      '계약 체결',
      '고객 관계 관리',
      '신규 고객 발굴',
      '영업 목표 달성',
      '클레임 처리',
      '재구매 유도',
      '시장 동향 파악'
    ]
  },
  { 
    id: 'finance', 
    name: '회계 / 금융', 
    icon: 'ri-money-dollar-circle-line',
    problems: [
      '전표 입력 및 처리',
      '회계 마감 작업',
      '회계 예산 편성',
      '세무 신고',
      '재무제표 작성',
      '비용 관리',
      '회계 감사 대응',
      '자금 운용',
      '투자 분석',
      '재무 보고서 작성'
    ]
  },
  { 
    id: 'construction', 
    name: '건설 / 토목', 
    icon: 'ri-building-line',
    problems: [
      '공사 일정 관리',
      '안전 점검',
      '자재 발주 및 관리',
      '설계도 검토',
      '공사 품질 관리',
      '인력 배치',
      '현장 관리',
      '공사비 관리',
      '민원 대응',
      '장비 운영'
    ]
  },
  { 
    id: 'research', 
    name: '연구 / 엔지니어', 
    icon: 'ri-flask-line',
    problems: [
      '실험 설계 및 수행',
      '연구 데이터 분석',
      '장비 운영 및 관리',
      '연구 계획 수립',
      '논문 작성',
      '특허 출원',
      '연구 윤리 준수',
      '협업 연구 진행',
      '실험 안전 관리',
      '연구 결과 발표'
    ]
  },
  { 
    id: 'service', 
    name: '서비스 / 교육', 
    icon: 'ri-customer-service-line',
    problems: [
      '고객 응대 및 상담',
      '서비스 제공',
      '교육 프로그램 운영',
      '고객 피드백 수집',
      '서비스 품질 관리',
      '직원 교육',
      '고객 만족도 조사',
      '서비스 개선',
      '고객 문의 처리',
      '교육 자료 준비'
    ]
  },
  { 
    id: 'medical', 
    name: '의료 / 보건', 
    icon: 'ri-heart-pulse-line',
    problems: [
      '환자 진료 및 상담',
      '의료 기록 작성',
      '응급 상황 대응',
      '처방전 발행',
      '의료 장비 관리',
      '환자 안전 관리',
      '의료진 협업',
      '감염 관리',
      '건강 검진 진행',
      '의료 윤리 준수'
    ]
  },
  { 
    id: 'legal', 
    name: '법률 / 법무', 
    icon: 'ri-scales-line',
    problems: [
      '법률 자문 제공',
      '계약서 검토 및 작성',
      '소송 준비 및 진행',
      '법률 리서치',
      '컴플라이언스 검토',
      '분쟁 조정',
      '법률 문서 작성',
      '법정 출석 준비',
      '법률 의견서 작성',
      '규제 대응'
    ]
  },
  { 
    id: 'hr', 
    name: '인사 / 채용', 
    icon: 'ri-user-search-line',
    problems: [
      '채용 공고 작성',
      '면접 진행',
      '인사 평가',
      '급여 관리',
      '복리후생 운영',
      '직원 교육 기획',
      '노무 관리',
      '조직 문화 개선',
      '퇴직 관리',
      '인력 계획 수립'
    ]
  },
  { 
    id: 'manufacturing', 
    name: '제조 / 생산', 
    icon: 'ri-settings-3-line',
    problems: [
      '생산 계획 수립',
      '품질 검사',
      '설비 유지보수',
      '생산 라인 관리',
      '원자재 재고 관리',
      '작업 표준 수립',
      '불량률 개선',
      '생산성 향상',
      '작업장 안전 관리',
      '원가 절감'
    ]
  },
  { 
    id: 'logistics', 
    name: '물류 / 유통', 
    icon: 'ri-truck-line',
    problems: [
      '배송 일정 관리',
      '재고 최적화',
      '물류 비용 관리',
      '운송 경로 최적화',
      '창고 관리',
      '입출고 관리',
      '배송 추적',
      '반품 처리',
      '공급망 관리',
      '물류 파트너 관리'
    ]
  },
  { 
    id: 'media', 
    name: '미디어 / 콘텐츠', 
    icon: 'ri-movie-line',
    problems: [
      '미디어 콘텐츠 기획',
      '영상 촬영 및 편집',
      '기사 작성',
      '인터뷰 진행',
      '콘텐츠 배포',
      '저작권 관리',
      '시청률 분석',
      '콘텐츠 마케팅',
      '협찬 관리',
      '방송 편성'
    ]
  },
  { 
    id: 'food', 
    name: '식음료 / 외식', 
    icon: 'ri-restaurant-line',
    problems: [
      '메뉴 개발',
      '식자재 발주',
      '식품 위생 관리',
      '고객 서비스',
      '식자재 재고 관리',
      '주방 운영',
      '매출 분석 및 관리',
      '직원 서비스 교육',
      '음식 품질 관리',
      '원가 관리'
    ]
  },
  { 
    id: 'beauty', 
    name: '뷰티 / 미용', 
    icon: 'ri-scissors-line',
    problems: [
      '고객 피부 상담',
      '시술 진행',
      '예약 일정 관리',
      '제품 추천',
      '트렌드 연구',
      '살롱 위생 관리',
      '고객 관리',
      '뷰티 제품 재고 관리',
      '매출 분석',
      '시술 기술 교육'
    ]
  },
  { 
    id: 'sports', 
    name: '스포츠 / 레저', 
    icon: 'ri-basketball-line',
    problems: [
      '훈련 프로그램 기획',
      '회원 관리',
      '시설 관리',
      '시설 안전 관리',
      '이벤트 기획',
      '강습 진행',
      '장비 관리',
      '시설 예약 관리',
      '회원 상담',
      '회원권 매출 관리'
    ]
  },
  { 
    id: 'real_estate', 
    name: '부동산 / 건축', 
    icon: 'ri-home-line',
    problems: [
      '매물 관리',
      '부동산 상담',
      '계약 진행',
      '시장 조사',
      '매물 촬영',
      '가격 산정',
      '법률 검토',
      '임대차 관리',
      '분양 업무',
      '중개 수수료 관리'
    ]
  },
  { 
    id: 'environment', 
    name: '환경 / 에너지', 
    icon: 'ri-leaf-line',
    problems: [
      '환경 영향 평가',
      '오염 측정',
      '폐기물 관리',
      '에너지 효율 개선',
      '환경 규제 준수',
      '친환경 기술 연구',
      '탄소 배출 관리',
      '재활용 관리',
      '환경 교육',
      '지속가능성 보고서 작성'
    ]
  },
  { 
    id: 'public', 
    name: '공공 / 행정', 
    icon: 'ri-government-line',
    problems: [
      '민원 처리',
      '정책 수립',
      '정부 예산 편성',
      '행정 업무 처리',
      '공문서 작성',
      '회의 진행',
      '사업 기획',
      '행정 감사 대응',
      '통계 관리',
      '주민 소통'
    ]
  },
  { 
    id: 'ngo', 
    name: '비영리 / 사회복지', 
    icon: 'ri-hand-heart-line',
    problems: [
      '사회복지 프로그램 기획',
      '후원자 관리',
      '봉사자 관리',
      '사례 관리',
      '기부금 관리',
      '캠페인 진행',
      '사업 보고서 작성',
      '파트너십 구축',
      '수혜자 상담',
      '사업 평가'
    ]
  },
  { 
    id: 'agriculture', 
    name: '농업 / 축산', 
    icon: 'ri-plant-line',
    problems: [
      '작물 재배 관리',
      '병해충 관리',
      '수확 계획',
      '가축 사육 관리',
      '사료 관리',
      '농기계 운영',
      '출하 관리',
      '농산물 품질 관리',
      '농산물 판매',
      '농장 경영'
    ]
  }
];

// 문제 카드용 인터페이스
export interface Problem {
  title: string;
  image: string;
}

// 문제 목록 생성 함수
function generateProblems(): Problem[] {
  const allProblems: Problem[] = [];
  
  jobCategories.forEach(category => {
    category.problems.forEach(problemTitle => {
      allProblems.push({
        title: problemTitle,
        image: generateImageForProblem(problemTitle)
      });
    });
  });
  
  return allProblems;
}

// 문제에 맞는 이미지 생성
function generateImageForProblem(problemTitle: string): string {
  const imagePrompts: Record<string, string> = {
    '404 에러 발생': 'Professional developer analyzing error messages on multiple computer screens, debugging 404 error, modern dark office environment, focused expression, realistic photography style, high detail, soft blue lighting',
    '서버 응답 지연': 'IT engineer monitoring server performance dashboard with graphs and metrics, concerned expression, data center background, professional photography, dramatic lighting',
    '배포 실패': 'DevOps engineer troubleshooting deployment pipeline on laptop, CI/CD dashboard visible, modern tech office, realistic style, concentrated mood',
    'DB 연결 오류': 'Database administrator examining connection logs on screen, server racks in background, professional environment, realistic photography, cool blue tones',
    '메모리 누수': 'Software engineer analyzing memory usage graphs and performance metrics, multiple monitors setup, dark themed IDE, professional photography style',
    'API 인증 실패': 'Developer reviewing API authentication code and error logs, focused on screen, modern workspace, realistic photography, warm ambient lighting',
    'Git 충돌': 'Two developers collaborating to resolve git merge conflicts, pointing at screen, modern office, realistic photography, natural lighting',
    'CORS 문제': 'Web developer debugging CORS errors in browser console, frustrated but determined expression, modern workspace, realistic style',
    '배포 환경 변수 오류': 'DevOps engineer checking environment configuration files, terminal windows open, professional setup, realistic photography',
    '빌드 실패': 'Developer analyzing build error logs on screen, multiple terminal windows, dark themed workspace, professional photography style',
    
    'SQL 인젝션 공격 탐지': 'Security analyst monitoring threat detection dashboard with red alerts, serious expression, dark security operations center, dramatic lighting, realistic photography',
    '비정상 로그인 시도': 'Cybersecurity specialist analyzing login attempt logs and IP addresses, multiple screens with security data, professional environment, realistic style',
    '데이터 유출 의심': 'Security team investigating data breach indicators, urgent atmosphere, security operations center, realistic photography, tense mood',
    '랜섬웨어 감염': 'IT security expert responding to ransomware attack, emergency response setup, dramatic red lighting, realistic photography style',
    '방화벽 설정 오류': 'Network security engineer configuring firewall rules on screen, network diagram visible, professional environment, realistic photography',
    'SSL 인증서 만료': 'System administrator renewing SSL certificates, certificate management interface on screen, professional workspace, realistic style',
    '권한 관리 문제': 'Security administrator reviewing user access permissions and roles, access control dashboard, professional setting, realistic photography',
    'DDoS 공격': 'Security team responding to DDoS attack, traffic monitoring dashboards with red alerts, intense atmosphere, realistic photography style',
    '취약점 스캔 결과': 'Security analyst reviewing vulnerability scan reports, security assessment tools on screen, professional environment, realistic photography',
    '보안 패치 미적용': 'IT administrator checking system patch status, update management interface, professional workspace, realistic photography style',
    
    '클라이언트 피드백 반영': 'Two professionals in design meeting, designer showing UI mockups on large screen to client, client pointing and giving feedback, modern bright office, collaborative atmosphere, realistic photography style, natural lighting',
    '디자인 시스템 구축': 'UX designer working on design system components, organized UI kit on screen, color palettes and typography guides visible, modern workspace, realistic photography, clean aesthetic',
    '브랜드 아이덴티티 작업': 'Brand designer presenting logo concepts and brand guidelines, mood boards and color schemes on desk, creative studio environment, realistic photography style',
    '사용자 경험 개선': 'UX researcher analyzing user journey maps and usability test results, sticky notes and wireframes on wall, collaborative workspace, realistic photography',
    '반응형 디자인 작업': 'UI designer working on responsive layouts, multiple device mockups on screen, mobile and desktop views, modern office, realistic photography style',
    '프로토타입 제작': 'Product designer creating interactive prototype, design tool interface visible, modern workspace, realistic photography, focused atmosphere',
    '디자인 가이드 작성': 'Designer documenting design guidelines, style guide and component library on screen, organized workspace, realistic photography style',
    'UI 컴포넌트 설계': 'Interface designer creating reusable UI components, component library on screen, modern design workspace, realistic photography',
    '비주얼 콘셉트 기획': 'Creative director brainstorming visual concepts, mood boards and sketches on desk, inspiring creative space, realistic photography style',
    '디자인 리뷰 진행': 'Design team reviewing work together, large screen showing designs, collaborative discussion, modern office, realistic photography, natural lighting',
    
    '캠페인 기획 및 실행': 'Marketing team brainstorming campaign ideas, whiteboard with strategy notes, collaborative meeting room, energetic atmosphere, realistic photography style',
    '타겟 고객 분석': 'Marketing analyst studying customer data and demographics, analytics dashboard on screen, professional workspace, realistic photography',
    'SNS 콘텐츠 제작': 'Social media manager creating engaging content, multiple social platform interfaces visible, creative workspace, realistic photography style',
    '광고 성과 분석': 'Digital marketer analyzing ad campaign metrics and ROI, performance dashboards on screen, professional environment, realistic photography',
    '브랜드 전략 수립': 'Brand strategist presenting brand positioning strategy, presentation slides and market analysis, modern meeting room, realistic photography style',
    '시장 조사 진행': 'Market researcher analyzing industry trends and competitor data, research reports and charts visible, professional workspace, realistic photography',
    '경쟁사 분석': 'Marketing analyst comparing competitor strategies, competitive analysis charts on screen, focused atmosphere, realistic photography style',
    '고객 인사이트 도출': 'Customer insights specialist reviewing feedback and survey data, customer journey maps visible, professional environment, realistic photography',
    '마케팅 예산 관리': 'Marketing manager reviewing budget allocation and spending, financial dashboards and charts on screen, professional workspace, realistic photography style',
    '프로모션 기획': 'Promotion planner designing special offer campaigns, promotional materials and timeline on screen, creative workspace, realistic photography',
    
    '프로젝트 일정 관리': 'Project manager updating project timeline and milestones, gantt chart visible on screen, organized workspace, realistic photography style, professional atmosphere',
    '요구사항 정의': 'Product manager documenting requirements with stakeholders, requirement specifications on screen, collaborative meeting, realistic photography',
    '이해관계자 조율': 'PM facilitating stakeholder meeting, presentation on large screen, diverse group discussing, professional meeting room, realistic photography style',
    '리소스 배분': 'Project manager allocating team resources, resource planning dashboard on screen, professional workspace, realistic photography',
    '우선순위 설정': 'Product owner prioritizing backlog items, priority matrix and user stories visible, focused workspace, realistic photography style',
    '프로젝트 진행 상황 보고': 'PM presenting project status to executives, progress charts and KPIs on screen, professional presentation setting, realistic photography',
    '리스크 관리': 'Project manager identifying and assessing risks, risk matrix and mitigation plans visible, professional environment, realistic photography style',
    '팀 커뮤니케이션': 'PM facilitating team standup meeting, task board visible, collaborative atmosphere, modern office, realistic photography',
    '스프린트 계획': 'Scrum master planning sprint with team, sprint board and velocity charts visible, agile workspace, realistic photography style',
    '제품 로드맵 작성': 'Product manager creating product roadmap, strategic timeline and features on screen, professional workspace, realistic photography',
    
    '업무 프로세스 개선': 'Business analyst mapping improved workflow processes, process diagrams and flowcharts on screen, professional office, realistic photography style',
    '문서 작성 및 관리': 'Office manager organizing documents and files, document management system on screen, organized workspace, realistic photography',
    '회의 일정 조율': 'Administrative assistant coordinating meeting schedules, calendar and scheduling tools visible, professional office, realistic photography style',
    '부서 간 협업 조정': 'Operations manager facilitating cross-department collaboration, organizational chart visible, professional meeting room, realistic photography',
    '보고서 작성': 'Business professional creating comprehensive report, data analysis and charts on screen, focused workspace, realistic photography style',
    '인력 관리': 'HR manager reviewing team structure and staffing, organizational planning tools on screen, professional office, realistic photography',
    '의사결정 지원': 'Business analyst presenting decision support data, analytical dashboards and insights visible, professional presentation, realistic photography style',
    '정보 공유 체계 구축': 'Knowledge manager setting up information sharing system, collaboration platform on screen, modern workspace, realistic photography',
    '업무 효율화': 'Operations specialist optimizing work processes, efficiency metrics and automation tools visible, professional environment, realistic photography style',
    '성과 관리': 'Performance manager reviewing KPIs and team metrics, performance dashboard on screen, professional workspace, realistic photography',
    
    '고객 상담 및 응대': 'Sales representative having friendly consultation with customer, showing product information, professional meeting room, warm atmosphere, realistic photography style',
    '제품 설명 및 제안': 'Salesperson presenting product features and benefits to client, product demo on screen, professional setting, realistic photography',
    '견적서 작성': 'Sales professional preparing detailed quotation, pricing calculator and proposal on screen, organized workspace, realistic photography style',
    '계약 체결': 'Sales manager finalizing contract with client, handshake moment, professional office, successful atmosphere, realistic photography',
    '고객 관계 관리': 'Account manager reviewing customer relationship data, CRM system on screen, professional workspace, realistic photography style',
    '신규 고객 발굴': 'Business development representative researching potential clients, lead generation tools visible, focused workspace, realistic photography',
    '영업 목표 달성': 'Sales team celebrating achievement of targets, sales dashboard showing success metrics, energetic atmosphere, realistic photography style',
    '클레임 처리': 'Customer service specialist resolving customer complaint professionally, empathetic expression, professional office, realistic photography',
    '재구매 유도': 'Sales representative following up with existing customer, customer retention strategies visible, friendly atmosphere, realistic photography style',
    '시장 동향 파악': 'Sales analyst studying market trends and opportunities, market analysis reports on screen, professional workspace, realistic photography',
    
    '전표 입력 및 처리': 'Accountant entering financial transactions, accounting software interface on screen, organized office workspace, realistic photography style, professional atmosphere',
    '회계 마감 작업': 'Accounting team working on month-end closing, financial statements and reconciliation on screen, focused environment, realistic photography',
    '예산 편성': 'Financial planner creating annual budget, budget allocation spreadsheets visible, professional workspace, realistic photography style',
    '세무 신고': 'Tax accountant preparing tax returns, tax forms and calculations on screen, professional office, realistic photography',
    '재무제표 작성': 'Financial accountant preparing financial statements, balance sheet and income statement visible, professional workspace, realistic photography style',
    '비용 관리': 'Cost accountant analyzing expense reports, cost tracking dashboard on screen, organized office, realistic photography',
    '감사 대응': 'Audit team preparing documentation for auditors, audit files and compliance reports visible, professional environment, realistic photography style',
    '자금 운용': 'Treasury manager monitoring cash flow and investments, financial dashboards on screen, professional workspace, realistic photography',
    '투자 분석': 'Financial analyst evaluating investment opportunities, financial models and projections visible, focused atmosphere, realistic photography style',
    '재무 보고서 작성': 'Finance professional creating executive financial report, charts and financial metrics on screen, professional workspace, realistic photography',
    
    '공사 일정 관리': 'Construction manager reviewing project timeline, construction schedule and gantt chart on tablet, construction site background, realistic photography style, professional atmosphere',
    '안전 점검': 'Safety inspector conducting site safety inspection with checklist, wearing hard hat and safety vest, construction site, realistic photography',
    '자재 발주 및 관리': 'Materials manager checking inventory and ordering supplies, materials tracking system on screen, construction office, realistic photography style',
    '설계도 검토': 'Civil engineer reviewing architectural blueprints and technical drawings, construction plans on desk, professional office, realistic photography',
    '품질 관리': 'Quality control inspector examining construction quality, inspection tools and standards checklist, construction site, realistic photography style',
    '인력 배치': 'Site supervisor coordinating worker assignments, crew schedule and task board visible, construction site office, realistic photography',
    '현장 관리': 'Construction foreman overseeing site operations, wearing hard hat, active construction site background, realistic photography style',
    '공사비 관리': 'Project accountant managing construction budget, cost tracking spreadsheets on screen, construction office, realistic photography',
    '민원 대응': 'Community liaison addressing resident concerns, meeting with community members, professional setting, realistic photography style',
    '장비 운영': 'Equipment operator managing heavy machinery, construction equipment visible, active construction site, realistic photography',
    
    '실험 설계 및 수행': 'Research scientist conducting laboratory experiment, wearing lab coat and safety goggles, modern research lab with equipment, realistic photography style, professional atmosphere',
    '연구 데이터 분석': 'Data scientist analyzing research results, statistical analysis and graphs on screen, research office, realistic photography',
    '장비 운영 및 관리': 'Lab technician operating sophisticated research equipment, scientific instruments visible, modern laboratory, realistic photography style',
    '연구 계획 수립': 'Principal investigator planning research project, research proposal and timeline on screen, professional office, realistic photography',
    '논문 작성': 'Researcher writing scientific paper, academic manuscript and references on screen, focused workspace, realistic photography style',
    '특허 출원': 'Research engineer preparing patent application, technical drawings and patent documents visible, professional office, realistic photography',
    '연구 윤리 준수': 'Ethics committee reviewing research protocols, ethical guidelines and compliance documents on screen, professional meeting room, realistic photography style',
    '협업 연구 진행': 'Research team collaborating on joint project, discussing findings together, modern research facility, realistic photography',
    '실험 안전 관리': 'Safety officer conducting lab safety training, safety protocols and equipment visible, laboratory setting, realistic photography style',
    '연구 결과 발표': 'Scientist presenting research findings at conference, presentation slides with data graphs, professional conference room, realistic photography',
    
    '고객 응대 및 상담': 'Service professional warmly greeting customer, friendly smile, modern service counter, welcoming atmosphere, realistic photography style, natural lighting',
    '서비스 제공': 'Service staff assisting customer with service, attentive and helpful demeanor, professional service environment, realistic photography',
    '교육 프로그램 운영': 'Instructor teaching engaged students, interactive classroom setting, educational materials visible, modern training room, realistic photography style',
    '고객 피드백 수집': 'Service manager conducting customer satisfaction survey, feedback forms and tablet visible, professional setting, realistic photography',
    '서비스 품질 관리': 'Quality manager reviewing service standards, quality metrics dashboard on screen, professional office, realistic photography style',
    '직원 교육': 'Trainer conducting staff training session, training materials and presentation visible, modern training facility, realistic photography',
    '고객 만족도 조사': 'Customer experience specialist analyzing satisfaction survey results, customer feedback data on screen, professional workspace, realistic photography style',
    '서비스 개선': 'Service improvement team brainstorming enhancement ideas, process improvement charts visible, collaborative meeting room, realistic photography',
    '고객 문의 처리': 'Customer service representative helping customer via phone and computer, professional call center, focused atmosphere, realistic photography style',
    '교육 자료 준비': 'Instructional designer creating training materials, educational content and presentations on screen, organized workspace, realistic photography'
  };

  const prompt = imagePrompts[problemTitle] || 'Professional business person working on laptop in modern office, focused and productive atmosphere, realistic photography style, natural lighting, high detail';
  
  const width = 800;
  const height = 600;
  const seq = encodeURIComponent(problemTitle);
  
  return `https://readdy.ai/api/search-image?query=${encodeURIComponent(prompt)}&width=${width}&height=${height}&seq=${seq}&orientation=landscape`;
}

// problems 배열 export
export const problems = generateProblems();

// 하위 호환성을 위해 유지
export const problemsByJob: Record<string, string[]> = {
  dev: jobCategories[0].problems,
  security: jobCategories[1].problems,
  design: jobCategories[2].problems,
  marketing: jobCategories[3].problems,
  pm: jobCategories[4].problems,
  management: jobCategories[5].problems,
  sales: jobCategories[6].problems,
  finance: jobCategories[7].problems,
  construction: jobCategories[8].problems,
  research: jobCategories[9].problems,
  service: jobCategories[10].problems,
  medical: jobCategories[11].problems,
  legal: jobCategories[12].problems,
  hr: jobCategories[13].problems,
  manufacturing: jobCategories[14].problems,
  logistics: jobCategories[15].problems,
  media: jobCategories[16].problems,
  food: jobCategories[17].problems,
  beauty: jobCategories[18].problems,
  sports: jobCategories[19].problems,
  real_estate: jobCategories[20].problems,
  environment: jobCategories[21].problems,
  public: jobCategories[22].problems,
  ngo: jobCategories[23].problems,
  agriculture: jobCategories[24].problems,
};
