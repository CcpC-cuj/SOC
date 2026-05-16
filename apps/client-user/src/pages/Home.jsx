import MainLayout from "../layouts/MainLayout";

import Hero from "../components/home/HeroSection";
import About from "../components/home/About";
import Features from "../components/home/Features";
import Stats from "../components/home/HeroSection";
import Timeline from "../components/home/TimelineSection";
import CTA from "../components/home/CTASection";


function Home() {
  return (
    <>
     <MainLayout>

       <Hero />
      <About />
      <Features />
      <Stats />
      <Timeline />
      <CTA />

    </MainLayout>

    </>
  );
}

export default Home;