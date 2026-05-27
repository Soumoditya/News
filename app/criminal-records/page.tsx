"use client";
import Link from "next/link";
import { Gavel, AlertTriangle, Shield, Info } from "lucide-react";
import politicians from "@/data/politicians.json";
import parties from "@/data/parties.json";
import { getPartyColor } from "@/lib/utils";

export default function CriminalRecordsPage() {
  const withCases = [...politicians]
    .filter((p) => p.criminalCases > 0)
    .sort((a, b) => b.criminalCases - a.criminalCases);

  const casesByParty = parties.map((party) => ({
    ...party,
    pct: Math.round(party.members_with_criminal_cases / party.total_members_checked * 100),
  })).sort((a, b) => b.pct - a.pct);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Header */}
      <div style={{
        padding: "4rem 1.5rem 3rem",
        background: "linear-gradient(180deg, rgba(230,57,70,0.08) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{ fontSize: 12, letterSpacing: 4, color: "#E63946", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Source: Self-Declared EC Affidavits + ADR India
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 6vw, 5.5rem)",
          color: "#fff",
          letterSpacing: 2,
          lineHeight: 1,
          marginBottom: "1rem",
        }}>
          CRIMINAL<br />
          <span style={{ background: "linear-gradient(135deg, #E63946, #FF6B2B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            RECORDS
          </span>
        </h1>

        {/* Disclaimer */}
        <div style={{
          display: "flex", gap: 10, alignItems: "flex-start",
          background: "rgba(255,183,3,0.08)",
          border: "1px solid rgba(255,183,3,0.2)",
          borderRadius: 10,
          padding: "1rem",
          maxWidth: 700,
          marginTop: "1.5rem",
        }}>
          <Info size={18} color="#FFB703" style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{ color: "#bbb", fontSize: 13, lineHeight: 1.6 }}>
            <strong style={{ color: "#FFB703" }}>Important:</strong> All cases listed below are <strong>pending</strong> criminal cases self-declared by politicians in their affidavits submitted to the Election Commission of India. Pending cases are not convictions. Politicians are presumed innocent until proven guilty by a court of law.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {[
            { val: "251", label: "MPs with Cases (18th LS)", color: "#E63946" },
            { val: "46%", label: "Of All Elected MPs", color: "#FF6B2B" },
            { val: "29", label: "MPs with Rape/Murder Cases", color: "#E63946" },
            { val: withCases.length.toString(), label: "Politicians Profiled Here", color: "#FFB703" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: s.color }}>{s.val}</div>
              <div style={{ color: "#555", fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Party comparison */}
        <div style={{ marginBottom: "4rem" }}>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 32, color: "#fff", letterSpacing: 1, marginBottom: "1.5rem",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <Shield size={24} color="#FF6B2B" /> PARTY-WISE CRIMINAL PERCENTAGE
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {casesByParty.map((p) => (
              <div key={p.id} style={{
                padding: "1.25rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: p.color }}>{p.abbr}</div>
                    <div style={{ color: "#555", fontSize: 11 }}>{p.members_with_criminal_cases}/{p.total_members_checked} MPs</div>
                  </div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 36,
                    color: p.pct > 40 ? "#E63946" : p.pct > 25 ? "#FF6B2B" : "#FFB703",
                    lineHeight: 1,
                  }}>{p.pct}%</div>
                </div>
                <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 8 }}>
                  <div style={{
                    width: `${p.pct}%`,
                    height: "100%",
                    background: `linear-gradient(to right, ${p.color}, ${p.pct > 40 ? "#E63946" : p.color})`,
                    borderRadius: 4,
                    transition: "width 1s ease",
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Politicians list */}
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 32, color: "#fff", letterSpacing: 1, marginBottom: "1.5rem",
          display: "flex", alignItems: "center", gap: 10,
        }}>
          <Gavel size={24} color="#E63946" /> POLITICIAN PROFILES WITH CASES
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {withCases.map((p, i) => (
            <Link key={p.id} href={`/politicians/${p.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                padding: "1.5rem",
                background: "rgba(230,57,70,0.03)",
                border: "1px solid rgba(230,57,70,0.10)",
                borderRadius: 14,
                display: "grid",
                gridTemplateColumns: "auto 1fr auto",
                gap: "1.5rem",
                alignItems: "center",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(230,57,70,0.08)";
                el.style.border = "1px solid rgba(230,57,70,0.25)";
                el.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(230,57,70,0.03)";
                el.style.border = "1px solid rgba(230,57,70,0.10)";
                el.style.transform = "translateX(0)";
              }}
              className="crime-row"
              >
                {/* Rank */}
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 8,
                  background: i < 3 ? "rgba(230,57,70,0.2)" : "rgba(255,255,255,0.04)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 20,
                  color: i < 3 ? "#E63946" : "#555",
                  flexShrink: 0,
                }}>
                  #{i + 1}
                </div>

                {/* Info */}
                <div>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: "0.25rem", flexWrap: "wrap" }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{p.name}</span>
                    <span style={{
                      background: `${getPartyColor(p.party)}20`,
                      color: getPartyColor(p.party),
                      padding: "2px 8px",
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                    }}>{p.party}</span>
                  </div>
                  <div style={{ color: "#666", fontSize: 12, marginBottom: "0.5rem" }}>{p.position} • {p.state}</div>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    {p.controversies.slice(0, 2).map((c: any, ci: number) => (
                      <span key={ci} style={{
                        background: "rgba(255,107,43,0.08)",
                        border: "1px solid rgba(255,107,43,0.15)",
                        color: "#bbb",
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontSize: 11,
                      }}>
                        {c.title.length > 40 ? c.title.slice(0, 40) + "..." : c.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cases count */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 48,
                    color: p.criminalCases >= 20 ? "#E63946" : p.criminalCases >= 5 ? "#FF6B2B" : "#FFB703",
                    lineHeight: 1,
                  }}>
                    {p.criminalCases}
                  </div>
                  <div style={{ color: "#555", fontSize: 11 }}>pending cases</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Source note */}
        <div style={{
          marginTop: "3rem",
          padding: "1.5rem",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: 12,
          fontSize: 12,
          color: "#555",
          lineHeight: 1.8,
        }}>
          <strong style={{ color: "#888" }}>Data Sources:</strong> Association for Democratic Reforms (ADR India) — adr-india.org; Election Commission of India affidavits. All data is self-declared by politicians. For national picture: ADR 2024 Lok Sabha election analysis — 251 of 543 elected MPs declared criminal cases in their EC affidavits.
          <br /><br />
          <strong style={{ color: "#888" }}>Legal Note:</strong> Pending criminal cases are not convictions. The data here is publicly available information from government sources. Politicians are presumed innocent until proven guilty.
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .crime-row { grid-template-columns: auto 1fr !important; }
        }
      `}</style>
    </div>
  );
}
