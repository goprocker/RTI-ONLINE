"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";
import { RTIApplication } from "../../types/rti";

export default function CitizenDashboardPage() {
  const { user, applications, payAdditionalFee, uploadClarificationDoc, markSatisfaction } = useAuth();
  const [selectedApp, setSelectedApp] = useState<RTIApplication | null>(applications[0] || null);

  const [clarificationFile, setClarificationFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  function handleFeeSettlement(appId: string) {
    setIsProcessing(true);
    setTimeout(() => {
      payAdditionalFee(appId, selectedApp?.additionalFeeAmount || 24);
      setIsProcessing(false);
      alert("Photocopy fee settled successfully. Receipt generated.");
    }, 600);
  }

  function handleClarificationUpload(appId: string) {
    if (!clarificationFile) {
      alert("Please choose a file to upload.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      uploadClarificationDoc(appId, clarificationFile);
      setIsProcessing(false);
      alert(`Document "${clarificationFile}" uploaded successfully. CPIO notified.`);
    }, 600);
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "36px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Your requests</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px", marginBottom: "28px" }}>
          <div>
            <h1 style={{ font: "700 2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
              Your RTI requests
            </h1>
            <p style={{ color: "var(--neutral-600)", fontSize: "0.92rem", margin: 0 }}>
              Logged in as <strong>{user?.name || "Citizen"}</strong> ({user?.email || "rajesh.sharma@example.gov.in"})
            </p>
          </div>

          <Link href="/request/eligibility" className="btn-file-primary">
            + File a new RTI
          </Link>
        </div>

        {/* 2-Column Case-Focused View */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.3fr", gap: "24px", alignItems: "start" }}>
          {/* LEFT: Applications List */}
          <div style={{ display: "grid", gap: "12px" }}>
            {applications.map((app) => {
              const isSelected = selectedApp?.id === app.id;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  style={{
                    background: isSelected ? "var(--neutral-100)" : "#ffffff",
                    border: isSelected ? "2px solid var(--gov-navy-900)" : "1px solid var(--neutral-200)",
                    borderRadius: "var(--radius-md)",
                    padding: "16px 18px",
                    cursor: "pointer",
                    boxShadow: "var(--shadow-sm)",
                    transition: "all 0.15s ease"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <strong style={{ font: "700 0.96rem var(--font-number)", color: "var(--gov-navy-950)" }}>
                      {app.regNo}
                    </strong>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: "var(--radius-xs)",
                        background:
                          app.status === "RESPONSE_ISSUED" || app.status === "DISPOSED_SATISFIED"
                            ? "var(--forest-100)"
                            : app.status === "ACTION_DOC_REQUIRED" || app.status === "ADDITIONAL_FEE_REQUIRED"
                            ? "var(--saffron-100)"
                            : "var(--neutral-200)",
                        color:
                          app.status === "RESPONSE_ISSUED" || app.status === "DISPOSED_SATISFIED"
                            ? "var(--forest-700)"
                            : app.status === "ACTION_DOC_REQUIRED" || app.status === "ADDITIONAL_FEE_REQUIRED"
                            ? "var(--saffron-600)"
                            : "var(--neutral-800)"
                      }}
                    >
                      {app.status.replace(/_/g, " ")}
                    </span>
                  </div>

                  <div style={{ fontSize: "0.92rem", fontWeight: 600, color: "var(--neutral-800)", margin: "0 0 6px" }}>
                    {app.subject}
                  </div>

                  <div style={{ fontSize: "0.78rem", color: "var(--neutral-500)", display: "flex", justifyContent: "space-between" }}>
                    <span>{app.publicAuthority}</span>
                    <span>Filed: {app.filingDate}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Detailed Case Inspection & Action Panel */}
          {selectedApp && (
            <div style={{ background: "#ffffff", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-lg)", padding: "24px 28px", boxShadow: "var(--shadow-sm)" }}>
              <div style={{ borderBottom: "1px solid var(--neutral-200)", paddingBottom: "14px", marginBottom: "16px" }}>
                <span style={{ fontSize: "0.74rem", color: "var(--neutral-500)", textTransform: "uppercase", fontWeight: 700 }}>
                  Application Reference
                </span>
                <h2 style={{ font: "700 1.35rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "2px 0 4px" }}>
                  {selectedApp.regNo}
                </h2>
                <div style={{ fontSize: "0.84rem", color: "var(--neutral-600)" }}>
                  {selectedApp.publicAuthority} · {selectedApp.ministry}
                </div>
              </div>

              {/* ACTION NOTICE (IF FEE OR DOC REQUIRED) */}
              {selectedApp.status === "ADDITIONAL_FEE_REQUIRED" && (
                <div style={{ background: "var(--saffron-50)", border: "1px solid var(--saffron-500)", borderRadius: "var(--radius-sm)", padding: "14px", marginBottom: "18px" }}>
                  <strong style={{ color: "var(--saffron-600)", display: "block", fontSize: "0.88rem", marginBottom: "2px" }}>
                    Additional Photocopy Fee Notice
                  </strong>
                  <p style={{ margin: "0 0 8px", fontSize: "0.82rem", color: "var(--neutral-700)" }}>
                    CPIO has requested ₹{selectedApp.additionalFeeAmount || 24} for {selectedApp.photocopyPages || 12} physical pages (@ ₹2/page under RTI Rules 2012).
                  </p>
                  <button
                    type="button"
                    className="btn-hero-primary"
                    onClick={() => handleFeeSettlement(selectedApp.id)}
                    disabled={isProcessing}
                    style={{ padding: "6px 14px", fontSize: "0.82rem" }}
                  >
                    Pay ₹{selectedApp.additionalFeeAmount || 24} Online →
                  </button>
                </div>
              )}

              {selectedApp.status === "ACTION_DOC_REQUIRED" && (
                <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-300)", borderRadius: "var(--radius-sm)", padding: "14px", marginBottom: "18px" }}>
                  <strong style={{ color: "var(--gov-navy-950)", display: "block", fontSize: "0.88rem", marginBottom: "2px" }}>
                    Clarification / Document Requested
                  </strong>
                  <p style={{ margin: "0 0 8px", fontSize: "0.82rem", color: "var(--neutral-700)" }}>
                    {selectedApp.docRequestReason || "Please upload certified proof of applicant registration slip."}
                  </p>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setClarificationFile(e.target.files[0].name);
                      }
                    }}
                    style={{ fontSize: "0.8rem", marginBottom: "6px" }}
                  />
                  <br />
                  <button
                    type="button"
                    className="btn-file-primary"
                    onClick={() => handleClarificationUpload(selectedApp.id)}
                    disabled={isProcessing}
                    style={{ padding: "6px 12px", fontSize: "0.8rem" }}
                  >
                    Submit Document →
                  </button>
                </div>
              )}

              {/* RESPONSE DOWNLOAD (IF COMPLETED) */}
              {selectedApp.responseDocUrl && (
                <div style={{ background: "var(--forest-50)", border: "1px solid var(--forest-600)", borderRadius: "var(--radius-sm)", padding: "14px", marginBottom: "18px" }}>
                  <strong style={{ color: "var(--forest-700)", display: "block", fontSize: "0.88rem", marginBottom: "2px" }}>
                    Official CPIO Response Order Issued
                  </strong>
                  <p style={{ margin: "0 0 8px", fontSize: "0.82rem", color: "var(--neutral-700)" }}>
                    The signed response order is available for inspection and download.
                  </p>
                  <button
                    type="button"
                    onClick={() => alert(`Downloading official response PDF: ${selectedApp.responseDocUrl}`)}
                    style={{ padding: "6px 14px", background: "var(--forest-700)", color: "#ffffff", border: 0, borderRadius: "var(--radius-sm)", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", marginRight: "10px" }}
                  >
                    Download Response (PDF)
                  </button>
                  <Link href={`/appeal/new?regNo=${encodeURIComponent(selectedApp.regNo)}`} style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--gov-navy-900)" }}>
                    Not satisfied? File First Appeal →
                  </Link>
                </div>
              )}

              {/* QUIET VERTICAL TIMELINE */}
              <div style={{ marginTop: "16px" }}>
                <h4 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--gov-navy-950)", margin: "0 0 10px" }}>
                  Application progress
                </h4>
                <div style={{ display: "grid", gap: "10px", paddingLeft: "8px", borderLeft: "2px solid var(--neutral-200)" }}>
                  {selectedApp.timeline?.map((h, i) => (
                    <div key={i} style={{ paddingLeft: "10px", position: "relative" }}>
                      <div style={{ position: "absolute", left: "-15px", top: "4px", width: "8px", height: "8px", borderRadius: "50%", background: "var(--gov-navy-900)" }} />
                      <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--gov-navy-950)" }}>{h.title}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--neutral-600)" }}>{h.description}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--neutral-400)" }}>{h.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </PortalPage>
  );
}
