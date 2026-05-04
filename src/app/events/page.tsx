import type { Metadata } from 'next';
import EventsContent from './EventsContent';

export const metadata: Metadata = {
  title: 'Events & Workshops',
  description:
    'Explore the workshops, corporate sessions, government awareness drives, and community events conducted by Action Digital Institute across Pakistan — from the Bank of Khyber to schools and universities in KPK.',
  alternates: { canonical: '/events' },
};

export default function EventsPage() {
  return <EventsContent />;
}
