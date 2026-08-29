"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";

export default function CitizenDashboardPage() {
  const { user, applications, payAdditionalFee, uploadClarificationDoc } = useAuth();
  const [activeModalAppId, setActiveModalAppId] = useState<string | null>(null);
  const [docUploadAppId, setDocUploadAppId] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 20px 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>My requests</span>
        </div>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "28px", borderBottom: "1px solid var(--neutral-200)", paddingBottom: "20px" }}>
          <div>
            <h1 style={{ fontSize: "1.75rem", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
              Your requests
            </h1>
            <p style={{ fontSize: "0.9375rem", color: "var(--neutral-600)", margin: 0 }}>
              Showing {applications.length} {applications.length === 1 ? "application" : "applications"} filed under your account ({user?.email || "Citizen"}).
            </p>
          </div>

          <Link href="/request/eligibility" className="btn-primary-action" style={{ padding: "8px 16px", fontSize: "0.875rem" }}>
            + File a new RTI
          </Link>
        </div>

        {/* List of Applications (Case-focused cards, no corporate charts) */}
        <div style={{ display: "grid", gap: "20px" }}>
          {applications.map((app) => (
            <div
              key={app.id}
              style={{
                background: "#ffffff",
                border: "1px solid var(--neutral-200)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                boxShadow: "var(--shadow-sm)"
              }}
            >
              {/* Top Meta Line */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
                <div>
                  <span style={{ fontSize: "0.8125rem", color: "var(--neutral-500)", textTransform: "uppercase" }}>
                    Registration Number
                  </span>
                  <div style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--gov-navy-950)", fontFamily: "var(--font-number)" }}>
                    {app.regNo}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span
                    style={{
                      display: "inline-block",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "3px 10px",
                      borderRadius: "var(--radius-full)",
                      background:
                        app.status === "RESPONSE_ISSUED" || app.status === "DISPOSED_SATISFIED"
                          ? "var(--success-50)"
                          : app.status === "ACTION_DOC_REQUIRED" || app.status === "ADDITIONAL_FEE_REQUIRED"
                          ? "var(--warning-50)"
                          : "var(--gov-blue-50)",
                      color:
                        app.status === "RESPONSE_ISSUED" || app.status === "DISPOSED_SATISFIED"
                          ? "var(--success-700)"
                          : app.status === "ACTION_DOC_REQUIRED" || app.status === "ADDITIONAL_FEE_REQUIRED"
                          ? "var(--warning-700)"
                          : "var(--gov-blue-600)",
                      border: "1px solid currentColor"
                    }}
                  >
                    {app.statusLabel}
                  </span>
                  <div style={{ fontSize: "0.8125rem", color: "var(--neutral-500)", marginTop: "4px" }}>
                    Expected by: <strong>{app.expectedDate}</strong>
                  </div>
                </div>
              </div>

              {/* Subject & Authority */}
              <h2 style={{ fontSize: "1.125rem", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                {app.subject}
              </h2>
              <div style={{ fontSize: "0.875rem", color: "var(--neutral-600)", marginBottom: "14px" }}>
                {app.department} · {app.ministry}
              </div>

              {/* Current Status Explanation */}
              <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-sm)", padding: "12px 14px", fontSize: "0.875rem", color: "var(--neutral-700)", lineHeight: "1.5", marginBottom: "16px" }}>
                <strong>Latest update:</strong> {app.currentStageText}
              </div>

              {/* Action Required Banners */}
              {app.status === "ADDITIONAL_FEE_REQUIRED" && (
                <div className="gov-alert gov-alert-warning" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <strong>Action required:</strong> Additional photocopy fee of ₹{app.additionalFeeRequired?.amount} demanded for {app.additionalFeeRequired?.pages} pages (@ ₹2/page).
                  </div>
                  <button
                    type="button"
                    className="btn-primary-action"
                    onClick={() => {
                      payAdditionalFee(app.id);
                      alert(`Payment of ₹${app.additionalFeeRequired?.amount} settled successfully. CPIO notified.`);
                    }}
                    style={{ padding: "6px 14px", fontSize: "0.8125rem" }}
                  >
                    Pay ₹{app.additionalFeeRequired?.amount} online →
                  </button>
                </div>
              )}

              {app.status === "ACTION_DOC_REQUIRED" && (
                <div className="gov-alert gov-alert-warning" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <strong>Action required:</strong> {app.clarificationRequest?.reason}
                  </div>
                  <button
                    type="button"
                    className="btn-primary-action"
                    onClick={() => setDocUploadAppId(app.id)}
                    style={{ padding: "6px 14px", fontSize: "0.8125rem" }}
                  >
                    Upload document →
                  </button>
                </div>
              )}

              {/* Response Available */}
              {app.responseOrder && (
                <div className="gov-alert gov-alert-success" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
                  <div>
                    <strong>Official CPIO Response Order issued:</strong> {app.responseOrder.summary}
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      className="btn-secondary-action"
                      onClick={() => alert(`Downloading official certified response: ${app.responseOrder?.pdfUrl}...`)}
                      style={{ padding: "6px 12px", fontSize: "0.8125rem" }}
                    >
                      Download Response PDF
                    </button>
                    <Link
                      href={`/appeal/new?regNo=${encodeURIComponent(app.regNo)}`}
                      className="btn-secondary-action"
                      style={{ padding: "6px 12px", fontSize: "0.8125rem", color: "var(--gov-blue-600)" }}
                    >
                      Appeal decision →
                    </Link>
                  </div>
                </div>
              )}

              {/* Bottom Details Footer */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--neutral-100)", paddingTop: "12px", marginTop: "12px", fontSize: "0.8125rem", color: "var(--neutral-500)" }}>
                <span>Filing date: {app.filingDate} · Payment ref: {app.paymentRef}</span>
                <Link href={`/status?regNo=${encodeURIComponent(app.regNo)}`} style={{ fontWeight: 600 }}>
                  View full timeline →
                </Link>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "40px", textAlign: "center" }}>
              <h2 style={{ fontSize: "1.25rem", color: "var(--gov-navy-950)", margin: "0 0 6px" }}>
                No applications filed yet
              </h2>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: "0 0 20px" }}>
                When you submit an RTI request, its progress and official response orders will appear here.
              </p>
              <Link href="/request/eligibility" className="btn-primary-action">
                File an RTI request →
              </Link>
            </div>
          )}
        </div>

        {/* Upload Document Modal */}
        {docUploadAppId && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "grid", placeItems: "center", zIndex: 1000 }}>
            <div style={{ background: "#ffffff", borderRadius: "var(--radius-lg)", padding: "28px", maxWidth: "480px", width: "90%", boxShadow: "var(--shadow-lg)" }}>
              <h3 style={{ fontSize: "1.25rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
                Upload requested document
              </h3>
              <p style={{ fontSize: "0.875rem", color: "var(--neutral-600)", margin: "0 0 16px" }}>
                Please select the PDF document requested by the CPIO.
              </p>

              <div className="form-group">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || "clarification_document.pdf")}
                  className="form-control"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "20px" }}>
                <button type="button" className="btn-secondary-action" onClick={() => setDocUploadAppId(null)}>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn-primary-action"
                  onClick={() => {
                    uploadClarificationDoc(docUploadAppId, selectedFileName || "clarification_document.pdf");
                    setDocUploadAppId(null);
                    alert("Document transmitted to CPIO successfully.");
                  }}
                >
                  Submit document →
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </PortalPage>
  );
}
