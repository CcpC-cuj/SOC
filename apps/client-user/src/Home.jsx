import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ProgramSection from "../components/ProgramSection";
import DomainsSection from "../components/DomainsSection";
import TimelineSection from "../components/TimelineSection";
import StatsSection from "../components/StatsSection";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-[#fbf8ff] overflow-x-hidden">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6">
        <HeroSection />
        <ProgramSection />
        <DomainsSection />
        <TimelineSection />
        <StatsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;