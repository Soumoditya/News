"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Users, Building2, Plane, Network, Info, ArrowRight } from "lucide-react";
import dynasties from "@/data/dynasties.json";
import politicians from "@/data/politicians.json";
import { getPartyColor, getPartySymbol } from "@/lib/utils";
import SourceTag from "@/components/SourceTag";
import AnimatedSection from "@/components/AnimatedSection";

// name -> slug for cross-linking to full profiles where we have them
const SLUG: Record<string, string> = Object.fromEntries(
  politicians.map((p) => [p.name.toLowerCase(), p.slug])
);

// Family-abroad, pulled live from the politician dataset (the user's "family abroad" angle)
const FAMILY_ABROAD = politicians
  .filter((p) => p.education_abroad && (p.children || []).some((c: any) =>
    c.location && c.location !== "India" && c.location !== "N/A" &&
    !String(c.location).startsWith("India") && !String(c.location).startsWith("Bihar")))
  .map((p) => ({
    name: p.name,
    slug: p.slug,
    party: p.party,
    abroad: (p.children || [])
      .filter((c: any) => c.location && c.location !== "India" && c.location !== "N/A" &&
        !String(c.location).startsWith("India") && !String(c.location).startsWith("Bihar"))
      .map((c: any) => ({ who: c.name, where: c.location, what: c.occupation })),
  }));

const CATEGORIES = [
  { key: "All", label: "All", icon: <Network size={14} /> },
  { key: "Dynasty", label: "Dynasty", icon: <Users size={14} /> },
  { key: "Business", label: "Family business", icon: <Building2 size={14} /> },
];
const ALLIANCES = ["All", "NDA", "INDIA", "None"];

