"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";

interface FAQItem {
  q: string;
  a: string;
  category: "BEFORE" | "FEES" | "TIMELINES" | "APPEALS";
}

const faqData: FAQItem[] = [
  {
    category: "BEFORE",
    q: "Is RTI the right tool for my problem?",
    a: "RTI is designed to request existing government records, certified documents, file notes, circulars, and decision logs. It cannot solve personal grievances, order administrative punishments, or demand explanations not already on record. For service complaints, visit CPGRAMS (pgportal.gov.in)."
  },
  {
    category: "BEFORE",
    q: "Which public authority should I choose?",
    a: "Select the specific Central Ministry, Department, or Autonomous Body holding the records. If you are unsure, describe what you need in our Authority Finder, or submit to the nodal Ministry. If held elsewhere, it will be transferred under Section 6(3)."
  },
  {
    category: "BEFORE",
    q: "Can I ask 'why' something happened in an RTI?",
    a: "Under the RTI Act, CPIOs are only obligated to provide information that exists in recorded form (notesheets, files, emails, orders). They are not required to create new justifications, answer hypothetical questions, or give legal opinions."
  },
  {
    category: "FEES",
    q: "How much does an RTI application cost?",
    a: "The statutory application fee for Central Government public authorities is ₹10. Payment can be made online via UPI, Debit Card, or Net Banking."
  },
  {
    category: "FEES",
    q: "Who qualifies for the Below Poverty Line (BPL) exemption?",
    a: "Citizens holding a valid BPL card issued by the competent government authority pay ₹0 application fee. You simply need to check the BPL option and upload a copy of your card."
  },
  {
    category: "FEES",
    q: "What if money was deducted from my account but no RTI number appeared?",
    a: "Visit our 'Payment issue' page and enter your bank reference or UTR number. The system will verify the banking settlement and retrieve your registration receipt."
  },
  {
    category: "TIMELINES",
    q: "How long does the public authority have to respond?",
    a: "Under Section 7(1), the CPIO must provide the information or reject the request within 30 days of receipt. For matters concerning life and liberty, the statutory timeline is 48 hours."
  },
  {
    category: "TIMELINES",
    q: "Why was my RTI transferred to another department?",
    a: "If the information sought is closely held by another public authority, the Nodal Officer transfers the application under Section 6(3) within 5 days. You do not need to pay a second fee."
  },
  {
    category: "APPEALS",
    q: "When can I file a First Appeal?",
    a: "You can file a First Appeal under Section 19(1) if you receive no response within 30 days, or if the information provided was incomplete, evasive, or wrongly denied."
  },
  {
    category: "APPEALS",
    q: "Is there a fee for filing a First Appeal?",
    a: "No. Filing a First Appeal with the First Appellate Authority (FAA) is completely free of cost."
  }
];

export default function FaqPage() {
  const [selectedCat, setSelectedCat] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  const filtered = faqData.filter((item) => {
    const matchesCat = selectedCat === "ALL" || item.category === selectedCat;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    return matchesCat && matchesSearch;
  });

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 0 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Frequently asked questions</span>
        </div>

        <div style={{ maxWidth: "760px", marginBottom: "32px" }}>
          <h1 style={{ font: "700 2.2rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            Frequently asked questions
          </h1>
          <p style={{ color: "var(--neutral-600)", fontSize: "0.95rem", lineHeight: "1.6", margin: 0 }}>
            Clear answers on how the Right to Information Act works, fee rules, response timelines, and appeal procedures.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          {[
            { id: "ALL", label: "All Questions" },
            { id: "BEFORE", label: "Before Filing" },
            { id: "FEES", label: "Fees & Exemptions" },
            { id: "TIMELINES", label: "Timelines & Processing" },
            { id: "APPEALS", label: "First Appeals" }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              style={{
                background: selectedCat === cat.id ? "var(--gov-navy-900)" : "#ffffff",
                color: selectedCat === cat.id ? "#ffffff" : "var(--neutral-700)",
                border: "1px solid var(--neutral-300)",
                borderRadius: "var(--radius-sm)",
                padding: "6px 12px",
                fontSize: "0.82rem",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Questions Accordion / List */}
        <div style={{ display: "grid", gap: "14px", maxWidth: "760px" }}>
          {filtered.map((item, i) => (
            <div
              key={i}
              style={{ background: "#ffffff", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-md)", padding: "20px 24px", boxShadow: "var(--shadow-sm)" }}
            >
              <h3 style={{ font: "700 1.05rem var(--font-serif)", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
                {item.q}
              </h3>
              <p style={{ fontSize: "0.88rem", color: "var(--neutral-700)", margin: 0, lineHeight: "1.6" }}>
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </main>
    </PortalPage>
  );
}
