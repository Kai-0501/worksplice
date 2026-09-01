import Link from "next/link";

import { outlineCtaClass } from "@/lib/cta-classes";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
      <h1 className="font-heading text-3xl tracking-tight">Page not found</h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
        That address is not part of this site. Worksplice is a single-page website.
      </p>
      <p className="mt-8">
        <Link href="/" className={outlineCtaClass}>
          Back to home
        </Link>
      </p>
    </section>
  );
}
