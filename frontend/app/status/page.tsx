"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";
import { RTIApplication } from "../../types/rti";

function StatusTrackerContent() {
  const searchParams = useSearchParams();
  const regNoParam = searchParams.get("regNo") || "";

  const { applications } = useAuth();
  const [inputRegNo, setInputRegNo] = useState(regNoParam || "DOPT/R/2026/04812");
  const [searchedApp, setSearchedApp] = useState<RTIApplication | null>(
    applications.find((a) => a.regNo.toLowerCase() === inputRegNo.toLowerCase()) || applications[0] || null
  );

  function handleTrack() {
    const found = applications.find(
      (a) => a.regNo.toLowerCase() === inputRegNo.trim().toLowerCase()
    );
    if (found) {
      setSearchedApp(found);
    } else {
      alert(`Application with Registration Number "${inputRegNo}" not found in current session.`);
    }
  }

  return (
    <main className="wrap" style={{ padding: "40px 20px 80px" }}>
      <div className="bread">
        <Link href="/">Home</Link>
        <span>›</span>
        <span>Track application</span>
      </div>

      <div className="form-wrap">
        <h1 style={{ fontSize: "1.75rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
          Track an RTI application
        </h1>
        <p style={{ fontSize: "0.9375rem", color: "var(--neutral-600)", lineHeight: "1.5", margin: "0 0 24px" }}>
          Enter your 16-character Registration Number to view current application status and statutory timeline.
        </p>

        {/* Search Input Box */}
        <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "20px", boxShadow: "var(--shadow-sm)", marginBottom: "28px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="text"
              value={inputRegNo}
              onChange={(e) => setInputRegNo(e.target.value)}
              placeholder="e.g. DOPT/R/2026/04812"
              className="form-control"
              style={{ flex: "1 1 280px", fontFamily: "var(--font-number)", textTransform: "uppercase" }}
            />
            <button
              type="button"
              className="btn-primary-action"
              onClick={handleTrack}
              style={{ padding: "10px 18px" }}
            >
              Track status →
            </button>
          </div>
        </div>

        {/* Application Details Card */}
        {searchedApp && (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", borderBottom: "1px solid var(--neutral-200)", paddingBottom: "16px", marginBottom: "20px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "var(--neutral-500)", textTransform: "uppercase" }}>
                  Registration Number
                </span>
                <div style={{ fontSize: "1.375rem", fontWeight: 700, color: "var(--gov-navy-950)", fontFamily: "var(--font-number)" }}>
                  {searchedApp.regNo}
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--neutral-500)", display: "block" }}>
                  Expected Response By
                </span>
                <strong style={{ fontSize: "0.9375rem", color: "var(--gov-navy-950)" }}>
                  {searchedApp.expectedDate}
                </strong>
              </div>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h2 style={{ fontSize: "1.125rem", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                {searchedApp.subject}
              </h2>
              <div style={{ fontSize: "0.875rem", color: "var(--neutral-600)" }}>
                {searchedApp.department} · {searchedApp.ministry}
              </div>
            </div>

            {/* Status Summary Banner */}
            <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", padding: "14px 16px", marginBottom: "24px", fontSize: "0.875rem", lineHeight: "1.5" }}>
              <strong>Current status:</strong> {searchedApp.currentStageText}
            </div>

            {/* Vertical Progress Timeline */}
            <h3 style={{ fontSize: "1rem", color: "var(--gov-navy-950)", margin: "0 0 16px" }}>
              Application progress
            </h3>

            <div style={{ display: "grid", gap: "16px", position: "relative", paddingLeft: "24px", borderLeft: "2px solid var(--neutral-300)", marginLeft: "8px" }}>
              {searchedApp.timeline.map((step, idx) => (
                <div key={idx} style={{ position: "relative" }}>
                  <div
                    style={{
                      position: "absolute",
                      left: "-31px",
                      top: "2px",
                      width: "12px",
                      height: "12px",
                      borderRadius: "var(--radius-full)",
                      backgroundColor: step.completed ? "var(--success-600)" : "var(--neutral-300)",
                      border: "2px solid #ffffff",
                      boxShadow: "0 0 0 2px " + (step.completed ? "var(--success-600)" : "var(--neutral-300)")
                    }}
                  />
                  <div style={{ fontSize: "0.9375rem", fontWeight: 600, color: step.completed ? "var(--gov-navy-950)" : "var(--neutral-500)" }}>
                    {step.stage}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--neutral-500)", marginBottom: "2px" }}>
                    {step.date}
                  </div>
                  <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--neutral-600)", lineHeight: "1.4" }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Action Footer */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--neutral-200)", paddingTop: "18px", marginTop: "28px", flexWrap: "wrap", gap: "10px" }}>
              <span style={{ fontSize: "0.8125rem", color: "var(--neutral-500)" }}>
                Filing date: {searchedApp.filingDate}
              </span>
              <Link
                href={`/appeal/new?regNo=${encodeURIComponent(searchedApp.regNo)}`}
                style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--gov-blue-600)", textDecoration: "none" }}
              >
                File a First Appeal on this RTI →
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default function StatusTrackerPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "40px 0" }}>Loading tracker...</div>}>
        <StatusTrackerContent />
      </Suspense>
    </PortalPage>
  );
}
