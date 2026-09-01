export const rfqDemoEnquiry = {
  fromName: "Rachel Tan",
  fromEmail: "rachel.tan@abc-engineering.example",
  company: "ABC Engineering Pte Ltd",
  role: "Procurement",
  phone: "+65 6123 4567",
  subject: "RFQ — Industrial centrifugal pumps, 12 units",
  receivedAt: "Tue, 1 Sep 2026, 09:14 SGT",
  body: `Hi,

We need a quotation for 12 industrial centrifugal pumps for a plant upgrade at our Jurong facility.

Required delivery: 4 weeks from order confirmation.

Technical requirement: Cast iron casing, 15 kW motor, suitable for water transfer at 8 bar.

Please include lead time in the quotation.

Regards,
Rachel Tan
Procurement
ABC Engineering Pte Ltd
+65 6123 4567`,
} as const;

export const rfqDemoStages = [
  { id: 1, label: "Reading incoming enquiry" },
  { id: 2, label: "Extracting customer and RFQ information" },
  { id: 3, label: "Checking required fields" },
  { id: 4, label: "Flagging missing information" },
  { id: 5, label: "Preparing structured quotation record" },
] as const;

export type DemoOutputField = {
  key: string;
  label: string;
  value: string;
  revealAtStage: number;
  missing?: boolean;
};

export const rfqDemoOutputFields: DemoOutputField[] = [
  {
    key: "customer",
    label: "Customer",
    value: "ABC Engineering Pte Ltd",
    revealAtStage: 2,
  },
  {
    key: "contact",
    label: "Contact",
    value: "Rachel Tan",
    revealAtStage: 2,
  },
  {
    key: "email",
    label: "Email",
    value: "rachel.tan@abc-engineering.example",
    revealAtStage: 2,
  },
  {
    key: "product",
    label: "Product",
    value: "Industrial centrifugal pump",
    revealAtStage: 2,
  },
  {
    key: "quantity",
    label: "Quantity",
    value: "12",
    revealAtStage: 2,
  },
  {
    key: "delivery",
    label: "Delivery requirement",
    value: "4 weeks from order confirmation",
    revealAtStage: 2,
  },
  {
    key: "spec",
    label: "Technical specification",
    value: "Cast iron casing, 15 kW motor, water transfer at 8 bar",
    revealAtStage: 2,
  },
  {
    key: "missing",
    label: "Missing information",
    value: "Delivery address; required flow rate / pump model",
    revealAtStage: 4,
    missing: true,
  },
  {
    key: "status",
    label: "Status",
    value: "Ready for salesperson review",
    revealAtStage: 5,
  },
];
