import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import StatsBand from "@/components/sections/StatsBand";
import ProblemSolution from "@/components/sections/ProblemSolution";
import ROICalculator from "@/components/sections/ROICalculator";
import AgentTypes from "@/components/sections/AgentTypes";
import VoiceDemos from "@/components/sections/VoiceDemos";
import ChatDemos from "@/components/sections/ChatDemos";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <StatsBand />
      <ProblemSolution />
      <ROICalculator />
      <AgentTypes />
      <VoiceDemos />
      <ChatDemos />
      <Pricing />
      <CTA />
    </>
  );
}
