import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { siteConfig } from "@/lib/site-config";

const lastUpdated = "29 October 2026";

export const metadata: Metadata = {
  title: `Privacy Policy | ${siteConfig.name}`,
  description: `How ${siteConfig.name} and its internal tools handle personal data.`,
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    heading: "Who we are",
    body: [
      `${siteConfig.name} is an early-stage workflow automation studio in ${siteConfig.location}, run by ${siteConfig.founder}. This policy covers this website and the internal tools listed below.`,
    ],
  },
  {
    heading: "This website",
    body: [
      "This website has no forms, accounts or sign-in. It does not set advertising or tracking cookies.",
      "If you email or message us, we use your details only to reply to you and keep a record of the conversation. We do not sell or share them.",
    ],
  },
  {
    heading: "Kai Agent (internal assistant)",
    body: [
      "Kai Agent is a private assistant used only by the founder. It is not offered to the public.",
      "With the founder's permission through Google sign-in, Kai Agent reads and creates events on the founder's own Google Calendar, for example turning a forwarded event invitation into a calendar entry.",
      "Google access tokens are stored only on the founder's own computer. Calendar data is used only to carry out the founder's requests, is not sold, is not shared with third parties, and is not used for advertising or to train AI models.",
      "Kai Agent's use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
      "Access can be revoked at any time from the Google Account's Third-party apps & services page.",
    ],
  },
  {
    heading: "Contact",
    body: [
      `Questions about this policy: ${siteConfig.founderEmail}.`,
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main id="main">
        <section className="mx-auto w-full max-w-3xl px-5 py-20 sm:px-8">
          <h1 className="font-heading text-3xl tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Last updated {lastUpdated}
          </p>
          {sections.map((section) => (
            <div key={section.heading} className="mt-10">
              <h2 className="font-heading text-xl tracking-tight">
                {section.heading}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 text-base leading-7 text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
