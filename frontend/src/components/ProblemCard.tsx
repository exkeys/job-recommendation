import { useState, memo } from 'react';

interface ProblemCardProps {
  problem: {
    title: string;
    description: string;
    image: string;
    icon: string;
  };
  onClick: () => void;
}

function ProblemCard({ problem, onClick }: ProblemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl hover:border-slate-700 transition-all text-left overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative z-10">
        <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <i className={`${problem.icon} text-white text-xl`}></i>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
          {problem.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 leading-relaxed">{problem.description}</p>
        
        <div className="flex items-center gap-2 text-slate-500 group-hover:text-violet-400 transition-colors">
          <span className="text-sm font-medium">선택하기</span>
          <i className={`ri-arrow-right-line transition-transform ${isHovered ? 'translate-x-1' : ''}`}></i>
        </div>
      </div>
    </button>
  );
}

export default memo(ProblemCard);
