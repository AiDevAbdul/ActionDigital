'use client';

import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full border border-[var(--accent-color)] hover:bg-[var(--accent-color)]/10 transition"
      aria-label="Toggle Theme"
    >
      {theme === 'dark'
        ? <Sun className="w-5 h-5 text-[var(--accent-color)]" />
        : <Moon className="w-5 h-5 text-[var(--accent-color)]" />}
    </button>
  );
}