import { EmailLink, TrackedLink } from "@/components/TrackedLink";
import { AnalyticsEvent } from "@/lib/analytics";
import { outlineCtaClass, primaryCtaClass } from "@/lib/cta-classes";
import { siteConfig } from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
      aria-labelledby="hero-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-70"
      />
      <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:py-32">
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            {siteConfig.location} · Workflow automation
          </p>
          <h1
            id="hero-heading"
            className="font-heading mt-5 max-w-3xl text-[2.35rem] leading-[1.12] tracking-tight text-foreground sm:text-5xl lg:text-[3.35rem]"
          >
            {siteConfig.tagline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Worksplice helps Singapore businesses automate selected parts of sales and
            operational admin — without replacing the people or systems already
            doing the work.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <TrackedLink
              href="#demo"
              event={AnalyticsEvent.HERO_CTA_CLICKED}
              className={primaryCtaClass}
            >
              See how it works
            </TrackedLink>
            <EmailLink className={outlineCtaClass}>
              Show me your workflow
            </EmailLink>
          </div>
        </div>

        <aside
          className="rounded-xl border border-border bg-card/90 p-5 shadow-sm sm:p-6"
          aria-label="Typical workflows"
        >
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted-foreground">
            Typical work
          </p>
          <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-foreground/90 sm:grid-cols-2">
            {siteConfig.typicalWork.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 rounded-md border border-transparent px-1 py-1"
              >
                <span
                  aria-hidden
                  className="size-1.5 shrink-0 rounded-full bg-primary"
                />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
