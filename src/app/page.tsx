import GlobalProgress from '@/components/GlobalProgress';
import Hero from '@/components/Hero';
import ScrollAnimation from '@/components/ScrollAnimation';
import M3DeepDive from '@/components/M3DeepDive';
import PerformanceSection from '@/components/PerformanceSection';
import MemoryBandwidth from '@/components/MemoryBandwidth';
import BatteryRace from '@/components/BatteryRace';
import DisplaySection from '@/components/DisplaySection';
import DisplayShowcase from '@/components/DisplayShowcase';
import CameraAudio from '@/components/CameraAudio';
import ConnectivitySection from '@/components/ConnectivitySection';
import Ecosystem from '@/components/Ecosystem';
import Environment from '@/components/Environment';
import ColorStage from '@/components/ColorStage';
import BuySection from '@/components/BuySection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-black min-h-screen text-white relative">
      <GlobalProgress />
      <Hero />
      <ScrollAnimation />
      <M3DeepDive />
      <PerformanceSection />
      <MemoryBandwidth />
      <BatteryRace />
      <DisplaySection />
      <DisplayShowcase />
      <CameraAudio />
      <ConnectivitySection />
      <Ecosystem />
      <Environment />
      <ColorStage />
      <BuySection />
      <Footer />
    </main>
  );
}
