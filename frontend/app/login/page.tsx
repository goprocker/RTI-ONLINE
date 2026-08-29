"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithPassword, loginWithOTP, registerCitizen } = useAuth();

  const [tab, setTab] = useState<"standard" | "otp" | "register">("standard");

  // Standard Login fields
  const [username, setUsername] = useState("rajesh.sharma");
  const [password, setPassword] = useState("••••••••");
  const [captchaInput, setCaptchaInput] = useState("7K9P2");
  const [captchaCode] = useState("7K9P2");

  // OTP Login fields
  const [mobileOrEmail, setMobileOrEmail] = useState("9876543210");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");

  // Register fields
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regAddress, setRegAddress] = useState("");
  const [regState, setRegState] = useState("Karnataka");
  const [regPincode, setRegPincode] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function handleStandardLogin(e: FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (captchaInput.trim() !== captchaCode) {
      setErrorMsg("Invalid CAPTCHA security code. Please try again.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const success = loginWithPassword(username, password);
      setLoading(false);
      if (success) {
        router.push("/dashboard");
      } else {
        setErrorMsg("Invalid username or password credentials.");
      }
    }, 400);
  }

  function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    if (!mobileOrEmail.trim()) {
      setErrorMsg("Please enter registered mobile number or email address.");
      return;
    }
    setErrorMsg("");
    setOtpSent(true);
    setOtpInput("4821"); // pre-populate demo OTP for smooth testing
  }

  function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();
    if (!otpInput.trim()) {
      setErrorMsg("Please enter the 4-digit verification OTP.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const success = loginWithOTP(mobileOrEmail, otpInput);
      setLoading(false);
      if (success) {
        router.push("/dashboard");
      } else {
        setErrorMsg("Invalid OTP code.");
      }
    }, 400);
  }

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (!regName || !regEmail || !regMobile) {
      setErrorMsg("Please fill in all mandatory applicant details.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      registerCitizen({
        name: regName,
        email: regEmail,
        mobile: regMobile,
        address: regAddress || "Citizen Residence",
        city: "Bengaluru",
        state: regState,
        pincode: regPincode || "560001",
        isBPL: false
      });
      setLoading(false);
      router.push("/dashboard");
    }, 400);
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Citizen Login</span>
        </div>

        {/* Optional Login Banner */}
        <div style={{ background: "var(--gov-blue-50)", border: "1.5px solid #bfdbfe", borderRadius: "var(--radius-lg)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "14px", marginBottom: "32px" }}>
          <div>
            <strong style={{ color: "var(--gov-navy-950)", fontSize: "0.92rem" }}>
              💡 No account required to file an RTI request
            </strong>
            <p style={{ margin: "2px 0 0", color: "var(--neutral-600)", fontSize: "0.82rem" }}>
              Authentication is an optional convenience layer for profile autofill and centralized dashboard tracking. You can proceed without an account anytime.
            </p>
          </div>
          <Link href="/request/new" className="btn-secondary-action" style={{ padding: "8px 16px", fontSize: "0.82rem", background: "#ffffff" }}>
            File as Guest (No Login) <span>→</span>
          </Link>
        </div>

        <div style={{ maxWidth: "560px", margin: "0 auto", background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "36px", boxShadow: "var(--shadow-lg)" }}>
          <p className="eyebrow" style={{ marginBottom: "6px" }}>
            <span className="eyebrow-line" />
            CITIZEN AUTHENTICATION
          </p>
          <h1 style={{ font: "700 1.85rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 16px" }}>
            Sign in to RTI Online
          </h1>

          {/* Mode Tabs */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "6px", background: "var(--neutral-100)", padding: "4px", borderRadius: "var(--radius-md)", marginBottom: "24px" }}>
            <button
              type="button"
              onClick={() => { setTab("standard"); setErrorMsg(""); }}
              style={{
                background: tab === "standard" ? "#ffffff" : "transparent",
                border: 0,
                padding: "8px 4px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.78rem",
                fontWeight: tab === "standard" ? 700 : 500,
                color: tab === "standard" ? "var(--gov-navy-950)" : "var(--neutral-600)",
                cursor: "pointer",
                boxShadow: tab === "standard" ? "var(--shadow-sm)" : "none"
              }}
            >
              Standard Login
            </button>
            <button
              type="button"
              onClick={() => { setTab("otp"); setErrorMsg(""); }}
              style={{
                background: tab === "otp" ? "#ffffff" : "transparent",
                border: 0,
                padding: "8px 4px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.78rem",
                fontWeight: tab === "otp" ? 700 : 500,
                color: tab === "otp" ? "var(--gov-navy-950)" : "var(--neutral-600)",
                cursor: "pointer",
                boxShadow: tab === "otp" ? "var(--shadow-sm)" : "none"
              }}
            >
              Mobile / OTP (Modern)
            </button>
            <button
              type="button"
              onClick={() => { setTab("register"); setErrorMsg(""); }}
              style={{
                background: tab === "register" ? "#ffffff" : "transparent",
                border: 0,
                padding: "8px 4px",
                borderRadius: "var(--radius-sm)",
                fontSize: "0.78rem",
                fontWeight: tab === "register" ? 700 : 500,
                color: tab === "register" ? "var(--gov-navy-950)" : "var(--neutral-600)",
                cursor: "pointer",
                boxShadow: tab === "register" ? "var(--shadow-sm)" : "none"
              }}
            >
              New Citizen
            </button>
          </div>

          {errorMsg && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#991b1b", padding: "10px 14px", borderRadius: "var(--radius-md)", fontSize: "0.82rem", marginBottom: "18px" }}>
              {errorMsg}
            </div>
          )}

          {/* TAB 1: STANDARD RTI LOGIN */}
          {tab === "standard" && (
            <form onSubmit={handleStandardLogin}>
              <div className="form-group">
                <label htmlFor="login-username">
                  Username / Registered User ID <span className="required">*</span>
                </label>
                <input
                  id="login-username"
                  className="form-control"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter registered username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="login-pass">
                  Password <span className="required">*</span>
                </label>
                <input
                  id="login-pass"
                  className="form-control"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              {/* CAPTCHA verification */}
              <div className="form-group">
                <label htmlFor="login-captcha">
                  Security CAPTCHA <span className="required">*</span>
                </label>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <div style={{ background: "#e2e8f0", border: "1px solid #cbd5e1", borderRadius: "var(--radius-md)", padding: "8px 16px", font: "bold 1.2rem monospace", letterSpacing: "4px", color: "var(--gov-navy-950)", textDecoration: "line-through", userSelect: "none" }}>
                    {captchaCode}
                  </div>
                  <input
                    id="login-captcha"
                    className="form-control"
                    type="text"
                    required
                    maxLength={6}
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter code"
                    style={{ flex: 1 }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary-action"
                disabled={loading}
                style={{ width: "100%", justifyContent: "center", marginTop: "10px" }}
              >
                {loading ? "Authenticating..." : "Sign in to Portal →"}
              </button>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "18px", fontSize: "0.8rem" }}>
                <a href="#forgot" style={{ color: "var(--gov-blue-600)", textDecoration: "none" }}>
                  Forgot Username / Password?
                </a>
                <button
                  type="button"
                  onClick={() => setTab("register")}
                  style={{ background: "none", border: 0, color: "var(--gov-navy-900)", fontWeight: 700, cursor: "pointer" }}
                >
                  Create new account
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: PROPOSED MODERN OTP LOGIN */}
          {tab === "otp" && (
            <div>
              <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", padding: "8px 12px", borderRadius: "var(--radius-sm)", fontSize: "0.76rem", color: "var(--neutral-600)", marginBottom: "16px" }}>
                <strong>Proposed Authentication Modernization:</strong> Fast, passwordless OTP sign-in for verified mobile & email IDs.
              </div>

              {!otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <div className="form-group">
                    <label htmlFor="otp-mobile">
                      Registered Mobile Number or Email <span className="required">*</span>
                    </label>
                    <input
                      id="otp-mobile"
                      className="form-control"
                      type="text"
                      required
                      value={mobileOrEmail}
                      onChange={(e) => setMobileOrEmail(e.target.value)}
                      placeholder="10-digit mobile number or email"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary-action"
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    Send One-Time Password (OTP) →
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <div className="form-group">
                    <label htmlFor="otp-code">
                      Enter 4-Digit Verification OTP <span className="required">*</span>
                    </label>
                    <input
                      id="otp-code"
                      className="form-control"
                      type="text"
                      maxLength={4}
                      required
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      placeholder="4821"
                      style={{ fontSize: "1.3rem", letterSpacing: "8px", textAlign: "center" }}
                    />
                    <small style={{ display: "block", marginTop: "4px", color: "var(--forest-600)", fontSize: "0.75rem" }}>
                      ✓ Demo OTP sent to {mobileOrEmail} (Code: 4821)
                    </small>
                  </div>

                  <button
                    type="submit"
                    className="btn-primary-action"
                    disabled={loading}
                    style={{ width: "100%", justifyContent: "center" }}
                  >
                    {loading ? "Verifying..." : "Verify & Sign In →"}
                  </button>

                  <div style={{ textAlign: "center", marginTop: "14px" }}>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      style={{ background: "none", border: 0, color: "var(--gov-blue-600)", fontSize: "0.8rem", cursor: "pointer" }}
                    >
                      ← Change mobile/email
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: NEW CITIZEN SIGN UP */}
          {tab === "register" && (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="reg-name">
                  Full Name (as per ID) <span className="required">*</span>
                </label>
                <input
                  id="reg-name"
                  className="form-control"
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Pranith Vincent"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="reg-email">
                    Email Address <span className="required">*</span>
                  </label>
                  <input
                    id="reg-email"
                    className="form-control"
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reg-mobile">
                    Mobile Number <span className="required">*</span>
                  </label>
                  <input
                    id="reg-mobile"
                    className="form-control"
                    type="tel"
                    maxLength={10}
                    required
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    placeholder="10-digit mobile"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="reg-addr">Postal Address</label>
                <input
                  id="reg-addr"
                  className="form-control"
                  type="text"
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="Street / Locality"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="reg-state">State / UT</label>
                  <select
                    id="reg-state"
                    className="form-control"
                    value={regState}
                    onChange={(e) => setRegState(e.target.value)}
                  >
                    <option>Karnataka</option>
                    <option>Tamil Nadu</option>
                    <option>Delhi (NCT)</option>
                    <option>Maharashtra</option>
                    <option>Uttar Pradesh</option>
                    <option>West Bengal</option>
                    <option>Telangana</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="reg-pin">PIN Code</label>
                  <input
                    id="reg-pin"
                    className="form-control"
                    type="text"
                    maxLength={6}
                    value={regPincode}
                    onChange={(e) => setRegPincode(e.target.value)}
                    placeholder="6-digit PIN"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary-action"
                disabled={loading}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {loading ? "Creating Profile..." : "Register Citizen Account →"}
              </button>
            </form>
          )}
        </div>
      </main>
    </PortalPage>
  );
}
