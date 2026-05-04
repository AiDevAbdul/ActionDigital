import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site';

const courseSlug = [
  'ai-driven-development',
  'artificial-intelligence',
  'digital-literacy',
  'python-programming',
  'social-media-management',
  'social-media-marketing',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now  = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                  lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`,       lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/courses`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/pricing`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/services`,    lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/projects`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/events`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/aidev`,       lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/blog`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${base}/team`,        lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/faq`,         lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`,     lastModified: now, changeFrequency: 'yearly',  priority: 0.6 },
  ];

  const courseRoutes: MetadataRoute.Sitemap = courseSlug.map((slug) => ({
    url: `${base}/courses/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...courseRoutes];
}
