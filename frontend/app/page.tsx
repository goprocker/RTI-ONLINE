"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../components/portal-shell";
import { findMatchingAuthorities, SearchMatchResult } from "../lib/authorities-data";
import { useAuth } from "../lib/auth-context";

export default function Home() {
  const { user } = useAuth();
  const [guideQuery, setGuideQuery] = useState("");
  const [guideResult, setGuideResult] = useState<SearchMatchResult | null>(null);

  function handleGuideSearch(q: string) {
    setGuideQuery(q);
    if (q.trim().length > 1) {
      const res = findMatchingAuthorities(q);
      if (res.length > 0) {
        setGuideResult(res[0]);
      } else {
        setGuideResult(null);
      }
    } else {
      setGuideResult(null);
    }
  }

  return (
    <PortalPage>
      {/* 01 — CITIZEN HERO: "What would you like to do?" */}
      <section className="portal-hero">
        <div className="wrap">
          <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 36px" }}>
            <p className="eyebrow" style={{ justifyContent: "center" }}>
              <span className="eyebrow-line" />
              RIGHT TO INFORMATION SERVICES · CENTRAL GOVERNMENT
              <span className="eyebrow-line" />
            </p>
            <h1 className="hero-h1" style={{ fontSize: "clamp(2.6rem, 5vw, 4.2rem)", margin: "8px 0 16px" }}>
              Get information from the <em>Government.</em>
            </h1>
            <p className="hero-lead" style={{ margin: "0 auto", fontSize: "1.15rem" }}>
              File and track Right to Information requests online across Central Ministries, Departments, and Public Authorities under the RTI Act, 2005.
            </p>
          </div>

          {/* 4 Major Action Cards Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "36px" }}>
            {/* Action 1: File New RTI */}
            <Link
              href="/request/eligibility"
              className="service-card card-featured"
              style={{ padding: "28px", background: "linear-gradient(180deg, #ffffff 0%, #fffaf5 100%)", borderColor: "var(--saffron-500)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="service-card-icon" style={{ margin: 0 }}>📝</span>
                <span style={{ background: "var(--saffron-100)", color: "var(--saffron-600)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  START HERE
                </span>
              </div>
              <h3 style={{ font: "700 1.35rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                + File a New RTI Request
              </h3>
              <p style={{ margin: "0 0 16px", fontSize: "0.86rem", color: "var(--neutral-600)" }}>
                Start with a 1-minute eligibility check. File as guest or sign in for instant profile autofill.
              </p>
              <span className="service-card-action" style={{ color: "var(--saffron-600)" }}>
                Start RTI Application →
              </span>
            </Link>

            {/* Action 2: Track RTI */}
            <Link href="/status" className="service-card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="service-card-icon" style={{ margin: 0 }}>📍</span>
                <span style={{ background: "var(--gov-blue-100)", color: "var(--gov-blue-600)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  STATUTORY TRACKER
                </span>
              </div>
              <h3 style={{ font: "700 1.35rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                Track an RTI
              </h3>
              <p style={{ margin: "0 0 16px", fontSize: "0.86rem", color: "var(--neutral-600)" }}>
                Enter your Registration Number to view the step-by-step audit trail and 30-day countdown.
              </p>
              <span className="service-card-action">Track progress →</span>
            </Link>

            {/* Action 3: File First Appeal */}
            <Link href="/appeal" className="service-card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="service-card-icon" style={{ margin: 0 }}>⚖️</span>
                <span style={{ background: "var(--forest-100)", color: "var(--forest-700)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  ZERO FEE
                </span>
              </div>
              <h3 style={{ font: "700 1.35rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                File First Appeal
              </h3>
              <p style={{ margin: "0 0 16px", fontSize: "0.86rem", color: "var(--neutral-600)" }}>
                Unsatisfied with a reply or delayed beyond 30 days? Appeal under Section 19(1) at zero cost.
              </p>
              <span className="service-card-action">File appeal →</span>
            </Link>

            {/* Action 4: Guide Me / Smart Finder */}
            <Link href="/authorities" className="service-card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <span className="service-card-icon" style={{ margin: 0 }}>🧭</span>
                <span style={{ background: "#f1f5f9", color: "var(--neutral-700)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                  SMART ROUTING
                </span>
              </div>
              <h3 style={{ font: "700 1.35rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                Not sure where to start?
              </h3>
              <p style={{ margin: "0 0 16px", fontSize: "0.86rem", color: "var(--neutral-600)" }}>
                Tell us what you are seeking and we will guide you to the responsible Central Authority.
              </p>
              <span className="service-card-action">Guide Me →</span>
            </Link>
          </div>

          {/* Interactive "Tell us what you're looking for" Smart Guide Box */}
          <div style={{ background: "#ffffff", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "28px 32px", boxShadow: "var(--shadow-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
              <div>
                <span className="recommend-badge">SMART AUTHORITY ASSISTANT</span>
                <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "4px 0 0" }}>
                  Tell us what information you&apos;re looking for:
                </h3>
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--neutral-500)" }}>
                Reverses bureaucratic complexity into plain language
              </span>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input
                type="text"
                value={guideQuery}
                onChange={(e) => handleGuideSearch(e.target.value)}
                placeholder="e.g., why is my passport application delayed, EPFO PF claim transfer, CBSE marksheet re-evaluation..."
                style={{ flex: "1 1 360px", padding: "13px 18px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-md)", fontSize: "0.95rem" }}
              />
              <Link
                href={guideResult ? `/request/new?authority=${encodeURIComponent(guideResult.authority.id)}` : "/request/eligibility"}
                className="btn-primary-action"
                style={{ padding: "12px 22px", whiteSpace: "nowrap" }}
              >
                Guide Me →
              </Link>
            </div>

            {guideResult && (
              <div className="authority-recommend-box" style={{ marginTop: "16px" }}>
                <span className="recommend-badge">★ We think this is the correct Public Authority:</span>
                <div className="recommend-title">{guideResult.authority.name}</div>
                <div className="recommend-sub">{guideResult.authority.ministry}</div>
                <div className="recommend-routing">
                  <strong>How it will be routed: </strong>
                  {guideResult.authority.nodalOfficerDesc}
                </div>
                <div style={{ marginTop: "10px", display: "flex", gap: "14px" }}>
                  <Link
                    href={`/request/new?authority=${encodeURIComponent(guideResult.authority.id)}`}
                    style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--gov-blue-600)", textDecoration: "none" }}
                  >
                    Select this authority & file RTI →
                  </Link>
                  <Link href="/authorities" style={{ fontSize: "0.82rem", color: "var(--neutral-500)", textDecoration: "none" }}>
                    Browse other authorities
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Secondary Quick Navigation Strip */}
          <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginTop: "28px", fontSize: "0.86rem", fontWeight: 600, color: "var(--neutral-600)" }}>
            <Link href={user ? "/dashboard" : "/login"} style={{ color: "inherit", textDecoration: "none" }}>
              👤 My RTIs
            </Link>
            <span>·</span>
            <Link href="/appeal" style={{ color: "inherit", textDecoration: "none" }}>
              ⚖️ First Appeal
            </Link>
            <span>·</span>
            <Link href="/authorities" style={{ color: "inherit", textDecoration: "none" }}>
              🏛️ Find Authority
            </Link>
            <span>·</span>
            <Link href="/reconciliation" style={{ color: "inherit", textDecoration: "none" }}>
              💳 Payment Issue / Reconciliation
            </Link>
            <span>·</span>
            <Link href="/manual" style={{ color: "inherit", textDecoration: "none" }}>
              📖 RTI Guide & Manual
            </Link>
          </div>
        </div>
      </section>

      {/* Disambiguation Section: RTI vs Grievance vs First Appeal */}
      <section className="disambiguation-strip">
        <div className="wrap">
          <div className="disambiguation-card">
            <div className="disambiguate-col">
              <span className="disambiguate-tag tag-rti">1. WANT INFORMATION?</span>
              <h4>File an RTI Application</h4>
              <p>
                Request copies of existing government files, policies, fund allocations, exam evaluations, or status logs.
              </p>
              <Link href="/request/eligibility">Start RTI Request →</Link>
            </div>

            <div className="disambiguate-col">
              <span className="disambiguate-tag tag-grievance">2. WANT ACTION ON A PROBLEM?</span>
              <h4>Lodge Grievance (CPGRAMS)</h4>
              <p>
                RTI cannot solve personal complaints or take administrative action. For grievance redressal, visit the national portal.
              </p>
              <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer">
                Go to CPGRAMS Portal ↗
              </a>
            </div>

            <div className="disambiguate-col">
              <span className="disambiguate-tag tag-appeal">3. UNSATISFIED WITH RESPONSE?</span>
              <h4>Submit a First Appeal</h4>
              <p>
                If your RTI response was delayed beyond 30 days or incomplete, file a statutory appeal with the First Appellate Authority (FAA).
              </p>
              <Link href="/appeal">File First Appeal (Free) →</Link>
            </div>
          </div>
        </div>
      </section>
    </PortalPage>
  );
}
