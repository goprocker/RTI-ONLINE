export interface NavItem {
  href: string;
  label: string;
  badge?: string;
  children?: { href: string; label: string; desc?: string }[];
}

export const primaryNavigation: readonly NavItem[] = [
  { href: "/request/eligibility", label: "File RTI" },
  { href: "/status", label: "Track" },
  { href: "/appeal", label: "First Appeal" },
  { href: "/authorities", label: "Find Authority" },
  {
    href: "/help",
    label: "Help",
    children: [
      { href: "/manual", label: "How RTI works", desc: "Simple step-by-step guide to filing and timelines" },
      { href: "/faq", label: "Frequently asked questions", desc: "Common questions about fees, eligibility, and rules" },
      { href: "/search", label: "Search public information", desc: "Find published records before filing a new RTI" },
      { href: "/offline", label: "Prepare offline application", desc: "Printable Section 6(1) letter for states without online portals" },
      { href: "/reconciliation", label: "Payment issue", desc: "Check status if payment was deducted without an RTI number" }
    ]
  }
] as const;

export const footerNavigation = [
  { href: "/request/eligibility", label: "File an RTI" },
  { href: "/status", label: "Track an application" },
  { href: "/appeal", label: "File a First Appeal" },
  { href: "/authorities", label: "Find a public authority" },
  { href: "/search", label: "Search public disclosures" },
  { href: "/offline", label: "Offline RTI application" },
  { href: "/reconciliation", label: "Payment issue" },
  { href: "/faq", label: "Frequently asked questions" },
  { href: "/accessibility", label: "Accessibility statement" },
  { href: "/privacy", label: "Privacy policy" },
  { href: "/contact", label: "Contact and support" }
] as const;

export const prototypeNotice =
  "RTI Online — Concept Redesign · An independent prototype demonstrating a citizen-first redesign of India's RTI Online experience. Not affiliated with or operated by the Government of India.";

export const serviceNotice = prototypeNotice;

export const serviceSteps = [
  {
    number: "01",
    title: "You file a request",
    body: "Identify the public authority holding the records, write your questions, and submit with ₹10 (or ₹0 for BPL)."
  },
  {
    number: "02",
    title: "Public Authority receives it",
    body: "A unique registration number is generated instantly. The Nodal Officer assigns the file to the concerned CPIO."
  },
  {
    number: "03",
    title: "CPIO processes the records",
    body: "The officer retrieves relevant files, notesheets, or decisions from government archives."
  },
  {
    number: "04",
    title: "You receive a response",
    body: "A digitally signed response is issued within 30 days. If unsatisfied, you can file a First Appeal at zero fee."
  }
] as const;
