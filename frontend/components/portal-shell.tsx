import Link from "next/link";
import { ReactNode } from "react";
import { footerNavigation, primaryNavigation, serviceNotice } from "../content/site";
import { serviceStatus } from "../lib/service-status";

export function PortalHeader() {
  return <><a className="skip-link" href="#main-content">Skip to main content</a><div className="utility"><div className="wrap utility-inner"><span>Government of India</span><span className="utility-divider" aria-hidden="true">|</span><span>Department of Personnel & Training</span><span className="grow" /><Link href="/accessibility">Accessibility</Link><span lang="hi">हिन्दी संस्करण शीघ्र उपलब्ध</span></div></div><header className="wrap header"><Link className="brand" href="/" aria-label="RTI Online demonstrator home"><span className="wordmark" aria-hidden="true">RTI</span><span><strong>RTI Online</strong><small>Right to Information services</small></span></Link><nav aria-label="Primary navigation">{primaryNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}<Link className="login" href="/login">Sign in</Link></nav></header></>;
}

export function PortalFooter() {
  return <footer><div className="wrap footer-grid"><div className="brand footer-brand"><span className="wordmark" aria-hidden="true">RTI</span><span><strong>RTI Online</strong><small>{serviceStatus.owner}</small></span></div><div><strong>Support and feedback</strong><p>Help desk information will be published by the responsible authority before launch.</p><Link href="/contact">Contact and feedback</Link></div><div className="footer-links">{footerNavigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}</div></div><div className="wrap copyright"><span>{serviceStatus.environment} · Last reviewed: {serviceStatus.updated}</span><span>{serviceNotice}</span></div></footer>;
}

export function PortalPage({ children }: { children: ReactNode }) {
  return <><PortalHeader /><div id="main-content" tabIndex={-1}>{children}</div><PortalFooter /></>;
}
