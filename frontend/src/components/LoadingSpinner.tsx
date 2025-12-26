import { memo } from 'react';

interface LoadingSpinnerProps {
  message?: string;
  subMessage?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
};

/**
 * 로딩 스피너 컴포넌트
 */
function LoadingSpinner({
  message = '로딩 중...',
  subMessage,
  size = 'md',
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div
        className={`${sizeMap[size]} border-4 border-slate-800 border-t-slate-600 rounded-full animate-spin mb-6`}
      />
      <p className="text-lg text-slate-400">{message}</p>
      {subMessage && <p className="text-sm text-slate-500 mt-2">{subMessage}</p>}
    </div>
  );
}

export default memo(LoadingSpinner);

