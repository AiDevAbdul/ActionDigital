// src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; 
import './globals.css';
import Header from '@/components/Header'; // <-- Import the new component

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
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-node-dark text-node-text-light font-sans">
        
        {/* Place the Header here */}
        <Header />
        
        {/* The rest of the page content */}
        {children}
        
      </body>
    </html>
  );
}