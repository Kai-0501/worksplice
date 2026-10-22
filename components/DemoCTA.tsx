import {
  CompanyLinkedInLink,
  EmailLink,
  WhatsAppLink,
} from "@/components/TrackedLink";
import { outlineCtaClass, primaryCtaClass } from "@/lib/cta-classes";
import { siteConfig } from "@/lib/site-config";

export function DemoCTA() {
  return (
    <section
      id="demo-next-step"
      className="border-t border-border"
      aria-labelledby="demo-next-step-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Next step
        </p>
        <h2
          id="demo-next-step-heading"
          className="font-heading mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl"
        >
          Does your team handle RFQs like this?
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
          Send me one RFQ with customer names and prices removed. Within{" "}
          {siteConfig.teardownDays} working days I will send back the intake
          checklist, what is missing, and a draft clarification. Free.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <EmailLink
            subject={siteConfig.teardownSubject}
            className={primaryCtaClass}
          >
            Send me an RFQ
          </EmailLink>
          <WhatsAppLink className={outlineCtaClass}>WhatsApp me</WhatsAppLink>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Or{" "}
          <CompanyLinkedInLink className="underline underline-offset-4 hover:text-foreground">
            follow {siteConfig.name} on LinkedIn
          </CompanyLinkedInLink>
          .
        </p>
      </div>
    </section>
  );
}
