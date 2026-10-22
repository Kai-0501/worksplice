import {
  EmailLink,
  WhatsAppLink,
} from "@/components/TrackedLink";
import { outlineCtaClass, primaryCtaClass } from "@/lib/cta-classes";
import { siteConfig } from "@/lib/site-config";

const pilotIncludes = [
  "One RFQ intake workflow",
  "A person approves everything before it reaches a customer",
  "Built around your existing inbox and tools; your ERP stays the system of record",
  "Continues only if it saves your team real time",
] as const;

export function PilotOffer() {
  return (
    <section
      id="pilot"
      className="scroll-mt-24 border-b border-border"
      aria-labelledby="pilot-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Pilot
        </p>
        <h2
          id="pilot-heading"
          className="font-heading mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl"
        >
          One workflow. One fixed price.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          The first engagement is a small pilot, not a long programme. You see
          it working on your own enquiries before deciding on anything more.
        </p>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              RFQ intake pilot
            </p>
            <p className="font-heading mt-3 text-4xl tracking-tight">
              {siteConfig.pilotPrice}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              One-off, fixed price
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-foreground/90">
              {pilotIncludes.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              Not ready for a pilot?
            </p>
            <h3 className="font-heading mt-3 text-2xl tracking-tight">
              Free RFQ teardown
            </h3>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Send me one RFQ with customer names and prices removed. Within{" "}
              {siteConfig.teardownDays} working days you get the intake
              checklist back: the fields pulled out, what is missing, and a
              draft clarification for your review.
            </p>
            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:items-center">
              <EmailLink
                subject={siteConfig.teardownSubject}
                className={primaryCtaClass}
              >
                Send me an RFQ
              </EmailLink>
              <WhatsAppLink className={outlineCtaClass}>WhatsApp me</WhatsAppLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
