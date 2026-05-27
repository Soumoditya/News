"use client";
import Link from "next/link";
import { AlertTriangle, TrendingUp, Users, Calendar, IndianRupee } from "lucide-react";
import parties from "@/data/parties.json";
import { formatCrore, getPartyColor } from "@/lib/utils";

export default function PartiesPage() {
  const sorted = [...parties].sort((a, b) => b.currentSeats - a.currentSeats);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Header */}
      <div style={{
        padding: "4rem 1.5rem 3rem",
        background: "linear-gradient(180deg, rgba(255,107,43,0.05) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        maxWidth: 1400, margin: "0 auto",
        textAlign: "center",
      }}>
        <div style={{ fontSize: 12, letterSpacing: 4, color: "#FF6B2B", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Complete Party Analysis
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 7vw, 6rem)",
          color: "#fff",
          letterSpacing: 2,
          lineHeight: 1,
          marginBottom: "1rem",
        }}>
          POLITICAL
          <br />
          <span style={{ background: "linear-gradient(135deg, #FF6B2B, #E63946)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            PARTIES
          </span>
        </h1>
        <p style={{ color: "#888", fontSize: 15, maxWidth: 600, margin: "0 auto", lineHeight: 1.7 }}>
          Major scams, criminal records percentage, schemes, assets, and leadership of every major Indian political party.
        </p>
      </div>

      {/* Seat comparison bar */}
      <div style={{ maxWidth: 1400, margin: "2rem auto", padding: "0 1.5rem" }}>
        <div style={{
          padding: "1.5rem",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
        }}>
          <div style={{ color: "#888", fontSize: 12, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 2 }}>
            18th Lok Sabha Seat Distribution (543 Total)
          </div>
          <div style={{ display: "flex", height: 40, borderRadius: 8, overflow: "hidden" }}>
            {sorted.map((p) => (
              p.currentSeats > 0 && (
                <div
                  key={p.id}
                  style={{
                    width: `${(p.currentSeats / 543) * 100}%`,
                    background: p.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff",
                    borderRight: "1px solid rgba(0,0,0,0.2)",
                    minWidth: p.currentSeats > 20 ? "auto" : 0,
                    overflow: "hidden",
                    transition: "all 0.3s",
                  }}
                  title={`${p.abbr}: ${p.currentSeats} seats`}
                >
                  {p.currentSeats > 15 && p.abbr}
                </div>
              )
            ))}
          </div>
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "1rem", flexWrap: "wrap" }}>
            {sorted.filter((p) => p.currentSeats > 0).map((p) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: p.color }} />
                <span style={{ color: "#888", fontSize: 11 }}>{p.abbr}: {p.currentSeats}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Party cards */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 1.5rem 4rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {sorted.map((p) => (
            <div
              key={p.id}
              id={p.slug}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              {/* Party header */}
              <div style={{
                padding: "2rem",
                background: `${p.color}08`,
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "1.5rem",
                alignItems: "center",
              }} className="party-header">
                {/* Logo */}
                <div style={{
                  width: 72, height: 72,
                  borderRadius: 16,
                  background: `${p.color}20`,
                  border: `3px solid ${p.color}40`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28, color: p.color,
                  flexShrink: 0,
                }}>
                  {p.abbr.slice(0, 3)}
                </div>

                <div>
                  <h2 style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 36, color: "#fff", letterSpacing: 1, lineHeight: 1,
                  }}>
                    <span style={{ color: p.color }}>{p.abbr}</span> — {p.name}
                  </h2>
                  <div style={{ color: "#777", fontSize: 13, marginTop: "0.25rem" }}>
                    Founded {p.founded} • {p.ideology} • Symbol: {p.symbol}
                  </div>
                  <div style={{ marginTop: "0.5rem", color: "#888", fontSize: 13 }}>
                    President: <span style={{ color: "#ccc" }}>{p.president}</span> &nbsp;•&nbsp;
                    HQ: {p.headquarters} &nbsp;•&nbsp;
                    Alliance: <span style={{
                      background: p.alliance === "NDA" ? "rgba(255,153,51,0.15)" : p.alliance === "INDIA" ? "rgba(19,136,8,0.15)" : "rgba(255,255,255,0.05)",
                      color: p.alliance === "NDA" ? "#FF9933" : p.alliance === "INDIA" ? "#4ade80" : "#888",
                      padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700,
                    }}>{p.alliance}</span>
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 56, color: p.color, lineHeight: 1 }}>
                    {p.currentSeats}
                  </div>
                  <div style={{ color: "#555", fontSize: 12 }}>Lok Sabha Seats</div>
                  <div style={{ display: "flex", gap: 6, justifyContent: "flex-end", marginTop: "0.5rem" }}>
                    <div style={{
                      background: "rgba(230,57,70,0.15)",
                      border: "1px solid rgba(230,57,70,0.3)",
                      padding: "4px 10px",
                      borderRadius: 6,
                      fontSize: 12,
                      color: "#E63946",
                      fontWeight: 700,
                    }}>
                      {Math.round(p.members_with_criminal_cases / p.total_members_checked * 100)}% with cases
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats row */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                gap: "0",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}>
                {[
                  { label: "Members with Cases", val: `${p.members_with_criminal_cases}/${p.total_members_checked}`, color: "#E63946" },
                  { label: "Total Party Assets", val: formatCrore(p.total_assets_cr), color: "#FFB703" },
                  { label: "Avg Assets/MP", val: `₹${p.avg_assets_cr} Cr`, color: "#4ade80" },
                  { label: "Key Scandals", val: p.scandals.length.toString(), color: "#FF6B2B" },
                  { label: "Key Schemes", val: p.major_schemes.length.toString(), color: "#06b6d4" },
                ].map((s, i) => (
                  <div key={i} style={{
                    padding: "1.25rem 1.5rem",
                    borderRight: "1px solid rgba(255,255,255,0.04)",
                    textAlign: "center",
                  }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: s.color, lineHeight: 1 }}>{s.val}</div>
                    <div style={{ color: "#555", fontSize: 11, marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Content grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "0",
              }} className="party-content">
                {/* Key leaders */}
                <div style={{ padding: "1.5rem", borderRight: "1px solid rgba(255,255,255,0.04)" }}>
                  <h3 style={{ color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: "1rem" }}>
                    Key Leaders
                  </h3>
                  {p.key_leaders.map((l) => (
                    <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.color, flexShrink: 0 }} />
                      <span style={{ color: "#ccc", fontSize: 13 }}>{l}</span>
                    </div>
                  ))}
                </div>

                {/* Controversies */}
                <div style={{ padding: "1.5rem", borderRight: "1px solid rgba(255,255,255,0.04)" }}>
                  <h3 style={{ color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: "1rem" }}>
                    Major Controversies
                  </h3>
                  {p.controversies.map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: 8, padding: "5px 0" }}>
                      <AlertTriangle size={12} color="#E63946" style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ color: "#bbb", fontSize: 12, lineHeight: 1.5 }}>{c}</span>
                    </div>
                  ))}
                </div>

                {/* Major Scams & Schemes */}
                <div style={{ padding: "1.5rem" }}>
                  <h3 style={{ color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: "1rem" }}>
                    Major Scams (Alleged)
                  </h3>
                  {p.scandals.map((s) => (
                    <div key={s.name} style={{
                      padding: "0.75rem",
                      background: "rgba(230,57,70,0.05)",
                      border: "1px solid rgba(230,57,70,0.12)",
                      borderRadius: 8,
                      marginBottom: 8,
                    }}>
                      <div style={{ color: "#E63946", fontWeight: 600, fontSize: 13 }}>{s.name}</div>
                      {s.amount_cr > 0 && (
                        <div style={{ color: "#777", fontSize: 11, marginTop: 2 }}>₹{s.amount_cr.toLocaleString("en-IN")} Cr • {s.year}</div>
                      )}
                    </div>
                  ))}
                  <h3 style={{ color: "#888", fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", margin: "1rem 0 0.75rem" }}>
                    Key Schemes (When in Power)
                  </h3>
                  {p.major_schemes.map((s) => (
                    <div key={s.name} style={{ display: "flex", gap: 8, padding: "4px 0" }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", marginTop: 5, flexShrink: 0 }} />
                      <span style={{ color: "#bbb", fontSize: 12 }}>{s.name} ({s.year})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .party-header { grid-template-columns: auto 1fr !important; }
          .party-content { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .party-header { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
