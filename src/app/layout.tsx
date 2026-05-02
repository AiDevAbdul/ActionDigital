// src/app/layout.tsx
import './globals.css';
import { ThemeProvider } from '@/context/ThemeProvider';
import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimatedPageWrapper from '@/components/AnimatedPageWrapper';
import SessionBanner from '@/components/SessionBanner';
import { Analytics } from "@vercel/analytics/next"
import { siteConfig } from '@/lib/site';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
  };

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
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} font-body text-primary`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ThemeProvider>
          <SessionBanner />
          <Header />
          <AnimatedPageWrapper>
            {children}
          </AnimatedPageWrapper>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
