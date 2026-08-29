"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { useAuth } from "../../../lib/auth-context";

function NewAppealWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const regNoParam = searchParams.get("regNo") || "DOPT/R/2026/04812";

  const { applications } = useAuth();
  const matchedApp = applications.find((a) => a.regNo === regNoParam);

  const [appealReason, setAppealReason] = useState<string>("NO_RESPONSE");
  const [appealGrounds, setAppealGrounds] = useState<string>(
    "The statutory 30-day timeline expired without any response or interim notice from the CPIO. Kindly direct the CPIO to furnish the requested records free of charge."
  );
  const [attachedPdf, setAttachedPdf] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [appealRegNo, setAppealRegNo] = useState<string>("");

  function handleSubmit() {
    const newAppealNo = `FAA/A/2026/${Math.floor(10000 + Math.random() * 90000)}`;
    setAppealRegNo(newAppealNo);
    setIsSubmitted(true);
  }

  if (isSubmitted) {
    return (
      <main className="wrap" style={{ padding: "40px 20px 80px" }}>
        <div className="form-wrap">
          <div style={{ background: "var(--success-50)", border: "2px solid var(--success-600)", borderRadius: "var(--radius-lg)", padding: "32px 28px", textAlign: "center", marginBottom: "28px" }}>
            <h1 style={{ fontSize: "1.75rem", color: "var(--success-700)", margin: "0 0 8px" }}>
              First Appeal submitted
            </h1>
            <p style={{ fontSize: "1rem", color: "var(--neutral-700)", margin: "0 0 16px" }}>
              Your appeal has been assigned to the First Appellate Authority (FAA).
            </p>
            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "14px 20px", display: "inline-block" }}>
              <span style={{ fontSize: "0.8125rem", color: "var(--neutral-500)", display: "block", textTransform: "uppercase" }}>
                Appeal Registration Number
              </span>
              <strong style={{ fontSize: "1.5rem", color: "var(--gov-navy-950)", fontFamily: "var(--font-number)" }}>
                {appealRegNo}
              </strong>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--neutral-600)", marginTop: "12px", marginBottom: 0 }}>
              Under Section 19(6), the FAA must dispose of the appeal within 30 to 45 days. No fee was charged.
            </p>
          </div>

          <div style={{ display: "flex", gap: "12px" }}>
            <Link href="/dashboard" className="btn-primary-action">
              View in My Requests →
            </Link>
            <Link href="/" className="btn-secondary-action">
              Return to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="wrap" style={{ padding: "40px 20px 80px" }}>
      <div className="bread">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/appeal">First Appeal</Link>
        <span>›</span>
        <span>File appeal</span>
      </div>

      <div className="form-wrap">
        <h1 style={{ fontSize: "1.75rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
          File a First Appeal
        </h1>
        <p style={{ fontSize: "0.9375rem", color: "var(--neutral-600)", margin: "0 0 24px" }}>
          Appeal against the response or delay of RTI application <strong>{regNoParam}</strong>.
        </p>

        {/* Original Application Card */}
        <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", padding: "16px 18px", marginBottom: "24px", fontSize: "0.875rem" }}>
          <div><strong>Original RTI Reg No:</strong> {regNoParam}</div>
          <div><strong>Subject:</strong> {matchedApp?.subject || "Official inspection and status records"}</div>
          <div><strong>Authority:</strong> {matchedApp?.department || "Department of Personnel & Training"} ({matchedApp?.ministry || "Ministry of Personnel"})</div>
          <div><strong>Statutory Fee:</strong> ₹0 (Free under Section 19)</div>
        </div>

        {/* Appeal Form */}
        <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
          <div className="form-group">
            <label style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--gov-navy-950)", marginBottom: "10px", display: "block" }}>
              Why are you appealing? <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <div style={{ display: "grid", gap: "10px" }}>
              {[
                { id: "NO_RESPONSE", label: "No response received within 30 days (Deemed Refusal)" },
                { id: "INCOMPLETE", label: "Information provided was incomplete or misleading" },
                { id: "DENIED", label: "Information was improperly denied under exemptions" },
                { id: "FEE_INCORRECT", label: "Additional photocopy fee requested appears unreasonable" },
                { id: "OTHER", label: "Other grounds of dissatisfaction" }
              ].map((r) => (
                <label key={r.id} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9375rem", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="appealReason"
                    checked={appealReason === r.id}
                    onChange={() => setAppealReason(r.id)}
                  />
                  {r.label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="appeal-grounds-text">Grounds of Appeal <span style={{ color: "#dc2626" }}>*</span></label>
            <div className="form-hint">State clearly why the CPIO&apos;s decision should be overturned or directed.</div>
            <textarea
              id="appeal-grounds-text"
              rows={6}
              value={appealGrounds}
              onChange={(e) => setAppealGrounds(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="appeal-attach">Supporting PDF Document (Optional)</label>
            <input
              id="appeal-attach"
              type="file"
              accept=".pdf"
              onChange={(e) => setAttachedPdf(e.target.files?.[0]?.name || "")}
              className="form-control"
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px" }}>
            <Link href="/appeal" className="btn-secondary-action">
              ← Cancel
            </Link>
            <button type="button" className="btn-primary-action" onClick={handleSubmit}>
              Submit First Appeal (₹0) →
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function NewAppealWizardPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "40px 0" }}>Loading...</div>}>
        <NewAppealWizardContent />
      </Suspense>
    </PortalPage>
  );
}
