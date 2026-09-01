import { principles } from "@/data/principles";

export function Principles() {
  return (
    <section
      className="scroll-mt-24 border-b border-border"
      aria-labelledby="principles-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Approach
        </p>
        <h2
          id="principles-heading"
          className="font-heading mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl"
        >
          Automate the repetitive parts. Leave the judgement with people.
        </h2>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {principles.map((principle) => (
            <li
              key={principle.title}
              className="rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <h3 className="text-lg font-medium tracking-tight">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {principle.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
