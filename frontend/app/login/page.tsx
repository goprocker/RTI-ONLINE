"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [authMode, setAuthMode] = useState<"OTP" | "PASSWORD">("OTP");
  const [mobile, setMobile] = useState("9876543210");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [username, setUsername] = useState("citizen_user");
  const [password, setPassword] = useState("password123");

  function handleSendOtp() {
    if (!mobile.trim() || mobile.trim().length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setOtpSent(true);
  }

  function handleVerifyOtp() {
    login({
      name: "Rajesh Sharma",
      email: "rajesh.sharma@example.gov.in",
      mobile: mobile,
      address: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru",
      pincode: "560038",
      state: "Karnataka",
      gender: "Male"
    });
    router.push("/dashboard");
  }

  function handlePasswordLogin() {
    login({
      name: "Rajesh Sharma",
      email: "rajesh.sharma@example.gov.in",
      mobile: "9876543210",
      address: "Flat 402, Kaveri Apartments, Indiranagar, Bengaluru",
      pincode: "560038",
      state: "Karnataka",
      gender: "Male"
    });
    router.push("/dashboard");
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 20px 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Sign in</span>
        </div>

        <div className="form-wrap">
          <h1 style={{ fontSize: "1.75rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            Sign in to RTI Online
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "var(--neutral-600)", lineHeight: "1.5", margin: "0 0 24px" }}>
            Sign in to view your filed applications, download response orders, and autofill future requests.
          </p>

          {/* Login Card */}
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "28px", boxShadow: "var(--shadow-sm)", marginBottom: "24px" }}>
            {/* Mode Switcher Tabs */}
            <div style={{ display: "flex", borderBottom: "1px solid var(--neutral-200)", marginBottom: "20px" }}>
              <button
                type="button"
                onClick={() => setAuthMode("OTP")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "none",
                  border: "none",
                  borderBottom: authMode === "OTP" ? "2px solid var(--gov-navy-950)" : "2px solid transparent",
                  fontWeight: authMode === "OTP" ? 700 : 500,
                  color: authMode === "OTP" ? "var(--gov-navy-950)" : "var(--neutral-500)",
                  cursor: "pointer",
                  fontSize: "0.9375rem"
                }}
              >
                Mobile OTP
              </button>
              <button
                type="button"
                onClick={() => setAuthMode("PASSWORD")}
                style={{
                  flex: 1,
                  padding: "10px",
                  background: "none",
                  border: "none",
                  borderBottom: authMode === "PASSWORD" ? "2px solid var(--gov-navy-950)" : "2px solid transparent",
                  fontWeight: authMode === "PASSWORD" ? 700 : 500,
                  color: authMode === "PASSWORD" ? "var(--gov-navy-950)" : "var(--neutral-500)",
                  cursor: "pointer",
                  fontSize: "0.9375rem"
                }}
              >
                Username & Password
              </button>
            </div>

            {authMode === "OTP" ? (
              <div>
                <div className="form-group">
                  <label htmlFor="login-mobile">10-Digit Mobile Number <span style={{ color: "#dc2626" }}>*</span></label>
                  <input
                    id="login-mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="form-control"
                    disabled={otpSent}
                  />
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    className="btn-primary-action"
                    onClick={handleSendOtp}
                    style={{ width: "100%", padding: "11px" }}
                  >
                    Send OTP →
                  </button>
                ) : (
                  <div>
                    <div className="form-group">
                      <label htmlFor="login-otp">Enter 6-Digit OTP</label>
                      <input
                        id="login-otp"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="e.g. 123456"
                        className="form-control"
                        style={{ fontFamily: "var(--font-number)", letterSpacing: "0.2em", textAlign: "center" }}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn-primary-action"
                      onClick={handleVerifyOtp}
                      style={{ width: "100%", padding: "11px" }}
                    >
                      Verify & Sign In →
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="login-user">Username or Email <span style={{ color: "#dc2626" }}>*</span></label>
                  <input
                    id="login-user"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="login-pwd">Password <span style={{ color: "#dc2626" }}>*</span></label>
                  <input
                    id="login-pwd"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </div>
                <button
                  type="button"
                  className="btn-primary-action"
                  onClick={handlePasswordLogin}
                  style={{ width: "100%", padding: "11px" }}
                >
                  Sign In →
                </button>
              </div>
            )}
          </div>

          {/* Guest Continuation Notice */}
          <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", padding: "16px 20px", textAlign: "center" }}>
            <p style={{ margin: "0 0 8px", fontSize: "0.875rem", color: "var(--neutral-700)" }}>
              You do not need an account to file an RTI request.
            </p>
            <Link href="/request/eligibility" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--gov-blue-600)" }}>
              Continue without signing in →
            </Link>
          </div>
        </div>
      </main>
    </PortalPage>
  );
}
