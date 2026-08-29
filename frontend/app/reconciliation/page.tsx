"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";

export default function PaymentIssuePage() {
  const [txnRef, setTxnRef] = useState("");
  const [contact, setContact] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<null | {
    found: boolean;
    regNo?: string;
    amount?: number;
    status?: string;
    date?: string;
  }>(null);

  function handleCheck() {
    if (!txnRef.trim()) {
      alert("Please enter a transaction reference number or bank UTR.");
      return;
    }

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setResult({
        found: true,
        regNo: "DOPT/R/2026/04812",
        amount: 10,
        status: "RECONCILED",
        date: new Date().toLocaleDateString("en-IN")
      });
    }, 1000);
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 20px 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Payment issue</span>
        </div>

        <div className="form-wrap">
          <h1 style={{ fontSize: "1.75rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            Payment deducted but no RTI number?
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "var(--neutral-600)", lineHeight: "1.5", margin: "0 0 28px" }}>
            If ₹10 was debited from your bank account or UPI but your internet session disconnected before receiving a registration number, check the status of your payment below.
          </p>

          {/* Search Card */}
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)", marginBottom: "28px" }}>
            <div className="form-group">
              <label htmlFor="txn-ref-input">Bank Transaction Reference / UTR Number <span style={{ color: "#dc2626" }}>*</span></label>
              <div className="form-hint">Found in your bank SMS, debit receipt, or UPI transaction history.</div>
              <input
                id="txn-ref-input"
                type="text"
                value={txnRef}
                onChange={(e) => setTxnRef(e.target.value)}
                placeholder="e.g. 402918482019 or UPI-REF-XXXX"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-input">Email or Mobile Number Used</label>
              <input
                id="contact-input"
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="e.g. 9876543210 or name@example.com"
                className="form-control"
              />
            </div>

            <button
              type="button"
              className="btn-primary-action"
              onClick={handleCheck}
              disabled={isSearching}
              style={{ width: "100%", padding: "12px" }}
            >
              {isSearching ? "Checking payment status..." : "Check payment status →"}
            </button>
          </div>

          {/* Result Card */}
          {result && (
            <div style={{ background: "var(--success-50)", border: "1px solid var(--success-600)", borderRadius: "var(--radius-lg)", padding: "20px", marginBottom: "28px" }}>
              <strong style={{ color: "var(--success-700)", display: "block", fontSize: "1rem", marginBottom: "6px" }}>
                Payment verified & linked
              </strong>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-800)", margin: "0 0 12px", lineHeight: "1.5" }}>
                Your payment of ₹{result.amount} was confirmed. Your application registration number is:
              </p>
              <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", padding: "10px 16px", borderRadius: "var(--radius-md)", display: "inline-block", marginBottom: "14px" }}>
                <strong style={{ fontSize: "1.25rem", color: "var(--gov-navy-950)", fontFamily: "var(--font-number)" }}>
                  {result.regNo}
                </strong>
              </div>
              <div>
                <Link href={`/status?regNo=${encodeURIComponent(result.regNo || "")}`} className="btn-primary-action" style={{ padding: "8px 14px", fontSize: "0.84rem" }}>
                  Track this application →
                </Link>
              </div>
            </div>
          )}

          {/* Explanation Box */}
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "22px", fontSize: "0.875rem", color: "var(--neutral-700)", lineHeight: "1.5" }}>
            <strong style={{ color: "var(--gov-navy-950)", display: "block", marginBottom: "8px" }}>
              How payment recovery works:
            </strong>
            <ul style={{ margin: 0, paddingLeft: "18px", display: "grid", gap: "6px" }}>
              <li>Banking servers reconcile pending transactions with the payment gateway every 15 to 30 minutes.</li>
              <li>Once reconciled, your Registration Number is automatically generated and dispatched via SMS/Email.</li>
              <li>If the payment failed at the bank side, your bank will automatically refund the ₹10 within 3 to 5 working days.</li>
            </ul>
          </div>
        </div>
      </main>
    </PortalPage>
  );
}
