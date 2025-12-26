import { memo } from 'react';
import { getJobImage } from '../data/jobImages';

interface JobCardProps {
  job: { name: string; icon: string };
  index: number;
  hoveredIndex: number | null;
  onSelect: (job: string) => void;
  onHover: (index: number | null) => void;
  variant?: 'default' | 'compact';
}

/**
 * 직군 카드 컴포넌트
 */
function JobCard({
  job,
  index,
  hoveredIndex,
  onSelect,
  onHover,
  variant = 'default',
}: JobCardProps) {
  const isHovered = hoveredIndex === index;

  const baseClasses =
    variant === 'compact'
      ? 'group relative p-5 rounded-2xl border border-slate-800/60 hover:border-slate-600 transition-all duration-300 overflow-hidden text-left bg-slate-900/60 backdrop-blur-sm'
      : 'group relative p-5 border border-slate-800/80 rounded-xl hover:border-slate-600 transition-all duration-300 text-left overflow-hidden';

  const iconClasses =
    variant === 'compact'
      ? 'w-10 h-10 bg-slate-800/70 border border-slate-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-slate-700 group-hover:scale-105 transition-all duration-300'
      : 'w-10 h-10 bg-slate-800/60 backdrop-blur-sm border border-slate-600/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-700/70 group-hover:scale-105 transition-all duration-300';

  const gradientClasses =
    variant === 'compact'
      ? 'absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/40 to-slate-950/70'
      : 'absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/25 to-slate-950/45';

  return (
    <button
      onClick={() => onSelect(job.name)}
      onMouseEnter={() => onHover(index)}
      onMouseLeave={() => onHover(null)}
      className={baseClasses}
    >
      <div className="absolute inset-0">
        <img
          src={getJobImage(job.name)}
          alt={job.name}
          className="w-full h-full object-cover opacity-75 group-hover:opacity-85 transition-opacity duration-300"
          loading="eager"
          fetchPriority={index < 8 ? "high" : "auto"}
          decoding="async"
        />
        <div className={gradientClasses}></div>
      </div>

      <div className="relative z-10 flex flex-col">
        <div className={iconClasses}>
          <i className={`${job.icon} text-slate-200 text-lg`}></i>
        </div>
        <h3
          className={
            variant === 'compact'
              ? 'text-base font-semibold text-white mb-1'
              : 'text-sm font-semibold text-white mb-1 group-hover:text-slate-100 transition-all'
          }
        >
          {job.name}
        </h3>
        <div
          className={
            variant === 'compact'
              ? 'flex items-center gap-2 text-slate-300 text-sm'
              : 'flex items-center gap-1 text-slate-400 group-hover:text-slate-300 transition-colors'
          }
        >
          <span className={variant === 'compact' ? 'text-sm' : 'text-xs'}>체험하기</span>
          <i
            className={`ri-arrow-right-s-line ${variant === 'compact' ? 'text-sm' : 'text-sm'} transition-transform ${isHovered ? 'translate-x-0.5' : ''}`}
          ></i>
        </div>
      </div>
    </button>
  );
}

export default memo(JobCard);

