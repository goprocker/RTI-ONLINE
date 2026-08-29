export interface NavItem {
  href: string;
  label: string;
  badge?: string;
  children?: { href: string; label: string; desc?: string }[];
}

export const primaryNavigation: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/request/eligibility", label: "File RTI" },
  { href: "/status", label: "Track" },
  { href: "/appeal", label: "First Appeal" },
  { href: "/authorities", label: "Find Authority" },
  {
    href: "/help",
    label: "Help",
    children: [
      { href: "/search", label: "Public information search", desc: "Search existing published records" },
      { href: "/faq", label: "Frequently asked questions", desc: "Common questions on RTI rules and fees" },
      { href: "/reconciliation", label: "Payment issue", desc: "Check deducted payment without registration number" },
      { href: "/offline", label: "Offline RTI application", desc: "Prepare physical letter for postal submission" },
      { href: "/manual", label: "User guide", desc: "Step-by-step guidance on using the portal" }
    ]
  }
] as const;

export const footerNavigation = [
  { href: "/request/eligibility", label: "File an RTI" },
  { href: "/status", label: "Track an application" },
  { href: "/appeal", label: "File a First Appeal" },
  { href: "/authorities", label: "Find public authorities" },
  { href: "/search", label: "Search public records" },
  { href: "/reconciliation", label: "Payment issue" },
  { href: "/offline", label: "Postal / Offline application" },
  { href: "/faq", label: "FAQ & Help" },
  { href: "/accessibility", label: "Accessibility statement" },
  { href: "/privacy", label: "Privacy notice" },
  { href: "/contact", label: "Contact support" }
] as const;

export const prototypeNotice =
  "RTI Online — Concept Redesign · An independent prototype demonstrating a citizen-first redesign of India's RTI Online experience. Not affiliated with or operated by the Government of India.";

export const serviceNotice = prototypeNotice;

export const serviceSteps = [
  {
    number: "01",
    title: "Find Public Authority",
    body: "Identify the Central Ministry, Department, or Public Authority that holds the requested records."
  },
  {
    number: "02",
    title: "Draft Specific Request",
    body: "Specify the information or documents within 3,000 characters (or attach a supporting PDF)."
  },
  {
    number: "03",
    title: "Pay ₹10 or Claim BPL Exemption",
    body: "Standard fee is ₹10 via UPI/Debit Card. Below Poverty Line (BPL) citizens pay ₹0 with certificate."
  },
  {
    number: "04",
    title: "Track Statutory Timeline",
    body: "Follow statutory 30-day response window. File First Appeal at zero fee if unsatisfied or delayed."
  }
] as const;
