"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../components/portal-shell";
import { findMatchingAuthorities, SearchMatchResult } from "../lib/authorities-data";

export default function Home() {
  const [authorityQuery, setAuthorityQuery] = useState("");
  const [guideResult, setGuideResult] = useState<SearchMatchResult | null>(null);

  function handleAuthoritySearch(val: string) {
    setAuthorityQuery(val);
    if (val.trim().length > 1) {
      const matches = findMatchingAuthorities(val);
      setGuideResult(matches.length > 0 ? matches[0] : null);
    } else {
      setGuideResult(null);
    }
  }

  return (
    <PortalPage>
      {/* 01. CALM HERO SECTION */}
      <section style={{ padding: "48px 0 40px", background: "#ffffff", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap">
          <div style={{ maxWidth: "720px" }}>
            <span style={{ display: "inline-block", fontSize: "0.8125rem", fontWeight: 700, color: "var(--gov-navy-800)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
              Right to Information
            </span>
            <h1 style={{ font: "700 clamp(2.2rem, 4vw, 3.2rem)/1.15 var(--font-sans)", color: "var(--gov-navy-950)", margin: "0 0 16px", letterSpacing: "-0.03em" }}>
              Get information from public authorities.
            </h1>
            <p style={{ fontSize: "1.125rem", color: "var(--neutral-700)", lineHeight: "1.6", margin: "0 0 28px" }}>
              Request official records, documents, and information from Central Government ministries, departments, and public authorities under the RTI Act, 2005.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap" }}>
              <Link href="/request/eligibility" className="btn-primary-action" style={{ padding: "12px 24px", fontSize: "1rem" }}>
                File an RTI
              </Link>
              <Link href="/status" style={{ fontSize: "0.9375rem", color: "var(--neutral-700)", fontWeight: 500 }}>
                Already filed? Track your application →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02. "WHAT ARE YOU TRYING TO DO?" CITIZEN INTENT ROUTER */}
      <section style={{ padding: "40px 0", background: "var(--neutral-50)", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap">
          <h2 style={{ fontSize: "1.25rem", color: "var(--gov-navy-950)", margin: "0 0 20px" }}>
            What are you trying to do?
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
            {/* Intent 1: File RTI */}
            <Link href="/request/eligibility" className="service-card">
              <h3 style={{ fontSize: "1.05rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                I need government information
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: "0 0 12px" }}>
                Request copies of official files, decisions, policies, or evaluation marks.
              </p>
              <span style={{ fontSize: "0.875rem", color: "var(--gov-blue-600)", fontWeight: 600 }}>
                File an RTI →
              </span>
            </Link>

            {/* Intent 2: Grievance (CPGRAMS) */}
            <a href="https://pgportal.gov.in" target="_blank" rel="noopener noreferrer" className="service-card">
              <h3 style={{ fontSize: "1.05rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                My government service has a problem
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: "0 0 12px" }}>
                RTI is for records. For complaints and service disputes, use the grievance portal.
              </p>
              <span style={{ fontSize: "0.875rem", color: "var(--neutral-800)", fontWeight: 600 }}>
                File a grievance (CPGRAMS) ↗
              </span>
            </a>

            {/* Intent 3: Track / First Appeal */}
            <Link href="/status" className="service-card">
              <h3 style={{ fontSize: "1.05rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                I haven&apos;t received my response
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: "0 0 12px" }}>
                Check statutory 30-day timeline or file a First Appeal if delayed or unsatisfied.
              </p>
              <span style={{ fontSize: "0.875rem", color: "var(--gov-blue-600)", fontWeight: 600 }}>
                Check status or appeal →
              </span>
            </Link>

            {/* Intent 4: Authority Finder */}
            <Link href="/authorities" className="service-card">
              <h3 style={{ fontSize: "1.05rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                I don&apos;t know which department
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: "0 0 12px" }}>
                Describe what information you need and we will help you find the right public authority.
              </p>
              <span style={{ fontSize: "0.875rem", color: "var(--gov-blue-600)", fontWeight: 600 }}>
                Find authority →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* 03. STAR AUTHORITY FINDER: SINGLE DIRECT QUESTION */}
      <section style={{ padding: "48px 0", background: "#ffffff", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap">
          <div style={{ maxWidth: "760px" }}>
            <h2 style={{ fontSize: "1.375rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              Not sure where to send your RTI?
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "var(--neutral-600)", margin: "0 0 20px" }}>
              Describe what information you need in plain language:
            </p>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
              <input
                type="text"
                value={authorityQuery}
                onChange={(e) => handleAuthoritySearch(e.target.value)}
                placeholder="e.g. Why is my passport application still pending?"
                className="form-control"
                style={{ flex: "1 1 340px", padding: "12px 14px", fontSize: "0.9375rem" }}
              />
              <button
                type="button"
                className="btn-secondary-action"
                onClick={() => {}}
                style={{ padding: "12px 20px" }}
              >
                Find authority
              </button>
            </div>

            {/* Match Result Card */}
            {guideResult ? (
              <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "20px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gov-blue-600)", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                  Likely Match
                </span>
                <h3 style={{ fontSize: "1.125rem", color: "var(--gov-navy-950)", margin: "0 0 2px" }}>
                  {guideResult.authority.name}
                </h3>
                <div style={{ fontSize: "0.875rem", color: "var(--neutral-600)", marginBottom: "12px" }}>
                  {guideResult.authority.ministry}
                </div>

                <div style={{ fontSize: "0.875rem", color: "var(--neutral-800)", marginBottom: "16px", lineHeight: "1.5" }}>
                  <strong>Why this match?</strong> {guideResult.authority.nodalOfficerDesc}
                </div>

                <div style={{ display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" }}>
                  <Link
                    href={`/request/new?authority=${encodeURIComponent(guideResult.authority.id)}`}
                    className="btn-primary-action"
                    style={{ padding: "8px 16px", fontSize: "0.875rem" }}
                  >
                    Use this authority →
                  </Link>
                  <Link href="/authorities" style={{ fontSize: "0.875rem", color: "var(--neutral-600)" }}>
                    View other matches
                  </Link>
                </div>
              </div>
            ) : (
              <div style={{ fontSize: "0.8125rem", color: "var(--neutral-500)" }}>
                Popular queries: <em>Passport delay</em>, <em>EPF claim status</em>, <em>CBSE answer sheet copy</em>, <em>Railway refund rules</em>.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 04. HOW RTI WORKS: 4 SIMPLE STEPS */}
      <section style={{ padding: "48px 0 56px", background: "var(--neutral-50)" }}>
        <div className="wrap">
          <h2 style={{ fontSize: "1.25rem", color: "var(--gov-navy-950)", margin: "0 0 28px" }}>
            How RTI works
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "20px" }}>
              <span style={{ font: "700 1.25rem var(--font-sans)", color: "var(--neutral-400)", display: "block", marginBottom: "8px" }}>
                1
              </span>
              <h3 style={{ fontSize: "1rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                You file a request
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: 0, lineHeight: "1.5" }}>
                Select the public authority, state your questions, and pay the ₹10 statutory fee (or ₹0 for BPL).
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "20px" }}>
              <span style={{ font: "700 1.25rem var(--font-sans)", color: "var(--neutral-400)", display: "block", marginBottom: "8px" }}>
                2
              </span>
              <h3 style={{ fontSize: "1rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                Authority receives it
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: 0, lineHeight: "1.5" }}>
                The Nodal Officer verifies jurisdiction and assigns your request to the concerned CPIO.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "20px" }}>
              <span style={{ font: "700 1.25rem var(--font-sans)", color: "var(--neutral-400)", display: "block", marginBottom: "8px" }}>
                3
              </span>
              <h3 style={{ fontSize: "1rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                CPIO retrieves records
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: 0, lineHeight: "1.5" }}>
                The Public Information Officer gathers the official records, notesheets, or circulars.
              </p>
            </div>

            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "20px" }}>
              <span style={{ font: "700 1.25rem var(--font-sans)", color: "var(--neutral-400)", display: "block", marginBottom: "8px" }}>
                4
              </span>
              <h3 style={{ fontSize: "1rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                Response issued
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: 0, lineHeight: "1.5" }}>
                You receive the reply within 30 days. If delayed or incomplete, you can file a First Appeal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PortalPage>
  );
}
