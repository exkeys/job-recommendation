import { memo } from 'react';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'gradient';
}

const paddingMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

/**
 * 공통 카드 컴포넌트
 */
function Card({
  children,
  className = '',
  padding = 'md',
  variant = 'default',
}: CardProps) {
  const baseStyles = 'bg-slate-800/60 rounded-2xl border border-slate-700/50';
  const variantStyles = variant === 'gradient' ? 'overflow-hidden' : '';

  return (
    <div className={`${baseStyles} ${variantStyles} ${paddingMap[padding]} ${className}`}>
      {children}
    </div>
  );
}

export default memo(Card);

