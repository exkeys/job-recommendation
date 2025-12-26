import { useStore } from '../store/useStore';
import { useState, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { COMMON_STYLES } from '../constants/styles';
import { useNavigation } from '../hooks/useNavigation';
import { useScrollToTop } from '../hooks/useScrollToTop';
import { useRouteGuard } from '../hooks/useRouteGuard';
import { generatePDF } from '../utils/report/pdfGenerator';

export default function Report() {
  const { selectedJob, selectedProblem, selectedSolution, reset } = useStore();
  const { goBack, goHome } = useNavigation();
  const [isGenerating, setIsGenerating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // 라우트 가드: job, problem, solution이 모두 필수
  useRouteGuard(['job', 'problem', 'solution']);

  // 페이지 진입 시 상단으로 스크롤
  useScrollToTop();

  const handleDownloadPDF = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    const button = event?.currentTarget || buttonRef.current;
    
    try {
      setIsGenerating(true);
      if (button) {
        button.disabled = true;
      }

      const result = await generatePDF({
        job: selectedJob,
        problem: selectedProblem,
        solution: selectedSolution,
      });

      if (!result.success) {
        alert(result.error || 'PDF 생성 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('PDF 생성 실패:', error);
      alert('PDF 생성 중 오류가 발생했습니다. 백엔드 서버가 실행 중인지 확인해주세요.');
    } finally {
      setIsGenerating(false);
      if (button) {
        button.disabled = false;
      }
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${selectedProblem} - 솔루션 리포트`,
        text: `${selectedJob} 분야의 ${selectedProblem} 문제에 대한 솔루션 리포트입니다.`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  const handleGenerateAIReport = () => {
    setIsGenerating(true);
    // AI 리포트 생성 로직 (추후 구현)
    setTimeout(() => {
      setIsGenerating(false);
      alert('AI 리포트 생성 기능은 곧 추가됩니다.');
    }, 2000);
  };

  const handleSave = () => {
    alert('리포트가 저장되었습니다.');
  };

  const handleNewReport = () => {
    reset();
    goHome();
  };

  if (!selectedJob || !selectedProblem || !selectedSolution) {
    return null;
  }

  return (
    <div className={COMMON_STYLES.pageBackground}>
      <PageHeader onBack={goBack} theme="dark" />

      {/* 상단 액션 바 */}
      <div className="sticky top-16 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <i className="ri-file-text-line text-white text-xl" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">솔루션 리포트</h2>
                <p className="text-xs text-slate-400">{new Date().toLocaleDateString('ko-KR')}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleGenerateAIReport}
                disabled={isGenerating}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg shadow-purple-500/20 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>생성 중...</span>
                  </>
                ) : (
                  <>
                    <i className="ri-sparkling-line" />
                    <span>AI 리포트 생성</span>
                  </>
                )}
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 text-slate-200 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <i className="ri-save-line" />
                <span>저장</span>
              </button>
              <button
                ref={buttonRef}
                onClick={(e) => handleDownloadPDF(e)}
                disabled={isGenerating}
                className="px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 text-slate-200 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" />
                    <span>생성 중...</span>
                  </>
                ) : (
                  <>
                    <i className="ri-download-line" />
                    <span>PDF</span>
                  </>
                )}
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-slate-800/60 hover:bg-slate-700/60 border border-slate-700/50 text-slate-200 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <i className="ri-share-line" />
                <span>공유</span>
              </button>
              <button
                onClick={handleNewReport}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2 ml-2 shadow-lg shadow-blue-500/20"
              >
                <i className="ri-add-line" />
                <span>새 리포트</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div id="report-content" className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽: 리포트 메타 정보 */}
          <div className="lg:col-span-1 space-y-6">
            {/* 프로젝트 정보 카드 */}
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 p-6 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <i className="ri-briefcase-4-line text-blue-400" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">직군</span>
                </div>
                <h3 className="text-xl font-bold text-white">{selectedJob}</h3>
              </div>
              
              <div className="border-t border-slate-700/50 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <i className="ri-error-warning-line text-orange-400" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">문제 상황</span>
                </div>
                <h3 className="text-xl font-bold text-white">{selectedProblem}</h3>
              </div>
              
              <div className="border-t border-slate-700/50 pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <i className="ri-lightbulb-line text-green-400" />
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">선택한 솔루션</span>
                </div>
                <h3 className="text-lg font-bold text-white">{selectedSolution.title}</h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">{selectedSolution.description}</p>
              </div>
            </div>

            {/* 진행 상태 */}
            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 rounded-2xl border border-blue-700/50 p-6">
              <h3 className="text-sm font-semibold text-white mb-4">리포트 진행 상태</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">문제 분석</p>
                    <p className="text-xs text-slate-400">완료</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">솔루션 선택</p>
                    <p className="text-xs text-slate-400">완료</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                    <i className="ri-file-edit-line text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">리포트 작성</p>
                    <p className="text-xs text-slate-400">진행 중</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-40">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                    <i className="ri-checkbox-circle-line text-white text-sm" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">실행 및 검증</p>
                    <p className="text-xs text-slate-400">대기 중</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 빠른 액션 */}
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-sm font-semibold text-white mb-4">빠른 액션</h3>
              <div className="space-y-2">
                <button className="w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl text-left text-sm text-slate-200 font-medium transition-all duration-200 flex items-center gap-3">
                  <i className="ri-edit-line text-slate-400" />
                  <span>리포트 편집</span>
                </button>
                <button className="w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl text-left text-sm text-slate-200 font-medium transition-all duration-200 flex items-center gap-3">
                  <i className="ri-printer-line text-slate-400" />
                  <span>인쇄 미리보기</span>
                </button>
                <button className="w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl text-left text-sm text-slate-200 font-medium transition-all duration-200 flex items-center gap-3">
                  <i className="ri-mail-send-line text-slate-400" />
                  <span>이메일 전송</span>
                </button>
                <button className="w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700/70 rounded-xl text-left text-sm text-slate-200 font-medium transition-all duration-200 flex items-center gap-3">
                  <i className="ri-team-line text-slate-400" />
                  <span>팀과 공유</span>
                </button>
              </div>
            </div>
          </div>

          {/* 오른쪽: 리포트 본문 */}
          <div id="report-pdf-content" className="lg:col-span-2 space-y-8">
            {/* 리포트 개요 */}
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="px-8 py-6 bg-gradient-to-r from-blue-900/40 to-blue-800/40 border-b border-blue-700/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                      <i className="ri-file-list-3-line text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">리포트 개요</h2>
                      <p className="text-sm text-slate-400">AI가 생성할 리포트 내용</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/30">AI 생성 예정</span>
                </div>
              </div>
              <div className="p-8">
                <div className="min-h-[200px] bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-700/50 flex items-center justify-center">
                  <div className="text-center px-6">
                    <i className="ri-file-text-line text-slate-600 text-5xl mb-4" />
                    <p className="text-slate-300 font-medium mb-2">AI 리포트 개요</p>
                    <p className="text-sm text-slate-400">이 공간에 AI가 생성한 문제 상황의 전반적인 개요가 표시됩니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 상세 분석 */}
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="px-8 py-6 bg-gradient-to-r from-purple-900/40 to-purple-800/40 border-b border-purple-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                    <i className="ri-search-eye-line text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">상세 분석</h2>
                    <p className="text-sm text-slate-400">문제 상황에 대한 심층 분석</p>
                  </div>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="min-h-[300px] bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-700/50 flex items-center justify-center">
                  <div className="text-center px-6">
                    <i className="ri-pie-chart-line text-slate-600 text-5xl mb-4" />
                    <p className="text-slate-300 font-medium mb-2">AI 분석 결과</p>
                    <p className="text-sm text-slate-400">문제의 근본 원인, 영향 범위, 우선순위 등을<br />AI가 분석하여 표시합니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 솔루션 상세 */}
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="px-8 py-6 bg-gradient-to-r from-green-900/40 to-emerald-900/40 border-b border-green-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                    <i className="ri-lightbulb-flash-line text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">솔루션 실행 계획</h2>
                    <p className="text-sm text-slate-400">단계별 실행 방법 및 체크리스트</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="min-h-[400px] bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-700/50 flex items-center justify-center">
                  <div className="text-center px-6">
                    <i className="ri-roadmap-line text-slate-600 text-5xl mb-4" />
                    <p className="text-slate-300 font-medium mb-2">AI 실행 계획</p>
                    <p className="text-sm text-slate-400">선택한 솔루션의 구체적인 실행 단계와<br />각 단계별 체크포인트를 제시합니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 예상 결과 및 성과 지표 */}
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="px-8 py-6 bg-gradient-to-r from-orange-900/40 to-amber-900/40 border-b border-orange-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center">
                    <i className="ri-line-chart-line text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">예상 결과 및 성과</h2>
                    <p className="text-sm text-slate-400">기대 효과와 측정 가능한 지표</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="min-h-[300px] bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-700/50 flex items-center justify-center">
                  <div className="text-center px-6">
                    <i className="ri-bar-chart-box-line text-slate-600 text-5xl mb-4" />
                    <p className="text-slate-300 font-medium mb-2">AI 성과 예측</p>
                    <p className="text-sm text-slate-400">솔루션 적용 시 예상되는 결과와<br />성과를 측정할 수 있는 KPI를 제시합니다.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 리스크 및 주의사항 */}
            <div className="bg-slate-800/60 rounded-2xl border border-slate-700/50 overflow-hidden">
              <div className="px-8 py-6 bg-gradient-to-r from-red-900/40 to-rose-900/40 border-b border-red-700/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                    <i className="ri-alert-line text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">리스크 및 주의사항</h2>
                    <p className="text-sm text-slate-400">잠재적 위험 요소와 대응 방안</p>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="min-h-[250px] bg-slate-900/50 rounded-xl border-2 border-dashed border-slate-700/50 flex items-center justify-center">
                  <div className="text-center px-6">
                    <i className="ri-shield-check-line text-slate-600 text-5xl mb-4" />
                    <p className="text-slate-300 font-medium mb-2">AI 리스크 분석</p>
                    <p className="text-sm text-slate-400">솔루션 실행 시 주의해야 할 사항과<br />리스크 완화 전략을 제시합니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 인쇄 스타일 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media print {
          body { background: white; }
          .bg-gradient-to-br,
          .bg-gradient-to-r { background: white !important; }
          button { display: none !important; }
          .sticky { position: relative !important; }
        }
      `}</style>
    </div>
  );
}

