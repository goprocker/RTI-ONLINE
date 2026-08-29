"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";

export default function FirstAppealLandingPage() {
  const router = useRouter();
  const [regNo, setRegNo] = useState("");

  function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!regNo.trim()) return;
    router.push(`/appeal/new?regNo=${encodeURIComponent(regNo.trim())}`);
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>First Appeal</span>
        </div>

        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <div style={{ marginBottom: "28px" }}>
            <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
              Do you need to appeal an RTI?
            </h1>
            <p style={{ color: "var(--neutral-600)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
              Under Section 19(1) of the RTI Act, you can file a First Appeal at zero fee if you did not receive a response within 30 days, or if the response provided was incomplete or denied.
            </p>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
            <form onSubmit={handleLookup}>
              <div style={{ marginBottom: "20px" }}>
                <label htmlFor="appeal-reg-input" style={{ display: "block", fontSize: "0.92rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "6px" }}>
                  Enter original RTI Registration Number
                </label>
                <input
                  id="appeal-reg-input"
                  type="text"
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder="e.g. DOPT/R/2026/04812"
                  style={{ width: "100%", padding: "11px 14px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.95rem", fontFamily: "var(--font-number)" }}
                />
              </div>

              <button
                type="submit"
                className="btn-hero-primary"
                style={{ width: "100%", justifyContent: "center", padding: "12px" }}
              >
                Find my RTI & continue to appeal →
              </button>
            </form>

            <div style={{ borderTop: "1px solid var(--neutral-200)", marginTop: "24px", paddingTop: "18px", fontSize: "0.82rem", color: "var(--neutral-600)" }}>
              <strong>Zero Statutory Fee:</strong> No application fee is charged for filing a First Appeal with the First Appellate Authority (FAA).
            </div>
          </div>
        </div>
      </main>
    </PortalPage>
  );
}
