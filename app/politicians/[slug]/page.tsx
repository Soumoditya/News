import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, Gavel, TrendingUp, MapPin, Users, ExternalLink, ArrowLeft, Calendar } from "lucide-react";
import politicians from "@/data/politicians.json";
import { formatINR, getPartyColor, getSeverityColor, timeAgo } from "@/lib/utils";

export function generateStaticParams() {
  return politicians.map((p) => ({ slug: p.slug }));
}

function getCountryFlag(location: string): string {
  if (!location || location === "N/A" || location === "India") return "🇮🇳";
  const loc = location.toLowerCase();
  if (loc.includes("usa") || loc.includes("united states") || loc.includes("us ")) return "🇺🇸";
  if (loc.includes("uk") || loc.includes("united kingdom") || loc.includes("britain") || loc.includes("england") || loc.includes("scotland")) return "🇬🇧";
  if (loc.includes("australia")) return "🇦🇺";
  if (loc.includes("canada")) return "🇨🇦";
  if (loc.includes("singapore")) return "🇸🇬";
  if (loc.includes("germany")) return "🇩🇪";
  if (loc.includes("france")) return "🇫🇷";
  if (loc.includes("cambridge") || loc.includes("oxford")) return "🇬🇧";
  if (loc.includes("international")) return "🌍";
  return "🌍";
}

