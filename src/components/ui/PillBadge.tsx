import { cn } from '@/lib/utils';

type PillVariant = 'orange' | 'indigo' | 'glass' | 'success' | 'warning';

interface PillBadgeProps {
  children: React.ReactNode;
  variant?: PillVariant;
  className?: string;
}

const variantClasses: Record<PillVariant, string> = {
  orange:  'bg-[rgba(239,126,46,0.12)] border-[rgba(239,126,46,0.30)] text-[#EF7E2E]',
  indigo:  'bg-[rgba(99,102,241,0.12)] border-[rgba(99,102,241,0.30)] text-[#6366F1]',
  glass:   'bg-white/8 border-white/14 text-[#8892A4]',
  success: 'bg-[rgba(16,185,129,0.12)] border-[rgba(16,185,129,0.30)] text-[#10B981]',
  warning: 'bg-[rgba(245,158,11,0.12)] border-[rgba(245,158,11,0.30)] text-[#F59E0B]',
};

export default function PillBadge({ children, variant = 'glass', className }: PillBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
