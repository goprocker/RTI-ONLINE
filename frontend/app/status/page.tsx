"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { PortalPage } from "../../components/portal-shell";

export default function StatusPage() {
  const [registration, setRegistration] = useState(""); const [message, setMessage] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setMessage(registration.trim() ? `Demo mode: we would send an OTP for ${registration.trim()} next.` : "Enter your registration number to continue."); }
  return <PortalPage><main className="status-page"><section className="flow-hero"><div className="wrap"><p className="eyebrow"><span className="eyebrow-line" />REQUEST & APPEAL STATUS</p><div className="bread"><Link href="/">Home</Link><span>›</span><span>Track status</span></div><h1>Know where your<br /><em>request stands.</em></h1><p>Use your registration number to see your RTI request or first appeal progress.</p></div></section><section className="wrap status-card"><div><p className="eyebrow"><span className="eyebrow-line" />TRACK STATUS</p><h2>Enter your registration number</h2><p>We’ll verify access using the contact details linked to your request.</p></div><form onSubmit={submit}><label htmlFor="status-number">Registration number</label><input id="status-number" value={registration} onChange={(event) => setRegistration(event.target.value)} placeholder="e.g. DOP&T/R/2026/12345" /><button className="dark">Continue <span>→</span></button>{message && <p className="form-message" role="status">{message}</p>}</form></section><section className="wrap status-support"><h2>Don’t have your registration number?</h2><p>Check the acknowledgement message or email you received after submitting your request.</p><Link href="/request">Start a new RTI request →</Link></section></main></PortalPage>;
}
