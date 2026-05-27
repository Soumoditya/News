"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  AlertTriangle, Gavel, TrendingUp, MapPin, Users, ExternalLink,
  ArrowLeft, Calendar, Newspaper, Search, Scale, FileText,
  ChevronDown, ChevronUp, Clock, Shield, Activity,
} from "lucide-react";
import { formatINR, getPartyColor, getSeverityColor } from "@/lib/utils";

interface Controversy {
  title: string;
  date: string;
  description: string;
  source: string;
  severity: string;
}

interface Child {
  name: string;
  location: string;
  occupation?: string;
  note?: string;
}

interface Politician {
  id: number;
  name: string;
  slug: string;
  party: string;
  position: string;
  state: string;
  constituency: string;
  age: number;
  education: string;
  criminalCases: number;
  assets: number;
  liabilities: number;
  controversies: Controversy[];
  children: Child[];
  assetBreakdown: {
    movable: number;
    immovable: number;
    vehicles: number;
    gold: number;
    cash: number;
  };
  education_abroad: boolean;
  tags: string[];
}

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: { name: string };
  image?: string;
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

function timeAgoStr(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 30) return `${diffDays} days ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

function SourceButtons({ controversy, politicianName }: { controversy: Controversy; politicianName: string }) {
  const q = encodeURIComponent(`${politicianName} ${controversy.title}`);
  const kanoonQ = encodeURIComponent(controversy.title);
  const mynetaQ = encodeURIComponent(politicianName);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
      <a
        href={`https://news.google.com/search?q=${q}&hl=en-IN&gl=IN&ceid=IN:en`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          padding: "4px 10px", borderRadius: 6,
          background: "rgba(66,133,244,0.12)",
          border: "1px solid rgba(66,133,244,0.25)",
          color: "#4285F4", fontSize: 11, fontWeight: 600,
          textDecoration: "none", whiteSpace: "nowrap",
        }}
      >
        <Newspaper size={10} /> Google News
      </a>
      <a
        href={`https://indiankanoon.org/search/?formInput=${kanoonQ}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          padding: "4px 10px", borderRadius: 6,
          background: "rgba(255,152,0,0.12)",
          border: "1px solid rgba(255,152,0,0.25)",
          color: "#FF9800", fontSize: 11, fontWeight: 600,
          textDecoration: "none", whiteSpace: "nowrap",
        }}
      >
        <Scale size={10} /> IndiaKanoon
      </a>
      <a
        href={`https://myneta.info/candidate/index.php?candidate_id=0&action=show_all&sort=default&start=0&limit=20&queryString=${mynetaQ}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          padding: "4px 10px", borderRadius: 6,
          background: "rgba(76,175,80,0.12)",
          border: "1px solid rgba(76,175,80,0.25)",
          color: "#4CAF50", fontSize: 11, fontWeight: 600,
          textDecoration: "none", whiteSpace: "nowrap",
        }}
      >
        <FileText size={10} /> Myneta.info
      </a>
      {controversy.source && (
        <a
          href={controversy.source}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "4px 10px", borderRadius: 6,
            background: "rgba(156,39,176,0.12)",
            border: "1px solid rgba(156,39,176,0.25)",
            color: "#9C27B0", fontSize: 11, fontWeight: 600,
            textDecoration: "none", whiteSpace: "nowrap",
          }}
        >
          <ExternalLink size={10} /> Official Source
        </a>
      )}
      <a
        href={`https://ecourts.gov.in/ecourts_home/index.php`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex", alignItems: "center", gap: 4,
          padding: "4px 10px", borderRadius: 6,
          background: "rgba(0,150,136,0.12)",
          border: "1px solid rgba(0,150,136,0.25)",
          color: "#009688", fontSize: 11, fontWeight: 600,
          textDecoration: "none", whiteSpace: "nowrap",
        }}
      >
        <Shield size={10} /> eCourts
      </a>
    </div>
  );
}

function AnimatedCounter({ target, color }: { target: number; color: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1200;
          const step = Math.max(1, Math.ceil(target / 60));
          const interval = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(start);
            }
          }, duration / (target / step));
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: 40, color, lineHeight: 1, marginBottom: "0.25rem",
      transition: "color 0.3s",
    }}>
      {count}
    </div>
  );
}

