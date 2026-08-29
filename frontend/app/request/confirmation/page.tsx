"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { useAuth } from "../../../lib/auth-context";
import { 
  CheckCircle2, 
  Printer, 
  Download, 
  FileText, 
  Clock, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const regNo = searchParams.get("regNo") || "DOPT/R/2026/04812";
  const { getApplicationByRegNo, applications } = useAuth();

  const app = getApplicationByRegNo(regNo) || applications[0] || {
    regNo: regNo,
    filingDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    publicAuthority: "Department of Personnel & Training (DoPT)",
    ministry: "Ministry of Personnel, Public Grievances and Pensions",
    subject: "Certified copies of service rules and recruitment vacancy notesheets",
    feePaid: 10,
    paymentMode: "Internet Banking / UPI (SBI Collect)",
    paymentRef: "SBI-UPI-884910294",
    applicantName: "Rajesh Sharma",
    applicantEmail: "rajesh.sharma@example.gov.in",
    applicantMobile: "9876543210",
    statutoryWindowDays: 30,
    expectedDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    nodalOfficerRouting: "RTI Nodal Cell, North Block, New Delhi"
  };

  return (
    <main className="wrap" style={{ padding: "32px 0 80px" }}>
      
      {/* SCREEN CONTROLS (Hidden during print) */}
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div className="bread" style={{ margin: 0 }}>
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/request/eligibility">Request</Link>
          <span>›</span>
          <span>Filing Acknowledgement</span>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="button"
            onClick={() => window.print()}
            style={{
              background: "#0f2942",
              color: "#ffffff",
              border: 0,
              padding: "8px 18px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: 800,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 2px 4px rgba(0,0,0,0.15)"
            }}
          >
            <Printer size={15} />
            Print Official Acknowledgement (PDF)
          </button>

          <Link
            href={`/status?regNo=${encodeURIComponent(app.regNo)}`}
            style={{
              background: "#ffffff",
              color: "#0f2942",
              border: "1.5px solid #cbd5e1",
              padding: "8px 16px",
              borderRadius: "6px",
              fontSize: "0.84rem",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            Track Status →
          </Link>
        </div>
      </div>

      {/* SUCCESS CONFIRMATION ALERT (Screen only) */}
      <div className="no-print" style={{ background: "#ecfdf5", border: "1.5px solid #10b981", borderRadius: "8px", padding: "16px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "14px" }}>
        <CheckCircle2 size={28} color="#059669" />
        <div>
          <strong style={{ color: "#065f46", fontSize: "0.98rem", display: "block" }}>
            RTI Application Submitted Successfully
          </strong>
          <span style={{ color: "#047857", fontSize: "0.84rem" }}>
            Your request has been registered with Unique Registration Number: <strong>{app.regNo}</strong>. An email and SMS confirmation has been dispatched.
          </span>
        </div>
      </div>

      {/* OFFICIAL GOVERNMENT OF INDIA FILING ACKNOWLEDGEMENT RECEIPT (PRINTABLE PDF TEMPLATE) */}
      <div
        id="official-receipt"
        style={{
          background: "#ffffff",
          border: "2px solid #071626",
          borderRadius: "4px",
          padding: "36px 44px",
          maxWidth: "800px",
          margin: "0 auto",
          color: "#000000",
          fontFamily: "var(--font-serif, Georgia, serif)",
          lineHeight: 1.6,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
        }}
      >
        {/* RECEIPT HEADER */}
        <div style={{ textAlign: "center", borderBottom: "2px solid #000000", paddingBottom: "14px", marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <img 
              src="/images/gandhi-emblem.jpg" 
              alt="Government Emblem Seal" 
              style={{ width: "48px", height: "48px", borderRadius: "50%", border: "1.5px solid #000000" }} 
            />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.04em", color: "#071626" }}>
                Government of India · भारत सरकार
              </div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155", textTransform: "uppercase" }}>
                RTI Online Central Portal (Section 6(1) of RTI Act, 2005)
              </div>
            </div>
          </div>
          <div style={{ fontSize: "0.95rem", fontWeight: 800, textDecoration: "underline", textTransform: "uppercase", marginTop: "8px" }}>
            Official Filing Acknowledgement & Fee Receipt
          </div>
        </div>

        {/* REGISTRATION & DATE STRIP */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "#f8fafc", border: "1px solid #000000", padding: "10px 16px", marginBottom: "20px", fontSize: "0.88rem" }}>
          <div>
            <strong>RTI Registration Number:</strong><br />
            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#071626", fontFamily: "var(--font-number, monospace)" }}>
              {app.regNo}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <strong>Date of Submission:</strong><br />
            <span>{app.filingDate}</span>
          </div>
        </div>

        {/* DETAILS TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px", fontSize: "0.88rem" }}>
          <tbody>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", width: "35%", fontWeight: 700 }}>1. Name of Applicant:</td>
              <td style={{ padding: "8px 4px" }}>{app.applicantName}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>2. Public Authority:</td>
              <td style={{ padding: "8px 4px" }}><strong>{app.publicAuthority}</strong></td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>3. Parent Ministry / Dept:</td>
              <td style={{ padding: "8px 4px" }}>{app.ministry}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>4. Subject Matter:</td>
              <td style={{ padding: "8px 4px" }}><em>{app.subject}</em></td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>5. Fee Payment Details:</td>
              <td style={{ padding: "8px 4px" }}>
                ₹{app.feePaid}/- (Rupees Ten Only) · Paid via {app.paymentMode}<br />
                <span style={{ fontSize: "0.78rem", color: "#475569" }}>Transaction Reference: {app.paymentRef}</span>
              </td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>6. Nodal Cell Assigned:</td>
              <td style={{ padding: "8px 4px" }}>{app.nodalOfficerRouting}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>7. Statutory Response Date:</td>
              <td style={{ padding: "8px 4px" }}>
                <strong>{app.expectedDate}</strong> (30 Days as per Section 7(1))
              </td>
            </tr>
          </tbody>
        </table>

        {/* STATUTORY NOTICE & CITIZEN RIGHTS */}
        <div style={{ border: "1px solid #64748b", padding: "12px 16px", borderRadius: "2px", background: "#fdfefe", fontSize: "0.78rem", lineHeight: 1.5, marginBottom: "24px" }}>
          <strong>Statutory Instructions for the Applicant:</strong>
          <ol style={{ paddingLeft: "18px", margin: "4px 0 0" }}>
            <li>Please quote your RTI Registration Number (<strong>{app.regNo}</strong>) in all future correspondence.</li>
            <li>The Central Public Information Officer (CPIO) is mandated to provide information within 30 days from receipt.</li>
            <li>If the information is not received within the statutory period, or if you are aggrieved by the decision, you may file a <strong>First Appeal under Section 19(1)</strong> within 30 days free of cost.</li>
          </ol>
        </div>

        {/* SIGN OFF STRIP */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "14px", borderTop: "1px solid #000000", fontSize: "0.8rem" }}>
          <div>
            <strong>RTI Online Portal System Generated Receipt</strong><br />
            <span>NIC / DoPT Central Infrastructure</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "inline-block", border: "1px dashed #000000", padding: "4px 10px", fontSize: "0.72rem", fontWeight: 800 }}>
              AUTHENTIC ELECTRONIC RECEIPT<br />NO PHYSICAL SIGNATURE REQUIRED
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "40px 0" }}>Loading acknowledgement...</div>}>
        <ConfirmationContent />
      </Suspense>
    </PortalPage>
  );
}
