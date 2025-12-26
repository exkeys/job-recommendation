import type { ReactNode } from 'react';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * 공통 페이지 레이아웃 컴포넌트
 */
export default function PageLayout({ children, className = '' }: PageLayoutProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 ${className}`}
    >
      {children}
    </div>
  );
}

