"use client";

import Link from "next/link";

import { outlineCtaClass, primaryCtaClass } from "@/lib/cta-classes";

export default function ErrorView({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <section className="mx-auto flex min-h-[50vh] w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-8">
      <h1 className="font-heading text-3xl tracking-tight">
        Something went wrong
      </h1>
      <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
        The page could not be displayed. Refresh, or return to the homepage.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button type="button" className={primaryCtaClass} onClick={() => retry()}>
          Try again
        </button>
        <Link href="/" className={outlineCtaClass}>
          Back to home
        </Link>
      </div>
    </section>
  );
}
