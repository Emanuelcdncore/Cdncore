import type { Metadata } from "next";
import EstagiosProfissionais from '@/components/EstagiosProfissionais';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Estágios Profissionais",
  description:
    "Explore professional internship opportunities at CDNCore. Launch your career in applied informatics, AI, and cutting-edge technology with our team.",
  alternates: { canonical: "/estagios-profissionais" },
};

export default function EstagiosProfissionaisPage() {
  return (
    <>
      <EstagiosProfissionais />
      <Footer />
    </>
  );
}
