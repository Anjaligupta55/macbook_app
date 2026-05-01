import Hero from '@/components/Hero';
import ScrollAnimation from '@/components/ScrollAnimation';
import ChipSection from '@/components/ChipSection';
import DisplaySection from '@/components/DisplaySection';
import PerformanceSection from '@/components/PerformanceSection';
import ColorPicker from '@/components/ColorPicker';
import ConnectivitySection from '@/components/ConnectivitySection';
import BuySection from '@/components/BuySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white relative">
      <Hero />
      <ScrollAnimation />
      <ChipSection />
      <DisplaySection />
      <PerformanceSection />
      <ColorPicker />
      <ConnectivitySection />
      <BuySection />
      <Footer />
    </main>
  );
}
