"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";

export default function PaymentIssuePage() {
  const [txnRef, setTxnRef] = useState("");
  const [contact, setContact] = useState("");
  const [result, setResult] = useState<any | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  function handleCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!txnRef.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setResult({
        txnRef: txnRef.trim(),
        amount: "₹10.00",
        bankStatus: "SUCCESS",
        settledDate: "29 August 2026",
        generatedRegNo: "DOPT/R/2026/04812",
        authority: "Department of Personnel & Training"
      });
    }, 600);
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/help">Help</Link>
          <span>›</span>
          <span>Payment issue</span>
        </div>

        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ font: "700 2.1rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              Payment deducted but no RTI number?
            </h1>
            <p style={{ color: "var(--neutral-600)", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
              If money was debited from your bank account or UPI app during filing but the browser timed out, check your transaction reference here to retrieve your registration receipt.
            </p>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
            <form onSubmit={handleCheck}>
              <div style={{ marginBottom: "16px" }}>
                <label htmlFor="txn-ref-input" style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                  Bank Reference Number / UPI UTR / Transaction ID <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  id="txn-ref-input"
                  type="text"
                  value={txnRef}
                  onChange={(e) => setTxnRef(e.target.value)}
                  placeholder="e.g. 423984128912 or SBI-PAY-98129"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem", fontFamily: "var(--font-number)" }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="contact-input" style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                  Email Address or Mobile Number
                </label>
                <input
                  id="contact-input"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="e.g. 9876543210 or yourname@example.com"
                  style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
                />
              </div>

              <button
                type="submit"
                className="btn-hero-primary"
                disabled={isSearching || !txnRef.trim()}
                style={{ width: "100%", justifyContent: "center", padding: "11px" }}
              >
                {isSearching ? "Checking payment status..." : "Check payment status →"}
              </button>
            </form>

            {/* Result Box */}
            {result && (
              <div style={{ marginTop: "24px", padding: "18px", background: "var(--forest-50)", border: "1px solid var(--forest-600)", borderRadius: "var(--radius-md)" }}>
                <span style={{ fontSize: "0.74rem", fontWeight: 800, color: "var(--forest-700)", textTransform: "uppercase" }}>
                  Payment Confirmed & RTI Generated
                </span>
                <div style={{ marginTop: "6px", fontSize: "0.92rem", color: "var(--gov-navy-950)" }}>
                  Registration Number: <strong>{result.generatedRegNo}</strong>
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--neutral-600)", marginTop: "2px" }}>
                  Amount: {result.amount} · Bank Settled: {result.settledDate}
                </div>
                <div style={{ marginTop: "12px" }}>
                  <Link href={`/status?regNo=${encodeURIComponent(result.generatedRegNo)}`} className="btn-file-primary" style={{ padding: "6px 12px", fontSize: "0.8rem" }}>
                    Track this application →
                  </Link>
                </div>
              </div>
            )}

            {/* How Recovery Works */}
            <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid var(--neutral-200)", fontSize: "0.82rem", color: "var(--neutral-600)", lineHeight: "1.5" }}>
              <strong>How payment recovery works: </strong>
              Banks typically settle failed or delayed webhooks within 2 to 24 hours. If your payment was deducted but cannot be reconciled, the amount is automatically refunded to your source bank account within 3 to 5 banking days.
            </div>
          </div>
        </div>
      </main>
    </PortalPage>
  );
}
