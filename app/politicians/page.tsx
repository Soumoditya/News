"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, AlertTriangle, TrendingUp, MapPin, Users } from "lucide-react";
import politicians from "@/data/politicians.json";
import { formatINR, getPartyColor, getSeverityColor } from "@/lib/utils";

const PARTIES = ["All", "BJP", "INC", "AAP", "TMC", "SP", "BSP", "RJD", "JDU", "NCP (SP)", "NCP", "DMK", "CPM", "NC", "BRS", "BJD", "TDP", "Shiv Sena", "Shiv Sena (UBT)", "AIMIM", "SAD", "JMM", "RLD", "LJP (RV)", "AzSP"];
const STATES = ["All", ...Array.from(new Set(politicians.map((p) => p.state))).sort()];
const SORT_OPTIONS = [
  { value: "criminalCases", label: "Most Cases" },
  { value: "assets", label: "Most Assets" },
  { value: "name", label: "Name (A-Z)" },
  { value: "controversies", label: "Most Controversies" },
];

export default function PoliticiansPage() {
  const [search, setSearch] = useState("");
  const [party, setParty] = useState("All");
  const [state, setState] = useState("All");
  const [sort, setSort] = useState("criminalCases");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    let list = [...politicians];
    if (search) list = list.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.party.toLowerCase().includes(search.toLowerCase()));
    if (party !== "All") list = list.filter((p) => p.party === party);
    if (state !== "All") list = list.filter((p) => p.state === state);
    if (filter === "criminal") list = list.filter((p) => p.criminalCases > 0);
    if (filter === "abroad") list = list.filter((p) => p.education_abroad);
    list.sort((a, b) => {
      if (sort === "criminalCases") return b.criminalCases - a.criminalCases;
      if (sort === "assets") return b.assets - a.assets;
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "controversies") return b.controversies.length - a.controversies.length;
      return 0;
    });
    return list;
  }, [search, party, state, sort, filter]);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Header */}
      <div style={{
        padding: "4rem 1.5rem 3rem",
        background: "linear-gradient(180deg, rgba(255,107,43,0.05) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{ fontSize: 12, letterSpacing: 4, color: "#FF6B2B", textTransform: "uppercase", marginBottom: "0.75rem" }}>
          Election Commission Data + ADR India
        </div>
        <h1 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: "clamp(3rem, 6vw, 5rem)",
          color: "#fff",
          letterSpacing: 2,
          lineHeight: 1,
          marginBottom: "1rem",
        }}>
          POLITICIAN<br />
          <span style={{ background: "linear-gradient(135deg, #FF6B2B, #E63946)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            PROFILES
          </span>
        </h1>
        <p style={{ color: "#888", fontSize: 15, maxWidth: 600, lineHeight: 1.7 }}>
          Criminal cases, asset declarations, controversies, family background — all from public records filed with the Election Commission and court documents.
        </p>
        {/* Quick stats */}
        <div style={{ display: "flex", gap: "2rem", marginTop: "2rem", flexWrap: "wrap" }}>
          {[
            { val: politicians.filter((p) => p.criminalCases > 0).length, label: "With Criminal Cases", color: "#E63946" },
            { val: politicians.filter((p) => p.criminalCases > 10).length, label: "With 10+ Cases", color: "#FF6B2B" },
            { val: politicians.filter((p) => p.education_abroad).length, label: "Children Abroad", color: "#FFB703" },
            { val: politicians.length, label: "Profiles", color: "#4ade80" },
          ].map((s) => (
            <div key={s.label}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: s.color }}>{s.val}</div>
              <div style={{ color: "#555", fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Filters */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr auto auto auto auto",
          gap: "1rem",
          marginBottom: "2rem",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 12,
          padding: "1rem",
          alignItems: "center",
        }} className="filter-grid">
          <div style={{ position: "relative" }}>
            <Search size={16} color="#555" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or party..."
              style={{
                width: "100%",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                padding: "10px 12px 10px 38px",
                color: "#fff",
                fontSize: 14,
                outline: "none",
              }}
            />
          </div>
          <select
            value={party}
            onChange={(e) => setParty(e.target.value)}
            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px", color: "#ccc", fontSize: 13 }}
          >
            {PARTIES.map((p) => <option key={p}>{p}</option>)}
          </select>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px", color: "#ccc", fontSize: 13 }}
          >
            {STATES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px", color: "#ccc", fontSize: 13 }}
          >
            {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "10px 12px", color: "#ccc", fontSize: 13 }}
          >
            <option value="all">All</option>
            <option value="criminal">Has Cases</option>
            <option value="abroad">Children Abroad</option>
          </select>
        </div>

        <div style={{ color: "#555", fontSize: 13, marginBottom: "1.5rem" }}>
          Showing {filtered.length} politicians
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "1.5rem",
        }}>
          {filtered.map((p) => (
            <Link key={p.id} href={`/politicians/${p.slug}`} style={{ textDecoration: "none" }}>
              <div style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                overflow: "hidden",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = `1px solid ${getPartyColor(p.party)}30`;
                el.style.background = `rgba(${hexToRgb(getPartyColor(p.party))},0.05)`;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = `0 20px 40px ${getPartyColor(p.party)}10`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(255,255,255,0.06)";
                el.style.background = "rgba(255,255,255,0.02)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
              >
                {/* Party color strip */}
                <div style={{ height: 3, background: `linear-gradient(to right, ${getPartyColor(p.party)}, transparent)` }} />

                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "flex-start" }}>
                    {/* Avatar */}
                    <div style={{
                      width: 56, height: 56, borderRadius: 12,
                      background: `${getPartyColor(p.party)}20`,
                      border: `2px solid ${getPartyColor(p.party)}40`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 24,
                      color: getPartyColor(p.party),
                      flexShrink: 0,
                    }}>
                      {p.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: "0.2rem" }}>{p.name}</h3>
                      <div style={{ color: "#666", fontSize: 12, marginBottom: "0.4rem" }}>{p.position}</div>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span style={{
                          background: `${getPartyColor(p.party)}20`,
                          color: getPartyColor(p.party),
                          padding: "2px 8px",
                          borderRadius: 4,
                          fontSize: 11,
                          fontWeight: 600,
                        }}>{p.party}</span>
                        <span style={{ color: "#555", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
                          <MapPin size={10} />{p.state}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "rgba(0,0,0,0.3)",
                    borderRadius: 10,
                    marginBottom: "1rem",
                  }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 24,
                        color: p.criminalCases > 0 ? "#E63946" : "#4ade80",
                        lineHeight: 1,
                      }}>
                        {p.criminalCases}
                      </div>
                      <div style={{ color: "#555", fontSize: 10, marginTop: 2 }}>Cases</div>
                    </div>
                    <div style={{ textAlign: "center", borderLeft: "1px solid rgba(255,255,255,0.06)", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, color: "#FFB703", lineHeight: 1 }}>
                        {formatINR(p.assets).replace("₹", "")}
                      </div>
                      <div style={{ color: "#555", fontSize: 10, marginTop: 2 }}>Assets</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: "#FF6B2B", lineHeight: 1 }}>
                        {p.controversies.length}
                      </div>
                      <div style={{ color: "#555", fontSize: 10, marginTop: 2 }}>Controversies</div>
                    </div>
                  </div>

                  {/* Latest controversy */}
                  {p.controversies.length > 0 && (
                    <div style={{
                      padding: "0.75rem",
                      background: `${getSeverityColor(p.controversies[0].severity)}08`,
                      border: `1px solid ${getSeverityColor(p.controversies[0].severity)}20`,
                      borderRadius: 8,
                      marginBottom: "0.75rem",
                    }}>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: "0.3rem" }}>
                        <AlertTriangle size={11} color={getSeverityColor(p.controversies[0].severity)} />
                        <span style={{ color: getSeverityColor(p.controversies[0].severity), fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
                          {p.controversies[0].severity}
                        </span>
                      </div>
                      <div style={{ color: "#bbb", fontSize: 12, lineHeight: 1.4 }}>{p.controversies[0].title}</div>
                    </div>
                  )}

                  {/* Family Abroad badge */}
                  {p.education_abroad && p.children.some((c: any) => c.location !== "India" && c.location !== "N/A" && !c.location.startsWith("Bihar") && !c.location.startsWith("India")) && (
                    <div style={{
                      padding: "0.6rem 0.75rem",
                      background: "rgba(255,183,3,0.08)",
                      border: "1px solid rgba(255,183,3,0.25)",
                      borderRadius: 8,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "0.3rem" }}>
                        <Users size={11} color="#FFB703" />
                        <span style={{ color: "#FFB703", fontSize: 11, fontWeight: 700, letterSpacing: 0.5 }}>FAMILY ABROAD</span>
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {p.children
                          .filter((c: any) => c.location !== "India" && c.location !== "N/A" && !c.location.startsWith("Bihar") && !c.location.startsWith("India"))
                          .map((c: any, i: number) => (
                            <span key={i} style={{ fontSize: 11, color: "#999", background: "rgba(255,183,3,0.06)", padding: "2px 6px", borderRadius: 4 }}>
                              ✈️ {c.location.split("(")[0].trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#555" }}>
            <Search size={48} color="#333" style={{ margin: "0 auto 1rem", display: "block" }} />
            <div>No politicians found matching your filters.</div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .filter-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
    : "255,107,43";
}
