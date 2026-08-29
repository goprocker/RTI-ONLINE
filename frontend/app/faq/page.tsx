"use client";

import Link from "next/link";
import { useState } from "react";
import { PortalPage } from "../../components/portal-shell";

interface FAQItem {
  category: "BEFORE" | "FEES" | "AFTER" | "APPEALS";
  q: string;
  a: string;
}

const faqItems: FAQItem[] = [
  {
    category: "BEFORE",
    q: "Who can file an RTI request?",
    a: "Under Section 3 of the Right to Information Act, 2005, any citizen of India can file an RTI request to access records held by public authorities."
  },
  {
    category: "BEFORE",
    q: "Can I file an RTI for State Government departments on this portal?",
    a: "No. This portal handles Central Government Ministries, Departments, and Central Public Authorities (e.g. Passports, Railways, EPFO, Nationalised Banks, CBSE). For State Police, Municipal Corporations, or District Collectors, visit your respective State RTI Portal or use our Offline RTI Generator."
  },
  {
    category: "BEFORE",
    q: "What is the difference between an RTI and a Public Grievance?",
    a: "An RTI is used to obtain certified copies of existing government files, decisions, notesheets, and circulars. It cannot take punitive action or resolve personal disputes. For service complaints and redressal, use the National CPGRAMS portal (pgportal.gov.in)."
  },
  {
    category: "FEES",
    q: "How much does it cost to file an RTI?",
    a: "The standard application fee is ₹10. Citizens belonging to the Below Poverty Line (BPL) category are exempt from all application and photocopy fees upon uploading their BPL card/certificate."
  },
  {
    category: "FEES",
    q: "What if money was debited from my account but no registration number was generated?",
    a: "Banking gateways reconcile pending transactions every 15–30 minutes. Visit our 'Payment Issue' tool and enter your bank reference/UTR number to retrieve your confirmed registration number."
  },
  {
    category: "AFTER",
    q: "How long does a public authority have to respond?",
    a: "Under Section 7(1), the Central Public Information Officer (CPIO) must furnish information within 30 calendar days from the date of receipt. For matters concerning life or liberty, the statutory limit is 48 hours."
  },
  {
    category: "AFTER",
    q: "Why was my application transferred to another department?",
    a: "If the information sought is closely held by another Ministry or Public Authority, Section 6(3) mandates that the Nodal Officer transfer the application within 5 days. You do not need to pay a fresh fee."
  },
  {
    category: "APPEALS",
    q: "When can I file a First Appeal?",
    a: "You can file a First Appeal under Section 19(1) if you did not receive a reply within 30 days, if your request was rejected, or if the information provided was incomplete. First Appeals are completely free of cost."
  },
  {
    category: "APPEALS",
    q: "Who hears the First Appeal?",
    a: "The First Appeal is heard by a designated officer senior in rank to the CPIO, called the First Appellate Authority (FAA), who must issue a quasi-judicial decision order within 30 to 45 days."
  }
];

export default function FAQPage() {
  const [filterCat, setFilterCat] = useState<string>("ALL");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filtered = faqItems.filter(
    (item) => filterCat === "ALL" || item.category === filterCat
  );

  return (
    <PortalPage>
      <main className="wrap" style={{ padding: "40px 20px 80px" }}>
        <div className="bread">
          <Link href="/">Home</Link>
          <span>›</span>
          <span>Frequently asked questions</span>
        </div>

        <div className="form-wrap">
          <h1 style={{ fontSize: "1.875rem", color: "var(--gov-navy-950)", margin: "0 0 8px" }}>
            Frequently asked questions
          </h1>
          <p style={{ fontSize: "0.9375rem", color: "var(--neutral-600)", lineHeight: "1.5", margin: "0 0 24px" }}>
            Find answers to common questions regarding filing rules, fees, timelines, and appeals under the RTI Act, 2005.
          </p>

          {/* Category Filter Tabs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
            {[
              { id: "ALL", label: "All questions" },
              { id: "BEFORE", label: "Before filing" },
              { id: "FEES", label: "Fees & payment" },
              { id: "AFTER", label: "Timelines & status" },
              { id: "APPEALS", label: "First Appeal" }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFilterCat(cat.id)}
                style={{
                  background: filterCat === cat.id ? "var(--gov-navy-950)" : "#ffffff",
                  color: filterCat === cat.id ? "#ffffff" : "var(--neutral-700)",
                  border: "1px solid var(--neutral-300)",
                  borderRadius: "var(--radius-full)",
                  padding: "6px 14px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  cursor: "pointer"
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion FAQ List */}
          <div style={{ display: "grid", gap: "10px" }}>
            {filtered.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: "#ffffff",
                    border: "1px solid var(--neutral-200)",
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden"
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "16px 20px",
                      background: "none",
                      border: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textAlign: "left",
                      cursor: "pointer",
                      fontSize: "0.9375rem",
                      fontWeight: 600,
                      color: "var(--gov-navy-950)"
                    }}
                  >
                    <span>{item.q}</span>
                    <span style={{ fontSize: "1.1rem", color: "var(--neutral-400)", marginLeft: "10px" }}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: "0 20px 18px", fontSize: "0.875rem", color: "var(--neutral-700)", lineHeight: "1.6", borderTop: "1px solid var(--neutral-100)" }}>
                      <p style={{ marginTop: "12px", marginBottom: 0 }}>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Need More Help Box */}
          <div style={{ background: "var(--neutral-50)", border: "1px solid var(--neutral-200)", borderRadius: "var(--radius-lg)", padding: "20px", marginTop: "32px", textAlign: "center" }}>
            <strong style={{ fontSize: "0.9375rem", color: "var(--gov-navy-950)", display: "block", marginBottom: "4px" }}>
              Still have questions?
            </strong>
            <p style={{ fontSize: "0.8125rem", color: "var(--neutral-600)", margin: "0 0 12px" }}>
              Browse our step-by-step user guide or reach out to the helpdesk.
            </p>
            <Link href="/manual" style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--gov-blue-600)" }}>
              Read the citizen user manual →
            </Link>
          </div>
        </div>
      </main>
    </PortalPage>
  );
}
