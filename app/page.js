import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Channels from "@/components/Channels";
import Differentiator from "@/components/Differentiator";
import HowItWorks from "@/components/HowItWorks";
import Security from "@/components/Security";
import Industries from "@/components/Industries";
import Stats from "@/components/Stats";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Ticker />
      <Channels />
      <Differentiator />
      <HowItWorks />
      <Security />
      <Industries />
      <Stats />
      <CTA />
      <Footer />
    </main>
  );
}
