"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { publicAuthoritiesDatabase, findMatchingAuthorities, PublicAuthorityRecord } from "../../lib/authorities-data";

export default function AuthoritiesDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAuthority, setSelectedAuthority] = useState<PublicAuthorityRecord | null>(null);

  const matchedAuthorities = searchQuery.trim().length > 1
    ? findMatchingAuthorities(searchQuery).map((r) => r.authority)
    : publicAuthoritiesDatabase;

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 20px 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Find public authority</span>
        </div>

        {/* Lead Question & Search Box */}
        <div style={{ maxWidth: "760px", marginBottom: "36px" }}>
          <h1 style={{ fontSize: "2rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            Find the right public authority
          </h1>
          <p style={{ fontSize: "1rem", color: "var(--neutral-600)", lineHeight: "1.6", margin: "0 0 20px" }}>
            Not sure which ministry or department holds the records you need? Type your query in plain language to find the responsible authority.
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="e.g. Why is my passport application still pending?"
              className="form-control"
              style={{ flex: "1 1 360px", padding: "12px 14px", fontSize: "0.9375rem" }}
            />
            {searchQuery && (
              <button
                type="button"
                className="btn-secondary-action"
                onClick={() => setSearchQuery("")}
                style={{ padding: "10px 16px" }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results List */}
        <div>
          <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--neutral-600)", marginBottom: "16px" }}>
            Showing {matchedAuthorities.length} public {matchedAuthorities.length === 1 ? "authority" : "authorities"}
          </div>

          <div style={{ display: "grid", gap: "16px" }}>
            {matchedAuthorities.map((auth) => (
              <div
                key={auth.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--neutral-200)",
                  borderRadius: "var(--radius-lg)",
                  padding: "22px 24px",
                  boxShadow: "var(--shadow-sm)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px", marginBottom: "8px" }}>
                  <div>
                    <h2 style={{ fontSize: "1.25rem", color: "var(--gov-navy-950)", margin: "0 0 2px" }}>
                      {auth.name}
                    </h2>
                    <div style={{ fontSize: "0.875rem", color: "var(--neutral-600)" }}>
                      {auth.ministry}
                    </div>
                  </div>

                  <Link
                    href={`/request/new?authority=${encodeURIComponent(auth.id)}`}
                    className="btn-primary-action"
                    style={{ padding: "8px 16px", fontSize: "0.875rem" }}
                  >
                    File RTI with this authority →
                  </Link>
                </div>

                <div style={{ fontSize: "0.875rem", color: "var(--neutral-700)", margin: "12px 0", lineHeight: "1.5" }}>
                  <strong>Jurisdiction & Routing:</strong> {auth.nodalOfficerDesc}
                </div>

                <div style={{ fontSize: "0.8125rem", color: "var(--neutral-500)", borderTop: "1px solid var(--neutral-100)", paddingTop: "10px" }}>
                  <strong>Common topics:</strong> {auth.commonTopics?.join(" · ") || auth.keywords.slice(0, 4).join(" · ")}
                </div>
              </div>
            ))}

            {matchedAuthorities.length === 0 && (
              <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "36px 24px", textAlign: "center" }}>
                <h3 style={{ fontSize: "1.125rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
                  No matching authority found for &ldquo;{searchQuery}&rdquo;
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", maxWidth: "480px", margin: "0 auto 18px" }}>
                  If you are looking for state police, municipal corporations, or local collectors, these are handled by State Governments.
                </p>
                <Link href="/offline" className="btn-secondary-action">
                  Prepare an offline RTI application →
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </PortalPage>
  );
}
