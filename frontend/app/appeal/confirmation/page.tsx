"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { PortalPage } from "../../../components/portal-shell";
import { useAuth } from "../../../lib/auth-context";
import { 
  CheckCircle2, 
  Printer, 
  Scale, 
  Clock, 
  ArrowRight 
} from "lucide-react";

function AppealConfirmationContent() {
  const searchParams = useSearchParams();
  const appealRegNo = searchParams.get("appealRegNo") || "DOPT/A/2026/00192";
  const rtiRegNo = searchParams.get("regNo") || "DOPT/R/2026/04812";
  const { appeals } = useAuth();

  const appeal = appeals[0] || {
    appealRegNo: appealRegNo,
    originalRtiRegNo: rtiRegNo,
    filingDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
    publicAuthority: "Department of Personnel & Training (DoPT)",
    ministry: "Ministry of Personnel, Public Grievances and Pensions",
    appellateAuthority: "First Appellate Authority (FAA) / Joint Secretary (Estt)",
    groundsOfAppeal: "No response received within statutory 30-day period under Section 7(1)",
    appealDetails: "RTI request was filed on 29 August 2026. 30 statutory days elapsed without CPIO response.",
    statusLabel: "Admitted & Under Scrutiny with FAA"
  };

  return (
    <main className="wrap" style={{ padding: "32px 0 80px" }}>
      
      {/* SCREEN CONTROLS (Hidden during print) */}
      <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
        <div className="bread" style={{ margin: 0 }}>
          <Link href="/">Home</Link>
          <span>›</span>
          <Link href="/appeal">First Appeal</Link>
          <span>›</span>
          <span>Appeal Acknowledgement</span>
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
            Print Appeal Acknowledgement (PDF)
          </button>

          <Link
            href={`/status?regNo=${encodeURIComponent(appeal.appealRegNo)}`}
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
            Track Appeal Status →
          </Link>
        </div>
      </div>

      {/* SUCCESS BANNER */}
      <div className="no-print" style={{ background: "#ecfdf5", border: "1.5px solid #10b981", borderRadius: "8px", padding: "16px 20px", marginBottom: "24px", display: "flex", alignItems: "center", gap: "14px" }}>
        <CheckCircle2 size={28} color="#059669" />
        <div>
          <strong style={{ color: "#065f46", fontSize: "0.98rem", display: "block" }}>
            First Appeal Admitted Successfully (Section 19(1))
          </strong>
          <span style={{ color: "#047857", fontSize: "0.84rem" }}>
            Your appeal has been registered with Number: <strong>{appeal.appealRegNo}</strong> (Original RTI: {appeal.originalRtiRegNo}) at ₹0 statutory fee.
          </span>
        </div>
      </div>

      {/* OFFICIAL GOVERNMENT OF INDIA FIRST APPEAL ACKNOWLEDGEMENT (PRINTABLE PDF TEMPLATE) */}
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
        {/* HEADER */}
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
                Office of the First Appellate Authority (FAA) · Section 19(1) of RTI Act, 2005
              </div>
            </div>
          </div>
          <div style={{ fontSize: "0.95rem", fontWeight: 800, textDecoration: "underline", textTransform: "uppercase", marginTop: "8px" }}>
            First Appeal Filing Acknowledgement
          </div>
        </div>

        {/* REGISTRATION STRIP */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", background: "#f8fafc", border: "1px solid #000000", padding: "10px 16px", marginBottom: "20px", fontSize: "0.88rem" }}>
          <div>
            <strong>First Appeal Reg Number:</strong><br />
            <span style={{ fontSize: "1.05rem", fontWeight: 800, color: "#071626", fontFamily: "var(--font-number, monospace)" }}>
              {appeal.appealRegNo}
            </span>
          </div>
          <div style={{ textAlign: "right" }}>
            <strong>Original RTI Number:</strong><br />
            <span style={{ fontFamily: "var(--font-number, monospace)", fontWeight: 700 }}>{appeal.originalRtiRegNo}</span>
          </div>
        </div>

        {/* DETAILS TABLE */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px", fontSize: "0.88rem" }}>
          <tbody>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", width: "35%", fontWeight: 700 }}>1. Date of Appeal Filing:</td>
              <td style={{ padding: "8px 4px" }}>{appeal.filingDate}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>2. Public Authority:</td>
              <td style={{ padding: "8px 4px" }}><strong>{appeal.publicAuthority}</strong></td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>3. First Appellate Authority:</td>
              <td style={{ padding: "8px 4px" }}>{appeal.appellateAuthority}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>4. Grounds of Appeal:</td>
              <td style={{ padding: "8px 4px" }}>{appeal.groundsOfAppeal}</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>5. Statutory Appeal Fee:</td>
              <td style={{ padding: "8px 4px" }}>₹0/- (Exempt under Section 19 of RTI Rules)</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #cbd5e1" }}>
              <td style={{ padding: "8px 4px", fontWeight: 700 }}>6. Statutory Disposal Period:</td>
              <td style={{ padding: "8px 4px" }}>
                <strong>30 to 45 Days</strong> as per Section 19(6) of the RTI Act, 2005.
              </td>
            </tr>
          </tbody>
        </table>

        {/* NOTICE */}
        <div style={{ border: "1px solid #64748b", padding: "12px 16px", borderRadius: "2px", background: "#fdfefe", fontSize: "0.78rem", lineHeight: 1.5, marginBottom: "24px" }}>
          <strong>Statutory Notes:</strong>
          <ol style={{ paddingLeft: "18px", margin: "4px 0 0" }}>
            <li>The First Appellate Authority shall give an opportunity of hearing to the appellant before passing an order.</li>
            <li>If aggrieved by the order of the FAA, a <strong>Second Appeal</strong> may be filed before the Central Information Commission (CIC) within <strong>90 days</strong> under Section 19(3).</li>
          </ol>
        </div>

        {/* SIGN OFF */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", paddingTop: "14px", borderTop: "1px solid #000000", fontSize: "0.8rem" }}>
          <div>
            <strong>RTI Online Quasi-Judicial Appeal Registry</strong><br />
            <span>Government of India</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ display: "inline-block", border: "1px dashed #000000", padding: "4px 10px", fontSize: "0.72rem", fontWeight: 800 }}>
              AUTHENTIC ELECTRONIC RECEIPT<br />SECTION 19(1) ACKNOWLEDGEMENT
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function AppealConfirmationPage() {
  return (
    <PortalPage>
      <Suspense fallback={<div className="wrap" style={{ padding: "40px 0" }}>Loading appeal acknowledgement...</div>}>
        <AppealConfirmationContent />
      </Suspense>
    </PortalPage>
  );
}
