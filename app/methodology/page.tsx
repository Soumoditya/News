"use client";
import Link from "next/link";
import { ShieldCheck, Scale, FileText, ExternalLink, CheckCircle2, AlertTriangle, Calendar } from "lucide-react";
import { PRIMARY_SOURCES } from "@/lib/sources";
import AnimatedSection from "@/components/AnimatedSection";

export default function MethodologyPage() {
  return (
    <div style={{ minHeight: "100vh", paddingTop: 64 }}>
      {/* Hero */}
      <div style={{
        padding: "4rem 1.5rem 3rem",
        background: "linear-gradient(180deg, rgba(74,222,128,0.06) 0%, transparent 100%)",
        borderBottom: "1px solid var(--border)",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ fontSize: 12, letterSpacing: 4, color: "var(--green)", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            How we know what we publish
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", color: "#fff", letterSpacing: 1, lineHeight: 1 }}>
            METHODOLOGY <span style={{ color: "var(--green)" }}>&amp; SOURCES</span>
          </h1>
          <p style={{ color: "var(--text-dim)", fontSize: 16, maxWidth: 680, lineHeight: 1.8, marginTop: "1rem" }}>
            This platform exists to make government and politics understandable and checkable for
            every citizen. It is not aligned with any party. Every figure here traces back to an
            official record or a respected non-partisan body — and you can click through to verify
            it yourself.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem" }}>
        {/* Principles */}
        <AnimatedSection stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
          {[
            { icon: <ShieldCheck size={22} color="var(--green)" />, title: "Every claim is sourced", body: "Each fact links to the document proving it — a court judgment, an EC affidavit, a CAG report, or named news coverage. No unsourced assertions." },
            { icon: <Scale size={22} color="var(--gold)" />, title: "Non-partisan by design", body: "Ruling party and opposition are held to the exact same standard and the same sourcing bar. The data decides prominence, not us." },
            { icon: <Calendar size={22} color="var(--cyan)" />, title: "Honest about freshness", body: "Every fact shows when it was last verified, with a colour dot: green (recent), amber (check for updates), red (likely outdated)." },
            { icon: <FileText size={22} color="var(--accent)" />, title: "Allegation ≠ conviction", body: "We use precise legal language — pending case, chargesheeted, alleged, acquitted, convicted — reflecting each matter's actual current status." },
          ].map((c) => (
            <div key={c.title} className="lift" style={{ padding: "1.5rem", background: "var(--surface-1)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)" }}>
              <div style={{ marginBottom: "0.75rem" }}>{c.icon}</div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15, marginBottom: "0.4rem" }}>{c.title}</div>
              <div style={{ color: "var(--text-mute)", fontSize: 13, lineHeight: 1.7 }}>{c.body}</div>
            </div>
          ))}
        </AnimatedSection>

        {/* Primary sources */}
        <AnimatedSection>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "#fff", letterSpacing: 1, marginBottom: "1.5rem" }}>
            OUR PRIMARY SOURCES
          </h2>
          <div style={{ display: "grid", gap: "0.75rem", marginBottom: "3rem" }}>
            {PRIMARY_SOURCES.map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="lift" style={{
                display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "center",
                padding: "1rem 1.25rem", background: "var(--surface-1)", border: "1px solid var(--border)",
                borderRadius: "var(--r-md)", textDecoration: "none",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{s.name}</span>
                    <span style={{ fontSize: 10, color: "var(--text-mute)", border: "1px solid var(--border)", borderRadius: 4, padding: "1px 6px" }}>{s.type}</span>
                  </div>
                  <div style={{ color: "var(--text-mute)", fontSize: 13, lineHeight: 1.6 }}>{s.role}</div>
                </div>
                <ExternalLink size={16} color="var(--text-mute)" />
              </a>
            ))}
          </div>
        </AnimatedSection>

        {/* How data stays current */}
        <AnimatedSection>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 32, color: "#fff", letterSpacing: 1, marginBottom: "1.5rem" }}>
            HOW WE KEEP IT CURRENT
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "3rem" }} className="how-grid">
            <div style={{ padding: "1.5rem", background: "rgba(74,222,128,0.05)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: "var(--r-lg)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--green)", fontWeight: 700, marginBottom: "0.75rem" }}>
                <CheckCircle2 size={18} /> Live data
              </div>
              <ul style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.9, paddingLeft: 18, margin: 0 }}>
                <li>News is fetched live for every politician and topic.</li>
                <li>Official open datasets (data.gov.in) power budget &amp; economic figures where an API exists.</li>
                <li>Deep links to MyNeta, eCourts, IndiaKanoon &amp; PRS always show you the latest at the source.</li>
              </ul>
            </div>
            <div style={{ padding: "1.5rem", background: "rgba(255,183,3,0.05)", border: "1px solid rgba(255,183,3,0.2)", borderRadius: "var(--r-lg)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--gold)", fontWeight: 700, marginBottom: "0.75rem" }}>
                <AlertTriangle size={18} /> Honest limits
              </div>
              <ul style={{ color: "var(--text-dim)", fontSize: 13, lineHeight: 1.9, paddingLeft: 18, margin: 0 }}>
                <li>There is no single public API for affidavit/criminal data — that data is structured by hand and deep-linked to MyNeta so you can verify it.</li>
                <li>Every such fact carries a "verified on" date and freshness dot.</li>
                <li>Spot something outdated? The source link lets you check the current position instantly.</li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Non-partisan statement */}
        <AnimatedSection>
          <div style={{ padding: "2rem", background: "var(--surface-1)", border: "1px solid var(--border)", borderRadius: "var(--r-xl)", textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: "0.5rem" }}>⚖️</div>
            <h3 style={{ color: "#fff", fontWeight: 700, fontSize: 18, marginBottom: "0.75rem" }}>Our commitment</h3>
            <p style={{ color: "var(--text-dim)", fontSize: 14, lineHeight: 1.9, maxWidth: 640, margin: "0 auto" }}>
              We hold power to account — whoever holds it. The goal is an informed citizen, not a
              political verdict. We present sourced facts and let you draw your own conclusions.
              Found an error or a better source? That feedback makes this stronger.
            </p>
            <Link href="/politicians" style={{
              display: "inline-flex", alignItems: "center", gap: 8, marginTop: "1.5rem",
              background: "linear-gradient(135deg, var(--accent), var(--accent-2))", color: "#fff",
              padding: "12px 26px", borderRadius: "var(--r-md)", textDecoration: "none", fontWeight: 700, fontSize: 14,
            }}>
              Explore the data
            </Link>
          </div>
        </AnimatedSection>
      </div>

      <style>{`@media (max-width: 768px) { .how-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
