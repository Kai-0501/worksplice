import { isSafeEmail, requireEmail, requireHttpsUrl } from "@/lib/safe-url";

export const siteConfig = {
  name: "Worksplice",
  founder: "Alfred Ling",
  founderLegalName: "Ling Kai Teng Alfred",
  founderNickname: "Kai",
  tagline: "Small AI automations for repetitive B2B workflows.",
  description:
    "Bootstrapped Singapore startup, founded 2026. Worksplice builds small AI workflow automations for repetitive B2B sales and operations admin.",
  location: "Singapore",
  founded: 2026,
  // Sales / outreach mailbox. Used by the public "Email" call-to-action links.
  email: requireEmail("alfredling@worksplice.site", "siteConfig.email"),
  // Founder / startup-program enquiries.
  founderEmail: requireEmail("kai@worksplice.site", "siteConfig.founderEmail"),
  linkedin: requireHttpsUrl(
    "https://sg.linkedin.com/in/alfred-ling-5a9880200",
    "siteConfig.linkedin",
  ),
  github: requireHttpsUrl("https://github.com/Kai-0501", "siteConfig.github"),
  githubRepo: requireHttpsUrl(
    "https://github.com/Kai-0501/worksplice",
    "siteConfig.githubRepo",
  ),
  domain: requireHttpsUrl("https://www.worksplice.site", "siteConfig.domain"),
  emailSubject: "Workflow automation idea",
  typicalWork: [
    "RFQ intake",
    "Quotation preparation",
    "CRM data prep",
    "Lead qualification",
    "Follow-up tracking",
    "Tender monitoring",
    "Document extraction",
    "Status summaries",
  ],
} as const;

export const navItems = [
  { href: "/#examples", label: "Examples" },
  { href: "/demo/rfq-intake", label: "Demo" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
] as const;

export function getMailtoHref(subject: string = siteConfig.emailSubject): string {
  if (!isSafeEmail(siteConfig.email) || /[\r\n]/.test(subject)) {
    return "#contact";
  }

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}

export const homeTitle = "Worksplice | B2B Workflow Automation for Singapore Teams (Founded 2026)";

/**
 * Schema.org JSON-LD linking the company, founder, email and profiles.
 * Keep this limited to facts stated on the page. No incorporation, customer,
 * revenue or funding claims.
 */
export function getStructuredData() {
  const personId = `${siteConfig.domain}/#founder`;
  const orgId = `${siteConfig.domain}/#organization`;
  const profiles = [siteConfig.linkedin, siteConfig.github];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        url: siteConfig.domain,
        description: siteConfig.description,
        foundingDate: String(siteConfig.founded),
        email: `mailto:${siteConfig.founderEmail}`,
        foundingLocation: {
          "@type": "Place",
          name: siteConfig.location,
          address: { "@type": "PostalAddress", addressCountry: "SG" },
        },
        areaServed: { "@type": "Country", name: siteConfig.location },
        founder: { "@id": personId },
        sameAs: [...profiles, siteConfig.githubRepo],
      },
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.founder,
        alternateName: [siteConfig.founderLegalName, siteConfig.founderNickname],
        jobTitle: "Founder",
        email: `mailto:${siteConfig.founderEmail}`,
        url: siteConfig.linkedin,
        worksFor: { "@id": orgId },
        sameAs: profiles,
      },
    ],
  };
}
