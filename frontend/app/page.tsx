"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../components/portal-shell";
import { findMatchingAuthorities, SearchMatchResult } from "../lib/authorities-data";
import { RtiFlowchart } from "../components/rti-flowchart";
import { 
  FileText, 
  Search, 
  Scale, 
  Building2, 
  ShieldAlert,
  BookOpen
} from "lucide-react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [matchedAuthority, setMatchedAuthority] = useState<SearchMatchResult | null>(null);

  function handleSearch(val: string) {
    setSearchQuery(val);
    if (val.trim().length > 1) {
      const results = findMatchingAuthorities(val);
      setMatchedAuthority(results.length > 0 ? results[0] : null);
    } else {
      setMatchedAuthority(null);
    }
  }

  return (
    <PortalPage>
      {/* 01 — AUTHENTIC SOVEREIGN HERO BANNER WITH GANDHI EMBLEM & TALISMAN */}
      <section style={{ background: "linear-gradient(135deg, #071626 0%, #0f2942 60%, #1e3a8a 100%)", color: "#ffffff", padding: "26px 0 22px", borderBottom: "3px solid #d97706" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "24px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "rgba(245, 158, 11, 0.15)", border: "1px solid #f59e0b", padding: "2px 8px", borderRadius: "16px", fontSize: "0.72rem", fontWeight: 700, color: "#fef3c7", marginBottom: "10px" }}>
                <span>🇮🇳</span>
                <span>Government of India · RTI Act, 2005</span>
              </div>
              <h1 style={{ font: "800 2.05rem var(--font-serif)", color: "#ffffff", margin: "0 0 8px", lineHeight: 1.2 }}>
                Right to Information Online Portal
              </h1>
              <p style={{ fontSize: "0.88rem", color: "#cbd5e1", lineHeight: 1.5, margin: "0 0 16px", maxWidth: "580px" }}>
                Single-window platform for Indian citizens to file RTI applications, track disposal timelines, and submit First Appeals online to Central Ministries and Public Authorities.
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                <Link 
                  href="/request/eligibility" 
                  style={{ background: "#f59e0b", color: "#071626", border: 0, padding: "8px 18px", borderRadius: "6px", fontSize: "0.86rem", fontWeight: 800, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
                >
                  <FileText size={15} />
                  + Submit RTI Request
                </Link>
                <Link 
                  href="/status" 
                  style={{ background: "rgba(255, 255, 255, 0.1)", color: "#ffffff", border: "1px solid rgba(255, 255, 255, 0.25)", padding: "8px 16px", borderRadius: "6px", fontSize: "0.84rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px" }}
                >
                  <Search size={14} />
                  Track Application Status →
                </Link>
              </div>
            </div>

            {/* Commemorative Gandhi Emblem Card */}
            <div style={{ background: "rgba(255, 255, 255, 0.06)", border: "1px solid rgba(255, 255, 255, 0.15)", borderRadius: "10px", padding: "14px 18px", display: "flex", alignItems: "center", gap: "14px" }}>
              <div style={{ width: "80px", height: "80px", flexShrink: 0, position: "relative" }}>
                <img 
                  src="/images/gandhi-emblem.jpg" 
                  alt="Mahatma Gandhi Commemorative Seal" 
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", border: "2px solid #f59e0b", boxShadow: "0 4px 8px rgba(0,0,0,0.3)" }}
                />
              </div>
              <div>
                <blockquote style={{ margin: "0 0 4px", fontSize: "0.76rem", fontStyle: "italic", color: "#e2e8f0", lineHeight: 1.45 }}>
                  &ldquo;Recall the face of the poorest and the weakest person... and ask yourself if the step you contemplate is going to be of any use to him.&rdquo;
                </blockquote>
                <div style={{ fontSize: "0.72rem", fontWeight: 800, color: "#f59e0b" }}>
                  — Mahatma Gandhi
                </div>
                <div style={{ fontSize: "0.66rem", color: "#94a3b8" }}>
                  Father of the Nation · Transparency & Citizen Empowerment
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — COMPACT AUTHORITY FINDER SEARCH BAR */}
      <section style={{ padding: "16px 0", background: "#ffffff", borderBottom: "1px solid #e2e8f0" }}>
        <div className="wrap">
          <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "12px 18px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px", flexWrap: "wrap", gap: "6px" }}>
              <div>
                <strong style={{ fontSize: "0.9rem", color: "#071626" }}>
                  Find the Concerned Public Authority:
                </strong>
                <span style={{ fontSize: "0.78rem", color: "#64748b", marginLeft: "6px" }}>
                  Search by keywords (e.g. Passport dispatch, EPFO pension claim, CBSE copy verification...)
                </span>
              </div>
              <Link href="/authorities" style={{ fontSize: "0.78rem", fontWeight: 700, color: "#0f2942", textDecoration: "none" }}>
                Browse All Authorities Directory →
              </Link>
            </div>

            <div style={{ display: "flex", gap: "8px" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Type keywords (e.g. Passport, Income Tax, EPFO, Railway, UGC, AIIMS...)"
                style={{ flex: 1, padding: "7px 12px", border: "1.5px solid #cbd5e1", borderRadius: "6px", fontSize: "0.86rem" }}
              />
              <Link
                href={
                  matchedAuthority
                    ? `/request/new?authority=${encodeURIComponent(matchedAuthority.authority.id)}`
                    : `/authorities?q=${encodeURIComponent(searchQuery)}`
                }
                style={{ background: "#0f2942", color: "#ffffff", border: 0, padding: "7px 16px", borderRadius: "6px", fontSize: "0.82rem", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}
              >
                <Search size={14} />
                Search
              </Link>
            </div>

            {matchedAuthority && (
              <div style={{ marginTop: "10px", background: "#ffffff", border: "1px solid #93c5fd", borderRadius: "6px", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px" }}>
                <div>
                  <span style={{ background: "#e0f2fe", color: "#0369a1", fontSize: "0.68rem", fontWeight: 800, padding: "1px 6px", borderRadius: "4px" }}>
                    MATCHED PUBLIC AUTHORITY
                  </span>
                  <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#071626", marginTop: "2px" }}>
                    {matchedAuthority.authority.name}
                  </div>
                  <div style={{ fontSize: "0.76rem", color: "#64748b" }}>
                    {matchedAuthority.authority.ministry} · {matchedAuthority.authority.nodalOfficerDesc}
                  </div>
                </div>
                <Link
                  href={`/request/new?authority=${encodeURIComponent(matchedAuthority.authority.id)}`}
                  style={{ background: "#0f2942", color: "#ffffff", padding: "5px 12px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 700, textDecoration: "none" }}
                >
                  File with this Authority →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 03 — SLEEK HORIZONTAL LINEAR TIMELINE (1 ── 2 ── 3 ── 4) */}
      <section style={{ padding: "18px 0 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
        <div className="wrap">
          <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "16px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <strong style={{ fontSize: "0.88rem", color: "#071626" }}>
                4-Step RTI Application & Disposal Process
              </strong>
              <span style={{ fontSize: "0.74rem", color: "#64748b" }}>
                Standard 30-Day Disposal Pipeline under RTI Act 2005
              </span>
            </div>

            {/* Connected Horizontal Flow Pipeline */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr auto 1fr", gap: "8px", alignItems: "center" }}>
              
              {/* Step 1 */}
              <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <span style={{ background: "#0f2942", color: "#ffffff", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800 }}>1</span>
                  <strong style={{ fontSize: "0.8rem", color: "#071626" }}>Submit Request</strong>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Section 6(1) · ₹10 Fee</div>
              </div>

              <div style={{ color: "#94a3b8" }}>➔</div>

              {/* Step 2 */}
              <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <span style={{ background: "#0f2942", color: "#ffffff", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800 }}>2</span>
                  <strong style={{ fontSize: "0.8rem", color: "#071626" }}>Nodal Assignment</strong>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#64748b" }}>Nodal / 5-day Sec 6(3) Transfer</div>
              </div>

              <div style={{ color: "#94a3b8" }}>➔</div>

              {/* Step 3 */}
              <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <span style={{ background: "#0f2942", color: "#ffffff", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800 }}>3</span>
                  <strong style={{ fontSize: "0.8rem", color: "#071626" }}>CPIO Retrieval</strong>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#64748b" }}>CPIO Retrieval / Record Notice</div>
              </div>

              <div style={{ color: "#94a3b8" }}>➔</div>

              {/* Step 4 */}
              <div style={{ background: "#f8fafc", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "10px 12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "2px" }}>
                  <span style={{ background: "#16a34a", color: "#ffffff", borderRadius: "50%", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.68rem", fontWeight: 800 }}>4</span>
                  <strong style={{ fontSize: "0.8rem", color: "#071626" }}>Statutory Disposal</strong>
                </div>
                <div style={{ fontSize: "0.72rem", color: "#64748b" }}>30-Day Order / ₹0 First Appeal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — DETAILED STATUTORY FLOWCHART CARD (COMPACT VIEWER + FULLSCREEN LIGHTBOX) */}
      <section style={{ padding: "20px 0 24px", background: "#ffffff" }}>
        <div className="wrap">
          <RtiFlowchart />
        </div>
      </section>

      {/* 05 — ONLINE CITIZEN SERVICES CARDS */}
      <section style={{ padding: "20px 0 32px", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }}>
            
            {/* 1. Request */}
            <Link 
              href="/request/eligibility" 
              style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "14px", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#d97706", fontWeight: 800, fontSize: "0.72rem", marginBottom: "4px" }}>
                  <FileText size={13} />
                  <span>SECTION 6(1)</span>
                </div>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#071626", margin: "0 0 3px" }}>
                  Submit RTI Request
                </h3>
                <p style={{ fontSize: "0.76rem", color: "#64748b", lineHeight: 1.4, margin: 0 }}>
                  Request certified copies of files, circulars, or evaluation books.
                </p>
              </div>
              <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#0f2942", marginTop: "10px" }}>
                Submit Request →
              </span>
            </Link>

            {/* 2. Grievance */}
            <a 
              href="https://pgportal.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "14px", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#dc2626", fontWeight: 800, fontSize: "0.72rem", marginBottom: "4px" }}>
                  <ShieldAlert size={13} />
                  <span>CPGRAMS PORTAL</span>
                </div>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#071626", margin: "0 0 3px" }}>
                  Lodge Grievance
                </h3>
                <p style={{ fontSize: "0.76rem", color: "#64748b", lineHeight: 1.4, margin: 0 }}>
                  For personal service complaints, lodge on the national grievance portal.
                </p>
              </div>
              <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#dc2626", marginTop: "10px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                Go to CPGRAMS ↗
              </span>
            </a>

            {/* 3. First Appeal */}
            <Link 
              href="/appeal" 
              style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "14px", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#0284c7", fontWeight: 800, fontSize: "0.72rem", marginBottom: "4px" }}>
                  <Scale size={13} />
                  <span>SECTION 19(1)</span>
                </div>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#071626", margin: "0 0 3px" }}>
                  Submit First Appeal
                </h3>
                <p style={{ fontSize: "0.76rem", color: "#64748b", lineHeight: 1.4, margin: 0 }}>
                  If response was delayed beyond 30 days or incomplete, appeal at ₹0 fee.
                </p>
              </div>
              <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#0f2942", marginTop: "10px" }}>
                Submit First Appeal →
              </span>
            </Link>

            {/* 4. Proactive Disclosures */}
            <Link 
              href="/search" 
              style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "8px", padding: "14px", textDecoration: "none", color: "inherit", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#16a34a", fontWeight: 800, fontSize: "0.72rem", marginBottom: "4px" }}>
                  <BookOpen size={13} />
                  <span>SECTION 4(1)(b)</span>
                </div>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "#071626", margin: "0 0 3px" }}>
                  Public Disclosures
                </h3>
                <p style={{ fontSize: "0.76rem", color: "#64748b", lineHeight: 1.4, margin: 0 }}>
                  Search proactive government circulars, annual reports, and charters.
                </p>
              </div>
              <span style={{ fontSize: "0.76rem", fontWeight: 800, color: "#0f2942", marginTop: "10px" }}>
                Search Disclosures →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </PortalPage>
  );
}
