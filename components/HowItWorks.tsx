import { howItWorksSteps } from "@/data/how-it-works";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="scroll-mt-24 border-b border-border"
      aria-labelledby="how-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          How Worksplice works
        </p>
        <h2
          id="how-heading"
          className="font-heading mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl"
        >
          Find one repetitive process. See whether software can remove part of it.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          The first engagement is a low-risk experiment, not a long programme.
          If the prototype does not help the team, it stops there.
        </p>

        <ol className="mt-12 grid gap-5 sm:grid-cols-2">
          {howItWorksSteps.map((step) => (
            <li
              key={step.number}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <p className="font-mono text-[0.7rem] text-muted-foreground">
                {step.number}
              </p>
              <h3 className="mt-3 text-lg font-medium tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
