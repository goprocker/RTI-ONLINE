import Link from "next/link";
import { PortalPage } from "./portal-shell";
import { serviceNotice } from "../content/site";

type DemoPageProps = { eyebrow: string; title: string; description: string; action?: { label: string; href: string }; children?: React.ReactNode };

export function DemoPage({ eyebrow, title, description, action, children }: DemoPageProps) {
  return <PortalPage><main className="demo-page wrap"><div className="bread"><Link href="/">Home</Link><span aria-hidden="true">›</span><span>{eyebrow}</span></div><section className="demo-card"><p className="eyebrow"><span className="eyebrow-line" />{eyebrow}</p><h1>{title}</h1><p className="page-lead">{description}</p>{children}{action && <Link className="primary link-button" href={action.href}>{action.label} <span aria-hidden="true">→</span></Link>}<p className="demo-note">{serviceNotice}</p></section></main></PortalPage>;
}
