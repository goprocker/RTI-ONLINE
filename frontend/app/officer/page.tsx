"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";
import { useAuth } from "../../lib/auth-context";
import { RTIApplication } from "../../types/rti";

export default function OfficerAdminDashboardPage() {
  const { applications, payAdditionalFee, uploadClarificationDoc } = useAuth();

  const [selectedRole, setSelectedRole] = useState<"NODAL" | "CPIO">("NODAL");
  const [selectedMinistry, setSelectedMinistry] = useState("ALL");
  const [selectedApp, setSelectedApp] = useState<RTIApplication | null>(applications[0] || null);

  // Officer Action Modal States
  const [actionType, setActionType] = useState<"ASSIGN" | "TRANSFER" | "FEE" | "DOC" | "DISPOSE" | null>(null);
  const [assignCpioName, setAssignCpioName] = useState("Shri A. K. Verma, Deputy Secretary & CPIO");
  const [transferTarget, setTransferTarget] = useState("Department of Revenue (GST Secretariat)");
  const [feePages, setFeePages] = useState("12");
  const [docReason, setDocReason] = useState("Please provide clear copy of Candidate Admit Card / Registration Slip to confirm identity.");
  const [responseSummary, setResponseSummary] = useState("The requested official citizen charter and escalation records are enclosed herewith.");

  const filteredApps = applications.filter((app) => {
    if (selectedMinistry !== "ALL" && !app.ministry.includes(selectedMinistry)) {
      return false;
    }
    return true;
  });

  const totalInflow = applications.length;
  const pendingScrutiny = applications.filter((a) => a.status === "SUBMITTED").length;
  const withCpio = applications.filter((a) => a.status === "UNDER_PROCESS" || a.status === "TRANSFERRED").length;
  const actionDemanded = applications.filter((a) => a.status === "ACTION_DOC_REQUIRED" || a.status === "ADDITIONAL_FEE_REQUIRED").length;
  const disposedCount = applications.filter((a) => a.status === "RESPONSE_ISSUED" || a.status === "DISPOSED_SATISFIED").length;

  function executeOfficerAction() {
    if (!selectedApp) return;

    if (actionType === "ASSIGN") {
      alert(`Application ${selectedApp.regNo} assigned electronically to ${assignCpioName}. Forwarding acknowledgement transmitted.`);
    } else if (actionType === "TRANSFER") {
      alert(`Application ${selectedApp.regNo} transferred under Section 6(3) to ${transferTarget}. Nodal officer of receiving department notified.`);
    } else if (actionType === "FEE") {
      const pages = parseInt(feePages) || 10;
      const amount = pages * 2;
      alert(`Demand notice for ₹${amount} (${pages} pages @ ₹2/page) dispatched via SMS & Email to ${selectedApp.applicantEmail}. Statutory clock paused.`);
    } else if (actionType === "DOC") {
      alert(`Clarification request transmitted to ${selectedApp.applicantName}. Applicant dashboard updated with document upload action.`);
    } else if (actionType === "DISPOSE") {
      alert(`Official CPIO Statutory Response Order furnished for ${selectedApp.regNo}. Case marked DISPOSED. Digital copy available to applicant.`);
    }

    setActionType(null);
  }

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "36px 0 80px" }}>
        {/* Officer Header Bar */}
        <div style={{ background: "linear-gradient(135deg, var(--gov-navy-950) 0%, #071f3a 100%)", color: "#ffffff", borderRadius: "var(--radius-xl)", padding: "28px 34px", marginBottom: "28px", boxShadow: "var(--shadow-xl)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p className="eyebrow" style={{ color: "#fde68a", marginBottom: "4px" }}>
                <span className="eyebrow-line" style={{ background: "#fde68a" }} />
                CENTRAL RTI MANAGEMENT SYSTEM · GOVERNMENT OF INDIA
              </p>
              <h1 style={{ font: "700 2rem var(--font-serif)", color: "#ffffff", margin: "0 0 6px" }}>
                Officer Scrutiny & CPIO Workbench
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "0.86rem", color: "#cbd5e1" }}>
                <span>Official Node: <strong>admin-rti.reeganlabs.com</strong></span>
                <span>·</span>
                <span>Active Officer: <strong>Shri R. K. Mathur (Nodal Cell)</strong></span>
              </div>
            </div>

            {/* Role Switcher Pill */}
            <div style={{ background: "rgba(255,255,255,0.1)", padding: "4px", borderRadius: "var(--radius-full)", display: "flex", gap: "4px", border: "1px solid rgba(255,255,255,0.2)" }}>
              <button
                type="button"
                onClick={() => setSelectedRole("NODAL")}
                style={{
                  background: selectedRole === "NODAL" ? "#ffffff" : "transparent",
                  color: selectedRole === "NODAL" ? "var(--gov-navy-950)" : "#ffffff",
                  border: 0,
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  cursor: "pointer"
                }}
              >
                🏛️ RTI Nodal Officer Desk
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("CPIO")}
                style={{
                  background: selectedRole === "CPIO" ? "#ffffff" : "transparent",
                  color: selectedRole === "CPIO" ? "var(--gov-navy-950)" : "#ffffff",
                  border: 0,
                  padding: "6px 14px",
                  borderRadius: "var(--radius-full)",
                  fontSize: "0.78rem",
                  fontWeight: 800,
                  cursor: "pointer"
                }}
              >
                ✍️ Concerned CPIO Desk
              </button>
            </div>
          </div>
        </div>

        {/* 5 Real-Time Inflow Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: "16px", marginBottom: "32px" }}>
          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "18px 20px", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--neutral-500)", textTransform: "uppercase" }}>TOTAL INFLOW</span>
            <div style={{ font: "700 2rem var(--font-number)", color: "var(--gov-navy-950)", margin: "4px 0" }}>{totalInflow}</div>
            <span style={{ fontSize: "0.72rem", color: "var(--neutral-500)" }}>Electronic requests filed</span>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #bfdbfe", borderRadius: "var(--radius-lg)", padding: "18px 20px", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--gov-blue-600)", textTransform: "uppercase" }}>PENDING NODAL SCRUTINY</span>
            <div style={{ font: "700 2rem var(--font-number)", color: "var(--gov-blue-600)", margin: "4px 0" }}>{pendingScrutiny}</div>
            <span style={{ fontSize: "0.72rem", color: "var(--neutral-500)" }}>Awaiting initial triage</span>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "18px 20px", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--gov-navy-800)", textTransform: "uppercase" }}>WITH CPIO (IN PROCESS)</span>
            <div style={{ font: "700 2rem var(--font-number)", color: "var(--gov-navy-850)", margin: "4px 0" }}>{withCpio}</div>
            <span style={{ fontSize: "0.72rem", color: "var(--neutral-500)" }}>Under record retrieval</span>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #fcd34d", borderRadius: "var(--radius-lg)", padding: "18px 20px", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--amber-600)", textTransform: "uppercase" }}>ACTION DEMANDED</span>
            <div style={{ font: "700 2rem var(--font-number)", color: "var(--amber-600)", margin: "4px 0" }}>{actionDemanded}</div>
            <span style={{ fontSize: "0.72rem", color: "var(--neutral-500)" }}>Fee / Document notices</span>
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #a7f3d0", borderRadius: "var(--radius-lg)", padding: "18px 20px", boxShadow: "var(--shadow-sm)" }}>
            <span style={{ fontSize: "0.7rem", fontWeight: 800, color: "var(--forest-600)", textTransform: "uppercase" }}>DISPOSED / REPLIED</span>
            <div style={{ font: "700 2rem var(--font-number)", color: "var(--forest-600)", margin: "4px 0" }}>{disposedCount}</div>
            <span style={{ fontSize: "0.72rem", color: "var(--neutral-500)" }}>Statutory orders issued</span>
          </div>
        </div>

        {/* 2-Column Split: Inflow Queue (Left) vs Application Details & Action Suite (Right) */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.3fr", gap: "28px", alignItems: "start" }}>
          {/* LEFT: Applications Inflow List */}
          <div style={{ background: "#ffffff", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "24px", boxShadow: "var(--shadow-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h2 style={{ font: "700 1.25rem var(--font-serif)", color: "var(--gov-navy-950)", margin: 0 }}>
                Incoming RTI Queue ({filteredApps.length})
              </h2>
              <span style={{ fontSize: "0.78rem", color: "var(--neutral-500)" }}>
                Click to inspect & take statutory action
              </span>
            </div>

            <div style={{ display: "grid", gap: "12px" }}>
              {filteredApps.map((app) => {
                const isSelected = selectedApp?.id === app.id;
                const isUrgent = app.remainingDays <= 5 && app.remainingDays > 0;
                return (
                  <div
                    key={app.id}
                    onClick={() => setSelectedApp(app)}
                    style={{
                      background: isSelected ? "var(--gov-blue-50)" : "#ffffff",
                      border: isSelected ? "2px solid var(--gov-blue-600)" : "1px solid var(--neutral-200)",
                      borderRadius: "var(--radius-md)",
                      padding: "16px",
                      cursor: "pointer",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <strong style={{ font: "700 1.05rem var(--font-number)", color: "var(--gov-navy-950)" }}>
                        {app.regNo}
                      </strong>

                      {/* Statutory Traffic Light */}
                      {app.remainingDays > 0 ? (
                        <span
                          style={{
                            background: isUrgent ? "#fee2e2" : app.remainingDays <= 15 ? "#fef3c7" : "#ecfdf5",
                            color: isUrgent ? "#991b1b" : app.remainingDays <= 15 ? "#92400e" : "#065f46",
                            border: isUrgent ? "1px solid #fca5a5" : "1px solid transparent",
                            fontSize: "0.72rem",
                            fontWeight: 800,
                            padding: "2px 8px",
                            borderRadius: "var(--radius-full)"
                          }}
                        >
                          ⏱️ {app.remainingDays} days left {isUrgent && "🚨"}
                        </span>
                      ) : (
                        <span style={{ background: "var(--forest-100)", color: "var(--forest-700)", fontSize: "0.72rem", fontWeight: 800, padding: "2px 8px", borderRadius: "var(--radius-full)" }}>
                          ✓ Disposed
                        </span>
                      )}
                    </div>

                    <h4 style={{ font: "700 0.96rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 4px" }}>
                      {app.subject}
                    </h4>

                    <div style={{ fontSize: "0.78rem", color: "var(--neutral-600)", display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                      <span>Applicant: <strong>{app.applicantName}</strong></span>
                      <span>Fee: ₹{app.feePaid} ({app.isBPL ? "BPL Waived" : "Paid"})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Detailed Inspection & Officer Action Workbench */}
          {selectedApp ? (
            <div style={{ background: "#ffffff", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "30px", boxShadow: "var(--shadow-lg)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--neutral-200)", paddingBottom: "16px", marginBottom: "20px" }}>
                <div>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--gov-blue-600)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    RTI FILE DOSSIER
                  </span>
                  <h3 style={{ font: "700 1.5rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "2px 0" }}>
                    {selectedApp.regNo}
                  </h3>
                  <div style={{ fontSize: "0.82rem", color: "var(--neutral-600)" }}>
                    Filing Date: {selectedApp.filingDate} · Payment Ref: {selectedApp.paymentRef}
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "0.72rem", fontWeight: 800, color: "var(--neutral-500)", textTransform: "uppercase", display: "block" }}>
                    STATUTORY DEADLINE
                  </span>
                  <strong style={{ fontSize: "0.92rem", color: selectedApp.remainingDays <= 5 ? "#dc2626" : "var(--gov-navy-950)" }}>
                    {selectedApp.expectedDate}
                  </strong>
                </div>
              </div>

              {/* Applicant Profile */}
              <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", padding: "14px 18px", marginBottom: "20px", fontSize: "0.85rem" }}>
                <strong style={{ color: "var(--gov-navy-950)", display: "block", marginBottom: "4px" }}>
                  Citizen Applicant Particulars:
                </strong>
                <div>Name: <strong>{selectedApp.applicantName}</strong></div>
                <div>Email: {selectedApp.applicantEmail} | Mobile: +91 {selectedApp.applicantMobile}</div>
                <div>Address: {selectedApp.applicantAddress}</div>
              </div>

              {/* RTI Query Text */}
              <div style={{ marginBottom: "24px" }}>
                <strong style={{ fontSize: "0.92rem", color: "var(--gov-navy-950)", display: "block", marginBottom: "6px" }}>
                  Information Requested by Citizen (Section 6(1)):
                </strong>
                <div style={{ background: "#ffffff", border: "1.5px solid var(--neutral-300)", borderRadius: "var(--radius-md)", padding: "16px", fontSize: "0.88rem", color: "var(--neutral-900)", whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                  {selectedApp.queryText}
                </div>
                {selectedApp.attachedDocName && (
                  <div style={{ marginTop: "8px", fontSize: "0.82rem", color: "var(--gov-blue-600)" }}>
                    📎 Attached Citizen Supporting Document: <strong>{selectedApp.attachedDocName}</strong>
                  </div>
                )}
              </div>

              {/* OFFICER STATUTORY ACTION SUITE */}
              <div style={{ borderTop: "2px solid var(--neutral-200)", paddingTop: "20px" }}>
                <h4 style={{ font: "700 1.1rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 12px" }}>
                  Official Statutory Actions:
                </h4>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  {selectedRole === "NODAL" ? (
                    <>
                      <button
                        type="button"
                        className="btn-primary-action"
                        onClick={() => setActionType("ASSIGN")}
                        style={{ padding: "10px 14px", fontSize: "0.82rem", justifyContent: "center" }}
                      >
                        ➡️ Forward / Assign to CPIO
                      </button>
                      <button
                        type="button"
                        className="btn-secondary-action"
                        onClick={() => setActionType("TRANSFER")}
                        style={{ padding: "10px 14px", fontSize: "0.82rem", justifyContent: "center", color: "var(--gov-blue-600)" }}
                      >
                        ↗️ Transfer under Sec 6(3)
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="btn-primary-action"
                        onClick={() => setActionType("FEE")}
                        style={{ padding: "10px 14px", fontSize: "0.82rem", justifyContent: "center", background: "var(--amber-600)", borderColor: "var(--amber-600)" }}
                      >
                        💰 Demand Additional Photocopy Fee
                      </button>
                      <button
                        type="button"
                        className="btn-secondary-action"
                        onClick={() => setActionType("DOC")}
                        style={{ padding: "10px 14px", fontSize: "0.82rem", justifyContent: "center", color: "#92400e" }}
                      >
                        📄 Request Clarification Document
                      </button>
                      <button
                        type="button"
                        className="btn-primary-action"
                        onClick={() => setActionType("DISPOSE")}
                        style={{ gridColumn: "1 / -1", padding: "12px 14px", fontSize: "0.86rem", justifyContent: "center", background: "var(--forest-600)", borderColor: "var(--forest-700)" }}
                      >
                        ✓ Furnish Response Order & Dispose RTI
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* ACTION MODAL DIALOGS */}
              {actionType && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "grid", placeItems: "center", zIndex: 1000 }}>
                  <div style={{ background: "#ffffff", borderRadius: "var(--radius-xl)", padding: "32px", maxWidth: "540px", width: "90%", boxShadow: "var(--shadow-xl)", animation: "fadeIn 0.2s ease-in" }}>
                    <h3 style={{ font: "700 1.3rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
                      {actionType === "ASSIGN" && "Forward Application to Concerned CPIO"}
                      {actionType === "TRANSFER" && "Transfer Application under Section 6(3)"}
                      {actionType === "FEE" && "Demand Additional Fee (RTI Rules 2012)"}
                      {actionType === "DOC" && "Request Supporting Document from Citizen"}
                      {actionType === "DISPOSE" && "Furnish CPIO Statutory Response Order"}
                    </h3>

                    {actionType === "ASSIGN" && (
                      <div className="form-group">
                        <label htmlFor="cpio-select">Select Concerned CPIO</label>
                        <select id="cpio-select" className="form-control" value={assignCpioName} onChange={(e) => setAssignCpioName(e.target.value)}>
                          <option>Shri A. K. Verma (Deputy Secretary & CPIO, Passport Wing)</option>
                          <option>Smt. Manisha Gupta (Director & CPIO, Exam Branch)</option>
                          <option>Shri S. Ramanathan (Under Secretary & CPIO, Administration)</option>
                        </select>
                      </div>
                    )}

                    {actionType === "TRANSFER" && (
                      <div className="form-group">
                        <label htmlFor="target-min-select">Select Transferee Public Authority</label>
                        <select id="target-min-select" className="form-control" value={transferTarget} onChange={(e) => setTransferTarget(e.target.value)}>
                          <option>Department of Revenue (GST Secretariat)</option>
                          <option>Ministry of Home Affairs (Border Management)</option>
                          <option>Ministry of Railways (Railway Board)</option>
                          <option>Employees&apos; Provident Fund Organisation (EPFO)</option>
                        </select>
                      </div>
                    )}

                    {actionType === "FEE" && (
                      <div>
                        <div className="form-group">
                          <label htmlFor="fee-pages-input">Number of Photocopy Pages (@ ₹2 per page)</label>
                          <input id="fee-pages-input" className="form-control" type="number" value={feePages} onChange={(e) => setFeePages(e.target.value)} />
                        </div>
                        <div style={{ fontSize: "0.85rem", color: "var(--amber-600)", fontWeight: 700 }}>
                          Total Additional Fee Demanded: ₹{(parseInt(feePages) || 0) * 2}
                        </div>
                      </div>
                    )}

                    {actionType === "DOC" && (
                      <div className="form-group">
                        <label htmlFor="doc-clar-reason">Clarification / Document Description</label>
                        <textarea id="doc-clar-reason" className="form-control" rows={4} value={docReason} onChange={(e) => setDocReason(e.target.value)} />
                      </div>
                    )}

                    {actionType === "DISPOSE" && (
                      <div className="form-group">
                        <label htmlFor="disp-summary-text">CPIO Statutory Response Decision Order</label>
                        <textarea id="disp-summary-text" className="form-control" rows={5} value={responseSummary} onChange={(e) => setResponseSummary(e.target.value)} />
                      </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                      <button type="button" className="btn-secondary-action" onClick={() => setActionType(null)}>Cancel</button>
                      <button type="button" className="btn-primary-action" onClick={executeOfficerAction}>
                        Confirm & Execute Statutory Action →
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ background: "#ffffff", border: "1.5px solid var(--neutral-200)", borderRadius: "var(--radius-xl)", padding: "48px", textAlign: "center" }}>
              Select an application from the queue to view details and execute statutory officer actions.
            </div>
          )}
        </div>
      </main>
    </PortalPage>
  );
}