export default function PoliticianDetailClient({ p }: { p: Politician }) {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [expandedControversy, setExpandedControversy] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"controversies" | "cases" | "assets" | "family" | "news">("controversies");

  const partyColor = getPartyColor(p.party);
  const assetItems = [
    { label: "Movable Assets", value: p.assetBreakdown.movable, icon: "📦", color: "#06b6d4" },
    { label: "Immovable Assets", value: p.assetBreakdown.immovable, icon: "🏠", color: "#4ade80" },
    { label: "Vehicles", value: p.assetBreakdown.vehicles, icon: "🚗", color: "#FFB703" },
    { label: "Gold & Jewellery", value: p.assetBreakdown.gold, icon: "💎", color: "#FFD700" },
    { label: "Cash in Hand", value: p.assetBreakdown.cash, icon: "💵", color: "#FF6B2B" },
  ];

  const familyAbroad = p.children.filter(
    (c) => c.location && c.location !== "India" && c.location !== "N/A" &&
           !c.location.startsWith("Bihar") && !c.location.startsWith("India")
  );

  const totalAssets = p.assets;
  const maxAsset = Math.max(...assetItems.map((a) => a.value), 1);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch(`/api/news?q=${encodeURIComponent(p.name + " India politics")}`);
        if (res.ok) {
          const data = await res.json();
          setNews(data.articles || []);
        }
      } catch {
        // fallback: no news
      } finally {
        setNewsLoading(false);
      }
    }
    fetchNews();
  }, [p.name]);

  const tabs = [
    { id: "controversies", label: "⚠️ Controversies", count: p.controversies.length },
    { id: "cases", label: "⚖️ Criminal Cases", count: p.criminalCases },
    { id: "assets", label: "💰 Assets", count: null },
    { id: "family", label: "👨‍👩‍👧 Family", count: p.children.length },
    { id: "news", label: "📰 Live News", count: news.length || null },
  ] as const;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Hero */}
      <div style={{
        padding: "3rem 1.5rem",
        background: `linear-gradient(135deg, ${partyColor}12 0%, transparent 70%)`,
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 80% 50%, ${partyColor}08 0%, transparent 60%)`,
          pointerEvents: "none",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
          <Link href="/politicians" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#555", textDecoration: "none", fontSize: 13, marginBottom: "2rem",
            padding: "6px 12px",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 6,
          }}>
            <ArrowLeft size={14} /> All Politicians
          </Link>

          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2rem", alignItems: "start" }} className="profile-grid">
            <div style={{
              width: 120, height: 120, borderRadius: 24,
              background: `${partyColor}20`,
              border: `3px solid ${partyColor}50`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Bebas Neue', sans-serif", fontSize: 52, color: partyColor,
              flexShrink: 0,
              boxShadow: `0 0 40px ${partyColor}20`,
            }}>
              {p.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
            </div>

            <div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "0.75rem" }}>
                <span style={{
                  background: `${partyColor}22`,
                  color: partyColor,
                  padding: "4px 14px", borderRadius: 6, fontSize: 13, fontWeight: 700,
                  border: `1px solid ${partyColor}30`,
                }}>{p.party}</span>
                {p.criminalCases > 0 && (
                  <span style={{
                    background: "rgba(230,57,70,0.15)", border: "1px solid rgba(230,57,70,0.3)",
                    color: "#E63946", padding: "4px 14px", borderRadius: 6, fontSize: 13, fontWeight: 700,
                    animation: "pulse 2s infinite",
                  }}>{p.criminalCases} Criminal Cases ⚠️</span>
                )}
                {p.education_abroad && (
                  <span style={{
                    background: "rgba(255,183,3,0.15)", border: "1px solid rgba(255,183,3,0.3)",
                    color: "#FFB703", padding: "4px 14px", borderRadius: 6, fontSize: 13, fontWeight: 700,
                  }}>✈️ Family Abroad</span>
                )}
                {p.criminalCases === 0 && (
                  <span style={{
                    background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)",
                    color: "#4ade80", padding: "4px 14px", borderRadius: 6, fontSize: 13,
                  }}>✓ No Criminal Cases</span>
                )}
              </div>

              <h1 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                color: "#fff", letterSpacing: 1, lineHeight: 1, marginBottom: "0.5rem",
              }}>{p.name}</h1>

              <p style={{ color: "#888", fontSize: 15, marginBottom: "0.5rem" }}>{p.position}</p>
              <div style={{ display: "flex", gap: "1.5rem", color: "#555", fontSize: 13, flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={13} />{p.constituency}, {p.state}
                </span>
                <span>Age: {p.age}</span>
                <span style={{ maxWidth: 300, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  🎓 {p.education}
                </span>
              </div>

              <div style={{ display: "flex", gap: 6, marginTop: "1rem", flexWrap: "wrap" }}>
                <a href={`https://news.google.com/search?q=${encodeURIComponent(p.name + " India")}&hl=en-IN&gl=IN`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888", fontSize: 12, textDecoration: "none" }}>
                  <Search size={11} /> Google News
                </a>
                <a href={`https://myneta.info/candidate/index.php?action=show_all&sort=default&queryString=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888", fontSize: 12, textDecoration: "none" }}>
                  <FileText size={11} /> EC Affidavit
                </a>
                <a href={`https://indiankanoon.org/search/?formInput=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888", fontSize: 12, textDecoration: "none" }}>
                  <Scale size={11} /> Court Records
                </a>
                <a href={`https://eci.gov.in`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 12px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888", fontSize: 12, textDecoration: "none" }}>
                  <Shield size={11} /> Election Commission
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Stats Row */}
      <div style={{ maxWidth: 1200, margin: "2rem auto", padding: "0 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
          {[
            { icon: <Gavel size={22} color="#E63946" />, val: p.criminalCases, label: "Criminal Cases", color: "#E63946", isNum: true },
            { icon: <TrendingUp size={22} color="#FFB703" />, val: null, label: "Total Assets", sub: formatINR(totalAssets), color: "#FFB703", isNum: false },
            { icon: <AlertTriangle size={22} color="#FF6B2B" />, val: p.controversies.length, label: "Controversies", color: "#FF6B2B", isNum: true },
            { icon: <Users size={22} color="#06b6d4" />, val: familyAbroad.length, label: "Family Abroad", color: "#06b6d4", isNum: true },
            { icon: <Activity size={22} color="#8b5cf6" />, val: p.tags.length, label: "Profile Tags", color: "#8b5cf6", isNum: true },
          ].map((s, i) => (
            <div key={i} style={{ padding: "1.25rem", background: `${s.color}08`, border: `1px solid ${s.color}20`, borderRadius: 14, textAlign: "center", transition: "transform 0.2s, box-shadow 0.2s", cursor: "default" }}
            onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-3px)"; el.style.boxShadow = `0 8px 24px ${s.color}15`; }}
            onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
            >
              <div style={{ display: "flex", justifyContent: "center", marginBottom: "0.6rem" }}>{s.icon}</div>
              {s.isNum && s.val !== null ? (
                <AnimatedCounter target={s.val} color={s.color} />
              ) : (
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, color: s.color, lineHeight: 1, marginBottom: "0.25rem" }}>{s.sub}</div>
              )}
              <div style={{ color: "#666", fontSize: 11 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", gap: 4, padding: "4px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, overflowX: "auto", marginBottom: "2rem" }}>
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: "10px 16px", borderRadius: 8, border: "none", background: activeTab === tab.id ? "rgba(255,255,255,0.08)" : "transparent", color: activeTab === tab.id ? "#fff" : "#666", fontSize: 13, fontWeight: activeTab === tab.id ? 700 : 400, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 6 }}>
              {tab.label}
              {tab.count !== null && tab.count > 0 && (
                <span style={{ background: activeTab === tab.id ? "#E63946" : "rgba(255,255,255,0.1)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "1px 6px", borderRadius: 8, minWidth: 18, textAlign: "center" }}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* CONTROVERSIES TAB */}
        {activeTab === "controversies" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "3rem" }}>
            {p.controversies.length === 0 && (
              <div style={{ padding: "3rem", textAlign: "center", background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 12, color: "#4ade80" }}>
                ✓ No recorded controversies for this politician
              </div>
            )}
            {p.controversies.map((c, i) => {
              const sColor = getSeverityColor(c.severity);
              const isExpanded = expandedControversy === i;
              return (
                <div key={i} style={{ background: `${sColor}06`, border: `1px solid ${sColor}20`, borderLeft: `4px solid ${sColor}`, borderRadius: 12, overflow: "hidden", transition: "all 0.3s" }}>
                  <div style={{ padding: "1.25rem", cursor: "pointer" }} onClick={() => setExpandedControversy(isExpanded ? null : i)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: "0.5rem", flexWrap: "wrap" }}>
                          <span style={{ background: `${sColor}20`, color: sColor, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>{c.severity}</span>
                          <span style={{ color: "#555", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}><Calendar size={10} />{c.date}</span>
                          <span style={{ color: "#444", fontSize: 11 }}>{timeAgoStr(c.date)}</span>
                        </div>
                        <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 15, lineHeight: 1.4 }}>{c.title}</h4>
                      </div>
                      <div style={{ flexShrink: 0, color: "#555" }}>{isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</div>
                    </div>
                    {!isExpanded && (
                      <p style={{ color: "#666", fontSize: 12, lineHeight: 1.6, marginTop: "0.5rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.description}</p>
                    )}
                  </div>
                  {isExpanded && (
                    <div style={{ padding: "0 1.25rem 1.25rem" }}>
                      <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.8, marginBottom: "1rem" }}>{c.description}</p>
                      <div style={{ padding: "0.75rem", background: "rgba(0,0,0,0.3)", borderRadius: 8, marginBottom: "0.75rem" }}>
                        <div style={{ fontSize: 11, color: "#555", marginBottom: 6, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>🔍 Verify This Claim</div>
                        <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6, marginBottom: 8 }}>Click any source below to read original reports, court documents, or official records.</div>
                        <SourceButtons controversy={c} politicianName={p.name} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CRIMINAL CASES TAB */}
        {activeTab === "cases" && (
          <div style={{ marginBottom: "3rem" }}>
            {p.criminalCases === 0 ? (
              <div style={{ padding: "3rem", textAlign: "center", background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.15)", borderRadius: 16 }}>
                <div style={{ fontSize: 48, marginBottom: "1rem" }}>✅</div>
                <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 18, marginBottom: "0.5rem" }}>No Pending Criminal Cases</div>
                <p style={{ color: "#666", fontSize: 14, maxWidth: 400, margin: "0 auto", lineHeight: 1.7 }}>As per Election Commission affidavit data, {p.name} has zero pending criminal cases. This does not rule out past cases or administrative actions.</p>
                <a href={`https://myneta.info/candidate/index.php?action=show_all&sort=default&queryString=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: "1.5rem", padding: "10px 20px", borderRadius: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", color: "#4ade80", fontSize: 13, textDecoration: "none", fontWeight: 600 }}>
                  <FileText size={14} /> Verify on Myneta.info
                </a>
              </div>
            ) : (
              <div>
                <div style={{ padding: "1.5rem", background: "rgba(230,57,70,0.06)", border: "1px solid rgba(230,57,70,0.2)", borderRadius: 12, marginBottom: "1.5rem", display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 60, color: "#E63946", lineHeight: 1 }}>{p.criminalCases}</div>
                    <div style={{ color: "#666", fontSize: 12 }}>Total Pending Cases</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <p style={{ color: "#aaa", fontSize: 13, lineHeight: 1.8, marginBottom: "1rem" }}>{p.name} has <strong style={{ color: "#E63946" }}>{p.criminalCases} pending criminal cases</strong> declared in their Election Commission affidavit. Note: Pending cases ≠ conviction.</p>
                    <p style={{ color: "#666", fontSize: 12, lineHeight: 1.7 }}>📌 In India, politicians can contest elections with pending cases — ruled constitutional by SC. However, conviction results in disqualification.</p>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }} className="cases-grid">
                  <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
                    <div style={{ fontSize: 11, color: "#555", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>What Are These Cases?</div>
                    <ul style={{ color: "#888", fontSize: 13, lineHeight: 1.9, paddingLeft: 16, margin: 0 }}>
                      <li>Cases filed in various courts across India</li>
                      <li>Can include FIRs, chargesheet-filed cases</li>
                      <li>May include IPC sections (corruption, fraud, etc.)</li>
                      <li>Declared voluntarily in EC affidavit before elections</li>
                      <li>Does NOT mean convicted — innocent until proven guilty</li>
                    </ul>
                  </div>
                  <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10 }}>
                    <div style={{ fontSize: 11, color: "#555", marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Verify the Cases</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        { label: "Check EC Affidavit on Myneta.info", url: `https://myneta.info/candidate/index.php?action=show_all&sort=default&queryString=${encodeURIComponent(p.name)}`, color: "#4CAF50", icon: "📋" },
                        { label: "Search eCourts Case Status", url: `https://ecourts.gov.in`, color: "#009688", icon: "⚖️" },
                        { label: "Search IndiaKanoon for judgments", url: `https://indiankanoon.org/search/?formInput=${encodeURIComponent(p.name)}`, color: "#FF9800", icon: "📚" },
                        { label: "CBI Registered Cases", url: `https://cbi.gov.in`, color: "#9C27B0", icon: "🔍" },
                      ].map((link) => (
                        <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 8, background: `${link.color}10`, border: `1px solid ${link.color}25`, color: link.color, fontSize: 12, textDecoration: "none", fontWeight: 600 }}>
                          <span>{link.icon}</span> {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: "#555", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: 1 }}>Related Controversies With Legal Angle</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {p.controversies.filter((c) => ["critical", "high"].includes(c.severity)).map((c, i) => {
                      const sColor = getSeverityColor(c.severity);
                      return (
                        <div key={i} style={{ padding: "1rem", background: `${sColor}06`, border: `1px solid ${sColor}20`, borderLeft: `3px solid ${sColor}`, borderRadius: 8 }}>
                          <div style={{ color: "#fff", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{c.title}</div>
                          <div style={{ color: "#666", fontSize: 12, marginBottom: 8 }}>{c.date}</div>
                          <SourceButtons controversy={c} politicianName={p.name} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ASSETS TAB */}
        {activeTab === "assets" && (
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }} className="assets-grid">
              <div>
                <div style={{ padding: "1.5rem", background: "rgba(255,183,3,0.05)", border: "1px solid rgba(255,183,3,0.15)", borderRadius: 12, marginBottom: "1rem" }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 42, color: "#FFB703", lineHeight: 1 }}>{formatINR(totalAssets)}</div>
                  <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>Total Assets Declared</div>
                  {p.liabilities > 0 && (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <span style={{ color: "#888", fontSize: 13 }}>Liabilities</span>
                        <span style={{ color: "#E63946", fontWeight: 700 }}>−{formatINR(p.liabilities)}</span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                        <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>Net Worth</span>
                        <span style={{ color: "#4ade80", fontWeight: 700 }}>{formatINR(totalAssets - p.liabilities)}</span>
                      </div>
                    </>
                  )}
                </div>
                <div style={{ fontSize: 11, color: "#444", padding: "0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, lineHeight: 1.7 }}>
                  ℹ️ Assets declared are self-affidavit filed with Election Commission before elections. Verify at <a href="https://myneta.info" target="_blank" rel="noopener noreferrer" style={{ color: "#4ade80" }}>myneta.info</a>.
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {assetItems.map((a) => {
                  const pct = maxAsset > 0 ? (a.value / maxAsset) * 100 : 0;
                  return (
                    <div key={a.label}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                        <span style={{ color: "#888", fontSize: 13 }}>{a.icon} {a.label}</span>
                        <span style={{ color: a.color, fontWeight: 600, fontSize: 13 }}>{formatINR(a.value)}</span>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 4, height: 8, overflow: "hidden" }}>
                        <div style={{ width: `${pct}%`, height: "100%", background: `linear-gradient(to right, ${a.color}99, ${a.color})`, borderRadius: 4, transition: "width 1.2s ease" }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ marginTop: "1.5rem", padding: "1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
              <div style={{ fontSize: 12, color: "#555", marginBottom: "0.75rem", textTransform: "uppercase", letterSpacing: 1 }}>Context: How does this compare?</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                {[
                  { label: "India per-capita GDP (2024)", value: "₹1.2 Lakh", desc: "Average annual income" },
                  { label: "MP Annual Salary", value: "₹18 Lakh+", desc: "Salary + perks + allowances" },
                  { label: `${p.name}'s Assets`, value: formatINR(totalAssets), desc: "Self-declared to EC", highlight: true },
                ].map((item) => (
                  <div key={item.label} style={{ padding: "1rem", background: item.highlight ? "rgba(255,183,3,0.08)" : "rgba(255,255,255,0.02)", border: `1px solid ${item.highlight ? "rgba(255,183,3,0.2)" : "rgba(255,255,255,0.05)"}`, borderRadius: 8 }}>
                    <div style={{ color: item.highlight ? "#FFB703" : "#fff", fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{item.value}</div>
                    <div style={{ color: "#888", fontSize: 12, marginBottom: 2 }}>{item.label}</div>
                    <div style={{ color: "#555", fontSize: 11 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* FAMILY TAB */}
        {activeTab === "family" && (
          <div style={{ marginBottom: "3rem" }}>
            {p.education_abroad && (
              <div style={{ marginBottom: "1.5rem", padding: "14px 16px", background: "rgba(255,183,3,0.08)", border: "1px solid rgba(255,183,3,0.25)", borderRadius: 10, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ fontSize: 20 }}>✈️</span>
                <div>
                  <div style={{ color: "#FFB703", fontWeight: 700, fontSize: 13, marginBottom: 4 }}>Family Member(s) Living or Educated Abroad</div>
                  <p style={{ color: "#888", fontSize: 12, lineHeight: 1.7, margin: 0 }}>While {p.name} holds public office in India, family members are based abroad. This is a transparency metric — it raises questions about alignment of interests.</p>
                </div>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {p.children.map((c, i) => {
                const isAbroad = c.location && c.location !== "India" && c.location !== "N/A" && !c.location.startsWith("Bihar") && !c.location.startsWith("India");
                const flag = getCountryFlag(c.location);
                return (
                  <div key={i} style={{ padding: "1.25rem", background: isAbroad ? "rgba(255,183,3,0.06)" : "rgba(255,255,255,0.02)", border: `1px solid ${isAbroad ? "rgba(255,183,3,0.2)" : "rgba(255,255,255,0.06)"}`, borderLeft: `3px solid ${isAbroad ? "#FFB703" : "rgba(255,255,255,0.1)"}`, borderRadius: 10 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "1rem", alignItems: "start" }}>
                      <div style={{ fontSize: 36, lineHeight: 1 }}>{flag}</div>
                      <div>
                        <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{c.name}</div>
                        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: 13 }}>
                          <span style={{ color: isAbroad ? "#FFB703" : "#666" }}>📍 {c.location}</span>
                          {c.occupation && c.occupation !== "N/A" && <span style={{ color: "#777" }}>💼 {c.occupation}</span>}
                        </div>
                        {c.note && <div style={{ fontSize: 12, color: "#666", fontStyle: "italic", lineHeight: 1.7, marginTop: 6 }}>ℹ️ {c.note}</div>}
                        {isAbroad && <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 10px", background: "rgba(255,183,3,0.12)", border: "1px solid rgba(255,183,3,0.25)", borderRadius: 4, fontSize: 11, color: "#FFB703" }}>✈️ Living abroad while leader serves Indian public</div>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: "1rem", fontSize: 11, color: "#444", lineHeight: 1.6 }}>* Family information compiled from EC affidavits, official statements &amp; verified public records.</div>
            <div style={{ marginTop: "2rem" }}>
              <div style={{ fontSize: 12, color: "#555", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: "0.75rem" }}>Profile Tags</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {p.tags.map((t: string) => <span key={t} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888", padding: "4px 10px", borderRadius: 4, fontSize: 12 }}>{t}</span>)}
              </div>
            </div>
          </div>
        )}

        {/* LIVE NEWS TAB */}
        {activeTab === "news" && (
          <div style={{ marginBottom: "3rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: 8 }}>
              <div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>Live News: {p.name}</div>
                <div style={{ color: "#555", fontSize: 12, marginTop: 2 }}>Fetching latest news from public sources</div>
              </div>
              <a href={`https://news.google.com/search?q=${encodeURIComponent(p.name + " India")}&hl=en-IN&gl=IN`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "8px 14px", borderRadius: 8, background: "rgba(66,133,244,0.12)", border: "1px solid rgba(66,133,244,0.25)", color: "#4285F4", fontSize: 12, textDecoration: "none", fontWeight: 600 }}>
                <Newspaper size={13} /> Open Google News
              </a>
            </div>
            {newsLoading && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[1,2,3].map((i) => <div key={i} style={{ height: 100, borderRadius: 12, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", animation: "shimmer 1.5s infinite" }} />)}
              </div>
            )}
            {!newsLoading && news.length === 0 && (
              <div style={{ padding: "3rem", textAlign: "center", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12 }}>
                <Clock size={36} color="#333" style={{ display: "block", margin: "0 auto 1rem" }} />
                <div style={{ color: "#666", fontSize: 14, marginBottom: "1rem" }}>No live news available right now. Try searching directly:</div>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                  <a href={`https://news.google.com/search?q=${encodeURIComponent(p.name + " India")}&hl=en-IN&gl=IN`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(66,133,244,0.12)", border: "1px solid rgba(66,133,244,0.25)", color: "#4285F4", fontSize: 13, textDecoration: "none" }}>📰 Google News</a>
                  <a href={`https://timesofindia.indiatimes.com/topic/${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(255,107,43,0.12)", border: "1px solid rgba(255,107,43,0.25)", color: "#FF6B2B", fontSize: 13, textDecoration: "none" }}>🗞️ Times of India</a>
                  <a href={`https://www.ndtv.com/topic/${p.name.toLowerCase().replace(/ /g, "-")}`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80", fontSize: 13, textDecoration: "none" }}>📡 NDTV</a>
                  <a href={`https://theprint.in/?s=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", borderRadius: 8, background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", color: "#8b5cf6", fontSize: 13, textDecoration: "none" }}>🔎 The Print</a>
                </div>
              </div>
            )}
            {!newsLoading && news.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {news.slice(0, 10).map((article, i) => (
                  <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div style={{ padding: "1.25rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, display: "flex", gap: "1rem", transition: "all 0.2s", cursor: "pointer" }}
                    onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.04)"; el.style.transform = "translateX(4px)"; }}
                    onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.background = "rgba(255,255,255,0.02)"; el.style.transform = "translateX(0)"; }}
                    >
                      {article.image && <img src={article.image} alt="" style={{ width: 80, height: 60, borderRadius: 6, objectFit: "cover", flexShrink: 0, background: "#111" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: "#fff", fontWeight: 600, fontSize: 14, lineHeight: 1.5, marginBottom: 4 }}>{article.title}</div>
                        {article.description && <p style={{ color: "#666", fontSize: 12, lineHeight: 1.5, marginBottom: 6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{article.description}</p>}
                        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                          <span style={{ fontSize: 11, color: "#4ade80", fontWeight: 600 }}>{article.source?.name}</span>
                          <span style={{ fontSize: 11, color: "#444" }}>{timeAgoStr(article.publishedAt)}</span>
                          <span style={{ fontSize: 11, color: "#555", display: "flex", alignItems: "center", gap: 3 }}><ExternalLink size={9} /> Read Article</span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
                <div style={{ textAlign: "center", paddingTop: "1rem" }}>
                  <a href={`https://news.google.com/search?q=${encodeURIComponent(p.name + " India")}&hl=en-IN&gl=IN`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 24px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888", fontSize: 13, textDecoration: "none" }}>
                    <Newspaper size={14} /> More on Google News
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
          .cases-grid { grid-template-columns: 1fr !important; }
          .assets-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        @keyframes shimmer { 0% { opacity: 0.3; } 50% { opacity: 0.6; } 100% { opacity: 0.3; } }
      `}</style>
    </div>
  );
}
