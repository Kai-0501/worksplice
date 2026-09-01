export type WorkflowExample = {
  id: string;
  title: string;
  steps: string[];
  outcome: string;
};

export const workflowExamples: WorkflowExample[] = [
  {
    id: "rfq",
    title: "RFQ automation",
    steps: [
      "Incoming enquiry",
      "Requirements extracted",
      "Missing information flagged",
      "Quotation record prepared",
    ],
    outcome:
      "Less manual reading, copying and chasing before quotation work begins.",
  },
  {
    id: "sales-admin",
    title: "Sales administration",
    steps: [
      "New enquiry",
      "Customer details structured",
      "CRM tasks prepared",
      "Follow-up queue generated",
    ],
    outcome:
      "Reduce repetitive sales coordination without removing salesperson control.",
  },
  {
    id: "tender",
    title: "Tender monitoring",
    steps: [
      "Tender source",
      "Opportunity detected",
      "Requirements extracted",
      "Deadline and brief prepared",
    ],
    outcome:
      "Spend less time manually scanning portals and assembling first-pass tender information.",
  },
];
