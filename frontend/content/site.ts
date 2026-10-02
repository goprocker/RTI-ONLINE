export interface NavItem {
  href: string;
  label: string;
  badge?: string;
  children?: { href: string; label: string; desc?: string }[];
}

export const primaryNavigation: readonly NavItem[] = [
  { href: "/request/eligibility", label: "Submit Request" },
  { href: "/status", label: "View Status" },
  { href: "/appeal", label: "Submit First Appeal" },
  { href: "/authorities", label: "Public Authorities" },
  {
    href: "/help",
    label: "Help & Guidelines",
    children: [
      { href: "/manual", label: "RTI Process & Flowchart", desc: "Statutory 30-day timeline and escalation decision tree" },
      { href: "/faq", label: "Frequently Asked Questions", desc: "Common questions about fees, eligibility, and rules" },
      { href: "/search", label: "Proactive Disclosures (Section 4)", desc: "Search published government records and circulars" },
      { href: "/offline", label: "State & Offline Application Form", desc: "Printable Section 6(1) letter with Postal Order guidance" },
      { href: "/reconciliation", label: "Payment Reconciliation", desc: "Check status if payment was deducted without an RTI number" }
    ]
  }
] as const;

export const footerNavigation = [
  { href: "/request/eligibility", label: "Submit RTI Request" },
  { href: "/status", label: "Track Application Status" },
  { href: "/appeal", label: "Submit First Appeal" },
  { href: "/authorities", label: "Public Authorities Directory" },
  { href: "/search", label: "Proactive Disclosures (Section 4)" },
  { href: "/offline", label: "Offline RTI Application Generator" },
  { href: "/reconciliation", label: "Payment Verification" },
  { href: "/faq", label: "Frequently Asked Questions" },
  { href: "/accessibility", label: "Accessibility Statement" },
  { href: "/privacy", label: "Privacy Policy & Terms" },
  { href: "/contact", label: "Nodal Officer Contacts" }
] as const;

export const serviceNotice =
  "Official Right to Information (RTI) Online Portal of the Government of India for Central Ministries, Departments, and Public Authorities.";

export const serviceSteps = [
  {
    number: "01",
    title: "Submit Application",
    body: "Identify the public authority holding the records, draft specific queries within 3,000 characters, and submit with statutory ₹10 fee (₹0 for BPL)."
  },
  {
    number: "02",
    title: "Nodal Scrutiny & Assignment",
    body: "Unique Registration Number is generated immediately. The Nodal Officer assigns the file to the concerned CPIO or transfers under Section 6(3) in 5 days."
  },
  {
    number: "03",
    title: "CPIO Record Retrieval",
    body: "The Central Public Information Officer retrieves government notesheets, circulars, and certified documents."
  },
  {
    number: "04",
    title: "Statutory Response Issued",
    body: "A digitally signed response order is furnished within 30 days. If delayed or unsatisfied, submit a First Appeal under Section 19(1) at zero fee."
  }
] as const;
