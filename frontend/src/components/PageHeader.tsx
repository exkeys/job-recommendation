import { memo } from 'react';

interface PageHeaderProps {
  onBack?: () => void;
  theme?: 'dark' | 'light';
}

function PageHeader({ onBack, theme = 'dark' }: PageHeaderProps) {
  const isDark = theme === 'dark';
  
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b ${
      isDark 
        ? 'bg-slate-950/90 border-slate-800/50' 
        : 'bg-white/80 border-slate-200/50'
    }`}>
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className={`flex items-center gap-2 transition-colors ${
              isDark
                ? 'text-slate-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <i className="ri-arrow-left-line text-xl"></i>
            <span className="font-medium text-sm">뒤로가기</span>
          </button>
        )}
        
        <div className="flex items-center gap-3">
          {/* 빈 공간 유지 - 높이 일관성 유지 */}
        </div>
      </div>
    </header>
  );
}

export default memo(PageHeader);

