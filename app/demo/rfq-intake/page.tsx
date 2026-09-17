import type { Metadata } from "next";
import { Suspense } from "react";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import {
  RfqIntakeDemo,
  RfqIntakeDemoFallback,
} from "@/components/demo/RfqIntakeDemo";
import { rfqIntakeCopy } from "@/data/demo-001-rfq-intake";
import { siteConfig } from "@/lib/site-config";

const demoDescription =
  "Worksplice turns an incoming RFQ into a clean intake checklist, highlights missing information, and prepares a clarification draft for human review.";

export const metadata: Metadata = {
  title: `${rfqIntakeCopy.heading} | ${siteConfig.name}`,
  description: demoDescription,
  alternates: {
    canonical: "/demo/rfq-intake",
  },
  openGraph: {
    title: rfqIntakeCopy.heading,
    description: demoDescription,
    url: `${siteConfig.domain}/demo/rfq-intake`,
    siteName: siteConfig.name,
    locale: "en_SG",
    type: "website",
  },
};

export default function RfqIntakeDemoPage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Suspense fallback={<RfqIntakeDemoFallback />}>
          <RfqIntakeDemo />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
