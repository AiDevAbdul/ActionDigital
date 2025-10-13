// src/components/ThemeProvider.tsx

'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

// Create the context with default (null) values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setLocalTheme] = useState<Theme>('dark'); // Default to dark initially

  useEffect(() => {
    // Get saved theme from local storage or check system preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determine the initial theme: saved theme > system preference > default 'dark'
    const initialTheme: Theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Set the theme state and apply it to the document
    setLocalTheme(initialTheme);
    
    // Apply theme to document immediately after hydration
    const root = window.document.documentElement;
    if (initialTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme changes to document
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    // Save current theme to local storage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setLocalTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  const setTheme = (newTheme: Theme) => {
    setLocalTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context easily
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};