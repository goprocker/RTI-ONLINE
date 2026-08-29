"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

export default function UniversalOfflineRTIPage() {
  const { user } = useAuth();

  const [stateName, setStateName] = useState("Maharashtra");
  const [authorityTitle, setAuthorityTitle] = useState("Public Information Officer (PIO)");
  const [officeName, setOfficeName] = useState("Office of the Commissioner of Police, Pune / Municipal Corporation");
  const [officeAddress, setOfficeAddress] = useState("Sadhu Vaswani Road, Camp, Pune - 411001");
  const [subject, setSubject] = useState("Information regarding certified copy of Police Verification Report");
  const [requestText, setRequestText] = useState("Please provide certified copies under Section 6(1) of the RTI Act 2005:\n1. Status of inward application number XXXXX.\n2. Certified copy of internal dispatch log and inspection report.");
  const [feeMode, setFeeMode] = useState<"IPO" | "DD" | "COURT_STAMP" | "CASH">("IPO");
  const [ipoNumber, setIpoNumber] = useState("45F 881920");

  const [applicantName, setApplicantName] = useState(user?.name || "Rajesh Sharma");
  const [applicantAddress, setApplicantAddress] = useState(user?.address || "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038");
  const [applicantMobile, setApplicantMobile] = useState(user?.mobile || "9876543210");
  const [applicantEmail, setApplicantEmail] = useState(user?.email || "rajesh.sharma@example.gov.in");

  const [generatedLetter, setGeneratedLetter] = useState(false);

  function handlePrint() {
    window.print();
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>State & Offline Physical RTI Application Generator</span>
        </div>

        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          {/* Header Banner */}
          <div style={{ background: "linear-gradient(135deg, #071f3a 0%, #0e3563 100%)", color: "#ffffff", borderRadius: "var(--radius-xl)", padding: "34px 38px", marginBottom: "32px", boxShadow: "var(--shadow-lg)" }}>
            <p className="eyebrow" style={{ color: "#fcd34d", marginBottom: "6px" }}>
              <span className="eyebrow-line" style={{ background: "#fcd34d" }} />
              UNIVERSAL OFFLINE FILING HELPER · SECTION 6(1)
            </p>
            <h1 style={{ font: "700 2.1rem var(--font-serif)", color: "#ffffff", margin: "0 0 8px" }}>
              Offline & State RTI Generator
            </h1>
            <p style={{ color: "#cbd5e1", fontSize: "0.92rem", lineHeight: "1.6", margin: 0 }}>
              Many state departments, municipal bodies, and local police stations do not yet operate online RTI portals. Use this tool to generate a standardized, legally compliant <strong>Section 6(1) RTI Application Form</strong> ready for physical submission with an Indian Postal Order (IPO) or Court Fee Stamp.
            </p>
          </div>

          {!generatedLetter ? (
            <div style={{ background: "#ffffff", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "36px", boxShadow: "var(--shadow-md)" }}>
              <h2 style={{ font: "700 1.4rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 20px" }}>
                1. Target Public Authority & Department
              </h2>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="target-state">State / Union Territory <span className="required">*</span></label>
                  <input
                    id="target-state"
                    className="form-control"
                    type="text"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="e.g. Maharashtra, Tamil Nadu, Uttar Pradesh"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="target-officer-title">Designation of Officer <span className="required">*</span></label>
                  <input
                    id="target-officer-title"
                    className="form-control"
                    type="text"
                    value={authorityTitle}
                    onChange={(e) => setAuthorityTitle(e.target.value)}
                    placeholder="e.g. The Public Information Officer (PIO)"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="target-office-name">Name of Public Authority / Department <span className="required">*</span></label>
                <input
                  id="target-office-name"
                  className="form-control"
                  type="text"
                  value={officeName}
                  onChange={(e) => setOfficeName(e.target.value)}
                  placeholder="e.g. Office of the Commissioner of Police, Pune / Municipal Corporation"
                />
              </div>

              <div className="form-group">
                <label htmlFor="target-office-addr">Postal Address of Public Authority Office <span className="required">*</span></label>
                <input
                  id="target-office-addr"
                  className="form-control"
                  type="text"
                  value={officeAddress}
                  onChange={(e) => setOfficeAddress(e.target.value)}
                  placeholder="Street, City, PIN Code"
                />
              </div>

              <h2 style={{ font: "700 1.4rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "30px 0 20px" }}>
                2. Information Requested (Section 6(1))
              </h2>

              <div className="form-group">
                <label htmlFor="offline-subject">Subject of Application <span className="required">*</span></label>
                <input
                  id="offline-subject"
                  className="form-control"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Request for certified copy of police verification report"
                />
              </div>

              <div className="form-group">
                <label htmlFor="offline-query-text">Specific Questions / Records Required <span className="required">*</span></label>
                <textarea
                  id="offline-query-text"
                  className="form-control"
                  rows={6}
                  value={requestText}
                  onChange={(e) => setRequestText(e.target.value)}
                  placeholder="Numbered list of specific documents and records needed..."
                />
              </div>

              <h2 style={{ font: "700 1.4rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "30px 0 20px" }}>
                3. Application Fee Mode & Applicant Details
              </h2>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="fee-mode-select">Fee Payment Mode (₹10) <span className="required">*</span></label>
                  <select
                    id="fee-mode-select"
                    className="form-control"
                    value={feeMode}
                    onChange={(e) => setFeeMode(e.target.value as any)}
                  >
                    <option value="IPO">Indian Postal Order (IPO) — Recommended</option>
                    <option value="COURT_STAMP">Court Fee Stamp (Affixed on Letter)</option>
                    <option value="DD">Demand Draft / Banker&apos;s Cheque</option>
                    <option value="CASH">Cash (at Department Public Counter)</option>
                  </select>
                </div>
                {feeMode === "IPO" && (
                  <div className="form-group">
                    <label htmlFor="ipo-number-input">IPO Number (From Post Office)</label>
                    <input
                      id="ipo-number-input"
                      className="form-control"
                      type="text"
                      value={ipoNumber}
                      onChange={(e) => setIpoNumber(e.target.value)}
                      placeholder="e.g. 45F 881920"
                    />
                  </div>
                )}
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="applicant-name">Applicant Full Name <span className="required">*</span></label>
                  <input
                    id="applicant-name"
                    className="form-control"
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="applicant-phone">Mobile Number <span className="required">*</span></label>
                  <input
                    id="applicant-phone"
                    className="form-control"
                    type="text"
                    value={applicantMobile}
                    onChange={(e) => setApplicantMobile(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="applicant-address">Postal Address for Receiving Reply <span className="required">*</span></label>
                <input
                  id="applicant-address"
                  className="form-control"
                  type="text"
                  value={applicantAddress}
                  onChange={(e) => setApplicantAddress(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--neutral-200)" }}>
                <button
                  type="button"
                  className="btn-primary-action"
                  onClick={() => setGeneratedLetter(true)}
                  style={{ padding: "14px 28px" }}
                >
                  Generate Printable Form (Section 6(1)) →
                </button>
              </div>
            </div>
          ) : (
            /* PRINTABLE FORM PREVIEW */
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <button
                  type="button"
                  className="btn-secondary-action"
                  onClick={() => setGeneratedLetter(false)}
                >
                  ← Edit Details
                </button>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    className="btn-primary-action"
                    onClick={handlePrint}
                    style={{ background: "var(--forest-600)", borderColor: "var(--forest-700)" }}
                  >
                    🖨️ Print RTI Application Form (PDF)
                  </button>
                </div>
              </div>

              {/* Form Layout */}
              <div
                style={{
                  background: "#ffffff",
                  border: "2px solid var(--gov-navy-950)",
                  borderRadius: "var(--radius-md)",
                  padding: "48px 52px",
                  boxShadow: "var(--shadow-xl)",
                  fontFamily: "var(--font-serif)",
                  lineHeight: "1.7",
                  color: "#000000"
                }}
              >
                <div style={{ textAlign: "center", borderBottom: "2px solid #000", paddingBottom: "14px", marginBottom: "24px" }}>
                  <h2 style={{ margin: "0 0 4px", fontSize: "1.4rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                    Application for Information under Section 6(1) of the Right to Information Act, 2005
                  </h2>
                  <div style={{ fontSize: "0.85rem", fontStyle: "italic", fontFamily: "var(--font-sans)" }}>
                    Prescribed Statutory Format for Physical / Postal Submission
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <strong>To,</strong><br />
                  {authorityTitle},<br />
                  {officeName},<br />
                  {officeAddress},<br />
                  State of {stateName}, India.
                </div>

                <div style={{ margin: "18px 0" }}>
                  <strong>1. Full Name of the Applicant:</strong> {applicantName}<br />
                  <strong>2. Address for Communication:</strong> {applicantAddress}<br />
                  <strong>3. Contact Details:</strong> Mobile: +91 {applicantMobile} | Email: {applicantEmail}<br />
                  <strong>4. Citizenship:</strong> Citizen of India (Section 3 of RTI Act, 2005)
                </div>

                <div style={{ margin: "18px 0" }}>
                  <strong>5. Subject Matter of Information:</strong><br />
                  <em>{subject}</em>
                </div>

                <div style={{ margin: "18px 0" }}>
                  <strong>6. Particulars of Information Requested:</strong>
                  <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "1rem", margin: "6px 0 0", lineHeight: "1.7" }}>
                    {requestText}
                  </pre>
                </div>

                <div style={{ margin: "18px 0" }}>
                  <strong>7. Application Fee Details:</strong><br />
                  {feeMode === "IPO" && `An Indian Postal Order (IPO) No. ${ipoNumber} of ₹10/- (Rupees Ten only) payable to the Public Authority is enclosed herewith.`}
                  {feeMode === "COURT_STAMP" && "Court Fee Stamp of ₹10/- (Rupees Ten only) is affixed on the top right corner of this application."}
                  {feeMode === "DD" && "A Demand Draft / Banker's Cheque of ₹10/- in favour of the Accounts Officer is enclosed."}
                  {feeMode === "CASH" && "Prescribed statutory fee of ₹10/- deposited in cash against official cash receipt."}
                </div>

                <div style={{ margin: "18px 0" }}>
                  <strong>8. Statutory Declaration:</strong><br />
                  I hereby declare that I am a Citizen of India and the information sought falls within the jurisdiction of your public authority.
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "48px", paddingTop: "20px" }}>
                  <div>
                    <strong>Date:</strong> {new Date().toLocaleDateString("en-IN")}<br />
                    <strong>Place:</strong> {stateName}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <br /><br />
                    ____________________________<br />
                    <strong>Signature of Applicant</strong><br />
                    ({applicantName})
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </PortalPage>
  );
}
