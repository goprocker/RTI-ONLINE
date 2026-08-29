"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";

interface DisclosureRecord {
  id: string;
  title: string;
  ministry: string;
  department: string;
  category: "CITIZEN_CHARTER" | "CIRCULAR" | "BUDGET" | "SOP" | "PREVIOUS_RTI";
  categoryLabel: string;
  datePublished: string;
  summary: string;
  docUrl: string;
  keywords: string[];
}

const sampleDisclosures: DisclosureRecord[] = [
  {
    id: "disc-1",
    title: "Citizen Charter: Standard Operating Procedure for Tatkaal Passport Processing & Delay Escalation",
    ministry: "Ministry of External Affairs",
    department: "Consular, Passport & Visa (CPV) Division",
    category: "CITIZEN_CHARTER",
    categoryLabel: "Section 4(1)(b) Citizen Charter",
    datePublished: "15 January 2026",
    summary: "Defines maximum dispatch timelines (7 working days for Tatkaal, 21 days for Normal), police verification dispatch protocols, and regional grievance officer contacts.",
    docUrl: "MEA_Tatkaal_Passport_Charter_2026.pdf",
    keywords: ["passport", "tatkaal", "delay", "police verification", "mea", "rpo"]
  },
  {
    id: "disc-2",
    title: "EPFO Guidelines: Time-bound Settlement of Online EPF Claims (Form 19, 10C, 31) & Rejection Norms",
    ministry: "Ministry of Labour and Employment",
    department: "Employees' Provident Fund Organisation (EPFO)",
    category: "SOP",
    categoryLabel: "Proactive Disclosure SOP",
    datePublished: "02 February 2026",
    summary: "Mandates maximum 20-day statutory settlement window, detailed checklist for rejection reasons, and auto-settlement rules for claims under ₹1,00,000.",
    docUrl: "EPFO_Claim_Settlement_Guidelines_2026.pdf",
    keywords: ["epfo", "pf", "claim", "form 19", "form 31", "provident fund", "pension"]
  },
  {
    id: "disc-3",
    title: "CBSE Policy on Furnishing Evaluated Answer Scripts to Candidates (Class X & XII Board Exams)",
    ministry: "Ministry of Education",
    department: "Central Board of Secondary Education (CBSE)",
    category: "CIRCULAR",
    categoryLabel: "Official Circular",
    datePublished: "10 April 2026",
    summary: "Official SOP allowing candidates to obtain photocopy of evaluated answer book with fee schedule and examiner verification procedure pursuant to Supreme Court directives.",
    docUrl: "CBSE_Answer_Script_Disclosure_Policy.pdf",
    keywords: ["cbse", "answer script", "re-evaluation", "marksheet", "10th", "12th", "board exam"]
  },
  {
    id: "disc-4",
    title: "Indian Railways: Refund Rules and Cancellation Charges for Waitlisted and Confirmed e-Tickets",
    ministry: "Ministry of Railways",
    department: "Railway Board",
    category: "CIRCULAR",
    categoryLabel: "Public Tariff Circular",
    datePublished: "01 March 2026",
    summary: "Comprehensive table of clerkage charges, auto-refund timeframes for cancelled trains, and TDR filing guidelines.",
    docUrl: "Railways_Ticket_Refund_Rules_2026.pdf",
    keywords: ["railway", "train", "refund", "tdr", "cancellation", "irctc", "ticket"]
  },
  {
    id: "disc-5",
    title: "Border Area Development Programme (BADP): State-wise Annual Fund Allocation & Completion Reports (2024-25)",
    ministry: "Ministry of Home Affairs",
    department: "Border Management Division",
    category: "BUDGET",
    categoryLabel: "Budget & Expenditure Log",
    datePublished: "20 May 2026",
    summary: "State-by-state financial releases, sanctioned rural road connectivity projects, and physical milestone verification logs.",
    docUrl: "MHA_BADP_Annual_Allocations_2024_25.pdf",
    keywords: ["badp", "border", "mha", "fund", "allocation", "rural road", "connectivity"]
  }
];

