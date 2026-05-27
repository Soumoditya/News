"use client";
import Link from "next/link";
import { AlertTriangle, TrendingUp, Users, Gavel, IndianRupee, Newspaper, ArrowRight, Shield, ChevronRight, BookOpen } from "lucide-react";
import politicians from "@/data/politicians.json";
import parties from "@/data/parties.json";
import controversies from "@/data/controversies.json";
import { formatCrore, getPartyColor, getSeverityColor } from "@/lib/utils";
import StatsTicker from "@/components/StatsTicker";
import HeroSection from "@/components/HeroSection";
import AnimatedSection from "@/components/AnimatedSection";
import InteractiveCharts from "@/components/InteractiveCharts";

const totalCriminalMPs = 251;
const totalMPs = 543;
const totalAssetsCr = parties.reduce((a, b) => a + b.total_assets_cr, 0);

export default function HomePage() {
  const topCrimeLeaders = [...politicians]
    .sort((a, b) => b.criminalCases - a.criminalCases)
    .slice(0, 4);

  const recentControversies = controversies.slice(0, 3);

  return (
    <>
      <HeroSection />
      <StatsTicker />

      {/* Start Here — Beginner's Guide */}
      <section style={{ padding: "3rem 1.5rem 0", maxWidth: 1400, margin: "0 auto" }}>
        <div style={{
          background: "linear-gradient(135deg, rgba(107,123,232,0.08), rgba(6,182,212,0.05))",
          border: "1px solid rgba(107,123,232,0.2)",
          borderRadius: 20,
          padding: "2rem",
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          gap: "1.5rem",
          alignItems: "flex-start",
        }} className="guide-grid">
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: "rgba(107,123,232,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, flexShrink: 0,
          }}>🎓</div>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#6B7BE8", textTransform: "uppercase", marginBottom: "0.4rem" }}>
              New to Indian Politics?
            </div>
            <h2 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: "0.75rem" }}>
              Don't know what CBI, ED, CAG, or Electoral Bonds mean? Start here.
            </h2>
            <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, marginBottom: "1rem", maxWidth: 650 }}>
              This platform is for everyone — from political veterans to first-time voters. Our Glossary explains every term in plain language with real examples.
              Understand what a "pending case" means, how party funds work, and why some politicians have 50+ FIRs.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/glossary" style={{
                background: "rgba(107,123,232,0.2)",
                border: "1px solid rgba(107,123,232,0.4)",
                color: "#6B7BE8",
                padding: "10px 20px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 13,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}>
                <BookOpen size={15} /> Open Glossary
              </Link>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center" }}>
                {["What is CBI?", "What is ED?", "Electoral Bonds", "Pending cases ≠ conviction"].map((item) => (
                  <Link key={item} href="/glossary" style={{
                    padding: "6px 12px",
                    borderRadius: 6,
                    border: "1px solid rgba(107,123,232,0.15)",
                    color: "#888",
                    textDecoration: "none",
                    fontSize: 12,
                    background: "rgba(107,123,232,0.04)",
                  }}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: 1400, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: 12, letterSpacing: 4, color: "#FF6B2B", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              18th Lok Sabha Data
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", color: "#fff", letterSpacing: 1, lineHeight: 1.1 }}>
              THE NUMBERS THEY DON'T WANT<br />
              <span style={{ background: "linear-gradient(135deg, #FF6B2B, #E63946)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                YOU TO SEE
              </span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
        }}>
          {[
            {
              icon: <Gavel size={28} color="#E63946" />,
              value: `${totalCriminalMPs}`,
              label: "MPs with Criminal Cases",
              sub: `${Math.round(totalCriminalMPs / totalMPs * 100)}% of all Lok Sabha MPs`,
              color: "#E63946",
              href: "/criminal-records",
            },
            {
              icon: <IndianRupee size={28} color="#FF6B2B" />,
              value: "₹479 Lakh Cr",
              label: "Union Budget 2024-25",
              sub: "Your tax money at work (or not)",
              color: "#FF6B2B",
              href: "/budget",
            },
            {
              icon: <Users size={28} color="#FFB703" />,
              value: `${politicians.length}+`,
              label: "Politicians Profiled",
              sub: "Criminal history, assets, controversies",
              color: "#FFB703",
              href: "/politicians",
            },
            {
              icon: <AlertTriangle size={28} color="#E63946" />,
              value: `${controversies.length}`,
              label: "Verified Controversies",
              sub: "With source documents & proof",
              color: "#E63946",
              href: "/controversies",
            },
            {
              icon: <TrendingUp size={28} color="#06b6d4" />,
              value: formatCrore(totalAssetsCr),
              label: "Total Party Assets Declared",
              sub: "Across 8 major national parties",
              color: "#06b6d4",
              href: "/parties",
            },
            {
              icon: <Shield size={28} color="#4ade80" />,
              value: "8",
              label: "Major Parties Tracked",
              sub: "BJP, INC, AAP, TMC, SP, BSP & more",
              color: "#4ade80",
              href: "/parties",
            },
          ].map((stat, i) => (
            <Link key={i} href={stat.href} style={{ textDecoration: "none" }}>
              <div style={{
                padding: "2rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                transition: "all 0.3s ease",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = `1px solid ${stat.color}30`;
                el.style.background = `${stat.color}08`;
                el.style.transform = "translateY(-4px)";
                el.style.boxShadow = `0 20px 40px ${stat.color}15`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.border = "1px solid rgba(255,255,255,0.06)";
                el.style.background = "rgba(255,255,255,0.03)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
              >
                <div style={{ marginBottom: "1rem" }}>{stat.icon}</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 40,
                  color: stat.color,
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}>
                  {stat.value}
                </div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 15, marginBottom: "0.4rem" }}>
                  {stat.label}
                </div>
                <div style={{ color: "#666", fontSize: 12 }}>{stat.sub}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Interactive Charts */}
      <section style={{ padding: "0 1.5rem 3rem", maxWidth: 1400, margin: "0 auto" }}>
        <InteractiveCharts />
      </section>

      {/* Most Wanted — Politicians with Most Cases */}
      <section style={{
        padding: "5rem 1.5rem",
        background: "linear-gradient(180deg, transparent, rgba(230,57,70,0.03), transparent)",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: 12, letterSpacing: 4, color: "#E63946", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Criminal Records Tracker
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", letterSpacing: 1 }}>
                  LEADERS WITH PENDING CASES
                </h2>
              </div>
              <Link href="/criminal-records" style={{ display: "flex", alignItems: "center", gap: 6, color: "#E63946", textDecoration: "none", fontSize: 14 }}>
                View All <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {topCrimeLeaders.map((p, i) => (
              <Link key={p.id} href={`/politicians/${p.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "1.5rem",
                  background: "rgba(230,57,70,0.04)",
                  border: "1px solid rgba(230,57,70,0.12)",
                  borderRadius: 16,
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                  transition: "all 0.3s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = "1px solid rgba(230,57,70,0.3)";
                  el.style.background = "rgba(230,57,70,0.08)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = "1px solid rgba(230,57,70,0.12)";
                  el.style.background = "rgba(230,57,70,0.04)";
                  el.style.transform = "translateY(0)";
                }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: 12,
                    background: `${getPartyColor(p.party)}20`,
                    border: `2px solid ${getPartyColor(p.party)}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 24, flexShrink: 0, fontFamily: "'Bebas Neue', sans-serif",
                    color: getPartyColor(p.party),
                  }}>
                    {p.name.charAt(0)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, lineHeight: 1.3 }}>{p.name}</div>
                      <div style={{
                        background: "rgba(230,57,70,0.15)",
                        border: "1px solid rgba(230,57,70,0.3)",
                        borderRadius: 6,
                        padding: "2px 8px",
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#E63946",
                        flexShrink: 0,
                        marginLeft: 8,
                        fontFamily: "'Bebas Neue', sans-serif",
                        letterSpacing: 0.5,
                      }}>
                        {p.criminalCases} CASES
                      </div>
                    </div>
                    <div style={{ color: "#666", fontSize: 12, marginBottom: "0.5rem" }}>{p.position}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <span style={{
                        background: `${getPartyColor(p.party)}20`,
                        color: getPartyColor(p.party),
                        padding: "2px 8px",
                        borderRadius: 4,
                        fontSize: 11,
                        fontWeight: 600,
                      }}>{p.party}</span>
                      <span style={{ color: "#555", fontSize: 11 }}>{p.state}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Controversy Feed */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: 1400, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 4, color: "#FF6B2B", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                With Source Documents
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", letterSpacing: 1 }}>
                VERIFIED CONTROVERSIES
              </h2>
            </div>
            <Link href="/controversies" style={{ display: "flex", alignItems: "center", gap: 6, color: "#FF6B2B", textDecoration: "none", fontSize: 14 }}>
              Full Timeline <ArrowRight size={16} />
            </Link>
          </div>
        </AnimatedSection>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {recentControversies.map((c, i) => (
            <Link key={c.id} href="/controversies" style={{ textDecoration: "none" }}>
              <div style={{
                padding: "1.75rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                borderLeft: `4px solid ${getSeverityColor(c.severity)}`,
                borderRadius: 12,
                display: "flex",
                gap: "1.5rem",
                alignItems: "flex-start",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.02)";
                el.style.transform = "translateX(0)";
              }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                    <span style={{
                      background: `${getSeverityColor(c.severity)}20`,
                      color: getSeverityColor(c.severity),
                      padding: "2px 10px",
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                    }}>{c.severity}</span>
                    <span style={{ color: "#555", fontSize: 12 }}>{c.category}</span>
                    <span style={{ color: "#444", fontSize: 12 }}>{new Date(c.date).getFullYear()}</span>
                    {c.money_involved_cr > 0 && (
                      <span style={{ color: "#FF6B2B", fontSize: 12, fontWeight: 600 }}>
                        {formatCrore(c.money_involved_cr)} involved
                      </span>
                    )}
                  </div>
                  <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: "0.5rem", lineHeight: 1.4 }}>
                    {c.title}
                  </h3>
                  <p style={{ color: "#666", fontSize: 13, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {c.description}
                  </p>
                  <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, color: "#4ade80", display: "flex", alignItems: "center", gap: 4 }}>
                      ✓ {c.proof_type}
                    </span>
                    <span style={{ fontSize: 11, color: "#555" }}>Source: {c.source_label}</span>
                  </div>
                </div>
                <ChevronRight size={18} color="#444" style={{ flexShrink: 0, marginTop: 4 }} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Parties Overview */}
      <section style={{
        padding: "5rem 1.5rem",
        background: "linear-gradient(180deg, transparent, rgba(255,107,43,0.02), transparent)",
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <AnimatedSection>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: 12, letterSpacing: 4, color: "#FF6B2B", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  All Major Parties
                </div>
                <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", letterSpacing: 1 }}>
                  KNOW YOUR PARTIES
                </h2>
              </div>
              <Link href="/parties" style={{ display: "flex", alignItems: "center", gap: 6, color: "#FF6B2B", textDecoration: "none", fontSize: 14 }}>
                Compare Parties <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {parties.map((p) => (
              <Link key={p.id} href={`/parties#${p.slug}`} style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "1.5rem",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 14,
                  transition: "all 0.3s",
                  cursor: "pointer",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = `1px solid ${p.color}40`;
                  el.style.background = `${p.color}08`;
                  el.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.border = "1px solid rgba(255,255,255,0.06)";
                  el.style.background = "rgba(255,255,255,0.02)";
                  el.style.transform = "translateY(0)";
                }}
                >
                  <div style={{
                    width: 48, height: 48,
                    borderRadius: "50%",
                    background: `${p.color}20`,
                    border: `2px solid ${p.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 1rem",
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 18,
                    color: p.color,
                  }}>
                    {p.abbr.charAt(0)}
                  </div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: p.color, marginBottom: "0.25rem" }}>
                    {p.abbr}
                  </div>
                  <div style={{ color: "#888", fontSize: 11, marginBottom: "0.75rem" }}>{p.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: "#fff", fontWeight: 700 }}>{p.currentSeats}</div>
                      <div style={{ color: "#555" }}>Seats</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: "#E63946", fontWeight: 700 }}>
                        {Math.round(p.members_with_criminal_cases / p.total_members_checked * 100)}%
                      </div>
                      <div style={{ color: "#555" }}>With Cases</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Budget Snapshot */}
      <section style={{ padding: "5rem 1.5rem", maxWidth: 1400, margin: "0 auto" }}>
        <AnimatedSection>
          <div style={{
            background: "linear-gradient(135deg, rgba(255,107,43,0.1), rgba(230,57,70,0.05))",
            border: "1px solid rgba(255,107,43,0.2)",
            borderRadius: 24,
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }} className="budget-grid">
            <div>
              <div style={{ fontSize: 12, letterSpacing: 4, color: "#FF6B2B", textTransform: "uppercase", marginBottom: "1rem" }}>
                Union Budget 2024-25
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.5rem, 4vw, 3.5rem)", color: "#fff", lineHeight: 1.1, marginBottom: "1rem" }}>
                ₹47.96 LAKH CRORE<br />
                <span style={{ color: "#FF6B2B" }}>YOUR MONEY</span>
              </h2>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.8, marginBottom: "2rem" }}>
                Every rupee you pay in tax flows into this. See where it goes — defence, roads, education, health — and where ₹11.3 lakh crore vanishes as interest payments.
              </p>
              <Link href="/budget" style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #FF6B2B, #E63946)",
                color: "#fff",
                padding: "14px 28px",
                borderRadius: 8,
                textDecoration: "none",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: 0.5,
              }}>
                Track Every Rupee <ArrowRight size={18} />
              </Link>
            </div>
            <div>
              {[
                { label: "Interest Payments", pct: 23.5, color: "#E63946" },
                { label: "Defence", pct: 13.0, color: "#FF6B2B" },
                { label: "Subsidies", pct: 8.8, color: "#FFB703" },
                { label: "Rural Development", pct: 4.1, color: "#4ade80" },
                { label: "Roads & Highways", pct: 5.8, color: "#06b6d4" },
                { label: "Education", pct: 2.5, color: "#8b5cf6" },
                { label: "Health", pct: 1.9, color: "#ec4899" },
              ].map((item) => (
                <div key={item.label} style={{ marginBottom: "0.85rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ color: "#ccc", fontSize: 12 }}>{item.label}</span>
                    <span style={{ color: item.color, fontSize: 12, fontWeight: 700 }}>{item.pct}%</span>
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 6 }}>
                    <div style={{
                      width: `${(item.pct / 23.5) * 100}%`,
                      height: "100%",
                      background: item.color,
                      borderRadius: 4,
                      transition: "width 1s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* CTA */}
      <section style={{
        textAlign: "center",
        padding: "6rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255,107,43,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <AnimatedSection>
          <div style={{ fontSize: 12, letterSpacing: 4, color: "#FF6B2B", textTransform: "uppercase", marginBottom: "1rem" }}>
            Democracy Starts With Information
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            color: "#fff",
            letterSpacing: 2,
            lineHeight: 1,
            marginBottom: "1.5rem",
          }}>
            JAB TAK HAI JAAN<br />
            <span style={{
              background: "linear-gradient(135deg, #FF6B2B, #E63946)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>SAWAAL KARTE RAHO</span>
          </h2>
          <p style={{ color: "#888", fontSize: 16, maxWidth: 600, margin: "0 auto 2.5rem", lineHeight: 1.8 }}>
            An informed citizen is the strongest check on power. Share this platform. Demand accountability.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/politicians" style={{
              background: "linear-gradient(135deg, #FF6B2B, #E63946)",
              color: "#fff",
              padding: "16px 32px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <Newspaper size={18} />
              Explore Politicians
            </Link>
            <Link href="/budget" style={{
              border: "1px solid rgba(255,107,43,0.4)",
              color: "#FF6B2B",
              padding: "16px 32px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 15,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}>
              <IndianRupee size={18} />
              Track Your Tax Money
            </Link>
          </div>
        </AnimatedSection>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .budget-grid { grid-template-columns: 1fr !important; }
          .guide-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
