import type { Metadata } from "next";
import CommitmentsPage from '@/components/CommitmentsPage';

export const metadata: Metadata = {
  title: "Our Commitments",
  description:
    "Discover CDNCore's core values and commitments. We are dedicated to innovation, quality, and delivering impactful technology solutions for our clients and community.",
  alternates: { canonical: "/commitments" },
};

export default function Commitments() {
  return <CommitmentsPage />;
}
