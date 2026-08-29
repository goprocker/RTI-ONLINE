"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { useAuth } from "../../../lib/auth-context";

function AppealForm() {
  const searchParams = useSearchParams();
  const regNoParam = searchParams.get("regNo") || "DOPT/R/2026/04812";

  const { applications } = useAuth();
  const originalApp = applications.find((a) => a.regNo === regNoParam) || applications[0];

  const [appealReason, setAppealReason] = useState<string>("NO_RESPONSE");
  const [appealGrounds, setAppealGrounds] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppealNo, setSubmittedAppealNo] = useState<string | null>(null);

  function handleSubmitAppeal() {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedAppealNo(`FAA/A/2026/${Math.floor(1000 + Math.random() * 9000)}`);
    }, 1000);
  }

  if (submittedAppealNo) {
    return (
      <main className="wrap" style={{ padding: "48px 0 80px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "36px", boxShadow: "var(--shadow-md)" }}>
          <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--forest-700)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            First Appeal Submitted
          </span>
          <h1 style={{ font: "700 1.8rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "4px 0 8px" }}>
            Appeal Reference Number
          </h1>
          <div style={{ fontSize: "1.35rem", fontWeight: 800, fontFamily: "var(--font-number)", color: "var(--gov-navy-900)", background: "var(--neutral-100)", padding: "10px 14px", borderRadius: "var(--radius-sm)", display: "inline-block", marginBottom: "16px" }}>
            {submittedAppealNo}
          </div>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.88rem", margin: "0 0 20px" }}>
            Transmitted to the <strong>First Appellate Authority (FAA)</strong> of {originalApp.publicAuthority}. Under Section 19(6), a decision order will be issued within <strong>30 to 45 days</strong>.
          </p>

          <Link href="/dashboard" className="btn-file-primary">
            View in citizen dashboard →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="wrap" style={{ padding: "36px 0 80px" }}>
      <div className="bread">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/appeal">First Appeal</Link>
        <span>›</span>
        <span>File Appeal</span>
      </div>

      <div style={{ maxWidth: "640px", margin: "0 auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <h1 style={{ font: "700 1.8rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
            File a First Appeal
          </h1>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.9rem", margin: 0 }}>
            Under Section 19(1) of the RTI Act · Zero Statutory Fee
          </p>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
          {/* Original RTI Details */}
          <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-sm)", padding: "14px", marginBottom: "24px", fontSize: "0.85rem" }}>
            <div style={{ color: "var(--neutral-500)", fontSize: "0.76rem" }}>Original RTI Reference:</div>
            <strong style={{ color: "var(--gov-navy-950)" }}>{originalApp.regNo}</strong> — {originalApp.subject}
            <div style={{ color: "var(--neutral-600)", marginTop: "2px" }}>Authority: {originalApp.publicAuthority} ({originalApp.ministry})</div>
          </div>

          {/* Reason for Appeal */}
          <fieldset style={{ border: 0, padding: 0, margin: "0 0 20px" }}>
            <legend style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--gov-navy-950)", marginBottom: "10px" }}>
              Why are you appealing? <span style={{ color: "#dc2626" }}>*</span>
            </legend>

            <div style={{ display: "grid", gap: "8px" }}>
              {[
                { id: "NO_RESPONSE", label: "No response received within statutory 30 days" },
                { id: "INCOMPLETE", label: "Information provided was incomplete or evasive" },
                { id: "DENIED", label: "Information was denied without valid statutory exemption" },
                { id: "FEE_DISPUTE", label: "Photocopy or calculation fee demanded appears unreasonable" },
                { id: "OTHER", label: "Other grievance regarding CPIO order" }
              ].map((opt) => (
                <label key={opt.id} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", cursor: "pointer" }}>
                  <input
                    type="radio"
                    name="appealReason"
                    checked={appealReason === opt.id}
                    onChange={() => setAppealReason(opt.id)}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Appeal Grounds Text */}
          <div style={{ marginBottom: "24px" }}>
            <label htmlFor="appeal-grounds" style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
              Grounds of Appeal / Specific Grievance <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <textarea
              id="appeal-grounds"
              rows={5}
              value={appealGrounds}
              onChange={(e) => setAppealGrounds(e.target.value)}
              placeholder="State why the CPIO response was unsatisfactory or specify that no response was received within 30 days..."
              style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", lineHeight: "1.5" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "18px", borderTop: "1px solid var(--neutral-200)" }}>
            <span style={{ fontSize: "0.82rem", color: "var(--forest-700)", fontWeight: 700 }}>
              Fee: ₹0 (Free Statutory Appeal)
            </span>
            <button
              type="button"
              className="btn-hero-primary"
              onClick={handleSubmitAppeal}
              disabled={isSubmitting || !appealGrounds.trim()}
            >
              {isSubmitting ? "Submitting appeal..." : "Submit First Appeal →"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function NewFirstAppealPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "40px 0" }}>Loading appeal wizard...</div>}>
        <AppealForm />
      </Suspense>
    </PortalPage>
  );
}
