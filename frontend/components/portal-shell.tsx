"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation, footerNavigation, prototypeNotice } from "../content/site";
import { useAuth } from "../lib/auth-context";

export function PortalPage({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();
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
      {/* 01 — PROTOTYPE IDENTIFIER & UTILITY BAR (GIGW 3.0 Standard) */}
      <header className="top-utility-bar" role="region" aria-label="Prototype notice and accessibility">
        <div className="wrap utility-inner">
          <div className="gov-identity-strip">
            <span className="prototype-pill">PROTOTYPE CONCEPT</span>
            <span className="prototype-text">
              An independent citizen-first redesign prototype · Not affiliated with the Government of India
            </span>
          </div>

          <div className="utility-actions">
            <Link href="/manual" className="utility-link">
              How it works
            </Link>
            <span className="utility-divider" aria-hidden="true">|</span>
            <Link href="/accessibility" className="utility-link">
              Accessibility
            </Link>
            <span className="utility-divider" aria-hidden="true">|</span>
            <Link href="/officer" className="utility-link officer-utility-link">
              For Officers →
            </Link>
            <span className="utility-divider" aria-hidden="true">|</span>
            <span lang="hi" className="lang-indicator">हिन्दी</span>
          </div>
        </div>
      </header>

      {/* 02 — NATIONAL TRICOLOR ACCENT RIBBON */}
      <div className="tricolor-ribbon" role="presentation" />

      {/* 03 — MAIN BRAND HEADER */}
      <div className="header" role="banner">
        <div className="wrap header-inner">
          {/* Brand Seal & Title */}
          <Link href="/" className="brand" aria-label="RTI Online Concept Home">
            <div className="emblem-container" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="19" fill="#0f2942" stroke="#d97706" strokeWidth="1.5" />
                <path d="M20 7L23.5 14H16.5L20 7Z" fill="#f59e0b" />
                <rect x="13" y="16" width="14" height="2" fill="#ffffff" />
                <rect x="15" y="20" width="10" height="9" fill="#e2e8f0" />
                <rect x="12" y="30" width="16" height="3" rx="1" fill="#f59e0b" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-title">RTI Online</span>
              <span className="brand-sub">Concept Redesign · Right to Information</span>
            </div>
          </Link>

          {/* Right Citizen Action Area */}
          <div className="header-actions">
            {user ? (
              <Link href="/dashboard" className="user-profile-badge">
                <span className="user-icon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </span>
                <span className="user-name">{user.name}</span>
              </Link>
            ) : (
              <Link href="/login" className="btn-signin-link">
                Sign in
              </Link>
            )}

            <Link href="/request/eligibility" className="btn-file-primary">
              File an RTI
            </Link>
          </div>
        </div>
      </div>

      {/* 04 — MAIN NAVIGATION BAR */}
      <nav className="nav" aria-label="Primary navigation">
        <div className="wrap nav-inner">
          <ul className="nav-list" role="menubar">
            <li role="none">
              <Link
                href="/"
                role="menuitem"
                className={`nav-link ${pathname === "/" ? "active" : ""}`}
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>

            {primaryNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href);

              if (item.children) {
                return (
                  <li
                    key={item.href}
                    role="none"
                    className="nav-dropdown-wrapper"
                    ref={dropdownRef}
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <button
                      type="button"
                      role="menuitem"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className={`nav-link nav-dropdown-btn ${isActive ? "active" : ""}`}
                    >
                      {item.label}
                      <span className="dropdown-caret" aria-hidden="true">▾</span>
                    </button>

                    {dropdownOpen && (
                      <div className="nav-dropdown-menu" role="menu">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            role="menuitem"
                            onClick={() => setDropdownOpen(false)}
                            className="dropdown-menu-item"
                          >
                            <span className="dropdown-item-title">{child.label}</span>
                            {child.desc && <span className="dropdown-item-desc">{child.desc}</span>}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.href} role="none">
                  <Link
                    href={item.href}
                    role="menuitem"
                    className={`nav-link ${isActive ? "active" : ""}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 05 — PAGE BODY */}
      <div className="portal-content" id="main-content">
        {children}
      </div>

      {/* 06 — PROTOTYPE FOOTER */}
      <footer className="footer" role="contentinfo">
        <div className="wrap">
          <div className="footer-top">
            <div className="footer-brand-col">
              <h3 className="footer-brand-title">RTI Online</h3>
              <p className="footer-brand-desc">
                An independent concept demonstrating a citizen-first redesign of India&apos;s Right to Information portal. Designed to make public information accessible, transparent, and simple for every citizen.
              </p>
              <div className="prototype-disclaimer-box">
                <strong>Disclaimer:</strong> {prototypeNotice}
              </div>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Citizen Services</h4>
              <ul className="footer-links-list">
                <li><Link href="/request/eligibility">File an RTI</Link></li>
                <li><Link href="/status">Track an application</Link></li>
                <li><Link href="/appeal">File a First Appeal</Link></li>
                <li><Link href="/authorities">Find a public authority</Link></li>
                <li><Link href="/offline">Prepare offline application</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Help & Guidance</h4>
              <ul className="footer-links-list">
                <li><Link href="/manual">How RTI works</Link></li>
                <li><Link href="/faq">Frequently asked questions</Link></li>
                <li><Link href="/search">Search public disclosures</Link></li>
                <li><Link href="/reconciliation">Payment issue</Link></li>
                <li><Link href="/officer">For Public Information Officers →</Link></li>
              </ul>
            </div>

            <div className="footer-links-col">
              <h4 className="footer-col-title">Accessibility & Standards</h4>
              <ul className="footer-links-list">
                <li><Link href="/accessibility">Accessibility Statement (GIGW 3.0)</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/contact">Feedback & Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div>
              © 2026 RTI Online Concept Prototype. All rights reserved.
            </div>
            <div className="footer-sub-links">
              <span>GIGW 3.0 / WCAG 2.1 AAA Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
