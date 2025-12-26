import { useStore } from '../store/useStore';
import { useState } from 'react';
import { jobCategories } from '../data/problems';
import JobCard from '../components/JobCard';
import { useNavigation } from '../hooks/useNavigation';
import { useScrollToTop } from '../hooks/useScrollToTop';

export default function JobSelect() {
  const { setSelectedJob } = useStore();
  const navigation = useNavigation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState<number>(5);

  const features = [
    {
      icon: 'ri-brain-line',
      title: 'AI 맞춤 솔루션',
      desc: '실제 업무 상황에 대한 AI 기반 맞춤형 해결책을 제공합니다',
      image: 'https://blog.altair.co.kr/wp-content/uploads/AI-ML_data-science_terms_thumbnail_1-1024x574.jpg'
    },
    {
      icon: 'ri-lightbulb-flash-line',
      title: '실전 시뮬레이션',
      desc: '실제 업무 환경을 시뮬레이션하여 직무를 미리 경험해볼 수 있습니다',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: 'ri-route-line',
      title: '상황 선택 학습',
      desc: '직군별로 제공되는 다양한 문제 상황 이미지를 선택하며 상황 중심 학습을 진행할 수 있습니다',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: 'ri-user-search-line',
      title: '의사결정 능력 강화',
      desc: '문제 상황에 맞는 여러 대처 방안을 비교하며 최적의 선택을 내리는 훈련을 할 수 있습니다',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: 'ri-line-chart-line',
      title: '성과 분석',
      desc: 'AI가 당신의 선택과 결정을 분석하여 개선점을 제시합니다',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      icon: 'ri-compass-3-line',
      title: '커리어 가이드',
      desc: '각 직군의 특성과 요구사항을 이해하고 최적의 진로를 찾습니다',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }    
  ];

  useScrollToTop();

  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
    // 페이지 상단으로 부드럽게 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartClick = () => {
    navigation.goTo('/job-experience');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        {/* Background Image - 회의하는 장면 */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80"
            alt="회의하는 직장인들"
            className="w-full h-full object-cover opacity-85"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/35 to-slate-950/75" />
        </div>

        {/* Login Button - Top Right */}
        <div className="absolute top-6 right-6 z-50">
          <button
            className="px-5 py-2.5 text-sm font-medium text-white hover:text-slate-200 transition-colors bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-lg"
          >
            로그인
          </button>
        </div>
        {/* Animated Background */}
        <div className="animated-hero-bg"></div>
        <div className="floating-orb -top-10 -left-10"></div>
        <div className="floating-orb floating-orb--secondary top-1/3 right-4"></div>
        <div className="floating-orb floating-orb--tertiary bottom-0 left-1/2 -translate-x-1/2"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-40"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center min-h-[80vh]">
          {/* Main Title */}
          <div className="max-w-6xl mx-auto mb-10">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-10 leading-[1.1] tracking-tight">
              커리어 탐색
              <br />
              <span className="bg-gradient-to-r from-slate-200 via-slate-300 to-slate-400 bg-clip-text text-transparent whitespace-nowrap mt-4 block">AI와 함께 시작하세요</span>
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-slate-400 mb-6 max-w-4xl mx-auto leading-relaxed font-light">
            관심있는 직군을 선택하고 실제 업무 상황을 체험해보세요.
          </p>
          
          <p className="text-lg md:text-xl lg:text-2xl text-slate-400 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
            AI가 맞춤형 솔루션을 제시합니다.
          </p>

          {/* CTA Button */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleStartClick}
              className="inline-flex items-center gap-3 px-11 py-4 bg-white text-slate-950 rounded-full font-semibold hover:bg-slate-100 transition-all text-lg"
            >
              시작하기
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-36 px-6 bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-28 space-y-6">
            <p className="text-sm font-medium text-slate-500 tracking-widest uppercase mb-4">Features</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">왜 CareerAI인가요?</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
              AI 기술로 더 스마트하고 효과적인 직무 체험을 제공합니다
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative p-8 border border-slate-800/80 rounded-2xl hover:border-slate-700 transition-all duration-300 overflow-hidden h-full"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-300"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/30 to-slate-950/55"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-slate-700/70 transition-all duration-300">
                    <i className={`${feature.icon} text-slate-300 text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-800 to-transparent"></div>
      </div>

      {/* Jobs Section */}
      <section id="jobs" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-slate-500 tracking-widest uppercase mb-4">Categories</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">직군을 선택하세요</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              관심있는 직군을 선택하고 실제 업무 상황을 체험해보세요
            </p>
          </div>

          {/* Jobs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {jobCategories.map((job, index) => (
              <JobCard
                key={index}
                job={job}
                index={index}
                hoveredIndex={hoveredIndex}
                onSelect={handleJobSelect}
                onHover={setHoveredIndex}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-40 px-6 overflow-hidden bg-slate-900/30">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-slate-800/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              자주 묻는 질문
            </h2>
            <p className="text-xl text-slate-400">
              궁금한 점이 있으신가요? 여기서 답을 찾아보세요
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'all', label: '전체', icon: 'ri-apps-line' },
              { id: 'getting-started', label: '시작하기', icon: 'ri-rocket-line' },
              { id: 'account', label: '계정 및 결제', icon: 'ri-user-settings-line' },
              { id: 'features', label: '기능 및 사용법', icon: 'ri-settings-3-line' },
              { id: 'support', label: '기술 지원', icon: 'ri-customer-service-line' },
              { id: 'enterprise', label: '기업/기관', icon: 'ri-building-line' }
            ].map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setOpenIndex(null);
                  setVisibleCount(5); // 카테고리 변경 시 초기화
                }}
                className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-white text-slate-950 shadow-lg'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
                }`}
              >
                <i className={`${category.icon} text-sm`}></i>
                <span>{category.label}</span>
              </button>
            ))}
          </div>

          <div className="space-y-3 mb-8">
            {(() => {
              const allFaqs = [
                {
                  category: 'getting-started',
                  icon: 'ri-question-line',
                  question: "CareerAI는 어떻게 사용하나요?",
                  answer: "CareerAI는 매우 간단하게 시작할 수 있습니다. 먼저 관심있는 직군을 선택하신 후, 실제 업무에서 마주칠 수 있는 다양한 상황을 체험해보세요. 각 상황에 대해 여러 해결 방안을 제시받고, AI가 제공하는 맞춤형 피드백을 통해 의사결정 능력을 향상시킬 수 있습니다. 모든 과정은 단계별로 안내되며, 언제든지 이전 단계로 돌아가 재검토할 수 있습니다."
                },
                {
                  category: 'account',
                  icon: 'ri-money-dollar-circle-line',
                  question: "비용이 얼마인가요?",
                  answer: "CareerAI는 현재 무료로 제공됩니다. 모든 직군의 시나리오를 경험하고 AI 피드백을 받을 수 있습니다."
                },
                {
                  category: 'features',
                  icon: 'ri-briefcase-line',
                  question: "어떤 직군을 체험할 수 있나요?",
                  answer: "CareerAI는 25개 이상의 다양한 직군을 지원합니다. 개발/IT, 보안/정보보호, 디자인, 마케팅, 기획/PM, 경영/사무, 영업/판매, 회계/금융, 건설/토목, 연구/엔지니어, 서비스/교육, 의료/보건, 법률/법무, 인사/채용, 제조/생산, 물류/유통, 미디어/콘텐츠, 식음료/외식, 뷰티/미용, 스포츠/레저, 부동산/건축, 환경/에너지, 공공/행정, 비영리/사회복지, 농업/축산 등 다양한 분야의 실제 업무 상황을 체험할 수 있습니다. 각 직군별로 평균 10개 이상의 시나리오가 준비되어 있어, 실제 업무 환경을 충실히 재현합니다."
                },
                {
                  category: 'features',
                  icon: 'ri-brain-line',
                  question: "AI 피드백은 얼마나 정확한가요?",
                  answer: "CareerAI의 AI 모델은 업계 전문가들과 협업하여 개발되었으며, 실제 업무 데이터와 사례를 기반으로 학습했습니다. 현재 95% 이상의 사용자 만족도를 기록하고 있으며, 정기적으로 모델을 업데이트하여 정확도를 지속적으로 개선하고 있습니다. 또한 각 직군별 전문가들의 검증을 거쳐 시나리오와 피드백의 신뢰성을 보장합니다. AI 피드백은 단순한 정답 제시가 아닌, 상황 분석, 대안 비교, 장단점 평가 등 다각도로 제공되어 실무 역량 향상에 실질적인 도움이 됩니다."
                },
                {
                  category: 'features',
                  icon: 'ri-time-line',
                  question: "한 번의 체험에 얼마나 시간이 걸리나요?",
                  answer: "각 시나리오 체험은 약 10-15분 정도 소요됩니다. 상황 파악, 해결 방안 선택, AI 피드백 검토까지의 전체 과정을 포함합니다. 하지만 시간에 구애받지 않고 천천히 검토하실 수 있으며, 중간에 저장하고 나중에 이어서 진행할 수도 있습니다. 한 직군의 모든 시나리오를 완료하는 데는 약 1-2시간 정도가 소요되며, 프리미엄 사용자는 진행 상황을 저장하고 언제든지 이어서 학습할 수 있습니다."
                },
                {
                  category: 'account',
                  icon: 'ri-shield-check-line',
                  question: "개인정보는 안전하게 보호되나요?",
                  answer: "CareerAI는 사용자의 개인정보 보호를 최우선으로 생각합니다. 모든 데이터는 암호화되어 저장되며, 국제 보안 표준인 ISO 27001 인증을 받은 보안 시스템을 운영하고 있습니다. 사용자의 학습 데이터와 선택 기록은 오직 맞춤형 서비스 제공을 위해서만 사용되며, 제3자와 절대 공유하지 않습니다. 또한 GDPR 및 개인정보보호법을 준수하여 사용자의 권리를 보장합니다. 언제든지 계정 삭제를 통해 모든 데이터를 완전히 삭제할 수 있습니다."
                },
                {
                  category: 'support',
                  icon: 'ri-device-line',
                  question: "어떤 기기에서 사용할 수 있나요?",
                  answer: "CareerAI는 웹 기반 플랫폼으로, PC, 태블릿, 스마트폰 등 모든 기기에서 사용 가능합니다. 반응형 디자인으로 최적화되어 있어 어떤 화면 크기에서도 편리하게 이용하실 수 있습니다. 특히 모바일에서는 터치 인터페이스에 최적화된 UI를 제공하여 이동 중에도 쉽게 학습할 수 있습니다. 최신 버전의 Chrome, Safari, Firefox, Edge 브라우저를 지원하며, 별도의 앱 설치 없이 바로 시작할 수 있습니다."
                },
                {
                  category: 'getting-started',
                  icon: 'ri-graduation-cap-line',
                  question: "비전공자도 사용할 수 있나요?",
                  answer: "네, 물론입니다. CareerAI는 직무 전환을 준비하는 분들, 새로운 분야에 도전하고 싶은 분들을 위해 설계되었습니다. 각 시나리오는 초보자도 이해할 수 있도록 상세한 설명과 배경 정보를 제공하며, AI 피드백에서도 전문 용어를 쉽게 풀어서 설명합니다. 또한 학습 가이드와 용어 사전 기능을 통해 관련 지식을 함께 습득할 수 있습니다. 실제로 CareerAI 사용자의 40% 이상이 비전공자이며, 이들 중 85%가 직무 전환에 성공했다는 통계가 있습니다."
                },
                {
                  category: 'features',
                  icon: 'ri-file-chart-line',
                  question: "학습 결과를 어떻게 활용할 수 있나요?",
                  answer: "CareerAI에서의 모든 학습 활동은 포트폴리오로 정리할 수 있습니다. 각 시나리오에서의 선택, AI 피드백, 개선 사항 등을 종합한 리포트를 통해 학습 내용을 확인할 수 있으며, 이를 이력서나 포트폴리오에 활용하실 수 있습니다."
                },
                {
                  category: 'support',
                  icon: 'ri-customer-service-line',
                  question: "문제가 발생하거나 도움이 필요할 때 어떻게 하나요?",
                  answer: "문제가 발생하거나 도움이 필요하실 때는 이메일로 문의해주세요. 이메일 문의는 24시간 접수 가능하며, 가능한 한 빠르게 답변을 드리겠습니다. 또한 FAQ 섹션과 사용자 가이드 등 자가 진단 자료를 제공하고 있습니다. 기술적 문제나 서비스 개선 제안도 언제든지 환영합니다."
                },
                {
                  category: 'enterprise',
                  icon: 'ri-team-line',
                  question: "팀이나 기관에서 사용할 수 있나요?",
                  answer: "네, CareerAI는 기업 및 교육 기관을 위한 엔터프라이즈 플랜을 제공합니다. 기업용 플랜에서는 관리자 대시보드, 팀별 학습 현황 추적, 맞춤형 시나리오 제작, 전용 고객 지원 등 다양한 기능을 이용하실 수 있습니다. 신입사원 교육, 역량 개발 프로그램, 리더십 교육 등 다양한 목적으로 활용 가능하며, 기관의 요구사항에 맞춘 맞춤형 솔루션도 제공합니다. 가격은 사용자 수와 기능에 따라 달라지며, 무료 체험 및 상담을 통해 최적의 플랜을 제안해드립니다."
                },
                {
                  category: 'features',
                  icon: 'ri-refresh-line',
                  question: "시나리오는 주기적으로 업데이트되나요?",
                  answer: "CareerAI는 업계 동향과 실제 업무 환경의 변화를 반영하여 정기적으로 시나리오를 업데이트합니다. 매월 새로운 시나리오가 추가되며, 기존 시나리오도 최신 트렌드와 사례를 반영하여 개선됩니다. 또한 사용자 피드백을 적극 반영하여 더욱 실용적이고 현실적인 시나리오를 제공하기 위해 노력하고 있습니다. 업데이트 내역은 공지사항을 통해 안내되며, 프리미엄 사용자에게는 우선적으로 새 시나리오가 공개됩니다."
                }
              ];

              const filteredFaqs = allFaqs.filter(faq => selectedCategory === 'all' || faq.category === selectedCategory);
              const visibleFaqs = filteredFaqs.slice(0, visibleCount);
              const remainingCount = filteredFaqs.length - visibleCount;

              return (
                <>
                  {visibleFaqs.map((faq) => {
                    const isOpen = openIndex === faq.question;
                    return (
                      <div 
                        key={faq.question}
                        className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-slate-900/50"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : faq.question)}
                          className="w-full px-6 py-5 flex items-center gap-4 text-left group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 flex items-center justify-center group-hover:bg-slate-700/70 group-hover:scale-110 transition-all duration-300">
                            <i className={`${faq.icon} text-slate-300 text-lg`}></i>
                          </div>
                          <span className="flex-1 text-white font-semibold text-base pr-4 group-hover:text-slate-100 transition-all">
                            {faq.question}
                          </span>
                          <div className={`flex-shrink-0 w-9 h-9 rounded-full bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 flex items-center justify-center transition-all duration-300 group-hover:bg-slate-700/70 ${isOpen ? 'rotate-180 bg-slate-700/70' : ''}`}>
                            <i className="ri-arrow-down-s-line text-slate-300 text-sm"></i>
                          </div>
                        </button>
                        
                        {isOpen && (
                  <div className="px-6 pb-6 border-t border-slate-800/50 animate-in slide-in-from-top-2 duration-300">
                    <div className="pt-5">
                      <p className="text-slate-300 leading-relaxed text-sm whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {remainingCount > 0 && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setVisibleCount(prev => prev + 5)}
                        className="px-8 py-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-full text-white font-medium transition-all duration-300 flex items-center gap-2 mx-auto hover:border-slate-600"
                      >
                        <span>더 보기</span>
                        <span className="text-slate-400 text-sm">({remainingCount}개 더)</span>
                        <i className="ri-arrow-down-s-line"></i>
                      </button>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center pt-32 pb-12">
            <h3 className="text-6xl md:text-7xl font-bold text-white mb-6">
              더 궁금한 점이 있으신가요?
            </h3>
            <p className="text-2xl md:text-3xl text-slate-400 mb-10">
              직접 체험해보시고 AI와 대화하며 궁금증을 해결하세요
            </p>
            <button 
              onClick={handleStartClick}
              className="relative px-12 py-4 bg-white text-slate-950 rounded-full font-semibold hover:bg-slate-100 transition-all text-xl overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                무료로 시작하기
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform"></i>
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/30 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-slate-500 text-sm text-center">
            © 2025 CareerAI. All rights reserved. ·
          </p>
        </div>
      </footer>
    </div>
  );
}
