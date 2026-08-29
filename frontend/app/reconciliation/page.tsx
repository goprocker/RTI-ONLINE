"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";
import { PaymentReconciliationResult } from "../../types/rti";

export default function ReconciliationPage() {
  const { reconcilePayment } = useAuth();
  const [txRef, setTxRef] = useState("SBI-UPI-884910294");
  const [emailOrMobile, setEmailOrMobile] = useState("rajesh.sharma@example.gov.in");
  const [result, setResult] = useState<PaymentReconciliationResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  function handleCheck(e: FormEvent) {
    e.preventDefault();
    if (!txRef.trim()) {
      alert("Please enter bank transaction reference or order ID.");
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      const res = reconcilePayment(txRef, emailOrMobile);
      setIsSearching(false);
      setResult(res);
    }, 450);
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Payment Reconciliation</span>
        </div>

        <section className="flow-hero" style={{ background: "linear-gradient(135deg, #eef5fb 0%, #fffbf5 100%)", borderRadius: "var(--radius-xl)", padding: "36px 40px", marginBottom: "36px", border: "1px solid var(--neutral-200)" }}>
          <p className="eyebrow"><span className="eyebrow-line" />BANKING SETTLEMENT DESK</p>
          <h1 className="hero-h1" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", margin: "6px 0 12px" }}>
            Payment deducted but <em>no RTI number generated?</em>
          </h1>
          <p style={{ maxWidth: "660px", color: "var(--neutral-700)", fontSize: "0.96rem", lineHeight: "1.6", margin: 0 }}>
            If your bank account or UPI was debited but the connection dropped before receiving your registration number, our automated payment reconciliation system verifies the gateway status and restores your RTI registration.
          </p>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "36px", alignItems: "start" }}>
          {/* Lookup Form */}
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "32px", boxShadow: "var(--shadow-md)" }}>
            <h2 style={{ font: "700 1.4rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 16px" }}>
              Check Transaction Reconciliation Status
            </h2>

            <form onSubmit={handleCheck}>
              <div className="form-group">
                <label htmlFor="tx-ref">
                  Bank Transaction Reference / Order ID <span className="required">*</span>
                </label>
                <input
                  id="tx-ref"
                  className="form-control"
                  type="text"
                  required
                  value={txRef}
                  onChange={(e) => setTxRef(e.target.value)}
                  placeholder="e.g. SBI-UPI-884910294 or TXN-9948102"
                />
                <small style={{ display: "block", color: "var(--neutral-500)", marginTop: "4px", fontSize: "0.75rem" }}>
                  Found on your bank SMS / UPI payment debit receipt.
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="tx-contact">
                  Applicant Mobile Number or Email <span className="required">*</span>
                </label>
                <input
                  id="tx-contact"
                  className="form-control"
                  type="text"
                  required
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                  placeholder="Registered mobile or email"
                />
              </div>

              <button
                type="submit"
                className="btn-primary-action"
                disabled={isSearching}
                style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
              >
                {isSearching ? "Checking Bank Gateway..." : "Verify Payment & Fetch Status →"}
              </button>
            </form>

            {/* Reconciliation Result Card */}
            {result && (
              <div
                style={{
                  marginTop: "24px",
                  padding: "20px",
                  borderRadius: "var(--radius-lg)",
                  background: result.status === "RECONCILED" ? "var(--forest-50)" : "var(--neutral-50)",
                  border: result.status === "RECONCILED" ? "1.5px solid #a7f3d0" : "1.5px solid var(--neutral-300)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.1rem" }}>
                    {result.status === "RECONCILED" ? "✓" : "⏳"}
                  </span>
                  <strong style={{ color: result.status === "RECONCILED" ? "var(--forest-700)" : "var(--gov-navy-950)", fontSize: "0.95rem" }}>
                    {result.statusLabel}
                  </strong>
                </div>

                <p style={{ fontSize: "0.85rem", color: "var(--neutral-700)", margin: "0 0 12px", lineHeight: "1.5" }}>
                  {result.message}
                </p>

                {result.rtiRegNo && (
                  <div style={{ background: "#ffffff", padding: "12px 16px", borderRadius: "var(--radius-md)", border: "1px solid #cbd5e1", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: "0.7rem", color: "var(--neutral-500)", textTransform: "uppercase", fontWeight: 700 }}>
                        ASSIGNED REGISTRATION NUMBER
                      </span>
                      <div style={{ font: "700 1.2rem var(--font-serif)", color: "var(--gov-navy-950)" }}>
                        {result.rtiRegNo}
                      </div>
                    </div>
                    <Link
                      href={`/status?regNo=${encodeURIComponent(result.rtiRegNo)}`}
                      className="btn-primary-action"
                      style={{ padding: "6px 12px", fontSize: "0.78rem" }}
                    >
                      Track Request →
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Explanation of 24-48 Hours Banking Cycle */}
          <aside style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "28px" }}>
            <h3 style={{ font: "700 1.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 12px" }}>
              How Payment Reconciliation Works
            </h3>
            <p style={{ fontSize: "0.84rem", color: "var(--neutral-600)", lineHeight: "1.6" }}>
              Under the Government of India electronic receipt mechanism (BharatKosh / SBI ePay / RBI NEFT), settlements undergo batch reconciliation:
            </p>

            <ol style={{ paddingLeft: "18px", fontSize: "0.82rem", color: "var(--neutral-700)", lineHeight: "1.6", margin: "12px 0 18px" }}>
              <li>
                <strong>Immediate Gateway Ping:</strong> If your bank server confirms debit, the portal instantly creates the RTI application.
              </li>
              <li>
                <strong>24–48 Working Hours Cycle:</strong> If communication was severed during payment, the bank gateway transmits settlement batches overnight.
              </li>
              <li>
                <strong>Automatic Registration or Refund:</strong> Once the bank clears the transaction, your RTI registration number is dispatched via SMS/email or the money is credited back to source.
              </li>
            </ol>

            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", padding: "14px", borderRadius: "var(--radius-md)", fontSize: "0.78rem", color: "var(--neutral-600)" }}>
              <strong>Need urgent assistance?</strong> Contact the DOPT RTI Helpdesk at <code>rtionline-dopt@gov.in</code> with your transaction reference.
            </div>
          </aside>
        </div>
      </main>
    </PortalPage>
  );
}
