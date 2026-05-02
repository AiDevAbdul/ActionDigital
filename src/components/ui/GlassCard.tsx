import { cn } from '@/lib/utils';

type GlowColor = 'orange' | 'indigo' | 'none';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: GlowColor;
  strong?: boolean;
  hover?: boolean;
  padding?: string;
}

export default function GlassCard({
  children,
  className,
  glow = 'none',
  strong = false,
  hover = false,
  padding = 'p-6',
}: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? 'glass-card-strong' : 'glass-card',
        padding,
        glow === 'orange' && 'glow-orange',
        glow === 'indigo' && 'glow-indigo',
        hover && 'transition-transform duration-[280ms] hover:-translate-y-1 hover:shadow-2xl',
        className
      )}
    >
      {children}
    </div>
  );
}
