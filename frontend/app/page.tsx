import Link from "next/link";
import { PortalFooter, PortalHeader } from "../components/portal-shell";
import { serviceSteps } from "../content/site";
import { serviceStatus } from "../lib/service-status";

const quickLinks = [
  { href: "/request", label: "Submit an RTI request", detail: "Start with eligibility and filing guidance." },
  { href: "/status", label: "Track a request or appeal", detail: "Use a registration number to continue." },
  { href: "/appeal", label: "File a first appeal", detail: "Understand when and how to appeal." },
];

export default function Home() {
  return <><PortalHeader /><main id="main-content"><section className="hero"><div className="wrap hero-grid"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" />RIGHT TO INFORMATION SERVICES</p><h1>Access public<br /><em>information.</em></h1><p className="lead">Find guidance for submitting an RTI request to a Central Government public authority, tracking its progress, or filing a first appeal.</p><div className="actions"><Link className="primary link-button" href="/request">Submit an RTI request <span aria-hidden="true">→</span></Link><Link className="secondary link-button" href="/request/guidelines">Read filing guidance</Link></div></div><aside className="start-card" aria-labelledby="before-heading"><p className="card-kicker">BEFORE YOU BEGIN</p><h2 id="before-heading">Check these essentials</h2><ul><li>Requests on this portal concern Central Government public authorities.</li><li>Ask for records or information held by the authority.</li><li>Keep your request clear, focused, and respectful.</li></ul><Link href="/authorities">Find a public authority <span aria-hidden="true">→</span></Link></aside></div></section>
      <section className="wrap service-notice" aria-label="Service notice"><p><strong>{serviceStatus.environment}.</strong> This interface is being prepared as a frontend-only service model. It cannot accept an RTI request or payment yet.</p></section>
      <section className="wrap quick-actions section" aria-labelledby="services-heading"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" />CITIZEN SERVICES</p><h2 id="services-heading">Choose what you need to do.</h2></div><p>Each service is available on its own page so the journey remains clear and focused.</p></div><div className="quick-grid">{quickLinks.map((item) => <Link href={item.href} key={item.href}><h3>{item.label}</h3><p>{item.detail}</p><span aria-hidden="true">View service →</span></Link>)}</div></section>
      <section className="process section wrap" aria-labelledby="process-heading"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" />HOW THE SERVICE WORKS</p><h2 id="process-heading">A clear, accountable process.</h2></div><Link className="text-link" href="/help">Read help and FAQs →</Link></div><div className="steps">{serviceSteps.map((step) => <article key={step.number}><span className="step-number">{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></article>)}</div></section>
      <section className="support-band"><div className="wrap support-grid"><div><p className="eyebrow"><span className="eyebrow-line" />SUPPORT</p><h2>Need guidance before you file?</h2><p>Read the filing guidance, browse common questions, or contact the responsible help desk when details are published.</p></div><div><Link className="secondary link-button" href="/help">Visit the help centre</Link><Link className="text-link" href="/contact">Contact and feedback →</Link></div></div></section>
    </main><PortalFooter /></>;
}
