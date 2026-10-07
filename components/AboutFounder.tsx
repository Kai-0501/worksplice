import { existsSync } from "node:fs";
import { join } from "node:path";

import Image from "next/image";

import { ExternalLink, LinkedInLink } from "@/components/TrackedLink";
import { siteConfig } from "@/lib/site-config";

const founderPhoto = "/images/alfred.jpg";

export function AboutFounder() {
  // The photo is optional in the repo; skip it rather than ship a broken image.
  const hasPhoto = existsSync(join(process.cwd(), "public", founderPhoto));

  return (
    <section
      id="about"
      className="scroll-mt-24 border-b border-border"
      aria-labelledby="about-heading"
    >
      <div
        className={`mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 sm:px-8 sm:py-28 ${hasPhoto ? "lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start" : ""}`}
      >
        {hasPhoto ? (
          <div className="mx-auto w-full max-w-64">
            <Image
              src={founderPhoto}
              alt={`${siteConfig.founder}, founder of ${siteConfig.name}`}
              width={640}
              height={800}
              unoptimized
              className="aspect-[4/5] h-auto w-full rounded-xl border border-border bg-card object-cover object-[center_18%]"
            />
          </div>
        ) : null}

        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
            About the founder
          </p>
          <h2
            id="about-heading"
            className="font-heading mt-3 text-3xl tracking-tight sm:text-4xl"
          >
            You work with the person who builds it.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Founded by {siteConfig.founder} ({siteConfig.founderLegalName}), also
            known as {siteConfig.founderNickname}. He builds small AI and
            workflow automation systems for Singapore B2B teams, focused on
            reducing repetitive administrative work around sales, operations
            and internal coordination.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Worksplice is a bootstrapped {siteConfig.location} startup, founded
            in {siteConfig.founded} and currently early-stage. It is not a large
            delivery team. Clients work with {siteConfig.founder} directly.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Worksplice uses Claude and Claude Code in its own build workflow.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <li>
              <a
                href={`mailto:${siteConfig.founderEmail}`}
                className="underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                {siteConfig.founderEmail}
              </a>
            </li>
            <li>
              <LinkedInLink className="underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
                LinkedIn
              </LinkedInLink>
            </li>
            <li>
              <ExternalLink
                href={siteConfig.github}
                className="underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href={siteConfig.githubRepo}
                className="underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                Worksplice on GitHub
              </ExternalLink>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
