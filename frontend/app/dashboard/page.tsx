"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";
import { RTIApplication } from "../../types/rti";

export default function CitizenDashboardPage() {
  const router = useRouter();
  const { user, applications, payAdditionalFee, uploadClarificationDoc, markSatisfaction } = useAuth();

  const [selectedApp, setSelectedApp] = useState<RTIApplication | null>(null);
  const [docUploadModalAppId, setDocUploadModalAppId] = useState<string | null>(null);
  const [docFileToUpload, setDocFileToUpload] = useState("Candidate_Admit_Card_2026.pdf");

  // Status Filter tabs
  const [activeFilter, setActiveFilter] = useState<"ALL" | "PROCESSING" | "ACTION" | "CLOSED">("ALL");

  const totalCount = applications.length;
  const processingCount = applications.filter((a) => a.status === "UNDER_PROCESS" || a.status === "TRANSFERRED" || a.status === "SUBMITTED").length;
  const actionCount = applications.filter((a) => a.status === "ACTION_DOC_REQUIRED" || a.status === "ADDITIONAL_FEE_REQUIRED" || a.status === "RESPONSE_ISSUED").length;
  const closedCount = applications.filter((a) => a.status === "DISPOSED_SATISFIED" || a.status === "FIRST_APPEAL_FILED").length;

  const filteredApps = applications.filter((app) => {
    if (activeFilter === "PROCESSING") return app.status === "UNDER_PROCESS" || app.status === "TRANSFERRED" || app.status === "SUBMITTED";
    if (activeFilter === "ACTION") return app.status === "ACTION_DOC_REQUIRED" || app.status === "ADDITIONAL_FEE_REQUIRED" || app.status === "RESPONSE_ISSUED";
    if (activeFilter === "CLOSED") return app.status === "DISPOSED_SATISFIED" || app.status === "FIRST_APPEAL_FILED";
    return true;
  });

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "36px 0 80px" }}>
        {/* Header with Verified Citizen Profile */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: "4px" }}>
              <span className="eyebrow-line" />
              CITIZEN UNIFIED PORTAL · ACTIVE SESSIONS
            </p>
            <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: 0 }}>
              Good morning, {user ? user.name.split(" ")[0] : "Rajesh"} 👋
            </h1>
            <p style={{ margin: "4px 0 0", color: "var(--neutral-600)", fontSize: "0.92rem" }}>
              Registered Citizen ID: <strong>{user?.id || "CITIZEN-9842"}</strong> · Karnataka Jurisdiction
            </p>
          </div>

          <Link href="/request/eligibility" className="btn-primary-action" style={{ padding: "12px 24px" }}>
            + File a New RTI Request
          </Link>
        </div>

        {/* 4 Metric Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          <div
            onClick={() => setActiveFilter("ALL")}
            style={{
              background: activeFilter === "ALL" ? "var(--gov-blue-50)" : "#ffffff",
              border: activeFilter === "ALL" ? "2px solid var(--gov-blue-600)" : "1px solid var(--neutral-200)",
              borderRadius: "var(--radius-lg)",
              padding: "18px 20px",
              cursor: "pointer",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--neutral-500)", textTransform: "uppercase" }}>TOTAL APPLICATIONS</span>
            <div style={{ font: "700 2rem var(--font-number)", color: "var(--gov-navy-950)", margin: "4px 0 0" }}>{totalCount}</div>
          </div>

          <div
            onClick={() => setActiveFilter("PROCESSING")}
            style={{
              background: activeFilter === "PROCESSING" ? "var(--gov-blue-50)" : "#ffffff",
              border: activeFilter === "PROCESSING" ? "2px solid var(--gov-blue-600)" : "1px solid var(--neutral-200)",
              borderRadius: "var(--radius-lg)",
              padding: "18px 20px",
              cursor: "pointer",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--gov-blue-600)", textTransform: "uppercase" }}>UNDER PROCESSING</span>
            <div style={{ font: "700 2rem var(--font-number)", color: "var(--gov-blue-600)", margin: "4px 0 0" }}>{processingCount}</div>
          </div>

          <div
            onClick={() => setActiveFilter("ACTION")}
            style={{
              background: activeFilter === "ACTION" ? "#fffbeb" : "#ffffff",
              border: activeFilter === "ACTION" ? "2px solid var(--amber-600)" : "1px solid var(--neutral-200)",
              borderRadius: "var(--radius-lg)",
              padding: "18px 20px",
              cursor: "pointer",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--amber-600)", textTransform: "uppercase" }}>ACTION REQUIRED</span>
            <div style={{ font: "700 2rem var(--font-number)", color: "var(--amber-600)", margin: "4px 0 0" }}>{actionCount}</div>
          </div>

          <div
            onClick={() => setActiveFilter("CLOSED")}
            style={{
              background: activeFilter === "CLOSED" ? "var(--forest-50)" : "#ffffff",
              border: activeFilter === "CLOSED" ? "2px solid var(--forest-600)" : "1px solid var(--neutral-200)",
              borderRadius: "var(--radius-lg)",
              padding: "18px 20px",
              cursor: "pointer",
              boxShadow: "var(--shadow-sm)"
            }}
          >
            <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--forest-600)", textTransform: "uppercase" }}>CLOSED / APPEALED</span>
            <div style={{ font: "700 2rem var(--font-number)", color: "var(--forest-600)", margin: "4px 0 0" }}>{closedCount}</div>
          </div>
        </div>

        {/* Section Title */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ font: "700 1.4rem var(--font-serif)", color: "var(--gov-navy-950)", margin: 0 }}>
            My Applications ({filteredApps.length})
          </h2>
          <span style={{ fontSize: "0.82rem", color: "var(--neutral-500)" }}>
            Showing: {activeFilter} applications
          </span>
        </div>

        {/* Applications List */}
        <div style={{ display: "grid", gap: "18px" }}>
          {filteredApps.map((app) => (
            <div
              key={app.id}
              style={{
                background: "#ffffff",
                border: "1.5px solid var(--neutral-200)",
                borderRadius: "var(--radius-xl)",
                padding: "24px",
                boxShadow: "var(--shadow-md)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span style={{ font: "700 1.15rem var(--font-number)", color: "var(--gov-navy-950)", letterSpacing: "0.02em" }}>
                      {app.regNo}
                    </span>
                    <span style={{ fontSize: "0.76rem", color: "var(--neutral-500)" }}>
                      Filed on {app.filingDate}
                    </span>
                  </div>
                  <h3 style={{ font: "700 1.1rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "4px 0 2px" }}>
                    {app.subject}
                  </h3>
                  <div style={{ fontSize: "0.82rem", color: "var(--neutral-600)" }}>
                    {app.publicAuthority} ({app.ministry})
                  </div>
                </div>

                {/* Status Pill */}
                <div>
                  {app.status === "UNDER_PROCESS" && (
                    <span style={{ background: "var(--gov-blue-50)", color: "var(--gov-blue-600)", border: "1px solid #bfdbfe", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 800 }}>
                      ● UNDER PROCESSING
                    </span>
                  )}
                  {app.status === "TRANSFERRED" && (
                    <span style={{ background: "var(--gov-blue-100)", color: "var(--gov-blue-800)", border: "1px solid #93c5fd", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 800 }}>
                      ↗ TRANSFERRED (SEC 6(3))
                    </span>
                  )}
                  {app.status === "ACTION_DOC_REQUIRED" && (
                    <span style={{ background: "#fef3c7", color: "#92400e", border: "1px solid #fcd34d", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 800 }}>
                      ⚠ DOCUMENT REQUESTED
                    </span>
                  )}
                  {app.status === "ADDITIONAL_FEE_REQUIRED" && (
                    <span style={{ background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 800 }}>
                      ⚠ ADDITIONAL FEE REQUIRED
                    </span>
                  )}
                  {app.status === "RESPONSE_ISSUED" && (
                    <span style={{ background: "var(--forest-100)", color: "var(--forest-700)", border: "1px solid #a7f3d0", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 800 }}>
                      ✓ RESPONSE RECEIVED
                    </span>
                  )}
                  {app.status === "DISPOSED_SATISFIED" && (
                    <span style={{ background: "var(--forest-50)", color: "var(--forest-700)", border: "1px solid var(--forest-600)", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 800 }}>
                      ✓ CLOSED (SATISFIED)
                    </span>
                  )}
                  {app.status === "FIRST_APPEAL_FILED" && (
                    <span style={{ background: "#e0e7ff", color: "#3730a3", border: "1px solid #c7d2fe", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "0.75rem", fontWeight: 800 }}>
                      ⚖️ FIRST APPEAL FILED
                    </span>
                  )}
                </div>
              </div>

              {/* SCREEN 20: IF RTI IS TRANSFERRED */}
              {app.status === "TRANSFERRED" && (
                <div style={{ background: "var(--gov-blue-50)", border: "1px solid #bfdbfe", borderRadius: "var(--radius-md)", padding: "14px 16px", margin: "14px 0", fontSize: "0.84rem" }}>
                  <strong style={{ color: "var(--gov-navy-950)", display: "block", marginBottom: "2px" }}>
                    ↗ Your RTI was transferred
                  </strong>
                  <p style={{ margin: "0 0 6px", color: "var(--neutral-700)", lineHeight: "1.5" }}>
                    Your request was transferred under Section 6(3) because another Public Authority holds the requested information.
                  </p>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", fontSize: "0.8rem", color: "var(--gov-navy-900)" }}>
                    <span><strong>From:</strong> {app.transferFrom}</span>
                    <span>→</span>
                    <span><strong>To:</strong> {app.transferTo}</span>
                  </div>
                  <div style={{ marginTop: "6px", fontSize: "0.76rem", color: "var(--forest-600)", fontWeight: 700 }}>
                    ✓ No action is currently required from you. The 30-day statutory window applies from date of transfer receipt.
                  </div>
                </div>
              )}

              {/* SCREEN 21: ADDITIONAL DOCUMENT REQUESTED */}
              {app.status === "ACTION_DOC_REQUIRED" && (
                <div style={{ background: "#fffbeb", border: "1.5px solid #fcd34d", borderRadius: "var(--radius-md)", padding: "14px 16px", margin: "14px 0" }}>
                  <strong style={{ color: "#92400e", display: "block", marginBottom: "4px" }}>
                    ⚠ ACTION REQUIRED: Supporting Document Requested by CPIO
                  </strong>
                  <p style={{ margin: "0 0 10px", fontSize: "0.84rem", color: "#78350f" }}>
                    Reason: <em>&quot;{app.docRequestReason}&quot;</em>
                  </p>
                  <button
                    type="button"
                    className="btn-primary-action"
                    onClick={() => setDocUploadModalAppId(app.id)}
                    style={{ padding: "6px 14px", fontSize: "0.8rem" }}
                  >
                    + Upload Requested Document
                  </button>
                </div>
              )}

              {/* SCREEN 22: ADDITIONAL FEE REQUESTED */}
              {app.status === "ADDITIONAL_FEE_REQUIRED" && (
                <div style={{ background: "#fef2f2", border: "1.5px solid #fca5a5", borderRadius: "var(--radius-md)", padding: "14px 16px", margin: "14px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <strong style={{ color: "#991b1b", display: "block", marginBottom: "2px" }}>
                      ⚠ PAYMENT REQUIRED: Additional Fee ₹{app.additionalFeeAmount}
                    </strong>
                    <p style={{ margin: 0, fontSize: "0.84rem", color: "#7f1d1d" }}>
                      Reason: Photocopy charges for {app.photocopyPages} pages (@ ₹2 per page under RTI Rules, 2012).
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-primary-action"
                    onClick={() => {
                      payAdditionalFee(app.id, app.additionalFeeAmount || 24);
                      alert(`Additional fee of ₹${app.additionalFeeAmount} settled. CPIO notified to dispatch certified copies.`);
                    }}
                    style={{ background: "#dc2626", borderColor: "#b91c1c", padding: "8px 18px", fontSize: "0.82rem" }}
                  >
                    Pay ₹{app.additionalFeeAmount} Now →
                  </button>
                </div>
              )}

              {/* SCREEN 23 & 24: RESPONSE RECEIVED & SATISFACTION QUESTION */}
              {app.status === "RESPONSE_ISSUED" && (
                <div style={{ background: "var(--forest-50)", border: "1.5px solid #a7f3d0", borderRadius: "var(--radius-md)", padding: "16px", margin: "14px 0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "8px" }}>
                    <div>
                      <strong style={{ color: "var(--forest-700)", fontSize: "0.95rem", display: "block" }}>
                        ✓ RESPONSE RECEIVED
                      </strong>
                      <p style={{ margin: "2px 0 0", fontSize: "0.84rem", color: "var(--neutral-700)" }}>
                        The Public Authority has furnished a statutory response order to your RTI request.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-secondary-action"
                      onClick={() => alert(`Downloading official CPIO reply for ${app.regNo} (PDF)...`)}
                      style={{ padding: "6px 12px", fontSize: "0.8rem", color: "var(--forest-700)" }}
                    >
                      📄 Download Official Reply (PDF)
                    </button>
                  </div>

                  {/* Satisfaction Decision Gate */}
                  <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #d1fae5" }}>
                    <span style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--gov-navy-950)", display: "block", marginBottom: "8px" }}>
                      Did the response resolve your RTI request?
                    </span>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <button
                        type="button"
                        className="btn-primary-action"
                        onClick={() => {
                          markSatisfaction(app.id, true);
                          alert("RTI Completed! Your application and response will remain in your history.");
                        }}
                        style={{ background: "var(--forest-600)", borderColor: "var(--forest-700)", padding: "6px 14px", fontSize: "0.8rem" }}
                      >
                        ✓ Yes, I&apos;m satisfied (Close Case)
                      </button>

                      <Link
                        href={`/appeal/new?regNo=${encodeURIComponent(app.regNo)}`}
                        className="btn-secondary-action"
                        style={{ padding: "6px 14px", fontSize: "0.8rem", color: "#b91c1c", borderColor: "#fca5a5" }}
                      >
                        ✕ No, I want to appeal (First Appeal) →
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Statutory Response Countdown Bar */}
              {app.remainingDays > 0 && app.status !== "DISPOSED_SATISFIED" && (
                <div style={{ margin: "14px 0 10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", color: "var(--neutral-600)", marginBottom: "4px" }}>
                    <span>Statutory 30-Day Window: <strong>{app.remainingDays} days remaining</strong></span>
                    <span>Expected by {app.expectedDate}</span>
                  </div>
                  <div style={{ height: "6px", background: "var(--neutral-200)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${Math.max(15, ((30 - app.remainingDays) / 30) * 100)}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, var(--gov-blue-600) 0%, var(--saffron-500) 100%)"
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Action Bar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--neutral-100)" }}>
                <button
                  type="button"
                  onClick={() => setSelectedApp(selectedApp?.id === app.id ? null : app)}
                  style={{ background: "none", border: 0, color: "var(--gov-blue-600)", fontWeight: 700, fontSize: "0.84rem", cursor: "pointer" }}
                >
                  {selectedApp?.id === app.id ? "▲ Hide Details & Audit Trail" : "▼ View Details & Audit Trail →"}
                </button>

                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    href={`/status?regNo=${encodeURIComponent(app.regNo)}`}
                    style={{ fontSize: "0.8rem", color: "var(--neutral-600)", textDecoration: "none" }}
                  >
                    Public Tracker Link ↗
                  </Link>
                </div>
              </div>

              {/* SCREEN 19: EXPANDED AUDIT TRAIL */}
              {selectedApp?.id === app.id && (
                <div style={{ marginTop: "18px", paddingTop: "18px", borderTop: "1px solid var(--neutral-200)", animation: "fadeIn 0.2s ease-in" }}>
                  <h4 style={{ font: "700 1.05rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 12px" }}>
                    Application Timeline & Audit Trail
                  </h4>

                  <div className="timeline-trail" style={{ paddingLeft: "16px" }}>
                    {app.timeline.map((ev, idx) => (
                      <div key={idx} className={`timeline-node ${ev.completed ? "node-done" : ev.current ? "node-active" : ""}`} style={{ marginBottom: "14px" }}>
                        <div style={{ fontSize: "0.86rem", fontWeight: 700, color: ev.completed || ev.current ? "var(--gov-navy-950)" : "var(--neutral-400)" }}>
                          {ev.title}
                        </div>
                        <div style={{ fontSize: "0.78rem", color: "var(--neutral-600)", margin: "2px 0" }}>
                          {ev.description}
                        </div>
                        <div style={{ fontSize: "0.72rem", color: "var(--neutral-400)" }}>
                          {ev.date}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "var(--neutral-50)", padding: "12px 16px", borderRadius: "var(--radius-md)", fontSize: "0.82rem", marginTop: "14px" }}>
                    <strong>Original RTI Text:</strong>
                    <p style={{ margin: "4px 0 0", color: "var(--neutral-700)", whiteSpace: "pre-wrap" }}>
                      {app.queryText}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* MODAL: UPLOAD REQUESTED CLARIFICATION DOCUMENT */}
        {docUploadModalAppId && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "grid", placeItems: "center", zIndex: 1000 }}>
            <div style={{ background: "#ffffff", borderRadius: "var(--radius-xl)", padding: "32px", maxWidth: "500px", width: "90%", boxShadow: "var(--shadow-xl)" }}>
              <h3 style={{ font: "700 1.3rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
                Upload Requested Document
              </h3>
              <p style={{ fontSize: "0.86rem", color: "var(--neutral-600)", margin: "0 0 16px" }}>
                Upload the requested identity or verification document to allow the CPIO to continue processing your RTI.
              </p>

              <div className="form-group">
                <label htmlFor="doc-file-input">Select Document (PDF / JPEG)</label>
                <input
                  id="doc-file-input"
                  className="form-control"
                  type="text"
                  value={docFileToUpload}
                  onChange={(e) => setDocFileToUpload(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                <button
                  type="button"
                  className="btn-secondary-action"
                  onClick={() => setDocUploadModalAppId(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary-action"
                  onClick={() => {
                    uploadClarificationDoc(docUploadModalAppId, docFileToUpload);
                    setDocUploadModalAppId(null);
                    alert("Document successfully submitted to CPIO. RTI processing resumed.");
                  }}
                >
                  Submit Document →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </PortalPage>
  );
}
