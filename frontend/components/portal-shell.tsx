"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { footerNavigation, primaryNavigation, prototypeNotice } from "../content/site";
import { useAuth } from "../lib/auth-context";

export function PortalPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="portal-root" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Skip Link for Keyboard Accessibility (WCAG 2.4.1) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* 01. PROTOTYPE NOTICE RIBBON (Full transparency & credibility) */}
      <div className="prototype-ribbon">
        <div className="wrap">
          <strong>RTI Online — Concept Redesign:</strong> An independent prototype demonstrating a citizen-first redesign of India&apos;s RTI experience. Not affiliated with or operated by the Government of India.
        </div>
      </div>

      {/* 02. CLEAN CITIZEN HEADER */}
      <header style={{ background: "#ffffff", borderBottom: "1px solid var(--neutral-200)" }}>
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px" }}>
          {/* Brand Seal */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "12px", textDecoration: "none" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "var(--radius-sm)", background: "var(--gov-navy-950)", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem" }}>
              RTI
            </div>
            <div>
              <span style={{ display: "block", font: "700 1.25rem var(--font-sans)", color: "var(--gov-navy-950)", letterSpacing: "-0.02em" }}>
                RTI Online
              </span>
              <span style={{ display: "block", fontSize: "0.75rem", color: "var(--neutral-500)", marginTop: "-2px" }}>
                Citizen Information Portal · Concept Redesign
              </span>
            </div>
          </Link>

          {/* Right Utilities: Language, Officer Link & Auth */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "0.84rem" }}>
            <Link href="/officer" style={{ color: "var(--neutral-600)", textDecoration: "none" }}>
              Officer portal →
            </Link>
            <span style={{ color: "var(--neutral-300)" }}>|</span>
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Link href="/dashboard" style={{ fontWeight: 600, color: "var(--gov-navy-950)", textDecoration: "none" }}>
                  My requests
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  style={{ background: "none", border: "none", color: "var(--neutral-500)", cursor: "pointer", fontSize: "0.8125rem", padding: "2px 4px" }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link href="/login" style={{ fontWeight: 600, color: "var(--gov-navy-950)", textDecoration: "none" }}>
                Sign in
              </Link>
            )}
            <Link
              href="/request/eligibility"
              className="btn-primary-action"
              style={{ padding: "6px 14px", fontSize: "0.84rem" }}
            >
              File an RTI
            </Link>
          </div>
        </div>

        {/* 03. CLEAN PRIMARY NAVIGATION BAR */}
        <nav style={{ background: "var(--gov-navy-950)", color: "#ffffff" }}>
          <div className="wrap" style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            {primaryNavigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

              if (item.children) {
                return (
                  <div key={item.label} className="nav-dropdown-wrapper" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      style={{
                        background: dropdownOpen ? "rgba(255,255,255,0.12)" : "transparent",
                        color: "#ffffff",
                        border: 0,
                        padding: "10px 14px",
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}
                    >
                      {item.label} ▾
                    </button>
                    {dropdownOpen && (
                      <div className="nav-dropdown-menu">
                        {item.children.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            className="dropdown-menu-item"
                            onClick={() => setDropdownOpen(false)}
                          >
                            <span className="dropdown-item-title">{sub.label}</span>
                            {sub.desc && <span className="dropdown-item-desc">{sub.desc}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    color: "#ffffff",
                    textDecoration: "none",
                    padding: "10px 14px",
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 700 : 500,
                    background: isActive ? "rgba(255,255,255,0.15)" : "transparent",
                    borderBottom: isActive ? "3px solid var(--saffron-500)" : "3px solid transparent",
                    transition: "background 0.15s ease"
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* MAIN CONTENT LANDMARK */}
      <div id="main-content" style={{ flex: "1 0 auto" }}>
        {children}
      </div>

      {/* 04. CLEAN CITIZEN FOOTER */}
      <footer style={{ background: "#ffffff", borderTop: "1px solid var(--neutral-300)", padding: "40px 0 30px", marginTop: "auto", fontSize: "0.875rem", color: "var(--neutral-600)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "28px", marginBottom: "32px" }}>
            <div>
              <strong style={{ color: "var(--gov-navy-950)", display: "block", marginBottom: "12px", fontSize: "0.9375rem" }}>
                Citizen Services
              </strong>
              <div style={{ display: "grid", gap: "8px" }}>
                <Link href="/request/eligibility" style={{ color: "var(--neutral-700)", textDecoration: "none" }}>File an RTI</Link>
                <Link href="/status" style={{ color: "var(--neutral-700)", textDecoration: "none" }}>Track application</Link>
                <Link href="/appeal" style={{ color: "var(--neutral-700)", textDecoration: "none" }}>File a First Appeal</Link>
                <Link href="/authorities" style={{ color: "var(--neutral-700)", textDecoration: "none" }}>Find public authorities</Link>
              </div>
            </div>

            <div>
              <strong style={{ color: "var(--gov-navy-950)", display: "block", marginBottom: "12px", fontSize: "0.9375rem" }}>
                Help & Guidance
              </strong>
              <div style={{ display: "grid", gap: "8px" }}>
                <Link href="/search" style={{ color: "var(--neutral-700)", textDecoration: "none" }}>Search public records</Link>
                <Link href="/reconciliation" style={{ color: "var(--neutral-700)", textDecoration: "none" }}>Payment issue</Link>
                <Link href="/offline" style={{ color: "var(--neutral-700)", textDecoration: "none" }}>Offline RTI application</Link>
                <Link href="/faq" style={{ color: "var(--neutral-700)", textDecoration: "none" }}>Frequently asked questions</Link>
              </div>
            </div>

            <div>
              <strong style={{ color: "var(--gov-navy-950)", display: "block", marginBottom: "12px", fontSize: "0.9375rem" }}>
                About this Prototype
              </strong>
              <p style={{ fontSize: "0.8125rem", color: "var(--neutral-500)", margin: "0 0 10px", lineHeight: "1.5" }}>
                This is an independent open-source UX redesign project created to demonstrate accessible, citizen-first public service workflows under the RTI Act, 2005.
              </p>
              <div style={{ display: "flex", gap: "12px", fontSize: "0.8125rem" }}>
                <Link href="/accessibility">Accessibility</Link>
                <Link href="/privacy">Privacy notice</Link>
                <Link href="/contact">Feedback</Link>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--neutral-200)", paddingTop: "18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", fontSize: "0.8125rem", color: "var(--neutral-500)" }}>
            <span>RTI Online Concept Redesign · Built for citizens</span>
            <Link href="/officer" style={{ color: "var(--neutral-500)", textDecoration: "none" }}>
              Public Information Officer desk →
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
