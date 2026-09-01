"use client";

import { useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
  rfqDemoEnquiry,
  rfqDemoOutputFields,
  rfqDemoStages,
} from "@/data/rfq-demo";
import { AnalyticsEvent, track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type DemoStatus = "idle" | "running" | "complete";

const STAGE_MS = 850;
const COMPLETE_MS = 500;

function prefersReducedMotion(): boolean {
  if (typeof window.matchMedia !== "function") {
    return false;
  }

  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function WorkflowDemo() {
  const [status, setStatus] = useState<DemoStatus>("idle");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (status !== "running") return;

    if (stage >= rfqDemoStages.length) {
      const done = window.setTimeout(() => {
        setStatus("complete");
        track(AnalyticsEvent.WORKFLOW_DEMO_COMPLETED);
      }, COMPLETE_MS);
      return () => window.clearTimeout(done);
    }

    const tick = window.setTimeout(() => {
      setStage((current) => Math.min(current + 1, rfqDemoStages.length));
    }, STAGE_MS);

    return () => window.clearTimeout(tick);
  }, [status, stage]);

  function runWorkflow() {
    if (status === "running") return;
    track(AnalyticsEvent.WORKFLOW_DEMO_STARTED);

    if (prefersReducedMotion()) {
      setStage(rfqDemoStages.length);
      setStatus("complete");
      track(AnalyticsEvent.WORKFLOW_DEMO_COMPLETED);
      return;
    }

    setStage(1);
    setStatus("running");
  }

  const liveMessage =
    status === "running"
      ? `Workflow running: ${rfqDemoStages[Math.max(stage - 1, 0)]?.label ?? ""}`
      : status === "complete"
        ? "Demonstration complete. Structured quotation record is ready for salesperson review."
        : "Demonstration idle. Incoming enquiry is ready to process.";

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
          Watch an RFQ become a structured quotation record.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          This is a simulated enquiry, not a live AI call and not a real
          customer. It shows the shape of the work: read the incoming request,
          extract what is known, flag what is missing, and hand a clean record
          to a salesperson.
        </p>
        <noscript>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground">
            The interactive demo needs JavaScript in the browser. Enable it to
            run the RFQ workflow.
          </p>
        </noscript>

        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
                Demonstration
              </span>
              <span className="text-sm text-foreground">RFQ intake</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Pricing and final approval remain with staff.
            </p>
          </div>

          <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <IncomingEnquiry />

            <div className="flex min-w-0 flex-col border-t border-border lg:border-t-0 lg:border-l">
              <div className="border-b border-border px-4 py-4 sm:px-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-sm font-medium">Workflow</h3>
                  <div className="flex gap-2">
                    <button
                      id="run-workflow"
                      type="button"
                      onClick={runWorkflow}
                      disabled={status === "running"}
                      aria-busy={status === "running"}
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "h-10 px-4",
                      )}
                    >
                      {status === "running"
                        ? "Running…"
                        : status === "complete"
                          ? "Run again"
                          : "Run workflow"}
                    </button>
                  </div>
                </div>

                <ol className="mt-4 space-y-2">
                  {rfqDemoStages.map((item) => {
                    const complete = stage > item.id;
                    const current = status === "running" && stage === item.id;
                    return (
                      <li
                        key={item.id}
                        aria-current={current ? "step" : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border px-3 py-2 text-sm transition-colors",
                          current
                            ? "demo-scan border-primary/30 bg-primary/5 text-foreground"
                            : complete || status === "complete"
                              ? "border-border bg-muted/60 text-foreground"
                              : "border-transparent text-muted-foreground",
                        )}
                      >
                        <span
                          className={cn(
                            "flex size-6 shrink-0 items-center justify-center rounded-full border font-mono text-[0.65rem]",
                            current
                              ? "border-primary bg-primary text-primary-foreground"
                              : complete || status === "complete"
                                ? "border-primary/40 bg-primary/10 text-primary"
                                : "border-border",
                          )}
                          aria-hidden
                        >
                          {complete || status === "complete" ? "✓" : item.id}
                        </span>
                        <span>{item.label}</span>
                        {current ? (
                          <span className="ml-auto hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-primary sm:inline">
                            In progress
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </div>

              <OutputPanel stage={stage} status={status} />
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite">
          {liveMessage}
        </p>
      </div>
    </section>
  );
}

function IncomingEnquiry() {
  return (
    <article className="min-w-0 px-4 py-5 sm:px-5">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
        Incoming enquiry
      </p>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
          <dt className="text-muted-foreground">From</dt>
          <dd className="min-w-0 break-words">
            {rfqDemoEnquiry.fromName}{" "}
            <span className="text-muted-foreground">
              &lt;{rfqDemoEnquiry.fromEmail}&gt;
            </span>
          </dd>
        </div>
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
          <dt className="text-muted-foreground">Company</dt>
          <dd className="min-w-0 break-words">{rfqDemoEnquiry.company}</dd>
        </div>
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
          <dt className="text-muted-foreground">Subject</dt>
          <dd className="min-w-0 break-words font-medium">
            {rfqDemoEnquiry.subject}
          </dd>
        </div>
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
          <dt className="text-muted-foreground">Received</dt>
          <dd>{rfqDemoEnquiry.receivedAt}</dd>
        </div>
      </dl>
      <div className="mt-5 rounded-lg border border-border bg-muted/50 p-4">
        <pre className="font-sans text-sm leading-6 whitespace-pre-wrap text-foreground">
          {rfqDemoEnquiry.body}
        </pre>
      </div>
    </article>
  );
}

function OutputPanel({
  stage,
  status,
}: {
  stage: number;
  status: DemoStatus;
}) {
  const hasOutput = stage >= 2;

  return (
    <div className="flex flex-1 flex-col px-4 py-4 sm:px-5">
      <h3 className="text-sm font-medium">Structured quotation record</h3>
      {!hasOutput ? (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Run the workflow to extract fields from the enquiry. No pricing is
          generated.
        </p>
      ) : (
        <dl className="mt-3 divide-y divide-border rounded-lg border border-border">
          {rfqDemoOutputFields.map((field) => {
            const visible = stage >= field.revealAtStage;
            const checked = stage >= 3 && visible && !field.missing;
            const flagged = stage >= 4 && field.missing;
            return (
              <div
                key={field.key}
                className={cn(
                  "grid gap-1 px-3 py-2.5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4",
                  flagged && "bg-amber-50/80",
                )}
              >
                <dt className="font-mono text-[0.7rem] tracking-wide text-muted-foreground uppercase">
                  {field.label}
                </dt>
                <dd className="min-w-0 text-sm break-words">
                  {visible ? (
                    <span className="inline-flex flex-wrap items-baseline gap-2">
                      <span>{field.value}</span>
                      {checked ? (
                        <span className="font-mono text-[0.65rem] text-primary">
                          checked
                        </span>
                      ) : null}
                      {flagged ? (
                        <span className="font-mono text-[0.65rem] text-amber-800">
                          needs follow-up
                        </span>
                      ) : null}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Pending</span>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      )}
      {status === "complete" ? (
        <p className="mt-4 rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-sm leading-6 text-foreground">
          Ready for salesperson review. Quantity, specification and missing
          items are prepared; commercial terms are not filled in.
        </p>
      ) : null}
    </div>
  );
}
