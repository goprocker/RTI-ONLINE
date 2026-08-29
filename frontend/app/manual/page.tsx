"use client";

import Link from "next/link";
import { PortalPage } from "../../components/portal-shell";
import { RtiFlowchart } from "../../components/rti-flowchart";

export default function ManualPage() {
  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/help">Help & Guidelines</Link>
          <span>›</span>
          <span>RTI Process & Flowchart</span>
        </div>

        <div style={{ maxWidth: "860px", marginBottom: "32px" }}>
          <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            RTI Process Flowchart & Statutory Timeline
          </h1>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
            Comprehensive guide explaining the statutory lifecycle of an RTI application, time limits for Central Public Information Officers (CPIOs), First Appellate Authorities (FAAs), and Central Information Commission (CIC).
          </p>
        </div>

        {/* FLOWCHART COMPONENT */}
        <div style={{ marginBottom: "40px" }}>
          <RtiFlowchart />
        </div>

        {/* STATUTORY SECTION BREAKDOWN */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "36px" }}>
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ font: "700 1.15rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 10px" }}>
              1. Section 6(1) — Initial Application
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--neutral-700)", lineHeight: "1.6", margin: "0 0 12px" }}>
              Any citizen of India can submit an application in writing or through electronic means to the Public Information Officer (PIO/CPIO).
            </p>
            <ul style={{ fontSize: "0.84rem", color: "var(--neutral-700)", paddingLeft: "20px", margin: 0, lineHeight: "1.6" }}>
              <li><strong>Prescribed Fee:</strong> ₹10 for Central Government (₹0 for BPL card holders).</li>
              <li><strong>Character Limit:</strong> Up to 3,000 characters with certified document attachments.</li>
              <li><strong>No Justification:</strong> The applicant is not required to give reasons for seeking information.</li>
            </ul>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ font: "700 1.15rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 10px" }}>
              2. Section 6(3) — Inter-Department Transfer
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--neutral-700)", lineHeight: "1.6", margin: "0 0 12px" }}>
              Where an application is made to a public authority requesting information held by another public authority.
            </p>
            <ul style={{ fontSize: "0.84rem", color: "var(--neutral-700)", paddingLeft: "20px", margin: 0, lineHeight: "1.6" }}>
              <li><strong>Statutory Deadline:</strong> Must be transferred within <strong>5 days</strong> of receipt.</li>
              <li><strong>Citizen Intimation:</strong> The applicant is immediately informed of the transfer via SMS and email.</li>
              <li><strong>No Second Fee:</strong> The applicant does not pay any additional application fee.</li>
            </ul>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ font: "700 1.15rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 10px" }}>
              3. Section 19(1) — First Appeal
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--neutral-700)", lineHeight: "1.6", margin: "0 0 12px" }}>
              Filed before an officer senior in rank to the CPIO (First Appellate Authority) if:
            </p>
            <ul style={{ fontSize: "0.84rem", color: "var(--neutral-700)", paddingLeft: "20px", margin: 0, lineHeight: "1.6" }}>
              <li>No decision is received within 30 days of filing.</li>
              <li>Information provided is incomplete, misleading, or denied under Section 8 exemptions.</li>
              <li><strong>Appeal Window:</strong> Within <strong>30 days</strong> from the expiry of the response period.</li>
              <li><strong>Disposal Period:</strong> FAA must pass an order within 30 days (extendable to 45 days with written reasons).</li>
            </ul>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "24px", boxShadow: "var(--shadow-sm)" }}>
            <h3 style={{ font: "700 1.15rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 10px" }}>
              4. Section 19(3) & 18 — Second Appeal & CIC Complaints
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--neutral-700)", lineHeight: "1.6", margin: "0 0 12px" }}>
              Quasi-judicial apex escalation before the Central Information Commission (CIC) or State Information Commission (SIC):
            </p>
            <ul style={{ fontSize: "0.84rem", color: "var(--neutral-700)", paddingLeft: "20px", margin: 0, lineHeight: "1.6" }}>
              <li><strong>Second Appeal:</strong> Within <strong>90 days</strong> from the date of the FAA order.</li>
              <li><strong>Section 18 Complaint:</strong> If a CPIO refused to receive an application, demanded excessive fees, or knowingly gave false information.</li>
              <li><strong>Penalties (Section 20):</strong> CIC can impose ₹250/day penalty up to ₹25,000 on defaulting CPIOs.</li>
            </ul>
          </div>
        </div>

        {/* CITIZEN ACTION STRIP */}
        <div style={{ background: "var(--gov-navy-900)", color: "#ffffff", padding: "28px 32px", borderRadius: "var(--radius-lg)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h3 style={{ margin: "0 0 4px", fontSize: "1.2rem", font: "700 1.2rem var(--font-serif)" }}>
              Ready to submit your application?
            </h3>
            <p style={{ margin: 0, fontSize: "0.88rem", color: "#cbd5e1" }}>
              Use our step-by-step wizard to find the authority, draft queries, and pay online.
            </p>
          </div>
          <Link href="/request/eligibility" className="btn-hero-primary" style={{ background: "#f59e0b", color: "#071626", border: 0 }}>
            + Submit RTI Request →
          </Link>
        </div>
      </main>
    </PortalPage>
  );
}
