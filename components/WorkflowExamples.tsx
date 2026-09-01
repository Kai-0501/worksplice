import { workflowExamples } from "@/data/workflow-examples";

export function WorkflowExamples() {
  return (
    <section
      id="examples"
      className="scroll-mt-24 border-b border-border"
      aria-labelledby="examples-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          What Worksplice automates
        </p>
        <h2
          id="examples-heading"
          className="font-heading mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl"
        >
          Practical admin work, not a transformation programme.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          These are examples of the interaction model — small automations around
          sales and operations. They are not a fixed menu of services.
        </p>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {workflowExamples.map((example) => (
            <li
              key={example.id}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-lg font-medium tracking-tight">
                {example.title}
              </h3>
              <ol className="mt-5">
                {example.steps.map((step, index) => (
                  <li key={step} className="relative flex gap-3 pb-3 last:pb-0">
                    {index < example.steps.length - 1 ? (
                      <span
                        aria-hidden
                        className="absolute top-5 left-[9px] h-[calc(100%-6px)] w-px bg-border"
                      />
                    ) : null}
                    <span
                      aria-hidden
                      className="relative z-10 mt-2 size-[18px] shrink-0 rounded-full border border-primary/35 bg-card"
                    />
                    <span className="inline-flex min-h-8 min-w-0 flex-1 items-center rounded-md border border-border bg-muted/70 px-3 py-2 font-mono text-xs leading-snug text-foreground">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm leading-6 text-muted-foreground">
                {example.outcome}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
