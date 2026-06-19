import Cursor from "@/components/Cursor";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/Hero";
import TheLab from "@/components/TheLab";
import BuiltThese from "@/components/BuiltThese";
import ProofOfWork from "@/components/ProofOfWork";
import HowIWork from "@/components/HowIWork";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full relative selection:bg-neo-yellow selection:text-neo-black">
      <LoadingScreen />
      <Cursor />
      <Hero />
      <TheLab />
      <BuiltThese />
      <ProofOfWork />
      <HowIWork />
      <Contact />
      <Footer />
    </main>
  );
}
