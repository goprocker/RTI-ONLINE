"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

export default function HistoryPage() {
  const { user, applications } = useAuth();

  const [mobileOrEmail, setMobileOrEmail] = useState("9876543210");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);

  function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setOtpSent(true);
    setOtp("7319");
  }

  function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setVerified(true);
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>View History</span>
        </div>

        <section className="flow-hero" style={{ background: "linear-gradient(135deg, #eef5fb 0%, #ffffff 100%)", borderRadius: "var(--radius-xl)", padding: "36px 40px", marginBottom: "36px", border: "1px solid var(--neutral-200)" }}>
          <p className="eyebrow"><span className="eyebrow-line" />APPLICATION ARCHIVES</p>
          <h1 className="hero-h1" style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)", margin: "6px 0 12px" }}>
            Past RTI requests and <em>appeals history.</em>
          </h1>
          <p style={{ maxWidth: "660px", color: "var(--neutral-700)", fontSize: "0.96rem", lineHeight: "1.6", margin: 0 }}>
            Access the complete history of previously submitted RTI applications, fee payment receipts, and First Appeal records linked to your contact details.
          </p>
        </section>

        {user ? (
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "32px", boxShadow: "var(--shadow-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <h2 style={{ font: "700 1.4rem var(--font-serif)", color: "var(--gov-navy-950)", margin: 0 }}>
                  Logged-in History for {user.name}
                </h2>
                <p style={{ fontSize: "0.84rem", color: "var(--neutral-600)", margin: "4px 0 0" }}>
                  Displaying {applications.length} applications linked to {user.email}
                </p>
              </div>
              <Link href="/dashboard" className="btn-primary-action">
                Open Full Dashboard →
              </Link>
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {applications.map((app) => (
                <div key={app.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", background: "var(--neutral-50)", borderRadius: "var(--radius-md)", border: "1px solid var(--neutral-200)" }}>
                  <div>
                    <strong style={{ fontSize: "1rem", color: "var(--gov-navy-950)" }}>{app.regNo}</strong>
                    <div style={{ fontSize: "0.82rem", color: "var(--neutral-600)" }}>{app.publicAuthority} · Filed: {app.filingDate}</div>
                  </div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                    <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--gov-blue-600)" }}>{app.statusLabel}</span>
                    <Link href={`/status?regNo=${encodeURIComponent(app.regNo)}`} className="btn-secondary-action" style={{ padding: "6px 12px", fontSize: "0.78rem" }}>
                      Track Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: "600px", margin: "0 auto", background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "36px", boxShadow: "var(--shadow-lg)" }}>
            <h2 style={{ font: "700 1.4rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
              OTP Verification for Guest History
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--neutral-600)", margin: "0 0 24px" }}>
              To protect applicant privacy, past requests filed without an account require OTP verification sent to your registered mobile number or email.
            </p>

            {!otpSent ? (
              <form onSubmit={handleSendOtp}>
                <div className="form-group">
                  <label htmlFor="hist-mobile">
                    Registered Mobile Number or Email <span className="required">*</span>
                  </label>
                  <input
                    id="hist-mobile"
                    className="form-control"
                    type="text"
                    required
                    value={mobileOrEmail}
                    onChange={(e) => setMobileOrEmail(e.target.value)}
                    placeholder="10-digit mobile or email"
                  />
                </div>
                <button type="submit" className="btn-primary-action" style={{ width: "100%", justifyContent: "center" }}>
                  Send History Access OTP →
                </button>
              </form>
            ) : !verified ? (
              <form onSubmit={handleVerifyOtp}>
                <div className="form-group">
                  <label htmlFor="hist-otp">
                    Enter Verification OTP <span className="required">*</span>
                  </label>
                  <input
                    id="hist-otp"
                    className="form-control"
                    type="text"
                    maxLength={4}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="7319"
                    style={{ fontSize: "1.2rem", letterSpacing: "6px", textAlign: "center" }}
                  />
                  <small style={{ color: "var(--forest-600)", display: "block", marginTop: "4px", fontSize: "0.75rem" }}>
                    ✓ Demo OTP sent to {mobileOrEmail} (Code: 7319)
                  </small>
                </div>
                <button type="submit" className="btn-primary-action" style={{ width: "100%", justifyContent: "center" }}>
                  Verify & Fetch RTI History →
                </button>
              </form>
            ) : (
              <div>
                <div style={{ background: "var(--forest-50)", border: "1px solid #a7f3d0", padding: "12px 16px", borderRadius: "var(--radius-md)", color: "var(--forest-700)", fontSize: "0.85rem", marginBottom: "20px" }}>
                  ✓ Identity verified for {mobileOrEmail}. Showing historical records.
                </div>

                <div style={{ display: "grid", gap: "10px" }}>
                  {applications.map((app) => (
                    <div key={app.id} style={{ padding: "12px", background: "var(--neutral-50)", borderRadius: "var(--radius-md)", border: "1px solid var(--neutral-200)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <strong>{app.regNo}</strong>
                        <span style={{ fontSize: "0.75rem", color: "var(--gov-blue-600)", fontWeight: 700 }}>{app.statusLabel}</span>
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "var(--neutral-600)", marginTop: "2px" }}>{app.publicAuthority} · Filed {app.filingDate}</div>
                      <Link href={`/status?regNo=${encodeURIComponent(app.regNo)}`} style={{ display: "inline-block", marginTop: "6px", fontSize: "0.78rem", fontWeight: 700, color: "var(--gov-navy-900)" }}>
                        View Timeline & Documents →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </PortalPage>
  );
}
