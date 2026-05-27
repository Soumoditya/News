"use client";
import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, ExternalLink, Filter, Calendar, IndianRupee, Scale } from "lucide-react";
import controversies from "@/data/controversies.json";
import { getSeverityColor, getPartyColor, formatCrore } from "@/lib/utils";

const CATEGORIES = ["All", ...Array.from(new Set(controversies.map((c) => c.category)))];
const SEVERITIES = ["All", "critical", "high", "medium", "low"];

export default function ControversiesPage() {
  const [cat, setCat] = useState("All");
  const [sev, setSev] = useState("All");
  const [sort, setSort] = useState("date");

  let filtered = [...controversies];
  if (cat !== "All") filtered = filtered.filter((c) => c.category === cat);
  if (sev !== "All") filtered = filtered.filter((c) => c.severity === sev);
  filtered.sort((a, b) => {
    if (sort === "date") return new Date(b.date).getTime() - new Date(a.date).getTime();
    if (sort === "money") return b.money_involved_cr - a.money_involved_cr;
    return 0;
  });

  const totalMoney = controversies.reduce((sum, c) => sum + c.money_involved_cr, 0);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Header */}
      <div style={{
        padding: "4rem 1.5rem 3rem",
        background: "linear-gradient(180deg, rgba(230,57,70,0.07) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{ fontSize: 12, letterSpacing: 4, color: "#E63946", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          With Source Documents & Proof
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 6vw, 5.5rem)",
          color: "#fff",
          letterSpacing: 2,
          lineHeight: 1,
          marginBottom: "1rem",
        }}>
          VERIFIED<br />
          <span style={{ background: "linear-gradient(135deg, #E63946, #FF6B2B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            CONTROVERSIES
          </span>
        </h1>
        <p style={{ color: "#888", fontSize: 15, maxWidth: 600, lineHeight: 1.7 }}>
          Every controversy verified with court documents, CAG reports, NHRC findings, or official government sources. No rumours, no hearsay.
        </p>

        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {[
            { val: controversies.filter((c) => c.severity === "critical").length.toString(), label: "Critical Cases", color: "#E63946" },
            { val: formatCrore(totalMoney), label: "Total Money Involved", color: "#FF6B2B" },
            { val: controversies.length.toString(), label: "Verified Controversies", color: "#FFB703" },
            { val: controversies.filter((c) => c.proof_type.includes("Court") || c.proof_type.includes("CBI") || c.proof_type.includes("CAG")).length.toString(), label: "With Govt/Court Proof", color: "#4ade80" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: s.color }}>{s.val}</div>
              <div style={{ color: "#555", fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Filters */}
        <div style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#666", fontSize: 13 }}>
            <Filter size={14} /> Filter:
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {SEVERITIES.map((s) => (
              <button
                key={s}
                onClick={() => setSev(s)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 6,
                  border: `1px solid ${sev === s ? getSeverityColor(s === "All" ? "medium" : s) : "rgba(255,255,255,0.08)"}`,
                  background: sev === s ? `${getSeverityColor(s === "All" ? "medium" : s)}20` : "transparent",
                  color: sev === s ? getSeverityColor(s === "All" ? "medium" : s) : "#666",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: sev === s ? 700 : 400,
                  textTransform: "capitalize",
                }}
              >
                {s}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginLeft: "auto" }}>
            <select
              value={cat}
              onChange={(e) => setCat(e.target.value)}
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#ccc", fontSize: 13 }}
            >
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#ccc", fontSize: 13 }}
            >
              <option value="date">Latest First</option>
              <option value="money">By Money</option>
            </select>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
          <div style={{ color: "#555", fontSize: 13 }}>
            Showing {filtered.length} verified controversies
          </div>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <a href="https://main.sci.gov.in" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "#6B7BE8", textDecoration: "none", padding: "4px 10px", border: "1px solid rgba(107,123,232,0.3)", borderRadius: 6 }}>
              Supreme Court ↗
            </a>
            <a href="https://cag.gov.in" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 12, color: "#4ade80", textDecoration: "none", padding: "4px 10px", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 6 }}>
              CAG India ↗
            </a>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ position: "relative" }}>
          {/* Timeline line */}
          <div style={{
            position: "absolute",
            left: 20,
            top: 0,
            bottom: 0,
            width: 2,
            background: "linear-gradient(to bottom, #E63946, rgba(230,57,70,0.1))",
            pointerEvents: "none",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", paddingLeft: 56 }}>
            {filtered.map((c, i) => (
              <div key={c.id} style={{ position: "relative" }}>
                {/* Dot */}
                <div style={{
                  position: "absolute",
                  left: -44,
                  top: 20,
                  width: 14, height: 14,
                  borderRadius: "50%",
                  background: getSeverityColor(c.severity),
                  border: `3px solid #050505`,
                  boxShadow: `0 0 12px ${getSeverityColor(c.severity)}60`,
                }} />

                {/* Year label */}
                <div style={{
                  position: "absolute",
                  left: -105,
                  top: 18,
                  fontSize: 11,
                  color: "#444",
                  fontFamily: "'Bebas Neue', sans-serif",
                  letterSpacing: 1,
                }}>
                  {new Date(c.date).getFullYear()}
                </div>

                <div style={{
                  padding: "1.75rem",
                  background: `${getSeverityColor(c.severity)}04`,
                  border: `1px solid ${getSeverityColor(c.severity)}15`,
                  borderLeft: `4px solid ${getSeverityColor(c.severity)}`,
                  borderRadius: 16,
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${getSeverityColor(c.severity)}08`;
                  el.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = `${getSeverityColor(c.severity)}04`;
                  el.style.transform = "translateX(0)";
                }}
                >
                  {/* Meta */}
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "1rem", flexWrap: "wrap" }}>
                    <span style={{
                      background: `${getSeverityColor(c.severity)}20`,
                      color: getSeverityColor(c.severity),
                      padding: "3px 12px", borderRadius: 4,
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                    }}>{c.severity}</span>
                    <span style={{
                      background: "rgba(255,255,255,0.05)",
                      color: "#888",
                      padding: "3px 10px", borderRadius: 4,
                      fontSize: 11,
                    }}>{c.category}</span>
                    <span style={{ color: "#555", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={11} />{new Date(c.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    {c.money_involved_cr > 0 && (
                      <span style={{ color: "#FF6B2B", fontWeight: 700, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                        <IndianRupee size={11} />{formatCrore(c.money_involved_cr)} involved
                      </span>
                    )}
                    {/* Parties */}
                    {c.parties_involved.slice(0, 3).map((party) => (
                      <span key={party} style={{ color: getPartyColor(party), fontSize: 11, background: `${getPartyColor(party)}15`, padding: "2px 8px", borderRadius: 4, border: `1px solid ${getPartyColor(party)}30`, fontWeight: 600 }}>
                        {party}
                      </span>
                    ))}
                  </div>

                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: "0.75rem", lineHeight: 1.4, fontFamily: "'Playfair Display', serif" }}>
                    {c.title}
                  </h3>

                  <p style={{ color: "#888", fontSize: 14, lineHeight: 1.8, marginBottom: "1rem" }}>
                    {c.description}
                  </p>

                  {/* Footer */}
                  <div style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "center",
                    flexWrap: "wrap",
                    paddingTop: "1rem",
                    borderTop: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
                      <span style={{ color: "#4ade80", fontSize: 12, fontWeight: 600 }}>{c.proof_type}</span>
                    </div>
                    <span style={{ color: "#555", fontSize: 12 }}>Source: {c.source_label}</span>
                    <span style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#888",
                      padding: "3px 10px", borderRadius: 4, fontSize: 11,
                    }}>{c.status}</span>
                    <a
                      href={c.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#6B7BE8", fontSize: 12, textDecoration: "none", marginLeft: "auto", padding: "4px 10px", border: "1px solid rgba(107,123,232,0.3)", borderRadius: 6, background: "rgba(107,123,232,0.08)" }}
                    >
                      <Scale size={12} /> Official Source ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          div[style*="paddingLeft: 56"] { padding-left: 20px !important; }
          div[style*="left: -44"] { display: none !important; }
          div[style*="left: -105"] { display: none !important; }
          div[style*="left: 20"][style*="width: 2"] { display: none !important; }
        }
      `}</style>
    </div>
  );
}
