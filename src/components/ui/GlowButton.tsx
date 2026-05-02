import { cn } from '@/lib/utils';

type Variant = 'brand' | 'glass' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  href?: string;
  children: React.ReactNode;
  className?: string;
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const variantClasses: Record<Variant, string> = {
  brand:
    'bg-gradient-to-r from-[#EF7E2E] to-[#F5A623] text-white shadow-[0_0_24px_rgba(239,126,46,0.25)] hover:shadow-[0_0_40px_rgba(239,126,46,0.40)] hover:-translate-y-px active:translate-y-0',
  glass:
    'bg-white/8 backdrop-blur-md border border-white/14 text-[#F1F5FF] hover:bg-white/12 hover:border-white/20',
  outline:
    'bg-transparent border border-[rgba(239,126,46,0.4)] text-[#EF7E2E] hover:bg-[rgba(239,126,46,0.08)] hover:border-[rgba(239,126,46,0.7)] hover:shadow-[0_0_20px_rgba(239,126,46,0.12)]',
};

export default function GlowButton({
  variant = 'brand',
  size = 'md',
  className,
  children,
  ...props
}: GlowButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-[10px] font-semibold',
        'transition-all duration-[280ms] cursor-pointer select-none',
        'min-h-[44px]',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
