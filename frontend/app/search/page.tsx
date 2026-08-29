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
  docUrl: string;
  keywords: string[];
}

const sampleDisclosures: DisclosureRecord[] = [
  {
    id: "disc-1",
    title: "Citizen Charter: Standard Operating Procedure for Tatkaal Passport Processing",
    ministry: "Ministry of External Affairs",
    department: "Consular, Passport & Visa (CPV) Division",
    categoryLabel: "Citizen Charter",
    summary: "Defines maximum dispatch timelines (7 working days for Tatkaal, 21 days for Normal), police verification protocols, and regional grievance officer contacts.",
    docUrl: "MEA_Tatkaal_Passport_Charter.pdf",
    keywords: ["passport", "tatkaal", "delay", "police verification", "mea", "rpo"]
  },
  {
    id: "disc-2",
    title: "EPFO Guidelines: Time-bound Settlement of Online EPF Claims (Form 19, 10C, 31)",
    ministry: "Ministry of Labour and Employment",
    department: "Employees' Provident Fund Organisation (EPFO)",
    categoryLabel: "Standard Operating Procedure",
    summary: "Mandates 20-day statutory settlement window, checklist for rejection reasons, and auto-settlement rules for eligible claims.",
    docUrl: "EPFO_Claim_Settlement_Guidelines.pdf",
    keywords: ["epfo", "pf", "claim", "form 19", "form 31", "provident fund", "pension"]
  },
  {
    id: "disc-3",
    title: "CBSE Policy on Furnishing Evaluated Answer Scripts to Candidates",
    ministry: "Ministry of Education",
    department: "Central Board of Secondary Education (CBSE)",
    categoryLabel: "Official Circular",
    summary: "Official procedure allowing board examination candidates to obtain photocopies of evaluated answer books with prescribed fee schedule.",
    docUrl: "CBSE_Answer_Script_Policy.pdf",
    keywords: ["cbse", "answer script", "re-evaluation", "marksheet", "10th", "12th", "board exam"]
  },
  {
    id: "disc-4",
    title: "Indian Railways: Refund Rules and Cancellation Charges for e-Tickets",
    ministry: "Ministry of Railways",
    department: "Railway Board",
    categoryLabel: "Tariff Rules",
    summary: "Table of clerkage charges, auto-refund timeframes for cancelled trains, and TDR filing guidelines.",
    docUrl: "Railways_Ticket_Refund_Rules.pdf",
    keywords: ["railway", "train", "refund", "tdr", "cancellation", "irctc", "ticket"]
  }
];

export default function PublicSearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDisclosures = sampleDisclosures.filter((item) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.ministry.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 20px 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Search public information</span>
        </div>

        {/* Prototype Sample Data Notice */}
        <div className="gov-alert" style={{ marginBottom: "24px" }}>
          <strong>Prototype Note:</strong> Sample proactive disclosure records are displayed below for demonstration. In production, this searches Section 4 public disclosure logs published by Central Public Authorities.
        </div>

        {/* Header & Search */}
        <div style={{ maxWidth: "760px", marginBottom: "32px" }}>
          <h1 style={{ fontSize: "1.875rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            Search existing public information
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--neutral-600)", lineHeight: "1.5", margin: "0 0 20px" }}>
            You may be able to find the rules, citizen charters, or circulars you need without filing an RTI request.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. passport processing rules, EPF claim guidelines, CBSE answer sheet..."
              className="form-control"
              style={{ flex: "1 1 360px", padding: "12px 14px", fontSize: "0.9375rem" }}
            />
          </div>
        </div>

        {/* Results List */}
        <div style={{ display: "grid", gap: "16px" }}>
          {filteredDisclosures.map((record) => (
            <div
              key={record.id}
              style={{
                background: "#ffffff",
                border: "1px solid var(--neutral-200)",
                borderRadius: "var(--radius-lg)",
                padding: "22px 24px",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--gov-blue-600)", textTransform: "uppercase" }}>
                    {record.categoryLabel}
                  </span>
                  <h2 style={{ fontSize: "1.1875rem", color: "var(--gov-navy-950)", margin: "4px 0 2px" }}>
                    {record.title}
                  </h2>
                  <div style={{ fontSize: "0.8125rem", color: "var(--neutral-500)" }}>
                    Published by: {record.department} ({record.ministry})
                  </div>
                </div>
              </div>

              <p style={{ color: "var(--neutral-700)", fontSize: "0.875rem", lineHeight: "1.5", margin: "12px 0 16px" }}>
                {record.summary}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--neutral-100)", paddingTop: "12px", flexWrap: "wrap", gap: "10px" }}>
                <button
                  type="button"
                  className="btn-secondary-action"
                  onClick={() => alert(`Opening sample document: ${record.docUrl}...`)}
                  style={{ padding: "6px 14px", fontSize: "0.8125rem" }}
                >
                  View document ↗
                </button>

                <Link
                  href={`/request/new?query=${encodeURIComponent(record.title)}`}
                  style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--gov-blue-600)", textDecoration: "none" }}
                >
                  Still need specific records? File an RTI →
                </Link>
              </div>
            </div>
          ))}

          {filteredDisclosures.length === 0 && (
            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "36px", textAlign: "center" }}>
              <h3 style={{ fontSize: "1.125rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                No published record matched &ldquo;{searchQuery}&rdquo;
              </h3>
              <p style={{ color: "var(--neutral-600)", fontSize: "0.875rem", maxWidth: "480px", margin: "0 auto 16px" }}>
                The specific information may not be proactively published. You can submit a new formal RTI request directly to the concerned authority.
              </p>
              <Link
                href={`/request/new?query=${encodeURIComponent(searchQuery)}`}
                className="btn-primary-action"
                style={{ padding: "8px 18px", fontSize: "0.875rem" }}
              >
                File an RTI request for this information →
              </Link>
            </div>
          )}
        </div>
      </main>
    </PortalPage>
  );
}
