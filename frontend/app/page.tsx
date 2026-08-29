"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../components/portal-shell";
import { findMatchingAuthorities, SearchMatchResult } from "../lib/authorities-data";

type ScenarioKey = "SMOOTH" | "TRANSFER" | "FEE_DEMAND" | "APPEAL";

interface JourneyStage {
  dayLabel: string;
  citizenAction: string;
  officerAction: string;
  statusBadge: string;
  statusColor: string;
  icon: string;
}

const scenarios: Record<
  ScenarioKey,
  {
    title: string;
    subtitle: string;
    icon: string;
    tag: string;
    summary: string;
    stages: JourneyStage[];
  }
> = {
  SMOOTH: {
    title: "Scenario A: Standard 20-Day Resolution",
    subtitle: "Most common flow for direct public records & status queries",
    icon: "⚡",
    tag: "NORMAL RESOLUTION · 85% CASES",
    summary: "Your request is directly with the correct ministry and information is provided within 20 days.",
    stages: [
      {
        dayLabel: "Day 0 · Filing",
        citizenAction: "Submit request & pay ₹10 (or ₹0 BPL waiver). Instant Reg No. generated.",
        officerAction: "Electronic file arrives in Ministry RTI Nodal Cell inward registry.",
        statusBadge: "SUBMITTED",
        statusColor: "#2563eb",
        icon: "📝"
      },
      {
        dayLabel: "Day 3 · Scrutiny",
        citizenAction: "Receive SMS: File assigned to Wing CPIO.",
        officerAction: "Nodal Officer reviews jurisdiction and assigns file to Deputy Secretary & CPIO.",
        statusBadge: "ASSIGNED TO CPIO",
        statusColor: "#0891b2",
        icon: "🏛️"
      },
      {
        dayLabel: "Day 12 · Retrieval",
        citizenAction: "Track real-time progress on dashboard.",
        officerAction: "CPIO retrieves official branch records, circulars, and notesheet excerpts.",
        statusBadge: "UNDER PROCESS",
        statusColor: "#d97706",
        icon: "🔍"
      },
      {
        dayLabel: "Day 20 · Disposed",
        citizenAction: "Download official signed CPIO Response PDF in 1 click. Case resolved!",
        officerAction: "CPIO signs statutory response order and uploads to portal.",
        statusBadge: "DISPOSED (CLOSED)",
        statusColor: "#059669",
        icon: "✓"
      }
    ]
  },
  TRANSFER: {
    title: "Scenario B: Department Transfer (Section 6(3))",
    subtitle: "When information is held by another Central Ministry",
    icon: "↗️",
    tag: "CROSS-MINISTRY TRANSFER",
    summary: "You filed with Ministry A, but subject matter belongs to Department B. Transferred in 5 days.",
    stages: [
      {
        dayLabel: "Day 0 · Filing",
        citizenAction: "File application with initial Public Authority (e.g. DoPT).",
        officerAction: "File received in DoPT Nodal scrutiny desk.",
        statusBadge: "SUBMITTED",
        statusColor: "#2563eb",
        icon: "📝"
      },
      {
        dayLabel: "Day 4 · Section 6(3)",
        citizenAction: "Receive SMS: Application transferred to CBDT (Revenue) with transfer receipt.",
        officerAction: "Nodal Officer triggers electronic transfer under Section 6(3) of RTI Act.",
        statusBadge: "TRANSFERRED SEC 6(3)",
        statusColor: "#7c3aed",
        icon: "↗️"
      },
      {
        dayLabel: "Day 18 · Processing",
        citizenAction: "CBDT CPIO processes the transferred query under original payment.",
        officerAction: "New CPIO accesses transferred file without requiring fresh ₹10 fee.",
        statusBadge: "WITH NEW CPIO",
        statusColor: "#0891b2",
        icon: "🔍"
      },
      {
        dayLabel: "Day 28 · Furnished",
        citizenAction: "Receive certified records directly from transferee Department.",
        officerAction: "Transferee CPIO issues final response order.",
        statusBadge: "DISPOSED (CLOSED)",
        statusColor: "#059669",
        icon: "✓"
      }
    ]
  },
  FEE_DEMAND: {
    title: "Scenario C: Additional Photocopy Fee Demanded",
    subtitle: "When documents exceed standard limit (@ ₹2/page)",
    icon: "💰",
    tag: "LARGE DOCUMENTATION · ₹2/PAGE",
    summary: "Records requested comprise 12 pages of physical photocopies. Clock pauses during payment.",
    stages: [
      {
        dayLabel: "Day 0 · Filing",
        citizenAction: "Request copy of tender evaluation sheets & inspection reports.",
        officerAction: "CPIO locates 12 physical file pages.",
        statusBadge: "SUBMITTED",
        statusColor: "#2563eb",
        icon: "📝"
      },
      {
        dayLabel: "Day 10 · Fee Notice",
        citizenAction: "Receive SMS demand notice: ₹24 required for 12 pages (@ ₹2/page).",
        officerAction: "CPIO issues statutory fee calculation under RTI Rules 2012. 30-day clock pauses.",
        statusBadge: "ACTION REQUIRED (FEE)",
        statusColor: "#d97706",
        icon: "⚠️"
      },
      {
        dayLabel: "Day 11 · 1-Click Pay",
        citizenAction: "Pay ₹24 online via UPI/RuPay. Payment immediately reconciled.",
        officerAction: "CPIO desk receives instant payment clearance. Clock resumes.",
        statusBadge: "FEE SETTLED",
        statusColor: "#059669",
        icon: "💳"
      },
      {
        dayLabel: "Day 22 · Dispatch",
        citizenAction: "Download high-resolution scanned certified document packet.",
        officerAction: "CPIO uploads certified copies and closes file.",
        statusBadge: "DISPOSED (CLOSED)",
        statusColor: "#059669",
        icon: "✓"
      }
    ]
  },
  APPEAL: {
    title: "Scenario D: Delay or Unsatisfied → First Appeal",
    subtitle: "Section 19(1) Quasi-Judicial Escalation at Zero Cost",
    icon: "⚖️",
    tag: "STATUTORY ESCALATION · ZERO FEE",
    summary: "If CPIO delays past 30 days or rejects information, escalate to First Appellate Authority.",
    stages: [
      {
        dayLabel: "Day 30 · No Reply",
        citizenAction: "30-day statutory countdown expires without response from CPIO.",
        officerAction: "CPIO in default; potential penalty liability under Section 20 of RTI Act.",
        statusBadge: "DELAYED (DEFAULT)",
        statusColor: "#dc2626",
        icon: "🚨"
      },
      {
        dayLabel: "Day 31 · First Appeal",
        citizenAction: "1-Click File First Appeal under Section 19(1) at ₹0 fee.",
        officerAction: "Senior Joint Secretary / First Appellate Authority (FAA) takes cognizance.",
        statusBadge: "FIRST APPEAL FILED",
        statusColor: "#7c3aed",
        icon: "⚖️"
      },
      {
        dayLabel: "Day 45 · FAA Order",
        citizenAction: "Receive FAA hearing order directing CPIO to provide records free of cost.",
        officerAction: "FAA issues quasi-judicial order ordering CPIO to furnish records immediately.",
        statusBadge: "APPEAL ORDERED",
        statusColor: "#0891b2",
        icon: "📜"
      },
      {
        dayLabel: "Day 52 · Resolution",
        citizenAction: "Receive complete records without payment pursuant to FAA order.",
        officerAction: "CPIO complies with FAA directive and furnishes records.",
        statusBadge: "RESOLVED ON APPEAL",
        statusColor: "#059669",
        icon: "✓"
      }
    ]
  }
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [guideResult, setGuideResult] = useState<SearchMatchResult | null>(null);
  const [activeScenario, setActiveScenario] = useState<ScenarioKey>("SMOOTH");

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

  const currentScenario = scenarios[activeScenario];

  return (
    <PortalPage>
      {/* 01 — HERO HEADER & SEARCH */}
      <section style={{ padding: "48px 0 40px", background: "linear-gradient(135deg, #eef5fb 0%, #ffffff 50%, #fff8f0 100%)", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "820px", margin: "0 auto 30px" }}>
            <p className="eyebrow" style={{ justifyContent: "center", marginBottom: "8px" }}>
              <span className="eyebrow-line" />
              RIGHT TO INFORMATION SERVICES · CENTRAL GOVERNMENT OF INDIA
              <span className="eyebrow-line" />
            </p>
            <h1 style={{ font: "700 clamp(2.3rem, 4.5vw, 3.6rem)/1.1 var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 12px", letterSpacing: "-0.03em" }}>
              Get Information & File Requests with the <em>Government.</em>
            </h1>
            <p style={{ margin: "0 auto", fontSize: "1.05rem", color: "var(--neutral-600)", lineHeight: "1.6", maxWidth: "700px" }}>
              The official portal for Indian citizens to file RTIs, track 30-day statutory countdowns, access public disclosures, and escalate first appeals.
            </p>
          </div>

          {/* SINGLE DIRECT SEARCH BAR */}
          <div style={{ maxWidth: "720px", margin: "0 auto 30px", background: "#ffffff", border: "2px solid var(--neutral-300)", borderRadius: "var(--radius-xl)", padding: "8px 10px 8px 20px", boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "1.2rem" }}>🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="What information are you seeking? (e.g. Passport delay, EPF claim, CBSE marksheet)..."
              style={{ flex: "1 1 300px", border: 0, outline: "none", fontSize: "0.95rem", color: "var(--gov-navy-950)", padding: "8px 0" }}
            />
            <Link
              href={guideResult ? `/request/new?authority=${encodeURIComponent(guideResult.authority.id)}` : `/request/eligibility?query=${encodeURIComponent(query)}`}
              className="btn-primary-action"
              style={{ background: "var(--saffron-500)", borderColor: "var(--saffron-600)", padding: "11px 22px", fontSize: "0.9rem", whiteSpace: "nowrap" }}
            >
              Start Request →
            </Link>
          </div>

          {/* DYNAMIC SMART ROUTING ALERT */}
          {guideResult && (
            <div style={{ maxWidth: "720px", margin: "-16px auto 30px", background: "var(--gov-blue-50)", border: "1.5px solid #bfdbfe", borderRadius: "var(--radius-lg)", padding: "16px 20px", animation: "fadeIn 0.2s ease-in" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                <div>
                  <span className="recommend-badge">★ Recommended Authority</span>
                  <div style={{ fontWeight: 800, color: "var(--gov-navy-950)", fontSize: "0.98rem", marginTop: "2px" }}>
                    {guideResult.authority.name} ({guideResult.authority.ministry})
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--neutral-600)", marginTop: "2px" }}>
                    {guideResult.authority.nodalOfficerDesc}
                  </div>
                </div>
                <Link
                  href={`/request/new?authority=${encodeURIComponent(guideResult.authority.id)}`}
                  className="btn-secondary-action"
                  style={{ padding: "6px 14px", fontSize: "0.82rem", color: "var(--gov-blue-600)", borderColor: "var(--gov-blue-500)", background: "#ffffff" }}
                >
                  File with this Authority →
                </Link>
              </div>
            </div>
          )}

          {/* GRIEVANCE WARNING ALERT */}
          {isGrievanceWord && (
            <div style={{ maxWidth: "720px", margin: "-16px auto 30px", background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: "var(--radius-lg)", padding: "16px 20px" }}>
              <strong style={{ color: "#92400e", display: "block", fontSize: "0.9rem" }}>
                ⚠️ Looking to lodge a grievance or complaint?
              </strong>
              <p style={{ margin: "2px 0 8px", fontSize: "0.82rem", color: "#78350f" }}>
                RTI is for obtaining <strong>existing government records</strong>. For complaints or service disputes, file directly on the Central CPGRAMS portal.
              </p>
              <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.82rem", fontWeight: 700, color: "#92400e" }}>
                Go to CPGRAMS Grievance Portal ↗
              </a>
            </div>
          )}

          {/* 4 PRIMARY ACTION TILES */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            <Link href="/request/eligibility" className="service-card card-featured" style={{ padding: "24px 20px", background: "#ffffff" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.8rem" }}>📝</span>
                <span style={{ background: "var(--saffron-100)", color: "var(--saffron-600)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  STANDARD ₹10 / ₹0 BPL
                </span>
              </div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                + File a New RTI
              </h3>
              <p style={{ margin: "0 0 12px", fontSize: "0.84rem", color: "var(--neutral-600)" }}>
                Request records, marksheet copies, or processing status from Central Authorities.
              </p>
              <span className="service-card-action" style={{ color: "var(--saffron-600)" }}>
                Start Application →
              </span>
            </Link>

            <Link href="/status" className="service-card" style={{ padding: "24px 20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "1.8rem" }}>📍</span>
                <span style={{ background: "var(--gov-blue-100)", color: "var(--gov-blue-600)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  STATUTORY 30 DAYS
                </span>
              </div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                Track Status & Audit Trail
              </h3>
              <p style={{ margin: "0 0 12px", fontSize: "0.84rem", color: "var(--neutral-600)" }}>
                Enter Registration Number to see step-by-step progress, CPIO assignment, and countdown.
              </p>
              <span className="service-card-action">Track Application →</span>
            </Link>

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
              <p style={{ margin: "0 0 12px", fontSize: "0.84rem", color: "var(--neutral-600)" }}>
                Access published citizen charters, circulars, and previous orders without filing.
              </p>
              <span className="service-card-action" style={{ color: "var(--forest-700)" }}>
                Browse Disclosures →
              </span>
            </Link>

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
              <p style={{ margin: "0 0 12px", fontSize: "0.84rem", color: "var(--neutral-600)" }}>
                Unsatisfied with an RTI reply or delayed beyond 30 days? Appeal under Section 19(1).
              </p>
              <span className="service-card-action">File First Appeal →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 02 — INNOVATIVE INTERACTIVE RTI JOURNEY SIMULATOR */}
      <section style={{ padding: "64px 0", background: "#ffffff", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap">
          {/* Section Header */}
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 36px" }}>
            <p className="eyebrow" style={{ justifyContent: "center", marginBottom: "6px" }}>
              <span className="eyebrow-line" />
              LIVE RTI JOURNEY SIMULATOR · SEE WHAT HAPPENS BEHIND THE SCENES
              <span className="eyebrow-line" />
            </p>
            <h2 style={{ font: "700 clamp(2rem, 3.8vw, 2.7rem) var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 10px" }}>
              How Your RTI Travels from Filing to Answer
            </h2>
            <p style={{ color: "var(--neutral-600)", fontSize: "1rem", lineHeight: "1.6" }}>
              Click any real-world scenario below to see the dual journey: <strong>What you experience as a citizen</strong> vs <strong>what happens inside the Ministry</strong>.
            </p>
          </div>

          {/* 4 Interactive Scenario Selector Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px", marginBottom: "32px" }}>
            {(Object.keys(scenarios) as ScenarioKey[]).map((key) => {
              const item = scenarios[key];
              const isActive = activeScenario === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveScenario(key)}
                  style={{
                    background: isActive ? "linear-gradient(135deg, #071f3a 0%, #0e3563 100%)" : "var(--neutral-50)",
                    color: isActive ? "#ffffff" : "var(--gov-navy-950)",
                    border: isActive ? "2px solid #071f3a" : "1.5px solid var(--neutral-200)",
                    borderRadius: "var(--radius-xl)",
                    padding: "18px 20px",
                    textAlign: "left",
                    cursor: "pointer",
                    boxShadow: isActive ? "var(--shadow-md)" : "none",
                    transform: isActive ? "scale(1.02)" : "scale(1)",
                    transition: "all 0.18s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "1.6rem" }}>{item.icon}</span>
                    <span style={{ fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)", background: isActive ? "rgba(255,255,255,0.2)" : "var(--neutral-200)", color: isActive ? "#fde68a" : "var(--neutral-700)" }}>
                      {item.tag}
                    </span>
                  </div>
                  <h4 style={{ font: "700 1.05rem var(--font-serif)", margin: "4px 0 2px", color: isActive ? "#ffffff" : "var(--gov-navy-950)" }}>
                    {item.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.78rem", color: isActive ? "#cbd5e1" : "var(--neutral-500)", lineHeight: "1.4" }}>
                    {item.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* DUAL-TRACK JOURNEY BOARD: CITIZEN VIEW (LEFT) VS MINISTRY ACTION (RIGHT) */}
          <div style={{ background: "var(--neutral-50)", border: "2px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "36px 32px", boxShadow: "var(--shadow-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", borderBottom: "1.5px solid var(--neutral-200)", paddingBottom: "16px", marginBottom: "28px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "var(--gov-blue-600)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                  ACTIVE SIMULATION FLOW
                </span>
                <h3 style={{ font: "700 1.5rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "2px 0 0" }}>
                  {currentScenario.title}
                </h3>
              </div>
              <span style={{ fontSize: "0.88rem", color: "var(--neutral-600)", maxWidth: "480px", lineHeight: "1.5" }}>
                {currentScenario.summary}
              </span>
            </div>

            {/* Visual 4-Step Timeline Cards Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {currentScenario.stages.map((stage, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "#ffffff",
                    border: "1.5px solid var(--neutral-200)",
                    borderRadius: "var(--radius-lg)",
                    padding: "20px",
                    boxShadow: "var(--shadow-sm)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative"
                  }}
                >
                  <div>
                    {/* Header Pill */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <span style={{ font: "700 0.86rem var(--font-number)", color: "var(--gov-navy-950)", background: "var(--neutral-100)", padding: "3px 8px", borderRadius: "var(--radius-sm)" }}>
                        {stage.dayLabel}
                      </span>
                      <span style={{ fontSize: "0.68rem", fontWeight: 800, color: stage.statusColor, background: `${stage.statusColor}15`, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                        {stage.statusBadge}
                      </span>
                    </div>

                    {/* Citizen Experience Box */}
                    <div style={{ background: "#f8fafc", borderLeft: "3px solid var(--gov-blue-600)", padding: "10px 12px", borderRadius: "0 6px 6px 0", marginBottom: "12px" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--gov-blue-600)", textTransform: "uppercase", display: "block", marginBottom: "2px" }}>
                        🧑 What You Experience:
                      </span>
                      <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--neutral-800)", lineHeight: "1.5" }}>
                        {stage.citizenAction}
                      </p>
                    </div>

                    {/* Ministry Action Box */}
                    <div style={{ background: "#fffbf5", borderLeft: "3px solid var(--saffron-500)", padding: "10px 12px", borderRadius: "0 6px 6px 0" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--saffron-600)", textTransform: "uppercase", display: "block", marginBottom: "2px" }}>
                        🏛️ Inside the Ministry Desk:
                      </span>
                      <p style={{ margin: 0, fontSize: "0.82rem", color: "var(--neutral-800)", lineHeight: "1.5" }}>
                        {stage.officerAction}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Call to Action */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginTop: "32px", paddingTop: "20px", borderTop: "1.5px solid var(--neutral-200)" }}>
              <div style={{ fontSize: "0.88rem", color: "var(--neutral-700)" }}>
                <strong>Statutory Guarantee:</strong> Section 7(1) mandates responses within 30 days (48 hours for life & liberty). Non-compliance carries a penalty of ₹250/day on the CPIO.
              </div>

              <Link
                href="/request/eligibility"
                className="btn-primary-action"
                style={{ padding: "12px 24px", fontSize: "0.9rem" }}
              >
                File an RTI Request Now (₹10 / ₹0 BPL) →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — 3-WAY DIRECT CHOICE (RTI vs GRIEVANCE vs OFFLINE) */}
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
