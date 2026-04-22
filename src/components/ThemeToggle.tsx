'use client';

import { useTheme } from '@/context/ThemeProvider';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-full bg-glass border border-default text-accent hover:bg-accent/10 transition-colors"
        aria-label="Toggle Theme"
        disabled
      >
        <Moon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-glass border border-default text-accent hover:bg-accent/10 transition-colors"
      aria-label="Toggle Theme"
    >
      {theme === 'dark'
        ? <Sun className="w-5 h-5" />
        : <Moon className="w-5 h-5" />}
    </button>
  );
}