import { TrackedLink } from "@/components/TrackedLink";
import {
  rfqIntakeCopy,
  rfqIntakeEnquiry,
  rfqIntakeFlags,
} from "@/data/demo-001-rfq-intake";
import { AnalyticsEvent } from "@/lib/analytics";
import { primaryCtaClass } from "@/lib/cta-classes";

export function WorkflowDemo() {
  return (
    <section
      id="demo"
      className="scroll-mt-24 border-b border-border"
      aria-labelledby="demo-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Interactive demonstration
        </p>
        <h2
          id="demo-heading"
          className="font-heading mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl"
        >
          See an incoming RFQ become a clean intake checklist.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          {rfqIntakeCopy.explanation} This preview is fictional. Open the demo
          to check the intake, review missing information, and decide what
          happens next.
        </p>

        <p className="mt-6 max-w-2xl rounded-lg border border-border bg-card px-4 py-3 text-sm leading-6 text-foreground">
          {rfqIntakeCopy.trust}
        </p>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Demonstration
              </span>
              <span className="text-sm text-foreground">
                {rfqIntakeCopy.heading}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {rfqIntakeCopy.fictional}
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <article className="min-w-0 px-4 py-5 sm:px-5">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Incoming customer RFQ
              </p>
              <p className="mt-3 text-sm font-medium">{rfqIntakeEnquiry.subject}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {rfqIntakeEnquiry.fromName}, {rfqIntakeEnquiry.company}
              </p>
              <div className="mt-4 rounded-lg border border-border bg-muted/50 p-4">
                <pre className="font-sans text-sm leading-6 whitespace-pre-wrap text-foreground">
                  {rfqIntakeEnquiry.body}
                </pre>
              </div>
            </article>

            <div className="flex min-w-0 flex-col justify-between gap-5 border-t border-border px-4 py-5 lg:border-t-0 lg:border-l sm:px-5">
              <div
                className="rounded-lg border border-amber-800/20 bg-amber-50/80 px-3 py-3 sm:px-4"
                aria-label="Needs clarification"
              >
                <h3 className="font-heading text-xl tracking-tight">
                  Needs clarification
                </h3>
                <ol className="mt-3 space-y-3">
                  {rfqIntakeFlags.map((flag, index) => (
                    <li key={flag.key}>
                      <p className="text-sm font-medium">
                        {index + 1}. {flag.title}
                      </p>
                      <p className="mt-1 text-sm leading-6 text-amber-900/90">
                        {flag.reason}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <p className="text-sm leading-6 text-muted-foreground">
                Worksplice prepares a clarification. A person still chooses
                Approve, Edit, or Discard.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-8">
          <TrackedLink
            href="/demo/rfq-intake"
            event={AnalyticsEvent.DEMO_TEASER_OPENED}
            className={primaryCtaClass}
          >
            Open RFQ intake demo
          </TrackedLink>
        </p>
      </div>
    </section>
  );
}
