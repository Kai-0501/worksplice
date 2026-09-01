import { AboutAlfred } from "@/components/AboutAlfred";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navigation } from "@/components/Navigation";
import { Principles } from "@/components/Principles";
import { WorkflowDemo } from "@/components/WorkflowDemo";
import { WorkflowExamples } from "@/components/WorkflowExamples";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Hero />
        <WorkflowExamples />
        <WorkflowDemo />
        <HowItWorks />
        <Principles />
        <AboutAlfred />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
