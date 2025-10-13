// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Abdul Wahab | techAI.pk',
  description: 'AI Engineer, Digital Marketing Strategist, and Skills Development Expert. Building intelligent solutions with Next.js, TypeScript, and AI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            try {
              const saved = localStorage.getItem('theme');
              const theme = saved || 'dark'; // Default to dark if no saved preference
              document.documentElement.classList.remove('light', 'dark');
              document.documentElement.classList.add(theme);
            } catch(e) {}
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-surface text-primary`}>
        <ThemeProvider>
          <Header />
          <AnimatedPageWrapper>
            {children}
          </AnimatedPageWrapper>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
