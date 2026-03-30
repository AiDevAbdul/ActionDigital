# Motion & Animation

## Motion Shim Strategy

The project uses a **motion shim** (`src/lib/motion-shim.tsx`) instead of Framer Motion directly for React 19 compatibility.

## How It Works

The motion shim:
- Strips all Framer Motion props (initial, animate, variants, etc.)
- Renders plain HTML elements without animations
- Prevents SSR hydration issues
- Compatible with React 19
- Components using `motion.*` will render without animations

## Usage

Always import from the motion shim, not Framer Motion directly:

```typescript
// ✅ Correct
import { motion } from '@/lib/motion-shim';

export default function Component() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Content
    </motion.div>
  );
}

// ❌ Wrong
import { motion } from 'framer-motion';
```

## Client Components

Pages using the motion shim must be client components:

```typescript
'use client';

import { motion } from '@/lib/motion-shim';

export default function AnimatedPage() {
  return (
    <motion.div>
      Content
    </motion.div>
  );
}
```

## Important Notes

- No animations are currently active due to the motion shim
- All motion props are safely stripped during rendering
- This prevents hydration mismatches between server and client
- If you need real animations in the future, replace the shim with actual Framer Motion
