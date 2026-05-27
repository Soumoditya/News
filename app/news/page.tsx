"use client";
import { useState, useEffect } from "react";
import { Newspaper, ExternalLink, RefreshCw, Clock, TrendingUp } from "lucide-react";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  source: { name: string };
  publishedAt: string;
  category?: string;
}

const GNEWS_QUERIES = [
  { q: "India politics parliament BJP Congress AAP", label: "National Politics" },
  { q: "India corruption scam CBI ED raids", label: "Corruption Watch" },
  { q: "India budget economy government spending", label: "Economy & Budget" },
  { q: "India election commission affidavit criminal MPs", label: "Election Watch" },
  { q: "India state government CM Chief Minister", label: "State Politics" },
];

// Static fallback data for when API is not available
const STATIC_NEWS: Article[] = [
  {
    title: "Supreme Court Upholds Electoral Bond Ruling, Orders SBI Data Disclosure",
    description: "The Supreme Court directed SBI to disclose complete Electoral Bond data, calling the scheme opaque and unconstitutional in its landmark 5-0 judgment.",
    url: "https://www.sci.gov.in",
    urlToImage: null,
    source: { name: "Supreme Court of India" },
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    category: "National Politics",
  },
  {
    title: "ADR Report: 251 of 543 Elected MPs Have Criminal Cases in 18th Lok Sabha",
    description: "Association for Democratic Reforms finds 46% of newly elected MPs declared pending criminal cases in their EC affidavits, highest in Indian electoral history.",
    url: "https://adrindia.org",
    urlToImage: null,
    source: { name: "ADR India" },
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    category: "Election Watch",
  },
  {
    title: "Budget 2024-25: ₹11.3 Lakh Crore Allocated for Interest Payments — 23.5% of Total Budget",
    description: "India's debt servicing cost exceeds combined spending on defence, education, and health for the first time, raising concerns among economists.",
    url: "https://indiabudget.gov.in",
    urlToImage: null,
    source: { name: "India Budget" },
    publishedAt: new Date(Date.now() - 259200000).toISOString(),
    category: "Economy & Budget",
  },
  {
    title: "RG Kar Hospital Case: CBI Files Chargesheet, Kolkata Police Under Investigation",
    description: "CBI has filed chargesheet in the rape-murder of trainee doctor at RG Kar Medical College. Former principal Sandip Ghosh among those chargesheeted.",
    url: "https://cbi.gov.in",
    urlToImage: null,
    source: { name: "CBI India" },
    publishedAt: new Date(Date.now() - 345600000).toISOString(),
    category: "Corruption Watch",
  },
  {
    title: "Manipur Ethnic Violence: 200+ Killed, State Government Faces Parliamentary Questions",
    description: "Over 200 people killed and 60,000 displaced in ongoing ethnic violence. Opposition raises questions about state and central government's delayed response.",
    url: "https://nhrc.nic.in",
    urlToImage: null,
    source: { name: "NHRC India" },
    publishedAt: new Date(Date.now() - 432000000).toISOString(),
    category: "National Politics",
  },
  {
    title: "Maharashtra Budget 2024-25: ₹6.94 Lakh Crore — Record Spend on Infrastructure",
    description: "Maharashtra announces record budget with ₹48,000 crore for Mumbai Metro, ₹38,000 crore for roads, amid debt of ₹7.82 lakh crore.",
    url: "https://finance.maharashtra.gov.in",
    urlToImage: null,
    source: { name: "Maharashtra Finance" },
    publishedAt: new Date(Date.now() - 518400000).toISOString(),
    category: "State Politics",
  },
  {
    title: "Sandeshkhali Case: CBI Arrests Sheikh Shahjahan After 55 Days On The Run",
    description: "TMC leader Sheikh Shahjahan, accused of land grab and sexual assault against women in Sandeshkhali, West Bengal, arrested after Calcutta HC intervened.",
    url: "https://cbi.gov.in",
    urlToImage: null,
    source: { name: "CBI India" },
    publishedAt: new Date(Date.now() - 604800000).toISOString(),
    category: "Corruption Watch",
  },
  {
    title: "Lok Sabha: Opposition Demands JPC Probe into Adani-Government Nexus",
    description: "Congress-led Opposition demands Joint Parliamentary Committee probe into Adani Group allegations following Hindenburg Research report and SEBI investigation.",
    url: "https://loksabha.nic.in",
    urlToImage: null,
    source: { name: "Lok Sabha" },
    publishedAt: new Date(Date.now() - 691200000).toISOString(),
    category: "National Politics",
  },
];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3600000);
  const d = Math.floor(diff / 86400000);
  if (h < 1) return "Just now";
  if (h < 24) return `${h}h ago`;
  return `${d}d ago`;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>(STATIC_NEWS);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(STATIC_NEWS.map((a) => a.category || "General")))];
  const filtered = activeCategory === "All" ? articles : articles.filter((a) => (a.category || "General") === activeCategory);

  const refresh = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/news?q=india+politics+government+corruption`);
      if (res.ok) {
        const data = await res.json();
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          setLastUpdated(new Date());
        }
      }
    } catch (e) {
      // Use static data as fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Header */}
      <div style={{
        padding: "4rem 1.5rem 3rem",
        background: "linear-gradient(180deg, rgba(6,182,212,0.06) 0%, transparent 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        maxWidth: 1400, margin: "0 auto",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: 4, color: "#06b6d4", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              India Political News
            </div>
            <h1 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 6vw, 5.5rem)",
              color: "#fff",
              letterSpacing: 2,
              lineHeight: 1,
              marginBottom: "0.75rem",
            }}>
              LIVE<br />
              <span style={{ background: "linear-gradient(135deg, #06b6d4, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                NEWSROOM
              </span>
            </h1>
            <p style={{ color: "#888", fontSize: 14 }}>
              India politics, corruption, government, economy — updated regularly
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.75rem" }}>
            <button
              onClick={refresh}
              disabled={loading}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "rgba(6,182,212,0.1)",
                border: "1px solid rgba(6,182,212,0.3)",
                color: "#06b6d4",
                padding: "10px 20px",
                borderRadius: 8,
                cursor: loading ? "not-allowed" : "pointer",
                fontSize: 13,
                fontWeight: 600,
                opacity: loading ? 0.6 : 1,
              }}
            >
              <RefreshCw size={16} style={{ animation: loading ? "spin 1s linear infinite" : "none" }} />
              {loading ? "Refreshing..." : "Refresh News"}
            </button>
            <span style={{ color: "#444", fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
              <Clock size={11} /> Updated: {lastUpdated.toLocaleTimeString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "2rem 1.5rem" }}>
        {/* Category filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: "2rem", flexWrap: "wrap" }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              style={{
                padding: "7px 16px",
                borderRadius: 6,
                border: `1px solid ${activeCategory === c ? "#06b6d4" : "rgba(255,255,255,0.08)"}`,
                background: activeCategory === c ? "rgba(6,182,212,0.15)" : "transparent",
                color: activeCategory === c ? "#06b6d4" : "#666",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: activeCategory === c ? 700 : 400,
                transition: "all 0.2s",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured/top story */}
        {filtered.length > 0 && (
          <a href={filtered[0].url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <div style={{
              padding: "2.5rem",
              background: "rgba(6,182,212,0.05)",
              border: "1px solid rgba(6,182,212,0.15)",
              borderRadius: 20,
              marginBottom: "2rem",
              cursor: "pointer",
              transition: "all 0.3s",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "center",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(6,182,212,0.1)";
              el.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(6,182,212,0.05)";
              el.style.transform = "translateY(0)";
            }}
            >
              <div>
                <div style={{ display: "flex", gap: 8, marginBottom: "1rem" }}>
                  <span style={{
                    background: "rgba(230,57,70,0.15)",
                    color: "#E63946",
                    padding: "3px 12px", borderRadius: 4,
                    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                  }}>TOP STORY</span>
                  <span style={{ color: "#555", fontSize: 12 }}>{filtered[0].source.name}</span>
                  <span style={{ color: "#444", fontSize: 12 }}>{timeAgo(filtered[0].publishedAt)}</span>
                </div>
                <h2 style={{
                  color: "#fff",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
                  lineHeight: 1.4,
                  fontWeight: 700,
                  marginBottom: "0.75rem",
                }}>
                  {filtered[0].title}
                </h2>
                <p style={{ color: "#777", fontSize: 14, lineHeight: 1.6 }}>
                  {filtered[0].description}
                </p>
              </div>
              <ExternalLink size={20} color="#06b6d4" style={{ flexShrink: 0 }} />
            </div>
          </a>
        )}

        {/* News grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.25rem",
        }}>
          {filtered.slice(1).map((article, i) => (
            <a key={i} href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                height: "100%",
                transition: "all 0.3s",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.border = "1px solid rgba(255,255,255,0.12)";
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 12px 24px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = "rgba(255,255,255,0.02)";
                el.style.border = "1px solid rgba(255,255,255,0.06)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
              >
                {article.category && (
                  <div style={{ marginBottom: "0.75rem" }}>
                    <span style={{
                      background: "rgba(6,182,212,0.1)",
                      color: "#06b6d4",
                      padding: "2px 8px", borderRadius: 4,
                      fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1,
                    }}>{article.category}</span>
                  </div>
                )}
                <h3 style={{
                  color: "#fff",
                  fontSize: 15,
                  fontWeight: 600,
                  lineHeight: 1.5,
                  marginBottom: "0.75rem",
                  flex: 1,
                }}>
                  {article.title}
                </h3>
                {article.description && (
                  <p style={{
                    color: "#666",
                    fontSize: 12,
                    lineHeight: 1.6,
                    marginBottom: "1rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {article.description}
                  </p>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
                  <span style={{ color: "#555", fontSize: 11 }}>{article.source.name}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Clock size={10} color="#444" />
                    <span style={{ color: "#444", fontSize: 11 }}>{timeAgo(article.publishedAt)}</span>
                    <ExternalLink size={12} color="#555" style={{ marginLeft: 4 }} />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "4rem", color: "#555" }}>
            <Newspaper size={48} color="#333" style={{ margin: "0 auto 1rem", display: "block" }} />
            <div>No articles found</div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
