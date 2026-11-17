import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="scroll-mt-24 border-b border-border bg-muted/40"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
          Testimonials
        </p>
        <h2
          id="testimonials-heading"
          className="font-heading mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl"
        >
          In their own words.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
          Shared with permission. Names and companies are withheld; outcomes are
          reported by the speakers.
        </p>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <li key={testimonial.id} className="min-w-0">
              <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm sm:p-7">
                <span aria-hidden="true" className="font-heading text-5xl leading-none text-primary/60">
                  &ldquo;
                </span>
                <blockquote className="mt-3 flex-1 text-base leading-7 text-foreground">
                  <p>{testimonial.quote}</p>
                </blockquote>
                <figcaption className="mt-7 border-t border-border pt-5 text-sm leading-6">
                  <span className="block font-medium text-foreground">{testimonial.role}</span>
                  <span className="block text-muted-foreground">{testimonial.industry}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
