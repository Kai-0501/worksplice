"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import {
  AnalyticsEvent,
  track,
  type AnalyticsEventName,
} from "@/lib/analytics";
import { isSafeHref, isSafeHttpsUrl } from "@/lib/safe-url";
import { getMailtoHref, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type TrackedLinkProps = Omit<ComponentPropsWithoutRef<"a">, "onClick"> & {
  event: AnalyticsEventName;
};

export function TrackedLink({
  event,
  className,
  href,
  ...props
}: TrackedLinkProps) {
  const safeHref = typeof href === "string" && isSafeHref(href) ? href : undefined;

  return (
    <a
      {...props}
      className={className}
      href={safeHref}
      onClick={() => track(event)}
    />
  );
}

export function EmailLink({
  className,
  children,
  subject,
}: {
  className?: string;
  children: ReactNode;
  subject?: string;
}) {
  return (
    <TrackedLink
      href={getMailtoHref(subject)}
      event={AnalyticsEvent.EMAIL_CTA_CLICKED}
      className={className}
    >
      {children}
    </TrackedLink>
  );
}

export function LinkedInLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <ExternalLink
      href={siteConfig.linkedin}
      className={cn(className)}
      onClick={() => track(AnalyticsEvent.LINKEDIN_CLICKED)}
    >
      {children}
    </ExternalLink>
  );
}

export function ExternalLink({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  if (!isSafeHttpsUrl(href)) {
    return <span className={className}>{children}</span>;
  }

  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  );
}
