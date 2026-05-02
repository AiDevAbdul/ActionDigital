'use client';

import { motion } from '@/lib/motion-shim';
import { Mail, MapPin, Github, Linkedin, Twitter, Code, Brain, Zap, Users } from 'lucide-react';
import { useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import PillBadge from '@/components/ui/PillBadge';
import AmbientBlob from '@/components/ui/AmbientBlob';

type SocialLinks = { github?: string; linkedin?: string; twitter?: string; email?: string };

type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  experience: string;
  location: string;
  socialLinks?: SocialLinks;
  isFounder?: boolean;
};

const MEMBERS: TeamMember[] = [
  {
    id: '1', isFounder: true,
    name: 'Jehangir Khan',
    role: 'Managing Director & Founder',
    bio: 'Visionary leader and founder of ActionDigital. With decades of experience in digital transformation, he guides our strategic direction and ensures our commitment to excellence.',
    skills: ['Digital Strategy', 'Business Leadership', 'Innovation', 'AI Implementation', 'EdTech'],
    experience: '15+ Years',
    location: 'Peshawar, Pakistan',
    socialLinks: { linkedin: '#', email: 'mailto:jehangir@actiondigitalinstitute.com' },
  },
  {
    id: '2',
    name: 'Abdul Wahab',
    role: 'AI Engineer & Tech Lead',
    bio: 'Specialist in AI, machine learning, and innovative tech solutions. Combines deep technical expertise with strategic business insight.',
    skills: ['AI/ML', 'Python', 'JavaScript', 'TensorFlow', 'Next.js'],
    experience: '8+ Years',
    location: 'Peshawar, Pakistan',
    socialLinks: { linkedin: '#', github: '#', email: 'mailto:abdul@actiondigitalinstitute.com' },
  },
  {
    id: '3',
    name: 'Jan Sher Khan',
    role: 'Event Manager & Coordinator',
    bio: 'Experienced event manager skilled in organizing corporate workshops and seminars. Ensures seamless coordination and exceptional attendee experiences.',
    skills: ['Event Planning', 'Coordination', 'Communication', 'Logistics'],
    experience: '3+ Years',
    location: 'Peshawar, Pakistan',
    socialLinks: { linkedin: '#', email: 'mailto:jan@actiondigitalinstitute.com' },
  },
  {
    id: '4',
    name: 'Hameed Khan',
    role: 'Public Relations Manager',
    bio: 'Experienced professional in public relations and communications. Builds strong relationships with clients, media, and stakeholders.',
    skills: ['Public Relations', 'Media Relations', 'Crisis Management', 'Brand Management'],
    experience: '10+ Years',
    location: 'Peshawar, Pakistan',
    socialLinks: { linkedin: '#', twitter: '#', email: 'mailto:hameed@actiondigitalinstitute.com' },
  },
  {
    id: '5',
    name: 'Amir Sohail',
    role: 'Content Strategist & Creator',
    bio: 'Creative content strategist with a passion for storytelling. Develops engaging content that resonates with target audiences and drives brand goals.',
    skills: ['Content Strategy', 'Video Editing', 'Social Media', 'Digital Marketing'],
    experience: '10+ Years',
    location: 'Swat, Pakistan',
    socialLinks: { linkedin: '#', twitter: '#', email: 'mailto:amir@actiondigitalinstitute.com' },
  },
];

const STATS = [
  { icon: Code,  value: '50+', label: 'Projects Completed' },
  { icon: Brain, value: '8+',  label: 'AI Solutions' },
  { icon: Zap,   value: '98%', label: 'Client Satisfaction' },
  { icon: Users, value: '15+', label: 'Team Members' },
];

function LinkedinIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function SocialButton({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-lg bg-white/6 border border-white/10 flex items-center justify-center text-[#8892A4] hover:text-[#EF7E2E] hover:border-[rgba(239,126,46,0.40)] transition-all duration-200"
    >
      {children}
    </a>
  );
}

export default function Team() {
  const founder    = MEMBERS.find((m) => m.isFounder)!;
  const otherMembers = MEMBERS.filter((m) => !m.isFounder);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section id="team" className="relative bg-[#090D1A] overflow-hidden">
      <AmbientBlob color="indigo" animation="two"   size="w-[500px] h-[500px]" className="-top-20 right-0 translate-x-1/3"  opacity={0.07} />
      <AmbientBlob color="orange" animation="three" size="w-[400px] h-[400px]" className="bottom-20 -left-20"               opacity={0.06} />

      {/* ── HERO ───────── */}
      <div className="relative py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <SectionHeading
              eyebrow="Our Experts"
              heading="Meet Our Team"
              subtext="Skilled professionals dedicated to delivering excellence in education, marketing, and AI."
            />
          </motion.div>
        </div>
      </div>

      {/* ── FOUNDER ────── */}
      <div className="relative bg-[#0E1426] py-16 px-4">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard glow="orange" padding="p-8">
              <div className="flex flex-col md:flex-row items-start gap-6">
                {/* Avatar */}
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#EF7E2E] to-[#F5A623] flex items-center justify-center text-white text-3xl font-bold">
                    {founder.name.charAt(0)}
                  </div>
                  <PillBadge variant="orange">Founder</PillBadge>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="font-heading font-bold text-[#F1F5FF] text-xl">{founder.name}</h3>
                      <p className="text-[#EF7E2E] text-sm font-medium">{founder.role}</p>
                    </div>
                    <PillBadge variant="glass">{founder.experience}</PillBadge>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#8892A4] mb-3">
                    <MapPin className="w-3 h-3" />
                    {founder.location}
                  </div>

                  <p className="text-[#8892A4] text-sm leading-relaxed mb-4">{founder.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {founder.skills.map((s) => (
                      <PillBadge key={s} variant="orange">{s}</PillBadge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {founder.socialLinks?.email    && <SocialButton href={founder.socialLinks.email!}    label={`Email ${founder.name}`}><Mail className="w-4 h-4" /></SocialButton>}
                    {founder.socialLinks?.linkedin && <SocialButton href={founder.socialLinks.linkedin!} label={`LinkedIn ${founder.name}`}><LinkedinIcon /></SocialButton>}
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* ── REST OF TEAM ─ */}
      <div className="relative py-16 px-4 bg-[#090D1A]">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {otherMembers.map((member, i) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <GlassCard hover padding="p-6" className="flex flex-col gap-4 cursor-pointer" onClick={() => setExpanded(expanded === member.id ? null : member.id)}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#818CF8] flex items-center justify-center text-white text-xl font-bold shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <h3 className="font-heading font-semibold text-[#F1F5FF] text-base">{member.name}</h3>
                          <p className="text-[#6366F1] text-sm">{member.role}</p>
                        </div>
                        <PillBadge variant="glass">{member.experience}</PillBadge>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-[#8892A4] mt-1">
                        <MapPin className="w-3 h-3" />
                        {member.location}
                      </div>
                    </div>
                  </div>

                  {/* Expandable bio */}
                  {expanded === member.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col gap-3"
                    >
                      <p className="text-[#8892A4] text-sm leading-relaxed">{member.bio}</p>
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((s) => (
                          <PillBadge key={s} variant="indigo">{s}</PillBadge>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-1">
                        {member.socialLinks?.email    && <SocialButton href={member.socialLinks.email!}    label={`Email ${member.name}`}><Mail className="w-4 h-4" /></SocialButton>}
                        {member.socialLinks?.linkedin && <SocialButton href={member.socialLinks.linkedin!} label={`LinkedIn ${member.name}`}><LinkedinIcon /></SocialButton>}
                        {member.socialLinks?.github   && <SocialButton href={member.socialLinks.github!}   label={`GitHub ${member.name}`}><GithubIcon /></SocialButton>}
                        {member.socialLinks?.twitter  && <SocialButton href={member.socialLinks.twitter!}  label={`Twitter ${member.name}`}><Twitter className="w-4 h-4" /></SocialButton>}
                      </div>
                    </motion.div>
                  )}

                  <p className="text-xs text-[#8892A4]">{expanded === member.id ? 'Click to collapse' : 'Click to expand'}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATS ────────── */}
      <div className="relative py-16 px-4 bg-[#0E1426]">
        <div className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard padding="p-6" className="text-center flex flex-col items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(239,126,46,0.12)] flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#EF7E2E]" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[#F1F5FF] text-2xl">{stat.value}</p>
                    <p className="text-[#8892A4] text-xs mt-0.5">{stat.label}</p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
