import { isSafeEmail, requireEmail, requireHttpsUrl } from "@/lib/safe-url";

export const siteConfig = {
  name: "Worksplice",
  founder: "Alfred",
  tagline: "Small AI automations for repetitive B2B workflows.",
  description:
    "Worksplice builds small AI workflow automations that reduce repetitive sales and operational admin for Singapore B2B teams.",
  location: "Singapore",
  email: requireEmail("lingkaiteng@gmail.com", "siteConfig.email"),
  linkedin: requireHttpsUrl(
    "https://www.linkedin.com/in/alfred-ling-5a9880200",
    "siteConfig.linkedin",
  ),
  github: requireHttpsUrl("https://github.com/Kai-0501", "siteConfig.github"),
  domain: requireHttpsUrl("https://worksplice.site", "siteConfig.domain"),
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
  { href: "#examples", label: "Examples" },
  { href: "#demo", label: "Demo" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

export function getMailtoHref(subject: string = siteConfig.emailSubject): string {
  if (!isSafeEmail(siteConfig.email) || /[\r\n]/.test(subject)) {
    return "#contact";
  }

  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}
