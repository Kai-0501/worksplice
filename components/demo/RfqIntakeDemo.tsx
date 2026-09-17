"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  rfqIntakeCopy,
  rfqIntakeEnquiry,
  rfqIntakeFields,
  rfqIntakeFlags,
} from "@/data/demo-001-rfq-intake";
import { AnalyticsEvent, track } from "@/lib/analytics";
import { outlineCtaClass, primaryCtaClass } from "@/lib/cta-classes";
import {
  DEMO_TEST_IDS,
  DEMO_TIMING_MS,
  type DemoSnapshot,
  createInitialSnapshot,
  parseDemoStep,
  parsePlay,
  parseRecord,
  reduceDemo,
  snapshotFromStep,
  shouldShowChecklist,
  shouldShowDraft,
  shouldShowFlags,
} from "@/lib/demo/rfq-intake-state";
import { cn } from "@/lib/utils";

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

function liveMessage(snapshot: DemoSnapshot): string {
  switch (snapshot.state) {
    case "idle":
      return "Incoming RFQ is ready. Press Check RFQ to structure the intake.";
    case "checking":
      return "Structuring the intake checklist.";
    case "flags":
      return "Two items need clarification: required delivery date and material certification.";
    case "draft":
      return "Clarification draft is ready for human review. Choose Approve, Edit, or Discard.";
    case "editing":
      return "Editing the clarification draft. Save to return to review, or the draft stays local.";
    case "discarded":
      return rfqIntakeCopy.discarded;
    case "approved":
      return rfqIntakeCopy.approved;
    default: {
      const _exhaustive: never = snapshot.state;
      return _exhaustive;
    }
  }
}

export function RfqIntakeDemoFallback() {
  return <RfqIntakeDemoView snapshot={createInitialSnapshot()} />;
}

