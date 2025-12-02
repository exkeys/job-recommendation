import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { useEffect, useMemo } from 'react';
import { problems, jobCategories } from '../data/problems';
import ProblemCard from '../components/ProblemCard';
import PageHeader from '../components/PageHeader';

export default function ProblemSelect() {
  const navigate = useNavigate();
  const { selectedJob, setSelectedProblem } = useStore();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!selectedJob) {
      navigate('/');
    }
  }, [selectedJob, navigate]);

  const handleProblemSelect = (problem: string, image: string) => {
    setSelectedProblem(problem, image);
    navigate('/solution-select');
  };

  // 선택한 직군에 맞는 문제만 필터링
  const formattedProblems = useMemo(() => {
    // selectedJob에 해당하는 직군 카테고리 찾기
    const selectedCategory = jobCategories.find(cat => 
      cat.name === selectedJob
    );
    
    if (!selectedCategory) {
      return [];
    }
    
    // 선택한 직군의 문제 목록만 필터링
    const filteredProblems = problems.filter(problem => 
      selectedCategory.problems.includes(problem.title)
    );
    
    return filteredProblems.map(problem => {
      return {
        title: problem.title,
        description: `${problem.title} 상황에 대한 해결 방법을 찾아보세요.`,
        image: problem.image,
        icon: selectedCategory.icon
      };
    });
  }, [selectedJob]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <PageHeader onBack={() => navigate(-1)} />

      {/* Title Section */}
      <div className="bg-slate-950 border-b border-slate-800/50">
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
          {formattedProblems.map((problem, index) => (
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
