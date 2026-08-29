"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

export default function UniversalOfflineRTIPage() {
  const { user } = useAuth();

  const [stateName, setStateName] = useState("Maharashtra");
  const [authorityTitle, setAuthorityTitle] = useState("The Public Information Officer (PIO)");
  const [officeName, setOfficeName] = useState("Office of the Commissioner of Police, Pune");
  const [officeAddress, setOfficeAddress] = useState("Sadhu Vaswani Road, Camp, Pune - 411001");
  const [subject, setSubject] = useState("Information regarding certified copy of Police Verification Report");
  const [requestText, setRequestText] = useState("Please provide certified copies under Section 6(1) of the RTI Act 2005:\n1. Status of inward application number XXXXX.\n2. Certified copy of internal dispatch log and inspection report.");
  const [feeMode, setFeeMode] = useState<"IPO" | "COURT_STAMP" | "DD" | "CASH">("IPO");
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
      <main className="wrap" style={{ padding: "40px 20px 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Prepare an offline RTI application</span>
        </div>

        <div className="form-wrap">
          <h1 style={{ fontSize: "1.75rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            Prepare an offline RTI application
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "var(--neutral-600)", lineHeight: "1.5", margin: "0 0 28px" }}>
            Many state departments, municipal bodies, and local authorities do not have online filing portals. Use this tool to generate a standardized Section 6(1) application form ready for postal dispatch.
          </p>

          {!generatedLetter ? (
            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
              <h2 style={{ fontSize: "1.1875rem", color: "var(--gov-navy-950)", margin: "0 0 16px" }}>
                1. Target Public Authority
              </h2>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="target-state">State / Union Territory <span style={{ color: "#dc2626" }}>*</span></label>
                  <input id="target-state" className="form-control" type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="target-officer-title">Officer Designation <span style={{ color: "#dc2626" }}>*</span></label>
                  <input id="target-officer-title" className="form-control" type="text" value={authorityTitle} onChange={(e) => setAuthorityTitle(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="target-office-name">Public Authority / Department Name <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="target-office-name" className="form-control" type="text" value={officeName} onChange={(e) => setOfficeName(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="target-office-addr">Postal Address of Office <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="target-office-addr" className="form-control" type="text" value={officeAddress} onChange={(e) => setOfficeAddress(e.target.value)} />
              </div>

              <h2 style={{ fontSize: "1.1875rem", color: "var(--gov-navy-950)", margin: "24px 0 16px" }}>
                2. Information Requested
              </h2>

              <div className="form-group">
                <label htmlFor="offline-subject">Subject <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="offline-subject" className="form-control" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="offline-query-text">Specific Questions / Records Needed <span style={{ color: "#dc2626" }}>*</span></label>
                <textarea id="offline-query-text" className="form-control" rows={5} value={requestText} onChange={(e) => setRequestText(e.target.value)} />
              </div>

              <h2 style={{ fontSize: "1.1875rem", color: "var(--gov-navy-950)", margin: "24px 0 16px" }}>
                3. Fee Mode & Applicant Details
              </h2>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="fee-mode-select">Fee Payment Mode (₹10)</label>
                  <select id="fee-mode-select" className="form-control" value={feeMode} onChange={(e) => setFeeMode(e.target.value as any)}>
                    <option value="IPO">Indian Postal Order (IPO)</option>
                    <option value="COURT_STAMP">Court Fee Stamp</option>
                    <option value="DD">Demand Draft</option>
                    <option value="CASH">Cash at counter</option>
                  </select>
                </div>
                {feeMode === "IPO" && (
                  <div className="form-group">
                    <label htmlFor="ipo-number-input">IPO Number</label>
                    <input id="ipo-number-input" className="form-control" type="text" value={ipoNumber} onChange={(e) => setIpoNumber(e.target.value)} />
                  </div>
                )}
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="applicant-name">Applicant Name <span style={{ color: "#dc2626" }}>*</span></label>
                  <input id="applicant-name" className="form-control" type="text" value={applicantName} onChange={(e) => setApplicantName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="applicant-phone">Mobile Number <span style={{ color: "#dc2626" }}>*</span></label>
                  <input id="applicant-phone" className="form-control" type="text" value={applicantMobile} onChange={(e) => setApplicantMobile(e.target.value)} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="applicant-address">Postal Address for Reply <span style={{ color: "#dc2626" }}>*</span></label>
                <input id="applicant-address" className="form-control" type="text" value={applicantAddress} onChange={(e) => setApplicantAddress(e.target.value)} />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
                <button
                  type="button"
                  className="btn-primary-action"
                  onClick={() => setGeneratedLetter(true)}
                  style={{ padding: "12px 24px" }}
                >
                  Generate Printable Form →
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <button type="button" className="btn-secondary-action" onClick={() => setGeneratedLetter(false)}>
                  ← Edit details
                </button>
                <button type="button" className="btn-primary-action" onClick={handlePrint}>
                  Print / Save as PDF
                </button>
              </div>

              {/* Form Document Layout */}
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid #000000",
                  padding: "40px",
                  fontFamily: "var(--font-serif)",
                  lineHeight: "1.7",
                  color: "#000000"
                }}
              >
                <div style={{ textAlign: "center", borderBottom: "1px solid #000", paddingBottom: "12px", marginBottom: "20px" }}>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", textTransform: "uppercase" }}>
                    Application for Information under Section 6(1) of the Right to Information Act, 2005
                  </h2>
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <strong>To,</strong><br />
                  {authorityTitle},<br />
                  {officeName},<br />
                  {officeAddress},<br />
                  State of {stateName}, India.
                </div>

                <div style={{ margin: "14px 0" }}>
                  <strong>1. Full Name of Applicant:</strong> {applicantName}<br />
                  <strong>2. Address for Communication:</strong> {applicantAddress}<br />
                  <strong>3. Contact Details:</strong> Mobile: +91 {applicantMobile} | Email: {applicantEmail}<br />
                  <strong>4. Citizenship:</strong> Citizen of India (Section 3 of RTI Act, 2005)
                </div>

                <div style={{ margin: "14px 0" }}>
                  <strong>5. Subject Matter:</strong> <em>{subject}</em>
                </div>

                <div style={{ margin: "14px 0" }}>
                  <strong>6. Particulars of Information Requested:</strong>
                  <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "0.95rem", margin: "4px 0 0" }}>
                    {requestText}
                  </pre>
                </div>

                <div style={{ margin: "14px 0" }}>
                  <strong>7. Fee Details:</strong><br />
                  {feeMode === "IPO" && `An Indian Postal Order (IPO) No. ${ipoNumber} of ₹10/- payable to the Public Authority is enclosed herewith.`}
                  {feeMode === "COURT_STAMP" && "Court Fee Stamp of ₹10/- is affixed on this application."}
                  {feeMode === "DD" && "A Demand Draft of ₹10/- is enclosed."}
                  {feeMode === "CASH" && "Fee of ₹10/- deposited in cash against official receipt."}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
                  <div>
                    <strong>Date:</strong> {new Date().toLocaleDateString("en-IN")}<br />
                    <strong>Place:</strong> {stateName}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <br /><br />
                    ____________________________<br />
                    <strong>Signature of Applicant</strong>
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
