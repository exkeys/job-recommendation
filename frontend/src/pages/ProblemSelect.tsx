import { useStore } from '../store/useStore';
import { useMemo, useCallback } from 'react';
import { problems, jobCategories } from '../data/problems';
import ProblemCard from '../components/ProblemCard';
import PageHeader from '../components/PageHeader';
import { COMMON_STYLES } from '../constants/styles';
import { useNavigation } from '../hooks/useNavigation';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useRouteGuard } from '../hooks/useRouteGuard';

export default function ProblemSelect() {
  const { selectedJob, setSelectedProblem } = useStore();
  const { goBack, goTo } = useNavigation();

  // 라우트 가드: job이 필수
  useRouteGuard(['job']);

  // 페이지 진입 시 상단으로 스크롤
  useScrollToTop();

  const handleProblemSelect = useCallback((problem: string, image: string) => {
    setSelectedProblem(problem, image);
    goTo('/solution-select');
  }, [setSelectedProblem, goTo]);

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
    <div className={COMMON_STYLES.pageBackground}>
      <PageHeader onBack={goBack} />

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
          {formattedProblems.map((problem, index) => {
            const handleClick = () => handleProblemSelect(problem.title, problem.image);
            return (
              <ProblemCard
                key={`${problem.title}-${index}`}
                problem={problem}
                onClick={handleClick}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
