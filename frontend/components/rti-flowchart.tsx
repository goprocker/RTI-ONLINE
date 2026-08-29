"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Maximize2, 
  Download, 
  X, 
  ZoomIn, 
  ZoomOut, 
  ExternalLink,
  Clock,
  ArrowRight,
  ShieldAlert
} from "lucide-react";

export function RtiFlowchart() {
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div style={{ background: "#ffffff", border: "1.5px solid var(--neutral-300, #cbd5e1)", borderRadius: "var(--radius-lg, 10px)", padding: "24px", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}>
      
      {/* SECTION HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px", flexWrap: "wrap", gap: "10px" }}>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#f1f5f9", padding: "2px 8px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 800, color: "#0f2942", marginBottom: "4px" }}>
            <Clock size={12} />
            <span>STATUTORY DECISION TREE & TIME LIMITS</span>
          </div>
          <h3 style={{ font: "800 1.25rem var(--font-serif)", color: "var(--gov-navy-950, #071626)", margin: 0 }}>
            RTI Lifecycle & Escalation Process
          </h3>
          <p style={{ color: "var(--neutral-600, #64748b)", fontSize: "0.82rem", margin: "2px 0 0" }}>
            Official prescribed statutory timelines under Sections 6(1), 6(3), 7(1), 18, and 19 of the RTI Act, 2005.
          </p>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            style={{
              background: "#0f2942",
              color: "#ffffff",
              border: 0,
              padding: "7px 14px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer"
            }}
          >
            <Maximize2 size={13} />
            Expand Full Diagram
          </button>

          <a
            href="/images/rti-process-flowchart.png"
            download="RTI-Statutory-Flowchart.png"
            style={{
              background: "#f8fafc",
              color: "#0f2942",
              border: "1px solid #cbd5e1",
              padding: "7px 12px",
              borderRadius: "6px",
              fontSize: "0.8rem",
              fontWeight: 700,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <Download size={13} />
            Download
          </a>
        </div>
      </div>

      {/* COMPACT IMAGE CARD WITH CLICK-TO-ZOOM */}
      <div 
        onClick={() => setModalOpen(true)}
        style={{
          position: "relative",
          background: "#f8fafc",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          overflow: "hidden",
          cursor: "pointer",
          textAlign: "center",
          padding: "16px 0",
          maxHeight: "360px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <img 
          src="/images/rti-process-flowchart.png" 
          alt="Official Statutory RTI Process Flowchart" 
          style={{ maxWidth: "100%", maxHeight: "330px", objectFit: "contain", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }}
        />
        
        {/* Hover / Click Hint Overlay */}
        <div style={{ position: "absolute", bottom: "10px", right: "12px", background: "rgba(7, 22, 38, 0.85)", color: "#ffffff", padding: "4px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "4px", backdropFilter: "blur(4px)" }}>
          <ZoomIn size={12} />
          <span>Click to Zoom & Inspect</span>
        </div>
      </div>

      {/* QUICK STATUTORY TIME LIMITS STRIP */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px", marginTop: "16px" }}>
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px 12px" }}>
          <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}>SECTION 7(1)</div>
          <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#071626" }}>30 Days</div>
          <div style={{ fontSize: "0.72rem", color: "#475569" }}>CPIO Response Period</div>
        </div>

        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px 12px" }}>
          <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}>SECTION 6(3)</div>
          <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#071626" }}>5 Days</div>
          <div style={{ fontSize: "0.72rem", color: "#475569" }}>Inter-Dept Transfer</div>
        </div>

        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px 12px" }}>
          <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}>SECTION 19(6)</div>
          <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#071626" }}>45 Days</div>
          <div style={{ fontSize: "0.72rem", color: "#475569" }}>First Appeal Disposal</div>
        </div>

        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "8px 12px" }}>
          <div style={{ fontSize: "0.7rem", color: "#64748b", fontWeight: 700 }}>SECTION 19(3)</div>
          <div style={{ fontSize: "0.85rem", fontWeight: 800, color: "#071626" }}>90 Days</div>
          <div style={{ fontSize: "0.72rem", color: "#475569" }}>Second Appeal Window</div>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      {modalOpen && (
        <div 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(7, 22, 38, 0.92)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            backdropFilter: "blur(6px)"
          }}
        >
          {/* Modal Header Controls */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 24px", background: "#071626", borderBottom: "1px solid #1e293b", color: "#ffffff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <strong style={{ fontSize: "0.95rem" }}>Statutory RTI Lifecycle Flowchart (High-Resolution View)</strong>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.6, z - 0.2))}
                style={{ background: "#1e293b", color: "#ffffff", border: "1px solid #475569", padding: "6px 10px", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <ZoomOut size={14} />
                Zoom Out
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.2))}
                style={{ background: "#1e293b", color: "#ffffff", border: "1px solid #475569", padding: "6px 10px", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <ZoomIn size={14} />
                Zoom In
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                style={{ background: "#1e293b", color: "#ffffff", border: "1px solid #475569", padding: "6px 10px", borderRadius: "4px", fontSize: "0.78rem", cursor: "pointer" }}
              >
                Reset (100%)
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                style={{ background: "#dc2626", color: "#ffffff", border: 0, padding: "6px 12px", borderRadius: "4px", fontSize: "0.78rem", fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
              >
                <X size={14} />
                Close [ESC]
              </button>
            </div>
          </div>

          {/* Modal Image View Area */}
          <div style={{ flex: 1, overflow: "auto", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
            <div style={{ transform: `scale(${zoomLevel})`, transition: "transform 0.2s ease", textAlign: "center" }}>
              <img 
                src="/images/rti-process-flowchart.png" 
                alt="Full Resolution RTI Flowchart" 
                style={{ maxWidth: "90vw", maxHeight: "80vh", background: "#ffffff", padding: "16px", borderRadius: "8px", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
