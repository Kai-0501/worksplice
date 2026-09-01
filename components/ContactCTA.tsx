import { EmailLink, LinkedInLink } from "@/components/TrackedLink";
import { outlineCtaClass, primaryCtaClass } from "@/lib/cta-classes";
import { siteConfig } from "@/lib/site-config";

export function ContactCTA() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-b border-border"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Contact
        </p>
        <h2
          id="contact-heading"
          className="font-heading mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl"
        >
          Have a repetitive workflow? Show me.
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          If there is a process your team repeatedly copies, checks, updates or
          follows up manually, send it over. I can tell you whether it looks
          worth automating.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <EmailLink className={primaryCtaClass}>
            Email Alfred
          </EmailLink>
          <LinkedInLink className={outlineCtaClass}>LinkedIn</LinkedInLink>
        </div>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          {siteConfig.email} · {siteConfig.location}
        </p>
      </div>
    </section>
  );
}
