import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
// import Tracks from "../components/common/Tracks";
// import WorkflowSection from "../components/common/WorkflowSection";
// import Stats from "../components/common/Stats";
// import FAQ from "../components/common/FAQ";
// import CTABanner from "../components/common/CTABanner";
import SiteNav from "../components/common/SiteNav";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">

      <SiteNav />

      <Hero />

      <Features />
{/* 
      <Tracks />

      <WorkflowSection />

      <Stats />

      <FAQ />

      <CTABanner /> */}

    </div>
  );
}