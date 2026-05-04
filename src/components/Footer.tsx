import Link from 'next/link';
import { Instagram, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import AnimatedLogo from './AnimatedLogo';

const serviceLinks = [
  { name: 'Digital Institute', href: '/courses' },
  { name: 'Marketing Agency',  href: '/services' },
  { name: 'AI Automation',     href: '/aidev' },
  { name: 'Our Projects',      href: '/projects' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Pricing',  href: '/pricing' },
  { name: 'FAQ',      href: '/faq' },
  { name: 'Our Team', href: '/team' },
  { name: 'Blog',     href: '/blog' },
  { name: 'Contact',  href: '/contact' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { name: 'Twitter',   href: 'https://twitter.com',   icon: Twitter },
  { name: 'LinkedIn',  href: 'https://linkedin.com',  icon: Linkedin },
  { name: 'YouTube',   href: 'https://youtube.com',   icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#05070F]">
      {/* Subtle ambient gradient */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#EF7E2E] rounded-full blur-[160px] opacity-[0.04] pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <AnimatedLogo />
            <p className="text-[#8892A4] text-sm leading-relaxed">
              A 3-in-1 platform uniting digital education, creative marketing, and AI automation to empower the next generation.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="w-9 h-9 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center text-[#8892A4] hover:text-[#EF7E2E] hover:border-[rgba(239,126,46,0.40)] hover:bg-[rgba(239,126,46,0.08)] transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Services */}
          <div>
            <h3 className="text-[#F1F5FF] font-semibold text-sm mb-4 uppercase tracking-widest">Services</h3>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-[#8892A4] text-sm hover:text-[#EF7E2E] transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h3 className="text-[#F1F5FF] font-semibold text-sm mb-4 uppercase tracking-widest">Company</h3>
            <ul className="flex flex-col gap-3">
              {companyLinks.map(({ name, href }) => (
                <li key={name}>
                  <Link
                    href={href}
                    className="text-[#8892A4] text-sm hover:text-[#EF7E2E] transition-colors duration-200"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h3 className="text-[#F1F5FF] font-semibold text-sm mb-4 uppercase tracking-widest">Contact</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2 text-[#8892A4] text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-[#EF7E2E] shrink-0" />
                <a href="mailto:coord_adi@outlook.com" className="hover:text-[#EF7E2E] transition-colors">
                  coord_adi@outlook.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#8892A4] text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-[#EF7E2E] shrink-0" />
                <a href="tel:+923189532843" className="hover:text-[#EF7E2E] transition-colors">
                  +92 3189532843
                </a>
              </li>
              <li className="flex items-start gap-2 text-[#8892A4] text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-[#EF7E2E] shrink-0" />
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#8892A4] text-xs">
            &copy; {new Date().getFullYear()} ActionDigital. All rights reserved.
          </p>
          <p className="text-[#8892A4] text-xs">
            Built with Next.js, TypeScript &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
