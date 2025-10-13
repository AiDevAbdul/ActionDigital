// TestThemeComponent.tsx - Temporary test file to verify theme functionality
'use client';

import { useTheme } from '@/components/ThemeProvider';

export default function TestThemeComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="p-4 border rounded bg-node-dark text-node-text-light">
      <h3 className="text-lg font-bold text-node-green">Theme Test</h3>
      <p>Current theme: <span className="font-semibold">{theme}</span></p>
      <p className="text-node-text-muted">This text should change color in dark mode</p>
      <button 
        onClick={toggleTheme}
        className="mt-2 px-4 py-2 bg-node-green text-node-dark rounded"
      >
        Toggle Theme
      </button>
      <div className="mt-4">
        <div className="w-8 h-8 bg-node-green rounded-full"></div>
        <div className="w-8 h-8 bg-[var(--color-node-green)] rounded-full mt-2"></div>
      </div>
    </div>
  );
}