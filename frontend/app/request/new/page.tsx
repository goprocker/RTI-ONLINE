"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { publicAuthoritiesDatabase, PublicAuthorityRecord } from "../../../lib/authorities-data";
import { useAuth } from "../../../lib/auth-context";

function NewRTIWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authorityParam = searchParams.get("authority");
  const queryParam = searchParams.get("query");

  const { user, addApplication } = useAuth();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Authority
  const [selectedAuthorityId, setSelectedAuthorityId] = useState<string>(authorityParam || "auth-mea");
  const [authoritySearch, setAuthoritySearch] = useState<string>("");

  // Step 2: Request
  const [subject, setSubject] = useState<string>("Status and inspection notes of pending application");
  const [requestText, setRequestText] = useState<string>(
    queryParam
      ? `Regarding: ${queryParam}\n\nPlease provide official records under Section 6(1) of the RTI Act:\n1. Current processing status and file movement log.\n2. Certified copy of internal scrutiny notesheet.`
      : ""
  );
  const [attachedFileName, setAttachedFileName] = useState<string>("");
  const [showWritingTips, setShowWritingTips] = useState<boolean>(false);

  // Step 3: Applicant Details
  const [applicantName, setApplicantName] = useState<string>(user?.name || "Rajesh Sharma");
  const [gender, setGender] = useState<string>(user?.gender || "Male");
  const [address, setAddress] = useState<string>(user?.address || "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru");
  const [pincode, setPincode] = useState<string>(user?.pincode || "560038");
  const [state, setState] = useState<string>(user?.state || "Karnataka");
  const [mobile, setMobile] = useState<string>(user?.mobile || "9876543210");
  const [email, setEmail] = useState<string>(user?.email || "rajesh.sharma@example.gov.in");
  const [isBPL, setIsBPL] = useState<boolean>(false);
  const [bplCardNo, setBplCardNo] = useState<string>("");

  // Step 4: Payment Simulation
  const [paymentMode, setPaymentMode] = useState<"UPI" | "DEBIT" | "NET_BANKING">("UPI");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [generatedRegNo, setGeneratedRegNo] = useState<string>("");

  useEffect(() => {
    if (authorityParam) {
      setSelectedAuthorityId(authorityParam);
    }
  }, [authorityParam]);

  const selectedAuth = publicAuthoritiesDatabase.find((a) => a.id === selectedAuthorityId) || publicAuthoritiesDatabase[0];

  // Privacy Check (Detects 12-digit Aadhaar or 10-digit PAN format)
  const aadhaarRegex = /\b\d{4}\s?\d{4}\s?\d{4}\b/;
  const panRegex = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/;
  const hasAadhaar = aadhaarRegex.test(requestText);
  const hasPAN = panRegex.test(requestText);

  function handleNext() {
    if (currentStep === 1 && !selectedAuthorityId) {
      alert("Please select a Public Authority.");
      return;
    }
    if (currentStep === 2) {
      if (!subject.trim() || !requestText.trim()) {
        alert("Please enter a subject and describe your request.");
        return;
      }
    }
    if (currentStep === 3) {
      if (!applicantName.trim() || !mobile.trim() || !email.trim()) {
        alert("Please complete the required applicant contact fields.");
        return;
      }
    }
    setCurrentStep((prev) => (prev + 1) as any);
  }

  function handleBack() {
    setCurrentStep((prev) => (prev - 1) as any);
  }

  function handleFinalSubmit() {
    setIsSubmitting(true);
    setTimeout(() => {
      const reg = `DOPT/R/2026/${Math.floor(10000 + Math.random() * 90000)}`;
      setGeneratedRegNo(reg);

      addApplication({
        regNo: reg,
        subject: subject,
        ministry: selectedAuth.ministry,
        department: selectedAuth.name,
        filingDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        expectedDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        status: "SUBMITTED",
        statusLabel: "Submitted · Awaiting Nodal Assignment",
        remainingDays: 30,
        feePaid: isBPL ? 0 : 10,
        paymentRef: isBPL ? "BPL_EXEMPTION" : `PAY_UPI_${Math.floor(100000 + Math.random() * 900000)}`,
        applicantName,
        applicantEmail: email,
        applicantMobile: mobile,
        applicantAddress: address,
        isBPL,
        queryText: requestText,
        attachedDocName: attachedFileName || undefined,
        currentStageText: "File received electronically. Nodal officer will review jurisdiction and assign to concerned CPIO within 5 working days.",
        timeline: [
          {
            stage: "Application Submitted",
            date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
            desc: "Request filed online and payment reconciled.",
            completed: true
          },
          {
            stage: "Nodal Scrutiny",
            date: "Expected in 5 days",
            desc: "Nodal Officer verifies jurisdiction and assigns to CPIO.",
            completed: false
          },
          {
            stage: "CPIO Processing",
            date: "Expected in 20 days",
            desc: "CPIO retrieves official files and prepares response.",
            completed: false
          },
          {
            stage: "Response Issued",
            date: "Statutory limit: 30 days",
            desc: "Official reply furnished to citizen.",
            completed: false
          }
        ]
      });

      setIsSubmitting(false);
      setIsCompleted(true);
    }, 1200);
  }

  if (isCompleted) {
    return (
      <main className="wrap" style={{ padding: "40px 20px 80px" }}>
        <div className="form-wrap">
          {/* Confirmation Panel (GOV.UK Style) */}
          <div style={{ background: "var(--success-50)", border: "2px solid var(--success-600)", borderRadius: "var(--radius-lg)", padding: "32px 28px", textAlign: "center", marginBottom: "28px" }}>
            <h1 style={{ fontSize: "1.75rem", color: "var(--success-700)", margin: "0 0 8px" }}>
              Application submitted
            </h1>
            <p style={{ fontSize: "1rem", color: "var(--neutral-700)", margin: "0 0 16px" }}>
              Your RTI application has been received by the Public Authority.
            </p>
            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "14px 20px", display: "inline-block" }}>
              <span style={{ fontSize: "0.8125rem", color: "var(--neutral-500)", display: "block", textTransform: "uppercase" }}>
                Registration Number
              </span>
              <strong style={{ fontSize: "1.5rem", color: "var(--gov-navy-950)", fontFamily: "var(--font-number)" }}>
                {generatedRegNo}
              </strong>
            </div>
            <p style={{ fontSize: "0.8125rem", color: "var(--neutral-600)", marginTop: "12px", marginBottom: 0 }}>
              We have sent a confirmation email and SMS to <strong>{email}</strong>.
            </p>
          </div>

          {/* What Happens Next */}
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "24px", marginBottom: "28px" }}>
            <h2 style={{ fontSize: "1.125rem", color: "var(--gov-navy-950)", margin: "0 0 12px" }}>
              What happens next
            </h2>
            <ol style={{ margin: 0, paddingLeft: "20px", display: "grid", gap: "10px", fontSize: "0.875rem", color: "var(--neutral-700)", lineHeight: "1.5" }}>
              <li>The Ministry Nodal Officer will verify jurisdiction and assign your file to the concerned CPIO.</li>
              <li>The CPIO must furnish a response within the statutory 30-day window.</li>
              <li>If you do not receive a response or are dissatisfied, you can file a First Appeal at zero fee.</li>
            </ol>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/dashboard" className="btn-primary-action" style={{ padding: "10px 18px" }}>
              View in My Requests →
            </Link>
            <Link href="/" className="btn-secondary-action" style={{ padding: "10px 18px" }}>
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
        <Link href="/request/eligibility">Before you start</Link>
        <span>›</span>
        <span>File an RTI</span>
      </div>

      <div className="form-wrap">
        {/* USWDS Accessible Step Indicator */}
        <ol className="usa-step-indicator" aria-label="Application Progress">
          <li className={`usa-step-item ${currentStep === 1 ? "active" : currentStep > 1 ? "completed" : ""}`}>
            <div className="usa-step-circle">{currentStep > 1 ? "✓" : "1"}</div>
            <span className="usa-step-label">1. Authority</span>
          </li>
          <li className={`usa-step-item ${currentStep === 2 ? "active" : currentStep > 2 ? "completed" : ""}`}>
            <div className="usa-step-circle">{currentStep > 2 ? "✓" : "2"}</div>
            <span className="usa-step-label">2. Request</span>
          </li>
          <li className={`usa-step-item ${currentStep === 3 ? "active" : currentStep > 3 ? "completed" : ""}`}>
            <div className="usa-step-circle">{currentStep > 3 ? "✓" : "3"}</div>
            <span className="usa-step-label">3. Details</span>
          </li>
          <li className={`usa-step-item ${currentStep === 4 ? "active" : ""}`}>
            <div className="usa-step-circle">4</div>
            <span className="usa-step-label">4. Review</span>
          </li>
        </ol>

        {/* SCREEN 1: WHERE SHOULD WE SEND YOUR REQUEST? */}
        {currentStep === 1 && (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
            <h1 style={{ fontSize: "1.5rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              Where should we send your request?
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: "0 0 20px" }}>
              Select the Central Government ministry, department, or public authority that holds the records.
            </p>

            <div className="form-group">
              <label htmlFor="auth-filter-input">Filter Public Authorities</label>
              <input
                id="auth-filter-input"
                type="text"
                value={authoritySearch}
                onChange={(e) => setAuthoritySearch(e.target.value)}
                placeholder="Type to filter (e.g. Passport, EPFO, Railways, Education)..."
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auth-select">Selected Public Authority <span style={{ color: "#dc2626" }}>*</span></label>
              <select
                id="auth-select"
                value={selectedAuthorityId}
                onChange={(e) => setSelectedAuthorityId(e.target.value)}
                className="form-control"
              >
                {publicAuthoritiesDatabase
                  .filter((a) => !authoritySearch || a.name.toLowerCase().includes(authoritySearch.toLowerCase()) || a.ministry.toLowerCase().includes(authoritySearch.toLowerCase()))
                  .map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.ministry})
                    </option>
                  ))}
              </select>
            </div>

            {selectedAuth && (
              <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", padding: "14px 16px", marginTop: "16px", fontSize: "0.875rem" }}>
                <strong style={{ color: "var(--gov-navy-950)", display: "block", marginBottom: "4px" }}>
                  Routing details:
                </strong>
                <p style={{ margin: 0, color: "var(--neutral-600)", lineHeight: "1.4" }}>
                  {selectedAuth.nodalOfficerDesc}
                </p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "28px" }}>
              <button type="button" className="btn-primary-action" onClick={handleNext}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: WHAT INFORMATION DO YOU NEED? */}
        {currentStep === 2 && (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
            <h1 style={{ fontSize: "1.5rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              What information do you need?
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: "0 0 20px" }}>
              Be specific about the documents, circulars, or records you are requesting.
            </p>

            <div className="form-group">
              <label htmlFor="request-subject">Subject <span style={{ color: "#dc2626" }}>*</span></label>
              <input
                id="request-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Certified copy of inspection report"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <label htmlFor="request-body">Description of records <span style={{ color: "#dc2626" }}>*</span></label>
                <span style={{ fontSize: "0.75rem", color: requestText.length > 3000 ? "#dc2626" : "var(--neutral-500)" }}>
                  {requestText.length} of 3,000 characters
                </span>
              </div>
              <div className="form-hint">
                You can attach a supporting PDF below if you need more space.
              </div>
              <textarea
                id="request-body"
                rows={7}
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                placeholder="1. Status of application number XXXXX.\n2. Certified copy of internal file notesheets."
                className="form-control"
              />
            </div>

            {/* Subtle Writing Assistant (Clean & Non-Intrusive) */}
            <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", padding: "14px 16px", marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--neutral-800)" }}>
                  Need help making your request clearer?
                </span>
                <button
                  type="button"
                  onClick={() => setShowWritingTips(!showWritingTips)}
                  style={{ background: "none", border: "none", color: "var(--gov-blue-600)", fontWeight: 600, fontSize: "0.8125rem", cursor: "pointer", padding: 0 }}
                >
                  {showWritingTips ? "Hide suggestions" : "Check my request"}
                </button>
              </div>

              {showWritingTips && (
                <div style={{ marginTop: "12px", borderTop: "1px solid var(--neutral-200)", paddingTop: "10px", fontSize: "0.8125rem", color: "var(--neutral-700)" }}>
                  <div style={{ fontWeight: 600, marginBottom: "6px" }}>Suggestions for effective RTI requests:</div>
                  <ul style={{ margin: 0, paddingLeft: "18px", display: "grid", gap: "4px" }}>
                    <li>Ask for specific official records (e.g. <em>&quot;certified copy of notesheet&quot;</em>) rather than asking <em>&quot;why&quot;</em> something happened.</li>
                    <li>Include relevant dates and inward reference numbers.</li>
                    <li>Avoid asking for opinions or hypothetical interpretations.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Supporting Document */}
            <div className="form-group">
              <label htmlFor="attach-pdf">Supporting PDF Document (Optional)</label>
              <div className="form-hint">Upload receipt, identity proof, or previous correspondence (max 5 MB).</div>
              <input
                id="attach-pdf"
                type="file"
                accept=".pdf"
                onChange={(e) => setAttachedFileName(e.target.files?.[0]?.name || "")}
                className="form-control"
              />
              {attachedFileName && (
                <div style={{ fontSize: "0.8125rem", color: "var(--gov-blue-600)", marginTop: "4px" }}>
                  Attached: {attachedFileName}
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px" }}>
              <button type="button" className="btn-secondary-action" onClick={handleBack}>
                ← Back
              </button>
              <button type="button" className="btn-primary-action" onClick={handleNext}>
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: YOUR DETAILS */}
        {currentStep === 3 && (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
            <h1 style={{ fontSize: "1.5rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              Your details
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: "0 0 20px" }}>
              Public authorities require applicant particulars to transmit statutory replies and notices.
            </p>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="name-input">Full Name <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="name-input" type="text" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="gender-select">Gender</label>
                <select id="gender-select" value={gender} onChange={(e) => setGender(e.target.value)} className="form-control">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Third Gender</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="addr-input">Postal Address for Receiving Reply <span style={{ color: "#dc2626" }}>*</span></label>
              <input id="addr-input" type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" />
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="pin-input">PIN Code <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="pin-input" type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="state-input">State / UT <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="state-input" type="text" value={state} onChange={(e) => setState(e.target.value)} className="form-control" />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="mobile-input">Mobile Number <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="mobile-input" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="email-input">Email Address <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
              </div>
            </div>

            {/* BPL Exemption */}
            <div style={{ borderTop: "1px solid var(--neutral-200)", paddingTop: "16px", marginTop: "16px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9375rem", cursor: "pointer" }}>
                <input type="checkbox" checked={isBPL} onChange={(e) => setIsBPL(e.target.checked)} />
                <span>Below Poverty Line (BPL) citizen (₹0 fee waiver under Section 7(5))</span>
              </label>

              {isBPL && (
                <div className="form-group" style={{ marginTop: "12px" }}>
                  <label htmlFor="bpl-card-no">BPL / Ration Card Number <span style={{ color: "#dc2626" }}>*</span></label>
                  <input id="bpl-card-no" type="text" value={bplCardNo} onChange={(e) => setBplCardNo(e.target.value)} placeholder="e.g. BPL-KA-991823" className="form-control" />
                </div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px" }}>
              <button type="button" className="btn-secondary-action" onClick={handleBack}>
                ← Back
              </button>
              <button type="button" className="btn-primary-action" onClick={handleNext}>
                Continue to review →
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: CHECK AND SUBMIT */}
        {currentStep === 4 && (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
            <h1 style={{ fontSize: "1.5rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              Check and submit
            </h1>
            <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: "0 0 20px" }}>
              Review your details before payment and submission.
            </p>

            {/* Privacy & Quality Audit Warning */}
            {(hasAadhaar || hasPAN) && (
              <div className="gov-alert gov-alert-warning" style={{ marginBottom: "20px" }}>
                <strong>Privacy suggestion:</strong> Your request appears to contain an Aadhaar or PAN number. Public RTI responses may be published on disclosure logs. Consider removing sensitive personal identifiers if not strictly required.
              </div>
            )}

            {/* Summary Table */}
            <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", padding: "18px", fontSize: "0.875rem", display: "grid", gap: "10px", marginBottom: "20px" }}>
              <div><strong>Authority:</strong> {selectedAuth.name} ({selectedAuth.ministry})</div>
              <div><strong>Subject:</strong> {subject}</div>
              <div><strong>Applicant:</strong> {applicantName} (+91 {mobile} · {email})</div>
              <div><strong>Address:</strong> {address}, {state} - {pincode}</div>
              <div><strong>Fee payable:</strong> {isBPL ? "₹0 (BPL Exemption claimed)" : "₹10 (Statutory Central Government RTI Fee)"}</div>
            </div>

            {/* Payment Mode Selection */}
            {!isBPL && (
              <div className="form-group">
                <label>Select payment mode (₹10)</label>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "8px" }}>
                  {[
                    { id: "UPI", label: "UPI (Google Pay, PhonePe, Paytm)" },
                    { id: "DEBIT", label: "Debit / RuPay Card" },
                    { id: "NET_BANKING", label: "Net Banking (SBI & All Banks)" }
                  ].map((mode) => (
                    <label
                      key={mode.id}
                      style={{
                        flex: "1 1 180px",
                        border: paymentMode === mode.id ? "2px solid var(--gov-navy-950)" : "1px solid var(--neutral-300)",
                        borderRadius: "var(--radius-md)",
                        padding: "10px 14px",
                        cursor: "pointer",
                        fontSize: "0.8125rem",
                        fontWeight: paymentMode === mode.id ? 700 : 500,
                        background: paymentMode === mode.id ? "var(--neutral-100)" : "#ffffff"
                      }}
                    >
                      <input
                        type="radio"
                        name="payMode"
                        checked={paymentMode === mode.id}
                        onChange={() => setPaymentMode(mode.id as any)}
                        style={{ marginRight: "8px" }}
                      />
                      {mode.label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "28px" }}>
              <button type="button" className="btn-secondary-action" onClick={handleBack} disabled={isSubmitting}>
                ← Back
              </button>
              <button
                type="button"
                className="btn-primary-action"
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                style={{ padding: "12px 24px" }}
              >
                {isSubmitting ? "Submitting application..." : isBPL ? "Submit application (₹0) →" : "Pay ₹10 & Submit →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function NewRTIWizardPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "40px 0" }}>Loading form...</div>}>
        <NewRTIWizardContent />
      </Suspense>
    </PortalPage>
  );
}
