import type { Metadata } from 'next';
import ServicesPage from '@/components/ServicesPage';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Explore CDNCore\'s full range of services: cybersecurity, enterprise AI & automation, big data analytics, advanced R&D, and expert consulting by Dr. Mehran Pourvahab.',
  alternates: { canonical: '/services' },
};

export default function Services() {
  return <ServicesPage />;
}
