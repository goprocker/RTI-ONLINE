"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { stateRtiPortalsDatabase } from "../../../lib/state-portals";

function EligibilityCheckerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [isCitizen, setIsCitizen] = useState<boolean | null>(true);
  const [jurisdiction, setJurisdiction] = useState<"CENTRAL" | "STATE" | "NOT_SURE">("CENTRAL");
  const [selectedState, setSelectedState] = useState<string>("Maharashtra");
  const [issueQuery, setIssueQuery] = useState(initialQuery);

  const isComplaint =
    issueQuery.toLowerCase().includes("money") ||
    issueQuery.toLowerCase().includes("refund") ||
    issueQuery.toLowerCase().includes("release") ||
    issueQuery.toLowerCase().includes("bribe") ||
    issueQuery.toLowerCase().includes("harass") ||
    issueQuery.toLowerCase().includes("action against");

  function handleContinue() {
    if (isCitizen === false) {
      alert("Under Section 3 of the RTI Act, only citizens of India are eligible to file RTI requests.");
      return;
    }

    if (jurisdiction === "STATE") {
      return;
    }

    router.push(`/request/new${issueQuery ? `?query=${encodeURIComponent(issueQuery)}` : ""}`);
  }

  const matchedState = stateRtiPortalsDatabase.find((s) => s.stateName === selectedState);

  return (
    <main className="wrap" style={{ padding: "40px 20px 80px" }}>
      <div className="bread">
        <Link href="/">Home</Link>
        <span>›</span>
        <span>Before you start</span>
      </div>

      <div className="form-wrap">
        <h1 style={{ fontSize: "1.75rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
          Before you start
        </h1>
        <p style={{ fontSize: "0.9375rem", color: "var(--neutral-600)", lineHeight: "1.5", margin: "0 0 28px" }}>
          Check if your request can be filed through the Central RTI portal.
        </p>

        {/* Question 1: Citizenship */}
        <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "20px", marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "0.9375rem", fontWeight: 600, color: "var(--gov-navy-950)", marginBottom: "10px" }}>
            1. Are you a citizen of India?
          </label>
          <div style={{ display: "flex", gap: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9375rem", cursor: "pointer" }}>
              <input
                type="radio"
                name="citizenship"
                checked={isCitizen === true}
                onChange={() => setIsCitizen(true)}
              />
              Yes
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9375rem", cursor: "pointer" }}>
              <input
                type="radio"
                name="citizenship"
                checked={isCitizen === false}
                onChange={() => setIsCitizen(false)}
              />
              No
            </label>
          </div>
          {isCitizen === false && (
            <div className="gov-alert gov-alert-danger" style={{ marginTop: "12px" }}>
              Section 3 of the RTI Act, 2005 confers the Right to Information specifically to Citizens of India.
            </div>
          )}
        </div>

        {/* Question 2: Jurisdiction */}
        <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "20px", marginBottom: "20px" }}>
          <label style={{ display: "block", fontSize: "0.9375rem", fontWeight: 600, color: "var(--gov-navy-950)", marginBottom: "10px" }}>
            2. Who holds the information you need?
          </label>
          <div style={{ display: "grid", gap: "10px" }}>
            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9375rem", cursor: "pointer" }}>
              <input
                type="radio"
                name="jurisdiction"
                checked={jurisdiction === "CENTRAL"}
                onChange={() => setJurisdiction("CENTRAL")}
                style={{ marginTop: "3px" }}
              />
              <div>
                <strong>Central Government</strong>
                <div style={{ fontSize: "0.8125rem", color: "var(--neutral-500)" }}>
                  Passports, EPFO, Railways, Nationalised Banks, Income Tax, CBSE, UPSC, Defence, Central Universities.
                </div>
              </div>
            </label>

            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9375rem", cursor: "pointer" }}>
              <input
                type="radio"
                name="jurisdiction"
                checked={jurisdiction === "STATE"}
                onChange={() => setJurisdiction("STATE")}
                style={{ marginTop: "3px" }}
              />
              <div>
                <strong>State Government / Local Authority</strong>
                <div style={{ fontSize: "0.8125rem", color: "var(--neutral-500)" }}>
                  State Police, Municipal Corporations, District Collectors, Ration Cards, Land Revenue, State Electricity Boards.
                </div>
              </div>
            </label>

            <label style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "0.9375rem", cursor: "pointer" }}>
              <input
                type="radio"
                name="jurisdiction"
                checked={jurisdiction === "NOT_SURE"}
                onChange={() => setJurisdiction("NOT_SURE")}
                style={{ marginTop: "3px" }}
              />
              <div>
                <strong>I&apos;m not sure</strong>
                <div style={{ fontSize: "0.8125rem", color: "var(--neutral-500)" }}>
                  We will help you identify the authority in the next step.
                </div>
              </div>
            </label>
          </div>

          {/* State Redirection Box */}
          {jurisdiction === "STATE" && (
            <div style={{ marginTop: "16px", padding: "16px", background: "var(--neutral-50)", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)" }}>
              <strong style={{ fontSize: "0.875rem", color: "var(--gov-navy-950)", display: "block", marginBottom: "6px" }}>
                State RTIs cannot be filed on the Central portal
              </strong>
              <p style={{ fontSize: "0.8125rem", color: "var(--neutral-600)", margin: "0 0 12px" }}>
                Select your state to visit their designated state portal or generate a postal application:
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "12px" }}>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="form-control"
                  style={{ flex: "1 1 200px" }}
                >
                  {stateRtiPortalsDatabase.map((s) => (
                    <option key={s.stateName} value={s.stateName}>
                      {s.stateName}
                    </option>
                  ))}
                </select>
                {matchedState?.hasOnlinePortal && (
                  <a
                    href={matchedState.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary-action"
                    style={{ padding: "8px 14px", fontSize: "0.875rem" }}
                  >
                    Go to State Portal ↗
                  </a>
                )}
              </div>
              <Link href="/offline" style={{ fontSize: "0.8125rem", color: "var(--gov-blue-600)" }}>
                Or prepare an offline RTI letter for postal submission →
              </Link>
            </div>
          )}
        </div>

        {/* "Can I RTI this?" Clarification Checker */}
        <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "20px", marginBottom: "28px" }}>
          <label htmlFor="clarify-query" style={{ display: "block", fontSize: "0.9375rem", fontWeight: 600, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
            3. What information are you looking for? (Optional)
          </label>
          <div className="form-hint">
            Describe what you need. We will verify whether it is suitable for an RTI request.
          </div>
          <input
            id="clarify-query"
            type="text"
            value={issueQuery}
            onChange={(e) => setIssueQuery(e.target.value)}
            placeholder="e.g. Why is my EPF pension claim still pending?"
            className="form-control"
          />

          {isComplaint && (
            <div className="gov-alert gov-alert-warning" style={{ marginTop: "12px" }}>
              <strong>Notice:</strong> If you are seeking action on a service dispute, RTI provides <em>official records and decision notes</em>, but cannot order authorities to resolve complaints or release funds. For grievance redressal, consider lodging on <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer">CPGRAMS</a>.
            </div>
          )}
        </div>

        {/* Action Button */}
        {jurisdiction !== "STATE" && (
          <button
            type="button"
            className="btn-primary-action"
            onClick={handleContinue}
            style={{ width: "100%", padding: "12px" }}
          >
            Continue to application →
          </button>
        )}
      </div>
    </main>
  );
}

export default function EligibilityCheckerPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "40px 0" }}>Loading...</div>}>
        <EligibilityCheckerContent />
      </Suspense>
    </PortalPage>
  );
}
