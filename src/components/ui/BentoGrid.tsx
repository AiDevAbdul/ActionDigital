import { cn } from '@/lib/utils';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: 2 | 3 | 4;
}

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  span?: 1 | 2;
}

export function BentoGrid({ children, className, cols = 3 }: BentoGridProps) {
  const colClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn('grid gap-4 lg:gap-6', colClasses[cols], className)}>
      {children}
    </div>
  );
}

export function BentoItem({ children, className, span = 1 }: BentoItemProps) {
  return (
    <div className={cn(span === 2 && 'md:col-span-2', className)}>
      {children}
    </div>
  );
}
