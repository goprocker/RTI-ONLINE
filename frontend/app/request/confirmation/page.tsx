import Link from "next/link";
import { DemoPage } from "../../../components/demo-page";

export default function ConfirmationPage() { return <DemoPage eyebrow="REQUEST SUBMITTED" title="Your request is ready." description="In the real flow, this page will show a government-issued registration number after successful payment."><div className="success-box"><span>✓</span><div><b>Demo registration number</b><p>DOP&T/R/2026/12345</p></div></div><Link className="secondary link-button" href="/status">Track this request →</Link></DemoPage>; }
