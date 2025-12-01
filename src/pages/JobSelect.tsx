import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';
import { jobCategories } from '../data/problems';
import { getJobImage } from '../data/jobImages';

export default function JobSelect() {
  const navigate = useNavigate();
  const { setSelectedJob } = useStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
    // 페이지 상단으로 부드럽게 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartClick = () => {
    navigate('/job-experience');
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
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-950 rounded-full font-semibold hover:bg-slate-100 transition-all text-lg"
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
              <button
                key={index}
                onClick={() => handleJobSelect(job.name)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative p-5 border border-slate-800/80 rounded-xl hover:border-slate-600 transition-all duration-300 text-left overflow-hidden"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={getJobImage(job.name)}
                    alt={job.name}
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-85 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/25 to-slate-950/45"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 flex flex-col">
                  <div className="w-10 h-10 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-700/70 group-hover:scale-105 transition-all duration-300">
                    <i className={`${job.icon} text-slate-200 text-lg`}></i>
                  </div>
                  
                  <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-slate-100 transition-all">
                    {job.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-slate-400 group-hover:text-slate-300 transition-colors">
                    <span className="text-xs">체험하기</span>
                    <i className={`ri-arrow-right-s-line text-sm transition-transform ${hoveredIndex === index ? 'translate-x-0.5' : ''}`}></i>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-40 px-6 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-slate-800/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
            혁신적인 미래를 목표로 한다면
            <br />
            <span className="text-slate-400">지금 시작하세요</span>
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <button
              onClick={handleStartClick}
              className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-medium hover:bg-slate-100 transition-all text-base overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                시작하기
                <i className="ri-arrow-right-line group-hover:translate-x-0.5 transition-transform"></i>
              </span>
            </button>
            
            <a
              href="#features"
              className="px-8 py-4 text-slate-400 hover:text-white transition-colors text-base font-medium"
            >
              더 알아보기
            </a>
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
