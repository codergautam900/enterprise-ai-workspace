import Navbar from "./Navbar";
import Hero from "./Hero";
import ProblemSection from "./ProblemSection";
import SolutionSection from "./SolutionSection";
import Features from "./Features";
import HowItWorks from "./HowItWorks";
import SecuritySection from "./SecuritySection";
import TrustSection from "./TrustSection";
import CTA from "./CTA";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <Features />
        <HowItWorks />
        <SecuritySection />
        <TrustSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
