"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState, useRef, useEffect } from "react";
import { footerNavigation, primaryNavigation } from "../content/site";
import { useAuth } from "../lib/auth-context";

export function PortalHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xl">("normal");
  const [highContrast, setHighContrast] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function toggleContrast() {
    setHighContrast(!highContrast);
    if (!highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setHelpDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Top Utility Bar */}
      <div className="utility">
        <div className="wrap utility-inner">
          <div className="utility-gov-identity">
            <span className="emblem-dot" aria-hidden="true">🇮🇳</span>
            <span>भारत सरकार | Government of India</span>
            <span className="utility-divider" aria-hidden="true">|</span>
            <span>Department of Personnel & Training</span>
          </div>

          <span className="grow" />

          <div className="utility-tools">
            <div className="a11y-controls" aria-label="Accessibility controls">
              <button
                type="button"
                className="a11y-btn"
                onClick={() => setFontSize("normal")}
                title="Standard Text Size"
              >
                A-
              </button>
              <button
                type="button"
                className="a11y-btn"
                onClick={() => setFontSize("large")}
                title="Medium Text Size"
              >
                A
              </button>
              <button
                type="button"
                className="a11y-btn font-bold"
                onClick={() => setFontSize("xl")}
                title="Large Text Size"
              >
                A+
              </button>
              <button
                type="button"
                className={`contrast-btn ${highContrast ? "active" : ""}`}
                onClick={toggleContrast}
                title="Toggle High Contrast Mode"
              >
                {highContrast ? "Standard" : "Contrast"}
              </button>
            </div>

            <span className="utility-divider" aria-hidden="true">|</span>
            <Link href="/search" className="utility-link guidance-link">
              <span>🔍</span> Public Disclosures
            </Link>
            <span className="utility-divider" aria-hidden="true">|</span>
            <Link href="/officer" className="utility-link" style={{ color: "#fde68a", fontWeight: 700 }}>
              <span>🛡️</span> Officer Portal
            </Link>
            <span className="utility-divider" aria-hidden="true">|</span>
            <span lang="hi" className="lang-indicator">हिन्दी</span>
          </div>
        </div>
      </div>

      {/* Official National Tricolor Accent Ribbon */}
      <div className="tricolor-ribbon" aria-hidden="true" />

      {/* Streamlined Main Header Brand Bar */}
      <header className="wrap header">
        <Link className="brand" href="/" aria-label="RTI Online Home - Government of India">
          <div className="brand-emblem-seal">
            <span className="emblem-icon">🏛️</span>
            <span className="emblem-sub">सत्यमेव जयते</span>
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <strong>RTI Online</strong>
              <span className="gov-tag">CENTRAL PORTAL</span>
            </div>
            <small>Right to Information Services · Government of India</small>
          </div>
        </Link>

        {/* Streamlined User Session & Quick Action */}
        <div className="header-right-actions">
          {user ? (
            <div className="logged-user-pill">
              <div className="user-avatar-circle">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-meta">
                <span className="user-name">{user.name}</span>
                <span className="user-badge-verified">Verified Citizen</span>
              </div>
              <Link href="/dashboard" className="btn-dashboard-link">
                Dashboard <span>→</span>
              </Link>
              <button type="button" onClick={logout} className="btn-logout" title="Sign out">
                Sign out
              </button>
            </div>
          ) : (
            <div className="guest-auth-actions">
              <Link href="/login" className="btn-portal-login">
                <span>👤</span> Citizen Sign In / OTP
              </Link>
              <Link href="/request/eligibility" className="btn-guest-action">
                + File RTI <span>→</span>
              </Link>
            </div>
          )}

          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Clean, Modern Navigation Bar */}
      <nav className={`portal-nav-bar ${mobileMenuOpen ? "mobile-open" : ""}`} aria-label="Primary navigation">
        <div className="wrap portal-nav-inner">
          {primaryNavigation.map((item) => {
            if (item.children) {
              const isChildActive = item.children.some((c) => pathname.startsWith(c.href));
              return (
                <div
                  key={item.label}
                  className="nav-dropdown-wrapper"
                  ref={dropdownRef}
                  onMouseEnter={() => setHelpDropdownOpen(true)}
                  onMouseLeave={() => setHelpDropdownOpen(false)}
                >
                  <button
                    type="button"
                    className={`nav-item nav-dropdown-trigger ${isChildActive ? "active" : ""}`}
                    onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                    aria-expanded={helpDropdownOpen}
                  >
                    <span>{item.label}</span>
                    <span className="dropdown-arrow">{helpDropdownOpen ? "▲" : "▼"}</span>
                  </button>

                  {helpDropdownOpen && (
                    <div className="nav-dropdown-menu">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`dropdown-menu-item ${pathname === child.href ? "active-item" : ""}`}
                          onClick={() => {
                            setHelpDropdownOpen(false);
                            setMobileMenuOpen(false);
                          }}
                        >
                          <strong>{child.label}</strong>
                          {child.desc && <small>{child.desc}</small>}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                className={`nav-item ${isActive ? "active" : ""}`}
                href={item.href}
                key={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{item.label}</span>
                {item.badge && <span className="nav-badge-new">{item.badge}</span>}
              </Link>
            );
          })}

          {user && (
            <Link
              className={`nav-item nav-item-highlight ${pathname === "/dashboard" ? "active" : ""}`}
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>📊 Citizen Dashboard</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}

export function PortalFooter() {
  return (
    <footer className="portal-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand-col">
          <div className="brand footer-brand">
            <span className="emblem-icon">🏛️</span>
            <div>
              <strong>RTI Online</strong>
              <small>Department of Personnel & Training (DoPT), Government of India</small>
            </div>
          </div>
          <p className="footer-desc">
            Designed to fulfill Section 4 and Section 6 of the Right to Information Act, 2005. Facilitates electronic submission of RTI requests, first appeals, and payment settlement for Central Public Authorities.
          </p>
        </div>

        <div className="footer-services-col">
          <strong>Key Citizen Services</strong>
          <ul className="footer-list">
            <li><Link href="/request/eligibility">File RTI Request (Guest or Login)</Link></li>
            <li><Link href="/appeal">File First Appeal (Zero Fee)</Link></li>
            <li><Link href="/status">Track Application Status & Countdown</Link></li>
            <li><Link href="/authorities">Central Public Authorities Directory</Link></li>
            <li><Link href="/reconciliation">Payment Reconciliation Tool</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <strong>Guidelines & Legal</strong>
          <ul className="footer-list">
            {footerNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="wrap copyright">
        <div className="copyright-sub">
          Content Owned, Maintained and Updated by Department of Personnel & Training, Ministry of Personnel, Public Grievances & Pensions, Government of India.
        </div>
        <div>
          <span>National Informatics Centre (NIC) Platform</span>
        </div>
      </div>
    </footer>
  );
}

export function PortalPage({ children }: { children: ReactNode }) {
  return (
    <div className="site-wrapper">
      <PortalHeader />
      <main id="main-content">{children}</main>
      <PortalFooter />
    </div>
  );
}
