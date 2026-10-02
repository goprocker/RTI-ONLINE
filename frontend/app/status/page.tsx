"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState, useEffect, Suspense } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";
import { RTIApplication } from "../../types/rti";

function StatusTrackingContent() {
  const searchParams = useSearchParams();
  const { applications, getApplicationByRegNo } = useAuth();

  const regNoParam = searchParams.get("regNo") || "";

  const [regNo, setRegNo] = useState(regNoParam || "DOPT/R/2026/04812");
  const [emailOrMobile, setEmailOrMobile] = useState("rajesh.sharma@example.gov.in");
  const [activeApp, setActiveApp] = useState<RTIApplication | null>(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (regNoParam) {
      setRegNo(regNoParam);
      const match = getApplicationByRegNo(regNoParam);
      if (match) {
        setActiveApp(match);
        setEmailOrMobile(match.applicantEmail);
        setSearched(true);
      }
    } else {
      // Default to first application for instant preview
      if (applications.length > 0) {
        setActiveApp(applications[0]);
        setSearched(true);
      }
    }
  }, [regNoParam, applications, getApplicationByRegNo]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (!regNo.trim()) {
      alert("Please enter RTI registration number.");
      return;
    }
    setSearched(true);
    const match = getApplicationByRegNo(regNo.trim());
    if (match) {
      setActiveApp(match);
    } else {
      // Create a fallback realistic status preview for arbitrary reg numbers
      const now = new Date();
      setActiveApp({
        id: "arbitrary-search",
        regNo: regNo.trim().toUpperCase(),
        filingDate: "18 August 2026",
        ministry: "Central Public Authority",
        department: "Department Nodal Section",
        publicAuthority: "Central Government Public Authority",
        nodalOfficerRouting: "RTI Nodal Officer, Government of India",
        cpioName: "Central Public Information Officer (CPIO)",
        subject: "Information request under RTI Act 2005",
        queryText: "Records requested under Section 6(1) of the RTI Act.",
        status: "UNDER_PROCESS",
        statusLabel: "Under Process with CPIO",
        statutoryWindowDays: 30,
        remainingDays: 19,
        expectedDate: "17 September 2026",
        feePaid: 10,
        paymentMode: "UPI / Internet Banking",
        paymentRef: "TXN-AUTO-VERIFIED",
        isBPL: false,
        applicantName: "Registered Citizen",
        applicantEmail: emailOrMobile || "citizen@gov.in",
        applicantMobile: "9876543210",
        applicantAddress: "India",
        timeline: [
          {
            stage: "SUBMITTED",
            title: "Application Submitted Online",
            description: `RTI Application registered with registration number ${regNo.trim().toUpperCase()}.`,
            date: "18 Aug 2026, 11:30 AM",
            completed: true
          },
          {
            stage: "RECEIVED_BY_NODAL",
            title: "Received by RTI Nodal Officer",
            description: "Ministry RTI Nodal Officer acknowledged application.",
            date: "19 Aug 2026, 03:00 PM",
            completed: true
          },
          {
            stage: "FORWARDED_TO_CPIO",
            title: "Forwarded to CPIO",
            description: "Transferred to concerned CPIO for preparation of records.",
            date: "20 Aug 2026, 10:15 AM",
            completed: true,
            current: true
          },
          {
            stage: "RESPONSE_ISSUED",
            title: "Statutory Response Window",
            description: "Statutory 30-day window under Section 7(1) of RTI Act 2005.",
            date: "Expected by 17 Sep 2026",
            completed: false
          }
        ]
      });
    }
  }

  return (
    <main className="wrap" style={{ padding: "40px 0 80px" }}>
      <div className="bread">
        <Link href="/">Home</Link>
        <span>›</span>
        <span>Track Status</span>
      </div>

      <section className="flow-hero" style={{ background: "linear-gradient(135deg, #eef5fb 0%, #ffffff 100%)", borderRadius: "var(--radius-xl)", padding: "36px 40px", marginBottom: "36px", border: "1px solid var(--neutral-200)" }}>
        <p className="eyebrow"><span className="eyebrow-line" />APPLICATION & APPEAL STATUS</p>
        <h1 className="hero-h1" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", margin: "6px 0 12px" }}>
          Track your <em>RTI statutory progress.</em>
        </h1>
        <p style={{ maxWidth: "660px", color: "var(--neutral-700)", fontSize: "0.96rem", lineHeight: "1.6", margin: 0 }}>
          Enter your Registration Number and registered contact details to view the complete audit trail and statutory countdown.
        </p>
      </section>

      {/* Lookup Card */}
      <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "28px", boxShadow: "var(--shadow-md)", marginBottom: "32px" }}>
        <form onSubmit={handleSearch} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr auto", gap: "16px", alignItems: "flex-end" }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="track-reg" style={{ fontSize: "0.82rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>
              RTI or Appeal Registration Number <span className="required">*</span>
            </label>
            <input
              id="track-reg"
              className="form-control"
              type="text"
              required
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              placeholder="e.g. DOPT/R/2026/04812"
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label htmlFor="track-email" style={{ fontSize: "0.82rem", fontWeight: 700, display: "block", marginBottom: "4px" }}>
              Registered Email or Mobile <span className="required">*</span>
            </label>
            <input
              id="track-email"
              className="form-control"
              type="text"
              required
              value={emailOrMobile}
              onChange={(e) => setEmailOrMobile(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            className="btn-primary-action"
            style={{ padding: "12px 22px" }}
          >
            Track Status →
          </button>
        </form>
      </div>

      {/* Status Details Card */}
      {searched && activeApp && (
        <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "36px", boxShadow: "var(--shadow-lg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", borderBottom: "1px solid var(--neutral-200)", paddingBottom: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <strong style={{ font: "700 1.6rem var(--font-serif)", color: "var(--gov-navy-950)" }}>
                  {activeApp.regNo}
                </strong>
                <span style={{ background: "var(--gov-blue-100)", color: "var(--gov-navy-900)", fontSize: "0.72rem", fontWeight: 800, padding: "3px 8px", borderRadius: "3px" }}>
                  CENTRAL RTI APPLICATION
                </span>
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--neutral-700)", fontWeight: 600 }}>
                {activeApp.publicAuthority} · <span style={{ color: "var(--neutral-500)" }}>{activeApp.ministry}</span>
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--neutral-500)", marginTop: "2px" }}>
                Filed on: {activeApp.filingDate} · Payment Mode: {activeApp.paymentMode} (Ref: {activeApp.paymentRef})
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <span
                style={{
                  display: "inline-block",
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.82rem",
                  fontWeight: 800,
                  background:
                    activeApp.status === "RESPONSE_ISSUED"
                      ? "var(--forest-100)"
                      : activeApp.status === "ADDITIONAL_FEE_REQUIRED"
                      ? "var(--amber-100)"
                      : "var(--gov-blue-100)",
                  color:
                    activeApp.status === "RESPONSE_ISSUED"
                      ? "var(--forest-700)"
                      : activeApp.status === "ADDITIONAL_FEE_REQUIRED"
                      ? "var(--amber-600)"
                      : "var(--gov-navy-900)"
                }}
              >
                {activeApp.statusLabel}
              </span>
            </div>
          </div>

          {/* Statutory Countdown Bar */}
          {activeApp.status !== "RESPONSE_ISSUED" && activeApp.status !== "DISPOSED_SATISFIED" && (
            <div className="statutory-countdown-banner" style={{ margin: "20px 0" }}>
              <span>⏳ Expected statutory response window:</span>
              <strong>{activeApp.remainingDays} days remaining</strong>
              <span style={{ fontWeight: 400, opacity: 0.85 }}>
                · Typical RTI response period: 30 days. Deadline may vary depending on applicable RTI provisions.
              </span>
            </div>
          )}

          {/* Nodal Officer & Subject Details */}
          <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "18px 22px", margin: "20px 0", fontSize: "0.86rem" }}>
            <div style={{ marginBottom: "8px" }}>
              <strong style={{ color: "var(--gov-navy-950)" }}>Subject: </strong>
              <span>{activeApp.subject}</span>
            </div>
            <div style={{ marginBottom: "8px" }}>
              <strong style={{ color: "var(--gov-navy-950)" }}>Information Requested: </strong>
              <span style={{ color: "var(--neutral-700)" }}>&ldquo;{activeApp.queryText}&rdquo;</span>
            </div>
            <div>
              <strong style={{ color: "var(--gov-navy-950)" }}>Nodal Officer Routing: </strong>
              <span style={{ color: "var(--neutral-600)" }}>{activeApp.nodalOfficerRouting}</span>
            </div>
          </div>

          {/* Statutory Progress Audit Trail Timeline */}
          <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "28px 0 16px" }}>
            Statutory Processing Audit Trail
          </h3>

          <ul className="audit-timeline">
            {activeApp.timeline.map((step, idx) => (
              <li key={idx} className={`audit-item ${step.completed ? "completed" : ""} ${step.current ? "current" : ""}`}>
                <div className="audit-node">
                  {step.completed ? "✓" : idx + 1}
                </div>
                <div className="audit-content">
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                  <span className="audit-date">{step.date}</span>
                </div>
              </li>
            ))}
          </ul>

          {/* Bottom Actions */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px", paddingTop: "20px", borderTop: "1px solid var(--neutral-200)", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                href={`/request/confirmation?regNo=${encodeURIComponent(activeApp.regNo)}`}
                className="btn-secondary-action"
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", textDecoration: "none" }}
              >
                🖨️ View & Print Official Acknowledgement Receipt (PDF)
              </Link>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Link
                href={`/appeal/new?regNo=${encodeURIComponent(activeApp.regNo)}`}
                className="btn-secondary-action"
              >
                File First Appeal (Zero Fee) →
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function StatusPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "80px 0", textAlign: "center" }}>Loading Status Tracker...</div>}>
        <StatusTrackingContent />
      </Suspense>
    </PortalPage>
  );
}
