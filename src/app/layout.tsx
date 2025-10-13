// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; 
import './globals.css';
import Header from '@/components/Header'; // <-- Import the new component
import { ThemeProvider } from '@/components/ThemeProvider'; 
import Footer from '@/components/Footer';

// Configure the Inter font
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Abdul Wahab | techAI.pk',
  description: 'AI Engineer, Digital Marketing Strategist, and Skills Development Expert. Building intelligent solutions with Next.js, TypeScript, and AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Note: We remove the dark classes from <html> and <body> here, 
    // as ThemeProvider will control the 'dark' class on <html> later.
    <html lang="en" className="light">
      <body className="font-sans"> 
        <ThemeProvider> {/* <-- Wrap everything in the provider */}
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}