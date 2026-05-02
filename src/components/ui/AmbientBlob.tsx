import { cn } from '@/lib/utils';

type BlobColor = 'orange' | 'indigo' | 'mixed';
type BlobAnimation = 'one' | 'two' | 'three';

interface AmbientBlobProps {
  color?: BlobColor;
  animation?: BlobAnimation;
  size?: string;
  className?: string;
  opacity?: number;
}

const colorMap: Record<BlobColor, string> = {
  orange: 'bg-[#EF7E2E]',
  indigo: 'bg-[#6366F1]',
  mixed:  'bg-gradient-to-br from-[#EF7E2E] to-[#6366F1]',
};

const animationMap: Record<BlobAnimation, string> = {
  one:   'animate-blob-one',
  two:   'animate-blob-two',
  three: 'animate-blob-three',
};

export default function AmbientBlob({
  color = 'orange',
  animation = 'one',
  size = 'w-[600px] h-[600px]',
  className,
  opacity = 0.10,
}: AmbientBlobProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute rounded-full blur-[120px] pointer-events-none will-change-transform',
        colorMap[color],
        animationMap[animation],
        size,
        className
      )}
      style={{ opacity }}
    />
  );
}
