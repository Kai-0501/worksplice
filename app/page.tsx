import { AboutFounder } from "@/components/AboutFounder";
import { ContactCTA } from "@/components/ContactCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navigation } from "@/components/Navigation";
import { Principles } from "@/components/Principles";
import { WorkflowDemo } from "@/components/WorkflowDemo";
import { WorkflowExamples } from "@/components/WorkflowExamples";
import { getStructuredData } from "@/lib/site-config";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData()).replace(/</g, "\\u003c"),
        }}
      />
      <Navigation />
      <main id="main">
        <Hero />
        <WorkflowExamples />
        <WorkflowDemo />
        <HowItWorks />
        <Principles />
        <AboutFounder />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
