// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ThemeProvider } from '@/context/ThemeProvider';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Abdul Wahab | techAI.pk',
  description: 'AI Engineer, Digital Marketing Strategist, and Skills Development Expert. Building intelligent solutions with Next.js, TypeScript, and AI.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Inline script in the head so <script> is not a child of <html> */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const saved = localStorage.getItem('theme');
                // If no saved preference, default to dark mode
                const theme = saved || 'dark';
                document.documentElement.classList.remove('light','dark');
                document.documentElement.classList.add(theme);
              } catch(e) {}
            })();
          `}
        </Script>
      </head>

      <body className="font-sans">
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
