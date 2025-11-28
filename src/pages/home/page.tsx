import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobCategories } from '../data/problems';
import { useStore } from '../store/useStore';

export default function HomePage() {
  const navigate = useNavigate();
  const { setSelectedJob } = useStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentText, setCurrentText] = useState('당신의 직무');

  useEffect(() => {
    const texts = ['당신의 직무', '미래의 커리어'];
    let index = 0;
    
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setCurrentText(texts[index]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleJobSelect = (jobId: string) => {
    setSelectedJob(jobId);
    navigate('/problem-select');
  };

  const handleGetStarted = () => {
    const element = document.getElementById('job-categories');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <i className="ri-sparkling-2-fill text-xl text-white"></i>
            </div>
            <span className="text-xl font-bold text-slate-800">AI Career</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">특징</a>
            <a href="#job-categories" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">직군</a>
            <a href="#about" className="text-slate-600 hover:text-slate-900 font-medium transition-colors">소개</a>
          </div>

          {/* Login Button */}
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            로그인
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 rounded-full mb-8 border border-teal-100">
            <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-teal-700">AI 기반 직무 체험 플랫폼</span>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="inline-block overflow-hidden h-[84px]">
              <span
                key={currentText}
                className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent animate-slideUp"
              >
                {currentText}
              </span>
            </span>
            <br />
            <span className="text-slate-900">AI가 함께합니다</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            관심있는 직군을 선택하고 실제 업무 상황을 체험해보세요
            <br />
            AI가 제시하는 맞춤형 솔루션으로 직무를 미리 경험할 수 있습니다
          </p>

          {/* CTA Button */}
          <button
            onClick={handleGetStarted}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            시작하기
            <i className="ri-arrow-down-line text-xl group-hover:translate-y-1 transition-transform"></i>
          </button>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">11+</div>
              <div className="text-slate-600 text-sm">직군 카테고리</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">100+</div>
              <div className="text-slate-600 text-sm">업무 시나리오</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">AI</div>
              <div className="text-slate-600 text-sm">맞춤형 솔루션</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              왜 AI Career인가요?
            </h2>
            <p className="text-xl text-slate-600">
              실제 업무를 경험하고 나에게 맞는 직무를 찾아보세요
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-lightbulb-flash-line',
                title: '실제 업무 체험',
                desc: '각 직군의 실제 업무 상황을 시뮬레이션으로 경험할 수 있습니다',
                color: 'from-teal-500 to-cyan-500'
              },
              {
                icon: 'ri-robot-2-line',
                title: 'AI 맞춤 솔루션',
                desc: '선택한 업무 상황에 대해 AI가 최적의 해결책을 제시합니다',
                color: 'from-cyan-500 to-blue-500'
              },
              {
                icon: 'ri-compass-3-line',
                title: '직무 탐색',
                desc: '다양한 직군을 체험하며 나에게 맞는 커리어를 찾을 수 있습니다',
                color: 'from-blue-500 to-indigo-500'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                  <i className={`${feature.icon} text-3xl text-white`}></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Job Categories Section */}
      <div id="job-categories" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              체험할 직군을 선택하세요
            </h2>
            <p className="text-xl text-slate-600">
              각 직군의 실제 업무 상황을 AI와 함께 경험해보세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((job, index) => (
              <div
                key={job.id}
                onClick={() => handleJobSelect(job.id)}
                className="group relative bg-white rounded-2xl p-8 cursor-pointer hover:shadow-2xl transition-all duration-500 border border-slate-200 hover:border-teal-300 overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/5 group-hover:to-cyan-500/5 transition-all duration-500"></div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                    <i className={`${job.icon} text-2xl text-white`}></i>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-teal-600 transition-colors">
                    {job.name}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4">
                    {job.problems.length}개의 업무 시나리오
                  </p>

                  <div className="flex items-center text-teal-600 font-medium text-sm">
                    <span className="mr-2">체험하기</span>
                    <i className="ri-arrow-right-line group-hover:translate-x-2 transition-transform"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="about" className="relative py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            AI와 함께 다양한 직군의 실제 업무를 체험하고,
            <br />
            나에게 맞는 커리어를 찾아보세요
          </p>
          <button
            onClick={handleGetStarted}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-teal-600 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            직군 체험하기
            <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <i className="ri-sparkling-2-fill text-xl text-white"></i>
                </div>
                <span className="text-xl font-bold">AI Career</span>
              </div>
              <p className="text-slate-400 text-sm">
                AI 기반 직무 체험 플랫폼
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">직군 체험</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI 솔루션</a></li>
                <li><a href="#" className="hover:text-white transition-colors">커리어 가이드</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">소개</a></li>
                <li><a href="#" className="hover:text-white transition-colors">블로그</a></li>
                <li><a href="#" className="hover:text-white transition-colors">채용</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">지원</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">고객센터</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 AI Career. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <i className="ri-instagram-line"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <i className="ri-twitter-x-line"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-colors">
                <i className="ri-linkedin-line"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl animate-scaleIn">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
            >
              <i className="ri-close-line text-2xl text-slate-600"></i>
            </button>

            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i className="ri-user-line text-3xl text-white"></i>
            </div>

            <h2 className="text-3xl font-bold text-center text-slate-900 mb-2">
              로그인
            </h2>
            <p className="text-center text-slate-600 mb-8">
              계정 정보를 입력해주세요
            </p>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-900"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                  <span className="text-slate-600">로그인 유지</span>
                </label>
                <a href="#" className="text-teal-600 hover:text-teal-700 font-medium">
                  비밀번호 찾기
                </a>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                로그인
              </button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-slate-500">또는</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="py-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                >
                  <i className="ri-google-fill text-xl text-slate-700"></i>
                </button>
                <button
                  type="button"
                  className="py-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                >
                  <i className="ri-kakao-talk-fill text-xl text-slate-700"></i>
                </button>
                <button
                  type="button"
                  className="py-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
                >
                  <i className="ri-github-fill text-xl text-slate-700"></i>
                </button>
              </div>

              <p className="text-center text-sm text-slate-600 mt-6">
                계정이 없으신가요?{' '}
                <a href="#" className="text-teal-600 hover:text-teal-700 font-semibold">
                  회원가입
                </a>
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