export default function NepotismPage() {
  const [cat, setCat] = useState("All");
  const [alliance, setAlliance] = useState("All");

  const filtered = useMemo(() => {
    return dynasties.filter((d) =>
      (cat === "All" || d.categories.includes(cat)) &&
      (alliance === "All" || d.alliance === alliance)
    );
  }, [cat, alliance]);

  const ndaCount = dynasties.filter((d) => d.alliance === "NDA").length;
  const indiaCount = dynasties.filter((d) => d.alliance === "INDIA").length;

  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Hero */}
      <div style={{
        padding: "4rem 1.5rem 3rem",
        background: "linear-gradient(180deg, rgba(139,92,246,0.07) 0%, transparent 100%)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: "var(--violet)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Family · Dynasty · Business Interests
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", color: "#fff", letterSpacing: 1, lineHeight: 1 }}>
            THE FAMILY<br />
            <span style={{ background: "linear-gradient(135deg, #8b5cf6, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              BUSINESS OF POLITICS
            </span>
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 15, maxWidth: 680, lineHeight: 1.8, marginTop: "1rem" }}>
            Who entered politics through family, whose relatives run businesses tied to their power,
            and whose family lives abroad while they govern. Applied equally across every party —
            you decide what it means.
          </p>
        </div>
      </div>

      {/* Newbie explainer */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem 0" }}>
        <div style={{
          display: "flex", gap: 14, alignItems: "flex-start",
          padding: "1.25rem 1.5rem", background: "var(--surface-1)",
          border: "1px solid var(--border)", borderRadius: "var(--r-lg)",
        }}>
          <Info size={20} color="var(--cyan)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>New here? What this page means</div>
            <p style={{ color: "var(--text-mute)", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              <strong style={{ color: "var(--text-dim)" }}>Dynasty politics</strong> is when someone enters politics mainly because a family member was already powerful.
              <strong style={{ color: "var(--text-dim)" }}> Nepotism</strong> is when that power benefits relatives — jobs, contracts, business growth.
              Having a political family isn't illegal, and many leaders are capable in their own right. This tracker simply lays out the
              connections — every entry links to news so you can judge for yourself. Tags marked <em style={{ color: "var(--aging)" }}>alleged</em> are contested or under probe, not proven.
            </p>
          </div>
        </div>
      </div>

      {/* Balance bar */}
      <div style={{ maxWidth: 1200, margin: "1.5rem auto 0", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          {[
            { label: "Total tracked", val: dynasties.length, color: "var(--violet)" },
            { label: "NDA-aligned", val: ndaCount, color: "var(--accent)" },
            { label: "INDIA-aligned", val: indiaCount, color: "var(--green)" },
            { label: "Family abroad", val: FAMILY_ABROAD.length, color: "var(--gold)" },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, minWidth: 130, padding: "1rem", background: "var(--surface-1)", border: "1px solid var(--border)", borderRadius: "var(--r-md)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 30, color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ color: "var(--text-mute)", fontSize: 12, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{ maxWidth: 1200, margin: "1.5rem auto 0", padding: "0 1.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)} style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "8px 14px", borderRadius: "var(--r-pill)",
              border: `1px solid ${cat === c.key ? "var(--violet)" : "var(--border)"}`,
              background: cat === c.key ? "rgba(139,92,246,0.15)" : "transparent",
              color: cat === c.key ? "var(--violet)" : "var(--text-mute)",
              fontSize: 13, fontWeight: cat === c.key ? 700 : 400, cursor: "pointer",
            }}>{c.icon} {c.label}</button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 6, marginLeft: "auto", flexWrap: "wrap" }}>
          {ALLIANCES.map((a) => (
            <button key={a} onClick={() => setAlliance(a)} style={{
              padding: "8px 14px", borderRadius: "var(--r-pill)",
              border: `1px solid ${alliance === a ? "var(--accent)" : "var(--border)"}`,
              background: alliance === a ? "rgba(255,107,43,0.12)" : "transparent",
              color: alliance === a ? "var(--accent)" : "var(--text-mute)",
              fontSize: 13, fontWeight: alliance === a ? 700 : 400, cursor: "pointer",
            }}>{a === "None" ? "Regional" : a}</button>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "1.5rem 1.5rem 3rem" }}>
        <AnimatedSection stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1rem" }}>
          {filtered.map((d) => {
            const color = getPartyColor(d.party);
            const slug = SLUG[d.name.toLowerCase()];
            const inner = (
              <div className="lift" style={{
                height: "100%",
                padding: "1.25rem",
                background: "var(--surface-1)",
                border: "1px solid var(--border)",
                borderLeft: `3px solid ${color}`,
                borderRadius: "var(--r-lg)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }} aria-hidden>{getPartySymbol(d.party)}</span>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{d.name}</div>
                      <div style={{ display: "flex", gap: 6, alignItems: "center", marginTop: 2 }}>
                        <span style={{ color, fontSize: 11, fontWeight: 700 }}>{d.party}</span>
                        <span style={{ color: "var(--text-faint)", fontSize: 11 }}>· {d.alliance === "None" ? "Regional" : d.alliance}</span>
                      </div>
                    </div>
                  </div>
                  {d.alleged && (
                    <span style={{ fontSize: 9, color: "var(--aging)", border: "1px solid var(--aging)", borderRadius: 4, padding: "1px 6px", fontWeight: 700, whiteSpace: "nowrap" }}>ALLEGED</span>
                  )}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 10 }}>
                  {d.categories.map((c) => (
                    <span key={c} style={{ fontSize: 10, color: "var(--text-dim)", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 4, padding: "2px 7px" }}>
                      {c === "Business" ? "🏢 Family business" : c === "Dynasty" ? "👪 Dynasty" : c}
                    </span>
                  ))}
                </div>

                <div style={{ color: "var(--text-faint)", fontSize: 11, marginBottom: 4 }}>
                  Linked to: <span style={{ color: "var(--text-dim)" }}>{d.relatedTo}</span>
                </div>
                <p style={{ color: "var(--text-mute)", fontSize: 13, lineHeight: 1.7, marginBottom: 10 }}>{d.note}</p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                  <SourceTag source={d.source} sourceLabel={d.sourceLabel} verifiedOn={d.verifiedOn} compact />
                  {slug && (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color, fontSize: 11, fontWeight: 600 }}>
                      Full profile <ArrowRight size={11} />
                    </span>
                  )}
                </div>
              </div>
            );
            return slug
              ? <Link key={d.name} href={`/politicians/${slug}`} style={{ textDecoration: "none" }}>{inner}</Link>
              : <div key={d.name}>{inner}</div>;
          })}
        </AnimatedSection>

        {/* Family abroad section */}
        {FAMILY_ABROAD.length > 0 && (
          <div style={{ marginTop: "3rem" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 30, color: "#fff", letterSpacing: 1, marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: 10 }}>
              <Plane size={22} color="var(--gold)" /> FAMILY ABROAD
            </h2>
            <p style={{ color: "var(--text-mute)", fontSize: 13, lineHeight: 1.7, maxWidth: 680, marginBottom: "1.5rem" }}>
              Leaders whose immediate family lives, studies or works outside India while they hold public office here.
              A transparency data-point — not an accusation.
            </p>
            <AnimatedSection stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
              {FAMILY_ABROAD.map((p) => {
                const color = getPartyColor(p.party);
                return (
                  <Link key={p.slug} href={`/politicians/${p.slug}`} style={{ textDecoration: "none" }}>
                    <div className="lift" style={{ height: "100%", padding: "1.25rem", background: "rgba(255,183,3,0.05)", border: "1px solid rgba(255,183,3,0.2)", borderRadius: "var(--r-lg)" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 20 }} aria-hidden>{getPartySymbol(p.party)}</span>
                        <div>
                          <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{p.name}</div>
                          <span style={{ color, fontSize: 11, fontWeight: 700 }}>{p.party}</span>
                        </div>
                      </div>
                      {p.abroad.map((a: any, i: number) => (
                        <div key={i} style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.7 }}>
                          ✈️ <strong style={{ color: "#fff" }}>{a.who}</strong> — {a.where}{a.what && a.what !== "N/A" ? ` · ${a.what}` : ""}
                        </div>
                      ))}
                    </div>
                  </Link>
                );
              })}
            </AnimatedSection>
          </div>
        )}

        <div style={{ marginTop: "2rem", fontSize: 11, color: "var(--text-faint)", lineHeight: 1.7 }}>
          Compiled from public records and reputable news reporting. Family connections are matters of public record;
          business and income claims are reported/alleged unless a court has ruled, and each links to its source for you to verify.
          Corrections welcome.
        </div>
      </div>
    </div>
  );
}
