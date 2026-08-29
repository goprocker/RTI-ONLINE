"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../components/portal-shell";
import { findMatchingAuthorities, SearchMatchResult } from "../lib/authorities-data";

export default function Home() {
  const [query, setQuery] = useState("");
  const [guideResult, setGuideResult] = useState<SearchMatchResult | null>(null);

  function handleQueryChange(val: string) {
    setQuery(val);
    if (val.trim().length > 1) {
      const matches = findMatchingAuthorities(val);
      setGuideResult(matches.length > 0 ? matches[0] : null);
    } else {
      setGuideResult(null);
    }
  }

  const isGrievanceWord =
    query.toLowerCase().includes("bribe") ||
    query.toLowerCase().includes("harass") ||
    query.toLowerCase().includes("complaint") ||
    query.toLowerCase().includes("fraud") ||
    query.toLowerCase().includes("corruption");

  return (
    <PortalPage>
      {/* COMPACT & DIRECT CITIZEN PORTAL HERO */}
      <section style={{ padding: "48px 0 60px", background: "linear-gradient(135deg, #eef5fb 0%, #ffffff 50%, #fff8f0 100%)", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap">
          {/* Header Title */}
          <div style={{ textAlign: "center", maxWidth: "760px", margin: "0 auto 32px" }}>
            <p className="eyebrow" style={{ justifyContent: "center", marginBottom: "8px" }}>
              <span className="eyebrow-line" />
              RIGHT TO INFORMATION & CITIZEN SERVICES · GOVERNMENT OF INDIA
              <span className="eyebrow-line" />
            </p>
            <h1 style={{ font: "700 clamp(2.3rem, 4.5vw, 3.6rem)/1.1 var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 12px", letterSpacing: "-0.03em" }}>
              Get Information & File Requests with the <em>Government.</em>
            </h1>
            <p style={{ margin: "0 auto", fontSize: "1.05rem", color: "var(--neutral-600)", lineHeight: "1.6" }}>
              The official, streamlined portal for Indian citizens to file RTIs, track statutory 30-day timelines, search public records, or escalate first appeals across Central Ministries.
            </p>
          </div>

          {/* SINGLE DIRECT SMART QUERY BAR */}
          <div style={{ maxWidth: "720px", margin: "0 auto 36px", background: "#ffffff", border: "2px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "8px 10px 8px 18px", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "1.2rem" }}>🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="What do you want to ask or report? (e.g. Passport delay, EPF claim, CBSE answer script)..."
              style={{ flex: "1 1 300px", border: 0, outline: "none", fontSize: "0.95rem", color: "var(--gov-navy-950)", padding: "8px 0" }}
            />
            <Link
              href={guideResult ? `/request/new?authority=${encodeURIComponent(guideResult.authority.id)}` : `/request/eligibility?query=${encodeURIComponent(query)}`}
              className="btn-primary-action"
              style={{ background: "var(--saffron-500)", borderColor: "var(--saffron-600)", padding: "10px 20px", fontSize: "0.88rem", whiteSpace: "nowrap" }}
            >
              Start Request →
            </Link>
          </div>

          {/* DYNAMIC SMART ROUTING ALERT (IF CITIZEN TYPES QUERY) */}
          {guideResult && (
            <div style={{ maxWidth: "720px", margin: "-20px auto 36px", background: "var(--gov-blue-50)", border: "1.5px solid #bfdbfe", borderRadius: "var(--radius-lg)", padding: "16px 20px", animation: "fadeIn 0.2s ease-in" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <span className="recommend-badge">★ Recommended Authority</span>
                  <div style={{ fontWeight: 800, color: "var(--gov-navy-950)", fontSize: "0.95rem", marginTop: "2px" }}>
                    {guideResult.authority.name} ({guideResult.authority.ministry})
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--neutral-600)", marginTop: "2px" }}>
                    {guideResult.authority.nodalOfficerDesc}
                  </div>
                </div>
                <Link
                  href={`/request/new?authority=${encodeURIComponent(guideResult.authority.id)}`}
                  className="btn-secondary-action"
                  style={{ padding: "6px 14px", fontSize: "0.8rem", color: "var(--gov-blue-600)", borderColor: "var(--gov-blue-500)", background: "#ffffff" }}
                >
                  File with this Authority →
                </Link>
              </div>
            </div>
          )}

          {/* GRIEVANCE WARNING ALERT (IF USER TYPES COMPLAINT / BRIBE / FRAUD) */}
          {isGrievanceWord && (
            <div style={{ maxWidth: "720px", margin: "-20px auto 36px", background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: "var(--radius-lg)", padding: "16px 20px" }}>
              <strong style={{ color: "#92400e", display: "block", fontSize: "0.88rem" }}>
                ⚠️ Looking to report a grievance or service complaint?
              </strong>
              <p style={{ margin: "2px 0 8px", fontSize: "0.82rem", color: "#78350f" }}>
                RTI is for obtaining <strong>existing government records</strong>. For complaints, grievance redressal, or service issues, lodge directly on the National CPGRAMS portal.
              </p>
              <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#92400e" }}>
                Go to CPGRAMS Grievance Portal ↗
              </a>
            </div>
          )}

          {/* 4 PRIMARY SHORT ACTION CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
            {/* Card 1: File RTI */}
            <Link
              href="/request/eligibility"
              className="service-card card-featured"
              style={{ padding: "24px 20px", background: "#ffffff" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.8rem" }}>📝</span>
                <span style={{ background: "var(--saffron-100)", color: "var(--saffron-600)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  STANDARD ₹10 / ₹0 BPL
                </span>
              </div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                + File a New RTI
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: "0.84rem", color: "var(--neutral-600)" }}>
                Request records, marksheet copies, or processing status from Central Authorities.
              </p>
              <span className="service-card-action" style={{ color: "var(--saffron-600)" }}>
                Start Application →
              </span>
            </Link>

            {/* Card 2: Track Status */}
            <Link href="/status" className="service-card" style={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.8rem" }}>📍</span>
                <span style={{ background: "var(--gov-blue-100)", color: "var(--gov-blue-600)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  30-DAY CLOCK
                </span>
              </div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                Track Status & Audit Trail
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: "0.84rem", color: "var(--neutral-600)" }}>
                Enter your Registration Number to see step-by-step progress and officer routing.
              </p>
              <span className="service-card-action">Track Application →</span>
            </Link>

            {/* Card 3: Free Public Search */}
            <Link href="/search" className="service-card" style={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.8rem" }}>🔍</span>
                <span style={{ background: "var(--forest-100)", color: "var(--forest-700)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  FREE & INSTANT
                </span>
              </div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                Search Public Records
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: "0.84rem", color: "var(--neutral-600)" }}>
                Access published citizen charters, circulars, and previous orders without filing.
              </p>
              <span className="service-card-action" style={{ color: "var(--forest-700)" }}>
                Browse Disclosures →
              </span>
            </Link>

            {/* Card 4: First Appeal & Offline */}
            <Link href="/appeal" className="service-card" style={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.8rem" }}>⚖️</span>
                <span style={{ background: "#f1f5f9", color: "var(--neutral-700)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  ZERO FEE
                </span>
              </div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                First Appeal & Grievances
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: "0.84rem", color: "var(--neutral-600)" }}>
                Unsatisfied with an RTI response or delayed beyond 30 days? Appeal under Section 19(1).
              </p>
              <span className="service-card-action">File First Appeal →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK 3-WAY DECISION STRIP (RTI vs GRIEVANCE vs OFFLINE) */}
      <section style={{ padding: "32px 0", background: "#ffffff", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          <div style={{ padding: "16px", background: "var(--neutral-50)", borderRadius: "var(--radius-lg)", border: "1px solid var(--neutral-200)" }}>
            <strong style={{ fontSize: "0.9rem", color: "var(--gov-navy-950)", display: "block", marginBottom: "4px" }}>
              1. Want Official Documents or Records?
            </strong>
            <p style={{ fontSize: "0.82rem", color: "var(--neutral-600)", margin: "0 0 8px", lineHeight: "1.5" }}>
              Use Central RTI Online to request file copies, inspection records, marksheet evaluation, or budget details.
            </p>
            <Link href="/request/eligibility" style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--gov-blue-600)" }}>
              Start Central RTI Request →
            </Link>
          </div>

          <div style={{ padding: "16px", background: "var(--neutral-50)", borderRadius: "var(--radius-lg)", border: "1px solid var(--neutral-200)" }}>
            <strong style={{ fontSize: "0.9rem", color: "var(--gov-navy-950)", display: "block", marginBottom: "4px" }}>
              2. Want Action on a Problem / Complaint?
            </strong>
            <p style={{ fontSize: "0.82rem", color: "var(--neutral-600)", margin: "0 0 8px", lineHeight: "1.5" }}>
              RTI cannot take punitive action on complaints. For service redressal, visit the National CPGRAMS portal.
            </p>
            <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem", fontWeight: 700, color: "#92400e" }}>
              Lodge Public Grievance (CPGRAMS) ↗
            </a>
          </div>

          <div style={{ padding: "16px", background: "var(--neutral-50)", borderRadius: "var(--radius-lg)", border: "1px solid var(--neutral-200)" }}>
            <strong style={{ fontSize: "0.9rem", color: "var(--gov-navy-950)", display: "block", marginBottom: "4px" }}>
              3. State Dept Without Online Portal?
            </strong>
            <p style={{ fontSize: "0.82rem", color: "var(--neutral-600)", margin: "0 0 8px", lineHeight: "1.5" }}>
              Generate a formal, printable Section 6(1) letter with Indian Postal Order (IPO) instructions ready for posting.
            </p>
            <Link href="/offline" style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--forest-700)" }}>
              Generate Offline RTI Letter →
            </Link>
          </div>
        </div>
      </section>
    </PortalPage>
  );
}
