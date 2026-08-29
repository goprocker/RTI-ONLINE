"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { useAuth } from "../../../lib/auth-context";
import { FirstAppeal } from "../../../types/rti";

function AppealFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, applications, submitAppeal } = useAuth();

  const queryRegNo = searchParams.get("regNo") || "DOPT/R/2026/04812";
  const matchedApp = applications.find(a => a.regNo.toLowerCase() === queryRegNo.toLowerCase());

  const [originalRegNo, setOriginalRegNo] = useState(queryRegNo);
  const [applicantEmail, setApplicantEmail] = useState(user?.email || matchedApp?.applicantEmail || "rajesh.sharma@example.gov.in");
  const [ministry, setMinistry] = useState(matchedApp?.ministry || "Ministry of Personnel, Public Grievances and Pensions");
  const [publicAuthority, setPublicAuthority] = useState(matchedApp?.publicAuthority || "Department of Personnel and Training");
  const [grounds, setGrounds] = useState("Incomplete / Vague information provided by CPIO");
  const [appealDetails, setAppealDetails] = useState("");
  const [attachedDoc, setAttachedDoc] = useState<string | null>("Original_CPIO_Reply.pdf");

  const [submittedAppeal, setSubmittedAppeal] = useState<FirstAppeal | null>(null);

  useEffect(() => {
    if (matchedApp) {
      setMinistry(matchedApp.ministry);
      setPublicAuthority(matchedApp.publicAuthority);
      if (matchedApp.applicantEmail) setApplicantEmail(matchedApp.applicantEmail);
    }
  }, [matchedApp]);

  function handleSubmitAppeal(e: React.FormEvent) {
    e.preventDefault();
    if (!appealDetails.trim()) {
      alert("Please provide the grounds and details of your appeal.");
      return;
    }

    const appeal = submitAppeal({
      originalRtiRegNo: originalRegNo,
      ministry,
      publicAuthority,
      groundsOfAppeal: grounds,
      appealDetails,
      attachedDocName: attachedDoc || undefined,
      appellateAuthority: `First Appellate Authority (FAA), ${publicAuthority}`
    });

    setSubmittedAppeal(appeal);
  }

  // SCREEN 26: FIRST APPEAL SUBMISSION SUCCESS
  if (submittedAppeal) {
    return (
      <div className="wizard-page wrap" style={{ padding: "40px 0 80px" }}>
        <div className="success-card">
          <div className="success-header-badge" style={{ background: "var(--forest-100)", color: "var(--forest-700)", borderColor: "#a7f3d0" }}>
            <span>✓</span> FIRST APPEAL SUBMITTED (ZERO FEE)
          </div>

          <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            First Appeal Registered
          </h1>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.95rem", margin: 0 }}>
            Your First Appeal under Section 19(1) of the RTI Act, 2005 has been electronically transmitted to the First Appellate Authority.
          </p>

          <div className="success-reg-box" style={{ background: "linear-gradient(135deg, var(--gov-navy-950) 0%, var(--gov-blue-800) 100%)" }}>
            <div>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", color: "#bfdbfe", textTransform: "uppercase", fontWeight: 700 }}>
                APPEAL REGISTRATION NUMBER
              </span>
              <div className="success-reg-num">{submittedAppeal.appealRegNo}</div>
              <div className="success-reg-meta">
                Original RTI: <strong>{submittedAppeal.originalRtiRegNo}</strong> · Authority: {submittedAppeal.publicAuthority}
              </div>
            </div>

            <div>
              <button
                type="button"
                className="btn-secondary-action"
                style={{ background: "#ffffff", color: "var(--gov-navy-950)", fontSize: "0.82rem" }}
                onClick={() => alert(`First Appeal Acknowledgement for ${submittedAppeal.appealRegNo} downloaded.`)}
              >
                📥 Download Appeal Copy
              </button>
            </div>
          </div>

          {/* SCREEN 27: APPEAL TIMELINE ROADMAP */}
          <div className="what-next-section">
            <h3 style={{ margin: "0 0 12px" }}>FIRST APPEAL STATUTORY TIMELINE</h3>
            <div className="roadmap-flow">
              <div className="roadmap-step active">
                <div className="roadmap-step-num">1. SUBMITTED</div>
                <div className="roadmap-step-title">✓ Appeal Submitted</div>
                <span style={{ fontSize: "0.72rem", color: "var(--forest-700)" }}>{submittedAppeal.filingDate}</span>
              </div>
              <div className="roadmap-step">
                <div className="roadmap-step-num">2. SCRUTINY</div>
                <div className="roadmap-step-title">FAA Scrutiny</div>
                <span style={{ fontSize: "0.72rem", color: "var(--neutral-500)" }}>Under Review</span>
              </div>
              <div className="roadmap-step">
                <div className="roadmap-step-num">3. HEARING / ORDER</div>
                <div className="roadmap-step-title">Statutory Order</div>
                <span style={{ fontSize: "0.72rem", color: "var(--neutral-500)" }}>30 to 45 Days Window</span>
              </div>
            </div>
          </div>

          {/* SCREEN 28: WHAT IF NOT SATISFIED (CIC LINK) */}
          <div style={{ background: "var(--gov-blue-50)", border: "1px solid #bfdbfe", padding: "16px 20px", borderRadius: "var(--radius-lg)", marginTop: "24px", textAlign: "left" }}>
            <strong style={{ color: "var(--gov-navy-950)", display: "block", marginBottom: "2px" }}>
              Central Information Commission (CIC) Escalation Rights
            </strong>
            <p style={{ margin: 0, fontSize: "0.84rem", color: "var(--neutral-700)", lineHeight: "1.5" }}>
              If the First Appellate Authority does not issue an order within 30–45 days, or if you remain dissatisfied with the decision, you can escalate your case directly to the <strong>Central Information Commission (CIC)</strong> for a Second Appeal under Section 19(3).
            </p>
            <Link
              href="/appeal/cic"
              style={{ display: "inline-block", marginTop: "8px", fontSize: "0.82rem", fontWeight: 700, color: "var(--gov-blue-600)" }}
            >
              Learn about CIC Second Appeal Process →
            </Link>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--neutral-200)" }}>
            <Link href="/dashboard" className="btn-primary-action">
              Return to Citizen Dashboard →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 25: FIRST APPEAL FORM
  return (
    <div className="wizard-page wrap" style={{ padding: "40px 0 80px" }}>
      <div className="bread">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/dashboard">Dashboard</Link>
        <span>›</span>
        <span>File First Appeal</span>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto", background: "#ffffff", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "38px", boxShadow: "var(--shadow-lg)" }}>
        <p className="eyebrow" style={{ marginBottom: "6px" }}>
          <span className="eyebrow-line" />
          SECTION 19(1) · FIRST APPELLATE AUTHORITY
        </p>
        <h1 style={{ font: "700 2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
          File First Appeal
        </h1>
        <p style={{ color: "var(--neutral-600)", fontSize: "0.92rem", margin: "0 0 24px" }}>
          Under Section 19(1) of the RTI Act 2005, an applicant aggrieved by a CPIO decision or lack of response within 30 days may prefer an appeal to the First Appellate Authority. <strong>No fee is payable for First Appeal.</strong>
        </p>

        {/* Linked RTI Card */}
        <div style={{ background: "var(--neutral-50)", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "18px 20px", marginBottom: "24px" }}>
          <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--gov-blue-600)", textTransform: "uppercase" }}>
            LINKED ORIGINAL RTI APPLICATION
          </span>
          <div style={{ font: "700 1.2rem var(--font-number)", color: "var(--gov-navy-950)", margin: "4px 0" }}>
            {originalRegNo}
          </div>
          <div style={{ fontSize: "0.85rem", color: "var(--neutral-700)" }}>
            Public Authority: <strong>{publicAuthority}</strong> ({ministry})
          </div>
        </div>

        <form onSubmit={handleSubmitAppeal}>
          <div className="form-row-2">
            <div className="form-group">
              <label htmlFor="orig-reg-no">Original RTI Registration Number <span className="required">*</span></label>
              <input
                id="orig-reg-no"
                className="form-control"
                type="text"
                required
                value={originalRegNo}
                onChange={(e) => setOriginalRegNo(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="orig-email">Registered Email Address <span className="required">*</span></label>
              <input
                id="orig-email"
                className="form-control"
                type="email"
                required
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="appeal-grounds">Grounds for First Appeal <span className="required">*</span></label>
            <select
              id="appeal-grounds"
              className="form-control"
              value={grounds}
              onChange={(e) => setGrounds(e.target.value)}
            >
              <option>Incomplete / Vague information provided by CPIO</option>
              <option>No response received within statutory 30-day window</option>
              <option>Incorrect / Misleading response furnished</option>
              <option>Groundless refusal / Section 8 exemption misapplied</option>
              <option>Exorbitant or unjustified additional fees demanded</option>
              <option>Other statutory grounds</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="appeal-detail-text">
              Explain your grounds for appeal & prayer / relief sought <span className="required">*</span>
            </label>
            <textarea
              id="appeal-detail-text"
              className="form-control"
              rows={6}
              required
              value={appealDetails}
              onChange={(e) => setAppealDetails(e.target.value)}
              placeholder="Explain clearly why the response of the CPIO is unsatisfactory or what records remain pending..."
            />
          </div>

          <div className="doc-upload-box" style={{ marginBottom: "24px" }}>
            <div className="upload-icon">📄</div>
            <div className="upload-text">
              <strong>Supporting Documents (Copy of CPIO reply / RTI application)</strong>
            </div>
            {attachedDoc ? (
              <div style={{ marginTop: "8px", display: "inline-flex", alignItems: "center", gap: "8px", background: "#ffffff", border: "1px solid var(--forest-600)", padding: "4px 12px", borderRadius: "var(--radius-md)", fontSize: "0.82rem", color: "var(--forest-700)" }}>
                <span>✓ Attached: {attachedDoc}</span>
                <button type="button" onClick={() => setAttachedDoc(null)} style={{ background: "none", border: 0, color: "#dc2626", cursor: "pointer" }}>✕</button>
              </div>
            ) : (
              <button
                type="button"
                className="btn-secondary-action"
                style={{ marginTop: "8px", padding: "6px 12px", fontSize: "0.8rem" }}
                onClick={() => setAttachedDoc("CPIO_Reply_And_Prayer.pdf")}
              >
                + Upload Appeal Document (Demo Simulation)
              </button>
            )}
          </div>

          <div style={{ background: "var(--forest-50)", border: "1px solid #a7f3d0", padding: "14px 16px", borderRadius: "var(--radius-md)", fontSize: "0.86rem", color: "var(--forest-700)", marginBottom: "24px" }}>
            ✓ <strong>Application Fee: ₹0</strong> — No fee is prescribed for First Appeals under Central RTI Rules.
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--neutral-200)", paddingTop: "20px" }}>
            <Link href="/dashboard" className="btn-secondary-action">
              Cancel & Return
            </Link>
            <button type="submit" className="btn-primary-action" style={{ background: "var(--forest-600)", borderColor: "var(--forest-700)" }}>
              Submit First Appeal (₹0 Fee) →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function NewAppealPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "80px 0", textAlign: "center" }}>Loading Appeal Portal...</div>}>
        <AppealFormContent />
      </Suspense>
    </PortalPage>
  );
}
