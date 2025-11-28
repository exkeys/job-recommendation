import { useState } from 'react';

interface SolutionButtonProps {
  solution: {
    title: string;
    description: string;
  };
  index: number;
  onClick: () => void;
}

const gradients = [
  'from-violet-600 to-purple-600',
  'from-blue-600 to-cyan-600',
  'from-emerald-600 to-teal-600'
];

export default function SolutionButton({ solution, index, onClick }: SolutionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const gradient = gradients[index % gradients.length];

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-8 bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl hover:border-slate-700 transition-all text-left overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
      
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
            <span className="text-white font-bold text-lg">{index + 1}</span>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
            {solution.title}
          </h3>
        </div>
        
        <p className="text-slate-400 leading-relaxed mb-4">{solution.description}</p>
        
        <div className="flex items-center gap-2 text-slate-500 group-hover:text-violet-400 transition-colors">
          <span className="text-sm font-medium">자세히 보기</span>
          <i className={`ri-arrow-right-line transition-transform ${isHovered ? 'translate-x-1' : ''}`}></i>
        </div>
      </div>
    </button>
  );
}
