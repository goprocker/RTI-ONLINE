import Link from "next/link";
import { PortalPage } from "../../../components/portal-shell";

const points = ["This portal is for Indian citizens filing with Central Government public authorities.", "Keep the request clear and specific; the main request field allows up to 3,000 characters.", "Attach supporting documents only when necessary. Do not upload Aadhaar, PAN, or other identity documents.", "The prescribed fee is paid after completing the request. BPL applicants may request fee exemption with valid proof."];

export default function GuidelinesPage() {
  return <PortalPage><main className="content-page wrap"><div className="bread"><Link href="/">Home</Link><span>›</span><Link href="/request">Submit request</Link><span>›</span><span>Guidelines</span></div><div className="content-grid"><article><p className="eyebrow"><span className="eyebrow-line" />BEFORE YOU BEGIN</p><h1>Read this once.<br /><em>File with confidence.</em></h1><p className="page-lead">The essentials you need before starting an RTI request.</p><ol className="guideline-list">{points.map((point, index) => <li key={point}><span>{String(index + 1).padStart(2, "0")}</span><p>{point}</p></li>)}</ol><Link className="primary link-button" href="/request/new">I understand. Start my request <span>→</span></Link></article><aside className="side-help"><p>QUICK REMINDER</p><h2>You can ask for information held by an authority—not opinions or explanations.</h2><Link href="/help">Browse help & FAQs →</Link></aside></div></main></PortalPage>;
}
