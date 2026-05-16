// Home.jsx

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import NeuralBackground from "../components/common/NeuralBackground";

import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Features from "../components/home/Features";
import StatsSection from "../components/home/StatsSection";
import TimelineSection from "../components/home/TimelineSection";
import CTASection from "../components/home/CTASection";

const Home = () => {
  return (
    <div className="relative overflow-hidden bg-[#050816] text-white">
      <NeuralBackground />

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <About />
        <Features />
        <StatsSection />
        <TimelineSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Home;