export function RfqIntakeDemo() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const stepParam = parseDemoStep(searchParams.get("step"));
  const play = parsePlay(searchParams.get("play"));
  const record = parseRecord(searchParams.get("demo"));
  const reduceMotion = record ? false : prefersReducedMotion();

  const [snapshot, setSnapshot] = useState<DemoSnapshot>(() =>
    stepParam ? snapshotFromStep(stepParam) : createInitialSnapshot(),
  );
  const [autoAdvance, setAutoAdvance] = useState(() => play && stepParam === null);
  const [editText, setEditText] = useState(snapshot.draftText);

  function dispatch(action: Parameters<typeof reduceDemo>[1]) {
    setSnapshot((current) => reduceDemo(current, action));
  }

  useEffect(() => {
    if (!autoAdvance || !play || snapshot.state !== "idle") {
      return;
    }

    const delay = reduceMotion ? 0 : DEMO_TIMING_MS.playIdle;
    const timer = window.setTimeout(() => {
      dispatch({ type: "check" });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, play, reduceMotion, snapshot.state]);

  useEffect(() => {
    if (!autoAdvance || snapshot.state !== "checking") {
      return;
    }

    const delay = reduceMotion ? 0 : DEMO_TIMING_MS.checking;
    const timer = window.setTimeout(() => {
      dispatch({ type: "showFlags" });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, reduceMotion, snapshot.state]);

  useEffect(() => {
    if (!autoAdvance || snapshot.state !== "flags") {
      return;
    }

    const delay = reduceMotion
      ? 0
      : play
        ? DEMO_TIMING_MS.playFlags
        : DEMO_TIMING_MS.flagsHoldInteractive;
    const timer = window.setTimeout(() => {
      dispatch({ type: "showDraft" });
    }, delay);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, play, reduceMotion, snapshot.state]);

  useEffect(() => {
    if (!autoAdvance || !play || snapshot.state !== "draft") {
      return;
    }

    const delay = reduceMotion ? 0 : DEMO_TIMING_MS.playDraft;
    const timer = window.setTimeout(() => {
      dispatch({ type: "approve" });
      track(AnalyticsEvent.RFQ_INTAKE_DEMO_APPROVED);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [autoAdvance, play, reduceMotion, snapshot.state]);

  function handleCheck() {
    if (snapshot.state !== "idle") {
      return;
    }

    track(AnalyticsEvent.RFQ_INTAKE_DEMO_STARTED);
    setAutoAdvance(true);
    dispatch({ type: "check" });
  }

  function handleReset() {
    setAutoAdvance(false);
    setEditText(createInitialSnapshot().draftText);
    dispatch({ type: "reset" });
    router.replace(pathname, { scroll: false });
  }

  function handleApprove() {
    dispatch({ type: "approve" });
    track(AnalyticsEvent.RFQ_INTAKE_DEMO_APPROVED);
  }

  function handleEdit() {
    setEditText(snapshot.draftText);
    dispatch({ type: "edit" });
  }

  function handleSaveEdit() {
    dispatch({ type: "saveEdit", text: editText });
  }

  function handleDiscard() {
    dispatch({ type: "discard" });
  }

  return (
    <RfqIntakeDemoView
      snapshot={snapshot}
      editText={editText}
      onEditTextChange={setEditText}
      onCheck={handleCheck}
      onReset={handleReset}
      onApprove={handleApprove}
      onEdit={handleEdit}
      onSaveEdit={handleSaveEdit}
      onDiscard={handleDiscard}
    />
  );
}

function RfqIntakeDemoView({
  snapshot,
  editText = snapshot.draftText,
  onEditTextChange,
  onCheck,
  onReset,
  onApprove,
  onEdit,
  onSaveEdit,
  onDiscard,
}: {
  snapshot: DemoSnapshot;
  editText?: string;
  onEditTextChange?: (value: string) => void;
  onCheck?: () => void;
  onReset?: () => void;
  onApprove?: () => void;
  onEdit?: () => void;
  onSaveEdit?: () => void;
  onDiscard?: () => void;
}) {
  const idle = snapshot.state === "idle";
  const showChecklist = shouldShowChecklist(snapshot.state);
  const showFlags = shouldShowFlags(snapshot.state);
  const showDraftPanel = shouldShowDraft(snapshot.state);
  const showActions = snapshot.state === "draft";
  const showFinal =
    snapshot.state === "approved" || snapshot.state === "discarded";

  return (
    <div
      data-testid={DEMO_TEST_IDS.root}
      data-demo-state={snapshot.state}
      className="mx-auto w-full max-w-6xl px-5 py-4 sm:px-8 sm:py-5"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 max-w-3xl">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            {rfqIntakeCopy.eyebrow}
          </p>
          <h1 className="font-heading mt-1.5 text-3xl tracking-tight sm:text-[2.15rem]">
            {rfqIntakeCopy.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            {rfqIntakeCopy.explanation}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            data-testid={DEMO_TEST_IDS.checkRfq}
            onClick={onCheck}
            disabled={!idle}
            className={primaryCtaClass}
          >
            {rfqIntakeCopy.checkCta}
          </button>
          <button
            type="button"
            data-testid={DEMO_TEST_IDS.reset}
            onClick={onReset}
            disabled={idle}
            className={outlineCtaClass}
          >
            {rfqIntakeCopy.resetCta}
          </button>
        </div>
      </div>

      <p className="mt-3 rounded-lg border border-border bg-card px-3 py-2 text-sm leading-6 text-foreground sm:px-4">
        {rfqIntakeCopy.trust}
      </p>

      <div className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              Demonstration
            </span>
            <span className="text-sm text-foreground">RFQ intake</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {rfqIntakeCopy.fictional}
          </p>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <IncomingEnquiry />

          <section
            className="flex min-w-0 flex-col border-t border-border lg:border-t-0 lg:border-l"
            aria-label="Intake review"
          >
            <div
              className={cn(
                "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-3 sm:px-5",
                snapshot.state === "checking" && "demo-scan",
              )}
            >
              {idle ? (
                <p className="text-sm leading-6 text-muted-foreground">
                  Press Check RFQ to structure the intake. Extracted fields stay
                  in the background. Missing information and the human decision
                  are the point of the work.
                </p>
              ) : null}

              {showChecklist ? (
                <IntakeChecklist checking={snapshot.state === "checking"} />
              ) : null}

              {showFlags ? <MissingInformation /> : null}

              {showDraftPanel ? (
                <ClarificationDraft
                  snapshot={snapshot}
                  editText={editText}
                  onEditTextChange={onEditTextChange}
                  onSaveEdit={onSaveEdit}
                />
              ) : null}

              {showActions ? (
                <div className="flex flex-col gap-2">
                  <p className="text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                    {rfqIntakeCopy.humanGate}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      data-testid={DEMO_TEST_IDS.approve}
                      onClick={onApprove}
                      className={cn(primaryCtaClass, "h-10")}
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      data-testid={DEMO_TEST_IDS.edit}
                      onClick={onEdit}
                      className={cn(outlineCtaClass, "h-10")}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      data-testid={DEMO_TEST_IDS.discard}
                      onClick={onDiscard}
                      className={cn(outlineCtaClass, "h-10")}
                    >
                      Discard
                    </button>
                  </div>
                </div>
              ) : null}

              {snapshot.state === "editing" ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={onSaveEdit}
                    className={primaryCtaClass}
                  >
                    Save draft
                  </button>
                  <p className="self-center text-xs text-muted-foreground">
                    The draft stays on this page until a human approves it.
                  </p>
                </div>
              ) : null}

              {showFinal ? <FinalStatus snapshot={snapshot} /> : null}
            </div>
          </section>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {liveMessage(snapshot)}
      </p>
    </div>
  );
}

function IncomingEnquiry() {
  return (
    <article className="min-w-0 px-4 py-4 sm:px-5">
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
        Incoming customer RFQ
      </p>
      <dl className="mt-4 space-y-2 text-sm">
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
          <dt className="text-muted-foreground">From</dt>
          <dd className="min-w-0 break-words">{rfqIntakeEnquiry.fromName}</dd>
        </div>
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
          <dt className="text-muted-foreground">Company</dt>
          <dd className="min-w-0 break-words">{rfqIntakeEnquiry.company}</dd>
        </div>
        <div className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-2 sm:grid-cols-[6.5rem_minmax(0,1fr)]">
          <dt className="text-muted-foreground">Subject</dt>
          <dd className="min-w-0 break-words font-medium">
            {rfqIntakeEnquiry.subject}
          </dd>
        </div>
      </dl>
      <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3 sm:p-4">
        <pre className="font-sans text-sm leading-6 whitespace-pre-wrap text-foreground">
          {rfqIntakeEnquiry.body}
        </pre>
      </div>
    </article>
  );
}

function IntakeChecklist({ checking }: { checking: boolean }) {
  return (
    <div>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
        Intake checklist
      </p>
      <dl className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-1 text-xs leading-5 sm:grid-cols-4">
        {rfqIntakeFields.map((field) => (
          <div key={field.key} className="min-w-0">
            <dt className="font-mono text-[0.65rem] tracking-wide text-muted-foreground uppercase">
              {field.label}
            </dt>
            <dd className="truncate text-foreground/85">{field.value}</dd>
          </div>
        ))}
      </dl>
      {checking ? (
        <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-primary">
          Structuring intake
        </p>
      ) : null}
    </div>
  );
}

function MissingInformation() {
  return (
    <div
      data-testid={DEMO_TEST_IDS.missing}
      className="rounded-lg border border-amber-800/20 bg-amber-50/80 px-3 py-2.5 sm:px-4"
    >
      <h2 className="font-heading text-lg tracking-tight text-foreground">
        Needs clarification
      </h2>
      <ol className="mt-2 space-y-2">
        {rfqIntakeFlags.map((flag, index) => (
          <li key={flag.key}>
            <p className="text-sm font-medium text-foreground">
              {index + 1}. {flag.title}
            </p>
            <p className="mt-0.5 text-sm leading-5 text-amber-900/90">
              {flag.reason}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ClarificationDraft({
  snapshot,
  editText,
  onEditTextChange,
  onSaveEdit,
}: {
  snapshot: DemoSnapshot;
  editText: string;
  onEditTextChange?: (value: string) => void;
  onSaveEdit?: () => void;
}) {
  const editing = snapshot.state === "editing";

  return (
    <div data-testid={DEMO_TEST_IDS.draft}>
      <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
        {rfqIntakeCopy.draftLabel}
      </p>
      {editing ? (
        <label className="mt-2 block">
          <span className="sr-only">{rfqIntakeCopy.draftLabel}</span>
          <textarea
            value={editText}
            onChange={(event) => onEditTextChange?.(event.target.value)}
            rows={4}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm leading-6 text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        </label>
      ) : (
        <p className="mt-1.5 rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm leading-5 text-foreground">
          {snapshot.draftText}
        </p>
      )}
      {editing && onSaveEdit ? (
        <span className="sr-only">Save draft is available below.</span>
      ) : null}
    </div>
  );
}

function FinalStatus({ snapshot }: { snapshot: DemoSnapshot }) {
  const approved = snapshot.state === "approved";

  return (
    <div
      data-testid={DEMO_TEST_IDS.final}
      className="rounded-lg border border-primary/20 bg-primary/5 px-3 py-2.5 text-sm leading-5 text-foreground"
    >
      <p className="font-medium">
        {approved ? rfqIntakeCopy.approved : rfqIntakeCopy.discarded}
      </p>
      {approved ? (
        <>
          <p className="mt-1.5 text-muted-foreground">{rfqIntakeCopy.pilot}</p>
          <p className="text-muted-foreground">{rfqIntakeCopy.pilotExtra}</p>
        </>
      ) : null}
    </div>
  );
}
