"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../components/portal-shell";
import { findMatchingAuthorities, SearchMatchResult } from "../lib/authorities-data";

export default function Home() {
  const [query, setQuery] = useState("");
  const [guideResult, setGuideResult] = useState<SearchMatchResult | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);

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

  const processSteps = [
    {
      step: 1,
      title: "1. File RTI Application",
      badge: "DAY 0",
      icon: "📝",
      summary: "Citizen submits request online with ₹10 statutory fee or ₹0 BPL waiver.",
      details: [
        "Select Central Public Authority or Ministry using smart search.",
        "Write specific questions up to 3,000 characters or attach supporting PDF.",
        "Optional AI Structuring Assistant formats casual thoughts into statutory queries.",
        "Pay ₹10 via UPI, RuPay, Debit Card, or upload BPL certificate for fee waiver."
      ],
      actionLink: "/request/eligibility",
      actionText: "Start an Application →"
    },
    {
      step: 2,
      title: "2. Registration & Receipt",
      badge: "INSTANT",
      icon: "🎫",
      summary: "Unique Registration Number generated immediately upon payment.",
      details: [
        "Unique 16-character Registration Number issued (e.g. DOPT/R/2026/04812).",
        "Instant SMS & Email acknowledgement dispatched with filing timestamp.",
        "Download official stamped PDF filing receipt for your permanent records."
      ],
      actionLink: "/status",
      actionText: "Track with Reg Number →"
    },
    {
      step: 3,
      title: "3. Nodal Officer Scrutiny",
      badge: "DAY 1 – 5",
      icon: "🏛️",
      summary: "Ministry Nodal Officer verifies jurisdiction and assigns the file.",
      details: [
        "Nodal Officer examines whether information falls under their ministry.",
        "If under another department, transferred electronically under Section 6(3) within 5 days.",
        "If under this ministry, electronically assigned to the concerned wing CPIO."
      ],
      actionLink: "/authorities",
      actionText: "Explore Nodal Authorities →"
    },
    {
      step: 4,
      title: "4. CPIO Record Processing",
      badge: "DAY 6 – 25",
      icon: "🔍",
      summary: "CPIO retrieves official files and prepares statutory disclosure.",
      details: [
        "CPIO retrieves government file records, notesheets, or circulars.",
        "If photocopies exceed standard allowance, an additional fee notice (@ ₹2/page) is issued.",
        "Applicant pays additional fee online; statutory 30-day clock pauses during payment."
      ],
      actionLink: "/search",
      actionText: "Search Existing Disclosures →"
    },
    {
      step: 5,
      title: "5. Official Response Issued",
      badge: "WITHIN 30 DAYS",
      icon: "📄",
      summary: "CPIO furnishes official signed statutory reply order with documents.",
      details: [
        "Official signed CPIO response order uploaded to the citizen dashboard.",
        "SMS and Email alerts notify citizen with direct PDF download link.",
        "Citizen reviews response and marks satisfaction rating on portal."
      ],
      actionLink: "/status",
      actionText: "View Sample Response →"
    },
    {
      step: 6,
      title: "6. Resolution or First Appeal",
      badge: "DAY 30 – 60",
      icon: "⚖️",
      summary: "Satisfied citizens close case; unsatisfied citizens escalate at ₹0 fee.",
      details: [
        "If fully answered: Case marked closed with permanent digital archive access.",
        "If response delayed > 30 days or incomplete: 1-Click First Appeal under Section 19(1) at zero cost.",
        "First Appellate Authority (FAA) issues quasi-judicial order within 30–45 days.",
        "Option to escalate to Central Information Commission (CIC) if FAA fails."
      ],
      actionLink: "/appeal",
      actionText: "File First Appeal →"
    }
  ];

  return (
    <PortalPage>
      {/* 01 — HERO HEADER & SEARCH BAR */}
      <section style={{ padding: "52px 0 44px", background: "linear-gradient(135deg, #eef5fb 0%, #ffffff 50%, #fff8f0 100%)", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 32px" }}>
            <p className="eyebrow" style={{ justifyContent: "center", marginBottom: "8px" }}>
              <span className="eyebrow-line" />
              RIGHT TO INFORMATION SERVICES · CENTRAL GOVERNMENT OF INDIA
              <span className="eyebrow-line" />
            </p>
            <h1 style={{ font: "700 clamp(2.4rem, 4.8vw, 3.8rem)/1.1 var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 14px", letterSpacing: "-0.03em" }}>
              Get Information & File Requests with the <em>Government.</em>
            </h1>
            <p style={{ margin: "0 auto", fontSize: "1.1rem", color: "var(--neutral-600)", lineHeight: "1.6", maxWidth: "700px" }}>
              File RTI applications online, track the statutory 30-day timeline, access public records, or escalate first appeals across Central Ministries and Departments.
            </p>
          </div>

          {/* SINGLE DIRECT SMART QUERY BAR */}
          <div style={{ maxWidth: "740px", margin: "0 auto 32px", background: "#ffffff", border: "2px solid var(--neutral-300)", borderRadius: "var(--radius-xl)", padding: "8px 10px 8px 20px", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "1.3rem" }}>🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="What information are you seeking? (e.g. Passport delay, EPF claim status, CBSE marksheet)..."
              style={{ flex: "1 1 300px", border: 0, outline: "none", fontSize: "0.98rem", color: "var(--gov-navy-950)", padding: "8px 0" }}
            />
            <Link
              href={guideResult ? `/request/new?authority=${encodeURIComponent(guideResult.authority.id)}` : `/request/eligibility?query=${encodeURIComponent(query)}`}
              className="btn-primary-action"
              style={{ background: "var(--saffron-500)", borderColor: "var(--saffron-600)", padding: "12px 24px", fontSize: "0.92rem", whiteSpace: "nowrap" }}
            >
              Start Request →
            </Link>
          </div>

          {/* DYNAMIC SMART ROUTING ALERT */}
          {guideResult && (
            <div style={{ maxWidth: "740px", margin: "-18px auto 32px", background: "var(--gov-blue-50)", border: "1.5px solid #bfdbfe", borderRadius: "var(--radius-lg)", padding: "16px 22px", animation: "fadeIn 0.2s ease-in" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <span className="recommend-badge">★ Recommended Authority</span>
                  <div style={{ fontWeight: 800, color: "var(--gov-navy-950)", fontSize: "1rem", marginTop: "2px" }}>
                    {guideResult.authority.name} ({guideResult.authority.ministry})
                  </div>
                  <div style={{ fontSize: "0.82rem", color: "var(--neutral-600)", marginTop: "2px" }}>
                    {guideResult.authority.nodalOfficerDesc}
                  </div>
                </div>
                <Link
                  href={`/request/new?authority=${encodeURIComponent(guideResult.authority.id)}`}
                  className="btn-secondary-action"
                  style={{ padding: "8px 16px", fontSize: "0.84rem", color: "var(--gov-blue-600)", borderColor: "var(--gov-blue-500)", background: "#ffffff" }}
                >
                  File with this Authority →
                </Link>
              </div>
            </div>
          )}

          {/* GRIEVANCE ALERT */}
          {isGrievanceWord && (
            <div style={{ maxWidth: "740px", margin: "-18px auto 32px", background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: "var(--radius-lg)", padding: "16px 22px" }}>
              <strong style={{ color: "#92400e", display: "block", fontSize: "0.92rem" }}>
                ⚠️ Looking to lodge a grievance or complaint?
              </strong>
              <p style={{ margin: "4px 0 8px", fontSize: "0.85rem", color: "#78350f" }}>
                RTI is for obtaining <strong>existing government records</strong>. For complaints, grievances, or service disputes, file directly on the Central CPGRAMS portal.
              </p>
              <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", fontWeight: 700, color: "#92400e" }}>
                Go to CPGRAMS Grievance Portal ↗
              </a>
            </div>
          )}

          {/* 4 PRIMARY ACTION TILES */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px" }}>
            <Link href="/request/eligibility" className="service-card card-featured" style={{ padding: "26px 22px", background: "#ffffff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.9rem" }}>📝</span>
                <span style={{ background: "var(--saffron-100)", color: "var(--saffron-600)", fontSize: "0.7rem", fontWeight: 800, padding: "3px 8px", borderRadius: "var(--radius-full)" }}>
                  STANDARD ₹10 / ₹0 BPL
                </span>
              </div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                + File a New RTI
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: "0.85rem", color: "var(--neutral-600)" }}>
                Request records, marksheet copies, or processing status from Central Authorities.
              </p>
              <span className="service-card-action" style={{ color: "var(--saffron-600)" }}>
                Start Application →
              </span>
            </Link>

            <Link href="/status" className="service-card" style={{ padding: "26px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.9rem" }}>📍</span>
                <span style={{ background: "var(--gov-blue-100)", color: "var(--gov-blue-600)", fontSize: "0.7rem", fontWeight: 800, padding: "3px 8px", borderRadius: "var(--radius-full)" }}>
                  STATUTORY 30 DAYS
                </span>
              </div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                Track Status & Audit Trail
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: "0.85rem", color: "var(--neutral-600)" }}>
                Enter Registration Number to see step-by-step progress, CPIO assignment, and countdown.
              </p>
              <span className="service-card-action">Track Application →</span>
            </Link>

            <Link href="/search" className="service-card" style={{ padding: "26px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.9rem" }}>🔍</span>
                <span style={{ background: "var(--forest-100)", color: "var(--forest-700)", fontSize: "0.7rem", fontWeight: 800, padding: "3px 8px", borderRadius: "var(--radius-full)" }}>
                  FREE & INSTANT
                </span>
              </div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                Search Public Records
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: "0.85rem", color: "var(--neutral-600)" }}>
                Access published citizen charters, circulars, and previous orders without filing.
              </p>
              <span className="service-card-action" style={{ color: "var(--forest-700)" }}>
                Browse Disclosures →
              </span>
            </Link>

            <Link href="/appeal" className="service-card" style={{ padding: "26px 22px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.9rem" }}>⚖️</span>
                <span style={{ background: "#f1f5f9", color: "var(--neutral-700)", fontSize: "0.7rem", fontWeight: 800, padding: "3px 8px", borderRadius: "var(--radius-full)" }}>
                  ZERO FEE
                </span>
              </div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                First Appeal & Grievances
              </h3>
              <p style={{ margin: "0 0 14px", fontSize: "0.85rem", color: "var(--neutral-600)" }}>
                Unsatisfied with an RTI reply or delayed beyond 30 days? Appeal under Section 19(1).
              </p>
              <span className="service-card-action">File First Appeal →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 02 — COMPLETE 6-STAGE RTI PROCESS FROM FILING TO THE END */}
      <section style={{ padding: "64px 0", background: "#ffffff", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 40px" }}>
            <p className="eyebrow" style={{ justifyContent: "center", marginBottom: "6px" }}>
              <span className="eyebrow-line" />
              STATUTORY CITIZEN JOURNEY · STEP-BY-STEP BREAKDOWN
              <span className="eyebrow-line" />
            </p>
            <h2 style={{ font: "700 clamp(2rem, 3.8vw, 2.7rem) var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 12px" }}>
              How an RTI Works from Filing to Resolution
            </h2>
            <p style={{ color: "var(--neutral-600)", fontSize: "1rem", lineHeight: "1.6" }}>
              Under the Right to Information Act, 2005, public authorities must adhere to strict, time-bound legal steps. Here is the complete journey your application follows:
            </p>
          </div>

          {/* Interactive Step Selector Pills */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px", marginBottom: "32px" }}>
            {processSteps.map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setActiveStep(s.step)}
                style={{
                  background: activeStep === s.step ? "var(--gov-navy-950)" : "var(--neutral-50)",
                  color: activeStep === s.step ? "#ffffff" : "var(--gov-navy-950)",
                  border: activeStep === s.step ? "1.5px solid var(--gov-navy-950)" : "1.5px solid var(--neutral-200)",
                  borderRadius: "var(--radius-lg)",
                  padding: "12px 14px",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.15s ease"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <span style={{ fontSize: "1.2rem" }}>{s.icon}</span>
                  <span style={{ fontSize: "0.68rem", fontWeight: 800, opacity: 0.85, textTransform: "uppercase" }}>{s.badge}</span>
                </div>
                <div style={{ fontSize: "0.82rem", fontWeight: 700 }}>
                  Stage {s.step}
                </div>
              </button>
            ))}
          </div>

          {/* Active Step Detailed Showcase Box */}
          {(() => {
            const current = processSteps.find((s) => s.step === activeStep) || processSteps[0];
            return (
              <div
                style={{
                  background: "linear-gradient(135deg, #071f3a 0%, #0e3563 100%)",
                  color: "#ffffff",
                  borderRadius: "var(--radius-xl)",
                  padding: "36px 42px",
                  boxShadow: "var(--shadow-xl)",
                  animation: "fadeIn 0.2s ease-in"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
                  <div>
                    <span style={{ background: "rgba(255,255,255,0.15)", color: "#fde68a", fontSize: "0.75rem", fontWeight: 800, padding: "3px 10px", borderRadius: "var(--radius-full)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      STAGE {current.step} OF 6 · {current.badge}
                    </span>
                    <h3 style={{ font: "700 1.85rem var(--font-serif)", color: "#ffffff", margin: "8px 0 4px" }}>
                      {current.title}
                    </h3>
                    <p style={{ color: "#cbd5e1", fontSize: "0.96rem", margin: 0 }}>
                      {current.summary}
                    </p>
                  </div>

                  <Link
                    href={current.actionLink}
                    className="btn-primary-action"
                    style={{ background: "var(--saffron-500)", borderColor: "var(--saffron-600)", padding: "12px 22px", fontSize: "0.88rem" }}
                  >
                    {current.actionText}
                  </Link>
                </div>

                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "var(--radius-lg)", padding: "24px", marginTop: "20px" }}>
                  <strong style={{ color: "#fde68a", fontSize: "0.88rem", textTransform: "uppercase", letterSpacing: "0.04em", display: "block", marginBottom: "12px" }}>
                    Key Milestones & Statutory Rules at this Stage:
                  </strong>
                  <ul style={{ margin: 0, paddingLeft: "20px", display: "grid", gap: "10px", color: "#f1f5f9", fontSize: "0.92rem", lineHeight: "1.6" }}>
                    {current.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* 03 — 3-WAY DECISION & SCOPE STRIP */}
      <section style={{ padding: "36px 0", background: "var(--neutral-50)", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          <div style={{ padding: "20px", background: "#ffffff", borderRadius: "var(--radius-lg)", border: "1.5px solid var(--neutral-200)", boxShadow: "var(--shadow-sm)" }}>
            <strong style={{ fontSize: "0.95rem", color: "var(--gov-navy-950)", display: "block", marginBottom: "4px" }}>
              1. Seeking Official Files or Data?
            </strong>
            <p style={{ fontSize: "0.85rem", color: "var(--neutral-600)", margin: "0 0 10px", lineHeight: "1.5" }}>
              Use Central RTI Online to request file copies, inspection records, marksheet evaluation, or budget details.
            </p>
            <Link href="/request/eligibility" style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--gov-blue-600)", textDecoration: "none" }}>
              Start Central RTI Request →
            </Link>
          </div>

          <div style={{ padding: "20px", background: "#ffffff", borderRadius: "var(--radius-lg)", border: "1.5px solid var(--neutral-200)", boxShadow: "var(--shadow-sm)" }}>
            <strong style={{ fontSize: "0.95rem", color: "var(--gov-navy-950)", display: "block", marginBottom: "4px" }}>
              2. Reporting Service Dispute / Complaint?
            </strong>
            <p style={{ fontSize: "0.85rem", color: "var(--neutral-600)", margin: "0 0 10px", lineHeight: "1.5" }}>
              RTI cannot take punitive action on complaints. For service redressal, visit the National CPGRAMS portal.
            </p>
            <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.84rem", fontWeight: 700, color: "#92400e", textDecoration: "none" }}>
              Lodge Public Grievance (CPGRAMS) ↗
            </a>
          </div>

          <div style={{ padding: "20px", background: "#ffffff", borderRadius: "var(--radius-lg)", border: "1.5px solid var(--neutral-200)", boxShadow: "var(--shadow-sm)" }}>
            <strong style={{ fontSize: "0.95rem", color: "var(--gov-navy-950)", display: "block", marginBottom: "4px" }}>
              3. State Dept Without Online Portal?
            </strong>
            <p style={{ fontSize: "0.85rem", color: "var(--neutral-600)", margin: "0 0 10px", lineHeight: "1.5" }}>
              Generate a formal, printable Section 6(1) letter with Indian Postal Order (IPO) instructions ready for posting.
            </p>
            <Link href="/offline" style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--forest-700)", textDecoration: "none" }}>
              Generate Offline RTI Letter →
            </Link>
          </div>
        </div>
      </section>
    </PortalPage>
  );
}
