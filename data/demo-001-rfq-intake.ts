export const rfqIntakeEnquiry = {
  fromName: "Daniel",
  company: "Apex Industrial Pte Ltd",
  subject: "RFQ – Fabricated mounting brackets",
  body: `Hi,

Please quote 250 pcs based on attached drawing MBR-204 Rev C.

Material SS316, brushed finish.

Delivery will be to our Tuas facility.

Please send the quotation by Friday.

Thanks,
Daniel
Apex Industrial Pte Ltd`,
} as const;

export const rfqIntakeFields = [
  { key: "customer", label: "Customer", value: "Apex Industrial Pte Ltd" },
  { key: "request", label: "Request", value: "Fabricated mounting brackets" },
  { key: "quantity", label: "Quantity", value: "250 pcs" },
  { key: "material", label: "Material", value: "SS316" },
  { key: "finish", label: "Finish", value: "Brushed" },
  { key: "drawing", label: "Drawing", value: "MBR-204 Rev C" },
  { key: "deliveryLocation", label: "Delivery location", value: "Tuas" },
  { key: "quotationDeadline", label: "Quotation deadline", value: "Friday" },
] as const;

export const rfqIntakeFlags = [
  {
    key: "deliveryDate",
    title: "Required delivery date",
    reason:
      "The RFQ gives a delivery location but does not specify when the customer needs the parts.",
  },
  {
    key: "materialCertification",
    title: "Material certification",
    reason:
      "SS316 is specified, but the RFQ does not state whether material certification is required.",
  },
] as const;

export const rfqIntakeCopy = {
  eyebrow: "Worksplice Demo 001",
  title: "RFQ Intake",
  heading: "Worksplice Demo 001 — RFQ Intake",
  explanation:
    "Worksplice turns an incoming RFQ into a clean intake checklist, highlights missing information, and prepares a clarification draft for human review.",
  trust: "Does not write to ERP. Pricing and customer commitments stay human.",
  trustSecondary:
    "Worksplice sits around the intake handoff. Your ERP remains the system of record.",
  checkCta: "Check RFQ",
  resetCta: "Reset",
  draft:
    "Thanks Daniel. Before we finalise the quotation, could you confirm the required delivery date and whether material certification is required?",
  draftLabel: "Clarification draft",
  humanGate:
    "Worksplice prepared this draft. Nothing goes to the customer until someone chooses Approve, Edit, or Discard.",
  approved: "Clarification approved",
  discarded: "Draft discarded — nothing was sent.",
  pilot: "Pilot: one RFQ intake workflow, human-gated.",
  pilotExtra: "Adapted around your existing inbox and systems.",
  fictional: "Fictional RFQ. Not a live customer and not a live AI call.",
} as const;
