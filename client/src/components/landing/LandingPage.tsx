import Navbar from "./Navbar";
import Hero from "./Hero";
import Features from "./Features";
import AIModels from "./AIModels";
import HowItWorks from "./HowItWorks";
import CTA from "./CTA";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <AIModels />
        <HowItWorks />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
