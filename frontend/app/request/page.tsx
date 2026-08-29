"use client";

import Link from "next/link";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

export default function RequestPage() {
  const { user } = useAuth();

  return (
    <PortalPage>
      <main className="flow-page">
        <section className="flow-hero" style={{ background: "linear-gradient(135deg, #eef5fb 0%, #fdf7ee 100%)", padding: "52px 0" }}>
          <div className="wrap">
            <div className="bread">
              <Link href="/">Home</Link>
              <span>›</span>
              <span>Submit RTI Request</span>
            </div>
            <p className="eyebrow"><span className="eyebrow-line" />FILING GUIDANCE</p>
            <h1 className="hero-h1" style={{ fontSize: "clamp(2.4rem, 4.5vw, 3.6rem)", margin: "8px 0 16px" }}>
              Submit an RTI request<br />
              <em>with ease and clarity.</em>
            </h1>
            <p style={{ maxWidth: "620px", color: "var(--neutral-700)", fontSize: "1.05rem", lineHeight: "1.6" }}>
              You have the right to seek information held by Central Government Public Authorities. We guide you through the 4-stage process step by step.
            </p>
          </div>
        </section>

        {/* Dual Path Filing Box: Guest vs Sign-in */}
        <section className="wrap" style={{ padding: "40px 0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "32px", boxShadow: "var(--shadow-md)" }}>
            <div style={{ borderRight: "1px solid var(--neutral-200)", paddingRight: "24px" }}>
              <span style={{ background: "var(--forest-100)", color: "var(--forest-700)", fontSize: "0.7rem", fontWeight: 800, padding: "2px 8px", borderRadius: "3px" }}>
                FAST-TRACK OPTION
              </span>
              <h3 style={{ font: "700 1.4rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "8px 0 6px" }}>
                {user ? `Filing as ${user.name}` : "Sign in for Autofill & Tracking"}
              </h3>
              <p style={{ color: "var(--neutral-600)", fontSize: "0.86rem", lineHeight: "1.5", margin: "0 0 20px" }}>
                {user
                  ? "Your verified citizen profile and contact details will be automatically pre-filled in the request form."
                  : "Enjoy automatic profile pre-filling, saved drafts, and centralized dashboard tracking of all your RTI requests."}
              </p>

              {user ? (
                <Link className="btn-primary-action" href="/request/new">
                  Start Fast-Track Request →
                </Link>
              ) : (
                <Link className="btn-primary-action" href="/login">
                  Sign in & File RTI →
                </Link>
              )}
            </div>

            <div>
              <span style={{ background: "var(--gov-blue-100)", color: "var(--gov-navy-900)", fontSize: "0.7rem", fontWeight: 800, padding: "2px 8px", borderRadius: "3px" }}>
                GUEST CITIZEN OPTION
              </span>
              <h3 style={{ font: "700 1.4rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "8px 0 6px" }}>
                Continue without an Account
              </h3>
              <p style={{ color: "var(--neutral-600)", fontSize: "0.86rem", lineHeight: "1.5", margin: "0 0 20px" }}>
                No registration is required. You can file immediately by providing your contact details for SMS/email tracking alerts.
              </p>

              <Link className="btn-secondary-action" href="/request/new">
                Continue as Guest (No Login) →
              </Link>
            </div>
          </div>
        </section>

        {/* 4-Stage Filing Overview */}
        <section className="wrap journey">
          <div className="journey-intro">
            <span className="journey-count">4 Simple Stages · ~5 Minutes</span>
            <h2>How your request is prepared</h2>
            <p>
              Under the RTI Act 2005, you do not need to give any reason for requesting information, other than contact details required to communicate with you.
            </p>
          </div>

          <div className="journey-cards">
            <article>
              <span>STAGE 01</span>
              <h3>1. WHERE? Authority</h3>
              <p>Find the Central Ministry, Department, or Public Authority using our Smart Authority Finder.</p>
            </article>

            <article>
              <span>STAGE 02</span>
              <h3>2. WHAT? Information</h3>
              <p>Specify the required records within 3,000 characters or attach an extensive PDF document.</p>
            </article>

            <article>
              <span>STAGE 03</span>
              <h3>3. ABOUT YOU</h3>
              <p>Citizen contact details. If Below Poverty Line (BPL), attach certificate for ₹0 fee waiver.</p>
            </article>

            <article>
              <span>STAGE 04</span>
              <h3>4. REVIEW & PAY</h3>
              <p>Review draft, pay ₹10 statutory fee via UPI/RuPay/NetBanking, and get instant registration.</p>
            </article>
          </div>
        </section>

        {/* RTI vs Grievance Warning Box */}
        <section className="wrap important-note" style={{ background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: "var(--radius-lg)" }}>
          <span style={{ background: "#fef3c7", color: "#92400e" }}>⚠️</span>
          <div>
            <strong style={{ color: "#92400e", display: "block", fontSize: "0.92rem", marginBottom: "2px" }}>
              Seeking resolution of a service complaint rather than government records?
            </strong>
            <p style={{ margin: 0, color: "#78350f", fontSize: "0.84rem" }}>
              RTI is for obtaining existing public information, files, and circulars. To lodge a grievance regarding delayed pensions, services, or departmental complaints, please use the Central Government&apos;s CPGRAMS Portal.
            </p>
          </div>
          <a
            href="https://pgportal.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontWeight: 700, color: "#92400e", whiteSpace: "nowrap" }}
          >
            Visit CPGRAMS ↗
          </a>
        </section>
      </main>
    </PortalPage>
  );
}
