"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { stateRTIPortals } from "../../../lib/state-portals";

export default function EligibilityPage() {
  const router = useRouter();

  const [isCitizen, setIsCitizen] = useState(true);
  const [queryTopic, setQueryTopic] = useState("");
  const [govLevel, setGovLevel] = useState<"CENTRAL" | "STATE" | "NOT_SURE">("CENTRAL");
  const [selectedState, setSelectedState] = useState("Maharashtra");

  function handleContinue(e: FormEvent) {
    e.preventDefault();
    if (!isCitizen) {
      alert("Under Section 3 of RTI Act 2005, only Citizens of India have the right to request information.");
      return;
    }
    if (govLevel === "STATE") {
      alert("Please use the appropriate State Government RTI portal listed below.");
      return;
    }
    // Proceed to Step 1: Auth & Filing
    router.push(`/request/new?query=${encodeURIComponent(queryTopic)}`);
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/request">Submit Request</Link>
          <span>›</span>
          <span>Before You Begin (Eligibility Check)</span>
        </div>

        <div style={{ maxWidth: "700px", margin: "0 auto", background: "#ffffff", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "38px", boxShadow: "var(--shadow-lg)" }}>
          <p className="eyebrow" style={{ marginBottom: "6px" }}>
            <span className="eyebrow-line" />
            STEP 0 OF 4 · ELIGIBILITY & JURISDICTION CHECK
          </p>
          <h1 style={{ font: "700 2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 10px" }}>
            Before we start your RTI
          </h1>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.92rem", lineHeight: "1.6", margin: "0 0 24px" }}>
            This service helps Indian citizens request existing public records, policies, and documents from Central Government public authorities under the RTI Act, 2005.
          </p>

          <form onSubmit={handleContinue}>
            {/* Citizen Confirmation Checkbox */}
            <div style={{ background: "var(--neutral-50)", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "16px 18px", marginBottom: "22px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", fontSize: "0.92rem", fontWeight: 700, color: "var(--gov-navy-950)" }}>
                <input
                  type="checkbox"
                  checked={isCitizen}
                  onChange={(e) => setIsCitizen(e.target.checked)}
                  style={{ width: "18px", height: "18px", accentColor: "var(--forest-600)" }}
                />
                <span>✓ I confirm that I am a Citizen of India (Section 3, RTI Act)</span>
              </label>
            </div>

            {/* Query topic */}
            <div className="form-group">
              <label htmlFor="topic-query" style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--gov-navy-950)" }}>
                What information or documents are you looking for?
              </label>
              <input
                id="topic-query"
                className="form-control"
                type="text"
                value={queryTopic}
                onChange={(e) => setQueryTopic(e.target.value)}
                placeholder="e.g. Details about my passport application delay, EPFO PF claim, CBSE marksheet..."
              />
            </div>

            {/* Proactive Central vs State Government Jurisdiction Detection */}
            <div className="form-group" style={{ marginTop: "24px" }}>
              <label style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--gov-navy-950)", display: "block", marginBottom: "8px" }}>
                Are you looking for information from:
              </label>

              <div style={{ display: "grid", gap: "12px" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    border: govLevel === "CENTRAL" ? "2px solid var(--gov-blue-600)" : "1.5px solid var(--neutral-300)",
                    background: govLevel === "CENTRAL" ? "var(--gov-blue-50)" : "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  <input
                    type="radio"
                    name="gov-level"
                    checked={govLevel === "CENTRAL"}
                    onChange={() => setGovLevel("CENTRAL")}
                    style={{ marginTop: "3px" }}
                  />
                  <div>
                    <strong style={{ display: "block", color: "var(--gov-navy-950)", fontSize: "0.92rem" }}>
                      Central Government Authorities (Supported by this portal)
                    </strong>
                    <span style={{ fontSize: "0.78rem", color: "var(--neutral-600)" }}>
                      Ministries (MEA, Finance, Home, Defence), Railways, Passports, EPFO, Income Tax, CBSE, UPSC, National Banks, etc.
                    </span>
                  </div>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    border: govLevel === "STATE" ? "2px solid var(--amber-600)" : "1.5px solid var(--neutral-300)",
                    background: govLevel === "STATE" ? "var(--amber-50)" : "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  <input
                    type="radio"
                    name="gov-level"
                    checked={govLevel === "STATE"}
                    onChange={() => setGovLevel("STATE")}
                    style={{ marginTop: "3px" }}
                  />
                  <div>
                    <strong style={{ display: "block", color: "var(--gov-navy-950)", fontSize: "0.92rem" }}>
                      State Government Authorities (Requires State RTI Portal)
                    </strong>
                    <span style={{ fontSize: "0.78rem", color: "var(--neutral-600)" }}>
                      State Police, Municipal Corporations (BMC, BBMP, MCD), Tahsildar/Land Revenue, State Electricity Boards, District Hospitals.
                    </span>
                  </div>
                </label>

                <label
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    border: govLevel === "NOT_SURE" ? "2px solid var(--gov-blue-600)" : "1.5px solid var(--neutral-300)",
                    background: govLevel === "NOT_SURE" ? "var(--gov-blue-50)" : "#ffffff",
                    cursor: "pointer"
                  }}
                >
                  <input
                    type="radio"
                    name="gov-level"
                    checked={govLevel === "NOT_SURE"}
                    onChange={() => setGovLevel("NOT_SURE")}
                    style={{ marginTop: "3px" }}
                  />
                  <div>
                    <strong style={{ display: "block", color: "var(--gov-navy-950)", fontSize: "0.92rem" }}>
                      I am not sure
                    </strong>
                    <span style={{ fontSize: "0.78rem", color: "var(--neutral-600)" }}>
                      Our Smart Public Authority Finder will analyze your query and recommend the right authority.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* If STATE GOVERNMENT is selected: Proactive Guidance Box */}
            {govLevel === "STATE" && (
              <div style={{ background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: "var(--radius-lg)", padding: "20px", marginTop: "20px", animation: "fadeIn 0.2s ease-in" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#92400e", marginBottom: "8px" }}>
                  <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                  <strong style={{ fontSize: "0.95rem" }}>Important Notice: State Government RTI</strong>
                </div>
                <p style={{ fontSize: "0.85rem", color: "#78350f", lineHeight: "1.6", margin: "0 0 14px" }}>
                  This national portal <strong>only processes Central Government RTI applications</strong>. As per official RTI guidelines, applications for State departments submitted here cannot be accepted and will be returned without refund.
                </p>

                <label htmlFor="state-select" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#92400e", display: "block", marginBottom: "6px" }}>
                  Find your State Government RTI Portal:
                </label>
                <select
                  id="state-select"
                  className="form-control"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  style={{ background: "#ffffff", marginBottom: "12px" }}
                >
                  {stateRTIPortals.map((sp) => (
                    <option key={sp.stateName} value={sp.stateName}>
                      {sp.stateName} — {sp.portalName}
                    </option>
                  ))}
                </select>

                {(() => {
                  const portal = stateRTIPortals.find((p) => p.stateName === selectedState);
                  if (!portal) return null;
                  return (
                    <div style={{ background: "#ffffff", padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid #fde68a" }}>
                      <strong style={{ fontSize: "0.86rem", color: "var(--gov-navy-950)" }}>{portal.portalName}</strong>
                      <p style={{ fontSize: "0.78rem", color: "var(--neutral-600)", margin: "2px 0 8px" }}>{portal.notes}</p>
                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary-action"
                        style={{ padding: "6px 12px", fontSize: "0.8rem", color: "#92400e", borderColor: "#fcd34d" }}
                      >
                        Visit Official {portal.stateName} RTI Portal ↗
                      </a>
                    </div>
                  );
                })()}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--neutral-200)" }}>
              <Link href="/" className="btn-secondary-action">
                ← Back to Home
              </Link>

              {govLevel !== "STATE" ? (
                <button type="submit" className="btn-primary-action">
                  Continue to Application →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setGovLevel("CENTRAL")}
                  className="btn-secondary-action"
                  style={{ color: "var(--gov-blue-600)" }}
                >
                  Switch to Central Government RTI
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </PortalPage>
  );
}
