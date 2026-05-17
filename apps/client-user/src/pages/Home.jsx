// Home.jsx

import MainLayout from "../layouts/MainLayout";

import Hero from "../components/home/Hero";
import About from "../components/home/About";

import StatsSection from "../components/home/StatsSection";
import TimelineSection from "../components/home/TimelineSection";
import CTASection from "../components/home/CTASection";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <StatsSection />
      <TimelineSection />
      <CTASection />
    </>
  );
};

export default Home;