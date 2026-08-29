"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { centralPublicAuthorities, findMatchingAuthorities, PublicAuthority } from "../../../lib/authorities-data";
import { useAuth } from "../../../lib/auth-context";

function RequestWizard() {
  const searchParams = useSearchParams();
  const authorityParam = searchParams.get("authority") || "";
  const queryParam = searchParams.get("query") || "";

  const { user } = useAuth();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Authority
  const [selectedAuthorityId, setSelectedAuthorityId] = useState<string>(authorityParam || "auth-mea");
  const [authSearch, setAuthSearch] = useState<string>("");

  // Step 2: Request
  const [subject, setSubject] = useState(queryParam || "");
  const [queryText, setQueryText] = useState("");
  const [attachedDocName, setAttachedDocName] = useState<string | null>(null);
  const [showAdvice, setShowAdvice] = useState(false);

  // Step 3: Applicant Details
  const [applicantName, setApplicantName] = useState(user?.name || "Rajesh Sharma");
  const [applicantEmail, setApplicantEmail] = useState(user?.email || "rajesh.sharma@example.gov.in");
  const [applicantMobile, setApplicantMobile] = useState(user?.mobile || "9876543210");
  const [applicantAddress, setApplicantAddress] = useState(user?.address || "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038");
  const [isBPL, setIsBPL] = useState(false);
  const [bplCertName, setBplCertName] = useState<string | null>(null);

  // Step 4: Payment & Submit
  const [paymentMethod, setPaymentMethod] = useState<"UPI" | "DEBIT" | "NETBANKING">("UPI");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRegNo, setSubmittedRegNo] = useState<string | null>(null);

  useEffect(() => {
    if (authorityParam) {
      setSelectedAuthorityId(authorityParam);
    }
    if (queryParam && !subject) {
      setSubject(queryParam);
    }
  }, [authorityParam, queryParam, subject]);

  const selectedAuthority = centralPublicAuthorities.find((a) => a.id === selectedAuthorityId) || centralPublicAuthorities[0];

  // Privacy Audit: Check if query contains Aadhaar (12 digits) or PAN pattern
  const hasAadhaarPattern = /\b\d{4}\s?\d{4}\s?\d{4}\b/.test(queryText);
  const hasPanPattern = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/i.test(queryText);

  // Search filtered authorities for Step 1
  const authorityList = authSearch.trim()
    ? findMatchingAuthorities(authSearch).map((r) => r.authority)
    : centralPublicAuthorities;

  function handleSubmit() {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRegNo("DOPT/R/2026/04812");
    }, 1200);
  }

  if (submittedRegNo) {
    return (
      <main className="wrap" style={{ padding: "48px 0 80px" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "36px", boxShadow: "var(--shadow-md)" }}>
          <div style={{ borderBottom: "1px solid var(--neutral-200)", paddingBottom: "20px", marginBottom: "24px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--forest-700)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Application Submitted Successfully
            </span>
            <h1 style={{ font: "700 1.8rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "4px 0 6px" }}>
              RTI Registration Number
            </h1>
            <div style={{ fontSize: "1.4rem", fontWeight: 800, fontFamily: "var(--font-number)", color: "var(--gov-navy-900)", background: "var(--neutral-100)", padding: "10px 14px", borderRadius: "var(--radius-sm)", display: "inline-block" }}>
              {submittedRegNo}
            </div>
            <p style={{ color: "var(--neutral-600)", fontSize: "0.85rem", margin: "10px 0 0" }}>
              An SMS and Email acknowledgment has been dispatched to <strong>{applicantEmail}</strong>.
            </p>
          </div>

          <div style={{ marginBottom: "28px" }}>
            <h2 style={{ font: "700 1.1rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 10px" }}>
              What happens next?
            </h2>
            <ol style={{ margin: 0, paddingLeft: "18px", fontSize: "0.88rem", color: "var(--neutral-700)", display: "grid", gap: "8px", lineHeight: "1.5" }}>
              <li>Your application will reach the Nodal Officer of <strong>{selectedAuthority.name}</strong>.</li>
              <li>The file will be assigned to the concerned Central Public Information Officer (CPIO).</li>
              <li>Under Section 7(1), a statutory response will be issued within <strong>30 days</strong>.</li>
              <li>You can view status updates or download the final signed response order on your dashboard.</li>
            </ol>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/dashboard" className="btn-file-primary">
              View in citizen dashboard →
            </Link>
            <button
              type="button"
              onClick={() => window.print()}
              style={{ padding: "8px 16px", background: "var(--neutral-100)", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer" }}
            >
              Print Receipt (PDF)
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="wrap" style={{ padding: "36px 0 80px" }}>
      <div className="bread">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/request/eligibility">Before you start</Link>
        <span>›</span>
        <span>File an RTI</span>
      </div>

      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        {/* USWDS Accessible 4-Step Indicator */}
        <nav aria-label="Application Progress" style={{ marginBottom: "32px" }}>
          <ol style={{ display: "flex", listStyle: "none", margin: 0, padding: 0, justifyContent: "space-between", borderBottom: "2px solid var(--neutral-200)", paddingBottom: "12px" }}>
            {[
              { num: 1, label: "Authority" },
              { num: 2, label: "Request" },
              { num: 3, label: "Details" },
              { num: 4, label: "Review & Submit" }
            ].map((s) => {
              const isCurrent = step === s.num;
              const isPast = step > s.num;
              return (
                <li key={s.num} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      width: "22px",
                      height: "22px",
                      borderRadius: "var(--radius-full)",
                      background: isCurrent ? "var(--gov-navy-900)" : isPast ? "var(--forest-700)" : "var(--neutral-300)",
                      color: "#ffffff",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    {isPast ? "✓" : s.num}
                  </span>
                  <span style={{ fontSize: "0.84rem", fontWeight: isCurrent ? 700 : 500, color: isCurrent ? "var(--gov-navy-950)" : "var(--neutral-600)" }}>
                    {s.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* STEP 1: WHERE SHOULD WE SEND YOUR REQUEST? */}
        {step === 1 && (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
            <h1 style={{ font: "700 1.6rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              Where should we send your request?
            </h1>
            <p style={{ color: "var(--neutral-600)", fontSize: "0.9rem", margin: "0 0 20px" }}>
              Select the Central Ministry, Department, or Autonomous Body that holds the records.
            </p>

            <div style={{ marginBottom: "18px" }}>
              <label htmlFor="authority-search" style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                Search public authority
              </label>
              <input
                id="authority-search"
                type="text"
                value={authSearch}
                onChange={(e) => setAuthSearch(e.target.value)}
                placeholder="Type department name (e.g. Passport, CBSE, EPFO, Revenue)..."
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ maxHeight: "240px", overflowY: "auto", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-sm)", marginBottom: "20px" }}>
              {authorityList.map((auth: any) => (
                <label
                  key={auth.id}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                    padding: "10px 14px",
                    borderBottom: "1px solid var(--neutral-100)",
                    cursor: "pointer",
                    background: selectedAuthorityId === auth.id ? "var(--neutral-100)" : "#ffffff"
                  }}
                >
                  <input
                    type="radio"
                    name="authorityRadio"
                    checked={selectedAuthorityId === auth.id}
                    onChange={() => setSelectedAuthorityId(auth.id)}
                    style={{ marginTop: "3px" }}
                  />
                  <div>
                    <strong style={{ fontSize: "0.88rem", color: "var(--gov-navy-950)", display: "block" }}>{auth.name}</strong>
                    <span style={{ fontSize: "0.78rem", color: "var(--neutral-500)" }}>{auth.ministry}</span>
                  </div>
                </label>
              ))}
            </div>

            <div style={{ background: "var(--neutral-50)", borderLeft: "3px solid var(--gov-navy-900)", padding: "12px 14px", fontSize: "0.82rem", color: "var(--neutral-700)" }}>
              <strong>Routing path: </strong>{selectedAuthority.nodalOfficerDesc}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "28px", paddingTop: "16px", borderTop: "1px solid var(--neutral-200)" }}>
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => setStep(2)}
              >
                Continue (2 of 4) →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: WHAT INFORMATION DO YOU NEED? */}
        {step === 2 && (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
            <h1 style={{ font: "700 1.6rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              What information do you need?
            </h1>
            <p style={{ color: "var(--neutral-600)", fontSize: "0.9rem", margin: "0 0 20px" }}>
              Recipient: <strong>{selectedAuthority.name}</strong>
            </p>

            <div style={{ marginBottom: "18px" }}>
              <label htmlFor="subject-input" style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                Subject / Summary of Request <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <input
                id="subject-input"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Certified copy of passport verification report and dispatch log"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <label htmlFor="query-textarea" style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--gov-navy-950)" }}>
                  Specific Questions / Information Requested <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <span style={{ fontSize: "0.78rem", color: queryText.length > 3000 ? "#dc2626" : "var(--neutral-500)" }}>
                  {queryText.length} / 3,000 characters
                </span>
              </div>
              <textarea
                id="query-textarea"
                rows={7}
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="Please provide numbered, specific questions (e.g. 1. Certified copy of file note... 2. Dispatch date of file...)"
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem", lineHeight: "1.5" }}
              />
            </div>

            {/* Subtle Writing Assistant (No Purple AI Slop) */}
            <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-sm)", padding: "12px 14px", marginBottom: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--neutral-700)" }}>
                  Need help making your request clearer?
                </span>
                <button
                  type="button"
                  onClick={() => setShowAdvice(!showAdvice)}
                  style={{ background: "transparent", border: 0, color: "var(--gov-blue-600)", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer" }}
                >
                  {showAdvice ? "Hide tips" : "Check suggestions"}
                </button>
              </div>

              {showAdvice && (
                <ul style={{ margin: "10px 0 0", paddingLeft: "16px", fontSize: "0.8rem", color: "var(--neutral-600)", display: "grid", gap: "4px" }}>
                  <li>Ask for specific official records or documents rather than asking open-ended &quot;why&quot; questions.</li>
                  <li>Include your application reference number or date if asking about a specific transaction.</li>
                  <li>Keep questions numbered so the CPIO can answer each point directly.</li>
                </ul>
              )}
            </div>

            {/* Supporting Document Upload */}
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontSize: "0.84rem", fontWeight: 600, color: "var(--neutral-700)", marginBottom: "4px" }}>
                Attach Supporting Document (Optional PDF, max 1MB)
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setAttachedDocName(e.target.files[0].name);
                  }
                }}
                style={{ fontSize: "0.82rem" }}
              />
              {attachedDocName && (
                <div style={{ fontSize: "0.78rem", color: "var(--forest-700)", marginTop: "4px" }}>
                  ✓ Attached: {attachedDocName}
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px", paddingTop: "16px", borderTop: "1px solid var(--neutral-200)" }}>
              <button
                type="button"
                onClick={() => setStep(1)}
                style={{ background: "transparent", border: "1px solid var(--neutral-300)", padding: "8px 16px", borderRadius: "var(--radius-md)", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer" }}
              >
                ← Back
              </button>
              <button
                type="button"
                className="btn-hero-primary"
                disabled={!subject.trim() || !queryText.trim()}
                onClick={() => setStep(3)}
              >
                Continue (3 of 4) →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: YOUR DETAILS */}
        {step === 3 && (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
            <h1 style={{ font: "700 1.6rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              Your contact details
            </h1>
            <p style={{ color: "var(--neutral-600)", fontSize: "0.9rem", margin: "0 0 20px" }}>
              Required for official communication, SMS alerts, and postal dispatch of certified records.
            </p>

            <div style={{ display: "grid", gap: "16px" }}>
              <div>
                <label htmlFor="app-name" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                  Full Name <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  id="app-name"
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label htmlFor="app-email" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                    Email Address <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    id="app-email"
                    type="email"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
                  />
                </div>
                <div>
                  <label htmlFor="app-mobile" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                    Mobile Number <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    id="app-mobile"
                    type="tel"
                    value={applicantMobile}
                    onChange={(e) => setApplicantMobile(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="app-addr" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                  Postal Address for Receiving Reply <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <input
                  id="app-addr"
                  type="text"
                  value={applicantAddress}
                  onChange={(e) => setApplicantAddress(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
                />
              </div>

              {/* BPL Exemption Checkbox */}
              <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-sm)", padding: "14px", marginTop: "8px" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", cursor: "pointer", fontSize: "0.88rem" }}>
                  <input
                    type="checkbox"
                    checked={isBPL}
                    onChange={(e) => setIsBPL(e.target.checked)}
                    style={{ marginTop: "3px" }}
                  />
                  <div>
                    <strong style={{ color: "var(--gov-navy-950)", display: "block" }}>Below Poverty Line (BPL) Fee Exemption</strong>
                    <span style={{ fontSize: "0.78rem", color: "var(--neutral-600)" }}>
                      Under RTI Rules, citizens holding valid BPL cards pay ₹0 application fee.
                    </span>
                  </div>
                </label>

                {isBPL && (
                  <div style={{ marginTop: "10px", paddingTop: "10px", borderTop: "1px solid var(--neutral-200)" }}>
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "var(--neutral-700)", marginBottom: "4px" }}>
                      Upload BPL Card / Certificate (PDF/Image)
                    </label>
                    <input
                      type="file"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setBplCertName(e.target.files[0].name);
                        }
                      }}
                      style={{ fontSize: "0.8rem" }}
                    />
                    {bplCertName && (
                      <span style={{ fontSize: "0.76rem", color: "var(--forest-700)", display: "block", marginTop: "2px" }}>
                        ✓ {bplCertName}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px", paddingTop: "16px", borderTop: "1px solid var(--neutral-200)" }}>
              <button
                type="button"
                onClick={() => setStep(2)}
                style={{ background: "transparent", border: "1px solid var(--neutral-300)", padding: "8px 16px", borderRadius: "var(--radius-md)", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer" }}
              >
                ← Back
              </button>
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => setStep(4)}
              >
                Review & submit (4 of 4) →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CHECK AND SUBMIT */}
        {step === 4 && (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
            <h1 style={{ font: "700 1.6rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              Check and submit your request
            </h1>
            <p style={{ color: "var(--neutral-600)", fontSize: "0.9rem", margin: "0 0 20px" }}>
              Please review your application summary before confirming submission.
            </p>

            {/* PRE-SUBMISSION QUALITY & PRIVACY AUDIT */}
            {(hasAadhaarPattern || hasPanPattern) && (
              <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "var(--radius-sm)", padding: "12px 16px", marginBottom: "20px", fontSize: "0.84rem" }}>
                <strong style={{ color: "#92400e", display: "block", marginBottom: "2px" }}>
                  Privacy suggestion:
                </strong>
                <span style={{ color: "#78350f" }}>
                  Your request appears to contain sensitive personal identifiers (Aadhaar or PAN number). RTI responses are public records. Consider masking or removing personal identifiers unless strictly necessary.
                </span>
              </div>
            )}

            {/* Summary Table */}
            <div style={{ border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-sm)", padding: "16px", marginBottom: "20px", fontSize: "0.86rem", display: "grid", gap: "10px" }}>
              <div>
                <span style={{ color: "var(--neutral-500)", display: "block", fontSize: "0.76rem" }}>Public Authority:</span>
                <strong>{selectedAuthority.name}</strong> ({selectedAuthority.ministry})
              </div>
              <div>
                <span style={{ color: "var(--neutral-500)", display: "block", fontSize: "0.76rem" }}>Subject:</span>
                <strong>{subject}</strong>
              </div>
              <div>
                <span style={{ color: "var(--neutral-500)", display: "block", fontSize: "0.76rem" }}>Applicant:</span>
                <div>{applicantName} · +91 {applicantMobile} · {applicantEmail}</div>
                <div style={{ color: "var(--neutral-600)", fontSize: "0.8rem" }}>{applicantAddress}</div>
              </div>
              <div>
                <span style={{ color: "var(--neutral-500)", display: "block", fontSize: "0.76rem" }}>Application Fee:</span>
                <strong>{isBPL ? "₹0 (BPL Exemption Claimed)" : "₹10 (Statutory Fee)"}</strong>
              </div>
            </div>

            {/* Fee Mode Selection (if not BPL) */}
            {!isBPL && (
              <div style={{ marginBottom: "24px" }}>
                <label style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "8px" }}>
                  Select Payment Method (₹10)
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                  {[
                    { id: "UPI", label: "UPI / QR Code" },
                    { id: "DEBIT", label: "Debit Card / RuPay" },
                    { id: "NETBANKING", label: "Net Banking" }
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      style={{
                        padding: "10px",
                        border: paymentMethod === m.id ? "2px solid var(--gov-navy-900)" : "1px solid var(--neutral-300)",
                        background: paymentMethod === m.id ? "var(--neutral-100)" : "#ffffff",
                        borderRadius: "var(--radius-sm)",
                        fontSize: "0.82rem",
                        fontWeight: 600,
                        cursor: "pointer"
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px", paddingTop: "16px", borderTop: "1px solid var(--neutral-200)" }}>
              <button
                type="button"
                onClick={() => setStep(3)}
                style={{ background: "transparent", border: "1px solid var(--neutral-300)", padding: "8px 16px", borderRadius: "var(--radius-md)", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer" }}
              >
                ← Back
              </button>
              <button
                type="button"
                className="btn-hero-primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting application..." : isBPL ? "Submit Application (₹0) →" : "Pay ₹10 & Submit Application →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function NewRtiPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "40px 0" }}>Loading RTI filing wizard...</div>}>
        <RequestWizard />
      </Suspense>
    </PortalPage>
  );
}
