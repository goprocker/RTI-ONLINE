"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { allIndiaStatePortals } from "../../../lib/state-portals";

export default function EligibilityCheckPage() {
  const [isIndianCitizen, setIsIndianCitizen] = useState<boolean | null>(true);
  const [govLevel, setGovLevel] = useState<"CENTRAL" | "STATE" | "NOT_SURE">("CENTRAL");
  const [selectedState, setSelectedState] = useState<string>("Maharashtra");
  const [canIRtiText, setCanIRtiText] = useState("");

  const stateInfo = allIndiaStatePortals.find((s) => s.state === selectedState);

  const isComplaint =
    canIRtiText.toLowerCase().includes("money") ||
    canIRtiText.toLowerCase().includes("pension release") ||
    canIRtiText.toLowerCase().includes("harass") ||
    canIRtiText.toLowerCase().includes("bribe") ||
    canIRtiText.toLowerCase().includes("fire officer");

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/request">File RTI</Link>
          <span>›</span>
          <span>Before you start</span>
        </div>

        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          {/* Header Title */}
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
              Before you start
            </h1>
            <p style={{ color: "var(--neutral-600)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
              Under the RTI Act, 2005, only Indian citizens can request public information. This portal processes requests for <strong>Central Government Public Authorities</strong>.
            </p>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
            {/* Question 1: Citizenship */}
            <fieldset style={{ border: 0, padding: 0, margin: "0 0 28px" }}>
              <legend style={{ fontWeight: 700, fontSize: "1rem", color: "var(--gov-navy-950)", marginBottom: "10px" }}>
                1. Are you a Citizen of India? <span style={{ color: "#dc2626" }}>*</span>
              </legend>
              <div style={{ display: "flex", gap: "24px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.92rem" }}>
                  <input
                    type="radio"
                    name="citizenship"
                    checked={isIndianCitizen === true}
                    onChange={() => setIsIndianCitizen(true)}
                  />
                  <span>Yes, I am an Indian Citizen</span>
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.92rem" }}>
                  <input
                    type="radio"
                    name="citizenship"
                    checked={isIndianCitizen === false}
                    onChange={() => setIsIndianCitizen(false)}
                  />
                  <span>No</span>
                </label>
              </div>

              {isIndianCitizen === false && (
                <div style={{ marginTop: "12px", padding: "12px 14px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "var(--radius-sm)", fontSize: "0.84rem", color: "#991b1b" }}>
                  Section 3 of the Right to Information Act, 2005 restricts the right to receive information to Indian citizens only.
                </div>
              )}
            </fieldset>

            {/* Question 2: Central vs State Jurisdiction */}
            <fieldset style={{ border: 0, padding: 0, margin: "0 0 28px" }}>
              <legend style={{ fontWeight: 700, fontSize: "1rem", color: "var(--gov-navy-950)", marginBottom: "10px" }}>
                2. Who do you think holds the information? <span style={{ color: "#dc2626" }}>*</span>
              </legend>

              <div style={{ display: "grid", gap: "10px" }}>
                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", cursor: "pointer", background: govLevel === "CENTRAL" ? "var(--neutral-50)" : "#ffffff" }}>
                  <input
                    type="radio"
                    name="govLevel"
                    checked={govLevel === "CENTRAL"}
                    onChange={() => setGovLevel("CENTRAL")}
                    style={{ marginTop: "4px" }}
                  />
                  <div>
                    <strong style={{ color: "var(--gov-navy-950)", fontSize: "0.92rem", display: "block" }}>
                      Central Government / Ministry / PSU
                    </strong>
                    <span style={{ fontSize: "0.82rem", color: "var(--neutral-600)" }}>
                      Includes Passports (MEA), Railways, EPFO, Income Tax, CBSE, Nationalized Banks, UPSC, Defense.
                    </span>
                  </div>
                </label>

                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", cursor: "pointer", background: govLevel === "STATE" ? "var(--neutral-50)" : "#ffffff" }}>
                  <input
                    type="radio"
                    name="govLevel"
                    checked={govLevel === "STATE"}
                    onChange={() => setGovLevel("STATE")}
                    style={{ marginTop: "4px" }}
                  />
                  <div>
                    <strong style={{ color: "var(--gov-navy-950)", fontSize: "0.92rem", display: "block" }}>
                      State Government / Police / Municipality
                    </strong>
                    <span style={{ fontSize: "0.82rem", color: "var(--neutral-600)" }}>
                      Includes State Police, Municipal Corporations, Ration cards, Land records, State Universities.
                    </span>
                  </div>
                </label>

                <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "12px", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", cursor: "pointer", background: govLevel === "NOT_SURE" ? "var(--neutral-50)" : "#ffffff" }}>
                  <input
                    type="radio"
                    name="govLevel"
                    checked={govLevel === "NOT_SURE"}
                    onChange={() => setGovLevel("NOT_SURE")}
                    style={{ marginTop: "4px" }}
                  />
                  <div>
                    <strong style={{ color: "var(--gov-navy-950)", fontSize: "0.92rem", display: "block" }}>
                      I am not sure
                    </strong>
                    <span style={{ fontSize: "0.82rem", color: "var(--neutral-600)" }}>
                      Our assistant will help identify the authority during the request stage.
                    </span>
                  </div>
                </label>
              </div>
            </fieldset>

            {/* STATE DIRECTORY (ALL 28 STATES + 8 UTs WITH ONLINE vs OFFLINE ROUTING) */}
            {govLevel === "STATE" && (
              <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: "var(--radius-md)", padding: "18px 20px", marginBottom: "28px" }}>
                <strong style={{ color: "#92400e", fontSize: "0.92rem", display: "block", marginBottom: "6px" }}>
                  State Government RTI Directory
                </strong>
                <p style={{ fontSize: "0.84rem", color: "#78350f", margin: "0 0 12px", lineHeight: "1.5" }}>
                  Central RTI Online does not process State matters. Select your State to view its official portal or generate an offline Section 6(1) letter:
                </p>

                <div style={{ marginBottom: "14px" }}>
                  <label htmlFor="state-select" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#92400e", display: "block", marginBottom: "4px" }}>
                    Select State / Union Territory:
                  </label>
                  <select
                    id="state-select"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    style={{ width: "100%", padding: "8px 12px", border: "1px solid #d97706", borderRadius: "var(--radius-sm)", fontSize: "0.88rem", background: "#ffffff", color: "var(--neutral-900)" }}
                  >
                    {allIndiaStatePortals.map((s) => (
                      <option key={s.state} value={s.state}>
                        {s.state} {s.hasOnlinePortal ? "(Online Portal Available)" : "(Offline Filing via Postal Order)"}
                      </option>
                    ))}
                  </select>
                </div>

                {stateInfo && (
                  <div style={{ background: "#ffffff", border: "1px solid #fcd34d", borderRadius: "var(--radius-sm)", padding: "14px", fontSize: "0.82rem" }}>
                    <div style={{ fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                      {stateInfo.state} RTI Guidelines:
                    </div>
                    <p style={{ margin: "0 0 8px", color: "var(--neutral-700)" }}>
                      {stateInfo.description}
                    </p>
                    <div style={{ color: "var(--neutral-600)", marginBottom: "12px" }}>
                      <strong>Prescribed Fee Mode: </strong>{stateInfo.feeMode}
                    </div>

                    {stateInfo.hasOnlinePortal && stateInfo.portalUrl ? (
                      <a
                        href={stateInfo.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-file-primary"
                        style={{ display: "inline-block", background: "var(--gov-navy-900)", padding: "8px 14px", fontSize: "0.82rem" }}
                      >
                        Go to Official {stateInfo.portalName || "State Portal"} ↗
                      </a>
                    ) : (
                      <Link
                        href={`/offline?state=${encodeURIComponent(stateInfo.state)}`}
                        className="btn-hero-primary"
                        style={{ display: "inline-block", padding: "8px 14px", fontSize: "0.82rem" }}
                      >
                        Prepare Offline Section 6(1) Form for {stateInfo.state} →
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* HELPFUL "CAN I RTI THIS?" CHECKER */}
            <div style={{ borderTop: "1px solid var(--neutral-200)", paddingTop: "20px", marginTop: "10px" }}>
              <label htmlFor="can-i-rti" style={{ display: "block", fontSize: "0.88rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                Unsure if RTI is right for your issue?
              </label>
              <input
                id="can-i-rti"
                type="text"
                value={canIRtiText}
                onChange={(e) => setCanIRtiText(e.target.value)}
                placeholder="Type your issue (e.g. My PF money hasn't arrived, or want certified marksheet)..."
                style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", color: "var(--neutral-900)" }}
              />

              {canIRtiText && (
                <div style={{ marginTop: "10px", background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-sm)", padding: "12px 14px", fontSize: "0.82rem" }}>
                  {isComplaint ? (
                    <div>
                      <strong style={{ color: "#92400e", display: "block", marginBottom: "4px" }}>
                        You may want to file a grievance first:
                      </strong>
                      <div style={{ color: "var(--neutral-700)", lineHeight: "1.5" }}>
                        • RTI can give you: <em>processing logs, file copies, reasons recorded on file</em>.<br />
                        • RTI cannot: <em>order release of funds or resolve service complaints</em>.<br />
                        <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" style={{ color: "#92400e", fontWeight: 700 }}>
                          Lodge Grievance on CPGRAMS ↗
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <strong style={{ color: "var(--forest-700)", display: "block", marginBottom: "2px" }}>
                        ✓ Suitable for RTI:
                      </strong>
                      <span style={{ color: "var(--neutral-700)" }}>
                        You can request official notesheets, circulars, inspection reports, and certified documents.
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "32px", paddingTop: "18px", borderTop: "1px solid var(--neutral-200)" }}>
              {isIndianCitizen && govLevel !== "STATE" && (
                <Link
                  href="/request/new"
                  className="btn-hero-primary"
                >
                  Continue to application (1 of 4) →
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </PortalPage>
  );
}
