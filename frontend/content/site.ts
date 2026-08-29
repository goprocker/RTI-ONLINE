export interface NavItem {
  href: string;
  label: string;
  badge?: string;
  children?: { href: string; label: string; desc?: string }[];
}

export const primaryNavigation: readonly NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/request/eligibility", label: "File RTI Request" },
  { href: "/search", label: "Search Disclosures", badge: "Sec 4" },
  { href: "/appeal", label: "File First Appeal" },
  { href: "/status", label: "Track Status" },
  { href: "/authorities", label: "Find Authority" },
  {
    href: "/help",
    label: "Help & FAQ",
    children: [
      { href: "/search", label: "Public Records & Disclosures", desc: "Access published citizen charters & circulars" },
      { href: "/offline", label: "Offline & State RTI Generator", desc: "Printable Section 6(1) letter for offline filing" },
      { href: "/faq", label: "Frequently Asked Questions", desc: "Common questions on RTI rules & fees" },
      { href: "/manual", label: "Citizen User Manual", desc: "Step-by-step statutory filing guidelines" },
      { href: "/reconciliation", label: "Payment Reconciliation", desc: "Check deducted payment status" },
      { href: "/officer", label: "Officer & Admin Portal", desc: "Nodal Officer & CPIO processing desk" }
    ]
  }
] as const;

export const footerNavigation = [
  { href: "/search", label: "Public Disclosures (Section 4)" },
  { href: "/offline", label: "Offline & State RTI Generator" },
  { href: "/officer", label: "Officer Scrutiny & CPIO Portal" },
  { href: "/authorities", label: "Central Public Authorities Directory" },
  { href: "/reconciliation", label: "Payment Reconciliation Tool" },
  { href: "/faq", label: "Frequently Asked Questions" },
  { href: "/accessibility", label: "Accessibility Statement" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/contact", label: "Contact & Nodal Support" },
] as const;

export const serviceNotice =
  "Official portal of the Government of India for Central Government Public Authorities under the Right to Information Act, 2005.";

export const serviceSteps = [
  {
    number: "01",
    title: "Find Public Authority",
    body: "Identify the Central Ministry, Department, or Public Authority that holds the requested records."
  },
  {
    number: "02",
    title: "Draft Specific Request",
    body: "Specify the information or documents within 3,000 characters (or attach a detailed PDF)."
  },
  {
    number: "03",
    title: "Pay ₹10 or Claim BPL Exemption",
    body: "Standard fee is ₹10 via UPI/RuPay/NetBanking. Below Poverty Line (BPL) citizens pay ₹0 with certificate."
  },
  {
    number: "04",
    title: "Track Statutory Timeline",
    body: "Follow statutory 30-day response window. File First Appeal at zero fee if unsatisfied or delayed."
  }
] as const;
