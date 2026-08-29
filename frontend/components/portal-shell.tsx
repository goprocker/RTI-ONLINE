"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "../content/site";
import { useAuth } from "../lib/auth-context";
import { useLocation } from "../lib/location-context";
import { 
  FileText, 
  Search, 
  Scale, 
  Building2, 
  User, 
  Layers,
  ChevronDown,
  MapPin,
  X,
  ExternalLink
} from "lucide-react";

export function PortalPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { city, state, regionInfo, isAutoDetected, showRegionalBanner, dismissBanner } = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="portal-shell">
      {/* 01 — OFFICIAL GOVERNMENT OF INDIA UTILITY BAR */}
      <header className="top-utility-bar" role="region" aria-label="Official Government Header">
        <div className="wrap utility-inner" style={{ padding: "4px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* Identity & Auto Location Detection */}
          <div className="gov-identity-strip" style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.9rem" }}>🇮🇳</span>
            <span className="gov-title-text" style={{ fontWeight: 800, color: "#ffffff", fontSize: "0.78rem" }}>
              भारत सरकार · Government of India
            </span>
            <span className="utility-divider" aria-hidden="true" style={{ color: "#475569" }}>|</span>
            <span style={{ fontSize: "0.75rem", color: "#cbd5e1" }}>
              Ministry of Personnel, Public Grievances & Pensions
            </span>

            {/* Subtle Location Indicator */}
            {isAutoDetected && state && (
              <div 
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  background: "rgba(245, 158, 11, 0.15)",
                  border: "1px solid rgba(245, 158, 11, 0.4)",
                  padding: "1px 8px",
                  borderRadius: "12px",
                  fontSize: "0.72rem",
                  color: "#fef3c7"
                }}
              >
                <MapPin size={11} color="#f59e0b" />
                <span>
                  Detected: <strong>{city ? `${city}, ` : ""}{state}</strong>
                </span>
              </div>
            )}
          </div>

          {/* Quick Utilities */}
          <div className="utility-actions" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link href="/manual" className="utility-link" style={{ fontSize: "0.75rem", color: "#e2e8f0" }}>
              RTI Process Flowchart
            </Link>
            <span className="utility-divider" aria-hidden="true" style={{ color: "#475569" }}>|</span>
            <Link href="/accessibility" className="utility-link" style={{ fontSize: "0.75rem", color: "#e2e8f0" }}>
              Accessibility
            </Link>
            <span className="utility-divider" aria-hidden="true" style={{ color: "#475569" }}>|</span>
            <span lang="hi" className="lang-indicator" style={{ fontSize: "0.75rem", fontWeight: 700, color: "#f59e0b" }}>
              {regionInfo.nativeLanguageName ? `${regionInfo.nativeLanguageName} / हिन्दी` : "हिन्दी"}
            </span>
          </div>
        </div>
      </header>

      {/* 02 — NATIONAL TRICOLOR ACCENT RIBBON */}
      <div 
        className="tricolor-ribbon" 
        role="presentation" 
        style={{ height: "4px", background: "linear-gradient(90deg, #FF9933 0%, #FF9933 33.33%, #FFFFFF 33.33%, #FFFFFF 66.66%, #138808 66.66%, #138808 100%)" }} 
      />

      {/* 03 — REGIONAL CITIZEN ASSISTANCE NOTIFICATION (AUTOMATIC BASED ON LOCATION) */}
      {isAutoDetected && showRegionalBanner && regionInfo.welcomeGreeting && (
        <div 
          style={{
            background: "#0a2238",
            color: "#ffffff",
            padding: "6px 16px",
            borderBottom: "1px solid #1e3a8a",
            fontSize: "0.78rem"
          }}
        >
          <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ background: "#d97706", color: "#ffffff", padding: "1px 6px", borderRadius: "3px", fontSize: "0.68rem", fontWeight: 800 }}>
                {regionInfo.nativeLanguageName}
              </span>
              <span>{regionInfo.welcomeGreeting}</span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {regionInfo.localPortalUrl && (
                <a
                  href={regionInfo.localPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#f59e0b", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "3px", fontSize: "0.74rem" }}
                >
                  <span>{state} State Portal ↗</span>
                </a>
              )}
              <button
                type="button"
                onClick={dismissBanner}
                aria-label="Dismiss banner"
                style={{ background: "transparent", border: 0, color: "#94a3b8", cursor: "pointer", padding: "2px", display: "flex", alignItems: "center" }}
              >
                <X size={13} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 04 — MAIN BRAND HEADER */}
      <div className="header" role="banner" style={{ background: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "10px 0" }}>
        <div className="wrap header-inner" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          
          {/* Official Emblem & Portal Title */}
          <Link href="/" className="brand" aria-label="RTI Online Home" style={{ display: "flex", alignItems: "center", gap: "14px", textDecoration: "none" }}>
            <div className="emblem-container" aria-hidden="true" style={{ width: "46px", height: "46px", flexShrink: 0, position: "relative" }}>
              <img 
                src="/images/gandhi-emblem.jpg" 
                alt="National Emblem & Mahatma Gandhi Seal" 
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", border: "1.5px solid #d97706", boxShadow: "0 1px 3px rgba(0,0,0,0.12)" }}
              />
            </div>
            <div className="brand-text">
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="brand-title" style={{ font: "800 1.45rem var(--font-serif)", color: "#071626", lineHeight: 1.1 }}>
                  RTI Online
                </span>
                <span style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #f59e0b", fontSize: "0.68rem", fontWeight: 800, padding: "1px 6px", borderRadius: "4px" }}>
                  CENTRAL PORTAL
                </span>
              </div>
              <span className="brand-sub" style={{ fontSize: "0.78rem", color: "#475569", fontWeight: 500, display: "block" }}>
                Right to Information Portal · Government of India
              </span>
            </div>
          </Link>

          {/* Right Citizen Action Area */}
          <div className="header-actions" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {user ? (
              <Link href="/dashboard" className="user-profile-badge" style={{ display: "flex", alignItems: "center", gap: "6px", background: "#f1f5f9", padding: "6px 12px", borderRadius: "6px", textDecoration: "none", color: "#0f2942", fontSize: "0.82rem", fontWeight: 700 }}>
                <User size={15} />
                <span>{user.name}</span>
              </Link>
            ) : (
              <Link href="/login" className="btn-signin-link" style={{ padding: "7px 14px", fontSize: "0.82rem", fontWeight: 700, color: "#0f2942", textDecoration: "none", border: "1px solid #cbd5e1", borderRadius: "6px" }}>
                Citizen Sign In
              </Link>
            )}

            <Link href="/request/eligibility" className="btn-file-primary" style={{ background: "#0f2942", color: "#ffffff", padding: "8px 16px", borderRadius: "6px", fontSize: "0.84rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <FileText size={15} />
              <span>+ Submit Request</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 05 — MAIN NAVIGATION BAR */}
      <nav className="nav" aria-label="Primary navigation" style={{ background: "#0f2942", borderBottom: "2px solid #d97706" }}>
        <div className="wrap nav-inner">
          <ul className="nav-list" role="menubar" style={{ display: "flex", alignItems: "center", margin: 0, padding: 0, listStyle: "none", gap: "4px" }}>
            <li role="none">
              <Link
                href="/"
                role="menuitem"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                style={{ display: "block", padding: "10px 14px", color: pathname === "/" ? "#f59e0b" : "#ffffff", fontWeight: 700, fontSize: "0.84rem", textDecoration: "none" }}
              >
                Home
              </Link>
            </li>

            <li role="none">
              <Link
                href="/request/eligibility"
                role="menuitem"
                className={`nav-link ${pathname.startsWith("/request") ? "active" : ""}`}
                style={{ display: "block", padding: "10px 14px", color: pathname.startsWith("/request") ? "#f59e0b" : "#ffffff", fontWeight: 700, fontSize: "0.84rem", textDecoration: "none" }}
              >
                Submit Request
              </Link>
            </li>

            <li role="none">
              <Link
                href="/status"
                role="menuitem"
                className={`nav-link ${pathname.startsWith("/status") ? "active" : ""}`}
                style={{ display: "block", padding: "10px 14px", color: pathname.startsWith("/status") ? "#f59e0b" : "#ffffff", fontWeight: 700, fontSize: "0.84rem", textDecoration: "none" }}
              >
                Track Status
              </Link>
            </li>

            <li role="none">
              <Link
                href="/appeal"
                role="menuitem"
                className={`nav-link ${pathname.startsWith("/appeal") ? "active" : ""}`}
                style={{ display: "block", padding: "10px 14px", color: pathname.startsWith("/appeal") ? "#f59e0b" : "#ffffff", fontWeight: 700, fontSize: "0.84rem", textDecoration: "none" }}
              >
                Submit First Appeal
              </Link>
            </li>

            <li role="none">
              <Link
                href="/authorities"
                role="menuitem"
                className={`nav-link ${pathname.startsWith("/authorities") ? "active" : ""}`}
                style={{ display: "block", padding: "10px 14px", color: pathname.startsWith("/authorities") ? "#f59e0b" : "#ffffff", fontWeight: 700, fontSize: "0.84rem", textDecoration: "none" }}
              >
                Public Authorities
              </Link>
            </li>

            <li
              role="none"
              className="nav-dropdown-wrapper"
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
              style={{ position: "relative" }}
            >
              <button
                type="button"
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="nav-link nav-dropdown-btn"
                style={{ background: "transparent", border: 0, padding: "10px 14px", color: "#ffffff", fontWeight: 700, fontSize: "0.84rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
              >
                Help & Guidelines
                <ChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <div className="nav-dropdown-menu" role="menu" style={{ position: "absolute", top: "100%", left: 0, background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", zIndex: 100, minWidth: "260px", padding: "6px 0" }}>
                  <Link href="/manual" role="menuitem" onClick={() => setDropdownOpen(false)} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#0f2942", fontSize: "0.82rem" }}>
                    <strong style={{ display: "block", fontSize: "0.84rem" }}>RTI Process & Flowchart</strong>
                    <span style={{ fontSize: "0.74rem", color: "#64748b" }}>Statutory 30-day timeline and decision tree</span>
                  </Link>
                  <Link href="/faq" role="menuitem" onClick={() => setDropdownOpen(false)} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#0f2942", fontSize: "0.82rem" }}>
                    <strong style={{ display: "block", fontSize: "0.84rem" }}>Frequently Asked Questions</strong>
                    <span style={{ fontSize: "0.74rem", color: "#64748b" }}>Common questions about fees and eligibility</span>
                  </Link>
                  <Link href="/search" role="menuitem" onClick={() => setDropdownOpen(false)} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#0f2942", fontSize: "0.82rem" }}>
                    <strong style={{ display: "block", fontSize: "0.84rem" }}>Proactive Disclosures (Section 4)</strong>
                    <span style={{ fontSize: "0.74rem", color: "#64748b" }}>Search published circulars and orders</span>
                  </Link>
                  <Link href="/offline" role="menuitem" onClick={() => setDropdownOpen(false)} style={{ display: "block", padding: "8px 16px", textDecoration: "none", color: "#0f2942", fontSize: "0.82rem" }}>
                    <strong style={{ display: "block", fontSize: "0.84rem" }}>State & Offline Application Form</strong>
                    <span style={{ fontSize: "0.74rem", color: "#64748b" }}>Printable Section 6(1) letter</span>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>

      {/* 06 — PAGE BODY */}
      <div className="portal-content" id="main-content" style={{ paddingBottom: "70px" }}>
        {children}
      </div>

      {/* 07 — PERSISTENT CITIZEN QUICK TASKBAR (Sticky Taskbar at bottom) */}
      <div 
        className="citizen-taskbar" 
        role="region" 
        aria-label="Quick Citizen Taskbar"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "#071626",
          borderTop: "2px solid #d97706",
          padding: "8px 16px",
          zIndex: 90,
          boxShadow: "0 -4px 12px rgba(0, 0, 0, 0.15)"
        }}
      >
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "0.8rem", color: "#cbd5e1", fontWeight: 700 }}>
              Quick Services:
            </span>
            <Link 
              href="/request/eligibility" 
              style={{ background: "#d97706", color: "#ffffff", padding: "5px 12px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}
            >
              <FileText size={13} />
              Submit RTI
            </Link>
            <Link 
              href="/status" 
              style={{ background: "#1e293b", color: "#ffffff", border: "1px solid #475569", padding: "5px 12px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}
            >
              <Search size={13} />
              Track Status
            </Link>
            <Link 
              href="/appeal" 
              style={{ background: "#1e293b", color: "#ffffff", border: "1px solid #475569", padding: "5px 12px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}
            >
              <Scale size={13} />
              First Appeal
            </Link>
            <Link 
              href="/authorities" 
              style={{ background: "#1e293b", color: "#ffffff", border: "1px solid #475569", padding: "5px 12px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "5px" }}
            >
              <Building2 size={13} />
              Find Authority
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link 
              href="/manual" 
              style={{ color: "#f59e0b", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
            >
              <Layers size={13} />
              Statutory Flowchart →
            </Link>
          </div>
        </div>
      </div>

      {/* 08 — OFFICIAL GOVERNMENT FOOTER */}
      <footer className="footer" role="contentinfo" style={{ background: "#071626", color: "#ffffff", padding: "36px 0 24px", borderTop: "1px solid #1e293b" }}>
        <div className="wrap">
          <div className="footer-top" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: "24px", paddingBottom: "24px", borderBottom: "1px solid #1e293b" }}>
            <div className="footer-brand-col">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <img 
                  src="/images/gandhi-emblem.jpg" 
                  alt="Seal" 
                  style={{ width: "32px", height: "32px", borderRadius: "50%", border: "1px solid #d97706" }}
                />
                <h3 style={{ margin: 0, font: "700 1.15rem var(--font-serif)", color: "#ffffff" }}>RTI Online Portal</h3>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#94a3b8", lineHeight: "1.6", margin: "0 0 10px" }}>
                Official single-window web portal of the Government of India for Indian citizens to file RTI requests and First Appeals online under the Right to Information Act, 2005.
              </p>
              <div style={{ fontSize: "0.74rem", color: "#64748b" }}>
                Designed and maintained in compliance with Guidelines for Indian Government Websites (GIGW 3.0).
              </div>
            </div>

            <div className="footer-links-col">
              <h4 style={{ color: "#f59e0b", fontSize: "0.85rem", margin: "0 0 10px", fontWeight: 700 }}>Online Services</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px", fontSize: "0.8rem" }}>
                <li><Link href="/request/eligibility" style={{ color: "#cbd5e1", textDecoration: "none" }}>Submit RTI Request</Link></li>
                <li><Link href="/status" style={{ color: "#cbd5e1", textDecoration: "none" }}>Track Application Status</Link></li>
                <li><Link href="/appeal" style={{ color: "#cbd5e1", textDecoration: "none" }}>Submit First Appeal</Link></li>
                <li><Link href="/authorities" style={{ color: "#cbd5e1", textDecoration: "none" }}>Public Authorities Directory</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 style={{ color: "#f59e0b", fontSize: "0.85rem", margin: "0 0 10px", fontWeight: 700 }}>Help & Rules</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px", fontSize: "0.8rem" }}>
                <li><Link href="/manual" style={{ color: "#cbd5e1", textDecoration: "none" }}>Statutory Process Flowchart</Link></li>
                <li><Link href="/faq" style={{ color: "#cbd5e1", textDecoration: "none" }}>Frequently Asked Questions</Link></li>
                <li><Link href="/search" style={{ color: "#cbd5e1", textDecoration: "none" }}>Proactive Disclosures (Section 4)</Link></li>
                <li><Link href="/reconciliation" style={{ color: "#cbd5e1", textDecoration: "none" }}>Payment Reconciliation</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 style={{ color: "#f59e0b", fontSize: "0.85rem", margin: "0 0 10px", fontWeight: 700 }}>Transparency</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "6px", fontSize: "0.8rem" }}>
                <li><Link href="/accessibility" style={{ color: "#cbd5e1", textDecoration: "none" }}>Accessibility Statement</Link></li>
                <li><Link href="/privacy" style={{ color: "#cbd5e1", textDecoration: "none" }}>Privacy Policy & Terms</Link></li>
                <li><Link href="/contact" style={{ color: "#cbd5e1", textDecoration: "none" }}>Nodal Support Contacts</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "16px", fontSize: "0.75rem", color: "#64748b" }}>
            <div>
              © 2026 Government of India · RTI Online Central Portal.
            </div>
            <div>
              <span>National Portal of India · Digital India Initiative</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
