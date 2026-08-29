"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { centralPublicAuthorities, findMatchingAuthorities, PublicAuthority } from "../../lib/authorities-data";

export default function AuthoritiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMinistry, setSelectedMinistry] = useState("ALL");

  const matchingAuthorities = searchQuery.trim()
    ? findMatchingAuthorities(searchQuery).map((res) => res.authority)
    : centralPublicAuthorities;

  const filteredAuthorities = matchingAuthorities.filter((auth) => {
    if (selectedMinistry === "ALL") return true;
    return auth.ministry === selectedMinistry;
  });

  const uniqueMinistries = Array.from(new Set(centralPublicAuthorities.map((a) => a.ministry))).sort();

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "36px 0 72px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Find a public authority</span>
        </div>

        {/* Header Unit */}
        <div style={{ maxWidth: "800px", marginBottom: "32px" }}>
          <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            Find the right public authority
          </h1>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
            Describe the information you are seeking in plain language, or browse by Ministry. Your RTI application will be routed directly to the Nodal Officer of the selected authority.
          </p>
        </div>

        {/* Central Natural Language Search Input */}
        <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "24px 28px", boxShadow: "var(--shadow-sm)", marginBottom: "28px" }}>
          <label htmlFor="auth-query" style={{ display: "block", fontSize: "0.92rem", fontWeight: 700, color: "var(--gov-navy-950)", marginBottom: "8px" }}>
            What information are you looking for?
          </label>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              id="auth-query"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Why is my passport application still pending, EPF claim status, CBSE marksheet..."
              style={{ flex: "1 1 340px", padding: "11px 14px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-md)", fontSize: "0.92rem", color: "var(--neutral-900)" }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                style={{ padding: "8px 14px", background: "var(--neutral-200)", border: 0, borderRadius: "var(--radius-md)", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer" }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Ministry Filter Dropdown */}
          <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--neutral-600)" }}>Filter by Ministry:</span>
            <select
              value={selectedMinistry}
              onChange={(e) => setSelectedMinistry(e.target.value)}
              style={{ padding: "6px 12px", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", fontSize: "0.82rem", color: "var(--neutral-800)", background: "#ffffff" }}
            >
              <option value="ALL">All Ministries ({centralPublicAuthorities.length} Authorities)</option>
              {uniqueMinistries.map((min) => (
                <option key={min} value={min}>{min}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginBottom: "16px", fontSize: "0.84rem", color: "var(--neutral-600)" }}>
          Showing <strong>{filteredAuthorities.length}</strong> public authorities
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Clean Authority Cards Grid */}
        <div style={{ display: "grid", gap: "16px" }}>
          {filteredAuthorities.map((auth: any) => (
            <div
              key={auth.id}
              style={{
                background: "#ffffff",
                border: "1px solid var(--neutral-200)",
                borderRadius: "var(--radius-md)",
                padding: "20px 24px",
                boxShadow: "var(--shadow-sm)",
                display: "flex",
                flexDirection: "column",
                gap: "10px"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h3 style={{ font: "700 1.15rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 2px" }}>
                    {auth.name}
                  </h3>
                  <div style={{ fontSize: "0.84rem", color: "var(--neutral-600)", fontWeight: 500 }}>
                    {auth.ministry}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <Link
                    href={`/request/new?authority=${encodeURIComponent(auth.id)}`}
                    className="btn-file-primary"
                    style={{ padding: "7px 14px", fontSize: "0.82rem" }}
                  >
                    File RTI with this authority →
                  </Link>
                </div>
              </div>

              {/* Plain Language Jurisdiction Notice */}
              <div style={{ background: "var(--neutral-50)", borderLeft: "3px solid var(--gov-navy-800)", padding: "10px 14px", fontSize: "0.82rem", color: "var(--neutral-700)", lineHeight: "1.5" }}>
                <strong>Routing & Scope: </strong>
                {auth.nodalOfficerDesc}
              </div>

              {/* Clean Common Topics */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", fontSize: "0.78rem", color: "var(--neutral-500)", paddingTop: "6px" }}>
                <span style={{ fontWeight: 600 }}>Common subjects:</span>
                <span>{auth.commonTopics?.join(" · ") || auth.keywords?.slice(0, 4).join(" · ")}</span>
              </div>
            </div>
          ))}

          {filteredAuthorities.length === 0 && (
            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "36px 24px", textAlign: "center" }}>
              <h3 style={{ font: "700 1.15rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                No public authority matched &ldquo;{searchQuery}&rdquo;
              </h3>
              <p style={{ color: "var(--neutral-600)", fontSize: "0.88rem", maxWidth: "480px", margin: "0 auto 16px" }}>
                If you are unsure of the specific department, you can submit your request to the central administrative ministry or choose &quot;Department of Personnel and Training&quot;.
              </p>
              <Link href="/request/new" className="btn-file-primary" style={{ display: "inline-block" }}>
                Continue to file RTI anyway →
              </Link>
            </div>
          )}
        </div>
      </main>
    </PortalPage>
  );
}
