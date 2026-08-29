"use client";

import Link from "next/link";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

export default function AppealPage() {
  const { user, applications } = useAuth();

  return (
    <PortalPage>
      <main className="content-page wrap">
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Submit First Appeal</span>
        </div>

        <div className="content-grid">
          <article>
            <p className="eyebrow"><span className="eyebrow-line" />STATUTORY FIRST APPEAL · SECTION 19(1)</p>
            <h1 className="hero-h1" style={{ fontSize: "clamp(2.3rem, 4vw, 3.4rem)", margin: "8px 0 16px" }}>
              File a First Appeal under the <em>RTI Act, 2005.</em>
            </h1>
            <p className="page-lead">
              If you have not received a reply from the CPIO within 30 days, or are aggrieved by the decision/information provided, you can file a First Appeal to the designated First Appellate Authority (FAA).
            </p>

            <div className="important-note" style={{ background: "var(--gov-blue-50)", border: "1.5px solid #bfdbfe", color: "var(--gov-navy-950)" }}>
              <span style={{ background: "var(--gov-blue-100)", color: "var(--gov-blue-600)" }}>ℹ</span>
              <div>
                <strong>Zero Application Fee: </strong>
                <span>Under the Central RTI Rules, there is no fee for filing a First Appeal. You only need your original RTI Registration Number and registered email.</span>
              </div>
            </div>

            {/* If logged in with applications, show fast appeal picker */}
            {user && applications.length > 0 && (
              <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "24px", margin: "24px 0", boxShadow: "var(--shadow-sm)" }}>
                <h3 style={{ font: "700 1.15rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 12px" }}>
                  Choose an existing RTI application to appeal:
                </h3>

                <div style={{ display: "grid", gap: "10px" }}>
                  {applications.map((app) => (
                    <div
                      key={app.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 16px",
                        background: "var(--neutral-50)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid var(--neutral-200)"
                      }}
                    >
                      <div>
                        <strong>{app.regNo}</strong>
                        <div style={{ fontSize: "0.78rem", color: "var(--neutral-600)" }}>
                          {app.publicAuthority} · Status: {app.statusLabel}
                        </div>
                      </div>
                      <Link
                        href={`/appeal/new?regNo=${encodeURIComponent(app.regNo)}`}
                        className="btn-primary-action"
                        style={{ padding: "6px 14px", fontSize: "0.78rem" }}
                      >
                        File Appeal →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: "24px" }}>
              <Link className="btn-primary-action" href="/appeal/new">
                Start First Appeal Form <span>→</span>
              </Link>
            </div>
          </article>

          <aside className="side-help">
            <p>STATUTORY TIMELINES</p>
            <h2>When should you file a First Appeal?</h2>
            <ul style={{ paddingLeft: "18px", fontSize: "0.85rem", lineHeight: "1.6", color: "#cbd5e1", margin: "12px 0 20px" }}>
              <li>No reply received after 30 days from RTI submission.</li>
              <li>Within 30 days from the date of receiving the CPIO&apos;s reply order.</li>
              <li>Grounds: Vague/incomplete information, wrongful denial under Sec 8/9, or exorbitant photocopy fees.</li>
            </ul>
            <Link href="/status" style={{ color: "#93c5fd", fontWeight: 700, textDecoration: "none" }}>
              Track status of original request →
            </Link>
          </aside>
        </div>
      </main>
    </PortalPage>
  );
}
