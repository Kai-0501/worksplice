export const AnalyticsEvent = {
  HERO_CTA_CLICKED: "hero_cta_clicked",
  WORKFLOW_DEMO_STARTED: "workflow_demo_started",
  WORKFLOW_DEMO_COMPLETED: "workflow_demo_completed",
  EMAIL_CTA_CLICKED: "email_cta_clicked",
  LINKEDIN_CLICKED: "linkedin_clicked",
} as const;

export type AnalyticsEventName =
  (typeof AnalyticsEvent)[keyof typeof AnalyticsEvent];

/**
 * Central event hook for later analytics. V1 is a no-op so the site
 * deploys without a vendor, keys, or extra client bundle.
 */
export function track(
  event: AnalyticsEventName,
  properties?: Record<string, unknown>,
): void {
  void event;
  void properties;
}
