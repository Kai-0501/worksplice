import { EmailLink, ExternalLink, LinkedInLink } from "@/components/TrackedLink";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {siteConfig.name} · {siteConfig.location}
        </p>
        <p className="flex flex-wrap gap-x-5 gap-y-2">
          <EmailLink className="hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            Email
          </EmailLink>
          <LinkedInLink className="hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
            LinkedIn
          </LinkedInLink>
          <ExternalLink
            href={siteConfig.github}
            className="hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            GitHub
          </ExternalLink>
        </p>
      </div>
    </footer>
  );
}