export default function PublicSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const filteredDisclosures = sampleDisclosures.filter((item) => {
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.ministry.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q));

    return matchesCategory && matchesQuery;
  });

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Public Information Search (Section 4 Disclosures)</span>
        </div>

        {/* Hero Banner */}
        <div style={{ background: "linear-gradient(135deg, var(--gov-navy-950) 0%, var(--gov-navy-850) 100%)", color: "#ffffff", borderRadius: "var(--radius-xl)", padding: "36px 40px", marginBottom: "36px", boxShadow: "var(--shadow-xl)" }}>
          <p className="eyebrow" style={{ color: "#fed7aa", marginBottom: "6px" }}>
            <span className="eyebrow-line" style={{ background: "#fed7aa" }} />
            SECTION 4(1)(B) · PROACTIVE PUBLIC DISCLOSURES
          </p>
          <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "#ffffff", margin: "0 0 10px" }}>
            Search Public Information Before Filing
          </h1>
          <p style={{ color: "#cbd5e1", fontSize: "0.98rem", maxWidth: "720px", lineHeight: "1.6", margin: "0 0 24px" }}>
            Under Section 4 of the RTI Act, Central Public Authorities proactively publish rules, citizen charters, fund allocations, and previous orders. <strong>If your information is already published, you get instant access without paying ₹10 or waiting 30 days.</strong>
          </p>

          {/* Search Box */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", maxWidth: "700px" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search citizen charters, circulars, previous RTI records (e.g. passport delay, EPF claim, CBSE)..."
              style={{ flex: "1 1 360px", padding: "14px 18px", border: "0", borderRadius: "var(--radius-md)", fontSize: "0.95rem", color: "var(--gov-navy-950)" }}
            />
            <button
              type="button"
              className="btn-primary-action"
              style={{ background: "var(--saffron-500)", borderColor: "var(--saffron-600)", padding: "12px 24px" }}
            >
              Search Records 🔍
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "28px", alignItems: "center" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--neutral-600)" }}>Filter by Category:</span>
          {[
            { id: "ALL", label: "All Records" },
            { id: "CITIZEN_CHARTER", label: "Citizen Charters" },
            { id: "SOP", label: "Standard Operating Procedures (SOP)" },
            { id: "CIRCULAR", label: "Official Circulars" },
            { id: "BUDGET", label: "Budget & Expenditure" },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                background: selectedCategory === cat.id ? "var(--gov-navy-950)" : "#ffffff",
                color: selectedCategory === cat.id ? "#ffffff" : "var(--neutral-700)",
                border: selectedCategory === cat.id ? "1.5px solid var(--gov-navy-950)" : "1.5px solid var(--neutral-300)",
                borderRadius: "var(--radius-full)",
                padding: "6px 14px",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s"
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Results */}
        <div style={{ display: "grid", gap: "20px" }}>
          {filteredDisclosures.map((record) => (
            <div
              key={record.id}
              style={{
                background: "#ffffff",
                border: "1.5px solid var(--neutral-200)",
                borderRadius: "var(--radius-xl)",
                padding: "26px 30px",
                boxShadow: "var(--shadow-sm)",
                transition: "transform 0.18s, box-shadow 0.18s"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "8px" }}>
                <div>
                  <span style={{ background: "var(--gov-blue-100)", color: "var(--gov-blue-600)", fontSize: "0.7rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-sm)", textTransform: "uppercase" }}>
                    {record.categoryLabel}
                  </span>
                  <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "6px 0 2px" }}>
                    {record.title}
                  </h3>
                  <div style={{ fontSize: "0.82rem", color: "var(--neutral-600)", fontWeight: 600 }}>
                    {record.department} · {record.ministry}
                  </div>
                </div>

                <span style={{ fontSize: "0.78rem", color: "var(--neutral-400)" }}>
                  Published: {record.datePublished}
                </span>
              </div>

              <p style={{ color: "var(--neutral-700)", fontSize: "0.88rem", lineHeight: "1.6", margin: "0 0 18px" }}>
                {record.summary}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "14px", borderTop: "1px solid var(--neutral-100)", flexWrap: "wrap", gap: "10px" }}>
                <button
                  type="button"
                  className="btn-secondary-action"
                  onClick={() => alert(`Opening public proactive disclosure: ${record.docUrl} (PDF)...`)}
                  style={{ padding: "8px 16px", fontSize: "0.84rem" }}
                >
                  📄 View Official Document (Instant Free Access)
                </button>

                <Link
                  href={`/request/new?query=${encodeURIComponent(record.title)}`}
                  style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--gov-blue-600)", textDecoration: "none" }}
                >
                  Information not sufficient? File Custom RTI Request →
                </Link>
              </div>
            </div>
          ))}

          {filteredDisclosures.length === 0 && (
            <div style={{ background: "#ffffff", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "48px 30px", textAlign: "center" }}>
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>🔍</div>
              <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                No published record matched &ldquo;{searchQuery}&rdquo;
              </h3>
              <p style={{ color: "var(--neutral-600)", fontSize: "0.9rem", maxWidth: "500px", margin: "0 auto 20px" }}>
                The specific information you are looking for may not be proactively published. You can submit a new formal RTI request directly to the concerned Public Authority.
              </p>
              <Link
                href={`/request/new?query=${encodeURIComponent(searchQuery)}`}
                className="btn-primary-action"
              >
                + File RTI Request for this Information →
              </Link>
            </div>
          )}
        </div>
      </main>
    </PortalPage>
  );
}
