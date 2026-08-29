"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

export default function AppealLookupPage() {
  const router = useRouter();
  const { applications } = useAuth();
  const [regNo, setRegNo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleLookup() {
    if (!regNo.trim()) {
      setErrorMsg("Please enter your RTI registration number.");
      return;
    }

    const found = applications.find(
      (a) => a.regNo.toLowerCase() === regNo.trim().toLowerCase()
    );

    if (found) {
      router.push(`/appeal/new?regNo=${encodeURIComponent(found.regNo)}`);
    } else {
      // Allow proceeding with typed reg number as fallback
      router.push(`/appeal/new?regNo=${encodeURIComponent(regNo.trim().toUpperCase())}`);
    }
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 20px 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>First Appeal</span>
        </div>

        <div className="form-wrap">
          <h1 style={{ fontSize: "1.75rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            Do you need to appeal an RTI?
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "var(--neutral-600)", lineHeight: "1.5", margin: "0 0 28px" }}>
            You can file a First Appeal at zero fee if you did not receive a response within 30 days, or if you are dissatisfied with the information provided.
          </p>

          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)" }}>
            <div className="form-group">
              <label htmlFor="appeal-regno-input">RTI Registration Number <span style={{ color: "#dc2626" }}>*</span></label>
              <div className="form-hint">Enter the 16-character registration number from your original RTI application.</div>
              <input
                id="appeal-regno-input"
                type="text"
                value={regNo}
                onChange={(e) => {
                  setRegNo(e.target.value);
                  setErrorMsg("");
                }}
                placeholder="e.g. DOPT/R/2026/04812"
                className="form-control"
                style={{ fontFamily: "var(--font-number)", textTransform: "uppercase" }}
              />
              {errorMsg && (
                <div style={{ color: "#dc2626", fontSize: "0.8125rem", marginTop: "4px" }}>
                  {errorMsg}
                </div>
              )}
            </div>

            <button
              type="button"
              className="btn-primary-action"
              onClick={handleLookup}
              style={{ width: "100%", padding: "12px" }}
            >
              Find my RTI application →
            </button>
          </div>

          <div style={{ marginTop: "24px", fontSize: "0.8125rem", color: "var(--neutral-500)", lineHeight: "1.5" }}>
            <strong>Legal reference:</strong> First Appeals are adjudicated by the senior departmental First Appellate Authority (FAA) under Section 19(1) of the RTI Act, 2005. There is no fee for filing a First Appeal.
          </div>
        </div>
      </main>
    </PortalPage>
  );
}
