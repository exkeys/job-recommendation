import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useEffect, useState } from 'react';
import { generateSolutions } from '../api/openai';
import SolutionButton from '../components/SolutionButton';

export default function SolutionSelect() {
  const navigate = useNavigate();
  const { selectedJob, selectedProblem, selectedImage, aiSolutions, setAiSolutions } = useStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedJob || !selectedProblem) {
      navigate('/');
      return;
    }

    if (aiSolutions.length === 0) {
      loadSolutions();
    }
  }, [selectedJob, selectedProblem]);

  const loadSolutions = async () => {
    setLoading(true);
    try {
      const solutions = await generateSolutions(selectedJob, selectedProblem);
      setAiSolutions(solutions);
    } catch (error) {
      console.error('Failed to generate solutions:', error);
      setAiSolutions([
        {
          title: '상황 파악 및 분석',
          description: '문제 상황을 정확히 파악하고 관련 문서를 검토합니다. 팀원들과 협업하여 다양한 해결 방안을 모색합니다.'
        },
        {
          title: '실행 계획 수립',
          description: '단계별 실행 계획을 수립하고 체계적으로 진행합니다. 우선순위를 정하고 효율적으로 업무를 처리합니다.'
        },
        {
          title: '결과 검증 및 개선',
          description: '실행 결과를 검증하고 피드백을 수집합니다. 지속적인 개선을 통해 더 나은 방법을 찾아갑니다.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Generate contextual image based on selected problem
  const getContextualImage = () => {
    const problemLower = selectedProblem.toLowerCase();
    
    // Design-related problems
    if (problemLower.includes('디자인') || problemLower.includes('ui') || problemLower.includes('ux')) {
      return 'professional designer working on user interface design system with multiple screens and color palettes, modern dark office workspace, collaborative design process, clean minimalist aesthetic with purple and violet accents, high quality digital illustration, dark theme';
    }
    
    // Feedback-related problems
    if (problemLower.includes('피드백') || problemLower.includes('클라이언트') || problemLower.includes('고객')) {
      return 'two professionals having productive feedback discussion meeting, one presenting design work on laptop while other reviews and provides constructive feedback, modern dark office setting, collaborative atmosphere, purple and violet color scheme, professional business illustration, dark ambient lighting';
    }
    
    // Code/Development problems
    if (problemLower.includes('코드') || problemLower.includes('개발') || problemLower.includes('버그') || problemLower.includes('에러')) {
      return 'software developer analyzing code on multiple monitors in dark room, debugging process, clean modern workspace with programming interface, focused professional atmosphere, purple and violet accent colors, high-tech digital workspace illustration, dark theme with glowing screens';
    }
    
    // Data/Analysis problems
    if (problemLower.includes('데이터') || problemLower.includes('분석') || problemLower.includes('리포트')) {
      return 'business analyst working with data visualization dashboards and charts in dark mode, modern analytics workspace, professional examining insights on large screen, dark office environment with purple and violet color accents, professional business illustration, dark theme';
    }
    
    // Meeting/Communication problems
    if (problemLower.includes('회의') || problemLower.includes('미팅') || problemLower.includes('커뮤니케이션')) {
      return 'professional team meeting with diverse group collaborating around table in modern dark conference room, presentation on screen, engaged discussion, productive atmosphere, purple and violet color scheme, business illustration, dark ambient lighting';
    }
    
    // Planning/Strategy problems
    if (problemLower.includes('계획') || problemLower.includes('전략') || problemLower.includes('기획')) {
      return 'strategic planning session with professional reviewing project roadmap and timeline on digital whiteboard in dark room, organized workspace with notes and documents, focused planning atmosphere, purple and violet accents, business illustration, dark theme';
    }
    
    // Default: General problem-solving
    return 'professional problem-solving scenario with person analyzing information and finding solutions in dark modern workspace, organized desk setup with glowing screens, thoughtful and focused atmosphere, clean aesthetic with purple and violet color accents, high quality business illustration, dark theme';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
            <span className="font-medium text-sm">뒤로가기</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-slate-700/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full mb-8">
            <i className="ri-sparkling-2-fill text-slate-400"></i>
            <span className="text-sm text-slate-300">AI 맞춤 솔루션</span>
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            AI가 맞춤 솔루션을 제시합니다
          </h1>
          <p className="text-xl text-slate-400 mb-12">
            선택하신 업무 상황에 대한 해결 방법을 확인해보세요
          </p>

          {/* Contextual Image - Moved Below */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-2xl h-80 rounded-3xl overflow-hidden shadow-2xl border border-slate-800/50">
              <img 
                src={`https://readdy.ai/api/search-image?query=$%7BencodeURIComponent%28getContextualImage%28%29%29%7D&width=800&height=400&seq=solution-${selectedProblem.replace(/\s+/g, '-')}&orientation=landscape`}
                alt={selectedProblem}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 text-white">
                  <span className="text-sm font-medium px-3 py-1 bg-slate-800/80 backdrop-blur-sm rounded-full">{selectedJob}</span>
                  <i className="ri-arrow-right-s-line text-slate-400"></i>
                  <span className="font-semibold">{selectedProblem}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Solutions Grid */}
      <div className="max-w-4xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-slate-800 border-t-slate-600 rounded-full animate-spin mb-6"></div>
            <p className="text-lg text-slate-400">AI가 솔루션을 생성하고 있습니다...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {aiSolutions.slice(0, 3).map((solution, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-12 hover:shadow-2xl transition-all duration-500 border border-slate-100"
              >
                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-slate-50 to-transparent rounded-bl-full opacity-50"></div>
                
                <div className="relative flex items-start gap-8">
                  {/* Number Badge - Premium Style */}
                  <div className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-slate-900 to-slate-700 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-lg">
                    <span className="text-4xl font-semibold text-white">{index + 1}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-3xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                      {solution.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-lg font-normal">
                      {solution.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity rounded-b-3xl"></div>
              </div>
            ))}
          </div>
        )}
      </div>

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
