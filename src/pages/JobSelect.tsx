import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';
import { jobCategories } from '../data/problems';

export default function JobSelect() {
  const navigate = useNavigate();
  const { setSelectedJob } = useStore();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

  const features = [
    {
      icon: 'ri-brain-line',
      title: 'AI 맞춤 솔루션',
      desc: '실제 업무 상황에 대한 AI 기반 맞춤형 해결책을 제공합니다'
    },
    {
      icon: 'ri-lightbulb-flash-line',
      title: '실전 시뮬레이션',
      desc: '실제 업무 환경을 시뮬레이션하여 직무를 미리 경험해볼 수 있습니다'
    },
    {
      icon: 'ri-rocket-line',
      title: '빠른 성장',
      desc: '다양한 직무 상황을 경험하며 빠르게 역량을 키울 수 있습니다'
    },
    {
      icon: 'ri-team-line',
      title: '협업 시나리오',
      desc: '팀 프로젝트와 협업 상황을 체험하며 소통 능력을 향상시킵니다'
    },
    {
      icon: 'ri-line-chart-line',
      title: '성과 분석',
      desc: 'AI가 당신의 선택과 결정을 분석하여 개선점을 제시합니다'
    },
    {
      icon: 'ri-compass-3-line',
      title: '커리어 가이드',
      desc: '각 직군의 특성과 요구사항을 이해하고 최적의 진로를 찾습니다'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prev) => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [features.length]);

  const handleJobSelect = (job: string) => {
    setSelectedJob(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/problem-select');
    }, 300);
  };

  const handleStartClick = () => {
    const element = document.getElementById('jobs');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full mb-8">
            <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">AI 기반 직무 체험 플랫폼</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            당신의 직무,<br />
            <span className="bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
              AI가 함께합니다
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            관심있는 직군을 선택하고 실제 업무 상황을 체험해보세요.<br />
            AI가 제시하는 맞춤형 솔루션으로 직무를 미리 경험할 수 있습니다.
          </p>

          <button
            onClick={handleStartClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-xl font-semibold hover:shadow-2xl hover:shadow-slate-500/30 transition-all text-lg whitespace-nowrap"
          >
            시작하기
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </section>

      {/* Features Section - Carousel */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">왜 CareerAI인가요?</h2>
            <p className="text-slate-400 text-lg">AI 기술로 더 스마트한 직무 체험을 제공합니다</p>
          </div>

          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentFeatureIndex * 33.333}%)` }}
            >
              {features.map((feature, index) => (
                <div key={index} className="w-1/3 flex-shrink-0 px-4">
                  <div className="group p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl hover:border-slate-700 transition-all h-full">
                    <div className="w-14 h-14 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <i className={`${feature.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-400 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeatureIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentFeatureIndex 
                      ? 'bg-white w-8' 
                      : 'bg-slate-700 hover:bg-slate-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Section */}
      <section id="jobs" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">직군을 선택하세요</h2>
            <p className="text-slate-400 text-lg">관심있는 직군을 선택하고 실제 업무를 체험해보세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {jobCategories.map((job, index) => (
              <button
                key={index}
                onClick={() => handleJobSelect(job.name)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl hover:border-slate-700 hover:bg-slate-900/70 transition-all text-left overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <i className={`${job.icon} text-white text-xl`}></i>
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-slate-200 transition-all">
                    {job.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-slate-500 group-hover:text-slate-400 transition-colors">
                    <span className="text-sm font-medium">체험하기</span>
                    <i className={`ri-arrow-right-line transition-transform ${hoveredIndex === index ? 'translate-x-1' : ''}`}></i>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-3xl overflow-hidden">
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">
                지금 바로 시작하세요
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                AI와 함께 당신의 커리어를 탐색해보세요
              </p>
              <button
                onClick={handleStartClick}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-950 rounded-xl font-semibold hover:bg-slate-100 transition-all whitespace-nowrap"
              >
                무료로 시작하기
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                <i className="ri-sparkling-2-fill text-white text-lg"></i>
              </div>
              <span className="text-lg font-bold text-white">CareerAI</span>
            </div>

            <div className="flex items-center gap-6">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="ri-twitter-x-line text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <i className="ri-github-fill text-xl"></i>
              </a>
            </div>

            <p className="text-slate-500 text-sm">
              © 2024 CareerAI. All rights reserved. | <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">Powered by Readdy</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
