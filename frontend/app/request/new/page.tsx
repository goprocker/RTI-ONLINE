"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect, Suspense } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { centralAuthorities, findMatchingAuthorities, AuthorityItem } from "../../../lib/authorities-data";
import { useAuth } from "../../../lib/auth-context";
import { RTIApplication } from "../../../types/rti";

function RequestWizardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, submitRTI } = useAuth();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [submittedApp, setSubmittedApp] = useState<RTIApplication | null>(null);

  // STAGE 1: WHERE? (Authority Selection)
  const preselectedAuthId = searchParams.get("authority");
  const queryParam = searchParams.get("query") || "";
  
  const initialAuth = centralAuthorities.find(a => a.id === preselectedAuthId) || 
                      (queryParam ? (findMatchingAuthorities(queryParam)[0]?.authority || centralAuthorities[0]) : centralAuthorities[0]);
  
  const [selectedAuthority, setSelectedAuthority] = useState<AuthorityItem>(initialAuth);
  const [authoritySearchQuery, setAuthoritySearchQuery] = useState(queryParam);
  const [showManualDropdown, setShowManualDropdown] = useState(false);

  // STAGE 2: WHAT? (Information Request & AI Structuring Assistant)
  const [subject, setSubject] = useState(queryParam ? `Information Request regarding ${queryParam}` : "");
  const [queryText, setQueryText] = useState("");
  const [attachedPdf, setAttachedPdf] = useState<string | null>(null);
  const [showAssistantModal, setShowAssistantModal] = useState(false);
  const [rawAssistantInput, setRawAssistantInput] = useState(queryParam || "");
  const [structuredSuggestion, setStructuredSuggestion] = useState("");

  // STAGE 3: ABOUT YOU (Citizen Details & BPL Exemption)
  const [applicantName, setApplicantName] = useState(user?.name || "");
  const [applicantEmail, setApplicantEmail] = useState(user?.email || "");
  const [applicantMobile, setApplicantMobile] = useState(user?.mobile || "");
  const [applicantAddress, setApplicantAddress] = useState(user?.address || "");
  const [applicantCity, setApplicantCity] = useState(user?.city || "Bengaluru");
  const [applicantState, setApplicantState] = useState(user?.state || "Karnataka");
  const [applicantPin, setApplicantPin] = useState(user?.pincode || "560038");
  const [applicantGender, setApplicantGender] = useState(user?.gender || "Male");
  const [isBPL, setIsBPL] = useState(false);
  const [bplDocName, setBplDocName] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState(!user);

  // STAGE 4: REVIEW & PAY
  const [paymentMode, setPaymentMode] = useState<"UPI" | "DEBIT_CARD" | "CREDIT_CARD" | "NETBANKING">("UPI");
  const [confirmedDeclaration, setConfirmedDeclaration] = useState(true);
  const [paymentProcessingStage, setPaymentProcessingStage] = useState<number | null>(null);

  useEffect(() => {
    if (user) {
      setApplicantName(user.name);
      setApplicantEmail(user.email);
      setApplicantMobile(user.mobile);
      setApplicantAddress(user.address);
      setApplicantCity(user.city);
      setApplicantState(user.state);
      setApplicantPin(user.pincode);
      setApplicantGender(user.gender || "Male");
      setEditingProfile(false);
    }
  }, [user]);

  const matchedAuthorities = useMemo(() => {
    if (authoritySearchQuery.trim().length > 1) {
      return findMatchingAuthorities(authoritySearchQuery);
    }
    return [];
  }, [authoritySearchQuery]);

  const steps = [
    { num: 1, label: "WHERE?", title: "Select Public Authority" },
    { num: 2, label: "WHAT?", title: "Write Information Request" },
    { num: 3, label: "ABOUT YOU", title: "Applicant & BPL Details" },
    { num: 4, label: "REVIEW & PAY", title: "Review Application & Pay" },
  ];

  // AI Assistant for structuring RTI
  function generateStructuredRTI(raw: string) {
    const clean = raw.trim();
    if (!clean) return;

    if (clean.toLowerCase().includes("passport")) {
      setStructuredSuggestion(
        `Please provide the following information regarding Passport Application:\n\n` +
        `1. The present processing status and physical movement log of the application file.\n` +
        `2. The date on which the Police Verification Report (PVR) was received by the Regional Passport Office.\n` +
        `3. If printing or dispatch is delayed beyond the standard 7 working days, copy of the internal noting / reason recorded on file.\n` +
        `4. Name and designation of the nodal officer responsible for expediting delayed passport dispatches.`
      );
    } else if (clean.toLowerCase().includes("epf") || clean.toLowerCase().includes("pf") || clean.toLowerCase().includes("provident")) {
      setStructuredSuggestion(
        `Please provide the following information regarding Employees' Provident Fund (EPFO) Claim:\n\n` +
        `1. The date of receipt and current statutory processing status of the online claim form.\n` +
        `2. In case of rejection or delay beyond the Citizen Charter limit of 20 days, certified copies of file notings detailing reasons.\n` +
        `3. Name and designation of the Field Officer / Assistant PF Commissioner dealing with the settlement.`
      );
    } else if (clean.toLowerCase().includes("exam") || clean.toLowerCase().includes("cbse") || clean.toLowerCase().includes("marksheet")) {
      setStructuredSuggestion(
        `Please provide the following information regarding Board / Competitive Examination:\n\n` +
        `1. Certified copy of evaluated answer scripts and examiner marking scheme.\n` +
        `2. Step-wise score breakdown and moderation marks applied, if any.\n` +
        `3. Official date of receipt of re-evaluation request and disposal order.`
      );
    } else {
      setStructuredSuggestion(
        `Please provide certified records and documents under the RTI Act, 2005 regarding the following:\n\n` +
        `1. Certified copy of the official file notings, circulars, and orders concerning: "${clean}".\n` +
        `2. Date-wise action taken report by the competent authority from initial receipt to present date.\n` +
        `3. List of public officers responsible for executing the requested process and prescribed statutory timelines.`
      );
    }
  }

  function handleFinalSubmit() {
    if (!confirmedDeclaration) {
      alert("Please confirm the statutory declaration before proceeding.");
      return;
    }

    // Run 3-stage animated payment processing
    if (!isBPL) {
      setPaymentProcessingStage(1); // Payment Initiated
      setTimeout(() => {
        setPaymentProcessingStage(2); // Confirming with Gateway
        setTimeout(() => {
          setPaymentProcessingStage(3); // Registering RTI
          setTimeout(() => {
            finalizeFiling();
          }, 600);
        }, 700);
      }, 700);
    } else {
      finalizeFiling();
    }
  }

  function finalizeFiling() {
    const newApp = submitRTI({
      ministry: selectedAuthority.ministry,
      department: selectedAuthority.department,
      publicAuthority: selectedAuthority.name,
      nodalOfficerRouting: selectedAuthority.nodalOfficerDesc,
      subject: subject || "RTI Information Request",
      queryText: queryText,
      applicantName: applicantName || (user ? user.name : "Citizen Applicant"),
      applicantEmail: applicantEmail || (user ? user.email : "citizen@example.gov.in"),
      applicantMobile: applicantMobile || "9876543210",
      applicantAddress: `${applicantAddress}, ${applicantCity}, ${applicantState} - ${applicantPin}`,
      isBPL,
      bplDocName: isBPL ? (bplDocName || "BPL_Certificate.pdf") : undefined,
      attachedDocName: attachedPdf || undefined,
      paymentMode: isBPL ? "BPL Exemption" : paymentMode
    });
    setPaymentProcessingStage(null);
    setSubmittedApp(newApp);
  }

  // SCREEN 15: PAYMENT PROCESSING ANIMATION
  if (paymentProcessingStage !== null) {
    return (
      <div className="wizard-page wrap" style={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
        <div style={{ background: "#ffffff", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "48px 40px", textAlign: "center", maxWidth: "520px", boxShadow: "var(--shadow-xl)" }}>
          <div style={{ width: "60px", height: "60px", margin: "0 auto 20px", borderRadius: "50%", background: "var(--gov-blue-50)", border: "3px solid var(--gov-blue-600)", borderTopColor: "transparent", animation: "spin 1s linear infinite" }} />
          <style jsx>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          `}</style>
          
          <h2 style={{ font: "700 1.6rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
            Processing your payment...
          </h2>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.9rem", margin: "0 0 24px" }}>
            Amount: <strong>₹10</strong> · Please do not close or refresh this window.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left", background: "var(--neutral-50)", padding: "18px", borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.86rem", color: paymentProcessingStage >= 1 ? "var(--forest-700)" : "var(--neutral-400)", fontWeight: paymentProcessingStage === 1 ? 800 : 600 }}>
              <span>{paymentProcessingStage > 1 ? "✓" : "●"}</span>
              <span>1. Payment initiated with secure banking gateway</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.86rem", color: paymentProcessingStage >= 2 ? "var(--forest-700)" : "var(--neutral-400)", fontWeight: paymentProcessingStage === 2 ? 800 : 600 }}>
              <span>{paymentProcessingStage > 2 ? "✓" : paymentProcessingStage === 2 ? "●" : "○"}</span>
              <span>2. Confirming electronic receipt settlement</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.86rem", color: paymentProcessingStage >= 3 ? "var(--forest-700)" : "var(--neutral-400)", fontWeight: paymentProcessingStage === 3 ? 800 : 600 }}>
              <span>{paymentProcessingStage === 3 ? "●" : "○"}</span>
              <span>3. Registering RTI with Central Nodal Officer</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // SCREEN 16 & 17: SUBMITTED SUCCESS & "WHAT HAPPENS NOW?"
  if (submittedApp) {
    return (
      <div className="wizard-page wrap">
        <div className="success-card">
          <div className="success-header-badge">
            <span>✓</span> RTI SUCCESSFULLY FILED 🎉
          </div>

          <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            RTI Application Registered
          </h1>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.95rem", margin: 0 }}>
            Your application has been electronically dispatched to the Central Public Authority.
          </p>

          <div className="success-reg-box">
            <div>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.08em", color: "#fed7aa", textTransform: "uppercase", fontWeight: 700 }}>
                REGISTRATION NUMBER
              </span>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div className="success-reg-num">{submittedApp.regNo}</div>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(submittedApp.regNo);
                    alert(`Registration number ${submittedApp.regNo} copied to clipboard.`);
                  }}
                  style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", padding: "4px 10px", borderRadius: "var(--radius-sm)", fontSize: "0.75rem", cursor: "pointer" }}
                >
                  📋 Copy
                </button>
              </div>
              <div className="success-reg-meta">
                Filed on: {submittedApp.filingDate} · Public Authority: {submittedApp.publicAuthority}
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                type="button"
                className="btn-secondary-action"
                style={{ background: "#ffffff", color: "var(--gov-navy-950)", fontSize: "0.82rem" }}
                onClick={() => alert(`Official RTI Filing Receipt for ${submittedApp.regNo} downloaded (PDF).`)}
              >
                📥 Download Receipt
              </button>
            </div>
          </div>

          <div style={{ background: "var(--forest-50)", border: "1px solid #a7f3d0", padding: "12px 16px", borderRadius: "var(--radius-md)", fontSize: "0.84rem", color: "var(--forest-700)", marginBottom: "24px" }}>
            ✓ Confirmation and tracking alerts sent to <strong>{submittedApp.applicantEmail}</strong> and <strong>+91 {submittedApp.applicantMobile}</strong>.
          </div>

          {/* SCREEN 17: WHAT HAPPENS NOW? */}
          <div className="what-next-section">
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <span style={{ color: "var(--gov-blue-600)", fontSize: "1.1rem" }}>🧭</span>
              <h3 style={{ margin: 0 }}>WHAT HAPPENS NOW?</h3>
            </div>
            <p style={{ fontSize: "0.86rem", color: "var(--neutral-600)", margin: "0 0 16px" }}>
              We will notify you when your application status changes or if action is required:
            </p>

            <div className="roadmap-flow">
              <div className="roadmap-step active">
                <div className="roadmap-step-num">1. SUBMITTED</div>
                <div className="roadmap-step-title">✓ RTI Submitted</div>
                <span style={{ fontSize: "0.72rem", color: "var(--forest-700)" }}>Completed today</span>
              </div>

              <div className="roadmap-step">
                <div className="roadmap-step-num">2. SENT</div>
                <div className="roadmap-step-title">Sent to Authority</div>
                <span style={{ fontSize: "0.72rem", color: "var(--neutral-500)" }}>Reaches Nodal Desk</span>
              </div>

              <div className="roadmap-step">
                <div className="roadmap-step-num">3. CPIO ROUTING</div>
                <div className="roadmap-step-title">Routed to CPIO</div>
                <span style={{ fontSize: "0.72rem", color: "var(--neutral-500)" }}>Under processing</span>
              </div>

              <div className="roadmap-step">
                <div className="roadmap-step-num">4. RESPONSE</div>
                <div className="roadmap-step-title">Response Received</div>
                <span style={{ fontSize: "0.72rem", color: "var(--neutral-500)" }}>Statutory 30-day window</span>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--neutral-200)", flexWrap: "wrap", gap: "12px" }}>
            <Link href={`/status?regNo=${encodeURIComponent(submittedApp.regNo)}`} className="btn-primary-action">
              Track My RTI →
            </Link>
            <Link href="/dashboard" className="btn-secondary-action">
              Go to Citizen Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wizard-page wrap">
      <div className="bread">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/request/eligibility">Eligibility</Link>
        <span>›</span>
        <span>File RTI Application</span>
      </div>

      <div className="wizard-layout">
        {/* Left Stepper Sidebar with Progress Bar */}
        <aside className="wizard-sidebar">
          <p className="eyebrow" style={{ marginBottom: "4px" }}>
            <span className="eyebrow-line" />
            FILE RTI APPLICATION
          </p>
          <h2>Filing Journey</h2>

          <ol className="stepper-list">
            {steps.map((s, idx) => {
              const isCompleted = idx < currentStep;
              const isActive = idx === currentStep;
              return (
                <li key={s.num} className={`step-item ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}>
                  <div className="step-icon-circle">
                    {isCompleted ? "✓" : s.num}
                  </div>
                  <div>
                    <div style={{ fontSize: "0.72rem", letterSpacing: "0.05em", color: isActive ? "var(--gov-blue-600)" : "var(--neutral-500)", textTransform: "uppercase" }}>
                      STEP {s.num}
                    </div>
                    <div style={{ color: isActive ? "var(--gov-navy-950)" : "inherit" }}>
                      {s.label} · {s.title}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>

          <div className="sidebar-notice">
            <strong>Statutory Rule Notice:</strong>
            <p style={{ margin: "4px 0 0" }}>
              Standard Central RTI fee is ₹10 (waived for BPL applicants). Character limit for online text is 3,000 characters.
            </p>
          </div>
        </aside>

        {/* Wizard Form Card */}
        <section className="wizard-card">
          <div className="wizard-card-header">
            <span className="form-step">STEP {currentStep + 1} OF 4</span>
            <h1>{steps[currentStep].title}</h1>
            <p>
              {currentStep === 0 && "Identify who holds the information you need."}
              {currentStep === 1 && "Draft your specific information request clearly."}
              {currentStep === 2 && "Enter your contact details for official communications."}
              {currentStep === 3 && "Review all application details before submission."}
            </p>
          </div>

          {/* ================================================================
              STEP 1: WHERE? (Authority Selection - Screen 06 & 07)
              ================================================================ */}
          {currentStep === 0 && (
            <div>
              <div className="form-group">
                <label htmlFor="auth-search-field" style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--gov-navy-950)" }}>
                  What information are you looking for? <span className="required">*</span>
                </label>
                <input
                  id="auth-search-field"
                  className="form-control"
                  type="text"
                  value={authoritySearchQuery}
                  onChange={(e) => setAuthoritySearchQuery(e.target.value)}
                  placeholder="e.g. Information regarding my passport application, EPFO PF claim..."
                />
              </div>

              {/* Matched Suggested Authorities */}
              {matchedAuthorities.length > 0 && (
                <div style={{ background: "var(--gov-blue-50)", border: "1.5px solid #bfdbfe", borderRadius: "var(--radius-lg)", padding: "18px", marginBottom: "20px" }}>
                  <span className="recommend-badge">Suggested Authority</span>
                  <div style={{ display: "grid", gap: "10px", marginTop: "10px" }}>
                    {matchedAuthorities.slice(0, 3).map((match) => (
                      <div
                        key={match.authority.id}
                        style={{
                          background: "#ffffff",
                          border: selectedAuthority.id === match.authority.id ? "2px solid var(--gov-blue-600)" : "1px solid var(--neutral-200)",
                          borderRadius: "var(--radius-md)",
                          padding: "14px",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                        onClick={() => setSelectedAuthority(match.authority)}
                      >
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "1.1rem" }}>🇮🇳</span>
                            <strong style={{ fontSize: "0.95rem", color: "var(--gov-navy-950)" }}>
                              {match.authority.ministry}
                            </strong>
                          </div>
                          <div style={{ fontSize: "0.85rem", color: "var(--neutral-700)", fontWeight: 600, marginLeft: "26px" }}>
                            {match.authority.name}
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "var(--forest-600)", fontWeight: 700, marginLeft: "26px", marginTop: "2px" }}>
                            ✓ Likely authority ({match.matchedReason})
                          </div>
                        </div>
                        <button
                          type="button"
                          className="btn-secondary-action"
                          style={{ padding: "6px 12px", fontSize: "0.8rem", color: selectedAuthority.id === match.authority.id ? "#ffffff" : "var(--gov-blue-600)", background: selectedAuthority.id === match.authority.id ? "var(--gov-blue-600)" : "#ffffff" }}
                        >
                          {selectedAuthority.id === match.authority.id ? "✓ Selected" : "Select →"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SCREEN 07: CONFIRM AUTHORITY BOX */}
              <div style={{ background: "#ffffff", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "22px", marginTop: "16px" }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--forest-600)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  YOUR RTI WILL BE SENT TO
                </span>
                <h3 style={{ font: "700 1.3rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "4px 0 2px" }}>
                  {selectedAuthority.ministry.toUpperCase()}
                </h3>
                <div style={{ fontSize: "0.9rem", color: "var(--neutral-700)", fontWeight: 600 }}>
                  {selectedAuthority.name} · Central Government
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--forest-600)", fontWeight: 700, marginTop: "2px" }}>
                  ✓ RTI Online Supported
                </div>

                <div style={{ background: "var(--neutral-50)", borderLeft: "3px solid var(--gov-blue-500)", padding: "10px 14px", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0", marginTop: "14px", fontSize: "0.82rem", color: "var(--gov-navy-900)", lineHeight: "1.5" }}>
                  <strong>How it reaches the officer: </strong>
                  Your request will initially reach the department&apos;s RTI Nodal Officer (<em>{selectedAuthority.nodalOfficerDesc}</em>) and be routed to the appropriate CPIO.
                </div>

                <div style={{ marginTop: "14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <button
                    type="button"
                    onClick={() => setShowManualDropdown(!showManualDropdown)}
                    style={{ background: "none", border: 0, color: "var(--gov-blue-600)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}
                  >
                    {showManualDropdown ? "▲ Hide Directory Browser" : "▼ Change Authority / Search All"}
                  </button>
                </div>

                {showManualDropdown && (
                  <div style={{ marginTop: "14px", paddingTop: "14px", borderTop: "1px solid var(--neutral-200)" }}>
                    <label htmlFor="auth-dropdown" style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--neutral-700)", display: "block", marginBottom: "6px" }}>
                      Select from all Central Ministries & Authorities:
                    </label>
                    <select
                      id="auth-dropdown"
                      className="form-control"
                      value={selectedAuthority.id}
                      onChange={(e) => {
                        const found = centralAuthorities.find(a => a.id === e.target.value);
                        if (found) setSelectedAuthority(found);
                      }}
                    >
                      {centralAuthorities.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.name} ({a.ministry})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================
              STEP 2: WHAT? (Write RTI Request & AI Assistant - Screen 08, 09, 10)
              ================================================================ */}
          {currentStep === 1 && (
            <div>
              {/* Educational Hint */}
              <div style={{ background: "var(--gov-blue-50)", border: "1px solid #bfdbfe", padding: "12px 16px", borderRadius: "var(--radius-md)", fontSize: "0.84rem", color: "var(--gov-navy-950)", marginBottom: "20px" }}>
                💡 <strong>RTI Tip:</strong> RTI works best when you ask for existing records, documents, or specific information clearly and specifically.
              </div>

              <div className="form-group">
                <label htmlFor="req-subject">
                  Subject / Summary of Request <span className="required">*</span>
                </label>
                <input
                  id="req-subject"
                  className="form-control"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Passport application processing information"
                />
              </div>

              <div className="form-group">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label htmlFor="req-query-text" style={{ margin: 0 }}>
                    RTI Request Text (Specific records / questions) <span className="required">*</span>
                  </label>
                  
                  {/* SCREEN 09: KILLER FEATURE ASSISTANT BUTTON */}
                  <button
                    type="button"
                    onClick={() => {
                      setShowAssistantModal(true);
                      if (!structuredSuggestion) {
                        generateStructuredRTI(rawAssistantInput || subject || "passport application status");
                      }
                    }}
                    style={{
                      background: "linear-gradient(135deg, var(--gov-blue-600) 0%, var(--gov-navy-850) 100%)",
                      color: "#ffffff",
                      border: 0,
                      padding: "4px 12px",
                      borderRadius: "var(--radius-full)",
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      boxShadow: "var(--shadow-xs)"
                    }}
                  >
                    🪄 Help me structure my RTI
                  </button>
                </div>

                <textarea
                  id="req-query-text"
                  className="form-control"
                  rows={8}
                  maxLength={3000}
                  required
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="Please provide the following information:&#10;1. Current processing status.&#10;2. Date on which police verification was received.&#10;3. Copy of the relevant processing record..."
                />

                <div className="char-counter-bar">
                  <span className={`char-count-pill ${queryText.length > 2500 ? "near-limit" : ""}`}>
                    {queryText.length.toLocaleString()} / 3,000 characters
                  </span>
                  <span className="char-pdf-hint">
                    {queryText.length >= 3000
                      ? "Limit reached! Attach extended request as PDF below ↓"
                      : "Need more space? Attach detailed request as PDF"}
                  </span>
                </div>
              </div>

              {/* AI STRUCTURING ASSISTANT MODAL */}
              {showAssistantModal && (
                <div style={{ background: "#ffffff", border: "2px solid var(--gov-blue-600)", borderRadius: "var(--radius-lg)", padding: "24px", margin: "20px 0", boxShadow: "var(--shadow-xl)", animation: "fadeIn 0.2s ease-in" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "1.2rem" }}>🪄</span>
                      <strong style={{ font: "700 1.15rem var(--font-serif)", color: "var(--gov-navy-950)" }}>
                        RTI Writing Assistant
                      </strong>
                    </div>
                    <button type="button" onClick={() => setShowAssistantModal(false)} style={{ background: "none", border: 0, fontSize: "1.1rem", cursor: "pointer", color: "var(--neutral-500)" }}>✕</button>
                  </div>

                  <p style={{ fontSize: "0.82rem", color: "var(--neutral-600)", margin: "0 0 12px" }}>
                    Describe in plain English what problem you are facing. We will format it into specific, numbered statutory questions.
                  </p>

                  <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
                    <input
                      type="text"
                      value={rawAssistantInput}
                      onChange={(e) => setRawAssistantInput(e.target.value)}
                      placeholder="e.g. why is my passport taking so long / EPF withdrawal not credited"
                      style={{ flex: 1, padding: "10px 14px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-md)", fontSize: "0.88rem" }}
                    />
                    <button
                      type="button"
                      className="btn-secondary-action"
                      onClick={() => generateStructuredRTI(rawAssistantInput)}
                      style={{ padding: "8px 16px", fontSize: "0.82rem" }}
                    >
                      Generate RTI →
                    </button>
                  </div>

                  {structuredSuggestion && (
                    <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "16px" }}>
                      <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--gov-blue-600)", textTransform: "uppercase" }}>
                        Suggested Structured Request:
                      </span>
                      <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "0.84rem", color: "var(--neutral-900)", lineHeight: "1.55", margin: "8px 0 14px" }}>
                        {structuredSuggestion}
                      </pre>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <button
                          type="button"
                          className="btn-primary-action"
                          onClick={() => {
                            setQueryText(structuredSuggestion);
                            setShowAssistantModal(false);
                          }}
                          style={{ padding: "8px 16px", fontSize: "0.82rem" }}
                        >
                          ✓ Apply Structured Request to Form
                        </button>
                        <button
                          type="button"
                          className="btn-secondary-action"
                          onClick={() => setShowAssistantModal(false)}
                          style={{ padding: "8px 16px", fontSize: "0.82rem" }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SCREEN 10: SUPPORTING DOCUMENTS (PDF) */}
              <div className="doc-upload-box">
                <div className="upload-icon">📄</div>
                <div className="upload-text">
                  <strong>Supporting Documents (Optional PDF)</strong>
                </div>
                <div className="upload-sub">
                  Upload PDF document (up to 5 MB) if you have reference receipts or an extensive query exceeding 3,000 characters.
                </div>

                {attachedPdf ? (
                  <div style={{ marginTop: "12px", display: "inline-flex", alignItems: "center", gap: "8px", background: "#ffffff", border: "1px solid var(--forest-600)", padding: "6px 14px", borderRadius: "var(--radius-md)", fontSize: "0.82rem", color: "var(--forest-700)" }}>
                    <span>✓ Attached: {attachedPdf}</span>
                    <button
                      type="button"
                      onClick={() => setAttachedPdf(null)}
                      style={{ background: "none", border: 0, color: "#dc2626", cursor: "pointer", fontWeight: 700 }}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn-secondary-action"
                    style={{ marginTop: "10px", padding: "6px 14px", fontSize: "0.8rem" }}
                    onClick={() => setAttachedPdf("Passport_Acknowledgement_Reference.pdf")}
                  >
                    + Choose PDF File (Demo Simulation)
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ================================================================
              STEP 3: ABOUT YOU (Applicant Details & BPL - Screen 11 & 12)
              ================================================================ */}
          {currentStep === 2 && (
            <div>
              {user && !editingProfile ? (
                <div className="verified-citizen-card">
                  <div className="citizen-info-summary">
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <strong>{applicantName}</strong>
                      <span style={{ background: "var(--forest-600)", color: "#fff", fontSize: "0.62rem", fontWeight: 800, padding: "1px 6px", borderRadius: "var(--radius-full)" }}>
                        VERIFIED PROFILE
                      </span>
                    </div>
                    <span>{applicantEmail} · +91 {applicantMobile}</span>
                    <div style={{ fontSize: "0.78rem", color: "var(--neutral-500)", marginTop: "2px" }}>
                      {applicantAddress}, {applicantCity}, {applicantState} - {applicantPin}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn-edit-details"
                    onClick={() => setEditingProfile(true)}
                  >
                    Edit Details
                  </button>
                </div>
              ) : (
                <div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="app-fullname">
                        Full Name of Applicant <span className="required">*</span>
                      </label>
                      <input
                        id="app-fullname"
                        className="form-control"
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Rajesh Sharma"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="app-gender">Gender <span className="required">*</span></label>
                      <select
                        id="app-gender"
                        className="form-control"
                        value={applicantGender}
                        onChange={(e) => setApplicantGender(e.target.value)}
                      >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Third Gender</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label htmlFor="app-mail">
                        Email Address (for official CPIO reply) <span className="required">*</span>
                      </label>
                      <input
                        id="app-mail"
                        className="form-control"
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="citizen@example.gov.in"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="app-phone">
                        Mobile Number (for SMS tracking alerts) <span className="required">*</span>
                      </label>
                      <input
                        id="app-phone"
                        className="form-control"
                        type="tel"
                        maxLength={10}
                        required
                        value={applicantMobile}
                        onChange={(e) => setApplicantMobile(e.target.value)}
                        placeholder="10-digit mobile"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="app-addr-full">
                      Postal Address <span className="required">*</span>
                    </label>
                    <input
                      id="app-addr-full"
                      className="form-control"
                      type="text"
                      required
                      value={applicantAddress}
                      onChange={(e) => setApplicantAddress(e.target.value)}
                      placeholder="House No, Street, Locality"
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px" }}>
                    <div className="form-group">
                      <label htmlFor="app-city">City</label>
                      <input
                        id="app-city"
                        className="form-control"
                        type="text"
                        value={applicantCity}
                        onChange={(e) => setApplicantCity(e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="app-state-select">State / UT <span className="required">*</span></label>
                      <select
                        id="app-state-select"
                        className="form-control"
                        value={applicantState}
                        onChange={(e) => setApplicantState(e.target.value)}
                      >
                        <option>Karnataka</option>
                        <option>Tamil Nadu</option>
                        <option>Maharashtra</option>
                        <option>Delhi (NCT)</option>
                        <option>Uttar Pradesh</option>
                        <option>West Bengal</option>
                        <option>Kerala</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="app-pincode">PIN Code <span className="required">*</span></label>
                      <input
                        id="app-pincode"
                        className="form-control"
                        type="text"
                        maxLength={6}
                        value={applicantPin}
                        onChange={(e) => setApplicantPin(e.target.value)}
                        placeholder="6-digit PIN"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SCREEN 12: BPL STATUS */}
              <div className="bpl-toggle-box">
                <strong style={{ fontSize: "0.95rem", color: "var(--gov-navy-950)" }}>
                  Are you Below Poverty Line (BPL)?
                </strong>
                <p style={{ margin: "2px 0 12px", fontSize: "0.84rem", color: "var(--neutral-600)" }}>
                  BPL citizens are exempt from paying the RTI application fee upon attaching an authorized certificate.
                </p>

                <div className="bpl-options">
                  <label className="bpl-radio-label">
                    <input
                      type="radio"
                      name="bpl-radio"
                      checked={!isBPL}
                      onChange={() => setIsBPL(false)}
                    />
                    <span>No (RTI Application Fee ₹10)</span>
                  </label>

                  <label className="bpl-radio-label">
                    <input
                      type="radio"
                      name="bpl-radio"
                      checked={isBPL}
                      onChange={() => setIsBPL(true)}
                    />
                    <span>Yes (Application fee waived. BPL certificate required.)</span>
                  </label>
                </div>

                {isBPL && (
                  <div style={{ marginTop: "14px", padding: "14px", background: "#ffffff", border: "1px solid #fde68a", borderRadius: "var(--radius-md)" }}>
                    <label style={{ fontSize: "0.84rem", fontWeight: 700, color: "#92400e", display: "block", marginBottom: "6px" }}>
                      Upload BPL Certificate * (Proof required by RTI rules)
                    </label>
                    {bplDocName ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.84rem", color: "var(--forest-700)" }}>
                        <span>✓ Attached: {bplDocName}</span>
                        <button type="button" onClick={() => setBplDocName(null)} style={{ background: "none", border: 0, color: "#dc2626", cursor: "pointer" }}>✕</button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn-secondary-action"
                        style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                        onClick={() => setBplDocName("BPL_Card_State_Gov.pdf")}
                      >
                        + Upload BPL Certificate (Demo Simulation)
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================
              STEP 4: REVIEW & PAY (Screen 13 & 14)
              ================================================================ */}
          {currentStep === 3 && (
            <div>
              <div style={{ background: "var(--neutral-50)", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "26px", marginBottom: "26px" }}>
                <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 18px" }}>
                  Review your RTI
                </h3>

                {/* Section 1: Public Authority */}
                <div style={{ borderBottom: "1px solid var(--neutral-200)", paddingBottom: "14px", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--neutral-500)", textTransform: "uppercase" }}>PUBLIC AUTHORITY</span>
                    <strong style={{ display: "block", color: "var(--gov-navy-950)", fontSize: "0.95rem" }}>{selectedAuthority.ministry}</strong>
                    <div style={{ fontSize: "0.82rem", color: "var(--neutral-600)" }}>{selectedAuthority.name}</div>
                  </div>
                  <button type="button" onClick={() => setCurrentStep(0)} style={{ background: "none", border: 0, color: "var(--gov-blue-600)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Edit</button>
                </div>

                {/* Section 2: Request */}
                <div style={{ borderBottom: "1px solid var(--neutral-200)", paddingBottom: "14px", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--neutral-500)", textTransform: "uppercase" }}>YOUR REQUEST</span>
                    <strong style={{ display: "block", color: "var(--gov-navy-950)", fontSize: "0.95rem" }}>{subject}</strong>
                    <p style={{ margin: "4px 0 0", fontSize: "0.82rem", color: "var(--neutral-600)", lineHeight: "1.5", maxHeight: "80px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {queryText}
                    </p>
                  </div>
                  <button type="button" onClick={() => setCurrentStep(1)} style={{ background: "none", border: 0, color: "var(--gov-blue-600)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Edit</button>
                </div>

                {/* Section 3: Attachments */}
                <div style={{ borderBottom: "1px solid var(--neutral-200)", paddingBottom: "14px", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--neutral-500)", textTransform: "uppercase" }}>ATTACHMENTS</span>
                    <div style={{ fontSize: "0.84rem", color: "var(--neutral-800)" }}>
                      {attachedPdf ? `✓ ${attachedPdf}` : "None attached"}
                    </div>
                  </div>
                  <button type="button" onClick={() => setCurrentStep(1)} style={{ background: "none", border: 0, color: "var(--gov-blue-600)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Edit</button>
                </div>

                {/* Section 4: Applicant */}
                <div style={{ borderBottom: "1px solid var(--neutral-200)", paddingBottom: "14px", marginBottom: "14px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--neutral-500)", textTransform: "uppercase" }}>APPLICANT</span>
                    <strong style={{ display: "block", color: "var(--gov-navy-950)", fontSize: "0.95rem" }}>{applicantName}</strong>
                    <div style={{ fontSize: "0.82rem", color: "var(--neutral-600)" }}>{applicantEmail} · {applicantState}</div>
                  </div>
                  <button type="button" onClick={() => setCurrentStep(2)} style={{ background: "none", border: 0, color: "var(--gov-blue-600)", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>Edit</button>
                </div>

                {/* Section 5: Fee Calculation */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "6px" }}>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--neutral-500)", textTransform: "uppercase" }}>FEE SUMMARY</span>
                    <div style={{ fontSize: "0.88rem", color: "var(--neutral-700)" }}>
                      {isBPL ? "BPL Exemption (Certificate Attached)" : "RTI Application Statutory Fee"}
                    </div>
                  </div>
                  <strong style={{ font: "700 1.4rem var(--font-serif)", color: isBPL ? "var(--forest-600)" : "var(--gov-navy-950)" }}>
                    TOTAL {isBPL ? "₹0" : "₹10"}
                  </strong>
                </div>
              </div>

              {/* SCREEN 14: CHOOSE PAYMENT METHOD (IF NOT BPL) */}
              {!isBPL ? (
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--gov-navy-950)", display: "block", marginBottom: "12px" }}>
                    Pay RTI Application Fee · Amount: ₹10
                  </label>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
                    <label
                      style={{
                        background: paymentMode === "UPI" ? "var(--gov-blue-50)" : "#ffffff",
                        border: paymentMode === "UPI" ? "2px solid var(--gov-blue-600)" : "1.5px solid var(--neutral-300)",
                        borderRadius: "var(--radius-md)",
                        padding: "14px 10px",
                        textAlign: "center",
                        cursor: "pointer"
                      }}
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMode === "UPI"}
                        onChange={() => setPaymentMode("UPI")}
                        style={{ display: "none" }}
                      />
                      <div style={{ fontSize: "1.3rem", marginBottom: "4px" }}>⚡</div>
                      <strong style={{ display: "block", fontSize: "0.88rem", color: "var(--gov-navy-950)" }}>UPI</strong>
                    </label>

                    <label
                      style={{
                        background: paymentMode === "DEBIT_CARD" ? "var(--gov-blue-50)" : "#ffffff",
                        border: paymentMode === "DEBIT_CARD" ? "2px solid var(--gov-blue-600)" : "1.5px solid var(--neutral-300)",
                        borderRadius: "var(--radius-md)",
                        padding: "14px 10px",
                        textAlign: "center",
                        cursor: "pointer"
                      }}
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMode === "DEBIT_CARD"}
                        onChange={() => setPaymentMode("DEBIT_CARD")}
                        style={{ display: "none" }}
                      />
                      <div style={{ fontSize: "1.3rem", marginBottom: "4px" }}>💳</div>
                      <strong style={{ display: "block", fontSize: "0.88rem", color: "var(--gov-navy-950)" }}>Debit Card</strong>
                    </label>

                    <label
                      style={{
                        background: paymentMode === "CREDIT_CARD" ? "var(--gov-blue-50)" : "#ffffff",
                        border: paymentMode === "CREDIT_CARD" ? "2px solid var(--gov-blue-600)" : "1.5px solid var(--neutral-300)",
                        borderRadius: "var(--radius-md)",
                        padding: "14px 10px",
                        textAlign: "center",
                        cursor: "pointer"
                      }}
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMode === "CREDIT_CARD"}
                        onChange={() => setPaymentMode("CREDIT_CARD")}
                        style={{ display: "none" }}
                      />
                      <div style={{ fontSize: "1.3rem", marginBottom: "4px" }}>💳</div>
                      <strong style={{ display: "block", fontSize: "0.88rem", color: "var(--gov-navy-950)" }}>Credit Card</strong>
                    </label>

                    <label
                      style={{
                        background: paymentMode === "NETBANKING" ? "var(--gov-blue-50)" : "#ffffff",
                        border: paymentMode === "NETBANKING" ? "2px solid var(--gov-blue-600)" : "1.5px solid var(--neutral-300)",
                        borderRadius: "var(--radius-md)",
                        padding: "14px 10px",
                        textAlign: "center",
                        cursor: "pointer"
                      }}
                    >
                      <input
                        type="radio"
                        name="pay"
                        checked={paymentMode === "NETBANKING"}
                        onChange={() => setPaymentMode("NETBANKING")}
                        style={{ display: "none" }}
                      />
                      <div style={{ fontSize: "1.3rem", marginBottom: "4px" }}>🏦</div>
                      <strong style={{ display: "block", fontSize: "0.88rem", color: "var(--gov-navy-950)" }}>Net Banking</strong>
                    </label>
                  </div>
                </div>
              ) : null}

              {/* Declaration Checkbox */}
              <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "14px 16px", marginBottom: "20px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.86rem", color: "var(--neutral-800)" }}>
                  <input
                    type="checkbox"
                    checked={confirmedDeclaration}
                    onChange={(e) => setConfirmedDeclaration(e.target.checked)}
                    style={{ width: "16px", height: "16px", accentColor: "var(--forest-600)" }}
                  />
                  <span>I confirm that the information provided above is correct to the best of my knowledge.</span>
                </label>
              </div>
            </div>
          )}

          {/* Wizard Navigation Actions */}
          <div className="wizard-actions">
            {currentStep > 0 ? (
              <button
                type="button"
                className="btn-secondary-action"
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                ← Previous Step
              </button>
            ) : <div />}

            {currentStep < 3 ? (
              <button
                type="button"
                className="btn-primary-action"
                onClick={() => {
                  if (currentStep === 1 && !queryText.trim()) {
                    alert("Please enter the text of your RTI request before continuing.");
                    return;
                  }
                  setCurrentStep(currentStep + 1);
                }}
              >
                <span>Continue to Step 0{currentStep + 2}</span>
                <span>→</span>
              </button>
            ) : (
              <button
                type="button"
                className="btn-primary-action"
                onClick={handleFinalSubmit}
                style={{ background: isBPL ? "var(--forest-600)" : "var(--saffron-500)", borderColor: isBPL ? "var(--forest-700)" : "var(--saffron-600)" }}
              >
                {isBPL ? "Submit RTI Request (₹0 BPL Fee) →" : "Pay ₹10 Securely & Submit RTI →"}
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default function NewRequestPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "80px 0", textAlign: "center" }}>Loading RTI Wizard...</div>}>
        <RequestWizardContent />
      </Suspense>
    </PortalPage>
  );
}
