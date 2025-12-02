export default function PageHeader({ onBack }: { onBack?: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/50">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
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

