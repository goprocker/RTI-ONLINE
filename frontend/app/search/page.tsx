"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";

interface DisclosureRecord {
  id: string;
  title: string;
  ministry: string;
  department: string;
  categoryLabel: string;
  summary: string;
  keywords: string[];
}

const sampleDisclosures: DisclosureRecord[] = [
  {
    id: "disc-1",
    title: "Citizen Charter: Standard Operating Procedure for Tatkaal Passport Processing",
    ministry: "Ministry of External Affairs",
    department: "Consular, Passport & Visa (CPV) Division",
    categoryLabel: "Citizen Charter",
    summary: "Defines maximum dispatch timelines (7 working days for Tatkaal, 21 days for Normal), police verification dispatch protocols, and regional grievance officer contacts.",
    keywords: ["passport", "tatkaal", "delay", "police verification", "mea", "rpo"]
  },
  {
    id: "disc-2",
    title: "EPFO Guidelines: Time-bound Settlement of Online EPF Claims (Form 19, 10C, 31)",
    ministry: "Ministry of Labour and Employment",
    department: "Employees' Provident Fund Organisation (EPFO)",
    categoryLabel: "Proactive Disclosure",
    summary: "Mandates maximum 20-day statutory settlement window, detailed checklist for rejection reasons, and auto-settlement rules for claims under ₹1,00,000.",
    keywords: ["epfo", "pf", "claim", "form 19", "form 31", "provident fund", "pension"]
  },
  {
    id: "disc-3",
    title: "CBSE Policy on Furnishing Evaluated Answer Scripts to Candidates (Board Exams)",
    ministry: "Ministry of Education",
    department: "Central Board of Secondary Education (CBSE)",
    categoryLabel: "Official Policy",
    summary: "Official SOP allowing candidates to obtain photocopy of evaluated answer book with fee schedule and examiner verification procedure pursuant to Supreme Court directives.",
    keywords: ["cbse", "answer script", "re-evaluation", "marksheet", "10th", "12th", "board exam"]
  },
  {
    id: "disc-4",
    title: "Indian Railways: Refund Rules and Cancellation Charges for e-Tickets",
    ministry: "Ministry of Railways",
    department: "Railway Board",
    categoryLabel: "Public Tariff",
    summary: "Comprehensive table of clerkage charges, auto-refund timeframes for cancelled trains, and TDR filing guidelines.",
    keywords: ["railway", "train", "refund", "tdr", "cancellation", "irctc", "ticket"]
  }
];

export default function SearchDisclosuresPage() {
  const [query, setQuery] = useState("");

  const filtered = sampleDisclosures.filter((item) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.ministry.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.includes(q))
    );
  });

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "36px 0 72px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Search existing public information</span>
        </div>

        <div style={{ maxWidth: "760px", marginBottom: "28px" }}>
          <h1 style={{ font: "700 2.1rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
            Search existing public information
          </h1>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.95rem", lineHeight: "1.6", margin: "0 0 12px" }}>
            Under Section 4(1)(b) of the RTI Act, Central Public Authorities proactively publish rules, citizen charters, and circulars. You may be able to find your answer without filing an RTI or paying a fee.
          </p>

          <div style={{ background: "var(--neutral-100)", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", padding: "8px 12px", fontSize: "0.78rem", color: "var(--neutral-600)" }}>
            <strong>Note:</strong> Sample records shown for prototype demonstration.
          </div>
        </div>

        {/* Search Box */}
        <div style={{ maxWidth: "680px", marginBottom: "28px", display: "flex", gap: "10px" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search citizen charters, circulars (e.g. passport rules, EPF claim, CBSE)..."
            style={{ flex: 1, padding: "10px 14px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.92rem" }}
          />
        </div>

        {/* Results List */}
        <div style={{ display: "grid", gap: "14px", maxWidth: "760px" }}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", padding: "20px", boxShadow: "var(--shadow-sm)" }}
            >
              <span style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--gov-blue-600)", textTransform: "uppercase" }}>
                {item.categoryLabel}
              </span>
              <h3 style={{ font: "700 1.15rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "4px 0 2px" }}>
                {item.title}
              </h3>
              <div style={{ fontSize: "0.82rem", color: "var(--neutral-500)", marginBottom: "8px" }}>
                {item.department} · {item.ministry}
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--neutral-700)", margin: "0 0 14px", lineHeight: "1.5" }}>
                {item.summary}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid var(--neutral-100)", flexWrap: "wrap", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => alert(`Opening sample public document: ${item.title}`)}
                  style={{ padding: "6px 12px", background: "var(--neutral-100)", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer" }}
                >
                  View document ↗
                </button>
                <Link
                  href={`/request/new?query=${encodeURIComponent(item.title)}`}
                  style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gov-blue-600)", textDecoration: "none" }}
                >
                  Still need information? File an RTI →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </PortalPage>
  );
}
