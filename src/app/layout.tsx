// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Action Digital Institute',
  description: 'Leading institute for Web/App Development, AI/ML Training, and Digital Marketing. Transform your digital future with our cutting-edge programs.',
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
      <body className={`${inter.className} text-primary`}>
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
