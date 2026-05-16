// Home.jsx

import MainLayout from "../layouts/MainLayout";

import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Features from "../components/home/Features";
import StatsSection from "../components/home/StatsSection";
import TimelineSection from "../components/home/TimelineSection";
import CTASection from "../components/home/CTASection";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <StatsSection />
      <TimelineSection />
      <CTASection />
    </>
  );
};

export default Home;