"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { PortalPage } from "../../components/portal-shell";
import { centralAuthorities, findMatchingAuthorities, AuthorityItem } from "../../lib/authorities-data";

export default function AuthoritiesPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const categories = useMemo(() => {
    const cats = new Set<string>();
    centralAuthorities.forEach((a) => cats.add(a.category));
    return ["ALL", ...Array.from(cats)];
  }, []);

  const searchResults = useMemo(() => {
    let list: AuthorityItem[] = [];
    if (query.trim().length > 0) {
      list = findMatchingAuthorities(query).map((r) => r.authority);
    } else {
      list = centralAuthorities;
    }

    if (selectedCategory !== "ALL") {
      list = list.filter((a) => a.category === selectedCategory);
    }
    return list;
  }, [query, selectedCategory]);

  return (
    <PortalPage>
      <main className="authority-page">
        <section className="flow-hero" style={{ background: "linear-gradient(135deg, #eef5fb 0%, #f1f8fc 100%)", padding: "48px 0" }}>
          <div className="wrap">
            <div className="bread">
              <Link href="/">Home</Link>
              <span>›</span>
              <span>Central Public Authorities</span>
            </div>
            <p className="eyebrow"><span className="eyebrow-line" />SMART AUTHORITY FINDER</p>
            <h1 className="hero-h1" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", margin: "8px 0 14px" }}>
              Find the right <em>Central Public Authority.</em>
            </h1>
            <p style={{ maxWidth: "680px", color: "var(--neutral-600)", lineHeight: "1.6" }}>
              RTI applications are filed with the specific Central Ministry, Apex Body, or Public Authority that holds the requested records. Search by problem keyword or browse by department.
            </p>
          </div>
        </section>

        <section className="wrap" style={{ padding: "40px 0 80px" }}>
          {/* Smart Search Bar */}
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "28px", boxShadow: "var(--shadow-md)", marginBottom: "32px" }}>
            <label htmlFor="authority-search-input" style={{ display: "block", fontWeight: 700, fontSize: "0.95rem", color: "var(--gov-navy-950)", marginBottom: "8px" }}>
              Search by subject, keyword, or authority name
            </label>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <input
                id="authority-search-input"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. passport reissue, EPF withdrawal claim, CBSE marksheet, income tax refund, railway tatkal..."
                style={{ flex: "1 1 320px", padding: "14px 18px", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-md)", fontSize: "0.95rem" }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  style={{ background: "var(--neutral-100)", border: "1px solid var(--neutral-300)", padding: "0 16px", borderRadius: "var(--radius-md)", cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Pills */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "18px" }}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    background: selectedCategory === cat ? "var(--gov-navy-900)" : "var(--neutral-100)",
                    color: selectedCategory === cat ? "#ffffff" : "var(--neutral-700)",
                    border: "1px solid",
                    borderColor: selectedCategory === cat ? "var(--gov-navy-900)" : "var(--neutral-200)",
                    padding: "6px 14px",
                    borderRadius: "var(--radius-full)",
                    fontSize: "0.78rem",
                    fontWeight: selectedCategory === cat ? 700 : 500,
                    cursor: "pointer"
                  }}
                >
                  {cat === "ALL" ? "All Authorities" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <span style={{ fontSize: "0.86rem", color: "var(--neutral-600)" }}>
              Showing <strong>{searchResults.length}</strong> Central Public Authorities
            </span>
            <span style={{ fontSize: "0.78rem", color: "var(--neutral-500)" }}>
              Central Government Jurisdictions Only
            </span>
          </div>

          {/* Authorities List Cards */}
          <div style={{ display: "grid", gap: "16px" }}>
            {searchResults.map((auth) => (
              <div
                key={auth.id}
                style={{
                  background: "#ffffff",
                  border: "1px solid var(--neutral-200)",
                  borderRadius: "var(--radius-lg)",
                  padding: "24px",
                  boxShadow: "var(--shadow-sm)",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "20px",
                  alignItems: "center"
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "6px" }}>
                    <span style={{ background: "var(--gov-blue-100)", color: "var(--gov-navy-900)", fontSize: "0.68rem", fontWeight: 800, padding: "2px 8px", borderRadius: "3px" }}>
                      {auth.category}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "var(--neutral-500)" }}>
                      {auth.ministry}
                    </span>
                  </div>

                  <h3 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                    {auth.name}
                  </h3>

                  <div style={{ background: "var(--neutral-50)", borderLeft: "3px solid var(--gov-blue-500)", padding: "8px 12px", borderRadius: "0 var(--radius-sm) var(--radius-sm) 0", margin: "10px 0", fontSize: "0.82rem", color: "var(--gov-navy-900)" }}>
                    <strong>Nodal Officer Routing: </strong>
                    <span>Your application will first reach the department's RTI Nodal Officer and then be routed to the appropriate CPIO. ({auth.nodalOfficerDesc})</span>
                  </div>

                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {auth.keywords.slice(0, 5).map((kw: string) => (
                      <span key={kw} style={{ background: "var(--neutral-100)", color: "var(--neutral-600)", fontSize: "0.7rem", padding: "2px 6px", borderRadius: "3px" }}>
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <Link
                    href={`/request/new?authority=${encodeURIComponent(auth.id)}`}
                    className="btn-primary-action"
                    style={{ whiteSpace: "nowrap", padding: "10px 18px", fontSize: "0.86rem" }}
                  >
                    File RTI Request <span>→</span>
                  </Link>
                </div>
              </div>
            ))}

            {searchResults.length === 0 && (
              <div style={{ background: "#ffffff", border: "1px dashed var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "40px", textAlign: "center" }}>
                <p style={{ fontSize: "1rem", color: "var(--neutral-700)", margin: "0 0 10px", fontWeight: 600 }}>
                  No Central Public Authority matched &quot;{query}&quot;
                </p>
                <p style={{ fontSize: "0.84rem", color: "var(--neutral-500)", margin: "0 0 16px" }}>
                  Note: State Government authorities (e.g. State Police, Municipal Corporations, District Revenue) are covered under respective State RTI Portals.
                </p>
                <button
                  type="button"
                  onClick={() => { setQuery(""); setSelectedCategory("ALL"); }}
                  className="btn-secondary-action"
                >
                  Reset search filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </PortalPage>
  );
}
