export const primaryNavigation = [
  { href: "/request", label: "Submit request" },
  { href: "/status", label: "Track status" },
  { href: "/appeal", label: "First appeal" },
  { href: "/authorities", label: "Public authorities" },
  { href: "/help", label: "Help" },
] as const;

export const footerNavigation = [
  { href: "/faq", label: "Frequently asked questions" },
  { href: "/accessibility", label: "Accessibility statement" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact and feedback" },
] as const;

export const serviceNotice =
  "This demonstrator does not accept, store, or transmit personal information. Production service details must be verified by the responsible public authority.";

export const serviceSteps = [
  { number: "01", title: "Check the authority", body: "Confirm that the information is held by a Central Government public authority." },
  { number: "02", title: "Prepare your request", body: "Describe the records or information you need in clear, specific language." },
  { number: "03", title: "Submit and pay", body: "Review your request, then use the prescribed payment or exemption process." },
  { number: "04", title: "Follow the progress", body: "Use the registration number issued after submission to track updates." },
] as const;
