import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useEffect } from 'react';
import { problems } from '../data/problems';
import ProblemCard from '../components/ProblemCard';

export default function ProblemSelect() {
  const navigate = useNavigate();
  const { selectedJob, setSelectedProblem } = useStore();

  useEffect(() => {
    if (!selectedJob) {
      navigate('/');
    }
  }, [selectedJob, navigate]);

  const handleProblemSelect = (problem: string, image: string) => {
    setSelectedProblem(problem, image);
    navigate('/solution-select');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <i className="ri-arrow-left-line text-xl"></i>
            <span className="font-medium text-sm">돌아가기</span>
          </button>
          
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg">
              <span className="text-sm text-slate-300">{selectedJob}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Title Section */}
      <div className="sticky top-[73px] z-30 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full mb-4">
              <i className="ri-lightbulb-flash-line text-slate-400"></i>
              <span className="text-sm text-slate-300">실제 업무 상황</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-2">
              어떤 상황을 경험하고 싶으신가요?
            </h1>
            <p className="text-lg text-slate-400">
              실제 업무에서 마주칠 수 있는 다양한 상황을 선택해보세요
            </p>
          </div>
        </div>
      </div>

      {/* Problems Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              problem={problem}
              onClick={() => handleProblemSelect(problem.title, problem.image)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
