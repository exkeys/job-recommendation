import { memo } from 'react';
import type { Solution } from '../types/api';
import { TIMING } from '../constants/timing';

interface SolutionCardProps {
  solution: Solution;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

/**
 * 솔루션 카드 컴포넌트
 */
function SolutionCard({
  solution,
  index,
  isSelected,
  onClick,
}: SolutionCardProps) {
  return (
    <div
      onClick={onClick}
      className={`solution-card rounded-2xl p-8 transition-all duration-300 cursor-pointer ${
        isSelected
          ? 'bg-slate-700/80 border-2 border-blue-500 shadow-lg shadow-blue-500/20'
          : 'bg-slate-800/60 border border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/70'
      }`}
      style={{ animationDelay: `${index * TIMING.SOLUTION_ANIMATION_DELAY}s` }}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
            isSelected
              ? 'bg-blue-600 border-2 border-blue-400'
              : 'bg-slate-700/80 border border-slate-600/50'
          }`}
        >
          {isSelected ? (
            <i className="ri-check-line text-white text-lg" />
          ) : (
            <span className="text-lg font-semibold text-white">{index + 1}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-white mb-3 leading-tight">{solution.title}</h3>
          <p className="text-slate-300 leading-relaxed text-base">{solution.description}</p>
        </div>
      </div>
    </div>
  );
}

export default memo(SolutionCard);

