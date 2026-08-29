"use client";
import { useState, useMemo } from "react";
import { MessageSquareWarning, Info, Gavel } from "lucide-react";
import remarks from "@/data/remarks.json";
import { getPartyColor, getPartySymbol } from "@/lib/utils";
import SourceTag from "@/components/SourceTag";
import AnimatedSection from "@/components/AnimatedSection";

const ALLIANCES = ["All", "NDA", "INDIA"];

export default function RemarksPage() {
  const [alliance, setAlliance] = useState("All");
  const filtered = useMemo(
    () => remarks.filter((r) => alliance === "All" || r.alliance === alliance),
    [alliance]
  );
  const nda = remarks.filter((r) => r.alliance === "NDA").length;
  const india = remarks.filter((r) => r.alliance === "INDIA").length;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Hero */}
      <div style={{
        padding: "4rem 1.5rem 3rem",
        background: "linear-gradient(180deg, rgba(230,57,70,0.07) 0%, transparent 100%)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: "var(--accent-2)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Speech & Accountability · With Proof
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#fff", letterSpacing: 1, lineHeight: 1 }}>
            DIVISIVE<br />
            <span style={{ background: "linear-gradient(135deg, #E63946, #FF6B2B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              REMARKS TRACKER
            </span>
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 15, maxWidth: 700, lineHeight: 1.8, marginTop: "1rem" }}>
            Documented remarks by leaders — across parties — that drew hate-speech complaints,
            Election Commission notices, FIRs or court action. Every entry links to reporting so
            you can read the full context and current status yourself.
          </p>
        </div>
      </div>

      {/* Framing / legal note */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-start", padding: "1.25rem 1.5rem", background: "var(--surface-1)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}>
          <Info size={20} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>How to read this</div>
            <p style={{ color: "var(--text-mute)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              These are <strong style={{ color: "var(--text-dim)" }}>reported</strong> remarks and their real-world consequences (a notice, an FIR, a court case). A complaint or FIR is
              an allegation, not a conviction — many are contested or denied, and we mark those. We don't pass verdicts; we point you to the
              record. The aim is a citizenry that recognises divisive rhetoric whoever uses it.
            </p>
          </div>
        </div>
      </div>

      {/* Balance + filter */}
      <div style={{ maxWidth: 1100, margin: "1.5rem auto 0", padding: "0 1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <span style={{ fontSize: 13, color: "var(--text-mute)" }}>Balance:</span>
          <span style={{ fontSize: 13, color: "var(--accent)", fontWeight: 700 }}>NDA {nda}</span>
          <span style={{ fontSize: 13, color: "var(--green)", fontWeight: 700 }}>INDIA {india}</span>
        </div>
        <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
          {ALLIANCES.map((a) => (
            <button key={a} onClick={() => setAlliance(a)} style={{
              padding: "8px 16px", borderRadius: "var(--r-pill)",
              border: `1px solid ${alliance === a ? "var(--accent-2)" : "var(--border)"}`,
              background: alliance === a ? "rgba(230,57,70,0.12)" : "transparent",
              color: alliance === a ? "var(--accent-2)" : "var(--text-mute)",
              fontSize: 13, fontWeight: alliance === a ? 700 : 400, cursor: "pointer",
            }}>{a}</button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem 1.5rem 3rem" }}>
        <AnimatedSection stagger style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {filtered.map((r, i) => {
            const color = getPartyColor(r.party);
            return (
              <div key={i} className="lift" style={{
                padding: "1.5rem",
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                borderLeft: `4px solid ${color}`,
                borderRadius: "var(--r-lg)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 20 }} aria-hidden>{getPartySymbol(r.party)}</span>
                    <span style={{ color, fontSize: 13, fontWeight: 700 }}>{r.party}</span>
                    <span style={{ color: "var(--text-faint)", fontSize: 12 }}>· {r.alliance}</span>
                    <span style={{ color: "var(--text-faint)", fontSize: 12 }}>· {r.year}</span>
                  </div>
                  {r.contested && (
                    <span style={{ fontSize: 9, color: "var(--aging)", border: "1px solid var(--aging)", borderRadius: 4, padding: "1px 6px", fontWeight: 700 }}>CONTESTED</span>
                  )}
                </div>

                {/* Quote */}
                <div style={{
                  display: "flex", gap: 12, padding: "1rem 1.25rem",
                  background: "var(--surface-0)", borderRadius: "var(--r-md)", marginBottom: 12,
                }}>
                  <MessageSquareWarning size={18} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
                  <p style={{ color: "#e6e6e8", fontSize: 14, lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>
                    “{r.remark}”
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--text-mute)", fontSize: 12 }}>
                    <Gavel size={13} color="var(--gold)" />
                    <span><strong style={{ color: "var(--text-dim)" }}>Follow-up:</strong> {r.action}</span>
                  </div>
                  <SourceTag source={r.source} sourceLabel={r.sourceLabel} verifiedOn={r.verifiedOn} compact />
                </div>
              </div>
            );
          })}
        </AnimatedSection>

        <div style={{ marginTop: "2rem", fontSize: 11, color: "var(--text-faint)", lineHeight: 1.7 }}>
          Remarks are paraphrased from widely-reported coverage and linked to sources for full context. Inclusion here reflects that a
          remark drew significant public reaction or official action — not a finding of guilt. Denials and acquittals are noted where known.
          Corrections and additional sources are welcome.
        </div>
      </div>
    </div>
  );
}
