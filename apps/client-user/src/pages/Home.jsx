import About from "../components/home/About";
import CTASection from "../components/home/CTASection";
import Hero from "../components/home/Hero";
import StatsSection from "../components/home/StatsSection";
import TimelineSection from "../components/home/TimelineSection";

const Home = () => (
  <div className="relative overflow-hidden">
    <div className="relative z-10">
      <Hero />
      <About />
      <StatsSection />
      <TimelineSection />
      <CTASection />
    </div>
  </div>
);

export default Home;