export default function PoliticianPage({ params }: { params: { slug: string } }) {
  const p = politicians.find((x) => x.slug === params.slug);
  if (!p) notFound();

  const partyColor = getPartyColor(p.party);
  const totalAssets = p.assets;
  const assetItems = [
    { label: "Movable Assets", value: p.assetBreakdown.movable, icon: "📦" },
    { label: "Immovable Assets", value: p.assetBreakdown.immovable, icon: "🏠" },
    { label: "Vehicles", value: p.assetBreakdown.vehicles, icon: "🚗" },
    { label: "Gold & Jewellery", value: p.assetBreakdown.gold, icon: "💎" },
    { label: "Cash in Hand", value: p.assetBreakdown.cash, icon: "💵" },
  ];

  const familyAbroad = p.children.filter(
    (c: any) => c.location && c.location !== "India" && c.location !== "N/A" && !c.location.startsWith("Bihar") && !c.location.startsWith("India")
  );

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Hero */}
      <div style={{
        padding: "3rem 1.5rem",
        background: `linear-gradient(135deg, ${partyColor}10 0%, transparent 60%)`,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Link href="/politicians" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#666", textDecoration: "none", fontSize: 13, marginBottom: "2rem",
          }}>
            <ArrowLeft size={14} /> Back to Politicians
          </Link>

          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2rem", alignItems: "start" }} className="profile-grid">
            {/* Avatar */}
            <div style={{
              width: 120, height: 120,
              borderRadius: 20,
              background: `${partyColor}20`,
              border: `3px solid ${partyColor}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 48,
              color: partyColor,
              flexShrink: 0,
            }}>
              {p.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
            </div>

            <div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: "0.75rem" }}>
                <span style={{
                  background: `${partyColor}20`,
                  color: partyColor,
                  padding: "4px 14px",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 700,
                }}>{p.party}</span>
                {p.criminalCases > 0 && (
                  <span style={{
                    background: "rgba(230,57,70,0.15)",
                    border: "1px solid rgba(230,57,70,0.3)",
                    color: "#E63946",
                    padding: "4px 14px",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                  }}>{p.criminalCases} Criminal Cases</span>
                )}
                {p.education_abroad && (
                  <span style={{
                    background: "rgba(255,183,3,0.15)",
                    border: "1px solid rgba(255,183,3,0.3)",
                    color: "#FFB703",
                    padding: "4px 14px",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 700,
                  }}>✈️ Family Abroad</span>
                )}
              </div>

              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                color: "#fff",
                letterSpacing: 1,
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}>{p.name}</h1>

              <p style={{ color: "#888", fontSize: 15, marginBottom: "0.5rem" }}>{p.position}</p>
              <div style={{ display: "flex", gap: "1.5rem", color: "#555", fontSize: 13, flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={13} />{p.constituency}, {p.state}
                </span>
                <span>Age: {p.age}</span>
                <span>Education: {p.education}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Stats row */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "3rem",
        }}>
          {[
            { icon: <Gavel size={24} color="#E63946" />, val: p.criminalCases, label: "Criminal Cases", color: "#E63946", big: true },
            { icon: <TrendingUp size={24} color="#FFB703" />, val: formatINR(totalAssets), label: "Total Assets", color: "#FFB703", big: false },
            { icon: <AlertTriangle size={24} color="#FF6B2B" />, val: p.controversies.length, label: "Controversies", color: "#FF6B2B", big: true },
            { icon: <Users size={24} color="#06b6d4" />, val: familyAbroad.length, label: "Family Abroad", color: "#06b6d4", big: true },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "1.5rem",
              background: `${s.color}08`,
              border: `1px solid ${s.color}20`,
              borderRadius: 16,
              textAlign: "center",
            }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.75rem" }}>{s.icon}</div>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: s.big ? 40 : 24,
                color: s.color,
                lineHeight: 1,
                marginBottom: "0.25rem",
              }}>{s.val}</div>
              <div style={{ color: "#666", fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }} className="detail-grid">
          {/* Controversies */}
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", letterSpacing: 1, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 10 }}>
              <AlertTriangle size={22} color="#E63946" />
              CONTROVERSIES
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {p.controversies.map((c: any, i: number) => (
                <div key={i} style={{
                  padding: "1.25rem",
                  background: `${getSeverityColor(c.severity)}06`,
                  border: `1px solid ${getSeverityColor(c.severity)}20`,
                  borderLeft: `4px solid ${getSeverityColor(c.severity)}`,
                  borderRadius: 10,
                }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                    <span style={{
                      background: `${getSeverityColor(c.severity)}20`,
                      color: getSeverityColor(c.severity),
                      padding: "2px 8px", borderRadius: 4,
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                    }}>{c.severity}</span>
                    <span style={{ color: "#555", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
                      <Calendar size={10} />{c.date}
                    </span>
                  </div>
                  <h4 style={{ color: "#fff", fontWeight: 600, fontSize: 14, marginBottom: "0.5rem" }}>{c.title}</h4>
                  <p style={{ color: "#777", fontSize: 12, lineHeight: 1.6, marginBottom: "0.75rem" }}>{c.description}</p>
                  <a
                    href={c.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#4ade80", fontSize: 11, textDecoration: "none" }}
                  >
                    <ExternalLink size={10} /> View Source
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* Assets */}
            <div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", letterSpacing: 1, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 10 }}>
                <TrendingUp size={22} color="#FFB703" />
                ASSETS DECLARED
              </h2>
              <div style={{
                padding: "1.5rem",
                background: "rgba(255,183,3,0.05)",
                border: "1px solid rgba(255,183,3,0.15)",
                borderRadius: 12,
              }}>
                {assetItems.map((a) => (
                  <div key={a.label} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.75rem 0",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                  }}>
                    <span style={{ color: "#888", fontSize: 13 }}>{a.icon} {a.label}</span>
                    <span style={{ color: "#FFB703", fontWeight: 600, fontSize: 14 }}>{formatINR(a.value)}</span>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "1rem", borderTop: "1px solid rgba(255,183,3,0.3)" }}>
                  <span style={{ color: "#fff", fontWeight: 700 }}>Total Assets</span>
                  <span style={{ color: "#FFB703", fontWeight: 700, fontSize: 18 }}>{formatINR(totalAssets)}</span>
                </div>
                {p.liabilities > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                    <span style={{ color: "#888", fontSize: 13 }}>Liabilities</span>
                    <span style={{ color: "#E63946", fontWeight: 600 }}>−{formatINR(p.liabilities)}</span>
                  </div>
                )}
                <div style={{ marginTop: "1rem", fontSize: 11, color: "#555" }}>
                  * Source: Self-declared affidavit filed with Election Commission of India
                </div>
              </div>
            </div>

            {/* Family */}
            <div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", letterSpacing: 1, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 10 }}>
                <Users size={22} color="#06b6d4" />
                FAMILY & CHILDREN
              </h2>
              {p.education_abroad && (
                <div style={{ marginBottom: "1rem", padding: "10px 14px", background: "rgba(255,183,3,0.08)", border: "1px solid rgba(255,183,3,0.2)", borderRadius: 8, display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ fontSize: 16 }}>✈️</span>
                  <span style={{ color: "#FFB703", fontSize: 13, fontWeight: 600 }}>Family member(s) based or educated abroad</span>
                </div>
              )}
              <div style={{
                padding: "1.5rem",
                background: "rgba(6,182,212,0.04)",
                border: "1px solid rgba(6,182,212,0.15)",
                borderRadius: 12,
              }}>
                {p.children.map((c: any, i: number) => {
                  const isAbroad = c.location && c.location !== "India" && c.location !== "N/A" && !c.location.startsWith("Bihar") && !c.location.startsWith("India");
                  const flag = getCountryFlag(c.location);
                  return (
                    <div key={i} style={{
                      padding: "1rem 0",
                      borderBottom: i < p.children.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                    }}>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: "0.4rem" }}>
                        {flag} {c.name}
                      </div>
                      <div style={{ display: "flex", gap: "1rem", fontSize: 13, marginBottom: c.note ? "0.5rem" : 0, flexWrap: "wrap" }}>
                        <span style={{ color: isAbroad ? "#FFB703" : "#666", fontWeight: isAbroad ? 600 : 400 }}>
                          {isAbroad ? "🌍" : "📍"} {c.location}
                        </span>
                        {c.occupation && c.occupation !== "N/A" && (
                          <span style={{ color: "#777" }}>💼 {c.occupation}</span>
                        )}
                      </div>
                      {c.note && (
                        <div style={{ fontSize: 12, color: "#777", fontStyle: "italic", lineHeight: 1.6, marginTop: "0.4rem" }}>
                          ℹ️ {c.note}
                        </div>
                      )}
                      {isAbroad && (
                        <div style={{
                          marginTop: "0.5rem",
                          padding: "4px 10px",
                          background: "rgba(255,183,3,0.1)",
                          border: "1px solid rgba(255,183,3,0.2)",
                          borderRadius: 4,
                          fontSize: 11,
                          color: "#FFB703",
                          display: "inline-block",
                        }}>
                          ✈️ Abroad while leader serves Indian citizens
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: "0.75rem", fontSize: 11, color: "#444" }}>
                * Family information compiled from EC affidavits, official interviews &amp; public records
              </div>
            </div>

            {/* Family Abroad Detail Section */}
            {familyAbroad.length > 0 && (
              <div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: "#fff", letterSpacing: 1, marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: 10 }}>
                  <Users size={22} color="#FFB703" />
                  FAMILY ABROAD
                </h2>
                <div style={{
                  padding: "1.5rem",
                  background: "rgba(255,183,3,0.04)",
                  border: "2px solid rgba(255,183,3,0.25)",
                  borderRadius: 12,
                }}>
                  <div style={{ fontSize: 12, color: "#888", marginBottom: "1.25rem", lineHeight: 1.7, padding: "0.75rem", background: "rgba(255,183,3,0.06)", borderRadius: 6 }}>
                    ⚠️ These family members live or study outside India while this leader holds public office in India — a detail that matters for accountability and anti-corruption scrutiny.
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {familyAbroad.map((c: any, i: number) => {
                      const flag = getCountryFlag(c.location);
                      return (
                        <div key={i} style={{
                          display: "grid",
                          gridTemplateColumns: "auto 1fr",
                          gap: "1rem",
                          padding: "1.25rem",
                          background: "rgba(255,183,3,0.06)",
                          border: "1px solid rgba(255,183,3,0.15)",
                          borderRadius: 10,
                        }}>
                          <div style={{ fontSize: 42, lineHeight: 1 }}>{flag}</div>
                          <div>
                            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: "0.35rem" }}>{c.name}</div>
                            <div style={{ color: "#FFB703", fontSize: 13, fontWeight: 600, marginBottom: "0.25rem" }}>📍 {c.location}</div>
                            {c.occupation && c.occupation !== "N/A" && (
                              <div style={{ color: "#888", fontSize: 12, marginBottom: c.note ? "0.4rem" : 0 }}>💼 {c.occupation}</div>
                            )}
                            {c.note && (
                              <div style={{ fontSize: 11, color: "#666", fontStyle: "italic", lineHeight: 1.6, marginTop: "0.25rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.4rem" }}>
                                ℹ️ {c.note}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <h3 style={{ color: "#666", fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: "0.75rem" }}>
                Tags
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map((t: string) => (
                  <span key={t} style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#888",
                    padding: "4px 10px",
                    borderRadius: 4,
                    fontSize: 12,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
          .detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
