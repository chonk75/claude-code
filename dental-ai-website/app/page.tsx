import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import StatsBand from "@/components/sections/StatsBand";
import ProblemSolution from "@/components/sections/ProblemSolution";
import AgentTypes from "@/components/sections/AgentTypes";
import VoiceDemos from "@/components/sections/VoiceDemos";
import ChatDemos from "@/components/sections/ChatDemos";
import ROICalculator from "@/components/sections/ROICalculator";
import Pricing from "@/components/sections/Pricing";
import CTA from "@/components/sections/CTA";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { Phone } from "lucide-react";

export default function Home() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <StatsBand />
      <ProblemSolution />
      <AgentTypes />
      <VoiceDemos />
      <ChatDemos />

      {/* ROI teaser on the homepage — the full breakdown lives on /roi */}
      <Section
        id="roi"
        eyebrow="Your ROI"
        center
        title={
          <>
            See exactly what missed calls are{" "}
            <span className="text-gradient">costing you</span>
          </>
        }
        intro="Move the sliders. Most clinics are stunned by the number."
      >
        <div className="mt-12">
          <ROICalculator />
        </div>
        <div className="mt-10 text-center">
          <Button href="/roi" variant="outline" size="lg">
            <Phone className="h-4 w-4" />
            See the full savings breakdown
          </Button>
        </div>
      </Section>

      <Pricing />
      <CTA />
    </>
  );
}
