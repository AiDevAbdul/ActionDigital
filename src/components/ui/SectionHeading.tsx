import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  align?: 'left' | 'center' | 'right';
  accentColor?: 'orange' | 'indigo';
  className?: string;
  headingClassName?: string;
}

export default function SectionHeading({
  eyebrow,
  heading,
  subtext,
  align = 'center',
  accentColor = 'orange',
  className,
  headingClassName,
}: SectionHeadingProps) {
  const alignClasses = {
    left:   'items-start text-left',
    center: 'items-center text-center',
    right:  'items-end text-right',
  };

  const eyebrowColor = accentColor === 'orange'
    ? 'text-[#EF7E2E] border-[rgba(239,126,46,0.30)] bg-[rgba(239,126,46,0.08)]'
    : 'text-[#6366F1] border-[rgba(99,102,241,0.30)] bg-[rgba(99,102,241,0.08)]';

  return (
    <div className={cn('flex flex-col gap-3', alignClasses[align], className)}>
      {eyebrow && (
        <span
          className={cn(
            'inline-block px-3 py-1 text-xs font-semibold uppercase tracking-widest rounded-full border',
            eyebrowColor
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          'font-heading font-bold text-[#F1F5FF] leading-tight',
          'text-h2',
          headingClassName
        )}
      >
        {heading}
      </h2>
      {subtext && (
        <p className="text-[#8892A4] text-base md:text-lg leading-relaxed max-w-2xl">
          {subtext}
        </p>
      )}
    </div>
  );
}
