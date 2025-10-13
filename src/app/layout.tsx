// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
              if (saved === 'dark') document.documentElement.classList.add('dark');
            } catch(e) {}
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
