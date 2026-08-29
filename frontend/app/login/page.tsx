"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithOTP, loginWithPassword } = useAuth();

  const [authMode, setAuthMode] = useState<"OTP" | "PASSWORD">("OTP");
  const [mobile, setMobile] = useState("9876543210");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVal, setOtpVal] = useState("123456");

  const [username, setUsername] = useState("citizen_rajesh");
  const [password, setPassword] = useState("••••••••");

  function handleSendOtp() {
    if (!mobile.trim()) return;
    setOtpSent(true);
  }

  function handleVerifyOtp() {
    loginWithOTP(mobile, otpVal);
    router.push("/dashboard");
  }

  function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault();
    loginWithPassword(username, password);
    router.push("/dashboard");
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "48px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Sign in</span>
        </div>

        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <h1 style={{ font: "700 2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
              Sign in to RTI Online
            </h1>
            <p style={{ color: "var(--neutral-600)", fontSize: "0.9rem", margin: 0 }}>
              Access your filed requests, track status, and view response orders.
            </p>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "32px", boxShadow: "var(--shadow-sm)" }}>
            {/* Tabs */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", background: "var(--neutral-100)", padding: "4px", borderRadius: "var(--radius-sm)", marginBottom: "24px" }}>
              <button
                type="button"
                onClick={() => setAuthMode("OTP")}
                style={{
                  background: authMode === "OTP" ? "#ffffff" : "transparent",
                  color: authMode === "OTP" ? "var(--gov-navy-950)" : "var(--neutral-600)",
                  border: 0,
                  padding: "8px",
                  borderRadius: "var(--radius-xs)",
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Mobile OTP
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("PASSWORD")}
                style={{
                  background: authMode === "PASSWORD" ? "#ffffff" : "transparent",
                  color: authMode === "PASSWORD" ? "var(--gov-navy-950)" : "var(--neutral-600)",
                  border: 0,
                  padding: "8px",
                  borderRadius: "var(--radius-xs)",
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                Username & Password
              </button>
            </div>

            {authMode === "OTP" ? (
              <div>
                <div style={{ marginBottom: "16px" }}>
                  <label htmlFor="login-mobile" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                    Enter Mobile Number
                  </label>
                  <input
                    id="login-mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="10-digit mobile number"
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.92rem", fontFamily: "var(--font-number)" }}
                  />
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    className="btn-hero-primary"
                    onClick={handleSendOtp}
                    style={{ width: "100%", justifyContent: "center", padding: "10px" }}
                  >
                    Send OTP →
                  </button>
                ) : (
                  <div>
                    <div style={{ marginBottom: "16px" }}>
                      <label htmlFor="login-otp" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                        Enter 6-digit OTP (Demo code: 123456)
                      </label>
                      <input
                        id="login-otp"
                        type="text"
                        value={otpVal}
                        onChange={(e) => setOtpVal(e.target.value)}
                        style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "1rem", letterSpacing: "0.2em", textAlign: "center" }}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-hero-primary"
                      onClick={handleVerifyOtp}
                      style={{ width: "100%", justifyContent: "center", padding: "10px" }}
                    >
                      Verify & Sign In →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handlePasswordLogin}>
                <div style={{ marginBottom: "14px" }}>
                  <label htmlFor="login-user" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                    Username / Registration ID
                  </label>
                  <input
                    id="login-user"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.92rem" }}
                  />
                </div>
                <div style={{ marginBottom: "18px" }}>
                  <label htmlFor="login-pwd" style={{ display: "block", fontSize: "0.86rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "4px" }}>
                    Password
                  </label>
                  <input
                    id="login-pwd"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", padding: "10px 12px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.92rem" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-hero-primary"
                  style={{ width: "100%", justifyContent: "center", padding: "10px" }}
                >
                  Sign In →
                </button>
              </form>
            )}

            {/* Guest Option */}
            <div style={{ marginTop: "24px", paddingTop: "18px", borderTop: "1px solid var(--neutral-200)", textAlign: "center" }}>
              <div style={{ fontSize: "0.82rem", color: "var(--neutral-600)", marginBottom: "6px" }}>
                You don&apos;t need an account to file an RTI.
              </div>
              <Link href="/request/eligibility" style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--gov-navy-900)", textDecoration: "none" }}>
                Continue without signing in →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </PortalPage>
  );
}
