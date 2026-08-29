"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

function OfflineRtiWizard() {
  const searchParams = useSearchParams();
  const stateParam = searchParams.get("state") || "Goa";

  const { user } = useAuth();

  const [stateName, setStateName] = useState(stateParam);
  const [authorityTitle, setAuthorityTitle] = useState("The Public Information Officer (PIO)");
  const [officeName, setOfficeName] = useState("Office of the District Magistrate / Municipal Corporation");
  const [officeAddress, setOfficeAddress] = useState("Collectorate Building, Main Road");
  const [subject, setSubject] = useState("Request for certified copies under Section 6(1) of the RTI Act, 2005");
  const [requestText, setRequestText] = useState("Please provide the following information under Section 6(1) of the RTI Act:\n1. Certified copy of inspection report regarding application no. XXXXX.\n2. Date-wise dispatch log and file notesheets.");
  const [feeMode, setFeeMode] = useState<"IPO" | "COURT_STAMP" | "DD">("IPO");
  const [ipoNumber, setIpoNumber] = useState("45F 881920");

  const [applicantName, setApplicantName] = useState(user?.name || "Rajesh Sharma");
  const [applicantAddress, setApplicantAddress] = useState(user?.address || "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru - 560038");
  const [applicantMobile, setApplicantMobile] = useState(user?.mobile || "9876543210");
  const [applicantEmail, setApplicantEmail] = useState(user?.email || "rajesh.sharma@example.gov.in");

  const [generatedLetter, setGeneratedLetter] = useState(false);

  return (
    <main className="wrap" style={{ padding: "40px 0 80px" }}>
      <div className="bread">
        <Link href="/">Home</Link>
        <span>›</span>
        <Link href="/help">Help</Link>
        <span>›</span>
        <span>Prepare offline RTI application</span>
      </div>

      <div style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ marginBottom: "28px" }}>
          <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
            Prepare an offline RTI application
          </h1>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
            For State Government departments, municipal offices, or district police stations that do not operate an online portal, generate a standardized <strong>Section 6(1) printable application letter</strong> for postal dispatch.
          </p>
        </div>

        {!generatedLetter ? (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
            <h2 style={{ font: "700 1.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 16px" }}>
              1. Target Public Authority
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label htmlFor="off-state" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                  State / Union Territory
                </label>
                <input
                  id="off-state"
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
                />
              </div>

              <div>
                <label htmlFor="off-title" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                  Officer Designation
                </label>
                <input
                  id="off-title"
                  type="text"
                  value={authorityTitle}
                  onChange={(e) => setAuthorityTitle(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "14px" }}>
              <label htmlFor="off-office" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                Name of Department / Public Authority
              </label>
              <input
                id="off-office"
                type="text"
                value={officeName}
                onChange={(e) => setOfficeName(e.target.value)}
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label htmlFor="off-addr" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                Office Postal Address
              </label>
              <input
                id="off-addr"
                type="text"
                value={officeAddress}
                onChange={(e) => setOfficeAddress(e.target.value)}
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
              />
            </div>

            <h2 style={{ font: "700 1.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "24px 0 16px" }}>
              2. Information Requested
            </h2>

            <div style={{ marginBottom: "14px" }}>
              <label htmlFor="off-subject" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                Subject
              </label>
              <input
                id="off-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label htmlFor="off-questions" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                Specific Questions / Information Details
              </label>
              <textarea
                id="off-questions"
                rows={6}
                value={requestText}
                onChange={(e) => setRequestText(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem", lineHeight: "1.5" }}
              />
            </div>

            <h2 style={{ font: "700 1.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "24px 0 16px" }}>
              3. Fee Mode & Applicant Particulars
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label htmlFor="fee-mode-sel" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                  Fee Payment Mode (₹10)
                </label>
                <select
                  id="fee-mode-sel"
                  value={feeMode}
                  onChange={(e) => setFeeMode(e.target.value as any)}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem", background: "#ffffff" }}
                >
                  <option value="IPO">Indian Postal Order (IPO)</option>
                  <option value="COURT_STAMP">Court Fee Stamp (Affixed)</option>
                  <option value="DD">Demand Draft / Banker&apos;s Cheque</option>
                </select>
              </div>

              {feeMode === "IPO" && (
                <div>
                  <label htmlFor="ipo-val" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                    Postal Order (IPO) Number
                  </label>
                  <input
                    id="ipo-val"
                    type="text"
                    value={ipoNumber}
                    onChange={(e) => setIpoNumber(e.target.value)}
                    style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
                  />
                </div>
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "14px" }}>
              <div>
                <label htmlFor="app-name-off" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                  Applicant Full Name
                </label>
                <input
                  id="app-name-off"
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
                />
              </div>

              <div>
                <label htmlFor="app-mob-off" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                  Mobile Number
                </label>
                <input
                  id="app-mob-off"
                  type="tel"
                  value={applicantMobile}
                  onChange={(e) => setApplicantMobile(e.target.value)}
                  style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
                />
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="app-addr-off" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                Postal Address for Reply
              </label>
              <input
                id="app-addr-off"
                type="text"
                value={applicantAddress}
                onChange={(e) => setApplicantAddress(e.target.value)}
                style={{ width: "100%", padding: "9px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.9rem" }}
              />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--neutral-200)" }}>
              <button
                type="button"
                className="btn-hero-primary"
                onClick={() => setGeneratedLetter(true)}
              >
                Generate Printable Letter (Section 6(1)) →
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <button
                type="button"
                onClick={() => setGeneratedLetter(false)}
                style={{ background: "transparent", border: "1px solid var(--neutral-300)", padding: "8px 14px", borderRadius: "var(--radius-md)", fontSize: "0.84rem", fontWeight: 600, cursor: "pointer" }}
              >
                ← Edit details
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="btn-file-primary"
              >
                Print Application (PDF)
              </button>
            </div>

            {/* Printable Letter Layout */}
            <div
              style={{
                background: "#ffffff",
                border: "2px solid var(--gov-navy-950)",
                borderRadius: "var(--radius-sm)",
                padding: "40px 48px",
                fontFamily: "var(--font-serif)",
                lineHeight: "1.7",
                color: "#000000",
                fontSize: "0.95rem"
              }}
            >
              <div style={{ textAlign: "center", borderBottom: "2px solid #000", paddingBottom: "12px", marginBottom: "20px" }}>
                <h2 style={{ margin: "0 0 2px", fontSize: "1.25rem", textTransform: "uppercase" }}>
                  Application for Information under Section 6(1) of the Right to Information Act, 2005
                </h2>
                <div style={{ fontSize: "0.82rem", fontStyle: "italic", fontFamily: "var(--font-sans)" }}>
                  Standard Postal Submission Format
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <strong>To,</strong><br />
                {authorityTitle},<br />
                {officeName},<br />
                {officeAddress},<br />
                State/UT of {stateName}, India.
              </div>

              <div style={{ margin: "14px 0" }}>
                <strong>1. Full Name of Applicant:</strong> {applicantName}<br />
                <strong>2. Address for Communication:</strong> {applicantAddress}<br />
                <strong>3. Contact:</strong> +91 {applicantMobile} | {applicantEmail}<br />
                <strong>4. Citizenship:</strong> Citizen of India (Section 3 of RTI Act, 2005)
              </div>

              <div style={{ margin: "14px 0" }}>
                <strong>5. Subject Matter:</strong><br />
                <em>{subject}</em>
              </div>

              <div style={{ margin: "14px 0" }}>
                <strong>6. Particulars of Information Requested:</strong>
                <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", fontSize: "0.95rem", margin: "4px 0 0", lineHeight: "1.6" }}>
                  {requestText}
                </pre>
              </div>

              <div style={{ margin: "14px 0" }}>
                <strong>7. Fee Details:</strong><br />
                {feeMode === "IPO" && `An Indian Postal Order (IPO) No. ${ipoNumber} of ₹10/- payable to the Public Authority is enclosed herewith.`}
                {feeMode === "COURT_STAMP" && "Court Fee Stamp of ₹10/- is affixed on this application."}
                {feeMode === "DD" && "Demand Draft of ₹10/- in favour of the Accounts Officer is enclosed."}
              </div>

              <div style={{ margin: "14px 0" }}>
                <strong>8. Declaration:</strong><br />
                I hereby declare that I am a Citizen of India and the information sought falls within the jurisdiction of your public authority.
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px", paddingTop: "14px" }}>
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
  );
}

export default function OfflineRtiPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "40px 0" }}>Loading offline generator...</div>}>
        <OfflineRtiWizard />
      </Suspense>
    </PortalPage>
  );
}
