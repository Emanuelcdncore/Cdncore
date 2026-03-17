import Hero from '@/components/Hero';
import IntroSection from '@/components/IntroSection';
import Capabilities from '@/components/Capabilities';
import RoboticsSection from '@/components/RoboticsSection';
import HowWeWork from '@/components/HowWeWork';
import OurWork from '@/components/OurWork';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <Capabilities />
      <RoboticsSection />
      <HowWeWork />
      <OurWork />
      <FAQ />
      <CTA />
      <Footer />
    </>
  );
}
