"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../components/portal-shell";
import { findMatchingAuthorities, SearchMatchResult } from "../lib/authorities-data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchedAuthority, setMatchedAuthority] = useState<SearchMatchResult | null>(null);

  function handleSearch(val: string) {
    setSearchQuery(val);
    if (val.trim().length > 1) {
      const results = findMatchingAuthorities(val);
      setMatchedAuthority(results.length > 0 ? results[0] : null);
    } else {
      setMatchedAuthority(null);
    }
  }

  return (
    <PortalPage>
      {/* 01 — CITIZEN HERO */}
      <section className="home-hero-section">
        <div className="wrap">
          <div className="home-hero-inner">
            <h1 className="home-hero-title">
              Get information from public authorities.
            </h1>
            <p className="home-hero-lead">
              Request official government records, documents, notesheets, and decisions under the Right to Information Act, 2005.
            </p>

            <div className="home-hero-actions">
              <Link href="/request/eligibility" className="btn-hero-primary">
                File an RTI
              </Link>
              <Link href="/status" className="hero-secondary-link">
                Already filed? Track your application →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — STAR INNOVATION: NATURAL LANGUAGE AUTHORITY FINDER */}
      <section className="authority-finder-section">
        <div className="wrap">
          <div className="finder-box">
            <div className="finder-header">
              <h2 className="finder-title">
                Not sure where to send your RTI?
              </h2>
              <p className="finder-subtitle">
                Describe the information you need in plain language. We&apos;ll help you find the responsible ministry or department.
              </p>
            </div>

            <div className="finder-input-row">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="e.g. Why is my passport application still pending, or EPFO claim status..."
                className="finder-input"
                aria-label="Describe what information you need"
              />
              <Link
                href={
                  matchedAuthority
                    ? `/request/new?authority=${encodeURIComponent(matchedAuthority.authority.id)}`
                    : `/authorities?q=${encodeURIComponent(searchQuery)}`
                }
                className="btn-finder-search"
              >
                Find the right authority
              </Link>
            </div>

            {/* Matched Authority Result Card */}
            {matchedAuthority && (
              <div className="finder-match-card">
                <div className="finder-match-top">
                  <div>
                    <span className="match-pill">Likely match</span>
                    <h3 className="match-authority-name">{matchedAuthority.authority.name}</h3>
                    <div className="match-ministry-name">{matchedAuthority.authority.ministry}</div>
                  </div>
                  <Link
                    href={`/request/new?authority=${encodeURIComponent(matchedAuthority.authority.id)}`}
                    className="btn-use-authority"
                  >
                    Use this authority →
                  </Link>
                </div>

                <div className="match-reason-box">
                  <strong>Why this match? </strong>
                  {matchedAuthority.authority.nodalOfficerDesc}
                </div>

                <div className="match-footer-links">
                  <span>Common topics: {matchedAuthority.authority.commonTopics?.join(" · ") || matchedAuthority.authority.keywords.slice(0, 4).join(" · ")}</span>
                  <Link href={`/authorities?q=${encodeURIComponent(searchQuery)}`} className="match-other-link">
                    View other matches →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 03 — WHAT ARE YOU TRYING TO DO? (INTENT ROUTER) */}
      <section className="intent-router-section">
        <div className="wrap">
          <div className="section-heading-center">
            <h2 className="section-title">What are you trying to do?</h2>
            <p className="section-subtitle">Choose the service that matches your requirement</p>
          </div>

          <div className="intent-grid">
            {/* 1. Request Records */}
            <Link href="/request/eligibility" className="intent-card">
              <div className="intent-card-header">
                <span className="intent-number">01</span>
                <h3 className="intent-card-title">I need government information</h3>
              </div>
              <p className="intent-card-body">
                Request certified copies of files, circulars, exam answer scripts, or official status records.
              </p>
              <span className="intent-card-action">File an RTI request →</span>
            </Link>

            {/* 2. Service Complaint */}
            <div className="intent-card intent-card-alt">
              <div className="intent-card-header">
                <span className="intent-number">02</span>
                <h3 className="intent-card-title">My service has a problem</h3>
              </div>
              <p className="intent-card-body">
                RTI provides records, not service resolution. For complaints or service delays, lodge on CPGRAMS.
              </p>
              <a
                href="https://pgportal.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="intent-card-action external-action"
              >
                File a grievance on CPGRAMS ↗
              </a>
            </div>

            {/* 3. Awaiting Response / Appeal */}
            <Link href="/appeal" className="intent-card">
              <div className="intent-card-header">
                <span className="intent-number">03</span>
                <h3 className="intent-card-title">I haven&apos;t received a response</h3>
              </div>
              <p className="intent-card-body">
                If your RTI response is delayed beyond 30 days or incomplete, appeal under Section 19(1) at zero fee.
              </p>
              <span className="intent-card-action">File a First Appeal →</span>
            </Link>

            {/* 4. Don't Know Department */}
            <Link href="/authorities" className="intent-card">
              <div className="intent-card-header">
                <span className="intent-number">04</span>
                <h3 className="intent-card-title">I don&apos;t know which department</h3>
              </div>
              <p className="intent-card-body">
                Browse our directory of Central Public Authorities or search by administrative topic.
              </p>
              <span className="intent-card-action">Browse public authorities →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 04 — HOW RTI WORKS (QUIET 4-STEP VERTICAL PROGRESSION) */}
      <section className="how-it-works-section">
        <div className="wrap">
          <div className="section-heading-center">
            <h2 className="section-title">How RTI works</h2>
            <p className="section-subtitle">A straightforward, time-bound legal process for every citizen</p>
          </div>

          <div className="steps-flow-grid">
            <div className="step-flow-item">
              <div className="step-number-badge">1</div>
              <h3 className="step-flow-title">You file a request</h3>
              <p className="step-flow-text">
                Identify the public authority, write your questions, and pay the ₹10 fee (₹0 for BPL).
              </p>
            </div>

            <div className="step-flow-item">
              <div className="step-number-badge">2</div>
              <h3 className="step-flow-title">Authority receives it</h3>
              <p className="step-flow-text">
                Registration number is issued immediately and routed to the concerned Public Information Officer.
              </p>
            </div>

            <div className="step-flow-item">
              <div className="step-number-badge">3</div>
              <h3 className="step-flow-title">CPIO processes records</h3>
              <p className="step-flow-text">
                The officer retrieves official files and prepares a certified statutory disclosure.
              </p>
            </div>

            <div className="step-flow-item">
              <div className="step-number-badge">4</div>
              <h3 className="step-flow-title">You receive a response</h3>
              <p className="step-flow-text">
                A signed reply is issued within 30 days. You can file a free First Appeal if unsatisfied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — SECONDARY CITIZEN SERVICES STRIP */}
      <section className="secondary-services-section">
        <div className="wrap">
          <div className="secondary-services-grid">
            <div className="secondary-service-item">
              <h3 className="secondary-item-title">Search existing disclosures</h3>
              <p className="secondary-item-desc">
                Many answers are already published in official citizen charters and circulars.
              </p>
              <Link href="/search" className="secondary-item-link">
                Search published records →
              </Link>
            </div>

            <div className="secondary-service-item">
              <h3 className="secondary-item-title">Prepare an offline application</h3>
              <p className="secondary-item-desc">
                For states or local bodies without online portals, generate a formal printable letter.
              </p>
              <Link href="/offline" className="secondary-item-link">
                Offline RTI generator →
              </Link>
            </div>

            <div className="secondary-service-item">
              <h3 className="secondary-item-title">Payment deducted without RTI number?</h3>
              <p className="secondary-item-desc">
                Verify banking settlement and retrieve pending registration reference.
              </p>
              <Link href="/reconciliation" className="secondary-item-link">
                Check payment status →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PortalPage>
  );
}
