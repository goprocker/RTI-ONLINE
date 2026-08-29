"use client";

import Link from "next/link";
import { PortalPage } from "../../../components/portal-shell";
import { useAuth } from "../../../lib/auth-context";

export default function CICSecondAppealPage() {
  const { user, applications, appeals } = useAuth();

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/appeal">Appeals</Link>
          <span>›</span>
          <span>Central Information Commission (CIC) Second Appeal</span>
        </div>

        <div style={{ maxWidth: "800px", margin: "0 auto", background: "#ffffff", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "38px", boxShadow: "var(--shadow-lg)" }}>
          <p className="eyebrow" style={{ marginBottom: "6px" }}>
            <span className="eyebrow-line" />
            SECTION 19(3) · STATUTORY APEX TRIBUNAL
          </p>
          <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 10px" }}>
            Central Information Commission (CIC) Second Appeal
          </h1>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.95rem", lineHeight: "1.6", margin: "0 0 24px" }}>
            If you are not satisfied with the decision of the First Appellate Authority (FAA) or if no order was passed within 45 days, you have the statutory right under <strong>Section 19(3) of the RTI Act 2005</strong> to prefer a Second Appeal or Complaint directly to the Central Information Commission (CIC).
          </p>

          <div style={{ background: "var(--gov-blue-50)", border: "1.5px solid #bfdbfe", borderRadius: "var(--radius-lg)", padding: "20px", marginBottom: "26px" }}>
            <h3 style={{ font: "700 1.15rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
              📦 Your Automated CIC Appeal Package
            </h3>
            <p style={{ fontSize: "0.86rem", color: "var(--neutral-700)", margin: "0 0 14px" }}>
              Our portal automatically aggregates your entire statutory chain of records so you can file with the CIC in one seamless submission:
            </p>

            <div style={{ display: "grid", gap: "10px" }}>
              <div style={{ background: "#ffffff", padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--neutral-200)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: "0.86rem", color: "var(--gov-navy-950)" }}>1. Original RTI Application & Receipt</strong>
                  <div style={{ fontSize: "0.76rem", color: "var(--neutral-500)" }}>Registration number, filing date, and query text</div>
                </div>
                <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--forest-600)" }}>✓ Ready</span>
              </div>

              <div style={{ background: "#ffffff", padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--neutral-200)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: "0.86rem", color: "var(--gov-navy-950)" }}>2. CPIO Response Order</strong>
                  <div style={{ fontSize: "0.76rem", color: "var(--neutral-500)" }}>Certified copy of initial response or non-response log</div>
                </div>
                <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--forest-600)" }}>✓ Ready</span>
              </div>

              <div style={{ background: "#ffffff", padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--neutral-200)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: "0.86rem", color: "var(--gov-navy-950)" }}>3. First Appeal Petition & Registration</strong>
                  <div style={{ fontSize: "0.76rem", color: "var(--neutral-500)" }}>Appeal registration number and grounds submitted to FAA</div>
                </div>
                <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--forest-600)" }}>✓ Ready</span>
              </div>

              <div style={{ background: "#ffffff", padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--neutral-200)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: "0.86rem", color: "var(--gov-navy-950)" }}>4. First Appellate Authority (FAA) Order</strong>
                  <div style={{ fontSize: "0.76rem", color: "var(--neutral-500)" }}>Decision passed by FAA or statutory 45-day non-disposal certificate</div>
                </div>
                <span style={{ fontSize: "0.76rem", fontWeight: 700, color: "var(--forest-600)" }}>✓ Ready</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderTop: "1px solid var(--neutral-200)", paddingTop: "24px" }}>
            <Link href="/dashboard" className="btn-secondary-action">
              ← Return to Dashboard
            </Link>

            <a
              href="https://cic.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-action"
              style={{ background: "var(--gov-navy-950)", borderColor: "var(--gov-navy-950)" }}
            >
              Export Package & Proceed to CIC Portal (cic.gov.in) ↗
            </a>
          </div>
        </div>
      </main>
    </PortalPage>
  );
}
